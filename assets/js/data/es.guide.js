/* ===========================================================
   SPAIN: the written guides

   One entry per place:

     id -> { intro: [paragraphs], see: [{n, t?, d}], when, stay, move, eat }

   This file is NOT loaded by index.html. core/lazy.js fetches it
   the first time somebody opens a Spanish place page, because at
   this size it has no business sitting on the critical path of a
   visitor who only ever looks at Utah.

   On the writing. These read like something a person wrote after
   going there: a concrete fact early, an opinion where one is
   warranted, and the practical thing you would actually want to
   know. Deliberately avoided: em dashes, "nestled", "boasts",
   "hidden gem", "must-visit", and the construction where every
   sentence is balanced against its own opposite. Numbers, dates
   and names do more work than adjectives.

   Spanish place names keep their accents. Where a region has its
   own language the local form is used when that is what is
   written on the signs: Xàbia rather than Jávea, Ciutadella
   rather than Ciudadela, Vitoria-Gasteiz with both halves.
   =========================================================== */

/* Wikipedia article titles where they differ from the name this
   atlas uses. Without these the photo lookup misses. */
const ES_WIKI = {
  'ADL-alcazar-seville': 'Alcázar of Seville',
  'ADL-alhambra': 'Alhambra',
  'ADL-almunecar': 'Almuñécar',
  'ADL-antequera': 'Antequera',
  'ADL-arcos': 'Arcos de la Frontera',
  'ADL-cabo-de-gata': 'Cabo de Gata-Níjar Natural Park',
  'ADL-cadiz': 'Cádiz',
  'ADL-cordoba': 'Córdoba, Spain',
  'ADL-donana': 'Doñana National Park',
  'ADL-granada': 'Granada',
  'ADL-grazalema': 'Sierra de Grazalema Natural Park',
  'ADL-jerez': 'Jerez de la Frontera',
  'ADL-malaga': 'Málaga',
  'ADL-mezquita': 'Mosque–Cathedral of Córdoba',
  'ADL-mojacar': 'Mojácar',
  'ADL-nerja-frigiliana': 'Nerja',
  'ADL-rio-tinto': 'Rio Tinto (river)',
  'ADL-ronda': 'Ronda',
  'ADL-setenil': 'Setenil de las Bodegas',
  'ADL-seville': 'Seville',
  'ADL-sierra-nevada': 'Sierra Nevada (Spain)',
  'ADL-tabernas': 'Tabernas Desert',
  'ADL-tarifa': 'Tarifa',
  'ADL-ubeda-baeza': 'Úbeda',
  'ARA-ainsa': 'Aínsa',
  'ARA-albarracin': 'Albarracín',
  'ARA-jaca': 'Jaca',
  'ARA-loarre': 'Loarre Castle',
  'ARA-ordesa': 'Ordesa y Monte Perdido National Park',
  'ARA-piedra': 'Monasterio de Piedra',
  'ARA-riglos': 'Mallos de Riglos',
  'ARA-teruel': 'Teruel',
  'ARA-zaragoza': 'Zaragoza',
  'AST-cangas-onis': 'Cangas de Onís',
  'AST-cudillero': 'Cudillero',
  'AST-gijon': 'Gijón',
  'AST-llanes': 'Llanes',
  'AST-oviedo': 'Oviedo',
  'AST-picos-covadonga': 'Picos de Europa',
  'AST-ribadesella': 'Cave of Tito Bustillo',
  'AST-somiedo': 'Somiedo Natural Park',
  'BAL-cabrera': 'Cabrera Archipelago Maritime-Terrestrial National Park',
  'BAL-ciutadella': 'Ciutadella de Menorca',
  'BAL-es-vedra': 'Es Vedrà',
  'BAL-formentera': 'Formentera',
  'BAL-ibiza': 'Ibiza',
  'BAL-menorca': 'Menorca',
  'BAL-palma': 'Palma de Mallorca',
  'BAL-soller': 'Sóller',
  'BAL-tramuntana': 'Serra de Tramuntana',
  'CAT-aiguestortes': 'Aigüestortes i Estany de Sant Maurici National Park',
  'CAT-barcelona': 'Barcelona',
  'CAT-besalu': 'Besalú',
  'CAT-cadaques': 'Cadaqués',
  'CAT-cardona': 'Cardona, Spain',
  'CAT-costa-brava': 'Costa Brava',
  'CAT-delta-ebre': 'Ebro Delta',
  'CAT-figueres': 'Dalí Theatre and Museum',
  'CAT-girona': 'Girona',
  'CAT-gothic-quarter': 'Gothic Quarter, Barcelona',
  'CAT-montseny': 'Montseny Massif',
  'CAT-montserrat': 'Montserrat (mountain)',
  'CAT-park-guell': 'Park Güell',
  'CAT-poblet': 'Poblet Monastery',
  'CAT-priorat': 'Priorat',
  'CAT-sagrada-familia': 'Sagrada Família',
  'CAT-sitges': 'Sitges',
  'CAT-tarragona': 'Tarragona',
  'CAT-vall-de-nuria': 'Vall de Núria',
  'CAT-vic': 'Vic',
  'CLM-alcala-jucar': 'Alcalá del Júcar',
  'CLM-almagro': 'Almagro, Ciudad Real',
  'CLM-ciudad-encantada': 'Ciudad Encantada',
  'CLM-consuegra': 'Consuegra',
  'CLM-cuenca': 'Cuenca, Spain',
  'CLM-ruidera': 'Lagunas de Ruidera',
  'CLM-siguenza': 'Sigüenza',
  'CLM-toledo': 'Toledo, Spain',
  'CNR-anaga': 'Anaga',
  'CNR-el-hierro': 'El Hierro',
  'CNR-fuerteventura': 'Fuerteventura',
  'CNR-gomera': 'Garajonay National Park',
  'CNR-gran-canaria': 'Gran Canaria',
  'CNR-la-palma': 'La Palma',
  'CNR-lanzarote': 'Lanzarote',
  'CNR-manrique': 'Jameos del Agua',
  'CNR-masca': 'Masca, Tenerife',
  'CNR-maspalomas': 'Maspalomas',
  'CNR-teide': 'Teide',
  'CTB-altamira': 'Cave of Altamira',
  'CTB-cabarceno': 'Cabárceno Natural Park',
  'CTB-comillas': 'Comillas',
  'CTB-picos-fuente-de': 'Fuente Dé',
  'CTB-santander': 'Santander, Spain',
  'CTB-santillana': 'Santillana del Mar',
  'CYL-arribes': 'Arribes del Duero Natural Park',
  'CYL-astorga': 'Astorga, Spain',
  'CYL-atapuerca': 'Atapuerca (archaeological site)',
  'CYL-avila': 'Ávila, Spain',
  'CYL-burgos': 'Burgos',
  'CYL-la-alberca': 'La Alberca, Salamanca',
  'CYL-las-medulas': 'Las Médulas',
  'CYL-leon': 'León, Spain',
  'CYL-ribera-duero': 'Ribera del Duero',
  'CYL-salamanca': 'Salamanca',
  'CYL-segovia': 'Segovia',
  'CYL-soria': 'Soria',
  'CYL-valladolid': 'Valladolid',
  'CYL-zamora': 'Zamora, Spain',
  'EXT-caceres': 'Cáceres, Spain',
  'EXT-guadalupe': 'Royal Monastery of Santa María de Guadalupe',
  'EXT-la-vera': 'Monastery of Yuste',
  'EXT-merida': 'Mérida, Spain',
  'EXT-monfrague': 'Monfragüe',
  'EXT-trujillo': 'Trujillo, Cáceres',
  'EXT-zafra': 'Zafra',
  'GAL-a-coruna': 'A Coruña',
  'GAL-as-catedrais': 'As Catedrais Beach',
  'GAL-cabo-ortegal': 'Cape Ortegal',
  'GAL-cies': 'Cíes Islands',
  'GAL-combarro': 'Combarro',
  'GAL-finisterre': 'Cape Finisterre',
  'GAL-lugo': 'Lugo',
  'GAL-ourense': 'Ourense',
  'GAL-pontevedra': 'Pontevedra',
  'GAL-rias-baixas': 'Rías Baixas',
  'GAL-ribeira-sacra': 'Ribeira Sacra',
  'GAL-santiago': 'Santiago de Compostela',
  'MAD-alcala': 'Alcalá de Henares',
  'MAD-aranjuez': 'Royal Palace of Aranjuez',
  'MAD-chinchon': 'Chinchón',
  'MAD-el-escorial': 'El Escorial',
  'MAD-guadarrama': 'Sierra de Guadarrama National Park',
  'MAD-madrid': 'Madrid',
  'MAD-prado': 'Museo del Prado',
  'MAD-reina-sofia': 'Museo Reina Sofía',
  'MAD-retiro': 'Buen Retiro Park',
  'MAD-royal-palace': 'Royal Palace of Madrid',
  'MUR-cartagena': 'Cartagena, Spain',
  'MUR-mar-menor': 'Mar Menor',
  'MUR-murcia-city': 'Murcia',
  'MUR-sierra-espuna': 'Sierra Espuña',
  'NAV-bardenas': 'Bardenas Reales',
  'NAV-estella': 'Estella-Lizarra',
  'NAV-irati': 'Irati Forest',
  'NAV-olite': 'Palace of the Kings of Navarre of Olite',
  'NAV-pamplona': 'Pamplona',
  'NAV-roncesvalles': 'Roncesvalles',
  'PVA-bilbao': 'Bilbao',
  'PVA-gaztelugatxe': 'Gaztelugatxe',
  'PVA-getaria': 'Getaria',
  'PVA-guggenheim': 'Guggenheim Museum Bilbao',
  'PVA-hondarribia': 'Hondarribia',
  'PVA-rioja-alavesa': 'Laguardia, Álava',
  'PVA-san-sebastian': 'San Sebastián',
  'PVA-vitoria': 'Vitoria-Gasteiz',
  'PVA-zumaia': 'Zumaia',
  'RIO-dinosaur-trails': 'Enciso, La Rioja',
  'RIO-haro': 'Haro, La Rioja',
  'RIO-logrono': 'Logroño',
  'RIO-san-millan': 'San Millán de la Cogolla',
  'VLC-albufera': 'Albufera',
  'VLC-alicante': 'Alicante',
  'VLC-calpe': 'Peñón de Ifach',
  'VLC-ciudad-artes': 'City of Arts and Sciences',
  'VLC-elche': 'Elche',
  'VLC-guadalest': 'Guadalest',
  'VLC-javea-denia': 'Xàbia',
  'VLC-morella': 'Morella',
  'VLC-penyiscola': 'Peníscola',
  'VLC-valencia': 'Valencia'
};

const ES_GUIDE = {
'ADL-granada': {
  intro: [
    'Granada was the last Muslim city in Spain. Boabdil handed the keys to Ferdinand and Isabella on 2 January 1492, ending seven hundred and eighty years of Al-Andalus, and the surrender terms promised the Muslim population their religion and their property. Those terms were broken within a decade.',
    'What that history left is a city of two halves facing each other across a ravine. The Alhambra sits on one ridge, the Albaicín on the other, and the Darro runs between them in a channel so narrow it is partly covered. From either side you look at the other, which is the whole experience of being here.',
    'It is also a student city of sixty thousand undergraduates and the only place in Spain where tapas genuinely still come free with the drink. Order a beer, get a plate. Order three and you have had dinner. This single fact shapes how an evening works here more than anything else.'
  ],
  see: [
    { n: 'The Alhambra', t: 'book weeks ahead',
      d: 'The Nasrid Palaces need a timed slot and that slot is the ticket; miss it and you do not get in. Tickets go on sale about three months out and the summer ones vanish. There is no queue option worth attempting.' },
    { n: 'The Albaicín at dusk',
      d: 'The old Moorish quarter, a maze of whitewashed lanes and walled gardens on the opposite hill. Walk up to the Mirador de San Nicolás for the Alhambra against the Sierra Nevada, which is the view on the postcards, and then keep walking because the square itself is crowded and the lanes behind it are not.' },
    { n: 'The Capilla Real',
      d: 'Ferdinand and Isabella are buried here in lead coffins in the crypt, under alabaster effigies that are much grander. You can look through the grille at the actual boxes. Their daughter Juana, called the Mad, is beside them.' },
    { n: 'Free tapas',
      d: 'Calle Elvira and the streets around Plaza Nueva for the tourist version; Calle Navas and the Realejo for better. Bodegas Castañeda and Los Diamantes are the ones locals name. Order the same drink repeatedly and the plates get better as the barman decides you are serious.' },
    { n: 'The Sacromonte caves',
      d: 'Gypsy cave dwellings cut into the hillside above the Albaicín, several of which run flamenco in a zambra format where the audience sits along the walls of a long narrow cave. It is closer to a tourist show than the real thing and the setting still does something no theatre can.' },
    { n: 'The Cartuja',
      d: 'A monastery twenty minutes out with a sacristy so aggressively baroque it borders on hallucination: brown marble, twisted columns, and inlay work that took thirty-four years. Almost nobody goes and it is the best interior in the city after the Alhambra.' }
  ],
  when: 'April to early June and late September into November. July and August are forty degrees. Winter is cold and clear and the Sierra Nevada behind the Alhambra is white, which is the best version of the famous view.',
  stay: 'Two nights minimum. One day for the Alhambra, one for everything else, and the second evening is when the city stops being a monument.',
  move: 'High-speed rail from Madrid in about three and a half hours. The airport is small; Málaga is ninety minutes by bus and has far more flights. Do not drive into the old city.',
  eat: 'Free tapas with every drink. Beyond that: habas con jamón, broad beans with ham; remojón, an orange and salt cod salad that sounds wrong and is not; and piononos, a small rum-soaked pastry from Santa Fe outside town.'
},

'ADL-alhambra': {
  intro: [
    'The Alhambra is not one building. It is a walled hilltop town of about thirteen hectares containing a fortress, a royal palace complex, a summer estate, a street of houses and a Renaissance palace that Charles V dropped into the middle of it in 1527 and never finished.',
    'The Nasrid Palaces are the reason it is famous and they are a deliberate argument in plaster, tile and water. Almost nothing here is structural: the muqarnas vaults that look like stalactites are hollow decoration hung from wooden frames, and the walls carry carved stucco that was originally painted in red, blue and gold. The inscriptions are poetry, and several of them speak in the building’s own voice.',
    'It survived because it was useful. After 1492 the Christian monarchs took it as a royal residence rather than demolishing it, which is why eight hundred years of Islamic craft is still standing in a country that erased most of the rest.'
  ],
  see: [
    { n: 'The Court of the Lions',
      d: 'Twelve marble lions holding a fountain, in a courtyard of a hundred and twenty-four columns arranged so that no two viewpoints give the same rhythm. The lions were restored between 2007 and 2012 and the hydraulic system works again.' },
    { n: 'The Hall of the Abencerrajes',
      d: 'A star-shaped muqarnas dome of five thousand cells over a room where, by legend, Boabdil had an entire noble family beheaded. Stand in the middle and look straight up; the geometry only resolves from there.' },
    { n: 'The Generalife', t: 'allow an hour',
      d: 'The summer estate up the hill, with the Patio de la Acequia running a long channel of water between flowerbeds and arched jets crossing over it. Cooler, quieter and a better place to sit than the palaces.' },
    { n: 'The Alcazaba',
      d: 'The military end, which is three centuries older than the palaces. Climb the Torre de la Vela for Granada laid out below and the Sierra Nevada behind. The bell at the top is still rung on 2 January.' },
    { n: 'The Palace of Charles V',
      d: 'A square building containing a perfect circular courtyard, by a pupil of Michelangelo, roofless until 1957. As an object it is magnificent; as an act of architectural colonisation it is hard to forgive.' },
    { n: 'Going at night',
      d: 'A separate ticket covers the Nasrid Palaces after dark, lit low, with a fraction of the people. It is a different building at night and arguably the better visit.' }
  ],
  when: 'Year round. The timed Nasrid slot matters more than the season. Early morning in summer, late afternoon in winter, when the low sun comes through the lattices.',
  stay: 'Three to four hours for the full site, longer if you take the Generalife slowly.',
  move: 'Walk up the Cuesta de Gomérez from Plaza Nueva in twenty steep minutes, or take the C30 minibus. The car park is a long way from the entrance you need.',
  eat: 'The parador inside the walls is a converted convent and serves a reasonable lunch in a beautiful courtyard. Everything else on the hill is mediocre; eat in the city.'
},

'ADL-seville': {
  intro: [
    'Every ounce of gold and silver that crossed the Atlantic from the Americas came through Seville. The Casa de Contratación held a monopoly from 1503 and the city became, for about a century, the richest place in Europe. Then the river silted up, Cádiz took the trade, and Seville spent three hundred years being poor and beautiful.',
    'The cathedral is the physical record of that money. It was built on the footprint of the Almohad mosque after the chapter reportedly resolved to construct something so large that those who saw it would take them for madmen. It is the largest Gothic church in the world by volume and the minaret of the old mosque is still standing beside it as the bell tower.',
    'The city is also the home of flamenco and of the two biggest weeks in the Spanish calendar: Semana Santa, when sixty brotherhoods carry images through the streets all night, and the Feria two weeks later, which is essentially the opposite. Being here for either is a completely different trip from being here in October.'
  ],
  see: [
    { n: 'The Cathedral and the Giralda',
      d: 'Columbus’s tomb is held up by four pallbearers representing the kingdoms of Spain, and DNA testing in 2006 confirmed at least some of him is in there. The Giralda is climbed by thirty-five ramps rather than stairs, built wide enough to ride a horse up.' },
    { n: 'The Real Alcázar',
      d: 'A working royal palace, and the Mudéjar rooms were built by Muslim craftsmen for a Christian king a century after the reconquest. The Baths of María de Padilla underneath are the quietest and strangest part.' },
    { n: 'Triana',
      d: 'Across the river, the old gypsy and ceramics quarter, which produced a disproportionate share of flamenco. The Mercado de Triana sits on the ruins of the castle where the Inquisition had its headquarters, which is explained in a small museum underneath it.' },
    { n: 'Flamenco at Casa de la Memoria or La Carbonería',
      d: 'Small rooms, no microphones, no castanets. If there are castanets and a rose in the teeth you are at the wrong show. Thursday nights at a peña will get you closer still if you can find one that admits outsiders.' },
    { n: 'Semana Santa', t: 'the week before Easter',
      d: 'Sixty brotherhoods, some processing from midnight until dawn, with pasos carried by thirty to fifty men walking in step underneath. The silence of the madrugá processions on Good Friday morning is extraordinary and the city is completely full.' },
    { n: 'Plaza de España',
      d: 'Built for the 1929 exposition, a semicircle of brick and tile with a canal you can row on and a bench for every province of Spain. It has been Naboo and a Lawrence of Arabia set and it is still a public square.' }
  ],
  when: 'March to May, or October and November. July and August regularly hit forty-four degrees and the city empties. Semana Santa and the Feria need booking many months ahead at several times the price.',
  stay: 'Three nights.',
  move: 'AVE from Madrid in two and a half hours. The airport has European flights. The centre is walkable and the tram covers the rest.',
  eat: 'Tapas is Seville’s own invention and the bars are standing room. Espinacas con garbanzos, spinach with chickpeas; carrillada, braised pork cheek; and cold soups in summer, salmorejo thicker than gazpacho and better.'
},

'ADL-alcazar-seville': {
  intro: [
    'The Alcázar is the oldest royal palace still in use in Europe. The Spanish royal family stays in the upper floor when they are in Seville, which is why that part is a separate ticket and a timed one.',
    'What confuses people is the architecture. This looks like a Moorish palace and most of it was built in the 1360s for Pedro I of Castile, a Christian king, by craftsmen from Granada and Toledo, more than a century after Seville fell to Christian forces. An inscription in the Patio de las Doncellas praises Pedro as sultan, in Arabic, in his own palace.',
    'That is not an anomaly. Mudéjar is the name for exactly this: Islamic craft working under Christian patronage, and it is arguably the most genuinely Spanish architecture there is, because it could not have happened anywhere else.'
  ],
  see: [
    { n: 'Patio de las Doncellas',
      d: 'The centrepiece, with a sunken garden rediscovered in 2002 under a Renaissance marble floor that had covered it since the sixteenth century. Excavated and replanted, so you now see Pedro’s original layout.' },
    { n: 'Salón de Embajadores',
      d: 'A half-orange dome of interlaced gilded wood over a square room of tile and carved plaster. The best single room in the building, and the ceiling is from 1427.' },
    { n: 'The Baths of María de Padilla',
      d: 'A long vaulted rainwater cistern under the gardens, with a pool at the bottom and light coming down in shafts. Named for Pedro’s mistress and used as a set for Dorne.' },
    { n: 'The gardens',
      d: 'Twenty thousand square metres in layers, from Islamic enclosed courts through a Renaissance grotto gallery to a nineteenth-century English section. The organ fountain plays on the hour by water pressure alone.' },
    { n: 'The Cuarto Real Alto', t: 'separate timed ticket',
      d: 'The upper royal apartments, still used, shown on a guided visit of about half an hour. Fewer than a hundred people a day see them.' },
    { n: 'Going first thing',
      d: 'The first slot of the day, before the cathedral empties into it, is the difference between a palace and a queue. Online tickets only; the on-the-day line is long and often pointless.' }
  ],
  when: 'Year round. The gardens are best in spring when the orange blossom is out, which is also when the whole city smells of it.',
  stay: 'Two to three hours, more if you sit in the gardens, which you should.',
  move: 'Beside the cathedral in the centre of Seville. No parking anywhere near.',
  eat: 'Nothing inside beyond a cafe. The Barrio Santa Cruz immediately outside is tourist-priced; walk five minutes to the Alfalfa for better.'
},

'ADL-cordoba': {
  intro: [
    'In the tenth century Córdoba was the largest city in western Europe and possibly the largest in the world outside China. Estimates run to half a million people. It had street lighting, paved roads, running water and a library of four hundred thousand volumes at a time when the largest in Christian Europe held perhaps four hundred.',
    'The caliphate collapsed in 1031 and the city has been provincial ever since. That is why it is so good: a place with the monuments of a capital and the population of a market town, where you can stand in front of something extraordinary without a crowd behind you.',
    'The other thing to understand is the patios. Córdoba is brutally hot and the Roman and Islamic answer was the same: build the house inward around a courtyard with a well, and fill it with plants. In the first two weeks of May the owners open them to the public and compete, and the whole city turns into a garden you walk through.'
  ],
  see: [
    { n: 'The Mezquita',
      d: 'The reason to come, and large enough to need its own entry below.' },
    { n: 'The Patios festival', t: 'the first two weeks of May',
      d: 'Fifty or so private courtyards open free of charge, judged on planting. Geraniums in pots up every wall, a well in the middle, and the owners sitting there happy to talk. UNESCO listed the practice in 2012.' },
    { n: 'Medina Azahara',
      d: 'A palace-city built from nothing in 936 eight kilometres out, abandoned and sacked within seventy-five years, and lost until 1911. About a tenth is excavated. The reception hall has been reconstructed and the sense of scale is the point.' },
    { n: 'The Jewish quarter and the synagogue',
      d: 'One of only three medieval synagogues left in Spain, small, with Hebrew inscriptions and Mudéjar plasterwork. Maimonides was born a few streets away and there is a statue of him people rub for luck.' },
    { n: 'The Roman bridge and the Calahorra tower',
      d: 'Sixteen arches across the Guadalquivir, Roman foundations with later rebuilding. Walk it at dusk with the Mezquita behind you, which is the best twenty minutes in Córdoba.' },
    { n: 'Palacio de Viana',
      d: 'Twelve separate patios in one aristocratic house, open year round, which is the answer if you cannot be here in May.' }
  ],
  when: 'April and May, or October. The Patios festival is the first fortnight of May and the city is packed. Summer is the hottest in Spain: Córdoba has recorded over forty-six degrees.',
  stay: 'Two nights.',
  move: 'AVE from Madrid in under two hours and from Seville in forty-five minutes. Very easy as a day trip and better as a stay.',
  eat: 'Salmorejo, which belongs to Córdoba rather than Seville: thicker than gazpacho, with egg and ham on top. Rabo de toro, oxtail stewed for hours. Montilla-Moriles wine, which is like sherry and is not sherry.'
},

'ADL-mezquita': {
  intro: [
    'Abd al-Rahman I began it in 785 on the site of a Visigothic church, and it was extended three times over two hundred years until it held something close to a thousand columns. Most were taken from Roman and Visigothic buildings, which is why they are different heights, and the solution to that was the double arch: a lower horseshoe arch carrying a second arch above it, in alternating red brick and white stone, repeated into the distance in every direction.',
    'The effect is unlike any other religious interior. There is no focal point and no nave drawing you forward. You are in a forest, and the forest looks the same whichever way you turn, which was presumably the theological intention.',
    'In 1523 the cathedral chapter got permission from Charles V to build a Renaissance nave in the middle by demolishing part of it. Charles saw the result and is supposed to have said that they had destroyed something unique to build something you could find anywhere. Whether or not he said it, the cathedral is the reason the building survived at all.'
  ],
  see: [
    { n: 'The hypostyle hall',
      d: 'Go in and walk to a corner rather than straight ahead. The arches only do what they do when you are inside the grid looking diagonally across it.' },
    { n: 'The mihrab',
      d: 'An octagonal chamber with a scallop-shell dome carved from a single block of marble, under a ribbed cupola of Byzantine gold mosaic that the emperor in Constantinople sent craftsmen to make. The finest square metres in Spain.' },
    { n: 'The cathedral in the middle',
      d: 'Worth looking at properly rather than resenting. The vaulting is good Gothic and the choir stalls are mahogany from the Americas, carved in the 1750s.' },
    { n: 'Free entry', t: 'Monday to Saturday, 8.30 to 9.30am',
      d: 'An hour each morning with no ticket, no groups and almost nobody. Children under ten are not admitted in that slot. It is by far the best time to be in the building.' },
    { n: 'The bell tower',
      d: 'The old minaret encased in a Renaissance shell, climbed on a timed ticket for the view down onto the roofs of the hall.' },
    { n: 'The courtyard',
      d: 'The Patio de los Naranjos, where the ablution fountains were, now orange trees in a grid that continues the line of the columns inside. Free, and shaded.' }
  ],
  when: 'Year round. The early free hour any weekday morning. Avoid midday in high summer.',
  stay: 'Ninety minutes, or two visits: the free morning hour and a paid one later.',
  move: 'In the middle of Córdoba’s old town, ten minutes on foot from the station side.',
  eat: 'The streets immediately around it are aimed at coach parties. Walk north past the Jewish quarter or east to the Plaza de la Corredera.'
},

'ADL-ronda': {
  intro: [
    'Ronda sits on a plateau split by the Tajo, a gorge a hundred and twenty metres deep cut by a river that is now barely a stream. The Puente Nuevo crossing it took forty-two years and was finished in 1793, and there is a chamber inside the central pier that was used as a prison and, during the civil war, for worse.',
    'That civil war history is the other reason the name is known. Hemingway set the massacre in For Whom the Bell Tolls here, with Republicans throwing Nationalist sympathisers off the cliff, and while the details are fictional something along those lines did happen in the town in 1936.',
    'The bullring is one of the oldest in Spain and this is where the modern rules of bullfighting on foot were codified in the eighteenth century by the Romero family. Whatever you think of it, the building itself is a beautiful piece of eighteenth-century stone and the museum explains the argument from the inside.'
  ],
  see: [
    { n: 'The Puente Nuevo from below',
      d: 'Everybody photographs the bridge from the top. The walk down to the Mirador de Aldehuela and on to the valley floor at Los Molinos takes about forty minutes each way and shows you what it actually is.' },
    { n: 'Plaza de Toros',
      d: 'Built in 1785, with a double arcade of Tuscan columns and a sand ring thirty-six metres across. The museum covers both the bullfighting and the horsemanship, and the ring is empty and open most days.' },
    { n: 'The Arab baths',
      d: 'Thirteenth century and among the best preserved in Spain, with the star-shaped skylights intact and the hydraulic system explained in a short film. Down the hill at the old bridge.' },
    { n: 'Casa del Rey Moro and the water mine',
      d: 'A staircase of two hundred-odd steps cut inside the cliff down to the river, built so the town could draw water under siege. Steep, wet and worth it.' },
    { n: 'The Serranía de Ronda',
      d: 'The hills around are full of white villages, and the road from Ronda down to San Pedro is one of the best drives in Andalusia. Grazalema and Setenil are both within an hour.' },
    { n: 'Staying the night',
      d: 'Ronda is a coach day trip from the Costa del Sol and it fills from eleven to five. In the evening it is a small working town with the gorge lit, and it is a different place.' }
  ],
  when: 'Spring and autumn. Summer days are hot and full of buses. The Feria de Pedro Romero in early September is the big local week.',
  stay: 'A night, which excludes you from the day-trip problem.',
  move: 'The train from Granada or Algeciras is slow and spectacular. By road, ninety minutes from Málaga up a lot of bends.',
  eat: 'Mountain food rather than coastal: oxtail, partridge, mountain ham from the villages, and the local wine, which has had a serious revival since the 1990s.'
},

'ADL-malaga': {
  intro: [
    'For forty years Málaga was the place you landed to go somewhere else. Then between about 2003 and 2015 the city pedestrianised its centre, cleaned up the port, and opened or landed close to forty museums including a Picasso collection, a Pompidou outpost and a branch of the Russian Museum of St Petersburg.',
    'It worked. The old town is now one of the pleasantest in Spain to walk around, and the fact that Picasso was born here in 1881 and left at ten gives the whole thing a spine.',
    'Underneath all of that is an older place: a Roman theatre uncovered in 1951 sitting directly below an eleventh-century Islamic fortress, with a Phoenician foundation under both. Málaga has been a port for about two thousand eight hundred years and the archaeology keeps surfacing whenever anyone digs a car park.'
  ],
  see: [
    { n: 'The Alcazaba and Gibralfaro',
      d: 'A fortified palace of the Taifa period on the hill, with a walled corridor climbing to the castle above. Combined ticket. The Roman theatre sits at the foot of the entrance, which is an unusually direct piece of stratigraphy.' },
    { n: 'Museo Picasso Málaga',
      d: 'Two hundred-odd works in a sixteenth-century palace, donated by his daughter-in-law and grandson. Not the greatest Picasso collection but the only one in the city he was born in, and the building is good.' },
    { n: 'The Mercado Atarazanas',
      d: 'A nineteenth-century iron market built around a fourteenth-century Moorish shipyard arch, with a stained glass window at the end. Eat at the stalls at the back rather than buying.' },
    { n: 'The cathedral',
      d: 'Known as La Manquita, the one-armed lady, because the second tower was never finished; the money reportedly went to the American war of independence. The roof tour is the best thing about it.' },
    { n: 'Soho and the street art',
      d: 'A district between the centre and the port given over to large commissioned murals, including a nine-storey Obey Giant. Walkable in an hour.' },
    { n: 'El Caminito del Rey',
      d: 'An hour inland, a walkway pinned to a gorge wall a hundred metres up, rebuilt in 2015 after years as the most dangerous path in Spain. Booked online, one direction only, and genuinely thrilling.' }
  ],
  when: 'Year round. Málaga has the mildest winter of any mainland Spanish city and January here is about eighteen degrees. August is hot and the beaches are full.',
  stay: 'Two nights, and it is the obvious base for the rest of the province.',
  move: 'The best-connected airport in Andalusia, with the train into the centre in twelve minutes. AVE to Madrid in under three hours.',
  eat: 'Espetos, sardines skewered on a cane and grilled over a wood fire in a boat full of sand on the beach, which is a Málaga thing and best at Pedregalejo. Also fried fish, sweet Málaga wine from the barrel at Antigua Casa de Guardia.'
},

'ADL-cadiz': {
  intro: [
    'Phoenicians from Tyre founded Gadir around 1100 BC, which if the date is anywhere near right makes Cádiz the oldest continuously inhabited city in western Europe. The old town sits on the end of a sand spit, almost surrounded by water, so every street ends at the sea and the light comes off it from three sides.',
    'The 1812 constitution was written here, in a city under French siege, and it was the first liberal constitution in Spain. People still call it La Pepa. The siege failed partly because the geography makes the place almost impossible to take.',
    'What Cádiz is not is grand. It is a compact, salt-eroded, slightly shabby working port where washing hangs across the lanes and the carnival in February is the best in Spain because it is built on satirical singing groups rather than costumes. Of all Andalusian cities it is the one least interested in impressing visitors.'
  ],
  see: [
    { n: 'The Torre Tavira',
      d: 'One of over a hundred and twenty merchant watchtowers built to spot incoming ships, now with a camera obscura that projects the living city onto a dish in a darkened room. The best fifteen-minute explanation of a city layout anywhere.' },
    { n: 'La Caleta',
      d: 'A small beach between two fortresses in the middle of the old town, with a 1920s bathhouse on stilts across it. Sunset here is the local ritual and the water is bathwater in September.' },
    { n: 'The cathedral',
      d: 'Yellow-tiled dome, a hundred and sixteen years in the building and visibly so, with the composer Manuel de Falla in the crypt. Climb the Torre de Poniente for the whole spit laid out.' },
    { n: 'Carnaval', t: 'February, eleven days',
      d: 'Chirigotas are satirical choirs who spend a year writing songs about the year’s politics and perform them in the street and in a competition at the Falla theatre. Understanding the jokes needs Spanish; the atmosphere does not.' },
    { n: 'The Roman theatre',
      d: 'Found in 1980 under the Santa María quarter, second largest in the Roman world when built, and most of it is still under houses. Free entry and almost no one in it.' },
    { n: 'Barrio de la Viña',
      d: 'The old fishermen’s quarter, the heart of carnival, with the best fried fish in the city on Calle Virgen de la Palma. Buy it by weight in a paper cone from a freiduría and eat it standing up.' }
  ],
  when: 'February for carnival. May, June and September for the beaches. The Atlantic here is cooler and rougher than the Mediterranean, and the levante wind can blow for days.',
  stay: 'Two nights.',
  move: 'Train from Seville in about ninety minutes along the bay. The old town is small and entirely walkable; do not bring a car into it.',
  eat: 'Pescaíto frito, fried fish done better here than anywhere. Tortillitas de camarones, a lacy shrimp fritter. Sherry from El Puerto and Sanlúcar across the bay, and the manzanilla tastes different because of the sea air in the bodegas.'
},

'ADL-jerez': {
  intro: [
    'Sherry is made from the same grapes as a lot of other Spanish wine. What makes it sherry is the solera: a stack of barrels where wine is drawn from the oldest row and topped up from the row above, year after year, so that no bottle is a vintage and every bottle contains a trace of everything that came before it. Some soleras have been running since the early nineteenth century.',
    'The other thing is flor, a living yeast layer that grows on the surface of the wine in the barrel and protects it from oxygen. It only happens reliably in this triangle of chalk soil between Jerez, El Puerto and Sanlúcar, because of the humidity the Atlantic brings in.',
    'Jerez is also the centre of Andalusian horsemanship and one of the three contested birthplaces of flamenco, along with Seville and Cádiz. The gypsy quarter of Santiago produced a disproportionate number of the great singers and the February festival here is the most serious one in Spain.'
  ],
  see: [
    { n: 'A bodega tour',
      d: 'González Byass, Lustau and Tío Pepe are the big ones; Fernando de Castilla and Tradición are smaller and better. Ask specifically to taste across the range from fino to oloroso to Pedro Ximénez, because the span is the point.' },
    { n: 'The Royal Andalusian School of Equestrian Art',
      d: 'The horse ballet runs on Tuesdays and Thursdays and the training sessions on other mornings are cheaper and more interesting. The Carthusian horses here are bred from a line the monks kept going from the fifteenth century.' },
    { n: 'Festival de Jerez', t: 'late February into March',
      d: 'Two weeks of flamenco at a level the tourist shows do not reach, with classes in the mornings and performances all evening. Book accommodation well ahead.' },
    { n: 'The Alcázar',
      d: 'Twelfth-century Almohad, with a working mosque converted to a chapel, octagonal baths and an olive mill in the grounds. Also a camera obscura in the palace tower.' },
    { n: 'Sanlúcar de Barrameda',
      d: 'Twenty minutes away, at the mouth of the Guadalquivir, where manzanilla is made and where horse races run along the beach at low tide every August. The langostinos here are a serious local obsession.' },
    { n: 'Barrio de Santiago',
      d: 'The gypsy quarter, with the flamenco documentation centre and a handful of peñas. Quiet in the day and not a show.' }
  ],
  when: 'Late February for the flamenco festival, May for the Feria del Caballo, September for the harvest. Summer is extremely hot.',
  stay: 'A night, or use it as a day trip from Cádiz or Seville.',
  move: 'Train from Seville or Cádiz. The airport is small but has flights from northern Europe.',
  eat: 'Sherry with food rather than before it: fino with jamón and olives, amontillado with soup, oloroso with game. Berza, a winter stew, and the local artichokes in spring.'
},

'ADL-ubeda-baeza': {
  intro: [
    'Two towns nine kilometres apart that got rich on olive oil and wool in the sixteenth century, spent the money on Italian Renaissance architecture, and then stopped. Neither has grown much since, so what you have is a pair of small Spanish towns built almost entirely in one style and one decade.',
    'The architect for most of it was Andrés de Vandelvira, who worked here for thirty-odd years and whose buildings are the reason UNESCO listed both towns together in 2003. He was doing in Jaén province what Michelangelo was doing in Rome, at the same time, with less money and more restraint.',
    'The province around them is a sea of olive trees. Sixty million of them, in rows to the horizon in every direction, producing roughly a fifth of all the olive oil on earth. The drive in is monotonous and then the scale of it becomes the point.'
  ],
  see: [
    { n: 'Plaza Vázquez de Molina, Úbeda',
      d: 'A single square holding a chapel, a palace, a church and a town hall all by or around Vandelvira. The Sacra Capilla del Salvador has a sacristy that is the best Renaissance interior in Andalusia.' },
    { n: 'Baeza cathedral and the seminary',
      d: 'A Gothic cathedral given a Renaissance interior, with a painted iron grille from 1518 and a cloister with the old mosque arches still in one wall. The seminary opposite has student graffiti in bull’s blood from the seventeenth century.' },
    { n: 'Úbeda’s potters',
      d: 'Calle Valencia has workshops still turning green-glazed ware on kick wheels and firing in wood kilns, a tradition that goes back to the Moorish period. Tito and Melchor Tito are the names.' },
    { n: 'The olive oil',
      d: 'Several mills around both towns do tastings. Picual is the dominant variety here and a good one tastes of green tomato and pepper at the back of the throat.' },
    { n: 'Antonio Machado in Baeza',
      d: 'The poet taught French here for seven years after his wife died and hated the cold. His classroom is preserved in the old university.' },
    { n: 'The Cazorla sierra',
      d: 'Forty minutes east, the largest protected area in Spain, with deer, ibex, griffon vultures and the source of the Guadalquivir.' }
  ],
  when: 'Spring and autumn. The olive harvest runs from late November into February and the mills are working then. Summer on the Jaén plain is brutal.',
  stay: 'A night in Úbeda, which has a parador in a Vandelvira palace.',
  move: 'A car. Buses exist from Jaén and Granada and are slow. Linares-Baeza station is a long way from either town.',
  eat: 'Everything cooked in oil that was pressed within forty kilometres. Andrajos, a flat pasta stew with hare. Ochío, a bread with paprika and oil.'
},

'ADL-sierra-nevada': {
  intro: [
    'Mulhacén is 3,479 metres, which makes it the highest mountain in mainland Spain, and from the top on a clear day you can see Morocco. The range runs for about eighty kilometres and holds more than twenty peaks above three thousand.',
    'The ski resort sits at around 2,100 metres and is the southernmost in Europe. Its season runs from late November into April and the snow is unreliable in a warming climate, which the resort manages with a large amount of artificial cover. The selling point is that you can be on the beach at Motril in an hour.',
    'The more interesting side is the south: Las Alpujarras, a set of valleys of white villages with flat clay roofs and chimneys like small towers, which is where the Moriscos went after 1492 and where Berber building methods survived longest. Gerald Brenan lived in Yegen and wrote South from Granada about it in the 1920s.'
  ],
  see: [
    { n: 'The Alpujarras villages',
      d: 'Pampaneira, Bubión and Capileira stacked up the Poqueira gorge, with Trevélez higher up at 1,476 metres and curing hams in the dry air. The road through them is one of the best in Spain.' },
    { n: 'Climbing Mulhacén',
      d: 'From Capileira in summer a park bus takes you to Mirador de Trevélez and the walk to the top is about four hours. There is no technical difficulty and there is a lot of altitude.' },
    { n: 'Skiing', t: 'December to April',
      d: 'Over a hundred kilometres of runs on mostly south-facing slopes, which means spring snow and sunburn. Night skiing on Saturdays is a local peculiarity.' },
    { n: 'The Veleta road',
      d: 'The highest road in Europe, closed to cars above the ski station, walkable or cyclable to 3,394 metres. A legendary and punishing climb on a bike.' },
    { n: 'The ibex',
      d: 'Several thousand Spanish ibex live here and they are genuinely easy to see above the treeline, particularly at dawn.' },
    { n: 'Jamón de Trevélez',
      d: 'Cured at 1,500 metres with nothing but salt and mountain air, for eighteen months upwards. Protected designation and worth the detour.' }
  ],
  when: 'July to September for walking, December to April for snow. The high peaks hold snow into June and the park bus only runs in summer.',
  stay: 'Two nights in the Alpujarras.',
  move: 'An hour from Granada by road to the ski station, longer to the villages. Buses run to Capileira.',
  eat: 'Plato alpujarreño: ham, blood sausage, chorizo, potatoes and a fried egg, which is a lot of lunch. Trevélez ham. Costa wine from the slopes below.'
},

'ADL-cabo-de-gata': {
  intro: [
    'This is the driest place in Europe. Under two hundred millimetres of rain a year, which is Saharan, and the vegetation reflects it: agave, prickly pear, dwarf fan palm and a lot of bare volcanic rock. The headland is the eroded remains of a volcanic system about fifteen million years old.',
    'It was protected in 1987, early enough to stop the development that swallowed the rest of the Mediterranean coast. That is why the beaches here have nothing behind them: no apartment blocks, no promenade, in several cases no road. You park and walk.',
    'The clarity of the water is a consequence of the same dryness. Almost no rivers mean almost no sediment, and there is a posidonia seagrass meadow offshore that filters what there is. Snorkelling here is better than anywhere else on mainland Spain.'
  ],
  see: [
    { n: 'Playa de los Muertos',
      d: 'White pebbles and clear water reached by a twenty-minute walk down from the road. The name is grim and historical. No shade and no facilities; bring water.' },
    { n: 'Cala de San Pedro',
      d: 'Reached only on foot in about an hour from Las Negras, or by boat, with a ruined castle and a small alternative community that has lived there for decades.' },
    { n: 'The salinas',
      d: 'Working salt pans near Cabo de Gata village with a hide on the road. Greater flamingos from spring through autumn, often several thousand.' },
    { n: 'Snorkelling at Isleta del Moro',
      d: 'Rock, seagrass and octopus straight off the shore. Several operators run kayak and snorkel trips from San José.' },
    { n: 'Las Negras and Rodalquilar',
      d: 'A fishing hamlet and an abandoned gold mining village respectively, the latter with the processing plant left standing in the valley.' },
    { n: 'The lighthouse and the Arrecife de las Sirenas',
      d: 'Volcanic dykes sticking out of the sea below the cape, named for the monk seals that used to haul out on them before they were hunted out.' }
  ],
  when: 'April to June and September to October. July and August are hot with no shade and the beaches fill. Winter is mild, empty and windy.',
  stay: 'Two or three nights in San José or Las Negras.',
  move: 'A car is essential. Almería airport is forty minutes away. Several beach roads are rough track.',
  eat: 'Red prawns from Garrucha, which are among the best in Spain. Simple grilled fish in San José. Not a gastronomic destination and nobody pretends otherwise.'
},

'ADL-donana': {
  intro: [
    'Doñana is where the Guadalquivir reaches the Atlantic, and what it produces is a mosaic: shifting dunes moving inland at six metres a year, stone pine and cork forest, and above all the marisma, a seasonal marsh that floods in winter and dries to cracked mud by August.',
    'Six million birds pass through in a year. It is the single most important wetland in Europe for waterfowl on the African migration route, with greater flamingo, spoonbill, glossy ibis and Spanish imperial eagle, and in winter a quarter of a million ducks and geese.',
    'It is also the last stronghold of the Iberian lynx, which was down to under a hundred animals in 2002 and is now above two thousand across Spain and Portugal following one of the more successful conservation programmes anywhere. Seeing one is still unlikely and the attempt is part of the appeal.'
  ],
  see: [
    { n: 'The official 4x4 tour',
      d: 'Four hours from El Acebuche across dune, forest and marsh. Numbers are strictly capped and it is the only way into the core zone. Book well ahead and take binoculars; the guides do not carry spares.' },
    { n: 'José Antonio Valverde visitor centre',
      d: 'On the far side near the marsh at Aznalcázar, with hides looking straight onto a colony. The best bird watching in the park and far fewer people than the western entrances.' },
    { n: 'El Rocío',
      d: 'A village with sand streets, hitching rails instead of kerbs and a basilica, which for one weekend at Pentecost receives around a million pilgrims arriving in ox carts and on horseback. The rest of the year it is strange and almost empty.' },
    { n: 'Matalascañas and the dune front',
      d: 'Where the mobile dunes meet the beach and bury the pine forest as they go. Walking north along the sand gets you away from the resort within twenty minutes.' },
    { n: 'The lynx',
      d: 'El Acebuche has a breeding centre with a video feed rather than a viewing window. Wild sightings happen at dawn and dusk on the park margins and are a matter of luck.' },
    { n: 'Sanlúcar by boat',
      d: 'A boat crosses from Sanlúcar de Barrameda to the Doñana shore with a guided walk, which is the easiest way in from the Cádiz side.' }
  ],
  when: 'Winter and early spring for numbers of birds, spring for breeding plumage and flowers. August is dry, hot and comparatively empty of wildlife.',
  stay: 'A night at El Rocío, which puts you at the marsh edge for dawn.',
  move: 'A car. An hour from Seville or Huelva. All core-zone access is by booked tour only.',
  eat: 'Prawns from Huelva, which are the best in Spain, and Iberian ham from the dehesa inland at Jabugo.'
},

'ADL-tarifa': {
  intro: [
    'Tarifa is the southernmost point of continental Europe, fourteen kilometres from Morocco across a strait that funnels wind almost continuously. The levante blows from the east, hot and relentless; the poniente from the Atlantic, cooler and gentler. Between them the town gets usable wind on something like three hundred days a year.',
    'That made it the kitesurfing capital of Europe, and in summer the beaches north of town carry hundreds of kites at once. It also gives Tarifa a particular character: young, transient, multilingual, and more Moroccan in feel than anywhere else in Spain.',
    'The strait is a migration bottleneck. Everything crossing between Europe and Africa funnels through here, which means storks and raptors in their hundreds of thousands in spring and autumn, and orcas, pilot whales and fin whales in the water below.'
  ],
  see: [
    { n: 'Kitesurfing and windsurfing',
      d: 'Valdevaqueros and Los Lances are the main beaches, with dozens of schools. Beginners should expect the levante to be too much; the poniente days are the teachable ones.' },
    { n: 'Whale watching',
      d: 'Pilot whales and common dolphins year round, sperm whales in summer, and orcas in July and August hunting bluefin tuna in the strait. Several non-profit operators run trips with biologists aboard.' },
    { n: 'Bird migration', t: 'March to May, August to October',
      d: 'Honey buzzards, black kites and white storks cross in thousands on days with the right wind. The observatories at Cazalla and Algarrobo are free and staffed.' },
    { n: 'Bolonia and Baelo Claudia',
      d: 'A Roman town on the beach, with a forum, basilica, theatre and the fish-salting tanks that made it rich. The dune above it is thirty metres high and climbable.' },
    { n: 'The old town',
      d: 'Still walled, with a Moorish street plan, a castle from 960 and the Puerta de Jerez. Small, white and genuinely Moroccan in feel.' },
    { n: 'Tangier',
      d: 'A fast ferry takes an hour. A day trip is entirely feasible and a night is better.' }
  ],
  when: 'May to October for the water. Spring and autumn for birds. The levante in July and August can be exhausting; locals say it affects the temper.',
  stay: 'Two nights, more if you are learning to kite.',
  move: 'An hour from Algeciras or two from Málaga. No train. Ferries to Tangier from the port.',
  eat: 'Tuna, specifically almadraba tuna caught in the traditional trap nets off Barbate and Zahara in spring. Every part of it is used and a good restaurant will serve five different cuts.'
},

'ADL-nerja-frigiliana': {
  intro: [
    'Nerja sits on a low cliff with a terrace called the Balcón de Europa pushed out over the sea, built on the remains of a fort the British destroyed in 1812. The coast either side is a series of small coves under the Sierra de Almijara, which drops almost straight into the water.',
    'Four kilometres inland and three hundred metres up is Frigiliana, repeatedly voted the prettiest village in Andalusia, which is the kind of claim that usually means disappointment and in this case does not. The upper quarter is the old Morisco street plan: lanes a metre and a half wide, stepped, whitewashed, with ceramic panels telling the story of the 1569 revolt that ended with the village besieged on the rock above.',
    'The cave at Maro, found by boys hunting bats in 1959, is the other reason people come. It holds chambers up to thirty metres high and paintings that a 2012 study dated to around forty-two thousand years ago, which if correct would make them the work of Neanderthals and the oldest art on earth. The dating is contested.'
  ],
  see: [
    { n: 'Cuevas de Nerja',
      d: 'Five kilometres of chambers of which about a third is open, including a column thirty-two metres high that is the largest in the world. The paintings are not on the public route.' },
    { n: 'Frigiliana old town',
      d: 'Park at the bottom and walk up. The ceramic panels follow the 1569 Morisco rebellion in sequence. Go in the early evening when the day trippers have gone.' },
    { n: 'The Balcón de Europa',
      d: 'A palm-lined terrace on the headland with the coast running east and west. Touristy, unavoidable and genuinely good at sunset.' },
    { n: 'Maro and the Acantilados',
      d: 'A protected cliff coast east of town with coves reached by steep paths, and the Maro waterfall dropping onto the beach. Kayak trips run along it from Burriana.' },
    { n: 'Río Chíllar',
      d: 'A river walk inland from Nerja, through a narrowing gorge, where in summer you simply walk up the riverbed in the water. Several hours and about as much fun as a walk gets.' },
    { n: 'The Sierra de Almijara',
      d: 'Behind the village, with ibex, pine forest and walking up to El Cielo at 1,508 metres for a view that takes in the Rif mountains.' }
  ],
  when: 'May, June, September and October. July and August are very busy. The river walk needs summer water levels.',
  stay: 'Two nights, with a night in Frigiliana if you can.',
  move: 'An hour east of Málaga by bus or car. No train. Frigiliana is a short bus or a steep walk.',
  eat: 'Espetos on Burriana beach. Boquerones, fresh anchovies. In Frigiliana, local sweet wine and a strong Moorish influence in the pastry.'
},

'ADL-setenil': {
  intro: [
    'Setenil is built under a rock. The Trejo river cut a gorge through soft tufa and the overhang it left was deep enough to live beneath, so instead of excavating caves the villagers simply walled in the gap and used the cliff as a roof. Whole streets have stone overhead rather than sky.',
    'The two to see are Calle Cuevas del Sol, which gets the light, and Calle Cuevas de la Sombra, which does not and is cooler by about five degrees in August. Bars put their tables under the rock and you sit with several thousand tonnes of tufa a metre above your head.',
    'The name comes from septem nihil, seven times no, because the Christians failed to take it seven times before finally succeeding in 1484. Given the geography that is easy to believe.'
  ],
  see: [
    { n: 'Calle Cuevas del Sol',
      d: 'The famous street, with the overhang running the length of it and the river below. Narrow, busy at lunchtime, and worth walking twice.' },
    { n: 'Calle Cuevas de la Sombra',
      d: 'The shaded one, where the rock comes down lower and the street is closer to a tunnel. Cooler, darker and considerably less photographed.' },
    { n: 'The Torreón',
      d: 'What remains of the Nasrid castle, with a barrel-vaulted chamber and a view down onto the roofs and the gorge. A few euros and five minutes.' },
    { n: 'The Mirador del Carmen',
      d: 'Above the village, giving you the layout: the river cutting through, the houses stacked either side and the rock shelf over them.' },
    { n: 'Eating under the rock',
      d: 'Several bars on both streets. The local chorizo and the pork from the sierra are the thing, and the portions are unreconstructed.' },
    { n: 'Olvera and the Vía Verde',
      d: 'Twenty minutes away, a white town under a castle, and the start of a thirty-six kilometre disused railway converted to a walking and cycling route through tunnels and viaducts.' }
  ],
  when: 'Spring and autumn. Summer is hot but the shaded street is genuinely cool. Weekday lunchtimes are busiest.',
  stay: 'Two hours, or a night if you want the village after the coaches leave.',
  move: 'A car. Twenty minutes from Ronda on a winding road. Buses are infrequent.',
  eat: 'Pork from the sierra in every form, chorizo, and a local pastry. Nothing ambitious and nothing bad.'
},

'ADL-arcos': {
  intro: [
    'Arcos sits on a sandstone ridge above a loop of the Guadalete with a sheer drop on the northern side. It is the first of the pueblos blancos coming from Seville or Jerez and arguably the most dramatically sited, because the drop is immediate: there is a church, a square, a parador and then nothing for a hundred metres.',
    'The old town is a single street running the length of the ridge with lanes falling off it, and it is almost impossible to drive. A local bus does the run up and there is a reason it is a minibus. Leave the car at the bottom.',
    'The de la Frontera in the name, which half a dozen Andalusian towns carry, means it sat on the border between Christian and Muslim Spain for two centuries. That is why the castle is where it is and why the street plan is what it is.'
  ],
  see: [
    { n: 'Plaza del Cabildo',
      d: 'The castle on one side, the church of Santa María on another, the parador on a third, and the fourth open to a drop with only a low wall between you and the valley.' },
    { n: 'Santa María de la Asunción',
      d: 'Gothic with a Plateresque facade and a half-built tower that ran out of money after an earthquake. Climb it if it is open for the ridge from above.' },
    { n: 'The lanes',
      d: 'Walk the ridge from the square to the far end and come back along the lower lanes. Twenty minutes each way and the whole town in it.' },
    { n: 'Griffon vultures',
      d: 'They nest on the cliff below the plaza and ride the thermals at eye level from the terrace. Reliable in the late afternoon.' },
    { n: 'The Semana Santa bull',
      d: 'On Easter Sunday a bull is run through the old town’s narrow streets, which given the width of them is as alarming as it sounds.' },
    { n: 'The white towns route',
      d: 'Arcos is the western end. Grazalema, Zahara de la Sierra and Ubrique are all within an hour on roads that are the real attraction.' }
  ],
  when: 'Spring and autumn. Semana Santa is intense. Summer afternoons are too hot for the walking.',
  stay: 'A night, in the parador if you can, which has rooms directly over the drop.',
  move: 'A car, parked at the bottom. Half an hour from Jerez.',
  eat: 'Game from the sierra, and the Cádiz province sherries from down the road. The parador restaurant has the view and the town has better food.'
},

'ADL-tabernas': {
  intro: [
    'Tabernas is the only true desert in continental Europe. It is in rain shadow behind the Sierra de los Filabres and the Sierra Nevada, gets under two hundred and fifty millimetres a year, and the badlands of eroded clay and gypsum look enough like Arizona that between 1960 and 1980 around a hundred and fifty westerns were filmed here.',
    'Sergio Leone shot the whole Dollars trilogy in these hills and the cemetery from The Good, the Bad and the Ugly was built on a hillside near Santa Fe de Mondújar. Lawrence of Arabia, Indiana Jones and the Last Crusade and a long list of others used the same ground.',
    'Two of the sets still operate as theme parks with stunt shows, which is either charming or depressing depending on your disposition. The landscape itself needs no help.'
  ],
  see: [
    { n: 'Oasys and Fort Bravo',
      d: 'The two surviving film sets, with shootout shows several times a day. Fort Bravo is the less polished and more convincing of the two.' },
    { n: 'The Rambla de Tabernas',
      d: 'A dry riverbed you can walk up, between clay walls carved into gullies. Free, empty, and far more atmospheric than the sets.' },
    { n: 'The Leone locations',
      d: 'Several are identifiable from the films and reachable on foot. The Sad Hill cemetery was in Burgos, not here, which disappoints people regularly.' },
    { n: 'Plataforma Solar de Almería',
      d: 'A research facility with fields of heliostats aimed at a tower, open for booked technical visits. Strange and genuinely interesting.' },
    { n: 'Night skies',
      d: 'Among the darkest in mainland Europe, which is why the Calar Alto observatory sits in the range above. Several operators run stargazing from the desert floor.' },
    { n: 'Níjar',
      d: 'Half an hour towards the coast, a pottery and rag-rug town that supplies half of Almería with jarapas and glazed ware.' }
  ],
  when: 'Spring and autumn. Summer is over forty degrees with no shade whatsoever. Winter nights are cold and the skies are clearest.',
  stay: 'Half a day, usually combined with Cabo de Gata.',
  move: 'A car. Half an hour north of Almería on the A-92.',
  eat: 'Almería food is dry-country food: gurullos with rabbit, migas, and a lot of good cured ham from Serón in the mountains behind.'
},

'ADL-antequera': {
  intro: [
    'Three megalithic monuments sit at the edge of this town, built between about 3,800 and 3,000 BC, and together they make one of the most important prehistoric sites in Europe. Menga is the oldest and the largest: a chamber twenty-five metres long roofed with capstones weighing up to a hundred and eighty tonnes, which is heavier than anything at Stonehenge.',
    'What makes Menga remarkable is its orientation. Almost every passage grave in Europe faces the sunrise. Menga faces the Peña de los Enamorados, a limestone mountain two and a half kilometres away shaped exactly like a sleeping human face. It is aligned on a landscape feature rather than an astronomical one, which as far as anyone knows is unique.',
    'The town itself is a pleasant Baroque place of thirty-odd churches, and El Torcal above it is a limestone karst of weathered pillars that looks like a ruined city. All of it fits into one day and almost nobody comes.'
  ],
  see: [
    { n: 'Dolmen de Menga',
      d: 'Walk in. The chamber is tall enough to stand in and there is a well seventeen metres deep in the floor that predates the chamber. Look back out of the entrance and the mountain is framed in it.' },
    { n: 'Dolmen de Viera and El Romeral',
      d: 'Viera is beside Menga and has a long narrow passage. El Romeral, a kilometre away, is later and has a corbelled beehive vault rather than capstones, built with small stones.' },
    { n: 'El Torcal',
      d: 'Limestone laid down under a sea a hundred and fifty million years ago, then lifted and weathered into stacks of flat plates. Three marked routes from the visitor centre; the yellow one takes about two hours.' },
    { n: 'The Alcazaba and Santa María',
      d: 'A Moorish fortress above the town with a Renaissance church beside it, and a view over the plain to the Peña.' },
    { n: 'The Peña de los Enamorados',
      d: 'The face-shaped mountain. There is a path to the top and a legend about a Christian boy and a Moorish girl jumping off it, which is the usual story.' },
    { n: 'Laguna de Fuente de Piedra',
      d: 'Twenty minutes away, the largest natural lake in Andalusia and the biggest flamingo breeding colony in Spain, with up to twenty thousand pairs in a wet year.' }
  ],
  when: 'Spring for the flamingos and the wildflowers at El Torcal. Autumn is good. The dolmens are indoors in effect and fine year round.',
  stay: 'A day, or a night to do El Torcal at dawn.',
  move: 'A car. Forty-five minutes from Málaga. The high-speed station is some way out of town.',
  eat: 'Porra antequerana, a thicker cousin of salmorejo, and bienmesabe, an almond and sponge dessert the nuns here have made for centuries.'
},

'ADL-grazalema': {
  intro: [
    'Grazalema gets more rain than anywhere else in Spain. The record is a little over four thousand millimetres in a year, which is roughly three times Manchester, and it happens because wet Atlantic air hits this limestone wall first and dumps everything it is carrying.',
    'The result is a park that looks nothing like Andalusia: beech-like woodland, gorges full of water, and above all the pinsapo, a Spanish fir that is a relic of the ice ages and grows wild in only a handful of places on earth. The stands above Grazalema are the largest.',
    'The village is a white town at eight hundred metres with a wool industry that has run since the Middle Ages and one mill still working. It is also the base for some of the best walking in southern Spain, several routes of which need a free permit because the pinsapo forest is restricted.'
  ],
  see: [
    { n: 'El Pinsapar',
      d: 'The fir forest, on a route from Grazalema to Benamahoma that needs a permit from the park office and is capped daily. Twelve kilometres, mostly downhill if you walk it that way.' },
    { n: 'Garganta Verde',
      d: 'A gorge four hundred metres deep with griffon vultures nesting on the walls and a cave at the bottom. Permit required and closed in the nesting season from June to mid-September.' },
    { n: 'Zahara de la Sierra',
      d: 'A white village on a cone above a turquoise reservoir with a Nasrid tower on top. The drive from Grazalema over the Puerto de las Palomas is the best twenty minutes of road in the province.' },
    { n: 'The blanket mill',
      d: 'Artesanía Textil de Grazalema still weaves wool blankets and ponchos on old looms and will show you the process.' },
    { n: 'Griffon vultures',
      d: 'One of the densest colonies in Europe. They are visible constantly and from the Garganta Verde rim you look down on them flying.' },
    { n: 'Villaluenga del Rosario',
      d: 'The highest village in Cádiz province, with an oval bullring cut into the rock and a serious goat cheese tradition.' }
  ],
  when: 'April to June for the flowers and the water, September to November for the colour. Winter is genuinely wet. Permits are needed for several routes year round.',
  stay: 'Two nights.',
  move: 'A car. The roads are narrow and spectacular. Buses reach Grazalema and not much else.',
  eat: 'Payoyo cheese, made from a local goat breed that was down to a few hundred animals and has recovered. Sopa de tomate, lamb, and mountain ham.'
},

'ADL-rio-tinto': {
  intro: [
    'The river runs deep red because the rock it flows through is full of iron sulphides, and the bacteria that live on those sulphides produce sulphuric acid as a waste product. The water sits at about pH 2, which is roughly vinegar, and carries dissolved iron at concentrations that would be lethal to almost anything.',
    'Almost anything. The organisms that do live in it are extremophiles, and NASA and the Centro de Astrobiología study the river as the closest analogue on Earth to conditions on Mars, where the same iron and sulphur chemistry is written all over the surface.',
    'Mining here goes back about five thousand years, through Tartessian, Roman and then British hands: the Rio Tinto Company was formed in 1873 and ran it for nearly a century, building an English village, a Protestant church and a cricket pitch in the Andalusian hills. The company still exists and is now one of the largest mining firms on earth.'
  ],
  see: [
    { n: 'Corta Atalaya',
      d: 'An open pit twelve hundred metres across and three hundred and fifty deep, which was the largest in Europe. Viewed from a platform on the rim, in terraces of red and ochre rock.' },
    { n: 'The mining railway',
      d: 'Twelve kilometres along the riverbank in restored Victorian carriages, which is the only way to see the water close up for any distance.' },
    { n: 'Peña de Hierro',
      d: 'A smaller pit with the source of the river in it and an underground gallery you can walk into. This is where the NASA-linked drilling work was done.' },
    { n: 'Bellavista',
      d: 'The British managers’ village: red brick, bay windows, a cricket ground and a Presbyterian church, dropped into Huelva province and preserved.' },
    { n: 'The mining museum',
      d: 'With the Maharajah’s carriage, built for a royal visit to India that never happened and used instead by Alfonso XIII, which is the most ornate railway carriage in Spain.' },
    { n: 'Aracena',
      d: 'An hour north, with a cave of grottoes under the castle hill and the Jabugo ham villages in the hills around it.' }
  ],
  when: 'Spring and autumn. Summer on the Huelva plain is hot. The train runs weekends in low season and daily in summer.',
  stay: 'Half a day.',
  move: 'A car. About seventy-five minutes from Seville or Huelva.',
  eat: 'Jabugo ham from the Sierra de Aracena next door, which is the best in Spain and priced accordingly. Mushrooms in autumn.'
},

'ADL-mojacar': {
  intro: [
    'Mojácar is two places with the same name. Mojácar Pueblo is a white village on a hill two kilometres inland, Moorish in plan, with lanes too narrow for a car and a view over the Almería coast. Mojácar Playa is seventeen kilometres of beach and low-rise development at the bottom.',
    'That separation is why it survived. The village was almost abandoned in the 1960s and the mayor gave houses away to artists and writers to repopulate it, which drew a small bohemian crowd and, crucially, kept the development down at the water rather than on the hill.',
    'The indalo, a stick figure holding an arc over its head, is everywhere here. It was copied from Neolithic paintings in a cave at Vélez-Blanco and adopted as a local good-luck symbol in the 1960s, and it is now on half the doorways in the province.'
  ],
  see: [
    { n: 'The village',
      d: 'Park at the bottom and climb. The Mirador del Castillo is at the top, the church was built as a fortress, and the whole thing takes an hour at a wander.' },
    { n: 'La Fuente',
      d: 'The Moorish washing fountain below the village, where by tradition the surrender terms were negotiated in 1488. Still running and still used.' },
    { n: 'The beaches',
      d: 'Long, mostly coarse sand, with the quieter stretches at the southern end towards Macenas and a ruined watchtower.' },
    { n: 'Sunset from the village',
      d: 'West-facing over the Sierra Cabrera. The terrace bars on the upper lanes exist entirely for this.' },
    { n: 'Carboneras and the Playa de los Muertos',
      d: 'Twenty minutes south, at the northern edge of the Cabo de Gata park.' },
    { n: 'Vélez-Blanco',
      d: 'An hour inland, with a Renaissance castle whose entire marble courtyard was sold to an American collector in 1904 and is now in the Metropolitan Museum in New York.' }
  ],
  when: 'May, June, September and October. Almería has around three thousand hours of sun a year and the winter is mild.',
  stay: 'Two nights.',
  move: 'A car. An hour from Almería airport. Buses run between the village and the beach.',
  eat: 'Almería seafood, and the red prawns from Garrucha ten minutes up the coast, which are the local luxury.'
},

'ADL-almunecar': {
  intro: [
    'This stretch is called the Costa Tropical because it genuinely is. The Sierra Nevada stands directly behind it and blocks the cold, so the microclimate supports custard apples, mangoes, avocados and sugar cane, and there was a working sugar mill here until 2006. Average January temperature is around sixteen degrees.',
    'Almuñécar was Phoenician and then a significant Roman town, and the aqueduct that supplied it is still carrying irrigation water through the middle of the modern streets in five sections. There is also a fish-salting factory under the park, which is where garum, the Roman fermented fish sauce, was made for export.',
    'La Herradura, three kilometres west, is a horseshoe bay between two headlands and the best shore diving in Andalusia: the Cerro Gordo marine reserve has walls, caves and posidonia meadow within swimming distance of the sand.'
  ],
  see: [
    { n: 'The Roman aqueduct',
      d: 'Five surviving sections, one of which runs along a residential street. Still in use for irrigation, which is not true of many Roman aqueducts.' },
    { n: 'Cueva de Siete Palacios',
      d: 'Roman vaulted cisterns under the old town, now the archaeological museum, holding an Egyptian canopic jar of the seventh century BC found in a Phoenician grave here.' },
    { n: 'Diving at La Herradura',
      d: 'Cerro Gordo and Punta de la Mona, with walls to forty metres, octopus, moray and occasional sunfish. Several schools in the village.' },
    { n: 'Castillo de San Miguel',
      d: 'On the rock between the two main beaches, Phoenician foundations, Moorish walls and Charles V’s rebuilding, with a small museum.' },
    { n: 'The tropical fruit',
      d: 'Chirimoya, custard apple, is in season from October to February and is grown almost nowhere else in Europe. Roadside stalls inland towards Jete.' },
    { n: 'Cotobro and the coves',
      d: 'Small pebble beaches between headlands, reached down steps, with far fewer people than the main town beaches.' }
  ],
  when: 'Year round. Winter is the mildest on the Spanish mainland. July and August are busy with Granada families.',
  stay: 'Two nights.',
  move: 'A car or bus; it is about an hour from both Granada and Málaga. No railway.',
  eat: 'Fried fish, custard apple, avocado, and the local sweet wine. Espetos are grilled here too, though Málaga claims them.'
},

'CAT-barcelona': {
  intro: [
    'Barcelona spent most of its history squeezed inside Roman and medieval walls. In 1854 they were pulled down and Ildefons Cerdà laid out the Eixample: a grid of blocks with the corners cut off at forty-five degrees, producing octagonal junctions that were meant to let carriages turn and now mostly hold parked cars and terrace tables. It is one of the more successful pieces of nineteenth-century urban planning anywhere.',
    'Into that grid the city poured modernisme, Catalan art nouveau, between about 1888 and 1910, which is why there are Gaudí, Domènech i Montaner and Puig i Cadafalch buildings scattered through ordinary residential streets. Gaudí is the famous one and arguably not the best of the three.',
    'The beach is not historic. Barcelona turned its back on the sea for centuries and the waterfront was industrial until the city demolished it for the 1992 Olympics and trucked in sand. It worked so completely that most visitors assume it was always there.'
  ],
  see: [
    { n: 'Sagrada Família',
      d: 'Needs its own visit and its own entry below. Book a timed ticket well ahead.' },
    { n: 'Casa Batlló and La Pedrera',
      d: 'Two Gaudí apartment blocks on Passeig de Gràcia. La Pedrera’s roof, with its warrior chimneys and parabolic attic, is the better of the two and the night visit is the best version.' },
    { n: 'Palau de la Música Catalana',
      d: 'Domènech i Montaner, 1908, with an inverted stained glass dome in the ceiling and no artificial light needed in the daytime. A guided tour, or better, a concert.' },
    { n: 'The Gothic Quarter and El Born',
      d: 'Medieval Barcelona, with Santa Maria del Mar in El Born: a fourteenth-century church built by the parish itself in fifty-four years, which is why it is so unusually coherent.' },
    { n: 'Montjuïc',
      d: 'The hill above the port, with the Fundació Miró, the Catalan national art museum holding the best Romanesque fresco collection in the world, and a cable car.' },
    { n: 'Eating in Gràcia or Sant Antoni',
      d: 'Both are residential, both have market halls, and neither is on the tourist route. The Eixample and the Gothic Quarter are where you get overcharged.' }
  ],
  when: 'May, June, September and October. August is hot, humid and half the good restaurants are shut. La Mercè in late September is the city’s own festival and the best week to be here.',
  stay: 'Four nights.',
  move: 'The airport is twenty minutes by train or metro. The city is flat and walkable and the metro covers the rest. Watch your bag on Las Ramblas and on the L3.',
  eat: 'Catalan rather than Spanish: pa amb tomàquet, bread rubbed with tomato; escalivada; calçots in winter with romesco; fideuà, which is paella made with short noodles. Vermouth before lunch on a Sunday is a local institution.'
},

'CAT-sagrada-familia': {
  intro: [
    'Gaudí took over the project in 1883, a year after it started, and worked on it for forty-three years, living on site for the last decade. When he was hit by a tram in 1926 he was dressed so shabbily that nobody recognised him and he was taken for a beggar. He died three days later and is buried in the crypt.',
    'The building is funded entirely by donations and ticket sales, which is why it has taken so long, and the plans were burned by anarchists in 1936, which is why the completion has been contested ever since. Work now runs on computer models reconstructed from salvaged plaster fragments and photographs.',
    'The structural idea is the thing. Gaudí worked out the geometry using an upside-down model of strings and weighted bags, which produces catenary curves that carry load in pure compression. That is why there are no flying buttresses, which he called crutches, and why the columns branch like trees.'
  ],
  see: [
    { n: 'The nave',
      d: 'Go in the late afternoon. The west windows are in reds and oranges and the east in blues and greens, so the colour across the floor moves from cool to warm through the day. It is the best light in any church in Europe.' },
    { n: 'The Nativity facade',
      d: 'The only one Gaudí finished, and the only part that is unambiguously his. Dense, organic, with real plants and local people cast from life. UNESCO lists this facade and the crypt specifically.' },
    { n: 'The Passion facade',
      d: 'By Josep Maria Subirachs from 1986, angular and stripped back, and deeply unpopular with a certain kind of purist. The magic square on it adds to thirty-three in every direction.' },
    { n: 'A tower', t: 'extra ticket, timed',
      d: 'Lifts up one of the facades and stairs down a spiral. The Nativity tower gives the better view, the Passion the better descent. Not for anyone uneasy with heights or confined spaces.' },
    { n: 'The crypt and museum',
      d: 'Underneath, with the hanging chain models, the plaster workshop and Gaudí’s tomb. The models explain the whole building better than any description.' },
    { n: 'The completion',
      d: 'The central Tower of Jesus Christ is topping out and will make this the tallest church in the world at about a hundred and seventy-two metres, deliberately one metre lower than Montjuïc because Gaudí said no work of man should exceed the work of God.' }
  ],
  when: 'Year round, and always with a timed ticket bought online. Late afternoon for the light. First slot of the day for the fewest people.',
  stay: 'Ninety minutes, two hours with a tower.',
  move: 'Metro L2 or L5 to Sagrada Família. The square outside is a crowd; the ticketed entrance is on the Nativity side.',
  eat: 'The immediate streets are tourist cafes. Walk ten minutes into the Eixample or up to Gràcia.'
},

'CAT-park-guell': {
  intro: [
    'This was supposed to be a gated estate of sixty houses for wealthy families, financed by Eusebi Güell, Gaudí’s long-suffering patron. It failed completely. Two houses were built and one of them was Gaudí’s own; the city bought the land in 1922 and opened it as a park.',
    'What survives is the infrastructure: the entrance pavilions, the hypostyle hall that was going to be the market, the serpentine bench above it, and the viaducts carrying the roads around the hillside on columns made of the stone dug out to make the terrace.',
    'The bench is covered in trencadís, broken tile mosaic, and most of it was executed by Josep Maria Jujol rather than Gaudí. It is a hundred and ten metres long, undulating so that groups of people sit facing each other, and it drains rainwater through the columns beneath into a cistern.'
  ],
  see: [
    { n: 'The monumental zone', t: 'timed ticket',
      d: 'The entrance buildings, the dragon stair, the hall and the bench. Capped at four hundred people per half hour since 2013, which has made it bearable. Book ahead.' },
    { n: 'The free part',
      d: 'Most of the park above the monumental zone costs nothing, has the viaducts and the pine woods, and is nearly empty. The Turó de les Tres Creus at the top gives the best view in the city.' },
    { n: 'The serpentine bench',
      d: 'Sit on it. The curve of the back was reportedly shaped by having a workman sit in wet plaster, and it is more comfortable than it has any right to be.' },
    { n: 'The Gaudí House Museum',
      d: 'Where he lived for twenty years, with his furniture. A separate ticket and usually quiet.' },
    { n: 'The Austria gardens',
      d: 'Terraced planting in the free zone, with the nursery that supplied the city’s street trees.' },
    { n: 'Getting up there',
      d: 'It is a serious hill. Bus 24 or the outdoor escalators from Lesseps metro save a climb that visitors regularly underestimate.' }
  ],
  when: 'Early morning or the last slot. The middle of the day in summer is hot, exposed and crowded.',
  stay: 'Two hours including the free upper park.',
  move: 'Metro to Lesseps or Vallcarca then uphill, or the 24 bus to a gate near the top.',
  eat: 'Nothing good inside. Gràcia is at the bottom of the hill and is one of the best eating districts in the city.'
},

'CAT-gothic-quarter': {
  intro: [
    'The Roman colony of Barcino was founded around 10 BC and the Gothic Quarter is built directly on top of it. Four columns of the temple of Augustus stand almost ten metres high inside a courtyard off Carrer Paradís, in what is now a hiking club, and you can walk in and look at them for nothing.',
    'Underneath the Plaça del Rei there is more: four thousand square metres of excavated Roman street, with a laundry, a dyeworks, a garum factory and a wine press, reached through the city history museum. It is the largest excavated Roman city centre in Europe and it is under a square people cross without noticing.',
    'A warning that is rarely given: a lot of the medieval atmosphere is not medieval. The Bridge of Sighs on Carrer del Bisbe, the most photographed thing in the quarter, was built in 1928, and a good deal of neo-Gothic detail was added around the 1929 exposition. It is a beautiful piece of theatre on top of something genuinely old.'
  ],
  see: [
    { n: 'MUHBA Plaça del Rei',
      d: 'The underground Roman city. Allow ninety minutes, and note the laundry where urine was collected for bleaching, which is the detail everybody remembers.' },
    { n: 'The Temple of Augustus',
      d: 'Carrer Paradís 10, through an unmarked door, up a passage. Free. Four Corinthian columns on the highest point of the Roman town.' },
    { n: 'The cathedral cloister',
      d: 'Thirteen white geese live in it, one for each year of Saint Eulalia’s life before she was martyred. The cloister is free at most hours and the cathedral roof is worth the lift.' },
    { n: 'Plaça de Sant Felip Neri',
      d: 'A small square where an Italian air raid in 1938 killed forty-two people, most of them children sheltering in the church. The shrapnel scars are still in the facade and nobody has repaired them.' },
    { n: 'The Jewish quarter',
      d: 'El Call, one of the densest medieval Jewish quarters in Europe until the pogrom of 1391. The Sinagoga Major on Carrer Marlet may be the oldest in Europe, though that is argued.' },
    { n: 'The Roman walls',
      d: 'Substantial stretches survive, incorporated into later buildings, most visibly around Plaça Ramon Berenguer.' }
  ],
  when: 'Early morning or late evening. The middle of the day is impassable in summer.',
  stay: 'Half a day.',
  move: 'Metro Jaume I or Liceu. Entirely pedestrian. Pickpocketing here is organised and persistent.',
  eat: 'Mostly poor and overpriced in the quarter itself. El Born across Via Laietana is considerably better.'
},

'CAT-montserrat': {
  intro: [
    'Montserrat is a mass of conglomerate rock, pebbles cemented into a matrix by a river delta about forty million years ago, then uplifted and eroded into vertical fingers. It rises out of otherwise flat country and is visible from a long way off, which is presumably why it became sacred.',
    'The Benedictine monastery halfway up has been there since 1025 and holds La Moreneta, a twelfth-century polychrome wood Virgin who is black, probably because of varnish and candle smoke rather than intent. She is the patron saint of Catalonia and people queue to touch the orb she holds.',
    'The Escolania is one of the oldest boys’ choirs in Europe, documented from the fourteenth century, and they sing the Virolai at one in the afternoon most weekdays during term. It lasts about ten minutes and it is the single best reason to time a visit.'
  ],
  see: [
    { n: 'The basilica and La Moreneta',
      d: 'The queue to touch the statue runs up a side stair and takes anything from twenty minutes to an hour. The basilica itself is free.' },
    { n: 'The Escolania', t: 'about 1pm on weekdays, term time',
      d: 'Fifty boys, ten minutes, no ticket. Get into the basilica twenty minutes early for a seat. There is no performance in July or at Christmas.' },
    { n: 'Sant Joan funicular and the ridge walks',
      d: 'The funicular climbs to two hundred and fifty metres above the monastery and from there a path runs along the ridge. Sant Jeroni, the highest point at 1,236 metres, is about an hour further.' },
    { n: 'Santa Cova',
      d: 'A second funicular down to the cave where the image was supposedly found, along a path lined with modernista sculptures by Gaudí, Puig i Cadafalch and others.' },
    { n: 'The museum',
      d: 'Caravaggio, El Greco, Monet, Degas, Picasso and a serious Egyptian collection, which is an unexpected thing to find halfway up a mountain.' },
    { n: 'The rack railway versus the cable car',
      d: 'The cremallera rack train is longer and gentler; the Aeri cable car is five minutes and nearly vertical. Both from the valley floor, and the Aeri does not run in high wind.' }
  ],
  when: 'Spring and autumn. Avoid Sundays and the Virgin’s day on 27 April. Early arrival beats the coaches by about two hours.',
  stay: 'Most of a day, or a night in the monastery guest rooms, which empties the place around you.',
  move: 'Train R5 from Plaça Espanya to either Monistrol for the rack railway or Aeri for the cable car. A combined ticket covers both legs.',
  eat: 'A cafeteria and a restaurant, neither remarkable. Buy mató, the local fresh cheese, with honey from the stalls by the station.'
},

'CAT-girona': {
  intro: [
    'Girona was Roman, then Visigothic, then Moorish for about sixty years, then Carolingian, and it was besieged twenty-five times, which is a lot even by Catalan standards. The walls you can walk are partly Roman at the base and partly ninth century above.',
    'The Call, the Jewish quarter, was one of the most important Jewish centres in medieval Europe and produced Nahmanides, among the foremost Kabbalists of the thirteenth century. The community was expelled in 1492 and the quarter was walled up and built over, which paradoxically preserved it. It is the best-preserved Jewish quarter in Spain.',
    'The cathedral has the widest Gothic nave in the world at twenty-two and a half metres. The master builders argued about whether a single span was structurally possible for years before a commission of twelve architects was convened in 1416 to settle it. They were split; the chapter built it anyway and it has stood for six hundred years.'
  ],
  see: [
    { n: 'The cathedral',
      d: 'Ninety steps up from the square, then one enormous room. The Tapestry of Creation inside is an eleventh-century embroidery and one of the great survivals of Romanesque art.' },
    { n: 'The Call',
      d: 'Narrow stepped lanes off Carrer de la Força, with the Jewish History Museum in what was the last synagogue. Quiet and deliberately unreconstructed.' },
    { n: 'The city walls',
      d: 'Walkable for about two kilometres along the eastern side with towers to climb. Free, and the best overview of the city.' },
    { n: 'The Onyar houses',
      d: 'Painted facades hanging over the river, seen from the Pont de Pedra or the Eiffel bridge, which was built by Gustave Eiffel’s company in 1877.' },
    { n: 'The Arab baths',
      d: 'Twelfth century, Christian-built in the Moorish manner, with an octagonal skylight over the cold pool. Small and perfect.' },
    { n: 'El Celler de Can Roca',
      d: 'Twice rated the best restaurant in the world. The booking list opens eleven months ahead and goes in minutes. The Roca brothers’ cheaper places in town are easier.' }
  ],
  when: 'Spring and autumn. Temps de Flors in the second week of May fills every courtyard and staircase in the old town with flower installations and is the best week to come.',
  stay: 'A night, or a day trip from Barcelona.',
  move: 'AVE from Barcelona in thirty-eight minutes. Girona airport is a Ryanair hub twenty minutes away.',
  eat: 'Catalan sea-and-mountain cooking: chicken with prawns, rabbit with snails. Xuixo, a cream-filled fried pastry invented here.'
},

'CAT-figueres': {
  intro: [
    'Dalí was born in Figueres in 1904 and spent the last years of his life turning the burnt-out municipal theatre into a museum of his own work. He designed everything: the geodesic dome on the roof, the giant eggs along the parapet, the loaves of bread on the walls, and the layout of the galleries, which is deliberately disorienting.',
    'It is not a retrospective and it is not organised. There are no explanatory panels of any substance. Dalí said he wanted visitors to leave with the sensation of having had a theatrical dream, and the building is constructed to produce exactly that.',
    'He is buried under the floor of the central stage area, which he specified. The grave is a plain slab that people walk over without always realising, which would presumably have pleased him.'
  ],
  see: [
    { n: 'The Mae West room',
      d: 'A sofa, two paintings and a fireplace that resolve into a face when viewed through a lens from a stepladder at the right distance. A queue forms for the ladder and it is worth it.' },
    { n: 'Rainy Taxi',
      d: 'In the courtyard: a Cadillac with a mannequin inside, where a coin starts rain falling in the car. Dalí’s own, and still functioning.' },
    { n: 'The cupola room',
      d: 'Under the geodesic dome, with the Palace of the Wind ceiling and the crypt below.' },
    { n: 'Dalí-Joies', t: 'included',
      d: 'Thirty-nine pieces of jewellery he designed, including a ruby and gold heart that beats mechanically. In an adjoining space most people miss.' },
    { n: 'Portlligat and Púbol',
      d: 'The other two points of the Dalí triangle: his house at Cadaqués, with one-at-a-time entry, and the castle he gave Gala at Púbol, which he could only enter by written invitation from her.' },
    { n: 'Sant Ferran castle',
      d: 'The largest bastioned fortress in Europe, just outside town, which held the last Republican cabinet meeting of the civil war in February 1939.' }
  ],
  when: 'Year round. August evenings have a late opening with a glass of cava included, which is the best way to see it.',
  stay: 'Three hours for the museum, a day with Sant Ferran.',
  move: 'AVE from Barcelona to Figueres Vilafant in under an hour. The museum is a ten-minute walk from the old station.',
  eat: 'Figueres is not a food town. Cadaqués and the Empordà villages are an hour away and much better.'
},

'CAT-cadaques': {
  intro: [
    'Cadaqués is the far side of the Cap de Creus massif, and until the 1960s there was no proper road. Everything came by boat, which is why it stayed a fishing village while the rest of the Costa Brava filled with concrete, and why it still has a building code that keeps it white.',
    'Dalí spent his childhood summers here and lived at Portlligat, the next bay, from 1930 until Gala died in 1982. The house grew from one fisherman’s hut to a warren of connected huts over fifty years, and it is shown to eight people at a time by appointment, which is the best way to see any artist’s house.',
    'Beyond the village the Cap de Creus is a natural park of folded schist, scoured by the tramuntana wind, with almost no vegetation above knee height. Dalí painted these rocks repeatedly and the melting shapes in his work are considerably less invented than they look.'
  ],
  see: [
    { n: 'Casa-Museu Salvador Dalí, Portlligat', t: 'booked, eight at a time',
      d: 'The house as they left it: the stuffed polar bear in the hall, the egg on the roof, the studio with the canvas lift through the floor. Book weeks ahead.' },
    { n: 'Cap de Creus',
      d: 'The easternmost point of mainland Spain, with a lighthouse, a bar in the old keeper’s house and marked paths over the rock. The drive out is eight kilometres of bends.' },
    { n: 'The village',
      d: 'Whitewashed, steep, with a church on top holding a baroque altarpiece of absurd gilded density. Walk the seafront to the Dalí statue and then up into the lanes.' },
    { n: 'Sant Pere de Rodes',
      d: 'A Benedictine monastery of the tenth century on a ridge above the sea, half ruined, with one of the earliest vaulted Romanesque churches in Catalonia and a view down the whole coast.' },
    { n: 'The tramuntana',
      d: 'A north wind that can blow for three, six or nine days and reach a hundred and fifty kilometres an hour. Locals blame it for madness and the boats stay in.' },
    { n: 'Swimming',
      d: 'Small pebble coves rather than sand. Platja Gran in the village, or walk round to Sa Conca for fewer people.' }
  ],
  when: 'May, June, September. July and August fill it completely. The tramuntana is strongest in winter and spring.',
  stay: 'Two nights.',
  move: 'A car over the pass from Roses. Buses from Figueres. Parking in the village is limited and enforced.',
  eat: 'Sea urchins in winter, anchovies from L’Escala, and suquet de peix, a fisherman’s stew. The restaurants on the front are decent and the ones in the lanes are better.'
},

'CAT-costa-brava': {
  intro: [
    'The name was invented by a journalist in 1908 and means rugged coast, which is accurate for the northern half and a marketing lie for the southern. Between Blanes and Begur the shore is pine, schist and small coves; south of that it is Lloret de Mar and should be avoided unless you are nineteen.',
    'The thing that makes it walkable is the camí de ronda, a path the coastguard used to patrol for smugglers, which runs along the cliff edge linking the coves. Much of it has been restored and signed, and it goes where the road does not: down steps cut in the rock, across headlands, through tunnels in the cliff.',
    'The best stretch is Calella de Palafrugell to Llafranc to Tamariu, about seven kilometres with three villages and a lighthouse. You can swim at each end and in the middle, which is the correct way to do a coastal walk.'
  ],
  see: [
    { n: 'Calella de Palafrugell to Tamariu',
      d: 'The classic camí de ronda stretch. Two and a half hours at a stroll, with the Far de Sant Sebastià lighthouse at the midpoint and a bar at the top of it.' },
    { n: 'Cala Aiguablava and Fornells',
      d: 'Below Begur, where the water genuinely is the colour the name claims. Parking is severely limited in summer and it is better reached on foot.' },
    { n: 'Tossa de Mar',
      d: 'A walled medieval quarter on a headland, the only fortified town left on the Catalan coast, with a beach underneath it. Busy and still worth it.' },
    { n: 'Jardins de Cap Roig',
      d: 'A clifftop botanical garden above Calella made by a Russian colonel and an English aristocrat from 1927, with a summer concert season.' },
    { n: 'Begur and the Indiano houses',
      d: 'Villas built by locals who made money in Cuba in the nineteenth century, in a style that is unmistakably Caribbean and improbably sited in a Catalan hill town.' },
    { n: 'The Illes Medes',
      d: 'A marine reserve off L’Estartit with grouper, barracuda and a tunnel system. The best diving on the Catalan coast and good snorkelling from a boat.' }
  ],
  when: 'June and September. July and August are full and parking at the coves becomes genuinely impossible. May and October are quiet with cold water.',
  stay: 'Three nights based in Begur or Palafrugell.',
  move: 'A car, though the coastal villages are linked by summer buses. Girona airport is forty minutes inland.',
  eat: 'Anchovies from L’Escala, cured in salt for a year. Prawns from Palamós, which are a protected name. Suquet, and in winter calçots inland.'
},

'CAT-tarragona': {
  intro: [
    'Tarraco was the capital of Hispania Citerior and the largest Roman city in Spain, with something like thirty thousand people. Augustus wintered here in 26 BC and the provincial assembly met in a complex that covered the entire upper town, which is why the medieval street plan above still follows Roman foundations.',
    'The amphitheatre is the picture: built into the slope above the beach in the second century, with the sea behind it. In 259 the bishop Fructuosus and two deacons were burned alive in it, and a Visigothic basilica was later built in the middle of the arena over the spot. Those foundations are still there.',
    'The whole ensemble was listed by UNESCO in 2000 and includes a quarry, an aqueduct in the woods outside town, a triumphal arch on the old road and a funerary tower, which means a day here is mostly spent walking between Roman things.'
  ],
  see: [
    { n: 'The amphitheatre',
      d: 'On the seafront below the old town. Go down into it rather than photographing from the balcony above, which is what most people do.' },
    { n: 'Les Ferreres aqueduct',
      d: 'Four kilometres out, in woodland, two hundred and seventeen metres long and twenty-seven high, with eleven arches on a second tier. You can walk along the channel on top. Free and almost empty.' },
    { n: 'The Roman circus',
      d: 'Three hundred metres of chariot track underneath the modern streets, with vaulted substructures you walk through and come out in a tower. The best underground archaeology in Spain after Mérida.' },
    { n: 'The Passeig Arqueològic',
      d: 'A path between the Roman wall of the third century BC and the eighteenth-century British-built outer rampart, running round the top of the old town.' },
    { n: 'The cathedral',
      d: 'Built on the temple of Augustus, Romanesque at the back and Gothic at the front because it took so long. The cloister is the best part.' },
    { n: 'Castells', t: 'summer, and the Tarragona competition in odd-numbered Octobers',
      d: 'Human towers up to ten levels, a Catalan tradition from this area, with a child called the enxaneta crowning it. Listed by UNESCO and genuinely alarming to watch.' }
  ],
  when: 'Spring and autumn. The castells competition is biennial, in early October of odd years, and is extraordinary.',
  stay: 'A night, or a long day from Barcelona.',
  move: 'Train from Barcelona in about an hour. The high-speed station at Camp de Tarragona is out of town.',
  eat: 'Romesco, which is from here: a sauce of nuts, dried peppers and bread, served with fish and with calçots. Xató, a salad with the same family of sauce.'
},

'CAT-sitges': {
  intro: [
    'Sitges was a fishing town that became an artists’ colony in the 1890s when Santiago Rusiñol bought two fishermen’s cottages, filled them with ironwork and El Grecos, and started holding modernista festivals. The house is still there as the Cau Ferrat museum.',
    'It became the most openly gay town in Spain during the 1970s, in the last years of the dictatorship, and remains so. The scene is concentrated in a few streets around Carrer Primer de Maig and is entirely integrated with everything else, which is the point.',
    'There are seventeen beaches along four kilometres, a seafront of modernista villas, and a carnival in February that is the biggest in Catalonia. The film festival in October is the leading fantasy and horror event in Europe and fills the town with a completely different crowd.'
  ],
  see: [
    { n: 'Cau Ferrat and Maricel',
      d: 'Two adjoining museums on the rock above the sea: Rusiñol’s house with its wrought iron and two El Grecos, and a 1910s mansion built for an American collector.' },
    { n: 'The beaches',
      d: 'Platja de Sant Sebastià for families, Platja de la Ribera for the crowd, and the ones east past the church for the gay beaches. Playa del Muerto, further out, is naturist.' },
    { n: 'Carnaval', t: 'February',
      d: 'Two main parades with around fifty floats, and a closing burial of a sardine. Roughly two hundred and fifty thousand people in a town of thirty thousand.' },
    { n: 'Sitges Film Festival', t: 'October',
      d: 'Founded in 1968, the main genre festival in Europe, with directors in attendance and screenings all day for ten days.' },
    { n: 'The church on the rock',
      d: 'Sant Bartomeu i Santa Tecla, seventeenth century, sitting on the promontory between the two main beaches. The silhouette is the town’s signature.' },
    { n: 'Malvasia',
      d: 'A sweet wine made here since the Middle Ages from a grape the Crusaders are said to have brought back, with a hospital in the town funded by its sales.' }
  ],
  when: 'June and September for the beach. February for carnival, October for the festival. July and August are extremely busy.',
  stay: 'Two nights, or a day trip.',
  move: 'Train from Barcelona Sants in thirty-five minutes, running frequently and late.',
  eat: 'Xató in winter. Fish on the seafront. The restaurant scene is good and priced for Barcelona weekenders.'
},

'CAT-besalu': {
  intro: [
    'The bridge is the thing. Seven irregular arches crossing the Fluvià at an angle, with a fortified gate tower standing in the middle of it, built in the eleventh century and rebuilt after a flood in the fourteenth and again after the Republicans blew it up in 1939. The current reconstruction dates from 1965 and uses the original stones.',
    'Besalú was the capital of its own county until 1111 and then stopped mattering, which is why nothing was built over the medieval core. The population is about two and a half thousand.',
    'The mikvah is the rarer find: a Jewish ritual bath of the twelfth century, discovered in 1964, reached down a stone stair to a stone-lined pool fed by groundwater. Only three medieval examples survive in Spain and this is the only one that is a free-standing building.'
  ],
  see: [
    { n: 'The bridge',
      d: 'Walk it from the far bank towards the town, which is the view. Lit at night, and the town is at its best after the day visitors leave.' },
    { n: 'The mikvah', t: 'guided, from the tourist office',
      d: 'Down by the river below the old Jewish quarter. A short visit and the guide supplies the context, which you need.' },
    { n: 'Sant Pere',
      d: 'An eleventh-century monastery church with an ambulatory and a strange window on the west front flanked by two lions. Romanesque of a high order.' },
    { n: 'The Plaça Major',
      d: 'Arcaded, with a Gothic hospital building on one side. The whole town is walkable in forty minutes.' },
    { n: 'La Garrotxa volcanoes',
      d: 'Twenty minutes away, forty extinct cones in beech forest, with Santa Margarida holding a chapel in the middle of its crater and Croscat showing a quarried cross-section of its own structure.' },
    { n: 'Castellfollit de la Roca',
      d: 'Ten minutes up the road, a village on a basalt cliff fifty metres high and barely wider than its own main street.' }
  ],
  when: 'Spring and autumn, with the Garrotxa beech woods at Fageda d’en Jordà in late October.',
  stay: 'Half a day, or a night to have it to yourself.',
  move: 'A car. An hour from Girona. Buses from Figueres and Olot.',
  eat: 'Volcanic-soil buckwheat at Santa Pau, done as fesols beans. Duck and game in the Garrotxa restaurants.'
},

'CAT-vall-de-nuria': {
  intro: [
    'There is no road into Núria. The only ways in are on foot over the Pyrenees or on the rack railway from Ribes de Freser, which climbs just over a thousand metres in twelve and a half kilometres, including a section at a gradient of fifteen per cent. It opened in 1931 and remains the only rack railway in Catalonia.',
    'At the top is a bowl at just under two thousand metres with a sanctuary, a hotel, a small lake and a ski area, surrounded by peaks on three sides. The Virgin of Núria is the patron of Pyrenean shepherds and the tradition is that putting your head in a pot by the altar and ringing the bell will get you a child.',
    'The Núria Statute, the draft of Catalan autonomy, was written here in 1931 by a commission that came up the new railway to work undisturbed. It is a place Catalonia takes seriously.'
  ],
  see: [
    { n: 'The rack railway',
      d: 'Forty minutes up, through the Freser gorge, with the last stretch clinging to the side of it. Sit on the right going up.' },
    { n: 'The sanctuary',
      d: 'Rebuilt in the 1880s, with the twelfth-century Virgin, the pot and the bell. Plain and well used.' },
    { n: 'Walking from Queralbs',
      d: 'The old path up the gorge, about three hours and six hundred metres of ascent, with the railway crossing above you. Walk up and take the train down.' },
    { n: 'Puigmal',
      d: 'At 2,910 metres, the highest peak of the eastern Pyrenees, about three hours from Núria and straightforward in summer.' },
    { n: 'The lake and the chairlift',
      d: 'A small artificial lake with rowing boats, and a chairlift to the Coma de l’Embut for the view down the whole valley.' },
    { n: 'Skiing', t: 'December to March',
      d: 'Eleven runs, modest by alpine standards, and the only resort in Europe reached solely by rack railway.' }
  ],
  when: 'June to October for walking, December to March for snow. The station car park at Ribes fills on summer weekends.',
  stay: 'A day, or a night at the sanctuary hotel.',
  move: 'Train from Barcelona to Ribes de Freser, about two hours, then the cremallera. One combined ticket.',
  eat: 'A self-service and a restaurant at the sanctuary. Nothing else for twelve kilometres, so do not plan around finding something.'
},

'CAT-aiguestortes': {
  intro: [
    'Catalonia has exactly one national park and this is it, declared in 1955. The name means twisted waters and refers to the braided streams on the western side; the eastern half is granite and glacial lakes, around two hundred of them depending on how you count.',
    'Estany de Sant Maurici sits under Els Encantats, two rock towers that look like a split peak and which the legend says are two hunters turned to stone for missing mass. The lake is the single most photographed thing in the Pyrenees after the Ordesa canyon.',
    'The park is closed to private cars. You park at Espot or Boí and take a 4x4 taxi in, or walk. The huts are the real reason to come: nine of them, linked by the Carros de Foc circuit, which is a hundred kilometres and about six to eight days, and which some people do in one twenty-four-hour push.'
  ],
  see: [
    { n: 'Estany de Sant Maurici',
      d: 'Taxi from Espot in twenty minutes, then a path round the lake with Els Encantats reflected in it on a still morning.' },
    { n: 'Carros de Foc',
      d: 'The hut circuit. Booked through the huts, carrying a stamp card. Six days is comfortable, eight is pleasant, and the record is under eight hours.' },
    { n: 'The Boí valley Romanesque churches',
      d: 'Nine churches from the eleventh and twelfth centuries in one valley, with slender bell towers, listed by UNESCO. Sant Climent de Taüll has a reproduction of its Pantocrator fresco projected onto the apse where the original was cut off the wall in 1919.' },
    { n: 'Aigüestortes itself',
      d: 'The braided meadows on the Boí side, reached by taxi, flat and easy and completely different in character from the eastern lakes.' },
    { n: 'Caldes de Boí',
      d: 'Thirty-seven springs at the valley head with temperatures from four to fifty-six degrees, and a spa that has been working since the nineteenth century.' },
    { n: 'Wildlife',
      d: 'Chamois, marmots introduced in the 1940s, capercaillie and bearded vultures, which were reintroduced across the Pyrenees and are now reliably seen.' }
  ],
  when: 'Late June to early October. Snow lies on the high passes into July and the huts close in autumn. Winter access is ski touring only.',
  stay: 'Three days minimum to make the journey worth it.',
  move: 'A car to Espot or Boí, then the park taxis. Five to six hours from Barcelona.',
  eat: 'Hut food, which is ample and plain. Down in the valleys, trout, lamb and the Pallars potato.'
},

'CAT-delta-ebre': {
  intro: [
    'The Ebro delta is three hundred and twenty square kilometres pushed out into the Mediterranean, and it is sinking. Dams upstream trap the sediment that used to replace what the sea takes, so the delta now loses ground every year, and about half of it is less than half a metre above sea level.',
    'Three quarters of it is rice. The fields are flooded from April, planted in May, and the colour runs from brown water through intense green to gold before the October harvest, which is a different landscape every six weeks.',
    'It is also the second most important wetland in Spain after Doñana: flamingos, avocets, Audouin’s gull, which breeds here in numbers that matter globally, and in summer a lot of mosquitoes, which nobody mentions in the brochures.'
  ],
  see: [
    { n: 'Punta de la Banya and the flamingos',
      d: 'The Trabucador sandbar runs out to a lagoon holding one of the largest flamingo colonies in the western Mediterranean. The bar is closed to cars and sometimes washed over entirely.' },
    { n: 'Cycling the rice fields',
      d: 'Flat, quiet and with raised tracks between the paddies. Hire in Deltebre or Riumar. The best way to be in the landscape.' },
    { n: 'MónNatura Delta',
      d: 'An interpretation centre at a working salt pan with hides, a bird ringing station and a lot of explanation of how the delta actually functions.' },
    { n: 'The harvest', t: 'late September into October',
      d: 'Combines working flooded ground, birds following them, and the rice cooperatives open. The most interesting fortnight of the year.' },
    { n: 'Els Ports',
      d: 'The mountains immediately inland, limestone and dry, with Spanish ibex and a completely different climate forty minutes from the delta.' },
    { n: 'Boat trips',
      d: 'From Deltebre and Riumar down to the river mouth, which is a sandbar you can land on.' }
  ],
  when: 'April to June and late September to October. Summer brings heat and mosquitoes in quantity.',
  stay: 'Two nights.',
  move: 'A car. Two hours from Barcelona, forty minutes from Tortosa. Trains stop at L’Aldea.',
  eat: 'Rice, cooked a dozen ways, and the local varieties are sold by name. Eels, oysters from the bay at Sant Carles de la Ràpita, and arròs negre.'
},

'CAT-priorat': {
  intro: [
    'Priorat is one of only two wine regions in Spain with the top DOQ classification, the other being Rioja, and it earned it in about twenty years. In the 1970s the region was almost abandoned: phylloxera had killed the vines in the 1890s, the young had left, and old Garnacha and Cariñena bushes were growing untended on terraces nobody could farm profitably.',
    'In 1989 five winemakers arrived, bought land cheaply around Gratallops and made wine from those old vines on llicorella, a slate soil that forces roots down as far as twenty-five metres looking for water. The results sold for prices nobody in Spain had seen, and the region was transformed.',
    'The terraces are too steep for machinery. Everything is picked by hand and in some places carried out by mule, which is part of why the wine costs what it does. Yields can be under ten hectolitres a hectare, which is a fraction of normal.'
  ],
  see: [
    { n: 'The cellars at Gratallops',
      d: 'Clos Mogador, Clos Erasmus and Clos Martinet are the founding estates and most require an appointment well in advance. Several smaller ones take walk-ins.' },
    { n: 'Scala Dei',
      d: 'The Carthusian monastery the region is named for, founded in 1194, ruined after the 1835 disentailment and partially consolidated. The monks planted the first vines here.' },
    { n: 'The llicorella',
      d: 'Ask to be shown a soil pit. The black slate splits into plates and holds no water, which is the entire explanation for the wine.' },
    { n: 'Siurana',
      d: 'A village on a cliff above a reservoir, the last Moorish stronghold in Catalonia, with a legend about the Moorish queen riding her horse off the edge rather than surrender. Also a world-class sport climbing crag.' },
    { n: 'Montsant',
      d: 'The surrounding appellation, on different soils, making similar wine for considerably less money. Often the better buy.' },
    { n: 'Falset',
      d: 'The main town, with a modernista cooperative cellar by Cèsar Martinell, a pupil of Gaudí, who built a series of these across Catalonia and called them wine cathedrals.' }
  ],
  when: 'September and October for the harvest, spring for the landscape. Summer is very hot on the slate.',
  stay: 'Two nights.',
  move: 'A car, and the roads are narrow and steep. Ninety minutes from Tarragona.',
  eat: 'Lamb, rabbit, and a lot of olive oil from Siurana, which has its own protected designation. Restaurants are few and booking is sensible.'
},

'CAT-poblet': {
  intro: [
    'Poblet was founded in 1151 by Cistercians from Fontfroide on land given by the count of Barcelona, and it became the royal pantheon of the Crown of Aragon. Eight kings and a number of queens are buried here, in alabaster tombs arranged on two arches that span the crossing of the church, so the dead lie above the heads of the living.',
    'In 1835 the monasteries were dissolved, the buildings were looted and burned, and the tombs were smashed. The bones were gathered up and taken to Tarragona cathedral. Monks returned in 1940 and the tombs were reconstructed over the following decades by the sculptor Frederic Marès from the surviving fragments.',
    'It is a working community again, about thirty monks, and the hours are sung. That is the difference between this and a monument: you can attend vespers, and the building is doing what it was built for.'
  ],
  see: [
    { n: 'The royal tombs',
      d: 'On two arches across the crossing, with James I the Conqueror among them. The reconstruction is visible if you look, and the effect is undiminished.' },
    { n: 'The cloister',
      d: 'Twelfth and thirteenth century, with a hexagonal lavabo pavilion holding a fountain of twenty-eight spouts where the monks washed before meals.' },
    { n: 'The dormitory',
      d: 'Eighty-seven metres long under nineteen diaphragm arches carrying a timber roof, which is one of the great Gothic interiors in Spain and is almost always empty.' },
    { n: 'Vespers', t: 'usually around 7pm',
      d: 'Open to anybody. Gregorian chant in the church the monks built for it. Check the times at the gate; they change with the season.' },
    { n: 'The walls',
      d: 'A full military circuit added in the fourteenth century, with towers and a gate, which is unusual for a Cistercian house and is why so much survived.' },
    { n: 'The Cistercian route',
      d: 'Poblet, Santes Creus and Vallbona de les Monges, three houses within an hour of each other, linked by a marked walking and cycling route.' }
  ],
  when: 'Year round. Spring and autumn for the Conca de Barberà countryside around it.',
  stay: 'Two hours, or a night in the guest house, which takes men and women in separate wings.',
  move: 'A car. Ninety minutes from Barcelona or forty from Tarragona. L’Espluga de Francolí is the nearest station.',
  eat: 'Conca de Barberà wine, which is the quiet appellation next door to Priorat, and the Trepat grape, which is grown almost nowhere else.'
},

'CAT-vic': {
  intro: [
    'The Plaça Major at Vic is about thirteen thousand square metres surrounded by arcades of different periods, and a market has been held on it since the ninth century. It still runs on Tuesdays and Saturdays and it is a working market rather than a tourist one, which is increasingly rare.',
    'The thing Vic is known for across Catalonia is the llonganissa, a long dry-cured pork sausage, and the fuet, which is its thinner relative. The combination of altitude, the plain’s winter fog and the dry air is supposed to be why the curing works here, and several family firms have been at it since the eighteenth century.',
    'The cathedral is a nineteenth-century neoclassical shell containing a complete cycle of murals by Josep Maria Sert, painted three times: the first set burned in 1936, the second he finished in 1945 shortly before his death. They are dark, brown and gold, and enormous.'
  ],
  see: [
    { n: 'The Tuesday or Saturday market',
      d: 'Produce, cheese, sausage and clothing, filling the whole square. Go in the morning; it packs up by two.' },
    { n: 'The Sert murals',
      d: 'In the cathedral. Sepia and gold, covering every wall, in a style somewhere between Tiepolo and newsreel. Divisive and unforgettable.' },
    { n: 'Museu Episcopal',
      d: 'One of the best Romanesque and Gothic collections in Europe outside the Barcelona national museum, with altar frontals and polychrome carving from the Pyrenean valleys.' },
    { n: 'The sausage',
      d: 'Casa Riera Ordeix still makes llonganissa by hand and will show you the drying lofts. Buy it whole rather than sliced.' },
    { n: 'The Roman temple',
      d: 'Second century, found inside a medieval castle in 1882 when the castle was being demolished, and now standing free. Small and unexpected.' },
    { n: 'The Mercat del Ram',
      d: 'Palm Sunday weekend, a livestock and craft fair that has run since the eleventh century.' }
  ],
  when: 'Market days. Autumn and winter for the fog, which is a genuine local phenomenon and makes the plain strange.',
  stay: 'Half a day.',
  move: 'Train from Barcelona in about ninety minutes. The station is a ten-minute walk from the square.',
  eat: 'Sausage in every form. Also patates emmascarades, potatoes with sausage, and the Osona province dairy.'
},

'CAT-cardona': {
  intro: [
    'The hill at Cardona is a diapir: a dome of rock salt a hundred and twenty metres high and about two kilometres across, pushed up from a deposit laid down forty million years ago when the Mediterranean dried out. It has been mined since the Neolithic and was still producing potash until 1990.',
    'Above it the dukes of Cardona built a fortress that was the strongest in Catalonia. It never fell by assault; it surrendered in 1714 as the last Catalan stronghold of the War of the Spanish Succession, and then only after Barcelona had already gone.',
    'The castle is now a parador, which means you can sleep in an eleventh-century fortress, and the church inside it, Sant Vicenç, is one of the earliest and purest Lombard Romanesque buildings in Spain, consecrated in 1040.'
  ],
  see: [
    { n: 'Sant Vicenç de Cardona',
      d: 'Inside the castle walls. Barrel vaults, a crossing dome on squinches, and no decoration at all. Among the most important Romanesque buildings in the country and usually empty.' },
    { n: 'The salt mountain',
      d: 'A guided visit eighty-six metres underground into galleries of halite, with the salt banded in grey, red and white. Helmets provided, and it is cold.' },
    { n: 'The castle and parador',
      d: 'Stay in it or walk the walls. The Torre de la Minyona is the oldest part, with a legend about a daughter walled up for loving a Moor.' },
    { n: 'The medieval town',
      d: 'Below the hill, with an arcaded square and a Tuesday market.' },
    { n: 'The Vall Salina viewpoint',
      d: 'Looking at the salt dome from across the valley, which is the only way to understand its scale.' },
    { n: 'Súria and the potash belt',
      d: 'The valley still mines potash, and the waste tips are enormous white and grey hills visible for miles. A landscape of industry that is going to be a problem for a long time.' }
  ],
  when: 'Year round. The mine is a constant temperature and is a good wet-weather option.',
  stay: 'A night at the parador.',
  move: 'A car. Ninety minutes from Barcelona.',
  eat: 'Parador food in the fortress. In town, mountain cooking and the local coca, a flatbread sweet or savoury.'
},

'CAT-montseny': {
  intro: [
    'Montseny is a massif reaching 1,706 metres at Turó de l’Home, an hour from Barcelona, and the reason it was made a biosphere reserve in 1978 is that three climate zones stack on top of each other on the same hillside. Mediterranean holm oak at the bottom, beech in the middle, and at the top a remnant fir and heath that belongs in central Europe.',
    'Walking up it you pass through what is effectively a journey from Catalonia to Germany in two hours. In autumn the beech woods at Santa Fe turn and the whole massif changes colour, which happens nowhere else this close to Barcelona.',
    'It is also where the city goes at the weekend, so Sunday in October will not be a solitary experience. Midweek it is nearly empty.'
  ],
  see: [
    { n: 'Santa Fe del Montseny',
      d: 'Beech forest around a reservoir at about eleven hundred metres, with several marked loops from the information centre. Best in the last week of October.' },
    { n: 'Turó de l’Home',
      d: 'The summit, with a meteorological observatory that has been recording since 1932. Reachable by road almost to the top, or on foot in about two hours from Santa Fe.' },
    { n: 'Matagalls',
      d: 'The other main peak, with an annual night walk from Barcelona that has run since 1954 and takes about twelve hours.' },
    { n: 'Viladrau and Arbúcies',
      d: 'Villages on either flank, with chestnut woods and a strong tradition of mushroom hunting in autumn.' },
    { n: 'The Montseny brook newt',
      d: 'Discovered in 2005, the only amphibian endemic to Catalonia, and critically endangered with a few hundred individuals in a handful of streams.' },
    { n: 'Sant Marçal and the ridge road',
      d: 'The road over the massif between Viladrau and Sant Celoni, narrow and slow, which is the best drive in the Barcelona hinterland.' }
  ],
  when: 'Late October for the beech. Spring for flowers. Snow at the top from December.',
  stay: 'A day from Barcelona, or a night in Viladrau.',
  move: 'A car. Trains reach Sant Celoni and Balenyà at the edges and the interior needs wheels.',
  eat: 'Mushrooms in autumn, cooked simply. Wild boar. Montseny mineral water, which comes from here and is sold across Spain.'
},

'MAD-madrid': {
  intro: [
    'Philip II moved the court here in 1561 because it was in the geographical centre of the peninsula and because it was nobody’s city, so no faction owned it. It had about twenty thousand people. It has over three million now and it is the highest capital in Europe at six hundred and fifty metres, which is why the winters are sharp and the summers are a dry furnace.',
    'There is no river worth the name. The Manzanares was mocked for centuries as a stream with an excellent bridge, and it has recently been uncovered and landscaped into a long park called Madrid Río, which is the best thing the city has done in twenty years.',
    'What Madrid has instead of geography is the art and the hours. The Prado, Reina Sofía and Thyssen stand within eight hundred metres of each other, which is probably the greatest concentration of painting on earth. And nothing happens early: lunch at two thirty, dinner at ten, and the bars run until the metro starts again at six.'
  ],
  see: [
    { n: 'The Paseo del Arte',
      d: 'Prado, Reina Sofía and Thyssen-Bornemisza. A combined ticket covers all three and two days is realistic. Each has a free evening window and the queues for those are long.' },
    { n: 'La Latina and Lavapiés',
      d: 'The old quarters south of the centre. Sunday morning is El Rastro, a flea market that has run since the fifteenth century, followed by vermouth in the bars around Plaza de la Cebada.' },
    { n: 'Retiro and the Royal Botanical Garden',
      d: 'The park, with the Palacio de Cristal, and the botanical garden next to the Prado which is quieter than either and full of benches.' },
    { n: 'Mercado de San Miguel versus the real markets',
      d: 'San Miguel is a beautiful iron building full of expensive snacks. Mercado de Antón Martín or Vallehermoso are where people actually shop and eat.' },
    { n: 'Sobrino de Botín',
      d: 'Founded 1725 and recognised as the oldest continuously operating restaurant in the world. Roast suckling pig in a wood oven that has not gone out. Touristy and the pig is genuinely good.' },
    { n: 'Malasaña and Chueca at night',
      d: 'Malasaña for the movida hangover and the bars, Chueca for the gay scene that transformed the district in the 1990s. Both start late.' }
  ],
  when: 'April to June and September to November. July and August regularly pass forty degrees and madrileños leave. Christmas and the first week of January are a good time to be here.',
  stay: 'Four nights.',
  move: 'Barajas is twenty-five minutes on the metro. Every AVE line radiates from here. The centre is walkable and the metro is cheap and excellent.',
  eat: 'Cocido madrileño, a chickpea stew served in three courses, usually only at lunch and often only on certain days. Bocadillo de calamares on the Plaza Mayor. Huevos rotos. Churros at San Ginés at four in the morning.'
},

'MAD-prado': {
  intro: [
    'The Prado is a royal collection rather than an encyclopaedic museum, which is why it is unbalanced in the most interesting possible way. The Spanish Habsburgs and Bourbons bought what they liked, so there are a hundred and forty Goyas, around fifty Velázquezes and the largest Bosch holding on earth, and comparatively little else from outside their taste.',
    'Las Meninas is the centre of it. Velázquez painted himself at a canvas we cannot see, with the Infanta and her attendants in front, the king and queen reflected in a mirror at the back, and a man in a doorway beyond that. It has been argued about continuously since 1656 and the arguments are not settled.',
    'The Black Paintings are the other reason to come. Goya painted fourteen of them directly onto the plaster walls of his house outside Madrid when he was deaf, ill and seventy-three, apparently for nobody. They were transferred to canvas in 1874 and they do not look like anything else in the nineteenth century.'
  ],
  see: [
    { n: 'Las Meninas',
      d: 'Room 012. Stand at the back of the room first, where the perspective was designed to be read from, and then go close.' },
    { n: 'The Black Paintings',
      d: 'Rooms 66 and 67. Saturn Devouring His Son is the famous one; the Dog, which is almost entirely empty canvas with a head at the bottom, is the one that stays with you.' },
    { n: 'The Garden of Earthly Delights',
      d: 'Bosch, with the shutters closed showing the world on the third day. Philip II owned it and hung it in the Escorial. Allow twenty minutes on its own.' },
    { n: 'The Third of May 1808',
      d: 'Goya’s execution scene, which effectively invents modern war painting. Hung near the Second of May, which comes first in sequence.' },
    { n: 'Titian and the Venetians',
      d: 'Charles V and Philip II collected Titian in depth. The Danaë and the Venus with an Organist are here and the room is usually calm.' },
    { n: 'Free entry', t: 'Monday to Saturday 6 to 8pm, Sunday 5 to 7pm',
      d: 'The queue starts an hour earlier and the galleries are busy. Paying is better value if your time is short.' }
  ],
  when: 'Year round. First thing on a weekday morning is the quietest the building gets.',
  stay: 'Three hours minimum. Two visits is better than one long one.',
  move: 'Metro Banco de España or Atocha. The Jerónimos entrance usually has the shorter queue.',
  eat: 'The cafe is adequate. The Barrio de las Letras, five minutes west, is full of better options.'
},

'MAD-reina-sofia': {
  intro: [
    'The Reina Sofía is the twentieth century, housed in an eighteenth-century hospital with two glass lift towers bolted onto the front by Ian Ritchie in 1988 and a red wing added by Jean Nouvel in 2005. The collection runs from about 1900 to the present and is organised around Spain’s relationship with the rest of Europe.',
    'Guernica is the reason most people come. Picasso painted it in a month in 1937 after the bombing of the Basque town by German and Italian aircraft, for the Spanish Republican pavilion at the Paris exposition. He refused to let it come to Spain while Franco lived, and it arrived in 1981.',
    'It is three and a half metres by almost eight, in grey, black and white, and it is hung with Dora Maar’s photographs of it in progress alongside, which show how much the composition changed. There is no glass in front of it now, which there was until 1995.'
  ],
  see: [
    { n: 'Guernica',
      d: 'Room 205.10. Go first thing or in the last hour. The preparatory sketches in the adjoining rooms are worth as much time as the painting.' },
    { n: 'Dalí and Buñuel',
      d: 'The Great Masturbator and The Enigma of Hitler, plus a screening of Un Chien Andalou, which is seventeen minutes and still shocking.' },
    { n: 'The Pavilion of the Spanish Republic',
      d: 'The context for Guernica: a reconstruction of what else was in that 1937 pavilion, including Calder’s mercury fountain and Miró’s Reaper.' },
    { n: 'Miró',
      d: 'A substantial holding, including the large late canvases that are almost empty.' },
    { n: 'The Sabatini courtyard',
      d: 'A quiet cloistered garden in the middle of the old hospital with a Calder mobile. Free to enter without a ticket.' },
    { n: 'Free entry', t: 'Monday and Wednesday to Saturday 7 to 9pm, Sunday 12.30 to 2.30pm',
      d: 'Closed on Tuesdays entirely, which catches people out.' }
  ],
  when: 'Year round. Closed Tuesdays.',
  stay: 'Two to three hours.',
  move: 'Metro Atocha. Opposite the station, at the southern end of the Paseo del Arte.',
  eat: 'The Nouvel wing has a decent restaurant with a terrace. Lavapiés starts immediately behind the building and is cheaper and better.'
},

'MAD-royal-palace': {
  intro: [
    'The old Habsburg alcázar burned down on Christmas Eve 1734, taking around five hundred paintings with it including several Velázquezes. Philip V, who was a Bourbon and French, used the opportunity to build something on the scale of Versailles in stone and brick, with no wood in the structure so it could not happen again.',
    'The result has three thousand four hundred and eighteen rooms, which makes it the largest functioning royal palace in Europe by floor area. The royal family does not live here; they are at Zarzuela outside the city, and this is used for state occasions.',
    'The things worth queuing for are specific. The Royal Armoury is one of the two best collections of its kind in the world, with the armour of Charles V and Philip II. And there are five Stradivarius instruments, a decorated quartet, which is the only such set in existence.'
  ],
  see: [
    { n: 'The Royal Armoury',
      d: 'In a separate building off the courtyard, free with the palace ticket and frequently skipped. Charles V’s parade armour, horse armour, and the armour he wore in the Titian portrait hanging in the Prado.' },
    { n: 'The Throne Room',
      d: 'With a Tiepolo ceiling painted in 1764 showing the majesty of the Spanish monarchy, and two silver lions that came from the old alcázar.' },
    { n: 'The Gasparini Room',
      d: 'Rococo at its most unrestrained: embroidered silk walls, a stucco ceiling and a marble floor, all in a single continuous pattern.' },
    { n: 'The Stradivarius quartet',
      d: 'In the music room. Two violins, a viola and a cello, decorated, made for the Spanish court, and still played occasionally.' },
    { n: 'The Royal Kitchen',
      d: 'Opened to the public in 2017 after restoration: a hundred-metre range of copper pans, ice stores and a rotisserie, which is more interesting than several of the state rooms.' },
    { n: 'The changing of the guard', t: 'first Wednesday of the month, 12pm',
      d: 'The full ceremony with four hundred soldiers and a hundred horses, in the Plaza de la Armería. There is a smaller relief every Wednesday and Saturday.' }
  ],
  when: 'Year round. Closed without notice for state functions, which is worth checking the morning you go.',
  stay: 'Two to three hours with the armoury.',
  move: 'Metro Ópera. The queue is on the Plaza de la Armería side; buy online.',
  eat: 'The Palacio Real cafe, or walk ten minutes to the Mercado de la Cebada or La Latina.'
},

'MAD-retiro': {
  intro: [
    'The Retiro was the private garden of a royal palace that no longer exists. Philip IV built the Buen Retiro in the 1630s as a pleasure palace on what was then the eastern edge of the city; almost all of it was destroyed in the Peninsular War, and only the Casón del Buen Retiro and the Salón de Reinos survive, both now part of the Prado.',
    'The gardens were opened to the public in 1868 and are now a hundred and twenty-five hectares in the middle of the city, listed by UNESCO in 2021 together with the Paseo del Prado as an example of eighteenth-century enlightenment urban planning.',
    'The Palacio de Cristal is the thing to see: a glass and iron pavilion of 1887 built to house Philippine plants for an exhibition, modelled on the Crystal Palace, standing at the end of a small lake with cypresses behind it. It holds contemporary art installations now and the building wins every time.'
  ],
  see: [
    { n: 'Palacio de Cristal',
      d: 'Free, open, and whatever is installed inside is secondary to the light. Best in the morning or under rain, when the lake outside is loud on the glass.' },
    { n: 'The Estanque and the rowing boats',
      d: 'The main pond with the monument to Alfonso XII behind it. Boats by the half hour, which is an entirely silly and entirely enjoyable thing to do.' },
    { n: 'The Fallen Angel',
      d: 'A bronze Lucifer in mid-fall, by Ricardo Bellver, 1885. It stands at six hundred and sixty-six metres above sea level, which is a coincidence everyone enjoys.' },
    { n: 'The Rosaleda',
      d: 'Four thousand roses in a formal layout, best in the second half of May.' },
    { n: 'Sunday afternoon',
      d: 'Drummers at the Puerta de Alcalá end, tarot readers, a long-running puppet theatre, and several thousand madrileños walking slowly. It is a social institution rather than a park.' },
    { n: 'The Bosque del Recuerdo',
      d: 'A hundred and ninety-two olive and cypress trees, one for each person killed in the 2004 Atocha bombings, planted in a spiral near the Atocha gate.' }
  ],
  when: 'Year round. May for the roses, autumn for the colour. Closes at night in winter.',
  stay: 'Two hours.',
  move: 'Metro Retiro, Ibiza or Atocha. The Prado is at the western gate.',
  eat: 'Kiosks inside for drinks. The Ibiza and Pacífico sides have good neighbourhood bars with none of the centre’s prices.'
},

'MAD-el-escorial': {
  intro: [
    'Philip II built this between 1563 and 1584 as a monastery, a palace, a basilica, a library, a school and the burial place of the Spanish kings, all in one grey granite rectangle two hundred and seven metres by a hundred and sixty. It is laid out on a grid that is traditionally said to represent the gridiron on which Saint Lawrence was martyred.',
    'The point of it was austerity. Philip ran the largest empire on earth from a bedroom the size of a cell, with a door opening directly onto the high altar of the basilica so he could hear mass from his bed while dying of gout and gangrene. The contrast with the Alhambra, or indeed with Versailles a century later, is the entire argument.',
    'The Pantheon of the Kings underneath is a circular chamber of black marble and gilt bronze with twenty-six sarcophagi in tiers. Almost every Spanish monarch since Charles V is in it. The ones awaiting their turn are in a separate rotting room for about twenty-five years first, which is explained with admirable matter-of-factness.'
  ],
  see: [
    { n: 'The library',
      d: 'Fifty-four metres long with a barrel vault frescoed with the seven liberal arts, and the books shelved spine-inwards with gilded page edges facing out, which was the sixteenth-century convention.' },
    { n: 'The Pantheon of the Kings',
      d: 'Down a marble stair under the basilica. Black and gold, octagonal, with the kings on one side and the queens who bore kings on the other.' },
    { n: 'The basilica',
      d: 'A Greek cross under a dome, with a retable forty-five metres high in jasper and marble and bronze figures of Charles V and Philip II kneeling at either side.' },
    { n: 'Philip II’s apartments',
      d: 'Plain whitewashed rooms with brick floors. The bedroom and the door to the altar are the point.' },
    { n: 'The Valley of the Fallen',
      d: 'Nine kilometres away, Franco’s basilica cut into a mountain by forced labour, with a hundred and fifty metre cross on top. Franco was exhumed in 2019 and the site is being reinterpreted as a memorial to all the dead of the civil war.' },
    { n: 'The Silla de Felipe II',
      d: 'A rock seat on the hill outside town, where Philip is said to have sat to watch construction. A short walk and the best view of the whole complex.' }
  ],
  when: 'Spring and autumn. The town is at a thousand metres and gets properly cold. Closed Mondays.',
  stay: 'Most of a day.',
  move: 'Cercanías C3 or C8 from Atocha, about an hour, then a short uphill walk or a bus.',
  eat: 'The town has a good number of restaurants aimed at madrileños up for the weekend. Sierra food: beans, game, and roast meat.'
},

'MAD-aranjuez': {
  intro: [
    'Aranjuez exists because the Tagus and the Jarama meet here and the land between them can be irrigated, which in dry Castile is close to miraculous. The monarchy took it as a spring residence in the sixteenth century and spent three hundred years improving the gardens.',
    'The cultural landscape listing from UNESCO in 2001 is specifically for the relationship between the palace, the gardens and the agricultural system: a huge grid of tree-lined avenues and irrigation channels laid over the floodplain, with the royal buildings sitting inside it rather than above it.',
    'Rodrigo wrote the Concierto de Aranjuez in 1939 about these gardens, from memory, having been blind since the age of three. It is probably the most-played Spanish piece of music in the world and it is about this specific place.'
  ],
  see: [
    { n: 'The Jardín del Príncipe',
      d: 'A hundred and fifty hectares along the Tagus, with plane trees that are among the oldest in Spain, a Chinese pond and the Casa del Labrador, a small palace of extraordinary interior richness.' },
    { n: 'The Palace',
      d: 'The Porcelain Room, every surface covered in moulded and painted porcelain made at the Buen Retiro factory, and the Smoking Room, a copy of a hall in the Alhambra.' },
    { n: 'The Jardín de la Isla',
      d: 'On an island formed by a diverted channel, with Baroque fountains. The oldest part of the gardens and the quietest.' },
    { n: 'The Strawberry Train', t: 'spring and autumn weekends',
      d: 'A period train from Madrid with hostesses in nineteenth-century dress handing out strawberries. Deliberately twee and enjoyable.' },
    { n: 'The Casa de Marinos',
      d: 'A boathouse holding the royal barges, including one made for Charles IV that is gilded to an indefensible degree.' },
    { n: 'Asparagus and strawberries',
      d: 'Both are protected local products. The asparagus season is April and May and every restaurant in town does them.' }
  ],
  when: 'April to June and September to October. The gardens are the point and they need leaves.',
  stay: 'A day from Madrid.',
  move: 'Cercanías C3 from Atocha, about forty-five minutes. The palace is a short walk from the station.',
  eat: 'Asparagus in season, strawberries with cream, and pheasant, which is a local speciality from the royal hunting grounds.'
},

'MAD-alcala': {
  intro: [
    'Cardinal Cisneros founded a university here in 1499 and it became one of the great centres of Renaissance humanism. Its most famous product was the Complutensian Polyglot Bible, printed between 1514 and 1517 in six volumes with Hebrew, Greek, Latin and Aramaic in parallel columns, which required casting new type and is one of the landmarks of European printing.',
    'The university moved to Madrid in 1836 and the town declined for a century and a half before the institution was refounded in 1977. The street plan and most of the colleges survived that gap intact, which is why UNESCO listed it in 1998 as the model for the planned university city.',
    'Cervantes was born here in 1547 and the house is reconstructed as a museum. The town leans on this heavily and it is still worth doing, because the sixteenth-century domestic arrangement is clearly laid out.'
  ],
  see: [
    { n: 'The Colegio Mayor de San Ildefonso',
      d: 'A Plateresque facade of 1543 and, inside, the Paraninfo with a Mudéjar coffered ceiling where the Cervantes Prize is awarded by the king every April.' },
    { n: 'Calle Mayor',
      d: 'The longest arcaded street in Spain, running the length of the old town on wooden columns, which was the main street of the medieval Jewish quarter.' },
    { n: 'Casa Natal de Cervantes',
      d: 'Free. Sixteenth-century rooms around a courtyard, with a surgeon’s consulting room because his father was one, and a statue of Don Quixote and Sancho on the bench outside.' },
    { n: 'The storks',
      d: 'Around a hundred nests on the towers of the town, which is one of the densest urban colonies in Europe. They used to migrate and most now overwinter.' },
    { n: 'The Corral de Comedias',
      d: 'A courtyard theatre of 1601, the oldest preserved in Europe, found inside a later building in 1980 and restored. Still used.' },
    { n: 'The Archbishop’s Palace',
      d: 'Where Columbus met Isabella in 1486 and where Catherine of Aragon was born. Mostly burned in 1939 and the facade survives.' }
  ],
  when: 'Year round. The Cervantes week in October and the medieval market in the same month are the two local events.',
  stay: 'Half a day from Madrid.',
  move: 'Cercanías C2 or C7 from Atocha, thirty-five minutes.',
  eat: 'Migas, roast lamb, and almendras garrapiñadas, caramelised almonds that the convent of Clarisas has made since the seventeenth century and sells through a turntable in the wall.'
},

'MAD-chinchon': {
  intro: [
    'The Plaza Mayor at Chinchón is irregular, which is the first thing you notice. It grew rather than being laid out, and the three-storey houses around it have two hundred and thirty-four wooden balconies on green-painted posts. Those balconies are why the square works: it was designed to be a theatre.',
    'It still is. Bullfights are held in it a few times a year, with the ring fenced off in the middle and the balconies sold as boxes. Passion plays, markets and concerts use the same arrangement, and in between it is a square full of restaurant tables.',
    'The countess of Chinchón gave her name to quinine, through a story about being cured of fever in Peru, which is almost certainly false but gave the world the word chinchona. The town makes anise liqueur instead and has done since the sixteenth century.'
  ],
  see: [
    { n: 'The Plaza Mayor',
      d: 'Sit in it. That is the activity. Early evening with a glass of the local anise is the correct approach.' },
    { n: 'The church of the Asunción',
      d: 'On the high side of the square, with a Goya Assumption over the altar that he painted in 1812 for his brother, who was the priest here.' },
    { n: 'The castle',
      d: 'Sixteenth century, ruined by the French in 1808 and later used as an anise distillery, which is a sequence of uses that tells you about Spain.' },
    { n: 'The parador',
      d: 'A seventeenth-century Augustinian convent with a cloistered courtyard, now a hotel, and worth a drink even if you do not stay.' },
    { n: 'Anise',
      d: 'Two distilleries still operate. The dry version is drunk after dinner and the sweet one is drunk by nobody under seventy, which is part of its appeal.' },
    { n: 'The garlic',
      d: 'Chinchón garlic is a protected product and the town has a festival for it in September.' }
  ],
  when: 'Spring and autumn. Summer weekends are packed with madrileños out for lunch.',
  stay: 'Half a day.',
  move: 'A car, forty-five minutes from Madrid, or a bus from Conde de Casal.',
  eat: 'Roast lamb and suckling pig from wood ovens. This is what people drive out from the city for and the restaurants on the square do it well.'
},

'MAD-guadarrama': {
  intro: [
    'The Guadarrama is the granite ridge that separates Madrid from Castile and León, running for about eighty kilometres with peaks around 2,400 metres. It was made Spain’s fifteenth national park in 2013, which was overdue: it is the most-walked mountain range in Spain and has been since the Institución Libre de Enseñanza started bringing students up here in the 1880s.',
    'The civil war front ran along these ridges for almost the whole war. Trenches, bunkers and command posts survive in quantity around the Alto del León and Peñalara, and there are marked routes that explain them.',
    'What makes it unusual is the access. A commuter train from the centre of Madrid takes you to Cercedilla in an hour and twenty minutes, and from the platform you can walk straight onto the Calzada Romana and be in high pine forest within thirty minutes with no car involved.'
  ],
  see: [
    { n: 'Peñalara',
      d: 'The highest point at 2,428 metres, with glacial cirques and small lakes below the summit. About four hours return from Puerto de Cotos, which the train reaches.' },
    { n: 'La Pedriza',
      d: 'A chaos of weathered granite domes and boulders above Manzanares el Real, which is the best rock scrambling near any European capital and holds a large griffon vulture colony.' },
    { n: 'The Cercedilla train',
      d: 'The C-9 climbs from Cercedilla to Cotos at 1,830 metres, the highest railway in Spain. Walk down rather than up.' },
    { n: 'Valle de la Fuenfría',
      d: 'Scots pine forest with a Roman road through it, and the Calzada Romana running over the Fuenfría pass. Easy walking and dense shade.' },
    { n: 'Manzanares el Real castle',
      d: 'Fifteenth century, with a gallery of Isabelline Gothic arcades round the top, and one of the best preserved in central Spain.' },
    { n: 'The civil war front',
      d: 'Marked routes around the Alto del León and the Collado Ventoso with trench systems and bunkers, signed and explained.' }
  ],
  when: 'May to October for walking. Snow from December to April, with modest ski areas at Navacerrada and Valdesquí.',
  stay: 'A day from Madrid, or a night in Cercedilla or Rascafría.',
  move: 'Cercanías C-8 to Cercedilla, then the C-9. By car the passes are busy on weekends and the Navacerrada car parks fill by nine.',
  eat: 'Judiones de La Granja, enormous butter beans, on the far side of the ridge. Trout from the Lozoya. Sierra beef.'
},

'VLC-valencia': {
  intro: [
    'In October 1957 the Turia flooded, killed around eighty people and put several metres of water through the city. The response was to divert the river entirely to the south, which left a nine-kilometre dry bed running through the middle of Valencia. The plan was to make it a motorway. The city protested, won, and turned it into a park.',
    'That park is the best thing about Valencia. It runs from the old riverbed above the city, under eighteen historic bridges, past the botanical garden and the Palau de la Música, and ends at Calatrava’s City of Arts and Sciences where the river used to meet the sea.',
    'The other thing to know is that paella is from here, specifically from the rice fields around the Albufera lagoon just south, and that it is a lunch dish made with rabbit, chicken, two kinds of bean and no chorizo whatsoever. Ordering it for dinner marks you as a tourist; ordering it with chorizo causes actual offence.'
  ],
  see: [
    { n: 'The Turia gardens',
      d: 'Hire a bike and ride the whole nine kilometres. It takes about ninety minutes and is the single best way to understand the city.' },
    { n: 'La Lonja de la Seda',
      d: 'A fifteenth-century silk exchange with a hall of twisted helical columns rising into palm-frond vaults, which is one of the great Gothic civil buildings in Europe. UNESCO listed, and usually quiet.' },
    { n: 'Mercado Central',
      d: 'Eight thousand square metres of modernista iron and tile, with around twelve hundred stalls. The largest fresh food market in Europe and a working one.' },
    { n: 'Las Fallas', t: '15 to 19 March',
      d: 'Hundreds of satirical sculptures up to twenty metres high, installed around the city and all burned on the final night except one voted for reprieve. Gunpowder at two every afternoon in the town hall square.' },
    { n: 'The Cathedral and the Holy Grail',
      d: 'The chapel holds an agate cup that a serious strand of scholarship considers a plausible candidate for the Last Supper vessel. The Micalet bell tower is two hundred and seven steps.' },
    { n: 'El Cabanyal',
      d: 'The old fishermen’s quarter by the beach, with tiled facades, long under threat of demolition and now slowly gentrifying. The best place in the city to eat rice.' }
  ],
  when: 'March for Fallas, which is extraordinary and requires booking months ahead. April to June and September to October otherwise. Summer is humid.',
  stay: 'Three nights.',
  move: 'AVE from Madrid in under two hours. The airport is on the metro. Flat, compact and the best cycling city in Spain.',
  eat: 'Paella valenciana at lunch, from a wood fire if you can find one. Arroz a banda, fideuà, all i pebre with eels from the Albufera. Horchata with fartons at Santa Catalina.'
},

'VLC-ciudad-artes': {
  intro: [
    'Santiago Calatrava was born twenty kilometres from here and the city gave him the end of the drained riverbed. Between 1998 and 2009 he and Félix Candela filled it with white concrete and broken ceramic tile: an opera house, a planetarium shaped like an eye, a science museum like a whale skeleton, a covered promenade and Europe’s largest aquarium.',
    'It cost around three times its budget and the Palau de les Arts had to have its outer skin replaced after the tiles started falling off in 2013, which led to a lawsuit. Valencians are divided about the whole project in a way that visitors usually are not.',
    'As architecture it is unarguably impressive and unarguably indifferent to the city around it. The best way to see it is to arrive on a bike along the Turia park, which puts it at the end of a nine-kilometre argument about what a city does with public space.'
  ],
  see: [
    { n: 'L’Hemisfèric',
      d: 'The eye: a planetarium and IMAX under a lid that opens, reflected in a long pool so it reads as a complete sphere. The most successful single object in the complex.' },
    { n: 'Oceanogràfic',
      d: 'Forty-five thousand animals in a series of buildings by Candela, including an Arctic section with belugas and an underwater restaurant. Europe’s largest aquarium.' },
    { n: 'Museu de les Ciències',
      d: 'A hands-on science museum in a two-hundred-and-forty-metre hall that looks like ribs. Good for children and the building is the exhibit.' },
    { n: 'L’Umbracle',
      d: 'A free covered walk of arches planted with palms and bougainvillea, which turns into a club on summer nights.' },
    { n: 'The reflections',
      d: 'Go at dusk when the pools are still. The whole thing is designed around the water and loses half its effect in the middle of the day.' },
    { n: 'The Ágora and the bridge',
      d: 'The last two pieces, including L’Assut d’Or bridge with a single mast a hundred and twenty-five metres high.' }
  ],
  when: 'Year round. The light at the beginning and end of the day is the whole point.',
  stay: 'Half a day, longer with the aquarium.',
  move: 'Bike along the Turia from the old town in twenty-five minutes, or bus 95 and 35.',
  eat: 'The on-site options are poor and expensive. Ride back to Ruzafa or walk to El Cabanyal.'
},

'VLC-albufera': {
  intro: [
    'The Albufera is a freshwater lagoon of about twenty-four square kilometres separated from the sea by a bar of pine forest called the Devesa. It was far larger once, maybe thirty thousand hectares in Roman times, and has been shrinking for two thousand years as the rice fields ate into it.',
    'Those rice fields are where paella comes from. The dish is field food: whatever was to hand, cooked flat over a vine-wood fire in a wide shallow pan so the rice forms a crust on the bottom called socarrat, which is the best part and which you scrape up with the edge of a spoon.',
    'At sunset the flat-bottomed boats go out from El Palmar and the lagoon reflects the whole sky, with the Devesa pines in silhouette. Sorolla painted it repeatedly and it is a straightforward and reliable piece of beauty twenty minutes from a city of eight hundred thousand people.'
  ],
  see: [
    { n: 'The sunset boat',
      d: 'From El Palmar or El Saler, about forty-five minutes, and the boatmen will cut the engine and pole for the last stretch if you ask. Go on a still evening.' },
    { n: 'Eating rice at El Palmar',
      d: 'A village built on rice and eels where every second building is a restaurant. Lunch, not dinner, and allow two hours because it is cooked to order.' },
    { n: 'The Devesa',
      d: 'The pine and dune bar between lagoon and sea, with boardwalks over the dunes and almost nobody on the beach outside July and August.' },
    { n: 'Birdwatching',
      d: 'Over two hundred and fifty species recorded. Purple swamphen, glossy ibis, and in winter tens of thousands of ducks. Hides at the Racó de l’Olla centre.' },
    { n: 'The rice calendar',
      d: 'Fields flooded in winter and mirror-flat, planted in late April, intensely green through summer, gold in September and harvested from late September. Four completely different landscapes.' },
    { n: 'La Perellonada',
      d: 'In November the fields are deliberately flooded and the whole plain becomes water with the villages standing out of it. The most photographed state of the lagoon and the least known.' }
  ],
  when: 'Any time. September and October for the harvest, winter for the birds and the flooding, summer evenings for the sunsets.',
  stay: 'Half a day from Valencia.',
  move: 'Bus 25 from Valencia to El Palmar and El Perellonet. A car is easier and the road through the Devesa is good.',
  eat: 'Paella valenciana, arroz a banda, arròs negre, and all i pebre, eel in a garlic and paprika sauce, which is the real local dish and which visitors rarely order.'
},

'VLC-alicante': {
  intro: [
    'The castle of Santa Bárbara sits on a bare limestone rock called Benacantil, a hundred and sixty-six metres straight up out of the city. There is a lift cut through the inside of the hill from a tunnel on the seafront road, which takes about forty seconds and costs almost nothing, and is one of the better pieces of civic engineering on the Spanish coast.',
    'From the north face of the rock, seen from the right angle, the weathering makes a profile of a human face known as the Cara del Moro. It is the local emblem and once you have been shown it you cannot stop seeing it.',
    'The Explanada de España below is a promenade paved with six and a half million marble tiles in red, cream and black laid in a wave pattern, under palms. It was finished in 1957 and it is the most pleasant thing to walk on in any Spanish city.'
  ],
  see: [
    { n: 'Castillo de Santa Bárbara',
      d: 'The lift from Avenida Juan Bautista Lafora. Three levels of fortification from the ninth century to the eighteenth, and the view takes in the whole bay and Tabarca.' },
    { n: 'The Explanada',
      d: 'Walk it in the evening, when the city does. Six and a half million tiles and a bandstand.' },
    { n: 'Barrio de Santa Cruz',
      d: 'The old quarter on the castle slope, whitewashed with flowers on every wall, and steeply stepped. Small enough to cover in half an hour.' },
    { n: 'MARQ',
      d: 'The provincial archaeological museum, which won the European Museum of the Year award in 2004, with Iberian and Roman material presented unusually well.' },
    { n: 'Tabarca',
      d: 'An hour by boat, Spain’s smallest permanently inhabited island, walled, with a marine reserve around it and good snorkelling. Day trippers only; about sixty people live there.' },
    { n: 'Las Hogueras de San Juan', t: '20 to 24 June',
      d: 'Alicante’s version of Fallas: sculptures burned on the night of the 24th, followed by firefighters hosing the crowd, which is called the banyà and is the point.' }
  ],
  when: 'April to June and September to October. The city has around three thousand hours of sun a year and a very mild winter.',
  stay: 'Two nights.',
  move: 'Airport fifteen minutes out with heavy northern European traffic. AVE from Madrid in two and a half hours. The TRAM runs up the coast to Benidorm and Dénia.',
  eat: 'Arroz a banda, which is Alicante’s rice rather than Valencia’s: cooked in fish stock and served with the fish separately. Also turrón from Jijona, which is made twenty minutes inland.'
},

'VLC-javea-denia': {
  intro: [
    'North of Alicante the Costa Blanca is mostly concrete. Then the Montgó massif reaches 753 metres and comes down to the sea in cliffs, and the character changes completely. Xàbia and Dénia sit either side of it with a national park between them.',
    'Dénia was the capital of a taifa kingdom in the eleventh century and its ruler controlled the Balearics. It is now a UNESCO City of Gastronomy, which is largely down to one ingredient: the gamba roja, a deep-water red prawn trawled from the submarine canyon offshore, which is the most expensive shellfish in Spain and sells at auction for serious money.',
    'Xàbia is quieter and has a strict building code that has kept it low-rise. The Cap de Sant Antoni and Cap de la Nau bracket a coast of coves, and the water between them is a marine reserve.'
  ],
  see: [
    { n: 'The Montgó',
      d: 'A natural park between the two towns, with a summit walk of about three hours from Xàbia and over six hundred plant species on the limestone.' },
    { n: 'Cala Granadella',
      d: 'A pebble cove below Xàbia with clear water and a restaurant on the beach. Access is capped in summer and the road is closed; use the shuttle.' },
    { n: 'The gamba roja',
      d: 'The Dénia auction happens at the fish market most afternoons and is open to watch. The prawns are eaten plainly boiled or grilled, and the heads are sucked.' },
    { n: 'Dénia castle',
      d: 'On the hill in the middle of the town, with the Palau del Governador and an archaeological museum. Open late in summer.' },
    { n: 'Cova Tallada',
      d: 'A sea cave quarried by the Moors for stone, reached on a coastal path from Dénia or by kayak, with pools inside. Permits are now required in summer.' },
    { n: 'The ferry to Ibiza',
      d: 'Two hours from Dénia, which is the shortest crossing to the Balearics from the mainland.' }
  ],
  when: 'May, June, September and October. July and August fill completely and the cove roads close.',
  stay: 'Three nights.',
  move: 'A car. The TRAM reaches Dénia from Alicante slowly and scenically. Valencia airport is ninety minutes.',
  eat: 'Gamba roja. Also espencat, roasted vegetables with salt cod, and the local rice dishes, which differ from Valencia’s.'
},

'VLC-penyiscola': {
  intro: [
    'Peníscola is a rock joined to the mainland by a sandbar, with a walled town stacked up it and a Templar castle on top. The Templars built it between 1294 and 1307 on Arab foundations, and within a few years of finishing the order was suppressed and the castle passed to the Order of Montesa.',
    'Its moment came in 1411 when Benedict XIII, the Avignon antipope known as Papa Luna, retreated here after being deposed by the Council of Constance. He continued to claim the papacy from this rock until his death in 1423, excommunicating everyone who disagreed, which was by then everyone.',
    'The town below has almost no horizontal streets, white houses, and a sea wall you can walk. El Cid was filmed here in 1961 and more recently so was a great deal of television, which the town has monetised cheerfully.'
  ],
  see: [
    { n: 'The castle',
      d: 'Templar military architecture, plain and massive, with Papa Luna’s study and a terrace over the sea. The Gothic basilica inside is bare stone with no decoration.' },
    { n: 'The walled town',
      d: 'Up through the Portal Fosc and along the lanes. Fifteen minutes to cross and worth doing at night when the day visitors have gone.' },
    { n: 'The Bufador',
      d: 'A blowhole in the rock below the walls that roars in a northeasterly. Signed, and audible before you find it.' },
    { n: 'The north beach',
      d: 'Five kilometres of sand running away from the rock, with the old town at the end of it, which is the classic view.' },
    { n: 'The Sierra de Irta',
      d: 'A protected coastal range immediately south with no development at all, walking tracks and small rocky coves.' },
    { n: 'The Papa Luna museum',
      d: 'In the castle, explaining the Western Schism, which is one of the stranger episodes in European history and is explained here with local pride.' }
  ],
  when: 'May, June and September. July and August are extremely busy. Winter is mild and the town is almost empty.',
  stay: 'A night.',
  move: 'A car. The nearest station is Benicarló-Peníscola, five kilometres away. Two hours from Valencia.',
  eat: 'Fish from the local fleet, langostinos from Vinaròs up the coast, and suquet. The restaurants inside the walls are priced for the view.'
},

'VLC-morella': {
  intro: [
    'Morella stands at a thousand metres on an isolated hill with a complete circuit of walls two and a half kilometres long, sixteen towers and six gates, and a castle on the rock above that. It is the most completely fortified town left in the Valencian country and it looks exactly as a medieval town is supposed to look, which is rare enough to be startling.',
    'It was taken from the Moors in 1232 and became a wool town, which is where the money for the basilica came from. In the nineteenth century it was fought over repeatedly in the Carlist wars, changing hands several times, and General Cabrera held it as his headquarters.',
    'The country around is the Els Ports comarca: high, cold, empty limestone with dinosaur footprints in it. Morella has the second highest density of fossil sites in Spain and a small but good museum of them.'
  ],
  see: [
    { n: 'The castle',
      d: 'A steep climb through the ruins of the convent of Sant Francesc to a bare rock summit with the whole comarca laid out. The cliff drops on three sides.' },
    { n: 'Basílica de Santa María la Mayor',
      d: 'Gothic, with two carved doorways and a spiral stone staircase to the choir with the Last Judgement carved on the side of it.' },
    { n: 'The walls',
      d: 'Walk the full circuit outside them, about forty minutes, which gives you the town as a single object.' },
    { n: 'The aqueduct',
      d: 'Fourteenth century, on the approach road, still carrying water into the town.' },
    { n: 'The dinosaur museum',
      d: 'Including Iguanodon material and a locally named species, Morelladon, described in 2015.' },
    { n: 'The Sexenni', t: 'once every six years, August',
      d: 'A festival held since 1673 in thanks for the end of a plague, with streets hung in coloured paper and tissue decorations made by hand over the preceding year.' }
  ],
  when: 'Spring to autumn. Morella at a thousand metres gets snow and is genuinely cold from November to March.',
  stay: 'A night.',
  move: 'A car. Ninety minutes inland from the coast on good mountain roads.',
  eat: 'Truffles, which Els Ports produces in quantity. Lamb, cecina, and Morella’s flaons, a cheese pastry.'
},

'VLC-guadalest': {
  intro: [
    'Guadalest is a village of around two hundred people on a crag in the Sierra de Aorta, reached through a tunnel cut in the rock because there is no other way in. Above it the Castell de Sant Josep sits on a pinnacle, and below it the reservoir is an intense turquoise from dissolved limestone.',
    'It receives something close to two million visitors a year, which is roughly ten thousand per resident, and that number is the single most important thing to know before coming. By eleven in the morning the main street is a single file queue.',
    'Go at eight or stay the night. The village has a half dozen small museums of varying eccentricity, including one of miniatures and one of salt and pepper shakers, which are either charming or a symptom depending on your mood.'
  ],
  see: [
    { n: 'The castle and the belfry',
      d: 'The white bell tower on the rock is the image of the place. The castle ruins behind it give the view down to the reservoir.' },
    { n: 'The tunnel',
      d: 'Fifteen metres cut through the rock, which is the only entrance to the upper village and has been since the eleventh century.' },
    { n: 'Casa Orduña',
      d: 'An eighteenth-century house that belonged to the governing family, furnished, and the best of the museums by some margin.' },
    { n: 'The reservoir',
      d: 'Walkable from below, with a path round part of it, and kayaks in summer. The colour is real and is due to suspended limestone.' },
    { n: 'The Algar waterfalls',
      d: 'Twenty minutes away, a series of falls and pools you can swim in, with a boardwalk. Busy in summer and genuinely good.' },
    { n: 'Going early',
      d: 'Before nine, or after six in summer. This is not optional advice.' }
  ],
  when: 'Spring and autumn, early in the day. Winter weekdays are the only time it is quiet.',
  stay: 'Two hours, or a night.',
  move: 'A car, forty-five minutes inland from Benidorm on a winding road. Coaches run constantly from the coast, which is the problem.',
  eat: 'Mountain food aimed at day trippers. The quality drops sharply the closer you get to the main street.'
},

'VLC-calpe': {
  intro: [
    'The Peñón de Ifach is a limestone monolith three hundred and thirty-two metres high joined to the shore by a low isthmus, and it was the first natural park declared in the Valencian country, in 1987. It is the remains of a larger mass that the sea removed, and it holds around three hundred plant species including several found nowhere else.',
    'You can climb it. The path goes up through a tunnel blasted in 1918 for a quarry access road, then across the north face on exposed rock that is polished and genuinely slippery, to a summit with the whole coast either side. It takes about two and a half hours return and it is harder than people expect.',
    'Numbers are capped at three hundred a day with a free permit booked online, which was introduced after accidents. Below it, Calpe itself is a wall of 1970s apartment blocks that is best regarded as the price of the rock being protected.'
  ],
  see: [
    { n: 'The climb', t: 'free permit, capped at 300 a day',
      d: 'Book ahead. Proper shoes, no flip-flops, and the park will turn you back without them. The last section is a scramble with a chain.' },
    { n: 'The information centre',
      d: 'At the foot, with the geology and the bird colonies, including Audouin’s gull and peregrines.' },
    { n: 'Las Salinas',
      d: 'Salt pans in the middle of the modern town, worked by the Romans, now holding flamingos within a hundred metres of apartment blocks.' },
    { n: 'The Baños de la Reina',
      d: 'Roman fish tanks cut into the rock at the water’s edge, part of a villa and salting works. Free and on the shore.' },
    { n: 'The old town',
      d: 'Above the beach, with painted lanes and a stretch of fifteenth-century wall. Small and far pleasanter than the seafront.' },
    { n: 'Diving around the rock',
      d: 'The underwater face continues to about forty metres with good fish life and occasional sunfish.' }
  ],
  when: 'Spring and autumn for the climb. Summer on the rock is dangerous in the middle of the day with no shade.',
  stay: 'A day.',
  move: 'A car, or the TRAM from Alicante and Benidorm.',
  eat: 'Calpe has a working fishing fleet and the fish auction is at five most weekday afternoons. Arròs del senyoret, a rice with everything peeled for you.'
},

'VLC-elche': {
  intro: [
    'The palm grove at Elche has around two hundred thousand trees over four hundred hectares in the middle of a city of two hundred and thirty thousand people. It is the largest in Europe and the northernmost grove of its kind, and it exists because the Moors built an irrigation system in the eighth century on Iberian and Roman foundations, diverting the Vinalopó into a grid of channels.',
    'It is a working agricultural system rather than a park. The palms were planted in rows to shade crops underneath, which is the North African huerto pattern, and some are three hundred years old. White palm, grown by tying the fronds so they develop without chlorophyll, is still produced here and sent across Spain for Palm Sunday.',
    'The other thing from Elche is the Misteri, a sung liturgical drama performed in the basilica every August since at least the fifteenth century, entirely by local men and boys, with machinery that lowers singers from the dome. It is the only surviving medieval mystery play in Europe performed continuously in its original church.'
  ],
  see: [
    { n: 'Huerto del Cura',
      d: 'A garden within the grove with the Imperial Palm, a tree with seven trunks growing from one base, named for Empress Elisabeth of Austria who visited in 1894.' },
    { n: 'The Misteri d’Elx', t: '14 and 15 August, rehearsals from the 11th',
      d: 'Free, in the Basilica de Santa María, and the church fills. UNESCO listed in 2001 as the first intangible heritage proclamation.' },
    { n: 'The palm grove walk',
      d: 'A marked route of several kilometres through the huertos, past the irrigation channels. Free and nearly empty.' },
    { n: 'The Dama de Elche',
      d: 'A fourth-century BC Iberian bust found here in 1897 and now in Madrid, with a copy in the Elche archaeological museum. The original’s return is a long-running local grievance.' },
    { n: 'L’Alcúdia',
      d: 'The Iberian and Roman site two kilometres out where the Dama was found, with a museum.' },
    { n: 'El Hondo and the salt pans',
      d: 'Wetlands south of the city with flamingos and marbled teal, one of the most important waterbird sites on the Spanish Mediterranean.' }
  ],
  when: 'August for the Misteri. Otherwise spring and autumn; the grove gives shade but the city is hot.',
  stay: 'Half a day.',
  move: 'Train or tram from Alicante in twenty minutes. The airport is between the two.',
  eat: 'Arroz con costra, a rice with an egg crust baked on top, which is specific to Elche. Dates from the grove, and pomegranates, which the area grows more of than anywhere in Spain.'
},

'CYL-salamanca': {
  intro: [
    'The university was founded in 1218 and is the third oldest in continuous operation in Europe. In 1550 the Valladolid debate about whether the indigenous peoples of the Americas had souls and rights was argued by men trained here, and the School of Salamanca effectively invented international law and a good deal of modern economics in the process.',
    'The whole city is built from Villamayor sandstone, which has a high iron content and turns gold in late afternoon light and deep orange at sunset. This is not a poetic description; it is a property of the stone, and it is why the city looks the way it does for about forty minutes a day.',
    'The Plaza Mayor was finished in 1755 and is the best square in Spain, which is a claim with real competition. It is enclosed on all four sides with eighty-eight arches, no gaps for traffic, and medallions of Spanish figures around it. One is blank, reserved and then left empty after Franco’s was removed in 2017.'
  ],
  see: [
    { n: 'The university facade',
      d: 'A Plateresque wall of carved stone from 1529, and somewhere in it is a small frog on a skull. Finding it without being told is the tradition and tourists stand in front of it for a long time.' },
    { n: 'The two cathedrals',
      d: 'Old and new, sharing a wall. The old one is twelfth-century Romanesque with a scaled dome called the Torre del Gallo; the new is Gothic finished in 1733. A 1992 restoration added an astronaut and a dragon eating an ice cream to a doorway, which has confused people ever since.' },
    { n: 'The Plaza Mayor at night',
      d: 'Lit, enclosed and full of students until very late. There is no better square in the country to do nothing in.' },
    { n: 'Casa de las Conchas',
      d: 'A house of 1517 with three hundred carved scallop shells on the facade, the badge of the Order of Santiago. Now a public library and free to walk into.' },
    { n: 'Ieronimus',
      d: 'A route through the towers and upper galleries of the cathedrals, walking above the vaults and out onto the roofs. The best thing in Salamanca and comparatively few people do it.' },
    { n: 'The Art Nouveau and Art Deco museum',
      d: 'In Casa Lis, a 1905 house with a stained glass wall facing the river. Doulton, Lalique, and fifteen hundred porcelain dolls which are either delightful or extremely unsettling.' }
  ],
  when: 'Spring and autumn. Salamanca at eight hundred metres is cold from November to March. Term time, when the students are in, is considerably better than August.',
  stay: 'Two nights.',
  move: 'Train from Madrid in about ninety minutes. Everything is walkable.',
  eat: 'Hornazo, a pork and chorizo pie eaten at Easter Monday picnics. Chanfaina, a rice and offal dish. Guijuelo ham from the hills south of the city.'
},

'CYL-segovia': {
  intro: [
    'The aqueduct is twenty-eight thousand four hundred granite blocks with no mortar, cement or clamps of any kind, standing by compression and the weight of the stones. It is a hundred and sixty-six arches over about eight hundred metres and it reaches twenty-eight and a half metres at the Plaza del Azoguejo. It was built probably under Domitian or Trajan and it carried water into the city until 1973.',
    'What it does to the town is the point. It runs straight through the middle, over a public square, with buildings on both sides and traffic underneath, so you are constantly walking past something two thousand years old on your way to buy bread.',
    'The castle on the far end of the ridge is largely a nineteenth-century rebuild after a fire in 1862, which is frequently omitted. The slate spires were added then. It is still the model Disney used and the setting, on a prow of rock where two rivers meet, is entirely original.'
  ],
  see: [
    { n: 'The aqueduct',
      d: 'Walk under it at the Azoguejo, then climb the stairs beside it to the Postigo for the level view along the top. Lit at night.' },
    { n: 'The Alcázar',
      d: 'Isabella was proclaimed queen here in 1474. The Tower of Juan II is a hundred and fifty-two steps and gives the ridge, the two rivers and the cathedral in one view.' },
    { n: 'The cathedral',
      d: 'Begun in 1525, which makes it one of the last Gothic cathedrals built anywhere. Called the lady of cathedrals, and the tower is climbable on a guided visit.' },
    { n: 'Cochinillo at Casa Cándido',
      d: 'Suckling pig roasted in a wood oven and traditionally cut with the edge of a plate to prove how tender it is, then the plate is smashed. Deeply theatrical and the pig is excellent.' },
    { n: 'La Granja de San Ildefonso',
      d: 'Eleven kilometres away, a Bourbon palace with twenty-six fountains driven entirely by gravity from a reservoir above. They run on a few set dates a year and are worth planning around.' },
    { n: 'The Vera Cruz church',
      d: 'A twelve-sided Templar-associated church of 1208 outside the walls, with a two-storey chamber in the middle. Best view back at the Alcázar from its door.' }
  ],
  when: 'Spring and autumn. Segovia is at a thousand metres and winter is hard and clear. The La Granja fountains run on specific days from May to August.',
  stay: 'A night, or a day trip.',
  move: 'AVE from Madrid in twenty-seven minutes, though the station is out of town and needs a bus. The old road over Navacerrada is slower and far better.',
  eat: 'Cochinillo, judiones de La Granja, and ponche segoviano, a marzipan-topped cake.'
},

'CYL-avila': {
  intro: [
    'Ávila has two and a half kilometres of eleventh-century wall with eighty-eight semicircular towers and nine gates, standing complete all the way round. There is no other medieval circuit in Europe quite this intact, and the reason is that the city stopped growing: it was on the frontier, got poor, and nobody ever needed to knock the wall down to expand.',
    'At 1,132 metres it is the highest provincial capital in Spain and the coldest, with a saying that it has nine months of winter and three of hell. The granite is grey, the plain around it is bare, and in February the place is genuinely austere in a way that suits its history.',
    'Teresa of Ávila was born here in 1515, reformed the Carmelite order against considerable opposition, wrote the Interior Castle, and was made a Doctor of the Church in 1970, the first woman to be so named. Her relics are distributed across several sites and the town is organised around her.'
  ],
  see: [
    { n: 'Walking the walls',
      d: 'About half the circuit is open on top, in two sections, with the best stretch from the Puerta del Alcázar. The light in late afternoon on the granite is the thing.' },
    { n: 'The cathedral',
      d: 'Built into the wall itself, so its apse is one of the towers. The interior uses a red and white mottled stone that looks like no other church in Spain.' },
    { n: 'Los Cuatro Postes',
      d: 'Four columns and a cross on a rise outside the town, where Teresa was caught trying to run away to be martyred by the Moors at the age of seven. The classic view of the walls from here, especially at night.' },
    { n: 'Convento de Santa Teresa',
      d: 'Built over her birthplace, with the room where she was born as a chapel and a reliquary holding her ring finger, which Franco kept by his bedside until his death.' },
    { n: 'San Vicente',
      d: 'A Romanesque basilica outside the walls with a carved cenotaph and a west doorway that is among the best twelfth-century sculpture in Spain.' },
    { n: 'The Monastery of Santo Tomás',
      d: 'Holding the tomb of Prince Juan, the only son of Ferdinand and Isabella, whose death at nineteen changed the succession and therefore European history.' }
  ],
  when: 'May to October. Winter is severe. Semana Santa here is quiet and serious rather than theatrical.',
  stay: 'A night, or a day trip from Madrid.',
  move: 'Train from Madrid in about ninety minutes. Walkable.',
  eat: 'Chuletón de Ávila, a large beef chop from Avileña cattle. Judías del Barco, large white beans. Yemas de Santa Teresa, an egg yolk and sugar sweet.'
},

'CYL-burgos': {
  intro: [
    'The cathedral was begun in 1221 in a French Gothic style brought back by a bishop who had studied in Paris, and it took three hundred years, which is why the spires are German, the dome is Renaissance and the whole thing reads as an argument between centuries. It was the first cathedral in Spain to be listed by UNESCO on its own.',
    'El Cid is buried under the crossing with his wife Jimena. He was born nearby, exiled by his king, took Valencia for himself, and became the Spanish national hero in a poem written about eighty years after his death, most of which is not true.',
    'Twenty minutes away at Atapuerca, a railway cutting from the 1890s exposed caves holding human remains going back around 1.2 million years, including Homo antecessor, which is the earliest hominin known in Europe. The finds are in the museum in Burgos and the site is open on booked visits.'
  ],
  see: [
    { n: 'The cathedral',
      d: 'The Papamoscas, a figure that opens its mouth on the hour; the golden staircase by Diego de Siloé; and the Constable’s chapel with a star vault with glazing in the points.' },
    { n: 'Museum of Human Evolution',
      d: 'Purpose-built for the Atapuerca finds, including Miguelón, a near-complete skull about four hundred and thirty thousand years old. One of the best archaeology museums in Europe.' },
    { n: 'The Camino',
      d: 'Burgos is the end of the twelfth stage from Saint-Jean. Pilgrims arrive through the Arco de Santa María and the city is set up for them.' },
    { n: 'Cartuja de Miraflores',
      d: 'A Carthusian monastery with an eight-pointed star tomb by Gil de Siloé for Isabella’s parents, carved in alabaster with a density that has to be seen rather than described.' },
    { n: 'Atapuerca', t: 'booked visits, March to December',
      d: 'The Trinchera railway cutting and the Gran Dolina. The guides are working archaeologists in season.' },
    { n: 'Las Huelgas',
      d: 'A Cistercian convent with royal tombs and a medieval textile collection that survived because the tombs were never looted, which is extremely rare.' }
  ],
  when: 'May to September. Burgos is at eight hundred and sixty metres and the winter is long and cold.',
  stay: 'Two nights.',
  move: 'Train from Madrid in about two and a half hours. On the main road north to Bilbao.',
  eat: 'Morcilla de Burgos, a blood sausage with rice in it. Lechazo, milk-fed lamb. Queso de Burgos, a fresh cheese eaten with honey.'
},

'CYL-leon': {
  intro: [
    'The cathedral at León has about eighteen hundred square metres of stained glass in a hundred and twenty-five windows and thirty-seven oculi, which is proportionally more glass and less wall than any other Gothic cathedral in Spain. The structure was pushed so far that it has been close to collapse more than once and spent most of the nineteenth century being rebuilt.',
    'The city was a Roman legionary camp, which is where the name comes from: legio, not lion. It was the capital of a kingdom from 910, and the royal pantheon at San Isidoro holds a set of twelfth-century frescoes so complete and so well preserved that it is called the Sistine Chapel of Romanesque art.',
    'León also has the best free tapas in Spain. In the Barrio Húmedo every drink comes with a plate, as in Granada, and because it is a smaller town the quality tends to be higher and the circuit shorter.'
  ],
  see: [
    { n: 'The cathedral glass',
      d: 'Go in the late afternoon in summer when the west rose is working. The night visits in season, with the glass lit from outside, are the best version.' },
    { n: 'San Isidoro’s Panteón de los Reyes',
      d: 'A low vaulted chamber painted around 1175 with an agricultural calendar, a Pantocrator and a Nativity, in colours that have never been restored because the room stayed dry.' },
    { n: 'Casa Botines',
      d: 'A Gaudí building of 1892, one of only three outside Catalonia, now a museum. Granite, turrets and a statue of Saint George over the door.' },
    { n: 'The Barrio Húmedo',
      d: 'Around Plaza San Martín. A drink and a free plate at each bar, moving on after one. Four or five bars is a dinner.' },
    { n: 'San Marcos',
      d: 'A Plateresque monastery of the Order of Santiago, now a parador, with a facade seventy metres long and a cloister you can walk into.' },
    { n: 'Las Médulas',
      d: 'Ninety minutes west, the Roman gold workings, which are worth a day of their own.' }
  ],
  when: 'May to October. The Semana Santa processions here are among the most serious in Spain and quite different in feel from the Andalusian ones.',
  stay: 'Two nights.',
  move: 'AVE from Madrid in just over two hours. On the Camino Francés.',
  eat: 'Cecina, air-dried beef, which is the local equivalent of ham. Botillo from El Bierzo. Morcilla, and the free tapas, which are the real reason to be here in the evening.'
},

'CYL-las-medulas': {
  intro: [
    'The Romans took gold out of these hills by a method called ruina montium, mountain wrecking. They dug kilometres of tunnels into the hillside, led water from the mountains through a network of canals up to a hundred kilometres long, and then released it into the tunnels all at once. The hydraulic pressure blew the mountain apart from inside.',
    'Pliny the Elder was procurator of the province and described the process at first hand, including the moment after the collapse when the engineers who had been watching from a distance would raise a shout. The modern estimate is that they removed something like five hundred million cubic metres of material.',
    'What is left is red clay pinnacles standing out of chestnut woods, which is a landscape produced entirely by industrial destruction two thousand years ago and which is now a UNESCO World Heritage Site for exactly that reason. The chestnuts were planted by the Romans to feed the workforce.'
  ],
  see: [
    { n: 'Mirador de Orellán',
      d: 'The viewpoint over the whole site, reached by road and then a short climb. Best in the late afternoon when the clay goes properly red, and in autumn with the chestnuts turning.' },
    { n: 'The Orellán galleries',
      d: 'A hundred metres of Roman tunnel you walk into, with the tool marks and the water channels still visible. Separate small ticket.' },
    { n: 'Senda de las Valiñas',
      d: 'A walking route from Las Médulas village through the pinnacles and into the Cuevona and Encantada caves. About two hours and the only way to be inside the landscape.' },
    { n: 'The canals',
      d: 'Sections of the aqueduct system are walkable on the hillsides above, cut into rock, running for kilometres at a constant tiny gradient.' },
    { n: 'The chestnuts', t: 'October',
      d: 'Ancient trees, some reckoned to be five hundred years old, and the magosto chestnut roasting festival in November.' },
    { n: 'El Bierzo wine',
      d: 'The valley below grows Mencía on slate, making the most interesting red in Castile and León. Several bodegas around Villafranca and Cacabelos.' }
  ],
  when: 'October for the chestnuts and the colour. Spring is green and good. Summer is hot and the site is exposed.',
  stay: 'Half a day, with a night in Ponferrada or Villafranca.',
  move: 'A car. Twenty-five minutes from Ponferrada, which is on the Madrid to A Coruña line.',
  eat: 'Botillo, a smoked stuffed pork product from El Bierzo eaten in winter with cabbage and potato. Bierzo peppers and Mencía wine.'
},

'CYL-ribera-duero': {
  intro: [
    'The Duero runs west across the meseta at around eight hundred metres, and the vines on either side of it sit in a continental climate with forty-degree summer days and frosts into May. That swing concentrates the fruit and is the reason the wine tastes as it does.',
    'Vega Sicilia was founded in 1864 and makes Único, which is aged for around ten years before release and is the most expensive wine in Spain. For a century it was essentially the only estate anyone outside the region had heard of. The DO was only created in 1982 and there are now over three hundred wineries.',
    'The old cellars are the surprise. Almost every village has a hillside pocked with doors and chimneys, which are bodegas dug into the ground in the sixteenth and seventeenth centuries by families who each had their own. Many are still used for the fiesta rather than for commercial wine.'
  ],
  see: [
    { n: 'The underground village cellars',
      d: 'Aranda de Duero has over a hundred and twenty under the town centre, linked and open on a guided visit. Moradillo de Roa and Baltanás have whole hillsides of them above ground level.' },
    { n: 'Peñafiel',
      d: 'A castle two hundred and ten metres long and twenty wide along a ridge, shaped like a ship, holding the provincial wine museum.' },
    { n: 'The big estates',
      d: 'Vega Sicilia, Pingus and Pesquera are difficult or impossible to visit. Protos, Arzuaga and Emilio Moro take bookings and are good. Several newer ones have serious architecture.' },
    { n: 'Clunia',
      d: 'A substantial Roman town with a theatre cut into the hillside, excavated and almost unvisited, an hour east.' },
    { n: 'Santo Domingo de Silos',
      d: 'A Benedictine abbey with a Romanesque cloister whose carved capitals are among the best in Europe, and a choir whose chant recordings sold several million copies in 1994.' },
    { n: 'The harvest', t: 'late September into October',
      d: 'Tempranillo here is called Tinta del País or Tinto Fino. Several estates take visitors through picking.' }
  ],
  when: 'September and October for harvest. Spring and early summer otherwise. Winter is cold and many small cellars close.',
  stay: 'Two nights around Peñafiel or Aranda.',
  move: 'A car. Two hours north of Madrid on the A-1.',
  eat: 'Lechazo asado, milk-fed lamb roasted in a wood-fired clay oven, which is the regional dish and is what the wine was made to go with.'
},

'CYL-la-alberca': {
  intro: [
    'La Alberca was the first entire village in Spain declared a historic-artistic monument, in 1940. The houses are timber-framed with the upper floors projecting over the street, built from granite, oak and adobe, and the lanes are narrow enough that the overhangs nearly meet above you.',
    'The village kept a set of practices that had died out elsewhere. A communal pig, the marrano de San Antón, was released in June to be fed by the whole village and raffled at Christmas, and the custom still runs. A woman called the moza de ánimas walks the streets at dusk ringing a bell and reciting prayers for the dead, which has been done continuously for centuries.',
    'The Sierra de Francia around it is chestnut and oak, with villages at the bottom of steep valleys and a sanctuary on top of the Peña de Francia at 1,723 metres with a view over four provinces.'
  ],
  see: [
    { n: 'The village',
      d: 'Plaza Mayor with its crucifix, and the lanes off it. An hour at a slow walk. Weekday mornings are quiet; weekends are not.' },
    { n: 'The moza de ánimas', t: 'dusk, most evenings',
      d: 'A short and genuinely strange survival. Ask at the tourist office for the current practice.' },
    { n: 'Peña de Francia',
      d: 'A road to the summit and a Dominican monastery from 1437. On a clear day you see from the Gredos to Portugal.' },
    { n: 'Las Batuecas',
      d: 'A valley over the pass with a Carmelite monastery and prehistoric rock art in shelters along the river. Griffon vultures nest on the walls.' },
    { n: 'Mogarraz',
      d: 'Twenty minutes away, where an artist painted portraits of all three hundred and eighty-eight residents photographed in 1967 and hung each one on the house they lived in.' },
    { n: 'Jamón from Guijuelo',
      d: 'Forty minutes east, where the Iberian pigs from this oak country are cured.' }
  ],
  when: 'Spring and autumn, with the chestnuts in late October. The village is at a thousand metres and winter is cold.',
  stay: 'A night.',
  move: 'A car. An hour and a quarter south of Salamanca.',
  eat: 'Iberian pork in all forms, limón serrano, a dish of orange, egg and ham despite the name, and honey from the sierra.'
},

'CYL-atapuerca': {
  intro: [
    'A mining company cut a railway trench through this limestone ridge in the 1890s and abandoned it. In doing so they sliced open a series of caves that had been sealed for hundreds of thousands of years, exposing the sediment layers in cross-section like a diagram.',
    'What came out of them rewrote European prehistory. The Gran Dolina produced remains of Homo antecessor dated to around eight hundred thousand years ago, which at the time were the oldest hominins in Europe by a wide margin, and the Sima de los Huesos has yielded over six thousand five hundred fossils from at least twenty-eight individuals of about four hundred and thirty thousand years ago, which is the largest assemblage of its kind anywhere.',
    'The Sima is thirteen metres down a vertical shaft at the end of half a kilometre of cave, and there is no plausible way the bodies got there by accident. The argument that this is deliberate deposition of the dead, which would make it by far the earliest known funerary behaviour, is contested and ongoing.'
  ],
  see: [
    { n: 'The Trinchera', t: 'booked guided visits only',
      d: 'The railway cutting with the Gran Dolina and Sima del Elefante exposed in its walls. Book through the Atapuerca or Ibeas visitor centres; in summer the guides are the excavating archaeologists.' },
    { n: 'Museum of Human Evolution, Burgos',
      d: 'Where the finds actually are, twenty minutes away, and the better half of the visit. Miguelón, the Excalibur handaxe found with the Sima bodies, and a full-scale Beagle.' },
    { n: 'The experimental archaeology park',
      d: 'Beside the site, with reconstructions and demonstrations of flint knapping and fire making. Aimed at families and better than it sounds.' },
    { n: 'The Sima de los Huesos',
      d: 'Not open to visitors and never will be. The excavation footage in the museum is the closest anyone gets.' },
    { n: 'Excalibur',
      d: 'A single quartzite handaxe, pink, found among the Sima bodies and the only tool in the deposit. Whether it is a grave good is the whole argument.' },
    { n: 'The Camino',
      d: 'The Camino Francés passes directly through Atapuerca village, which means a steady trickle of walkers going past one of the most important sites in human prehistory without stopping.' }
  ],
  when: 'The dig runs in summer and that is when the site is most interesting. Visits run March to December; the trench is closed in deep winter.',
  stay: 'Half a day for the site, half for the museum.',
  move: 'A car, twenty minutes east of Burgos. Visits must be booked ahead.',
  eat: 'In Burgos. The villages have little.'
},

'CYL-astorga': {
  intro: [
    'Astorga was Asturica Augusta, a Roman administrative centre for the gold operations at Las Médulas, and Pliny called it a magnificent city. Substantial Roman remains are under the modern streets, including sewers you can walk through and the foundations of a bath complex.',
    'In 1887 the bishop commissioned a new palace after a fire, and because he was Catalan he gave the job to a fellow Catalan he knew: Antoni Gaudí. The result is a grey granite neo-Gothic fantasy with a moat, which the diocese found alarming. After the bishop died Gaudí quit in 1893 after a dispute with the chapter and never returned, and the building was finished by someone else in 1915.',
    'Astorga is also the centre of Spanish chocolate. The trade came through here from Veracruz via the Camino, and by the nineteenth century there were around fifty workshops. A handful remain and there is a museum.'
  ],
  see: [
    { n: 'The Episcopal Palace',
      d: 'Gaudí’s building, now a museum of the Camino. The chapel and the throne room have the ribbed vaulting and the tile that make it unmistakably his.' },
    { n: 'The cathedral',
      d: 'Next door, Gothic with a Baroque front, and a retable by Gaspar Becerra that is one of the great Spanish Renaissance altarpieces.' },
    { n: 'The Roman museum and the ergastula',
      d: 'A vaulted Roman gallery under the square, variously interpreted as a slave prison or a cryptoporticus, plus the baths and sewers on a signed route.' },
    { n: 'Chocolate',
      d: 'The Museo del Chocolate has the old machinery. Several workshops still make it and the local style is dense and heavily roasted.' },
    { n: 'Mantecadas',
      d: 'A small square butter cake baked here since the eighteenth century and protected by designation. Bought by weight, warm, from a bakery rather than a shop.' },
    { n: 'The Maragatos',
      d: 'A distinct local group who were muleteers controlling trade between Galicia and Castile. Their villages west of here, particularly Castrillo de los Polvazares, are built in a characteristic red stone.' }
  ],
  when: 'Spring to autumn. On the Camino, so there is a steady pilgrim population from April.',
  stay: 'Half a day.',
  move: 'Train from León in forty minutes. On the Camino Francés.',
  eat: 'Cocido maragato, which is a three-course stew served backwards: meat first, then the vegetables, then the soup. The usual explanation involves muleteers eating the best part first in case they were interrupted.'
},

'CYL-zamora': {
  intro: [
    'Zamora has twenty-three Romanesque churches inside the old walls, which is the densest concentration of twelfth-century architecture in Europe. They were built in about a hundred years, when the city was the front line against Al-Andalus and money and masons were available, and then nothing much happened for eight hundred years, which is why they are still standing.',
    'The style here has a particular detail: carved corbels and doorways with a strong Mozarabic and Islamic influence in the geometry, because the masons were working on a frontier and used what they knew. Several churches have scalloped arches that are closer to Córdoba than to France.',
    'Semana Santa in Zamora is the most austere in Spain. There is no music in several of the processions, the brotherhoods walk in silence, and one of them, the Hermandad de Jesús Yacente, processes by candlelight with the brothers barefoot in white tunics. It is very different from Seville and a good number of people consider it better.'
  ],
  see: [
    { n: 'The cathedral dome',
      d: 'A scaled stone dome on sixteen ribs with four turrets, which is unlike anything else in Spain and is usually explained by reference to Byzantium or to the crusader East.' },
    { n: 'The Romanesque churches',
      d: 'Santa María la Nueva, La Magdalena with its extraordinary south door, and San Cipriano. Most are free and open in the morning; the tourist office has the current hours.' },
    { n: 'Semana Santa', t: 'the week before Easter',
      d: 'Seventeen brotherhoods. The silent night processions and the Jesús Yacente on Holy Thursday are the ones that mark people.' },
    { n: 'The Semana Santa museum',
      d: 'Holding the pasos, including Las Capas, which is carried by men in hooded capes. Year round and genuinely affecting out of season.' },
    { n: 'The Duero and the stone bridge',
      d: 'A fourteenth-century bridge of sixteen arches below the walls, with the city on the bluff above. The best view is from the far bank at sunset.' },
    { n: 'Arribes del Duero',
      d: 'West of the city, the gorge where the Duero becomes the Portuguese border.' }
  ],
  when: 'Semana Santa, booked far ahead, or spring and autumn. Zamora is on the meseta and the summers are hot and the winters bitter.',
  stay: 'A night.',
  move: 'AVE from Madrid in an hour and a half. On the Vía de la Plata route of the Camino.',
  eat: 'Zamora has strong cheese, Toro wine from twenty minutes east, which is big and tannic, and bacalao a la tranca, salt cod with garlic and paprika.'
},

'CYL-arribes': {
  intro: [
    'For about a hundred and twenty kilometres the Duero stops being a slow meseta river and cuts a gorge up to four hundred metres deep through granite. The Spanish bank is Salamanca and Zamora provinces, the Portuguese bank is the Douro Internacional, and the two countries run a shared protected area across it.',
    'The cliffs hold one of the largest griffon vulture populations in Europe, along with Egyptian vultures, black storks, Bonelli’s eagle and eagle owls. There are viewpoints where you look down on birds with a two-and-a-half metre wingspan riding the thermals below you, which is a reversal most people find striking.',
    'The microclimate at the bottom of the gorge is much warmer than the plateau above, so oranges, almonds and olives grow at the foot of cliffs in a region where the winter frost on top kills them. The terraced vineyards produce Juan García, a grape grown essentially nowhere else.'
  ],
  see: [
    { n: 'Mirador del Fraile',
      d: 'Above the Aldeadávila dam, looking straight down into the gorge with vultures below. The best single viewpoint and reached by road.' },
    { n: 'The boat trips',
      d: 'From Miranda do Douro on the Portuguese side or from Vilvestre, an hour upstream and back between the cliffs. Border formalities are nominal.' },
    { n: 'Pozo de los Humos',
      d: 'A waterfall of about fifty metres on a tributary, best after rain, with viewpoints from both Masueco and Pereña.' },
    { n: 'Fermoselle',
      d: 'A village on a spur with over a thousand cellars dug into the rock beneath it, and the best base on the Zamora side.' },
    { n: 'The vultures',
      d: 'Colonies at several points along the gorge. Early morning as the thermals start is when they leave the cliffs.' },
    { n: 'Arribes wine',
      d: 'A small DO using Juan García and Rufete on terraces. Several tiny producers and almost nothing exported.' }
  ],
  when: 'Spring for the water and the birds, autumn for the colour. Summer is hot in the gorge.',
  stay: 'Two nights.',
  move: 'A car. Roads are slow and the villages are far apart. Ninety minutes from Salamanca or Zamora.',
  eat: 'Kid goat, Arribes olive oil, and oranges grown at the bottom of the gorge, which locals treat as a minor miracle.'
},

'CYL-valladolid': {
  intro: [
    'Valladolid was the capital of Spain on and off until 1561, Columbus died here in 1506 in a house that is now a museum, Cervantes lived here while Don Quixote was being printed, and Philip II was born here. It then lost the court to Madrid and has been a serious working city rather than a monument ever since.',
    'The thing that makes it worth the journey is the National Sculpture Museum, in the Colegio de San Gregorio. Spanish polychrome wood sculpture of the sixteenth and seventeenth centuries is an art form with no real equivalent elsewhere: figures carved in wood, gessoed, painted with skin tones and glass eyes, intended to be carried in processions and seen by candlelight.',
    'Gregorio Fernández and Alonso Berruguete are the two names, and the effect in a quiet gallery is unsettling. These were devotional objects made to produce a physical reaction and they still do.'
  ],
  see: [
    { n: 'Museo Nacional de Escultura',
      d: 'In a Gothic college with a facade of carved stone like lace. Berruguete’s altarpiece figures and Fernández’s Pietà. Two hours, and go slowly.' },
    { n: 'Semana Santa',
      d: 'The processions use the actual museum pieces, lent back to the brotherhoods for the week, which means you can see them doing what they were made for.' },
    { n: 'Plaza Mayor',
      d: 'Rebuilt after a fire in 1561 as the first regular arcaded square in Spain, which became the model for Madrid and Salamanca.' },
    { n: 'Casa de Cervantes',
      d: 'Where he lived in 1604 and 1605, furnished to the period, with the detail that a man was stabbed outside and Cervantes was briefly jailed over it.' },
    { n: 'The cathedral',
      d: 'Designed by Juan de Herrera, who built the Escorial, and never finished. About a third of the intended building exists, which makes it an unusually legible ruin of an ambition.' },
    { n: 'Ribera del Duero and Rueda',
      d: 'Both within forty minutes, red and white respectively, which makes Valladolid a practical wine base.' }
  ],
  when: 'Spring and autumn. Semana Santa for the sculpture in use. The meseta summer is hot and the winter is cold.',
  stay: 'A night.',
  move: 'AVE from Madrid in under an hour. A major rail junction for the whole northwest.',
  eat: 'Lechazo. Also a very strong tapas culture on Calle Correos and around the Plaza Mayor, with an annual competition that pushes the standard up.'
},

'CYL-soria': {
  intro: [
    'Soria is the least populated province in Spain and one of the emptiest regions in Europe, with about eight people per square kilometre. The phrase used in Spain for this belt of country is la España vaciada, the emptied Spain, and the emptying is recent and political rather than natural.',
    'Antonio Machado came here in 1907 as a French teacher, married Leonor Izquierdo when she was fifteen and he was thirty-four, and she died of tuberculosis three years later. He left and never came back, and wrote about the Duero and these poplars for the rest of his life. His poems are why most Spaniards have heard of Soria.',
    'Numancia, eight kilometres north, is the other reason. The Celtiberian town held out against Rome for twenty years, was besieged by Scipio Aemilianus with a nine-kilometre wall of circumvallation, and in 133 BC the survivors burned the town and killed themselves rather than be paraded in a triumph. It became the founding myth of Spanish resistance.'
  ],
  see: [
    { n: 'Numancia',
      d: 'On a bare hill, with the Roman camp circuit visible in the landscape around it and reconstructed Celtiberian and Roman houses. The setting does most of the work.' },
    { n: 'San Juan de Duero',
      d: 'A ruined monastery cloister with four sets of interlaced arches in four different styles, one of them clearly Islamic. Roofless, open to the sky and one of the strangest buildings in Spain.' },
    { n: 'Santo Domingo',
      d: 'A twelfth-century Romanesque west front with four concentric carved archivolts running the Creation and the Nativity around them in continuous bands.' },
    { n: 'The Machado walk',
      d: 'Along the Duero to San Saturio, a hermitage built into a cliff above the river. The poplars are the ones in the poems.' },
    { n: 'Cañón del Río Lobos',
      d: 'An hour west, a limestone canyon with a Templar chapel in it and griffon vultures on the walls.' },
    { n: 'Laguna Negra',
      d: 'A glacial lake under a cliff in the Urbión pines, the setting of Machado’s La Tierra de Alvargonzález, and reached by shuttle in summer.' }
  ],
  when: 'May to October. Soria is at a thousand metres and regularly records the coldest temperatures in Spain.',
  stay: 'Two nights.',
  move: 'A car. Trains from Madrid are slow. The province is the point and it needs wheels.',
  eat: 'Torreznos, pork belly fried until the skin blisters, which Soria claims as its own. Micológica cooking in autumn, when the pine woods produce boletus in commercial quantity.'
},

'CLM-toledo': {
  intro: [
    'Toledo sits on a granite outcrop inside a loop of the Tagus, which surrounds it on three sides in a gorge. It was the Visigothic capital, then a major city of Al-Andalus, then the Castilian capital until 1561, and through all of that it held substantial Muslim, Jewish and Christian populations at the same time.',
    'The phrase used for this is the city of three cultures, which is a tourist-board simplification of something that was often violent and always unequal, but the physical evidence is real: synagogues built by Muslim craftsmen and later turned into churches, a mosque that became a chapel, and a cathedral with a chapel that still uses the Mozarabic rite daily.',
    'El Greco arrived in 1577 and stayed until he died in 1614. He painted the city repeatedly, elongated and under a green storm sky, and The Burial of the Count of Orgaz is still in the church it was painted for, on the wall it was painted for, above the tomb it depicts.'
  ],
  see: [
    { n: 'The Burial of the Count of Orgaz',
      d: 'In Santo Tomé. One painting, one room, a small ticket. Go first thing. The lower half is a portrait gallery of Toledo society in 1586 and the upper half is heaven.' },
    { n: 'The cathedral',
      d: 'Thirteenth century, with a Transparente, a baroque hole cut through the vault in 1732 to let a shaft of sunlight hit the tabernacle, which is either genius or vandalism. The sacristy is effectively a gallery: El Greco, Titian, Goya, Caravaggio.' },
    { n: 'Sinagoga del Tránsito',
      d: 'Built in 1357 for Samuel ha-Levi, treasurer to Pedro I, with Hebrew and Arabic inscriptions in the same plaster frieze. Now the Sephardic Museum.' },
    { n: 'Santa María la Blanca',
      d: 'A synagogue of about 1180 built in Almohad style with horseshoe arches and whitewashed piers, later a church. Possibly the oldest synagogue building standing in Europe.' },
    { n: 'The Mirador del Valle',
      d: 'Across the gorge on the south side, giving the whole city on its rock. This is the El Greco view and it is best in the late afternoon.' },
    { n: 'Staying the night',
      d: 'Toledo takes around three million day visitors a year from Madrid. After seven in the evening the lanes empty completely and it becomes a different place.' }
  ],
  when: 'Spring and autumn. Summer on the Tagus is very hot. Corpus Christi in May or June is the city’s big day, with the streets covered in awnings and thyme.',
  stay: 'A night, which is the whole argument.',
  move: 'AVE from Madrid in thirty-three minutes. The old town is steep and the escalators from the Safont car park save a long climb.',
  eat: 'Carcamusas, a pork and tomato stew. Partridge. Manchego cheese and marzipan, which the convents have made since the Middle Ages and sell through a turntable.'
},

'CLM-cuenca': {
  intro: [
    'Cuenca sits on a spur between two gorges, the Júcar and the Huécar, and when the town ran out of flat ground in the fifteenth century it built outwards over the cliff edge on wooden corbels. The casas colgadas, hanging houses, are what is left of that: balconies projecting into three hundred feet of air.',
    'Three of them survive, restored in the 1920s. In 1966 a group of abstract painters led by Fernando Zóbel put a museum of Spanish abstract art into them, which was an unlikely idea that worked completely. The building and the collection are now inseparable and it remains one of the best small museums in Europe.',
    'Above the town the Serranía de Cuenca is limestone country: gorges, karst, and a sizeable forest, with the Ciudad Encantada and the source of the Cuervo within an hour.'
  ],
  see: [
    { n: 'Museo de Arte Abstracto Español',
      d: 'In the hanging houses. Tàpies, Chillida, Saura, Zóbel, Millares. Small, perfectly hung, with windows opening onto the gorge from the middle of a wall of paintings.' },
    { n: 'The Puente de San Pablo',
      d: 'An iron footbridge of 1902 across the Huécar gorge at forty metres, which gives the classic view of the hanging houses and is bouncy enough to bother some people.' },
    { n: 'The cathedral',
      d: 'Begun in 1196 and the first Gothic cathedral in Spain, Anglo-Norman in plan because Alfonso VIII’s queen was Eleanor of England. The front collapsed in 1902 and the replacement was never finished.' },
    { n: 'Semana Santa and the Turbas',
      d: 'On Good Friday morning drummers and trumpeters follow the procession in a deliberately chaotic din meant to represent the mob. It has been going since the seventeenth century and it is extraordinary.' },
    { n: 'The Júcar gorge',
      d: 'Walk down from the old town to the river and along it. Quieter than the Huécar side and the best way to see the town from below.' },
    { n: 'The Serranía',
      d: 'Ciudad Encantada, the Ventano del Diablo and the Nacimiento del Río Cuervo, a spring emerging from a mossy cliff, all within an hour north.' }
  ],
  when: 'Spring and autumn. Semana Santa for the Turbas. Cuenca is at a thousand metres and gets snow.',
  stay: 'A night.',
  move: 'AVE from Madrid in under an hour, though the station is out of town. The old town is a steep climb; there is a bus.',
  eat: 'Morteruelo, a game pâté. Zarajos, lamb intestines wound on vine shoots and grilled. Alajú, a honey and nut sweet of Moorish origin.'
},

'CLM-consuegra': {
  intro: [
    'Twelve windmills stand in a row along the Cerro Calderico above Consuegra, with a twelfth-century castle in the middle of them. They are sixteenth-century in type, whitewashed with conical roofs, and several still have their machinery. A few are ground on set days for demonstration.',
    'Cervantes almost certainly had the mills at Campo de Criptana in mind rather than these, but Consuegra has the better line and the castle, and it has become the image of La Mancha regardless.',
    'The other local product is saffron. Castilla-La Mancha produces most of Spain’s crop and the harvest is the last week of October and the first of November: the flowers are picked at dawn before they open, and the three red stigmas are pulled out by hand the same day. It takes around a hundred and fifty thousand flowers to make a kilo.'
  ],
  see: [
    { n: 'The mill ridge',
      d: 'Drive or walk up. Sunrise and sunset are when the ridge works; the middle of the day on the bare hill is unkind. Several mills are open and one grinds flour.' },
    { n: 'Consuegra castle',
      d: 'Held by the Knights Hospitaller from 1183. Restored, with a view over the plain that explains why the mills are where they are.' },
    { n: 'The saffron festival', t: 'last weekend of October',
      d: 'Picking demonstrations, the monda where the stigmas are stripped, and a competition. The fields at dawn in that fortnight are purple.' },
    { n: 'The Roman dam',
      d: 'A dam of the first century on the Amarguillo, which failed catastrophically in 1891 and killed several hundred people in the town.' },
    { n: 'Campo de Criptana',
      d: 'Forty minutes east, ten mills, three of them with original sixteenth-century machinery, and the ones Cervantes probably meant.' },
    { n: 'Las Tablas de Daimiel',
      d: 'An hour south, a river wetland national park that has been close to drying out from aquifer extraction and is a case study in Spanish water politics.' }
  ],
  when: 'Late October for the saffron. Spring for green plain. Summer on La Mancha is forty degrees with no shade.',
  stay: 'Half a day.',
  move: 'A car. An hour from Toledo.',
  eat: 'Manchego cheese, pisto manchego, migas, and anything with saffron in it, which here is not a luxury.'
},

'CLM-almagro': {
  intro: [
    'Almagro got rich because the Fuggers, the German banking family, were given the mercury mines at Almadén and the maestrazgo of the Order of Calatrava as security against loans to Charles V. They ran the town from the sixteenth century and built in a northern European style, which is why the Plaza Mayor has green-painted timber galleries on stone columns and looks faintly Flemish.',
    'The Corral de Comedias was built in 1628 as a courtyard theatre and survived because it was closed up and used as an inn. It is the only complete example from the Spanish Golden Age still standing anywhere, with the open yard, the galleries for women, the benches, and the stage with its trapdoors.',
    'That is what the international classical theatre festival in July exists for: Lope de Vega and Calderón performed in the building they were written for, under the sky, in the heat.'
  ],
  see: [
    { n: 'The Corral de Comedias',
      d: 'A short guided visit most days, which is the only way to see the yard empty. Tiny and perfectly preserved.' },
    { n: 'Festival Internacional de Teatro Clásico', t: 'July',
      d: 'Three weeks of Golden Age drama across the town, with the Corral as the centrepiece. Tickets go early.' },
    { n: 'Plaza Mayor',
      d: 'A hundred metres long, enclosed, with two storeys of glazed green galleries on both sides. Unlike any other square in Spain.' },
    { n: 'The lace',
      d: 'Bobbin lace has been made here since the Fugger period and there is a small museum and women still working it in doorways in summer.' },
    { n: 'The Convento de la Asunción de Calatrava',
      d: 'A Renaissance cloister on two levels with Italianate arcading, built by the Order and almost always empty.' },
    { n: 'Berenjenas de Almagro',
      d: 'Small aubergines pickled whole with a stick of fennel through them, protected by designation and sold everywhere. An acquired taste that is worth acquiring.' }
  ],
  when: 'July for the festival, otherwise spring and autumn. Summer on the plain is very hot.',
  stay: 'A night, in the parador which is a converted Franciscan convent with sixteen courtyards.',
  move: 'A car, or train to Ciudad Real and a bus. Two and a half hours from Madrid.',
  eat: 'Pickled aubergines, duelos y quebrantos, which is the eggs and bacon Don Quixote ate on Saturdays, and Valdepeñas wine from down the road.'
},

'CLM-siguenza': {
  intro: [
    'Sigüenza grew around a cathedral that is also a fortress, with crenellations and arrow slits, begun in 1124 when this was frontier country. The west front has two square towers that are military rather than ecclesiastical, and the whole building sits above a steep medieval town on a hill with a castle on top.',
    'Inside is the Doncel: the alabaster tomb of Martín Vázquez de Arce, a young knight killed fighting the Moors at Granada in 1486. Instead of lying in prayer or armour at attention, he is propped on one elbow reading a book, legs crossed, with a faintly amused expression. It is one of the great pieces of Spanish sculpture and it is not what anyone expects from a funerary monument of that date.',
    'The town below is almost untouched: a long sloping plaza, a Romanesque gate, and lanes of stone houses. It is ninety minutes from Madrid and almost nobody goes.'
  ],
  see: [
    { n: 'El Doncel',
      d: 'In the Chapel of Santa Catalina. Small, and you have to look for it. The guided cathedral tour includes it and the sacristy ceiling.' },
    { n: 'The sacristy ceiling',
      d: 'Three hundred and four carved heads in coffered panels, by Covarrubias, no two the same, which took about forty years.' },
    { n: 'The cathedral itself',
      d: 'Romanesque at the base, Gothic above, with a Renaissance cloister. The fortified west front is the thing from outside.' },
    { n: 'The castle',
      d: 'A parador since 1976, built over an Arab alcazaba, which has been bishop’s palace, prison and barracks. Worth a drink in the courtyard.' },
    { n: 'The medieval festival', t: 'July',
      d: 'The town dresses the streets and runs a market, which is done with more conviction here than in most places that attempt it.' },
    { n: 'Atienza and the Black Villages',
      d: 'North of here, a group of hamlets built entirely from black slate in the Sierra de Ayllón, several of them abandoned and partly restored.' }
  ],
  when: 'Spring and autumn. Sigüenza is at a thousand metres and the winters are hard.',
  stay: 'A night.',
  move: 'Train from Madrid Chamartín in about ninety minutes on the slow line.',
  eat: 'Roast kid, migas, and the local honey. The parador does a reasonable version of all three.'
},

'CLM-ruidera': {
  intro: [
    'Fifteen lakes step down a valley over about twenty-five kilometres, each separated from the next by a travertine barrier that the water itself built. Calcium carbonate dissolved out of the limestone precipitates where plants and moss grow in the flow, and the barrier slowly rises, which dams the water above it.',
    'The system is fed by the Guadiana and its underground aquifer, and the water level swings sharply between wet and dry years. In a good year the falls between the lakes are loud and in a bad one several dry up entirely, which is a visible consequence of the groundwater extraction for irrigation on the plain.',
    'The Cueva de Montesinos at the top of the valley is where Don Quixote descends and has a dream, and Cervantes clearly knew the place. The cave is open and shallow and the lakes in the middle of otherwise dry country are still the surprise he describes.'
  ],
  see: [
    { n: 'The lake chain',
      d: 'A road runs the length of it with pull-offs. Laguna Colgada and Laguna del Rey have the best of the falls and the water is a strong green.' },
    { n: 'Swimming',
      d: 'Permitted in several of the lakes, with designated areas and lifeguards in summer. The water is cold and clear.' },
    { n: 'Cueva de Montesinos',
      d: 'At the head of the valley, free and unlit, with a chamber and a small pool. Bring a torch.' },
    { n: 'The travertine barriers',
      d: 'Walk down to one. The living moss on the front of it is what is building the dam, which is the whole explanation of the landscape.' },
    { n: 'Castillo de Rochafrida',
      d: 'A ruined castle on the plateau above, associated with a medieval ballad cycle and standing in complete isolation.' },
    { n: 'Kayaking',
      d: 'Several operators on the larger lakes, which is the only way to get away from the roadside.' }
  ],
  when: 'Late spring for water, summer for swimming. Autumn after rain. In a drought year check before travelling.',
  stay: 'A day, or a night at Ruidera village.',
  move: 'A car. Ninety minutes from Albacete or two and a half hours from Madrid.',
  eat: 'Freshwater crayfish, gazpacho manchego, which is a game stew with flatbread and nothing like Andalusian gazpacho, and Valdepeñas wine.'
},

'CLM-ciudad-encantada': {
  intro: [
    'This is a karst field in pine forest at about fourteen hundred metres, where ninety million year old limestone has been dissolved along its joints into blocks, mushrooms, arches and corridors. The softer layers eroded faster than the harder ones, which is why so many of the forms have narrow stems and wide caps.',
    'It was declared a natural site of national interest in 1929, which makes it one of the earliest protected landscapes in Spain, and a marked circuit of about three kilometres runs through it on made paths.',
    'The names given to the formations are mostly nonsense and some of them require considerable imagination, but one or two are undeniable: the mushrooms are mushrooms and the sea of stone genuinely does look like waves.'
  ],
  see: [
    { n: 'The circuit',
      d: 'Three kilometres, waymarked in one direction, about ninety minutes at a slow walk. Easy going and shaded for most of it.' },
    { n: 'El Tormo Alto',
      d: 'The signature formation: a large block balanced on a narrow neck, which is the one on every photograph of the place.' },
    { n: 'Mar de Piedra',
      d: 'A field of rounded blocks that reads as swell. The best single section.' },
    { n: 'Los Amantes de Teruel',
      d: 'Two leaning pillars touching at the top. The name is borrowed from a completely different province and nobody minds.' },
    { n: 'Ventano del Diablo',
      d: 'Ten minutes away, a natural window in a cliff over the Júcar gorge, free, with a hundred-metre drop.' },
    { n: 'Nacimiento del Río Cuervo',
      d: 'Forty minutes north, a river emerging from a mossy cliff face in a sheet and falling into pools. Boardwalked, and it freezes solid in a hard winter.' }
  ],
  when: 'Spring and autumn. Summer brings crowds and the pine shade helps. In winter it can be snowed in.',
  stay: 'Two hours.',
  move: 'A car, half an hour north of Cuenca. No public transport.',
  eat: 'A restaurant at the entrance. Cuenca is better.'
},

'CLM-alcala-jucar': {
  intro: [
    'The Júcar has cut a gorge about a hundred metres deep through limestone here, and the village is stacked up the inside of a bend in it, with a castle on the spur above and a Roman-founded bridge at the bottom.',
    'The distinctive thing is the cave houses. The rock is soft enough to dig, so for centuries people extended their houses straight back into the cliff, and several run right through the ridge and come out in a balcony on the far side. Two or three are open as small museums and the tunnels are genuinely long.',
    'Cueva del Diablo and Masagó are the ones usually open. Both are private, both are eccentric, and both involve walking a couple of hundred metres through a passage cut by hand to arrive at a hole in a cliff face over the river.'
  ],
  see: [
    { n: 'The cave houses',
      d: 'Cueva del Diablo and Cueva de Masagó. Small entrance fees, odd personal collections inside, and a terrace at the far end over the gorge.' },
    { n: 'The castle',
      d: 'Almohad, twelfth century, with a cylindrical keep and a triangular plan following the rock. Small, cheap and the view is the point.' },
    { n: 'The bridge and the river',
      d: 'A Roman foundation with later arches. Swimming in the Júcar below in summer, which the whole province does.' },
    { n: 'The Júcar gorge road',
      d: 'From Jorquera through Alcalá to Villa de Ves, following the river between cliffs. One of the best drives in the interior.' },
    { n: 'Jorquera',
      d: 'Twenty minutes upstream, a smaller village on an almost complete meander loop with its medieval walls intact.' },
    { n: 'The sunset',
      d: 'West-facing across the gorge, and the village lights come on below you.' }
  ],
  when: 'Spring to autumn. Summer weekends bring swimmers from Albacete and Valencia.',
  stay: 'Half a day, or a night.',
  move: 'A car. An hour from Albacete, ninety minutes from Valencia.',
  eat: 'Gazpacho manchego, atascaburras, which is salt cod with potato and garlic, and the local goat cheese.'
},

'GAL-santiago': {
  intro: [
    'In the early ninth century a hermit followed a light to a field in Galicia and found a tomb, which the local bishop declared to be that of the apostle James. Whether anything of the sort happened is beside the point: within two hundred years it was the third pilgrimage of Christendom after Jerusalem and Rome, and the roads to it shaped the whole of northern Spain.',
    'The cathedral is Romanesque under a Baroque skin. The Pórtico de la Gloria behind the west front, carved by Master Mateo and finished around 1188, is the single greatest piece of Romanesque sculpture in Europe, and a twelve-year cleaning finished in 2018 revealed that it was originally painted in strong colour.',
    'The city around it is granite and arcaded, because it rains here about a hundred and fifty days a year, and the arcades are not decorative. Pilgrims have been arriving wet since the ninth century and the architecture reflects it.'
  ],
  see: [
    { n: 'The Pórtico de la Gloria', t: 'timed ticket, separate',
      d: 'Two hundred figures, with the prophet Daniel smiling, which is close to unique in twelfth-century sculpture. Numbers are capped and it must be booked.' },
    { n: 'The botafumeiro',
      d: 'A fifty-three kilo silver censer swung by eight men on a rope through the transept at up to sixty-eight kilometres an hour. It runs at certain masses and on feast days, and the cathedral publishes the schedule.' },
    { n: 'The Praza do Obradoiro',
      d: 'The cathedral on one side, a parador that was a fifteenth-century pilgrim hospital on another, and the town hall on the third. Pilgrims arrive here and sit on the ground, which is the thing to watch.' },
    { n: 'The pilgrim mass', t: 'daily, noon',
      d: 'The arrivals are read out by country and starting point. You do not need to have walked to attend.' },
    { n: 'The Mercado de Abastos',
      d: 'Granite halls from 1941, the second most visited building in the city, with Galician shellfish and a stall that will cook what you buy.' },
    { n: 'The cathedral roof',
      d: 'A walk over the granite tiles of the roof with the towers above you, on a guided ticket. The best thing most visitors miss.' }
  ],
  when: 'May to September for weather, though it rains year round. The Feast of St James on 25 July is the big day and Holy Years, when it falls on a Sunday, are overwhelming.',
  stay: 'Two nights.',
  move: 'Train from Madrid in about three hours on the new line. Airport twenty minutes out. The old town is compact and pedestrian.',
  eat: 'Pulpo á feira, octopus with paprika and oil on a wooden plate. Empanada. Percebes, goose barnacles, if you can afford them. Albariño and Ribeiro.'
},

'GAL-rias-baixas': {
  intro: [
    'The Galician coast is a drowned landscape. River valleys flooded as sea levels rose after the last glaciation, which produced long deep inlets called rías, and the Rías Baixas are the four southern ones: Muros, Arousa, Pontevedra and Vigo.',
    'The water in them is cold, sheltered and extremely productive, and it is full of bateas: wooden rafts hung with ropes on which mussels grow. There are around three thousand three hundred of them and Galicia produces something close to a quarter of the world’s cultivated mussels.',
    'On the slopes above, Albariño is grown on granite posts and pergolas, high off the ground so the sea air moves through and the grapes dry. The wine is the best white in Spain and it is made to be drunk with what is in the water below it, which is a rare case of a pairing being geographical rather than invented.'
  ],
  see: [
    { n: 'A mussel raft',
      d: 'Catamaran trips from Vilagarcía, O Grove and Cambados go out among the bateas, pull a rope and open mussels on deck with white wine. Called a mejillonera and worth doing.' },
    { n: 'Cambados',
      d: 'The capital of Albariño, with a granite square, a ruined church with no roof, and the Fiesta del Albariño in the first week of August.' },
    { n: 'The Cíes Islands',
      d: 'A national park at the mouth of the Ría de Vigo, with a capped ferry and a beach that is worth its reputation.' },
    { n: 'Combarro',
      d: 'A village of hórreos, granite grain stores on legs, standing on the shore itself with the tide coming in under them.' },
    { n: 'A Guarda and Monte Santa Tegra',
      d: 'A Celtic castro of round stone houses on a hill at the Portuguese border, excavated and partly reconstructed, with the Miño below.' },
    { n: 'Illa de Arousa',
      d: 'Linked by a bridge, with the Carreirón reserve at the southern tip, a salt lagoon and a lot of birds.' }
  ],
  when: 'June to September, which is Galicia’s short summer. Even then it rains. August is busy with Spanish holidaymakers.',
  stay: 'Three nights.',
  move: 'A car. Vigo and Santiago airports. Trains run down the coast between the main towns.',
  eat: 'Mussels, scallops, razor clams, goose barnacles, spider crab. Albariño. This is the best seafood in Europe and the prices are not low.'
},

'GAL-a-coruna': {
  intro: [
    'The Tower of Hercules is a working lighthouse that was built by the Romans in the first or second century and has never stopped operating. The Roman core is inside a neoclassical casing added in 1788, and you can see the original masonry at the base. It is the oldest lighthouse in the world still in use and it was listed by UNESCO in 2009.',
    'The city stands on an isthmus with ocean on both sides, which is why the Atlantic is at the end of almost every street and why the eight-kilometre seafront promenade can run the entire way round the peninsula.',
    'The galerías are the other thing: glazed wooden balconies covering whole facades along the Avenida de la Marina, painted white, which is why A Coruña is called the city of glass. They were a practical answer to the rain and the wind and they produce an entire street that looks like a greenhouse.'
  ],
  see: [
    { n: 'Torre de Hércules',
      d: 'Two hundred and thirty-four steps. Around it is a sculpture park and a rocky headland with the Atlantic on three sides.' },
    { n: 'The galerías',
      d: 'Best seen from the harbour at dusk when the lights go on behind the glass.' },
    { n: 'The Paseo Marítimo',
      d: 'Eight kilometres right round the peninsula, with a working heritage tram on part of it. The longest seafront promenade in Europe.' },
    { n: 'Domus and the science museums',
      d: 'Domus, by Arata Isozaki, is a slate wall curving against the Atlantic, and the Aquarium Finisterrae has a seal pool open to the ocean.' },
    { n: 'Plaza de María Pita',
      d: 'Named for the woman who raised the alarm when Francis Drake attacked in 1589 and, by tradition, killed the English standard-bearer herself.' },
    { n: 'The Costa da Morte',
      d: 'An hour west: Malpica, Camariñas and the cape at Fisterra, on the most dangerous coast in Spain.' }
  ],
  when: 'June to September. A Coruña gets around a thousand millimetres of rain a year, spread through it. San Juan on 23 June fills the beaches with bonfires.',
  stay: 'Two nights.',
  move: 'Train from Madrid in about four hours. Airport fifteen minutes out.',
  eat: 'Seafood from the Atlantic rather than the rías, which is a different and rougher thing. Caldo gallego, pulpo, and the tapas streets of Calle de la Franja and Calle Olmos.'
},

'GAL-finisterre': {
  intro: [
    'The Costa da Morte takes its name from the shipwrecks. Between Malpica and Fisterra the coast is granite, exposed to the full Atlantic, and frequently fogbound; there are cemeteries of the English and of the Germans here, named for specific disasters. The Serpent went down in 1890 with a hundred and seventy-two of a hundred and seventy-five crew.',
    'In 2002 the tanker Prestige broke up offshore and put around sixty thousand tonnes of fuel oil onto this coast and most of the Galician shore. Tens of thousands of volunteers came to clean it by hand and the political fallout was enormous. The beaches recovered; the memory has not.',
    'Fisterra is where the Romans thought the world ended, and many pilgrims walk the extra ninety kilometres from Santiago to get here. The tradition is to burn a piece of clothing at the lighthouse and watch the sun go down into the Atlantic, which is now discouraged for fire reasons and still happens.'
  ],
  see: [
    { n: 'Cabo Fisterra at sunset',
      d: 'The lighthouse, the kilometre zero marker and the bronze boot. Crowded with pilgrims in summer and worth being there anyway.' },
    { n: 'Cabo Vilán',
      d: 'Near Camariñas, with the first electric lighthouse in Spain and a cliff of a hundred and twenty-five metres. The English Cemetery is below it.' },
    { n: 'Praia de Carnota',
      d: 'Seven kilometres of sand with dunes and a marsh behind it, which is the longest beach in Galicia and usually close to empty.' },
    { n: 'Muxía',
      d: 'A sanctuary on the rocks at the water’s edge, struck by lightning and burned in 2013 and rebuilt. The pedra de abalar, a rocking stone, is beside it.' },
    { n: 'Ézaro',
      d: 'The only river in Europe that falls directly into the sea as a waterfall, released from a dam at set times in summer and after rain.' },
    { n: 'The Carnota hórreo',
      d: 'A granite granary thirty-five metres long on twenty-two pairs of legs, built in 1768, which is among the largest in Galicia.' }
  ],
  when: 'June to September. The coast is spectacular in a storm and genuinely dangerous; the waves at Vilán can reach the lighthouse.',
  stay: 'Two nights.',
  move: 'A car. Ninety minutes from Santiago, and the coast road is slow and worth it.',
  eat: 'Percebes, goose barnacles, picked off these rocks at low tide by people on ropes, which is among the most dangerous jobs in Spain. Congrio, and the Costa da Morte sea bass.'
},

'GAL-cies': {
  intro: [
    'Three islands at the mouth of the Ría de Vigo, uninhabited apart from a campsite and a handful of staff, protected as part of the Atlantic Islands national park since 2002. The Romans called them the islands of the gods and Drake used them as a base.',
    'Praia de Rodas is the reason most people come: a kilometre of white sand curving between two of the islands and enclosing a lagoon behind it. The Guardian called it the best beach in the world in 2007 and the island has been managing the consequences since.',
    'The management is why it stays good. A permit must be obtained online before you can buy a ferry ticket, numbers are capped at a few thousand a day, there are no hotels, no cars and no shops beyond one small kiosk. You take your rubbish off with you.'
  ],
  see: [
    { n: 'Praia de Rodas',
      d: 'The sand bar joining Monteagudo and Faro. The water is clear and extremely cold; this is the Atlantic at forty-two degrees north.' },
    { n: 'The lighthouse walk',
      d: 'About an hour up to the Faro da Porta or the main lighthouse, with the cliffs on the ocean side dropping a hundred metres and gulls below you.' },
    { n: 'The gull colony',
      d: 'One of the largest colonies of yellow-legged gull in the world, around twenty thousand pairs. They are aggressive in the nesting season and the paths are routed around them.' },
    { n: 'Lago dos Nenos',
      d: 'The lagoon behind Rodas, shallow and warmer than the sea, which is where children swim.' },
    { n: 'Camping',
      d: 'The only accommodation. Booked separately from the day permit and the only way to be on the island in the evening.' },
    { n: 'The permit',
      d: 'Apply on the Xunta de Galicia site before booking a ferry. No permit, no boarding, and the summer allocation goes quickly.' }
  ],
  when: 'Ferries run from Easter and daily from June to September. Outside that the islands are closed to visitors.',
  stay: 'A day, or a night camping.',
  move: 'Ferry from Vigo, Cangas or Baiona, about forty minutes. Permit first, then ticket.',
  eat: 'One kiosk and one restaurant. Most people bring food, and the rules on taking waste back are enforced.'
},

'GAL-ribeira-sacra': {
  intro: [
    'The Sil joins the Miño here after cutting a canyon up to five hundred metres deep, and the south-facing slopes above it are terraced with vines on gradients that reach seventy per cent. It is called heroic viticulture because everything is carried by hand or by monorail, and in places the harvest still goes out by boat.',
    'The name means sacred riverbank and comes from the density of monasteries: Benedictine and Cistercian houses were founded through these woods from the sixth century onwards, partly because it was remote and partly because the climate at the bottom of the canyon is unexpectedly mild.',
    'The wine is Mencía, light, red-fruited and much closer in weight to Burgundy than to anything in Rioja, grown on slate and granite. It was almost extinct as a commercial proposition in the 1980s and has been one of the most interesting recoveries in Spanish wine since.'
  ],
  see: [
    { n: 'The catamaran on the Sil',
      d: 'From Doade or Santo Estevo, about ninety minutes between the canyon walls looking up at the terraces. The only way to see the slopes from below.' },
    { n: 'Santo Estevo de Ribas de Sil',
      d: 'A monastery with three cloisters of different centuries, now a parador, on a shelf above the canyon.' },
    { n: 'The miradores',
      d: 'A string of viewpoints along the rim. Balcones de Madrid is the most dramatic; Cabezoás and Souto Chao are quieter.' },
    { n: 'Santa Cristina de Ribas de Sil',
      d: 'A small Romanesque monastery in chestnut woods below the road, reached down a steep path, usually empty, and the best of them.' },
    { n: 'The harvest', t: 'late September',
      d: 'Pickers working terraces with baskets, and in places a monorail carrying crates up the slope. Several producers take visitors.' },
    { n: 'Castro Caldelas',
      d: 'A hill town with a castle above the canyon, which makes a good base on the Ourense side.' }
  ],
  when: 'Late September and October for harvest and colour. Spring is green and wet. Summer is hot in the canyon.',
  stay: 'Two nights.',
  move: 'A car. An hour from Ourense. The roads are narrow and steep and the signage is poor.',
  eat: 'Octopus, empanada, and Galician veal. Mencía from Amandi or Chantada, and the Godello whites from the same slopes.'
},

'GAL-lugo': {
  intro: [
    'Lugo has the only complete Roman city wall in the world. Two kilometres and a hundred and seventeen metres, with seventy-one surviving towers, built in the late third century, and it has never been breached by anything except deliberate demolition for gates. UNESCO listed it in 2000.',
    'You can walk the whole circuit on top of it. The walkway is wide, the wall is between ten and fifteen metres high, and it is a public right of way used by residents as a route to work. That ordinariness is the best thing about it.',
    'The town inside is small and the cathedral keeps the Blessed Sacrament permanently exposed, which is a privilege granted by papal bull and which appears on the coat of arms of Galicia. The Romans came for the gold and the hot springs, and the springs are still running on the riverbank below.'
  ],
  see: [
    { n: 'The wall',
      d: 'Two kilometres on top, about forty-five minutes at a walk, with ten access stairs. Free, open all hours, and lit at night.' },
    { n: 'The cathedral',
      d: 'Romanesque with later additions, and the permanently exposed sacrament in a Baroque chapel at the back.' },
    { n: 'The Roman baths',
      d: 'On the Miño, incorporated into a modern spa hotel, with the original vaulted changing rooms and niches visible and free to look at.' },
    { n: 'Casa dos Mosaicos',
      d: 'A Roman domus found under a street, with two mosaic floors and painted wall plaster, shown in situ under the modern building.' },
    { n: 'Tapas on Rúa Nova',
      d: 'Lugo is the other Galician city where tapas come free with the drink, and the standard is high.' },
    { n: 'Arde Lucus', t: 'June',
      d: 'A Roman festival with the whole town in costume, a circus, a market and gladiatorial displays. Around half a million people attend.' }
  ],
  when: 'June to September. Lugo is inland and colder than the coast, with real winters.',
  stay: 'A night.',
  move: 'Train from A Coruña or Ourense. On the Camino Primitivo.',
  eat: 'Free tapas. Also pulpo, Galician beef, which from this province is among the best in Europe, and the Ribeira Sacra wines from the south of the province.'
},

'GAL-as-catedrais': {
  intro: [
    'Praia das Catedrais is a beach of arches and buttresses cut into slate and quartzite cliffs by the Atlantic. At high tide it is unremarkable: a narrow strip under a cliff with the arches in the water. At low tide the sea pulls back several hundred metres and you walk out under thirty-metre vaults into caves and corridors.',
    'The difference between the two states is entire, and there is no partial version. The tide table is not a suggestion and people have been cut off. The access stairs are closed as the water comes in.',
    'Access from Easter to the end of September requires a free permit booked online, with about four thousand nine hundred a day allowed. This was introduced in 2015 after visitor numbers reached a point where the beach was being damaged, and it has worked.'
  ],
  see: [
    { n: 'Low tide',
      d: 'Check the tide table for Ribadeo and aim for the two hours either side of the low. Anything else is a waste of a journey.' },
    { n: 'The arches',
      d: 'Several, up to thirty metres, with pebble floors and sea caves running back into the cliff. The largest is at the western end.' },
    { n: 'The clifftop path',
      d: 'Free and unticketed, running above the beach with views down into the arches, which is the fallback when the permits have gone.' },
    { n: 'The permit', t: 'Easter to 30 September',
      d: 'Booked on the Xunta site up to ninety days ahead and free. Outside that season the beach is open to anybody.' },
    { n: 'Ribadeo',
      d: 'Ten minutes east, with Indiano houses built by returning emigrants and a bridge across the ría to Asturias.' },
    { n: 'Playa de los Castros',
      d: 'Five minutes west, with similar rock formations, no permit, and almost nobody.' }
  ],
  when: 'Any time, governed entirely by the tide. October to Easter has no permit requirement and better light.',
  stay: 'Two hours, timed to the tide.',
  move: 'A car. Ten minutes from Ribadeo on the N-634.',
  eat: 'Ribadeo has good seafood. The beach itself has a car park and a kiosk.'
},

'GAL-combarro': {
  intro: [
    'Combarro is a fishing village on the Ría de Pontevedra where about thirty hórreos stand on the shore itself, raised on granite mushroom legs with the sea coming up underneath them at high tide. Hórreos are grain stores, built off the ground and ventilated to keep rodents and damp out, and there are tens of thousands across Galicia, but nowhere else are they lined up along the waterline like this.',
    'Each one has a cross at one end and a pyramid at the other, which is the standard Galician arrangement and is both practical and apotropaic. The village has been a protected site since 1972.',
    'The old quarter behind is a single lane of granite houses with external stairs and vine-covered balconies, and the cruceiros, stone wayside crosses, are set into the walls at intervals. Three of them are in the main street and are among the oldest in the region.'
  ],
  see: [
    { n: 'The hórreos at high tide',
      d: 'When the water is under them, which is the whole point. Check the tide and come in the evening with the sun going down the ría.' },
    { n: 'Rúa do Mar',
      d: 'The single lane through the old village, with the sea on one side and the houses on the other. Fifteen minutes end to end.' },
    { n: 'The cruceiros',
      d: 'Three in the street, two of them seventeenth century, carved with Christ on one face and the Virgin on the other.' },
    { n: 'Monasterio de Poio',
      d: 'Ten minutes away, with a Baroque cloister, a hórreo thirty-three metres long and a mosaic of the Camino made from millions of pieces.' },
    { n: 'Eating on the water',
      d: 'Several restaurants have terraces over the ría between the hórreos, which is touristy and entirely pleasant.' },
    { n: 'Pontevedra',
      d: 'Fifteen minutes away, a city with no cars in the centre at all and worth a half day.' }
  ],
  when: 'June to September. It is small and it fills on summer weekends; evenings are better.',
  stay: 'Two hours.',
  move: 'A car or a bus from Pontevedra, fifteen minutes.',
  eat: 'Shellfish from the ría, and Albariño from Cambados across the water.'
},

'GAL-ourense': {
  intro: [
    'Hot water comes out of the ground at Ourense at up to sixty-seven degrees, and it has done since before the Romans, who called the place Aquae Urentes, burning waters. There are around seventy springs along a few kilometres of the Miño.',
    'What makes it unusual is that the city has turned them into a public amenity rather than a spa industry. Some are free open-air pools on the riverbank, with no attendant, open at all hours, and locals use them in winter in the rain, which is the correct way to do it.',
    'A small train, the termal, runs along the river between the pools, and the whole thing takes an afternoon. There are also baths in the middle of the city itself: As Burgas, a fountain in a square where the water comes out at sixty-seven degrees and there is a public pool beside it.'
  ],
  see: [
    { n: 'The riverside pools',
      d: 'Muíño da Veiga and A Chavasqueira are the best known. Some are free, some charge a small fee, and the hottest ones require working up to.' },
    { n: 'As Burgas',
      d: 'In the city centre, with Roman remains under glass and a modern pool beside the spring. Free to look at and ticketed to bathe.' },
    { n: 'The Tren Termal',
      d: 'A road train linking the river pools. Cheap and saves a long walk between them.' },
    { n: 'The cathedral',
      d: 'With the Pórtico do Paraíso, a twelfth-century copy of the Santiago portico, restored in 2019 to reveal its original paint.' },
    { n: 'Ponte Romana',
      d: 'A bridge of Roman foundation with a medieval high central arch, and the Ponte do Milenio beside it, a modern bridge with a curving walkway on top.' },
    { n: 'Ribeiro wine',
      d: 'The oldest Galician appellation, upriver, making Treixadura whites that were exported to England in the Middle Ages.' }
  ],
  when: 'Autumn and winter, which sounds wrong and is right: sitting in forty-degree water in the rain is the experience.',
  stay: 'A night.',
  move: 'Train from Santiago or Vigo. The high-speed line to Madrid stops here.',
  eat: 'Galician beef, which this province does best, octopus at Carballiño nearby, and Ribeiro from a white ceramic bowl rather than a glass.'
},

'GAL-cabo-ortegal': {
  intro: [
    'The rock at Cabo Ortegal is not ordinary continental crust. It is a slice of oceanic lithosphere and upper mantle, pushed up and over the continent in a collision around four hundred million years ago, and it includes eclogite and peridotite that formed at depths of seventy kilometres. Geologists come here from everywhere.',
    'What a visitor sees is simpler: a headland of jagged quartzite stacks called Os Tres Aguillóns dropping into the Atlantic, with a lighthouse on the point and gannets working the water below.',
    'A few kilometres east the cliffs at Vixía Herbeira reach about six hundred metres, which puts them among the highest in continental Europe. The road runs along the top and the drop from the viewpoint is immediate and vertical.'
  ],
  see: [
    { n: 'The lighthouse and the stacks',
      d: 'Park and walk out. The three stacks are below you to the north and the water is usually white. Wind here is serious.' },
    { n: 'Vixía Herbeira',
      d: 'Six hundred and twenty metres of cliff with a viewpoint on the top and a wartime lookout post. On a clear day you can see most of the northern Galician coast.' },
    { n: 'Garita de Herbeira and the Serra da Capelada',
      d: 'A moorland plateau above the cliffs with wild horses on it, which are rounded up in the summer rapa das bestas.' },
    { n: 'San Andrés de Teixido',
      d: 'A sanctuary on the cliff with a saying that whoever does not go in life goes after death, as a lizard or a snake. The path up is lined with offerings.' },
    { n: 'Cedeira and Ortigueira',
      d: 'Two small towns either side, with Ortigueira holding a Celtic music festival in July that draws around a hundred thousand people.' },
    { n: 'The geology',
      d: 'A signed geopark route explains the mantle rocks. Even without the terminology, the colours and textures of the rock on the headland are unlike anything else in Spain.' }
  ],
  when: 'June to September. This is the most exposed corner of Galicia and winter here is severe.',
  stay: 'A day.',
  move: 'A car. Two hours north of A Coruña on slow roads.',
  eat: 'Cedeira is known for its goose barnacles. Ortigueira does good fish and the villages are small, so book in summer.'
},

'GAL-pontevedra': {
  intro: [
    'In 1999 a new mayor removed cars from the entire centre of Pontevedra. Not a few streets: about three hundred thousand square metres, with through traffic diverted, parking moved to the edge, and a speed limit of thirty kilometres an hour everywhere else in the city.',
    'The results are documented and striking. Traffic deaths in the urban area fell to zero and stayed there for over a decade, CO2 emissions dropped by around two thirds, and the population of the centre rose while comparable Galician towns were emptying. Planners come from across Europe to look at it.',
    'For a visitor the effect is simply that it is an exceptionally pleasant place to walk around: a granite old town of arcaded squares, with children playing in them unsupervised, which is a thing that has become unusual.'
  ],
  see: [
    { n: 'The old town squares',
      d: 'Praza da Leña, Praza da Verdura and Praza da Ferrería, all arcaded, all pedestrian, all full of tables. Walking between them is the activity.' },
    { n: 'Santa María a Maior',
      d: 'A sixteenth-century church paid for by the sailors’ guild, with a Plateresque west front like an altarpiece turned outward.' },
    { n: 'A Peregrina',
      d: 'A Baroque church built on a scallop-shell plan, which is to say the floor is shaped like the pilgrim badge. On the Camino Portugués.' },
    { n: 'The Museo de Pontevedra',
      d: 'Spread across six buildings including two eighteenth-century houses, with a Spanish gold collection and a reconstruction of the admiral Méndez Núñez’s cabin.' },
    { n: 'The Lérez and the island',
      d: 'A park on the river with a footbridge to Illa das Esculturas, a sculpture park with work by Richard Long and Ian Hamilton Finlay.' },
    { n: 'The Camino Portugués',
      d: 'Pontevedra is a main stage town on the route up from Porto, which is now the second busiest Camino.' }
  ],
  when: 'June to September. The Festa da Peregrina in August is the local week.',
  stay: 'A night.',
  move: 'Train from Vigo or Santiago. The centre is entirely walkable, which is the point.',
  eat: 'Shellfish from the ría, empanada, and a strong tapas culture around Praza da Leña.'
},

'PVA-san-sebastian': {
  intro: [
    'La Concha is a shell-shaped bay almost closed at the mouth by an island, which means the water inside is flat and the beach is a crescent of fine sand in the middle of a city. Queen Isabella II started coming for sea bathing in 1845 and the aristocracy followed, which is why the architecture along the front is belle époque rather than fishing village.',
    'The city burned almost completely in 1813 when British and Portuguese troops sacked it after driving out the French, an episode that is remembered here with some precision. The old town was rebuilt on a grid after that, which is why the pintxos bars are in regular blocks rather than lanes.',
    'The eating is the reason most people come. Basque bars put small composed dishes on the counter and you take what you want and tell the barman at the end, and the convention is one dish and one small glass per bar before moving on. Within half a kilometre there are around a hundred and twenty bars doing it.'
  ],
  see: [
    { n: 'Pintxos in the Parte Vieja',
      d: 'One pintxo, one zurito, next bar. Gandarias, Txepetxa for anchovies, Bar Néstor for a tomato salad and a chuleta that is announced at thirteen hundred and sold out by five past. Ask what is hot from the kitchen rather than taking what is on the bar.' },
    { n: 'Monte Igueldo',
      d: 'A funicular from 1912 to a small amusement park at the western end of the bay. The view of La Concha from here is the postcard and the rickety rides are half the fun.' },
    { n: 'The Peine del Viento',
      d: 'Three steel claws by Eduardo Chillida embedded in the rocks at the end of the bay, with blowholes in the pavement that roar in a swell. Free, and best in rough weather.' },
    { n: 'Monte Urgull',
      d: 'The hill at the other end, with a fortress, a large Christ on top and a path round the base at sea level.' },
    { n: 'La Zurriola and surfing',
      d: 'The ocean-facing beach the other side of the river, with real waves and a young crowd. The bay beach has none.' },
    { n: 'The three-star restaurants',
      d: 'Arzak, Akelarre and Martín Berasategui, all within twenty minutes, which is a density matched almost nowhere. Book months ahead or eat pintxos, which is not a consolation prize.' }
  ],
  when: 'June to September for the beach. September for the film festival. It rains a great deal here: around twelve hundred millimetres a year and spread evenly.',
  stay: 'Three nights.',
  move: 'Train or bus from Bilbao in about ninety minutes. Biarritz airport is forty minutes over the French border.',
  eat: 'Pintxos. Also txuleta, an aged beef chop grilled over coals; kokotxas, hake throats; and txakoli, a sharp slightly fizzy white poured from a height.'
},

'PVA-bilbao': {
  intro: [
    'Bilbao was a shipbuilding and steel city and by 1990 it was in serious trouble: the yards had closed, unemployment was around twenty-five per cent, the river was an open sewer and the city was losing population. The response was a plan that included a metro by Norman Foster, an airport by Calatrava, a cleaned river, and a Guggenheim.',
    'The museum opened in 1997 and within three years had drawn around four million visitors, repaying its construction cost several times over in tax revenue. The term Bilbao effect entered urban planning vocabulary and has since been attempted, usually unsuccessfully, by a hundred other cities.',
    'What gets less attention is that the rest of the plan mattered more. The metro works, the river is swimmable in parts, the old town was restored, and the city has gained population. The museum was the visible part of something broader.'
  ],
  see: [
    { n: 'Guggenheim Bilbao',
      d: 'Worth its own visit and listed separately below. Puppy, the flower-covered terrier by Jeff Koons outside, was meant to be temporary and the city refused to let it go.' },
    { n: 'Casco Viejo',
      d: 'The Siete Calles, the seven original streets, with the Ribera market on the river: one of the largest covered markets in Europe. Pintxos here are cheaper than in San Sebastián.' },
    { n: 'Museo de Bellas Artes',
      d: 'El Greco, Goya, Gauguin and a strong Basque collection. Better than the Guggenheim for painting and a fraction of the visitors.' },
    { n: 'Puente de Vizcaya',
      d: 'A transporter bridge of 1893 at Portugalete, the oldest in the world, carrying a gondola across the estuary on cables. UNESCO listed, and you can walk the upper deck.' },
    { n: 'Azkuna Zentroa',
      d: 'A 1909 wine warehouse converted by Philippe Starck, with forty-three columns all different, and a swimming pool with a glass floor you can look up through.' },
    { n: 'The Athletic Club',
      d: 'San Mamés, and the club’s policy of fielding only Basque players, which it has maintained since 1912 and which makes it one of three clubs never relegated from La Liga.' }
  ],
  when: 'May to September. Bilbao gets around twelve hundred millimetres of rain and the sirimiri, a fine persistent drizzle, is a local institution.',
  stay: 'Two nights.',
  move: 'Airport fifteen minutes out. Train from Madrid is slow; the bus is faster. Excellent metro and tram.',
  eat: 'Bacalao al pil pil, salt cod emulsified in its own gelatine with garlic and oil, which is the signature Bilbao dish. Also txangurro, spider crab, and pintxos in the Casco Viejo and Ledesma.'
},

'PVA-guggenheim': {
  intro: [
    'Frank Gehry designed it using CATIA, aerospace software, because the curves could not be drawn or costed any other way. The skin is thirty-three thousand titanium sheets about half a millimetre thick, which ripple visibly in the wind and change colour completely depending on the light and the weather.',
    'The building sits on a bend of the Nervión on the site of a former shipyard, partly under a road bridge, with a tower on the far side so that the bridge passes through rather than beside it. The scale reads as a ship, which was deliberate.',
    'Inside, the Arcelor Gallery is a hundred and thirty metres long with no columns, built to hold Richard Serra’s The Matter of Time: eight weathering steel structures you walk inside, which disorient reliably and are the single best thing in the museum. Serra made them for this room.'
  ],
  see: [
    { n: 'The Matter of Time',
      d: 'Walk into each one slowly. The torqued ellipses lean in and out as you go and the acoustics change. Allow forty minutes and do not rush it.' },
    { n: 'The building from outside',
      d: 'Walk the full circuit: from the Puente de La Salve, from the far bank, and from the La Salve tower side. It is a different object from each.' },
    { n: 'Puppy',
      d: 'Twelve metres of West Highland terrier in bedding plants, replanted twice a year, which the city adopted permanently after it was meant to leave.' },
    { n: 'Maman',
      d: 'Louise Bourgeois’s nine-metre bronze spider on the riverside terrace, with marble eggs in its abdomen.' },
    { n: 'The atrium',
      d: 'Fifty metres high, lit from above, with the galleries hung off it. The circulation space is the architecture.' },
    { n: 'The Fog Sculpture',
      d: 'By Fujiko Nakaya, which runs on the pond at intervals and swallows the lower part of the building.' }
  ],
  when: 'Year round. Closed Mondays outside July and August. Late afternoon for the titanium, which goes gold.',
  stay: 'Two to three hours.',
  move: 'Metro Moyúa, or the tram along the river. Walkable from the old town in twenty minutes.',
  eat: 'Nerua, the museum restaurant, has a Michelin star. The bistro is more reasonable and good.'
},

'PVA-gaztelugatxe': {
  intro: [
    'A hermitage dedicated to John the Baptist stands on a rock islet joined to the coast by a stone bridge and a path of two hundred and forty-one steps. There has been a building on it since at least the tenth century; the current chapel is largely eighteenth century after repeated destruction by storms, by Francis Drake in 1593, and by fire.',
    'The custom is to ring the bell three times at the top, which is said to bring luck or ward off evil depending on who you ask. Fishermen came here before voyages and the walls inside are hung with ex-votos.',
    'After it appeared as Dragonstone in 2017 the visitor numbers went from manageable to unmanageable within a season. Access is now free but requires a booked timed ticket, capped, and the site closes entirely in bad weather, which on this coast is often.'
  ],
  see: [
    { n: 'The climb',
      d: 'Two hundred and forty-one steps, up and down twice over the ridge of the islet. About forty minutes return from the car park, and the car park is a further kilometre of steep path from the road.' },
    { n: 'The bell',
      d: 'Three rings at the top. The queue for it in summer is the only queue on the island.' },
    { n: 'The booking',
      d: 'Free timed tickets online, released in blocks. Without one you will be turned back at the top of the approach path.' },
    { n: 'The view from the road',
      d: 'The viewpoint at the top of the approach gives the classic image without the climb, and is free and unticketed.' },
    { n: 'Bakio and Bermeo',
      d: 'A surf beach and a working fishing port either side, with Bermeo’s harbour full of boats and a good fishing museum.' },
    { n: 'The Urdaibai reserve',
      d: 'A biosphere reserve round the Oka estuary nearby, with Mundaka’s left-hand river mouth wave, which is one of the best in Europe.' }
  ],
  when: 'May to September. Closed in strong wind or heavy swell, which can be announced on the day. Avoid August weekends.',
  stay: 'Half a day.',
  move: 'A car, forty-five minutes from Bilbao, or the A3518 bus. Parking is limited and fills early.',
  eat: 'Bakio is the centre of txakoli production. Bermeo does excellent grilled fish, and this coast is where the best anchovies in Spain are landed.'
},

'PVA-zumaia': {
  intro: [
    'The cliffs between Zumaia, Deba and Mutriku are flysch: alternating layers of hard and soft marine sediment laid down over about sixty million years, then tilted almost vertical by the Pyrenean collision and planed off by the sea. The result is a rock platform of parallel ridges running out from the shore like the pages of a book seen edge-on.',
    'Because the layers are sequential and continuous, this is one of the most important geological sections in the world. The boundary between the Cretaceous and the Palaeogene, the moment of the asteroid impact that ended the dinosaurs, is visible here as a thin dark line in the rock, and it is marked.',
    'At low tide you walk out onto the platform. At high tide the sea covers it entirely and the cliffs above are the only thing to see, so the tide table determines the whole visit.'
  ],
  see: [
    { n: 'Itzurun beach at low tide',
      d: 'Walk out onto the rock shelf under the cliff. The scale of the layering only works when you are standing on it.' },
    { n: 'The K-Pg boundary',
      d: 'A dark band a few centimetres thick in the cliff near Itzurun, with iridium from the impact. Signed, and worth finding.' },
    { n: 'The boat trip',
      d: 'From Zumaia along the coast to Deba and back, about an hour, which shows the full eight kilometres of flysch from the water.' },
    { n: 'The Algorri path',
      d: 'Along the clifftop west from Zumaia, with the layers below you, and an interpretation centre at the start.' },
    { n: 'San Telmo',
      d: 'A small hermitage on the headland above Itzurun that appeared in Game of Thrones, which has brought a certain amount of extra traffic.' },
    { n: 'Getaria and Zarautz',
      d: 'Ten and fifteen minutes east, for grilled turbot and a long surf beach respectively.' }
  ],
  when: 'Low tide, in any season. Spring and autumn for the light on the rock.',
  stay: 'Half a day.',
  move: 'A car or the Euskotren from San Sebastián, about forty minutes.',
  eat: 'Zumaia has good fish. Getaria down the road is where you actually want to eat.'
},

'PVA-getaria': {
  intro: [
    'Juan Sebastián Elcano was born here around 1486, sailed with Magellan in 1519 as master of the Concepción, took command after Magellan was killed in the Philippines, and brought the Victoria home in 1522 with eighteen survivors of two hundred and seventy. He was the first person to complete a circumnavigation and the town has never let anyone forget it.',
    'The other name is Cristóbal Balenciaga, born here in 1895, the son of a seamstress, who became arguably the most technically accomplished couturier of the twentieth century. Dior called him the master of us all. The museum here holds around twelve hundred pieces.',
    'What most people come for is simpler. The restaurants along the harbour grill whole turbot and sea bass over coals in iron cages on the pavement outside, basted with a vinegar and garlic emulsion, and the smoke fills the street. Elkano has a Michelin star for doing exactly this and nothing else.'
  ],
  see: [
    { n: 'Grilled turbot',
      d: 'Elkano, Kaia Kaipe or Astillero. The fish is shown to you whole, grilled on the street, and served off the bone. Expensive and the best fish cooking in Spain.' },
    { n: 'Cristóbal Balenciaga Museoa',
      d: 'A modern wing attached to a palace, with the dresses shown in rotating exhibitions. Even without an interest in fashion the construction is extraordinary.' },
    { n: 'The Mouse',
      d: 'San Antón, the headland the harbour shelters behind, which from a distance looks like a mouse lying down. A path runs over it.' },
    { n: 'Txakoli',
      d: 'Vines on the slopes behind, trained high, making a sharp low-alcohol white poured from a height to aerate it. Several producers take visitors.' },
    { n: 'San Salvador',
      d: 'A fourteenth-century church with a sloping stone floor and a passage running underneath it, which is the main street of the town.' },
    { n: 'The Elcano statue',
      d: 'And every fourth year, the Elcano festival, where the landing of 1522 is re-enacted.' }
  ],
  when: 'May to October. Book the restaurants weeks ahead in summer.',
  stay: 'Half a day, or a night.',
  move: 'A car or bus from San Sebastián, twenty-five minutes.',
  eat: 'Turbot, sea bass, kokotxas. Txakoli. There is essentially nothing else to do and nothing else is needed.'
},

'PVA-hondarribia': {
  intro: [
    'Hondarribia sits at the mouth of the Bidasoa, which is the border, with Hendaye in France five hundred metres across the water. The walled upper town was a frontier fortress and was besieged repeatedly, most famously in 1638 when it held out against a French army for sixty-nine days.',
    'The upper town is one street of painted houses with heavy wooden balconies and carved eaves, running up to a tenth-century castle that Charles V rebuilt and which is now a parador. The paint on the balconies is traditional and the colours are specific to each house.',
    'Below the walls, La Marina is the fishermen’s quarter: two parallel streets of narrow houses painted in strong colours with flower boxes, which is where the eating is. It is visibly a different town from the one above it, which it was.'
  ],
  see: [
    { n: 'La Marina',
      d: 'Calle San Pedro and Santiago. Pintxos bars one after another, cheaper and less frantic than San Sebastián, and the quality is high.' },
    { n: 'The walled town',
      d: 'Through the Puerta de Santa María, up to the Plaza de Armas and the parador. Twenty minutes and the detail on the eaves is the thing.' },
    { n: 'The castle parador',
      d: 'Charles V’s rebuilding, with a bar in a vaulted hall. Worth a drink even if you are not staying.' },
    { n: 'Cabo Higer',
      d: 'The headland north of town with a lighthouse, looking across to France and down the Basque coast.' },
    { n: 'The ferry to Hendaye',
      d: 'Five minutes across the bay, running most of the day, which makes a French lunch a trivially easy thing to arrange.' },
    { n: 'Jaizkibel',
      d: 'The mountain behind, with a road along the ridge to San Sebastián that is better than the motorway and has a sanctuary on it.' }
  ],
  when: 'June to September. The Alarde on 8 September re-enacts the 1638 siege and is both impressive and locally contentious over whether women may march.',
  stay: 'A night.',
  move: 'A car or bus from San Sebastián, twenty-five minutes. San Sebastián airport is actually in Hondarribia.',
  eat: 'Pintxos in La Marina. Grilled fish, and the restaurants here are noticeably cheaper than along the coast.'
},

'PVA-vitoria': {
  intro: [
    'Vitoria-Gasteiz is the capital of the Basque Country, which surprises people who assume it is Bilbao. It is also the quietest of the three Basque capitals and the only one not on the coast.',
    'The medieval core is an almond shape on a low hill, laid out in concentric streets named for the trades that worked them: Cuchillería for knife-makers, Zapatería for cobblers, Correría for leather. The plan is almost unchanged from the twelfth century.',
    'The city won the European Green Capital award in 2012 for its ring of parks, the anillo verde, which is a continuous green belt of around six hundred hectares right round the built-up area, built partly on reclaimed industrial land and partly on restored wetland at Salburua, which now has deer in it within the city limits.'
  ],
  see: [
    { n: 'Santa María cathedral',
      d: 'Open as a working building site since 1994, visited in a hard hat on a route through the foundations, the triforium and the crypt. Ken Follett used it as a model and wrote a novel about it. One of the best cathedral visits in Europe.' },
    { n: 'The medieval almond',
      d: 'The concentric trade streets, with covered stairways and lifts linking the levels because the hill is steeper than it looks.' },
    { n: 'Salburua',
      d: 'Restored wetland inside the green belt, with hides, deer and a serious bird list, reachable on foot from the centre.' },
    { n: 'Artium',
      d: 'A contemporary Basque art museum, largely underground, with Chillida, Oteiza and Tàpies.' },
    { n: 'The murals',
      d: 'A route of large community-painted walls through the old town, each designed with the residents of the building it is on.' },
    { n: 'La Blanca', t: '4 to 9 August',
      d: 'The city festival, opened by the lowering of Celedón, a figure with an umbrella, down a wire into the square.' }
  ],
  when: 'May to September. Vitoria is at five hundred and twenty metres and the winters are cold and foggy.',
  stay: 'A night.',
  move: 'Train or bus from Bilbao in under an hour. Flat and walkable with an excellent tram.',
  eat: 'Pintxos on Cuchillería. Perretxikos, the spring mushroom, which the province is obsessive about. Rioja Alavesa wine from twenty minutes south.'
},

'PVA-rioja-alavesa': {
  intro: [
    'Rioja Alavesa is the Basque portion of the Rioja appellation: about three hundred square kilometres on the north bank of the Ebro, under the limestone wall of the Sierra de Cantabria, which shelters it from the Atlantic weather. The soil is chalky clay and the wines tend to be lighter and more perfumed than those from Rioja Alta.',
    'Laguardia sits on a hill in the middle of it, walled, with no vehicles inside, and underneath almost every house there is a cellar dug in the fourteenth or fifteenth century. There are around three hundred of them on several levels, some still used, and the town has a hollow sound.',
    'Two of them have architecture that got out of hand. Marqués de Riscal commissioned Frank Gehry to build a hotel in 2006, in titanium ribbons of pink, gold and silver over an 1858 cellar. Ysios, by Santiago Calatrava, has a wave-shaped aluminium roof echoing the sierra behind it.'
  ],
  see: [
    { n: 'Laguardia',
      d: 'Walled, pedestrian, with Santa María de los Reyes holding a polychrome Gothic doorway from the fourteenth century with its original paint, protected inside a porch. Among the best in Spain.' },
    { n: 'The underground cellars',
      d: 'Several in Laguardia are open for tastings. Cold, damp, reached down steep stairs, and entirely different from a modern winery visit.' },
    { n: 'Marqués de Riscal',
      d: 'The Gehry building, with tours of the cellar including bottles going back to 1862. The hotel is extremely expensive and the restaurant is open to non-residents.' },
    { n: 'Ysios',
      d: 'Calatrava’s wave roof against the sierra, best photographed from the approach road. Tours by appointment.' },
    { n: 'La Hoya and the dolmens',
      d: 'An Iron Age settlement excavated and open, plus several megalithic tombs along the Sierra de Cantabria.' },
    { n: 'The sierra walk',
      d: 'Up to the Balcón de la Rioja for the whole appellation laid out below, with the Ebro and the vineyards.' }
  ],
  when: 'September and October for harvest. Spring for the sierra. Summer is hot on the Ebro.',
  stay: 'Two nights.',
  move: 'A car. Forty minutes from Vitoria, an hour from Bilbao, twenty minutes from Logroño.',
  eat: 'Lamb chops grilled over vine cuttings, patatas a la riojana, and the wine, which here is the food too.'
},

'AST-picos-covadonga': {
  intro: [
    'The Picos de Europa are limestone and they rise to 2,648 metres at Torre de Cerredo, only about twenty kilometres from the Bay of Biscay. That closeness is the whole character of the range: the sea is visible from the summits, the weather comes in off the Atlantic without warning, and the rock is cut by gorges rather than valleys.',
    'They were the first national park in Spain, declared in 1918 on the fourteenth centenary of the battle of Covadonga, where in 722 a Visigothic noble named Pelayo defeated a Muslim force in the Deva valley. That engagement, probably a skirmish, is conventionally treated as the start of the Reconquista and the origin of the Asturian and then Spanish monarchy.',
    'Covadonga itself is a cave with a chapel in it, a waterfall under the cave, and a neo-Romanesque basilica in pink limestone above. Twelve kilometres further up a hairpin road are two glacial lakes, Enol and Ercina, which in summer can only be reached by shuttle bus.'
  ],
  see: [
    { n: 'The Covadonga lakes',
      d: 'Capped and shuttled from July to September and at Easter. The Ruta de los Lagos, a five-kilometre loop between them, gets you away from the car park within ten minutes.' },
    { n: 'The Cares gorge',
      d: 'Twelve kilometres each way between Caín and Poncebos on a path cut into the cliff in the 1940s for a hydroelectric channel, two hundred metres above the river. The best day walk in Spain and genuinely exposed in places.' },
    { n: 'Fuente Dé cable car',
      d: 'On the Cantabrian side, seven hundred and fifty-three metres in under four minutes, which puts you straight into the high limestone.' },
    { n: 'The Santa Cueva',
      d: 'Pelayo’s cave with his tomb and a waterfall below it. Busy on 8 September, the Asturian national day.' },
    { n: 'Naranjo de Bulnes',
      d: 'A five-hundred-metre limestone tower, first climbed in 1904, which is the emblem of Asturian mountaineering. Visible from Pozo de la Oración; reaching the base is a long day.' },
    { n: 'Bulnes',
      d: 'A village of around thirty people with no road, reached by a funicular cut inside the mountain in 2001 or by a two-hour walk up the Tejo gorge.' }
  ],
  when: 'June to September for the high ground. The weather changes fast at any time of year and the Cares path is exposed; check before going.',
  stay: 'Three nights.',
  move: 'A car. Cangas de Onís and Arenas de Cabrales are the Asturian bases, Potes the Cantabrian one.',
  eat: 'Cabrales, a blue cheese matured in limestone caves in the range, which is extremely strong. Fabada, cachopo, and cider poured from above the head.'
},

'AST-oviedo': {
  intro: [
    'Between about 790 and 910 the small Asturian kingdom was the only Christian state left in the peninsula, and its kings built a handful of churches outside Oviedo that belong to no other style. They are called pre-Romanesque or Asturian, they use barrel vaults and buttresses two centuries before anyone else in Europe, and they have latticed windows carved from single slabs of stone.',
    'Santa María del Naranco was a palace, probably a royal hall, converted into a church later. It is two floors with open loggias at both ends and belt-course medallions, and it was built around 848. There is nothing else like it anywhere.',
    'The city below is prosperous, extremely clean, and full of statues: around a hundred of them in the streets, including a bronze Woody Allen with his glasses, put up after he called Oviedo a delicious, exotic, beautiful, clean, pleasant, tranquil and pedestrianised city in a speech.'
  ],
  see: [
    { n: 'Santa María del Naranco and San Miguel de Lillo',
      d: 'Three kilometres up the hill, two hundred metres apart, both ninth century, both UNESCO listed. Guided entry at set times and the walk up from the city takes about forty minutes.' },
    { n: 'The Cámara Santa',
      d: 'In the cathedral, a ninth-century chapel holding the Cross of the Angels, the Cross of Victory and the Agate Box, which are the most important goldsmiths’ work to survive from the period in Spain.' },
    { n: 'The cathedral',
      d: 'Gothic with a single asymmetric tower, built over the Asturian royal church, with the royal pantheon of the Asturian kings inside.' },
    { n: 'The sidrerías',
      d: 'Calle Gascona, which is a single street of cider houses. The pour, from above the head into a glass held at the hip, aerates the cider and must be drunk immediately.' },
    { n: 'Mercado El Fontán',
      d: 'A nineteenth-century iron market in an arcaded square, with a Sunday flea market around it.' },
    { n: 'San Julián de los Prados',
      d: 'The largest surviving pre-Romanesque church, with wall paintings covering the interior in an architectural trompe l’oeil that is unlike anything else in the period.' }
  ],
  when: 'May to September. Asturias is green because it rains; around a thousand millimetres a year.',
  stay: 'Two nights.',
  move: 'Train from Madrid in about three and a half hours on the new line. Asturias airport is forty minutes.',
  eat: 'Fabada asturiana, a bean stew with chorizo, morcilla and pork. Cachopo, two veal escalopes with ham and cheese between them, which is enormous. Cabrales. Cider, by the bottle, poured for you.'
},

'AST-cudillero': {
  intro: [
    'Cudillero is built in an amphitheatre of cliff around a harbour so small that the houses had nowhere to go but up. They are painted in strong colours, stacked in tiers, and the lanes between them are mostly stairs.',
    'The local people are called pixuetos and until recently spoke pixueto, a dialect distinct enough from Asturian that neighbouring villages found it hard to follow. A handful of elderly speakers remain.',
    'L’Amuravela is held on 29 June: a fisherman reads a rhyming satirical account of the year’s events from a boat, in pixueto, mocking local and national figures. It has run since at least the seventeenth century and almost nobody outside the village understands a word of it.'
  ],
  see: [
    { n: 'The harbour amphitheatre',
      d: 'Sit on the quay and look up. That is the postcard and it is best in the evening when the lights come on in tiers.' },
    { n: 'The miradores',
      d: 'La Garita and El Pico give the village from above. Both are short steep climbs from the square.' },
    { n: 'Playa del Silencio',
      d: 'Fifteen minutes west, a curve of white shingle under a cliff reached down a steep path, with rock stacks offshore. Among the best beaches on the Cantabrian coast.' },
    { n: 'Cabo Vidio',
      d: 'A lighthouse on a headland with a view along the whole coast, and a sea cave below.' },
    { n: 'L’Amuravela', t: '29 June',
      d: 'The satirical reading from a boat. Incomprehensible and worth being there for.' },
    { n: 'The Ruta de los Miradores',
      d: 'A coastal path linking the headlands either side, on cliffs the whole way.' }
  ],
  when: 'June to September. The village is small and fills on summer weekends.',
  stay: 'A night.',
  move: 'A car, or train from Oviedo in about an hour. Parking is at the top; the village is a walk down and a climb back.',
  eat: 'Fish and shellfish straight off the boats in the harbour. Cider. The restaurants on the quay are tourist-facing and still good.'
},

'AST-somiedo': {
  intro: [
    'Somiedo is a natural park of about three hundred square kilometres in the Cantabrian range, and it is the single best place in western Europe to see a wild brown bear. The Cantabrian population fell to around seventy animals in the 1990s and is now estimated at over three hundred and fifty, which is one of the better conservation stories on the continent.',
    'The bears are watched rather than approached. Guides set up telescopes at dawn and dusk on opposite hillsides and look across the valley, and sightings in spring are common. The animals are smaller than their Scandinavian relatives and almost entirely vegetarian in practice.',
    'The other thing here is the teitos: thatched stone huts with broom roofs, used by the vaqueiros de alzada, a transhumant herding community who moved with their cattle between winter and summer pasture and who were socially excluded for centuries. Hundreds of the huts survive around the high lakes.'
  ],
  see: [
    { n: 'Bear watching', t: 'spring and autumn, dawn and dusk',
      d: 'Several licensed guides work the Valle del Lago and Pola de Somiedo area. Bring patience; a telescope is essential and the guides have them.' },
    { n: 'Lago del Valle',
      d: 'The largest glacial lake in the Cantabrian range, about an hour’s walk up from the village, surrounded by teitos.' },
    { n: 'The teitos',
      d: 'Several restored and one or two open. The broom thatch has to be renewed every decade or so and the technique is nearly lost.' },
    { n: 'Lagos de Saliencia',
      d: 'Four lakes at around seventeen hundred metres, reached from the Alto de la Farrapona, which is a road pass used by the Vuelta.' },
    { n: 'The vaqueiro villages',
      d: 'Braña de Mumián and La Pornacal, high settlements of huts used only in summer, reached on foot.' },
    { n: 'Wolves and chamois',
      d: 'Both present in numbers. Wolf sightings are rare; chamois are easy on the high ground.' }
  ],
  when: 'April to June for bears and flowers, September and October for the rut and the colour. Winter closes the high passes.',
  stay: 'Two nights in Pola de Somiedo.',
  move: 'A car. An hour and a half from Oviedo on mountain roads.',
  eat: 'Mountain cooking: pote asturiano, cured meats, and cheeses from the valleys. Several of the small Asturian blues come from here.'
},

'AST-llanes': {
  intro: [
    'Llanes was a whaling and fishing port and still has a working fleet. The old town has stretches of thirteenth-century wall, an indiano quarter of houses built by emigrants who made money in Cuba and Mexico, and a basilica with a Gothic interior.',
    'On the breakwater, the Basque artist Agustín Ibarrola painted the concrete blocks in 2001 in strong geometric colour. The piece is called Cubos de la Memoria and it covers several hundred tonnes of defensive riprap, which is an unusual canvas and entirely successful.',
    'The coast either side is the best in Asturias: small beaches between limestone headlands, and inland of them the bufones, blowholes in the clifftop meadow where the sea forces air and water up through tubes in the rock. In a big northwesterly swell they go up twenty metres with a roar you hear from a long way off.'
  ],
  see: [
    { n: 'Cubos de la Memoria',
      d: 'Ibarrola’s painted blocks on the harbour wall. Free, open and repainted periodically.' },
    { n: 'The bufones',
      d: 'At Pría and Arenillas, in fields above the cliffs, signed and fenced. They only perform in a serious swell, usually autumn and winter.' },
    { n: 'Playa de Gulpiyuri',
      d: 'An inland beach: a collapsed cave with sand at the bottom, connected to the sea by a tunnel, so there are waves in a meadow a hundred metres from the coast.' },
    { n: 'Playa de Ballota and Torimbia',
      d: 'Two of the best beaches in northern Spain. Torimbia is naturist, reached down a steep path, and unbuilt.' },
    { n: 'The indiano houses',
      d: 'Villas in Caribbean colours with palm trees in the gardens, which the returning emigrants planted as a sign of where their money came from.' },
    { n: 'The Camino del Norte',
      d: 'The coastal pilgrim route passes through, which is quieter and harder than the Francés and runs along this coast for days.' }
  ],
  when: 'June to September for the beaches, autumn and winter for the bufones. August is busy with Spanish families.',
  stay: 'Two nights.',
  move: 'A car. Train from Oviedo on the narrow-gauge line, slow and scenic.',
  eat: 'Fish, cider, and the local cheeses. The Fiesta de San Roque in August involves a dance performed by men in a circle with a ritual that predates any obvious explanation.'
},

'AST-cangas-onis': {
  intro: [
    'Cangas de Onís was the first capital of the kingdom of Asturias, from 718 to 774, which makes it arguably the first capital of what became Spain. Pelayo established himself here after Covadonga and the kingdom later moved to Oviedo.',
    'The bridge over the Sella is called the Roman bridge and is actually fourteenth century, with a high pointed central arch and a replica of the Cross of Victory hanging from it. It is the image of the town and it is almost always photographed from the downstream bank.',
    'The town is the main western gateway to the Picos, and in summer it fills with people on their way to Covadonga and the lakes. In August it is also the finish of the Descenso del Sella, a canoe race from Arriondas that draws over a thousand boats and a very large party.'
  ],
  see: [
    { n: 'The bridge',
      d: 'Walk over it and then look back from the river path. Lit at night.' },
    { n: 'Capilla de Santa Cruz',
      d: 'Built in 737 over a Neolithic dolmen, destroyed in the civil war and rebuilt, with the dolmen chamber visible underneath.' },
    { n: 'Descenso del Sella', t: 'first Saturday after 2 August',
      d: 'Fifteen kilometres of river, over a thousand canoes, and a train running alongside full of spectators. Chaos, and a public holiday in the area.' },
    { n: 'Canoeing the Sella',
      d: 'Available all summer from Arriondas, with operators providing everything. Easy water and a good half day.' },
    { n: 'Covadonga and the lakes',
      d: 'Fifteen minutes away, and this is the usual base for them.' },
    { n: 'The Sunday market',
      d: 'Cheese, cider and livestock, which is a working market rather than a tourist one.' }
  ],
  when: 'June to September. The first week of August for the Sella descent, with accommodation booked long ahead.',
  stay: 'Two nights as a Picos base.',
  move: 'A car. An hour from Oviedo, forty minutes from Llanes.',
  eat: 'Cabrales and Gamoneu, the two great Asturian blues, both made within twenty minutes. Fabada, and cider.'
},

'AST-ribadesella': {
  intro: [
    'The cave at Tito Bustillo was found in 1968 by a group of young cavers, one of whom died in an accident a few months later and after whom it is named. Inside are paintings and engravings dating from roughly thirty-three thousand to ten thousand years ago, including a panel of horses and reindeer in red and black that is among the finest Palaeolithic art in Europe.',
    'Numbers are strictly capped: a few hundred a day in season, in small groups, and it closes for several months each year to let the cave recover. Tickets must be booked and they go.',
    'The town itself sits at the mouth of the Sella with a beach of fine sand backed by indiano villas, and it is the finish of the canoe descent in August. There are also dinosaur footprints in the rock at several points along this coast, which has its own interpretation centre at Colunga.'
  ],
  see: [
    { n: 'Tito Bustillo', t: 'booked, March to October',
      d: 'The main panel with the horses. Groups are small and the guides are serious. Book well ahead; it sells out in summer.' },
    { n: 'The Centro de Arte Rupestre',
      d: 'Beside the cave, with reproductions and context, open year round for those who cannot get a cave ticket.' },
    { n: 'The Sella descent finish', t: 'early August',
      d: 'The canoes arrive here and the town does not sleep.' },
    { n: 'The dinosaur footprints',
      d: 'At several points on the cliffs between Ribadesella and Colunga, with the Jurassic museum at Colunga explaining them.' },
    { n: 'Playa de Santa Marina',
      d: 'The town beach, with a long promenade and the indiano villas behind it.' },
    { n: 'Mirador de la Guía',
      d: 'On the headland above the river mouth, with the beach, the town and the Picos behind on a clear day.' }
  ],
  when: 'The cave is open roughly March to October and closed in winter. The town is busiest in August.',
  stay: 'A night.',
  move: 'A car or the narrow-gauge train from Oviedo.',
  eat: 'Fish, cider, and arroz con pitu, rice with free-range chicken, which is an Asturian inland dish that travels well to the coast.'
},

'AST-gijon': {
  intro: [
    'Gijón is the largest city in Asturias and an industrial port, which is not the usual selling point, and it is better than that makes it sound. The old quarter, Cimavilla, sits on a headland between two bays with a working fishing community still in it and a Roman bath complex underneath.',
    'On the top of the headland, Chillida’s Elogio del Horizonte is a ten-metre concrete arc open to the sea, built in 1990, which funnels the sound of the waves so that standing underneath it you hear the Bay of Biscay amplified. It is the city’s emblem and it works.',
    'The other thing is cider. Asturias produces around eighty per cent of Spanish cider and drinks most of it, and Gijón has more sidrerías than anywhere. The pour is non-negotiable: bottle held high, glass held low, a finger of cider at a time, drunk in one go, the last drop thrown on the floor to rinse the glass.'
  ],
  see: [
    { n: 'Elogio del Horizonte',
      d: 'On Santa Catalina hill. Stand in the middle of it. Free, open and always windy.' },
    { n: 'Cimavilla',
      d: 'The old fishermen’s quarter on the headland, with cider houses, the Roman baths under the square and a beach on either side.' },
    { n: 'The Roman baths',
      d: 'First century, under the Campo Valdés, excavated and shown in situ with the hypocaust intact.' },
    { n: 'Playa de San Lorenzo',
      d: 'A city beach over a kilometre long with a promenade, which fills completely in August.' },
    { n: 'The Laboral',
      d: 'An enormous Francoist orphanage and trade school finished in 1956, now an arts centre, with the tallest tower in Asturias and an architecture that is best described as megalomaniac.' },
    { n: 'The Jardín Botánico Atlántico',
      d: 'Including the Carbayera del Tragamón, a stand of oaks several hundred years old inside the city.' }
  ],
  when: 'June to September. Semana Negra in July is a crime fiction festival that has become a city-wide fairground.',
  stay: 'A night.',
  move: 'Train from Oviedo in thirty minutes. The airport is between the two cities.',
  eat: 'Cider, poured properly. Fabada, and the Gijón speciality of cachopo. The sidrerías around Cimavilla are the place.'
},

'CNR-teide': {
  intro: [
    'Teide is 3,715 metres above sea level and about 7,500 above the ocean floor it stands on, which makes it the third highest volcanic structure on earth after Mauna Kea and Mauna Loa. It sits inside a caldera sixteen kilometres across at two thousand metres, which is itself the floor of the national park.',
    'The caldera is the surprise. Expecting a mountain, you drive up through pine forest, come out above the cloud, and find yourself on a plain of obsidian, pumice and lava in reds, yellows and black, with the cone at one end. The Americans tested Mars rovers here and it is used as a Mars analogue regularly.',
    'The cable car takes you to 3,555 metres. The last hundred and sixty-three vertical metres to the crater rim require a free permit obtained well in advance, capped at two hundred people a day, and the queue for those permits online is competitive. Without one you can still walk two lateral trails from the top station.'
  ],
  see: [
    { n: 'The summit', t: 'free permit, capped at 200 a day',
      d: 'Book months ahead on the national park site. Alternatively, walk from Montaña Blanca and stay the night at the Altavista refuge, which exempts you from the permit if you summit before nine in the morning.' },
    { n: 'The cable car',
      d: 'Eight minutes to 3,555 metres, where the air is thin enough to notice. Closed in high wind, which is frequent, and tickets should be booked.' },
    { n: 'Roques de García',
      d: 'A ring walk of about three and a half kilometres round a line of eroded dykes, including the Roque Cinchado, which was on the old thousand peseta note. The best short walk in the park.' },
    { n: 'The night sky',
      d: 'A Starlight reserve with legally protected darkness. The Teide Observatory on the rim is one of the major solar observatories in the world and runs evening visits.' },
    { n: 'The Teide violet',
      d: 'A plant that grows at over three thousand metres and nowhere else, flowering around May and June, which Humboldt collected.' },
    { n: 'The shadow',
      d: 'At sunrise and sunset the cone throws a perfect triangular shadow, sometimes onto the clouds and sometimes out over the ocean towards Gran Canaria.' }
  ],
  when: 'Year round. Snow closes the road a few days a year. The cable car shuts in wind. Nights at the top are below freezing even in August.',
  stay: 'A full day, or a night at the refuge.',
  move: 'A car. Ninety minutes from either Santa Cruz or the south. Buses 342 and 348 run daily.',
  eat: 'The parador in the caldera is the only real option inside the park. Carry water; the air is extremely dry and the altitude dehydrates you.'
},

'CNR-lanzarote': {
  intro: [
    'Between 1730 and 1736 the ground opened along a line in the middle of Lanzarote and erupted continuously for six years, burying around a quarter of the island including its most fertile land and eleven villages. A priest at Yaiza kept a diary of it which is the best contemporary account of a long eruption anywhere.',
    'What it left is Timanfaya: a field of cones and lava in reds, blacks and ochres where almost nothing grows, and where the ground a few metres down is still at around six hundred degrees. The restaurant at the visitor centre grills meat over a hole in the ground using geothermal heat.',
    'César Manrique, born here in 1919, spent his life making sure the island was not ruined. He persuaded the authorities to ban billboards, limit buildings to two storeys outside the capital, and paint everything white with green or blue woodwork. He designed the major visitor sites himself. He died in a car accident in 1992 and the island has largely held the line since.'
  ],
  see: [
    { n: 'Timanfaya',
      d: 'Access is by coach only on the Ruta de los Volcanes, a fourteen-kilometre circuit, with no walking allowed off it. The geothermal demonstrations at El Diablo involve dropping brush into a pit and watching it ignite.' },
    { n: 'Jameos del Agua',
      d: 'Manrique’s best work: a collapsed lava tube turned into an auditorium, a pool and a restaurant, with a saltwater lake holding a blind white crab found nowhere else on earth.' },
    { n: 'La Geria',
      d: 'Vines grown singly in pits dug into the ash with semicircular stone walls round each one to break the wind. The landscape is unlike any other wine region and the Malvasía is good.' },
    { n: 'Mirador del Río',
      d: 'A viewpoint cut into the cliff four hundred and seventy-five metres above the strait, invisible from outside, looking across to La Graciosa.' },
    { n: 'Cueva de los Verdes',
      d: 'A lava tube used as a refuge from pirate raids, with a lighting scheme and an acoustic trick at the end that is worth not spoiling.' },
    { n: 'La Graciosa',
      d: 'A twenty-five minute ferry to an island with sand streets, no tarmac and about seven hundred people.' }
  ],
  when: 'Year round. The Canaries sit at twenty-nine degrees north and the temperature varies by about eight degrees across the year.',
  stay: 'Four nights.',
  move: 'A car is necessary. The airport is central and flights come from across Europe.',
  eat: 'Papas arrugadas with mojo, potatoes boiled in heavily salted water. Goat cheese. La Geria wine, and the fish from the north coast.'
},

'CNR-la-palma': {
  intro: [
    'La Palma is the steepest island in the world for its size: seven hundred and eight square kilometres rising to 2,426 metres, which is a gradient nothing else matches. The northern half is dominated by the Caldera de Taburiente, an erosion caldera eight kilometres across and up to fifteen hundred metres deep.',
    'The ridge along the top carries the Roque de los Muchachos observatory, one of the two most important optical astronomy sites in the northern hemisphere. The sky is protected by a 1988 law controlling lighting, air traffic and even radio interference across the whole island, which was the first such law anywhere.',
    'In September 2021 a fissure opened on the Cumbre Vieja and erupted for eighty-five days, destroying around three thousand buildings and burying parts of several villages under lava up to seventy metres deep. The flow field is now a visitable and raw part of the island, and the displaced have not all been rehoused.'
  ],
  see: [
    { n: 'Roque de los Muchachos',
      d: 'The observatory ridge at 2,426 metres, above the cloud, with the Gran Telescopio Canarias, which has a 10.4 metre mirror. Daytime tours and night-sky sessions, both booked.' },
    { n: 'Caldera de Taburiente',
      d: 'The Los Brecitos to Barranco de las Angustias walk, about fifteen kilometres downhill through the caldera with a taxi up to the start. The best walk in the Canaries.' },
    { n: 'The 2021 lava field',
      d: 'Around Todoque and La Laguna, with viewpoints and signed access. Sobering, and the island asks that visitors treat it as a disaster site rather than an attraction.' },
    { n: 'Los Tilos',
      d: 'Laurisilva forest in the northeast, a biosphere reserve, with walks through tunnels that were dug for water channels. Bring a torch and expect to get wet.' },
    { n: 'The Ruta de los Volcanes',
      d: 'Along the Cumbre Vieja ridge from El Pilar to Fuencaliente, about seventeen kilometres, with cones either side and the sea on both horizons.' },
    { n: 'Santa Cruz de la Palma',
      d: 'The capital, with wooden balconies on the seafront and a Renaissance town hall, and a model ship permanently installed in a square.' }
  ],
  when: 'Year round. The north is wet and green, the south dry. Winter nights at the observatory are cold and the road can close for ice.',
  stay: 'Five nights.',
  move: 'Flights from Tenerife and Madrid, and a ferry. A car is essential and the roads are steep and bendy.',
  eat: 'Almond pastries, goat cheese, and Malvasía from Fuencaliente, grown on black ash in the south.'
},

'CNR-gomera': {
  intro: [
    'Garajonay National Park covers about a tenth of La Gomera and holds the best surviving laurisilva in the world: a subtropical cloud forest that covered much of southern Europe and north Africa before the ice ages and now exists only on a handful of Atlantic islands.',
    'It survives because of the trade winds. Moist air hits the island, rises, condenses on the ridge and drips off the leaves, which produces a horizontal rain that waters the forest without a single cloudburst. The trees are moss-covered, the light is green and it is often raining under a clear sky.',
    'The island also has Silbo Gomero, a whistled register of Spanish developed to carry across the ravines, audible for several kilometres. It nearly died out and has been taught in every school on the island since 1999. UNESCO listed it in 2009 and demonstrations are given in restaurants, which sounds like a gimmick and is how a language stays alive.'
  ],
  see: [
    { n: 'El Cedro and the laurisilva',
      d: 'Walk from the Laguna Grande or El Cedro into the forest. Moss, fern, tree heath and a permanent drip. Unlike any other European woodland.' },
    { n: 'Alto de Garajonay',
      d: 'The summit at 1,487 metres, a twenty-minute walk from the road, with the whole island and Teide across the water on a clear day.' },
    { n: 'Silbo Gomero',
      d: 'Demonstrated at several restaurants and at the Juego de Bolas visitor centre. Ask what is being said; the answer is usually mundane and that is the point.' },
    { n: 'Valle Gran Rey',
      d: 'A terraced valley on the west coast with palms, a black beach and a long-standing alternative community going back to the 1970s.' },
    { n: 'Los Órganos',
      d: 'A cliff of basalt columns like organ pipes, eighty metres high, visible only from the sea on a boat trip from Valle Gran Rey.' },
    { n: 'The terraces',
      d: 'The whole island is terraced, much of it abandoned, which is a visible record of an agricultural economy that collapsed with emigration.' }
  ],
  when: 'Year round. The forest is wettest and best from November to March. Ferries can be cancelled in swell.',
  stay: 'Three nights.',
  move: 'Ferry from Los Cristianos on Tenerife, about fifty minutes. A car, and the roads are a series of hairpins.',
  eat: 'Almogrote, a hard cheese and pepper paste eaten on bread, which is specific to this island. Palm honey, which is sap rather than honey. Watercress soup.'
},

'CNR-gran-canaria': {
  intro: [
    'Gran Canaria is round, about fifty kilometres across, and rises to 1,949 metres at the Pico de las Nieves in the middle. Because the trade winds hit the north, that side is green and terraced and the south is near-desert, which is why the resorts are in the south and almost nobody who goes there sees the rest.',
    'The interior is the reason to come. Roque Nublo, an eighty-metre monolith on a plateau at eighteen hundred metres, was sacred to the Canarii before the Castilian conquest of 1483, and there are caves with painted interiors and grain stores cut into cliffs throughout the central valleys.',
    'Unamuno called it a continent in miniature, which has been in every brochure since and is not wrong: within an hour you can go from dunes to laurel forest to pine at two thousand metres.'
  ],
  see: [
    { n: 'Roque Nublo',
      d: 'A straightforward walk of about half an hour from the Degollada de la Goleta to a plateau with the monolith and Teide on the horizon across the sea.' },
    { n: 'Las Palmas and Vegueta',
      d: 'The old quarter of the capital, where Columbus stopped in 1492, with a cathedral and the Casa de Colón. Playa de Las Canteras is a city beach with a reef across the mouth.' },
    { n: 'Cueva Pintada, Gáldar',
      d: 'An aboriginal painted cave with geometric designs in red, white and black, found in 1862 and now under a museum with the excavated village around it.' },
    { n: 'Tejeda and the central villages',
      d: 'Artenara, Tejeda and Teror, with almond blossom in late January and February. The road through is spectacular and slow.' },
    { n: 'Barranco de Guayadeque',
      d: 'A ravine with cave houses still lived in, a cave church and two restaurants dug into the rock.' },
    { n: 'Maspalomas dunes',
      d: 'In the south, with the resorts behind them and a protected dune field in front.' }
  ],
  when: 'Year round. The north is cloudier; the south has around three hundred and twenty sunny days.',
  stay: 'Four nights, with at least two inland.',
  move: 'A car. The airport is on the east coast and the motorway runs round the island; the interior roads do not.',
  eat: 'Papas arrugadas with red and green mojo. Ropa vieja, chickpeas with shredded meat. Bienmesabe, an almond cream. Gofio, toasted grain flour, which is the aboriginal staple and still eaten daily.'
},

'CNR-fuerteventura': {
  intro: [
    'Fuerteventura is the oldest of the islands, about twenty million years, which means the volcanoes are eroded down to stumps and the landscape is low, brown and open. It is also only a hundred kilometres from the Sahara, which is why it has the least rain, the most sun and a hundred and fifty kilometres of beach.',
    'The wind is constant and that is the economy. The north coast around Corralejo and the southern tip at Jandía hold the best windsurfing and kitesurfing in the Atlantic, and the world championship has been held here since 1986.',
    'Most of the island is empty. Outside the resorts there are goats, stone walls, white villages and very long roads with nothing on them, and a dark sky reserve covering the whole island.'
  ],
  see: [
    { n: 'Corralejo dunes',
      d: 'Eleven square kilometres of sand blown in off the sea, protected, with the beach running along the edge of it and Lobos island offshore.' },
    { n: 'Cofete',
      d: 'A twelve-kilometre beach on the wild southwest side, reached by a rough twenty-kilometre track, with a mountain wall behind and no development at all. Swimming is dangerous.' },
    { n: 'Isla de Lobos',
      d: 'A capped-access island off Corralejo with a lagoon, a volcano you can climb and a permit requirement.' },
    { n: 'Windsurfing at Sotavento',
      d: 'A lagoon that fills at high tide and empties at low, giving flat shallow water with full wind. The championship venue.' },
    { n: 'Betancuria',
      d: 'The first capital, founded in 1404, in a valley in the middle of the island, with a church and almost nothing else.' },
    { n: 'The goats',
      d: 'Around a hundred and twenty thousand of them, more than people, producing Majorero cheese, which is the best in the archipelago and has a protected designation.' }
  ],
  when: 'Year round. The wind is strongest from May to September, which is also when the water sports season peaks.',
  stay: 'Four nights.',
  move: 'A car, and the distances are longer than they look. Ferries to Lanzarote take half an hour.',
  eat: 'Majorero cheese, often rubbed with paprika or gofio. Goat. Fish from the villages on the west coast.'
},

'CNR-anaga': {
  intro: [
    'Anaga is the northeast tip of Tenerife and the oldest part of the island, between seven and nine million years old. Erosion has cut it into a comb of knife-edge ridges and deep ravines, with a single road along the spine and hamlets at the bottom of valleys that were reached only on foot until the 1960s.',
    'The ridge is in cloud for much of the year, which supports laurisilva as dense as La Gomera’s and which makes walking here a matter of moving in and out of fog. It was made a biosphere reserve in 2015.',
    'Some of the hamlets still have no road. Chinamada has houses dug into the rock, and the walk in from Las Carboneras takes about an hour each way along a ridge path with drops on both sides.'
  ],
  see: [
    { n: 'Sendero de los Sentidos',
      d: 'Three short interpretive loops at Cruz del Carmen through the thickest laurisilva, suitable for anybody, with the forest at its densest.' },
    { n: 'Chinamada',
      d: 'Cave houses reached on foot from Las Carboneras along the ridge. About an hour each way and genuinely exposed in places.' },
    { n: 'Taganana and Benijo',
      d: 'On the north coast below the ridge, with black beaches, rock stacks offshore and the best sunsets on Tenerife.' },
    { n: 'Pico del Inglés',
      d: 'A viewpoint on the ridge looking down both sides, which on a clear day takes in La Palma, La Gomera and Teide.' },
    { n: 'The Barranco del Infierno',
      d: 'On the other side of the island but the same idea: a ravine walk with a permit and a cap.' },
    { n: 'La Laguna',
      d: 'At the foot of the massif, the old capital, a UNESCO-listed grid town from 1496 that was the model for several colonial cities in the Americas.' }
  ],
  when: 'Year round. The ridge is often in cloud, which is the point rather than a problem. Winter is wettest.',
  stay: 'Two days.',
  move: 'A car, and the ridge road is narrow with passing places. Buses run to Taganana.',
  eat: 'The guachinches, informal house restaurants serving the family’s own wine with a short menu, are concentrated in this part of the island and are the best eating on Tenerife.'
},

'CNR-el-hierro': {
  intro: [
    'El Hierro is the smallest and westernmost island, with about eleven thousand people. Until the sixteenth century the prime meridian ran through it, because Ptolemy placed the edge of the known world here, and the French used that meridian until 1884.',
    'In 2014 the island ran for several hours entirely on renewable power using a scheme that pumps water uphill with wind turbines and releases it through a hydroelectric plant when the wind drops. It has since managed multi-day stretches and periods of over fifty per cent renewable across a full year, which for an isolated grid is a genuine achievement.',
    'The diving is the other reason to come. La Restinga at the southern tip sits beside the Mar de las Calmas marine reserve, where the lava shelf drops steeply, the water is clear to thirty metres and there are no currents, and the fish are habituated. It is consistently rated the best diving in Europe.'
  ],
  see: [
    { n: 'Diving at La Restinga',
      d: 'Several schools. Barracuda, groupers that come to meet you, rays and occasional whale sharks. Shore entries as well as boat.' },
    { n: 'El Sabinar',
      d: 'Juniper trees on the western plateau bent flat to the ground by centuries of wind, growing almost horizontally. The island emblem.' },
    { n: 'Mirador de la Peña',
      d: 'A César Manrique viewpoint over El Golfo, the collapsed half-caldera that forms the north of the island, with a restaurant built into the cliff.' },
    { n: 'Charco Azul and the natural pools',
      d: 'Lava pools on the north coast, filled by the sea, with ladders down into them.' },
    { n: 'The Gorona del Viento plant',
      d: 'The wind and pumped-hydro scheme, visible from the road with an interpretation centre.' },
    { n: 'The Camino de la Virgen',
      d: 'A route across the island used in the Bajada, held every four years, when the island’s patron is carried from the west to the capital.' }
  ],
  when: 'Year round, with the best diving from July to November when the water is warmest and clearest.',
  stay: 'Four nights.',
  move: 'Flights from Tenerife, or a ferry from Los Cristianos in two and a half hours. A car is essential.',
  eat: 'Quesadillas, a sweet cheese pastry specific to the island. Pineapple from El Golfo, and the island wine, which is made at the highest vineyards in Spain by latitude.'
},

'CNR-maspalomas': {
  intro: [
    'The Maspalomas dunes are about four square kilometres of mobile sand at the southern tip of Gran Canaria, protected since 1987 and surrounded on three sides by resorts. The sand did not blow in from the Sahara, which is the usual assumption; it is marine, built from shell and coral fragments washed ashore and then blown inland.',
    'The system is dynamic and the dunes migrate across the field at a few metres a year, which means the protected area is genuinely changing shape. It is also shrinking, partly because hotel construction interrupted the sand supply.',
    'Behind the dunes is La Charca, a brackish lagoon with reeds that is an important stopping point for migrating birds, and a palm grove. The combination of lagoon, palms, dunes and a lighthouse in a few hundred metres is unexpected given what surrounds it.'
  ],
  see: [
    { n: 'Crossing the dunes',
      d: 'Walk from the Faro de Maspalomas towards Playa del Inglés, about three kilometres over the sand, which takes an hour and gets you out of sight of buildings in the middle.' },
    { n: 'La Charca',
      d: 'The lagoon with a boardwalk and a hide. Herons, waders and in winter a decent list of migrants.' },
    { n: 'The lighthouse',
      d: 'Sixty metres, built in 1890, when there was nothing here at all. The promenade runs east from it.' },
    { n: 'The beach',
      d: 'Six kilometres from the lighthouse to Playa del Inglés, with a naturist section in the middle and a long-standing gay section marked by kiosk number seven.' },
    { n: 'Sunrise',
      d: 'The dunes are best at either end of the day, when the ridges have shadows and the surface is unmarked.' },
    { n: 'The rules',
      d: 'Staying on the marked crossings is asked for and widely ignored, which is part of why the field is in trouble.' }
  ],
  when: 'Year round, which is the point: twenty-two degrees in January. Early morning or late afternoon on the sand.',
  stay: 'Two hours, within a longer stay.',
  move: 'Twenty-five minutes from Las Palmas airport by motorway. Buses run along the south coast constantly.',
  eat: 'The resorts offer every European cuisine badly. Drive twenty minutes inland to Fataga or Santa Lucía for Canarian food.'
},

'CNR-masca': {
  intro: [
    'Masca is a hamlet of about ninety people on a ridge in the Teno massif, the oldest part of Tenerife, reached by a road of relentless hairpins that climbs to eight hundred metres and then drops into the village. Until a road was built in the 1960s everything came in on mules.',
    'From the village a barranco runs down to the sea for about five kilometres, dropping six hundred metres between walls that narrow to a few metres in places. It was the most popular walk on Tenerife until it was closed in 2018 after repeated rescues and a death.',
    'It reopened in 2021 with a completely different system: booked slots, a cap of about three hundred a day, compulsory helmets, a briefing, and a boat out at the bottom to Los Gigantes. You cannot walk back up. It is a better arrangement than the free-for-all it replaced.'
  ],
  see: [
    { n: 'The barranco walk', t: 'booked, helmets, boat out',
      d: 'Book on the Tenerife council site well ahead. Four to five hours down, with scrambling. The boat from the beach is included and is the only way out.' },
    { n: 'The village',
      d: 'Stone houses on a ridge with drops either side, a small church and two or three bars. Parking is severely limited and a shuttle runs from Santiago del Teide.' },
    { n: 'The drive',
      d: 'From Santiago del Teide over the pass. Not for anyone prone to car sickness, and the Buenavista side is worse.' },
    { n: 'Los Gigantes',
      d: 'Cliffs up to six hundred metres falling straight into the sea at the end of the Teno massif, best seen from the boat.' },
    { n: 'Punta de Teno',
      d: 'The western tip with a lighthouse, access restricted to a shuttle bus because of rockfall on the road.' },
    { n: 'Whale watching',
      d: 'A resident population of short-finned pilot whales lives off this coast year round, which is unusual, and sightings are close to guaranteed.' }
  ],
  when: 'Year round for the village. The barranco closes in rain and after rockfall; check before booking travel around it.',
  stay: 'A full day for the walk.',
  move: 'A car to Santiago del Teide, then the shuttle. Parking at Masca itself is almost impossible.',
  eat: 'A couple of bars in the village doing goat stew and almogrote. Nothing in the barranco, so carry food and a lot of water.'
},

'CNR-manrique': {
  intro: [
    'César Manrique trained as a painter, spent time in New York in the 1960s among the abstract expressionists, and came home to Lanzarote in 1966 with a conviction that the island could be developed without being destroyed. He had unusual influence: he persuaded the island government to ban high-rise building and advertising hoardings, and then designed the major visitor sites himself.',
    'His method was consistent. Find a volcanic feature, interfere with it as little as possible, and insert white-painted interventions, water, and plants. The results are neither buildings nor landscape and they have aged extremely well.',
    'He died in a car crash in 1992 at a roundabout he had campaigned against. His own house at Tahíche, built into five lava bubbles connected by tunnels, is now the foundation that manages his legacy and is the best of the lot.'
  ],
  see: [
    { n: 'Fundación César Manrique',
      d: 'His house at Tahíche, five volcanic bubbles used as living rooms, with a white modernist house on top and his collection inside. The single best thing on the island.' },
    { n: 'Jameos del Agua',
      d: 'A collapsed lava tube with a saltwater lake, an auditorium with astonishing acoustics and a white pool. The blind albino crabs in the lake are endemic to this one cave.' },
    { n: 'Mirador del Río',
      d: 'Cut into the cliff at four hundred and seventy-five metres so that from outside you see nothing at all, with two domed windows over the strait.' },
    { n: 'Jardín de Cactus',
      d: 'In an old ash quarry, terraced, with around four thousand five hundred cacti and a restored windmill. His last project.' },
    { n: 'Casa Museo in Haría',
      d: 'Where he actually lived at the end, a traditional house in the palm valley, left as it was on the day he died including the studio.' },
    { n: 'The wind toys',
      d: 'Kinetic sculptures at several roundabouts across the island, which turn in the trade wind and are easy to miss while driving.' }
  ],
  when: 'Year round. The sites are busy from mid-morning; go early.',
  stay: 'Two days to see them all properly.',
  move: 'A car. The sites are spread across the island and there is a combined ticket.',
  eat: 'Jameos del Agua has a restaurant in the cave. Haría and Teguise are better for a proper lunch.'
},

'BAL-tramuntana': {
  intro: [
    'The Serra de Tramuntana runs ninety kilometres down the northwest coast of Mallorca and reaches 1,445 metres at Puig Major. UNESCO listed it in 2011 as a cultural landscape, and the listing is specifically about the dry-stone work: terraces, water channels, irrigation tanks and paths built without mortar over a thousand years, largely in the Islamic period and extended after.',
    'The Ruta de Pedra en Sec, the dry-stone way, runs the length of it in eight stages with refuges, which is one of the better long-distance walks in southern Europe and is almost empty outside spring and autumn.',
    'The other thing is cycling. The combination of long graded climbs, warm winters and almost no traffic in February means professional teams train here, and the Sa Calobra road, which drops eight hundred metres in twelve kilometres and includes a hairpin that loops under itself, has become a pilgrimage.'
  ],
  see: [
    { n: 'Sa Calobra',
      d: 'Down to a cove at the mouth of the Torrent de Pareis, either by road or by boat from Port de Sóller. The road is the attraction; the gorge walk at the bottom is serious and needs scrambling.' },
    { n: 'The Ruta de Pedra en Sec',
      d: 'Eight stages from Port d’Andratx to Pollença, with refuges to book. Spring and autumn only; summer on these slopes is too hot.' },
    { n: 'Valldemossa',
      d: 'A Carthusian monastery where Chopin and George Sand spent a miserable winter in 1838 and 1839. She wrote a book about how awful the Mallorcans were; the town has monetised it anyway.' },
    { n: 'Cap de Formentor',
      d: 'The northern tip, with a lighthouse and a road along a knife-edge. Access is restricted to a shuttle bus in summer.' },
    { n: 'The Mirador de Ses Barques and the olive terraces',
      d: 'Olives have been grown on these terraces since at least the Roman period and some of the trees are a thousand years old.' },
    { n: 'Cycling in February',
      d: 'Cold enough to be comfortable climbing, warm enough to be pleasant, and the roads are empty. Hire shops in Sóller and Alcúdia.' }
  ],
  when: 'February to May and September to November. July and August are too hot for walking and the coastal roads jam.',
  stay: 'Four nights.',
  move: 'A car, and the roads are narrow and busy with cyclists. The Sóller train and tram are an alternative for part of it.',
  eat: 'Olive oil from the terraces, sobrassada, and tumbet, a layered vegetable dish. In Sóller, oranges and ice cream made from them.'
},

'BAL-palma': {
  intro: [
    'La Seu, the cathedral, stands directly on the seafront on the line of the old city wall, so it is reflected in the water of the Parc de la Mar in front of it. It has the second tallest Gothic nave in Europe after Beauvais and the largest rose window of any Gothic cathedral, which is twelve metres across and contains around twelve hundred pieces of glass.',
    'Gaudí worked here between 1904 and 1914, moving the choir, hanging a canopy of wrought iron and glass over the altar and opening up the apse windows. He walked out after a dispute with the contractor. In 2007 Miquel Barceló finished a chapel with a ceramic wall of fish, loaves and skulls that is either the best thing in the building or a desecration, depending on who you ask.',
    'The city behind it is Arab in plan, with courtyards behind plain doors throughout the old town, a bath house from the tenth century, and more good eating per street than the island’s reputation suggests.'
  ],
  see: [
    { n: 'La Seu',
      d: 'Go in the morning when the east rose throws colour onto the west wall. Twice a year, in early February and November, the two roses align and the light forms a figure of eight, which draws a crowd at eight in the morning.' },
    { n: 'The Barceló chapel',
      d: 'Three hundred square metres of fired clay in the Capella del Santíssim. Worth forming your own view.' },
    { n: 'The patios',
      d: 'Around fifty courtyards in the old town, most visible through open doors on Carrer Can Savellà and Carrer Morey. A free walking route exists.' },
    { n: 'Banys Àrabs',
      d: 'A tenth-century bath chamber with twelve columns, all different because they were reused from earlier buildings. In a garden off Carrer Serra.' },
    { n: 'Castell de Bellver',
      d: 'A fourteenth-century circular castle on a hill above the city, which is almost unique in European military architecture, with a view over the bay.' },
    { n: 'Santa Catalina',
      d: 'The old fishing quarter turned eating district, with a market hall and the best food in the city.' }
  ],
  when: 'April to June and September to October. July and August are hot and the city is full. Winter is mild and almost empty.',
  stay: 'Three nights.',
  move: 'Airport fifteen minutes out with enormous traffic in summer. The old town is walkable; the Sóller train leaves from the centre.',
  eat: 'Ensaimada, a spiral pastry made with lard. Sobrassada. Frit mallorquí. Pa amb oli, which is the island staple and better than it sounds.'
},

'BAL-soller': {
  intro: [
    'Sóller is in a bowl of mountains with one road out over a pass and, since 1912, a railway tunnel through it. The train from Palma is a narrow-gauge wooden-carriaged service that takes an hour, goes through thirteen tunnels, and stops at a viewpoint for photographs. It was built with orange money.',
    'The oranges are why the valley is rich. It exported them to France through Port de Sóller for a century, which is also why the town has modernista buildings by a pupil of Gaudí: the money came back from France along with the architecture.',
    'Deià, ten minutes up the coast, is a cluster of stone houses on a hillside where Robert Graves lived from 1929 until his death in 1985. He is buried in the churchyard at the top under a plain slab reading Robert Graves, Poeta. The village has been an artists’ and then a wealthy retreat ever since.'
  ],
  see: [
    { n: 'The Palma to Sóller train',
      d: 'An hour through the Tramuntana in 1912 carriages. Then the open-sided tram down to the port, which is a further twenty minutes and better.' },
    { n: 'Deià',
      d: 'Graves’s house, Ca n’Alluny, is a museum kept as he left it, with his desk and his library. The churchyard is a short steep climb.' },
    { n: 'Cala Deià',
      d: 'A pebble cove below the village down a steep path, with two restaurants, one of which is on the rocks and has been there for decades.' },
    { n: 'Port de Sóller',
      d: 'A nearly enclosed bay with a lighthouse walk on the headland and the only sandy beach in this part of the Tramuntana.' },
    { n: 'The Sóller gardens',
      d: 'A botanical garden specialising in Balearic endemics, beside the station, which is small and good.' },
    { n: 'Walking to Fornalutx',
      d: 'A stone-paved path up the valley to a village often called the prettiest in Spain, about an hour, through orange and olive terraces.' }
  ],
  when: 'February to May and September to November. The train is busy in summer and worth booking.',
  stay: 'Two nights.',
  move: 'The train from Palma, or the road over the Coll de Sóller, which has fifty-seven hairpins and a tunnel alternative.',
  eat: 'Oranges in everything, including a local orange ice cream. Prawns from the port. Deià has two very good and very expensive restaurants.'
},

'BAL-menorca': {
  intro: [
    'Menorca became a biosphere reserve in 1993 and has had strict planning rules since, which is why it looks nothing like Mallorca or Ibiza. There is no high-rise, no resort strip of any length, and over forty per cent of the island is protected.',
    'It also has more prehistoric monuments per square kilometre than almost anywhere in Europe: around fifteen hundred sites from the Talayotic culture, including taulas, T-shaped stone structures up to four metres high found only on this island and whose purpose is still argued about. The Talayotic sites were listed by UNESCO in 2023.',
    'The Camí de Cavalls is the other distinctive thing: a hundred and eighty-five kilometre bridle path right round the island, originally built so that mounted militia could reach any point of the coast, restored and reopened to the public in 2010.'
  ],
  see: [
    { n: 'The Camí de Cavalls',
      d: 'Twenty stages, walkable in about ten days or in sections. The northern half is rockier and emptier; the south has the beaches.' },
    { n: 'Naveta des Tudons',
      d: 'A stone burial chamber shaped like an upturned boat, about three thousand years old, which is among the oldest roofed buildings in Europe still standing.' },
    { n: 'Torre d’en Galmés and Talatí de Dalt',
      d: 'Two Talayotic settlements with taulas standing in enclosures. Talatí has a taula with a fallen column leaning against it.' },
    { n: 'The south coast calas',
      d: 'Macarella, Macarelleta, Turqueta and Mitjana, white sand between pine and limestone. Most require a walk and several have summer parking caps.' },
    { n: 'The north coast',
      d: 'Cala Pregonda and Cavalleria, where the sand is reddish because the rock is different. Wilder and emptier.' },
    { n: 'Monte Toro',
      d: 'At three hundred and fifty-eight metres the highest point, with a monastery and a view over the whole island.' }
  ],
  when: 'May, June, September and October. The tramuntana wind in winter is serious and many places close.',
  stay: 'Five nights.',
  move: 'A car. Ferries from Barcelona and Mallorca, flights from across Europe in season.',
  eat: 'Mahón cheese, which is a protected designation and ranges from fresh to very hard. Caldereta de llagosta, a lobster stew, which is the island’s expensive dish. Gin, which the British introduced and which is still distilled at Xoriguer.'
},

'BAL-ciutadella': {
  intro: [
    'Ciutadella was the capital of Menorca until the British moved it to Mahón in 1722 for the better harbour, and it has been the more beautiful of the two ever since. It is built in golden Menorcan sandstone around a long narrow inlet, with a medieval street plan and a set of palaces belonging to families who have held them for centuries.',
    'The Turks sacked it in 1558 and carried off most of the population to Constantinople, which is why there is very little medieval building left and a great deal of seventeenth-century reconstruction. An obelisk in the main square commemorates it.',
    'Sant Joan, from 23 to 24 June, is unlike any other Spanish festival. Riders in formal dress take horses into crowds packed into the squares and the horses rear on their hind legs while people press underneath them. It is called the jaleo, it has run since the fourteenth century, and it is dangerous.'
  ],
  see: [
    { n: 'Festes de Sant Joan', t: '23 to 24 June',
      d: 'The jaleo in the Plaça des Born and the Pla de Sant Joan. Touching the horse’s heart is said to bring luck. People are injured every year.' },
    { n: 'The port',
      d: 'A long inlet with restaurants along the quay below the old walls, which is where the town eats in summer.' },
    { n: 'Plaça des Born',
      d: 'The main square, with the town hall on the site of the Moorish alcázar and a view over the harbour from the edge.' },
    { n: 'The palaces',
      d: 'Palau Salort and Palau Martorell open in summer, with the original furnishings of families still in residence.' },
    { n: 'The cathedral',
      d: 'Built on the main mosque after 1287, Catalan Gothic, with a minaret base in the bell tower.' },
    { n: 'Cala Macarella',
      d: 'Twenty minutes south, among the best beaches in the Mediterranean, with a cap on summer parking and a walk in.' }
  ],
  when: 'Late June for Sant Joan, with accommodation booked a year ahead. May and September otherwise.',
  stay: 'Two nights.',
  move: 'A car. Forty-five minutes from Mahón airport, or the ferry from Alcúdia on Mallorca.',
  eat: 'Lobster stew at Fornells up the coast, which is the famous version. Oliaigua, a tomato and bread soup eaten with figs. Pastissets.'
},

'BAL-ibiza': {
  intro: [
    'Ibiza is two things that barely acknowledge each other. Dalt Vila, the walled upper town of Eivissa, is UNESCO listed for a Renaissance bastioned enceinte of 1585 that is among the best preserved in the Mediterranean, built over Phoenician and Roman foundations on a hill the Carthaginians used as a necropolis.',
    'The other is a club economy that began with Pacha in 1973 and Amnesia in 1976 and became, after British DJs brought the sound home in 1987, the single most concentrated dance music scene on earth. The big rooms hold several thousand and residencies run from June to early October.',
    'Away from both there is a quiet island: a northern half of pine, red earth and small coves with almost no development, the salt pans at Ses Salines which are a Phoenician industry still working, and a seagrass meadow offshore that includes a single clonal organism estimated at around a hundred thousand years old.'
  ],
  see: [
    { n: 'Dalt Vila',
      d: 'Up through the Portal de ses Taules and round the bastions, with the cathedral and the archaeology museum at the top. Best early or at night.' },
    { n: 'The clubs', t: 'June to early October',
      d: 'Pacha, Amnesia, Ushuaïa, Hï and DC-10. Tickets are expensive and the better nights are the closing parties in late September and October.' },
    { n: 'Ses Salines',
      d: 'A natural park of salt pans with flamingos, a long beach and the clearest water on the island. Salt has been harvested here for over two thousand years.' },
    { n: 'The north',
      d: 'Benirràs for the drumming at sunset on Sundays, Cala Xarraca and Portinatx, and the villages of Sant Joan and Santa Agnès, which are almost agricultural.' },
    { n: 'The posidonia',
      d: 'The seagrass meadow between Ibiza and Formentera is UNESCO listed and is the reason the water is so clear. Anchoring on it is now prohibited and enforced.' },
    { n: 'Es Vedrà',
      d: 'The rock off the southwest coast, best from the cliff above Cala d’Hort at sunset.' }
  ],
  when: 'June to September for the clubs and the heat. May and October are warm, far cheaper and much more pleasant. Winter is close to empty.',
  stay: 'Four nights.',
  move: 'Airport with heavy summer traffic. A car or scooter, and the taxi supply in August is a well-known problem.',
  eat: 'Bullit de peix, a fish stew followed by rice cooked in the broth. Sofrit pagès. Hierbas ibicencas, a herb liqueur drunk after dinner.'
},

'BAL-formentera': {
  intro: [
    'Formentera has no airport. Everything and everyone arrives by boat from Ibiza, thirty minutes away, and that single fact has kept it different: there are around twelve thousand residents, no building over two storeys, and the whole island is twenty kilometres long and in places under two wide.',
    'The water is why people come. The posidonia meadow between here and Ibiza filters the water to a clarity that is genuinely unusual in the Mediterranean, and the seagrass is also the reason the beaches have those banks of dried brown fronds on them, which are left in place deliberately because they protect the sand from erosion.',
    'Ses Illetes at the northern tip is the famous beach: a sandbar with water on both sides, shallow and pale, running out towards Espalmador. It gets very busy in August and vehicle access is capped and charged.'
  ],
  see: [
    { n: 'Ses Illetes',
      d: 'The spit at the north end, inside the natural park. Vehicle numbers are capped in summer and booked online. Walk or cycle if you can.' },
    { n: 'Cycling',
      d: 'A network of green routes across the island, flat except for the climb to La Mola. The best way to get around and hire is everywhere.' },
    { n: 'La Mola',
      d: 'The plateau at the eastern end with a lighthouse, a cliff, and a hippy market on Wednesdays and Sundays that has run since 1984.' },
    { n: 'Cala Saona',
      d: 'The best of the western coves, with red cliffs either side and a sunset that faces Es Vedrà on Ibiza.' },
    { n: 'Es Trucadors',
      d: 'The sandspit walk from Illetes to Llevant, with a wading crossing to Espalmador that is now prohibited because the island is private and the authorities enforce it.' },
    { n: 'Megalithic Ca na Costa',
      d: 'A stone circle and burial chamber from about 2000 BC near Estany Pudent, which is the earliest evidence of settlement.' }
  ],
  when: 'May, June, September. August is extremely busy and the ferries and car caps are the limiting factor.',
  stay: 'Three nights, or a day trip from Ibiza, which most people do and which is the worse option.',
  move: 'Ferry from Ibiza town, thirty minutes, running frequently. Bicycles and scooters on the island; bringing a car is discouraged and capped.',
  eat: 'Peix sec, sun-dried ray and skate, shredded into a salad with potato. Fish at the beach restaurants, which are expensive and good.'
},

'BAL-cabrera': {
  intro: [
    'Cabrera is an archipelago of nineteen islands about ten kilometres south of Mallorca, uninhabited apart from a small military detachment and park staff, and a national park since 1991 on land and 2019 across a much larger area of sea. It is the largest marine protected area in the Mediterranean.',
    'It was a prison. After the Spanish victory at Bailén in 1808, around nine thousand French prisoners were landed here and left with almost no supplies. Somewhere between a third and two thirds died of starvation and disease over five years. A monument on the island commemorates them.',
    'Access is capped and must be booked. A boat from Colònia de Sant Jordi takes about an hour, and most trips stop on the way back at the Cova Blava, a sea cave where the light coming through an underwater opening turns the whole interior blue.'
  ],
  see: [
    { n: 'The Cova Blava',
      d: 'A cave twenty-five metres high where the boats stop and let people swim. The blue is produced by light refracting through the submerged entrance.' },
    { n: 'The castle',
      d: 'A fourteenth-century tower above the harbour, a twenty-minute climb, with the whole archipelago from the top.' },
    { n: 'The French monument',
      d: 'A plain obelisk for the prisoners of 1809 to 1814, put up by France in 1847.' },
    { n: 'Snorkelling',
      d: 'The water is exceptionally clear and the fish are unafraid because nothing has been taken here for decades. Groupers come to look at you.' },
    { n: 'The Balearic lizard',
      d: 'A subspecies found only on these islands, numerous and tame, which will come and sit on your bag.' },
    { n: 'Booking',
      d: 'Several operators from Colònia de Sant Jordi and Portocolom, all working to a daily cap. Book well ahead in summer.' }
  ],
  when: 'April to October, when the boats run. Sea conditions cancel trips regularly.',
  stay: 'A full day.',
  move: 'Boat from Colònia de Sant Jordi, about an hour. There is a small refuge for overnight stays which must be booked separately and is usually full.',
  eat: 'There is one small bar at the harbour. Take food and plenty of water.'
},

'BAL-es-vedra': {
  intro: [
    'Es Vedrà is a limestone rock rising four hundred and thirteen metres out of the sea off the southwest coast of Ibiza, uninhabited, protected, and the subject of a quantity of mythology that is out of proportion to its size. It is variously said to be the tip of Atlantis, the home of the sirens from the Odyssey, and the third most magnetic place on earth, none of which stands up.',
    'What is true is that it is a nature reserve with Eleonora’s falcons breeding on it, that a Carmelite priest named Francesc Palau lived in a cave on it in the 1850s and wrote about visions, and that a goat population introduced at some point had to be removed to protect the vegetation.',
    'You look at it from the cliffs above Cala d’Hort or from a boat. Landing is prohibited. The reason to be there is the sunset, which goes down directly behind it and which is the one piece of Ibiza mythology that needs no defending.'
  ],
  see: [
    { n: 'Sunset from the cliffs',
      d: 'The Torre des Savinar, a ruined eighteenth-century watchtower on the headland, reached by a rough track and a short walk. Arrive an hour before.' },
    { n: 'Cala d’Hort',
      d: 'The beach directly below, with two restaurants on it and the rock filling the view.' },
    { n: 'By boat',
      d: 'Trips from Cala d’Hort and San Antonio go round it. Landing is not permitted.' },
    { n: 'Atlantis',
      d: 'An abandoned sandstone quarry on the cliff below the tower, reached by a steep scramble, with carvings made by visitors over decades. The descent is harder than it looks and people get stuck.' },
    { n: 'Cala Carbó and Cala Molí',
      d: 'Quieter coves either side with the same view and fewer people.' },
    { n: 'Eleonora’s falcon',
      d: 'Breeding on the rock from July, which is unusually late, timed to catch migrating songbirds in autumn.' }
  ],
  when: 'May to October for the light. Sunset timing shifts a great deal across the season; check before setting out.',
  stay: 'An evening.',
  move: 'A car, forty minutes from Ibiza town. The track to the tower is rough and the parking is informal.',
  eat: 'The two restaurants at Cala d’Hort do fish and bullit and are booked out at sunset in summer.'
},

'ARA-ordesa': {
  intro: [
    'Ordesa is a glacial valley with vertical limestone walls up to eight hundred metres, running east from the village of Torla under the massif of Monte Perdido, which at 3,348 metres is the third highest peak in the Pyrenees and the highest limestone mountain in Europe.',
    'It was made a national park in 1918, in the same month as the Picos de Europa, which makes them jointly the first in Spain. The protection came after a campaign by a forestry engineer who had watched the valley being logged.',
    'The classic walk goes up the valley floor through beech and pine to the Cola de Caballo, a horsetail waterfall at the head of the cirque, and comes back along the Faja de Pelay, a ledge halfway up the southern wall. It is about eighteen kilometres and six to seven hours and it is one of the best days of walking in Europe.'
  ],
  see: [
    { n: 'Cola de Caballo and the Faja de Pelay',
      d: 'Up the valley floor, down the ledge, or the reverse. Six to seven hours. The ledge is wide and not exposed, despite how it looks from below.' },
    { n: 'The shuttle bus',
      d: 'From Easter to October private cars cannot enter the valley and a bus runs from Torla. This is enforced and the car park fills early.' },
    { n: 'Cañón de Añisclo',
      d: 'The next valley south, narrower and wetter, with a one-way road through it and far fewer people.' },
    { n: 'Monte Perdido',
      d: 'A two-day ascent via the Góriz refuge, which must be booked. Not technical in summer but a long way up.' },
    { n: 'Bearded vultures',
      d: 'The Pyrenees hold the largest European population and this valley is reliable for them. They drop bones from height to break them, which is the only bird that does.' },
    { n: 'Brecha de Rolando',
      d: 'A gap forty metres wide and a hundred high in the ridge at the French border, which legend says Roland cut with his sword. Reached from the French side in about two hours.' }
  ],
  when: 'June to October. Snow lies in the cirque into July and the high routes need equipment before then. October has the beech colour.',
  stay: 'Two nights in Torla or Broto.',
  move: 'A car to Torla then the shuttle. Three hours from Zaragoza.',
  eat: 'Ternasco, Aragonese lamb. Migas. Trout from the Ara, which is the last undammed river in the Pyrenees.'
},

'ARA-albarracin': {
  intro: [
    'Albarracín is built on a loop of the Guadalaviar, with a wall running up the ridge behind it and houses plastered in a pink-red clay quarried locally. It was an independent Muslim taifa under the Banu Razin in the eleventh century, which is where the name comes from, and then an independent Christian lordship until 1300, so it was effectively its own small state for two hundred and fifty years.',
    'That independence and the subsequent poverty are why nothing was ever modernised. The town was declared a national monument in 1961 and has been restored carefully since, with the plaster colour specified and the overhanging upper floors kept.',
    'In the pine woods above are rock shelters with Levantine art painted somewhere between about eight thousand and three and a half thousand years ago: small human figures hunting, running and dancing, in red, which is an entirely different tradition from the Palaeolithic animal art of the north.'
  ],
  see: [
    { n: 'The town',
      d: 'Walk the lanes and then the wall above. An hour and a half. The best light is late afternoon when the clay goes properly red.' },
    { n: 'The cathedral and the Episcopal Museum',
      d: 'Holding a set of sixteenth-century Brussels tapestries, which is an improbable thing to find in a town of a thousand people.' },
    { n: 'The rock art', t: 'guided visits',
      d: 'Several shelters in the Pinares de Rodeno nearby, reached on short walks, with figures in red ochre. UNESCO listed as part of the Mediterranean Basin rock art.' },
    { n: 'Pinares de Rodeno',
      d: 'Red sandstone outcrops in pine forest, with marked walks and some of the best bouldering in Spain.' },
    { n: 'The Castle and Torre del Andador',
      d: 'The Moorish defences on the ridge, with the town below in its river loop.' },
    { n: 'Teruel',
      d: 'Forty minutes away, for the Mudéjar towers.' }
  ],
  when: 'Spring and autumn. Albarracín is at eleven hundred metres and the winters are severe. Summer weekends are busy.',
  stay: 'A night.',
  move: 'A car. Forty minutes from Teruel, two and a half hours from Valencia.',
  eat: 'Trout, ternasco, and jamón de Teruel, which has its own designation and is cured in the dry cold air of the province.'
},

'ARA-zaragoza': {
  intro: [
    'Zaragoza is named for Caesar Augustus, who founded it in about 14 BC as Caesaraugusta for retired legionaries. The forum, the river port, the baths and the theatre are all excavated and open, each with its own small museum, which together make the best Roman urban archaeology in Spain after Mérida.',
    'The Aljafería is the other end of the story: an eleventh-century Islamic palace built during the taifa period, with interlacing arches and a small mosque, later taken by the Christian kings, extended by Ferdinand and Isabella, and now the Aragonese parliament. It is the only substantial piece of taifa palace architecture surviving anywhere.',
    'The Basílica del Pilar dominates the river front with eleven domes and four towers. Goya painted the Regina Martyrum dome in 1780 at the age of thirty-four, and the chapel holds a pillar that the Virgin is said to have given to Saint James in AD 40, which would make it the oldest Marian shrine in Christendom.'
  ],
  see: [
    { n: 'The Aljafería',
      d: 'The Hall of the Golden Hall and the small oratory with a mihrab. Free on some days, and entry is timed because the parliament uses the building.' },
    { n: 'The Roman route',
      d: 'Forum, river port, theatre and baths, on one combined ticket. The theatre held six thousand and is shown under a canopy.' },
    { n: 'Basílica del Pilar',
      d: 'The Goya domes, and the two unexploded bombs that fell through the roof in 1936 and failed to detonate, now displayed on a wall. The tower lift gives the Ebro.' },
    { n: 'La Seo',
      d: 'The other cathedral, two hundred metres away, with a Mudéjar brick and tile exterior wall that is among the best in Spain and a tapestry museum inside.' },
    { n: 'Fiestas del Pilar', t: 'around 12 October',
      d: 'The flower offering, when hundreds of thousands of people queue to lay flowers on a frame that becomes a mantle for the Virgin. The city’s week.' },
    { n: 'El Tubo',
      d: 'A warren of lanes with tapas bars, which is where Zaragoza actually eats.' }
  ],
  when: 'Spring and autumn. Zaragoza summers reach forty degrees and the cierzo wind in winter is fierce.',
  stay: 'Two nights.',
  move: 'AVE from Madrid or Barcelona in about ninety minutes, which makes it an easy stop between them.',
  eat: 'Ternasco, borrajas, a vegetable almost unknown outside Aragon, and migas. Cariñena and Somontano wines.'
},

'ARA-teruel': {
  intro: [
    'Teruel has four towers built of brick, glazed ceramic and carved plaster by Muslim craftsmen working for Christian patrons in the thirteenth and fourteenth centuries. They are the finest Mudéjar towers in Spain and the style, which is essentially Islamic technique applied to Gothic forms, is specific to this part of Aragon.',
    'The town also has a story it has never let go of. In 1217 Isabel de Segura and Diego de Marcilla were in love; her father refused the match and gave Diego five years to make his fortune. He returned a day late to find her married, asked for a kiss, was refused, and died on the spot. At his funeral she kissed him and died too. Two mummified bodies were found in 1555 and are now displayed in an alabaster mausoleum.',
    'Teruel is also the capital of the emptiest province in Spain. Teruel Existe, a protest movement about rural depopulation and infrastructure, started here in 1999 and in 2019 won a seat in the Spanish parliament, which is the first time a single-province protest movement had done so.'
  ],
  see: [
    { n: 'The Mudéjar towers',
      d: 'San Pedro, San Martín, El Salvador and the cathedral tower. El Salvador can be climbed and the interior shows how the tower was built around an inner core.' },
    { n: 'The cathedral ceiling',
      d: 'A painted Mudéjar coffered ceiling of about 1300, with hunting scenes, musicians and craftsmen, which is called the Sistine Chapel of Mudéjar art and is viewed with mirrors.' },
    { n: 'The Lovers of Teruel',
      d: 'The mausoleum by Juan de Ávalos, with the two figures reaching towards each other and not quite touching. Re-enacted every February in a town-wide festival.' },
    { n: 'Dinópolis',
      d: 'A palaeontology museum and theme park, which sounds unpromising and holds genuinely important material, including Turiasaurus, among the largest dinosaurs found in Europe.' },
    { n: 'The Escalinata',
      d: 'A neo-Mudéjar staircase of 1921 linking the station to the old town, with brick and tile work in the same tradition seven hundred years later.' },
    { n: 'Albarracín',
      d: 'Forty minutes west.' }
  ],
  when: 'Spring and autumn. Teruel is at nine hundred and fifteen metres and regularly records the coldest temperatures in Spain.',
  stay: 'A night.',
  move: 'A car, or a slow train from Valencia and Zaragoza. The lack of a fast connection is itself a local political issue.',
  eat: 'Jamón de Teruel, which has a designation and is cured in the cold dry air. Ternasco, and the Calanda peach, which is grown in bags on the tree.'
},

'ARA-loarre': {
  intro: [
    'Loarre was built from about 1020 by Sancho III of Navarre and extended by Sancho Ramírez of Aragon after 1070, on a rock outcrop at a thousand metres looking out over the plain towards Huesca. It was a frontier post facing Muslim territory, and when the frontier moved south it stopped mattering and was never modernised.',
    'That is why it is the best preserved Romanesque castle in Europe. There is no later rebuilding to speak of: the chapel, the crypt, the keep and the curtain wall are all eleventh century, and inside the chapel the bare rock of the outcrop comes up through the floor because they built around it rather than levelling it.',
    'Ridley Scott filmed Kingdom of Heaven here in 2004, which brought visitors and a set of information boards. The castle needs neither.'
  ],
  see: [
    { n: 'The chapel of San Pedro',
      d: 'A barrel-vaulted church on a dome over the entrance stair, with carved capitals and the living rock emerging in the floor.' },
    { n: 'The entrance stair',
      d: 'A vaulted flight rising through the gatehouse, deliberately awkward to climb while carrying a shield, which is the kind of detail military architecture rarely preserves.' },
    { n: 'The keep and the Queen’s Tower',
      d: 'Climbable, with the plain of the Hoya de Huesca spread out below and the Pyrenees behind.' },
    { n: 'The crypt',
      d: 'Under the chapel, low, with the original altar.' },
    { n: 'The approach',
      d: 'The road up from the village gives the castle growing out of the rock, which is the view that explains the siting.' },
    { n: 'Los Mallos de Riglos',
      d: 'Twenty minutes away, the conglomerate towers with the vulture colony.' }
  ],
  when: 'Spring and autumn. Closed or on reduced hours in deep winter and the site is exposed.',
  stay: 'Two hours.',
  move: 'A car. Forty minutes from Huesca.',
  eat: 'The village below has a couple of places. Huesca and Ayerbe are better.'
},

'ARA-ainsa': {
  intro: [
    'Aínsa sits on a spur where the Ara and the Cinca meet, and the old town on top of it is a single cobbled square surrounded by arcades, with a Romanesque church at one end and a castle at the other. The Pyrenees fill the view north and the two rivers are green below.',
    'It was the capital of the county of Sobrarbe, which according to tradition was the origin of the Aragonese kingdom, founded after a cross appeared over a holm oak during a battle with the Moors in 724. The tree is commemorated in the square and the legend is re-enacted every other September.',
    'It is now the main base for the Sobrarbe canyons: the Ordesa park is half an hour west, the Añisclo and Escuaín gorges are immediately north, and the Sierra de Guara, which is the best canyoning area in Europe, is an hour south.'
  ],
  see: [
    { n: 'Plaza Mayor',
      d: 'Irregular, cobbled, arcaded on two sides, and effectively unchanged since the thirteenth century. Best in the evening.' },
    { n: 'The castle',
      d: 'Eleventh to seventeenth century, with the Torre del Tenente climbable and an interpretation centre for the Pyrenean fauna inside.' },
    { n: 'Santa María',
      d: 'A Romanesque church of 1181 with a crypt and a five-storey bell tower.' },
    { n: 'Canyoning in the Sierra de Guara',
      d: 'Hundreds of routes from easy to serious, with operators in Alquézar and Aínsa. The best in Europe and the season is June to September.' },
    { n: 'Añisclo and Escuaín',
      d: 'The two quieter gorges of the national park, both within forty minutes, both with a fraction of Ordesa’s traffic.' },
    { n: 'Alquézar',
      d: 'An hour south, a collegiate church on a crag above a gorge, with walkways pinned to the canyon wall below it.' }
  ],
  when: 'June to October. The Festival de Castillo in July and the Morisma re-enactment every other September.',
  stay: 'Two nights as a base.',
  move: 'A car. Two hours from Zaragoza or Huesca.',
  eat: 'Ternasco, trout, chiretas, and the Somontano wines from the hills to the south.'
},

'ARA-piedra': {
  intro: [
    'Cistercians founded the Monasterio de Piedra in 1194 and worked the valley for six hundred years. After the 1835 dissolution it was sold to a family who, instead of letting it fall down, spent the middle of the nineteenth century turning the gorge below it into a Romantic park: paths, tunnels, viewpoints and bridges threading between the waterfalls.',
    'The falls are travertine, built by the same process as Ruidera: carbonate-rich water depositing on moss and plants until a barrier forms. The Cola de Caballo drops fifty metres into a pool you reach through a tunnel cut in 1860, coming out behind the water.',
    'The monastery buildings are still there and part of it is a hotel. The abbey church is a ruin with the sky visible through the crossing, which the Romantic owners kept deliberately because a ruin was the point.'
  ],
  see: [
    { n: 'Cola de Caballo',
      d: 'Fifty metres, with the Gruta Iris tunnel leading behind and under it. Wet, dark and the best twenty minutes in the park.' },
    { n: 'The circuit',
      d: 'About three and a half kilometres on made paths, with a lot of steps. Three hours at a reasonable pace and the route is one-way.' },
    { n: 'The monastery',
      d: 'The ruined church, the chapter house, and a museum of chocolate, which is here because the monks were among the first in Europe to work with cacao brought back from Mexico.' },
    { n: 'The birds of prey display',
      d: 'Twice daily in season, in the valley, which is well run and includes vultures and eagles.' },
    { n: 'Lago del Espejo',
      d: 'A still pool reflecting the cliff, reached through another tunnel, which is where the Romantic landscaping is most obvious.' },
    { n: 'Calatayud',
      d: 'Half an hour away, with Mudéjar towers and a Moorish citadel, and on the Madrid to Zaragoza high-speed line.' }
  ],
  when: 'Spring for the water volume, autumn for the colour. Summer is busy and the gorge stays cool.',
  stay: 'Most of a day, or a night in the monastery hotel.',
  move: 'A car. Ninety minutes from Zaragoza, two and a half hours from Madrid.',
  eat: 'The monastery restaurant, or Calatayud for Aragonese cooking and Calatayud wine, which is old-vine Garnacha and good value.'
},

'ARA-riglos': {
  intro: [
    'The Mallos de Riglos are conglomerate towers rising about three hundred metres straight out of a village of around seventy people. Conglomerate is pebbles cemented together, which is unusual rock to climb because the holds are individual stones that occasionally come out in your hand, and the routes here are long and committing.',
    'The towers have names: Pisón, Firé, Visera, Puro. Visera overhangs for its entire height, which makes it one of the more intimidating big walls in Europe, and the Puro is a free-standing pillar that was first climbed in 1953.',
    'There is also one of the densest griffon vulture colonies in Europe nesting on the faces, which means climbers share the rock with several hundred birds with a two-and-a-half metre wingspan, and climbing is restricted on parts of the walls during nesting.'
  ],
  see: [
    { n: 'The village',
      d: 'Walk to the base of the towers from the car park, about fifteen minutes, and stand underneath Visera. The overhang is the thing.' },
    { n: 'The Camino Natural',
      d: 'A path from Riglos round the base and up to a viewpoint on the ridge, about two hours return, with the vultures below you.' },
    { n: 'The vultures',
      d: 'Several hundred pairs. Early morning and late afternoon as they come off the rock is the best time. The interpretation centre in the village is small and good.' },
    { n: 'Climbing',
      d: 'For experienced parties only. The guidebook routes are multi-pitch and the rock is unlike anything else. Local guides work out of Murillo de Gállego.' },
    { n: 'Rafting the Gállego',
      d: 'Murillo de Gállego, below the towers, is the main whitewater centre in Aragon.' },
    { n: 'The reservoir',
      d: 'Embalse de la Peña below, with the towers reflected in it on a still morning.' }
  ],
  when: 'Spring and autumn. Summer on south-facing conglomerate is extremely hot.',
  stay: 'Half a day.',
  move: 'A car, forty-five minutes from Huesca. There is also a request-stop railway station in the village.',
  eat: 'One or two bars in Riglos. Murillo de Gállego and Ayerbe have more.'
},

'ARA-jaca': {
  intro: [
    'Jaca was the first capital of the kingdom of Aragon and its cathedral, consecrated around 1076, is one of the earliest fully Romanesque buildings in Spain. The sculpture on the south door and the carved capitals inside were influential across the whole peninsula and the style is named for the town.',
    'It sits on the Camino Aragonés, the route that crosses the Pyrenees at Somport and joins the Camino Francés at Puente la Reina, which is why the Romanesque here is so dense: pilgrims brought money and masons brought ideas in both directions.',
    'San Juan de la Peña, twenty minutes south, is the more extraordinary building. A monastery built in two levels under an enormous overhanging rock shelf, with a Mozarabic lower church of the tenth century, a Romanesque upper church, and a royal pantheon cut into the cliff. The roof is the mountain.'
  ],
  see: [
    { n: 'San Juan de la Peña',
      d: 'The old monastery under the rock, with a cloister whose fourth side is the cliff itself and whose capitals are among the best Romanesque carving in Spain.' },
    { n: 'Jaca cathedral',
      d: 'The south portal, the chrismon over the west door, and the Diocesan Museum, which holds Romanesque frescoes removed from mountain churches.' },
    { n: 'The Ciudadela',
      d: 'A pentagonal star fort of 1592, still garrisoned, with a moat holding a herd of deer and a military miniatures museum inside.' },
    { n: 'The Somport pass',
      d: 'The old route over the Pyrenees, with a Roman road, a medieval pilgrim hospital site and a tunnel under it now.' },
    { n: 'Candanchú and Astún',
      d: 'Ski areas at the head of the valley, with Candanchú the oldest in Spain, opened in 1928.' },
    { n: 'The Valle de Hecho and Ansó',
      d: 'Two side valleys west with their own Aragonese dialect, beech forest and almost no traffic.' }
  ],
  when: 'June to September for walking, December to March for snow. The Pyrenean festival of folklore is in odd-numbered Augusts.',
  stay: 'Two nights.',
  move: 'A car. The train from Zaragoza takes about three hours and is scenic and slow.',
  eat: 'Ternasco, migas, trout, and the cheeses of the Hecho and Ansó valleys.'
},

'CTB-altamira': {
  intro: [
    'In 1879 Marcelino Sanz de Sautuola was digging in a cave on his land when his eight-year-old daughter María looked up and said there were bulls on the ceiling. What she had found was a panel of around twenty bison painted in red ochre and charcoal, using the natural bulges of the rock to give them volume, which are now dated to between about thirty-six thousand and fifteen thousand years ago.',
    'The academic establishment refused to accept it. The quality was considered impossible for prehistoric people and Sautuola was accused of hiring a painter to forge them. He died in 1888 still discredited. Only after comparable finds in France in the 1900s was Altamira accepted, and the French archaeologist who had led the attacks published a paper in 1902 titled a sceptic’s confession.',
    'The cave closed to the public in 2002 because human breath was growing mould on the paintings. What you visit now is the Neocueva, a replica built from laser scans of the original to within a millimetre, which sounds like a disappointment and is not.'
  ],
  see: [
    { n: 'The Neocueva',
      d: 'A full-scale reproduction of the polychrome ceiling and the cave approach, with the paintings copied by artists using the same pigments and techniques. The ceiling is only about a metre and a half above the floor, which is the detail nobody expects.' },
    { n: 'The museum',
      d: 'Context on the Magdalenian, with tools, engraved bone and an explanation of how the paintings were dated and why the original closed.' },
    { n: 'The original cave',
      d: 'Five visitors a week were selected by lottery under a monitoring programme that ran from 2014. Check the current position; access has varied.' },
    { n: 'Santillana del Mar',
      d: 'Two kilometres away and the usual base.' },
    { n: 'El Castillo and Covalanas',
      d: 'Other Cantabrian caves, UNESCO listed alongside Altamira, where you do go into the original and see real paintings. El Castillo has a hand stencil dated to at least forty thousand years ago.' },
    { n: 'The point about replicas',
      d: 'Worth holding both ideas: this is not the real thing, and going into the real El Castillo afterwards costs a fraction and is extraordinary.' }
  ],
  when: 'Year round. Closed Mondays. Book the Cantabrian caves separately and well ahead; several take only a handful of people a day.',
  stay: 'Two hours, or a day with the other caves.',
  move: 'A car. Half an hour west of Santander.',
  eat: 'Santillana del Mar next door, where the milk and the cheese are the local products.'
},

'CTB-santillana': {
  intro: [
    'The local joke is that Santillana del Mar is the town of three lies: it is not holy, not flat and not on the sea. The name actually comes from Santa Juliana, whose relics are in the collegiate church, and whose name was worn down to Santillana over centuries.',
    'It is two cobbled streets of stone houses with coats of arms carved over the doors, because in the sixteenth and seventeenth centuries the local gentry built here and competed at it. Nothing modern has been allowed in the old town and cars are kept out.',
    'The collegiate church is the best Romanesque building in Cantabria, with a cloister whose capitals carry hunting scenes, beasts and biblical narrative, carved around 1150. Sartre, who was not generally given to this kind of thing, called the town the prettiest village in Spain.'
  ],
  see: [
    { n: 'The Colegiata',
      d: 'Twelfth century, with the tomb of Santa Juliana in the nave and the cloister capitals, which repay slow looking.' },
    { n: 'The two streets',
      d: 'Calle Santo Domingo and Calle Juan Infante. Twenty minutes to walk and the coats of arms are the detail.' },
    { n: 'Early or late',
      d: 'Day trippers arrive from eleven and leave by six. The village in the evening is a different place and several hotels are in the old houses.' },
    { n: 'Altamira',
      d: 'Two kilometres up the hill.' },
    { n: 'The milk',
      d: 'Cantabrian dairy, with leche frita and quesada pasiega sold everywhere, and the cows in the fields immediately behind the houses.' },
    { n: 'Comillas',
      d: 'Fifteen minutes west for the Gaudí villa.' }
  ],
  when: 'Year round. Busy from Easter to September and in the middle of the day.',
  stay: 'A night, which is the whole point.',
  move: 'A car. Half an hour from Santander. Park outside and walk in.',
  eat: 'Quesada pasiega and sobaos. Cocido montañés, a bean and cabbage stew. Local dairy generally.'
},

'CTB-picos-fuente-de': {
  intro: [
    'The Fuente Dé cable car climbs seven hundred and fifty-three metres in under four minutes on a single span, from the valley floor at a thousand metres to El Cable at 1,823. It was built in 1966 and it puts you from a car park into high limestone country without any effort at all, which is unusual and slightly disorienting.',
    'At the top the ground is a plateau of karst: bare grey rock, sinkholes, and almost no soil, with the Picos peaks around it. The Áliva route drops gently to a refuge and then down to Espinama, which is about seventeen kilometres and mostly downhill, and is the standard day.',
    'Below in the Liébana valley the climate changes completely. The mountains shelter it so thoroughly that walnuts, figs and vines grow at four hundred metres within sight of snow, and the valley makes orujo, a grape spirit, which it has a festival for in November.'
  ],
  see: [
    { n: 'The cable car',
      d: 'Queues in August can run to two hours and tickets are sold on the day. Go first thing. It stops in high wind.' },
    { n: 'The Áliva route',
      d: 'From El Cable across the plateau and down to Espinama, five to six hours, with a bus back. The only walk from the top that does not involve going back up.' },
    { n: 'Santo Toribio de Liébana',
      d: 'A monastery holding what is claimed to be the largest surviving fragment of the True Cross, and one of only five places granted a perpetual Jubilee year by the papacy.' },
    { n: 'Potes',
      d: 'The valley town, with a medieval tower and a Monday market, and the base for everything.' },
    { n: 'The Desfiladero de La Hermida',
      d: 'A gorge twenty-one kilometres long on the road in, with walls six hundred metres high and barely room for the road and the river.' },
    { n: 'Orujo',
      d: 'Distilled from grape pressings and drunk after meals. The November festival in Potes involves a lot of it.' }
  ],
  when: 'June to September for the high ground. The cable car runs most of the year and closes in bad weather.',
  stay: 'Two nights in Potes.',
  move: 'A car through the Hermida gorge. Ninety minutes from Santander.',
  eat: 'Cocido lebaniego, a chickpea stew served in courses. Picón Bejes-Tresviso, a blue cheese from the valley. Orujo.'
},

'CTB-comillas': {
  intro: [
    'Comillas is a small coastal town with an improbable concentration of Catalan modernisme, and the reason is one man. Antonio López y López was born here poor, went to Cuba, made a fortune in shipping and slaving, came back as the first Marquis of Comillas, and brought Barcelona architects with him.',
    'Gaudí built El Capricho here in 1883 and 1885, one of only three buildings he completed outside Catalonia. It is a summer villa with a tower like a minaret covered entirely in sunflower tiles, and it was designed for a man who loved music, so the window sashes are weighted to play notes when raised.',
    'Above the town, the Pontifical Seminary by Domènech i Montaner is enormous and was a working seminary until 1968. The Sobrellano palace beside it has furniture designed by Gaudí. The combination of all this in a town of two thousand five hundred people is the thing.'
  ],
  see: [
    { n: 'El Capricho',
      d: 'Gaudí, 1885. Small, ticketed, with the sunflower tiles and the musical windows. Allow forty minutes.' },
    { n: 'Palacio de Sobrellano',
      d: 'Neo-Gothic by Joan Martorell, with a chapel-pantheon beside it and Gaudí’s furniture inside.' },
    { n: 'The Pontifical Seminary',
      d: 'Domènech i Montaner on the hill, with a sculpture by Llimona over the door. Now a language university and visitable.' },
    { n: 'El Ángel Exterminador',
      d: 'A sculpture by Llimona in the cemetery, an angel with a sword standing on the ruins of the old church, which is the most photographed thing in the town after the Gaudí.' },
    { n: 'Playa de Comillas and Oyambre',
      d: 'A town beach and, five minutes west, a protected dune and estuary system with a much longer and emptier stretch of sand.' },
    { n: 'San Vicente de la Barquera',
      d: 'Ten minutes west, a fishing town on an estuary with the Picos de Europa behind it, which is the view on every Cantabrian poster.' }
  ],
  when: 'June to September. The Cantabrian coast is wet and green the rest of the year.',
  stay: 'Half a day, or a night.',
  move: 'A car. Forty-five minutes from Santander, fifteen from Santillana.',
  eat: 'Seafood, and the Cantabrian anchovies from Santoña along the coast, which are the best in Spain.'
},

'CTB-santander': {
  intro: [
    'In February 1941 a fire started in a shop in the old town and a south wind drove it for two days until most of medieval Santander had gone: around four hundred buildings and the cathedral roof. One person died, a fireman from Madrid. The city was rebuilt in a plain style and as a result it has almost no old quarter.',
    'What it has instead is a bay, which is one of the finest natural harbours in Europe, and the Sardinero beaches at the far end of the peninsula, which made it a royal resort from 1913 when the city built the Magdalena palace as a gift to Alfonso XIII.',
    'The Centro Botín, by Renzo Piano, opened in 2017: two shell-shaped volumes on stilts over the waterfront, clad in a hundred and eighty thousand ceramic discs, with a park linking it to the city. It is the most interesting building in Cantabria and it put the seafront back together.'
  ],
  see: [
    { n: 'Centro Botín',
      d: 'Piano’s building, with exhibitions and an open terrace between the two volumes that is free and gives the bay.' },
    { n: 'Palacio de la Magdalena',
      d: 'On a peninsula with sea on three sides, in an English style, with a park, a small zoo of seals and penguins and a replica of a sixteenth-century galleon.' },
    { n: 'El Sardinero',
      d: 'Two long beaches with a casino and belle époque facades behind, which is where the resort history is visible.' },
    { n: 'Mercado de la Esperanza',
      d: 'An 1904 iron market with the fish downstairs and everything else upstairs, which survived the fire.' },
    { n: 'The bay crossing',
      d: 'Small ferries to Somo and Pedreña, ten minutes, with a long dune-backed beach on the far side that the city does not reach.' },
    { n: 'The Cabo Mayor walk',
      d: 'A coastal path from Sardinero past the Mataleñas cliffs to the lighthouse, about an hour.' }
  ],
  when: 'June to September. The city holds an international music and dance festival in August.',
  stay: 'Two nights.',
  move: 'Train from Madrid in about four hours, and an airport with low-cost flights. Ferries to Portsmouth and Plymouth.',
  eat: 'Rabas, fried squid strips, which is the Santander bar snack. Anchovies from Santoña, and the Cantabrian cocido.'
},

'CTB-cabarceno': {
  intro: [
    'Cabárceno was an open-cast iron mine worked from Roman times until the 1980s, and what the mining left was seven hundred and fifty hectares of red karst, water-filled pits and spoil, which is to say a ruined landscape. In 1989 the regional government turned it into a wildlife park.',
    'The approach is different from a zoo. The enclosures are very large, measured in tens of hectares rather than square metres, so the elephants have about twenty hectares and the animals form social groups and behave more or less normally. You drive between them on twenty kilometres of road, or take a cable car over the top.',
    'It has had genuine breeding success, particularly with gorillas and with the European bison, and it holds one of the larger elephant herds in Europe. The eroded limestone pinnacles the mining exposed make the whole thing look like nowhere in Spain.'
  ],
  see: [
    { n: 'The cable car',
      d: 'Five and a half kilometres over the park, which gives the scale of the enclosures and the mining landscape at once.' },
    { n: 'The elephants',
      d: 'About twenty hectares and a herd that has bred repeatedly. The viewing is from above and at distance, which is the point.' },
    { n: 'The gorillas',
      d: 'A long-running breeding group, with an observation building.' },
    { n: 'The karst',
      d: 'The exposed limestone towers and the red soil, which is the mine rather than the park and is remarkable in itself.' },
    { n: 'The birds of prey display',
      d: 'Twice daily in season, with vultures and eagles over the pits.' },
    { n: 'Driving it',
      d: 'Twenty kilometres of internal road. Allow four hours and do not expect to see everything.' }
  ],
  when: 'Year round, and the animals are more active in cooler weather. Allow for Cantabrian rain.',
  stay: 'Most of a day.',
  move: 'A car. Twenty minutes south of Santander.',
  eat: 'Restaurants inside the park, which are adequate. Better in the villages around.'
},

'EXT-merida': {
  intro: [
    'Augusta Emerita was founded in 25 BC for veterans of two legions and became the capital of Lusitania, one of the three Roman provinces of Hispania. It had a population of perhaps forty thousand and the remains are the most extensive in Spain: a theatre, an amphitheatre, a circus, two aqueducts, a bridge of sixty arches, a temple and a reservoir.',
    'The theatre was built in about 15 BC by Agrippa, buried for centuries with only the top tier showing, and excavated from 1910. The scaenae frons, the two-storey columned stage wall, was reconstructed from its own fallen pieces and stands complete. It seats around six thousand and it is used every summer.',
    'The Museo Nacional de Arte Romano, built by Rafael Moneo in 1986 over the excavated remains it displays, is one of the great museum buildings of the late twentieth century: brick arches in Roman proportions, top-lit, with the collection arranged against them.'
  ],
  see: [
    { n: 'The Roman theatre',
      d: 'The stage wall, which is the thing. Go in the morning before the light flattens it.' },
    { n: 'Festival Internacional de Teatro Clásico', t: 'July and August',
      d: 'Greek and Roman drama performed in the theatre since 1933, which makes it the oldest festival of its kind in Spain. Several thousand people in a building designed for it.' },
    { n: 'Museo Nacional de Arte Romano',
      d: 'Moneo’s building, with a crypt of excavated streets underneath and mosaics hung on the brick walls above.' },
    { n: 'Los Milagros aqueduct',
      d: 'Granite and brick piers up to twenty-five metres, in a field with storks nesting on them. Free and open at all hours.' },
    { n: 'The Roman bridge',
      d: 'Seven hundred and ninety metres and sixty arches over the Guadiana, which carried traffic until 1991 and is now pedestrian, with Calatrava’s Lusitania bridge beside it.' },
    { n: 'The amphitheatre and circus',
      d: 'The amphitheatre is beside the theatre; the circus, which held thirty thousand and is four hundred metres long, is a short walk away and is nearly always empty.' }
  ],
  when: 'July and August for the festival, which coincides with forty-degree heat. Spring and autumn otherwise.',
  stay: 'Two nights.',
  move: 'Train from Madrid, slow, around four and a half hours. A car is more practical for the rest of Extremadura.',
  eat: 'Iberian pork from the dehesa, Torta del Casar, a sheep cheese so soft you cut the top off and spoon it out, and Ribera del Guadiana wine.'
},

'EXT-caceres': {
  intro: [
    'The walled town of Cáceres has around thirty tower houses built by noble families in the fifteenth century, and in 1477 Isabella ordered most of the towers cut down to stop the feuding. A handful kept their height by royal favour, which is why the skyline is a few tall towers among many stumps.',
    'Almost nothing modern is inside the walls. There are no cables, no shopfronts and very few cars, which is why television and film productions use it rather than building sets: it has stood in for King’s Landing and for a dozen historical dramas.',
    'The walls themselves are Almohad, twelfth century, with several towers still standing, built on Roman foundations. Storks nest on nearly every tower in the town and the clattering of their bills is a constant background noise from February.'
  ],
  see: [
    { n: 'Plaza de San Jorge and the Jesuit church',
      d: 'The centre of the walled town. Climb the church tower at dusk for the whole thing, with the storks at eye level.' },
    { n: 'Torre de Bujaco',
      d: 'On the main square, Almohad, climbable, and the main entry point through the Arco de la Estrella.' },
    { n: 'Museo de Cáceres',
      d: 'In a house built over an Almohad cistern, the aljibe, which is the best preserved in Spain and the reason to go in. Also a Picasso and a Miró.' },
    { n: 'The Jewish quarter',
      d: 'San Antonio, below the walls on the east side, whitewashed and narrow, which is where the town’s Jewish population lived until 1492.' },
    { n: 'Atrio',
      d: 'Three Michelin stars inside the walls, with a wine cellar holding what is claimed to be the largest collection of Château d’Yquem in the world.' },
    { n: 'Monfragüe',
      d: 'Forty-five minutes north for the vultures.' }
  ],
  when: 'Spring and autumn. Extremadura in July and August is among the hottest places in Spain. WOMAD is held in the old town in May.',
  stay: 'Two nights.',
  move: 'Train from Madrid, about four hours. A car for the region.',
  eat: 'Torta del Casar, migas extremeñas, and Iberian ham from the dehesa, which is the best in the world and where most of the acorn-fed pigs actually live.'
},

'EXT-trujillo': {
  intro: [
    'Francisco Pizarro was born here around 1478, illegitimate and illiterate, and conquered the Inca empire with a force of under two hundred men. Francisco de Orellana, the first European to descend the Amazon, was also from Trujillo, as were several hundred others who went to the Americas from a town of a few thousand people.',
    'The palaces around the Plaza Mayor were built with what came back. The Palacio de la Conquista, built by Pizarro’s half-brother, has busts of Francisco Pizarro and the Inca princess Inés Yupanqui on the corner, and their daughter, on the facade.',
    'The town above the square is medieval and nearly empty, running up to a Moorish castle with a cistern and a view over the dehesa in every direction. The contrast between the grandeur of the square and the plainness of the upper town is the story.'
  ],
  see: [
    { n: 'Plaza Mayor',
      d: 'Irregular, on several levels, with the Pizarro equestrian statue in the middle, which was originally cast as Hernán Cortés and sold to Trujillo when Mexico declined it.' },
    { n: 'Palacio de la Conquista',
      d: 'The corner busts, with the Pizarro coat of arms showing Atahualpa’s ransom. The family’s own account of what they did, carved in stone.' },
    { n: 'The castle',
      d: 'Tenth-century Almohad, with an enormous cistern and walls you can walk. Storks on every tower.' },
    { n: 'The upper town',
      d: 'Santa María la Mayor with a Fernando Gallego altarpiece and the tombs of the Pizarro family, and a climb up the tower.' },
    { n: 'The cheese fair', t: 'late April or early May',
      d: 'Two hundred-odd producers from across Spain in the main square. One of the best food events in the country.' },
    { n: 'The dehesa',
      d: 'Oak pasture in every direction, with black Iberian pigs under the trees from October when the acorns fall.' }
  ],
  when: 'Spring and autumn. The cheese fair is the first weekend of May.',
  stay: 'A night.',
  move: 'A car. Forty-five minutes from Cáceres, three hours from Madrid.',
  eat: 'Iberian ham, Torta del Casar, migas, and lamb. The dehesa is the reason all of it is good.'
},

'EXT-guadalupe': {
  intro: [
    'The monastery at Guadalupe was the most important pilgrimage site in Spain before Santiago overtook it, and it was the Catholic monarchs’ own foundation of choice. Columbus signed his capitulations here in 1492, the first Native Americans brought back to Europe were baptised in the font in the church, and the Virgin of Guadalupe became the name given to the Mexican apparition in 1531, which is why the connection runs both ways across the Atlantic.',
    'The building is a mixture of everything: Mudéjar cloister, Gothic church, Baroque sacristy. The sacristy holds eight paintings by Zurbarán, painted for that room, still hanging where he put them, which is extremely rare and makes it the only intact Zurbarán ensemble anywhere.',
    'The Virgin herself is a small dark cedar figure, probably twelfth century, kept in a camarín behind the altar on a revolving throne. You go up behind the retable and the statue is turned to face you.'
  ],
  see: [
    { n: 'The Zurbarán sacristy',
      d: 'Eight canvases of Hieronymite monks, painted between 1638 and 1647 for this room and never moved. The best thing in Extremadura.' },
    { n: 'The camarín',
      d: 'Up a stair behind the altar, where the Virgin is turned on her throne. A short guided visit and the only way to see her.' },
    { n: 'The Mudéjar cloister',
      d: 'Fourteenth century, with a brick and tile pavilion in the middle that is unlike anything else in Spanish monastic architecture.' },
    { n: 'The embroidery museum',
      d: 'Vestments worked by the monks over four centuries, with gold thread on velvet at a density that has to be seen.' },
    { n: 'The illuminated choir books',
      d: 'Around ninety enormous volumes, several open at a time.' },
    { n: 'The Villuercas geopark',
      d: 'The hills around, a UNESCO geopark of quartzite ridges and Palaeozoic fossils, with good walking and almost no one.' }
  ],
  when: 'Spring and autumn. 8 September is the Virgin’s feast and the town fills.',
  stay: 'A night in the monastery guest house, which is in the old building.',
  move: 'A car. Two and a half hours from Madrid on slow roads through the hills.',
  eat: 'Monastery cooking in the guest house. Morcilla de Guadalupe, and the local caldereta of kid.'
},

'EXT-monfrague': {
  intro: [
    'Monfragüe is a quartzite ridge where the Tagus and the Tiétar meet, with Mediterranean scrub and dehesa around it, and it holds the densest population of cinereous vultures anywhere in the world: something over seven hundred pairs in an area of about eighteen thousand hectares.',
    'It also has Spanish imperial eagles, which are one of the rarest raptors in Europe and were down to around fifty pairs in the 1960s, black storks, Egyptian vultures, Bonelli’s eagles and eagle owls. Birders come from across the continent and the park is organised around them.',
    'The Salto del Gitano is a quartzite cliff rising straight out of the Tagus opposite a road-level viewpoint, with several hundred griffon vultures nesting on it. You stand at the railing and watch birds at eye level and below you at a distance of a few dozen metres.'
  ],
  see: [
    { n: 'Salto del Gitano',
      d: 'A roadside viewpoint opposite the cliff. Dawn and the hour before dusk are best, but the birds are there all day. Take binoculars.' },
    { n: 'Castillo de Monfragüe',
      d: 'A short steep climb to a ruined castle on the ridge with a chapel, giving the whole park and the two rivers.' },
    { n: 'La Tajadilla and Portilla del Tiétar',
      d: 'Two more viewpoints, the latter good for eagle owls at dusk and for the imperial eagles.' },
    { n: 'The dehesa',
      d: 'Oak pasture around the park, which is the habitat that supports everything, and which is a managed agricultural system around two thousand years old.' },
    { n: 'The Fiesta de las Aves', t: 'late February or March',
      d: 'A birding fair at Villarreal de San Carlos with guided outings.' },
    { n: 'Rock art',
      d: 'About a hundred shelters with prehistoric paintings in the park, several of which can be visited with a guide.' }
  ],
  when: 'February to May is best: the birds are breeding, the dehesa is green and the heat has not arrived. Summer is forty degrees and the birds are inactive.',
  stay: 'Two nights at Villarreal de San Carlos or Torrejón el Rubio.',
  move: 'A car. Forty-five minutes north of Cáceres.',
  eat: 'Simple village cooking in Torrejón. Iberian pork, migas and local cheese.'
},

'EXT-la-vera': {
  intro: [
    'La Vera is a line of valleys on the southern slope of the Sierra de Gredos, where streams called gargantas come off the mountain through granite and form pools deep enough to swim in. The villages are timber-framed with overhanging upper floors, which is unusual this far south and comes from the oak and chestnut on the slopes.',
    'This is where Spanish smoked paprika comes from. Pimentón de la Vera is dried over oak smoke for a fortnight rather than sun-dried, which is why it tastes of smoke and why chorizo tastes of what it tastes of. The designation covers only these valleys.',
    'Charles V, who had ruled an empire from the Netherlands to Peru, abdicated in 1556 and retired to the monastery at Yuste, where he spent his last two years with gout, a hundred clocks and a view down the valley. He died in 1558 in a room with a door opening onto the altar so he could hear mass from bed, which his son Philip copied at the Escorial.'
  ],
  see: [
    { n: 'Monasterio de Yuste',
      d: 'The imperial apartments, plain and small, with the chair he used for his gout and the door to the church. The gardens and the pool below are part of the visit.' },
    { n: 'The gargantas',
      d: 'Natural pools on the mountain streams at Jaraíz, Losar and especially the Garganta de los Infiernos at Jerte next door. Cold, granite-floored and the local summer.' },
    { n: 'Cuacos de Yuste and Valverde',
      d: 'Timber-framed villages with balconies and water channels down the middle of the lanes.' },
    { n: 'Pimentón',
      d: 'The drying sheds work in October and November and the smoke is everywhere. A museum at Jaraíz explains it and several producers sell at the door.' },
    { n: 'The Jerte cherry blossom', t: 'late March into April',
      d: 'The next valley east, with around a million and a half cherry trees flowering at once over about ten days. The dates are announced and the valley fills.' },
    { n: 'Garganta la Olla',
      d: 'A village with a sixteenth-century house painted blue that was, by tradition, the brothel for Charles V’s retinue.' }
  ],
  when: 'Late March for the Jerte blossom, summer for the pools, autumn for the paprika and the chestnuts.',
  stay: 'Two nights.',
  move: 'A car. Two and a half hours from Madrid.',
  eat: 'Anything with pimentón in it. Patatera, a paprika pork spread. Cherries in June, and goat from the sierra.'
},

'EXT-zafra': {
  intro: [
    'Zafra has an alcázar built in 1437 by the Dukes of Feria, with nine round towers and a Renaissance marble courtyard added later by Juan de Herrera, the architect of the Escorial. It is now a parador, so you can walk into the courtyard and have a drink in it without staying.',
    'The town has two arcaded squares opening into each other through an arch, the Plaza Grande and the Plaza Chica, which were the sixteenth and fifteenth-century markets. A measuring rod, the vara de Zafra, is still set into the wall of the smaller one, which merchants used to check cloth.',
    'It is called little Seville locally, which is overstating it, and it sits in the middle of the dehesa with the Jabugo and Jerez pig country to the south. The September livestock fair has run since 1453 and is still a working agricultural event rather than a festival.'
  ],
  see: [
    { n: 'The alcázar and the Herrera courtyard',
      d: 'White marble, two tiers of arcading, and a chapel with a star vault. Open to non-residents.' },
    { n: 'Plaza Grande and Plaza Chica',
      d: 'Linked by the Arquillo del Pan. The vara measuring rod is on the wall of the smaller square.' },
    { n: 'The Feria de San Miguel', t: 'early October',
      d: 'Livestock, machinery and Iberian pigs, with a serious trade in breeding stock. Running since the fifteenth century.' },
    { n: 'Santa María de la Candelaria',
      d: 'With nine Zurbarán panels in the retable of the chapel, which is an unexpected thing to find in a parish church.' },
    { n: 'The dehesa',
      d: 'Oak pasture in every direction. The montanera, when the pigs are turned out for the acorns, runs from October to February.' },
    { n: 'Jerez de los Caballeros',
      d: 'Forty minutes southwest, a walled town with four Baroque towers, where Vasco Núñez de Balboa was born and where the Templars were besieged in 1312.' }
  ],
  when: 'Spring and autumn. Early October for the fair.',
  stay: 'A night at the parador.',
  move: 'A car. An hour south of Mérida on the Vía de la Plata.',
  eat: 'Iberian ham and pork from the surrounding dehesa, Torta del Casar, and the Ribera del Guadiana wines.'
},

'NAV-pamplona': {
  intro: [
    'For fifty-one weeks a year Pamplona is a prosperous, walled Navarrese city of two hundred thousand people with excellent food and almost no visitors. For the other week it holds San Fermín, and the population roughly doubles.',
    'The encierro runs at eight every morning from 7 to 14 July: six bulls and six steers are released from a corral and driven eight hundred and seventy-five metres through the old streets to the bullring, which takes between two and four minutes. Runners go in front of them. Sixteen people have been killed since records began in 1910 and injuries happen every year.',
    'Hemingway came in 1923, came back eight more times, and published The Sun Also Rises in 1926, which turned a regional festival into an international one. The city has a complicated relationship with him: there is a statue, and there is also a widespread view that he ruined it.'
  ],
  see: [
    { n: 'The encierro', t: '7 to 14 July, 8am',
      d: 'Watch from a balcony or the bullring rather than running. The Estafeta straight and the Curva de Mercaderes are where it goes wrong. Running requires experience, sobriety and a willingness to accept the consequences.' },
    { n: 'The chupinazo', t: 'noon on 6 July',
      d: 'The opening rocket from the town hall balcony, with the square packed and everyone in white with a red scarf. Sangria is thrown. It is chaos.' },
    { n: 'The citadel',
      d: 'A pentagonal star fort of 1571, one of the best Renaissance military works in Europe, now a park with the bastions intact.' },
    { n: 'The cathedral',
      d: 'Gothic with a neoclassical front, holding the alabaster tomb of Charles III of Navarre and a cloister that is among the best Gothic cloisters in Spain.' },
    { n: 'Pintxos on Calle Estafeta',
      d: 'Which is the encierro route, and which for the rest of the year is a street of excellent bars.' },
    { n: 'The Camino',
      d: 'Pamplona is the first substantial city on the Camino Francés, three days from Saint-Jean, and pilgrims arrive through the Portal de Francia.' }
  ],
  when: '6 to 14 July if you want San Fermín, with accommodation booked a year ahead at several times the price. Any other time if you do not.',
  stay: 'Two nights, or the full week in July.',
  move: 'Train from Madrid or Barcelona, about three hours. Small airport.',
  eat: 'Navarrese vegetables, which are taken seriously: white asparagus, piquillo peppers, artichokes, borage. Chistorra, a fast-cured sausage. Navarra rosé.'
},

'NAV-bardenas': {
  intro: [
    'The Bardenas Reales is forty-two thousand hectares of clay, chalk and sandstone badlands in southern Navarre, with no permanent inhabitants and almost no vegetation. It looks like Utah and it is two hours from the Pyrenees.',
    'It exists because the material is soft and the rainfall, though low, comes in violent bursts that cut gullies faster than plants can hold the ground. The isolated pinnacles, called cabezos, are harder caps protecting the clay beneath them. Castildetierra is the famous one and it is visibly eroding.',
    'It has been common grazing land since the Middle Ages, with rights held by valleys and monasteries, and the transhumant flocks still come down in September. Part of it is also an air force bombing range, which is closed and signed, and which has been the subject of long local opposition.'
  ],
  see: [
    { n: 'Castildetierra',
      d: 'The signature pinnacle, reached by a short walk from the main track. Sunrise and sunset are when the clay goes orange.' },
    { n: 'The Bardena Blanca',
      d: 'The central white clay basin, which is the most Martian part and which holds most of the cabezos.' },
    { n: 'Cycling',
      d: 'A well-marked circuit of about thirty-four kilometres on gravel tracks, which is the best way to see it. Hire in Arguedas.' },
    { n: 'The Alto de Aguilares',
      d: 'A viewpoint on the rim giving the whole basin, with the Pyrenees visible to the north on a clear day.' },
    { n: 'The transhumance', t: 'mid-September',
      d: 'Flocks arriving from the Roncal valley for the winter grazing, which has happened on the same dates for centuries.' },
    { n: 'The rules',
      d: 'Vehicles are restricted to marked tracks, the park closes in heavy rain because the clay becomes impassable, and the military zone is enforced.' }
  ],
  when: 'Spring and autumn. Summer is forty degrees with no shade whatsoever and winter brings fog and mud.',
  stay: 'Half a day.',
  move: 'A car to the Arguedas entrance. Ninety minutes from Pamplona.',
  eat: 'Arguedas and Tudela nearby, where the Ribera vegetables are the best in Spain. Cogollos de Tudela, artichokes, and the local lamb.'
},

'NAV-olite': {
  intro: [
    'Charles III of Navarre built this between 1387 and 1419 and it was less a fortress than a display: fifteen towers, hanging gardens, an aviary with exotic birds, a lion pit, and a chamber with a roof that could be flooded to make artificial snow for cooling. A French chronicler wrote that there was no king with a finer castle.',
    'It burned in 1813, set alight by Espoz y Mina to stop the French using it, and was a ruin for a century. The reconstruction between 1937 and 1967 was heavy-handed by modern standards and is now itself historic, so what you see is a castle rebuilt in the image of what people in the 1940s thought a castle should look like.',
    'That said, the towers are climbable, the connections between them run along the walls, and the whole thing is genuinely enjoyable to explore. The medieval sections that survived the fire, including the Galería Dorada, are clearly distinguishable from the rebuilt parts.'
  ],
  see: [
    { n: 'The towers',
      d: 'Several are climbable and linked by wall walks. The Torre del Homenaje gives the Ribera plain and the vineyards.' },
    { n: 'The hanging gardens',
      d: 'Replanted on the terrace where Charles III had soil carried up to grow a garden at height.' },
    { n: 'Santa María la Real',
      d: 'Beside the castle, with a Gothic portal of carved stone that was the royal chapel.' },
    { n: 'The medieval festival', t: 'mid-August',
      d: 'A market and re-enactment that fills the whole town, done with more commitment than most.' },
    { n: 'The wine',
      d: 'Olite is the centre of the Navarra DO, historically known for rosé and increasingly for red. The Museo del Vino is in a palace beside the castle.' },
    { n: 'Ujué',
      d: 'Twenty minutes east, a fortified hill village with a church containing the heart of Charles II and a view over half of Navarre.' }
  ],
  when: 'Spring and autumn. The medieval festival is in August and the town is full.',
  stay: 'Half a day, or a night in the parador, which is part of the old castle.',
  move: 'A car. Forty minutes south of Pamplona.',
  eat: 'Navarrese vegetables, lamb, and the local rosé, which is dry and far better than the reputation of rosé generally.'
},

'NAV-irati': {
  intro: [
    'The Selva de Irati is around seventeen thousand hectares of beech and silver fir on the Navarrese side of the Pyrenees, which makes it the second largest forest of its kind in Europe after the Black Forest. It was never cleared, partly because it was remote and partly because the Spanish navy reserved the timber for masts in the eighteenth century.',
    'The window for the autumn colour is short and specific. The beech turns from the end of October through the first ten days of November, and in that fortnight the forest goes copper and gold and the access roads fill. Outside it the forest is green and almost empty.',
    'There are two main entrances, Orbaizeta to the west and Ochagavía to the east, and they are not connected by road inside the forest. You pick one. The Irabia reservoir sits between them with a marked loop round it.'
  ],
  see: [
    { n: 'The beech in autumn', t: 'late October to 10 November',
      d: 'Parking is capped and charged at both entrances and fills by nine on weekends. Weekdays are considerably better.' },
    { n: 'Embalse de Irabia',
      d: 'A loop of about ten kilometres round the reservoir through the forest, which is the standard walk and is easy.' },
    { n: 'Ochagavía',
      d: 'A stone village on the Salazar with a bridge and a visitor centre, which is the eastern base and the prettier of the two.' },
    { n: 'The Orbaizeta arms factory',
      d: 'A royal munitions works of 1784 in the forest at the western entrance, now a ruin being slowly consolidated, which is a strange thing to find among the beeches.' },
    { n: 'The Larra-Belagua pass',
      d: 'North of Ochagavía, with karst plateau, and the highest road in Navarre.' },
    { n: 'The Almadías', t: 'late April or early May',
      d: 'A re-enactment at Burgui of the log rafts that took Irati timber down the Esca to the Ebro, with rafts actually built and run.' }
  ],
  when: 'Late October and early November for the colour. June to September for walking. Snow closes the roads in winter.',
  stay: 'Two nights in Ochagavía.',
  move: 'A car. Two hours from Pamplona on mountain roads.',
  eat: 'Roncal cheese from the next valley, which is a hard sheep cheese with a designation. Migas de pastor, and trout from the Salazar.'
},

'NAV-roncesvalles': {
  intro: [
    'On 15 August 778 the rearguard of Charlemagne’s army, returning from a failed expedition to Zaragoza, was ambushed in a pass in these mountains by Basques angry at the sacking of Pamplona. Among the dead was a Frankish officer named Roland, about whom almost nothing is known.',
    'Three hundred years later the Chanson de Roland turned that skirmish into an epic in which Roland fights an enormous Saracen army, refuses to blow his horn for help until it is too late, and dies a martyr. It is the oldest major work of French literature and it is about a small defeat by Christians.',
    'For walkers Roncesvalles is where the Camino Francés arrives after the first stage from Saint-Jean-Pied-de-Port, which is twenty-five kilometres and about twelve hundred metres of ascent over the Pyrenees, and which is widely considered the hardest day of the whole route. The collegiate church has run a pilgrim hostel continuously since 1127.'
  ],
  see: [
    { n: 'The Colegiata',
      d: 'A thirteenth-century Gothic church with a silver-plated Virgin, built in a French style because Navarre looked north. The pilgrim blessing is said at the evening mass.' },
    { n: 'The pilgrim hostel',
      d: 'Modernised in 2011 to a high standard, with a hundred and eighty-three beds in a twelfth-century building. Open to anyone walking with a credencial.' },
    { n: 'The Silo de Carlomagno',
      d: 'A twelfth-century ossuary, said without evidence to hold the bones of the dead of 778.' },
    { n: 'The Route Napoléon',
      d: 'The high crossing from Saint-Jean over the Lepoeder pass at 1,450 metres, which is closed in winter and has killed unprepared walkers. The Valcarlos alternative is lower.' },
    { n: 'The Ibañeta pass',
      d: 'A kilometre up the road, with a chapel and a monument to Roland. The traditional site of the ambush, though the location is argued.' },
    { n: 'The beech forest',
      d: 'The Camino descends through it towards Burguete, which is where Hemingway went fishing, and it is the best stretch of the first three days.' }
  ],
  when: 'April to October. The Route Napoléon is officially closed from November to March and people are rescued off it every year.',
  stay: 'A night, which is what pilgrims do.',
  move: 'A car or a bus from Pamplona, about an hour.',
  eat: 'The pilgrim menu at the two hostels. Burguete, three kilometres on, has better.'
},

'NAV-estella': {
  intro: [
    'Estella was founded in 1090 specifically to serve the Camino, which is unusual: most towns on the route grew into the role and this one was created for it by Sancho Ramírez, who brought in Frankish settlers to run the trade.',
    'The result is a concentration of Romanesque in a small town: the palace of the kings of Navarre, which is the only surviving Romanesque civil building in Navarre, San Pedro de la Rúa with a cloister whose capitals are exceptional, and San Miguel with a carved north door.',
    'Three kilometres along the Camino at Irache is the thing most walkers actually remember: a wine fountain on the wall of a bodega, with two taps, one water and one red wine, free for pilgrims. It dispenses about a hundred litres a day and there is a webcam.'
  ],
  see: [
    { n: 'San Pedro de la Rúa',
      d: 'Up a long flight of steps, with a cloister whose remaining two sides have capitals carved with the lives of saints and a column of four intertwined shafts.' },
    { n: 'The wine fountain at Irache',
      d: 'Three kilometres on the Camino. One glass is the convention and the sign says so.' },
    { n: 'The Palacio de los Reyes de Navarra',
      d: 'Twelfth century, with a capital showing Roland fighting the giant Ferragut, and a museum of the painter Gustavo de Maeztu inside.' },
    { n: 'Monasterio de Irache',
      d: 'Beside the fountain, a Benedictine house with a Romanesque church, a Renaissance cloister and a short-lived university.' },
    { n: 'Ujué',
      d: 'Forty minutes southeast, a fortified hill village which holds a barefoot pilgrimage on the Sunday after St Mark in April.' },
    { n: 'Puente la Reina',
      d: 'Twenty minutes east, where the Aragonese and French routes join, with a six-arched pilgrim bridge of the eleventh century.' }
  ],
  when: 'April to October, which is the Camino season. The Estella holy week processions are serious.',
  stay: 'A night.',
  move: 'A car or bus from Pamplona, forty-five minutes.',
  eat: 'Navarrese vegetables, gorrín, and the Navarra and Rioja wines, since the boundary runs close by.'
},

'MUR-cartagena': {
  intro: [
    'Hasdrubal founded Qart Hadasht here in 227 BC as the Carthaginian capital in Spain, and Hannibal set out from it for Italy. Scipio took it in 209 BC in an assault across a lagoon at low tide, which effectively ended Carthaginian power in the peninsula. The harbour is one of the best natural ones in the Mediterranean and has been a naval base ever since.',
    'The Roman theatre was found in 1988 during work on a craft centre, under the cathedral, under a market, under a medieval quarter. It seated around six thousand and nobody had any idea it was there. The excavation took until 2003 and Rafael Moneo built a museum that takes you from the waterfront up through the layers and out into the auditorium.',
    'The city is also remarkable for modernisme, which is unexpected this far from Catalonia. Mining money at the end of the nineteenth century paid for a set of buildings by Víctor Beltrí, who worked in a Catalan style, and the Calle Mayor has several of them.'
  ],
  see: [
    { n: 'The Roman theatre and Moneo’s museum',
      d: 'The route runs from the harbour through a tunnel and up through the archaeological layers before you emerge above the cavea. One of the best museum sequences in Spain.' },
    { n: 'The Punic wall',
      d: 'A stretch of Carthaginian defensive wall from the third century BC, which is almost the only Punic architecture surviving in the western Mediterranean.' },
    { n: 'The Casa de la Fortuna',
      d: 'A Roman house with mosaics and painted walls, shown in situ below street level.' },
    { n: 'The Castillo de la Concepción and the lift',
      d: 'A panoramic lift from the old town to the castle hill, with the harbour and the whole excavated city below.' },
    { n: 'The modernista route',
      d: 'Casa Cervantes, Casa Llagostera and the Gran Hotel, all by Beltrí, within a few hundred metres on Calle Mayor.' },
    { n: 'The Peral submarine',
      d: 'Isaac Peral built the first fully electric battery-powered submarine here in 1888. The navy rejected it; the boat is on display at the Naval Museum.' }
  ],
  when: 'Spring and autumn. The Carthaginians and Romans festival in late September is a ten-day re-enactment with encampments and it is enormous.',
  stay: 'Two nights.',
  move: 'A car or train from Murcia. Cruise ships dock in the middle of the city, which affects how busy the old town is on any given day.',
  eat: 'Caldero, a rice cooked in fish broth from the Mar Menor and served with alioli. Michirones, broad beans with chorizo and ham.'
},

'MUR-mar-menor': {
  intro: [
    'The Mar Menor is a hundred and seventy square kilometres of lagoon, separated from the Mediterranean by a sand bar twenty-two kilometres long and in places a few hundred metres wide. It is the largest saltwater lagoon in Europe, saltier than the sea beside it, nowhere deeper than about seven metres, and several degrees warmer.',
    'That shallowness made it a resort: you can wade a long way out, the water is calm, and it has been used therapeutically since the Romans. It also makes it extremely fragile.',
    'In October 2019 and again in August 2021, nitrate runoff from the intensive agriculture of the Campo de Cartagena produced algal blooms, the oxygen collapsed, and several tonnes of dead fish washed up. In 2022 the Spanish parliament granted the lagoon legal personhood, the first ecosystem in Europe to be given it, after a citizens’ petition gathered over six hundred thousand signatures. Recovery is partial and contested.'
  ],
  see: [
    { n: 'The lagoon',
      d: 'Calm, shallow, warm, and good for beginners at sailing and windsurfing. Water quality varies and is monitored; check before swimming.' },
    { n: 'La Manga',
      d: 'The sand bar, built up along almost its entire length from the 1960s, which is a case study in what unrestrained coastal development does. Worth seeing for that reason.' },
    { n: 'Los Alcázares and the mud',
      d: 'Mud baths at Lo Pagán, where people coat themselves in lagoon mud, dry in the sun and wash it off. Free and entirely public.' },
    { n: 'Salinas de San Pedro',
      d: 'Working salt pans at the northern end with flamingos and a regional park, which is the best bird site in Murcia.' },
    { n: 'Isla Mayor',
      d: 'The largest of five volcanic islands in the lagoon, reachable by kayak, uninhabited and protected.' },
    { n: 'The politics',
      d: 'Worth understanding before visiting. The conflict between the irrigated agriculture that feeds much of northern Europe in winter and the lagoon is unresolved.' }
  ],
  when: 'May, June, September. The water is warm enough to swim from April to November. August is busy and is also when blooms have occurred.',
  stay: 'Two nights.',
  move: 'A car. Thirty minutes from Cartagena or Murcia. Corvera airport is twenty-five minutes.',
  eat: 'Caldero del Mar Menor, and the local gilt-head bream, which is farmed and fished here. Murcian vegetables from the Campo de Cartagena.'
},

'MUR-murcia-city': {
  intro: [
    'Murcia was founded in 825 by order of the emir of Córdoba, on a bend of the Segura, and the huerta around it is an irrigated market garden laid out by the same Moorish engineering: a network of acequias, channels, with a water court that still meets to settle disputes. Murcia and Valencia are the two cities in Spain where that medieval institution survives.',
    'That huerta is why half of Europe eats Spanish lettuce in January. The province exports something like two and a half million tonnes of fruit and vegetables a year, which is also the source of the water conflict that runs through Murcian politics.',
    'The cathedral facade is a Baroque composition by Jaime Bort from the 1750s that reads less like a wall than a vast altarpiece pushed outside. The bell tower beside it is ninety-three metres and took two centuries, so it changes style twice as it goes up.'
  ],
  see: [
    { n: 'The cathedral facade',
      d: 'Best at sunset when it is lit from the side and the depth of the carving shows. The Capilla de los Vélez inside has a late Gothic vault of extraordinary complexity.' },
    { n: 'Museo Salzillo',
      d: 'Francisco Salzillo carved polychrome processional figures in the eighteenth century, and this museum holds the pasos that still go out on Good Friday morning, plus a nativity of around five hundred and fifty figures.' },
    { n: 'Semana Santa',
      d: 'Unusual in Spain for being colourful rather than sombre, with the nazarenos handing out sweets and broad beans to the crowd as they process.' },
    { n: 'The Real Casino',
      d: 'An 1847 gentlemen’s club on the main street with a Moorish patio copied from the Alhambra, a Pompeian courtyard and a ballroom. Open to visitors.' },
    { n: 'The huerta',
      d: 'The Mirador de la Huerta and the restored waterwheel at Alcantarilla explain the irrigation system, which is a thousand years old and still running.' },
    { n: 'Bando de la Huerta',
      d: 'The Tuesday after Easter, when the whole city dresses in huertano costume and eats in the street. It is bigger locally than Semana Santa.' }
  ],
  when: 'Spring and autumn. Murcia is among the hottest cities in Spain in July and August.',
  stay: 'A night.',
  move: 'AVE from Madrid in about three hours. Corvera airport thirty minutes out.',
  eat: 'Marinera, a doughnut-shaped breadstick with salad and an anchovy on it, which is the Murcian tapa. Zarangollo, paparajotes, which are lemon leaves in batter where you eat the batter and discard the leaf.'
},

'MUR-sierra-espuna': {
  intro: [
    'In the 1880s the Sierra de Espuña was bare rock. Centuries of grazing and charcoal burning had stripped it, and the runoff flooded the towns below. A forestry engineer named Ricardo Codorníu spent thirty years replanting it with Aleppo pine, and the result is around seventeen thousand hectares of forest on what had been desert.',
    'It was one of the earliest large-scale reforestation projects in Europe and it is why there is a protected park in the driest region of Spain. Codorníu is commemorated by a monument on the ridge and is still referred to locally as the apostle of the tree.',
    'The other thing on the mountain is the pozos de nieve: twenty-six circular stone wells, up to twenty metres across, built in the sixteenth century to pack snow in winter. The ice was cut out in summer, wrapped in straw and carried down by mule to Murcia, Cartagena and as far as Alicante.'
  ],
  see: [
    { n: 'The pozos de nieve',
      d: 'Reached on a marked walk from the Collado Bermejo, about two hours round, with several of the wells restored and one you can go into.' },
    { n: 'Morrón de Espuña',
      d: 'The summit at 1,583 metres, with a road most of the way and a view over the whole province to the sea.' },
    { n: 'The barbary sheep',
      d: 'Introduced from North Africa in 1970 for hunting and now numerous, which is an ecological problem and makes them easy to see.' },
    { n: 'The Valle de Leiva',
      d: 'A steep-sided valley with the best walking, and a visitor centre at Ricardo Codorníu.' },
    { n: 'Aledo and Totana',
      d: 'Villages at the foot, Aledo with a thirteenth-century tower and Totana with a pottery tradition.' },
    { n: 'Cycling',
      d: 'The road over the sierra is a long steady climb used by Spanish teams in winter and is almost traffic-free.' }
  ],
  when: 'Spring and autumn. Summer is hot though the pine gives shade. Snow falls on the top a few days a year.',
  stay: 'A night at Alhama or El Berro.',
  move: 'A car. Forty-five minutes from Murcia.',
  eat: 'Migas, rice with rabbit and snails, and the Totana tomatoes. Bullas wine from the next valley, which is Monastrell.'
},

'RIO-haro': {
  intro: [
    'When the railway reached Haro in 1880 and phylloxera was destroying the French vineyards, Bordeaux merchants came south looking for wine. They found it here, taught the locals barrel ageing, and a cluster of wineries was built around the new station so the barrels had the shortest possible journey.',
    'That cluster is the Barrio de la Estación, and it is the densest concentration of century-old wineries anywhere in the world: seven of them within walking distance, including López de Heredia, CVNE, Muga and La Rioja Alta, several still family-owned and still doing things the way they did in 1890.',
    'López de Heredia is the one to see. Founded in 1877, it has never changed its method: whole-bunch fermentation in wooden vats, ageing for up to ten years in barrel, and a cellar floor covered in a black fungus that lives on alcohol vapour. Their Viña Tondonia white is released after a decade and tastes like nothing else.'
  ],
  see: [
    { n: 'The Barrio de la Estación',
      d: 'Seven bodegas on foot. Book tours individually; most need a few days’ notice and López de Heredia needs more.' },
    { n: 'López de Heredia',
      d: 'The cellar, the cooperage where they still make their own barrels, and a tasting pavilion designed by Zaha Hadid wrapped around their 1910 exhibition stand.' },
    { n: 'The cellars',
      d: 'Several run for kilometres under the town, hand-dug, at a constant twelve degrees with the fungus on the walls.' },
    { n: 'Batalla del Vino', t: '29 June',
      d: 'Several thousand people in white walk up to the Riscos de Bilibio and throw red wine over each other with buckets and water pistols. Around fifty thousand litres are used.' },
    { n: 'The old town',
      d: 'Plaza de la Paz and the Herradura, a horseshoe of tapas bars which is where the town drinks.' },
    { n: 'Briones',
      d: 'Fifteen minutes away, a hill village with the Vivanco museum of wine culture, which is one of the best wine museums in the world.' }
  ],
  when: 'September and October for harvest. 29 June for the wine battle. Spring is green and quiet.',
  stay: 'Two nights.',
  move: 'A car. Forty minutes from Logroño, an hour from Bilbao.',
  eat: 'Lamb chops grilled over vine cuttings, which is the Riojan dish. Patatas a la riojana. Pimientos del piquillo.'
},

'RIO-logrono': {
  intro: [
    'Calle Laurel is about two hundred metres long and has around sixty bars on it, and the convention is that each one makes one thing. You order that thing and a small glass of wine, eat it standing, and move to the next door.',
    'The rules are specific. At Bar Soriano you have the mushroom skewer, which they have been making since 1973 and which is grilled champignons stacked on bread with a prawn on top. At Blanco y Negro you have the matrimonio, anchovy two ways. At Ángel you have the patatas bravas. Asking for anything else marks you out.',
    'Logroño is also a Camino stage town, which means a steady stream of walkers arriving every afternoon from Navarrete and heading for Nájera, and a certain tolerance for people eating a great deal.'
  ],
  see: [
    { n: 'Calle Laurel',
      d: 'From about eight in the evening. One pincho and one glass per bar. Five or six bars is dinner and the whole thing costs very little.' },
    { n: 'Calle San Juan',
      d: 'The parallel street, slightly less frantic, where locals go when Laurel is full.' },
    { n: 'The Camino through town',
      d: 'Marked with bronze shells in the pavement, past the fountain where a woman called Doña Felicia has handed out stamps and figs for decades.' },
    { n: 'Santa María de Palacio and San Bartolomé',
      d: 'A spire called the Aguja and a fourteenth-century Gothic portal with carved stone that is the best in the city.' },
    { n: 'The Ebro bridges',
      d: 'Including the Puente de Piedra, which pilgrims cross entering the city, and a riverside park.' },
    { n: 'The Rioja Alta wineries',
      d: 'Haro and the Rioja Alavesa are both within forty minutes, which makes Logroño a practical base with somewhere good to eat at the end of the day.' }
  ],
  when: 'Year round. San Mateo in the third week of September is the harvest festival, with the first grapes trodden on a platform in front of the cathedral.',
  stay: 'Two nights.',
  move: 'Train from Madrid or Zaragoza. Small airport. The old town is compact.',
  eat: 'Calle Laurel, and then Rioja by the glass. Also lamb, white asparagus from the Ebro, and the local pochas, fresh white beans.'
},

'RIO-san-millan': {
  intro: [
    'In the tenth or eleventh century a monk at Suso was reading a Latin collection of homilies and, where the Latin defeated him, wrote notes in the margin in the language he actually spoke. Those notes, the Glosas Emilianenses, are among the earliest written traces of Castilian Spanish and include a short prayer that is sometimes called the first sentence in the language.',
    'There is also Basque in the margins, which makes the manuscript a document of two languages at once, and the Basque glosses are among the oldest surviving in that language too. The manuscript itself is now in Madrid; what is here is the monastery where it was written.',
    'Suso, the upper monastery, is partly cut into the rock and partly Mozarabic, from a hermitage where Saint Aemilianus lived in the sixth century. Yuso, the lower one, is an enormous sixteenth-century house built when the community moved down the hill. Both are UNESCO listed.'
  ],
  see: [
    { n: 'Suso', t: 'booked, shuttle bus only',
      d: 'The old monastery, reached by a minibus from Yuso with capped numbers. Mozarabic horseshoe arches, caves in the rock, and the tombs of the seven infantes of Lara.' },
    { n: 'Yuso',
      d: 'The lower monastery, guided, with a library of three hundred manuscripts, an ivory reliquary and a sacristy of painted cupboards.' },
    { n: 'The Glosas',
      d: 'Explained at both sites. A facsimile is shown; the original is in the Real Academia de la Historia in Madrid.' },
    { n: 'The Gonzalo de Berceo connection',
      d: 'The first Castilian poet known by name was a monk here in the thirteenth century, which makes this the birthplace of the language twice over.' },
    { n: 'The Cárdenas valley',
      d: 'Oak and beech, with the monasteries in the middle of it and almost nothing else.' },
    { n: 'Santo Domingo de la Calzada',
      d: 'Twenty-five minutes north on the Camino, where the cathedral keeps a live cock and hen in a coop inside the church to commemorate a miracle.' }
  ],
  when: 'Spring to autumn. Suso closes on Mondays and in January. Book the shuttle ahead.',
  stay: 'Half a day, or a night at the Yuso hostería.',
  move: 'A car. Forty-five minutes from Logroño.',
  eat: 'The hostería at Yuso. Rioja Alta wines from down the valley, and lamb.'
},

'RIO-dinosaur-trails': {
  intro: [
    'Around a hundred and twenty million years ago this was lakeshore mud at the edge of a shallow basin. Dinosaurs walked across it, the prints dried, were buried, turned to rock, and were then tilted and exposed by erosion. There are over ten thousand individual prints across the eastern Rioja and the Soria border, at something like a hundred and sixty sites.',
    'The density is among the highest anywhere in the world. Some slabs carry trackways running for tens of metres, which means you can follow the path of a single animal and work out its stride length and from that its speed.',
    'Enciso is the centre of it, with a visitor centre and life-size reconstructions on the hillsides, which are more fun than they are dignified. The sites themselves are mostly open hillsides reached down short paths, free, unstaffed and unfenced.'
  ],
  see: [
    { n: 'Valdecevillo',
      d: 'Beside the road at Enciso, with theropod and ornithopod trackways on a tilted slab and reconstructions beside it.' },
    { n: 'La Virgen del Campo',
      d: 'The largest site, with hundreds of prints including a set interpreted as a predator following a herbivore, and drag marks from a tail.' },
    { n: 'Centro Paleontológico de Enciso',
      d: 'The interpretation centre, which explains how a footprint becomes a fossil and how to read a trackway.' },
    { n: 'Munilla and Préjano',
      d: 'Further sites up the valley, including one with a pterosaur print, which is far rarer than dinosaur tracks.' },
    { n: 'The Cameros valleys',
      d: 'A nearly depopulated upland of abandoned villages and transhumant pasture, which is as empty as anywhere in Spain.' },
    { n: 'Arnedillo',
      d: 'Twenty minutes down the valley, with free hot springs beside the river and a griffon vulture colony on the cliffs above it.' }
  ],
  when: 'Spring and autumn. Summer is hot on the open slabs and winter can be snowy. The prints are clearest after rain.',
  stay: 'Half a day, with a night at Arnedillo.',
  move: 'A car. An hour from Logroño up the Cidacos valley.',
  eat: 'Arnedillo and Enciso have simple places. Lamb, and the Rioja Baja wines, which are Garnacha and warmer in style.'
}
};

/* Look-up used by the place page. Returns null rather than
   throwing when a guide has not been written yet, so a new place
   renders with its blurb and its live panel and nothing else. */
function esGuide(id){
  return (typeof ES_GUIDE !== 'undefined' && ES_GUIDE[id]) ? ES_GUIDE[id] : null;
}

function esGuideCount(){
  return (typeof ES_GUIDE !== 'undefined') ? Object.keys(ES_GUIDE).length : 0;
}
