/* ===========================================================
   LIVEKIT — the parts of a live panel that are not country-specific

   Italy, Costa Rica, India and Japan each carry their own full copy
   of this logic, because each was written before the next one
   existed. Spain, Egypt and Iceland share it instead.

   Everything here is keyless and the same sources the rest of the
   atlas already uses:

     Open-Meteo        weather, marine, air quality
     USGS FDSN         earthquakes
     Nager.Date        public holidays
     NOAA SWPC         planetary K index, for the aurora

   Nothing in this file knows about any particular country. The
   country modules pass in a timezone, a model name and a set of
   thresholds; what comes back is numbers turned into words.

   Every call fails to null rather than throwing. A live panel that
   is missing a row is a small disappointment; one that takes the
   page down with it is a bug.
   =========================================================== */

function lkReady(){ return typeof fetch === 'function'; }

/* ---------- dates ---------- */
function lkDayOfYear(d){
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start) / 86400000) + 1;
}

function lkDateFromDoy(year, doy){
  const d = new Date(Date.UTC(year, 0, 1));
  d.setUTCDate(doy);
  return d;
}

const LK_MONTHS = ['January','February','March','April','May','June',
                   'July','August','September','October','November','December'];

function lkMonthDay(year, doy){
  const d = lkDateFromDoy(year, doy);
  return LK_MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate();
}

function lkMonthDayOf(date){
  return LK_MONTHS[date.getUTCMonth()] + ' ' + date.getUTCDate();
}

/* Easter Sunday, Gregorian, by the anonymous Gauss algorithm. Spain
   needs it for Semana Santa and for the Feria de Abril, which is
   pinned two weeks after; nothing else in the atlas does yet. */
function lkEaster(year){
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function lkDaysBetween(a, b){
  return Math.round((Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate())
                   - Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())) / 86400000);
}

/* ---------- the clock ---------- */
function lkOffsetWords(diffMin){
  if (diffMin == null) return '';
  if (Math.abs(diffMin) < 5) return 'the same time as you';
  const ahead = diffMin > 0;
  const a = Math.abs(diffMin), h = Math.floor(a / 60), m = a % 60;
  let s = '';
  if (h) s += h + 'h';
  if (m) s += (h ? ' ' : '') + m + 'm';
  return s + (ahead ? ' ahead of you' : ' behind you');
}

/* The offset a zone is running right now, in minutes east of UTC.
   Derived rather than hard-coded, so summer time looks after itself
   and a government that abolishes it does not break this file. */
function lkZoneOffsetMinutes(tz){
  try {
    const now = new Date();
    const there = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    const utc   = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    return Math.round((there - utc) / 60000);
  } catch (e){ return null; }
}

function lkZoneLabel(tz){
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, timeZoneName: 'short'
    }).formatToParts(new Date());
    const n = parts.find(p => p.type === 'timeZoneName');
    return n ? n.value : '';
  } catch (e){ return ''; }
}

function lkUtcWords(mins){
  if (mins == null) return '';
  if (mins === 0) return 'UTC';
  const sign = mins > 0 ? '+' : '−';
  const a = Math.abs(mins), h = Math.floor(a / 60), m = a % 60;
  return 'UTC' + sign + h + (m ? ':' + String(m).padStart(2, '0') : '');
}

function lkLocalTime(tz){
  try {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false
    });
    const dfmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, weekday: 'long', day: 'numeric', month: 'long'
    });
    const there = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    const here  = new Date(now.toLocaleString('en-US'));
    const off   = lkZoneOffsetMinutes(tz);
    const abbr  = lkZoneLabel(tz);
    const utc   = lkUtcWords(off);
    return {
      time: fmt.format(now),
      date: dfmt.format(now),
      zone: abbr && abbr !== utc ? abbr + ' · ' + utc : utc,
      offsetMin: off,
      diffMin: Math.round((there - here) / 60000)
    };
  } catch (e){ return null; }
}

/* Open-Meteo returns local wall-clock stamps when asked for a
   timezone, which have no offset on the end. Reading one as if it
   were UTC and then converting is the classic way to print a
   sunrise an hour out. */
function lkIsLocalStamp(iso){
  return typeof iso === 'string' && iso.length >= 16 && iso.indexOf('T') === 10;
}

function lkClock(iso, tz){
  if (!iso) return '';
  if (lkIsLocalStamp(iso)) return iso.slice(11, 16);
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false
    }).format(new Date(iso));
  } catch (e){ return ''; }
}

