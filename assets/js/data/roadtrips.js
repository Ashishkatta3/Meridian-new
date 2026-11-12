/* ===========================================================
   ROAD TRIPS

   The drives people plan whole holidays around. Each one lists the
   atlas places it runs through, so a trip can be started from it
   with one tap, and links to the official source — a byway service,
   a park, a state tourism board — rather than to a listicle.

   [ id, name, states, days, miles, bestSeason, blurb, [placeIds], officialURL ]

   Distances and days are the commonly quoted figures for the usual
   route, not a measured path; treat them as planning numbers.
   =========================================================== */

const ROADTRIPS = [
  ['pch', 'Pacific Coast Highway', 'California', '5–7 days', 650, 'Apr–Oct',
   'Highway 1 from the redwoods to the surf, with Big Sur in the middle. Cliffs on one side, ocean on the other, and more pull-outs than you will have time for.',
   ['CA-san-francisco','CA-big-sur-and-point-lobos','CA-santa-barbara','CA-los-angeles','CA-san-diego'],
   'https://www.visitcalifornia.com/experience/highway-1-road-trip/'],

  ['blueridge', 'Blue Ridge Parkway', 'Virginia, North Carolina', '3–5 days', 469, 'Sep–Oct',
   'No trucks, no billboards, no hurry — a 45mph ribbon along the Appalachian crest. Unbeatable in autumn, when the colour runs down the mountain for weeks.',
   ['VA-shenandoah-national-park','NC-asheville','TN-great-smoky-mountains-national-park'],
   'https://www.nps.gov/blri/index.htm'],

  ['route66', 'Route 66', 'Illinois to California', '2–3 weeks', 2448, 'May–Oct',
   'The Mother Road: diners, motels and neon across eight states. Much of it is frontage road now, which is the charm — you are driving the original alignment, not the interstate.',
   ['IL-chicago','MO-st-louis','OK-oklahoma-city','TX-amarillo','NM-albuquerque','AZ-flagstaff','CA-los-angeles'],
   'https://www.nps.gov/subjects/travelroute66/index.htm'],

  ['utah5', 'The Mighty Five', 'Utah', '7–10 days', 800, 'Apr–May, Sep–Oct',
   'Five national parks in one loop — Zion, Bryce, Capitol Reef, Arches, Canyonlands. Red rock in every form the earth can manage, and the finest dark skies in the country.',
   ['UT-zion-national-park','UT-bryce-canyon-national-park','UT-capitol-reef-national-park','UT-arches-national-park','UT-canyonlands-national-park'],
   'https://www.visitutah.com/places-to-go/parks-outdoors/the-mighty-5'],

  ['goingtosun', 'Going-to-the-Sun Road', 'Montana', '1–2 days', 50, 'Jul–Sep',
   'Fifty miles through the heart of Glacier, over Logan Pass. It is only open for a few months a year because the snow takes that long to clear — which tells you what kind of road it is.',
   ['MT-glacier-national-park','MT-whitefish'],
   'https://www.nps.gov/glac/planyourvisit/goingtothesunroad.htm'],

  ['overseas', 'Overseas Highway', 'Florida', '2–3 days', 113, 'Dec–Apr',
   'Key Largo to Key West on 42 bridges, including seven miles of open water. Turquoise on both sides and nowhere to pull over, so take the side roads.',
   ['FL-miami','FL-key-largo','FL-key-west'],
   'https://www.fla-keys.com/overseas-highway/'],

  ['olympic', 'Olympic Peninsula Loop', 'Washington', '4–5 days', 330, 'Jun–Sep',
   'Rainforest, glaciated peaks and wild coastline in a single circle — one of the few drives where the scenery changes completely three times in a day.',
   ['WA-olympic-national-park','WA-port-angeles','WA-seattle'],
   'https://www.nps.gov/olym/planyourvisit/index.htm'],

  ['milliondollar', 'San Juan Skyway', 'Colorado', '2–3 days', 236, 'Jun–Oct',
   'Including the Million Dollar Highway over Red Mountain Pass — no guardrails, 11,000 feet, old mining towns at either end. Not for nervous passengers.',
   ['CO-durango','CO-telluride','CO-ouray','CO-mesa-verde-national-park'],
   'https://www.codot.gov/travel/scenic-byways/southwest/san-juan-skyway'],

  ['natchez', 'Natchez Trace Parkway', 'Mississippi, Alabama, Tennessee', '3–4 days', 444, 'Apr–May, Oct',
   'A 10,000-year-old footpath turned parkway, running quiet and green from Natchez to Nashville. Commercial traffic is banned the whole way.',
   ['TN-nashville','MS-jackson','MS-natchez'],
   'https://www.nps.gov/natr/index.htm'],

  ['acadia', 'Acadia and the Maine Coast', 'Maine', '3–5 days', 290, 'Jun–Oct',
   'Lobster shacks, granite headlands and the first sunrise in the country from Cadillac Mountain. Best just after the summer crowds thin.',
   ['ME-portland','ME-acadia-national-park','ME-bar-harbor'],
   'https://www.nps.gov/acad/index.htm'],

  ['texashill', 'Texas Hill Country', 'Texas', '3–4 days', 300, 'Mar–Apr',
   'Dance halls, barbecue and limestone rivers between Austin and San Antonio. Go in spring, when the bluebonnets take over the roadsides.',
   ['TX-austin','TX-fredericksburg','TX-san-antonio'],
   'https://www.traveltexas.com/places-to-go/regions/hill-country/'],

  ['beartooth', 'Beartooth Highway', 'Montana, Wyoming', '1–2 days', 68, 'Jul–Sep',
   'Switchbacks to nearly 11,000 feet on the way into Yellowstone\'s back door. Snowbanks in July and a view that goes on for a hundred miles.',
   ['WY-yellowstone-national-park','MT-red-lodge'],
   'https://www.fs.usda.gov/main/custergallatin/home']
];

function roadtripGet(id){ return ROADTRIPS.find(r => r[0] === id) || null; }

/* only the stops this atlas actually knows about */
function roadtripStops(rt){ return (rt[7] || []).filter(id => typeof placeGet === 'function' && placeGet(id)); }
