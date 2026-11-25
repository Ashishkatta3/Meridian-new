/* ===========================================================
   JAPAN — prefectures and places

   Same packed-array shape as everything else in the atlas:

     id -> [ name, region, kind, lat, lon, prominence, land[], who[], flags[], blurb ]

   Its own namespace (JP_PLACES / jpPlaceGet), so nothing here
   touches the US map, the US search index or the planner until
   the atlases are deliberately joined.

   The regions are the forty-seven prefectures. Japan also has a
   familiar eight-region grouping (Hokkaido, Tohoku, Kanto, Chubu,
   Kansai, Chugoku, Shikoku, Kyushu-Okinawa) and the page uses that
   for navigation, but prefecture is the unit people actually name.
   You go to Nagano, not to "central Honshu".

   Region codes are three letters and avoid every code already taken
   by Italy's twenty, Costa Rica's nine and India's thirty-four.
   Sicily holds SIC so Shiga is SHG. Karnataka holds KAR so Kagawa is
   KGW. Nagaland holds NAG so Nagano is NGN and Nagasaki is NGS.

   The vocabulary is Japan's own. A shrine is not a temple, a castle
   is not a fort in the Indian sense, and an onsen town is a kind of
   place with no equivalent anywhere else in this atlas.
   =========================================================== */

/* ---------- what a place IS, Japanese edition ---------- */
const JP_KIND = {
  city:     'City',
  town:     'Town',
  village:  'Village',
  district: 'District',
  temple:   'Temple',
  shrine:   'Shrine',
  castle:   'Castle',
  garden:   'Garden',
  onsen:    'Hot spring town',
  np:       'National park',
  mountain: 'Mountain',
  volcano:  'Volcano',
  lake:     'Lake',
  river:    'River',
  gorge:    'Gorge',
  valley:   'Valley',
  falls:    'Waterfall',
  coast:    'Coast',
  beach:    'Beach',
  island:   'Island',
  forest:   'Forest',
  dunes:    'Sand dunes',
  museum:   'Museum',
  ruin:     'Historic site',
  market:   'Market',
  pass:     'Mountain pass',
  region:   'Region',
  rural:    'Countryside'
};

/* Extra flags Japan needs. The base FLAG list in taxonomy.js still
   applies underneath. Every tag used below has a label here or
   there; the test suite checks it, because a missing one renders as
   a raw lowercase chip. */
const JP_FLAG = {
  unesco:     ['UNESCO',      'On the World Heritage list'],
  temple:     ['Temples',     'Buddhist temples worth the time'],
  shrine:     ['Shrines',     'Shinto, and usually older than it looks'],
  castle:     ['Castles',     'Keeps, walls and the towns built around them'],
  garden:     ['Gardens',     'Designed landscape, not a park'],
  onsen:      ['Onsen',       'Hot spring bathing is the point'],
  sakura:     ['Cherry blossom', 'A named spot for the bloom'],
  koyo:       ['Autumn colour',  'Worth planning a November trip around'],
  ski:        ['Skiing',      'Lift-served snow, often very deep'],
  hiking:     ['Hiking',      'Real walking, not a viewpoint car park'],
  pottery:    ['Ceramics',    'A kiln town with centuries behind it'],
  festival:   ['Festival',    'Built around one date in the calendar'],
  volcano:    ['Volcanic',    'Active, and you will know it'],
  coastal:    ['Coastal',     'The sea is the whole point'],
  historic:   ['Old town',    'Pre-modern streets still standing'],
  modern:     ['Modern',      'Architecture, design or the contemporary city'],
  literary:   ['Literary',    'Written about, and worth reading first'],
  pilgrimage: ['Pilgrimage',  'People come on foot and for faith'],
  nightlife:  ['Nightlife',   'The evening is the reason'],
  diving:     ['Diving',      'Worth getting in with a tank'],
  snow:       ['Deep snow',   'Among the snowiest inhabited places on earth'],
  wwii:       ['1945',        'The war is the reason the place is known'],
  craft:      ['Craft',       'Lacquer, textile, paper or metalwork still made here'],
  island:     ['Island',      'Reached by boat or a long bridge'],
  wildlife:   ['Wildlife',    'Animals are the draw'],
  forest:     ['Forest',      'Old trees, and the reason to come'],
  lake:       ['Lake',        'Water you can walk or row around'],
  river:      ['River',       'The river is the attraction'],
  beach:      ['Beach',       'Sand worth the journey'],
  gorge:      ['Gorge',       'Cut rock and a path through it'],
  falls:      ['Waterfall',   'A named fall, not a trickle'],
  market:     ['Market',      'A working market, not a souvenir row'],
  rural:      ['Countryside', 'Farmland, terraces and villages']
};

/* ---------- the prefectures ----------
   code -> [ English name, Japanese name, character, blurb ] */
const JP_REGIONS = {
  /* Hokkaido */
  HKD: ['Hokkaido', '北海道', 'wild',
    'Twenty per cent of Japan’s land and five per cent of its people. Volcanoes, cranes, drift ice and the deepest powder on earth.'],

  /* Tohoku */
  AOM: ['Aomori', '青森県', 'rural',
    'The top of Honshu. Beech forest nobody logged, a festival of giant lit floats, and apples in every direction.'],
  IWT: ['Iwate', '岩手県', 'rural',
    'A prefecture the size of Shikoku with a tenth of the people. A temple complex that was once a rival to Kyoto, and a coastline the 2011 tsunami rewrote.'],
  MYG: ['Miyagi', '宮城県', 'coastal',
    'Sendai and the pine islands of Matsushima, which poets have been failing to describe adequately since the seventeenth century.'],
  AKT: ['Akita', '秋田県', 'rural',
    'Samurai streets under weeping cherries, lake water the colour of ink, and the heaviest rice-growing snow country in Tohoku.'],
  YGT: ['Yamagata', '山形県', 'mountain',
    'Temples cut into cliffs, three sacred mountains walked as a pilgrimage, and an onsen town that looks like a film set because it has been one.'],
  FKS: ['Fukushima', '福島県', 'mountain',
    'A samurai castle town, thatched post-road villages and a lake district. The name carries 2011, and the tourist areas are nowhere near the plant.'],

  /* Kanto */
  TKY: ['Tokyo', '東京都', 'urban',
    'Thirty-seven million people in the metro area and the best-run city of that size anywhere. Also a national park, an active volcano and a coral island, all inside the prefecture.'],
  KNG: ['Kanagawa', '神奈川県', 'coastal',
    'Yokohama, the Kamakura temples, and Hakone’s hot springs with Fuji behind them. Tokyo’s weekend, essentially.'],
  CHB: ['Chiba', '千葉県', 'coastal',
    'The peninsula east of Tokyo. Surf beaches, a thousand-year-old temple at Narita, and the airport most visitors see first and never leave.'],
  STM: ['Saitama', '埼玉県', 'urban',
    'Commuter country with a well-preserved Edo merchant town in the middle of it, and a bonsai village that supplies the world.'],
  TCG: ['Tochigi', '栃木県', 'mountain',
    'Nikko, which is either the most lavish religious complex in Japan or the most vulgar, depending on who you ask. Both views are defensible.'],
  GNM: ['Gunma', '群馬県', 'onsen',
    'Hot spring country. Kusatsu pumps more mineral water per minute than any other resort in Japan, and most of it is too hot to get into.'],
  IBR: ['Ibaraki', '茨城県', 'coastal',
    'A seaside park that turns blue with flowers every spring, the second-tallest Buddha on earth, and natto, which the rest of Japan finds difficult.'],

  /* Chubu */
  NGT: ['Niigata', '新潟県', 'rural',
    'Rice and sake, and the snow that makes both possible. The tunnel from Tokyo comes out the other side into a different climate.'],
  TYM: ['Toyama', '富山県', 'mountain',
    'A wall of snow twenty metres high on an alpine route, glass art, and the best sushi on the Sea of Japan.'],
  ISK: ['Ishikawa', '石川県', 'historic',
    'Kanazawa kept its geisha districts, its samurai quarter and one of the three great gardens, because the bombers never came.'],
  FKI: ['Fukui', '福井県', 'coastal',
    'A Zen monastery that still runs on the thirteenth-century rule, cliffs of hexagonal rock, and more dinosaur fossils than anywhere else in Japan.'],
  YMN: ['Yamanashi', '山梨県', 'mountain',
    'Fuji’s northern side, the five lakes beneath it, and the vineyards that make Japanese wine from a grape nobody else grows.'],
  NGN: ['Nagano', '長野県', 'mountain',
    'The Japanese Alps. A 1998 Olympic city, a temple older than Buddhism’s split into sects, post towns on the old highway, and monkeys in a hot spring.'],
  GIF: ['Gifu', '岐阜県', 'historic',
    'Steep thatched farmhouses built to shed four metres of snow, a perfectly preserved merchant town, and cormorant fishing on the Nagara.'],
  SZK: ['Shizuoka', '静岡県', 'coastal',
    'Fuji from the south, green tea on every slope, and a peninsula of hot springs that Tokyo has been escaping to for a century.'],
  AIC: ['Aichi', '愛知県', 'urban',
    'Nagoya, Toyota, and the castle towns of the three warlords who unified Japan. Industrial, underrated, and serious about its own food.'],

  /* Kansai */
  KYT: ['Kyoto', '京都府', 'historic',
    'A thousand years of capital, sixteen hundred temples, and a tourism problem it has not solved. Go early, go north, and go in winter.'],
  OSK: ['Osaka', '大阪府', 'urban',
    'The merchant city. Louder, blunter and funnier than Kyoto, and the place Japanese people go when they want to eat.'],
  HYG: ['Hyogo', '兵庫県', 'castle',
    'The best surviving castle in Japan at Himeji, the port city of Kobe, and a silver mine town in the mountains behind.'],
  NAR: ['Nara', '奈良県', 'historic',
    'The capital before Kyoto, with the oldest wooden buildings on earth and twelve hundred deer that have learned to bow.'],
  SHG: ['Shiga', '滋賀県', 'lake',
    'Japan’s largest lake, a castle nobody bombed, and the mountain monastery that trained almost every founder of Japanese Buddhism.'],
  WKY: ['Wakayama', '和歌山県', 'pilgrimage',
    'A monastery town on a mountain where you can sleep in a temple, and the pilgrimage trails of Kumano running down to the sea.'],
  MIE: ['Mie', '三重県', 'shrine',
    'Ise, the most important shrine in Shinto, rebuilt from scratch every twenty years. Also pearls, ninja and very good beef.'],

  /* Chugoku */
  HRS: ['Hiroshima', '広島県', 'coastal',
    'A city that insists on being understood, and a floating shrine gate an hour away. Both are World Heritage, for opposite reasons.'],
  OKY: ['Okayama', '岡山県', 'garden',
    'One of the three great gardens, a canal quarter of white-walled warehouses, and the gateway to the art islands.'],
  SMN: ['Shimane', '島根県', 'shrine',
    'Where the gods gather every October. The oldest shrine in Japan, a silver mine that financed empires, and almost no tourists.'],
  TTR: ['Tottori', '鳥取県', 'coastal',
    'Sand dunes on the Sea of Japan, the least populous prefecture in the country, and pear orchards behind the coast.'],
  YMG: ['Yamaguchi', '山口県', 'coastal',
    'A wooden arched bridge, a tunnel of a hundred and twenty-three red gates up a hillside, and the town the Meiji Restoration was plotted in.'],

  /* Shikoku */
  KGW: ['Kagawa', '香川県', 'island',
    'The smallest prefecture, built on udon and a garden that took a century. The ferry port for the Inland Sea art islands.'],
  TKS: ['Tokushima', '徳島県', 'mountain',
    'Whirlpools in a strait, vine bridges over a gorge, and the loudest dance festival in Japan.'],
  EHM: ['Ehime', '愛媛県', 'onsen',
    'The oldest hot spring in Japan, still operating out of a wooden bathhouse that inspired a Ghibli film, plus citrus on every hillside.'],
  KCH: ['Kochi', '高知県', 'coastal',
    'The Pacific side of Shikoku. A surviving castle, a river clean enough to swim in, and seared bonito over burning straw.'],

  /* Kyushu */
  FKO: ['Fukuoka', '福岡県', 'urban',
    'The closest major Japanese city to the Asian mainland, and it shows in the food. Tonkotsu ramen was invented here and the street stalls still run.'],
  SAG: ['Saga', '佐賀県', 'pottery',
    'Four hundred years of porcelain. Arita and Imari shipped to European palaces, and the kilns are still firing.'],
  NGS: ['Nagasaki', '長崎県', 'historic',
    'Japan’s one window on the world for two centuries, then the second atomic bomb. A Catholic, Chinese and Dutch city, and it still looks like one.'],
  KMM: ['Kumamoto', '熊本県', 'volcano',
    'The largest volcanic caldera in the world with towns and railways inside it, and a castle rebuilt twice, most recently after 2016.'],
  OIT: ['Oita', '大分県', 'onsen',
    'More hot spring water than anywhere else in Japan. Beppu steams in the street, and Yufuin is where people go to escape Beppu.'],
  MYZ: ['Miyazaki', '宮崎県', 'coastal',
    'A gorge of basalt columns rowed by hand, surf beaches, and the shrine where Japanese mythology says the sun goddess hid in a cave.'],
  KGS: ['Kagoshima', '鹿児島県', 'volcano',
    'A city with an erupting volcano across the bay that drops ash on the washing. South of it, an island of cedar forest that Ghibli drew.'],

  /* Okinawa */
  OKN: ['Okinawa', '沖縄県', 'island',
    'An independent kingdom until 1879, closer to Taipei than Tokyo. Coral reefs, a distinct language, and the heaviest American military footprint in Asia.']
};

