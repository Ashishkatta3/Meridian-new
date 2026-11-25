/* ===========================================================
   ICELAND — the pages

     #/iceland                 the country, its regions, and the
                               obvious places to start
     #/iceland/region/<CODE>   everything the atlas has in one region
     #/iceland/place/<id>      one place, what to do there, and what
                               is true about it right now

   Same shared place-page layout as the rest of the atlas: a jump
   bar under the photo, the guide in the main column, and the live
   panel in a sticky column on the right that collapses under the
   photo on a phone.

   The live panel leads with the aurora, which is the reason a very
   large number of winter trips here are booked, and it refuses to
   give a number without the two things that actually decide
   whether you will see anything: darkness and cloud. Between late
   April and late August the honest answer is that there is no
   aurora season at all, and the panel says so.

   After that comes daylight, which runs from about four hours to
   twenty-one across the year, and then wind, which is the weather
   that genuinely ruins Icelandic days and takes car doors off
   their hinges.
   =========================================================== */

function isEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function isRegionFace(code){
  const ids = isRegionPlaces(code);
  return ids[0] || null;
}

/* Six groupings. Every community code appears exactly once and the
   test suite checks it. These are how people actually describe
   where they are going, not an official division. */
const IS_GROUPS = [
  ['Reykjavík and the southwest', ['RVK','RNS']],
  ['The west and the fjords',     ['VSL','VFJ']],
  ['The north',                   ['NWI','NEI']],
  ['The east and the south',      ['EST','SUL']],
  ['The interior',                ['HLD']]
];

const IS_REGION_IDS = Object.keys(IS_REGIONS);

/* ===========================================================
   #/iceland
   =========================================================== */
function renderIceland(){
  const total = IS_PLACE_IDS.length;
  const regions = IS_REGION_IDS.length;
  const top = IS_PLACE_IDS.slice(0, 16);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>Iceland</h1>'
    + '<p class="pg-sub">Nine regions and ' + total + ' places, on an island the size of '
    + 'Ireland with the population of Coventry. Glacier lagoons, a parliament field in a '
    + 'rift valley, bird cliffs four hundred metres high and an interior with no permanent '
    + 'residents at all. With live weather, sea, sky and the aurora for every one of them, '
    + 'plus the two numbers that decide an Icelandic day: how much daylight there is and '
    + 'how hard the wind is blowing.</p>'
    + '<p class="pg-note">' + total + ' places &middot; ' + regions + ' regions '
    + '&middot; all times Atlantic/Reykjavik, UTC all year</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => isCard(id, true)).join('')
    + '</div></div>';

  IS_GROUPS.forEach(g => {
    h += '<div class="pg-sec"><h2>' + isEsc(g[0]) + '</h2><div class="tr-grid">'
      + g[1].map(code => {
          const r = IS_REGIONS[code];
          if (!r) return '';
          const face = isRegionFace(code);
          const n = isRegionPlaces(code).length;
          return '<a class="tr-card" href="#/iceland/region/' + code + '">'
            + '<span class="tr-card-ph" data-isphoto="' + (face || '') + '"></span>'
            + '<span class="tr-card-tx">'
            + '<i>' + isEsc(r[1]) + '</i>'
            + '<b>' + isEsc(r[0]) + '</b>'
            + '<em title="Places in the atlas">' + n + '</em></span></a>';
        }).join('')
      + '</div></div>';
  });

  return h + '</section>';
}

function mountIceland(host){
  if (typeof guideWarm === 'function') guideWarm('IS');
  host.innerHTML = renderIceland();
  window.scrollTo(0, 0);
  isPaintPhotos(host);
}

/* ===========================================================
   #/iceland/region/<CODE>
   =========================================================== */
function renderIsRegion(code){
  const r = IS_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/iceland">&larr; Iceland</a>'
    + '<p>No such community.</p></section>';

  const ids = isRegionPlaces(code);
  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/iceland">&larr; Iceland</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">Community &middot; ' + isEsc(r[1]) + '</span>'
    + '<h1>' + isEsc(r[0]) + '</h1>'
    + '<p class="pg-sub">' + isEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + (ids.length === 1 ? ' place' : ' places')
    + ' in the atlas</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><div class="tr-grid">'
    + ids.map(id => isCard(id, false)).join('')
    + '</div></div>';

  return h + '</section>';
}

function mountIsRegion(host, code){
  if (typeof guideWarm === 'function') guideWarm('IS');
  host.innerHTML = renderIsRegion(code);
  window.scrollTo(0, 0);
  isPaintPhotos(host);
}

/* ===========================================================
   #/iceland/place/<id>
   =========================================================== */
