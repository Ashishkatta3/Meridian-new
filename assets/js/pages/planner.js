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
    +     '<p class="pg-sub">' + total + (total === 1 ? ' place' : ' places') + ' across ' + t.days.length + (t.days.length === 1 ? ' day' : ' days') + ' · drag a stop to reorder or move it between days</p></div>'
    +   '<div class="pg-acts">'
    +     '<button class="pg-btn" id="addDay">+ Add day</button>'
    +     '<button class="pg-btn" id="shareTrip">Share</button>'
    +     '<button class="pg-btn" id="expTxt">Export</button>'
    +   '</div>'
    + '</div>';

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
  h += '<div id="pgBoard"><div class="pg-board">';
  t.days.forEach(d => { h += dayColumn(t, d); });
  h += ideasColumn(t);
  h += '</div></div>';

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
function legHTML(fromParent, toParent){
  if (!fromParent || fromParent === toParent) return '';
  const a = placeGet(fromParent), b = placeGet(toParent);
  if (!a || !b) return '';
  const mi = haversine(a.lat, a.lon, b.lat, b.lon);
  return '<span class="pg-leg">' + fmtDrive(driveHours(mi)) + ' from ' + plEsc(a.name) + '</span>';
}

function dayColumn(t, d){
  let h = '<div class="pg-col" data-list="' + d.id + '">'
        + '<div class="pg-col-h"><span class="pg-col-t" contenteditable="true" data-day="' + d.id + '" spellcheck="false">' + plEsc(d.label) + '</span>'
        + (t.days.length > 1 ? '<button class="pg-x" data-delday="' + d.id + '" title="Remove day">&times;</button>' : '')
        + '</div><div class="pg-drop" data-list="' + d.id + '">';
  if (!d.stops.length) h += '<p class="pg-blank">Drag a place here</p>';
  h += renderGroups(t, d.stops, d.id);
  return h + '</div></div>';
}

function ideasColumn(t){
  let h = '<div class="pg-col pg-col-ideas" data-list="ideas">'
        + '<div class="pg-col-h"><span class="pg-col-t">Ideas</span></div>'
        + '<div class="pg-drop" data-list="ideas">';
  if (!t.ideas.length) h += '<p class="pg-blank">Places with no day yet</p>';
  h += renderGroups(t, t.ideas, 'ideas');
  return h + '</div></div>';
}

function renderGroups(t, stops, listId){
  const groups = groupStops(stops);
  let h = '', prev = null;
  groups.forEach(g => {
    const leg = legHTML(prev, g.parent);
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

  return '<article class="pg-stop' + (isSub ? ' is-sub' : '') + '" data-stop="' + pid + '">'
    + (leg || '')
    + '<div class="pg-stop-in">'
    +   '<button class="pg-grip" data-drag title="Drag to move">&#10283;</button>'
    +   (p.photoId
          ? '<span class="pg-stop-ph' + (isSub ? ' is-spot' : '') + '" data-pgphoto="' + p.photoId + '"></span>'
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
  t.days.forEach(d => d.stops.forEach(push));
  t.ideas.forEach(push);

  if (!places.length){
    return '<div class="pg-empty"><p>Nothing on the trip yet.</p>'
         + '<p class="pg-note">Add a stop and this becomes two lists under it: '
         + 'where you are sleeping and where you are eating.</p></div>';
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
  if (want.length) h += '<button class="pg-btn pg-btn-s" id="addWant">Add ' + want.length + ' want-to-go place' + (want.length === 1 ? '' : 's') + '</button>';
  else h += '<span class="pg-note">Mark places “want to go” on the map and you can drop them all in at once.</span>';
  return h + '</div>';
}

/* ---------- mount ---------- */
function mountPlanner(host, tripIdOrNull){
  const repaint = () => mountPlanner(host, tripIdOrNull);
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
  host.querySelectorAll('[data-ptab]').forEach(b => b.onclick = () => showTab(b.dataset.ptab));
  showTab(PG_TAB);
  wireStay(host, id, repaint);

  on('#addDay', () => { tripAddDay(id); repaint(); });
  on('#shareTrip', () => openShare(id));
  paintShareNote(host, id);
  on('#expTxt', () => exportTrip(tripGet(id)));
  on('#addWant', () => { markedIds('want').forEach(p => tripAddPlace(id, p)); repaint(); });

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
      if (typeof addStopWithParent === 'function') addStopWithParent(id, b.dataset.addpid);
      else tripAddPlace(id, b.dataset.addpid);
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
    const atlas = searchAll(q, 10).filter(r => !tripHasPlace(t, r.id)).slice(0, 7);

    render(atlas, null, true);
    /* wait for a pause in typing before troubling a public service */
    PG_SEARCH_T = setTimeout(() => {
      geoSearch(q).then(hits => { if (box.value.trim() === q) render(atlas, hits, false); });
    }, 450);
  });
}

async function geoSearch(q){
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
      if (hits.length) return hits;
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
    loadImage(p.thumb || p.src, 220,
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

function openShare(id){
  const t = tripGet(id); if (!t) return;
  const online = (typeof cloudActive === 'function') && cloudActive();
  const wrap = document.createElement('div');
  wrap.className = 'pk-wrap';
  wrap.innerHTML = '<div class="pk" role="dialog" aria-modal="true" aria-label="Share trip">'
    + '<button class="pk-x" data-close aria-label="Close">&times;</button>'
    + '<span class="lab">Share</span><h3>' + plEsc(t.name) + '</h3>'
    + (online
        ? '<p class="pk-sub">Invite by email. They see the trip as soon as they sign in with that address.</p>'
          + '<div class="pk-new"><input id="shEmail" type="email" placeholder="their@email.com" autocomplete="off">'
          + '<button class="pg-btn pg-btn-go" data-invite>Invite</button></div>'
          + '<div id="shPeople" class="pk-people"></div>'
        : '<p class="pk-sub">Not available yet</p>'
          + '<p class="pg-note">Sharing needs an account, so the other person has something to sign in to. '
          + 'Set that up on the <a href="#/account">Account</a> page — it takes a few minutes and is free. '
          + 'Until then, <b>Export</b> gives you the whole itinerary as text you can send.</p>')
    + '<p class="ac-msg" id="shMsg"></p></div>';
  document.body.appendChild(wrap);

  const close = () => { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); };
  wrap.addEventListener('click', async e => {
    if (e.target === wrap || e.target.closest('[data-close]')) return close();
    if (e.target.closest('[data-invite]')){
      const em = wrap.querySelector('#shEmail').value;
      const r = await tripInvite(id, em);
      const m = wrap.querySelector('#shMsg');
      m.textContent = r.error || ('Invited ' + em + '.');
      m.className = 'ac-msg ' + (r.error ? 'is-bad' : 'is-ok');
      if (!r.error){ wrap.querySelector('#shEmail').value = ''; listPeople(); }
    }
  });
  if (online) listPeople();

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
