#!/usr/bin/env node
/* ===========================================================
   FETCH-WIKIDATA

   The cheapest way to grow the atlas. Wikidata knows every UNESCO
   site, National Historic Landmark, lighthouse, observatory,
   botanical garden, scenic byway and national monument in the
   country, each with coordinates, a state and an article — which
   is most of what a Meridian place row needs.

   It will not write to places.js. It proposes: everything it finds
   that is not already in the atlas, with the distance to the
   nearest place you already have, so you can see at a glance which
   are genuinely new and which are the same canyon under another
   name. You keep the ones worth writing about.

   Run:
     node tools/fetch-wikidata.js                 everything, all types
     node tools/fetch-wikidata.js --type=lighthouse
     node tools/fetch-wikidata.js --state=UT --min=2
     node tools/fetch-wikidata.js --emit          also write places.new.js

   The SPARQL endpoint is free, needs no key, and asks only that you
   identify yourself in the User-Agent, which this does.
   =========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'out');
const UA = 'MeridianAtlas/1.0 (personal travel atlas; node)';
const SPARQL = 'https://query.wikidata.org/sparql';

const argv = process.argv.slice(2);
const arg = n => { const h = argv.find(a => a.startsWith('--' + n + '=')); return h ? h.split('=')[1] : ''; };
const has = n => argv.includes('--' + n);

/* ---------- what to look for ----------
   Each is one Wikidata class, with the kind it would become in the
   atlas and how close something already in the atlas has to be
   before this is probably the same thing. */
const TYPES = {
  unesco:      { q:'Q9259',    kind:'monument', near: 12, label:'UNESCO World Heritage Site' },
  nhl:         { q:'Q19557770',kind:'monument', near: 3,  label:'National Historic Landmark' },
  monument:    { q:'Q893775',  kind:'monument', near: 8,  label:'National Monument' },
  lighthouse:  { q:'Q39715',   kind:'monument', near: 3,  label:'Lighthouse' },
  observatory: { q:'Q62832',   kind:'monument', near: 6,  label:'Observatory' },
  garden:      { q:'Q167346',  kind:'park',     near: 4,  label:'Botanical garden' },
  seashore:    { q:'Q1192006', kind:'seashore', near: 12, label:'National Seashore' },
  forest:      { q:'Q1194951', kind:'forest',   near: 25, label:'National Forest' },
  byway:       { q:'Q1788454', kind:'region',   near: 25, label:'Scenic byway' },
  canyon:      { q:'Q150784',  kind:'canyon',   near: 10, label:'Canyon' },
  waterfall:   { q:'Q34038',   kind:'falls',    near: 6,  label:'Waterfall' },
  hotspring:   { q:'Q177380',  kind:'rec',      near: 5,  label:'Hot spring' }
};

/* ---------- the query ----------
   Everything of this class inside the United States that has
   coordinates, with its state and the English article, ordered so
   the ones with a Wikipedia article come first. */
function query(classQ){
  return `
SELECT ?item ?itemLabel ?coord ?stateLabel ?article ?sitelinks WHERE {
  ?item wdt:P31/wdt:P279* wd:${classQ} .
  ?item wdt:P17 wd:Q30 .
  ?item wdt:P625 ?coord .
  OPTIONAL { ?item wdt:P131* ?state . ?state wdt:P31 wd:Q35657 . }
  OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
  OPTIONAL { ?item wikibase:sitelinks ?sitelinks . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY DESC(?sitelinks)
LIMIT 600`;
}

async function sparql(q){
  const url = SPARQL + '?format=json&query=' + encodeURIComponent(q);
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), 70000);
  try {
    const r = await fetch(url, { signal: ctl.signal,
      headers: { 'User-Agent': UA, 'Accept': 'application/sparql-results+json' } });
    clearTimeout(to);
    if (!r.ok){ console.log('  ! endpoint answered ' + r.status); return []; }
    const j = await r.json();
    return (j.results && j.results.bindings) || [];
  } catch(e){ clearTimeout(to); console.log('  ! ' + e.message); return []; }
}

/* ---------- the atlas as it stands ---------- */
function loadPlaces(){
  const ctx = { console }; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js/data/places.js'), 'utf8')
    + ';globalThis.PLACES=PLACES;', ctx);
  return ctx.PLACES;
}
function haversine(la1, lo1, la2, lo2){
  const R = 3958.8, t = Math.PI / 180;
  const dLa = (la2 - la1) * t, dLo = (lo2 - lo1) * t;
  const s = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * t) * Math.cos(la2 * t) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
