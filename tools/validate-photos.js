#!/usr/bin/env node
/* ===========================================================
   validate-photos.js

   Checks every picture in the atlas, for all seven countries, and
   says which ones are broken, wrong, or missing.

   Two different things happen on the site and both are checked:

     1. The United States has a baked-in manifest in
        assets/js/data/photos.js. Those URLs point at
        upload.wikimedia.org and are requested directly. If one of
        them 404s, or has turned into something that is not an
        image, the place shows nothing and nobody finds out.

     2. Every other country resolves its picture at run time: the
        place page asks the Wikipedia REST summary endpoint for each
        candidate title that photoTitles() generates, in order, and
        takes the lead image off the first article that has one.
        A title that does not exist, or lands on a disambiguation
        page, or exists but has no lead image, means a blank card.

   This script runs the site's own photoTitles() against the site's
   own place data, so what it tests is the real resolution path and
   not a reimplementation of it.

   Run it:

     node tools/validate-photos.js                 all countries
     node tools/validate-photos.js IS ES EG        just these
     node tools/validate-photos.js --manifest      only the US manifest
     node tools/validate-photos.js --fix-authors   fill missing credits

   Needs Node 18 or later for fetch. Nothing else: no packages, no
   keys. It writes tools/photo-report.json next to itself and prints
   a summary. Expect it to take a few minutes for the full run; it
   makes about one request per place and is deliberately polite
   about the rate.
   =========================================================== */

'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets', 'js', 'data');
const CORE = path.join(ROOT, 'assets', 'js', 'core');

/* The same endpoint core/photos.js uses, so a title that resolves
   here resolves on the site. */
const SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const UA = 'MeridianAtlas-photo-validator/1.0 (static travel atlas; contact via repository)';

/* Wikimedia asks for a real user agent and no hammering. One
   request at a time per worker, a handful of workers, and a short
   pause between each is well inside what they ask for. */
const WORKERS = 4;
const PAUSE   = 120;

const COUNTRIES = {
  US: { places: 'places.js',       map: 'PLACES',    get: 'placeGet'   },
  IT: { places: 'italy.places.js', map: 'IT_PLACES', get: 'itPlaceGet' },
  CR: { places: 'cr.places.js',    map: 'CR_PLACES', get: 'crPlaceGet' },
  IN: { places: 'in.places.js',    map: 'IN_PLACES', get: 'inPlaceGet' },
  JP: { places: 'jp.places.js',    map: 'JP_PLACES', get: 'jpPlaceGet' },
  ES: { places: 'es.places.js',    map: 'ES_PLACES', get: 'esPlaceGet' },
  EG: { places: 'eg.places.js',    map: 'EG_PLACES', get: 'egPlaceGet' },
  IS: { places: 'is.places.js',    map: 'IS_PLACES', get: 'isPlaceGet' }
};

/* The guide files carry the *_WIKI override maps for the countries
   added after Italy, so they have to be in the sandbox too. */
const EXTRA = ['italy.guide.js', 'cr.guide.js', 'in.guide.js',
               'jp.guide.js', 'es.guide.js', 'eg.guide.js', 'is.guide.js'];

/* ---------------------------------------------------------- sandbox */

/* core/photos.js is written for a browser. The title functions
   themselves are pure, but the file mentions window and
   localStorage at load time, so the sandbox supplies enough of a
   browser for it to evaluate and no more. */
function sandbox(){
  const store = {
    getItem(){ return null; }, setItem(){}, removeItem(){},
    key(){ return null; }, get length(){ return 0; }
  };
  const win = { localStorage: store, sessionStorage: store,
                devicePixelRatio: 1, location: { hash: '' } };
  const ctx = vm.createContext({
    window: win, localStorage: store, sessionStorage: store,
    document: { querySelectorAll: () => [], createElement: () => ({}) },
    navigator: { userAgent: 'node' },
    console, fetch: () => Promise.reject(new Error('not in the validator')),
    IntersectionObserver: function(){ this.observe = () => {}; }
  });
  ctx.globalThis = ctx;
  ctx.self = ctx;

  const load = f => {
    const p = fs.existsSync(path.join(DATA, f)) ? path.join(DATA, f)
                                                : path.join(CORE, f);
    if (!fs.existsSync(p)) return false;
    vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
    return true;
  };

  load('taxonomy.js');
  for (const c of Object.values(COUNTRIES)) load(c.places);
  for (const f of EXTRA) load(f);
  load('photos.js');                     /* data/photos.js: the manifest */
  vm.runInContext(fs.readFileSync(path.join(CORE, 'photos.js'), 'utf8'),
                  ctx, { filename: 'core/photos.js' });
  return ctx;
}

