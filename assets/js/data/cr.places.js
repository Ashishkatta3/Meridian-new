/* ===========================================================
   COSTA RICA — regions and places

   Same packed-array shape as places.js and italy.places.js:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Its own namespace (CR_PLACES / crPlaceGet), like Italy's, so that
   nothing here can reach the US map, the US search index or the
   planner until the atlases are deliberately joined.

   Region codes are three letters, so "GUA-tamarindo" can never
   collide with a two-letter US state id. They are also distinct from
   every Italian code, which matters more than it looks: IT and CR
   both want a "CAR"-ish and a "SAR"-ish code, so the Costa Rican set
   was chosen to avoid every one of Italy's twenty.

   The regions are travel regions, not the seven provinces. Guanacaste
   the province contains both Tamarindo and Nosara, which are four
   hours apart and nothing like each other, while the thing everyone
   calls "Arenal" is split across two provinces. Nobody plans a trip
   here by province, so the file does not pretend they do.
   =========================================================== */

/* ---------- what a place IS, Costa Rican edition ---------- */
const CR_KIND = {
  city:     'City',
  town:     'Town',
  village:  'Village',
  np:       'National park',
  reserve:  'Reserve',
  refuge:   'Wildlife refuge',
  volcano:  'Volcano',
  beach:    'Beach',
  coast:    'Coastline',
  island:   'Island',
  lake:     'Lake',
  falls:    'Waterfall',
  mountain: 'Mountains',
  cave:     'Caves',
  river:    'River',
  ruin:     'Archaeological site',
  region:   'Region'
};

/* Extra flags this country needs that neither the US nor Italy did.
   The base FLAG list in taxonomy.js still applies underneath. */
const CR_FLAG = {
  unesco:      ['UNESCO',       'On the World Heritage list'],
  coastal:     ['Coastal',      'The sea is the whole point'],
  surf:        ['Surf',         'A break people travel for'],
  turtles:     ['Turtles',      'Sea turtles nest here'],
  diving:      ['Diving',       'Worth getting in the water with a tank'],
  rainforest:  ['Rainforest',   'Lowland tropical forest'],
  cloudforest: ['Cloud forest', 'Forest that lives inside the cloud layer'],
  hotsprings:  ['Hot springs',  'Volcanically heated water you can sit in'],
  birding:     ['Birding',      'A destination in its own right for birds'],
  indigenous:  ['Indigenous',   'Living indigenous territory or heritage']
};

/* ---------- the nine travel regions ----------
   code -> [ English name, Spanish name, character, blurb ] */
const CR_REGIONS = {
  CVL: ['Central Valley', 'Valle Central', 'urban',
    'The plateau where two thirds of the country lives, ringed by four volcanoes you can drive up. Coffee, colonial towns, and every road in the country starting here.'],
  ARE: ['Arenal & the Northern Plains', 'Zona Norte', 'volcanic',
    'A near-perfect cone above a lake, hot rivers running out of the hillside, and flat wet lowlands north of it full of birds.'],
  MON: ['Monteverde & the Tilarán Highlands', 'Monteverde', 'cloudforest',
    'Forest that lives inside a cloud, on a ridge the trade winds hit first. Quakers founded it, biologists made it famous.'],
  GUA: ['Guanacaste', 'Guanacaste', 'beach',
    'Dry tropical forest, geothermal volcanoes and the string of Pacific beaches that most direct flights are aimed at.'],
  NIC: ['Nicoya Peninsula & the Gulf', 'Península de Nicoya', 'beach',
    'A long peninsula of surf towns, yoga retreats and bad roads — and one of the five places on earth where people reliably live past ninety.'],
  CPA: ['Central Pacific', 'Pacífico Central', 'beach',
    'The closest coast to San José: scarlet macaws at Tárcoles, surf at Jacó, and the most visited national park in the country.'],
  SPA: ['South Pacific & Osa', 'Pacífico Sur', 'rainforest',
    'The wild end. Whales in the bay, the last great lowland rainforest on the Pacific side, and roads that stop mattering.'],
  TAL: ['Talamanca Highlands', 'Cordillera de Talamanca', 'mountain',
    'Above three thousand metres: quetzals in the oak cloud forest, páramo on the ridges, and the highest ground in the country.'],
  CAR: ['Caribbean Coast', 'Costa Caribeña', 'coastal',
    'The other country. Afro-Caribbean and Bribri rather than Spanish, rain all year, canals in the north and reef in the south.']
};

const CR_REGION_IDS = Object.keys(CR_REGIONS).sort((a, b) =>
  CR_REGIONS[a][0].localeCompare(CR_REGIONS[b][0]));

/* The whole country is one zone and does not observe daylight saving,
   which is the entire reason this is a function and not a constant
   lifted from the Italian file — Costa Rica is UTC−6 in January and
   UTC−6 in July, so anything that "helpfully" applies a summer offset
   is wrong here twice a year. */
function crZoneOf(){ return 'America/Costa_Rica'; }

