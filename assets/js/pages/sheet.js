/* ===========================================================
   THE DAY SHEET

   One itinerary document, used in two places:

     #/sheet/<id>       your own trip, laid out to print or save as a
                        PDF for the glovebox
     #/shared/<token>   the same document, opened by somebody you sent
                        a link to, who may have no account at all

   Writing it once is deliberate. A share page and a print sheet want
   exactly the same thing — the whole plan, in order, readable without
   touching anything — and keeping them as one renderer means a link
   someone opens on their phone and the sheet in your glovebox can
   never disagree.

   It is built to be read on paper. Every day starts a new page, the
   route for each day runs across the top as a strip, each stop keeps
   its number from the map, notes come with it, and the whole thing
   goes black-on-white with the navigation gone when it prints. There
   is a line at the top of each page for the date, because a plan in
   the car gets written on.
   =========================================================== */

function shEsc(s){ return (typeof plEsc === 'function') ? plEsc(s) : String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

/* Miles and hours for a run of stops, straight-line until the router
   answers. The sheet prints whatever is known at the moment it is
   made, and says which it is, rather than leaving a gap. */
function shLeg(a, b){
  if (!a || !b || a.lat == null || b.lat == null) return null;
  const mi = haversine(a.lat, a.lon, b.lat, b.lon);
  if (mi < 1) return null;
  return { miles: Math.round(mi), hours: mi / 52 };   /* 52mph: interstates and two-lanes averaged */
}
function shDrive(h){
  if (!isFinite(h) || h <= 0) return '';
  const m = Math.round(h * 60);
  return m < 60 ? m + ' min' : Math.floor(m / 60) + 'h' + (m % 60 ? String(m % 60).padStart(2, '0') : '');
}

/* ---------- one day ---------- */
function shDay(t, d, n, startFrom){
  const groups = (typeof groupStops === 'function') ? groupStops(d.stops)
                 : d.stops.map(s => ({ parent: s, place: s, spots: [] }));

  /* the route strip: where the day starts, every town it passes
     through, and what each leg costs */
  const chain = [];
  let prev = startFrom;
  let miles = 0, hours = 0;
  groups.forEach(g => {
    const info = stopInfo(g.place || g.parent);
    if (!info) return;
    const leg = shLeg(prev, info);
    if (leg){ miles += leg.miles; hours += leg.hours; }
    chain.push({ info: info, leg: leg });
    prev = info;
  });

  let h = '<section class="sh-day">';
  h += '<header class="sh-day-h">'
     +   '<div><span class="sh-day-n">' + shEsc(d.label || ('Day ' + n)) + '</span>'
     +     '<span class="sh-day-date" aria-hidden="true"></span></div>'
     +   (miles ? '<div class="sh-day-cost"><b>' + miles.toLocaleString() + '</b> mi'
     +     '<i>·</i><b>' + shDrive(hours) + '</b> driving</div>' : '')
     + '</header>';

  if (!chain.length){
    h += '<p class="sh-empty">Nothing planned for this day yet.</p></section>';
    return { html: h, end: prev, miles: miles, hours: hours };
  }

  /* The strip. It opens with where yesterday ended, greyed, so the
     drive INTO the day is visible.

     Without it the strip for a day that begins with a long haul
     showed only the short hops once you had arrived — Day 2 reading
     "11 mi" under a heading saying 251. The missing 240 miles are
     the overnight leg, they belong to this day, and a plan that
     hides them is how you end up setting off four hours late. */
  h += '<ol class="sh-strip">';
  if (startFrom && chain.length && chain[0].leg){
    h += '<li><span class="sh-strip-stop is-from">' + shEsc(startFrom.name) + '</span></li>';
  }
  chain.forEach((c, i) => {
    const showLeg = c.leg && (i > 0 || startFrom);
    h += '<li>' + (showLeg
          ? '<span class="sh-strip-leg">' + c.leg.miles + ' mi · ' + shDrive(c.leg.hours) + '</span>'
          : '')
       + '<span class="sh-strip-stop">' + shEsc(c.info.name) + '</span></li>';
  });
  h += '</ol>';

  /* the stops themselves */
  h += '<div class="sh-stops">';
  groups.forEach((g, gi) => {
    const info = stopInfo(g.place || g.parent);
    if (!info) return;
    const notes = (t.notes && t.notes[g.place || g.parent]) || [];
    h += '<article class="sh-stop">'
       +   '<span class="sh-stop-n">' + (gi + 1) + '</span>'
       +   '<div class="sh-stop-b">'
       +     '<h3>' + shEsc(info.name) + (info.repeat ? ' <em>· again</em>' : '') + '</h3>'
       +     '<p class="sh-stop-s">' + shEsc(info.sub || '') + '</p>';

    /* the things to do inside this stop */
    if (g.spots && g.spots.length){
      h += '<ul class="sh-todo">';
      g.spots.forEach(sid => {
        const s = stopInfo(sid); if (!s) return;
        const sn = (t.notes && t.notes[sid]) || [];
        h += '<li><span class="sh-box" aria-hidden="true"></span><b>' + shEsc(s.name) + '</b>'
           + (s.note ? '<span>' + shEsc(s.note) + '</span>' : '')
           + (sn.length ? '<span class="sh-note">' + sn.map(c => shEsc(c.text)).join(' · ') + '</span>' : '')
           + '</li>';
      });
      h += '</ul>';
    }

    if (notes.length){
      h += '<ul class="sh-notes">' + notes.map(c =>
        '<li><b>' + shEsc(c.by || 'Note') + '</b> ' + shEsc(c.text) + '</li>').join('') + '</ul>';
    }

    /* where to sleep and eat at this stop, if anything is picked */
    const key = g.place || g.parent;
    const beds = (typeof tripStayList === 'function') ? tripStayList(t, key, 'stay') : [];
    const eats = (typeof tripStayList === 'function') ? tripStayList(t, key, 'eat') : [];
    if (beds.length || eats.length){
      h += '<div class="sh-se">';
      if (beds.length) h += '<p><span class="sh-se-k">Sleep</span>'
        + beds.map(r => shEsc(r.name) + (r.sub ? ' <i>' + shEsc(r.sub) + '</i>' : '')).join(', ') + '</p>';
      if (eats.length) h += '<p><span class="sh-se-k">Eat</span>'
        + eats.map(r => shEsc(r.name) + (r.sub ? ' <i>' + shEsc(r.sub) + '</i>' : '')).join(', ') + '</p>';
      h += '</div>';
    }

    h += '</div></article>';
  });
  h += '</div></section>';

  return { html: h, end: prev, miles: miles, hours: hours };
}

/* ---------- the whole document ---------- */
function sheetHTML(t, opts){
  opts = opts || {};
  const stops = t.days.reduce((a, d) => a + d.stops.length, 0);
  let miles = 0, hours = 0, end = null;
  const days = [];
  t.days.forEach((d, i) => {
    /* the drive into a day starts from where the day before ended, so
       the first leg of day two is the overnight hop and is counted
       once, in day two — not again in day one's total */
    const r = shDay(t, d, i + 1, end);
    end = r.end; miles += r.miles; hours += r.hours;
    days.push(r.html);
  });

  const states = (function(){
    const seen = {};
    t.days.forEach(d => d.stops.forEach(sid => {
      const info = stopInfo(sid);
      if (info && info.kind === 'place'){
        const p = placeGet(stopBase(sid));
        if (p && p.abbr) seen[p.abbr] = 1;
      }
    }));
    return Object.keys(seen);
  })();

  let h = '<article class="sh">';

  /* ---- cover ---- */
  h += '<header class="sh-top">'
     +   '<div class="sh-top-l">'
     +     '<span class="lab">Itinerary</span>'
     +     '<h1>' + shEsc(t.name) + '</h1>'
     +     '<p class="sh-top-s">' + t.days.length + (t.days.length === 1 ? ' day' : ' days')
     +       ' · ' + stops + (stops === 1 ? ' stop' : ' stops')
     +       (states.length ? ' · ' + states.join(' · ') : '') + '</p>'
     +   '</div>'
     +   '<div class="sh-top-r">'
     +     (miles ? '<div class="sh-fig"><b>' + miles.toLocaleString() + '</b><span>miles</span></div>'
                 + '<div class="sh-fig"><b>' + shDrive(hours) + '</b><span>driving</span></div>' : '')
     +   '</div>'
     + '</header>';

  /* A line to write on. A printed plan gets dates and times added in
     the car, every time, so the sheet leaves room for it. */
  h += '<div class="sh-fill">'
     +   '<label>Dates <span class="sh-rule"></span></label>'
     +   '<label>Driver <span class="sh-rule"></span></label>'
     +   '<label>Car / plates <span class="sh-rule"></span></label>'
     + '</div>';

  h += days.join('');

  /* ---- ideas, as a reserve list ---- */
  if (t.ideas && t.ideas.length){
    h += '<section class="sh-day sh-ideas"><header class="sh-day-h">'
       +   '<div><span class="sh-day-n">If there is time</span></div></header><ul class="sh-todo">';
    t.ideas.forEach(sid => {
      const s = stopInfo(sid); if (!s) return;
      h += '<li><span class="sh-box" aria-hidden="true"></span><b>' + shEsc(s.name) + '</b>'
         + '<span>' + shEsc(s.sub || '') + '</span></li>';
    });
    h += '</ul></section>';
  }

  /* ---- the back page: what to check before leaving ---- */
  if (opts.checklist !== false){
    h += '<section class="sh-day sh-check"><header class="sh-day-h">'
       + '<div><span class="sh-day-n">Before you go</span></div></header>'
       + '<ul class="sh-todo sh-two">'
       + ['Tyres, oil, washer fluid', 'Spare, jack, torch',
          'Park passes or reservations printed', 'Offline maps saved in Meridian',
          'Phone chargers and a cable for the car', 'Water and food for the long stretches',
          'First aid kit', 'Somebody at home knows the route']
          .map(x => '<li><span class="sh-box" aria-hidden="true"></span><b>' + x + '</b></li>').join('')
       + '</ul></section>';
  }

  h += '<footer class="sh-foot">'
     +   '<span>' + shEsc(t.name) + '</span>'
     +   '<span>Distances are straight-line estimates unless the planner has routed them; '
     +     'allow more on mountain roads.</span>'
     +   '<span>Made with Meridian</span>'
     + '</footer>';

  return h + '</article>';
}

/* ===========================================================
   THE PRINT ROUTE  —  #/sheet/<id>
   =========================================================== */
function mountSheet(host, id){
  const t = (typeof tripGet === 'function') ? tripGet(id) : null;
  if (!t){
    host.innerHTML = '<section class="wrap pg-none"><h1>No such trip</h1>'
      + '<p>It may have been deleted. <a href="#/trips">Your trips</a>.</p></section>';
    return;
  }
  host.innerHTML = '<div class="wrap sh-bar">'
      + '<a class="pg-btn" href="#/planner/' + shEsc(t.id) + '">&larr; Back to the planner</a>'
      + '<div class="sh-bar-r">'
      +   '<button class="pg-btn" id="shDense">Compact</button>'
      +   '<button class="pg-btn pg-btn-go" id="shPrint">Print or save as PDF</button>'
      + '</div></div>'
    + '<div class="wrap sh-page" id="shPage">' + sheetHTML(t) + '</div>';

  const page = host.querySelector('#shPage');
  host.querySelector('#shPrint').onclick = () => window.print();
  const dense = host.querySelector('#shDense');
  dense.onclick = () => {
    const on = page.classList.toggle('is-dense');
    dense.textContent = on ? 'Roomy' : 'Compact';
  };
}

/* ===========================================================
   THE SHARED ROUTE  —  #/shared/<token>

   Opened by somebody who was sent a link. It must work with no
   account, so nothing here assumes a session: it reads the trip
   through the one public function and renders the same document.
   =========================================================== */
async function mountShared(host, token){
  host.innerHTML = '<section class="wrap sh-wait"><span class="lab">Opening</span>'
    + '<h1>Fetching the trip…</h1></section>';

  const r = await tripByToken(token);

  if (r.error === 'gone' || (!r.ok && !r.error)){
    host.innerHTML = '<section class="wrap pg-none"><span class="lab">Shared trip</span>'
      + '<h1>This link is no longer live</h1>'
      + '<p>Whoever shared it has turned the link off, or it was mistyped. '
      + 'Ask them for a new one.</p>'
      + '<p><a class="pg-btn" href="#/">Open Meridian</a></p></section>';
    return;
  }
  if (!r.ok){
    host.innerHTML = '<section class="wrap pg-none"><span class="lab">Shared trip</span>'
      + '<h1>Could not open that link</h1><p>' + shEsc(r.error) + '</p></section>';
    return;
  }

  const t = r.trip;
  const canEdit = r.role === 'editor';
  const signedIn = (typeof currentUser === 'function') && !!currentUser();

  /* The banner is the whole difference between the two roles, so it
     says plainly which one this is and what the visitor can do next. */
  let banner;
  if (!canEdit){
    banner = '<div class="sh-ban"><div><b>You are reading a shared plan.</b> '
      + 'Changes you make here are not saved, and the person who shared it will not see them. '
      + 'You can print it or save it as a PDF.</div>'
      + '<button class="pg-btn" id="shPrint2">Print</button></div>';
  } else if (signedIn){
    banner = '<div class="sh-ban is-edit"><div><b>You can edit this trip.</b> '
      + 'It is in your own trips now, and anything you change syncs for everyone on it.</div>'
      + '<a class="pg-btn pg-btn-go" href="#/planner/' + shEsc(t.id) + '">Open in the planner</a></div>';
  } else {
    banner = '<div class="sh-ban is-edit"><div><b>You were given editing access.</b> '
      + 'Sign in and this trip joins your own list — then you can move stops, add places '
      + 'and leave notes, and everyone on the trip sees it.</div>'
      + '<button class="pg-btn pg-btn-go" id="shJoin">Sign in to edit</button></div>';
  }

  host.innerHTML = '<div class="wrap">' + banner + '</div>'
    + '<div class="wrap sh-page">' + sheetHTML(t, { checklist: false }) + '</div>';

  const pr = host.querySelector('#shPrint2');
  if (pr) pr.onclick = () => window.print();

  const join = host.querySelector('#shJoin');
  if (join) join.onclick = () => {
    /* remember the link across the sign-in reload, then come back and
       claim it — see share.js */
    sharePendingSet(token);
    location.hash = '#/account';
  };

  /* Already signed in on an editor link? Claim it quietly, so the trip
     is in their list by the time they look. */
  if (canEdit && signedIn){
    const c = await linkClaim(token);
    if (c && c.ok && c.joined && typeof cloudLoad === 'function') cloudLoad();
  }
}
