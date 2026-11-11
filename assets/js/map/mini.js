/* ===========================================================
   MINI MAP

   A small, static map for a place page: the same Albers projection
   as the big map, windowed to the region around one place, with the
   place and its neighbours as clickable pins. No pan or zoom — it is
   a locator, not the main map. It reuses MAP_STATES (outlines) and
   MAP_XY (projected coordinates), so it carries no geometry of its own.
   =========================================================== */

/* viewBox window size in projected units (the big map is 960×600) */
const MINI_W = 300, MINI_H = 200;

function miniMapHTML(id, nearby){
  const c = (typeof MAP_XY !== 'undefined') && MAP_XY[id];
  if (!c) return '';                      // no coordinates → no mini map
  const W = MAP_VIEW[0], H = MAP_VIEW[1];

  // centre the window on the place, but keep it inside the country box
  const cx = Math.max(MINI_W/2, Math.min(W - MINI_W/2, c[0]));
  const cy = Math.max(MINI_H/2, Math.min(H - MINI_H/2, c[1]));
  const vb = (cx - MINI_W/2) + ' ' + (cy - MINI_H/2) + ' ' + MINI_W + ' ' + MINI_H;

  const states = MAP_STATES.map(s =>
    '<path class="mm-state" d="' + s[2] + '"/>'
  ).join('');

  // the place itself, then its neighbours
  const me = placeGet(id);
  let pins = pin(id, c[0], c[1], me ? me.kind : '', me ? me.name : '', true);
  (nearby || []).forEach(n => {
    const p = MAP_XY[n.id];
    if (p) pins += pin(n.id, p[0], p[1], n.kind, n.name, false);
  });

  return '<svg class="mm-svg" viewBox="' + vb + '" role="img" aria-label="Map of places near ' + umEsc(me ? me.name : '') + '">'
       + '<g class="mm-land">' + states + '</g>'
       + '<g class="mm-pins">' + pins + '</g>'
       + '</svg>';
}

function pin(id, x, y, kind, name, isMe){
  const r = isMe ? 5.5 : 3.6;
  const mk = (typeof markOf === 'function') ? markOf(id) : '';
  const cls = 'mm-pin' + (isMe ? ' is-me' : '') + (mk ? ' is-' + mk : '');
  return '<g class="' + cls + '" data-pid="' + id + '" tabindex="0" role="link">'
       + '<circle class="mm-hit" cx="' + x + '" cy="' + y + '" r="9"/>'
       + '<circle class="mm-dot" cx="' + x + '" cy="' + y + '" r="' + r + '"/>'
       + '<title>' + umEsc(name) + '</title>'
       + '</g>';
}
