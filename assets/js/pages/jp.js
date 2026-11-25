/* ===========================================================
   JAPAN — the pages

     #/japan                 the country, its prefectures, and the
                             obvious places to start
     #/japan/region/<CODE>   everything the atlas has in one prefecture
     #/japan/place/<id>      one place, what to do there, and what is
                             true about it right now

   This is the first country built on the shared place-page layout
   in core/placeview.js: a jump bar under the photo, the guide in
   the main column, and the live panel in a sticky column on the
   right that collapses under the photo on a phone. Italy, Costa
   Rica and India use the same thing.

   Forty-seven prefectures is too many for one flat grid, so the
   index groups them into the eight regions everybody in Japan
   already uses.
   =========================================================== */

function jpEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function jpRegionFace(code){
  const ids = jpRegionPlaces(code);
  return ids[0] || null;
}

/* The eight regions. Every prefecture code appears exactly once and
   the test suite checks it. */
const JP_GROUPS = [
  ['Hokkaido',  ['HKD']],
  ['Tohoku',    ['AOM','IWT','MYG','AKT','YGT','FKS']],
  ['Kanto',     ['TKY','KNG','CHB','STM','TCG','GNM','IBR']],
  ['Chubu',     ['NGT','TYM','ISK','FKI','YMN','NGN','GIF','SZK','AIC']],
  ['Kansai',    ['KYT','OSK','HYG','NAR','SHG','WKY','MIE']],
  ['Chugoku',   ['HRS','OKY','SMN','TTR','YMG']],
  ['Shikoku',   ['KGW','TKS','EHM','KCH']],
  ['Kyushu & Okinawa', ['FKO','SAG','NGS','KMM','OIT','MYZ','KGS','OKN']]
];

const JP_REGION_IDS = Object.keys(JP_REGIONS);

/* ===========================================================
   #/japan
   =========================================================== */
function renderJapan(){
  const total = JP_PLACE_IDS.length;
  const regions = JP_REGION_IDS.length;
  const top = JP_PLACE_IDS.slice(0, 16);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>Japan</h1>'
    + '<p class="pg-sub">Forty-seven prefectures and ' + total + ' places, from drift ice '
    + 'in the Sea of Okhotsk to coral reefs closer to Taipei than to Tokyo. '
    + 'With live weather, sea, air and sky for every one of them, plus the '
    + 'two dates that decide most trips here: the blossom and the leaves.</p>'
    + '<p class="pg-note">' + total + ' places &middot; ' + regions + ' prefectures '
    + '&middot; all times Asia/Tokyo (UTC+9)</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => jpCard(id, true)).join('')
    + '</div></div>';

  JP_GROUPS.forEach(g => {
    h += '<div class="pg-sec"><h2>' + jpEsc(g[0]) + '</h2><div class="tr-grid">'
      + g[1].map(code => {
          const r = JP_REGIONS[code];
          if (!r) return '';
          const face = jpRegionFace(code);
          const n = jpRegionPlaces(code).length;
          return '<a class="tr-card" href="#/japan/region/' + code + '">'
            + '<span class="tr-card-ph" data-jpphoto="' + (face || '') + '"></span>'
            + '<span class="tr-card-tx">'
            + '<i>' + jpEsc(r[1]) + '</i>'
            + '<b>' + jpEsc(r[0]) + '</b>'
            + '<em title="Places in the atlas">' + n + '</em></span></a>';
        }).join('')
      + '</div></div>';
  });

  return h + '</section>';
}

function mountJapan(host){
  /* A place page is the likely next click, so start the guide fetch
     now and let it overlap with reading this one. */
  if (typeof guideWarm === 'function') guideWarm('JP');
  host.innerHTML = renderJapan();
  window.scrollTo(0, 0);
  jpPaintPhotos(host);
}

/* ===========================================================
   #/japan/region/<CODE>
   =========================================================== */
function renderJpRegion(code){
  const r = JP_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/japan">&larr; Japan</a>'
    + '<p>No such prefecture.</p></section>';

  const ids = jpRegionPlaces(code);
  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/japan">&larr; Japan</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">Prefecture &middot; ' + jpEsc(r[1]) + '</span>'
    + '<h1>' + jpEsc(r[0]) + '</h1>'
    + '<p class="pg-sub">' + jpEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + (ids.length === 1 ? ' place' : ' places')
    + ' in the atlas</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><div class="tr-grid">'
    + ids.map(id => jpCard(id, false)).join('')
    + '</div></div>';

  return h + '</section>';
}

