/* ===========================================================
   THE MAP PAGE AND THE STATES

   #/map         the map, and under it all fifty states
   #/state/XX    everything the atlas has in one state

   A state has no photograph of its own, so each state card borrows
   the picture of the best-known place in it. That is honest — it is
   labelled with the place it came from — and it means the grid is
   full of real photography from day one instead of fifty grey boxes.
   =========================================================== */

/* the place whose photo stands for a state: best known, with a picture */
function stateFace(abbr){
  const ids = PLACE_IDS.filter(id => placeGet(id).abbr === abbr);
  const withPhoto = ids.filter(id => (typeof photoLocal === 'function') && photoLocal(id));
  const pool = withPhoto.length ? withPhoto : ids;
  return pool.sort((a, b) => (placeGet(b).prom || 0) - (placeGet(a).prom || 0))[0] || null;
}

function statePlaces(abbr){
  return PLACE_IDS.filter(id => placeGet(id).abbr === abbr)
    .sort((a, b) => (placeGet(b).prom || 0) - (placeGet(a).prom || 0));
}

/* ---------- #/map ---------- */
function renderMapPage(){
  const rows = MAP_STATES.slice().sort((a, b) => a[1].localeCompare(b[1]));
  return '<section class="wrap pg">'
    + '<div class="pg-head"><div><span class="lab">The atlas</span><h1>The map</h1>'
    + '<p class="pg-sub">Tap a marker for a place, or a state — on the map or in the list — for everything in it.</p></div></div>'
    + '<div id="mapPageMap"></div>'
    + '<div class="pg-sec"><h2>Every state</h2><div class="st-grid">'
    + rows.map(s => {
        const abbr = s[0], face = stateFace(abbr), n = statePlaces(abbr).length;
        return '<a class="st-card" href="#/state/' + abbr + '">'
          + '<span class="st-card-ph"' + (face ? ' data-pgphoto="' + face + '"' : '') + '></span>'
          + '<span class="st-card-tx"><b>' + plEsc(s[1]) + '</b>'
          + '<i>' + n + (n === 1 ? ' place' : ' places') + '</i></span></a>';
      }).join('')
    + '</div></div></section>';
}

function mountMapPage(host){
  host.innerHTML = renderMapPage();
  window.scrollTo(0, 0);

  const box = host.querySelector('#mapPageMap');
  if (box && typeof usMapHTML === 'function'){
    box.innerHTML = usMapHTML({ height: 560 });
    wireUsMap(box, {
      onPick: id => { location.hash = '#/place/' + id; },
      onState: abbr => { location.hash = '#/state/' + abbr; }
    });
  }
  host.querySelectorAll('[data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto)));
}

/* ---------- #/state/XX ---------- */
function renderState(abbr){
  const name = stateName(abbr);
  const ids = statePlaces(abbr);
  if (!ids.length) return '<section class="wrap pg"><a class="pl-back" href="#/map">← The map</a>'
    + '<p>Nothing in the atlas for ' + plEsc(name) + ' yet.</p></section>';

  /* group by what the place is, biggest groups first */
  const groups = {};
  ids.forEach(id => { const k = placeGet(id).kind; (groups[k] = groups[k] || []).push(id); });
  const order = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  let h = '<section class="wrap pg"><a class="pl-back" href="#/map">← The map</a>'
    + '<div class="pg-head"><div><span class="lab">State</span><h1>' + plEsc(name) + '</h1>'
    + '<p class="pg-sub">' + ids.length + ' place' + (ids.length === 1 ? '' : 's') + ' in the atlas.</p></div></div>';

  order.forEach(kind => {
    h += '<div class="pg-sec"><h2>' + plEsc(KIND_LABEL[kind] || kind) + '</h2><div class="tr-grid">'
      + groups[kind].map(id => {
          const p = placeGet(id), m = markOf(id);
          return '<a class="tr-card' + (m ? ' is-' + m : '') + '" href="#/place/' + id + '">'
            + '<span class="tr-card-ph" data-pgphoto="' + id + '"></span>'
            + '<span class="tr-card-tx"><i>' + plEsc(KIND_LABEL[p.kind] || p.kind) + '</i>'
            + '<b>' + plEsc(p.name) + '</b><em title="Popularity">' + (p.prom || 1) + '/10</em></span></a>';
        }).join('')
      + '</div></div>';
  });
  return h + '</section>';
}

function mountState(host, abbr){
  host.innerHTML = renderState(abbr);
  window.scrollTo(0, 0);
  host.querySelectorAll('[data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto)));
}
