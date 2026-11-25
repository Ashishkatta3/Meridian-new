/* ===========================================================
   ITALY — the pages

     #/italy                  the country, its regions and the obvious
                              places to start
     #/italy/region/<CODE>    everything the atlas has in one region
     #/italy/place/<id>       one place: what it is, what to do there,
                              and what is true about it right now

   Built on the same markup and the same stylesheet as the US pages,
   so this reads as part of the site rather than a bolt-on. Where a
   class already exists for the job (pg, tr-card, st-card, pl-live) it
   is reused rather than reinvented.

   The live panel is the reason this section exists in the form it
   does. It is assembled row by row and each row is independent: a
   source that is slow, blocked or simply has nothing to say for this
   latitude drops its own row and the rest of the panel renders
   without it. Nothing here can leave the page half-built.
   =========================================================== */

function itEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

/* The place whose photo stands for a region: best known, and
   preferring one we actually hold a picture for. Same rule the US
   state cards use, so the two grids look alike. */
function itRegionFace(code){
  const ids = itRegionPlaces(code);
  const withPhoto = ids.filter(id => (typeof photoLocal === 'function') && photoLocal(id));
  return (withPhoto.length ? withPhoto : ids)[0] || null;
}

/* ===========================================================
   #/italy
   =========================================================== */
function renderItaly(){
  const total = IT_PLACE_IDS.length;
  const top = IT_PLACE_IDS.slice()
    .sort((a, b) => (IT_PLACES[b][5] || 0) - (IT_PLACES[a][5] || 0))
    .slice(0, 12);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>Italy</h1>'
    + '<p class="pg-sub">Twenty regions, ' + total + ' places, and live weather, sea and sky '
    + 'for every one of them. Pick a region, or start with the places everyone starts with.</p>'
    + '<p class="pg-note">' + total + ' places &middot; 20 regions &middot; all times Europe/Rome</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => itCard(id, true)).join('')
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Every region</h2><div class="st-grid">'
    + IT_REGION_IDS.map(code => {
        const face = itRegionFace(code), n = itRegionPlaces(code).length;
        return '<a class="st-card" href="#/italy/region/' + code + '">'
          + '<span class="st-card-ph"' + (face ? ' data-itphoto="' + face + '"' : '') + '></span>'
          + '<span class="st-card-tx"><b>' + itEsc(IT_REGIONS[code][0]) + '</b>'
          + '<i>' + n + (n === 1 ? ' place' : ' places') + '</i></span></a>';
      }).join('')
    + '</div></div>';

  return h + '</section>';
}

