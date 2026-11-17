/* ===========================================================
   SHARE LINKS

   A trip you can send to somebody who has no account, and who may
   never want one. Two kinds:

     viewer   anyone with the URL reads the itinerary. No sign-in,
              no account, nothing to install. They cannot change it.
     editor   the same, plus: if they sign in, they become a member
              of the trip and their edits sync like anyone else's.

   The link is a token, not the trip's id. That matters — the trip id
   is in your own URL bar whenever you plan, and in the database row,
   so using it as the share secret would mean every trip was already
   effectively public to anyone who had seen one URL. A token is
   separate, revocable, and one trip can have several with different
   roles and labels.

   Reading a shared trip never touches the trips table. It calls one
   SECURITY DEFINER function (trip_by_token) which returns exactly one
   trip for exactly one live token and nothing else — no owner, no
   member list, no email addresses.
   =========================================================== */

/* 22 characters from a 64-letter alphabet: 132 bits, which is far
   past guessable, and still short enough to read down a phone line. */
function linkToken(){
  const abc = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789-_';
  let out = '';
  try {
    const buf = new Uint8Array(22);
    crypto.getRandomValues(buf);
    for (const b of buf) out += abc[b % abc.length];
    return out;
  } catch(e){
    for (let i = 0; i < 22; i++) out += abc[Math.floor(Math.random() * abc.length)];
    return out;
  }
}

/* The URL a person actually pastes. Built from where the page is now,
   so it is right on localhost, on a preview deploy and in production
   without anything to configure. */
function linkURL(token){
  const base = location.origin + location.pathname.replace(/index\.html$/, '');
  return base + '#/shared/' + token;
}

/* ---------- the owner's side ---------- */
async function linkCreate(tripId, role, label){
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return { error: 'Sign in to make a share link.' };
  if (role !== 'editor') role = 'viewer';

  /* The trip has to exist in the database before a link can point at
     it — the same missing-row problem that made invites look like a
     permissions bug. Put it up first. */
  const t = typeof tripGet === 'function' ? tripGet(tripId) : null;
  if (!t) return { error: 'That trip is not open any more.' };
  const up = await tripPush(sb, t, me.id);
  if (up.error) return { error: 'Could not save the trip before sharing — ' + up.error };

  const token = linkToken();
  const ins = await withDeadline(
    sb.from('trip_links').insert({ token: token, trip_id: tripId, role: role,
                                   label: (label || '').trim() || null, created_by: me.id }),
    12000, 'Making the link');
  if (ins.error){
    if (/does not exist|schema cache/i.test(ins.error.message))
      return { error: 'The share-links table is not there yet. Re-run supabase/schema.sql, '
                    + 'then try again.' };
    return { error: ins.error.message };
  }
  return { ok: true, token: token, role: role, url: linkURL(token) };
}

async function linkList(tripId){
  const sb = await sbClient(); if (!sb) return [];
  try {
    const { data, error } = await withDeadline(
      sb.from('trip_links').select('token,role,label,created_at,revoked_at')
        .eq('trip_id', tripId).is('revoked_at', null)
        .order('created_at', { ascending: false }),
      12000, 'Reading the links');
    if (error) return [];
    return (data || []).map(r => ({ token: r.token, role: r.role, label: r.label,
                                    created: r.created_at, url: linkURL(r.token) }));
  } catch(e){ return []; }
}

/* Revoking marks rather than deletes, so a link that stops working
   can still be told apart from one that never existed. */
async function linkRevoke(token){
  const sb = await sbClient(); if (!sb) return { error: 'Not signed in.' };
  const { error } = await withDeadline(
    sb.from('trip_links').update({ revoked_at: new Date().toISOString() }).eq('token', token),
    12000, 'Revoking the link');
  return error ? { error: error.message } : { ok: true };
}

/* ---------- the visitor's side ---------- */

/* Read a shared trip. Works with no account at all. */
async function tripByToken(token){
  const sb = await sbClient();
  if (!sb) return { error: 'This copy of Meridian has no database configured, '
                         + 'so it cannot open a shared trip.' };
  try {
    const { data, error } = await withDeadline(
      sb.rpc('trip_by_token', { tok: token }), 15000, 'Opening the trip');
    if (error){
      if (/does not exist|schema cache/i.test(error.message))
        return { error: 'This copy of the site has not had supabase/schema.sql re-run, '
                      + 'so shared links are not switched on yet.' };
      return { error: error.message };
    }
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return { error: 'gone' };
    const d = row.data || {};
    return { ok: true, role: row.role,
             trip: { id: row.id, name: row.name,
                     days: (d.days && d.days.length) ? d.days
                           : [{ id: 'd' + String(row.id).replace(/-/g, '').slice(0, 10),
                                label: 'Day 1', stops: [] }],
                     ideas: d.ideas || [], notes: d.notes || {},
                     updated: Date.parse(row.updated_at) || Date.now(), shared: true } };
  } catch(e){ return { error: e.message || String(e) }; }
}

/* Called after a signed-in visitor opens an editor link: it makes them
   a member, so the trip joins their own list and syncs both ways. */
async function linkClaim(token){
  const sb = await sbClient(); if (!sb) return { error: 'No database.' };
  try {
    const { data, error } = await withDeadline(
      sb.rpc('claim_link', { tok: token }), 15000, 'Joining the trip');
    if (error) return { error: error.message };
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return { error: 'gone' };
    return { ok: true, tripId: row.trip_id, role: row.role, joined: !!row.joined };
  } catch(e){ return { error: e.message || String(e) }; }
}

/* Remember the token across a sign-in round trip. Signing in reloads
   the page through the provider, which would otherwise lose which
   link the visitor arrived on and drop them on the home map. */
const SHARE_PENDING = 'meridian.sharePending';
function sharePendingSet(token){ try { sessionStorage.setItem(SHARE_PENDING, token); } catch(e){} }
function sharePendingTake(){
  try { const t = sessionStorage.getItem(SHARE_PENDING);
        if (t) sessionStorage.removeItem(SHARE_PENDING);
        return t || ''; } catch(e){ return ''; }
}

/* When somebody signs in while holding an editor link, claim it and
   pull the trip into their list without them having to do anything. */
document.addEventListener('auth:changed', async () => {
  if (!currentUser()) return;
  const tok = sharePendingTake();
  if (!tok) return;
  const r = await linkClaim(tok);
  if (r && r.ok && r.joined && typeof cloudLoad === 'function'){
    await cloudLoad();
    location.hash = '#/planner/' + r.tripId;
  }
});
