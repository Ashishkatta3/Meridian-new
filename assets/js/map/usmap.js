/* ===========================================================
   THE US MAP

   An SVG map of the United States with every place in the atlas
   on it. Drag to move, scroll or pinch to zoom, tap a marker to
   open it.

   Two decisions worth knowing about:

   1. Density is tied to zoom. Four hundred markers at once is a
      wall of pins, so each place carries a prominence 1-10 and
      the map only shows what fits the zoom level. Zoom in and
      the country fills in. Anything you have marked is always
      drawn, at every zoom, because those are yours.

   2. Panning costs nothing. Markers live inside the transformed
      group, so a drag moves one element rather than four hundred.
      Only a zoom touches the markers, to keep them the same size
      on screen as the country grows underneath them.

   Needs: data/geo.us.js, map/icons.js, core/state.js
   =========================================================== */

const UM_MIN = 1, UM_MAX = 14;

/* How prominent a place has to be to earn a marker at this zoom. */
function umFloor(k){
  return k < 1.6 ? 8 : k < 2.6 ? 7 : k < 4 ? 6 : k < 6 ? 5 : 0;
}

/* How wide a marker should be on the actual screen, in real pixels.
   Not in map units — the svg scales itself to whatever box it is given,
   so a marker sized in map units comes out fine on a laptop and about
   eight pixels across on a phone. This is the size people see. */
const UM_PIN_UNITS = 22;        /* the marker's own drawn width */

/* A marker that reads well on a laptop is overbearing on a phone, where
   the whole country is only a few hundred pixels across. */
function umPinPx(){
  return (typeof window !== 'undefined' && window.innerWidth < 760) ? 21 : 26;
}

/* One normalised list, joining geometry (MAP_XY, generated) to the
   attributes (PLACES, hand-edited). Built once at load, so a name or a
   prominence is only ever written down in one file. */
const UM_LIST = (function(){
  if (typeof MAP_XY === 'undefined' || typeof PLACES === 'undefined') return [];
  return Object.keys(MAP_XY).map(id => {
    const p = PLACES[id], xy = MAP_XY[id];
    if (!p) return null;
    return { id:id, name:p[0], abbr:p[1], kind:p[2], prom:p[5],
             land:p[6], who:p[7], flags:p[8], x:xy[0], y:xy[1] };
  }).filter(Boolean);
})();

const UM_BY_ID = (function(){
  const m = {};
  UM_LIST.forEach(p => m[p.id] = p);
  return m;
})();

const UM_STATE_NAME = (function(){
  const m = {};
  if (typeof MAP_STATES !== 'undefined') MAP_STATES.forEach(s => m[s[0]] = s[1]);
  return m;
})();

/* how much the atlas knows about a place, for the card */
function umThings(id){
  return (typeof SPOTS !== 'undefined' && SPOTS[id]) ? SPOTS[id].length : 0;
}

function umEsc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ---------- markup ---------- */

