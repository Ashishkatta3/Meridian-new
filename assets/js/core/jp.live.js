/* ===========================================================
   JAPAN — live conditions

   Same keyless sources as the rest of the atlas (Open-Meteo for
   weather, marine and air; USGS for earthquakes; Nager.Date for
   public holidays), with one change: the forecast call asks
   Open-Meteo for the JMA model rather than the default blend,
   because the Japan Meteorological Agency runs the best model for
   these islands and Open-Meteo exposes it for nothing.

   What makes this file Japanese rather than generic:

     - cherry blossom and autumn colour, which are the two reasons
       a very large number of trips here are booked at all
     - typhoon season, weighted by how exposed the place actually is
     - the snow-country belt, where a winter storm crossing a warm
       current drops some of the deepest snowfall recorded anywhere
     - sun against clock. Japan runs one time zone off 135 degrees
       east, and the country is wide enough that Tokyo's noon is
       nineteen minutes ahead of the sun while Yonaguni's is nearly
       fifty behind.

   The bloom and colour models are fitted to observed 2026 dates
   published by the Japan Weather Association and japan-guide, so
   they are a decent estimate and nothing more. Every note says so,
   because a reader who books flights off a predicted date and is a
   week out will rightly blame this page.
   =========================================================== */

/* ---------- small helpers ---------- */
function jpLiveReady(){ return typeof fetch === 'function'; }

function jpDayOfYear(d){
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start) / 86400000) + 1;
}

function jpDateFromDoy(year, doy){
  const d = new Date(Date.UTC(year, 0, 1));
  d.setUTCDate(doy);
  return d;
}

function jpMonthDay(year, doy){
  const d = jpDateFromDoy(year, doy);
  const M = ['January','February','March','April','May','June',
             'July','August','September','October','November','December'];
  return M[d.getUTCMonth()] + ' ' + d.getUTCDate();
}

/* Height above sea level, which shifts both the bloom and the
   autumn colour by weeks and is not in the place data.

   The first version of this inferred height from flags, and used
   the "deep snow" flag as a proxy. That put Sapporo, which is
   twenty metres above the sea, at four hundred, and pushed its
   predicted bloom six days late. Snowfall on the Sea of Japan side
   is a function of wind crossing a warm current, not of altitude.
   So the places where height actually matters are listed, and the
   fallback below never guesses from a weather flag again. */
const JP_ELEV = {
  'YMN-mount-fuji':3776, 'NGN-norikura':1500, 'NGN-kamikochi':1500,
  'HKD-daisetsuzan':1500, 'FKS-oze':1400, 'TCG-chuzenji':1270,
  'GNM-kusatsu':1200, 'NGN-karuizawa':940, 'NGN-hakuba':700,
  'YMN-fuji-five-lakes':850, 'NGN-jigokudani':850, 'FKS-goshikinuma':800,
  'NGN-nakasendo':600, 'NGN-suwa':759, 'YGT-zao':900, 'AKT-nyuto':700,
  'GNM-ikaho':700, 'TCG-nikko':650, 'FKS-ouchi-juku':650,
  'YMN-chureito':650, 'NGN-matsumoto':592, 'GIF-takayama':573,
  'GIF-shirakawa-go':500, 'TYM-gokayama':400, 'NGN-zenkoji':371,
  'NGN-obuse':350, 'HKD-niseko':300, 'WKY-koyasan':800,
  'WKY-koyasan-okunoin':800, 'NAR-yoshino':350, 'HKD-furano':180,
  'KYT-miyama':300, 'NGN-nakasendo-2':600, 'SHG-enryakuji':800,
  'TTR-daisen':800, 'KMM-aso':900, 'KGS-kirishima':700,
  'NGT-echigo-yuzawa':350, 'NGT-myoko':750, 'GNM-minakami':600,
  'IWT-hachimantai':1400, 'AOM-hakkoda':900, 'YGT-dewa-sanzan':400,
  'TYM-tateyama':2450, 'NGS-unzen':700, 'STM-chichibu':250
};

