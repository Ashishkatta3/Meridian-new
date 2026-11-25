/* ===========================================================
   INDIA — the pages

     #/india                 the country, its states and the obvious
                             places to start
     #/india/region/<CODE>   everything the atlas has in one state
     #/india/place/<id>      one place: what it is, what to do there,
                             and what is true about it right now

   Built on the same markup and stylesheet as the US, Italian and
   Costa Rican pages. The live panel is assembled row by row and each
   row is independent: a source that is slow, blocked or has nothing
   to say for this latitude drops its own row and the rest renders.

   The one structural difference from the smaller countries: with
   thirty-four regions and three hundred places, the index groups the
   states rather than listing them flat, because a single grid of
   thirty-four cards is a wall rather than a menu.
   =========================================================== */

function inEsc(s){
  return (s == null ? '' : String(s)).replace(/[&<>"]/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
}

function inRegionFace(code){
  const ids = inRegionPlaces(code);
  return ids[0] || null;
}

/* The states, grouped the way people actually carve up the country.
   Every region code appears exactly once; the test suite checks it. */
const IN_GROUPS = [
  ['The Himalaya',        ['LAD','JKA','HPR','UTK','SIK','ARP']],
  ['The north & the plains', ['DEL','UTP','RAJ','PUN','HAR','BIH','MPR','CHH','JHA']],
  ['The west',            ['GUJ','MAH','GOA']],
  ['The south',           ['KAR','KER','TND','PUD','APR','TEL']],
  ['The east',            ['ODI','WBG']],
  ['The Northeast',       ['ASM','MEG','NAG','MNP','MIZ','TRI']],
  ['The islands',         ['AND','LAK']]
];

/* ===========================================================
   #/india
   =========================================================== */
function renderIndia(){
  const total = IN_PLACE_IDS.length;
  const regions = IN_REGION_IDS.length;
  const top = IN_PLACE_IDS.slice()
    .sort((a, b) => (IN_PLACES[b][5] || 0) - (IN_PLACES[a][5] || 0))
    .slice(0, 16);

  let h = '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>India</h1>'
    + '<p class="pg-sub">' + regions + ' states and territories, ' + total + ' places, '
    + 'three seas, the Himalaya and a monsoon that decides everything — '
    + 'with live weather, air, sea and sky for every one of them.</p>'
    + '<p class="pg-note">' + total + ' places &middot; ' + regions + ' regions '
    + '&middot; all times Asia/Kolkata (UTC+5:30)</p>'
    + '</div></div>';

  h += '<div class="pg-sec"><h2>Start here</h2><div class="tr-grid">'
    + top.map(id => inCard(id, true)).join('')
    + '</div></div>';

  IN_GROUPS.forEach(([label, codes]) => {
    const present = codes.filter(c => IN_REGIONS[c]);
    if (!present.length) return;
    h += '<div class="pg-sec"><h2>' + inEsc(label) + '</h2><div class="st-grid">'
      + present.map(code => {
          const face = inRegionFace(code), n = inRegionPlaces(code).length;
          return '<a class="st-card" href="#/india/region/' + code + '">'
            + '<span class="st-card-ph"' + (face ? ' data-inphoto="' + face + '"' : '') + '></span>'
            + '<span class="st-card-tx"><b>' + inEsc(IN_REGIONS[code][0]) + '</b>'
            + '<i>' + n + (n === 1 ? ' place' : ' places') + '</i></span></a>';
        }).join('')
      + '</div></div>';
  });

  return h + '</section>';
}

function inCard(id, showRegion){
  const p = inPlaceGet(id);
  return '<a class="tr-card" href="#/india/place/' + id + '">'
    + '<span class="tr-card-ph" data-inphoto="' + id + '"></span>'
    + '<span class="tr-card-tx">'
    + '<i>' + inEsc(showRegion ? IN_REGIONS[p.abbr][0] : inKindLabel(p.kind)) + '</i>'
    + '<b>' + inEsc(p.name) + '</b>'
    + '<em title="How well known">' + (p.prom || 1) + '/10</em></span></a>';
}

function mountIndia(host){
  /* A place page is the likely next click; start the guide
     fetch now so it overlaps with reading this one. */
  if (typeof guideWarm === 'function') guideWarm('IN');
  host.innerHTML = renderIndia();
  window.scrollTo(0, 0);
  inPaintPhotos(host);
}

/* ===========================================================
   #/india/region/<CODE>
   =========================================================== */
function renderInRegion(code){
  const r = IN_REGIONS[code];
  if (!r) return '<section class="wrap pg"><a class="pl-back" href="#/india">&larr; India</a>'
    + '<p>No such region.</p></section>';

  const ids = inRegionPlaces(code);
  const groups = {};
  ids.forEach(id => { const k = IN_PLACES[id][2]; (groups[k] = groups[k] || []).push(id); });
  const order = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  let h = '<section class="wrap pg"><a class="pl-back" href="#/india">&larr; India</a>'
    + '<div class="pg-head"><div><span class="lab">State</span><h1>' + inEsc(r[0]) + '</h1>'
    + (r[1] && r[1] !== r[0] ? '<p class="pg-note">' + inEsc(r[1]) + '</p>' : '')
    + '<p class="pg-sub">' + inEsc(r[3]) + '</p>'
    + '<p class="pg-note">' + ids.length + ' place' + (ids.length === 1 ? '' : 's') + ' in the atlas'
    + (IN_LANDLOCKED[code] ? '' : ' &middot; coastal')
    + '</p></div></div>';

  order.forEach(kind => {
    h += '<div class="pg-sec"><h2>' + inEsc(inKindLabel(kind)) + '</h2><div class="tr-grid">'
      + groups[kind].map(id => inCard(id, false)).join('')
      + '</div></div>';
  });
  return h + '</section>';
}

function mountInRegion(host, code){
  /* A place page is the likely next click; start the guide
     fetch now so it overlaps with reading this one. */
  if (typeof guideWarm === 'function') guideWarm('IN');
  host.innerHTML = renderInRegion(code);
  window.scrollTo(0, 0);
  inPaintPhotos(host);
}

/* ===========================================================
   #/india/place/<id>
   =========================================================== */
function renderInPlace(id){
  const p = inPlaceGet(id);
  if (!p) return '<section class="wrap pg"><a class="pl-back" href="#/india">&larr; India</a>'
    + '<p>No such place.</p></section>';

  const g = (typeof inGuide === 'function') ? inGuide(id) : null;
  const region = IN_REGIONS[p.abbr];

  let h = '<section class="wrap pg">'
    + '<a class="pl-back" href="#/india/region/' + p.abbr + '">&larr; ' + inEsc(region[0]) + '</a>'
    + '<div class="pg-head"><div>'
    + '<span class="lab">' + inEsc(inKindLabel(p.kind)) + ' &middot; ' + inEsc(region[0]) + '</span>'
    + '<h1>' + inEsc(p.name) + '</h1>'
    + '<p class="pg-sub">' + inEsc(p.blurb) + '</p>'
    + '</div></div>';

  h += '<div class="it-hero" data-inphoto-big="' + id + '"></div>';

  h += pvChips(p, inTagLabel);

  /* The jump bar lists only the sections this page actually has. */
  const near = inNearby(id, 6);
  const practical = g ? [['when','When to go'],['stay','How long'],
                         ['move','Getting there'],['eat','What to eat']]
                        .filter(r => g[r[0]]) : [];
  const sections = [{ id: 'in-now', label: 'Right now' }];
  if (g && g.intro && g.intro.length) sections.push({ id: 'in-place', label: 'The place' });
  if (g && g.see && g.see.length)     sections.push({ id: 'in-do',    label: 'What to do' });
  if (practical.length)               sections.push({ id: 'in-prac',  label: 'Practical' });
  if (near.length)                    sections.push({ id: 'in-near',  label: 'Nearby' });
  h += pvJumpNav(sections);

  h += pvColumnsOpen();
  /* Written before the main column so that on a phone, where the
     grid collapses to one column, the live panel lands under the
     photo rather than below four screens of prose. The CSS puts it
     back on the right at desktop widths. */
  h += '<div id="in-now" class="pv-anchor">' + pvAside('inLive') + '</div>';
  h += pvMainOpen();

  if (g){
    if (g.intro && g.intro.length){
      h += '<div class="pg-sec pv-anchor" id="in-place"><h2>The place</h2><div class="it-prose">'
        + g.intro.map(x => '<p>' + inEsc(x) + '</p>').join('') + '</div></div>';
    }
    if (g.see && g.see.length){
      h += '<div class="pg-sec pv-anchor" id="in-do"><h2>What to do</h2><ol class="it-todo">'
        + g.see.map(s => '<li><b>' + inEsc(s.n) + '</b>'
            + (s.t ? '<i>' + inEsc(s.t) + '</i>' : '')
            + '<p>' + inEsc(s.d) + '</p></li>').join('')
        + '</ol></div>';
    }
    if (practical.length){
      h += '<div class="pg-sec pv-anchor" id="in-prac"><h2>Practical</h2><dl class="it-prac">'
        + practical.map(r => '<div><dt>' + r[1] + '</dt><dd>' + inEsc(g[r[0]]) + '</dd></div>').join('')
        + '</dl></div>';
    }
  }

  if (near.length){
    h += '<div class="pg-sec pv-anchor" id="in-near"><h2>Nearby</h2><div class="tr-grid">'
      + near.map(n => inCard(n.id, true)).join('')
      + '</div></div>';
  }

  h += pvMainClose();
  h += pvColumnsClose();
  return h + '</section>';
}

/* Straight-line neighbours, nearest first.

   Capped at six hundred kilometres. In a country this size the
   nearest other place to Diglipur in the Andamans is a thousand
   kilometres of open sea away, and calling that "nearby" would be
   actively misleading to somebody planning a route. */
function inNearby(id, limit){
  const me = inPlaceGet(id);
  if (!me || typeof haversine !== 'function') return [];
  return IN_PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = inPlaceGet(oid);
    return { id: oid, km: haversine(me.lat, me.lon, o.lat, o.lon) * 1.609 };
  }).filter(x => x.km <= 600)
    .sort((a, b) => a.km - b.km).slice(0, limit || 6);
}

