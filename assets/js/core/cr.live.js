/* ===========================================================
   COSTA RICA — LIVE

   Everything about a Costa Rican place that is only true today: the
   weather and the wind, the sea on whichever of the two coasts you
   are standing on, the air, the clock, what the ground has been
   doing, and whether tonight is worth looking up at.

   Separate from live.js for the same reason Italy's file is: seven of
   the US site's sources stop at the US border. api.weather.gov has no
   forecast for Monteverde, the Park Service has no opinion on
   Corcovado, and NOAA has no tide gauge in the Golfo Dulce. So this
   runs on sources that are actually global:

     Open-Meteo            forecast, wind, gusts, UV, cloud, rain odds
     Open-Meteo Marine     waves, swell, sea temperature, currents
     Open-Meteo Air        US AQI and particulates
     USGS FDSN             seismicity
     Nager.Date            Costa Rican public holidays
     arithmetic            sun, twilight, moon and season

   Four things here are genuinely not Italy with the names changed,
   and they are the reason this is its own file rather than a config:

     TWO OCEANS.  The Pacific and the Caribbean are four hours apart
     and behave nothing alike — three metres of tide and long southern
     swell on one side, almost no tide and months of flat on the other.
     A sea panel that does not say which one it means is useless here.

     NO DAYLIGHT SAVING.  The country is UTC−6 in January and UTC−6 in
     July. Anything that helpfully applies a summer offset is wrong.

     EQUATORIAL SUN.  UV routinely reaches 11+, which is off the top
     of the scale most of these panels were designed around, and the
     day length barely moves all year.

     THE SEASON IS THE WHOLE TRIP.  Dry or green decides whether a
     road is passable, and on the Caribbean the pattern is inverted
     from the rest of the country.

   The rules from live.js still hold: nothing is required, everything
   resolves to null rather than throwing, every panel renders without
   its row, and nothing needs an API key.
   =========================================================== */

(function crTTL(){
  try {
    if (typeof LIVE_TTL === 'object' && LIVE_TTL){
      LIVE_TTL.crwx      = 30;     /* forecast: half an hour */
      LIVE_TTL.crsea     = 60;
      LIVE_TTL.crair     = 60;
      LIVE_TTL.crquake   = 30;
      LIVE_TTL.crholiday = 20160;
    }
  } catch(e){}
})();

/* From live.js. If that file is missing, everything below returns
   null rather than throwing a ReferenceError and taking the page
   down with it. */
function crLiveReady(){
  return typeof liveGet === 'function' && typeof liveOnce === 'function';
}
const crKey = p => p.id || (p.lat.toFixed(2) + ',' + p.lon.toFixed(2));
const CR_TZ_PARAM = 'America%2FCosta_Rica';

/* ===========================================================
   READING THE NUMBERS
   =========================================================== */

/* WMO present-weather codes, which is what Open-Meteo speaks. The
   snow rows are kept even though it has never snowed in Costa Rica,
   because the table is the standard one and a missing key would
   render a blank where a word belongs. */
const CR_WMO = {
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
function crWeatherWord(code){
  return CR_WMO[code] !== undefined ? CR_WMO[code] : '';
}

const CR_COMPASS = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                    'S','SSW','SW','WSW','W','WNW','NW','NNW'];
function crCompass(deg){
  if (deg === null || deg === undefined || isNaN(deg)) return '';
  return CR_COMPASS[Math.round(((deg % 360) + 360) % 360 / 22.5) % 16];
}

function crBeaufort(kmh){
  if (kmh === null || kmh === undefined || isNaN(kmh)) return null;
  const t = [[1,0,'Calm'],[6,1,'Light air'],[12,2,'Light breeze'],[20,3,'Gentle breeze'],
             [29,4,'Moderate breeze'],[39,5,'Fresh breeze'],[50,6,'Strong breeze'],
             [62,7,'Near gale'],[75,8,'Gale'],[89,9,'Strong gale'],
             [103,10,'Storm'],[118,11,'Violent storm']];
  for (const row of t) if (kmh < row[0]) return { force: row[1], word: row[2] };
  return { force: 12, word: 'Hurricane force' };
}

