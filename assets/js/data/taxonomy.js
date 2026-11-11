/* ===========================================================
   TAXONOMY — the controlled vocabulary every place is tagged with.

   Three independent axes, deliberately kept apart:

     KIND   what a place IS.        One per place. Drives the map icon.
     LAND   what it LOOKS like.     Objective. Drives "best beaches",
                                    "best mountain towns" and the like.
     WHO    who it SUITS.           Editorial judgement, not data —
                                    see the honesty note below.
     FLAG   what it is KNOWN for.   Dark skies, camping, food, and so on.

   Why LAND and WHO are separate: a beach town can suit honeymooners or
   families, and the answer is not a property of the geography. Mixing
   the two into one list would make both useless for filtering.

   A note on WHO: these are editorial calls, not measured data. Nothing
   available for free says what share of visitors to Sedona are couples.
   They are applied only where the case is obvious and left off
   everywhere else, so a filter returns a short honest list rather than
   a long invented one.
   =========================================================== */

/* ---------- KIND: one per place, and the map icon follows it ---------- */
const KIND = {
  city:     'City',
  np:       'National park',
  sp:       'State park',
  rec:      'Recreation area',
  forest:   'Preserve',
  monument: 'Monument',
  falls:    'Waterfall',
  beach:    'Seashore',
  canyon:   'Canyon',
  lake:     'Lakeshore',
  region:   'Region',
  historic: 'Historic site'
};

/* ---------- LAND: what you see when you get there ---------- */
const LAND = {
  beach:    ['Beaches',        'Sand, surf and the coast road'],
  mountain: ['Mountains',      'Peaks, passes and alpine air'],
  desert:   ['Desert',         'Red rock, dunes and big silence'],
  forest:   ['Forest',         'Old growth, trails and shade'],
  water:    ['Lakes & rivers', 'Paddling, swimming and shoreline'],
  canyon:   ['Canyons',        'Walls, slots and overlooks'],
  volcanic: ['Volcanic',       'Craters, lava and hot springs'],
  island:   ['Islands',        'Ferries, coastlines and slow time'],
  urban:    ['Cities',         'Museums, food and late nights'],
  rural:    ['Small towns',    'Main streets and back roads']
};

/* ---------- WHO: editorial, applied sparingly ---------- */
const WHO = {
  solo:      ['Solo',       'Easy to do alone, and worth doing alone'],
  couple:    ['Couples',    'Quiet, scenic, unhurried'],
  honeymoon: ['Honeymoon',  'Worth the once-in-a-lifetime budget'],
  family:    ['Families',   'Works with children in tow'],
  group:     ['Groups',     'Better with a crowd'],
  friends:   ['Friends',    'Built for a long weekend with mates']
};

/* ---------- FLAG: what a place is specifically known for ---------- */
const FLAG = {
  darksky:   ['Dark sky',     'Certified or near enough for the Milky Way'],
  camping:   ['Camping',      'Worth sleeping outside for'],
  food:      ['Food town',    'A reason to come on its own'],
  nightlife: ['Nightlife',    'Still going at two in the morning'],
  wildlife:  ['Wildlife',     'Animals you came to see'],
  roadtrip:  ['Road trip',    'The drive is the point'],
  winter:    ['Winter',       'Snow season is the high season'],
  hiking:    ['Hiking',       'Trails worth the boots'],
  water:     ['On the water', 'Boats, paddles and swimming'],
  history:   ['History',      'Something genuinely old happened here'],
  art:       ['Art',          'Galleries and museums worth the trip'],
  music:     ['Music',        'A sound of its own']
};

/* The order these are offered in, most-asked-for first. */
const LAND_ORDER = ['beach','mountain','desert','canyon','forest','water','volcanic','island','urban','rural'];
const WHO_ORDER  = ['couple','family','friends','solo','group','honeymoon'];
const FLAG_ORDER = ['hiking','food','camping','darksky','roadtrip','wildlife','winter','water','history','art','music','nightlife'];

/* Look a tag up without caring which axis it came from. */
function tagLabel(t){
  if (LAND[t]) return LAND[t][0];
  if (WHO[t])  return WHO[t][0];
  if (FLAG[t]) return FLAG[t][0];
  if (KIND[t]) return KIND[t];
  return t;
}
function tagNote(t){
  if (LAND[t]) return LAND[t][1];
  if (WHO[t])  return WHO[t][1];
  if (FLAG[t]) return FLAG[t][1];
  return '';
}

/* Geography follows from what a place is, so this much can be inferred
   rather than asserted. Anything beyond it is hand-applied. */
const LAND_FROM_KIND = {
  np: [], sp: [], city: ['urban'], beach: ['beach'], canyon: ['canyon','desert'],
  falls: ['water','forest'], lake: ['water'], rec: ['water'], forest: ['forest'],
  monument: [], historic: [], region: []
};
