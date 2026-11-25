/* ===========================================================
   ICELAND — regions and places

   Same packed-array shape as everything else in the atlas:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Its own namespace (IS_PLACES / isPlaceGet), so nothing here
   touches the US map, the US search index or the planner until
   the atlases are deliberately joined.

   The regions are Iceland's eight statistical landsvæði, plus the
   Highlands, which is not an administrative region at all but is
   how everybody talks about the interior. It has no permanent
   population, its roads are open for about ten weeks a year, and
   lumping Landmannalaugar in with the South would be wrong in
   every way that matters to a visitor.

   Region codes are three letters and avoid every code already
   taken by Italy, Costa Rica, India, Japan, Spain and Egypt.

   The vocabulary is Iceland's own. Foss is a waterfall, jökull is
   a glacier, and a "pool" here means a geothermally heated
   municipal swimming bath that is the centre of village life.
   =========================================================== */

/* ---------- what a place IS, Icelandic edition ---------- */
const IS_KIND = {
  city:     'City',
  town:     'Town',
  village:  'Village',
  district: 'District',
  falls:    'Waterfall',
  glacier:  'Glacier',
  lagoon:   'Glacier lagoon',
  volcano:  'Volcano',
  crater:   'Crater',
  lavafield:'Lava field',
  geyser:   'Geothermal field',
  pool:     'Hot spring',
  canyon:   'Canyon',
  valley:   'Valley',
  mountain: 'Mountain',
  np:       'National park',
  reserve:  'Nature reserve',
  lake:     'Lake',
  river:    'River',
  coast:    'Coast',
  beach:    'Beach',
  cliff:    'Sea cliff',
  island:   'Island',
  fjord:    'Fjord',
  cave:     'Cave',
  museum:   'Museum',
  farm:     'Historic farm',
  church:   'Church',
  pass:     'Mountain road',
  region:   'Region'
};

/* Extra flags Iceland needs. The base FLAG list in taxonomy.js
   still applies underneath. Every tag used below has a label here
   or there; the test suite checks it, because a missing one renders
   as a raw lowercase chip. */
const IS_FLAG = {
  aurora:    ['Northern lights', 'A dark, open site that works for the aurora'],
  midnight:  ['Midnight sun',    'Light enough to walk at two in the morning'],
  geothermal:['Geothermal',      'Steam, hot ground or water out of the rock'],
  volcanic:  ['Volcanic',        'Lava, craters and ground that is still moving'],
  glacier:   ['Glacier',         'Ice you can walk on or look into'],
  falls:     ['Waterfall',       'A named fall, not a trickle'],
  bathing:   ['Bathing',         'Get in the water; that is the point'],
  hiking:    ['Hiking',          'Real walking, not a viewpoint car park'],
  wildlife:  ['Wildlife',        'Animals are the draw'],
  birding:   ['Birds',           'Puffins, or a serious seabird colony'],
  whales:    ['Whales',          'Reliable enough to plan around'],
  seals:     ['Seals',           'A haul-out you can usually count on'],
  horses:    ['Horses',          'The Icelandic horse and its fifth gait'],
  diving:    ['Diving',          'Worth getting in with a tank or a drysuit'],
  surf:      ['Surf',            'Cold water and real swell'],
  beach:     ['Beach',           'Black sand, mostly'],
  coastal:   ['Coastal',         'The sea is the whole point'],
  island:    ['Island',          'Reached by boat or a small plane'],
  fjord:     ['Fjord',           'Deep water between steep sides'],
  cave:      ['Caves',           'Lava tubes or ice, and open to walk into'],
  saga:      ['Saga country',    'A thirteenth-century text happened here'],
  historic:  ['Historic',        'Turf houses, old farms or a parliament field'],
  museum:    ['Museum',          'A collection worth the trip on its own'],
  f_road:    ['F-road',          'Needs a 4x4 and opens for about ten weeks'],
  summer:    ['Summer only',     'Shut or unreachable for much of the year'],
  remote:    ['Remote',          'A long way from the next fuel pump'],
  darksky:   ['Dark skies',      'No light pollution to speak of'],
  food:      ['Food',            'Worth planning meals around'],
  nightlife: ['Nightlife',       'The evening is the reason'],
  modern:    ['Modern',          'Design, architecture and the new Iceland'],
  film:      ['On film',         'You have already seen it on a screen'],
  park:      ['Protected',       'A national park or a nature reserve'],
  unesco:    ['UNESCO',          'On the World Heritage list'],
  crowds:    ['Go early',        'Busy enough that the hour matters'],
  pool:      ['Swimming pool',   'The village pool, which is the village'],
  rural:     ['Countryside',     'Farms, sheep and a long way between them'],
  canyon:    ['Canyon',          'Cut rock and a path along it'],
  cliff:     ['Sea cliff',       'A vertical drop into the Atlantic'],
  crater:    ['Crater',          'A cone or a caldera you can walk round'],
  lake:      ['Lake',            'Water you can walk or row around'],
  forest:    ['Woodland',        'Trees, which in Iceland is remarkable'],
  ski:       ['Skiing',          'Lift-served snow, with daylight permitting']
};

/* ---------- the regions ----------
   code -> [ English name, Icelandic name, character, blurb ] */
