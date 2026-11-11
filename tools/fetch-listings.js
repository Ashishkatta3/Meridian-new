#!/usr/bin/env node
/* ===========================================================
   fetch-listings.js — run on YOUR computer.

   Fills in the thin part of the atlas: things to do and places to
   eat, for the ~135 cities that currently have none.

   Wikivoyage writes city guides as structured listings — "see",
   "do", "eat", "drink" — each with a name and a description. That
   is exactly the shape spots.js and food.js already use, so this
   reads them from the Wikivoyage API and merges them in.

     see / do    -> spots.js   (things to do)
     eat         -> food.js    (where to eat)

   It MERGES rather than overwrites: anything already written by
   hand stays, and duplicates by name are dropped, so re-running is
   safe and your own edits are never lost.

   Everything on Wikivoyage is CC BY-SA, same as the photos, so this
   is reusable with attribution — a credit line is written to
   assets/js/data/LISTING-SOURCES.txt.

   Usage (Node 18+), from the meridian folder:
       node tools/fetch-listings.js
       node tools/fetch-listings.js --proxy    (if Wikimedia is blocked
                                                for you, as it was for
                                                the photo download)
       node tools/fetch-listings.js --limit=20 (try a few first)

   It is resumable: a cache file keeps what it already fetched.
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets/js/data');
const CACHE = path.join(ROOT, 'wikivoyage-cache.json');
const UA = 'MeridianAtlas/1.0 (personal travel atlas; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';
const USE_PROXY = process.argv.includes('--proxy');
const LIMIT = (() => { const a = process.argv.find(x => x.startsWith('--limit=')); return a ? +a.slice(8) : 0; })();
const CONCURRENCY = 3;

/* ---- load the existing data ---- */
function load(file, name){
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DATA, file), 'utf8') + '\n;globalThis.__X = ' + name + ';', ctx);
  return ctx.__X;
}
const PLACES = load('places.js', 'PLACES');
const SPOTS  = load('spots.js', 'SPOTS');
const FOOD   = load('food.js', 'FOOD');

