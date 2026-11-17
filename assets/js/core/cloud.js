/* ===========================================================
   SHARED TRIPS

   When somebody is signed in, trips live in Postgres and this file
   keeps the browser copy and the database copy in step. When nobody
   is, none of this runs and the planner behaves exactly as it did.

   It deliberately does NOT change core/trips.js. That file still
   writes localStorage and fires 'trips:changed'; this one listens
   for that event, works out which trip actually changed by its
   `updated` stamp, and pushes just that one. Local storage stays as
   an offline cache, so a dropped connection loses nothing.

   Realtime: another member's edit arrives as a postgres change and
   is folded in. Last write wins — a deliberate simplification. Two
   people dragging the same stop in the same second will settle on
   one of the two orders rather than merging, which for a holiday
   itinerary is a reasonable trade and is noted in the UI.
   =========================================================== */

let CLOUD_ON = false;
let CLOUD_SEEN = {};        // trip id -> last `updated` we pushed or received
let CLOUD_CHAN = null;
let CLOUD_BUSY = false;

/* ---------- shape conversion ---------- */
function rowToTrip(r){
  const d = r.data || {};
  return { id: r.id, name: r.name, created: Date.parse(r.created_at) || Date.now(),
           updated: Date.parse(r.updated_at) || Date.now(),
           days: (d.days && d.days.length) ? d.days
                 /* Derived from the trip's own id, not the clock. A random
                    one here meant a trip with no days yet got a DIFFERENT
                    day id on every load, so anything keyed to that day — a
                    note, a stop mid-drag — pointed at a day that no longer
                    existed by the next repaint. */
                 : [{ id: 'd' + String(r.id).replace(/-/g, '').slice(0, 10),
                      label: 'Day 1', stops: [] }],
           ideas: d.ideas || [], notes: d.notes || {},
           owner: r.owner, shared: true };
}
function tripToRow(t, uid){
  return { id: t.id, owner: t.owner || uid, name: t.name,
           data: { days: t.days, ideas: t.ideas, notes: t.notes } };
}

/* ---------- pushing a trip up ----------

   An upsert cannot be used blindly here, and that is what produced
   "new row violates row-level security policy for table trips".

   `upsert` is INSERT ... ON CONFLICT DO UPDATE, and Postgres checks
   the INSERT policy's WITH CHECK against the proposed row *whether
   or not* the conflict path is taken. The insert policy requires
   owner = auth.uid(). So the moment the row's owner is anybody but
   you — a trip somebody shared with you, or one whose stored owner
   is a different account you were signed into before — the upsert is
   refused outright, even though you are perfectly entitled to UPDATE
   that row as a member.

   So: try an update first, and only insert when there was nothing to
   update. An update is governed by the update policy, which does
   allow members, and the insert names you as owner because a row
   that does not exist yet can only be yours. */
async function tripPush(sb, t, uid){
  const row = tripToRow(t, uid);

  /* `select()` makes PostgREST tell us what it actually changed; with
     no select it answers 204 and we cannot tell "updated" from
     "matched nothing". */
  const upd = await withDeadline(
    sb.from('trips').update({ name: row.name, data: row.data }).eq('id', row.id).select('id'),
    12000, 'Saving the trip');

  if (!upd.error && upd.data && upd.data.length) return { ok: true, mode: 'update' };

  /* Nothing updated: either the row is not there, or it is there and
     the policies will not let us touch it. Try the insert; if that
     is refused too, the message explains which of the two it was. */
  const ins = await withDeadline(
    sb.from('trips').insert(Object.assign({}, row, { owner: uid })).select('id'),
    12000, 'Creating the trip');

  if (!ins.error) return { ok: true, mode: 'insert' };

  if (/duplicate key|already exists/i.test(ins.error.message))
    return { error: 'This trip exists in the database under another account, so it cannot be '
                  + 'saved from this one. Sign in as the account that created it, or make a copy.' };

  if (/row-level security/i.test(ins.error.message))
    return { error: 'The database refused to save this trip. Re-run supabase/schema.sql — if it '
                  + 'still refuses after that, the trip belongs to a different account.' };

  return { error: ins.error.message };
}

/* A promise that cannot hang.

   Every call below goes through this. Without it a request that never
   answers — a client that cannot complete, a network that swallows
   it — leaves the interface saying "Sending the invite…" with nothing
   behind it and no way back. A deadline turns silence into an error
   somebody can act on. */
