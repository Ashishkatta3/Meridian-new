/* ===========================================================
   THE BUCKET LIST

   Things to do rather than places to be — the ones worth building a
   trip around. Every entry links to the official source (a park
   service page, a reservation system, an observatory, a festival's
   own site), never to an aggregator, so the link still works in two
   years and tells you the real rules and prices.

   [ id, name, placeId|'', state, category, price, season, blurb, url ]

   category : darksky | camping | food | classic | adventure | water
              | winter | wildlife | music
   price    : free | low | mid | high      (what it costs to do, not to get there)

   Prices are bands on purpose. Exact figures go stale within a
   season and the official link always has the current number.
   =========================================================== */

const BUCKET_PRICE = {
  free: ['Free', 'No charge beyond getting there'],
  low:  ['Under $50', 'A park fee or a cheap ticket'],
  mid:  ['$50–200', 'A guided day, a permit, a good dinner'],
  high: ['$200+', 'A flight, a multi-day permit, a serious booking']
};
const BUCKET_CAT = {
  darksky:   ['Dark sky', 'Stargazing where the night is genuinely black'],
  camping:   ['Camping', 'Nights outside, from drive-up to earned'],
  food:      ['Food', 'Worth planning a day around'],
  classic:   ['Classics', 'The ones everybody means'],
  adventure: ['Adventure', 'Earned with effort, nerve or a permit'],
  water:     ['On the water', 'Boats, reefs, rivers and coast'],
  winter:    ['Winter', 'Snow, ice and low sun'],
  wildlife:  ['Wildlife', 'Animals on their own terms'],
  music:     ['Music', 'Where the sound came from']
};

