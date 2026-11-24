/* ===========================================================
   OFFLINE

   The page's half of the service worker. Three jobs:

     1. register it, and tell the reader when a new version is ready
     2. show, honestly, whether there is a connection right now
     3. "Save this trip offline": work out exactly which map tiles
        and photographs the trip needs, and fetch them while there is
        still signal

   The third is the interesting one. A trip is a line across the
   country, and caching every tile in its bounding box would mean
   caching most of the western United States. So instead this walks
   the route and takes the tiles within a corridor either side of it,
   at the zoom levels that are actually useful in a car: far enough
   out to see the shape of the day, close enough in to find a
   trailhead.
   =========================================================== */

const OFF_ZOOMS = [5, 7, 9, 11];   /* state, region, county, town */
const OFF_PAD   = 1;               /* tiles either side of the line */
const OFF_MAX   = 1500;            /* refuse to queue more than this */

/* ---------- register ---------- */
let OFF_REG = null;

function offlineReady(){
  return 'serviceWorker' in navigator && location.protocol !== 'file:';
}

async function offlineRegister(){
  if (!offlineReady()) return null;
  try {
    OFF_REG = await navigator.serviceWorker.register('sw.js', { scope: './' });

    /* The spec says this resolves to a registration or rejects, but a
       browser with service workers switched off by policy — and some
       embedded web views — resolve with nothing instead. Reading
       .waiting off that threw and turned a disabled-by-choice setting
       into a scary console error, so check before trusting it. */
    if (!OFF_REG) return null;

    /* A waiting worker means a new version of the site is cached and
       ready but the old one is still running. Say so instead of
       leaving somebody on a stale copy wondering why a fix did not
       arrive. */
    const announce = () => {
      if (OFF_REG && OFF_REG.waiting && navigator.serviceWorker.controller) offlineNewVersion();
    };
    announce();
    OFF_REG.addEventListener('updatefound', () => {
      const w = OFF_REG.installing;
      if (w) w.addEventListener('statechange', () => { if (w.state === 'installed') announce(); });
    });
    return OFF_REG;
  } catch(e){
    console.warn('Meridian: offline support could not start —', e.message || e);
    return null;
  }
}

function offlineNewVersion(){
  if (document.getElementById('offNew')) return;
  const bar = document.createElement('div');
  bar.id = 'offNew'; bar.className = 'off-bar is-new';
  bar.innerHTML = '<span>A newer version of Meridian is ready.</span>'
    + '<button class="off-btn" type="button">Reload</button>';
  bar.querySelector('button').onclick = () => {
    if (OFF_REG && OFF_REG.waiting) OFF_REG.waiting.postMessage({ type: 'skip' });
    location.reload();
  };
  document.body.appendChild(bar);
}

/* ---------- are we connected? ----------
   navigator.onLine is famously optimistic — it says true for a phone
   attached to a wifi network that has no route out. So the banner
   appears on a real failed request as well as on the event. */
let OFF_DOWN = false;

function offlineBanner(down){
  OFF_DOWN = down;
  let bar = document.getElementById('offBar');
  if (!down){ if (bar) bar.remove(); return; }
  if (bar) return;
  bar = document.createElement('div');
  bar.id = 'offBar'; bar.className = 'off-bar';
  bar.innerHTML = '<span><b>No connection.</b> Your trips, the atlas and any maps you saved '
    + 'still work. Weather, alerts and live prices will be blank until you are back.</span>';
  document.body.appendChild(bar);
}

window.addEventListener('offline', () => offlineBanner(true));
window.addEventListener('online',  () => offlineBanner(false));

/* live.js and anything else can report a dead request here */
document.addEventListener('net:failed', () => { if (!navigator.onLine) offlineBanner(true); });

/* ---------- the tile maths ---------- */

/* standard slippy-map tile numbers */
function offTileXY(lat, lon, z){
  const n = Math.pow(2, z);
  const x = Math.floor((lon + 180) / 360 * n);
  const r = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n);
  return { x: x, y: y, n: n };
}

