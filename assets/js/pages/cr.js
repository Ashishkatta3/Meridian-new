/* ===========================================================
   COSTA RICA — the pages

     #/costarica                 the country, its regions and the
                                 obvious places to start
     #/costarica/region/<CODE>   everything the atlas has in one region
     #/costarica/place/<id>      one place: what it is, what to do
                                 there, and what is true right now

   Built on the same markup and the same stylesheet as the US and
   Italian pages, so this reads as part of the site rather than a
   bolt-on. Where a class already exists for the job (pg, tr-card,
   st-card, pl-live, it-hero) it is reused rather than reinvented —
   including the Italian ones, which were never Italy-specific in
   anything but their prefix.

   The live panel is assembled row by row and each row is independent:
   a source that is slow, blocked or has nothing to say for this
   latitude drops its own row and the rest renders without it.
   =========================================================== */

function crEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

/* The place whose photo stands for a region: best known first. */
function crRegionFace(code){
  const ids = crRegionPlaces(code);
  return ids[0] || null;
}

/* ===========================================================
   #/costarica
   =========================================================== */
function renderCostaRica(){
  const total = CR_PLACE_IDS.length;
  const regions = CR_REGION_IDS.length;
  const top = CR_PLACE_IDS.slice()
    .sort((a, b) => (CR_PLACES[b][5] || 0) - (CR_PLACES[a][5] || 0))
    .slice(0, 12);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>Costa Rica</h1>'
    + '<p class="pg-sub">Nine regions, ' + total + ' places, two oceans four hours apart, '
    + 'and live weather, sea, sky and seismicity for every one of them. '
    + 'Pick a region, or start where everyone starts.</p>'
    + '<p class="pg-note">' + total + ' places &middot; ' + regions + ' regions '
    + '&middot; all times America/Costa_Rica &middot; no daylight saving</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => crCard(id, true)).join('')
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Every region</h2><div class="st-grid">'
    + CR_REGION_IDS.map(code => {
        const face = crRegionFace(code), n = crRegionPlaces(code).length;
        return '<a class="st-card" href="#/costarica/region/' + code + '">'
          + '<span class="st-card-ph"' + (face ? ' data-crphoto="' + face + '"' : '') + '></span>'
          + '<span class="st-card-tx"><b>' + crEsc(CR_REGIONS[code][0]) + '</b>'
          + '<i>' + n + (n === 1 ? ' place' : ' places') + '</i></span></a>';
      }).join('')
    + '</div></div>';

  return h + '</section>';
}

