/* ===========================================================
   LONGFORM — the loader

   Joins the written introductions together and hands them to the
   place page. Split into two files only because one would be
   unwieldy to edit; nothing else cares which file an entry is in.

   longformOf(id) -> [ paragraph, ... ]  or null
   =========================================================== */

function longformOf(id){
  if (typeof LONGFORM_CITIES !== 'undefined' && LONGFORM_CITIES[id]) return LONGFORM_CITIES[id];
  if (typeof LONGFORM_PARKS  !== 'undefined' && LONGFORM_PARKS[id])  return LONGFORM_PARKS[id];
  return null;
}

/* how many places have a written introduction — used by nothing in
   the page, handy when checking coverage from the console */
function longformCount(){
  const a = (typeof LONGFORM_CITIES !== 'undefined') ? Object.keys(LONGFORM_CITIES).length : 0;
  const b = (typeof LONGFORM_PARKS  !== 'undefined') ? Object.keys(LONGFORM_PARKS).length  : 0;
  return a + b;
}
