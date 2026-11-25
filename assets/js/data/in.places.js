/* ===========================================================
   INDIA — regions and places

   Same packed-array shape as places.js, italy.places.js and
   cr.places.js:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Its own namespace (IN_PLACES / inPlaceGet), like the others, so
   nothing here can reach the US map, the US search index or the
   planner until the atlases are deliberately joined.

   The regions are the states and union territories, because that is
   how everybody here actually thinks and speaks: nobody plans a trip
   to "the north-west", they go to Rajasthan. Thirty-four of them
   carry places in this atlas.

   Region codes are three letters and were chosen to collide with
   neither Italy's twenty nor Costa Rica's nine, which already took
   the obvious short forms — SIC is Sicily, so Sikkim is SIK; CAR is
   the Costa Rican Caribbean, so Karnataka is KAR; PUG is Apulia, so
   Punjab is PUN.

   The vocabulary is India's own. "National park" carries over, but
   this is a country where a stepwell, a ghat and a hill station are
   each a distinct kind of place that nothing in the American or
   European lists describes.
   =========================================================== */

/* ---------- what a place IS, Indian edition ---------- */
const IN_KIND = {
  city:      'City',
  town:      'Town',
  village:   'Village',
  fort:      'Fort',
  palace:    'Palace',
  temple:    'Temple',
  mosque:    'Mosque & tomb',
  church:    'Church',
  monastery: 'Monastery',
  ruin:      'Ancient site',
  cave:      'Rock-cut caves',
  stepwell:  'Stepwell',
  ghat:      'River ghats',
  np:        'National park',
  sanctuary: 'Wildlife sanctuary',
  hill:      'Hill station',
  beach:     'Beach',
  island:    'Island',
  lake:      'Lake',
  river:     'River',
  mountain:  'Mountains',
  valley:    'Valley',
  desert:    'Desert',
  forest:    'Forest',
  falls:     'Waterfall',
  backwater: 'Backwaters',
  pass:      'Mountain pass',
  region:    'Region'
};

/* Extra flags India needs. The base FLAG list in taxonomy.js still
   applies underneath. */
const IN_FLAG = {
  unesco:      ['UNESCO',      'On the World Heritage list'],
  temple:      ['Temples',     'Living or historic temple architecture'],
  fort:        ['Forts',       'Fortified architecture worth the climb'],
  palace:      ['Palaces',     'Royal residences, lived in or museumed'],
  tiger:       ['Tiger',       'A reserve with a real chance of one'],
  trek:        ['Trekking',    'A base for walking into the mountains'],
  spiritual:   ['Pilgrimage',  'A place people come to for faith, not views'],
  colonial:    ['Colonial',    'European-built quarters still standing'],
  tribal:      ['Indigenous',  'Living Adivasi or tribal culture'],
  backwater:   ['Backwaters',  'Boat country'],
  birding:     ['Birding',     'A destination in its own right for birds'],
  diving:      ['Diving',      'Worth getting in the water with a tank'],
  hillstation: ['Hill station','Built by somebody escaping the heat'],
  coastal:     ['Coastal',     'The sea is the whole point'],
  himalaya:    ['Himalaya',    'High mountain country'],
  /* A tag used on a place but missing from here renders as its own
     raw lowercase key, which is how "monastery" turned up on the Leh
     page looking like a mistake among properly capitalised chips.
     The test suite now checks that every tag in use has a label. */
  monastery:   ['Monasteries', 'Buddhist gompas and the communities in them'],
  mosque:      ['Indo-Islamic','Mosques, tombs and Sultanate architecture'],
  church:      ['Churches',    'Colonial-era Christian architecture'],
  cave:        ['Rock-cut',    'Halls and temples cut into living rock'],
  desert:      ['Desert',      'Sand, salt or cold high desert']
};

/* ---------- the states and union territories ----------
   code -> [ English name, local name, character, blurb ] */
const IN_REGIONS = {
  RAJ: ['Rajasthan', 'राजस्थान', 'desert',
    'Desert kingdoms that never quite lost. Fort on every hill, a palace in every lake, and the loudest colour in the country.'],
  UTP: ['Uttar Pradesh', 'उत्तर प्रदेश', 'heritage',
    'The Ganges plain, and the weight of it: the Taj, the Buddha’s first sermon, and the oldest continuously lived-in city on earth.'],
  DEL: ['Delhi', 'दिल्ली', 'urban',
    'Seven cities stacked on one plain, from Tughlaq ruins to Lutyens’ avenues, with three World Heritage sites inside the ring road.'],
  HPR: ['Himachal Pradesh', 'हिमाचल प्रदेश', 'mountain',
    'The approachable Himalaya. Deodar forest and colonial hill stations at one end, the Tibetan plateau at the other.'],
  UTK: ['Uttarakhand', 'उत्तराखंड', 'mountain',
    'Where the Ganges comes from. Four shrines at the head of four valleys, the first tiger reserve in the world, and a meadow of flowers above the snowline.'],
  LAD: ['Ladakh', 'ལ་དྭགས', 'mountain',
    'High-altitude desert on the Tibetan plateau. Monasteries on crags, lakes the colour of antifreeze, and air with a third less oxygen in it.'],
  JKA: ['Jammu & Kashmir', 'जम्मू और कश्मीर', 'mountain',
    'The valley the Mughals built gardens for and called paradise. Houseboats, saffron fields, and the most contested ground in Asia.'],
  PUN: ['Punjab', 'ਪੰਜਾਬ', 'rural',
    'The land of five rivers, the Sikh heartland, and the best eating in north India. The Golden Temple feeds fifty thousand people a day for nothing.'],
  HAR: ['Haryana', 'हरियाणा', 'rural',
    'Wheat, wrestling and the field where the Mahabharata was fought. Mostly a place people drive through, with reasons not to.'],
  GUJ: ['Gujarat', 'ગુજરાત', 'rural',
    'A salt desert that floods and dries every year, the last Asiatic lions on earth, and stepwells cut seven storeys into the ground.'],
  MAH: ['Maharashtra', 'महाराष्ट्र', 'urban',
    'Mumbai and everything it is not: rock-cut caves older than most religions, hill forts the Marathas held, and the Konkan coast.'],
  GOA: ['Goa', 'गोंय', 'beach',
    'Four hundred and fifty years Portuguese, and it shows in the churches, the houses and the pork. Also the beaches, obviously.'],
  MPR: ['Madhya Pradesh', 'मध्य प्रदेश', 'heritage',
    'The middle. Prehistoric paint, the frankest temple sculpture in India, and the best tiger forests in the country.'],
  CHH: ['Chhattisgarh', 'छत्तीसगढ़', 'rural',
    'Forest, waterfalls and the strongest surviving Adivasi culture in central India. Almost nobody visits.'],
  KAR: ['Karnataka', 'ಕರ್ನಾಟಕ', 'heritage',
    'A boulder-field city of ruined empire, the cradle of South Indian temple architecture, coffee hills and a long empty coast.'],
  KER: ['Kerala', 'കേരളം', 'backwater',
    'A strip between the Ghats and the sea with a lagoon system running down it. Spice, Ayurveda, communism and the best food in India.'],
  TND: ['Tamil Nadu', 'தமிழ்நாடு', 'temple',
    'Temple country, and still functioning: towered gopurams you can see from kilometres off, with a thousand years of continuous worship under them.'],
  PUD: ['Puducherry', 'புதுச்சேரி', 'colonial',
    'French India, in a grid of yellow houses behind a seafront promenade, with an experimental township in the scrub outside.'],
  APR: ['Andhra Pradesh', 'ఆంధ్రప్రదేశ్', 'temple',
    'The richest temple on earth, a canyon nobody expects, and a long coast the tourist traffic has not found.'],
  TEL: ['Telangana', 'తెలంగాణ', 'urban',
    'Hyderabad and the Deccan around it: a Qutb Shahi fort, the biryani that beat every other biryani, and a star-shaped temple in a village.'],
  ODI: ['Odisha', 'ଓଡ଼ିଶା', 'temple',
    'A chariot temple in stone, a lagoon the size of a county, and the most intact tribal belt on the east coast.'],
  WBG: ['West Bengal', 'পশ্চিমবঙ্গ', 'urban',
    'Calcutta and its intellect, the tea slopes of Darjeeling, and the largest mangrove forest on earth with tigers in it.'],
  SIK: ['Sikkim', 'སུ་ཁྱིམ', 'mountain',
    'A Buddhist kingdom until 1975, entirely organic since 2016, with the third-highest mountain on earth standing over it.'],
  ASM: ['Assam', 'অসম', 'rural',
    'The Brahmaputra valley: tea gardens, the largest river island in the world, and two-thirds of all the rhinoceros left on earth.'],
  MEG: ['Meghalaya', 'মেঘালয়', 'mountain',
    'The abode of clouds, and the wettest inhabited place on the planet. Bridges here are grown from living fig roots rather than built.'],
  ARP: ['Arunachal Pradesh', 'अरुणाचल प्रदेश', 'mountain',
    'The last state to see the sunrise and the least visited in India. Tawang’s monastery is the largest in the country.'],
  NAG: ['Nagaland', 'Nagaland', 'tribal',
    'Sixteen major tribes, a valley of lilies, and villages where the last headhunters are still alive and happy to talk about it.'],
  MNP: ['Manipur', 'মণিপুর', 'lake',
    'A valley ringed by hills, with the only floating national park on earth sitting in the lake at the bottom of it.'],
  MIZ: ['Mizoram', 'Mizoram', 'mountain',
    'Ridge-top towns, near-total literacy, and a bamboo flowering cycle that brings famine once every half-century.'],
  TRI: ['Tripura', 'ত্রিপুরা', 'heritage',
    'A palace in the middle of a lake, rock carvings nobody can date, and a royal history that ran unbroken for centuries.'],
  BIH: ['Bihar', 'बिहार', 'spiritual',
    'Where the Buddha was enlightened and where the world’s first university stood. Poor, overlooked, and historically unmatched.'],
  JHA: ['Jharkhand', 'झारखंड', 'rural',
    'Forest and plateau cut out of Bihar in 2000. Waterfalls, one of the twelve jyotirlingas, and a serious Adivasi population.'],
  AND: ['Andaman & Nicobar', 'अंडमान और निकोबार', 'island',
    'Closer to Myanmar than to the mainland. The best diving in India, a colonial prison with a terrible history, and uncontacted people on one island.'],
  LAK: ['Lakshadweep', 'ലക്ഷദ്വീപ്', 'island',
    'Thirty-six coral atolls off Kerala, ten of them inhabited, and the only true atolls in India. Permits required, numbers capped.']
};

const IN_REGION_IDS = Object.keys(IN_REGIONS).sort((a, b) =>
  IN_REGIONS[a][0].localeCompare(IN_REGIONS[b][0]));

/* The entire country runs on one clock, UTC+5:30, across nearly
   thirty degrees of longitude. That is a deliberate choice and it has
   consequences a travel atlas should surface rather than hide: see
   inSunSpread() further down. */
function inZoneOf(){ return 'Asia/Kolkata'; }

