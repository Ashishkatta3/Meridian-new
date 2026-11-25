/* ===========================================================
   PHOTOS

   One picture per place, fetched by the browser from Wikipedia when
   the place is actually shown.

   Why this way rather than storing images:

     - It is free and needs no API key, so nothing secret ships in the
       page and nothing can be scraped out of it.
     - Wikipedia's REST API sends CORS headers, so a plain fetch from
       the page works. Most image APIs do not allow that.
     - The licence is clean. Google's terms forbid storing their place
       photos at all; Wikipedia's are reusable with attribution, which
       is why every caption links back to the article.
     - Nothing is downloaded at build time, so the atlas can grow
       without anyone hand-collecting a thousand images.

   The cost is that some places have no article photo. That is handled
   by falling back to a drawn placeholder rather than a broken image.

   The summary also carries a one-line description, which is used for
   places whose blurb has not been written yet.
   =========================================================== */

const PHOTO_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const PHOTO_MEM = {};                 // id -> result, for this page view

const STATE_FULL = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',
  CT:'Connecticut',DE:'Delaware',DC:'Washington, D.C.',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',
  LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',
  MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',
  NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',
  OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',
  SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
  VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};

/* Which article titles to try, and in what order.

   A city usually needs its state to be unambiguous ("Portland, Oregon"),
   while a park almost never does — "Yosemite National Park, California"
   is not an article. So the order flips depending on what the place is. */
/* Names that belong to more than one place in the atlas.

   Eight of them do: two Portlands, two Charlestons, two Kansas
   Citys, and a Garden of the Gods in both Colorado and Illinois.
   For those the bare name is whichever one Wikipedia considers
   primary, which is exactly how the Illinois page ended up showing
   Colorado's red rocks.

   Worked out once from the atlas rather than hardcoded, so adding a
   second Springfield later fixes itself. */
let SHARED_NAMES = null;
function nameIsShared(name){
  if (!SHARED_NAMES){
    SHARED_NAMES = {};
    const seen = {};
    try {
      Object.keys(PLACES).forEach(id => {
        const n = (PLACES[id][0] || '').toLowerCase();
        if (seen[n]) SHARED_NAMES[n] = 1; else seen[n] = 1;
      });
    } catch(e){}
  }
  return !!SHARED_NAMES[(name || '').toLowerCase()];
}

/* Italy disambiguates the other way round.

   A US city almost always needs its state — bare "Portland" is a
   disambiguation page — so the US branch asks for "Portland, Oregon"
   first. Italian places are usually the primary topic for their own
   name: "Positano", "Matera" and "Alberobello" all go straight to the
   right article, and "Positano, Campania" is not an article at all.

   So Italy tries the bare name first, and the genuine exceptions —
   the ones filed under an English name like "Phlegraean Fields" or a
   qualified one like "Ragusa, Sicily" — are listed in IT_WIKI rather
   than guessed at. Guessing is what put Colorado's red rocks on the
   Illinois page. */
function photoTitlesIT(place){
  const n = place.name;
  const out = [];
  /* An override goes FIRST, not INSTEAD. Wikipedia titles are
     case-sensitive past the first letter, so one wrong capital in the
     list would otherwise mean that place silently never gets a
     photograph, with no second chance. */
  try {
    if (typeof IT_WIKI !== 'undefined' && IT_WIKI[place.id]) out.push(IT_WIKI[place.id]);
  } catch(e){}
  out.push(n);
  try {
    if (typeof IT_REGIONS !== 'undefined' && IT_REGIONS[place.abbr])
      out.push(n + ', ' + IT_REGIONS[place.abbr][0]);
  } catch(e){}
  out.push(n + ', Italy', n + ' (Italy)');
  /* An override often equals one of the generated candidates, and
     asking Wikipedia the same question twice just doubles the wait
     before the real fallback is reached. */
  return out.filter((t, i) => t && out.indexOf(t) === i);
}

/* Costa Rica, where the name collisions are worse than Italy's.

   Three things differ from the Italian resolver. The display name is
   not always a title: two beaches really are called Playa Hermosa, so
   the atlas disambiguates them for the reader — "Playa Hermosa (Jacó)"
   — and that parenthetical is ours, not Wikipedia's, so it comes off
   before the name is used as a lookup. Protected areas are filed
   under their full title far more often than Italian ones ("Carara
   National Park", not "Carara"). And a beach is usually filed with
   its Playa prefix even when everyone drops it in speech. */
