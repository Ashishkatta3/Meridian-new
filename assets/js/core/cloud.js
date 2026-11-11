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
           days: d.days || [{ id: 'd1', label: 'Day 1', stops: [] }],
           ideas: d.ideas || [], notes: d.notes || {},
           owner: r.owner, shared: true };
}
function tripToRow(t, uid){
  return { id: t.id, owner: t.owner || uid, name: t.name,
           data: { days: t.days, ideas: t.ideas, notes: t.notes } };
}

/* ---------- load everything this user can see ---------- */
async function cloudLoad(){
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return;
  CLOUD_BUSY = true;
  try {
    const { data, error } = await sb.from('trips').select('*').order('updated_at', { ascending: false });
    if (error) throw error;
    TRIPS = (data || []).map(rowToTrip);
    CLOUD_SEEN = {};
    TRIPS.forEach(t => CLOUD_SEEN[t.id] = t.updated);
    try { localStorage.setItem(TRIPS_KEY, JSON.stringify(TRIPS)); } catch(e){}
  } catch(e){
    console.warn('Meridian: could not load trips —', e.message || e);
  }
  CLOUD_BUSY = false;
  document.dispatchEvent(new CustomEvent('trips:changed'));
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
    CLOUD_SEEN[t.id] = t.updated;
    try {
      const { error } = await sb.from('trips').upsert(tripToRow(t, me.id), { onConflict: 'id' });
      if (error) console.warn('Meridian: trip not saved —', error.message);
    } catch(e){ console.warn('Meridian: trip not saved —', e.message); }
  }
  /* deleted */
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
      try { localStorage.setItem(TRIPS_KEY, JSON.stringify(TRIPS)); } catch(e){}
      document.dispatchEvent(new CustomEvent('trips:changed'));
    })
    .subscribe();
}

/* ---------- sharing ---------- */
async function tripInvite(tripId, email){
  const sb = await sbClient(); const me = currentUser();
  if (!sb || !me) return { error: 'Sign in first.' };
  const addr = (email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(addr)) return { error: 'That does not look like an email address.' };
  try {
    const { error } = await sb.from('trip_invites').insert({ trip_id: tripId, email: addr, invited_by: me.id });
    if (error && !/duplicate/i.test(error.message)) return { error: error.message };
    return { ok: true };
  } catch(e){ return { error: e.message }; }
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
