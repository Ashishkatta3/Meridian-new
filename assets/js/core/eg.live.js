/* ===========================================================
   EGYPT — live conditions

   Built on core/livekit.js. What is here is the part specific to
   Egypt, and most of it comes down to two things: heat and the
   Islamic calendar.

     - Heat. Luxor and Aswan sit around forty-one degrees through
       the summer and the open sites have no shade at all. The hour
       you arrive at Karnak is a bigger decision than which ticket
       you buy, so the panel says so.

     - Ramadan. Working it out needs the Hijri calendar, which the
       browser already has: Intl supports the Umm al-Qura calendar
       that Saudi Arabia and most of the Gulf use. Egypt announces
       its own start by sighting, so this can be a day out either
       way, and the panel says that too. During the month, opening
       hours shift, almost nothing serves food in daylight and the
       hour after sunset is the best street atmosphere of the year.

     - The khamsin, a hot sand-laden wind out of the Sahara between
       March and May that can lift the temperature twenty degrees
       in a few hours and ground flights.

     - Red Sea water temperature, which decides whether you want a
       shorty or a five-millimetre suit, and matters because the
       diving is most of why people come.

   Open-Meteo, USGS and Nager.Date, all keyless.
   =========================================================== */

const EG_TZ = 'Africa/Cairo';
function egLiveReady(){ return typeof lkReady === 'function' && lkReady(); }

function egLocalTime(){ return lkLocalTime(EG_TZ); }
function egLocalHour(){ return lkLocalHour(EG_TZ); }

/* =====================================================
   THE ISLAMIC CALENDAR
   ===================================================== */

/* The browser's own Umm al-Qura implementation. Egypt declares
   Ramadan by local sighting, which usually matches and sometimes
   does not, so everything built on this is hedged by a day. */
function egHijri(date){
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      timeZone: EG_TZ, day: 'numeric', month: 'numeric', year: 'numeric'
    }).formatToParts(date || new Date());
    const g = t => {
      const f = parts.find(x => x.type === t);
      return f ? parseInt(String(f.value).replace(/[^0-9]/g, ''), 10) : null;
    };
    const y = g('year'), m = g('month'), d = g('day');
    if (!y || !m || !d) return null;
    return { year: y, month: m, day: d };
  } catch (e){ return null; }
}

const EG_HIJRI_MONTHS = ['Muharram','Safar','Rabi‘ al-Awwal','Rabi‘ al-Thani',
  'Jumada al-Awwal','Jumada al-Thani','Rajab','Sha‘ban','Ramadan',
  'Shawwal','Dhu al-Qi‘dah','Dhu al-Hijjah'];

function egIslamicNote(date){
  const h = egHijri(date);
  if (!h) return null;
  const name = EG_HIJRI_MONTHS[h.month - 1] || '';

  if (h.month === 9){
    const left = 30 - h.day;
    return { kind: 'ramadan', hijri: h, name: 'Ramadan',
      line: 'Day ' + h.day + ' of Ramadan',
      note: 'Nothing is served in daylight outside hotels and tourist restaurants, and museums and sites usually close an hour or two early. '
        + 'The hour after sunset is the best street atmosphere in the Egyptian year. '
        + (left <= 3 ? 'Eid is within a few days and the country effectively stops for it.' : 'Eid al-Fitr is about ' + left + ' days away.')
        + ' The exact dates are set by sighting, so treat this as a day either side.' };
  }
  if (h.month === 10 && h.day <= 4){
    return { kind: 'eid', hijri: h, name: 'Eid al-Fitr',
      line: 'Eid al-Fitr, day ' + h.day,
      note: 'Three or four days when government offices close, trains and buses are full and the Nile corniches are packed from mid-morning. Sites stay open and are busy with Egyptian families.' };
  }
  if (h.month === 12 && h.day >= 8 && h.day <= 14){
    return { kind: 'eid', hijri: h, name: 'Eid al-Adha',
      line: 'Eid al-Adha, day ' + (h.day - 8),
      note: 'The larger of the two Eids. Four days of public holiday, heavy domestic travel and a great deal of meat being given away.' };
  }
  if (h.month === 8 && h.day >= 20){
    return { kind: 'pre', hijri: h, name: 'Before Ramadan',
      line: name + ' ' + h.day,
      note: 'Ramadan begins in about ' + (30 - h.day) + ' days, give or take the sighting. Worth checking before booking anything that depends on opening hours.' };
  }
  return { kind: 'ordinary', hijri: h, name: name,
    line: h.day + ' ' + name + ' ' + h.year,
    note: null };
}