function photoTitlesCR(place){
  const n = String(place.name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
  const out = [];
  /* An override goes FIRST, not INSTEAD — same reason as Italy: one
     wrong capital in the list would otherwise mean that place never
     gets a photograph at all, with no second chance. */
  try {
    if (typeof CR_WIKI !== 'undefined' && CR_WIKI[place.id]) out.push(CR_WIKI[place.id]);
  } catch(e){}
  out.push(n);
  if (place.kind === 'np'      && !/National Park$/.test(n)) out.push(n + ' National Park');
  if (place.kind === 'volcano' && !/Volcano/.test(n))
    out.push(n + ' Volcano', n + ' Volcano National Park');
  if (place.kind === 'refuge'  && !/Refuge$/.test(n))  out.push(n + ' Wildlife Refuge');
  if (place.kind === 'reserve' && !/Reserve$/.test(n)) out.push(n + ' Biological Reserve');
  if (place.kind === 'beach'   && !/^Playa /.test(n))  out.push('Playa ' + n);
  out.push(n + ', Costa Rica', n + ' (Costa Rica)');
  return out.filter((t, i) => t && out.indexOf(t) === i);
}

/* India, where the atlas name and the article title part company more
   often than anywhere else in this project.

   Three things this resolver does that the others do not. Several
   entries deliberately pair two places on one card — "Belur &
   Halebidu", "Mathura & Vrindavan" — which helps a reader and is not
   a title, so each half is offered separately. The better-known name
   is often the one in brackets, not the one outside it: a picture of
   "Alappuzha (Alleppey)" is far more likely to be filed under
   Alleppey, so both are tried. And protected areas are almost always
   filed under a full title, which is generated from the kind rather
   than listed one park at a time. */
function photoTitlesIN(place){
  const raw = String(place.name || '').trim();
  const out = [];
  try {
    if (typeof IN_WIKI !== 'undefined' && IN_WIKI[place.id]) out.push(IN_WIKI[place.id]);
  } catch(e){}

  /* "Alappuzha (Alleppey)" -> both halves, outer name first */
  const paren = /^(.+?)\s*\(([^)]+)\)\s*$/.exec(raw);
  const bare  = paren ? paren[1].trim() : raw;
  const alt   = paren ? paren[2].trim() : '';

  /* "Belur & Halebidu" -> each on its own; "the" dropped from
     "Kasol & the Parvati Valley" */
  const parts = bare.split(/\s*&\s*/).map(s => s.replace(/^the\s+/i, '').trim());
  parts.forEach(s => s && out.push(s));
  if (alt) out.push(alt);

  const n = parts[0] || bare;
  if (place.kind === 'np'        && !/National Park$/.test(n)) out.push(n + ' National Park');
  if (place.kind === 'sanctuary' && !/Sanctuary$/.test(n))     out.push(n + ' Wildlife Sanctuary');
  if (place.kind === 'temple'    && !/Temple$/.test(n))        out.push(n + ' Temple');
  if (place.kind === 'fort'      && !/Fort$/.test(n))          out.push(n + ' Fort');
  if (place.kind === 'monastery' && !/Monastery$/.test(n))     out.push(n + ' Monastery');
  if (place.kind === 'cave'      && !/Caves$/.test(n))         out.push(n + ' Caves');
  if (place.kind === 'falls'     && !/Falls$/.test(n))         out.push(n + ' Falls');
  if (place.kind === 'palace'    && !/Palace$/.test(n))        out.push(n + ' Palace');

  try {
    if (typeof IN_REGIONS !== 'undefined' && IN_REGIONS[place.abbr])
      out.push(n + ', ' + IN_REGIONS[place.abbr][0]);
  } catch(e){}
  out.push(n + ', India', n + ' (India)');
  return out.filter((t, i) => t && out.indexOf(t) === i);
}