function inTagLabel(t){
  if (typeof IN_FLAG !== 'undefined' && IN_FLAG[t]) return IN_FLAG[t][0];
  if (typeof tagLabel === 'function') return tagLabel(t);
  return t;
}

/* The written guide lives in a separate half-megabyte file that is
   fetched on first use rather than shipped in index.html. Wait for
   it before the first paint so the page does not visibly reflow
   when the prose arrives; after that it is already in memory and
   this resolves immediately. If the fetch fails the page still
   renders, minus the guide sections. */
async function mountInPlace(host, id){
  if (typeof guideReady === 'function') await guideReady('IN');
  host.innerHTML = renderInPlace(id);
  window.scrollTo(0, 0);
  inPaintPhotos(host);
  if (typeof pvWire === 'function') pvWire(host);
  if (typeof pvWatchSections === 'function') pvWatchSections(host);
  const p = inPlaceGet(id);
  if (p) wireInLive(host, p);
}

/* ===========================================================
   PHOTOGRAPHS
   =========================================================== */
function inPaintPhotos(host){
  if (typeof placePhoto !== 'function') return;

  host.querySelectorAll('[data-inphoto]').forEach(el => {
    const p = inPlaceGet(el.dataset.inphoto);
    if (!p) { el.classList.add('is-empty'); return; }
    placePhoto(p).then(ph => {
      if (!ph || !ph.src){ el.classList.add('is-empty'); return; }
      loadImage(ph.thumb || ph.src, 320,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => el.classList.add('is-empty'));
    });
  });

  host.querySelectorAll('[data-inphoto-big]').forEach(el => {
    const p = inPlaceGet(el.dataset.inphotoBig);
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
function inRow(label, value, sub){
  return '<div class="pl-lv"><span class="pl-lv-k">' + label + '</span>'
    + '<span class="pl-lv-v">' + value + '</span>'
    + (sub ? '<span class="pl-lv-s">' + sub + '</span>' : '') + '</div>';
}

async function wireInLive(host, p){
  const panel = host.querySelector('#inLive');
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
  const clock = (typeof inLocalTime === 'function') ? inLocalTime() : null;
  if (clock){
    const off = (typeof inOffsetWords === 'function') ? inOffsetWords(clock.diffMin) : '';
    rows.push(inRow('Local time',
      inEsc(clock.time) + ' <small>' + inEsc(clock.zone) + '</small>',
      inEsc(clock.date + (off ? ' · ' + off : ''))));
    draw();
  }

  /* --- the monsoon, which is the single most useful line here --- */
  if (typeof inMonsoon === 'function'){
    const mo = inMonsoon(p);
    if (mo) rows.push(inRow('Season', inEsc(mo.name), inEsc(mo.note)));
    draw();
  }

  /* --- altitude, where it is a fact of the visit --- */
  if (typeof inAltitudeNote === 'function'){
    const alt = inAltitudeNote(p);
    if (alt) rows.push(inRow('Altitude', 'High', inEsc(alt)));
  }

  /* --- one clock, thirty degrees of longitude --- */
  if (typeof inClockVsSun === 'function'){
    const cs = inClockVsSun(p);
    if (cs) rows.push(inRow('Sun vs clock',
      cs.mins + ' min ' + (cs.early ? 'early' : 'late'), inEsc(cs.note)));
    draw();
  }

  if (typeof inLiveWeather !== 'function') return;

  const [wx, sea, air] = await Promise.all([
    inLiveWeather(p),
    (typeof inLiveSea === 'function') ? inLiveSea(p) : null,
    (typeof inLiveAir === 'function') ? inLiveAir(p) : null
  ]);

  /* The air goes high up the panel rather than at the bottom. In a
     Delhi December this is the row that should change the day. */
  if (air){
    rows.push(inRow('Air quality', air.aqi + ' · ' + inAirWord(air.aqi),
      [inAirAdvice(air.aqi),
       air.pm25 != null ? 'PM2.5 ' + air.pm25 : '',
       air.pm10 != null ? 'PM10 ' + air.pm10 + ' µg/m³' : ''
      ].filter(Boolean).map(inEsc).join(' · ')));
    sources.push('air from Open-Meteo');
  }

  if (wx){
    const word = inWeatherWord(wx.code);
    rows.push(inRow('Weather', wx.temp + '°C',
      [word, wx.feels !== wx.temp ? 'feels ' + wx.feels + '°' : '',
       wx.humidity != null ? wx.humidity + '% humidity' : '',
       wx.pressure ? wx.pressure + ' hPa' : ''].filter(Boolean).map(inEsc).join(' · ')));

    /* Heat gets its own line when it is actually dangerous. */
    if (typeof inHeatAdvice === 'function'){
      const ha = inHeatAdvice(wx.feels);
      if (ha) rows.push(inRow('Heat', 'Feels ' + wx.feels + '°C', inEsc(ha)));
    }

    const bf = inBeaufort(wx.wind);
    rows.push(inRow('Wind',
      Math.round(wx.wind) + ' km/h ' + inCompass(wx.windDir),
      [bf ? 'force ' + bf.force + ' · ' + bf.word : '',
       wx.gust ? 'gusting ' + Math.round(wx.gust) : ''].filter(Boolean).map(inEsc).join(' · ')));

    if (wx.uv != null && typeof inUvWord === 'function'){
      rows.push(inRow('UV index', wx.uv + ' · ' + inUvWord(wx.uv), ''));
    }

    if (wx.days && wx.days.length > 1){
      rows.push('<div class="pl-fc">' + wx.days.slice(1, 6).map(d =>
        '<span><i>' + inEsc(inDayName(d.date)) + '</i>'
        + '<b>' + (d.max == null ? '' : d.max + '°') + '</b>'
        + '<em>' + inEsc(inWeatherWord(d.code) || '')
        + (d.rain ? ' ' + d.rain + '%' : '') + '</em></span>').join('') + '</div>');
    }
    sources.push('Weather from Open-Meteo');
  }

  if (sea){
    const which = sea.sea ? sea.sea : '';
    if (sea.sst != null){
      rows.push(inRow('Sea temperature', Math.round(sea.sst * 10) / 10 + '°C',
        [which, sea.sst >= 29 ? 'bath-warm' : sea.sst >= 27 ? 'warm'
           : sea.sst >= 24 ? 'pleasant' : 'cool for here'].filter(Boolean).map(inEsc).join(' · ')));
    }
    if (sea.waveH != null){
      rows.push(inRow('Sea state', inSeaState(sea.waveH) + ' · ' + sea.waveH.toFixed(1) + ' m',
        [sea.waveDir != null ? 'from ' + inCompass(sea.waveDir) : '',
         sea.wavePeriod ? sea.wavePeriod.toFixed(0) + 's period' : '',
         sea.maxToday != null ? 'up to ' + sea.maxToday.toFixed(1) + ' m today' : ''
        ].filter(Boolean).map(inEsc).join(' · ')));
    }
    if (sea.swellH != null && sea.swellH > 0){
      rows.push(inRow('Swell', sea.swellH.toFixed(1) + ' m',
        sea.swellPeriod ? sea.swellPeriod.toFixed(0) + 's between crests' : ''));
    }
    if (sea.currentSpeed != null && sea.currentSpeed >= 0.25){
      const kmh = sea.currentSpeed;
      rows.push(inRow('Current', kmh.toFixed(1) + ' km/h'
        + (sea.currentDir != null ? ' towards ' + inCompass(sea.currentDir) : ''),
        kmh >= 3 ? 'strong — stay inshore' : kmh >= 1.5 ? 'noticeable when swimming' : 'gentle'));
    }
    sources.push('sea from Open-Meteo Marine');
  }
  draw();

  /* --- sun and sky --- */
  if (typeof inLiveSky === 'function'){
    const sky = await inLiveSky(p);
    if (sky){
      if (sky.sunrise || sky.sunset){
        rows.push(inRow('Sun',
          (sky.sunrise ? 'up ' + inClock(sky.sunrise) : '')
          + (sky.sunset ? ' · down ' + inClock(sky.sunset) : ''),
          sky.fullDark ? 'fully dark from ' + inClock(sky.fullDark) : 'no full darkness tonight'));
      }
      rows.push(inRow('Moon', sky.moonName, sky.moonLit + '% lit'));
      if (sky.score !== null && sky.score !== undefined){
        const w = sky.score >= 8 ? 'excellent' : sky.score >= 6 ? 'good'
                : sky.score >= 4 ? 'fair' : sky.score >= 2 ? 'poor' : 'not tonight';
        rows.push(inRow('Stars tonight', sky.score + '/10 · ' + w,
          (sky.cloud != null ? sky.cloud + '% cloud · ' : '')
          + 'ground is ' + inEsc(sky.darkness.word) + ' (estimated)'));
      }
      draw();
    }
  }

  /* --- the ground --- */
  if (typeof inLiveSeismic === 'function'){
    const q = await inLiveSeismic(p);
    if (q && q.count){
      rows.push(inRow('Seismic activity',
        q.count + (q.count === 1 ? ' tremor' : ' tremors') + ' in 7 days',
        q.top ? 'strongest M' + q.top.mag + ' · ' + inAgo(q.top.when)
              + (q.top.depth != null ? ' · ' + Math.round(q.top.depth) + ' km down' : '') : ''));
      sources.push('seismicity from USGS');
      draw();
    }
  }

  /* --- is the country about to shut --- */
  if (typeof inHolidayNow === 'function'){
    const hol = await inHolidayNow(4);
    if (hol && hol.length){
      rows.push(inRow('Public holiday',
        inEsc(hol[0].name),
        inEsc(hol[0].en !== hol[0].name ? hol[0].en + ' · ' : '')
        + inDayName(hol[0].date) + ' — expect closures and crowds'));
      sources.push('holidays from Nager.Date');
      draw();
    }
  }

  draw();
}
