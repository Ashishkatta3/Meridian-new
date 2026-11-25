/* ===========================================================
   SPAIN — live conditions

   Built on core/livekit.js, which holds everything that is not
   Spanish about a live panel. What is here is the part a reader
   planning a trip to Spain would actually want:

     - the clock against the sun. Spain kept central European time
       after 1940 even though Galicia sits west of Greenwich, so in
       A Coruña the sun is overhead about an hour and a half after
       the clock says midday. This is not trivia: it is why lunch
       is at two and dinner is at ten, and it is the single most
       useful thing to understand before booking a restaurant.

     - meal hours, computed from the local clock, because a kitchen
       that is closed is the most common way a first visit goes
       wrong.

     - the calima. Saharan dust reaches the Canaries directly and
       the southeast several times a year, and it is visible in the
       PM10 figure long before anyone writes a news story about it.

     - heat. Córdoba and Seville regularly pass forty-five degrees
       and the official advice changes at those thresholds.

     - the fiesta calendar, including the movable ones, which means
       working out Easter.

   Open-Meteo, USGS and Nager.Date, all keyless.
   =========================================================== */

const ES_TZ      = 'Europe/Madrid';
const ES_TZ_CNR  = 'Atlantic/Canary';

function esTzFor(p){ return (p && p.abbr === 'CNR') ? ES_TZ_CNR : ES_TZ; }
function esLiveReady(){ return typeof lkReady === 'function' && lkReady(); }

/* =====================================================
   THE CLOCK, AND WHY IT IS WRONG
   ===================================================== */
function esLocalTime(p){ return lkLocalTime(esTzFor(p)); }
function esLocalHour(p){ return lkLocalHour(esTzFor(p)); }

function esClockVsSun(p){
  if (!p) return null;
  const d = lkClockVsSun(p.lon, esTzFor(p));
  if (!d) return null;
  /* The mainland case is worth explaining rather than just stating,
     because the gap has a cause and a consequence. */
  if (p.abbr !== 'CNR' && !d.early){
    d.note = 'Solar noon here is about ' + d.mins + ' minutes after the clock says midday. '
      + 'Spain has run on central European time since 1940 despite sitting on Greenwich’s meridian, '
      + 'which is why lunch is at two and dinner is at ten.';
  }
  return d;
}

/* What is open, from the local hour. Spain runs on its own
   schedule and the schedule is the thing that catches people out. */
function esMealClock(p){
  const h = esLocalHour(p);
  if (h >= 6 && h < 11)  return { now: 'Breakfast',
    note: 'Coffee and a tostada. Almost nothing else is serving food yet.' };
  if (h >= 11 && h < 13) return { now: 'Between meals',
    note: 'Bars are open for a drink and a tapa. Kitchens are not cooking lunch yet.' };
  if (h >= 13 && h < 16) return { now: 'Lunch',
    note: 'The main meal of the day. Two to four is the window, and the menú del día is on until about four.' };
  if (h >= 16 && h < 20) return { now: 'Kitchens closed',
    note: 'Most restaurant kitchens shut between about four and eight. Bars stay open; proper meals do not.' };
  if (h >= 20 && h < 22) return { now: 'Tapas hour',
    note: 'Bars fill from eight. Dinner proper has not started, which is the point of tapas.' };
  if (h >= 22 || h < 1)  return { now: 'Dinner',
    note: 'Restaurants are serving. Nine thirty to eleven is normal and a table at seven marks you out.' };
  return { now: 'Late',
    note: 'Kitchens are closed. In the cities the bars will be going for a while yet.' };
}

/* =====================================================
   SEASON AND CALENDAR
   ===================================================== */

/* Fixed and movable fiestas, with the ones that genuinely change
   whether you can get a bed. Returns the nearest within a window. */