/* ---------- the places ---------- */
const IN_PLACES = {

  /* ===================== RAJASTHAN ===================== */
  'RAJ-jaipur': ['Jaipur','RAJ','city',26.9124,75.7873,10,['urban'],['couple','family','friends'],['history','art','unesco','palace','fort','food'],
    'The first planned city in India, laid out on a grid in 1727 and painted pink for a royal visit in 1876. Still the best-organised chaos in Rajasthan.'],
  'RAJ-udaipur': ['Udaipur','RAJ','city',24.5854,73.7125,10,['urban','water'],['couple','honeymoon'],['palace','history','art','food'],
    'A city of lakes in a desert state, built by a dynasty that never submitted to the Mughals. The palace on the water is a hotel now, and the one on the shore is still the family’s.'],
  'RAJ-jodhpur': ['Jodhpur','RAJ','city',26.2389,73.0243,9,['urban','desert'],['couple','friends'],['fort','history','palace','food'],
    'The blue city under Mehrangarh, which is the most intact and most dramatic fort in India — a sheer wall of rock rising straight out of the old town.'],
  'RAJ-jaisalmer': ['Jaisalmer','RAJ','city',26.9157,70.9083,9,['desert','urban'],['couple','friends'],['fort','desert','unesco','history'],
    'A fort made of golden sandstone with people still living inside it — one of very few inhabited forts left anywhere — on the edge of the Thar.'],
  'RAJ-ranthambore': ['Ranthambore','RAJ','np',26.0173,76.5026,9,['forest'],['family','friends'],['tiger','wildlife','fort','birding'],
    'The tiger park where photographing tigers became a thing. A ruined tenth-century fort sits in the middle of it, and the tigers walk through it.'],
  'RAJ-pushkar': ['Pushkar','RAJ','town',26.4899,74.5511,8,['desert','water'],['solo','friends'],['spiritual','temple','history'],
    'A lake said to have formed where Brahma dropped a lotus, ringed by fifty-two ghats, with one of the only Brahma temples on earth above it.'],
  'RAJ-bikaner': ['Bikaner','RAJ','city',28.0229,73.3119,7,['desert','urban'],['solo'],['fort','history','food'],
    'A camel-breeding desert city with a fort never taken by force, the best fried snacks in Rajasthan, and a temple full of twenty thousand rats.'],
  'RAJ-chittorgarh': ['Chittorgarh','RAJ','fort',24.8887,74.6269,7,['rural'],['solo'],['fort','history','unesco'],
    'The largest fort in India by area and the most tragic: besieged three times, and three times the women inside committed mass immolation rather than surrender.'],
  'RAJ-kumbhalgarh': ['Kumbhalgarh','RAJ','fort',25.1485,73.5869,7,['mountain','forest'],['couple','solo'],['fort','unesco','history','hiking'],
    'A fort with thirty-six kilometres of wall around it — the second-longest continuous wall in the world after China’s — in the Aravalli hills.'],
  'RAJ-mount-abu': ['Mount Abu','RAJ','hill',24.5925,72.7156,6,['mountain'],['family','couple'],['hillstation','temple','history'],
    'Rajasthan’s only hill station, and the site of the Dilwara temples — Jain marble carved so finely it is translucent in places.'],
  'RAJ-bundi': ['Bundi','RAJ','town',25.4305,75.6499,6,['urban','rural'],['solo','couple'],['palace','history','art'],
    'A blue hill town with a crumbling palace full of the best surviving Rajput murals, and almost none of Jaipur’s crowds. Kipling wrote here.'],
  'RAJ-keoladeo': ['Keoladeo (Bharatpur)','RAJ','np',27.1592,77.5222,7,['water','forest'],['solo','family'],['birding','unesco','wildlife'],
    'A former duck-shooting reserve of the maharajas, now one of the great wetland bird sites of Asia. Best seen from a cycle rickshaw.'],
  'RAJ-ranakpur': ['Ranakpur','RAJ','temple',25.1159,73.4871,6,['rural','mountain'],['couple'],['temple','art','history'],
    'A fifteenth-century Jain temple with one thousand four hundred and forty-four marble pillars, no two carved alike.'],
  'RAJ-jawai': ['Jawai','RAJ','sanctuary',25.1000,73.1500,6,['rural','mountain'],['couple','friends'],['wildlife','birding'],
    'Granite hills where leopards live openly among villages and are not hunted — an arrangement of mutual tolerance that has held for generations.'],
  'RAJ-shekhawati': ['Shekhawati','RAJ','region',27.6094,75.1399,6,['rural','desert'],['solo'],['art','history'],
    'A cluster of desert towns whose merchant families covered their havelis in painted frescoes, then left. An open-air gallery slowly flaking away.'],
  'RAJ-ajmer': ['Ajmer','RAJ','city',26.4499,74.6399,6,['urban'],['solo'],['spiritual','history'],
    'The dargah of Moinuddin Chishti, the most important Sufi shrine in South Asia, drawing Muslims and Hindus alike in enormous numbers.'],
  'RAJ-sariska': ['Sariska','RAJ','np',27.3300,76.4400,5,['forest','mountain'],['family'],['tiger','wildlife'],
    'A tiger reserve that lost every tiger to poaching by 2004 and was restocked by moving animals in from Ranthambore. The experiment largely worked.'],
  'RAJ-osian': ['Osian','RAJ','ruin',26.7170,72.9110,4,['desert'],['solo'],['temple','history'],
    'Sixteen Hindu and Jain temples from the eighth to twelfth centuries in a desert village, and the start of most camel safaris out of Jodhpur.'],

  /* ===================== UTTAR PRADESH ===================== */
  'UTP-agra': ['Agra','UTP','city',27.1767,78.0081,10,['urban'],['couple','honeymoon','family'],['unesco','history','palace','art'],
    'Two World Heritage sites in one city, and one of them is the Taj Mahal. The other, Agra Fort, is where its builder was imprisoned by his son.'],
  'UTP-varanasi': ['Varanasi','UTP','ghat',25.3176,82.9739,10,['urban','water'],['solo','couple'],['spiritual','history','temple','food'],
    'Possibly the oldest continuously inhabited city on earth, and the one Hindus come to die in. Eighty-eight ghats, two of them burning around the clock.'],
  'UTP-fatehpur-sikri': ['Fatehpur Sikri','UTP','ruin',27.0945,77.6679,8,['rural'],['couple','family'],['unesco','history','mosque'],
    'Akbar built a capital in red sandstone, lived in it for fourteen years, and abandoned it — probably for want of water. It stands almost untouched.'],
  'UTP-sarnath': ['Sarnath','UTP','ruin',25.3811,83.0244,7,['rural'],['solo'],['spiritual','unesco','history'],
    'Where the Buddha gave his first sermon after enlightenment, setting the wheel of dharma turning. Inscribed by UNESCO in 2026.'],
  'UTP-lucknow': ['Lucknow','UTP','city',26.8467,80.9462,7,['urban'],['solo','couple'],['food','history','colonial','art'],
    'The Nawabi capital, and the politest city in India by its own account. Also the source of kebabs that do not require teeth.'],
  'UTP-mathura-vrindavan': ['Mathura & Vrindavan','UTP','town',27.4924,77.6737,7,['urban','rural'],['solo'],['spiritual','temple'],
    'Krishna’s birthplace and the town where he grew up. At Holi the colour here is less a festival than a weather event.'],
  'UTP-prayagraj': ['Prayagraj','UTP','city',25.4358,81.8463,7,['urban','water'],['solo'],['spiritual','history'],
    'Where the Ganges and Yamuna meet. Every twelve years the Kumbh Mela here becomes the largest gathering of human beings on the planet.'],
  'UTP-ayodhya': ['Ayodhya','UTP','town',26.7922,82.1998,6,['urban','water'],['solo'],['spiritual','temple'],
    'Rama’s birthplace by tradition, and the most politically consequential piece of ground in modern India.'],
  'UTP-dudhwa': ['Dudhwa','UTP','np',28.5100,80.6800,5,['forest','water'],['solo'],['tiger','wildlife','birding'],
    'Terai grassland and sal forest against the Nepal border, with tigers, swamp deer and one of the few reintroduced rhino populations in India.'],
  'UTP-chitrakoot': ['Chitrakoot','UTP','town',25.2000,80.8600,5,['rural','forest'],['solo'],['spiritual','temple'],
    'Where Rama is said to have spent eleven years of exile. Forested, riverine and almost entirely free of foreign visitors.'],
  'UTP-kushinagar': ['Kushinagar','UTP','ruin',26.7400,83.8900,5,['rural'],['solo'],['spiritual','history'],
    'Where the Buddha died and was cremated. A six-metre reclining Buddha from the fifth century lies in the main shrine.'],
  'UTP-jhansi': ['Jhansi','UTP','fort',25.4484,78.5685,4,['urban'],['solo'],['fort','history'],
    'The fort of Rani Lakshmibai, who died fighting the British in 1858 and became the defining figure of the 1857 uprising.'],
  'UTP-orchha-approach': ['Bateshwar','UTP','temple',26.9200,78.5200,3,['rural','water'],['solo'],['temple','history'],
    'A kilometre of over a hundred sandstone temples along the Yamuna, nearly all of them rebuilt from rubble by one archaeologist’s obsession.'],

  /* ===================== DELHI ===================== */
  'DEL-red-fort': ['Red Fort','DEL','fort',28.6562,77.2410,9,['urban'],['family','couple'],['unesco','history','fort'],
    'Shah Jahan’s citadel and the seat of Mughal power for two centuries. The prime minister still addresses the country from its ramparts every Independence Day.'],
  'DEL-humayuns-tomb': ['Humayun’s Tomb','DEL','mosque',28.5933,77.2507,9,['urban'],['couple','solo'],['unesco','history','art'],
    'The first great Mughal garden tomb, built in 1570, and the direct architectural ancestor of the Taj Mahal. Quieter and, some argue, better.'],
  'DEL-qutb-minar': ['Qutb Minar','DEL','ruin',28.5245,77.1855,8,['urban'],['family','couple'],['unesco','history'],
    'A seventy-three-metre victory tower begun in 1199, beside a mosque built from the pillars of twenty-seven demolished temples, and an iron pillar that has not rusted in sixteen centuries.'],
  'DEL-old-delhi': ['Old Delhi & Jama Masjid','DEL','city',28.6507,77.2334,9,['urban'],['solo','friends'],['food','history','mosque'],
    'Shahjahanabad: the largest mosque in India, Chandni Chowk’s impossible density, and the best street eating in north India.'],
  'DEL-lutyens': ['Lutyens’ Delhi','DEL','city',28.6143,77.1994,7,['urban'],['solo'],['colonial','history','art'],
    'The imperial capital laid out from 1911 — Rashtrapati Bhavan, India Gate and a processional axis built to outlast the empire that made it. It did.'],
  'DEL-lodhi-gardens': ['Lodhi Gardens','DEL','ruin',28.5933,77.2197,6,['urban'],['couple','solo'],['history','art'],
    'Fifteenth-century tombs scattered through a public park where Delhi walks its dogs. The most pleasant historic site in the city.'],
  'DEL-mehrauli': ['Mehrauli Archaeological Park','DEL','ruin',28.5200,77.1800,5,['urban','rural'],['solo'],['history'],
    'A thousand years of ruins in dense scrub next to the Qutb complex, almost entirely unvisited and largely unlabelled.'],
  'DEL-akshardham': ['Akshardham','DEL','temple',28.6127,77.2773,6,['urban'],['family'],['temple','art'],
    'A vast stone temple complex completed in 2005, carved entirely without structural steel. Opinions divide sharply; the craftsmanship does not.'],
  'DEL-hauz-khas': ['Hauz Khas','DEL','ruin',28.5535,77.1945,5,['urban','water'],['friends','couple'],['history','nightlife','food'],
    'A thirteenth-century reservoir and madrasa with a bar district grown up around it. The deer park next door is genuinely full of deer.'],

  /* ===================== HIMACHAL PRADESH ===================== */
  'HPR-spiti': ['Spiti Valley','HPR','valley',32.2460,78.0190,9,['mountain','desert'],['solo','friends'],['himalaya','trek','monastery','darksky'],
    'A cold desert at three thousand five hundred metres on the Tibetan plateau, cut off by snow for half the year, with monasteries a thousand years old in it.'],
  'HPR-manali': ['Manali','HPR','hill',32.2396,77.1887,8,['mountain','forest'],['friends','couple','family'],['hillstation','trek','himalaya'],
    'The end of the road in the Kullu valley and the gateway to everything beyond it. Touristed to the point of absurdity, and still beautiful above the town.'],
  'HPR-dharamshala': ['Dharamshala & McLeod Ganj','HPR','hill',32.2190,76.3234,8,['mountain','forest'],['solo','couple'],['monastery','spiritual','trek','hillstation'],
    'Home of the Dalai Lama and the Tibetan government in exile since 1960. A Himalayan ridge town that has become the centre of a displaced country.'],
  'HPR-shimla': ['Shimla','HPR','hill',31.1048,77.1734,8,['mountain','forest'],['family','couple'],['hillstation','colonial','unesco','history'],
    'The summer capital of British India — the empire moved here every year, up a mountain, with its files. The toy train that climbs to it is World Heritage.'],
  'HPR-kasol-parvati': ['Kasol & the Parvati Valley','HPR','valley',32.0100,77.3150,7,['mountain','forest','water'],['friends','solo'],['trek','himalaya'],
    'A river valley of pine forest and hot springs with a long-established traveller scene, a Sikh pilgrimage town at Manikaran, and some serious trekking above it.'],
  'HPR-kinnaur': ['Kinnaur','HPR','valley',31.5900,78.2700,7,['mountain','desert'],['solo','couple'],['himalaya','trek','monastery'],
    'The transition zone where green Himachal becomes Tibetan Spiti, along a road cut into cliffs above the Sutlej. Apple orchards below, bare rock above.'],
  'HPR-chitkul': ['Chitkul','HPR','village',31.3500,78.4400,6,['mountain'],['couple','solo'],['himalaya','trek','darksky'],
    'The last inhabited village before the Tibetan border on this road, at three thousand four hundred metres, with wooden houses and a river running past.'],
  'HPR-tabo': ['Tabo Monastery','HPR','monastery',32.0950,78.3850,6,['mountain','desert'],['solo'],['monastery','art','history'],
    'Founded in 996 AD and in continuous use since. The mud-walled interior holds wall paintings often compared to those at Ajanta.'],
  'HPR-kaza': ['Kaza','HPR','town',32.2270,78.0710,6,['mountain','desert'],['solo','friends'],['himalaya','monastery','darksky'],
    'The main settlement of Spiti and the base for Key Monastery, Kibber and Hikkim, which has the highest post office in the world.'],
  'HPR-bir-billing': ['Bir Billing','HPR','village',32.0420,76.7200,6,['mountain','forest'],['friends','solo'],['trek','hillstation'],
    'One of the best paragliding sites on earth — a two-thousand-four-hundred-metre launch and a long valley to land in. Also a Tibetan settlement with good monasteries.'],
  'HPR-great-himalayan-np': ['Great Himalayan National Park','HPR','np',31.7500,77.5000,6,['mountain','forest'],['solo'],['unesco','trek','wildlife','himalaya'],
    'World Heritage, roadless, and entered on foot. Four valleys of old-growth forest climbing to glaciers, with snow leopard and Himalayan tahr in them.'],
  'HPR-dalhousie-khajjiar': ['Dalhousie & Khajjiar','HPR','hill',32.5448,75.9618,5,['mountain','forest'],['family','couple'],['hillstation','colonial'],
    'A Scottish-feeling hill station of deodar and colonial bungalows, with a saucer-shaped alpine meadow nearby that tourism insists on calling mini-Switzerland.'],
  'HPR-narkanda': ['Narkanda','HPR','hill',31.2550,77.4600,4,['mountain','forest'],['couple'],['hillstation','winter','trek'],
    'Apple country above Shimla, with a short ski season and a viewpoint at Hatu Peak that takes in the whole Himalayan front range.'],
  'HPR-rohtang': ['Rohtang Pass & Atal Tunnel','HPR','pass',32.3660,77.2470,6,['mountain'],['family','friends'],['himalaya','roadtrip'],
    'The pass that sealed Lahaul off for six months a year until a nine-kilometre tunnel opened underneath it in 2020 and changed the whole region.'],

  /* ===================== UTTARAKHAND ===================== */
  'UTK-rishikesh': ['Rishikesh','UTK','town',30.0869,78.2676,9,['mountain','water'],['solo','friends'],['spiritual','water','hiking'],
    'Where the Ganges leaves the mountains. Yoga capital of the world by self-appointment, whitewater capital of India by fact, and dry by law.'],
  'UTK-jim-corbett': ['Jim Corbett','UTK','np',29.5300,78.7700,8,['forest','water'],['family','friends'],['tiger','wildlife','birding'],
    'The first national park in India, established in 1936, and the birthplace of Project Tiger. Named for a hunter who became the tigers’ best advocate.'],
  'UTK-valley-of-flowers': ['Valley of Flowers','UTK','np',30.7280,79.6050,8,['mountain'],['solo','couple'],['unesco','trek','himalaya','hiking'],
    'A high alpine meadow that erupts into hundreds of flowering species for a few weeks each monsoon, and is under snow the rest of the year.'],
  'UTK-haridwar': ['Haridwar','UTK','ghat',29.9457,78.1642,8,['urban','water'],['solo','family'],['spiritual','temple'],
    'One of the four Kumbh Mela cities, where the Ganges hits the plains. The evening aarti at Har Ki Pauri draws thousands every single night.'],
  'UTK-nainital': ['Nainital','UTK','hill',29.3919,79.4542,7,['mountain','water'],['family','couple'],['hillstation','colonial'],
    'A colonial hill station built round a green eye-shaped lake, with boats on the water and a ridge walk above it.'],
  'UTK-mussoorie': ['Mussoorie','UTK','hill',30.4598,78.0644,7,['mountain','forest'],['family','couple'],['hillstation','colonial'],
    'The queen of the hills, strung along a ridge above Dehradun, with the whole Doon valley on one side and the snow peaks on the other.'],
  'UTK-badrinath': ['Badrinath','UTK','temple',30.7433,79.4938,7,['mountain'],['solo','family'],['spiritual','temple','himalaya'],
    'One of the four Char Dham shrines, at three thousand one hundred metres, open only from spring to autumn and backed by the Neelkanth peak.'],
  'UTK-kedarnath': ['Kedarnath','UTK','temple',30.7346,79.0669,8,['mountain'],['solo'],['spiritual','temple','himalaya','hiking'],
    'A twelfth-century stone temple at three thousand five hundred metres, reached on a sixteen-kilometre walk, and the only building left standing when the 2013 floods came through.'],
  'UTK-auli': ['Auli','UTK','hill',30.5290,79.5660,6,['mountain'],['friends','family'],['winter','himalaya','trek'],
    'India’s best-regarded ski slope, with Nanda Devi filling the skyline and a cable car up from Joshimath.'],
  'UTK-chopta-tungnath': ['Chopta & Tungnath','UTK','mountain',30.4890,79.1920,6,['mountain','forest'],['solo','couple'],['trek','hiking','temple','himalaya'],
    'Meadow and rhododendron forest, with the highest Shiva temple in the world at the top of a short steep walk and a ridge beyond it.'],
  'UTK-binsar': ['Binsar','UTK','sanctuary',29.7000,79.7500,5,['mountain','forest'],['couple','solo'],['wildlife','birding','himalaya'],
    'Oak forest on a ridge in Kumaon with a three-hundred-kilometre arc of Himalayan peaks visible on a clear morning and almost nobody around.'],
  'UTK-gangotri': ['Gangotri','UTK','temple',30.9947,78.9398,6,['mountain'],['solo'],['spiritual','temple','himalaya','trek'],
    'The source shrine of the Ganges, with the actual glacier snout another eighteen kilometres on foot up the valley at Gaumukh.'],
  'UTK-almora': ['Almora','UTK','town',29.5892,79.6467,5,['mountain'],['solo','couple'],['hillstation','history'],
    'A Kumaoni hill town on a horseshoe ridge with a long intellectual history — Vivekananda, Tagore and a stream of writers all spent time here.'],
  'UTK-rajaji': ['Rajaji','UTK','np',30.0000,78.2000,5,['forest','water'],['family'],['wildlife','tiger','birding'],
    'Sal forest and elephant country where the Shivaliks meet the plains, running right up to the edge of Haridwar and Rishikesh.'],
  'UTK-nanda-devi': ['Nanda Devi','UTK','mountain',30.3770,79.9710,6,['mountain'],['solo'],['unesco','himalaya','trek'],
    'The second-highest mountain in India and the highest entirely within it, standing in a ring of peaks that sealed off its sanctuary until 1934.'],

  /* ===================== LADAKH ===================== */
  'LAD-leh': ['Leh','LAD','town',34.1526,77.5771,9,['mountain','desert'],['solo','friends'],['himalaya','monastery','trek','darksky'],
    'The old Ladakhi capital at three thousand five hundred metres, under a ruined nine-storey palace, and the place everybody acclimatises before going higher.'],
  'LAD-pangong': ['Pangong Tso','LAD','lake',33.7400,78.9000,9,['mountain','water','desert'],['couple','friends'],['himalaya','darksky','roadtrip'],
    'A hundred and thirty kilometres of impossibly blue saltwater lake at four thousand three hundred metres, two-thirds of it in Tibet.'],
  'LAD-nubra': ['Nubra Valley','LAD','valley',34.6800,77.5600,8,['mountain','desert'],['friends','couple'],['himalaya','roadtrip','monastery'],
    'Sand dunes and double-humped Bactrian camels at three thousand metres, reached over one of the highest motorable passes on earth.'],
  'LAD-tso-moriri': ['Tso Moriri','LAD','lake',32.9000,78.3000,7,['mountain','water','desert'],['solo','couple'],['himalaya','birding','darksky'],
    'A high-altitude lake at four thousand five hundred metres in the Changthang, with nomadic Changpa herders and black-necked cranes breeding on the shore.'],
  'LAD-hemis': ['Hemis Monastery','LAD','monastery',33.9120,77.7020,7,['mountain'],['solo'],['monastery','spiritual','art'],
    'The largest and wealthiest monastery in Ladakh, founded in 1672, and host to a masked dance festival that fills the courtyard every summer.'],
  'LAD-thiksey': ['Thiksey Monastery','LAD','monastery',34.0556,77.6672,7,['mountain'],['couple','solo'],['monastery','spiritual','art'],
    'Twelve storeys stacked up a hill in a way that deliberately recalls the Potala, with a fifteen-metre Maitreya Buddha inside and dawn prayers worth getting up for.'],
  'LAD-lamayuru': ['Lamayuru','LAD','monastery',34.2840,76.7760,6,['mountain','desert'],['solo'],['monastery','himalaya','roadtrip'],
    'A monastery on a spur above eroded badlands that everybody calls moonland, on the long road in from Kargil.'],
  'LAD-alchi': ['Alchi','LAD','monastery',34.2250,77.1750,6,['mountain','water'],['solo','couple'],['monastery','art','history'],
    'Eleventh-century wall paintings in a Kashmiri style that survives almost nowhere else, on the valley floor rather than a crag — which is why they survived.'],
  'LAD-khardung-la': ['Khardung La','LAD','pass',34.2780,77.6040,6,['mountain'],['friends'],['himalaya','roadtrip'],
    'A pass at around five thousand three hundred and sixty metres on the road to Nubra, long and loudly advertised as the highest motorable road in the world.'],
  'LAD-zanskar': ['Zanskar','LAD','valley',33.4500,76.9000,7,['mountain','desert','water'],['solo','friends'],['trek','himalaya','monastery'],
    'A valley sealed by snow for seven months, whose river freezes solid enough to walk down — the Chadar trek, which is both a tourist route and a local necessity.'],
  'LAD-turtuk': ['Turtuk','LAD','village',34.8470,76.8310,6,['mountain','desert'],['solo','couple'],['himalaya','tribal'],
    'A Balti village that was in Pakistan until 1971 and opened to visitors only in 2010. Apricot orchards, and a culture unlike the rest of Ladakh.'],
  'LAD-kargil': ['Kargil','LAD','town',34.5539,76.1349,4,['mountain'],['solo'],['history','himalaya'],
    'The halfway town on the Srinagar–Leh road, and the name attached to the 1999 conflict fought on the ridges above it.'],
  'LAD-markha': ['Markha Valley','LAD','valley',33.8000,77.3000,6,['mountain','desert'],['solo','friends'],['trek','himalaya','hiking'],
    'The classic Ladakhi trek — a week of river crossings, homestays and passes over five thousand metres, through the Hemis high-altitude national park.'],

  /* ===================== JAMMU & KASHMIR ===================== */
  'JKA-srinagar': ['Srinagar','JKA','city',34.0837,74.7973,9,['urban','water','mountain'],['couple','family'],['history','art','food'],
    'Houseboats on Dal Lake, floating vegetable markets before dawn, and Mughal gardens laid out on the slopes above by emperors who called this paradise.'],
  'JKA-gulmarg': ['Gulmarg','JKA','hill',34.0484,74.3805,8,['mountain','forest'],['friends','couple'],['winter','hillstation','trek'],
    'A meadow at two thousand seven hundred metres with one of the highest cable cars in the world above it, and genuinely serious off-piste skiing in winter.'],
  'JKA-pahalgam': ['Pahalgam','JKA','town',34.0150,75.3150,7,['mountain','forest','water'],['family','couple'],['hillstation','trek','spiritual'],
    'A valley town where two rivers meet, the base for the Amarnath pilgrimage, and the trailhead for some of Kashmir’s best walking.'],
  'JKA-sonamarg': ['Sonamarg','JKA','valley',34.3000,75.2900,6,['mountain'],['family','couple'],['trek','himalaya'],
    'The meadow of gold, at the head of the Sindh valley, with the Thajiwas glacier above it and the road to Ladakh climbing out of it.'],
  'JKA-vaishno-devi': ['Vaishno Devi','JKA','temple',33.0300,74.9490,7,['mountain'],['family','solo'],['spiritual','temple','hiking'],
    'A cave shrine reached on a twelve-kilometre climb from Katra, and one of the most visited pilgrimage sites in India — millions every year, on foot.'],
  'JKA-yusmarg': ['Yusmarg','JKA','valley',33.8300,74.6700,5,['mountain','forest'],['couple','solo'],['trek','hillstation'],
    'A quiet alpine meadow ringed by pine, an hour from Srinagar and almost entirely free of the crowds that fill Gulmarg.'],
  'JKA-jammu': ['Jammu','JKA','city',32.7266,74.8570,5,['urban'],['solo'],['temple','history'],
    'The winter capital and the city of temples, on a bluff above the Tawi, and the rail head for most of Kashmir.'],
  'JKA-doodhpathri': ['Doodhpathri','JKA','valley',33.8300,74.6000,4,['mountain','forest'],['couple'],['trek'],
    'A meadow of milky-white streams an hour and a half from Srinagar, developed late and still comparatively quiet.'],

  /* ===================== PUNJAB ===================== */
  'PUN-amritsar': ['Amritsar','PUN','city',31.6200,74.8765,10,['urban'],['solo','family','couple'],['spiritual','temple','history','food'],
    'The Golden Temple, which feeds anybody who turns up — around fifty thousand meals a day, free, cooked by volunteers — and Jallianwala Bagh next door.'],
  'PUN-wagah': ['Wagah Border','PUN','town',31.6050,74.5730,6,['rural'],['family','friends'],['history'],
    'The daily flag-lowering ceremony on the Pakistan border: high kicks, moustaches and competitive patriotism performed to a stadium crowd on both sides.'],
  'PUN-anandpur-sahib': ['Anandpur Sahib','PUN','town',31.2390,76.5030,6,['rural'],['solo','family'],['spiritual','temple','history'],
    'Where the Khalsa was founded in 1699. The Virasat-e-Khalsa museum here is one of the best-designed museums in the country.'],
  'PUN-chandigarh': ['Chandigarh','PUN','city',30.7333,76.7794,6,['urban'],['solo','family'],['unesco','art','history'],
    'Le Corbusier’s planned capital, built from nothing in the 1950s, with a World Heritage listing and a garden made entirely of industrial waste.'],
  'PUN-patiala': ['Patiala','PUN','city',30.3398,76.3869,4,['urban'],['solo'],['palace','history','food'],
    'A princely capital with a vast fort-palace, a tradition of music and turban-tying, and a measure of whisky named after its maharaja’s generosity.'],

  /* ===================== HARYANA ===================== */
  'HAR-kurukshetra': ['Kurukshetra','HAR','town',29.9695,76.8783,5,['rural','water'],['solo'],['spiritual','history','temple'],
    'The battlefield of the Mahabharata and the place where the Bhagavad Gita is said to have been spoken. Tanks, temples and a good museum.'],
  'HAR-sultanpur': ['Sultanpur','HAR','np',28.4600,76.8900,4,['water'],['solo','family'],['birding','wildlife'],
    'A shallow lake an hour from Delhi that fills with migratory waterfowl from October to March, and the easiest serious birding near the capital.'],
  'HAR-morni': ['Morni Hills','HAR','hill',30.6900,76.9800,3,['mountain','forest'],['couple'],['hillstation','hiking'],
    'Haryana’s only hill station, a low Shivalik ridge above Chandigarh with two lakes and some modest walking.'],

  /* ===================== GUJARAT ===================== */
  'GUJ-rann-of-kutch': ['Rann of Kutch','GUJ','desert',23.8500,69.8500,9,['desert'],['couple','friends'],['desert','darksky','tribal','art'],
    'A salt flat the size of a small country that floods every monsoon and dries white every winter. On a full moon it is one of the strangest landscapes on earth.'],
  'GUJ-gir': ['Gir','GUJ','np',21.1250,70.8000,9,['forest'],['family','friends'],['wildlife','birding'],
    'The only place on earth with wild Asiatic lions. Down to about twenty animals a century ago, protected by the Nawab of Junagadh, now several hundred.'],
  'GUJ-ahmedabad': ['Ahmedabad','GUJ','city',23.0225,72.5714,8,['urban'],['solo','family'],['unesco','history','food','art','mosque'],
    'India’s first World Heritage city — a walled old town of pols, carved wooden houses and Indo-Islamic mosques, with Gandhi’s ashram on the river.'],
  'GUJ-rani-ki-vav': ['Rani ki Vav, Patan','GUJ','stepwell',23.8588,72.1017,8,['rural'],['couple','solo'],['unesco','art','history'],
    'A stepwell cut seven storeys into the ground in the eleventh century, with over five hundred major sculptures on its walls. Silted up for centuries, which is why it survived.'],
  'GUJ-dwarka': ['Dwarka','GUJ','temple',22.2442,68.9685,7,['urban','beach'],['solo','family'],['spiritual','temple','coastal'],
    'One of the four Char Dham shrines and, by tradition, Krishna’s own city — much of which is believed to lie underwater offshore.'],
  'GUJ-somnath': ['Somnath','GUJ','temple',20.8880,70.4010,7,['beach','urban'],['solo','family'],['spiritual','temple','coastal','history'],
    'The first of the twelve jyotirlingas, destroyed and rebuilt at least six times over a thousand years, standing on the Arabian Sea with nothing between it and Antarctica.'],
  'GUJ-champaner': ['Champaner-Pavagadh','GUJ','ruin',22.4860,73.5370,7,['rural','mountain'],['solo'],['unesco','history','mosque','temple'],
    'A sixteenth-century capital abandoned after conquest, with mosques that fuse Hindu and Islamic craft, below a hill crowned by a much older temple.'],
  'GUJ-modhera': ['Modhera Sun Temple','GUJ','temple',23.5860,72.1320,7,['rural'],['couple','solo'],['temple','art','history'],
    'An eleventh-century temple to Surya with a vast stepped tank in front, built so that the equinox sun strikes the sanctum directly.'],
  'GUJ-dholavira': ['Dholavira','GUJ','ruin',23.8870,70.2130,7,['desert'],['solo'],['unesco','history'],
    'A Harappan city on an island in the Rann, four and a half thousand years old, with the most sophisticated water-harvesting system of the entire civilisation.'],
  'GUJ-bhuj': ['Bhuj','GUJ','city',23.2420,69.6669,6,['desert','urban'],['solo','couple'],['art','tribal','history'],
    'The craft capital of Kutch — block printing, bandhani, mirror embroidery and rogan art — rebuilt after the devastating earthquake of 2001.'],
  'GUJ-little-rann': ['Little Rann of Kutch','GUJ','sanctuary',23.3000,71.3000,6,['desert'],['solo','family'],['wildlife','birding','desert'],
    'The last refuge of the Indian wild ass, and a winter wetland that fills with flamingos, cranes and pelicans.'],
  'GUJ-palitana': ['Palitana','GUJ','temple',21.4860,71.8300,6,['mountain'],['solo'],['spiritual','temple','hiking'],
    'Nine hundred Jain temples on a single hill, reached by climbing three and a half thousand steps. Nobody is permitted to sleep at the top, not even monks.'],
  'GUJ-statue-of-unity': ['Statue of Unity','GUJ','ruin',21.8380,73.7190,5,['rural','water'],['family'],['history'],
    'At a hundred and eighty-two metres, the tallest statue in the world, standing on an island in the Narmada and visible from a very long way off.'],
  'GUJ-saputara': ['Saputara','GUJ','hill',20.5700,73.7500,4,['mountain','forest'],['family'],['hillstation'],
    'Gujarat’s only hill station, on the Sahyadri ridge at the Maharashtra border, and a monsoon destination rather than a summer one.'],

  /* ===================== MAHARASHTRA ===================== */
  'MAH-mumbai': ['Mumbai','MAH','city',19.0760,72.8777,10,['urban','beach'],['solo','friends','couple'],['unesco','colonial','food','nightlife','art','coastal'],
    'Seven islands joined into one city of twenty million. Victorian Gothic and Art Deco ensembles on the seafront, the biggest film industry on earth, and no space left anywhere.'],
  'MAH-ajanta': ['Ajanta Caves','MAH','cave',20.5519,75.7033,10,['rural'],['solo','couple'],['unesco','art','history','spiritual'],
    'Thirty Buddhist caves cut into a horseshoe gorge between the second century BC and the sixth AD, holding the finest surviving ancient painting in India. Lost to the forest until 1819.'],
  'MAH-ellora': ['Ellora Caves','MAH','cave',20.0268,75.1790,10,['rural'],['solo','couple'],['unesco','art','history','temple'],
    'Thirty-four Buddhist, Hindu and Jain caves side by side, including Kailasa — a full temple carved downward out of one rock, the largest monolithic excavation on earth.'],
  'MAH-elephanta': ['Elephanta Caves','MAH','cave',18.9633,72.9315,8,['island'],['couple','family'],['unesco','art','history','temple','coastal'],
    'Sixth-century rock-cut Shiva caves on an island an hour by boat from the Gateway of India, with a six-metre three-headed Sadashiva at the back.'],
  'MAH-aurangabad': ['Chhatrapati Sambhajinagar','MAH','city',19.8762,75.3433,7,['urban'],['solo'],['history','fort','mosque'],
    'The base for Ajanta and Ellora, with a Mughal tomb modelled on the Taj, and Daulatabad’s hill fort — never taken by siege — just outside.'],
  'MAH-pune': ['Pune','MAH','city',18.5204,73.8567,7,['urban'],['solo','friends'],['food','history','art','nightlife'],
    'The Maratha capital and now a university and tech city, with a palace, Osho’s ashram, and the best misal pav anywhere.'],
  'MAH-tadoba': ['Tadoba','MAH','np',20.2300,79.3300,7,['forest'],['friends','family'],['tiger','wildlife','birding'],
    'Dry teak forest in eastern Maharashtra with the highest tiger density in the state and a reputation for daylight sightings.'],
  'MAH-mahabaleshwar': ['Mahabaleshwar','MAH','hill',17.9307,73.6477,6,['mountain','forest'],['family','couple'],['hillstation','colonial'],
    'The Bombay Presidency’s summer capital, on a Sahyadri plateau, with strawberry farms and a dozen viewpoints off the escarpment.'],
  'MAH-matheran': ['Matheran','MAH','hill',18.9867,73.2707,6,['mountain','forest'],['couple','family'],['hillstation','colonial'],
    'A hill station where motor vehicles are entirely banned — you arrive on foot, on horseback or on a narrow-gauge toy train, and the silence is the point.'],
  'MAH-lonavala': ['Lonavala & Karla','MAH','hill',18.7546,73.4062,6,['mountain','forest'],['family','friends'],['hillstation','cave','history'],
    'The weekend valve for Mumbai and Pune, with second-century Buddhist caves at Karla and Bhaja that most of the weekenders drive straight past.'],
  'MAH-tarkarli': ['Tarkarli & Sindhudurg','MAH','beach',16.0500,73.4700,6,['beach','water'],['couple','family'],['coastal','diving','fort','water'],
    'The clearest water on the Konkan coast, with scuba diving, and Shivaji’s sea fort built on a rock offshore in 1664.'],
  'MAH-alibaug': ['Alibaug','MAH','beach',18.6414,72.8722,5,['beach'],['family','friends'],['coastal','fort'],
    'Mumbai’s nearest beach escape, reached by ferry across the harbour, with a fort you can walk to at low tide.'],
  'MAH-nashik': ['Nashik','MAH','city',19.9975,73.7898,6,['urban','rural','water'],['friends','couple'],['spiritual','food'],
    'A Kumbh Mela city on the Godavari that has also become the centre of Indian wine — several dozen vineyards within an hour of town.'],
  'MAH-kolhapur': ['Kolhapur','MAH','city',16.7050,74.2433,5,['urban'],['solo'],['temple','food','history','palace'],
    'A Maratha princely capital with a major Mahalakshmi temple, a wrestling tradition still practised in mud pits, and a famously fiery cuisine.'],
  'MAH-shirdi': ['Shirdi','MAH','town',19.7645,74.4762,6,['rural'],['family','solo'],['spiritual','temple'],
    'The village of Sai Baba, now one of the most visited pilgrimage sites in India, with queues that run through the night.'],
  'MAH-bhimashankar': ['Bhimashankar','MAH','sanctuary',19.0720,73.5360,5,['mountain','forest'],['solo','couple'],['temple','wildlife','hiking','spiritual'],
    'A jyotirlinga temple inside a wildlife sanctuary of Western Ghats forest, home to the giant squirrel and some of the best monsoon walking near Pune.'],
  'MAH-raigad': ['Raigad Fort','MAH','fort',18.2340,73.4400,6,['mountain'],['solo','friends'],['fort','unesco','history','hiking'],
    'Shivaji’s capital and the place he was crowned in 1674, on a flat-topped hill reached by fourteen hundred steps or a ropeway.'],

  /* ===================== GOA ===================== */
  'GOA-old-goa': ['Old Goa','GOA','church',15.5007,73.9114,8,['rural','water'],['solo','couple'],['unesco','colonial','history','church'],
    'The capital of Portuguese India, once larger than Lisbon, emptied by cholera and malaria. Half a dozen enormous churches stand in open grass where the city was.'],
  'GOA-panaji': ['Panaji','GOA','city',15.4909,73.8278,7,['urban','water'],['couple','solo'],['colonial','food','art','nightlife'],
    'A small riverside capital with the Latin Quarter of Fontainhas behind it — ochre and blue houses, azulejo tiles and street names in Portuguese.'],
  'GOA-palolem': ['Palolem','GOA','beach',15.0100,74.0230,7,['beach'],['couple','friends'],['coastal','nightlife','water'],
    'A near-perfect crescent in south Goa, with coconut palms to the waterline and silent discos where everyone wears headphones because amplified music is banned.'],
  'GOA-anjuna': ['Anjuna','GOA','beach',15.5752,73.7400,7,['beach'],['friends','solo'],['coastal','nightlife','music'],
    'The original hippie beach and the home of the Wednesday flea market. Rockier than most, and still where Goa’s trance history is thickest.'],
  'GOA-agonda': ['Agonda','GOA','beach',15.0430,73.9880,6,['beach'],['couple'],['coastal','water'],
    'Three kilometres of sand in the south with turtle nesting at one end, low-rise huts and a deliberate absence of nightlife.'],
  'GOA-arambol': ['Arambol','GOA','beach',15.6860,73.7040,6,['beach','water'],['friends','solo'],['coastal','music','nightlife'],
    'The far north, with a freshwater lake behind the sand, drum circles at sunset and a long-settled alternative crowd.'],
  'GOA-calangute-baga': ['Calangute & Baga','GOA','beach',15.5440,73.7550,6,['beach','urban'],['friends','family'],['coastal','nightlife','food'],
    'The busiest stretch in Goa and unapologetic about it — water sports, shacks end to end, and the domestic tourist crowd in full force.'],
  'GOA-dudhsagar': ['Dudhsagar Falls','GOA','falls',15.3144,74.3143,7,['forest','water','mountain'],['friends','couple'],['water','hiking'],
    'A three-hundred-metre fall on the Karnataka border that the railway crosses on a viaduct partway down. Spectacular in and just after the monsoon.'],
  'GOA-fort-aguada': ['Fort Aguada','GOA','fort',15.4920,73.7730,5,['beach','water'],['couple','family'],['fort','colonial','coastal'],
    'A Portuguese fort of 1612 guarding the Mandovi, with a freshwater spring that watered passing ships and a lighthouse still standing.'],
  'GOA-divar-chorao': ['Divar & Chorão','GOA','island',15.5200,73.9000,5,['island','water','rural'],['couple','solo'],['colonial','birding','coastal'],
    'Two river islands reached by free ferry, with Portuguese village houses, paddy fields and a bird sanctuary on the mangrove edge.'],

  /* ===================== MADHYA PRADESH ===================== */
  'MPR-khajuraho': ['Khajuraho','MPR','temple',24.8318,79.9199,9,['rural'],['couple','solo'],['unesco','temple','art','history'],
    'Twenty-five surviving temples of an original eighty-five, built in a hundred-year burst around 1000 AD, and carved with the frankest sculpture in Indian art.'],
  'MPR-bandhavgarh': ['Bandhavgarh','MPR','np',23.7000,81.0300,9,['forest','mountain'],['friends','family'],['tiger','wildlife','fort','birding'],
    'The highest density of tigers of any park in India, in sal forest below a two-thousand-year-old hill fort.'],
  'MPR-sanchi': ['Sanchi','MPR','ruin',23.4793,77.7398,8,['rural'],['solo','couple'],['unesco','spiritual','history','art'],
    'The oldest stone structure in India — a Mauryan stupa begun by Ashoka in the third century BC, with four carved gateways added later.'],
  'MPR-kanha': ['Kanha','MPR','np',22.3345,80.6115,8,['forest'],['family','friends'],['tiger','wildlife','birding'],
    'The park that inspired The Jungle Book, and the one that saved the barasingha from extinction. Vast meadows and sal forest.'],
  'MPR-gwalior': ['Gwalior','MPR','fort',26.2183,78.1828,7,['urban'],['solo','family'],['fort','history','palace','music'],
    'A hill fort Babur called the pearl among Indian fortresses, with blue-tiled walls, Jain colossi cut into the cliff, and the tomb of Tansen below.'],
  'MPR-orchha': ['Orchha','MPR','town',25.3518,78.6400,7,['rural','water'],['couple','solo'],['palace','history','temple'],
    'A sixteenth-century Bundela capital on the Betwa, left almost exactly as it was — palaces, cenotaphs along the river, and very little traffic.'],
  'MPR-bhimbetka': ['Bhimbetka','MPR','ruin',22.9376,77.6128,7,['forest','rural'],['solo'],['unesco','history','art'],
    'Rock shelters painted continuously from the Mesolithic onward — some of the images are perhaps ten thousand years old, and people lived here until recently.'],
  'MPR-pench': ['Pench','MPR','np',21.7000,79.3000,7,['forest','water'],['family','friends'],['tiger','wildlife','birding'],
    'Teak forest either side of the Pench river, quieter than Kanha, and the landscape Kipling actually had in mind.'],
  'MPR-panna': ['Panna','MPR','np',24.7200,80.0100,6,['forest','water'],['friends'],['tiger','wildlife','birding'],
    'A park that lost all its tigers to poaching by 2009 and was successfully repopulated, with gorges and waterfalls on the Ken river.'],
  'MPR-mandu': ['Mandu','MPR','ruin',22.3650,75.3950,7,['mountain','rural'],['couple','solo'],['history','mosque','palace'],
    'An abandoned hilltop city of Afghan palaces and mosques, with a ship-shaped palace between two lakes and a love story attached to all of it.'],
  'MPR-ujjain': ['Ujjain','MPR','city',23.1765,75.7885,6,['urban','water'],['solo','family'],['spiritual','temple'],
    'A Kumbh Mela city and the site of Mahakaleshwar, where the dawn bhasma aarti uses ash and is unlike any other ritual in India.'],
  'MPR-maheshwar': ['Maheshwar','MPR','town',22.1760,75.5870,6,['water','rural'],['couple','solo'],['temple','art','history'],
    'Ghats and a fort on the Narmada, and the handloom tradition revived by the queen Ahilyabai Holkar in the eighteenth century and still running.'],
  'MPR-omkareshwar': ['Omkareshwar','MPR','temple',22.2420,76.1510,5,['water','rural'],['solo'],['spiritual','temple'],
    'A jyotirlinga on an island in the Narmada shaped, by tradition, like the Om symbol.'],
  'MPR-satpura': ['Satpura','MPR','np',22.5000,78.3000,6,['forest','mountain','water'],['solo','couple'],['wildlife','birding','hiking'],
    'The one major Indian tiger park where you can walk, canoe and camp rather than only drive. Fewer tigers, far better forest experience.'],
  'MPR-bhopal': ['Bhopal','MPR','city',23.2599,77.4126,5,['urban','water'],['solo'],['mosque','history','art'],
    'Lakes, one of the largest mosques in India, and a museum of tribal art that is among the best-designed in the country.'],
  'MPR-chanderi': ['Chanderi','MPR','town',24.7200,78.1400,4,['rural','mountain'],['solo'],['art','history','fort'],
    'A weaving town below a hill fort, producing the sheer cotton-silk sari that carries its name, with Bundela and Sultanate ruins scattered around it.'],

  /* ===================== CHHATTISGARH ===================== */
  'CHH-chitrakote': ['Chitrakote Falls','CHH','falls',19.2030,81.7000,6,['forest','water'],['couple','family'],['water'],
    'The widest waterfall in India, on the Indravati, horseshoe-shaped and thunderous in the monsoon. Often called the Niagara of India, and for once the comparison holds.'],
  'CHH-bastar': ['Bastar','CHH','region',19.1000,82.0000,5,['forest','rural'],['solo'],['tribal','art','wildlife'],
    'A forest region with one of the strongest surviving Adivasi cultures in India — weekly haat markets, bell-metal casting and a ten-day Dussehra that has nothing to do with Rama.'],
  'CHH-sirpur': ['Sirpur','CHH','ruin',21.3400,82.1800,4,['rural','water'],['solo'],['history','temple','spiritual'],
    'A sixth-century Buddhist and Hindu site on the Mahanadi, excavated only recently, with a brick temple that survived because it was buried.'],
  'CHH-barnawapara': ['Barnawapara','CHH','sanctuary',21.3500,82.3500,3,['forest'],['solo'],['wildlife','birding'],
    'Dry deciduous forest with leopard, sloth bear and gaur, and almost no visitors at all.'],

  /* ===================== KARNATAKA ===================== */
  'KAR-hampi': ['Hampi','KAR','ruin',15.3350,76.4600,10,['rural','water'],['solo','couple','friends'],['unesco','history','temple','art'],
    'The capital of Vijayanagara, sacked in 1565 and never reoccupied. Twenty-six square kilometres of temples and bazaars scattered through a boulder field that looks like another planet.'],
  'KAR-mysore': ['Mysore','KAR','city',12.2958,76.6394,8,['urban'],['family','couple'],['palace','history','art','food'],
    'The Wodeyar capital, with a palace lit by a hundred thousand bulbs on Sunday nights and a Dussehra procession that has run for six hundred years.'],
  'KAR-badami': ['Badami','KAR','cave',15.9149,75.6761,8,['rural','water'],['solo','couple'],['cave','art','history','temple'],
    'Four sixth-century cave temples cut into a red sandstone cliff above a tank, where South Indian temple architecture was effectively invented.'],
  'KAR-pattadakal': ['Pattadakal','KAR','temple',15.9480,75.8160,7,['rural'],['solo'],['unesco','temple','art','history'],
    'Ten temples in one compound, deliberately built in both northern and southern styles side by side — an architectural laboratory of the eighth century.'],
  'KAR-aihole': ['Aihole','KAR','temple',16.0190,75.8810,6,['rural'],['solo'],['temple','history','art'],
    'More than a hundred early Chalukyan temples in and around a village, including experiments that did not catch on. The place they practised before Pattadakal.'],
  'KAR-coorg': ['Coorg (Kodagu)','KAR','hill',12.3375,75.8069,8,['mountain','forest'],['couple','family'],['hillstation','food','wildlife'],
    'Coffee country in the Western Ghats, with its own martial community, its own cuisine built around pork and kachampuli vinegar, and mist in every photograph.'],
  'KAR-gokarna': ['Gokarna','KAR','beach',14.5479,74.3188,7,['beach'],['friends','solo','couple'],['coastal','spiritual','temple'],
    'A serious Shaivite pilgrimage town with a string of beaches round the headland behind it, reached on foot, which has kept them quieter than Goa’s.'],
  'KAR-belur-halebidu': ['Belur & Halebidu','KAR','temple',13.1660,75.8600,8,['rural'],['solo','couple'],['unesco','temple','art','history'],
    'Hoysala temples covered in soapstone carving of a fineness that is hard to credit — jewellery detail at architectural scale. World Heritage since 2023.'],
  'KAR-bandipur': ['Bandipur','KAR','np',11.6700,76.6300,7,['forest'],['family','friends'],['tiger','wildlife','birding'],
    'Part of the largest protected forest block in southern India, with elephants in numbers, and a road through it closed to traffic at night for their sake.'],
  'KAR-nagarhole': ['Nagarhole','KAR','np',12.0500,76.1300,7,['forest','water'],['friends','family'],['tiger','wildlife','birding'],
    'Rajiv Gandhi National Park, on the Kabini backwaters, with the best elephant congregations in India in the dry season and a strong chance of leopard.'],
  'KAR-bengaluru': ['Bengaluru','KAR','city',12.9716,77.5946,7,['urban'],['solo','friends'],['food','nightlife','art','colonial'],
    'The garden city that became the software capital. Lalbagh and Cubbon Park survive, the weather is the best of any Indian metro, and the traffic is the worst.'],
  'KAR-jog-falls': ['Jog Falls','KAR','falls',14.2290,74.8120,6,['forest','water','mountain'],['family','couple'],['water'],
    'The Sharavathi drops two hundred and fifty metres in four separate streams. Dammed upstream, so it is a monsoon spectacle and a trickle the rest of the year.'],
  'KAR-chikmagalur': ['Chikmagalur','KAR','hill',13.3161,75.7720,6,['mountain','forest'],['couple','friends'],['hillstation','trek','food'],
    'Where coffee was first planted in India, from seven smuggled beans, with Karnataka’s highest peak above the plantations.'],
  'KAR-murudeshwar': ['Murudeshwar','KAR','temple',14.0940,74.4840,5,['beach'],['family'],['temple','coastal','spiritual'],
    'A forty-metre Shiva statue on a headland over the Arabian Sea, with a twenty-storey gopuram beside it and a diving operation offshore at Netrani.'],
  'KAR-udupi': ['Udupi','KAR','temple',13.3409,74.7421,5,['urban','beach'],['solo','family'],['temple','food','spiritual','coastal'],
    'A Krishna temple viewed only through a carved window, and the town that gave its name to a whole genre of vegetarian restaurant across India.'],
  'KAR-shravanabelagola': ['Shravanabelagola','KAR','temple',12.8570,76.4880,6,['rural','mountain'],['solo'],['spiritual','temple','history','hiking'],
    'A seventeen-metre monolithic Jain colossus on a hill, carved around 981 AD, anointed with milk and saffron once every twelve years.'],
  'KAR-bijapur': ['Vijayapura (Bijapur)','KAR','mosque',16.8302,75.7100,6,['urban'],['solo'],['history','mosque','art'],
    'The Gol Gumbaz, whose dome is among the largest in the world and whose whispering gallery carries a murmur right round it.'],
  'KAR-dandeli': ['Dandeli','KAR','sanctuary',15.2500,74.6200,5,['forest','water'],['friends','family'],['wildlife','birding','water'],
    'Western Ghats forest on the Kali river, with rafting, hornbills in numbers and the black panther sightings that made it briefly famous.'],

  /* ===================== KERALA ===================== */
  'KER-alleppey': ['Alappuzha (Alleppey)','KER','backwater',9.4981,76.3388,9,['water','rural'],['couple','honeymoon','family'],['backwater','coastal','food','birding'],
    'The centre of the backwater network, where converted rice barges became houseboats. A night on the water, moving at walking pace past villages, is the whole point.'],
  'KER-munnar': ['Munnar','KER','hill',10.0889,77.0595,9,['mountain'],['couple','family'],['hillstation','trek','wildlife'],
    'Tea estates laid over the Western Ghats in sculpted green waves, at sixteen hundred metres, with the Nilgiri tahr on the ridges above.'],
  'KER-kochi': ['Kochi','KER','city',9.9312,76.2673,9,['urban','water','beach'],['couple','solo'],['colonial','history','food','art','coastal','church'],
    'Portuguese, Dutch and British in turn, with a synagogue, a Chinese-style fishing net and a Jewish quarter in the same square kilometre of Fort Kochi.'],
  'KER-thekkady': ['Thekkady (Periyar)','KER','np',9.5833,77.1667,8,['forest','water','mountain'],['family','friends'],['wildlife','birding','hiking'],
    'A tiger reserve round an artificial lake, where the standard experience is a boat among drowned tree trunks with elephants on the bank.'],
  'KER-varkala': ['Varkala','KER','beach',8.7379,76.7163,8,['beach'],['couple','friends','solo'],['coastal','spiritual','food'],
    'A red laterite cliff with a path along the top, cafés on the edge, and a mineral spring running out of the rock onto the beach below.'],
  'KER-wayanad': ['Wayanad','KER','hill',11.6854,76.1320,8,['mountain','forest'],['couple','family'],['hillstation','wildlife','trek','tribal'],
    'Ghats plateau of spice and coffee, with a cave of prehistoric carvings, a heart-shaped lake on a peak, and India’s oldest teak plantation.'],
  'KER-kumarakom': ['Kumarakom','KER','backwater',9.6177,76.4274,7,['water','rural'],['couple','honeymoon'],['backwater','birding','coastal'],
    'The Vembanad shore opposite Alleppey, quieter, with a bird sanctuary on a former rubber plantation and the best of the backwater resorts.'],
  'KER-kovalam': ['Kovalam','KER','beach',8.3988,76.9782,6,['beach'],['family','couple'],['coastal','food'],
    'Three crescent beaches under a lighthouse, the first place in Kerala tourism arrived at, and still the easiest to reach.'],
  'KER-thrissur': ['Thrissur','KER','city',10.5276,76.2144,6,['urban'],['solo','family'],['temple','music','art','food'],
    'Kerala’s cultural capital, and the site of Thrissur Pooram — a temple festival of caparisoned elephants, percussion ensembles and a fireworks exchange at dawn.'],
  'KER-athirappilly': ['Athirappilly Falls','KER','falls',10.2850,76.5690,6,['forest','water'],['family','couple'],['water','birding'],
    'Eighty feet of the Chalakudy river dropping into rainforest, with four hornbill species in the canopy around it.'],
  'KER-bekal': ['Bekal','KER','fort',12.3900,75.0300,5,['beach','water'],['couple'],['fort','coastal','history'],
    'A seventeenth-century laterite fort shaped like a keyhole, sitting directly on the beach in north Kerala, with almost nobody there.'],
  'KER-kozhikode': ['Kozhikode (Calicut)','KER','city',11.2588,75.7804,6,['urban','beach'],['solo'],['food','history','coastal'],
    'Where Vasco da Gama landed in 1498 and the spice trade changed the world. Now better known for halwa, biryani and the best Malabar food anywhere.'],
  'KER-silent-valley': ['Silent Valley','KER','np',11.0800,76.4400,6,['forest','mountain'],['solo'],['wildlife','birding','unesco'],
    'Undisturbed tropical rainforest saved from a dam by a campaign in the 1970s that effectively created the Indian environmental movement.'],
  'KER-vagamon': ['Vagamon','KER','hill',9.6860,76.9050,5,['mountain'],['couple','friends'],['hillstation','trek'],
    'Grass hills, pine forest and a meadow plateau at eleven hundred metres, far quieter than Munnar an hour or two away.'],
  'KER-trivandrum': ['Thiruvananthapuram','KER','city',8.5241,76.9366,6,['urban'],['solo','family'],['temple','art','history'],
    'The capital, with the Padmanabhaswamy temple — where vaults opened in 2011 revealed one of the largest treasure hoards ever found — and a good palace museum.'],
  'KER-ponmudi': ['Ponmudi','KER','hill',8.7580,77.1160,4,['mountain','forest'],['couple'],['hillstation','trek'],
    'A tea-estate hill station an hour and a half from Trivandrum, reached on a road of twenty-two hairpins, and usually in cloud.'],
  'KER-kollam': ['Kollam','KER','backwater',8.8932,76.6141,5,['water','urban'],['solo','couple'],['backwater','coastal','history'],
    'The southern end of the backwater network and the start of the eight-hour boat to Alleppey, which is the long way to do it and the better one.'],

  /* ===================== TAMIL NADU ===================== */
  'TND-madurai': ['Madurai','TND','temple',9.9252,78.1198,9,['urban'],['solo','couple'],['temple','spiritual','food','history'],
    'The Meenakshi temple: fourteen gopurams covered in thousands of painted figures, a thousand-pillar hall, and a city that has grown in rings around it for two millennia.'],
  'TND-mahabalipuram': ['Mahabalipuram','TND','ruin',12.6269,80.1927,9,['beach','rural'],['couple','family'],['unesco','temple','art','history','coastal'],
    'Seventh-century Pallava rock-cut temples and a vast relief carved on a boulder face, with a shore temple standing in the surf.'],
  'TND-thanjavur': ['Thanjavur','TND','temple',10.7870,79.1378,8,['urban'],['solo'],['unesco','temple','art','history'],
    'The Brihadisvara temple, finished in 1010, with a sixty-six-metre tower built of granite in a region that has none, and a single eighty-tonne capstone on top.'],
  'TND-ooty': ['Ooty','TND','hill',11.4064,76.6932,7,['mountain','forest'],['family','couple'],['hillstation','colonial','unesco'],
    'The queen of the Nilgiris, reached by a rack railway that is World Heritage, with a botanical garden and a great deal of eucalyptus.'],
  'TND-kanyakumari': ['Kanyakumari','TND','town',8.0883,77.5385,7,['beach','urban'],['family','solo'],['coastal','spiritual','temple'],
    'The southern tip of India, where three seas meet, and the only place in the country you can watch the sun rise and set over water from the same spot.'],
  'TND-rameswaram': ['Rameswaram','TND','temple',9.2876,79.3129,7,['island','beach'],['solo','family'],['spiritual','temple','coastal'],
    'An island shrine reached by a two-kilometre sea bridge, with the longest temple corridor in India and twenty-two wells pilgrims are doused from in turn.'],
  'TND-chennai': ['Chennai','TND','city',13.0827,80.2707,7,['urban','beach'],['solo','family'],['food','art','music','colonial','coastal'],
    'The Carnatic music capital, with a thirteen-kilometre beach, Fort St George — the first English settlement in India — and the best filter coffee anywhere.'],
  'TND-kodaikanal': ['Kodaikanal','TND','hill',10.2381,77.4892,7,['mountain','forest','water'],['couple','family'],['hillstation','trek'],
    'A hill station round a star-shaped lake in the Palani hills, with shola forest, sheer viewpoints and a bamboo that flowers once every twelve years.'],
  'TND-chettinad': ['Chettinad','TND','region',10.1600,78.7800,7,['rural'],['couple','solo'],['art','history','food','palace'],
    'A cluster of villages full of enormous merchant mansions built with Burmese teak and Italian tile, and the fiercest cuisine in Tamil Nadu.'],
  'TND-kumbakonam': ['Kumbakonam','TND','temple',10.9602,79.3845,6,['urban','water'],['solo'],['temple','spiritual','history'],
    'A dense cluster of major temples including two more of the Great Living Chola group at Darasuram and Gangaikondacholapuram nearby.'],
  'TND-chidambaram': ['Chidambaram','TND','temple',11.3990,79.6930,6,['urban'],['solo'],['temple','spiritual','art','music'],
    'The temple of Shiva as Nataraja, lord of the dance, with the hundred and eight classical dance poses carved into its gateways.'],
  'TND-trichy': ['Tiruchirappalli','TND','temple',10.7905,78.7047,6,['urban','water'],['solo','family'],['temple','fort','history'],
    'A rock fort rising straight out of the city, and Srirangam across the river — the largest functioning temple complex in the world, with seven concentric walls.'],
  'TND-coonoor': ['Coonoor','TND','hill',11.3530,76.7959,6,['mountain','forest'],['couple'],['hillstation','colonial','food'],
    'Quieter than Ooty below it on the same railway, with working tea estates, Sim’s Park and the Dolphin’s Nose viewpoint.'],
  'TND-dhanushkodi': ['Dhanushkodi','TND','town',9.1530,79.4160,6,['beach','island'],['friends','couple'],['coastal','history'],
    'A town destroyed by a cyclone in 1964 and never rebuilt, at the end of a sandspit pointing at Sri Lanka. Ruins, sea on both sides, and a long empty road.'],
  'TND-mudumalai': ['Mudumalai','TND','np',11.5700,76.5300,6,['forest'],['family','friends'],['tiger','wildlife','birding'],
    'The Tamil Nadu side of the Nilgiri block, continuous with Bandipur and Wayanad, with elephants and a serious chance of dhole.'],
  'TND-hogenakkal': ['Hogenakkal','TND','falls',12.1170,77.7740,5,['water','forest'],['friends','family'],['water'],
    'The Kaveri splits into dozens of channels over carbonatite rock, and you go through them in a round coracle paddled by one man.'],
  'TND-yercaud': ['Yercaud','TND','hill',11.7750,78.2100,4,['mountain','forest'],['couple','family'],['hillstation'],
    'A small coffee-growing hill station in the Shevaroys, reached on twenty hairpins, and far less visited than the Nilgiris.'],
  'TND-gingee': ['Gingee Fort','TND','fort',12.2500,79.4000,5,['rural','mountain'],['solo','friends'],['fort','history','hiking','unesco'],
    'Three hills fortified and linked into one enormous citadel that Shivaji called the most impregnable in India. A hard, hot, magnificent climb.'],
  'TND-velankanni': ['Velankanni','TND','church',10.6830,79.8420,5,['beach','urban'],['family','solo'],['spiritual','church','coastal'],
    'A basilica on the Coromandel coast drawing millions of pilgrims of every faith, often called the Lourdes of the East.'],

  /* ===================== PUDUCHERRY ===================== */
  'PUD-puducherry': ['Puducherry','PUD','city',11.9416,79.8083,8,['urban','beach'],['couple','solo'],['colonial','food','art','coastal'],
    'French India until 1954, and still visibly so: a grid of ochre houses with bougainvillea over the walls, a seafront promenade, and policemen in red kepis.'],
  'PUD-auroville': ['Auroville','PUD','town',12.0052,79.8106,6,['rural','forest'],['solo','couple'],['art','spiritual'],
    'An experimental township founded in 1968 to belong to nobody and no nation, built on eroded scrubland its residents reforested themselves.'],

  /* ===================== ANDHRA PRADESH ===================== */
  'APR-tirupati': ['Tirupati','APR','temple',13.6288,79.4192,8,['mountain','urban'],['family','solo'],['spiritual','temple'],
    'The richest temple on earth by donation, on a hill above the town, drawing tens of thousands of pilgrims a day — many of whom shave their heads for it.'],
  'APR-araku': ['Araku Valley','APR','valley',18.3270,82.8760,6,['mountain','forest'],['couple','family'],['tribal','hillstation','roadtrip'],
    'A coffee valley in the Eastern Ghats reached on one of the most scenic train rides in India, through fifty-eight tunnels and over a hundred bridges.'],
  'APR-gandikota': ['Gandikota','APR','fort',14.8120,78.2850,7,['canyon','rural'],['friends','couple'],['fort','history','hiking','camping'],
    'A fort on the lip of a gorge the Penna river has cut three hundred metres into red quartzite. Inevitably called the Grand Canyon of India, and genuinely startling.'],
  'APR-visakhapatnam': ['Visakhapatnam','APR','city',17.6868,83.2185,6,['urban','beach','mountain'],['family','couple'],['coastal','food'],
    'A port city between hills and the Bay of Bengal, with a decommissioned submarine on the beach and the Borra limestone caves inland.'],
  'APR-lepakshi': ['Lepakshi','APR','temple',13.8050,77.6060,6,['rural'],['solo','couple'],['temple','art','history'],
    'A sixteenth-century Vijayanagara temple with the best surviving mural ceilings in South India and a hanging pillar that does not quite touch the floor.'],
  'APR-srisailam': ['Srisailam','APR','temple',16.0740,78.8680,5,['forest','mountain','water'],['solo','family'],['temple','spiritual','wildlife'],
    'A jyotirlinga above the Krishna gorge, inside the largest tiger reserve in India, which almost nobody visits for the tigers.'],
  'APR-amaravati': ['Amaravati','APR','ruin',16.5740,80.3580,5,['rural','water'],['solo'],['history','spiritual'],
    'The remains of one of the greatest Buddhist stupas in ancient India, whose carved railings are now largely in Chennai and London.'],

  /* ===================== TELANGANA ===================== */
  'TEL-hyderabad': ['Hyderabad','TEL','city',17.3850,78.4867,9,['urban'],['solo','friends','family'],['food','history','mosque','fort','art'],
    'The Charminar, the Qutb Shahi tombs, a Nizam’s jewel collection, and the biryani that the rest of the country measures itself against.'],
  'TEL-golconda': ['Golconda Fort','TEL','fort',17.3833,78.4011,7,['urban','rural'],['family','solo'],['fort','history'],
    'A granite citadel whose acoustics carry a hand-clap at the gate to the top of the hill, and whose mines produced the Koh-i-Noor.'],
  'TEL-ramappa': ['Ramappa Temple','TEL','temple',18.2610,79.9410,7,['rural'],['solo','couple'],['unesco','temple','art','history'],
    'A thirteenth-century Kakatiya temple built on a floating sandbox foundation with bricks light enough to float, which is why it survived the earthquakes.'],
  'TEL-warangal': ['Warangal','TEL','ruin',17.9689,79.5941,5,['urban','rural'],['solo'],['history','fort','temple'],
    'The Kakatiya capital, with four ornate stone gateways standing alone in a field where the temple around them was destroyed.'],
  'TEL-bhadrachalam': ['Bhadrachalam','TEL','temple',17.6680,80.8880,4,['rural','water','forest'],['solo','family'],['temple','spiritual'],
    'A Rama temple on the Godavari in the forested east of the state, with a major festival at Rama Navami.'],
  'TEL-medak': ['Medak Cathedral','TEL','church',18.0460,78.2690,4,['rural','urban'],['solo'],['church','colonial','history'],
    'One of the largest churches in Asia, built by British Methodists between 1914 and 1924, with stained glass made in Britain and shipped out.'],

  /* ===================== ODISHA ===================== */
  'ODI-konark': ['Konark Sun Temple','ODI','temple',19.8876,86.0945,9,['beach','rural'],['couple','solo'],['unesco','temple','art','history','coastal'],
    'A thirteenth-century temple built as the sun god’s chariot, with twenty-four carved stone wheels and seven horses pulling it out of the sand.'],
  'ODI-puri': ['Puri','ODI','temple',19.8135,85.8312,8,['beach','urban'],['family','solo'],['spiritual','temple','coastal','food'],
    'One of the four Char Dham shrines, where every June three wooden chariots the height of buildings are hauled through the streets by the crowd.'],
  'ODI-bhubaneswar': ['Bhubaneswar','ODI','city',20.2961,85.8245,7,['urban'],['solo'],['temple','history','art'],
    'The temple city — several hundred surviving sandstone temples spanning seven centuries, and the Udayagiri and Khandagiri Jain caves on the edge of town.'],
  'ODI-chilika': ['Chilika Lake','ODI','lake',19.7000,85.3200,7,['water'],['solo','family'],['birding','wildlife','coastal'],
    'The largest brackish lagoon in Asia, with a resident population of Irrawaddy dolphins and over a million migratory birds each winter.'],
  'ODI-simlipal': ['Simlipal','ODI','np',21.9000,86.3000,6,['forest','mountain','water'],['solo'],['tiger','wildlife','birding','tribal'],
    'Sal forest and waterfalls in the north of the state, a tiger reserve with a small melanistic population found essentially nowhere else.'],
  'ODI-bhitarkanika': ['Bhitarkanika','ODI','np',20.7100,86.9000,6,['water','forest'],['solo'],['wildlife','birding','coastal'],
    'Mangrove creeks holding the largest saltwater crocodiles in India, next to Gahirmatha, where olive ridleys nest in hundreds of thousands.'],
  'ODI-raghurajpur': ['Raghurajpur','ODI','village',19.9100,85.8200,5,['rural'],['solo','couple'],['art','tribal'],
    'A village where every household paints — pattachitra on cloth and palm leaf — and where the Gotipua dance tradition is still taught.'],
  'ODI-udayagiri-khandagiri': ['Udayagiri & Khandagiri','ODI','cave',20.2630,85.7850,5,['urban','rural'],['solo'],['cave','history','spiritual'],
    'Jain rock-cut cells from the second century BC on two facing hills, carved for monks and inscribed by a king who listed his own achievements.'],
  'ODI-gopalpur': ['Gopalpur-on-Sea','ODI','beach',19.2600,84.9100,4,['beach'],['couple'],['coastal','colonial'],
    'A faded colonial port town with a long empty beach and the ruins of jetties that once shipped labour to Burma.'],
  'ODI-daringbadi': ['Daringbadi','ODI','hill',19.9100,84.1300,4,['mountain','forest'],['couple','family'],['hillstation','tribal'],
    'Odisha’s hill station, at around nine hundred metres in the Kandhamal hills, where it occasionally frosts and everybody is astonished.'],

  /* ===================== WEST BENGAL ===================== */
  'WBG-kolkata': ['Kolkata','WBG','city',22.5726,88.3639,9,['urban','water'],['solo','couple'],['colonial','food','art','history','music'],
    'The capital of British India until 1911 and the intellectual capital ever since. Crumbling palaces, trams, the best sweets in India, and an argument on every corner.'],
  'WBG-darjeeling': ['Darjeeling','WBG','hill',27.0360,88.2627,9,['mountain','forest'],['couple','family'],['hillstation','unesco','colonial','trek','himalaya'],
    'Tea, and a view of Kanchenjunga from Tiger Hill at dawn. The toy train that climbs to it has been running since 1881 and is World Heritage.'],
  'WBG-sundarbans': ['Sundarbans','WBG','np',21.9497,88.9000,8,['water','forest'],['solo','friends'],['unesco','tiger','wildlife','birding','coastal'],
    'The largest mangrove forest on earth, shared with Bangladesh, with a tiger population that swims between islands and is unusually willing to take people.'],
  'WBG-santiniketan': ['Santiniketan','WBG','town',23.6800,87.6800,6,['rural'],['solo','couple'],['unesco','art','music','history'],
    'Tagore’s school and university, where classes are still held under the trees. Inscribed by UNESCO in 2023.'],
  'WBG-kalimpong': ['Kalimpong','WBG','hill',27.0600,88.4700,6,['mountain','forest'],['couple','solo'],['hillstation','monastery','himalaya'],
    'A ridge town above the Teesta with Himalayan nurseries, old mission schools and a slower pace than Darjeeling across the valley.'],
  'WBG-bishnupur': ['Bishnupur','WBG','temple',23.0700,87.3200,6,['rural'],['solo'],['temple','art','history'],
    'Terracotta temples from the Malla kingdom, their brick walls covered in panels of the epics, in a town that also weaves Baluchari silk.'],
  'WBG-sandakphu': ['Sandakphu','WBG','mountain',27.1100,88.0000,7,['mountain'],['friends','solo'],['trek','himalaya','hiking'],
    'The highest point in West Bengal, on the Singalila ridge, and the only easily reached place from which Everest and Kanchenjunga are visible together.'],
  'WBG-dooars': ['The Dooars','WBG','forest',26.7000,89.0000,6,['forest','water'],['family','solo'],['wildlife','birding','tribal'],
    'Floodplain forest and tea between the Himalaya and the plains, with Jaldapara and Gorumara holding rhino and elephant.'],
  'WBG-murshidabad': ['Murshidabad','WBG','town',24.1800,88.2700,5,['rural','water'],['solo'],['history','palace','colonial'],
    'The Nawabi capital of Bengal before Plassey, with a vast neoclassical palace on the Bhagirathi and the battlefield that handed India to the Company.'],
  'WBG-mirik': ['Mirik','WBG','hill',26.8870,88.1870,4,['mountain','water'],['family','couple'],['hillstation'],
    'A small lake town between Darjeeling and the plains, with tea gardens around it and a view of Kanchenjunga on a clear morning.'],
  'WBG-digha': ['Digha','WBG','beach',21.6270,87.5090,4,['beach'],['family'],['coastal'],
    'Bengal’s weekend beach, shallow and brown and extremely busy, four hours from Kolkata.'],

  /* ===================== SIKKIM ===================== */
  'SIK-gangtok': ['Gangtok','SIK','city',27.3389,88.6065,8,['mountain','urban'],['family','couple'],['monastery','himalaya','food'],
    'A clean ridge capital with a pedestrianised main street, Rumtek monastery across the valley, and Kanchenjunga at the end of the road on a clear day.'],
  'SIK-yumthang': ['Lachung & Yumthang','SIK','valley',27.8200,88.7000,8,['mountain'],['couple','family'],['himalaya','trek'],
    'The valley of flowers of the north, at three thousand five hundred metres, with hot springs, rhododendron in spring and a road to the Zero Point snowfield.'],
  'SIK-gurudongmar': ['Gurudongmar Lake','SIK','lake',28.0260,88.7100,8,['mountain','water'],['friends','couple'],['himalaya','darksky','spiritual'],
    'A lake at five thousand four hundred metres, sacred to Buddhists and Sikhs alike, where one corner is said never to freeze.'],
  'SIK-pelling': ['Pelling','SIK','town',27.3000,88.2400,7,['mountain','forest'],['couple','family'],['monastery','himalaya','trek'],
    'A west Sikkim ridge with the clearest close view of Kanchenjunga in the state, and the ruined first capital at Rabdentse in the forest behind.'],
  'SIK-yuksom': ['Yuksom','SIK','village',27.3700,88.2200,6,['mountain','forest'],['solo','friends'],['trek','monastery','himalaya','history'],
    'Where the first Chogyal of Sikkim was crowned in 1642, and the trailhead for the Goecha La trek to the foot of Kanchenjunga.'],
  'SIK-tsomgo': ['Tsomgo Lake & Nathu La','SIK','lake',27.3750,88.7630,6,['mountain','water'],['family','friends'],['himalaya','roadtrip'],
    'A glacial lake at three thousand seven hundred metres on the old trade road to Tibet, with the Nathu La border post beyond it.'],
  'SIK-ravangla': ['Ravangla','SIK','town',27.3070,88.3620,5,['mountain','forest'],['couple'],['monastery','himalaya','trek'],
    'A quiet south Sikkim town with a forty-metre seated Buddha in a landscaped park and the whole range laid out in front of it.'],
  'SIK-khangchendzonga-np': ['Khangchendzonga National Park','SIK','np',27.6000,88.3000,7,['mountain','forest'],['solo','friends'],['unesco','trek','wildlife','himalaya'],
    'India’s only mixed World Heritage site, listed for both nature and the Lepcha and Bhutia sacred landscape within it.'],

  /* ===================== ASSAM ===================== */
  'ASM-kaziranga': ['Kaziranga','ASM','np',26.5775,93.1711,9,['forest','water'],['family','friends'],['unesco','wildlife','birding','tiger'],
    'Two-thirds of the world’s one-horned rhinoceros live in this one floodplain, along with wild buffalo, elephant and a tiger density to rival anywhere.'],
  'ASM-majuli': ['Majuli','ASM','island',26.9500,94.1700,7,['island','water','rural'],['solo','couple'],['tribal','art','spiritual'],
    'The largest river island in the world, shrinking every year to the Brahmaputra, with Vaishnavite monasteries that are also dance and mask-making schools.'],
  'ASM-guwahati': ['Guwahati','ASM','city',26.1445,91.7362,6,['urban','water'],['solo'],['temple','spiritual','food'],
    'The gateway to the Northeast, on the Brahmaputra, with the Kamakhya temple on a hill above it and river dolphins below.'],
  'ASM-manas': ['Manas','ASM','np',26.7200,90.9300,7,['forest','water','mountain'],['solo'],['unesco','tiger','wildlife','birding'],
    'World Heritage against the Bhutan border, stripped by insurgency in the 1990s and painstakingly restored since — pygmy hog, golden langur and tiger.'],
  'ASM-sivasagar': ['Sivasagar','ASM','ruin',26.9800,94.6400,5,['rural','water'],['solo'],['history','unesco','temple'],
    'The Ahom capital, whose dynasty held off the Mughals for six centuries, with tanks, an amphitheatre and the Moidam burial mounds nearby.'],
  'ASM-tezpur': ['Tezpur','ASM','town',26.6300,92.8000,4,['urban','water','rural'],['solo'],['history','temple'],
    'An old town on the Brahmaputra with archaeological parks, and the usual base for crossing into western Arunachal.'],
  'ASM-dibru-saikhowa': ['Dibru-Saikhowa','ASM','np',27.6000,95.4000,5,['water','forest'],['solo'],['birding','wildlife'],
    'A river island park of grassland and swamp forest at the top of the Brahmaputra, with feral horses and the white-winged wood duck.'],

  /* ===================== MEGHALAYA ===================== */
  'MEG-cherrapunji': ['Sohra (Cherrapunji)','MEG','town',25.3000,91.7000,8,['mountain','forest','water'],['couple','friends'],['water','trek','hiking'],
    'One of the wettest places ever recorded, on a plateau edge that drops straight into Bangladesh, with waterfalls off every side of it.'],
  'MEG-nongriat': ['Nongriat Root Bridges','MEG','village',25.2500,91.7200,8,['forest','water','mountain'],['friends','solo'],['trek','hiking','tribal'],
    'Bridges grown rather than built, by training living fig roots across rivers over decades. The double-decker bridge is three thousand steps down and back.'],
  'MEG-shillong': ['Shillong','MEG','city',25.5788,91.8933,7,['mountain','forest'],['couple','friends'],['hillstation','music','colonial','food'],
    'The Scotland of the East by colonial billing, and the rock-and-roll capital of India by its own. A Khasi city with a strong matrilineal society.'],
  'MEG-dawki': ['Dawki & the Umngot','MEG','river',25.1800,92.0200,7,['water','mountain'],['couple','friends'],['water','coastal'],
    'A river so clear that boats on it appear to float in mid-air, running down to the Bangladesh border through limestone country.'],
  'MEG-mawlynnong': ['Mawlynnong','MEG','village',25.2000,91.9200,6,['rural','forest'],['family','couple'],['tribal'],
    'Billed as the cleanest village in Asia, with bamboo dustbins on every path, a living root bridge nearby and a sky walk up a tree.'],
  'MEG-mawsynram': ['Mawsynram','MEG','village',25.2970,91.5820,6,['mountain','forest'],['solo'],['water'],
    'The wettest inhabited place on earth by most measures, where villagers once soundproofed huts with grass against the noise of the rain.'],
  'MEG-balpakram': ['Balpakram','MEG','np',25.2600,90.8900,4,['mountain','forest','canyon'],['solo'],['wildlife','tribal','hiking'],
    'A canyon plateau in the Garo Hills that Garo belief holds to be where souls rest on their way. Remote, and very little visited.'],

  /* ===================== ARUNACHAL PRADESH ===================== */
  'ARP-tawang': ['Tawang','ARP','monastery',27.5860,91.8590,8,['mountain'],['solo','couple'],['monastery','himalaya','spiritual','history'],
    'The largest monastery in India and the second largest in the world, at three thousand metres, reached over the Sela Pass. The sixth Dalai Lama was born here.'],
  'ARP-ziro': ['Ziro Valley','ARP','valley',27.5440,93.8300,7,['mountain','rural'],['solo','friends'],['tribal','music','trek'],
    'A flat paddy valley among pine ridges, home to the Apatani, whose wet-rice terraces are farmed without any animals or machinery at all.'],
  'ARP-namdapha': ['Namdapha','ARP','np',27.5000,96.4000,6,['forest','mountain','water'],['solo'],['wildlife','birding','trek'],
    'The only park on earth with four big cats — tiger, leopard, clouded leopard and snow leopard — across an altitude range of two hundred to four thousand five hundred metres.'],
  'ARP-mechuka': ['Mechuka','ARP','valley',28.6100,94.1200,6,['mountain','forest'],['solo','couple'],['himalaya','tribal','trek'],
    'A valley near the Tibet border opened to visitors only recently, with a Memba Buddhist population and almost no tourism infrastructure.'],
  'ARP-dirang-bomdila': ['Dirang & Bomdila','ARP','town',27.3600,92.2400,5,['mountain','forest'],['couple','solo'],['monastery','himalaya','hillstation'],
    'The staging towns on the road to Tawang, with apple orchards, a hot spring and monasteries of the Monpa people.'],

  /* ===================== NAGALAND ===================== */
  'NAG-kohima': ['Kohima','NAG','city',25.6751,94.1086,7,['mountain','forest'],['solo','friends'],['tribal','history','music','food'],
    'The state capital, site of the 1944 battle that stopped the Japanese advance into India, and host each December to the Hornbill Festival.'],
  'NAG-dzukou': ['Dzükou Valley','NAG','valley',25.5600,94.0700,7,['mountain','forest'],['friends','solo'],['trek','hiking','camping'],
    'A valley of rolling bamboo grass at two thousand four hundred metres, carpeted in lilies in summer, reached on a steep walk from either Nagaland or Manipur.'],
  'NAG-longwa': ['Mon & Longwa','NAG','village',26.7500,95.1000,6,['mountain','forest'],['solo'],['tribal','history'],
    'Konyak country, where the international border runs straight through the chief’s house, and the last generation of tattooed headhunters is still alive.'],

  /* ===================== MANIPUR ===================== */
  'MNP-loktak': ['Loktak Lake','MNP','lake',24.5000,93.8000,7,['water'],['solo','couple'],['birding','wildlife','tribal'],
    'The largest freshwater lake in the Northeast, covered in phumdis — floating mats of vegetation — on which people live and fish.'],
  'MNP-keibul-lamjao': ['Keibul Lamjao','MNP','np',24.4800,93.8200,6,['water','forest'],['solo'],['wildlife','birding'],
    'The only floating national park in the world, on the phumdis of Loktak, and the last refuge of the sangai, Manipur’s brow-antlered deer.'],
  'MNP-imphal': ['Imphal','MNP','city',24.8170,93.9368,5,['urban','water'],['solo'],['history','food','art'],
    'A valley capital with a market run entirely by women — the Ima Keithel, several thousand stallholders, all of them female — and significant Second World War ground nearby.'],

  /* ===================== MIZORAM ===================== */
  'MIZ-aizawl': ['Aizawl','MIZ','city',23.7271,92.7176,5,['mountain'],['solo'],['tribal','music'],
    'A city draped along a ridge at a thousand metres, almost entirely Christian, with near-total literacy and a strong choral tradition.'],
  'MIZ-phawngpui': ['Phawngpui','MIZ','mountain',22.6300,93.0300,5,['mountain','forest'],['solo','friends'],['trek','hiking','birding'],
    'The Blue Mountain, the state’s highest point, with a sheer face and a national park of orchids and rare birds around it.'],

  /* ===================== TRIPURA ===================== */
  'TRI-unakoti': ['Unakoti','TRI','ruin',24.3200,92.0700,6,['forest','mountain'],['solo'],['art','history','spiritual'],
    'Enormous rock-cut faces and sculptures on a forested hillside, nobody is sure from exactly when, with a thirty-foot Shiva head at the centre.'],
  'TRI-neermahal': ['Neermahal','TRI','palace',23.4900,91.3100,5,['water','rural'],['couple','family'],['palace','history'],
    'A water palace built in the 1930s in the middle of Rudrasagar Lake, reached by boat, in a mix of Hindu and Mughal styles.'],
  'TRI-agartala': ['Agartala','TRI','city',23.8315,91.2868,4,['urban'],['solo'],['palace','history'],
    'The capital, with the Ujjayanta Palace at its centre, a short drive from the Bangladesh border crossing.'],

  /* ===================== BIHAR ===================== */
  'BIH-bodh-gaya': ['Bodh Gaya','BIH','temple',24.6961,84.9869,9,['rural'],['solo','couple'],['unesco','spiritual','history','temple'],
    'Where the Buddha attained enlightenment under a tree whose direct descendant still stands. The most important Buddhist site on earth, with monasteries from every Buddhist country around it.'],
  'BIH-nalanda': ['Nalanda','BIH','ruin',25.1360,85.4440,8,['rural'],['solo'],['unesco','history','spiritual'],
    'The world’s first residential university, founded in the fifth century, with ten thousand students until it was burned around 1193. Brick ruins over fourteen hectares.'],
  'BIH-rajgir': ['Rajgir','BIH','town',25.0280,85.4200,6,['mountain','forest'],['solo','family'],['spiritual','history','temple'],
    'The first capital of Magadha, ringed by hills, where both the Buddha and Mahavira taught, with hot springs and a Japanese peace pagoda on the ridge.'],
  'BIH-patna': ['Patna','BIH','city',25.5941,85.1376,5,['urban','water'],['solo'],['history','spiritual','food'],
    'Ancient Pataliputra, capital of the Mauryan empire, on the Ganges — with a Sikh takht marking Guru Gobind Singh’s birthplace and a very good museum.'],
  'BIH-vaishali': ['Vaishali','BIH','ruin',25.9900,85.1300,5,['rural'],['solo'],['history','spiritual'],
    'Said to be among the world’s first republics, where the Buddha preached his last sermon, with an Ashokan pillar still standing and complete.'],

  /* ===================== JHARKHAND ===================== */
  'JHA-netarhat': ['Netarhat','JHA','hill',23.4700,84.2600,5,['mountain','forest'],['couple','family'],['hillstation','darksky'],
    'The queen of the Chotanagpur plateau, at a thousand metres, known for sunrise and sunset points and very dark skies.'],
  'JHA-betla': ['Betla','JHA','np',23.8800,84.1900,5,['forest'],['solo','family'],['tiger','wildlife','birding','fort'],
    'One of the first tiger reserves in India, in Palamau, with two ruined forts inside the forest and elephants in the valleys.'],
  'JHA-deoghar': ['Deoghar','JHA','temple',24.4800,86.7000,5,['urban'],['solo','family'],['spiritual','temple'],
    'A jyotirlinga that draws enormous barefoot processions through the monsoon month of Shravan, carrying Ganges water a hundred kilometres on foot.'],
  'JHA-ranchi': ['Ranchi','JHA','city',23.3441,85.3096,4,['urban','forest','water'],['solo'],['water','tribal'],
    'The state capital on the plateau, with waterfalls on three rivers within an hour and a strong Adivasi presence.'],

  /* ===================== ANDAMAN & NICOBAR ===================== */
  'AND-havelock': ['Havelock (Swaraj Dweep)','AND','island',11.9800,92.9800,9,['island','beach','water'],['couple','honeymoon','friends'],['coastal','diving','water'],
    'Radhanagar beach is routinely called the best in Asia, and the diving and snorkelling off the island are the best in India by a distance.'],
  'AND-port-blair': ['Port Blair','AND','city',11.6234,92.7265,7,['urban','island','water'],['family','solo'],['history','colonial','coastal'],
    'The capital, and the site of the Cellular Jail — the colonial prison where independence activists were held in solitary confinement across the sea from everything.'],
  'AND-neil': ['Neil (Shaheed Dweep)','AND','island',11.8300,93.0300,7,['island','beach','water'],['couple'],['coastal','diving','water'],
    'Smaller and slower than Havelock, with a natural rock bridge at low tide and coral close enough to the shore to snorkel from the beach.'],
  'AND-baratang': ['Baratang','AND','island',12.1000,92.7800,5,['island','forest','water'],['friends'],['coastal','cave'],
    'Limestone caves and a mud volcano, reached through a mangrove creek and along a road that crosses the Jarawa reserve under convoy.'],
  'AND-ross-island': ['Ross Island','AND','island',11.6800,92.7600,5,['island'],['family','solo'],['history','colonial','coastal'],
    'The administrative headquarters of the colony until an earthquake in 1941, now a ruin being pulled apart by banyan roots, with deer wandering through it.'],
  'AND-diglipur': ['Diglipur','AND','island',13.2500,92.9800,5,['island','beach','forest'],['solo','couple'],['coastal','trek','wildlife'],
    'The far north, with the highest point in the islands, turtle nesting beaches and twin islands joined by a sandbar at low tide.'],

  /* ===================== LAKSHADWEEP ===================== */
  'LAK-agatti': ['Agatti','LAK','island',10.8500,72.1800,7,['island','beach','water'],['couple','honeymoon'],['coastal','diving','water'],
    'The only island with an airstrip, laid along a lagoon of improbable colour, and the entry point for the whole archipelago.'],
  'LAK-bangaram': ['Bangaram','LAK','island',10.9400,72.2800,7,['island','beach','water'],['couple','honeymoon'],['coastal','diving','water'],
    'An uninhabited teardrop of an atoll with a single resort, a lagoon you can wade across, and reef sharks in the shallows.'],
  'LAK-kavaratti': ['Kavaratti','LAK','island',10.5600,72.6400,5,['island','water'],['solo','family'],['coastal','diving'],
    'The administrative capital, with a lagoon used for watersports, a marine aquarium and mosques with carved driftwood ceilings.']
};

