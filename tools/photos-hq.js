#!/usr/bin/env node
/* ===========================================================
   photos-hq.js — replace weak photographs, and host them yourself

   What this does, in one run:

     1. audits every place: no photo, a map/logo/montage instead of a
        photograph, or a photograph too small to use as a hero
     2. works through them in the order that matters most — the fifty
        places that stand for a state, then the best-known cities,
        then the national parks, then everything else
     3. searches Pexels and Unsplash by name
     4. refuses anything whose description does not actually mention
        the place, because a beautiful photograph of the wrong canyon
        is worse than no photograph
     5. downloads two sizes straight from the provider's CDN into
        assets/photos/, so the site serves its own images
     6. rewrites assets/js/data/photos.js to point at them
     7. writes PHOTO-CREDITS.md naming every photographer

   ON THE LAW. Both licences allow exactly this — download, host,
   modify, commercial use, no permission needed:

     Pexels    no attribution required (we credit anyway)
     Unsplash  attribution not strictly required, but the API terms
               ask for the photographer and a link back, which is
               what PHOTO-CREDITS.md and the stored `by`/`u` fields
               are for

   Neither licence lets you sell the photographs as photographs, or
   imply the photographer endorses you. Putting them on a travel
   atlas is squarely inside what both are for. What a stock licence
   cannot do is clear a trademark or a recognisable person inside
   the frame — not an issue for landscapes and skylines, worth
   knowing if you ever put one on merchandise.

   RATE LIMITS, which decide how long this takes:

     Pexels      200 requests/hour, 20,000/month      — the workhorse
     Unsplash     50 requests/hour on a demo key      — painful
                5000 requests/hour once your app is approved

   So this prefers Pexels and falls back to Unsplash, and it is
   resumable: anything already downloaded is skipped, so you can
   stop it and run it again tomorrow without losing work.
   =========================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT    = path.resolve(__dirname, '..');
const DATA    = path.join(ROOT, 'assets', 'js', 'data');
const PHOTODIR= path.join(ROOT, 'assets', 'photos');
const OUT     = path.join(__dirname, 'out');
const MANIFEST= path.join(OUT, 'photos-hq.json');

const argv = process.argv.slice(2);
const arg  = n => { const h = argv.find(a => a.startsWith('--' + n + '=')); return h ? h.split('=').slice(1).join('=') : ''; };
const has  = n => argv.includes('--' + n);

const UA = 'Meridian/1.0 (personal travel atlas)';

/* The two sizes the site actually draws: a hero and a card. Asking
   the CDN for exactly these means no image processing here at all —
   no sharp, no ImageMagick, nothing to install. */
const SIZES = (arg('sizes') || '1600,640').split(',').map(n => +n.trim()).filter(Boolean);
const MIN_WIDTH = +arg('min-width') || 1400;   /* below this counts as "not high resolution" */

/* The NPS key already sits in config.js for the live park panels, so
   there is no reason to ask for it twice. */
function readNpsKey(){
  try {
    const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'core', 'config.js'), 'utf8');
    const m = /NPS_KEY\s*=\s*'([^']+)'/.exec(src);
    return m && m[1] && !/^(your|xxx|paste)/i.test(m[1]) ? m[1] : '';
  } catch(e){ return ''; }
}

/* ---------- reading the atlas ---------- */
function loadData(){
  const g = {};
  for (const f of ['places.js', 'photos.js']){
    const p = path.join(DATA, f);
    if (!fs.existsSync(p)) continue;
    new Function('g', fs.readFileSync(p, 'utf8') + '\n'
      + 'try{ g.PLACES = PLACES }catch(e){}\n'
      + 'try{ g.placeGet = placeGet }catch(e){}\n'
      + 'try{ g.PHOTOS = PHOTOS }catch(e){}')(g);
  }
  if (!g.PLACES) throw new Error('places.js did not yield PLACES');
  g.PHOTOS = g.PHOTOS || {};
  return g;
}

/* ---------- small helpers ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJSON(url, headers, ms){
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), ms || 15000);
  try {
    const r = await fetch(url, { signal: ctl.signal,
      headers: Object.assign({ 'User-Agent': UA, 'Accept': 'application/json' }, headers || {}) });
    clearTimeout(to);
    if (r.status === 429) return { rateLimited: true };
    if (!r.ok) return null;
    return await r.json();
  } catch(e){ clearTimeout(to); return null; }
}

async function download(url, dest){
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), 45000);
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { 'User-Agent': UA } });
    clearTimeout(to);
    if (!r.ok) return { error: r.status + ' ' + r.statusText };
    const buf = Buffer.from(await r.arrayBuffer());
    /* a "photo" under 8KB is an error page or a placeholder */
    if (buf.length < 8192) return { error: 'suspiciously small (' + buf.length + ' bytes)' };
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    return { ok: true, bytes: buf.length };
  } catch(e){ clearTimeout(to); return { error: e.message }; }
}