/* One place card, shared by the index and the region pages. */
function itCard(id, showRegion){
  const p = itPlaceGet(id);
  return '<a class="tr-card" href="#/italy/place/' + id + '">'
    + '<span class="tr-card-ph" data-itphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + itEsc(showRegion ? IT_REGIONS[p.abbr][0] : itKindLabel(p.kind)) + '</i>'
    + '<b>' + itEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

function mountItaly(host){
  /* A place page is the likely next click; start the guide
     fetch now so it overlaps with reading this one. */
  if (typeof guideWarm === 'function') guideWarm('IT');
  host.innerHTML = renderItaly();
  window.scrollTo(0, 0);
  itPaintPhotos(host);
}

/* ===========================================================
   #/italy/region/<CODE>
   =========================================================== */
function renderItRegion(code){
  const r = IT_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/italy">&larr; Italy</a>'
    + '<p>No such region.</p></section>';

  const ids = itRegionPlaces(code);
  const groups = {};
  ids.forEach(id => { const k = IT_PLACES[id][2]; (groups[k] = groups[k] || []).push(id); });
  const order = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  let h = '<section class="wrap pg"><a class="pl-back" href="#/italy">&larr; Italy</a>'
    + '<div class="pg-head"><div><span class="lab">Region</span><h1>' + itEsc(r[0]) + '</h1>'
    + (r[1] && r[1] !== r[0] ? '<p class="pg-note">' + itEsc(r[1]) + '</p>' : '')
    + '<p class="pg-sub">' + itEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + ' place' + (ids.length === 1 ? '' : 's') + ' in the atlas</p>'
    + '</div></div>';

  order.forEach(kind => {
    h += '<div class="pg-sec"><h2>' + itEsc(itKindLabel(kind)) + '</h2><div class="tr-grid">'
      + groups[kind].map(id => itCard(id, false)).join('')
      + '</div></div>';
  });
  return h + '</section>';
}

function mountItRegion(host, code){
  /* A place page is the likely next click; start the guide
     fetch now so it overlaps with reading this one. */
  if (typeof guideWarm === 'function') guideWarm('IT');
  host.innerHTML = renderItRegion(code);
  window.scrollTo(0, 0);
  itPaintPhotos(host);
}

/* ===========================================================
   #/italy/place/<id>
   =========================================================== */
function renderItPlace(id){
  const p = itPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/italy">&larr; Italy</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof itGuide === 'function') ? itGuide(id) : null;
  const region = IT_REGIONS[p.abbr];

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/italy/region/' + p.abbr + '">&larr; ' + itEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + itEsc(itKindLabel(p.kind)) + ' &middot; ' + itEsc(region[0]) + '</span>'
    + '<h1>' + itEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + itEsc(p.blurb) + '</p>'
    + '</div></div>';

  /* the photograph */
  h += '<div class="it-hero" data-itphoto-big="' + id + '"></div>';

  /* tags, so a place says what it is without a paragraph about it */
  h += pvChips(p, itTagLabel);

  /* LIVE — filled in by wireItLive once the requests answer */
  /* The jump bar lists only the sections this page actually has. */
  const near = itNearby(id, 6);
  const practical = g ? [['when','When to go'],['stay','How long'],
                         ['move','Getting around'],['eat','What to eat']]
                        .filter(r => g[r[0]]) : [];
  const sections = [{ id: 'it-now', label: 'Right now' }];
  if (g && g.intro && g.intro.length) sections.push({ id: 'it-place', label: 'The place' });
  if (g && g.see && g.see.length)     sections.push({ id: 'it-do',    label: 'What to do' });
  if (practical.length)               sections.push({ id: 'it-prac',  label: 'Practical' });
  if (near.length)                    sections.push({ id: 'it-near',  label: 'Nearby' });
  h += pvJumpNav(sections);

  h += pvColumnsOpen();
  /* Written before the main column so that on a phone, where the
     grid collapses to one column, the live panel lands under the
     photo rather than below four screens of prose. The CSS puts it
     back on the right at desktop widths. */
  h += '<div id="it-now" class="pv-anchor">' + pvAside('itLive') + '</div>';
  h += pvMainOpen();

  /* the written guide, when there is one for this place */
  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec pv-anchor" id="it-place"><h2>The place</h2><div class="it-prose">'
        + g.intro.map(x => '<p>' + itEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec pv-anchor" id="it-do"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + itEsc(s.n) + '</b>'
            + (s.t ? '<i>' + itEsc(s.t) + '</i>' : '')
            + '<p>' + itEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    if (practical.length){
      h += '<div class="pg-sec pv-anchor" id="it-prac"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + itEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  /* what else is close, which is how an itinerary actually gets built */
  if (near.length){
    h += '<div class="pg-sec pv-anchor" id="it-near"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => itCard(n.id, true)).join('')
      + '</div></div>';
  }

  h += pvMainClose();
  h += pvColumnsClose();
  return h + '</section>';
}

/* Straight-line neighbours, nearest first. Uses the haversine already
   in geo.js rather than carrying a second copy. */
function itNearby(id, limit){
  const me = itPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  return IT_PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = itPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

/* Tag labels come from the shared vocabulary where it has one, and
   from Italy's own additions where it does not. */
function itTagLabel(t){
  if (typeof IT_FLAG !== 'undefined' && IT_FLAG[t]) return IT_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

/* See the note in pages/in.js: the guide file is fetched on demand,
   awaited once, then cached for the rest of the session. */
async function mountItPlace(host, id){
  if (typeof guideReady === 'function') await guideReady('IT');
  host.innerHTML = renderItPlace(id);
  window.scrollTo(0, 0);
  itPaintPhotos(host);
  if (typeof pvWire === 'function') pvWire(host);
  if (typeof pvWatchSections === 'function') pvWatchSections(host);
  const p = itPlaceGet(id);
  if (p) wireItLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS

   Italian places go through the same placePhoto/loadImage path as the
   US ones. Two attributes rather than one because a card wants a
   background and the hero wants a real <img> that can be sized.
   =========================================================== */
function itPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-itphoto]').forEach(el => {
    const p = itPlaceGet(el.dataset.itphoto);
    if (!p) { el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    });
  });

  host.querySelectorAll('[data-itphoto-big]').forEach(el => {
    const p = itPlaceGet(el.dataset.itphotoBig);
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

   Assembled in three waves so the page fills in from the top rather
   than sitting blank until the slowest source answers: the clock is
   instant, the weather and sea come together, and the sky waits on
   the forecast it shares.
   =========================================================== */
function itRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireItLive(host, p){
  const panel = host.querySelector('#itLive');
  if (!panel) return;

  const rows = [];
  const sources = [];
  const draw = () => {
    if (!document.body.contains(panel)) return;           /* navigated away */
    panel.innerHTML = (typeof pvLiveBody === 'function')
      ? pvLiveBody(rows, sources)
      : '<h3>Right now</h3>' + rows.join('');
    if (typeof pvRestoreMore === 'function') pvRestoreMore(panel);
  };

  /* --- the clock, which needs nothing --- */
  const clock = (typeof itLocalTime === 'function') ? itLocalTime() : null;
  if (clock){
    let sub = clock.date;
    if (clock.diff !== null && clock.diff !== 0){
      sub += ' · ' + Math.abs(clock.diff) + 'h ' + (clock.diff > 0 ? 'ahead of' : 'behind') + ' you';
    } else if (clock.diff === 0){
      sub += ' · same time as you';
    }
    rows.push(itRow('Local time', itEsc(clock.time) + ' <small>' + itEsc(clock.zone) + '</small>', itEsc(sub)));
    draw();
  }

  if (typeof itLiveWeather !== 'function') return;

  /* --- weather, sea and air together --- */
  const [wx, sea, air] = await Promise.all([
    itLiveWeather(p),
    (typeof itLiveSea === 'function') ? itLiveSea(p) : null,
    (typeof itLiveAir === 'function') ? itLiveAir(p) : null
  ]);

  if (wx){
    const word = itWeatherWord(wx.code);
    rows.push(itRow('Weather', wx.temp + '°C',
      [word, wx.feels !== wx.temp ? 'feels ' + wx.feels + '°' : '',
       wx.humidity != null ? wx.humidity + '% humidity' : '',
       wx.pressure ? wx.pressure + ' hPa' : ''].filter(Boolean).map(itEsc).join(' · ')));

    const bf = itBeaufort(wx.wind);
    rows.push(itRow('Wind',
      Math.round(wx.wind) + ' km/h ' + itCompass(wx.windDir),
      [bf ? 'force ' + bf.force + ' · ' + bf.word : '',
       wx.gust ? 'gusting ' + Math.round(wx.gust) : ''].filter(Boolean).map(itEsc).join(' · ')));

    if (wx.days && wx.days.length > 1){
      rows.push('<div class="pl-fc">' + wx.days.slice(1, 6).map(d =>
        '<span><i>' + itEsc(itDayName(d.date)) + '</i>'
        + '<b>' + (d.max == null ? '' : d.max + '°') + '</b>'
        + '<em>' + itEsc(itWeatherWord(d.code) || '')
        + (d.rain ? ' ' + d.rain + '%' : '') + '</em></span>').join('') + '</div>');
    }
    sources.push('Weather from Open-Meteo');
  }

  if (sea){
    if (sea.sst != null){
      rows.push(itRow('Sea temperature', Math.round(sea.sst * 10) / 10 + '°C',
        sea.sst >= 24 ? 'warm' : sea.sst >= 20 ? 'swimmable' : sea.sst >= 16 ? 'bracing' : 'cold'));
    }
    if (sea.waveH != null){
      rows.push(itRow('Sea state', itSeaState(sea.waveH) + ' · ' + sea.waveH.toFixed(1) + ' m',
        [sea.waveDir != null ? 'from ' + itCompass(sea.waveDir) : '',
         sea.wavePeriod ? sea.wavePeriod.toFixed(0) + 's period' : '',
         sea.maxToday != null ? 'up to ' + sea.maxToday.toFixed(1) + ' m today' : ''
        ].filter(Boolean).map(itEsc).join(' · ')));
    }
    if (sea.swellH != null && sea.swellH > 0){
      rows.push(itRow('Swell', sea.swellH.toFixed(1) + ' m',
        sea.swellPeriod ? sea.swellPeriod.toFixed(0) + 's between crests' : ''));
    }
    if (sea.currentSpeed != null){
      /* A current is only worth a line when it would actually push a
         swimmer about. Below a quarter of a km/h it would not. */
      const kmh = sea.currentSpeed;
      if (kmh >= 0.25){
        rows.push(itRow('Current', kmh.toFixed(1) + ' km/h'
          + (sea.currentDir != null ? ' towards ' + itCompass(sea.currentDir) : ''),
          kmh >= 3 ? 'strong — stay inshore' : kmh >= 1.5 ? 'noticeable when swimming' : 'gentle'));
      }
    }
    sources.push('sea from Open-Meteo Marine');
  }

  if (air){
    rows.push(itRow('Air quality', air.aqi + ' · ' + itAirWord(air.aqi),
      [air.pm25 != null ? 'PM2.5 ' + air.pm25 : '',
       air.pm10 != null ? 'PM10 ' + air.pm10 : ''].filter(Boolean).join(' · ')
       + ' µg/m³ · European index'));
    sources.push('air from Open-Meteo');
  }
  draw();

  /* --- sun and sky --- */
  if (typeof itLiveSky === 'function'){
    const sky = await itLiveSky(p);
    if (sky){
      if (sky.sunrise || sky.sunset){
        rows.push(itRow('Sun',
          (sky.sunrise ? 'up ' + itClock(sky.sunrise) : '')
          + (sky.sunset ? ' · down ' + itClock(sky.sunset) : ''),
          sky.fullDark ? 'fully dark from ' + itClock(sky.fullDark) : 'no full darkness tonight'));
      }
      rows.push(itRow('Moon', sky.moonName, sky.moonLit + '% lit'));
      if (sky.score !== null && sky.score !== undefined){
        const w = sky.score >= 8 ? 'excellent' : sky.score >= 6 ? 'good'
                : sky.score >= 4 ? 'fair' : sky.score >= 2 ? 'poor' : 'not tonight';
        rows.push(itRow('Stars tonight', sky.score + '/10 · ' + w,
          (sky.cloud != null ? sky.cloud + '% cloud · ' : '')
          + 'ground is ' + itEsc(sky.darkness.word) + ' (estimated)'));
      }
      draw();
    }
  }

  /* --- the ground, where the ground is news --- */
  if (typeof itLiveSeismic === 'function'){
    const q = await itLiveSeismic(p);
    if (q && q.count){
      rows.push(itRow('Seismic activity',
        q.count + (q.count === 1 ? ' tremor' : ' tremors') + ' in 7 days',
        q.top ? 'strongest M' + q.top.mag + ' · ' + itAgo(q.top.when)
              + (q.top.depth != null ? ' · ' + Math.round(q.top.depth) + ' km down' : '') : ''));
      sources.push('seismicity from USGS');
      draw();
    }
  }

  /* --- is the country about to shut --- */
  if (typeof itHolidayNow === 'function'){
    const hol = await itHolidayNow(4);
    if (hol && hol.length){
      rows.push(itRow('Public holiday',
        itEsc(hol[0].name),
        itEsc(hol[0].en !== hol[0].name ? hol[0].en + ' · ' : '')
        + itDayName(hol[0].date) + ' — expect closures'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
