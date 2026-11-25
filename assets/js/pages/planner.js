/* ===========================================================
   THE PLANNER

   #/planner            the list of trips
   #/planner/<id>       one trip: days, stops, comments

   Stops are dragged with pointer events rather than HTML5 drag-and
   -drop, because HTML5 DnD does not fire on touch — this way the
   same code works with a mouse and a thumb. Every card also carries
   a "move to day" select, so the board is still usable by keyboard
   and for anyone who would rather not drag at all.

   Everything is local for now. Sharing a trip with other people
   needs the backend, and the page says so rather than pretending.
   =========================================================== */

function renderPlannerList(){
  const trips = tripsAll();
  let h = '<section class="wrap pg"><div class="pg-head">'
        + '<div><span class="lab">The planner</span><h1>Your trips</h1>'
        + '<p class="pg-sub">Build a route from places in the atlas, sort them into days, and leave notes on each stop.</p></div>'
        + '<button class="pg-btn pg-btn-go" id="newTrip">+ New trip</button></div>';

  if (!trips.length){
    h += '<div class="pg-empty"><p>No trips yet.</p>'
       + '<p class="pg-note">Start one, then add places from the atlas — a whole city, or a single thing to do inside it.</p></div>';
  } else {
    h += '<ul class="pg-trips">' + trips.map(t => {
      const n = t.days.reduce((a, d) => a + d.stops.length, 0) + t.ideas.length;
      const first = (t.days.find(d => d.stops.length) || {}).stops || t.ideas;
      const thumb = first && first[0] && (stopInfo(first[0]) || {}).photoId;
      return '<li><a class="pg-trip" href="#/planner/' + t.id + '">'
           + '<span class="pg-trip-ph"' + (thumb ? ' data-pgphoto="' + thumb + '"' : '') + '></span>'
           + '<span class="pg-trip-tx"><b>' + plEsc(t.name) + '</b>'
           + '<i>' + n + (n === 1 ? ' place' : ' places') + ' · ' + t.days.length + (t.days.length === 1 ? ' day' : ' days') + '</i></span>'
           + '</a><button class="pg-x" data-del="' + t.id + '" title="Delete trip">×</button></li>';
    }).join('') + '</ul>';
  }

  return h + '</section>';
}

function renderTrip(id){
  const t = tripGet(id);
  if (!t) return '<section class="wrap pg"><p>That trip no longer exists.</p><p><a class="pl-back" href="#/planner">← All trips</a></p></section>';

  const total = t.days.reduce((a, d) => a + d.stops.length, 0) + t.ideas.length;
  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/planner">← All trips</a>'
    + '<div class="pg-head">'
    +   '<div><span class="lab">Trip</span>'
    +     '<h1 class="pg-name" id="tripName" contenteditable="true" spellcheck="false">' + plEsc(t.name) + '</h1>'
    +     '<p class="pg-sub">' + total + (total === 1 ? ' place' : ' places') + ' across ' + t.days.length + (t.days.length === 1 ? ' day' : ' days') + ' · drag a stop to reorder or move it between days</p>'
    +     plTripDates(t) + '</div>'
    +   '<div class="pg-acts">'
    +     '<button class="pg-btn" id="shareTrip">Share</button>'
    +     '<a class="pg-btn" href="#/sheet/' + plEsc(t.id) + '">Day sheet</a>'
    +     '<button class="pg-btn" id="expTxt">Export</button>'
    +   '</div>'
    + '</div>';

  /* ---- travel dates ----

   Collapsed to a single line until somebody clicks it, because most
   of the time the dates are already set or not wanted and a pair of
   empty date fields at the top of the page is just noise.

   Two native date inputs rather than a custom picker: they get the
   platform calendar, the right keyboard on a phone and the user's
   own locale for free. */
function plTripDates(t){
  const label = (typeof tripDateLabel === 'function') ? tripDateLabel(t) : '';
  const away  = (typeof tripDaysAway === 'function')  ? tripDaysAway(t)  : null;

  let line;
  if (label){
    let extra = '';
    if (away != null){
      if (away > 1)       extra = ' \u00b7 ' + away + ' days away';
      else if (away === 1) extra = ' \u00b7 tomorrow';
      else if (away === 0) extra = ' \u00b7 today';
    }
    line = '<b>' + plEsc(label) + '</b>' + plEsc(extra);
  } else {
    line = '<span class="pl-dates-none">No dates set</span>';
  }

  return '<div class="pl-dates" id="plDates">'
    + '<button type="button" class="pl-dates-toggle" id="plDatesToggle" aria-expanded="false">'
    +   line + '<i>' + (label ? 'Change' : 'Add dates') + '</i>'
    + '</button>'
    + '<div class="pl-dates-edit" id="plDatesEdit" hidden>'
    +   '<label>Leaving<input type="date" id="plStart" value="' + plEsc(t.start || '') + '"></label>'
    +   '<label>Coming back<input type="date" id="plEnd" value="' + plEsc(t.end || '') + '"></label>'
    +   '<button class="pg-btn pg-btn-go" id="plDatesSave">Save</button>'
    +   (t.start || t.end ? '<button class="pg-btn" id="plDatesClear">Clear</button>' : '')
    +   '<p class="pl-dates-msg" id="plDatesMsg"></p>'
    + '</div></div>';
}

/* What the trip actually costs, in miles, hours and dollars.
     Filled in by wireTotals() once the router answers. */
  h += '<div class="pg-totals" id="pgTotals" hidden></div>';

  /* add places */
  h += '<div class="pg-add">'
     + '<input id="pgSearch" type="search" placeholder="Search the atlas to add a place…" autocomplete="off">'
     + '<div class="pg-results" id="pgResults" hidden></div>'
     + addFromRow(t)
     + '</div>';

  h += '<div class="tr-tabs pg-tabs">'
     + '<button class="tr-tab is-on" data-ptab="board">Itinerary</button>'
     + '<button class="tr-tab" data-ptab="stay">Stay &amp; eat</button>'
     + '</div>';

  /* ---- stay & eat: one row per stop, with real booking links ---- */
  h += '<div id="pgStay" hidden>' + stayPanel(t) + '</div>';

  /* the board */
  /* The board and a real map of it, side by side: a kanban of place
     names tells you the order but never the shape of the drive. The
     pins are numbered in visiting order and redraw on every change. */
  h += '<div id="pgBoard" class="pg-split">'
     +   '<div class="pg-board-wrap">'
     +     '<div class="pg-board-top"><button class="pg-btn pg-btn-s" id="addDay">+ Add day</button></div>'
     +     '<div class="pg-board">';
  t.days.forEach(d => { h += dayColumn(t, d); });
  h += ideasColumn(t);
  h += '</div></div>'
     +   '<aside class="pg-mapwrap">'
     +     '<div class="pg-map" id="pgMap"><div class="pg-map-wait">Loading the map…</div></div>'
     +     '<p class="pg-map-note" id="pgMapNote">Pins are numbered in visiting order. '
     +       'Hover a stop and the map goes to it.</p>'
     +   '</aside>'
     + '</div>';

  /* Saving the trip for offline. Deliberately not automatic: it is
     tens of megabytes of map imagery, and it should be a thing you
     chose while you still had signal, not a surprise on your data
     plan. */
  h += '<div class="off-save" id="offSave" hidden>'
     +   '<p><b>Take this trip offline.</b> Saves the map along your route and the '
     +     'photographs, so the plan still opens where there is no signal.</p>'
     +   '<button class="pg-btn" id="offGo">Save for offline</button>'
     +   '<div class="off-prog" id="offProg" hidden><i></i></div>'
     + '</div>';

  h += '<p class="pg-note pg-share" id="shareNote"></p>';
  return h + '</section>';
}

/* Stops are grouped by the place they belong to, so an attraction
   sits UNDER its city instead of floating beside it as if it were a
   separate destination. A city you are visiting is one stop on the
   route; the things you do there hang off it. */
function groupStops(stops){
  const order = [], map = {};
  stops.forEach(sid => {
    const info = stopInfo(sid); if (!info) return;
    const key = info.parent;
    if (!map[key]){ map[key] = { parent: key, place: null, spots: [] }; order.push(key); }
    if (info.kind === 'place') map[key].place = sid; else map[key].spots.push(sid);
  });
  return order.map(k => map[k]);
}

/* drive time between two places, skipped when it is the same place */
/* The straight-line estimate shown until the router answers. It is
   deliberately labelled the same way the day totals are, and
   wireTotals overwrites it with the real road time, so the cards and
   the day headers can never disagree — they used to, and it read as
   the day total counting the previous day twice. */