function esFiesta(p, date){
  const now = date || new Date();
  const y = now.getUTCFullYear();
  const doy = lkDayOfYear(now);
  const easter = lkEaster(y);
  const out = [];

  const add = (start, days, name, where, note) => {
    const s = lkDayOfYear(start);
    out.push({ from: s, to: s + days, name: name, where: where, note: note });
  };

  /* Movable: Semana Santa runs Palm Sunday to Easter Sunday. */
  const palm = new Date(easter.getTime() - 7 * 86400e3);
  add(palm, 7, 'Semana Santa', null,
    'Holy Week processions, heaviest in Seville, Málaga, Zamora and Valladolid. The whole country travels and beds vanish months ahead.');
  /* Feria de Abril starts roughly two weeks after Easter. */
  const feria = new Date(easter.getTime() + 14 * 86400e3);
  add(feria, 6, 'Feria de Abril', 'ADL',
    'Seville’s fair: a thousand marquees, most of them private, flamenco dress and sherry from noon. The city is full.');
  const carnival = new Date(easter.getTime() - 47 * 86400e3);
  add(carnival, 5, 'Carnaval', null,
    'Biggest in Santa Cruz de Tenerife and Cádiz, where the satirical chirigota groups are the point rather than the costumes.');

  /* Fixed. */
  add(new Date(Date.UTC(y, 0, 5)), 2, 'Reyes', null,
    'The Three Kings parade on the evening of the fifth and presents on the sixth. The sixth is a public holiday and almost everything shuts.');
  add(new Date(Date.UTC(y, 2, 15)), 5, 'Las Fallas', 'VLC',
    'Valencia builds hundreds of satirical sculptures and burns all but one on the night of the nineteenth. Deafening and worth it.');
  add(new Date(Date.UTC(y, 3, 23)), 1, 'Sant Jordi', 'CAT',
    'Catalonia’s day of books and roses, with stalls the length of every main street.');
  add(new Date(Date.UTC(y, 5, 23)), 2, 'San Juan', null,
    'Bonfires on the beaches on the shortest night, heaviest in Alicante, Barcelona and A Coruña.');
  add(new Date(Date.UTC(y, 6, 6)), 9, 'San Fermín', 'NAV',
    'Pamplona, 6 to 14 July. The encierro runs at eight each morning and the town does not sleep for nine days.');
  add(new Date(Date.UTC(y, 7, 15)), 1, 'La Asunción', null,
    'A national holiday in the middle of the one month when Spain itself is on holiday.');
  add(new Date(Date.UTC(y, 7, 24)), 4, 'La Tomatina', 'VLC',
    'Buñol, the last Wednesday in August. Ticketed and capped at twenty thousand since 2013.');
  add(new Date(Date.UTC(y, 8, 24)), 4, 'La Mercè', 'CAT',
    'Barcelona’s city festival: human towers, fire runs and free concerts across four days.');
  add(new Date(Date.UTC(y, 9, 12)), 1, 'El Pilar', 'ARA',
    'Zaragoza’s flower offering to the Virgin, and a national holiday.');
  add(new Date(Date.UTC(y, 11, 24)), 3, 'Navidad', null,
    'Christmas Eve dinner is the main event. The 25th and 26th are quiet and most things close.');

  let best = null;
  for (const f of out){
    if (f.where && p && f.where !== p.abbr) continue;
    if (doy >= f.from && doy <= f.to){ best = { ...f, when: 'now' }; break; }
    const away = f.from - doy;
    if (away > 0 && away <= 21 && (!best || away < best.away))
      best = { ...f, when: 'soon', away: away,
               date: lkMonthDay(y, f.from) };
  }
  return best;
}

/* The three-month summer when inland Spain becomes genuinely
   difficult, and the shoulder seasons that are the right answer. */
function esSeasonNote(p, date){
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;
  const inland = typeof esIsMeseta === 'function' && esIsMeseta(p);
  const south  = p && (p.abbr === 'ADL' || p.abbr === 'EXT' || p.abbr === 'MUR');
  if ((inland || south) && m >= 7 && m <= 8)
    return { name: 'Peak summer',
      note: 'Inland and southern Spain in July and August runs past forty degrees most afternoons. Everything worth doing happens before eleven or after seven, and a good number of restaurants simply close for the month.' };
  if (m === 8 && !inland && !south)
    return { name: 'August',
      note: 'Spaniards take their own holidays now, which empties the cities and fills every coast. Prices on the costas roughly double.' };
  if (m >= 4 && m <= 6)
    return { name: 'The best window',
      note: 'April to June is when the south is comfortable, the north is dry enough and the interior is green rather than brown.' };
  if (m >= 9 && m <= 10)
    return { name: 'Second window',
      note: 'September and October: the sea is still warm, the grape harvest is on and the crowds have gone home.' };
  if (p && p.abbr === 'CNR')
    return { name: 'Canary winter',
      note: 'Twenty degrees and sunny in January is the entire reason northern Europe comes here.' };
  if (m === 12 || m <= 2)
    return { name: 'Winter',
      note: 'The interior is cold and clear, Andalusia is mild and wet-ish, and the Atlantic north is properly wet.' };
  return null;
}

