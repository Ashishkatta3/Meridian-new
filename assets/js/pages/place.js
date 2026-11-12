/* ===========================================================
   THE PLACE PAGE

   Everything known about one place, built from the data already in
   the browser (places / spots / food / info / photos) plus two things
   fetched live and for free: the current weather (Open-Meteo, no key)
   and nothing else. Local time is computed, not fetched. Hotels,
   restaurants and events are honest search links out to the services
   that actually have that data — the in-app versions come with the
   planner phase.

   renderPlace(id)  -> HTML string
   mountPlace(host, id) -> fills host, then wires the live bits
   =========================================================== */

const KIND_LABEL = {
  city:'City', np:'National Park', sp:'State Park', rec:'Recreation Area',
  forest:'Forest / Preserve', monument:'National Monument', falls:'Waterfall',
  beach:'Beach / Seashore', canyon:'Canyon', lake:'Lake', region:'Region', historic:'Historic Site'
};

function plEsc(s){ return (s==null?'':String(s)).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function renderPlace(id){
  const me = placeGet(id);
  if (!me) return '<section class="wrap pl"><p class="pl-miss">That place is not in the atlas.</p>'
                + '<p><a class="pl-back" href="#/">← Back to the map</a></p></section>';

  const info  = (typeof infoOf === 'function') && infoOf(id) || {};
  const photo = (typeof photoLocal === 'function') && photoLocal(id);
  const spots = (typeof SPOTS !== 'undefined' && SPOTS[id]) || [];
  const food  = (typeof FOOD  !== 'undefined' && FOOD[id])  || [];
  const near  = nearbyPlaces(id, 8);
  const drive = drivablePlaces(id, 8, 8).filter(d => d.id !== id);
  const kindLabel = KIND_LABEL[me.kind] || me.kind;

  /* ---- hero ---- */
  const prom = Math.max(1, Math.min(10, me.prom || 1));
  let h = '<section class="pl">';
  h += '<div class="pl-hero" id="plHero">'
     +   '<div class="pl-hero-ph" data-hero></div>'
     +   '<div class="pl-hero-grad"></div>'
     +   '<div class="wrap pl-hero-in">'
     +     '<a class="pl-back" href="#/">← The map</a>'
     +     '<div class="pl-hero-row">'
     +       '<span class="pl-kind">' + iconFor(me.kind) + kindLabel + '</span>'
     +       '<span class="pl-pop" title="How much the atlas has to say about this place">'
     +         'Popularity <b>' + prom + '</b>/10<i style="--p:' + (prom*10) + '%"></i></span>'
     +     '</div>'
     +     '<h1 class="pl-name">' + plEsc(me.name) + '</h1>'
     +     '<p class="pl-where">' + plEsc(stateName(me.abbr)) + '</p>'
     +     '<div class="pl-acts" id="plActs">' + markButtons(id) + itinButton(id) + '</div>'
     +   '</div>'
     + '</div>';

  /* ---- fact strip: time / weather / best season ---- */
  h += '<div class="wrap"><div class="pl-facts">'
     +   fact('Local time', '<span id="plTime">—</span>')
     +   fact('Weather now', '<span id="plWx">…</span>')
     +   fact('Best time to visit', plEsc(bestTimeOf(me)))
     + '</div></div>';

  /* ===== the body: everything substantial on the left, the map and
     what is near it pinned to the right, where it can be glanced at
     while reading rather than hunted for at the bottom ===== */
  h += '<div class="wrap pl-layout"><div class="pl-left">';

  /* ---- story ---- */
  const essay = (typeof longformOf === 'function') ? longformOf(id) : null;
  const story = info.sum || me.blurb || '';
  if (essay && essay.length){
    /* a written introduction, where one exists, in place of the
       one-line summary — a city deserves more than a caption */
    h += '<div class="pl-essay">' + essay.map((para, i) =>
      '<p class="' + (i === 0 ? 'pl-lead' : 'pl-para') + '">' + plEsc(para) + '</p>').join('') + '</div>';
  } else if (story){
    h += '<p class="pl-lead">' + plEsc(story) + '</p>';
    if (info.voy && info.voy !== story) h += '<p class="pl-para">' + plEsc(info.voy) + '</p>';
  }
  const links = [];
  if (info.wp)  links.push('<a href="' + plEsc(info.wp)  + '" target="_blank" rel="noopener">Wikipedia</a>');
  if (info.voyp) links.push('<a href="' + plEsc(info.voyp) + '" target="_blank" rel="noopener">Wikivoyage</a>');
  if (links.length) h += '<p class="pl-src">More: ' + links.join(' · ') + '</p>';

  /* ---- park facts ---- */
  if (info.nps) h += parkBlock(info.nps);

  /* ---- things to do ---- */
  if (spots.length){
    h += '<div class="pl-sec"><h2>Things to do</h2>'
       + '<p class="pl-note">Each of these can go on a trip of its own — a city is rarely one stop.</p>'
       + '<div class="pl-things">'
       + spots.map((s, i) => {
           const sid = spotId(id, i);
           return '<article class="pl-thing">'
             + '<span class="pl-thing-ph" data-spotphoto="' + sid + '" data-kind="' + me.kind
             +   '" data-spotname="' + plEsc(s[0]) + '"></span>'
             + '<div class="pl-thing-b">'
             +   '<div class="pl-thing-h">'
             +     '<a class="pl-thing-n" href="' + mapsLink(s[0], me) + '" target="_blank" rel="noopener" title="Open in Google Maps">'
             +       plEsc(s[0]) + '<span class="pl-ext">↗</span></a>'
             +     (s[2] ? '<span class="pl-thing-t">' + plEsc(titleCase(s[2])) + '</span>' : '')
             +   '</div>'
             +   (s[1] ? '<p>' + plEsc(s[1]) + '</p>' : '<p class="pl-thin">Open it in Maps for hours, reviews and directions.</p>')
             +   '<button class="pl-add" data-add="' + sid + '" title="Add to a trip">+ Add to a trip</button>'
             + '</div>'
             + '</article>';
         }).join('')
       + '</div></div>';
  }

  /* ---- food ---- */
  if (food.length){
    h += '<div class="pl-sec"><h2>Where to eat</h2><ul class="pl-food">'
       + food.map(f =>
           '<li><a class="pl-food-n" href="' + mapsLink(f[0], me) + '" target="_blank" rel="noopener" title="Open in Google Maps">'
         + plEsc(f[0]) + '<span class="pl-ext">↗</span></a>'
         + (f[1] ? '<span class="pl-food-d">' + plEsc(f[1]) + '</span>' : '')
         + (f[2] ? '<p>' + plEsc(f[2]) + '</p>' : '') + '</li>').join('')
       + '</ul></div>';
  }

  /* ---- what it is known for ---- */
  h += calloutBlock(me);

  /* ---- plan: outbound search links (honest, keyless) ---- */
  const q = encodeURIComponent(me.name + ', ' + stateName(me.abbr));
  h += '<div class="pl-sec"><h2>Plan a visit</h2><div class="pl-plan">'
     + planLink('Hotels', 'https://www.booking.com/searchresults.html?ss=' + q, 'Booking.com')
     + planLink('Restaurants', 'https://www.google.com/maps/search/restaurants+near+' + q, 'Google Maps')
     + planLink('Events', 'https://www.ticketmaster.com/search?q=' + encodeURIComponent(me.name), 'Ticketmaster')
     + planLink('Open in Maps', 'https://www.google.com/maps/search/?api=1&query=' + me.lat + ',' + me.lon, 'Google Maps')
     + '</div><p class="pl-note">In-app events and bookings arrive with the planner. For now these open a live search.</p></div>';

  /* ---- drivable ---- */
  if (drive.length){
    h += '<div class="pl-sec"><h2>Within a drive</h2>'
       + '<p class="pl-note">Same state, or roughly eight hours or less by road.</p>'
       + '<ul class="pl-drive">'
       + drive.map(d => '<li><a href="#/place/' + d.id + '">' + iconFor(d.kind) + plEsc(d.name) + '</a>'
           + '<span>' + fmtDrive(d.hours) + ' · ' + Math.round(d.miles) + ' mi</span></li>').join('')
       + '</ul></div>';
  }

  h += '</div>';                                   /* end .pl-left */

  /* ===== the right rail: where this is, and what is around it ===== */
  const mini = (typeof miniMapHTML === 'function') ? miniMapHTML(id, near) : '';
  h += '<aside class="pl-right">';
  if (mini){
    h += '<div class="pl-rbox"><h3>Where it is</h3>'
       + '<div class="pl-mini" id="plMini">' + mini + '</div></div>';
    h += '<div class="pl-rbox"><h3>Nearby</h3><ul class="pl-near-list">'
       + near.map(n => '<li><a href="#/place/' + n.id + '">' + iconFor(n.kind)
           + plEsc(n.name) + '</a><span>' + Math.round(n.miles) + ' mi</span></li>').join('')
       + '</ul></div>';
  }
  const tags = tagBlock(me);
  if (tags && tags.indexOf('pl-tagg') !== -1) h += '<div class="pl-rbox">' + tags + '</div>';
  h += '</aside></div>';                           /* end .pl-right / .pl-layout */

  /* ---- footer actions ---- */
  h += '<div class="wrap pl-foot"><div class="pl-acts" id="plActs2">' + markButtons(id) + itinButton(id) + '</div>'
     + '<a class="pl-back" href="#/">← Back to the map</a></div>';

  h += '</section>';
  return h;
}

/* ---------- small builders ---------- */
function iconFor(kind){
  return '<svg class="pl-ic" viewBox="-12 -12 24 24" aria-hidden="true">' + placeIcon(kind, 18) + '</svg>';
}
function fact(label, val){
  return '<div class="pl-fact"><span class="pl-fact-l">' + label + '</span><span class="pl-fact-v">' + val + '</span></div>';
}
function titleCase(t){ return String(t).toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }

/* A name on its own is a dead end. Pointed at Google Maps it becomes
   the opening hours, the phone number, the reviews and the walk from
   wherever you are standing — none of which we have to hold. */
function mapsLink(name, place){
  return 'https://www.google.com/maps/search/?api=1&query='
    + encodeURIComponent(name + ', ' + place.name + ', ' + stateName(place.abbr));
}

/* What this place is known for, with somewhere official to go next. */
const CALLOUTS = {
  darksky: ['Dark skies', 'Among the darkest skies in the country — worth staying out for.',
            'https://darksky.org/what-we-do/international-dark-sky-places/'],
  camping: ['Camping', 'Sites here are booked through the federal system, often six months ahead.',
            'https://www.recreation.gov/'],
  food:    ['Known for its food', 'A city people travel to eat in, not just eat while visiting.', ''],
  wildlife:['Wildlife', 'Animals on their own terms — keep your distance and bring optics.', ''],
  winter:  ['Winter', 'The season it is really known for; plan around snow rather than in spite of it.', ''],
  hiking:  ['Hiking', 'Trails are the reason to come. Check conditions before you set out.', ''],
  roadtrip:['On a great drive', 'This sits on one of the routes worth taking slowly.', ''],
  nightlife:['After dark', 'The evening is the point here, not an afterthought.', ''],
  history: ['History', 'Things happened here that the rest of the country still argues about.', ''],
  water:   ['On the water', 'Coast, lake or river — the water is why people come.', '']
};

function calloutBlock(me){
  const t = (typeof tagsOf === 'function') ? tagsOf(me) : { flags: [] };
  const picks = (t.flags || []).filter(f => CALLOUTS[f]).slice(0, 4);
  if (!picks.length) return '';
  return '<div class="pl-sec"><h2>Known for</h2><div class="pl-calls">'
    + picks.map(f => {
        const c = CALLOUTS[f];
        return '<div class="pl-call"><b>' + plEsc(c[0]) + '</b><p>' + plEsc(c[1]) + '</p>'
          + (c[2] ? '<a href="' + plEsc(c[2]) + '" target="_blank" rel="noopener">More ↗</a>' : '') + '</div>';
      }).join('')
    + '</div></div>';
}

function tagBlock(me){
  const groups = [['Landscape', me.land], ['Good for', me.who], ['Known for', me.flags]];
  let out = '';
  groups.forEach(([label, arr]) => {
    if (!arr || !arr.length) return;
    out += '<div class="pl-tagg"><span class="pl-tagg-l">' + label + '</span><div class="pl-tags">'
         + arr.map(t => '<span class="pl-tag">' + plEsc(tagLabel(t) || t) + '</span>').join('')
         + '</div></div>';
  });
  return out || '<p class="pl-note">—</p>';
}

function parkBlock(n){
  let h = '<div class="pl-sec pl-park"><h2>Park information</h2>';
  if (n.desc) h += '<p class="pl-lead">' + plEsc(n.desc) + '</p>';
  h += '<div class="pl-park-grid">';
  if (n.fees && n.fees.length){
    h += '<div class="pl-park-b"><h3>Entrance</h3><ul>'
       + n.fees.map(f => '<li>' + plEsc(f.t) + (f.c ? ' — $' + plEsc(f.c) : '') + '</li>').join('')
       + '</ul></div>';
  }
  if (n.hours)   h += '<div class="pl-park-b"><h3>Hours</h3><p>' + plEsc(n.hours) + '</p></div>';
  if (n.weather) h += '<div class="pl-park-b"><h3>Weather &amp; season</h3><p>' + plEsc(n.weather) + '</p></div>';
  h += '</div>';
  if (n.acts && n.acts.length){
    h += '<div class="pl-tagg"><span class="pl-tagg-l">Activities</span><div class="pl-tags">'
       + n.acts.map(a => '<span class="pl-tag">' + plEsc(a) + '</span>').join('') + '</div></div>';
  }
  if (n.url) h += '<p class="pl-src">Official: <a href="' + plEsc(n.url) + '" target="_blank" rel="noopener">nps.gov</a></p>';
  return h + '</div>';
}

function planLink(label, href, host){
  return '<a class="pl-planl" href="' + href + '" target="_blank" rel="noopener">'
       + '<b>' + label + '</b><span>' + host + ' ↗</span></a>';
}

function markButtons(id){
  const m = (typeof markOf === 'function') ? markOf(id) : '';
  return '<button class="pl-mk" data-mk="been" data-id="' + id + '"' + (m==='been'?' aria-pressed="true"':'') + '>'
       +   (m==='been' ? '✓ Been here' : 'Been here') + '</button>'
       + '<button class="pl-mk pl-mk-want" data-mk="want" data-id="' + id + '"' + (m==='want'?' aria-pressed="true"':'') + '>'
       +   (m==='want' ? '✓ Want to go' : 'Want to go') + '</button>';
}
/* Adding is not a toggle — pressing twice used to remove the place
   again, which looks like a broken button. This always adds, and
   says which trips it is already on. */
function itinButton(id){
  const on = (typeof tripsWith === 'function') ? tripsWith(id) : [];
  const label = on.length === 1 ? '✓ On ' + on[0].name
              : on.length > 1  ? '✓ On ' + on.length + ' trips'
              : '+ Add to itinerary';
  return '<button class="pl-itin" data-itin="' + id + '"' + (on.length ? ' data-on="1"' : '') + '>'
       + plEsc(label) + '</button>';
}

/* ---------- mount: fill host, then wire the live pieces ---------- */
function mountPlace(host, id){
  host.innerHTML = renderPlace(id);
  const me = placeGet(id);
  if (!me) return;
  window.scrollTo(0, 0);

  heroPhoto(host.querySelector('[data-hero]'), me);
  resetSpotPhotos(me);
  host.querySelectorAll('[data-spotphoto]').forEach(paintSpotPhoto);
  tickTime(host, me.abbr);
  loadWeather(host, me);
  wireActions(host);
  wireMini(host);
}

function heroPhoto(slot, place){
  if (!slot) return;
  slot.classList.add('is-loading');
  placePhoto(place).then(p => {
    if (!p || !p.src){ slot.classList.remove('is-loading'); slot.classList.add('is-empty');
      slot.innerHTML = '<span class="pl-hero-fall">' + iconFor(place.kind) + '</span>'; return; }
    loadImage(p.src, 1400, img => {
      slot.classList.remove('is-loading');
      slot.style.backgroundImage = 'url("' + img.src + '")';
      if (p.by || p.page){
        const a = document.createElement('a');
        a.className = 'pl-credit'; a.href = p.page || '#'; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = (p.by ? p.by : (p.src_kind === 'nps' ? 'NPS' : 'Wikimedia')) + (p.lic ? ' · ' + p.lic : '');
        slot.appendChild(a);
      }
    }, () => {
      slot.classList.remove('is-loading'); slot.classList.add('is-empty');
      slot.innerHTML = '<span class="pl-hero-fall">' + iconFor(place.kind) + '</span>';
    });
  });
}

function tickTime(host, abbr){
  const el = host.querySelector('#plTime'); if (!el) return;
  const paint = () => { el.textContent = localTimeOf(abbr) || '—'; };
  paint();
  const t = setInterval(() => { if (!document.body.contains(el)) { clearInterval(t); return; } paint(); }, 15000);
}

/* Open-Meteo: free, no key, CORS-enabled. Fails quietly. */
const WX_TEXT = {0:'Clear',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Fog',
  51:'Light drizzle',53:'Drizzle',55:'Drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',
  71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow',80:'Showers',81:'Showers',82:'Heavy showers',
  85:'Snow showers',86:'Snow showers',95:'Thunderstorm',96:'Thunderstorm',99:'Thunderstorm'};
function loadWeather(host, place){
  const el = host.querySelector('#plWx'); if (!el) return;
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + place.lat + '&longitude=' + place.lon
            + '&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=auto';
  fetch(url).then(r => r.ok ? r.json() : null).then(j => {
    const c = j && j.current;
    if (!c){ el.textContent = '—'; return; }
    const t = Math.round(c.temperature_2m);
    el.textContent = t + '°F · ' + (WX_TEXT[c.weather_code] || 'Current');
  }).catch(() => { el.textContent = '—'; });
}

function wireActions(host){
  host.addEventListener('click', e => {
    const mk = e.target.closest('[data-mk]');
    if (mk){
      const id = mk.dataset.id, want = mk.dataset.mk;
      const now = markOf(id);
      setMark(id, now === want ? '' : want);
      // repaint both action rows
      host.querySelectorAll('#plActs, #plActs2').forEach(row => {
        row.innerHTML = markButtons(id) + itinButton(id);
      });
      return;
    }
    const it = e.target.closest('[data-itin]');
    if (it){
      const id = it.dataset.itin;
      addToTrip(id, () => {
        host.querySelectorAll('#plActs, #plActs2').forEach(row => {
          row.innerHTML = markButtons(id) + itinButton(id);
        });
      });
      return;
    }

    /* an attraction inside this place */
    const add = e.target.closest('[data-add]');
    if (add){
      addToTrip(add.dataset.add, () => { add.textContent = '✓ Added'; add.classList.add('is-on'); });
    }
  });
}

/* Attractions have no baked-in photo — there are thousands of them,
   so downloading one each is out of the question. Each is looked up
   on Wikipedia the moment it scrolls into view, remembered for the
   session, and falls back to its icon if nothing turns up. These are
   hotlinked on purpose: unlike the places, they are never pulled
   into the project. */
const SPOT_PHOTO_CACHE = {};

function cachedSpotPhoto(sid){
  if (SPOT_PHOTO_CACHE[sid] !== undefined) return SPOT_PHOTO_CACHE[sid];
  try {
    const v = sessionStorage.getItem('spotph2:' + sid);
    if (v !== null){ SPOT_PHOTO_CACHE[sid] = v; return v; }
  } catch(e){}
  return undefined;
}
function rememberSpotPhoto(sid, url){
  SPOT_PHOTO_CACHE[sid] = url || '';
  try { sessionStorage.setItem('spotph2:' + sid, url || ''); } catch(e){}
}

/* ---- is this photo actually of this thing? ----

   Wikipedia's search never says "no match"; it returns the closest
   article it has. Ask it for "Sun's Eye, Monument Valley" and it hands
   back the Monument Valley article, so every butte on the page ends up
   wearing the same postcard. So the title that comes back is checked
   against the name that was asked for, and a picture already used on
   the page is never used a second time. An icon is better than a
   confidently wrong photograph. */

/* Verbs and filler that belong to the instruction rather than the
   place: "Walk the Freedom Trail" is a question about Freedom Trail. */
const SPOT_STOP = {
  the:1, a:1, an:1, of:1, at:1, in:1, on:1, and:1, to:1, for:1, from:1, with:1,
  visit:1, see:1, walk:1, hike:1, tour:1, drive:1, ride:1, explore:1, take:1,
  stroll:1, wander:1, browse:1, shop:1, catch:1, watch:1, try:1, eat:1, dine:1,
  stay:1, climb:1, kayak:1, paddle:1, raft:1, swim:1, camp:1, spend:1, go:1,
  tours:1, trip:1, day:1, your:1, its:1, best:1, famous:1, historic:1
};

function spotWords(s){
  return String(s || '').toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/['’]s\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(w => w.length > 1 && !SPOT_STOP[w]);
}

function wordIn(w, list){
  return list.some(g => g === w || g.indexOf(w) === 0 || w.indexOf(g) === 0);
}

/* True when `title` plausibly names `name`. The strict half is the
   second test: the words that make the attraction different from the
   place it sits in ("camel", "butte" inside Monument Valley) have to
   show up, which is exactly what the parent-article fallback lacks. */
function titleFits(name, title, place){
  const want = spotWords(name);
  const got  = spotWords(title);
  if (!want.length || !got.length) return false;

  const parent = spotWords(place.name);
  if (parent.length && got.join(' ') === parent.join(' ')
      && want.join(' ') !== parent.join(' ')) return false;

  let hit = 0;
  want.forEach(w => { if (wordIn(w, got)) hit++; });
  if (hit / want.length < 0.6) return false;

  const own = want.filter(w => !wordIn(w, parent));
  if (own.length){
    let ownHit = 0;
    own.forEach(w => { if (wordIn(w, got)) ownHit++; });
    if (!ownHit || ownHit / own.length < 0.5) return false;
  }
  return true;
}

/* One picture per attraction per page. Keyed on the file name so the
   same image at two sizes still counts as the same image. */
let SPOT_USED = {};
function photoKey(url){
  const m = String(url || '').match(/\/([^\/?#]+)$/);
  let f = m ? m[1] : String(url || '');
  try { f = decodeURIComponent(f); } catch(e){}
  return f.replace(/^\d+px-/, '').toLowerCase();
}
function resetSpotPhotos(place){
  SPOT_USED = {};
  const own = place && (typeof photoLocal === 'function') && photoLocal(place.id);
  if (own && own.s) SPOT_USED[photoKey(own.s)] = 1;   /* not the hero again */
}

async function spotApi(url){
  try {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 8000);
    const r = await fetch(url, { signal: ctl.signal });
    clearTimeout(to);
    if (!r.ok) return null;
    const j = await r.json();
    const pages = j && j.query && j.query.pages;
    if (!pages) return null;
    return Object.keys(pages).map(k => pages[k])
                 .sort((a, b) => (a.index || 0) - (b.index || 0));
  } catch(e){ return null; }
}

/* Two passes: the attraction's own article, then — for the many
   places with no article of their own — a photograph on Commons whose
   file name names the thing. Both are checked the same way. */
async function lookupSpotPhoto(name, place){
  const q = encodeURIComponent(name + ' ' + place.name);
  const cands = [];

  const arts = await spotApi(
    'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*'
    + '&generator=search&gsrlimit=6&gsrsearch=' + q
    + '&prop=pageimages&piprop=thumbnail&pithumbsize=600');
  (arts || []).forEach(p => {
    const src = p.thumbnail && p.thumbnail.source;
    if (src && titleFits(name, p.title || '', place)) cands.push(src);
  });

  if (!cands.length){
    const files = await spotApi(
      'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*'
      + '&generator=search&gsrnamespace=6&gsrlimit=10&gsrsearch=' + q
      + '&prop=imageinfo&iiprop=url&iiurlwidth=600');
    (files || []).forEach(p => {
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii || !/\.(jpe?g|png|webp)$/i.test(ii.url || '')) return;
      const t = String(p.title || '').replace(/^File:/, '')
                                     .replace(/\.[a-z0-9]+$/i, '');
      if (titleFits(name, t, place)) cands.push(ii.thumburl || ii.url);
    });
  }

  for (let i = 0; i < cands.length; i++){
    if (!SPOT_USED[photoKey(cands[i])]) return cands[i];
  }
  return '';
}

function spotFallback(el){
  el.classList.remove('is-on');
  el.classList.add('is-empty');
  el.innerHTML = '<svg viewBox="-12 -12 24 24" aria-hidden="true">' + placeIcon(el.dataset.kind || 'city', 18) + '</svg>';
}
function showSpotPhoto(el, url){
  if (!url) return spotFallback(el);
  SPOT_USED[photoKey(url)] = 1;
  loadImage(url, 500, img => {
    el.innerHTML = ''; el.style.backgroundImage = 'url("' + img.src + '")';
    el.classList.remove('is-empty'); el.classList.add('is-on');
  }, () => spotFallback(el));
}

/* Only look one up once it is actually on screen: a city with forty
   attractions must not fire forty requests the moment it opens. */
let SPOT_OBSERVER = null;
function paintSpotPhoto(el){
  const sid = el.dataset.spotphoto;

  const baked = (typeof photoLocal === 'function') && photoLocal(sid);
  if (baked && baked.t) return showSpotPhoto(el, baked.t);

  /* A photo remembered from an earlier session is still subject to the
     one-per-page rule — otherwise an old cache can reintroduce the
     duplicate this fix exists to remove. */
  const seen = cachedSpotPhoto(sid);
  if (seen !== undefined){
    if (seen && SPOT_USED[photoKey(seen)]) return spotFallback(el);
    return showSpotPhoto(el, seen);
  }

  spotFallback(el);
  if (!('IntersectionObserver' in window)) return;

  if (!SPOT_OBSERVER){
    SPOT_OBSERVER = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        SPOT_OBSERVER.unobserve(node);
        const id = node.dataset.spotphoto;
        const place = placeGet(id.split('#')[0]);
        const name = node.dataset.spotname || '';
        if (!place || !name) return;
        lookupSpotPhoto(name, place).then(url => {
          rememberSpotPhoto(id, url);
          if (url) showSpotPhoto(node, url);
        });
      });
    }, { rootMargin: '250px' });
  }
  SPOT_OBSERVER.observe(el);
}

function wireMini(host){
  const mini = host.querySelector('#plMini'); if (!mini) return;
  const go = pid => { if (pid) location.hash = '#/place/' + pid; };
  mini.addEventListener('click', e => {
    const g = e.target.closest('[data-pid]'); if (g) go(g.dataset.pid);
  });
  mini.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' '){ const g = e.target.closest('[data-pid]'); if (g){ e.preventDefault(); go(g.dataset.pid); } }
  });
}
