#!/usr/bin/env node
/* ===========================================================
   FIX-PHOTOS

   Two jobs, because they are the same job: find the places whose
   picture is missing, and the places whose picture is wrong.

   "Wrong" is not a matter of taste. Wikipedia's lead image for a
   town is often a montage, a locator map, a flag or a logo, and a
   few of them are simply the wrong article's picture — Moab is
   currently illustrated with a map of ancient Israel. Those are
   detectable, and this finds them.

   For every place that needs help it gathers candidates from, in
   order of how likely they are to be good:

     1. the images on the place's own Wikipedia article,
     2. Wikimedia Commons photographs taken within a few miles of
        the place's coordinates,
     3. Flickr, restricted to the licences that allow reuse,
     4. Mapillary street-level imagery, which has something almost
        everywhere even when nothing else does.

   It never overwrites anything on its own. It writes a candidate
   file and a review page; you pick, and it writes the new photos.js
   from your picks. A thousand pictures nobody looked at is how you
   end up with a map of Israel on Moab.

   Run:
     node tools/fix-photos.js                      audit only
     node tools/fix-photos.js --fetch              gather candidates
     node tools/fix-photos.js --fetch --flickr=KEY --mapillary=TOKEN
     node tools/fix-photos.js --apply=tools/out/picks.json

   Flickr key:   https://www.flickr.com/services/apps/create/apply
   Mapillary:    https://www.mapillary.com/dashboard/developers
   Both are free and neither is required.
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT  = path.join(__dirname, 'out');
const UA   = 'MeridianAtlas/1.0 (personal travel atlas; contact via site)';

const argv = process.argv.slice(2);
const arg = n => { const h = argv.find(a => a.startsWith('--' + n + '=')); return h ? h.split('=').slice(1).join('=') : ''; };
const has = n => argv.includes('--' + n);

/* ---------- load the atlas ---------- */
function loadData(){
  const ctx = { console };
  vm.createContext(ctx);
  const read = f => fs.readFileSync(path.join(ROOT, 'assets/js/data', f), 'utf8');
  vm.runInContext(read('places.js') + ';globalThis.PLACES=PLACES;', ctx);
  vm.runInContext(read('photos.js') + ';globalThis.PHOTOS=PHOTOS;', ctx);
  return { PLACES: ctx.PLACES, PHOTOS: ctx.PHOTOS };
}

/* ---------- what counts as a bad picture ---------- */
const JUNK = /(montage|collage|composite|locator|_map[_.]|map_of|topographic|flag_|_flag|seal_|_seal|logo|coat_of_arms|banner|insignia|emblem|symbol|diagram|chart|plaque|signpost|wikimedia|commons-logo)/i;
const NOT_A_PHOTO = /\.(svg|gif|tif|tiff|pdf|webm|ogv)$/i;
const GOOD_WORD = /(skyline|aerial|downtown|panorama|view|overlook|vista|sunset|sunrise|falls|canyon|trail|lake|river|beach|coast|harbor|harbour|bridge|mountain|peak|valley|dunes|arch|bay|park|street|square|plaza|historic)/i;

function fileOf(url){
  try { return decodeURIComponent(String(url).split('/').pop()); } catch(e){ return String(url); }
}

/* Why this entry needs attention, or '' if it is fine. */
function faultOf(entry){
  if (!entry || !entry.s) return 'missing';
  const f = fileOf(entry.s);
  if (NOT_A_PHOTO.test(f)) return 'not a photograph (' + f.split('.').pop() + ')';
  if (JUNK.test(f)) return 'montage, map, logo or emblem';
  if (/panorama/i.test(f)) return 'panorama — crops badly in a card';
  return '';
}

