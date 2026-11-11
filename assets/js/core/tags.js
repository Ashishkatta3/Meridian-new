/* ===========================================================
   DERIVED TAGS

   places.js carries explicit tags, but most rows have few or none —
   and nothing free will tell you that Zion is "mountain" or that
   New Orleans is a food town. So the geography and known-for tags
   are worked out here, at runtime, from what IS reliable: the kind
   of place, the state, and the name. Explicit tags in places.js
   always win; these only fill the gaps.

   Be clear about what each axis is worth:
     land  — geography. Derived from kind and name, so it is solid.
     flags — what a place is known for. Partly objective (a national
             park has trails), partly curated name lists below.
     who   — who a trip suits. There is no free data for this at all,
             so it is a rule of thumb over the other two axes, and
             the Trips page labels it as a suggestion, not a fact.

   tagsOf(place) -> { land:[], flags:[], who:[] }
   =========================================================== */

const T_MOUNTAIN = /\b(mount|mt\.?|peak|range|sierra|rocky|teton|glacier|cascade|smoky|alpine|summit|ridge|pass|aspen|vail|breckenridge|telluride|jackson|whitefish|stowe|tahoe|shasta|rainier|olympic|denali|whitney|sawtooth|bitterroot|wasatch|uinta|adirondack|catskill|berkshire|appalachian|blue ridge)\b/i;
const T_DESERT   = /\b(desert|dune|joshua|death valley|saguaro|white sands|mojave|sonoran|arches|canyonlands|zion|moab|bryce|capitol reef|petrified|organ pipe|chiricahua|big bend|guadalupe|carlsbad)\b/i;
const T_VOLCANIC = /\b(volcan|crater|lava|caldera|geyser|hot spring|yellowstone|rainier|st\.? helens|lassen|haleakal|kilauea|mauna|craters of the moon)\b/i;
const T_ISLAND   = /\b(island|isle|key|keys|nantucket|martha|catalina|san juan|outer banks|mackinac|padre|assateague|chincoteague|fire island)\b/i;
/* "bay" and "sands" are deliberately NOT here: they drag in Glacier Bay
   (a tidewater glacier) and White Sands (a gypsum desert). Both are
   covered correctly by the water and desert patterns instead. */
const T_BEACH    = /\b(beach|shore|seashore|coast|cape|gulf|surf|pier|boardwalk)\b/i;
const T_WATER    = /\b(lake|river|falls|bay|sound|bayou|everglade|okefenokee|reservoir|gorge|springs|voyageurs|boundary waters)\b/i;
const T_FOREST   = /\b(forest|woods|redwood|sequoia|cypress|pine|grove|smoky|olympic|congaree)\b/i;
const T_CANYON   = /\b(canyon|gorge|chasm|badlands|bluff|palo duro)\b/i;

const MOUNTAIN_STATES = ['CO','UT','WY','MT','ID','AK','NV','NH','VT'];
const DESERT_STATES   = ['AZ','NM','NV','UT'];

/* curated: things no rule can infer */
const T_DARKSKY = ['big bend','death valley','joshua tree','arches','canyonlands','bryce','capitol reef','great basin','natural bridges','chaco','grand canyon','dinosaur','craters of the moon','voyageurs','cherry springs','big cypress','mesa verde','black canyon','great sand dunes','badlands','theodore roosevelt'];
const T_WILDLIFE = ['yellowstone','denali','katmai','everglades','grand teton','channel islands','olympic','kenai fjords','big bend','rocky mountain','acadia','glacier','isle royale','dry tortugas','padre','assateague','chincoteague'];
const T_WINTER   = ['aspen','vail','breckenridge','park city','jackson','stowe','tahoe','taos','telluride','big sky','steamboat','whitefish','sun valley','mammoth','killington','stratton','sundance','alta','snowbird','jay peak','lake placid'];
const T_FOODTOWN = ['new orleans','charleston','san francisco','new york','chicago','austin','nashville','memphis','santa fe','seattle','portland','los angeles','philadelphia','providence','asheville','savannah','san antonio','miami','honolulu','boston','baltimore','louisville','kansas city','oakland','birmingham','richmond','madison','milwaukee','detroit','minneapolis','pittsburgh','tucson','houston','atlanta','durham','greenville'];
const T_NIGHT    = ['las vegas','new orleans','miami','austin','nashville','new york','chicago','los angeles','atlanta','memphis','savannah','san francisco','san diego','tampa','scottsdale'];
const T_HISTORY  = ['washington','boston','philadelphia','charleston','williamsburg','gettysburg','santa fe','st. augustine','saint augustine','savannah','richmond','montgomery','selma','birmingham','little rock','concord','lexington','jamestown','harpers ferry','vicksburg','antietam','independence','alamo','mount vernon','monticello'];
const T_ROADTRIP = ['big sur','blue ridge','monument valley','route 66','going-to-the-sun','pacific coast','overseas highway','beartooth','million dollar','skyline drive','natchez trace','finger lakes','olympic peninsula'];

