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
