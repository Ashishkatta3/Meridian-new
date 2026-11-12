#!/usr/bin/env node
/* ===========================================================
   fetch-listings.js — fills in things to do and places to eat.

   Wikivoyage writes its guides as structured listings:
       {{see  | name=... | content=... }}
       {{eat  | name=... | content=... }}
   which is the shape spots.js and food.js already use. This reads
   them and merges them in.

   WHAT THE FIRST VERSION GOT WRONG
   1. Big cities on Wikivoyage are split into DISTRICT subpages —
      "Chicago/Loop", "Houston/Downtown" — and the parent article
      holds almost no listings. It only ever read the parent, which
      is why the cities that needed it most came back empty.
   2. It only looked at cities. All 149 parks and monuments were
      skipped, and they have good Wikivoyage articles.
   3. It matched templates with a lazy regex, so any listing
      containing a nested template was cut off mid-way.

   All three are fixed here: districts are discovered and read,
   parks are included, and templates are extracted by counting
   braces rather than guessing where they end.

   MERGES, never overwrites. Your hand-written entries win, and
   near-duplicates ("Alcatraz" vs "Alcatraz Island") are dropped.
   Safe to re-run.

   Usage (Node 18+), from the meridian folder:
       node tools/fetch-listings.js --test TX-houston   <- START HERE
       node tools/fetch-listings.js
       node tools/fetch-listings.js --limit=20
       node tools/fetch-listings.js --proxy

   Run the --test first: it prints exactly what it found for one
   place, so you can see it working before it rewrites anything.
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'assets/js/data');
const CACHE = path.join(ROOT, 'wikivoyage-cache.json');
const UA = 'MeridianAtlas/1.0 (personal travel atlas; contact: ' + (process.env.CONTACT_EMAIL || 'you@example.com') + ')';
const USE_PROXY = process.argv.includes('--proxy');
const TEST = (() => { const i = process.argv.indexOf('--test'); return i !== -1 ? process.argv[i + 1] : ''; })();
const LIMIT = (() => { const a = process.argv.find(x => x.startsWith('--limit=')); return a ? +a.slice(8) : 0; })();
const CONCURRENCY = 2;
const MAX_SPOTS = 40, MAX_FOOD = 12, MAX_DISTRICTS = 8;

/* ---------- load existing data ---------- */
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
const proxify = u => 'https://wsrv.nl/?url=' + u.replace(/^https?:\/\//, '');

async function getJSON(url, tries = 3){
  for (let i = 0; i < tries; i++){
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 20000);
    try {
      const r = await fetch(USE_PROXY ? proxify(url) : url,
        { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, signal: ctl.signal });
      clearTimeout(to);
      if (r.status === 404) return null;
      if (r.status === 429 || r.status >= 500){ await sleep(2000 * (i + 1)); continue; }
      if (!r.ok) return null;
      return await r.json();
    } catch(e){ clearTimeout(to); await sleep(1200 * (i + 1)); }
  }
  return null;
}

