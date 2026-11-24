#!/usr/bin/env node
/* ===========================================================
   photos-italy.js — a photograph for every Italian place

   Resolves each place in italy.places.js to a Wikimedia Commons
   photograph, captures the photographer and the licence, and writes
   the result into assets/js/data/photos.js in exactly the same shape
   the US entries already use.

   WHY THIS EXISTS

   Without a baked entry a place falls back to looking itself up in
   the browser on every visit. That costs a round trip per card before
   anything is drawn, it depends on an API being reachable from the
   reader's network, and it throws away the photographer's name —
   which the licence requires us to keep.

   NEEDS NO KEY. Wikipedia and Commons are open APIs.

   ---- IF EVERYTHING FAILS, RUN THIS FIRST ----

     node tools/photos-italy.js --probe

   It makes one request to each endpoint, prints the actual HTTP
   status and the first part of the body, and tells you which route
   works from your machine. An earlier version of this script
   swallowed every error and reported "no photograph found" whether
   the article genuinely had no image or Wikimedia had refused the
   connection outright — which is useless when it fails for all 177.

   USAGE

     node tools/photos-italy.js --probe         diagnose, changes nothing
     node tools/photos-italy.js                 dry run over every place
     node tools/photos-italy.js --apply         resolve and write photos.js
     node tools/photos-italy.js --apply --download
                                                also download the JPEGs

   OPTIONS
     --probe          test connectivity and exit
     --apply          actually write (otherwise it is a dry run)
     --download       fetch the image files too, at --sizes
     --sizes=A,B      widths to fetch (default 1600,640)
     --api=auto       rest | action | auto (default auto, tries both)
     --only=ID        just one place
     --limit=N        stop after N places
     --force          redo places that already have an entry
     --ua="..."       User-Agent. Wikimedia asks for a contact address
                      in it; put your email or site in here.
     --delay=MS       pause between places (default 250)
     --verbose        print the URL and status of every request

   SAFE TO RE-RUN. Places that already have an entry are skipped
   unless --force, so if it stops half way through just run it again.
   =========================================================== */

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets', 'js', 'data');
const PHOTO_DIR = path.join(ROOT, 'assets', 'photos');

/* ---------- arguments ---------- */
const argv = process.argv.slice(2);
const has = n => argv.includes('--' + n);
const arg = n => {
  const hit = argv.find(a => a.startsWith('--' + n + '='));
  return hit ? hit.slice(n.length + 3) : null;
};

const PROBE    = has('probe');
const APPLY    = has('apply');
const DOWNLOAD = has('download');
const FORCE    = has('force');
const VERBOSE  = has('verbose');
const ONLY     = arg('only');
const LIMIT    = +arg('limit') || 0;
const DELAY    = arg('delay') === null ? 250 : +arg('delay');
const SIZES    = (arg('sizes') || '1600,640').split(',').map(n => +n.trim()).filter(Boolean);
const API      = (arg('api') || 'auto').toLowerCase();

/* Wikimedia's User-Agent policy asks for something that identifies
   the tool and gives them a way to contact you. A generic string can
   be refused outright, and the refusal looks exactly like a missing
   article unless you are reading the status code — which is how 177
   famous places all came back empty. */
/* ASCII only, and checked. Node refuses to send a header value
   containing a non-ASCII character and throws before the request is
   ever made — an em dash in this string made all four probes fail
   with "Invalid character in header content", which looks exactly
   like a network fault and is not one. */
const UA_RAW = arg('ua')
  || 'MeridianAtlas/1.0 (personal travel atlas; +https://example.com; node)';
const UA = /^[\x20-\x7E]+$/.test(UA_RAW) ? UA_RAW : UA_RAW.replace(/[^\x20-\x7E]/g, '-');
/* mutable, so the probe can test a second identity against a 403 */
let UA_ACTIVE = UA;
if (UA !== UA_RAW){
  console.log('\n  NOTE: the User-Agent contained non-ASCII characters, which Node');
  console.log('        cannot send. Using this instead:\n        ' + UA);
}

