#!/usr/bin/env node
/* ===========================================================
   download-photos.js — saves every photo into the project.

   Run tools/fix-photo-urls.js first if photos are not showing in
   the browser. This downloads whatever URLs are in your data.

   IT IS PATIENT ON PURPOSE. Wikimedia rate-limits bulk downloads
   and answers 403 when you go too fast. The fix is not a trick, it
   is manners: a gentle pace, and when a 403 comes, wait and try the
   same image again rather than giving up on it. Left to run it will
   work through the whole set; it just takes a few minutes.

   It downloads the same thumbnail URLs your browser already loads
   successfully, so it mirrors what provably works, and only falls
   back to an image CDN for anything that still will not come.

   Resumable: already-saved files are skipped, so stop and re-run
   freely. Anything it truly cannot get keeps its web URL, so the
   site is always usable.

   Usage (Node 18+), from the meridian folder:
       node tools/download-photos.js
       node tools/download-photos.js --fast    (quicker, more 403s)
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets/js/data/photos.js');
const REMOTE = path.join(ROOT, 'assets/js/data/photos.remote.js');
const IMGDIR = path.join(ROOT, 'assets/img/places');
const REL = 'assets/img/places';
const UA = 'MeridianAtlas/1.0 (personal travel atlas; +https://github.com; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';

/* gentle by default: two at a time, a breath between each. --fast
   doubles up and shortens the pause for people whose network is not
   being throttled. */
const FAST = process.argv.includes('--fast');
const CONCURRENCY = FAST ? 4 : 2;
const PAUSE = FAST ? 120 : 350;              // ms between requests per worker
const BACKOFFS = [4000, 12000, 30000];       // waits after a 403/429 before retrying

