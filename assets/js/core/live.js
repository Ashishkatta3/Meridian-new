/* ===========================================================
   LIVE

   Everything on the site that is true only today: the forecast and
   any warnings on it, what the park service has closed this morning,
   tonight's tide, whether the sky will be worth looking at, what is
   around a place that the atlas never wrote down, and what fuel
   costs this week.

   Three rules hold the whole file together.

     1. Nothing here is required. Every call resolves to null rather
        than rejecting, and every panel that uses one renders without
        it. A dead API must never take a page down with it.

     2. Everything is cached. These answers change hourly at most and
        some change weekly, so a result is kept in sessionStorage
        under its own lifetime and the same place never asks twice in
        one visit.

     3. No keys unless the key is already here. The APIs below are
        free and need no registration, except NPS (the key is already
        in config.js), Ticketmaster and EIA. Anything needing a key
        checks for it first and stays quiet when it is missing.

   Sources: api.weather.gov (NWS), developer.nps.gov, NOAA CO-OPS,
   NOAA SWPC, Open-Meteo, sunrise-sunset.org, Nager.Date, Overpass,
   Wikimedia Commons, OSRM, EIA.
   =========================================================== */

const LIVE_MEM = {};

/* config.js declares its keys with const, which does not put them on
   window — so a key is checked by name through this, and a missing
   one is simply a feature that stays quiet. */
function hasKey(name){
  try { return !!eval(name); } catch(e){ return false; }
}

/* How long each kind of answer stays good, in minutes. */
const LIVE_TTL = {
  weather: 30, alerts: 15, park: 60, tide: 360, sky: 60, aurora: 20,
  holiday: 20160, gas: 1440, near: 10080, photo: 10080, route: 10080,
  stations: 10080, parkcode: 43200
};

function liveCache(key){
  if (LIVE_MEM[key] !== undefined) return LIVE_MEM[key];
  try {
    const raw = sessionStorage.getItem('live.' + key);
    if (!raw) return undefined;
    const box = JSON.parse(raw);
    if (Date.now() > box.exp){ sessionStorage.removeItem('live.' + key); return undefined; }
    return (LIVE_MEM[key] = box.v);
  } catch(e){ return undefined; }
}
function liveStore(key, val, kind){
  LIVE_MEM[key] = val;
  try {
    sessionStorage.setItem('live.' + key, JSON.stringify({
      v: val, exp: Date.now() + (LIVE_TTL[kind] || 60) * 60000
    }));
  } catch(e){ /* a full or blocked store is not a reason to fail */ }
}

/* One fetch, with a timeout, that never throws. */
async function liveGet(url, opts){
  const o = opts || {};
  try {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), o.ms || 9000);
    const r = await fetch(url, { signal: ctl.signal, headers: o.headers || undefined,
                                 method: o.method || 'GET', body: o.body });
    clearTimeout(to);
    if (!r.ok) return null;
    return o.text ? await r.text() : await r.json();
  } catch(e){ return null; }
}

/* Fetch once per key per session, cached by kind. */
async function liveOnce(key, kind, fn){
  const hit = liveCache(key);
  if (hit !== undefined) return hit;
  const v = await fn();
  liveStore(key, v === undefined ? null : v, kind);
  return v;
}

const liveKey = p => p.id || (p.lat.toFixed(2) + ',' + p.lon.toFixed(2));

/* ===========================================================
   WEATHER AND WARNINGS — api.weather.gov

   The National Weather Service covers the US properly: a real
   forecast in words, and the active warnings Open-Meteo has no
   notion of. It needs two calls, because the first one tells you
   which office and grid square the point belongs to.
   =========================================================== */
