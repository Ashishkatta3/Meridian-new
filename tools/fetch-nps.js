#!/usr/bin/env node
/* ===========================================================
   fetch-nps.js — run on YOUR computer, with your free NPS key.

   The first run showed nps: 0 because the key never reached the
   script (the env-var syntax differs by shell). This one takes the
   key TWO ways — a flag or an env var — so one of them is bound to
   work, tells you immediately whether the key was accepted, and
   edits meridian-seed.json IN PLACE (resumable).

   It pulls, for every national park / monument / preserve / rec
   area / seashore / lakeshore in places.js: the official
   description, entrance fees, weather note, activities, and up to
   three NPS-credited images.

   Usage (Node 18+), from the meridian folder — pick either line:
       node tools/fetch-nps.js --key=YOUR_KEY
       NPS_API_KEY=YOUR_KEY node tools/fetch-nps.js            (macOS/Linux)
       $env:NPS_API_KEY="YOUR_KEY"; node tools/fetch-nps.js    (Windows PowerShell)

   Get a key free in ~30 seconds: https://www.nps.gov/subscribe
   Keep it on the command line / env only — never save it in a file.
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SEED = path.join(ROOT, 'meridian-seed.json');
const flag = (process.argv.find(a => a.startsWith('--key=')) || '').slice(6);
const KEY = flag || process.env.NPS_API_KEY || '';
const UA = 'MeridianAtlas/1.0 (personal travel atlas)';

if (!KEY){
  console.error('No NPS key given. Run:  node tools/fetch-nps.js --key=YOUR_KEY');
  process.exit(1);
}

/* which of our kinds are NPS-matchable */
const NPS_KINDS = new Set(['np','monument','rec','forest','falls','canyon','beach','historic']);

const src = fs.readFileSync(path.join(ROOT, 'assets/js/data/places.js'), 'utf8') + '\n;globalThis.__P = PLACES;';
const ctx = {}; vm.createContext(ctx); vm.runInContext(src, ctx);
const PLACES = ctx.__P;

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function getJSON(url, tries = 3){
  for (let i = 0; i < tries; i++){
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
      if (r.status === 401 || r.status === 403) return { __auth: r.status };
      if (r.status === 429 || r.status >= 500){ await sleep(1500 * (i + 1)); continue; }
      if (!r.ok) return null;
      return await r.json();
    } catch (e){ await sleep(1000 * (i + 1)); }
  }
  return null;
}

/* strip NPS designations and punctuation so "Devils Tower National Monument"
   and our "Devils Tower" compare equal */
const DESIG = /\s+(national park and preserve|national park|national monument|national preserve|national seashore|national lakeshore|national recreation area|national historical park|national historic park|national historic site|national memorial|national river|national scenic river|national volcanic monument|state park|wilderness)\b.*$/i;
function norm(s){
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ').replace(DESIG, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

(async function main(){
  let seed;
  try { seed = JSON.parse(fs.readFileSync(SEED, 'utf8')); }
  catch (e){ console.error('Could not read meridian-seed.json. Run fetch-seed.js first.'); process.exit(1); }

  /* pull the full park list once (≈470 parks, paged) */
  console.log('Fetching the NPS park list...');
  const parks = []; let start = 0;
  for (;;){
    const j = await getJSON('https://developer.nps.gov/api/v1/parks?limit=50&start=' + start + '&api_key=' + encodeURIComponent(KEY));
    if (j && j.__auth){ console.error('\nNPS rejected the key (HTTP ' + j.__auth + '). Check it at nps.gov/subscribe and try again.'); process.exit(1); }
    if (!j || !j.data || !j.data.length) break;
    parks.push(...j.data); start += 50;
    if (start >= +j.total) break;
    await sleep(250);
  }
  if (!parks.length){ console.error('Got an empty park list — the key may be unverified. Check your email from NPS.'); process.exit(1); }
  console.log('Key accepted. ' + parks.length + ' parks returned.\n');

  /* index parks by normalized name and fullName */
  const byName = new Map();
  for (const p of parks){
    for (const key of [norm(p.fullName), norm(p.name)]){
      if (key && !byName.has(key)) byName.set(key, p);
    }
  }
  const findPark = (id) => {
    const [name, abbr] = PLACES[id];
    const n = norm(name);
    let hit = byName.get(n);
    if (!hit){                                   // loose: a park whose name contains ours, in the right state
      hit = parks.find(p => {
        const pn = norm(p.fullName);
        return (pn === n || pn.startsWith(n + ' ') || n.startsWith(pn + ' ')) && (p.states || '').includes(abbr);
      });
    }
    if (hit && abbr && hit.states && !hit.states.includes(abbr)) {
      const better = parks.find(p => norm(p.fullName) === n && (p.states || '').includes(abbr));
      if (better) hit = better;
    }
    return hit || null;
  };

  const targets = Object.keys(PLACES).filter(id => NPS_KINDS.has(PLACES[id][2]) && !(seed[id] && seed[id].nps));
  console.log(targets.length + ' park-type places to match.\n');

  let matched = 0; const misses = [];
  for (const id of targets){
    const hit = findPark(id);
    if (!hit){ misses.push(PLACES[id][0] + ' (' + PLACES[id][1] + ')'); continue; }
    const d = await getJSON('https://developer.nps.gov/api/v1/parks?parkCode=' + hit.parkCode + '&api_key=' + encodeURIComponent(KEY));
    const p = (d && d.data && d.data[0]) || hit;
    if (!seed[id]) seed[id] = {};
    seed[id].nps = {
      code: p.parkCode, name: p.fullName, url: p.url, designation: p.designation, states: p.states,
      description: p.description, weather: p.weatherInfo, directions: p.directionsInfo,
      fees: (p.entranceFees || []).slice(0, 3).map(f => ({ title: f.title, cost: f.cost })),
      hours: (p.operatingHours && p.operatingHours[0] && p.operatingHours[0].description) || '',
      activities: (p.activities || []).map(a => a.name),
      topics: (p.topics || []).map(t => t.name),
      images: (p.images || []).slice(0, 3).map(im => ({ url: im.url, credit: im.credit, title: im.title, alt: im.altText }))
    };
    matched++;
    if (matched % 20 === 0){ fs.writeFileSync(SEED, JSON.stringify(seed)); console.log(matched + ' matched...'); }
    await sleep(150);
  }
  fs.writeFileSync(SEED, JSON.stringify(seed));

  console.log('\nDone. ' + matched + ' parks matched and written into meridian-seed.json.');
  if (misses.length){
    console.log('\n' + misses.length + ' park-type places had no NPS record (fine — some are state parks or');
    console.log('city sites NPS does not list; they keep their Wikipedia text):');
    misses.forEach(m => console.log('   - ' + m));
  }
  console.log('\nSend meridian-seed.json back and I will merge it in.');
})();