/* ---------- the places ---------- */
const CR_PLACES = {

  /* ===================== CENTRAL VALLEY ===================== */
  'CVL-san-jose': ['San José','CVL','city',9.9281,-84.0907,7,['urban'],['solo','friends'],['history','art','food','nightlife'],
    'Not a pretty capital and it knows it. Come for the pre-Columbian gold, the jade collection and the best eating in the country, then leave.'],
  'CVL-poas-volcano': ['Poás Volcano','CVL','volcano',10.1980,-84.2320,9,['volcanic','mountain'],['family','couple'],['hiking','wildlife'],
    'You walk fifteen minutes from the car park and look straight down into an active crater with a steaming acid lake at the bottom. Access closes whenever it misbehaves.'],
  'CVL-irazu-volcano': ['Irazú Volcano','CVL','volcano',9.9792,-83.8522,8,['volcanic','mountain'],['family'],['hiking','roadtrip'],
    'The highest volcano in the country, with a green crater lake and a summit so bare it was used to stand in for the moon. Both oceans on a clear morning.'],
  'CVL-turrialba-volcano': ['Turrialba Volcano','CVL','volcano',10.0255,-83.7667,5,['volcanic','mountain'],[],['hiking'],
    'The restless one. It has been dusting the Central Valley with ash on and off since 2010, and the park opens and shuts according to its mood.'],
  'CVL-braulio-carrillo': ['Braulio Carrillo','CVL','np',10.1333,-83.9500,7,['forest','mountain'],['solo'],['hiking','wildlife','birding','rainforest'],
    'Fifty thousand hectares of near-vertical rainforest half an hour from the capital, cut by the highway to the Caribbean and almost untouched either side of it.'],
  'CVL-tapanti': ['Tapantí','CVL','np',9.7167,-83.7833,6,['forest','water'],[],['hiking','birding','wildlife','rainforest'],
    'One of the wettest places in Costa Rica — seven metres of rain a year — which is why the rivers here are loud and the birding is absurd.'],
  'CVL-orosi': ['Orosi Valley','CVL','town',9.7975,-83.8569,6,['rural','mountain'],['couple'],['history','food'],
    'A green bowl of coffee terraces around the oldest church still in use in the country, built in 1743 and still standing after everything Irazú has thrown at it.'],
  'CVL-cartago': ['Cartago','CVL','city',9.8644,-83.9194,6,['urban'],[],['history','art'],
    'The old capital, flattened by earthquakes twice. What survives is the basilica, where a quarter of the country walks every August to see a very small black stone Virgin.'],
  'CVL-guayabo': ['Guayabo National Monument','CVL','ruin',9.9800,-83.6922,6,['forest','rural'],[],['history','indigenous'],
    'The only significant archaeological site in the country: stone causeways, aqueducts that still run, and mounds of a city abandoned around 1400 for reasons nobody has established.'],
  'CVL-sarchi': ['Sarchí','CVL','town',10.0897,-84.3550,5,['rural'],['family'],['art','history'],
    'Where the painted oxcart comes from, and still where it is made. The craft is on the UNESCO intangible heritage list, which is rarer than it sounds.'],
  'CVL-grecia': ['Grecia','CVL','town',10.0725,-84.3133,4,['rural'],[],['history'],
    'A coffee town whose church is made of bolted red metal plates shipped from Belgium, because the valley kept shaking the stone ones down.'],
  'CVL-alajuela': ['Alajuela','CVL','city',10.0162,-84.2116,5,['urban'],[],['history','food'],
    'The airport town, and more pleasant than that makes it sound. Mango trees in the square and a museum to the barefoot drummer boy who stopped an American invasion in 1856.'],
  'CVL-heredia': ['Heredia','CVL','city',9.9981,-84.1197,4,['urban'],['solo'],['history','food','nightlife'],
    'A university town with a colonial fort in the middle and the coffee slopes of Barva starting at the top of the street.'],
  'CVL-barva-volcano': ['Barva Volcano','CVL','volcano',10.1358,-84.1025,5,['volcanic','forest'],['solo'],['hiking','birding','cloudforest'],
    'The quiet corner of Braulio Carrillo: a two-hour walk through dripping oak cloud forest to a cold green crater lake, usually with nobody else on the trail.'],
  'CVL-turrialba': ['Turrialba','CVL','town',9.9047,-83.6811,6,['rural','water'],['friends','group'],['water','food'],
    'A hot low town that exists now for two reasons — the Pacuare below it, and CATIE, whose botanical collection quietly feeds half the tropics.'],
  'CVL-pacuare-river': ['Pacuare River','CVL','river',9.8500,-83.5500,7,['water','forest'],['friends','group'],['water','camping','rainforest','wildlife'],
    'Thirty kilometres of class III–IV through a gorge with no road in it. Widely rated one of the best whitewater runs anywhere, and nearly dammed twice.'],
  'CVL-la-paz-waterfall': ['La Paz Waterfall Gardens','CVL','falls',10.2017,-84.1575,6,['water','forest'],['family'],['wildlife','birding'],
    'Five waterfalls on a walkway down a ravine, attached to an animal rescue centre. Expensive and thoroughly manicured, and the best close look at a toucan most people will get.'],
  'CVL-zarcero': ['Zarcero','CVL','village',10.1869,-84.3914,4,['rural','mountain'],['family'],['art'],
    'A cold hill village whose park is full of cypress topiary — arches, elephants, a bullfight — clipped by one man since 1964.'],

  /* ===================== ARENAL & THE NORTHERN PLAINS ===================== */
  'ARE-arenal-volcano': ['Arenal Volcano','ARE','volcano',10.4631,-84.7033,10,['volcanic','forest','mountain'],['couple','family'],['hiking','wildlife','hotsprings','rainforest'],
    'The cone everybody pictures. It erupted continuously from 1968 to 2010 and then stopped dead; what is left is a perfect shape, lava fields gone to forest, and the hot water still underneath.'],
  'ARE-la-fortuna': ['La Fortuna','ARE','town',10.4678,-84.6427,9,['rural','volcanic'],['family','couple','friends'],['hotsprings','food','wildlife','hiking'],
    'The adventure capital, and unapologetic about it. Hot springs, hanging bridges, canyoning and rafting all sold from the same square, with the volcano filling the end of the street.'],
  'ARE-la-fortuna-waterfall': ['La Fortuna Waterfall','ARE','falls',10.4486,-84.6711,8,['water','forest'],['couple','family'],['water','rainforest'],
    'Five hundred steps down a ravine to a seventy-metre fall landing in a pool you can swim in, as long as you respect the current where it lands.'],
  'ARE-lake-arenal': ['Lake Arenal','ARE','lake',10.5167,-84.8667,7,['water','mountain'],['couple'],['roadtrip','water'],
    'A reservoir that drowned two villages in 1979 and now generates a serious share of the national grid. The wind down its axis is reliable enough to have built a windsurfing scene.'],
  'ARE-el-castillo': ['El Castillo','ARE','village',10.4256,-84.7528,5,['rural','volcanic'],['couple'],['wildlife','birding'],
    'The quiet side of the volcano, on a dirt road above the lake. The view is better than from town and there is nothing to do, which is the point.'],
  'ARE-nuevo-arenal': ['Nuevo Arenal','ARE','village',10.5333,-84.9167,4,['rural','water'],[],['food','roadtrip'],
    'The village built to replace the one under the lake. A German bakery, a lake view, and the best stretch of the road around the north shore.'],
  'ARE-rio-celeste': ['Río Celeste & Tenorio Volcano','ARE','falls',10.7000,-84.9833,9,['water','forest','volcanic'],['couple','friends'],['hiking','rainforest','wildlife'],
    'A river that turns opaque sky-blue at the exact point two clear streams meet, because of how mineral particles there scatter light. The walk in is three hours of mud and worth every step.'],
  'ARE-bijagua': ['Bijagua','ARE','village',10.7333,-85.0500,5,['rural','forest'],['couple'],['wildlife','birding','rainforest'],
    'The village below Tenorio, between two volcanoes, that has quietly become one of the best places in the country to see a sloth without a crowd around it.'],
  'ARE-cano-negro': ['Caño Negro','ARE','refuge',10.8833,-84.7833,6,['water','forest'],['solo'],['wildlife','birding','camping'],
    'A seasonal wetland near the Nicaraguan border that floods into a shallow lake every wet season and fills with waterbirds, caiman and the occasional bull shark story.'],
  'ARE-sarapiqui': ['Puerto Viejo de Sarapiquí','ARE','town',10.4500,-84.0167,6,['water','forest'],['solo','family'],['wildlife','birding','rainforest','water'],
    'A banana and research town on a river that was the main route to the Caribbean before roads. Three serious biological stations sit within twenty minutes of it.'],
  'ARE-boca-tapada': ['Boca Tapada','ARE','village',10.6833,-84.1833,5,['forest','water'],['solo'],['birding','wildlife','rainforest'],
    'Far up a dirt road in the northern lowlands, and the single most reliable place on earth to photograph a great green macaw.'],
  'ARE-venado-caves': ['Venado Caves','ARE','cave',10.5500,-84.7667,4,['rural'],['friends','group'],['hiking'],
    'Two kilometres of limestone passage you go through in a helmet and a lot of mud, wading in places, with bats overhead throughout.'],
  'ARE-juan-castro-blanco': ['Juan Castro Blanco','ARE','np',10.3167,-84.3167,3,['forest','mountain','water'],[],['hiking','birding','cloudforest'],
    'The water park — created to protect the headwaters of five rivers rather than any view. Barely any infrastructure, barely any visitors.'],

  /* ===================== MONTEVERDE ===================== */
  'MON-monteverde-reserve': ['Monteverde Cloud Forest Reserve','MON','reserve',10.3000,-84.7903,10,['forest','mountain'],['couple','solo'],['hiking','wildlife','birding','cloudforest'],
    'The one that made cloud forest a thing people travel for. Moss on every surface, the continental divide running through it, and quetzals in the avocado trees between February and May.'],
  'MON-monteverde': ['Monteverde & Santa Elena','MON','town',10.3000,-84.8167,9,['mountain','rural'],['family','friends','couple'],['food','wildlife','cloudforest'],
    'Founded by Alabama Quakers who left rather than register for the draft, and who then protected the watershed above their dairy. The cheese factory and the zip lines both descend from that.'],
  'MON-santa-elena-reserve': ['Santa Elena Reserve','MON','reserve',10.3350,-84.8017,6,['forest','mountain'],['solo'],['hiking','birding','cloudforest'],
    'Higher, wetter and windier than Monteverde, run by the local high school, and with perhaps a tenth of the people on the trails.'],
  'MON-childrens-eternal-rainforest': ['Children’s Eternal Rainforest','MON','reserve',10.3167,-84.7500,5,['forest'],['solo'],['wildlife','birding','cloudforest','rainforest'],
    'The largest private reserve in the country, bought hectare by hectare with money raised by schoolchildren in Sweden and then forty other countries.'],
  'MON-curi-cancha': ['Curi-Cancha Reserve','MON','reserve',10.3094,-84.8019,5,['forest'],['couple','solo'],['birding','wildlife','cloudforest'],
    'A former farm replanted into forest, with open ground as well as canopy — which is exactly why the bird list here rivals the big reserve next door.'],

  /* ===================== GUANACASTE ===================== */
  'GUA-rincon-de-la-vieja': ['Rincón de la Vieja','GUA','volcano',10.8300,-85.3242,9,['volcanic','forest','mountain'],['friends','couple'],['hiking','hotsprings','wildlife'],
    'A volcano with its plumbing on the surface: boiling mud pots, fumaroles and a blue-grey sulphur stream, all on a loop trail through dry forest below the summit.'],
  'GUA-santa-rosa': ['Santa Rosa','GUA','np',10.8375,-85.6189,7,['forest','beach'],['solo','friends'],['history','surf','wildlife','turtles','camping'],
    'The first national park in the country, protecting both the last big stand of dry tropical forest and the hacienda where Costa Rica saw off a filibuster army in 1856. Witch’s Rock is at the bottom of it.'],
  'GUA-tamarindo': ['Tamarindo','GUA','beach',10.2994,-85.8400,8,['beach','urban'],['friends','family'],['surf','nightlife','food','coastal'],
    'The most developed beach town on this coast and the easiest place in the country to learn to surf. Busy, loud, and genuinely good at what it does.'],
  'GUA-playa-conchal': ['Playa Conchal','GUA','beach',10.3972,-85.8286,7,['beach'],['couple','honeymoon'],['coastal','water'],
    'A beach made of crushed shell instead of sand, sloping into unusually clear water for this coast. Walk in from Brasilito rather than paying to park.'],
  'GUA-playa-grande': ['Playa Grande & Las Baulas','GUA','beach',10.3333,-85.8500,7,['beach'],['couple','solo'],['surf','turtles','coastal','wildlife'],
    'A long undeveloped strand protected as a leatherback nesting park. Strong consistent surf by day; between October and February, the largest turtle on earth comes ashore at night.'],
  'GUA-papagayo': ['Papagayo Peninsula','GUA','coast',10.6500,-85.6500,7,['beach','rural'],['honeymoon','couple'],['coastal','water','diving'],
    'The resort end of Guanacaste — a planned peninsula of calm bays and large hotels, with the best protected swimming water on the north coast.'],
  'GUA-liberia': ['Liberia','GUA','city',10.6346,-85.4377,6,['urban','rural'],[],['history','food','roadtrip'],
    'The white city, named for the pale stone of its old houses, and the practical hinge of the whole region: the international airport is here and every beach road starts from it.'],
  'GUA-palo-verde': ['Palo Verde','GUA','np',10.3500,-85.3500,6,['water','forest'],['solo'],['birding','wildlife','rainforest'],
    'Seasonal marsh on the Tempisque floodplain under a limestone ridge. In the dry season the water shrinks and every wading bird in the region concentrates onto what is left.'],
  'GUA-playas-del-coco': ['Playas del Coco','GUA','beach',10.5500,-85.7000,6,['beach','urban'],['friends','group'],['diving','nightlife','coastal','food'],
    'A working Costa Rican beach town rather than a resort one — grey sand, a fishing fleet, and the dive boats for the Catalina and Bat Islands leaving from the same pier.'],
  /* Two different beaches really are called Playa Hermosa, four hours
     apart, and people book the wrong one constantly. Both carry the
     qualifier in their name rather than only in the region label. */
  'GUA-playa-hermosa-gte': ['Playa Hermosa (Guanacaste)','GUA','beach',10.5783,-85.6808,6,['beach'],['family','couple'],['coastal','water','diving'],
    'A calm grey-sand crescent round the headland from Coco, with almost no surf and almost no nightlife. The one on this coast people bring small children to.'],
  'GUA-playa-flamingo': ['Playa Flamingo','GUA','beach',10.4347,-85.7889,6,['beach'],['couple','honeymoon'],['coastal','water'],
    'White sand on a headland between two bays, with the marina that most of the region’s sportfishing runs out of.'],
  'GUA-miravalles': ['Miravalles Volcano','GUA','volcano',10.7483,-85.1533,5,['volcanic','rural'],['couple'],['hotsprings','hiking'],
    'The highest volcano in the Guanacaste range, and the one being quietly tapped — the geothermal field on its flank supplies a useful fraction of national electricity.'],
  'GUA-playa-avellanas': ['Playa Avellanas','GUA','beach',10.2167,-85.8333,5,['beach'],['friends','solo'],['surf','coastal'],
    'Seven breaks along two kilometres, a famous beach bar, and no town at all. The serious half of the Tamarindo surf scene.'],
  'GUA-playa-negra': ['Playa Negra','GUA','beach',10.1833,-85.8333,5,['beach'],['friends','solo'],['surf','coastal'],
    'A fast right-hand reef break over rock, made famous by a surf film in 1994 and still mostly unbothered by anything but surfers.'],
  'GUA-bahia-salinas': ['Bahía Salinas','GUA','beach',11.0500,-85.7333,5,['beach','rural'],['friends'],['water','coastal'],
    'The far northwest corner, on the Nicaraguan border. Relentless dry-season wind, which is useless for swimming and perfect for kiteboarding.'],
  'GUA-llanos-de-cortes': ['Llanos de Cortés','GUA','falls',10.4119,-85.2308,5,['water','forest'],['family','friends'],['water'],
    'A broad curtain of water dropping into a sandy pool just off the highway south of Liberia — wider than it is tall, and warm enough to stay in.'],
  'GUA-guanacaste-np': ['Guanacaste National Park','GUA','np',10.9500,-85.4500,4,['forest','mountain','volcanic'],['solo'],['hiking','wildlife','birding'],
    'The corridor that lets dry-forest species climb from the lowlands to the Orosí and Cacao volcanoes as the climate shifts. Research stations, not visitor centres.'],
  'GUA-diria': ['Diriá','GUA','np',10.1833,-85.5833,3,['forest','mountain'],[],['hiking','birding'],
    'A small upland park protecting the forest that still feeds the Nicoya peninsula’s rivers. Almost nobody goes, which is most of its appeal.'],

  /* ===================== NICOYA PENINSULA & THE GULF ===================== */
  'NIC-santa-teresa': ['Santa Teresa','NIC','beach',9.6464,-85.1664,8,['beach'],['friends','couple'],['surf','food','nightlife','coastal'],
    'A dirt main street, a four-kilometre beach break that works nearly every day, and a food scene out of all proportion to the road that gets you there.'],
  'NIC-nosara': ['Nosara','NIC','beach',9.9833,-85.6500,8,['beach','forest'],['couple','solo'],['surf','wildlife','coastal','turtles'],
    'Zoning that keeps the building line behind the trees, a beginner-friendly beach break at Guiones, and more yoga per capita than anywhere else in Central America.'],
  'NIC-montezuma': ['Montezuma','NIC','town',9.6553,-85.0697,7,['beach','forest'],['solo','friends'],['water','coastal','food'],
    'A tiny bohemian town stacked on a cove, with a three-tier waterfall walking distance inland. Has resisted becoming Santa Teresa for thirty years.'],
  'NIC-samara': ['Sámara','NIC','beach',9.8814,-85.5289,7,['beach'],['family','couple'],['coastal','surf','food'],
    'A reef across the mouth of the bay takes the force out of the swell, which makes this the rare Pacific beach that is safe to swim and still has a wave to learn on.'],
  'NIC-ostional': ['Ostional','NIC','refuge',9.9833,-85.7000,6,['beach'],['solo'],['turtles','wildlife','coastal'],
    'Where the arribada happens: tens of thousands of olive ridley turtles coming ashore over a few nights, several times a year, on one black-sand beach.'],
  'NIC-cabo-blanco': ['Cabo Blanco Reserve','NIC','reserve',9.5833,-85.1167,6,['forest','beach'],['solo'],['hiking','wildlife','birding','coastal'],
    'The first protected area in the country, set aside in 1963 by a Danish-Swedish couple who watched the forest around them being cut. Two hours down to an empty beach and back.'],
  'NIC-malpais': ['Mal País','NIC','beach',9.6000,-85.1333,6,['beach'],['couple','solo'],['surf','coastal','food'],
    'The southern, rockier, quieter continuation of Santa Teresa, with a working fishing cove at the end of it.'],
  'NIC-barra-honda': ['Barra Honda','NIC','cave',10.1667,-85.3667,5,['mountain','forest'],['friends'],['hiking','wildlife'],
    'A limestone ridge honeycombed with over forty caves, most never fully explored. You go down into Terciopelo on a ladder with a guide roped above you.'],
  'NIC-playa-carrillo': ['Playa Carrillo','NIC','beach',9.8619,-85.4847,5,['beach'],['family','couple'],['coastal','water'],
    'A perfect palm-backed curve with no building on it at all, because the development all went to Sámara five kilometres north.'],
  'NIC-puntarenas': ['Puntarenas','NIC','city',9.9763,-84.8384,5,['urban','beach'],[],['food','history','coastal'],
    'A sandspit city that was the country’s main Pacific port until containers moved south. Faded, hot, and the place every ferry to the peninsula leaves from.'],
  'NIC-isla-tortuga': ['Isla Tortuga','NIC','island',9.7667,-84.8833,5,['island','beach'],['family','group'],['coastal','water','diving'],
    'White sand and clear water an hour out into the Gulf of Nicoya, and the standard day trip from Puntarenas or Montezuma.'],
  'NIC-tambor': ['Tambor','NIC','beach',9.7333,-85.0167,4,['beach'],['family'],['coastal','water'],
    'A long sheltered grey-sand bay with an airstrip, calm water and very little going on.'],
  'NIC-curu': ['Curú Wildlife Refuge','NIC','refuge',9.8000,-84.9333,4,['forest','beach'],['family','solo'],['wildlife','birding','coastal'],
    'A small private refuge on a working farm where the mangrove, the dry forest and the beach meet, and the monkeys have no fear of anybody.'],
  'NIC-isla-san-lucas': ['Isla San Lucas','NIC','island',9.9333,-84.8833,4,['island','forest'],['solo'],['history','wildlife'],
    'A penal colony until 1991, now a national park. The cell blocks are still standing with prisoner drawings on the walls, and deer wander the paths between them.'],
  'NIC-nicoya': ['Nicoya','NIC','town',10.1483,-85.4522,4,['rural','urban'],[],['history','food'],
    'The old Chorotega capital and the administrative middle of the peninsula, with one of the oldest churches in the country on the square.'],

  /* ===================== CENTRAL PACIFIC ===================== */
  'CPA-manuel-antonio': ['Manuel Antonio','CPA','np',9.3906,-84.1372,10,['beach','forest'],['family','couple'],['wildlife','coastal','birding','rainforest'],
    'The smallest and most visited national park in the country: rainforest running straight down to four white beaches, with sloths and squirrel monkeys in the trees over the sand.'],
  'CPA-jaco': ['Jacó','CPA','beach',9.6144,-84.6294,7,['beach','urban'],['friends','group'],['surf','nightlife','food','coastal'],
    'Ninety minutes from San José, which explains everything about it. A long grey beach, a loud main strip, and the easiest weekend surf in the country.'],
  'CPA-carara': ['Carara','CPA','np',9.7833,-84.6000,7,['forest','water'],['solo','couple'],['birding','wildlife','rainforest'],
    'Where the dry forest of the north and the wet forest of the south overlap, so the species lists from both turn up on one trail. The scarlet macaws here are wild and loud.'],
  'CPA-quepos': ['Quepos','CPA','town',9.4319,-84.1619,6,['urban','water'],['friends'],['food','water','nightlife'],
    'The old banana port that now serves the park up the hill — a marina, a sportfishing fleet, and the cheaper place to sleep and eat.'],
  'CPA-playa-hermosa-jaco': ['Playa Hermosa (Jacó)','CPA','beach',9.5747,-84.5897,6,['beach'],['friends','solo'],['surf','turtles','coastal'],
    'A heavy, fast beach break with a national surf competition on it and a turtle hatchery at the south end. Not a swimming beach, and signposted as such.'],
  'CPA-tarcoles': ['Tárcoles','CPA','village',9.7833,-84.6333,5,['water','rural'],['family'],['wildlife','birding'],
    'A fishing village under the bridge where everyone stops to look at the American crocodiles lying on the sandbanks below — some of them five metres long.'],
  'CPA-herradura': ['Herradura','CPA','beach',9.6500,-84.6667,5,['beach'],['family','group'],['coastal','water'],
    'A horseshoe bay with the big marina and resort development, and much calmer water than Jacó next door.'],
  'CPA-rainmaker': ['Rainmaker','CPA','reserve',9.4833,-84.1333,4,['forest','water'],['solo','couple'],['hiking','birding','rainforest'],
    'A private reserve in a steep river valley with the oldest canopy bridge walk in the country, and a fraction of the crowd at Manuel Antonio.'],
  'CPA-esterillos': ['Esterillos','CPA','beach',9.5333,-84.5000,4,['beach'],['couple','solo'],['surf','coastal'],
    'Kilometres of empty grey sand between Jacó and Parrita, split into three villages, with a bronze mermaid on a rock at the east end.'],

  /* ===================== SOUTH PACIFIC & OSA ===================== */
  'SPA-corcovado': ['Corcovado','SPA','np',8.5500,-83.5833,10,['forest','beach'],['solo','friends'],['hiking','wildlife','birding','rainforest','camping'],
    'National Geographic called it the most biologically intense place on earth and nobody has really argued. The last great lowland rainforest on the Pacific side of Central America, with tapir, all four monkeys and the country’s best chance of a cat.'],
  'SPA-uvita': ['Uvita & Marino Ballena','SPA','beach',9.1619,-83.7447,8,['beach','water'],['family','couple'],['coastal','wildlife','water'],
    'A sandbar shaped exactly like a whale’s tail, exposed at low tide, in a marine park that humpbacks from both hemispheres use — which gives it two whale seasons a year.'],
  'SPA-drake-bay': ['Drake Bay','SPA','coast',8.6958,-83.6697,8,['beach','forest'],['couple','solo'],['wildlife','diving','rainforest','coastal'],
    'Reached by boat up a river mouth or a very bad road. The northern gateway to Corcovado, and the launching point for Caño Island.'],
  'SPA-puerto-jimenez': ['Puerto Jiménez','SPA','town',8.5333,-83.3000,7,['urban','forest'],['solo'],['wildlife','food','birding'],
    'The one real town on the Osa, a gold-rush settlement that became the place you organise a Corcovado permit, hire a guide and buy batteries.'],
  'SPA-dominical': ['Dominical','SPA','beach',9.2531,-83.8575,6,['beach'],['friends','solo'],['surf','coastal','food'],
    'A dirt-road surf town with a powerful beach break, a strong expat streak and the Nauyaca falls up the hill behind it.'],
  'SPA-cabo-matapalo': ['Cabo Matapalo','SPA','beach',8.3833,-83.2833,6,['beach','forest'],['couple','solo'],['surf','wildlife','rainforest','coastal'],
    'The tip of the Osa, where three right-hand point breaks sit below primary forest full of scarlet macaws. Almost no infrastructure by design.'],
  'SPA-cano-island': ['Caño Island','SPA','island',8.7167,-83.8833,6,['island','water'],['friends','group'],['diving','coastal','history'],
    'The best visibility on the Pacific side, twenty kilometres offshore, with reef sharks and rays — and pre-Columbian stone spheres in the forest, though landing is now restricted.'],
  'SPA-nauyaca': ['Nauyaca Waterfalls','SPA','falls',9.2667,-83.7833,6,['water','forest'],['friends','family'],['water','hiking'],
    'Two falls on the Barú — a short upper drop and a forty-five-metre lower one into a pool big enough to swim across. You walk, ride a horse or take a truck in.'],
  'SPA-pavones': ['Pavones','SPA','beach',8.4000,-83.1333,6,['beach'],['friends','solo'],['surf','coastal'],
    'One of the longest left-hand point breaks on the planet — on a good southern swell the ride is measured in minutes. Eight hours from San José, which keeps it honest.'],
  'SPA-isla-del-coco': ['Cocos Island','SPA','island',5.5236,-87.0569,7,['island','forest','water'],['group'],['diving','unesco','wildlife'],
    'Five hundred kilometres offshore, reachable only by a thirty-hour liveaboard, and the single best place in the world to see schooling hammerheads. Nobody lives there but the rangers.'],
  'SPA-sierpe': ['Sierpe','SPA','village',8.8500,-83.4667,5,['water','forest'],['solo'],['wildlife','birding','rainforest'],
    'A river village at the edge of the largest mangrove system in Central America, and the embarkation point for Drake Bay.'],
  'SPA-piedras-blancas': ['Piedras Blancas','SPA','np',8.7500,-83.2000,5,['forest'],['solo'],['wildlife','birding','rainforest'],
    'Corcovado’s overflow across the Golfo Dulce — the same lowland forest, far fewer permits, and a sizeable chunk of it bought back from loggers by Austrian donors.'],
  'SPA-golfito': ['Golfito','SPA','town',8.6333,-83.1667,5,['urban','water','forest'],[],['history','wildlife','water'],
    'A United Fruit company town until 1985, left with its wooden American houses, a deep still gulf in front and rainforest climbing the ridge behind.'],
  'SPA-diquis-spheres': ['Diquís Stone Spheres','SPA','ruin',8.9333,-83.4833,5,['rural'],['solo'],['history','unesco','indigenous'],
    'Hundreds of near-perfect granodiorite spheres, up to two and a half metres across, carved before 1500 and moved kilometres. Four sites near Palmar are on the World Heritage list.'],
  'SPA-la-amistad': ['La Amistad','SPA','np',9.1000,-83.0500,5,['mountain','forest'],['solo'],['hiking','birding','unesco','cloudforest'],
    'Shared with Panama and larger than every other Costa Rican park combined. Mostly trackless, genuinely wild, and entered only from the edges.'],
  'SPA-ojochal': ['Ojochal','SPA','village',9.1000,-83.6667,4,['rural','forest'],['couple'],['food'],
    'A village in the hills behind the coast that filled up with French and Belgian settlers in the 1990s and now has the densest good cooking in rural Costa Rica.'],
  'SPA-zancudo': ['Playa Zancudo','SPA','beach',8.5167,-83.1333,4,['beach'],['solo','couple'],['surf','coastal'],
    'A sandbar between the gulf and a mangrove estuary, reached by boat or a long dirt road. Hammocks, a handful of cabinas, and nothing else.'],
  'SPA-san-vito': ['San Vito','SPA','town',8.8208,-82.9719,4,['rural','mountain'],['solo'],['birding','food'],
    'Founded by Italian settlers in the 1950s, still visibly so, and next door to the Wilson Botanical Garden — one of the best tropical plant collections anywhere.'],

  /* ===================== TALAMANCA HIGHLANDS ===================== */
  'TAL-chirripo': ['Chirripó','TAL','mountain',9.4844,-83.4886,9,['mountain','forest'],['solo','friends'],['hiking','camping','birding'],
    'The highest point in the country at 3,820 metres. Two days up through oak forest into open páramo, and from the summit at dawn you can see both oceans.'],
  'TAL-san-gerardo-de-dota': ['San Gerardo de Dota','TAL','village',9.5500,-83.8000,7,['mountain','forest','water'],['couple','solo'],['birding','cloudforest','wildlife','food'],
    'A steep river valley of oak cloud forest at 2,200 metres, and the most dependable place in Central America to see a resplendent quetzal — often from the breakfast table.'],
  'TAL-san-gerardo-de-rivas': ['San Gerardo de Rivas','TAL','village',9.4697,-83.5758,5,['mountain','rural'],['solo','friends'],['hiking','birding'],
    'The village at the Chirripó trailhead, where everyone sleeps the night before and the night after, and where the permits are collected.'],
  'TAL-cerro-de-la-muerte': ['Cerro de la Muerte','TAL','mountain',9.5667,-83.7500,5,['mountain'],['solo'],['hiking','birding','darksky'],
    'The high pass on the Pan-American at 3,450 metres, named for the people who died crossing it on foot before the road. Stunted páramo, freezing fog, and very dark skies.'],
  'TAL-los-quetzales': ['Los Quetzales','TAL','np',9.6333,-83.8500,5,['forest','mountain','water'],['solo'],['birding','hiking','cloudforest'],
    'Created in 2005 around the headwaters of the Savegre, protecting the oak forest the quetzals depend on — the trees whose fruit they time their nesting to.'],
  'TAL-san-isidro': ['San Isidro de El General','TAL','town',9.3778,-83.7028,3,['urban','rural'],[],['food','roadtrip'],
    'The market town of the southern valley, where everyone heading for Chirripó, Dominical or the Osa changes buses.'],

  /* ===================== CARIBBEAN COAST ===================== */
  'CAR-tortuguero': ['Tortuguero','CAR','np',10.5431,-83.5042,9,['water','forest','beach'],['family','couple'],['turtles','wildlife','birding','rainforest','coastal'],
    'No road reaches it. A lattice of freshwater canals behind a black-sand beach where green turtles have nested for as long as anyone has recorded, and still do in their thousands.'],
  'CAR-puerto-viejo': ['Puerto Viejo de Talamanca','CAR','town',9.6558,-82.7547,8,['beach','forest'],['friends','solo','couple'],['surf','nightlife','food','coastal'],
    'Calypso, patties, reggae and a reef break called Salsa Brava that breaks over coral and takes boards apart. The most distinct town in the country.'],
  'CAR-cahuita': ['Cahuita','CAR','np',9.7394,-82.8403,8,['beach','forest','water'],['couple','family'],['coastal','wildlife','diving','birding'],
    'A white beach and the country’s best surviving coral reef, with a trail along the shore between them. The entrance at Kelly Creek still runs on a donation rather than a fee.'],
  'CAR-punta-uva': ['Punta Uva','CAR','beach',9.6333,-82.6833,6,['beach','forest'],['couple','family','honeymoon'],['coastal','water','wildlife'],
    'The prettiest beach on this coast — two coves either side of a forested headland, calm enough to swim, with sloths in the trees at the back of the sand.'],
  'CAR-manzanillo': ['Manzanillo','CAR','refuge',9.6333,-82.6500,6,['beach','forest','water'],['couple','solo'],['coastal','wildlife','birding','diving'],
    'The end of the road, and a refuge where reef, beach and swamp forest run together. The coastal walk towards Panama is the best easy hike on the Caribbean side.'],
  'CAR-playa-cocles': ['Playa Cocles','CAR','beach',9.6458,-82.7342,5,['beach'],['friends','solo'],['surf','coastal'],
    'The main beach break south of Puerto Viejo, lifeguarded in season and consistent enough to be where most people actually surf.'],
  'CAR-puerto-limon': ['Puerto Limón','CAR','city',9.9907,-83.0359,5,['urban','water'],[],['history','food','music'],
    'The country’s main Caribbean port and the heart of its Afro-Caribbean culture, founded on the railway and the banana. Carnival in October is the real thing.'],
  'CAR-bribri': ['Bribri & Talamanca','CAR','village',9.6167,-82.8500,4,['rural','forest','mountain'],['solo'],['indigenous','wildlife','rainforest'],
    'The gateway to the Bribri and Cabécar territories in the mountains behind the coast, where visits run through the communities themselves rather than around them.'],
  'CAR-barra-del-colorado': ['Barra del Colorado','CAR','refuge',10.7833,-83.5833,4,['water','forest'],['solo'],['wildlife','birding','water'],
    'The wetland north of Tortuguero against the Nicaraguan border — bigger, wilder, with far fewer boats and a long reputation for tarpon.'],
  'CAR-veragua': ['Veragua Rainforest','CAR','reserve',9.9000,-83.1833,4,['forest','water'],['family'],['wildlife','birding','rainforest'],
    'A research station that takes visitors, in the hills behind Limón, with a frog and butterfly collection that makes the rainforest legible before you walk into it.'],
  'CAR-barbilla': ['Barbilla','CAR','np',9.9833,-83.4500,3,['forest','mountain','water'],[],['hiking','wildlife','rainforest','indigenous'],
    'Very wet lowland forest on the Cabécar territory edge, with almost no facilities and a resident jaguar population nobody advertises.']
};