const STATE_FULL = {AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',
 DE:'Delaware',DC:'Washington, D.C.',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',
 KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',
 MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',
 NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',
 SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',
 WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'};

const sleep = ms => new Promise(r => setTimeout(r, ms));
function proxify(u){ return 'https://wsrv.nl/?url=' + u.replace(/^https?:\/\//, ''); }

async function getJSON(url, tries = 3){
  for (let i = 0; i < tries; i++){
    const target = USE_PROXY ? proxify(url) : url;
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 15000);
    try {
      const r = await fetch(target, { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, signal: ctl.signal });
      clearTimeout(to);
      if (r.status === 404) return null;
      if (r.status === 429 || r.status >= 500){ await sleep(1500 * (i + 1)); continue; }
      if (!r.ok) return null;
      return await r.json();
    } catch(e){ clearTimeout(to); await sleep(1000 * (i + 1)); }
  }
  return null;
}

const clean = t => (t || '').replace(/<[^>]*>/g, '').replace(/&amp;/g,'&').replace(/&quot;/g,'"')
  .replace(/&#0?39;/g,"'").replace(/&nbsp;/g,' ').replace(/\[\d+\]/g,'').replace(/\s+/g,' ').trim();

function titles(id){
  const [name, abbr, kind] = PLACES[id];
  const st = STATE_FULL[abbr] || abbr;
  return kind === 'city' ? [name, name + ' (' + st + ')', name + '/' + st] : [name, name + ' (' + st + ')'];
}

/* Wikivoyage listings live in the wikitext as {{see}} {{do}} {{eat}}
   templates. The API gives us the raw wikitext; parsing the templates
   is far more reliable than scraping the rendered HTML. */
function parseListings(wikitext){
  const out = { see: [], do: [], eat: [] };
  if (!wikitext) return out;
  const re = /\{\{(see|do|eat|drink|buy)\b([\s\S]*?)\}\}/gi;
  let m;
  while ((m = re.exec(wikitext)) !== null){
    const type = m[1].toLowerCase();
    const body = m[2];
    const field = k => {
      const f = new RegExp('\\|\\s*' + k + '\\s*=\\s*([^|}]*)', 'i').exec(body);
      return f ? clean(f[1]) : '';
    };
    const name = field('name');
    if (!name || name.length < 2) continue;
    const content = field('content') || field('description');
    const alt = field('alt');
    const entry = { name: name, desc: content, alt: alt };
    if (type === 'see' || type === 'do') out.see.push(entry);
    else if (type === 'eat' || type === 'drink') out.eat.push(entry);
  }
  /* 'do' and 'see' both become things to do, in page order */
  out.do = [];
  return out;
}

async function fetchListings(id){
  for (const t of titles(id)){
    const j = await getJSON('https://en.wikivoyage.org/w/api.php?action=parse&format=json&prop=wikitext&redirects=1&page='
      + encodeURIComponent(t));
    const wt = j && j.parse && j.parse.wikitext && j.parse.wikitext['*'];
    if (!wt) continue;
    const L = parseListings(wt);
    if (L.see.length || L.eat.length) return L;
  }
  return null;
}

/* ---- serialise back into the existing file shapes ---- */
function writeSpots(obj){
  const head = '/* ===========================================================\n'
    + '   SPOTS — things to do, keyed by place id.\n'
    + '   [ name, description, TAG ]\n'
    + '   Hand-written entries plus listings merged from Wikivoyage\n'
    + '   (CC BY-SA). Re-running tools/fetch-listings.js never removes\n'
    + '   anything already here.\n'
    + '   =========================================================== */\n\n';
  const body = Object.keys(obj).sort().map(id =>
    '  ' + JSON.stringify(id) + ': [\n' + obj[id].map(r => '    ' + JSON.stringify(r)).join(',\n') + '\n  ]'
  ).join(',\n');
  fs.writeFileSync(path.join(DATA, 'spots.js'), head + 'const SPOTS = {\n' + body + '\n};\n');
}
function writeFood(obj){
  const head = '/* ===========================================================\n'
    + '   FOOD — where to eat, keyed by place id.\n'
    + '   [ name, dish or draw, description ]\n'
    + '   Hand-written entries plus listings merged from Wikivoyage\n'
    + '   (CC BY-SA).\n'
    + '   =========================================================== */\n\n';
  const body = Object.keys(obj).sort().map(id =>
    '  ' + JSON.stringify(id) + ': [\n' + obj[id].map(r => '    ' + JSON.stringify(r)).join(',\n') + '\n  ]'
  ).join(',\n');
  fs.writeFileSync(path.join(DATA, 'food.js'), head + 'const FOOD = {\n' + body + '\n};\n');
}

const norm = s => s.toLowerCase().replace(/^(the|a)\s+/, '').replace(/[^a-z0-9]+/g, '');

(async function main(){
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch(e){}

  /* Cities first — they are what is thin. Parks already have NPS data. */
  let ids = Object.keys(PLACES).filter(id => {
    const kind = PLACES[id][2];
    const have = (SPOTS[id] || []).length;
    return (kind === 'city' || kind === 'region') && have < 8 && !cache[id];
  });
  if (LIMIT) ids = ids.slice(0, LIMIT);

  console.log(ids.length + ' places to look up on Wikivoyage'
    + (USE_PROXY ? ' (via proxy)' : '') + '. Already cached: ' + Object.keys(cache).length + '.\n');

  let i = 0, found = 0;
  async function worker(){
    while (i < ids.length){
      const id = ids[i++];
      const L = await fetchListings(id);
      cache[id] = L || { see: [], eat: [] };
      if (L && (L.see.length || L.eat.length)){
        found++;
        console.log('  ' + PLACES[id][0].padEnd(26) + ' see/do ' + String(L.see.length).padStart(3) + '   eat ' + String(L.eat.length).padStart(3));
      }
      if (i % 20 === 0) fs.writeFileSync(CACHE, JSON.stringify(cache));
      await sleep(250);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  fs.writeFileSync(CACHE, JSON.stringify(cache));

  /* ---- merge ---- */
  let addedSpots = 0, addedFood = 0;
  for (const id of Object.keys(cache)){
    const L = cache[id]; if (!L) continue;

    if (L.see && L.see.length){
      const list = SPOTS[id] ? SPOTS[id].slice() : [];
      const seen = new Set(list.map(r => norm(r[0])));
      for (const e of L.see){
        if (seen.has(norm(e.name))) continue;
        if (list.length >= 50) break;
        seen.add(norm(e.name));
        list.push([e.name, (e.desc || e.alt || '').slice(0, 260), 'SEE']);
        addedSpots++;
      }
      if (list.length) SPOTS[id] = list;
    }

    if (L.eat && L.eat.length){
      const list = FOOD[id] ? FOOD[id].slice() : [];
      const seen = new Set(list.map(r => norm(r[0])));
      for (const e of L.eat){
        if (seen.has(norm(e.name))) continue;
        if (list.length >= 12) break;
        seen.add(norm(e.name));
        list.push([e.name, '', (e.desc || e.alt || '').slice(0, 220)]);
        addedFood++;
      }
      if (list.length) FOOD[id] = list;
    }
  }

  writeSpots(SPOTS); writeFood(FOOD);
  fs.writeFileSync(path.join(DATA, 'LISTING-SOURCES.txt'),
    'Things-to-do and food listings in spots.js and food.js were merged from\n'
    + 'English Wikivoyage (https://en.wikivoyage.org), which is licensed\n'
    + 'CC BY-SA 4.0. Reuse is permitted with attribution under the same licence.\n');

  const cities = Object.keys(PLACES).filter(id => PLACES[id][2] === 'city');
  const withSpots = cities.filter(id => (SPOTS[id] || []).length).length;
  const with5 = cities.filter(id => (FOOD[id] || []).length >= 5).length;
  console.log('\nDone. Looked up ' + ids.length + ', found listings for ' + found + '.');
  console.log('  things to do added : ' + addedSpots);
  console.log('  food entries added : ' + addedFood);
  console.log('  cities with things to do : ' + withSpots + ' / ' + cities.length);
  console.log('  cities with 5+ food      : ' + with5 + ' / ' + cities.length);
  console.log('\nspots.js and food.js rewritten (your hand-written entries kept).');
  if (!found && !USE_PROXY) console.log('\nNothing came back — if Wikimedia is blocked for you, re-run with --proxy');
})();
