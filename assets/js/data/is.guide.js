/* ===========================================================
   ICELAND: the written guides

   One entry per place:

     id -> { intro: [paragraphs], see: [{n, t?, d}], when, stay, move, eat }

   This file is NOT loaded by index.html. core/lazy.js fetches it
   the first time somebody opens a Icelandic place page, because at
   this size it has no business sitting on the critical path of a
   visitor who only ever looks at Utah.

   On the writing. These read like something a person wrote after
   going there: a concrete fact early, an opinion where one is
   warranted, and the practical thing you would actually want to
   know. Deliberately avoided: em dashes, "nestled", "boasts",
   "hidden gem", "must-visit", and the construction where every
   sentence is balanced against its own opposite.

   Icelandic names keep their own letters. Þ and ð are not
   decorative and the places are not called Thingvellir or
   Jokulsarlon on any sign in the country, so they are spelled
   properly here; core/photos.js generates an ASCII fallback so a
   reader who types it the other way still finds the picture.
   =========================================================== */

/* Wikipedia article titles where they differ from the name this
   atlas uses. Without these the photo lookup misses. */
const IS_WIKI = {
  'EST-borgarfjorour-eystri': 'Borgarfjörður eystri',
  'EST-djupivogur': 'Djúpivogur',
  'EST-egilsstaoir': 'Egilsstaðir',
  'EST-hengifoss': 'Hengifoss',
  'EST-mjoifjorour': 'Mjóifjörður',
  'EST-petra-stone': 'Stöðvarfjörður',
  'EST-seydisfjorour': 'Seyðisfjörður',
  'EST-skalanes': 'Seyðisfjarðarhreppur',
  'EST-stuolagil': 'Jökuldalur',
  'EST-vatnajokull-east': 'Snæfell (Iceland)',
  'EST-vok-baths': 'Lagarfljót',
  'HLD-aldeyjarfoss': 'Aldeyjarfoss',
  'HLD-askja': 'Askja',
  'HLD-hveravellir': 'Hveravellir',
  'HLD-kerlingarfjoll': 'Kerlingarfjöll',
  'HLD-kverkfjoll': 'Kverkfjöll',
  'HLD-landmannalaugar': 'Landmannalaugar',
  'HLD-langisjor': 'Langisjór',
  'HLD-laugavegur': 'Laugavegur (hiking trail)',
  'HLD-thorsmork': 'Þórsmörk',
  'NEI-akureyri': 'Akureyri',
  'NEI-asbyrgi': 'Ásbyrgi',
  'NEI-dettifoss': 'Dettifoss',
  'NEI-dimmuborgir': 'Dimmuborgir',
  'NEI-godafoss': 'Goðafoss',
  'NEI-grjotagja': 'Grjótagjá',
  'NEI-husavik': 'Húsavík',
  'NEI-hverir': 'Námafjall',
  'NEI-krafla': 'Krafla',
  'NEI-myvatn': 'Mývatn',
  'NEI-myvatn-nature-baths': 'Reykjahlíð',
  'NEI-siglufjorour': 'Siglufjörður',
  'NEI-vatnsnes-whales': 'Dalvík',
  'NWI-blonduos': 'Blönduós',
  'NWI-drangey': 'Drangey',
  'NWI-glaumbaer': 'Glaumbær',
  'NWI-hofsos': 'Hofsós',
  'NWI-hvitserkur': 'Hvítserkur',
  'NWI-kalfshamarsvik': 'Skagi',
  'NWI-kolugljufur': 'Víðidalur',
  'NWI-saudarkrokur': 'Sauðárkrókur',
  'RNS-blue-lagoon': 'Blue Lagoon (geothermal spa)',
  'RNS-bridge-continents': 'Reykjanes',
  'RNS-brimketill': 'Grindavík',
  'RNS-garour': 'Garður',
  'RNS-gunnuhver': 'Gunnuhver',
  'RNS-kleifarvatn': 'Kleifarvatn',
  'RNS-krysuvik': 'Krýsuvík',
  'RNS-reykjanes-eruptions': 'Fagradalsfjall',
  'RNS-reykjanesviti': 'Reykjanesviti',
  'RVK-grotta': 'Grótta',
  'RVK-hallgrimskirkja': 'Hallgrímskirkja',
  'RVK-harpa': 'Harpa (concert hall)',
  'RVK-laugardalslaug': 'Laugardalslaug',
  'RVK-national-museum': 'National Museum of Iceland',
  'RVK-perlan': 'Perlan',
  'RVK-reykjavik': 'Reykjavík',
  'RVK-sky-lagoon': 'Kópavogur',
  'RVK-videy': 'Viðey',
  'SUL-diamond-beach': 'Breiðamerkursandur',
  'SUL-dyrholaey': 'Dyrhólaey',
  'SUL-fjaorargljufur': 'Fjaðrárgljúfur',
  'SUL-geysir': 'Geysir',
  'SUL-gullfoss': 'Gullfoss',
  'SUL-hveragerdi': 'Hveragerði',
  'SUL-jokulsarlon': 'Jökulsárlón',
  'SUL-kerio': 'Kerið',
  'SUL-reykjadalur': 'Reykjadalur',
  'SUL-reynisfjara': 'Reynisfjara',
  'SUL-secret-lagoon': 'Flúðir',
  'SUL-seljalandsfoss': 'Seljalandsfoss',
  'SUL-skaftafell': 'Skaftafell',
  'SUL-skogafoss': 'Skógafoss',
  'SUL-solheimajokull': 'Sólheimajökull',
  'SUL-thingvellir': 'Þingvellir',
  'SUL-vestmannaeyjar': 'Vestmannaeyjar',
  'SUL-vik': 'Vík í Mýrdal',
  'VFJ-drangsnes': 'Drangsnes',
  'VFJ-dynjandi': 'Dynjandi',
  'VFJ-hellulaug': 'Vatnsfjörður',
  'VFJ-hornstrandir': 'Hornstrandir',
  'VFJ-isafjorour': 'Ísafjörður',
  'VFJ-krossneslaug': 'Norðurfjörður',
  'VFJ-latrabjarg': 'Látrabjarg',
  'VFJ-patreksfjorour': 'Patreksfjörður',
  'VFJ-raudasandur': 'Rauðasandur',
  'VFJ-sudavik-arctic-fox': 'Súðavík',
  'VFJ-vigur': 'Vigur',
  'VSL-arnarstapi': 'Arnarstapi',
  'VSL-borgarnes': 'Borgarnes',
  'VSL-deildartunguhver': 'Deildartunguhver',
  'VSL-djupalonssandur': 'Djúpalónssandur',
  'VSL-eldborg': 'Eldborg',
  'VSL-hraunfossar': 'Hraunfossar',
  'VSL-kirkjufell': 'Kirkjufell',
  'VSL-krauma': 'Reykholt, Western Iceland',
  'VSL-snaefellsnes': 'Snæfellsnes',
  'VSL-stykkisholmur': 'Stykkishólmur',
  'VSL-vidgelmir': 'Víðgelmir'
};