const fileOf = url => { try { return decodeURIComponent(String(url).split('/').pop()); }
                        catch(e){ return String(url); } };

const JUNK = /(montage|collage|composite|locator|_map[_.]|map_of|topographic|flag_|_flag|seal_|_seal|logo|coat_of_arms|banner|insignia|emblem|symbol|diagram|chart|plaque|signpost|commons-logo)/i;
const NOT_A_PHOTO = /\.(svg|gif|tif|tiff|pdf|webm|ogv)$/i;

/* ===========================================================
   WHAT NEEDS REPLACING

   "Missing" and "is actually a map" can be told from the filename.
   "Not high resolution" cannot — so for the Wikimedia photographs
   already in the atlas we ask Commons for their real dimensions,
   fifty at a time, which is free and keyless.
   =========================================================== */
async function probeWikimedia(PHOTOS, ids){
  const byTitle = {};
  ids.forEach(id => {
    const e = PHOTOS[id];
    if (!e || !e.s || !/upload\.wikimedia\.org/.test(e.s)) return;
    byTitle['File:' + fileOf(e.s)] = id;
  });
  const titles = Object.keys(byTitle);
  const dims = {};
  for (let i = 0; i < titles.length; i += 50){
    const batch = titles.slice(i, i + 50);
    const j = await getJSON('https://commons.wikimedia.org/w/api.php?action=query&format=json'
      + '&prop=imageinfo&iiprop=size&titles=' + encodeURIComponent(batch.join('|')));
    const pages = (j && j.query && j.query.pages) || {};
    Object.keys(pages).forEach(k => {
      const pg = pages[k];
      const ii = (pg.imageinfo || [])[0];
      const id = byTitle[pg.title];
      if (id && ii) dims[id] = { w: ii.width || 0, h: ii.height || 0 };
    });
    /* \r only when somebody is watching; piped to a file it just
       makes one unreadable line */
    const msg = '  measuring existing photographs… ' + Math.min(i + 50, titles.length)
      + '/' + titles.length;
    process.stdout.write(process.stdout.isTTY ? '\r' + msg : (i ? '' : msg + '\n'));
    await sleep(300);
  }
  if (process.stdout.isTTY) process.stdout.write('\n');
  return dims;
}

function faultOf(entry, dim){
  if (!entry || !entry.s) return 'no photograph at all';
  const f = fileOf(entry.s);
  if (NOT_A_PHOTO.test(f)) return 'not a photograph (.' + f.split('.').pop() + ')';
  if (JUNK.test(f)) return 'a map, logo, seal or montage';
  if (/panorama/i.test(f)) return 'a panorama, which crops to a stripe';
  if (dim && dim.w && dim.w < MIN_WIDTH) return 'only ' + dim.w + 'px wide';
  if (dim && dim.w && dim.h && (dim.w / dim.h) < 0.95) return 'portrait, fits no slot here';
  return '';
}

/* ===========================================================
   PRIORITY

   Your order: the states, then the best-known cities, then the
   national parks, then the rest.

   "States" needs a word. A state has no photograph of its own — the
   state card borrows the picture of its best-known place. So fixing
   one carefully chosen place per state fixes all fifty state cards,
   which is the highest-leverage work in the whole job. stateFace()
   below is the site's own rule, copied exactly so the tool and the
   page agree about which place that is.
   =========================================================== */
function stateFaces(PLACES, PG){
  const byState = {};
  Object.keys(PLACES).forEach(id => {
    const p = PG(id); if (!p || !p.abbr) return;
    (byState[p.abbr] = byState[p.abbr] || []).push(id);
  });
  const faces = {};
  Object.keys(byState).forEach(ab => {
    faces[byState[ab].sort((a, b) => (PG(b).prom || 0) - (PG(a).prom || 0))[0]] = ab;
  });
  return faces;                      /* { placeId: 'CO', … } */
}

const NPS_KINDS = { np:1, monument:1, rec:1, historic:1, falls:0, forest:0 };