function photoTitles(place){
  if (place && place.country === 'IT') return photoTitlesIT(place);
  if (place && place.country === 'CR') return photoTitlesCR(place);
  if (place && place.country === 'IN') return photoTitlesIN(place);
  const st = STATE_FULL[place.abbr] || place.abbr;
  const n  = place.name;
  /* Shared name: qualify first, bare name only as a last resort. */
  if (nameIsShared(n)) return [n + ' (' + st + ')', n + ', ' + st, n];
  if (place.kind === 'city') return [n + ', ' + st, n];
  return [n, n + ' (' + st + ')', n + ', ' + st];
}

/* Where a resolved photograph is remembered between visits.

   This was sessionStorage, which empties the moment the tab closes.
   Since none of the Italian places carry a baked-in picture, every
   fresh visit asked Wikipedia again for every place the reader opened
   — a round trip each, on what may be a phone with one bar in a hill
   town. Keeping it in localStorage is what makes the second visit
   instant, which is the whole point of pulling the pictures live
   rather than shipping them.

   A lead image does get replaced now and again, so the record is not
   kept for ever: a month is long enough to make return visits fast
   and short enough that a changed picture arrives on its own. */
const PHOTO_TTL = 30 * 86400 * 1000;
const PHOTO_KEY = 'meridian.photo.';

/* localStorage first, then sessionStorage. Either can be missing or
   throw outright — Safari in private mode, a browser with site data
   blocked — so each is tried and neither is assumed. */
function photoStores(){
  const out = [];
  try { if (window.localStorage)   out.push(window.localStorage); }   catch(e){}
  try { if (window.sessionStorage) out.push(window.sessionStorage); } catch(e){}
  return out;
}

function photoCached(id){
  if (PHOTO_MEM[id] !== undefined) return PHOTO_MEM[id];
  for (const store of photoStores()){
    let raw = null;
    try { raw = store.getItem(PHOTO_KEY + id); } catch(e){ continue; }
    if (!raw) continue;
    let rec;
    try { rec = JSON.parse(raw); } catch(e){ continue; }

    /* Records written before this cache had an expiry are bare values,
       not { v, t } — a reader upgrading mid-session still has a pocket
       full of them, so they are honoured rather than thrown away. */
    if (!rec || typeof rec !== 'object' || !('t' in rec)) return (PHOTO_MEM[id] = rec);

    if (Date.now() - rec.t > PHOTO_TTL){
      try { store.removeItem(PHOTO_KEY + id); } catch(e){}
      continue;
    }
    return (PHOTO_MEM[id] = rec.v);
  }
  return undefined;
}

/* Drop every expired record. Only called when a write has already
   failed for want of room, so the cost is paid once and only when it
   buys something. */
function photoPrune(store){
  const dead = [];
  try {
    for (let i = 0; i < store.length; i++){
      const k = store.key(i);
      if (!k || k.indexOf(PHOTO_KEY) !== 0) continue;
      let rec; try { rec = JSON.parse(store.getItem(k)); } catch(e){ dead.push(k); continue; }
      if (rec && typeof rec === 'object' && 't' in rec && Date.now() - rec.t > PHOTO_TTL) dead.push(k);
    }
    dead.forEach(k => store.removeItem(k));
  } catch(e){}
  return dead.length;
}

function photoStore(id, val){
  PHOTO_MEM[id] = val;
  const rec = JSON.stringify({ v: val, t: Date.now() });
  for (const store of photoStores()){
    try { store.setItem(PHOTO_KEY + id, rec); return; }
    catch(e){
      /* out of room: clear what has expired and try this store once
         more before falling back to the next one */
      if (photoPrune(store)){
        try { store.setItem(PHOTO_KEY + id, rec); return; } catch(e2){}
      }
    }
  }
}

/* Returns { src, page, extract } or null. Never throws and never
   rejects — a place without a picture is normal, not an error. */
