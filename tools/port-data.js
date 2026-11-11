/* One-time port: the old single-folder data -> the new split data files.

   Run once. After this the generated files are ordinary hand-editable
   data; do not re-run it or hand edits will be overwritten.

     node tools/port-data.js <old-js-dir> <new-data-dir>
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = process.argv[2];
const OUT = process.argv[3];

const ctx = { console };
vm.createContext(ctx);
for (const f of ['data.js', 'parks.js', 'cities.js']) {
  vm.runInContext(fs.readFileSync(path.join(SRC, f), 'utf8'), ctx);
}
vm.runInContext(`globalThis.__o = { STATES, STATEWIDE,
  TODO: typeof TODO !== 'undefined' ? TODO : {},
  EAT:  typeof EAT  !== 'undefined' ? EAT  : {} }`, ctx);
const { STATES, STATEWIDE, TODO, EAT } = ctx.__o;

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const q = s => JSON.stringify(s);

const KIND_OF = {
  'NATIONAL PARK':'np', 'STATE PARK':'sp', 'RECREATION AREA':'rec', 'PRESERVE':'forest',
  'MONUMENT':'monument', 'FALLS':'falls', 'SEASHORE':'beach', 'CANYON':'canyon',
  'LAKESHORE':'lake', 'REGION':'region', 'HISTORIC':'historic'
};
const LAND_FROM_KIND = {
  np:[], sp:[], city:['urban'], beach:['beach'], canyon:['canyon','desert'],
  falls:['water','forest'], lake:['water'], rec:['water'], forest:['forest'],
  monument:[], historic:[], region:[]
};
const KIND_RANK = { np:9, canyon:8, falls:7, beach:7, monument:7, lake:6, rec:6, forest:6, sp:5, region:5, historic:5 };

/* Editorial: places that draw people from across the country, and so
   should hold their marker when the map is zoomed all the way out. */
const FAMOUS = {
  'NY-new-york-city':10,'CA-los-angeles':10,'IL-chicago':10,'NV-las-vegas':10,
  'CA-san-francisco':10,'DC-washington':10,'LA-new-orleans':10,'FL-miami':10,
  'WA-seattle':9,'MA-boston':9,'TX-austin':9,'CO-denver':9,'TN-nashville':9,
  'CA-san-diego':9,'OR-portland':9,'AZ-phoenix':8,'GA-atlanta':9,'PA-philadelphia':9,
  'HI-honolulu':10,'FL-orlando':9,'TX-houston':8,'TX-san-antonio':8,'UT-moab':9,
  'FL-key-west':9,'CA-palm-springs':8,'AZ-sedona':9,'WY-jackson':8,'MT-whitefish':7,
  'SC-charleston':9,'GA-savannah':9,'NM-santa-fe':8,'ME-bar-harbor':8,'AK-anchorage':8
};
/* The ones everyone has heard of, which should never be thinned away. */
const FAMOUS_PARKS = ['Grand Canyon','Yosemite','Yellowstone','Zion','Great Smoky',
  'Rocky Mountain','Acadia','Arches','Glacier National','Olympic','Joshua Tree',
  'Bryce Canyon','Sequoia','Denali','Death Valley','Everglades','Haleakal','Volcanoes'];

const places = [], spots = {}, food = {};

/* ---------- cities ---------- */
STATES.forEach(st => {
  const [sname, abbr, , cities] = st;
  cities.forEach(c => {
    const [name, lat, lon] = c;
    const id = abbr + '-' + slug(name);
    const depth = ((TODO[id] || []).length) + ((EAT[id] || []).length);
    const prom = FAMOUS[id] || (depth >= 12 ? 8 : depth >= 7 ? 7 : depth >= 3 ? 6 : 4);
    const flags = [];
    if ((EAT[id] || []).length >= 4) flags.push('food');
    places.push({ id, name, abbr, kind:'city', lat, lon, prom,
      land:['urban'], who:[], flags, blurb:'' });
  });
});

