/* ===========================================================
   SPAIN — autonomous communities and places

   Same packed-array shape as everything else in the atlas:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Its own namespace (ES_PLACES / esPlaceGet), so nothing here
   touches the US map, the US search index or the planner until
   the atlases are deliberately joined.

   The regions are the seventeen autonomous communities. Spain is
   a country where the region is a real political and cultural
   unit rather than an administrative line: four of them have
   their own official language, and people say they are from
   Galicia or the Basque Country before they say Spain.

   Region codes are three letters and avoid every code already
   taken by Italy's twenty, Costa Rica's nine, India's thirty-four
   and Japan's forty-seven. The Andaman Islands hold AND, so
   Andalusia is ADL. Costa Rica's South Pacific holds SPA. The
   Caribbean coast holds CAR, so the Canaries are CNR. Arenal
   holds ARE, so Aragon is ARA. Le Marche holds MAR, so Murcia
   is MUR.

   The vocabulary is Spain's own. An alcázar is not a castle in
   the northern European sense, a pueblo blanco is a specific
   kind of hill town, and a parador is a category of place to
   sleep that exists nowhere else.
   =========================================================== */

/* ---------- what a place IS, Spanish edition ---------- */
const ES_KIND = {
  city:      'City',
  town:      'Town',
  village:   'Village',
  district:  'District',
  cathedral: 'Cathedral',
  mosque:    'Mosque',
  palace:    'Palace',
  castle:    'Castle',
  monastery: 'Monastery',
  museum:    'Museum',
  ruin:      'Ruins',
  cave:      'Cave',
  np:        'National park',
  park:      'Natural park',
  mountain:  'Mountain',
  volcano:   'Volcano',
  sierra:    'Mountain range',
  gorge:     'Gorge',
  valley:    'Valley',
  lake:      'Lake',
  river:     'River',
  coast:     'Coast',
  beach:     'Beach',
  island:    'Island',
  forest:    'Forest',
  desert:    'Desert',
  wetland:   'Wetland',
  wine:      'Wine country',
  camino:    'Pilgrim route',
  market:    'Market',
  region:    'Region'
};

/* Extra flags Spain needs. The base FLAG list in taxonomy.js still
   applies underneath. Every tag used below has a label here or
   there; the test suite checks it, because a missing one renders
   as a raw lowercase chip. */
const ES_FLAG = {
  unesco:     ['UNESCO',        'On the World Heritage list'],
  moorish:    ['Al-Andalus',    'Eight centuries of Islamic Spain left standing'],
  roman:      ['Roman',         'Rome was here first, and it shows'],
  gothic:     ['Gothic',        'The stone that took three hundred years'],
  modernisme: ['Modernisme',    'Catalan art nouveau, mostly in Barcelona'],
  pueblo:     ['White town',    'Whitewashed, vertical and usually on a cliff'],
  tapas:      ['Tapas',         'Eating standing up is the local sport'],
  wine:       ['Wine',          'A denominación worth drinking your way through'],
  flamenco:   ['Flamenco',      'The real thing, not the dinner show'],
  fiesta:     ['Fiesta',        'Built around one week in the calendar'],
  camino:     ['Camino',        'On a pilgrim route to Santiago'],
  beach:      ['Beach',         'Sand worth the journey'],
  coastal:    ['Coastal',       'The sea is the whole point'],
  island:     ['Island',        'Reached by boat or a plane'],
  hiking:     ['Hiking',        'Real walking, not a viewpoint car park'],
  ski:        ['Skiing',        'Lift-served snow, and yes, in Spain'],
  birding:    ['Birds',         'A serious birdwatching destination'],
  wildlife:   ['Wildlife',      'Animals are the draw'],
  volcanic:   ['Volcanic',      'Lava, cones and black ground'],
  darksky:    ['Dark skies',    'Observatory-grade night, or close to it'],
  prehistory: ['Prehistoric',   'Cave art, dolmens or older'],
  art:        ['Art',           'A collection worth the trip on its own'],
  architecture:['Architecture', 'The buildings are the reason'],
  historic:   ['Old town',      'Pre-modern streets still standing'],
  modern:     ['Modern',        'Contemporary design and the new city'],
  nightlife:  ['Nightlife',     'The evening is the reason'],
  food:       ['Food',          'Worth planning meals around'],
  surf:       ['Surf',          'Swell that people travel for'],
  diving:     ['Diving',        'Worth getting in with a tank'],
  cycling:    ['Cycling',       'A route people come with a bike for'],
  cave:       ['Caves',         'Underground and open to walk into'],
  market:     ['Market',        'A working market, not a souvenir row'],
  rural:      ['Countryside',   'Farmland, dehesa and villages'],
  literary:   ['Literary',      'Written about, and worth reading first'],
  civilwar:   ['1936',          'The civil war is part of why it is known'],
  film:       ['On film',       'You have already seen it on a screen'],
  park:       ['Protected',     'A national park or a natural park'],
  castle:     ['Castle',        'A keep, an alcázar or a fortress'],
  monastery:  ['Monastery',     'Still a religious house, or lately one'],
  forest:     ['Forest',        'Old trees, and the reason to come'],
  river:      ['River',         'The river is the attraction'],
  gorge:      ['Gorge',         'Cut rock and a path through it']
};

/* ---------- the autonomous communities ----------
   code -> [ English name, Spanish name, character, blurb ] */
const ES_REGIONS = {
  ADL: ['Andalusia', 'Andalucía', 'moorish',
    'Eight hundred years of Al-Andalus, three of the greatest buildings in Europe, and the heat that shapes when anything happens.'],
  ARA: ['Aragon', 'Aragón', 'mountain',
    'A canyon in the Pyrenees to rival anything in Europe, a pink-walled town on a crag, and the emptiest countryside in Spain.'],
  AST: ['Asturias', 'Asturias', 'mountain',
    'Green, wet and Atlantic. Limestone peaks straight out of the sea, cider poured from above the head, and the one corner the Moors never took.'],
  BAL: ['Balearic Islands', 'Illes Balears', 'coastal',
    'Four islands that have almost nothing in common: a mountain range on Mallorca, prehistory on Menorca, and whatever Ibiza is doing this decade.'],
  CNR: ['Canary Islands', 'Islas Canarias', 'volcanic',
    'Africa by latitude, Spain by passport, and volcanic all the way down. Eight islands, four national parks and the clearest night sky in Europe.'],
  CTB: ['Cantabria', 'Cantabria', 'coastal',
    'A short green coast between the mountains and the Bay of Biscay, with the finest painted cave on earth closed under a hill in the middle of it.'],
  CLM: ['Castilla-La Mancha', 'Castilla-La Mancha', 'historic',
    'The plain Quixote rode across. Toledo on its rock, houses hanging off a cliff at Cuenca, and windmills still standing on the ridges.'],
  CYL: ['Castile and León', 'Castilla y León', 'historic',
    'The largest region in Spain and the one with the most cathedrals. An aqueduct with no mortar, a sandstone university, and walls you can walk round.'],
  CAT: ['Catalonia', 'Catalunya', 'modern',
    'Its own language, its own politics and its own architecture. Barcelona, a serrated holy mountain, Dalí, and a coast of coves in the north.'],
  VLC: ['Valencia', 'Comunitat Valenciana', 'coastal',
    'Rice, oranges and the sea. The dish the rest of the world calls paella comes from a lagoon just south of the city.'],
  EXT: ['Extremadura', 'Extremadura', 'rural',
    'Where the conquistadors came from and where the storks still nest. Roman Mérida, oak pasture full of black pigs, and almost nobody.'],
  GAL: ['Galicia', 'Galicia', 'coastal',
    'Celtic, rainy and Atlantic, with a drowned coastline of estuaries and the end of a thousand-year pilgrimage at Santiago.'],
  RIO: ['La Rioja', 'La Rioja', 'wine',
    'Spain’s smallest mainland region and the one on the label. Tempranillo, a monastery where Castilian was first written down, and dinosaur footprints.'],
  MAD: ['Madrid', 'Madrid', 'urban',
    'A capital invented by decree in 1561 with no river worth the name, which compensates with the best art collection in the world and the latest dinners in Europe.'],
  MUR: ['Murcia', 'Región de Murcia', 'coastal',
    'Dry, warm and overlooked. A Carthaginian and then Roman naval city, a salt lagoon warmer than the sea beside it, and Europe’s market garden.'],
  NAV: ['Navarre', 'Navarra', 'rural',
    'A kingdom until 1512. Bulls through the streets of Pamplona for a week in July, a badlands desert in the south, and beech forest on the French border.'],
  PVA: ['Basque Country', 'Euskadi', 'food',
    'A language related to nothing else on earth, a titanium museum that saved a city, and the densest concentration of good eating in Spain.']
};