async function placePhoto(place){
  if (!place) return null;

  /* Prefer the curated, licence-checked photo baked in at build time.
     It is instant, needs no network, and is guaranteed reusable. The
     live Wikipedia fetch below is only a fallback for places added
     after the last data merge. */
  const loc = (typeof photoLocal === 'function') && photoLocal(place.id);
  if (loc){
    const info = (typeof infoOf === 'function') && infoOf(place.id);
    return { src: loc.s, thumb: loc.t, page: loc.u, by: loc.by, lic: loc.lic,
             src_kind: loc.src, extract: (info && info.sum) || '' };
  }

  const hit = photoCached(place.id);
  if (hit !== undefined) return hit;

  for (const title of photoTitles(place)){
    try {
      const r = await fetch(PHOTO_API + encodeURIComponent(title), {
        headers: { 'Accept': 'application/json' }
      });
      if (!r.ok) continue;
      const j = await r.json();
      if (j.type === 'disambiguation') continue;
      const src = (j.thumbnail && j.thumbnail.source)
               || (j.originalimage && j.originalimage.source);
      if (!src) continue;
      const out = {
        src: src.replace(/\/\d+px-/, '/800px-'),       // ask for a usable size
        page: (j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page) || '',
        extract: j.extract || ''
      };
      photoStore(place.id, out);
      return out;
    } catch(e){ /* offline, blocked, or no such article — try the next title */ }
  }
  photoStore(place.id, null);
  return null;
}

/* A drawn stand-in for places with no article photo: the place's own
   icon on a tinted field. Better than an empty grey box, and it never
   fails to load. */
/* ===========================================================
   SIZING

   photos.js stores full-size originals — often eight or ten
   megabytes each. Dropping those straight into a card the size of a
   postcard is what made the site crawl, so nothing ever loads an
   original if a smaller copy can be had.

   Wikimedia generates those smaller copies itself and serves them
   from its CDN, which is far faster than resizing an original
   somewhere else. There are two ways to address one, plus a resizing
   proxy as a safety net, so loadImage() walks the list until a
   picture arrives and remembers which kind of address worked. After
   the first picture of a session, every later one goes straight
   there.
   =========================================================== */