const CR_PLACE_IDS = Object.keys(CR_PLACES);

/* ===========================================================
   WIKIPEDIA TITLES THAT ARE NOT THE PLACE NAME

   Costa Rican place names collide with ordinary Spanish nouns far
   more often than Italian ones do. "Tamarindo" is a fruit, "Sámara"
   is a Russian city, "Puerto Viejo" is at least three different
   towns, and half the national parks are filed under their full
   "X National Park" title rather than the bare name.

   Every one of those is listed here rather than guessed at, because
   a wrong guess silently shows the wrong photograph — which is
   exactly the failure that put Colorado's red rocks on an Illinois
   page. Where a place genuinely is the primary topic for its own
   name, it is left out and resolved by name.
   =========================================================== */
const CR_WIKI = {
  /* Central Valley towns, every one of which collides with somewhere
     better known: "San José" is in California, "Grecia" is Spanish
     for Greece, "Cartago" is Carthage, and "Heredia" is a surname. */
  'CVL-san-jose':              'San José, Costa Rica',
  'CVL-cartago':               'Cartago, Costa Rica',
  'CVL-grecia':                'Grecia, Costa Rica',
  'CVL-heredia':               'Heredia, Costa Rica',
  'CVL-alajuela':              'Alajuela',
  'CVL-zarcero':               'Zarcero',
  'CVL-sarchi':                'Sarchí',

  /* national parks and reserves — nearly all need the full title */
  'CVL-poas-volcano':          'Poás Volcano National Park',
  'CVL-irazu-volcano':         'Irazú Volcano National Park',
  'CVL-turrialba-volcano':     'Turrialba Volcano National Park',
  'CVL-braulio-carrillo':      'Braulio Carrillo National Park',
  'CVL-tapanti':               'Tapantí National Park',
  'CVL-guayabo':               'Guayabo National Monument',
  'CVL-barva-volcano':         'Barva Volcano',
  'CVL-pacuare-river':         'Pacuare River',
  'CVL-la-paz-waterfall':      'La Paz Waterfall Gardens',
  'CVL-orosi':                 'Orosi',
  'ARE-arenal-volcano':        'Arenal Volcano National Park',
  'ARE-la-fortuna':            'La Fortuna, San Carlos',
  'ARE-la-fortuna-waterfall':  'La Fortuna Waterfall',
  'ARE-lake-arenal':           'Lake Arenal',
  'ARE-rio-celeste':           'Tenorio Volcano National Park',
  'ARE-cano-negro':            'Caño Negro Wildlife Refuge',
  'ARE-sarapiqui':             'Puerto Viejo de Sarapiquí',
  'ARE-juan-castro-blanco':    'Juan Castro Blanco National Park',
  'ARE-venado-caves':          'Venado Caves',
  'ARE-el-castillo':           'El Castillo, Costa Rica',
  'MON-monteverde-reserve':    'Monteverde Cloud Forest Reserve',
  'MON-monteverde':            'Monteverde',
  'MON-santa-elena-reserve':   'Santa Elena Cloud Forest Reserve',
  'MON-childrens-eternal-rainforest':'Children’s Eternal Rainforest',
  'GUA-rincon-de-la-vieja':    'Rincón de la Vieja Volcano National Park',
  'GUA-santa-rosa':            'Santa Rosa National Park',
  'GUA-guanacaste-np':         'Guanacaste National Park',
  'GUA-palo-verde':            'Palo Verde National Park',
  'GUA-diria':                 'Diriá National Park',
  'GUA-miravalles':            'Miravalles Volcano',
  'GUA-playa-grande':          'Las Baulas National Marine Park',
  'GUA-tamarindo':             'Tamarindo, Costa Rica',
  'GUA-playa-conchal':         'Playa Conchal',
  'GUA-playas-del-coco':       'Playas del Coco',
  'GUA-playa-hermosa-gte':     'Playa Hermosa, Guanacaste',
  'GUA-playa-flamingo':        'Playa Flamingo, Costa Rica',
  'GUA-liberia':               'Liberia, Costa Rica',
  'GUA-llanos-de-cortes':      'Llanos de Cortés',
  'GUA-bahia-salinas':         'Bahía Salinas',
  'NIC-santa-teresa':          'Santa Teresa, Puntarenas',
  'NIC-nosara':                'Nosara',
  'NIC-samara':                'Sámara, Costa Rica',
  'NIC-montezuma':             'Montezuma, Puntarenas',
  'NIC-malpais':               'Mal País, Costa Rica',
  'NIC-cabo-blanco':           'Cabo Blanco Absolute Natural Reserve',
  'NIC-barra-honda':           'Barra Honda National Park',
  'NIC-ostional':              'Ostional Wildlife Refuge',
  'NIC-curu':                  'Curú Wildlife Refuge',
  'NIC-isla-san-lucas':        'San Lucas Island',
  'NIC-isla-tortuga':          'Tortuga Island, Costa Rica',
  'NIC-puntarenas':            'Puntarenas',
  'NIC-nicoya':                'Nicoya',
  'NIC-tambor':                'Tambor, Costa Rica',
  'NIC-playa-carrillo':        'Playa Carrillo',
  'CPA-manuel-antonio':        'Manuel Antonio National Park',
  'CPA-carara':                'Carara National Park',
  'CPA-jaco':                  'Jacó, Costa Rica',
  'CPA-quepos':                'Quepos',
  'CPA-playa-hermosa-jaco':    'Playa Hermosa, Puntarenas',
  'CPA-tarcoles':              'Tárcoles',
  'CPA-herradura':             'Herradura, Costa Rica',
  'CPA-esterillos':            'Esterillos',
  'SPA-corcovado':             'Corcovado National Park',
  'SPA-uvita':                 'Ballena Marine National Park',
  'SPA-drake-bay':             'Drake Bay',
  'SPA-puerto-jimenez':        'Puerto Jiménez',
  'SPA-dominical':             'Dominical',
  'SPA-cano-island':           'Caño Island',
  'SPA-isla-del-coco':         'Cocos Island',
  'SPA-piedras-blancas':       'Piedras Blancas National Park',
  'SPA-la-amistad':            'La Amistad International Park',
  'SPA-diquis-spheres':        'Stone spheres of Costa Rica',
  'SPA-golfito':               'Golfito',
  'SPA-sierpe':                'Sierpe',
  'SPA-pavones':               'Pavones',
  'SPA-san-vito':              'San Vito, Costa Rica',
  'SPA-nauyaca':               'Nauyaca Waterfalls',
  'SPA-cabo-matapalo':         'Matapalo',
  'TAL-chirripo':              'Chirripó National Park',
  'TAL-los-quetzales':         'Los Quetzales National Park',
  'TAL-cerro-de-la-muerte':    'Cerro de la Muerte',
  'TAL-san-gerardo-de-dota':   'San Gerardo de Dota',
  'TAL-san-isidro':            'San Isidro de El General',
  'CAR-tortuguero':            'Tortuguero National Park',
  'CAR-cahuita':               'Cahuita National Park',
  'CAR-puerto-viejo':          'Puerto Viejo de Talamanca',
  'CAR-puerto-limon':          'Limón',
  'CAR-manzanillo':            'Gandoca-Manzanillo Wildlife Refuge',
  'CAR-punta-uva':             'Punta Uva',
  'CAR-playa-cocles':          'Playa Cocles',
  'CAR-barbilla':              'Barbilla National Park',
  'CAR-barra-del-colorado':    'Barra del Colorado Wildlife Refuge',
  'CAR-bribri':                'Bribri people'
};

