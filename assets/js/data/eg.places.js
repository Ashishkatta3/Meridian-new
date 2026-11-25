/* ===========================================================
   EGYPT — regions and places

   Same packed-array shape as everything else in the atlas:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Its own namespace (EG_PLACES / egPlaceGet), so nothing here
   touches the US map, the US search index or the planner until
   the atlases are deliberately joined.

   The regions are NOT the twenty-seven governorates. Egypt's
   governorates split Cairo across three lines and lump the entire
   Western Desert into two enormous ones, which is useless for
   anyone planning a trip. What people actually name is the stretch
   of country: Luxor, Aswan, the Red Sea, Sinai, the oases. That is
   what the thirteen regions below are.

   Region codes are three letters and avoid every code already taken
   by Italy, Costa Rica, India, Japan and Spain.

   The vocabulary is Egypt's own. A mortuary temple is not a tomb, a
   mastaba is not a pyramid, and an oasis here means a depression in
   the Sahara with its own water table and its own dialect.
   =========================================================== */

/* ---------- what a place IS, Egyptian edition ---------- */
const EG_KIND = {
  city:      'City',
  town:      'Town',
  village:   'Village',
  district:  'District',
  temple:    'Temple',
  tomb:      'Tomb',
  pyramid:   'Pyramid',
  mosque:    'Mosque',
  monastery: 'Monastery',
  museum:    'Museum',
  ruin:      'Ancient site',
  oasis:     'Oasis',
  desert:    'Desert',
  dunes:     'Sand sea',
  mountain:  'Mountain',
  canyon:    'Canyon',
  coast:     'Coast',
  beach:     'Beach',
  reef:      'Reef',
  island:    'Island',
  river:     'River',
  lake:      'Lake',
  fort:      'Fortress',
  market:    'Market',
  dam:       'Dam',
  quarry:    'Quarry',
  region:    'Region'
};

/* Extra flags Egypt needs. The base FLAG list in taxonomy.js still
   applies underneath. Every tag used below has a label here or
   there; the test suite checks it, because a missing one renders as
   a raw lowercase chip. */
const EG_FLAG = {
  unesco:     ['UNESCO',        'On the World Heritage list'],
  pharaonic:  ['Pharaonic',     'Dynastic Egypt, before the Greeks'],
  ptolemaic:  ['Ptolemaic',     'Greek rulers building in Egyptian style'],
  roman:      ['Roman',         'Rome ran Egypt for six centuries'],
  coptic:     ['Coptic',        'Egyptian Christianity, older than most of Europe’s'],
  islamic:    ['Islamic',       'Fatimid, Ayyubid, Mamluk or Ottoman'],
  nubian:     ['Nubian',        'A culture the dam displaced and did not erase'],
  nile:       ['On the Nile',   'The river is the reason the place exists'],
  tomb:       ['Tombs',         'Painted or carved burial chambers'],
  temple:     ['Temple',        'A standing temple, not a foundation outline'],
  pyramid:    ['Pyramids',      'A built tomb, stepped or true'],
  hieroglyph: ['Hieroglyphs',   'Carving and colour still legible'],
  diving:     ['Diving',        'Worth getting in with a tank'],
  snorkel:    ['Snorkelling',   'Reef you can reach from the shore'],
  reef:       ['Coral',         'Living reef and the fish that go with it'],
  wreck:      ['Wrecks',        'Something sank here and divers go down to it'],
  beach:      ['Beach',         'Sand worth the journey'],
  coastal:    ['Coastal',       'The sea is the whole point'],
  island:     ['Island',        'Reached by boat'],
  desert:     ['Desert',        'Open sand, rock and nothing else'],
  oasis:      ['Oasis',         'Springs, palms and its own way of doing things'],
  bedouin:    ['Bedouin',       'The people who know the ground'],
  darksky:    ['Dark skies',    'Among the darkest night skies anywhere'],
  hiking:     ['Walking',       'Real walking, not a viewpoint car park'],
  birding:    ['Birds',         'On a major migration route'],
  wildlife:   ['Wildlife',      'Animals are the draw'],
  market:     ['Market',        'A working market, not a souvenir row'],
  museum:     ['Museum',        'A collection worth the trip on its own'],
  historic:   ['Old quarter',   'Pre-modern streets still standing'],
  modern:     ['Modern',        'Contemporary Egypt rather than ancient'],
  wwii:       ['1942',          'The desert war is why the name is known'],
  religious:  ['Pilgrimage',    'People come here on faith'],
  sufi:       ['Sufi',          'A moulid, a shrine or a weekly zikr'],
  felucca:    ['Felucca',       'The lateen-sailed boat is how you should arrive'],
  fossil:     ['Fossils',       'Deep time, visible in the rock'],
  quarry:     ['Quarries',      'Where the stone for the monuments came from'],
  food:       ['Food',          'Worth planning meals around'],
  crowds:     ['Go early',      'Busy enough that the hour matters'],
  architecture:['Architecture','The buildings are the reason'],
  park:       ['Protected',    'A national park or a protectorate'],
  ruin:       ['Ruins',        'Foundations and fallen stone, not standing walls'],
  literary:   ['Literary',     'Written about, and worth reading first'],
  prehistory: ['Prehistoric',  'Rock art or older'],
  rural:      ['Countryside',  'Fields, palms and villages'],
  nightlife:  ['Nightlife',    'The evening is the reason']
};

/* ---------- the regions ----------
   code -> [ English name, Arabic name, character, blurb ] */