function withDeadline(promise, ms, what){
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(
      () => resolve({ error: { message: (what || 'That') + ' timed out after '
        + Math.round((ms || 12000) / 1000) + 's. Check the Supabase keys and that '
        + 'schema.sql has been run.' } }), ms || 12000))
  ]);
}

/* ---------- load everything this user can see ---------- */
async function cloudLoad(){
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return;
  CLOUD_BUSY = true;
  try {
    const { data, error } = await sb.from('trips').select('*').order('updated_at', { ascending: false });
    if (error) throw error;

    /* MERGE, never replace.

       Replacing was destroying work: a trip made before signing in,
       or one whose upload failed, exists only in this browser. If the
       server's answer simply overwrote the list, that trip vanished —
       and the empty list was then written to localStorage, so it was
       gone for good. Instead: remote rows win where they are newer,
       local-only trips are kept and pushed up. */
    const remote = (data || []).map(rowToTrip);
    const byId = {};
    for (const t of TRIPS) byId[t.id] = t;
    for (const r of remote){
      const mine = byId[r.id];
      byId[r.id] = (mine && (mine.updated || 0) > (r.updated || 0)) ? mine : r;
    }
    TRIPS = Object.keys(byId).map(k => byId[k]).sort((a, b) => (b.updated || 0) - (a.updated || 0));
    /* A merge is the one moment two trips could end up sharing a day id
       or an array, which is what puts a place under the wrong trip. */
    if (typeof tripsIntegrity === 'function') tripsIntegrity('a sign-in');

    /* anything the server has not got yet is unsynced, so leave it out
       of CLOUD_SEEN and the next sync will upload it */
    CLOUD_SEEN = {};
    remote.forEach(r => { if (byId[r.id] === r) CLOUD_SEEN[r.id] = r.updated; });

    try { localStorage.setItem(TRIPS_KEY, JSON.stringify(TRIPS)); } catch(e){}
  } catch(e){
    /* a failed load must change nothing — the local copy stands */
    console.warn('Meridian: could not load trips, keeping the local copy —', e.message || e);
  }
  CLOUD_BUSY = false;
  document.dispatchEvent(new CustomEvent('trips:changed'));
  cloudSync();                       /* push anything the server is missing */
}

/* ---------- push whatever just changed ---------- */
async function cloudSync(){
  if (!CLOUD_ON || CLOUD_BUSY) return;
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return;

  const now = {};
  for (const t of TRIPS) now[t.id] = t.updated;

  /* new or edited */
  for (const t of TRIPS){
    if (CLOUD_SEEN[t.id] === t.updated) continue;
    try {
      const r = await tripPush(sb, t, me.id);
      const error = r.error ? { message: r.error } : null;
      if (error){
        /* Do NOT record it as synced. Marking first meant one failed
           upload made the trip look saved forever, and it was only
           ever in this browser. Left unmarked, the next change or the
           next sign-in tries again. */
        console.warn('Meridian: trip not saved, will retry —', error.message);
        continue;
      }
      CLOUD_SEEN[t.id] = t.updated;
    } catch(e){ console.warn('Meridian: trip not saved, will retry —', e.message); }
  }
  /* deleted here, so delete there — but only ones we know were synced */
  for (const id of Object.keys(CLOUD_SEEN)){
    if (now[id] !== undefined) continue;
    delete CLOUD_SEEN[id];
    try { await sb.from('trips').delete().eq('id', id); } catch(e){}
  }
}

/* ---------- other people's edits ---------- */
async function cloudWatch(){
  const sb = await sbClient(); if (!sb) return;
  if (CLOUD_CHAN) { try { sb.removeChannel(CLOUD_CHAN); } catch(e){} CLOUD_CHAN = null; }
  CLOUD_CHAN = sb.channel('trips-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'trips' }, payload => {
      const r = payload.new || payload.old; if (!r) return;
      if (payload.eventType === 'DELETE'){
        const i = TRIPS.findIndex(t => t.id === r.id);
        if (i !== -1){ TRIPS.splice(i, 1); delete CLOUD_SEEN[r.id];
          document.dispatchEvent(new CustomEvent('trips:changed')); }
        return;
      }
      const incoming = rowToTrip(r);
      /* ignore the echo of our own write */
      if (CLOUD_SEEN[incoming.id] === incoming.updated) return;
      const i = TRIPS.findIndex(t => t.id === incoming.id);
      if (i === -1) TRIPS.push(incoming); else TRIPS[i] = incoming;
      CLOUD_SEEN[incoming.id] = incoming.updated;
      if (typeof tripsIntegrity === 'function') tripsIntegrity('an edit from another device');
      try { localStorage.setItem(TRIPS_KEY, JSON.stringify(TRIPS)); } catch(e){}
      document.dispatchEvent(new CustomEvent('trips:changed'));
    })
    .subscribe();
}