/* ---------- small fetch helpers ---------- */
async function getJSON(url, ms){
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), ms || 20000);
  try {
    const r = await fetch(url, { signal: ctl.signal, headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
    clearTimeout(to);
    if (!r.ok) return null;
    return await r.json();
  } catch(e){ clearTimeout(to); return null; }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- candidate sources ---------- */

/* 1 — the images actually on the place's article */
async function fromArticle(place){
  const title = place.kind === 'city' ? place.name + ', ' + place.state : place.name;
  const j = await getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json'
    + '&generator=images&gimlimit=30&titles=' + encodeURIComponent(title)
    + '&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&iiurlwidth=1200');
  const pages = j && j.query && j.query.pages;
  if (!pages) return [];
  return Object.values(pages).map(p => {
    const ii = p.imageinfo && p.imageinfo[0];
    if (!ii) return null;
    const meta = ii.extmetadata || {};
    return {
      source: 'wikipedia-article',
      file: String(p.title || '').replace(/^File:/, ''),
      url: ii.url, thumb: ii.thumburl || ii.url,
      w: ii.width, h: ii.height,
      by: meta.Artist ? String(meta.Artist.value).replace(/<[^>]+>/g, '').trim().slice(0, 70) : '',
      lic: meta.LicenseShortName ? meta.LicenseShortName.value : '',
      page: ii.descriptionurl || ''
    };
  }).filter(Boolean);
}

/* 2 — photographs taken at the place, which is a different question
      from photographs filed under its name */
async function fromCommonsNear(place){
  const j = await getJSON('https://commons.wikimedia.org/w/api.php?action=query&format=json'
    + '&generator=geosearch&ggscoord=' + place.lat + '%7C' + place.lon
    + '&ggsradius=6000&ggslimit=25&ggsnamespace=6'
    + '&prop=imageinfo&iiprop=url%7Csize%7Cextmetadata&iiurlwidth=1200');
  const pages = j && j.query && j.query.pages;
  if (!pages) return [];
  return Object.values(pages).map(p => {
    const ii = p.imageinfo && p.imageinfo[0];
    if (!ii) return null;
    const meta = ii.extmetadata || {};
    return {
      source: 'commons-nearby',
      file: String(p.title || '').replace(/^File:/, ''),
      url: ii.url, thumb: ii.thumburl || ii.url,
      w: ii.width, h: ii.height,
      by: meta.Artist ? String(meta.Artist.value).replace(/<[^>]+>/g, '').trim().slice(0, 70) : '',
      lic: meta.LicenseShortName ? meta.LicenseShortName.value : '',
      page: ii.descriptionurl || ''
    };
  }).filter(Boolean);
}

/* 3 — Openverse: a free, keyless aggregator of openly-licensed
      images. It indexes the Creative Commons photos on Flickr, so
      it does Flickr's old job without the paid account. */
async function fromOpenverse(place){
  const q = place.name + ' ' + place.state;
  const j = await getJSON('https://api.openverse.org/v1/images/?format=json'
    + '&q=' + encodeURIComponent(q) + '&page_size=12&mature=false'
    + '&license_type=all-cc,commercial');
  const res = j && j.results;
  if (!res) return [];
  return res.filter(x => x.url).map(x => ({
    source: 'openverse',
    file: (x.title || 'openverse') + '.jpg',
    url: x.url, thumb: x.thumbnail || x.url,
    w: x.width || 0, h: x.height || 0,
    by: x.creator || '',
    lic: ((x.license || '') + ' ' + (x.license_version || '')).toUpperCase().trim(),
    page: x.foreign_landing_url || x.url
  }));
}

/* 4 — Flickr, limited to the licences that allow reuse with credit.
      Kept for anyone who has a key, but no longer required — Openverse
      covers the same photos. */
const FLICKR_LIC = { '4':'CC BY 2.0', '5':'CC BY-SA 2.0', '9':'CC0', '10':'Public Domain' };
async function fromFlickr(place, key){
  if (!key) return [];
  const j = await getJSON('https://www.flickr.com/services/rest/?method=flickr.photos.search'
    + '&api_key=' + key + '&lat=' + place.lat + '&lon=' + place.lon + '&radius=6&radius_units=km'
    + '&license=' + Object.keys(FLICKR_LIC).join(',')
    + '&sort=interestingness-desc&content_type=1&media=photos'
    + '&extras=url_l,url_c,owner_name,license,o_dims&per_page=12&format=json&nojsoncallback=1');
  const ph = j && j.photos && j.photos.photo;
  if (!ph) return [];
  return ph.filter(p => p.url_l || p.url_c).map(p => ({
    source: 'flickr',
    file: (p.title || 'flickr-' + p.id) + '.jpg',
    url: p.url_l || p.url_c, thumb: p.url_c || p.url_l,
    w: +(p.width_l || p.width_c || 1024), h: +(p.height_l || p.height_c || 768),
    by: p.ownername || '', lic: FLICKR_LIC[String(p.license)] || 'CC',
    page: 'https://www.flickr.com/photos/' + p.owner + '/' + p.id
  }));
}

/* 5 — Mapillary, which has a street-level picture of almost anywhere */
async function fromMapillary(place, token){
  if (!token) return [];
  const d = 0.02;
  const bbox = [place.lon - d, place.lat - d, place.lon + d, place.lat + d].join(',');
  const j = await getJSON('https://graph.mapillary.com/images?access_token=' + token
    + '&fields=id,thumb_2048_url,thumb_1024_url,captured_at&bbox=' + bbox + '&limit=8');
  const data = j && j.data;
  if (!data) return [];
  return data.filter(x => x.thumb_2048_url || x.thumb_1024_url).map(x => ({
    source: 'mapillary',
    file: 'mapillary-' + x.id + '.jpg',
    url: x.thumb_2048_url || x.thumb_1024_url,
    thumb: x.thumb_1024_url || x.thumb_2048_url,
    w: 2048, h: 1152,
    by: 'Mapillary contributor', lic: 'CC BY-SA 4.0',
    page: 'https://www.mapillary.com/app/?pKey=' + x.id
  }));
}

/* ---------- scoring ---------- */
function score(c, place){
  if (!c.url || NOT_A_PHOTO.test(c.file)) return -999;
  let s = 0;
  const f = c.file;

  if (JUNK.test(f)) s -= 60;
  if (GOOD_WORD.test(f)) s += 12;

  /* the place's own name in the file name is the strongest signal */
  const words = place.name.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 3);
  const low = f.toLowerCase();
  const hits = words.filter(w => low.includes(w)).length;
  if (words.length) s += 26 * (hits / words.length);

  /* a usable shape and size for a hero and a card */
  const w = c.w || 0, h = c.h || 1, ratio = w / h;
  if (w >= 1600) s += 14; else if (w >= 1100) s += 8; else if (w < 800) s -= 18;
  if (ratio >= 1.25 && ratio <= 2.1) s += 14;
  else if (ratio > 3.2) s -= 25;                 /* a panorama crops to a stripe */
  else if (ratio < 0.85) s -= 12;                /* portrait fits nothing here */

  /* prefer sources in the order that has worked out best */
  s += ({ 'wikipedia-article': 10, 'commons-nearby': 7, openverse: 5, flickr: 5, mapillary: 1 })[c.source] || 0;
  if (/\.png$/i.test(f)) s -= 6;
  if (!c.lic) s -= 8;
  return Math.round(s);
}

