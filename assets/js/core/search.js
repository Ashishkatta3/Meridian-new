/* ===========================================================
   SEARCH

   One index over everything the atlas knows: places AND the
   individual attractions inside them. Searching only places meant
   the 6,000-odd things to do were invisible — you could not look
   for "Space Center" or "Alcatraz", only for the city around it.

   The index is built once, lazily, the first time anyone searches,
   because spots.js is large and most visits never need it.

   searchAll(query, limit) -> [ { id, name, sub, kind, score } ]
   where id is a stop id: "CA-san-francisco" or "CA-san-francisco#3"
   =========================================================== */

let SEARCH_INDEX = null;

function buildSearchIndex(){
  if (SEARCH_INDEX) return SEARCH_INDEX;
  const idx = [];

  PLACE_IDS.forEach(id => {
    const p = placeGet(id);
    if (!p) return;
    idx.push({ id: id, name: p.name, lname: p.name.toLowerCase(),
               sub: stateName(p.abbr), kind: p.kind, prom: p.prom || 1, isPlace: true });
  });

  if (typeof SPOTS !== 'undefined'){
    Object.keys(SPOTS).forEach(pid => {
      const p = placeGet(pid); if (!p) return;
      const sub = p.name + ', ' + stateName(p.abbr);
      SPOTS[pid].forEach((s, i) => {
        if (!s || !s[0]) return;
        idx.push({ id: spotId(pid, i), name: s[0], lname: s[0].toLowerCase(),
                   sub: sub, kind: 'spot', prom: (p.prom || 1) - 2, isPlace: false });
      });
    });
  }
  SEARCH_INDEX = idx;
  return idx;
}

/* Rank: a name that starts with the query beats one that merely
   contains it, a whole place beats an attraction at equal footing,
   and better-known places come first among equals. */
function searchAll(query, limit){
  const q = (query || '').trim().toLowerCase();
  if (q.length < 2) return [];
  const idx = buildSearchIndex();
  const out = [];

  for (let i = 0; i < idx.length; i++){
    const r = idx[i];
    const at = r.lname.indexOf(q);
    if (at === -1) continue;
    let score = at === 0 ? 1000 : 500 - Math.min(at, 100);
    if (r.lname === q) score += 500;
    if (r.isPlace) score += 120;
    score += (r.prom || 0) * 4;
    out.push({ id: r.id, name: r.name, sub: r.sub, kind: r.kind, isPlace: r.isPlace, score: score });
  }
  out.sort((a, b) => b.score - a.score);
  return out.slice(0, limit || 10);
}

/* where a result should take you */
function searchHref(r){
  return r.isPlace ? '#/place/' + r.id : '#/place/' + r.id.split('#')[0];
}
