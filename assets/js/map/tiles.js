/* ===========================================================
   STREET MAPS

   The Albers map is the right drawing for the whole country and the
   wrong one for a city: at that scale a state outline tells you
   nothing about whether two museums are a walk apart. This is the
   other map — real tiles, real streets, numbered pins — used on city
   pages and in the planner.

   Leaflet is loaded only when one of those maps is actually asked
   for, so every other page pays nothing for it. Everything here
   resolves rather than throws: if the library or the tiles cannot be
   reached, the caller is handed null and shows what it showed
   before.
   =========================================================== */

const LEAFLET_JS  = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
const LEAFLET_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';

let LEAFLET_LOAD = null;
function leafletReady(){
  if (window.L) return Promise.resolve(window.L);
  if (LEAFLET_LOAD) return LEAFLET_LOAD;
  LEAFLET_LOAD = new Promise(resolve => {
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = LEAFLET_CSS;
    document.head.appendChild(css);
    const js = document.createElement('script');
    js.src = LEAFLET_JS; js.async = true;
    js.onload = () => resolve(window.L || null);
    js.onerror = () => resolve(null);
    document.head.appendChild(js);
  });
  return LEAFLET_LOAD;
}

/* ---- pin shapes ---------------------------------------------------
   A numbered pin for the planner, where order is the whole point, and
   a plain dot for a city page, where it is not. */