function lkDayName(iso, tz){
  if (!iso) return '';
  try {
    const local = lkIsLocalStamp(iso);
    const d = local ? new Date(iso.slice(0, 10) + 'T12:00:00Z') : new Date(iso);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: local ? 'UTC' : tz, weekday: 'short'
    }).format(d);
  } catch (e){ return ''; }
}

function lkAgo(iso){
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (isNaN(then)) return '';
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + ' min ago';
  const h = Math.round(mins / 60);
  if (h < 36) return h + 'h ago';
  return Math.round(h / 24) + ' days ago';
}

/* The hour where the place is, not where the reader is. Deciding
   "tonight" versus "this morning" off the reader's clock is a bug
   this atlas has shipped before. */
function lkLocalHour(tz){
  try {
    return Number(new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, hour: '2-digit', hour12: false
    }).format(new Date()));
  } catch (e){ return new Date().getHours(); }
}

function lkLocalDateStr(tz){
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());
  } catch (e){ return new Date().toISOString().slice(0, 10); }
}

/* Solar noon against the clock. A country can sit a long way from
   the meridian its time zone is named for: Spain runs on central
   European time from the longitude of Britain, which is why dinner
   is at ten. */
function lkClockVsSun(lon, tz){
  const off = lkZoneOffsetMinutes(tz);
  if (off == null) return null;
  const meridian = off / 4;                 /* degrees east */
  const mins = Math.round((lon - meridian) * 4);
  if (Math.abs(mins) < 12) return null;
  return {
    mins: Math.abs(mins),
    early: mins > 0,
    note: mins > 0
      ? 'Solar noon here is about ' + Math.abs(mins) + ' minutes before the clock says midday, so the light goes earlier than the hour suggests.'
      : 'Solar noon here is about ' + Math.abs(mins) + ' minutes after the clock says midday. Sunset runs late, and so does everything else.'
  };
}

/* ---------- words for numbers ---------- */
const LK_WX = {
  0:'Clear', 1:'Mostly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Fog', 48:'Freezing fog',
  51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
  56:'Freezing drizzle', 57:'Freezing drizzle',
  61:'Light rain', 63:'Rain', 65:'Heavy rain',
  66:'Freezing rain', 67:'Freezing rain',
  71:'Light snow', 73:'Snow', 75:'Heavy snow', 77:'Snow grains',
  80:'Showers', 81:'Showers', 82:'Violent showers',
  85:'Snow showers', 86:'Heavy snow showers',
  95:'Thunderstorm', 96:'Thunderstorm with hail', 99:'Severe thunderstorm'
};
function lkWeatherWord(code){ return LK_WX[code] || 'Unsettled'; }

function lkCompass(deg){
  if (deg == null) return '';
  const pts = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
               'S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return pts[Math.round(((deg % 360) / 22.5)) % 16];
}

function lkBeaufort(kmh){
  if (kmh == null) return null;
  const t = [[1,'Calm'],[5,'Light air'],[11,'Light breeze'],[19,'Gentle breeze'],
             [28,'Moderate breeze'],[38,'Fresh breeze'],[49,'Strong breeze'],
             [61,'Near gale'],[74,'Gale'],[88,'Strong gale'],[102,'Storm'],
             [117,'Violent storm']];
  for (let i = 0; i < t.length; i++) if (kmh < t[i][0]) return { force: i, word: t[i][1] };
  return { force: 12, word: 'Hurricane force' };
}

/* Iceland reports wind in metres per second and so does everybody
   who lives there, so the country module can ask for both. */
function lkMetresPerSecond(kmh){
  return kmh == null ? null : Math.round(kmh / 3.6);
}

function lkSeaState(m){
  if (m == null) return '';
  if (m < 0.1) return 'Glassy';
  if (m < 0.5) return 'Calm, small ripples';
  if (m < 1.25) return 'Slight';
  if (m < 2.5) return 'Moderate';
  if (m < 4) return 'Rough';
  if (m < 6) return 'Very rough';
  return 'High and dangerous';
}

function lkAirWord(aqi){
  if (aqi == null) return '';
  if (aqi <= 50)  return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Poor for sensitive groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very unhealthy';
  return 'Hazardous';
}

function lkAirAdvice(aqi){
  if (aqi == null) return '';
  if (aqi <= 50)  return 'Nothing to think about.';
  if (aqi <= 100) return 'Fine for almost everyone; the very sensitive may notice it.';
  if (aqi <= 150) return 'Asthmatics and anyone with a chest condition should take it easy outdoors.';
  if (aqi <= 200) return 'Cut back on anything strenuous outdoors.';
  if (aqi <= 300) return 'Stay in where you reasonably can, and wear a proper mask if you cannot.';
  return 'Avoid being outside. This is a health emergency level.';
}