/* ---------- accessors, matching the Italian shape ---------- */
function crPlaceGet(id){
  const p = CR_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'CR' } : null;
}

function crRegionName(code){ return (CR_REGIONS[code] || [])[0] || code; }
function crKindLabel(k){ return CR_KIND[k] || k; }

/* Places in one region, best known first. */
function crRegionPlaces(code){
  return CR_PLACE_IDS.filter(id => CR_PLACES[id][1] === code)
    .sort((a, b) => (CR_PLACES[b][5] || 0) - (CR_PLACES[a][5] || 0));
}

/* Definitely on the water — used where the answer has to be certain. */
function crIsCoastal(p){
  if (!p) return false;
  if (['coast','beach','island'].indexOf(p.kind) !== -1) return true;
  const land = p.land || [];
  return land.indexOf('beach') !== -1 || land.indexOf('island') !== -1;
}

/* The four travel regions with no coastline.

   Note this is NOT the same question as "is it in a landlocked
   province" — Costa Rica has two coasts and almost every province
   touches one of them. What matters is whether asking the marine
   grid could ever return something, and for the Central Valley, the
   northern plains, the Monteverde ridge and the Talamanca highlands
   it cannot. */
const CR_LANDLOCKED = { CVL: 1, ARE: 1, MON: 1, TAL: 1 };

