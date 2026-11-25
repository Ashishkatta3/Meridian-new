/* ===========================================================
   PLACE PAGE LAYOUT

   Shared by Italy, Costa Rica, India and Japan. Three jobs:

     1. a jump bar, so you can get to Nearby or What to eat without
        scrolling past four screens of prose
     2. a two-column layout on wide screens, with the live panel in
        a sticky right-hand column instead of a band across the
        middle of the page
     3. a live panel that shows the handful of rows people actually
        want and hides the rest behind a toggle

   All four country pages build the same class names, so the CSS
   lives in one file and a change here changes every country.

   On a narrow screen the two columns collapse to one and the live
   panel sits directly under the photo, because on a phone the
   first thing anyone wants is the weather and the time.
   =========================================================== */

/* How many live rows stay visible before the toggle. The country
   wire functions push rows in priority order, so this is a simple
   count rather than a per-row flag. */
const PV_PRIMARY_ROWS = 5;

function pvEsc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- tag chips ----------
   A place carries flags and land tags in separate arrays, and the
   two vocabularies overlap: Mount Fuji has the flag "volcano" and
   the land tag "volcanic", and both render as "Volcanic". Dedupe on
   the rendered label rather than the raw key, because the raw keys
   genuinely differ and only the reader can see the collision. */
function pvChips(place, labelFn){
  if (!place) return '';
  const raw = (place.flags || []).concat(place.land || []);
  const seen = {}, out = [];
  raw.forEach(t => {
    const label = labelFn ? labelFn(t) : t;
    const key = String(label).toLowerCase();
    if (!label || seen[key]) return;
    seen[key] = 1;
    out.push('<span class="pg-chip">' + pvEsc(label) + '</span>');
  });
  return out.length ? '<div class="pg-chips pv-chips">' + out.join('') + '</div>' : '';
}

/* ---------- the jump bar ----------
   sections: [{ id, label }], already filtered to the ones that
   actually exist on this page. Fewer than two and it is noise, so
   nothing is rendered. */
function pvJumpNav(sections){
  const live = (sections || []).filter(s => s && s.id && s.label);
  if (live.length < 2) return '';
  return '<nav class="pv-jump" aria-label="Jump to a section">'
    + live.map(s => '<a href="#' + pvEsc(s.id) + '" data-pv-jump="' + pvEsc(s.id) + '">'
        + pvEsc(s.label) + '</a>').join('')
    + '</nav>';
}

/* ---------- the two-column shell ----------
   Open, then the country page writes its guide sections, then the
   aside with the live panel, then close. */
function pvColumnsOpen(){ return '<div class="pv-cols">'; }
function pvMainOpen(){    return '<div class="pv-main">'; }
function pvMainClose(){   return '</div>'; }

function pvAside(liveId){
  return '<aside class="pv-aside">'
    + '<div class="pl-live it-live pv-live" id="' + pvEsc(liveId) + '">'
    + '<h3>Right now</h3>'
    + '<p class="it-live-wait">Checking conditions…</p>'
    + '</div></aside>';
}
function pvColumnsClose(){ return '</div>'; }

/* ---------- the live panel body ----------
   Called by each country's draw(). Splits the rows, and only adds
   the toggle when there is actually something behind it. */
function pvLiveBody(rows, sources){
  if (!rows || !rows.length){
    return '<h3>Right now</h3>'
      + '<p class="it-live-wait">Nothing is answering for this place right now.</p>';
  }
  const head = rows.slice(0, PV_PRIMARY_ROWS).join('');
  const rest = rows.slice(PV_PRIMARY_ROWS);
  let h = '<h3>Right now</h3><div class="pv-live-key">' + head + '</div>';

  if (rest.length){
    h += '<div class="pv-live-more" hidden>' + rest.join('') + '</div>'
      +  '<button type="button" class="pv-more-btn" aria-expanded="false">'
      +  'See ' + rest.length + ' more</button>';
  }
  if (sources && sources.length){
    h += '<p class="pl-live-src">' + sources.join(' &middot; ') + '</p>';
  }
  return h;
}

/* ---------- behaviour ----------
   Called once after the page is mounted. Safe to call again; it
   checks for its own marker so handlers are not doubled up. */
function pvWire(host){
  if (!host || host.dataset.pvWired === '1') return;
  host.dataset.pvWired = '1';

  /* The live panel is redrawn repeatedly as fetches land, so the
     toggle is handled by delegation on the host rather than bound
     to a button that is about to be replaced. Expanded state is
     remembered so a redraw does not collapse the panel under
     somebody who just opened it. */
  host.addEventListener('click', e => {
    const btn = e.target.closest ? e.target.closest('.pv-more-btn') : null;
    if (btn){
      const panel = btn.parentNode;
      const more = panel.querySelector('.pv-live-more');
      if (!more) return;
      const open = more.hasAttribute('hidden');
      if (open) more.removeAttribute('hidden'); else more.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open
        ? 'Show less'
        : 'See ' + more.children.length + ' more';
      panel.dataset.pvOpen = open ? '1' : '0';
      return;
    }

    /* Jump links. Using scrollIntoView rather than letting the hash
       change, because the whole app is a hash router and writing
       #the-place into location.hash would navigate away from the
       page entirely. */
    const jump = e.target.closest ? e.target.closest('[data-pv-jump]') : null;
    if (jump){
      e.preventDefault();
      const target = document.getElementById(jump.dataset.pvJump);
      if (target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Move focus for keyboard and screen reader users, without
           the browser also jumping there itself. */
        target.setAttribute('tabindex', '-1');
        try { target.focus({ preventScroll: true }); } catch (err){}
      }
    }
  });
}

/* Restore the expanded state after a redraw. Country draw()
   functions call this immediately after writing innerHTML. */
function pvRestoreMore(panel){
  if (!panel || panel.dataset.pvOpen !== '1') return;
  const more = panel.querySelector('.pv-live-more');
  const btn  = panel.querySelector('.pv-more-btn');
  if (more && btn){
    more.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Show less';
  }
}

/* Highlights whichever section is currently on screen. Pure
   decoration, so it is wrapped and failure is silent on browsers
   without IntersectionObserver. */
function pvWatchSections(host){
  if (!host || typeof IntersectionObserver !== 'function') return;
  const links = Array.prototype.slice.call(host.querySelectorAll('[data-pv-jump]'));
  if (!links.length) return;
  const byId = {};
  links.forEach(a => { byId[a.dataset.pvJump] = a; });

  try {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const a = byId[en.target.id];
        if (a) a.classList.toggle('is-here', en.isIntersecting);
      });
    }, { rootMargin: '-10% 0px -70% 0px' });
    Object.keys(byId).forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  } catch (e){}
}
