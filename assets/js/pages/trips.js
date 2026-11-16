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

/* One choice per axis rather than one choice in total: "a beach,
   good for families, known for its food" is a real question and the
   old single-selection could not ask it. Pressing a chip that is
   already on turns it off again. */
let TR_SEL = { land: 'beach', who: '', flags: '', st: '' };
let TR_TAB = 'ideas';                    /* ideas | road | bucket */
let TR_BUCKET = { cat: '', st: '', price: '', weather: '' };

function renderTrips(){
  let h = '<section class="wrap pg"><div class="pg-head"><div>'
    + '<span class="lab">Trips</span><h1>Where to go next</h1>'
    + '<p class="pg-sub">The atlas sliced by what a place is, the drives worth taking, and the things worth planning a trip around.</p>'
    + '</div></div>';

  h += '<div class="tr-tabs">'
     + [['ideas','Ideas'],['road','Road trips'],['bucket','The bucket list']]
        .map(t => '<button class="tr-tab' + (TR_TAB === t[0] ? ' is-on' : '') + '" data-tab="' + t[0] + '">' + t[1] + '</button>').join('')
     + '</div>';

  if (TR_TAB === 'road')   return h + renderRoadtrips() + '</section>';
  if (TR_TAB === 'bucket') return h + renderBucket() + '</section>';

  h += '<div class="tr-bar">'
     + group('Geography', 'land', TR_GEO)
     + group('Who it suits', 'who', TR_WHO)
     + group('Known for', 'flags', TR_FLAG)
     + '<div class="tr-g"><span class="tr-g-l">State</span><select id="trState"><option value="">Anywhere</option>'
     + MAP_STATES.map(s => '<option value="' + s[0] + '"' + (TR_SEL.st === s[0] ? ' selected' : '') + '>' + plEsc(s[1]) + '</option>').join('')
     + '</select></div>'
     + (trAny() ? '<button class="tr-clear" id="trClear">Clear all</button>' : '')
     + '</div>';

  h += '<div id="trGrid">' + grid() + '</div>';
  return h + '</section>';

  function group(label, axis, tags){
    return '<div class="tr-g"><span class="tr-g-l">' + label + '</span><div class="tr-chips">'
      + tags.map(t => '<button class="tr-chip' + (TR_SEL[axis] === t ? ' is-on' : '') + '"'
        + ' data-axis="' + axis + '" data-tag="' + t + '" aria-pressed="' + (TR_SEL[axis] === t) + '">'
        + plEsc(trLabel(axis, t)) + '</button>').join('')
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

function trAny(){ return !!(TR_SEL.land || TR_SEL.who || TR_SEL.flags || TR_SEL.st); }

function grid(){
  /* every chosen axis narrows the set; an axis with nothing chosen
     simply does not narrow it */
  const axes = ['land', 'who', 'flags'].filter(a => TR_SEL[a]);
  let ids = null;
  axes.forEach(a => {
    const set = placesWithTag(a, TR_SEL[a]);
    ids = ids === null ? set.slice() : ids.filter(id => set.indexOf(id) !== -1);
  });
  if (ids === null) ids = Object.keys(PLACES).sort((a, b) =>
    (placeGet(b).prom || 0) - (placeGet(a).prom || 0));
  if (TR_SEL.st) ids = ids.filter(id => placeGet(id).abbr === TR_SEL.st);

  const title = axes.length ? axes.map(a => trLabel(a, TR_SEL[a])).join(' · ')
                            : 'The whole atlas';
  const note = axes.length === 1 ? trNote(axes[0], TR_SEL[axes[0]])
             : axes.length ? 'Places that are all of these at once.'
             : 'Everywhere in the atlas, most popular first. Narrow it with the filters above.';

  let h = '<div class="tr-head"><h2>' + plEsc(title) + '</h2>'
        + '<p class="pg-sub">' + plEsc(note) + '</p>'
        + (TR_SEL.who ? '<p class="pg-note">Who it suits is a suggestion, not a measurement — worked out from what each place is, since nothing free records who actually travels where.</p>' : '')
        + '<p class="pg-note">' + ids.length + ' place' + (ids.length === 1 ? '' : 's') + '</p></div>';

  if (!ids.length) return h + '<div class="pg-empty"><p>Nothing is all of those at once.</p>'
    + '<p class="pg-note">Turn one of the filters off — pressing a chip that is already on clears it.</p></div>';

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

  host.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { TR_TAB = b.dataset.tab; mountTrips(host); });

  /* road trips */
  host.querySelectorAll('[data-rtadd]').forEach(b => b.onclick = () => {
    const rt = roadtripGet(b.dataset.rtadd); if (!rt) return;
    const stops = roadtripStops(rt);
    const t = tripCreate(rt[1]);
    stops.forEach(id => tripAddPlace(t.id, id));
    toast(rt[1] + ' started with ' + stops.length + ' stops');
    location.hash = '#/planner/' + t.id;
  });

  /* bucket list filters */
  host.querySelectorAll('[data-bcat]').forEach(b => b.onclick = () => {
    TR_BUCKET.cat = (TR_BUCKET.cat === b.dataset.bcat) ? '' : b.dataset.bcat;
    mountTrips(host);
  });
  host.querySelectorAll('[data-bprice]').forEach(b => b.onclick = () => {
    TR_BUCKET.price = (TR_BUCKET.price === b.dataset.bprice) ? '' : b.dataset.bprice; mountTrips(host); });
  host.querySelectorAll('[data-bwx]').forEach(b => b.onclick = () => {
    TR_BUCKET.weather = (TR_BUCKET.weather === b.dataset.bwx) ? '' : b.dataset.bwx; mountTrips(host); });
  const bks = host.querySelector('#bkState');
  if (bks) bks.onchange = () => { TR_BUCKET.st = bks.value; mountTrips(host); };
  host.querySelectorAll('.bk-add').forEach(b => b.onclick = () => addToTrip(b.dataset.add));

  /* One choice per axis, and pressing the one that is already on
     turns it off — a filter you cannot clear is a trap. */
  host.querySelectorAll('[data-axis]').forEach(b => b.onclick = () => {
    const axis = b.dataset.axis, tag = b.dataset.tag;
    TR_SEL[axis] = TR_SEL[axis] === tag ? '' : tag;
    mountTrips(host);
  });
  const sel = host.querySelector('#trState');
  if (sel) sel.onchange = () => { TR_SEL.st = sel.value; refresh(); };
  const clr = host.querySelector('#trClear');
  if (clr) clr.onclick = () => { TR_SEL = { land:'', who:'', flags:'', st:'' }; mountTrips(host); };

  function refresh(){ host.querySelector('#trGrid').innerHTML = grid(); paintGrid(); }
  function paintGrid(){ host.querySelectorAll('[data-pgphoto]').forEach(el => pgPhoto(el, placeGet(el.dataset.pgphoto))); }
}


/* ---------- road trips ---------- */
function renderRoadtrips(){
  return '<p class="pg-note">Distances and days are the usual quoted figures for the standard route — planning numbers, not a measured path.</p>'
    + '<div class="rt-list">' + ROADTRIPS.map(rt => {
        const stops = roadtripStops(rt);
        return '<article class="rt">'
          + '<div class="rt-ph"' + (stops[0] ? ' data-pgphoto="' + stops[0] + '"' : '') + '></div>'
          + '<div class="rt-body">'
          +   '<span class="rt-meta">' + plEsc(rt[2]) + ' · ' + plEsc(rt[3]) + ' · ' + rt[4] + ' miles · best ' + plEsc(rt[5]) + '</span>'
          +   '<h3>' + plEsc(rt[1]) + '</h3>'
          +   '<p>' + plEsc(rt[6]) + '</p>'
          +   (stops.length ? '<div class="rt-stops">' + stops.map(id =>
                '<a href="#/place/' + id + '">' + plEsc(placeGet(id).name) + '</a>').join('<span>→</span>') + '</div>' : '')
          +   '<div class="rt-acts">'
          +     (stops.length ? '<button class="pg-btn pg-btn-s" data-rtadd="' + rt[0] + '">Start a trip from this</button>' : '')
          +     '<a class="pg-btn pg-btn-s" href="' + plEsc(rt[8]) + '" target="_blank" rel="noopener">Official guide ↗</a>'
          +   '</div>'
          + '</div></article>';
      }).join('') + '</div>';
}

/* ---------- bucket list ---------- */
function renderBucket(){
  const cats = bucketCats();
  const hits = bucketBy(TR_BUCKET.cat, TR_BUCKET.st, TR_BUCKET.price, TR_BUCKET.weather);
  let h = '<div class="tr-bar">'
    + '<div class="tr-g"><span class="tr-g-l">Kind</span><div class="tr-chips">'
    +   '<button class="tr-chip' + (!TR_BUCKET.cat ? ' is-on' : '') + '" data-bcat="">Everything</button>'
    +   cats.map(c => '<button class="tr-chip' + (TR_BUCKET.cat === c ? ' is-on' : '') + '" data-bcat="' + c + '">'
          + plEsc(BUCKET_CAT[c][0]) + '</button>').join('')
    + '</div></div>'
    + '<div class="tr-g"><span class="tr-g-l">Cost</span><div class="tr-chips">'
    +   '<button class="tr-chip' + (!TR_BUCKET.price ? ' is-on' : '') + '" data-bprice="">Any</button>'
    +   Object.keys(BUCKET_PRICE).map(k => '<button class="tr-chip' + (TR_BUCKET.price === k ? ' is-on' : '') + '" data-bprice="' + k + '" title="' + plEsc(BUCKET_PRICE[k][1]) + '">'
          + plEsc(BUCKET_PRICE[k][0]) + '</button>').join('')
    + '</div></div>'
    + '<div class="tr-g"><span class="tr-g-l">Weather</span><div class="tr-chips">'
    +   '<button class="tr-chip' + (!TR_BUCKET.weather ? ' is-on' : '') + '" data-bwx="">Any weather</button>'
    +   Object.keys(BUCKET_WEATHER).map(k => '<button class="tr-chip' + (TR_BUCKET.weather === k ? ' is-on' : '') + '" data-bwx="' + k + '" title="' + plEsc(BUCKET_WEATHER[k][1]) + '">'
          + plEsc(BUCKET_WEATHER[k][0]) + '</button>').join('')
    + '</div></div>'
    + '<div class="tr-g"><span class="tr-g-l">State</span><select id="bkState"><option value="">Anywhere</option>'
    +   MAP_STATES.map(s => '<option value="' + s[0] + '"' + (TR_BUCKET.st === s[0] ? ' selected' : '') + '>' + plEsc(s[1]) + '</option>').join('')
    + '</select></div></div>';

  h += '<p class="pg-note">' + hits.length + ' to do' + (TR_BUCKET.cat ? ' · ' + plEsc(BUCKET_CAT[TR_BUCKET.cat][1]) : '') + '</p>';
  if (!hits.length) return h + '<div class="pg-empty"><p>Nothing with that combination.</p></div>';

  h += '<div class="bk-grid">' + hits.map(b => {
    const place = b[2] && placeGet(b[2]);
    return '<article class="bk">'
      + '<div class="bk-top"><span class="bk-cat">' + plEsc(BUCKET_CAT[b[4]][0]) + '</span>'
      + '<span class="bk-price" title="' + plEsc(BUCKET_PRICE[b[5]][1]) + '">' + plEsc(BUCKET_PRICE[b[5]][0]) + '</span></div>'
      + '<h3>' + plEsc(b[1]) + '</h3>'
      + '<p>' + plEsc(b[7]) + '</p>'
      + '<div class="bk-foot">'
      +   '<span class="bk-when">' + plEsc(b[6]) + '</span>'
      +   (place ? '<a href="#/place/' + b[2] + '">' + plEsc(place.name) + '</a>' : '')
      +   '<a href="' + plEsc(b[8]) + '" target="_blank" rel="noopener">Official ↗</a>'
      + '</div>'
      + (place ? '<button class="pg-btn pg-btn-s bk-add" data-add="' + b[2] + '">+ Add to a trip</button>' : '')
      + '</article>';
  }).join('') + '</div>';
  return h;
}
