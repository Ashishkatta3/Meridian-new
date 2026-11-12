#!/usr/bin/env node
/* ===========================================================
   fix-photo-urls.js — repairs the photo URLs, then you can download.

   WHAT WENT WRONG
   The Wikipedia API hands back two different hosts:
       originals   -> upload.wikimedia.org/wikipedia/commons/a/ab/File.jpg
       thumbnails  -> thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/File.jpg/960px-File.jpg
   When the data was merged, every thumbnail was rewritten onto
   upload.wikimedia.org on the assumption that it was the canonical
   host. It does not serve those thumbnail paths, so each one came
   back 400 Bad Request — which looked like a block and was not.

   WHAT THIS DOES
   1. Tests the real URL forms against the network and prints which
      actually work, so nothing is assumed this time.
   2. Rebuilds assets/js/data/photos.js using the form that works,
      keeping every author, licence and source link.

   The original (full-size) URLs in your data were always correct, so
   the thumbnails are rebuilt from those — no re-fetch of the API.

   Usage (Node 18+), from the meridian folder:
       node tools/fix-photo-urls.js

   Then download them locally:
       node tools/download-photos.js
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets/js/data/photos.js');
const REMOTE = path.join(ROOT, 'assets/js/data/photos.remote.js');

const HERO_W = 1200, THUMB_W = 480;

function loadPHOTOS(file){
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8') + '\n;globalThis.__PH = PHOTOS;', ctx);
  return ctx.__PH;
}

/* pull apart an original upload.wikimedia.org URL */
function parseOriginal(u){
  if (!u) return null;
  const m = String(u).split('?')[0]
    .match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/([^/]+)\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/i);
  if (!m) return null;
  return { repo: m[1], a: m[2], ab: m[3], file: m[4] };
}
/* …and put it back together as a thumbnail on a given host */
function thumbURL(host, p, w){
  return 'https://' + host + '/wikipedia/' + p.repo + '/thumb/' + p.a + '/' + p.ab + '/' + p.file + '/' + w + 'px-' + p.file;
}
function originalURL(p){
  return 'https://upload.wikimedia.org/wikipedia/' + p.repo + '/' + p.a + '/' + p.ab + '/' + p.file;
}

async function hit(url, ms){
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), ms || 15000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'MeridianAtlas/1.0 (travel atlas)', 'Accept': 'image/*' }, signal: ctl.signal });
    const b = Buffer.from(await r.arrayBuffer());
    clearTimeout(to);
    return { ok: r.ok && b.length > 500, status: r.status, bytes: b.length };
  } catch(e){ clearTimeout(to); return { ok: false, status: '—', bytes: 0, err: (e.cause && e.cause.code) || e.name }; }
}