const BUCKET = [
  /* ---------- dark sky ---------- */
  ['b-nat-bridges','Stargaze at the first Dark Sky Park','UT-natural-bridges-national-monument','UT','darksky','low','Apr–Oct',
   'Natural Bridges was certified the world\'s first International Dark Sky Park. The Milky Way throws a shadow here on a moonless night.',
   'https://www.nps.gov/nabr/planyourvisit/stargazing.htm'],
  ['b-cherry-springs','Cherry Springs after midnight','','PA','darksky','low','Jun–Sep',
   'A field in rural Pennsylvania with one of the darkest skies east of the Mississippi, and a viewing area built for it.',
   'https://www.dcnr.pa.gov/StateParks/FindAPark/CherrySpringsStatePark/'],
  ['b-mcdonald','Star party at McDonald Observatory','TX-big-bend-national-park','TX','darksky','low','Year-round',
   'The observatory in the Davis Mountains runs public star parties with real telescopes under West Texas skies.',
   'https://mcdonaldobservatory.org/visitors/star-parties'],
  ['b-deathvalley-night','Death Valley at night','CA-death-valley-national-park','CA','darksky','low','Nov–Mar',
   'A Gold Tier dark sky park the size of a small country. Drive out to Badwater and turn the headlights off.',
   'https://www.nps.gov/deva/planyourvisit/stargazing.htm'],

  /* ---------- camping ---------- */
  ['b-recgov','Book a national park campground','','','camping','low','Varies',
   'Everything federal goes through one booking system, and the good sites open six months ahead to the minute. Set an alarm.',
   'https://www.recreation.gov/'],
  ['b-havasupai','Havasu Falls permit','AZ-grand-canyon-national-park','AZ','camping','high','Feb–Nov',
   'Blue-green water in a side canyon of the Grand Canyon, on Havasupai land. Permits sell out in minutes each February and are the only legal way in.',
   'https://www.havasupaireservations.com/'],
  ['b-bwca','Paddle and portage the Boundary Waters','MN-boundary-waters','MN','camping','mid','May–Sep',
   'A million acres of lakes with no motors and no roads. You carry the canoe between them, and you will not see another party for days.',
   'https://www.fs.usda.gov/detail/superior/specialplaces/?cid=stelprdb5202690'],
  ['b-assateague','Camp beside the wild horses','VA-chincoteague-and-assateague','MD','camping','low','Apr–Oct',
   'Bayside and oceanside sites on a barrier island where the horses genuinely wander through camp. Secure your food.',
   'https://www.nps.gov/asis/planyourvisit/camping.htm'],

  /* ---------- food ---------- */
  ['b-nola-beignet','Beignets at 3am in New Orleans','LA-new-orleans','LA','food','free','Year-round',
   'Café du Monde has been open essentially always. Powdered sugar, chicory coffee, and the Quarter still going on outside.',
   'https://shop.cafedumonde.com/pages/our-locations'],
  ['b-texas-bbq','Queue for Texas barbecue','TX-austin','TX','food','low','Year-round',
   'The best brisket in the state is sold out of smokehouses that close when the meat runs out, which is often before 1pm.',
   'https://www.traveltexas.com/things-to-do/food-drink/barbecue/'],
  ['b-lowcountry','Lowcountry cooking in Charleston','SC-charleston','SC','food','mid','Year-round',
   'Shrimp and grits, she-crab soup, benne wafers — a cuisine with West African roots that most of the country only half knows.',
   'https://www.charlestoncvb.com/restaurants/'],
  ['b-pikeplace','Eat your way through Pike Place','WA-seattle','WA','food','low','Year-round',
   'A working market since 1907. Go early, before the fish-throwing crowd, and eat breakfast standing up.',
   'https://pikeplacemarket.org/'],
  ['b-hatch','Hatch chile season in New Mexico','NM-santa-fe','NM','food','low','Aug–Sep',
   'For a few weeks the whole state smells of roasting chile. Red or green is a genuine question you will be asked.',
   'https://www.newmexico.org/things-to-do/cuisine/'],
  ['b-maine-lobster','A lobster roll on the Maine coast','ME-acadia-national-park','ME','food','low','Jun–Oct',
   'Served from a shack, on a paper plate, within sight of the boat it came off. Warm with butter or cold with mayo — pick a side.',
   'https://visitmaine.com/things-to-do/food-drink/lobster'],

  /* ---------- classics ---------- */
  ['b-grandcanyon-rim','Stand on the Grand Canyon rim at dawn','AZ-grand-canyon-national-park','AZ','classic','low','Mar–May, Sep–Nov',
   'It does not photograph. Get there before the light comes up and watch the far wall turn on from the top down.',
   'https://www.nps.gov/grca/index.htm'],
  ['b-oldfaithful','Yellowstone\'s geyser basin','WY-yellowstone-national-park','WY','classic','low','May–Sep',
   'Half the world\'s geysers sit on top of a supervolcano here. Old Faithful is the famous one; Grand is the better show.',
   'https://www.nps.gov/yell/planyourvisit/exploregeysers.htm'],
  ['b-statue','Crown of the Statue of Liberty','NY-new-york-city','NY','classic','low','Year-round',
   '162 steps up inside the statue, booked months out and limited to a few hundred people a day.',
   'https://www.statuecruises.com/'],
  ['b-goldengate','Walk the Golden Gate Bridge','CA-san-francisco','CA','classic','free','Year-round',
   'Two miles across, usually in wind and often in fog. The east sidewalk is the one with the view back at the city.',
   'https://www.goldengate.org/bridge/visiting-the-bridge/'],
  ['b-mall','The National Mall at night','DC-washington','DC','classic','free','Year-round',
   'The memorials are open 24 hours and lit. Lincoln after dark, with nobody else on the steps, is a different monument entirely.',
   'https://www.nps.gov/nama/index.htm'],

  /* ---------- adventure ---------- */
  ['b-angels','Angels Landing','UT-zion-national-park','UT','adventure','low','Apr–May, Sep–Oct',
   'A chain-assisted scramble along a fin with a thousand-foot drop either side. Permits are by lottery now, and they are right to be.',
   'https://www.nps.gov/zion/planyourvisit/angels-landing-hiking-permits.htm'],
  ['b-halfdome','Half Dome cables','CA-yosemite-national-park','CA','adventure','mid','Late May–Oct',
   'Sixteen miles and 4,800 feet, finishing up a granite dome on two steel cables. Permit by lottery; do not attempt it wet.',
   'https://www.nps.gov/yose/planyourvisit/hdpermits.htm'],
  ['b-rimtorim','Rim to rim in the Grand Canyon','AZ-grand-canyon-national-park','AZ','adventure','mid','Apr–May, Sep–Oct',
   'Down one side and up the other — 24 miles and two vertical miles of change. People die trying this in summer heat.',
   'https://www.nps.gov/grca/planyourvisit/rim-to-rim.htm'],
  ['b-denali','Fly onto a glacier in Denali','AK-denali-national-park','AK','adventure','high','Jun–Aug',
   'A ski-equipped plane lands you on the Ruth Glacier among walls of granite. Weather-dependent and worth the wait.',
   'https://www.nps.gov/dena/planyourvisit/flightseeing.htm'],
  ['b-whitney','Summit Mount Whitney','CA-sequoia-national-park','CA','adventure','mid','Jul–Sep',
   'The highest point in the lower 48, 22 miles round trip in a day if you are strong. Lottery permit, and altitude is the real opponent.',
   'https://www.fs.usda.gov/detail/inyo/passes-permits/recreation/?cid=stelprdb5147035'],

  /* ---------- on the water ---------- */
  ['b-drytortugas','Camp on Dry Tortugas','FL-dry-tortugas-national-park','FL','water','high','Nov–Apr',
   'Seventy miles past Key West: a Civil War fort, clear water and ten campsites. The ferry leaves once a day and you bring your own water.',
   'https://www.nps.gov/drto/planyourvisit/camping.htm'],
  ['b-apostle','Apostle Islands sea caves','WI-apostle-islands','WI','water','low','Jul–Sep, or frozen Feb',
   'Sandstone caves on Lake Superior you kayak into in summer — and, in a cold enough winter, walk into across the ice.',
   'https://www.nps.gov/apis/planyourvisit/sea-caves.htm'],
  ['b-colorado-raft','Raft the Colorado through the canyon','AZ-grand-canyon-national-park','AZ','water','high','May–Sep',
   'Up to three weeks on the river, 200-plus miles of whitewater, and a view of the canyon almost nobody gets. Private permits are a lottery.',
   'https://www.nps.gov/grca/planyourvisit/whitewater-rafting.htm'],
  ['b-kauai-napali','The Nā Pali coast','HI-kauai','HI','water','mid','May–Sep',
   'Cliffs that drop straight into the Pacific, reachable by boat, by air, or on foot along the Kalalau Trail with a permit.',
   'https://dlnr.hawaii.gov/dsp/parks/kauai/na-pali-coast-state-wilderness-park/'],
  ['b-channel','Kayak the Channel Islands','CA-channel-islands-national-park','CA','water','mid','May–Oct',
   'An hour offshore from Ventura and almost untouched — sea caves, kelp forests and a fox found nowhere else on earth.',
   'https://www.nps.gov/chis/planyourvisit/kayaking.htm'],

  /* ---------- winter ---------- */
  ['b-powder','A powder day in the Rockies','CO-aspen','CO','winter','high','Dec–Mar',
   'Twenty inches overnight and a first chair. Colorado and Utah get the dry snow the rest of the country dreams about.',
   'https://www.colorado.com/ski-resorts'],
  ['b-yellowstone-winter','Yellowstone in winter','WY-yellowstone-national-park','WY','winter','mid','Dec–Feb',
   'The roads close to cars and open to snowcoaches. Steam, bison in frost, and a park with almost nobody in it.',
   'https://www.nps.gov/yell/planyourvisit/winteruse.htm'],
  ['b-aurora','Northern lights in Fairbanks','AK-fairbanks','AK','winter','mid','Sep–Mar',
   'Right under the auroral oval. Clear, cold nights away from town, and the patience to stay up until two.',
   'https://www.explorefairbanks.com/things-to-do/aurora-viewing/'],

  /* ---------- wildlife ---------- */
  ['b-brooks','Bears at Brooks Falls','AK-katmai-national-park','AK','wildlife','high','Jul, Sep',
   'Brown bears catching salmon mid-air from a viewing platform a few metres away. Float plane in; there is no road.',
   'https://www.nps.gov/katm/planyourvisit/brown-bear-viewing.htm'],
  ['b-lamar','Wolves in the Lamar Valley','WY-yellowstone-national-park','WY','wildlife','free','Dec–Mar, May–Jun',
   'The "American Serengeti" at dawn with a spotting scope. Wolves, bison, elk and the people who watch them every day.',
   'https://www.nps.gov/yell/learn/nature/wolves.htm'],
  ['b-monarch','Monarchs on the California coast','CA-monterey','CA','wildlife','free','Nov–Feb',
   'Tens of thousands of butterflies clustered in eucalyptus groves, looking like dead leaves until the sun hits them.',
   'https://www.parks.ca.gov/?page_id=417'],
  ['b-everglades','Everglades by paddle','FL-everglades-national-park','FL','wildlife','low','Dec–Apr',
   'A river of grass moving a mile a day. Go in the dry season, when the wildlife concentrates and the mosquitoes relent.',
   'https://www.nps.gov/ever/planyourvisit/canoe-kayak.htm'],

  /* ---------- music ---------- */
  ['b-opry','A night at the Grand Ole Opry','TN-nashville','TN','music','mid','Year-round',
   'Running since 1925. The circle of oak in the middle of the stage was cut from the Ryman floor.',
   'https://www.opry.com/'],
  ['b-preservation','Preservation Hall','LA-new-orleans','LA','music','low','Year-round',
   'No bar, no amplification, wooden benches, forty-five minutes of New Orleans jazz played by people who grew up in it.',
   'https://www.preservationhall.com/'],
  ['b-redrocks','A show at Red Rocks','CO-denver','CO','music','mid','Apr–Oct',
   'A natural amphitheatre between two 300-foot sandstone monoliths. Even the hike up to the cheap seats is worth it.',
   'https://www.redrocksonline.com/'],
  ['b-memphis','Sun Studio and Beale Street','TN-memphis','TN','music','low','Year-round',
   'The room where Elvis, Cash and Lewis recorded is small enough to stand in the middle of. Then walk to Beale for the live version.',
   'https://www.sunstudio.com/']
];