function usMapHTML(opts){
  opts = opts || {};
  const h = opts.height || 560;
  const W = MAP_VIEW[0], H = MAP_VIEW[1];

  const states = MAP_STATES.map(s =>
    '<path class="um-state" data-st="' + s[0] + '" d="' + s[2] + '"><title>' + umEsc(s[1]) + '</title></path>'
  ).join('');

  const labels = MAP_STATES.map(s =>
    '<text class="um-stlab" x="' + s[3] + '" y="' + s[4] + '">' + s[0] + '</text>'
  ).join('');

  const legend = PLACE_ORDER.slice(0, 8).map(t =>
      '<span class="um-key">'
    +   '<svg viewBox="-12 -12 24 24" class="um-keyi">' + placeIcon(t, 20) + '</svg>'
    +   umEsc(PLACE_LABEL[t])
    + '</span>'
    ).join('')
    + '<span class="um-key um-key-been"><i></i>Been</span>'
    + '<span class="um-key um-key-want"><i></i>Want to go</span>';

  return ''
  + '<div class="umap" data-umap style="--umh:' + h + 'px">'
  +   '<div class="um-bar">'
  +     '<span class="um-chips" role="group" aria-label="Filter places">'
  +       '<button type="button" class="um-chip is-on" data-umf="all">All</button>'
  +       '<button type="button" class="um-chip" data-umf="been">Been</button>'
  +       '<button type="button" class="um-chip" data-umf="want">Want to go</button>'
  +     '</span>'
  +     '<span class="um-zoom">'
  +       '<button type="button" data-umz="out" aria-label="Zoom out">&minus;</button>'
  +       '<button type="button" data-umz="in" aria-label="Zoom in">+</button>'
  +       '<button type="button" data-umz="reset" aria-label="Reset the map">Reset</button>'
  +     '</span>'
  +   '</div>'

  +   '<div class="um-stage">'
  +     '<svg class="um-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map of the United States">'
  +       '<defs>'
  +         '<filter id="umGlow" x="-60%" y="-60%" width="220%" height="220%">'
  +           '<feGaussianBlur stdDeviation="2.4" result="b"/>'
  +           '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>'
  +         '</filter>'
  +       '</defs>'
  +       '<g class="um-world">'
  +         '<g class="um-land">' + states + '</g>'
  +         '<g class="um-labels">' + labels + '</g>'
  +         '<g class="um-pins"></g>'
  +       '</g>'
  +     '</svg>'
  +     '<div class="um-hint" data-umhint>Drag to move · pinch or scroll to zoom</div>'
  +     '<div class="um-card" data-umcard hidden></div>'
  +   '</div>'

  +   '<div class="um-legend">' + legend + '</div>'
  + '</div>';
}

/* ---------- behaviour ---------- */