async function liveWeather(p){
  return liveOnce('wx.' + liveKey(p), 'weather', async () => {
    const pt = await liveGet('https://api.weather.gov/points/'
      + p.lat.toFixed(4) + ',' + p.lon.toFixed(4));
    const url = pt && pt.properties && pt.properties.forecast;
    if (!url) return null;
    const fc = await liveGet(url);
    const per = fc && fc.properties && fc.properties.periods;
    if (!per || !per.length) return null;
    return {
      now: {
        name: per[0].name,
        temp: per[0].temperature, unit: per[0].temperatureUnit,
        short: per[0].shortForecast, detail: per[0].detailedForecast,
        wind: per[0].windSpeed, day: per[0].isDaytime
      },
      days: per.slice(0, 6).map(x => ({
        name: x.name, temp: x.temperature, unit: x.temperatureUnit,
        short: x.shortForecast, day: x.isDaytime
      })),
      place: (pt.properties.relativeLocation && pt.properties.relativeLocation.properties)
        ? pt.properties.relativeLocation.properties.city : ''
    };
  });
}

/* Active watches, warnings and advisories for the exact point. */
async function liveWarnings(p){
  return liveOnce('warn.' + liveKey(p), 'alerts', async () => {
    const j = await liveGet('https://api.weather.gov/alerts/active?point='
      + p.lat.toFixed(4) + ',' + p.lon.toFixed(4));
    if (!j || !j.features) return [];
    return j.features.slice(0, 4).map(f => ({
      event: f.properties.event,
      severity: f.properties.severity,
      headline: f.properties.headline || '',
      ends: f.properties.ends || f.properties.expires || ''
    }));
  });
}

/* ===========================================================
   THE PARK SERVICE — closures, road conditions, fire restrictions

   The park code is already sitting in the nps.gov link the data
   merge saved ("nps.gov/grca/index.htm" is grca). Parks that have
   no link are looked up by name once and remembered.
   =========================================================== */
function parkCodeFrom(p){
  const info = (typeof infoOf === 'function') && infoOf(p.id);
  const url = info && info.nps && info.nps.url;
  const m = url && /nps\.gov\/([a-z]{4})(\/|$)/i.exec(url);
  return m ? m[1].toLowerCase() : '';
}
async function liveParkCode(p){
  const direct = parkCodeFrom(p);
  if (direct) return direct;
  if (!hasKey('NPS_KEY')) return '';
  return liveOnce('pc.' + p.id, 'parkcode', async () => {
    const j = await liveGet('https://developer.nps.gov/api/v1/parks?limit=1&q='
      + encodeURIComponent(p.name) + '&api_key=' + NPS_KEY);
    const d = j && j.data && j.data[0];
    return d ? d.parkCode : '';
  });
}

/* Alerts, plus whatever the park says about its roads today. */
async function liveParkAlerts(p){
  if (!hasKey('NPS_KEY')) return null;
  const code = await liveParkCode(p);
  if (!code) return null;
  return liveOnce('npsa.' + code, 'park', async () => {
    const [al, nr] = await Promise.all([
      liveGet('https://developer.nps.gov/api/v1/alerts?parkCode=' + code
        + '&limit=20&api_key=' + NPS_KEY),
      liveGet('https://developer.nps.gov/api/v1/parks?parkCode=' + code
        + '&fields=operatingHours&limit=1&api_key=' + NPS_KEY)
    ]);
    const alerts = (al && al.data || []).map(a => ({
      kind: (a.category || 'Information').toLowerCase(),
      title: a.title || '',
      body: a.description || '',
      url: a.url || ''
    }));
    const park = nr && nr.data && nr.data[0];
    const hours = park && park.operatingHours && park.operatingHours[0];
    return {
      code: code,
      alerts: alerts,
      hours: hours ? { name: hours.name || '', desc: hours.description || '' } : null
    };
  });
}

/* ===========================================================
   TIDES — NOAA CO-OPS

   There is no "is this place coastal" flag in the atlas and there
   does not need to be: ask for the nearest tide station and let the
   distance answer the question. Nothing within forty miles means
   the place is inland.
   =========================================================== */
