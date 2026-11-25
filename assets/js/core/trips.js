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

/* ---------- integrity ----------

   Places added to one trip were turning up in another. Reading the
   code could not produce it: every read and write is scoped to one
   trip object. So rather than guess at a cause a third time, this
   makes the two states that WOULD produce it impossible, and says so
   in the console when it finds one — if a line from here ever appears
   in your browser, that is the answer and it names the trips.

   Two states can do it. One: two entries in TRIPS sharing an id, so a
   write lands on one and a read finds the other. Two: two trips whose
   `ideas` or `days` is literally the same array object, where pushing
   to one pushes to both. JSON.parse cannot alias, but a merge, a
   realtime payload or a hand-edited cache can. */
function tripsIntegrity(why){
  const seenId = {}, seenRef = [], fixed = [];
  const ownArray = (obj, key, label) => {
    const a = obj[key];
    if (!Array.isArray(a)){ obj[key] = []; fixed.push(label + '.' + key + ' was not a list'); return; }
    if (seenRef.indexOf(a) !== -1){
      obj[key] = JSON.parse(JSON.stringify(a));
      fixed.push(label + '.' + key + ' shared one array with another trip');
    } else seenRef.push(a);
  };

  for (let i = TRIPS.length - 1; i >= 0; i--){
    const t = TRIPS[i];
    if (!t || !t.id){ TRIPS.splice(i, 1); fixed.push('a trip with no id'); continue; }
    if (seenId[t.id]){
      /* keep whichever was edited last and drop the other */
      const keep = (seenId[t.id].updated || 0) >= (t.updated || 0) ? seenId[t.id] : t;
      const drop = keep === t ? seenId[t.id] : t;
      TRIPS.splice(TRIPS.indexOf(drop), 1);
      seenId[t.id] = keep;
      fixed.push('two copies of "' + (t.name || t.id) + '" shared one id');
      continue;
    }
    seenId[t.id] = t;

    ownArray(t, 'ideas', t.name || t.id);
    ownArray(t, 'days',  t.name || t.id);
    if (!t.notes || typeof t.notes !== 'object'){ t.notes = {}; }

    /* Dates arrive from the cloud as well as from this browser, so
       anything that is not a plain ISO day is dropped rather than
       trusted. An end before a start is cleared too: it would make
       tripNights go negative and the day labels run backwards. */
    const isDay = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
    if (!isDay(t.start)) t.start = '';
    if (!isDay(t.end))   t.end = '';
    if (t.start && t.end && t.end < t.start){
      t.end = '';
      fixed.push('an end date before the start in "' + (t.name || t.id) + '"');
    }

    /* day ids have to be unique inside a trip, or a stop dragged into
       one day lands in the other */
    const dayIds = {};
    t.days.forEach((d, n) => {
      if (!d.stops || !Array.isArray(d.stops)) d.stops = [];
      else ownArray(d, 'stops', (t.name || t.id) + ' ' + (d.label || ('day ' + (n + 1))));
      if (!d.id || dayIds[d.id]){
        d.id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        fixed.push('a duplicate day id in "' + (t.name || t.id) + '"');
      }
      dayIds[d.id] = 1;
    });
  }

  if (fixed.length){
    console.warn('Meridian repaired the trip list' + (why ? ' after ' + why : '') + ':\n  · '
      + fixed.join('\n  · ') + '\n  If you are seeing places under the wrong trip, this is why.');
  }
  return fixed;
}
tripsIntegrity('load');

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

/* Two trips called "Colorado" are impossible to tell apart in the
   picker, the share dialog and the trip list, so a repeat gets a
   number rather than being refused outright. */
function tripUniqueName(want, exceptId){
  let base = (want || 'Untitled trip').trim() || 'Untitled trip';
  const taken = n => TRIPS.some(t => t.id !== exceptId && t.name.toLowerCase() === n.toLowerCase());
  if (!taken(base)) return base;
  let n = 2;
  while (taken(base + ' ' + n)) n++;
  return base + ' ' + n;
}