(async function main(){
  const src = fs.existsSync(REMOTE) ? REMOTE : DATA;
  if (!fs.existsSync(src)){ console.error('Cannot find photos.js — run this from the meridian folder.'); process.exit(1); }
  const PHOTOS = loadPHOTOS(src);
  const ids = Object.keys(PHOTOS);
  console.log('Reading ' + path.basename(src) + ' — ' + ids.length + ' entries.\n');

  /* find a sample with a parseable original */
  let sample = null, sampleId = null;
  for (const id of ids){
    const p = parseOriginal(PHOTOS[id].f || PHOTOS[id].s);
    if (p){ sample = p; sampleId = id; break; }
  }
  if (!sample){ console.error('No usable original URLs found. Re-run tools/fetch-photos.js instead.'); process.exit(1); }

  console.log('Testing the URL forms on ' + sampleId + ':\n');
  const tests = [
    ['original (upload host)',      originalURL(sample)],
    ['thumb on thumb.wikimedia',    thumbURL('thumb.wikimedia.org', sample, 800)],
    ['thumb on upload.wikimedia',   thumbURL('upload.wikimedia.org', sample, 800)]
  ];
  const res = {};
  for (const [name, url] of tests){
    const r = await hit(url);
    res[name] = { r, url };
    console.log('  ' + (r.ok ? ' OK  ' : 'FAIL ') + name.padEnd(28)
      + String(r.status).padEnd(6) + (r.bytes ? r.bytes + ' bytes' : (r.err || '')));
  }
  console.log('    ' + tests[1][1].slice(0, 110));

  const thumbHost = res['thumb on thumb.wikimedia'].r.ok ? 'thumb.wikimedia.org'
                  : res['thumb on upload.wikimedia'].r.ok ? 'upload.wikimedia.org' : null;
  const originalOK = res['original (upload host)'].r.ok;

  if (!thumbHost && !originalOK){
    console.log('\nNeither form worked. That is a real connectivity problem, not the URLs.');
    console.log('Run: node tools/diagnose-network.js');
    process.exit(1);
  }

  if (!thumbHost){
    console.log('\nNo thumbnail host worked, but originals do. Falling back to full-size images.');
    console.log('They are large; the download will be slower and heavier.');
  } else {
    console.log('\nThumbnails work on: ' + thumbHost);
  }

  /* ---- rebuild ----
     Prefer the URL the API itself gave, when the seed file is still
     around: it is known-good. For an image small enough that no
     thumbnail exists, the API returns the original, and asking for
     an oversized thumbnail of it would 400 — so those are used
     exactly as given rather than rebuilt. */
  let seed = null;
  const seedPath = path.join(ROOT, 'meridian-seed.json');
  if (fs.existsSync(seedPath)){
    try { seed = JSON.parse(fs.readFileSync(seedPath, 'utf8')); console.log('Using the API URLs from meridian-seed.json.'); }
    catch(e){ seed = null; }
  }
  const strip = u => String(u || '').split('?')[0];
  const reWidth = (u, w) => u.replace(/\/(\d+)px-/, '/' + w + 'px-');

  const out = {}; let fixed = 0, kept = 0, fromSeed = 0;
  for (const id of ids){
    const rec = PHOTOS[id];
    const api = seed && seed[id] && seed[id].wiki && seed[id].wiki.image;
    const p = parseOriginal(rec.f || rec.s);

    if (api && api.thumb){
      const apiThumb = strip(api.thumb);
      const isThumb = /\/thumb\//.test(apiThumb);
      out[id] = {
        t: isThumb ? reWidth(apiThumb, THUMB_W) : apiThumb,
        s: isThumb ? reWidth(apiThumb, HERO_W)  : apiThumb,
        f: strip(api.full) || (p ? originalURL(p) : apiThumb),
        by: rec.by || api.author || '', lic: rec.lic || api.license || '',
        u: rec.u || api.source || '', src: rec.src || 'wikimedia'
      };
      fromSeed++; fixed++; continue;
    }

    if (!p){                                  // NPS photo or anything non-Wikimedia: leave alone
      out[id] = rec; kept++; continue;
    }
    const orig = originalURL(p);
    out[id] = {
      t: thumbHost ? thumbURL(thumbHost, p, THUMB_W) : orig,
      s: thumbHost ? thumbURL(thumbHost, p, HERO_W)  : orig,
      f: orig,
      by: rec.by || '', lic: rec.lic || '', u: rec.u || '', src: rec.src || 'wikimedia'
    };
    fixed++;
  }

  if (!fs.existsSync(REMOTE)) fs.writeFileSync(REMOTE, fs.readFileSync(DATA, 'utf8'));
  const banner = '/* ===========================================================\n'
    + '   PHOTOS — GENERATED by tools/fix-photo-urls.js\n'
    + '\n'
    + '   Thumbnails are served from ' + (thumbHost || 'the original host') + '.\n'
    + '   That host is what the Wikipedia API itself returns for\n'
    + '   thumbnails; rewriting them onto upload.wikimedia.org makes\n'
    + '   every one of them 400. Do not "canonicalise" these hosts.\n'
    + '\n'
    + '   Author, licence and source are preserved for every photo,\n'
    + '   which is what the CC BY / CC BY-SA terms require.\n'
    + '   =========================================================== */\n';
  fs.writeFileSync(DATA, banner + 'const PHOTOS = ' + JSON.stringify(out) + ';\n'
    + 'function photoLocal(id){ return (typeof PHOTOS!=="undefined" && PHOTOS[id]) || null; }\n');

  console.log('\nRewrote photos.js — ' + fixed + ' Wikimedia URLs repaired ('
    + fromSeed + ' taken straight from the API), ' + kept + ' left as they were.');
  console.log('\nReload the site: the photos should appear straight away.');
  console.log('Then, to serve them from disk instead of hotlinking:');
  console.log('   node tools/download-photos.js');
})();