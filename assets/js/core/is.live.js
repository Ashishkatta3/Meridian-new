/* ===========================================================
   ICELAND — live conditions

   Built on core/livekit.js. Iceland needs four things the rest of
   the atlas does not:

     - the aurora. NOAA's Space Weather Prediction Center publishes
       a one-minute estimated planetary K index as open JSON, which
       is the number everybody actually watches. On its own it is
       useless: the lights also need darkness and a gap in the
       cloud. The verdict row below combines all three rather than
       printing a number and leaving the reader to guess.

     - darkness itself. There is no astronomical darkness in
       Iceland from roughly late April to late August, so for a
       third of the year the honest answer is that there is no
       aurora season at all, whatever a tour operator says.

     - wind. This is the weather that actually ruins Icelandic days
       and takes car doors off their hinges, which is excluded by
       every hire agreement in the country. Icelanders talk in
       metres per second, so the panel does too.

     - the F-roads. The interior opens somewhere around the middle
       of June and shuts again in September, and no hire car that
       is not a proper 4x4 may legally use them.

   Open-Meteo, USGS, Nager.Date and NOAA SWPC, all keyless.
   =========================================================== */

const IS_TZ = 'Atlantic/Reykjavik';
function isLiveReady(){ return typeof lkReady === 'function' && lkReady(); }

/* Iceland has never used summer time since 1968 and sits on UTC
   all year, which is why the clock and the sun disagree so much. */
function isLocalTime(){ return lkLocalTime(IS_TZ); }
function isLocalHour(){ return lkLocalHour(IS_TZ); }

function isClockVsSun(p){
  if (!p) return null;
  const d = lkClockVsSun(p.lon, IS_TZ);
  if (!d) return null;
  d.note = 'Solar noon here is about ' + d.mins + ' minutes after the clock says midday. '
    + 'Iceland has stayed on UTC with no summer time since 1968 despite sitting well west of it, '
    + 'so the whole day runs late against the sun.';
  return d;
}

/* =====================================================
   DAYLIGHT
   The single biggest variable in an Icelandic trip. Four hours in
   December, twenty-one in June, and it changes by about six
   minutes a day through the shoulder seasons.
   ===================================================== */
function isDaylight(p){ return lkDaylight(p); }

/* `wx` is optional: pass the forecast and the figures come from
   Open-Meteo, which is right to the minute at this latitude. */
function isDaylightNote(p, date, wx){
  const d = lkDaylightFrom(wx) || lkDaylight(p);
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;
  if (!d) return null;
  let note = lkDayLengthWords(d);
  if (d.midnightSun || (m === 6 || m === 7)){
    note += '. Nothing closes because of the dark and you will need a sleep mask.';
  } else if (m === 12 || m === 1){
    note += '. Plan two sights a day, not five, and expect to drive in the dark at both ends.';
  } else if (m >= 2 && m <= 4){
    note += ', gaining about six minutes a day.';
  } else if (m >= 9 && m <= 11){
    note += ', losing about six minutes a day.';
  }
  return { hours: d.hours, sunrise: d.sunrise, sunset: d.sunset, note: note };
}

/* =====================================================
   THE AURORA
   ===================================================== */

/* No astronomical darkness means no aurora, whatever the Kp is.
   The window is approximately 20 August to 20 April; outside it
   the honest answer is no. */
function isAuroraSeason(date){
  const now = date || new Date();
  const doy = lkDayOfYear(now);
  const start = 232;   /* ~20 August */
  const end   = 110;   /* ~20 April  */
  return doy >= start || doy <= end;
}

