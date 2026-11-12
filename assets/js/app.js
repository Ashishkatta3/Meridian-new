/* ===========================================================
   BOOT

   Deliberately thin. Its whole job is to put the pieces on the
   page and get out of the way — anything with real logic in it
   belongs in its own file under core/, map/ or pages/.
   =========================================================== */

/* ---------- theme ----------
   Three settings, cycled by the button: Auto, Light, Dark.

   "Auto" follows the SUN, not the operating system: light while the
   sun is up where you are, dark once it has set. The OS setting is a
   standing preference and says nothing about the time of day, which
   is what the brief asked for. It re-checks itself, so the page
   turns over at sunset without a reload. */
(function theme(){
  const btn = document.getElementById('themebtn');
  if (!btn) return;
  let mode = 'auto';
  try { mode = localStorage.getItem('meridian.theme') || 'auto'; } catch(e){}
  let timer = 0;

  const apply = () => {
    if (mode === 'auto'){
      const day = (typeof isDaylight === 'function') ? isDaylight() : true;
      document.documentElement.setAttribute('data-theme', day ? 'light' : 'dark');
      btn.textContent = day ? 'Auto · Day' : 'Auto · Night';
      btn.title = 'Light by day, dark after sunset. Click for Light.';
      /* wake up again when the sun next crosses the horizon */
      clearTimeout(timer);
      if (typeof msUntilSunChange === 'function') timer = setTimeout(apply, msUntilSunChange());
    } else {
      clearTimeout(timer);
      document.documentElement.setAttribute('data-theme', mode);
      btn.textContent = mode === 'dark' ? 'Dark' : 'Light';
      btn.title = 'Click to cycle Light, Dark, Auto.';
    }
  };

  btn.addEventListener('click', () => {
    mode = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto';
    try { localStorage.setItem('meridian.theme', mode); } catch(e){}
    apply();
  });

  /* a laptop that was asleep over sunset should catch up on waking */
  document.addEventListener('visibilitychange', () => { if (!document.hidden && mode === 'auto') apply(); });
  apply();
})();

/* ---------- mobile nav ---------- */
(function nav(){
  const btn = document.getElementById('navbtn');
  const nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  /* a tap on any destination closes it again */
  nav.addEventListener('click', e => {
    if (e.target.closest('a')){ nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
  });
})();

/* ---------- search in the header ----------
   Jumps straight to anything: a city, a park, or one of the
   thousands of individual things to do inside them. */
(function navSearch(){
  const box = document.getElementById('navq');
  const out = document.getElementById('navout');
  if (!box || !out) return;
  let items = [], active = -1;

  const close = () => { out.hidden = true; active = -1; };

  const paint = () => {
    if (!items.length){
      out.innerHTML = '<p class="navsearch-none">Nothing matching.</p>';
      out.hidden = false; return;
    }
    out.innerHTML = items.map((r, i) =>
      '<button class="navsearch-r' + (i === active ? ' is-on' : '') + '" data-go="' + r.id + '">'
      + '<b>' + r.name.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) + '</b>'
      + '<i>' + r.sub.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))
      + (r.isPlace ? '' : ' · thing to do') + '</i></button>').join('');
    out.hidden = false;
    out.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  };

  const go = id => {
    location.hash = '#/place/' + id.split('#')[0];
    box.value = ''; close(); box.blur();
  };

  box.addEventListener('input', () => {
    const q = box.value.trim();
    if (q.length < 2){ close(); return; }
    items = (typeof searchAll === 'function') ? searchAll(q, 8) : [];
    active = -1; paint();
  });

  box.addEventListener('keydown', e => {
    if (out.hidden) return;
    if (e.key === 'ArrowDown'){ e.preventDefault(); active = Math.min(active + 1, items.length - 1); paint(); }
    else if (e.key === 'ArrowUp'){ e.preventDefault(); active = Math.max(active - 1, 0); paint(); }
    else if (e.key === 'Enter'){ e.preventDefault(); const r = items[active < 0 ? 0 : active]; if (r) go(r.id); }
    else if (e.key === 'Escape'){ close(); box.blur(); }
  });

  document.addEventListener('click', e => { if (!e.target.closest('.navsearch')) close(); });
})();

/* ---------- the map ---------- */
(function map(){
  const host = document.getElementById('map');
  if (!host) return;

  host.innerHTML = usMapHTML({ height: 640 });
  wireUsMap(host, {
    onPick: function(id){
      /* Hand off to the router, which renders the place page. */
      location.hash = '#/place/' + id;
    }
  });
  /* The atlas counters and everything else below the map are built by
     pages/home.js, so boot stays thin. */
})();