const IS_REGIONS = {
  RVK: ['Capital Region', 'Höfuðborgarsvæðið', 'urban',
    'Two thirds of the country’s population in and around a city of a hundred and forty thousand. Corrugated iron houses, a lot of swimming pools and the only real nightlife in Iceland.'],
  RNS: ['Reykjanes', 'Reykjanesskagi', 'volcanic',
    'The peninsula the airport sits on, which woke up in 2021 after eight hundred years and has erupted repeatedly since. Lava fields, steam and the Blue Lagoon.'],
  VSL: ['West', 'Vesturland', 'rural',
    'Snæfellsnes, which is often called Iceland in miniature and for once the cliché holds, plus the saga country of Borgarfjörður and the lava caves inland.'],
  VFJ: ['Westfjords', 'Vestfirðir', 'fjord',
    'The oldest rock in Iceland, folded into a hand of fjords with roads that cling to them. Seven thousand people, the biggest bird cliff in Europe and very few other visitors.'],
  NWI: ['Northwest', 'Norðurland vestra', 'rural',
    'Horse country and turf farms along the Skagafjörður valleys, plus a basalt peninsula at Hvítserkur and the island of Drangey out in the fjord.'],
  NEI: ['Northeast', 'Norðurland eystra', 'geothermal',
    'Akureyri, the whale capital at Húsavík, and the Mývatn basin, where the ground is warm and the craters, lava and steam come one after another.'],
  EST: ['East', 'Austurland', 'fjord',
    'Long fjords with villages at the head of them, the biggest forest in Iceland, reindeer in the hills and a route to the far side of Vatnajökull.'],
  SUL: ['South', 'Suðurland', 'volcanic',
    'The whole south coast run: the Golden Circle, a line of waterfalls under the escarpment, black beaches, two glaciers and the lagoon at Jökulsárlón.'],
  HLD: ['Highlands', 'Hálendið', 'remote',
    'The uninhabited interior. Rhyolite mountains, sand deserts, ice caps and gravel tracks that open in late June and shut again in September.']
};

