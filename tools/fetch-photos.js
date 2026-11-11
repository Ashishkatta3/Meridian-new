#!/usr/bin/env node
/* ===========================================================
   fetch-photos.js — run on YOUR computer, after fetch-seed.js.

   The first script got all the TEXT but no photos: Wikipedia's
   summary endpoint only returns an image when a page has a
   "page image" set, and for most articles that field is empty in
   that response, so there was nothing to pick up.

   This script fixes that. It uses the MediaWiki Action API
   (prop=pageimages), which reliably returns each article's lead
   image, then looks that file up on Wikimedia Commons (and, if the
   image lives on English Wikipedia instead, there) for its licence.
   It KEEPS an image only when the licence is free for any use,
   including commercial — CC0, public domain, CC BY, CC BY-SA — and
   records the author and a source link so every photo can be
   credited. Non-commercial (NC) and no-derivatives (ND) are skipped.

   It edits meridian-seed.json IN PLACE and is resumable: it only
   touches places that do not yet have a photo, so stopping and
   re-running is safe and fast.

   Usage (Node 18+):
       cd meridian
       node tools/fetch-photos.js

   No key needed for any of this. It prints, at the end, a tally of
   every licence it saw — so if something still looks low we can see
   why instead of guessing.
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SEED = path.join(ROOT, 'meridian-seed.json');
const UA = 'MeridianAtlas/1.0 (personal travel atlas; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';
const CONCURRENCY = 4;

/* licences that are fine to display on a public, possibly commercial site */
const FREE = /\b(cc0|cc[- ]?by(?!-?nc)(?!-?nd)|public domain|pdm|pd-|gfdl|attribution)\b/i;

/* ---- load places.js for names/kinds ---- */
const src = fs.readFileSync(path.join(ROOT, 'assets/js/data/places.js'), 'utf8') + '\n;globalThis.__P = PLACES;';
const ctx = {}; vm.createContext(ctx); vm.runInContext(src, ctx);
const PLACES = ctx.__P;

const STATE_FULL = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',
  DC:'Washington, D.C.',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',
  KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',
  MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',
  NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',
  SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',
  WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function getJSON(url, tries = 3){
  for (let i = 0; i < tries; i++){
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
      if (r.status === 404) return null;
      if (r.status === 429 || r.status >= 500){ await sleep(1500 * (i + 1)); continue; }
      if (!r.ok) return null;
      return await r.json();
    } catch (e){ await sleep(1000 * (i + 1)); }
  }
  return null;
}
const strip = h => (h || '').replace(/<[^>]*>/g, '').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;/g,"'").replace(/\s+/g,' ').trim();

function titles(id){
  const [name, abbr, kind] = PLACES[id];
  const st = STATE_FULL[abbr] || abbr;
  return kind === 'city' ? [name + ', ' + st, name] : [name, name + ' (' + st + ')', name + ', ' + st];
}

/* lead image filename (+ original url) for the first title that resolves */
async function leadImage(id){
  for (const t of titles(id)){
    const u = 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1'
      + '&prop=pageimages&piprop=original|name&titles=' + encodeURIComponent(t);
    const j = await getJSON(u);
    const p = j && j.query && j.query.pages && j.query.pages[0];
    if (!p || p.missing) continue;
    if (p.pageimage) return { file: p.pageimage, original: p.original || null, title: p.title };
    return { file: null, original: null, title: p.title };   // page exists but has no lead image
  }
  return { file: null, original: null, title: null };
}

/* licence + credit for a file; tries Commons first, then English Wikipedia */
async function fileInfo(file){
  for (const host of ['commons.wikimedia.org', 'en.wikipedia.org']){
    const u = 'https://' + host + '/w/api.php?action=query&format=json&formatversion=2'
      + '&prop=imageinfo&iiprop=extmetadata|url&iiurlwidth=800&titles=' + encodeURIComponent('File:' + file);
    const j = await getJSON(u);
    const p = j && j.query && j.query.pages && j.query.pages[0];
    const ii = p && p.imageinfo && p.imageinfo[0];
    if (!ii) continue;
    const md = ii.extmetadata || {};
    return {
      license: (md.LicenseShortName && md.LicenseShortName.value) || (md.License && md.License.value) || '',
      author: strip(md.Artist && md.Artist.value).slice(0, 140) || strip(md.Credit && md.Credit.value).slice(0, 140),
      thumb: ii.thumburl || null,
      full: ii.url || null,
      source: ii.descriptionurl || ('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file.replace(/ /g, '_')))
    };
  }
  return null;
}

(async function main(){
  let seed;
  try { seed = JSON.parse(fs.readFileSync(SEED, 'utf8')); }
  catch (e){ console.error('Could not read meridian-seed.json next to this script. Run fetch-seed.js first.'); process.exit(1); }

  const ids = Object.keys(PLACES).filter(id => {
    const w = seed[id] && seed[id].wiki;
    return !(w && (w.image || w.imgDone));          // skip ones already resolved
  });
  console.log(ids.length + ' places still need a photo. Working...');

  const seen = {};           // licence -> count, to show what we encountered
  let i = 0, kept = 0, done = 0;
  const save = () => fs.writeFileSync(SEED, JSON.stringify(seed));

  async function worker(){
    while (i < ids.length){
      const id = ids[i++];
      if (!seed[id]) seed[id] = {};
      if (!seed[id].wiki) seed[id].wiki = {};
      const w = seed[id].wiki;
      const lead = await leadImage(id);
      if (lead.file){
        const info = await fileInfo(lead.file);
        const lic = (info && info.license) || 'no licence data';
        seen[lic] = (seen[lic] || 0) + 1;
        if (info && FREE.test(lic)){
          w.image = { thumb: info.thumb || (lead.original && lead.original.source), full: (lead.original && lead.original.source) || info.full,
                      license: info.license, author: info.author, source: info.source };
          kept++;
        } else {
          w.imageSkipped = lic;
        }
      } else {
        w.imageNone = true;
        seen['(page has no lead image)'] = (seen['(page has no lead image)'] || 0) + 1;
      }
      w.imgDone = true;
      if (++done % 25 === 0){ save(); console.log(done + '/' + ids.length + '  (' + kept + ' photos kept so far)'); }
      await sleep(120);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  save();

  const total = Object.values(seed).filter(x => x.wiki && x.wiki.image).length;
  console.log('\nDone. meridian-seed.json now has ' + total + ' free-licence photos.');
  console.log('\nLicences seen this run (kept = CC0 / public domain / CC BY / CC BY-SA):');
  Object.entries(seen).sort((a,b)=>b[1]-a[1]).forEach(([k,n]) => console.log('  ' + String(n).padStart(4) + '  ' + k));
  console.log('\nSend meridian-seed.json back and I will merge text + photos into the data files.');
})();
