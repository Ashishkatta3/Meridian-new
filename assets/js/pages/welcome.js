/* ===========================================================
   ONBOARDING

   #/welcome

   Straight after an account is made: two quick passes over the
   places most people have an opinion about, so the map is yours
   within a minute instead of after forty separate visits.

   Pass one is "been", pass two is "want". The same grid both times,
   with anything already marked filtered out of the second pass. It
   can be skipped at any point — an empty map is a perfectly good
   starting state and nagging about it would be worse than useless.
   =========================================================== */

const WELCOME_N = 36;          /* enough to be worth doing, few enough to finish */

/* the places worth asking about: well known, photogenic, spread out */
function welcomePool(){
  const seen = {};
  return PLACE_IDS
    .map(id => ({ id: id, p: placeGet(id) }))
    .filter(x => x.p && (x.p.prom || 0) >= 7)
    .sort((a, b) => (b.p.prom || 0) - (a.p.prom || 0))
    .filter(x => {                       /* at most two per state, for spread */
      seen[x.p.abbr] = (seen[x.p.abbr] || 0) + 1;
      return seen[x.p.abbr] <= 2;
    })
    .slice(0, WELCOME_N)
    .map(x => x.id);
}

let WELCOME_STEP = 'been';

function renderWelcome(){
  const step = WELCOME_STEP;
  const pool = welcomePool().filter(id => step === 'been' ? true : markOf(id) !== 'been');
  const picked = pool.filter(id => markOf(id) === step).length;

  return '<section class="wrap pg wl">'
    + '<div class="wl-head">'
    +   '<span class="lab">' + (step === 'been' ? 'Step 1 of 2' : 'Step 2 of 2') + '</span>'
    +   '<h1>' + (step === 'been' ? 'Where have you been?' : 'Where do you want to go?') + '</h1>'
    +   '<p class="pg-sub">' + (step === 'been'
          ? 'Tap everywhere you have already been. This is what fills in your map — you can add the rest later.'
          : 'Now the ones you are still dreaming about. These become your want-to-go list, and the planner starts here.')
    +   '</p>'
    + '</div>'
    + '<div class="wl-grid">'
    + pool.map(id => {
        const p = placeGet(id), on = markOf(id) === step;
        return '<button class="wl-card' + (on ? ' is-on' : '') + '" data-wl="' + id + '">'
          + '<span class="wl-ph" data-pgphoto="' + id + '"></span>'
          + '<span class="wl-tx"><b>' + plEsc(p.name) + '</b><i>' + plEsc(stateName(p.abbr)) + '</i></span>'
          + '<span class="wl-tick" aria-hidden="true">✓</span></button>';
      }).join('')
    + '</div>'
    + '<div class="wl-foot">'
    +   '<span class="wl-count" id="wlCount">' + picked + ' selected</span>'
    +   '<div class="wl-btns">'
    +     '<button class="pg-btn" id="wlSkip">' + (step === 'been' ? 'Skip' : 'Finish') + '</button>'
    +     '<button class="pg-btn pg-btn-go" id="wlNext">' + (step === 'been' ? 'Next' : 'Done') + '</button>'
    +   '</div>'
    + '</div></section>';
}

function mountWelcome(host){
  host.innerHTML = renderWelcome();
  window.scrollTo(0, 0);
  host.querySelectorAll('[data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto)));

  const count = () => {
    const el = host.querySelector('#wlCount');
    if (el) el.textContent = host.querySelectorAll('.wl-card.is-on').length + ' selected';
  };

  host.querySelectorAll('[data-wl]').forEach(b => b.onclick = () => {
    const id = b.dataset.wl;
    const on = markOf(id) === WELCOME_STEP;
    setMark(id, on ? '' : WELCOME_STEP);
    b.classList.toggle('is-on', !on);
    count();
  });

  const done = () => {
    WELCOME_STEP = 'been';
    location.hash = '#/';
  };
  const next = () => {
    if (WELCOME_STEP === 'been'){ WELCOME_STEP = 'want'; mountWelcome(host); }
    else done();
  };
  const skip = host.querySelector('#wlSkip');
  if (skip) skip.onclick = () => { if (WELCOME_STEP === 'been'){ WELCOME_STEP = 'want'; mountWelcome(host); } else done(); };
  const nb = host.querySelector('#wlNext');
  if (nb) nb.onclick = next;
}
