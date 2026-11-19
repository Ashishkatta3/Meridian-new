#!/usr/bin/env node
/* ===========================================================
   photos-import.js — file photographs you downloaded by hand

   Pexels has paused new API keys, so the automatic route is shut for
   now. This is the manual one: drop whatever you downloaded into a
   folder, point this at it, and it works out which place each picture
   belongs to, checks it is big enough, makes the two sizes the site
   draws, and files them.

     node tools/photos-import.js --from=~/Downloads/meridian-photos
         Shows the plan and changes nothing. Always run this first.

     node tools/photos-import.js --from=~/Downloads/meridian-photos --apply
         Does it.

   NAMING. The matcher is forgiving — "grand canyon.jpg",
   "Grand-Canyon-National-Park.jpeg" and "denver skyline 2.png" all
   land correctly. Where it cannot be sure it says so rather than
   guessing, and the fix is to rename the file to the place's id
   (`node tools/photos-import.js --ids` prints them all).

   CREDIT. Put a credits.csv next to the pictures and it will be read:

       file,photographer,source,url
       denver.jpg,Jane Doe,Unsplash,https://unsplash.com/photos/xyz

   Anything without a line is filed as "Photographer unknown", which
   is legal for Pexels, Pixabay and Unsplash — none of them require
   attribution — but it is nicer to fill in, and PHOTO-CREDITS.md
   lists the gaps so you can.

   RESIZING. Uses sharp if you have it, ImageMagick if you do not, and
   if you have neither it copies the file into both slots and tells
   you. Nothing here needs installing to work.
   =========================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT     = path.resolve(__dirname, '..');
const DATA     = path.join(ROOT, 'assets', 'js', 'data');
const PHOTODIR = path.join(ROOT, 'assets', 'photos');
const OUT      = path.join(__dirname, 'out');
const MANIFEST = path.join(OUT, 'photos-hq.json');

const argv = process.argv.slice(2);
const arg  = n => { const h = argv.find(a => a.startsWith('--' + n + '=')); return h ? h.split('=').slice(1).join('=') : ''; };
const has  = n => argv.includes('--' + n);

const SIZES = (arg('sizes') || '1600,640').split(',').map(n => +n.trim()).filter(Boolean);
const MIN_WIDTH = +arg('min-width') || 1400;

/* ---------- the atlas ---------- */
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

/* ===========================================================
   HOW BIG IS IT?

   Read the width and height straight out of the file header. This is
   deliberately dependency-free: the whole point of the run is
   resolution, so the tool has to be able to say "that one is only
   900 pixels wide, download a bigger one" even on a machine with no
   image library installed at all.
   =========================================================== */
function imageSize(file){
  let fd;
  try {
    fd = fs.openSync(file, 'r');
    const buf = Buffer.alloc(65536);
    const n = fs.readSync(fd, buf, 0, 65536, 0);
    fs.closeSync(fd); fd = null;

    /* PNG: IHDR is always first, width and height at a fixed offset */
    if (n > 24 && buf.toString('ascii', 1, 4) === 'PNG')
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'png' };

    /* GIF */
    if (n > 10 && buf.toString('ascii', 0, 3) === 'GIF')
      return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8), type: 'gif' };

    /* WebP, which has three different layouts */
    if (n > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP'){
      const fourcc = buf.toString('ascii', 12, 16);
      if (fourcc === 'VP8 ')
        return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff, type: 'webp' };
      if (fourcc === 'VP8L'){
        const b = buf.readUInt32LE(21);
        return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1, type: 'webp' };
      }
      if (fourcc === 'VP8X')
        return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
                 h: (buf.readUIntLE(27, 3) & 0xffffff) + 1, type: 'webp' };
    }

    /* JPEG: walk the markers to the start-of-frame, which is the only
       place the real dimensions live */
    if (n > 4 && buf[0] === 0xFF && buf[1] === 0xD8){
      let i = 2;
      while (i < n - 9){
        if (buf[i] !== 0xFF){ i++; continue; }
        const marker = buf[i + 1];
        /* SOF0..SOF15, skipping DHT (C4), JPG (C8) and DAC (CC) */
        if (marker >= 0xC0 && marker <= 0xCF
            && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC)
          return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7), type: 'jpeg' };
        const len = buf.readUInt16BE(i + 2);
        if (len < 2) break;
        i += 2 + len;
      }
    }
  } catch(e){ if (fd) try { fs.closeSync(fd); } catch(_){} }
  return null;
}

