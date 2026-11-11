#!/usr/bin/env node
/* ===========================================================
   fetch-photos-fallback.js — run on YOUR computer, last of the three.

   fetch-photos.js found a photo for most places, but ~48 came back
   bare — nearly all of them big cities, because Wikipedia picks NO
   single "lead image" for an article whose infobox is a photo
   montage (Houston, Austin, Washington, Baltimore, ...). Those are
   exactly the places we most want a picture for.

   This pass handles only the still-missing ones. Instead of asking
   for the one lead image, it lists EVERY image used on the article,
   throws out the seals, flags, logos, maps and icons, keeps only
   freely licensed real photographs, and picks the best one —
   preferring a skyline / montage / downtown / aerial shot, then the
   largest remaining photo.

   Edits meridian-seed.json IN PLACE, resumable, no key needed.

   Usage (Node 18+), from the meridian folder:
       node tools/fetch-photos-fallback.js
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SEED = path.join(ROOT, 'meridian-seed.json');
const UA = 'MeridianAtlas/1.0 (personal travel atlas; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';
const CONCURRENCY = 4;

const FREE = /\b(cc0|cc[- ]?by(?!-?nc)(?!-?nd)|public domain|pdm|pd-|gfdl|attribution)\b/i;
/* files that are never a place photo */
const JUNK = /(seal|flag|logo|icon|coat[ _]of[ _]arms|locator|location[ _]map|\bmap\b|wikimedia|commons-logo|ambox|edit-icon|red[ _]pog|pushpin|blank|\.svg$|\.svg\b)/i;
/* files that usually ARE the headline city photo */
const GOOD = /(skyline|montage|collage|panorama|downtown|aerial|cityscape|from above|night|harbor|harbour|waterfront|capitol|beach)/i;

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

/* score a candidate: higher is better */
function score(file, w, h){
  let s = Math.min(w * h, 20e6) / 1e6;          // area, capped
  if (GOOD.test(file)) s += 40;                  // looks like a headline photo
  if (/\.jpe?g$/i.test(file)) s += 3;            // prefer photos over png diagrams
  if (w < 600 || h < 400) s -= 25;               // small → probably not a hero shot
  if (w / h > 3.5 || h / w > 3.5) s -= 15;       // banner/strip shapes
  return s;
}

async function bestPhoto(id){
  for (const t of titles(id)){
    const u = 'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1'
      + '&generator=images&gimlimit=60&prop=imageinfo&iiprop=extmetadata|url|size|mime&iiurlwidth=1000'
      + '&titles=' + encodeURIComponent(t);
    const j = await getJSON(u);
    const pages = j && j.query && j.query.pages;
    if (!pages) continue;
    const cands = [];
    for (const p of pages){
      const file = (p.title || '').replace(/^File:/i, '');
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii || !ii.extmetadata) continue;
      if (JUNK.test(file)) continue;
      if (!/image\/(jpeg|png)/i.test(ii.mime || '')) continue;
      const lic = (ii.extmetadata.LicenseShortName && ii.extmetadata.LicenseShortName.value) || '';
      if (!FREE.test(lic)) continue;
      const w = ii.width || 0, h = ii.height || 0;
      if (w < 400 || h < 300) continue;
      cands.push({
        file, s: score(file, w, h),
        thumb: ii.thumburl || ii.url, full: ii.url,
        license: lic, author: strip(ii.extmetadata.Artist && ii.extmetadata.Artist.value).slice(0,140),
        source: ii.descriptionurl || ('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file.replace(/ /g,'_')))
      });
    }
    if (cands.length){
      cands.sort((a,b) => b.s - a.s);
      return cands[0];
    }
  }
  return null;
}

(async function main(){
  let seed;
  try { seed = JSON.parse(fs.readFileSync(SEED, 'utf8')); }
  catch (e){ console.error('Could not read meridian-seed.json. Run the earlier scripts first.'); process.exit(1); }

  /* target: places still with no free photo of their own */
  const ids = Object.keys(PLACES).filter(id => !(seed[id] && seed[id].wiki && seed[id].wiki.image));
  console.log(ids.length + ' places still have no photo. Trying the all-images fallback...\n');

  let i = 0, kept = 0, done = 0;
  const save = () => fs.writeFileSync(SEED, JSON.stringify(seed));

  async function worker(){
    while (i < ids.length){
      const id = ids[i++];
      const pic = await bestPhoto(id);
      if (pic){
        if (!seed[id]) seed[id] = {};
        if (!seed[id].wiki) seed[id].wiki = {};
        seed[id].wiki.image = { thumb: pic.thumb, full: pic.full, license: pic.license, author: pic.author, source: pic.source };
        delete seed[id].wiki.imageNone; delete seed[id].wiki.imageSkipped;
        kept++;
        console.log('  + ' + PLACES[id][0] + '  ->  ' + pic.file);
      }
      if (++done % 15 === 0) save();
      await sleep(150);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  save();

  const total = Object.values(seed).filter(x => x.wiki && x.wiki.image).length;
  const bare = Object.keys(PLACES).filter(id => !(seed[id] && ((seed[id].wiki && seed[id].wiki.image) || (seed[id].nps && seed[id].nps.images && seed[id].nps.images.length))));
  console.log('\nRecovered ' + kept + ' more. meridian-seed.json now has ' + total + ' Wikimedia photos (plus NPS images).');
  console.log(bare.length + ' places still have no picture from any source' + (bare.length ? ':\n   ' + bare.join(', ') : '.'));
  console.log('\nSend meridian-seed.json back and I will merge everything in.');
})();