const JP_PLACES = {

  /* ===================== HOKKAIDO ===================== */
  'HKD-sapporo': ['Sapporo','HKD','city',43.0618,141.3545,9,['urban'],['friends','family','couple'],['food','nightlife','snow','festival','modern'],
    'Laid out on an American grid in 1869, which makes it the easiest Japanese city to navigate and the least Japanese-looking. Ramen, beer and a February festival of enormous snow sculptures.'],
  'HKD-otaru': ['Otaru','HKD','town',43.1907,140.9947,7,['urban','water'],['couple','family'],['historic','coastal','snow','craft'],
    'A herring port that got rich, built stone warehouses along a canal, and then stopped. Glassworks and music boxes now, and a canal that photographs well in snow.'],
  'HKD-furano': ['Furano & Biei','HKD','town',43.3421,142.3831,8,['rural'],['couple','family'],['ski','hiking','sakura'],
    'Lavender in July laid out in stripes across the hills, and the single trees in the Biei fields that Japanese advertising made famous. Good skiing in winter and far fewer foreigners than Niseko.'],
  'HKD-niseko': ['Niseko','HKD','town',42.8048,140.6874,9,['mountain'],['friends','couple'],['ski','snow','onsen'],
    'Fifteen metres of snow a season, falling light and dry because the storms come off Siberia across the Sea of Japan. Half the staff speak Australian.'],
  'HKD-shiretoko': ['Shiretoko','HKD','np',44.1333,145.0167,9,['water','mountain'],['solo','couple'],['unesco','hiking','wildlife','coastal'],
    'A peninsula at the end of the road with the highest density of brown bears in Japan. World Heritage for the link between the drift ice and everything that eats underneath it.'],
  'HKD-daisetsuzan': ['Daisetsuzan','HKD','np',43.6639,142.8542,8,['mountain'],['solo','friends'],['hiking','koyo','onsen'],
    'The roof of Hokkaido and the largest national park in Japan. Autumn colour starts here in mid-September, earlier than anywhere else in the country.'],
  'HKD-hakodate': ['Hakodate','HKD','city',41.7687,140.7288,8,['urban','water'],['couple','family'],['historic','coastal','food','sakura'],
    'The first port opened to foreigners in 1859, so it has Russian churches and Western houses on a hillside. The night view from the mountain is the one on all the posters.'],
  'HKD-noboribetsu': ['Noboribetsu','HKD','onsen',42.4983,141.1256,7,['mountain'],['couple','family'],['onsen','volcano'],
    'Hell Valley, which is a steaming sulphur crater, feeding eleven different kinds of mineral water into the baths below it. The smell takes about an hour to stop noticing.'],
  'HKD-abashiri': ['Abashiri','HKD','town',44.0206,144.2735,7,['water'],['solo','couple'],['coastal','snow','wildlife'],
    'Drift ice arrives from the Amur river in late January and you can go out through it on an icebreaker. The former maximum security prison is now an unexpectedly good museum.'],
  'HKD-kushiro': ['Kushiro & Akan','HKD','np',43.0397,144.0867,7,['water'],['solo','couple'],['wildlife','lake','onsen','koyo'],
    'Marshland where the red-crowned crane came back from near extinction, and inland, lakes with volcanic peaks behind them and a resident Ainu community at Akan.'],
  'HKD-lake-toya': ['Lake Toya','HKD','lake',42.5833,140.8333,6,['water','mountain'],['couple','family'],['lake','onsen','volcano'],
    'A caldera lake with a volcano in the middle that last erupted in 1977 and again in 2000. The 2008 G8 summit was held on the ridge above it.'],
  'HKD-wakkanai': ['Wakkanai & Rishiri-Rebun','HKD','island',45.4153,141.6730,6,['water','island'],['solo'],['island','hiking','coastal'],
    'The northern tip of Japan, with Sakhalin visible on a clear day. Two islands offshore, one a conical volcano, the other covered in alpine flowers in June.'],
  'HKD-asahikawa': ['Asahikawa','HKD','city',43.7706,142.3650,6,['urban'],['family'],['food','snow'],
    'Hokkaido’s second city, mostly a base for Daisetsuzan. The zoo pioneered enclosures that let animals behave normally, and other zoos copied it.'],
  'HKD-shikotsu': ['Lake Shikotsu','HKD','lake',42.7500,141.3500,5,['water','mountain'],['couple','solo'],['lake','onsen','hiking'],
    'The second deepest lake in Japan and clear enough to see ten metres down. Never freezes, which is why the January ice festival has to build its sculptures by spraying water.'],
  'HKD-obihiro': ['Obihiro & Tokachi','HKD','town',42.9239,143.1967,5,['rural'],['family','couple'],['food','onsen'],
    'Farm country, and the only place in the world where draught horses race while pulling weighted sledges. The local onsen water is brown with peat and good for skin.'],
  'HKD-hokkaido-cape': ['Cape Erimo','HKD','coast',41.9256,143.2447,4,['water'],['solo'],['coastal','wildlife'],
    'A spit of rock running into the Pacific with wind speeds over ten metres a second for roughly three hundred days a year. Several hundred seals live on the rocks below.'],

  /* ===================== AOMORI ===================== */
  'AOM-hirosaki': ['Hirosaki','AOM','castle',40.6031,140.4639,7,['urban'],['couple','family'],['castle','sakura','historic'],
    'The castle is small but the moat is lined with two thousand six hundred cherry trees, and when the petals fall the water turns solid pink. Late April, which is three weeks after Tokyo.'],
  'AOM-oirase': ['Oirase Gorge','AOM','gorge',40.5333,140.9500,7,['forest','water'],['couple','solo'],['hiking','koyo','forest'],
    'Fourteen kilometres of stream running out of Lake Towada, with a flat path beside it the whole way. The classic walk is nine kilometres and almost entirely level.'],
  'AOM-towada': ['Lake Towada','AOM','lake',40.4667,140.8833,6,['water'],['couple','family'],['lake','koyo','onsen'],
    'A double caldera lake with water so clear it reads black from above. Boats cross it in summer and the whole rim turns in late October.'],
  'AOM-aomori-city': ['Aomori','AOM','city',40.8246,140.7406,6,['urban','water'],['family','friends'],['festival','food','coastal'],
    'The Nebuta festival in early August sends illuminated paper floats three storeys high through the streets with thousands of dancers around them. The rest of the year, scallops and a very good museum.'],
  'AOM-shirakami': ['Shirakami-Sanchi','AOM','np',40.4667,140.1000,6,['mountain','forest'],['solo'],['unesco','hiking','forest'],
    'The largest untouched beech forest in East Asia, World Heritage since 1993. Most of the core is closed to entry, which is the point.'],
  'AOM-hakkoda': ['Hakkoda','AOM','mountain',40.6594,140.8778,5,['mountain'],['solo','friends'],['ski','snow','onsen','hiking'],
    'Snow monsters in winter, which are fir trees encased in rime until they look like figures. Also the site of Japan’s worst mountaineering disaster, in 1902.'],
  'AOM-sannai-maruyama': ['Sannai-Maruyama','AOM','ruin',40.8111,140.6956,5,['rural'],['family','solo'],['unesco','historic'],
    'A Jomon settlement occupied for fifteen hundred years from 3900 BC, with reconstructed pit dwellings and a six-pillar timber structure nobody can explain. World Heritage since 2021.'],

  /* ===================== IWATE ===================== */
  'IWT-hiraizumi': ['Hiraizumi','IWT','temple',38.9869,141.1000,7,['rural'],['couple','solo'],['unesco','temple','garden','historic'],
    'In the twelfth century this was the second city of Japan, built by a branch of the Fujiwara to rival Kyoto. The gold hall at Chusonji survives, covered inside and out in gold leaf and mother of pearl.'],
  'IWT-morioka': ['Morioka','IWT','city',39.7036,141.1527,6,['urban'],['family','friends'],['food','festival','craft'],
    'Three competing noodle dishes, one of which is served in tiny bowls refilled until you surrender. Cast ironware from here is sold worldwide.'],
  'IWT-geibikei': ['Geibikei & Genbikei','IWT','gorge',38.9833,141.2667,6,['water','forest'],['couple','family'],['koyo','river'],
    'A gorge you go through on a flat-bottomed boat poled by a man who sings on the way back. The other gorge nearby has a basket of dumplings that arrives by zip wire across the river.'],
  'IWT-tono': ['Tono','IWT','town',39.3278,141.5333,5,['rural'],['solo','couple'],['literary','historic','rural'],
    'The setting of a 1910 collection of folk tales that effectively founded Japanese folklore studies. Thatched farmhouses, water sprites in the rivers, and a valley that takes the stories seriously.'],
  'IWT-rikuchu': ['Sanriku Coast','IWT','coast',39.3500,141.9500,6,['water'],['solo'],['coastal','hiking','wwii'],
    'Cliffs, sea stacks and a long-distance coastal trail. The 2011 tsunami reached forty metres here, and the rebuilt sea walls are now part of the view.'],
  'IWT-hachimantai': ['Hachimantai','IWT','mountain',39.9583,140.8542,5,['mountain'],['solo','couple'],['onsen','hiking','snow'],
    'A volcanic plateau on the Akita border with marshes, crater lakes and several remote hot springs. The aspiration road opens in April through snow walls.'],
  'IWT-kitakami': ['Kitakami','IWT','town',39.2869,141.1131,4,['rural','water'],['couple','family'],['sakura'],
    'Two kilometres of cherry trees along the river, blooming in mid-April. One of the better bloom spots in Tohoku and far quieter than Hirosaki.'],

  /* ===================== MIYAGI ===================== */
  'MYG-matsushima': ['Matsushima','MYG','coast',38.3700,141.0600,8,['water','island'],['couple','family'],['coastal','island','temple','historic'],
    'Two hundred and sixty pine-covered islets in a shallow bay, counted among the three great views of Japan since the seventeenth century. Basho got here in 1689 and reportedly could not write anything.'],
  'MYG-sendai': ['Sendai','MYG','city',38.2682,140.8694,7,['urban'],['friends','family'],['food','festival','modern'],
    'A green city rebuilt after 1945 with wide tree-lined avenues. Grilled beef tongue was invented here out of postwar scarcity and is now the local dish.'],
  'MYG-naruko': ['Naruko Onsen','MYG','onsen',38.7417,140.7250,5,['mountain'],['couple','solo'],['onsen','koyo','craft'],
    'Nine different spring types in one small valley, which is unusual, and the gorge above it is one of the best autumn colour spots in Tohoku.'],
  'MYG-zao-fox': ['Zao Fox Village','MYG','forest',38.0411,140.5564,5,['forest'],['family','couple'],['wildlife'],
    'Around a hundred foxes of six species running loose in a hillside enclosure you walk through. Strange, slightly chaotic and genuinely popular.'],
  'MYG-shiogama': ['Shiogama','MYG','shrine',38.3167,141.0167,4,['water'],['solo','couple'],['shrine','food','coastal'],
    'A port with more sushi restaurants per head than anywhere else in Japan, and a thousand-year-old shrine at the top of two hundred and two steps.'],
  'MYG-akiu': ['Akiu & Rairaikyo','MYG','onsen',38.2333,140.7333,4,['mountain','water'],['couple','family'],['onsen','koyo','falls'],
    'Sendai’s own hot spring valley, half an hour from the city, with a short gorge walk and a fifty-five metre waterfall at the top of the road.'],

  /* ===================== AKITA ===================== */
  'AKT-kakunodate': ['Kakunodate','AKT','town',39.5953,140.5622,7,['rural'],['couple','family'],['historic','sakura'],
    'A samurai quarter where six of the houses are still owned by the original families. Weeping cherries brought from Kyoto in the 1650s hang over the black fences in late April.'],
  'AKT-nyuto': ['Nyuto Onsen','AKT','onsen',39.7944,140.8000,7,['mountain','forest'],['couple','solo'],['onsen','snow','forest'],
    'Seven inns scattered through beech forest, the oldest dating to 1638, with milky white water and outdoor baths that are mixed bathing by long tradition. In winter you arrive through snow walls.'],
  'AKT-tazawa': ['Lake Tazawa','AKT','lake',39.7167,140.6667,6,['water','mountain'],['couple','family'],['lake','koyo'],
    'The deepest lake in Japan at four hundred and twenty-three metres, which is why it never freezes. A gilded statue of a girl who became a dragon stands on the shore.'],
  'AKT-akita-city': ['Akita','AKT','city',39.7200,140.1025,5,['urban','water'],['family','friends'],['festival','food'],
    'The Kanto festival in August has men balancing poles of forty-six lanterns on their foreheads and hips. Rice country, so the sake is serious.'],
  'AKT-oga': ['Oga Peninsula','AKT','coast',39.9000,139.7500,5,['water'],['solo','family'],['coastal','festival'],
    'Cliffs on the Sea of Japan and the home of the Namahage, masked demons who visit houses on New Year’s Eve to frighten children into behaving.'],
  'AKT-dakigaeri': ['Dakigaeri Gorge','AKT','gorge',39.6500,140.6000,4,['water','forest'],['couple','solo'],['koyo','hiking'],
    'Turquoise water in a narrow cleft with a suspension bridge over it. The name means that the path was once so narrow you had to embrace anyone coming the other way and turn around.'],

  /* ===================== YAMAGATA ===================== */
  'YGT-ginzan': ['Ginzan Onsen','YGT','onsen',38.5728,140.5325,8,['mountain'],['couple'],['onsen','snow','historic'],
    'A former silver mining valley lined with wooden inns three and four storeys high, lit by gas lamps along a river. In deep snow it is the most photographed hot spring street in Japan, and book months ahead.'],
  'YGT-yamadera': ['Yamadera','YGT','temple',38.3131,140.4392,7,['mountain','forest'],['solo','couple'],['temple','hiking','koyo','literary'],
    'A thousand and fifteen steps up a cliff through cedar to halls built into the rock. Basho wrote his cicada haiku here in 1689 and the stillness he described is still available on a weekday morning.'],
  'YGT-dewa-sanzan': ['Dewa Sanzan','YGT','mountain',38.5486,139.9797,7,['mountain','forest'],['solo'],['pilgrimage','temple','hiking','forest'],
    'Three mountains representing birth, death and rebirth, walked as a pilgrimage for over a thousand years. The five-storey pagoda in the cedar forest at the base is from 937.'],
  'YGT-zao': ['Zao Onsen','YGT','onsen',38.1667,140.4000,6,['mountain'],['friends','couple'],['ski','snow','onsen','volcano'],
    'Skiing among the snow monsters, which are fir trees frozen into lumpy white figures by wind and rime. Strongly acidic spring water, and a crater lake that changes colour.'],
  'YGT-tsuruoka': ['Tsuruoka','YGT','town',38.7272,139.8266,5,['rural','water'],['solo','couple'],['food','historic'],
    'A UNESCO City of Gastronomy, which in practice means fifty heirloom vegetable varieties still grown, and the base town for Dewa Sanzan.'],
  'YGT-mogami': ['Mogami River','YGT','river',38.7000,140.2000,4,['water'],['family','couple'],['river','koyo','literary'],
    'A boat trip down the river Basho travelled, with the boatman singing the traditional poling song. An hour, best in autumn.'],

  /* ===================== FUKUSHIMA ===================== */
  'FKS-ouchi-juku': ['Ouchi-juku','FKS','village',37.3253,139.8583,7,['rural'],['couple','family'],['historic','snow','food'],
    'A post town on the old Aizu road with thirty thatched houses in a single street, no overhead wires and no tarmac. The local soba is eaten with a leek instead of chopsticks.'],
  'FKS-aizu': ['Aizu-Wakamatsu','FKS','castle',37.4878,139.9297,6,['urban'],['family','couple'],['castle','historic','sakura'],
    'A samurai domain that held out longest against the Meiji government in 1868. The castle keep has red tiles, which no other Japanese castle does, and the story of the teenage boys who died on the hill above it is still taught.'],
  'FKS-goshikinuma': ['Goshikinuma','FKS','lake',37.6667,140.0667,6,['water','forest'],['couple','solo'],['hiking','lake','koyo'],
    'Thirty ponds formed by an 1888 eruption, each a different colour from cobalt to jade depending on mineral content. A flat four-kilometre walk links the main ones.'],
  'FKS-oze': ['Oze','FKS','np',36.9167,139.2500,6,['mountain','forest'],['solo','friends'],['hiking','forest'],
    'The largest highland marsh in Honshu, crossed entirely on boardwalk. Skunk cabbage in late May, then day-lilies in July, and strict rules about staying on the planks.'],
  'FKS-tsuruga-castle-town': ['Kitakata','FKS','town',37.6514,139.8736,5,['rural'],['friends','family'],['food','craft'],
    'Four thousand traditional storehouses in one small town, and a ramen so locally beloved that people eat it for breakfast. Thick wavy noodles in a light soy broth.'],
  'FKS-nanko': ['Shirakawa','FKS','castle',37.1264,140.2108,4,['rural'],['solo','family'],['castle','historic','sakura'],
    'The barrier gate here marked the northern limit of the civilised world in classical poetry, so crossing it meant something. A reconstructed castle and one of the oldest public parks in Japan.'],

  /* ===================== TOKYO ===================== */
  'TKY-shinjuku': ['Shinjuku','TKY','district',35.6896,139.7006,9,['urban'],['friends','solo','couple'],['nightlife','food','modern'],
    'The busiest railway station on earth moves three and a half million people a day. Above it, skyscrapers; east of it, Kabukicho; and in between, Omoide Yokocho, which is sixty tiny bars under the tracks.'],
  'TKY-shibuya': ['Shibuya','TKY','district',35.6580,139.7016,9,['urban'],['friends','couple'],['nightlife','food','modern'],
    'The crossing everyone films, and then the hills behind it where the interesting part is. Shimokitazawa and Daikanyama are both twenty minutes on foot.'],
  'TKY-asakusa': ['Asakusa','TKY','temple',35.7148,139.7967,9,['urban'],['family','couple'],['temple','historic','food'],
    'Tokyo’s oldest temple, founded in 628 around a statue two fishermen pulled from the river. The approach is a gauntlet of souvenir stalls that has been there for three centuries.'],
  'TKY-ueno': ['Ueno','TKY','district',35.7138,139.7770,8,['urban'],['family','solo'],['sakura','modern','food'],
    'A park with four major museums in it, including the Tokyo National Museum, which holds the best collection of Japanese art anywhere. A thousand cherry trees and an extremely boisterous bloom season.'],
  'TKY-ginza': ['Ginza','TKY','district',35.6717,139.7650,8,['urban'],['couple'],['modern','food','nightlife'],
    'Built on a former silver mint, rebuilt in brick after an 1872 fire, and now the most expensive retail land in Japan. The main street closes to cars on weekend afternoons.'],
  'TKY-meiji-jingu': ['Meiji Jingu','TKY','shrine',35.6764,139.6993,8,['urban','forest'],['solo','couple','family'],['shrine','forest','historic'],
    'A forest of a hundred thousand donated trees planted in 1920, now grown into something that feels genuinely old. Harajuku is directly outside the south gate, which is a jarring transition.'],
  'TKY-tsukiji': ['Tsukiji Outer Market','TKY','market',35.6654,139.7707,8,['urban'],['friends','solo'],['food','market'],
    'The wholesale auction moved to Toyosu in 2018, but the outer market of four hundred stalls stayed and is better for eating. Go before nine.'],
  'TKY-akihabara': ['Akihabara','TKY','district',35.6984,139.7731,7,['urban'],['friends','solo'],['modern','nightlife'],
    'A postwar radio parts market that became electronics, then anime and games. Still has floors of individual components if you look for them.'],
  'TKY-yanaka': ['Yanaka','TKY','district',35.7272,139.7656,7,['urban'],['solo','couple'],['historic','temple','food'],
    'One of the few areas that survived both the 1923 earthquake and the 1945 firebombing, so the lanes, wooden houses and seventy temples are real rather than rebuilt.'],
  'TKY-shinjuku-gyoen': ['Shinjuku Gyoen','TKY','garden',35.6852,139.7100,7,['urban'],['couple','family'],['garden','sakura','koyo'],
    'Fifty-eight hectares of former imperial garden with French, English and Japanese sections. Over a thousand cherry trees of sixty-five varieties, which spreads the bloom across a month.'],
  'TKY-odaiba': ['Odaiba','TKY','district',35.6300,139.7800,6,['urban','water'],['family','friends'],['modern','coastal'],
    'Artificial islands in the bay, built originally as gun batteries against Perry’s ships. Now malls, a teamLab digital art museum and the best skyline view at night.'],
  'TKY-ryogoku': ['Ryogoku','TKY','district',35.6964,139.7931,6,['urban'],['family','solo'],['historic','food'],
    'Sumo. The stadium hosts three of the six annual tournaments and the neighbourhood is full of stables and chanko restaurants run by retired wrestlers.'],
  'TKY-koenji': ['Koenji & Shimokitazawa','TKY','district',35.7056,139.6497,6,['urban'],['friends','solo'],['nightlife','modern','food'],
    'Secondhand clothes, live houses and standing bars. Where Tokyo’s punk and indie scenes have lived since the 1970s, and still cheap by central standards.'],
  'TKY-takao': ['Mount Takao','TKY','mountain',35.6253,139.2436,6,['mountain','forest'],['family','solo'],['hiking','koyo','temple'],
    'An hour from Shinjuku and the most climbed mountain in the world, with around three million people a year. A cable car does most of it, and the beer garden at the top opens in summer.'],
  'TKY-toyosu': ['Toyosu Market','TKY','market',35.6450,139.7867,5,['urban','water'],['solo','friends'],['food','market'],
    'Where the tuna auction went. Viewing is from a glass gallery above, and you need to be there by half past five.'],
  'TKY-ogasawara': ['Ogasawara Islands','TKY','island',27.0947,142.1917,7,['island','water'],['solo','couple'],['unesco','island','diving','wildlife','coastal'],
    'A thousand kilometres south of Tokyo and reachable only by a twenty-four hour ferry that runs roughly weekly. Never connected to a continent, so the species evolved alone. World Heritage, and humpbacks in winter.'],
  'TKY-izu-oshima': ['Izu Oshima','TKY','island',34.7500,139.3833,5,['island','water'],['solo','family'],['island','volcano','coastal'],
    'An active volcano two hours by jet ferry from Tokyo. The whole island was evacuated in 1986 when it erupted. Camellias bloom in February.'],
  'TKY-kichijoji': ['Kichijoji','TKY','district',35.7030,139.5800,6,['urban'],['family','couple'],['food','modern','sakura'],
    'Consistently voted the place Tokyoites most want to live. A park with boats, a dense shopping arcade, and the Ghibli Museum at the far end of it.'],

  /* ===================== KANAGAWA ===================== */
  'KNG-hakone': ['Hakone','KNG','onsen',35.2324,139.1069,9,['mountain','water'],['couple','family'],['onsen','volcano','lake','koyo'],
    'A caldera an hour and a half from Tokyo, circled by a loop of train, funicular, ropeway and pirate ship that is sillier and more enjoyable than it sounds. Fuji appears over the lake on maybe a third of days.'],
  'KNG-kamakura': ['Kamakura','KNG','temple',35.3192,139.5467,9,['water','urban'],['couple','family','solo'],['temple','shrine','coastal','historic'],
    'The seat of government from 1185 to 1333, which left it with sixty-five temples and nineteen shrines in a bowl of hills. The bronze Buddha has sat outdoors since a 1498 tsunami took the hall away.'],
  'KNG-yokohama': ['Yokohama','KNG','city',35.4437,139.6380,7,['urban','water'],['family','couple'],['modern','food','coastal'],
    'Opened to foreign trade in 1859 and grew from a fishing village into Japan’s second city. The largest Chinatown in Asia outside China, and a waterfront that works.'],
  'KNG-enoshima': ['Enoshima','KNG','island',35.2996,139.4805,6,['island','water'],['couple','family'],['island','coastal','shrine'],
    'A small island joined by a bridge, with caves, a shrine to a goddess who subdued a five-headed dragon, and Fuji across the water at sunset.'],
  'KNG-odawara': ['Odawara','KNG','castle',35.2510,139.1533,5,['urban','water'],['family'],['castle','historic'],
    'The Hojo clan held this against the whole country until 1590, when Hideyoshi built a fake castle overnight on the hill opposite to break their nerve. It worked.'],
  'KNG-zushi-hayama': ['Zushi & Hayama','KNG','beach',35.2833,139.5833,5,['water'],['couple','family'],['coastal','modern'],
    'Where Tokyo keeps its boats. Quieter beaches than Kamakura, an imperial villa, and a modern art museum right on the sand.'],
  'KNG-kawasaki': ['Kawasaki','KNG','city',35.5308,139.7029,4,['urban'],['friends'],['modern','festival'],
    'Industrial, and the factory night views have their own tourism. The Nihon Minkaen open-air museum has twenty-five relocated farmhouses from across Japan.'],
  'KNG-miura': ['Miura Peninsula','KNG','coast',35.1500,139.6167,4,['water'],['family','couple'],['coastal','food'],
    'Tuna at Misaki port, cabbage fields, and a tidal island you can walk to. An easy day from Tokyo that almost no foreign visitor makes.'],
  'KNG-ashinoko': ['Lake Ashi','KNG','lake',35.2050,139.0239,6,['water','mountain'],['couple','family'],['lake','shrine','koyo'],
    'The caldera lake at Hakone, with a red shrine gate standing in the water that produces a queue of about an hour for photographs.'],

  /* ===================== CHIBA ===================== */
  'CHB-narita': ['Naritasan','CHB','temple',35.7864,140.3181,6,['urban'],['family','solo'],['temple','historic','food'],
    'A temple founded in 940 with a genuinely impressive complex and a long approach street of eel restaurants. Twenty minutes from the airport, so it is the best possible layover.'],
  'CHB-boso': ['Boso Peninsula','CHB','coast',35.1500,140.1000,5,['water'],['friends','family'],['coastal','food'],
    'Surf beaches on the Pacific side, and a warm current that keeps the flowers blooming in January. Japan’s Olympic surfing was held here.'],
  'CHB-nokogiriyama': ['Nokogiriyama','CHB','mountain',35.1611,139.8250,5,['mountain','water'],['family','couple'],['hiking','temple','coastal'],
    'A former quarry mountain with sheer cut faces, a thirty-one metre stone Buddha, and a viewing platform that juts out over a hundred metre drop. Reached by ferry across Tokyo Bay.'],
  'CHB-katsuura': ['Katsuura','CHB','town',35.1522,140.3203,4,['water'],['family'],['coastal','food','market'],
    'A morning market that has run for over four hundred years, and tuna landings. Also one of the coolest places in Japan in August, which is a genuine selling point.'],
  'CHB-sawara': ['Sawara','CHB','town',35.8903,140.4986,5,['water','rural'],['couple','solo'],['historic','craft'],
    'A canal town of merchant houses that traded up to Edo by boat. The man who made the first accurate survey map of Japan lived here, and his house is open.'],

  /* ===================== SAITAMA ===================== */
  'STM-kawagoe': ['Kawagoe','STM','town',35.9251,139.4858,7,['urban'],['couple','family'],['historic','food','craft'],
    'Black-walled clay storehouses built to survive fire, a bell tower that has marked the hours since the 1600s, and a lane that sells nothing but sweets. Half an hour from Ikebukuro.'],
  'STM-chichibu': ['Chichibu','STM','town',35.9917,139.0853,5,['mountain'],['family','solo'],['festival','hiking','pilgrimage'],
    'A December night festival with floats hauled up a hill under fireworks, and a thirty-four temple pilgrimage circuit through the hills around it.'],
  'STM-omiya-bonsai': ['Omiya Bonsai Village','STM','garden',35.9333,139.6333,4,['urban'],['solo','couple'],['garden','craft'],
    'Nurseries that relocated here after the 1923 earthquake and turned the area into the centre of the bonsai world. Several are open and the museum is excellent.'],
  'STM-nagatoro': ['Nagatoro','STM','river',36.0931,139.1108,4,['water'],['family','friends'],['river','koyo','hiking'],
    'Wooden boats run the rapids on the Arakawa, and the rock terraces along the bank are a protected geological site. An easy day from Tokyo.'],

  /* ===================== TOCHIGI ===================== */
  'TCG-nikko': ['Nikko','TCG','shrine',36.7580,139.5986,9,['mountain','forest'],['couple','family'],['unesco','shrine','temple','koyo','forest'],
    'Tokugawa Ieyasu’s mausoleum, carved and gilded to a degree that offends minimalist taste and overwhelms everyone else. Eight thousand sculptures, including three monkeys and a sleeping cat.'],
  'TCG-chuzenji': ['Lake Chuzenji & Kegon','TCG','lake',36.7333,139.4833,7,['water','mountain'],['couple','family'],['lake','falls','koyo','hiking'],
    'A lake formed when Mount Nantai dammed the valley, reached by a road of forty-eight hairpins. The Kegon falls drop ninety-seven metres out of it.'],
  'TCG-kinugawa': ['Kinugawa Onsen','TCG','onsen',36.8167,139.7000,5,['water','mountain'],['family','couple'],['onsen','river','koyo'],
    'A river gorge lined with large hotels, several of them abandoned, which gives the place an odd atmosphere. The rafting and the baths are good.'],
  'TCG-ashikaga': ['Ashikaga Flower Park','TCG','garden',36.3139,139.5219,6,['rural'],['couple','family'],['garden','sakura'],
    'A hundred and fifty year old wisteria whose canopy covers a thousand square metres, trained flat so you walk underneath it. Mid-April to mid-May, lit at night.'],
  'TCG-mashiko': ['Mashiko','TCG','town',36.4650,140.0944,5,['rural'],['solo','couple'],['pottery','craft'],
    'A pottery town that became important when Hamada Shoji settled here in 1924 and the folk craft movement grew up around him. Two hundred and fifty kilns and a pottery fair twice a year.'],
  'TCG-oya': ['Oya History Museum','TCG','museum',36.6028,139.8203,5,['rural'],['solo','friends'],['historic','modern'],
    'An underground stone quarry worked from 1919 to 1986, leaving a chamber of twenty thousand square metres with thirty metre ceilings. Kept at around eight degrees and used for concerts.'],

  /* ===================== GUNMA ===================== */
  'GNM-kusatsu': ['Kusatsu Onsen','GNM','onsen',36.6228,138.5964,8,['mountain'],['couple','family'],['onsen','snow','volcano'],
    'Thirty-two thousand litres of water a minute, more than any other resort in Japan, arriving at around fifty-five degrees. Women cool it by stirring with long wooden paddles in a performance that is also genuinely how it is done.'],
  'GNM-ikaho': ['Ikaho Onsen','GNM','onsen',36.4883,138.9089,5,['mountain'],['couple','solo'],['onsen','historic','koyo'],
    'Built around a stone staircase of three hundred and sixty-five steps with the inns stacked either side. Two springs, one brown with iron, one clear.'],
  'GNM-tomioka': ['Tomioka Silk Mill','GNM','museum',36.2553,138.8872,6,['urban'],['family','solo'],['unesco','historic','craft'],
    'Opened in 1872 with French engineers and machinery to industrialise silk, and it ran until 1987 with the original brick buildings intact. World Heritage, and the clearest single explanation of how Japan modernised.'],
  'GNM-minakami': ['Minakami','GNM','town',36.6808,138.9992,5,['mountain','water'],['friends','couple'],['onsen','ski','hiking','river'],
    'Rafting, canyoning and bungee in summer, skiing in winter, and eighteen hot spring areas scattered up the valley.'],
  'GNM-oze-gunma': ['Tanigawadake','GNM','mountain',36.8358,138.9297,5,['mountain'],['solo','friends'],['hiking','koyo','snow'],
    'A ropeway gets you most of the way up. The east face has killed more climbers than any other mountain on earth, which is a record of attempts rather than difficulty.'],
  'GNM-takaragawa': ['Takaragawa Onsen','GNM','onsen',36.8167,139.0500,5,['water','forest'],['couple'],['onsen','koyo','river'],
    'Four enormous riverside baths, three of them mixed, strung along a stream in the forest. Often called the best open-air bath in Japan and it has a reasonable claim.'],

  /* ===================== IBARAKI ===================== */
  'IBR-hitachi-seaside': ['Hitachi Seaside Park','IBR','garden',36.4017,140.5950,6,['water'],['couple','family'],['garden','coastal'],
    'Four and a half million baby blue eyes flowers turning an entire hill the same colour as the sky behind it, for about two weeks from late April. In autumn the same hill goes red with kochia.'],
  'IBR-ushiku': ['Ushiku Daibutsu','IBR','temple',35.9872,140.1753,5,['rural'],['family','solo'],['temple','modern'],
    'A hundred and twenty metres of bronze Buddha, which makes it the fourth tallest statue in the world. There is a lift to the chest and a viewing slot.'],
  'IBR-kairakuen': ['Kairakuen','IBR','garden',36.3728,140.4531,6,['urban'],['couple','solo'],['garden','sakura'],
    'One of the three great gardens of Japan, and the only one built to be opened to the public, in 1842. Three thousand plum trees flower from late February, a month before the cherries.'],
  'IBR-fukuroda': ['Fukuroda Falls','IBR','falls',36.7692,140.4383,4,['water','forest'],['family','couple'],['falls','koyo'],
    'A hundred and twenty metres down four tiers, wide enough that the volume is the impressive part. Freezes solid in a hard winter.'],

  /* ===================== NIIGATA ===================== */
  'NGT-sado': ['Sado Island','NGT','island',38.0333,138.3667,6,['island','water'],['solo','couple'],['island','historic','festival','coastal'],
    'An exile island for emperors and monks, then a gold mine that funded the shogunate, now World Heritage. Tub boats, a crested ibis breeding programme, and the Kodo drummers, who are based here.'],
  'NGT-echigo-yuzawa': ['Echigo-Yuzawa','NGT','onsen',36.9339,138.8097,6,['mountain'],['friends','couple'],['ski','snow','onsen','literary'],
    'Seventy-seven minutes from Tokyo by shinkansen into some of the deepest snow in the country. The opening line of Kawabata’s Snow Country describes arriving through the tunnel here.'],
  'NGT-niigata-city': ['Niigata','NGT','city',37.9161,139.0364,5,['urban','water'],['friends','family'],['food','coastal'],
    'Rice and sake. The station has a wall of ninety sake dispensers you work through with a token, which is either a good idea or a very bad one.'],
  'NGT-echigo-tsumari': ['Echigo-Tsumari','NGT','region',37.1500,138.7500,6,['rural','mountain'],['couple','solo'],['modern','rural','snow'],
    'Two hundred permanent artworks spread across seven hundred square kilometres of depopulating rice terraces, from a triennial that started in 2000. Some pieces are in abandoned schools and houses.'],
  'NGT-myoko': ['Myoko Kogen','NGT','town',36.8917,138.1917,5,['mountain'],['friends','couple'],['ski','snow','onsen'],
    'Deep snow, old-fashioned resorts and far fewer foreigners than Niseko or Hakuba. Sulphur springs at Akakura.'],

  /* ===================== TOYAMA ===================== */
  'TYM-tateyama': ['Tateyama Kurobe Alpine Route','TYM','mountain',36.5833,137.6167,8,['mountain'],['friends','couple'],['hiking','snow','koyo'],
    'A crossing of the Northern Alps by six different vehicles including a cable car and a trolleybus. From mid-April the road at Murodo runs between walls of snow up to twenty metres high.'],
  'TYM-gokayama': ['Gokayama','TYM','village',36.4269,136.9306,6,['mountain','rural'],['couple','solo'],['unesco','historic','snow'],
    'The quieter half of the thatched farmhouse World Heritage listing. Two hamlets, Ainokura and Suganuma, with a fraction of Shirakawa-go’s visitors.'],
  'TYM-toyama-city': ['Toyama','TYM','city',36.6959,137.2137,5,['urban','water'],['family','solo'],['food','modern','coastal'],
    'Firefly squid that glow blue in the bay in spring, white shrimp, and a glass art museum in a Kengo Kuma building that is worth the trip on its own.'],
  'TYM-kurobe': ['Kurobe Gorge','TYM','gorge',36.6000,137.5500,6,['water','forest'],['couple','family'],['koyo','river','onsen'],
    'An open-sided railway built to service a dam, running twenty kilometres up a gorge. Freezing in an open carriage is part of it, and the autumn colour is exceptional.'],
  'TYM-amaharashi': ['Amaharashi Coast','TYM','coast',36.8167,136.9833,4,['water'],['couple','solo'],['coastal'],
    'The Northern Alps rising three thousand metres straight out of the sea across the bay, which is a view that exists almost nowhere else. Clearest in winter.'],

  /* ===================== ISHIKAWA ===================== */
  'ISK-kanazawa': ['Kanazawa','ISK','city',36.5613,136.6562,9,['urban'],['couple','solo','family'],['historic','garden','craft','food','modern'],
    'Never bombed, so the geisha districts, the samurai quarter and the clay-walled lanes are original. Kenrokuen is one of the three great gardens and the contemporary art museum is one of the best buildings in Japan.'],
  'ISK-kenrokuen': ['Kenrokuen','ISK','garden',36.5620,136.6626,8,['urban'],['couple','family'],['garden','sakura','koyo','snow'],
    'Two centuries in the making and designed to satisfy six separate garden virtues at once, which is where the name comes from. In winter the pines are roped into cones to stop snow breaking them.'],
  'ISK-wajima': ['Wajima','ISK','town',37.3906,136.8992,5,['water'],['solo','couple'],['craft','coastal','market'],
    'Lacquerware made in up to a hundred and twenty separate steps, and a morning market that has run for a thousand years. The 2024 earthquake hit the town hard and recovery is ongoing.'],
  'ISK-noto': ['Noto Peninsula','ISK','coast',37.2000,136.9000,5,['water','rural'],['couple','solo'],['coastal','rural','craft'],
    'Rice terraces running down to the sea at Shiroyone, a beach you can drive a car along, and salt still made by hand from seawater.'],
  'ISK-yamanaka': ['Kaga Onsen','ISK','onsen',36.2833,136.3667,5,['mountain','water'],['couple'],['onsen','koyo','craft'],
    'Three old spa villages in one valley. Yamanaka has a gorge walk, Yamashiro has a reconstructed Edo bathhouse, and the lacquer and ceramics here are both serious.'],
  'ISK-shirayama': ['Mount Haku','ISK','mountain',36.1553,136.7714,4,['mountain'],['solo'],['hiking','pilgrimage'],
    'One of Japan’s three holy mountains with Fuji and Tateyama, climbed as a pilgrimage since 717. A hut near the summit means you can be up for sunrise.'],

  /* ===================== FUKUI ===================== */
  'FKI-eiheiji': ['Eiheiji','FKI','temple',36.0553,136.3553,7,['mountain','forest'],['solo','couple'],['temple','forest','pilgrimage'],
    'A working Soto Zen monastery founded in 1244 where around a hundred and fifty monks still train under the original rule. You can stay overnight and join the four thirty morning service.'],
  'FKI-tojinbo': ['Tojinbo','FKI','coast',36.2378,136.1247,6,['water'],['solo','couple'],['coastal','hiking'],
    'A kilometre of columnar basalt cliffs dropping twenty-five metres into the Sea of Japan. One of only three such formations in the world and, less happily, a well-known suicide spot with volunteer patrols.'],
  'FKI-dinosaur-museum': ['Fukui Dinosaur Museum','FKI','museum',36.0881,136.5064,5,['rural'],['family'],['modern','historic'],
    'Eighty per cent of Japan’s dinosaur fossils come from this valley, and the museum built on the back of that is genuinely world-class. A dome by Kisho Kurokawa with forty-four mounted skeletons.'],
  'FKI-kumagawa': ['Obama & Kumagawa-juku','FKI','town',35.4956,135.7467,4,['water','rural'],['solo','couple'],['historic','food','coastal'],
    'The port that supplied Nara and Kyoto with sea fish, up a road still called the Mackerel Highway. A preserved post town inland and good mackerel in the town.'],
  'FKI-echizen-washi': ['Echizen','FKI','town',35.9039,136.1686,4,['rural'],['solo'],['craft','pottery'],
    'Fifteen hundred years of papermaking, still done by hand for artists and for currency. One of the six ancient kiln sites of Japan is in the same valley.'],

  /* ===================== YAMANASHI ===================== */
  'YMN-fuji-five-lakes': ['Fuji Five Lakes','YMN','lake',35.5000,138.7500,9,['water','mountain'],['couple','family'],['lake','hiking','onsen','sakura'],
    'The northern base of Fuji, where the postcard reflections are taken. Kawaguchiko is the accessible one and Motosuko is on the back of the thousand yen note.'],
  'YMN-chureito': ['Chureito Pagoda','YMN','shrine',35.5003,138.8003,8,['mountain'],['couple','solo'],['shrine','sakura','koyo'],
    'Four hundred steps up to a five-storey pagoda with Fuji behind it and cherry trees in front. The single most photographed view in Japan, and the queue in April reflects that.'],
  'YMN-mount-fuji': ['Mount Fuji','YMN','volcano',35.3606,138.7274,10,['mountain','volcanic'],['solo','friends'],['unesco','hiking','volcano','pilgrimage'],
    'Three thousand seven hundred and seventy-six metres, last erupted in 1707, and climbable only from early July to early September. Around two hundred thousand people go up each year, most of them overnight for the sunrise.'],
  'YMN-koshu-wine': ['Katsunuma','YMN','town',35.6500,138.7333,5,['rural'],['couple','friends'],['food','rural'],
    'Japan’s wine country, working with Koshu, a pink-skinned grape grown here for centuries and almost nowhere else. Around thirty wineries within walking distance of the station.'],
  'YMN-shosenkyo': ['Shosenkyo Gorge','YMN','gorge',35.7333,138.5333,5,['water','forest'],['couple','family'],['koyo','hiking','gorge'],
    'A granite gorge with a path along the bottom and a thirty metre waterfall at the top. Reckoned one of the finest autumn colour spots near Tokyo.'],
  'YMN-minobu': ['Minobu','YMN','temple',35.3892,138.4306,4,['mountain','forest'],['solo'],['temple','pilgrimage','sakura'],
    'Head temple of the Nichiren sect since 1281, up two hundred and eighty-seven very steep steps. Two four-hundred-year-old weeping cherries in the grounds.'],

  /* ===================== NAGANO ===================== */
  'NGN-matsumoto': ['Matsumoto','NGN','castle',36.2381,137.9681,8,['urban','mountain'],['family','couple'],['castle','historic','modern'],
    'One of twelve original castle keeps left in Japan and the oldest of those, finished around 1594. Black-lacquered boards, a moon-viewing balcony added when nobody was fighting, and the Alps behind it.'],
  'NGN-kamikochi': ['Kamikochi','NGN','valley',36.2500,137.6333,9,['mountain','water','forest'],['solo','couple','friends'],['hiking','koyo','forest'],
    'A high valley in the Northern Alps closed to private cars, with a flat riverside walk and serious climbing routes off it. Closed by snow from mid-November to mid-April.'],
  'NGN-jigokudani': ['Jigokudani Monkey Park','NGN','forest',36.7325,138.4625,8,['mountain','forest'],['family','couple'],['wildlife','onsen','snow'],
    'Japanese macaques that learned to bathe in a hot spring in 1963 and have done it every winter since. A thirty minute walk in, and the monkeys ignore you entirely.'],
  'NGN-zenkoji': ['Zenkoji, Nagano','NGN','temple',36.6617,138.1875,7,['urban'],['solo','family'],['temple','pilgrimage','historic'],
    'Founded in the seventh century, before Buddhism in Japan split into sects, so it belongs to none of them and admits everyone. The hidden statue has not been shown since 654.'],
  'NGN-nakasendo': ['Tsumago & Magome','NGN','village',35.5767,137.5953,8,['mountain','rural'],['couple','solo'],['historic','hiking'],
    'Two post towns on the old Edo to Kyoto highway with an eight kilometre walking route between them over a pass. Tsumago banned cars and overhead wires in the 1970s, which is why it looks the way it does.'],
  'NGN-hakuba': ['Hakuba','NGN','town',36.6983,137.8619,7,['mountain'],['friends','couple'],['ski','snow','hiking','onsen'],
    'Ten linked ski areas under three thousand metre peaks, and the 1998 Olympic downhill. In summer it is the main trailhead for the Northern Alps.'],
  'NGN-karuizawa': ['Karuizawa','NGN','town',36.3484,138.5969,6,['mountain','forest'],['couple','family'],['modern','onsen','koyo'],
    'A Canadian missionary started summering here in 1886 and Tokyo society followed. Now an hour by shinkansen, with outlet malls, good cycling and a volcano behind.'],
  'NGN-norikura': ['Norikura & Shirahone','NGN','mountain',36.1061,137.5536,5,['mountain'],['solo','couple'],['hiking','onsen','koyo'],
    'A bus climbs to two thousand seven hundred metres, the highest road in Japan, which makes a three thousand metre peak a short walk. Milky white sulphur water at Shirahone below.'],
  'NGN-suwa': ['Lake Suwa','NGN','lake',36.0500,138.1000,5,['water'],['family','couple'],['lake','onsen','festival'],
    'In a hard winter the ice cracks and ridges upward in a line across the lake, which is recorded as a god crossing and has been logged since 1443. The log is now used as climate data.'],
  'NGN-obuse': ['Obuse','NGN','town',36.6956,138.3122,5,['rural'],['solo','couple'],['craft','food','historic'],
    'Hokusai spent his last years here and painted ceiling panels for a festival float. Chestnuts, a good sake brewery and a town small enough to walk in an afternoon.'],

  /* ===================== GIFU ===================== */
  'GIF-shirakawa-go': ['Shirakawa-go','GIF','village',36.2578,136.9064,9,['mountain','rural'],['couple','family'],['unesco','historic','snow'],
    'Steep thatched roofs pitched at sixty degrees to shed four metres of snow, some of them three hundred years old and four storeys inside. World Heritage, and crowded, so stay the night.'],
  'GIF-takayama': ['Takayama','GIF','town',36.1461,137.2522,8,['mountain','urban'],['couple','family'],['historic','food','festival','craft'],
    'A merchant quarter of dark wood buildings that was administered directly by the shogunate because of its timber. Twice-yearly festivals with mechanised floats, morning markets, and very good beef.'],
  'GIF-gero': ['Gero Onsen','GIF','onsen',35.8044,137.2447,6,['mountain','water'],['couple','family'],['onsen','koyo'],
    'Counted with Arima and Kusatsu as one of Japan’s three best hot springs since a seventeenth century scholar said so. Smooth alkaline water and a free footbath on the bridge.'],
  'GIF-gujo-hachiman': ['Gujo Hachiman','GIF','town',35.7486,136.9636,6,['water','mountain'],['family','couple'],['historic','festival','craft'],
    'Water runs through channels along every street and the town is obsessive about keeping it clean. The August dance festival runs for thirty-one nights, four of them until dawn.'],
  'GIF-gifu-city': ['Gifu & cormorant fishing','GIF','city',35.4233,136.7606,5,['urban','water'],['family','couple'],['historic','river','craft'],
    'Fishermen in straw skirts work twelve cormorants on leashes from a boat with a fire hanging off the bow, by imperial appointment, from May to October. It has been done this way for thirteen hundred years.'],
  'GIF-magome-gifu': ['Ena & Enakyo','GIF','gorge',35.4500,137.4167,4,['water'],['family'],['koyo','river'],
    'A gorge of oddly shaped granite along a reservoir, seen by boat. A straightforward stop between Nagoya and the Kiso valley.'],
  'GIF-hida-furukawa': ['Hida-Furukawa','GIF','town',36.2383,137.1864,5,['mountain'],['couple','solo'],['historic','craft','festival'],
    'Takayama without the crowds, twenty minutes up the line. White-walled storehouses along a carp canal, and the town the film Your Name used for its rural setting.'],

  /* ===================== SHIZUOKA ===================== */
  'SZK-izu': ['Izu Peninsula','SZK','coast',34.8000,138.9500,7,['water','mountain'],['couple','family'],['onsen','coastal','literary'],
    'Hot springs, a serrated coastline and the place Tokyo has been going to recover since the Meiji era. Shimoda is where Perry signed the treaty that opened Japan.'],
  'SZK-fuji-south': ['Fujinomiya & Shiraito','SZK','falls',35.2225,138.5939,6,['mountain','water'],['couple','family'],['falls','unesco','hiking'],
    'A curtain of water a hundred and fifty metres wide fed by Fuji snowmelt seeping out of a lava cliff, so the flow barely changes. The main Fuji shrine is in the town below.'],
  'SZK-atami': ['Atami','SZK','onsen',35.0953,139.0714,5,['water'],['couple','family'],['onsen','coastal'],
    'A seaside spa town that boomed, collapsed, and has been convincingly revived. Fireworks over the bay roughly fifteen times a year, including in winter.'],
  'SZK-shuzenji': ['Shuzenji','SZK','onsen',34.9667,138.9333,5,['mountain','water'],['couple','solo'],['onsen','historic','koyo'],
    'The oldest hot spring on Izu, founded by Kobo Daishi in 807 according to the story. A bamboo grove, a red bridge and a temple where a shogun was murdered.'],
  'SZK-kakegawa-tea': ['Makinohara tea fields','SZK','rural',34.7333,138.2167,5,['rural'],['couple','solo'],['food','rural'],
    'The largest tea plantation in Japan, rows running over the hills with Fuji behind on a clear day. Shizuoka grows about forty per cent of the country’s tea.'],
  'SZK-nihondaira': ['Nihondaira & Kunozan','SZK','mountain',34.9697,138.4639,5,['water','mountain'],['family','couple'],['coastal','shrine'],
    'A ropeway from a tea-covered plateau down to the shrine where Tokugawa Ieyasu was originally buried, on a cliff above the sea.'],
  'SZK-dogashima': ['Dogashima','SZK','coast',34.7756,138.7658,5,['water'],['couple','family'],['coastal'],
    'Tufa cliffs and sea caves on the west coast of Izu, with a sandbar that appears at low tide linking three islands. Sunsets here face Fuji across the bay.'],

  /* ===================== AICHI ===================== */
  'AIC-nagoya': ['Nagoya','AIC','city',35.1815,136.9066,7,['urban'],['family','friends'],['castle','food','modern'],
    'Japan’s fourth city and the one visitors skip. The food culture is distinctive and fiercely defended: miso katsu, hitsumabushi eel, and a breakfast custom where coffee comes with free toast.'],
  'AIC-inuyama': ['Inuyama','AIC','castle',35.3886,136.9394,6,['water','urban'],['family','couple'],['castle','historic','river'],
    'One of the twelve original keeps, possibly the oldest, on a bluff over the Kiso river. The Meiji Mura open-air museum nearby has sixty relocated Meiji buildings including Wright’s Imperial Hotel lobby.'],
  'AIC-tokoname': ['Tokoname','AIC','town',34.8864,136.8333,5,['water','urban'],['solo','couple'],['pottery','craft'],
    'One of the six ancient kilns, making unglazed red clay teapots since the twelfth century. A walking path through the old kiln district with walls built from stacked pipes and bottles.'],
  'AIC-korankei': ['Korankei','AIC','gorge',35.1569,137.3192,6,['water','forest'],['couple','family'],['koyo','river'],
    'Four thousand maples planted by a priest from 1634 onward, now the most celebrated autumn colour site in central Japan. Late November, lit at night, and extremely busy.'],
  'AIC-atsuta': ['Atsuta Shrine','AIC','shrine',35.1281,136.9078,5,['urban','forest'],['solo','family'],['shrine','historic','forest'],
    'Second only to Ise in Shinto, holding one of the three imperial regalia, a sword nobody has seen in centuries. A patch of old forest in the middle of Nagoya.'],
  'AIC-okazaki': ['Okazaki','AIC','castle',34.9545,137.1595,4,['urban','water'],['family'],['castle','historic','sakura'],
    'Where Tokugawa Ieyasu was born, with a reconstructed castle and eight hundred cherry trees along the river. The town also makes a third of Japan’s hatcho miso, in cedar barrels under stacked stones.'],

  /* ===================== KYOTO ===================== */
  'KYT-kiyomizu': ['Kiyomizu-dera','KYT','temple',34.9949,135.7850,9,['urban','mountain'],['couple','family'],['unesco','temple','sakura','koyo'],
    'A wooden stage thirteen metres above the hillside, built in 1633 without a single nail. The approach lanes of Ninenzaka and Sannenzaka are the best preserved in the city and the most crowded.'],
  'KYT-fushimi-inari': ['Fushimi Inari','KYT','shrine',34.9671,135.7727,9,['urban','mountain'],['solo','couple','family'],['shrine','hiking','historic'],
    'Around ten thousand vermilion gates in tunnels up a mountain, each one donated by a business. Most visitors turn back after twenty minutes, and the upper loop is nearly empty.'],
  'KYT-arashiyama': ['Arashiyama','KYT','district',35.0094,135.6667,9,['water','forest'],['couple','family'],['forest','temple','garden','koyo'],
    'The bamboo grove is a short and very busy path, so go at seven. Tenryuji’s garden behind it is from 1339 and unchanged, and the monkeys on the hill across the river are worth the climb.'],
  'KYT-kinkakuji': ['Kinkaku-ji','KYT','temple',35.0394,135.7292,9,['urban'],['family','couple'],['unesco','temple','garden'],
    'A retirement villa from 1397 covered in gold leaf, burned down by a novice monk in 1950 and rebuilt in 1955. Mishima wrote a novel about the arson that is better than the building.'],
  'KYT-gion': ['Gion','KYT','district',35.0036,135.7753,8,['urban'],['couple'],['historic','nightlife','food'],
    'The geisha quarter, where around two hundred and fifty geiko and maiko still work. Some private lanes are now closed to tourists with fines, after years of people chasing women down the street.'],
  'KYT-ginkakuji': ['Ginkaku-ji & Philosopher’s Path','KYT','temple',35.0270,135.7982,8,['urban','forest'],['couple','solo'],['unesco','temple','garden','sakura'],
    'Never silvered, despite the name, and better for it. A cone of raked sand and a moss garden, then a two kilometre canal walk south under cherry trees.'],
  'KYT-ryoanji': ['Ryoan-ji','KYT','temple',35.0345,135.7182,8,['urban'],['solo','couple'],['unesco','temple','garden'],
    'Fifteen rocks in white gravel, arranged so that one is always hidden from any viewing position. Nobody knows who made it or what it means, which has not stopped anyone writing about it.'],
  'KYT-nijo': ['Nijo Castle','KYT','castle',35.0142,135.7481,7,['urban'],['family','couple'],['unesco','castle','garden','historic'],
    'The shogun’s Kyoto residence, with floors deliberately built to squeak so nobody could approach unheard. The room where the shogunate was handed back to the emperor in 1867 is open.'],
  'KYT-nishiki': ['Nishiki Market','KYT','market',35.0050,135.7649,7,['urban'],['friends','solo'],['food','market'],
    'Four hundred metres of covered market, four hundred years old, selling pickles, tofu skin and knives. Eating while walking is now discouraged by signs in five languages.'],
  'KYT-sanjusangendo': ['Sanjusangen-do','KYT','temple',34.9879,135.7717,7,['urban'],['solo','family'],['temple','historic'],
    'A hall a hundred and twenty metres long containing one thousand and one gilded statues of Kannon, each with its own face, carved mostly in the thirteenth century. No photography, and the effect is overwhelming.'],
  'KYT-daitokuji': ['Daitoku-ji','KYT','temple',35.0434,135.7458,6,['urban'],['solo','couple'],['temple','garden'],
    'A walled complex of twenty-two sub-temples, four of them usually open, with some of the best dry gardens in Kyoto and almost nobody in them. The tea ceremony tradition is rooted here.'],
  'KYT-kurama': ['Kurama & Kibune','KYT','town',35.1167,135.7667,6,['mountain','forest'],['couple','solo'],['onsen','hiking','temple','koyo'],
    'A temple on a wooded mountain with a two hour walk over the top to a shrine in a river valley. In summer restaurants build platforms over the stream and serve lunch above the water.'],
  'KYT-uji': ['Uji','KYT','town',34.8844,135.7997,7,['water','urban'],['couple','solo'],['unesco','temple','food','literary'],
    'Byodoin’s Phoenix Hall, from 1053, is on the ten yen coin. The town is also the centre of Japanese green tea and the setting for the last chapters of the Tale of Genji.'],
  'KYT-miyama': ['Miyama','KYT','village',35.3167,135.6167,6,['rural','mountain'],['couple','solo'],['historic','rural','snow'],
    'Thatched farmhouses in a valley two hours north of the city, with about fifty roofs still in the old style. Almost nobody on the Kyoto tourist circuit gets here.'],
  'KYT-amanohashidate': ['Amanohashidate','KYT','coast',35.5711,135.1869,7,['water'],['couple','family'],['coastal','hiking'],
    'A three kilometre pine-covered sandbar across a bay, counted as one of the three great views of Japan. You are supposed to look at it upside down between your legs, and people do.'],
  'KYT-ine': ['Ine','KYT','village',35.6761,135.2878,6,['water'],['couple','solo'],['coastal','historic'],
    'Two hundred and thirty boathouses built with the ground floor open to the water so boats park inside. A working fishing village, reached by bus or boat from Amanohashidate.'],
  'KYT-kibune-kurama-2': ['Ohara','KYT','town',35.1189,135.8344,6,['rural','mountain'],['couple','solo'],['temple','garden','koyo'],
    'A farming valley an hour north of the city with two superb moss-garden temples, Sanzenin and Jakkoin. The best autumn colour in the Kyoto area without the Arashiyama crush.'],
  'KYT-kyoto-station': ['Central Kyoto','KYT','district',34.9858,135.7588,6,['urban'],['family','solo'],['modern','food','historic'],
    'The 1997 station building is a fifteen storey steel and glass canyon that half the city hated on principle. Nishi and Higashi Honganji are ten minutes north and are enormous.'],

  /* ===================== OSAKA ===================== */
  'OSK-dotonbori': ['Dotonbori','OSK','district',34.6687,135.5012,9,['urban'],['friends','family'],['food','nightlife','modern'],
    'A canal lined with signs the size of buildings, including a running man who has been there since 1935. Takoyaki, kushikatsu and a rule about never double-dipping the sauce.'],
  'OSK-osaka-castle': ['Osaka Castle','OSK','castle',34.6873,135.5259,7,['urban'],['family','couple'],['castle','historic','sakura'],
    'Hideyoshi’s castle, destroyed twice and rebuilt in concrete in 1931, which purists dislike. The stonework in the walls is original and some single blocks weigh over a hundred tonnes.'],
  'OSK-shinsekai': ['Shinsekai','OSK','district',34.6525,135.5061,6,['urban'],['friends','solo'],['food','nightlife','historic'],
    'Built in 1912 with a tower modelled on the Eiffel, then left behind for most of a century. Deep-fried everything on sticks, and it has kept an unpolished feel that the rest of the city has lost.'],
  'OSK-umeda': ['Umeda','OSK','district',34.7055,135.4983,6,['urban'],['friends','couple'],['modern','food','nightlife'],
    'The northern business district, with a floating garden observatory joining two towers at the thirty-ninth floor. Underneath is one of the largest underground mall networks in Japan.'],
  'OSK-sumiyoshi': ['Sumiyoshi Taisha','OSK','shrine',34.6125,135.4933,6,['urban'],['solo','family'],['shrine','historic'],
    'A shrine style that predates any Chinese influence, with straight roofs and no curve at all. The steep arched bridge in front is the thing people come for.'],
  'OSK-minoo': ['Minoo Park','OSK','falls',34.8556,135.4722,5,['forest','water'],['family','couple'],['hiking','koyo','falls'],
    'A three kilometre walk up a wooded valley from the station to a thirty-three metre waterfall. Deep-fried maple leaves are sold along the path, and they are better than they sound.'],
  'OSK-kaiyukan': ['Osaka Aquarium','OSK','museum',34.6545,135.4289,6,['urban','water'],['family'],['modern','wildlife'],
    'Built around a nine metre deep central tank holding whale sharks, with the route spiralling down around it. One of the best aquariums in the world.'],
  'OSK-expo-park': ['Expo ’70 Park','OSK','garden',34.8075,135.5319,5,['urban'],['family','solo'],['modern','garden','sakura'],
    'Taro Okamoto’s Tower of the Sun still stands where the 1970 World Expo left it, seventy metres of concrete with three faces. The park around it has five thousand cherry trees.'],

  /* ===================== HYOGO ===================== */
  'HYG-himeji': ['Himeji Castle','HYG','castle',34.8394,134.6939,9,['urban'],['family','couple'],['unesco','castle','historic','sakura'],
    'The finest surviving castle in Japan, never besieged, never burned, never bombed. Six storeys of white plaster over a maze of gates designed to disorient anyone attacking.'],
  'HYG-kobe': ['Kobe','HYG','city',34.6901,135.1955,7,['urban','water'],['couple','friends'],['food','modern','coastal'],
    'A port city squeezed between mountains and sea, rebuilt after the 1995 earthquake that killed over six thousand people. Beef, a Chinatown, and the best night view in western Japan from Mount Rokko.'],
  'HYG-kinosaki': ['Kinosaki Onsen','HYG','onsen',35.6253,134.8167,8,['water'],['couple'],['onsen','historic','food'],
    'Seven public bathhouses along a willow-lined canal, and the custom is to walk between them in a yukata and wooden sandals. Inns give you a key that opens all seven.'],
  'HYG-arima': ['Arima Onsen','HYG','onsen',34.7983,135.2481,6,['mountain'],['couple','family'],['onsen','historic'],
    'One of the three oldest hot springs in Japan, mentioned in eighth century records. Two waters: one rust brown with iron and salt, one clear and carbonated.'],
  'HYG-takeda': ['Takeda Castle','HYG','ruin',35.3003,134.8292,6,['mountain'],['solo','couple'],['castle','historic','hiking'],
    'Stone foundations on a ridge at three hundred and fifty metres. On autumn mornings fog fills the valley below and leaves the ruins standing above it, which is why it is called the castle in the sky.'],
  'HYG-awaji': ['Awaji Island','HYG','island',34.4167,134.8833,5,['island','water'],['family','couple'],['island','coastal','modern'],
    'The first island created in Japanese myth, now joined to Kobe by the longest suspension bridge in the world until 2022. Tadao Ando built several concrete temples and chapels here.'],
  'HYG-ikuno': ['Ikuno Silver Mine','HYG','museum',35.1667,134.8167,4,['mountain'],['family','solo'],['historic'],
    'Worked from 807 to 1973, with a kilometre of tunnel open and French mining engineers’ houses in the town below.'],
  'HYG-sasayama': ['Tamba Sasayama','HYG','town',35.0756,135.2178,4,['rural'],['couple','solo'],['historic','pottery','food'],
    'A castle town with a preserved merchant street, black soybeans that sell for extraordinary prices, and one of the six ancient kilns nearby at Tachikui.'],

  /* ===================== NARA ===================== */
  'NAR-todaiji': ['Todai-ji','NAR','temple',34.6889,135.8397,9,['urban'],['family','couple'],['unesco','temple','historic'],
    'The Great Buddha Hall, even rebuilt at two thirds of its original width, is still among the largest wooden buildings on earth. The bronze Buddha inside used most of the copper in the country in 752.'],
  'NAR-nara-park': ['Nara Park','NAR','garden',34.6851,135.8430,8,['urban','forest'],['family','couple'],['garden','shrine','wildlife'],
    'Twelve hundred sika deer treated as divine messengers since the eighth century, and some of them bow for crackers. They also bite, and the signs saying so are accurate.'],
  'NAR-horyuji': ['Horyu-ji','NAR','temple',34.6147,135.7347,8,['rural'],['solo','couple'],['unesco','temple','historic'],
    'The oldest wooden buildings in the world, standing since around 700. The entasis on the pillars is a direct inheritance from Greek architecture that travelled the Silk Road.'],
  'NAR-kasuga': ['Kasuga Taisha','NAR','shrine',34.6815,135.8484,7,['forest','urban'],['couple','solo'],['shrine','forest','historic'],
    'Three thousand lanterns, stone along the approach and bronze under the eaves, lit twice a year in February and August. The forest behind has been protected from logging since 841.'],
  'NAR-yoshino': ['Yoshino','NAR','mountain',34.3667,135.8583,7,['mountain','forest'],['couple','solo'],['sakura','unesco','pilgrimage','hiking'],
    'Thirty thousand cherry trees planted up a mountainside in four bands that bloom in sequence over two weeks in April. A pilgrimage centre for twelve hundred years, so the trees are offerings.'],
  'NAR-asuka': ['Asuka','NAR','ruin',34.4697,135.8203,5,['rural'],['solo','couple'],['historic','rural'],
    'Japan’s capital in the sixth and seventh centuries, now rice fields with burial mounds and inexplicable carved granite boulders in them. Best seen by rented bicycle.'],
  'NAR-omiwa': ['Omiwa Shrine','NAR','shrine',34.5289,135.8528,5,['mountain','forest'],['solo'],['shrine','historic','hiking'],
    'Possibly the oldest shrine in Japan, with no building housing a deity because the mountain behind is the deity. You can climb it, but photography and eating are forbidden on the way.'],

  /* ===================== SHIGA ===================== */
  'SHG-hikone': ['Hikone','SHG','castle',35.2764,136.2519,6,['water','urban'],['family','couple'],['castle','historic','garden'],
    'One of the twelve original keeps, small and beautifully proportioned, with a garden below and Lake Biwa behind. The town mascot is a cat in a samurai helmet and it is taken seriously.'],
  'SHG-enryakuji': ['Enryaku-ji','SHG','temple',35.0703,135.8406,7,['mountain','forest'],['solo'],['unesco','temple','forest','pilgrimage'],
    'Founded 788 on Mount Hiei, and almost every major school of Japanese Buddhism was founded by someone who trained here. Nobunaga burned it and killed everyone in 1571; it was rebuilt.'],
  'SHG-biwa': ['Lake Biwa','SHG','lake',35.2500,136.1000,6,['water'],['family','couple'],['lake','coastal'],
    'The largest lake in Japan and one of the oldest in the world at around four million years, with sixty species found nowhere else. Cycling the full circuit is about two hundred kilometres.'],
  'SHG-shirahige': ['Shirahige Shrine','SHG','shrine',35.2767,136.0239,5,['water'],['couple','solo'],['shrine','lake'],
    'A vermilion gate standing in Lake Biwa, best at sunrise. The road between the shrine and the gate is busy, and people have been killed crossing it for photographs.'],
  'SHG-miho': ['Miho Museum','SHG','museum',34.9167,136.0167,6,['mountain','forest'],['couple','solo'],['modern','forest'],
    'I M Pei buried eighty per cent of the building in a mountainside and you reach it through a tunnel and over a suspension bridge. The approach is the exhibit as much as the antiquities are.'],

  /* ===================== WAKAYAMA ===================== */
  'WKY-koyasan': ['Koyasan','WKY','temple',34.2131,135.5844,9,['mountain','forest'],['solo','couple'],['unesco','temple','pilgrimage','forest'],
    'A monastery town founded in 816 on a mountain plateau, where around fifty temples take overnight guests. Okunoin, the cemetery, has two hundred thousand graves under thousand-year-old cedars.'],
  'WKY-kumano-kodo': ['Kumano Kodo','WKY','region',33.8403,135.7739,8,['mountain','forest'],['solo','couple'],['unesco','pilgrimage','hiking','onsen'],
    'Pilgrimage routes walked for a thousand years, and one of only two pilgrimage trails with World Heritage status, the other being Santiago. The Nakahechi route takes four to five days.'],
  'WKY-nachi': ['Nachi Falls','WKY','falls',33.6697,135.8900,7,['forest','mountain'],['couple','solo'],['falls','shrine','unesco'],
    'A hundred and thirty-three metres in a single drop, the tallest in Japan, with a three-storey pagoda positioned in front of it. The waterfall itself is the object of worship.'],
  'WKY-shirahama': ['Shirahama','WKY','onsen',33.6794,135.3464,5,['water'],['family','couple'],['onsen','coastal'],
    'White sand shipped in from Australia, hot springs used since the seventh century, and a cliff-edge rotenburo where the waves break below you.'],
  'WKY-yunomine': ['Yunomine Onsen','WKY','onsen',33.8386,135.7736,6,['mountain','water'],['solo','couple'],['onsen','unesco','pilgrimage'],
    'The oldest hot spring in Japan by some accounts, and the only bath with World Heritage status, because pilgrims purified in it. Tsuboyu is a wooden hut over the stream that two people book by the half hour.'],
  'WKY-koyasan-okunoin': ['Okunoin','WKY','temple',34.2186,135.6064,7,['forest','mountain'],['solo'],['temple','forest','pilgrimage'],
    'Two kilometres of path through cedar and gravestones to the mausoleum of Kobo Daishi, who is held not to have died but to be meditating. Monks still bring him meals twice a day.'],

  /* ===================== MIE ===================== */
  'MIE-ise': ['Ise Jingu','MIE','shrine',34.4550,136.7256,8,['forest','water'],['solo','family'],['shrine','forest','historic','pilgrimage'],
    'The most important shrine in Shinto, rebuilt on an adjacent site every twenty years since 690, most recently in 2013. Plain cypress, no paint, no nails, and photography stops at the steps.'],
  'MIE-toba': ['Toba & Mikimoto','MIE','coast',34.4811,136.8436,5,['water','island'],['family','couple'],['coastal','craft'],
    'Where cultured pearls were invented in 1893. Ama divers, mostly women, still free-dive for shellfish here and demonstrate it at Mikimoto Pearl Island.'],
  'MIE-meoto-iwa': ['Meoto Iwa','MIE','coast',34.5125,136.7869,5,['water'],['couple'],['shrine','coastal'],
    'Two rocks joined by a heavy rice-straw rope, replaced three times a year in a ceremony. Between May and July the sun rises directly between them.'],
  'MIE-iga': ['Iga-Ueno','MIE','castle',34.7681,136.1314,5,['urban'],['family','friends'],['castle','historic'],
    'One of the two historic ninja schools, with a museum in a farmhouse full of trapdoors and reversible walls. Also the birthplace of Basho.'],
  'MIE-nabana': ['Nabana no Sato','MIE','garden',35.0631,136.6758,5,['rural'],['family','couple'],['garden','modern'],
    'A flower park whose winter illumination runs from October to May with several million lights, including a two hundred metre tunnel. Unapologetically over the top.'],

  /* ===================== HIROSHIMA ===================== */
  'HRS-hiroshima': ['Hiroshima','HRS','city',34.3853,132.4553,9,['urban','water'],['solo','couple','family'],['unesco','wwii','food','modern'],
    'The Peace Memorial Museum is a difficult and necessary two hours. The city around it is relaxed, green and full of okonomiyaki cooked with noodles in it, which is the local version and not negotiable.'],
  'HRS-miyajima': ['Miyajima','HRS','island',34.2961,132.3197,9,['island','water','forest'],['couple','family'],['unesco','shrine','island','koyo','hiking'],
    'The shrine gate stands in the sea at high tide and you can walk out to it at low. The island itself was so sacred that for centuries nobody was allowed to be born or die on it.'],
  'HRS-onomichi': ['Onomichi','HRS','town',34.4089,133.2050,7,['water'],['solo','couple'],['coastal','temple','literary','historic'],
    'A hillside town of lanes, stairs and twenty-five temples above a narrow strait. Ozu filmed Tokyo Story here, and it is the mainland end of the Shimanami Kaido.'],
  'HRS-shimanami': ['Shimanami Kaido','HRS','island',34.2500,133.1667,8,['island','water'],['friends','couple'],['island','coastal','hiking'],
    'Seventy kilometres of cycle route across six islands on dedicated lanes beside the bridges. Probably the best cycling in Japan and bikes can be hired and dropped at either end.'],
  'HRS-tomonoura': ['Tomonoura','HRS','town',34.3828,133.3817,6,['water'],['couple','solo'],['coastal','historic'],
    'A tidal port where ships waited for the current to turn, with the stone lighthouse and warehouses intact. Miyazaki stayed here and it became Ponyo.'],
  'HRS-sandankyo': ['Sandankyo','HRS','gorge',34.6167,132.1333,5,['water','forest'],['solo','couple'],['hiking','koyo','gorge'],
    'A sixteen kilometre gorge with a path along it, two sections crossed by hand-pulled ferry. Superb in late autumn and almost unvisited.'],
  'HRS-takehara': ['Takehara','HRS','town',34.3419,132.9072,5,['water'],['couple','solo'],['historic','island'],
    'Salt and sake money built a merchant quarter that survives whole. The rabbit island of Okunoshima is a short ferry away, and its former poison gas factory is the other half of the story.'],

  /* ===================== OKAYAMA ===================== */
  'OKY-korakuen': ['Korakuen','OKY','garden',34.6667,133.9356,7,['urban','water'],['couple','family'],['garden','sakura','koyo'],
    'The third of the three great gardens, from 1700, and the most open of them, with lawns and a tea plantation. The black castle across the river is deliberately framed by it.'],
  'OKY-kurashiki': ['Kurashiki','OKY','town',34.5850,133.7719,8,['urban','water'],['couple','family'],['historic','modern','craft'],
    'A canal quarter of white-walled rice warehouses, and the Ohara Museum, which in 1930 became the first museum of Western art in Japan. It has a Greco, a Monet and a Gauguin.'],
  'OKY-naoshima': ['Naoshima','OKY','island',34.4583,133.9950,9,['island','water'],['couple','solo'],['island','modern','coastal'],
    'An island of Tadao Ando museums, a Yayoi Kusama pumpkin on a pier, and a bathhouse you can actually use that is itself an artwork. Book accommodation months ahead.'],
  'OKY-teshima': ['Teshima & Inujima','OKY','island',34.4833,134.1000,7,['island','water'],['couple','solo'],['island','modern'],
    'Teshima Art Museum is a concrete shell with two openings in which water seeps from the floor and moves. One work, no objects, and it is the best thing in the Inland Sea.'],
  'OKY-bitchu-takahashi': ['Bitchu Matsuyama','OKY','castle',34.8094,133.6219,5,['mountain'],['solo','couple'],['castle','historic','hiking'],
    'The highest original castle keep in Japan at four hundred and thirty metres, and the only mountain castle among the surviving twelve. Also appears above a sea of cloud in autumn.'],

  /* ===================== SHIMANE ===================== */
  'SMN-izumo': ['Izumo Taisha','SMN','shrine',35.4019,132.6856,8,['water','rural'],['solo','couple'],['shrine','historic','pilgrimage'],
    'The oldest shrine in Japan by its own account, where all eight million gods are said to gather each October. The straw rope over the hall weighs five and a half tonnes, and you clap four times here instead of two.'],
  'SMN-matsue': ['Matsue','SMN','castle',35.4751,133.0505,6,['water','urban'],['couple','solo'],['castle','historic','literary','lake'],
    'One of the twelve original keeps, and Lafcadio Hearn’s house, where he wrote the books that introduced Japan to the English-reading world in the 1890s.'],
  'SMN-iwami-ginzan': ['Iwami Ginzan','SMN','ruin',35.1181,132.4342,6,['mountain','forest'],['solo','couple'],['unesco','historic','hiking'],
    'A silver mine that at its peak produced a third of the world’s silver. World Heritage partly because it was worked without clear-felling the forest, which was unusual anywhere.'],
  'SMN-adachi': ['Adachi Museum','SMN','garden',35.4344,133.2069,7,['rural'],['couple','solo'],['garden','modern'],
    'Ranked the best garden in Japan every year since 2003 by an American journal, and it is viewed only through windows, framed like paintings. You cannot walk in it, which is the point and also frustrating.'],
  'SMN-oki': ['Oki Islands','SMN','island',36.1000,133.1000,5,['island','water'],['solo'],['island','coastal','hiking'],
    'Four inhabited islands and a UNESCO Global Geopark, with two hundred metre sea cliffs and a sumo tradition. Exile islands for two emperors.'],
  'SMN-tsuwano': ['Tsuwano','SMN','town',34.4669,131.7681,5,['rural','mountain'],['couple','solo'],['historic','shrine'],
    'A castle town in a narrow valley with carp in the street gutters, and a thousand red gates climbing the hill to Taikodani Inari. Often called a little Kyoto, and here the label almost fits.'],

  /* ===================== TOTTORI ===================== */
  'TTR-sand-dunes': ['Tottori Sand Dunes','TTR','dunes',35.5392,134.2244,7,['water'],['family','friends'],['coastal'],
    'Sixteen kilometres of dunes up to fifty metres high, formed by sand carried down from the mountains and thrown back by the sea. Camel rides, paragliding, and a sand sculpture museum next door.'],
  'TTR-daisen': ['Mount Daisen','TTR','mountain',35.3714,133.5461,6,['mountain','forest'],['solo','friends'],['hiking','ski','koyo','temple'],
    'A seventeen hundred metre volcano that looks like Fuji from the west and like a shattered ridge from the north. Japan’s largest beech forest on its flanks.'],
  'TTR-mizuki-shigeru': ['Sakaiminato','TTR','town',35.5456,133.2297,5,['water'],['family'],['coastal','food'],
    'The hometown of the manga artist who drew Japan’s yokai spirits, with a hundred and seventy-seven bronze monsters along the main street. Also the biggest crab port in Japan.'],
  'TTR-misasa': ['Misasa Onsen & Nageiredo','TTR','onsen',35.4089,133.8744,5,['mountain','water'],['solo','couple'],['onsen','temple','hiking'],
    'A radon hot spring, and above it a temple hall wedged into a cliff face that is a national treasure. You climb to it using tree roots and chains, and they will refuse you if your shoes are wrong.'],

  /* ===================== YAMAGUCHI ===================== */
  'YMG-motonosumi': ['Motonosumi Inari','YMG','shrine',34.3778,131.0658,7,['water'],['couple','solo'],['shrine','coastal'],
    'A hundred and twenty-three red gates running down a headland to a cliff above the sea. The donation box is set six metres up on the top gate and you are meant to throw your coin into it.'],
  'YMG-kintaikyo': ['Kintaikyo, Iwakuni','YMG','town',34.1672,132.1767,6,['water','urban'],['family','couple'],['historic','sakura','river'],
    'A five-arch wooden bridge first built in 1673, rebuilt without nails using the original joinery each time it washes away. The castle on the hill above is reached by ropeway.'],
  'YMG-akiyoshido': ['Akiyoshido','YMG','ruin',34.2283,131.3042,5,['mountain'],['family','solo'],['hiking'],
    'The largest limestone cave in Japan, a kilometre of it open, under a plateau of karst pinnacles that is burned off every February to keep it grassland.'],
  'YMG-hagi': ['Hagi','YMG','town',34.4081,131.3992,6,['water','urban'],['solo','couple'],['historic','pottery','unesco'],
    'The samurai quarter is intact, and so is the school where the men who overthrew the shogunate were taught. Hagi ware is deliberately imperfect and changes colour with use.'],
  'YMG-shimonoseki': ['Shimonoseki','YMG','city',33.9578,130.9414,5,['water','urban'],['friends','family'],['food','coastal','historic'],
    'Where Honshu nearly touches Kyushu, and where eighty per cent of Japan’s pufferfish is traded. A 1185 sea battle that ended a dynasty was fought in the strait.'],

  /* ===================== KAGAWA ===================== */
  'KGW-ritsurin': ['Ritsurin Garden','KGW','garden',34.3297,134.0439,7,['urban'],['couple','family'],['garden','koyo'],
    'A hundred years in the making, with six ponds, thirteen hills and a borrowed mountain behind. Arguably better than any of the official three great gardens and it is not on that list.'],
  'KGW-kotohira': ['Kotohira-gu','KGW','shrine',34.1850,133.8097,6,['mountain'],['family','solo'],['shrine','pilgrimage','hiking'],
    'Seven hundred and eighty-five steps to the main shrine and another five hundred and eighty-three to the inner one. Sailors have come here for safe passage for centuries.'],
  'KGW-shodoshima': ['Shodoshima','KGW','island',34.4833,134.2500,6,['island','water'],['couple','family'],['island','coastal','food'],
    'Olives, soy sauce brewed in cedar barrels, a gorge with a ropeway, and a sandbar to a smaller island that appears twice a day.'],
  'KGW-takamatsu': ['Takamatsu','KGW','city',34.3401,134.0434,5,['urban','water'],['friends','family'],['food','coastal','island'],
    'Sanuki udon, eaten standing up in places that are sometimes attached to someone’s house. The ferry hub for Naoshima and the Inland Sea islands.'],
  'KGW-naoshima-kagawa': ['Teshima from Takamatsu','KGW','island',34.4994,134.0486,4,['island','water'],['couple'],['island','modern'],
    'Megijima and Ogijima, two small islands twenty minutes out, with art installations and almost no visitors outside the triennial.'],

  /* ===================== TOKUSHIMA ===================== */
  'TKS-iya': ['Iya Valley','TKS','valley',33.8667,133.8167,7,['mountain','water','forest'],['solo','couple'],['hiking','onsen','historic','gorge'],
    'A gorge so remote that defeated Heike warriors hid here in the twelfth century. Bridges woven from mountain vine, rebuilt every three years, and a cable car down to a riverside bath.'],
  'TKS-naruto': ['Naruto Whirlpools','TKS','coast',34.2447,134.6428,6,['water'],['family','couple'],['coastal'],
    'Tidal whirlpools up to twenty metres across in the strait, at their best around the spring and autumn equinoxes. Seen from a boat or from a walkway under the bridge with glass floor panels.'],
  'TKS-awa-odori': ['Tokushima','TKS','city',34.0703,134.5547,5,['urban','water'],['friends','family'],['festival','food'],
    'The Awa Odori in August is the largest dance festival in Japan, with a hundred thousand dancers and a song about how fools dance and fools watch, so you may as well dance.'],
  'TKS-kamikatsu': ['Kamikatsu','TKS','village',33.8833,134.3500,4,['mountain','rural'],['solo'],['rural','modern'],
    'A village that sorts its waste into forty-five categories and sends almost nothing to landfill. There is a brewery and a zero-waste centre, and it is a genuinely interesting hour.'],

  /* ===================== EHIME ===================== */
  'EHM-dogo': ['Dogo Onsen','EHM','onsen',33.8521,132.7861,8,['urban'],['couple','family'],['onsen','historic','literary'],
    'Three thousand years of bathing by tradition, and the 1894 wooden bathhouse has a room reserved for the imperial family. Soseki wrote about it, and Ghibli borrowed its look for Spirited Away.'],
  'EHM-matsuyama': ['Matsuyama','EHM','castle',33.8456,132.7656,6,['urban'],['family','couple'],['castle','historic','literary'],
    'One of the twelve original keeps, on a hill in the middle of the city with a chairlift up. Strong haiku tradition, and the castle complex is among the most complete.'],
  'EHM-uchiko': ['Uchiko','EHM','town',33.5356,132.6508,5,['rural'],['solo','couple'],['historic','craft'],
    'Wax from sumac trees made this town rich in the nineteenth century, and the merchant houses and a 1916 kabuki theatre survive.'],
  'EHM-shimanami-ehime': ['Imabari & Kurushima','EHM','coast',34.0661,132.9978,5,['water','island'],['friends','couple'],['coastal','island'],
    'The Shikoku end of the Shimanami Kaido, under the world’s first triple suspension bridge. Imabari makes most of Japan’s towels.'],
  'EHM-ozu': ['Ozu','EHM','castle',33.5061,132.5450,4,['water','rural'],['couple','solo'],['castle','historic','river'],
    'A castle rebuilt in wood in 2004 using the original techniques and drawings, which almost no reconstruction does. Cormorant fishing on the river in summer.'],

  /* ===================== KOCHI ===================== */
  'KCH-kochi-castle': ['Kochi','KCH','castle',33.5606,133.5311,6,['urban','water'],['family','friends'],['castle','food','market'],
    'The only original castle where both the keep and the lord’s residence survive together. A Sunday street market that has run for three hundred years, and seared bonito over straw.'],
  'KCH-shimanto': ['Shimanto River','KCH','river',33.2167,132.9333,6,['water','rural'],['couple','solo'],['river','hiking'],
    'Called the last clear stream in Japan because it has no dam on the main channel. Forty-seven low bridges without railings, built to let floods pass over them.'],
  'KCH-katsurahama': ['Katsurahama','KCH','beach',33.4975,133.5728,5,['water'],['family','couple'],['coastal'],
    'A crescent of sand with a statue of Sakamoto Ryoma looking out to sea, and a dog-fighting arena that is now mostly a historical curiosity. Swimming is prohibited; the current is severe.'],
  'KCH-muroto': ['Cape Muroto','KCH','coast',33.2444,134.1750,4,['water'],['solo'],['coastal','pilgrimage'],
    'A geopark of uplifted seabed where Kobo Daishi is said to have attained enlightenment in a cave. Temples twenty-four to twenty-six of the Shikoku pilgrimage are here.'],

  /* ===================== FUKUOKA ===================== */
  'FKO-fukuoka-city': ['Fukuoka','FKO','city',33.5904,130.4017,8,['urban','water'],['friends','family','solo'],['food','nightlife','modern','coastal'],
    'Tonkotsu ramen was invented here and the yatai street stalls still set up along the river every evening. The most liveable large city in Japan by most domestic rankings.'],
  'FKO-dazaifu': ['Dazaifu','FKO','shrine',33.5214,130.5353,7,['urban','forest'],['family','solo'],['shrine','temple','historic'],
    'The shrine to the god of learning, so it fills with students before exams. Six thousand plum trees, and the Kyushu National Museum behind it is excellent.'],
  'FKO-yanagawa': ['Yanagawa','FKO','town',33.1631,130.4061,5,['water'],['couple','family'],['river','food','historic'],
    'A canal town navigated in flat punts poled by a boatman who sings. Steamed eel on rice is the dish and it is worth the trip.'],
  'FKO-kokura': ['Kitakyushu','FKO','castle',33.8833,130.8833,4,['urban','water'],['family'],['castle','modern'],
    'A reconstructed castle, a retro shopping arcade, and the Mojiko port district of brick Meiji buildings at the Kyushu end of the tunnel.'],
  'FKO-munakata': ['Okinoshima & Munakata','FKO','shrine',33.8411,130.5133,5,['water','island'],['solo'],['unesco','shrine','island'],
    'The island itself is World Heritage and closed to everyone but priests, with eighty thousand ritual objects left on it over five centuries. The mainland shrines tell the story.'],
  'FKO-itoshima': ['Itoshima','FKO','coast',33.5833,130.1833,5,['water'],['couple','friends'],['coastal','food'],
    'A peninsula of surf beaches, cafes and a white gate standing on the shore, half an hour from the city. Where Fukuoka spends Sunday.'],

  /* ===================== SAGA ===================== */
  'SAG-arita': ['Arita','SAG','town',33.2069,129.8650,6,['rural'],['solo','couple'],['pottery','craft','historic'],
    'Japanese porcelain started here in 1616 when kaolin was found nearby. Shipped to Europe through Imari, so collectors call it Imari ware, and a street of kilns still fires.'],
  'SAG-yoshinogari': ['Yoshinogari','SAG','ruin',33.3250,130.3833,5,['rural'],['family','solo'],['historic'],
    'A moated Yayoi settlement from around 300 BC, reconstructed over forty hectares with watchtowers and pit dwellings. Possibly the Yamatai of the Chinese chronicles, though that is argued about.'],
  'SAG-ureshino': ['Ureshino Onsen','SAG','onsen',33.1017,129.9881,5,['rural'],['couple'],['onsen','food'],
    'Silky bicarbonate water that is genuinely different to the touch, and a green tea grown locally that is steamed and rolled into pellets.'],
  'SAG-karatsu': ['Karatsu','SAG','castle',33.4500,129.9683,5,['water'],['family','couple'],['castle','coastal','pottery','festival'],
    'A castle on a spit with pine forest running five kilometres along the bay behind it. The November festival hauls fourteen enormous lacquered floats through the streets.'],

  /* ===================== NAGASAKI ===================== */
  'NGS-nagasaki-city': ['Nagasaki','NGS','city',32.7503,129.8779,8,['urban','water'],['solo','couple'],['wwii','historic','food','coastal'],
    'For two hundred years the only port where foreigners could trade, which left Chinese temples, a Dutch trading post and Japan’s oldest church. The Atomic Bomb Museum is quieter than Hiroshima’s and no less serious.'],
  'NGS-gunkanjima': ['Gunkanjima','NGS','island',32.6278,129.7386,7,['island','water'],['solo','friends'],['unesco','historic','island'],
    'A coal island that held five thousand people on six hectares, the densest population ever recorded, then emptied completely in 1974. Landing tours run when the sea allows.'],
  'NGS-goto': ['Goto Islands','NGS','island',32.6950,128.8417,6,['island','water'],['solo','couple'],['island','coastal','unesco'],
    'Where hidden Christians survived two hundred and fifty years of persecution without priests. Churches on remote headlands, several of them World Heritage, and very good beaches.'],
  'NGS-unzen': ['Unzen','NGS','onsen',32.7333,130.2667,6,['mountain','volcanic'],['couple','family'],['onsen','volcano','hiking'],
    'Steaming vents in the middle of the town, called the hells, where Christians were executed in the 1600s. The 1991 eruption killed forty-three people including three volcanologists.'],
  'NGS-hirado': ['Hirado','NGS','town',33.3667,129.5500,5,['water','island'],['solo','couple'],['historic','coastal','island'],
    'The first English and Dutch trading posts in Japan, before Nagasaki took over. A castle, a church, and a view of both from the same spot.'],
  'NGS-sasebo': ['Kujukushima','NGS','island',33.1667,129.6500,5,['water','island'],['family','couple'],['coastal','island'],
    'Two hundred and eight islands in a bay despite the name meaning ninety-nine. Seen by boat or from a viewpoint, and the oyster farming is extensive.'],
  'NGS-shimabara': ['Shimabara','NGS','castle',32.7872,130.3681,4,['water','urban'],['solo','family'],['castle','historic','coastal'],
    'Carp swimming in the street channels, a samurai lane, and a castle attached to a 1637 Christian peasant rebellion that was put down with enormous brutality.'],

  /* ===================== KUMAMOTO ===================== */
  'KMM-aso': ['Mount Aso','KMM','volcano',32.8847,131.1039,8,['mountain','volcanic'],['solo','couple'],['volcano','hiking','onsen'],
    'One of the largest calderas in the world at twenty-five kilometres across, with fifty thousand people living inside it. The active crater can be approached when the gas readings allow, and often they do not.'],
  'KMM-kumamoto-castle': ['Kumamoto Castle','KMM','castle',32.8061,130.7056,7,['urban'],['family','couple'],['castle','historic'],
    'Built in 1607 with curving stone walls designed to be unclimbable, and they worked. Badly damaged in the 2016 earthquakes and the repair is a decades-long project you can watch in progress.'],
  'KMM-kurokawa': ['Kurokawa Onsen','KMM','onsen',33.0828,131.1458,7,['mountain','forest'],['couple'],['onsen','koyo','forest'],
    'Two dozen inns in a wooded valley that agreed in the 1980s to tear down neon, bury cables and plant trees. A wooden pass lets you use any three outdoor baths.'],
  'KMM-amakusa': ['Amakusa','KMM','island',32.4500,130.1833,5,['island','water'],['family','couple'],['island','coastal','wildlife'],
    'A hundred and twenty islands with a resident population of wild dolphins seen on almost every boat trip. Also a centre of the hidden Christian story.'],
  'KMM-takachiho-no-yu': ['Nabegataki Falls','KMM','falls',33.0531,131.0208,5,['water','forest'],['couple','solo'],['falls','hiking'],
    'A ten metre curtain of water you can walk behind, because the softer rock underneath eroded first. Lit in spring, and much smaller than photographs suggest.'],

  /* ===================== OITA ===================== */
  'OIT-beppu': ['Beppu','OIT','onsen',33.2794,131.5006,8,['water','mountain'],['family','friends'],['onsen','volcano','coastal'],
    'More hot spring water than anywhere in Japan except Yellowstone globally, with steam coming out of drains and hillsides all over town. The seven hells are for looking at, not bathing in, and some are genuinely strange colours.'],
  'OIT-yufuin': ['Yufuin','OIT','onsen',33.2644,131.3617,7,['mountain'],['couple','family'],['onsen','koyo','craft'],
    'A more refined alternative twenty minutes from Beppu, with a lake that steams at dawn and a twin-peaked mountain behind. The main street is a long run of boutiques and it can feel like a theme park at peak times.'],
  'OIT-usuki': ['Usuki Stone Buddhas','OIT','ruin',33.1256,131.8047,5,['rural','forest'],['solo','couple'],['historic','temple'],
    'Sixty Buddhas carved into cliff faces between the twelfth and fourteenth centuries, national treasures and almost always empty of visitors.'],
  'OIT-kunisaki': ['Kunisaki Peninsula','OIT','region',33.5667,131.5833,5,['mountain','water'],['solo'],['temple','hiking','historic'],
    'A peninsula of mountain temples where Shinto and Buddhism blended into a local tradition that survived the Meiji separation. Good walking between them.'],
  'OIT-taketa': ['Taketa & Nagayu','OIT','town',32.9711,131.3986,4,['mountain','water'],['solo','couple'],['onsen','historic'],
    'A castle town in a bowl of hills with tunnels cut through rock for streets. Nagayu nearby has some of the most carbonated water in Japan and you come out covered in bubbles.'],

  /* ===================== MIYAZAKI ===================== */
  'MYZ-takachiho': ['Takachiho Gorge','MYZ','gorge',32.7122,131.3058,8,['water','forest'],['couple','solo'],['gorge','shrine','hiking'],
    'Basalt columns in a narrow gorge with a seventeen metre waterfall, rowed by hand in a hired boat. Book the boat slot online the moment they open or you will not get one.'],
  'MYZ-takachiho-shrine': ['Amanoiwato & Amanoyasugawara','MYZ','shrine',32.7725,131.3433,6,['forest','water'],['solo'],['shrine','historic','forest'],
    'The cave where the sun goddess hid, according to the myth, and a riverside cavern where the gods met to coax her out. Visitors stack stones there, thousands of them.'],
  'MYZ-nichinan': ['Nichinan Coast & Udo','MYZ','coast',31.4500,131.3333,6,['water'],['couple','family'],['coastal','shrine'],
    'A shrine in a sea cave on a cliff, reached down steps on the rock face, where you throw clay balls at a target in the surf. Palms and washboard rock formations along the coast road.'],
  'MYZ-kirishima-myz': ['Aoshima','MYZ','island',31.8064,131.4728,5,['island','water'],['family','couple'],['island','coastal','shrine'],
    'A small island ringed by rock ridges called the devil’s washboard, joined to the shore by a causeway, with a shrine in the subtropical trees.'],

  /* ===================== KAGOSHIMA ===================== */
  'KGS-yakushima': ['Yakushima','KGS','island',30.3583,130.5389,9,['island','forest','mountain'],['solo','couple'],['unesco','forest','hiking','island'],
    'Cedars thousands of years old in a forest that gets eight metres of rain a year, which is the moss-covered landscape Ghibli drew for Princess Mononoke. World Heritage, and you will get wet.'],
  'KGS-sakurajima': ['Sakurajima','KGS','volcano',31.5833,130.6572,8,['volcanic','water'],['solo','family'],['volcano','onsen','coastal'],
    'One of the most active volcanoes on earth, erupting hundreds of times a year, four kilometres across the bay from a city of six hundred thousand people who have simply adapted.'],
  'KGS-kagoshima-city': ['Kagoshima','KGS','city',31.5966,130.5571,6,['urban','water'],['family','friends'],['food','coastal','historic'],
    'Ash on the cars most mornings. The domain here produced the men who drove the Meiji Restoration, and the sand baths at Ibusuki are forty minutes down the line.'],
  'KGS-ibusuki': ['Ibusuki','KGS','onsen',31.2333,130.6333,6,['water'],['couple','family'],['onsen','coastal'],
    'You are buried up to the neck in naturally heated black sand on the beach for about ten minutes, which is as long as most people manage. Then you wash and get in a normal bath.'],
  'KGS-kirishima': ['Kirishima','KGS','np',31.9342,130.8619,6,['mountain','volcanic'],['solo','couple'],['volcano','hiking','onsen','shrine'],
    'Twenty-three volcanoes, several crater lakes and a shrine at the foot of the peak where the grandson of the sun goddess is said to have come down. Japan’s first national park, in 1934.'],
  'KGS-amami': ['Amami Oshima','KGS','island',28.3667,129.4833,6,['island','water','forest'],['couple','solo'],['unesco','island','coastal','diving','forest'],
    'World Heritage since 2021 for species found nowhere else, including a rabbit that has not changed much in millions of years. Mangroves, empty beaches and mud-dyed silk.'],

  /* ===================== OKINAWA ===================== */
  'OKN-naha': ['Naha & Shuri','OKN','city',26.2124,127.6809,7,['urban','water'],['family','couple'],['historic','food','unesco'],
    'Shuri Castle was the seat of the Ryukyu Kingdom and burned down in 2019, for the fifth time in its history. Reconstruction is open to watch, and the museum and surviving gates explain a culture that is not Japanese.'],
  'OKN-churaumi': ['Churaumi Aquarium','OKN','museum',26.6944,127.8778,7,['water'],['family'],['modern','wildlife','coastal'],
    'The main tank holds seven and a half thousand cubic metres of water and several whale sharks, with an acrylic panel sixty centimetres thick. Among the best aquariums anywhere.'],
  'OKN-ishigaki': ['Ishigaki','OKN','island',24.3448,124.1572,8,['island','water'],['couple','friends'],['island','diving','coastal','beach'],
    'The base for the Yaeyama islands, with Kabira Bay’s turquoise water that you cannot swim in because of the pearl farms. Manta cleaning stations offshore from spring to autumn.'],
  'OKN-taketomi': ['Taketomi','OKN','island',24.3306,124.0861,7,['island','water'],['couple','solo'],['island','historic','coastal'],
    'Red tile roofs, white coral sand streets raked every morning, and water buffalo carts. Ten minutes by ferry from Ishigaki and a different century.'],
  'OKN-iriomote': ['Iriomote','OKN','island',24.3333,123.8167,7,['island','forest','water'],['solo','couple'],['unesco','island','forest','hiking','wildlife'],
    'Ninety per cent jungle and mangrove, with a wildcat population of about a hundred that is found nowhere else. World Heritage, kayaking up rivers, and no roads around the south.'],
  'OKN-miyako': ['Miyakojima','OKN','island',24.8056,125.2811,7,['island','water','beach'],['couple','friends'],['island','beach','diving','coastal'],
    'The best beaches in Japan, flat enough to cycle, and bridges to smaller islands including one of the longest toll-free bridges in the country.'],
  'OKN-okinawa-war': ['Southern Okinawa war sites','OKN','ruin',26.0961,127.7228,6,['water'],['solo'],['wwii','historic','coastal'],
    'The 1945 battle killed around a quarter of the civilian population. The Peace Memorial Park lists two hundred and forty thousand names of the dead from all sides, which is unusual and deliberate.'],
  'OKN-yonaguni': ['Yonaguni','OKN','island',24.4669,123.0094,5,['island','water'],['solo'],['island','diving','coastal'],
    'The westernmost point of Japan, a hundred and eleven kilometres from Taiwan. Hammerhead schools in winter and an underwater rock formation that people argue is a ruin.']

};

