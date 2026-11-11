/* ===========================================================
   WHAT THE USER HAS MARKED

   Been and want live on individual places — a city, a park, a
   shore — never on a whole state. A state is geography; you do
   not "visit Texas", you visit Big Bend and Austin.

   MARKS   placeId -> 'been' | 'want'

   Storage is wrapped in try/catch throughout: iOS Safari with
   "block all cookies" throws on localStorage rather than
   returning null, and an unguarded read would kill the file.
   =========================================================== */

const MARK_KEY = 'meridian.marks';

let MARKS = (function(){
  try { return JSON.parse(localStorage.getItem(MARK_KEY) || '{}') || {}; }
  catch(e){ return {}; }
})();

function markOf(id){ return MARKS[id] || ''; }

function setMark(id, value){
  if (value) MARKS[id] = value; else delete MARKS[id];
  try { localStorage.setItem(MARK_KEY, JSON.stringify(MARKS)); } catch(e){}
  document.dispatchEvent(new CustomEvent('marks:changed', { detail:{ id:id, value:value } }));
}

/* been -> want -> unmarked -> been */
function cycleMark(id){
  const now = markOf(id);
  setMark(id, now === 'been' ? 'want' : now === 'want' ? '' : 'been');
  return markOf(id);
}

function markCounts(){
  let been = 0, want = 0;
  for (const k in MARKS){ if (MARKS[k] === 'been') been++; else if (MARKS[k] === 'want') want++; }
  return { been: been, want: want, total: been + want };
}

/* Everything marked, as ids. */
function markedIds(kind){
  return Object.keys(MARKS).filter(id => !kind || MARKS[id] === kind);
}
