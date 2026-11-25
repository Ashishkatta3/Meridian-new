/* ===========================================================
   SERVICE WORKER — Meridian offline

   The whole point: a phone in a canyon has no signal, and that is
   exactly when you need the itinerary. So the app shell and the
   atlas are cached on first visit, and map tiles and photographs are
   cached as they are seen — plus, for a trip you explicitly save,
   fetched ahead of time while you still have bars.

   Four caches, on purpose, because they have different lifetimes:

     shell   the HTML, CSS and JS. Replaced wholesale on a new
             version; nothing stale ever survives a deploy.
     data    the atlas files (places, spots, photos, essays). Big and
             almost never changing, so they are kept across versions
             and only re-fetched when the version bumps.
     tiles   map imagery. Capped, because a few zoom levels of the
             western United States would otherwise fill a phone.
     photos  place photographs. Also capped.

   Strategy per kind:
     shell / data   cache first, network only on a miss
     tiles / photos cache first, then network, then cache the answer
     everything else (APIs: weather, alerts, routing, Supabase)
                    network only. Stale weather is worse than none,
                    and a cached Supabase answer would show somebody
                    an itinerary that has since changed.

   A navigation request falls back to the cached shell, which is what
   makes opening the app with no signal work at all.
   =========================================================== */

/* Bump this on every deploy, together with ?v= in index.html. The
   caches are named from it, so a new version cannot read an old
   shell — the bug where a phone holds one new file next to one old
   one is impossible by construction here. */
const VERSION = 'v36';

const SHELL  = 'meridian-shell-'  + VERSION;
const DATA   = 'meridian-data-'   + VERSION;
const TILES  = 'meridian-tiles';          /* unversioned: imagery does not change */
const PHOTOS = 'meridian-photos';         /* unversioned: ditto */

const TILE_CAP  = 1200;   /* roughly 60–90 MB of 256px tiles */
const PHOTO_CAP = 400;

/* The shell: everything needed to render any route with no network.
   Paths are relative so this works on a sub-path deploy too. */
const SHELL_FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/icon-192.svg',
  'assets/icon-512.svg',

  'assets/css/tokens.css',
  'assets/css/base.css',
  'assets/css/map.css',
  'assets/css/place.css',
  'assets/css/home.css',
  'assets/css/pages.css',
  'assets/css/sheet.css',
  'assets/css/italy.css',
  'assets/css/placeview.css',

  'assets/js/core/config.js',
  'assets/js/core/auth.js',
  'assets/js/core/sun.js',
  'assets/js/core/events.js',
  'assets/js/core/search.js',
  'assets/js/core/state.js',
  'assets/js/core/geo.js',
  'assets/js/core/tags.js',
  'assets/js/core/itin.js',
  'assets/js/core/stops.js',
  'assets/js/core/pick.js',
  'assets/js/core/trips.js',
  'assets/js/core/cloud.js',
  'assets/js/core/share.js',
  'assets/js/core/photos.js',
  'assets/js/core/live.js',
  'assets/js/core/italy.live.js',
  'assets/js/core/cr.live.js',
  'assets/js/core/in.live.js',
  'assets/js/core/lazy.js',
  'assets/js/core/placeview.js',
  'assets/js/core/jp.live.js',
  'assets/js/core/offline.js',

  'assets/js/map/icons.js',
  'assets/js/map/usmap.js',
  'assets/js/map/mini.js',
  'assets/js/map/tiles.js',

  'assets/js/pages/place.js',
  'assets/js/pages/home.js',
  'assets/js/pages/planner.js',
  'assets/js/pages/trips.js',
  'assets/js/pages/states.js',
  'assets/js/pages/account.js',
  'assets/js/pages/recover.js',
  'assets/js/pages/welcome.js',
  'assets/js/pages/sheet.js',
  'assets/js/pages/italy.js',
  'assets/js/pages/cr.js',
  'assets/js/pages/in.js',
  'assets/js/pages/jp.js',


  /* Country data. The guide files are deliberately absent: they
     are fetched on demand by core/lazy.js and land in the data
     cache through the normal fetch handler, so a visitor who
     never opens India never downloads half a megabyte of it. */
  'assets/js/data/italy.places.js',
  'assets/js/data/cr.places.js',
  'assets/js/data/in.places.js',
  'assets/js/data/jp.places.js',

  'assets/js/app.js',
  'assets/js/core/router.js'
];

/* The atlas. Separately cached because it is the heavy part and it
   is what makes the site useful with no signal. */
const DATA_FILES = [
  'assets/js/data/taxonomy.js',
  'assets/js/data/places.js',
  'assets/js/data/spots.js',
  'assets/js/data/food.js',
  'assets/js/data/info.js',
  'assets/js/data/photos.js',
  'assets/js/data/roadtrips.js',
  'assets/js/data/bucket.js',
  'assets/js/data/longform.cities.js',
  'assets/js/data/longform.parks.js',
  'assets/js/data/longform.js',
  'assets/js/data/geo.us.js',
  'assets/js/data/italy.places.js',
  'assets/js/data/italy.guide.js'
];

