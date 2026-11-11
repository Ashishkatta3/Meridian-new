/* ===========================================================
   GEOGRAPHY & TIME HELPERS

   Pure functions, no DOM. Distance and drive time between places,
   the local time where a place is, and a plain-language best-time
   -to-visit guess. Nothing here needs the network or a key — it all
   runs off the coordinates already in places.js.
   =========================================================== */

/* one primary IANA zone per state — enough to show the local clock,
   with the understanding that a few states straddle a line */
const STATE_TZ = {
  AL:'America/Chicago',AK:'America/Anchorage',AZ:'America/Phoenix',AR:'America/Chicago',
  CA:'America/Los_Angeles',CO:'America/Denver',CT:'America/New_York',DE:'America/New_York',
  DC:'America/New_York',FL:'America/New_York',GA:'America/New_York',HI:'Pacific/Honolulu',
  ID:'America/Boise',IL:'America/Chicago',IN:'America/Indiana/Indianapolis',IA:'America/Chicago',
  KS:'America/Chicago',KY:'America/New_York',LA:'America/Chicago',ME:'America/New_York',
  MD:'America/New_York',MA:'America/New_York',MI:'America/Detroit',MN:'America/Chicago',
  MS:'America/Chicago',MO:'America/Chicago',MT:'America/Denver',NE:'America/Chicago',
  NV:'America/Los_Angeles',NH:'America/New_York',NJ:'America/New_York',NM:'America/Denver',
  NY:'America/New_York',NC:'America/New_York',ND:'America/Chicago',OH:'America/New_York',
  OK:'America/Chicago',OR:'America/Los_Angeles',PA:'America/New_York',RI:'America/New_York',
  SC:'America/New_York',SD:'America/Chicago',TN:'America/Chicago',TX:'America/Chicago',
  UT:'America/Denver',VT:'America/New_York',VA:'America/New_York',WA:'America/Los_Angeles',
  WV:'America/New_York',WI:'America/Chicago',WY:'America/Denver'
};

const STATE_NAME = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',
  DE:'Delaware',DC:'Washington, D.C.',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',
  IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',
  MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',
  NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',
  NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',
  RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',
  VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'
};

function stateName(abbr){ return STATE_NAME[abbr] || abbr; }

/* current local time where a place is, e.g. "3:14 PM CST" */
function localTimeOf(abbr){
  const tz = STATE_TZ[abbr];
  if (!tz) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: tz
    }).format(new Date());
  } catch(e){ return ''; }
}

/* great-circle miles between two lat/lon points */
function haversine(aLat, aLon, bLat, bLon){
  const R = 3958.8, toR = Math.PI / 180;
  const dLat = (bLat - aLat) * toR, dLon = (bLon - aLon) * toR;
  const s = Math.sin(dLat/2)**2 + Math.cos(aLat*toR)*Math.cos(bLat*toR)*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/* roads are not straight and you do not drive 60 the whole way, so
   pad the straight-line distance and divide by a realistic average */
function driveHours(miles){ return miles * 1.25 / 58; }

function fmtDrive(h){
  if (h < 1) return Math.round(h * 60) + ' min';
  const hr = Math.floor(h), m = Math.round((h - hr) * 60);
  return m ? hr + ' hr ' + m + ' min' : hr + ' hr';
}

/* places you could reasonably drive to from here: same state, or
   within maxHours by road. Sorted nearest first. */
function drivablePlaces(id, maxHours, limit){
  maxHours = maxHours || 8;
  const me = placeGet(id); if (!me) return [];
  const out = [];
  for (const oid of PLACE_IDS){
    if (oid === id) continue;
    const o = placeGet(oid); if (!o) continue;
    const miles = haversine(me.lat, me.lon, o.lat, o.lon);
    const hours = driveHours(miles);
    if (o.abbr === me.abbr || hours <= maxHours){
      out.push({ id: oid, name: o.name, abbr: o.abbr, kind: o.kind, miles: miles, hours: hours });
    }
  }
  out.sort((a, b) => a.hours - b.hours);
  return limit ? out.slice(0, limit) : out;
}

/* nearest places regardless of state line, for the little map */
function nearbyPlaces(id, limit){
  const me = placeGet(id); if (!me) return [];
  return PLACE_IDS.filter(o => o !== id).map(oid => {
    const o = placeGet(oid);
    return { id: oid, name: o.name, kind: o.kind, lat: o.lat, lon: o.lon,
             miles: haversine(me.lat, me.lon, o.lat, o.lon) };
  }).sort((a, b) => a.miles - b.miles).slice(0, limit || 8);
}

/* ---- best time to visit: a general, honest guess from region + kind ---- */
const STATE_REGION = {
  FL:'subtropical',HI:'tropical',LA:'gulf',MS:'gulf',AL:'gulf',GA:'south',SC:'south',NC:'south',TX:'south',
  AZ:'desert',NM:'desert',NV:'desert',UT:'mountain',CO:'mountain',WY:'mountain',MT:'mountain',ID:'mountain',
  CA:'west',OR:'pacnw',WA:'pacnw',AK:'alaska',
  ME:'northeast',NH:'northeast',VT:'northeast',MA:'northeast',RI:'northeast',CT:'northeast',NY:'northeast',
  NJ:'northeast',PA:'northeast',MD:'northeast',DE:'northeast',DC:'northeast',WV:'northeast',VA:'northeast',
  OH:'midwest',MI:'midwest',IN:'midwest',IL:'midwest',WI:'midwest',MN:'midwest',IA:'midwest',MO:'midwest',
  KS:'midwest',NE:'midwest',ND:'midwest',SD:'midwest',KY:'midwest',TN:'south',AR:'south',OK:'south'
};
function bestTimeOf(place){
  const r = STATE_REGION[place.abbr] || 'midwest';
  const k = place.kind;
  if (k === 'beach') {
    if (r === 'tropical' || r === 'subtropical') return 'Year-round; winter and spring are driest and least humid.';
    if (r === 'gulf' || r === 'south') return 'May to October for swimming; spring and fall dodge the worst heat.';
    return 'June to September — the only stretch warm enough for the water.';
  }
  if (k === 'np' || k === 'forest' || k === 'canyon' || k === 'falls' || k === 'rec') {
    if (r === 'desert') return 'Spring (Mar–May) and fall (Oct–Nov); summer is dangerously hot.';
    if (r === 'mountain') return 'July to September for high country; roads and trails open late after snow.';
    if (r === 'alaska') return 'Mid-June to early September — the short window when everything is open.';
    if (r === 'tropical') return 'Year-round; the dry season (Apr–Oct) is the surer bet.';
    return 'Late spring and early fall — mild, green, and ahead of the crowds.';
  }
  // cities, monuments, historic, lakes, regions
  if (r === 'desert') return 'October to April; summer in the low desert is brutal.';
  if (r === 'subtropical' || r === 'gulf' || r === 'tropical') return 'November to April — warm, dry, and comfortable.';
  if (r === 'alaska') return 'June to August for long days and open roads.';
  return 'Late spring (May–Jun) and fall (Sep–Oct) — the mildest, prettiest months.';
}