/* ---------- sharing ---------- */
async function tripInvite(tripId, email, role, note){
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return { error: 'Sign in first.' };
  const addr = (email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(addr)) return { error: 'That does not look like an email address.' };

  /* The invite policy checks that the trip exists in the database and
     that you own it. A trip made in this browser before you signed in
     is not there yet, so the database answers "violates row-level
     security" — which reads like a permissions bug and is really a
     missing row. Put the trip up first, then invite. */
  const t = typeof tripGet === 'function' ? tripGet(tripId) : null;
  if (!t) return { error: 'That trip is not open any more.' };
  try {
    const up = await tripPush(sb, t, me.id);
    if (up.error) return { error: 'Could not save the trip before inviting — ' + up.error };
  } catch(e){ return { error: e.message }; }

  try {
    const { error } = await withDeadline(
      sb.from('trip_invites').insert({ trip_id: tripId, email: addr, invited_by: me.id }),
      12000, 'The invite');
    if (error && !/duplicate/i.test(error.message)){
      if (/row-level security/i.test(error.message))
        return { error: 'Only the person who created a trip can invite people to it.' };
      return { error: error.message };
    }

    /* ---- now actually send them something ----

       Access and notification are two different things, and it is
       worth keeping them that way. The row above is what grants
       access, and it has already succeeded by this point. The email
       is a courtesy on top. So a mail failure reports itself and
       does NOT undo the access — which is why this returns ok with a
       `mail` field rather than an error. The dialog says which of
       the two happened. */
    const mail = await inviteEmail(tripId, addr, role, note);
    return { ok: true, mail: mail };
  } catch(e){ return { error: e.message }; }
}

/* The Edge Function that sends the message. See
   supabase/functions/send-invite/index.ts and the README beside it.

   If the function is not deployed, this returns a plain explanation
   rather than throwing: an invite still worked, it just did not get
   emailed, and the person inviting needs to know that precisely. */
async function inviteEmail(tripId, addr, role, note){
  const sb = await sbClient();
  if (!sb || !sb.functions) return { sent: false, why: 'no-function' };

  /* The message needs a link, and only the browser knows what host it
     is on, so the link is made here and passed in. An editor invite
     gets an editor link; a plain one gets view-only. */
  let url = '';
  if (typeof linkCreate === 'function'){
    const l = await linkCreate(tripId, role === 'editor' ? 'editor' : 'viewer',
                               'emailed to ' + addr);
    if (l && l.ok) url = l.url;
    else return { sent: false, why: 'no-link', detail: (l && l.error) || '' };
  }
  if (!url) return { sent: false, why: 'no-link' };

  try {
    const r = await withDeadline(
      sb.functions.invoke('send-invite', {
        body: { trip_id: tripId, email: addr, url: url, role: role || 'viewer', note: note || '' }
      }), 20000, 'The email');

    if (r.error){
      /* supabase-js wraps a non-2xx as an error whose body holds the
         function's own message — which is the one worth showing. */
      let detail = r.error.message || '';
      try {
        const ctx = r.error.context;
        if (ctx && typeof ctx.json === 'function'){
          const j = await ctx.json();
          if (j && j.error) detail = j.error;
        }
      } catch(e){}
      if (/not found|404|Failed to send a request/i.test(detail))
        return { sent: false, why: 'not-deployed', url: url };
      return { sent: false, why: 'failed', detail: detail, url: url };
    }
    if (r.data && r.data.error) return { sent: false, why: 'failed', detail: r.data.error, url: url };
    return { sent: true, url: url };
  } catch(e){
    return { sent: false, why: 'failed', detail: e.message || String(e), url: url };
  }
}

