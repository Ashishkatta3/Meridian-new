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
function photoTitles(place){
  const st = STATE_FULL[place.abbr] || place.abbr;
  const n  = place.name;
  if (place.kind === 'city') return [n + ', ' + st, n];
  return [n, n + ' (' + st + ')', n + ', ' + st];
}

function photoCached(id){
  if (PHOTO_MEM[id] !== undefined) return PHOTO_MEM[id];
  try {
    const raw = sessionStorage.getItem('meridian.photo.' + id);
    if (raw) return (PHOTO_MEM[id] = JSON.parse(raw));
  } catch(e){}
  return undefined;
}
function photoStore(id, val){
  PHOTO_MEM[id] = val;
  try { sessionStorage.setItem('meridian.photo.' + id, JSON.stringify(val)); } catch(e){}
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
  const m = /^https?:\/\/upload\.wikimedia\.org\/wikipedia\/([a-z]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^\/?#]+)$/.exec(url || '');
  if (!m) return null;
  return { proj: m[1], dir: m[2] + '/' + m[3], file: m[4],
           wiki: m[1] === 'commons' ? 'commons.wikimedia.org' : m[1] + '.wikipedia.org' };
}

/* Every address the same picture can be reached at, cheapest first. */
function photoVariants(url, w){
  const out = [];
  const f = wmParse(url);
  if (f && w && !/\.svg$/i.test(f.file)){
    /* Wikimedia's own resized copy, straight from its CDN */
    out.push(['thumb', 'https://upload.wikimedia.org/wikipedia/' + f.proj + '/thumb/'
      + f.dir + '/' + f.file + '/' + w + 'px-' + f.file]);
    /* the same copy, addressed the way MediaWiki itself does it */
    out.push(['filepath', 'https://' + f.wiki + '/wiki/Special:FilePath/' + f.file + '?width=' + w]);
  }
  if (w && /^https?:\/\//.test(url) && !/wsrv\.nl/.test(url)) out.push(['cdn', cdnImg(url, w)]);
  out.push(['orig', url]);
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

  let list = photoVariants(url, w);
  if (PHOTO_ROUTE){
    const good = list.filter(v => v[0] === PHOTO_ROUTE);
    if (good.length) list = good.concat(list.filter(v => v[0] !== PHOTO_ROUTE));
  }

  const img = new Image();
  img.decoding = 'async';
  let i = 0;
  img.onload = () => { photoRoute(list[i][0]); ok(img); };
  img.onerror = () => {
    if (++i < list.length){ img.src = list[i][1]; return; }
    if (fail) fail();
  };
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
  placePhoto(place).then(p => {
    if (!p || !p.src) return;
    /* No credit chip over the picture: it covered the thing the
       picture is of. Attribution lives in the page footer, and the
       photographer is on the image itself as a tooltip. */
    loadImage(p.thumb || p.src, 400, img => {
      img.alt = place.name;
      img.title = [p.by, p.lic].filter(Boolean).join(' · ');
      el.innerHTML = '';
      el.appendChild(img);
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