const IS_PLACES = {

  /* ===================== CAPITAL REGION ===================== */
  'RVK-reykjavik': ['Reykjavík','RVK','city',64.1466,-21.9426,10,['urban','water'],['couple','friends','family'],['modern','food','nightlife','museum','pool','coastal'],
    'The northernmost capital of a sovereign state, and small enough to cross on foot in half an hour. The pools, not the bars, are where the city actually meets itself.'],
  'RVK-hallgrimskirkja': ['Hallgrímskirkja','RVK','church',64.1417,-21.9266,8,['urban'],['family','couple'],['modern','historic','crowds'],
    'Seventy-four and a half metres of concrete modelled on columnar basalt, begun in 1945 and finished in 1986. The lift to the tower gives the only overview of the city.'],
  'RVK-harpa': ['Harpa','RVK','museum',64.1504,-21.9325,7,['urban','water'],['couple','family'],['modern','coastal'],
    'A concert hall in a shell of quasi-crystalline glass by Ólafur Elíasson, begun before the 2008 crash and finished afterwards because stopping would have been worse.'],
  'RVK-national-museum': ['National Museum','RVK','museum',64.1419,-21.9492,7,['urban'],['solo','family'],['museum','historic','saga'],
    'Twelve hundred years in one well-edited building, from the settlement to the present. Go here before the ring road and the turf farms will make considerably more sense.'],
  'RVK-sky-lagoon': ['Sky Lagoon','RVK','pool',64.1180,-21.9330,7,['urban','water'],['couple','friends'],['bathing','geothermal','coastal','modern'],
    'An infinity edge over the Atlantic at Kársnes, opened in 2021, with a seven-step ritual that includes a cold plunge and a steam room cut into turf.'],
  'RVK-laugardalslaug': ['Laugardalslaug','RVK','pool',64.1430,-21.8800,6,['urban'],['family','solo'],['pool','bathing','geothermal'],
    'The largest public pool in Iceland, fifty metres outdoors and heated all year, with seven hot tubs at different temperatures. Shower naked before you get in; this is not negotiable.'],
  'RVK-grotta': ['Grótta','RVK','coast',64.1636,-22.0219,6,['water'],['couple','solo'],['aurora','coastal','birding','darksky'],
    'A lighthouse on a tidal island at the end of the Seltjarnarnes peninsula, twenty minutes from the centre, and the easiest place to watch for the aurora without leaving the city.'],
  'RVK-perlan': ['Perlan','RVK','museum',64.1286,-21.9188,6,['urban'],['family'],['museum','modern','glacier'],
    'A glass dome on top of six hot-water tanks, with a hundred-metre ice cave built inside out of real snow and a planetarium showing the aurora when the sky will not.'],
  'RVK-videy': ['Viðey','RVK','island',64.1600,-21.8400,5,['water'],['solo','couple'],['island','historic','coastal','birding'],
    'A ferry island five minutes offshore with the oldest stone building in Iceland, a Richard Serra basalt installation and Yoko Ono’s light tower, lit from October to December.'],

  /* ===================== REYKJANES ===================== */
  'RNS-blue-lagoon': ['Blue Lagoon','RNS','pool',63.8804,-22.4495,9,['volcanic'],['couple','friends','family'],['bathing','geothermal','volcanic','crowds'],
    'Silica-white water at thirty-eight degrees in a black lava field, which is runoff from the power station next door and none the worse for it. Book weeks ahead and expect to share.'],
  'RNS-reykjanes-eruptions': ['Reykjanes eruption sites','RNS','volcano',63.8900,-22.2700,8,['volcanic'],['friends','solo'],['volcanic','hiking','film','darksky'],
    'Fagradalsfjall erupted in 2021 for the first time in eight centuries and the peninsula has not stopped since. Access depends entirely on what the ground is doing that week.'],
  'RNS-bridge-continents': ['Bridge Between Continents','RNS','lavafield',63.8683,-22.6750,5,['volcanic'],['family'],['volcanic','geothermal'],
    'A footbridge over a sand-filled rift between the North American and Eurasian plates. Geologically a simplification and still a pleasant five minutes.'],
  'RNS-gunnuhver': ['Gunnuhver','RNS','geyser',63.8186,-22.6836,6,['volcanic'],['family','solo'],['geothermal','volcanic'],
    'The hottest surface geothermal field in Iceland, with mud pools and a twenty-metre steam vent, named for a ghost a priest is said to have trapped in it.'],
  'RNS-krysuvik': ['Krýsuvík & Seltún','RNS','geyser',63.8936,-22.0556,6,['volcanic'],['family','couple'],['geothermal','volcanic','hiking'],
    'Boiling mud and sulphur-yellow ground on boardwalks half an hour from Reykjavík, with the green crater lake of Grænavatn and a cliff of nesting birds beyond.'],
  'RNS-reykjanesviti': ['Reykjanesviti & Valahnúkamöl','RNS','cliff',63.8128,-22.7072,6,['water','volcanic'],['solo','couple'],['coastal','birding','volcanic'],
    'Iceland’s oldest lighthouse above a shore of black boulders, with a sea stack offshore that holds a gannet colony and surf that comes in from three thousand kilometres away.'],
  'RNS-garour': ['Garður & Sandgerði','RNS','coast',64.0811,-22.6886,5,['water'],['solo','family'],['coastal','birding','aurora','darksky'],
    'Two lighthouses on a point at the northwest corner of the peninsula, which is one of the better birdwatching spots in the southwest and a reliable aurora site in winter.'],
  'RNS-brimketill': ['Brimketill','RNS','coast',63.8286,-22.5036,5,['water','volcanic'],['couple','family'],['coastal','volcanic'],
    'A lava rock pool on the edge of the Atlantic, scoured out by the sea and named for a troll woman said to have bathed in it. Viewing platform only; the water will kill you.'],
  'RNS-kleifarvatn': ['Kleifarvatn','RNS','lake',63.9333,-21.9833,5,['volcanic','water'],['solo','couple'],['volcanic','darksky','hiking'],
    'A lake in a rift valley with no surface outflow, which dropped sharply after an earthquake cracked its floor in 2000 and then filled again. Black sand all round it.'],

  /* ===================== WEST ===================== */
  'VSL-snaefellsnes': ['Snæfellsnes','VSL','np',64.8083,-23.7772,9,['mountain','water'],['couple','family','friends'],['glacier','volcanic','coastal','hiking','park','birding'],
    'A ninety-kilometre peninsula with a glacier-capped volcano at the end of it, and lava, bird cliffs, black beaches and fishing villages in between. The common nickname is earned.'],
  'VSL-kirkjufell': ['Kirkjufell','VSL','mountain',64.9275,-23.3069,8,['mountain','water'],['couple','friends'],['film','coastal','aurora','crowds'],
    'A four-hundred-and-sixty-three-metre arrowhead of layered rock beside a small waterfall, which is the most photographed mountain in Iceland and the reason the car park is full.'],
  'VSL-arnarstapi': ['Arnarstapi & Hellnar','VSL','coast',64.7694,-23.6219,7,['water','volcanic'],['couple','solo'],['coastal','hiking','birding','volcanic'],
    'A two-and-a-half kilometre path between two hamlets along a shore of basalt arches, blowholes and fulmar colonies, under the Snæfellsjökull ice cap.'],
  'VSL-djupalonssandur': ['Djúpalónssandur','VSL','beach',64.7533,-23.9033,7,['water','volcanic'],['family','couple'],['beach','coastal','historic'],
    'Black pebbles, the rusted ribs of a British trawler wrecked in 1948 left where they came ashore, and four lifting stones that crews once used to test whether a man could be hired.'],
  'VSL-stykkisholmur': ['Stykkishólmur','VSL','town',65.0750,-22.7281,6,['water'],['couple','family'],['coastal','food','historic','birding'],
    'Painted timber houses around a harbour on Breiðafjörður, with a modernist church on the hill and a ferry out through a bay that is supposed to hold uncountable islands.'],
  'VSL-hraunfossar': ['Hraunfossar & Barnafoss','VSL','falls',64.7025,-20.9797,7,['forest','water'],['family','couple'],['falls','volcanic'],
    'Water seeping out of the edge of a lava field across nine hundred metres of frontage into a blue river, which is a completely different thing from a normal waterfall.'],
  'VSL-vidgelmir': ['Víðgelmir','VSL','cave',64.7508,-20.6000,6,['volcanic'],['family','friends'],['cave','volcanic'],
    'One of the largest lava tubes in the world, a kilometre and a half long, with ice formations at the far end and a raised walkway the whole way in.'],
  'VSL-borgarnes': ['Borgarnes','VSL','town',64.5383,-21.9222,5,['water','rural'],['solo','family'],['saga','museum','historic','food'],
    'Where Egil’s Saga is set, with a settlement centre that tells it properly and a mound where Egil is supposed to have buried his son. An hour from Reykjavík on the ring road.'],
  'VSL-deildartunguhver': ['Deildartunguhver','VSL','geyser',64.6639,-21.4111,6,['rural'],['family','couple'],['geothermal','bathing'],
    'Europe’s highest-flow hot spring, pushing out a hundred and eighty litres a second at ninety-seven degrees, which heats two towns through a pipe sixty-four kilometres long.'],
  'VSL-krauma': ['Krauma baths','VSL','pool',64.6650,-21.4150,5,['rural'],['couple','friends'],['bathing','geothermal','modern'],
    'Five pools fed straight from Deildartunguhver and cooled with glacial meltwater from Ok, which is the only ingredient list a bath needs.'],
  'VFJ-raudasandur': ['Rauðasandur','VFJ','beach',65.4700,-24.0500,6,['water'],['couple','solo'],['beach','coastal','remote','seals'],
    'Ten kilometres of pink and gold sand, which should not exist in Iceland and does because the shells of a particular scallop get ground up here. Down a steep gravel road.'],
  'VSL-eldborg': ['Eldborg','VSL','crater',64.7983,-22.3192,5,['volcanic'],['solo','family'],['volcanic','hiking'],
    'A near-perfect scoria crater sixty metres high on a lava plain, reached on an easy two-and-a-half kilometre walk with a rim you can walk round.'],

  /* ===================== WESTFJORDS ===================== */
  'VFJ-dynjandi': ['Dynjandi','VFJ','falls',65.7333,-23.2000,8,['mountain','water'],['couple','family'],['falls','remote','hiking'],
    'A hundred metres of water spreading as it falls down a tiered rock face like a bridal veil, with six smaller falls below it on the walk up from the car park.'],
  'VFJ-latrabjarg': ['Látrabjarg','VFJ','cliff',65.5033,-24.5331,8,['water'],['solo','couple','family'],['birding','coastal','remote','cliff'],
    'Fourteen kilometres of cliff up to four hundred and forty metres high, holding one of the largest seabird colonies in the world, where the puffins are famously unbothered by people.'],
  'VFJ-isafjorour': ['Ísafjörður','VFJ','town',66.0748,-23.1355,7,['water','mountain'],['couple','solo'],['fjord','coastal','food','historic','museum'],
    'The capital of the Westfjords, population around twenty-six hundred, on a sand spit inside a fjord with mountains straight up on both sides and eighteenth-century timber houses.'],
  'VFJ-hornstrandir': ['Hornstrandir','VFJ','reserve',66.4167,-22.4167,8,['mountain','water'],['solo','friends'],['hiking','remote','wildlife','summer','park','birding'],
    'Abandoned by its last residents in the 1950s and now a reserve with no roads, no mobile signal and a dense population of Arctic foxes that have never been hunted.'],
  'VFJ-hellulaug': ['Hellulaug & Reykjafjarðarlaug','VFJ','pool',65.5333,-23.1667,6,['water'],['couple','solo'],['bathing','geothermal','fjord','remote'],
    'Natural hot pools on the shore of Vatnsfjörður, free, unattended and with a view over the water. An honour box and no building, which is the Westfjords in one.'],
  'VFJ-patreksfjorour': ['Patreksfjörður','VFJ','town',65.5950,-24.0000,5,['water','mountain'],['family','solo'],['fjord','coastal','historic','food'],
    'The main town on the southern Westfjords, used as the base for Látrabjarg and Rauðasandur, with a pool on the hillside looking down the fjord.'],
  'VFJ-drangsnes': ['Drangsnes & Hólmavík','VFJ','village',65.6894,-21.4472,5,['water'],['solo','couple'],['bathing','fjord','coastal','historic','seals'],
    'Three hot tubs built into the sea wall at Drangsnes, free and open to anyone, and a museum of Icelandic sorcery down the road at Hólmavík that is odder than it sounds.'],
  'VFJ-vigur': ['Vigur','VFJ','island',66.0333,-22.8167,5,['water'],['family','couple'],['island','birding','historic','coastal'],
    'A farm island in Ísafjarðardjúp with eider down still collected by hand, Iceland’s only working windmill from 1840, and so many Arctic terns that they hand you a stick.'],
  'VFJ-sudavik-arctic-fox': ['Súðavík Arctic Fox Centre','VFJ','museum',66.0333,-22.9833,5,['water'],['family','solo'],['wildlife','museum','fjord'],
    'A research centre and small museum on the only land mammal that was here before people, in a restored house in a village that was moved after an avalanche in 1995.'],
  'VFJ-krossneslaug': ['Krossneslaug','VFJ','pool',66.0333,-21.4167,6,['water'],['couple','solo'],['bathing','geothermal','remote','coastal'],
    'A concrete swimming pool built in 1954 on a black beach at the end of the road in Strandir, heated by a spring behind it, facing nothing but the Arctic.'],

  /* ===================== NORTHWEST ===================== */
  'NWI-hvitserkur': ['Hvítserkur','NWI','coast',65.6061,-20.6381,6,['water'],['couple','family'],['coastal','seals','birding'],
    'A fifteen-metre basalt sea stack with two holes through the base, which looks like an animal drinking and is reinforced at the foot because it was starting to fall over.'],
  'NWI-glaumbaer': ['Glaumbær','NWI','farm',65.6167,-19.5000,6,['rural'],['family','solo'],['historic','museum','rural'],
    'A turf farm of thirteen connected buildings under grass roofs, lived in until 1947, which shows how Icelanders actually survived here better than any reconstruction could.'],
  'NWI-drangey': ['Drangey & Grettislaug','NWI','island',65.9667,-19.6833,6,['water'],['solo','friends'],['island','birding','saga','bathing'],
    'A tuff island in Skagafjörður where Grettir the Strong spent his last three years as an outlaw, with a bathing pool on the shore named after the swim he made to fetch fire.'],
  'NWI-kolugljufur': ['Kolugljúfur','NWI','canyon',65.3719,-20.6464,5,['canyon','water'],['couple','solo'],['falls','canyon','rural'],
    'A kilometre of gorge with a double waterfall at the head of it, named for a troll woman who is supposed to have lived underneath. Almost nobody turns off the ring road for it.'],
  'NWI-saudarkrokur': ['Sauðárkrókur & Skagafjörður','NWI','town',65.7461,-19.6397,5,['water','rural'],['family','couple'],['horses','rural','coastal','food'],
    'The horse-breeding heart of Iceland, where more foals are registered than anywhere else, with river rafting on the glacial Austari-Jökulsá in summer.'],
  'NWI-hofsos': ['Hofsós pool','NWI','pool',65.8947,-19.4139,6,['water'],['couple','solo'],['pool','bathing','coastal'],
    'An infinity pool built in 2010 on a slope above Skagafjörður, so you swim towards the horizon with Drangey out in the middle of it. One of the best pools in the country.'],
  'NWI-blonduos': ['Blönduós & Vatnsnes','NWI','town',65.6594,-20.2861,4,['water','rural'],['family','solo'],['seals','coastal','rural'],
    'The seal-watching peninsula, with haul-outs at Illugastaðir and Svalbarð, and a ring road town with a church shaped like a volcanic crater.'],
  'NWI-kalfshamarsvik': ['Kálfshamarsvík','NWI','coast',66.0000,-20.4000,4,['water'],['solo','couple'],['coastal','remote','birding'],
    'Columnar basalt in fans and rosettes on a small bay at the tip of the Skagi peninsula, with a lighthouse and the foundations of a village that emptied in the 1940s.'],

  /* ===================== NORTHEAST ===================== */
  'NEI-myvatn': ['Mývatn','NEI','lake',65.6039,-16.9961,9,['volcanic','water'],['family','couple','friends'],['geothermal','volcanic','birding','bathing','aurora'],
    'A shallow lake in a volcanic basin with more breeding duck species than anywhere in Europe, ringed by pseudocraters, lava pillars and ground too hot to stand on.'],
  'NEI-dettifoss': ['Dettifoss','NEI','falls',65.8147,-16.3844,8,['canyon','water'],['family','friends'],['falls','canyon','park','film'],
    'A hundred metres wide and forty-four high, carrying the most water of any fall in Europe, in a canyon of grey glacial rock that looks like nowhere on earth. Which is why it opened Prometheus.'],
  'NEI-akureyri': ['Akureyri','NEI','city',65.6835,-18.0878,8,['water','mountain'],['family','couple','friends'],['food','museum','pool','fjord','ski'],
    'Iceland’s second city at twenty thousand people, at the head of the longest fjord, with a botanical garden that grows things it should not at this latitude.'],
  'NEI-husavik': ['Húsavík','NEI','town',66.0449,-17.3389,8,['water'],['family','couple','friends'],['whales','coastal','museum','bathing'],
    'The whale capital of Iceland, with sighting rates above ninety-five per cent in summer in Skjálfandi bay, and humpbacks close enough that you hear them breathe.'],
  'NEI-asbyrgi': ['Ásbyrgi','NEI','canyon',66.0208,-16.5086,7,['canyon','forest'],['family','couple'],['canyon','hiking','park','forest'],
    'A horseshoe canyon three and a half kilometres long with hundred-metre walls, cut by a glacial flood, and explained locally as a hoofprint left by Odin’s eight-legged horse.'],
  'NEI-godafoss': ['Goðafoss','NEI','falls',65.6828,-17.5500,7,['water'],['family','couple'],['falls','saga','historic'],
    'A twelve-metre horseshoe on the Skjálfandafljót, named for the lawspeaker who in the year 1000 threw his carvings of the old gods into it after Iceland accepted Christianity.'],
  'NEI-myvatn-nature-baths': ['Mývatn Nature Baths','NEI','pool',65.6322,-16.8472,7,['volcanic'],['couple','family'],['bathing','geothermal','volcanic','aurora'],
    'The northern answer to the Blue Lagoon, smaller, cheaper and looking out over a lava field towards the lake. Open late, which makes it a good aurora bath.'],
  'NEI-dimmuborgir': ['Dimmuborgir','NEI','lavafield',65.5906,-16.9114,7,['volcanic'],['family','friends'],['volcanic','hiking','historic'],
    'A collapsed lava lake left as a field of pillars, arches and hollow chambers, which Icelandic folklore makes the home of the thirteen Yule Lads and their considerably worse mother.'],
  'NEI-hverir': ['Hverir','NEI','geyser',65.6403,-16.8083,7,['volcanic'],['family','couple'],['geothermal','volcanic'],
    'An ochre plain of boiling mud pots and roaring steam vents at the foot of Námafjall, with no vegetation at all and a smell that gets into your clothes.'],
  'NEI-grjotagja': ['Grjótagjá','NEI','cave',65.6261,-16.8828,6,['volcanic'],['couple','friends'],['cave','geothermal','volcanic','film'],
    'A lava fissure with a hot spring inside it, which was a bathing spot until the 1970s eruptions pushed the water above fifty degrees. Look, do not get in.'],
  'NEI-krafla': ['Krafla & Víti','NEI','volcano',65.7167,-16.7500,6,['volcanic'],['solo','friends'],['volcanic','hiking','geothermal','crater'],
    'A caldera that erupted nine times between 1975 and 1984, with a green crater lake at Víti, a still-warm lava field at Leirhnjúkur and a power station drawing off the heat.'],
  'NEI-siglufjorour': ['Siglufjörður','NEI','town',66.1497,-18.9089,6,['water','mountain'],['couple','solo'],['fjord','museum','food','historic','ski'],
    'A herring boom town that had ten thousand people in the 1950s and has thirteen hundred now, reached through tunnels, with an award-winning museum about the fish that built it.'],
  'NEI-vatnsnes-whales': ['Hauganes & Dalvík','NEI','village',65.9667,-18.5333,5,['water'],['family','friends'],['whales','coastal','bathing','food'],
    'Small-boat whale watching from the quieter side of Eyjafjörður, with hot tubs on the beach at Hauganes and a ferry to Hrísey from Dalvík.'],

  /* ===================== EAST ===================== */
  'EST-seydisfjorour': ['Seyðisfjörður','EST','town',65.2603,-14.0053,8,['water','mountain'],['couple','solo'],['fjord','modern','food','historic','coastal'],
    'Norwegian timber houses round a fjord at the end of a mountain pass, with a rainbow painted up the street to a blue church and the ferry from Denmark docking in it.'],
  'EST-stuolagil': ['Stuðlagil','EST','canyon',65.1375,-15.3042,8,['canyon','water'],['couple','friends'],['canyon','hiking','rural'],
    'Walls of hexagonal basalt columns above a glacier-blue river, which were underwater until a dam upstream dropped the flow in 2009 and nobody noticed until about 2016.'],
  'EST-vatnajokull-east': ['Vatnajökull National Park, east','EST','np',64.4000,-15.5000,7,['mountain','forest'],['solo','friends'],['park','hiking','glacier','wildlife','remote'],
    'Snæfell, the highest mountain outside the ice caps, with Iceland’s reindeer herd on the slopes below and a long approach through the eastern highlands.'],
  'EST-borgarfjorour-eystri': ['Borgarfjörður Eystri','EST','village',65.5278,-13.8111,7,['water','mountain'],['family','couple'],['birding','hiking','fjord','remote','rural'],
    'A puffin colony with a viewing platform built almost on top of it, which makes it the easiest close look at them in Iceland, plus rhyolite hiking in the Víknaslóðir valleys.'],
  'EST-egilsstaoir': ['Egilsstaðir & Hallormsstaður','EST','town',65.2669,-14.3948,5,['forest','water'],['family','solo'],['forest','lake','rural','food'],
    'The eastern hub beside Lagarfljót, with Iceland’s largest forest on the far shore and a lake monster reported since 1345 and still occasionally in the papers.'],
  'EST-vok-baths': ['Vök Baths','EST','pool',65.2878,-14.4592,6,['water'],['couple','friends'],['bathing','geothermal','lake','modern'],
    'Floating pools out on Urriðavatn, fed by the only hot spring in the east, with water clean enough to drink and a cold-water swim straight off the deck.'],
  'EST-djupivogur': ['Djúpivogur','EST','village',64.6553,-14.2833,5,['water'],['solo','couple'],['coastal','birding','historic','food'],
    'A Cittaslow town with a line of thirty-four granite eggs along the harbour, one for each bird that breeds in the district, and a pyramid-shaped mountain behind.'],
  'EST-petra-stone': ['Petra’s Stone Collection','EST','museum',64.9625,-13.7119,5,['water','mountain'],['family','solo'],['museum','historic','rural'],
    'One woman spent eighty years collecting minerals from the mountains around Stöðvarfjörður and filling her house and garden with them. It is still exactly as she arranged it.'],
  'EST-hengifoss': ['Hengifoss','EST','falls',65.0769,-14.8847,6,['canyon','water'],['family','friends'],['falls','hiking','canyon'],
    'A hundred and twenty-eight metres down a cliff banded with red clay layers between basalt flows, each one a soil horizon from a warm period between eruptions.'],
  'EST-mjoifjorour': ['Mjóifjörður','EST','fjord',65.1833,-13.8000,4,['water','mountain'],['solo','couple'],['fjord','remote','rural','falls'],
    'A single-track gravel road over a pass into a fjord with about twenty residents, a waterfall at the head of it and the wreck of a Norwegian whaling station at the mouth.'],
  'EST-skalanes': ['Skálanes','EST','reserve',65.2500,-13.7500,4,['water','mountain'],['solo'],['birding','remote','wildlife','coastal'],
    'A research station and guesthouse on a headland reached by an hour of rough track from Seyðisfjörður, with forty-seven breeding bird species on the land around it.'],

  /* ===================== SOUTH ===================== */
  'SUL-jokulsarlon': ['Jökulsárlón','SUL','lagoon',64.0784,-16.2306,10,['water','mountain'],['couple','family','friends'],['glacier','wildlife','seals','crowds','film'],
    'Icebergs calving off Breiðamerkurjökull into a lagoon that did not exist in 1930 and is now Iceland’s deepest lake, drifting out to sea and washing back onto the black sand.'],
  'SUL-diamond-beach': ['Diamond Beach','SUL','beach',64.0434,-16.1756,8,['water'],['couple','family'],['beach','glacier','coastal','seals'],
    'The black sand opposite the lagoon mouth, where the stranded ice sits until it melts. Better on a sunny day than a grey one, and entirely different every tide.'],
  'SUL-thingvellir': ['Þingvellir','SUL','np',64.2559,-21.1301,9,['canyon','water'],['family','couple','solo'],['unesco','historic','saga','park','hiking','diving'],
    'Where the Icelandic parliament met in the open air from 930, in a rift valley that is visibly pulling apart at about two centimetres a year. Both facts are the reason it is listed.'],
  'SUL-geysir': ['Geysir & Strokkur','SUL','geyser',64.3104,-20.3024,8,['volcanic'],['family','couple'],['geothermal','volcanic','crowds'],
    'The spring that gave its name to every geyser on earth is now mostly dormant; Strokkur beside it goes off every five to ten minutes to twenty metres and does the work.'],
  'SUL-gullfoss': ['Gullfoss','SUL','falls',64.3271,-20.1199,9,['canyon','water'],['family','couple'],['falls','canyon','crowds','historic'],
    'The Hvítá drops thirty-two metres in two stages into a narrow canyon at right angles to the flow, so the water appears to vanish into the ground.'],
  'SUL-seljalandsfoss': ['Seljalandsfoss','SUL','falls',63.6156,-19.9886,8,['water'],['family','couple'],['falls','crowds','midnight'],
    'Sixty metres over a former sea cliff with a path right round behind the curtain, which is the appeal and also why you will get soaked. Gljúfrabúi is five minutes along the path.'],
  'SUL-skogafoss': ['Skógafoss','SUL','falls',63.5321,-19.5114,8,['water'],['family','friends'],['falls','hiking','crowds'],
    'Sixty metres and twenty-five wide, throwing enough spray to make a double rainbow on any sunny afternoon, with four hundred and twenty-seven steps to a viewpoint at the top.'],
  'SUL-reynisfjara': ['Reynisfjara','SUL','beach',63.4062,-19.0444,8,['water'],['couple','family'],['beach','coastal','birding','crowds','film'],
    'Black sand, a cliff of hexagonal basalt columns and sea stacks offshore. Sneaker waves here have killed visitors; the warning lights at the entrance are not decorative.'],
  'SUL-vik': ['Vík í Mýrdal','SUL','village',63.4187,-19.0060,7,['water'],['family','couple'],['coastal','beach','birding','food'],
    'The southernmost village on the mainland, under a glacier that sits on a volcano due an eruption, with a red-roofed church on the hill that doubles as the evacuation point.'],
  'SUL-skaftafell': ['Skaftafell','SUL','np',64.0167,-16.9667,8,['mountain','forest'],['family','friends','solo'],['park','hiking','glacier','falls'],
    'A green wedge between two glacier tongues, with Svartifoss falling over black columns and a walk out onto Skaftafellsjökull that needs no equipment at all.'],
  'SUL-fjaorargljufur': ['Fjaðrárgljúfur','SUL','canyon',63.7714,-18.1719,7,['canyon','water'],['couple','family'],['canyon','hiking','film'],
    'Two kilometres of serpentine gorge a hundred metres deep, cut through soft palagonite, with a path along the rim that was closed for a while after a music video brought too many feet.'],
  'SUL-hveragerdi': ['Hveragerði','SUL','town',63.9414,-21.1869,6,['volcanic'],['family','couple'],['geothermal','bathing','food','rural'],
    'A town built on a geothermal field where greenhouses grow bananas and the ground steams in the public park. The earthquake of 2008 opened new hot springs in the middle of it.'],
  'SUL-reykjadalur': ['Reykjadalur hot river','SUL','pool',64.0300,-21.2100,7,['mountain'],['friends','couple'],['bathing','geothermal','hiking'],
    'A river warm enough to lie in, reached by a three-kilometre uphill walk through a steaming valley above Hveragerði. Boardwalks at the top and no changing room.'],
  'SUL-dyrholaey': ['Dyrhólaey','SUL','cliff',63.4019,-19.1261,7,['water'],['couple','family'],['birding','coastal','cliff','beach'],
    'A promontory with a natural arch big enough to sail a boat through, a lighthouse on top and puffins on the slopes from May to early August. Closed during peak nesting.'],
  'SUL-vestmannaeyjar': ['Vestmannaeyjar','SUL','island',63.4427,-20.2734,8,['water','volcanic'],['family','friends','couple'],['island','volcanic','birding','museum','coastal'],
    'An archipelago where an eruption in 1973 buried four hundred houses and the islanders stopped the lava with seawater pumps, saving the harbour. The largest puffin colony on earth.'],
  'SUL-secret-lagoon': ['Secret Lagoon, Flúðir','SUL','pool',64.1375,-20.3092,6,['rural'],['couple','family'],['bathing','geothermal','pool','historic'],
    'The oldest swimming pool in Iceland, built in 1891, fed by hot springs that bubble along the edge, in a farming village that also grows most of the country’s mushrooms.'],
  'SUL-solheimajokull': ['Sólheimajökull','SUL','glacier',63.5300,-19.3700,7,['mountain'],['friends','family'],['glacier','hiking'],
    'An outlet tongue of Mýrdalsjökull a short walk from the road, which is where most glacier hikes in the south start and where the retreat since 2000 is painfully obvious.'],
  'SUL-kerio': ['Kerið','SUL','crater',64.0411,-20.8853,5,['volcanic'],['family','couple'],['crater','volcanic'],
    'A three-thousand-year-old crater with red scoria walls and opaque blue-green water in the bottom, on the Golden Circle and small enough to walk round in twenty minutes.'],

  /* ===================== HIGHLANDS ===================== */
  'HLD-landmannalaugar': ['Landmannalaugar','HLD','mountain',63.9897,-19.0611,9,['mountain','volcanic'],['friends','solo'],['hiking','geothermal','bathing','f_road','summer','remote'],
    'Rhyolite mountains in yellow, green and pink around a lava field, with a hot stream to sit in at the end of the day and the start of the Laugavegur trail.'],
  'HLD-laugavegur': ['Laugavegur trail','HLD','mountain',63.8500,-19.2000,8,['mountain'],['friends','solo'],['hiking','summer','remote','f_road','glacier'],
    'Fifty-five kilometres over four days from Landmannalaugar to Þórsmörk, through obsidian, black sand, river crossings and glacier edges. Huts must be booked months ahead.'],
  'HLD-thorsmork': ['Þórsmörk','HLD','valley',63.6800,-19.5000,8,['mountain','forest'],['friends','family'],['hiking','f_road','summer','glacier','remote'],
    'A sheltered valley of birch scrub between three glaciers, reached only by crossing unbridged rivers, which is why it is buses and modified 4x4s rather than hire cars.'],
  'HLD-askja': ['Askja & Víti','HLD','volcano',65.0300,-16.7500,7,['volcanic','desert'],['friends','solo'],['volcanic','f_road','summer','remote','bathing','darksky'],
    'A caldera in the middle of a black desert where Apollo astronauts trained, with a warm crater lake you can swim in and a long drive across the Ódáðahraun to get there.'],
  'HLD-kerlingarfjoll': ['Kerlingarfjöll','HLD','mountain',64.6386,-19.3053,7,['mountain','volcanic'],['friends','couple'],['geothermal','hiking','f_road','summer','remote'],
    'Steaming red and ochre rhyolite ridges at Hveradalir, with snow patches on the slopes above the vents and a mountain lodge at the bottom of the valley.'],
  'HLD-aldeyjarfoss': ['Aldeyjarfoss','HLD','falls',65.3689,-17.3389,6,['canyon','water'],['solo','couple'],['falls','canyon','f_road','remote'],
    'Twenty metres of white water into a pool ringed by dark hexagonal columns, at the northern end of the Sprengisandur route and reachable by car most of the summer.'],
  'HLD-hveravellir': ['Hveravellir','HLD','geyser',64.8667,-19.5667,6,['volcanic','desert'],['friends','solo'],['geothermal','bathing','f_road','summer','remote','darksky'],
    'A hot spring field halfway along the Kjölur route between two ice caps, with a bathing pool, a hut, and the lava cave an eighteenth-century outlaw couple lived in nearby.'],
  'HLD-langisjor': ['Langisjór','HLD','lake',64.1667,-18.3333,6,['mountain','water'],['solo','friends'],['remote','f_road','summer','hiking','darksky'],
    'A twenty-kilometre lake of deep blue between moss-covered ridges in the southern highlands, with no facilities, no phone signal and usually nobody else.'],
  'HLD-kverkfjoll': ['Kverkfjöll','HLD','glacier',64.6833,-16.6833,5,['mountain','volcanic'],['solo','friends'],['glacier','geothermal','f_road','remote','summer'],
    'Where a geothermal field meets the northern edge of Vatnajökull, melting ice caves out of the glacier from underneath. Guided only, and the caves are not always safe to enter.']

};