/* The Douglas sea scale, which is what "rough" actually means. */
function crSeaState(m){
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

/* US AQI bands rather than the European ones Italy uses. Costa Rica
   is in the Americas, the EPA scale is the one quoted here, and the
   two scales disagree enough that mixing them would mislabel the
   air — 45 is "Fair" in Europe and "Good" in the US. */
function crAirWord(aqi){
  if (aqi === null || aqi === undefined || isNaN(aqi)) return '';
  if (aqi <= 50)  return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for sensitive groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very unhealthy';
  return 'Hazardous';
}

/* UV, which matters more here than almost anywhere these panels have
   been pointed before. Ten degrees off the equator at altitude, the
   index reaches 11+ by mid-morning for much of the year, and the
   standard scale simply tops out. */
function crUvWord(uv){
  if (uv === null || uv === undefined || isNaN(uv)) return '';
  if (uv < 3)  return 'Low';
  if (uv < 6)  return 'Moderate';
  if (uv < 8)  return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
}
function crUvAdvice(uv){
  if (uv === null || uv === undefined || isNaN(uv)) return '';
  if (uv < 3)  return 'no protection needed';
  if (uv < 6)  return 'cover up in the middle of the day';
  if (uv < 8)  return 'shade between 10 and 2';
  if (uv < 11) return 'burns in about 15 minutes';
  return 'burns in under 10 minutes — stay out of it midday';
}

/* ===========================================================
   THE SEASON

   The single most useful thing you can tell somebody planning a
   Costa Rican trip, and it needs no server at all.

   Two patterns, not one. Most of the country runs a dry season from
   mid-December to late April and a green season the rest of the year,
   with a reliable dry spell — the veranillo, the little summer —
   somewhere in late June and July. The Caribbean ignores all of it:
   it rains there year round, and its drier windows are September to
   October and again in February and March, which is exactly when the
   Pacific side is at its wettest.

   Getting this backwards sends somebody to Puerto Viejo in the one
   month it is least likely to be pleasant, so the two coasts are
   answered separately rather than averaged.
   =========================================================== */
function crSeason(p, date){
  const d = date || new Date();
  const m = d.getMonth() + 1;                  /* 1-12 */
  const caribbean = p && p.abbr === 'CAR';

  if (caribbean){
    if (m === 9 || m === 10)
      return { name: 'Driest window', green: false,
        note: 'September and October are the Caribbean’s best weather, and the Pacific’s worst.' };
    if (m === 2 || m === 3)
      return { name: 'Second dry window', green: false,
        note: 'A shorter drier spell. Reliable enough to plan around, not guaranteed.' };
    if (m === 11 || m === 12 || m === 1)
      return { name: 'Wettest months', green: true,
        note: 'The Caribbean’s heaviest rain, and the one time roads here go under.' };
    return { name: 'Rain year round', green: true,
      note: 'No true dry season on this coast — expect rain most days, usually not all day.' };
  }

  if (m === 12 && d.getDate() < 15)
    return { name: 'End of the green season', green: true,
      note: 'The rain is easing. Everything is still green and the crowds have not arrived.' };
  if (m === 12 || m <= 4)
    return { name: 'Dry season', green: false,
      note: 'Verano: reliable sun, dusty roads, the highest prices and the fullest beaches.' };
  if (m === 5)
    return { name: 'Start of the green season', green: true,
      note: 'The rains return in the afternoons. The country turns green within a fortnight.' };
  if (m === 6 || m === 7)
    return { name: 'Veranillo', green: true,
      note: 'The little summer — a dry spell inside the wet season, and one of the best times to come.' };
  if (m === 9 || m === 10)
    return { name: 'Peak green season', green: true,
      note: 'The wettest months on the Pacific. Mornings are often clear; afternoons are not.' };
  return { name: 'Green season', green: true,
    note: 'Clear mornings, afternoon downpours, low prices and nobody on the trails.' };
}

/* ===========================================================
   THE CLOCK

   No request and no key, and no daylight saving to get wrong.
   =========================================================== */
function crLocalTime(){
  const tz = (typeof crZoneOf === 'function') ? crZoneOf() : 'America/Costa_Rica';
  try {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(now);
    const date = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', timeZone: tz }).format(now);
    const zone = new Intl.DateTimeFormat('en-GB', {
      timeZoneName: 'short', timeZone: tz }).format(now).split(', ').pop();
    /* Offset from the reader, taken from the zone's own declared UTC
       offset rather than by formatting a date and parsing it back —
       that round trip depends on the browser's locale parser accepting
       its own output, which fails silently when it does not. */
    let diff = null;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(now);
      const name = (parts.find(x => x.type === 'timeZoneName') || {}).value || '';
      const mm = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(name);
      if (mm){
        const thereMin = (mm[1] === '-' ? -1 : 1) * (+mm[2] * 60 + (+mm[3] || 0));
        const hereMin  = -now.getTimezoneOffset();
        diff = Math.round((thereMin - hereMin) / 60);
      }
    } catch(e){}
    return { time: time, date: date, zone: zone, diff: diff };
  } catch(e){ return null; }
}