/* ---------- http ----------
   Returns { status, json?, buf?, err?, ms } and never throws. The
   status is carried out so the caller can tell a 404 (no such
   article) from a 403 (refused) from a 429 (slow down). */
function get(url, opts){
  opts = opts || {};
  const started = Date.now();
  return new Promise(resolve => {
    let req;
    const done = v => resolve(Object.assign({ ms: Date.now() - started, url: url }, v));
    try {
      req = https.get(url, {
        headers: {
          'User-Agent': UA_ACTIVE,
          'Accept': opts.binary ? '*/*' : 'application/json',
          'Accept-Encoding': 'identity'
        },
        timeout: opts.timeout || 25000
      }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location){
          res.resume();
          const next = new URL(res.headers.location, url).href;
          if ((opts.hops || 0) > 4) return done({ status: res.statusCode, err: 'too many redirects' });
          return resolve(get(next, Object.assign({}, opts, { hops: (opts.hops || 0) + 1 })));
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          if (res.statusCode !== 200)
            return done({ status: res.statusCode, buf: buf, headers: res.headers });
          if (opts.binary) return done({ status: 200, buf: buf, headers: res.headers });
          try { done({ status: 200, json: JSON.parse(buf.toString('utf8')), buf: buf }); }
          catch(e){ done({ status: 200, err: 'bad JSON: ' + e.message, buf: buf }); }
        });
        res.on('error', e => done({ status: 0, err: e.message }));
      });
    } catch(e){ return done({ status: 0, err: e.message }); }
    req.on('timeout', () => { req.destroy(); done({ status: 0, err: 'timeout' }); });
    req.on('error', e => done({ status: 0, err: e.code ? e.code + ': ' + e.message : e.message }));
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- the atlas ---------- */
function loadItaly(){
  const g = {};
  const p = path.join(DATA, 'italy.places.js');
  if (!fs.existsSync(p)) throw new Error('assets/js/data/italy.places.js not found');
  new Function('g', fs.readFileSync(p, 'utf8') + '\n'
    + 'try{ g.IT_PLACES = IT_PLACES }catch(e){}\n'
    + 'try{ g.itPlaceGet = itPlaceGet }catch(e){}\n'
    + 'try{ g.IT_WIKI = IT_WIKI }catch(e){}\n'
    + 'try{ g.IT_REGIONS = IT_REGIONS }catch(e){}')(g);
  if (!g.IT_PLACES) throw new Error('italy.places.js did not yield IT_PLACES');
  g.IT_WIKI = g.IT_WIKI || {};
  g.IT_REGIONS = g.IT_REGIONS || {};
  return g;
}

function loadPhotos(){
  const p = path.join(DATA, 'photos.js');
  if (!fs.existsSync(p)) return {};
  const g = {};
  new Function('g', fs.readFileSync(p, 'utf8') + '\ntry{ g.PHOTOS = PHOTOS }catch(e){}')(g);
  return g.PHOTOS || {};
}

/* Writes photos.js back WITHOUT eating whatever follows the object.
   photoLocal() lives after the PHOTOS literal, and an earlier version
   of the sibling tools kept only the text before it — which silently
   deleted the one function that makes every baked photo resolve. */
function writePhotos(PHOTOS){
  const p = path.join(DATA, 'photos.js');
  const src = fs.readFileSync(p, 'utf8');
  const i = src.indexOf('const PHOTOS =');
  const head = i === -1 ? src : src.slice(0, i);
  const m = i === -1 ? null : /\};\s*\n/.exec(src.slice(i));
  const tail = m ? src.slice(i + m.index + m[0].length)
                 : 'function photoLocal(id){ return (typeof PHOTOS!=="undefined" && PHOTOS[id]) || null; }\n';
  fs.writeFileSync(p, head + 'const PHOTOS = ' + JSON.stringify(PHOTOS) + ';\n\n' + tail);
}

/* ---------- which article to ask for ----------
   Mirrors photoTitlesIT() in assets/js/core/photos.js exactly. */
