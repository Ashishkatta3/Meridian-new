/* ===========================================================
   INDIA — LIVE

   What is only true today about a place in India: the weather, the
   monsoon it is or is not currently in, the air, the sea on whichever
   of three coasts, the clock, the ground, and whether tonight is
   worth looking up at.

   Separate from live.js for the same reason Italy's and Costa Rica's
   files are: the US sources stop at the US border. It runs on
   Open-Meteo, Open-Meteo Marine, Open-Meteo Air, USGS FDSN and
   Nager.Date, none of which needs a key.

   Five things here are genuinely India and not another country with
   the names changed:

     THE MONSOON decides the trip. Not a season in the European sense
     but a system that arrives on a date, crosses the country over six
     weeks, and withdraws. Half the country's travel advice is really
     advice about where the rain currently is — and Tamil Nadu runs a
     second monsoon in the opposite direction, so a single national
     answer would be wrong for an entire state.

     THE AIR is a headline fact, not a footnote. Delhi in December
     routinely reaches air quality figures that would close schools
     anywhere else, and a panel that buries that under the humidity
     is not being useful.

     THE HEAT in the plains before the rains break is dangerous in a
     way the word "hot" does not carry.

     ALTITUDE. Leh is at three thousand five hundred metres and people
     fly straight into it from sea level.

     ONE CLOCK, thirty degrees of longitude. India runs a single
     timezone from Gujarat to Arunachal, so the sun and the clock
     disagree by nearly an hour at each end — which is why sunrise in
     the Northeast can be before five in the morning.
   =========================================================== */

(function inTTL(){
  try {
    if (typeof LIVE_TTL === 'object' && LIVE_TTL){
      LIVE_TTL.inwx      = 30;
      LIVE_TTL.insea     = 60;
      LIVE_TTL.inair     = 30;     /* air moves fast here and matters */
      LIVE_TTL.inquake   = 30;
      LIVE_TTL.inholiday = 20160;
    }
  } catch(e){}
})();

function inLiveReady(){
  return typeof liveGet === 'function' && typeof liveOnce === 'function';
}
const inKey = p => p.id || (p.lat.toFixed(2) + ',' + p.lon.toFixed(2));
const IN_TZ_PARAM = 'Asia%2FKolkata';

/* ===========================================================
   READING THE NUMBERS
   =========================================================== */
const IN_WMO = {
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
function inWeatherWord(code){
  return IN_WMO[code] !== undefined ? IN_WMO[code] : '';
}

const IN_COMPASS = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                    'S','SSW','SW','WSW','W','WNW','NW','NNW'];
function inCompass(deg){
  if (deg === null || deg === undefined || isNaN(deg)) return '';
  return IN_COMPASS[Math.round(((deg % 360) + 360) % 360 / 22.5) % 16];
}

function inBeaufort(kmh){
  if (kmh === null || kmh === undefined || isNaN(kmh)) return null;
  const t = [[1,0,'Calm'],[6,1,'Light air'],[12,2,'Light breeze'],[20,3,'Gentle breeze'],
             [29,4,'Moderate breeze'],[39,5,'Fresh breeze'],[50,6,'Strong breeze'],
             [62,7,'Near gale'],[75,8,'Gale'],[89,9,'Strong gale'],
             [103,10,'Storm'],[118,11,'Violent storm']];
  for (const row of t) if (kmh < row[0]) return { force: row[1], word: row[2] };
  return { force: 12, word: 'Hurricane force' };
}