const ES_PLACES = {

  /* ===================== ANDALUSIA ===================== */
  'ADL-granada': ['Granada','ADL','city',37.1773,-3.5986,10,['urban','mountain'],['couple','solo','friends'],['moorish','unesco','historic','tapas','flamenco'],
    'The last Moorish capital in Spain, surrendered in 1492, with the Alhambra on one hill and the old Moorish quarter facing it across a ravine. Still the only city in Spain where tapas come free with the drink.'],
  'ADL-alhambra': ['Alhambra','ADL','palace',37.1761,-3.5881,10,['urban'],['couple','solo'],['moorish','unesco','architecture','historic'],
    'A fortified palace city built by the Nasrids in the thirteenth and fourteenth centuries, and the most visited monument in Spain. Tickets sell out weeks ahead and the timed Nasrid Palaces slot is non-negotiable.'],
  'ADL-seville': ['Seville','ADL','city',37.3886,-5.9823,10,['urban'],['couple','friends','family'],['moorish','unesco','flamenco','tapas','fiesta','historic'],
    'The city that handled all the gold coming back from the Americas, with the largest Gothic cathedral on earth to show for it. Forty-six degrees in August and worth every degree in April.'],
  'ADL-alcazar-seville': ['Royal Alcázar of Seville','ADL','palace',37.3831,-5.9903,9,['urban'],['couple','family'],['moorish','unesco','architecture','film'],
    'A royal palace still used by the Spanish crown, built by Christian kings in deliberate Moorish style a century after the reconquest. The upper gardens stood in for Dorne.'],
  'ADL-cordoba': ['Córdoba','ADL','city',37.8882,-4.7794,9,['urban'],['couple','solo'],['moorish','unesco','historic','fiesta','food'],
    'The largest city in western Europe in the tenth century, with a caliphate library of four hundred thousand volumes. The patios open to the public for two weeks every May.'],
  'ADL-mezquita': ['Mezquita of Córdoba','ADL','mosque',37.8790,-4.7794,10,['urban'],['couple','solo'],['moorish','unesco','architecture','historic'],
    'Eight hundred and fifty columns under red and white double arches, built as a mosque from 785 and holding a full Renaissance cathedral dropped into the middle of it in the sixteenth century.'],
  'ADL-ronda': ['Ronda','ADL','town',36.7429,-5.1664,9,['mountain'],['couple','friends'],['pueblo','historic','hiking','literary'],
    'Split in two by a gorge a hundred and twenty metres deep with an eighteenth-century bridge across it. Hemingway and Orson Welles both came back repeatedly and Welles is buried outside town.'],
  'ADL-malaga': ['Málaga','ADL','city',36.7213,-4.4214,8,['urban','water'],['family','friends','couple'],['art','coastal','food','modern','roman'],
    'Written off as an airport for the Costa del Sol for forty years and now holding nearly forty museums, including Picasso, who was born here. The old centre was pedestrianised and it changed everything.'],
  'ADL-cadiz': ['Cádiz','ADL','city',36.5271,-6.2886,8,['urban','water'],['couple','friends'],['historic','coastal','fiesta','food','beach'],
    'Founded by Phoenicians around 1100 BC, which makes it arguably the oldest continuously inhabited city in western Europe. Built on a spit, so the sea is at the end of every street.'],
  'ADL-jerez': ['Jerez de la Frontera','ADL','town',36.6866,-6.1361,7,['urban'],['couple','solo'],['wine','flamenco','food','historic'],
    'Sherry, horses and flamenco, in that order of economic importance and reverse order of local passion. The bodegas are cathedral-sized and the solera system is worth understanding before you taste.'],
  'ADL-ubeda-baeza': ['Úbeda & Baeza','ADL','town',38.0138,-3.3706,7,['rural'],['couple','solo'],['unesco','historic','architecture'],
    'Two Renaissance towns nine kilometres apart, built with sixteenth-century olive money and barely touched since. Together they make one World Heritage listing and almost nobody stops.'],
  'ADL-sierra-nevada': ['Sierra Nevada','ADL','sierra',37.0536,-3.3686,8,['mountain'],['friends','solo'],['ski','hiking','darksky','wildlife'],
    'The highest mountains in mainland Spain, with Mulhacén at 3,479 metres, and the southernmost ski resort in Europe. You can ski in the morning and be on a beach by lunch.'],
  'ADL-cabo-de-gata': ['Cabo de Gata','ADL','park',36.7333,-2.1833,8,['water','desert'],['couple','solo','friends'],['beach','coastal','diving','darksky','film'],
    'A volcanic headland and the driest place in Europe, protected since 1987, so the coast has beaches with no buildings behind them. Snorkelling is better here than anywhere else on the Spanish mainland.'],
  'ADL-donana': ['Doñana','ADL','np',36.9833,-6.4500,8,['water','forest'],['solo','family'],['birding','wildlife','unesco','park'],
    'Marsh, dune and pine where the Guadalquivir reaches the sea, and the single most important wetland for migrating birds in Europe. Also the last refuge of the Iberian lynx.'],
  'ADL-tarifa': ['Tarifa','ADL','town',36.0143,-5.6044,7,['water'],['friends','couple'],['surf','beach','coastal','wildlife'],
    'The southernmost point of mainland Europe, fourteen kilometres from Africa, with wind so reliable that it is the kitesurfing capital of the continent. Whales and orcas pass through the strait.'],
  'ADL-nerja-frigiliana': ['Nerja & Frigiliana','ADL','town',36.7450,-3.8750,7,['water','mountain'],['family','couple'],['pueblo','beach','cave','coastal'],
    'A cliff balcony over the sea at Nerja and, four kilometres up the hill, the whitest and steepest of the white towns. A cave nearby holds paintings that may be the oldest art made by humans.'],
  'ADL-setenil': ['Setenil de las Bodegas','ADL','village',36.8639,-5.1819,6,['mountain'],['couple','friends'],['pueblo','historic','food'],
    'A village built into an overhanging gorge, so whole streets have a ceiling of rock rather than sky. The houses did not carve the cliff; they simply used it as the roof.'],
  'ADL-arcos': ['Arcos de la Frontera','ADL','town',36.7500,-5.8083,6,['mountain'],['couple','solo'],['pueblo','historic'],
    'The first of the white towns coming from Seville, on a sandstone ridge with a sheer drop on one side and a parador sitting right on the edge of it.'],
  'ADL-tabernas': ['Tabernas Desert','ADL','desert',37.0500,-2.4333,6,['desert'],['family','friends'],['film','darksky','hiking'],
    'The only true desert in continental Europe, and the location for about a hundred and fifty westerns including the Leone trilogy. Two of the film sets still operate.'],
  'ADL-antequera': ['Antequera','ADL','town',37.0194,-4.5611,6,['rural','mountain'],['couple','family'],['unesco','prehistory','historic'],
    'Three dolmens from around 3,500 BC, one of them aligned not on the sun but on a mountain shaped like a sleeping face. The limestone maze of El Torcal is twenty minutes away.'],
  'ADL-grazalema': ['Grazalema','ADL','park',36.7606,-5.3669,6,['mountain'],['solo','friends'],['hiking','pueblo','wildlife','park'],
    'The wettest place in Spain, which is not what anyone expects of Andalusia, with a rare Spanish fir surviving from the last ice age and some of the best walking in the south.'],
  'ADL-rio-tinto': ['Río Tinto','ADL','ruin',37.6908,-6.5908,6,['rural'],['solo','family'],['historic','film'],
    'A river that runs deep red from five thousand years of mining and the acid-loving bacteria that live in it. NASA studies it as an analogue for Mars.'],
  'ADL-mojacar': ['Mojácar','ADL','village',37.1400,-1.8517,5,['water','desert'],['couple','family'],['pueblo','beach','coastal'],
    'A white village on a hill two kilometres back from its own beach, which is why it survived the concrete that took the rest of the coast.'],
  'ADL-almunecar': ['Almuñécar & La Herradura','ADL','coast',36.7339,-3.6908,5,['water'],['family','couple'],['beach','coastal','diving','roman'],
    'The tropical coast, warm enough for custard apples and mangoes, with a Roman aqueduct still carrying water through the middle of town and the best shore diving in Andalusia.'],

  /* ===================== CATALONIA ===================== */
  'CAT-barcelona': ['Barcelona','CAT','city',41.3851,2.1734,10,['urban','water'],['couple','friends','family'],['modernisme','architecture','food','nightlife','beach','art'],
    'A Roman town that stayed medieval, then built a grid of octagonal blocks around itself in 1860, then handed the result to Gaudí. The beach was invented for the 1992 Olympics.'],
  'CAT-sagrada-familia': ['Sagrada Família','CAT','cathedral',41.4036,2.1744,10,['urban'],['couple','family','solo'],['modernisme','unesco','architecture'],
    'Begun in 1882, still unfinished, and funded entirely by visitors and donations. The nave is a stone forest and the light through the windows changes completely between morning and evening.'],
  'CAT-park-guell': ['Park Güell','CAT','park',41.4145,2.1527,8,['urban'],['family','couple'],['modernisme','unesco','architecture'],
    'A failed housing development of 1900 that became the strangest public park in Europe. The monumental zone is ticketed and timed; the wooded part above it is free and nearly empty.'],
  'CAT-gothic-quarter': ['Barri Gòtic','CAT','district',41.3833,2.1767,8,['urban'],['couple','solo','friends'],['historic','gothic','nightlife','food'],
    'The medieval core on top of the Roman one, with four columns of the temple of Augustus standing inside a courtyard off a lane. Much of the "medieval" detail was added in the 1920s.'],
  'CAT-montserrat': ['Montserrat','CAT','mountain',41.5931,1.8381,8,['mountain'],['family','couple','solo'],['monastery','hiking','historic'],
    'A serrated conglomerate massif that rises out of flat country like a set of broken teeth, with a Benedictine monastery halfway up and a boys’ choir that has sung since the fourteenth century.'],
  'CAT-girona': ['Girona','CAT','city',41.9794,2.8214,8,['urban'],['couple','solo'],['historic','gothic','food','film'],
    'Colour-washed houses hanging over the Onyar, the best-preserved Jewish quarter in Spain, and a cathedral with the widest Gothic nave in the world. Also where El Celler de Can Roca is.'],
  'CAT-figueres': ['Figueres & the Dalí Theatre-Museum','CAT','museum',42.2683,2.9597,7,['urban'],['couple','friends'],['art','architecture'],
    'Dalí designed his own museum inside a burnt-out theatre and is buried under the floor. It is less a collection than a building-sized work, and it is deliberately disorienting.'],
  'CAT-cadaques': ['Cadaqués & Cap de Creus','CAT','village',42.2888,3.2778,7,['water'],['couple','solo'],['coastal','art','pueblo','hiking'],
    'A white fishing village the far side of a mountain pass, which is why it stayed small. Dalí lived at Portlligat next door and the headland beyond is bare schist and wind.'],
  'CAT-costa-brava': ['Costa Brava coves','CAT','coast',41.8500,3.1333,7,['water'],['couple','family','friends'],['beach','coastal','hiking','diving'],
    'The camí de ronda, an old coastguard path, links the coves between Blanes and Begur on foot. Tossa, Calella de Palafrugell and Aiguablava are the ones worth the walk.'],
  'CAT-tarragona': ['Tarragona','CAT','city',41.1189,1.2445,7,['urban','water'],['family','solo'],['roman','unesco','coastal','historic'],
    'The capital of Rome’s largest Spanish province, with an amphitheatre on the beach, a circus under the modern streets and an aqueduct in the woods outside town.'],
  'CAT-sitges': ['Sitges','CAT','town',41.2371,1.8056,6,['water'],['friends','couple'],['beach','nightlife','coastal','fiesta'],
    'Seventeen beaches, a modernista seafront and the most visible gay scene in Spain. Carnival here is the largest in Catalonia and the film festival is the main genre event in Europe.'],
  'CAT-besalu': ['Besalú','CAT','village',42.1992,2.6983,6,['rural'],['couple','family'],['historic','pueblo'],
    'A fortified Romanesque bridge with a gate tower in the middle of it, and a twelfth-century Jewish ritual bath that is one of only three left in Europe.'],
  'CAT-vall-de-nuria': ['Vall de Núria','CAT','valley',42.3972,2.1536,6,['mountain'],['family','couple'],['hiking','ski','rural'],
    'A Pyrenean valley with no road into it. A rack railway climbs a thousand metres from Ribes de Freser and that is the only way in apart from walking.'],
  'CAT-aiguestortes': ['Aigüestortes','CAT','np',42.5750,0.9500,7,['mountain'],['solo','friends'],['hiking','park','wildlife'],
    'Catalonia’s only national park, with around two hundred lakes in granite basins and the twin peaks of Els Encantats above them. The Carros de Foc hut circuit is the classic route.'],
  'CAT-delta-ebre': ['Delta de l’Ebre','CAT','wetland',40.7167,0.7333,6,['water','rural'],['solo','family'],['birding','wildlife','park','food'],
    'Three hundred and twenty square kilometres of rice paddy and lagoon pushing out into the Mediterranean, with flamingos on it and the best rice in Spain grown on it.'],
  'CAT-priorat': ['Priorat','CAT','wine',41.1833,0.8167,6,['mountain','rural'],['couple','solo'],['wine','rural','hiking'],
    'Slate terraces so steep that everything is picked by hand, making some of the most expensive wine in Spain. One of only two regions with the top Spanish classification.'],
  'CAT-poblet': ['Poblet','CAT','monastery',41.3808,1.0828,6,['rural'],['solo','couple'],['unesco','monastery','historic'],
    'A working Cistercian monastery from 1151 holding the royal tombs of the Crown of Aragon, with monks still living the hours. The alabaster tombs sit on an arch over the nave.'],
  'CAT-vic': ['Vic','CAT','town',41.9304,2.2546,5,['rural'],['solo','couple'],['market','food','historic'],
    'A market square of thirteen thousand square metres surrounded by arcades, running since the ninth century, and the sausage that the whole of Catalonia buys from here.'],
  'CAT-cardona': ['Cardona','CAT','castle',41.9139,1.6806,5,['rural'],['family','couple'],['castle','historic'],
    'A fortress on a hill above a mountain of rock salt that has been mined since the Neolithic. The castle is a parador and the salt mountain can be walked into.'],
  'CAT-montseny': ['Montseny','CAT','park',41.7833,2.4000,5,['mountain','forest'],['solo','family'],['hiking','forest','park'],
    'A biosphere reserve an hour from Barcelona where beech, fir and Mediterranean oak grow on the same mountain because of the altitude range. Good walking all year.'],

  /* ===================== MADRID ===================== */
  'MAD-madrid': ['Madrid','MAD','city',40.4168,-3.7038,10,['urban'],['couple','friends','family'],['art','food','nightlife','historic','market'],
    'Made the capital in 1561 because it was in the middle, with no river, no port and no particular reason otherwise. Dinner starts at ten and the city does not really shut.'],
  'MAD-prado': ['Museo del Prado','MAD','museum',40.4138,-3.6921,10,['urban'],['couple','solo'],['art'],
    'Velázquez, Goya and Bosch in the quantity only a royal collection produces. Las Meninas and the Black Paintings are here, and two hours is the absolute minimum.'],
  'MAD-reina-sofia': ['Reina Sofía','MAD','museum',40.4080,-3.6945,8,['urban'],['solo','couple'],['art','modern','civilwar'],
    'Twentieth-century Spain, built around Guernica, which hangs with the preparatory sketches and the photographs Dora Maar took as it was painted.'],
  'MAD-royal-palace': ['Royal Palace of Madrid','MAD','palace',40.4180,-3.7143,8,['urban'],['family','couple'],['architecture','historic'],
    'Three thousand four hundred rooms, which makes it the largest functioning royal palace in Europe, built after the old Habsburg alcázar burned down on Christmas Eve 1734.'],
  'MAD-retiro': ['Parque del Retiro','MAD','park',40.4153,-3.6844,7,['urban'],['family','couple'],['park','historic','unesco'],
    'The royal gardens handed to the public in 1868, with a boating lake, a palace made of glass and iron, and the only statue of the devil in a public park in Europe.'],
  'MAD-el-escorial': ['El Escorial','MAD','monastery',40.5894,-4.1472,8,['mountain'],['family','solo'],['unesco','monastery','historic','architecture'],
    'Philip II’s monastery, palace, library and royal tomb in one grey granite rectangle at the foot of the sierra. Deliberately austere, enormous, and a statement about empire.'],
  'MAD-aranjuez': ['Aranjuez','MAD','palace',40.0314,-3.6031,6,['water','rural'],['family','couple'],['unesco','historic','architecture'],
    'A royal summer palace with gardens laid out along the Tagus, built on irrigation that made a green island in dry country. The strawberry train still runs from Madrid.'],
  'MAD-alcala': ['Alcalá de Henares','MAD','town',40.4818,-3.3644,6,['urban'],['solo','family'],['unesco','historic','literary'],
    'Cervantes was born here and the university founded in 1499 produced the first polyglot Bible. The storks nesting on every tower are part of the skyline.'],
  'MAD-chinchon': ['Chinchón','MAD','village',40.1403,-3.4222,5,['rural'],['couple','friends'],['historic','food','pueblo'],
    'An irregular medieval plaza ringed by wooden balconies, which is still used for bullfights, theatre and, until recently, as a film set. Famous for garlic and anise.'],
  'MAD-guadarrama': ['Sierra de Guadarrama','MAD','np',40.7833,-3.9667,6,['mountain','forest'],['solo','friends'],['hiking','park','wildlife','ski'],
    'The granite ridge that shelters Madrid from the north, made a national park in 2013, with pine forest, vultures and walking an hour from the city by train.'],

  /* ===================== VALENCIA ===================== */
  'VLC-valencia': ['Valencia','VLC','city',39.4699,-0.3763,9,['urban','water'],['family','couple','friends'],['food','modern','architecture','beach','fiesta'],
    'Spain’s third city, with a riverbed turned into a nine-kilometre park after a flood in 1957, a silk exchange that is World Heritage, and the origin of paella.'],
  'VLC-ciudad-artes': ['City of Arts and Sciences','VLC','museum',39.4545,-0.3513,8,['urban'],['family','couple'],['architecture','modern'],
    'Calatrava’s white concrete and broken-tile complex in the old riverbed: an opera house, a planetarium, a science museum and Europe’s largest aquarium.'],
  'VLC-albufera': ['L’Albufera','VLC','wetland',39.3333,-0.3500,7,['water','rural'],['family','solo'],['birding','park','food','wildlife'],
    'A freshwater lagoon separated from the sea by a pine bar, surrounded by the rice fields that paella came out of. Sunset boat trips from El Palmar are the local ritual.'],
  'VLC-alicante': ['Alicante','VLC','city',38.3452,-0.4810,7,['urban','water'],['family','friends'],['beach','coastal','castle','nightlife'],
    'A castle on a bare rock three hundred metres above the city, reached by a lift cut through the inside of the hill, and a palm-lined seafront paved in wave-patterned marble.'],
  'VLC-javea-denia': ['Xàbia & Dénia','VLC','coast',38.7894,0.1661,6,['water','mountain'],['couple','family'],['beach','coastal','diving','food'],
    'Where the Costa Blanca stops being concrete. A cape of cliffs, coves you reach down steps, and Dénia’s red prawns, which are the most expensive shellfish in Spain.'],
  'VLC-penyiscola': ['Peníscola','VLC','castle',40.3583,0.4069,6,['water'],['family','couple'],['castle','beach','coastal','film'],
    'A walled town on a rock joined to the mainland by a sandbar, with a Templar castle on top where an antipope spent his last years refusing to resign.'],
  'VLC-morella': ['Morella','VLC','town',40.6197,-0.1011,6,['mountain'],['couple','solo'],['historic','castle','pueblo'],
    'A complete ring of medieval walls around a hill at a thousand metres, with a castle on the summit and dinosaur fossils in the rock below.'],
  'VLC-guadalest': ['Guadalest','VLC','village',38.6744,-0.1964,5,['mountain'],['family','couple'],['pueblo','castle'],
    'A village of two hundred people reached through a tunnel cut in the rock, on a crag above a turquoise reservoir. One of the most visited villages in Spain and small enough to feel it.'],
  'VLC-calpe': ['Calp & Peñón de Ifach','VLC','mountain',38.6333,0.0667,5,['water','mountain'],['friends','family'],['hiking','beach','coastal','birding'],
    'A limestone monolith three hundred and thirty-two metres straight out of the sea, with a tunnel through it and a steep scramble to the top. Permits are capped daily.'],
  'VLC-elche': ['Elche','VLC','town',38.2655,-0.6983,5,['urban'],['family','solo'],['unesco','historic','park'],
    'Two hundred thousand palms planted by the Moors in a working irrigated grove in the middle of the city, which is the largest palm grove in Europe.'],

  /* ===================== CASTILE AND LEÓN ===================== */
  'CYL-salamanca': ['Salamanca','CYL','city',40.9701,-5.6635,9,['urban'],['couple','solo','friends'],['unesco','historic','architecture','nightlife'],
    'A university founded in 1218 and a city built entirely from a sandstone that turns gold at sunset. The Plaza Mayor is the best in Spain and the students keep it awake.'],
  'CYL-segovia': ['Segovia','CYL','city',40.9429,-4.1088,9,['urban'],['family','couple'],['roman','unesco','historic','castle','food'],
    'A Roman aqueduct of twenty thousand granite blocks held together by gravity alone, a cathedral called the lady of cathedrals, and a castle that Disney borrowed from.'],
  'CYL-avila': ['Ávila','CYL','town',40.6565,-4.7009,8,['urban'],['solo','family'],['unesco','historic','gothic'],
    'Two and a half kilometres of eleventh-century wall with eighty-eight towers, completely intact, at eleven hundred metres. The coldest provincial capital in Spain and the home of Teresa of Ávila.'],
  'CYL-burgos': ['Burgos','CYL','city',42.3439,-3.6969,8,['urban'],['solo','couple'],['gothic','unesco','camino','historic','food'],
    'A Gothic cathedral that took three centuries and holds El Cid’s tomb under the crossing. On the Camino Francés, and the human fossils from nearby Atapuerca are the oldest in Europe.'],
  'CYL-leon': ['León','CYL','city',42.5987,-5.5671,8,['urban'],['friends','solo'],['gothic','camino','food','historic','tapas'],
    'Eighteen hundred square metres of thirteenth-century stained glass in a cathedral with barely any wall left between the windows. Free tapas with every drink in the Barrio Húmedo.'],
  'CYL-las-medulas': ['Las Médulas','CYL','ruin',42.4583,-6.7667,7,['mountain','forest'],['solo','friends'],['unesco','roman','hiking','historic'],
    'A landscape of red pinnacles left behind when Rome dismantled a mountain for gold by flooding tunnels under it. Pliny the Elder described the method and he was there.'],
  'CYL-ribera-duero': ['Ribera del Duero','CYL','wine',41.6333,-3.6833,7,['rural'],['couple','friends'],['wine','rural','food'],
    'High, cold vineyards along the Duero producing the Tempranillo that competes with Rioja, including Vega Sicilia. Underground cellars dug into the hillsides of every village.'],
  'CYL-la-alberca': ['La Alberca & Sierra de Francia','CYL','village',40.4931,-6.1081,6,['mountain','forest'],['couple','solo'],['pueblo','historic','hiking','rural'],
    'Timber-framed houses with overhanging upper floors, the first village in Spain declared a historic monument, in a range of chestnut forest and granite villages.'],
  'CYL-atapuerca': ['Atapuerca','CYL','ruin',42.3519,-3.5186,6,['rural'],['solo','family'],['unesco','prehistory','historic'],
    'Limestone caves holding human remains going back around 1.2 million years, including a species named for the site. Guided visits to the trench and a museum in Burgos.'],
  'CYL-astorga': ['Astorga','CYL','town',42.4592,-6.0533,6,['urban'],['solo','family'],['camino','roman','architecture','food'],
    'A Roman town on the Camino with a bishop’s palace that Gaudí designed and then abandoned after an argument. Also the centre of Spanish chocolate making.'],
  'CYL-zamora': ['Zamora','CYL','city',41.5033,-5.7467,6,['urban','water'],['solo','couple'],['historic','gothic','fiesta'],
    'Twenty-four Romanesque churches in one small city, which is the densest concentration in Europe, and the most serious Holy Week processions in Spain.'],
  'CYL-arribes': ['Arribes del Duero','CYL','gorge',41.2167,-6.5500,6,['water','mountain'],['solo','couple'],['birding','hiking','park','wine'],
    'The Duero cuts a four-hundred-metre gorge along the Portuguese border, with griffon vultures nesting on the walls and boat trips along the bottom.'],
  'CYL-valladolid': ['Valladolid','CYL','city',41.6523,-4.7245,5,['urban'],['solo','couple'],['art','historic','wine','fiesta'],
    'Where Columbus died and Cervantes lived, with a museum of polychrome wood sculpture that is the best of its kind anywhere and genuinely startling.'],
  'CYL-soria': ['Soria & Numancia','CYL','town',41.7667,-2.4667,5,['rural','water'],['solo','couple'],['literary','roman','historic','rural'],
    'Machado wrote his best poems here and hated the cold. Numancia nearby held out against Rome for twenty years and then burned itself rather than surrender.'],

  /* ===================== CASTILLA-LA MANCHA ===================== */
  'CLM-toledo': ['Toledo','CLM','city',39.8628,-4.0273,9,['urban','water'],['couple','family','solo'],['unesco','historic','moorish','art','gothic'],
    'A city on a granite outcrop inside a loop of the Tagus where Muslims, Jews and Christians all built, all at once, for several centuries. El Greco spent his career here.'],
  'CLM-cuenca': ['Cuenca','CLM','city',40.0704,-2.1374,8,['mountain','canyon'],['couple','solo'],['unesco','historic','art','hiking'],
    'Houses with wooden balconies hanging over a gorge, built out from the cliff edge because there was nowhere else to go. One of them holds a very good abstract art museum.'],
  'CLM-consuegra': ['Consuegra','CLM','village',39.4625,-3.6069,6,['rural'],['family','couple'],['historic','film','rural'],
    'Twelve restored windmills along a ridge with a castle beside them, which is the image everyone has of La Mancha. The saffron harvest festival is at the end of October.'],
  'CLM-almagro': ['Almagro','CLM','town',38.8894,-3.7139,6,['rural'],['couple','solo'],['historic','architecture'],
    'A green-framed arcaded plaza and the only surviving open-air courtyard theatre from the Spanish Golden Age, still used for a classical drama festival every July.'],
  'CLM-siguenza': ['Sigüenza','CLM','town',41.0686,-2.6417,5,['rural'],['couple','solo'],['historic','gothic','castle'],
    'A cathedral that is also a fortress, holding the alabaster tomb of a young knight shown reading a book, which is one of the great Spanish sculptures.'],
  'CLM-ruidera': ['Lagunas de Ruidera','CLM','lake',38.9333,-2.8667,6,['water','rural'],['family','friends'],['park','hiking','wildlife'],
    'Fifteen lakes stepping down a valley, each spilling into the next over travertine dams, in the middle of otherwise dry country. Quixote went down a cave here.'],
  'CLM-ciudad-encantada': ['Ciudad Encantada','CLM','park',40.1861,-2.0000,5,['forest','mountain'],['family','couple'],['hiking','park','film'],
    'Limestone eroded into shapes that genuinely do look like a ruined city, in pine forest above Cuenca. A loop of about three kilometres on a made path.'],
  'CLM-alcala-jucar': ['Alcalá del Júcar','CLM','village',39.1917,-1.4306,5,['canyon','water'],['couple','family'],['pueblo','cave','historic'],
    'A village stacked up a gorge wall with houses tunnelled straight back into the rock, some of them running right through the ridge to a balcony on the far side.'],

  /* ===================== GALICIA ===================== */
  'GAL-santiago': ['Santiago de Compostela','GAL','city',42.8805,-8.5457,9,['urban'],['solo','couple','friends'],['unesco','camino','historic','food','gothic'],
    'The end of a pilgrimage that has run for a thousand years, with a granite old town that is almost entirely arcaded because of how much it rains. The botafumeiro swings at set masses.'],
  'GAL-rias-baixas': ['Rías Baixas','GAL','coast',42.4000,-8.8000,8,['water'],['couple','family'],['coastal','wine','food','beach'],
    'Four drowned river valleys full of mussel rafts, producing Albariño on the slopes above and more shellfish than anywhere else in Europe.'],
  'GAL-a-coruna': ['A Coruña','GAL','city',43.3623,-8.4115,7,['urban','water'],['family','couple'],['roman','coastal','food','historic'],
    'A Roman lighthouse from the first century still working, which makes it the oldest in the world, and a seafront of glassed-in galleried balconies.'],
  'GAL-finisterre': ['Costa da Morte & Finisterre','GAL','coast',42.9083,-9.2644,7,['water'],['solo','couple'],['coastal','camino','hiking'],
    'The coast of death, named for the shipwrecks, ending at the cape that Rome thought was the end of the world. Many walkers continue here after Santiago to burn their boots.'],
  'GAL-cies': ['Cíes Islands','GAL','island',42.2167,-8.9000,7,['water'],['couple','friends','family'],['beach','island','park','birding'],
    'Three islands in a national park with a beach that a British newspaper once called the best in the world. Visitor numbers are capped and you need a permit before the ferry.'],
  'GAL-ribeira-sacra': ['Ribeira Sacra','GAL','wine',42.4000,-7.6667,7,['water','mountain'],['couple','solo'],['wine','monastery','hiking','river'],
    'Vines on terraces so steep above the Sil canyon that the harvest is called heroic viticulture. Romanesque monasteries scattered through the woods above.'],
  'GAL-lugo': ['Lugo','GAL','city',43.0097,-7.5567,6,['urban'],['solo','family'],['roman','unesco','historic','food'],
    'The only completely intact Roman city wall in the world, two kilometres round with seventy-one towers, and you can walk the whole circuit on top of it.'],
  'GAL-as-catedrais': ['Praia das Catedrais','GAL','beach',43.5542,-7.1583,6,['water'],['family','couple'],['beach','coastal'],
    'Rock arches thirty metres high that you walk under at low tide and that disappear completely at high. Access is ticketed in summer and the tide table is not optional.'],
  'GAL-combarro': ['Combarro','GAL','village',42.4292,-8.7083,5,['water'],['couple','family'],['coastal','historic','pueblo'],
    'A fishing village where the granite grain stores stand on the shore itself, raised on mushroom-shaped legs, with the sea coming up underneath them.'],
  'GAL-ourense': ['Ourense','GAL','city',42.3364,-7.8639,5,['urban','water'],['couple','solo'],['historic','food'],
    'Hot springs at sixty-seven degrees rising in the middle of the city and along the river, with free and paid pools and a little train that runs between them.'],
  'GAL-cabo-ortegal': ['Cabo Ortegal','GAL','coast',43.7667,-7.8667,5,['water'],['solo','couple'],['coastal','hiking','birding'],
    'Rock here is six hundred million years old and came from the earth’s mantle. The Vixía Herbeira cliffs nearby are among the highest in continental Europe at six hundred metres.'],
  'GAL-pontevedra': ['Pontevedra','GAL','city',42.4310,-8.6444,5,['urban'],['family','couple'],['historic','food','modern'],
    'A city that removed cars from the entire centre in 1999 and has had no traffic deaths there since. The result is the most pleasant small city in Spain to walk around.'],

  /* ===================== BASQUE COUNTRY ===================== */
  'PVA-san-sebastian': ['San Sebastián','PVA','city',43.3183,-1.9812,9,['urban','water'],['couple','friends'],['food','beach','coastal','surf','nightlife'],
    'A shell-shaped bay, a belle époque centre, and more Michelin stars per head than almost anywhere on earth. The pintxos bars in the old town are the real reason.'],
  'PVA-bilbao': ['Bilbao','PVA','city',43.2630,-2.9350,8,['urban','water'],['couple','family','solo'],['art','architecture','modern','food'],
    'An industrial port that was collapsing in 1990 and rebuilt itself around a museum. The strategy worked so well it has a name in urban planning.'],
  'PVA-guggenheim': ['Guggenheim Bilbao','PVA','museum',43.2687,-2.9340,9,['urban'],['couple','solo','family'],['art','architecture','modern'],
    'Gehry’s titanium curves on a bend in the river, opened in 1997. Richard Serra’s steel spirals in the long gallery are the permanent work worth the ticket on their own.'],
  'PVA-gaztelugatxe': ['San Juan de Gaztelugatxe','PVA','island',43.4472,-2.7850,8,['water'],['couple','friends'],['coastal','hiking','film','historic'],
    'A hermitage on a rock islet reached by a stone causeway and two hundred and forty-one steps. Ring the bell at the top three times. Entry is timed and free but must be booked.'],
  'PVA-zumaia': ['Zumaia flysch','PVA','coast',43.2978,-2.2550,7,['water'],['solo','family'],['coastal','hiking','prehistory'],
    'Sixty million years of seabed tilted on end and sliced by the sea into vertical layers you can walk along at low tide, including the boundary layer of the dinosaur extinction.'],
  'PVA-getaria': ['Getaria','PVA','village',43.3042,-2.2000,6,['water'],['couple','solo'],['food','coastal','wine','historic'],
    'Elcano, who completed the first circumnavigation, was born here. Turbot grilled whole over coals on the street outside the restaurants, and Txakoli poured from a height.'],
  'PVA-hondarribia': ['Hondarribia','PVA','town',43.3639,-1.7944,6,['water'],['couple','family'],['historic','food','beach','coastal'],
    'A walled upper town of painted timber balconies on the French border, with a fishermen’s quarter below it that is the best place in the area to eat cheaply.'],
  'PVA-vitoria': ['Vitoria-Gasteiz','PVA','city',42.8467,-2.6716,6,['urban'],['family','solo'],['historic','modern','food','park'],
    'The quiet Basque capital, built on a medieval almond-shaped street plan, with a ring of parks around it that won it the European Green Capital award.'],
  'PVA-rioja-alavesa': ['Rioja Alavesa','PVA','wine',42.5500,-2.6000,6,['rural'],['couple','friends'],['wine','architecture','food','rural'],
    'The Basque slice of Rioja, with medieval walled Laguardia above cellars dug under every house and two wineries designed by Gehry and Calatrava.'],

  /* ===================== ARAGON ===================== */
  'ARA-ordesa': ['Ordesa y Monte Perdido','ARA','np',42.6500,-0.0333,8,['mountain'],['solo','friends'],['hiking','unesco','park','wildlife'],
    'A glacial canyon with walls eight hundred metres high running under the third-highest limestone massif in Europe. The walk to the Cola de Caballo is the classic Pyrenean day.'],
  'ARA-albarracin': ['Albarracín','ARA','town',40.4078,-1.4436,8,['mountain'],['couple','solo'],['pueblo','historic','prehistory'],
    'Pink-plastered houses stacked on a loop of gorge with a wall running up the ridge behind, often called the most beautiful village in Spain and not obviously wrong.'],
  'ARA-zaragoza': ['Zaragoza','ARA','city',41.6488,-0.8891,7,['urban','water'],['family','solo'],['moorish','historic','roman','food','fiesta'],
    'Roman, then Moorish, then Christian, with an Aljafería palace from the eleventh century and a basilica on the Ebro that Goya painted the dome of.'],
  'ARA-teruel': ['Teruel','ARA','town',40.3456,-1.1065,6,['rural'],['couple','solo'],['unesco','moorish','historic','architecture'],
    'Four Mudéjar towers of brick and glazed tile built by Muslim craftsmen for Christian patrons, and a thirteenth-century love story the town has never let go of.'],
  'ARA-loarre': ['Loarre Castle','ARA','castle',42.3250,-0.6111,6,['mountain'],['family','couple'],['castle','historic','film'],
    'An eleventh-century Romanesque fortress built straight onto a rock outcrop with the stone left showing inside, and one of the best preserved in Europe.'],
  'ARA-ainsa': ['Aínsa','ARA','village',42.4181,0.1372,6,['mountain'],['couple','family'],['pueblo','historic','hiking'],
    'A cobbled medieval square on a spur between two rivers with the Pyrenees filling the view north. The base for the Sobrarbe canyons and for Ordesa’s eastern side.'],
  'ARA-piedra': ['Monasterio de Piedra','ARA','monastery',41.1972,-1.7833,6,['forest','water'],['family','couple'],['monastery','park','hiking'],
    'A Cistercian monastery with a park of waterfalls and grottoes built around it in the nineteenth century, including one fall of fifty metres you walk behind.'],
  'ARA-riglos': ['Mallos de Riglos','ARA','mountain',42.3667,-0.7333,5,['mountain'],['friends','solo'],['hiking','birding','cycling'],
    'Conglomerate towers rising three hundred metres straight out of a village, with one of the largest griffon vulture colonies in Europe nesting on them.'],
  'ARA-jaca': ['Jaca & San Juan de la Peña','ARA','town',42.5700,-0.5500,5,['mountain'],['solo','family'],['camino','monastery','historic','ski'],
    'The first capital of Aragon, on the Camino Aragonés, with a monastery nearby built under an overhanging rock shelf where the royal tombs are cut into the cliff.'],

  /* ===================== ASTURIAS ===================== */
  'AST-picos-covadonga': ['Picos de Europa & Covadonga','AST','np',43.2667,-4.9833,9,['mountain'],['solo','friends','family'],['hiking','park','wildlife','historic'],
    'Limestone peaks rising to 2,600 metres only twenty kilometres from the sea, with two glacial lakes at the top of a road that is capped and shuttled in summer.'],
  'AST-oviedo': ['Oviedo','AST','city',43.3619,-5.8494,7,['urban'],['couple','solo'],['unesco','historic','food','architecture'],
    'Pre-Romanesque churches from the ninth century that predate anything comparable in Europe, standing on a hill above a very walkable and very well-fed city.'],
  'AST-cudillero': ['Cudillero','AST','village',43.5631,-6.1444,6,['water'],['couple','family'],['coastal','pueblo','food'],
    'Houses in saturated colours stacked up an amphitheatre of cliff around a tiny harbour, with the old fishermen’s dialect still spoken by a handful of people.'],
  'AST-somiedo': ['Somiedo','AST','park',43.0833,-6.2500,6,['mountain'],['solo','friends'],['wildlife','hiking','park','rural'],
    'A biosphere reserve where the Cantabrian brown bear population has recovered from near extinction, with thatched shepherds’ huts of a kind found nowhere else.'],
  'AST-llanes': ['Llanes','AST','town',43.4214,-4.7558,6,['water'],['family','couple'],['beach','coastal','surf','food'],
    'A harbour town with painted concrete blocks on the breakwater by the artist Ibarrola, and a coast of small beaches between limestone headlands either side.'],
  'AST-cangas-onis': ['Cangas de Onís','AST','town',43.3500,-5.1333,5,['mountain','water'],['family','couple'],['historic','hiking','food'],
    'The first capital of the Asturian kingdom, with a steep medieval bridge over the Sella and a victory cross hanging under it.'],
  'AST-ribadesella': ['Ribadesella & Tito Bustillo','AST','town',43.4625,-5.0583,5,['water'],['family','solo'],['prehistory','beach','unesco','coastal'],
    'A cave with paintings around twenty thousand years old under a town at a river mouth, plus the finish line of an international canoe descent every August.'],
  'AST-gijon': ['Gijón','AST','city',43.5322,-5.6611,5,['urban','water'],['family','friends'],['coastal','beach','food','roman'],
    'The big Asturian city, with Roman baths under the old fishermen’s quarter, a long city beach and more cider houses than anywhere else on earth.'],

  /* ===================== CANARY ISLANDS ===================== */
  'CNR-teide': ['Teide','CNR','volcano',28.2724,-16.6425,9,['mountain','desert'],['family','friends','solo'],['unesco','volcanic','hiking','darksky','park'],
    'The highest point in Spain at 3,715 metres and the third-largest volcano on earth measured from its base on the ocean floor. The cable car stops short of the summit; the last stretch needs a permit.'],
  'CNR-lanzarote': ['Lanzarote & Timanfaya','CNR','island',29.0469,-13.5899,8,['volcanic','water'],['couple','family'],['volcanic','island','architecture','unesco','beach'],
    'A six-year eruption in the 1730s buried a quarter of the island, and César Manrique then spent his life making sure nothing ugly was built on the rest of it.'],
  'CNR-la-palma': ['La Palma','CNR','island',28.6835,-17.7642,8,['volcanic','forest'],['solo','couple'],['darksky','hiking','volcanic','island','forest'],
    'The steepest island in the world for its size, with a laurel forest in permanent cloud, an eight-kilometre crater, and a sky protected by law for the observatories on the ridge.'],
  'CNR-gomera': ['La Gomera & Garajonay','CNR','island',28.1167,-17.2500,7,['forest','mountain'],['solo','couple'],['unesco','hiking','forest','island'],
    'A laurel forest that has survived since before the ice ages, on an island with a whistled language used to talk across the ravines that is taught in schools.'],
  'CNR-gran-canaria': ['Gran Canaria','CNR','island',27.9202,-15.5474,7,['volcanic','water'],['family','couple'],['beach','hiking','island','volcanic'],
    'Called a continent in miniature for good reason: dunes in the south, pine forest in the middle and a green north, with a rock pinnacle at the centre the islanders held sacred.'],
  'CNR-fuerteventura': ['Fuerteventura','CNR','island',28.3587,-14.0537,7,['water','desert'],['friends','family','couple'],['beach','surf','island','darksky'],
    'The oldest, flattest and windiest of the islands, with a hundred and fifty kilometres of beach and the best windsurfing in the Atlantic.'],
  'CNR-anaga': ['Anaga','CNR','forest',28.5333,-16.2167,7,['forest','mountain'],['solo','friends'],['hiking','forest','unesco','coastal'],
    'A set of eroded ridges on Tenerife’s northeast tip holding dense laurel forest, hamlets reached on foot, and the best walking on the island.'],
  'CNR-el-hierro': ['El Hierro','CNR','island',27.7500,-18.0000,6,['volcanic','water'],['solo','couple'],['diving','island','darksky','volcanic'],
    'The smallest and westernmost island, which ran for a stretch entirely on wind and pumped-hydro power. The marine reserve at La Restinga is the best diving in the Canaries.'],
  'CNR-maspalomas': ['Maspalomas dunes','CNR','beach',27.7392,-15.5861,6,['desert','water'],['family','couple'],['beach','coastal','birding'],
    'Four square kilometres of mobile dunes behind a long beach on Gran Canaria’s southern tip, protected since 1987 and genuinely desert-like in the middle.'],
  'CNR-masca': ['Masca','CNR','village',28.3092,-16.8364,6,['mountain'],['friends','solo'],['hiking','pueblo','gorge'],
    'A hamlet on a knife-edge ridge in Tenerife’s oldest massif, with a gorge walk down to the sea that reopened in 2021 with booking, helmets and a boat out.'],
  'CNR-manrique': ['The César Manrique sites','CNR','museum',29.0333,-13.5167,6,['volcanic'],['couple','family'],['architecture','art','volcanic','modern'],
    'Jameos del Agua, Mirador del Río, the Cactus Garden and his own house built inside five lava bubbles. One artist’s argument about how an island should look.'],

  /* ===================== BALEARIC ISLANDS ===================== */
  'BAL-tramuntana': ['Serra de Tramuntana','BAL','sierra',39.7500,2.7500,8,['mountain','water'],['couple','solo','friends'],['unesco','hiking','cycling','coastal','rural'],
    'A ninety-kilometre limestone range down Mallorca’s northwest coast, World Heritage for the dry-stone terracing, and the best road cycling in Europe in February.'],
  'BAL-palma': ['Palma','BAL','city',39.5696,2.6502,8,['urban','water'],['couple','family','friends'],['historic','gothic','food','beach','nightlife'],
    'A sandstone cathedral on the waterfront with a Gaudí intervention inside and a Barceló chapel, above an old town of Arab baths, courtyards and very good eating.'],
  'BAL-soller': ['Sóller & Deià','BAL','town',39.7667,2.7167,7,['mountain','water'],['couple','solo'],['historic','hiking','coastal','literary'],
    'An orange-growing valley reached by a wooden train from 1912 through thirteen tunnels, with Deià up the coast where Robert Graves lived and is buried.'],
  'BAL-menorca': ['Menorca','BAL','island',39.9496,4.1100,7,['water','rural'],['family','couple'],['beach','island','prehistory','rural'],
    'The quiet one. A biosphere reserve with a coastal path round the whole island, Bronze Age stone monuments in the fields, and coves you still have to walk to.'],
  'BAL-ciutadella': ['Ciutadella','BAL','town',40.0000,3.8333,6,['urban','water'],['couple','family'],['historic','fiesta','food','coastal'],
    'Menorca’s old capital, built in sandstone around a long narrow harbour, with a June festival where horses rear on their hind legs through packed crowds.'],
  'BAL-ibiza': ['Ibiza','BAL','island',38.9067,1.4206,7,['water'],['friends','couple'],['nightlife','beach','island','unesco','historic'],
    'Two separate places sharing an island: a World Heritage walled town with Phoenician roots, and the most concentrated club scene on the planet from June to September.'],
  'BAL-formentera': ['Formentera','BAL','island',38.6833,1.4333,6,['water'],['couple','friends'],['beach','island','coastal','diving'],
    'Reachable only by boat from Ibiza, with no airport, a seagrass meadow offshore that is among the oldest living organisms on earth, and water that is genuinely Caribbean.'],
  'BAL-cabrera': ['Cabrera','BAL','island',39.1500,2.9333,5,['water'],['solo','family'],['island','park','diving','wildlife'],
    'A national park archipelago south of Mallorca, uninhabited apart from a few staff, with a daily visitor cap and a sea cave the boats go into on the way in.'],
  'BAL-es-vedra': ['Es Vedrà & the southwest coves','BAL','coast',38.8700,1.2000,5,['water'],['couple','friends'],['coastal','beach','hiking'],
    'A four-hundred-metre limestone rock offshore that attracts a great deal of mythology, seen best from the cliff above Cala d’Hort at sunset.'],

  /* ===================== NAVARRE ===================== */
  'NAV-pamplona': ['Pamplona','NAV','city',42.8125,-1.6458,8,['urban'],['friends','solo'],['fiesta','food','historic','literary'],
    'A walled Basque-Navarrese city that is quiet and extremely pleasant for fifty-one weeks a year, and then holds San Fermín. Hemingway is why the rest of the world knows.'],
  'NAV-bardenas': ['Bardenas Reales','NAV','desert',42.2000,-1.4667,7,['desert'],['friends','solo'],['film','cycling','hiking','darksky'],
    'Forty-two thousand hectares of clay and gypsum badlands with isolated pinnacles, used for grazing since the Middle Ages and for filming since the 1990s.'],
  'NAV-olite': ['Olite','NAV','castle',42.4806,-1.6500,6,['rural'],['family','couple'],['castle','historic','wine'],
    'A royal palace of the kings of Navarre with fifteen towers, a hanging garden and, once, a lion pit. Heavily restored and still one of the best castles in Spain.'],
  'NAV-irati': ['Selva de Irati','NAV','forest',42.9667,-1.1167,6,['forest','mountain'],['solo','couple'],['forest','hiking','park','wildlife'],
    'The second-largest beech and fir forest in Europe, on the French border, with a short and spectacular window of colour in the last week of October.'],
  'NAV-roncesvalles': ['Roncesvalles','NAV','camino',43.0094,-1.3194,5,['mountain','forest'],['solo','friends'],['camino','hiking','historic'],
    'Where the Camino Francés crosses the Pyrenees and where Roland died in 778, with a pilgrim hostel in a thirteenth-century building and a hard first day either way.'],
  'NAV-estella': ['Estella & Ujué','NAV','town',42.6722,-2.0306,5,['rural'],['solo','couple'],['camino','historic','wine','pueblo'],
    'A Romanesque town on the Camino with a wine fountain at a monastery just outside it, and a fortified hill village to the south with a view across half of Navarre.'],

  /* ===================== CANTABRIA ===================== */
  'CTB-altamira': ['Altamira','CTB','cave',43.3778,-4.1222,8,['rural'],['solo','family'],['unesco','prehistory','cave','art'],
    'Bison painted on a cave ceiling around fourteen thousand years ago, so good that they were dismissed as forgeries for twenty years. The original is closed; the replica is exact.'],
  'CTB-santillana': ['Santillana del Mar','CTB','village',43.3906,-4.1081,7,['rural'],['couple','family'],['historic','pueblo'],
    'A cobbled village of stone manor houses with coats of arms on them, famously neither holy nor flat nor by the sea despite the name. Sartre called it the prettiest village in Spain.'],
  'CTB-picos-fuente-de': ['Fuente Dé & Liébana','CTB','mountain',43.1458,-4.8139,7,['mountain'],['family','friends'],['hiking','park','wildlife'],
    'A cable car that climbs seven hundred and fifty-three metres in under four minutes to a plateau in the Picos, with high walking and no effort to get there.'],
  'CTB-comillas': ['Comillas','CTB','town',43.3861,-4.2917,6,['water'],['couple','family'],['modernisme','architecture','beach','historic'],
    'A small coastal town with an early Gaudí villa covered in sunflower tiles, a Catalan modernista seminary and a beach, which is an odd combination that works.'],
  'CTB-santander': ['Santander','CTB','city',43.4623,-3.8100,6,['urban','water'],['family','couple'],['beach','coastal','food','architecture'],
    'A bay city rebuilt after a 1941 fire, with a royal palace on a headland, a Renzo Piano arts centre on the water and the Sardinero beaches at the far end.'],
  'CTB-cabarceno': ['Cabárceno','CTB','park',43.3500,-3.8333,5,['rural'],['family'],['wildlife','park'],
    'An abandoned open-cast iron mine turned into seven hundred and fifty hectares of enclosures where the animals have space to behave more or less normally.'],

  /* ===================== EXTREMADURA ===================== */
  'EXT-merida': ['Mérida','EXT','ruin',38.9161,-6.3433,8,['urban','water'],['family','solo'],['roman','unesco','historic','fiesta'],
    'The best Roman remains in Spain, including a theatre from 15 BC that still holds a classical drama festival every summer, plus an aqueduct, a circus and a bridge.'],
  'EXT-caceres': ['Cáceres','EXT','city',39.4753,-6.3724,8,['urban'],['couple','solo'],['unesco','historic','food','film'],
    'A walled old town of noble towers and almost no modern intrusion, so complete that productions film here rather than build sets. Storks nest on most of the towers.'],
  'EXT-trujillo': ['Trujillo','EXT','town',39.4597,-5.8819,7,['rural'],['couple','family'],['historic','castle','food'],
    'Pizarro was born here and the palaces around the main square were paid for with Peruvian silver. A Moorish castle above and one of the best cheese fairs in Spain in May.'],
  'EXT-guadalupe': ['Guadalupe','EXT','monastery',39.4522,-5.3281,6,['mountain'],['solo','family'],['unesco','monastery','historic'],
    'A monastery that was the most important pilgrimage site in Spain before Santiago overtook it, where Columbus’s contract was signed and the first Americans were baptised.'],
  'EXT-monfrague': ['Monfragüe','EXT','np',39.8333,-6.0500,7,['forest','water'],['solo','friends'],['birding','wildlife','park','hiking'],
    'A quartzite ridge over the Tagus holding the densest colony of black vultures in the world, plus imperial eagles and black storks. Birders come from everywhere.'],
  'EXT-la-vera': ['La Vera & Yuste','EXT','valley',40.1167,-5.7333,5,['mountain','water'],['couple','family'],['rural','historic','monastery','food'],
    'River pools cut into granite, timber-framed villages, and the monastery where Charles V retired and died. Also where Spanish smoked paprika comes from.'],
  'EXT-zafra': ['Zafra','EXT','town',38.4222,-6.4167,5,['rural'],['couple','solo'],['historic','castle','food'],
    'A white alcázar that is now a parador, two arcaded squares opening into one another, and the dehesa around it that feeds the black pigs.'],

  /* ===================== MURCIA ===================== */
  'MUR-cartagena': ['Cartagena','MUR','city',37.6257,-0.9966,7,['urban','water'],['family','solo'],['roman','historic','coastal','architecture'],
    'Founded by Carthage in 227 BC, with a Roman theatre only discovered in 1988 under the old cathedral and a harbour that has been a naval base ever since.'],
  'MUR-mar-menor': ['Mar Menor','MUR','lake',37.7167,-0.8000,5,['water'],['family','friends'],['beach','coastal','birding'],
    'Europe’s largest saltwater lagoon, separated from the Mediterranean by a narrow bar, warm and shallow enough to wade a long way out. Ecologically in trouble and being watched closely.'],
  'MUR-murcia-city': ['Murcia','MUR','city',37.9922,-1.1307,5,['urban','water'],['family','solo'],['historic','food','market','fiesta'],
    'A baroque cathedral facade like a carved altarpiece, a very good market, and the huerta around it that has supplied vegetables to half of Europe since the Moors dug the channels.'],
  'MUR-sierra-espuna': ['Sierra Espuña','MUR','park',37.8500,-1.5667,5,['mountain','forest'],['solo','family'],['hiking','park','forest','cycling'],
    'A reforested range in dry country with twenty-six snow wells built in the sixteenth century to store ice for the lowland cities through the summer.'],

  /* ===================== LA RIOJA ===================== */
  'RIO-haro': ['Haro & the Barrio de la Estación','RIO','wine',42.5778,-2.8472,7,['rural'],['couple','friends'],['wine','food','fiesta'],
    'Seven of the oldest Rioja houses within walking distance of one another around the railway station, which is the densest concentration of century-old wineries anywhere.'],
  'RIO-logrono': ['Logroño','RIO','city',42.4650,-2.4456,6,['urban','water'],['friends','couple'],['food','camino','wine','tapas'],
    'Calle Laurel, where each bar makes one thing and makes it well, and you move along the street eating it. On the Camino, which explains some of the appetite.'],
  'RIO-san-millan': ['San Millán de la Cogolla','RIO','monastery',42.3264,-2.8656,6,['mountain'],['solo','couple'],['unesco','monastery','historic','literary'],
    'Two monasteries where a tenth-century monk wrote the first known words of Castilian Spanish in the margin of a Latin text, which makes this the birthplace of the language.'],
  'RIO-dinosaur-trails': ['Enciso dinosaur trails','RIO','ruin',42.1500,-2.2667,5,['rural','mountain'],['family'],['prehistory','hiking','rural'],
    'Thousands of footprints left in what was lakeshore mud a hundred and twenty million years ago, on bare rock slabs across the hills of the southern Rioja.']

};

