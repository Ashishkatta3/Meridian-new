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

  /* ---- story ---- */
  const story = info.sum || me.blurb || '';
  if (story || info.voy){
    h += '<div class="wrap pl-cols"><div class="pl-main">';
    if (story) h += '<p class="pl-lead">' + plEsc(story) + '</p>';
    if (info.voy && info.voy !== story) h += '<p class="pl-voy">' + plEsc(info.voy) + '</p>';
    const links = [];
    if (info.wp)  links.push('<a href="' + plEsc(info.wp)  + '" target="_blank" rel="noopener">Wikipedia</a>');
    if (info.voyp) links.push('<a href="' + plEsc(info.voyp) + '" target="_blank" rel="noopener">Wikivoyage</a>');
    if (links.length) h += '<p class="pl-src">More: ' + links.join(' · ') + '</p>';
    h += '</div>';

    /* side rail: tags */
    h += '<aside class="pl-rail">' + tagBlock(me) + '</aside>';
    h += '</div>';
  }

  /* ---- park facts ---- */
  if (info.nps) h += parkBlock(info.nps);

  /* ---- things to do ---- */
  if (spots.length){
    h += '<div class="wrap pl-sec"><h2>Things to do</h2>'
       + '<p class="pl-note">Each of these can go on a trip of its own — a city is rarely one stop.</p>'
       + '<ul class="pl-things">'
       + spots.map((s, i) => {
           const sid = spotId(id, i);
           return '<li class="pl-thing">'
             + '<span class="pl-thing-ph" data-spotphoto="' + sid + '" data-kind="' + me.kind + '"></span>'
             + '<div class="pl-thing-b">'
             +   '<span class="pl-thing-n">' + plEsc(s[0]) + '</span>'
             +   (s[2] ? '<span class="pl-thing-t">' + plEsc(titleCase(s[2])) + '</span>' : '')
             +   (s[1] ? '<p>' + plEsc(s[1]) + '</p>' : '')
             + '</div>'
             + '<button class="pl-add" data-add="' + sid + '" title="Add to a trip">+ Trip</button>'
             + '</li>';
         }).join('')
       + '</ul></div>';
  }

  /* ---- food ---- */
  if (food.length){
    h += '<div class="wrap pl-sec"><h2>Where to eat</h2><ul class="pl-food">'
       + food.map(f =>
           '<li><span class="pl-food-n">' + plEsc(f[0]) + '</span>'
         + (f[1] ? '<span class="pl-food-d">' + plEsc(f[1]) + '</span>' : '')
         + (f[2] ? '<p>' + plEsc(f[2]) + '</p>' : '') + '</li>').join('')
       + '</ul></div>';
  }

  /* ---- plan: outbound search links (honest, keyless) ---- */
  const q = encodeURIComponent(me.name + ', ' + stateName(me.abbr));
  h += '<div class="wrap pl-sec"><h2>Plan a visit</h2><div class="pl-plan">'
     + planLink('Hotels', 'https://www.booking.com/searchresults.html?ss=' + q, 'Booking.com')
     + planLink('Restaurants', 'https://www.google.com/maps/search/restaurants+near+' + q, 'Google Maps')
     + planLink('Events', 'https://www.ticketmaster.com/search?q=' + encodeURIComponent(me.name), 'Ticketmaster')
     + planLink('Open in Maps', 'https://www.google.com/maps/search/?api=1&query=' + me.lat + ',' + me.lon, 'Google Maps')
     + '</div><p class="pl-note">In-app events and bookings arrive with the planner. For now these open a live search.</p></div>';

  /* ---- nearby + mini map ---- */
  const mini = (typeof miniMapHTML === 'function') ? miniMapHTML(id, near) : '';
  if (mini){
    h += '<div class="wrap pl-sec"><h2>Nearby</h2><div class="pl-near">'
       + '<div class="pl-mini" id="plMini">' + mini + '</div>'
       + '<ul class="pl-near-list">'
       + near.map(n => '<li><a href="#/place/' + n.id + '">' + iconFor(n.kind)
           + plEsc(n.name) + '</a><span>' + Math.round(n.miles) + ' mi</span></li>').join('')
       + '</ul></div></div>';
  }

  /* ---- drivable ---- */
  if (drive.length){
    h += '<div class="wrap pl-sec"><h2>Within a drive</h2>'
       + '<p class="pl-note">Same state, or roughly eight hours or less by road.</p>'
       + '<ul class="pl-drive">'
       + drive.map(d => '<li><a href="#/place/' + d.id + '">' + iconFor(d.kind) + plEsc(d.name) + '</a>'
           + '<span>' + fmtDrive(d.hours) + ' · ' + Math.round(d.miles) + ' mi</span></li>').join('')
       + '</ul></div>';
  }

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
  let h = '<div class="wrap pl-sec pl-park"><h2>Park information</h2>';
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
    const img = new Image();
    img.alt = place.name; img.decoding = 'async';
    img.onload = () => {
      slot.classList.remove('is-loading');
      slot.style.backgroundImage = 'url("' + p.src + '")';
      if (p.by || p.page){
        const a = document.createElement('a');
        a.className = 'pl-credit'; a.href = p.page || '#'; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = (p.by ? p.by : (p.src_kind === 'nps' ? 'NPS' : 'Wikimedia')) + (p.lic ? ' · ' + p.lic : '');
        slot.appendChild(a);
      }
    };
    img.onerror = () => { slot.classList.remove('is-loading'); slot.classList.add('is-empty');
      slot.innerHTML = '<span class="pl-hero-fall">' + iconFor(place.kind) + '</span>'; };
    img.src = p.src;
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

/* An attraction has no photo of its own until the fetch pass adds
   one (photos.js can key a spot id the same way it keys a place),
   so until then it shows its own icon rather than repeating the
   city's picture, which would be misleading. */
function paintSpotPhoto(el){
  const sid = el.dataset.spotphoto;
  const rec = (typeof photoLocal === 'function') && photoLocal(sid);
  if (rec && rec.t){
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = 'url("' + rec.t + '")'; el.classList.add('is-on'); };
    img.src = rec.t;
    return;
  }
  el.classList.add('is-empty');
  el.innerHTML = '<svg viewBox="-12 -12 24 24" aria-hidden="true">' + placeIcon(el.dataset.kind || 'city', 18) + '</svg>';
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