function inSeaState(m){
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

/* US AQI bands, which is the scale quoted in India and the one the
   CPCB's own categories line up with most closely. */
function inAirWord(aqi){
  if (aqi === null || aqi === undefined || isNaN(aqi)) return '';
  if (aqi <= 50)  return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for sensitive groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very unhealthy';
  return 'Hazardous';
}

/* The air gets a sentence rather than a number here, because in the
   north between about November and January the number alone
   understates it. An AQI over three hundred is not a bad day; it is
   a reason to change plans. */
function inAirAdvice(aqi){
  if (aqi === null || aqi === undefined || isNaN(aqi)) return '';
  if (aqi <= 50)  return 'clean';
  if (aqi <= 100) return 'fine for most people';
  if (aqi <= 150) return 'take it easy if you have a chest';
  if (aqi <= 200) return 'limit hard exercise outdoors';
  if (aqi <= 300) return 'wear a proper mask outside';
  return 'stay indoors where you can — this is genuinely harmful';
}

function inUvWord(uv){
  if (uv === null || uv === undefined || isNaN(uv)) return '';
  if (uv < 3)  return 'Low';
  if (uv < 6)  return 'Moderate';
  if (uv < 8)  return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
}

/* Heat, described the way it actually behaves. Humid heat at
   thirty-eight is more dangerous than dry heat at forty-four,
   because sweat stops working, so this reads the apparent
   temperature rather than the air temperature. */
function inHeatAdvice(feels){
  if (feels === null || feels === undefined || isNaN(feels)) return '';
  if (feels >= 54) return 'extreme — heatstroke risk within minutes of exertion';
  if (feels >= 47) return 'dangerous — stay out of the sun entirely between 11 and 4';
  if (feels >= 41) return 'very hot — sightsee early, rest through the afternoon';
  if (feels >= 35) return 'hot — carry more water than you think you need';
  return '';
}

/* ===========================================================
   THE MONSOON

   The single most useful thing you can tell somebody planning an
   Indian trip, and it needs no server.

   Two systems, not one. The southwest monsoon arrives in Kerala
   around the first of June, crosses the country over about six
   weeks, and withdraws from the northwest in September and from the
   south by mid-October. The northeast monsoon then runs the other
   way from October to December and brings Tamil Nadu and the
   southeast coast most of their rain for the year — which means that
   the best months for most of India are the worst for Chennai.

   And a third case: Ladakh and Spiti sit in the rain shadow behind
   the main Himalayan range. The monsoon barely reaches them, which
   is precisely why their season is the months everybody else is
   avoiding.
   =========================================================== */
function inMonsoonZone(p){
  if (!p) return 'southwest';
  if (p.abbr === 'LAD') return 'rainshadow';
  const land = p.land || [];
  if (p.abbr === 'HPR' && land.indexOf('desert') !== -1) return 'rainshadow';
  if (p.abbr === 'TND' || p.abbr === 'PUD') return 'northeast';
  /* the southeast coast of Andhra shares Tamil Nadu's pattern */
  if (p.abbr === 'APR' && p.lon > 79.5 && p.lat < 16.5) return 'northeast';
  return 'southwest';
}

function inMonsoon(p, date){
  const d = date || new Date();
  const m = d.getMonth() + 1;
  const zone = inMonsoonZone(p);

  if (zone === 'rainshadow'){
    if (m >= 6 && m <= 9)
      return { name: 'Open season', wet: false,
        note: 'The rain shadow keeps the monsoon out, which is why this is the one window the roads and passes are open.' };
    if (m >= 11 || m <= 3)
      return { name: 'Closed by snow', wet: false,
        note: 'Passes shut and much of the region is cut off or reachable only by air. Deep cold.' };
    return { name: 'Shoulder', wet: false,
      note: 'Passes opening or closing depending on the year. Check the road status before committing.' };
  }

  if (zone === 'northeast'){
    if (m >= 10 && m <= 12)
      return { name: 'Northeast monsoon', wet: true,
        note: 'This coast gets most of its rain now, running the opposite way to the rest of India’s monsoon. Cyclone season too.' };
    if (m >= 1 && m <= 2)
      return { name: 'Cool and dry', wet: false,
        note: 'The best months here — warm days, low humidity, and the rain finished.' };
    if (m >= 3 && m <= 5)
      return { name: 'Hot season', wet: false,
        note: 'Building heat and humidity on the plains. The hill stations above are at their best.' };
    return { name: 'Southwest monsoon, mostly missed', wet: false,
      note: 'The main monsoon is blocked by the Western Ghats, so this side stays comparatively dry and very humid.' };
  }

  /* southwest, which is most of the country */
  if (m >= 6 && m <= 9)
    return { name: 'Southwest monsoon', wet: true,
      note: 'The rains. Green, cheap and empty, with landslides in the hills and some parks closed.' };
  if (m === 10)
    return { name: 'Monsoon withdrawing', wet: true,
      note: 'The rain is ending region by region and the land is still green. One of the best times to travel.' };
  if (m === 11 || m === 12 || m <= 2)
    return { name: 'Cool and dry', wet: false,
      note: 'Peak season. Clear skies, comfortable days — and, in the northern plains, the worst air of the year.' };
  if (m === 3)
    return { name: 'Warming up', wet: false,
      note: 'Still pleasant in most of the country, and the last comfortable month on the plains.' };
  return { name: 'Hot season', wet: false,
    note: 'The build-up before the rains. Forty degrees and up across the plains; the hills and the Himalaya are the answer.' };
}

/* ===========================================================
   ONE CLOCK, THIRTY DEGREES OF LONGITUDE

   Indian Standard Time is set on the 82.5°E meridian, and the whole
   country keeps it — from Gujarat at about 69°E to Arunachal at
   about 96°E. The sun therefore runs ahead of the clock in the east
   and behind it in the west, by up to an hour at each end, which is
   why the sun can be up before five in the morning in Assam and why
   there is a long-running argument about a second timezone.

   Four minutes of time per degree of longitude; positive means the
   sun is ahead of the clock, so everything happens early.
   =========================================================== */
function inClockVsSun(p){
  if (!p || typeof p.lon !== 'number') return null;
  const mins = Math.round((p.lon - 82.5) * 4);
  if (Math.abs(mins) < 20) return null;         /* not worth a line */
  return {
    mins: Math.abs(mins),
    early: mins > 0,
    note: mins > 0
      ? 'the sun runs about ' + Math.abs(mins) + ' minutes ahead of the clock here — India keeps one timezone across thirty degrees of longitude'
      : 'the sun runs about ' + Math.abs(mins) + ' minutes behind the clock here — India keeps one timezone across thirty degrees of longitude'
  };
}

/* Altitude, where it is a fact of the visit rather than trivia. */
function inAltitudeNote(p){
  if (!p || typeof inIsHighAltitude !== 'function' || !inIsHighAltitude(p)) return '';
  if (p.abbr === 'LAD')
    return 'three thousand five hundred metres and up — give yourself two full days before doing anything strenuous';
  if (p.kind === 'pass')
    return 'a high pass — do not linger if anyone is feeling it, and descend if a headache gets worse';
  return 'high ground — altitude is worth respecting if you have come up fast';
}

/* ===========================================================
   THE CLOCK
   =========================================================== */
function inLocalTime(){
  const tz = (typeof inZoneOf === 'function') ? inZoneOf() : 'Asia/Kolkata';
  try {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(now);
    const date = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', timeZone: tz }).format(now);
    const zone = new Intl.DateTimeFormat('en-GB', {
      timeZoneName: 'short', timeZone: tz }).format(now).split(', ').pop();
    /* IST is offset by five and a half hours, so the difference from
       a reader can land on a half hour. Reported in minutes and
       formatted by the caller rather than rounded to whole hours. */
    let diffMin = null;
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(now);
      const name = (parts.find(x => x.type === 'timeZoneName') || {}).value || '';
      const mm = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(name);
      if (mm){
        const thereMin = (mm[1] === '-' ? -1 : 1) * (+mm[2] * 60 + (+mm[3] || 0));
        const hereMin  = -now.getTimezoneOffset();
        diffMin = thereMin - hereMin;
      }
    } catch(e){}
    return { time: time, date: date, zone: zone, diffMin: diffMin };
  } catch(e){ return null; }
}