const EG_REGIONS = {
  CAI: ['Cairo', 'القاهرة', 'urban',
    'Twenty-two million people, a thousand years of Islamic architecture in one square kilometre, and traffic that has to be experienced rather than described.'],
  GIZ: ['Giza & Memphis', 'الجيزة', 'pharaonic',
    'The Old Kingdom necropolis: the three great pyramids, the step pyramid that came first, and the two at Dahshur where they worked out how to build them.'],
  ALX: ['Alexandria', 'الإسكندرية', 'coastal',
    'Founded by Alexander, run by the Ptolemies, and almost entirely gone. What survives is a Mediterranean city that faces away from the rest of Egypt.'],
  MTR: ['North Coast & Matrouh', 'مطروح', 'coastal',
    'Five hundred kilometres of Mediterranean beach west of Alexandria, a war cemetery at El Alamein, and water the colour of the Aegean.'],
  LXR: ['Luxor', 'الأقصر', 'pharaonic',
    'Ancient Thebes. The largest religious building ever constructed on the east bank and the entire New Kingdom buried in the hills on the west.'],
  ASW: ['Aswan & Nubia', 'أسوان', 'nile',
    'Where the Nile narrows between granite islands, the Sahara reaches the water, and Nubia begins. Abu Simbel is three hours south.'],
  MDE: ['Middle Egypt', 'مصر الوسطى', 'pharaonic',
    'The stretch almost nobody visits, holding Abydos, Dendera, and the city Akhenaten built from nothing and abandoned in a generation.'],
  FAY: ['Fayoum', 'الفيوم', 'rural',
    'A depression fed by a Nile channel since the Middle Kingdom, with a salt lake, a pottery village and a valley of fossil whales.'],
  RSE: ['Red Sea', 'البحر الأحمر', 'coastal',
    'Twelve hundred kilometres of reef along a desert coast, with water clear enough that the limiting factor is usually the boat schedule.'],
  SSI: ['Sinai', 'سيناء', 'desert',
    'A granite and sandstone wedge between two gulfs, holding the oldest working monastery on earth and some of the best diving in the world.'],
  WDS: ['Western Desert', 'الصحراء الغربية', 'desert',
    'Two thirds of Egypt and almost none of its people. Five oases, a chalk desert of wind-carved white rock, and sand seas the size of countries.'],
  DLT: ['Nile Delta', 'الدلتا', 'rural',
    'Where the river fans out and twenty-five thousand square kilometres of farmland begin. Ruined capitals, desert monasteries and a town that gave the Rosetta Stone its name.'],
  SUZ: ['Suez Canal', 'قناة السويس', 'modern',
    'A hundred and ninety-three kilometres of ditch that changed world trade, with two towns at either end that grew up entirely to serve it.']
};