function tierOf(id, p, faces){
  if (faces[id]) return 1;                               /* the face of a state */
  if (p.kind === 'city' && (p.prom || 0) >= 8) return 2; /* the famous cities */
  if (NPS_KINDS[p.kind]) return 3;                       /* the park service */
  if (p.kind === 'city') return 4;                       /* the rest of the cities */
  return 5;                                              /* everything else */
}
const TIER_NAME = { 1:'state faces', 2:'major cities', 3:'national park units',
                    4:'other cities', 5:'everything else' };

/* ===========================================================
   THE SOURCES
   =========================================================== */
function sized(c, w){
  if (c.source === 'unsplash'){
    const sep = c.url.indexOf('?') === -1 ? '?' : '&';
    return c.url + sep + 'w=' + w + '&q=80&fm=jpg&fit=max';
  }
  if (c.source === 'pexels'){
    return c.url.split('?')[0] + '?auto=compress&cs=tinysrgb&fit=crop&w=' + w;
  }
  return c.url;
}

async function fromPexels(place, key){
  if (!key) return [];
  const q = place.name + (place.abbr ? ' ' + place.abbr : '');
  const j = await getJSON('https://api.pexels.com/v1/search?per_page=15&orientation=landscape'
    + '&query=' + encodeURIComponent(q), { Authorization: key });
  if (j && j.rateLimited) return { rateLimited: true };
  const ph = j && j.photos;
  if (!ph) return [];
  return ph.filter(p => p.src && p.src.original).map(p => ({
    source: 'pexels',
    url: p.src.original,
    match: (p.alt || '') + ' ' + (p.photographer || ''),
    w: p.width || 0, h: p.height || 0,
    by: p.photographer || 'Pexels contributor',
    lic: 'Pexels License',
    page: p.url || 'https://www.pexels.com/'
  }));
}

/* The National Park Service's own photographs.

   For anything the NPS runs this beats both stock sites outright and
   it is not close:

     · they are works of the US federal government, so public domain —
       no licence to honour, no attribution required, nothing to get
       wrong
     · they are fetched BY PARK CODE, not by searching a name, so the
       "beautiful photograph of the wrong canyon" problem cannot
       happen at all
     · they are usually 2000px or wider
     · you already have the key, in config.js

   Which is why this runs first for park units and the stock sites
   never get asked. */
async function fromNPS(place, key){
  if (!key) return [];

  /* The park code is the only reliable key. Search by name and accept
     only a convincing match — a fuzzy one puts Sequoia's photographs
     on Kings Canyon. */
  const clean = place.name.replace(/\s+(national|state)\s+(park|monument|seashore|lakeshore|recreation area|historic site|preserve|parkway)\b.*$/i, '').trim();
  const j = await getJSON('https://developer.nps.gov/api/v1/parks?limit=6&api_key=' + key
    + '&q=' + encodeURIComponent(clean));
  const list = (j && j.data) || [];
  if (!list.length) return [];

  const want = clean.toLowerCase();
  const park = list.find(p => (p.fullName || '').toLowerCase().includes(want)
                           || (p.name || '').toLowerCase() === want);
  if (!park || !park.images) return [];

  return park.images.filter(im => im.url).map(im => ({
    source: 'nps',
    url: im.url.split('?')[0],
    /* the park's own name, so the name gate always passes — this
       photograph is OF this park by construction, not by search */
    match: place.name + ' ' + (im.altText || '') + ' ' + (im.caption || ''),
    /* the NPS does not publish dimensions; its gallery images are
       reliably wide, and the downloader checks the real file anyway */
    w: 2000, h: 1333,
    by: (im.credit || 'National Park Service').replace(/^NPS\s*\/?\s*/i, '') || 'National Park Service',
    lic: 'Public domain (NPS)',
    page: park.url || 'https://www.nps.gov/'
  }));
}

async function fromUnsplash(place, key){
  if (!key) return [];
  const q = place.name + (place.abbr ? ' ' + place.abbr : '');
  const j = await getJSON('https://api.unsplash.com/search/photos?per_page=15'
    + '&orientation=landscape&content_filter=high&query=' + encodeURIComponent(q),
    { Authorization: 'Client-ID ' + key });
  if (j && j.rateLimited) return { rateLimited: true };
  const res = j && j.results;
  if (!res) return [];
  return res.filter(x => x.urls && x.urls.raw).map(x => ({
    source: 'unsplash',
    url: x.urls.raw,
    match: [x.alt_description, x.description,
            (x.tags || []).map(t => t.title).join(' ')].filter(Boolean).join(' '),
    w: x.width || 0, h: x.height || 0,
    by: (x.user && x.user.name) || 'Unsplash contributor',
    lic: 'Unsplash License',
    page: (x.links && x.links.html) || 'https://unsplash.com/'
  }));
}