/* ---------- ids, sorted by prominence then name ---------- */
const JP_PLACE_IDS = Object.keys(JP_PLACES).sort((a, b) => {
  const d = (JP_PLACES[b][5] || 0) - (JP_PLACES[a][5] || 0);
  return d !== 0 ? d : JP_PLACES[a][0].localeCompare(JP_PLACES[b][0]);
});

function jpPlaceGet(id){
  const p = JP_PLACES[id];
  return p ? { id: id, name: p[0], abbr: p[1], kind: p[2], lat: p[3], lon: p[4],
               prom: p[5], land: p[6], who: p[7], flags: p[8], blurb: p[9],
               country: 'JP' } : null;
}

function jpRegionName(code){ return (JP_REGIONS[code] || [])[0] || code; }
function jpKindLabel(k){ return JP_KIND[k] || k; }

/* Places in one prefecture, best known first. */
function jpRegionPlaces(code){
  return JP_PLACE_IDS.filter(id => JP_PLACES[id][1] === code)
    .sort((a, b) => (JP_PLACES[b][5] || 0) - (JP_PLACES[a][5] || 0));
}

/* ---------- geography helpers ----------

   Japan is a long thin archipelago, so almost everywhere is near
   some coast. That makes a blanket "is it coastal" test useless:
   Matsumoto sits in a mountain basin seventy kilometres from the
   sea and would pass a naive distance check. The gate below needs
   a real coastal signal, not just proximity. */