/* ---------- the audit ---------- */
function audit(PLACES, PHOTOS){
  const rows = [];
  Object.keys(PLACES).forEach(id => {
    const p = PLACES[id];
    const fault = faultOf(PHOTOS[id]);
    if (!fault) return;
    rows.push({
      id: id, name: p[0], state: p[1], kind: p[2], lat: p[3], lon: p[4], prom: p[5],
      fault: fault,
      current: PHOTOS[id] ? { url: PHOTOS[id].s, file: fileOf(PHOTOS[id].s),
                              by: PHOTOS[id].by, lic: PHOTOS[id].lic, page: PHOTOS[id].u } : null
    });
  });
  /* the ones people actually look at, first */
  rows.sort((a, b) => (b.prom || 0) - (a.prom || 0));
  return rows;
}

/* ---------- writing photos.js back out ---------- */
function writePhotos(PHOTOS){
  const head = fs.readFileSync(path.join(ROOT, 'assets/js/data/photos.js'), 'utf8')
    .split('const PHOTOS =')[0];
  const body = 'const PHOTOS = ' + JSON.stringify(PHOTOS) + ';\n\n'
    + 'function photoLocal(id){ return PHOTOS[id] || null; }\n';
  fs.writeFileSync(path.join(ROOT, 'assets/js/data/photos.js'), head + body);
}

