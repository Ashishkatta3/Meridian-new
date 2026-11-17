#!/usr/bin/env node
/* ===========================================================
   gather.js — fill in the atlas from the free APIs

   Everything in Meridian's data files was written by hand, which is
   why some places have three sentences and others have a paragraph,
   and why "up to date" is not a thing the site can currently claim.
   This pulls what is publicly available, for every place, and writes
   it where the site reads it.

   It is deliberately two-phase. `--fetch` only ever writes to
   tools/out/, so you can look at what came back before any of it
   touches assets/js/data/. `--apply` then merges it in, and never
   overwrites a sentence you wrote by hand unless you pass --force.

   Sources, all free and all keyless except the two marked:

     Wikidata          coordinates, official site, inception, area,
                       visitor numbers, the Commons category
     Wikipedia REST    a current summary paragraph, and the date it
                       was last edited — which is what makes
                       "not five years old" checkable
     NPS API  (key)    hours, entrance fees, activities, alerts,
                       official photographs, the things-to-do list
     Overpass          viewpoints, trailheads, museums and monuments
                       within a few miles, with their own names
     Open-Meteo        the climate normals, so "when to go" is a
                       number rather than a guess
     Wikimedia         geosearch for photographs actually taken there

   Run order is printed by `node tools/gather.js` with no arguments.
   =========================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT  = path.join(__dirname, 'out');
const DATA = path.join(ROOT, 'assets', 'js', 'data');

/* ---------- the atlas, loaded out of the site's own files ---------- */
function loadData(){
  const sandbox = {};
  for (const f of ['places.js', 'spots.js', 'info.js', 'photos.js', 'food.js']){
    const p = path.join(DATA, f);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    /* The data files are plain `const X = {...}` declarations. Running
       them in a throwaway function scope is enough to read them and
       keeps us from having to parse JavaScript by hand. */
    try {
      // eslint-disable-next-line no-new-func
      new Function('g', src + '\n' + [
        'try{ g.PLACES = PLACES }catch(e){}',
        'try{ g.placeGet = placeGet }catch(e){}',
        'try{ g.SPOTS = SPOTS }catch(e){}',
        'try{ g.INFO = INFO }catch(e){}',
        'try{ g.PHOTOS = PHOTOS }catch(e){}',
        'try{ g.FOOD = FOOD }catch(e){}'
      ].join('\n'))(sandbox);
    } catch(e){
      console.error('could not read ' + f + ': ' + e.message);
    }
  }
  if (!sandbox.PLACES) throw new Error('places.js did not yield a PLACES object');
  return sandbox;
}

/* ---------- a polite fetch ----------
   Every one of these services is free and run on somebody else's
   money. One request at a time, with a real user agent and a pause,
   is the price of being allowed to keep using them. */
const UA = 'Meridian/1.0 (personal travel atlas; contact via the repo)';
let LAST = 0;

async function get(url, opts){
  opts = opts || {};
  const gap = opts.gap == null ? 320 : opts.gap;
  const wait = Math.max(0, LAST + gap - Date.now());
  if (wait) await new Promise(r => setTimeout(r, wait));
  LAST = Date.now();

  for (let attempt = 0; attempt < 3; attempt++){
    try {
      const res = await fetch(url, {
        headers: Object.assign({ 'User-Agent': UA, 'Accept': 'application/json' }, opts.headers || {})
      });
      if (res.status === 429 || res.status === 503){
        /* backing off is not optional on Overpass */
        await new Promise(r => setTimeout(r, 2500 * (attempt + 1)));
        continue;
      }
      if (!res.ok) return { error: res.status + ' ' + res.statusText };
      if (opts.text) return { text: await res.text() };
      return { data: await res.json() };
    } catch(e){
      if (attempt === 2) return { error: e.message };
      await new Promise(r => setTimeout(r, 1200 * (attempt + 1)));
    }
  }
  return { error: 'gave up' };
}