/* ===========================================================
   SUN, TWILIGHT AND MOON

   The same standard solar equation as elsewhere in the atlas, with
   the elevation angle as an argument so that true darkness (−18°)
   can be asked for as well as sunrise.

   Worth noting what it produces here: ten degrees off the equator,
   sunrise and sunset barely move across the year — about 5:30 and
   17:30 give or take half an hour — and twilight is short. It gets
   dark fast, which surprises people walking back from a beach.
   =========================================================== */
function crSunEvent(date, lat, lon, angleDeg){
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
  if (cosOmega > 1 || cosOmega < -1) return null;
  const omega = Math.acos(cosOmega) / rad;
  const toDate = J => new Date((J - 2440587.5) * DAY);
  return { rise: toDate(Jtransit - omega / 360), set: toDate(Jtransit + omega / 360) };
}

/* Age and lit fraction of the moon. Named apart from live.js's
   moonPhase and from Italy's so that loading all three files cannot
   have one quietly redefine another. */
function crMoon(date){
  const syn = 29.530588853;
  const days = (date.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
  const age = ((days % syn) + syn) % syn;
  const lit = (1 - Math.cos(2 * Math.PI * age / syn)) / 2;
  const names = ['New moon','Waxing crescent','First quarter','Waxing gibbous',
                 'Full moon','Waning gibbous','Last quarter','Waning crescent'];
  const idx = Math.floor(((age / syn) * 8 + 0.5)) % 8;
  return { age: age, lit: lit, name: names[idx] };
}

/* How dark the ground is, before any weather.

   Inferred from what the place IS rather than asserted as data, and
   labelled as an estimate everywhere it is shown. Costa Rica scores
   better than Italy on this across the board: there is no city here
   on the scale of Milan, and the Osa and the Talamanca ridges are
   genuinely among the darkest accessible skies in the Americas. */
function crDarkness(p){
  if (!p) return { score: 3, word: 'unknown' };
  const land = p.land || [], flags = p.flags || [];
  if (flags.indexOf('darksky') !== -1) return { score: 9, word: 'excellent' };
  if (p.kind === 'np' || p.kind === 'reserve' || p.kind === 'refuge')
    return { score: 8, word: 'very dark' };
  if (land.indexOf('urban') !== -1){
    return (p.prom >= 7) ? { score: 2, word: 'town glow' }
                         : { score: 3, word: 'some glow' };
  }
  if (p.kind === 'mountain' || p.kind === 'volcano') return { score: 8, word: 'very dark' };
  if (p.kind === 'island')  return { score: 7, word: 'dark' };
  if (land.indexOf('rural') !== -1 || land.indexOf('forest') !== -1
      || land.indexOf('mountain') !== -1) return { score: 6, word: 'fairly dark' };
  if (p.kind === 'beach') return { score: 5, word: 'some glow' };
  return { score: 4, word: 'some glow' };
}

/* ===========================================================
   WEATHER — Open-Meteo

   One request carries current conditions, the hours the sky panel
   needs and a five-day outlook.
   =========================================================== */
async function crLiveWeather(p){
  if (!crLiveReady()) return null;
  return liveOnce('crwx.' + crKey(p), 'crwx', async () => {
    const u = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,'
      + 'precipitation,weather_code,cloud_cover,pressure_msl,'
      + 'wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day'
      + '&hourly=cloud_cover,temperature_2m,precipitation_probability'
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,'
      + 'sunrise,sunset,uv_index_max,precipitation_probability_max,'
      + 'precipitation_sum,wind_speed_10m_max'
      + '&timezone=' + CR_TZ_PARAM + '&forecast_days=6';
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
          mm: d.precipitation_sum ? Math.round(d.precipitation_sum[i]) : null,
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
      uv: d.uv_index_max ? Math.round(d.uv_index_max[0]) : null,
      sunrise: d.sunrise ? d.sunrise[0] : '',
      sunset: d.sunset ? d.sunset[0] : '',
      hours: (j.hourly && j.hourly.time)
        ? { time: j.hourly.time, cloud: j.hourly.cloud_cover,
            rain: j.hourly.precipitation_probability } : null,
      days: days
    };
  });
}