const IN_PLACE_IDS = Object.keys(IN_PLACES);

/* ===========================================================
   WIKIPEDIA TITLES THAT ARE NOT THE PLACE NAME

   Listed rather than guessed, because a wrong guess silently shows
   the wrong photograph. India needs far more of these than Italy or
   Costa Rica did, for four reasons:

     The atlas name is often a region and the picture wants a
     monument. "Agra" is a city of two million; the photograph
     everybody means is the Taj Mahal.

     Protected areas are nearly all filed under a full title —
     "Kaziranga National Park", not "Kaziranga".

     Several cities have been officially renamed and Wikipedia has
     followed at different speeds: Bengaluru is still filed under
     Bangalore, Aurangabad under Chhatrapati Sambhajinagar.

     And a number of entries here deliberately pair two places in one
     card, which is useful for a reader and meaningless as a title.
   =========================================================== */
const IN_WIKI = {
  /* Delhi */
  'DEL-old-delhi':'Jama Masjid, Delhi', 'DEL-lutyens':'Lutyens’ Delhi',
  'DEL-hauz-khas':'Hauz Khas Complex', 'DEL-akshardham':'Akshardham (Delhi)',
  'DEL-mehrauli':'Mehrauli Archaeological Park',
  /* Uttar Pradesh */
  'UTP-agra':'Taj Mahal', 'UTP-mathura-vrindavan':'Vrindavan',
  'UTP-prayagraj':'Prayagraj', 'UTP-orchha-approach':'Bateshwar, Uttar Pradesh',
  'UTP-dudhwa':'Dudhwa National Park', 'UTP-jhansi':'Jhansi Fort',
  'UTP-sarnath':'Sarnath',
  /* Rajasthan */
  'RAJ-keoladeo':'Keoladeo National Park', 'RAJ-ranthambore':'Ranthambore National Park',
  'RAJ-sariska':'Sariska Tiger Reserve', 'RAJ-jawai':'Jawai Dam',
  'RAJ-osian':'Osian, Rajasthan', 'RAJ-chittorgarh':'Chittor Fort',
  'RAJ-ranakpur':'Ranakpur Jain temple', 'RAJ-shekhawati':'Shekhawati',
  'RAJ-jodhpur':'Mehrangarh', 'RAJ-udaipur':'City Palace, Udaipur',
  'RAJ-jaisalmer':'Jaisalmer Fort', 'RAJ-bikaner':'Junagarh Fort',
  /* Himachal */
  'HPR-dharamshala':'McLeod Ganj', 'HPR-kasol-parvati':'Parvati Valley',
  'HPR-kinnaur':'Kinnaur district', 'HPR-tabo':'Tabo Monastery',
  'HPR-kaza':'Kaza, Himachal Pradesh', 'HPR-bir-billing':'Bir, Himachal Pradesh',
  'HPR-great-himalayan-np':'Great Himalayan National Park',
  'HPR-dalhousie-khajjiar':'Khajjiar', 'HPR-rohtang':'Rohtang Pass',
  'HPR-spiti':'Spiti Valley',
  /* Uttarakhand */
  'UTK-jim-corbett':'Jim Corbett National Park',
  'UTK-valley-of-flowers':'Valley of Flowers National Park',
  'UTK-rajaji':'Rajaji National Park', 'UTK-chopta-tungnath':'Tungnath',
  'UTK-nanda-devi':'Nanda Devi', 'UTK-binsar':'Binsar',
  'UTK-kedarnath':'Kedarnath Temple', 'UTK-badrinath':'Badrinath Temple',
  /* Ladakh */
  'LAD-hemis':'Hemis Monastery', 'LAD-thiksey':'Thiksey Monastery',
  'LAD-lamayuru':'Lamayuru Monastery', 'LAD-alchi':'Alchi Monastery',
  'LAD-markha':'Markha Valley', 'LAD-nubra':'Nubra Valley',
  'LAD-pangong':'Pangong Tso', 'LAD-tso-moriri':'Tso Moriri',
  'LAD-khardung-la':'Khardung La', 'LAD-turtuk':'Turtuk',
  /* Jammu & Kashmir */
  'JKA-srinagar':'Dal Lake', 'JKA-vaishno-devi':'Vaishno Devi',
  'JKA-doodhpathri':'Doodhpathri', 'JKA-yusmarg':'Yusmarg',
  /* Punjab & Haryana */
  'PUN-amritsar':'Golden Temple', 'PUN-wagah':'Wagah',
  'PUN-anandpur-sahib':'Anandpur Sahib', 'PUN-patiala':'Qila Mubarak, Patiala',
  'HAR-sultanpur':'Sultanpur National Park', 'HAR-morni':'Morni Hills',
  /* Gujarat */
  'GUJ-rann-of-kutch':'Rann of Kutch', 'GUJ-gir':'Gir National Park',
  'GUJ-rani-ki-vav':'Rani ki vav',
  'GUJ-champaner':'Champaner-Pavagadh Archaeological Park',
  'GUJ-modhera':'Sun Temple, Modhera', 'GUJ-dholavira':'Dholavira',
  'GUJ-little-rann':'Indian Wild Ass Sanctuary', 'GUJ-palitana':'Palitana temples',
  'GUJ-statue-of-unity':'Statue of Unity', 'GUJ-ahmedabad':'Sabarmati Ashram',
  'GUJ-dwarka':'Dwarkadhish Temple', 'GUJ-somnath':'Somnath temple',
  /* Maharashtra */
  'MAH-mumbai':'Gateway of India', 'MAH-ajanta':'Ajanta Caves',
  'MAH-ellora':'Ellora Caves', 'MAH-elephanta':'Elephanta Caves',
  'MAH-aurangabad':'Chhatrapati Sambhajinagar',
  'MAH-tadoba':'Tadoba Andhari Tiger Reserve', 'MAH-alibaug':'Alibag',
  'MAH-bhimashankar':'Bhimashankar Temple', 'MAH-raigad':'Raigad Fort',
  'MAH-lonavala':'Lonavala', 'MAH-tarkarli':'Tarkarli',
  /* Goa */
  'GOA-old-goa':'Old Goa', 'GOA-calangute-baga':'Calangute',
  'GOA-dudhsagar':'Dudhsagar Falls', 'GOA-fort-aguada':'Fort Aguada',
  'GOA-divar-chorao':'Divar Island', 'GOA-panaji':'Panaji',
  'GOA-palolem':'Palolem', 'GOA-anjuna':'Anjuna',
  /* Madhya Pradesh */
  'MPR-khajuraho':'Khajuraho Group of Monuments',
  'MPR-bandhavgarh':'Bandhavgarh National Park', 'MPR-sanchi':'Sanchi Stupa',
  'MPR-kanha':'Kanha Tiger Reserve', 'MPR-gwalior':'Gwalior Fort',
  'MPR-bhimbetka':'Bhimbetka rock shelters', 'MPR-pench':'Pench National Park',
  'MPR-panna':'Panna National Park', 'MPR-mandu':'Mandu, Madhya Pradesh',
  'MPR-satpura':'Satpura National Park', 'MPR-ujjain':'Mahakaleshwar Jyotirlinga',
  'MPR-omkareshwar':'Omkareshwar', 'MPR-chanderi':'Chanderi',
  /* Chhattisgarh */
  'CHH-chitrakote':'Chitrakote Falls', 'CHH-bastar':'Bastar district',
  'CHH-sirpur':'Sirpur Group of Monuments',
  'CHH-barnawapara':'Barnawapara Wildlife Sanctuary',
  /* Karnataka */
  'KAR-mysore':'Mysore Palace', 'KAR-badami':'Badami cave temples',
  'KAR-coorg':'Kodagu district', 'KAR-gokarna':'Gokarna, Karnataka',
  'KAR-belur-halebidu':'Chennakeshava Temple, Belur',
  'KAR-bandipur':'Bandipur National Park', 'KAR-nagarhole':'Nagarhole National Park',
  'KAR-bengaluru':'Bangalore', 'KAR-jog-falls':'Jog Falls',
  'KAR-murudeshwar':'Murudeshwara', 'KAR-bijapur':'Gol Gumbaz',
  'KAR-shravanabelagola':'Shravanabelagola', 'KAR-dandeli':'Dandeli',
  'KAR-udupi':'Udupi Sri Krishna Matha',
  /* Kerala */
  'KER-alleppey':'Alappuzha', 'KER-kochi':'Fort Kochi',
  'KER-thekkady':'Periyar National Park', 'KER-wayanad':'Wayanad district',
  'KER-athirappilly':'Athirappilly Falls', 'KER-bekal':'Bekal Fort',
  'KER-silent-valley':'Silent Valley National Park',
  'KER-trivandrum':'Padmanabhaswamy Temple', 'KER-kozhikode':'Kozhikode',
  'KER-ponmudi':'Ponmudi', 'KER-vagamon':'Vagamon', 'KER-kollam':'Kollam',
  /* Tamil Nadu */
  'TND-madurai':'Meenakshi Temple', 'TND-thanjavur':'Brihadeeswarar Temple',
  'TND-ooty':'Ooty', 'TND-rameswaram':'Ramanathaswamy Temple',
  'TND-chennai':'Marina Beach', 'TND-chettinad':'Chettinad',
  'TND-chidambaram':'Thillai Nataraja Temple, Chidambaram',
  'TND-trichy':'Ranganathaswamy Temple, Srirangam',
  'TND-mudumalai':'Mudumalai National Park', 'TND-hogenakkal':'Hogenakkal Falls',
  'TND-gingee':'Gingee Fort', 'TND-dhanushkodi':'Dhanushkodi',
  'TND-velankanni':'Basilica of Our Lady of Good Health',
  'TND-mahabalipuram':'Shore Temple', 'TND-yercaud':'Yercaud',
  'TND-coonoor':'Coonoor', 'TND-kumbakonam':'Kumbakonam',
  /* Puducherry */
  'PUD-puducherry':'Puducherry', 'PUD-auroville':'Auroville',
  /* Andhra & Telangana */
  'APR-tirupati':'Tirumala Venkateswara Temple', 'APR-araku':'Araku Valley',
  'APR-gandikota':'Gandikota', 'APR-lepakshi':'Lepakshi',
  'APR-srisailam':'Srisailam', 'APR-amaravati':'Amaravati Stupa',
  'TEL-hyderabad':'Charminar', 'TEL-golconda':'Golconda Fort',
  'TEL-ramappa':'Ramappa Temple', 'TEL-warangal':'Warangal Fort',
  'TEL-bhadrachalam':'Bhadrachalam', 'TEL-medak':'Medak Cathedral',
  /* Odisha */
  'ODI-konark':'Konark Sun Temple', 'ODI-puri':'Jagannath Temple, Puri',
  'ODI-bhubaneswar':'Lingaraja Temple', 'ODI-chilika':'Chilika Lake',
  'ODI-simlipal':'Similipal National Park',
  'ODI-bhitarkanika':'Bhitarkanika National Park', 'ODI-raghurajpur':'Raghurajpur',
  'ODI-udayagiri-khandagiri':'Udayagiri and Khandagiri Caves',
  'ODI-gopalpur':'Gopalpur, Odisha', 'ODI-daringbadi':'Daringbadi',
  /* West Bengal */
  'WBG-kolkata':'Victoria Memorial, Kolkata',
  'WBG-sundarbans':'Sundarbans National Park', 'WBG-santiniketan':'Santiniketan',
  'WBG-bishnupur':'Bishnupur, Bankura', 'WBG-sandakphu':'Sandakphu',
  'WBG-dooars':'Dooars', 'WBG-murshidabad':'Hazarduari Palace',
  'WBG-mirik':'Mirik', 'WBG-digha':'Digha', 'WBG-kalimpong':'Kalimpong',
  /* Sikkim */
  'SIK-yumthang':'Yumthang Valley', 'SIK-gurudongmar':'Gurudongmar Lake',
  'SIK-tsomgo':'Tsongmo Lake', 'SIK-ravangla':'Ravangla',
  'SIK-khangchendzonga-np':'Khangchendzonga National Park',
  'SIK-pelling':'Pelling', 'SIK-yuksom':'Yuksom',
  /* Assam */
  'ASM-kaziranga':'Kaziranga National Park', 'ASM-majuli':'Majuli',
  'ASM-guwahati':'Kamakhya Temple', 'ASM-manas':'Manas National Park',
  'ASM-sivasagar':'Sivasagar', 'ASM-tezpur':'Tezpur',
  'ASM-dibru-saikhowa':'Dibru-Saikhowa National Park',
  /* Meghalaya */
  'MEG-cherrapunji':'Cherrapunji', 'MEG-nongriat':'Living root bridge',
  'MEG-dawki':'Dawki', 'MEG-mawlynnong':'Mawlynnong',
  'MEG-mawsynram':'Mawsynram', 'MEG-balpakram':'Balpakram National Park',
  /* Arunachal, Nagaland, Manipur, Mizoram, Tripura */
  'ARP-tawang':'Tawang Monastery', 'ARP-ziro':'Ziro',
  'ARP-namdapha':'Namdapha National Park', 'ARP-mechuka':'Mechuka',
  'ARP-dirang-bomdila':'Bomdila',
  'NAG-dzukou':'Dzukou Valley', 'NAG-longwa':'Longwa',
  'MNP-loktak':'Loktak Lake', 'MNP-keibul-lamjao':'Keibul Lamjao National Park',
  'MIZ-phawngpui':'Phawngpui',
  'TRI-unakoti':'Unakoti', 'TRI-neermahal':'Neermahal',
  'TRI-agartala':'Ujjayanta Palace',
  /* Bihar & Jharkhand */
  'BIH-bodh-gaya':'Mahabodhi Temple', 'BIH-nalanda':'Nalanda mahavihara',
  'BIH-rajgir':'Rajgir', 'BIH-vaishali':'Vaishali (ancient city)',
  'JHA-netarhat':'Netarhat', 'JHA-betla':'Betla National Park',
  'JHA-deoghar':'Baidyanath Temple', 'JHA-ranchi':'Ranchi',
  /* Islands */
  'AND-havelock':'Havelock Island', 'AND-port-blair':'Cellular Jail',
  'AND-neil':'Neil Island', 'AND-baratang':'Baratang Island',
  'AND-ross-island':'Ross Island, Andaman', 'AND-diglipur':'Diglipur',
  'LAK-agatti':'Agatti Island', 'LAK-bangaram':'Bangaram',
  'LAK-kavaratti':'Kavaratti'
};

