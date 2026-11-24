/* ===========================================================
   ITALY — regions and places

   Same packed-array shape as places.js, deliberately:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Kept in its own namespace (IT_PLACES / itPlaceGet) rather than
   merged into PLACES, so that nothing here can reach the US map, the
   US search index or the planner. When the two atlases are joined
   later, this file becomes a merge rather than a rewrite.

   Region codes are three letters on purpose. US states are two, so
   "TOS-florence" can never collide with a "TX-" id no matter how the
   two sets are eventually combined.

   Kinds are Italy's own. "State park" means nothing here, while
   "ancient site" is half the reason anyone comes, so the vocabulary
   follows the country instead of being borrowed from the other one.
   =========================================================== */

/* ---------- what a place IS, Italian edition ---------- */
const IT_KIND = {
  city:      'City',
  town:      'Town',
  village:   'Village',
  ruin:      'Ancient site',
  coast:     'Coastline',
  island:    'Island',
  lake:      'Lake',
  mountain:  'Mountains',
  volcano:   'Volcano',
  np:        'National park',
  religious: 'Sacred site',
  wine:      'Wine country',
  beach:     'Beach',
  thermal:   'Hot springs',
  falls:     'Waterfall',
  historic:  'Palace & villa',
  region:    'Region'
};

/* Extra flags Italy needs that the US vocabulary never did. The base
   FLAG list in taxonomy.js still applies; these sit alongside it. */
const IT_FLAG = {
  unesco:  ['UNESCO',   'On the World Heritage list'],
  wine:    ['Wine',     'A region you drink as much as you see'],
  thermal: ['Thermal',  'Hot springs and bath houses'],
  ruins:   ['Ruins',    'Standing architecture from the ancient world'],
  coastal: ['Coastal',  'The sea is the whole point']
};

/* ---------- the twenty regions ----------
   code -> [ English name, Italian name, character, blurb ] */
const IT_REGIONS = {
  ABR: ['Abruzzo', 'Abruzzo', 'mountain',
    'Three national parks inside an hour of the Adriatic. The emptiest mountains in peninsular Italy, with bears in them.'],
  BAS: ['Basilicata', 'Basilicata', 'mountain',
    'The instep of the boot. Matera alone would justify the trip; the rest is empty highland and one perfect stretch of coast.'],
  CAL: ['Calabria', 'Calabria', 'coast',
    'The toe. Clear water, hard mountains and the two finest bronze statues to survive from the ancient Greek world.'],
  CAM: ['Campania', 'Campania', 'coast',
    'Naples, Pompeii, Vesuvius and the Amalfi Coast within sight of each other. No region packs more in.'],
  EMR: ['Emilia-Romagna', 'Emilia-Romagna', 'food',
    'Parmigiano, prosciutto, balsamico, tortellini and Ferrari, plus the best Byzantine mosaics outside Istanbul.'],
  FVG: ['Friuli-Venezia Giulia', 'Friuli-Venezia Giulia', 'border',
    'Where Italy stops being Italian. Austro-Hungarian coffee houses, Slovenian hills and a Roman capital on the lagoon.'],
  LAZ: ['Lazio', 'Lazio', 'urban',
    'Rome, and the considerable amount of Lazio that is not Rome — Etruscan tombs, crater lakes and a dying hill town on a pinnacle.'],
  LIG: ['Liguria', 'Liguria', 'coast',
    'A thin crescent of cliff between France and Tuscany. Cinque Terre, Portofino, pesto, and almost no flat ground.'],
  LOM: ['Lombardy', 'Lombardia', 'lake',
    'Italy’s engine, and its lakes. Milan works; Como, Garda and Maggiore are where Milan goes to stop working.'],
  MAR: ['Marche', 'Marche', 'rural',
    'Tuscany’s hills without Tuscany’s crowds, plus a Renaissance court city and the deepest cave system in Europe.'],
  MOL: ['Molise', 'Molise', 'rural',
    'The region Italians joke does not exist. It does: empty, cheap, ancient, and entirely unbothered by tourism.'],
  PIE: ['Piedmont', 'Piemonte', 'wine',
    'Barolo, white truffles, the Alps on three sides and a baroque capital that invented Italian cinema and vermouth.'],
  PUG: ['Apulia', 'Puglia', 'coast',
    'The heel. Whitewashed hill towns, conical stone roofs, baroque Lecce and 800km of coast on two different seas.'],
  SAR: ['Sardinia', 'Sardegna', 'island',
    'Caribbean water on a continent-sized island with its own language and 7,000 Bronze Age stone towers.'],
  SIC: ['Sicily', 'Sicilia', 'island',
    'Greek temples better than Greece’s, an active volcano, Arab-Norman cathedrals and the best street food in Italy.'],
  TAA: ['Trentino-Alto Adige', 'Trentino-Alto Adige / Südtirol', 'mountain',
    'The Dolomites, and a province that speaks German and cooks dumplings. The most dramatic rock in the Alps.'],
  TOS: ['Tuscany', 'Toscana', 'rural',
    'The one everyone pictures: Florence, cypress ridgelines, walled hill towns and the wine underneath all of it.'],
  UMB: ['Umbria', 'Umbria', 'rural',
    'The green heart, landlocked and quieter. Assisi, Orvieto and hill towns that have not been bought up yet.'],
  VDA: ['Aosta Valley', 'Valle d’Aosta', 'mountain',
    'Italy’s smallest region and its highest. Mont Blanc and the Matterhorn both look down into it.'],
  VEN: ['Veneto', 'Veneto', 'urban',
    'Venice, Verona, Palladio’s villas, prosecco hills and a corner of the Dolomites. An improbable amount of range.']
};

const IT_REGION_IDS = Object.keys(IT_REGIONS).sort((a, b) =>
  IT_REGIONS[a][0].localeCompare(IT_REGIONS[b][0]));

/* Every region is Europe/Rome. Kept as a function rather than a map so
   that the call site reads the same as the US one and a future country
   with several zones slots straight in. */
function itZoneOf(){ return 'Europe/Rome'; }