function renderIsPlace(id){
  const p = isPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/iceland">&larr; Iceland</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof isGuide === 'function') ? isGuide(id) : null;
  const region = IS_REGIONS[p.abbr];
  const near = isNearby(id, 6);

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/iceland/region/' + p.abbr + '">&larr; ' + isEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + isEsc(isKindLabel(p.kind)) + ' &middot; ' + isEsc(region[0]) + '</span>'
    + '<h1>' + isEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + isEsc(p.blurb) + '</p>'
    + '</div></div>';

  h += '<div class="it-hero" data-isphoto-big="' + id + '"></div>';

  h += pvChips(p, isTagLabel);

  const sections = [{ id: 'is-now', label: 'Right now' }];
  if (g && g.intro && g.intro.length) sections.push({ id: 'is-place', label: 'The place' });
  if (g && g.see && g.see.length)     sections.push({ id: 'is-do',    label: 'What to do' });
  const practical = g ? [['when','When to go'],['stay','How long'],
                         ['move','Getting there'],['eat','What to eat']]
                        .filter(r => g[r[0]]) : [];
  if (practical.length) sections.push({ id: 'is-prac', label: 'Practical' });
  if (near.length)      sections.push({ id: 'is-near', label: 'Nearby' });
  h += pvJumpNav(sections);

  h += pvColumnsOpen();
  h += '<div id="is-now" class="pv-anchor">' + pvAside('isLive') + '</div>';
  h += pvMainOpen();

  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec pv-anchor" id="is-place"><h2>The place</h2>'
        + '<div class="it-prose">'
        + g.intro.map(x => '<p>' + isEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec pv-anchor" id="is-do"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + isEsc(s.n) + '</b>'
            + (s.t ? '<i>' + isEsc(s.t) + '</i>' : '')
            + '<p>' + isEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    if (practical.length){
      h += '<div class="pg-sec pv-anchor" id="is-prac"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + isEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  if (near.length){
    h += '<div class="pg-sec pv-anchor" id="is-near"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => isCard(n.id, true)).join('')
      + '</div></div>';
  }

  h += pvMainClose();
  h += pvColumnsClose();
  return h + '</section>';
}

/* Straight-line neighbours, nearest first.

   Capped at a hundred and twenty kilometres. Iceland is small
   enough that an uncapped search returns the other side of the
   island, and a hundred and twenty kilometres of Icelandic road in
   winter is already most of a day. */
function isNearby(id, limit){
  const me = isPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  return IS_PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = isPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).filter(x => x.km <= 120)
    .sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

function isTagLabel(t){
  if (typeof IS_FLAG !== 'undefined' && IS_FLAG[t]) return IS_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

function isCard(id, showRegion){
  const p = isPlaceGet(id);
  return '<a class="tr-card" href="#/iceland/place/' + id + '">'
    + '<span class="tr-card-ph" data-isphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + isEsc(showRegion ? IS_REGIONS[p.abbr][0] : isKindLabel(p.kind)) + '</i>'
    + '<b>' + isEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

async function mountIsPlace(host, id){
  if (typeof guideReady === 'function') await guideReady('IS');
  host.innerHTML = renderIsPlace(id);
  window.scrollTo(0, 0);
  isPaintPhotos(host);
  if (typeof pvWire === 'function') pvWire(host);
  if (typeof pvWatchSections === 'function') pvWatchSections(host);
  const p = isPlaceGet(id);
  if (p) wireIsLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS
   =========================================================== */
function isPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-isphoto]').forEach(el => {
    const pid = el.dataset.isphoto;
    if (!pid){ el.classList.add('is-empty'); return; }
    const p = isPlaceGet(pid);
    if (!p){ el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    }).catch(() => el.classList.add('is-empty'));
  });

  host.querySelectorAll('[data-isphoto-big]').forEach(el => {
    const p = isPlaceGet(el.dataset.isphotoBig);
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
function isRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireIsLive(host, p){
  const panel = host.querySelector('#isLive');
  if (!panel) return;

  const rows = [];
  const sources = [];
  const tz = (typeof IS_TZ !== 'undefined') ? IS_TZ : 'Atlantic/Reykjavik';
  const draw = () => {
    if (!document.body.contains(panel)) return;
    panel.innerHTML = (typeof pvLiveBody === 'function')
      ? pvLiveBody(rows, sources)
      : '<h3>Right now</h3>' + rows.join('');
    if (typeof pvRestoreMore === 'function') pvRestoreMore(panel);
  };

  /* --- the clock. Iceland has run on UTC with no summer time
         since 1968, which is a fact worth putting on the page. --- */
  const clock = (typeof isLocalTime === 'function') ? isLocalTime() : null;
  if (clock){
    const off = (typeof lkOffsetWords === 'function') ? lkOffsetWords(clock.diffMin) : '';
    rows.push(isRow('Local time',
      isEsc(clock.time) + ' <small>' + isEsc(clock.zone) + '</small>',
      isEsc(clock.date + (off ? ' · ' + off : ''))));
    draw();
  }

  /* --- weather first, because the aurora verdict needs it --- */
  let wx = null;
  if (typeof isLiveWeather === 'function') wx = await isLiveWeather(p);

  /* --- the aurora, which is the headline for half the year --- */
  if (typeof isLiveAurora === 'function'){
    const au = await isLiveAurora(p);
    if (au){
      rows.push(isRow('Northern lights',
        isEsc(au.verdict) + (au.kp != null ? ' <small>Kp ' + au.kp + '</small>' : ''),
        isEsc(au.note)));
      if (au.kp != null) sources.push('Kp index from NOAA SWPC');
    }
    draw();
  }

  /* --- daylight, the other number that shapes the trip --- */
  if (typeof isDaylightNote === 'function'){
    const dn = isDaylightNote(p, null, wx);
    if (dn) rows.push(isRow('Daylight',
      (dn.hours != null ? dn.hours + ' h' : ''), isEsc(dn.note)));
    draw();
  }

  /* --- weather --- */
  if (wx && wx.current){
    const c = wx.current;
    rows.push(isRow('Weather',
      Math.round(c.temperature_2m) + '&deg;C',
      isEsc(lkWeatherWord(c.weather_code))
        + (c.apparent_temperature != null
           ? ' · feels ' + Math.round(c.apparent_temperature) + '&deg;' : '')
        + (c.relative_humidity_2m != null
           ? ' · ' + Math.round(c.relative_humidity_2m) + '% humidity' : '')));
    sources.push('weather from Open-Meteo');
    draw();
  }

  /* --- wind, in metres per second, because that is how Iceland
         talks about it and because it is the thing that will
         actually ruin the day --- */
  if (typeof isWindNote === 'function'){
    const w = isWindNote(wx);
    if (w) rows.push(isRow('Wind',
      w.ms + ' m/s' + (w.gustMs != null && w.gustMs > w.ms ? ' <small>gusting ' + w.gustMs + '</small>' : ''),
      isEsc(w.note)));
    draw();
  }

  /* --- can you get there --- */
  if (typeof isFRoadSeason === 'function'){
    const fr = isFRoadSeason(p);
    if (fr) rows.push(isRow('Highland roads', fr.open ? 'Open' : 'Closed', isEsc(fr.note)));
  }
  if (typeof isAccessNote === 'function'){
    const ac = isAccessNote(p);
    if (ac) rows.push(isRow('Getting there', 'Note', isEsc(ac)));
  }

  /* --- the season --- */
  if (typeof isSeasonNote === 'function'){
    const s2 = isSeasonNote(p);
    if (s2) rows.push(isRow('Season', isEsc(s2.name), isEsc(s2.note)));
  }

  /* --- puffins, which half of all visitors ask about --- */
  if (typeof isPuffinNote === 'function'){
    const pf = isPuffinNote(p);
    if (pf) rows.push(isRow('Puffins', pf.in ? 'Ashore' : 'At sea', isEsc(pf.note)));
  }
  draw();

  /* --- the rest of the forecast --- */
  if (wx && wx.daily && wx.daily.time){
    const d = wx.daily;
    const strip = d.time.slice(0, 5).map((t, i) =>
      '<span><i>' + isEsc(lkDayName(t, tz)) + '</i>'
      + '<b>' + Math.round(d.temperature_2m_max[i]) + '&deg;</b>'
      + '<em>' + isEsc(lkWeatherWord(d.weather_code[i]))
      + (d.precipitation_probability_max && d.precipitation_probability_max[i] != null
         ? ' ' + d.precipitation_probability_max[i] + '%' : '')
      + '</em></span>').join('');
    rows.push('<div class="pl-fc">' + strip + '</div>');

    if (d.wind_gusts_10m_max){
      const peak = Math.max.apply(null, d.wind_gusts_10m_max.slice(0, 5).map(x => x || 0));
      if (peak >= 72){
        rows.push(isRow('Gusts forecast', Math.round(peak / 3.6) + ' m/s',
          'peak in the next five days. Above twenty-five metres a second the authorities start closing roads.'));
      }
    }
    if (d.snowfall_sum){
      const snow = d.snowfall_sum.slice(0, 5).reduce((a, b) => a + (b || 0), 0);
      if (snow > 1){
        rows.push(isRow('Snow forecast', Math.round(snow) + ' cm',
          'expected over the next five days'));
      }
    }
    if (d.uv_index_max && d.uv_index_max[0] != null && d.uv_index_max[0] >= 3){
      rows.push(isRow('UV index', Math.round(d.uv_index_max[0]),
        isEsc(lkUvWord(d.uv_index_max[0])) + ' · snow and water double it'));
    }
    draw();
  }

  /* --- the sea --- */
  if (typeof isMaybeCoastal === 'function' && isMaybeCoastal(p) && typeof isLiveSea === 'function'){
    const sea = await isLiveSea(p);
    if (sea && sea.current){
      const s3 = sea.current;
      const where = (typeof isSeaOf === 'function') ? isSeaOf(p) : 'the sea';
      if (s3.sea_surface_temperature != null){
        rows.push(isRow('Sea temperature',
          Math.round(s3.sea_surface_temperature) + '&deg;C',
          isEsc('in ' + where + '. A drysuit, not a wetsuit.')));
      }
      if (s3.wave_height != null){
        rows.push(isRow('Waves', s3.wave_height.toFixed(1) + ' m',
          isEsc(lkSeaState(s3.wave_height))
            + (s3.wave_period != null ? ' · ' + Math.round(s3.wave_period) + 's period' : '')));
      }
      sources.push('sea from Open-Meteo Marine');
      draw();
    }
  }

  /* --- air, which in Iceland is mostly about volcanic gas --- */
  if (typeof isLiveAir === 'function'){
    const air = await isLiveAir(p);
    if (air && air.current && air.current.us_aqi != null){
      const a = air.current;
      rows.push(isRow('Air quality', Math.round(a.us_aqi) + ' · ' + isEsc(lkAirWord(a.us_aqi)),
        isEsc(lkAirAdvice(a.us_aqi))
          + (a.pm2_5 != null ? ' · PM2.5 ' + Math.round(a.pm2_5) : '')));
      sources.push('air from Open-Meteo');
      draw();
    }
  }

  /* --- sun, moon, stars --- */
  const dl = (typeof lkDaylightFrom === 'function') ? lkDaylightFrom(wx) : null;
  if (dl && dl.sunrise){
    rows.push(isRow('Sun',
      'up ' + isEsc(lkClock(dl.sunrise, tz)) + ' · down ' + isEsc(lkClock(dl.sunset, tz)), ''));
  } else if (typeof isSunEvent === 'function'){
    const sun = isSunEvent(p);
    if (sun && sun.sunrise){
      rows.push(isRow('Sun',
        'up ' + isEsc(lkClock(sun.sunrise, tz)) + ' · down ' + isEsc(lkClock(sun.sunset, tz)), ''));
    }
  }
  if (typeof isClockVsSun === 'function'){
    const cs = isClockVsSun(p);
    if (cs) rows.push(isRow('Sun vs clock',
      cs.mins + ' min ' + (cs.early ? 'early' : 'late'), isEsc(cs.note)));
  }
  if (typeof isMoon === 'function'){
    const moon = isMoon();
    if (moon) rows.push(isRow('Moon', isEsc(moon.name),
      Math.round(moon.illumination * 100) + '% lit'));
  }
  if (typeof isLiveSky === 'function'){
    const sky = await isLiveSky(p);
    if (sky) rows.push(isRow('Stars tonight', sky.score + '/10', isEsc(sky.note)));
  }
  draw();

  /* --- the ground, which here is a forecast rather than a record --- */
  if (typeof isLiveSeismic === 'function' && typeof isSeismic === 'function' && isSeismic(p)){
    const q = await isLiveSeismic(p);
    const swarm = (typeof isQuakeSwarm === 'function') ? isQuakeSwarm(q) : null;
    if (swarm){
      rows.push(isRow('Earthquake swarm', swarm.count + ' in 7 days', isEsc(swarm.note)));
      sources.push('seismicity from USGS');
    } else if (q && q.features && q.features.length){
      const top = q.features.reduce((a, b) =>
        (b.properties.mag > a.properties.mag ? b : a), q.features[0]);
      rows.push(isRow('Seismic activity',
        q.features.length + (q.features.length === 1 ? ' tremor' : ' tremors') + ' in 7 days',
        'strongest M' + top.properties.mag + ' · '
          + isEsc(lkAgo(new Date(top.properties.time).toISOString()))
          + ' · within 150 km'));
      sources.push('seismicity from USGS');
    }
    draw();
  }

  /* --- is anything shut --- */
  if (typeof isLiveHolidays === 'function'){
    const hol = await isLiveHolidays();
    const now = (typeof isHolidayNow === 'function') ? isHolidayNow(hol) : null;
    if (now){
      rows.push(isRow('Public holiday', isEsc(now.name),
        now.when === 'today'
          ? 'today · shops and pools on reduced hours'
          : isEsc(lkDayName(now.when, tz)) + ' · coming up'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