const hasWord = (list, name) => { const n = name.toLowerCase(); return list.some(w => n.indexOf(w) !== -1); };
const uniq = a => a.filter((v, i) => a.indexOf(v) === i);

function tagsOf(place){
  if (!place) return { land: [], flags: [], who: [] };
  const n = place.name, k = place.kind, st = place.abbr;
  const land = (place.land || []).slice();
  const flags = (place.flags || []).slice();

  /* ---------- geography ---------- */
  const wild = k !== 'city';
  if (k === 'city') land.push('urban');
  if (k === 'beach' || T_BEACH.test(n)) land.push('beach');
  if (k === 'canyon' || T_CANYON.test(n)) land.push('canyon');
  if (k === 'lake' || k === 'falls' || T_WATER.test(n)) land.push('water');
  if (k === 'forest' || T_FOREST.test(n)) land.push('forest');
  if (T_ISLAND.test(n) || st === 'HI') land.push('island');
  if (T_VOLCANIC.test(n)) land.push('volcanic');
  if (T_DESERT.test(n) || (wild && DESERT_STATES.indexOf(st) !== -1)) land.push('desert');
  if (T_MOUNTAIN.test(n) || (wild && MOUNTAIN_STATES.indexOf(st) !== -1)) land.push('mountain');
  /* a wild place that picked up nothing is still outdoors */
  if (wild && !land.length) land.push('rural');

  /* ---------- known for ---------- */
  if (k === 'np' || k === 'sp' || k === 'forest' || k === 'rec' || k === 'canyon' || k === 'monument'){
    flags.push('hiking'); flags.push('camping');
  }
  if (k === 'historic' || k === 'monument') flags.push('history');
  if (hasWord(T_DARKSKY, n)) flags.push('darksky');
  if (hasWord(T_WILDLIFE, n)) flags.push('wildlife');
  if (hasWord(T_WINTER, n)) flags.push('winter');
  if (hasWord(T_ROADTRIP, n)) flags.push('roadtrip');
  if (k === 'city'){
    if (hasWord(T_FOODTOWN, n)) flags.push('food');
    if (hasWord(T_NIGHT, n)) flags.push('nightlife');
  }
  if (hasWord(T_HISTORY, n)) flags.push('history');
  if (land.indexOf('water') !== -1 || land.indexOf('beach') !== -1) flags.push('water');

  const L = uniq(land), F = uniq(flags);

  /* ---------- who it suits (a rule of thumb, not data) ---------- */
  const who = (place.who || []).slice();
  const p = place.prom || 0;
  const scenic = L.indexOf('mountain') !== -1 || L.indexOf('canyon') !== -1 || L.indexOf('island') !== -1 || L.indexOf('beach') !== -1;
  if (p >= 8 && scenic) who.push('honeymoon');
  if (scenic && p >= 6) who.push('couple');
  if (k === 'np' || k === 'sp' || k === 'rec' || F.indexOf('wildlife') !== -1) who.push('family');
  if (F.indexOf('nightlife') !== -1 || F.indexOf('food') !== -1) who.push('friends');
  /* "solo" only where it means something: a place notable enough to
     be worth going alone. Applied to everything it filters nothing. */
  if (p >= 6 && (F.indexOf('hiking') !== -1 || k === 'city')) who.push('solo');
  if (F.indexOf('nightlife') !== -1 || (k === 'city' && p >= 7)) who.push('group');

  return { land: L, flags: F, who: uniq(who) };
}

/* every place carrying a given tag on any axis, best first */
function placesWithTag(axis, tag){
  return PLACE_IDS.filter(id => {
    const t = tagsOf(placeGet(id));
    return (t[axis] || []).indexOf(tag) !== -1;
  }).sort((a, b) => (placeGet(b).prom || 0) - (placeGet(a).prom || 0));
}