/* ---------- install ---------- */
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    /* One file failing must not fail the whole install — a single 404
       on a renamed asset would otherwise leave the site with no
       offline support at all and no clue why. Add them one at a time
       and report what did not make it. */
    const shell = await caches.open(SHELL);
    const data  = await caches.open(DATA);
    const missed = [];
    const add = async (cache, url) => {
      try {
        const res = await fetch(url + '?sw=' + VERSION, { cache: 'reload' });
        if (res.ok) await cache.put(url, res);
        else missed.push(url + ' (' + res.status + ')');
      } catch(err){ missed.push(url + ' (' + err.message + ')'); }
    };
    await Promise.all(SHELL_FILES.map(f => add(shell, f)));
    await Promise.all(DATA_FILES.map(f => add(data, f)));
    if (missed.length) console.warn('Meridian offline: not cached —', missed.join(', '));
    await self.skipWaiting();
  })());
});

/* ---------- activate: drop old versions ---------- */
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [SHELL, DATA, TILES, PHOTOS];
    const names = await caches.keys();
    await Promise.all(names.map(n => keep.indexOf(n) === -1 ? caches.delete(n) : null));
    await self.clients.claim();
  })());
});

/* ---------- helpers ---------- */
function isTile(url){
  return /\/\d{1,2}\/\d+\/\d+(@2x)?\.(png|jpe?g|webp|pbf)/.test(url.pathname)
      || /tile\.|tiles\.|basemaps\.|\.tile\./.test(url.hostname);
}
function isPhoto(url){
  /* thumb.wikimedia.org is named explicitly: Wikimedia moved its
     thumbnails there, and until it was listed a photograph only
     landed in this cache because its path happened to end in .jpg.
     A thumbnail of an SVG or a TIFF does not, so those were being
     re-fetched on every single visit. */
  return /upload\.wikimedia\.org|thumb\.wikimedia\.org|commons\.wikimedia\.org|nps\.gov.*\.(jpg|jpeg|png)|images\.openverse|mapillary/.test(url.href)
      || /\.(jpg|jpeg|png|webp|avif)$/i.test(url.pathname);
}
/* Live data must never be served from a cache. Weather from
   yesterday, a road closure that has been lifted, or a trip that
   somebody else has changed are all worse than an honest blank. */
function isLive(url){
  return /supabase\.co|api\.weather\.gov|open-meteo|tidesandcurrents|services\.swpc|sunrise-sunset|nps\.gov\/api|ridb\.recreation\.gov|api\.eia\.gov|nager\.date|overpass|photon\.komoot|nominatim|router\.project-osrm|openrouteservice|ticketmaster|wikidata\.org\/w\/api|\/w\/api\.php|ipwho\.is/.test(url.href);
}

/* Keep a cache under its cap, oldest first. */
async function trim(name, cap){
  const c = await caches.open(name);
  const keys = await c.keys();
  if (keys.length <= cap) return;
  for (let i = 0; i < keys.length - cap; i++) await c.delete(keys[i]);
}