/* members and pending invites, with names rather than emails */
async function tripPeople(tripId){
  const sb = await sbClient(); if (!sb) return { members: [], invites: [] };
  try {
    const [m, i, t] = await Promise.all([
      sb.from('trip_members').select('user_id, role').eq('trip_id', tripId),
      sb.from('trip_invites').select('email').eq('trip_id', tripId),
      sb.from('trips').select('owner').eq('id', tripId).maybeSingle()
    ]);
    const ids = (m.data || []).map(x => x.user_id);
    if (t.data && t.data.owner) ids.push(t.data.owner);
    let names = {};
    if (ids.length){
      const { data } = await sb.from('profiles').select('id, name').in('id', ids);
      (data || []).forEach(p => names[p.id] = p.name);
    }
    const owner = t.data && t.data.owner;
    const members = ids.filter((v, k) => ids.indexOf(v) === k)
      .map(id => ({ id: id, name: names[id] || 'Someone', owner: id === owner }));
    return { members: members, invites: (i.data || []).map(x => x.email) };
  } catch(e){ return { members: [], invites: [] }; }
}

async function tripUninvite(tripId, email){
  const sb = await sbClient(); if (!sb) return;
  try { await sb.from('trip_invites').delete().eq('trip_id', tripId).eq('email', email); } catch(e){}
}

/* ---------- wiring ---------- */
document.addEventListener('trips:changed', () => { cloudSync(); });

document.addEventListener('auth:changed', async () => {
  const on = !!currentUser() && cloudReady();
  if (on && !CLOUD_ON){
    CLOUD_ON = true;
    await claimInvites();      // pick up anything addressed to this email
    await cloudLoad();
    await marksPull();         // and the been / want-to-go map
    cloudWatch();
  } else if (!on && CLOUD_ON){
    CLOUD_ON = false;
    const sb = SB; if (sb && CLOUD_CHAN){ try { sb.removeChannel(CLOUD_CHAN); } catch(e){} CLOUD_CHAN = null; }
    /* signed out: fall back to whatever is cached locally */
    try { TRIPS = JSON.parse(localStorage.getItem(TRIPS_KEY) || '[]') || []; } catch(e){ TRIPS = []; }
    document.dispatchEvent(new CustomEvent('trips:changed'));
  }
});

function cloudActive(){ return CLOUD_ON; }

/* ===========================================================
   MARKS IN THE ACCOUNT

   Been and want-to-go lived only in localStorage, which is why a map
   filled in on a laptop was blank on a phone: there was nothing to
   sync, not a sync that failed.

   The merge is deliberately generous. A mark is a small, deliberate
   act and losing one is worse than keeping one too many, so on
   signing in the two sets are combined rather than one replacing the
   other, and the server's value wins only where both sides have the
   same place marked differently.
   =========================================================== */
let MARKS_BUSY = false;

async function marksPull(){
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return;
  MARKS_BUSY = true;
  try {
    const r = await withDeadline(
      sb.from('marks').select('place_id,value'), 12000, 'Loading your marks');
    if (r.error) throw new Error(r.error.message);

    const remote = {};
    (r.data || []).forEach(row => { remote[row.place_id] = row.value; });

    const local = (typeof allMarks === 'function') ? allMarks() : {};
    const merged = Object.assign({}, local, remote);   /* server wins a clash */
    if (typeof marksReplace === 'function') marksReplace(merged);

    /* push anything this browser had that the account did not */
    const missing = Object.keys(local).filter(id => remote[id] !== local[id]);
    if (missing.length){
      const rows = missing.map(id => ({ user_id: me.id, place_id: id, value: local[id] }));
      await withDeadline(sb.from('marks').upsert(rows, { onConflict: 'user_id,place_id' }),
                         15000, 'Saving your marks');
    }
  } catch(e){
    console.warn('Meridian: could not sync marks —', e.message || e);
  }
  MARKS_BUSY = false;
}

async function marksPush(placeId, value){
  if (MARKS_BUSY) return;                 /* a pull is rewriting them */
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me || !placeId) return;
  try {
    if (value){
      await withDeadline(
        sb.from('marks').upsert({ user_id: me.id, place_id: placeId, value: value },
                                { onConflict: 'user_id,place_id' }), 12000, 'Saving that mark');
    } else {
      await withDeadline(
        sb.from('marks').delete().eq('user_id', me.id).eq('place_id', placeId),
        12000, 'Clearing that mark');
    }
  } catch(e){ /* the local copy still stands */ }
}