function jpElevationGuess(p){
  if (!p) return 0;
  if (JP_ELEV[p.id] != null) return JP_ELEV[p.id];
  if (p.kind === 'volcano' || p.kind === 'pass') return 1200;
  if (p.kind === 'mountain') return 1100;
  if (p.kind === 'valley' || p.kind === 'gorge') return 500;
  if (p.kind === 'onsen') return 400;
  if (p.kind === 'lake' || p.kind === 'forest') return 350;
  return 50;
}

/* =====================================================
   CHERRY BLOSSOM
   ===================================================== */

/* Estimated first day of usable bloom, as a day of the year.

   Fitted to 2026 observations. South of about 36 degrees the date
   barely moves with latitude, which surprises people: Tokyo often
   opens before Fukuoka, because the trees are clones that need a
   cold winter to break dormancy and the cities differ more in
   winter chilling than in spring warmth. North of 36 it marches
   steadily later, close to three days per degree. */
function jpSakuraDoy(p){
  if (!p) return null;
  const lat = p.lat, elev = jpElevationGuess(p);
  /* Above the treeline there is nothing to flower. Without this the
     model cheerfully predicted blossom on the summit of Fuji. */
  if (elev > 2000) return null;

  /* Okinawa and the far southwest grow a different species that
     flowers in the depths of winter. Handled by the caller. */
  if (lat < 28) return null;

  let doy;
  if (lat <= 36){
    /* Broadly late March into the first days of April, with the
       far south a touch later rather than earlier. */
    doy = 88 + Math.max(0, (34.5 - lat)) * 1.1;
  } else {
    doy = 91 + (lat - 36) * 2.9;
  }
  doy += (elev / 100) * 1.3;
  return Math.round(doy);
}

/* Returns a describable state rather than a confident date. */
function jpSakura(p, date){
  if (!p) return null;
  const now = date || new Date();
  const year = now.getUTCFullYear();
  const today = jpDayOfYear(now);

  /* The Okinawan cherry is Taiwan cherry, deep pink, and it opens
     in January. Worth saying, because visitors assume April. */
  if (p.lat < 28){
    if (today >= 5 && today <= 50)
      return { name: 'Cherry blossom, now',
               note: 'Okinawa flowers in midwinter, not spring. The local cherry is a deep pink Taiwan variety and late January is usually the peak.' };
    return { name: 'Cherry blossom in late January',
             note: 'Okinawa’s cherry is a different species from the mainland’s and opens around the turn of the year, roughly two months before Tokyo.' };
  }

  const open = jpSakuraDoy(p);
  if (open == null){
    if (jpElevationGuess(p) > 2000)
      return { name: 'Above the treeline',
               note: 'Nothing flowers or turns colour up here. The blossom and the autumn maples are in the valleys below.' };
    return null;
  }
  const peakFrom = open + 3, peakTo = open + 10;
  const window = jpMonthDay(year, open) + ' to ' + jpMonthDay(year, peakTo);

  if (today < open - 21)
    return { name: 'Cherry blossom around ' + jpMonthDay(year, peakFrom),
             note: 'Estimated from latitude and height, so treat it as a week either way. The official forecast lands in January and is updated weekly.' };
  if (today < open)
    return { name: 'Cherry blossom due in ' + (open - today) + ' days',
             note: 'Expected to open around ' + jpMonthDay(year, open) + ' and hold until roughly ' + jpMonthDay(year, peakTo) + '. Check the current forecast before you commit.' };
  if (today <= peakTo)
    return { name: 'Cherry blossom should be out',
             note: 'This is the estimated window, ' + window + '. Full bloom lasts about a week, and one day of hard rain can end it.' };
  if (today <= peakTo + 10)
    return { name: 'Cherry blossom just finished',
             note: 'The estimated window was ' + window + '. Later-flowering varieties and higher ground nearby may still be worth a look.' };
  return { name: 'Cherry blossom around ' + jpMonthDay(year, peakFrom),
           note: 'Estimated window ' + window + '. Add a week for anywhere higher up the valley.' };
}

/* =====================================================
   AUTUMN COLOUR
   ===================================================== */

