/* ===========================================================
   TRIPS — ideas, grouped

   #/trips

   Three ways of slicing the atlas, from core/tags.js:
     geography  — beaches, mountains, desert, canyons…  (reliable)
     who it suits — couples, family, friends, honeymoon  (a suggestion)
     known for  — food, nightlife, dark sky, winter…     (mixed)

   The "who" row is honestly labelled, because there is no free data
   on who actually travels where; it is a rule of thumb over the
   geography and the known-for tags, not a measurement.
   =========================================================== */

const TR_GEO  = ['beach','mountain','desert','canyon','forest','water','island','volcanic','urban'];
const TR_WHO  = ['couple','family','friends','honeymoon','solo','group'];
const TR_FLAG = ['food','nightlife','hiking','camping','darksky','wildlife','winter','roadtrip','history','water'];

let TR_STATE = { axis: 'land', tag: 'beach', st: '' };

function renderTrips(){
  let h = '<section class="wrap pg"><div class="pg-head"><div>'
    + '<span class="lab">Trips</span><h1>Where to go next</h1>'
    + '<p class="pg-sub">The atlas sliced by what a place is, who it suits, and what it is known for.</p>'
    + '</div></div>';

  h += '<div class="tr-bar">'
     + group('Geography', 'land', TR_GEO)
     + group('Who it suits', 'who', TR_WHO)
     + group('Known for', 'flags', TR_FLAG)
     + '<div class="tr-g"><span class="tr-g-l">State</span><select id="trState"><option value="">Anywhere</option>'
     + MAP_STATES.map(s => '<option value="' + s[0] + '"' + (TR_STATE.st === s[0] ? ' selected' : '') + '>' + plEsc(s[1]) + '</option>').join('')
     + '</select></div>'
     + '</div>';

  h += '<div id="trGrid">' + grid() + '</div>';
  return h + '</section>';

  function group(label, axis, tags){
    return '<div class="tr-g"><span class="tr-g-l">' + label + '</span><div class="tr-chips">'
      + tags.map(t => '<button class="tr-chip' + (TR_STATE.axis === axis && TR_STATE.tag === t ? ' is-on' : '') + '"'
        + ' data-axis="' + axis + '" data-tag="' + t + '">' + plEsc(trLabel(axis, t)) + '</button>').join('')
      + '</div></div>';
  }
}

function trLabel(axis, tag){
  const map = axis === 'land' ? (typeof LAND !== 'undefined' && LAND)
            : axis === 'who'  ? (typeof WHO  !== 'undefined' && WHO)
            : (typeof FLAG !== 'undefined' && FLAG);
  return (map && map[tag] && map[tag][0]) || tag;
}
function trNote(axis, tag){
  const map = axis === 'land' ? (typeof LAND !== 'undefined' && LAND)
            : axis === 'who'  ? (typeof WHO  !== 'undefined' && WHO)
            : (typeof FLAG !== 'undefined' && FLAG);
  return (map && map[tag] && map[tag][1]) || '';
}

function grid(){
  const { axis, tag, st } = TR_STATE;
  let ids = placesWithTag(axis, tag);
  if (st) ids = ids.filter(id => placeGet(id).abbr === st);

  let h = '<div class="tr-head"><h2>' + plEsc(trLabel(axis, tag)) + '</h2>'
        + '<p class="pg-sub">' + plEsc(trNote(axis, tag)) + '</p>'
        + (axis === 'who' ? '<p class="pg-note">A suggestion, not a measurement — worked out from what each place is, since nothing free records who actually travels where.</p>' : '')
        + '<p class="pg-note">' + ids.length + ' place' + (ids.length === 1 ? '' : 's') + '</p></div>';

  if (!ids.length) return h + '<div class="pg-empty"><p>Nothing here with that combination.</p></div>';

  h += '<div class="tr-grid">' + ids.slice(0, 60).map(id => {
    const p = placeGet(id), m = markOf(id);
    return '<a class="tr-card' + (m ? ' is-' + m : '') + '" href="#/place/' + id + '">'
      + '<span class="tr-card-ph" data-pgphoto="' + id + '"></span>'
      + '<span class="tr-card-tx"><i>' + plEsc(stateName(p.abbr)) + '</i>'
      + '<b>' + plEsc(p.name) + '</b>'
      + '<em title="Popularity">' + (p.prom || 1) + '/10</em></span></a>';
  }).join('') + '</div>';
  if (ids.length > 60) h += '<p class="pg-note">Showing the 60 most popular. Narrow it with a state.</p>';
  return h;
}

function mountTrips(host){
  host.innerHTML = renderTrips();
  window.scrollTo(0, 0);
  paintGrid();

  host.querySelectorAll('[data-axis]').forEach(b => b.onclick = () => {
    TR_STATE.axis = b.dataset.axis; TR_STATE.tag = b.dataset.tag;
    host.querySelectorAll('[data-axis]').forEach(x => x.classList.toggle('is-on', x === b));
    refresh();
  });
  const sel = host.querySelector('#trState');
  if (sel) sel.onchange = () => { TR_STATE.st = sel.value; refresh(); };

  function refresh(){ host.querySelector('#trGrid').innerHTML = grid(); paintGrid(); }
  function paintGrid(){ host.querySelectorAll('[data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto))); }
}