/* ---------- accessors ---------- */
function inPlaceGet(id){
  const p = IN_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'IN' } : null;
}

function inRegionName(code){ return (IN_REGIONS[code] || [])[0] || code; }
function inKindLabel(k){ return IN_KIND[k] || k; }

/* Places in one region, best known first. */
function inRegionPlaces(code){
  return IN_PLACE_IDS.filter(id => IN_PLACES[id][1] === code)
    .sort((a, b) => (IN_PLACES[b][5] || 0) - (IN_PLACES[a][5] || 0));
}

/* Definitely on the water. */
function inIsCoastal(p){
  if (!p) return false;
  if (['beach','island','backwater'].indexOf(p.kind) !== -1) return true;
  const land = p.land || [];
  return land.indexOf('beach') !== -1 || land.indexOf('island') !== -1;
}

/* The states and territories with no coastline at all. */
const IN_LANDLOCKED = {
  RAJ:1, UTP:1, DEL:1, HPR:1, UTK:1, LAD:1, JKA:1, PUN:1, HAR:1,
  MPR:1, CHH:1, TEL:1, SIK:1, ASM:1, MEG:1, ARP:1, NAG:1, MNP:1,
  MIZ:1, TRI:1, BIH:1, JHA:1
};

/* A coarse trace of the Indian coastline, Kutch round to the
   Sundarbans, about a hundred kilometres apart.

   Costa Rica could decide "is the sea worth asking about" from the
   region alone, because no point in the country is more than about
   seventy kilometres from salt water. India cannot. Karnataka has a
   coast and also has Hampi, three hundred kilometres inland; Tamil
   Nadu has a coast and also has Ooty, up a mountain. A state-level
   test would send a marine request for both and get a column of
   nulls back every time.

   So the distance to the actual coast decides it. The trace is
   deliberately rough — it only has to be good to within a cell of
   the marine grid, and anything that squeaks through still gets
   rejected when the forecast comes back empty. */