/* ---------- Wikidata ---------- */
async function wikidata(place){
  /* find the entity from the English Wikipedia title, which is more
     reliable than a label search — "Springfield" has thirty labels */
  const title = place.wiki || place.name;
  if (!title) return { error: 'no title' };
  const q = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&format=json'
          + '&props=claims|sitelinks&titles=' + encodeURIComponent(title);
  const r = await get(q);
  if (r.error) return { error: r.error };

  const ents = (r.data && r.data.entities) || {};
  const id = Object.keys(ents).find(k => k !== '-1');
  if (!id) return { error: 'no wikidata entity' };
  const e = ents[id];
  const c = e.claims || {};

  const one = (prop, pick) => {
    const arr = c[prop];
    if (!arr || !arr.length) return null;
    const v = arr[0].mainsnak && arr[0].mainsnak.datavalue && arr[0].mainsnak.datavalue.value;
    if (v == null) return null;
    return pick ? pick(v) : v;
  };

  const coord = one('P625', v => ({ lat: v.latitude, lon: v.longitude }));
  return {
    qid: id,
    lat: coord ? coord.lat : null,
    lon: coord ? coord.lon : null,
    site: one('P856'),                                   /* official website */
    inception: one('P571', v => (v.time || '').slice(1, 11)),
    area_km2: one('P2046', v => Number(v.amount)),
    elevation_m: one('P2044', v => Number(v.amount)),
    visitors: one('P1174', v => Number(v.amount)),       /* visitors per year */
    commons: one('P373'),                                /* Commons category */
    unesco: !!c.P757
  };
}

/* ---------- Wikipedia summary, with its own freshness ---------- */
async function wikipedia(place){
  const title = place.wiki || place.name;
  if (!title) return { error: 'no title' };
  const base = 'https://en.wikipedia.org/api/rest_v1/page/summary/'
             + encodeURIComponent(title.replace(/ /g, '_'));
  const r = await get(base);
  if (r.error) return { error: r.error };
  const d = r.data || {};
  if (d.type === 'disambiguation') return { error: 'disambiguation page' };

  /* when the article itself was last touched — the number that makes
     "is this five years old?" answerable */
  let edited = null;
  const rev = await get('https://en.wikipedia.org/w/api.php?action=query&format=json'
    + '&prop=revisions&rvprop=timestamp&rvlimit=1&titles='
    + encodeURIComponent(title));
  try {
    const pages = rev.data.query.pages;
    const k = Object.keys(pages)[0];
    edited = pages[k].revisions[0].timestamp.slice(0, 10);
  } catch(e){}

  return {
    summary: (d.extract || '').trim(),
    title: d.title || title,
    url: (d.content_urls && d.content_urls.desktop && d.content_urls.desktop.page) || null,
    thumb: (d.thumbnail && d.thumbnail.source) || null,
    original: (d.originalimage && d.originalimage.source) || null,
    lat: d.coordinates ? d.coordinates.lat : null,
    lon: d.coordinates ? d.coordinates.lon : null,
    article_edited: edited
  };
}

/* ---------- the National Park Service ---------- */
function npsCodeFor(place){
  /* The park code is the only reliable key. If the place has one in
     the atlas, use it; otherwise search by name and take an exact
     match only — a fuzzy one puts Yosemite's hours on Sequoia. */
  return place.nps || null;
}

async function nps(place, key){
  if (!key) return { error: 'no NPS key' };
  const code = npsCodeFor(place);
  let url = 'https://developer.nps.gov/api/v1/parks?api_key=' + key + '&limit=5';
  url += code ? '&parkCode=' + encodeURIComponent(code)
              : '&q=' + encodeURIComponent(place.name);
  const r = await get(url, { gap: 220 });
  if (r.error) return { error: r.error };

  const list = (r.data && r.data.data) || [];
  let p = list[0];
  if (!code){
    const want = place.name.toLowerCase().replace(/\s+national.*$/, '').trim();
    p = list.find(x => x.fullName.toLowerCase().includes(want)) || null;
    if (!p) return { error: 'no exact NPS match for ' + place.name };
  }
  if (!p) return { error: 'nothing returned' };

  const hours = (p.operatingHours || []).map(h => ({
    name: h.name, description: h.description,
    standard: h.standardHours, exceptions: (h.exceptions || []).map(e => ({
      name: e.name, start: e.startDate, end: e.endDate }))
  }));

  /* things to do, from the horse's mouth */
  const td = await get('https://developer.nps.gov/api/v1/thingstodo?api_key=' + key
    + '&parkCode=' + p.parkCode + '&limit=30', { gap: 220 });
  const things = (((td.data || {}).data) || []).map(x => ({
    title: x.title,
    short: (x.shortDescription || '').trim(),
    duration: x.duration,
    season: (x.season || []).join(', '),
    fee: x.doFeesApply,
    reservation: x.isReservationRequired,
    accessible: (x.accessibilityInformation || '').slice(0, 300),
    url: x.url
  }));

  return {
    parkCode: p.parkCode,
    fullName: p.fullName,
    description: (p.description || '').trim(),
    weatherInfo: (p.weatherInfo || '').trim(),
    directions: (p.directionsInfo || '').trim(),
    url: p.url,
    lat: p.latitude ? Number(p.latitude) : null,
    lon: p.longitude ? Number(p.longitude) : null,
    designation: p.designation,
    states: p.states,
    entranceFees: (p.entranceFees || []).map(f => ({
      cost: f.cost, title: f.title, description: (f.description || '').slice(0, 300) })),
    entrancePasses: (p.entrancePasses || []).map(f => ({ cost: f.cost, title: f.title })),
    hours: hours,
    activities: (p.activities || []).map(a => a.name),
    topics: (p.topics || []).map(a => a.name),
    images: (p.images || []).slice(0, 8).map(i => ({
      url: i.url, alt: i.altText, caption: i.caption, credit: i.credit })),
    things: things,
    fetched: new Date().toISOString().slice(0, 10)
  };
}