async function tideStations(){
  return liveOnce('tide.stations', 'stations', async () => {
    const j = await liveGet('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json'
      + '?type=tidepredictions&units=english', { ms: 15000 });
    if (!j || !j.stations) return [];
    /* trimmed before storing — the full listing is megabytes */
    return j.stations.map(s => [s.id, +s.lat, +s.lng, s.name]);
  });
}
async function liveTides(p){
  const list = await tideStations();
  if (!list || !list.length) return null;
  let best = null, bd = 1e9;
  list.forEach(s => {
    const d = haversine(p.lat, p.lon, s[1], s[2]);
    if (d < bd){ bd = d; best = s; }
  });
  if (!best || bd > 40) return null;                 /* inland */
  return liveOnce('tide.' + best[0] + '.' + new Date().toISOString().slice(0, 10), 'tide', async () => {
    const j = await liveGet('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter'
      + '?product=predictions&application=meridian&datum=MLLW&interval=hilo'
      + '&units=english&time_zone=lst_ldt&format=json&date=today&station=' + best[0]);
    if (!j || !j.predictions) return null;
    return {
      station: best[3], miles: Math.round(bd),
      events: j.predictions.map(x => ({
        at: x.t, ft: Math.round(parseFloat(x.v) * 10) / 10, high: x.type === 'H'
      }))
    };
  });
}

/* ===========================================================
   THE SKY TONIGHT

   Three things decide whether tonight is worth driving out for:
   how dark it gets, how much of the moon is lit, and how much
   cloud is in the way. The first two are arithmetic; the third
   comes from Open-Meteo.
   =========================================================== */