/* ---------- fetch ---------- */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch(err){ return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  /* live data: straight to the network, and say so plainly if it is
     not there rather than handing back something old */
  if (isLive(url)) return;

  /* a navigation with no signal: serve the shell so the app opens */
  if (req.mode === 'navigate'){
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        /* keep the offline copy current, so the fallback below is the
           page as last deployed rather than as first installed */
        if (res && res.ok){
          const c = await caches.open(SHELL);
          c.put('index.html', res.clone());
        }
        return res;
      }
      catch(err){
        const c = await caches.open(SHELL);
        return (await c.match('index.html')) || (await c.match('./'))
            || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  /* ---------- our own files: NETWORK FIRST ----------

     This was cache-first, and cache-first was wrong here. It meant a
     deployed change could never reach a browser that had already
     visited, unless VERSION in this file also changed — and when it
     did not, the browser kept serving the old JavaScript and the old
     CSS for ever, beside whatever new files it had not cached yet.
     A site running half of one version and half of another is how a
     home page loses its hero, a fixed bug appears to come back, and
     a new feature never shows up at all. No amount of reloading
     fixes it, because the service worker answers before the network
     is ever asked.

     So: ask the network first, always, and fall back to the cache
     only when the network does not answer. Offline still works —
     that is the whole fallback path — and a deploy is live on the
     next load, which is what anyone would expect.

     The race is bounded. A request that hangs (a captive portal, a
     phone with one bar) would otherwise leave the page blank for
     thirty seconds, so after 2.5s the cache answers instead and the
     network copy still refreshes the cache when it arrives. */
  /* ---------- our own photographs ----------

     assets/photos/ holds the pictures the site hosts itself. These
     are immutable for a given filename — the width is in the name,
     and replacing one writes a new file — so they want the opposite
     treatment to the code: serve from cache instantly, and refresh
     in the background in case the tool re-downloaded one.

     This has to sit ABOVE the same-origin branch below, which is
     network-first and would otherwise make every card wait on the
     network before drawing, and would never cache them for offline. */
  if (url.origin === self.location.origin && /^\/assets\/photos\//.test(url.pathname)){
    e.respondWith((async () => {
      const c = await caches.open(PHOTOS);
      const hit = await c.match(req);
      const fresh = fetch(req).then(res => {
        if (res && res.ok){ c.put(req, res.clone()); trim(PHOTOS, PHOTO_CAP); }
        return res;
      }).catch(() => null);
      return hit || (await fresh) || new Response('', { status: 504 });
    })());
    return;
  }

  if (url.origin === self.location.origin){
    e.respondWith((async () => {
      const bare = url.origin + url.pathname;
      const cached = async () => {
        for (const name of [SHELL, DATA]){
          const c = await caches.open(name);
          const hit = (await c.match(req, { ignoreSearch: true })) || (await c.match(bare));
          if (hit) return hit;
        }
        return null;
      };

      const fromNet = fetch(req).then(async res => {
        if (res && res.ok && /\.(js|css|html|webmanifest|svg|json)$/.test(url.pathname)){
          const c = await caches.open(SHELL);
          /* store under the bare path so the next ?v= still finds it */
          c.put(bare, res.clone());
        }
        return res;
      });

      /* whichever answers first, with the network given a head start
         it can only lose by being slow */
      const slow = new Promise(r => setTimeout(() => r('timeout'), 2500));
      try {
        const winner = await Promise.race([fromNet, slow]);
        if (winner !== 'timeout' && winner) return winner;
      } catch(err){ /* network refused — fall through to the cache */ }

      const hit = await cached();
      if (hit) return hit;
      try { return await fromNet; }
      catch(err){ return new Response('', { status: 504 }); }
    })());
    return;
  }

  /* map tiles and photographs: cache first, then network, then keep */
  const tile = isTile(url), photo = !tile && isPhoto(url);
  if (tile || photo){
    const name = tile ? TILES : PHOTOS;
    e.respondWith((async () => {
      const c = await caches.open(name);
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        /* opaque cross-origin answers are cacheable and still render,
           we just cannot read their status — keep them anyway */
        if (res && (res.ok || res.type === 'opaque')){
          c.put(req, res.clone());
          trim(name, tile ? TILE_CAP : PHOTO_CAP);
        }
        return res;
      } catch(err){
        /* a missing tile should be a blank square, not a broken page */
        if (tile) return new Response(
          '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">'
          + '<rect width="256" height="256" fill="#e8e4da"/></svg>',
          { headers: { 'Content-Type': 'image/svg+xml' } });
        return new Response('', { status: 504 });
      }
    })());
  }
});

/* ===========================================================
   SAVING A TRIP FOR OFFLINE

   The page sends a list of URLs — the tiles covering the trip's
   route at the zoom levels that matter, and the photographs of its
   stops — and this fetches them while there is still signal,
   reporting progress back so the interface can show it.
   =========================================================== */
self.addEventListener('message', e => {
  const msg = e.data || {};

  /* the Reload button on the "newer version ready" bar */
  if (msg.type === 'skip'){ self.skipWaiting(); return; }

  if (msg.type === 'save'){
    const port = e.ports && e.ports[0];
    (async () => {
      const urls = msg.urls || [];
      let done = 0, failed = 0;
      /* six at a time: enough to be quick, few enough that a tile
         server does not start refusing us for hammering it */
      const queue = urls.slice();
      const worker = async () => {
        while (queue.length){
          const u = queue.shift();
          const name = isTile(new URL(u, self.location.href)) ? TILES : PHOTOS;
          const c = await caches.open(name);
          try {
            if (await c.match(u)){ done++; }
            else {
              const res = await fetch(u, { mode: 'no-cors' });
              if (res && (res.ok || res.type === 'opaque')){ await c.put(u, res); done++; }
              else failed++;
            }
          } catch(err){ failed++; }
          if (port && (done + failed) % 10 === 0)
            port.postMessage({ type: 'progress', done: done, failed: failed, total: urls.length });
        }
      };
      await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
      await trim(TILES, TILE_CAP);
      await trim(PHOTOS, PHOTO_CAP);
      if (port) port.postMessage({ type: 'done', done: done, failed: failed, total: urls.length });
    })();
  }

  if (msg.type === 'usage'){
    const port = e.ports && e.ports[0];
    (async () => {
      const out = {};
      for (const n of [SHELL, DATA, TILES, PHOTOS]){
        try { out[n] = (await (await caches.open(n)).keys()).length; } catch(err){ out[n] = 0; }
      }
      try {
        const est = await navigator.storage.estimate();
        out.bytes = est.usage || 0; out.quota = est.quota || 0;
      } catch(err){}
      if (port) port.postMessage({ type: 'usage', counts: out });
    })();
  }

  if (msg.type === 'clear'){
    const port = e.ports && e.ports[0];
    (async () => {
      await caches.delete(TILES);
      await caches.delete(PHOTOS);
      if (port) port.postMessage({ type: 'cleared' });
    })();
  }
});