async function isLiveAurora(p){
  if (!isAuroraSeason()) {
    return { season: false,
      verdict: 'Out of season',
      note: 'There is no astronomical darkness in Iceland between late April and late August, so the aurora cannot be seen however active the sun is. Come back from September.' };
  }
  if (typeof isAuroraSite === 'function' && !isAuroraSite(p)){
    return { season: true, verdict: 'Wrong spot',
      note: 'Too much light here. Drive fifteen minutes out of town and the same sky works.' };
  }

  const [k, wx] = await Promise.all([lkPlanetaryK(), isLiveWeather(p)]);
  const kp = k ? k.kp : null;
  const code = wx && wx.current ? wx.current.weather_code : null;
  const cloudy = code != null && code > 2;
  const moon = lkMoon();
  const lit = moon ? Math.round(moon.illumination * 100) : null;

  let verdict, note;
  if (kp == null){
    verdict = 'Unknown';
    note = 'Could not reach the space weather feed. Check the Icelandic Met Office aurora page before driving anywhere.';
  } else if (cloudy){
    verdict = 'Clouded out';
    note = 'Kp is ' + kp + ', which would ' + (kp >= 3 ? 'be worth going out for' : 'be marginal') + ', but there is too much cloud here tonight. The cloud map on the Met Office site is the one to check: it is often clear forty minutes away.';
  } else if (kp >= 5){
    verdict = 'Strong';
    note = 'Kp ' + kp + ' and clear. This is a storm-level reading, which means the lights can reach well south of Iceland and will be overhead here. Get away from any streetlight and look north.';
  } else if (kp >= 3){
    verdict = 'Good';
    note = 'Kp ' + kp + ' and clear. A solid showing is likely between about ten at night and one in the morning. Give your eyes twenty minutes to adjust before deciding there is nothing there.';
  } else if (kp >= 2){
    verdict = 'Possible';
    note = 'Kp ' + kp + ' and clear. A faint green arc low on the northern horizon is the realistic expectation, and a camera will see it before you do.';
  } else {
    verdict = 'Quiet';
    note = 'Kp ' + kp + '. The sky is clear but the sun is not doing much. Worth a look north on the off chance, not worth a two-hour drive.';
  }
  if (lit != null && lit > 80 && !cloudy && kp != null && kp < 5){
    note += ' A near-full moon will wash out everything but the brightest bands.';
  }
  return { season: true, kp: kp, cloudy: cloudy, moonLit: lit,
           verdict: verdict, note: note, at: k ? k.at : null };
}

/* =====================================================
   WIND
   ===================================================== */
function isWindNote(wx){
  if (!wx || !wx.current) return null;
  const kmh = wx.current.wind_speed_10m;
  const gust = wx.current.wind_gusts_10m;
  if (kmh == null) return null;
  const ms = lkMetresPerSecond(kmh);
  const gms = lkMetresPerSecond(gust);
  const b = lkBeaufort(kmh);
  let note = b ? b.word : '';
  const peak = gms != null ? gms : ms;
  if (peak >= 25) note += '. Dangerous. Roads close at this strength and driving a high-sided vehicle is a bad idea.';
  else if (peak >= 20) note += '. Strong enough to take a car door off its hinges, which no hire insurance in Iceland covers. Hold the door with both hands.';
  else if (peak >= 15) note += '. Hard to stand still in on an exposed clifftop, and it will push a small car around.';
  else if (peak >= 10) note += '. Noticeable but fine.';
  return { ms: ms, gustMs: gms, kmh: Math.round(kmh), note: note.replace(/^\. /, '') };
}

/* =====================================================
   THE INTERIOR
   ===================================================== */
function isFRoadSeason(p, date){
  if (typeof isHighlands === 'function' && !isHighlands(p)) return null;
  const now = date || new Date();
  const m = now.getUTCMonth() + 1, d = now.getUTCDate();
  if (m >= 7 && m <= 8) return { open: true,
    note: 'Peak highland season. The tracks are open, the rivers are at their lowest in the morning and the huts need to have been booked months ago.' };
  if (m === 6) return { open: d > 20,
    note: d > 20
      ? 'The F-roads are opening now, one at a time, as the snow clears. Check road.is on the morning you travel rather than the night before.'
      : 'Most F-roads are still shut. They open through late June depending on the melt, and road.is publishes the list daily.' };
  if (m === 9) return { open: d < 15,
    note: 'The season is closing. Tracks shut from early September onwards and the first snow on the passes is normal this month.' };
  return { open: false,
    note: 'Closed. The interior is shut from roughly mid-September to mid-June and driving a closed F-road is an offence as well as a bad idea.' };
}

/* Any hire car in Iceland is a 4x4 question. Worth saying on the
   places where it actually decides whether you can get there. */