/* ---------- main ---------- */
(async () => {
  const { PLACES, PHOTOS } = loadData();
  const rows = audit(PLACES, PHOTOS);

  const byFault = {};
  rows.forEach(r => byFault[r.fault] = (byFault[r.fault] || 0) + 1);
  console.log('\nMeridian photo audit');
  console.log('  places           ' + Object.keys(PLACES).length);
  console.log('  with a photo     ' + Object.keys(PHOTOS).length);
  console.log('  needing work     ' + rows.length);
  Object.keys(byFault).sort().forEach(k => console.log('      ' + String(byFault[k]).padStart(4) + '  ' + k));
  console.log('');
  rows.slice(0, 12).forEach(r =>
    console.log('  ' + r.id.padEnd(42) + r.fault + (r.current ? '  ::  ' + r.current.file : '')));
  if (rows.length > 12) console.log('  … and ' + (rows.length - 12) + ' more');

  /* --- apply a set of picks --- */
  const applyFile = arg('apply');
  if (applyFile){
    const picks = JSON.parse(fs.readFileSync(applyFile, 'utf8'));
    let n = 0;
    Object.keys(picks).forEach(id => {
      const c = picks[id];
      if (!c || !c.url) return;
      PHOTOS[id] = { t: c.url, s: c.url, f: c.url, by: c.by || '', lic: c.lic || '',
                     u: c.page || '', src: c.source === 'flickr' ? 'flickr'
                       : c.source === 'mapillary' ? 'mapillary' : 'wikimedia' };
      n++;
    });
    writePhotos(PHOTOS);
    console.log('\nApplied ' + n + ' picks to assets/js/data/photos.js');
    console.log('Bump ?v= in index.html so browsers pick it up.');
    return;
  }

  if (!has('fetch')){
    console.log('\nRun again with --fetch to gather replacements:');
    console.log('  node tools/fix-photos.js --fetch');
    console.log('  node tools/fix-photos.js --fetch --flickr=KEY --mapillary=TOKEN');
    return;
  }

  /* --- gather candidates --- */
  fs.mkdirSync(OUT, { recursive: true });
  const flickr = arg('flickr'), mapillary = arg('mapillary') || process.env.MAPILLARY_TOKEN || '';
  const limit = +arg('limit') || rows.length;
  const work = rows.slice(0, limit);

  console.log('\nGathering candidates for ' + work.length + ' places'
    + (flickr ? ' (+ Flickr)' : '') + (mapillary ? ' (+ Mapillary)' : '') + '…\n');

  const out = [];
  for (let i = 0; i < work.length; i++){
    const r = work[i];
    const place = { name: r.name, state: r.state, kind: r.kind, lat: r.lat, lon: r.lon };
    let cands = [];
    try {
      cands = cands.concat(await fromArticle(place));
      await sleep(260);
      cands = cands.concat(await fromCommonsNear(place));
      await sleep(260);
      cands = cands.concat(await fromOpenverse(place));
      await sleep(260);
      if (flickr){ cands = cands.concat(await fromFlickr(place, flickr)); await sleep(260); }
      if (mapillary && cands.length < 3){
        cands = cands.concat(await fromMapillary(place, mapillary)); await sleep(260);
      }
    } catch(e){ /* one bad place is not a reason to stop */ }

    const seen = {};
    cands = cands.filter(c => { if (seen[c.url]) return false; seen[c.url] = 1; return true; })
                 .map(c => Object.assign(c, { score: score(c, place) }))
                 .filter(c => c.score > -100)
                 .sort((a, b) => b.score - a.score)
                 .slice(0, 8);

    out.push(Object.assign({}, r, { candidates: cands }));
    process.stdout.write('  ' + String(i + 1).padStart(4) + '/' + work.length + '  '
      + r.id.padEnd(44) + cands.length + ' candidates\n');
  }

  fs.writeFileSync(path.join(OUT, 'photo-candidates.json'), JSON.stringify(out, null, 1));
  console.log('\nWrote tools/out/photo-candidates.json');
  console.log('Open tools/photo-review.html in a browser, load that file, pick the');
  console.log('good ones, download picks.json, then:');
  console.log('  node tools/fix-photos.js --apply=tools/out/picks.json');
})();