/* "5h 30m ahead of you", which whole hours cannot express for IST. */
function inOffsetWords(diffMin){
  if (diffMin === null || diffMin === undefined) return '';
  if (diffMin === 0) return 'same time as you';
  const a = Math.abs(diffMin), h = Math.floor(a / 60), m = a % 60;
  const span = (h ? h + 'h' : '') + (m ? (h ? ' ' : '') + m + 'm' : '');
  return span + (diffMin > 0 ? ' ahead of you' : ' behind you');
}

/* ===========================================================
   SUN, TWILIGHT AND MOON
   =========================================================== */
function inSunEvent(date, lat, lon, angleDeg){
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

function inMoon(date){
  const syn = 29.530588853;
  const days = (date.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000;
  const age = ((days % syn) + syn) % syn;
  const lit = (1 - Math.cos(2 * Math.PI * age / syn)) / 2;
  const names = ['New moon','Waxing crescent','First quarter','Waxing gibbous',
                 'Full moon','Waning gibbous','Last quarter','Waning crescent'];
  const idx = Math.floor(((age / syn) * 8 + 0.5)) % 8;
  return { age: age, lit: lit, name: names[idx] };
}

/* How dark the ground is, before any weather. Inferred from what the
   place IS, labelled as an estimate, and tuned down for India: the
   Gangetic plain is one of the most light-polluted and haziest
   regions on earth, while Ladakh and Spiti are among the best
   observing sites anywhere. */
function inDarkness(p){
  if (!p) return { score: 3, word: 'unknown' };
  const land = p.land || [], flags = p.flags || [];
  if (flags.indexOf('darksky') !== -1) return { score: 9, word: 'excellent' };
  if (p.abbr === 'LAD' || p.kind === 'pass') return { score: 9, word: 'excellent' };
  if (land.indexOf('urban') !== -1){
    return (p.prom >= 8) ? { score: 1, word: 'heavily lit' }
                         : { score: 2, word: 'town glow' };
  }
  if (p.kind === 'np' || p.kind === 'sanctuary') return { score: 7, word: 'dark' };
  if (p.kind === 'mountain' || p.kind === 'valley') return { score: 7, word: 'dark' };
  if (p.kind === 'desert') return { score: 8, word: 'very dark' };
  if (p.kind === 'island') return { score: 7, word: 'dark' };
  if (land.indexOf('rural') !== -1 || land.indexOf('forest') !== -1) return { score: 5, word: 'some glow' };
  return { score: 4, word: 'some glow' };
}

/* ===========================================================
   WEATHER — Open-Meteo
   =========================================================== */
async function inLiveWeather(p){
  if (!inLiveReady()) return null;
  return liveOnce('inwx.' + inKey(p), 'inwx', async () => {
    const u = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,'
      + 'precipitation,weather_code,cloud_cover,pressure_msl,'
      + 'wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day'
      + '&hourly=cloud_cover,temperature_2m,precipitation_probability'
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,'
      + 'sunrise,sunset,uv_index_max,precipitation_probability_max,'
      + 'precipitation_sum,wind_speed_10m_max'
      + '&timezone=' + IN_TZ_PARAM + '&forecast_days=6';
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

/* ===========================================================
   THE SEA — Open-Meteo Marine
   =========================================================== */
async function inLiveSea(p){
  if (!inLiveReady()) return null;
  const near = (typeof inMaybeCoastal === 'function') ? inMaybeCoastal
             : (typeof inIsCoastal === 'function')    ? inIsCoastal : null;
  if (near && !near(p)) return null;
  return liveOnce('insea.' + inKey(p), 'insea', async () => {
    const u = 'https://marine-api.open-meteo.com/v1/marine'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=wave_height,wave_direction,wave_period,'
      + 'swell_wave_height,swell_wave_period,sea_surface_temperature,'
      + 'ocean_current_velocity,ocean_current_direction'
      + '&daily=wave_height_max&timezone=' + IN_TZ_PARAM + '&forecast_days=3';
    const j = await liveGet(u);
    const c = j && j.current;
    if (!c) return null;
    const out = {
      sea: (typeof inSeaOf === 'function') ? inSeaOf(p) : '',
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

   Given a shorter cache life and a louder voice than in the other
   countries, because in the northern winter this is the number that
   should change what somebody does with their day.
   =========================================================== */
async function inLiveAir(p){
  if (!inLiveReady()) return null;
  return liveOnce('inair.' + inKey(p), 'inair', async () => {
    const u = 'https://air-quality-api.open-meteo.com/v1/air-quality'
      + '?latitude=' + p.lat + '&longitude=' + p.lon
      + '&current=us_aqi,pm2_5,pm10&timezone=' + IN_TZ_PARAM;
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
async function inLiveSky(p){
  const wx = await inLiveWeather(p);
  const now = new Date();

  let cloud = null;
  if (wx && wx.hours && wx.hours.cloud){
    const t = wx.hours.time, cc = wx.hours.cloud, pick = [];
    for (let i = 0; i < t.length; i++){
      const h = +String(t[i]).slice(11, 13);
      if (h >= 21 || h <= 2) pick.push(cc[i]);
      if (pick.length >= 5) break;
    }
    if (pick.length) cloud = Math.round(pick.reduce((a, b) => a + b, 0) / pick.length);
  }

  const moon = inMoon(now);
  const dark = inDarkness(p);
  const astro = inSunEvent(now, p.lat, p.lon, -18);
  const civil = inSunEvent(now, p.lat, p.lon, -6);

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

   The Himalayan front is the most active continental collision zone
   on earth and the Northeast sits on the syntaxis where it turns
   south. Both have produced magnitude-8 events within living memory,
   so for those states this is live information.
   =========================================================== */
async function inLiveSeismic(p){
  if (!inLiveReady()) return null;
  if (typeof inIsSeismic === 'function' && !inIsSeismic(p)) return null;
  return liveOnce('inq.' + inKey(p), 'inquake', async () => {
    const since = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const u = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
      + '?format=geojson&latitude=' + p.lat + '&longitude=' + p.lon
      + '&maxradiuskm=250&starttime=' + since
      + '&minmagnitude=3&orderby=time&limit=20';
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
   =========================================================== */
async function inLiveHolidays(year){
  if (!inLiveReady()) return null;
  const y = year || new Date().getFullYear();
  return liveOnce('inhol.' + y, 'inholiday', async () => {
    const j = await liveGet('https://date.nager.at/api/v3/PublicHolidays/' + y + '/IN');
    if (!Array.isArray(j)) return [];
    return j.map(h => ({ date: h.date, name: h.localName || h.name, en: h.name }));
  });
}

async function inHolidayNow(days){
  const list = await inLiveHolidays();
  if (!list || !list.length) return null;
  const today = new Date();
  const horizon = new Date(today.getTime() + (days || 3) * 86400000);
  const iso = d => d.toISOString().slice(0, 10);
  const hit = list.filter(h => h.date >= iso(today) && h.date <= iso(horizon));
  return hit.length ? hit : null;
}

/* ===========================================================
   FORMATTING

   Open-Meteo, asked for timezone=Asia/Kolkata, answers in local
   wall-clock with no zone marker. Handing those strings to Date()
   makes the browser convert them a second time — the bug that moved
   an Italian sunrise by seven hours. The sun and twilight times
   computed here are true UTC and do need converting.
   =========================================================== */
function inIsLocalStamp(s){
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && !/([Zz]|[+-]\d{2}:?\d{2})$/.test(s);
}
function inClock(s){
  if (!s) return '';
  if (inIsLocalStamp(s)) return String(s).slice(11, 16);
  try {
    const d = new Date(s);
    if (isNaN(d)) return '';
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: 'Asia/Kolkata' }).format(d);
  } catch(e){ return ''; }
}

function inDayName(s){
  if (!s) return '';
  try {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (!m) return '';
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12, 0, 0));
    if (isNaN(d)) return '';
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' }).format(d);
  } catch(e){ return ''; }
}
function inAgo(ms){
  const s = Math.max(0, (Date.now() - ms) / 1000);
  if (s < 3600) return Math.round(s / 60) + ' min ago';
  if (s < 86400) return Math.round(s / 3600) + ' hr ago';
  return Math.round(s / 86400) + ' days ago';
}