/* ---------- parks, shores, falls and the rest ---------- */
Object.keys(STATEWIDE).forEach(abbr => {
  STATEWIDE[abbr].forEach(r => {
    const [name, lat, lon, blurb, tag] = r;
    const kind = KIND_OF[tag] || 'region';
    const id = abbr + '-' + slug(name);
    let prom = KIND_RANK[kind] || 5;
    if (kind === 'np' && FAMOUS_PARKS.some(f => name.indexOf(f) === 0)) prom = 10;
    const flags = [];
    if (kind === 'np' || kind === 'sp' || kind === 'forest') { flags.push('hiking'); flags.push('camping'); }
    if (kind === 'beach' || kind === 'lake' || kind === 'rec') flags.push('water');
    if (kind === 'historic' || kind === 'monument') flags.push('history');
    places.push({ id, name, abbr, kind, lat, lon, prom,
      land: (LAND_FROM_KIND[kind] || []).slice(), who:[], flags, blurb: blurb || '' });
  });
});

/* ---------- what to do and where to eat ---------- */
Object.keys(TODO).forEach(k => { spots[k] = TODO[k].map(r => [r[0], r[1], r[2] || '']); });
Object.keys(EAT).forEach(k => { food[k]  = EAT[k].map(r  => [r[0], r[1], r[2] || '']); });

/* ---------- write ---------- */
const head = (title, body) => `/* ===========================================================
   ${title}
   =========================================================== */

${body}`;

const placeLines = places.map(p =>
  '  ' + q(p.id) + ': [' + q(p.name) + ',' + q(p.abbr) + ',' + q(p.kind) + ','
  + p.lat + ',' + p.lon + ',' + p.prom + ','
  + JSON.stringify(p.land) + ',' + JSON.stringify(p.who) + ',' + JSON.stringify(p.flags) + ','
  + q(p.blurb) + ']'
).join(',\n');

fs.writeFileSync(path.join(OUT, 'places.js'), head(
`PLACES — everything with its own page and a marker on the map.

   id -> [ name, state, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   prominence 1-10 decides how early a marker appears as you zoom in.
   land / who / flags come from taxonomy.js. "who" is editorial and is
   left empty unless the case is obvious.

   Hand-edit this freely. It was generated once from the old data and
   is not regenerated.`,
`const PLACES = {\n${placeLines}\n};\n\n/* handy derived shapes */\nconst PLACE_IDS = Object.keys(PLACES);\nfunction placeGet(id){ const p = PLACES[id]; return p ? { id:id, name:p[0], abbr:p[1], kind:p[2], lat:p[3], lon:p[4], prom:p[5], land:p[6], who:p[7], flags:p[8], blurb:p[9] } : null; }\n`
));

const spotLines = Object.keys(spots).sort().map(k =>
  ' ' + q(k) + ':[\n' + spots[k].map(r => '  [' + q(r[0]) + ',' + q(r[1]) + ',' + q(r[2]) + ']').join(',\n') + ']'
).join(',\n\n');

fs.writeFileSync(path.join(OUT, 'spots.js'), head(
`SPOTS — what to do in a place.

   placeId -> [ [ name, what it is, TAG ] ... ]

   Favours things that are still there in ten years: museums, parks,
   neighbourhoods, landmarks and natural features, over venues that
   close. Where a city is known for a dish rather than a room, the
   dish is the entry.`,
`const SPOTS = {\n${spotLines}\n};\n`
));

const foodLines = Object.keys(food).sort().map(k =>
  ' ' + q(k) + ':[\n' + food[k].map(r => '  [' + q(r[0]) + ',' + q(r[1]) + ',' + q(r[2]) + ']').join(',\n') + ']'
).join(',\n\n');

fs.writeFileSync(path.join(OUT, 'food.js'), head(
`FOOD — where to eat, and what the place is known for.

   placeId -> [ [ name, what it is, why this one ] ... ]

   Long-standing institutions rather than whatever opened last year,
   because a list of new openings is wrong within a season.`,
`const FOOD = {\n${foodLines}\n};\n`
));

const kinds = {};
places.forEach(p => kinds[p.kind] = (kinds[p.kind] || 0) + 1);
console.log('places : ' + places.length + '   ' + Object.entries(kinds).sort((a,b)=>b[1]-a[1]).map(([k,n])=>k+':'+n).join(' '));
console.log('spots  : ' + Object.values(spots).reduce((n,a)=>n+a.length,0) + ' across ' + Object.keys(spots).length + ' places');
console.log('food   : ' + Object.values(food).reduce((n,a)=>n+a.length,0) + ' across ' + Object.keys(food).length + ' places');
