/* ===========================================================
   ITINERARY

   A simple ordered list of place ids the user wants on a trip.
   The "add to itinerary" button on every place writes here, and
   the group/AI planner phases will read and extend it. Kept apart
   from been/want (state.js) on purpose: wanting to go somewhere and
   putting it on a specific trip are different acts.

   ITIN  ->  [ placeId, placeId, ... ]   (order is the user's)

   localStorage is wrapped in try/catch like everywhere else, so a
   browser that forbids storage degrades to an in-memory list for
   the session rather than throwing.
   =========================================================== */

const ITIN_KEY = 'meridian.itin';

let ITIN = (function(){
  try { const a = JSON.parse(localStorage.getItem(ITIN_KEY) || '[]'); return Array.isArray(a) ? a : []; }
  catch(e){ return []; }
})();

function itinSave(){
  try { localStorage.setItem(ITIN_KEY, JSON.stringify(ITIN)); } catch(e){}
  document.dispatchEvent(new CustomEvent('itin:changed', { detail: { list: ITIN.slice() } }));
}

function itinHas(id){ return ITIN.indexOf(id) !== -1; }
function itinCount(){ return ITIN.length; }
function itinList(){ return ITIN.slice(); }

function itinAdd(id){ if (!itinHas(id)){ ITIN.push(id); itinSave(); } return true; }
function itinRemove(id){ const i = ITIN.indexOf(id); if (i !== -1){ ITIN.splice(i, 1); itinSave(); } return false; }

/* add if absent, remove if present; returns the new state */
function itinToggle(id){ return itinHas(id) ? itinRemove(id) : itinAdd(id); }
