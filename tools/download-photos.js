#!/usr/bin/env node
/* ===========================================================
   download-photos.js — run on YOUR computer. Safe to re-run.

   Pulls every photo Meridian uses down into the project and
   rewrites photos.js to point at the local copies, so the site
   loads pictures from disk: nothing to block, works offline.

   WHY A PROXY: on some machines Wikimedia (upload.wikimedia.org)
   is blocked below the browser — by antivirus, a DNS filter, or a
   VPN — so even Node cannot fetch it, while other hosts work fine.
   To get around that, each image is tried directly first and, if
   that fails, again through wsrv.nl, a free image proxy that
   fetches the file on its end and hands it back. If your machine
   can reach the proxy, the download works even when Wikimedia is
   blocked for you.

   It NEVER leaves photos.js broken: any image it cannot fetch keeps
   its original web URL, so that place simply falls back to
   hotlinking instead of pointing at a missing file.

   Saves two sizes per place:
       assets/img/places/<id>-h.jpg   ~1100px hero
       assets/img/places/<id>-t.jpg   ~480px  thumbnail
   and writes assets/img/places/CREDITS.txt with every author and
   licence (that is what keeps the CC BY / CC BY-SA photos legal).

   Usage (Node 18+), from the meridian folder:
       node tools/download-photos.js
       node tools/download-photos.js --direct    (skip the proxy)
       node tools/download-photos.js --proxy     (skip trying direct)
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets/js/data/photos.js');
const REMOTE = path.join(ROOT, 'assets/js/data/photos.remote.js');
const IMGDIR = path.join(ROOT, 'assets/img/places');
const REL = 'assets/img/places';
const UA = 'MeridianAtlas/1.0 (personal travel atlas; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';
const CONCURRENCY = 4;
const FORCE = process.argv.includes('--direct') ? 'direct' : process.argv.includes('--proxy') ? 'proxy' : '';

/* ---- find the real (web-URL) source of truth ----
   Prefer photos.remote.js if it exists: that is the un-rewritten
   original, so re-running after a partial download starts clean. */
function loadPHOTOS(file){
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, 'utf8') + '\n;globalThis.__PH = PHOTOS;', ctx);
  return ctx.__PH;
}
let srcFile = fs.existsSync(REMOTE) ? REMOTE : DATA;
const PHOTOS = loadPHOTOS(srcFile);
const ids = Object.keys(PHOTOS);
if (!ids.length){ console.error('No photo entries found.'); process.exit(1); }

/* is the source already localised? only a problem if there is no remote backup */
if (!fs.existsSync(REMOTE) && /^assets\/img\//.test(PHOTOS[ids[0]].s || '')){
  console.error('photos.js already points at local files and no photos.remote.js backup exists.');
  console.error('Nothing to pull from. If you meant to re-download, restore the web-URL version first.');
  process.exit(1);
}
console.log('Source of image URLs: ' + path.basename(srcFile));

fs.mkdirSync(IMGDIR, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ORDER = FORCE === 'direct' ? ['direct'] : FORCE === 'proxy' ? ['proxy'] : ['direct', 'proxy'];
let flipped = false;

function proxify(url){ return 'https://wsrv.nl/?url=' + url.replace(/^https?:\/\//, '') + '&n=-1'; }

async function tryFetch(url, ms){
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), ms || 12000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'image/*' }, signal: ctl.signal });
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    return buf.length > 1000 ? buf : null;
  } catch(e){ return null; }
  finally { clearTimeout(to); }
}

function extFor(buf){
  if (buf[0] === 0x89 && buf[1] === 0x50) return '.png';
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[8] === 0x57) return '.webp';
  return '.jpg';
}

