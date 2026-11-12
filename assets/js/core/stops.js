/* ===========================================================
   STOPS

   A trip is a list of stop ids. Two kinds of thing can be a stop:

     "CA-san-francisco"      a place — a city, a park, a shore
     "CA-san-francisco#3"    the 4th attraction inside that place

   Keeping both as plain strings means a trip stays a flat array of
   ids, so nothing in the planner, the storage or the eventual
   database has to know the difference. Everything that needs to
   show a stop calls stopInfo() and gets the same shape back.

   An attraction has no coordinates of its own, so it borrows its
   city's — close enough for a drive estimate between stops, and
   honest, since you are driving to the city either way.
   =========================================================== */

function stopIsSpot(sid){ return typeof sid === 'string' && sid.indexOf('#') !== -1 && sid.slice(0, 2) !== 'x:'; }
function stopIsCustom(sid){ return typeof sid === 'string' && sid.slice(0, 2) === 'x:'; }

/* A place found outside the atlas carries its own details INSIDE its
   id, encoded. That keeps a trip a flat list of strings, so a custom
   stop survives storage, export and — importantly — sharing, with no
   extra table and nothing for the other person to be missing. */
function customId(name, lat, lon, sub){
  const json = JSON.stringify({ n: name, la: +(+lat).toFixed(5), lo: +(+lon).toFixed(5), a: sub || '' });
  return 'x:' + btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function customData(sid){
  try {
    let b = sid.slice(2).replace(/-/g, '+').replace(/_/g, '/');
    while (b.length % 4) b += '=';
    return JSON.parse(decodeURIComponent(escape(atob(b))));
  } catch(e){ return null; }
}

function spotId(placeId, index){ return placeId + '#' + index; }

/* { kind, id, name, sub, lat, lon, photoId, href } or null */
function stopInfo(sid){
  if (!sid) return null;

  if (stopIsCustom(sid)){
    const d = customData(sid);
    if (!d) return null;
    return { kind: 'custom', id: sid, name: d.n, sub: d.a || 'Found on the map',
             lat: d.la, lon: d.lo, photoId: null, parent: sid,
             href: 'https://www.google.com/maps/search/?api=1&query=' + d.la + ',' + d.lo };
  }

  if (!stopIsSpot(sid)){
    const p = placeGet(sid);
    if (!p) return null;
    return { kind: 'place', id: sid, name: p.name, sub: stateName(p.abbr),
             lat: p.lat, lon: p.lon, photoId: sid, href: '#/place/' + sid, parent: sid };
  }

  const bits = sid.split('#');
  const p = placeGet(bits[0]);
  const list = (typeof SPOTS !== 'undefined' && SPOTS[bits[0]]) || [];
  const s = list[+bits[1]];
  if (!p || !s) return null;
  return { kind: 'spot', id: sid, name: s[0], sub: p.name + ', ' + stateName(p.abbr),
           lat: p.lat, lon: p.lon,
           /* no picture of its own yet, so it shows its city's */
           photoId: bits[0], href: '#/place/' + bits[0], parent: bits[0], note: s[1] || '' };
}

/* what to paint a photo from — a spot falls back to its city */
function stopPhotoPlace(sid){
  const i = stopInfo(sid);
  return i ? placeGet(i.photoId) : null;
}