/* ---------- the places ---------- */
const IT_PLACES = {

  /* ===================== LAZIO ===================== */
  'LAZ-rome': ['Rome','LAZ','city',41.9028,12.4964,10,['urban'],['couple','solo','family'],['history','art','food','unesco','nightlife'],
    'Three thousand years deep and still the capital. Nowhere else lets you walk from an imperial forum to a Caravaggio to dinner in twenty minutes.'],
  'LAZ-vatican-city': ['Vatican City','LAZ','religious',41.9029,12.4534,10,['urban'],[],['art','history','unesco'],
    'The smallest country on earth, holding the Sistine Chapel, the Raphael Rooms and the largest church ever built.'],
  'LAZ-tivoli': ['Tivoli','LAZ','historic',41.9631,12.7989,7,['rural'],['couple'],['history','unesco','art'],
    'Two gardens, two empires. Hadrian built his retirement villa here; sixteen centuries later a cardinal answered with five hundred fountains.'],
  'LAZ-ostia-antica': ['Ostia Antica','LAZ','ruin',41.7553,12.2914,7,['rural'],[],['history','ruins'],
    'Rome’s port town, abandoned rather than destroyed. Quieter than Pompeii, nearly as complete, and half an hour from the city on the train.'],
  'LAZ-civita-di-bagnoregio': ['Civita di Bagnoregio','LAZ','village',42.6275,12.1142,7,['rural'],['couple'],['history'],
    'A town on a pinnacle of crumbling tufa, reached by one footbridge. They call it the dying city, and the erosion is not finished.'],
  'LAZ-sperlonga': ['Sperlonga','LAZ','beach',41.2631,13.4317,6,['beach'],['couple','family'],['coastal','history'],
    'Whitewashed alleys above two long sand beaches, with Tiberius’s seaside grotto and its shattered Homeric sculptures at the end of one.'],
  'LAZ-viterbo': ['Viterbo','LAZ','town',42.4175,12.1067,5,['urban','rural'],[],['history','thermal'],
    'A walled medieval capital that briefly outranked Rome, with free hot sulphur pools steaming in the fields outside the gates.'],
  'LAZ-tarquinia': ['Tarquinia','LAZ','ruin',42.2561,11.7569,6,['rural'],[],['history','unesco','ruins'],
    'Painted Etruscan tombs cut into the hill: dancers, divers and banquets, frescoed 2,500 years ago and still coloured.'],
  'LAZ-lake-bracciano': ['Lake Bracciano','LAZ','lake',42.1092,12.2331,5,['water'],['family'],['water'],
    'A volcanic crater lake with no motorboats, a castle on the shore and Rome’s drinking water underneath.'],
  'LAZ-castelli-romani': ['Castelli Romani','LAZ','wine',41.7475,12.6519,5,['rural'],['friends'],['wine','food'],
    'Hill towns above two crater lakes where Romans go for white wine and porchetta, and where the Pope spends the summer.'],
  'LAZ-ponza': ['Ponza','LAZ','island',40.8992,12.9625,6,['island','beach'],['couple','friends'],['coastal','water'],
    'A crescent of volcanic rock off the Lazio coast, full of sea caves and almost entirely Italian in August.'],
  'LAZ-gaeta': ['Gaeta','LAZ','beach',41.2133,13.5706,5,['beach'],['family'],['coastal'],
    'A medieval quarter on a headland, a mountain split by a legendary crack, and the best sandy beaches north of Naples.'],

  /* ===================== TUSCANY ===================== */
  'TOS-florence': ['Florence','TOS','city',43.7696,11.2558,10,['urban'],['couple','solo'],['art','history','food','unesco'],
    'The Renaissance happened here, and most of it is still here. More major art per square metre than anywhere on earth.'],
  'TOS-siena': ['Siena','TOS','city',43.3188,11.3307,9,['urban'],['couple'],['history','art','unesco','food'],
    'A Gothic city that lost to Florence and therefore stopped rebuilding, leaving it perfectly medieval. The Palio runs in its shell-shaped square.'],
  'TOS-pisa': ['Pisa','TOS','city',43.7228,10.3966,9,['urban'],['family'],['history','unesco','art'],
    'The tower leans because the subsoil is soft, and the cathedral square around it is one of the great set-pieces of European architecture.'],
  'TOS-lucca': ['Lucca','TOS','town',43.8430,10.5027,8,['urban'],['couple','family'],['history','food'],
    'Renaissance walls so broad they are now a tree-lined park you cycle around, enclosing a town that never let cars properly in.'],
  'TOS-san-gimignano': ['San Gimignano','TOS','village',43.4677,11.0433,8,['rural'],['couple'],['history','unesco','wine'],
    'Fourteen surviving tower-houses on a ridge, built by families competing to be tallest. There were once seventy-two.'],
  'TOS-val-d-orcia': ['Val d’Orcia','TOS','region',43.0500,11.6200,8,['rural'],['couple'],['unesco','wine','roadtrip'],
    'The cypress-lined ridges and lone farmhouses that every photograph of Tuscany is actually of. A UNESCO site for being beautiful.'],
  'TOS-chianti': ['Chianti','TOS','wine',43.4700,11.3200,7,['rural'],['couple','friends'],['wine','food','roadtrip'],
    'Stone villages and sangiovese between Florence and Siena, on roads that were designed for carts and still drive like it.'],
  'TOS-montepulciano': ['Montepulciano','TOS','town',43.0969,11.7836,7,['rural'],['couple'],['wine','history','food'],
    'A ridge town of Renaissance palaces with Vino Nobile ageing in cellars cut into the rock beneath them.'],
  'TOS-pienza': ['Pienza','TOS','village',43.0786,11.6789,6,['rural'],['couple'],['unesco','food','history'],
    'A pope demolished his birthplace and rebuilt it as the first planned Renaissance town. It takes an hour to see and smells of pecorino.'],
  'TOS-montalcino': ['Montalcino','TOS','wine',43.0564,11.4894,6,['rural'],['couple'],['wine','food'],
    'A fortress town above the vineyards that make Brunello, Italy’s most serious and most expensive sangiovese.'],
  'TOS-volterra': ['Volterra','TOS','town',43.4019,10.8611,6,['rural'],[],['history','ruins'],
    'Etruscan walls, a Roman theatre and an alabaster trade still worked by hand, on a windy hill above eroded badlands.'],
  'TOS-arezzo': ['Arezzo','TOS','city',43.4633,11.8796,6,['urban'],[],['art','history','food'],
    'Piero della Francesca’s fresco cycle, a sloping square that fills with antiques once a month, and far fewer visitors than it deserves.'],
  'TOS-cortona': ['Cortona','TOS','town',43.2747,11.9847,6,['rural'],['couple'],['history'],
    'An Etruscan hill town looking down the Valdichiana to Lake Trasimeno, steep enough that every street is also a staircase.'],
  'TOS-elba': ['Elba','TOS','island',42.7833,10.3000,7,['island','beach'],['family'],['coastal','water'],
    'Napoleon’s first exile, and he had worse postings: granite coves, iron-dark beaches and a 1,000m peak in the middle.'],
  'TOS-saturnia': ['Saturnia','TOS','thermal',42.6611,11.5078,6,['rural'],['couple','friends'],['thermal'],
    'Sulphur water at 37°C falls down a staircase of white limestone terraces, free, outdoors and open all night.'],
  'TOS-carrara': ['Carrara','TOS','mountain',44.0792,10.0975,5,['mountain'],[],['history'],
    'The quarries Michelangelo chose his marble from, cut into the Apuan Alps so deeply the mountains look snow-covered in August.'],
  'TOS-maremma': ['Maremma','TOS','region',42.6500,11.0800,5,['rural','beach'],['family'],['wildlife','coastal'],
    'Tuscany’s wild southwest: umbrella pines, long empty beaches, cattle herded on horseback and malaria until the 1930s.'],
  'TOS-versilia': ['Versilia','TOS','beach',43.8667,10.2500,5,['beach'],['family','friends'],['coastal','nightlife'],
    'Twenty kilometres of ordered beach clubs under the Apuan Alps, where Italy has taken its summer holiday for a century.'],

  /* ===================== VENETO ===================== */
  'VEN-venice': ['Venice','VEN','city',45.4408,12.3155,10,['urban','island'],['couple','honeymoon'],['art','history','unesco','food'],
    'A city built on mud and piles that became the richest in Europe. Nothing prepares you for the fact that there are no roads.'],
  'VEN-verona': ['Verona','VEN','city',45.4384,10.9916,9,['urban'],['couple'],['history','unesco','music','food'],
    'A Roman arena that still stages opera for 13,000 people, inside a pink-marble city on a bend of the Adige.'],
  'VEN-padua': ['Padua','VEN','city',45.4064,11.8768,7,['urban'],[],['art','history','unesco'],
    'Giotto’s Scrovegni Chapel, which began Western painting, plus Europe’s oldest botanical garden and a vast student quarter.'],
  'VEN-vicenza': ['Vicenza','VEN','city',45.5455,11.5354,7,['urban'],[],['history','unesco','art'],
    'Palladio rebuilt this town and in doing so designed the next four hundred years of Western architecture, including the White House.'],
  'VEN-burano': ['Burano','VEN','island',45.4853,12.4167,7,['island'],['family','couple'],['coastal'],
    'A lagoon fishing island where every house is painted a different saturated colour, by rule, and lace is still made by hand.'],
  'VEN-murano': ['Murano','VEN','island',45.4583,12.3533,6,['island'],['family'],['art'],
    'Venice moved its glass furnaces here in 1291 to stop the city burning down. They have been blowing glass ever since.'],
  'VEN-cortina-d-ampezzo': ['Cortina d’Ampezzo','VEN','mountain',46.5405,12.1357,8,['mountain'],['couple','friends'],['winter','hiking','unesco'],
    'The Dolomite resort that hosted the 1956 Olympics and will host 2026, ringed by rock walls that go pink at sunset.'],
  'VEN-prosecco-hills': ['Prosecco Hills','VEN','wine',45.8992,12.0000,6,['rural'],['couple','friends'],['wine','unesco','roadtrip'],
    'Near-vertical vineyards between Conegliano and Valdobbiadene, worked by hand because no machine can stand up on them.'],
  'VEN-malcesine': ['Malcesine','VEN','lake',45.7639,10.8092,7,['water','mountain'],['couple','family'],['water'],
    'A castle on a rock over Lake Garda, with a rotating cable car that lifts you 1,700m to Monte Baldo in ten minutes.'],
  'VEN-asolo': ['Asolo','VEN','village',45.7994,11.9119,5,['rural'],['couple'],['history'],
    'The town of a hundred horizons, a walled hill retreat for exiled queens, poets and Eleonora Duse, who is buried here.'],
  'VEN-chioggia': ['Chioggia','VEN','town',45.2192,12.2792,5,['urban','island'],['family'],['food','coastal'],
    'Little Venice at the south end of the lagoon: the same canals and bridges, a serious fishing fleet and a tenth of the visitors.'],

  /* ===================== CAMPANIA ===================== */
  'CAM-naples': ['Naples','CAM','city',40.8518,14.2681,10,['urban'],['solo','friends'],['food','history','art','unesco','nightlife'],
    'Loud, layered and the best place to eat in Italy. Pizza was invented here and the city has never let anyone forget it.'],
  'CAM-pompeii': ['Pompeii','CAM','ruin',40.7497,14.4869,10,['rural'],['family'],['history','unesco','ruins'],
    'A Roman town stopped mid-morning in AD 79 and buried in ash. Streets, shops, graffiti, frescoes and the shapes of the dead.'],
  'CAM-herculaneum': ['Herculaneum','CAM','ruin',40.8061,14.3475,8,['urban'],[],['history','unesco','ruins'],
    'Buried deeper than Pompeii and by hotter material, which carbonised the wood instead of burning it. Upper floors, doors and beds survive.'],
  'CAM-amalfi-coast': ['Amalfi Coast','CAM','coast',40.6333,14.6029,10,['beach','mountain'],['couple','honeymoon'],['unesco','coastal','roadtrip','food'],
    'Fifty kilometres of cliff with lemon terraces and pastel towns stacked on it, and one of the great drives on earth along the top.'],
  'CAM-positano': ['Positano','CAM','town',40.6281,14.4850,9,['beach'],['couple','honeymoon'],['coastal'],
    'A vertical town pouring down a ravine to a grey beach. Everything is steps, and the view back up is the one on every postcard.'],
  'CAM-ravello': ['Ravello','CAM','town',40.6494,14.6117,8,['mountain'],['couple','honeymoon'],['music','coastal'],
    'Three hundred and fifty metres above the coast, with two villa gardens on terraces that end in nothing but air and sea.'],
  'CAM-amalfi': ['Amalfi','CAM','town',40.6340,14.6027,8,['beach'],['couple','family'],['history','coastal'],
    'Once a maritime republic the equal of Venice, now a small town with an outrageous Arab-Norman cathedral at the top of a staircase.'],
  'CAM-capri': ['Capri','CAM','island',40.5532,14.2222,9,['island'],['couple','honeymoon'],['coastal','water'],
    'Limestone cliffs out of the Bay of Naples, with a blue sea cave, Roman villas and a town that has been fashionable since Tiberius.'],
  'CAM-ischia': ['Ischia','CAM','island',40.7333,13.9000,8,['island','beach'],['couple','family'],['thermal','coastal'],
    'The volcanic island: thermal parks, hot sand beaches you can cook in, and a castle on its own islet reached by a causeway.'],
  'CAM-procida': ['Procida','CAM','island',40.7606,14.0206,7,['island'],['couple'],['coastal'],
    'The smallest and least developed of the bay islands, a stack of faded pastel fishermen’s houses around a working harbour.'],
  'CAM-sorrento': ['Sorrento','CAM','town',40.6264,14.3758,8,['beach'],['family','couple'],['coastal','food'],
    'On a cliff facing Vesuvius across the bay, with lemon groves behind and ferries to everywhere worth going.'],
  'CAM-mount-vesuvius': ['Mount Vesuvius','CAM','volcano',40.8217,14.4289,9,['volcanic','mountain'],['family'],['hiking','history'],
    'The volcano that buried Pompeii, still active, with a path to the crater rim and three million people living on its slopes.'],
  'CAM-paestum': ['Paestum','CAM','ruin',40.4201,15.0053,7,['rural'],[],['history','unesco','ruins'],
    'Three Greek temples standing nearly complete in a field south of Salerno, older and better preserved than most in Greece.'],
  'CAM-caserta': ['Caserta','CAM','historic',41.0722,14.3264,7,['urban'],['family'],['history','unesco'],
    'The Bourbon answer to Versailles: 1,200 rooms and a three-kilometre water garden climbing the hill behind it.'],
  'CAM-campi-flegrei': ['Campi Flegrei','CAM','volcano',40.8278,14.1397,6,['volcanic'],[],['history','ruins'],
    'A collapsed supervolcano west of Naples with a steaming crater you can walk into, a sunken Roman city and ground that visibly rises and falls.'],
  'CAM-cilento': ['Cilento','CAM','np',40.2500,15.2000,5,['beach','mountain'],['family'],['coastal','hiking','unesco'],
    'The coast south of the Amalfi crowds: a national park with Greek ruins, clear water and the birthplace of the Mediterranean diet.'],

  /* ===================== LOMBARDY ===================== */
  'LOM-milan': ['Milan','LOM','city',45.4642,9.1900,10,['urban'],['solo','friends'],['art','food','nightlife','history'],
    'Italy’s working city: a Gothic cathedral of 3,400 statues, The Last Supper, and the country’s only real skyline.'],
  'LOM-lake-como': ['Lake Como','LOM','lake',45.9833,9.2583,10,['water','mountain'],['couple','honeymoon'],['water','roadtrip'],
    'A glacial Y of deep water under steep mountains, lined with villas and gardens built for people who never had to work.'],
  'LOM-varenna': ['Varenna','LOM','village',46.0103,9.2842,7,['water'],['couple'],['water'],
    'The quiet side of Como: a pastel fishing village with a lakeside walkway, two villa gardens and the ferry pier at the centre.'],
  'LOM-bergamo': ['Bergamo','LOM','city',45.6983,9.6773,7,['urban'],['couple'],['history','food'],
    'A Venetian walled town on a hill above a modern city, joined by a funicular, with the Alps filling the view north.'],
  'LOM-sirmione': ['Sirmione','LOM','town',45.4939,10.6064,7,['water'],['family','couple'],['thermal','history','water'],
    'A castle guarding a long thin peninsula into Lake Garda, with Roman bath ruins and hot springs at the tip.'],
  'LOM-mantua': ['Mantua','LOM','city',45.1564,10.7914,6,['urban','water'],[],['art','history','unesco','food'],
    'Surrounded on three sides by lakes, run for three centuries by the Gonzaga, and painted by Mantegna and Giulio Romano.'],
  'LOM-franciacorta': ['Franciacorta','LOM','wine',45.6000,10.0333,5,['rural'],['couple','friends'],['wine','food'],
    'Italy’s answer to Champagne, made the same way in the moraine hills above Lake Iseo, and mostly drunk before it leaves the country.'],
  'LOM-bormio': ['Bormio','LOM','mountain',46.4681,10.3714,5,['mountain'],['friends','family'],['winter','thermal','hiking'],
    'A ski town in the Stelvio national park with Roman-era thermal baths and the hardest pass road in the Alps above it.'],

  /* ===================== PIEDMONT ===================== */
  'PIE-turin': ['Turin','PIE','city',45.0703,7.6869,8,['urban'],['solo'],['art','food','history'],
    'Italy’s first capital: arcaded boulevards, the Egyptian collection second only to Cairo’s, vermouth, and Fiat.'],
  'PIE-langhe': ['Langhe','PIE','wine',44.7000,8.0355,8,['rural'],['couple','friends'],['wine','food','unesco','roadtrip'],
    'Barolo and Barbaresco grow on these hills, and in autumn the white truffles underneath them cost more than the wine.'],
  'PIE-lake-maggiore': ['Lake Maggiore','PIE','lake',45.8833,8.5333,8,['water','mountain'],['couple','family'],['water'],
    'Longer and wider than Como, with three baroque island gardens off Stresa that are among the strangest things in Italy.'],
  'PIE-lake-orta': ['Lake Orta','PIE','lake',45.7983,8.4056,6,['water'],['couple'],['water'],
    'A small lake the tour buses skip, with a cobbled village facing a wooded island and a monastery on it.'],
  'PIE-sacra-di-san-michele': ['Sacra di San Michele','PIE','religious',45.0975,7.3433,6,['mountain'],[],['history'],
    'An abbey welded to the top of a rock spur in the Susa valley, reached by a staircase cut past open tombs.'],
  'PIE-asti': ['Asti','PIE','town',44.9009,8.2064,5,['urban','rural'],[],['wine','food','history'],
    'Medieval towers, a bareback palio older than Siena’s, and the sparkling moscato the whole world drinks at Christmas.'],

  /* ===================== LIGURIA ===================== */
  'LIG-cinque-terre': ['Cinque Terre','LIG','coast',44.1281,9.7089,10,['beach','mountain'],['couple','friends'],['unesco','hiking','coastal','food'],
    'Five villages wedged into a cliff coast with no road between them, linked by a footpath, a train through the rock and boats.'],
  'LIG-portofino': ['Portofino','LIG','village',44.3033,9.2097,8,['beach'],['couple','honeymoon'],['coastal','water'],
    'A tiny deep harbour ringed by ochre houses, expensive since the 1950s, with a protected marine reserve off the headland.'],
  'LIG-genoa': ['Genoa','LIG','city',44.4056,8.9463,7,['urban'],['solo'],['history','food','unesco','art'],
    'A maritime republic’s capital with the densest medieval centre in Europe, a street of palaces and the best focaccia anywhere.'],
  'LIG-portovenere': ['Portovenere','LIG','village',44.0506,9.8375,7,['beach'],['couple'],['unesco','coastal'],
    'A black-and-white striped church on a rock at the end of a painted waterfront, facing three islands across the Gulf of Poets.'],
  'LIG-camogli': ['Camogli','LIG','village',44.3486,9.1536,6,['beach'],['couple','family'],['coastal','food'],
    'Tall painted fishermen’s houses on a pebble bay, and the start of the walk to the abbey at San Fruttuoso, reachable only on foot or by boat.'],
  'LIG-lerici': ['Lerici','LIG','town',44.0761,9.9108,5,['beach'],['family'],['coastal'],
    'A castle above a sheltered bay on the quiet side of the Gulf of Poets, where Shelley drowned and Byron swam.'],

  /* ===================== EMILIA-ROMAGNA ===================== */
  'EMR-bologna': ['Bologna','EMR','city',44.4949,11.3426,8,['urban'],['solo','friends'],['food','history','nightlife','art'],
    'Forty kilometres of arcade, Europe’s oldest university and the best eating in a country that takes that seriously.'],
  'EMR-ravenna': ['Ravenna','EMR','city',44.4184,12.2035,8,['urban'],[],['art','history','unesco'],
    'Capital of the late Roman empire and then of Byzantine Italy, which left eight buildings lined with the finest mosaics in the West.'],
  'EMR-parma': ['Parma','EMR','city',44.8015,10.3279,7,['urban'],['couple'],['food','art','music'],
    'Parmigiano, prosciutto and Verdi, plus Correggio’s domes and a wooden theatre that survived being bombed flat.'],
  'EMR-modena': ['Modena','EMR','city',44.6471,10.9252,7,['urban'],['friends'],['food','unesco'],
    'Balsamic vinegar aged for decades in attic barrels, a Romanesque cathedral, Ferrari, Lamborghini and Pavarotti.'],
  'EMR-ferrara': ['Ferrara','EMR','city',44.8378,11.6197,6,['urban'],[],['history','unesco'],
    'A moated castle in the middle of town and the first planned Renaissance city expansion in Europe, best seen by bicycle.'],
  'EMR-rimini': ['Rimini','EMR','beach',44.0678,12.5695,6,['beach'],['family','friends'],['coastal','nightlife','history'],
    'Fifteen kilometres of ordered Adriatic beach, a Roman bridge and arch still in use, and Fellini’s home town.'],

  /* ===================== TRENTINO-ALTO ADIGE ===================== */
  'TAA-dolomites': ['Dolomites','TAA','mountain',46.4700,11.8000,10,['mountain'],['friends','couple'],['hiking','unesco','winter','roadtrip'],
    'Pale vertical rock towers that turn rose at dawn and dusk, with 1,200km of via ferrata and lifts threaded through them.'],
  'TAA-tre-cime-di-lavaredo': ['Tre Cime di Lavaredo','TAA','mountain',46.6186,12.3050,9,['mountain'],['friends'],['hiking','unesco'],
    'Three sheer parallel towers with a four-hour loop around their base. The most recognised silhouette in the Alps.'],
  'TAA-lake-braies': ['Lake Braies','TAA','lake',46.6947,12.0856,8,['water','mountain'],['couple','family'],['water','hiking'],
    'Green-blue water under a wall of rock, with a wooden boathouse that has been photographed into fame and a timed-entry system because of it.'],
  'TAA-alpe-di-siusi': ['Alpe di Siusi','TAA','mountain',46.5406,11.6194,8,['mountain'],['family','couple'],['hiking','winter','unesco'],
    'Europe’s largest high alpine meadow, 57 square kilometres of rolling pasture at 1,800m with the Sciliar rising out of it.'],
  'TAA-val-gardena': ['Val Gardena','TAA','mountain',46.5594,11.7194,8,['mountain'],['friends','family'],['winter','hiking','unesco'],
    'Three Ladin-speaking villages, a wood-carving tradition centuries old, and the lift system onto the Sella Ronda ski circuit.'],
  'TAA-seceda': ['Seceda','TAA','mountain',46.6056,11.6722,7,['mountain'],['friends'],['hiking','unesco'],
    'A tilted grass ridge that ends in a blade of rock. The cable car does the climbing, which is why the photograph is so common.'],
  'TAA-bolzano': ['Bolzano','TAA','city',46.4983,11.3548,7,['urban','mountain'],['family'],['food','history'],
    'Where Italy and Austria meet in one town, with Ötzi the 5,300-year-old iceman in a refrigerated case in the museum.'],
  'TAA-lake-carezza': ['Lake Carezza','TAA','lake',46.4106,11.5767,6,['water','mountain'],['family','couple'],['water'],
    'A small lake that reflects the Latemar range so exactly it is called the rainbow lake. Ten minutes to see, worth the stop.'],
  'TAA-trento': ['Trento','TAA','city',46.0667,11.1167,6,['urban','mountain'],[],['history','art'],
    'A frescoed Renaissance city under the Alps where the Counter-Reformation was argued out over eighteen years.'],
  'TAA-merano': ['Merano','TAA','town',46.6700,11.1600,6,['mountain'],['couple'],['thermal'],
    'An Austro-Hungarian spa town in a warm sheltered basin, with palm trees, promenades and a vast botanical garden.'],

  /* ===================== UMBRIA ===================== */
  'UMB-assisi': ['Assisi','UMB','religious',43.0707,12.6196,9,['rural'],['couple','family'],['history','art','unesco'],
    'St Francis’s town on the flank of Monte Subasio, with two stacked basilicas frescoed by Giotto and Cimabue.'],
  'UMB-orvieto': ['Orvieto','UMB','town',42.7186,12.1111,8,['rural'],['couple'],['history','art','food','wine'],
    'A town on a tufa plateau with a striped cathedral, a fresco cycle of the Apocalypse, and a second town tunnelled underneath.'],
  'UMB-perugia': ['Perugia','UMB','city',43.1107,12.3908,7,['urban'],['solo'],['art','history','music','food'],
    'A hill capital with Etruscan gates, a chocolate factory, a jazz festival in July and escalators through a buried Renaissance fortress.'],
  'UMB-spoleto': ['Spoleto','UMB','town',42.7403,12.7383,6,['rural'],['couple'],['history','music'],
    'A papal fortress, a 230m medieval aqueduct bridge across a gorge, and a festival that brings opera up the hill every summer.'],
  'UMB-gubbio': ['Gubbio','UMB','town',43.3519,12.5736,6,['rural','mountain'],[],['history'],
    'Grey stone stacked up a mountainside, almost untouched since the 14th century, with a cable car in open birdcages to the monastery above.'],
  'UMB-marmore-falls': ['Marmore Falls','UMB','falls',42.5514,12.7156,6,['water','forest'],['family'],['water','hiking'],
    'The tallest waterfall in Italy at 165m, built by the Romans in 271 BC to drain a marsh, switched on and off to a timetable.'],
  'UMB-lake-trasimeno': ['Lake Trasimeno','UMB','lake',43.1333,12.1000,5,['water'],['family'],['water','history'],
    'A shallow lake with three islands where Hannibal destroyed a Roman army in 217 BC, now quiet enough for herons.'],

  /* ===================== MARCHE ===================== */
  'MAR-urbino': ['Urbino','MAR','town',43.7262,12.6365,7,['rural'],[],['art','history','unesco'],
    'A ducal palace that was the model Renaissance court, holding Piero della Francesca’s Flagellation and Raphael’s birthplace downhill.'],
  'MAR-frasassi-caves': ['Frasassi Caves','MAR','mountain',43.4022,12.9664,7,['mountain'],['family'],['hiking'],
    'A cave system big enough to hold Milan cathedral in the first chamber, found by cavers in 1971 and lit for walking since.'],
  'MAR-conero-riviera': ['Conero Riviera','MAR','coast',43.5500,13.6167,6,['beach'],['couple','family'],['coastal','hiking'],
    'A white limestone headland that breaks the long flat Adriatic coast, with pebble coves below it reached on foot or by boat.'],
  'MAR-ascoli-piceno': ['Ascoli Piceno','MAR','town',42.8542,13.5750,6,['urban'],[],['history','food'],
    'Built entirely of travertine, with one of the handsomest squares in Italy and stuffed fried olives invented in it.'],
  'MAR-monti-sibillini': ['Monti Sibillini','MAR','np',42.8900,13.2500,6,['mountain'],['friends'],['hiking','wildlife','darksky'],
    'A national park of bare rounded summits and a high plain that turns scarlet and yellow with wildflowers every June.'],

  /* ===================== FRIULI-VENEZIA GIULIA ===================== */
  'FVG-trieste': ['Trieste','FVG','city',45.6495,13.7768,7,['urban'],['solo'],['history','food','coastal'],
    'Vienna’s port for six centuries, and it still looks it: Habsburg squares opening onto the Adriatic, and coffee taken seriously.'],
  'FVG-aquileia': ['Aquileia','FVG','ruin',45.7694,13.3661,6,['rural'],[],['history','unesco','ruins'],
    'One of the largest cities of the Roman empire, now a village over a basilica floor of 760 square metres of 4th-century mosaic.'],
  'FVG-cividale-del-friuli': ['Cividale del Friuli','FVG','town',46.0931,13.4328,5,['rural'],[],['history','unesco'],
    'Founded by Julius Caesar, capital of the Lombards, with a carved 8th-century chapel above a gorge and a devil’s bridge across it.'],
  'FVG-grado': ['Grado','FVG','beach',45.6778,13.3931,5,['beach','island'],['family'],['coastal','thermal'],
    'A lagoon island of early Christian basilicas and south-facing sand, reached by a causeway through the reed beds.'],
  'FVG-palmanova': ['Palmanova','FVG','historic',45.9053,13.3094,5,['rural'],[],['history','unesco'],
    'A Venetian fortress town built in 1593 as a nine-pointed star, perfectly symmetrical and best understood from the air.'],

  /* ===================== SICILY ===================== */
  'SIC-palermo': ['Palermo','SIC','city',38.1157,13.3615,9,['urban'],['solo','friends'],['food','history','art','unesco','nightlife'],
    'Phoenician, Greek, Roman, Arab, Norman and Spanish in layers, with street markets that sound like souks and the best food in Sicily.'],
  'SIC-mount-etna': ['Mount Etna','SIC','volcano',37.7510,14.9934,10,['volcanic','mountain'],['friends','family'],['hiking','unesco','wine'],
    'Europe’s largest active volcano, 3,300m and growing, with vineyards on the lower slopes and lava that reaches the road most years.'],
  'SIC-taormina': ['Taormina','SIC','town',37.8516,15.2853,9,['beach','mountain'],['couple','honeymoon'],['history','coastal','ruins'],
    'A Greek theatre on a cliff with Etna framed in the gap where the stage wall fell down. The town behind it has been fashionable since Goethe.'],
  'SIC-syracuse': ['Syracuse','SIC','city',37.0755,15.2866,9,['urban','island'],['couple'],['history','unesco','ruins','food'],
    'Once the most powerful Greek city in the world. Ortigia, its island core, is baroque laid over Greek, with a temple inside the cathedral.'],
  'SIC-agrigento': ['Agrigento','SIC','ruin',37.2906,13.5917,9,['rural'],['family'],['history','unesco','ruins'],
    'The Valley of the Temples: seven Doric temples along a ridge above the sea, one of them virtually intact.'],
  'SIC-cefalu': ['Cefalù','SIC','town',38.0397,14.0214,8,['beach'],['couple','family'],['coastal','history','unesco'],
    'A Norman cathedral with a colossal Christ in mosaic, under a 270m crag, with a curved sand beach along the old town wall.'],
  'SIC-aeolian-islands': ['Aeolian Islands','SIC','island',38.4900,14.9400,8,['island','volcanic'],['couple','friends'],['unesco','water','coastal'],
    'Seven volcanic islands off the north coast, two of them still erupting, with black sand, thermal mud and no roads to speak of.'],
  'SIC-stromboli': ['Stromboli','SIC','volcano',38.7930,15.2130,7,['volcanic','island'],['friends'],['hiking','water'],
    'A volcano that has erupted every twenty minutes or so for 2,000 years, best watched from a boat after dark.'],
  'SIC-noto': ['Noto','SIC','town',36.8906,15.0694,7,['rural'],['couple'],['history','unesco','food'],
    'Flattened by earthquake in 1693 and rebuilt all at once in golden limestone, making it the most coherent baroque town in Europe.'],
  'SIC-ragusa': ['Ragusa','SIC','town',36.9269,14.7255,7,['rural'],['couple'],['history','unesco','food'],
    'Two towns in one: the baroque lower town of Ibla on its own hill, and the 18th-century upper town looking across the ravine at it.'],
  'SIC-modica': ['Modica','SIC','town',36.8597,14.7744,6,['rural'],[],['food','unesco','history'],
    'Stacked up two sides of a gorge, with chocolate still made the cold Aztec way the Spanish brought over.'],
  'SIC-monreale': ['Monreale','SIC','religious',38.0817,13.2917,7,['urban'],[],['art','history','unesco'],
    'Six thousand square metres of gold mosaic covering a Norman cathedral above Palermo, finished in ten years in the 1180s.'],
  'SIC-villa-romana-del-casale': ['Villa Romana del Casale','SIC','ruin',37.3650,14.3344,7,['rural'],['family'],['history','unesco','ruins'],
    'A Roman hunting villa buried by a landslide, preserving 3,500 square metres of floor mosaic including athletes in bikinis.'],
  'SIC-scala-dei-turchi': ['Scala dei Turchi','SIC','beach',37.2897,13.4756,7,['beach'],['couple'],['coastal'],
    'A cliff of blinding white marl eroded into a natural staircase down to the sea, glowing at sunset.'],
  'SIC-erice': ['Erice','SIC','village',38.0372,12.5869,7,['mountain'],['couple'],['history'],
    'A walled medieval town at 750m, usually in cloud, reached by cable car, with pastries made to a convent recipe.'],
  'SIC-segesta': ['Segesta','SIC','ruin',37.9417,12.8333,6,['rural'],[],['history','ruins'],
    'An unfinished Doric temple standing alone on a hill with no town around it, and a theatre looking out to the sea.'],
  'SIC-trapani': ['Trapani','SIC','city',38.0176,12.5365,6,['urban','beach'],[],['food','coastal'],
    'A sickle of a port between two seas, with salt pans and windmills to the south and ferries to the Egadi islands.'],
  'SIC-favignana': ['Favignana','SIC','island',37.9314,12.3292,6,['island','beach'],['friends','couple'],['water','coastal'],
    'A flat island of flooded tufa quarries turned into swimming coves, best covered by bicycle in a single day.'],
  'SIC-catania': ['Catania','SIC','city',37.5079,15.0830,7,['urban'],['friends'],['food','history','unesco','nightlife'],
    'Built out of black lava after Etna and an earthquake flattened it, with a fish market that is the best theatre in the city.'],
  'SIC-selinunte': ['Selinunte','SIC','ruin',37.5833,12.8250,6,['rural','beach'],[],['history','ruins'],
    'The largest archaeological park in Europe: a Greek city destroyed by Carthage in 409 BC and left where it fell, beside a beach.'],

  /* ===================== SARDINIA ===================== */
  'SAR-costa-smeralda': ['Costa Smeralda','SAR','coast',41.1000,9.5167,8,['beach','island'],['couple','honeymoon'],['coastal','water'],
    'Granite headlands and improbably clear water, developed from nothing by the Aga Khan in 1962 into Italy’s most expensive coast.'],
  'SAR-golfo-di-orosei': ['Golfo di Orosei','SAR','coast',40.2800,9.6300,7,['beach','mountain'],['friends','couple'],['coastal','water','hiking'],
    'Forty kilometres of limestone cliff with beaches at the bottom that can only be reached by boat or a long walk down.'],
  'SAR-alghero': ['Alghero','SAR','town',40.5589,8.3194,7,['beach'],['couple','family'],['coastal','food','history'],
    'A walled Catalan town on the northwest coast where the old language is still spoken and the street signs are bilingual.'],
  'SAR-la-maddalena': ['La Maddalena','SAR','island',41.2139,9.4056,7,['island','beach'],['family','friends'],['water','coastal'],
    'An archipelago of seven granite islands and sixty islets in a protected park, with water that reads as turquoise from the air.'],
  'SAR-cagliari': ['Cagliari','SAR','city',39.2238,9.1217,7,['urban','beach'],['solo'],['history','food','coastal'],
    'A limestone citadel over a working port, with flamingos in the lagoon and a six-kilometre city beach.'],
  'SAR-neptunes-grotto': ['Neptune’s Grotto','SAR','coast',40.5597,8.1583,6,['island'],['family'],['water'],
    'A sea cave under the Capo Caccia cliffs, entered down 654 steps cut into the rock face, or by boat when the sea allows.'],
  'SAR-su-nuraxi': ['Su Nuraxi','SAR','ruin',39.7056,8.9911,6,['rural'],[],['history','unesco','ruins'],
    'The best preserved of Sardinia’s 7,000 nuraghi: a Bronze Age stone tower complex from 1500 BC with a village around its feet.'],
  'SAR-bosa': ['Bosa','SAR','town',40.2972,8.4994,5,['beach'],['couple'],['coastal'],
    'Coloured houses stacked under a castle on a navigable river, with the old tanneries still standing along the far bank.'],
  'SAR-villasimius': ['Villasimius','SAR','beach',39.1392,9.5186,6,['beach'],['family'],['coastal','water'],
    'The southeast corner, with a marine reserve, white sand and water shallow enough to walk out a long way into.'],

  /* ===================== APULIA ===================== */
  'PUG-alberobello': ['Alberobello','PUG','village',40.7833,17.2372,9,['rural'],['family','couple'],['unesco','history'],
    'Fifteen hundred trulli: conical drystone roofs built without mortar so they could be pulled down to dodge a tax.'],
  'PUG-lecce': ['Lecce','PUG','city',40.3515,18.1750,8,['urban'],['couple','solo'],['history','art','food','nightlife'],
    'Baroque carved into soft golden stone until the facades look like pastry, with a Roman amphitheatre in the main square.'],
  'PUG-polignano-a-mare': ['Polignano a Mare','PUG','town',40.9959,17.2186,8,['beach'],['couple','friends'],['coastal','water'],
    'A white town on a limestone cliff with a beach in a ravine beneath it and sea caves cut into the rock below the houses.'],
  'PUG-ostuni': ['Ostuni','PUG','town',40.7306,17.5781,8,['rural'],['couple'],['coastal','food'],
    'The white city: lime-washed against the heat, visible from thirty kilometres away, on a hill above an ocean of olive trees.'],
  'PUG-castel-del-monte': ['Castel del Monte','PUG','historic',41.0847,16.2708,7,['rural'],[],['history','unesco'],
    'An octagonal castle with eight octagonal towers, built by Frederick II in the 1240s for no purpose anyone has established.'],
  'PUG-gargano': ['Gargano','PUG','np',41.8000,16.0000,7,['beach','forest'],['family'],['coastal','hiking','unesco'],
    'The spur of the boot: a limestone massif of ancient beech forest dropping to sea stacks, lagoons and pilgrimage towns.'],
  'PUG-vieste': ['Vieste','PUG','town',41.8822,16.1753,7,['beach'],['family','couple'],['coastal','water'],
    'A whitewashed old town on a promontory at the Gargano’s tip, with the Pizzomunno monolith standing on the beach beside it.'],
  'PUG-otranto': ['Otranto','PUG','town',40.1458,18.4914,7,['beach'],['couple'],['history','coastal'],
    'Italy’s easternmost town, with an 11th-century mosaic floor showing a tree of life, and a chapel of 800 martyrs’ skulls.'],
  'PUG-salento': ['Salento','PUG','region',40.2000,18.2000,7,['beach'],['friends','couple'],['coastal','water','music','food'],
    'The very bottom of the heel, between two seas, with sand on the Ionian side, cliffs on the Adriatic and tarantella all summer.'],
  'PUG-monopoli': ['Monopoli','PUG','town',40.9500,17.3000,6,['beach'],['family'],['coastal','food'],
    'A working port with a fortified old town, small sandy coves between the walls, and far less attention than its neighbours.'],
  'PUG-gallipoli': ['Gallipoli','PUG','town',40.0558,17.9789,6,['beach'],['friends'],['coastal','nightlife'],
    'An old town on an island joined by a bridge, with baroque churches, an oil-press underworld and the Ionian’s best beaches nearby.'],
  'PUG-grotte-di-castellana': ['Grotte di Castellana','PUG','mountain',40.8794,17.1486,6,['rural'],['family'],['hiking'],
    'Three kilometres of cave under the Murgia plateau, ending in an alabaster-white grotto that is the finest in Italy.'],
  'PUG-trani': ['Trani','PUG','town',41.2772,16.4172,5,['beach'],['couple'],['history','coastal'],
    'A pale Romanesque cathedral built right at the water’s edge on its own small headland, above a harbour of fishing boats.'],
  'PUG-bari': ['Bari','PUG','city',41.1171,16.8719,6,['urban'],['solo'],['food','history','coastal'],
    'A tangled old town where women make orecchiette in the street, around the basilica holding St Nicholas, stolen from Turkey in 1087.'],

  /* ===================== BASILICATA ===================== */
  'BAS-matera': ['Matera','BAS','city',40.6667,16.6044,10,['rural'],['couple','solo'],['unesco','history','food'],
    'Cave dwellings carved into a ravine, inhabited for 9,000 years, emptied as a national disgrace in 1952 and now a World Heritage site.'],
  'BAS-maratea': ['Maratea','BAS','coast',39.9939,15.7175,7,['beach','mountain'],['couple'],['coastal'],
    'Basilicata’s only stretch of Tyrrhenian coast: thirty kilometres of cliff, a hill town of forty-four churches and a marble Christ above it.'],
  'BAS-craco': ['Craco','BAS','village',40.3783,16.4394,6,['rural'],[],['history'],
    'A hill town abandoned after landslides in 1963 and left standing empty, now visited on hard hats and used for films.'],
  'BAS-pollino': ['Pollino','BAS','np',39.9000,16.2000,5,['mountain','forest'],['friends'],['hiking','wildlife','darksky'],
    'Italy’s largest national park, straddling into Calabria, with Bosnian pines that have been alive for over a thousand years.'],

  /* ===================== CALABRIA ===================== */
  'CAL-tropea': ['Tropea','CAL','town',38.6761,15.8978,8,['beach'],['couple','family'],['coastal','water','food'],
    'A cliff town over white sand and water the colour of a swimming pool, with a Benedictine church on an island rock below it.'],
  'CAL-scilla': ['Scilla','CAL','town',38.2533,15.7142,7,['beach'],['couple'],['coastal','history'],
    'Homer’s sea monster, now a fishing quarter of houses standing in the water under a castle, looking across at Sicily.'],
  'CAL-capo-vaticano': ['Capo Vaticano','CAL','coast',38.6189,15.8306,6,['beach'],['family','couple'],['coastal','water'],
    'Granite headlands and small white coves on the Coast of the Gods, with Stromboli visible on the horizon at dusk.'],
  'CAL-reggio-calabria': ['Reggio Calabria','CAL','city',38.1105,15.6613,6,['urban','beach'],[],['art','history','coastal'],
    'Home to the Riace Bronzes, two 5th-century BC Greek warriors pulled from the sea in 1972 and unmatched anywhere.'],
  'CAL-gerace': ['Gerace','CAL','village',38.2708,16.2203,5,['rural','mountain'],[],['history'],
    'A Norman hill town on a rock above the Ionian coast, with the largest Romanesque cathedral in Calabria and almost no one in it.'],
  'CAL-sila': ['Sila','CAL','np',39.3000,16.6000,5,['forest','mountain'],['family'],['hiking','wildlife','darksky'],
    'A high forested plateau of pine, lakes and wolves, cool enough in August to need a jacket, with some of Italy’s darkest skies.'],

  /* ===================== ABRUZZO ===================== */
  'ABR-campo-imperatore': ['Campo Imperatore','ABR','mountain',42.4417,13.5600,7,['mountain'],['friends'],['hiking','darksky','winter'],
    'A treeless high plain under the Gran Sasso called Little Tibet, grazed by sheep, used for westerns and famous for its night sky.'],
  'ABR-rocca-calascio': ['Rocca Calascio','ABR','village',42.3444,13.7000,7,['mountain'],['couple'],['history','hiking'],
    'The highest fortress in the Apennines at 1,460m, ruined, roofless and standing over an abandoned village and an octagonal chapel.'],
  'ABR-abruzzo-national-park': ['Abruzzo National Park','ABR','np',41.8000,13.7833,7,['mountain','forest'],['family'],['wildlife','hiking','darksky'],
    'Italy’s oldest national park and the last refuge of the Marsican brown bear, with beech forest, wolves and chamois.'],
  'ABR-scanno': ['Scanno','ABR','village',41.9044,13.8803,6,['mountain','water'],['couple'],['history'],
    'A stone mountain village above a heart-shaped lake, photographed by Cartier-Bresson, where a few women still wear the old dress.'],
  'ABR-costa-dei-trabocchi': ['Costa dei Trabocchi','ABR','coast',42.2000,14.5000,5,['beach'],['couple','family'],['coastal','food'],
    'Timber fishing machines on stilts walking out from the Adriatic shore, several now converted into restaurants over the water.'],
  'ABR-sulmona': ['Sulmona','ABR','town',42.0500,13.9333,5,['urban','mountain'],[],['food','history'],
    'Ovid’s birthplace under the Majella, with a medieval aqueduct along the main square and sugared almonds made into flowers.'],

  /* ===================== AOSTA VALLEY ===================== */
  'VDA-courmayeur': ['Courmayeur','VDA','mountain',45.7917,6.9694,8,['mountain'],['couple','friends'],['winter','hiking'],
    'Under the Italian side of Mont Blanc, with a cable car that crosses the massif into France in rotating glass cabins.'],
  'VDA-cervinia': ['Cervinia','VDA','mountain',45.9353,7.6294,8,['mountain'],['friends','family'],['winter','hiking'],
    'Skiing under the Matterhorn, high enough to run into May, with lifts over the ridge into Zermatt in Switzerland.'],
  'VDA-gran-paradiso': ['Gran Paradiso','VDA','np',45.5200,7.2700,7,['mountain'],['friends','family'],['hiking','wildlife','darksky'],
    'Italy’s first national park, created to save the ibex from extinction. It worked: there are now thousands, and they ignore you.'],
  'VDA-aosta': ['Aosta','VDA','town',45.7372,7.3206,6,['urban','mountain'],[],['history','ruins','food'],
    'A Roman garrison town laid out on a grid in 25 BC, with its arch, gate and theatre still standing among the Alps.'],
  'VDA-forte-di-bard': ['Forte di Bard','VDA','historic',45.6072,7.7447,5,['mountain'],['family'],['history'],
    'A fortress plugging the valley so completely that Napoleon had to sneak an army past it with rags on the wheels.'],

  /* ===================== MOLISE ===================== */
  'MOL-termoli': ['Termoli','MOL','town',42.0000,14.9950,5,['beach'],['family'],['coastal','food'],
    'A walled old town on a promontory with a Norman cathedral, a sand beach either side and ferries to the Tremiti islands.'],
  'MOL-saepinum': ['Saepinum','MOL','ruin',41.4333,14.6167,5,['rural'],[],['history','ruins'],
    'A complete small Roman town with its walls, gates, forum and theatre, standing in open farmland with no ticket office and no crowds.'],
  'MOL-campobasso': ['Campobasso','MOL','city',41.5603,14.6628,4,['urban','mountain'],[],['history','food'],
    'A hill capital under a 15th-century castle, known for a Corpus Christi procession of children suspended on iron frames.']
};