/* download one url to <base><ext>; returns the saved relative path or null */
async function grab(url, base){
  for (const e of ['.jpg', '.png', '.webp'])              // already there?
    if (fs.existsSync(path.join(IMGDIR, base + e))) return REL + '/' + base + e;

  for (const method of ORDER){
    const u = method === 'direct' ? url : proxify(url);
    let buf = null;
    for (let i = 0; i < 2 && !buf; i++){ buf = await tryFetch(u); if (!buf) await sleep(400); }
    if (buf){
      // once the proxy rescues a direct failure, prefer it for the rest
      if (method === 'proxy' && !flipped && ORDER[0] === 'direct'){ ORDER = ['proxy', 'direct']; flipped = true; }
      const file = base + extFor(buf);
      fs.writeFileSync(path.join(IMGDIR, file), buf);
      return REL + '/' + file;
    }
  }
  return null;
}

(async function main(){
  // back up the web-URL version once, before we rewrite photos.js
  if (!fs.existsSync(REMOTE)){ fs.writeFileSync(REMOTE, fs.readFileSync(srcFile, 'utf8'));
    console.log('Backed up the web-URL version to photos.remote.js'); }

  console.log('Fetching ' + ids.length + ' places (two sizes each). Trying: ' + ORDER.join(' then ') + '.\n');

  const out = {};
  let i = 0, localHero = 0, stillRemote = 0;

  async function worker(){
    while (i < ids.length){
      const id = ids[i++]; const p = PHOTOS[id];
      const hero  = await grab(p.s, id + '-h');
      const thumb = await grab(p.t, id + '-t') || hero;
      out[id] = {
        t: thumb || p.t, s: hero || p.s, f: hero || p.f || p.s,     // local if we got it, else keep the web URL
        by: p.by || '', lic: p.lic || '', u: p.u || '', src: p.src || 'wikimedia'
      };
      if (hero){ localHero++; } else { stillRemote++; }
      const n = localHero + stillRemote;
      if (n % 25 === 0) console.log('  ' + n + '/' + ids.length + '  (' + localHero + ' local, ' + stillRemote + ' still web)');
      await sleep(60);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  /* rewrite photos.js: local where we have it, web URL where we do not */
  const banner = '/* ===========================================================\n'
    + '   PHOTOS — GENERATED. Images that downloaded live under\n'
    + '   assets/img/places/ and load from disk. Any that could not be\n'
    + '   fetched keep their web URL and fall back to hotlinking, so\n'
    + '   this file is always usable. Re-run tools/download-photos.js\n'
    + '   to pick up the rest. Web-URL original: photos.remote.js.\n'
    + '   =========================================================== */\n';
  fs.writeFileSync(DATA, banner + 'const PHOTOS = ' + JSON.stringify(out) + ';\n'
    + 'function photoLocal(id){ return (typeof PHOTOS!=="undefined" && PHOTOS[id]) || null; }\n');

  const lines = ['MERIDIAN — PHOTO CREDITS', '',
    'Reused under licences that permit reuse, commercial included.',
    'Attribution is required for the CC BY and CC BY-SA images.', ''];
  Object.keys(out).sort().forEach(id => { const p = out[id];
    lines.push(id, '   author : ' + (p.by || '(not stated)'), '   licence: ' + (p.lic || '(see source)'), '   source : ' + (p.u || ''), ''); });
  fs.writeFileSync(path.join(IMGDIR, 'CREDITS.txt'), lines.join('\n'));

  let bytes = 0, files = 0;
  for (const f of fs.readdirSync(IMGDIR)){ if (f === 'CREDITS.txt') continue; bytes += fs.statSync(path.join(IMGDIR, f)).size; files++; }
  console.log('\nDone.');
  console.log('  downloaded local : ' + localHero + ' / ' + ids.length + ' places  (' + files + ' files, ' + (bytes/1048576).toFixed(1) + ' MB)');
  console.log('  still on the web : ' + stillRemote + ' (these keep hotlinking)');
  if (stillRemote > localHero){
    console.log('\n  Most images still failed. The proxy may be blocked too. Try, on this machine:');
    console.log('     curl -I "https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/1/17/Birmingham%2C_Alabama.jpg/480px-Birmingham%2C_Alabama.jpg"');
    console.log('  If that hangs or errors, the block is on your whole network (DNS filter / antivirus / VPN).');
  } else {
    console.log('\n  Reload the site — the downloaded pictures now load from disk.');
  }
})();