/* Koyo runs the other way: it starts in the Hokkaido mountains in
   September and reaches Kyoto at the end of November. Roughly four
   days later per degree of latitude south, and markedly earlier
   with height. */
function jpKoyoDoy(p){
  if (!p) return null;
  if (p.lat < 29) return null;            /* no real autumn colour */
  const elev = jpElevationGuess(p);
  if (elev > 2000) return null;           /* above the treeline */
  let doy = 329 - (p.lat - 35.7) * 3.6;
  doy -= (elev / 100) * 2.6;
  return Math.round(doy);
}

function jpKoyo(p, date){
  if (!p) return null;
  const now = date || new Date();
  const year = now.getUTCFullYear();
  const today = jpDayOfYear(now);
  const peak = jpKoyoDoy(p);
  if (peak == null) return null;

  const from = peak - 7, to = peak + 7;
  const window = jpMonthDay(year, from) + ' to ' + jpMonthDay(year, to);

  if (today >= from && today <= to)
    return { name: 'Autumn colour should be near peak',
             note: 'Estimated window ' + window + '. Maples hold longest; the ginkgo goes over fast once it turns.' };
  if (today > to && today < to + 14)
    return { name: 'Autumn colour going over',
             note: 'Peak was estimated at ' + window + '. Lower ground nearby will be a week or two behind.' };
  if (today < from && today > from - 28)
    return { name: 'Autumn colour from about ' + jpMonthDay(year, from),
             note: 'Higher ground turns first. Estimated peak here is ' + window + '.' };
  return { name: 'Autumn colour around ' + jpMonthDay(year, peak),
           note: 'Estimated window ' + window + ', give or take a week depending on the summer.' };
}

/* =====================================================
   TYPHOONS
   ===================================================== */

/* Exposure, not a forecast. A storm tracking up the Pacific side
   is a different proposition on Ishigaki than it is in Kanazawa. */
function jpTyphoonExposure(p){
  if (!p) return 0;
  if (p.abbr === 'OKN') return 3;
  if (['KGS','MYZ','KCH','TKS','WKY','MIE','SZK','CHB'].indexOf(p.abbr) !== -1) return 2;
  if (p.abbr === 'HKD') return 0;
  if (typeof jpIsCoastal === 'function' && jpIsCoastal(p)) return 1;
  return 1;
}

function jpTyphoon(p, date){
  if (!p) return null;
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;
  const ex = jpTyphoonExposure(p);
  if (ex === 0) return null;

  const peak = (m === 8 || m === 9);
  const season = (m >= 6 && m <= 10);
  if (!season) return null;

  if (ex === 3)
    return { name: peak ? 'Typhoon season, peak months' : 'Typhoon season',
             note: peak
               ? 'Okinawa takes more direct hits than anywhere else in Japan and August and September are the worst of it. Flights and ferries stop for a day or two at a time, so leave slack in the plan.'
               : 'Storms are possible from June. Ferries between the islands are the first thing to be cancelled.' };
  if (ex === 2)
    return { name: peak ? 'Typhoon season, peak months' : 'Typhoon season',
             note: peak
               ? 'The Pacific side of the southwest sees the most storms. Expect the occasional day where trains stop and nothing runs on schedule.'
               : 'Early season. Most storms curve away, but the rain bands reach a long way ahead of the centre.' };
  return { name: 'Typhoon season',
           note: peak
             ? 'Less exposed than the Pacific southwest, but a storm passing offshore can still shut the trains for half a day.'
             : 'Low risk here, and rain is the usual effect rather than wind.' };
}

/* =====================================================
   SNOW COUNTRY
   ===================================================== */
function jpSnowNote(p, date){
  if (!p) return null;
  if (typeof jpIsSnowCountry !== 'function' || !jpIsSnowCountry(p)) return null;
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;

  if (m === 12 || m === 1 || m === 2 || m === 3)
    return { name: 'Deep snow season',
             note: 'This is the Sea of Japan side, where winter wind picks up moisture crossing a warm current and drops it on the first mountains it meets. Several metres on the ground is normal, and some roads simply close until spring.' };
  if (m === 4 || m === 11)
    return { name: 'Snow possible',
             note: 'Shoulder season. Higher passes may still be shut and some mountain inns do not open until the road is cleared.' };
  return null;
}