function legHTML(fromParent, toParent, toStop){
  if (!fromParent || fromParent === toParent) return '';
  const a = placeGet(stopBase(fromParent)), b = placeGet(stopBase(toParent));
  if (!a || !b) return '';
  const mi = haversine(a.lat, a.lon, b.lat, b.lon);
  return '<span class="pg-leg" data-legto="' + plEsc(toStop || toParent) + '">'
    + fmtDrive(driveHours(mi)) + ' from ' + plEsc(a.name) + '</span>';
}

/* The parent place the previous day ended on, or null if this is the
   first day with anything in it. */
function lastStopBefore(t, dayId){
  let last = null;
  for (const d of t.days){
    if (d.id === dayId) break;
    if (!d.stops.length) continue;
    const info = stopInfo(d.stops[d.stops.length - 1]);
    if (info) last = info.kind === 'spot' ? info.parent : d.stops[d.stops.length - 1];
  }
  return last;
}

function dayColumn(t, d){
  /* Once a start date is set, each day carries its real calendar
     date. That is most of the value of entering dates at all: it
     turns "Day 3" into "Sat 4 Apr", which is what you actually
     check against an opening time or a flight. */
  const idx = t.days.indexOf(d);
  const when = (typeof tripDayDateLabel === 'function' && idx >= 0)
    ? tripDayDateLabel(t, idx) : '';

  let h = '<div class="pg-col" data-list="' + d.id + '" data-day-col="' + d.id + '">'
        + '<div class="pg-col-h"><span class="pg-col-t" contenteditable="true" data-day="' + d.id + '" spellcheck="false">' + plEsc(d.label) + '</span>'
        + (when ? '<span class="pg-col-date">' + plEsc(when) + '</span>' : '')
        + (t.days.length > 1 ? '<button class="pg-x" data-delday="' + d.id + '" title="Remove day">&times;</button>' : '')
        + '<span class="pg-col-load" data-dayload="' + d.id + '"></span>'
        + '</div><div class="pg-drop" data-list="' + d.id + '">';
  if (!d.stops.length) h += '<p class="pg-blank">Drag a place here</p>';
  /* The drive from where the last day finished: that leg is real
     driving and belongs to this day, so it is shown here rather than
     vanishing in the gap between two columns. */
  h += renderGroups(t, d.stops, d.id, lastStopBefore(t, d.id));
  return h + '</div></div>';
}

/* ---------- ideas that are in every trip ----------

   An older version had a button that dumped the whole global
   want-to-go list into whichever trip happened to be open. That
   button is gone, but what it wrote stays written: the same places
   sit in the Ideas column of every trip made while it existed, and
   no amount of fixing the code removes them, because by now they are
   ordinary saved data.

   So this finds them and offers to take them out. It only counts a
   place as suspect when it is in Ideas on three or more trips, or in
   every trip when there are at least two — a place you deliberately
   added to two trips is not a bug. Day stops are never touched; a
   place you actually planned to visit stays exactly where it is. */
function ideasEverywhere(){
  const trips = tripsAll();
  if (trips.length < 2) return [];
  const count = {};
  trips.forEach(t => {
    const seen = {};
    (t.ideas || []).forEach(sid => {
      const base = typeof stopBase === 'function' ? stopBase(sid) : sid;
      if (seen[base]) return; seen[base] = 1;
      count[base] = (count[base] || 0) + 1;
    });
  });
  const bar = Math.min(3, trips.length);
  return Object.keys(count).filter(k => count[k] >= bar)
    .map(k => ({ id: k, trips: count[k] }));
}

function ideasColumn(t){
  let h = '<div class="pg-col pg-col-ideas" data-list="ideas">'
        + '<div class="pg-col-h"><span class="pg-col-t">Ideas</span></div>'
        + '<div class="pg-drop" data-list="ideas">';

  const spread = spreadDismissed() ? [] : ideasEverywhere();
  if (spread.length){
    const names = spread.map(s => {
      const info = stopInfo(s.id);
      return info ? info.name : s.id;
    });
    h += '<div class="pg-spread" id="pgSpread">'
       + '<p><b>' + names.length + ' place' + (names.length === 1 ? ' is' : 's are')
       +   ' in the Ideas list of ' + (names.length === 1 ? 'this and ' : '')
       +   'nearly every trip</b> — ' + plEsc(names.slice(0, 4).join(', '))
       +   (names.length > 4 ? ' and ' + (names.length - 4) + ' more' : '') + '. '
       +   'That was an older bug that copied your want-to-go list into whatever trip '
       +   'was open. Nothing on a day will be touched.</p>'
       + '<button class="pg-btn pg-btn-s" data-spreadfix="others">Remove from the other trips</button>'
       + '<button class="pg-btn pg-btn-s" data-spreadfix="all">Remove from all trips</button>'
       + '<button class="pg-btn pg-btn-s" data-spreadfix="no">Leave them</button>'
       + '</div>';
  }

  if (!t.ideas.length) h += '<p class="pg-blank">Places with no day yet</p>';
  h += renderGroups(t, t.ideas, 'ideas');
  return h + '</div></div>';
}

/* dismissed for this browser, so the banner does not nag */
function spreadDismissed(){
  try { return localStorage.getItem('meridian.spreadOk') === '1'; } catch(e){ return false; }
}
function spreadDismiss(){
  try { localStorage.setItem('meridian.spreadOk', '1'); } catch(e){}
}

function renderGroups(t, stops, listId, fromParent){
  const groups = groupStops(stops);
  let h = '', prev = fromParent || null;
  groups.forEach(g => {
    const leg = legHTML(prev, g.parent, g.place || g.parent);
    if (g.place){
      h += stopCard(t, g.place, listId, leg, false, g.spots.length);
    } else {
      /* its city is not on this day, so label the group instead */
      const info = stopInfo(g.spots[0]);
      h += '<div class="pg-orphan">' + leg + '<span>' + plEsc(info ? info.sub : '') + '</span></div>';
    }
    if (g.spots.length){
      h += '<div class="pg-substops">'
         + g.spots.map(sid => stopCard(t, sid, listId, '', true, 0)).join('')
         + '</div>';
    }
    prev = g.parent;
  });
  return h;
}

/* cut at a word, never through one */
function pgClip(t, n){
  t = (t || '').replace(/\s+/g, ' ').trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/[\s,;:.]+\S*$/, '') + '…';
}

function stopCard(t, pid, listId, leg, isSub, subCount){
  const p = stopInfo(pid);
  if (!p) return '';
  const notes = t.notes[pid] || [];
  const dayOpts = t.days.map(d => '<option value="' + d.id + '"' + (d.id === listId ? ' selected' : '') + '>' + plEsc(d.label) + '</option>').join('')
                + '<option value="ideas"' + (listId === 'ideas' ? ' selected' : '') + '>Ideas</option>';

  return '<article class="pg-stop' + (isSub ? ' is-sub' : '') + (p.repeat ? ' is-repeat' : '')
    + '" data-stop="' + plEsc(pid) + '">'
    + (leg || '')
    + '<div class="pg-stop-in">'
    +   '<button class="pg-grip" data-drag title="Drag to move">&#10283;</button>'
    +   (p.photoId
          ? '<span class="pg-stop-ph' + (isSub ? ' is-spot' : '') + '" data-pgphoto="' + plEsc(stopBase(p.photoId)) + '"></span>'
          : '<span class="pg-stop-ph is-pin" title="Found outside the atlas">📍</span>')
    +   '<div class="pg-stop-tx">'
    +     '<a href="' + p.href + '">' + plEsc(p.name) + '</a>'
    +     '<i>' + plEsc(isSub ? (p.note ? pgClip(p.note, 58) : 'in ' + p.sub.split(',')[0]) : p.sub) + '</i>'
    +   '</div>'
    +   (subCount ? '<span class="pg-count" title="things to do here">' + subCount + '</span>' : '')
    +   '<button class="pg-x" data-rm="' + pid + '" title="Remove">&times;</button>'
    + '</div>'
    + '<div class="pg-stop-foot">'
    +   '<select class="pg-moveto" data-moveto="' + pid + '" aria-label="Move to day">' + dayOpts + '</select>'
    +   '<button class="pg-note-btn" data-notes="' + pid + '">' + (notes.length ? notes.length + ' note' + (notes.length === 1 ? '' : 's') : '+ note') + '</button>'
    + '</div>'
    + '<div class="pg-notes" data-notelist="' + pid + '" hidden>'
    +   notes.map(c => '<div class="pg-note-row"><b>' + plEsc(c.by) + '</b> ' + plEsc(c.text)
    +     '<button class="pg-x" data-unnote="' + pid + '|' + c.at + '">&times;</button></div>').join('')
    +   '<div class="pg-note-add"><input type="text" data-noteinput="' + pid + '" placeholder="Add a note…"></div>'
    + '</div>'
    + '</article>';
}