const STATE_ABBR = {
  'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO',
  'Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID',
  'Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA',
  'Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN',
  'Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV',
  'New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC',
  'North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA',
  'Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX',
  'Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV',
  'Wisconsin':'WI','Wyoming':'WY','District of Columbia':'DC',
  'Washington, D.C.':'DC','Washington D.C.':'DC'
};
function slug(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function parseCoord(wkt){
  const m = /Point\(([-0-9.]+) ([-0-9.]+)\)/.exec(wkt || '');
  return m ? { lon: +m[1], lat: +m[2] } : null;
}

/* ---------- main ---------- */
(async () => {
  const PLACES = loadPlaces();
  const have = Object.keys(PLACES).map(id => ({
    id: id, name: PLACES[id][0], abbr: PLACES[id][1],
    lat: PLACES[id][3], lon: PLACES[id][4]
  }));
  const haveNames = {};
  have.forEach(p => haveNames[slug(p.name)] = p.id);

  const wantType = arg('type');
  const wantState = (arg('state') || '').toUpperCase();
  const minLinks = +arg('min') || 0;
  const types = wantType ? { [wantType]: TYPES[wantType] } : TYPES;
  if (wantType && !TYPES[wantType]){
    console.log('Unknown type. Available: ' + Object.keys(TYPES).join(', '));
    return;
  }

  fs.mkdirSync(OUT, { recursive: true });
  const found = [];

  for (const key of Object.keys(types)){
    const t = types[key];
    console.log('\n' + t.label + ' …');
    const rows = await sparql(query(t.q));
    console.log('  ' + rows.length + ' from Wikidata');

    let kept = 0;
    rows.forEach(r => {
      const c = parseCoord(r.coord && r.coord.value);
      if (!c) return;
      const name = (r.itemLabel && r.itemLabel.value || '').trim();
      if (!name || /^Q\d+$/.test(name)) return;
      const links = +(r.sitelinks && r.sitelinks.value || 0);
      if (links < minLinks) return;

      const stateName = (r.stateLabel && r.stateLabel.value) || '';
      const abbr = STATE_ABBR[stateName] || '';
      if (!abbr) return;                              /* not placeable */
      if (wantState && abbr !== wantState) return;

      /* already in the atlas, by name or by being the same spot */
      let nearest = null, nd = 1e9;
      have.forEach(p => {
        const d = haversine(c.lat, c.lon, p.lat, p.lon);
        if (d < nd){ nd = d; nearest = p; }
      });
      const sameName = !!haveNames[slug(name)];
      const sameSpot = nd <= t.near;
      if (sameName) return;

      found.push({
        id: abbr + '-' + slug(name),
        name: name, abbr: abbr, state: stateName,
        kind: t.kind, type: key, typeLabel: t.label,
        lat: +c.lat.toFixed(4), lon: +c.lon.toFixed(4),
        sitelinks: links,
        article: (r.article && r.article.value) || '',
        wikidata: (r.item && r.item.value) || '',
        nearest: nearest ? nearest.name : '',
        nearestMiles: Math.round(nd),
        likelyDuplicate: sameSpot
      });
      kept++;
    });
    console.log('  ' + kept + ' not already in the atlas');
    await new Promise(r => setTimeout(r, 1200));     /* be polite to the endpoint */
  }

  /* the most written-about first — sitelinks is a decent proxy for
     "is this worth a page" */
  found.sort((a, b) => b.sitelinks - a.sitelinks);

  const fresh = found.filter(f => !f.likelyDuplicate);
  fs.writeFileSync(path.join(OUT, 'wikidata-candidates.json'), JSON.stringify(found, null, 1));

  console.log('\n────────────────────────────────────────────');
  console.log('  candidates          ' + found.length);
  console.log('  probably duplicates ' + (found.length - fresh.length));
  console.log('  genuinely new       ' + fresh.length);
  console.log('\n  The best of them:\n');
  fresh.slice(0, 25).forEach(f =>
    console.log('   ' + String(f.sitelinks).padStart(4) + '  ' + f.name.slice(0, 44).padEnd(46)
      + f.abbr + '  ' + f.typeLabel.slice(0, 22).padEnd(24)
      + (f.nearestMiles < 200 ? f.nearestMiles + ' mi from ' + f.nearest : '')));
  console.log('\n  Written to tools/out/wikidata-candidates.json');

  if (has('emit')){
    /* places.js rows, ready to paste — blurbs left empty on purpose,
       because the writing is the part that makes this an atlas */
    const lines = fresh.slice(0, +arg('emit-limit') || 120).map(f =>
      '  "' + f.id + '": ["' + f.name.replace(/"/g, '\\"') + '","' + f.abbr + '","'
      + f.kind + '",' + f.lat + ',' + f.lon + ',5,""],   /* ' + f.typeLabel
      + ' · ' + f.sitelinks + ' sitelinks */');
    fs.writeFileSync(path.join(OUT, 'places.new.js'),
      '/* Proposed by tools/fetch-wikidata.js — review before merging.\n'
      + '   Prominence is a placeholder 5 and every blurb is empty: both\n'
      + '   are judgements, and nothing here has been looked at yet. */\n'
      + 'const PLACES_NEW = {\n' + lines.join('\n') + '\n};\n');
    console.log('  Rows written to tools/out/places.new.js');
  } else {
    console.log('  Add --emit to also write pasteable places.js rows.');
  }
})();