const IS_GUIDE = {
'RVK-reykjavik': {
  intro: [
    'Ingólfur Arnarson is said to have settled here around 874 after throwing his high-seat pillars overboard and building where they washed up, which is the founding story and which the excavated longhouse under a hotel on Aðalstræti broadly supports. For most of the next thousand years it was a farm and then a village; it had about three hundred people in 1800.',
    'It has around a hundred and forty thousand now, with two thirds of Iceland in the surrounding area, and it is the northernmost capital of a sovereign state. The corrugated iron houses in the old centre are the local vernacular: timber frames clad in imported iron sheet and painted in strong colours, which is what you do when there is no building stone and no trees.',
    'The thing that structures daily life is the pools. Every neighbourhood has a geothermally heated outdoor swimming pool open year round, and they are where people meet, argue and conduct a surprising amount of civic business. Going to one is the single most useful thing a visitor can do here.'
  ],
  see: [
    { n: 'A neighbourhood pool',
      d: 'Vesturbæjarlaug or Sundhöllin rather than the big tourist lagoons. Shower naked and thoroughly before entering; this is enforced and is not negotiable.' },
    { n: 'Hallgrímskirkja',
      d: 'The concrete church on the hill, with a lift up the tower for the only overview of the city.' },
    { n: 'The National Museum',
      d: 'Settlement to the present in one coherent building. Go before the ring road and the rest of the country makes more sense.' },
    { n: 'Harpa',
      d: 'Ólafur Elíasson’s glass shell on the harbour, free to walk into, with the panels changing colour through the day.' },
    { n: 'The Settlement Exhibition',
      d: 'A tenth-century longhouse wall excavated in situ under a building on Aðalstræti, with the turf construction visible.' },
    { n: 'Laugavegur on a Friday night',
      d: 'The rúntur, when the bars fill very late and empty around five. Icelanders start drinking at home because of the prices and arrive after midnight.' }
  ],
  when: 'June to August for light and warmth, September to March for the aurora and lower prices. December is four hours of daylight and heavily decorated.',
  stay: 'Three nights, more as a base.',
  move: 'Keflavík airport is forty-five minutes by bus. The city is walkable; the bus system covers the rest and there is no train anywhere in Iceland.',
  eat: 'Lamb, cod, langoustine, and skyr, which is a strained dairy product closer to cheese than yoghurt. The hot dog stand Bæjarins Beztu has been going since 1937 and the queue is justified.'
},

'RVK-hallgrimskirkja': {
  intro: [
    'Guðjón Samúelsson was Iceland’s state architect and he spent his career trying to invent a national architectural language from the country’s own geology. Hallgrímskirkja is the result: the facade steps up in columns that are a direct quotation of columnar basalt, which forms when lava cools slowly and cracks into hexagons.',
    'It was designed in 1937, begun in 1945 and finished in 1986, by which time Samúelsson had been dead for thirty-six years. The tower is seventy-four and a half metres and it was for a long time the tallest building in Iceland.',
    'The interior is almost bare: white concrete, clear glass, and an organ of five thousand two hundred and seventy-five pipes installed in 1992 that is fifteen metres high and weighs twenty-five tonnes. The lunchtime organ recitals in summer are the best use of the building.'
  ],
  see: [
    { n: 'The tower',
      d: 'A lift most of the way and then stairs. Reykjavík laid out in coloured roofs with the bay and Esja behind. Small ticket, often a queue in summer.' },
    { n: 'The basalt facade',
      d: 'Worth standing back for, from Skólavörðustígur, which is the street that runs straight at it and is painted in rainbow colours.' },
    { n: 'The organ recitals',
      d: 'Several times a week in summer at lunchtime, and Sunday evenings. The acoustic in a bare concrete box is enormous.' },
    { n: 'The Leif Erikson statue',
      d: 'In front, given by the United States in 1930 for the thousandth anniversary of the Alþingi, which predates the church by decades.' },
    { n: 'The interior',
      d: 'Deliberately plain, which divides opinion. Icelandic Lutheranism does not go in for decoration.' },
    { n: 'Skólavörðustígur',
      d: 'The approach street, with the rainbow painted on the road, galleries and the best shopping in the city.' }
  ],
  when: 'Year round. The tower closes in high wind and during services.',
  stay: 'Forty-five minutes.',
  move: 'On the hill above the centre, a ten-minute walk from Laugavegur.',
  eat: 'Cafes on Skólavörðustígur below. Braud and Co, a bakery on the corner, does cinnamon rolls people queue for.'
},

'RVK-harpa': {
  intro: [
    'Harpa was begun in 2007 as part of a development that was going to include a hotel, a bank headquarters and luxury flats. In October 2008 the Icelandic banking system collapsed entirely, the developer went under, and the half-built concrete frame stood on the harbour as the most visible monument to the crash.',
    'The government decided to finish it, which was a contested decision when the country was in severe difficulty. It opened in 2011 and is now broadly agreed to have been the right call: it won the Mies van der Rohe award in 2013 and it put the waterfront back into use.',
    'The facade is by Ólafur Elíasson, built from around a thousand quasi-brick steel and glass modules based on a twelve-sided space-filling geometry, which catch and refract light differently depending on where you stand and what the weather is doing. The building is free to walk into.'
  ],
  see: [
    { n: 'The facade from inside',
      d: 'Walk the upper levels at different times of day. The glass is coloured and dichroic and the whole wall changes as the light does.' },
    { n: 'A concert',
      d: 'The Iceland Symphony is resident and tickets are considerably cheaper than equivalent halls elsewhere. The main hall, Eldborg, is red and excellent.' },
    { n: 'The crash context',
      d: 'Worth knowing. The building is a permanent argument about what a small country does with public money after a financial disaster.' },
    { n: 'The harbour walk',
      d: 'From Harpa east to the Sun Voyager sculpture and on along the shore towards Grótta.' },
    { n: 'Free entry',
      d: 'The building is open to walk around with no ticket, including most of the upper foyers.' },
    { n: 'The view across',
      d: 'Esja, the flat-topped mountain across the bay, which Reykjavík uses as a weather gauge and a hiking hill.' }
  ],
  when: 'Year round. Evenings for the lit facade in winter.',
  stay: 'An hour, or an evening for a concert.',
  move: 'On the old harbour, a five-minute walk from the centre.',
  eat: 'A restaurant and cafe inside. The old harbour nearby has fish restaurants and a very good seafood soup place.'
},

'RVK-national-museum': {
  intro: [
    'The National Museum covers twelve hundred years in one permanent exhibition called Making of a Nation, running from the settlement to the present, and it is unusually well edited: around two thousand objects chosen from a much larger collection and arranged as an argument rather than a catalogue.',
    'The centrepiece is the Valþjófsstaður door, a carved pine church door from about 1200 with two roundels showing a knight killing a dragon and rescuing a lion, which then follows him and dies on his grave. It is the finest piece of Romanesque carving in Iceland and the story is from a continental romance, which tells you how connected the island was.',
    'What the museum does best is explain how nine hundred years of poverty actually worked: turf houses, the farm as the unit of society, the collapse of the forests within a century of settlement, and the point at which it stopped. That context makes the rest of the country legible.'
  ],
  see: [
    { n: 'The Valþjófsstaður door',
      d: 'Around 1200, carved pine, with a knight and a lion. Small and the best object in the country.' },
    { n: 'The Þórsmörk figure',
      d: 'A small bronze from about 1000 that is either Thor holding his hammer or Christ holding a cross, which is a genuinely open question and a perfect object for the moment of conversion.' },
    { n: 'The turf house section',
      d: 'How people lived: the baðstofa, the shared sleeping and working room over the byre, heated by the animals below.' },
    { n: 'The silver hoards',
      d: 'Viking-age caches of coin and hacksilver from across Europe and the Islamic world, which show the trade network.' },
    { n: 'The twentieth century',
      d: 'From turf to independence in 1944 to the banking crash in two generations, which is a faster transformation than almost any other European country.' },
    { n: 'The Culture House',
      d: 'A separate building holding manuscripts and art, included on a joint ticket.' }
  ],
  when: 'Year round. Closed Mondays from mid-September to end April.',
  stay: 'Two to three hours.',
  move: 'Beside the university, fifteen minutes on foot from the centre.',
  eat: 'A cafe on site. The university area has cheap student food.'
},

'RVK-sky-lagoon': {
  intro: [
    'Sky Lagoon opened in 2021 at Kársnes in Kópavogur, on a rocky shore facing west across Faxaflói bay. The pool has an infinity edge along the seaward side, so the geothermal water appears to run straight into the North Atlantic, with the Snæfellsnes peninsula on the horizon on a clear day.',
    'What distinguishes it from the Blue Lagoon is the ritual, a seven-step sequence: the warm lagoon, a cold plunge at about five degrees, a sauna with a window onto the sea, a cold mist, a scrub of salt and oil, a steam room, and a shower. You do it in order and it takes about an hour.',
    'The turf-walled structures around the pool are a deliberate reference to Icelandic building and are more convincing than that usually implies. It is substantially closer to Reykjavík than the Blue Lagoon and it is less of an expedition.'
  ],
  see: [
    { n: 'The ritual',
      d: 'Seven steps in order. The cold plunge is the part people skip and it is the part that makes the rest work.' },
    { n: 'The infinity edge at sunset',
      d: 'West-facing, so in summer the midnight sun sits on the horizon and in winter the sunset is in the middle of the afternoon.' },
    { n: 'The sauna window',
      d: 'A single large pane looking straight out to sea, which is the best thing in the building.' },
    { n: 'The aurora',
      d: 'On a clear winter night with good Kp this works, though the lagoon has its own lighting and a dark site is better.' },
    { n: 'Booking',
      d: 'Timed entry, booked online. Evening slots are quieter than afternoon.' },
    { n: 'Versus the Blue Lagoon',
      d: 'Closer, cheaper, smaller, less famous, and the setting is arguably better. The Blue Lagoon has the milky silica water; this does not.' }
  ],
  when: 'Year round. Winter evenings for the dark and the possibility of aurora.',
  stay: 'Two to three hours.',
  move: 'Fifteen minutes from central Reykjavík by car or shuttle.',
  eat: 'A cafe and a bar in the lagoon, where you can drink in the water.'
},

'RVK-laugardalslaug': {
  intro: [
    'The pools are the centre of Icelandic social life and Laugardalslaug is the largest: a fifty-metre outdoor pool heated to twenty-nine degrees, an indoor pool, seven hot tubs at temperatures from thirty-eight to forty-four, a steam room, a cold tub and a long water slide.',
    'The name means the hot spring valley pool, and the valley is where Reykjavík’s women did their washing in the hot springs until the twentieth century, walking out from the town with bundles of laundry. That is also where the street name Laugavegur comes from: it means the washing road.',
    'The rules are strict and they are the thing visitors get wrong. You shower naked with soap, thoroughly, in a communal area, before putting on a swimsuit and going out. There are attendants and diagrams. Icelanders use very little chlorine precisely because of this and are not flexible about it.'
  ],
  see: [
    { n: 'The hot tubs',
      d: 'Seven of them at stepped temperatures. The forty-four degree one is where the serious conversation happens and where you should not stay long.' },
    { n: 'Swimming outdoors in winter',
      d: 'Fifty metres of heated water in falling snow, with steam coming off it. The reason to do this at all.' },
    { n: 'The cold tub',
      d: 'Around four degrees, beside the hot ones, used in rotation. Not optional if you want the full effect.' },
    { n: 'The shower rules',
      d: 'Naked, with soap, in the marked areas, before entering. This is the single most common way for visitors to cause offence.' },
    { n: 'Early morning',
      d: 'Opens at six thirty on weekdays and is full of people before work, which is the pool at its most Icelandic.' },
    { n: 'The other pools',
      d: 'Vesturbæjarlaug and Sundhöllin are smaller and more local. Sundhöllin is a 1937 Guðjón Samúelsson building with an added outdoor section.' }
  ],
  when: 'Year round, and winter is better than summer. Open from early morning until late evening.',
  stay: 'Two hours.',
  move: 'In Laugardalur, twenty-five minutes on foot or a short bus ride from the centre.',
  eat: 'Nothing on site. There is a cafe at the adjacent botanic garden.'
},

'RVK-grotta': {
  intro: [
    'Grótta is a lighthouse on a small island at the western tip of the Seltjarnarnes peninsula, twenty minutes from the centre of Reykjavík, connected to the shore by a causeway that floods at high tide. People get stranded on it regularly and the tide table is posted at the start.',
    'It is the closest genuinely dark site to the city. The peninsula points away from the urban glow and faces north across the bay, which is the direction the aurora appears, and there is a small geothermal foot bath, Kvika, set into the rocks where you can sit with your feet in warm water and watch.',
    'It is also a bird reserve and closed entirely from 1 May to 30 June for the Arctic tern nesting season, which is strictly enforced. Terns nest on the ground and will attack anything within about fifty metres of a nest, aiming for the top of the head.'
  ],
  see: [
    { n: 'The aurora',
      d: 'Face north from the car park or the causeway. The city glow is behind you, which is the whole point of coming here rather than staying downtown.' },
    { n: 'Kvika foot bath',
      d: 'A small basin cut into the rock, fed by geothermal water, where you sit with your feet in. Free, unmarked and easy to walk past.' },
    { n: 'The causeway and the tide',
      d: 'Check the table. People are cut off several times a year and have to be collected by boat.' },
    { n: 'The tern closure', t: '1 May to 30 June',
      d: 'The island is shut. Outside those dates the terns are still about and will dive at you; hold a hand or a stick above your head.' },
    { n: 'Sunset',
      d: 'West-facing across the bay to Snæfellsjökull, visible on about one day in four.' },
    { n: 'The walk',
      d: 'A path runs round the whole peninsula from Seltjarnarnes, about five kilometres, mostly on the shore.' }
  ],
  when: 'September to April for the aurora. Closed on the island in May and June.',
  stay: 'An hour, or a whole evening if the lights are out.',
  move: 'Bus 11 from the centre, or a twenty-minute drive. There is a car park at the end of the road.',
  eat: 'Nothing. Seltjarnarnes has a pool and a cafe a few minutes back.'
},

'RVK-perlan': {
  intro: [
    'Perlan is a glass dome sitting on top of six hot water storage tanks on Öskjuhlíð hill, built in 1991. The tanks hold geothermal water for the city’s heating system, which is piped from boreholes and which is why Reykjavík has essentially no heating emissions: almost every building in Iceland is heated with hot water from the ground.',
    'Inside they have built a hundred-metre ice cave out of real snow, held at minus ten degrees, with a tunnel, crevasses and an ice floor. It is a reconstruction rather than a glacier, which some visitors find disappointing and which is also the only way to walk into an ice cave in July.',
    'The planetarium shows an aurora film, which is useful if the sky does not cooperate, and the observation deck on the fourth floor runs right round the dome and is free.'
  ],
  see: [
    { n: 'The observation deck',
      d: 'Free, outdoors, all the way round, with the city, the bay and Esja. The best free view in Reykjavík.' },
    { n: 'The ice cave',
      d: 'Built from around three hundred and fifty tonnes of snow at minus ten. Coats are provided. Honest about being a construction.' },
    { n: 'Áróra',
      d: 'A planetarium show about the northern lights in a dome, which is the fallback for a cloudy week.' },
    { n: 'The Látrabjarg bird cliff recreation',
      d: 'A full-scale section of the cliff with recorded sound, which is better than it sounds and useful if you are not going to the Westfjords.' },
    { n: 'The water tanks',
      d: 'Explained in the exhibition. Iceland’s geothermal district heating is genuinely remarkable and almost nobody comes for it.' },
    { n: 'Öskjuhlíð',
      d: 'The wooded hill around it, planted in the twentieth century, with wartime bunkers and walking paths.' }
  ],
  when: 'Year round. Good for a bad-weather day.',
  stay: 'Two to three hours.',
  move: 'Bus 18, or a twenty-minute walk uphill from the centre. Free shuttle from Harpa in season.',
  eat: 'A cafe and a rotating restaurant at the top.'
},

'RVK-videy': {
  intro: [
    'Viðey is a low island in the bay five minutes by ferry from Skarfabakki, with no permanent residents. An Augustinian monastery was founded here in 1225 and dissolved in 1539, and Viðeyjarstofa, built in 1755, is the oldest stone building in Iceland and the first substantial construction not made of turf.',
    'Yoko Ono installed the Imagine Peace Tower here in 2007, on what would have been John Lennon’s sixty-seventh birthday. It is a well of white stone projecting a column of light upwards from fifteen searchlights, lit from 9 October to 8 December and on a few other dates, and visible for several kilometres.',
    'Richard Serra put nine pairs of basalt columns around the western end in 1990, called Áfangar, arranged so that each pair frames a part of the island or the city. Walking between them takes about an hour and is the best thing on the island.'
  ],
  see: [
    { n: 'Áfangar',
      d: 'Serra’s eighteen basalt pillars in nine pairs at different heights, sited to be walked between. Free, permanent and almost always empty.' },
    { n: 'The Imagine Peace Tower', t: '9 October to 8 December',
      d: 'Lit nightly during that window and on a handful of other dates. Visible from the mainland, and the island runs evening ferries.' },
    { n: 'Viðeyjarstofa and the church',
      d: 'The 1755 house and the 1774 church, both among the oldest standing buildings in the country.' },
    { n: 'The deserted village',
      d: 'Sundbakki at the eastern end, a fishing settlement abandoned in the 1940s, with foundations and a school.' },
    { n: 'The birds',
      d: 'Over thirty breeding species on a small island, with eider in numbers and terns in summer.' },
    { n: 'Cycling',
      d: 'You can take a bicycle on the ferry, and the island is flat with gravel tracks.' }
  ],
  when: 'Ferries run daily in summer and at weekends in winter. October to December for the tower.',
  stay: 'Three hours.',
  move: 'Ferry from Skarfabakki, five minutes, with summer departures also from the old harbour.',
  eat: 'A cafe in Viðeyjarstofa in summer. Nothing in winter, so take something.'
},

'RNS-blue-lagoon': {
  intro: [
    'The Blue Lagoon is not a natural hot spring. It formed in 1976 when the Svartsengi geothermal power station began discharging spent seawater and brine into the lava field beside it, the silica in the water sealed the porous rock, and a pool accumulated. People started bathing in it in the early 1980s after a man with psoriasis found it helped.',
    'The water is around seventy per cent seawater and thirty per cent fresh, drawn from two kilometres down at two hundred and forty degrees, used to generate electricity and heat, and arrives in the lagoon at about thirty-eight. The milky blue is silica in suspension; the white sludge on the bottom is the same material and is sold as a face mask.',
    'That origin bothers purists. It is also a genuinely pleasant two hours in a black lava field, and the fact that it is industrial runoff is one of the more interesting things about it rather than a strike against it.'
  ],
  see: [
    { n: 'Booking ahead',
      d: 'Timed slots, sold out weeks in advance in summer, and you cannot turn up. The cheapest ticket includes a towel and a silica mask.' },
    { n: 'The silica mask',
      d: 'Included, applied from a bar in the water, left on for ten minutes. The algae and mineral ones cost extra and do less.' },
    { n: 'The swim-up bar',
      d: 'One drink included with most tickets. Wristband scanned in the water.' },
    { n: 'The lava field',
      d: 'Walk the path around the outside before or after. The moss on the lava is centuries old and is destroyed by footsteps, so stay on the path.' },
    { n: 'The 2023 to 2024 eruptions',
      d: 'Fissures opened a few kilometres away and the lagoon closed repeatedly. It reopens when the authorities allow and the situation can change at short notice.' },
    { n: 'Hair',
      d: 'The silica makes long hair like straw for days. Conditioner is provided; use a great deal of it and tie your hair up.' }
  ],
  when: 'Year round. Early morning and late evening slots are much quieter. Check the volcanic situation before travelling.',
  stay: 'Two to three hours.',
  move: 'Twenty minutes from Keflavík airport and forty-five from Reykjavík. Most people stop on the way to or from a flight, which is the sensible plan.',
  eat: 'Three restaurants on site from a cafe to a tasting menu. All expensive.'
},

'RNS-reykjanes-eruptions': {
  intro: [
    'The Reykjanes peninsula had been volcanically quiet for about eight hundred years. In March 2021 a fissure opened at Fagradalsfjall after weeks of earthquakes, and lava came out for six months. It erupted again in 2022 and 2023 at nearby fissures, and from December 2023 a series of eruptions began on the Sundhnúkur row directly threatening Grindavík.',
    'Grindavík, a fishing town of about three thousand seven hundred people, was evacuated in November 2023 when the ground cracked open through the middle of it, and has been repeatedly evacuated since. Defensive earth barriers have been built around the town and the power station. Most residents have not returned.',
    'Volcanologists think the peninsula has entered a new active period that may last decades or centuries, with eruptions every few years. That means this is a live situation rather than an attraction, and what is accessible changes from month to month.'
  ],
  see: [
    { n: 'Checking before you go',
      d: 'safetravel.is and the Icelandic Met Office publish current access. Closures are enforced and the gas is the real hazard rather than the lava.' },
    { n: 'The 2021 to 2023 lava fields',
      d: 'At Fagradalsfjall and Meradalir, walkable when open, with the new rock still warm in places years later.' },
    { n: 'The hike in',
      d: 'When an eruption is accessible it is usually an hour or more over rough lava each way. Proper boots, wind layers and a gas meter if the guides are carrying them.' },
    { n: 'Volcanic gas',
      d: 'Sulphur dioxide pools in hollows and has killed people at Icelandic eruptions. Stay high, stay upwind, and leave when told to.' },
    { n: 'Helicopter flights',
      d: 'From Reykjavík when an eruption is active and the airspace is open, which is expensive and the only guaranteed view.' },
    { n: 'Grindavík',
      d: 'Closed or restricted. It is an evacuated town rather than a sight and should be treated as one.' }
  ],
  when: 'Whenever something is erupting and access is open, which is unpredictable. Winter nights give the best glow.',
  stay: 'Half a day when accessible.',
  move: 'Forty-five minutes from Reykjavík. Guided trips are the safest option and know the current access.',
  eat: 'Nothing. Take food and far more water than seems necessary.'
},

'RNS-gunnuhver': {
  intro: [
    'Gunnuhver is the most intense surface geothermal area in Iceland. The ground is coloured red and orange by iron, mud pools boil at a hundred degrees, and the main vent throws steam twenty metres into the air with a noise like a jet engine. The water is seawater seeping into the rock and being flashed to steam.',
    'It is named for Guðrún, a woman who by the story died in a legal dispute with a local official, came back as a ghost, killed him, and caused so much trouble that a priest was called in. He gave her a ball of wool with one end tied to a stake; she took hold of it, followed it into the spring, and has been there since.',
    'The boardwalks have been rebuilt more than once because the activity moves and destroys them. The current layout keeps you at a distance that is necessary rather than cautious: the ground here is genuinely unstable and people have been badly burned stepping off the path.'
  ],
  see: [
    { n: 'The main vent',
      d: 'Twenty metres of steam under pressure. You hear it from the car park and the wind direction decides how much of it you walk through.' },
    { n: 'The mud pools',
      d: 'Boiling grey clay in a red field, which is sulphuric acid breaking the rock down.' },
    { n: 'The colours',
      d: 'Iron oxides and sulphur deposits in red, orange, yellow and white. Strongest in low winter light.' },
    { n: 'The boardwalk',
      d: 'Stay on it. The crust over the hot ground is thin in places and has given way under people.' },
    { n: 'Reykjanesviti',
      d: 'The oldest lighthouse in Iceland, a few minutes away on a hill, with the Valahnúkamöl cliffs and a gannet stack below.' },
    { n: 'The bridge between continents',
      d: 'Ten minutes away, a footbridge over a rift that is a simplification of the plate boundary and a pleasant five minutes.' }
  ],
  when: 'Year round. The steam is most dramatic in cold weather.',
  stay: 'Half an hour.',
  move: 'A car. Twenty minutes from Keflavík, at the southwestern tip of the peninsula.',
  eat: 'Nothing. Grindavík or Keflavík.'
},

'RNS-krysuvik': {
  intro: [
    'Seltún at Krýsuvík is a geothermal field half an hour from Reykjavík, with boiling mud pots, fumaroles and ground stained sulphur yellow, laid out on a short boardwalk on a hillside. It is the most accessible high-temperature area in Iceland.',
    'A borehole drilled here in 1999 was abandoned after an explosion, and the crater it left is part of the site. Earlier drilling in the 1940s was intended to supply steam to a village that was never built, and the attempt is visible in the pipework.',
    'Nearby is Grænavatn, a crater lake that is a strong green from minerals and algae and is forty-six metres deep, and a few minutes further the Krýsuvíkurberg cliffs hold tens of thousands of nesting seabirds in summer.'
  ],
  see: [
    { n: 'The Seltún boardwalk',
      d: 'About twenty minutes round, with mud pots, steam vents and coloured ground. Short, free and the smell is considerable.' },
    { n: 'Grænavatn',
      d: 'The green crater lake beside the road, best from the small pull-off above it.' },
    { n: 'Krýsuvíkurberg',
      d: 'Forty metres of cliff running for several kilometres, with guillemots, razorbills, kittiwakes and fulmars from May to August. Rough track to get there.' },
    { n: 'Kleifarvatn',
      d: 'The lake on the road in, which dropped sharply after an earthquake cracked its floor in 2000 and has since partly refilled.' },
    { n: 'The failed borehole',
      d: 'The 1999 explosion crater, which is a reminder that drilling into a high-temperature field is not routine.' },
    { n: 'The drive',
      d: 'Route 42 from the Reykjanesbraut over the pass to Krýsuvík is one of the better short drives near the city.' }
  ],
  when: 'Year round. The road can be closed by snow in winter.',
  stay: 'An hour and a half with the lake.',
  move: 'A car, forty minutes from Reykjavík.',
  eat: 'Nothing. Hafnarfjörður on the way back.'
},

'RNS-bridge-continents': {
  intro: [
    'The Mid-Atlantic Ridge runs through Iceland, which is the only place on earth where it rises above sea level, and the island is being pulled apart along it at an average of about two centimetres a year. On Reykjanes the rifting is visible as a series of fissures running northeast to southwest.',
    'The Bridge Between Continents is a fifteen-metre footbridge over one of these, built in 2002, with signs at either end marking Europe and North America. Geologically this is a simplification: the plate boundary is a zone tens of kilometres wide rather than a line, and this particular fissure is not the boundary itself.',
    'Taken as a pleasant five-minute stop with an informative oversimplification, it works. The surrounding landscape of black sand, lava and fissures running away in both directions is the better part of it.'
  ],
  see: [
    { n: 'The bridge',
      d: 'Walk across. There is a certificate available at the Reykjanes information centre for anyone who wants one, which tells you the register.' },
    { n: 'The fissure',
      d: 'Running away northeast and southwest, filled with blown sand. More interesting than the bridge.' },
    { n: 'The sand',
      d: 'Black volcanic sand across the whole area, which drifts and buries the paths.' },
    { n: 'The geology',
      d: 'Worth reading the panels. The combination of a mid-ocean ridge and a mantle plume is why Iceland exists at all.' },
    { n: 'Gunnuhver and Reykjanesviti',
      d: 'Both within ten minutes, and the three together make a reasonable afternoon.' },
    { n: 'Brimketill',
      d: 'A lava rock pool on the shore nearby, scoured by the sea, with a viewing platform.' }
  ],
  when: 'Year round. Exposed and windy.',
  stay: 'Fifteen minutes.',
  move: 'A car, on route 425 near Hafnir, twenty minutes from Keflavík.',
  eat: 'Nothing.'
},

'RNS-reykjanesviti': {
  intro: [
    'Reykjanesviti is the oldest lighthouse in Iceland. The first one was built in 1878 on Valahnúkur, the cliff at the point, and was damaged by earthquakes within twenty years; the replacement of 1908 stands on the hill behind and is still working.',
    'Below it Valahnúkamöl is a shore of black boulders rounded by the Atlantic, with cliffs of pillow lava and a sea stack called Karl, the old man, standing offshore. There was a second stack called Kerling, the old woman, which the sea removed.',
    'Eldey, a sheer island fourteen kilometres out, holds one of the largest northern gannet colonies in the world, around sixteen thousand pairs. It is also where the last confirmed pair of great auks on earth were killed in June 1844 by three men who sold the skins to a collector, which ended the species.'
  ],
  see: [
    { n: 'Valahnúkamöl',
      d: 'The boulder shore and the cliffs, with waves that have come in from the open Atlantic with nothing in the way. Do not go near the water line.' },
    { n: 'Karl',
      d: 'The fifty-metre sea stack offshore, which is a volcanic plug and a nesting site.' },
    { n: 'Eldey',
      d: 'Visible on a clear day. The gannet colony and the great auk story, which is commemorated by a sculpture on the shore.' },
    { n: 'The lighthouse',
      d: 'On the hill, not open, but the walk up gives the whole point and the geothermal field inland.' },
    { n: 'The great auk memorial',
      d: 'A bronze by Todd McGrain facing Eldey, part of a series marking extinct bird species.' },
    { n: 'The storms',
      d: 'This is the most exposed corner of Iceland. In a winter southwesterly the spray reaches the road.' }
  ],
  when: 'Year round. Spectacular in a storm and dangerous at the water line at any time.',
  stay: 'An hour.',
  move: 'A car, twenty-five minutes from Keflavík, beside Gunnuhver.',
  eat: 'Nothing.'
},

'RNS-garour': {
  intro: [
    'Garður is at the northwestern corner of the Reykjanes peninsula, where the land ends in a flat point with two lighthouses on it: a small one from 1897 that the sea was undermining, and a taller one built in 1944 further inland.',
    'The point sticks out into Faxaflói and the combination of shallow water, currents and exposure makes it one of the best birdwatching spots in southwest Iceland. Rarities turn up regularly and Icelandic birders check it constantly.',
    'It is also a reliable aurora site, because it faces north over open water with no settlement in that direction and the Reykjavík glow is thirty kilometres behind you. There is a car park at the lighthouses and you can sit in a car facing north, which in an Icelandic February is a consideration.'
  ],
  see: [
    { n: 'The two lighthouses',
      d: 'The old one from 1897 right on the point and the 1944 replacement behind it. The old one can usually be entered.' },
    { n: 'Birdwatching',
      d: 'Eiders, waders, gulls and a steady trickle of vagrants. Best on a rising tide and in spring and autumn migration.' },
    { n: 'The aurora',
      d: 'North-facing over water with low light pollution, and a car park where you can wait in the warm.' },
    { n: 'The folk museum',
      d: 'In the village, with boat engines, fishing gear and local history, which is better than that sounds.' },
    { n: 'Sandgerði',
      d: 'Next door, with a marine research centre and small aquarium focused on the Icelandic seabed.' },
    { n: 'Whale and seal watching',
      d: 'Both are seen from the point, and there are occasional orca sightings in winter when the herring are in Faxaflói.' }
  ],
  when: 'September to April for the aurora, spring and autumn for birds.',
  stay: 'Two hours.',
  move: 'A car, fifteen minutes from Keflavík airport, which makes it a good first or last stop.',
  eat: 'A cafe at the lighthouses in summer. Sandgerði and Keflavík otherwise.'
},

'RNS-brimketill': {
  intro: [
    'Brimketill is a rock pool cut into the lava shelf at the edge of the Atlantic, about the size of a small bath, scoured out by the sea over a long time. It fills and empties with every swell and in anything above a moderate sea the whole shelf disappears under white water.',
    'The folklore attaches it to a troll woman named Oddný who is said to have bathed in it, which is the standard Icelandic explanation for a rock formation of this kind and has the advantage of being memorable.',
    'A viewing platform was built in 2017 after a series of incidents. People had been climbing down to sit in the pool for photographs and were being taken off the rocks by waves, and the Icelandic coastguard had made several rescues. The platform keeps you above the shelf and it is there for a reason.'
  ],
  see: [
    { n: 'The platform',
      d: 'Stay on it. The lava shelf below is wet, uneven and reached by waves that arrive without warning.' },
    { n: 'The pool',
      d: 'Visible from above, filling and draining. In a calm sea it is a neat bowl; in a swell it vanishes entirely.' },
    { n: 'The swell',
      d: 'This shore faces southwest into open Atlantic with no shelter for three thousand kilometres. In a winter storm the spray crosses the road.' },
    { n: 'The lava shelf',
      d: 'Columnar and pitted, running for several hundred metres either side, which is a good illustration of how the sea takes a lava coast apart.' },
    { n: 'Grindavík',
      d: 'Ten minutes east, though access depends on the current volcanic situation.' },
    { n: 'Sunset',
      d: 'Southwest-facing, which in winter puts the low sun straight down the coast.' }
  ],
  when: 'Year round. Best in a swell and that is also when it is most dangerous.',
  stay: 'Twenty minutes.',
  move: 'A car on route 425 west of Grindavík. Check road access given the volcanic activity.',
  eat: 'Nothing.'
},

'RNS-kleifarvatn': {
  intro: [
    'Kleifarvatn is the largest lake on the Reykjanes peninsula, nearly a hundred metres deep, sitting in a rift valley on the plate boundary with black sand beaches and steep slopes around it. It has no surface inflow or outflow; the water comes in and leaves through the rock.',
    'In June 2000 a magnitude 6.5 earthquake opened fissures in the lake floor and the water began draining away. It lost about twenty per cent of its surface area over the following years, exposing beaches that had been underwater for a long time, and then the fissures partly sealed and the level recovered.',
    'There is a long-standing story about a worm-like creature the size of a whale living in it, reported periodically since the nineteenth century. The lake is also where Arnaldur Indriðason set one of his crime novels, which is why Icelanders of a certain age find it slightly sinister.'
  ],
  see: [
    { n: 'The black beaches',
      d: 'Fine volcanic sand round much of the shore, with the steep sides of the rift behind. Walk along the eastern shore from the road.' },
    { n: 'The drained and refilled shoreline',
      d: 'Visible as terraces on the shore, which record the drop after 2000.' },
    { n: 'The road',
      d: 'Route 42 runs along the western side, with pull-offs. One of the better short drives in the southwest.' },
    { n: 'Seltún',
      d: 'The geothermal field at the southern end, ten minutes further.' },
    { n: 'The quiet',
      d: 'Half an hour from Reykjavík and often completely empty, which is unusual anywhere in the southwest.' },
    { n: 'Hot springs in the lake',
      d: 'There are vents on the lake bed on the southern side, visible as patches of disturbed water in calm conditions.' }
  ],
  when: 'Year round. The road can close in winter snow.',
  stay: 'An hour.',
  move: 'A car on route 42 from Hafnarfjörður, about thirty minutes.',
  eat: 'Nothing.'
},

'SUL-thingvellir': {
  intro: [
    'In about 930 the chieftains of Iceland agreed to meet once a year on a plain east of Reykjavík to make law and settle disputes, and the Alþingi met at Þingvellir every summer until 1798. That makes it one of the oldest parliamentary institutions anywhere, and it is the reason Iceland has a continuous written legal tradition going back to the tenth century.',
    'In the year 1000 the assembly had to decide whether the country would become Christian, with the two factions armed and on the point of civil war. The lawspeaker Þorgeir, a pagan, was asked to decide, went to his booth, lay under a cloak for a day and a night, and came back and ruled that everyone would be baptised but that private pagan worship could continue. Both sides accepted it.',
    'The plain is a rift valley. The North American and Eurasian plates are pulling apart here and the ground between them is sinking, which has produced the Almannagjá fissure wall that the assembly met beneath. It is listed by UNESCO for both reasons at once, which is unusual.'
  ],
  see: [
    { n: 'Almannagjá',
      d: 'The fissure wall, walked from the upper car park down a path that follows the base of it. The Lögberg, where the lawspeaker stood, is marked partway along.' },
    { n: 'Silfra', t: 'booked, drysuit, year round',
      d: 'A fissure filled with meltwater filtered through lava for decades, with visibility over a hundred metres. Snorkelling or diving between the plates in two-degree water. The clarity is genuinely startling.' },
    { n: 'Öxarárfoss',
      d: 'A waterfall diverted into the gorge in the Middle Ages, probably to provide water for the assembly.' },
    { n: 'Drekkingarhylur',
      d: 'The drowning pool, where women convicted of infanticide or adultery were executed between the sixteenth and eighteenth centuries. There is a plaque and no decoration.' },
    { n: 'Þingvallavatn',
      d: 'The largest natural lake in Iceland, with four distinct forms of Arctic char that evolved separately in it after the last glaciation.' },
    { n: 'The autumn colour',
      d: 'Dwarf birch across the rift floor turns red and gold in the second half of September, which is the best time to be here.' }
  ],
  when: 'Year round. Late September for the colour, winter for the ice on the fissures. The car parks charge and the fee funds the park.',
  stay: 'Three hours, more with Silfra.',
  move: 'Forty-five minutes from Reykjavík on route 36. First stop on the Golden Circle.',
  eat: 'A cafe at the visitor centre. Nothing else nearby.'
},

'SUL-geysir': {
  intro: [
    'The word geyser comes from this one. Geysir, which means gusher in Icelandic, was described in print in the thirteenth century and was the first such feature known to Europeans, which is why every other one on earth is named after it.',
    'It is now mostly dormant. It erupted irregularly through the twentieth century, was provoked for visitors by throwing soap into it, which lowered the surface tension, and that practice was stopped on conservation grounds. Earthquakes in 2000 restarted it briefly and it has been quiet again since.',
    'Strokkur, forty metres away, does the work. It erupts every five to ten minutes to between fifteen and twenty metres, reliably, all day. The blue dome of water that bulges up a second before it goes is the thing to watch for, and it is the moment everyone misses the first time.'
  ],
  see: [
    { n: 'Strokkur',
      d: 'Every five to ten minutes. Stand upwind, watch for the blue bulge, and be ready. It occasionally goes twice in quick succession.' },
    { n: 'Geysir itself',
      d: 'The larger basin beside it, usually still, with a history worth reading on the panels.' },
    { n: 'Blesi',
      d: 'A pair of connected pools, one clear and one milky blue, which are the same water at different temperatures.' },
    { n: 'The silica terraces',
      d: 'Around the vents, built up from dissolved silica depositing as the water cools, in white and orange.' },
    { n: 'Going early or late',
      d: 'The Golden Circle coaches arrive from mid-morning. Before nine or after six the field is nearly empty and it is a different place.' },
    { n: 'The rules',
      d: 'Stay on the paths and do not put anything in the water. The ground beside the vents is near boiling and people are burned here most years.' }
  ],
  when: 'Year round. Winter steam in cold air is the best version.',
  stay: 'An hour.',
  move: 'An hour and a half from Reykjavík. Second stop on the Golden Circle, between Þingvellir and Gullfoss.',
  eat: 'A large visitor centre with a cafeteria across the road, which is where every coach stops.'
},

'SUL-gullfoss': {
  intro: [
    'The Hvítá drops in two stages here, eleven metres and then twenty-one, into a canyon thirty-two metres deep and two and a half kilometres long. What makes it unusual is that the second drop is at right angles to the flow, so from upstream the river appears to vanish into the ground.',
    'In the early twentieth century a foreign company wanted to dam it for hydroelectricity. Sigríður Tómasdóttir, the daughter of the farmer who owned the land, walked to Reykjavík repeatedly to argue against it and threatened to throw herself into the falls. The lease was eventually abandoned, and she is commemorated with a stone plaque above the canyon.',
    'The story is more complicated than the version on the signs, since the lease lapsed largely over unpaid fees, but she became the Icelandic environmental movement’s founding figure and the campaign was real.'
  ],
  see: [
    { n: 'The lower viewpoint',
      d: 'A path down to a promontory beside the upper fall, where you get the spray and the scale. Slippery and sometimes closed in ice.' },
    { n: 'The upper viewpoint',
      d: 'From the main car park, giving the canyon and both drops at once, which is the better photograph.' },
    { n: 'The rainbow',
      d: 'In afternoon sun the spray throws one across the lower fall reliably.' },
    { n: 'Winter',
      d: 'Partly frozen, with ice formations on the canyon walls and far fewer people. The lower path is often shut.' },
    { n: 'The Sigríður plaque',
      d: 'On the slope above, with the story of the campaign.' },
    { n: 'Kerlingarfjöll and the highlands',
      d: 'The F35 Kjölur route starts just beyond Gullfoss and runs into the interior in summer.' }
  ],
  when: 'Year round. Spring melt gives the highest volume; winter gives ice.',
  stay: 'An hour.',
  move: 'An hour and three quarters from Reykjavík. Third stop on the Golden Circle.',
  eat: 'A cafe at the upper car park, known for its lamb soup.'
},

'SUL-jokulsarlon': {
  intro: [
    'Jökulsárlón did not exist in 1930. Breiðamerkurjökull, an outlet glacier of Vatnajökull, had advanced almost to the sea during the Little Ice Age and then began retreating, and the basin it had gouged out filled with meltwater. The lagoon first appeared around 1935 and has grown steadily since.',
    'It is now about twenty-five square kilometres and over two hundred and fifty metres deep, which makes it the deepest lake in Iceland. The glacier front is several kilometres back from where it was in 1990 and the lagoon is still expanding, which is a straightforward and visible piece of climate evidence.',
    'Icebergs calve off the glacier, drift down the lagoon over months or years as they melt, and eventually go out through a short channel to the sea. The tide pushes some of them back onto the black sand beach, where they sit and melt, which is Diamond Beach.'
  ],
  see: [
    { n: 'The lagoon',
      d: 'Walk the shore from the car park. The ice is blue where it has recently turned over and black where it has volcanic ash in it from past eruptions.' },
    { n: 'Boat trips', t: 'May to October',
      d: 'Amphibious vehicles or zodiacs among the bergs. The zodiacs go further and closer to the glacier front.' },
    { n: 'The seals',
      d: 'Harbour seals live in the lagoon year round and pup on the ice. They are used to boats and come close.' },
    { n: 'Diamond Beach',
      d: 'Across the road, where stranded ice sits on black sand. Different every tide and best on a sunny day.' },
    { n: 'Fjallsárlón',
      d: 'A smaller lagoon ten minutes west, with the glacier front much closer and a fraction of the people.' },
    { n: 'The outlet channel',
      d: 'Under the ring road bridge, where the bergs go out and the tide brings them back. Strong current and worth watching.' }
  ],
  when: 'Year round. Winter has ice caves and aurora; summer has the boats and the light. The car park fills by mid-morning in season.',
  stay: 'Half a day with the beach.',
  move: 'Five hours from Reykjavík on the ring road, or an hour from Höfn. Most people stay at Höfn or Skaftafell.',
  eat: 'A cafe at the car park. Höfn is the nearest town and is known for langoustine.'
},

'SUL-diamond-beach': {
  intro: [
    'Breiðamerkursandur is the black outwash plain in front of the glacier, built from material the ice ground up and the meltwater carried out. Diamond Beach is the stretch beside the lagoon outlet where icebergs that have gone out to sea are pushed back onto the sand by the tide.',
    'The ice is old. It fell as snow on Vatnajökull somewhere between several hundred and over a thousand years ago, was compressed into glacier ice, travelled down to the front, calved, floated in the lagoon for months or years and then went out to sea. What is on the sand is the end of that process.',
    'How much ice is there varies completely with the tide, the wind and how much the glacier has been calving. Some days there are hundreds of pieces; some days there are none, and nobody can tell you in advance.'
  ],
  see: [
    { n: 'The ice on black sand',
      d: 'Both sides of the outlet channel. The eastern side usually has more and fewer people.' },
    { n: 'Sunny weather',
      d: 'The ice is clear rather than white and in sun it genuinely looks like glass. On a grey day it is much less striking.' },
    { n: 'Low sun',
      d: 'Sunrise and sunset, which in winter is most of the short day, lights the ice from behind.' },
    { n: 'The seals',
      d: 'In the channel, hunting fish in the current where the lagoon meets the sea.' },
    { n: 'The waves',
      d: 'Sneaker waves on this coast have killed people. Do not stand on ice at the waterline and watch what the sea is doing behind you.' },
    { n: 'The skuas',
      d: 'Great skuas breed on the sandur behind and will see off anything that comes near a nest in summer.' }
  ],
  when: 'Year round. Sunrise in winter is late enough to be convenient. The amount of ice is unpredictable.',
  stay: 'An hour.',
  move: 'Directly across the ring road from the Jökulsárlón car park.',
  eat: 'The lagoon cafe.'
},

'SUL-seljalandsfoss': {
  intro: [
    'Seljalandsfoss drops sixty metres over what was a sea cliff before the last glaciation, when the sea level was higher and the coastline ran along the foot of these hills. The land has since rebounded and the sea is about five kilometres away, which is why there is a line of waterfalls along this escarpment.',
    'The reason this one is famous is that the rock behind it has been undercut, so there is a path all the way round the back of the fall. Standing behind sixty metres of falling water looking out through it is the thing, and you will get thoroughly wet doing it.',
    'Gljúfrabúi is four hundred metres north and most people miss it. It falls into a narrow cleft in the cliff and you reach it by wading up a stream through a gap in the rock, coming out in a chamber open to the sky with the fall at the end. It is better than the famous one.'
  ],
  see: [
    { n: 'The path behind',
      d: 'Round the back and out the other side. Waterproofs are not optional and neither is protecting a camera. Icy and sometimes closed in winter.' },
    { n: 'Gljúfrabúi',
      d: 'Four hundred metres north along the base of the cliff, through a cleft, wading. Waterproof boots. Far fewer people and arguably better.' },
    { n: 'Midnight sun',
      d: 'The fall faces west, so in June the low sun comes straight through the water around midnight. Among the best things in Iceland.' },
    { n: 'Winter',
      d: 'The spray freezes into sheets on the rocks and the path behind becomes dangerous. It is often roped off.' },
    { n: 'The car park',
      d: 'Charged, and the money goes to maintaining the paths, which are heavily used.' },
    { n: 'Eyjafjallajökull',
      d: 'The glacier above, which erupted in 2010 and stopped European air traffic. There is a visitor centre at a farm nearby run by the family who were evacuated.' }
  ],
  when: 'Year round. June for the midnight sun behind the fall. Winter for the ice, with the rear path often closed.',
  stay: 'An hour with Gljúfrabúi.',
  move: 'Beside the ring road, ninety minutes from Reykjavík.',
  eat: 'Food trucks in the car park in summer.'
},

'SUL-skogafoss': {
  intro: [
    'Skógafoss is sixty metres high and twenty-five wide, falling over the same old sea cliff as Seljalandsfoss twenty-five kilometres west. It carries a lot of water and the spray reaches the car park, which means a double rainbow on any sunny afternoon and a thorough soaking if you walk to the base.',
    'The local story is that the first Viking settler in the area, Þrasi, buried a chest of gold in a cave behind the fall. Men later got hold of a ring on the side of the chest, pulled, and came away with only the ring, which ended up on a church door and is now supposedly in a museum.',
    'Behind the fall a staircase of four hundred and twenty-seven steps climbs the escarpment, and at the top the Fimmvörðuháls trail runs twenty-five kilometres over the pass between two glaciers to Þórsmörk, passing the craters that opened in the first phase of the 2010 eruption.'
  ],
  see: [
    { n: 'The steps',
      d: 'Four hundred and twenty-seven to the top, with a viewing platform. Steep and worth it for the view back down the coast.' },
    { n: 'The base',
      d: 'Walk up to the spray line. The rainbow sits on the fall in afternoon sun and often doubles.' },
    { n: 'The upper river',
      d: 'Above the fall the Skógá has twenty-odd more waterfalls in the first few kilometres, on a path almost nobody walks. An hour upstream and back is the best-value walk on the south coast.' },
    { n: 'Fimmvörðuháls',
      d: 'Twenty-five kilometres over the pass to Þórsmörk, ten hours, past the 2010 craters. A serious day with no shelter and weather that changes fast.' },
    { n: 'Skógar Museum',
      d: 'Beside the fall, a folk museum built around one collector’s lifetime of acquisition, with turf houses moved to the site. Much better than it looks.' },
    { n: 'Kvernufoss',
      d: 'A kilometre east behind the museum, in a gorge, with a path behind it and almost nobody there.' }
  ],
  when: 'Year round. Fimmvörðuháls is a summer route only.',
  stay: 'An hour and a half, more with the museum.',
  move: 'Beside the ring road, two hours from Reykjavík.',
  eat: 'A hotel and cafe at the fall, and a campsite.'
},

'SUL-reynisfjara': {
  intro: [
    'Reynisfjara is a beach of black basalt sand with a cliff of columnar basalt behind it, a cave called Hálsanefshellir cut into the columns, and the Reynisdrangar sea stacks standing offshore. The columns form when lava cools slowly and contracts into hexagons, and here the cliff is a cross-section through that.',
    'It is also dangerous and it kills people. The beach shelves steeply, the North Atlantic arrives with no continental shelf to slow it, and the result is sneaker waves: a wave that runs several tens of metres further up the sand than the ones before it, with enough undertow to take an adult off their feet. At least five visitors have died here since 2007.',
    'There is now a warning system with lights at the entrance showing the current danger level, and signs showing how far up the beach the waves are reaching. They are not decorative and the deaths have mostly been people who turned their backs on the sea to take a photograph.'
  ],
  see: [
    { n: 'The basalt columns',
      d: 'The cliff and the cave at the western end, with the columns stacked like organ pipes. Climbing them is discouraged and people fall off.' },
    { n: 'Reynisdrangar',
      d: 'The sea stacks offshore, which folklore says are trolls caught by the sunrise while trying to drag a ship ashore.' },
    { n: 'The wave warning',
      d: 'Check the lights at the entrance and read the signs. Never turn your back on the sea and stay well above the wet sand line.' },
    { n: 'Puffins', t: 'May to August',
      d: 'Nesting on the cliffs at Dyrhólaey next door, and on the slopes above the beach.' },
    { n: 'Dyrhólaey',
      d: 'The promontory to the west with the arch, which gives the view back along the beach.' },
    { n: 'Vík',
      d: 'Ten minutes east, with a black beach of its own that is considerably safer.' }
  ],
  when: 'Year round. The sea is most dangerous in a big southwesterly swell, which is most of the winter.',
  stay: 'An hour.',
  move: 'Beside the ring road west of Vík, two and a half hours from Reykjavík.',
  eat: 'A cafe at the car park. Vík has more.'
},

'SUL-vik': {
  intro: [
    'Vík í Mýrdal is the southernmost village on the Icelandic mainland, with about seven hundred people, a black beach, and a red-roofed church on the hill above it. It is also the wettest place in the country, with around two and a quarter metres of rain a year.',
    'Directly above it sits Mýrdalsjökull, and under that ice is Katla, a volcano that has erupted roughly twice a century for the last thousand years and has not erupted since 1918. An eruption under the ice would produce a jökulhlaup, a glacial outburst flood, carrying an enormous volume of water and ash down onto the plain.',
    'The village has an evacuation plan and practises it. The assembly point is the church, which is the only building high enough to be above the modelled flood, and the sirens are tested. This is the most visible piece of volcanic risk management in Iceland and the villagers discuss it matter-of-factly.'
  ],
  see: [
    { n: 'The church',
      d: 'On the hill, red-roofed, with the beach and the stacks below. Also the evacuation point, which is the reason it is sited there.' },
    { n: 'Reynisdrangar from the beach',
      d: 'The village beach gives a different angle on the stacks from Reynisfjara and is much safer.' },
    { n: 'Katla',
      d: 'The interpretation centre in the village covers the volcano and the 1918 eruption, which added five kilometres of new land to the coast in one flood.' },
    { n: 'Puffins at Reynisfjall',
      d: 'The cliff above the village, with a steep walk up and nesting birds from May to August.' },
    { n: 'The Sólheimasandur plane wreck',
      d: 'Twenty minutes west, a US Navy DC-3 that crash-landed in 1973 with no fatalities, now on black sand. A four-kilometre walk each way from the road with no shelter.' },
    { n: 'Hjörleifshöfði',
      d: 'A headland on the sandur east of the village with a cave shaped like a yoda head, and the burial place of one of the first settlers.' }
  ],
  when: 'Year round. Vík is the usual overnight stop on the south coast and books out in summer.',
  stay: 'A night.',
  move: 'On the ring road, two and a half hours from Reykjavík.',
  eat: 'Several places for a village this size, including a good soup restaurant and a bakery.'
},

'SUL-skaftafell': {
  intro: [
    'Skaftafell was a separate national park from 1967 and became part of Vatnajökull National Park in 2008, which at about fourteen thousand square kilometres covers some fourteen per cent of Iceland. It sits on a green wedge of land between two glacier tongues, sheltered enough to grow birch and rowan in a landscape that otherwise has neither.',
    'The reason it is green is a rain shadow. Öræfajökull, the ice-covered volcano above it, blocks the weather, and the area gets noticeably more sunshine than the coast on either side. That made it farmable, and there were farms here until the twentieth century despite the glacial floods.',
    'Svartifoss is the signature walk: a fall dropping twenty metres over a cliff of hexagonal basalt columns that hang down like organ pipes. Guðjón Samúelsson used them as the model for Hallgrímskirkja and for the National Theatre in Reykjavík.'
  ],
  see: [
    { n: 'Svartifoss',
      d: 'Forty-five minutes uphill from the visitor centre on a made path. The columns are the point rather than the water.' },
    { n: 'Skaftafellsjökull',
      d: 'An easy flat walk of about forty minutes each way to the glacier snout, with no equipment needed. The retreat since 1990 is marked.' },
    { n: 'Glacier walks', t: 'guided, year round',
      d: 'Crampon walks on Falljökull and Svínafellsjökull from the visitor centre. Guided only and worth doing; the surface is nothing like it looks from a distance.' },
    { n: 'Kristínartindar',
      d: 'A long day walk to a ridge at about eleven hundred metres with Öræfajökull on one side and the sandur on the other.' },
    { n: 'Sel',
      d: 'A preserved turf farm on the hillside above the visitor centre, inhabited until 1946.' },
    { n: 'Hvannadalshnúkur',
      d: 'At 2,110 metres the highest point in Iceland, on the rim of Öræfajökull. A fifteen-hour guided ascent with crevasse risk, done in spring.' }
  ],
  when: 'Year round. The walking is best from June to September; the ice caves are a winter activity.',
  stay: 'Two nights.',
  move: 'On the ring road, four hours from Reykjavík. There is a campsite and a hotel at Freysnes nearby.',
  eat: 'A cafe at the visitor centre. Freysnes and Kirkjubæjarklaustur otherwise.'
},

'SUL-fjaorargljufur': {
  intro: [
    'Fjaðrárgljúfur is about two kilometres long and up to a hundred metres deep, cut into palagonite, a soft rock formed when lava erupts under ice and is rapidly quenched. That softness is why the gorge meanders so tightly: the river has wandered as it cut down, leaving a serpentine slot with fins of rock between the bends.',
    'It was formed at the end of the last glaciation, roughly nine thousand years ago, when meltwater from a glacial lake cut through in a relatively short time.',
    'In 2015 Justin Bieber filmed a video here in which he walks on the moss at the edge and swims in the river. Visitor numbers went up around fifty per cent and the vegetation on the rim was being destroyed, so the site was closed in 2019 and reopened with a fenced path. Icelandic moss takes decades to recover from being walked on and the fence is there for that reason.'
  ],
  see: [
    { n: 'The rim path',
      d: 'About two kilometres each way along the eastern edge with several viewing platforms. Stay inside the rope; the moss does not come back.' },
    { n: 'The far viewpoint',
      d: 'At the top end, looking back down the full length of the meanders, which is the view that is worth the walk.' },
    { n: 'The river',
      d: 'Walking in the gorge bed is possible in low water in summer and is not permitted when the path is closed.' },
    { n: 'The closure history',
      d: 'Worth knowing. Several Icelandic sites have been closed to recover and this is the best-known case.' },
    { n: 'Kirkjubæjarklaustur',
      d: 'Ten minutes east, with Systrafoss, a pavement of basalt columns called Kirkjugólf and a convent site.' },
    { n: 'Laki',
      d: 'The fissure that erupted in 1783 for eight months, killed a fifth of Iceland’s population through famine and affected the climate across Europe. Reachable by F-road in summer only.' }
  ],
  when: 'Late spring to autumn. The path closes in spring to protect the ground during the thaw, which catches people out.',
  stay: 'Ninety minutes.',
  move: 'A gravel road off the ring road near Kirkjubæjarklaustur, three and a half hours from Reykjavík.',
  eat: 'Nothing on site. Kirkjubæjarklaustur has a shop and a restaurant.'
},

'SUL-dyrholaey': {
  intro: [
    'Dyrhólaey is a hundred and twenty metre promontory that was a volcanic island until longshore drift joined it to the mainland. The name means door hill island, and the door is a natural arch at the end of the headland large enough that a small aircraft has been flown through it and boats go under it.',
    'It is the southernmost point of the Icelandic mainland, with a lighthouse on top, and the view runs west along the black sand of Reynisfjara and east to the stacks and the glacier beyond. On a clear day Vestmannaeyjar is visible out to sea.',
    'The whole headland is closed between about 1 May and 25 June for nesting. Puffins breed here in large numbers along with fulmars and arctic terns, and the closure is absolute: the road is gated and the fine for going round it is substantial.'
  ],
  see: [
    { n: 'The arch',
      d: 'From the upper viewpoint, with the sea going through it. Best in afternoon light from the east side.' },
    { n: 'Puffins', t: 'late June to mid-August',
      d: 'On the grassy slopes at the edge of the cliff, close enough to see well. Stay back from the edge; the turf overhangs and gives way.' },
    { n: 'The lighthouse',
      d: 'On the high part, 1927, with the full sweep of the south coast.' },
    { n: 'The lower headland',
      d: 'A separate car park with a view east to Reynisdrangar and down onto the beach.' },
    { n: 'The closure', t: '1 May to around 25 June',
      d: 'Total, for nesting. Check before driving out; the dates shift slightly each year.' },
    { n: 'The road',
      d: 'Steep, rough and unsuitable for a two-wheel-drive car in wet conditions. There is a lower car park for that reason.' }
  ],
  when: 'Late June to August for puffins. Closed in May and most of June. Windy at all times.',
  stay: 'An hour.',
  move: 'A side road off the ring road west of Vík, two and a half hours from Reykjavík.',
  eat: 'Nothing. Vík is ten minutes.'
},

'SUL-vestmannaeyjar': {
  intro: [
    'At one thirty in the morning on 23 January 1973 a fissure opened without warning on the edge of Heimaey, the only inhabited island in the Vestmannaeyjar group, a few hundred metres from the town. The entire population of around five thousand three hundred was evacuated by the fishing fleet within six hours, which was possible only because a storm had kept every boat in harbour that night.',
    'The eruption ran for five months. Around four hundred buildings were buried or burned, and the lava began closing the harbour, which was the island’s entire economy. Islanders and volunteers pumped seawater onto the advancing front for months to cool and halt it, moving something like six million cubic metres of water. It worked, and the harbour is now better sheltered than it was.',
    'Heimaey also has the largest puffin colony in the world, somewhere around eight hundred thousand to a million pairs. In August the fledglings leave at night, are confused by the town lights, and crash in the streets, so the children of the island go out with torches and boxes, collect them and release them off the cliffs the next day.'
  ],
  see: [
    { n: 'Eldheimar',
      d: 'A museum built over an excavated house that was buried in 1973, left as it was found, with the eruption told through the residents.' },
    { n: 'Eldfell',
      d: 'The two-hundred-metre cone that appeared in 1973, climbable in half an hour, with ground still warm enough in places to bake bread.' },
    { n: 'Puffin fledgling rescue', t: 'mid-August to early September',
      d: 'The pysjur season, when islanders and visitors collect grounded chicks at night. The Sæheimar aquarium weighs and releases them.' },
    { n: 'Stórhöfði',
      d: 'The headland at the southern tip, one of the windiest places in Europe, with a puffin hide.' },
    { n: 'The boat tour',
      d: 'Round the island and into the sea caves, with a guide who usually plays a brass instrument in one of them for the acoustics.' },
    { n: 'Surtsey',
      d: 'Visible from the island, a new island that emerged in 1963 and is a closed scientific reserve studying how life colonises bare rock.' }
  ],
  when: 'June to August for puffins and the ferry schedule. The National Festival in early August is enormous and the island is full.',
  stay: 'Two nights.',
  move: 'Ferry from Landeyjahöfn, thirty-five minutes, which is weather dependent and sometimes diverts to Þorlákshöfn. Also a short flight.',
  eat: 'Fish, and the island has a good bakery and a couple of serious restaurants for its size.'
},

'SUL-solheimajokull': {
  intro: [
    'Sólheimajökull is an outlet tongue of Mýrdalsjökull, which is the ice cap sitting on top of Katla. It is one of the most accessible glacier fronts in Iceland: a gravel road off the ring road and a fifteen-minute walk to the ice.',
    'It is also the clearest demonstration of retreat available to a casual visitor. Markers along the path show where the front stood in successive years and the distance between them is startling: the glacier has pulled back close to a kilometre since the turn of the century and the lagoon in front of it did not exist twenty years ago.',
    'Most guided glacier walks on the south coast start here. The surface is not the smooth white sheet it looks like from the car park: it is grey with ash, ridged, cut by crevasses and moulins, and it needs crampons and someone who knows where the holes are.'
  ],
  see: [
    { n: 'Glacier walking', t: 'guided, year round',
      d: 'Two to three hours with crampons, ice axe and harness. Several operators run from the car park. No independent access onto the ice.' },
    { n: 'The retreat markers',
      d: 'Along the approach path, dated. Walking between them takes several minutes, which is the point.' },
    { n: 'Ice climbing',
      d: 'Offered on the seracs as an add-on, with no experience required.' },
    { n: 'The proglacial lagoon',
      d: 'In front of the snout, new, with small bergs. Do not go on the shore ice; it is undercut.' },
    { n: 'The ash layers',
      d: 'Visible as dark bands in the ice, each one a past eruption, which makes the glacier a readable record.' },
    { n: 'Katla underneath',
      d: 'Mýrdalsjökull covers it. An eruption would melt a very large amount of this ice very quickly.' }
  ],
  when: 'Year round. Winter walks are shorter and the ice is cleaner; summer has more operators.',
  stay: 'Half a day with a guided walk.',
  move: 'A gravel road off the ring road between Skógafoss and Vík, two hours from Reykjavík.',
  eat: 'Nothing. Vík or Skógar.'
},

'SUL-secret-lagoon': {
  intro: [
    'Gamla Laugin, the old pool, at Flúðir was built in 1891 and is the oldest swimming pool in Iceland. Swimming lessons were given here from 1909 and it was abandoned in 1947 when a newer pool was built, then cleared out and reopened in 2014.',
    'It is fed by hot springs that bubble up along the edge of the pool, including a small geyser that goes off every few minutes, and the water sits at around thirty-eight to forty degrees. The bottom is natural and the surroundings are grass and steam rather than architecture.',
    'Flúðir itself grows a surprising amount of food. Geothermal greenhouses here produce tomatoes, cucumbers and mushrooms, and the village supplies a good proportion of Iceland’s fresh vegetables, which in a country at sixty-four degrees north is not obvious.'
  ],
  see: [
    { n: 'The pool',
      d: 'Natural bottom, steam, and the hot springs visible at the edge. Considerably less designed than the Blue Lagoon and cheaper.' },
    { n: 'The little geyser',
      d: 'In the stream beside the pool, going off every five minutes or so.' },
    { n: 'The old changing building',
      d: 'The 1891 structure beside the pool, preserved, with photographs of the swimming lessons.' },
    { n: 'Winter evenings',
      d: 'Dark by four, steam off the water, and a reasonable aurora site because Flúðir is small and the sky is open.' },
    { n: 'Friðheimar',
      d: 'A geothermal tomato greenhouse ten minutes away where you eat tomato soup among the plants. Booked and genuinely good.' },
    { n: 'The Golden Circle',
      d: 'Flúðir is a short detour off it and makes a better soak than any of the stops on the main route.' }
  ],
  when: 'Year round. Booking advised in summer; the pool is small.',
  stay: 'Two hours.',
  move: 'A car, ninety minutes from Reykjavík, close to the Golden Circle route.',
  eat: 'Friðheimar for tomato soup, or the village, which has a reasonable restaurant.'
},

'SUL-kerio': {
  intro: [
    'Kerið is a crater about three thousand years old, two hundred and seventy metres long and fifty-five deep, with a lake at the bottom that sits seven to fourteen metres deep depending on the water table. The walls are red scoria and the water is an opaque blue-green.',
    'It is not an explosion crater, which is the usual assumption. The current reading is that it was a cone that emptied its magma chamber and collapsed into it, leaving the bowl, which is why the walls are built of the cone’s own ejecta.',
    'The land is privately owned and the owners began charging a small entrance fee in 2013, which was controversial in a country with a strong tradition of open access. The money has gone into paths and steps, and the argument about whether private landowners should charge at natural sites continues elsewhere.'
  ],
  see: [
    { n: 'The rim walk',
      d: 'About fifteen minutes round, with the red scoria and the lake below. The colours are strongest on an overcast day, oddly.' },
    { n: 'The steps to the water',
      d: 'Down to the lake shore on the northern side. The water is cold and swimming is discouraged.' },
    { n: 'The acoustics',
      d: 'The crater has been used for concerts, with the performers on a raft and the audience on the slope, which works remarkably well.' },
    { n: 'Autumn',
      d: 'The vegetation on the walls turns and the contrast with the red rock is at its best in September.' },
    { n: 'The fee',
      d: 'Small, cash or card at a hut. Part of a live Icelandic argument about access and ownership.' },
    { n: 'The Grímsnes crater row',
      d: 'Kerið is one of a line of craters along a fissure; several others are visible from the road.' }
  ],
  when: 'Year round. Twenty minutes is enough.',
  stay: 'Thirty minutes.',
  move: 'Beside route 35 on the Golden Circle, an hour from Reykjavík.',
  eat: 'Nothing. Selfoss or Flúðir.'
},

'SUL-hveragerdi': {
  intro: [
    'Hveragerði sits directly on a high-temperature geothermal field, which is why there is steam coming out of the ground in the public park in the middle of the town and why the greenhouses here grow bananas. It is the only place in Europe that has ever produced them commercially, in small quantities, mostly for research.',
    'In May 2008 a magnitude 6.3 earthquake struck. Nobody was killed, which says something about Icelandic building standards, but the ground cracked, new hot springs opened in the town including one in a garden, and the geothermal field shifted.',
    'It is also the nearest substantial town to Reykjavík on the ring road south and the trailhead for Reykjadalur, the hot river valley, which is the best short walk in the southwest.'
  ],
  see: [
    { n: 'The geothermal park',
      d: 'In the middle of the town, with boiling springs, a steam vent and eggs boiled for visitors in a hot spring. Small fee.' },
    { n: 'The 2008 earthquake crack',
      d: 'A fissure preserved under glass in the Skyrgerðin building, which you can look down into.' },
    { n: 'The greenhouses',
      d: 'Several open, growing tomatoes, flowers and the famous bananas, all heated and lit geothermally.' },
    { n: 'Reykjadalur',
      d: 'The hot river walk, starting from the car park above the town.' },
    { n: 'Kambar',
      d: 'The pass above the town on the ring road, with a viewpoint over the whole southern lowland and a weather station that closes the road regularly.' },
    { n: 'Listasafn Árnesinga',
      d: 'A good regional art museum with free entry, which is unusual.' }
  ],
  when: 'Year round. It is forty minutes from Reykjavík and makes an easy half day.',
  stay: 'Half a day.',
  move: 'Forty minutes from Reykjavík on the ring road. Buses run.',
  eat: 'Several good places including a bakery, and the greenhouse restaurants nearby.'
},

'SUL-reykjadalur': {
  intro: [
    'Reykjadalur means smoky valley and the smoke is steam. A geothermal field at the head of the valley feeds hot springs into a stream, and a few kilometres down it has cooled to about thirty-eight degrees, which is exactly bathing temperature. You lie in a river in the mountains.',
    'The walk in is about three kilometres and three hundred metres of ascent from the car park above Hveragerði, through a valley with steam vents and mud pots on the slopes either side. It takes forty-five minutes to an hour and the last stretch is the best part of it.',
    'Boardwalks and screens were installed after the number of visitors became a problem for the vegetation and for modesty. Upstream is hotter and downstream is cooler, so you choose your spot by walking along the bank and putting a hand in.'
  ],
  see: [
    { n: 'The walk in',
      d: 'Three kilometres, uphill, muddy in wet weather. Proper footwear; people attempt it in trainers and regret it.' },
    { n: 'The river',
      d: 'Boardwalk and low screens along the bathing stretch. Upstream is hotter. Do not go above the boardwalked section; it is scalding.' },
    { n: 'Winter',
      d: 'Entirely possible and arguably better: snow on the banks and steam everywhere. The path can be icy and crampons help.' },
    { n: 'The geothermal field',
      d: 'Above the bathing area, with mud pots and vents. Stay on the path.' },
    { n: 'What to bring',
      d: 'A towel, a bag for wet things, and warm layers for afterwards. There are no changing facilities beyond the screens.' },
    { n: 'The return',
      d: 'Downhill and quicker, with the whole southern plain in front of you.' }
  ],
  when: 'Year round. Summer evenings are least crowded; winter needs care on the path.',
  stay: 'Three to four hours including the walk both ways.',
  move: 'Car park above Hveragerði, forty-five minutes from Reykjavík.',
  eat: 'Nothing on the walk. Hveragerði at the bottom.'
},

'VSL-snaefellsnes': {
  intro: [
    'Snæfellsnes is a peninsula ninety kilometres long with a glacier-capped volcano at the western end, and the nickname Iceland in miniature is for once accurate rather than promotional: in one day you can see a glacier, a lava field, a black beach, a bird cliff, a fishing village, a waterfall and a crater.',
    'Snæfellsjökull is the volcano, 1,446 metres, with an ice cap that has shrunk sharply and in the warm summer of 2012 disappeared entirely for the first time in recorded history. Jules Verne used it as the entrance to the centre of the earth in 1864, which is why there is a plaque, and it has attracted a certain amount of new-age attention since.',
    'The national park covers the western tip and the whole peninsula is drivable in a long day from Reykjavík, which many people do. Staying a night at Arnarstapi, Hellnar or Grundarfjörður is considerably better.'
  ],
  see: [
    { n: 'Snæfellsjökull',
      d: 'Guided snowcat and walking trips to the summit in summer. The ice is thin and crevassed and independent ascent is for the equipped.' },
    { n: 'Djúpalónssandur and Dritvík',
      d: 'A black pebble beach with the wreck of a British trawler and four lifting stones used to test fishermen.' },
    { n: 'Arnarstapi to Hellnar',
      d: 'Two and a half kilometres of coastal path past arches, blowholes and fulmar colonies, which is the best short walk on the peninsula.' },
    { n: 'Kirkjufell',
      d: 'The arrowhead mountain at Grundarfjörður, with Kirkjufellsfoss in front of it.' },
    { n: 'Ytri Tunga',
      d: 'A beach on the south coast with a reliable harbour seal haul-out, best around low tide.' },
    { n: 'Búðir',
      d: 'A black wooden church of 1848 standing alone on a lava field, which is on a great many photographs and is still a working church.' }
  ],
  when: 'Year round. Summer for the glacier and the birds; winter for the light and the aurora, with roads that can close.',
  stay: 'Two nights.',
  move: 'A car. Two and a half hours from Reykjavík to the southern side, with a tunnel under Hvalfjörður.',
  eat: 'Fish in the villages. Bjargarsteinn at Grundarfjörður and the Hellnar cafe are both good.'
},

'VSL-kirkjufell': {
  intro: [
    'Kirkjufell is four hundred and sixty-three metres of layered rock standing alone beside the fjord at Grundarfjörður, shaped like an arrowhead from the road and like a church spire from the sea, which is where the name comes from.',
    'Geologically it is a stack of lava and sedimentary layers from several ice ages, shaped by glaciers passing on both sides, which is why the layering is so visible. It has been climbed since the nineteenth century and the route is steep, loose and has killed people; two died in 2018 and guiding is now strongly advised.',
    'It became the most photographed mountain in Iceland because of the waterfall. Kirkjufellsfoss is a small three-tier fall two hundred metres from the road on the other side of the river, and from one specific spot it lines up in front of the mountain. Game of Thrones used it as the arrowhead mountain north of the Wall, which doubled the traffic again.'
  ],
  see: [
    { n: 'Kirkjufellsfoss',
      d: 'The car park is across the road from the mountain. The path to the alignment is short and heavily used; stay on it.' },
    { n: 'The aurora',
      d: 'North-facing with the mountain in the foreground, which is the standard Icelandic aurora photograph.' },
    { n: 'Midnight sun',
      d: 'In June the sun sets behind the mountain and the light lasts most of the night.' },
    { n: 'Climbing it',
      d: 'Three hours up and down with two roped sections. Guided only unless you know what you are doing; the rock is loose and the exposure is real.' },
    { n: 'Grundarfjörður',
      d: 'The town below, a working fishing port, with orca in the fjord in winter when the herring are in.' },
    { n: 'The car park',
      d: 'Charged and small. In summer it overflows onto the road, which is a known problem.' }
  ],
  when: 'Year round. Winter for the aurora, summer for the midnight sun. Orca in the fjord from January to March.',
  stay: 'An hour, or a night in Grundarfjörður.',
  move: 'On route 54 beside Grundarfjörður, two and a half hours from Reykjavík.',
  eat: 'Grundarfjörður has a couple of good places, including one in an old house by the harbour.'
},

'VSL-arnarstapi': {
  intro: [
    'Arnarstapi and Hellnar are two small settlements on the southern shore of the Snæfellsnes peninsula, two and a half kilometres apart, joined by a coastal path that runs along a shore of columnar basalt that the sea has turned into arches, stacks and blowholes.',
    'Arnarstapi was a trading post from the sixteenth century. Above it is a large stone figure of Bárður Snæfellsás, a half-troll from a medieval saga who is the guardian spirit of the peninsula, built by the sculptor Ragnar Kjartansson in 1985.',
    'Hellnar at the other end has a cafe on the shore and a church, and a cave called Baðstofa where the light through the opening changes colour through the day. The whole walk takes about forty-five minutes each way and it is the best short coastal walk in Iceland.'
  ],
  see: [
    { n: 'The coastal path',
      d: 'Forty-five minutes each way along the cliff edge. Fulmars nesting on the stacks and the sea going through the arches below.' },
    { n: 'Gatklettur',
      d: 'The stone arch at Arnarstapi, which frames the sea and is the photograph everyone takes.' },
    { n: 'The blowholes',
      d: 'Several along the path. In a swell they roar and throw spray onto the path.' },
    { n: 'The Bárður statue',
      d: 'A stacked-stone figure above the harbour, facing the glacier.' },
    { n: 'Hellnar',
      d: 'The far end, with Fjöruhúsið, a cafe on the rocks that does a very good fish soup, open in summer.' },
    { n: 'Rauðfeldsgjá',
      d: 'A narrow cleft in the mountain nearby that you can walk into along a stream, which closes to a slot and is genuinely eerie.' }
  ],
  when: 'Year round. The path is exposed and can be dangerous in high wind.',
  stay: 'Two hours.',
  move: 'A car on route 574, two and a half hours from Reykjavík.',
  eat: 'Fjöruhúsið at Hellnar in summer. Arnarstapi has a restaurant at the hotel.'
},

'VSL-djupalonssandur': {
  intro: [
    'Djúpalónssandur is a beach of black pebbles rounded by the sea, in a cove below a lava field at the western tip of the peninsula. There were once sixty fishing boats working out of Dritvík next door, which makes it hard to picture now.',
    'Scattered along the sand are the rusted remains of the Epine GY7, a British trawler from Grimsby that was wrecked here in a storm in March 1948 with the loss of fourteen of the nineteen crew. The wreckage has been left where it came ashore as a memorial and is not to be removed.',
    'There are also four lifting stones on the shore, used to test whether a man could be taken on as a crewman. Fullsterkur, full strength, is a hundred and fifty-four kilos; Hálfsterkur, half strength, a hundred; Hálfdrættingur, weakling, fifty-four; and Amlóði, useless, twenty-three. Lifting the weakling onto a waist-high ledge was the minimum.'
  ],
  see: [
    { n: 'The lifting stones',
      d: 'Still there and still lifted. Hálfdrættingur at fifty-four kilos is the one most visitors try and most fail.' },
    { n: 'The wreck',
      d: 'Rusted plates and ribs across the sand. A memorial rather than a curiosity; leave it alone.' },
    { n: 'The beach',
      d: 'Black pebbles polished round by the sea. Taking them is discouraged and widely ignored.' },
    { n: 'The rock formations',
      d: 'On the walk down from the car park, with arches and a small pool called Djúpalón.' },
    { n: 'The waves',
      d: 'This is open Atlantic and the beach shelves. Stay well back from the water; people have been taken off it.' },
    { n: 'Dritvík',
      d: 'A short walk further, the old fishing station, with the foundations of the booths visible in the grass.' }
  ],
  when: 'Year round. Exposed and often windy.',
  stay: 'An hour.',
  move: 'A car on route 574 in the national park, three hours from Reykjavík.',
  eat: 'Nothing. Hellissandur or Hellnar.'
},

'VSL-stykkisholmur': {
  intro: [
    'Stykkishólmur is the main town on the northern side of Snæfellsnes, built around a natural harbour sheltered by a basalt island, with timber houses from the nineteenth century painted in strong colours. It was a trading post from 1550 and several of the merchant houses survive.',
    'The church on the hill, finished in 1990, is a white concrete building that looks like a whale rib cage or a ship, depending on who you ask, and it has unusually good acoustics which are used for concerts.',
    'The Library of Water is the odd one. Roni Horn installed twenty-four glass columns in a former library in 2007, each filled with meltwater from a different Icelandic glacier, standing in a room with a rubber floor and windows over the fjord. Several of those glaciers have since shrunk substantially and one has been declared dead.'
  ],
  see: [
    { n: 'Library of Water',
      d: 'Twenty-four columns of glacier meltwater in a bright room above the harbour. Quiet, strange and increasingly elegiac.' },
    { n: 'Súgandisey',
      d: 'The basalt island sheltering the harbour, joined by a causeway, with a lighthouse and a view over Breiðafjörður.' },
    { n: 'Breiðafjörður boat trips',
      d: 'Among the islands, with a dredge pulled up on deck and scallops and sea urchins eaten raw straight out of it.' },
    { n: 'The Norwegian House',
      d: 'An 1832 merchant house, the first two-storey building in Iceland, now a museum furnished to the period.' },
    { n: 'The ferry to the Westfjords',
      d: 'Baldur crosses Breiðafjörður to Brjánslækur, calling at Flatey, which saves a long drive round.' },
    { n: 'Flatey',
      d: 'A tiny island with about five summer residents and a handful in winter, no cars, painted houses and the oldest library building in Iceland.' }
  ],
  when: 'May to September. The ferry runs year round with a reduced winter schedule.',
  stay: 'A night.',
  move: 'A car, two and a quarter hours from Reykjavík.',
  eat: 'Narfeyrarstofa and Sjávarpakkhúsið, both doing local fish and scallops.'
},

'VSL-hraunfossar': {
  intro: [
    'Hraunfossar is not a waterfall in the usual sense. The Hallmundarhraun lava field sits on top of an impermeable layer, and groundwater moving through the porous lava reaches the edge of it above the Hvítá and seeps out across about nine hundred metres of frontage, falling into the river in hundreds of separate rivulets.',
    'Because the water has filtered through lava rather than running off a glacier it is clear rather than silty, and it comes out pale blue against black rock and autumn birch. There is no single fall to look at; the whole cliff face is leaking.',
    'Barnafoss, a hundred metres upstream, is a violent chute through a narrow channel. The name means children’s falls, from a story about two children who fell from a natural stone arch here and drowned, after which their mother had the arch destroyed.'
  ],
  see: [
    { n: 'The viewing platforms',
      d: 'Two, giving the full width of the seepage. Best in autumn when the birch on the lava turns orange.' },
    { n: 'Barnafoss',
      d: 'A short walk upstream, where the river is forced through a slot and churns. Entirely different in character.' },
    { n: 'Víðgelmir',
      d: 'A lava tube fifteen minutes away, one of the largest in the world, with a guided walk on a raised path.' },
    { n: 'Surtshellir',
      d: 'Another cave in the same lava field, unlit and unguided, associated with outlaws. Helmet and torch required and it is genuinely rough.' },
    { n: 'Deildartunguhver',
      d: 'Twenty-five minutes away, the highest-flow hot spring in Europe.' },
    { n: 'Reykholt',
      d: 'Where Snorri Sturluson lived and was murdered in 1241, with his bathing pool still there, fed by a hot spring.' }
  ],
  when: 'Year round. Autumn for the colour, winter for ice on the seepage.',
  stay: 'An hour.',
  move: 'A car, ninety minutes from Reykjavík via Borgarnes.',
  eat: 'A cafe at the car park. Reykholt and Húsafell nearby.'
},

'VSL-vidgelmir': {
  intro: [
    'Víðgelmir is a lava tube in the Hallmundarhraun field, formed around the year 900 when the outside of a lava flow cooled and solidified while the molten rock inside drained out, leaving a tunnel. It is about a kilometre and a half long and up to sixteen metres high, which makes it one of the largest in the world by volume.',
    'Human remains and artefacts from around the tenth century were found inside, including bones, beads and a wooden spoon, which suggests it was used as a shelter, probably by people with reasons to avoid being found.',
    'It was closed for years to protect the formations after souvenir hunters broke a great deal of it. It reopened with a raised walkway, lighting and compulsory guiding, which is the right arrangement: the ice formations at the far end in winter are intact because nobody can reach them.'
  ],
  see: [
    { n: 'The guided walk',
      d: 'About ninety minutes on a raised metal walkway with helmets and lamps provided. The only access.' },
    { n: 'The ice formations', t: 'winter and spring',
      d: 'At the far end, where water seeping in freezes into columns and sheets. Gone by late summer.' },
    { n: 'The lava colours',
      d: 'Red and orange oxidation on the walls where gas escaped, and smooth rope-like floor where the last flow drained.' },
    { n: 'The archaeology',
      d: 'The shelter remains are explained on the tour; the objects are in a museum.' },
    { n: 'The temperature',
      d: 'Constant and cold. Take a proper layer; people do the tour in a T-shirt and suffer.' },
    { n: 'Surtshellir',
      d: 'Nearby, free, unlit and unmaintained, which is the opposite experience and requires proper gear.' }
  ],
  when: 'Year round. Winter and spring for the ice. Booking required.',
  stay: 'Two hours including the drive in.',
  move: 'A gravel road off route 518 past Húsafell, two hours from Reykjavík.',
  eat: 'Húsafell has a restaurant and a pool.'
},

'VSL-borgarnes': {
  intro: [
    'Egil’s Saga is set here. Skallagrímur Kveldúlfsson, Egil’s father, settled at Borg around 884, and Egil himself was a poet, a mercenary, a killer by the age of seven and the most psychologically complicated figure in the sagas. The mound in the town is traditionally where he buried his son Böðvar, after which he shut himself in to starve and was talked out of it by his daughter, who got him to compose a poem about his grief instead.',
    'That poem, Sonatorrek, is in the saga, and whether Egil existed or not it is one of the earliest pieces of personal grief writing in any European vernacular.',
    'The Settlement Centre in two restored warehouses by the harbour tells the settlement of Iceland in one exhibition and Egil’s Saga in another, both on audio guides, and it is the best introduction to the sagas available anywhere in the country.'
  ],
  see: [
    { n: 'The Settlement Centre',
      d: 'Two exhibitions, each about half an hour on an audio guide. The saga one is a genuinely good piece of storytelling.' },
    { n: 'Skallagrímsgarður',
      d: 'The park with the burial mound of Egil’s father in the middle of the town.' },
    { n: 'Borg á Mýrum',
      d: 'The farm site two kilometres out, with a church and an Ásmundur Sveinsson sculpture called Sonatorrek, representing the poem.' },
    { n: 'The bridge',
      d: 'Over the Borgarfjörður estuary, which is long, low and gives the whole fjord and the Snæfellsnes mountains.' },
    { n: 'Hvalfjörður',
      d: 'The fjord south, now bypassed by a tunnel, with Glymur, the second-highest waterfall in Iceland, at the head of it.' },
    { n: 'The position',
      d: 'Borgarnes is the junction for the west, the Westfjords and the north, which is why everybody stops here.' }
  ],
  when: 'Year round. An hour from Reykjavík.',
  stay: 'Half a day.',
  move: 'A car, an hour from Reykjavík through the Hvalfjörður tunnel.',
  eat: 'The Settlement Centre restaurant is good. There is also a well-known bakery and a geothermal bakery nearby that bakes rye bread in the ground.'
},

'VSL-deildartunguhver': {
  intro: [
    'Deildartunguhver puts out around a hundred and eighty litres a second at ninety-seven degrees, which makes it the highest-flow hot spring in Europe by a considerable margin. It is not a geyser; it simply boils up continuously out of a bank of rock covered in a rare fern.',
    'Almost all of that water is used. It is piped to Borgarnes, thirty-four kilometres away, and to Akranes, sixty-four kilometres, which is one of the longest hot water pipelines in the world. The water arrives at the far end still at around seventy-eight degrees.',
    'The fern growing on the bank, Asplenium scolopendrium, the hart’s tongue, grows nowhere else in Iceland and survives here only because of the heat.'
  ],
  see: [
    { n: 'The spring',
      d: 'A boardwalk along the bank with the water boiling out of it, and a great deal of steam. Five minutes.' },
    { n: 'The pipeline',
      d: 'Explained on the signs. The engineering of moving ninety-seven degree water sixty-four kilometres is the interesting part.' },
    { n: 'Krauma',
      d: 'Baths beside the spring, mixing the hot water with glacial melt from Ok, which is the only cooling needed.' },
    { n: 'The fern',
      d: 'On the bank, protected, and the only population in the country.' },
    { n: 'Reykholt',
      d: 'Five minutes away: Snorri Sturluson’s farm, his bathing pool and a medieval studies centre.' },
    { n: 'Hraunfossar',
      d: 'Twenty-five minutes further up the valley.' }
  ],
  when: 'Year round. Cold days for the steam.',
  stay: 'Twenty minutes, or two hours with the baths.',
  move: 'A car on route 50, ninety minutes from Reykjavík.',
  eat: 'Krauma has a restaurant. The tomato greenhouse at Hverabakki nearby sells produce.'
},

'VSL-krauma': {
  intro: [
    'Krauma opened in 2017 beside Deildartunguhver and its selling point is a two-ingredient recipe: ninety-seven degree water from the spring, cooled with glacial meltwater from Ok, and nothing else. No chlorine, no chemicals, and the water is fully exchanged continuously rather than recirculated.',
    'Ok is the ice cap that was formally declared dead in 2014, having shrunk from about sixteen square kilometres in 1901 to under one and lost the mass needed to move as a glacier. A plaque was installed on it in 2019 addressed to the future, which is the first monument of its kind anywhere.',
    'There are five pools at different temperatures, a cold tub fed directly from the meltwater at around five degrees, two steam rooms and a relaxation room with a fire and blankets. It is small, quiet and the opposite of the Blue Lagoon in scale.'
  ],
  see: [
    { n: 'The pools',
      d: 'Five, stepped in temperature, facing the valley. Smaller and calmer than the big lagoons.' },
    { n: 'The cold tub',
      d: 'Glacial meltwater at around five degrees, straight in. Alternating with the hot pools is the point of the design.' },
    { n: 'The relaxation room',
      d: 'Reclining chairs, a fire and blankets, which is where people end up for longer than they intend.' },
    { n: 'Deildartunguhver',
      d: 'Two minutes away, which is where the water comes from, and worth seeing first.' },
    { n: 'Ok',
      d: 'The source of the cold water, and a glacier that no longer exists. The story is worth knowing while sitting in the result.' },
    { n: 'Booking',
      d: 'Advisable but less critical than the bigger lagoons. Capacity is small and it rarely sells out entirely.' }
  ],
  when: 'Year round. Winter afternoons when it is dark by four.',
  stay: 'Two to three hours.',
  move: 'A car, ninety minutes from Reykjavík, beside Deildartunguhver.',
  eat: 'A restaurant on site using local lamb and the Borgarfjörður dairy.'
},

'VSL-eldborg': {
  intro: [
    'Eldborg is a scoria crater on a lava plain on the southern side of Snæfellsnes, about sixty metres high and two hundred across at the rim, formed in an eruption somewhere between five and eight thousand years ago. It is a textbook example of the form: a near-perfect oval ring built from the material its own fountain threw out.',
    'The lava field around it, Eldborgarhraun, covers about eleven square kilometres and is thickly mossed, which is how old lava looks in Iceland and which means walking on it off the path does damage that takes decades to repair.',
    'The walk in is about two and a half kilometres each way from the farm at Snorrastaðir, flat through birch scrub and over the lava, and then a short steep scramble to the rim. The crater is deep enough that standing on the edge is genuinely striking and almost nobody goes.'
  ],
  see: [
    { n: 'The crater rim',
      d: 'A path right round it, with the inside dropping steeply and the Snæfellsnes mountains and the sea on the other side.' },
    { n: 'The walk in',
      d: 'Two and a half kilometres each way, waymarked, through birch and over mossed lava. Boots rather than trainers; the lava is uneven.' },
    { n: 'The moss',
      d: 'Stay on the marked route. Icelandic woolly fringe moss takes decades to recover from a footprint.' },
    { n: 'Gerðuberg',
      d: 'Ten minutes away, a cliff of columnar basalt running for several hundred metres beside the road, free and usually empty.' },
    { n: 'Ytri Tunga',
      d: 'The seal beach, fifteen minutes further west.' },
    { n: 'The quiet',
      d: 'This is on the main road round the peninsula and almost nobody stops, which given what it is remains surprising.' }
  ],
  when: 'May to October. The path is boggy in spring.',
  stay: 'Two and a half hours including the walk.',
  move: 'A car, park at Snorrastaðir farm off route 54, two hours from Reykjavík.',
  eat: 'Nothing. Borgarnes or the Snæfellsnes villages.'
},

'VFJ-dynjandi': {
  intro: [
    'Dynjandi falls a hundred metres down a stepped rock face that widens as it drops, from about thirty metres at the top to sixty at the base, which gives it the bridal-veil shape that makes it the most recognisable waterfall in the Westfjords. The name means thunderous and it is audible from the car park.',
    'Below it a series of six smaller falls step down the slope: Hæstajallafoss, Strompgljúfrafoss, Göngumannafoss, Hrísvaðsfoss, Hundafoss and Bæjarfoss. The path up passes each one and the whole walk takes about fifteen minutes.',
    'It sits at the head of Arnarfjörður, which is one of the longest fjords in the country, and the road in crosses a high bare pass. That pass was gravel and frequently impassable until recent years; the tarmac has changed access to this part of the Westfjords substantially.'
  ],
  see: [
    { n: 'The walk up',
      d: 'Fifteen minutes past the six lower falls to the base of the main one, where the spray reaches you.' },
    { n: 'The base',
      d: 'Walk right up under the widest part. The noise and the scale are the point and photographs do not carry either.' },
    { n: 'The fjord view',
      d: 'From the top of the path, looking back down Arnarfjörður, which on a still day is a mirror.' },
    { n: 'The road over Dynjandisheiði',
      d: 'The pass behind, bare and high, which is one of the more spectacular drives in Iceland and is closed in winter.' },
    { n: 'Hrafnseyri',
      d: 'Twenty minutes away, the birthplace of Jón Sigurðsson, who led the campaign for Icelandic independence, with a turf house and a museum.' },
    { n: 'The midnight sun',
      d: 'Arnarfjörður faces northwest and in June the light on the fall at midnight is extraordinary.' }
  ],
  when: 'June to September. The pass is usually closed from October or November until May.',
  stay: 'An hour and a half.',
  move: 'A car. Three hours from Ísafjörður or five from Reykjavík via the ferry or the long road round.',
  eat: 'Nothing. There are toilets at the car park and nothing else for a long way.'
},

'VFJ-latrabjarg': {
  intro: [
    'Látrabjarg is fourteen kilometres of cliff rising to four hundred and forty metres, the westernmost point of Iceland and arguably of Europe depending on how you treat the Azores. It holds one of the largest seabird colonies in the world: razorbills in particular, with something close to forty per cent of the global population nesting here.',
    'The puffins on the clifftop are famously approachable, because they were never hunted at the top where the nests are easy to reach, and will sit a metre or two away. That has produced a great many photographs of people lying on their stomachs at the edge of a four-hundred-metre drop, which is how people die here.',
    'The cliff edge is undercut turf. It overhangs, it has no rock beneath it, and it gives way. Stay back from the lip, lie down well behind it if you must, and do not let the birds’ tameness make you forget what is below.'
  ],
  see: [
    { n: 'The puffins', t: 'late May to mid-August',
      d: 'On the grassy top, extremely close. Stay back from the edge; the turf overhangs and has collapsed under people.' },
    { n: 'The razorbills',
      d: 'In enormous numbers on the ledges. The colony is globally significant and the noise is continuous.' },
    { n: 'The cliff walk',
      d: 'A path runs several kilometres along the top from the lighthouse. The further you go the fewer people and the higher the cliff.' },
    { n: 'The 1947 rescue',
      d: 'A British trawler went aground below the cliff and local farmers lowered themselves on ropes to bring the crew up. They filmed a re-enactment afterwards because nobody had filmed the real thing.' },
    { n: 'Rauðasandur',
      d: 'Forty minutes back, the pink and gold sand beach, which is the other reason to come to this corner.' },
    { n: 'The drive',
      d: 'The last fifty kilometres are gravel and slow. Allow far more time than the distance suggests.' }
  ],
  when: 'Late May to mid-August for the birds. Outside that the cliff is empty and the road may be impassable.',
  stay: 'Three hours.',
  move: 'A car, two hours from Patreksfjörður on gravel. The Baldur ferry from Stykkishólmur shortens the approach considerably.',
  eat: 'Nothing at the cliff. Breiðavík guesthouse, forty minutes back, is the nearest.'
},

'VFJ-isafjorour': {
  intro: [
    'Ísafjörður has about twenty-six hundred people and is the capital of the Westfjords, built on a sand spit curving into a fjord with mountains rising seven hundred metres directly on both sides. The spit is why it is there: it made a harbour.',
    'It has the oldest cluster of buildings in Iceland. Four eighteenth-century timber warehouses stand together in Neðstikaupstaður, the oldest from 1734, built of driftwood and imported timber, and one of them now holds the maritime museum.',
    'The isolation shaped it. Until the tunnel to Suðureyri opened in 1996 the towns around here were cut off from each other for parts of every winter, and the avalanche risk is permanent: Flateyri, half an hour away, lost twenty people to an avalanche in 1995 and now sits behind enormous earth deflection barriers that are visible from everywhere in the town.'
  ],
  see: [
    { n: 'Neðstikaupstaður',
      d: 'The four eighteenth-century buildings, with the maritime museum in Turnhús and Tjöruhúsið, a restaurant in another, which is the best fish in the Westfjords.' },
    { n: 'The mountains',
      d: 'Several marked routes straight up from the town, including Naustahvilft, the troll seat, a steep hour to a glacial cirque above the airport.' },
    { n: 'Flateyri and the avalanche barriers',
      d: 'Half an hour away, with the A-shaped deflection dams above the village and a memorial to the 1995 dead.' },
    { n: 'The Westfjords Heritage Museum',
      d: 'Fishing gear, accordions and a serious collection on the history of a region that lost half its population in a century.' },
    { n: 'Hornstrandir',
      d: 'Boats leave from here in summer for the reserve, which is the main reason many people are in Ísafjörður at all.' },
    { n: 'Aldrei fór ég suður', t: 'Easter',
      d: 'A free rock festival held in a fish factory since 2004, which fills the town. The name means I never went south.' }
  ],
  when: 'June to September. Winter is possible and the roads close regularly.',
  stay: 'Two nights.',
  move: 'Flights from Reykjavík, which are spectacular and frequently cancelled. By road it is six hours from Reykjavík, or the Baldur ferry plus a long drive.',
  eat: 'Tjöruhúsið, a fish restaurant in an eighteenth-century warehouse serving whatever was landed that day, which is among the best meals in Iceland.'
},

'VFJ-hornstrandir': {
  intro: [
    'Hornstrandir is the northern tip of the Westfjords, about five hundred and eighty square kilometres, and the last permanent residents left in 1952. The farms were too remote, the winters too hard and the sea too unreliable, and the whole peninsula was depopulated over about two decades.',
    'It became a nature reserve in 1975. There are no roads, no mobile coverage in most of it, no shops and no services of any kind. You arrive by boat, you carry everything, and you walk out to meet the boat on a prearranged date.',
    'Because nobody lives there and hunting has been banned since 1994, the Arctic foxes are unafraid of people. They come into camp, follow walkers and sit watching from a few metres away, which is not normal fox behaviour anywhere else and is the single most memorable thing about the place.'
  ],
  see: [
    { n: 'Hornbjarg',
      d: 'A cliff of five hundred and thirty-four metres at the northern tip, with a vast seabird colony and a ridge walk above it.' },
    { n: 'The Arctic foxes',
      d: 'Unhunted for thirty years and entirely unafraid. Do not feed them; they are already too comfortable.' },
    { n: 'Hesteyri',
      d: 'An abandoned village with a doctor’s house now run as a guesthouse in summer, serving pancakes, which is the usual first or last stop.' },
    { n: 'The passes',
      d: 'Routes between fjords cross high ground that holds snow into July and where the weather turns without warning. Navigation skills are required.' },
    { n: 'The boat',
      d: 'From Ísafjörður or Bolungarvík, scheduled in summer only, and cancellations happen. Build spare days into any plan.' },
    { n: 'What to carry',
      d: 'Everything: tent, food, stove, map, compass and a means of calling for help. There is no resupply and no shelter.' }
  ],
  when: 'Late June to late August only. Boats do not run outside that and the passes are snowbound.',
  stay: 'Three to six days.',
  move: 'Boat from Ísafjörður, Bolungarvík or Norðurfjörður. Book the outward and return legs together.',
  eat: 'Carry it. Hesteyri serves coffee and pancakes in summer and that is the entire catering on the peninsula.'
},

'VFJ-raudasandur': {
  intro: [
    'Rauðasandur is ten kilometres of beach on the southern coast of the Westfjords, and it is not black. The sand ranges from pale gold through pink to deep red depending on the light and the tide, and it is made from the crushed shells of a scallop that lives offshore, rather than from volcanic rock.',
    'The colour changes constantly. On an overcast day it is a dull pink; in low evening sun it is orange and red; at low tide the wet sand reflects the sky and the whole bay goes silver. People who have seen it twice often disagree about what colour it is.',
    'Getting there involves a steep gravel road with hairpins down from the Bjargtangar road, which deters a good proportion of visitors and which is why a ten-kilometre beach can be close to empty in July.'
  ],
  see: [
    { n: 'The beach at low tide',
      d: 'The sand bar runs a long way out and a lagoon forms behind it. Walking out onto it is the thing. Check the tide.' },
    { n: 'The light',
      d: 'Evening, with the sun low from the west, is when the red is strongest.' },
    { n: 'Saurbær church',
      d: 'A small black church above the beach, from 1982 on a much older site, associated with a seventeenth-century murder case that became a famous Icelandic novel.' },
    { n: 'The seals',
      d: 'A haul-out at the eastern end of the beach, usually visible at low tide.' },
    { n: 'The road down',
      d: 'Steep gravel with switchbacks. Passable in a two-wheel drive in summer with care and not in winter.' },
    { n: 'Látrabjarg',
      d: 'Forty minutes further west, which is the usual pairing.' }
  ],
  when: 'June to September. The road is not maintained in winter.',
  stay: 'Two hours.',
  move: 'A car down a steep gravel road off route 612, an hour from Patreksfjörður.',
  eat: 'A small cafe at the beach in summer, in a converted farm building.'
},

'VFJ-patreksfjorour': {
  intro: [
    'Patreksfjörður is the largest town in the southern Westfjords with about six hundred and sixty people, named after Saint Patrick, who was reportedly the spiritual guide of the settler who arrived here. It is the base for Látrabjarg and Rauðasandur and the two are the main reason to be in this part of the region.',
    'The fjord was a major fishing port and the first Icelandic trawler operated from here in 1905. The industry contracted sharply with the quota system introduced in the 1980s, which is the central fact of recent Westfjords history: quotas became tradeable, were bought up and consolidated, and villages that had fished for centuries lost the right to.',
    'Up the fjord at the head is the Garðar BA 64, a steel ship beached in 1981 and left there, now rusted through and sitting on the sand, which has become the most photographed object in the southern Westfjords.'
  ],
  see: [
    { n: 'Garðar BA 64',
      d: 'Beached at Skápadalur, Iceland’s oldest steel ship, rusting on the shore. Free, unfenced, and do not climb on it.' },
    { n: 'The pool',
      d: 'On the hillside above the town looking down the fjord, which is one of the better-sited pools in Iceland.' },
    { n: 'Látrabjarg and Rauðasandur',
      d: 'Both within an hour or two on gravel roads. This is the base for them.' },
    { n: 'Dynjandi',
      d: 'Two hours north over the pass.' },
    { n: 'Hnjótur Museum',
      d: 'A one-man collection of fishing and rescue equipment, including material on the 1947 trawler rescue at Látrabjarg, with a Douglas DC-3 outside.' },
    { n: 'The Baldur ferry',
      d: 'Arriving at Brjánslækur an hour east, which cuts hours off the drive from the south.' }
  ],
  when: 'June to September. Winter access to the southern Westfjords is limited.',
  stay: 'Two nights.',
  move: 'A car. The Baldur ferry from Stykkishólmur to Brjánslækur is the sensible approach.',
  eat: 'A couple of places in the town, including a bakery and a fish restaurant by the harbour.'
},

'VFJ-hellulaug': {
  intro: [
    'Hellulaug is a small stone-lined pool at the edge of Vatnsfjörður, a few metres above the high-water mark, fed by a hot spring and holding about thirty-eight degrees. There is no building, no attendant and no changing room: a hollow in the rock, a view across the fjord, and an honour box.',
    'This is the Westfjords version of a geothermal pool and there are several of them along this coast. Reykjafjarðarlaug nearby has a concrete pool and a natural hot pot above it; Pollurinn at Tálknafjörður has three tubs on a hillside; Krossneslaug at the far end of Strandir is a proper swimming pool on a black beach at the end of the road.',
    'None of them is marketed. They are maintained by the local community, they cost a few hundred krónur in a box, and the etiquette is to wash before getting in, leave it clean and put the money in.'
  ],
  see: [
    { n: 'Hellulaug',
      d: 'Beside route 62 at Flókalundur, a few metres from the road and easy to drive past. Thirty-eight degrees with the fjord at your feet.' },
    { n: 'Reykjafjarðarlaug',
      d: 'Twenty minutes away, a concrete pool fed by the spring and a natural hot pot on the bank above it, which is the hotter and better of the two.' },
    { n: 'Pollurinn',
      d: 'At Tálknafjörður, three tubs on a hillside above the fjord, free, with a changing hut.' },
    { n: 'Krossneslaug',
      d: 'On the far eastern side of the Westfjords at the end of the road in Strandir, a swimming pool on a black beach facing the Arctic.' },
    { n: 'The etiquette',
      d: 'Rinse before getting in, take your rubbish, and put money in the box. These exist because people behave.' },
    { n: 'Vatnsfjörður',
      d: 'A nature reserve around the pool, with birch woodland, which is rare in the Westfjords.' }
  ],
  when: 'Year round where the roads are open. Winter in a hot pool on a fjord shore is the best version.',
  stay: 'An hour.',
  move: 'Beside route 62 at Flókalundur, near the Brjánslækur ferry terminal.',
  eat: 'Flókalundur has a small hotel and restaurant in summer.'
},

'VFJ-krossneslaug': {
  intro: [
    'Krossneslaug is a twenty-five metre concrete swimming pool built in 1954 on a black beach at Norðurfjörður, at the end of the road in Strandir, with the Greenland Sea in front of it and nothing between there and the Arctic. It is fed by a hot spring that rises behind the pool.',
    'Getting there is the point. The Strandir coast runs north from Hólmavík on a road that deteriorates steadily, through villages that are mostly empty, and ends at Norðurfjörður. Beyond that there is Hornstrandir and no road at all.',
    'It is maintained by the local community and run on an honour box. There is a changing hut, no attendant and no lighting, which means that on a clear winter night the aurora over the pool happens in complete darkness, and that on a June night the sun does not set behind it.'
  ],
  see: [
    { n: 'The pool',
      d: 'Twenty-five metres plus a hot pot, on a black beach, facing north. Honour box payment and you take your own rubbish.' },
    { n: 'The drive up Strandir',
      d: 'Two and a half hours from Hólmavík, increasingly rough, past Djúpavík and Gjögur. The road is the attraction.' },
    { n: 'Djúpavík',
      d: 'A vast abandoned herring factory from 1935 in a tiny village, with a hotel in the old workers’ quarters and summer tours of the plant.' },
    { n: 'The aurora',
      d: 'No light within many kilometres and north-facing. Among the best aurora baths in Iceland.' },
    { n: 'Hornstrandir boats',
      d: 'Summer services run from Norðurfjörður into the reserve, which is the eastern approach.' },
    { n: 'The Sorcery Museum',
      d: 'At Hólmavík on the way up, on Icelandic witchcraft trials, which were unusual in that almost all the accused were men.' }
  ],
  when: 'June to September for the road. Winter access to Norðurfjörður is unreliable and sometimes impossible.',
  stay: 'A night at Norðurfjörður or Djúpavík.',
  move: 'A car. Five hours from Reykjavík, the last two on gravel.',
  eat: 'Djúpavík hotel and a small shop at Norðurfjörður. Nothing else for a long way.'
},

'VFJ-drangsnes': {
  intro: [
    'Drangsnes is a village of about sixty people on the Strandir coast, and set into the sea wall in the middle of it are three hot tubs, open to anybody, free, with a changing hut across the road. They look out over Húnaflói to the mountains on the far side.',
    'The arrangement is entirely informal. You cross the road from the shed, get in, and watch the sea. Eider ducks are usually in the water a few metres away and seals come past.',
    'Offshore is Grímsey, a different island from the famous one in the north, with a large puffin colony and summer boat trips. The rock stack beside the village, Kerling, is said to be a troll woman who was trying to separate the Westfjords from the mainland and was caught by the sunrise.'
  ],
  see: [
    { n: 'The sea wall hot tubs',
      d: 'Three of them, free, with a changing hut opposite. Rinse first, leave it as you found it. Open all hours.' },
    { n: 'Grímsey',
      d: 'Boat trips in summer to the island with a puffin colony and an eider farm.' },
    { n: 'Kerling',
      d: 'The troll stack on the shore south of the village, with the story on a sign.' },
    { n: 'Hólmavík',
      d: 'Half an hour south, with the Museum of Icelandic Sorcery and Witchcraft and its necropants, which is an exhibit people do not forget.' },
    { n: 'The drive north',
      d: 'Strandir continues to Djúpavík and Norðurfjörður, increasingly remote.' },
    { n: 'The seals',
      d: 'Common along this coast and often visible from the tubs.' }
  ],
  when: 'Year round where the road is open. Summer for the boat to Grímsey.',
  stay: 'An hour, or a night.',
  move: 'A car on route 645 off the Strandir road, four hours from Reykjavík.',
  eat: 'A small restaurant in the village in summer.'
},

'VFJ-vigur': {
  intro: [
    'Vigur is a small island in Ísafjarðardjúp, about two kilometres long, with one farm on it that has been worked by the same family for generations. It holds the only working windmill in Iceland, built in 1840 to grind imported grain, and Iceland’s smallest post office.',
    'The farm still harvests eider down, which is one of the last places in the world where it is done traditionally. Eider ducks line their nests with down plucked from their own breasts; the farmers take it after the ducklings leave, clean it by hand, and it sells for a very large amount per kilo. The ducks are protected and encouraged, and there are around seven thousand nests on the island.',
    'There are also thousands of Arctic terns, which nest on the ground and defend their nests by diving at the top of your head. Visitors are handed a stick to hold above themselves, which works, and which is also comic to watch.'
  ],
  see: [
    { n: 'The terns',
      d: 'Take the stick. They aim for the highest point and will draw blood from a bare scalp.' },
    { n: 'The eider operation',
      d: 'Explained on the tour: the nests, the down collection and the cleaning. A kilo takes about sixty nests and several days of work.' },
    { n: 'The windmill',
      d: 'From 1840, the only one in Iceland, restored and standing above the farm.' },
    { n: 'The puffins',
      d: 'A large colony on the island’s edges, with burrows close to the path.' },
    { n: 'The rowing boat',
      d: 'An eight-oar boat from around 1830, one of the oldest in Iceland, kept in a shed.' },
    { n: 'Coffee at the farm',
      d: 'Included in the tour, in the farmhouse, with cake. The tour is run by the family.' }
  ],
  when: 'June to August only, when the boats run and the birds are in.',
  stay: 'Three hours including the boat.',
  move: 'Boat from Ísafjörður, about forty minutes each way, running daily in summer.',
  eat: 'Coffee and cake at the farm, included.'
},

'VFJ-sudavik-arctic-fox': {
  intro: [
    'The Arctic fox is the only land mammal that was in Iceland before people arrived. It walked in over the sea ice at the end of the last glaciation and has been here ever since, which gives it around ten thousand years of isolation and two colour morphs: white in winter and brown, and a blue form that stays dark all year and is far more common here than elsewhere.',
    'It has been hunted continuously since settlement, with a bounty, because it takes lambs and eider ducklings. The population is now somewhere around eight to ten thousand and it is protected only in Hornstrandir, where hunting stopped in 1994 and the foxes have become extraordinarily tame as a result.',
    'The centre in Súðavík is a research station as well as a small museum, running the long-term monitoring of the population, and it sits in a restored house in a village that was moved after an avalanche killed fourteen people in January 1995.'
  ],
  see: [
    { n: 'The exhibition',
      d: 'On the biology, the hunting and the research, in two floors of an old house. Small, serious and the only place in Iceland devoted to the animal.' },
    { n: 'The orphaned cubs',
      d: 'The centre has sometimes kept cubs that could not be released, in an outdoor enclosure. Availability varies by year.' },
    { n: 'The avalanche history',
      d: 'The old village site is a memorial park. The new village was built on safer ground and the story is told in the centre.' },
    { n: 'Hornstrandir',
      d: 'Where the unhunted foxes are, and where the centre’s research is done.' },
    { n: 'The research',
      d: 'One of the longer-running predator monitoring programmes in the Arctic, with data going back decades.' },
    { n: 'Ísafjörður',
      d: 'Twenty minutes away round the fjord.' }
  ],
  when: 'May to September for full opening. Reduced hours in winter.',
  stay: 'An hour.',
  move: 'A car on route 61, twenty minutes from Ísafjörður.',
  eat: 'A cafe at the centre in summer.'
},

'NWI-hvitserkur': {
  intro: [
    'Hvítserkur is a fifteen-metre basalt stack standing in the shallows off the Vatnsnes peninsula, with two holes eroded through its base so that it appears to stand on legs. Depending on the angle it looks like a dragon drinking, an elephant, or a rhinoceros, and local tradition makes it a troll caught by the sun while trying to pull down the bells of a monastery.',
    'It is a volcanic plug, the remains of a vent, which is why it is harder than everything that used to be around it. The base has been reinforced with concrete because the sea was undercutting it and it would otherwise have fallen over.',
    'The name means white shirt and comes from the guano: the top is covered in it from the fulmars and shags that nest on the stack, which is the sort of unromantic explanation Icelandic place names usually have.'
  ],
  see: [
    { n: 'The stack at low tide',
      d: 'You can walk out onto the sand and right up to it. Check the tide; at high water it stands in the sea.' },
    { n: 'From the clifftop',
      d: 'A viewing platform above the beach, which is the standard view, with a steep path down.' },
    { n: 'Sunrise and sunset',
      d: 'It faces west, so sunset silhouettes it. In midsummer the sun barely sets and the light lasts for hours.' },
    { n: 'The seals at Ósar',
      d: 'A haul-out a few minutes away, with a viewing area, which is among the most reliable in Iceland.' },
    { n: 'The Vatnsnes road',
      d: 'Route 711 round the peninsula, gravel, slow, with seal haul-outs at Illugastaðir and Svalbarð.' },
    { n: 'The Icelandic Seal Center',
      d: 'At Hvammstangi, with the biology and the long and complicated relationship between Icelanders and seals.' }
  ],
  when: 'Year round. The road round the peninsula is gravel and can be rough in winter.',
  stay: 'An hour.',
  move: 'A car on route 711 off the ring road, two and a half hours from Reykjavík.',
  eat: 'Nothing. Hvammstangi has a good fish restaurant.'
},

'NWI-glaumbaer': {
  intro: [
    'Glaumbær is a turf farm of thirteen connected buildings under grass roofs, lived in until 1947, now a museum left furnished as it was. It is the best surviving example of the Icelandic turf building tradition, which was how almost everyone in the country lived from settlement until the twentieth century.',
    'The construction is the interesting part. There is very little wood in Iceland and no building stone that can be worked easily, so houses were built of turf blocks cut in a herringbone pattern over a timber frame of driftwood and imported beams. They are warm, they last around fifty to seventy years, and then they have to be rebuilt.',
    'The layout is a passage with rooms off it, ending in the baðstofa: a single room where the whole household slept, ate and worked, with beds along both walls and sometimes the livestock below to provide heat. Fifteen or twenty people in one room through an Icelandic winter.'
  ],
  see: [
    { n: 'The baðstofa',
      d: 'The communal room at the end, with the beds, the spinning and the single window. This is the room that explains Icelandic social history.' },
    { n: 'The turf construction',
      d: 'Visible in section at the entrances: herringbone blocks, two layers thick, with the timber frame inside.' },
    { n: 'The kitchen and the pantry',
      d: 'With a hearth, smoked meat hanging and barrels of whey, which is how food was preserved before salt was affordable.' },
    { n: 'Áshús',
      d: 'A timber house of 1886 in the same grounds, now a cafe serving Icelandic cakes, which shows what replaced the turf.' },
    { n: 'Guðríður Þorbjarnardóttir',
      d: 'A statue on the site of a woman from this district who sailed to Vinland around the year 1000, had a child there, and later walked to Rome. She is reckoned to have travelled further than any woman of her era.' },
    { n: 'Skagafjörður',
      d: 'The valley around, which is the horse-breeding centre of Iceland.' }
  ],
  when: 'May to September for full opening, with limited winter hours.',
  stay: 'An hour and a half.',
  move: 'A car just off the ring road, three hours from Reykjavík.',
  eat: 'Áshús on site does very good traditional cakes and pancakes.'
},

'NWI-drangey': {
  intro: [
    'Drangey is a tuff island standing two hundred metres out of Skagafjörður, with vertical sides and a flat grassy top, formed from a volcanic vent about seven hundred thousand years ago. The only way up is a fixed route with chains and ladders on the one climbable face.',
    'Grettir Ásmundarson, the outlaw of Grettis saga, lived here for his last three years with his brother and a slave, because it was the one place in Iceland where he could not be surprised. The saga says the fire went out and he swam seven kilometres to the mainland for more, bathed in a hot pool on arriving, and swam back. The pool, Grettislaug, is still there and you can get in it.',
    'It was a vital food source for the farms around the fjord. Men were lowered on ropes to take seabirds and eggs, and the island was reckoned to feed twenty households. Puffin, guillemot and kittiwake are still there in large numbers.'
  ],
  see: [
    { n: 'The climb',
      d: 'Chains and ladders on a steep face, with a guide, about forty minutes up. Not for anyone uneasy about exposure.' },
    { n: 'The top',
      d: 'A flat grassy plateau with the whole of Skagafjörður around it, and the bird cliffs dropping away on all sides.' },
    { n: 'Grettislaug',
      d: 'A stone hot pool on the shore at Reykir, where the boats leave, which is where Grettir supposedly warmed up. Free and usable.' },
    { n: 'The birds',
      d: 'Puffins, guillemots, razorbills and kittiwakes in very large numbers from May to August.' },
    { n: 'The boat',
      d: 'From Reykir, with the guide who takes you up. Summer only and weather dependent.' },
    { n: 'The saga',
      d: 'Worth reading first. Grettir is the most sympathetic of the Icelandic outlaws and the ending happens on this rock.' }
  ],
  when: 'May to August. The boats do not run outside that.',
  stay: 'Four hours including the boat and the climb.',
  move: 'Boat from Reykir in Skagafjörður, booked ahead. Four hours from Reykjavík by road.',
  eat: 'Nothing on the island. Sauðárkrókur is half an hour away.'
},

'NWI-saudarkrokur': {
  intro: [
    'Skagafjörður is the horse valley. More Icelandic horses are bred here than in any other district, the national horse championships are held here, and the number of horses in the valley exceeds the number of people by a comfortable margin.',
    'The Icelandic horse has been genetically isolated since the tenth century, when the Alþingi banned imports, and a horse that leaves the country can never return. That isolation preserved a fifth gait, the tölt, a four-beat running walk which is fast and so smooth that riders demonstrate it holding a full glass.',
    'The other thing the valley does is whitewater. The Austari-Jökulsá is a glacial river running through a canyon with grade four rapids, which is the most serious commercially rafted water in the country, and the Vestari-Jökulsá is gentler and suits families.'
  ],
  see: [
    { n: 'Riding',
      d: 'Several farms take out groups, from an hour to multi-day trips. Ask specifically to be shown the tölt.' },
    { n: 'Rafting the Austari-Jökulsá',
      d: 'Grade four, a full day, in a basalt canyon. Operators run from Varmahlíð and it is genuinely demanding.' },
    { n: 'Sauðárkrókur',
      d: 'The town, with about twenty-six hundred people, a fish-leather tannery and the only Icelandic brewery outside the southwest.' },
    { n: 'Hólar',
      d: 'A bishop’s seat from 1106 until 1801, with a stone cathedral of 1763 and now a university with a horse science department.' },
    { n: 'The horse championships',
      d: 'Landsmót is held every two years at varying venues, with Skagafjörður a regular host, and it is the largest horse event in Iceland.' },
    { n: 'Drangey and Glaumbær',
      d: 'Both within half an hour.' }
  ],
  when: 'June to September for riding and rafting.',
  stay: 'Two nights.',
  move: 'A car, four hours from Reykjavík on the ring road.',
  eat: 'Sauðárkrókur has a good bakery and a restaurant on the harbour. The valley does its own dairy and lamb.'
},

'NWI-hofsos': {
  intro: [
    'Hofsós is a village of about a hundred and sixty people on the eastern shore of Skagafjörður, which has been a trading post since the sixteenth century and which has one of the oldest buildings in Iceland, a Danish merchant warehouse from 1777.',
    'In 2010 the village built a twenty-five metre infinity-edge swimming pool on the slope above the shore, funded by two Icelandic businesswomen. The far edge is at eye level when you are in the water, so you swim towards the fjord with Drangey and the mountains of the far shore in the view and nothing in between.',
    'It has become one of the most photographed pools in the world, which is a strange outcome for a village this size, and it is still a village pool: locals use it, there are hot pots at the side, and the entry costs what any Icelandic pool costs.'
  ],
  see: [
    { n: 'The pool',
      d: 'Swim towards the fjord. The infinity edge works best from the far end looking out, and the light in the evening is the reason to come then.' },
    { n: 'The Emigration Centre',
      d: 'On Icelandic emigration to North America between 1870 and 1914, when around twenty per cent of the population left. Several buildings, and a genealogy service for descendants.' },
    { n: 'Pakkhúsið',
      d: 'The 1777 warehouse on the shore, one of the oldest timber buildings in the country.' },
    { n: 'The basalt columns',
      d: 'On the shore below the village, a small formation at Staðarbjargavík, free and usually empty.' },
    { n: 'The view to Drangey',
      d: 'From the pool and the shore, with Málmey and Þórðarhöfði as well.' },
    { n: 'The emigration context',
      d: 'Worth understanding. A fifth of the country leaving in forty years, driven by volcanic winter, failed harvests and a shortage of land.' }
  ],
  when: 'Year round. The pool is open all year and winter evenings are the best time.',
  stay: 'Two hours.',
  move: 'A car on route 76, four and a half hours from Reykjavík.',
  eat: 'A cafe at the Emigration Centre in summer.'
},

'NWI-blonduos': {
  intro: [
    'Blönduós sits where the Blanda reaches the sea, on the ring road, with about eight hundred and seventy people. The church, finished in 1993, is a concrete building whose shape is based on an Icelandic volcanic crater, which is either striking or alarming depending on the angle.',
    'The town is the gateway to the Vatnsnes peninsula, which has one of the most reliable seal populations in Iceland. The haul-outs at Illugastaðir and Svalbarð have viewing platforms and the seals are visible most days at low tide, which in a country where wildlife is often a matter of patience is unusual.',
    'There is also a textile museum holding one of the better collections of Icelandic needlework, and a somewhat unexpected sea ice exhibition about the years when drift ice from Greenland reached the north coast and cut the country off.'
  ],
  see: [
    { n: 'The seals at Illugastaðir',
      d: 'A walk from a farm car park to a hide on the shore. Low tide is best and the farm charges a small fee.' },
    { n: 'The Vatnsnes road',
      d: 'Route 711 round the peninsula, mostly gravel, with Hvítserkur at the far end and haul-outs along the way.' },
    { n: 'The Textile Museum',
      d: 'Icelandic embroidery, the national costume and a collection built by one woman over decades.' },
    { n: 'The Sea Ice Exhibition Centre',
      d: 'At Hvammstangi nearby, on the Greenland drift ice that used to close the north coast, which is now rare and was once routine.' },
    { n: 'The church',
      d: 'Crater-shaped concrete on the hill, from 1993, which divides opinion locally.' },
    { n: 'Hrútey',
      d: 'An island in the river joined by a footbridge, with birch and birds, in the middle of the town.' }
  ],
  when: 'May to September for the seals, which pup in June. The peninsula road is rough in winter.',
  stay: 'Half a day.',
  move: 'On the ring road, two and a half hours from Reykjavík.',
  eat: 'A couple of places on the ring road. Hvammstangi has a better fish restaurant.'
},

'NWI-kolugljufur': {
  intro: [
    'Kolugljúfur is a gorge about a kilometre long and twenty-five metres deep on the Víðidalsá, with a double waterfall at the head of it, a few minutes off the ring road and signposted barely at all.',
    'It is named for Kola, a troll woman who by the story lived in the gorge, slept in a hollow in the rock and fished salmon out of the river with her hands. Her bed is pointed out, as is the pool where she washed.',
    'There is a footbridge across the gorge and paths on both sides. Nobody is there. It is twenty minutes from a road that every visitor to the north of Iceland drives along, and on most days you will have the whole thing to yourself, which for a gorge of this quality is remarkable.'
  ],
  see: [
    { n: 'Kolufossar',
      d: 'The double fall at the head of the gorge, best from the bridge and from the path on the western side.' },
    { n: 'The gorge',
      d: 'Paths run along both rims. The eastern side gives the better angle on the falls and the western the better view down the gorge.' },
    { n: 'The bridge',
      d: 'A single-lane road bridge crossing at the top of the falls, which you can stand on.' },
    { n: 'Kola’s bed',
      d: 'A hollow in the rock below the falls, identified on the sign.' },
    { n: 'The salmon',
      d: 'The Víðidalsá is a serious salmon river and the beats are expensive. The fish are visible in the pools in summer.' },
    { n: 'The emptiness',
      d: 'Which is the main argument for going. Most people drive straight past.' }
  ],
  when: 'May to October. The track in can be muddy in spring.',
  stay: 'An hour.',
  move: 'A car on route 715 off the ring road, two and three quarter hours from Reykjavík.',
  eat: 'Nothing. Blönduós or Hvammstangi.'
},

'NWI-kalfshamarsvik': {
  intro: [
    'Kálfshamarsvík is a small bay at the northern tip of the Skagi peninsula where the basalt has cooled into columns arranged in fans and rosettes rather than straight vertical pipes, which happens when the lava cools from several directions at once.',
    'There was a village here from the 1870s until around 1940, a fishing settlement of a hundred or so people. The foundations are in the grass with a plan board showing which house was which, and a lighthouse of 1939 stands above the bay. The decline was the usual one: the fishing moved to larger boats and larger ports and everyone left.',
    'The Skagi peninsula is one of the least visited parts of the north. There is a single road round it, a lot of lakes and bog, almost no settlement, and a great many birds.'
  ],
  see: [
    { n: 'The columns',
      d: 'In fans and curved formations on the bay walls, reached down a short path from the lighthouse.' },
    { n: 'The village foundations',
      d: 'In the grass above the bay, with a board identifying the houses and the families.' },
    { n: 'The lighthouse',
      d: 'From 1939, orange, on the point, with the Greenland Sea beyond.' },
    { n: 'The Skagi road',
      d: 'Route 745 round the peninsula, long, empty and mostly gravel, with lakes full of birds.' },
    { n: 'The birds',
      d: 'Red-throated divers, phalaropes and waders on the lakes, with very few people to disturb them.' },
    { n: 'Hvítserkur',
      d: 'On the next peninsula west, which the two together make a long day.' }
  ],
  when: 'June to September. The peninsula road is not a winter proposition.',
  stay: 'An hour.',
  move: 'A car on route 745, an hour from Blönduós on gravel.',
  eat: 'Nothing. Skagaströnd has a shop and a restaurant.'
},

'NEI-myvatn': {
  intro: [
    'Mývatn is a shallow lake of about thirty-seven square kilometres, nowhere deeper than four and a half metres, sitting in a volcanic basin on the plate boundary. Everything around it is geology happening at an unusual rate: pseudocraters, lava pillars, a collapsed lava lake, steaming ground, and a fissure system that erupted nine times between 1975 and 1984.',
    'The name means midge lake and the midges are the ecosystem. They hatch in enormous numbers from the lake bed, feed the fish and an unusual density of breeding ducks, and are the reason this small lake has more species of breeding duck than anywhere else in Europe. Most do not bite; the ones that do are blackflies and they do it properly.',
    'The pseudocraters at Skútustaðir are not volcanoes. They formed when lava flowed over wet ground, the water flashed to steam and blew through the flow, which produced craters with no magma conduit beneath them. They are rare on earth and have been identified on Mars.'
  ],
  see: [
    { n: 'Dimmuborgir',
      d: 'A collapsed lava lake left as a field of pillars and arches, with marked loops from fifteen minutes to an hour.' },
    { n: 'Hverir',
      d: 'Boiling mud and roaring steam vents on ochre ground at the foot of Námafjall, a few minutes east. The smell is considerable.' },
    { n: 'Skútustaðagígar',
      d: 'The pseudocraters on the southern shore, with a path over them, and ducks on the ponds between.' },
    { n: 'Mývatn Nature Baths',
      d: 'The northern answer to the Blue Lagoon, looking over a lava field towards the lake.' },
    { n: 'Hverfjall',
      d: 'A tephra crater a kilometre across and a hundred and forty metres high, with a steep path to the rim and a walk round the top.' },
    { n: 'The birds',
      d: 'Fifteen species of breeding duck including harlequin and Barrow’s goldeneye, the latter found nowhere else in Europe.' }
  ],
  when: 'June to August for birds, with the midges at their worst in June and July. Head nets are sold locally and are not a joke. Winter is quiet and good for aurora.',
  stay: 'Two nights.',
  move: 'A car on the ring road, about an hour from Akureyri.',
  eat: 'Geysir bread, a rye loaf baked for twenty-four hours in the hot ground, served with butter and smoked trout.'
},

'NEI-dettifoss': {
  intro: [
    'Dettifoss is a hundred metres wide and forty-four high, carrying on average around a hundred and ninety-three cubic metres a second, which makes it the most powerful waterfall in Europe by flow. The water is grey with glacial silt from Vatnajökull and the spray is visible from a kilometre away.',
    'It sits in Jökulsárgljúfur, a canyon cut by a series of catastrophic glacial outburst floods rather than by steady erosion, which is why the walls are so sheer and the canyon so wide relative to the current river.',
    'There are two sides and they are a long way apart. The eastern side, on road 864, is gravel and gives the classic head-on view. The western side, on road 862, is paved, has better facilities and gets you closer to the lip. Ridley Scott filmed the opening of Prometheus on the western side.'
  ],
  see: [
    { n: 'The western side',
      d: 'Paved road, a short walk, and a viewpoint right at the lip where the spray soaks you. Open year round in principle.' },
    { n: 'The eastern side',
      d: 'Gravel road 864, closed in winter, with the head-on view and far fewer people.' },
    { n: 'Selfoss',
      d: 'A kilometre upstream, wider and lower, horseshoe-shaped, which many people prefer.' },
    { n: 'Hafragilsfoss',
      d: 'A kilometre downstream, in the canyon, with a viewpoint on the eastern side.' },
    { n: 'The canyon walk',
      d: 'Thirty-four kilometres from Dettifoss to Ásbyrgi over two days, through Hljóðaklettar and Hólmatungur, which is the best multi-day walk in the north.' },
    { n: 'The noise',
      d: 'Audible long before you see it. Standing at the lip, you feel it through the rock.' }
  ],
  when: 'June to September for both sides. The eastern road closes in winter and the western is sometimes impassable.',
  stay: 'Two hours.',
  move: 'A car off the ring road, about an hour and a half from Mývatn.',
  eat: 'Nothing. Mývatn or Ásbyrgi.'
},

'NEI-akureyri': {
  intro: [
    'Akureyri has about nineteen thousand people, which makes it the second city of Iceland and roughly a seventh the size of Reykjavík. It sits at the head of Eyjafjörður, the longest fjord in the country at sixty kilometres, sheltered enough that trees grow here properly.',
    'The botanical garden, founded in 1912, is the proof: it holds around four hundred Icelandic species and several thousand foreign ones, many of which should not survive at sixty-five degrees north and do, because the fjord shelters the town and the summers are warmer and sunnier than the south.',
    'The traffic lights have red hearts instead of red circles, which was done in 2008 during the financial crisis as a small civic gesture and was never undone. It is the kind of detail that tells you the scale of the place.'
  ],
  see: [
    { n: 'The Botanical Garden',
      d: 'Free, open from June, with a cafe. The fact that this grows here at all is the exhibit.' },
    { n: 'Akureyrarkirkja',
      d: 'Guðjón Samúelsson again, 1940, concrete, with a stained glass window from Coventry Cathedral that was removed before the bombing and ended up here by a circuitous route.' },
    { n: 'The pool',
      d: 'Two outdoor pools, water slides and several hot tubs, which is the best municipal pool outside Reykjavík.' },
    { n: 'Hlíðarfjall',
      d: 'The ski area above the town, the main one in Iceland, with a season from December to April and skiing in daylight that gets very short in midwinter.' },
    { n: 'Christmas House',
      d: 'Open year round, selling Christmas decorations in July, which is as odd as it sounds and is a local institution.' },
    { n: 'The fjord',
      d: 'Whale watching from Akureyri and from Hauganes and Dalvík further out, with humpbacks reliable in summer.' }
  ],
  when: 'June to August for the garden and the whales. December to April for skiing. The north is drier and sunnier than the south in summer.',
  stay: 'Two nights.',
  move: 'Flights from Reykjavík in forty-five minutes, or five hours by road on the ring road.',
  eat: 'A good restaurant scene for the size, including a long-established fish place and an Icelandic brewery.'
},

'NEI-husavik': {
  intro: [
    'Húsavík has about twenty-three hundred people and it is the whale capital of Iceland, with sighting rates above ninety-five per cent through the summer in Skjálfandi bay. The bay is fed by two glacial rivers and the nutrient mix supports a food chain that humpbacks come back to every year.',
    'Whale watching started here in 1995 with one boat. There are now several operators, some using traditional oak fishing boats and at least one using a silent electric vessel, and the town’s economy was substantially rebuilt around it after the fishing quotas moved away.',
    'Blue whales are seen in the bay most summers, which is unusual anywhere, and the Húsavík Whale Museum in an old slaughterhouse has full skeletons of several species including a blue whale suspended from the roof.'
  ],
  see: [
    { n: 'Whale watching', t: 'April to October, peak June to August',
      d: 'Three hours in the bay. Humpbacks are near certain in high summer, with minke, white-beaked dolphins and occasional blues and fins.' },
    { n: 'The Whale Museum',
      d: 'Full skeletons, including a twenty-two metre blue whale, with good material on strandings and on Icelandic whaling.' },
    { n: 'GeoSea',
      d: 'Geothermal sea baths on the cliff above the harbour, opened in 2018, looking out over the bay. You may see whales from the water.' },
    { n: 'The church',
      d: 'A wooden church of 1907 in a cruciform plan, which is the town’s landmark and unusual in Iceland for being timber.' },
    { n: 'Eurovision',
      d: 'The 2020 film set a song here and the town has leaned into it with a small exhibition. Icelanders find this funny.' },
    { n: 'The Exploration Museum',
      d: 'On human exploration, including the Apollo astronauts who trained in the lava fields nearby in 1965 and 1967.' }
  ],
  when: 'June to August for whales. April and October have fewer boats and fewer whales.',
  stay: 'Two nights.',
  move: 'A car, an hour from Akureyri or ninety minutes from Mývatn.',
  eat: 'Fish at the harbour. Naustið does a very good plokkfiskur, which is a fish and potato mash that is the Icelandic comfort food.'
},

'NEI-asbyrgi': {
  intro: [
    'Ásbyrgi is a horseshoe-shaped canyon three and a half kilometres long and about a kilometre wide, with walls up to a hundred metres, and a rock island called Eyjan standing in the middle of the open end. The floor is wooded with birch and willow, which in Iceland is unusual enough to be remarked on.',
    'The geological explanation is a jökulhlaup: a catastrophic glacial outburst flood from under Vatnajökull, probably in two events eight and three thousand years ago, which carved the canyon in a matter of days as the river temporarily took this course.',
    'The folk explanation is that Odin’s eight-legged horse Sleipnir put a hoof down here. A third version holds that it is the capital city of the hidden people, who live in the cliffs, which a significant number of Icelanders will tell you with a straight face and a slight smile.'
  ],
  see: [
    { n: 'Botnstjörn',
      d: 'A small pond at the closed end under the hundred-metre cliff, reached on a flat walk through the wood. The acoustics in there are extraordinary.' },
    { n: 'Eyjan',
      d: 'The rock island in the middle, with a path onto the top and a view down the whole canyon.' },
    { n: 'Áshöfði',
      d: 'A longer walk up onto the rim with the canyon and the coastal plain.' },
    { n: 'The woodland',
      d: 'Birch, rowan and planted conifer, which is as close to a forest as most of Iceland gets.' },
    { n: 'The canyon walk',
      d: 'The two-day route up Jökulsárgljúfur to Dettifoss starts here, with huts and a campsite at Vesturdalur partway.' },
    { n: 'Hljóðaklettar',
      d: 'Partway along that route, a cluster of basalt formations in rosettes and spirals called the echo rocks, which is the strangest rock formation in the north.' }
  ],
  when: 'June to September for the full walks. The campsite is open in summer only.',
  stay: 'Half a day, or a night at the campsite.',
  move: 'A car on route 85, an hour from Húsavík.',
  eat: 'A small shop and cafe at the visitor centre in summer.'
},

'NEI-godafoss': {
  intro: [
    'Goðafoss is twelve metres high and thirty wide, split round a central rock into two main channels, on the Skjálfandafljót a few minutes off the ring road. The name means the waterfall of the gods.',
    'The story attached to it is that in the year 1000, when the Althing accepted Christianity, the lawspeaker Þorgeir Ljósvetningagoði went home and threw his carved figures of the Norse gods into the falls. The sagas record the conversion and Þorgeir’s role in it; the detail about the idols appears later and may be a tidy invention, which does not stop it being told at the car park.',
    'It is one of the easiest major falls in Iceland to visit, with paths on both banks, parking on both sides and a short walk from either. That accessibility means it is busy, but the volume of water is enough that it absorbs a crowd.'
  ],
  see: [
    { n: 'The western bank',
      d: 'Paths to several levels, including one down near the water that gives the sense of scale, with the visitor building and a cafe.' },
    { n: 'The eastern bank',
      d: 'The classic broadside view with both channels, reached from its own car park off the ring road.' },
    { n: 'Geitafoss',
      d: 'A smaller fall a few hundred metres downstream, reached on a path from the eastern side, usually empty.' },
    { n: 'The bridge',
      d: 'The ring road bridge above the falls, from which the river above looks startlingly calm.' },
    { n: 'The rainbow',
      d: 'In afternoon sun on the western side, reliably, because the spray is constant.' },
    { n: 'Winter',
      d: 'The edges freeze into ice walls and the paths are gritted. Early darkness and a lit fall can be better than summer.' }
  ],
  when: 'Year round. June to August for long light, February and March for ice.',
  stay: 'An hour.',
  move: 'A car on the ring road, forty minutes from Akureyri and thirty from Mývatn.',
  eat: 'A cafe and a petrol station at the western car park.'
},

'NEI-myvatn-nature-baths': {
  intro: [
    'Mývatn Nature Baths opened in 2004 and is the northern counterpart to the Blue Lagoon: alkaline geothermal water, a milky blue colour, in a shallow lagoon on a ridge of lava with the lake and the mountains in front of you.',
    'The water comes from the National Power Company borehole at Bjarnarflag, arriving at about a hundred and thirty degrees and cooled in a holding basin before it reaches the lagoon at thirty-six to forty. It is high in minerals and alkaline enough that bacteria and vegetation do not thrive in it, which is why there is no chlorine.',
    'It is a fraction of the size and the price of the Blue Lagoon and has roughly a tenth of the visitors. Two steam baths are built over fissures, so the steam comes straight out of the ground rather than from a boiler.'
  ],
  see: [
    { n: 'The lagoon',
      d: 'Thirty-six to forty degrees, with a shallower warm end and a hotter corner near the inflow.' },
    { n: 'The steam baths',
      d: 'Two cabins over natural fissures, around fifty degrees at a hundred per cent humidity, which is a shorter sit than you expect.' },
    { n: 'The view',
      d: 'West over the lava towards Mývatn and the hills. At the right time of year this is where you watch the sun not quite set.' },
    { n: 'The aurora',
      d: 'From September to March, lying in the water facing north, with the lagoon lighting kept low.' },
    { n: 'The cafe',
      d: 'Soup and sandwiches on the deck above the lagoon.' },
    { n: 'Bjarnarflag',
      d: 'The borehole and power station just along the road, with steam venting beside the ring road.' }
  ],
  when: 'Year round. Book ahead in July and August. Winter afternoons for the aurora.',
  stay: 'Two hours.',
  move: 'A car, five minutes from Reykjahlíð on the ring road.',
  eat: 'The cafe on site, or Vogafjós at Mývatn for the geysir bread and farm dairy.'
},

'NEI-dimmuborgir': {
  intro: [
    'Dimmuborgir is a field of lava pillars, arches and hollow towers on the eastern side of Mývatn, formed about two thousand three hundred years ago when a lava lake pooled over wet ground, the water flashed to steam and punched vents through the crust, and the lake then drained away leaving the chimneys standing.',
    'The name means the dark fortresses or the dark cities, and the folklore puts Satan’s landing site here after he was thrown out of heaven. The Yule Lads and their mother Grýla, a troll who in the older stories eats badly behaved children, are also said to live here, which is now the subject of a cheerful December programme for families.',
    'Marked loops run from fifteen minutes to about an hour. Staying on them matters: the formations are fragile and the moss between them takes decades to recover from a boot.'
  ],
  see: [
    { n: 'Kirkjan',
      d: 'The church, a tall open arch of lava that you walk through, which is the one formation everyone photographs.' },
    { n: 'The short loop',
      d: 'Fifteen minutes on a gravelled path, flat, which covers the main formations.' },
    { n: 'The long loop',
      d: 'About an hour through the back of the field, rougher underfoot and much quieter.' },
    { n: 'Hverfjall',
      d: 'The tephra crater rising a kilometre to the south, with a path from near Dimmuborgir to the rim.' },
    { n: 'Grjótagjá',
      d: 'The flooded fissure cave a few minutes north, which pairs with this on one stop.' },
    { n: 'Winter',
      d: 'Snow between the pillars and low sun through the arches, with the short loop usually passable.' }
  ],
  when: 'Year round, with the long loop best June to September.',
  stay: 'An hour.',
  move: 'A car, ten minutes from Reykjahlíð.',
  eat: 'Nothing on site. Vogafjós or Reykjahlíð nearby.'
},

'NEI-hverir': {
  intro: [
    'Hverir, also called Námaskarð, is a geothermal field at the foot of Námafjall where the ground is ochre, rust and grey, mud pools boil at a steady plop and steam vents roar loudly enough to drown conversation. There is no vegetation at all, because the soil is far too acidic for anything to grow in.',
    'The ground temperature a metre down is around two hundred degrees. Sulphur was mined here from the fourteenth century until the nineteenth, shipped out through Húsavík, and used mainly for gunpowder, which made it valuable enough that the Danish crown took an interest.',
    'The smell is hydrogen sulphide and it is not subtle. It also gets into clothing, so anyone with one set of good outdoor gear should think about which jacket to wear.'
  ],
  see: [
    { n: 'The mud pools',
      d: 'Grey, thick, boiling steadily, behind rope. The crust around them is thin and people have been badly burned stepping off the path.' },
    { n: 'The fumaroles',
      d: 'Steam under pressure through pipes of yellow sulphur crust, loud enough to be heard from the car park.' },
    { n: 'The colours',
      d: 'Iron oxides and sulphur compounds giving ochre, orange, white and grey across the whole slope.' },
    { n: 'Námafjall',
      d: 'A steep path up the ridge behind, half an hour, with the field below and Mývatn to the west.' },
    { n: 'Krafla',
      d: 'The caldera and Víti crater ten minutes north on road 863, which belongs with this.' },
    { n: 'The ground',
      d: 'Stay on the marked path. The hazard here is real and signposted in several languages for a reason.' }
  ],
  when: 'Year round, on the ring road and kept open. Wind direction decides how bad the smell is.',
  stay: 'Forty minutes.',
  move: 'A car on the ring road, ten minutes east of Reykjahlíð.',
  eat: 'Nothing. Reykjahlíð.'
},

'NEI-grjotagja': {
  intro: [
    'Grjótagjá is a fissure in the lava with a cave at one end holding a pool of clear geothermal water, a few minutes east of Mývatn. The fissure runs along the plate boundary, which is visible as a step in the ground above it, with North America on one side and Eurasia on the other.',
    'People bathed here for centuries. The Krafla eruptions between 1975 and 1984 heated the water to around sixty degrees, far too hot, and it has cooled slowly since to the high forties and low fifties, which is still above a safe bathing temperature. The landowner asks people not to get in, and the request is reasonable.',
    'Game of Thrones filmed a scene here, which is why a cave on a back road at Mývatn now has a formal car park. The water is an extraordinary blue in the right light and the cave is small enough that four people make it crowded.'
  ],
  see: [
    { n: 'The main cave',
      d: 'Down a few steps, with the pool and the light from the entrance. The water is clear enough to read the bottom.' },
    { n: 'The second entrance',
      d: 'A smaller opening on the other side, lower and tighter, with a different angle on the light.' },
    { n: 'The fissure above',
      d: 'A path along the rift, which is the plate boundary in plain sight, with the drop on one side.' },
    { n: 'Stóragjá',
      d: 'A second fissure nearer Reykjahlíð, less visited, with a pool reached by a rope and a certain amount of commitment.' },
    { n: 'The temperature',
      d: 'Measured and posted. It has been drifting down for forty years and may one day be bathable again.' },
    { n: 'Hverfjall',
      d: 'Five minutes along the same road, which makes an obvious pairing.' }
  ],
  when: 'Year round. Midday light gives the colour in the cave.',
  stay: 'Half an hour.',
  move: 'A car, ten minutes from Reykjahlíð.',
  eat: 'Nothing. Reykjahlíð or Vogafjós.'
},

'NEI-krafla': {
  intro: [
    'Krafla is a caldera about ten kilometres across on the plate boundary, with a fissure system called Krafla Fires that erupted nine times between 1975 and 1984 and twenty-nine times in the eighteenth century. The last episode was close enough in time that the lava at Leirhnjúkur is still warm in places and steaming.',
    'Víti, which means hell, is an explosion crater from the 1724 eruption with a milky green lake in the bottom, about three hundred metres across, reached by a road that runs almost to the rim. There is a path round the top with the caldera on one side and Mývatn in the distance.',
    'Iceland’s first geothermal power station is here, commissioned in 1977 just as the eruptions started, which made the early years interesting. A borehole drilled in 2009 hit magma at two thousand one hundred metres, which was not the plan and produced the hottest geothermal steam ever recorded.'
  ],
  see: [
    { n: 'Víti',
      d: 'The crater and its green lake, with a loop round the rim in about forty minutes. Windy and exposed.' },
    { n: 'Leirhnjúkur',
      d: 'An hour and a half round the 1975 lava, which is black, jagged, steaming in places and still visibly new.' },
    { n: 'The power station',
      d: 'A visitor exhibition in summer on geothermal generation and on the magma borehole.' },
    { n: 'Hverir',
      d: 'Ten minutes south on the same road, which nobody visits separately.' },
    { n: 'The caldera walls',
      d: 'Visible from the Víti rim, which shows the scale of the collapse better than the map does.' },
    { n: 'The road',
      d: 'Route 863, paved, closed from roughly October to May. Check before setting off in shoulder season.' }
  ],
  when: 'June to September. The road to Víti closes with the first serious snow.',
  stay: 'Half a day.',
  move: 'A car on route 863 off the ring road, twenty minutes from Reykjahlíð.',
  eat: 'Nothing. Reykjahlíð.'
},

'NEI-siglufjorour': {
  intro: [
    'Siglufjörður sits at the end of a narrow fjord under steep mountains on the north coast, and between 1903 and 1968 it was the herring capital of the North Atlantic. Twenty-three salting stations, five factories and a summer population that swelled to ten thousand. In some years herring accounted for a fifth of Iceland’s export earnings.',
    'The herring then collapsed, comprehensively, from overfishing. The town fell to around twelve hundred people. What saved it was the Herring Era Museum, built across several original buildings including a salting station and a boathouse, which is the best industrial museum in Iceland and won a European award for it.',
    'A tunnel opened in 2010 connected the town to Ólafsfjörður, so it is now on a through route rather than at the end of a dead end, and it has become a place people stay rather than visit. The harbour has good restaurants and there is a serious ski area above the town.'
  ],
  see: [
    { n: 'The Herring Era Museum',
      d: 'Three buildings including a salting station with barrels and a boathouse with vessels. On summer weekends they salt herring on the quay in period dress.' },
    { n: 'The Folk Music Centre',
      d: 'In the house of a collector who recorded Icelandic rímur chanting in the early twentieth century, with the recordings to listen to.' },
    { n: 'The harbour',
      d: 'Working boats, with Rauðka and Hannes Boy among the best restaurants on the north coast.' },
    { n: 'Skarðsdalur',
      d: 'The ski area above the town, with a long season and a lot of snow, which is where Icelanders ski when Akureyri is crowded.' },
    { n: 'The tunnels',
      d: 'Strákar from 1967, single-lane with passing bays, and Héðinsfjörður from 2010 through empty fjord. Both say something about the engineering here.' },
    { n: 'Trolls of the North',
      d: 'A local exhibition on Icelandic folklore, which is small and does not take itself too seriously.' }
  ],
  when: 'June to August for the museum, which keeps short hours in winter. December to April for skiing.',
  stay: 'A night.',
  move: 'A car on route 76 through the tunnels, an hour and a quarter from Akureyri.',
  eat: 'The harbour restaurants, which are a genuine reason to stop rather than pass through.'
},

'NEI-vatnsnes-whales': {
  intro: [
    'Skjálfandi bay off Húsavík is the most reliable whale water in Iceland and one of the better places in Europe. Two glacial rivers feed it, the mixing is strong, and the result is a dense food chain that humpbacks return to every summer.',
    'Humpbacks are near certain from June to August, often feeding close enough that the boat cuts the engine. Minke are common, white-beaked dolphins are frequent, and blue whales are seen most summers, which is unusual anywhere in the world. Fin whales and orca appear occasionally.',
    'Operators run traditional oak boats, rigid inflatables for speed, and at least one silent electric vessel. The oak boats are slower and give out overalls; the inflatables reach the far side of the bay and take a beating in swell. Neither is better, exactly, but the choice changes the trip.'
  ],
  see: [
    { n: 'Humpbacks', t: 'June to August',
      d: 'Feeding and often breaching. Fluke dives, pectoral slaps and the occasional full breach beside the boat.' },
    { n: 'The puffins',
      d: 'Several trips call at Lundey, an island with tens of thousands of nesting puffins, until early August when they leave.' },
    { n: 'The electric boat',
      d: 'Opal, which runs without engine noise, so you hear the blow before you see it.' },
    { n: 'The oak boats',
      d: 'Converted fishing vessels from the 1950s, which is how whale watching here started in 1995 with a single boat.' },
    { n: 'Blue whales',
      d: 'Seen in most summers, usually June, the largest animal that has ever lived and a matter of real luck.' },
    { n: 'The Whale Museum',
      d: 'Worth doing before the trip, so the skeletons mean something when you see the animals.' }
  ],
  when: 'June to August is peak. April, May, September and October run fewer boats with lower rates and lower odds.',
  stay: 'Three hours for the trip.',
  move: 'Boats leave from Húsavík harbour. Book ahead in high summer.',
  eat: 'Cinnamon buns and hot chocolate on the way back in, which every operator provides and which you will want.'
},

'EST-seydisfjorour': {
  intro: [
    'Seyðisfjörður sits at the end of a seventeen-kilometre fjord with mountains a thousand metres on both sides, reached over a mountain pass that climbs to six hundred and twenty metres and is sometimes closed. About six hundred and fifty people live there.',
    'The timber houses are Norwegian. In the late nineteenth century herring merchants from Norway shipped prefabricated kit houses here, which is why a town in east Iceland looks like a town in Norway, and why the buildings are painted blue, pink, ochre and green rather than the usual corrugated grey.',
    'The street up to the blue church is painted as a rainbow, which began in 2016 as a Pride project and stayed. It has become the most photographed street in east Iceland, which is a strange fate for a small herring town, and the town seems entirely comfortable with it.'
  ],
  see: [
    { n: 'Rainbow Street',
      d: 'The painted road leading to Bláa Kirkjan, the blue timber church of 1922, which is the shot everyone comes for.' },
    { n: 'Tvísöngur',
      d: 'A Lukas Kühne sound sculpture on the hillside, five concrete domes each tuned to a note of Icelandic five-tone harmony. Sing in one and it answers.' },
    { n: 'Skálanes',
      d: 'A nature reserve down the fjord, reached on a rough track or by boat, with cliffs and a research station.' },
    { n: 'The avalanche memorial',
      d: 'For the 1885 slide that killed twenty-four people, and the 2020 landslides that destroyed buildings in the town centre.' },
    { n: 'Gufufoss',
      d: 'A waterfall beside the pass road a few kilometres above the town, with a short path to the base.' },
    { n: 'The ferry',
      d: 'The Smyril Line from Denmark via the Faroes arrives here, which makes this the only sea gate into Iceland.' }
  ],
  when: 'June to September. Road 93 over the pass closes in storms and the diversions are long.',
  stay: 'A night, and more if the weather turns.',
  move: 'A car over road 93 from Egilsstaðir, half an hour on a steep pass.',
  eat: 'Nordic, a restaurant in a restored house, and a bakery that opens early for the ferry.'
},

'EST-stuolagil': {
  intro: [
    'Stuðlagil is a canyon of basalt columns on the Jökla, in the Jökuldalur valley, and almost nobody knew it was there. The river ran grey with glacial silt and so high that the columns were underwater. The Kárahnjúkar dam, completed in 2009, diverted most of the flow for hydroelectricity, the water level dropped by several metres and turned blue-green, and a canyon appeared.',
    'The columns are among the densest basalt formations in Iceland, running along both walls in tight vertical ranks. The river below is the glacial blue that only comes from clear water over pale silt, which is to say the colour is also a consequence of the dam.',
    'There are two sides. The eastern side is a five-kilometre walk each way from Grund farm along the river to a viewpoint at water level, which is the full experience. The western side is a short walk from Klaustursel farm to a platform above the canyon, which is the quick version.'
  ],
  see: [
    { n: 'The eastern walk',
      d: 'Five kilometres each way from the Grund car park, flat, two and a half to three hours return, ending at the river among the columns.' },
    { n: 'The western platform',
      d: 'Fifteen minutes from Klaustursel over a footbridge, looking down into the canyon. Good if time is short.' },
    { n: 'Stuðlafoss',
      d: 'A waterfall over columns about two kilometres along the eastern path, which many people stop at and mistake for the destination.' },
    { n: 'The water',
      d: 'Blue-green and clearest in late summer. In spring melt it rises and greys and the columns go back under.' },
    { n: 'The sheep',
      d: 'Jökuldalur is working farmland and the paths cross it. Gates shut behind you.' },
    { n: 'The dam',
      d: 'Kárahnjúkar is up the valley, Europe’s largest concrete-faced rockfill dam, and the reason any of this is visible.' }
  ],
  when: 'June to September, with August and September giving the lowest water and the best colour.',
  stay: 'Half a day for the eastern walk.',
  move: 'A car off the ring road up Jökuldalur, about an hour from Egilsstaðir.',
  eat: 'A coffee hut at Grund in summer. Nothing else for a long way.'
},

'EST-vatnajokull-east': {
  intro: [
    'The eastern side of Vatnajökull National Park is the quiet side. Most visitors meet the icecap at Skaftafell or Jökulsárlón in the south; the eastern approaches run up long valleys from the Fljótsdalur area towards Snæfell, which at one thousand eight hundred and thirty-three metres is the highest mountain in Iceland outside the icecap itself.',
    'This is reindeer country. Reindeer were introduced from Norway in the 1770s, the eastern herds survived, and around three thousand animals now range across the highlands here, which is the only place in Iceland you see them wild.',
    'The Kárahnjúkar hydroelectric scheme is also here, which flooded the Hálslón reservoir and remains the most contested environmental decision in modern Icelandic politics. The road up to it is good, the engineering is remarkable, and the argument about what was lost under the water has not finished.'
  ],
  see: [
    { n: 'Snæfell',
      d: 'A free-standing peak of one thousand eight hundred and thirty-three metres with a hut at the base, reached on a mountain road in summer.' },
    { n: 'The reindeer',
      d: 'In the highlands in summer and lower down in winter, often visible from the roads up the valleys.' },
    { n: 'Hálslón and Kárahnjúkar',
      d: 'The reservoir and the dam, with a viewpoint, on a good road from Fljótsdalur in summer.' },
    { n: 'Hengifoss',
      d: 'In Fljótsdalur at the mouth of these valleys, which most visitors combine with a drive up.' },
    { n: 'Eyjabakkar',
      d: 'A wetland on the way to Snæfell where pink-footed geese moult in their thousands in late summer.' },
    { n: 'Lónsöruefi',
      d: 'A wilderness reserve to the south east, trackless, for experienced walkers with several days.' }
  ],
  when: 'July to early September. The mountain roads open late here and close early.',
  stay: 'Two days.',
  move: 'A four-wheel drive on the mountain roads from Egilsstaðir. Ordinary cars reach the lower valleys only.',
  eat: 'Nothing up there. Egilsstaðir.'
},

'EST-borgarfjorour-eystri': {
  intro: [
    'Borgarfjörður Eystri is a village of about a hundred people at the end of a seventy-kilometre road from Egilsstaðir, surrounded by rhyolite mountains in colours that do not look like Iceland: ochre, rose, pale green, grey-violet. The rock is rare in this quantity anywhere.',
    'Hafnarhólmi, at the harbour, is the easiest puffin colony in the country. A boardwalk and a two-storey viewing platform put you within a few metres of the burrows, with no boat, no cliff edge and no fee. The birds are there from mid April to early August.',
    'The valley is also the headquarters of the Icelandic elves. Álfaborg, a rocky knoll by the village, is held to be the home of the queen of the hidden people, and Bakkagerði church has an altarpiece by Jóhannes Kjarval showing the Sermon on the Mount delivered from Álfaborg, with the local mountains behind.'
  ],
  see: [
    { n: 'Hafnarhólmi', t: 'mid April to early August',
      d: 'Puffins at a few metres from a two-storey platform, plus kittiwakes, fulmars and eiders. Early morning and evening are busiest on the rock.' },
    { n: 'Álfaborg',
      d: 'A short climb for a view over the fjord, and the elf queen’s residence according to a tradition nobody here disowns.' },
    { n: 'The Kjarval altarpiece',
      d: 'In Bakkagerði church, painted in 1914, putting Christ on a local hill with the hidden people watching.' },
    { n: 'Stórurð',
      d: 'A hanging valley of enormous boulders and turquoise pools, a five to seven hour walk from the pass road, which is one of the great Icelandic day walks.' },
    { n: 'The Víknaslóðir trails',
      d: 'A network through the deserted inlets south of the village, with huts, through the rhyolite country.' },
    { n: 'Lindarbakki',
      d: 'A turf-roofed red house in the village, still lived in, which is photographed constantly and politely asks you to keep off the grass.' }
  ],
  when: 'Mid April to early August for puffins. July and August for Stórurð. The road is poor in winter.',
  stay: 'A night.',
  move: 'A car on road 94 from Egilsstaðir, an hour and a quarter, with a gravel pass.',
  eat: 'Álfacafé in the village, in a converted fish factory, which does soup and cake.'
},

'EST-egilsstaoir': {
  intro: [
    'Egilsstaðir has about two thousand five hundred people and is the service town of the east: the supermarket, the hospital, the airport, the ring road junction. It was founded in 1947, which by Icelandic standards makes it brand new, and it looks it.',
    'Nobody comes here for the town. They come because Lagarfljót, the long lake beside it, is the base for the whole east, and because this is where you stock up before the mountain roads. Hallormsstaðaskógur, the largest forest in Iceland, is twenty minutes down the lake.',
    'The lake has a monster. Lagarfljótsormurinn has been reported since 1345, is described as a worm-like creature of considerable length, and in 2012 a farmer’s video of something undulating in the water went round the world. A committee was convened and concluded the video was genuine, which is not the same as concluding there is a worm.'
  ],
  see: [
    { n: 'Hallormsstaðaskógur',
      d: 'Iceland’s largest forest, planted from 1903, with marked trails, an arboretum of around eighty species and a campsite under the trees.' },
    { n: 'Lagarfljót',
      d: 'A twenty-five kilometre lake with a road round it, deep, dark with glacial silt, and said to contain the worm.' },
    { n: 'Vök Baths',
      d: 'Floating geothermal pools on the lake a few minutes north, which is the reason many people stop here.' },
    { n: 'Hengifoss',
      d: 'A hundred and twenty-eight metres with red clay bands in the cliff, half an hour down the lake with an uphill walk.' },
    { n: 'The East Iceland Heritage Museum',
      d: 'Reindeer, a reconstructed turf farm interior and material on the settlement of the east.' },
    { n: 'The airport',
      d: 'Daily flights from Reykjavík in an hour, which is the sane way to reach the east if time is short.' }
  ],
  when: 'Year round. The east has the driest summers in Iceland and the warmest recorded temperatures.',
  stay: 'A night as a base.',
  move: 'Flights from Reykjavík, or the ring road. Egilsstaðir is the hub for the whole region.',
  eat: 'Supermarkets and a decent brewery taproom. Klausturkaffi at Skriðuklaustur down the lake does a very good cake buffet.'
},

'EST-vok-baths': {
  intro: [
    'Vök Baths opened in 2019 on the shore of Urriðavatn, a lake north of Egilsstaðir, and the design idea is two pools cantilevered out over the water so you are swimming in geothermal water with the cold lake a hand’s width away on the other side of the rim.',
    'The name comes from the vök, the patches in the lake that never freeze in winter because hot springs feed them from below. Those springs were the only recorded geothermal water in this part of Iceland, noticed because the ice had holes in it, and the baths are built on them.',
    'The water here is drinkable, which is unusual for Icelandic geothermal water, and they serve it as tea. There is also a cold tunnel and a lake ladder, and the swim-up bar does a local birch beer.'
  ],
  see: [
    { n: 'The floating pools',
      d: 'Two cantilevered over the lake, around forty-one degrees, with the cold water at the rim.' },
    { n: 'The lake',
      d: 'A ladder down from the deck. Going in is bracing and the point is the contrast.' },
    { n: 'The cold mist tunnel',
      d: 'A short corridor of cold spray between the pools, which is better than it sounds.' },
    { n: 'The tea bar',
      d: 'Herbal infusions made with the geothermal water itself, which almost nowhere else in Iceland can do.' },
    { n: 'The bistro',
      d: 'Local lamb and fish, with a view down the lake.' },
    { n: 'The aurora',
      d: 'September to March, in the water, with the lake in front and little light around.' }
  ],
  when: 'Year round. Winter evenings for the aurora, summer for the midnight sun on the lake.',
  stay: 'Two hours.',
  move: 'A car, ten minutes north of Egilsstaðir.',
  eat: 'The bistro on site.'
},

'EST-djupivogur': {
  intro: [
    'Djúpivogur is a trading post from 1589 with about four hundred and fifty people, on a narrow spit between two fjords, and in 2013 it became Iceland’s first Cittaslow town, signing up to a movement that commits a place to local food, local craft and resisting the urge to grow.',
    'Eggin í Gleðivík is the work people stop for: thirty-four granite eggs along the harbour road, each one a sculpture of the egg of a bird that breeds in the district, made by Sigurður Guðmundsson and set on old fish-drying posts in order of size from the red-necked phalarope to the whooper swan.',
    'Búlandstindur rises behind the village, a pyramid of one thousand and sixty-nine metres in stacked basalt layers, which local tradition holds grants a wish if you look at it at the summer solstice. Across the bay is Papey, an island where Irish monks may have lived before the Norse arrived.'
  ],
  see: [
    { n: 'Eggin í Gleðivík',
      d: 'Thirty-four granite eggs on the harbour road, free, open air, each labelled with its bird.' },
    { n: 'Búlandstindur',
      d: 'The layered pyramid behind the village. Climbable in summer for the experienced, striking from the road for everyone else.' },
    { n: 'Langabúð',
      d: 'A log warehouse of 1790, the oldest building in the village, now a museum and cafe with Ríkarður Jónsson’s woodcarvings.' },
    { n: 'Papey',
      d: 'Boat trips in summer to an island with puffins, eiders and a tiny church, named for the papar, the Irish monks of the sagas.' },
    { n: 'Teigarhorn',
      d: 'A nature reserve just north with one of the world’s great zeolite deposits. Collecting is forbidden and the specimens are in the museum.' },
    { n: 'The harbour',
      d: 'A working fishing harbour, small, with the boats coming in through the afternoon.' }
  ],
  when: 'June to August for Papey and the walks. Year round for the eggs.',
  stay: 'Half a day.',
  move: 'A car on the ring road, an hour and a quarter from Egilsstaðir.',
  eat: 'Havarí at Karlsstaðir nearby, a farm cafe that makes vegetarian sausages from Icelandic barley and runs concerts in the barn.'
},

'EST-petra-stone': {
  intro: [
    'Petra’s Stone Collection at Stöðvarfjörður is one woman’s lifetime of walking the mountains behind her house and bringing rocks home. Ljósbjörg Petra María Sveinsdóttir started as a child in the 1920s, kept going until she could no longer climb, and died in 2012 having assembled what is probably the largest private mineral collection in the world.',
    'It fills her house and her garden. Zeolites, jasper, agate, opal, quartz, calcite, all of it from east Iceland, almost all of it carried down by her personally, arranged without any museum logic and with handwritten labels. The garden has streams running through the displays.',
    'The east coast fjords are an extraordinary place to collect: the basalt here is older than most of Iceland, so the cavities have had millions of years to fill with crystal. Collecting is now restricted, which makes the collection unrepeatable as well as remarkable.'
  ],
  see: [
    { n: 'The garden',
      d: 'Rocks on shelves and walls among the plants and streams, which is where the collection makes most sense.' },
    { n: 'The house',
      d: 'Her living rooms, kept as they were, with cases of the finest pieces and her own furniture around them.' },
    { n: 'The zeolites',
      d: 'Scolecite, stilbite, chabazite and more from the east fjord basalts, in sprays and fans inside broken geodes.' },
    { n: 'The eggs and spheres',
      d: 'A side collection of carved and polished stone, plus a startling number of birds’ eggs and shells.' },
    { n: 'Stöðvarfjörður',
      d: 'A village of around two hundred people in a steep fjord, with an arts centre in the old fish factory.' },
    { n: 'The labels',
      d: 'In her handwriting, naming where on which mountain each piece came from, which is the human part of it.' }
  ],
  when: 'May to September daily. Reduced hours outside that.',
  stay: 'An hour and a half.',
  move: 'A car on the ring road, an hour from Egilsstaðir.',
  eat: 'A cafe at the collection, and the arts centre cafe in the village.'
},

'EST-hengifoss': {
  intro: [
    'Hengifoss is a hundred and twenty-eight metres high, the third tallest in Iceland, and it falls into a gorge whose walls are banded red and black: layers of basalt from successive eruptions with bands of red clay between them, each clay band representing a long warm period when soil and vegetation built up before the next lava buried it.',
    'The sequence runs over several million years and you can read it from the path. The lower bands are thicker, which means longer gaps between eruptions. There are fossil plant impressions in some of the clay, mostly of trees that no longer grow in Iceland.',
    'The walk is two and a half kilometres each way with about three hundred metres of climb, on a good path with steps in the steep sections, and takes most people around two hours return. Litlanesfoss, halfway up, falls through a tight colonnade of basalt columns and would be the attraction anywhere else.'
  ],
  see: [
    { n: 'Hengifoss',
      d: 'A hundred and twenty-eight metres into a red and black banded gorge, with viewing points at increasing heights.' },
    { n: 'Litlanesfoss',
      d: 'Halfway up, falling through a dense colonnade of hexagonal columns, which is the better photograph of the two.' },
    { n: 'The clay bands',
      d: 'Red layers between the basalt, each one an interval of soil formation. The thickest represents the longest quiet period.' },
    { n: 'The upper pool',
      d: 'A rough scramble beyond the main viewpoint to the plunge pool, which is wet and only for the sure-footed.' },
    { n: 'Lagarfljót',
      d: 'The lake below, visible all the way up, with the forest on the far shore.' },
    { n: 'Skriðuklaustur',
      d: 'Gunnar Gunnarsson’s house further up the valley, a 1939 turf-roofed building, with the Klausturkaffi cake buffet.' }
  ],
  when: 'May to October. The upper path ices over and the steps are treacherous in winter.',
  stay: 'Two and a half hours.',
  move: 'A car down road 931 along the lake, half an hour from Egilsstaðir.',
  eat: 'Nothing at the car park. Klausturkaffi at Skriðuklaustur, ten minutes on.'
},

'EST-mjoifjorour': {
  intro: [
    'Mjóifjörður means narrow fjord and that is exactly what it is: eighteen kilometres long, about a kilometre wide, with walls rising steeply on both sides and around thirty-five people living in it. The road in crosses a pass of about six hundred metres and is gravel, single track in places, and closed by snow for much of the year.',
    'Brekka is the settlement, with a church, a school that has very few pupils, and a guesthouse. In 1908 a Norwegian whaling station at Asknes down the fjord employed several hundred people and was the largest in the world; it burned in 1913 and the foundations are in the grass.',
    'Klifbrekkufossar is the sight: a waterfall of seven or eight tiers falling about ninety metres down the head of the valley beside the road, so you come over the pass and it is simply there, with nowhere to park properly and nobody else looking at it.'
  ],
  see: [
    { n: 'Klifbrekkufossar',
      d: 'Seven tiers down the valley head beside the road, about ninety metres, with a pull-in at the bottom.' },
    { n: 'The pass',
      d: 'Road 953 over Mjóafjarðarheiði, gravel, with the whole fjord laid out as you come over the top.' },
    { n: 'Asknes',
      d: 'The foundations of the 1908 Norwegian whaling station, with concrete and rusting iron in the grass down the fjord.' },
    { n: 'Dalatangi',
      d: 'A lighthouse at the far end, the oldest in Iceland from 1895 with a newer one beside it, at the easternmost road point in the country.' },
    { n: 'The ferry',
      d: 'A small boat runs from Neskaupstaður in summer, which is how people got here before the road.' },
    { n: 'The quiet',
      d: 'Thirty-five people in eighteen kilometres of fjord. This is as empty as inhabited Iceland gets.' }
  ],
  when: 'June to September. The pass closes with snow and the fjord can be cut off for weeks in winter.',
  stay: 'Half a day, or a night at the guesthouse.',
  move: 'A car on road 953, an hour from Egilsstaðir on gravel with a steep pass.',
  eat: 'The guesthouse at Brekka serves meals if you book. Otherwise nothing.'
},

'EST-skalanes': {
  intro: [
    'Skálanes is a nature and heritage reserve on the southern shore of Seyðisfjörður, about nineteen square kilometres of coast, heath and cliff, run from a single farmhouse as a field station. It takes researchers and students, hosts volunteers, and has a handful of guest rooms.',
    'Around forty-seven bird species breed there, including fulmars, kittiwakes and arctic terns on the sea cliffs, and both eagles and gyrfalcons are seen. Seals haul out on the rocks. Reindeer come down from the heath. The point of the place is that it is managed for the wildlife first and visitors second, which is uncommon.',
    'Getting there is part of it. The track from Seyðisfjörður is seventeen kilometres, fords two rivers and needs a high four-wheel drive, or you walk it in four to five hours along the fjord, or the farm collects you. The commitment filters the traffic down to almost nothing.'
  ],
  see: [
    { n: 'The sea cliffs',
      d: 'Fulmars, kittiwakes and guillemots on the cliffs at the end of the reserve, reached on a walk from the house.' },
    { n: 'The arctic terns',
      d: 'A large colony near the house. They defend it aggressively in June and July and a stick held above the head is standard.' },
    { n: 'The field station',
      d: 'Ongoing work on bird populations, vegetation and archaeology, which guests can usually hear about over dinner.' },
    { n: 'The ruins',
      d: 'A Viking-age longhouse site in the reserve, excavated in part, with the outline visible.' },
    { n: 'The walk in',
      d: 'Seventeen kilometres along the fjord from Seyðisfjörður, four to five hours, with the whole fjord mouth opening up.' },
    { n: 'Reindeer and seals',
      d: 'Reindeer on the heath above and seals on the rocks below, both frequent rather than guaranteed.' }
  ],
  when: 'June to August, when the station is staffed and the birds are nesting. Closed most of the year.',
  stay: 'A night at the farm, which is the way to do it.',
  move: 'A high four-wheel drive over the track with two fords, or walk, or arrange a pick-up with the farm. Contact them first either way.',
  eat: 'The farm cooks for guests. Bring nothing else and expect lamb.'
},

'HLD-landmannalaugar': {
  intro: [
    'Landmannalaugar sits at six hundred metres in the Fjallabak highlands, inside the Fjallabak Nature Reserve, surrounded by rhyolite mountains in pink, ochre, green and grey. Rhyolite is silica-rich lava that cooled slowly, and the colours come from the minerals in it weathering at different rates; the quantity of it here is unusual anywhere on earth.',
    'The name means the people’s pools, and there is a natural hot pool where a warm stream meets a cold one at the edge of the Laugahraun lava field. It is shallow, about thirty-six to forty degrees depending where you sit, and it has been the reward at the end of a day’s walking for a very long time.',
    'Getting there is the filter. The F208 fords rivers, the F225 fords more, and no hire-car insurance covers river crossings. Most people take the highland bus from Reykjavík or Hella, which runs roughly mid June to mid September, takes four hours and is the sensible choice.'
  ],
  see: [
    { n: 'Bláhnúkur',
      d: 'The blue peak above the camp, nine hundred and forty metres, about two hours return on a steep path, with the whole rhyolite country from the top.' },
    { n: 'Brennisteinsalda',
      d: 'The sulphur wave, an eight hundred and eighty metre peak streaked yellow, red and black, with steam vents on the flank. Two to three hours.' },
    { n: 'Ljótipollur',
      d: 'The ugly puddle, an explosion crater with a red rim and a blue lake, about an hour’s drive or a long walk north.' },
    { n: 'The hot pool',
      d: 'A short boardwalk from the camp. Busy in the afternoon when the buses arrive, empty at ten at night when it is still light.' },
    { n: 'Laugahraun',
      d: 'The obsidian lava field right beside the camp, from an eruption around 1477, with black glassy rock and a path through it.' },
    { n: 'Stútur and Hnausapollur',
      d: 'Two more crater lakes on the road in, both red-rimmed, both worth the stop.' }
  ],
  when: 'Mid June to mid September, which is the whole season. Snow lies late and the F roads open when they open.',
  stay: 'Two nights, or one if you are passing through to the Laugavegur.',
  move: 'The highland bus from Reykjavík, Hella or Skaftafell. A large four-wheel drive with river-crossing experience otherwise.',
  eat: 'A small shop in a converted bus at the camp sells soup and basics at highland prices. Bring your own food.'
},

'HLD-laugavegur': {
  intro: [
    'The Laugavegur runs fifty-five kilometres from Landmannalaugar to Þórsmörk, usually in four days, and it is the most walked route in Iceland for the straightforward reason that the landscape changes completely about every three hours. Rhyolite colour, then obsidian desert, then black sand, then glacier edge, then birch wood.',
    'The stages are Landmannalaugar to Hrafntinnusker twelve kilometres, Hrafntinnusker to Álftavatn twelve, Álftavatn to Emstrur sixteen, and Emstrur to Þórsmörk fifteen. Huts at each, bookable through the Iceland Touring Association from around early December for the following summer, which sells out in days.',
    'It is not technical and it is not safe to be casual about. There are unbridged rivers to ford, the Hrafntinnusker section is above eleven hundred metres and holds snow all summer, and sudden fog and wind are routine. A walker died of exposure near Hrafntinnusker in 2004 in June. The route is marked, the huts have wardens, and people still get into trouble.'
  ],
  see: [
    { n: 'Stórihver',
      d: 'Steam vents and hot ground on the first day’s climb, with the snowfields right beside them.' },
    { n: 'Hrafntinnusker',
      d: 'The obsidian ridge at eleven hundred metres, with ice caves in some years and the highest hut on the route.' },
    { n: 'The Álftavatn descent',
      d: 'Coming over Jökultungur with the lake, the green valley and Mýrdalsjökull all at once, which is the view of the walk.' },
    { n: 'The fords',
      d: 'Bláfjallakvísl and Þröngá among others. Sandals, poles, unbuckled pack, face upstream and across at an angle.' },
    { n: 'Emstrur and Markarfljótsgljúfur',
      d: 'A side path from the Emstrur hut to a two-hundred metre canyon, twenty minutes, which most people are too tired to do and should.' },
    { n: 'Þórsmörk',
      d: 'Arriving into birch woodland after three days of desert, which does something to you.' }
  ],
  when: 'Late June to early September. The huts are staffed then and the snow has gone from the lower stages.',
  stay: 'Four days, or three for strong walkers.',
  move: 'Highland bus to Landmannalaugar, walk, bus out from Þórsmörk. Book huts the previous December or camp.',
  eat: 'Carry everything. The huts have gas and pots but no food, and the shop at Landmannalaugar is the last one.'
},

'HLD-thorsmork': {
  intro: [
    'Þórsmörk is a valley between three glaciers, Eyjafjallajökull, Mýrdalsjökull and Tindfjallajökull, sheltered enough that birch woodland grows there while everything around it is black sand and ice. The name means Thor’s wood.',
    'The shelter is the whole story. The glaciers and ridges break the wind, the temperature runs a few degrees above the surrounding highlands, and the result is a pocket of dwarf birch, willow, moss campion and around a hundred and fifty plant species in a place that by latitude and altitude should have none of them.',
    'Getting in means fording the Krossá, which is a braided glacial river that changes course daily and rises through the afternoon as the glaciers melt. No ordinary car gets in. The highland buses are built high for exactly this and the crossing is part of the ticket.'
  ],
  see: [
    { n: 'Valahnúkur',
      d: 'A four hundred and fifty metre hill above Húsadalur, about an hour and a half return, with all three glaciers and the Krossá braiding below.' },
    { n: 'Stakkholtsgjá',
      d: 'A hundred-metre deep canyon with a waterfall in a chamber at the end, about an hour return, reached on the road in.' },
    { n: 'Fimmvörðuháls',
      d: 'The twenty-five kilometre crossing to Skógar between two glaciers, past the 2010 eruption craters, which is a long hard day and the best walk in Iceland.' },
    { n: 'Tindfjöll circle',
      d: 'A seven to eight kilometre loop on ridges above the valley, exposed in places, with the best overall sense of the place.' },
    { n: 'The birch',
      d: 'Actual woodland, waist to head high, which in Iceland counts as a forest and is the reason for the name.' },
    { n: 'Krossá',
      d: 'The river, from the bridge or the bank. Watching a highland bus cross it is its own entertainment.' }
  ],
  when: 'Mid June to mid September for the buses and the walks. Some access continues into autumn in good years.',
  stay: 'Two nights. Huts and campsites at Básar, Langidalur and Húsadalur.',
  move: 'Highland bus from Reykjavík or Hvolsvöllur, about three and a half hours. A modified four-wheel drive otherwise, and not a hire car.',
  eat: 'A small cafe at Húsadalur in summer. Otherwise carry it in.'
},

'HLD-askja': {
  intro: [
    'Askja is a caldera about fifty square kilometres in the Dyngjufjöll mountains north of Vatnajökull, holding Öskjuvatn, Iceland’s deepest lake at two hundred and twenty metres, which formed after the enormous eruption of 1875. That eruption dropped ash across Scandinavia and drove a wave of emigration from east Iceland to Canada.',
    'Beside the lake is Víti, a smaller explosion crater from 1875 with milky blue geothermal water in the bottom. People used to climb down and swim in it; the descent is now closed after landslides, including a major one in 2014 that displaced a chunk of the crater wall.',
    'Apollo astronauts trained here in 1965 and 1967, because the terrain is as close to lunar as anywhere accessible on earth: grey pumice, no vegetation, no scale references. The drive in across the Ódáðahraun lava desert is around a hundred kilometres with nothing in it.'
  ],
  see: [
    { n: 'Öskjuvatn',
      d: 'The lake, two hundred and twenty metres deep, reached on a two and a half kilometre walk over pumice from the car park at Vikraborgir.' },
    { n: 'Víti',
      d: 'The blue crater beside the lake. The descent is closed, so you look in from the rim.' },
    { n: 'Drekagil',
      d: 'The dragon canyon at the Dreki hut, with a waterfall at the head and a short walk in.' },
    { n: 'Herðubreið',
      d: 'The queen of Icelandic mountains, a one thousand six hundred and eighty-two metre table mountain, visible for the whole drive in and climbable in a long day.' },
    { n: 'Holuhraun',
      d: 'The 2014 to 2015 lava field to the south, eighty-five square kilometres, the largest Icelandic eruption since 1784, visible from the road.' },
    { n: 'The drive',
      d: 'F88 or F905 and F910 across the Ódáðahraun, which is the largest lava desert in Europe and takes several hours.' }
  ],
  when: 'Late June or July to early September. Snow blocks the final road until late and the season is the shortest in Iceland.',
  stay: 'A long day from Mývatn, or a night at the Dreki hut.',
  move: 'A large four-wheel drive with river fords, or a day tour from Mývatn in a modified truck, which is how most people go.',
  eat: 'Nothing anywhere. Carry it all.'
},

'HLD-kerlingarfjoll': {
  intro: [
    'Kerlingarfjöll is a rhyolite massif of about a hundred and fifty square kilometres in the central highlands, rising to one thousand four hundred and seventy-seven metres, with steaming geothermal ground among mountains in colours that rival Landmannalaugar and a fraction of the visitors.',
    'The Hveradalir valley is the core of it: hot springs, steam vents and streams cutting through orange, pink and white slopes, with snowfields sitting directly beside boiling ground. There is a bathable stream where hot water mixes with cold, which needs finding rather than signposting.',
    'A ski school ran here in summer from 1961 until 2000, when the glacier it used had shrunk too far. The buildings became a mountain lodge, and in 2022 a hotel opened on the site, which makes this the only place in the central highlands with a proper bed, a restaurant and a hot tub.'
  ],
  see: [
    { n: 'Hveradalir',
      d: 'The geothermal valley, with marked loops from forty minutes to three hours through steam and coloured ground.' },
    { n: 'Snækollur',
      d: 'The highest peak at one thousand four hundred and seventy-seven metres, about four hours return, with the whole highlands and Hofsjökull.' },
    { n: 'The hot stream',
      d: 'In Hveradalir where hot and cold meet, shallow, with a small changing hut. Ask at the lodge which pool is right this week.' },
    { n: 'Hveravellir',
      d: 'A separate geothermal field further north on the Kjölur route, which pairs with this on one trip.' },
    { n: 'Gýgjarfoss',
      d: 'A waterfall on the river beside the road in, a short detour, usually empty.' },
    { n: 'The access',
      d: 'F347 off the Kjölur route 35. One small ford, and manageable in a smaller four-wheel drive than most F roads need.' }
  ],
  when: 'Late June to early September for the roads. The hotel also opens in winter with super-jeep transfers.',
  stay: 'Two nights, which the hotel now makes practical.',
  move: 'A four-wheel drive on F347 off the Kjölur route, about three hours from Reykjavík. Buses run in summer.',
  eat: 'The hotel restaurant, which is the only real meal in the central highlands.'
},

'HLD-aldeyjarfoss': {
  intro: [
    'Aldeyjarfoss is twenty metres high on the Skjálfandafljót, the same river as Goðafoss, falling into a basin ringed by basalt columns in dark grey against the white water and the black sand. The contrast is the reason photographers drive a long way up a gravel road for it.',
    'The columns formed in a lava flow from the Trölladyngja area that cooled in contact with the river, which is why they curve and fan rather than standing in neat ranks. The basin below is sand and the water is the opaque white of a glacial river in full flow.',
    'It sits at the northern end of the Sprengisandur route, on road 842 which becomes the F26. An ordinary car can reach it in summer on the gravel from Goðafoss, which makes it the most accessible of the highland falls, though the last stretch is rough enough that people turn back.'
  ],
  see: [
    { n: 'The main viewpoint',
      d: 'A short walk from the car park to the rim, looking down into the column-ringed basin.' },
    { n: 'The lower path',
      d: 'A rougher scramble to the water level, which gives the full scale of the columns and is slippery.' },
    { n: 'Hrafnabjargafoss',
      d: 'Upstream on the same river, broader and multi-channel, reached on a rough track, almost never visited.' },
    { n: 'Ingvararfoss',
      d: 'A smaller fall just downstream, visible from the path.' },
    { n: 'The Sprengisandur',
      d: 'The highland route south from here across the interior to Þórsmörk and Landmannalaugar, which needs a serious vehicle.' },
    { n: 'Goðafoss',
      d: 'Forty minutes north on the same river, which makes an obvious pair and shows what the river does at two different stages.' }
  ],
  when: 'June to September. The gravel road is not maintained in winter.',
  stay: 'An hour.',
  move: 'A car on road 842 south from the ring road near Goðafoss, about forty-five minutes on gravel. A high clearance vehicle helps.',
  eat: 'Nothing. Goðafoss or Mývatn.'
},

'HLD-hveravellir': {
  intro: [
    'Hveravellir is a geothermal field on the Kjölur route between Langjökull and Hofsjökull, at about six hundred metres, with hot springs, fumaroles and mineral-crusted ground in the middle of a stony highland plain where nothing else is happening at all.',
    'Öskurhóll, the screaming hill, is the loudest of the vents: a cone of sinter with steam forcing out under pressure. Bláhver is a blue pool a few metres across with a sinter rim, and Eyvindarhver is named for Fjalla-Eyvindur, an eighteenth-century outlaw who with his wife Halla lived in the highlands for around twenty years to avoid execution, using the hot ground to survive the winters. The remains of a shelter are there.',
    'There is a hot tub fed by the springs, two huts, and a campsite. The Kjölur route itself, road 35, is gravel but has no unbridged rivers, so an ordinary car can legally drive it, which puts the central highlands within reach of anyone willing to do four hours on washboard.'
  ],
  see: [
    { n: 'Öskurhóll',
      d: 'The roaring fumarole, audible from the car park, with a boardwalk to it.' },
    { n: 'Bláhver',
      d: 'A clear blue pool with a white sinter rim, which is the photograph of the place.' },
    { n: 'Eyvindarhver and the shelter',
      d: 'The outlaw’s spring and the stone remains of where he and Halla overwintered.' },
    { n: 'The hot tub',
      d: 'Spring-fed, basic, a short walk from the huts, with the highland plain in every direction.' },
    { n: 'The boardwalks',
      d: 'Stay on them. The crust over the hot ground here is thin and the field is a protected natural monument.' },
    { n: 'Kerlingarfjöll',
      d: 'An hour south on the same route, which almost everyone combines with this.' }
  ],
  when: 'Mid June to late September for the Kjölur route. Closed and impassable in winter.',
  stay: 'Two hours, or a night at the hut.',
  move: 'An ordinary car can do road 35 in summer, though hire agreements often forbid it. Four hours from Reykjavík. Summer buses run the route.',
  eat: 'Nothing but the hut kitchen. Carry food.'
},

'HLD-langisjor': {
  intro: [
    'Langisjór is a lake twenty kilometres long and about two wide, at about six hundred and seventy metres, lying between Vatnajökull’s western edge and the Fögrufjöll ridge. The water is deep blue, the ridges on both sides are covered in grey-green moss over black sand, and there is nothing else there.',
    'It was added to Vatnajökull National Park in 2011 after a long campaign, having previously been earmarked in hydroelectric planning. The argument for protecting it was essentially that it is one of the few large highland lakes still without a dam or a diversion anywhere near it.',
    'Almost nobody goes. The F235 is a spur off the F208 and takes an hour each way over rough ground with a ford, and the lake leads nowhere, so it attracts only people who have decided to go there. Those who do usually describe it as the best thing they saw in Iceland.'
  ],
  see: [
    { n: 'Sveinstindur',
      d: 'A one thousand and ninety metre peak at the southern end, about two hours return and steep, with the lake, the moss ridges and Vatnajökull from the top.' },
    { n: 'The lake shore',
      d: 'Black sand beaches along the eastern side, with the water a startling blue against them.' },
    { n: 'Fögrufjöll',
      d: 'The ridge on the far side, moss-covered, with a multi-day route along it for the self-sufficient.' },
    { n: 'The moss',
      d: 'Woolly fringe moss over the whole landscape, which takes decades to recover from a tyre track and is why you stay on the road.' },
    { n: 'Eldgjá',
      d: 'The forty-kilometre fissure from the 939 eruption, to the south, reachable on the same trip.' },
    { n: 'The emptiness',
      d: 'Which is the point. On most days you will be the only vehicle at the lake.' }
  ],
  when: 'July to early September, which is when the F235 is open. The season is short even by highland standards.',
  stay: 'A long day from Kirkjubæjarklaustur, or camp at the hut.',
  move: 'A large four-wheel drive on F208 then F235, with a ford. No buses, no tours on most days.',
  eat: 'Nothing. There is a hut with a kitchen and no supplies.'
},

'HLD-kverkfjoll': {
  intro: [
    'Kverkfjöll is a volcanic massif on the northern edge of Vatnajökull, rising to one thousand nine hundred and twenty metres, with one of the most powerful geothermal areas in Iceland sitting directly under the ice. Where the two meet, meltwater runs out under the glacier and has carved ice caves at the snout of Kverkjökull.',
    'Hveradalur, a geothermal valley at about one thousand seven hundred metres inside the massif, has boiling springs and steam among the glacier, with hot streams running over ice. Reaching it is a guided day from the Sigurðarskáli hut with crampons and a rope, not a stroll.',
    'The ice cave at the glacier snout is the famous image, and it is also the dangerous one. The roof has collapsed repeatedly, people have been killed, and going inside is not recommended by anyone with responsibility for the area. Looking at the mouth from a safe distance is the sanctioned version.'
  ],
  see: [
    { n: 'The ice cave mouth',
      d: 'At Kverkjökull, about twenty minutes from the hut, where the warm river leaves the glacier. Look, do not enter.' },
    { n: 'Hveradalur',
      d: 'The geothermal valley high in the massif, with steam, hot streams and ice together. Guided, with crampons, a full day.' },
    { n: 'Virkisfell',
      d: 'A shorter walk from the hut, a few hours, for the view over the glacier snout and the Kreppa river plain.' },
    { n: 'Hvannalindir',
      d: 'An oasis of green on the road in, with springs, angelica and the ruins of an outlaw shelter.' },
    { n: 'Sigurðarskáli',
      d: 'The hut at eight hundred metres, run by the Húsavík touring club, with a warden in summer and the only shelter for a long way.' },
    { n: 'The road',
      d: 'F902 and F905 with the Kreppa ford, which is among the more serious crossings in Iceland.' }
  ],
  when: 'July to late August. The hut is staffed then and the guided trips run then only.',
  stay: 'Two nights at the hut, which the guided day requires.',
  move: 'A large four-wheel drive with ford experience, or a tour from Mývatn or Egilsstaðir. Not a solo first-time highland trip.',
  eat: 'Nothing. The hut has a kitchen. Carry everything.'
}
};

/* Look-up used by the place page. Returns null rather than
   throwing when a guide has not been written yet, so a new place
   renders with its blurb and its live panel and nothing else. */
function isGuide(id){
  return (typeof IS_GUIDE !== 'undefined' && IS_GUIDE[id]) ? IS_GUIDE[id] : null;
}

function isGuideCount(){
  return (typeof IS_GUIDE !== 'undefined') ? Object.keys(IS_GUIDE).length : 0;
}