/* ---------- Overpass: what is actually around ---------- */
const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];

async function overpass(place, radiusM){
  const r = radiusM || 8000;
  if (place.lat == null || place.lon == null) return { error: 'no coordinates' };
  const q = `[out:json][timeout:50];
(
  node(around:${r},${place.lat},${place.lon})["tourism"~"^(viewpoint|museum|attraction|artwork|gallery|zoo|aquarium)$"]["name"];
  node(around:${r},${place.lat},${place.lon})["historic"~"^(monument|memorial|castle|fort|ruins|archaeological_site)$"]["name"];
  node(around:${r},${place.lat},${place.lon})["natural"~"^(peak|waterfall|hot_spring|arch|cave_entrance)$"]["name"];
  node(around:${r},${place.lat},${place.lon})["leisure"="park"]["name"]["wikidata"];
  way (around:${r},${place.lat},${place.lon})["tourism"="attraction"]["name"];
);
out center tags 60;`;

  for (const host of OVERPASS){
    const res = await get(host + '?data=' + encodeURIComponent(q), { gap: 2200 });
    if (res.error) continue;
    const els = (res.data && res.data.elements) || [];
    return els.map(e => {
      const t = e.tags || {};
      return {
        name: t.name,
        kind: t.tourism || t.historic || t.natural || t.leisure || 'place',
        lat: e.lat != null ? e.lat : (e.center && e.center.lat),
        lon: e.lon != null ? e.lon : (e.center && e.center.lon),
        wikidata: t.wikidata || null,
        website: t.website || t['contact:website'] || null,
        hours: t.opening_hours || null,
        fee: t.fee || null,
        desc: t.description || null
      };
    }).filter(x => x.name && x.lat != null);
  }
  return { error: 'every Overpass mirror refused' };
}

/* ---------- climate normals: "when to go", as numbers ---------- */
async function climate(place){
  if (place.lat == null || place.lon == null) return { error: 'no coordinates' };
  const url = 'https://archive-api.open-meteo.com/v1/archive'
    + '?latitude=' + place.lat + '&longitude=' + place.lon
    + '&start_date=2019-01-01&end_date=2023-12-31'
    + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum'
    + '&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto';
  const r = await get(url, { gap: 400 });
  if (r.error) return { error: r.error };
  const d = (r.data && r.data.daily) || {};
  if (!d.time) return { error: 'no daily data' };

  /* five years of dailies, folded into twelve months */
  const months = Array.from({ length: 12 }, () => ({ hi: [], lo: [], rain: 0, days: 0 }));
  d.time.forEach((day, i) => {
    const m = +day.slice(5, 7) - 1;
    const hi = d.temperature_2m_max[i], lo = d.temperature_2m_min[i], p = d.precipitation_sum[i];
    if (hi != null) months[m].hi.push(hi);
    if (lo != null) months[m].lo.push(lo);
    if (p != null) months[m].rain += p;
    months[m].days++;
  });
  const mean = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null;
  return {
    months: months.map((m, i) => ({
      month: i + 1,
      high: mean(m.hi), low: mean(m.lo),
      rain_in: m.days ? Math.round(m.rain / (m.days / 30.4) * 10) / 10 : null
    })),
    source: 'Open-Meteo ERA5, 2019–2023',
    fetched: new Date().toISOString().slice(0, 10)
  };
}