function noproto(u){ return u.split('?')[0].replace(/^https?:\/\//, ''); }
const CDN = (u, w) => 'https://wsrv.nl/?url=' + noproto(u) + '&w=' + w + '&output=jpg&q=82&n=-1';

/* ---------- load URLs from whichever file actually has web addresses ---------- */
function loadPHOTOS(file){
  try { const ctx = {}; vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(file, 'utf8') + '\n;globalThis.__PH = PHOTOS;', ctx);
    return ctx.__PH || null;
  } catch(e){ return null; }
}
const webCount = ph => !ph ? -1 : Object.keys(ph).filter(k => /^https?:\/\//.test((ph[k] || {}).s || '')).length;

const fromData = fs.existsSync(DATA) ? loadPHOTOS(DATA) : null;
const fromRemote = fs.existsSync(REMOTE) ? loadPHOTOS(REMOTE) : null;
const nData = webCount(fromData), nRemote = webCount(fromRemote);
let PHOTOS, srcName;
if (nData >= nRemote && nData > 0){ PHOTOS = fromData; srcName = 'photos.js'; }
else if (nRemote > 0){ PHOTOS = fromRemote; srcName = 'photos.remote.js'; }
else { console.error('No web photo URLs in photos.js or photos.remote.js. Run: node tools/fix-photo-urls.js'); process.exit(1); }
const ids = Object.keys(PHOTOS);
if (srcName === 'photos.js') fs.writeFileSync(REMOTE, fs.readFileSync(DATA, 'utf8'));
fs.mkdirSync(IMGDIR, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
let throttleHits = 0, firstHardFail = null;

/* one request, retrying the SAME url on 403/429 with growing waits */
async function get(url){
  for (let attempt = 0; attempt <= BACKOFFS.length; attempt++){
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 30000);
    try {
      const r = await fetch(url, { headers: {
        'User-Agent': UA, 'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9', 'Referer': 'https://en.wikipedia.org/'
      }, signal: ctl.signal });
      clearTimeout(to);
      if (r.ok){ const b = Buffer.from(await r.arrayBuffer()); if (b.length > 1000) return b; return null; }
      if ((r.status === 403 || r.status === 429) && attempt < BACKOFFS.length){
        throttleHits++; await sleep(BACKOFFS[attempt]); continue;        // slow down and try again
      }
      if (!firstHardFail) firstHardFail = { url, status: r.status };
      return null;
    } catch(e){
      clearTimeout(to);
      if (attempt < BACKOFFS.length){ await sleep(BACKOFFS[attempt]); continue; }
      if (!firstHardFail) firstHardFail = { url, status: (e.cause && e.cause.code) || e.name };
      return null;
    }
  }
  return null;
}

function extFor(buf){
  if (buf[0] === 0x89 && buf[1] === 0x50) return '.png';
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[8] === 0x57) return '.webp';
  return '.jpg';
}

/* save thumbUrl to <base>; if it will not come, let the CDN resize
   the original instead */
async function grab(thumbUrl, origUrl, w, base){
  for (const e of ['.jpg', '.png', '.webp'])
    if (fs.existsSync(path.join(IMGDIR, base + e))) return REL + '/' + base + e;

  let buf = thumbUrl ? await get(thumbUrl) : null;
  if (!buf && origUrl) buf = await get(CDN(origUrl, w));
  if (!buf) return null;
  const file = base + extFor(buf);
  fs.writeFileSync(path.join(IMGDIR, file), buf);
  return REL + '/' + file;
}

(async function main(){
  const already = fs.readdirSync(IMGDIR).filter(f => /-h\.(jpg|png|webp)$/.test(f)).length;
  console.log('URLs from ' + srcName + '. ' + ids.length + ' places, ' + already + ' already downloaded.');
  console.log('Pace: ' + CONCURRENCY + ' at a time' + (FAST ? ' (fast)' : ', gentle — this is the patient setting') + '.\n');

  const out = {};
  let i = 0, local = 0, web = 0, done = 0;

  async function worker(){
    while (i < ids.length){
      const id = ids[i++]; const p = PHOTOS[id];
      const orig = p.f || p.s;
      const hero  = await grab(p.s, orig, 1200, id + '-h');
      const thumb = await grab(p.t, orig, 480,  id + '-t') || hero;
      out[id] = { t: thumb || p.t, s: hero || p.s, f: p.f || p.s,
                  by: p.by || '', lic: p.lic || '', u: p.u || '', src: p.src || 'wikimedia' };
      if (hero) local++; else web++;
      if (++done % 25 === 0)
        console.log('  ' + done + '/' + ids.length + '  (' + local + ' local, ' + web + ' still web'
          + (throttleHits ? ', ' + throttleHits + ' throttle-waits' : '') + ')');
      await sleep(PAUSE);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const banner = '/* PHOTOS — GENERATED. Downloaded images are under assets/img/places/\n'
    + '   and load from disk. Any not fetched keep their web URL. Credits: CREDITS.txt. */\n';
  fs.writeFileSync(DATA, banner + 'const PHOTOS = ' + JSON.stringify(out) + ';\n'
    + 'function photoLocal(id){ return (typeof PHOTOS!=="undefined" && PHOTOS[id]) || null; }\n');

  const lines = ['MERIDIAN — PHOTO CREDITS', '', 'Reused under licences that permit reuse, commercial included.',
    'Attribution required for CC BY / CC BY-SA.', ''];
  Object.keys(out).sort().forEach(id => { const p = out[id];
    lines.push(id, '   author : ' + (p.by || '(not stated)'), '   licence: ' + (p.lic || '(see source)'), '   source : ' + (p.u || ''), ''); });
  fs.writeFileSync(path.join(IMGDIR, 'CREDITS.txt'), lines.join('\n'));

  let bytes = 0, files = 0;
  for (const f of fs.readdirSync(IMGDIR)){ if (f === 'CREDITS.txt') continue; bytes += fs.statSync(path.join(IMGDIR, f)).size; files++; }
  console.log('\nDone.');
  console.log('  downloaded : ' + local + ' / ' + ids.length + ' places (' + files + ' files, ' + (bytes / 1048576).toFixed(1) + ' MB)');
  console.log('  still web  : ' + web + (throttleHits ? '   · ' + throttleHits + ' throttle-waits along the way' : ''));
  if (web){
    console.log('\n  ' + web + ' did not come down this run. They still work online.');
    console.log('  Just run it again — it skips what it has and keeps going:');
    console.log('     node tools/download-photos.js');
    if (firstHardFail) console.log('  (a non-throttle failure example: HTTP ' + firstHardFail.status + ')');
  } else {
    console.log('\n  All of them. Reload the site — every picture now comes from disk.');
  }
})();