function titlesFor(place, IT_WIKI, IT_REGIONS){
  const n = place.name;
  const out = [];
  if (IT_WIKI[place.id]) out.push(IT_WIKI[place.id]);
  out.push(n);
  if (IT_REGIONS[place.abbr]) out.push(n + ', ' + IT_REGIONS[place.abbr][0]);
  out.push(n + ', Italy', n + ' (Italy)');
  return out.filter((t, i) => t && out.indexOf(t) === i);
}

/* ---------- Wikimedia URL shapes ---------- */
function wmParse(url){
  if (!url) return null;
  /* Two shifts in what Wikimedia returns broke the old regex and made
     every place report "no image":
       1. Thumbnails now come from thumb.wikimedia.org, not only
          upload.wikimedia.org.
       2. Every URL carries a "?utm_source=...&utm_campaign=api" suffix.
     So: accept either host, and strip the query before matching. We
     only need proj/dir/file; the canonical upload.wikimedia.org URLs
     are rebuilt from those by thumbURL()/originalURL(). */
  const clean = String(url).split(/[?#]/)[0];
  let m = /^https?:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/([a-z]+)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^\/]+)\/[^\/]*$/.exec(clean);
  if (!m) m = /^https?:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/([a-z]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^\/]+)$/.exec(clean);
  if (!m) return null;
  return { proj: m[1], dir: m[2] + '/' + m[3], file: m[4] };
}
function thumbURL(f, w){
  return 'https://upload.wikimedia.org/wikipedia/' + f.proj + '/thumb/'
       + f.dir + '/' + f.file + '/' + w + 'px-' + f.file;
}
function originalURL(f){
  return 'https://upload.wikimedia.org/wikipedia/' + f.proj + '/' + f.dir + '/' + f.file;
}
function stripHTML(s){
  return String(s || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

/* ===========================================================
   TWO WAYS TO ASK

   The REST summary endpoint is tidier, but it is also the one most
   often rate-limited or refused. The old Action API answers the same
   question and is served by different infrastructure, so when one is
   blocked the other frequently is not. Both are tried unless --api
   pins a choice.
   =========================================================== */
const STATUS_TALLY = {};
function tally(k){ STATUS_TALLY[k] = (STATUS_TALLY[k] || 0) + 1; }

const restURL = t => 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(t);
const actionURL = t => 'https://en.wikipedia.org/w/api.php?action=query&format=json'
  + '&formatversion=2&redirects=1&prop=pageimages|pageprops&piprop=original|thumbnail'
  + '&pithumbsize=1600&titles=' + encodeURIComponent(t);

async function askRest(title){
  const r = await get(restURL(title));
  if (VERBOSE) console.log('      REST   ' + r.status + '  ' + title);
  if (r.status !== 200 || !r.json){ tally('rest ' + (r.err || r.status)); return { fail: r }; }
  const j = r.json;
  if (j.type === 'disambiguation') { tally('disambiguation'); return { skip: true, reason: 'disambiguation page' }; }
  const src = (j.originalimage && j.originalimage.source)
           || (j.thumbnail && j.thumbnail.source);
  if (!src){ tally('article has no image'); return { skip: true, reason: 'summary had no image field' }; }
  return { src: src, width: (j.originalimage && j.originalimage.width) || 0,
           page: (j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page) || '' };
}

async function askAction(title){
  const r = await get(actionURL(title));
  if (VERBOSE) console.log('      ACTION ' + r.status + '  ' + title);
  if (r.status !== 200 || !r.json){ tally('action ' + (r.err || r.status)); return { fail: r }; }
  const pages = r.json.query && r.json.query.pages;
  const page = pages && pages[0];
  if (!page || page.missing){ tally('no such article'); return { skip: true, reason: 'no such article' }; }
  if (page.pageprops && page.pageprops.disambiguation !== undefined){
    tally('disambiguation'); return { skip: true, reason: 'disambiguation page' };
  }
  const src = (page.original && page.original.source)
           || (page.thumbnail && page.thumbnail.source);
  if (!src){ tally('article has no image'); return { skip: true, reason: 'pageimages returned no image' }; }
  return { src: src, width: (page.original && page.original.width) || 0,
           page: 'https://en.wikipedia.org/wiki/' + encodeURIComponent(page.title || title) };
}

/* Resolve one place. Returns a hit, or { lastFail } carrying the real
   reason so the caller can print something true. */
async function resolve(place, IT_WIKI, IT_REGIONS, order){
  let lastFail = null, lastReason = null, sawImageURL = null;
  for (const title of titlesFor(place, IT_WIKI, IT_REGIONS)){
    for (const how of order){
      const r = how === 'rest' ? await askRest(title) : await askAction(title);
      if (r.fail){ lastFail = r.fail; continue; }
      if (r.skip){ lastReason = r.reason || 'no image'; continue; }
      const f = wmParse(r.src);
      if (!f){
        /* An image URL DID come back, but our parser rejected it. When
           a famous place reports "no image", this is usually the real
           reason — so keep the URL to show, rather than blaming the
           article. */
        tally('unparseable image url');
        lastReason = 'image URL not recognised';
        sawImageURL = sawImageURL || r.src;
        continue;
      }
      if (/\.(svg|pdf|ogv|webm|gif)$/i.test(f.file)){
        tally('vector or video, skipped'); lastReason = 'only a vector/video image'; continue;
      }
      return { title: title, file: f, width: r.width, page: r.page, via: how };
    }
  }
  return { lastFail: lastFail, lastReason: lastReason, sawImageURL: sawImageURL };
}

/* Photographer and licence, which the licence obliges us to carry. */
async function credit(f){
  const r = await get('https://commons.wikimedia.org/w/api.php?action=query&format=json'
    + '&formatversion=2&prop=imageinfo&iiprop=extmetadata&titles='
    + encodeURIComponent('File:' + decodeURIComponent(f.file)));
  const pages = r.json && r.json.query && r.json.query.pages;
  const page = pages && pages[0];
  const ex = page && page.imageinfo && page.imageinfo[0] && page.imageinfo[0].extmetadata;
  if (!ex) return { by: '', lic: '' };
  return {
    by:  stripHTML(ex.Artist && ex.Artist.value).slice(0, 90),
    lic: stripHTML((ex.LicenseShortName && ex.LicenseShortName.value)
                 || (ex.License && ex.License.value)).slice(0, 40)
  };
}

/* ===========================================================
   PROBE
   =========================================================== */
async function probe(){
  console.log('\nProbing Wikimedia from this machine\n');
  console.log('  node        ' + process.version);
  console.log('  User-Agent  ' + UA);

  /* Node's https module does NOT read HTTPS_PROXY, unlike curl. On a
     machine that needs a proxy, curl succeeds and node fails with a
     DNS or connection error, which is a confusing pair of results to
     be handed. Worth saying out loud. */
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy
             || process.env.HTTP_PROXY  || process.env.http_proxy;
  if (proxy){
    console.log('  proxy       ' + proxy);
    console.log('              NOTE: node ignores this variable. If curl can');
    console.log('              reach Wikipedia and this script cannot, the');
    console.log('              proxy is the reason.');
  }
  console.log('');
  const results = {};

  const show = async (label, url, binary) => {
    const r = await get(url, { binary: binary, timeout: 20000 });
    const ok = r.status === 200 && !r.err;
    console.log('  ' + label.padEnd(22)
      + (r.err ? 'ERROR ' + r.err : 'HTTP ' + r.status)
      + '   ' + (r.buf ? r.buf.length + ' bytes' : '') + '   ' + r.ms + 'ms');
    if (!ok && r.buf && r.buf.length){
      const txt = r.buf.toString('utf8').replace(/\s+/g, ' ').slice(0, 220);
      console.log('      body: ' + txt);
    }
    if (!ok && r.headers && r.headers['retry-after'])
      console.log('      retry-after: ' + r.headers['retry-after']);
    return (results[label] = ok);
  };

  /* Keep the Venice REST response so step 4 can test a REAL image URL
     derived from it, rather than a hardcoded path whose hash I might
     have guessed wrong — a wrong hash makes the thumbnail server
     answer 400, which looks like a block and is not one. */
  const venice = await get(restURL('Venice'));
  results['1 REST summary'] = venice.status === 200 && !venice.err;
  console.log('  1 REST summary        '
    + (venice.err ? 'ERROR ' + venice.err : 'HTTP ' + venice.status)
    + '   ' + (venice.buf ? venice.buf.length + ' bytes' : '') + '   ' + venice.ms + 'ms');

  /* ---- what did Venice actually send? ----
     The symptom is a 200 that yields no image. The only way to know
     why is to look at the bytes. This prints enough to tell a classic
     summary (type/thumbnail/originalimage) from a redirected or
     reshaped response. Paste this block back if photos won't resolve. */
  console.log('\n  --- Venice REST response, as received ---');
  console.log('      requested : ' + restURL('Venice'));
  if (venice.url && venice.url !== restURL('Venice'))
    console.log('      redirected: ' + venice.url);
  if (venice.json && typeof venice.json === 'object'){
    const keys = Object.keys(venice.json);
    console.log('      json keys : ' + keys.join(', '));
    console.log('      type      : ' + JSON.stringify(venice.json.type));
    console.log('      thumbnail : ' + JSON.stringify(venice.json.thumbnail || null));
    console.log('      original  : ' + JSON.stringify(
      venice.json.originalimage ? { source: venice.json.originalimage.source } : null));
  } else {
    console.log('      (did not parse as JSON)');
  }
  if (venice.buf){
    const raw = venice.buf.toString('utf8').replace(/\s+/g, ' ').slice(0, 700);
    console.log('      first 700 chars of body:');
    console.log('      ' + raw);
  }
  console.log('');
  await sleep(400);

  const vaction = await get(actionURL('Venice'));
  results['2 Action API'] = vaction.status === 200 && !vaction.err;
  console.log('  2 Action API          '
    + (vaction.err ? 'ERROR ' + vaction.err : 'HTTP ' + vaction.status)
    + '   ' + (vaction.buf ? vaction.buf.length + ' bytes' : '') + '   ' + vaction.ms + 'ms');
  console.log('\n  --- Venice Action pageimages, as received ---');
  const vpage = vaction.json && vaction.json.query && vaction.json.query.pages
             && vaction.json.query.pages[0];
  if (vpage){
    console.log('      page keys : ' + Object.keys(vpage).join(', '));
    console.log('      original  : ' + JSON.stringify(
      vpage.original ? { source: vpage.original.source } : null));
    console.log('      thumbnail : ' + JSON.stringify(
      vpage.thumbnail ? { source: vpage.thumbnail.source } : null));
  } else if (vaction.buf){
    console.log('      ' + vaction.buf.toString('utf8').replace(/\s+/g, ' ').slice(0, 500));
  }
  console.log('');
  await sleep(400);
  await show('3 Commons API',
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2'
    + '&prop=imageinfo&iiprop=extmetadata&titles=' + encodeURIComponent('File:Venice.jpg'));
  await sleep(400);

  /* Build the image test from Venice's own photo, parsed the same way
     the tool parses every real result. */
  let imgURL = null;
  if (venice.json){
    const src = (venice.json.originalimage && venice.json.originalimage.source)
             || (venice.json.thumbnail && venice.json.thumbnail.source);
    const f = wmParse(src);
    if (f) imgURL = thumbURL(f, 320);
  }
  if (imgURL){
    await show('4 Image download', imgURL, true);
  } else {
    console.log('  4 Image download      skipped (REST gave no image to test with)');
    results['4 Image download'] = results['1 REST summary'];  // can't tell; don't cry wolf
  }

  /* A 403 is usually about who is asking, not whether the article
     exists, so try a second identity before concluding anything. */
  if (!results['1 REST summary'] && !results['2 Action API']){
    const alt = 'Mozilla/5.0 (compatible; MeridianAtlas/1.0; +https://example.com)';
    const saved = UA_ACTIVE; UA_ACTIVE = alt;
    const r = await get(restURL('Venice'));
    UA_ACTIVE = saved;
    console.log('\n  retry with a different User-Agent');
    console.log('    ' + alt);
    console.log('    ' + (r.err ? 'ERROR ' + r.err : 'HTTP ' + r.status));
    if (r.status === 200){
      console.log('\n  That worked. Wikimedia was refusing the first identity.');
      console.log('  Run with:  --ua="' + alt + '"');
      results['1 REST summary'] = true;
    }
  }

  console.log('\n  ---- verdict ----');
  const rest = results['1 REST summary'], action = results['2 Action API'];
  const img  = results['4 Image download'];

  if (rest && action)      console.log('  Both APIs work. Run: node tools/photos-italy.js --apply');
  else if (action)         console.log('  REST is blocked, Action API works.\n'
                                     + '  Run: node tools/photos-italy.js --apply --api=action');
  else if (rest)           console.log('  Action API is blocked, REST works.\n'
                                     + '  Run: node tools/photos-italy.js --apply --api=rest');
  else {
    console.log('  Neither API answered. Nothing is wrong with the atlas —');
    console.log('  the requests are not reaching Wikimedia. Usual causes:');
    console.log('    - a corporate or ISP proxy intercepting TLS');
    console.log('    - a VPN or DNS filter');
    console.log('    - Wikimedia refusing the User-Agent: pass your own,');
    console.log('        --ua="Meridian/1.0 (you@example.com)"');
    console.log('    - a temporary rate limit: wait and retry');
    console.log('  Try the same URL in a browser on this machine to compare:');
    console.log('    ' + restURL('Venice'));
  }
  if (rest || action){
    if (img){
      console.log('  Image download works too, so --download can self-host the files.');
    } else {
      console.log('  NOTE: the APIs answer but the image CDN did not. --download');
      console.log('        would fall back to linking anyway (it never breaks an');
      console.log('        entry), so run without it, or try it and see.');
    }
  }
  console.log('');
}

/* ===========================================================
   MAIN
   =========================================================== */
(async () => {
  if (PROBE) return probe();

  const { IT_PLACES, itPlaceGet, IT_WIKI, IT_REGIONS } = loadItaly();
  const PHOTOS = loadPhotos();
  const order = API === 'rest' ? ['rest'] : API === 'action' ? ['action'] : ['rest', 'action'];

  let ids = Object.keys(IT_PLACES);
  if (ONLY) ids = ids.filter(id => id === ONLY);
  if (!FORCE) ids = ids.filter(id => !PHOTOS[id]);
  ids.sort((a, b) => (IT_PLACES[b][5] || 0) - (IT_PLACES[a][5] || 0));
  if (LIMIT) ids = ids.slice(0, LIMIT);

  console.log('\nMeridian — photographs for Italy\n');
  console.log('  places needing one   ' + ids.length + ' of ' + Object.keys(IT_PLACES).length);
  console.log('  mode                 ' + (APPLY ? 'APPLY' : 'dry run (nothing will be written)'));
  console.log('  endpoints            ' + order.join(' then '));
  console.log('  image files          ' + (DOWNLOAD ? 'download at ' + SIZES.join(', ') + 'px' : 'link to Wikimedia'));
  if (DOWNLOAD && APPLY && !fs.existsSync(PHOTO_DIR)) fs.mkdirSync(PHOTO_DIR, { recursive: true });
  console.log('');

  let found = 0, missed = 0, bytes = 0, consecutiveFail = 0, lastWhy = null;
  const misses = [];

  for (let n = 0; n < ids.length; n++){
    const id = ids[n];
    const place = itPlaceGet(id);
    const label = (n + 1 + '/' + ids.length).padStart(8) + '  ' + id.padEnd(34);

    const hit = await resolve(place, IT_WIKI, IT_REGIONS, order);
    if (!hit.file){
      missed++;
      /* Prefer the specific reason (why the real article was skipped)
         over the last transport failure, which is usually just a
         qualified fallback title ("Venice, Veneto") that never
         existed and tells you nothing. */
      const why = hit.lastReason
        || (hit.lastFail ? (hit.lastFail.err ? hit.lastFail.err : 'HTTP ' + hit.lastFail.status)
                         : 'no image found');
      misses.push(id + '  (' + place.name + ')  ' + why
        + (hit.sawImageURL ? '  [' + hit.sawImageURL + ']' : ''));
      console.log(label + why);
      if (hit.sawImageURL && missed <= 3) console.log('           url: ' + hit.sawImageURL);

      /* Bail out early rather than grinding through 177 identical
         failures. Stop whether the cause is a transport failure or a
         parse failure, as long as it is the SAME cause each time. */
      if (why === lastWhy) consecutiveFail++; else consecutiveFail = 1;
      lastWhy = why;
      if (consecutiveFail === 6){
        console.log('\n  Six in a row failed the same way. Stopping rather than');
        console.log('  repeating it 170 more times.\n');
        if (/not recognised|image URL/.test(why)){
          console.log('  The image URLs are arriving but this tool is not parsing');
          console.log('  them. Run --probe and send the "Venice REST response"');
          console.log('  block — the fix is a one-line regex change.\n');
        } else {
          console.log('  Run this to find out why:\n');
          console.log('      node tools/photos-italy.js --probe\n');
        }
        process.exit(1);
      }
      await sleep(DELAY);
      continue;
    }
    consecutiveFail = 0;

    const c = await credit(hit.file);
    const entry = {
      t: thumbURL(hit.file, 640),
      s: thumbURL(hit.file, 1600),
      f: originalURL(hit.file),
      by: c.by || 'Wikimedia contributor',
      lic: c.lic || 'See Commons',
      /* hit.file is the PARSED object {proj, dir, file}; the link
         wants the filename out of it. Concatenating the object gave
         every Italian photo a credit link to "File:[object Object]". */
      u: 'https://commons.wikimedia.org/wiki/File:' + hit.file.file,
      src: 'wikimedia'
    };

    if (DOWNLOAD){
      const local = {};
      for (const w of SIZES){
        const want = (hit.width && hit.width < w) ? hit.width : w;
        const img = await get(thumbURL(hit.file, want), { binary: true });
        if (img.status === 200 && img.buf && img.buf.length > 2000){
          const rel = 'assets/photos/' + id + '-' + w + '.jpg';
          if (APPLY) fs.writeFileSync(path.join(ROOT, rel), img.buf);
          local[w] = rel; bytes += img.buf.length;
        }
        await sleep(120);
      }
      if (local[SIZES[0]]){
        entry.s = local[SIZES[0]];
        entry.t = local[SIZES[1]] || local[SIZES[0]];
        entry.src = 'local';
      }
    }

    PHOTOS[id] = entry;
    found++;
    console.log(label + (entry.src === 'local' ? 'downloaded  ' : 'linked      ')
      + hit.title.slice(0, 28).padEnd(30) + (c.lic || '?'));
    await sleep(DELAY);
  }

  console.log('\n  found    ' + found);
  console.log('  missed   ' + missed);
  if (DOWNLOAD) console.log('  bytes    ' + (bytes / 1048576).toFixed(1) + ' MB');

  const reasons = Object.keys(STATUS_TALLY);
  if (reasons.length){
    console.log('\n  why requests ended:');
    reasons.sort((a, b) => STATUS_TALLY[b] - STATUS_TALLY[a])
      .forEach(k => console.log('     ' + String(STATUS_TALLY[k]).padStart(5) + '  ' + k));
  }

  if (misses.length){
    console.log('\n  No photograph for these:\n');
    misses.slice(0, 40).forEach(m => console.log('     ' + m));
    if (misses.length > 40) console.log('     ... and ' + (misses.length - 40) + ' more');
    console.log('\n  If the reason is "no such article", add a title to IT_WIKI');
    console.log('  in assets/js/data/italy.places.js and re-run with --force.');
  }

  if (!APPLY){
    console.log('\n  Dry run. Nothing was written. Add --apply to do it.\n');
    return;
  }
  if (!found){
    console.log('\n  Nothing found, so photos.js was left alone.\n');
    return;
  }

  writePhotos(PHOTOS);
  console.log('\n  photos.js written — ' + Object.keys(PHOTOS).length + ' entries total.');
  console.log('  Now bump ?v= in index.html AND VERSION in sw.js, then redeploy.');
  if (DOWNLOAD) console.log('  Remember to: git add assets/photos/\n');
  else console.log('');
})();