/* When the rain is actually coming.

   In the green season it is not "will it rain today" — it will — but
   "how long have I got", and the answer is almost always the same:
   clear until about noon, then convection. Reading it off the hourly
   series is more honest than repeating the cliché, because the
   Caribbean and the high ridges do not follow it. */
/* What hour it is IN COSTA RICA, not where the reader is sitting.

   The hourly series comes back in Costa Rican wall-clock, so comparing
   it against the browser's own getHours() silently reads the forecast
   against the wrong clock — the same mistake that once moved an
   Italian sunrise by seven hours. It happens to agree for a reader in
   Chicago in November and is six hours out from London. */
function crLocalHour(){
  try {
    const s = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', hour12: false,
      timeZone: (typeof crZoneOf === 'function') ? crZoneOf() : 'America/Costa_Rica'
    }).format(new Date());
    const h = parseInt(s, 10);
    return isNaN(h) ? null : h;
  } catch(e){ return null; }
}

function crRainWindow(wx){
  if (!wx || !wx.hours || !wx.hours.rain || !wx.hours.time) return null;
  const t = wx.hours.time, r = wx.hours.rain;
  const nowH = crLocalHour();
  let firstWet = null, maxP = 0;
  for (let i = 0; i < t.length && i < 24; i++){
    const hour = +String(t[i]).slice(11, 13);
    const p = r[i];
    if (p === null || p === undefined) continue;
    if (p > maxP) maxP = p;
    /* only look forward from the current hour where the rain would
       actually fall; with no usable clock, report the whole day */
    if (firstWet === null && p >= 50 && (nowH === null || hour >= nowH)) firstWet = hour;
  }
  if (!maxP) return null;
  return { firstWet: firstWet, peak: maxP };
}

/* ===========================================================
   THE SEA — Open-Meteo Marine

   Asked for wherever a coast is reachable; an inland cell answers
   with every field null and is rejected as "not a sea".

   Unlike Italy, the answer carries which ocean it came from. On a
   country this narrow that is not decoration: a two-metre swell is
   an ordinary Tuesday at Pavones and close to unheard of at Punta
   Uva, and the same number means different things on the two sides.
   =========================================================== */