/* ===========================================================
   STAY & EAT

   This was a row of search links per stop, which is a bookmark bar,
   not a plan. It is now two working lists under every stop — where
   you are sleeping, where you are eating — that you add to, reorder
   and clear, saved on the trip like any other part of it and
   carried into the export.

   What fills them:
     - restaurants already in the atlas for that place,
     - hotels and restaurants around it from OpenStreetMap (Photon:
       free, keyless, CORS-enabled),
     - anything you type in yourself.

   Prices and availability are nobody's business to store, so the
   booking sites stay as one "compare" link per stop.
   =========================================================== */

function stayKey(kind, key){ return kind + '|' + key; }
function gmaps(q){ return 'https://www.google.com/maps/search/' + encodeURIComponent(q); }

/* one saved row */
function stayRow(t, key, r, i, n){
  return '<li class="st-row" data-strow="' + plEsc(r.id) + '">'
    + '<span class="st-n">' + (i + 1) + '</span>'
    + '<div class="st-rt">'
    +   (r.url ? '<a href="' + plEsc(r.url) + '" target="_blank" rel="noopener">' + plEsc(r.name) + ' ↗</a>'
               : '<b>' + plEsc(r.name) + '</b>')
    +   (r.sub ? '<i>' + plEsc(r.sub) + '</i>' : '')
    + '</div>'
    + '<div class="st-ord">'
    +   '<button class="st-mv" data-stmv="up|' + plEsc(key) + '|' + plEsc(r.id) + '"'
    +     (i === 0 ? ' disabled' : '') + ' aria-label="Move up">↑</button>'
    +   '<button class="st-mv" data-stmv="dn|' + plEsc(key) + '|' + plEsc(r.id) + '"'
    +     (i === n - 1 ? ' disabled' : '') + ' aria-label="Move down">↓</button>'
    +   '<button class="pg-x" data-strm="' + plEsc(key) + '|' + plEsc(r.id) + '" aria-label="Remove">&times;</button>'
    + '</div></li>';
}

function stayColumn(t, key, kind, place){
  const rows = tripStayList(t, key, kind);
  const title = kind === 'stay' ? 'Where you are sleeping' : 'Where you are eating';
  const ph    = kind === 'stay' ? 'Add a hotel, cabin or friend’s couch…' : 'Add a restaurant, bar or bakery…';

  let h = '<div class="st-col">'
    + '<h4>' + title + (rows.length ? ' <span>' + rows.length + '</span>' : '') + '</h4>';

  h += rows.length
     ? '<ol class="st-list">' + rows.map((r, i) => stayRow(t, key, r, i, rows.length)).join('') + '</ol>'
     : '<p class="st-empty">Nothing picked yet. Add one below, or take a suggestion.</p>';

  h += '<div class="st-add">'
     +   '<input type="text" data-stin="' + plEsc(stayKey(kind, key)) + '" placeholder="' + ph + '" autocomplete="off">'
     +   '<button class="pg-btn pg-btn-s" data-stadd="' + plEsc(stayKey(kind, key)) + '">Add</button>'
     + '</div>';

  h += '<div class="st-sug" data-stsug="' + plEsc(stayKey(kind, key)) + '">'
     +   '<p class="st-load">Looking nearby…</p>'
     + '</div>';

  return h + '</div>';
}

function stayPanel(t){
  /* every place on the trip, in the order it is visited */
  const seen = {}, places = [];
  const push = sid => {
    const info = stopInfo(sid); if (!info) return;
    const key = info.kind === 'spot' ? info.parent : sid;
    if (seen[key]) return; seen[key] = 1;
    places.push({ key: key, info: stopInfo(key) || info });
  };
  /* Day stops only. Ideas are places you have not committed to yet —
     offering to book a hotel in one is asking the wrong question, and
     it filled this panel with towns the trip may never reach. They
     appear here the moment they are dragged onto a day. */
  t.days.forEach(d => d.stops.forEach(push));

  if (!places.length){
    const waiting = (t.ideas || []).length;
    return '<div class="pg-empty"><p>Nothing on a day yet.</p>'
         + '<p class="pg-note">' + (waiting
             ? 'You have ' + waiting + ' place' + (waiting === 1 ? '' : 's')
               + ' in Ideas. Drag one onto a day and it turns up here with two lists under '
               + 'it: where you are sleeping and where you are eating.'
             : 'Add a stop to a day and this becomes two lists under it: '
               + 'where you are sleeping and where you are eating.')
         + '</p></div>';
  }

  return '<p class="pg-note">Two lists under every stop. Add from the suggestions, '
    + 'type in your own, drag the order with the arrows. Everything here is saved on the '
    + 'trip and comes out in the export.</p>'
    + '<div class="pg-stay">' + places.map(p => {
        const place = placeGet(p.key);
        const label = place ? place.name + ', ' + stateName(place.abbr) : p.info.name;
        const q = encodeURIComponent(label);
        return '<section class="st-place" data-stplace="' + plEsc(p.key) + '"'
          + (place ? ' data-stlat="' + place.lat + '" data-stlon="' + place.lon + '"' : '')
          + ' data-stlabel="' + plEsc(label) + '">'
          + '<header class="st-h">'
          +   (place ? '<span class="st-ph" data-pgphoto="' + plEsc(p.key) + '"></span>'
                     : '<span class="st-ph is-empty"></span>')
          +   '<div class="st-ht"><b>' + plEsc(place ? place.name : p.info.name) + '</b>'
          +     '<i>' + plEsc(place ? stateName(place.abbr) : (p.info.sub || '')) + '</i></div>'
          +   '<a class="st-cmp" href="https://www.booking.com/searchresults.html?ss=' + q
          +     '" target="_blank" rel="noopener">Compare hotels ↗</a>'
          + '</header>'
          + '<div class="st-cols">'
          +   stayColumn(t, p.key, 'stay', place)
          +   stayColumn(t, p.key, 'eat', place)
          + '</div></section>';
      }).join('') + '</div>';
}

/* ---- suggestions ----

   Restaurants come from the atlas first, because those are written
   rather than scraped. Hotels have to come from outside: this
   project stores no lodging of its own and never will. */
const ST_SUG_CACHE = {};

async function osmNear(lat, lon, tag, word){
  const ck = tag + '@' + lat.toFixed(2) + ',' + lon.toFixed(2);
  if (ST_SUG_CACHE[ck]) return ST_SUG_CACHE[ck];
  try {
    const url = 'https://photon.komoot.io/api/?limit=12&osm_tag=' + encodeURIComponent(tag)
      + '&lat=' + lat + '&lon=' + lon + '&q=' + encodeURIComponent(word);
    const r = await fetch(url);
    if (!r.ok) return [];
    const j = await r.json();
    const out = [];
    (j.features || []).forEach(f => {
      const p = f.properties || {}, c = f.geometry && f.geometry.coordinates;
      if (!p.name || !c) return;
      /* Photon only leans towards the coordinates given, so anything
         in the next state along has to be thrown out here. */
      if (typeof haversine === 'function' && haversine(lat, lon, c[1], c[0]) > 35) return;
      out.push({ name: p.name,
                 sub: [p.street, p.city || p.district, p.state].filter(Boolean).join(', ') });
    });
    ST_SUG_CACHE[ck] = out;
    return out;
  } catch(e){ return []; }
}

function addFromRow(t){
  const want = (typeof markedIds === 'function') ? markedIds('want').filter(p => !tripHasPlace(t, p)) : [];
  let h = '<div class="pg-from">';
  if (want.length) h += '<button class="pg-btn pg-btn-s" id="addWant">Choose from ' + want.length + ' want-to-go place' + (want.length === 1 ? '' : 's') + '…</button>';
  else h += '<span class="pg-note">Mark places “want to go” on the map and you can drop them all in at once.</span>';
  return h + '</div>';
}