/* What the weather is doing when you would go. Derived from each
   entry's season rather than stored twice, so the two can never
   disagree. "Any" covers the things that work all year. */
const BUCKET_WEATHER = {
  warm:  ['Warm', 'Summer conditions — long days, swimmable water, high country open'],
  mild:  ['Mild', 'Spring and autumn — comfortable, quieter, the shoulder months'],
  cold:  ['Cold', 'Snow, ice and low sun'],
  any:   ['Any', 'Works more or less year-round']
};
const MONTH_ABBR = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

/* the months a season string actually covers, in the order written,
   so "Dec–Feb" is read as winter rather than as the whole year */
function monthsIn(s){
  const found = [];
  MONTH_ABBR.forEach((m, i) => { const at = s.indexOf(m); if (at !== -1) found.push({ m: i, at: at }); });
  found.sort((a, b) => a.at - b.at);
  const seq = found.map(x => x.m);
  const set = {};
  for (let i = 0; i < seq.length; i += 2){
    const a = seq[i], b = seq[i + 1];
    if (b === undefined){ set[a] = 1; continue; }
    /* expand forwards, wrapping past December */
    for (let m = a, guard = 0; guard < 13; guard++){ set[m] = 1; if (m === b) break; m = (m + 1) % 12; }
  }
  return Object.keys(set).map(Number);
}