/* ---------- Wikimedia: photographs actually taken there ---------- */
async function photosNear(place, radiusM){
  const r = radiusM || 4000;
  if (place.lat == null || place.lon == null) return { error: 'no coordinates' };
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*'
    + '&generator=geosearch&ggsnamespace=6&ggslimit=30'
    + '&ggscoord=' + place.lat + '|' + place.lon + '&ggsradius=' + r
    + '&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1600';
  const res = await get(url, { gap: 400 });
  if (res.error) return { error: res.error };
  const pages = ((res.data || {}).query || {}).pages || {};
  return Object.keys(pages).map(k => {
    const p = pages[k];
    const ii = (p.imageinfo || [])[0] || {};
    const meta = ii.extmetadata || {};
    const val = n => (meta[n] && String(meta[n].value || '').replace(/<[^>]+>/g, '').trim()) || null;
    return {
      title: p.title,
      src: ii.url,
      thumb: ii.thumburl,
      width: ii.width, height: ii.height,
      author: val('Artist'),
      licence: val('LicenseShortName'),
      date: val('DateTimeOriginal'),
      page: ii.descriptionurl
    };
  }).filter(x => x.src && x.width >= 1000)
    /* landscape first: these go in hero slots */
    .sort((a, b) => (b.width / b.height > 1.2 ? 1 : 0) - (a.width / a.height > 1.2 ? 1 : 0)
                 || b.width - a.width);
}

/* ===========================================================
   THE RUN
   =========================================================== */
function readKeys(){
  /* The keys already live in config.js — no reason to ask twice. */
  const p = path.join(ROOT, 'assets', 'js', 'core', 'config.js');
  const out = {};
  if (!fs.existsSync(p)) return out;
  const src = fs.readFileSync(p, 'utf8');
  for (const name of ['NPS_KEY', 'EIA_KEY', 'RIDB_KEY', 'MAPILLARY_TOKEN']){
    const m = new RegExp(name + '\\s*=\\s*[\'"]([^\'"]*)[\'"]').exec(src);
    if (m && m[1] && !/^(your|xxx|paste)/i.test(m[1])) out[name] = m[1];
  }
  return out;
}

function save(name, obj){
  fs.mkdirSync(OUT, { recursive: true });
  const p = path.join(OUT, name);
  fs.writeFileSync(p, JSON.stringify(obj, null, 1));
  return p;
}

async function runFetch(opts){
  const { PLACES, placeGet: PG } = loadData();
  if (typeof PG !== 'function'){
    console.error('places.js did not yield placeGet — cannot decode the atlas.');
    process.exit(1);
  }
  const keys = readKeys();
  const ids = Object.keys(PLACES);

  const only = opts.only ? new Set(opts.only.split(',')) : null;
  const want = ids.filter(id => !only || only.has(id))
                  .slice(opts.skip || 0, (opts.skip || 0) + (opts.limit || ids.length));

  console.log('Meridian gather — ' + want.length + ' of ' + ids.length + ' places');
  console.log('  NPS key: ' + (keys.NPS_KEY ? 'found in config.js' : 'MISSING (park hours and fees will be skipped)'));
  console.log('  writing to ' + OUT + '\n');

  const sets = opts.sets;
  const result = {};
  let n = 0;

  for (const id of want){
    /* PLACES rows are packed arrays, not objects — placeGet is the
       site's own decoder and the only thing that knows the order.
       Reading PLACES[id].name directly gave undefined, which is what
       made every fetch die on `.replace` of undefined. */
    const place = (typeof PG === 'function' ? PG(id) : null) || { id: id };
    place.id = id;
    if (!place.name){ console.log('  skipped ' + id + ' — no name in places.js'); continue; }
    n++;
    const tag = String(n).padStart(4) + '/' + want.length + '  ' + id;
    const rec = { id: id, name: place.name, gathered: new Date().toISOString() };

    try {
      if (sets.has('wikidata')){ rec.wikidata = await wikidata(place); }
      if (sets.has('wiki'))    { rec.wikipedia = await wikipedia(place); }
      if (sets.has('nps') && keys.NPS_KEY
          && (/^(np|monument|lake|seashore|rec|preserve)$/.test(place.kind || '')
              || /national (park|monument|seashore|lakeshore|recreation|historic)/i.test(place.name))){
        rec.nps = await nps(place, keys.NPS_KEY);
      }
      if (sets.has('osm'))     { rec.around = await overpass(place, opts.radius); }
      if (sets.has('climate')) { rec.climate = await climate(place); }
      if (sets.has('photos'))  { rec.photos = await photosNear(place, opts.radius); }

      const got = Object.keys(rec).filter(k =>
        rec[k] && !rec[k].error && k !== 'id' && k !== 'name' && k !== 'gathered');
      console.log(tag + '  ' + (got.length ? got.join(' ') : '— nothing'));
    } catch(e){
      rec.error = e.message;
      console.log(tag + '  FAILED  ' + e.message);
    }

    result[id] = rec;

    /* Write as we go. A run over four hundred places takes a while
       and a crash at place 380 must not throw away the first 379. */
    if (n % 10 === 0 || n === want.length) save('gathered.json', result);
  }

  const p = save('gathered.json', result);
  console.log('\nwrote ' + p);
  console.log('Look at it, then:  node tools/gather.js --apply');
}