function pinIcon(L, n, kind, on){
  const tone = kind === 'food' ? 'is-food' : kind === 'stay' ? 'is-stay'
             : kind === 'idea' ? 'is-idea' : '';
  const num = (n === null || n === undefined) ? '' : String(n);
  /* The number is drawn as SVG text with dominant-baseline="central",
     which centres on the font's own central axis. Centring a line of
     HTML text instead centres the line box, and a digit has no
     descender, so it always sat visibly high in the circle. */
  const html = num
    ? '<svg viewBox="0 0 26 26" aria-hidden="true"><text x="13" y="13">' + num + '</text></svg>'
    : '';
  const size = num ? 26 : 15;
  return L.divIcon({
    className: 'tm-pin ' + tone + (on ? ' is-on' : ''),
    html: html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

/* ===========================================================
   WHERE THE TILES COME FROM

   Twice now a provider has been chosen on reputation and twice it
   has drawn its own refusal onto the map: OpenStreetMap's servers
   answer "Access blocked" and CARTO's now answer "API key
   required". Both arrive as a perfectly valid HTTP 200 image, so
   nothing throws, no error event fires, and Leaflet cheerfully
   tiles the apology across the screen.

   The only reliable test is what the picture actually shows. A
   provider that is refusing serves the SAME image for every tile,
   because it is a notice rather than a map. So each candidate is
   asked for two tiles from opposite sides of the country and the
   two are compared pixel by pixel; identical means refused, and
   the next candidate is tried. Whichever passes is remembered, so
   the test runs once rather than on every map.

   If the comparison cannot run at all — a provider that sends no
   CORS header taints the canvas — the candidate is accepted rather
   than rejected, because an untestable provider is still more
   likely to work than no map at all.
   =========================================================== */
const TILE_TRY = [
  { id:'esri-street',
    url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attr:'Tiles © Esri', max:19, dark:false },
  { id:'esri-topo',
    url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attr:'Tiles © Esri', max:19, dark:false },
  { id:'carto-light',
    url:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attr:'© OpenStreetMap contributors © CARTO', sub:'abcd', max:20, dark:false },
  { id:'opentopo',
    url:'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attr:'© OpenStreetMap contributors, SRTM | © OpenTopoMap (CC-BY-SA)', sub:'abc', max:17, dark:false },
  { id:'esri-imagery',
    url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attr:'Tiles © Esri', max:19, dark:true }
];

/* Two tiles far enough apart that no real map could draw them the
   same: downtown Chicago, and open country in eastern Oregon. */
const PROBE_A = { z: 7, x: 32, y: 47 };
const PROBE_B = { z: 7, x: 22, y: 45 };

function tileURL(spec, t){
  return spec.url
    .replace('{s}', (spec.sub || 'a')[0])
    .replace('{z}', t.z).replace('{x}', t.x).replace('{y}', t.y)
    .replace('{r}', '');
}

/* The fingerprint of a tile: a small grid of sampled pixels. Returns
   '' when the image will not load, and 'opaque' when the canvas is
   tainted and cannot be read. */
function tilePrint(url){
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const done = v => resolve(v);
    const to = setTimeout(() => done(''), 9000);
    img.onerror = () => { clearTimeout(to); done(''); };
    img.onload = () => {
      clearTimeout(to);
      try {
        const c = document.createElement('canvas');
        c.width = 16; c.height = 16;
        const g = c.getContext('2d', { willReadFrequently: true });
        g.drawImage(img, 0, 0, 16, 16);
        const d = g.getImageData(0, 0, 16, 16).data;
        let out = '';
        for (let i = 0; i < d.length; i += 16) out += d[i].toString(16);
        done(out);
      } catch(e){ done('opaque'); }     /* no CORS header: cannot judge */
    };
    img.src = url;
  });
}

async function tileWorks(spec){
  const [a, b] = await Promise.all([
    tilePrint(tileURL(spec, PROBE_A)),
    tilePrint(tileURL(spec, PROBE_B))
  ]);
  if (!a || !b) return false;                 /* did not load at all */
  if (a === 'opaque' || b === 'opaque') return true;  /* untestable, allow */
  return a !== b;                             /* identical = a notice, not a map */
}

let TILE_PICKED = null;

/* Which provider actually answered the probe. offline.js needs it:
   saving one provider's tiles and then drawing another's would cache
   a great deal of nothing. Null until a map has probed once. */
function tileSpecInUse(){ return TILE_PICKED; }

async function tileSet(){
  if (TILE_PICKED) return TILE_PICKED;

  /* a provider set by hand in config.js is tried first, and still
     has to pass the same test */
  const list = TILE_TRY.slice();
  if (typeof TILE_URL !== 'undefined' && TILE_URL){
    list.unshift({ id:'config', url: TILE_URL, max: 19, sub:'abcd',
      attr: (typeof TILE_ATTR !== 'undefined' && TILE_ATTR) || '© OpenStreetMap contributors' });
  }

  /* Remembered for the SESSION only, never longer. A provider's
     refusal is a valid 200-OK image, so a provider that works today
     and starts demanding a key tomorrow (as CARTO did) would, if this
     were cached in localStorage, pin the map to that refusal across
     days and deploys with no way to recover but clearing site data.
     Session scope means every fresh visit re-probes and self-heals.
     Any old localStorage pin from before this change is cleared. */
  try { localStorage.removeItem('tiles.ok'); } catch(e){}

  let remembered = '';
  try { remembered = sessionStorage.getItem('tiles.ok') || ''; } catch(e){}
  if (remembered){
    const hit = list.find(x => x.id === remembered);
    if (hit){ TILE_PICKED = hit; return hit; }
  }

  for (const spec of list){
    if (await tileWorks(spec)){
      TILE_PICKED = spec;
      try { sessionStorage.setItem('tiles.ok', spec.id); } catch(e){}
      return spec;
    }
  }
  return null;                                 /* every provider refused */
}

/* ---- the map object ----
   Returns null when Leaflet or the tiles are unreachable, so every
   caller must handle that. */
async function tileMap(host, opts){
  const L = await leafletReady();
  if (!L || !host) return null;
  const o = opts || {};

  host.classList.add('tm');
  const map = L.map(host, {
    /* Scroll-to-zoom is armed by a click rather than left permanently
       on, so that scrolling the PAGE past an embedded map does not get
       swallowed into zooming it. One click on the map and the wheel
       zooms; moving the pointer off the map hands scrolling back to
       the page. The + / − buttons and dragging always work. */
    zoomControl: true, scrollWheelZoom: false, attributionControl: true,
    zoomSnap: 0.25
  });

  let armed = false;
  const hint = document.createElement('div');
  hint.className = 'tm-hint';
  hint.textContent = 'Click to zoom with scroll';
  const arm = () => { armed = true; map.scrollWheelZoom.enable(); hint.classList.add('gone'); };
  host.addEventListener('pointerdown', arm);
  host.addEventListener('mouseenter', () => { if (armed) map.scrollWheelZoom.enable(); });
  host.addEventListener('mouseleave', () => map.scrollWheelZoom.disable());
  const set = await tileSet();
  if (!set){
    /* Every provider refused. Say so rather than tiling an apology
       across the screen — tools/tile-test.html finds one that works. */
    try { map.remove(); } catch(e){}
    host.classList.remove('tm');
    host.innerHTML = '<p class="tm-none">No map tiles would load. '
      + 'Open <code>tools/tile-test.html</code> to find a provider that works '
      + 'from here, and paste it into <code>TILE_URL</code> in config.js.</p>';
    return null;
  }
  const layer = L.tileLayer(set.url, {
    maxZoom: set.max, subdomains: set.sub || 'abc', attribution: set.attr,
    detectRetina: true, crossOrigin: true,
    className: set.dark ? 'tm-dark' : ''
  }).addTo(map);
  host.appendChild(hint);

  map.setView([o.lat || 39.5, o.lon || -98.5], o.zoom || 11);

  const marks = {};          /* id -> { marker, lat, lon, n } */
  let line = null, current = null, me = null;

  const api = {
    map: map,

    /* Replace every pin in one go. `items` are { id, lat, lon, name,
       n (a number, or null for a plain dot), kind }. */
    set(items){
      Object.keys(marks).forEach(k => map.removeLayer(marks[k].marker));
      for (const k in marks) delete marks[k];
      (items || []).forEach(it => {
        if (!it || typeof it.lat !== 'number') return;
        const m = L.marker([it.lat, it.lon], {
          icon: pinIcon(L, it.n === undefined ? null : it.n, it.kind, false),
          keyboard: false, riseOnHover: true
        }).addTo(map);
        if (it.name){
          m.bindTooltip(it.name, { direction:'top', offset:[0, -12], className:'tm-tip' });
        }
        if (o.onPick) m.on('click', () => o.onPick(it.id, it));
        marks[it.id] = { marker: m, lat: it.lat, lon: it.lon, n: it.n, kind: it.kind };
      });
      return api;
    },

    /* The route between the numbered stops, as a line. */
    route(items){
      if (line){ map.removeLayer(line); line = null; }
      const pts = (items || []).filter(i => typeof i.lat === 'number').map(i => [i.lat, i.lon]);
      if (pts.length < 2) return api;
      line = L.polyline(pts, { color:'#E3AC56', weight:3, opacity:.75, dashArray:'1 7',
                               lineCap:'round' }).addTo(map);
      return api;
    },

    /* Frame everything, with room for the pins themselves. */
    fit(){
      const pts = Object.keys(marks).map(k => [marks[k].lat, marks[k].lon]);
      if (!pts.length) return api;
      if (pts.length === 1) map.setView(pts[0], o.single || 13);
      else map.fitBounds(L.latLngBounds(pts), { padding:[34, 34], maxZoom: o.maxFit || 15 });
      return api;
    },

    /* Hovering a row in the list brings the map to that pin. This is
       the whole reason the two are worth wiring together. */
    focus(id, hard){
      if (current && marks[current]){
        const c = marks[current];
        c.marker.setIcon(pinIcon(L, c.n, c.kind, false));
      }
      const m = marks[id];
      current = id;
      if (!m) return api;
      m.marker.setIcon(pinIcon(L, m.n, m.kind, true));
      m.marker.setZIndexOffset(900);
      const z = map.getZoom();
      if (hard) map.setView([m.lat, m.lon], Math.max(z, o.single || 13), { animate:true });
      else if (!map.getBounds().pad(-0.18).contains([m.lat, m.lon]))
        map.panTo([m.lat, m.lon], { animate:true, duration:.4 });
      return api;
    },

    blur(){
      if (current && marks[current]){
        const c = marks[current];
        c.marker.setIcon(pinIcon(L, c.n, c.kind, false));
      }
      current = null;
      return api;
    },

    /* Where the reader is, as a pulsing dot that is not a pin — it is
       not somewhere you chose, it is where you happen to be. */
    locate(lat, lon){
      if (typeof lat !== 'number') return api;
      if (me) map.removeLayer(me);
      me = L.marker([lat, lon], {
        icon: L.divIcon({ className: 'tm-me', html: '<i></i><b></b>',
                          iconSize: [18, 18], iconAnchor: [9, 9] }),
        keyboard: false, interactive: false, zIndexOffset: -200
      }).addTo(map);
      me.bindTooltip('You are here', { direction:'top', offset:[0,-10], className:'tm-tip' });
      return api;
    },

    has(id){ return !!marks[id]; },
    count(){ return Object.keys(marks).length; },
    resize(){ setTimeout(() => map.invalidateSize(), 60); return api; },
    destroy(){ try { map.remove(); } catch(e){} }
  };
  return api;
}

/* ===========================================================
   WHERE IS THAT, EXACTLY?

   The atlas knows where its places are. It does not know where any
   of the six thousand things to do inside them are, because none of
   that came with coordinates. This asks — Wikipedia first, since a
   named landmark usually has an article with a position on it, then
   OpenStreetMap by name near the place — and remembers the answer in
   localStorage, because a waterfall does not move.
   =========================================================== */
const GEO_MEM = {};

function geoCached(key){
  if (GEO_MEM[key] !== undefined) return GEO_MEM[key];
  try {
    const raw = localStorage.getItem('geo.' + key);
    if (raw) return (GEO_MEM[key] = JSON.parse(raw));
  } catch(e){}
  return undefined;
}
function geoStore(key, val){
  GEO_MEM[key] = val;
  try { localStorage.setItem('geo.' + key, JSON.stringify(val)); } catch(e){}
}

/* Within this many miles of the parent place, or it is the wrong
   thing with the right name — there is a Memorial Park in every
   town in the country. */
const GEO_MAX_MI = 45;

async function geoLocate(name, place){
  const key = (place.id + '|' + name).toLowerCase().replace(/[^a-z0-9|]+/g, '-').slice(0, 90);
  const hit = geoCached(key);
  if (hit !== undefined) return hit;

  const near = (lat, lon) => typeof lat === 'number'
    && haversine(place.lat, place.lon, lat, lon) <= GEO_MAX_MI;

  /* 1 — Wikipedia, which also lets the existing title check run */
  let found = null;
  const wiki = await liveGet('https://en.wikipedia.org/w/api.php?action=query&format=json'
    + '&origin=*&generator=search&gsrlimit=4&gsrsearch='
    + encodeURIComponent(name + ' ' + place.name) + '&prop=coordinates&colimit=4');
  const pages = wiki && wiki.query && wiki.query.pages;
  if (pages){
    Object.keys(pages).map(k => pages[k])
      .sort((a, b) => (a.index || 0) - (b.index || 0))
      .forEach(pg => {
        if (found) return;
        const c = pg.coordinates && pg.coordinates[0];
        if (!c || !near(c.lat, c.lon)) return;
        if (typeof titleFits === 'function' && !titleFits(name, pg.title || '', place)) return;
        found = { lat: c.lat, lon: c.lon, via: 'wikipedia' };
      });
  }

  /* 2 — OpenStreetMap, which knows the trailheads Wikipedia does not */
  if (!found){
    const ph = await liveGet('https://photon.komoot.io/api/?limit=5&lat=' + place.lat
      + '&lon=' + place.lon + '&q=' + encodeURIComponent(name + ' ' + place.name));
    const f = ph && ph.features;
    if (f && f.length){
      for (let i = 0; i < f.length; i++){
        const c = f[i].geometry && f[i].geometry.coordinates;
        if (c && near(c[1], c[0])){ found = { lat: c[1], lon: c[0], via: 'osm' }; break; }
      }
    }
  }

  geoStore(key, found);
  return found;
}

/* Resolve a list of names without setting fire to either API: a few
   at a time, reporting back as each one lands. */
async function geoLocateAll(names, place, onEach, limit){
  const todo = names.slice(0, limit || 40);
  const batch = 4;
  for (let i = 0; i < todo.length; i += batch){
    const slice = todo.slice(i, i + batch);
    const got = await Promise.all(slice.map(n => geoLocate(n.name, place)));
    got.forEach((g, k) => { if (g && onEach) onEach(slice[k], g); });
  }
}
