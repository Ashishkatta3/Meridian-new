/* ===========================================================
   EGYPT — the pages

     #/egypt                 the country, its regions, and the
                             obvious places to start
     #/egypt/region/<CODE>   everything the atlas has in one region
     #/egypt/place/<id>      one place, what to do there, and what is
                             true about it right now

   Same shared place-page layout as the rest of the atlas: a jump
   bar under the photo, the guide in the main column, and the live
   panel in a sticky column on the right that collapses under the
   photo on a phone.

   The live panel leads with two things no other country here
   needs. The first is the Islamic calendar, because Ramadan
   changes opening hours, what is served in daylight and the whole
   atmosphere of an evening. The second is the hour: these are open
   sites with no shade, and at Karnak in July the difference
   between arriving at six and arriving at eleven is the difference
   between a good morning and heatstroke.
   =========================================================== */

function egEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function egRegionFace(code){
  const ids = egRegionPlaces(code);
  return ids[0] || null;
}

/* Six groupings. Every community code appears exactly once and the
   test suite checks it. These are how people actually describe
   where they are going, not an official division. */
const EG_GROUPS = [
  ['Cairo and the pyramids', ['CAI','GIZ']],
  ['Up the Nile',            ['MDE','LXR','ASW']],
  ['The Mediterranean',      ['ALX','MTR','DLT','SUZ']],
  ['The Red Sea and Sinai',  ['RSE','SSI']],
  ['The deserts',            ['WDS','FAY']]
];

const EG_REGION_IDS = Object.keys(EG_REGIONS);

/* ===========================================================
   #/egypt
   =========================================================== */
function renderEgypt(){
  const total = EG_PLACE_IDS.length;
  const regions = EG_REGION_IDS.length;
  const top = EG_PLACE_IDS.slice(0, 16);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>Egypt</h1>'
    + '<p class="pg-sub">Thirteen regions and ' + total + ' places, from the oldest large '
    + 'stone building on earth to a reef wall that drops eight hundred metres, by way of '
    + 'five Saharan oases and a monastery that has never once closed since the sixth '
    + 'century. With live weather, sea, air and sky for every one of them, plus the two '
    + 'things that actually shape an Egyptian day: the heat and the Islamic calendar.</p>'
    + '<p class="pg-note">' + total + ' places &middot; ' + regions + ' regions '
    + '&middot; all times Africa/Cairo</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => egCard(id, true)).join('')
    + '</div></div>';

  EG_GROUPS.forEach(g => {
    h += '<div class="pg-sec"><h2>' + egEsc(g[0]) + '</h2><div class="tr-grid">'
      + g[1].map(code => {
          const r = EG_REGIONS[code];
          if (!r) return '';
          const face = egRegionFace(code);
          const n = egRegionPlaces(code).length;
          return '<a class="tr-card" href="#/egypt/region/' + code + '">'
            + '<span class="tr-card-ph" data-egphoto="' + (face || '') + '"></span>'
            + '<span class="tr-card-tx">'
            + '<i>' + egEsc(r[1]) + '</i>'
            + '<b>' + egEsc(r[0]) + '</b>'
            + '<em title="Places in the atlas">' + n + '</em></span></a>';
        }).join('')
      + '</div></div>';
  });

  return h + '</section>';
}

function mountEgypt(host){
  if (typeof guideWarm === 'function') guideWarm('EG');
  host.innerHTML = renderEgypt();
  window.scrollTo(0, 0);
  egPaintPhotos(host);
}

/* ===========================================================
   #/egypt/region/<CODE>
   =========================================================== */
function renderEgRegion(code){
  const r = EG_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/egypt">&larr; Egypt</a>'
    + '<p>No such community.</p></section>';

  const ids = egRegionPlaces(code);
  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/egypt">&larr; Egypt</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">Community &middot; ' + egEsc(r[1]) + '</span>'
    + '<h1>' + egEsc(r[0]) + '</h1>'
    + '<p class="pg-sub">' + egEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + (ids.length === 1 ? ' place' : ' places')
    + ' in the atlas</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><div class="tr-grid">'
    + ids.map(id => egCard(id, false)).join('')
    + '</div></div>';

  return h + '</section>';
}

function mountEgRegion(host, code){
  if (typeof guideWarm === 'function') guideWarm('EG');
  host.innerHTML = renderEgRegion(code);
  window.scrollTo(0, 0);
  egPaintPhotos(host);
}

/* ===========================================================
   #/egypt/place/<id>
   =========================================================== */