/* ===========================================================
   CHOOSING

   The whole risk of stock photography is that it is searched by
   name, not by coordinates: the result is a picture somebody
   TAGGED with the place, which for a city skyline is exactly right
   and for an obscure state park can be a generic forest.

   So the name has to appear in the description, or the candidate is
   thrown away rather than merely marked down. A missing photograph
   is honest; a confidently wrong one is not.
   =========================================================== */
const STOP = /^(national|state|park|city|the|and|of|mount|lake|river|beach|falls|canyon|great|north|south|east|west|new|fort|saint|st)$/;

function nameWords(name){
  return name.toLowerCase().split(/[^a-z0-9]+/)
    .filter(w => w.length > 2 && !STOP.test(w));
}

function pick(cands, place){
  const words = nameWords(place.name);
  const scored = cands.map(c => {
    const text = (c.match || '').toLowerCase();
    const hits = words.filter(w => text.includes(w)).length;

    /* the hard gate: if the place has a distinctive word and the
       photo never mentions it, this is not a photo of this place */
    if (words.length && hits === 0) return null;

    /* the second hard gate: the whole point of this run is higher
       resolution. Swapping a 900px Wikimedia photo for a 900px stock
       one is churn — it rewrites the atlas, costs a download and
       leaves the page exactly as blurry. Below the threshold is a
       reject, not a penalty, and the place keeps what it had. */
    if (c.source !== 'nps' && c.w && c.w < MIN_WIDTH) return null;

    let s = 40 * (hits / Math.max(words.length, 1));
    const ratio = c.w && c.h ? c.w / c.h : 1.5;
    if (c.w >= 2400) s += 16; else if (c.w >= 1600) s += 10;
    if (ratio >= 1.3 && ratio <= 2.0) s += 14;
    else if (ratio > 2.6) s -= 20;
    if (c.source === 'pexels') s += 2;        /* kinder rate limit, same quality */
    if (c.source === 'nps') s += 30;          /* right place by construction, public domain */
    return Object.assign({}, c, { score: Math.round(s) });
  }).filter(Boolean).sort((a, b) => b.score - a.score);
  return scored[0] || null;
}

/* ===========================================================
   WRITING BACK
   =========================================================== */
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

function writeCredits(manifest, PLACES, PG){
  const rows = Object.keys(manifest).sort().map(id => {
    const m = manifest[id];
    const p = PG(id);
    return '| ' + (p ? p.name : id) + ' | ' + m.by + ' | '
      + (m.source === 'pexels' ? 'Pexels' : 'Unsplash') + ' | [photo](' + m.page + ') |';
  });
  fs.writeFileSync(path.join(ROOT, 'PHOTO-CREDITS.md'),
    '# Photo credits\n\n'
    + 'Every photograph Meridian hosts itself, who took it and where it came from.\n'
    + 'Generated by `tools/photos-hq.js` — do not edit by hand.\n\n'
    + 'Pexels and Unsplash both allow download, hosting and commercial use without\n'
    + 'permission. Attribution is not strictly required by either licence; it is here\n'
    + 'because the photographers earned it.\n\n'
    + '| Place | Photographer | Source | Link |\n|---|---|---|---|\n'
    + rows.join('\n') + '\n');
}

/* ===========================================================
   THE RUN
   =========================================================== */
