/* ===========================================================
   SPAIN — the pages

     #/spain                 the country, its communities, and the
                             obvious places to start
     #/spain/region/<CODE>   everything the atlas has in one community
     #/spain/place/<id>      one place, what to do there, and what is
                             true about it right now

   Same shared place-page layout as Italy, Costa Rica, India and
   Japan: a jump bar under the photo, the guide in the main column,
   and the live panel in a sticky column on the right that collapses
   under the photo on a phone.

   The live panel leads with something no other country in the atlas
   needs: what is open. Spain runs ninety minutes behind its own
   clock and a reader who turns up for dinner at seven will find the
   kitchen cold, so the panel says so before it says the weather.
   =========================================================== */

function esEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function esRegionFace(code){
  const ids = esRegionPlaces(code);
  return ids[0] || null;
}

/* Six groupings. Every community code appears exactly once and the
   test suite checks it. These are how people actually describe
   where they are going, not an official division. */
const ES_GROUPS = [
  ['The green north',          ['GAL','AST','CTB','PVA']],
  ['The Ebro and the Pyrenees',['NAV','RIO','ARA']],
  ['The Mediterranean',        ['CAT','VLC','MUR']],
  ['The centre',               ['MAD','CYL','CLM','EXT']],
  ['The south',                ['ADL']],
  ['The islands',              ['BAL','CNR']]
];

const ES_REGION_IDS = Object.keys(ES_REGIONS);

/* ===========================================================
   #/spain
   =========================================================== */
function renderSpain(){
  const total = ES_PLACE_IDS.length;
  const regions = ES_REGION_IDS.length;
  const top = ES_PLACE_IDS.slice(0, 16);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>Spain</h1>'
    + '<p class="pg-sub">Seventeen autonomous communities and ' + total + ' places, from '
    + 'Atlantic rías that get more rain than Scotland to the only true desert in Europe, '
    + 'and out to volcanic islands off the coast of Africa. With live weather, sea, air '
    + 'and sky for every one of them, plus the thing that catches most visitors out: '
    + 'what is actually open right now.</p>'
    + '<p class="pg-note">' + total + ' places &middot; ' + regions + ' communities '
    + '&middot; mainland Europe/Madrid, Canaries Atlantic/Canary</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => esCard(id, true)).join('')
    + '</div></div>';

  ES_GROUPS.forEach(g => {
    h += '<div class="pg-sec"><h2>' + esEsc(g[0]) + '</h2><div class="tr-grid">'
      + g[1].map(code => {
          const r = ES_REGIONS[code];
          if (!r) return '';
          const face = esRegionFace(code);
          const n = esRegionPlaces(code).length;
          return '<a class="tr-card" href="#/spain/region/' + code + '">'
            + '<span class="tr-card-ph" data-esphoto="' + (face || '') + '"></span>'
            + '<span class="tr-card-tx">'
            + '<i>' + esEsc(r[1]) + '</i>'
            + '<b>' + esEsc(r[0]) + '</b>'
            + '<em title="Places in the atlas">' + n + '</em></span></a>';
        }).join('')
      + '</div></div>';
  });

  return h + '</section>';
}

function mountSpain(host){
  if (typeof guideWarm === 'function') guideWarm('ES');
  host.innerHTML = renderSpain();
  window.scrollTo(0, 0);
  esPaintPhotos(host);
}

/* ===========================================================
   #/spain/region/<CODE>
   =========================================================== */
function renderEsRegion(code){
  const r = ES_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/spain">&larr; Spain</a>'
    + '<p>No such community.</p></section>';

  const ids = esRegionPlaces(code);
  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/spain">&larr; Spain</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">Community &middot; ' + esEsc(r[1]) + '</span>'
    + '<h1>' + esEsc(r[0]) + '</h1>'
    + '<p class="pg-sub">' + esEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + (ids.length === 1 ? ' place' : ' places')
    + ' in the atlas</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><div class="tr-grid">'
    + ids.map(id => esCard(id, false)).join('')
    + '</div></div>';

  return h + '</section>';
}

function mountEsRegion(host, code){
  if (typeof guideWarm === 'function') guideWarm('ES');
  host.innerHTML = renderEsRegion(code);
  window.scrollTo(0, 0);
  esPaintPhotos(host);
}