/* ---------- mount ---------- */
function mountPlanner(host, tripIdOrNull){
  PG_MOUNT++;                       /* anything still in flight is stale */
  const repaint = () => mountPlanner(host, tripIdOrNull);

  /* The board is rebuilt wholesale on every change. Tearing Leaflet
     down and standing it up again each time — new tiles, new markers,
     a fresh fit — is what made dragging stops feel sticky, so the map
     node is lifted out before the rebuild and put back afterwards. */
  let keptMap = null;
  const liveMap = host.querySelector('#pgMap');
  if (PG_MAP && liveMap && liveMap.firstChild){
    keptMap = liveMap;
    if (keptMap.parentNode) keptMap.parentNode.removeChild(keptMap);
  } else if (PG_MAP){
    PG_MAP.destroy(); PG_MAP = null;
  }
  host.innerHTML = tripIdOrNull ? renderTrip(tripIdOrNull) : renderPlannerList();
  window.scrollTo(0, 0);
  host.querySelectorAll('[data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto)));  // ids here are already place ids

  if (!tripIdOrNull){
    const nb = host.querySelector('#newTrip');
    if (nb) nb.onclick = () => { const t = tripCreate('Trip ' + (tripsAll().length + 1)); location.hash = '#/planner/' + t.id; };
    host.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
      if (confirm('Delete this trip? This cannot be undone.')) { tripDelete(b.dataset.del); repaint(); }
    });
    return;
  }

  const id = tripIdOrNull, t = tripGet(id);
  if (!t) return;

  /* rename */
  const nameEl = host.querySelector('#tripName');
  if (nameEl){
    nameEl.addEventListener('blur', () => tripRename(id, nameEl.textContent.trim()));
    nameEl.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); nameEl.blur(); } });
  }
  /* travel dates */
  const dToggle = host.querySelector('#plDatesToggle');
  const dEdit   = host.querySelector('#plDatesEdit');
  if (dToggle && dEdit){
    dToggle.onclick = () => {
      const show = dEdit.hasAttribute('hidden');
      if (show){ dEdit.removeAttribute('hidden'); } else { dEdit.setAttribute('hidden', ''); }
      dToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
      if (show){ const f = host.querySelector('#plStart'); if (f) f.focus(); }
    };
  }
  const dMsg = txt => {
    const m = host.querySelector('#plDatesMsg');
    if (m) m.textContent = txt || '';
  };
  const dSave = host.querySelector('#plDatesSave');
  if (dSave) dSave.onclick = () => {
    const a = (host.querySelector('#plStart') || {}).value || '';
    const b = (host.querySelector('#plEnd') || {}).value || '';
    const r = tripSetDates(id, a, b);
    if (r && r.error) return dMsg(r.error);
    dMsg('');
    /* Redraw rather than patching the header by hand: the day
       headings carry the dates too, and they all have to move. */
    mountPlanner(host, id);
  };
  const dClear = host.querySelector('#plDatesClear');
  if (dClear) dClear.onclick = () => {
    tripSetDates(id, '', '');
    mountPlanner(host, id);
  };

  host.querySelectorAll('[data-day]').forEach(el => {
    el.addEventListener('blur', () => tripRenameDay(id, el.dataset.day, el.textContent.trim()));
    el.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); el.blur(); } });
  });

  const on = (sel, fn) => { const e = host.querySelector(sel); if (e) e.onclick = fn; };

  /* Which tab is open survives a repaint: adding a hotel used to
     throw you back to the itinerary after every click. */
  const showTab = which => {
    PG_TAB = which === 'stay' ? 'stay' : 'board';
    const stay = PG_TAB === 'stay';
    host.querySelector('#pgStay').hidden = !stay;
    host.querySelector('#pgBoard').hidden = stay;
    host.querySelectorAll('[data-ptab]').forEach(x => x.classList.toggle('is-on', x.dataset.ptab === PG_TAB));
    if (stay){
      host.querySelectorAll('#pgStay [data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto)));
      loadStaySuggestions(host, id, repaint);
    }
  };
  /* put the living map back where the new markup expects it */
  if (keptMap){
    const slot = host.querySelector('#pgMap');
    if (slot && slot.parentNode){ slot.parentNode.replaceChild(keptMap, slot); }
    else { PG_MAP.destroy(); PG_MAP = null; }
  }

  host.querySelectorAll('[data-ptab]').forEach(b => b.onclick = () => showTab(b.dataset.ptab));
  showTab(PG_TAB);
  wireStay(host, id, repaint);

  /* The map and the totals are rebuilt on every repaint, which is
     every time a stop moves — that is the whole point of them. */
  const mount = PG_MOUNT;
  if (typeof wirePlannerMap === 'function') wirePlannerMap(host, id, repaint, mount);
  if (typeof wireTotals === 'function') wireTotals(host, id, mount);

  on('#addDay', () => { tripAddDay(id); repaint(); });
  on('#shareTrip', () => openShare(id));
  wireOffline(host, id);
  paintShareNote(host, id);
  on('#expTxt', () => exportTrip(tripGet(id)));
  /* This used to drop every want-to-go place straight into whichever
     trip happened to be open, which is why places from one trip kept
     appearing in another — the want list is global, the trip is not.
     Now it opens a chooser and nothing lands without being ticked. */
  on('#addWant', () => openWantPicker(id, repaint));

  /* clearing out ideas an old bug copied into every trip */
  host.querySelectorAll('[data-spreadfix]').forEach(b => b.onclick = () => {
    const mode = b.dataset.spreadfix;
    if (mode === 'no'){ spreadDismiss(); repaint(); return; }
    const spread = ideasEverywhere().map(s => s.id);
    let removed = 0;
    tripsAll().forEach(trip => {
      if (mode === 'others' && trip.id === id) return;
      spread.forEach(pid => {
        const before = trip.ideas.length;
        /* match repeats of the same place too (CO-denver@2) */
        trip.ideas = trip.ideas.filter(sid =>
          (typeof stopBase === 'function' ? stopBase(sid) : sid) !== pid);
        removed += before - trip.ideas.length;
      });
      trip.updated = Date.now();
    });
    tripsSave();
    spreadDismiss();
    repaint();
    if (typeof toast === 'function')
      toast(removed + ' idea' + (removed === 1 ? '' : 's') + ' removed. Days were not touched.');
  });

  host.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { tripRemovePlace(id, b.dataset.rm); repaint(); });
  host.querySelectorAll('[data-delday]').forEach(b => b.onclick = () => { tripRemoveDay(id, b.dataset.delday); repaint(); });
  host.querySelectorAll('[data-moveto]').forEach(s => s.onchange = () => { tripMove(id, s.dataset.moveto, s.value, null); repaint(); });

  /* notes */
  host.querySelectorAll('[data-notes]').forEach(b => b.onclick = () => {
    const box = host.querySelector('[data-notelist="' + b.dataset.notes + '"]');
    if (box) { box.hidden = !box.hidden; if (!box.hidden){ const i = box.querySelector('input'); if (i) i.focus(); } }
  });
  host.querySelectorAll('[data-noteinput]').forEach(i => i.onkeydown = e => {
    if (e.key === 'Enter' && i.value.trim()){ tripComment(id, i.dataset.noteinput, i.value); repaint(); }
  });
  host.querySelectorAll('[data-unnote]').forEach(b => b.onclick = () => {
    const [pid, at] = b.dataset.unnote.split('|'); tripUncomment(id, pid, +at); repaint();
  });

  wireSearch(host, id, repaint);
  wireDrag(host, id, repaint);
}

/* ---------- stay & eat: the lists ---------- */
let PG_TAB = 'board';

function wireStay(host, id, repaint){
  const add = (kindKey, name, sub, label) => {
    const bits = kindKey.split('|');
    const kind = bits[0], key = bits.slice(1).join('|');
    if (!name.trim()) return;
    tripStayAdd(id, key, { kind: kind, name: name.trim(), sub: sub || '',
                           url: gmaps(name.trim() + ' ' + (label || '')) });
    repaint();
  };

  host.querySelectorAll('[data-stadd]').forEach(b => b.onclick = () => {
    const box = host.querySelector('[data-stin="' + b.dataset.stadd + '"]');
    const sec = b.closest('[data-stplace]');
    if (box) add(b.dataset.stadd, box.value, '', sec && sec.dataset.stlabel);
  });
  host.querySelectorAll('[data-stin]').forEach(i => i.onkeydown = e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const sec = i.closest('[data-stplace]');
    add(i.dataset.stin, i.value, '', sec && sec.dataset.stlabel);
  });

  host.querySelectorAll('[data-stmv]').forEach(b => b.onclick = () => {
    const p = b.dataset.stmv.split('|');
    tripStayMove(id, p.slice(1, -1).join('|'), p[p.length - 1], p[0] === 'up' ? -1 : 1);
    repaint();
  });
  host.querySelectorAll('[data-strm]').forEach(b => b.onclick = () => {
    const p = b.dataset.strm.split('|');
    tripStayRemove(id, p.slice(0, -1).join('|'), p[p.length - 1]);
    repaint();
  });
}

/* Fill each column's suggestion strip once the tab is open. The
   atlas answers for restaurants; OpenStreetMap answers for beds. */
