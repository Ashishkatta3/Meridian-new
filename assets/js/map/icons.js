/* ===========================================================
   PLACE ICONS

   One glyph per kind of place, so the map reads at a glance:
   a pine means a park, a skyline means a city, a wave means a
   shore. All drawn as strokes in a 24x24 box so they stay crisp
   at any zoom and inherit colour from the marker around them.

   Keys match the `type` field in MAP_PLACES.
   =========================================================== */

const PLACE_ICON = {

  /* a skyline, three buildings of different heights */
  city: 'M3 21h18M5 21V12h4.5v9M9.5 21V7l6-3.2V21M15.5 21v-6H19v6',

  /* national park: a peak with a smaller one behind it */
  np: 'M2 20h20M3.5 20l5.5-9 3.2 5M9.5 20l5-11 6 11M13 11.5l1.5-2.5',

  /* state park: a single pine */
  sp: 'M12 21v-3M7.5 18h9L12 10zM9 11h6l-3-5z',

  /* recreation area: open water */
  rec: 'M2 10c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 6.5 0M2 15c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 6.5 0M2 20c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 6.5 0',

  /* preserve: a stand of trees */
  forest: 'M7 21v-2.5M7 18.5l-3.2.0L7 12l3.2 6.5zM16.5 21v-3M16.5 18h-3.8l3.8-7 3.8 7z',

  /* monument: an obelisk on a plinth */
  monument: 'M5 21h14M8 21V9h8v12M8 9l4-6 4 6M10.5 21v-5h3v5',

  /* falls: water over a ledge */
  falls: 'M3 4h7v6M21 4h-7M10 10c0 4-1.5 6-1.5 8M14 4v7c0 4 1.5 5 1.5 7M12 11v9M4 20c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5-0',

  /* seashore: sun over a wave */
  beach: 'M12 4v2M5.6 6.6l1.4 1.4M18.4 6.6L17 8M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 100-7M2 19c2.2-2 4.3-2 6.5 0s4.3 2 6.5 0 4.3-2 6.5 0',

  /* canyon: two walls and the river between */
  canyon: 'M2 21V8l4-3 3.5 4v12M14.5 21V7l3.5-3 4 3v14M9.5 21c0-3 1.5-4 2.5-4s2.5 1 2.5 4',

  /* lakeshore: a body of water with a shore */
  lake: 'M4 9c3-2.5 6.5-2.5 9.5 0s5.5 2 6.5.5M3.5 13.5c3.5-3 7.5-3 11 0s5.5 2 6-0M6 18.5c3-2 6-2 9 0s3.5 1.5 4.5.5',

  /* region: rolling country */
  region: 'M2 18c3.5-6 7-6 10.5 0M11 18c3-5 6-5 11 1M2 21h20',

  /* historic: a columned facade */
  historic: 'M3 21h18M4.5 21V11M9 21V11M15 21V11M19.5 21V11M3 11h18L12 4.5z'
};

/* Small label for the legend and for a marker's card. */
const PLACE_LABEL = {
  city: 'City',            np: 'National park',  sp: 'State park',
  rec: 'Recreation area',  forest: 'Preserve',   monument: 'Monument',
  falls: 'Waterfall',      beach: 'Seashore',    canyon: 'Canyon',
  lake: 'Lakeshore',       region: 'Region',     historic: 'Historic site'
};

/* The order the legend lists them in: the ones people scan for first. */
const PLACE_ORDER = ['city', 'np', 'sp', 'beach', 'canyon', 'falls', 'lake', 'forest', 'rec', 'monument', 'historic', 'region'];

/* Renders one glyph. `size` is in the map's own units before the
   marker counter-scales itself, so it stays the same on screen
   however far in you are zoomed. */
function placeIcon(type, size){
  const d = PLACE_ICON[type] || PLACE_ICON.region;
  const s = (size || 24) / 24;
  return '<g transform="scale(' + s.toFixed(3) + ') translate(-12,-12)">'
       + '<path d="' + d + '"/></g>';
}