function tripCreate(name){
  /* The first day gets a unique id like every other day. It used to be
     the literal 'd1' in every trip, so two trips shared a day id — a
     collision waiting to put a stop under the wrong trip's day. */
  const t = { id: tripId(), name: tripUniqueName(name || 'Untitled trip'), created: Date.now(), updated: Date.now(),
              start: '', end: '',
              days: [{ id: 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                       label: 'Day 1', stops: [] }], ideas: [], notes: {} };
  TRIPS.push(t); tripsSave(); return t;
}
/* ---- travel dates ----

   A trip carries an optional start and end as plain ISO dates
   ("2026-04-02"), not timestamps. Dates here mean calendar days in
   the place you are going, so a timestamp would drag a timezone
   into it and shift the day for anyone east or west of wherever
   the trip was planned.

   Both are optional and either can be set alone. Trips created
   before this existed simply have neither, which every reader
   below treats as "no dates set". */
function tripSetDates(id, start, end){
  const t = tripGet(id); if (!t) return { error: 'No such trip.' };
  const ok = v => !v || /^\d{4}-\d{2}-\d{2}$/.test(v);
  if (!ok(start) || !ok(end)) return { error: 'Dates need to look like 2026-04-02.' };

  if (start && end && end < start){
    return { error: 'The end date is before the start date.' };
  }
  t.start = start || '';
  t.end   = end || '';
  t.updated = Date.now();
  tripsSave();
  return { ok: true };
}

/* Nights, not days. A trip from the 2nd to the 5th is three nights
   and four days, and people book hotels in nights. */
function tripNights(t){
  if (!t || !t.start || !t.end) return null;
  const a = Date.parse(t.start + 'T00:00:00Z'), b = Date.parse(t.end + 'T00:00:00Z');
  if (isNaN(a) || isNaN(b)) return null;
  return Math.max(0, Math.round((b - a) / 86400000));
}

/* The calendar date of day N, when a start date is set. Day 1 is
   the start date itself. */
function tripDayDate(t, index){
  if (!t || !t.start) return null;
  const ms = Date.parse(t.start + 'T00:00:00Z');
  if (isNaN(ms)) return null;
  return new Date(ms + index * 86400000);
}

function tripDayDateLabel(t, index){
  const d = tripDayDate(t, index);
  if (!d) return '';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short'
    }).format(d);
  } catch (e){ return ''; }
}

/* Human summary for the trip header. */
function tripDateLabel(t){
  if (!t || (!t.start && !t.end)) return '';
  const fmt = iso => {
    const ms = Date.parse(iso + 'T00:00:00Z');
    if (isNaN(ms)) return iso;
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric'
      }).format(new Date(ms));
    } catch (e){ return iso; }
  };
  if (t.start && t.end){
    const n = tripNights(t);
    return fmt(t.start) + ' to ' + fmt(t.end)
      + (n != null ? ' \u00b7 ' + n + (n === 1 ? ' night' : ' nights') : '');
  }
  return t.start ? 'from ' + fmt(t.start) : 'until ' + fmt(t.end);
}

/* How many days until departure, for the countdown in the header. */
function tripDaysAway(t){
  if (!t || !t.start) return null;
  const today = new Date().toISOString().slice(0, 10);
  const a = Date.parse(today + 'T00:00:00Z'), b = Date.parse(t.start + 'T00:00:00Z');
  if (isNaN(a) || isNaN(b)) return null;
  return Math.round((b - a) / 86400000);
}

function tripRename(id, name){
  const t = tripGet(id); if (!t) return;
  t.name = tripUniqueName(name || t.name, id);
  t.updated = Date.now(); tripsSave();
}
function tripDelete(id){ const i = TRIPS.findIndex(t => t.id === id); if (i !== -1){ TRIPS.splice(i, 1); tripsSave(); } }

/* ---- stops ---- */
function tripHasPlace(t, pid){
  if (!t) return false;
  if (t.ideas.indexOf(pid) !== -1) return true;
  return t.days.some(d => d.stops.indexOf(pid) !== -1);
}
/* A place can legitimately appear twice: you drive back through it,
   or you stay two nights. Repeats get an instance suffix (@2, @3) so
   each card is its own stop with its own note and position, while
   stopInfo still resolves it to the same place. */