/* =====================================================
   SUN AGAINST CLOCK
   ===================================================== */

/* Japan keeps one time zone, set on the 135th meridian, which runs
   through Akashi in Hyogo. East of that the sun is ahead of the
   clock, west of it behind. At the two ends of the country the gap
   is big enough to notice in a summer evening. */
function jpClockVsSun(p){
  if (!p) return null;
  const mins = Math.round((p.lon - 135.0) * 4);
  if (Math.abs(mins) < 12) return null;
  return {
    mins: Math.abs(mins),
    early: mins > 0,
    note: mins > 0
      ? 'Solar noon here is about ' + Math.abs(mins) + ' minutes before the clock says midday, so summer mornings start very early and the light goes sooner than you expect.'
      : 'Solar noon here is about ' + Math.abs(mins) + ' minutes after the clock says midday. Sunset runs late, which is why evenings in the west feel longer.'
  };
}

function jpOffsetWords(diffMin){
  if (diffMin == null) return '';
  if (Math.abs(diffMin) < 5) return 'the same time as you';
  const ahead = diffMin > 0;
  const a = Math.abs(diffMin), h = Math.floor(a / 60), m = a % 60;
  let s = '';
  if (h) s += h + 'h';
  if (m) s += (h ? ' ' : '') + m + 'm';
  return s + (ahead ? ' ahead of you' : ' behind you');
}

/* =====================================================
   CLOCK
   ===================================================== */
function jpLocalTime(){
  try {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false
    });
    const dfmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo', weekday: 'long', day: 'numeric', month: 'long'
    });
    const there = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const here  = new Date(now.toLocaleString('en-US'));
    const diffMin = Math.round((there - here) / 60000);
    return { time: fmt.format(now), date: dfmt.format(now),
             zone: 'JST · UTC+9', diffMin: diffMin };
  } catch (e){ return null; }
}

function jpIsLocalStamp(iso){
  return typeof iso === 'string' && iso.length >= 16 && iso.indexOf('T') === 10;
}

function jpClock(iso){
  if (!iso) return '';
  if (jpIsLocalStamp(iso)) return iso.slice(11, 16);
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false
    }).format(new Date(iso));
  } catch (e){ return ''; }
}

function jpDayName(iso){
  if (!iso) return '';
  try {
    const d = jpIsLocalStamp(iso) ? new Date(iso + ':00Z') : new Date(iso);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: jpIsLocalStamp(iso) ? 'UTC' : 'Asia/Tokyo', weekday: 'short'
    }).format(d);
  } catch (e){ return ''; }
}

function jpAgo(iso){
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (isNaN(then)) return '';
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 60) return mins + ' min ago';
  const h = Math.round(mins / 60);
  if (h < 36) return h + 'h ago';
  return Math.round(h / 24) + ' days ago';
}

/* The hour in Japan right now, for deciding whether a forecast row
   should read "tonight" or "this morning". Computed from the Tokyo
   clock rather than the reader's, which is a bug this atlas has
   made before. */
function jpLocalHour(){
  try {
    return Number(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo', hour: '2-digit', hour12: false
    }).format(new Date()));
  } catch (e){ return new Date().getHours(); }
}

/* =====================================================
   WORDS FOR NUMBERS
   ===================================================== */
const JP_WX = {
  0:'Clear', 1:'Mainly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Fog', 48:'Freezing fog', 51:'Light drizzle', 53:'Drizzle',
  55:'Heavy drizzle', 56:'Freezing drizzle', 57:'Freezing drizzle',
  61:'Light rain', 63:'Rain', 65:'Heavy rain', 66:'Freezing rain',
  67:'Freezing rain', 71:'Light snow', 73:'Snow', 75:'Heavy snow',
  77:'Snow grains', 80:'Rain showers', 81:'Rain showers',
  82:'Violent showers', 85:'Snow showers', 86:'Heavy snow showers',
  95:'Thunderstorm', 96:'Thunderstorm with hail', 99:'Severe thunderstorm'
};
function jpWeatherWord(code){ return JP_WX[code] || 'Unsettled'; }