/* =====================================================
   HEAT, THE OPEN SITES AND THE HOUR
   ===================================================== */
function egHeatNote(p, wx){
  if (!wx || !wx.current) return null;
  const feels = wx.current.apparent_temperature;
  const temp  = wx.current.temperature_2m;
  if (feels == null && temp == null) return null;
  const f = feels != null ? feels : temp;
  const open = typeof egIsOpenSite === 'function' && egIsOpenSite(p);
  const furnace = typeof egIsFurnace === 'function' && egIsFurnace(p);
  let note = lkHeatAdvice(f);
  if (open && f >= 33){
    note += ' There is no shade on this site at all, and no water sold inside most of them.';
  }
  if (furnace && f >= 40){
    note += ' Upper Egypt in this heat is a genuine health risk rather than a discomfort.';
  }
  if (!note) return null;
  return { feels: Math.round(f), note: note.trim() };
}

/* When to be at the gate. Most sites open at six in summer and
   seven or eight in winter, and the first ninety minutes are worth
   more than the rest of the day combined. */
function egSiteHour(p, date){
  if (typeof egIsOpenSite === 'function' && !egIsOpenSite(p)) return null;
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;
  const summer = m >= 5 && m <= 9;
  const h = egLocalHour();
  const opens = summer ? 6 : 7;
  if (h < opens) return { opens: opens,
    note: 'Sites open around ' + opens + 'am at this time of year. Being first through the gate is the difference between a quiet hour and a coach park.' };
  if (h < opens + 2) return { opens: opens,
    note: 'The good window, right now. Light is low, the stone is still cold and the coaches have not arrived.' };
  if (h >= 11 && h < 15) return { opens: opens,
    note: summer
      ? 'The worst hours of the day. Nothing on an open site is worth doing between eleven and three in an Egyptian summer.'
      : 'Peak coach hours. If you have a choice, come back after three.' };
  if (h >= 15 && h < 18) return { opens: opens,
    note: 'Second window. The light turns gold on sandstone from about four and most groups have gone.' };
  return null;
}

/* =====================================================
   KHAMSIN AND DUST
   ===================================================== */
async function egLiveAir(p){ return lkAir(p, EG_TZ, 'dust'); }

function egDust(p, air, wx){
  if (!air || !air.current) return null;
  if (typeof egIsDustProne === 'function' && !egIsDustProne(p)) return null;
  const pm10 = air.current.pm10;
  const dust = air.current.dust;
  if (pm10 == null) return null;
  const wind = wx && wx.current ? wx.current.wind_speed_10m : null;
  const m = new Date().getUTCMonth() + 1;
  const season = m >= 3 && m <= 5;
  if (pm10 < 80) return null;
  const blowing = wind != null && wind > 30;
  if (pm10 > 200) return { pm10: Math.round(pm10),
    note: 'Heavy dust in the air' + (blowing ? ' with the wind behind it' : '') + '. '
      + (season ? 'This is khamsin weather: hot, sand-laden wind out of the Sahara that runs from March to May and can ground flights and shut sites. ' : '')
      + 'Visibility will be poor and a scarf over the face is the local solution.' };
  if (pm10 > 120) return { pm10: Math.round(pm10),
    note: 'Dusty' + (season ? ', which at this time of year usually means a khamsin pushing in from the desert' : '')
      + '. The sky will be beige rather than blue and the pyramids will not photograph well.' };
  return { pm10: Math.round(pm10),
    note: 'A light haze of dust, which is the normal state of the Nile valley rather than an event.' };
}

/* =====================================================
   SEA
   ===================================================== */
async function egLiveSea(p){ return lkSea(p, EG_TZ); }

function egWaterNote(p, sea){
  if (!sea || !sea.current) return null;
  const t = sea.current.sea_surface_temperature;
  if (t == null) return null;
  const red = typeof egSeaOf === 'function' && egSeaOf(p) === 'the Red Sea';
  let suit;
  if (t >= 28) suit = 'Warm enough for a rash vest and nothing else.';
  else if (t >= 25) suit = 'A shorty is plenty for a single dive, more for repetitive ones.';
  else if (t >= 22) suit = 'Three millimetres for diving. Snorkelling is fine without.';
  else if (t >= 19) suit = 'Five millimetres, and a hood if you are doing three dives a day.';
  else suit = 'Cold for these latitudes. Seven millimetres or a drysuit.';
  return { temp: Math.round(t * 10) / 10,
    note: suit + (red && t >= 27 ? ' Red Sea water peaks around thirty in August, which is bathwater.' : '') };
}

