/* ===========================================================
   ITALY — LIVE

   Everything about an Italian place that is only true today: the
   weather and the wind, the sea state and the current running past
   the beach, the air, the clock, and whether tonight is worth looking
   up at.

   Why this is a separate file from live.js rather than an extension
   of it: seven of the sources that site runs on stop dead at the US
   border. api.weather.gov serves the United States and its
   territories and nothing else. The National Park Service has no
   opinion on Pompeii. NOAA CO-OPS has no tide gauge at Positano, the
   recreation.gov campground index covers federal land in America, and
   the EIA publishes gasoline prices by US region. Pointing any of
   them at a latitude in Campania returns an error, not a forecast.

   So Italy runs on sources that are actually global:

     Open-Meteo            forecast, wind, gusts, pressure, UV, cloud
     Open-Meteo Marine     waves, swell, sea temperature, currents
     Open-Meteo Air        European AQI and particulates
     USGS FDSN             seismicity, for the places built on magma
     Nager.Date            Italian public holidays
     arithmetic            sun, twilight and moon, which need no server

   The three rules from live.js still hold and are the reason this is
   safe to ship: nothing is required, everything resolves to null
   rather than throwing, every panel renders without its row, and
   every answer is cached for its own sensible lifetime.

   None of these need a key. That is deliberate — a key in config.js
   is downloaded by every visitor, and an atlas that stops working
   because somebody's free tier ran out is worse than one that quietly
   drops a row.
   =========================================================== */

/* Cache lifetimes for the Italian kinds, merged into the table live.js
   already keeps. The binding is const but the object is not, so this
   adds to it without editing that file. */
(function itTTL(){
  try {
    if (typeof LIVE_TTL === 'object' && LIVE_TTL){
      LIVE_TTL.itwx   = 30;      /* forecast: half an hour */
      LIVE_TTL.itsea  = 60;      /* waves and currents move slowly */
      LIVE_TTL.itair  = 60;
      LIVE_TTL.itquake = 30;
      LIVE_TTL.itholiday = 20160;
    }
  } catch(e){}
})();

/* These come from live.js. If that file is missing or failed, every
   function below returns null rather than throwing a ReferenceError
   and taking the page down with it. */
function itLiveReady(){
  return typeof liveGet === 'function' && typeof liveOnce === 'function';
}
const itKey = p => p.id || (p.lat.toFixed(2) + ',' + p.lon.toFixed(2));

/* ===========================================================
   READING THE NUMBERS

   Open-Meteo answers in codes and degrees. A page wants words.
   =========================================================== */

/* WMO present-weather codes, which is what Open-Meteo speaks. */
const IT_WMO = {
  0:'Clear', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Fog', 48:'Freezing fog',
  51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
  56:'Freezing drizzle', 57:'Heavy freezing drizzle',
  61:'Light rain', 63:'Rain', 65:'Heavy rain',
  66:'Freezing rain', 67:'Heavy freezing rain',
  71:'Light snow', 73:'Snow', 75:'Heavy snow', 77:'Snow grains',
  80:'Light showers', 81:'Showers', 82:'Violent showers',
  85:'Snow showers', 86:'Heavy snow showers',
  95:'Thunderstorm', 96:'Thunderstorm with hail', 99:'Severe thunderstorm with hail'
};
function itWeatherWord(code){
  return IT_WMO[code] !== undefined ? IT_WMO[code] : '';
}

const IT_COMPASS = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                    'S','SSW','SW','WSW','W','WNW','NW','NNW'];
function itCompass(deg){
  if (deg === null || deg === undefined || isNaN(deg)) return '';
  return IT_COMPASS[Math.round(((deg % 360) + 360) % 360 / 22.5) % 16];
}

/* Beaufort, in words, from km/h — the honest way to describe wind to
   somebody deciding whether to get on a boat. */
function itBeaufort(kmh){
  if (kmh === null || kmh === undefined || isNaN(kmh)) return null;
  const t = [[1,0,'Calm'],[6,1,'Light air'],[12,2,'Light breeze'],[20,3,'Gentle breeze'],
             [29,4,'Moderate breeze'],[39,5,'Fresh breeze'],[50,6,'Strong breeze'],
             [62,7,'Near gale'],[75,8,'Gale'],[89,9,'Strong gale'],
             [103,10,'Storm'],[118,11,'Violent storm']];
  for (const row of t) if (kmh < row[0]) return { force: row[1], word: row[2] };
  return { force: 12, word: 'Hurricane force' };
}

