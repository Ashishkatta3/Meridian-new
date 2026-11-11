/* Generates the US map geometry.

     node tools/gen-geo.js

   Reads assets/js/data/places.js for every place's lat/lon and writes
   assets/js/data/geo.us.js with the state outlines and each place's
   projected x/y.

   Geometry ONLY. Names, kinds and prominence live in places.js and are
   not copied here — the map joins the two by id at runtime, so there is
   one place to edit a name and one place to edit a coordinate.

   Albers USA is used because it insets Alaska and Hawaii rather than
   flinging them across the canvas. Because everything is projected
   here, the site carries no projection code and no mapping library.

   Needs, once:  npm install us-atlas topojson-client d3-geo
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const topojson = require('topojson-client');
const d3 = require('d3-geo');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'assets', 'js', 'data');
const W = 960, H = 600, PAD = 10;

/* ---------- places ---------- */
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DATA, 'places.js'), 'utf8'), ctx);
vm.runInContext('globalThis.__p = PLACES', ctx);
const PLACES = ctx.__p;

const STATE_NAMES = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',
  CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',
  LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',
  MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',
  NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',
  OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',
  SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
  VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};
const ABBR_BY_NAME = {};
Object.keys(STATE_NAMES).forEach(a => { ABBR_BY_NAME[STATE_NAMES[a]] = a; });

/* ---------- state outlines ---------- */
const topo = JSON.parse(fs.readFileSync(require.resolve('us-atlas/states-10m.json'), 'utf8'));
const fc = topojson.feature(topo, topo.objects.states);

const projection = d3.geoAlbersUsa().fitExtent([[PAD, PAD], [W - PAD, H - PAD]], fc);
const geoPath = d3.geoPath(projection);
const r1 = n => Math.round(n * 10) / 10;
const trim = d => d.replace(/-?\d+\.\d+/g, n => r1(parseFloat(n)).toString());

const states = [];
const skipped = [];
for (const f of fc.features){
  const abbr = ABBR_BY_NAME[f.properties.name];
  const d = abbr && geoPath(f);
  if (!abbr || !d){ skipped.push(f.properties.name); continue; }
  const c = geoPath.centroid(f), b = geoPath.bounds(f);
  states.push([abbr, f.properties.name, trim(d), r1(c[0]), r1(c[1]),
    [r1(b[0][0]), r1(b[0][1]), r1(b[1][0]), r1(b[1][1])]]);
}
states.sort((a, b) => a[0] < b[0] ? -1 : 1);

/* ---------- project every place ---------- */
const xy = [];
const outside = [];
Object.keys(PLACES).forEach(id => {
  const p = PLACES[id];                       // [name, abbr, kind, lat, lon, prom, ...]
  const pt = projection([p[4], p[3]]);
  if (!pt){ outside.push(id); return; }
  xy.push('  ' + JSON.stringify(id) + ':[' + r1(pt[0]) + ',' + r1(pt[1]) + ']');
});

fs.writeFileSync(path.join(DATA, 'geo.us.js'), `/* ===========================================================
   US MAP GEOMETRY — generated, do not hand-edit.
   Rebuild with: node tools/gen-geo.js

   Geometry only. Every coordinate is already projected (Albers USA,
   which insets Alaska and Hawaii), so the site plots these numbers
   directly and carries no projection code.

   Names, kinds and prominence are NOT here — they live in places.js,
   and the map joins the two by id.

   MAP_VIEW    [width, height] of the coordinate space
   MAP_STATES  [ abbr, name, svgPath, labelX, labelY, [x0,y0,x1,y1] ]
   MAP_XY      placeId -> [x, y]
   =========================================================== */

const MAP_VIEW = [${W}, ${H}];

const MAP_STATES = [
${states.map(s => JSON.stringify(s)).join(',\n')}
];

const MAP_XY = {
${xy.join(',\n')}
};
`);

console.log('states : ' + states.length + (skipped.length ? '   skipped: ' + skipped.join(', ') : ''));
console.log('places : ' + xy.length + (outside.length ? '   OUTSIDE PROJECTION: ' + outside.join(', ') : ''));
console.log('bytes  : ' + fs.statSync(path.join(DATA, 'geo.us.js')).size.toLocaleString());