const EG_PLACES = {

  /* ===================== CAIRO ===================== */
  'CAI-cairo': ['Cairo','CAI','city',30.0444,31.2357,10,['urban'],['friends','solo','couple'],['islamic','historic','market','food','modern','crowds'],
    'Founded in 969, the largest city in Africa and the Arab world, and the only place where Pharaonic, Coptic, Fatimid, Mamluk and Ottoman Egypt all stand within a few kilometres of each other.'],
  'CAI-egyptian-museum': ['Egyptian Museum, Tahrir','CAI','museum',30.0478,31.2336,8,['urban'],['solo','family'],['museum','pharaonic','historic'],
    'The 1902 museum on Tahrir Square, deliberately crowded, barely labelled and still remarkable. Most of the headline pieces have moved west, but what is left is the Egypt of a century of excavation.'],
  'CAI-gem': ['Grand Egyptian Museum','CAI','museum',29.9939,31.1192,10,['urban','desert'],['family','couple','solo'],['museum','pharaonic','modern','crowds'],
    'Twenty years in the building, on a site in line with the pyramids, holding the complete Tutankhamun collection together for the first time since it came out of the ground in 1922.'],
  'CAI-khan-el-khalili': ['Khan el-Khalili','CAI','market',30.0477,31.2622,8,['urban'],['friends','couple'],['market','islamic','historic','food'],
    'A commercial quarter since 1382, still laid out by trade: coppersmiths in one lane, gold in another, spices in a third. El Fishawy has been open more or less continuously since 1797.'],
  'CAI-al-muizz': ['Al-Muizz Street','CAI','district',30.0507,31.2622,8,['urban'],['solo','couple'],['islamic','unesco','historic','architecture'],
    'A kilometre of Fatimid, Ayyubid, Mamluk and Ottoman buildings in an unbroken run, which is the densest concentration of Islamic architecture anywhere. Pedestrianised and lit at night.'],
  'CAI-citadel': ['Citadel of Saladin','CAI','fort',30.0288,31.2599,7,['urban'],['family','solo'],['islamic','historic','architecture'],
    'Saladin fortified this spur in 1176 and it held the seat of government for seven hundred years. The alabaster mosque on top is Ottoman and the view over the city is the point.'],
  'CAI-ibn-tulun': ['Ibn Tulun Mosque','CAI','mosque',30.0287,31.2494,7,['urban'],['solo','couple'],['islamic','historic','architecture'],
    'Finished in 879 and the oldest mosque in Egypt still standing in its original form. A vast empty courtyard and a spiral minaret you can climb, usually with nobody else on it.'],
  'CAI-coptic-cairo': ['Coptic Cairo','CAI','district',30.0054,31.2306,7,['urban'],['solo','family'],['coptic','historic','religious','museum'],
    'Churches built inside the walls of a Roman fort, including one suspended over a gatehouse, plus the oldest synagogue in Egypt and the crypt where the Holy Family is said to have sheltered.'],
  'CAI-al-azhar-park': ['Al-Azhar Park','CAI','district',30.0406,31.2628,6,['urban'],['family','couple'],['modern','historic'],
    'Thirty hectares built on five hundred years of accumulated rubbish, which when cleared revealed a lost stretch of the twelfth-century Ayyubid wall. The best view of Islamic Cairo at sunset.'],
  'CAI-city-of-the-dead': ['City of the Dead','CAI','district',30.0400,31.2770,6,['urban'],['solo'],['islamic','historic'],
    'A six-kilometre necropolis of Mamluk tomb-complexes where families live among and inside the mausolea. Parts have been demolished since 2020 for a motorway, which is contested.'],
  'CAI-zamalek': ['Zamalek','CAI','district',30.0609,31.2197,6,['urban'],['couple','solo'],['modern','food','nile','historic'],
    'An island in the Nile laid out for the 1869 canal opening, now the calmest part of Cairo: embassies, 1930s apartment blocks, galleries and the places residents actually eat.'],
  'CAI-heliopolis': ['Heliopolis','CAI','district',30.0875,31.3242,5,['urban'],['solo','couple'],['modern','historic','architecture'],
    'A desert suburb built from scratch in 1905 by a Belgian industrialist in an invented Moorish style, with arcades, a basilica and a Hindu-temple-shaped palace.'],
  'CAI-nilometer': ['Rhoda Island & the Nilometer','CAI','ruin',30.0073,31.2250,5,['urban','water'],['solo'],['nile','islamic','historic'],
    'A marble column in a stone shaft from 861, used to measure the flood and set the year’s tax rate. One of the oldest Islamic structures in Egypt and almost always empty.'],

  /* ===================== GIZA & MEMPHIS ===================== */
  'GIZ-pyramids': ['Pyramids of Giza','GIZ','pyramid',29.9792,31.1342,10,['desert'],['family','couple','friends'],['unesco','pharaonic','pyramid','crowds','darksky'],
    'The only one of the seven wonders of the ancient world still standing. Khufu’s was the tallest building on earth for about 3,800 years, which is a record nothing is going to take back.'],
  'GIZ-sphinx': ['Great Sphinx','GIZ','ruin',29.9753,31.1376,9,['desert'],['family','couple'],['pharaonic','unesco','crowds'],
    'Seventy-three metres of limestone carved in place in the Fourth Dynasty, buried to the neck in sand for most of its history, which is why the body is weathered and the head is not.'],
  'GIZ-saqqara': ['Saqqara','GIZ','pyramid',29.8713,31.2165,9,['desert'],['family','solo'],['unesco','pharaonic','pyramid','tomb','hieroglyph'],
    'Djoser’s step pyramid of about 2670 BC is the oldest large stone building in the world, and the mastabas around it have the best painted reliefs of daily life anywhere.'],
  'GIZ-dahshur': ['Dahshur','GIZ','pyramid',29.7903,31.2244,8,['desert'],['solo','couple'],['pharaonic','pyramid','unesco'],
    'The Bent Pyramid, where the angle was changed partway up, and the Red Pyramid next to it, which was the first successful true pyramid. You can go inside both and there is almost nobody.'],
  'GIZ-memphis': ['Memphis','GIZ','ruin',29.8486,31.2510,6,['rural'],['family','solo'],['pharaonic','historic'],
    'The capital of Egypt for most of three thousand years, now a palm grove with a colossal fallen Ramesses II lying on his back in a shed and an alabaster sphinx outside.'],
  'GIZ-abusir': ['Abusir','GIZ','pyramid',29.8958,31.2031,5,['desert'],['solo'],['pharaonic','pyramid','ruin'],
    'Fifth Dynasty pyramids that were badly built and have mostly collapsed, which makes them useless as monuments and extremely informative about construction. Rarely open and worth asking.'],

  /* ===================== ALEXANDRIA ===================== */
  'ALX-alexandria': ['Alexandria','ALX','city',31.2001,29.9187,8,['urban','water'],['couple','solo'],['coastal','historic','food','ptolemaic','roman'],
    'Alexander laid it out in 331 BC and it was the intellectual capital of the ancient world. Almost all of that is under the sea or under the modern city, which is itself worth the trip.'],
  'ALX-bibliotheca': ['Bibliotheca Alexandrina','ALX','museum',31.2089,29.9092,7,['urban','water'],['family','solo'],['modern','museum','architecture'],
    'A tilted granite disc opened in 2002 as a gesture towards the library that burned, with eleven cascading reading levels and a wall carved with characters from every known script.'],
  'ALX-qaitbay': ['Fort Qaitbay','ALX','fort',31.2139,29.8856,7,['urban','water'],['family','couple'],['islamic','coastal','historic'],
    'Built in 1477 on the exact footprint of the Pharos lighthouse, using its fallen stone. Blocks from the lighthouse still lie on the seabed just offshore and divers go down to them.'],
  'ALX-catacombs': ['Catacombs of Kom el Shoqafa','ALX','tomb',31.1783,29.8922,7,['urban'],['solo','family'],['roman','tomb','historic','ptolemaic'],
    'Three levels of second-century tombs cut thirty-five metres down, where Egyptian, Greek and Roman funerary art are mixed in the same carving. Anubis appears in a Roman legionary’s armour.'],
  'ALX-montazah': ['Montazah & the Corniche','ALX','coast',31.2881,30.0156,5,['urban','water'],['family','couple'],['coastal','beach','historic'],
    'A royal palace in a mix of Florentine and Ottoman styles in gardens above a curved bay, at the far end of a seafront that runs for most of the length of the city.'],

  /* ===================== NORTH COAST & MATROUH ===================== */
  'MTR-marsa-matruh': ['Marsa Matruh','MTR','coast',31.3543,27.2373,6,['water','desert'],['family','couple'],['beach','coastal','historic'],
    'A lagoon of genuinely turquoise water behind a rock bar, where Cleopatra is supposed to have swum and where Rommel ran his headquarters out of a cave now holding a small museum.'],
  'MTR-el-alamein': ['El Alamein','MTR','ruin',30.8300,28.9500,6,['desert','water'],['solo','family'],['wwii','historic','coastal'],
    'Two battles in 1942 stopped the Axis advance on Egypt. Three large war cemeteries, a museum, and a desert that is still being cleared of mines eighty years later.'],

  /* ===================== LUXOR ===================== */
  'LXR-karnak': ['Karnak','LXR','temple',25.7188,32.6573,10,['water'],['family','couple','solo'],['unesco','pharaonic','temple','hieroglyph','crowds'],
    'Built, extended and rebuilt over two thousand years by about thirty pharaohs, which makes it the largest religious complex ever constructed. The hypostyle hall has a hundred and thirty-four columns.'],
  'LXR-luxor-temple': ['Luxor Temple','LXR','temple',25.6995,32.6391,9,['urban','water'],['couple','solo'],['unesco','pharaonic','temple','hieroglyph'],
    'In the middle of the modern town, with a mosque built on top of the fill that once buried it and a Roman chapel painted over the Pharaonic reliefs. Best after dark, when it is lit and quiet.'],
  'LXR-valley-of-kings': ['Valley of the Kings','LXR','tomb',25.7402,32.6014,10,['desert'],['family','couple','solo'],['unesco','pharaonic','tomb','hieroglyph','crowds'],
    'Sixty-five tombs cut into a limestone wadi under a natural pyramid-shaped peak. The standard ticket covers three; Seti I and Nefertari cost extra and are worth it.'],
  'LXR-hatshepsut': ['Deir el-Bahari','LXR','temple',25.7382,32.6069,9,['desert'],['family','couple'],['unesco','pharaonic','temple','architecture'],
    'Hatshepsut’s terraced mortuary temple set against a three-hundred-metre cliff, which is the most modern-looking building in ancient Egypt and was designed by her steward Senenmut.'],
  'LXR-medinet-habu': ['Medinet Habu','LXR','temple',25.7194,32.6008,8,['desert'],['solo','couple'],['pharaonic','temple','hieroglyph'],
    'Ramesses III’s mortuary temple, the best preserved on the west bank, with colour still on the ceilings and reliefs of the Sea Peoples battles carved deep enough to survive everything.'],
  'LXR-valley-of-queens': ['Valley of the Queens','LXR','tomb',25.7283,32.5917,8,['desert'],['couple','solo'],['unesco','pharaonic','tomb','hieroglyph'],
    'Nefertari’s tomb here is generally held to have the finest painting in Egypt. Numbers are capped, the ticket is expensive and the visit is ten minutes. Still worth it.'],
  'LXR-deir-el-medina': ['Deir el-Medina','LXR','ruin',25.7283,32.6017,7,['desert'],['solo'],['pharaonic','tomb','historic','hieroglyph'],
    'The walled village where the men who cut the royal tombs lived, with their own small painted tombs above it. The written record from here is the best source on ordinary ancient life anywhere.'],
  'LXR-nobles-tombs': ['Tombs of the Nobles','LXR','tomb',25.7320,32.6100,7,['desert'],['solo','couple'],['pharaonic','tomb','hieroglyph'],
    'Officials rather than kings, which means scenes of farming, hunting, banqueting and work instead of funerary texts. Brighter, smaller and far less visited than the royal valley.'],
  'LXR-ramesseum': ['The Ramesseum','LXR','temple',25.7281,32.6104,7,['desert'],['solo','couple'],['pharaonic','temple','literary'],
    'Ramesses II’s mortuary temple, half collapsed, with the shattered colossus that Shelley turned into Ozymandias lying across the second court.'],
  'LXR-colossi': ['Colossi of Memnon','LXR','ruin',25.7205,32.6105,6,['desert'],['family'],['pharaonic','historic'],
    'Two eighteen-metre seated figures of Amenhotep III, all that is left of the largest temple ever built in Egypt. One of them sang at dawn for two centuries until a Roman repair stopped it.'],
  'LXR-luxor-museum': ['Luxor Museum','LXR','museum',25.7044,32.6417,7,['urban','water'],['solo','couple'],['museum','pharaonic'],
    'Small, superbly lit and ruthlessly edited, which makes it the best museum in Egypt to actually look at things in. The cache of statues found under Luxor Temple in 1989 is here.'],
  'LXR-west-bank-balloon': ['West Bank balloon flight','LXR','ruin',25.7200,32.6200,7,['desert','water'],['couple','friends'],['pharaonic','crowds'],
    'Up at first light over the mortuary temples and the green strip, with the Valley of the Kings behind. Around forty balloons go up on a good morning, which is part of the spectacle.'],
  'LXR-esna': ['Esna','LXR','temple',25.2934,32.5542,6,['water'],['solo','couple'],['ptolemaic','roman','temple','hieroglyph'],
    'A hypostyle hall nine metres below the modern street, cleaned between 2018 and 2023 to reveal painted ceilings nobody had seen in colour since antiquity. The best recent news in Egyptology.'],
  'LXR-felucca-nile': ['Nile sailing from Luxor','LXR','river',25.6900,32.6300,7,['water'],['couple','friends','family'],['nile','felucca','coastal'],
    'A felucca or a dahabiya under sail between Luxor and Aswan, which is slow, silent and the way everybody travelled for five thousand years. Three nights downstream to Aswan.'],

  /* ===================== MIDDLE EGYPT ===================== */
  'MDE-abydos': ['Abydos','MDE','temple',26.1847,31.9192,8,['desert','rural'],['solo','couple'],['pharaonic','temple','hieroglyph','religious'],
    'Seti I’s temple holds the finest raised relief carving in Egypt and the king list naming seventy-six predecessors, which is a foundation document of the whole chronology.'],
  'MDE-dendera': ['Dendera','MDE','temple',26.1419,32.6700,8,['rural'],['couple','solo'],['ptolemaic','temple','hieroglyph'],
    'A Hathor temple with a ceiling cleaned back to deep blue and gold, a crypt you climb into, and the carved zodiac on the roof chapel, whose original is in the Louvre.'],
  'MDE-amarna': ['Tell el-Amarna','MDE','ruin',27.6456,30.8967,7,['desert','rural'],['solo'],['pharaonic','ruin','historic','tomb'],
    'Akhenaten built a capital here for one god on virgin ground, occupied it for about fifteen years, and it was abandoned and quarried immediately after. The city plan is still readable in the sand.'],
  'MDE-beni-hasan': ['Beni Hasan','MDE','tomb',27.9333,30.8833,6,['desert','rural'],['solo'],['pharaonic','tomb','hieroglyph'],
    'Middle Kingdom tombs cut into a cliff above the river, painted with wrestling sequences, musicians and a caravan of Asiatic traders that is the most-reproduced image of its kind.'],
  'MDE-tuna-el-gebel': ['Tuna el-Gebel','MDE','ruin',27.7667,30.7333,5,['desert'],['solo'],['ptolemaic','tomb','ruin'],
    'Catacombs holding millions of mummified ibises and baboons, plus Petosiris’s tomb-chapel where Greek figures wear Egyptian dress in the same reliefs.'],
  'MDE-red-monastery': ['Red and White Monasteries','MDE','monastery',26.5569,31.6947,6,['desert','rural'],['solo','couple'],['coptic','religious','historic','art'],
    'Fifth-century monastic churches near Sohag, with a conservation project that has brought the Red Monastery’s painted sanctuary back to its original colour. Very few visitors ever come.'],
  'MDE-minya': ['Minya','MDE','city',28.1099,30.7503,5,['water','urban'],['solo'],['nile','historic','coptic'],
    'A provincial city with a corniche of crumbling belle époque villas, used as a base for Beni Hasan, Amarna and Tuna el-Gebel, which are otherwise awkward to reach.'],

  /* ===================== ASWAN & NUBIA ===================== */
  'ASW-abu-simbel': ['Abu Simbel','ASW','temple',22.3372,31.6258,10,['desert'],['family','couple','solo'],['unesco','pharaonic','temple','nubian'],
    'Four twenty-metre Ramesses II figures cut into a cliff, moved sixty-five metres up and two hundred back in the 1960s to escape the reservoir. The sun reaches the sanctuary twice a year.'],
  'ASW-aswan': ['Aswan','ASW','city',24.0889,32.8998,9,['water','desert'],['couple','solo','family'],['nile','nubian','felucca','market','historic'],
    'Where the Nile breaks over granite and Egypt stops being green. Slower, warmer and more Nubian than anywhere north, and the best place in the country to do nothing for two days.'],
  'ASW-philae': ['Philae','ASW','temple',24.0131,32.8844,9,['water'],['couple','family'],['unesco','ptolemaic','temple','island','nile'],
    'An Isis temple moved stone by stone to a neighbouring island after the dam flooded the original. The last hieroglyphic inscription anywhere was carved here in AD 394.'],
  'ASW-nubian-village': ['Nubian villages, Gharb Soheil','ASW','village',24.0550,32.8700,7,['water','desert'],['family','couple'],['nubian','nile','food','historic'],
    'Houses painted in flat saturated colour with domed roofs, on the west bank opposite Aswan, where the language is Nobiin rather than Arabic and the food is different.'],
  'ASW-elephantine': ['Elephantine Island','ASW','island',24.0858,32.8869,7,['water'],['solo','couple'],['nile','island','pharaonic','ruin'],
    'Continuously inhabited for five thousand years, with a ruined town, a nilometer cut into the rock at the water’s edge, and two Nubian villages at the north end.'],
  'ASW-kom-ombo': ['Kom Ombo','ASW','temple',24.4521,32.9283,7,['water'],['family','couple'],['ptolemaic','temple','nile','hieroglyph'],
    'A double temple, perfectly symmetrical, shared between a crocodile god and a falcon god. A relief here shows what is usually read as a set of surgical instruments.'],
  'ASW-edfu': ['Edfu','ASW','temple',24.9779,32.8739,8,['water'],['family','couple'],['ptolemaic','temple','hieroglyph'],
    'The most completely preserved temple in Egypt, buried in sand until the 1860s, with its roof on, its pylon standing and the full founding ritual carved on the walls.'],
  'ASW-high-dam': ['Aswan High Dam','ASW','dam',23.9707,32.8772,6,['water','desert'],['family','solo'],['modern','historic','nile'],
    'Finished in 1970, it ended the annual flood, created a five-hundred-kilometre reservoir, displaced a hundred thousand Nubians and now supplies a tenth of Egypt’s electricity.'],
  'ASW-unfinished-obelisk': ['Unfinished Obelisk','ASW','quarry',24.0767,32.8956,6,['desert'],['solo','family'],['pharaonic','quarry','historic'],
    'Forty-two metres of granite still attached to the bedrock, abandoned when it cracked. The tool marks show exactly how obelisks were cut, which no finished one can.'],
  'ASW-st-simeon': ['Monastery of St Simeon','ASW','monastery',24.0906,32.8706,6,['desert'],['solo','couple'],['coptic','historic','desert'],
    'A seventh-century fortified monastery in the sand on the west bank, abandoned in 1173 and still substantially standing. Reached by boat and then a short walk or a camel.'],
  'ASW-kitcheners-island': ['Kitchener’s Island','ASW','island',24.0906,32.8842,5,['water'],['couple','family'],['nile','island','birding'],
    'A botanical garden on a small island given to Lord Kitchener, who filled it with plants from across Asia and Africa. The best half hour in Aswan and reached only by felucca.'],
  'ASW-lake-nasser': ['Lake Nasser','ASW','lake',23.0000,32.9000,6,['water','desert'],['solo','couple'],['nile','birding','wildlife','darksky'],
    'Five hundred and fifty kilometres of reservoir behind the dam, with rescued temples along the shore, Nile perch the size of a person and no settlements for most of its length.'],

  /* ===================== FAYOUM ===================== */
  'FAY-wadi-el-hitan': ['Wadi El Hitan','FAY','desert',29.2667,30.0333,8,['desert'],['solo','family'],['unesco','fossil','desert','darksky'],
    'Skeletons of forty-million-year-old whales with legs, lying where they died on an ancient seabed, which is the clearest fossil evidence anywhere of whales moving from land to sea.'],
  'FAY-lake-qarun': ['Lake Qarun','FAY','lake',29.4667,30.6500,6,['water','desert'],['family','couple'],['birding','wildlife','coastal'],
    'A salt lake forty-five metres below sea level, left over from a far larger prehistoric one, now a stopover for migrating flamingos, spoonbills and ducks.'],
  'FAY-tunis-village': ['Tunis village','FAY','village',29.4167,30.5833,6,['rural','desert'],['couple','family'],['food','market','rural'],
    'A pottery village above the lake started by a Swiss potter in the 1960s, now with about thirty working studios and the most pleasant place to stay in the Fayoum.'],
  'FAY-fayoum-city': ['Fayoum','FAY','city',29.3084,30.8428,5,['urban','rural'],['solo'],['historic','market','nile'],
    'Four wooden waterwheels turning in the middle of the town, driven by the Bahr Yussef channel that has fed this depression since the Middle Kingdom.'],
  'FAY-meidum': ['Meidum','FAY','pyramid',29.3881,31.1569,5,['desert'],['solo'],['pharaonic','pyramid','ruin'],
    'A pyramid whose outer casing collapsed into a mound around the core, leaving a three-stepped tower in a pile of rubble. Whether it fell during construction is still argued.'],

  /* ===================== RED SEA ===================== */
  'RSE-marsa-alam': ['Marsa Alam','RSE','coast',25.0676,34.8900,8,['water','desert'],['couple','friends','solo'],['diving','reef','snorkel','beach','wildlife'],
    'The southern Red Sea, where the reefs were protected by distance until the airport opened in 2003. Dugongs in the seagrass at Marsa Mubarak and resident dolphins at Samadai.'],
  'RSE-hurghada': ['Hurghada','RSE','city',27.2579,33.8116,7,['water','desert'],['family','friends'],['diving','reef','beach','coastal','wreck'],
    'A fishing village in 1980 and now the main Red Sea resort city, which is not its appeal. The appeal is that every serious wreck and reef in the northern Red Sea is reachable from the marina.'],
  'RSE-giftun': ['Giftun Islands','RSE','island',27.1833,33.9167,7,['water'],['family','couple','friends'],['snorkel','reef','island','beach'],
    'A protected island group off Hurghada with Orange Bay on the sheltered side. Daily visitor numbers are capped and the reef just offshore is the reason to go rather than the sand.'],
  'RSE-el-gouna': ['El Gouna','RSE','town',27.3959,33.6778,6,['water','desert'],['couple','family'],['beach','coastal','modern','diving'],
    'A privately built town of lagoons and islands begun in 1989, with its own hospital, airport and rules. Artificial in every sense and very well run.'],
  'RSE-safaga': ['Safaga','RSE','coast',26.7333,33.9333,6,['water','desert'],['friends','solo'],['diving','wreck','reef','coastal'],
    'The port for the Salem Express wreck, which sank in 1991 with heavy loss of life and is dived as a war grave with corresponding rules. Also the best kitesurfing on the coast.'],
  'RSE-el-quseir': ['El Quseir','RSE','town',26.1000,34.2833,6,['water','desert'],['couple','solo'],['historic','coastal','diving','islamic'],
    'The oldest port on the Egyptian Red Sea, used for the Punt expeditions and later for the hajj, with an Ottoman fort and a main street that has escaped development entirely.'],
  'RSE-wadi-el-gemal': ['Wadi El Gemal','RSE','desert',24.6667,35.0833,6,['desert','water'],['solo','couple'],['desert','wildlife','bedouin','reef','darksky'],
    'Seven thousand square kilometres of protected desert and coast south of Marsa Alam, with Ababda communities, emerald mines the Romans worked, and mangrove on the shore.'],

  /* ===================== SINAI ===================== */
  'SSI-st-catherine': ['St Catherine’s Monastery','SSI','monastery',28.5559,33.9756,9,['mountain','desert'],['solo','couple','family'],['unesco','coptic','religious','historic','hiking'],
    'Built by Justinian around 550 and never destroyed, which makes it the oldest continuously functioning monastery on earth. The icon collection survived iconoclasm because it was too remote.'],
  'SSI-mount-sinai': ['Mount Sinai','SSI','mountain',28.5392,33.9750,8,['mountain','desert'],['friends','solo','couple'],['hiking','religious','darksky','bedouin'],
    'Two thousand two hundred and eighty-five metres, climbed overnight by most people to be at the top for sunrise. The camel path is gradual; the three thousand Steps of Repentance are not.'],
  'SSI-ras-mohammed': ['Ras Mohammed','SSI','reef',27.7333,34.2500,9,['water','desert'],['friends','couple','solo'],['diving','reef','snorkel','wildlife','park'],
    'Egypt’s first national park, at the tip of the peninsula where two gulfs meet, with walls dropping eight hundred metres and the best reef diving in the northern Red Sea.'],
  'SSI-dahab': ['Dahab','SSI','town',28.5091,34.5136,8,['water','desert'],['friends','solo','couple'],['diving','snorkel','beach','bedouin','food'],
    'A Bedouin fishing village that became a backpacker town and never quite grew out of it. Shore diving straight off the promenade and the cheapest serious dive training in the world.'],
  'SSI-blue-hole': ['Blue Hole','SSI','reef',28.5722,34.5372,8,['water'],['friends','solo'],['diving','snorkel','reef'],
    'A hundred-metre sinkhole in the reef with an arch at fifty-six metres that has killed a lot of divers who should not have attempted it. Snorkelling the rim is superb and completely safe.'],
  'SSI-sharm': ['Sharm el-Sheikh','SSI','city',27.9158,34.3300,7,['water','desert'],['family','friends','couple'],['diving','reef','beach','coastal','nightlife'],
    'The purpose-built resort city at the southern tip, and the launching point for Ras Mohammed, the Tiran reefs and the Thistlegorm. Naama Bay is the old centre.'],
  'SSI-tiran': ['Strait of Tiran','SSI','reef',27.9333,34.5667,7,['water'],['friends','couple'],['diving','reef','wreck','snorkel'],
    'Four reefs named after the nineteenth-century cartographers who charted them, in a strait with strong current, sharks and at least one ship still aground on Gordon Reef.'],
  'SSI-coloured-canyon': ['Coloured Canyon','SSI','canyon',29.2000,34.6500,6,['desert','canyon'],['family','friends'],['hiking','desert','bedouin'],
    'A narrow sandstone slot near Nuweiba with iron and manganese staining the walls in bands. About eight hundred metres of easy walking, usually done from Dahab with a Bedouin guide.'],
  'SSI-nuweiba': ['Nuweiba','SSI','coast',29.0333,34.6667,5,['water','desert'],['solo','couple'],['beach','bedouin','coastal','snorkel'],
    'Palm huts on a shore facing Saudi Arabia, with mountains behind and almost nothing happening. The ferry to Jordan leaves from here for anyone continuing to Petra.'],
  'SSI-taba': ['Taba & Pharaoh’s Island','SSI','coast',29.4906,34.8947,5,['water','desert'],['family','couple'],['coastal','historic','beach','snorkel'],
    'The Israeli border crossing, with a twelfth-century Crusader and then Saladin fortress on an island three hundred metres offshore that you reach by boat.'],

  /* ===================== WESTERN DESERT ===================== */
  'WDS-siwa': ['Siwa Oasis','WDS','oasis',29.2032,25.5195,9,['desert'],['couple','solo','friends'],['oasis','historic','darksky','bedouin','food'],
    'Fifty kilometres from Libya, with its own Berber language, a mud-brick fortress town melting in the rain, salt lakes you float in, and the oracle Alexander came to consult.'],
  'WDS-white-desert': ['White Desert','WDS','desert',27.1500,28.1667,9,['desert'],['friends','couple','solo'],['desert','darksky','unesco','bedouin','hiking'],
    'Chalk eroded by sand into mushrooms, towers and animal shapes across a white plain. Camping here is the point: the rock goes orange at sunset and the sky is as dark as anywhere on earth.'],
  'WDS-black-desert': ['Black Desert','WDS','desert',28.1667,28.8333,6,['desert'],['friends','solo'],['desert','darksky'],
    'Volcanic cones scattered across orange sand with their tops broken down into black dolerite gravel, which is a completely different landscape forty kilometres from the white one.'],
  'WDS-bahariya': ['Bahariya Oasis','WDS','oasis',28.3500,28.8667,7,['desert'],['friends','family'],['oasis','desert','pharaonic','tomb'],
    'The closest oasis to Cairo and the staging point for the White Desert, with hot springs, date gardens and a cemetery of gilded Greco-Roman mummies found by accident in 1996.'],
  'WDS-farafra': ['Farafra Oasis','WDS','oasis',27.0583,27.9708,5,['desert'],['solo','couple'],['oasis','desert','darksky'],
    'The smallest and most isolated of the oases, a few thousand people, a hot spring and an idiosyncratic local art museum. The White Desert begins just north of it.'],
  'WDS-dakhla': ['Dakhla Oasis','WDS','oasis',25.5000,29.0000,7,['desert'],['couple','solo'],['oasis','historic','islamic','desert'],
    'Fourteen villages along an escarpment, including Al-Qasr, an Ottoman mud-brick town with roofed lanes, carved acacia lintels and a working pottery.'],
  'WDS-kharga': ['Kharga Oasis','WDS','oasis',25.4514,30.5467,5,['desert'],['solo'],['oasis','historic','coptic','ruin'],
    'The largest and most modernised oasis, with a Persian-period temple at Hibis and a Christian necropolis of mud-brick chapels at Bagawat painted with Old Testament scenes.'],
  'WDS-crystal-mountain': ['Crystal Mountain','WDS','desert',27.4500,28.0500,5,['desert'],['friends','family'],['desert','fossil'],
    'A ridge of calcite crystal with a natural arch through it, on the road between Bahariya and Farafra. Small, strange and worth the ten-minute stop.'],
  'WDS-gilf-kebir': ['Gilf Kebir','WDS','desert',23.5000,26.0000,6,['desert'],['solo','friends'],['desert','darksky','prehistory','historic'],
    'A plateau the size of Switzerland on the Libyan border, with the Cave of Swimmers painted around eight thousand years ago. Reached only on a fully equipped expedition with permits.'],

  /* ===================== NILE DELTA ===================== */
  'DLT-wadi-natrun': ['Wadi El Natrun','DLT','monastery',30.4000,30.3500,7,['desert'],['solo','couple'],['coptic','religious','historic','desert'],
    'Four working monasteries in a salt depression where Christian monasticism effectively began in the fourth century. Deir el-Suryani has frescoes and a door of ebony and ivory from 914.'],
  'DLT-rosetta': ['Rosetta','DLT','town',31.3990,30.4167,6,['water'],['solo','family'],['historic','islamic','nile'],
    'Where a French officer found the stone in 1799 that let Champollion read hieroglyphs. The town itself has about twenty Ottoman merchant houses in black and red brick.'],
  'DLT-tanis': ['Tanis','DLT','ruin',30.9756,31.8800,5,['rural'],['solo'],['pharaonic','ruin','tomb'],
    'A field of fallen obelisks and broken colossi in the eastern Delta, where intact royal tombs with silver coffins were found in 1939 and almost nobody noticed because of the war.'],
  'DLT-tanta': ['Tanta','DLT','town',30.7865,31.0004,5,['rural','urban'],['solo'],['sufi','religious','market'],
    'The moulid of Sayyid al-Badawi in October draws something like two million people for a week of processions, drumming and all-night zikr, and is the largest Sufi festival in Egypt.'],

  /* ===================== SUEZ CANAL ===================== */
  'SUZ-port-said': ['Port Said','SUZ','city',31.2653,32.3019,5,['urban','water'],['solo','family'],['historic','coastal','modern','architecture'],
    'Built in 1859 for the canal, with wooden colonial buildings on multi-storey verandas and a free ferry across to Asia that takes about four minutes.'],
  'SUZ-ismailia': ['Ismailia','SUZ','city',30.5965,32.2715,5,['urban','water'],['solo','couple'],['historic','modern','architecture'],
    'The canal company’s own town, laid out with gardens and villas including de Lesseps’s house, on a lake halfway along the waterway where ships wait for the convoy.']

};