const IN_COAST = [
  [23.0,68.9],[22.3,69.1],[21.5,69.6],[20.9,70.4],[20.7,71.0],[21.6,72.6],
  [20.4,72.8],[19.3,72.8],[18.0,73.0],[16.9,73.3],[15.9,73.5],[15.5,73.8],
  [14.8,74.1],[13.3,74.7],[12.9,74.8],[11.9,75.4],[11.2,75.8],[10.0,76.2],
  [ 8.9,76.6],[ 8.4,77.0],[ 8.1,77.6],[ 9.3,79.3],[10.3,79.9],[11.9,79.8],
  [13.1,80.3],[14.5,80.2],[15.9,80.5],[16.6,82.3],[17.7,83.3],[19.3,84.9],
  [19.8,85.9],[20.7,86.9],[21.6,87.5],[21.9,88.9]
];

/* Kilometres between two points on the globe. Written here rather
   than taken from geo.js so this file does not depend on load order,
   and because that one answers in miles. */
function inKmApart(aLat, aLon, bLat, bLon){
  const R = 6371, rad = Math.PI / 180;
  const dLat = (bLat - aLat) * rad, dLon = (bLon - aLon) * rad;
  const s = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(aLat * rad) * Math.cos(bLat * rad)
          * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

function inKmToCoast(p){
  if (!p) return Infinity;
  let best = Infinity;
  for (const c of IN_COAST){
    const d = inKmApart(p.lat, p.lon, c[0], c[1]);
    if (d < best) best = d;
  }
  return best;
}

/* Might be on the water. A coastal CITY carries none of the beach or
   island tags — Mumbai, Chennai and Kochi are all tagged urban — so
   the strict test alone misses every port in the country. */
/* Kinds that are never coastal however close the map puts them.
   Ooty is a hundred kilometres from the sea and two thousand metres
   above it; Munnar and Mahabaleshwar are the same story. The
   distance test alone would ask the marine grid about all of them. */
const IN_INLAND_KIND = { hill: 1, mountain: 1, valley: 1, pass: 1 };

function inMaybeCoastal(p){
  if (!p) return false;
  if (inIsCoastal(p)) return true;
  if (p.abbr === 'AND' || p.abbr === 'LAK') return true;   /* all islands */
  if (IN_LANDLOCKED[p.abbr]) return false;
  if (IN_INLAND_KIND[p.kind]) return false;
  return inKmToCoast(p) < 120;
}

/* Which sea. India has three and they behave differently: the Arabian
   Sea takes the full force of the southwest monsoon from June, the
   Bay of Bengal generates most of the cyclones and runs a second
   monsoon in October, and the Andaman and Lakshadweep waters are
   another matter again. */
function inSeaOf(p){
  if (!p) return '';
  if (!inMaybeCoastal(p)) return '';
  if (p.abbr === 'AND') return 'Andaman Sea';
  if (p.abbr === 'LAK') return 'Laccadive Sea';
  if (['WBG','ODI','APR','PUD'].indexOf(p.abbr) !== -1) return 'Bay of Bengal';
  if (p.abbr === 'TND') return p.lon > 79.5 ? 'Bay of Bengal' : 'Indian Ocean';
  return 'Arabian Sea';
}

/* High enough that altitude is a fact of the visit rather than a
   detail. Used to warn about acclimatisation and to explain why it
   is ten degrees colder than the plains an hour away. */
const IN_HIGH = { LAD:1, SIK:1 };
function inIsHighAltitude(p){
  if (!p) return false;
  if (IN_HIGH[p.abbr]) return true;
  if ((p.flags || []).indexOf('himalaya') !== -1) return true;
  return p.kind === 'pass' || (p.kind === 'mountain' && (p.land || []).indexOf('mountain') !== -1);
}

/* Seismically live ground. The Himalayan front is one of the most
   active continental collision zones on earth and the Northeast sits
   on the syntaxis where it turns south — both have produced
   magnitude-8 events within living memory. */
const IN_SEISMIC = { LAD:1, JKA:1, HPR:1, UTK:1, SIK:1, ASM:1, MEG:1, ARP:1,
                     NAG:1, MNP:1, MIZ:1, TRI:1, AND:1 };
function inIsSeismic(p){
  if (!p) return false;
  return !!IN_SEISMIC[p.abbr];
}