function jpCompass(deg){
  if (deg == null) return '';
  const pts = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return pts[Math.round(deg / 22.5) % 16];
}

function jpBeaufort(kmh){
  if (kmh == null) return '';
  const t = [[1,'Calm'],[5,'Light air'],[11,'Light breeze'],[19,'Gentle breeze'],
             [28,'Moderate breeze'],[38,'Fresh breeze'],[49,'Strong breeze'],
             [61,'Near gale'],[74,'Gale'],[88,'Severe gale'],[102,'Storm'],
             [117,'Violent storm']];
  for (let i = 0; i < t.length; i++) if (kmh < t[i][0]) return 'force ' + i + ' · ' + t[i][1];
  return 'force 12 · hurricane force';
}

function jpSeaState(m){
  if (m == null) return '';
  if (m < 0.1) return 'glassy';
  if (m < 0.5) return 'calm';
  if (m < 1.25) return 'slight';
  if (m < 2.5) return 'moderate';
  if (m < 4) return 'rough';
  if (m < 6) return 'very rough';
  return 'high';
}

function jpAirWord(aqi){
  if (aqi == null) return '';
  if (aqi <= 50)  return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Poor for sensitive groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very unhealthy';
  return 'Hazardous';
}

function jpAirAdvice(aqi){
  if (aqi == null) return '';
  if (aqi <= 50)  return 'clean';
  if (aqi <= 100) return 'fine for most people';
  if (aqi <= 150) return 'worth a mask if your chest is sensitive';
  if (aqi <= 200) return 'cut the long walks today';
  return 'stay indoors where you can';
}

function jpUvWord(uv){
  if (uv == null) return '';
  if (uv < 3)  return 'Low';
  if (uv < 6)  return 'Moderate';
  if (uv < 8)  return 'High';
  if (uv < 11) return 'Very high';
  return 'Extreme';
}

function jpHeatAdvice(feels){
  if (feels == null) return '';
  if (feels >= 38) return 'Dangerous. Japanese summers are humid rather than dry, so sweat does not cool you. Stay inside in the middle of the day.';
  if (feels >= 33) return 'Humid heat. Convenience stores sell cold drinks on every corner for a reason, and so do the vending machines.';
  if (feels <= -8) return 'Severe cold. Dress for standing still outdoors, not for walking.';
  if (feels <= 0)  return 'Below freezing. Pavements ice up overnight in the snow country.';
  return '';
}

/* =====================================================
   FETCHERS
   ===================================================== */
const JP_TTL = { wx: 20 * 60e3, sea: 30 * 60e3, air: 30 * 60e3, quake: 20 * 60e3, hol: 24 * 3600e3 };
const JP_CACHE = {};

async function jpGet(key, ttl, url){
  const hit = JP_CACHE[key];
  if (hit && Date.now() - hit.t < ttl) return hit.v;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    const v = await r.json();
    JP_CACHE[key] = { t: Date.now(), v: v };
    return v;
  } catch (e){ return null; }
}

/* Open-Meteo, asking for the JMA model. Local timestamps, so the
   clock helpers above can read them without a timezone conversion. */
async function jpLiveWeather(p){
  const u = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=' + p.lat + '&longitude=' + p.lon
    + '&models=jma_seamless'
    + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,'
    + 'weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,'
    + 'surface_pressure,precipitation'
    + '&hourly=temperature_2m,precipitation_probability,weather_code'
    + '&daily=weather_code,temperature_2m_max,temperature_2m_min,'
    + 'precipitation_probability_max,uv_index_max,snowfall_sum'
    + '&timezone=Asia%2FTokyo&forecast_days=6';
  return jpGet('wx:' + p.id, JP_TTL.wx, u);
}

async function jpLiveSea(p){
  const u = 'https://marine-api.open-meteo.com/v1/marine'
    + '?latitude=' + p.lat + '&longitude=' + p.lon
    + '&current=wave_height,wave_period,wave_direction,sea_surface_temperature'
    + '&timezone=Asia%2FTokyo';
  return jpGet('sea:' + p.id, JP_TTL.sea, u);
}