/* =====================================================
   SEASON
   ===================================================== */
function egSeasonNote(p, date){
  const now = date || new Date();
  const m = now.getUTCMonth() + 1;
  const furnace = typeof egIsFurnace === 'function' && egIsFurnace(p);
  const sea = typeof egMaybeCoastal === 'function' && egMaybeCoastal(p);
  if (m >= 6 && m <= 8){
    if (furnace) return { name: 'Low season',
      note: 'Upper Egypt in summer is forty-one degrees by lunchtime. Hotels are at their cheapest and the sites are nearly empty, which is the trade.' };
    if (sea) return { name: 'High summer',
      note: 'The Red Sea coast is busy with Egyptian and Gulf visitors, the water is at its warmest and the air is dry heat rather than Nile valley heat.' };
    return { name: 'Low season',
      note: 'Hot, cheap and quiet. Everything is open and nobody else is there.' };
  }
  if (m >= 10 || m <= 4) return { name: 'High season',
    note: 'October to April is when the weather makes sense, which is also when every Nile cruise is full and Abu Simbel has a queue at dawn.' };
  if (m === 5 || m === 9) return { name: 'Shoulder',
    note: 'Warm but not yet brutal, with fewer people than the winter months. Arguably the best compromise.' };
  return null;
}

/* The twice-yearly Abu Simbel solar alignment, which is specific
   enough to be worth a row of its own when it is close. */
function egAbuSimbelSun(p, date){
  if (!p || p.id !== 'ASW-abu-simbel') return null;
  const now = date || new Date();
  const y = now.getUTCFullYear();
  const dates = [new Date(Date.UTC(y, 1, 22)), new Date(Date.UTC(y, 9, 22))];
  for (const d of dates){
    const away = lkDaysBetween(now, d);
    if (away === 0) return { when: 'today',
      note: 'The sun reaches the sanctuary this morning and lights three of the four seated gods. Ptah, god of the underworld, stays in shadow. Expect several thousand people.' };
    if (away > 0 && away <= 30) return { when: lkMonthDayOf(d), away: away,
      note: 'The solar alignment is in ' + away + ' days, on ' + lkMonthDayOf(d) + '. The sun enters sixty metres of rock and reaches the sanctuary at dawn, and the town books out.' };
  }
  return null;
}

/* =====================================================
   WEATHER, QUAKES, HOLIDAYS
   ===================================================== */
async function egLiveWeather(p){
  return lkWeather(p, {
    tz: EG_TZ,
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,'
         + 'precipitation_probability_max,uv_index_max,'
         + 'sunrise,sunset,daylight_duration'
  });
}

/* The Gulf of Suez and the Aqaba rift are live, and Cairo felt a
   5.8 in 1992. This is a wide radius and a low threshold because
   almost nothing happens and a reader should see it when it does. */
function egIsSeismic(p){
  return !!(p && ['SSI','SUZ','RSE','CAI','GIZ','ALX','DLT'].indexOf(p.abbr) !== -1);
}
async function egLiveSeismic(p){
  return lkQuakes(p, { radiusKm: 300, minMag: 3.0, days: 30, limit: 15 });
}

async function egLiveHolidays(){ return lkHolidays('EG'); }
function egHolidayNow(list){ return lkHolidayNow(list, EG_TZ); }

function egSunEvent(p){ return lkSunEvent(p); }
function egMoon(){ return lkMoon(); }
async function egLiveSky(p){
  const wx = await egLiveWeather(p);
  const sky = lkSky(wx);
  if (!sky) return null;
  const desert = p && ['WDS','SSI','FAY','RSE'].indexOf(p.abbr) !== -1;
  if (desert && sky.clear && (sky.moonLit == null || sky.moonLit < 40)){
    sky.note = 'Clear and genuinely dark. The Western Desert and Sinai have some of the darkest skies anywhere within reach of Europe.';
  }
  return sky;
}