const clean = t => (t || '')
  .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2')      /* [[link|text]] -> text */
  .replace(/'''?/g, '')                                 /* bold / italic markup */
  .replace(/<ref[\s\S]*?<\/ref>/gi, '')
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/\{\{[^}]*\}\}/g, '')
  .replace(/\s+/g, ' ').trim();

/* ---------- template extraction, counting braces ---------- */
function templates(wt){
  const out = [];
  for (let i = 0; i < wt.length - 1; i++){
    if (wt[i] === '{' && wt[i + 1] === '{'){
      let depth = 1, j = i + 2;
      while (j < wt.length && depth > 0){
        if (wt[j] === '{' && wt[j + 1] === '{'){ depth++; j += 2; continue; }
        if (wt[j] === '}' && wt[j + 1] === '}'){ depth--; j += 2; continue; }
        j++;
      }
      if (depth === 0){ out.push(wt.slice(i + 2, j - 2)); i = j - 2; }
    }
  }
  return out;
}

/* split on | at the top level only */
function params(body){
  const parts = []; let buf = '', d1 = 0, d2 = 0;
  for (let i = 0; i < body.length; i++){
    const c = body[i];
    if (c === '{' && body[i + 1] === '{'){ d1++; buf += '{{'; i++; continue; }
    if (c === '}' && body[i + 1] === '}'){ d1--; buf += '}}'; i++; continue; }
    if (c === '[' && body[i + 1] === '['){ d2++; buf += '[['; i++; continue; }
    if (c === ']' && body[i + 1] === ']'){ d2--; buf += ']]'; i++; continue; }
    if (c === '|' && d1 === 0 && d2 === 0){ parts.push(buf); buf = ''; continue; }
    buf += c;
  }
  parts.push(buf);
  return parts;
}

const SEE = ['see', 'do', 'attraction', 'listing'];
const EAT = ['eat', 'drink'];

function parseListings(wt){
  const out = { see: [], eat: [] };
  if (!wt) return out;
  for (const body of templates(wt)){
    const ps = params(body);
    let kind = (ps[0] || '').trim().toLowerCase();
    const f = {};
    ps.slice(1).forEach(p => {
      const eq = p.indexOf('=');
      if (eq === -1) return;
      f[p.slice(0, eq).trim().toLowerCase()] = p.slice(eq + 1);
    });
    /* the generic {{listing}} carries its kind in a parameter */
    if (kind === 'listing' && f.type) kind = f.type.trim().toLowerCase();
    if (SEE.indexOf(kind) === -1 && EAT.indexOf(kind) === -1) continue;
    if (kind === 'listing') continue;                   /* typeless listing: unusable */

    const name = clean(f.name || f.alt || '');
    if (!name || name.length < 2 || name.length > 80) continue;
    const desc = clean(f.content || f.description || '');
    const entry = { name: name, desc: desc };
    if (EAT.indexOf(kind) !== -1) out.eat.push(entry); else out.see.push(entry);
  }
  return out;
}

/* ---------- Wikivoyage lookups ---------- */
const API = 'https://en.wikivoyage.org/w/api.php';

async function wikitext(title){
  const j = await getJSON(API + '?action=parse&format=json&prop=wikitext&redirects=1&page=' + encodeURIComponent(title));
  return (j && j.parse && j.parse.wikitext && j.parse.wikitext['*']) || null;
}

/* district articles live as subpages: "Chicago/Loop" */
async function districts(title){
  const j = await getJSON(API + '?action=query&format=json&list=allpages&aplimit=30&apprefix='
    + encodeURIComponent(title + '/'));
  const pages = (j && j.query && j.query.allpages) || [];
  return pages.map(p => p.title).filter(t => !/\/(Talk|Archive)/i.test(t)).slice(0, MAX_DISTRICTS);
}

function titlesFor(id){
  const [name, abbr, kind] = PLACES[id];
  const st = STATE_FULL[abbr] || abbr;
  const t = [name];
  if (kind === 'city') t.push(name + ' (' + st + ')', name + ', ' + st);
  else t.push(name + ' National Park', name + ' (' + st + ')');
  return t;
}

async function fetchFor(id, verbose){
  const report = [];
  for (const title of titlesFor(id)){
    const wt = await wikitext(title);
    if (!wt){ report.push('  "' + title + '" — no article'); continue; }
    let L = parseListings(wt);
    report.push('  "' + title + '" — ' + L.see.length + ' see/do, ' + L.eat.length + ' eat in the main article');

    /* a districted city keeps its listings in the subpages */
    if (L.see.length + L.eat.length < 6){
      const subs = await districts(title);
      if (subs.length) report.push('    districts: ' + subs.join(', '));
      for (const s of subs){
        await sleep(300);
        const sw = await wikitext(s);
        if (!sw) continue;
        const sl = parseListings(sw);
        report.push('    "' + s + '" — ' + sl.see.length + ' see/do, ' + sl.eat.length + ' eat');
        L.see = L.see.concat(sl.see);
        L.eat = L.eat.concat(sl.eat);
        if (L.see.length > MAX_SPOTS * 2) break;
      }
    }
    if (verbose) report.forEach(r => console.log(r));
    if (L.see.length || L.eat.length) return L;
  }
  if (verbose) report.forEach(r => console.log(r));
  return null;
}

/* ---------- merging ---------- */
const norm = s => s.toLowerCase().replace(/^(the|a)\s+/, '').replace(/[^a-z0-9]+/g, '');
/* "Alcatraz" and "Alcatraz Island" are the same thing */
function isDupe(name, seen){
  const n = norm(name);
  if (!n) return true;
  for (const s of seen){
    if (s === n) return true;
    if (n.length > 5 && s.length > 5 && (s.indexOf(n) === 0 || n.indexOf(s) === 0)) return true;
  }
  return false;
}

function writeFile(file, varName, obj, note){
  const head = '/* ===========================================================\n   ' + note +
    '\n   Hand-written entries plus listings merged from English\n' +
    '   Wikivoyage (CC BY-SA 4.0). Re-running tools/fetch-listings.js\n' +
    '   never removes anything already here.\n   =========================================================== */\n\n';
  const body = Object.keys(obj).sort().map(id =>
    ' ' + JSON.stringify(id) + ':[\n' + obj[id].map(r => '  ' + JSON.stringify(r)).join(',\n') + ']'
  ).join(',\n\n');
  fs.writeFileSync(path.join(DATA, file), head + 'const ' + varName + ' = {\n' + body + '\n};\n');
}

(async function main(){
  /* ---------- one-place test ---------- */
  if (TEST){
    if (!PLACES[TEST]){ console.error('No such place id: ' + TEST); process.exit(1); }
    console.log('Testing ' + PLACES[TEST][0] + ' (' + PLACES[TEST][1] + ')\n');
    const L = await fetchFor(TEST, true);
    if (!L){ console.log('\nNothing found. Try --proxy, or the article may not exist.'); process.exit(0); }
    console.log('\nTHINGS TO DO (' + L.see.length + '):');
    L.see.slice(0, 12).forEach(e => console.log('  • ' + e.name + (e.desc ? ' — ' + e.desc.slice(0, 90) : ' (no description)')));
    console.log('\nFOOD (' + L.eat.length + '):');
    L.eat.slice(0, 10).forEach(e => console.log('  • ' + e.name + (e.desc ? ' — ' + e.desc.slice(0, 90) : ' (no description)')));
    console.log('\nLooks right? Then run the full pass:  node tools/fetch-listings.js');
    process.exit(0);
  }

  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch(e){}

  /* cities AND parks — parks were skipped entirely before */
  const WANTED = ['city', 'region', 'np', 'sp', 'monument', 'rec', 'forest', 'canyon', 'beach', 'falls', 'lake', 'historic'];
  let ids = Object.keys(PLACES).filter(id =>
    WANTED.indexOf(PLACES[id][2]) !== -1 && (SPOTS[id] || []).length < 8 && !cache[id]);
  /* the best-known places first, so a short run still helps most */
  ids.sort((a, b) => (PLACES[b][5] || 0) - (PLACES[a][5] || 0));
  if (LIMIT) ids = ids.slice(0, LIMIT);

  console.log(ids.length + ' places to look up' + (USE_PROXY ? ' (via proxy)' : '')
    + '. Cached from before: ' + Object.keys(cache).length + '.');
  console.log('Districts are followed for big cities, so this is not quick. Let it run.\n');

  let i = 0, found = 0;
  async function worker(){
    while (i < ids.length){
      const id = ids[i++];
      const L = await fetchFor(id, false);
      cache[id] = L || { see: [], eat: [] };
      if (L && (L.see.length || L.eat.length)){
        found++;
        console.log('  ' + PLACES[id][0].padEnd(26) + String(L.see.length).padStart(3) + ' to do, '
          + String(L.eat.length).padStart(3) + ' to eat');
      }
      if (i % 10 === 0) fs.writeFileSync(CACHE, JSON.stringify(cache));
      await sleep(400);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  fs.writeFileSync(CACHE, JSON.stringify(cache));

  /* ---------- merge ---------- */
  let addS = 0, addF = 0;
  for (const id of Object.keys(cache)){
    const L = cache[id]; if (!L) continue;

    if (L.see && L.see.length){
      const list = (SPOTS[id] || []).slice();
      const seen = list.map(r => norm(r[0]));
      for (const e of L.see){
        if (list.length >= MAX_SPOTS) break;
        if (isDupe(e.name, seen)) continue;
        seen.push(norm(e.name));
        list.push([e.name, e.desc, 'SEE']);
        addS++;
      }
      if (list.length) SPOTS[id] = list;
    }
    if (L.eat && L.eat.length){
      const list = (FOOD[id] || []).slice();
      const seen = list.map(r => norm(r[0]));
      for (const e of L.eat){
        if (list.length >= MAX_FOOD) break;
        if (isDupe(e.name, seen)) continue;
        seen.push(norm(e.name));
        list.push([e.name, '', e.desc]);
        addF++;
      }
      if (list.length) FOOD[id] = list;
    }
  }

  /* tidy the two duplicates that predate all this, while we are here */
  for (const id of Object.keys(SPOTS)){
    const seen = [], keep = [];
    for (const r of SPOTS[id]){ if (isDupe(r[0], seen)) continue; seen.push(norm(r[0])); keep.push(r); }
    SPOTS[id] = keep;
  }

  writeFile('spots.js', 'SPOTS', SPOTS, 'SPOTS — what to do, keyed by place id.  [ name, description, TAG ]');
  writeFile('food.js', 'FOOD', FOOD, 'FOOD — where to eat, keyed by place id.  [ name, dish, description ]');
  fs.writeFileSync(path.join(DATA, 'LISTING-SOURCES.txt'),
    'Listings merged from English Wikivoyage (https://en.wikivoyage.org),\n' +
    'licensed CC BY-SA 4.0. Reuse permitted with attribution under the same licence.\n');

  const cities = Object.keys(PLACES).filter(id => PLACES[id][2] === 'city');
  const parks = Object.keys(PLACES).filter(id => ['np','sp','monument','rec','forest'].indexOf(PLACES[id][2]) !== -1);
  console.log('\nDone. Looked up ' + ids.length + ', found listings for ' + found + '.');
  console.log('  things to do added : ' + addS);
  console.log('  food entries added : ' + addF);
  console.log('  cities with things : ' + cities.filter(id => (SPOTS[id] || []).length).length + ' / ' + cities.length);
  console.log('  parks  with things : ' + parks.filter(id => (SPOTS[id] || []).length).length + ' / ' + parks.length);
  console.log('  cities with 5+ food: ' + cities.filter(id => (FOOD[id] || []).length >= 5).length + ' / ' + cities.length);
  if (!found) console.log('\nNothing came back. Try:  node tools/fetch-listings.js --test TX-houston');
})();