/* ---------------------------------------------------------- helpers */

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* Filenames that are almost never a photograph of the place. These
   are the patterns that put a US Census county locator map on Hilo
   and a map of the Iron Age Levant on Moab, Utah. */
const NOT_A_PHOTO = [
  /Incorporated_and_Unincorporated/i, /_Highlighted/i, /locator/i,
  /_map[-_.]/i, /[-_]map\./i, /topographic/i, /\blogo\b/i, /\bseal\b/i,
  /\bflag\b/i, /coat[-_]of[-_]arms/i, /\bshield\b/i, /^US_\d+\.svg$/i,
  /blank/i, /diagram/i, /chart/i
];
/* .tif, .pdf and .djvu are fine here: thumbLeaf() in core/photos.js
   appends .jpg for exactly those, which is what Commons serves. An
   animated .gif is never a lead photograph. */
const DEAD_FORMATS = ['gif'];

function fileOf(url){
  try { return decodeURIComponent(String(url).split('/').pop()); }
  catch(e){ return String(url).split('/').pop(); }
}
function extOf(url){ return (fileOf(url).split('.').pop() || '').toLowerCase(); }

function suspicious(url){
  const f = fileOf(url);
  const why = [];
  for (const re of NOT_A_PHOTO) if (re.test(f)) why.push('filename looks like ' + String(re));
  const e = extOf(url);
  if (DEAD_FORMATS.includes(e)) why.push('format .' + e + ' is not a photograph the browser can show as one');
  return why;
}

/* Licences that oblige us to name the photographer. */
function needsCredit(lic){
  return /^CC[ -]BY/i.test(String(lic || ''));
}

async function askWiki(title){
  const url = SUMMARY + encodeURIComponent(title);
  for (let attempt = 0; attempt < 3; attempt++){
    try {
      const r = await fetch(url, { headers: { 'Accept': 'application/json', 'User-Agent': UA } });
      if (r.status === 404) return { status: 404 };
      if (r.status === 429 || r.status >= 500){ await sleep(1500 * (attempt + 1)); continue; }
      if (!r.ok) return { status: r.status };
      const j = await r.json();
      return {
        status: 200,
        type: j.type || '',
        title: j.title || '',
        redirected: (j.title || '').toLowerCase() !== title.toLowerCase(),
        image: (j.thumbnail && j.thumbnail.source) ||
               (j.originalimage && j.originalimage.source) || ''
      };
    } catch(e){
      if (attempt === 2) return { status: 0, error: e.message };
      await sleep(1000 * (attempt + 1));
    }
  }
  return { status: 0, error: 'gave up' };
}

async function headOk(url){
  for (let attempt = 0; attempt < 2; attempt++){
    try {
      const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': UA } });
      return { status: r.status, type: r.headers.get('content-type') || '',
               bytes: Number(r.headers.get('content-length') || 0) };
    } catch(e){
      if (attempt === 1) return { status: 0, error: e.message };
      await sleep(800);
    }
  }
}

/* A small worker pool, so the whole atlas does not arrive at
   Wikipedia in one breath. */
async function pool(items, fn){
  const out = new Array(items.length);
  let next = 0, done = 0;
  const tick = () => {
    done++;
    if (done % 25 === 0 || done === items.length){
      process.stderr.write('\r  ' + done + ' / ' + items.length + '   ');
      if (done === items.length) process.stderr.write('\n');
    }
  };
  const worker = async () => {
    while (true){
      const i = next++;
      if (i >= items.length) return;
      out[i] = await fn(items[i], i);
      tick();
      await sleep(PAUSE);
    }
  };
  await Promise.all(Array.from({ length: WORKERS }, worker));
  return out;
}