/* ---------- ids, sorted by prominence then name ---------- */
const IS_PLACE_IDS = Object.keys(IS_PLACES).sort((a, b) => {
  const d = (IS_PLACES[b][5] || 0) - (IS_PLACES[a][5] || 0);
  return d !== 0 ? d : IS_PLACES[a][0].localeCompare(IS_PLACES[b][0]);
});

function isPlaceGet(id){
  const p = IS_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'IS' } : null;
}

function isRegionName(code){ return (IS_REGIONS[code] || [])[0] || code; }
function isKindLabel(k){ return IS_KIND[k] || k; }

/* Places in one region, best known first. */
function isRegionPlaces(code){
  return IS_PLACE_IDS.filter(id => IS_PLACES[id][1] === code)
    .sort((a, b) => (IS_PLACES[b][5] || 0) - (IS_PLACES[a][5] || 0));
}

/* ---------- geography helpers ----------

   Iceland is small and almost everywhere is within fifty kilometres
   of salt water, so distance alone makes the whole country coastal
   and the sea panel meaningless. What matters instead is whether
   the place is ON the coast: a fjord town, a beach, a bird cliff.
   The interior is the exception that proves it. */

function isMaybeCoastal(p){
  if (!p) return false;
  if (p.abbr === 'HLD') return false;
  const f = p.flags || [];
  if (f.indexOf('coastal') !== -1 || f.indexOf('beach') !== -1
      || f.indexOf('fjord') !== -1 || f.indexOf('whales') !== -1
      || f.indexOf('seals') !== -1 || f.indexOf('surf') !== -1) return true;
  return ['coast','beach','cliff','fjord','island'].indexOf(p.kind) !== -1;
}