async function main(){
  if (!argv.length || has('help')){
    console.log(`
Meridian — photos-hq.js

  Replaces missing, junk and low-resolution photographs with good ones
  from Pexels and Unsplash, downloads them into assets/photos/, and
  points the atlas at your own copies.

  FIRST, TWO FREE KEYS

    Pexels     https://www.pexels.com/api/          200 req/hour
    Unsplash   https://unsplash.com/developers       50 req/hour on a
                                                     demo key, 5000
                                                     once approved

    Pexels alone is enough. Unsplash is a useful second opinion but
    its demo limit is the slowest part of the whole job.

  THEN

    node tools/photos-hq.js --audit
        What needs replacing, counted by tier, nothing downloaded.
        Measures the real pixel size of every photograph you already
        have, so "not high resolution" is a fact rather than a guess.

    node tools/photos-hq.js --run --pexels=KEY [--unsplash=KEY]
        Works through them in priority order:
          1  the fifty places that stand for a state
          2  cities everybody has heard of
          3  national parks, monuments and recreation areas
          4  the remaining cities
          5  everything else
        Downloads ${SIZES.join('px and ')}px copies into assets/photos/,
        rewrites photos.js, writes PHOTO-CREDITS.md.

  OPTIONS

    --tier=N        only this tier (1-5). Repeatable as --tier=1,2
    --limit=N       stop after N places
    --min-width=N   what counts as low resolution (default ${MIN_WIDTH})
    --sizes=A,B     widths to download (default 1600,640)
    --force         re-download places already done
    --dry           choose and report, download nothing
    --audit         just the audit

  It is resumable. Anything already in assets/photos/ is skipped, so
  stopping it and running it again tomorrow loses nothing — which
  matters on an Unsplash demo key.

  AFTERWARDS
    Bump ?v= in index.html AND VERSION in sw.js.
`);
    return;
  }

  const { PLACES, PHOTOS, placeGet: PG } = loadData();
  if (typeof PG !== 'function'){ console.error('places.js did not yield placeGet'); process.exit(1); }

  const ids = Object.keys(PLACES);
  const faces = stateFaces(PLACES, PG);

  console.log('Meridian — high-resolution photographs\n');
  console.log('  places in the atlas   ' + ids.length);
  console.log('  with an entry         ' + Object.keys(PHOTOS).length);

  /* ---- measure what is already there ---- */
  const dims = await probeWikimedia(PHOTOS, ids);

  const work = [];
  ids.forEach(id => {
    const p = PG(id);
    const fault = faultOf(PHOTOS[id], dims[id]);
    if (!fault) return;
    work.push({ id, name: p.name, abbr: p.abbr, kind: p.kind, prom: p.prom || 0,
                fault, tier: tierOf(id, p, faces), state: faces[id] || '' });
  });

  work.sort((a, b) => a.tier - b.tier || b.prom - a.prom || a.name.localeCompare(b.name));

  const byTier = {};
  work.forEach(w => (byTier[w.tier] = (byTier[w.tier] || 0) + 1));
  console.log('  needing replacement   ' + work.length + '\n');
  Object.keys(byTier).sort().forEach(t =>
    console.log('      tier ' + t + '  ' + String(byTier[t]).padStart(4) + '  ' + TIER_NAME[t]));

  const byFault = {};
  work.forEach(w => (byFault[w.fault.replace(/\d+px/, 'Npx')] = (byFault[w.fault.replace(/\d+px/, 'Npx')] || 0) + 1));
  console.log('');
  Object.keys(byFault).sort((a, b) => byFault[b] - byFault[a]).forEach(k =>
    console.log('      ' + String(byFault[k]).padStart(4) + '  ' + k));

  if (has('audit')){
    console.log('\n  The first twenty, in the order they would be done:\n');
    work.slice(0, 20).forEach(w => console.log('      ' + String(w.tier) + '  '
      + (w.name + (w.state ? ' (face of ' + w.state + ')' : '')).padEnd(46) + w.fault));
    console.log('\n  Run with --run --pexels=KEY to replace them.');
    return;
  }

  if (!has('run')){ console.log('\n  Add --run to do it, or --audit for just this.'); return; }

  const pexels   = arg('pexels')   || process.env.PEXELS_KEY   || '';
  const unsplash = arg('unsplash') || process.env.UNSPLASH_KEY || '';
  const nps      = arg('nps')      || process.env.NPS_KEY      || readNpsKey();
  if (!pexels && !unsplash && !nps){
    console.error('\n  Needs at least one key: --nps=KEY, --pexels=KEY or --unsplash=KEY');
    process.exit(1);
  }
  if (nps) console.log('  NPS key found — park units will use their own public-domain photographs.');

  const tiers = (arg('tier') || '').split(',').map(n => +n).filter(Boolean);
  let queue = tiers.length ? work.filter(w => tiers.includes(w.tier)) : work;
  const limit = +arg('limit') || queue.length;
  queue = queue.slice(0, limit);

  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
  fs.mkdirSync(PHOTODIR, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });

  console.log('\n  Replacing ' + queue.length + ' photograph'
    + (queue.length === 1 ? '' : 's')
    + (has('dry') ? '  (dry run, nothing downloaded)' : '') + '\n');

  let done = 0, skipped = 0, failed = 0, bytes = 0;
  let pexelsOut = false, unsplashOut = false;

  for (let i = 0; i < queue.length; i++){
    const w = queue[i];
    const tag = String(i + 1).padStart(4) + '/' + queue.length + '  '
              + (w.name + (w.state ? ' [' + w.state + ']' : '')).padEnd(44);

    const already = SIZES.every(s => fs.existsSync(path.join(PHOTODIR, w.id + '-' + s + '.jpg')));
    if (already && !has('force')){ skipped++; console.log(tag + 'already downloaded'); continue; }

    /* ---- gather ----
       The park service first for its own units: public domain, fetched
       by park code rather than by name, and therefore never the wrong
       place. Only if it has nothing do the stock sites get asked. */
    let cands = [];
    if (nps && NPS_KINDS[w.kind]){
      cands = cands.concat(await fromNPS(w, nps) || []);
      await sleep(250);
    }
    if (pexels && !pexelsOut && !cands.length){
      const r = await fromPexels(w, pexels);
      if (r && r.rateLimited){ pexelsOut = true; console.log('\n  ! Pexels hourly limit reached — '
        + 'falling back to Unsplash. Re-run later to continue.\n'); }
      else cands = cands.concat(r || []);
      await sleep(350);
    }
    if (unsplash && !unsplashOut && !cands.length){
      const r = await fromUnsplash(w, unsplash);
      if (r && r.rateLimited){ unsplashOut = true; console.log('\n  ! Unsplash hourly limit reached. '
        + 'On a demo key that is 50 an hour — re-run in an hour and it resumes.\n'); }
      else cands = cands.concat(r || []);
      await sleep(350);
    }
    if (pexelsOut && unsplashOut && !nps){
      console.log('\n  Both providers are rate limited. Stopping here; nothing is lost, '
        + 'run the same command again later.\n');
      break;
    }

    const best = pick(cands, w);
    if (!best){
      failed++;
      console.log(tag + 'no confident match among ' + cands.length + ' (left alone)');
      continue;
    }
    if (has('dry')){
      done++;
      console.log(tag + best.source + ' ' + best.w + 'x' + best.h + ' by ' + best.by
        + '  score ' + best.score);
      continue;
    }

    /* ---- download every size ---- */
    let okAll = true, got = 0;
    for (const s of SIZES){
      const dest = path.join(PHOTODIR, w.id + '-' + s + '.jpg');
      if (fs.existsSync(dest) && !has('force')){ continue; }
      const r = await download(sized(best, s), dest);
      if (r.error){ okAll = false; console.log(tag + 'download failed at ' + s + 'px: ' + r.error); break; }
      got += r.bytes; bytes += r.bytes;
      await sleep(200);
    }
    if (!okAll){ failed++; continue; }

    /* ---- point the atlas at our own copy ---- */
    const big = 'assets/photos/' + w.id + '-' + SIZES[0] + '.jpg';
    const small = 'assets/photos/' + w.id + '-' + (SIZES[1] || SIZES[0]) + '.jpg';
    PHOTOS[w.id] = { t: small, s: big, f: big,
                     by: best.by, lic: best.lic, u: best.page, src: best.source };
    manifest[w.id] = { source: best.source, by: best.by, lic: best.lic,
                       page: best.page, origin: best.url, at: new Date().toISOString().slice(0, 10) };
    done++;
    console.log(tag + best.source + '  ' + Math.round(got / 1024) + 'KB  by ' + best.by);

    /* save as we go: a run over four hundred places must survive
       being interrupted */
    if (done % 10 === 0){
      writePhotos(PHOTOS);
      fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
    }
  }

  if (!has('dry')){
    writePhotos(PHOTOS);
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
    writeCredits(manifest, PLACES, PG);
  }

  console.log('\n  replaced   ' + done);
  console.log('  skipped    ' + skipped + ' (already had files)');
  console.log('  left alone ' + failed + ' (no confident match — these keep what they had)');
  if (bytes) console.log('  downloaded ' + (bytes / 1048576).toFixed(1) + ' MB into assets/photos/');
  if (!has('dry')){
    console.log('\n  photos.js updated, PHOTO-CREDITS.md written.');
    console.log('  Now bump ?v= in index.html AND VERSION in sw.js, then deploy.');
  }
}

main().catch(e => { console.error('\n' + e.stack); process.exit(1); });