const JP_COAST = [
  [45.5,141.9],[44.3,145.3],[43.3,145.6],[42.9,143.3],[41.8,140.7],
  [41.5,141.4],[40.5,141.5],[39.6,142.0],[38.3,141.5],[37.1,141.0],
  [36.3,140.6],[35.6,140.9],[35.1,139.8],[34.9,139.1],[34.6,138.2],
  [34.7,137.1],[34.3,136.9],[33.6,135.9],[34.3,135.2],[34.3,134.2],
  [34.3,133.0],[34.0,131.8],[33.9,130.9],[33.6,130.4],[32.8,129.8],
  [31.6,130.6],[31.4,131.5],[32.8,131.9],[33.5,132.5],[33.2,133.6],
  [34.3,134.6],[35.5,135.2],[35.6,134.2],[35.5,133.0],[34.4,131.0],
  [36.1,136.1],[36.8,137.0],[37.9,139.0],[38.9,139.8],[39.9,139.8],
  [40.8,140.3],[26.2,127.7],[24.3,124.2],[28.4,129.5],[30.4,130.5]
];

function jpKmApart(aLat, aLon, bLat, bLon){
  const R = 6371, t = Math.PI / 180;
  const dLat = (bLat - aLat) * t, dLon = (bLon - aLon) * t;
  const s = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(aLat * t) * Math.cos(bLat * t)
          * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

function jpKmToCoast(p){
  let best = 1e9;
  for (const c of JP_COAST){
    const d = jpKmApart(p.lat, p.lon, c[0], c[1]);
    if (d < best) best = d;
  }
  return best;
}

/* Definitely on the water. */
function jpIsCoastal(p){
  if (!p) return false;
  if (['beach','coast','island'].indexOf(p.kind) !== -1) return true;
  const land = p.land || [];
  return land.indexOf('coastal') !== -1 || land.indexOf('island') !== -1;
}

/* Kinds that are inland by definition, however close the map says
   the sea is. An onsen town in a mountain valley does not get a
   wave-height panel. */
const JP_INLAND_KIND = { mountain:1, volcano:1, valley:1, pass:1, gorge:1, lake:1, forest:1 };

/* The eight prefectures with no coastline at all. */
const JP_LANDLOCKED = { STM:1, TCG:1, GNM:1, YMN:1, NGN:1, GIF:1, SHG:1, NAR:1 };

function jpMaybeCoastal(p){
  if (!p) return false;
  if (jpIsCoastal(p)) return true;
  if (JP_LANDLOCKED[p.abbr]) return false;
  if (JP_INLAND_KIND[p.kind]) return false;
  return jpKmToCoast(p) < 35;
}

/* Which body of water, for the sea panel heading. */
function jpSeaOf(p){
  if (!p) return 'the sea';
  if (p.abbr === 'OKN') return 'the East China Sea';
  if (p.lat < 31 && p.lon < 131) return 'the East China Sea';
  /* The Inland Sea, roughly: between Honshu, Shikoku and Kyushu. */
  if (p.lat > 33.4 && p.lat < 34.8 && p.lon > 130.8 && p.lon < 135.2)
    return 'the Seto Inland Sea';
  /* Sea of Japan side: north and west of the spine. */
  const sj = [[45.3,141.5],[43.0,140.3],[40.8,140.3],[39.9,139.8],[38.9,139.8],
              [37.9,139.0],[36.8,137.0],[36.1,136.1],[35.6,134.2],[34.4,131.0]];
  const pac = [[43.3,145.6],[42.0,143.0],[39.6,142.0],[38.3,141.5],[35.6,140.9],
               [34.6,138.2],[33.6,135.9],[33.2,133.6],[31.4,131.5]];
  let dSJ = 1e9, dP = 1e9;
  for (const c of sj)  dSJ = Math.min(dSJ,  jpKmApart(p.lat, p.lon, c[0], c[1]));
  for (const c of pac) dP  = Math.min(dP,   jpKmApart(p.lat, p.lon, c[0], c[1]));
  return dSJ < dP ? 'the Sea of Japan' : 'the Pacific';
}

/* High enough for the air to matter, or for snow to close roads. */
function jpIsHighAltitude(p){
  if (!p) return false;
  if (['mountain','volcano','pass'].indexOf(p.kind) !== -1) return true;
  return (p.flags || []).indexOf('ski') !== -1;
}

/* Japan is seismically active everywhere, so this is true almost
   always. It exists so the panel can be suppressed for the far
   southwest islands, which are comparatively quiet. */
function jpIsSeismic(p){
  if (!p) return false;
  return p.abbr !== 'OKN';
}

/* The snow-country belt: the Sea of Japan side, where winter storms
   crossing the warm current dump some of the heaviest snowfall
   recorded anywhere. */
const JP_SNOW_BELT = { HKD:1, AOM:1, AKT:1, YGT:1, NGT:1, TYM:1, ISK:1, FKI:1, NGN:1, GIF:1, FKS:1, IWT:1, TTR:1, SMN:1 };

function jpIsSnowCountry(p){
  if (!p) return false;
  if ((p.flags || []).indexOf('snow') !== -1) return true;
  return !!JP_SNOW_BELT[p.abbr];
}