/* ===========================================================
   RESIZING, with whatever is on the machine
   =========================================================== */
let RESIZER = null;
function resizer(){
  if (RESIZER) return RESIZER;
  try { require('sharp'); RESIZER = 'sharp'; return RESIZER; } catch(e){}
  for (const cmd of ['magick', 'convert']){
    try {
      execFileSync(cmd, ['-version'], { stdio: 'ignore' });
      RESIZER = cmd; return RESIZER;
    } catch(e){}
  }
  RESIZER = 'copy';
  return RESIZER;
}

function makeSize(src, dest, width){
  const how = resizer();
  try {
    if (how === 'sharp'){
      const sharp = require('sharp');
      /* withoutEnlargement: a 1200px source must not be blown up to
         1600 and called a hero — it just stays 1200 */
      return sharp(src).rotate()
        .resize({ width: width, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(dest).then(() => ({ ok: true }), e => ({ error: e.message }));
    }
    if (how === 'magick' || how === 'convert'){
      execFileSync(how, [src, '-auto-orient', '-resize', width + 'x>',
                         '-quality', '82', dest], { stdio: 'ignore' });
      return Promise.resolve({ ok: true });
    }
    fs.copyFileSync(src, dest);
    return Promise.resolve({ ok: true, copied: true });
  } catch(e){ return Promise.resolve({ error: e.message }); }
}

/* ===========================================================
   MATCHING A FILENAME TO A PLACE
   =========================================================== */
const STOP = new Set(['national','park','state','city','the','of','and','a','an',
                      'photo','photos','image','img','pexels','unsplash','pixabay',
                      'wallpaper','hd','4k','jpg','jpeg','png','webp','download',
                      'scaled','copy','final','edit','new']);

function tokens(s){
  return String(s).toLowerCase()
    .replace(/[‘’']/g, '')
    .split(/[^a-z0-9]+/)
    .filter(t => t && !/^\d+$/.test(t) && !STOP.has(t));
}

function buildIndex(PLACES, PG){
  return Object.keys(PLACES).map(id => {
    const p = PG(id);
    return { id, name: p.name, abbr: p.abbr, kind: p.kind, prom: p.prom || 0,
             toks: new Set(tokens(p.name)), idLow: id.toLowerCase() };
  });
}

function matchFile(base, index){
  const low = base.toLowerCase();

  /* 1. the unambiguous case: the filename starts with the place id */
  const exact = index.filter(e => low === e.idLow || low.startsWith(e.idLow + '-')
                                                  || low.startsWith(e.idLow + '_'));
  if (exact.length === 1) return { pick: exact[0], confidence: 'id', score: 99 };

  /* 2. otherwise score the words */
  const ft = tokens(base);
  if (!ft.length) return { pick: null, confidence: 'none', score: 0 };
  const fset = new Set(ft);

  const scored = index.map(e => {
    if (!e.toks.size) return null;
    let hit = 0;
    e.toks.forEach(t => { if (fset.has(t)) hit++; });
    if (!hit) return null;
    /* every word of the place name present is the strong signal;
       extra words in the filename are harmless noise */
    const cover = hit / e.toks.size;
    let s = cover * 100;
    /* a two-letter state code in the filename disambiguates
       Portland OR from Portland ME */
    if (e.abbr && fset.has(e.abbr.toLowerCase())) s += 25;
    /* when all else ties, the better-known place is the likelier one */
    s += e.prom * 0.4;
    if (cover < 0.5) s -= 35;
    return { e, s: Math.round(s) };
  }).filter(Boolean).sort((a, b) => b.s - a.s);

  if (!scored.length) return { pick: null, confidence: 'none', score: 0 };

  const top = scored[0], next = scored[1];
  /* a clear winner, or two plausible ones we must not choose between */
  if (top.s >= 70 && (!next || top.s - next.s >= 12))
    return { pick: top.e, confidence: 'good', score: top.s };
  if (top.s >= 70 && next)
    return { pick: null, confidence: 'ambiguous', score: top.s,
             between: scored.slice(0, 3).map(x => x.e) };
  return { pick: null, confidence: 'weak', score: top.s,
           between: scored.slice(0, 3).map(x => x.e) };
}

/* ---------- credits.csv ---------- */
function readCredits(dir){
  const p = ['credits.csv', 'credits.txt'].map(f => path.join(dir, f)).find(f => fs.existsSync(f));
  if (!p) return {};
  const out = {};
  fs.readFileSync(p, 'utf8').split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    if (i === 0 && /^file\s*,/i.test(line)) return;          /* header */
    /* split on commas not inside quotes */
    const cells = (line.match(/("([^"]|"")*"|[^,]*)(,|$)/g) || [])
      .map(c => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"').trim());
    if (!cells[0]) return;
    out[cells[0].toLowerCase()] = { by: cells[1] || '', source: cells[2] || '', url: cells[3] || '' };
  });
  return out;
}

/* the same rule the states page uses to choose a state's face */
function stateFacesLocal(PLACES, PG){
  const byState = {};
  Object.keys(PLACES).forEach(id => {
    const p = PG(id); if (!p || !p.abbr) return;
    (byState[p.abbr] = byState[p.abbr] || []).push(id);
  });
  const faces = {};
  Object.keys(byState).forEach(ab => {
    faces[byState[ab].sort((a, b) => (PG(b).prom || 0) - (PG(a).prom || 0))[0]] = ab;
  });
  return faces;
}

/* Keep whatever the generated file had after the PHOTOS object —
   photoLocal() lives there, and rewriting the file without it would
   silently stop every baked photograph from being found. */
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

function writeCredits(manifest, PG){
  const ids = Object.keys(manifest).sort();
  const row = id => {
    const m = manifest[id], p = PG(id);
    const who = m.by && m.by !== 'Photographer unknown' ? m.by : '_unknown_';
    return '| ' + (p ? p.name : id) + ' | ' + who + ' | ' + (m.source || '—') + ' | '
      + (m.page ? '[photo](' + m.page + ')' : '—') + ' |';
  };
  const missing = ids.filter(id => !manifest[id].by || manifest[id].by === 'Photographer unknown');
  fs.writeFileSync(path.join(ROOT, 'PHOTO-CREDITS.md'),
    '# Photo credits\n\nEvery photograph Meridian hosts itself. Generated by the tools in\n'
    + '`tools/` — do not edit by hand.\n\n'
    + 'Pexels, Pixabay and Unsplash all allow download, hosting and commercial use\n'
    + 'without permission, and none of them require attribution. The credits are here\n'
    + 'because the photographers earned them.\n\n'
    + (missing.length ? '> ' + missing.length + ' photograph(s) have no photographer recorded. '
        + 'Add them to a `credits.csv` and re-import to fill these in.\n\n' : '')
    + '| Place | Photographer | Source | Link |\n|---|---|---|---|\n'
    + ids.map(row).join('\n') + '\n');
}

/* ===========================================================
   THE RUN
   =========================================================== */
async function main(){
  const { PLACES, PHOTOS, placeGet: PG } = loadData();
  if (typeof PG !== 'function'){ console.error('places.js did not yield placeGet'); process.exit(1); }
  const index = buildIndex(PLACES, PG);

  /* ---------- --verify ----------

     "Some places use my new pictures and some don't" is almost always
     one of four things, and they are hard to tell apart by looking at
     the site. This says which, per place:

       local      photos.js points at assets/photos/ and the file is
                  there — this one is yours
       BROKEN     photos.js points at a local file that is NOT on
                  disk, so the card falls back to a grey box. Usually
                  means assets/photos/ was not deployed
       remote     still on Wikimedia — the import never matched a
                  file to it, so nothing changed
       none       no photograph at all                              */
  if (has('verify')){
    const rows = Object.keys(PLACES).map(id => {
      const e = PHOTOS[id];
      const p = PG(id);
      if (!e || !e.s) return { id, p, state: 'none' };
      if (!/^assets\/photos\//.test(e.s)) return { id, p, state: 'remote' };
      const missing = SIZES.filter(w => !fs.existsSync(path.join(PHOTODIR, id + '-' + w + '.jpg')));
      if (missing.length) return { id, p, state: 'BROKEN', missing };
      const dim = imageSize(path.join(PHOTODIR, id + '-' + SIZES[0] + '.jpg'));
      return { id, p, state: 'local', dim };
    });

    const by = s => rows.filter(r => r.state === s);
    console.log('\nMeridian — which photographs are yours\n');
    console.log('  local   ' + String(by('local').length).padStart(4) + '  hosted by you, file present');
    console.log('  BROKEN  ' + String(by('BROKEN').length).padStart(4) + '  photos.js points at a file that is not on disk');
    console.log('  remote  ' + String(by('remote').length).padStart(4) + '  still Wikimedia — the import never matched these');
    console.log('  none    ' + String(by('none').length).padStart(4) + '  no photograph at all');

    if (by('BROKEN').length){
      console.log('\n  BROKEN — these show a grey box. Either re-import them, or check that');
      console.log('  assets/photos/ was actually committed and deployed:\n');
      by('BROKEN').slice(0, 30).forEach(r =>
        console.log('      ' + r.id.padEnd(42) + 'missing ' + r.missing.join('px, ') + 'px'));
    }

    const small = by('local').filter(r => r.dim && r.dim.w && r.dim.w < MIN_WIDTH);
    if (small.length){
      console.log('\n  Imported but under ' + MIN_WIDTH + 'px — worth re-downloading bigger:\n');
      small.slice(0, 30).forEach(r => console.log('      ' + r.id.padEnd(42) + r.dim.w + 'px'));
    }

    if (has('todo') || arg('todo')){
      const faces = stateFacesLocal(PLACES, PG);
      const todo = by('remote').concat(by('none'))
        .map(r => Object.assign(r, { tier: faces[r.id] ? 1
          : (r.p.kind === 'city' && (r.p.prom || 0) >= 8) ? 2
          : /^(np|monument|rec|historic)$/.test(r.p.kind) ? 3
          : r.p.kind === 'city' ? 4 : 5 }))
        .sort((a, b) => a.tier - b.tier || (b.p.prom || 0) - (a.p.prom || 0));
      console.log('\n  Still to do, in priority order — download these next:\n');
      todo.slice(0, +arg('todo') || 40).forEach(r =>
        console.log('      ' + String(r.tier) + '  ' + r.id.padEnd(42)
          + r.p.name + (faces[r.id] ? '   (face of ' + faces[r.id] + ')' : '')));
      console.log('\n  Name the files after the ids above and they will match first time.');
    } else {
      console.log('\n  Add --todo to list what to download next, in priority order.');
    }
    return;
  }

  if (has('ids')){
    console.log('\nEvery place id, for renaming a file the matcher could not place.\n');
    index.slice().sort((a, b) => a.id.localeCompare(b.id))
      .forEach(e => console.log('  ' + e.id.padEnd(44) + e.name));
    return;
  }

  let from = arg('from');
  if (!from || has('help')){
    console.log(`
Meridian — photos-import.js

  Files photographs you downloaded by hand into the right slots.

    1  Make a folder and put the pictures in it. Name each one after
       the place — "denver.jpg", "grand canyon.jpg", "Zion National
       Park.jpeg". Download the biggest version offered; anything
       under ${MIN_WIDTH}px wide is flagged.

    2  node tools/photos-import.js --from=~/Downloads/meridian-photos
       Shows what it would do. Changes nothing.

    3  node tools/photos-import.js --from=~/Downloads/meridian-photos --apply

  OPTIONS
    --apply        actually do it (otherwise it is a dry run)
    --ids          print every place id, for renaming a stubborn file
    --min-width=N  what counts as too small (default ${MIN_WIDTH})
    --sizes=A,B    widths to produce (default 1600,640)
    --force        overwrite places that already have a photo file
    --loose        accept weaker name matches (review the plan first)

  CREDIT  — optional credits.csv in the same folder:
      file,photographer,source,url
      denver.jpg,Jane Doe,Unsplash,https://unsplash.com/photos/xyz

  AFTERWARDS  bump ?v= in index.html AND VERSION in sw.js.
`);
    return;
  }

  if (from.startsWith('~')) from = path.join(os.homedir(), from.slice(1));
  from = path.resolve(from);
  if (!fs.existsSync(from)){ console.error('No such folder: ' + from); process.exit(1); }

  const files = fs.readdirSync(from)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (!files.length){ console.error('No .jpg/.png/.webp files in ' + from); process.exit(1); }

  const credits = readCredits(from);
  const how = resizer();

  console.log('\nMeridian — importing photographs\n');
  console.log('  from        ' + from);
  console.log('  pictures    ' + files.length);
  console.log('  credits.csv ' + (Object.keys(credits).length ? Object.keys(credits).length + ' entries' : 'not found'));
  console.log('  resizing    ' + (how === 'copy'
    ? 'NOT AVAILABLE — no sharp, no ImageMagick. Files will be copied at their\n'
      + '              original size into both slots, which works but ships a hero-sized\n'
      + '              image to every card. `npm install sharp` and re-run to fix that.'
    : how));
  console.log('');

  const plan = [];
  files.forEach(f => {
    const full = path.join(from, f);
    const base = f.replace(/\.[^.]+$/, '');
    const m = matchFile(base, index);
    const size = imageSize(full);
    const okConf = m.confidence === 'id' || m.confidence === 'good'
                || (has('loose') && m.confidence === 'ambiguous' && m.pick);
    plan.push({ file: f, full, match: m, size,
                taken: okConf && !!m.pick,
                small: size && size.w && size.w < MIN_WIDTH });
  });

  /* ---- the report ---- */
  const good = plan.filter(p => p.taken);
  const bad  = plan.filter(p => !p.taken);

  good.forEach(p => {
    const dup = PHOTOS[p.match.pick.id] && /^assets\/photos\//.test(PHOTOS[p.match.pick.id].s || '');
    console.log('  ' + (p.file.length > 34 ? p.file.slice(0, 33) + '…' : p.file).padEnd(35)
      + '->  ' + p.match.pick.id.padEnd(40)
      + (p.size ? (p.size.w + 'x' + p.size.h) : 'size unknown')
      + (p.small ? '   TOO SMALL' : '')
      + (dup && !has('force') ? '   (already has one, skipped — use --force)' : ''));
  });

  if (bad.length){
    console.log('\n  Could not place these:\n');
    bad.forEach(p => {
      const m = p.match;
      console.log('  ' + (p.file.length > 34 ? p.file.slice(0, 33) + '…' : p.file).padEnd(35)
        + (m.confidence === 'none' ? 'no match at all'
           : m.confidence === 'ambiguous' ? 'could be several'
           : 'too unsure (score ' + m.score + ')'));
      if (m.between) m.between.forEach(e => console.log('        maybe  ' + e.id.padEnd(42) + e.name));
    });
    console.log('\n  Fix by renaming the file to the place id, e.g. "CO-denver.jpg".');
    console.log('  `node tools/photos-import.js --ids` prints them all.');
  }

  const tooSmall = good.filter(p => p.small);
  if (tooSmall.length){
    console.log('\n  ' + tooSmall.length + ' picture(s) are under ' + MIN_WIDTH + 'px wide. They will still'
      + '\n  be imported, but they are the problem you set out to fix — worth'
      + '\n  downloading bigger versions.');
  }

  if (!has('apply')){
    console.log('\n  Dry run. ' + good.length + ' would be imported, ' + bad.length + ' need a rename.');
    console.log('  Add --apply to do it.');
    return;
  }

  /* ---- do it ---- */
  fs.mkdirSync(PHOTODIR, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};

  let done = 0, skipped = 0, failed = 0;
  console.log('');
  for (const p of good){
    const id = p.match.pick.id;
    const already = PHOTOS[id] && /^assets\/photos\//.test(PHOTOS[id].s || '');
    if (already && !has('force')){ skipped++; continue; }

    let ok = true;
    for (const w of SIZES){
      const dest = path.join(PHOTODIR, id + '-' + w + '.jpg');
      const r = await makeSize(p.full, dest, w);
      if (r.error){ ok = false; console.log('  ! ' + p.file + ' — ' + r.error); break; }
    }
    if (!ok){ failed++; continue; }

    const c = credits[p.file.toLowerCase()] || {};
    PHOTOS[id] = {
      t: 'assets/photos/' + id + '-' + (SIZES[1] || SIZES[0]) + '.jpg',
      s: 'assets/photos/' + id + '-' + SIZES[0] + '.jpg',
      f: 'assets/photos/' + id + '-' + SIZES[0] + '.jpg',
      by: c.by || 'Photographer unknown',
      lic: c.source ? c.source + ' License' : 'Free stock licence',
      u: c.url || '', src: (c.source || 'import').toLowerCase()
    };
    manifest[id] = { source: c.source || 'hand import', by: c.by || 'Photographer unknown',
                     lic: PHOTOS[id].lic, page: c.url || '',
                     origin: p.file, at: new Date().toISOString().slice(0, 10) };
    done++;
    console.log('  imported  ' + id);
  }

  writePhotos(PHOTOS);
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
  writeCredits(manifest, PG);

  console.log('\n  imported ' + done + ', skipped ' + skipped + ' (already had one), failed ' + failed);
  if (how === 'copy')
    console.log('  NOTE: not resized — every card will download a full-size image.');
  console.log('  photos.js updated, PHOTO-CREDITS.md written.');
  console.log('  Now bump ?v= in index.html AND VERSION in sw.js, then deploy.');
}

main().catch(e => { console.error('\n' + e.stack); process.exit(1); });