/* Might be on the water. A coastal TOWN carries none of the beach or
   island tags — Puerto Limón and Golfito are tagged "urban" — so the
   strict test above misses the ports. The marine grid answers an
   inland cell with every field null and that case is handled, so the
   honest thing is to ask wherever the region has a coast at all and
   let the forecast decide. */
function crMaybeCoastal(p){
  if (!p) return false;
  if (crIsCoastal(p)) return true;
  return !CR_LANDLOCKED[p.abbr];
}

/* Which ocean, which matters here in a way it never did for Italy.
   The Caribbean and the Pacific sit on opposite sides of a country
   four hours wide and behave nothing alike: the Pacific runs a
   three-metre tide and big southern swell, the Caribbean barely has
   a tide at all and goes flat for months. Anything that reports sea
   conditions should be able to say which of the two it means. */
function crOceanOf(p){
  if (!p) return '';
  if (!crMaybeCoastal(p)) return '';
  return p.abbr === 'CAR' ? 'Caribbean' : 'Pacific';
}

/* Places where the ground itself is news. Costa Rica sits on the
   Cocos plate going under the Caribbean one, so this is a longer
   list than Italy's and the seismic panel earns its place. */
function crIsVolcanic(p){
  if (!p) return false;
  return p.kind === 'volcano' || (p.land || []).indexOf('volcanic') !== -1;
}