/* ---------------------------------------- the baked US manifest */

async function checkManifest(ctx, opts){
  const P = vm.runInContext('typeof PHOTOS !== "undefined" ? PHOTOS : null', ctx);
  if (!P) return { skipped: 'no PHOTOS manifest found' };

  const ids = Object.keys(P);
  console.log('\nBaked manifest: ' + ids.length + ' pictures');

  const rows = await pool(ids, async id => {
    const p = P[id];
    const row = { id, file: fileOf(p.t), lic: p.lic || '', by: p.by || '' };
    row.suspicious = suspicious(p.t);
    if (!p.by || !String(p.by).trim()){
      row.creditMissing = needsCredit(p.lic) ? 'required by ' + p.lic : 'optional under ' + (p.lic || 'unknown');
    }
    if (!opts.offline){
      const h = await headOk(p.t);
      row.http = h.status;
      row.type = h.type;
      row.bytes = h.bytes;
      if (h.status !== 200) row.dead = true;
      else if (!/^image\//.test(h.type || '')) row.notImage = true;
    }
    return row;
  });

  const dead   = rows.filter(r => r.dead);
  const notImg = rows.filter(r => r.notImage);
  const susp   = rows.filter(r => r.suspicious.length);
  const credit = rows.filter(r => r.creditMissing && /required/.test(r.creditMissing));

  console.log('  unreachable                 ' + dead.length);
  console.log('  reachable but not an image  ' + notImg.length);
  console.log('  probably not a photograph   ' + susp.length);
  console.log('  CC BY image with no credit  ' + credit.length);
  for (const r of dead)   console.log('    DEAD    ' + r.id + '  HTTP ' + r.http + '  ' + r.file);
  for (const r of notImg) console.log('    NOTIMG  ' + r.id + '  ' + r.type + '  ' + r.file);
  for (const r of susp)   console.log('    SUSPECT ' + r.id + '  ' + r.file);
  for (const r of credit) console.log('    CREDIT  ' + r.id + '  ' + r.lic + '  ' + r.file);

  return { total: rows.length, dead, notImage: notImg, suspicious: susp,
           creditMissing: credit, rows };
}

/* ------------------------------- the live-resolved countries */

async function checkCountry(ctx, code){
  const c = COUNTRIES[code];
  const ids = vm.runInContext(
    'typeof ' + c.map + ' !== "undefined" ? Object.keys(' + c.map + ') : []', ctx);
  if (!ids.length){ console.log('\n' + code + ': no place data found'); return null; }

  /* The baked manifest wins on the site, so a place that has one
     is not resolved live and does not need a title check. */
  const P = vm.runInContext('typeof PHOTOS !== "undefined" ? PHOTOS : {}', ctx);

  const live = ids.filter(id => !P[id]);
  console.log('\n' + code + ': ' + ids.length + ' places, ' +
              (ids.length - live.length) + ' baked, ' + live.length + ' resolved live');
  if (!live.length) return { code, total: ids.length, live: 0, rows: [] };

  const rows = await pool(live, async id => {
    const place = vm.runInContext(c.get + '(' + JSON.stringify(id) + ')', ctx);
    if (!place) return { id, error: 'decoder returned nothing' };
    place.country = code === 'US' ? undefined : code;
    const titles = vm.runInContext('photoTitles(' + JSON.stringify(place) + ')', ctx) || [];
    const row = { id, name: place.name, titles, tried: [] };
    if (!titles.length){ row.noTitles = true; return row; }

    for (const t of titles){
      const r = await askWiki(t);
      row.tried.push({ title: t, status: r.status, type: r.type || '',
                       image: !!r.image, redirected: !!r.redirected,
                       landedOn: r.title || '' });
      if (r.status === 200 && r.type !== 'disambiguation' && r.image){
        row.resolved = t;
        row.landedOn = r.title;
        row.image = r.image;
        row.whichCandidate = titles.indexOf(t) + 1;
        row.suspicious = suspicious(r.image);
        return row;
      }
      await sleep(PAUSE);
    }
    row.unresolved = true;
    return row;
  });

  const unresolved = rows.filter(r => r.unresolved || r.noTitles || r.error);
  const susp       = rows.filter(r => r.suspicious && r.suspicious.length);
  const late       = rows.filter(r => r.whichCandidate > 1);
  const disamb     = rows.filter(r => (r.tried || []).some(t => t.type === 'disambiguation'));

  console.log('  no picture at all           ' + unresolved.length);
  console.log('  probably not a photograph   ' + susp.length);
  console.log('  hit a disambiguation page   ' + disamb.length);
  console.log('  needed a fallback title     ' + late.length);
  for (const r of unresolved)
    console.log('    NONE    ' + r.id + '  tried: ' + (r.titles || []).join(' | '));
  for (const r of susp)
    console.log('    SUSPECT ' + r.id + '  ' + fileOf(r.image));
  for (const r of disamb)
    console.log('    DISAMB  ' + r.id + '  ' +
      (r.tried.filter(t => t.type === 'disambiguation').map(t => t.title).join(', ')) +
      (r.resolved ? '  (recovered on "' + r.resolved + '")' : '  (NOT recovered)'));
  for (const r of late)
    console.log('    LATE    ' + r.id + '  candidate ' + r.whichCandidate +
      ' of ' + r.titles.length + ': "' + r.resolved + '"' +
      (r.landedOn && r.landedOn !== r.resolved ? ' -> ' + r.landedOn : ''));

  return { code, total: ids.length, live: live.length,
           unresolved, suspicious: susp, disambiguation: disamb, late, rows };
}

/* ---------------------------------- candidate titles, no network

   Two things go wrong without anyone noticing. A place can generate
   no candidate title at all, in which case it silently never gets a
   picture. And two different places can generate the same first
   candidate, in which case they both end up showing the same
   photograph, which looks like a bug in the page and is really a
   bug in the naming. Neither needs the network to find. */

function checkTitles(ctx, codes){
  const P = vm.runInContext('typeof PHOTOS !== "undefined" ? PHOTOS : {}', ctx);
  const first = {};            /* first candidate -> [place ids] */
  let places = 0, none = 0;
  const empty = [];

  for (const code of codes){
    const c = COUNTRIES[code];
    const ids = vm.runInContext(
      'typeof ' + c.map + ' !== "undefined" ? Object.keys(' + c.map + ') : []', ctx);
    let bare = 0;
    for (const id of ids){
      if (P[id]) continue;                   /* baked, never resolved live */
      const place = vm.runInContext(c.get + '(' + JSON.stringify(id) + ')', ctx);
      if (!place){ empty.push(code + ' ' + id + ' (decoder returned nothing)'); none++; continue; }
      place.country = code === 'US' ? undefined : code;
      const titles = vm.runInContext('photoTitles(' + JSON.stringify(place) + ')', ctx) || [];
      places++;
      if (!titles.length){ empty.push(code + ' ' + id); none++; continue; }
      const t = titles[0];
      (first[t] = first[t] || []).push(code + ' ' + id);
      if (titles.length === 1) bare++;
    }
    console.log('  ' + code + '  ' + String(ids.length).padStart(4) +
      ' places, ' + String(bare).padStart(4) + ' with a single candidate (no fallback)');
  }

  const clash = Object.entries(first).filter(([, v]) => v.length > 1);
  console.log('\n  ' + places + ' places resolved live');
  console.log('  with no candidate title at all   ' + none);
  console.log('  sharing a first candidate        ' + clash.length);
  for (const e of empty) console.log('    NOTITLE ' + e);
  for (const [t, v] of clash) console.log('    CLASH   "' + t + '"  <-  ' + v.join(', '));
  return { places, none, empty, clash };
}

/* -------------------------------------- filling in missing credits */

async function fixAuthors(ctx){
  const file = path.join(DATA, 'photos.js');
  let src = fs.readFileSync(file, 'utf8');
  const MARK = 'const PHOTOS = ';
  const i = src.indexOf(MARK);
  if (i < 0) throw new Error('could not find the manifest in ' + file);
  const head = src.slice(0, i + MARK.length);
  const rest = src.slice(i + MARK.length);
  if (rest.split('}};').length !== 2) throw new Error('could not find the end of the manifest');
  const end  = rest.indexOf('}};') + 1;
  const P    = JSON.parse(rest.slice(0, end + 1));
  const tail = rest.slice(end + 1);

  const need = Object.keys(P).filter(id => !P[id].by || !String(P[id].by).trim());
  console.log('\n' + need.length + ' pictures have no photographer named');
  if (!need.length) return;

  const API = 'https://commons.wikimedia.org/w/api.php';
  let filled = 0;
  for (const id of need){
    const f = fileOf(P[id].u || P[id].t);
    const q = API + '?action=query&format=json&origin=*&prop=imageinfo' +
              '&iiprop=extmetadata&titles=' + encodeURIComponent('File:' + f);
    try {
      const r = await fetch(q, { headers: { 'User-Agent': UA } });
      const j = await r.json();
      const pages = (j.query && j.query.pages) || {};
      const page  = Object.values(pages)[0] || {};
      const meta  = ((page.imageinfo || [])[0] || {}).extmetadata || {};
      const raw   = (meta.Artist && meta.Artist.value) || '';
      const by    = raw.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      if (by){ P[id].by = by; filled++; console.log('  ' + id + ' -> ' + by); }
      else console.log('  ' + id + ' -> Commons names no author either');
    } catch(e){
      console.log('  ' + id + ' -> lookup failed: ' + e.message);
    }
    await sleep(250);
  }
  if (filled){
    fs.writeFileSync(file, head + JSON.stringify(P) + tail);
    console.log('\nwrote ' + filled + ' credits into assets/js/data/photos.js');
  }
}

/* ------------------------------------------------------------- main */

async function main(){
  const argv = process.argv.slice(2);
  const opts = {
    offline:      argv.includes('--offline'),
    manifestOnly: argv.includes('--manifest'),
    titlesOnly:   argv.includes('--titles'),
    fixAuthors:   argv.includes('--fix-authors')
  };
  const asked = argv.filter(a => !a.startsWith('--')).map(a => a.toUpperCase());
  const codes = asked.length ? asked : Object.keys(COUNTRIES);
  for (const c of codes) if (!COUNTRIES[c]) throw new Error('unknown country ' + c);

  const ctx = sandbox();

  if (opts.fixAuthors){ await fixAuthors(ctx); return; }

  if (opts.titlesOnly){
    console.log('\nCandidate titles, no network:');
    const t = checkTitles(ctx, codes);
    process.exitCode = (t.none + t.clash.length) ? 1 : 0;
    return;
  }

  const report = { when: new Date().toISOString(), manifest: null, countries: {} };

  report.manifest = await checkManifest(ctx, opts);

  if (!opts.manifestOnly){
    for (const code of codes){
      if (code === 'US') continue;            /* covered by the manifest */
      report.countries[code] = await checkCountry(ctx, code);
    }
  }

  const out = path.join(__dirname, 'photo-report.json');
  fs.writeFileSync(out, JSON.stringify(report, null, 2));

  /* One number at the end, which is the only thing worth acting on. */
  let broken = 0;
  if (report.manifest && report.manifest.rows)
    broken += report.manifest.dead.length + report.manifest.notImage.length +
              report.manifest.suspicious.length;
  for (const r of Object.values(report.countries)){
    if (!r) continue;
    broken += r.unresolved.length + r.suspicious.length;
  }
  console.log('\n' + (broken ? broken + ' pictures need attention' : 'every picture checked out'));
  console.log('full report: ' + out);
  process.exitCode = broken ? 1 : 0;
}

main().catch(e => { console.error('\n' + e.stack); process.exit(2); });