const IT_PLACE_IDS = Object.keys(IT_PLACES);

/* ===========================================================
   WIKIPEDIA TITLES THAT ARE NOT THE PLACE NAME

   Most Italian places are the primary topic for their own name on
   English Wikipedia — "Positano", "Alberobello" and "Matera" all go
   straight there, which is the opposite of US cities, where the bare
   name is usually a disambiguation page.

   These are the ones where that is not true: the article sits under
   an English name ("Phlegraean Fields"), a qualified one ("Ragusa,
   Sicily"), or a fuller official one. Listed here rather than guessed
   at, because a wrong guess shows the wrong photograph, and that is
   exactly the bug that put Colorado's red rocks on an Illinois page.
   =========================================================== */
const IT_WIKI = {
  'CAM-campi-flegrei':        'Phlegraean Fields',
  'SIC-ragusa':               'Ragusa, Sicily',
  'SIC-aeolian-islands':      'Aeolian Islands',
  'SIC-villa-romana-del-casale':'Villa Romana del Casale',
  'SIC-scala-dei-turchi':     'Scala dei Turchi',
  'SIC-mount-etna':           'Mount Etna',
  'SIC-syracuse':             'Syracuse, Sicily',
  'SIC-agrigento':            'Valley of the Temples',
  'SIC-monreale':             'Monreale Cathedral',
  'CAL-sila':                 'Sila National Park',
  'BAS-pollino':              'Pollino National Park',
  'VDA-gran-paradiso':        'Gran Paradiso National Park',
  'VDA-cervinia':             'Breuil-Cervinia',
  'VDA-courmayeur':           'Courmayeur',
  'ABR-abruzzo-national-park':'Abruzzo, Lazio and Molise National Park',
  'ABR-campo-imperatore':     'Campo Imperatore',
  'ABR-costa-dei-trabocchi':  'Trabocco',
  'MAR-frasassi-caves':       'Frasassi Caves',
  'MAR-conero-riviera':       'Monte Conero',
  'MAR-monti-sibillini':      'Monti Sibillini National Park',
  'PUG-grotte-di-castellana': 'Castellana Caves',
  'PUG-gargano':              'Gargano',
  'PUG-salento':              'Salento',
  'SAR-neptunes-grotto':      'Neptune’s Grotto',
  'SAR-golfo-di-orosei':      'Gulf of Orosei',
  'SAR-su-nuraxi':            'Su Nuraxi di Barumini',
  'SAR-la-maddalena':         'La Maddalena archipelago',
  'UMB-marmore-falls':        'Cascata delle Marmore',
  'UMB-lake-trasimeno':       'Lake Trasimeno',
  'LAZ-vatican-city':         'Vatican City',
  'LAZ-castelli-romani':      'Castelli Romani',
  'LAZ-tarquinia':            'Tarquinia',
  'LAZ-lake-bracciano':       'Lake Bracciano',
  'VEN-prosecco-hills':       'Conegliano',
  'VEN-burano':               'Burano',
  'VEN-murano':               'Murano',
  'TAA-dolomites':            'Dolomites',
  'TAA-alpe-di-siusi':        'Alpe di Siusi',
  'TAA-tre-cime-di-lavaredo': 'Tre Cime di Lavaredo',
  'TAA-lake-braies':          'Lago di Braies',
  'TAA-lake-carezza':         'Karersee',
  'TAA-val-gardena':          'Val Gardena',
  'TAA-seceda':               'Seceda',
  'TOS-val-d-orcia':          'Val d’Orcia',
  'TOS-chianti':              'Chianti',
  'TOS-maremma':              'Maremma',
  'TOS-versilia':             'Versilia',
  'TOS-saturnia':             'Saturnia',
  'TOS-elba':                 'Elba',
  'LOM-lake-como':            'Lake Como',
  'LOM-franciacorta':         'Franciacorta',
  'PIE-langhe':               'Langhe',
  'PIE-lake-maggiore':        'Lake Maggiore',
  'PIE-lake-orta':            'Lake Orta',
  'PIE-sacra-di-san-michele': 'Sacra di San Michele',
  'LIG-cinque-terre':         'Cinque Terre',
  'CAM-amalfi-coast':         'Amalfi Coast',
  'CAM-mount-vesuvius':       'Mount Vesuvius',
  'CAM-herculaneum':          'Herculaneum',
  'CAM-pompeii':              'Pompeii',
  'CAM-caserta':              'Royal Palace of Caserta',
  'CAM-cilento':              'Cilento and Vallo di Diano National Park',
  'MOL-saepinum':             'Saepinum',
  'FVG-aquileia':             'Aquileia',
  'EMR-rimini':               'Rimini',
  'PUG-castel-del-monte':     'Castel del Monte, Apulia',
  'BAS-craco':                'Craco',
  'LIG-portovenere':          'Porto Venere',
  'VEN-malcesine':            'Malcesine',
  'LOM-bormio':               'Bormio'
};

