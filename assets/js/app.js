/* ===========================================================
   BOOT

   Deliberately thin. Its whole job is to put the pieces on the
   page and get out of the way — anything with real logic in it
   belongs in its own file under core/, map/ or pages/.
   =========================================================== */

/* ---------- theme ---------- */
(function theme(){
  const btn = document.getElementById('themebtn');
  if (!btn) return;
  let mode = 'auto';
  try { mode = localStorage.getItem('meridian.theme') || 'auto'; } catch(e){}

  const paint = () => {
    if (mode === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', mode);
    btn.textContent = mode === 'auto' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light';
  };
  btn.addEventListener('click', () => {
    mode = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto';
    try { localStorage.setItem('meridian.theme', mode); } catch(e){}
    paint();
  });
  paint();
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