/* =====================================================
   WEATHER, DUST, SNOW AND SEA
   ===================================================== */
async function esLiveWeather(p){
  return lkWeather(p, {
    tz: esTzFor(p),
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,'
         + 'precipitation_probability_max,uv_index_max,snowfall_sum,'
         + 'sunrise,sunset,daylight_duration',
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,'
           + 'weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,'
           + 'surface_pressure,precipitation'
  });
}

async function esLiveSea(p){ return lkSea(p, esTzFor(p)); }

/* PM10 rather than the composite index is what shows a calima:
   Saharan dust is coarse, so PM10 climbs while PM2.5 barely moves. */
async function esLiveAir(p){ return lkAir(p, esTzFor(p), 'dust'); }

function esCalima(air, p){
  if (!air || !air.current) return null;
  if (typeof esIsCalimaProne === 'function' && !esIsCalimaProne(p)) return null;
  const pm10 = air.current.pm10, pm25 = air.current.pm2_5;
  const dust = air.current.dust;
  if (pm10 == null) return null;
  const coarse = (pm25 != null && pm25 > 0) ? pm10 / pm25 : null;
  const dusty = pm10 > 50 && (dust == null || dust > 20) && (coarse == null || coarse > 2.2);
  if (!dusty) return null;
  if (pm10 > 150) return { level: 'heavy', pm10: Math.round(pm10),
    note: 'Heavy calima. Saharan dust is thick enough to turn the sky orange and cut visibility. Flights into the Canaries get diverted at this level.' };
  if (pm10 > 80) return { level: 'moderate', pm10: Math.round(pm10),
    note: 'Calima in the air. The sky will look milky, distances will be hazy and anyone with a chest condition will feel it.' };
  return { level: 'light', pm10: Math.round(pm10),
    note: 'A light calima. Enough Saharan dust to soften the light and leave a film on cars.' };
}

/* Snow, which exists in Spain in more places than people expect:
   the Pyrenees, the Picos, Sierra Nevada and the Guadarrama. */
function esSnowNote(p, wx){
  if (!wx || !wx.daily || !wx.daily.snowfall_sum) return null;
  if (typeof esIsHighAltitude === 'function' && !esIsHighAltitude(p)) return null;
  const sum = wx.daily.snowfall_sum.slice(0, 5)
    .reduce((a, b) => a + (b || 0), 0);
  if (sum < 1) return null;
  return { cm: Math.round(sum),
    note: sum > 25
      ? 'Heavy snow forecast over the next five days. Mountain passes close at short notice and chains are often a legal requirement.'
      : 'Snow forecast in the next few days. Check the road before committing to a mountain route.' };
}

/* =====================================================
   SEISMIC
   Spain is quiet by Mediterranean standards. Granada and the
   Alborán Sea produce most of what there is, and it is small.
   ===================================================== */
function esIsSeismic(p){
  return !!(p && ['ADL','MUR','VLC','CNR','ARA','NAV'].indexOf(p.abbr) !== -1);
}
async function esLiveSeismic(p){
  return lkQuakes(p, { radiusKm: 250, minMag: 2.5, days: 30, limit: 15 });
}

async function esLiveHolidays(){ return lkHolidays('ES'); }
function esHolidayNow(list, p){ return lkHolidayNow(list, esTzFor(p)); }

/* Sky, sun and moon come straight from the kit. */
function esSunEvent(p){ return lkSunEvent(p); }
function esMoon(){ return lkMoon(); }
async function esLiveSky(p){
  const wx = await esLiveWeather(p);
  return lkSky(wx);
}