function loadStaySuggestions(host, id, repaint){
  host.querySelectorAll('[data-stsug]').forEach(box => {
    if (box.dataset.stdone) return;
    box.dataset.stdone = '1';

    const bits = box.dataset.stsug.split('|');
    const kind = bits[0], key = bits.slice(1).join('|');
    const sec  = box.closest('[data-stplace]');
    const lat  = sec && +sec.dataset.stlat, lon = sec && +sec.dataset.stlon;
    const label = (sec && sec.dataset.stlabel) || '';

    const paint = items => {
      const t = tripGet(id);
      const fresh = items.filter(x => !tripStayHas(t, key, x.name)).slice(0, 8);
      if (!fresh.length){ box.innerHTML = ''; return; }
      box.innerHTML = '<p class="st-sugh">' + (kind === 'stay' ? 'Nearby' : 'Worth eating at') + '</p>'
        + '<div class="st-chips">' + fresh.map((x, i) =>
            '<button class="st-chip" data-stpick="' + i + '" title="' + plEsc(x.sub || x.name) + '">'
            + '<span>+</span>' + plEsc(x.name) + '</button>').join('') + '</div>';
      box.querySelectorAll('[data-stpick]').forEach(b => b.onclick = () => {
        const x = fresh[+b.dataset.stpick]; if (!x) return;
        tripStayAdd(id, key, { kind: kind, name: x.name, sub: x.sub || '',
                               url: gmaps(x.name + ' ' + label) });
        repaint();
      });
    };

    let seed = [];
    if (kind === 'eat' && typeof FOOD !== 'undefined' && FOOD[key]){
      seed = FOOD[key].slice(0, 8).map(r => ({ name: r[0], sub: r[1] || r[2] || '' }));
    }
    if (seed.length >= 4 || !lat){ paint(seed); return; }

    osmNear(lat, lon, kind === 'stay' ? 'tourism:hotel' : 'amenity:restaurant',
            kind === 'stay' ? 'hotel' : 'restaurant').then(more => {
      const have = {};
      seed.forEach(x => have[x.name.toLowerCase()] = 1);
      more.forEach(m => { if (!have[m.name.toLowerCase()]){ have[m.name.toLowerCase()] = 1; seed.push(m); } });
      paint(seed);
    });
  });
}

/* ---------- search to add ---------- */
/* Anything in the atlas, and then anything else on earth.

   The wider search uses Photon (photon.komoot.io), an open geocoder
   over OpenStreetMap data: free, no key, no sign-up, and it sends
   CORS headers so the browser can call it directly. Nominatim is the
   fallback. A result picked from there becomes a stop carrying its
   own coordinates, so a hotel or a friend's house can sit on the
   itinerary beside a national park. */
let PG_SEARCH_T = 0;

function wireSearch(host, id, repaint){
  const box = host.querySelector('#pgSearch'), out = host.querySelector('#pgResults');
  if (!box || !out) return;

  const render = (atlas, outside, searching) => {
    const t = tripGet(id);
    let h = '';
    if (atlas.length){
      h += '<div class="pg-rgroup">In the atlas</div>'
         + atlas.map(r => '<button data-addpid="' + plEsc(r.id) + '">' + plEsc(r.name)
             + '<span>' + plEsc(r.sub) + '</span></button>').join('');
    }
    if (outside && outside.length){
      h += '<div class="pg-rgroup">Anywhere else</div>'
         + outside.map(r => '<button data-addx="' + plEsc(customId(r.name, r.lat, r.lon, r.sub)) + '">'
             + plEsc(r.name) + '<span>' + plEsc(r.sub) + '</span></button>').join('');
    } else if (searching){
      h += '<div class="pg-rgroup">Anywhere else</div><p class="pg-note">Searching…</p>';
    }
    if (!h) h = '<p class="pg-note">Nothing matching.</p>';
    out.innerHTML = h;
    out.hidden = false;
    /* same rule as the place page: an attraction brings its city
       with it, so it has something to sit under on the board */
    out.querySelectorAll('[data-addpid]').forEach(b => b.onclick = () => {
      const pid = b.dataset.addpid;
      /* Already on the trip? Then this is a deliberate second visit —
         a loop back through, or two nights in the same town — so add
         it again as its own stop rather than silently doing nothing. */
      const t = tripGet(id);
      if (t && tripHasPlace(t, pid)) tripAddPlace(id, pid, true);
      else if (typeof addStopWithParent === 'function') addStopWithParent(id, pid);
      else tripAddPlace(id, pid);
      repaint();
    });
    out.querySelectorAll('[data-addx]').forEach(b => b.onclick = () => { tripAddPlace(id, b.dataset.addx); repaint(); });
  };

  box.addEventListener('input', () => {
    const q = box.value.trim();
    clearTimeout(PG_SEARCH_T);
    if (q.length < 2){ out.hidden = true; return; }

    const t = tripGet(id);
    /* places AND the attractions inside them — searching only places
       hid six thousand things to do behind the city they sit in */
    /* Already-added places stay in the results now: adding one again
       is a real thing to want, for a loop or a second night. */
    const atlas = searchAll(q, 10).slice(0, 7);

    render(atlas, null, true);
    /* wait for a pause in typing before troubling a public service */
    PG_SEARCH_T = setTimeout(() => {
      geoSearch(q).then(hits => { if (box.value.trim() === q) render(atlas, hits, false); });
    }, 450);
  });
}

const GEO_CACHE = {};
async function geoSearch(q){
  if (GEO_CACHE[q]) return GEO_CACHE[q];
  const label = f => {
    const p = f.properties || {};
    const bits = [p.city || p.district || p.county, p.state, p.country].filter(Boolean);
    return { name: p.name || p.street || q, sub: bits.join(', ') || 'Found on the map',
             lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0] };
  };
  try {
    const r = await fetch('https://photon.komoot.io/api/?limit=6&q=' + encodeURIComponent(q));
    if (r.ok){
      const j = await r.json();
      const hits = (j.features || []).map(label).filter(x => x.name);
      if (hits.length){ GEO_CACHE[q] = hits; return hits; }
    }
  } catch(e){}
  try {   /* fallback: Nominatim, same data, stricter about traffic */
    const r = await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&q=' + encodeURIComponent(q));
    if (!r.ok) return [];
    const j = await r.json();
    return (j || []).map(x => ({
      name: (x.display_name || '').split(',')[0],
      sub: (x.display_name || '').split(',').slice(1, 3).join(',').trim() || 'Found on the map',
      lat: +x.lat, lon: +x.lon
    })).filter(x => x.name);
  } catch(e){ return []; }
}

/* ---------- drag with pointer events (mouse and touch alike) ---------- */
function wireDrag(host, id, repaint){
  let drag = null, marker = null;

  const makeMarker = () => {
    if (marker) return marker;
    marker = document.createElement('div');
    marker.className = 'pg-marker';
    return marker;
  };

  host.addEventListener('pointerdown', e => {
    const grip = e.target.closest('[data-drag]'); if (!grip) return;
    const card = grip.closest('[data-stop]'); if (!card) return;
    e.preventDefault();
    const r = card.getBoundingClientRect();
    const ghost = card.cloneNode(true);
    ghost.className = 'pg-stop pg-ghost';
    ghost.style.width = r.width + 'px';
    document.body.appendChild(ghost);
    drag = { pid: card.dataset.stop, card, ghost, dx: e.clientX - r.left, dy: e.clientY - r.top, target: null };
    card.classList.add('is-dragging');
    moveGhost(e);
    try { host.setPointerCapture(e.pointerId); } catch(err){}
  });

  host.addEventListener('pointermove', e => {
    if (!drag) return;
    e.preventDefault();
    moveGhost(e);
    /* On a phone the days are stacked, so the one you are aiming for is
       often off-screen. Scroll the page when the drag nears an edge,
       otherwise a stop can only ever be dropped on a visible day. */
    const pad = 70;
    if (e.clientY < pad) window.scrollBy(0, -14);
    else if (e.clientY > window.innerHeight - pad) window.scrollBy(0, 14);
    const t = findDrop(e);
    drag.target = t;
    if (t){
      const m = makeMarker();
      const kids = [...t.drop.querySelectorAll('[data-stop]')].filter(k => k !== drag.card);
      if (t.index >= kids.length) t.drop.appendChild(m);
      else t.drop.insertBefore(m, kids[t.index]);
    } else if (marker && marker.parentNode) marker.parentNode.removeChild(marker);
  });

  const end = () => {
    if (!drag) return;
    const t = drag.target;
    if (drag.ghost.parentNode) drag.ghost.parentNode.removeChild(drag.ghost);
    if (marker && marker.parentNode) marker.parentNode.removeChild(marker);
    drag.card.classList.remove('is-dragging');
    const pid = drag.pid;
    drag = null;
    if (t){ tripMove(id, pid, t.list, t.index); repaint(); }
  };
  host.addEventListener('pointerup', end);
  host.addEventListener('pointercancel', end);

  function moveGhost(e){
    drag.ghost.style.left = (e.clientX - drag.dx) + 'px';
    drag.ghost.style.top  = (e.clientY - drag.dy) + 'px';
  }
  function findDrop(e){
    drag.ghost.style.display = 'none';
    const under = document.elementFromPoint(e.clientX, e.clientY);
    drag.ghost.style.display = '';
    const drop = under && under.closest('[data-list]');
    if (!drop) return null;
    const list = drop.dataset.list;
    const kids = [...drop.querySelectorAll('[data-stop]')].filter(k => k !== drag.card);
    let index = kids.length;
    for (let i = 0; i < kids.length; i++){
      const r = kids[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2){ index = i; break; }
    }
    return { drop: drop.classList.contains('pg-drop') ? drop : drop.querySelector('.pg-drop') || drop, list, index };
  }
}