/* One place card, shared by the index and the region pages. */
function crCard(id, showRegion){
  const p = crPlaceGet(id);
  return '<a class="tr-card" href="#/costarica/place/' + id + '">'
    + '<span class="tr-card-ph" data-crphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + crEsc(showRegion ? CR_REGIONS[p.abbr][0] : crKindLabel(p.kind)) + '</i>'
    + '<b>' + crEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

function mountCostaRica(host){
  host.innerHTML = renderCostaRica();
  window.scrollTo(0, 0);
  crPaintPhotos(host);
}

/* ===========================================================
   #/costarica/region/<CODE>
   =========================================================== */
function renderCrRegion(code){
  const r = CR_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/costarica">&larr; Costa Rica</a>'
    + '<p>No such region.</p></section>';

  const ids = crRegionPlaces(code);
  const groups = {};
  ids.forEach(id => { const k = CR_PLACES[id][2]; (groups[k] = groups[k] || []).push(id); });
  const order = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  let h = '<section class="wrap pg"><a class="pl-back" href="#/costarica">&larr; Costa Rica</a>'
    + '<div class="pg-head"><div><span class="lab">Region</span><h1>' + crEsc(r[0]) + '</h1>'
    + (r[1] && r[1] !== r[0] ? '<p class="pg-note">' + crEsc(r[1]) + '</p>' : '')
    + '<p class="pg-sub">' + crEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + ' place' + (ids.length === 1 ? '' : 's') + ' in the atlas'
    + (CR_LANDLOCKED[code] ? '' : ' &middot; ' + (code === 'CAR' ? 'Caribbean' : 'Pacific') + ' coast')
    + '</p></div></div>';

  order.forEach(kind => {
    h += '<div class="pg-sec"><h2>' + crEsc(crKindLabel(kind)) + '</h2><div class="tr-grid">'
      + groups[kind].map(id => crCard(id, false)).join('')
      + '</div></div>';
  });
  return h + '</section>';
}

function mountCrRegion(host, code){
  host.innerHTML = renderCrRegion(code);
  window.scrollTo(0, 0);
  crPaintPhotos(host);
}

/* ===========================================================
   #/costarica/place/<id>
   =========================================================== */
function renderCrPlace(id){
  const p = crPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/costarica">&larr; Costa Rica</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof crGuide === 'function') ? crGuide(id) : null;
  const region = CR_REGIONS[p.abbr];

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/costarica/region/' + p.abbr + '">&larr; ' + crEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + crEsc(crKindLabel(p.kind)) + ' &middot; ' + crEsc(region[0]) + '</span>'
    + '<h1>' + crEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + crEsc(p.blurb) + '</p>'
    + '</div></div>';

  h += '<div class="it-hero" data-crphoto-big="' + id + '"></div>';

  const tags = (p.flags || []).concat(p.land || []);
  if (tags.length){
    h += '<div class="pg-sec"><div class="pg-chips">'
      + tags.map(t => '<span class="pg-chip">' + crEsc(crTagLabel(t)) + '</span>').join('')
      + '</div></div>';
  }

  h += '<div class="pg-sec"><div class="pl-live it-live" id="crLive">'
    + '<h3>Right now</h3><p class="it-live-wait">Checking conditions…</p></div></div>';

  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec"><h2>The place</h2><div class="it-prose">'
        + g.intro.map(x => '<p>' + crEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + crEsc(s.n) + '</b>'
            + (s.t ? '<i>' + crEsc(s.t) + '</i>' : '')
            + '<p>' + crEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    const practical = [['when','When to go'],['stay','How long'],['move','Getting there'],['eat','What to eat']]
      .filter(r => g[r[0]]);
    if (practical.length){
      h += '<div class="pg-sec"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + crEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  const near = crNearby(id, 6);
  if (near.length){
    h += '<div class="pg-sec"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => crCard(n.id, true)).join('')
      + '</div></div>';
  }

  return h + '</section>';
}

/* Straight-line neighbours, nearest first.

   Cocos Island is excluded from everybody's list and gets none of its
   own: it is five hundred kilometres offshore, so it is the "nearest"
   thing to nothing and nothing is near it. Letting it through would
   put a thirty-hour boat trip under the heading "Nearby". */
function crNearby(id, limit){
  const me = crPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  if (id === 'SPA-isla-del-coco') return [];
  return CR_PLACE_IDS.filter(o => o !== id && o !== 'SPA-isla-del-coco').map(oid => {
    const o = crPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

/* Tag labels come from the shared vocabulary where it has one, and
   from Costa Rica's own additions where it does not. */
function crTagLabel(t){
  if (typeof CR_FLAG !== 'undefined' && CR_FLAG[t]) return CR_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

function mountCrPlace(host, id){
  host.innerHTML = renderCrPlace(id);
  window.scrollTo(0, 0);
  crPaintPhotos(host);
  const p = crPlaceGet(id);
  if (p) wireCrLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS
   =========================================================== */
function crPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-crphoto]').forEach(el => {
    const p = crPlaceGet(el.dataset.crphoto);
    if (!p) { el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    });
  });

  host.querySelectorAll('[data-crphoto-big]').forEach(el => {
    const p = crPlaceGet(el.dataset.crphotoBig);
    if (!p) return;
    const box = el.getBoundingClientRect();
    const want = Math.max(320, Math.min(1600, Math.round(box.width || 900)));
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, want, img => {
        img.alt = p.name;
        img.className = 'ph-img';
        img.decoding = 'async';
        el.innerHTML = '';
        el.appendChild(img);
        el.classList.add('has-photo');
        if (ph.page){
          const a = document.createElement('a');
          a.className = 'it-hero-credit';
          a.href = ph.page; a.target = '_blank'; a.rel = 'noopener';
          a.textContent = ph.by ? ph.by : 'Wikipedia';
          el.appendChild(a);
        }
      }, () => el.classList.add('is-empty'));
    });
  });
}

/* ===========================================================
   THE LIVE PANEL
   =========================================================== */
function crRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireCrLive(host, p){
  const panel = host.querySelector('#crLive');
  if (!panel) return;

  const rows = [];
  const sources = [];
  const draw = () => {
    if (!document.body.contains(panel)) return;           /* navigated away */
    panel.innerHTML = '<h3>Right now</h3>'
      + (rows.length ? rows.join('')
         : '<p class="it-live-wait">Nothing is answering for this place right now.</p>')
      + (sources.length ? '<p class="pl-live-src">' + sources.join(' &middot; ') + '</p>' : '');
  };

  /* --- the clock, which needs nothing --- */
  const clock = (typeof crLocalTime === 'function') ? crLocalTime() : null;
  if (clock){
    let sub = clock.date;
    if (clock.diff !== null && clock.diff !== 0){
      sub += ' · ' + Math.abs(clock.diff) + 'h ' + (clock.diff > 0 ? 'ahead of' : 'behind') + ' you';
    } else if (clock.diff === 0){
      sub += ' · same time as you';
    }
    rows.push(crRow('Local time', crEsc(clock.time) + ' <small>' + crEsc(clock.zone) + '</small>', crEsc(sub)));
    draw();
  }

  /* --- the season, which also needs nothing, and which is the single
         most useful line on the page for anyone still deciding --- */
  if (typeof crSeason === 'function'){
    const s = crSeason(p);
    if (s) rows.push(crRow('Season', crEsc(s.name), crEsc(s.note)));
    draw();
  }

  if (typeof crLiveWeather !== 'function') return;

  const [wx, sea, air] = await Promise.all([
    crLiveWeather(p),
    (typeof crLiveSea === 'function') ? crLiveSea(p) : null,
    (typeof crLiveAir === 'function') ? crLiveAir(p) : null
  ]);

  if (wx){
    const word = crWeatherWord(wx.code);
    rows.push(crRow('Weather', wx.temp + '°C',
      [word, wx.feels !== wx.temp ? 'feels ' + wx.feels + '°' : '',
       wx.humidity != null ? wx.humidity + '% humidity' : '',
       wx.pressure ? wx.pressure + ' hPa' : ''].filter(Boolean).map(crEsc).join(' · ')));

    const bf = crBeaufort(wx.wind);
    rows.push(crRow('Wind',
      Math.round(wx.wind) + ' km/h ' + crCompass(wx.windDir),
      [bf ? 'force ' + bf.force + ' · ' + bf.word : '',
       wx.gust ? 'gusting ' + Math.round(wx.gust) : ''].filter(Boolean).map(crEsc).join(' · ')));

    /* UV gets its own row here, which it does not in Italy. Ten
       degrees off the equator it is the thing most likely to actually
       hurt somebody on a day out. */
    if (wx.uv != null && typeof crUvWord === 'function'){
      rows.push(crRow('UV index', wx.uv + ' · ' + crUvWord(wx.uv), crEsc(crUvAdvice(wx.uv))));
    }

    /* When the rain arrives, read off the hourly series rather than
       repeating the "clear mornings, wet afternoons" cliché, which is
       true on the Pacific and wrong on the Caribbean. */
    if (typeof crRainWindow === 'function'){
      const rw = crRainWindow(wx);
      if (rw && rw.peak >= 30){
        rows.push(crRow('Rain today', rw.peak + '% at its likeliest',
          rw.firstWet != null
            ? 'first likely from about ' + String(rw.firstWet).padStart(2, '0') + ':00'
            : 'nothing likely before tonight'));
      }
    }

    if (wx.days && wx.days.length > 1){
      rows.push('<div class="pl-fc">' + wx.days.slice(1, 6).map(d =>
        '<span><i>' + crEsc(crDayName(d.date)) + '</i>'
        + '<b>' + (d.max == null ? '' : d.max + '°') + '</b>'
        + '<em>' + crEsc(crWeatherWord(d.code) || '')
        + (d.rain ? ' ' + d.rain + '%' : '') + '</em></span>').join('') + '</div>');
    }
    sources.push('Weather from Open-Meteo');
  }

  if (sea){
    /* Which ocean, stated outright. On a country four hours wide the
       same wave height means different things on the two sides. */
    const oc = sea.ocean ? sea.ocean + ' side' : '';
    if (sea.sst != null){
      rows.push(crRow('Sea temperature', Math.round(sea.sst * 10) / 10 + '°C',
        [oc, sea.sst >= 28 ? 'bath-warm' : sea.sst >= 26 ? 'warm'
           : sea.sst >= 24 ? 'pleasant' : 'cool for here'].filter(Boolean).map(crEsc).join(' · ')));
    }
    if (sea.waveH != null){
      rows.push(crRow('Sea state', crSeaState(sea.waveH) + ' · ' + sea.waveH.toFixed(1) + ' m',
        [sea.waveDir != null ? 'from ' + crCompass(sea.waveDir) : '',
         sea.wavePeriod ? sea.wavePeriod.toFixed(0) + 's period' : '',
         sea.maxToday != null ? 'up to ' + sea.maxToday.toFixed(1) + ' m today' : ''
        ].filter(Boolean).map(crEsc).join(' · ')));
    }
    if (sea.swellH != null && sea.swellH > 0){
      rows.push(crRow('Swell', sea.swellH.toFixed(1) + ' m',
        [sea.swellPeriod ? sea.swellPeriod.toFixed(0) + 's between crests' : '',
         /* Long-period swell is what surfers are actually waiting for,
            and the number alone does not say so. */
         sea.swellPeriod >= 14 ? 'long groundswell — the good stuff'
           : sea.swellPeriod >= 11 ? 'decent groundswell' : ''
        ].filter(Boolean).map(crEsc).join(' · ')));
    }
    if (sea.currentSpeed != null && sea.currentSpeed >= 0.25){
      const kmh = sea.currentSpeed;
      rows.push(crRow('Current', kmh.toFixed(1) + ' km/h'
        + (sea.currentDir != null ? ' towards ' + crCompass(sea.currentDir) : ''),
        kmh >= 3 ? 'strong — stay inshore' : kmh >= 1.5 ? 'noticeable when swimming' : 'gentle'));
    }
    sources.push('sea from Open-Meteo Marine');
  }

  if (air){
    rows.push(crRow('Air quality', air.aqi + ' · ' + crAirWord(air.aqi),
      [air.pm25 != null ? 'PM2.5 ' + air.pm25 : '',
       air.pm10 != null ? 'PM10 ' + air.pm10 : ''].filter(Boolean).join(' · ')
       + ' µg/m³ · US index'));
    sources.push('air from Open-Meteo');
  }
  draw();

  /* --- sun and sky --- */
  if (typeof crLiveSky === 'function'){
    const sky = await crLiveSky(p);
    if (sky){
      if (sky.sunrise || sky.sunset){
        rows.push(crRow('Sun',
          (sky.sunrise ? 'up ' + crClock(sky.sunrise) : '')
          + (sky.sunset ? ' · down ' + crClock(sky.sunset) : ''),
          sky.fullDark ? 'fully dark from ' + crClock(sky.fullDark) + ' — twilight is short this close to the equator'
                       : 'no full darkness tonight'));
      }
      rows.push(crRow('Moon', sky.moonName, sky.moonLit + '% lit'));
      if (sky.score !== null && sky.score !== undefined){
        const w = sky.score >= 8 ? 'excellent' : sky.score >= 6 ? 'good'
                : sky.score >= 4 ? 'fair' : sky.score >= 2 ? 'poor' : 'not tonight';
        rows.push(crRow('Stars tonight', sky.score + '/10 · ' + w,
          (sky.cloud != null ? sky.cloud + '% cloud · ' : '')
          + 'ground is ' + crEsc(sky.darkness.word) + ' (estimated)'));
      }
      draw();
    }
  }

  /* --- the ground --- */
  if (typeof crLiveSeismic === 'function'){
    const q = await crLiveSeismic(p);
    if (q && q.count){
      rows.push(crRow('Seismic activity',
        q.count + (q.count === 1 ? ' tremor' : ' tremors') + ' in 7 days',
        q.top ? 'strongest M' + q.top.mag + ' · ' + crAgo(q.top.when)
              + (q.top.depth != null ? ' · ' + Math.round(q.top.depth) + ' km down' : '') : ''));
      sources.push('seismicity from USGS');
      draw();
    }
  }

  /* --- is the country about to shut --- */
  if (typeof crHolidayNow === 'function'){
    const hol = await crHolidayNow(4);
    if (hol && hol.length){
      rows.push(crRow('Public holiday',
        crEsc(hol[0].name),
        crEsc(hol[0].en !== hol[0].name ? hol[0].en + ' · ' : '')
        + crDayName(hol[0].date) + ' — expect closures'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