function isSeaOf(p){
  if (!p) return 'the sea';
  if (p.abbr === 'VFJ' || p.abbr === 'NWI') return 'the Greenland Sea';
  if (p.abbr === 'NEI') return 'the Greenland Sea';
  if (p.abbr === 'EST') return 'the Norwegian Sea';
  return 'the North Atlantic';
}

/* The interior, where the roads are gravel, the rivers are
   unbridged and the season is about ten weeks long. */
function isHighlands(p){
  if (!p) return false;
  if (p.abbr === 'HLD') return true;
  return (p.flags || []).indexOf('f_road') !== -1;
}

/* Anywhere the aurora is actually worth standing outside for:
   dark, open, and away from the Reykjavík glow. Almost all of
   Iceland qualifies, which is the point of the country in winter. */
function isAuroraSite(p){
  if (!p) return false;
  if ((p.flags || []).indexOf('aurora') !== -1) return true;
  if ((p.flags || []).indexOf('darksky') !== -1) return true;
  if (p.abbr === 'RVK') return p.kind === 'coast' || p.kind === 'island';
  return ['city','district','museum','church'].indexOf(p.kind) === -1;
}

/* Where ice is part of the place rather than scenery in the
   distance, so the glacier note is worth printing. */
function isGlacial(p){
  if (!p) return false;
  const f = p.flags || [];
  return f.indexOf('glacier') !== -1
      || ['glacier','lagoon'].indexOf(p.kind) !== -1;
}

/* Iceland sits on a plate boundary and the whole island is
   seismically live, but the swarms that matter cluster along the
   Reykjanes ridge, under Mývatn and beneath the ice caps. */
function isSeismic(p){
  if (!p) return false;
  return ['RNS','SUL','NEI','HLD','RVK'].indexOf(p.abbr) !== -1;
}

/* Above the treeline is not a useful idea in a country with almost
   no trees. What matters is exposure: how much weather the place
   catches, which decides whether the road is open. */
function isExposed(p){
  if (!p) return false;
  if (isHighlands(p)) return true;
  return ['mountain','pass','glacier','cliff','volcano','reserve'].indexOf(p.kind) !== -1;
}