function renderEgPlace(id){
  const p = egPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/egypt">&larr; Egypt</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof egGuide === 'function') ? egGuide(id) : null;
  const region = EG_REGIONS[p.abbr];
  const near = egNearby(id, 6);

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/egypt/region/' + p.abbr + '">&larr; ' + egEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + egEsc(egKindLabel(p.kind)) + ' &middot; ' + egEsc(region[0]) + '</span>'
    + '<h1>' + egEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + egEsc(p.blurb) + '</p>'
    + '</div></div>';

  h += '<div class="it-hero" data-egphoto-big="' + id + '"></div>';

  h += pvChips(p, egTagLabel);

  const sections = [{ id: 'eg-now', label: 'Right now' }];
  if (g && g.intro && g.intro.length) sections.push({ id: 'eg-place', label: 'The place' });
  if (g && g.see && g.see.length)     sections.push({ id: 'eg-do',    label: 'What to do' });
  const practical = g ? [['when','When to go'],['stay','How long'],
                         ['move','Getting there'],['eat','What to eat']]
                        .filter(r => g[r[0]]) : [];
  if (practical.length) sections.push({ id: 'eg-prac', label: 'Practical' });
  if (near.length)      sections.push({ id: 'eg-near', label: 'Nearby' });
  h += pvJumpNav(sections);

  h += pvColumnsOpen();
  h += '<div id="eg-now" class="pv-anchor">' + pvAside('egLive') + '</div>';
  h += pvMainOpen();

  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec pv-anchor" id="eg-place"><h2>The place</h2>'
        + '<div class="it-prose">'
        + g.intro.map(x => '<p>' + egEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec pv-anchor" id="eg-do"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + egEsc(s.n) + '</b>'
            + (s.t ? '<i>' + egEsc(s.t) + '</i>' : '')
            + '<p>' + egEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    if (practical.length){
      h += '<div class="pg-sec pv-anchor" id="eg-prac"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + egEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  if (near.length){
    h += '<div class="pg-sec pv-anchor" id="eg-near"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => egCard(n.id, true)).join('')
      + '</div></div>';
  }

  h += pvMainClose();
  h += pvColumnsClose();
  return h + '</section>';
}

/* Straight-line neighbours, nearest first.

   Capped at three hundred kilometres. Egypt is a thin strip of
   habitation a thousand kilometres long, and without a cap the
   nearest thing to Abu Simbel comes out as Luxor, which is an
   overnight train away. */
function egNearby(id, limit){
  const me = egPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  return EG_PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = egPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).filter(x => x.km <= 300)
    .sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

function egTagLabel(t){
  if (typeof EG_FLAG !== 'undefined' && EG_FLAG[t]) return EG_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

function egCard(id, showRegion){
  const p = egPlaceGet(id);
  return '<a class="tr-card" href="#/egypt/place/' + id + '">'
    + '<span class="tr-card-ph" data-egphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + egEsc(showRegion ? EG_REGIONS[p.abbr][0] : egKindLabel(p.kind)) + '</i>'
    + '<b>' + egEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

async function mountEgPlace(host, id){
  if (typeof guideReady === 'function') await guideReady('EG');
  host.innerHTML = renderEgPlace(id);
  window.scrollTo(0, 0);
  egPaintPhotos(host);
  if (typeof pvWire === 'function') pvWire(host);
  if (typeof pvWatchSections === 'function') pvWatchSections(host);
  const p = egPlaceGet(id);
  if (p) wireEgLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS
   =========================================================== */
function egPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-egphoto]').forEach(el => {
    const pid = el.dataset.egphoto;
    if (!pid){ el.classList.add('is-empty'); return; }
    const p = egPlaceGet(pid);
    if (!p){ el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    }).catch(() => el.classList.add('is-empty'));
  });

  host.querySelectorAll('[data-egphoto-big]').forEach(el => {
    const p = egPlaceGet(el.dataset.egphotoBig);
    if (!p){ el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.src, 1200,
        img => {
          el.style.backgroundImage = 'url("' + img.src + '")';
          el.classList.add('is-on');
          if (ph.credit){
            const c = document.createElement('span');
            c.className = 'it-hero-cr';
            c.textContent = ph.credit;
            el.appendChild(c);
          }
        },
        () => el.classList.add('is-empty'));
    }).catch(() => el.classList.add('is-empty'));
  });
}

/* ===========================================================
   THE LIVE PANEL
   ===========================================================*/
function egRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireEgLive(host, p){
  const panel = host.querySelector('#egLive');
  if (!panel) return;

  const rows = [];
  const sources = [];
  const tz = (typeof EG_TZ !== 'undefined') ? EG_TZ : 'Africa/Cairo';
  const draw = () => {
    if (!document.body.contains(panel)) return;
    panel.innerHTML = (typeof pvLiveBody === 'function')
      ? pvLiveBody(rows, sources)
      : '<h3>Right now</h3>' + rows.join('');
    if (typeof pvRestoreMore === 'function') pvRestoreMore(panel);
  };

  /* --- the clock --- */
  const clock = (typeof egLocalTime === 'function') ? egLocalTime() : null;
  if (clock){
    const off = (typeof lkOffsetWords === 'function') ? lkOffsetWords(clock.diffMin) : '';
    rows.push(egRow('Local time',
      egEsc(clock.time) + ' <small>' + egEsc(clock.zone) + '</small>',
      egEsc(clock.date + (off ? ' · ' + off : ''))));
    draw();
  }

  /* --- Ramadan and the Eids, which change everything --- */
  if (typeof egIslamicNote === 'function'){
    const isl = egIslamicNote();
    if (isl && isl.note){
      rows.push(egRow(isl.kind === 'ramadan' ? 'Ramadan' : 'Islamic calendar',
        egEsc(isl.line), egEsc(isl.note)));
    } else if (isl){
      rows.push(egRow('Islamic calendar', egEsc(isl.line), ''));
    }
  }

  /* --- the hour, on an open site --- */
  if (typeof egSiteHour === 'function'){
    const sh = egSiteHour(p);
    if (sh) rows.push(egRow('Best hour', 'opens ' + sh.opens + 'am', egEsc(sh.note)));
  }

  /* --- the twice-yearly alignment, when it is close --- */
  if (typeof egAbuSimbelSun === 'function'){
    const al = egAbuSimbelSun(p);
    if (al) rows.push(egRow('Solar alignment',
      al.when === 'today' ? 'today' : egEsc(al.when), egEsc(al.note)));
  }
  draw();

  /* --- weather and heat --- */
  let wx = null;
  if (typeof egLiveWeather === 'function'){
    wx = await egLiveWeather(p);
    if (wx && wx.current){
      const c = wx.current;
      rows.push(egRow('Weather',
        Math.round(c.temperature_2m) + '&deg;C',
        egEsc(lkWeatherWord(c.weather_code))
          + (c.apparent_temperature != null
             ? ' · feels ' + Math.round(c.apparent_temperature) + '&deg;' : '')
          + (c.relative_humidity_2m != null
             ? ' · ' + Math.round(c.relative_humidity_2m) + '% humidity' : '')));

      if (typeof egHeatNote === 'function'){
        const hn = egHeatNote(p, wx);
        if (hn) rows.push(egRow('Heat', hn.feels + '&deg;C', egEsc(hn.note)));
      }
      sources.push('weather from Open-Meteo');
      draw();
    }
  }

  /* --- dust and the khamsin --- */
  let air = null;
  if (typeof egLiveAir === 'function'){
    air = await egLiveAir(p);
    if (typeof egDust === 'function'){
      const du = egDust(p, air, wx);
      if (du) rows.push(egRow('Dust', 'PM10 ' + du.pm10, egEsc(du.note)));
    }
    draw();
  }

  /* --- the season --- */
  if (typeof egSeasonNote === 'function'){
    const s2 = egSeasonNote(p);
    if (s2) rows.push(egRow('Season', egEsc(s2.name), egEsc(s2.note)));
    draw();
  }

  /* --- the rest of the forecast --- */
  if (wx && wx.current){
    const c = wx.current;
    if (c.wind_speed_10m != null){
      rows.push(egRow('Wind',
        Math.round(c.wind_speed_10m) + ' km/h ' + egEsc(lkCompass(c.wind_direction_10m)),
        egEsc((lkBeaufort(c.wind_speed_10m) || {}).word || '')
          + (c.wind_gusts_10m != null ? ' · gusting ' + Math.round(c.wind_gusts_10m) : '')));
    }
    if (wx.daily && wx.daily.time){
      const d = wx.daily;
      if (d.uv_index_max && d.uv_index_max[0] != null){
        rows.push(egRow('UV index', Math.round(d.uv_index_max[0]),
          egEsc(lkUvWord(d.uv_index_max[0]))
            + (d.uv_index_max[0] >= 9 ? ' · a hat is not optional on an open site' : '')));
      }
      const strip = d.time.slice(0, 5).map((t, i) =>
        '<span><i>' + egEsc(lkDayName(t, tz)) + '</i>'
        + '<b>' + Math.round(d.temperature_2m_max[i]) + '&deg;</b>'
        + '<em>' + egEsc(lkWeatherWord(d.weather_code[i]))
        + (d.precipitation_probability_max && d.precipitation_probability_max[i] != null
           ? ' ' + d.precipitation_probability_max[i] + '%' : '')
        + '</em></span>').join('');
      rows.push('<div class="pl-fc">' + strip + '</div>');
    }
    draw();
  }

  /* --- the sea, and what to wear in it --- */
  if (typeof egMaybeCoastal === 'function' && egMaybeCoastal(p) && typeof egLiveSea === 'function'){
    const sea = await egLiveSea(p);
    if (sea && sea.current){
      const s3 = sea.current;
      const where = (typeof egSeaOf === 'function') ? egSeaOf(p) : 'the sea';
      if (typeof egWaterNote === 'function'){
        const wn = egWaterNote(p, sea);
        if (wn) rows.push(egRow('Sea temperature', wn.temp + '&deg;C',
          egEsc('in ' + where + '. ' + wn.note)));
      } else if (s3.sea_surface_temperature != null){
        rows.push(egRow('Sea temperature',
          Math.round(s3.sea_surface_temperature) + '&deg;C', egEsc('in ' + where)));
      }
      if (s3.wave_height != null){
        rows.push(egRow('Waves', s3.wave_height.toFixed(1) + ' m',
          egEsc(lkSeaState(s3.wave_height))
            + (s3.wave_period != null ? ' · ' + Math.round(s3.wave_period) + 's period' : '')));
      }
      sources.push('sea from Open-Meteo Marine');
      draw();
    }
  }

  /* --- air --- */
  if (air && air.current && air.current.us_aqi != null){
    const a = air.current;
    rows.push(egRow('Air quality', Math.round(a.us_aqi) + ' · ' + egEsc(lkAirWord(a.us_aqi)),
      egEsc(lkAirAdvice(a.us_aqi))
        + (a.pm2_5 != null ? ' · PM2.5 ' + Math.round(a.pm2_5) : '')));
    sources.push('air from Open-Meteo');
    draw();
  }

  /* --- sun, moon, stars --- */
  const dl = (typeof lkDaylightFrom === 'function') ? lkDaylightFrom(wx) : null;
  if (dl && dl.sunrise){
    rows.push(egRow('Sun',
      'up ' + egEsc(lkClock(dl.sunrise, tz)) + ' · down ' + egEsc(lkClock(dl.sunset, tz)),
      egEsc(lkDayLengthWords(dl))));
  } else if (typeof egSunEvent === 'function'){
    const sun = egSunEvent(p);
    if (sun && sun.sunrise){
      rows.push(egRow('Sun',
        'up ' + egEsc(lkClock(sun.sunrise, tz)) + ' · down ' + egEsc(lkClock(sun.sunset, tz)), ''));
    }
  }
  if (typeof egMoon === 'function'){
    const moon = egMoon();
    if (moon) rows.push(egRow('Moon', egEsc(moon.name),
      Math.round(moon.illumination * 100) + '% lit'));
  }
  if (typeof egLiveSky === 'function'){
    const sky = await egLiveSky(p);
    if (sky) rows.push(egRow('Stars tonight', sky.score + '/10', egEsc(sky.note)));
  }
  draw();

  /* --- the ground --- */
  if (typeof egLiveSeismic === 'function' && typeof egIsSeismic === 'function' && egIsSeismic(p)){
    const q = await egLiveSeismic(p);
    if (q && q.features && q.features.length){
      const top = q.features.reduce((a, b) =>
        (b.properties.mag > a.properties.mag ? b : a), q.features[0]);
      rows.push(egRow('Seismic activity',
        q.features.length + (q.features.length === 1 ? ' tremor' : ' tremors') + ' in 30 days',
        'strongest M' + top.properties.mag + ' · '
          + egEsc(lkAgo(new Date(top.properties.time).toISOString()))
          + ' · within 300 km'));
      sources.push('seismicity from USGS');
      draw();
    }
  }

  /* --- is anything shut --- */
  if (typeof egLiveHolidays === 'function'){
    const hol = await egLiveHolidays();
    const now = (typeof egHolidayNow === 'function') ? egHolidayNow(hol) : null;
    if (now){
      rows.push(egRow('Public holiday', egEsc(now.name),
        now.when === 'today'
          ? 'today · offices shut, sites open and busy'
          : egEsc(lkDayName(now.when, tz)) + ' · coming up'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
