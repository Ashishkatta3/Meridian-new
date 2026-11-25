/* ===========================================================
   ROUTER

   Two views for now: the home map (#/) and a place page
   (#/place/<id>). The hash is the whole state — share a place URL
   and it opens straight to that place. No framework; just show one
   view and hide the other, and let mountPlace build the page.

   Home is left in the DOM when a place is open (its map stays built
   and ready), so going back is instant.
   =========================================================== */

(function router(){
  /* 'home' keeps the built map in the DOM; everything else renders
     into the one secondary view and is thrown away on the way out. */
  function view(name){
    const home = document.getElementById('view-home');
    const page = document.getElementById('view-place');
    if (!home || !page) return;
    if (name === 'home'){ page.hidden = true; page.innerHTML = ''; home.hidden = false; }
    else { home.hidden = true; page.hidden = false; }
    navMark(name);
  }

  /* light up the matching nav item */
  function navMark(name){
    document.querySelectorAll('[data-nav]').forEach(a => {
      a.classList.toggle('is-on', a.dataset.nav === name);
    });
  }

  function route(){
    const hash = location.hash.replace(/^#/, '');
    const page = document.getElementById('view-place');

    let m = hash.match(/^\/place\/(.+)$/);
    if (m && typeof mountPlace === 'function'){
      const id = decodeURIComponent(m[1]);
      if (placeGet(id)){ mountPlace(page, id); view('place'); return; }
    }

    /* The escape hatch, before anything else can get in the way: if
       this browser is holding a broken copy of the site, #/reset has
       to work even when the rest of it does not. */
    if (hash === '/reset' && typeof mountReset === 'function'){
      mountReset(page); view('planner'); return;
    }

    /* A shared trip comes first: somebody arriving on a link may have
       no account and no trips of their own, and nothing else on the
       way in should get a chance to redirect them. */
    m = hash.match(/^\/shared\/([A-Za-z0-9_-]+)$/);
    if (m && typeof mountShared === 'function'){
      mountShared(page, m[1]); view('shared'); return;
    }

    m = hash.match(/^\/sheet\/(.+)$/);
    if (m && typeof mountSheet === 'function'){
      mountSheet(page, decodeURIComponent(m[1])); view('planner'); return;
    }

    m = hash.match(/^\/planner\/(.+)$/);
    if (m && typeof mountPlanner === 'function'){
      mountPlanner(page, decodeURIComponent(m[1])); view('planner'); return;
    }
    if (hash === '/planner' && typeof mountPlanner === 'function'){
      mountPlanner(page, null); view('planner'); return;
    }
    if (hash === '/trips' && typeof mountTrips === 'function'){
      mountTrips(page); view('trips'); return;
    }
    if (hash === '/welcome' && typeof mountWelcome === 'function'){
      mountWelcome(page); view('account'); return;
    }
    if (hash === '/account' && typeof mountAccount === 'function'){
      mountAccount(page); view('account'); return;
    }
    /* ---- Italy ----
       Matched before #/map and #/state so that the longer Italian
       paths cannot be swallowed by a shorter pattern. */
    m = hash.match(/^\/italy\/place\/(.+)$/);
    if (m && typeof mountItPlace === 'function'){
      const pid = decodeURIComponent(m[1]);
      if (typeof itPlaceGet === 'function' && itPlaceGet(pid)){
        mountItPlace(page, pid); view('italy'); return;
      }
    }
    m = hash.match(/^\/italy\/region\/([A-Za-z]{3})$/);
    if (m && typeof mountItRegion === 'function'){
      mountItRegion(page, m[1].toUpperCase()); view('italy'); return;
    }
    if (hash === '/italy' && typeof mountItaly === 'function'){
      mountItaly(page); view('italy'); return;
    }

    /* ---- Costa Rica ----
       Same ordering rule as Italy: the longer paths are matched before
       the bare country route, and all three before #/map and #/state.
       The region pattern is anchored to exactly three letters so that
       "/costarica/place/..." cannot be caught by it. */
    m = hash.match(/^\/costarica\/place\/(.+)$/);
    if (m && typeof mountCrPlace === 'function'){
      const pid = decodeURIComponent(m[1]);
      if (typeof crPlaceGet === 'function' && crPlaceGet(pid)){
        mountCrPlace(page, pid); view('costarica'); return;
      }
    }
    m = hash.match(/^\/costarica\/region\/([A-Za-z]{3})$/);
    if (m && typeof mountCrRegion === 'function'){
      mountCrRegion(page, m[1].toUpperCase()); view('costarica'); return;
    }
    if (hash === '/costarica' && typeof mountCostaRica === 'function'){
      mountCostaRica(page); view('costarica'); return;
    }

    if (hash === '/map' && typeof mountMapPage === 'function'){
      mountMapPage(page); view('map'); return;
    }
    m = hash.match(/^\/state\/([A-Za-z]{2})$/);
    if (m && typeof mountState === 'function'){
      mountState(page, m[1].toUpperCase()); view('map'); return;
    }

    view('home');
  }

  window.addEventListener('hashchange', route);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route);
  else route();
})();