/* ---------- ids, sorted by prominence then name ---------- */
const ES_PLACE_IDS = Object.keys(ES_PLACES).sort((a, b) => {
  const d = (ES_PLACES[b][5] || 0) - (ES_PLACES[a][5] || 0);
  return d !== 0 ? d : ES_PLACES[a][0].localeCompare(ES_PLACES[b][0]);
});

function esPlaceGet(id){
  const p = ES_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'ES' } : null;
}

function esRegionName(code){ return (ES_REGIONS[code] || [])[0] || code; }
function esKindLabel(k){ return ES_KIND[k] || k; }

/* Places in one community, best known first. */
function esRegionPlaces(code){
  return ES_PLACE_IDS.filter(id => ES_PLACES[id][1] === code)
    .sort((a, b) => (ES_PLACES[b][5] || 0) - (ES_PLACES[a][5] || 0));
}

/* ---------- geography helpers ----------

   Spain has three very different seas and a large dry interior, so
   "is it coastal" cannot be answered by distance alone: Madrid is
   three hundred kilometres from salt water and Toledo is inland in
   every sense, while Cádiz is on a spit. The coarse coastline below
   is enough to tell them apart without shipping a polygon. */

const ES_COAST = [
  /* Mediterranean, south to north */
  [36.00,-5.61],[36.52,-6.29],[36.72,-4.42],[36.75,-3.52],[36.83,-2.46],
  [37.56,-0.98],[37.98,-0.65],[38.35,-0.48],[38.79,0.17],[39.47,-0.33],
  [39.86,0.02],[40.36,0.41],[40.72,0.73],[41.12,1.25],[41.24,1.81],
  [41.38,2.17],[41.68,2.80],[41.98,3.17],[42.29,3.28],
  /* Cantabrian and Atlantic north, east to west */
  [43.36,-1.79],[43.32,-1.98],[43.30,-2.26],[43.45,-2.78],[43.26,-2.93],
  [43.39,-3.81],[43.46,-3.81],[43.39,-4.29],[43.42,-4.76],[43.46,-5.06],
  [43.53,-5.66],[43.56,-6.14],[43.55,-7.16],[43.77,-7.87],
  /* Galician rías and Atlantic west, north to south */
  [43.36,-8.41],[43.05,-9.19],[42.91,-9.26],[42.60,-8.99],[42.43,-8.71],
  [42.22,-8.90],[41.89,-8.87],
  /* Atlantic southwest */
  [37.22,-7.41],[37.12,-6.79],[36.80,-6.35],[36.53,-6.29],[36.18,-5.93],
  /* Balearics and Canaries, so island places read as coastal */
  [39.57,2.65],[39.75,2.75],[39.95,4.11],[38.91,1.42],[38.68,1.43],
  [28.27,-16.64],[28.47,-16.25],[29.05,-13.59],[28.68,-17.76],[27.92,-15.55],
  [28.36,-14.05],[28.12,-17.25],[27.75,-18.00]
];