/* ---------- take it offline ----------

   Only shown when the browser can actually do it, because a button
   that explains why it cannot work is worse than no button. */
function wireOffline(host, id){
  const box = host.querySelector('#offSave');
  if (!box) return;
  if (typeof offlineReady !== 'function' || !offlineReady()) return;
  box.hidden = false;

  const btn = host.querySelector('#offGo');
  const prog = host.querySelector('#offProg');
  const bar = prog ? prog.querySelector('i') : null;
  const note = box.querySelector('p');

  btn.onclick = async () => {
    const t = tripGet(id); if (!t) return;
    const stops = t.days.reduce((a, d) => a + d.stops.length, 0);
    if (!stops){
      note.innerHTML = '<b>Nothing to save yet.</b> Add a stop or two first — '
        + 'it saves the map along the route, so it needs a route.';
      return;
    }
    btn.disabled = true; btn.textContent = 'Saving…';
    if (prog) prog.hidden = false;

    const r = await offlineSave(t, p => {
      if (bar && p.total) bar.style.width = Math.round((p.done + p.failed) / p.total * 100) + '%';
    });

    btn.disabled = false;
    if (r.error){
      btn.textContent = 'Save for offline';
      if (prog) prog.hidden = true;
      note.innerHTML = '<b>Could not save.</b> ' + plEsc(r.error);
      return;
    }
    if (bar) bar.style.width = '100%';
    btn.textContent = 'Saved';
    note.innerHTML = r.slow
      ? '<b>Still saving in the background.</b> It will carry on while you use the site; '
        + 'come back in a minute and it will be done.'
      : '<b>Ready for the road.</b> ' + r.saved.toLocaleString() + ' map tiles and photographs saved'
        + (r.failed ? ', ' + r.failed + ' refused by the provider' : '')
        + '. Open this trip with no signal and it will be here.';
  };
}

/* ---------- export ---------- */
function exportTrip(t){
  if (!t) return;
  const text = tripToText(t);
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = t.name.replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').toLowerCase() + '.txt';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
}

function pgPhoto(el, place){
  if (!el || !place) return;
  placePhoto(place).then(p => {
    if (!p || !p.src) { el.classList.add('is-empty'); return; }
    loadImage(p.thumb || p.src, 300,
      img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
      () => el.classList.add('is-empty'));
  });
}


/* ---------- sharing ---------- */
function paintShareNote(host, id){
  const el = host.querySelector('#shareNote'); if (!el) return;
  if (typeof cloudActive === 'function' && cloudActive()){
    el.innerHTML = 'This trip is saved to your account and syncs live with anyone you share it with. '
      + 'If two people move the same stop at once, the later change wins.';
    tripPeople(id).then(p => {
      if (!p.members.length && !p.invites.length) return;
      const names = p.members.map(m => plEsc(m.name) + (m.owner ? ' (owner)' : '')).join(', ');
      el.innerHTML += '<br>On this trip: ' + names
        + (p.invites.length ? ' · invited: ' + p.invites.map(plEsc).join(', ') : '');
    });
  } else if (typeof cloudReady === 'function' && cloudReady()){
    el.innerHTML = 'Sign in to save this trip to your account and share it — <a href="#/account">Account</a>.';
  } else {
    el.innerHTML = 'This trip lives in this browser only. Connect a database to sync and share it — '
      + 'see <a href="#/account">Account</a>. Export still works regardless.';
  }
}

/* ---------- the share dialog ----------

   Two ways to share, because they answer different questions.

   A link is for "send them the plan": it opens for anybody who has
   the URL, with no account and nothing to install. An email invite is
   for "bring them onto the trip": it names a person and reaches them.

   Both carry the same choice first — can they look, or can they
   change it — because that is the decision being made, and burying it
   in a dropdown after the fact gets it wrong by default. */