function isAccessNote(p){
  if (!p) return null;
  const f = p.flags || [];
  if (f.indexOf('f_road') !== -1)
    return 'Needs a genuine 4x4. Unbridged river crossings are not covered by any hire insurance in Iceland, and a small crossover is not enough.';
  if (f.indexOf('remote') !== -1)
    return 'A long way from the next fuel pump. Fill up when you see a station rather than when you need one.';
  return null;
}

/* =====================================================
   WEATHER, SEA, QUAKES, HOLIDAYS
   ===================================================== */
async function isLiveWeather(p){
  return lkWeather(p, {
    tz: IS_TZ,
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,'
         + 'precipitation_probability_max,uv_index_max,snowfall_sum,'
         + 'wind_gusts_10m_max,sunrise,sunset,daylight_duration',
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,'
           + 'weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,'
           + 'surface_pressure,precipitation'
  });
}

async function isLiveSea(p){ return lkSea(p, IS_TZ); }
async function isLiveAir(p){ return lkAir(p, IS_TZ); }

/* Iceland records thousands of small earthquakes a year and the
   swarms are the interesting part, so the threshold is low and the
   window short. A cluster is a signal; one event rarely is. */
async function isLiveSeismic(p){
  return lkQuakes(p, { radiusKm: 150, minMag: 2.0, days: 7, limit: 25 });
}

function isQuakeSwarm(data){
  if (!data || !Array.isArray(data.features) || data.features.length < 5) return null;
  const n = data.features.length;
  const biggest = data.features.reduce((a, f) =>
    Math.max(a, (f.properties && f.properties.mag) || 0), 0);
  return { count: n, max: Math.round(biggest * 10) / 10,
    note: n + ' tremors in the last week, the largest magnitude ' + (Math.round(biggest * 10) / 10)
      + '. A swarm like this is normal on a plate boundary and is also how every recent Reykjanes eruption announced itself. The Met Office publishes an alert level.' };
}

async function isLiveHolidays(){ return lkHolidays('IS'); }
function isHolidayNow(list){ return lkHolidayNow(list, IS_TZ); }

function isSunEvent(p){ return lkSunEvent(p); }
function isMoon(){ return lkMoon(); }
async function isLiveSky(p){
  const wx = await isLiveWeather(p);
  const sky = lkSky(wx);
  if (!sky) return null;
  if (!isAuroraSeason()){
    sky.note = 'No real darkness at this time of year, so no stars and no aurora either.';
    sky.score = 0;
  }
  return sky;
}

/* =====================================================
   SEASON
   ===================================================== */
function isSeasonNote(p, date){
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;
  if (m === 6 || m === 7) return { name: 'Midnight sun',
    note: 'Twenty hours of usable light, every road open and the puffins in. Also the busiest and most expensive eight weeks of the year.' };
  if (m === 8) return { name: 'Late summer',
    note: 'Still bright, slightly warmer water, and the first properly dark nights return at the end of the month. The best compromise of the year.' };
  if (m === 9 || m === 10) return { name: 'Autumn',
    note: 'Aurora season starts, prices drop, the highlands close and the weather becomes genuinely unpredictable. Build slack into any itinerary.' };
  if (m >= 11 || m <= 2) return { name: 'Winter',
    note: 'Four to six hours of light, ice caves open, and storms that shut the ring road for a day at a time. Check road.is and vedur.is every morning.' };
  return { name: 'Spring',
    note: 'March and April: lengthening days, aurora still possible into late April, and the interior still firmly shut.' };
}

/* Puffins are a date question rather than a weather one and every
   second visitor asks it. */
function isPuffinNote(p, date){
  if (!p || (p.flags || []).indexOf('birding') === -1) return null;
  const now = date || new Date();
  const m = now.getUTCMonth() + 1, d = now.getUTCDate();
  if (m >= 5 && m <= 7) return { in: true,
    note: 'Puffins are ashore. They come in around the middle of April and the colonies are busiest through June.' };
  if (m === 8 && d < 20) return { in: true,
    note: 'The last of the puffins. Most leave in the first half of August and the chicks follow a week or two later.' };
  if (m === 4) return { in: true,
    note: 'The puffins are arriving. Numbers build through the second half of April.' };
  return { in: false,
    note: 'No puffins. They are at sea from late August until April and do not come near land at all.' };
}