/* Every tile within OFF_PAD of the straight line between two points,
   at one zoom. Walking the line rather than filling its box is what
   keeps a cross-country trip down to a few hundred tiles instead of
   tens of thousands. */
function offTilesForLeg(a, b, z, into){
  const A = offTileXY(a.lat, a.lon, z), B = offTileXY(b.lat, b.lon, z);
  const steps = Math.max(Math.abs(B.x - A.x), Math.abs(B.y - A.y), 1);
  for (let i = 0; i <= steps; i++){
    const x = Math.round(A.x + (B.x - A.x) * i / steps);
    const y = Math.round(A.y + (B.y - A.y) * i / steps);
    for (let dx = -OFF_PAD; dx <= OFF_PAD; dx++){
      for (let dy = -OFF_PAD; dy <= OFF_PAD; dy++){
        const tx = x + dx, ty = y + dy;
        if (tx < 0 || ty < 0 || tx >= A.n || ty >= A.n) continue;
        into[z + '/' + tx + '/' + ty] = 1;
      }
    }
  }
}

/* The tile URL template the map is actually using, so saved tiles and
   live tiles are the same tiles — saving one provider's and then
   drawing another's would cache a great deal of nothing. */
function offTileTemplate(){
  if (typeof tileSpecInUse === 'function'){
    const s = tileSpecInUse();
    if (s && s.url) return s.url;
  }
  if (typeof TILE_URL === 'string' && TILE_URL) return TILE_URL;
  return '';
}

function offTileURL(tpl, z, x, y){
  return tpl.replace('{z}', z).replace('{x}', x).replace('{y}', y)
            .replace('{s}', 'a').replace('{r}', '');
}

/* Everything a trip needs to work with no signal. */
function offlinePlan(t){
  const pts = [];
  t.days.forEach(d => d.stops.forEach(sid => {
    const info = stopInfo(sid);
    if (info && info.lat != null) pts.push(info);
  }));

  const tiles = {};
  const tpl = offTileTemplate();
  if (tpl && pts.length){
    for (const z of OFF_ZOOMS){
      /* the stops themselves, so a single-stop trip still saves */
      pts.forEach(p => offTilesForLeg(p, p, z, tiles));
      for (let i = 1; i < pts.length; i++) offTilesForLeg(pts[i - 1], pts[i], z, tiles);
    }
  }

  const urls = [];
  Object.keys(tiles).forEach(k => {
    const [z, x, y] = k.split('/');
    urls.push(offTileURL(tpl, z, x, y));
  });

  return { tiles: urls, stops: pts, template: tpl };
}

/* The photographs: one per stop, at the size the cards use. These
   come from placePhoto, which is async, so this resolves them all
   before handing the list over. */
async function offlinePhotos(t){
  const ids = {};
  t.days.forEach(d => d.stops.forEach(sid => {
    const info = stopInfo(sid);
    if (info && info.photoId) ids[info.photoId] = 1;
  }));
  const out = [];
  for (const id of Object.keys(ids)){
    try {
      const p = await placePhoto(placeGet(stopBase(id)) || id);
      if (p && (p.thumb || p.src)) out.push(p.thumb || p.src);
    } catch(e){}
  }
  return out;
}