function openShare(id){
  const t = tripGet(id); if (!t) return;
  const online = (typeof cloudActive === 'function') && cloudActive();
  const wrap = document.createElement('div');
  wrap.className = 'pk-wrap';

  const roleRow = '<div class="sh-roles" role="radiogroup" aria-label="What they can do">'
    + '<label class="sh-role is-on"><input type="radio" name="shRole" value="viewer" checked>'
    +   '<b>Can view</b><span>Reads the plan. Cannot change anything. '
    +   'No account needed — the link just opens.</span></label>'
    + '<label class="sh-role"><input type="radio" name="shRole" value="editor">'
    +   '<b>Can edit</b><span>Moves stops, adds places, leaves notes. '
    +   'They sign in once and the trip joins their own list.</span></label>'
    + '</div>';

  wrap.innerHTML = '<div class="pk pk-wide" role="dialog" aria-modal="true" aria-label="Share trip">'
    + '<button class="pk-x" data-close aria-label="Close">&times;</button>'
    + '<span class="lab">Share</span><h3>' + plEsc(t.name) + '</h3>'
    + (online
        ? roleRow

          /* ---- a link ---- */
          + '<div class="sh-block">'
          +   '<h4>Send a link</h4>'
          +   '<p class="pk-sub">Anyone who has it can open the trip. Make as many as you like '
          +     'and switch any of them off later.</p>'
          +   '<div class="pk-new">'
          +     '<input id="shLabel" type="text" placeholder="What is it for? (the group chat, mum…)" autocomplete="off">'
          +     '<button class="pg-btn pg-btn-go" data-mklink>Make a link</button>'
          +   '</div>'
          +   '<div id="shLinks" class="sh-links"></div>'
          + '</div>'

          /* ---- an email ---- */
          + '<div class="sh-block">'
          +   '<h4>Email somebody</h4>'
          +   '<p class="pk-sub">They get a message with the link in it, and the access is '
          +     'granted whether or not the email goes through.</p>'
          +   '<div class="pk-new">'
          +     '<input id="shEmail" type="email" placeholder="their@email.com" autocomplete="off">'
          +     '<button class="pg-btn" data-invite>Send</button>'
          +   '</div>'
          +   '<input id="shNote" class="sh-note-in" type="text" maxlength="400" '
          +     'placeholder="A line to go with it (optional)" autocomplete="off">'
          /* The route that needs no server, no sending domain and no
             deployment, and therefore works today: grant the access,
             then hand the finished message to whatever mail app they
             already use. */
          +   '<p class="pk-sub sh-or">or <button class="pg-btn pg-btn-s" data-mailto>'
          +     'write it in your own email app</button><br>Grants the access, then opens your '
          +     'mail with the link already in it. No sending domain needed.</p>'
          +   '<div id="shPeople" class="pk-people"></div>'
          + '</div>'

        : '<p class="pk-sub">Not available yet</p>'
          + '<p class="pg-note">Sharing needs a database, so there is something for a link to '
          + 'point at. Set that up on the <a href="#/account">Account</a> page — it is free. '
          + 'Until then, <b>Day sheet</b> gives you the whole itinerary as a page you can '
          + 'print or save as a PDF and send.</p>')
    + '<p class="ac-msg" id="shMsg"></p></div>';
  document.body.appendChild(wrap);

  const role = () => {
    const r = wrap.querySelector('input[name="shRole"]:checked');
    return r ? r.value : 'viewer';
  };
  const say = (text, kind) => {
    const m = wrap.querySelector('#shMsg');
    m.textContent = text;
    m.className = 'ac-msg' + (kind ? ' is-' + kind : '');
  };

  /* light up whichever role is chosen */
  wrap.querySelectorAll('input[name="shRole"]').forEach(r => r.addEventListener('change', () => {
    wrap.querySelectorAll('.sh-role').forEach(l =>
      l.classList.toggle('is-on', l.contains(wrap.querySelector('input[name="shRole"]:checked'))));
  }));

  const close = () => { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); };

  wrap.addEventListener('click', async e => {
    if (e.target === wrap || e.target.closest('[data-close]')) return close();

    /* ---- make a link ---- */
    const mk = e.target.closest('[data-mklink]');
    if (mk){
      mk.disabled = true; say('Making the link…');
      const r = await linkCreate(id, role(), wrap.querySelector('#shLabel').value);
      mk.disabled = false;
      if (r.error) return say(r.error, 'bad');
      wrap.querySelector('#shLabel').value = '';
      say(role() === 'editor'
        ? 'Link made. Anyone who opens it can edit the trip once they sign in.'
        : 'Link made. Anyone who opens it can read the trip, with no account.', 'ok');
      listLinks();
      return;
    }

    /* ---- copy one ---- */
    const cp = e.target.closest('[data-copy]');
    if (cp){
      const url = cp.dataset.copy;
      try { await navigator.clipboard.writeText(url); say('Copied.', 'ok'); }
      catch(err){
        /* clipboard refused — show it instead of claiming success */
        const box = wrap.querySelector('[data-show="' + CSS.escape(url) + '"]');
        if (box){ box.hidden = false; box.select && box.select(); }
        say('Could not reach the clipboard, so here is the link to copy by hand.', 'bad');
      }
      return;
    }

    /* ---- turn one off ---- */
    const rv = e.target.closest('[data-revoke]');
    if (rv){
      rv.disabled = true;
      const r = await linkRevoke(rv.dataset.revoke);
      say(r.error || 'That link no longer opens.', r.error ? 'bad' : 'ok');
      listLinks();
      return;
    }

    /* ---- hand it to their own mail app ---- */
    const mt = e.target.closest('[data-mailto]');
    if (mt){
      const em = wrap.querySelector('#shEmail').value.trim();
      const note = wrap.querySelector('#shNote').value.trim();
      mt.disabled = true;
      say('Granting access and making the link…');

      /* grant first, so the link in the message actually opens */
      let r = null;
      if (em){
        try { r = await tripInvite(id, em, role(), note); } catch(err){ r = { error: String(err.message || err) }; }
        if (r && r.error){ mt.disabled = false; return say(r.error, 'bad'); }
      }
      const made = await linkCreate(id, role(), em ? 'emailed to ' + em : 'sent by hand');
      mt.disabled = false;
      if (made.error) return say(made.error, 'bad');

      const t2 = tripGet(id);
      const subject = 'Our trip: ' + (t2 ? t2.name : 'a road trip');
      const lines = [
        (note ? note + '\n' : ''),
        'Here is the plan:',
        made.url,
        '',
        role() === 'editor'
          ? 'You can change it too — sign in and it joins your own trips.'
          : 'No account needed, the link just opens.',
        '',
        '— sent from Meridian'
      ].filter(x => x !== null).join('\n');

      location.href = 'mailto:' + encodeURIComponent(em)
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines);

      say('Access granted and your mail app should be opening. If nothing happened, the link '
        + 'is in the list above — copy it and send it however you like.', 'ok');
      listLinks(); listPeople();
      return;
    }

    /* ---- email ---- */
    const inv = e.target.closest('[data-invite]');
    if (inv){
      const em = wrap.querySelector('#shEmail').value;
      const note = wrap.querySelector('#shNote').value;
      inv.disabled = true;
      say('Granting access, then sending the email…');
      let r;
      try { r = await tripInvite(id, em, role(), note); }
      catch(err){ r = { error: 'Could not do that — ' + (err && err.message ? err.message : err) }; }
      inv.disabled = false;

      if (!r) r = { error: 'No answer from the database. Check the keys on the Account page.' };
      if (r.error) return say(r.error, 'bad');

      /* Access and email are separate, and the message says which of
         the two actually happened rather than implying both. */
      const m = r.mail || {};
      if (m.sent){
        say(em + ' has been emailed the link, and has ' + (role() === 'editor'
          ? 'editing access.' : 'view access.'), 'ok');
      } else if (m.why === 'not-deployed' || m.why === 'no-function'){
        say(em + ' now has access, but no email was sent — the send-invite function is not '
          + 'deployed yet. The link is in the list above; send it to them yourself. '
          + '(supabase/functions/README.md has the three commands.)', 'bad');
      } else {
        say(em + ' now has access, but the email did not go: '
          + (m.detail || 'the provider refused it') + '. The link is in the list above.', 'bad');
      }
      wrap.querySelector('#shEmail').value = '';
      wrap.querySelector('#shNote').value = '';
      listLinks(); listPeople();
    }
  });

  if (online){ listLinks(); listPeople(); }

  async function listLinks(){
    const box = wrap.querySelector('#shLinks'); if (!box) return;
    const rows = await linkList(id);
    if (!rows.length){ box.innerHTML = ''; return; }
    box.innerHTML = '<b>Live links</b>' + rows.map(r =>
        '<div class="sh-link">'
      +   '<span class="sh-link-r' + (r.role === 'editor' ? ' is-edit' : '') + '">'
      +     (r.role === 'editor' ? 'can edit' : 'can view') + '</span>'
      +   '<span class="sh-link-l">' + plEsc(r.label || 'Untitled link') + '</span>'
      +   '<button class="pg-btn pg-btn-s" data-copy="' + plEsc(r.url) + '">Copy</button>'
      +   '<button class="pg-btn pg-btn-s" data-revoke="' + plEsc(r.token) + '">Turn off</button>'
      +   '<input class="sh-link-raw" data-show="' + plEsc(r.url) + '" value="' + plEsc(r.url) + '" readonly hidden>'
      + '</div>').join('');
  }

  function listPeople(){
    tripPeople(id).then(p => {
      const box = wrap.querySelector('#shPeople'); if (!box) return;
      box.innerHTML = (p.members.length ? '<b>On this trip</b>' + p.members.map(m =>
            '<span class="pk-person">' + plEsc(m.name) + (m.owner ? ' · owner' : '') + '</span>').join('') : '')
        + (p.invites.length ? '<b>Invited</b>' + p.invites.map(e =>
            '<span class="pk-person">' + plEsc(e) + '</span>').join('') : '');
    });
  }
}

/* ===========================================================
   THE MAP BESIDE THE BOARD

   Numbered in visiting order, redrawn whenever a stop moves. The
   board says what order you are doing things in; this says what
   that order actually means in driving.
   =========================================================== */
let PG_MAP = null;

/* Every stop on the trip, in order, as a point on the ground. */
/* The route is what you are actually driving, which is what is on a
   day. Ideas are a shortlist, not an itinerary: counting them was why
   the totals showed hours of driving before anything was scheduled. */
function tripPoints(t){
  const out = [], seen = {};
  const add = (sid, dayId) => {
    const info = stopInfo(sid); if (!info) return;
    /* keyed on the stop, not the place: visiting somewhere twice is a
       real itinerary, and both visits are points on the drive */
    const key = info.kind === 'spot' ? info.parent : sid;
    if (seen[key]) return; seen[key] = 1;
    const p = placeGet(stopBase(key)) || (typeof info.lat === 'number' ? info : null);
    if (!p || typeof p.lat !== 'number') return;
    out.push({ id: key, stopId: sid, day: dayId, lat: p.lat, lon: p.lon,
               name: p.name || info.name, abbr: p.abbr || '' });
  };
  t.days.forEach(d => d.stops.forEach(sid => add(sid, d.id)));
  return out;
}

/* Ideas, for the map only — shown, but unnumbered and off the route. */
function tripIdeaPoints(t){
  const out = [], seen = {};
  t.days.forEach(d => d.stops.forEach(sid => {
    const i = stopInfo(sid); if (i) seen[i.kind === 'spot' ? i.parent : sid] = 1;
  }));
  t.ideas.forEach(sid => {
    const info = stopInfo(sid); if (!info) return;
    const key = info.kind === 'spot' ? info.parent : sid;
    if (seen[key]) return; seen[key] = 1;
    const p = placeGet(key);
    if (!p || typeof p.lat !== 'number') return;
    out.push({ id: key, lat: p.lat, lon: p.lon, name: p.name });
  });
  return out;
}

