#!/usr/bin/env node
/* ===========================================================
   fetch-seed.js — run this on YOUR computer, not in the sandbox.

   For every place in places.js it asks, for free and with no key:
     - Wikipedia   : a summary, one photo, and the article link
     - Commons     : the photo's licence and author (so we only keep
                     images that are free to reuse, and can credit them)
     - Wikivoyage  : the travel intro (cities, parks, beaches)
   and, only if you give it a free key:
     - NPS API     : official park description, fees, weather, images

   It writes ONE file, meridian-seed.json, and it is resumable:
   stop it any time, run it again, it carries on where it stopped.

   Usage (Node 18 or newer):
       cd meridian
       node tools/fetch-seed.js
       NPS_API_KEY=yourkey node tools/fetch-seed.js      # optional, macOS/Linux
       $env:NPS_API_KEY="yourkey"; node tools/fetch-seed.js   # Windows PowerShell

   Free NPS key (30 seconds): https://www.nps.gov/subscribe  (put it in the
   environment variable only; never paste it into a file in the repo).
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'meridian-seed.json');
const NPS_KEY = process.env.NPS_API_KEY || '';
const UA = 'MeridianAtlas/1.0 (personal travel atlas; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';
const CONCURRENCY = 4;

/* ---- load places.js without running a browser ---- */
const src = fs.readFileSync(path.join(ROOT, 'assets/js/data/places.js'), 'utf8')
  + '\n;globalThis.__P = PLACES;';
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

function titles(id){
  const [name, abbr, kind] = PLACES[id];
  const st = STATE_FULL[abbr] || abbr;
  return kind === 'city' ? [name + ', ' + st, name] : [name, name + ' (' + st + ')', name + ', ' + st];
}

const strip = h => (h || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").trim();

/* Only keep images with a genuinely free licence. */
const FREE = /^(cc0|cc[- ]by(?!-nc)|cc[- ]by-sa|public domain|pd|attribution|gfdl)/i;

async function wikipedia(id){
  for (const t of titles(id)){
    const j = await getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(t));
    if (!j || j.type === 'disambiguation' || !j.extract) continue;
    const out = { title: j.title, page: j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page,
                  extract: j.extract, description: j.description || '' };
    const img = j.originalimage || j.thumbnail;
    if (img && img.source){
      const file = decodeURIComponent(img.source.split('/').filter(Boolean).slice(-1)[0].replace(/^\d+px-/, ''));
      const m = file.match(/\.(jpe?g|png|webp)$/i);
      if (m){
        const c = await getJSON('https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&titles='
          + encodeURIComponent('File:' + file));
        const pages = c && c.query && c.query.pages;
        const md = pages && Object.values(pages)[0] && Object.values(pages)[0].imageinfo
          && Object.values(pages)[0].imageinfo[0].extmetadata;
        const lic = md && md.LicenseShortName && md.LicenseShortName.value || '';
        if (md && FREE.test(lic)){
          out.image = {
            thumb: (j.thumbnail && j.thumbnail.source) || img.source,   // ~320px, fast
            full: img.source,
            license: lic,
            author: strip(md.Artist && md.Artist.value).slice(0, 120),
            source: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file.replace(/ /g, '_'))
          };
        } else out.imageSkipped = lic || 'unknown licence';
      }
    }
    return out;
  }
  return null;
}

async function wikivoyage(id){
  for (const t of titles(id)){
    const j = await getJSON('https://en.wikivoyage.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1&titles='
      + encodeURIComponent(t));
    const p = j && j.query && j.query.pages && Object.values(j.query.pages)[0];
    if (p && p.extract && p.extract.length > 80) return { title: p.title, intro: p.extract.trim(), page: 'https://en.wikivoyage.org/wiki/' + encodeURIComponent(p.title.replace(/ /g, '_')) };
  }
  return null;
}

/* NPS: one call lists every park, so we fetch them once and match by name. */
async function npsAll(){
  if (!NPS_KEY) return null;
  const all = []; let start = 0;
  for (;;){
    const j = await getJSON('https://developer.nps.gov/api/v1/parks?limit=50&start=' + start + '&api_key=' + NPS_KEY);
    if (!j || !j.data || !j.data.length) break;
    all.push(...j.data); start += 50;
    if (start >= +j.total) break;
    await sleep(300);
  }
  return all;
}
function npsMatch(list, id){
  if (!list) return null;
  const [name, abbr] = PLACES[id];
  const n = name.toLowerCase().replace(/ national park.*$/, '');
  const hit = list.find(p => p.fullName.toLowerCase().replace(/ national park.*$/, '') === n
    && (p.states || '').includes(abbr)) || list.find(p => p.fullName.toLowerCase() === name.toLowerCase());
  if (!hit) return null;
  return {
    code: hit.parkCode, name: hit.fullName, url: hit.url, designation: hit.designation,
    description: hit.description, weather: hit.weatherInfo,
    directions: hit.directionsInfo,
    fees: (hit.entranceFees || []).slice(0, 3).map(f => ({ title: f.title, cost: f.cost })),
    activities: (hit.activities || []).map(a => a.name),
    images: (hit.images || []).slice(0, 3).map(i => ({ url: i.url, credit: i.credit, title: i.title, alt: i.altText }))
  };
}

(async function main(){
  let seed = {};
  try { seed = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e){}
  const ids = Object.keys(PLACES).filter(id => !seed[id]);
  console.log(ids.length + ' places to fetch (' + (Object.keys(PLACES).length - ids.length) + ' already done).'
    + (NPS_KEY ? ' NPS key found.' : ' No NPS key — skipping official park data.'));

  const nps = await npsAll();
  let done = 0, i = 0;
  const save = () => fs.writeFileSync(OUT, JSON.stringify(seed));

  async function worker(){
    while (i < ids.length){
      const id = ids[i++];
      const [wp, wv] = await Promise.all([wikipedia(id), wikivoyage(id)]);
      seed[id] = { wiki: wp, voyage: wv };
      const k = PLACES[id][2];
      if (nps && (k === 'np' || k === 'monument' || k === 'rec' || k === 'forest')){
        const m = npsMatch(nps, id); if (m) seed[id].nps = m;
      }
      if (++done % 25 === 0){ save(); console.log(done + '/' + ids.length); }
      await sleep(150);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  save();

  const v = Object.values(seed);
  console.log('\nDone. Wrote ' + OUT);
  console.log('  Wikipedia text : ' + v.filter(x => x.wiki).length);
  console.log('  Free-licence photo : ' + v.filter(x => x.wiki && x.wiki.image).length);
  console.log('  Wikivoyage intro : ' + v.filter(x => x.voyage).length);
  console.log('  NPS official : ' + v.filter(x => x.nps).length);
  console.log('\nSend meridian-seed.json back and I will merge it into the data files.');
})();