/* ---------- saving, with progress ---------- */
async function offlineSave(t, onProgress){
  if (!offlineReady()) return { error: 'This browser cannot save maps offline.' };
  const reg = OFF_REG || await offlineRegister();
  if (!reg || !navigator.serviceWorker.controller)
    return { error: 'Offline support is still starting up. Reload the page and try again.' };

  const plan = offlinePlan(t);
  if (!plan.template)
    return { error: 'No map provider has answered yet, so there are no tiles to save. '
                  + 'Open the map once, then try again.' };

  const photos = await offlinePhotos(t);
  let urls = plan.tiles.concat(photos);

  if (urls.length > OFF_MAX){
    /* Drop the closest zoom first: losing street level on a
       cross-country drive is a smaller loss than filling the phone. */
    const keep = {};
    for (const z of OFF_ZOOMS.slice(0, -1)) keep[z] = 1;
    urls = plan.tiles.filter(u => {
      const m = u.match(/\/(\d{1,2})\/\d+\/\d+/);
      return m ? keep[m[1]] : true;
    }).concat(photos);
  }

  return new Promise(resolve => {
    const ch = new MessageChannel();
    ch.port1.onmessage = ev => {
      const d = ev.data || {};
      if (d.type === 'progress' && onProgress) onProgress(d);
      if (d.type === 'done') resolve({ ok: true, saved: d.done, failed: d.failed, total: d.total });
    };
    navigator.serviceWorker.controller.postMessage({ type: 'save', urls: urls }, [ch.port2]);
    /* a save that never answers should not hang the button forever */
    setTimeout(() => resolve({ ok: true, saved: 0, failed: 0, total: urls.length, slow: true }), 180000);
  });
}

async function offlineUsage(){
  if (!offlineReady() || !navigator.serviceWorker.controller) return null;
  return new Promise(resolve => {
    const ch = new MessageChannel();
    ch.port1.onmessage = ev => resolve((ev.data || {}).counts || null);
    navigator.serviceWorker.controller.postMessage({ type: 'usage' }, [ch.port2]);
    setTimeout(() => resolve(null), 6000);
  });
}

/* ---------- the escape hatch ----------

   If a browser ever ends up holding a broken or half-old copy of the
   site, this is the way out: tear down every cache and every
   registered worker, then reload from the network with nothing in
   the way. It is also what `#/reset` runs, so a site that will not
   come back can be fixed from the address bar without knowing where
   developer tools are.

   The earlier version of this worker served our own files cache
   first, which meant a deploy could not reach a browser that had
   already visited. This exists because that happened. */
async function offlineReset(){
  const done = [];
  try {
    const names = await caches.keys();
    await Promise.all(names.map(n => caches.delete(n)));
    done.push(names.length + ' cache(s) deleted');
  } catch(e){ done.push('caches: ' + (e.message || e)); }
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.map(r => r.unregister()));
    done.push(regs.length + ' worker(s) unregistered');
  } catch(e){ done.push('workers: ' + (e.message || e)); }
  return done;
}

/* #/reset — a plain page anybody can reach, no tools needed */
function mountReset(host){
  host.innerHTML = '<section class="wrap pg-none"><span class="lab">Offline storage</span>'
    + '<h1>Start the site fresh</h1>'
    + '<p>This clears every saved map, photograph and copy of the site held in this '
    + 'browser, then reloads from the network. Your trips and your been/want marks are '
    + 'not touched — those live in your account and in this browser’s own storage, '
    + 'not in the offline cache.</p>'
    + '<p><button class="pg-btn pg-btn-go" id="rsGo">Clear and reload</button></p>'
    + '<p class="ac-msg" id="rsMsg"></p></section>';
  host.querySelector('#rsGo').onclick = async () => {
    const m = host.querySelector('#rsMsg');
    m.textContent = 'Clearing…';
    const done = await offlineReset();
    m.className = 'ac-msg is-ok';
    m.textContent = done.join(', ') + '. Reloading…';
    setTimeout(() => location.replace(location.pathname + '?fresh=' + Date.now()), 700);
  };
}

async function offlineClear(){
  if (!offlineReady() || !navigator.serviceWorker.controller) return;
  return new Promise(resolve => {
    const ch = new MessageChannel();
    ch.port1.onmessage = () => resolve();
    navigator.serviceWorker.controller.postMessage({ type: 'clear' }, [ch.port2]);
    setTimeout(resolve, 6000);
  });
}

/* ---------- boot ---------- */
if (offlineReady()){
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', offlineRegister);
  else offlineRegister();
  if (!navigator.onLine) offlineBanner(true);
}