async function crLiveSea(p){
  if (!crLiveReady()) return null;
  const near = (typeof crMaybeCoastal === 'function') ? crMaybeCoastal
             : (typeof crIsCoastal === 'function')    ? crIsCoastal : null;
  if (near && !near(p)) return null;
  return liveOnce('crsea.' + crKey(p), 'crsea', async () => {
    const u = 'https://marine-api.open-meteo.com/v1/marine'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=wave_height,wave_direction,wave_period,'
      + 'swell_wave_height,swell_wave_period,sea_surface_temperature,'
      + 'ocean_current_velocity,ocean_current_direction'
      + '&daily=wave_height_max&timezone=' + CR_TZ_PARAM + '&forecast_days=3';
    const j = await liveGet(u);
    const c = j && j.current;
    if (!c) return null;
    const out = {
      ocean: (typeof crOceanOf === 'function') ? crOceanOf(p) : '',
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
    const any = ['waveH','sst','currentSpeed','swellH']
      .some(k => out[k] !== null && out[k] !== undefined);
    return any ? out : null;
  });
}

/* ===========================================================
   THE AIR — Open-Meteo Air Quality
   =========================================================== */
async function crLiveAir(p){
  if (!crLiveReady()) return null;
  return liveOnce('crair.' + crKey(p), 'crair', async () => {
    const u = 'https://air-quality-api.open-meteo.com/v1/air-quality'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=us_aqi,pm2_5,pm10&timezone=' + CR_TZ_PARAM;
    const j = await liveGet(u);
    const c = j && j.current;
    if (!c || c.us_aqi === null || c.us_aqi === undefined) return null;
    return {
      aqi: Math.round(c.us_aqi),
      pm25: c.pm2_5 === null ? null : Math.round(c.pm2_5),
      pm10: c.pm10 === null ? null : Math.round(c.pm10)
    };
  });
}

/* ===========================================================
   TONIGHT'S SKY
   =========================================================== */
async function crLiveSky(p){
  const wx = await crLiveWeather(p);
  const now = new Date();

  let cloud = null;
  if (wx && wx.hours && wx.hours.cloud){
    const t = wx.hours.time, cc = wx.hours.cloud, pick = [];
    for (let i = 0; i < t.length; i++){
      const h = +String(t[i]).slice(11, 13);
      if (h >= 20 || h <= 2) pick.push(cc[i]);     /* it is dark by 18:30 here */
      if (pick.length >= 5) break;
    }
    if (pick.length) cloud = Math.round(pick.reduce((a, b) => a + b, 0) / pick.length);
  }

  const moon = crMoon(now);
  const dark = crDarkness(p);
  const astro = crSunEvent(now, p.lat, p.lon, -18);
  const civil = crSunEvent(now, p.lat, p.lon, -6);

  /* Darkness sets the ceiling; cloud and moon take away from it.
     A product rather than a sum, so that no amount of clear sky can
     claim good stargazing from the middle of San José. */
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

   Costa Rica sits where the Cocos plate goes under the Caribbean
   one. It has six active volcanoes and feels something most weeks,
   so this is live information in the plainest sense — more so than
   in Italy, and the radius is correspondingly wider.
   =========================================================== */
async function crLiveSeismic(p){
  if (!crLiveReady()) return null;
  if (typeof crIsVolcanic === 'function' && !crIsVolcanic(p)) return null;
  return liveOnce('crq.' + crKey(p), 'crquake', async () => {
    const since = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const u = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
      + '?format=geojson&latitude=' + p.lat + '&longitude=' + p.lon
      + '&maxradiuskm=80&starttime=' + since
      + '&minmagnitude=2&orderby=time&limit=20';
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

   Semana Santa is the one that catches people out: Thursday and
   Friday of Easter week effectively close the country, buses stop,
   and by law no alcohol used to be sold at all.
   =========================================================== */
async function crLiveHolidays(year){
  if (!crLiveReady()) return null;
  const y = year || new Date().getFullYear();
  return liveOnce('crhol.' + y, 'crholiday', async () => {
    const j = await liveGet('https://date.nager.at/api/v3/PublicHolidays/' + y + '/CR');
    if (!Array.isArray(j)) return [];
    return j.map(h => ({ date: h.date, name: h.localName || h.name, en: h.name }));
  });
}

async function crHolidayNow(days){
  const list = await crLiveHolidays();
  if (!list || !list.length) return null;
  const today = new Date();
  const horizon = new Date(today.getTime() + (days || 3) * 86400000);
  const iso = d => d.toISOString().slice(0, 10);
  const hit = list.filter(h => h.date >= iso(today) && h.date <= iso(horizon));
  return hit.length ? hit : null;
}

/* ===========================================================
   FORMATTING

   Two kinds of timestamp arrive here and they must not be treated
   the same way.

   Open-Meteo, asked for timezone=America/Costa_Rica, answers with
   local wall-clock strings carrying no zone marker: "2026-06-21T05:32"
   means half past five in the morning in Costa Rica. Handing that to
   Date() makes the browser read it as the READER'S local time and
   convert it a second time — the bug that moved an Italian sunrise by
   seven hours for anyone in Chicago.

   The sun and twilight times computed in this file are real instants
   and arrive as true UTC with a Z. Those do need converting.
   =========================================================== */
function crIsLocalStamp(s){
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && !/([Zz]|[+-]\d{2}:?\d{2})$/.test(s);
}
function crClock(s){
  if (!s) return '';
  if (crIsLocalStamp(s)) return String(s).slice(11, 16);
  try {
    const d = new Date(s);
    if (isNaN(d)) return '';
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: 'America/Costa_Rica' }).format(d);
  } catch(e){ return ''; }
}

/* Weekday from a date, pinned to midday UTC so that no reader's
   offset can push it onto the day before or after. */
function crDayName(s){
  if (!s) return '';
  try {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (!m) return '';
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12, 0, 0));
    if (isNaN(d)) return '';
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' }).format(d);
  } catch(e){ return ''; }
}
function crAgo(ms){
  const s = Math.max(0, (Date.now() - ms) / 1000);
  if (s < 3600) return Math.round(s / 60) + ' min ago';
  if (s < 86400) return Math.round(s / 3600) + ' hr ago';
  return Math.round(s / 86400) + ' days ago';
}