/* ===========================================================
   #/spain/place/<id>
   =========================================================== */
function renderEsPlace(id){
  const p = esPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/spain">&larr; Spain</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof esGuide === 'function') ? esGuide(id) : null;
  const region = ES_REGIONS[p.abbr];
  const near = esNearby(id, 6);

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/spain/region/' + p.abbr + '">&larr; ' + esEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + esEsc(esKindLabel(p.kind)) + ' &middot; ' + esEsc(region[0]) + '</span>'
    + '<h1>' + esEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + esEsc(p.blurb) + '</p>'
    + '</div></div>';

  h += '<div class="it-hero" data-esphoto-big="' + id + '"></div>';

  h += pvChips(p, esTagLabel);

  const sections = [{ id: 'es-now', label: 'Right now' }];
  if (g && g.intro && g.intro.length) sections.push({ id: 'es-place', label: 'The place' });
  if (g && g.see && g.see.length)     sections.push({ id: 'es-do',    label: 'What to do' });
  const practical = g ? [['when','When to go'],['stay','How long'],
                         ['move','Getting there'],['eat','What to eat']]
                        .filter(r => g[r[0]]) : [];
  if (practical.length) sections.push({ id: 'es-prac', label: 'Practical' });
  if (near.length)      sections.push({ id: 'es-near', label: 'Nearby' });
  h += pvJumpNav(sections);

  h += pvColumnsOpen();
  h += '<div id="es-now" class="pv-anchor">' + pvAside('esLive') + '</div>';
  h += pvMainOpen();

  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec pv-anchor" id="es-place"><h2>The place</h2>'
        + '<div class="it-prose">'
        + g.intro.map(x => '<p>' + esEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec pv-anchor" id="es-do"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + esEsc(s.n) + '</b>'
            + (s.t ? '<i>' + esEsc(s.t) + '</i>' : '')
            + '<p>' + esEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    if (practical.length){
      h += '<div class="pg-sec pv-anchor" id="es-prac"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + esEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  if (near.length){
    h += '<div class="pg-sec pv-anchor" id="es-near"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => esCard(n.id, true)).join('')
      + '</div></div>';
  }

  h += pvMainClose();
  h += pvColumnsClose();
  return h + '</section>';
}

/* Straight-line neighbours, nearest first.

   Capped at two hundred and fifty kilometres. Spain is a compact
   country with two island groups a long way off it, and without a
   cap Tenerife's nearest neighbours come out as Cádiz. */
function esNearby(id, limit){
  const me = esPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  return ES_PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = esPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).filter(x => x.km <= 250)
    .sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

function esTagLabel(t){
  if (typeof ES_FLAG !== 'undefined' && ES_FLAG[t]) return ES_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

function esCard(id, showRegion){
  const p = esPlaceGet(id);
  return '<a class="tr-card" href="#/spain/place/' + id + '">'
    + '<span class="tr-card-ph" data-esphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + esEsc(showRegion ? ES_REGIONS[p.abbr][0] : esKindLabel(p.kind)) + '</i>'
    + '<b>' + esEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

async function mountEsPlace(host, id){
  if (typeof guideReady === 'function') await guideReady('ES');
  host.innerHTML = renderEsPlace(id);
  window.scrollTo(0, 0);
  esPaintPhotos(host);
  if (typeof pvWire === 'function') pvWire(host);
  if (typeof pvWatchSections === 'function') pvWatchSections(host);
  const p = esPlaceGet(id);
  if (p) wireEsLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS
   =========================================================== */
function esPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-esphoto]').forEach(el => {
    const pid = el.dataset.esphoto;
    if (!pid){ el.classList.add('is-empty'); return; }
    const p = esPlaceGet(pid);
    if (!p){ el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    }).catch(() => el.classList.add('is-empty'));
  });

  host.querySelectorAll('[data-esphoto-big]').forEach(el => {
    const p = esPlaceGet(el.dataset.esphotoBig);
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
function esRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireEsLive(host, p){
  const panel = host.querySelector('#esLive');
  if (!panel) return;

  const rows = [];
  const sources = [];
  const tz = (typeof esTzFor === 'function') ? esTzFor(p) : 'Europe/Madrid';
  const draw = () => {
    if (!document.body.contains(panel)) return;
    panel.innerHTML = (typeof pvLiveBody === 'function')
      ? pvLiveBody(rows, sources)
      : '<h3>Right now</h3>' + rows.join('');
    if (typeof pvRestoreMore === 'function') pvRestoreMore(panel);
  };

  /* --- the clock --- */
  const clock = (typeof esLocalTime === 'function') ? esLocalTime(p) : null;
  if (clock){
    const off = (typeof lkOffsetWords === 'function') ? lkOffsetWords(clock.diffMin) : '';
    rows.push(esRow('Local time',
      esEsc(clock.time) + ' <small>' + esEsc(clock.zone) + '</small>',
      esEsc(clock.date + (off ? ' · ' + off : ''))));
    draw();
  }

  /* --- a fiesta outranks everything, because it decides whether
         there is a bed --- */
  if (typeof esFiesta === 'function'){
    const f = esFiesta(p);
    if (f){
      rows.push(esRow(f.when === 'now' ? 'Happening now' : 'Coming up',
        esEsc(f.name),
        esEsc((f.when === 'now' ? '' : f.date + ' · in ' + f.away + ' days · ') + f.note)));
    }
  }

  /* --- what is open, which is the Spanish question --- */
  if (typeof esMealClock === 'function'){
    const m = esMealClock(p);
    if (m) rows.push(esRow('Right now', esEsc(m.now), esEsc(m.note)));
  }
  draw();

  /* --- weather --- */
  let wx = null;
  if (typeof esLiveWeather === 'function'){
    wx = await esLiveWeather(p);
    if (wx && wx.current){
      const c = wx.current;
      rows.push(esRow('Weather',
        Math.round(c.temperature_2m) + '&deg;C',
        esEsc(lkWeatherWord(c.weather_code))
          + (c.apparent_temperature != null
             ? ' · feels ' + Math.round(c.apparent_temperature) + '&deg;' : '')
          + (c.relative_humidity_2m != null
             ? ' · ' + Math.round(c.relative_humidity_2m) + '% humidity' : '')));

      const heat = lkHeatAdvice(c.apparent_temperature);
      if (heat) rows.push(esRow('Feels like',
        Math.round(c.apparent_temperature) + '&deg;C', esEsc(heat)));
      sources.push('weather from Open-Meteo');
      draw();
    }
  }

  /* --- Saharan dust --- */
  let air = null;
  if (typeof esLiveAir === 'function'){
    air = await esLiveAir(p);
    if (typeof esCalima === 'function'){
      const cal = esCalima(air, p);
      if (cal) rows.push(esRow('Calima',
        'PM10 ' + cal.pm10, esEsc(cal.note)));
    }
    draw();
  }

  /* --- the season --- */
  if (typeof esSeasonNote === 'function'){
    const s = esSeasonNote(p);
    if (s) rows.push(esRow('Season', esEsc(s.name), esEsc(s.note)));
    draw();
  }

  /* --- the rest of the forecast --- */
  if (wx && wx.current){
    const c = wx.current;
    if (c.wind_speed_10m != null){
      rows.push(esRow('Wind',
        Math.round(c.wind_speed_10m) + ' km/h ' + esEsc(lkCompass(c.wind_direction_10m)),
        esEsc((lkBeaufort(c.wind_speed_10m) || {}).word || '')
          + (c.wind_gusts_10m != null ? ' · gusting ' + Math.round(c.wind_gusts_10m) : '')));
    }
    if (wx.daily && wx.daily.time){
      const d = wx.daily;
      if (d.uv_index_max && d.uv_index_max[0] != null){
        rows.push(esRow('UV index', Math.round(d.uv_index_max[0]),
          esEsc(lkUvWord(d.uv_index_max[0]))
            + (d.uv_index_max[0] >= 8 ? ' · the southern sun is stronger than it feels' : '')));
      }
      const strip = d.time.slice(0, 5).map((t, i) =>
        '<span><i>' + esEsc(lkDayName(t, tz)) + '</i>'
        + '<b>' + Math.round(d.temperature_2m_max[i]) + '&deg;</b>'
        + '<em>' + esEsc(lkWeatherWord(d.weather_code[i]))
        + (d.precipitation_probability_max && d.precipitation_probability_max[i] != null
           ? ' ' + d.precipitation_probability_max[i] + '%' : '')
        + '</em></span>').join('');
      rows.push('<div class="pl-fc">' + strip + '</div>');
    }
    if (typeof esSnowNote === 'function'){
      const sn = esSnowNote(p, wx);
      if (sn) rows.push(esRow('Snow forecast', sn.cm + ' cm', esEsc(sn.note)));
    }
    draw();
  }

  /* --- the sea --- */
  if (typeof esMaybeCoastal === 'function' && esMaybeCoastal(p) && typeof esLiveSea === 'function'){
    const sea = await esLiveSea(p);
    if (sea && sea.current){
      const s = sea.current;
      const where = (typeof esSeaOf === 'function') ? esSeaOf(p) : 'the sea';
      if (s.sea_surface_temperature != null){
        rows.push(esRow('Sea temperature',
          Math.round(s.sea_surface_temperature) + '&deg;C', esEsc('in ' + where)));
      }
      if (s.wave_height != null){
        rows.push(esRow('Waves', s.wave_height.toFixed(1) + ' m',
          esEsc(lkSeaState(s.wave_height))
            + (s.wave_period != null ? ' · ' + Math.round(s.wave_period) + 's period' : '')));
      }
      sources.push('sea from Open-Meteo Marine');
      draw();
    }
  }

  /* --- air --- */
  if (air && air.current && air.current.us_aqi != null){
    const a = air.current;
    rows.push(esRow('Air quality', Math.round(a.us_aqi) + ' · ' + esEsc(lkAirWord(a.us_aqi)),
      esEsc(lkAirAdvice(a.us_aqi))
        + (a.pm2_5 != null ? ' · PM2.5 ' + Math.round(a.pm2_5) : '')));
    sources.push('air from Open-Meteo');
    draw();
  }

  /* --- sun, moon, stars --- */
  const dl = (typeof lkDaylightFrom === 'function') ? lkDaylightFrom(wx) : null;
  if (dl && dl.sunrise){
    rows.push(esRow('Sun',
      'up ' + esEsc(lkClock(dl.sunrise, tz)) + ' · down ' + esEsc(lkClock(dl.sunset, tz)),
      esEsc(lkDayLengthWords(dl))));
  } else if (typeof esSunEvent === 'function'){
    const sun = esSunEvent(p);
    if (sun && sun.sunrise){
      rows.push(esRow('Sun',
        'up ' + esEsc(lkClock(sun.sunrise, tz)) + ' · down ' + esEsc(lkClock(sun.sunset, tz)), ''));
    }
  }
  if (typeof esClockVsSun === 'function'){
    const cs = esClockVsSun(p);
    if (cs) rows.push(esRow('Sun vs clock',
      cs.mins + ' min ' + (cs.early ? 'early' : 'late'), esEsc(cs.note)));
  }
  if (typeof esMoon === 'function'){
    const moon = esMoon();
    if (moon) rows.push(esRow('Moon', esEsc(moon.name),
      Math.round(moon.illumination * 100) + '% lit'));
  }
  if (typeof esLiveSky === 'function'){
    const sky = await esLiveSky(p);
    if (sky) rows.push(esRow('Stars tonight', sky.score + '/10', esEsc(sky.note)));
  }
  draw();

  /* --- the ground --- */
  if (typeof esLiveSeismic === 'function' && typeof esIsSeismic === 'function' && esIsSeismic(p)){
    const q = await esLiveSeismic(p);
    if (q && q.features && q.features.length){
      const top = q.features.reduce((a, b) =>
        (b.properties.mag > a.properties.mag ? b : a), q.features[0]);
      rows.push(esRow('Seismic activity',
        q.features.length + (q.features.length === 1 ? ' tremor' : ' tremors') + ' in 30 days',
        'strongest M' + top.properties.mag + ' · '
          + esEsc(lkAgo(new Date(top.properties.time).toISOString()))
          + ' · within 250 km'));
      sources.push('seismicity from USGS');
      draw();
    }
  }

  /* --- is anything shut --- */
  if (typeof esLiveHolidays === 'function'){
    const hol = await esLiveHolidays();
    const now = (typeof esHolidayNow === 'function') ? esHolidayNow(hol, p) : null;
    if (now){
      rows.push(esRow('Public holiday', esEsc(now.name),
        now.when === 'today'
          ? 'today · shops shut, bars do not'
          : esEsc(lkDayName(now.when, tz)) + ' · coming up'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