async function wirePlannerMap(host, id, repaint, mount){
  const slot = host.querySelector('#pgMap');
  const note = host.querySelector('#pgMapNote');
  if (!slot) return;
  const t = tripGet(id); if (!t) return;
  const pts = tripPoints(t);
  const ideas = tripIdeaPoints(t);

  if (!PG_MAP){
    PG_MAP = await tileMap(slot, {
      lat: pts.length ? pts[0].lat : 39.5, lon: pts.length ? pts[0].lon : -98.5,
      zoom: 5, single: 11, maxFit: 11, wheel: false,
      onPick: pid => {
        const card = host.querySelector('[data-stop="' + pid + '"]');
        if (card) card.scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
    if (!PG_MAP){
      slot.innerHTML = '<p class="pg-map-wait">The map could not load — the itinerary still works.</p>';
      return;
    }
  }
  if (mount !== undefined && mount !== PG_MOUNT) return;

  const items = pts.map((p, i) => ({ id: p.id, lat: p.lat, lon: p.lon, name: p.name, n: i + 1 }));
  /* Ideas appear, but pale and unnumbered: they are not on the route
     and should not look like a stop you have committed to. */
  const idea = ideas.map(p => ({ id: 'idea:' + p.id, lat: p.lat, lon: p.lon,
                                 name: p.name + ' — idea', kind: 'idea' }));
  PG_MAP.set(items.concat(idea)).route(items).fit().resize();
  if (note){
    note.textContent = items.length
      ? items.length + ' stop' + (items.length === 1 ? '' : 's') + ' on days, numbered in visiting order'
        + (idea.length ? ', plus ' + idea.length + ' idea' + (idea.length === 1 ? '' : 's') : '')
        + '. Hover one and the map goes to it.'
      : (idea.length ? 'Ideas only so far — put one on a day and the route appears.'
                     : 'Add a stop and it appears here.');
  }

  /* hovering a card moves the map; the two are one thing now */
  host.querySelectorAll('[data-stop]').forEach(card => {
    const sid = card.dataset.stop;
    const info = stopInfo(sid);
    const key = info ? (info.kind === 'spot' ? info.parent : sid) : sid;
    card.addEventListener('pointerenter', () => { if (PG_MAP.has(key)) PG_MAP.focus(key); });
    card.addEventListener('pointerleave', () => PG_MAP.blur());
  });
}

/* ===========================================================
   WHAT THE TRIP COSTS

   Real road distance from OSRM where it answers, the straight-line
   estimate where it does not, and this week's regional fuel price
   from the EIA. A day that asks for more driving than anyone
   actually does is marked, because a number you have to add up
   yourself is a number nobody reads.
   =========================================================== */
const DAY_DRIVE_WARN = 6;        /* hours in a day before it looks wrong */
const MPG = 30;

/* Which mount of the planner is current. Every async write checks it
   before touching the DOM: a route or a fuel price that arrives after
   you have moved to another trip belongs to the trip you left, and
   writing it into the one on screen is how a two-hour day ended up
   claiming fifteen. */
let PG_MOUNT = 0;

async function wireTotals(host, id, mount){
  const strip = host.querySelector('#pgTotals');
  if (!strip) return;
  const t = tripGet(id); if (!t) return;
  const pts = tripPoints(t);
  if (pts.length < 2){ strip.hidden = true; return; }
  const mine = () => mount === PG_MOUNT && host.isConnected;

  /* one route for the whole trip, then per day out of its legs */
  let route = (typeof liveRoute === 'function') ? await liveRoute(pts) : null;
  if (!route) route = guessRoute(pts);
  if (!mine()) return;

  const gas = (typeof liveGas === 'function')
    ? await liveGas(pts[0].abbr) : { usd: 3.15, guess: true };
  if (!mine()) return;
  const fuel = (route.miles / MPG) * gas.usd;

  /* Driving per day: a leg belongs to the day its destination is on,
     which is what makes the overnight drive count against the day it
     gets you to. The same leg is written onto the card, so the cards
     always add up to the header. */
  const perDay = {};
  pts.forEach((p, i) => {
    if (!i) return;
    const leg = route.legs[i - 1];
    if (!leg) return;
    perDay[p.day] = (perDay[p.day] || 0) + leg.hours;
    const span = host.querySelector('[data-legto="' + CSS.escape(p.id) + '"]');
    if (span){
      const from = pts[i - 1].name;
      span.textContent = fmtDrive(leg.hours) + ' from ' + from;
      span.title = Math.round(leg.miles) + ' miles'
        + (route.real ? ' by road' : ' (straight-line estimate)');
    }
  });

  let over = 0;
  t.days.forEach(d => {
    const hrs = perDay[d.id] || 0;
    const el = host.querySelector('[data-dayload="' + d.id + '"]');
    const col = host.querySelector('[data-day-col="' + d.id + '"]');
    if (!el) return;
    if (!hrs){ el.textContent = ''; if (col) col.classList.remove('is-over'); return; }
    el.textContent = fmtDrive(hrs) + ' driving';
    const bad = hrs > DAY_DRIVE_WARN;
    el.classList.toggle('is-over', bad);
    if (col) col.classList.toggle('is-over', bad);
    if (bad) over++;
  });

  /* holidays inside the trip, which is the cheapest crowd warning
     there is and the one people most often forget */
  let holiday = '';
  if (typeof holidaysBetween === 'function' && t.start && t.end){
    const hs = await holidaysBetween(t.start, t.end);
    if (!mine()) return;
    if (hs && hs.length) holiday = hs.map(x => x.name).join(', ');
  }

  strip.innerHTML =
      '<div class="pg-tot"><b>' + route.miles.toLocaleString() + '</b><span>miles'
    +   (route.real ? '' : ' (estimated)') + '</span></div>'
    + '<div class="pg-tot"><b>' + fmtDrive(route.hours) + '</b><span>behind the wheel</span></div>'
    + '<div class="pg-tot"><b>$' + Math.round(fuel) + '</b><span>fuel at $'
    +   gas.usd.toFixed(2) + '/gal' + (gas.guess ? ' (estimate)' : '') + '</span></div>'
    + (over ? '<div class="pg-tot is-warn"><b>' + over + '</b><span>'
        + (over === 1 ? 'day over ' : 'days over ') + DAY_DRIVE_WARN + 'h driving</span></div>' : '')
    + (holiday ? '<div class="pg-tot is-note"><b>Holiday</b><span>' + plEsc(holiday)
        + ' falls in this trip</span></div>' : '')
    + '<p class="pg-tot-src">'
    +   (route.real ? 'Road distances from OSRM' : 'Straight-line estimate — the router did not answer')
    +   ' · ' + MPG + " mpg assumed</p>";
  strip.hidden = false;
}

/* ===========================================================
   CHOOSING FROM THE WANT LIST

   The want-to-go list belongs to you, not to a trip. Emptying it
   into whatever trip was open is how places from one trip turned up
   in another, so this asks which ones — nothing is added until it
   is ticked.
   =========================================================== */
function openWantPicker(tripIdForList, repaint){
  const t = tripGet(tripIdForList); if (!t) return;
  const want = markedIds('want').filter(pid => !tripHasPlace(t, pid));
  if (!want.length) return;

  const wrap = document.createElement('div');
  wrap.className = 'pk-wrap';
  wrap.innerHTML = '<div class="pk" role="dialog" aria-modal="true" aria-label="Add want-to-go places">'
    + '<button class="pk-x" data-close aria-label="Close">&times;</button>'
    + '<span class="lab">Want to go</span><h3>Add to ' + plEsc(t.name) + '</h3>'
    + '<p class="pk-sub">Your want-to-go list is shared across every trip. Tick the ones that belong on this one.</p>'
    + '<div class="pk-check">'
    +   want.map(pid => {
          const p = placeGet(pid); if (!p) return '';
          return '<label><input type="checkbox" value="' + plEsc(pid) + '">'
            + '<b>' + plEsc(p.name) + '</b><i>' + plEsc(stateName(p.abbr)) + '</i></label>';
        }).join('')
    + '</div>'
    + '<div class="pk-new"><button class="pg-btn" data-all>Tick all</button>'
    +   '<button class="pg-btn pg-btn-go" data-add>Add ticked</button></div></div>';
  document.body.appendChild(wrap);

  const close = () => { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); };
  wrap.addEventListener('pointerdown', e => {
    if (e.target === wrap || (e.target.closest && e.target.closest('[data-close]'))) close();
  });
  wrap.addEventListener('click', e => {
    if (e.target === wrap || e.target.closest('[data-close]')) return close();
    if (e.target.closest('[data-all]')){
      wrap.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = true);
      return;
    }
    if (e.target.closest('[data-add]')){
      const picked = [...wrap.querySelectorAll('input[type=checkbox]:checked')].map(c => c.value);
      picked.forEach(pid => tripAddPlace(tripIdForList, pid));
      close();
      if (picked.length) toast(picked.length + ' added to ' + t.name);
      repaint();
    }
  });
}