async function jpLiveAir(p){
  const u = 'https://air-quality-api.open-meteo.com/v1/air-quality'
    + '?latitude=' + p.lat + '&longitude=' + p.lon
    + '&current=us_aqi,pm2_5,pm10'
    + '&timezone=Asia%2FTokyo';
  return jpGet('air:' + p.id, JP_TTL.air, u);
}

/* Japan sits on four plates and records more earthquakes than
   almost anywhere. A wide radius would return a wall of noise, so
   this is tight and filtered to tremors people actually felt. */
async function jpLiveSeismic(p){
  const since = new Date(Date.now() - 14 * 86400e3).toISOString().slice(0, 10);
  const u = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
    + '&starttime=' + since
    + '&latitude=' + p.lat + '&longitude=' + p.lon
    + '&maxradiuskm=200&minmagnitude=3.5&orderby=time&limit=20';
  return jpGet('eq:' + p.id, JP_TTL.quake, u);
}

async function jpLiveHolidays(){
  const y = new Date().getUTCFullYear();
  return jpGet('hol:' + y, JP_TTL.hol,
    'https://date.nager.at/api/v3/PublicHolidays/' + y + '/JP');
}

/* Golden Week, Obon and New Year are the three periods when the
   whole country travels at once and nothing is bookable. Worth
   flagging separately from a single public holiday. */
function jpBusyPeriod(date){
  const now = date || new Date();
  const m = now.getUTCMonth() + 1, d = now.getUTCDate();
  if (m === 4 && d >= 27) return { name: 'Golden Week starting',
    note: 'Late April into the first week of May. Trains, hotels and highways are at capacity nationwide and prices roughly double. Book well ahead or avoid it.' };
  if (m === 5 && d <= 6) return { name: 'Golden Week',
    note: 'The busiest travel week of the Japanese year. Reserved seats sell out weeks in advance and popular inns are gone months before.' };
  if (m === 8 && d >= 10 && d <= 17) return { name: 'Obon',
    note: 'The week families return to their home towns. Long-distance trains fill, though cities can be unusually quiet.' };
  if ((m === 12 && d >= 28) || (m === 1 && d <= 4)) return { name: 'New Year',
    note: 'The one time of year a lot of Japan genuinely closes. Shrines are packed on the first three days and many restaurants shut entirely.' };
  return null;
}

function jpHolidayNow(list){
  if (!Array.isArray(list)) return null;
  const today = new Date().toISOString().slice(0, 10);
  const soon = new Date(Date.now() + 7 * 86400e3).toISOString().slice(0, 10);
  const hit = list.find(h => h.date === today);
  if (hit) return { when: 'today', name: hit.localName || hit.name };
  const next = list.find(h => h.date > today && h.date <= soon);
  if (next) return { when: next.date, name: next.localName || next.name };
  return null;
}

/* Sun and moon, shared with the rest of the atlas when sun.js has
   loaded and skipped quietly when it has not. */
function jpSunEvent(p){
  if (typeof sunTimes !== 'function') return null;
  try { return sunTimes(new Date(), p.lat, p.lon); } catch (e){ return null; }
}

function jpMoon(){
  if (typeof moonPhase !== 'function') return null;
  try { return moonPhase(new Date()); } catch (e){ return null; }
}

async function jpLiveSky(p){
  const wx = await jpLiveWeather(p);
  if (!wx || !wx.current) return null;
  const cloudCode = wx.current.weather_code;
  const clear = (cloudCode === 0 || cloudCode === 1);
  const moon = jpMoon();
  const lit = moon ? Math.round(moon.illumination * 100) : null;
  let score = clear ? 7 : (cloudCode === 2 ? 4 : 1);
  if (lit != null && lit > 70) score = Math.max(1, score - 3);
  return { score: score, clear: clear, moonLit: lit,
           note: clear
             ? (lit != null && lit > 70
                ? 'Clear, but a bright moon will wash out all but the brightest stars.'
                : 'Clear and dark. Worth getting away from the town lights.')
             : 'Too much cloud for stars tonight.' };
}