function mountJpRegion(host, code){
  if (typeof guideWarm === 'function') guideWarm('JP');
  host.innerHTML = renderJpRegion(code);
  window.scrollTo(0, 0);
  jpPaintPhotos(host);
}

/* ===========================================================
   #/japan/place/<id>
   =========================================================== */
function renderJpPlace(id){
  const p = jpPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/japan">&larr; Japan</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof jpGuide === 'function') ? jpGuide(id) : null;
  const region = JP_REGIONS[p.abbr];
  const near = jpNearby(id, 6);

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/japan/region/' + p.abbr + '">&larr; ' + jpEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + jpEsc(jpKindLabel(p.kind)) + ' &middot; ' + jpEsc(region[0]) + '</span>'
    + '<h1>' + jpEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + jpEsc(p.blurb) + '</p>'
    + '</div></div>';

  h += '<div class="it-hero" data-jpphoto-big="' + id + '"></div>';

  h += pvChips(p, jpTagLabel);

  /* The jump bar only lists sections this page actually has. */
  const sections = [{ id: 'jp-now', label: 'Right now' }];
  if (g && g.intro && g.intro.length) sections.push({ id: 'jp-place', label: 'The place' });
  if (g && g.see && g.see.length)     sections.push({ id: 'jp-do',    label: 'What to do' });
  const practical = g ? [['when','When to go'],['stay','How long'],
                         ['move','Getting there'],['eat','What to eat']]
                        .filter(r => g[r[0]]) : [];
  if (practical.length) sections.push({ id: 'jp-prac', label: 'Practical' });
  if (near.length)      sections.push({ id: 'jp-near', label: 'Nearby' });
  h += pvJumpNav(sections);

  h += pvColumnsOpen();

  /* The aside is written first so that on a phone, where the grid
     collapses to one column, the live panel lands directly under
     the photo instead of below four screens of prose. On desktop
     the CSS puts it back in the right-hand column. */
  h += '<div id="jp-now" class="pv-anchor">' + pvAside('jpLive') + '</div>';

  h += pvMainOpen();

  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec pv-anchor" id="jp-place"><h2>The place</h2>'
        + '<div class="it-prose">'
        + g.intro.map(x => '<p>' + jpEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec pv-anchor" id="jp-do"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + jpEsc(s.n) + '</b>'
            + (s.t ? '<i>' + jpEsc(s.t) + '</i>' : '')
            + '<p>' + jpEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    if (practical.length){
      h += '<div class="pg-sec pv-anchor" id="jp-prac"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + jpEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  if (near.length){
    h += '<div class="pg-sec pv-anchor" id="jp-near"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => jpCard(n.id, true)).join('')
      + '</div></div>';
  }

  h += pvMainClose();
  h += pvColumnsClose();
  return h + '</section>';
}

/* Straight-line neighbours, nearest first.

   Capped at four hundred kilometres. Japan is long and thin, so an
   uncapped nearest-neighbour search puts Okinawa's neighbours in
   Kyushu, a thousand kilometres and a flight away, which is not
   what anybody means by nearby. */
function jpNearby(id, limit){
  const me = jpPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  return JP_PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = jpPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).filter(x => x.km <= 400)
    .sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

function jpTagLabel(t){
  if (typeof JP_FLAG !== 'undefined' && JP_FLAG[t]) return JP_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

function jpCard(id, showRegion){
  const p = jpPlaceGet(id);
  return '<a class="tr-card" href="#/japan/place/' + id + '">'
    + '<span class="tr-card-ph" data-jpphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + jpEsc(showRegion ? JP_REGIONS[p.abbr][0] : jpKindLabel(p.kind)) + '</i>'
    + '<b>' + jpEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

async function mountJpPlace(host, id){
  if (typeof guideReady === 'function') await guideReady('JP');
  host.innerHTML = renderJpPlace(id);
  window.scrollTo(0, 0);
  jpPaintPhotos(host);
  if (typeof pvWire === 'function') pvWire(host);
  if (typeof pvWatchSections === 'function') pvWatchSections(host);
  const p = jpPlaceGet(id);
  if (p) wireJpLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS
   =========================================================== */
function jpPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-jpphoto]').forEach(el => {
    const pid = el.dataset.jpphoto;
    if (!pid){ el.classList.add('is-empty'); return; }
    const p = jpPlaceGet(pid);
    if (!p){ el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    }).catch(() => el.classList.add('is-empty'));
  });

  host.querySelectorAll('[data-jpphoto-big]').forEach(el => {
    const p = jpPlaceGet(el.dataset.jpphotoBig);
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

   Rows are pushed in priority order. The first five stay visible
   and the rest go behind the toggle, which is why the order below
   matters: clock, then the season that decides whether the trip is
   worth taking, then the weather.
   =========================================================== */
function jpRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireJpLive(host, p){
  const panel = host.querySelector('#jpLive');
  if (!panel) return;

  const rows = [];
  const sources = [];
  const draw = () => {
    if (!document.body.contains(panel)) return;
    panel.innerHTML = (typeof pvLiveBody === 'function')
      ? pvLiveBody(rows, sources)
      : '<h3>Right now</h3>' + rows.join('');
    if (typeof pvRestoreMore === 'function') pvRestoreMore(panel);
  };

  /* --- the clock, which needs nothing --- */
  const clock = (typeof jpLocalTime === 'function') ? jpLocalTime() : null;
  if (clock){
    const off = (typeof jpOffsetWords === 'function') ? jpOffsetWords(clock.diffMin) : '';
    rows.push(jpRow('Local time',
      jpEsc(clock.time) + ' <small>' + jpEsc(clock.zone) + '</small>',
      jpEsc(clock.date + (off ? ' · ' + off : ''))));
    draw();
  }

  /* --- blossom or leaves, whichever is the live question --- */
  const month = new Date().getUTCMonth() + 1;
  const seasonFirst = (month >= 9 && month <= 12) ? 'koyo' : 'sakura';
  const seasons = seasonFirst === 'koyo'
    ? [jpKoyo && jpKoyo(p), jpSakura && jpSakura(p)]
    : [jpSakura && jpSakura(p), jpKoyo && jpKoyo(p)];
  if (seasons[0]) rows.push(jpRow('Season', jpEsc(seasons[0].name), jpEsc(seasons[0].note)));
  draw();

  /* --- a storm or a wall of snow outranks the forecast --- */
  if (typeof jpTyphoon === 'function'){
    const ty = jpTyphoon(p);
    if (ty) rows.push(jpRow('Typhoons', jpEsc(ty.name), jpEsc(ty.note)));
  }
  if (typeof jpSnowNote === 'function'){
    const sn = jpSnowNote(p);
    if (sn) rows.push(jpRow('Snow', jpEsc(sn.name), jpEsc(sn.note)));
  }
  if (typeof jpBusyPeriod === 'function'){
    const bp = jpBusyPeriod();
    if (bp) rows.push(jpRow('Everyone is travelling', jpEsc(bp.name), jpEsc(bp.note)));
  }
  draw();

  /* --- weather --- */
  if (typeof jpLiveWeather === 'function'){
    const wx = await jpLiveWeather(p);
    if (wx && wx.current){
      const c = wx.current;
      rows.push(jpRow('Weather',
        Math.round(c.temperature_2m) + '&deg;C',
        jpEsc(jpWeatherWord(c.weather_code))
          + (c.apparent_temperature != null
             ? ' · feels ' + Math.round(c.apparent_temperature) + '&deg;' : '')
          + (c.relative_humidity_2m != null
             ? ' · ' + Math.round(c.relative_humidity_2m) + '% humidity' : '')));

      const heat = (typeof jpHeatAdvice === 'function')
        ? jpHeatAdvice(c.apparent_temperature) : '';
      if (heat) rows.push(jpRow('Feels like', Math.round(c.apparent_temperature) + '&deg;C', jpEsc(heat)));

      if (c.wind_speed_10m != null){
        rows.push(jpRow('Wind',
          Math.round(c.wind_speed_10m) + ' km/h ' + jpEsc(jpCompass(c.wind_direction_10m)),
          jpEsc(jpBeaufort(c.wind_speed_10m))
            + (c.wind_gusts_10m != null ? ' · gusting ' + Math.round(c.wind_gusts_10m) : '')));
      }

      if (wx.daily && wx.daily.time){
        const d = wx.daily;
        if (d.uv_index_max && d.uv_index_max[0] != null){
          rows.push(jpRow('UV index', Math.round(d.uv_index_max[0]),
            jpEsc(jpUvWord(d.uv_index_max[0]))));
        }
        const strip = d.time.slice(0, 5).map((t, i) =>
          '<span><i>' + jpEsc(jpDayName(t)) + '</i>'
          + '<b>' + Math.round(d.temperature_2m_max[i]) + '&deg;</b>'
          + '<em>' + jpEsc(jpWeatherWord(d.weather_code[i]))
          + (d.precipitation_probability_max && d.precipitation_probability_max[i] != null
             ? ' ' + d.precipitation_probability_max[i] + '%' : '')
          + '</em></span>').join('');
        rows.push('<div class="pl-fc">' + strip + '</div>');

        /* Snowfall in the forecast is worth its own row here in a
           way it would not be in Italy or India. */
        if (d.snowfall_sum){
          const snow = d.snowfall_sum.slice(0, 5).reduce((a, b) => a + (b || 0), 0);
          if (snow > 1){
            rows.push(jpRow('Snow forecast', Math.round(snow) + ' cm',
              'expected over the next five days'));
          }
        }
      }
      sources.push('weather from Open-Meteo, JMA model');
      draw();
    }
  }

  /* --- the sea, where there is one --- */
  if (typeof jpMaybeCoastal === 'function' && jpMaybeCoastal(p) && typeof jpLiveSea === 'function'){
    const sea = await jpLiveSea(p);
    if (sea && sea.current){
      const s = sea.current;
      const where = (typeof jpSeaOf === 'function') ? jpSeaOf(p) : 'the sea';
      if (s.sea_surface_temperature != null){
        rows.push(jpRow('Sea temperature',
          Math.round(s.sea_surface_temperature) + '&deg;C',
          jpEsc('in ' + where)));
      }
      if (s.wave_height != null){
        rows.push(jpRow('Waves', s.wave_height.toFixed(1) + ' m',
          jpEsc(jpSeaState(s.wave_height))
            + (s.wave_period != null ? ' · ' + Math.round(s.wave_period) + 's period' : '')));
      }
      sources.push('sea from Open-Meteo Marine');
      draw();
    }
  }

  /* --- air --- */
  if (typeof jpLiveAir === 'function'){
    const air = await jpLiveAir(p);
    if (air && air.current && air.current.us_aqi != null){
      const a = air.current;
      rows.push(jpRow('Air quality', Math.round(a.us_aqi) + ' · ' + jpEsc(jpAirWord(a.us_aqi)),
        jpEsc(jpAirAdvice(a.us_aqi))
          + (a.pm2_5 != null ? ' · PM2.5 ' + Math.round(a.pm2_5) : '')));
      sources.push('air from Open-Meteo');
      draw();
    }
  }

  /* --- sun, moon, stars --- */
  if (typeof jpSunEvent === 'function'){
    const sun = jpSunEvent(p);
    if (sun && sun.sunrise){
      rows.push(jpRow('Sun',
        'up ' + jpEsc(jpClock(sun.sunrise)) + ' · down ' + jpEsc(jpClock(sun.sunset)),
        ''));
    }
  }
  if (typeof jpClockVsSun === 'function'){
    const cs = jpClockVsSun(p);
    if (cs) rows.push(jpRow('Sun vs clock',
      cs.mins + ' min ' + (cs.early ? 'early' : 'late'), jpEsc(cs.note)));
  }
  if (typeof jpMoon === 'function'){
    const moon = jpMoon();
    if (moon) rows.push(jpRow('Moon', jpEsc(moon.name),
      Math.round(moon.illumination * 100) + '% lit'));
  }
  if (typeof jpLiveSky === 'function'){
    const sky = await jpLiveSky(p);
    if (sky) rows.push(jpRow('Stars tonight', sky.score + '/10', jpEsc(sky.note)));
  }
  draw();

  /* --- the ground --- */
  if (typeof jpLiveSeismic === 'function' && typeof jpIsSeismic === 'function' && jpIsSeismic(p)){
    const q = await jpLiveSeismic(p);
    if (q && q.features && q.features.length){
      const top = q.features.reduce((a, b) =>
        (b.properties.mag > a.properties.mag ? b : a), q.features[0]);
      rows.push(jpRow('Seismic activity',
        q.features.length + (q.features.length === 1 ? ' tremor' : ' tremors') + ' in 14 days',
        'strongest M' + top.properties.mag + ' · '
          + jpEsc(jpAgo(new Date(top.properties.time).toISOString()))
          + ' · within 200 km'));
      sources.push('seismicity from USGS');
      draw();
    }
  }

  /* --- is anything shut --- */
  if (typeof jpLiveHolidays === 'function'){
    const hol = await jpLiveHolidays();
    const now = (typeof jpHolidayNow === 'function') ? jpHolidayNow(hol) : null;
    if (now){
      rows.push(jpRow('Public holiday', jpEsc(now.name),
        now.when === 'today' ? 'today · expect crowds at shrines and temples'
                             : jpEsc(jpDayName(now.when)) + ' · coming up'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
