/* ===========================================================
   ADD TO A TRIP

   The old "add to itinerary" button was a toggle: pressing it twice
   quietly removed the place again, which reads as the button not
   working. Adding something is not a toggle, so this replaces it.

   addToTrip(stopId):
     no trips yet      -> makes one and drops the stop in, no dialog
     exactly one trip  -> still asks, because silently filing a stop
                          into a trip you did not name is worse than
                          one tap; the trip is pre-selected
     several trips     -> pick one, or make a new one

   Works for a place and for an attraction inside a city alike, since
   both are just stop ids (see core/stops.js).
   =========================================================== */


/* An attraction belongs under its city. If the city is not on the
   trip yet, add it too — you cannot stand on the Golden Gate Bridge
   without being in San Francisco, and without it the attraction has
   nothing to sit under on the board. */
function addStopWithParent(tripId, sid){
  const info = stopInfo(sid);
  if (info && info.kind === 'spot' && !tripHasPlace(tripGet(tripId), info.parent)){
    tripAddPlace(tripId, info.parent);
  }
  tripAddPlace(tripId, sid);
}

function addToTrip(sid, done){
  const info = stopInfo(sid);
  if (!info) return;
  const trips = tripsAll();

  /* nothing to choose between — make the first trip and move on */
  if (!trips.length){
    const t = tripCreate('My trip');
    addStopWithParent(t.id, sid);
    toast(info.name + ' added to a new trip');
    if (done) done(t.id);
    return;
  }
  openPicker(info, trips, done);
}

function openPicker(info, trips, done){
  const wrap = document.createElement('div');
  wrap.className = 'pk-wrap';
  wrap.innerHTML =
      '<div class="pk" role="dialog" aria-modal="true" aria-label="Add to a trip">'
    +   '<button class="pk-x" data-close aria-label="Close">×</button>'
    +   '<span class="lab">Add to a trip</span>'
    +   '<h3>' + plEsc(info.name) + '</h3>'
    +   '<p class="pk-sub">' + plEsc(info.sub) + '</p>'
    +   '<div class="pk-list">'
    +     trips.map(t => {
            const n = t.days.reduce((a, d) => a + d.stops.length, 0) + t.ideas.length;
            const has = tripHasPlace(t, info.id);
            return '<button class="pk-trip" data-trip="' + t.id + '"' + (has ? ' disabled' : '') + '>'
              + '<b>' + plEsc(t.name) + '</b><i>' + (has ? 'already on this trip' : n + (n === 1 ? ' place' : ' places')) + '</i></button>';
          }).join('')
    +   '</div>'
    +   '<div class="pk-new"><input id="pkName" type="text" placeholder="Or name a new trip…" autocomplete="off">'
    +     '<button class="pg-btn pg-btn-go" data-new>Create</button></div>'
    + '</div>';
  document.body.appendChild(wrap);

  const close = () => { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); document.removeEventListener('keydown', esc); };
  const esc = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc);

  /* The × answers to the press rather than a completed click: a
     trackpad that slides a pixel between press and release never
     produces one, which is why closing used to take several tries. */
  wrap.addEventListener('pointerdown', e => {
    if (e.target === wrap || (e.target.closest && e.target.closest('[data-close]'))) close();
  });

  wrap.addEventListener('click', e => {
    if (e.target === wrap || e.target.closest('[data-close]')) return close();

    const pick = e.target.closest('[data-trip]');
    if (pick && !pick.disabled){
      addStopWithParent(pick.dataset.trip, info.id);
      close(); toast(info.name + ' added to ' + tripGet(pick.dataset.trip).name);
      if (done) done(pick.dataset.trip);
      return;
    }
    if (e.target.closest('[data-new]')){
      const name = (wrap.querySelector('#pkName').value || '').trim() || 'My trip';
      const t = tripCreate(name);
      addStopWithParent(t.id, info.id);
      close(); toast(info.name + ' added to ' + t.name);
      if (done) done(t.id);
    }
  });
  wrap.querySelector('#pkName').addEventListener('keydown', e => {
    if (e.key === 'Enter'){ e.preventDefault(); wrap.querySelector('[data-new]').click(); }
  });
}

/* which trips a stop is already on */
function tripsWith(sid){ return tripsAll().filter(t => tripHasPlace(t, sid)); }

/* ---------- a small confirmation that fades ---------- */
let TOAST_T = 0;
function toast(msg){
  let el = document.getElementById('toast');
  if (!el){
    el = document.createElement('div');
    el.id = 'toast'; el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = plEsc(msg) + ' <a href="#/planner">View trips</a>';
  el.classList.add('is-on');
  clearTimeout(TOAST_T);
  TOAST_T = setTimeout(() => el.classList.remove('is-on'), 3600);
}