function wireUsMap(root, opts){
  const el = (root || document).querySelector('[data-umap]');
  if (!el || el.__wired) return;
  el.__wired = true;
  opts = opts || {};

  const svg   = el.querySelector('.um-svg');
  const world = el.querySelector('.um-world');
  const pins  = el.querySelector('.um-pins');
  const card  = el.querySelector('[data-umcard]');
  const hint  = el.querySelector('[data-umhint]');
  const W = MAP_VIEW[0], H = MAP_VIEW[1];

  let k = 1, tx = 0, ty = 0;      // the view
  let filter = 'all';
  let lastFloor = -1, frame = 0;

  /* --- view maths --- */
  const clamp = () => {
    k = Math.max(UM_MIN, Math.min(UM_MAX, k));
    tx = Math.max(W - W * k, Math.min(0, tx));
    ty = Math.max(H - H * k, Math.min(0, ty));
  };
  const apply = () => {
    world.setAttribute('transform', 'translate(' + tx.toFixed(2) + ',' + ty.toFixed(2) + ') scale(' + k.toFixed(4) + ')');
    el.classList.toggle('is-zoomed', k > 1.05);
  };
  /* client pixel -> the svg's own coordinates */
  const toSvg = (cx, cy) => {
    const r = svg.getBoundingClientRect();
    const sc = Math.min(r.width / W, r.height / H);          // preserveAspectRatio: meet
    return { x: (cx - r.left - (r.width - W * sc) / 2) / sc,
             y: (cy - r.top  - (r.height - H * sc) / 2) / sc };
  };
  const zoomAt = (nk, px, py) => {
    const prev = k;
    k = Math.max(UM_MIN, Math.min(UM_MAX, nk));
    if (k === prev) return;
    tx = px - ((px - tx) / prev) * k;
    ty = py - ((py - ty) / prev) * k;
    clamp(); apply(); schedule();
  };

  /* --- markers --- */
  /* Which markers to draw, and — just as importantly — which to leave
     out. Two places a mile apart would otherwise stack into one
     unreadable blob where tapping gets you the wrong one, so the more
     prominent of any overlapping pair wins its spot and the other waits
     until you zoom in far enough to separate them. Your own marked
     places take precedence over everything. */
  const visible = () => {
    const floor = umFloor(k);
    const mk = p => markOf(p.id) ? 1 : 0;

    const cand = UM_LIST.filter(p => {
      const mark = markOf(p.id);
      if (filter === 'been') return mark === 'been';
      if (filter === 'want') return mark === 'want';
      return mark || p.prom >= floor;        // yours always, others by prominence
    }).sort((a, b) => (mk(b) - mk(a)) || (b.prom - a.prom));

    /* keep roughly one marker's width between any two, measured on screen */
    const gap  = (umPinPx() * 0.92) / (k * unit());
    const gap2 = gap * gap;
    const grid = new Map();                   // coarse buckets, so this stays fast as the atlas grows
    const out  = [];

    for (let i = 0; i < cand.length; i++){
      const p = cand[i];
      const gx = Math.floor(p.x / gap), gy = Math.floor(p.y / gap);
      let clash = false;
      for (let dx = -1; dx <= 1 && !clash; dx++){
        for (let dy = -1; dy <= 1 && !clash; dy++){
          const bucket = grid.get((gx + dx) + ':' + (gy + dy));
          if (!bucket) continue;
          for (let j = 0; j < bucket.length; j++){
            const q = bucket[j], ex = q.x - p.x, ey = q.y - p.y;
            if (ex * ex + ey * ey < gap2){ clash = true; break; }
          }
        }
      }
      if (clash) continue;
      out.push(p);
      const key = gx + ':' + gy;
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(p);
    }

    /* paint your places last so they sit on top of the context */
    return out.sort((a, b) => mk(a) - mk(b));
  };

  /* how many screen pixels one map unit currently occupies.
     preserveAspectRatio="meet" means the smaller of the two fits. */
  const unit = () => {
    const r = svg.getBoundingClientRect();
    return Math.min(r.width / W, r.height / H) || 1;
  };
  /* the scale each marker needs so it lands at UM_PIN_PX on screen,
     whatever the zoom and whatever size the map is being drawn at */
  const pinScale = () => umPinPx() / (UM_PIN_UNITS * k * unit());

  const draw = () => {
    const s = pinScale().toFixed(4);
    const list = visible();
    pins.innerHTML = list.map(p => {
      const mark = markOf(p.id);
      return '<g class="um-pin' + (mark ? ' is-' + mark : '') + '" data-pid="' + umEsc(p.id) + '"'
           + ' transform="translate(' + p.x + ',' + p.y + ') scale(' + s + ')">'
           +   '<circle class="um-hit" r="17"/>'
           +   '<circle class="um-dot" r="11"/>'
           +   '<g class="um-gl">' + placeIcon(p.kind, 15) + '</g>'
           + '</g>';
    }).join('');
    lastFloor = umFloor(k);
    pins.dataset.n = list.length;
  };

  /* on zoom the markers only need resizing, which is far cheaper than
     rebuilding them — unless the zoom crossed a density threshold */
  const resize = () => {
    if (umFloor(k) !== lastFloor) { draw(); return; }
    const s = 'scale(' + pinScale().toFixed(4) + ')';
    const nodes = pins.children;
    for (let i = 0; i < nodes.length; i++){
      const t = nodes[i].getAttribute('transform');
      nodes[i].setAttribute('transform', t.replace(/scale\([^)]*\)/, s));
    }
  };
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; resize(); });
  };

  /* --- the card --- */
  const openCard = id => {
    const p = UM_BY_ID[id];
    if (!p) return;
    const mark = markOf(id);
    card.innerHTML = ''
      + '<button class="um-x" type="button" data-umclose aria-label="Close">&times;</button>'
      + '<span class="um-ct">'
      +   '<span class="um-cp" data-umphoto></span>'
      +   '<span><b>' + umEsc(p.name) + '</b>'
      +   '<i>' + umEsc(PLACE_LABEL[p.kind] || '') + ' · ' + umEsc(UM_STATE_NAME[p.abbr] || p.abbr)
      +     (umThings(p.id) ? ' · ' + umThings(p.id) + ' things to do' : '') + '</i></span>'
      + '</span>'
      + '<span class="um-cb">'
      +   '<button type="button" class="um-mk' + (mark === 'been' ? ' is-on' : '') + '" data-ummk="been" data-pid="' + umEsc(id) + '">Been</button>'
      +   '<button type="button" class="um-mk' + (mark === 'want' ? ' is-on' : '') + '" data-ummk="want" data-pid="' + umEsc(id) + '">Want to go</button>'
      +   '<button type="button" class="um-open" data-umopen="' + umEsc(id) + '">Open</button>'
      + '</span>';
    card.hidden = false;
    el.classList.add('has-card');
    /* the picture is fetched only once a place is actually opened */
    const shot = card.querySelector('[data-umphoto]');
    if (shot && typeof paintPhoto === 'function') paintPhoto(shot, p);
  };
  const closeCard = () => { card.hidden = true; el.classList.remove('has-card'); };

  /* --- pointer: drag to pan, click to pick --- */
  let down = false, moved = 0, lx = 0, ly = 0, hitTarget = null;

  svg.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' && e.isPrimary === false) return;
    down = true; moved = 0; lx = e.clientX; ly = e.clientY;
    /* Capturing the pointer keeps a drag alive past the edge of the map,
       but it also re-targets pointerup to the svg itself — so whatever was
       actually pressed has to be remembered now or it is lost. */
    hitTarget = e.target;
    svg.setPointerCapture(e.pointerId);
    el.classList.add('is-drag');
  });
  svg.addEventListener('pointermove', e => {
    if (!down || pinching) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    moved += Math.abs(dx) + Math.abs(dy);
    lx = e.clientX; ly = e.clientY;
    const r = svg.getBoundingClientRect();
    const sc = Math.min(r.width / W, r.height / H);
    tx += dx / sc; ty += dy / sc;
    clamp(); apply();
    if (hint) hint.classList.add('is-gone');
  });
  const release = e => {
    if (!down) return;
    down = false;
    el.classList.remove('is-drag');
    try { svg.releasePointerCapture(e.pointerId); } catch(_){}
    if (moved > 8) return;                       // that was a drag, not a tap
    const t = hitTarget;
    hitTarget = null;
    if (!t || !t.closest) { closeCard(); return; }
    const pin = t.closest('.um-pin');
    if (pin) { openCard(pin.dataset.pid); return; }
    const st = t.closest('.um-state');
    if (st) {
      /* a caller that wants state pages takes the tap; with no
         handler the map just zooms to the state as it always did */
      if (opts.onState) opts.onState(st.dataset.st);
      else focusState(st.dataset.st);
      return;
    }
    closeCard();
  };
  svg.addEventListener('pointerup', release);
  svg.addEventListener('pointercancel', () => { down = false; el.classList.remove('is-drag'); });

  /* --- wheel --- */
  svg.addEventListener('wheel', e => {
    e.preventDefault();
    const p = toSvg(e.clientX, e.clientY);
    zoomAt(k * (e.deltaY < 0 ? 1.18 : 1 / 1.18), p.x, p.y);
    if (hint) hint.classList.add('is-gone');
  }, { passive:false });

  /* --- pinch --- */
  let pinching = false, pd0 = 0, pk0 = 1;
  const dist = t => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  const mid  = t => ({ x:(t[0].clientX + t[1].clientX)/2, y:(t[0].clientY + t[1].clientY)/2 });

  svg.addEventListener('touchstart', e => {
    if (e.touches.length === 2){
      pinching = true; down = false;
      pd0 = dist(e.touches); pk0 = k;
      if (hint) hint.classList.add('is-gone');
    }
  }, { passive:true });

  svg.addEventListener('touchmove', e => {
    if (!pinching || e.touches.length !== 2) return;
    e.preventDefault();
    const m = mid(e.touches), p = toSvg(m.x, m.y);
    zoomAt(pk0 * (dist(e.touches) / pd0), p.x, p.y);
  }, { passive:false });

  svg.addEventListener('touchend', e => {
    if (e.touches.length < 2) pinching = false;
  }, { passive:true });

  /* double tap / double click to zoom in */
  svg.addEventListener('dblclick', e => {
    e.preventDefault();
    const p = toSvg(e.clientX, e.clientY);
    zoomAt(k * 1.9, p.x, p.y);
  });

  /* --- zoom to a state --- */
  function focusState(abbr){
    const s = MAP_STATES.find(x => x[0] === abbr);
    if (!s) return;
    const b = s[5];                                   // [x0,y0,x1,y1]
    const w = Math.max(12, b[2] - b[0]), h = Math.max(12, b[3] - b[1]);
    k = Math.max(UM_MIN, Math.min(UM_MAX, Math.min(W / w, H / h) * 0.78));
    tx = W / 2 - ((b[0] + b[2]) / 2) * k;
    ty = H / 2 - ((b[1] + b[3]) / 2) * k;
    clamp(); apply(); draw();
    if (hint) hint.classList.add('is-gone');
    if (opts.onState) opts.onState(abbr);
  }

  /* --- chrome --- */
  el.addEventListener('click', e => {
    const f = e.target.closest('[data-umf]');
    if (f){
      filter = f.dataset.umf;
      el.querySelectorAll('[data-umf]').forEach(b => b.classList.toggle('is-on', b === f));
      draw(); return;
    }
    const z = e.target.closest('[data-umz]');
    if (z){
      if (z.dataset.umz === 'reset'){ k = 1; tx = 0; ty = 0; clamp(); apply(); draw(); closeCard(); }
      else zoomAt(k * (z.dataset.umz === 'in' ? 1.6 : 1 / 1.6), W / 2, H / 2);
      return;
    }
    if (e.target.closest('[data-umclose]')) { closeCard(); return; }

    const mk = e.target.closest('[data-ummk]');
    if (mk){
      const id = mk.dataset.pid, want = mk.dataset.ummk;
      setMark(id, markOf(id) === want ? '' : want);
      openCard(id); draw(); return;
    }
    const op = e.target.closest('[data-umopen]');
    if (op && opts.onPick){ opts.onPick(op.dataset.umopen, UM_BY_ID[op.dataset.umopen]); return; }
  });

  /* keyboard, so the map is not mouse-only */
  svg.setAttribute('tabindex', '0');
  svg.addEventListener('keydown', e => {
    const step = 60 / k;
    if (e.key === 'ArrowLeft')  { tx += step; }
    else if (e.key === 'ArrowRight'){ tx -= step; }
    else if (e.key === 'ArrowUp')   { ty += step; }
    else if (e.key === 'ArrowDown') { ty -= step; }
    else if (e.key === '+' || e.key === '=') { zoomAt(k * 1.4, W/2, H/2); return; }
    else if (e.key === '-') { zoomAt(k / 1.4, W/2, H/2); return; }
    else if (e.key === 'Escape'){ closeCard(); return; }
    else return;
    e.preventDefault(); clamp(); apply();
  });

  document.addEventListener('marks:changed', () => draw());

  /* turning a phone sideways changes how many pixels a map unit is worth,
     so the markers have to be re-sized for the new box */
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { clamp(); apply(); resize(); }, 140);
  });

  clamp(); apply(); draw();

  /* let callers drive it */
  el.__map = { focusState: focusState,
    reset: () => { k = 1; tx = 0; ty = 0; clamp(); apply(); draw(); } };
  return el.__map;
}