/* ---------- apply ---------- */
function runApply(opts){
  const file = path.join(OUT, 'gathered.json');
  if (!fs.existsSync(file)){
    console.error('No tools/out/gathered.json. Run --fetch first.');
    process.exit(1);
  }
  const got = JSON.parse(fs.readFileSync(file, 'utf8'));
  const { PLACES, INFO, placeGet: PG } = loadData();
  const info = INFO || {};

  let touched = 0, skipped = 0, coords = 0;
  const notes = [];

  for (const id of Object.keys(got)){
    const g = got[id];
    const cur = info[id] || {};
    const next = Object.assign({}, cur);
    let changed = false;

    /* ---- coordinates: only when they are meaningfully different,
            and only from Wikidata, which is the authority here ---- */
    const wd = g.wikidata;
    const mine = PG ? PG(id) : null;
    if (wd && !wd.error && wd.lat != null && mine){
      const d = Math.hypot((mine.lat - wd.lat) * 69, (mine.lon - wd.lon) * 54);
      if (d > 3){
        notes.push(id + ': coordinates are ' + Math.round(d) + ' miles from Wikidata ('
          + mine.lat + ',' + mine.lon + ' vs ' + wd.lat + ',' + wd.lon + ')');
        coords++;
      }
    }

    const put = (k, v) => {
      if (v == null || v === '') return;
      if (cur[k] && !opts.force){ skipped++; return; }
      next[k] = v; changed = true;
    };

    if (wd && !wd.error){
      put('site', wd.site);
      put('established', wd.inception);
      put('area_km2', wd.area_km2);
      put('elevation_m', wd.elevation_m);
      put('visitors', wd.visitors);
      if (wd.unesco) put('unesco', true);
    }

    const wp = g.wikipedia;
    if (wp && !wp.error){
      put('summary', wp.summary);
      put('wiki_url', wp.url);
      /* this one always updates: it is the freshness stamp itself */
      if (wp.article_edited){ next.source_checked = wp.article_edited; changed = true; }
    }

    const np = g.nps;
    if (np && !np.error){
      put('nps_code', np.parkCode);
      put('hours', np.hours);
      put('fees', np.entranceFees);
      put('directions', np.directions);
      put('weather_note', np.weatherInfo);
      put('activities', np.activities);
      put('official', np.url);
      next.nps_checked = np.fetched; changed = true;
    }

    if (g.climate && !g.climate.error) put('climate', g.climate.months);

    /* everything always carries the date it was last refreshed, so
       the site can show it and a stale entry is visible rather than
       assumed */
    if (changed){ next.reviewed = new Date().toISOString().slice(0, 10); info[id] = next; touched++; }
  }

  /* write info.js back in the shape the site expects */
  const header = fs.readFileSync(path.join(DATA, 'info.js'), 'utf8')
    .split(/^const INFO\b/m)[0] || '';
  const body = 'const INFO = ' + JSON.stringify(info, null, 1) + ';\n';
  fs.writeFileSync(path.join(DATA, 'info.js'), header + body);

  /* the proposed new attractions go to a file, not into spots.js —
     they need a human eye, because Overpass will happily offer you
     seven car parks named "Parking" */
  const around = {};
  for (const id of Object.keys(got)){
    const a = got[id].around;
    if (Array.isArray(a) && a.length) around[id] = a;
  }
  if (Object.keys(around).length) save('attractions-proposed.json', around);

  const photos = {};
  for (const id of Object.keys(got)){
    const p = got[id].photos;
    if (Array.isArray(p) && p.length) photos[id] = p.slice(0, 8);
  }
  if (Object.keys(photos).length) save('photos-candidates.json', photos);

  console.log('info.js: ' + touched + ' places updated, ' + skipped
    + ' fields left alone (they already had a value — pass --force to overwrite)');
  if (coords) console.log('\n' + coords + ' coordinate disagreements, listed in tools/out/coord-check.txt');
  if (notes.length) { fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(path.join(OUT, 'coord-check.txt'), notes.join('\n')); }
  console.log('\nattractions and photo candidates are in tools/out/ for review:');
  console.log('  attractions-proposed.json   pick the real ones, then add to spots.js');
  console.log('  photos-candidates.json      or use tools/photo-picker.html');
  console.log('\nThen bump ?v= in index.html AND the VERSION constant in sw.js.');
}