function tripStopInstance(t, pid){
  if (!tripHasPlace(t, pid)) return pid;
  let n = 2;
  while (tripHasPlace(t, pid + '@' + n)) n++;
  return pid + '@' + n;
}
function tripAddPlace(id, pid, allowRepeat){
  const t = tripGet(id); if (!t) return;
  if (tripHasPlace(t, pid) && !allowRepeat) return;

  /* Count every other trip before and after. If adding to one trip
     changes another, this says which two and stops guessing. */
  const before = TRIPS.map(x => x.ideas.length + x.days.reduce((a, d) => a + d.stops.length, 0));

  t.ideas.push(allowRepeat ? tripStopInstance(t, pid) : pid);
  t.updated = Date.now();

  TRIPS.forEach((x, i) => {
    if (x === t) return;
    const now = x.ideas.length + x.days.reduce((a, d) => a + d.stops.length, 0);
    if (now !== before[i]){
      console.error('Meridian: adding "' + pid + '" to "' + t.name + '" also changed "'
        + x.name + '" (' + before[i] + ' → ' + now + '). Repairing.');
      tripsIntegrity('an add that touched two trips');
    }
  });

  tripsSave();
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

/* ---- where you are sleeping and eating ----

   Kept per place rather than per day, because a hotel belongs to a
   town: one list of beds and one list of tables under each stop, in
   the order you want to work through them.

     t.stay = { placeId: [ { id, kind:'stay'|'eat', name, sub, url }, … ] }

   The field is created on demand so trips made before this existed
   keep working untouched. */
function tripStayList(t, key, kind){
  if (!t || !t.stay || !t.stay[key]) return [];
  return t.stay[key].filter(x => x.kind === kind);
}
function tripStayHas(t, key, name){
  if (!t || !t.stay || !t.stay[key]) return false;
  const n = String(name || '').toLowerCase();
  return t.stay[key].some(x => String(x.name).toLowerCase() === n);
}
function tripStayAdd(id, key, item){
  const t = tripGet(id); if (!t || !item || !item.name) return null;
  t.stay = t.stay || {};
  t.stay[key] = t.stay[key] || [];
  if (tripStayHas(t, key, item.name)) return null;
  const row = {
    id  : 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    kind: item.kind === 'stay' ? 'stay' : 'eat',
    name: String(item.name).slice(0, 120),
    sub : String(item.sub || '').slice(0, 160),
    url : String(item.url || '')
  };
  t.stay[key].push(row);
  t.updated = Date.now(); tripsSave();
  return row;
}
function tripStayRemove(id, key, rowId){
  const t = tripGet(id); if (!t || !t.stay || !t.stay[key]) return;
  t.stay[key] = t.stay[key].filter(x => x.id !== rowId);
  if (!t.stay[key].length) delete t.stay[key];
  t.updated = Date.now(); tripsSave();
}
/* Reorder within its own kind, so moving a restaurant up never
   steps over a hotel sitting between them in the raw array. */
function tripStayMove(id, key, rowId, dir){
  const t = tripGet(id); if (!t || !t.stay || !t.stay[key]) return;
  const all = t.stay[key];
  const row = all.find(x => x.id === rowId); if (!row) return;
  const same = all.filter(x => x.kind === row.kind);
  const at = same.indexOf(row), to = at + (dir < 0 ? -1 : 1);
  if (to < 0 || to >= same.length) return;
  const other = same[to];
  const i = all.indexOf(row), j = all.indexOf(other);
  all[i] = other; all[j] = row;
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
  if (t.stay && Object.keys(t.stay).length){
    L.push('Stay & eat');
    Object.keys(t.stay).forEach(key => {
      const rows = t.stay[key]; if (!rows || !rows.length) return;
      const p = stopInfo(key);
      L.push('  ' + (p ? p.name : key));
      rows.forEach(r => L.push('    ' + (r.kind === 'stay' ? '[bed] ' : '[eat] ') + r.name
                               + (r.sub ? ' — ' + r.sub : '') + (r.url ? '  ' + r.url : '')));
    });
    L.push('');
  }
  L.push('Made with Meridian');
  return L.join('\n');
}