/* ---------- ids, sorted by prominence then name ---------- */
const EG_PLACE_IDS = Object.keys(EG_PLACES).sort((a, b) => {
  const d = (EG_PLACES[b][5] || 0) - (EG_PLACES[a][5] || 0);
  return d !== 0 ? d : EG_PLACES[a][0].localeCompare(EG_PLACES[b][0]);
});

function egPlaceGet(id){
  const p = EG_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'EG' } : null;
}

function egRegionName(code){ return (EG_REGIONS[code] || [])[0] || code; }
function egKindLabel(k){ return EG_KIND[k] || k; }

/* Places in one region, best known first. */
function egRegionPlaces(code){
  return EG_PLACE_IDS.filter(id => EG_PLACES[id][1] === code)
    .sort((a, b) => (EG_PLACES[b][5] || 0) - (EG_PLACES[a][5] || 0));
}

/* ---------- geography helpers ----------

   Egypt has two seas that behave completely differently. The
   Mediterranean coast is cool, humid and gets actual winter rain;
   the Red Sea is warm all year, has no tide worth the name and is
   where every reef is. The panel needs to tell them apart. */

const EG_RED_SEA = { RSE:1, SSI:1 };
const EG_MED     = { ALX:1, MTR:1, SUZ:1 };

function egSeaOf(p){
  if (!p) return 'the sea';
  if (EG_RED_SEA[p.abbr]) return 'the Red Sea';
  if (p.abbr === 'SUZ')   return 'the Mediterranean';
  return 'the Mediterranean';
}