function bucketWeather(b){
  const s = (b[6] || '').toLowerCase();
  if (/year-round|varies/.test(s)) return 'any';
  const set = monthsIn(s);
  if (!set.length || set.length >= 9) return 'any';

  const st = b[3] || (b[2] && typeof placeGet === 'function' && placeGet(b[2]) && placeGet(b[2]).abbr);
  const region = (typeof STATE_REGION !== 'undefined' && STATE_REGION[st]) || '';
  /* where winter is a pleasant season rather than a cold one */
  const mildWinter = ['subtropical', 'tropical', 'gulf', 'desert', 'south', 'west'].indexOf(region) !== -1;

  const summer = set.filter(m => m >= 4 && m <= 8).length;      /* May–Sep */
  const winter = set.filter(m => m >= 10 || m <= 2).length;     /* Nov–Mar */
  if (summer > winter) return 'warm';
  if (winter > summer) return mildWinter ? 'mild' : 'cold';
  return 'mild';
}

function bucketCats(){ return Object.keys(BUCKET_CAT); }
function bucketBy(cat, st, price, weather){
  return BUCKET.filter(b =>
    (!cat     || b[4] === cat) &&
    (!st      || b[3] === st || (b[2] && typeof placeGet === 'function' && placeGet(b[2]) && placeGet(b[2]).abbr === st)) &&
    (!price   || b[5] === price) &&
    (!weather || bucketWeather(b) === weather));
}
