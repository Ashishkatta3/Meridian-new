/* ===========================================================
   TRIPS

   The planner's data. Everything lives in localStorage for now, in
   one shape that is deliberately easy to sync later: a trip is a
   plain object with an id, so pushing these rows to Supabase and
   subscribing to changes is a swap of these functions' bodies, not
   a rewrite of the planner.

   trip = {
     id, name, created, updated,
     days:  [ { id, label, stops:[placeId,…] }, … ],
     ideas: [ placeId, … ],                 // not yet given a day
     notes: { placeId: [ {text, at, by}, … ] }
   }

   Every write bumps `updated` and fires 'trips:changed', so the UI
   repaints from one place.
   =========================================================== */

const TRIPS_KEY = 'meridian.trips';

let TRIPS = (function(){
  try { const a = JSON.parse(localStorage.getItem(TRIPS_KEY) || '[]'); return Array.isArray(a) ? a : []; }
  catch(e){ return []; }
})();

function tripsSave(){
  /* A last line of defence: if something upstream ever hands us an
     empty list while storage holds trips, keep a copy before writing,
     so the work can be recovered rather than silently lost. */
  try {
    if (!TRIPS.length){
      const prev = localStorage.getItem(TRIPS_KEY);
      if (prev && prev.length > 4) localStorage.setItem(TRIPS_KEY + '.backup', prev);
    }
    localStorage.setItem(TRIPS_KEY, JSON.stringify(TRIPS));
  } catch(e){}
  document.dispatchEvent(new CustomEvent('trips:changed'));
}

/* A real UUID, because the database keys trips by uuid and a trip
   made offline has to keep its id when it syncs. */
function tripId(){
  try { if (crypto && crypto.randomUUID) return crypto.randomUUID(); } catch(e){}
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function tripsAll(){ return TRIPS.slice().sort((a, b) => (b.updated || 0) - (a.updated || 0)); }
function tripGet(id){ return TRIPS.find(t => t.id === id) || null; }

function tripCreate(name){
  const t = { id: tripId(), name: name || 'Untitled trip', created: Date.now(), updated: Date.now(),
              days: [{ id: 'd1', label: 'Day 1', stops: [] }], ideas: [], notes: {} };
  TRIPS.push(t); tripsSave(); return t;
}
function tripRename(id, name){ const t = tripGet(id); if (t){ t.name = name || t.name; t.updated = Date.now(); tripsSave(); } }
function tripDelete(id){ const i = TRIPS.findIndex(t => t.id === id); if (i !== -1){ TRIPS.splice(i, 1); tripsSave(); } }

/* ---- stops ---- */
function tripHasPlace(t, pid){
  if (!t) return false;
  if (t.ideas.indexOf(pid) !== -1) return true;
  return t.days.some(d => d.stops.indexOf(pid) !== -1);
}
function tripAddPlace(id, pid){
  const t = tripGet(id); if (!t || tripHasPlace(t, pid)) return;
  t.ideas.push(pid); t.updated = Date.now(); tripsSave();
}
function tripRemovePlace(id, pid){
  const t = tripGet(id); if (!t) return;
  let i = t.ideas.indexOf(pid); if (i !== -1) t.ideas.splice(i, 1);
  t.days.forEach(d => { const j = d.stops.indexOf(pid); if (j !== -1) d.stops.splice(j, 1); });
  delete t.notes[pid];
  t.updated = Date.now(); tripsSave();
}

/* move a place into a list ('ideas' or a day id) at a position */
function tripMove(id, pid, toList, toIndex){
  const t = tripGet(id); if (!t) return;
  // pull it out of wherever it is
  let k = t.ideas.indexOf(pid); if (k !== -1) t.ideas.splice(k, 1);
  t.days.forEach(d => { const j = d.stops.indexOf(pid); if (j !== -1) d.stops.splice(j, 1); });
  // put it where it is going
  const target = toList === 'ideas' ? t.ideas : (t.days.find(d => d.id === toList) || {}).stops;
  if (!target) { t.ideas.push(pid); }
  else if (toIndex == null || toIndex < 0 || toIndex >= target.length) target.push(pid);
  else target.splice(toIndex, 0, pid);
  t.updated = Date.now(); tripsSave();
}

/* ---- days ---- */
function tripAddDay(id){
  const t = tripGet(id); if (!t) return;
  const n = t.days.length + 1;
  /* The id must be unique within the trip. Date.now() alone is not:
     two days added in the same millisecond get the same id, and then
     stops silently land in the wrong day. Add randomness, and check. */
  let did;
  do { did = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  while (t.days.some(d => d.id === did));
  t.days.push({ id: did, label: 'Day ' + n, stops: [] });
  t.updated = Date.now(); tripsSave();
}
function tripRenameDay(id, dayId, label){
  const t = tripGet(id); if (!t) return;
  const d = t.days.find(x => x.id === dayId); if (d){ d.label = label || d.label; t.updated = Date.now(); tripsSave(); }
}
function tripRemoveDay(id, dayId){
  const t = tripGet(id); if (!t || t.days.length <= 1) return;
  const i = t.days.findIndex(d => d.id === dayId); if (i === -1) return;
  t.ideas = t.ideas.concat(t.days[i].stops);     // never lose a stop
  t.days.splice(i, 1); t.updated = Date.now(); tripsSave();
}

/* ---- comments ---- */
function tripComment(id, pid, text, who){
  const t = tripGet(id); if (!t || !text.trim()) return;
  (t.notes[pid] = t.notes[pid] || []).push({ text: text.trim(), at: Date.now(), by: who || 'You' });
  t.updated = Date.now(); tripsSave();
}
function tripUncomment(id, pid, at){
  const t = tripGet(id); if (!t || !t.notes[pid]) return;
  t.notes[pid] = t.notes[pid].filter(c => c.at !== at);
  if (!t.notes[pid].length) delete t.notes[pid];
  t.updated = Date.now(); tripsSave();
}

/* ---- export ---- */
function tripStops(t){
  const out = [];
  t.days.forEach(d => d.stops.forEach(pid => out.push({ day: d.label, pid: pid })));
  t.ideas.forEach(pid => out.push({ day: 'Ideas', pid: pid }));
  return out;
}
function tripToText(t){
  const L = [t.name, '='.repeat(t.name.length), ''];
  t.days.forEach(d => {
    L.push(d.label);
    if (!d.stops.length) L.push('  (nothing yet)');
    d.stops.forEach((pid, i) => {
      const p = stopInfo(pid); if (!p) return;
      L.push('  ' + (i + 1) + '. ' + p.name + (p.kind === 'spot' ? '  (' + p.sub + ')' : ', ' + p.sub));
      (t.notes[pid] || []).forEach(c => L.push('       - ' + c.by + ': ' + c.text));
    });
    L.push('');
  });
  if (t.ideas.length){
    L.push('Ideas (no day yet)');
    t.ideas.forEach(pid => { const p = stopInfo(pid); if (p) L.push('  - ' + p.name + (p.kind === 'spot' ? '  (' + p.sub + ')' : ', ' + p.sub)); });
    L.push('');
  }
  L.push('Made with Meridian');
  return L.join('\n');
}