/* The Douglas sea scale, which is what "rough" actually means. */
function itSeaState(m){
  if (m === null || m === undefined || isNaN(m)) return '';
  if (m < 0.1)  return 'Glassy';
  if (m < 0.5)  return 'Smooth';
  if (m < 1.25) return 'Slight';
  if (m < 2.5)  return 'Moderate';
  if (m < 4)    return 'Rough';
  if (m < 6)    return 'Very rough';
  if (m < 9)    return 'High';
  return 'Very high';
}

/* European AQI bands, as the EEA publishes them. */
function itAirWord(aqi){
  if (aqi === null || aqi === undefined || isNaN(aqi)) return '';
  if (aqi <= 20)  return 'Good';
  if (aqi <= 40)  return 'Fair';
  if (aqi <= 60)  return 'Moderate';
  if (aqi <= 80)  return 'Poor';
  if (aqi <= 100) return 'Very poor';
  return 'Extremely poor';
}

/* ===========================================================
   THE CLOCK

   No request and no key: the browser already carries the entire
   IANA database, and every Italian region is on the same zone.
   =========================================================== */
function itLocalTime(){
  const tz = (typeof itZoneOf === 'function') ? itZoneOf() : 'Europe/Rome';
  try {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(now);
    const date = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', timeZone: tz }).format(now);
    const zone = new Intl.DateTimeFormat('en-GB', {
      timeZoneName: 'short', timeZone: tz }).format(now).split(', ').pop();
    /* How far ahead of the reader, which is the thing they actually
       want to know before telephoning a hotel.

       Taken from the zone's own declared UTC offset rather than by
       formatting a date and parsing it back — that round trip depends
       on the browser's locale parser accepting its own output, which
       is not guaranteed and fails silently when it does not. */
    let diff = null;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(now);
      const name = (parts.find(x => x.type === 'timeZoneName') || {}).value || '';
      const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(name);
      if (m){
        const thereMin = (m[1] === '-' ? -1 : 1) * (+m[2] * 60 + (+m[3] || 0));
        const hereMin  = -now.getTimezoneOffset();
        diff = Math.round((thereMin - hereMin) / 60);
      }
    } catch(e){}
    return { time: time, date: date, zone: zone, diff: diff };
  } catch(e){ return null; }
}

/* ===========================================================
   SUN, TWILIGHT AND MOON

   sun.js solves the sunrise equation for one fixed elevation angle.
   Stargazing needs a different one — the sky is not dark until the
   sun is eighteen degrees below the horizon — so the same standard
   maths is written here with the angle as an argument.
   =========================================================== */
function itSunEvent(date, lat, lon, angleDeg){
  const rad = Math.PI / 180, DAY = 86400000;
  const julian = date.getTime() / DAY + 2440587.5;
  const n = Math.round(julian - 2451545.0 + 0.0008);
  const Jstar = n - lon / 360;
  const M = (357.5291 + 0.98560028 * Jstar) % 360;
  const C = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
  const lambda = (M + C + 180 + 102.9372) % 360;
  const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const delta = Math.asin(Math.sin(lambda * rad) * Math.sin(23.44 * rad));
  const cosOmega = (Math.sin(angleDeg * rad) - Math.sin(lat * rad) * Math.sin(delta))
                 / (Math.cos(lat * rad) * Math.cos(delta));
  if (cosOmega > 1 || cosOmega < -1) return null;    /* never reaches that angle today */
  const omega = Math.acos(cosOmega) / rad;
  const toDate = J => new Date((J - 2440587.5) * DAY);
  return { rise: toDate(Jtransit - omega / 360), set: toDate(Jtransit + omega / 360) };
}

/* Age and lit fraction of the moon. Named apart from live.js's
   moonPhase so that loading both files cannot have one quietly
   redefine the other. */