function egMaybeCoastal(p){
  if (!p) return false;
  const f = p.flags || [];
  if (f.indexOf('coastal') !== -1 || f.indexOf('beach') !== -1
      || f.indexOf('diving') !== -1 || f.indexOf('snorkel') !== -1
      || f.indexOf('reef') !== -1) return true;
  if (!EG_RED_SEA[p.abbr] && !EG_MED[p.abbr]) return false;
  return ['desert','mountain','oasis','monastery','canyon'].indexOf(p.kind) === -1;
}

/* The Nile valley proper: where the river, not the sea, sets the
   weather and the geography. */
const EG_NILE = { CAI:1, GIZ:1, LXR:1, ASW:1, MDE:1, FAY:1, DLT:1 };
function egIsNileValley(p){ return !!(p && EG_NILE[p.abbr]); }

/* Where the heat genuinely becomes a planning problem rather than
   a complaint. Upper Egypt and the deep desert run ten degrees
   hotter than the Delta through the summer. */
const EG_FURNACE = { LXR:1, ASW:1, WDS:1, MDE:1 };
function egIsFurnace(p){ return !!(p && EG_FURNACE[p.abbr]); }

/* The khamsin blows out of the Sahara between roughly March and
   May, lifting dust and pushing temperatures up twenty degrees in
   a few hours. The whole country gets it; the desert gets it worst. */
function egIsDustProne(p){
  if (!p) return false;
  return ['WDS','FAY','MDE','ASW','LXR','GIZ','CAI','MTR','DLT','ALX'].indexOf(p.abbr) !== -1;
}

/* Open sites with no shade, where the hour you arrive is the single
   biggest decision of the day. */
function egIsOpenSite(p){
  if (!p) return false;
  return ['temple','tomb','pyramid','ruin','desert','dunes','quarry','canyon'].indexOf(p.kind) !== -1;
}

/* Altitude only matters in Sinai, where St Catherine sits at about
   1,600 metres and gets snow some winters. */
function egIsHighAltitude(p){
  if (!p) return false;
  if (p.abbr !== 'SSI') return false;
  return ['mountain','monastery'].indexOf(p.kind) !== -1;
}