function esKmApart(aLat, aLon, bLat, bLon){
  const R = 6371, toRad = Math.PI / 180;
  const dLat = (bLat - aLat) * toRad, dLon = (bLon - aLon) * toRad;
  const s = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(aLat * toRad) * Math.cos(bLat * toRad)
          * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

function esKmToCoast(p){
  let best = 1e9;
  for (const c of ES_COAST) best = Math.min(best, esKmApart(p.lat, p.lon, c[0], c[1]));
  return best;
}

/* Kinds that are inland by definition even when the arithmetic is
   generous, and the communities with no coast at all. */
const ES_INLAND_KIND = { sierra:1, mountain:1, volcano:1, gorge:1, valley:1,
                         desert:1, monastery:1, cave:1, wine:1, forest:1,
                         lake:1 };
const ES_LANDLOCKED  = { MAD:1, CLM:1, CYL:1, ARA:1, EXT:1, NAV:1, RIO:1 };

function esMaybeCoastal(p){
  if (!p) return false;
  const f = p.flags || [];
  if (f.indexOf('coastal') !== -1 || f.indexOf('beach') !== -1
      || f.indexOf('surf') !== -1 || f.indexOf('diving') !== -1) return true;
  if (ES_LANDLOCKED[p.abbr]) return false;
  if (ES_INLAND_KIND[p.kind] && f.indexOf('island') === -1) return false;
  return esKmToCoast(p) < 30;
}

/* Which body of water, for the marine panel's wording. */
function esSeaOf(p){
  if (!p) return 'the sea';
  if (p.abbr === 'CNR') return 'the Atlantic';
  if (p.abbr === 'BAL') return 'the Mediterranean';
  if (p.abbr === 'PVA' || p.abbr === 'CTB' || p.abbr === 'AST') return 'the Bay of Biscay';
  if (p.abbr === 'GAL') return p.lat > 43.2 ? 'the Bay of Biscay' : 'the Atlantic';
  if (p.lon < -5.6 && p.lat < 37.3) return 'the Atlantic';
  return 'the Mediterranean';
}

/* High enough for the air, the cold or the road to matter. */
const ES_HIGH_REGION = { ARA:1, AST:1, CTB:1, NAV:1 };
function esIsHighAltitude(p){
  if (!p) return false;
  if (['sierra','mountain','volcano'].indexOf(p.kind) !== -1) return true;
  if ((p.flags || []).indexOf('ski') !== -1) return true;
  return p.kind === 'np' && !!ES_HIGH_REGION[p.abbr];
}

/* The meseta: the high central plateau, where the continental
   climate produces the extremes the coasts never see. Nine months
   of winter and three of hell, as the saying goes. */
const ES_MESETA = { MAD:1, CYL:1, CLM:1, EXT:1 };
function esIsMeseta(p){ return !!(p && ES_MESETA[p.abbr]); }

/* Where Saharan dust actually reaches in quantity. The Canaries get
   the calima directly off Africa; the southeast and the Balearics
   get it several times a year when the flow turns southerly. */
const ES_CALIMA = { CNR:1, ADL:1, MUR:1, BAL:1, VLC:1, EXT:1 };
function esIsCalimaProne(p){ return !!(p && ES_CALIMA[p.abbr]); }

/* Spain keeps central European time despite sitting on Greenwich's
   meridian, a decision made in 1940 and never reversed. That gap is
   why dinner is at ten: the clock is wrong, not the people. */
function esIsVolcanic(p){ return !!(p && (p.abbr === 'CNR')); }