function lkUvWord(uv){
  if (uv == null) return '';
  if (uv < 3)  return 'Low';
  if (uv < 6)  return 'Moderate';
  if (uv < 8)  return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
}

function lkHeatAdvice(feels){
  if (feels == null) return '';
  if (feels >= 45) return 'Dangerous. Do nothing outdoors between late morning and evening.';
  if (feels >= 40) return 'Severe. Plan everything for before ten in the morning or after six.';
  if (feels >= 35) return 'Hard going in the open. Carry more water than you think you need.';
  if (feels >= 30) return 'Warm enough to shift sightseeing to the morning.';
  if (feels <= -10) return 'Serious cold. Cover every bit of skin and watch for wind chill.';
  if (feels <= 0)  return 'Below freezing with the wind in it. Dress for considerably worse than the number.';
  if (feels <= 5)  return 'Cold. A windproof layer matters more than a thick one.';
  return '';
}

/* ---------- fetching ---------- */
const LK_TTL = { wx: 20 * 60e3, sea: 30 * 60e3, air: 30 * 60e3,
                 quake: 20 * 60e3, hol: 24 * 3600e3, space: 10 * 60e3 };
const LK_CACHE = {};

async function lkGet(key, ttl, url){
  const hit = LK_CACHE[key];
  if (hit && Date.now() - hit.t < ttl) return hit.v;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    const v = await r.json();
    LK_CACHE[key] = { t: Date.now(), v: v };
    return v;
  } catch (e){ return null; }
}

/* opts: { tz, model, days, daily, hourly, current } — the country
   module adds whatever extra fields it actually prints, so a page
   that never shows snow does not ask for snowfall. */
async function lkWeather(p, opts){
  const o = opts || {};
  const tz = o.tz || 'UTC';
  const cur = o.current || 'temperature_2m,apparent_temperature,relative_humidity_2m,'
    + 'weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,'
    + 'surface_pressure,precipitation';
  const daily = o.daily || 'weather_code,temperature_2m_max,temperature_2m_min,'
    + 'precipitation_probability_max,uv_index_max';
  const hourly = o.hourly || 'temperature_2m,precipitation_probability,weather_code';
  const u = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + p.lat + '&longitude=' + p.lon
    + (o.model ? '&models=' + o.model : '')
    + '&current=' + cur
    + '&hourly=' + hourly
    + '&daily=' + daily
    + '&timezone=' + encodeURIComponent(tz)
    + '&forecast_days=' + (o.days || 6);
  return lkGet('wx:' + (o.model || 'auto') + ':' + p.id, LK_TTL.wx, u);
}

async function lkSea(p, tz, extra){
  const u = 'https://marine-api.open-meteo.com/v1/marine'
    + '?latitude=' + p.lat + '&longitude=' + p.lon
    + '&current=wave_height,wave_period,wave_direction,sea_surface_temperature'
    + (extra ? ',' + extra : '')
    + '&timezone=' + encodeURIComponent(tz || 'UTC');
  return lkGet('sea:' + p.id, LK_TTL.sea, u);
}

async function lkAir(p, tz, extra){
  const u = 'https://air-quality-api.open-meteo.com/v1/air-quality'
    + '?latitude=' + p.lat + '&longitude=' + p.lon
    + '&current=us_aqi,pm2_5,pm10' + (extra ? ',' + extra : '')
    + '&timezone=' + encodeURIComponent(tz || 'UTC');
  return lkGet('air:' + p.id, LK_TTL.air, u);
}

/* opts: { radiusKm, minMag, days, limit } */
async function lkQuakes(p, opts){
  const o = opts || {};
  const days = o.days || 14;
  const since = new Date(Date.now() - days * 86400e3).toISOString().slice(0, 10);
  const u = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
    + '&starttime=' + since
    + '&latitude=' + p.lat + '&longitude=' + p.lon
    + '&maxradiuskm=' + (o.radiusKm || 200)
    + '&minmagnitude=' + (o.minMag != null ? o.minMag : 3.5)
    + '&orderby=time&limit=' + (o.limit || 20);
  return lkGet('eq:' + p.id + ':' + (o.minMag || 0), LK_TTL.quake, u);
}

async function lkHolidays(cc){
  const y = new Date().getUTCFullYear();
  return lkGet('hol:' + cc + ':' + y, LK_TTL.hol,
    'https://date.nager.at/api/v3/PublicHolidays/' + y + '/' + cc);
}