function itMoon(date){
  const syn = 29.530588853;
  const days = (date.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
  const age = ((days % syn) + syn) % syn;
  const lit = (1 - Math.cos(2 * Math.PI * age / syn)) / 2;
  const names = ['New moon','Waxing crescent','First quarter','Waxing gibbous',
                 'Full moon','Waning gibbous','Last quarter','Waning crescent'];
  /* eight equal arcs, offset by half an arc so "new" straddles zero */
  const idx = Math.floor(((age / syn) * 8 + 0.5)) % 8;
  return { age: age, lit: lit, name: names[idx] };
}

/* How dark the ground is, before any weather.

   There is no free global light-pollution API worth depending on, so
   this is inferred from what the place IS rather than asserted as
   data. A national park in the Apennines is dark; Milan is not. It is
   labelled as an estimate everywhere it is shown, because it is one. */
function itDarkness(p){
  if (!p) return { score: 3, word: 'unknown' };
  const land = p.land || [], flags = p.flags || [];
  if (flags.indexOf('darksky') !== -1) return { score: 9, word: 'excellent' };
  if (p.kind === 'np')                 return { score: 8, word: 'very dark' };
  if (land.indexOf('urban') !== -1){
    return (p.prom >= 9) ? { score: 1, word: 'heavily lit' }
                         : { score: 2, word: 'town glow' };
  }
  if (p.kind === 'mountain' || p.kind === 'volcano') return { score: 7, word: 'dark' };
  if (p.kind === 'island')  return { score: 6, word: 'fairly dark' };
  if (land.indexOf('rural') !== -1 || land.indexOf('mountain') !== -1)
    return { score: 6, word: 'fairly dark' };
  return { score: 4, word: 'some glow' };
}

/* ===========================================================
   WEATHER — Open-Meteo

   One request carries current conditions, the hours that matter for
   stargazing and a five-day outlook, which is three requests fewer
   than asking separately and leaves the free tier alone.
   =========================================================== */
async function itLiveWeather(p){
  if (!itLiveReady()) return null;
  return liveOnce('itwx.' + itKey(p), 'itwx', async () => {
    const u = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,'
      + 'precipitation,weather_code,cloud_cover,pressure_msl,'
      + 'wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day'
      + '&hourly=cloud_cover,temperature_2m'
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,'
      + 'sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max'
      + '&timezone=Europe%2FRome&forecast_days=6';
    const j = await liveGet(u);
    if (!j || !j.current) return null;
    const c = j.current, d = j.daily || {};
    const days = [];
    if (d.time){
      for (let i = 0; i < d.time.length && i < 6; i++){
        days.push({
          date: d.time[i],
          code: d.weather_code ? d.weather_code[i] : null,
          max: d.temperature_2m_max ? Math.round(d.temperature_2m_max[i]) : null,
          min: d.temperature_2m_min ? Math.round(d.temperature_2m_min[i]) : null,
          rain: d.precipitation_probability_max ? d.precipitation_probability_max[i] : null,
          uv: d.uv_index_max ? Math.round(d.uv_index_max[i]) : null
        });
      }
    }
    return {
      temp: Math.round(c.temperature_2m),
      feels: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      rain: c.precipitation,
      code: c.weather_code,
      cloud: c.cloud_cover,
      pressure: c.pressure_msl ? Math.round(c.pressure_msl) : null,
      wind: c.wind_speed_10m,
      windDir: c.wind_direction_10m,
      gust: c.wind_gusts_10m,
      day: !!c.is_day,
      sunrise: d.sunrise ? d.sunrise[0] : '',
      sunset: d.sunset ? d.sunset[0] : '',
      /* kept for the sky panel so it needs no request of its own */
      hours: (j.hourly && j.hourly.time) ? { time: j.hourly.time, cloud: j.hourly.cloud_cover } : null,
      days: days
    };
  });
}

/* ===========================================================
   THE SEA — Open-Meteo Marine

   Waves, swell, water temperature and the current running past the
   beach. Asked for only where the sea actually reaches: the marine
   grid has no cell for Assisi, and a panel of nulls is worse than no
   panel.

   The grid is coarse enough that a town set back from the water can
   still land on a land cell and answer with nothing, so an all-null
   response is treated as "not coastal here" rather than as an error.
   =========================================================== */
async function itLiveSea(p){
  if (!itLiveReady()) return null;
  /* Ask wherever there is a coast in the region; an inland cell comes
     back all-null and is rejected below. The stricter itIsCoastal is
     kept as the fallback for an older data file. */
  const near = (typeof itMaybeCoastal === 'function') ? itMaybeCoastal
             : (typeof itIsCoastal === 'function')    ? itIsCoastal : null;
  if (near && !near(p)) return null;
  return liveOnce('itsea.' + itKey(p), 'itsea', async () => {
    const u = 'https://marine-api.open-meteo.com/v1/marine'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=wave_height,wave_direction,wave_period,'
      + 'swell_wave_height,swell_wave_period,sea_surface_temperature,'
      + 'ocean_current_velocity,ocean_current_direction'
      + '&daily=wave_height_max&timezone=Europe%2FRome&forecast_days=3';
    const j = await liveGet(u);
    const c = j && j.current;
    if (!c) return null;
    const out = {
      waveH: c.wave_height,
      waveDir: c.wave_direction,
      wavePeriod: c.wave_period,
      swellH: c.swell_wave_height,
      swellPeriod: c.swell_wave_period,
      sst: c.sea_surface_temperature,
      currentSpeed: c.ocean_current_velocity,
      currentDir: c.ocean_current_direction,
      maxToday: (j.daily && j.daily.wave_height_max) ? j.daily.wave_height_max[0] : null
    };
    /* a land cell answers with every field null — that is not a sea */
    const any = ['waveH','sst','currentSpeed','swellH']
      .some(k => out[k] !== null && out[k] !== undefined);
    return any ? out : null;
  });
}

/* ===========================================================
   THE AIR — Open-Meteo Air Quality

   Worth showing anywhere, and genuinely worth showing in the Po
   valley, which has some of the worst winter air in Europe because
   the Alps hold it in place.
   =========================================================== */
async function itLiveAir(p){
  if (!itLiveReady()) return null;
  return liveOnce('itair.' + itKey(p), 'itair', async () => {
    const u = 'https://air-quality-api.open-meteo.com/v1/air-quality'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=european_aqi,pm2_5,pm10&timezone=Europe%2FRome';
    const j = await liveGet(u);
    const c = j && j.current;
    if (!c || c.european_aqi === null || c.european_aqi === undefined) return null;
    return {
      aqi: Math.round(c.european_aqi),
      pm25: c.pm2_5 === null ? null : Math.round(c.pm2_5),
      pm10: c.pm10 === null ? null : Math.round(c.pm10)
    };
  });
}

/* ===========================================================
   TONIGHT'S SKY

   Four things decide whether to bother: how dark the ground is, how
   much of the moon is lit, how much cloud is in the way, and when
   true darkness actually begins. Three are arithmetic; only the cloud
   needs a server, and the weather call above already fetched it.
   =========================================================== */
async function itLiveSky(p){
  const wx = await itLiveWeather(p);
  const now = new Date();

  /* mean cloud over the hours anyone would actually be out: 22:00 to
     02:00 local, taken from the hourly series already in hand */
  let cloud = null;
  if (wx && wx.hours && wx.hours.cloud){
    const t = wx.hours.time, cc = wx.hours.cloud, pick = [];
    for (let i = 0; i < t.length; i++){
      const h = +t[i].slice(11, 13);
      if (h >= 22 || h <= 2) pick.push(cc[i]);
      if (pick.length >= 5) break;
    }
    if (pick.length) cloud = Math.round(pick.reduce((a, b) => a + b, 0) / pick.length);
  }

  const moon = itMoon(now);
  const dark = itDarkness(p);
  const astro = itSunEvent(now, p.lat, p.lon, -18);
  const civil = itSunEvent(now, p.lat, p.lon, -6);

  /* A score out of ten, weighted the way an observer would weight it.

     Darkness sets the ceiling and the other two take away from it:
     cloud ruins a night outright, and a full moon costs you
     everything faint even on a clear one. Written as a product of the
     ceiling rather than added to a base, because no amount of clear
     sky makes central Milan good for stars — and a formula with a
     floor in it would claim otherwise. */
  let score = null;
  if (cloud !== null){
    const clear = 1 - cloud / 100;
    const moonCost = 1 - moon.lit * 0.5;
    score = Math.round(dark.score * clear * moonCost);
    score = Math.max(0, Math.min(10, score));
  }

  return {
    cloud: cloud,
    moonLit: Math.round(moon.lit * 100),
    moonName: moon.name,
    darkness: dark,
    score: score,
    sunset: wx ? wx.sunset : '',
    sunrise: wx ? wx.sunrise : '',
    duskCivil: civil ? civil.set.toISOString() : '',
    fullDark: astro ? astro.set.toISOString() : '',
    firstLight: astro ? astro.rise.toISOString() : ''
  };
}

/* ===========================================================
   THE GROUND — USGS FDSN

   Italy sits on a subduction zone and three of its volcanoes are
   active. For the places built on magma, what the ground did this
   week is live information in the plainest sense.

   USGS rather than INGV: the USGS FDSN endpoint sends CORS headers
   and is reachable from a browser, which the Italian national
   service does not reliably do from a static page.
   =========================================================== */
async function itLiveSeismic(p){
  if (!itLiveReady()) return null;
  if (typeof itIsVolcanic === 'function' && !itIsVolcanic(p)) return null;
  return liveOnce('itq.' + itKey(p), 'itquake', async () => {
    const since = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const u = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
      + '?format=geojson&latitude=' + p.lat + '&longitude=' + p.lon
      + '&maxradiuskm=60&starttime=' + since
      + '&minmagnitude=1&orderby=time&limit=20';
    const j = await liveGet(u, { ms: 12000 });
    const f = j && j.features;
    if (!f || !f.length) return { count: 0, top: null };
    let top = f[0];
    f.forEach(e => {
      if (e.properties && top.properties && e.properties.mag > top.properties.mag) top = e;
    });
    return {
      count: f.length,
      top: {
        mag: top.properties.mag,
        place: top.properties.place || '',
        when: top.properties.time,
        depth: top.geometry && top.geometry.coordinates ? top.geometry.coordinates[2] : null
      }
    };
  });
}

/* ===========================================================
   WHEN THE COUNTRY IS SHUT

   Ferragosto on 15 August closes a surprising amount of Italy, and
   almost every museum in the country shuts on a Monday. The first is
   a lookup; the second is a fact worth stating without one.
   =========================================================== */
async function itLiveHolidays(year){
  if (!itLiveReady()) return null;
  const y = year || new Date().getFullYear();
  return liveOnce('ithol.' + y, 'itholiday', async () => {
    const j = await liveGet('https://date.nager.at/api/v3/PublicHolidays/' + y + '/IT');
    if (!Array.isArray(j)) return [];
    return j.map(h => ({ date: h.date, name: h.localName || h.name, en: h.name }));
  });
}

/* Is today, or any of the next few days, a public holiday? */
async function itHolidayNow(days){
  const list = await itLiveHolidays();
  if (!list || !list.length) return null;
  const today = new Date();
  const horizon = new Date(today.getTime() + (days || 3) * 86400000);
  const iso = d => d.toISOString().slice(0, 10);
  const hit = list.filter(h => h.date >= iso(today) && h.date <= iso(horizon));
  return hit.length ? hit : null;
}

/* ===========================================================
   FORMATTING

   Italian places are shown in Italian units, because that is what the
   signs, the forecasts and the people around you will be using.
   =========================================================== */
/* Two kinds of timestamp arrive here and they must not be treated the
   same way.

   Open-Meteo, asked for timezone=Europe/Rome, answers with local
   wall-clock strings carrying no zone marker at all: "2026-06-21T05:32"
   means half past five in the morning in Italy. Handing that to Date()
   makes the browser read it as the READER'S local time and then convert
   it a second time, which moved an Italian sunrise by seven hours for
   anyone sitting in Chicago. Those strings are already the answer, so
   the digits are taken as they stand.

   The sun and twilight times computed in this file are real instants
   and arrive as true UTC with a Z on the end. Those do need converting,
   and get it. */
function itIsLocalStamp(s){
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && !/([Zz]|[+-]\d{2}:?\d{2})$/.test(s);
}
function itClock(s){
  if (!s) return '';
  if (itIsLocalStamp(s)) return s.slice(11, 16);
  try {
    const d = new Date(s);
    if (isNaN(d)) return '';
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: 'Europe/Rome' }).format(d);
  } catch(e){ return ''; }
}

/* Weekday from a date, which must not drift either. A plain
   "2026-06-22" is pinned to midday UTC so that no reader's offset can
   push it onto the day before or after. */
function itDayName(s){
  if (!s) return '';
  try {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (!m) return '';
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12, 0, 0));
    if (isNaN(d)) return '';
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' }).format(d);
  } catch(e){ return ''; }
}
function itAgo(ms){
  const s = Math.max(0, (Date.now() - ms) / 1000);
  if (s < 3600) return Math.round(s / 60) + ' min ago';
  if (s < 86400) return Math.round(s / 3600) + ' hr ago';
  return Math.round(s / 86400) + ' days ago';
}