/* Decoder, identical in shape to placeGet so that page code reads the
   same whichever atlas it is walking. */
function itPlaceGet(id){
  const p = IT_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'IT' } : null;
}

function itRegionName(code){ return (IT_REGIONS[code] || [])[0] || code; }
function itKindLabel(k){ return IT_KIND[k] || k; }

/* Places in one region, best known first. */
function itRegionPlaces(code){
  return IT_PLACE_IDS.filter(id => IT_PLACES[id][1] === code)
    .sort((a, b) => (IT_PLACES[b][5] || 0) - (IT_PLACES[a][5] || 0));
}

/* Is the sea close enough that waves, currents and sea temperature are
   worth asking for? Decided from the tags rather than from a separate
   flag, so adding a coastal place cannot forget to set it. */
/* Definitely on the water — used where the answer has to be certain. */
function itIsCoastal(p){
  if (!p) return false;
  if (['coast','beach','island'].indexOf(p.kind) !== -1) return true;
  const land = p.land || [];
  return land.indexOf('beach') !== -1 || land.indexOf('island') !== -1;
}

/* The five Italian regions with no coastline at all. */
const IT_LANDLOCKED = { VDA: 1, PIE: 1, LOM: 1, TAA: 1, UMB: 1 };

/* Might be on the water, which is a different and more useful
   question when deciding whether to ask for a marine forecast.

   A coastal CITY carries none of the beach, coast or island tags —
   Naples is tagged "urban", and so are Genoa, Trieste, Palermo,
   Catania and Bari. The strict test above therefore missed every
   large port in the country, and the sea panel never appeared on the
   Bay of Naples. The marine grid already answers an inland request
   with every field null, and that case is handled as "not a sea", so
   the honest thing is to ask anywhere the region actually has a
   coast and let the forecast itself decide. */
function itMaybeCoastal(p){
  if (!p) return false;
  if (itIsCoastal(p)) return true;
  return !IT_LANDLOCKED[p.abbr];
}

/* Places where the ground itself is news. */
function itIsVolcanic(p){
  if (!p) return false;
  return p.kind === 'volcano' || (p.land || []).indexOf('volcanic') !== -1;
}