function cdnImg(url, w){
  if (!url) return '';
  if (!/^https?:\/\//.test(url)) return url;            /* a local file */
  if (/wsrv\.nl/.test(url)) return url;                 /* already resized */
  return 'https://wsrv.nl/?url=' + url.replace(/^https?:\/\//, '')
       + (w ? '&w=' + w : '') + '&output=jpg&q=82&n=-1';
}

/* Pull a Wikimedia original apart: which project, which two hash
   folders, which file. Every other address for the picture can be
   built from those three. */
function wmParse(url){
  if (!url) return null;

  /* Wikimedia changed two things that together broke every live photo
     lookup, and the fix has to track both:

       1. Thumbnails are now served from thumb.wikimedia.org, where for
          years they came from upload.wikimedia.org. Both hosts appear.
       2. The API appends a tracking query — "?utm_source=...&utm_campaign
          =api&utm_content=thumbnail" — to every source URL.

     The old regex pinned the host to upload.wikimedia.org and ended at
     the filename with $, so a thumb.wikimedia.org URL with a ?query on
     the end matched neither branch and parsed as null. That is what put
     "no image" on places that plainly have one. We strip the query
     first and accept either host; the three facts we pull out are the
     same, and every real address is rebuilt from them.

     A thumbnail  /wikipedia/commons/thumb/4/42/Name.jpg/320px-Name.jpg
     An original  /wikipedia/commons/4/42/Name.jpg                      */
  const clean = String(url).split(/[?#]/)[0];
  let m = /^https?:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/([a-z]+)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^\/]+)\/[^\/]*$/.exec(clean);
  if (!m) m = /^https?:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/([a-z]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^\/]+)$/.exec(clean);

  if (!m) return null;
  return { proj: m[1], dir: m[2] + '/' + m[3], file: m[4],
           wiki: m[1] === 'commons' ? 'commons.wikimedia.org' : m[1] + '.wikipedia.org' };
}

/* Every address the same picture can be reached at, cheapest first. */
/* Photographs the site hosts itself, written by tools/photos-hq.js as
   assets/photos/<id>-<width>.jpg. Two widths exist — a hero and a
   card — so asking for one size and being handed the other is the
   difference between a 40KB thumbnail and a 400KB hero on a phone. */
const LOCAL_SIZES = [640, 1600];
function localParse(url){
  const m = /^(assets\/photos\/.+)-(\d+)\.jpg$/.exec(url || '');
  return m ? { base: m[1], size: +m[2] } : null;
}

/* Not every original is something a browser can draw. Two of the US
   photographs are TIFFs, straight off a Library of Congress scan, and
   no browser decodes TIFF. Wikimedia does not serve one either — it
   serves a JPEG rendering, and names it by appending .jpg to the whole
   original filename, so the thumbnail of Savannah.tif is
   "800px-Savannah.tif.jpg" and "800px-Savannah.tif" is a 404. An SVG
   is the opposite case: browsers render it natively and it scales for
   free, so it is better left alone than thumbnailed. */
const THUMB_SUFFIX = { tif: '.jpg', tiff: '.jpg', pdf: '.jpg', djvu: '.jpg' };
function photoExt(file){ return (String(file).split('.').pop() || '').toLowerCase(); }
function photoDrawable(file){
  return !THUMB_SUFFIX[photoExt(file)];       /* svg is drawable; tif is not */
}
function thumbLeaf(file, w){
  return w + 'px-' + file + (THUMB_SUFFIX[photoExt(file)] || '');
}

function photoVariants(url, w){
  const out = [];

  /* our own copy: pick the smallest width that still covers the box */
  const L = localParse(url);
  if (L){
    const want = w || L.size;
    const best = LOCAL_SIZES.find(s => s >= want) || LOCAL_SIZES[LOCAL_SIZES.length - 1];
    out.push(['local', L.base + '-' + best + '.jpg']);
    /* and if that one was never downloaded, the stored one certainly was */
    if (best !== L.size) out.push(['local', url]);
    return out;
  }

  const f = wmParse(url);

  /* Order matters more than it looks, and getting it wrong is what
     blanked the Italian pages twice.

     The address Wikimedia itself just handed back is the one address
     we KNOW resolves — it came from the API seconds ago. So it goes
     first, with nothing changed but the width, and the host left
     exactly as served. Rebuilding the path from the hash folders is a
     guess about which CDN hostname serves thumbnails this month;
     thumbnails moved from upload.wikimedia.org to thumb.wikimedia.org
     once already, and a rebuilt address on the wrong host answers 400.
     That guess therefore belongs below the known-good one, not above
     it. */
  /* An already-sized address is safe to offer straight; an original in
     a format the browser cannot draw is not, so it is left out rather
     than spent as a request that can only fail. */
  const sized = w && /\/\d+px-/.test(url);
  const drawable = !f || photoDrawable(f.file);
  if (/^https?:\/\//.test(url) && !/wsrv\.nl/.test(url) && (sized || drawable)){
    out.push(['api', sized ? url.replace(/\/\d+px-/, '/' + w + 'px-') : url]);
  }

  if (f && !/\.svg$/i.test(f.file)){
    /* MediaWiki's own canonical address. It is a redirect to wherever
       the file actually lives, so unlike a rebuilt CDN path it keeps
       working across a host move — and for a TIFF it is what hands
       back a JPEG rendering. */
    out.push(['filepath', 'https://' + f.wiki + '/wiki/Special:FilePath/'
      + f.file + (w ? '?width=' + w : '')]);
    /* the rebuilt CDN path, as an alternate rather than the primary */
    if (w) out.push(['thumb', 'https://upload.wikimedia.org/wikipedia/' + f.proj
      + '/thumb/' + f.dir + '/' + f.file + '/' + thumbLeaf(f.file, w)]);
  }

  /* The address exactly as served, unresized. It may be smaller than
     the box wants, but it is real and it is Wikimedia's own, so a
     slightly soft picture beats what comes next. Skipped when the
     browser cannot draw that format at all. */
  if (drawable && !out.some(v => v[1] === url)) out.push(['orig', url]);

  /* Last, and only last: a free third-party resizer. Under load it
     hangs instead of failing, so onerror never fires and the picture
     is never drawn. Nothing above it may depend on it. */
  if (w && /^https?:\/\//.test(url) && !/wsrv\.nl/.test(url)) out.push(['cdn', cdnImg(url, w)]);

  return out;
}

/* Which shape of address worked last time, so the rest of the
   session does not repeat a miss. */
let PHOTO_ROUTE = '';
try { PHOTO_ROUTE = sessionStorage.getItem('meridian.route') || ''; } catch(e){}
function photoRoute(kind){
  if (kind === PHOTO_ROUTE) return;
  PHOTO_ROUTE = kind;
  try { sessionStorage.setItem('meridian.route', kind); } catch(e){}
}

/* Load `url` at about `w` pixels wide into an Image, calling ok(img)
   when it arrives and fail() when no address for it will come. */
function loadImage(url, w, ok, fail){
  if (!url){ if (fail) fail(); return; }

  /* A 400-pixel picture on a 2x screen is a 400-pixel picture
     stretched to 800 — which is exactly what "the photos look worse
     than they did" means. Ask for what the screen actually has. */
  if (w){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.min(2000, Math.round(w * dpr));
  }

  let list = photoVariants(url, w);
  if (PHOTO_ROUTE){
    const good = list.filter(v => v[0] === PHOTO_ROUTE);
    if (good.length) list = good.concat(list.filter(v => v[0] !== PHOTO_ROUTE));
  }

  /* A source that FAILS is fine: onerror fires and the next address
     is tried. A source that HANGS is the dangerous one — no event
     ever arrives, and the picture is simply never drawn. A free image
     proxy under load does exactly that, so every attempt is given a
     deadline and the ladder moves on when it expires. */
  const img = new Image();
  img.decoding = 'async';
  let i = 0, done = false, timer = null;

  const stop = () => { clearTimeout(timer); timer = null; };
  const next = () => {
    if (done) return;
    stop();
    if (++i < list.length){ arm(); img.src = list[i][1]; return; }
    done = true;
    if (fail) fail();
  };
  const arm = () => { stop(); timer = setTimeout(next, 7000); };

  img.onload = () => {
    if (done) return;
    done = true; stop();
    photoRoute(list[i][0]);
    ok(img);
  };
  img.onerror = next;

  arm();
  img.src = list[0][1];
  return img;
}

function photoFallback(place, cls){
  return '<span class="ph-fall ' + (cls || '') + '" data-kind="' + (place.kind || '') + '">'
       + '<svg viewBox="-12 -12 24 24" aria-hidden="true">' + placeIcon(place.kind, 22) + '</svg>'
       + '</span>';
}

/* Fills an element with the photo once it arrives. Call it when the
   element is on screen, not before — this is one network request per
   place and there is no reason to make them for places nobody looks at. */
function paintPhoto(el, place){
  if (!el || el.dataset.photoDone) return;
  el.dataset.photoDone = '1';
  el.innerHTML = photoFallback(place);

  /* Ask for the size this box actually is, rather than a fixed 480.

     A hardcoded width fetched a 480px image for a full-width hero
     (soft) and the same 480px image for a 150px thumbnail — four
     times the bytes needed, times forty cards on a place page. That
     is most of why these were slow to appear. loadImage multiplies
     by the device pixel ratio, so a retina phone still gets a sharp
     one. */
  const box = el.getBoundingClientRect();
  const want = Math.max(160, Math.min(1600, Math.round(box.width || 480)));

  placePhoto(place).then(p => {
    if (!p || !p.src) return;
    /* No credit chip over the picture: it covered the thing the
       picture is of. Attribution lives in the page footer, and the
       photographer is on the image itself as a tooltip. */
    loadImage(p.thumb || p.src, want, img => {
      img.alt = place.name;
      img.title = [p.by, p.lic].filter(Boolean).join(' · ');
      /* Belt and braces. The container is meant to size this in CSS,
         but any container that forgot to left the image at its
         natural size — which is what overflowed the cards and put
         the captions on top of the pictures. ph-img carries the
         sizing with the image itself, so it cannot happen again. */
      img.className = 'ph-img';
      img.loading = 'lazy';
      img.decoding = 'async';
      el.innerHTML = '';
      el.appendChild(img);
      el.classList.add('has-photo');
    });
  });
}

/* Only ask for pictures the viewer can actually see. */
function watchPhotos(root){
  const nodes = (root || document).querySelectorAll('[data-photo]');
  if (!nodes.length) return;
  if (!('IntersectionObserver' in window)){
    nodes.forEach(el => paintPhoto(el, placeGet(el.dataset.photo)));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      paintPhoto(e.target, placeGet(e.target.dataset.photo));
      obs.unobserve(e.target);
    });
  }, { rootMargin: '200px' });
  nodes.forEach(el => io.observe(el));
}