function lkHolidayNow(list, tz){
  if (!Array.isArray(list)) return null;
  const today = lkLocalDateStr(tz || 'UTC');
  const soon = new Date(Date.now() + 7 * 86400e3).toISOString().slice(0, 10);
  const hit = list.find(h => h.date === today);
  if (hit) return { when: 'today', name: hit.localName || hit.name };
  const next = list.find(h => h.date > today && h.date <= soon);
  if (next) return { when: next.date, name: next.localName || next.name };
  return null;
}

/* NOAA Space Weather Prediction Center publishes a one-minute
   estimated planetary K index as plain JSON with no key and an
   open CORS header. It is the single most useful number for
   deciding whether to stand outside in Iceland in February. */
async function lkPlanetaryK(){
  const v = await lkGet('kp', LK_TTL.space,
    'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
  if (!Array.isArray(v) || !v.length) return null;
  const last = v[v.length - 1];
  const kp = Number(last.kp_index != null ? last.kp_index : last.estimated_kp);
  if (isNaN(kp)) return null;
  return { kp: Math.round(kp * 10) / 10, at: last.time_tag || null };
}

/* ---------- sun and moon ---------- */
function lkSunEvent(p){
  if (typeof sunTimes !== 'function') return null;
  try { return sunTimes(new Date(), p.lat, p.lon); } catch (e){ return null; }
}

function lkMoon(){
  if (typeof moonPhase !== 'function') return null;
  try { return moonPhase(new Date()); } catch (e){ return null; }
}

function lkSky(wx){
  if (!wx || !wx.current) return null;
  const code = wx.current.weather_code;
  const clear = (code === 0 || code === 1);
  const moon = lkMoon();
  const lit = moon ? Math.round(moon.illumination * 100) : null;
  let score = clear ? 7 : (code === 2 ? 4 : 1);
  if (lit != null && lit > 70) score = Math.max(1, score - 3);
  return { score: score, clear: clear, moonLit: lit,
           note: clear
             ? (lit != null && lit > 70
                ? 'Clear, but a bright moon will wash out all but the brightest stars.'
                : 'Clear and dark. Worth getting away from the town lights.')
             : 'Too much cloud for stars tonight.' };
}

/* Open-Meteo returns sunrise, sunset and daylight_duration in the
   daily block, computed properly and for the right timezone. At
   Iceland's latitude the sun crosses the horizon at such a shallow
   angle that a small error in the solar altitude becomes twenty
   minutes of clock time, so where the forecast carries these we
   use them and fall back to sun.js only when it does not. */
function lkDaylightFrom(wx){
  if (!wx || !wx.daily) return null;
  const d = wx.daily;
  const rise = d.sunrise && d.sunrise[0], set = d.sunset && d.sunset[0];
  const secs = d.daylight_duration && d.daylight_duration[0];
  if (!rise && !set && secs == null) return null;
  const mins = secs != null ? Math.round(secs / 60)
    : (rise && set ? Math.round((new Date(set + 'Z') - new Date(rise + 'Z')) / 60000) : null);
  if (mins == null) return null;
  return { hours: Math.round(mins / 6) / 10, minutes: mins,
           midnightSun: mins > 22 * 60, polarNight: mins < 2 * 60,
           sunrise: rise || null, sunset: set || null, source: 'forecast' };
}

/* Day length and the two polar cases, which matter enormously at
   Iceland's latitude and not at all at Egypt's. Returns null when
   sun.js has not loaded. */
function lkDaylight(p){
  const s = lkSunEvent(p);
  if (!s) return null;
  const rise = s.sunrise ? new Date(s.sunrise).getTime() : null;
  const set  = s.sunset  ? new Date(s.sunset).getTime()  : null;
  if (rise == null || set == null || isNaN(rise) || isNaN(set)){
    /* No rise or no set at all: midnight sun or polar night. */
    const summer = new Date().getUTCMonth() >= 3 && new Date().getUTCMonth() <= 7;
    return { hours: summer ? 24 : 0, midnightSun: summer, polarNight: !summer,
             sunrise: null, sunset: null };
  }
  const mins = Math.round((set - rise) / 60000);
  return { hours: Math.round(mins / 6) / 10, minutes: mins,
           midnightSun: mins > 22 * 60, polarNight: mins < 2 * 60,
           sunrise: s.sunrise, sunset: s.sunset };
}

function lkDayLengthWords(d){
  if (!d) return '';
  if (d.midnightSun) return 'The sun barely sets. It is light enough to walk at two in the morning.';
  if (d.polarNight)  return 'Only a few hours of grey twilight around midday.';
  const h = Math.floor(d.minutes / 60), m = d.minutes % 60;
  return h + 'h ' + String(m).padStart(2, '0') + 'm of daylight';
}
