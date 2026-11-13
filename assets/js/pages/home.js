/* ===========================================================
   THE HOME PAGE (below the map)

   The map comes first in the markup; this fills everything under
   it, in the order the brief asked for: a jump to the planner, the
   place of the week with a short piece, where to go this month, and
   the atlas counters. All of it is built from data already loaded —
   photos, summaries, prominence — so the home page needs no network
   beyond the images themselves.
   =========================================================== */

(function home(){
  const host = document.getElementById('home-sections');
  if (!host) return;

  /* candidates worth featuring: a real photo and something to say */
  const featured = PLACE_IDS.filter(id =>
    (typeof photoLocal === 'function') && photoLocal(id) &&
    (typeof infoOf === 'function') && infoOf(id) && infoOf(id).sum
  );

  /* ---- place of the week: stable for the week, rotates after ---- */
  function weekIndex(){
    return Math.floor((Date.now() / 86400000 + 4) / 7);  // ISO-ish week count
  }
  const potwPool = featured.filter(id => (placeGet(id).prom || 0) >= 7)
                           .sort((a, b) => (placeGet(b).prom - placeGet(a).prom) || a.localeCompare(b));
  const potwId = potwPool.length ? potwPool[weekIndex() % potwPool.length] : (featured[0] || PLACE_IDS[0]);

  /* ---- where to go this month: seasonal, by region ---- */
  const MONTH = [
    { t:'January',   r:['subtropical','tropical','desert','gulf'],      n:'Sun while the north is frozen in.' },
    { t:'February',  r:['subtropical','tropical','desert','gulf'],      n:'Warm escapes and empty winter beaches.' },
    { t:'March',     r:['desert','subtropical','south','gulf'],         n:'The desert is in bloom and still cool.' },
    { t:'April',     r:['desert','south','west','northeast'],           n:'Wildflowers, mild air, thin crowds.' },
    { t:'May',       r:['west','south','northeast','midwest'],          n:'Everything green before the summer rush.' },
    { t:'June',      r:['pacnw','mountain','northeast','alaska'],       n:'Long days open up the high country.' },
    { t:'July',      r:['mountain','pacnw','alaska','west'],            n:'High country and cool coastlines.' },
    { t:'August',    r:['mountain','pacnw','alaska','northeast'],       n:'Peak season up high, late light everywhere.' },
    { t:'September', r:['west','mountain','northeast','midwest'],       n:'Shoulder season — warm, golden, calmer.' },
    { t:'October',   r:['northeast','midwest','south','desert'],        n:'Leaves turning and the desert cooling off.' },
    { t:'November',  r:['subtropical','tropical','desert','south','gulf'], n:'Chase the warmth as the clocks fall back.' },
    { t:'December',  r:['subtropical','tropical','desert'],             n:'Sun and palm trees over snow and crowds.' }
  ];
  const mo = MONTH[new Date().getMonth()];
  const monthPicks = featured
    .filter(id => id !== potwId)
    .map(id => {
      const p = placeGet(id);
      const inSeason = mo.r.indexOf(STATE_REGION[p.abbr]) !== -1;
      return { id, score: (inSeason ? 100 : 0) + (p.prom || 0), abbr: p.abbr };
    })
    .filter(x => x.score >= 100)
    .sort((a, b) => b.score - a.score);
  // spread across states so it is not six California cities
  const seenState = {}, month6 = [];
  for (const x of monthPicks){
    if (seenState[x.abbr]) continue;
    seenState[x.abbr] = 1; month6.push(x.id);
    if (month6.length === 6) break;
  }
  while (month6.length < 6 && monthPicks.length){        // backfill if a thin month
    const x = monthPicks.shift(); if (x && month6.indexOf(x.id) === -1) month6.push(x.id);
  }


  /* ---------- the opening photograph ---------- */
  (function hero(){
    const slot = document.getElementById('heroPh');
    const cred = document.getElementById('heroCredit');
    const btn  = document.getElementById('heroScroll');

    if (btn) btn.onclick = () => {
      const t = document.getElementById('mapTop');
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (!slot) return;
    /* A wide, scenic, well-known place — and one with a picture.
       Rotates daily so the site does not look identical every visit. */
    const grand = featured.filter(id => {
      const p = placeGet(id);
      return (p.prom || 0) >= 9 && p.kind !== 'city';
    });
    const pool = grand.length ? grand : featured;
    if (!pool.length) return;
    const day = Math.floor(Date.now() / 86400000);
    const pick = pool[day % pool.length];
    const place = placeGet(pick);

    placePhoto(place).then(ph => {
      if (!ph || !ph.src) return;                   // gradient stands in
      loadImage(ph.src, 1600, img => {
        slot.style.backgroundImage = 'url("' + img.src + '")';
        slot.classList.add('is-on');
        /* where it is, and nothing else: the file name and licence
           used to sit here, on top of the photograph */
        if (cred) cred.textContent = place.name + ', ' + stateName(place.abbr);
      });
    });
  })();

  /* ---------- render ---------- */
  /* The counters belong directly under the map — they are a summary
     of what is on it, not a footnote at the end of the page. */
  host.innerHTML =
      statsSection()
    + plannerBand()
    + potwSection(potwId)
    + eventsSection()
    + monthSection(mo, month6);

  loadHomeEvents(host);

  /* photos */
  host.querySelectorAll('[data-homephoto]').forEach(el => paintHome(el, placeGet(el.dataset.homephoto)));
  /* keep the counters live as the user marks places */
  document.addEventListener('marks:changed', () => {
    const s = host.querySelector('#homeStats'); if (s) s.innerHTML = statsInner();
  });

  /* ---------- builders ---------- */
  function plannerBand(){
    return '<section class="wrap hm-plan">'
      + '<div class="hm-plan-in">'
      +   '<div><span class="lab">The group planner</span>'
      +     '<h2>Plan a trip everyone builds together.</h2>'
      +     '<p>Add places from the atlas, sort them into days, leave comments, and invite the group. '
      +       'Everyone sees the same trip, with a picture and the details for every stop.</p></div>'
      +   '<a class="hm-plan-cta" href="#/planner">Start planning →</a>'
      + '</div>'
      + '<p class="hm-plan-note">Arriving in the next phase. It will ask you to sign up first so a trip can be shared with your group.</p>'
      + '</section>';
  }

  function potwSection(id){
    const p = placeGet(id), info = infoOf(id) || {};
    const story = info.sum || p.blurb || '';
    return '<section class="wrap hm-sec"><div class="hm-h"><span class="lab">Place of the week</span></div>'
      + '<a class="hm-potw" href="#/place/' + id + '">'
      +   '<div class="hm-potw-ph" data-homephoto="' + id + '"></div>'
      +   '<div class="hm-potw-tx">'
      +     '<span class="hm-potw-kind">' + homeIcon(p.kind) + plEsc((KIND_LABEL[p.kind]||p.kind)) + ' · ' + plEsc(stateName(p.abbr)) + '</span>'
      +     '<h3>' + plEsc(p.name) + '</h3>'
      +     '<p>' + plEsc(story) + '</p>'
      +     '<span class="hm-potw-go">Read more →</span>'
      +   '</div>'
      + '</a></section>';
  }

  function monthSection(mo, ids){
    if (!ids.length) return '';
    return '<section class="wrap hm-sec"><div class="hm-h">'
      + '<span class="lab">Where to go in ' + mo.t + '</span><p class="hm-sub">' + plEsc(mo.n) + '</p></div>'
      + '<div class="hm-grid">'
      + ids.map(id => {
          const p = placeGet(id);
          return '<a class="hm-card" href="#/place/' + id + '">'
            + '<div class="hm-card-ph" data-homephoto="' + id + '"></div>'
            + '<div class="hm-card-tx"><span>' + homeIcon(p.kind) + plEsc(stateName(p.abbr)) + '</span>'
            + '<b>' + plEsc(p.name) + '</b></div></a>';
        }).join('')
      + '</div></section>';
  }

  /* ---------- events ---------- */
  function eventsSection(){
    /* the labels are filled in by loadHomeEvents once we know whether
       there is a key and whether anyone is signed in */
    return '<section class="wrap hm-sec" id="hmEvents"><div class="hm-h">'
      + '<span class="lab" id="hmEvLab">What is on</span>'
      + '<p class="hm-sub" id="hmEvSub">Loading…</p></div>'
      + '<div class="hm-ev" id="hmEvList"></div></section>';
  }

  function statsSection(){
    return '<section class="wrap hm-sec"><div class="hm-h"><span class="lab">Your atlas</span></div>'
      + '<div class="tally" id="homeStats">' + statsInner() + '</div></section>';
  }
  function statsInner(){
    const m = markCounts();
    const total = PLACE_IDS.length;
    const pct = m.been ? Math.max(1, Math.round(m.been / total * 100)) : 0;
    const count = t => PLACE_IDS.filter(id => PLACES[id][2] === t).length;
    const rows = [
      [m.been, 'places been'],
      [m.want, 'want to go'],
      [pct + '%', 'of the atlas'],
      [count('city'), 'cities'],
      [count('np'), 'national parks'],
      [count('sp'), 'state parks']
    ];
    return rows.map(r => '<span><b>' + r[0] + '</b><i>' + r[1] + '</i></span>').join('');
  }

  /* Signed in: what is on where you want to go. Signed out: what is
     on around the country. Never more than eight either way. */
  async function loadHomeEvents(host){
    const lab = host.querySelector('#hmEvLab'),
          sub = host.querySelector('#hmEvSub'),
          box = host.querySelector('#hmEvList');
    if (!box) return;

    const want = (typeof markedIds === 'function') ? markedIds('want') : [];
    const mine = (typeof signedIn === 'function' && signedIn()) && want.length;

    if (typeof eventsReady !== 'function' || !eventsReady()){
      lab.textContent = mine ? 'What is on where you want to go' : 'What is on around the country';
      sub.textContent = 'Live listings need a free Ticketmaster key in config.js.';
      const seeds = mine ? want.slice(0, 6) : month6.slice(0, 6);
      box.innerHTML = '<div class="hm-ev-fall">' + seeds.map(id => {
        const p = placeGet(id); if (!p) return '';
        return '<a href="' + eventSearchURL(p.name + ' ' + stateName(p.abbr)) + '" target="_blank" rel="noopener">'
             + plEsc(p.name) + ' ↗</a>';
      }).join('') + '</div>';
      return;
    }

    lab.textContent = mine ? 'What is on where you want to go' : 'What is on around the country';
    sub.textContent = mine ? 'From your want-to-go list.' : 'Sign in and mark places to see what is on where you are headed.';

    let list = [];
    try { list = mine ? await eventsForPlaces(want, 8) : await eventsNationwide(8); } catch(e){}
    if (!list.length){
      sub.textContent = 'Nothing listed just now.';
      box.innerHTML = '';
      return;
    }
    box.innerHTML = list.map(e =>
      '<a class="hm-evc" href="' + plEsc(e.url) + '" target="_blank" rel="noopener">'
      + (e.image ? '<span class="hm-evc-ph" style="background-image:url(\'' + plEsc(e.image) + '\')"></span>' : '<span class="hm-evc-ph is-empty"></span>')
      + '<span class="hm-evc-tx">'
      +   '<i>' + plEsc(evDateLabel(e)) + (e.city ? ' · ' + plEsc(e.city) : '') + '</i>'
      +   '<b>' + plEsc(e.name) + '</b>'
      +   (e.venue ? '<em>' + plEsc(e.venue) + '</em>' : '')
      + '</span></a>').join('');
  }

  function homeIcon(kind){
    return '<svg class="hm-ic" viewBox="-12 -12 24 24" aria-hidden="true">' + placeIcon(kind, 16) + '</svg>';
  }
  function paintHome(el, place){
    if (!el || !place) return;
    placePhoto(place).then(p => {
      if (!p || !p.src){ el.classList.add('is-empty'); el.innerHTML = '<span class="hm-fall">' + homeIcon(place.kind) + '</span>'; return; }
      loadImage(p.src, 560,
        img => { el.style.backgroundImage = 'url("' + img.src + '")'; el.classList.add('is-on'); },
        () => { el.classList.add('is-empty'); el.innerHTML = '<span class="hm-fall">' + homeIcon(place.kind) + '</span>'; });
    });
  }
})();