function moonPhase(date){
  /* days since a known new moon, folded into one synodic month */
  const syn = 29.530588853;
  const days = (date.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
  const age = ((days % syn) + syn) % syn;
  return { age: age, lit: (1 - Math.cos(2 * Math.PI * age / syn)) / 2 };
}
async function liveSky(p){
  return liveOnce('sky.' + liveKey(p), 'sky', async () => {
    const wx = await liveGet('https://api.open-meteo.com/v1/forecast?latitude=' + p.lat
      + '&longitude=' + p.lon + '&hourly=cloud_cover&forecast_days=2&timezone=auto');
    let cloud = null;
    if (wx && wx.hourly && wx.hourly.cloud_cover){
      /* the hours that matter: ten at night to two in the morning */
      const hrs = wx.hourly.time, cc = wx.hourly.cloud_cover, pick = [];
      for (let i = 0; i < hrs.length; i++){
        const h = +hrs[i].slice(11, 13);
        if (h >= 22 || h <= 2) pick.push(cc[i]);
        if (pick.length >= 5) break;
      }
      if (pick.length) cloud = Math.round(pick.reduce((a, b) => a + b, 0) / pick.length);
    }
    const moon = moonPhase(new Date());
    let score = null;
    if (cloud !== null){
      score = Math.round(10 * (1 - cloud / 100) * (1 - moon.lit * 0.55));
      score = Math.max(0, Math.min(10, score));
    }
    const sun = await liveGet('https://api.sunrise-sunset.org/json?formatted=0&lat='
      + p.lat + '&lng=' + p.lon);
    const r = sun && sun.results;
    return {
      cloud: cloud, moonLit: Math.round(moon.lit * 100), score: score,
      sunset: r ? r.sunset : '', sunrise: r ? r.sunrise : '',
      dark: r ? r.astronomical_twilight_end : ''
    };
  });
}

/* Aurora, but only where it could ever be seen. */
async function liveAurora(p){
  if (p.lat < 42) return null;
  const grid = await liveOnce('aurora.grid', 'aurora', async () => {
    const j = await liveGet('https://services.swpc.noaa.gov/json/ovation_aurora_latest.json',
      { ms: 15000 });
    return j && j.coordinates ? j.coordinates : null;
  });
  if (!grid) return null;
  const lon = p.lon < 0 ? p.lon + 360 : p.lon;
  let best = 0;
  for (let i = 0; i < grid.length; i++){
    const g = grid[i];
    if (Math.abs(g[1] - p.lat) <= 1 && Math.abs(g[0] - lon) <= 2) best = Math.max(best, g[2]);
  }
  return { chance: best };
}

/* ===========================================================
   CROWDS — Nager.Date

   A public holiday is the cheapest possible crowd forecast, and
   the one people most often forget when they book.
   =========================================================== */
async function liveHolidays(year){
  return liveOnce('hol.' + year, 'holiday', async () => {
    const j = await liveGet('https://date.nager.at/api/v3/PublicHolidays/' + year + '/US');
    return Array.isArray(j) ? j.map(h => ({ date: h.date, name: h.localName || h.name })) : [];
  });
}
/* Holidays inside a date range, for an itinerary. */
async function holidaysBetween(startISO, endISO){
  const y0 = +startISO.slice(0, 4), y1 = +endISO.slice(0, 4);
  const years = y1 > y0 ? [y0, y1] : [y0];
  const all = [];
  for (const y of years) (await liveHolidays(y) || []).forEach(h => all.push(h));
  return all.filter(h => h.date >= startISO && h.date <= endISO);
}

/* ===========================================================
   FUEL — EIA

   Weekly regional retail prices. Falls back to a figure set in
   config.js so a trip still costs something without the key.
   =========================================================== */
const GAS_REGION = {
  /* EIA's own series, by PADD, so the west coast is not priced off
     the national average */
  west: 'EMM_EPMR_PTE_R5XCA_DPG', ca: 'EMM_EPMR_PTE_SCA_DPG',
  rocky: 'EMM_EPMR_PTE_R40_DPG', midwest: 'EMM_EPMR_PTE_R20_DPG',
  gulf: 'EMM_EPMR_PTE_R30_DPG', east: 'EMM_EPMR_PTE_R10_DPG',
  us: 'EMM_EPMR_PTE_NUS_DPG'
};
function gasRegionOf(abbr){
  const R = {
    CA:'ca', WA:'west', OR:'west', AK:'west', HI:'west',
    CO:'rocky', UT:'rocky', WY:'rocky', MT:'rocky', ID:'rocky',
    TX:'gulf', LA:'gulf', MS:'gulf', AL:'gulf', AR:'gulf', NM:'gulf',
    OH:'midwest', MI:'midwest', IL:'midwest', IN:'midwest', WI:'midwest',
    MN:'midwest', IA:'midwest', MO:'midwest', KS:'midwest', NE:'midwest',
    ND:'midwest', SD:'midwest', OK:'midwest', KY:'midwest', TN:'midwest'
  };
  return R[abbr] || 'east';
}
async function liveGas(abbr){
  const region = gasRegionOf(abbr || '');
  /* Coerced, because config.js is hand-edited: a fallback of "N/A"
     would otherwise reach .toFixed() and take the whole totals strip
     down with it. */
  const raw = (typeof GAS_FALLBACK !== 'undefined') ? parseFloat(GAS_FALLBACK) : NaN;
  const fallback = { usd: isFinite(raw) && raw > 0 ? raw : 3.15, region: region, guess: true };
  if (!hasKey('EIA_KEY')) return fallback;
  const v = await liveOnce('gas.' + region, 'gas', async () => {
    const j = await liveGet('https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=' + EIA_KEY
      + '&frequency=weekly&data[0]=value&facets[series][]=' + GAS_REGION[region]
      + '&sort[0][column]=period&sort[0][direction]=desc&length=1');
    const row = j && j.response && j.response.data && j.response.data[0];
    return row ? { usd: +row.value, region: region, period: row.period, guess: false } : null;
  });
  if (!v || !isFinite(v.usd)) return fallback;
  return v;
}

/* ===========================================================
   ROADS — OSRM

   Real road distance and driving time, which is what the planner
   needs instead of a straight line times a fudge factor. The demo
   server is free, keyless and CORS-enabled; OpenRouteService takes
   over when a key is in config.js.
   =========================================================== */
async function liveRoute(points){
  if (!points || points.length < 2) return null;
  const coords = points.map(p => p.lon.toFixed(4) + ',' + p.lat.toFixed(4)).join(';');
  const key = 'route.' + coords;
  return liveOnce(key, 'route', async () => {
    const j = await liveGet('https://router.project-osrm.org/route/v1/driving/' + coords
      + '?overview=false&annotations=false', { ms: 12000 });
    const r = j && j.routes && j.routes[0];
    if (!r) return null;
    return {
      miles: Math.round(r.distance / 1609.34),
      hours: r.duration / 3600,
      legs: (r.legs || []).map(l => ({
        miles: Math.round(l.distance / 1609.34), hours: l.duration / 3600
      })),
      real: true
    };
  });
}

/* The straight-line estimate, kept as the fallback so the planner
   always has a number even when the router is unreachable. */
function guessRoute(points){
  let mi = 0; const legs = [];
  for (let i = 1; i < points.length; i++){
    const d = haversine(points[i-1].lat, points[i-1].lon, points[i].lat, points[i].lon) * 1.18;
    legs.push({ miles: Math.round(d), hours: d / 55 });
    mi += d;
  }
  return { miles: Math.round(mi), hours: mi / 55, legs: legs, real: false };
}

/* ===========================================================
   WHAT IS AROUND IT — Overpass

   Viewpoints, hot springs, trailheads, waterfalls, breweries and
   chargers: the things nobody writes a guidebook entry for but
   everybody wants within ten miles of where they are standing.
   =========================================================== */
const NEAR_KINDS = {
  viewpoint: { q:'node(around:R,LAT,LON)[tourism=viewpoint];', label:'Viewpoints' },
  spring:    { q:'node(around:R,LAT,LON)[natural=hot_spring];way(around:R,LAT,LON)[natural=hot_spring];', label:'Hot springs' },
  trail:     { q:'node(around:R,LAT,LON)[highway=trailhead];node(around:R,LAT,LON)[information=guidepost][hiking=yes];', label:'Trailheads' },
  water:     { q:'node(around:R,LAT,LON)[waterway=waterfall];', label:'Waterfalls' },
  beer:      { q:'node(around:R,LAT,LON)[craft=brewery];node(around:R,LAT,LON)[microbrewery=yes];', label:'Breweries' },
  charge:    { q:'node(around:R,LAT,LON)[amenity=charging_station];', label:'EV charging' },
  camp:      { q:'node(around:R,LAT,LON)[tourism=camp_site];way(around:R,LAT,LON)[tourism=camp_site];', label:'Campgrounds' }
};
async function liveNear(p, kind, radiusMi){
  const spec = NEAR_KINDS[kind];
  if (!spec) return null;
  const r = Math.round((radiusMi || 12) * 1609);
  return liveOnce('near.' + kind + '.' + liveKey(p) + '.' + r, 'near', async () => {
    const body = '[out:json][timeout:20];('
      + spec.q.replace(/R/g, r).replace(/LAT/g, p.lat).replace(/LON/g, p.lon)
      + ');out center 40;';
    const j = await liveGet('https://overpass-api.de/api/interpreter', {
      method:'POST', body:'data=' + encodeURIComponent(body),
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, ms: 22000
    });
    if (!j || !j.elements) return [];
    const out = [];
    j.elements.forEach(e => {
      const t = e.tags || {};
      if (!t.name) return;
      const lat = e.lat || (e.center && e.center.lat), lon = e.lon || (e.center && e.center.lon);
      if (!lat) return;
      out.push({ name: t.name, lat: lat, lon: lon,
                 miles: Math.round(haversine(p.lat, p.lon, lat, lon) * 10) / 10 });
    });
    out.sort((a, b) => a.miles - b.miles);
    return out.slice(0, 12);
  });
}

/* ===========================================================
   PHOTOGRAPHS NEAR A POINT — Wikimedia Commons geosearch

   Finds pictures taken at a place rather than pictures filed under
   its article, which is how a place with a thin article still ends
   up with something worth looking at.
   =========================================================== */
async function liveCommonsNear(p, radiusM){
  return liveOnce('cphoto.' + liveKey(p), 'photo', async () => {
    const j = await liveGet('https://commons.wikimedia.org/w/api.php?action=query&format=json'
      + '&origin=*&generator=geosearch&ggscoord=' + p.lat + '%7C' + p.lon
      + '&ggsradius=' + (radiusM || 4000) + '&ggslimit=12&ggsnamespace=6'
      + '&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=640');
    const pages = j && j.query && j.query.pages;
    if (!pages) return [];
    return Object.keys(pages).map(k => pages[k]).filter(x => {
      const ii = x.imageinfo && x.imageinfo[0];
      return ii && /\.(jpe?g|png|webp)$/i.test(ii.url || '');
    }).map(x => {
      const ii = x.imageinfo[0], meta = ii.extmetadata || {};
      return {
        title: String(x.title || '').replace(/^File:/, ''),
        src: ii.thumburl || ii.url, full: ii.url,
        by: meta.Artist ? String(meta.Artist.value).replace(/<[^>]+>/g, '').slice(0, 60) : '',
        lic: meta.LicenseShortName ? meta.LicenseShortName.value : ''
      };
    }).slice(0, 8);
  });
}

/* ===========================================================
   CAMPGROUNDS AND PERMITS — Recreation.gov

   The one API here that may refuse a browser outright: RIDB does
   not always send CORS headers. It is written the same way as the
   rest and simply returns nothing when it refuses, so the panel
   that uses it falls back to a search link.
   =========================================================== */
async function liveCamping(p){
  if (!hasKey('RIDB_KEY')) return null;
  return liveOnce('ridb.' + liveKey(p), 'near', async () => {
    const j = await liveGet('https://ridb.recreation.gov/api/v1/facilities?latitude=' + p.lat
      + '&longitude=' + p.lon + '&radius=25&activity=CAMPING&limit=8&full=false'
      + '&apikey=' + RIDB_KEY);
    if (!j || !j.RECDATA) return null;
    return j.RECDATA.map(f => ({
      name: f.FacilityName,
      id: f.FacilityID,
      reserve: f.Reservable,
      url: 'https://www.recreation.gov/camping/campgrounds/' + f.FacilityID
    }));
  });
}

/* ===========================================================
   EVENTS — Ticketmaster

   Used two ways: everything near a point for the home page, and
   everything near one place for its own page.
   =========================================================== */
async function liveEventsNear(lat, lon, radiusMi, days){
  if (!hasKey('TICKETMASTER_KEY')) return null;
  const start = new Date(), end = new Date(Date.now() + (days || 7) * 86400000);
  const iso = d => d.toISOString().slice(0, 19) + 'Z';
  const key = 'ev.' + lat.toFixed(1) + ',' + lon.toFixed(1) + '.' + (radiusMi || 200);
  return liveOnce(key, 'weather', async () => {
    const j = await liveGet('https://app.ticketmaster.com/discovery/v2/events.json'
      + '?apikey=' + TICKETMASTER_KEY
      + '&latlong=' + lat.toFixed(4) + ',' + lon.toFixed(4)
      + '&radius=' + (radiusMi || 200) + '&unit=miles'
      + '&startDateTime=' + iso(start) + '&endDateTime=' + iso(end)
      + '&size=40&sort=date,asc');
    const ev = j && j._embedded && j._embedded.events;
    if (!ev) return [];
    return ev.map(e => {
      const v = e._embedded && e._embedded.venues && e._embedded.venues[0];
      return {
        name: e.name,
        when: (e.dates && e.dates.start && (e.dates.start.dateTime || e.dates.start.localDate)) || '',
        venue: v ? v.name : '',
        city: v && v.city ? v.city.name : '',
        state: v && v.state ? v.state.stateCode : '',
        miles: (v && v.location) ? Math.round(haversine(lat, lon, +v.location.latitude, +v.location.longitude)) : null,
        kind: (e.classifications && e.classifications[0] && e.classifications[0].segment
               && e.classifications[0].segment.name) || '',
        url: e.url || ''
      };
    });
  });
}

/* Events at the national parks around a point. Ticketmaster knows
   about arenas and almost nothing about parks, and this needs only
   the NPS key — so a site with no Ticketmaster key still has
   something real to show for "around you". */
async function liveParkEventsNear(lat, lon, radiusMi, days){
  if (!hasKey('NPS_KEY')) return [];
  if (typeof PLACES === 'undefined') return [];

  const near = [];
  Object.keys(PLACES).forEach(id => {
    const p = placeGet(id);
    if (!p || typeof p.lat !== 'number') return;
    const d = haversine(lat, lon, p.lat, p.lon);
    if (d > (radiusMi || 200)) return;
    const code = parkCodeFrom(p);
    if (code) near.push({ code: code, miles: Math.round(d), name: p.name });
  });
  if (!near.length) return [];
  near.sort((a, b) => a.miles - b.miles);
  const picked = near.slice(0, 12);
  const byCode = {}; picked.forEach(x => byCode[x.code] = x);

  const d0 = new Date(), d1 = new Date(Date.now() + (days || 7) * 86400000);
  const fmt = d => (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
  const key = 'npsev.' + picked.map(x => x.code).join(',') + '.' + fmt(d0);

  return liveOnce(key, 'weather', async () => {
    const j = await liveGet('https://developer.nps.gov/api/v1/events?parkCode='
      + picked.map(x => x.code).join(',')
      + '&dateStart=' + fmt(d0) + '&dateEnd=' + fmt(d1)
      + '&pageSize=50&api_key=' + NPS_KEY, { ms: 12000 });
    const rows = j && j.data;
    if (!rows || !rows.length) return [];
    return rows.map(e => {
      const hit = byCode[(e.parkfullname ? '' : '') || e.sitecode || ''] ||
                  byCode[String(e.parkfullname || '').toLowerCase()] || null;
      const code = (e.sitecode || '').toLowerCase();
      const home = byCode[code] || hit;
      return {
        name: e.title || '',
        when: (e.datestart || (e.dates && e.dates[0]) || ''),
        venue: e.location || (home ? home.name : ''),
        city: home ? home.name : (e.parkfullname || ''),
        state: '',
        miles: home ? home.miles : null,
        kind: 'Parks',
        url: e.infourl || e.regresurl || ('https://www.nps.gov/' + code + '/planyourvisit/events.htm')
      };
    }).filter(x => x.name);
  });
}

/* ===========================================================
   WHERE THE READER IS

   Asked for once, on a press, and never on load: a page that
   demands your location before showing anything is a page people
   close. The answer is kept for the session and never leaves the
   browser.
   =========================================================== */
let HERE = null;
function hereCached(){
  if (HERE) return HERE;
  try {
    const raw = sessionStorage.getItem('live.here');
    if (raw){ const h = JSON.parse(raw); if (Date.now() - h.at < 3600000) return (HERE = h); }
  } catch(e){}
  return null;
}
function askHere(){
  const hit = hereCached();
  if (hit) return Promise.resolve(hit);
  return new Promise(resolve => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(pos => {
      HERE = { lat: pos.coords.latitude, lon: pos.coords.longitude, at: Date.now(), exact: true };
      try { sessionStorage.setItem('live.here', JSON.stringify(HERE)); } catch(e){}
      resolve(HERE);
    }, () => resolve(null), { enableHighAccuracy: false, timeout: 9000, maximumAge: 600000 });
  });
}
/* A rough fallback from the network address, for a reader who would
   rather not be asked. City-level at best, which is enough to decide
   what is within two hundred miles. */
async function hereRough(){
  const hit = hereCached();
  if (hit) return hit;
  const j = await liveGet('https://ipwho.is/?fields=latitude,longitude,city,region');
  if (!j || !j.latitude) return null;
  HERE = { lat: j.latitude, lon: j.longitude, city: j.city, region: j.region,
           at: Date.now(), exact: false };
  try { sessionStorage.setItem('live.here', JSON.stringify(HERE)); } catch(e){}
  return HERE;
}

/* ---- small shared helpers for the panels ---- */
function fmtClock(iso){
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString([], { hour:'numeric', minute:'2-digit' });
}
function fmtDay(iso){
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString([], { weekday:'short', month:'short', day:'numeric' });
}
function severityRank(s){
  return ({ Extreme:4, Severe:3, Moderate:2, Minor:1 })[s] || 0;
}