/* ---------- arguments ---------- */
function main(){
  const argv = process.argv.slice(2);
  const flag = n => argv.some(a => a === '--' + n);
  const val  = (n, d) => {
    const a = argv.find(x => x.indexOf('--' + n + '=') === 0);
    return a ? a.split('=').slice(1).join('=') : d;
  };

  if (!argv.length || flag('help')){
    console.log(`
Meridian — gather.js

  Fills in assets/js/data/info.js from the free public APIs, and
  proposes new attractions and photographs for review.

  THE RUN ORDER

    1   node tools/gather.js --fetch --sets=wikidata,wiki
          Fast, keyless. Coordinates, official sites, a current
          summary for every place, and the date each Wikipedia
          article was last edited — which is how you tell what is
          five years old.
          ~400 places, about 8 minutes.

    2   node tools/gather.js --fetch --sets=nps
          Hours, entrance fees, activities and the official
          things-to-do list for every national park unit. Needs
          NPS_KEY in config.js, which you have.
          ~4 minutes.

    3   node tools/gather.js --fetch --sets=climate
          Five years of daily weather folded into monthly normals,
          so "when to go" becomes a number.
          ~5 minutes.

    4   node tools/gather.js --fetch --sets=photos,osm
          Photographs taken within a few miles of each place, and
          the named viewpoints, trailheads and monuments around it.
          Overpass is slow and rate-limited on purpose — this one
          takes 30-45 minutes. Leave it running.

    5   node tools/gather.js --apply
          Merges everything into info.js. Will NOT overwrite a value
          that is already there unless you add --force. Writes the
          attraction and photo candidates to tools/out/ for you to
          look through.

    6   node tools/fix-photos.js --fetch
        node tools/fix-photos.js --apply
          The photo pass you already know.

    7   Bump ?v= in index.html and VERSION in sw.js.

  OPTIONS

    --sets=a,b,c   wikidata, wiki, nps, osm, climate, photos
    --only=ID,ID   just these places, by atlas id
    --limit=N      stop after N places
    --skip=N       start at the Nth place (to resume a stopped run)
    --radius=M     metres for the "around here" and photo searches
                   (default 8000 / 4000)
    --force        on --apply, overwrite values you already have
    --help

  Everything writes to tools/out/ until you run --apply.
`);
    return;
  }

  const opts = {
    sets: new Set((val('sets', 'wikidata,wiki') || '').split(',').map(s => s.trim()).filter(Boolean)),
    only: val('only', null),
    limit: val('limit') ? +val('limit') : null,
    skip: val('skip') ? +val('skip') : 0,
    radius: val('radius') ? +val('radius') : null,
    force: flag('force')
  };

  if (flag('fetch')) return runFetch(opts);
  if (flag('apply')) return runApply(opts);
  console.error('Give me --fetch or --apply. See --help.');
  process.exit(1);
}

main();
