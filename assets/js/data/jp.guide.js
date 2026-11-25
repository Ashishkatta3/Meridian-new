/* ===========================================================
   JAPAN: the written guides

   One entry per place:

     id -> { intro: [paragraphs], see: [{n, t?, d}], when, stay, move, eat }

   This file is NOT loaded by index.html. core/lazy.js fetches it the
   first time somebody opens a Japanese place page, because at this
   size it has no business sitting on the critical path of a visitor
   who only ever looks at Utah.

   On the writing. These are meant to read like something a person
   wrote after going there: a concrete fact early, an opinion where
   one is warranted, and the practical thing you would actually want
   to know. Deliberately avoided: em dashes, "nestled", "boasts",
   "hidden gem", "must-visit", and the construction where every
   sentence is balanced against its own opposite. Numbers, dates and
   names do more work than adjectives.
   =========================================================== */

/* Wikipedia article titles where they differ from the name this
   atlas uses. Without these the photo lookup misses. */
const JP_WIKI = {
  'TKY-shinjuku': 'Shinjuku',
  'TKY-shibuya': 'Shibuya',
  'TKY-asakusa': 'Sensō-ji',
  'TKY-ueno': 'Ueno Park',
  'TKY-ginza': 'Ginza',
  'TKY-meiji-jingu': 'Meiji Shrine',
  'TKY-tsukiji': 'Tsukiji fish market',
  'TKY-akihabara': 'Akihabara',
  'TKY-yanaka': 'Yanaka, Tokyo',
  'TKY-shinjuku-gyoen': 'Shinjuku Gyoen National Garden',
  'TKY-odaiba': 'Odaiba',
  'TKY-ryogoku': 'Ryōgoku',
  'TKY-koenji': 'Kōenji',
  'TKY-takao': 'Mount Takao',
  'TKY-toyosu': 'Toyosu Market',
  'TKY-ogasawara': 'Bonin Islands',
  'TKY-izu-oshima': 'Izu Ōshima',
  'TKY-kichijoji': 'Kichijōji',
  'KYT-kiyomizu': 'Kiyomizu-dera',
  'KYT-fushimi-inari': 'Fushimi Inari-taisha',
  'KYT-arashiyama': 'Arashiyama',
  'KYT-kinkakuji': 'Kinkaku-ji',
  'KYT-gion': 'Gion',
  'KYT-ginkakuji': 'Ginkaku-ji',
  'KYT-ryoanji': 'Ryōan-ji',
  'KYT-nijo': 'Nijō Castle',
  'KYT-nishiki': 'Nishiki Market',
  'KYT-sanjusangendo': 'Sanjūsangen-dō',
  'KYT-daitokuji': 'Daitoku-ji',
  'KYT-kurama': 'Kurama',
  'KYT-uji': 'Uji, Kyoto',
  'KYT-miyama': 'Miyama, Kyoto',
  'KYT-amanohashidate': 'Amanohashidate',
  'KYT-ine': 'Ine, Kyoto',
  'KYT-kibune-kurama-2': 'Ōhara, Kyoto',
  'KYT-kyoto-station': 'Kyoto Station',
  'OSK-dotonbori': 'Dōtonbori',
  'OSK-osaka-castle': 'Osaka Castle',
  'OSK-shinsekai': 'Shinsekai',
  'OSK-umeda': 'Umeda',
  'OSK-sumiyoshi': 'Sumiyoshi-taisha',
  'OSK-minoo': 'Minoo, Osaka',
  'OSK-kaiyukan': 'Osaka Aquarium Kaiyukan',
  'OSK-expo-park': 'Expo Commemoration Park',
  'NAR-todaiji': 'Tōdai-ji',
  'NAR-nara-park': 'Nara Park',
  'NAR-horyuji': 'Hōryū-ji',
  'NAR-kasuga': 'Kasuga-taisha',
  'NAR-yoshino': 'Mount Yoshino',
  'NAR-asuka': 'Asuka, Nara',
  'NAR-omiwa': 'Ōmiwa Shrine',
  'HYG-himeji': 'Himeji Castle',
  'HYG-kinosaki': 'Kinosaki Onsen',
  'HYG-arima': 'Arima Onsen',
  'HYG-takeda': 'Takeda Castle',
  'HYG-awaji': 'Awaji Island',
  'HYG-ikuno': 'Ikuno Silver Mine',
  'HYG-sasayama': 'Tamba-Sasayama',
  'HRS-hiroshima': 'Hiroshima',
  'HRS-miyajima': 'Itsukushima',
  'HRS-onomichi': 'Onomichi',
  'HRS-shimanami': 'Nishiseto Expressway',
  'HRS-tomonoura': 'Tomonoura',
  'HRS-sandankyo': 'Sandankyō',
  'HRS-takehara': 'Takehara, Hiroshima',
  'KNG-hakone': 'Hakone',
  'KNG-kamakura': 'Kamakura',
  'KNG-yokohama': 'Yokohama',
  'KNG-enoshima': 'Enoshima',
  'KNG-odawara': 'Odawara Castle',
  'KNG-ashinoko': 'Lake Ashi',
  'KNG-zushi-hayama': 'Hayama, Kanagawa',
  'KNG-miura': 'Miura Peninsula',
  'YMN-mount-fuji': 'Mount Fuji',
  'YMN-fuji-five-lakes': 'Fuji Five Lakes',
  'YMN-chureito': 'Arakurayama Sengen Park',
  'YMN-koshu-wine': 'Katsunuma, Yamanashi',
  'YMN-shosenkyo': 'Shōsenkyō',
  'YMN-minobu': 'Kuon-ji',
  'NGN-matsumoto': 'Matsumoto Castle',
  'NGN-kamikochi': 'Kamikōchi',
  'NGN-jigokudani': 'Jigokudani Monkey Park',
  'NGN-zenkoji': 'Zenkō-ji',
  'NGN-nakasendo': 'Tsumago-juku',
  'NGN-hakuba': 'Hakuba, Nagano',
  'NGN-karuizawa': 'Karuizawa',
  'NGN-norikura': 'Mount Norikura',
  'NGN-suwa': 'Lake Suwa',
  'NGN-obuse': 'Obuse, Nagano',
  'GIF-shirakawa-go': 'Shirakawa-gō',
  'GIF-takayama': 'Takayama, Gifu',
  'GIF-gero': 'Gero, Gifu',
  'GIF-gujo-hachiman': 'Gujō, Gifu',
  'GIF-gifu-city': 'Gifu',
  'GIF-magome-gifu': 'Ena, Gifu',
  'GIF-hida-furukawa': 'Hida, Gifu',
  'ISK-kanazawa': 'Kanazawa',
  'ISK-kenrokuen': 'Kenroku-en',
  'ISK-wajima': 'Wajima, Ishikawa',
  'ISK-noto': 'Noto Peninsula',
  'ISK-yamanaka': 'Kaga, Ishikawa',
  'ISK-shirayama': 'Mount Haku',
  'HKD-sapporo': 'Sapporo',
  'HKD-otaru': 'Otaru',
  'HKD-furano': 'Furano, Hokkaido',
  'HKD-niseko': 'Niseko, Hokkaido',
  'HKD-shiretoko': 'Shiretoko National Park',
  'HKD-daisetsuzan': 'Daisetsuzan National Park',
  'HKD-hakodate': 'Hakodate',
  'HKD-noboribetsu': 'Noboribetsu',
  'HKD-abashiri': 'Abashiri',
  'HKD-kushiro': 'Kushiro Shitsugen National Park',
  'HKD-lake-toya': 'Lake Tōya',
  'HKD-wakkanai': 'Rishiri-Rebun-Sarobetsu National Park',
  'HKD-asahikawa': 'Asahikawa',
  'HKD-shikotsu': 'Lake Shikotsu',
  'HKD-obihiro': 'Obihiro',
  'HKD-hokkaido-cape': 'Cape Erimo',
  'OKN-naha': 'Shuri Castle',
  'OKN-churaumi': 'Okinawa Churaumi Aquarium',
  'OKN-ishigaki': 'Ishigaki Island',
  'OKN-taketomi': 'Taketomi Island',
  'OKN-iriomote': 'Iriomote Island',
  'OKN-miyako': 'Miyako-jima',
  'OKN-okinawa-war': 'Okinawa Prefectural Peace Memorial Museum',
  'OKN-yonaguni': 'Yonaguni',
  'KGS-yakushima': 'Yakushima',
  'KGS-sakurajima': 'Sakurajima',
  'KGS-kagoshima-city': 'Kagoshima',
  'KGS-ibusuki': 'Ibusuki, Kagoshima',
  'KGS-kirishima': 'Kirishima-Yaku National Park',
  'KGS-amami': 'Amami Ōshima',
  'NGS-nagasaki-city': 'Nagasaki',
  'NGS-gunkanjima': 'Hashima Island',
  'NGS-goto': 'Gotō Islands',
  'NGS-unzen': 'Mount Unzen',
  'NGS-hirado': 'Hirado, Nagasaki',
  'NGS-sasebo': 'Kujūkushima',
  'NGS-shimabara': 'Shimabara, Nagasaki',
  'KMM-aso': 'Mount Aso',
  'KMM-kumamoto-castle': 'Kumamoto Castle',
  'KMM-kurokawa': 'Kurokawa Onsen',
  'KMM-amakusa': 'Amakusa',
  'KMM-takachiho-no-yu': 'Nabegataki',
  'OIT-beppu': 'Beppu, Ōita',
  'OIT-yufuin': 'Yufu, Ōita',
  'OIT-usuki': 'Usuki Stone Buddhas',
  'OIT-kunisaki': 'Kunisaki Peninsula',
  'OIT-taketa': 'Taketa, Ōita',
  'MYZ-takachiho': 'Takachiho, Miyazaki',
  'MYZ-takachiho-shrine': 'Amano Iwato Shrine',
  'MYZ-nichinan': 'Udo Shrine',
  'MYZ-kirishima-myz': 'Aoshima, Miyazaki',
  'FKO-fukuoka-city': 'Fukuoka',
  'FKO-dazaifu': 'Dazaifu Tenmangū',
  'FKO-yanagawa': 'Yanagawa, Fukuoka',
  'FKO-kokura': 'Kitakyushu',
  'FKO-munakata': 'Okinoshima (Fukuoka)',
  'FKO-itoshima': 'Itoshima',
  'SAG-arita': 'Arita, Saga',
  'SAG-yoshinogari': 'Yoshinogari site',
  'SAG-ureshino': 'Ureshino, Saga',
  'SAG-karatsu': 'Karatsu',
  'AOM-hirosaki': 'Hirosaki Castle',
  'AOM-oirase': 'Oirase River',
  'AOM-towada': 'Lake Towada',
  'AOM-aomori-city': 'Aomori (city)',
  'AOM-shirakami': 'Shirakami-Sanchi',
  'AOM-hakkoda': 'Hakkōda Mountains',
  'AOM-sannai-maruyama': 'Sannai-Maruyama site',
  'IWT-hiraizumi': 'Hiraizumi, Iwate',
  'IWT-morioka': 'Morioka',
  'IWT-geibikei': 'Geibikei',
  'IWT-tono': 'Tōno, Iwate',
  'IWT-rikuchu': 'Rikuchū Kaigan National Park',
  'IWT-hachimantai': 'Hachimantai, Iwate',
  'IWT-kitakami': 'Kitakami, Iwate',
  'MYG-matsushima': 'Matsushima',
  'MYG-sendai': 'Sendai',
  'MYG-naruko': 'Naruko Onsen',
  'MYG-zao-fox': 'Zao Fox Village',
  'MYG-shiogama': 'Shiogama',
  'MYG-akiu': 'Akiu Onsen',
  'AKT-kakunodate': 'Kakunodate',
  'AKT-nyuto': 'Nyūtō Onsen',
  'AKT-tazawa': 'Lake Tazawa',
  'AKT-akita-city': 'Akita (city)',
  'AKT-oga': 'Oga Peninsula',
  'AKT-dakigaeri': 'Dakigaeri Valley',
  'YGT-ginzan': 'Ginzan Onsen',
  'YGT-yamadera': 'Risshaku-ji',
  'YGT-dewa-sanzan': 'Three Mountains of Dewa',
  'YGT-zao': 'Zaō Onsen',
  'YGT-tsuruoka': 'Tsuruoka',
  'YGT-mogami': 'Mogami River',
  'FKS-ouchi-juku': 'Ouchi-juku',
  'FKS-aizu': 'Aizuwakamatsu',
  'FKS-goshikinuma': 'Goshiki-numa',
  'FKS-oze': 'Oze National Park',
  'FKS-tsuruga-castle-town': 'Kitakata, Fukushima',
  'FKS-nanko': 'Shirakawa, Fukushima',
  'TCG-nikko': 'Nikkō, Tochigi',
  'TCG-chuzenji': 'Lake Chūzenji',
  'TCG-kinugawa': 'Kinugawa Onsen',
  'TCG-ashikaga': 'Ashikaga Flower Park',
  'TCG-mashiko': 'Mashiko, Tochigi',
  'TCG-oya': 'Ōya History Museum',
  'GNM-kusatsu': 'Kusatsu, Gunma',
  'GNM-ikaho': 'Ikaho Onsen',
  'GNM-tomioka': 'Tomioka Silk Mill',
  'GNM-minakami': 'Minakami, Gunma',
  'GNM-oze-gunma': 'Mount Tanigawa',
  'GNM-takaragawa': 'Takaragawa Onsen',
  'IBR-hitachi-seaside': 'Hitachi Seaside Park',
  'IBR-ushiku': 'Ushiku Daibutsu',
  'IBR-kairakuen': 'Kairaku-en',
  'IBR-fukuroda': 'Fukuroda Falls',
  'STM-kawagoe': 'Kawagoe',
  'STM-chichibu': 'Chichibu, Saitama',
  'STM-omiya-bonsai': 'Ōmiya Bonsai Village',
  'STM-nagatoro': 'Nagatoro, Saitama',
  'CHB-narita': 'Narita-san',
  'CHB-boso': 'Bōsō Peninsula',
  'CHB-nokogiriyama': 'Mount Nokogiri (Chiba)',
  'CHB-katsuura': 'Katsuura, Chiba',
  'CHB-sawara': 'Sawara, Chiba',
  'NGT-sado': 'Sado Island',
  'NGT-echigo-yuzawa': 'Yuzawa, Niigata',
  'NGT-niigata-city': 'Niigata (city)',
  'NGT-echigo-tsumari': 'Echigo-Tsumari Art Triennial',
  'NGT-myoko': 'Myōkō, Niigata',
  'TYM-tateyama': 'Tateyama Kurobe Alpine Route',
  'TYM-gokayama': 'Gokayama',
  'TYM-toyama-city': 'Toyama (city)',
  'TYM-kurobe': 'Kurobe Gorge Railway',
  'TYM-amaharashi': 'Amaharashi Coast',
  'FKI-eiheiji': 'Eihei-ji',
  'FKI-tojinbo': 'Tōjinbō',
  'FKI-dinosaur-museum': 'Fukui Prefectural Dinosaur Museum',
  'FKI-kumagawa': 'Obama, Fukui',
  'FKI-echizen-washi': 'Echizen, Fukui',
  'SZK-izu': 'Izu Peninsula',
  'SZK-fuji-south': 'Shiraito Falls (Shizuoka)',
  'SZK-atami': 'Atami',
  'SZK-shuzenji': 'Shuzenji',
  'SZK-kakegawa-tea': 'Makinohara, Shizuoka',
  'SZK-nihondaira': 'Nihondaira',
  'SZK-dogashima': 'Nishiizu, Shizuoka',
  'AIC-nagoya': 'Nagoya',
  'AIC-inuyama': 'Inuyama Castle',
  'AIC-tokoname': 'Tokoname',
  'AIC-korankei': 'Kōrankei',
  'AIC-atsuta': 'Atsuta Shrine',
  'AIC-okazaki': 'Okazaki, Aichi',
  'SHG-hikone': 'Hikone Castle',
  'SHG-enryakuji': 'Enryaku-ji',
  'SHG-biwa': 'Lake Biwa',
  'SHG-shirahige': 'Shirahige Shrine',
  'SHG-miho': 'Miho Museum',
  'WKY-koyasan': 'Mount Kōya',
  'WKY-kumano-kodo': 'Kumano Kodō',
  'WKY-nachi': 'Nachi Falls',
  'WKY-shirahama': 'Shirahama, Wakayama',
  'WKY-yunomine': 'Yunomine Onsen',
  'WKY-koyasan-okunoin': 'Okunoin',
  'MIE-ise': 'Ise Grand Shrine',
  'MIE-toba': 'Toba, Mie',
  'MIE-meoto-iwa': 'Meoto Iwa',
  'MIE-iga': 'Iga, Mie',
  'MIE-nabana': 'Nabana no Sato',
  'OKY-korakuen': 'Kōraku-en',
  'OKY-kurashiki': 'Kurashiki',
  'OKY-naoshima': 'Naoshima',
  'OKY-teshima': 'Teshima (Kagawa)',
  'OKY-bitchu-takahashi': 'Matsuyama Castle (Bitchū)',
  'SMN-izumo': 'Izumo-taisha',
  'SMN-matsue': 'Matsue Castle',
  'SMN-iwami-ginzan': 'Iwami Ginzan Silver Mine',
  'SMN-adachi': 'Adachi Museum of Art',
  'SMN-oki': 'Oki Islands',
  'SMN-tsuwano': 'Tsuwano, Shimane',
  'TTR-sand-dunes': 'Tottori Sand Dunes',
  'TTR-daisen': 'Mount Daisen',
  'TTR-mizuki-shigeru': 'Sakaiminato',
  'TTR-misasa': 'Misasa, Tottori',
  'YMG-motonosumi': 'Motonosumi Shrine',
  'YMG-kintaikyo': 'Kintai Bridge',
  'YMG-akiyoshido': 'Akiyoshidō',
  'YMG-hagi': 'Hagi, Yamaguchi',
  'YMG-shimonoseki': 'Shimonoseki',
  'KGW-ritsurin': 'Ritsurin Garden',
  'KGW-kotohira': 'Kotohira-gū',
  'KGW-shodoshima': 'Shōdoshima',
  'KGW-takamatsu': 'Takamatsu, Kagawa',
  'KGW-naoshima-kagawa': 'Ogijima',
  'TKS-iya': 'Iya Valley',
  'TKS-naruto': 'Naruto whirlpools',
  'TKS-awa-odori': 'Awa Dance Festival',
  'TKS-kamikatsu': 'Kamikatsu, Tokushima',
  'EHM-dogo': 'Dōgo Onsen',
  'EHM-matsuyama': 'Matsuyama Castle (Iyo)',
  'EHM-uchiko': 'Uchiko, Ehime',
  'EHM-shimanami-ehime': 'Imabari',
  'EHM-ozu': 'Ōzu, Ehime',
  'KCH-kochi-castle': 'Kōchi Castle',
  'KCH-shimanto': 'Shimanto River',
  'KCH-katsurahama': 'Katsurahama',
  'KCH-muroto': 'Cape Muroto'
};

const JP_GUIDE = {

'YMN-mount-fuji': {
  intro: [
    'Fuji is 3,776 metres, the highest thing in Japan, and on a clear winter morning you can see it from a Tokyo office window sixty miles away. It last erupted in 1707 and dropped ash on Edo for a fortnight.',
    'The climbing season runs from early July to early September. That is the only window when the mountain huts open, the buses run to the trailhead and the route is patrolled. Roughly two hundred thousand people go up in those ten weeks, which tells you what the trail feels like in August.',
    'There is an old line about this mountain: a wise man climbs Fuji once, a fool climbs it twice. Having queued in the dark at 3,500 metres behind four hundred head torches, I think that is less a joke than a public safety notice.'
  ],
  see: [
    { n: 'The Yoshida trail', t: 'the standard route',
      d: 'Starts at the Fifth Station, 2,300 metres up, so you climb about 1,400. Five to seven hours. It has the most huts and the most people, which cuts both ways.' },
    { n: 'Going up overnight',
      d: 'The usual plan is to climb in the afternoon, sleep badly in a hut for four hours, then summit before dawn. In peak season the last ridge becomes a standing queue and you will get very cold waiting.' },
    { n: 'The crater circuit',
      d: 'About an hour around the rim once you are up there. Most people photograph the sunrise and immediately start down, which is a waste if the weather is holding.' },
    { n: 'Looking at it instead',
      d: 'Often the better call. Chureito Pagoda, Lake Kawaguchi and the Hakone ropeway all give you the mountain without the altitude headache.' },
    { n: 'Fujisan Hongu Sengen Taisha',
      d: 'The shrine in Fujinomiya has legally owned the land above the eighth station since the 1600s. A court confirmed it again in 1974.' }
  ],
  when: 'July to early September for climbing. Outside that the huts close, the buses stop and people die on it most years. For photographs, November to February: cold, clear air and a proper snow cap.',
  stay: 'Two days for the climb including travel. One night at the Fuji Five Lakes if you only want to look at it.',
  move: 'Buses to the Fifth Station from Kawaguchiko, and direct from Shinjuku in season. There is now a climbing fee and a daily cap on the Yoshida route, so book ahead.',
  eat: 'Hut food is curry rice and instant noodles at altitude prices, and that is fine. Carry more water than you think you need, and carry your rubbish back down.'
}
,

/* ===================== TOKYO ===================== */
'TKY-shinjuku': {
  intro: [
    'Shinjuku station handles about three and a half million passengers a day, which makes it the busiest railway station on earth by a margin nobody else is close to. It has over two hundred exits. Getting the wrong one costs you fifteen minutes and a lot of dignity.',
    'What surrounds it splits into three moods. West is the skyscraper district, planned on stable ground after 1960 and home to the free observatory in the Metropolitan Government Building. East is Kabukicho, the entertainment quarter, loud and not nearly as dangerous as its reputation. North of that is Golden Gai, six alleys of tiny bars.',
    'Most of Shinjuku was flattened in 1945 and rebuilt fast, so there is almost nothing old here. The appeal is density and the fact that something is open whatever hour you surface.'
  ],
  see: [
    { n: 'Omoide Yokocho', t: 'from about 5pm',
      d: 'Sixty-odd stalls under the tracks, grilling offal and chicken skewers since the postwar black market days. Seats maybe six people each. Smoky, cramped and the best cheap meal in the district.' },
    { n: 'Golden Gai',
      d: 'Around two hundred bars in six alleys, most seating five or six. Many charge a cover and some only take regulars, so read the door. The ones with English signs want your business.' },
    { n: 'Tokyo Metropolitan Government Building',
      d: 'Two observation decks at 202 metres, free, open late. On a clear winter afternoon Fuji is visible to the southwest. No queue compared with the paid towers.' },
    { n: 'Shinjuku Gyoen',
      d: 'Fifty-eight hectares of garden ten minutes from the station, and the single best antidote to the rest of this entry.' },
    { n: 'Kabukicho at night',
      d: 'Worth one walk through. Ignore anybody who approaches you in English offering a bar; the touts work on commission and the bills are famous.' }
  ],
  when: 'Any time. The district is mostly indoors and runs on the same schedule year round. October to November and April to May give the most comfortable weather for walking between things.',
  stay: 'An evening. As a base, it is the most connected place to sleep in Tokyo and the most convenient for day trips west.',
  move: 'Every line in the city reaches it. Use the Shinjuku station map before you arrive, or default to the South Exit, which is the easiest to find your way back to.',
  eat: 'Tonkatsu at Suzuya, ramen in Omoide Yokocho, and the basement food halls at Isetan, which are a genuine attraction rather than a shopping trip.'
},

'TKY-shibuya': {
  intro: [
    'The crossing outside Shibuya station moves up to three thousand people on a single light change. It works because everybody holds their line, and watching it from the Starbucks window above is a Tokyo rite of passage.',
    'Shibuya is the city aimed at under-thirties: music, clothes, late food. It has been redeveloped hard since 2018 and the new towers have viewing decks, but the interesting part is still the backstreets, particularly the climb up towards Nanpeidai and across to Tomigaya.',
    'Twenty minutes on foot gets you to Shimokitazawa or Daikanyama, both of which are better places to spend an afternoon than Shibuya itself.'
  ],
  see: [
    { n: 'Shibuya Sky',
      d: 'Rooftop deck at 229 metres with an open-air edge. Book a sunset slot online well ahead; they sell out and the walk-up price is higher.' },
    { n: 'The crossing',
      d: 'Best after dark and in the rain, when the umbrellas and the screens do the work. The Magnet rooftop and the pedestrian bridge are the two free vantage points.' },
    { n: 'Hachiko',
      d: 'The dog who waited at the station for his dead owner for nine years. The statue is small, always surrounded, and the story holds up.' },
    { n: 'Nonbei Yokocho',
      d: 'A two-lane strip of tiny postwar bars that survived the redevelopment, directly beside the tracks.' },
    { n: 'Daikanyama and Nakameguro',
      d: 'Fifteen minutes south. Tsutaya Books in Daikanyama stays open till two in the morning and is worth the walk on its own.' }
  ],
  when: 'Year round. Nakameguro in early April is one of the better cherry blossom walks in the city, along the canal.',
  stay: 'Half a day, or an evening.',
  move: 'Shibuya station on nine lines. The station has been under construction for years and the signage changes; allow extra time for transfers.',
  eat: 'Standing sushi at Uogashi Nihonichi, soba at Shibusoba for about six hundred yen, and the whole of Nakameguro for dinner.'
},

'TKY-asakusa': {
  intro: [
    'Senso-ji was founded in 628, which makes it the oldest temple in Tokyo by six hundred years. The story is that two fishermen pulled a small gold statue of Kannon out of the Sumida river and a temple grew around it. The statue has never been shown publicly.',
    'What stands now is a 1958 concrete reconstruction. The original burned in the March 1945 firebombing along with most of this district and around a hundred thousand people. That fact is worth carrying while you walk the approach.',
    'Nakamise-dori, the stall-lined street to the gate, has operated for roughly three hundred years. It is commercial and always has been.'
  ],
  see: [
    { n: 'Kaminarimon and the lantern',
      d: 'The outer gate with a four-metre, seven-hundred-kilogram paper lantern. Look at its underside: there is a carved dragon most people walk straight past.' },
    { n: 'The main hall early',
      d: 'Open from six. Before eight the place is locals and pigeons, and you can actually see the building.' },
    { n: 'Nakamise-dori',
      d: 'Ningyo-yaki cakes and kaminari-okoshi rice crackers are the traditional buys. Eat as you go, off to one side; blocking the lane is poor form.' },
    { n: 'Asakusa Culture Tourist Information Center',
      d: 'A Kengo Kuma building across from the gate with a free eighth-floor terrace looking straight down Nakamise. Better view than anything you pay for here.' },
    { n: 'A Sumida river boat',
      d: 'Boats run from the pier to Odaiba and Hamarikyu. The Himiko and Hotaluna, designed by a manga artist, look ridiculous and are good fun.' }
  ],
  when: 'Year round. Sanja Matsuri in mid-May is one of Tokyo’s three great festivals and brings a million and a half people over three days.',
  stay: 'Half a day. Combine with Ueno, twenty minutes away.',
  move: 'Ginza, Asakusa and Tsukuba Express lines. The Tobu line from here is also how you reach Nikko.',
  eat: 'Tempura at Daikokuya, which has been frying since 1887 and has a queue to match. Horumon and beer under the expressway at Hoppy Street.'
},

'TKY-ueno': {
  intro: [
    'Ueno Park was Japan’s first public park, opened in 1873 on the grounds of a temple complex destroyed in the Battle of Ueno five years earlier. The last Tokugawa loyalists made their stand here and lost in a day.',
    'It now holds four major museums within a ten minute walk of each other, which is an unusual concentration. The Tokyo National Museum is the one to prioritise: it has the largest collection of Japanese art anywhere, including swords, scrolls and Buddhist sculpture that rarely leaves the country.',
    'Around a thousand cherry trees line the central path. Hanami here is a full-contact sport involving tarpaulins laid at dawn by the most junior person in the office.'
  ],
  see: [
    { n: 'Tokyo National Museum',
      d: 'Start in the Honkan with the Japanese galleries. The Gallery of Horyuji Treasures next door is a Taniguchi building holding seventh-century bronzes in near-darkness, and it is the quietest room in Ueno.' },
    { n: 'The park at cherry blossom',
      d: 'Late March. Chaotic, drunken and genuinely joyful. Go on a weekday morning if you want photographs rather than an experience.' },
    { n: 'Ameyoko',
      d: 'A market under and beside the tracks, grown out of postwar black-market stalls. Dried fish, cheap trainers, and shouting.' },
    { n: 'Shinobazu Pond',
      d: 'Covered in lotus from July. A shrine on an island in the middle, and rowing boats.' },
    { n: 'The National Museum of Western Art',
      d: 'A Le Corbusier building, World Heritage as part of his cross-border listing, holding the Matsukata collection of Monet and Rodin.' }
  ],
  when: 'Late March for blossom. Museums are closed Mondays, which catches people out constantly.',
  stay: 'A full day if you are doing museums properly.',
  move: 'Ueno station on the Yamanote and several shinkansen lines. Yanaka is a twenty-minute walk northwest and worth pairing.',
  eat: 'Ameyoko for standing seafood and skewers. Innsyoutei in the park has been serving kaiseki since 1875 in a wooden building.'
},

'TKY-ginza': {
  intro: [
    'Ginza is built on the site of a silver mint, which is where the name comes from. After a fire in 1872 the government had it rebuilt in Georgian brick as a demonstration of what a modern Japan would look like. The brick did not survive the 1923 earthquake, but the ambition stuck.',
    'It is still the most expensive retail land in the country and the department stores here take service to a level that reads as theatre: staff bow to the escalator as the store opens.',
    'The good news for anyone not shopping is that Ginza has the highest concentration of serious small restaurants in Tokyo, many of them in basements with six seats and no English sign.'
  ],
  see: [
    { n: 'Chuo-dori closed to traffic', t: 'weekend afternoons',
      d: 'Saturdays and Sundays from noon the main street becomes a pedestrian zone with chairs in the middle of it. Much the best time to be here.' },
    { n: 'Ginza Six and the rooftop',
      d: 'A Taniguchi building with a free roof garden most visitors never find, and a Tsutaya art bookshop on the sixth floor.' },
    { n: 'Kabukiza Theatre',
      d: 'You can buy a single-act ticket for the fourth floor on the day, usually for about a thousand yen, and see an hour of kabuki with an English audio guide. The best value in Tokyo theatre.' },
    { n: 'The department store basements',
      d: 'Mitsukoshi and Matsuya depachika. Perfect fruit at absurd prices, and prepared food that would be a restaurant meal anywhere else.' },
    { n: 'Okuno Building',
      d: 'A 1932 apartment block off the main streets, now full of tiny galleries, with a hand-operated lift. Free to wander.' }
  ],
  when: 'Year round. Weekend afternoons for the pedestrian street.',
  stay: 'Half a day, or an evening for dinner.',
  move: 'Ginza station on three lines, and Tokyo station is a fifteen-minute walk.',
  eat: 'The reason to come. Sushi counters at every price from a thousand yen standing to thirty thousand seated. Kyubey and Sushi Iwa for the splurge, Tsukiji Sushisay for the middle.'
},

'TKY-meiji-jingu': {
  intro: [
    'The forest around Meiji Shrine looks like it has been there forever. It was planted in 1920, from about a hundred thousand trees donated from across the empire, and designed by foresters who planned a succession that would take a hundred and fifty years to mature. It is running ahead of schedule.',
    'The shrine honours Emperor Meiji and Empress Shoken, under whom Japan went from feudal isolation to industrial power in a single reign. The original buildings burned in 1945 and were rebuilt in 1958 by public subscription.',
    'The contrast at the south gate is the thing. Step out and you are in Harajuku, on Takeshita-dori, which is the loudest two hundred metres in Japan.'
  ],
  see: [
    { n: 'The approach through the forest',
      d: 'About ten minutes under the trees from the gate. The twelve-metre cypress torii is made from timber that was already fifteen hundred years old when it was cut.' },
    { n: 'The sake barrels',
      d: 'Two walls of them, donated by brewers across Japan, facing a wall of burgundy barrels sent from Bourgogne. An odd pairing with a real history behind it.' },
    { n: 'A Sunday wedding',
      d: 'Shinto processions cross the main courtyard most weekend mornings. Watch from the side and do not get in the way of the photographer.' },
    { n: 'The Inner Garden', t: 'June for irises',
      d: 'A separate paid garden with a well that has become a minor pilgrimage site. A hundred and fifty varieties of iris flower in June.' },
    { n: 'Takeshita-dori',
      d: 'Out of the south gate and across. Crepes, idol merchandise and teenagers. Fifteen minutes is plenty.' }
  ],
  when: 'Year round, open sunrise to sunset. New Year brings over three million visitors in three days, which is the largest shrine visit in Japan.',
  stay: 'Two hours including the walk.',
  move: 'Harajuku or Meiji-jingumae station. Yoyogi Park is immediately adjacent.',
  eat: 'Nothing at the shrine. Omotesando, five minutes away, has the serious restaurants; Harajuku has the crepes.'
},

'TKY-tsukiji': {
  intro: [
    'The wholesale market moved to Toyosu in 2018 after decades of argument, and plenty of people assumed Tsukiji was finished. The outer market stayed. Around four hundred shops and stalls still trade here, and for eating rather than buying wholesale it is better than it ever was.',
    'This is where restaurant chefs buy knives, dried bonito, tamagoyaki and pickles. Several of the knife shops will grind a blade to your grip while you wait.',
    'Go before nine. By eleven the lanes are a slow-moving crowd and the good stalls have sold through.'
  ],
  see: [
    { n: 'Breakfast standing up',
      d: 'Grilled scallops, uni on a shell, tuna skewers, tamagoyaki on a stick. Expect to pay a few hundred yen a piece and to eat it beside the stall.' },
    { n: 'The knife shops',
      d: 'Aritsugu and Masamoto have been here for generations. They will engrave a name in kanji and explain the difference between a yanagiba and a deba properly.' },
    { n: 'Namiyoke Shrine',
      d: 'At the edge of the market, dedicated to calming waves. Enormous lion heads, and memorial stones raised by the fish trade to the creatures it sells.' },
    { n: 'Sushi for breakfast',
      d: 'Sushi Zanmai and Daiwa both open early. The queue at the famous ones is ninety minutes; the place two doors down is usually just as good.' },
    { n: 'Hamarikyu Gardens',
      d: 'Ten minutes’ walk. A tidal seawater garden with a teahouse on an island, once the shogun’s duck-hunting grounds.' }
  ],
  when: 'Year round. Closed Sundays and most Wednesdays, which is the single most common mistake visitors make here.',
  stay: 'Two hours, early.',
  move: 'Tsukiji on the Hibiya line or Tsukijishijo on the Oedo line.',
  eat: 'That is the entire point. Come hungry and skip your hotel breakfast.'
},

'TKY-akihabara': {
  intro: [
    'Akihabara started as a postwar black market for radio parts, became the electronics district, and from the 1990s turned into the centre of anime, manga and game culture. All three layers are still physically present if you look.',
    'Under the tracks at Radio Center you can still buy individual capacitors, switches and connectors from stalls the size of a wardrobe. Two streets away, eight-storey buildings sell figurines floor by floor.',
    'The maid cafes are a tourist cliche at this point and most are underwhelming. The retro game shops and the secondhand floors at Mandarake are where the actual interest is.'
  ],
  see: [
    { n: 'Radio Center',
      d: 'Under the station, barely changed since the 1950s. Components, vacuum tubes, obscure connectors. Worth ten minutes even if you want nothing.' },
    { n: 'Mandarake Complex',
      d: 'Eight floors of secondhand manga, figures, cels and doujinshi, organised with obsessive care. Start at the top and work down.' },
    { n: 'Super Potato',
      d: 'Retro game shop with a playable arcade on the top floor. Famicom carts, boxed and loose, at collector prices.' },
    { n: 'Yodobashi Camera',
      d: 'Nine floors of everything electronic, with a restaurant floor. Tax-free counters on site; bring your passport.' },
    { n: 'Kanda Myojin',
      d: 'A shrine five minutes uphill that sells blessings for IT equipment and has been doing so for years. Entirely sincere and slightly wonderful.' }
  ],
  when: 'Year round. Chuo-dori closes to traffic on Sunday afternoons.',
  stay: 'Half a day.',
  move: 'Akihabara station on the Yamanote, Sobu and Tsukuba Express.',
  eat: 'Not a food district. Kanda, one stop south, has old soba and tonkatsu places that are much better.'
},

'TKY-yanaka': {
  intro: [
    'Yanaka is one of the very few parts of Tokyo that escaped both the 1923 earthquake and the 1945 firebombing. The result is a district of wooden houses, narrow lanes and around seventy temples, which is the highest concentration in the city.',
    'The cemetery in the middle is the point of orientation. It is a pleasant place to walk, lined with cherry trees, and the last shogun is buried in it.',
    'It is not preserved as a museum. People live here, the shops serve the neighbourhood, and nothing is ticketed. That is exactly why it is worth an afternoon.'
  ],
  see: [
    { n: 'Yanaka Ginza',
      d: 'A short shopping street down a set of steps called Yuyake Dandan, best in the late afternoon when the light comes down it. Croquettes, senbei and a lot of cats.' },
    { n: 'Yanaka Cemetery',
      d: 'Ten hectares of graves under cherry trees, including Tokugawa Yoshinobu, the fifteenth and last shogun.' },
    { n: 'The temple lanes',
      d: 'Walk without a plan between Nippori and Nezu. Tennoji, Kannonji with its mud wall, and dozens of small gates.' },
    { n: 'SCAI The Bathhouse',
      d: 'A two-hundred-year-old sento converted into a contemporary gallery, keeping the shoe lockers.' },
    { n: 'Nezu Shrine',
      d: 'Fifteen minutes southwest. A 1706 complex that survived everything, with a tunnel of small red gates and azaleas in late April.' }
  ],
  when: 'Year round. Late March for cemetery blossom, late April for the Nezu azaleas.',
  stay: 'An afternoon.',
  move: 'Nippori or Sendagi station. The whole district is walked.',
  eat: 'Kayaba Coffee, a 1938 kissaten reopened in the original building. Himitsudo for shaved ice in summer, with a queue that regularly runs two hours.'
},

'TKY-shinjuku-gyoen': {
  intro: [
    'Fifty-eight hectares, a ten minute walk from the busiest station in the world. Shinjuku Gyoen was an imperial garden until 1949 and has three designed landscapes inside it: a French formal garden, an English landscape lawn, and a Japanese strolling garden with ponds and a teahouse.',
    'There are around a thousand cherry trees of sixty-five varieties. Because the varieties flower at different times, the bloom here runs from late February into late April rather than the usual single week, which makes it the most forgiving hanami spot in Tokyo.',
    'There is a small entry fee and, crucially, alcohol is banned. That keeps it calm when Ueno is a party.'
  ],
  see: [
    { n: 'The Japanese garden',
      d: 'Ponds, bridges and the Kyu Goryotei pavilion, a 1928 Chinese-style building given by Taiwanese residents. Best in the hour before closing.' },
    { n: 'Cherry blossom over two months',
      d: 'Kanzakura from late February, Somei Yoshino from late March, then the heavy pink Kanzan into late April.' },
    { n: 'The greenhouse',
      d: 'Free with entry, kept humid, with orchids and tropical species. Useful on a wet day.' },
    { n: 'Autumn',
      d: 'Mid to late November. The plane trees in the French section and the maples in the Japanese one turn at different times.' },
    { n: 'The lawn',
      d: 'Wide open grass with the Shinjuku towers rising directly behind it, which is a very particular Tokyo image.' }
  ],
  when: 'Closed Mondays. Open later in spring and autumn. The last entry is thirty minutes before closing and they enforce it.',
  stay: 'Two hours.',
  move: 'Shinjuku Gyoenmae on the Marunouchi line is the closest gate. From Shinjuku station it is about ten minutes on foot to the Shinjuku gate.',
  eat: 'A few kiosks inside. Better to eat in Shinjuku Sanchome before or after.'
},

'TKY-odaiba': {
  intro: [
    'Odaiba began as a set of gun batteries built in 1853 to keep Commodore Perry’s ships out of Edo. They failed at that, and two of the artificial islands are still there, one of which you can walk onto.',
    'The modern version is a reclaimed bayside development from the bubble years: malls, exhibition halls, a Ferris wheel and a replica Statue of Liberty that nobody can satisfactorily explain. It is not sophisticated.',
    'What it does have is the best view back at the Tokyo skyline, especially from the Rainbow Bridge walkway at dusk, and that is worth the trip by itself.'
  ],
  see: [
    { n: 'Walking the Rainbow Bridge',
      d: 'A free pedestrian deck on both sides, about 1.7 kilometres, closed on some Mondays. The north walkway faces the city. Takes half an hour and almost nobody does it.' },
    { n: 'teamLab',
      d: 'The digital art collective has had several Tokyo venues and they move; check which is open before travelling. Book online, wear something you do not mind getting wet.' },
    { n: 'Miraikan',
      d: 'The national science museum, with Asimo demonstrations and a genuinely good exhibit on the 2011 disaster and its aftermath.' },
    { n: 'Daiba Park',
      d: 'The surviving gun battery, reached on foot, with the earthworks and cannon emplacements still legible.' },
    { n: 'The Yurikamome',
      d: 'A driverless elevated line from Shimbashi that loops over the bridge. Sit at the very front.' }
  ],
  when: 'Year round, and it is largely indoors, so it is a reasonable rainy-day plan.',
  stay: 'Half a day.',
  move: 'Yurikamome from Shimbashi, or the Rinkai line. Water buses from Asakusa and Hinode are slower and better.',
  eat: 'Mall food courts, mostly. Decent ramen at the Tokyo Ramen Kokugikan on one of the mall floors.'
},

'TKY-ryogoku': {
  intro: [
    'Ryogoku is sumo. The Kokugikan arena hosts three of the six annual tournaments, in January, May and September, and the surrounding streets hold around forty stables where wrestlers live and train.',
    'A tournament day runs from morning through to the top division bouts around six in the evening. Cheap upper-tier seats sell on the day. The actual bouts last seconds; the ceremony around them lasts minutes, and that is most of what you are watching.',
    'Out of tournament season, some stables allow visitors to watch morning practice. Rules are strict, usually require a Japanese-speaking intermediary, and silence is expected.'
  ],
  see: [
    { n: 'A tournament day', t: 'January, May, September',
      d: 'Same-day tickets go on sale early at the arena. Arrive mid-afternoon for the upper divisions rather than sitting through the whole card.' },
    { n: 'Morning practice at a stable',
      d: 'Book through a guide or your hotel. Sit still, do not speak, no flash. It is a training session, not a show.' },
    { n: 'Chanko nabe',
      d: 'The stew wrestlers eat, served in restaurants run by retired rikishi. Tomoegata is the standard recommendation and deserves it.' },
    { n: 'Edo-Tokyo Museum',
      d: 'Closed for major renovation in recent years; check before going. When open it is the best single explanation of how this city grew.' },
    { n: 'The Sumida Hokusai Museum',
      d: 'A Kazuyo Sejima building near where Hokusai was born and lived most of his life.' }
  ],
  when: 'Tournament months if you can. Otherwise any time.',
  stay: 'Half a day, or a full day for a tournament.',
  move: 'Ryogoku on the Sobu and Oedo lines.',
  eat: 'Chanko, obviously, and there are a dozen places within five minutes of the arena.'
},

'TKY-koenji': {
  intro: [
    'Koenji is where Tokyo keeps its punk. The live houses here have been running since the 1970s, the secondhand clothes shops are among the best in Japan, and the bars are small, cheap and open very late.',
    'Shimokitazawa, three stops away on a different line, is the softer version: theatre, vintage, coffee and a record shop density that is hard to beat. The two make a good afternoon together.',
    'Neither has a sight. The point is to walk, go into shops, and end up somewhere with four seats and a good record collection.'
  ],
  see: [
    { n: 'The Koenji vintage strip',
      d: 'Several hundred secondhand shops between the station and Kita-Koenji. Sorted, cheap and genuinely good, which is rare.' },
    { n: 'Live houses',
      d: 'Koenji High, 20000V and others. Tickets at the door, usually with a mandatory drink.' },
    { n: 'Shimokitazawa',
      d: 'Theatre, curry, and record shops. Mikan Shimokita under the tracks is the newest development and has not ruined it yet.' },
    { n: 'Awa Odori', t: 'late August',
      d: 'Koenji hosts the largest Awa dance festival outside Tokushima, with around ten thousand dancers over two days.' },
    { n: 'Standing bars',
      d: 'Look for tachinomi. Three hundred yen a glass, nobody sits, conversation happens.' }
  ],
  when: 'Year round. Late August for the dance festival.',
  stay: 'An afternoon and evening.',
  move: 'Koenji on the Chuo line, about eight minutes from Shinjuku. Shimokitazawa on the Odakyu and Keio Inokashira lines.',
  eat: 'Curry is the local obsession in Shimokitazawa. In Koenji, ramen and izakaya with no English menu and no problem.'
},

'TKY-takao': {
  intro: [
    'Mount Takao gets around three million visitors a year, which makes it the most climbed mountain in the world. It is 599 metres, an hour from Shinjuku, and there is a cable car for most of the height.',
    'That sounds like it should be unbearable, and on an autumn Sunday it is. On a weekday morning it is a pleasant forest walk with a working temple halfway up and a view to Fuji from the top on a clear day.',
    'There are eight marked trails. Trail 6 follows a stream and is the best of them; the main Trail 1 is paved and busy.'
  ],
  see: [
    { n: 'Trail 6',
      d: 'Up a stream valley, partly walking in the water near the top. About ninety minutes, shaded, and a fraction of the crowd on the paved route.' },
    { n: 'Yakuoin',
      d: 'A working Shingon temple from 744, halfway up, with tengu statues and a fire ritual. Monks still train here.' },
    { n: 'The summit view',
      d: 'Fuji to the west on clear winter days. There is a small visitor centre and far too many people eating noodles.' },
    { n: 'Diamond Fuji', t: 'around the winter solstice',
      d: 'For a few days in December the sun sets directly behind Fuji as seen from the summit. People queue for hours.' },
    { n: 'Takaosan Onsen',
      d: 'At the base by the station. Exactly what you want after coming down.' }
  ],
  when: 'November for autumn colour, which is spectacular and extremely crowded. Weekday mornings any time of year.',
  stay: 'Half a day from central Tokyo.',
  move: 'Keio line from Shinjuku to Takaosanguchi, about fifty minutes. Cable car or chairlift from the base.',
  eat: 'Soba at the base and on the mountain. Tororo soba, with grated yam, is the local dish.'
},

'TKY-toyosu': {
  intro: [
    'Toyosu took over from Tsukiji as the wholesale market in October 2018, after years of delay over soil contamination at the site. It is clean, enormous, climate-controlled and almost entirely behind glass.',
    'The tuna auction still happens around half past five in the morning. You watch it from an observation window above the floor, which is a different experience from standing on it, and most people find it less atmospheric than they hoped.',
    'The restaurants that moved over from Tsukiji are the real draw, and they open early.'
  ],
  see: [
    { n: 'The tuna auction', t: 'from about 5:30am',
      d: 'A free upper gallery takes walk-ups; a limited lower deck is balloted online a month ahead. Either way you need to be there before the trains really start, so allow for a taxi.' },
    { n: 'Breakfast sushi',
      d: 'Sushi Dai and Daiwa Sushi both relocated here. Queues start before six and run two hours. The places on the fifth floor of the fruit and vegetable building are nearly as good with no wait.' },
    { n: 'The fruit and vegetable market',
      d: 'Less famous than the fish and more interesting than it sounds, with perfect produce graded to an absurd standard.' },
    { n: 'Senkyaku Banrai',
      d: 'A hot spring and food complex opened beside the market in 2024, with a rooftop bath looking over the bay.' },
    { n: 'Tsukiji outer market',
      d: 'Fifteen minutes away and still the better eating.' }
  ],
  when: 'Closed Sundays and most Wednesdays. Check the market calendar, which is published online.',
  stay: 'Two or three hours, very early.',
  move: 'Shijo-mae on the Yurikamome. At auction hours you will need a taxi.',
  eat: 'Breakfast here and skip lunch.'
},

'TKY-ogasawara': {
  intro: [
    'The Ogasawara Islands are a thousand kilometres south of Tokyo, administratively part of the city, and reachable only by a twenty-four hour ferry that runs roughly once a week. There is no airport and there has never been one.',
    'They have never been connected to any continent, so the plants and animals evolved in isolation. Around forty per cent of the native plants are found nowhere else, which is why UNESCO listed them in 2011 and why the biosecurity on arrival is taken seriously.',
    'The ferry schedule means a visit is effectively six days minimum: a day there, four on the islands, a day back. That filters out almost everybody, which is the reason to go.'
  ],
  see: [
    { n: 'Humpback whales', t: 'February to April',
      d: 'They breed here. Boats go out daily in season and sightings are close to certain.' },
    { n: 'Dolphin swimming',
      d: 'Spinner and bottlenose pods, with operators running snorkel trips. Year round, best in summer.' },
    { n: 'Minamijima',
      d: 'A small island with a sunken limestone basin and a beach, access capped at a hundred people a day with a licensed guide.' },
    { n: 'Hahajima',
      d: 'Two hours further by local ferry, with about four hundred residents and a trail along the ridge.' },
    { n: 'The farewell',
      d: 'When the ferry leaves, the island’s boats escort it out of the bay and the crews jump into the sea. It is completely sincere and hard to watch dry-eyed.' }
  ],
  when: 'Year round. February to April for whales, summer for water clarity. Typhoons can cancel sailings between July and October.',
  stay: 'Six days, minimum, because that is what the ferry dictates.',
  move: 'Ogasawara Maru from Takeshiba pier in Tokyo, roughly weekly, twenty-four hours. Book months ahead for summer.',
  eat: 'Island fish, sea turtle in a few places, and passion fruit. Limited choice and limited opening hours.'
},

'TKY-izu-oshima': {
  intro: [
    'Izu Oshima is an active volcano about a hundred kilometres south of Tokyo, reachable in under two hours by jet ferry. Mount Mihara erupted in 1986 and the entire population of ten thousand was evacuated for a month.',
    'The crater is walkable, the lava fields from 1986 are still bare, and there is a black sand desert on the eastern flank that is the only place in Japan officially called a desert.',
    'Camellias are the other thing. Around three million of them, flowering from January, with a festival through late winter.'
  ],
  see: [
    { n: 'Mount Mihara crater',
      d: 'A bus to the rim and a walk around it, through lava from 1986 and 1950. About ninety minutes for the loop.' },
    { n: 'Ura-sabaku', t: 'the back desert',
      d: 'Black volcanic sand with nothing growing on it, and a view down to the sea. Strange and quiet.' },
    { n: 'The camellia festival', t: 'late January to late March',
      d: 'Three million trees, an island-wide festival, and a camellia garden with over four hundred varieties.' },
    { n: 'Layered rock cliff',
      d: 'A road cutting exposing a hundred and more ash layers laid down over fifteen thousand years. Geology you can read from a car park.' },
    { n: 'Onsen with a view',
      d: 'Several outdoor baths face west towards Fuji across the water.' }
  ],
  when: 'January to March for camellias, spring and autumn for walking. Ferries are weather-dependent.',
  stay: 'One or two nights.',
  move: 'Jet ferry from Takeshiba in about an hour and three quarters, or a large ferry overnight. Flights from Chofu take twenty-five minutes.',
  eat: 'Bekko-zushi, white fish marinated in chilli and soy, which is the island dish. Ashitaba greens in everything.'
},

'TKY-kichijoji': {
  intro: [
    'Kichijoji regularly tops surveys of where Tokyoites most want to live, and after a day there the reason is obvious. It has a large park with a boating pond, a dense covered shopping arcade, a jazz and live music scene, and a street of tiny bars, all within ten minutes of each other.',
    'Inokashira Park is the anchor. It was Tokyo’s first suburban park, opened in 1917, and the pond at the centre is where every Tokyo couple is warned not to take a rowing boat, because the goddess enshrined on the island is said to be jealous and split them up.',
    'The Ghibli Museum sits at the far end of the park. Tickets are sold by lottery, in advance, and they go instantly.'
  ],
  see: [
    { n: 'Ghibli Museum',
      d: 'Tickets released monthly for the following month and gone in minutes. No photography inside, which is the point: it is designed to be looked at rather than documented. A short original film screens in the small cinema.' },
    { n: 'Inokashira Park',
      d: 'Rowing boats, a shrine on an island, five hundred cherry trees leaning over the water in late March. Street performers at weekends.' },
    { n: 'Harmonica Yokocho',
      d: 'A warren of about a hundred tiny bars and shops in a black-market-era grid beside the station. Busy from six.' },
    { n: 'Sun Road and the arcades',
      d: 'Covered shopping streets with everything from department stores to a famous menchi katsu stall with a permanent queue.' },
    { n: 'Jazz kissa',
      d: 'Meg and others. Coffee, enormous speakers and a rule about not talking. A dying tradition and worth an hour.' }
  ],
  when: 'Year round. Late March for blossom over the pond.',
  stay: 'A day.',
  move: 'Chuo and Inokashira lines, about fifteen minutes from Shinjuku. The Ghibli Museum is a fifteen-minute walk through the park or a short bus from Mitaka.',
  eat: 'Menchi katsu at Satou, yakitori at Iseya by the park gate, and the whole of Harmonica Yokocho after dark.'
},

/* ===================== KANAGAWA ===================== */
'KNG-hakone': {
  intro: [
    'Hakone is a volcanic caldera an hour and a half from Shinjuku, and it has been where Tokyo goes to sit in hot water for about four hundred years. The Tokaido highway ran through it, and the checkpoint that controlled travel to Edo has been reconstructed on the lake shore.',
    'The standard way round is the loop: mountain railway with switchbacks, funicular, ropeway over a steaming valley, pirate ship across the lake, bus back. It sounds like a theme park and it is slightly ridiculous, but it works, and the Hakone Free Pass covers all of it.',
    'Fuji appears over the lake on maybe a third of days. Winter mornings give the best odds by a wide margin.'
  ],
  see: [
    { n: 'Owakudani',
      d: 'A sulphur valley from an eruption three thousand years ago, reached by ropeway. Eggs boiled in the hot springs come out black and are said to add seven years to your life. The ropeway shuts when gas levels rise, which happens.' },
    { n: 'Hakone Open-Air Museum',
      d: 'Sculpture across seven hectares of hillside, a Picasso pavilion, and a foot bath. Much better than it needs to be.' },
    { n: 'Lake Ashi and the Hakone Shrine gate',
      d: 'The red torii stands in the water. The queue for a photograph in front of it runs about an hour at weekends.' },
    { n: 'Hakone Checkpoint',
      d: 'A careful reconstruction of the Edo-period barrier that controlled who moved along the Tokaido, with the original cedar avenue nearby.' },
    { n: 'A ryokan with a private bath',
      d: 'The real reason to stay the night. Many rooms have their own rotenburo, which is also the answer if you have tattoos.' }
  ],
  when: 'Year round. November for autumn colour, winter mornings for Fuji. Avoid autumn weekends unless you enjoy queueing.',
  stay: 'One night. A day trip is possible and rushed.',
  move: 'Odakyu Romancecar from Shinjuku to Hakone-Yumoto. The Hakone Free Pass covers the whole loop and pays for itself immediately.',
  eat: 'Ryokan kaiseki. In the day, soba at Hatsuhana and the black eggs at Owakudani.'
},

'KNG-kamakura': {
  intro: [
    'Kamakura was the seat of government from 1185 to 1333, the first time power sat outside Kyoto. The shogunate here ran the country from a valley open to the sea on one side and closed by hills on the other three, which is why the approach roads are cut through rock.',
    'What it left behind is sixty-five temples and nineteen shrines in a small area, plus a bronze Buddha that has sat in the open since a tsunami took its hall away in 1498. Thirteen metres, cast in 1252, and you can go inside it for twenty yen.',
    'It is an hour from Tokyo and it is busy, particularly in hydrangea season. The hiking trails through the hills behind the temples are the escape route.'
  ],
  see: [
    { n: 'The Great Buddha at Kotokuin',
      d: 'Go early. Walk round it and look at the lines of the bronze plates, then pay the extra to go inside and see the casting from within.' },
    { n: 'Hasedera',
      d: 'A nine-metre wooden Kannon, a sea view from the terrace, and a cave of small carved figures. In June the hydrangea path needs a timed ticket.' },
    { n: 'Tsurugaoka Hachimangu',
      d: 'The shrine at the head of the main avenue, approached along a raised path built for a shogun’s pregnant wife.' },
    { n: 'Hokokuji',
      d: 'The bamboo temple. Two thousand stems, a tea house at the back, and far fewer people than Arashiyama in Kyoto.' },
    { n: 'The Daibutsu hiking trail',
      d: 'About ninety minutes over the hills from Kita-Kamakura to the Great Buddha, past Zeniarai Benten where people wash money in a cave spring.' },
    { n: 'The Enoden line',
      d: 'A single-track tram that runs along the coast to Enoshima, squeezing between houses. Sit on the sea side.' }
  ],
  when: 'June for hydrangeas, November for colour, any weekday to avoid the worst. Summer brings beach traffic.',
  stay: 'A full day, or a night to see the temples at opening time.',
  move: 'Yokosuka line from Tokyo, about an hour. Rent a bicycle or use the Enoden.',
  eat: 'Shirasu, tiny whitebait, raw or boiled over rice, is the local dish. Komachi-dori is the snack street and is extremely crowded.'
},

'KNG-yokohama': {
  intro: [
    'Yokohama was a fishing village of about six hundred people when it was opened to foreign trade in 1859. Within fifty years it was Japan’s main port and its window on the West: the first newspaper, the first railway, the first ice cream and the first beer in the country all happened here.',
    'It is now the second-largest city in Japan by population and feels nothing like Tokyo. The waterfront works, the streets are wide, and there is a genuine sense of a city that faces outward.',
    'Chinatown is the largest in Asia outside China, with about six hundred restaurants in a few blocks.'
  ],
  see: [
    { n: 'Minato Mirai waterfront',
      d: 'Walk from Sakuragicho along the water to the Red Brick Warehouses. A Ferris wheel with a clock face, a preserved sail training ship, and a decent skyline.' },
    { n: 'Chinatown',
      d: 'Go for dinner. The gates are landmarks, the main streets are touristy, and the good places are one block off them.' },
    { n: 'Sankeien Garden',
      d: 'A silk merchant moved seventeen historic buildings here from Kyoto, Kamakura and Gifu between 1906 and 1922, including a three-storey pagoda from 1457. The best thing in the city and most visitors miss it.' },
    { n: 'Cup Noodles Museum',
      d: 'Sounds like a joke, is actually a well-designed museum about invention, and you can make your own cup. Children love it.' },
    { n: 'Motomachi and the Bluff',
      d: 'The old foreign residential quarter on the hill, with Western houses, a foreign cemetery and good shopping below.' }
  ],
  when: 'Year round. The waterfront is best on a clear evening.',
  stay: 'A day, or an evening from Tokyo.',
  move: 'Twenty-five minutes from Tokyo station. The Minatomirai line serves the waterfront.',
  eat: 'Chinatown, obviously. Also Yokohama-style ramen, which is a soy-and-pork broth with thick straight noodles, and the Shin-Yokohama Ramen Museum has regional shops in a replica 1958 street.'
},

'KNG-enoshima': {
  intro: [
    'Enoshima is a small island joined to the shore by a bridge, with a shrine complex, a set of sea caves and a lighthouse tower at the top. The goddess enshrined here is said to have risen from the sea and subdued a five-headed dragon that had been eating local children.',
    'It is the beach end of a day from Kamakura, reached on the Enoden tram, and in summer it is extremely busy. Out of season it is a pleasant climb with Fuji across the water at sunset.',
    'There are escalators up the hill if the steps look unappealing, which they will by the third flight.'
  ],
  see: [
    { n: 'The shrine complex',
      d: 'Three shrines up the hill, the oldest of which claims a founding in 552. The naked Benzaiten statue in the Hoanden hall is unusual enough to be worth the extra ticket.' },
    { n: 'Iwaya Caves',
      d: 'Sea caves at the far end, lit with candles handed to you at the entrance. Closed in rough weather.' },
    { n: 'Sea Candle',
      d: 'The observation tower in the garden at the top, with Fuji to the west and the Boso peninsula east.' },
    { n: 'Sunset from the west side',
      d: 'In winter, the sun goes down beside Fuji from here. This is the postcard.' },
    { n: 'Shirasu-don',
      d: 'Whitebait over rice, raw if the boats went out that morning. Every second place on the approach sells it.' }
  ],
  when: 'October to April for clear Fuji views and no crowds. Summer is for the beach and is heaving.',
  stay: 'Half a day.',
  move: 'Enoden from Kamakura, or Odakyu from Shinjuku to Katase-Enoshima, where the station is built to look like a Chinese palace for no clear reason.',
  eat: 'Whitebait everywhere. Grilled sazae shellfish from the stalls on the climb.'
},

'KNG-odawara': {
  intro: [
    'Odawara Castle belonged to the Hojo, who held it against every attempt for a century, including a siege by Takeda Shingen. It fell in 1590 to Toyotomi Hideyoshi, who did not storm it. He built a castle of his own on the hill opposite, apparently overnight behind a screen of trees, and the shock of seeing it finished broke the defenders’ nerve.',
    'The keep today is a 1960 concrete reconstruction with a museum inside. The stonework and the moat are real, and the grounds are good.',
    'Most people pass through Odawara changing trains for Hakone. It is worth an hour if you have one.'
  ],
  see: [
    { n: 'The keep and the grounds',
      d: 'A reconstruction, but the gates and the earthworks give you the scale. The top floor looks out to Sagami Bay.' },
    { n: 'The Ninja Museum',
      d: 'In the castle park, aimed at children, and fairly entertaining if you have any.' },
    { n: 'Odawara fish market',
      d: 'Near the port, with kamaboko fish cake, which the town has made for four hundred years.' },
    { n: 'Hakone from here',
      d: 'This is the gateway. Hakone-Yumoto is fifteen minutes up the line.' }
  ],
  when: 'Year round. Cherry blossom in the castle grounds in late March.',
  stay: 'An hour or two in transit.',
  move: 'Shinkansen stop, and the Odakyu line from Shinjuku. The castle is a ten-minute walk from the station.',
  eat: 'Kamaboko, and good sushi near the port.'
},

'KNG-zushi-hayama': {
  intro: [
    'Zushi and Hayama are where Tokyo keeps its sailing boats. The imperial family has a villa at Hayama, which set the tone about a century ago, and the coast here has stayed low-rise and residential in a way the rest of Sagami Bay has not.',
    'The beaches are smaller and quieter than Kamakura’s, the surf is gentle, and there is a modern art museum sitting directly on the sand.',
    'It is a half-hour from Kamakura and a different pace entirely.'
  ],
  see: [
    { n: 'Museum of Modern Art, Hayama',
      d: 'On the shore with a sculpture terrace and a cafe facing the water. The building is the point as much as the collection.' },
    { n: 'Morito Shrine',
      d: 'A torii standing on a rock offshore, with Fuji behind it at sunset in clear weather.' },
    { n: 'Isshiki Beach',
      d: 'Consistently rated among the best beaches near Tokyo. Quiet, clean and backed by pine.' },
    { n: 'Sailing and sea kayaking',
      d: 'Several operators in Zushi marina. The bay is sheltered and forgiving.' }
  ],
  when: 'May to October for the water, winter for the Fuji views.',
  stay: 'A day, or a night at a small inn.',
  move: 'Yokosuka line to Zushi, about an hour from Tokyo, then a bus along the coast.',
  eat: 'Beachfront cafes, several of them good. Fish at the small ports.'
},

'KNG-kawasaki': {
  intro: [
    'Kawasaki is industrial, wedged between Tokyo and Yokohama, and its most unexpected tourist draw is the factory night view. Boat and bus tours run through the petrochemical plants after dark, which sounds grim and is genuinely spectacular.',
    'The other reason to stop is Nihon Minkaen, an open-air museum of twenty-five traditional houses relocated from across Japan, including thatched farmhouses from the snow country and a kabuki stage.',
    'There is also Kawasaki Daishi, a major temple that draws some of the largest New Year crowds in the country.'
  ],
  see: [
    { n: 'Nihon Minkaen',
      d: 'Twenty-five relocated buildings across a wooded hillside, several of them walk-in with fires lit inside. The best thing in the city by a distance.' },
    { n: 'Factory night cruise',
      d: 'Boats from Kawasaki Marien through the industrial waterfront. Book ahead; they run limited dates.' },
    { n: 'Kawasaki Daishi',
      d: 'A Shingon temple founded 1128, with a shopping street where sweet shops cut candy to a rhythmic chant.' },
    { n: 'Fujiko F Fujio Museum',
      d: 'The Doraemon museum, ticketed by advance lottery, and charming if the character means anything to you.' }
  ],
  when: 'Year round. New Year at the temple is enormous.',
  stay: 'Half a day.',
  move: 'Fifteen minutes from Tokyo on the Tokaido line. Minkaen is near Mukogaoka-Yuen on the Odakyu line.',
  eat: 'Not a destination for it. Yokohama is twenty minutes away.'
},

'KNG-miura': {
  intro: [
    'The Miura peninsula is the southern tip of Kanagawa, about ninety minutes from Tokyo, and it is almost entirely ignored by foreign visitors. Misaki port is one of Japan’s historic tuna landing ports and the market and restaurants around it trade on that.',
    'Jogashima, at the end, is a small island joined by a bridge with wave-cut rock platforms and a lighthouse. At low tide you can walk out onto them.',
    'There is also a tidal island, Araihama, that you can walk to when the sea allows, and a lot of cabbage fields.'
  ],
  see: [
    { n: 'Misaki port and the tuna',
      d: 'The morning market on weekends, and restaurants serving the catch within walking distance of where it lands.' },
    { n: 'Jogashima',
      d: 'Rock platforms, sea caves and a lighthouse. Windy and good walking.' },
    { n: 'Araihama and Kurozaki no Hana',
      d: 'A tidal causeway and a headland of folded rock strata that geologists come for.' },
    { n: 'Keikyu Misaki Maguro ticket',
      d: 'A combined rail, bus and meal ticket that is good value and makes the day simple.' }
  ],
  when: 'Year round. Winter is clear and windy; summer brings beach traffic.',
  stay: 'A day from Tokyo.',
  move: 'Keikyu line to Misakiguchi, then bus.',
  eat: 'Tuna, in every cut and at every price. Misaki is the whole reason to come.'
},

'KNG-ashinoko': {
  intro: [
    'Lake Ashi fills part of the Hakone caldera, formed by an eruption around three thousand years ago. It is deep, cold and usually has a boat on it shaped like a seventeenth-century galleon, which nobody has ever adequately justified.',
    'The red torii of Hakone Shrine stands in the water at the north end and has become one of the most photographed objects in Japan. There is a dedicated queue for the shot and it is managed by staff.',
    'On a clear day Fuji sits directly behind the lake from the southern end. It is the classic Hakone image and it is not available most days.'
  ],
  see: [
    { n: 'The torii in the water',
      d: 'Heiwa no Torii at Hakone Shrine. Queue times of an hour are normal at weekends. Early morning or a weekday is the answer.' },
    { n: 'The pirate ship',
      d: 'Forty minutes across the lake between Togendai and Moto-Hakone. Covered by the Hakone Free Pass. Silly and pleasant.' },
    { n: 'Hakone Shrine',
      d: 'Up a cedar-lined stair from the lake. Founded 757 and genuinely atmospheric once you are off the waterfront.' },
    { n: 'The old Tokaido cedar avenue',
      d: 'Four hundred trees planted in 1618 along the old highway, with a walkable stretch beside the lake.' },
    { n: 'Onshi Hakone Park',
      d: 'A former imperial villa site on a promontory with the best free lake and Fuji view.' }
  ],
  when: 'Winter mornings for Fuji. November for colour.',
  stay: 'Part of a Hakone day or overnight.',
  move: 'Bus or boat within the Hakone loop.',
  eat: 'Lakeside restaurants are mediocre and priced for captives. Eat at your inn.'
},

/* ===================== CHIBA ===================== */
'CHB-narita': {
  intro: [
    'Naritasan Shinshoji was founded in 940 and has nothing to do with the airport beyond the name. It is a large, working Shingon temple with a fire ritual performed several times a day, a three-storey pagoda from 1712, and a hundred and sixty-five thousand square metres of park behind it.',
    'The approach, Omotesando, runs about eight hundred metres downhill from the station and is lined with eel restaurants. Several of them prepare the fish in the window, which is not for everyone.',
    'If you have a long layover, this is the best possible use of it. The temple is twenty minutes from the terminal.'
  ],
  see: [
    { n: 'The goma fire ritual',
      d: 'Several times daily in the main hall. Monks burn wooden tablets while drumming; you can have belongings blessed in the smoke afterwards. Free, and genuinely impressive.' },
    { n: 'Omotesando',
      d: 'The old approach street, with eel grilling over charcoal and a few surviving wooden inns.' },
    { n: 'Naritasan Park',
      d: 'Behind the temple, with ponds, a plum grove and good autumn colour. Almost nobody walks back here.' },
    { n: 'The Great Pagoda of Peace',
      d: 'A 1984 addition, fifty-eight metres, slightly jarring against the older buildings and worth seeing for the interior.' }
  ],
  when: 'Year round. Setsubun in early February brings sumo wrestlers throwing beans.',
  stay: 'Two to three hours, which fits a layover.',
  move: 'Narita station, ten minutes from the airport on the Keisei line. Coin lockers at the station take luggage.',
  eat: 'Unagi. Kawatoyo on the approach has been doing it since 1910 and the queue moves.'
},

'CHB-boso': {
  intro: [
    'The Boso peninsula is the land east of Tokyo Bay: surf beaches on the Pacific side, fishing ports, and a climate warm enough that flowers are harvested in January.',
    'Olympic surfing was held at Tsurigasaki in 2021, which raised the profile, and the breaks along this coast are the most consistent within reach of Tokyo.',
    'Inland is mostly rice and small hills. The coastal road south from Onjuku is the drive worth making.'
  ],
  see: [
    { n: 'Surfing at Tsurigasaki and Onjuku',
      d: 'Board hire and lessons in English at several Ichinomiya shops. Beach breaks, forgiving, busiest at weekends.' },
    { n: 'Nojimazaki lighthouse',
      d: 'At the southern tip, one of the oldest Western-style lighthouses in Japan, climbable, with a wide ocean horizon.' },
    { n: 'The flower fields', t: 'January to March',
      d: 'Around Tateyama and Shirahama, where poppies and stock are picked in winter because the Kuroshio current keeps the frost off.' },
    { n: 'Kujukuri beach',
      d: 'Sixty kilometres of continuous sand up the Pacific coast. Not beautiful, genuinely vast.' },
    { n: 'Sawara',
      d: 'Inland and north, a preserved canal town worth its own entry.' }
  ],
  when: 'Surf is best from late summer into autumn. Flowers January to March. Summer weekends are busy.',
  stay: 'A night or two; a car makes this much better.',
  move: 'Sotobo and Uchibo lines circle the peninsula slowly. Driving is faster and the coast road is the point.',
  eat: 'Sazae shellfish grilled in the shell, and very good local fish at the ports.'
},

'CHB-nokogiriyama': {
  intro: [
    'Nokogiriyama means saw mountain, for the jagged profile left by two hundred years of quarrying. Stone was cut from here from the Edo period until 1985 and shipped across the bay, which is why the faces are sheer and oddly rectilinear.',
    'Nihonji temple occupies the mountain. It holds a thirty-one metre seated Buddha carved from the rock in 1783, which is the largest stone Buddha in Japan, and about fifteen hundred small stone arhats, many of them headless from anti-Buddhist destruction in the 1860s.',
    'The highlight is a viewing platform jutting out over a hundred-metre drop, with no comfortable way to look down. It is called the view from hell and the name fits.'
  ],
  see: [
    { n: 'Jigoku Nozoki', t: 'the view from hell',
      d: 'A rock shelf projecting over the quarry face. Queue, step out, look down briefly, step back.' },
    { n: 'The Great Buddha',
      d: 'Thirty-one metres, carved in situ, weathered and restored in the 1960s. Taller than Nara’s and almost unvisited by comparison.' },
    { n: 'The Thousand Arhats',
      d: 'Fifteen hundred stone figures along the paths, each with a different face, many deliberately beheaded during the Meiji persecution of Buddhism.' },
    { n: 'The ferry across Tokyo Bay',
      d: 'From Kurihama to Kanaya, forty minutes, with the mountain in front of you as you arrive. Much the best approach.' },
    { n: 'The ropeway',
      d: 'Four minutes up, saving a steep climb. Walk down if your knees allow.' }
  ],
  when: 'Year round. Clear winter days give Fuji across the bay.',
  stay: 'Half a day.',
  move: 'Tokyo Bay ferry from Kurihama to Kanaya, then a short walk. Or the Uchibo line to Hamakanaya.',
  eat: 'Seafood at the ferry terminal in Kanaya, which is better than a ferry terminal has any right to be.'
},

'CHB-katsuura': {
  intro: [
    'Katsuura has run a morning market for over four hundred years, which puts it among the three oldest in Japan. It sets up in the street from about half past six, six days a week, and sells vegetables, fish and pickles to local people rather than to visitors.',
    'It is also one of the coolest places in Japan in August. The sea breeze and the topography mean it has never recorded a temperature above thirty-five degrees, which the town advertises and which is a genuine selling point in a Japanese summer.',
    'Katsuura is a working tuna port, and the fish comes off the boats here.'
  ],
  see: [
    { n: 'The morning market', t: 'from 6:30am, closed Wednesdays',
      d: 'Stalls along Shimohon-cho. Go early and expect to be the only visitor.' },
    { n: 'Katsuura Undersea Observation Tower',
      d: 'A tower in the bay reached by a walkway, with windows below the waterline. Fish, kelp and a view of the open Pacific.' },
    { n: 'Tankan tuna',
      d: 'Landed here and eaten here. Several places by the harbour serve it over rice for a fraction of Tokyo prices.' },
    { n: 'Katsuura Big Hina Matsuri', t: 'late February',
      d: 'Thirty thousand doll figures arranged on shrine steps and through the town for the girls’ festival.' }
  ],
  when: 'The market is year round. August if you want to escape the heat. Late February for the doll festival.',
  stay: 'A night.',
  move: 'Sotobo line from Chiba, about an hour and a half from Tokyo.',
  eat: 'Katsuura tantanmen, a spicy ramen developed for fishermen coming off cold boats, and the tuna.'
},

'CHB-sawara': {
  intro: [
    'Sawara grew rich shipping rice and sake down the Tone river to Edo, and the merchant houses along its canal survive in better condition than almost anywhere else in the Kanto plain. Willows, stone embankments and boats poled by a guide who sings.',
    'The town’s famous son is Ino Tadataka, who retired from the sake business at fifty, learned surveying, and then walked the entire coastline of Japan over seventeen years to produce the first accurate map of the country. His house and a museum of his work are both here.',
    'The map was accurate to within about a thousandth. The British Navy used copies of it decades later.'
  ],
  see: [
    { n: 'The canal and a boat',
      d: 'Thirty minutes, poled, with commentary. The water level and the willows make this the best thing in town.' },
    { n: 'Ino Tadataka Museum',
      d: 'His instruments, notebooks and the maps themselves, which are extraordinary objects. Allow an hour.' },
    { n: 'The merchant houses',
      d: 'Several open, including a soy sauce brewer and a rice merchant. Look for the stone warehouses behind.' },
    { n: 'Katori Jingu',
      d: 'Ten minutes away, one of the three oldest shrines in eastern Japan, in a cedar grove with a black-lacquered hall.' },
    { n: 'The Grand Festival', t: 'July and October',
      d: 'Enormous floats with figures on top hauled through the narrow streets, accompanied by Sawara-bayashi music.' }
  ],
  when: 'Year round. July and October for the festivals; early summer for the irises at nearby Suigo Sawara park.',
  stay: 'Half a day, easily combined with Narita.',
  move: 'Narita line from Narita, about thirty minutes. The old town is a ten-minute walk from the station.',
  eat: 'Grilled eel and soba. The sake breweries in town give tastings.'
},

/* ===================== SAITAMA ===================== */
'STM-kawagoe': {
  intro: [
    'Kawagoe is called Little Edo, which is the kind of label that usually means disappointment. Here it holds up. The main street is lined with kurazukuri, thick-walled clay merchant warehouses built to survive fire, and about thirty of them survive in a row.',
    'They survive because of a fire. In 1893 most of the town burned, and the buildings that stood were the fireproof warehouses, so everyone rebuilt in that style. It is a nineteenth-century streetscape created by a disaster.',
    'The bell tower has marked the hours since the 1600s, in its fourth incarnation, and still rings four times a day. All of this is thirty minutes from Ikebukuro.'
  ],
  see: [
    { n: 'Kurazukuri Street',
      d: 'The warehouse row. Go on a weekday; weekends bring coach parties and the street is narrow with traffic still running through it.' },
    { n: 'Toki no Kane',
      d: 'The bell tower, sixteen metres, ringing at 6, noon, 3 and 6. Rebuilt after the 1893 fire.' },
    { n: 'Kashiya Yokocho',
      d: 'Candy alley. About twenty shops making sweets and senbei, a trade that started here supplying Tokyo after the 1923 earthquake.' },
    { n: 'Kitain',
      d: 'A temple holding the only surviving buildings from Edo Castle, moved here after a fire in 1638, and five hundred and forty stone rakan figures with individual faces.' },
    { n: 'Hikawa Shrine',
      d: 'A tunnel of glass wind chimes in summer, and a fifteen-metre torii made of wood.' }
  ],
  when: 'Year round. The October festival hauls twenty-nine floats through the streets and is a national intangible cultural property.',
  stay: 'Half a day.',
  move: 'Tobu Tojo line from Ikebukuro to Kawagoe, about thirty minutes. The old town is a fifteen-minute walk or a short bus from the station.',
  eat: 'Sweet potato in every conceivable form, which is the local speciality. Unagi is the other one, and there are several old eel restaurants.'
},

'STM-chichibu': {
  intro: [
    'Chichibu sits in a basin in the mountains of western Saitama, about ninety minutes from Ikebukuro, and it is the closest place to Tokyo that feels properly rural.',
    'The Chichibu Night Festival on 2 and 3 December is the reason most people come. Six floats weighing up to twenty tonnes are hauled up a slope by hundreds of people while fireworks go off overhead, in freezing weather, until late. It is one of the three great float festivals in Japan.',
    'The rest of the year it is a pilgrimage circuit of thirty-four temples, a limestone gorge, and shibazakura that covers a hillside in pink in April.'
  ],
  see: [
    { n: 'Chichibu Yomatsuri', t: '2 to 3 December',
      d: 'Book accommodation months ahead or plan to travel back late. The floats go up Dango-zaka around eight in the evening and that is the moment.' },
    { n: 'The thirty-four temple pilgrimage',
      d: 'A hundred kilometres through the hills, walkable in about a week, or sample a few by bus. Quieter than Shikoku and much closer.' },
    { n: 'Hitsujiyama Park', t: 'mid-April to early May',
      d: 'Forty thousand shibazakura in bands of pink and white with Mount Buko behind. Very popular and worth the early start.' },
    { n: 'Nagatoro',
      d: 'Down the valley, for boat rapids and the rock terraces.' },
    { n: 'Mitsumine Shrine',
      d: 'High in the mountains, approached through cedar, guarded by wolves rather than lions. Often above the cloud.' }
  ],
  when: 'December for the festival, April for shibazakura, autumn for colour.',
  stay: 'A day trip, or a night if you want the festival.',
  move: 'Seibu Chichibu line from Ikebukuro, with a limited express. Local trains loop onward to Nagatoro.',
  eat: 'Soba and miso potatoes. Chichibu also has a well-regarded whisky distillery, though tours are hard to get.'
},

'STM-omiya-bonsai': {
  intro: [
    'After the 1923 earthquake destroyed much of Tokyo, a group of bonsai nurserymen moved out to Omiya where the soil and the air suited them, and founded a village with rules: every household had to keep at least ten trees, the hedges had to be open, and the houses single-storey.',
    'At its peak there were thirty nurseries. Six remain, and together they are still the centre of the bonsai world. Collectors come here from everywhere.',
    'The municipal museum opened in 2010 and is the best introduction anywhere to what bonsai actually is, which is not a small tree in a pot but a hundred-year-old argument between a person and a plant.'
  ],
  see: [
    { n: 'Omiya Bonsai Art Museum',
      d: 'Well-labelled, with a rotating display chosen for the season and an explanation of styles that makes everything else make sense. Photography restricted in parts.' },
    { n: 'The nurseries',
      d: 'Several are open to visitors during the day. You are a guest in a working business; ask before photographing and do not touch anything.' },
    { n: 'The Great Bonsai Festival', t: 'early May',
      d: 'Held in Omiya during Golden Week, with sales and exhibitions.' },
    { n: 'Hikawa Shrine, Omiya',
      d: 'A two-kilometre avenue of trees leading to a major shrine, and the origin of the town’s name.' }
  ],
  when: 'Year round, and each season shows different trees. Museum closed Thursdays.',
  stay: 'Half a day.',
  move: 'Toro station on the Utsunomiya line, or Omiya-koen on the Tobu Noda line. Thirty to forty minutes from central Tokyo.',
  eat: 'Nothing notable. Eat in Omiya proper.'
},

'STM-nagatoro': {
  intro: [
    'The Arakawa cuts through a band of crystalline schist at Nagatoro, producing flat rock terraces along the bank that have been a protected natural monument since 1924. Japanese geology as a discipline more or less started here, with a Tokyo professor bringing students out in the 1880s.',
    'The thing to do is take a wooden boat down the rapids. Boatmen pole and steer through about three kilometres of river, and you will get wet in the second half.',
    'It is an easy day from Tokyo and it is pleasantly unglamorous.'
  ],
  see: [
    { n: 'The river boats',
      d: 'Two courses, upper and lower, about twenty minutes each, or a combined run. Covered boats operate in winter with a kotatsu under the seats.' },
    { n: 'Iwadatami',
      d: 'The rock terraces. You can walk out onto them from the bank near the station.' },
    { n: 'The Chichibu Railway steam train',
      d: 'Runs on weekends in season between Kumagaya and Mitsumineguchi. Book ahead.' },
    { n: 'Hodosan Shrine and ropeway',
      d: 'A shrine at the base and a ropeway up for a valley view, with wintersweet flowering in January.' }
  ],
  when: 'Spring for blossom along the river, autumn for colour, summer for getting wet. Boats run most of the year.',
  stay: 'A day trip.',
  move: 'Chichibu Railway from Kumagaya, or Seibu line to Seibu-Chichibu and change.',
  eat: 'Soba and river fish at the stalls near the boat landing.'
},

/* ===================== KYOTO ===================== */
'KYT-kiyomizu': {
  intro: [
    'The stage at Kiyomizu-dera projects thirteen metres out over the hillside on a frame of keyaki pillars assembled without a single nail. It was rebuilt in 1633 and the joinery has held through earthquakes ever since.',
    'There was once a belief that if you jumped off it and survived, your wish would be granted. Edo-period records list two hundred and thirty-four jumps, with a survival rate of about eighty-five per cent, helped by the soft ground and the trees. The practice was banned in 1872.',
    'The approach lanes, Ninenzaka and Sannenzaka, are the best-preserved streets in Kyoto and the most crowded. The temple opens at six, which is the single most useful fact on this page.'
  ],
  see: [
    { n: 'The stage at opening', t: '6am',
      d: 'Before seven you will share it with a dozen people instead of two thousand. The light across the valley is also better.' },
    { n: 'Otowa waterfall',
      d: 'Three streams below the stage, for longevity, success and love. Drinking from all three is considered greedy and locals will notice.' },
    { n: 'Ninenzaka and Sannenzaka',
      d: 'Stone-paved lanes of wooden shopfronts. Tripods are banned and eating while walking is discouraged by signs that are regularly ignored.' },
    { n: 'Jishu Shrine',
      d: 'Behind the main hall, for matchmaking, with two stones eighteen metres apart that you walk between with your eyes shut. Closed for restoration in recent years; check.' },
    { n: 'Night illumination', t: 'spring and autumn',
      d: 'Limited evening openings with the stage lit and a beam of light into the sky. Separate ticket and very busy.' }
  ],
  when: 'Open 6am to 6pm, later in summer. Late November for maples, which is peak season for the whole city. Winter mornings are the quietest.',
  stay: 'Two hours, more with the lanes.',
  move: 'Bus 100 or 206 to Kiyomizu-michi, then a ten-minute uphill walk. Kiyomizu-Gojo station is a twenty-minute walk.',
  eat: 'Yudofu, simmered tofu, is the Higashiyama dish. Okutan has been doing it for centuries. The lanes sell yatsuhashi, a cinnamon sweet, in every flavour imaginable.'
},

'KYT-fushimi-inari': {
  intro: [
    'The gates at Fushimi Inari are not decoration. Each one was paid for by a person or a business, the name and date carved on the back, as thanks for a prayer answered. There are roughly ten thousand of them and the oldest date from the 1700s.',
    'Inari is the deity of rice and, by extension, of prosperity and business, which is why the donors are mostly companies. A large gate costs well over a million yen and there is a waiting list.',
    'Almost everybody photographs the dense double row near the bottom and turns back. The full circuit up Inari-yama takes two to three hours, and after the first twenty minutes the crowds thin to almost nothing.'
  ],
  see: [
    { n: 'The full mountain loop',
      d: 'Two to three hours, four kilometres, two hundred and thirty-three metres of climb. The Yotsutsuji junction halfway up has a city view and a tea stall.' },
    { n: 'The gates before dawn',
      d: 'The shrine is open twenty-four hours and never closes. At five in the morning you will have it to yourself, and the lanterns are lit.' },
    { n: 'The fox statues',
      d: 'Messengers of Inari, each holding something in its mouth: a key to the rice granary, a jewel, a scroll, a sheaf of grain.' },
    { n: 'The small shrines on the upper slopes',
      d: 'Hundreds of miniature altars under the trees, left by individuals. Nobody tends most of them and they are the most atmospheric part of the mountain.' },
    { n: 'Fushimi sake district',
      d: 'Twenty minutes away, where the soft water makes a notably smooth sake. Gekkeikan runs a museum with tastings.' }
  ],
  when: 'Any time, day or night, free, always open. That makes it the best early-morning or late-evening option in Kyoto.',
  stay: 'An hour for the lower gates, three for the mountain.',
  move: 'JR Inari station is directly outside, two stops from Kyoto station. Keihan Fushimi-Inari is a five-minute walk.',
  eat: 'Grilled quail and sparrow on the approach, which is traditional here and surprises people. Inari-zushi, rice in sweet fried tofu, is the dish named for the deity.'
},

'KYT-arashiyama': {
  intro: [
    'The bamboo grove at Arashiyama is about five hundred metres of path, and it is the single most crowded piece of ground in Kyoto. Photographs of it empty are taken before seven or they are composited.',
    'What saves the district is everything else. Tenryu-ji behind the grove has a garden laid out in 1339 by the monk Muso Soseki that has never been redesigned, which makes it one of the oldest unaltered gardens in Japan. The monkeys on the hill across the river are genuinely good. Okochi Sanso, a film actor’s villa, is a hillside garden that almost nobody enters because the entry price looks high.',
    'Go early, do the grove, then spend the day on the things around it.'
  ],
  see: [
    { n: 'The bamboo path', t: 'before 7am',
      d: 'Short, and the only way to see it properly is to be there at dawn. By nine it is a slow-moving queue.' },
    { n: 'Tenryu-ji',
      d: 'World Heritage. The Sogen pond garden from 1339, borrowing the mountains behind it. Pay the extra for the buildings and sit on the veranda.' },
    { n: 'Iwatayama Monkey Park',
      d: 'A twenty-minute climb to a troop of about a hundred and twenty Japanese macaques running free, with the best view of the city. You go in a cage to feed them, which is the correct way round.' },
    { n: 'Okochi Sanso',
      d: 'The villa of a silent film star, with a circuit garden and a tea included in the entry. Quiet because people balk at the price.' },
    { n: 'The Hozugawa boat ride',
      d: 'Two hours down the river from Kameoka through a gorge, poled and rowed. Best in autumn.' },
    { n: 'Otagi Nenbutsu-ji',
      d: 'Uphill and well beyond the crowds, with twelve hundred stone rakan carved by amateurs in the 1980s, several holding tennis rackets and cameras.' }
  ],
  when: 'Late November for maples, which is extraordinary and unbearable. Early morning year round.',
  stay: 'A full day if you include the monkeys and the outer temples.',
  move: 'JR Saga-Arashiyama, or the Randen tram from central Kyoto, which is slower and more pleasant.',
  eat: 'Tofu and yuba, which is the skin off soy milk and a Kyoto speciality. Shojin ryori, Buddhist vegetarian, at several temples by reservation.'
},

'KYT-kinkakuji': {
  intro: [
    'The Golden Pavilion was a retirement villa for a shogun, finished in 1397, converted to a temple on his death. The top two floors are covered in gold leaf, and the whole thing sits at the edge of a pond arranged so it is reflected whole.',
    'In 1950 a twenty-one-year-old novice monk burned it down and attempted suicide on the hill behind. At his trial he said he had been tormented by the building’s beauty. Mishima turned it into a novel and Mizoguchi into a film, and both are better than the reconstruction.',
    'What you see was rebuilt in 1955 and regilded in 1987 with leaf five times thicker than the original. It is a copy, it is beautiful, and the visit is a one-way loop of about twenty-five minutes.'
  ],
  see: [
    { n: 'The pavilion from the pond',
      d: 'The classic view is from the near shore. Go at opening or in snow, which transforms it and brings every photographer in Kyoto.' },
    { n: 'The three floors',
      d: 'Each is a different architectural style: aristocratic, samurai, Chinese Zen. Deliberate, and the point of the building.' },
    { n: 'The garden path',
      d: 'A short circuit behind with a tea house and a stone where people throw coins. Twenty minutes and you are out.' },
    { n: 'Ryoan-ji',
      d: 'Twenty minutes’ walk and the obvious pairing, being the exact opposite in every way.' },
    { n: 'Ninna-ji',
      d: 'Further along the same road, with a five-storey pagoda and late-flowering dwarf cherries in mid-April.' }
  ],
  when: 'Open 9 to 5. Snow in January or February is the view worth planning for. Autumn is busy.',
  stay: 'Forty-five minutes. It is a short visit by design.',
  move: 'Bus 101 or 205 from Kyoto station, about forty minutes. Traffic on that route is bad.',
  eat: 'Nothing on site worth the time. Head for the Kitano Tenmangu area.'
},

'KYT-gion': {
  intro: [
    'Gion is the geisha district, and about two hundred and fifty geiko and maiko still work here. They are not performers wandering the street for photographs; they are on their way to an appointment and they are usually late.',
    'Tourist behaviour got bad enough that in 2024 the district closed several private alleys to visitors entirely, with a ten-thousand-yen fine. The main streets remain open. The rule is simple: do not touch, do not block, do not chase.',
    'Hanamikoji in the early evening is the classic walk. Shirakawa, a canal lined with willows and wooden houses one street north, is prettier and less trafficked.'
  ],
  see: [
    { n: 'Shirakawa canal',
      d: 'Willows over water with ochaya along one side. Best at dusk and in early April when the cherries come out over the canal.' },
    { n: 'Hanamikoji',
      d: 'The main street of wooden teahouses. Walk it, do not loiter in doorways, and read the signs about which side lanes are closed.' },
    { n: 'Minamiza',
      d: 'The kabuki theatre at the end of the bridge, in operation since the 1600s. December brings the big annual programme.' },
    { n: 'Gion Corner',
      d: 'An hour of condensed traditional arts aimed squarely at visitors. Not authentic, reasonably informative, and the honest option if you want to see maiko dance without a ten-thousand-yen introduction.' },
    { n: 'Yasaka Shrine and Maruyama Park',
      d: 'At the east end, open all night, with a famous weeping cherry lit in April.' }
  ],
  when: 'Early evening, when the lanterns go on. Gion Matsuri in July is the biggest festival in Japan and runs the entire month.',
  stay: 'Two hours in the evening.',
  move: 'Gion-Shijo on the Keihan line, or Kawaramachi on the Hankyu.',
  eat: 'Expensive, and often by introduction only. Pontocho, across the river, is a parallel alley with the same atmosphere and far more places that will seat a stranger.'
},

'KYT-ginkakuji': {
  intro: [
    'The Silver Pavilion was never silvered. A shogun built it in 1482 as a retreat, modelling it on his grandfather’s golden one, and either ran out of money or never intended the coating. The bare wood has weathered to something far better than silver would have been.',
    'The garden holds two things nobody can fully explain: a two-metre cone of raked white sand called the Moon Viewing Platform, and a sea of raked gravel beside it. They were probably added in the Edo period, long after the shogun, and they are maintained by hand to a tolerance you can see.',
    'The Philosopher’s Path runs two kilometres south from the gate, along a canal, named for a professor who walked it daily to think.'
  ],
  see: [
    { n: 'The sand cone',
      d: 'Kogetsudai. Walk around it. The precision of the rake lines is the whole point and it is reset constantly.' },
    { n: 'The moss garden and the upper path',
      d: 'A circuit that climbs behind the pavilion to a view over the grounds and the city. Five minutes and most people take it.' },
    { n: 'The Philosopher’s Path',
      d: 'Two kilometres to Nanzen-ji, under cherry trees. Early April is spectacular; any other time it is a quiet walk with cats.' },
    { n: 'Honen-in',
      d: 'Just off the path, free, with a thatched gate and two sand mounds that are changed seasonally. Almost always empty.' },
    { n: 'Nanzen-ji',
      d: 'At the southern end, with an enormous gate you can climb and a brick aqueduct running through the grounds that looks entirely out of place and is wonderful.' }
  ],
  when: 'Late November for maples. Early April for the canal path. Open 8:30 to 5.',
  stay: 'An hour, plus an hour or two for the path.',
  move: 'Bus 5 or 17 to Ginkakuji-michi. There is no close station, which keeps it marginally calmer than Kiyomizu.',
  eat: 'The path has cafes and an excellent udon place or two. Omen, near the gate, is the standard and deserves it.'
},

'KYT-ryoanji': {
  intro: [
    'Fifteen rocks in a rectangle of raked gravel, twenty-five metres by ten, enclosed by a low clay wall stained with age. That is the entire garden, and it is probably the most written-about object in Japanese art.',
    'Nobody knows who made it, when exactly, or what it means. It is usually dated to the late fifteenth century. The rocks are arranged so that from any position on the viewing veranda, one of them is always hidden behind another.',
    'The clay wall is worth as much attention as the stones. It was boiled in oil, and the seepage over centuries has produced the staining. It was never meant to look like that and now it is inseparable from the effect.'
  ],
  see: [
    { n: 'The rock garden, sitting down',
      d: 'Find a space on the veranda and stay for twenty minutes. The effect does not arrive in two. Early morning is the only time this is possible.' },
    { n: 'The tsukubai',
      d: 'A stone water basin round the back with four characters that only make sense when combined with the square hole in the middle, reading roughly "I learn only to be content".' },
    { n: 'The pond garden',
      d: 'Older than the rock garden, below the temple, with water lilies and mandarin ducks. Almost everyone skips it.' },
    { n: 'Kinkaku-ji and Ninna-ji',
      d: 'Both on the same road, which makes a logical half-day.' }
  ],
  when: 'Open from 8 (8:30 in winter). Be there at opening or the veranda is three deep. Autumn colour around the pond is good and brings crowds.',
  stay: 'An hour.',
  move: 'Bus 59, or a walk from Ryoanji station on the Randen tram.',
  eat: 'The temple runs a yudofu restaurant in the grounds that is better than it has to be.'
},

'KYT-nijo': {
  intro: [
    'Nijo Castle was the shogun’s residence in Kyoto, built in 1603 to make the point that real power no longer sat with the emperor a few streets away. It was also where that arrangement ended: in 1867 the last shogun summoned his retainers to the Ninomaru and announced he was returning authority to the throne.',
    'The corridors have nightingale floors, built so that the nails rub against clamps and chirp under any weight. The usual story is that this was an anti-assassin measure. It may simply be how they settled, but the effect is real and you cannot cross a room silently.',
    'The painted sliding doors in the Ninomaru are by the Kano school, and the ones on display are copies. The originals are in a gallery on site.'
  ],
  see: [
    { n: 'Ninomaru Palace',
      d: 'Thirty-three rooms along a zigzag corridor, with the audience chambers arranged so rank determined how far in you were admitted. No photography inside.' },
    { n: 'The nightingale floor',
      d: 'Walk slowly and listen. It is genuinely strange.' },
    { n: 'The Ninomaru garden',
      d: 'By Kobori Enshu, designed to be seen from inside the building rather than walked, which is why it looks slightly odd from the path.' },
    { n: 'The Honmaru and the moat walk',
      d: 'The inner keep burned in 1788; the current building was moved here from the imperial palace. The walls and the double moat are the original defensive scheme.' },
    { n: 'Cherry blossom', t: 'late March to mid-April',
      d: 'Four hundred trees of fifty varieties, with evening illumination. One of the better bloom spots in central Kyoto.' }
  ],
  when: 'Open 8:45 to 4. Closed Tuesdays in some months. Late March for blossom.',
  stay: 'Ninety minutes.',
  move: 'Nijojo-mae on the Tozai subway line.',
  eat: 'Nothing on site. Nishiki Market is fifteen minutes east.'
},

'KYT-nishiki': {
  intro: [
    'Nishiki has been a market for around four hundred years, originally for fish because the groundwater here runs cold. It is a covered arcade about four hundred metres long and five metres wide, with roughly a hundred and thirty shops.',
    'A good half of them now sell things to eat on a stick, which is a recent development and not universally welcomed. The old shops are still there: knife makers, pickle houses, tofu, dried bonito, and one place that has sold nothing but soy milk products for generations.',
    'Eating while walking is now discouraged with signs in several languages, because the lane is too narrow for it. Most shops have a counter or a step where you can stand and eat.'
  ],
  see: [
    { n: 'Aritsugu',
      d: 'Knives since 1560, originally swords. They will sharpen and engrave while you wait, and the staff explain what each blade is for without pushing the expensive one.' },
    { n: 'The pickle shops',
      d: 'Kyoto pickles are a serious category. Most will give you a taste. Shibazuke and senmaizuke are the ones to try.' },
    { n: 'Tako tamago',
      d: 'A baby octopus with a quail egg set in the head. The signature oddity of the market and better than it sounds.' },
    { n: 'Nishiki Tenmangu',
      d: 'A small shrine wedged into the east end of the arcade, with lanterns and a mechanical lion.' },
    { n: 'The side alleys',
      d: 'Off the main lane towards Pontocho there are bars and tiny restaurants that open in the evening.' }
  ],
  when: 'Most shops 9 to 6. Many close Wednesdays. Avoid midday at weekends.',
  stay: 'An hour.',
  move: 'Shijo on the Karasuma line or Kawaramachi on the Hankyu, both a few minutes away.',
  eat: 'Graze. Then walk into Pontocho for dinner.'
},

'KYT-sanjusangendo': {
  intro: [
    'A hall a hundred and twenty metres long, with a thousand and one statues of Kannon in it. One large seated figure in the centre and a thousand standing ones in ten ranks either side, each about a metre and a half, each covered in gold leaf, each with forty arms.',
    'Most were carved in the thirteenth century after a fire, by a workshop under Tankei, who was eighty-two when he finished the central figure. One hundred and twenty-four survive from the original 1164 hall.',
    'Tradition says that among the thousand faces you will find someone you have lost. It sounds like a line until you are standing in front of them.'
  ],
  see: [
    { n: 'The thousand figures',
      d: 'Walk the length slowly. Each face is different. No photography, no notes taken loudly, and the hall is deliberately dim.' },
    { n: 'The twenty-eight guardians',
      d: 'In front of the ranks, a set of attendant deities carved with startling realism, including one with crystal eyes.' },
    { n: 'Fujin and Raijin',
      d: 'Wind and thunder gods at either end, and among the finest wooden sculptures in Japan.' },
    { n: 'Toshiya', t: 'mid-January',
      d: 'An archery competition on the west veranda, running since the Edo period, where twenty-year-olds in kimono shoot sixty metres down the length of the building.' },
    { n: 'Kyoto National Museum',
      d: 'Directly opposite, with a good collection and a Taniguchi building.' }
  ],
  when: 'Open 8:30 to 5, shorter in winter. January for the archery.',
  stay: 'An hour.',
  move: 'Bus 206 or 208 to Hakubutsukan-Sanjusangendo-mae. Shichijo on the Keihan line is a ten-minute walk.',
  eat: 'Nothing nearby. Head back towards Gion.'
},

'KYT-daitokuji': {
  intro: [
    'Daitoku-ji is a walled compound of twenty-two sub-temples, most of which are permanently closed to the public. Four are usually open, and between them they hold some of the best dry gardens in Japan with a fraction of the visitors of Ryoan-ji.',
    'This is where the tea ceremony was shaped. Sen no Rikyu was based here, and the complex has been associated with tea masters ever since. His statue above the gate was the pretext for his forced suicide in 1591.',
    'You could spend a morning here and see perhaps a dozen people. In Kyoto in November that is close to miraculous.'
  ],
  see: [
    { n: 'Daisen-in',
      d: 'A 1509 garden that represents a river running from mountains to sea in about a hundred square metres. The most sophisticated dry garden in Japan. No photography.' },
    { n: 'Koto-in',
      d: 'A maple avenue to the gate and a single stone lantern in a moss garden. In late November it is the best autumn scene in the city.' },
    { n: 'Zuiho-in',
      d: 'Built for a Christian daimyo, with a rock arrangement that forms a cross when seen from one angle. Modern raking in bold diagonals.' },
    { n: 'Ryogen-in',
      d: 'Five small gardens including one of the smallest in Japan, barely more than a doorway’s width.' },
    { n: 'The lanes between',
      d: 'Walled, gravelled and empty. Walking them is the point as much as the gardens.' }
  ],
  when: 'Late November for Koto-in. Opening varies by sub-temple and some close without notice.',
  stay: 'Two to three hours.',
  move: 'Bus 205 or 206 to Daitokuji-mae. Kitaoji subway is a fifteen-minute walk.',
  eat: 'Izusen, inside the complex, serves shojin ryori in red lacquer bowls stacked like a flower. Booking advised.'
},

'KYT-kurama': {
  intro: [
    'Kurama and Kibune sit in a wooded valley north of the city, half an hour on a small train that runs through a tunnel of maples. A temple on the mountain, a shrine in the river valley, and a two-hour walk over the top between them.',
    'Kurama-dera is the birthplace of Reiki, and the mountain has a long association with tengu, the long-nosed mountain spirits. The root-covered path near the summit is the most atmospheric stretch of walking near Kyoto.',
    'In summer, the restaurants at Kibune build platforms directly over the river and serve lunch on them, with the water running underneath your feet. It is called kawadoko and it is the best way to deal with a Kyoto August.'
  ],
  see: [
    { n: 'The Kurama to Kibune walk',
      d: 'Two hours over the mountain, mostly on steps and roots. Start at Kurama; it is less brutal in that direction.' },
    { n: 'Kurama-dera',
      d: 'A cable car saves the first climb. The main hall has a triangular pattern on the ground that people stand in for the view.' },
    { n: 'Kibune Shrine',
      d: 'A stone stair lined with red lanterns, which is the photograph everyone takes. Water fortunes that only appear when floated in the stream.' },
    { n: 'Kawadoko', t: 'May to September',
      d: 'Lunch on platforms over the river. Book ahead, expect to pay properly, and go at midday when it is hottest.' },
    { n: 'Kurama Onsen',
      d: 'An outdoor bath at the end of the valley, facing the forest. The obvious reward after the walk.' }
  ],
  when: 'Summer for the river platforms, late November for maples on the train line, which runs a lit tunnel section in the evening.',
  stay: 'Most of a day.',
  move: 'Eizan line from Demachiyanagi, about thirty minutes. Sit in the panorama car if one is running.',
  eat: 'Kawadoko in summer. Otherwise soba at the Kurama end and botan nabe, wild boar hotpot, in winter.'
},

'KYT-uji': {
  intro: [
    'Byodo-in was a noble’s villa converted to a temple in 1052, and the Phoenix Hall built the following year is the only major building of its period still standing in Japan. It is on the ten yen coin, and the phoenix on its roof is on the ten thousand yen note.',
    'The hall was meant to be a model of the Pure Land paradise, seen across water. It works: the reflection doubles it, and inside there is a single Amida Buddha with fifty-two bodhisattvas flying around the walls on clouds.',
    'Uji is also where Japanese green tea is at its most serious. The last ten chapters of the Tale of Genji are set here, and there is a museum devoted to them.'
  ],
  see: [
    { n: 'The Phoenix Hall',
      d: 'The exterior from across the pond is free with the grounds ticket. Going inside costs extra, runs on timed slots of fifty people, and is worth it for the flying bodhisattvas.' },
    { n: 'The Hoshokan museum',
      d: 'Underground beside the hall, holding the original roof phoenixes, the temple bell and half the bodhisattvas. Excellently done.' },
    { n: 'Tea',
      d: 'Uji is the benchmark for matcha and gyokuro. Several shops will grind leaf in front of you; some run hand-grinding sessions.' },
    { n: 'Ujigami Shrine',
      d: 'Across the river, World Heritage, and the oldest surviving shrine building in Japan, dating to about 1060.' },
    { n: 'The Tale of Genji Museum',
      d: 'On the last ten chapters, set here. Better than you expect if you know the book, baffling if you do not.' }
  ],
  when: 'Year round. Wisteria at Byodo-in in late April and early May.',
  stay: 'Half a day.',
  move: 'JR Nara line from Kyoto, about twenty minutes, or Keihan to Uji. Both stations are a short walk from the temple.',
  eat: 'Matcha everything, including soba made with it. Nakamura Tokichi is the famous tea house and the queue reflects that.'
},

'KYT-miyama': {
  intro: [
    'Miyama is a valley about two hours north of Kyoto city where around fifty thatched farmhouses survive, most of them still lived in. The hamlet of Kayabuki no Sato has thirty-eight of them in one cluster, which is the third largest concentration in Japan.',
    'The roofs are rethatched roughly every thirty years, in a communal effort that takes a village and several weeks. One house in the village is open as a folk museum and another is an indigo dyeing workshop.',
    'There are no trains. That is why almost nobody on the Kyoto circuit gets here, and why it is worth the effort.'
  ],
  see: [
    { n: 'Kayabuki no Sato',
      d: 'The thatched hamlet. People live here, so stay on the lanes and do not photograph into windows.' },
    { n: 'The folk museum',
      d: 'A house opened up with the irori hearth lit, showing how the smoke was used to preserve the thatch from the inside.' },
    { n: 'The water cannon test', t: 'May and December',
      d: 'Fire hydrants disguised around the village are tested twice a year, sending jets over the roofs. Locals turn out for it.' },
    { n: 'Snow lantern festival', t: 'late January to early February',
      d: 'The village lit with snow lanterns for about a week. Buses run and it is extremely photogenic.' },
    { n: 'The Yura river valley',
      d: 'Cycling and kayaking in summer, with rice terraces either side.' }
  ],
  when: 'Late January for snow, autumn for colour. Summer is green and quiet.',
  stay: 'A long day trip, or a night in a thatched guesthouse.',
  move: 'Bus from Hiyoshi station, or drive from Kyoto in about ninety minutes. A car makes this far easier.',
  eat: 'Local soba, river fish and venison. A few small places in the village, all closing early.'
},

'KYT-amanohashidate': {
  intro: [
    'A sandbar three and a half kilometres long, covered in about eight thousand pine trees, crossing most of the way over a bay on the Sea of Japan coast. It has been listed as one of the three great views of Japan since a 1643 book said so, and nothing has dislodged it.',
    'The established way to look at it is to turn your back, bend over and view it upside down between your legs. The claim is that it then resembles a bridge to heaven. It mostly resembles a sandbar seen upside down, but everyone does it anyway and there are platforms built for the purpose.',
    'You can walk or cycle the length of it, which takes about fifty minutes on foot through the pines with sea on both sides.'
  ],
  see: [
    { n: 'The view from Kasamatsu Park',
      d: 'North side, reached by chairlift or cable car, with the official viewing platform. The southern Amanohashidate View Land gives the other angle and has a small amusement park attached.' },
    { n: 'Walking the sandbar',
      d: 'Fifty minutes, flat, through pines. Bicycles can be hired at either end.' },
    { n: 'Chion-ji',
      d: 'At the southern end, where fortunes are tied to a fan-shaped frame rather than a tree.' },
    { n: 'Kono Shrine',
      d: 'At the north end, an ancient foundation linked to Ise, with a thousand-year-old sacred tree.' },
    { n: 'Ine',
      d: 'Forty minutes further round the coast, and the better destination of the two.' }
  ],
  when: 'Year round. Autumn is clearest. Summer brings swimmers to the beaches on the sandbar.',
  stay: 'Half a day, or a night to combine with Ine.',
  move: 'Two and a half hours from Kyoto on the limited express via the Kyoto Tango Railway.',
  eat: 'Crab in winter, which is the regional obsession, and grilled fish year round.'
},

'KYT-ine': {
  intro: [
    'Ine is a fishing village where about two hundred and thirty houses are built directly on the water, with the ground floor open to the sea so a boat can be moored inside and the family lives above. They are called funaya, and they run almost unbroken for five kilometres around the bay.',
    'The bay faces north but is sheltered by an island at its mouth, so the water barely moves. That is the whole reason this architecture works here and nowhere else on the coast.',
    'It is a working village with around two thousand people. The sea taxi is the right way to see it, from the water, which is how the buildings were meant to be read.'
  ],
  see: [
    { n: 'The sea taxi',
      d: 'Small boats run by local fishermen, about thirty minutes, going close in along the funaya. Black kites follow the boat for scraps.' },
    { n: 'The waterfront road',
      d: 'Walk or cycle the length. Quiet, with almost no tourist infrastructure.' },
    { n: 'Funaya stays',
      d: 'Several families take guests in converted boathouses. Sleeping over the water with boats below is the reason to come.' },
    { n: 'Mukai Sake Brewery',
      d: 'Run by one of Japan’s few female toji, making an unusual red-tinged sake from an ancient rice variety.' },
    { n: 'The viewpoint above the bay',
      d: 'On the road in from Amanohashidate, with the whole arc of houses laid out below.' }
  ],
  when: 'Year round. Winter for crab, and the village is at its quietest.',
  stay: 'A night, which is much better than a day trip.',
  move: 'Bus from Amanohashidate, about an hour. A car is useful.',
  eat: 'Whatever came off the boat. Several small places, all of which close when the fish runs out.'
},

'KYT-kibune-kurama-2': {
  intro: [
    'Ohara is a farming valley an hour north of Kyoto by bus, and it holds two temples that are better than most of what is inside the city. The difference is that you can hear birds at both.',
    'Sanzen-in has a moss garden with small stone figures of children hidden in it, placed in recent decades and now so thoroughly covered that finding them is part of the visit. Jakko-in is a nunnery where an empress retired after the fall of her clan in 1185, and the story of her life there is one of the saddest in Japanese literature.',
    'Jakko-in burned down in a 2000 arson attack that also destroyed a statue from 1229. The rebuilt hall holds a replica.'
  ],
  see: [
    { n: 'Sanzen-in',
      d: 'The Ojo Gokuraku-in hall with a 1148 Amida triad, then the moss garden behind. Look for the warabe jizo, small stone children lying in the moss.' },
    { n: 'Jakko-in',
      d: 'Fifteen minutes the other side of the valley. Small, quiet, and worth reading the Tale of the Heike beforehand.' },
    { n: 'Hosen-in',
      d: 'Next to Sanzen-in, where you sit with green tea and look at a five-hundred-year-old pine through a framed opening. Also a ceiling made from floorboards stained with the blood of besieged samurai, which they explain matter-of-factly.' },
    { n: 'The valley walk',
      d: 'Between the temples through vegetable fields, with shiso growing everywhere. Ohara supplies Kyoto with pickles.' },
    { n: 'Autumn colour',
      d: 'Late November, a week or so later than the city, and far less crowded.' }
  ],
  when: 'Late November for maples. Winter snow is beautiful here. Summer is hot and green.',
  stay: 'Half a day.',
  move: 'Bus 17 or 18 from Kyoto station, about an hour. There is no train.',
  eat: 'Shiso juice, pickles and simple country cooking. Several small places near the Sanzen-in approach.'
},

'KYT-kyoto-station': {
  intro: [
    'Kyoto Station was finished in 1997 and half the city hated it on sight. Hiroshi Hara put a fifteen-storey steel and glass canyon in a city of wooden buildings and low eaves, and the argument about whether it belongs here has never really stopped.',
    'It has grown on people. The great staircase runs a hundred and seventy-one steps up the east side with an LED display on the risers, there is a free rooftop garden at the top, and the whole atrium does something interesting with light in the late afternoon.',
    'Immediately north are two enormous temples, Higashi and Nishi Honganji, which between them are among the largest wooden structures in Japan and which almost no visitor bothers with.'
  ],
  see: [
    { n: 'The great stairway and roof terrace',
      d: 'Free, open late, with a view over the city to the hills. The Skyway walkway crosses the atrium forty-five metres up.' },
    { n: 'Higashi Honganji',
      d: 'Ten minutes north. The Founder’s Hall is one of the largest wooden buildings in the world, and inside there are coils of rope made from human hair, donated by women when the ropes kept breaking during reconstruction.' },
    { n: 'Nishi Honganji',
      d: 'World Heritage, with a Momoyama-period audience hall and a Noh stage from 1581 that may be the oldest in Japan.' },
    { n: 'Kyoto Tower',
      d: 'Across the road, disliked for similar reasons to the station, with a public bath in the basement that is open to non-guests.' },
    { n: 'The food floors',
      d: 'Ramen Koji on the tenth floor gathers regional shops; Isetan’s basement is a serious depachika.' }
  ],
  when: 'Year round. The stairway is lit in different patterns through the seasons.',
  stay: 'An hour between trains, or half a day with the temples.',
  move: 'Everything starts here. The bus terminal on the north side serves most of the city and the queues at it are the worst part of visiting Kyoto.',
  eat: 'Ramen Koji, the depachika, and Kyoto Tower’s basement food hall, which is cheaper and local.'
},

/* ===================== OSAKA ===================== */
'OSK-dotonbori': {
  intro: [
    'Dotonbori is a canal with signs on it. The Glico running man has been up since 1935, now in his sixth version and in LED, and standing on Ebisubashi copying his pose is a required piece of Osaka tourism.',
    'The street behind is the densest concentration of eating in Japan. Osaka’s word for it is kuidaore, meaning to ruin yourself through food, and it is used as a civic boast.',
    'One rule about kushikatsu, the deep-fried skewers: there is a communal pot of sauce and you dip once, before eating. Double-dipping is a genuine social offence and every shop has a sign about it.'
  ],
  see: [
    { n: 'The Glico sign at night',
      d: 'From Ebisubashi. Busy at all hours and worth the five minutes.' },
    { n: 'Kushikatsu in Shinsekai or here',
      d: 'Dip once. The sauce pot is shared and everybody is watching.' },
    { n: 'Takoyaki',
      d: 'Octopus in batter, cooked in moulds, served scalding. Osaka invented them in 1935. Wait thirty seconds before the first one or you will burn your mouth.' },
    { n: 'Hozenji Yokocho',
      d: 'A stone-paved alley one street south, with a moss-covered Buddha that visitors throw water on. Quiet, old and a complete contrast.' },
    { n: 'The canal cruise',
      d: 'Twenty minutes along the water under the signs. Cheap and a good way to see it without the crowd.' }
  ],
  when: 'Evening. Nothing here improves in daylight.',
  stay: 'An evening.',
  move: 'Namba station on several lines. Shinsaibashi is a few minutes north.',
  eat: 'Takoyaki, okonomiyaki, kushikatsu, kitsune udon. Osaka okonomiyaki mixes everything into the batter, which distinguishes it from Hiroshima’s layered version, and people here will tell you which is correct.'
},

'OSK-osaka-castle': {
  intro: [
    'Toyotomi Hideyoshi built the original in the 1580s as the largest castle in Japan. It was destroyed in 1615, rebuilt, struck by lightning and burned in 1665, left as foundations for two centuries, rebuilt in concrete in 1931 by public subscription, and survived the 1945 air raids that flattened everything around it.',
    'Purists dislike the current keep because it has a lift in it and the exterior mixes periods. The stonework is the real thing, and some of the blocks in the inner walls weigh over a hundred tonnes and were shipped from quarries on the Inland Sea.',
    'The museum inside is decent on Hideyoshi, who went from peasant to ruler of Japan and is still the most improbable career in Japanese history.'
  ],
  see: [
    { n: 'The Octopus Stone',
      d: 'In the inner wall near the Sakuramon gate. Roughly sixty square metres of face and an estimated hundred and eight tonnes, moved here without machinery.' },
    { n: 'The keep and the top floor',
      d: 'Eight floors, lift to the top, view over the city. The museum improves as you descend.' },
    { n: 'The outer moat and park',
      d: 'A hundred hectares, with three thousand cherry trees and a plum grove of thirteen hundred that flowers from February.' },
    { n: 'Nishinomaru Garden',
      d: 'A paid section with the best view of the keep across lawns and blossom.' },
    { n: 'The Peace Osaka museum',
      d: 'In the park, on the 1945 air raids. Small and sobering.' }
  ],
  when: 'Late March for blossom, February for plums. The park is free and always open; the keep closes at 5.',
  stay: 'Two hours.',
  move: 'Osakajokoen on the loop line, or Tanimachi 4-chome on the subway.',
  eat: 'Park kiosks only. Go into the city.'
},

'OSK-shinsekai': {
  intro: [
    'Shinsekai was built in 1912 as a vision of the future, with the southern half modelled on Coney Island and the northern on Paris. Tsutenkaku, the tower at the centre, was a copy of the Eiffel with an Arc de Triomphe underneath it.',
    'Then the money moved elsewhere and the district was left behind for most of a century. It acquired a rough reputation that locals still trade on and which is now largely nostalgic.',
    'The result is the least polished part of central Osaka, which makes it the most interesting. Kushikatsu shops, standing bars, shogi parlours and a lot of signage from the 1960s.'
  ],
  see: [
    { n: 'Tsutenkaku',
      d: 'The current tower is a 1956 rebuild. There is an observation deck, a slide down the outside added in 2022, and Billiken, a grinning good-luck figure whose feet you rub.' },
    { n: 'Kushikatsu',
      d: 'This is the home of it. Daruma is the famous chain and started here. Dip once.' },
    { n: 'Janjan Yokocho',
      d: 'A covered alley of standing bars, shogi halls and very cheap food. The most unreconstructed street in the city.' },
    { n: 'Spa World',
      d: 'An eight-storey bathhouse with European and Asian themed floors, which is exactly as strange as it sounds and genuinely enjoyable.' },
    { n: 'Tennoji and Shitennoji',
      d: 'Next door. Shitennoji, founded 593, claims to be the oldest officially administered temple in Japan.' }
  ],
  when: 'Evening. Year round.',
  stay: 'Two or three hours.',
  move: 'Shin-Imamiya or Ebisucho stations.',
  eat: 'Kushikatsu and doteyaki, beef tendon simmered in miso. Cheap and good.'
},

'OSK-umeda': {
  intro: [
    'Umeda is the northern business district and the busiest part of Osaka, built over a knot of stations that confuse everybody including residents. Osaka, Umeda, Higashi-Umeda and Nishi-Umeda are four different stations that are all here.',
    'The Umeda Sky Building is the reason to come. Two towers joined at the thirty-ninth floor by a ring-shaped observatory, with escalators crossing the void between them at a hundred and seventy metres. It was finished in 1993 and still looks like it arrived from a different decade.',
    'Underneath the district is one of the largest underground mall networks in Japan, and it is genuinely easy to get lost in it.'
  ],
  see: [
    { n: 'Umeda Sky Building',
      d: 'The floating garden observatory, open-air on the roof. Sunset is the slot to aim for. The escalator through the gap is the memorable part.' },
    { n: 'Takimi Koji',
      d: 'In the basement of the same building, a recreated Showa-era street of izakaya with deliberately grimy signage.' },
    { n: 'Hankyu and Hanshin department stores',
      d: 'The Hanshin basement does an ika-yaki, a squid pancake, that people queue for and that costs almost nothing.' },
    { n: 'Nakazakicho',
      d: 'Fifteen minutes east, a pocket of prewar houses that escaped the bombing, now full of cafes and small shops.' },
    { n: 'Grand Front and the station roof',
      d: 'Modern retail with public terraces that are a reasonable free alternative to the Sky Building.' }
  ],
  when: 'Year round, mostly indoors.',
  stay: 'An afternoon and evening.',
  move: 'Everything stops here. Allow extra time for transfers between the differently named stations.',
  eat: 'Department store basements, and Nakazakicho for cafes.'
},

'OSK-sumiyoshi': {
  intro: [
    'Sumiyoshi Taisha is one of the oldest shrines in Japan and its buildings use a style, Sumiyoshi-zukuri, that predates any Chinese architectural influence. The roofs are straight, with no curve at all, and the entrance is on the gable end. There are only a handful of examples left.',
    'It is dedicated to deities of the sea and of safe voyages, which is why it stood at the shore when it was founded. The coastline has moved; the shrine has not.',
    'The arched bridge in front, Sorihashi, is close to forty-five degrees and crossing it is treated as an act of purification. It is harder than it looks.'
  ],
  see: [
    { n: 'The four main halls',
      d: 'National treasures, rebuilt every twenty years in the old style until the practice lapsed. The current ones date from 1810.' },
    { n: 'Sorihashi bridge',
      d: 'Steep, red, and reflected in the pond. Go slowly; people do slip.' },
    { n: 'New Year',
      d: 'Over two million visitors in the first three days, which puts it among the busiest shrines in the country.' },
    { n: 'The stone lanterns',
      d: 'Around six hundred, most donated by shipping merchants and fishing guilds, with the trades carved on them.' },
    { n: 'The tram',
      d: 'The Hankai line, Osaka’s last surviving tram, runs past the gate and is worth riding for its own sake.' }
  ],
  when: 'Year round. New Year is extraordinary and impossible.',
  stay: 'An hour.',
  move: 'Sumiyoshi Taisha on the Nankai line, or the Hankai tram.',
  eat: 'Nothing special nearby. The tram runs back towards Tennoji.'
},

'OSK-minoo': {
  intro: [
    'Minoo Park is a wooded valley half an hour north of Umeda, with a flat three-kilometre path along a stream to a thirty-three metre waterfall. It is the closest thing to a proper forest walk inside the Osaka conurbation.',
    'The local snack is a maple leaf, battered and deep fried in sesame oil. The leaves are salted for a year before frying, which makes them less of a gimmick than they sound. They taste mostly of the batter and are oddly addictive.',
    'There are macaques in the valley. They have been a nuisance in the past and the signs about not carrying visible food are serious.'
  ],
  see: [
    { n: 'The walk to the falls',
      d: 'Three kilometres, paved, gentle, about forty-five minutes each way. Lit in the evening during autumn.' },
    { n: 'Momiji tempura',
      d: 'Fried maple leaves, sold from stalls along the path. Buy a small bag; they are better warm.' },
    { n: 'Autumn colour', t: 'mid to late November',
      d: 'The whole valley turns. This is the busiest time and justifiably so.' },
    { n: 'Ryuanji',
      d: 'A temple built on the cliff near the entrance, one of Japan’s oldest Benzaiten sites, reached up steps from the path.' },
    { n: 'The insect museum',
      d: 'Near the entrance, with a live butterfly house. Modest and good with children.' }
  ],
  when: 'Mid to late November for colour. Summer is cool in the valley.',
  stay: 'Half a day.',
  move: 'Hankyu Takarazuka line to Minoo, then a five-minute walk to the park gate.',
  eat: 'Fried maple leaves and not much else. Eat in Osaka.'
},

'OSK-kaiyukan': {
  intro: [
    'Osaka Aquarium is built around a single central tank nine metres deep holding five thousand four hundred cubic metres of water, with whale sharks in it. The route spirals down around that tank, so you meet the same body of water repeatedly from different depths.',
    'That design is the reason it is consistently ranked among the best aquariums in the world. You are not walking past a series of boxes; you are descending through one ocean.',
    'The surrounding exhibits follow the Pacific Rim, from Japanese forest otters through Antarctic penguins to the Monterey kelp. The jellyfish gallery at the end is deliberately slow and dark.'
  ],
  see: [
    { n: 'The Pacific tank',
      d: 'Whale sharks, manta rays and schooling tuna. Watch it from at least three levels; the animals behave differently at each.' },
    { n: 'The Japan Deep Sea section',
      d: 'Giant spider crabs from the Tosa Bay, which are unnerving at close range.' },
    { n: 'The jellyfish gallery',
      d: 'Near the exit, backlit and silent. The best room in the building.' },
    { n: 'Tempozan Ferris wheel',
      d: 'Next door, a hundred and twelve metres, with transparent gondolas and a view across the bay.' },
    { n: 'The Santa Maria cruise',
      d: 'A replica galleon doing a bay circuit from the same pier.' }
  ],
  when: 'Year round. Book online to skip the ticket queue, which can run an hour at weekends.',
  stay: 'Two and a half to three hours.',
  move: 'Osakako on the Chuo subway line, five minutes’ walk.',
  eat: 'Tempozan Marketplace next door has a Naniwa Kuishinbo Yokocho food court done up as a 1960s street.'
},

'OSK-expo-park': {
  intro: [
    'Expo 70 was Japan’s coming-out party, the first world’s fair in Asia, and sixty-four million people came. Almost everything was demolished afterwards. What survives is Taro Okamoto’s Tower of the Sun, seventy metres of concrete with three faces: one on the front, one on top, and a black one on the back representing the past.',
    'Okamoto was a difficult, brilliant artist who hated the orderly optimism of the fair and built something deliberately primitive in the middle of it. The interior, with a forty-one metre Tree of Life sculpture, reopened to the public in 2018 after decades closed.',
    'The park around it has about five thousand cherry trees and a very good ethnology museum.'
  ],
  see: [
    { n: 'Tower of the Sun interior',
      d: 'Advance booking required and worth it. The Tree of Life, covered in models of evolving organisms, is unlike anything else in Japan.' },
    { n: 'National Museum of Ethnology',
      d: 'In the park, with a genuinely world-class collection and an approach that treats Japan as one culture among many rather than the subject.' },
    { n: 'The Japanese Garden',
      d: 'Laid out for the Expo by Nakane Kinsaku, covering the history of Japanese garden design in one walk.' },
    { n: 'Cherry blossom',
      d: 'Five thousand trees, and far more space to sit than anywhere in central Osaka.' },
    { n: 'Nifrel',
      d: 'An aquarium and zoo hybrid next door, arranged by aesthetic quality rather than taxonomy, which is odd and works.' }
  ],
  when: 'Late March for blossom, November for colour. Closed Wednesdays.',
  stay: 'Half a day.',
  move: 'Osaka Monorail to Banpaku-kinen-koen, about forty minutes from Umeda with a change.',
  eat: 'Expocity next door has a large mall food court.'
},

/* ===================== NARA ===================== */
'NAR-todaiji': {
  intro: [
    'The Great Buddha Hall is the largest wooden building most people will ever stand in, and it is only two thirds the width of the original. The first version was finished in 752 and burned twice, in 1180 and 1567. The current hall dates from 1709.',
    'The bronze Buddha inside is nearly fifteen metres and used up most of the copper in Japan. Casting it in the 740s came close to bankrupting the state and triggered a mercury-poisoning problem among the workers that is visible in the records.',
    'There is a pillar at the back with a hole in its base, said to be the size of the Buddha’s nostril. Children squeeze through it for luck. Adults attempt it and sometimes need help.'
  ],
  see: [
    { n: 'The Daibutsu',
      d: 'Walk the full circuit. The right hand was recast in the Momoyama period and the head in 1692, so the proportions shift as you move round.' },
    { n: 'The Nandaimon gate',
      d: 'Two eight-metre guardian figures carved by Unkei and Kaikei in 1203, in sixty-nine days by a team of about twenty. Among the greatest sculptures in Japan and most people walk straight past them.' },
    { n: 'Nigatsudo',
      d: 'Up the hill behind, a veranda with the best view over Nara, free and open at all hours. Go at sunset.' },
    { n: 'Omizutori', t: 'first two weeks of March',
      d: 'A ritual running unbroken since 752, in which monks carry enormous burning torches along the Nigatsudo balcony and shower sparks on the crowd below.' },
    { n: 'Todaiji Museum',
      d: 'Beside the entrance, holding sculpture that was once in the hall. Quiet and very good.' }
  ],
  when: 'Year round. March for Omizutori. The deer are everywhere and they bite; the warning signs are accurate.',
  stay: 'Two hours including Nigatsudo.',
  move: 'Twenty minutes’ walk from Kintetsu Nara, or a bus. Nara is forty minutes from Kyoto and thirty-five from Osaka.',
  eat: 'Kakinoha-zushi, fish pressed with rice and wrapped in persimmon leaf, which was how Nara preserved sea fish before refrigeration.'
},

'NAR-nara-park': {
  intro: [
    'About twelve hundred sika deer live in Nara Park, and they have been protected since the eighth century on the grounds that a deity arrived in the city riding one. Killing one was a capital offence until 1637.',
    'They have learned to bow. Bow to a deer holding a cracker and it will usually bow back, then take the cracker. They have also learned to be pushy about it: several hundred people a year are bitten, butted or knocked over, almost always while holding food up for a photograph.',
    'Buy the crackers from the licensed stalls, give them out quickly, and show your empty hands when you have none left. They understand that gesture.'
  ],
  see: [
    { n: 'The deer',
      d: 'Everywhere. In the morning they are calm; by afternoon they have been fed all day and are either sleepy or aggressive depending on the individual.' },
    { n: 'Kasuga Taisha',
      d: 'Through the park, up a lantern-lined approach. See its own entry.' },
    { n: 'Kofuku-ji',
      d: 'A five-storey pagoda from 1426, fifty metres, the second tallest in Japan, and a superb National Treasure Museum with the three-faced Ashura statue.' },
    { n: 'Isuien Garden',
      d: 'A quiet paid garden borrowing the Todaiji gate and the hills as backdrop. The best garden in Nara and usually empty.' },
    { n: 'Mount Wakakusa',
      d: 'A grass hill at the back of the park, burned deliberately every January in a festival with fireworks. Climbable for a city view.' }
  ],
  when: 'Year round. Early morning for calm deer. Late January for the hill burning.',
  stay: 'Half a day to a full day.',
  move: 'Walk from Kintetsu Nara. JR Nara is fifteen minutes further out.',
  eat: 'Narazuke pickles, kuzumochi, and the mochi pounding demonstration at Nakatanidou, which is startlingly fast and happens several times a day.'
},

'NAR-horyuji': {
  intro: [
    'The buildings at the western precinct of Horyu-ji are the oldest surviving wooden structures in the world. The main hall and the pagoda date from around 700, after a fire destroyed the original 607 complex, and dendrochronology on the pagoda’s central pillar gives a felling date of 594.',
    'The pillars have entasis, a slight swelling at the middle, which is a Greek architectural device that travelled east along the Silk Road and ended up in a Japanese temple. That single detail is worth the trip.',
    'It was the first Japanese site inscribed by UNESCO, in 1993, and it is a working temple rather than a museum.'
  ],
  see: [
    { n: 'The Kondo and the pagoda',
      d: 'Both around 700. The pagoda has clay tableaux in its base from 711 that you peer at through grilles.' },
    { n: 'The Great Treasure Gallery',
      d: 'Including the Kudara Kannon, a two-metre camphor figure of extraordinary thinness, and the Tamamushi Shrine, once decorated with the iridescent wings of several thousand beetles.' },
    { n: 'Yumedono',
      d: 'The octagonal Hall of Dreams in the eastern precinct, holding a hidden Kannon that was wrapped in cloth for centuries and only unwrapped in 1884 by Ernest Fenollosa.' },
    { n: 'Chugu-ji',
      d: 'A nunnery next door with a seated Miroku in black wood, smiling, from the seventh century. One of the finest sculptures in Japan and nearly always quiet.' },
    { n: 'The entasis',
      d: 'Look along the colonnade of the central gate and you can see the swell in the columns.' }
  ],
  when: 'Year round. The Yumedono Kannon is shown only in spring and autumn for a few weeks.',
  stay: 'Two to three hours.',
  move: 'JR Horyuji station then a bus, or a bus from Nara, about an hour in total.',
  eat: 'Very little nearby. Eat in Nara.'
},

'NAR-kasuga': {
  intro: [
    'Kasuga Taisha was founded in 768 by the Fujiwara, who ran Japan from behind the throne for four centuries, and it was rebuilt every twenty years until 1863. Three thousand lanterns line the approach and hang under the eaves, donated by worshippers over a thousand years.',
    'They are lit twice a year, at Setsubun in February and in mid-August. On those nights the whole approach is candlelit and it is one of the great sights in Japan.',
    'The forest behind the shrine, Kasugayama, has been off-limits to logging since 841. It is now a rare example of primeval lowland forest in Japan and is World Heritage in its own right.'
  ],
  see: [
    { n: 'The lantern approach',
      d: 'Stone lanterns under cedar and deer wandering between them. The walk up from the park takes about fifteen minutes.' },
    { n: 'The bronze lanterns',
      d: 'Hung under the eaves of the inner corridors. A dark room in the pay area shows a corridor of them lit, which approximates the festival nights.' },
    { n: 'Mantoro', t: 'early February and mid-August',
      d: 'All three thousand lit. Go, if the dates line up.' },
    { n: 'Kasugayama Primeval Forest',
      d: 'Walking trails behind the shrine through untouched forest. Few people take them.' },
    { n: 'Man’yo Botanical Garden',
      d: 'Beside the shrine, growing every plant mentioned in the eighth-century Man’yoshu poetry collection. Wisteria in late April.' }
  ],
  when: 'February and August for the lantern festivals. Late April for wisteria.',
  stay: 'Ninety minutes.',
  move: 'Walk through Nara Park from Kintetsu Nara, about twenty-five minutes, or take a bus.',
  eat: 'Nothing on site. Back into Naramachi.'
},

'NAR-yoshino': {
  intro: [
    'Thirty thousand cherry trees cover the slopes of Mount Yoshino, planted in four bands at different heights that flower in sequence over about two weeks in April. They are called shimo, naka, kami and oku senbon, meaning the lower, middle, upper and inner thousand.',
    'They were not planted for the view. Yoshino has been a centre of Shugendo mountain asceticism for over thirteen hundred years, and planting a cherry here was an offering. The accumulation of individual acts of devotion is what produced the landscape.',
    'In early April the place is overwhelmed. Out of season it is a quiet mountain town with some remarkable buildings and nobody in it.'
  ],
  see: [
    { n: 'Kinpusen-ji',
      d: 'The second largest wooden building in Japan after Todaiji, holding three seven-metre blue-skinned Zao Gongen figures that are normally hidden and shown for limited periods.' },
    { n: 'The bloom in sequence', t: 'early to mid-April',
      d: 'Lower slopes first, inner last, so the mountain stays in flower for a fortnight. Stay overnight; the day crowds are brutal.' },
    { n: 'Yoshimizu Shrine',
      d: 'The classic viewpoint, looking across at a thousand trees at once. Also where Emperor Go-Daigo set up a rival court in 1336.' },
    { n: 'The ropeway',
      d: 'Japan’s oldest passenger ropeway, running since 1929. Check it is operating; it has been suspended at times.' },
    { n: 'Autumn',
      d: 'The same slopes turn in late November and almost nobody comes.' }
  ],
  when: 'Early to mid-April for blossom, late November for colour. Accommodation in blossom season books a year ahead.',
  stay: 'A night in season, half a day otherwise.',
  move: 'Kintetsu line from Osaka Abenobashi to Yoshino, about ninety minutes, then ropeway or a steep walk.',
  eat: 'Kakinoha-zushi, kudzu starch sweets, and persimmon leaf tea.'
},

'NAR-asuka': {
  intro: [
    'Asuka was the capital of Japan through most of the sixth and seventh centuries, during the period when Buddhism arrived, the first constitution was written, and the state took the shape it would keep. It is now rice fields.',
    'Scattered through those fields are burial mounds, temple foundations and a set of carved granite boulders that nobody can convincingly explain: a stone shaped like a turtle, two human-faced stones, a stone stage. They are clearly deliberate and their purpose is lost.',
    'The right way to see it is by rented bicycle. Everything is within a few kilometres and the roads are flat.'
  ],
  see: [
    { n: 'Ishibutai Kofun',
      d: 'A burial chamber stripped of its earth mound, leaving thirty granite blocks weighing around twenty-three hundred tonnes in total. You walk inside. Probably the tomb of Soga no Umako.' },
    { n: 'Takamatsuzuka Tomb',
      d: 'A seventh-century mound with painted murals of court women and constellations, discovered in 1972. The originals are conserved; a replica is shown.' },
    { n: 'Asuka-dera',
      d: 'Japan’s first proper Buddhist temple, founded 596, with a bronze Buddha from 609 that is the oldest in the country.' },
    { n: 'The strange stones',
      d: 'Kameishi the turtle stone, Sakafuneishi, and the two human-faced figures at Kibihimi. Hunt them out by bicycle.' },
    { n: 'Amakashi no Oka',
      d: 'A low hill with a view over the whole basin, which makes the geography of the ancient capital legible.' }
  ],
  when: 'Spring and autumn. Summer in the basin is hot and still.',
  stay: 'A full day by bicycle.',
  move: 'Kintetsu to Asuka station, hire a bicycle at the station.',
  eat: 'Simple places near the station. Nothing notable, which is part of the charm.'
},

'NAR-omiwa': {
  intro: [
    'Omiwa Shrine has no hall housing a deity, because the mountain behind it is the deity. Mount Miwa itself is the object of worship, which makes this one of the oldest forms of Shinto practice still operating and probably the oldest shrine in Japan.',
    'You can climb the mountain, but it is an act of worship rather than a hike. You register at a subsidiary shrine, wear a white sash, and agree to a set of rules: no photography, no eating, no drinking except water, and you must be down by a fixed time.',
    'The shrine is associated with sake brewing, and brewers across Japan hang a ball of cedar sprigs outside their premises that is made here.'
  ],
  see: [
    { n: 'The haiden and the triple torii',
      d: 'The worship hall, with an unusual three-part gate behind it that marks the boundary of the sacred mountain. You cannot pass it.' },
    { n: 'Climbing Mount Miwa',
      d: 'Register at Sai Shrine. About two hours return. Treat it as a pilgrimage, because that is what it is.' },
    { n: 'Sake',
      d: 'The shrine is the patron of brewers. The cedar balls, sugidama, turn from green to brown as the new sake matures.' },
    { n: 'The Yamanobe no Michi',
      d: 'The oldest road in Japan, running sixteen kilometres north from here past burial mounds and small shrines. A superb day walk.' },
    { n: 'Hasedera',
      d: 'Twenty minutes away, with four hundred steps under a covered corridor and seven thousand peonies in late April.' }
  ],
  when: 'Year round. The mountain climb is suspended on some days and in bad weather.',
  stay: 'Half a day, or a full day with the old road.',
  move: 'JR Miwa station on the Sakurai line, five minutes’ walk.',
  eat: 'Miwa somen, very thin wheat noodles, which were invented here and are the regional speciality. Eaten cold in summer, in hot broth in winter.'
},

/* ===================== HYOGO ===================== */
'HYG-himeji': {
  intro: [
    'Himeji is the best castle in Japan and it is not a close contest. It was never besieged, never burned, never bombed. An American firebomb landed on the top floor in 1945 and failed to go off.',
    'The defensive design is the thing to understand. The approach to the keep is a deliberate maze of gates, dead ends and blind turns that triples the distance an attacker covers while exposing them to fire from above the whole way. Walk it and you can feel the intention.',
    'It had a five-year restoration finished in 2015 that left the plaster startlingly white. Some people complained it looked too new. The plaster was always that colour; everyone had just got used to the grime.'
  ],
  see: [
    { n: 'The approach to the keep',
      d: 'Follow the marked route and notice how often you are walking away from where you want to go. That is the design working.' },
    { n: 'The six floors',
      d: 'Steep ladder-stairs, two enormous central pillars running the full height, and weapon racks on the walls. The top floor has a small shrine and a view over the city.' },
    { n: 'Koko-en',
      d: 'Nine walled gardens built in 1992 on the former samurai residences beside the castle. A combined ticket is cheap and almost nobody buys it.' },
    { n: 'The west bailey',
      d: 'A long corridor of rooms where ladies-in-waiting lived, connected to the story of Princess Sen. Included in the ticket and often skipped.' },
    { n: 'Cherry blossom', t: 'early April',
      d: 'A thousand trees in the grounds against the white walls. Predictably extraordinary and predictably crowded.' }
  ],
  when: 'Open 9 to 5, later in summer. Early April for blossom. Go at opening; a queue for the keep builds by ten and can run two hours in season.',
  stay: 'Three hours with the garden.',
  move: 'Shinkansen to Himeji, then a fifteen-minute walk straight down the main avenue. An easy day trip from Osaka or Kyoto.',
  eat: 'Himeji oden, dipped in ginger soy rather than mustard, and anago, conger eel, which is the local fish.'
},

'HYG-kobe': {
  intro: [
    'Kobe is squeezed into a strip between mountains and sea, about two kilometres wide in places, which gives it an unusual density and a view of the water from almost anywhere uphill.',
    'It opened as a treaty port in 1868 and the foreign residents left behind the Kitano district of Western houses, Japan’s first golf course, and a taste for beef that became the most over-licensed brand name in food.',
    'In January 1995 an earthquake killed over six thousand people here and destroyed a fifth of the buildings. The rebuilt city works well, and a preserved section of collapsed quay in the port is left exactly as it fell.'
  ],
  see: [
    { n: 'Mount Rokko or Maya at night',
      d: 'Ropeway or cable car up for what is called one of the three great night views in Japan. Maya’s Kikuseidai platform is the better of the two.' },
    { n: 'Kitano Ijinkan',
      d: 'Around twenty Western merchant houses on the hillside, several open. Period pieces rather than great architecture, and pleasant to walk between.' },
    { n: 'The Earthquake Memorial Park',
      d: 'Sixty metres of the original quayside left as the 1995 quake left it, tilted and cracked, with photographs. Short, free and sobering.' },
    { n: 'Nada sake district',
      d: 'East of the centre, producing about a quarter of Japan’s sake thanks to the hard Miyamizu water. Several breweries have free museums and tastings.' },
    { n: 'Arima Onsen',
      d: 'Over the mountain, reachable by ropeway from Rokko. One of the oldest hot springs in the country.' }
  ],
  when: 'Year round. The Luminarie light installation in December commemorates the earthquake.',
  stay: 'A day, or a night for the view.',
  move: 'Twenty minutes from Osaka. Shin-Kobe for the shinkansen, Sannomiya for everything else.',
  eat: 'Kobe beef at teppanyaki counters, where you watch it cooked. Also Chinatown at Nankinmachi, and the city has the best bakeries in Japan, a legacy of the foreign quarter.'
},

'HYG-kinosaki': {
  intro: [
    'Kinosaki has seven public bathhouses strung along a willow-lined canal, and the custom is to walk between them in a yukata and wooden geta, bathing in as many as you like. The clatter of geta on stone is the sound of the town after dark.',
    'Inns give guests a pass that opens all seven, and the whole place is arranged on the principle that the town is the hotel: the inn is your bedroom, the bathhouses are your bathroom, the street is your corridor.',
    'It has been a hot spring since the eighth century. A novelist, Shiga Naoya, came here to recover after being hit by a train in 1913 and wrote a short story about it that every Japanese schoolchild reads.'
  ],
  see: [
    { n: 'The seven sotoyu',
      d: 'Each has a different character: Goshono-yu has a waterfall, Ichino-yu is cave-like, Kono-yu is the oldest. Two hours covers three or four comfortably.' },
    { n: 'Walking in yukata',
      d: 'Not a costume here, it is what everyone wears. Your inn provides it and will show you how to tie it.' },
    { n: 'The ropeway and Onsenji',
      d: 'Up the hill behind, with the temple where bathers traditionally prayed before using the waters.' },
    { n: 'Crab', t: 'November to March',
      d: 'Matsuba crab from the Sea of Japan is the reason half the Japanese visitors come. It is expensive and it is the best crab in the country.' },
    { n: 'The willow canal in snow',
      d: 'Kinosaki in January, lit at night, with snow on the willows. Worth planning around.' }
  ],
  when: 'November to March for crab and snow. Tattoos are generally accepted at the public baths here, which is unusual and worth knowing.',
  stay: 'One night, which is the correct dose.',
  move: 'Limited express from Kyoto or Osaka, about two and a half hours.',
  eat: 'Crab in season, Tajima beef the rest of the year. Inns serve both at dinner.'
},

'HYG-arima': {
  intro: [
    'Arima claims to be one of the three oldest hot springs in Japan, with mentions in eighth-century chronicles and a visit from an emperor in 631. Hideyoshi came repeatedly and built a bathhouse here, the foundations of which were rediscovered in 1995.',
    'There are two waters. Kinsen, the gold spring, is heavy with iron and salt and comes out of the ground clear before oxidising to a deep rust brown. Ginsen, the silver spring, is carbonated and radium-bearing and stays clear.',
    'It is thirty minutes from Kobe through a tunnel or over the mountain by ropeway, which makes it the most accessible classic onsen town in Japan.'
  ],
  see: [
    { n: 'Kin no Yu and Gin no Yu',
      d: 'The two public bathhouses, one for each water. Gold first, then silver, is the local order. The gold water stains towels permanently.' },
    { n: 'The source springs',
      d: 'Several bubbling vents around the town, including Tansan Sengen, the carbonated spring, which locals once thought was poisoned because insects died near it.' },
    { n: 'The old streets',
      d: 'Steep lanes with shops selling carbonated senbei, made with the spring water, which have been produced here since 1907.' },
    { n: 'Zuihoji Park',
      d: 'The site of Hideyoshi’s villa, with a tea house and good autumn colour.' },
    { n: 'The Rokko ropeway',
      d: 'Over the mountain to Kobe, with a view back across the bay. Much better than the tunnel.' }
  ],
  when: 'Year round. Autumn colour in November is very good.',
  stay: 'A night, or an afternoon from Kobe.',
  move: 'Kobe subway and Hokushin line, or the Rokko ropeway. About thirty minutes either way.',
  eat: 'Tansan senbei, and Tajima beef at the inns.'
},

'HYG-takeda': {
  intro: [
    'Takeda Castle is stone foundations on a ridge three hundred and fifty metres above the valley. The wooden buildings went centuries ago; what is left is the walls, laid out across the summit in a long thin plan that follows the ridge.',
    'On autumn mornings the valley below fills with fog and the ruins sit above it. That image, the castle in the sky, has made the place famous in the last fifteen years and it now gets crowds it was never built for.',
    'The fog is not guaranteed. It needs a clear night, a big temperature drop, high humidity and no wind, which is why September to November mornings are the window.'
  ],
  see: [
    { n: 'The ruins at dawn', t: 'late September to early December',
      d: 'For the sea of cloud you want to be up before sunrise. Thirty to forty minutes on foot from the nearest car park.' },
    { n: 'Ritsuunkyo viewpoint',
      d: 'On the mountain opposite, which is where the famous photographs are taken from. You see the castle above the cloud rather than standing in it.' },
    { n: 'The stonework',
      d: 'Ano-zumi style, fitted without mortar, four hundred years old and in good condition.' },
    { n: 'Takeda town',
      d: 'At the base, with a preserved street of temples along a canal.' }
  ],
  when: 'Late September to early December for the fog, and only on mornings after a cold clear night. The site closes in January and February.',
  stay: 'Half a day, starting very early.',
  move: 'JR Bantan line to Takeda station. From there a steep walk or a bus partway up.',
  eat: 'Very little. Bring something warm to drink.'
},

'HYG-awaji': {
  intro: [
    'In the Kojiki, Japan’s creation myth, Awaji is the first island the gods made. It is now joined to Kobe by the Akashi Kaikyo Bridge, which at 1,991 metres was the longest suspension span in the world until 2022.',
    'Tadao Ando has built a remarkable amount here: a Buddhist temple entered by walking down through an oval lotus pond, a chapel, and a conference centre set into a hillside. Together they make the island one of the best places to see his work.',
    'It is also an agricultural island, producing onions in a quantity it is genuinely proud of, and there is an onion-themed everything.'
  ],
  see: [
    { n: 'Honpuku-ji, the Water Temple',
      d: 'Ando, 1991. You descend a staircase through the middle of a concrete oval filled with lotus, into a red-lacquered hall below. One of his best buildings.' },
    { n: 'Akashi Kaikyo Bridge',
      d: 'There is a promenade underneath on the Kobe side and a tower tour that climbs inside the main pier. Book the tour ahead.' },
    { n: 'Naruto whirlpools',
      d: 'At the southern tip, in the strait towards Shikoku. Boats go out from both sides.' },
    { n: 'Awaji Yumebutai',
      d: 'Ando’s hillside complex built on the scar left by quarrying earth for Kansai Airport, with a hundred terraced flower beds.' },
    { n: 'Izanagi Jingu',
      d: 'Said to be where the creator deity retired, and among the oldest shrine foundations in Japan.' }
  ],
  when: 'Year round. Spring for the flower terraces.',
  stay: 'A day, with a car.',
  move: 'Bus from Kobe or Osaka across the bridge. A car is much better; the island is big and the bus network thin.',
  eat: 'Onions, famously sweet, and Awaji beef. Also very good sea bream.'
},

'HYG-ikuno': {
  intro: [
    'Ikuno silver mine was worked from 807 until 1973, which is eleven hundred years of continuous extraction. At its height under the Tokugawa it was one of the two most important mines in Japan.',
    'In 1868 the new Meiji government brought in French engineers to modernise it, and the houses they lived in still stand in the town below, looking entirely out of place in rural Hyogo.',
    'About a kilometre of tunnel is open, kept at a constant twelve degrees, with mannequins showing the work at different periods. It is a good deal better than that description suggests.'
  ],
  see: [
    { n: 'The tunnel',
      d: 'A kilometre underground, with hand-cut Edo galleries giving way to machine-cut Meiji ones. Bring a jacket.' },
    { n: 'The French houses',
      d: 'In the town, built for the engineers brought over in 1868. One is open as a museum.' },
    { n: 'Ikuno Ginzan Bunka no Michi',
      d: 'The old mine road through the town, with the smelting buildings and the company housing.' },
    { n: 'Takeda Castle',
      d: 'Twenty minutes up the line and the obvious pairing.' }
  ],
  when: 'Year round. Closed some days in winter.',
  stay: 'Two hours.',
  move: 'JR Bantan line to Ikuno, then a twenty-minute walk or a short taxi.',
  eat: 'Hayashi rice, which the mine canteen apparently popularised locally. A few small places in town.'
},

'HYG-sasayama': {
  intro: [
    'Tamba Sasayama is a castle town in the hills between Kyoto and the Sea of Japan, with a preserved merchant street, a samurai quarter and a reconstructed castle hall. It gets a fraction of the visitors of similar towns on the main routes.',
    'It is known nationally for black soybeans, which are grown here and sell at prices that look like a misprint. The best are kept for New Year and a single boxed set can cost thousands of yen.',
    'Tachikui, a short drive away, is Tamba ware, one of the six ancient kiln sites of Japan, with pottery made here continuously for about eight hundred years.'
  ],
  see: [
    { n: 'The merchant street',
      d: 'Kawaramachi, with lattice-fronted houses and tiled roofs, largely unaltered.' },
    { n: 'Sasayama Castle Oshoin',
      d: 'A faithful 2000 reconstruction in wood of the main hall, using the original techniques, on the surviving stone base.' },
    { n: 'Tachikui kilns',
      d: 'About sixty workshops, several with climbing kilns still fired. Tamba ware is unglazed and ash-glazed, rough and warm.' },
    { n: 'Black beans in autumn',
      d: 'Fresh edamame of the black soybean variety is sold roadside in October and is a different thing entirely from the ordinary kind.' },
    { n: 'Botan nabe',
      d: 'Wild boar hotpot, arranged on the plate in a flower shape, which is the winter speciality.' }
  ],
  when: 'October for beans, winter for boar, spring for the castle grounds.',
  stay: 'A day, with a car for the kilns.',
  move: 'JR Fukuchiyama line to Sasayamaguchi, then a bus. About an hour from Osaka.',
  eat: 'Boar in winter, black bean everything, and Tamba chestnuts in autumn.'
},

/* ===================== SHIGA ===================== */
'SHG-hikone': {
  intro: [
    'Hikone has one of the twelve original castle keeps, built between 1603 and 1622 using timbers taken from other dismantled castles, which was normal practice and is visible if you look at the joinery.',
    'It was nearly demolished in the 1870s along with most Japanese castles. The story is that the Meiji emperor passed through, saw it, and ordered it spared. Whether that is strictly true, it survived, and it is now a national treasure.',
    'Genkyu-en below it is a strolling garden from 1677 borrowing the keep as a backdrop. The town mascot is a white cat in a red samurai helmet called Hikonyan, who appears three times a day and has his own merchandise economy.'
  ],
  see: [
    { n: 'The keep',
      d: 'Small by castle standards and beautifully proportioned, with hidden windows and gun ports. The stairs inside are close to vertical.' },
    { n: 'Genkyu-en',
      d: 'Below the keep, with a tea house where you can sit and look up at the castle over the pond. Cheap combined ticket.' },
    { n: 'Hikonyan',
      d: 'Appears on a schedule posted at the entrance. It is genuinely funny how seriously this is taken.' },
    { n: 'Yume Kyobashi Castle Road',
      d: 'A reconstructed Edo street below the castle, which is a bit stagey but has good shops.' },
    { n: 'Lake Biwa',
      d: 'The castle looks out over it. Boats to Chikubushima island leave from the port.' }
  ],
  when: 'Year round. Blossom in early April around the moat.',
  stay: 'Half a day.',
  move: 'Fifty minutes from Kyoto on the JR Biwako line. The castle is fifteen minutes’ walk from the station.',
  eat: 'Omi beef, which predates Kobe as a brand and some argue is better. Several restaurants near the castle serve it.'
},

'SHG-enryakuji': {
  intro: [
    'Enryaku-ji was founded on Mount Hiei in 788 and became the most powerful religious institution in Japan. Almost every major school of Japanese Buddhism was founded by someone who trained here: Honen, Shinran, Nichiren, Dogen and Eisai all passed through.',
    'It also fielded an army. The warrior monks of Hiei intervened in Kyoto politics for centuries, until Oda Nobunaga surrounded the mountain in 1571, burned the complex and killed everyone on it, including women and children. The figure usually given is several thousand.',
    'What stands now is a rebuilding. The monks here still perform the kaihogyo, a thousand-day walking practice spread over seven years, in which failure traditionally required suicide. Fewer than fifty men have completed it since 1885.'
  ],
  see: [
    { n: 'Konpon Chudo',
      d: 'The main hall, with a lamp said to have burned continuously since 788, relit after Nobunaga from a flame taken to another temple. Under long-term restoration; you can view the work from a gantry.' },
    { n: 'The three areas',
      d: 'Todo, Saito and Yokawa, spread over the mountain with shuttle buses between. Saito is the quietest and has the best atmosphere.' },
    { n: 'Jodoin',
      d: 'Where the founder is buried, maintained by a monk who lives in twelve-year seclusion cleaning it. Spotless and silent.' },
    { n: 'The cable car',
      d: 'From Sakamoto on the Shiga side, which is the longest cable car in Japan and much nicer than the road.' },
    { n: 'Sakamoto town',
      d: 'At the base, with distinctive dry-stone retaining walls built by a guild of masons who worked for the temple.' }
  ],
  when: 'April to November. Winter closes parts of the mountain and it is bitterly cold.',
  stay: 'Most of a day.',
  move: 'Cable car from Sakamoto, or the Eizan cable car and ropeway from the Kyoto side.',
  eat: 'Shojin ryori at the temple by reservation. Sakamoto has soba.'
},

'SHG-biwa': {
  intro: [
    'Lake Biwa is the largest lake in Japan, covering about a sixth of Shiga prefecture, and at roughly four million years old it is one of the twenty oldest lakes in the world. That age has produced around sixty endemic species.',
    'It supplies drinking water to fourteen million people in Kyoto and Osaka, which is why the prefecture has an unusually aggressive environmental policy and banned phosphate detergent in 1980 after algal blooms.',
    'Cycling the full circuit is about two hundred kilometres on a signed route, which has become a serious cycling destination in the last decade.'
  ],
  see: [
    { n: 'Biwaichi',
      d: 'The lap of the lake, signed with a blue line, done in two to three days. Bike hire and luggage transfer available at Maibara and Otsu.' },
    { n: 'Chikubushima',
      d: 'A small island reached by boat, steep and wooded, with a shrine where you write a wish on a dish and throw it at a torii in the water.' },
    { n: 'Omi-Hachiman',
      d: 'A merchant town on the east shore with a canal, climbing boats, and the houses of the Omi traders who were the other great merchant class after Osaka.' },
    { n: 'Shirahige Shrine',
      d: 'The gate in the water on the west shore, best at sunrise.' },
    { n: 'The Biwako Terrace',
      d: 'A ropeway up from the west shore to a cafe deck at eleven hundred metres looking down the length of the lake.' }
  ],
  when: 'Spring and autumn for cycling. Summer for swimming, which people do.',
  stay: 'A day, or three for the full lap.',
  move: 'Otsu is ten minutes from Kyoto. The lake is circled by rail on both sides.',
  eat: 'Funazushi, fermented crucian carp, which is a thousand-year-old preservation technique and an acquired taste that many never acquire. Also very good freshwater fish and Omi beef.'
},

'SHG-shirahige': {
  intro: [
    'A vermilion torii standing in Lake Biwa about fifty metres offshore, with a shrine on the bank behind it. The shrine itself claims a founding under Empress Suiko around 1,900 years ago, which makes it the oldest in Shiga.',
    'The gate is the reason people come, and sunrise over the lake behind it is the photograph. In winter the light lines up particularly well.',
    'A warning that is not decorative: the national highway runs between the shrine and the gate, it is fast, and there is no crossing. People have been killed here walking out for a picture. Use the pedestrian underpass.'
  ],
  see: [
    { n: 'The torii at sunrise',
      d: 'Facing east across the lake. Best from late autumn through winter when the sun comes up in the right place.' },
    { n: 'The shrine',
      d: 'Up the slope behind, with a 1603 main hall rebuilt by Toyotomi Hideyori and a set of small shrines on the hillside.' },
    { n: 'The underpass',
      d: 'Use it. The road is the most dangerous thing about this site by a wide margin.' },
    { n: 'The lakeside cycle route',
      d: 'The Biwaichi route runs past the gate, and this is one of the better stretches of it.' }
  ],
  when: 'Winter mornings for light and quiet. Summer brings crowds and traffic.',
  stay: 'Forty minutes.',
  move: 'Omi-Takashima station on the Kosei line, then a bus or a thirty-minute walk.',
  eat: 'Nothing here. Omi-Takashima has a few places.'
},

'SHG-miho': {
  intro: [
    'I M Pei was asked to build a museum in a mountain forest that was a protected area, so eighty per cent of the building is underground. You arrive at a reception pavilion, walk through a two-hundred-metre tunnel lined with polished steel, and emerge onto a suspension bridge over a ravine with the museum entrance at the far end.',
    'Pei said he was thinking of the Peach Blossom Spring, a fourth-century Chinese story about a fisherman who follows a stream through a cave into a hidden valley. The approach is designed to reproduce that, and it does.',
    'The collection inside is Egyptian, Persian, Greek, Roman, Gandharan and Chinese antiquities, assembled by the founder of a religious organisation. The building is the better exhibit.'
  ],
  see: [
    { n: 'The tunnel and bridge',
      d: 'Walk it rather than taking the shuttle buggy. In early April the cherries along the approach are in flower and the effect is calculated and effective.' },
    { n: 'The North Wing',
      d: 'Antiquities, including a Gandharan standing Buddha and a Roman mosaic floor.' },
    { n: 'The South Wing',
      d: 'Japanese art, shown in rotation.' },
    { n: 'The geometry',
      d: 'Pei’s glass roof structure over the lobby, with a view framed onto a single pine on the ridge opposite. Sit down and look at it.' },
    { n: 'The restaurant',
      d: 'Uses produce grown without chemicals by the foundation. Better than museum food usually is.' }
  ],
  when: 'The museum opens seasonally with closures of several weeks at a time. Check the calendar before travelling; people do turn up to a shut gate.',
  stay: 'Three hours.',
  move: 'Ishiyama station then a bus of about fifty minutes. A car is easier.',
  eat: 'The on-site restaurant and tea house.'
},

/* ===================== WAKAYAMA ===================== */
'WKY-koyasan': {
  intro: [
    'Kobo Daishi founded a monastery on this mountain plateau in 816, and the town that grew around it now has about fifty temples that take overnight guests. Staying in one, eating the vegetarian food and attending the morning service is the reason to come.',
    'The plateau sits at eight hundred metres, ringed by eight peaks, and the air is noticeably different from the valley. It was closed to women until 1872.',
    'Okunoin, the cemetery, holds over two hundred thousand graves along a two-kilometre path under cedars that are centuries old. Kobo Daishi is held not to have died in 835 but to be in eternal meditation, and monks still carry meals to him twice a day.'
  ],
  see: [
    { n: 'Okunoin at night',
      d: 'The path is lit and open. Walking it after dark, alone, with the cedars going up out of sight, is the single most memorable thing on this mountain.' },
    { n: 'Shukubo temple lodging',
      d: 'Tatami rooms, shared baths, dinner and breakfast of shojin ryori, and a 6am service you are welcome to attend. Book well ahead through the central office.' },
    { n: 'Kongobu-ji',
      d: 'The head temple, with a 2,340 square metre rock garden, the largest in Japan, and painted sliding doors.' },
    { n: 'Danjo Garan',
      d: 'The original monastic complex, with the enormous vermilion Konpon Daito pagoda whose interior is painted as a three-dimensional mandala.' },
    { n: 'The Choishi-michi',
      d: 'The old pilgrimage trail up from the valley, twenty-four kilometres with stone markers every hundred and nine metres. Seven hours, and the proper way to arrive.' }
  ],
  when: 'April to November. Winter is very cold and some lodgings close, though snow on the cemetery is extraordinary.',
  stay: 'One night minimum, two is better.',
  move: 'Nankai line from Osaka to Gokurakubashi, then a cable car and a bus. About two hours from Namba.',
  eat: 'Shojin ryori at your temple. Goma-dofu, sesame tofu, is the local speciality and is nothing like ordinary tofu.'
},

'WKY-kumano-kodo': {
  intro: [
    'The Kumano Kodo is a network of pilgrimage routes through the mountains of the Kii peninsula, walked for over a thousand years by everyone from retired emperors to peasants. It is one of only two pilgrimage routes with World Heritage status; the other is the Camino de Santiago, and the two have a formal partnership.',
    'The destination is three shrines, Hongu, Hayatama and Nachi, collectively the Kumano Sanzan. The routes are the point as much as the shrines.',
    'The Nakahechi, the imperial route from the west, is the most walked and the best organised, with luggage transfer between inns. Four to five days gets you across.'
  ],
  see: [
    { n: 'Nakahechi route',
      d: 'Takijiri to Hongu in two or three days, then on to Nachi. Signed, maintained, with inns at intervals. Book accommodation months ahead; there is very little of it.' },
    { n: 'Kumano Hongu Taisha',
      d: 'The head shrine, moved uphill after a flood in 1889 destroyed the original site. The old site, Oyunohara, has the largest torii in the world at thirty-four metres.' },
    { n: 'Kumano Nachi Taisha and the falls',
      d: 'The shrine beside Japan’s tallest single-drop waterfall, with a pagoda framed in front of it.' },
    { n: 'The dual pilgrim certificate',
      d: 'Walk sections of both this and the Camino and you can register as a dual pilgrim. People do.' },
    { n: 'Yunomine and Kawayu onsen',
      d: 'Where pilgrims purified. At Kawayu you dig your own bath in the riverbed and hot water comes up through the gravel.' }
  ],
  when: 'March to May and October to November. Summer is hot and humid with leeches; winter is walkable but cold.',
  stay: 'Four to six days for the Nakahechi.',
  move: 'Kii-Tanabe station is the usual start, reached by limited express from Osaka in two hours. Buses serve the trailheads.',
  eat: 'Inn dinners, mehari-zushi rice wrapped in pickled mustard leaf, and river fish.'
},

'WKY-nachi': {
  intro: [
    'Nachi Falls drops a hundred and thirty-three metres in a single unbroken fall, which makes it the tallest in Japan. It is not beside the shrine; it is the shrine. The waterfall itself is the object of worship and has been since before Buddhism arrived.',
    'The three-storey pagoda of Seiganto-ji is positioned so that the fall appears directly behind it, and that composition is one of the most reproduced images in Japan.',
    'Seiganto-ji is the first temple on the Saigoku pilgrimage, a thirty-three temple circuit that is older than the Shikoku one and much less walked.'
  ],
  see: [
    { n: 'The pagoda and the falls together',
      d: 'From the temple grounds. Morning light is better. The viewing platform at the base of the fall costs a few hundred yen and gets you properly wet in spray.' },
    { n: 'Kumano Nachi Taisha',
      d: 'Up a long stone stair, vermilion, with an eight-hundred-year-old camphor tree you can walk through the hollow trunk of.' },
    { n: 'The Daimonzaka',
      d: 'A six-hundred-metre cobbled stair through enormous cedars, part of the Kumano Kodo, climbing to the shrine. You can hire Heian-period costume at the bottom, which a lot of people do.' },
    { n: 'The Nachi Fire Festival', t: '14 July',
      d: 'Twelve enormous torches carried down the steps to purify twelve portable shrines. Extraordinary and very crowded.' },
    { n: 'Taiji',
      d: 'Down the coast, and the town at the centre of the dolphin hunting controversy. Worth knowing it is there.' }
  ],
  when: 'Year round. July for the fire festival. Spring and autumn for walking the Daimonzaka.',
  stay: 'Half a day, or a night at Katsuura nearby.',
  move: 'Kii-Katsuura station then a bus of about thirty minutes.',
  eat: 'Katsuura is a major tuna port and the auction there is open to visitors in the morning.'
},

'WKY-shirahama': {
  intro: [
    'Shirahama has been a hot spring resort since the seventh century, with mentions in the Nihon Shoki, and a beach of white sand that was imported from Western Australia after the original washed away.',
    'That sounds like cheating and it is, but the result is a genuinely good beach with warm water, which is rare on this coast.',
    'The reason to come is Saki no Yu, a public bath on the rocks at the water’s edge where the waves break a few metres from you. It has been in use for thirteen hundred years and has no roof.'
  ],
  see: [
    { n: 'Saki no Yu',
      d: 'Open-air, rock-built, on the shoreline. Closed in rough seas. Small fee, no soap allowed, and the single best bath in this part of Japan.' },
    { n: 'Sandanbeki',
      d: 'Fifty-metre cliffs with a lift down to a sea cave that was used by a medieval naval clan to hide boats.' },
    { n: 'Engetsuto',
      d: 'A small island with a hole eroded through it, aligned so the setting sun passes through it in spring and autumn.' },
    { n: 'Adventure World',
      d: 'A safari park and aquarium that has had notable success breeding giant pandas. Divisive, and extremely popular domestically.' },
    { n: 'Tore Tore market',
      d: 'A large fish market with a tuna cutting demonstration and a food hall.' }
  ],
  when: 'Summer for the beach, year round for the baths.',
  stay: 'A night or two.',
  move: 'Limited express from Osaka, about two and a half hours.',
  eat: 'Tuna from Katsuura, and Kumano beef.'
},

'WKY-yunomine': {
  intro: [
    'Yunomine is a handful of inns along a stream in a narrow valley, and the hot spring here is claimed as the oldest in Japan, discovered about eighteen hundred years ago. The water comes out of the ground at ninety degrees and bubbles visibly in the streambed.',
    'Tsuboyu, a small wooden hut built over the source, is the only hot spring in the world with World Heritage status, because Kumano pilgrims purified in it before completing the route. You book it in half-hour slots for one or two people.',
    'Villagers cook eggs and vegetables in the stream in net bags. You can buy an egg at the shop and do the same.'
  ],
  see: [
    { n: 'Tsuboyu',
      d: 'Buy a numbered ticket at the public bathhouse and wait your turn. The bath is tiny, the water changes colour through the day, and it is genuinely one of a kind.' },
    { n: 'Yuzutsu',
      d: 'The cooking spring. Eggs take about twelve minutes, sweet potato about half an hour.' },
    { n: 'Toko-ji',
      d: 'The temple above the village, with a Buddha said to be carved from hot spring mineral deposits.' },
    { n: 'Kawayu Onsen',
      d: 'Ten minutes away, where you dig into the riverbed and make your own bath. In winter they bulldoze an enormous one.' },
    { n: 'The Dainichi-goe',
      d: 'A short section of the Kumano Kodo, about ninety minutes over the hill to Hongu, which is how pilgrims arrived.' }
  ],
  when: 'Year round. Winter is best for the river baths at Kawayu.',
  stay: 'A night.',
  move: 'Bus from Kii-Tanabe or Shingu, about two hours either way.',
  eat: 'Inn dinners. Onsen-cooked eggs from the stream.'
},

'WKY-koyasan-okunoin': {
  intro: [
    'Okunoin is the largest cemetery in Japan and does not feel like a cemetery. A two-kilometre path runs under cedars that were planted when the graves were new, past two hundred thousand monuments, from imperial princes to a memorial erected by a pest control company for the termites it has killed.',
    'Most of the great warlords are here, including Oda Nobunaga, who burned Mount Hiei, and Takeda Shingen and Uesugi Kenshin, who fought each other for decades. Everybody ends up on the same mountain.',
    'At the far end is the Gobyo, the mausoleum where Kobo Daishi is held to be meditating rather than dead. Monks bring him breakfast and lunch every day and have done for twelve hundred years.'
  ],
  see: [
    { n: 'The path at night',
      d: 'Lit, open, and a completely different place after dark. Several temples run guided night walks with a monk, which are worth doing.' },
    { n: 'The food offering', t: '6am and 10:30am',
      d: 'Monks carry a meal to the mausoleum in procession. You can watch from the bridge; photography stops there.' },
    { n: 'Torodo Hall',
      d: 'The lantern hall in front of the mausoleum, with around ten thousand lanterns, two of which are said to have burned since the eleventh century.' },
    { n: 'Miroku Stone',
      d: 'A stone in a cage that you lift from one shelf to another with one hand. It is said to feel heavier if you have behaved badly.' },
    { n: 'The corporate graves',
      d: 'Companies have plots here. There is a rocket, a coffee cup, and the termite memorial. Entirely sincere.' }
  ],
  when: 'Year round, day or night, free. Snow in winter is remarkable.',
  stay: 'Two hours, plus a night walk if you are staying.',
  move: 'Bus from Koyasan town to Okunoin-mae for the short route, or Ichinohashi for the full two kilometres, which is the one to do.',
  eat: 'Nothing on the path. Back in town.'
},

/* ===================== MIE ===================== */
'MIE-ise': {
  intro: [
    'Ise Jingu is the most important shrine in Shinto, dedicated to Amaterasu, and it is rebuilt from scratch every twenty years on an adjacent plot. The sixty-second rebuilding was completed in 2013; the next is due in 2033.',
    'Everything is replaced: the buildings, the bridge, the fittings, down to the vessels used in ritual. Around ten thousand cypress trees are used. The practice has run for thirteen hundred years and it means the architecture is simultaneously ancient and brand new.',
    'The buildings are unpainted cypress with thatched roofs, raised on posts, with no nails and no Chinese influence. You cannot see much of the inner shrine; a fence, a gate, a glimpse of a roof. Photography stops at the bottom of the steps and the guards enforce it.'
  ],
  see: [
    { n: 'Naiku, the inner shrine',
      d: 'Cross the Uji bridge, which is also rebuilt every twenty years, walk through gravel and enormous cedars, and climb to the gate. The vacant plot beside it, where the previous shrine stood, is as interesting as the current building.' },
    { n: 'Geku, the outer shrine',
      d: 'Traditionally visited first. Quieter, with the same architecture and a good museum of the rebuilding process nearby.' },
    { n: 'Okage Yokocho',
      d: 'A reconstructed Edo street outside Naiku, commercial but well done, with food stalls and the Akafuku tea house.' },
    { n: 'The Meoto Iwa',
      d: 'The wedded rocks at Futami, where pilgrims traditionally purified before coming to Ise.' },
    { n: 'The forest',
      d: 'Five and a half thousand hectares, managed for two hundred years to grow the cypress for future rebuildings.' }
  ],
  when: 'Year round, from sunrise. New Year brings enormous numbers. Early morning is the time.',
  stay: 'Most of a day for both shrines.',
  move: 'Kintetsu from Nagoya or Osaka to Iseshi, about ninety minutes. Buses between the two shrines.',
  eat: 'Ise udon, very soft noodles in a dark sweet sauce, which divides people. Akafuku mochi with red bean, made since 1707.'
},

'MIE-toba': {
  intro: [
    'Mikimoto Kokichi produced the first cultured pearl here in 1893 after years of failure, by inserting a nucleus into an oyster and waiting. It took him another ten years to produce a spherical one. He effectively created the modern pearl industry.',
    'Toba is also the centre of the ama, women who free-dive for shellfish and seaweed without tanks. The tradition goes back about two thousand years and the divers are now mostly in their sixties and seventies with very few successors.',
    'You can eat with ama in small huts along the coast, where they grill what they have caught over charcoal and talk about the work. It is the best thing here.'
  ],
  see: [
    { n: 'Mikimoto Pearl Island',
      d: 'A museum on the invention of the cultured pearl, with ama diving demonstrations several times a day in white diving suits.' },
    { n: 'An ama hut lunch',
      d: 'Book ahead through one of the operators at Osatsu. Scallops, turban shells and lobster over charcoal, with the divers themselves cooking.' },
    { n: 'Toba Aquarium',
      d: 'One of the best in Japan, with dugongs, which almost no other aquarium has.' },
    { n: 'Ise-Shima National Park',
      d: 'The ria coastline south of here, with pearl rafts in the inlets. The drive round Ago Bay is the thing.' },
    { n: 'Meoto Iwa',
      d: 'Fifteen minutes north at Futami.' }
  ],
  when: 'Year round. Summer for the water, winter for shellfish.',
  stay: 'A day, or a night at Kashikojima.',
  move: 'Kintetsu from Nagoya or Osaka, with Toba about twenty minutes beyond Ise.',
  eat: 'Ise-ebi spiny lobster, oysters in winter, and whatever the ama grill in front of you.'
},

'MIE-meoto-iwa': {
  intro: [
    'Two rocks off the shore at Futami, joined by a shimenawa rope that weighs about a tonne. The larger represents the husband, the smaller the wife, and they stand for the union of the creator deities and, by extension, marriage.',
    'The rope is replaced three times a year in a ceremony where men wade out in the cold to haul the new one into place. It is a genuinely good thing to watch.',
    'Between May and July the sun rises between the two rocks. In midwinter, the moon does instead, and on the clearest days Fuji is visible behind them, which is about two hundred kilometres away.'
  ],
  see: [
    { n: 'Sunrise between the rocks', t: 'May to July',
      d: 'Peak alignment is around the summer solstice. People arrive well before dawn.' },
    { n: 'The rope changing', t: 'May, September, December',
      d: 'Held early in the morning on set dates. Check with Futami Okitama Shrine.' },
    { n: 'Futami Okitama Shrine',
      d: 'On the shore, with frog statues everywhere because the word for frog also means return, and travellers prayed for a safe one.' },
    { n: 'The purification walk',
      d: 'Traditionally pilgrims washed here before going on to Ise. Doing it in that order makes the Ise visit make more sense.' }
  ],
  when: 'May to July for the sunrise. Winter for the moon and the chance of Fuji.',
  stay: 'An hour.',
  move: 'Futaminoura station, ten minutes’ walk. Between Iseshi and Toba.',
  eat: 'A few places near the shrine. Eat in Ise or Toba.'
},

'MIE-iga': {
  intro: [
    'Iga was one of the two centres of ninjutsu, the other being Koka across the prefecture border. The mountainous terrain and the absence of a single controlling lord meant local families developed their own military practices and hired themselves out.',
    'The Iga-ryu Ninja Museum is housed in a relocated farmhouse rigged with revolving walls, trapdoors and hidden floor compartments, demonstrated by guides in costume who are very good at it. It is aimed at families and is better than that implies.',
    'Basho was also born here, and there is a haiku museum and a memorial hall shaped like a travelling hat.'
  ],
  see: [
    { n: 'The ninja house',
      d: 'Reversible walls, a hidden sword under the floor, an escape route behind a hearth. The demonstration takes about fifteen minutes and the mechanisms are real.' },
    { n: 'The weapon exhibition',
      d: 'Shuriken, caltrops, climbing gear and a lot of debunking of the black-pyjamas image.' },
    { n: 'Iga-Ueno Castle',
      d: 'With one of the highest stone walls in Japan at about thirty metres, and a 1935 wooden reconstruction of the keep.' },
    { n: 'Basho’s birthplace',
      d: 'A small house in town, plus the Haiseiden memorial hall built in the shape of a travelling monk.' },
    { n: 'The ninja train',
      d: 'The local Iga line runs trains painted as ninja. Deeply silly.' }
  ],
  when: 'Year round. The ninja festival runs through April and May and the whole town dresses up.',
  stay: 'Half a day.',
  move: 'Iga Railway from Iga-Ueno station. About ninety minutes from Osaka or Nagoya.',
  eat: 'Iga beef, which is less famous than Matsusaka and comes from the same region and breeding.'
},

'MIE-nabana': {
  intro: [
    'Nabana no Sato is a flower park with a winter illumination that runs from late October to May, using several million LEDs. It includes a two-hundred-metre tunnel of lights you walk through and a large panel display that changes theme each year.',
    'It is unapologetically commercial and completely over the top, which is the point. Japanese winter illuminations are a genre and this is the most ambitious of them.',
    'In daylight the begonia greenhouse is worth the entry on its own, with the flowers arranged in banked walls.'
  ],
  see: [
    { n: 'The light tunnel',
      d: 'Two hundred metres of LED wisteria. A second shorter tunnel changes theme seasonally.' },
    { n: 'The main display',
      d: 'A huge animated panel viewed from a bank. Queues form; go on a weekday.' },
    { n: 'The begonia garden',
      d: 'Four greenhouses, kept warm, with flowers banked to the ceiling. Open year round.' },
    { n: 'The flower fields',
      d: 'Tulips in spring, cosmos and dahlias in autumn.' },
    { n: 'The foot bath',
      d: 'A hot spring footbath included with entry, which is welcome in January.' }
  ],
  when: 'Late October to early May for the illumination, which peaks in December and January.',
  stay: 'An evening.',
  move: 'Bus from Nagashima or a direct bus from Nagoya station, about thirty minutes.',
  eat: 'Several restaurants on site, including a beer garden with an on-site brewery.'
},

/* ===================== TOCHIGI ===================== */
'TCG-nikko': {
  intro: [
    'Toshogu is the mausoleum of Tokugawa Ieyasu, who unified Japan and whose descendants ruled it for two hundred and fifty years. His grandson rebuilt it in 1636 on a scale meant to make the point permanently, and there are over five thousand carvings on the buildings.',
    'Japanese architectural taste generally runs to restraint, and Toshogu is the opposite of restraint. Gold leaf, lacquer, polychrome carving on every surface. Some Japanese critics have always considered it vulgar. Standing in front of the Yomeimon gate, with its five hundred and eight carvings, you can see both arguments at once.',
    'The three wise monkeys are here, on a stable, part of a sequence of eight panels about the life course. So is a sleeping cat, carved by a man known only as Jingoro, which is about twenty centimetres across and signposted from everywhere.'
  ],
  see: [
    { n: 'Yomeimon gate',
      d: 'Restored in 2017 and the colours are startling. One of the twelve pillars has its pattern carved upside down, deliberately, because a perfect building would invite misfortune.' },
    { n: 'The sleeping cat and the stair to the tomb',
      d: 'Through the gate behind the cat, two hundred and seven steps up through cedars to Ieyasu’s surprisingly plain urn. The contrast is the whole point.' },
    { n: 'Rinnoji and Taiyuinbyo',
      d: 'Taiyuinbyo is the grandson’s mausoleum, deliberately less lavish than his grandfather’s out of respect, and many people prefer it. Far fewer visitors.' },
    { n: 'Shinkyo bridge',
      d: 'The red bridge over the Daiya river at the entrance to the town. You pay to walk on it, which almost nobody does.' },
    { n: 'The cedar avenue',
      d: 'Thirty-seven kilometres of cedars planted along the approach roads over twenty years from 1628, by a lord who could not afford a lavish gift. About twelve thousand survive.' }
  ],
  when: 'Late October to early November for colour, which is spectacular and jams the roads. Winter is quiet and the snow on the lacquer is very good.',
  stay: 'A full day, or a night to add Chuzenji.',
  move: 'Tobu line from Asakusa, about two hours on the limited express. The Nikko Pass covers trains and local buses.',
  eat: 'Yuba, the skin from soy milk, which Nikko does better than anywhere except Kyoto because of the water.'
},

'TCG-chuzenji': {
  intro: [
    'Lake Chuzenji was formed about twenty thousand years ago when Mount Nantai erupted and dammed the valley. It sits at twelve hundred metres, twelve kilometres above Nikko town, reached by a road with forty-eight hairpin bends that are numbered and named after the kana syllabary.',
    'The Kegon falls drop ninety-seven metres out of the lake. There is a lift down through the rock to a platform at the base, which is the right way to see it.',
    'In the early twentieth century this was where foreign diplomats summered, and the British and Italian embassy villas on the shore are both open as museums.'
  ],
  see: [
    { n: 'Kegon Falls',
      d: 'The lift to the base costs a few hundred yen and is worth it. Volume is highest after rain and in the spring melt. In deep winter it partly freezes.' },
    { n: 'The Irohazaka road',
      d: 'Forty-eight bends, one-way in each direction on separate roads. In late October the traffic jam is legendary and people still do it.' },
    { n: 'The embassy villas',
      d: 'The British and Italian villas on the quiet south shore, restored, with verandas over the water. The walk between them along the lake is lovely.' },
    { n: 'Senjogahara marsh',
      d: 'A boardwalk across a high moor above the lake, about six kilometres, with Yutaki falls at one end. The best walk in the area.' },
    { n: 'Mount Nantai',
      d: 'A four-hour climb from the shrine at the lakeside, open July to October, treated as a pilgrimage.' }
  ],
  when: 'Mid to late October for colour. The road can close in winter snow. Summer is cool and pleasant.',
  stay: 'A full day from Nikko, or a night at the lake.',
  move: 'Bus from Nikko station, about fifty minutes up the Irohazaka.',
  eat: 'Lake trout, and yuba again.'
},

'TCG-kinugawa': {
  intro: [
    'Kinugawa Onsen is a hot spring resort in a river gorge, developed hard in the bubble years and then hit by the collapse. Several large hotels stand abandoned along the river, which gives the place an unusual atmosphere that some people find grim and others find fascinating.',
    'The baths and the gorge are genuinely good. There is rafting on the river, a ropeway, and a line of inns with rotenburo looking down into the valley.',
    'It is also the gateway to two theme parks that are odd enough to mention: a reconstructed Edo village with actors, and a park of scale models of world monuments.'
  ],
  see: [
    { n: 'The gorge',
      d: 'Walk the riverside path or take a flat-bottomed boat down a three-kilometre stretch.' },
    { n: 'Edo Wonderland',
      d: 'A full Edo-period town with ninja shows, a courtesan procession and actors who stay in character. Far better executed than it sounds.' },
    { n: 'Tobu World Square',
      d: 'A hundred and two scale models of world buildings at 1:25, with a hundred and forty thousand tiny figures. Strange and oddly absorbing.' },
    { n: 'The abandoned hotels',
      d: 'Visible from the river path. Do not enter them; they are derelict and unsafe.' },
    { n: 'Rafting',
      d: 'Operators run the Kinugawa from spring to autumn.' }
  ],
  when: 'Autumn for colour in the gorge. Year round for the baths.',
  stay: 'A night, usually as part of a Nikko trip.',
  move: 'Tobu line from Asakusa or a change at Shimo-Imaichi from Nikko.',
  eat: 'Inn dinners. The town itself has limited options.'
},

'TCG-ashikaga': {
  intro: [
    'The great wisteria at Ashikaga Flower Park is about a hundred and sixty years old, and its canopy has been trained flat across a frame covering roughly a thousand square metres. You walk underneath it with the racemes hanging down around you.',
    'The tree was moved to this site in 1996, which required a specialist who had never attempted anything like it. Moving a wisteria of that age was considered impossible; it took about six months and it survived.',
    'There is also an eighty-metre tunnel of white wisteria, and a winter illumination that regularly ranks as the best in Japan.'
  ],
  see: [
    { n: 'The great wisteria', t: 'mid-April to early May',
      d: 'Peak is usually the last week of April. Lit at night, which doubles the effect and the crowd.' },
    { n: 'The white tunnel',
      d: 'Eighty metres of white wisteria trained overhead, flowering slightly later than the purple.' },
    { n: 'Flower Fantasy illumination', t: 'late October to mid-February',
      d: 'Five million lights including a wisteria made of LEDs, which is a strange thing to see in January.' },
    { n: 'The rest of the year',
      d: 'Rose gardens in May and June, amethyst sage in autumn. The park works outside wisteria season, just less dramatically.' },
    { n: 'Ashikaga Gakko',
      d: 'In the town, claimed as Japan’s oldest school, dating from at least the fifteenth century.' }
  ],
  when: 'Late April for wisteria, with timed entry and surge pricing. November to February for the lights.',
  stay: 'Three hours.',
  move: 'Ashikaga Flower Park station on the JR Ryomo line, opened in 2018 directly outside the gate.',
  eat: 'Park restaurants, plus wisteria-flavoured ice cream, which tastes mostly of grape.'
},

'TCG-mashiko': {
  intro: [
    'Mashiko has made pottery since 1853, but it became important in 1924 when Hamada Shoji settled here. Hamada had worked in St Ives with Bernard Leach and brought back an idea about the dignity of everyday handmade objects, which became the mingei folk craft movement.',
    'The clay here is coarse and iron-rich, which gives Mashiko ware its heavy feel and earthy glazes. There are around two hundred and fifty kilns and over fifty shops.',
    'A 2011 earthquake destroyed a large proportion of the stock and several climbing kilns. The recovery is complete and the town is busier than it was.'
  ],
  see: [
    { n: 'Hamada Shoji Memorial Museum',
      d: 'His house and workshop, with his own collection of folk craft from around the world. The climbing kiln is in the grounds.' },
    { n: 'The pottery fair', t: 'Golden Week and early November',
      d: 'Around five hundred stalls, half a million visitors, and prices well below the shops.' },
    { n: 'The shops on the main street',
      d: 'Fifty or so, ranging from production ware to individual potters. Most will let you handle everything.' },
    { n: 'Throwing a pot',
      d: 'Several studios run short sessions for visitors with no experience, and will fire and post the result.' },
    { n: 'Mashiko Museum of Ceramic Art',
      d: 'With relocated historic buildings including a thatched longhouse in the grounds.' }
  ],
  when: 'Early May and early November for the fairs. Year round otherwise.',
  stay: 'A day.',
  move: 'Mooka Railway from Shimodate, or a bus from Utsunomiya. About two and a half hours from Tokyo.',
  eat: 'Utsunomiya is the gyoza capital of Japan and is on the way back.'
},

'TCG-oya': {
  intro: [
    'Oya stone is a soft volcanic tuff quarried here since the eighth century and used for walls, warehouses and, famously, the lobby of Frank Lloyd Wright’s Imperial Hotel in Tokyo.',
    'One quarry was worked from 1919 to 1986, and what it left is a chamber of about twenty thousand square metres with ceilings up to thirty metres, reached by a long stair. The temperature inside stays around eight degrees year round, so it was used to store rice and, during the war, aircraft parts.',
    'It is now used for concerts, art installations and film shoots, and walking into it is genuinely startling. Take a jacket even in August.'
  ],
  see: [
    { n: 'The underground chamber',
      d: 'Lit sparsely and deliberately. The tool marks on the walls record the shift from hand-cutting to machine. Around eight degrees; dress for it.' },
    { n: 'Oya-ji temple',
      d: 'Nearby, with Buddhist figures carved directly into the rock face in the ninth century, under a hall built around them.' },
    { n: 'The Heiwa Kannon',
      d: 'A twenty-seven metre figure carved into a quarry face after the war as a memorial, between 1948 and 1954.' },
    { n: 'The quarry landscape',
      d: 'Cut faces and stacked blocks across the valley, which is an industrial landscape worth the walk.' }
  ],
  when: 'Year round, and the cave is a reliable escape from August heat.',
  stay: 'Two hours.',
  move: 'Bus from Utsunomiya, about thirty minutes.',
  eat: 'Gyoza in Utsunomiya, which the city takes extremely seriously and competes with Hamamatsu over.'
},

/* ===================== GUNMA ===================== */
'GNM-kusatsu': {
  intro: [
    'Kusatsu produces more hot spring water than any other resort in Japan, about thirty-two thousand litres a minute, and it arrives at around fifty-five degrees. That is too hot to get into.',
    'Rather than add cold water, which would dilute the minerals, the town developed yumomi: cooling the water by stirring it with long wooden paddles while singing. There is a demonstration several times a day and it is a performance, but it is also exactly how the problem was solved.',
    'The water is strongly acidic, around pH 2, acidic enough to dissolve a one yen coin in a week. It is also genuinely effective on skin conditions, which is why people have come here for centuries.'
  ],
  see: [
    { n: 'Yubatake',
      d: 'The hot water field in the centre of town, where the source water is run through wooden channels to cool and sulphur is collected. Lit at night and the symbol of the place.' },
    { n: 'The yumomi demonstration',
      d: 'At Netsunoyu beside the Yubatake. Several shows a day, and you can take a paddle yourself at the end.' },
    { n: 'Sainokawara open-air bath',
      d: 'A very large rotenburo in a park of steaming streams at the end of the valley. Walking up through the park is half the experience.' },
    { n: 'The free public baths',
      d: 'Around nineteen scattered through the town, free and maintained for residents. Visitors are welcome at most; read the etiquette signs.' },
    { n: 'Skiing',
      d: 'Kusatsu Kokusai has runs from mid-December, with the onsen at the bottom of them.' }
  ],
  when: 'Year round. Winter is the classic, with snow on the Yubatake.',
  stay: 'One or two nights.',
  move: 'Limited express to Naganohara-Kusatsuguchi then a bus, about three and a half hours from Tokyo. Direct buses also run.',
  eat: 'Onsen manju, steamed buns, sold hot everywhere, with free samples pressed on you aggressively.'
},

'GNM-ikaho': {
  intro: [
    'Ikaho is built around a stone staircase of three hundred and sixty-five steps, with inns, shops and bathhouses stacked on either side. The number is for the days of the year, which was decided when the steps were rebuilt in the 1980s.',
    'Under the stairs runs a channel carrying the spring water, with openings at intervals so each inn can draw its share. The system was laid out in the sixteenth century to settle disputes about who got how much.',
    'There are two waters: kogane no yu, brown with iron, which is the historic one, and shirogane no yu, clear, found in 1996.'
  ],
  see: [
    { n: 'The stone stairway',
      d: 'Climb it slowly. Look for the covered openings showing the water channel underneath.' },
    { n: 'Ikaho Shrine',
      d: 'At the top of the steps, small, with a view back down.' },
    { n: 'The two public baths',
      d: 'Ishidan no Yu on the stairs for the brown water, and the Roten Buro further up the valley, which is the better of the two.' },
    { n: 'Kajika Bridge',
      d: 'A red bridge over the gorge above the town, very good in late October.' },
    { n: 'The ropeway',
      d: 'Up Mount Monotsuki for a view across the Kanto plain.' }
  ],
  when: 'Autumn for colour. Year round for the baths.',
  stay: 'A night.',
  move: 'Bus from Shibukawa station, about twenty-five minutes. Around two hours from Tokyo.',
  eat: 'Mizusawa udon, made in the next valley, which is one of Japan’s three famous udon and is eaten cold with dipping sauce.'
},

'GNM-tomioka': {
  intro: [
    'Tomioka Silk Mill opened in 1872, built by the new Meiji government with French engineers and French machinery, to industrialise silk production and earn foreign currency. It worked. Silk became Japan’s main export and paid for a large part of the country’s modernisation.',
    'The mill ran until 1987 and the owners preserved the buildings at their own expense for decades afterwards, which is why the original brick structures, the reeling machinery and the French director’s house are all still here.',
    'If you want a single place that explains how Japan went from feudal to industrial in a generation, this is it. UNESCO listed it in 2014.'
  ],
  see: [
    { n: 'The east cocoon warehouse',
      d: 'A hundred and four metres long, timber frame with brick infill, built by Japanese carpenters who had never worked in brick. The joints show them working it out.' },
    { n: 'The reeling plant',
      d: 'A hundred and forty metres with a truss roof and no internal pillars, which was unheard of in Japan at the time. The 1960s machinery is still in place.' },
    { n: 'The French director’s house',
      d: 'Paul Brunat’s residence, in colonial style with a veranda.' },
    { n: 'The female workers’ dormitory',
      d: 'Young women recruited from across the country, who then took the techniques home. That diffusion is the real story of this place.' },
    { n: 'The guided tour',
      d: 'Worth the small extra fee. The volunteers know a great deal.' }
  ],
  when: 'Year round. Closed some Wednesdays.',
  stay: 'Two hours.',
  move: 'Joshin line to Joshu-Tomioka, then a ten-minute walk. About two and a half hours from Tokyo.',
  eat: 'Simple places in the town. Gunma is known for konnyaku, which has an entire theme park nearby.'
},

'GNM-minakami': {
  intro: [
    'Minakami sits where the Tone river comes out of the mountains, which makes it the best white water near Tokyo. Rafting runs from April, with the snowmelt in late spring giving the biggest water.',
    'There are eighteen hot spring areas scattered up the valley, from large resort hotels to single inns at the end of forest roads. Takaragawa, with its enormous riverside baths, is the famous one.',
    'In winter it switches to skiing, with several areas including one that stays open into May.'
  ],
  see: [
    { n: 'Rafting the Tone', t: 'April to October',
      d: 'Grade three to four in the spring melt, gentler by summer. Several operators run in English.' },
    { n: 'Canyoning',
      d: 'Jumping and sliding down a river gorge in a wetsuit. More fun than rafting if you only do one.' },
    { n: 'Takaragawa Onsen',
      d: 'Four large riverside baths, three mixed, strung along a stream. Day use available.' },
    { n: 'Doai station',
      d: 'The deepest railway station in Japan, with the downbound platform four hundred and eighty-six steps below the ticket hall inside a mountain.' },
    { n: 'Tanigawadake ropeway',
      d: 'Up the mountain for walking in summer and skiing in winter.' }
  ],
  when: 'May and June for high water, autumn for colour, winter for snow.',
  stay: 'One or two nights.',
  move: 'Joetsu shinkansen to Jomo-Kogen, about seventy minutes from Tokyo, then a bus.',
  eat: 'Inn food. The valley has very little else.'
},

'GNM-oze-gunma': {
  intro: [
    'Tanigawadake is an unassuming nineteen-hundred-metre mountain with a grim statistic attached: more people have died on it than on any other mountain in the world, with over eight hundred recorded since the 1930s. That is a function of how many people attempt the east face, a vertical rock wall an hour from Tokyo, rather than of its difficulty.',
    'For everyone else there is a ropeway to thirteen hundred metres and a straightforward walk along the ridge from there, with views down both sides of the watershed.',
    'In autumn the colour here starts in late September, earlier than anywhere else within easy reach of Tokyo.'
  ],
  see: [
    { n: 'The ropeway and the ridge',
      d: 'Up to Tenjindaira, then about two hours to the twin summits along a ridge with chains on the steeper sections.' },
    { n: 'Ichinokurasawa',
      d: 'The east face. A marked walk brings you to the base of it, where there is a memorial listing the dead.' },
    { n: 'Autumn colour', t: 'late September to mid-October',
      d: 'Among the first in Honshu, because of the altitude and the Sea of Japan weather.' },
    { n: 'Doai station',
      d: 'At the base, and the deepest station in Japan.' },
    { n: 'Skiing',
      d: 'Tenjindaira has a season running into May in good years.' }
  ],
  when: 'June to October for walking, late September for colour, winter for snow.',
  stay: 'A day from Minakami.',
  move: 'Bus from Minakami station to the ropeway base.',
  eat: 'A cafe at the ropeway station and nothing on the ridge. Carry food.'
},

'GNM-takaragawa': {
  intro: [
    'Takaragawa has four open-air baths along a mountain stream, and three of them are mixed. The largest is about two hundred square metres, which makes it one of the biggest rotenburo in Japan.',
    'The baths are not separated from the river by much, so the sound is constant and in autumn the maples come right down to the water. There are bathing wraps available for anyone uncomfortable with the mixed arrangement, and most people use them.',
    'It is a single inn rather than a town, in a valley reached by a long road, and day visitors are welcome.'
  ],
  see: [
    { n: 'The riverside baths',
      d: 'Four of them, connected by walkways. The water is around forty degrees and the river is not, which is the appeal in winter.' },
    { n: 'Autumn',
      d: 'Late October, with maples over the water. This is when photographs of the place are taken.' },
    { n: 'Winter',
      d: 'Snow piled on the rocks around the bath. Day use is possible and the drive in needs care.' },
    { n: 'The walk along the stream',
      d: 'Short, with small shrines and a suspension bridge.' }
  ],
  when: 'Late October for colour, January and February for snow. Day use hours are limited; check before driving out.',
  stay: 'A night, or an afternoon.',
  move: 'Bus from Minakami station, about thirty minutes, with a limited timetable. A car is easier.',
  eat: 'The inn. There is nothing else in the valley.'
},

/* ===================== IBARAKI ===================== */
'IBR-hitachi-seaside': {
  intro: [
    'For about two weeks from late April, a hill at Hitachi Seaside Park turns entirely blue. Around four and a half million nemophila, called baby blue eyes, flower at once across four and a half hectares, and from the bottom of the slope the blue runs into the sky behind it.',
    'It works because of the planting density and because the hill has nothing else on it. There is no cleverness to it beyond the scale.',
    'In October the same hill goes red with kochia, a bushy plant that turns from green through pink to crimson over a few weeks, which is almost as good and much less crowded.'
  ],
  see: [
    { n: 'Miharashi Hill in nemophila', t: 'late April to early May',
      d: 'Golden Week falls in the middle of this and the park takes tens of thousands a day. Arrive at opening or come on a weekday.' },
    { n: 'Kochia in autumn', t: 'early to late October',
      d: 'The same hill in red, with cosmos planted below it. Quieter and arguably better.' },
    { n: 'The rest of the park',
      d: 'Three hundred and fifty hectares with tulips in April, a dune area and a small amusement park. Bicycle hire makes it manageable.' },
    { n: 'Nakaminato fish market',
      d: 'Twenty minutes away, with a very good market and restaurants.' }
  ],
  when: 'Late April to early May, and October. Outside those windows there is far less reason to come.',
  stay: 'Half a day.',
  move: 'Katsuta station on the Joban line, about ninety minutes from Ueno, then a bus.',
  eat: 'Park cafes, or Nakaminato for seafood.'
},

'IBR-ushiku': {
  intro: [
    'The Ushiku Daibutsu is a hundred and twenty metres tall including the base, which made it the tallest statue in the world when it was finished in 1993 and keeps it in the top five now. The Statue of Liberty would fit inside it with room above.',
    'It is bronze over a steel frame, and you go up inside by lift to a viewing slot at eighty-five metres, in the chest. The interior is dark, with a floor of ten thousand small gilded Buddhas.',
    'It belongs to a Pure Land Buddhist sect and sits in a flower garden with a small zoo. The combination is strange and entirely sincere.'
  ],
  see: [
    { n: 'The interior and the viewing deck',
      d: 'A lift to the chest, with slots looking out across the Kanto plain. On clear winter days Fuji and the Tokyo Skytree are both visible.' },
    { n: 'The scale from the gate',
      d: 'Walk to the far end of the approach and look back. The thumb alone is about two metres.' },
    { n: 'The flower garden',
      d: 'Shibazakura in spring, cosmos in autumn, laid out in front of the statue.' },
    { n: 'The small zoo and rabbit paddock',
      d: 'Aimed at families, included in some tickets.' }
  ],
  when: 'Year round. Clear winter days for the view.',
  stay: 'Two hours.',
  move: 'Ushiku station on the Joban line, then a twenty-minute bus. About an hour from Ueno.',
  eat: 'A canteen on site. Nothing nearby.'
},

'IBR-kairakuen': {
  intro: [
    'Kairaku-en is one of the three great gardens of Japan and the only one built to be shared. The lord of Mito opened it to the public in 1842, and the name means a garden to enjoy with others, which was a deliberate political statement at the time.',
    'It has three thousand plum trees of about a hundred varieties, which flower from late February into March, a month before the cherries. Plum viewing is an older tradition than cherry viewing and a quieter one.',
    'Kobuntei, the lord’s wooden three-storey pavilion in the grounds, was destroyed in 1945 and rebuilt, and the view from its top floor is the best in the garden.'
  ],
  see: [
    { n: 'The plum grove', t: 'late February to late March',
      d: 'A festival runs through the season with evening illumination. The scent is the part photographs miss.' },
    { n: 'Kobuntei',
      d: 'Small separate fee. Each room is painted with a different plant and the top floor looks over the whole garden to the lake.' },
    { n: 'The bamboo grove and cedar path',
      d: 'The approach from the back gate, deliberately dark, so the plum grove hits you when you come out of it. That sequencing is the design.' },
    { n: 'Lake Senba',
      d: 'Below the garden, with a three-kilometre circuit walk and swans.' }
  ],
  when: 'Late February to March for plums. Autumn colour in November. The rest of the year it is pleasant and unremarkable.',
  stay: 'Two hours.',
  move: 'Mito station then a bus, or a seasonal stop at Kairakuen station during the plum festival. About eighty minutes from Ueno.',
  eat: 'Mito is known for natto, which the city is proud of and which divides visitors sharply.'
},

'IBR-fukuroda': {
  intro: [
    'Fukuroda Falls is a hundred and twenty metres high and seventy-three wide, dropping over four tiers of rock. It is counted among the three great waterfalls of Japan, with Nachi and Kegon, and it is the widest of the three.',
    'The volume rather than the height is what makes it. In spring melt and after a typhoon it is loud enough to feel.',
    'In a hard winter it freezes, partly or occasionally entirely, and ice climbers come for it. That happens perhaps once every few years.'
  ],
  see: [
    { n: 'The observation decks',
      d: 'A tunnel leads to two platforms, one at the base and one higher by lift. The higher one gives the full four tiers.' },
    { n: 'The suspension bridge',
      d: 'Above the falls, with a view down the whole drop.' },
    { n: 'Autumn colour',
      d: 'Early to mid-November, when the gorge around the falls turns.' },
    { n: 'Frozen falls', t: 'January and February, some years',
      d: 'Partial freezing is common, full freezing rare. Check conditions before travelling for it.' },
    { n: 'Daigo town',
      d: 'Apple orchards and a hot spring near the falls.' }
  ],
  when: 'Spring melt for volume, November for colour, deep winter for ice.',
  stay: 'Two hours.',
  move: 'Fukuroda station on the Suigun line then a bus, or drive. About three hours from Tokyo.',
  eat: 'Shamo chicken, a local game fowl, and soba at the stalls near the entrance.'
},

/* ===================== HOKKAIDO ===================== */
'HKD-sapporo': {
  intro: [
    'Sapporo was laid out in 1869 on an American grid, with the help of advisors from Massachusetts, which is why it is the one Japanese city where addresses make immediate sense. Blocks are numbered north, south, east and west from a single point.',
    'It is also the youngest major city in Japan. In 1857 the population was seven. It is now just under two million, which is the fastest urban growth in the country’s history.',
    'Three things justify a stay: the February snow festival, the beer, and a ramen tradition that is distinct from anywhere else, built on miso and lard to survive a Hokkaido winter.'
  ],
  see: [
    { n: 'Snow Festival', t: 'early February',
      d: 'Around two hundred sculptures across three sites, some of them the size of buildings, carved by teams including the Self-Defence Forces. Two million visitors in a week. Book accommodation six months out.' },
    { n: 'Sapporo Beer Museum',
      d: 'In the original 1890 brick malt house. The tasting room pours three beers side by side including the original 1876 recipe, which is nothing like the modern one.' },
    { n: 'Nijo Market and Curb Market',
      d: 'Crab, uni, scallops and salmon roe. Breakfast donburi at either is the thing.' },
    { n: 'Mount Moiwa',
      d: 'Ropeway to a night view over the whole grid, which is a particularly good one because the streets are straight.' },
    { n: 'Odori Park',
      d: 'A green strip cutting the city in half for fifteen blocks, used for the snow festival, a beer garden in summer and an autumn food fair.' },
    { n: 'Hokkaido Shrine',
      d: 'In Maruyama Park, with the earliest cherry blossom in the city in early May and a good deal of space.' }
  ],
  when: 'February for the snow festival. June to August is the most pleasant summer in Japan, with no rainy season and low humidity.',
  stay: 'Two nights, or a base for Hokkaido.',
  move: 'Flights from everywhere to New Chitose, then thirty-seven minutes by train. The shinkansen reaches Hakodate and will reach Sapporo in the 2030s.',
  eat: 'Miso ramen, soup curry which was invented here in the 1970s, grilled lamb called jingisukan cooked on a domed skillet, and the best dairy in Japan.'
},

'HKD-otaru': {
  intro: [
    'Otaru got rich on herring. Between the 1880s and the 1950s the catch here was enormous, and the money built stone warehouses along a canal, banks in Western style, and mansions for the fishing barons.',
    'Then the herring stopped coming. The population collapsed, the canal was scheduled to be filled in for a road, and a citizens’ campaign in the 1970s saved half of it. The surviving stretch, lined with gas lamps, is the postcard.',
    'It is thirty minutes from Sapporo and it is very touristy. Go anyway, and walk up the hill away from the canal where the bank buildings are.'
  ],
  see: [
    { n: 'The canal at dusk',
      d: 'Gas lamps along the warehouse side. In February the Snow Light Path festival puts candles in snow lanterns along the water and it is lovely.' },
    { n: 'Sakaimachi street',
      d: 'Glassworks, music boxes and a steam clock. Commercial, and the Kitaichi glass hall lit by a hundred and sixty-seven oil lamps is still worth seeing.' },
    { n: 'The bank district',
      d: 'Up the hill on Nichigin-dori, with early twentieth-century stone and brick banks, several open. This is the better half of Otaru and almost empty.' },
    { n: 'Nishin Goten',
      d: 'A preserved herring mansion on the coast outside town, showing how the fishery worked and how the crews lived.' },
    { n: 'Sushi-ya-dori',
      d: 'A street of about twenty sushi restaurants. Otaru sushi is a genre and the standard is high.' }
  ],
  when: 'February for the snow candles. Summer for the coast.',
  stay: 'Half a day from Sapporo, or a night.',
  move: 'Thirty to forty minutes from Sapporo on the Hakodate main line. Sit on the sea side.',
  eat: 'Sushi, obviously. Also Otaru beer in the canal warehouses, brewed to German purity law by a German brewer.'
},

'HKD-furano': {
  intro: [
    'Furano is lavender. The fields were planted for the perfume industry, nearly abandoned when synthetic substitutes arrived in the 1970s, and saved when a Japan National Railways calendar featured a photograph of Farm Tomita and the tourists arrived.',
    'July is the month. The fields are laid out in bands of colour across rolling hills with the Daisetsuzan range behind them, and the whole thing lasts about three weeks.',
    'Biei, the next town north, has a different draw: single trees standing alone in fields, which became famous through cigarette and car advertising. Several have names taken from the products they appeared in.'
  ],
  see: [
    { n: 'Farm Tomita', t: 'early to late July',
      d: 'The original lavender farm, free, with several fields and a distillery. Go early; coaches arrive from nine.' },
    { n: 'The Biei patchwork road',
      d: 'Rolling farmland with the famous solitary trees. Rent a bicycle or drive; the distances are deceptive and the hills are real.' },
    { n: 'Shirogane Blue Pond',
      d: 'A pond turned bright blue by aluminium in the water from an erosion control dam, with dead larches standing in it. Lit in winter.' },
    { n: 'Skiing',
      d: 'Furano has excellent snow and far fewer foreign visitors than Niseko.' },
    { n: 'The Norokko slow train',
      d: 'A seasonal train between Furano and Biei that stops at a temporary platform beside the lavender fields.' }
  ],
  when: 'July for lavender. December to March for snow. Autumn is quiet and the farmland is beautiful.',
  stay: 'Two nights.',
  move: 'Train from Asahikawa or Sapporo. A car is genuinely better for Biei.',
  eat: 'Furano melon in summer, which is expensive and worth it once. Omurice is a local speciality for reasons nobody can explain.'
},

'HKD-niseko': {
  intro: [
    'Niseko gets around fifteen metres of snow a season. Siberian air crosses the Sea of Japan, picks up moisture, hits Mount Yotei and dumps it, and because the air is very cold the snow arrives dry and light. That is the whole proposition.',
    'It was discovered by Australian skiers in the late 1990s and the development since has been rapid and not entirely welcome locally. Hirafu village is now largely foreign-owned and you will hear more English than Japanese.',
    'The skiing is genuinely among the best anywhere. The gate system for accessing the backcountry is well run and strictly enforced, and people who ignore it get into trouble every season.'
  ],
  see: [
    { n: 'Night skiing',
      d: 'Grand Hirafu lights a long run until half past eight. Skiing through falling snow under lights is the thing people remember.' },
    { n: 'The gates',
      d: 'Marked access points to the backcountry, opened and closed daily by the patrol. Check the status board, carry a transceiver, and do not duck ropes.' },
    { n: 'Mount Yotei',
      d: 'A near-perfect cone across the valley, climbed and skied by the experienced in spring.' },
    { n: 'The onsen',
      d: 'Several, and sitting in one while it snows on your head is half the reason to come. Goshiki Onsen up the valley is the best of them.' },
    { n: 'Summer',
      d: 'Rafting on the Shiribetsu, cycling, and almost nobody there.' }
  ],
  when: 'January and February for the deepest snow. December and March are cheaper and still excellent.',
  stay: 'A week for skiing.',
  move: 'Transfers from New Chitose take two and a half to three hours. Book them with your accommodation.',
  eat: 'Expensive and international. Kutchan, the town fifteen minutes away, is where the Japanese food and the normal prices are.'
},

'HKD-shiretoko': {
  intro: [
    'Shiretoko means the end of the earth in Ainu, and the peninsula runs seventy kilometres into the Sea of Okhotsk with no road for the last third of it. UNESCO listed it in 2005 for the link between the seasonal sea ice and everything that lives off it.',
    'The drift ice brings nutrients that feed a plankton bloom, which feeds fish, which feed salmon, which feed the highest density of brown bears in Japan. There are an estimated six hundred on the peninsula.',
    'That density is why the walking here comes with rules. The Five Lakes boardwalk is open freely for part of the year and requires a guide during the bear activity season, and the rangers are not negotiable about it.'
  ],
  see: [
    { n: 'The Five Lakes',
      d: 'An elevated boardwalk is open year round; the ground-level loop requires a lecture or a guide depending on the season. Mount Rausu reflects in the first lake on a still morning.' },
    { n: 'A boat up the coast',
      d: 'From Utoro, past waterfalls falling straight into the sea and cliffs with bears on the shoreline. The best chance of seeing one safely.' },
    { n: 'Kamuiwakka Yu Falls',
      d: 'A hot waterfall you wade up, barefoot or in grip socks. Access is limited and has been restricted in recent years; check.' },
    { n: 'Drift ice', t: 'late January to March',
      d: 'Walking on the ice in a dry suit, run from Utoro. The ice is retreating year on year and the season is getting shorter.' },
    { n: 'Shiretoko Pass',
      d: 'The road over to Rausu, closed in winter, with a view to Kunashiri island, which Russia administers and Japan claims.' }
  ],
  when: 'June to September for walking, February for ice. Much of the peninsula is closed from November to April.',
  stay: 'Two or three nights at Utoro.',
  move: 'Fly to Memanbetsu, then about two hours by bus or car. A car is close to essential.',
  eat: 'Salmon, scallops and sea urchin. Rausu kombu is the best kelp in Japan and underpins a great deal of Japanese cooking.'
},

'HKD-daisetsuzan': {
  intro: [
    'Daisetsuzan is the largest national park in Japan, over two thousand square kilometres of volcanic plateau and peaks that the Ainu called the playground of the gods. The highest point, Asahidake, is 2,291 metres.',
    'Autumn colour starts here in mid-September, which is earlier than anywhere else in the country, and the first snow often falls on the summits before the end of the month.',
    'A ropeway from Asahidake Onsen gets you to sixteen hundred metres, from where a boardwalk loops past steaming fumaroles in about an hour. Going further needs proper gear; the weather turns fast and there is no shelter.'
  ],
  see: [
    { n: 'Asahidake ropeway and the Sugatami loop',
      d: 'An hour on boardwalk past vents and a small crater lake. In late September the alpine plants turn and it is the first autumn in Japan.' },
    { n: 'Sounkyo gorge',
      d: 'Columnar basalt walls on the northeast side, with Ginga and Ryusei falls. An ice festival runs here from late January.' },
    { n: 'The summit traverse',
      d: 'Asahidake to Kurodake over a day, with huts. Serious walking, and the weather is the limiting factor rather than the terrain.' },
    { n: 'Brown bears',
      d: 'Present throughout. Carry a bell, make noise, and read the notices at the trailhead.' },
    { n: 'Asahidake Onsen',
      d: 'A handful of inns at the ropeway base, with good baths and nothing else.' }
  ],
  when: 'July and August for alpine flowers, mid-September for colour. Snow closes most of it from October.',
  stay: 'Two nights.',
  move: 'Bus from Asahikawa to Asahidake Onsen, about ninety minutes.',
  eat: 'Inn food. Carry what you need on the mountain.'
},

'HKD-hakodate': {
  intro: [
    'Hakodate was one of the first two ports opened to foreigners in 1854, which is why there is a Russian Orthodox church, a British consulate and a Chinese hall all within a few streets on the same hillside.',
    'The night view from Mount Hakodate is the thing it is famous for. The city sits on an isthmus between two bays, so the lights form an hourglass with black water on both sides, which is unusual and genuinely spectacular.',
    'Goryokaku, the star fort, is the other landmark. It was built in 1864 on a European design and was the last stand of the shogunate forces in 1869, which is where the Tokugawa era actually ends.'
  ],
  see: [
    { n: 'Mount Hakodate at night',
      d: 'Ropeway, bus or a walk. The queue for the ropeway after sunset is long; go up before dark and watch the lights come on.' },
    { n: 'The morning market',
      d: 'Beside the station from five. Squid are kept live in tanks and you can fish one out yourself, which they then prepare in front of you.' },
    { n: 'Motomachi',
      d: 'The slopes with the churches, consulate and Western houses. Hachiman-zaka is the famous slope running straight down to the sea.' },
    { n: 'Goryokaku',
      d: 'A star fort, best seen from the tower beside it. Sixteen hundred cherry trees fill the moat outline in early May.' },
    { n: 'Yunokawa Onsen',
      d: 'A hot spring district on the tram line, with a monkey enclosure where macaques sit in a hot bath in winter.' }
  ],
  when: 'Early May for blossom, which is the latest in mainland Japan. Summer for the squid. Winter for the clearest night views.',
  stay: 'Two nights.',
  move: 'Hokkaido Shinkansen from Tokyo in about four hours to Shin-Hakodate-Hokuto, then a shuttle. The city tram is the way to get around.',
  eat: 'Squid, in every form, including alive. Also shio ramen, which is Hakodate’s contribution and the lightest of the three Hokkaido styles.'
},

'HKD-noboribetsu': {
  intro: [
    'Jigokudani, Hell Valley, is a crater about four hundred and fifty metres across left by an eruption around twenty thousand years ago. Steam comes out of the ground across the whole of it and the rock is stained yellow and grey.',
    'Eleven different kinds of mineral water come out of that crater, which is an unusually high number, and they feed the baths in the town below. Sulphur, iron, salt, alum and more, each piped to different inns.',
    'The smell is severe and you stop noticing after about an hour. The largest inn here has a bath hall with seven different waters in it and it is worth paying day-use rates even if you sleep elsewhere.'
  ],
  see: [
    { n: 'Jigokudani',
      d: 'A boardwalk across the crater floor. Free, and best in the morning when the steam sits.' },
    { n: 'Oyunuma',
      d: 'A sulphurous pond at a hundred and thirty degrees in its depths, further up the valley, with a natural footbath downstream where the water has cooled.' },
    { n: 'Dai-ichi Takimotokan',
      d: 'The big inn, with a bath hall of seven waters under a glass roof. Day use available and genuinely impressive.' },
    { n: 'Noboribetsu Bear Park',
      d: 'Up a ropeway, with brown bears. Divisive, and the view from the top over Lake Kuttara is good regardless.' },
    { n: 'The demon statues',
      d: 'All over town, because this is Hell Valley and the tourist board has committed to the theme.' }
  ],
  when: 'Year round. Winter is the best time for a hot spring and the valley steams more visibly in cold air.',
  stay: 'A night.',
  move: 'Noboribetsu station then a bus, or direct buses from Sapporo and New Chitose. About ninety minutes from Sapporo.',
  eat: 'Inn food. The town itself has little.'
},

'HKD-abashiri': {
  intro: [
    'Drift ice forms in the Amur river estuary off Russia and arrives on this coast in late January, usually staying until March. Abashiri is the southernmost point in the northern hemisphere where sea ice reaches, which is a function of the low salinity of the Okhotsk.',
    'The icebreaker Aurora runs out through it, which is less about breaking and more about riding up and crushing. It is loud and it is very strange to be on a sea of broken white.',
    'The other reason to come is the prison. Abashiri was a maximum security facility from 1890, built by convicts who were also used to construct the roads of eastern Hokkaido in conditions that killed many of them. The preserved buildings are now one of the better museums in Japan.'
  ],
  see: [
    { n: 'The Aurora icebreaker', t: 'late January to March',
      d: 'About an hour out through the ice. Sailings depend entirely on where the ice is; it can be absent for days at a time.' },
    { n: 'Abashiri Prison Museum',
      d: 'The original wooden cell blocks moved and preserved, with a radial five-wing design and a frank account of the forced labour. Excellent and sobering.' },
    { n: 'Okhotsk Ryu-hyo Museum',
      d: 'On a hill, with real drift ice kept in a cold room at minus fifteen and clione, the small sea angels that live in it.' },
    { n: 'Lake Notoro',
      d: 'Turns red with coral grass in September and October, which is a strange and photogenic sight.' },
    { n: 'Koshimizu Gensei Kaen',
      d: 'A coastal flower meadow of wild lilies and roses in June and July, along a strip of dune.' }
  ],
  when: 'February for ice. June and July for the coastal flowers.',
  stay: 'A night.',
  move: 'Fly to Memanbetsu, twenty minutes away. Trains from Sapporo take five and a half hours.',
  eat: 'Scallops, salmon and the local Okhotsk crab. Also a blue beer coloured with algae, which is a novelty and tastes fine.'
},

'HKD-kushiro': {
  intro: [
    'Kushiro Shitsugen is the largest marshland in Japan, around a quarter of all the wetland in the country, and it is where the red-crowned crane came back from the edge. In 1924 about twenty birds were found here after the species was believed extinct in Japan. There are now over eighteen hundred.',
    'They are resident year round, but winter is when they gather at feeding stations and perform the courtship dance, which involves leaping, bowing and calling in unison. In deep cold they roost standing in the Setsuri river, with mist rising around them.',
    'Inland, Akan is a volcanic lake district with an Ainu community at Lake Akan that is the largest in Hokkaido.'
  ],
  see: [
    { n: 'Cranes in winter', t: 'December to March',
      d: 'Tsurui Ito sanctuary for the feeding grounds, and Otowa bridge at dawn for the roost in the river mist. Dress for minus twenty.' },
    { n: 'The marsh observatories',
      d: 'Hosooka and Kushiro Shitsugen for the view across the whole wetland. Boardwalks run out into the reeds.' },
    { n: 'The Norokko train',
      d: 'A slow seasonal train along the edge of the marsh with open windows in summer.' },
    { n: 'Lake Akan and the Ainu kotan',
      d: 'A village of about thirty households with workshops, a theatre staging Ainu dance, and a serious attempt at cultural continuity rather than display.' },
    { n: 'Marimo',
      d: 'Spherical green algae balls that grow in Lake Akan and almost nowhere else, rolled into shape by the currents.' }
  ],
  when: 'December to March for cranes, summer for the marsh and the lakes.',
  stay: 'Two nights.',
  move: 'Fly to Kushiro. A car is needed for the crane sites, which are spread out and served by few buses.',
  eat: 'Robata grilling, which Kushiro claims to have invented, and kushiro ramen with very thin wavy noodles.'
},

'HKD-lake-toya': {
  intro: [
    'Lake Toya is a caldera eleven kilometres across with four islands in the middle, and it does not freeze even in a Hokkaido winter because of its depth. Beside it sits Mount Usu, which erupted in 1910, 1943, 1977 and 2000.',
    'The 1943 eruption pushed up an entirely new mountain, Showa Shinzan, in a farmer’s field over two years. A postmaster named Mimatsu Masao recorded its growth daily and bought the land to protect it, and his chart is a famous document in volcanology.',
    'The 2000 eruption was predicted and the whole area evacuated with no deaths. The ruined buildings and the broken road have been left as an outdoor museum, which is the most interesting thing here.'
  ],
  see: [
    { n: 'The 2000 eruption ruins',
      d: 'A collapsed apartment block, a bridge pushed out of line, a public bath half buried in mud. Walkways run through it with explanation boards.' },
    { n: 'Showa Shinzan',
      d: 'The mountain that grew out of a field, still steaming and still bright red in places. There is a statue of the postmaster.' },
    { n: 'Usuzan ropeway',
      d: 'To a crater rim walk with a view down into the 1977 crater and across the lake.' },
    { n: 'Nightly fireworks', t: 'late April to October',
      d: 'Fired from boats on the lake every night in season, visible from the lakeside inns.' },
    { n: 'The lake shore sculpture path',
      d: 'Fifty-eight works around the shore, installed for the 2008 G8 summit that was held above the lake.' }
  ],
  when: 'Late April to October for the fireworks. Year round for the baths.',
  stay: 'A night.',
  move: 'Toya station then a bus, or direct buses from Sapporo and New Chitose. About two hours from Sapporo.',
  eat: 'Inn food, and very good Hokkaido beef in the town.'
},

'HKD-wakkanai': {
  intro: [
    'Wakkanai is the northern tip of Japan. Sakhalin is forty-three kilometres away and visible on a clear day, and the town was the mainland end of a rail ferry to Japanese Karafuto until 1945.',
    'The breakwater dome, a curved colonnade of seventy pillars built in 1936 to protect the ferry terminal from waves, is a genuinely beautiful piece of concrete engineering and the main landmark.',
    'The reason to come further is the two islands offshore. Rishiri is a near-perfect volcanic cone rising seventeen hundred metres straight out of the sea; Rebun is low, exposed and covered in alpine flowers from June, several of which grow nowhere else.'
  ],
  see: [
    { n: 'Rishiri',
      d: 'Climb the volcano in about ten hours return, or cycle the twenty-five kilometre coast road around it. Rishiri kombu is the best kelp in Japan.' },
    { n: 'Rebun', t: 'June and July',
      d: 'The island of flowers, with three hundred species including the Rebun lady’s slipper orchid. The eight-hour course along the west coast is the walk.' },
    { n: 'Cape Soya',
      d: 'The northernmost point of Japan, with a monument and a great deal of wind.' },
    { n: 'The breakwater dome',
      d: 'Beside the ferry terminal. Walk through it; the acoustics and the receding perspective are the point.' },
    { n: 'Sarobetsu plain',
      d: 'A peat bog between Wakkanai and Teshio, with boardwalks and flowers in early summer.' }
  ],
  when: 'June and July for flowers. Winter here is extreme and the ferries are unreliable.',
  stay: 'Three nights to include an island.',
  move: 'Fly to Wakkanai, or a six-hour train from Sapporo. Ferries to both islands take about two hours.',
  eat: 'Uni from Rebun in summer, which is among the best in Japan, and kombu everywhere.'
},

'HKD-asahikawa': {
  intro: [
    'Asahikawa is Hokkaido’s second city and mostly a base for Daisetsuzan and Furano. It is also the coldest major city in Japan, with a record of minus forty-one degrees set in 1902, which is still the lowest temperature ever recorded in the country.',
    'Its zoo is the reason to stop. Asahiyama was nearly closed in the 1990s, and the staff saved it by rebuilding around behaviour rather than display: a tunnel under the penguin pool so they fly past overhead, a tall enclosure for orangutans to use vertically, a seal tank with a vertical column.',
    'It worked so completely that other zoos copied it, and for several years it had higher attendance than Ueno.'
  ],
  see: [
    { n: 'Asahiyama Zoo',
      d: 'The penguin tunnel and the seal column. In winter the penguins are walked around the grounds daily, which is done for their exercise and is a considerable draw.' },
    { n: 'Otokoyama sake museum',
      d: 'A brewery using Daisetsuzan snowmelt, with free tasting and a good museum of brewing documents.' },
    { n: 'Asahikawa ramen',
      d: 'Soy-based with a layer of lard on top to stop it cooling, which tells you what the winters are like. Several famous shops in a ramen village near the airport.' },
    { n: 'Kawamura Kaneto Ainu Memorial Hall',
      d: 'Founded in 1916 by an Ainu surveyor, and the oldest Ainu museum in Japan.' },
    { n: 'The winter festival', t: 'February',
      d: 'Smaller than Sapporo’s and with an enormous single snow sculpture that has held world records for size.' }
  ],
  when: 'Winter for the penguin walk and the festival. Summer as a base for the parks.',
  stay: 'A night.',
  move: 'Ninety minutes from Sapporo by limited express. The airport also serves Furano and Biei.',
  eat: 'Asahikawa ramen and very good Hokkaido vegetables.'
},

'HKD-shikotsu': {
  intro: [
    'Lake Shikotsu is the second deepest lake in Japan at three hundred and sixty metres, and that depth means it has never frozen over. The water clarity is consistently ranked the best in the country, with visibility often over twenty metres.',
    'It is forty minutes from New Chitose airport, which makes it the most accessible genuinely wild-feeling place in Hokkaido.',
    'The ice festival in winter has to be built rather than carved: water from the lake is sprayed over frames for weeks until it builds up into blue ice structures, lit from inside at night.'
  ],
  see: [
    { n: 'The water',
      d: 'Clear-bottomed boats, kayaking and, for the committed, diving. The clarity is the single thing to come for.' },
    { n: 'Ice Festival', t: 'late January to mid-February',
      d: 'Sprayed ice structures lit in blue. It is a different thing from a snow festival and arguably better.' },
    { n: 'Mount Tarumae',
      d: 'An active volcano on the south shore with a lava dome, climbable in about ninety minutes from the seventh station car park.' },
    { n: 'Shikotsuko Onsen',
      d: 'A small hot spring village on the north shore, with brown iron-rich water.' },
    { n: 'Koke no Domon',
      d: 'A moss-covered gorge nearby, open seasonally with restricted access to protect it.' }
  ],
  when: 'Summer for the water, February for the ice festival.',
  stay: 'A night, or an easy day from Sapporo.',
  move: 'Bus from New Chitose airport or Chitose station, about forty minutes.',
  eat: 'Himemasu, kokanee salmon, which is the lake fish and is served grilled or raw at the lakeside places.'
},

'HKD-obihiro': {
  intro: [
    'Tokachi is Japan’s largest agricultural region, flat and open, producing a quarter of the country’s wheat and most of its sugar beet, azuki beans and dairy. It does not look like the rest of Japan at all.',
    'Obihiro has the only banei keiba in the world: horse racing in which enormous draught horses pull weighted iron sledges up a sand track with two hills in it. The horses weigh up to a tonne and they walk rather than run. They stop halfway up the second hill to breathe, which is allowed, and the crowd walks alongside.',
    'The local hot spring water is brown with peat from the ancient plant matter it filters through, and it is unusually good for skin.'
  ],
  see: [
    { n: 'Banei horse racing',
      d: 'Weekends year round at Obihiro racecourse. Spectators walk beside the track as the horses go. Entirely unlike any other racing.' },
    { n: 'Moor onsen',
      d: 'Peat-coloured water found across Tokachi, said to be one of only a few such springs in the world. Tokachigawa Onsen is the main cluster.' },
    { n: 'Butadon',
      d: 'Grilled pork over rice with a sweet soy glaze, invented here in the 1930s. Pancho is the famous shop.' },
    { n: 'Rokkatei and Ryugetsu',
      d: 'Confectioners with large factories and gardens open to visitors. Hokkaido dairy and beans make the sweets here genuinely good.' },
    { n: 'The Tokachi plain by car',
      d: 'Windbreak lines of larch running for kilometres across wheat fields. It photographs like Canada.' }
  ],
  when: 'Summer for the farmland, winter for the diamond dust phenomenon when ice crystals hang in still cold air.',
  stay: 'A night.',
  move: 'Tokachi-Obihiro airport, or two and a half hours from Sapporo by limited express.',
  eat: 'Butadon, cheese from the local creameries, and anything made with Tokachi azuki.'
},

'HKD-hokkaido-cape': {
  intro: [
    'Cape Erimo is a spine of rock running into the Pacific at the southern end of the Hidaka mountains, and it is one of the windiest inhabited places in Japan. Wind over ten metres a second blows on around two hundred and ninety days a year.',
    'The hills behind were deforested in the nineteenth century and the resulting erosion turned the area into a desert. A reforestation programme started in 1953, planting by hand with seaweed mulch to hold the soil, and the forest is back. It is one of the better environmental recovery stories in Japan.',
    'Several hundred harbour seals live on the rocks below the cape and are visible from the viewpoint year round.'
  ],
  see: [
    { n: 'The cape and the seals',
      d: 'A viewing platform with telescopes above a reef where the seals haul out. Pupping is in spring.' },
    { n: 'Kaze no Yakata',
      d: 'The Wind Museum, with a room where you can stand in a twenty-five metre a second wind. Sillier and more informative than it sounds.' },
    { n: 'The reforestation',
      d: 'Explained at the museum. Worth understanding before you look at the hills.' },
    { n: 'The drive north',
      d: 'Route 336, called the Golden Road for what it cost to build, cut along a cliff face with tunnels.' }
  ],
  when: 'Year round. Fog is common in summer. Winter is brutally windy.',
  stay: 'Half a day, as part of a drive.',
  move: 'A car. Buses from Obihiro and Samani exist and are infrequent.',
  eat: 'Erimo kombu and very good sea urchin in summer.'
},

/* ===================== AOMORI ===================== */
'AOM-hirosaki': {
  intro: [
    'Hirosaki Castle is small, with a three-storey keep from 1811, and the castle is not really the point. The moat is lined with about two thousand six hundred cherry trees, and when the petals drop the water turns solid pink from bank to bank.',
    'The trees are pruned like apple trees, which is a local innovation. Hirosaki is apple country, growing about twenty per cent of Japan’s crop, and in the 1880s the town applied orchard pruning techniques to its cherries. The result is denser flowering and longer-lived trees than the usual approach produces.',
    'Bloom is in the last week of April, which is roughly a month after Tokyo.'
  ],
  see: [
    { n: 'The petal-covered moat', t: 'late April to early May',
      d: 'Hanaikada, the flower raft. Comes a few days after peak bloom. The west moat is the one to walk.' },
    { n: 'The keep',
      d: 'Moved sixty metres in 2015 so the stone base underneath could be repaired, and it is staying there until the work is done. Watching a castle sit on a temporary platform is an unusual sight.' },
    { n: 'The samurai quarter',
      d: 'Nakamachi, with several preserved houses, open and free.' },
    { n: 'Neputa Mura',
      d: 'A museum of the Hirosaki Neputa festival floats, which are fan-shaped rather than the three-dimensional ones in Aomori city.' },
    { n: 'The Western buildings',
      d: 'Hirosaki has an unusual number of Meiji and Taisho Western-style buildings, several by a local carpenter who taught himself from pattern books.' }
  ],
  when: 'Last week of April for blossom. Early August for the Neputa festival.',
  stay: 'A night.',
  move: 'Thirty minutes from Shin-Aomori by train. About three and a half hours from Tokyo by shinkansen plus local.',
  eat: 'Apples in every form, including apple pie, which the city takes seriously and maps for visitors. Also very good French restaurants, oddly, a legacy of early Western contact.'
},

'AOM-oirase': {
  intro: [
    'The Oirase stream runs fourteen kilometres out of Lake Towada, and a path follows it the whole way at almost no gradient. That combination, a mountain stream with a flat walk beside it, is rarer than it sounds and it makes this one of the most accessible good walks in Japan.',
    'The standard section is about nine kilometres from Ishigedo to Nenokuchi, taking three hours. There are waterfalls along it, mossy boulders in the water, and the road runs alongside, which is the only drawback.',
    'Late October is the colour, and it is spectacular. Late spring, when the new beech leaves come out over the water, is nearly as good and far quieter.'
  ],
  see: [
    { n: 'The walk from Ishigedo',
      d: 'Nine kilometres, flat, three hours. Buses run along the road so you can cut it short at several points.' },
    { n: 'Choshi Otaki',
      d: 'The only waterfall on the main stream itself rather than a side creek, and the reason no fish live upstream in the lake.' },
    { n: 'Kumoi no Taki and Ashura no Nagare',
      d: 'A side waterfall and a fast rocky section that are the two most photographed spots.' },
    { n: 'Late October colour',
      d: 'The peak is usually the third or fourth week. The road jams; take the bus.' },
    { n: 'New green in May',
      d: 'Beech coming into leaf over the water. Fewer people and arguably better.' }
  ],
  when: 'Late October for colour, May for new leaf. Snow closes the road from November to April.',
  stay: 'A day, with a night at Towada or Yasumiya.',
  move: 'Bus from Aomori or Hachinohe, about two hours.',
  eat: 'Very little on the trail. Himemasu from the lake at Nenokuchi.'
},

'AOM-towada': {
  intro: [
    'Lake Towada is a double caldera, formed by eruptions around two hundred thousand and thirteen thousand years ago, and it is three hundred and twenty-seven metres deep. From above the water reads nearly black.',
    'There were no fish in it until 1903, when a local man introduced kokanee salmon after repeated failures. The species that took hold is now the lake’s main fishery and is named after him.',
    'The Maiden Statue on the shore, two bronze women facing each other, was the last work of the poet and sculptor Takamura Kotaro, who made them in his seventies as a memorial.'
  ],
  see: [
    { n: 'The boat across',
      d: 'Between Yasumiya and Nenokuchi in about fifty minutes, which links to the Oirase walk neatly. Runs April to November.' },
    { n: 'The Maiden Statue',
      d: 'On the shore at Yasumiya. Takamura modelled both figures on his late wife.' },
    { n: 'Towada Shrine',
      d: 'In cedar woods near the statue, old and unvisited.' },
    { n: 'Autumn colour',
      d: 'Late October around the entire rim, with the Hakka Pass viewpoint looking down the length of the lake.' },
    { n: 'Winter',
      d: 'The lake does not freeze. Snow around it is heavy and the road access is limited.' }
  ],
  when: 'Late October for colour. May to October for boats.',
  stay: 'A night.',
  move: 'Bus from Aomori or Hachinohe, about two and a half hours.',
  eat: 'Himemasu, the kokanee salmon, grilled whole or as sashimi.'
},

'AOM-aomori-city': {
  intro: [
    'Nebuta is the reason to be in Aomori. For six nights in early August, illuminated paper floats up to five metres high and nine wide are pushed through the streets, lit from inside, with thousands of dancers called haneto leaping alongside them shouting rasse-ra.',
    'The floats depict warriors and mythological figures in violent motion and take a year to build. The artists who make them are a recognised profession with a competitive hierarchy.',
    'Anyone can join the dancing. You need the costume, which can be rented or bought locally, and no skill at all. That openness is unusual among major Japanese festivals and it is the best part.'
  ],
  see: [
    { n: 'Nebuta Matsuri', t: '2 to 7 August',
      d: 'Evening processions, with the final day a daytime run and the floats taken out on boats with fireworks. Rent a haneto costume and join in.' },
    { n: 'Nebuta Museum Wa Rasse',
      d: 'Beside the station, holding several full-size floats from recent years, lit. The best thing to do here outside August.' },
    { n: 'Aomori Museum of Art',
      d: 'A white building by Jun Aoki next to the Sannai-Maruyama site, holding Nara Yoshitomo’s eight-metre Aomori Dog and Chagall backdrops for a ballet.' },
    { n: 'Furukawa fish market',
      d: 'Buy a bowl of rice and tickets, then walk the stalls choosing toppings for your own donburi. A good system.' },
    { n: 'Hakkoda',
      d: 'An hour away, for snow monsters and hot springs.' }
  ],
  when: 'Early August for Nebuta, which books out a year ahead. Winter here is among the snowiest of any city in the world.',
  stay: 'A night, or three during the festival.',
  move: 'Shin-Aomori on the Hokkaido Shinkansen, about three hours from Tokyo.',
  eat: 'Scallops from Mutsu Bay, which are the best in Japan, and the make-your-own donburi at the market.'
},

'AOM-shirakami': {
  intro: [
    'Shirakami-Sanchi holds the largest remaining virgin beech forest in East Asia, about seventeen thousand hectares that were never logged because the terrain was too steep and remote to be worth it.',
    'It was listed by UNESCO in 1993, one of Japan’s first two natural sites. The core zone requires a permit and a declared route; the buffer zones are open and contain most of what visitors actually see.',
    'A beech forest holds water. The ground is spongy, the streams run clear and constant, and the sound is different from a conifer plantation. That difference is the point of the place.'
  ],
  see: [
    { n: 'Anmon Falls',
      d: 'Three falls up a stream in the buffer zone, about two hours return on a rough path with chains. The standard introduction.' },
    { n: 'Juniko',
      d: 'A group of lakes on the western side, including Aoike, which is an intense blue nobody has fully explained. Flat walking paths.' },
    { n: 'Mount Shirakami',
      d: 'For the core zone you apply in advance and declare a route. Guides are strongly advised and the terrain is serious.' },
    { n: 'The Gono line',
      d: 'A railway along the coast between Akita and Aomori, with the Resort Shirakami train running slowly beside the sea. One of the best rail journeys in Japan.' },
    { n: 'Autumn',
      d: 'Beech turns gold rather than red. Mid to late October.' }
  ],
  when: 'June to October. Snow closes most access from November to May.',
  stay: 'A day or two.',
  move: 'Gono line to Juniko or Hirosaki for the eastern approaches. A car helps considerably.',
  eat: 'Local mountain vegetables and river fish. Very little infrastructure.'
},

'AOM-hakkoda': {
  intro: [
    'In January 1902, an army regiment of two hundred and ten men set out across the Hakkoda mountains on a winter march. A blizzard caught them and a hundred and ninety-nine died. It remains the worst mountaineering disaster in history by death toll, and it happened on hills of fifteen hundred metres an hour from a city.',
    'The ropeway now takes you most of the way up in ten minutes. In winter the firs on the upper slopes freeze into juhyo, snow monsters, where rime builds on the windward side until the trees are unrecognisable lumps.',
    'Sukayu Onsen at the base has a bath called Sennin Buro, a thousand-person bath, which is a vast wooden hall holding four pools, mixed, with no dividers.'
  ],
  see: [
    { n: 'Snow monsters', t: 'February and March',
      d: 'The ropeway runs through them. Smaller than Zao’s but on a quieter mountain.' },
    { n: 'Sukayu Onsen',
      d: 'The hinoki bath hall, strongly acidic water, and a tradition going back three hundred years. Mixed bathing with a women-only hour.' },
    { n: 'The marsh boardwalks',
      d: 'From the ropeway top station in summer, with alpine flowers and a view across to Mutsu Bay.' },
    { n: 'The 1902 memorial',
      d: 'A bronze of Corporal Goto, found standing upright and frozen, which is how the rescue party located the regiment.' },
    { n: 'Backcountry skiing',
      d: 'Hakkoda is a serious powder destination with guided tours. Not a resort; the terrain and the weather are both real.' }
  ],
  when: 'February and March for snow, June to October for walking.',
  stay: 'A night at Sukayu.',
  move: 'Bus from Aomori, about an hour.',
  eat: 'Inn food. Sukayu serves a good local set meal.'
},

'AOM-sannai-maruyama': {
  intro: [
    'Sannai-Maruyama was found in 1992 when the prefecture started building a baseball stadium. What came out of the ground was a Jomon settlement occupied for about fifteen hundred years, from roughly 3900 to 2200 BC, with a population that may have reached five hundred.',
    'They cancelled the stadium. The site is now the best place anywhere to understand the Jomon, a hunter-gatherer culture that was sedentary, made the oldest pottery in the world, and lasted over ten thousand years without agriculture.',
    'The most striking find is six post holes two metres across in two rows, holding chestnut pillars a metre thick. Nobody knows what stood on them. The reconstruction is a six-pillar tower and it is a guess.'
  ],
  see: [
    { n: 'The six-pillar structure',
      d: 'The reconstruction, and beside it the preserved original post holes with the stumps still in them.' },
    { n: 'The long pit dwelling',
      d: 'Thirty-two metres, rebuilt, probably communal. You can go inside.' },
    { n: 'The museum',
      d: 'Jomon pottery, lacquer, jade beads traded from four hundred kilometres away, and a reconstructed burial road.' },
    { n: 'The chestnut evidence',
      d: 'DNA work on the chestnut timbers shows reduced genetic variation, meaning they were managing and probably cultivating the trees. That changes what a hunter-gatherer society means.' },
    { n: 'Aomori Museum of Art',
      d: 'Next door, and a good pairing.' }
  ],
  when: 'Year round. Free guided tours in Japanese; English audio available.',
  stay: 'Two hours.',
  move: 'Bus from Aomori or Shin-Aomori station, about twenty minutes.',
  eat: 'A cafe on site serving a Jomon-themed set meal, which is better than that sounds.'
},

/* ===================== IWATE ===================== */
'IWT-hiraizumi': {
  intro: [
    'In the twelfth century Hiraizumi was the second city of Japan. The Northern Fujiwara, a branch family who controlled the gold mines of the north, built a capital here meant to rival Kyoto and to embody the Pure Land on earth. It lasted a hundred years and three generations.',
    'In 1189 Minamoto no Yoritomo destroyed it. Most of what they built burned. What survives is the Konjikido, a golden hall from 1124, enclosed in a protective building and covered inside and out in gold leaf, mother of pearl and lacquer.',
    'Basho came here in 1689 and wrote his most famous verse about summer grass being all that remains of warriors’ dreams. The stone with that poem is at Takadachi, looking down on the river.'
  ],
  see: [
    { n: 'Konjikido at Chuson-ji',
      d: 'Behind glass in a concrete shelter, which sounds unpromising and is the only reason it survives. The entire hall is gilded and three generations of the family are entombed beneath it. No photography.' },
    { n: 'Motsu-ji garden',
      d: 'A Pure Land garden from the same period, with the temple buildings gone and the pond and stone arrangements intact. The clearest surviving example of the form.' },
    { n: 'Takadachi Gikeido',
      d: 'Where Minamoto no Yoshitsune died, above the Kitakami river, with Basho’s poem stone.' },
    { n: 'Geibikei gorge',
      d: 'Twenty minutes away, and the obvious pairing.' },
    { n: 'The Gokusuien', t: 'late May',
      d: 'A poetry ritual at Motsu-ji in Heian costume, with cups floated down a garden stream.' }
  ],
  when: 'Year round. Late May for the poetry festival, early November for colour.',
  stay: 'Half a day.',
  move: 'Ichinoseki on the shinkansen then two stops local, or a bus. Rent a bicycle at Hiraizumi station.',
  eat: 'Wanko soba is a Morioka thing, but mochi is the Hiraizumi speciality, served in a set of many small dishes with different toppings.'
},

'IWT-morioka': {
  intro: [
    'Morioka has three noodle dishes and a long-running argument about which matters most. Wanko soba is served in tiny bowls that a server refills the instant you empty one, continuing until you slam the lid on. The record is over five hundred bowls.',
    'Reimen is cold, chewy, in a beef broth with kimchi and a slice of watermelon, invented here in 1954 by a Korean immigrant. Jajamen is flat noodles with miso paste, cucumber and ginger, and when you finish you crack an egg into the bowl and hand it back for soup.',
    'The city also makes Nambu tekki, cast ironware, which has been produced here since the seventeenth century and is now sold worldwide. The New York Times named Morioka one of its places to go in 2023, which locals found funny and slightly alarming.'
  ],
  see: [
    { n: 'Wanko soba',
      d: 'Azumaya or Chokurian. A server kneels beside you and refills relentlessly. Thirty bowls is one normal portion; a hundred earns a certificate.' },
    { n: 'Jajamen and the egg soup',
      d: 'Pairon is the original. Leave a little noodle and sauce, crack the egg, stir, hand it over for chitantan.' },
    { n: 'Nambu ironware',
      d: 'Kamasada and Iwachu workshops. A kettle is heavy, lasts generations and genuinely changes the taste of water.' },
    { n: 'The rock-splitting cherry',
      d: 'Ishiwarizakura, a cherry tree growing out of a crack in a granite boulder in front of the courthouse, about four hundred years old.' },
    { n: 'Chagu Chagu Umakko', t: 'second Saturday of June',
      d: 'A hundred decorated horses with bells walking fourteen kilometres to the shrine. A very old and very gentle festival.' }
  ],
  when: 'Year round. June for the horse festival.',
  stay: 'A night.',
  move: 'Tohoku Shinkansen, about two and a quarter hours from Tokyo.',
  eat: 'The three noodles, in one day if you are ambitious.'
},

'IWT-geibikei': {
  intro: [
    'Geibikei is a gorge with limestone walls up to a hundred metres, and you go through it on a flat-bottomed boat poled by a single boatman. It takes about ninety minutes there and back.',
    'At the turning point you get out, walk to a cave mouth, and try to throw small clay discs called unnko through a hole in the rock face about thirty metres away. Almost nobody manages it.',
    'The boatman sings on the way back. It is a traditional song, unamplified, and the gorge walls do the rest. That is the moment people remember.'
  ],
  see: [
    { n: 'The boat',
      d: 'Ninety minutes, poled upstream and drifted back. Heated with a kotatsu under the seats in winter.' },
    { n: 'The singing',
      d: 'On the return leg, at the narrowest point. Not a performance so much as a working practice.' },
    { n: 'Unndama throwing',
      d: 'Clay discs at a hole in the cliff. Five characters, five discs, and a different wish on each.' },
    { n: 'Genbikei',
      d: 'A completely different gorge twenty minutes away despite the nearly identical name. Here the attraction is dango delivered across the river by a basket on a wire, which you pull over yourself.' },
    { n: 'Autumn',
      d: 'Late October into November, with maple on the walls above the water.' }
  ],
  when: 'Year round. Boats run in winter with heating, which is the best version.',
  stay: 'Half a day, usually with Hiraizumi.',
  move: 'Geibikei station on the Ofunato line from Ichinoseki, about fifty minutes.',
  eat: 'The flying dango at Genbikei, and mochi around Ichinoseki.'
},

'IWT-tono': {
  intro: [
    'In 1910 Yanagita Kunio published Tono Monogatari, a collection of folk tales told to him by a man from this valley. It included kappa in the rivers, zashiki-warashi who haunt houses and bring prosperity, and oshirasama, horse-headed household deities. The book effectively founded Japanese folklore studies.',
    'Tono takes this seriously in a way that is somewhere between tourism and genuine continuity. There is a pool where you can buy a kappa fishing licence, and the local people will tell you the stories without irony.',
    'The valley itself is rice fields and thatched farmhouses of a distinctive L-shaped type that put the stables under the same roof as the family.'
  ],
  see: [
    { n: 'Denshoen',
      d: 'A folk village with an L-shaped magariya farmhouse, a hall of a thousand oshirasama figures left by visitors, and craft workshops.' },
    { n: 'Kappabuchi',
      d: 'A stream pool behind a temple where kappa are said to live. You can buy a fishing licence and a rod baited with a cucumber. Nobody has caught one.' },
    { n: 'Tono Municipal Museum',
      d: 'On the tales and on Yanagita’s method. Better than a folk museum usually is.' },
    { n: 'Jokenji',
      d: 'The temple at Kappabuchi, with a kappa statue in the grounds that is said to have put out a fire.' },
    { n: 'Cycling the valley',
      d: 'Flat, quiet and the best way to see the farmhouses. Bikes at the station.' }
  ],
  when: 'Summer and autumn. Winter is deep snow and most things close.',
  stay: 'A night.',
  move: 'Kamaishi line from Shin-Hanamaki, about an hour.',
  eat: 'Hittsumi, a flour dumpling soup, and jingisukan, which Tono eats in unusual quantity for a place in Tohoku.'
},

'IWT-rikuchu': {
  intro: [
    'The Sanriku coast is a ria coastline, drowned river valleys making deep narrow inlets, with cliffs between them. That shape amplifies tsunami, and on 11 March 2011 the wave reached nearly forty metres here.',
    'Around twenty thousand people died along this coast. The rebuilding has involved sea walls of up to fifteen metres, which protect the towns and also cut them off from the sea they live by. That trade-off is actively argued about locally.',
    'The Michinoku Coastal Trail now runs a thousand kilometres along the whole coast, opened in 2019, partly as a recovery project. It is the best long walk in Japan.'
  ],
  see: [
    { n: 'Jodogahama',
      d: 'White rhyolite spires around a sheltered cove at Miyako. The name means Pure Land beach and it survived the wave.' },
    { n: 'Kitayamazaki',
      d: 'Two hundred metre cliffs over eight kilometres, with viewpoints and a stair down to the shore.' },
    { n: 'The Michinoku Coastal Trail',
      d: 'Day sections are easy to pick up. The stretch around Kitayamazaki is the most dramatic.' },
    { n: 'Tsunami memorials',
      d: 'Taro district in Miyako has a preserved ruined hotel and marked wave heights. Rikuzentakata has the single surviving pine from a forest of seventy thousand.' },
    { n: 'The Sanriku Railway',
      d: 'Rebuilt and reconnected in 2019, running the length of the coast. Local trains with sea views and a lot of tunnels.' }
  ],
  when: 'May to October. Winter is bitter on this coast.',
  stay: 'Two or three days along the coast.',
  move: 'Sanriku Railway and JS lines. A car is more flexible.',
  eat: 'Uni in summer, abalone, and wakame which this coast produces in quantity.'
},

'IWT-hachimantai': {
  intro: [
    'Hachimantai is a volcanic plateau on the Akita border at around sixteen hundred metres, with crater lakes, marshes and a scattering of hot springs that are among the most remote in Honshu.',
    'The Aspite Line, the road across it, opens in mid-April by cutting through snow that has built up over winter, leaving walls several metres high. For a couple of weeks you can walk between them before the road opens to cars.',
    'Toshichi Onsen, at fourteen hundred metres, is the highest hot spring in Tohoku and is buried to the roof in winter.'
  ],
  see: [
    { n: 'The snow corridor', t: 'mid-April',
      d: 'Walls of up to eight metres along the Aspite Line. A walking period runs before the road opens.' },
    { n: 'Hachimantai summit walk',
      d: 'A boardwalk loop of about an hour from the car park, past crater ponds and alpine marsh.' },
    { n: 'Goshogake Onsen',
      d: 'Mud pots, steam vents and a bath built over a natural steam sauna in the ground. There is a self-guided walk through the geothermal field.' },
    { n: 'Toshichi Onsen',
      d: 'Milky sulphur water with a view down the valley. Open roughly May to October.' },
    { n: 'The dragon eye', t: 'late May to early June',
      d: 'Kagami-numa pond thaws from the edges with a circle of snow left in the middle, so it looks like an eye. Lasts about a week.' }
  ],
  when: 'Mid-April for the snow walls, late May for the dragon eye, autumn for colour. The road is closed November to April.',
  stay: 'A night at one of the onsen.',
  move: 'Bus from Morioka, about two hours, seasonal. A car is much better.',
  eat: 'Inn food only. There is nothing else up there.'
},

'IWT-kitakami': {
  intro: [
    'Tenshochi park in Kitakami has about ten thousand cherry trees, including a two-kilometre avenue along the Kitakami river that is a hundred and fifty years old. It is counted among the best bloom sites in Tohoku and gets a fraction of the attention Hirosaki does.',
    'Bloom is mid-April. During the festival horse-drawn carriages run under the trees and boats cross the river, with the Ou mountains still snow-covered behind.',
    'The rest of the year it is an unremarkable industrial town, which is worth saying plainly.'
  ],
  see: [
    { n: 'The riverside avenue', t: 'mid to late April',
      d: 'Two kilometres of old trees. The view from the far bank, with the snow peaks behind the blossom, is the one.' },
    { n: 'The boat crossing',
      d: 'During the festival, a short ferry over the river to the quieter bank.' },
    { n: 'Michinoku Folklore Village',
      d: 'In the park, with relocated thatched buildings including a magariya farmhouse.' },
    { n: 'Oni Museum',
      d: 'A museum of demons, with masks from across Japan and the world. Unexpectedly good.' }
  ],
  when: 'Mid to late April. Otherwise there is limited reason to stop.',
  stay: 'Half a day.',
  move: 'Tohoku Shinkansen stops at Kitakami. The park is a short bus or thirty-minute walk.',
  eat: 'Festival stalls in season.'
},

/* ===================== MIYAGI ===================== */
'MYG-matsushima': {
  intro: [
    'Two hundred and sixty pine-covered islets in a shallow bay, counted as one of the three great views of Japan since a 1643 book ranked them. Basho arrived in 1689 and, according to the story, was so overcome that he could not write anything, which is itself a kind of review.',
    'The islands saved the town in 2011. They broke up the tsunami before it reached the shore, and the wave here was around three metres rather than the ten or more that hit neighbouring towns. The damage was serious and nothing like what happened a few kilometres away.',
    'Zuiganji, the temple behind the waterfront, is the finest Zen temple in northern Japan, with rooms of gold-leafed sliding doors commissioned by Date Masamune in 1609.'
  ],
  see: [
    { n: 'Zuiganji',
      d: 'Approached through a cedar avenue and past meditation caves cut into the rock. The painted rooms inside are National Treasures and photography is not allowed.' },
    { n: 'The bay by boat',
      d: 'Fifty-minute cruises weave between the islets. The cheaper local boats are better than the large ones.' },
    { n: 'Godaido',
      d: 'A small hall on a rocky islet reached by two bridges with gaps in the planks, so you have to watch your feet and think about the crossing.' },
    { n: 'Entsuin',
      d: 'Next to Zuiganji, with a rose garden and a mausoleum containing a painted ceiling with Western motifs, including playing card suits, from the 1640s.' },
    { n: 'The four great views',
      d: 'Four hilltop viewpoints around the bay, each named by a scholar. Otakamori is the best and needs a short climb.' }
  ],
  when: 'Year round. Autumn colour at Entsuin in November, lit at night.',
  stay: 'Half a day from Sendai.',
  move: 'Senseki line from Sendai to Matsushima-Kaigan, about forty minutes.',
  eat: 'Oysters, which the bay produces in quantity. Grilled, fried, or raw in winter. Also zunda mochi, with sweet mashed edamame.'
},

'MYG-sendai': {
  intro: [
    'Sendai was founded by Date Masamune in 1600. He lost an eye to smallpox as a child, wore a crescent moon on his helmet, sent an embassy to the Pope in 1613, and is the most interesting of the great daimyo. The city is still organised around him.',
    'It was firebombed in 1945 and rebuilt with wide avenues lined with zelkova, which is why it is called the City of Trees and why it is the most pleasant large city in Tohoku to walk around.',
    'Grilled beef tongue was invented here in 1948 by a cook using offcuts the occupying forces did not want. It is now the local dish and there are hundreds of places serving it.'
  ],
  see: [
    { n: 'Zuihoden',
      d: 'Date Masamune’s mausoleum, rebuilt in 1979 after the original burned in the war, in extravagant Momoyama style. His remains were examined before reburial, confirming he was about a hundred and fifty-nine centimetres and blood type B.' },
    { n: 'Aoba Castle site',
      d: 'The walls and a statue of Masamune on horseback, on a bluff with the best city view.' },
    { n: 'Tanabata', t: '6 to 8 August',
      d: 'The largest Tanabata festival in Japan, with enormous paper streamers hung the length of the covered arcades. Three thousand decorations, made by the shops themselves.' },
    { n: 'Akiu and Sakunami',
      d: 'Two hot spring valleys within an hour, with gorges and waterfalls.' },
    { n: 'The 3.11 memorial sites',
      d: 'Arahama Elementary School on the coast has been preserved as it was left, with the wave height marked on the second floor.' }
  ],
  when: 'August for Tanabata. Year round otherwise.',
  stay: 'A night, or a base for Miyagi.',
  move: 'Tohoku Shinkansen, ninety minutes from Tokyo. A subway and a loop bus cover the sights.',
  eat: 'Gyutan, charcoal grilled, served with barley rice and oxtail soup. Also zunda shakes, which sound wrong and are good.'
},

'MYG-naruko': {
  intro: [
    'Naruko has nine of the eleven recognised hot spring types in one small valley, which is unusual to the point of being remarkable. Inns a few hundred metres apart draw water with completely different chemistry and colour.',
    'It is also the home of Naruko kokeshi, the limbless wooden dolls with painted faces. They were made as children’s toys by woodworkers in the off season, and the Naruko style has a head that squeaks when turned.',
    'Naruko Gorge, just up the valley, is one of the best autumn colour sites in Tohoku, seen from a bridge looking down a hundred metre ravine.'
  ],
  see: [
    { n: 'Naruko Gorge', t: 'late October to early November',
      d: 'The view from Ofukazawa bridge down the gorge. A walking trail runs along the rim.' },
    { n: 'Takinoyu',
      d: 'A thousand-year-old public bath in a wooden building, with two waters, one milky and one clear. Cheap and the best in town.' },
    { n: 'The kokeshi workshops',
      d: 'Several in the main street where you can watch them turned and painted, and paint one yourself.' },
    { n: 'Geto and Onikobe',
      d: 'Further up, with a geyser that erupts regularly and some very remote inns.' },
    { n: 'The Rikuu East line',
      d: 'The railway through the gorge, with a slow seasonal service in autumn.' }
  ],
  when: 'Late October for the gorge. Winter for snow and baths.',
  stay: 'A night.',
  move: 'Rikuu East line from Furukawa, about forty minutes.',
  eat: 'Inn food, and kuri dango, chestnut dumplings.'
},

'MYG-zao-fox': {
  intro: [
    'Zao Fox Village has about a hundred foxes of six species running loose in a hillside enclosure that visitors walk through. There is an outer area with caged and tethered animals, which some visitors find uncomfortable, and an inner area where the foxes are simply around you.',
    'They are not tame and they are not pets. You are told not to crouch, not to carry bags loosely and not to touch, and the foxes will steal anything they can reach. They are also extremely beautiful, particularly in winter coat.',
    'Opinions on the welfare standards vary. It is a working breeding facility rather than a sanctuary, and it is worth going in knowing that.'
  ],
  see: [
    { n: 'The open enclosure',
      d: 'Walk among them. Winter, when the coats are full and there may be snow, is much the best time.' },
    { n: 'Feeding from the platform',
      d: 'You buy food and throw it from a raised deck rather than by hand, which keeps everyone intact.' },
    { n: 'The kits', t: 'April to June',
      d: 'Cubs are usually visible in spring and there is sometimes a handling session.' },
    { n: 'Shiroishi',
      d: 'The nearest town, with a reconstructed castle and a speciality of very thin dried noodles.' }
  ],
  when: 'December to March for winter coats. Closed in bad weather.',
  stay: 'Two hours.',
  move: 'Shiroishi-Zao on the shinkansen, then a taxi of about twenty-five minutes. There is no bus, which catches people out.',
  eat: 'Umen noodles in Shiroishi.'
},

'MYG-shiogama': {
  intro: [
    'Shiogama has more sushi restaurants per head of population than anywhere else in Japan, which is a consequence of being a major tuna landing port with a market right in the middle of town.',
    'Shiogama Shrine sits above the harbour at the top of two hundred and two stone steps. It is well over a thousand years old, dedicated to a deity of salt-making, and the main hall is a National Treasure.',
    'It is also where the Matsushima bay boats leave from, which makes it a better starting point than Matsushima itself.'
  ],
  see: [
    { n: 'Shiogama Shrine',
      d: 'The steep stone stair is the approach that counts. A gentler road exists. The grounds hold a rare double-flowered cherry that blooms in late April.' },
    { n: 'The fish market',
      d: 'Buy sashimi by the piece from different stalls, get a bowl of rice, and build your own donburi at the tables provided.' },
    { n: 'Sushi',
      d: 'Dozens of counters. The tuna is landed here and the standard is high for the price.' },
    { n: 'The boat to Matsushima',
      d: 'Through the full width of the bay rather than the shorter loop from Matsushima.' },
    { n: 'The sake breweries',
      d: 'Urakasumi has been brewing here since 1724 and runs tastings.' }
  ],
  when: 'Year round. Tuna is best in winter.',
  stay: 'Half a day.',
  move: 'Senseki line from Sendai, about twenty-five minutes.',
  eat: 'The entire reason to come. Sushi, and the build-your-own bowl at the market.'
},

'MYG-akiu': {
  intro: [
    'Akiu is Sendai’s own hot spring valley, half an hour from the city, and it has been in use since the sixth century. An emperor is recorded as being cured here in 587, which is the kind of claim onsen towns make and which in this case has a documentary basis.',
    'Rairaikyo is a short gorge just above the town, with a walking path cut along the rock about six hundred metres long, and the water running through pot-holed channels below.',
    'Akiu Otaki is a fifty-five metre waterfall at the top of the valley, counted among Japan’s hundred best.'
  ],
  see: [
    { n: 'Rairaikyo gorge',
      d: 'A walkway along the rock with the river in a narrow slot below. Twenty minutes each way, superb in autumn.' },
    { n: 'Akiu Otaki',
      d: 'Fifty-five metres, with a viewpoint and a path down to the base.' },
    { n: 'The Akiu craft village',
      d: 'Kokeshi, woodwork and glass in a cluster of workshops, several of which run short sessions.' },
    { n: 'The baths',
      d: 'Several large inns with day use, plus a free public footbath in the town centre.' }
  ],
  when: 'Late October for the gorge. Year round for the baths.',
  stay: 'A night, or an afternoon from Sendai.',
  move: 'Bus from Sendai station, about fifty minutes.',
  eat: 'Inn food. The craft village has a good soba place.'
},

/* ===================== AKITA ===================== */
'AKT-kakunodate': {
  intro: [
    'Kakunodate has a samurai quarter of about eighty houses, six of which are still owned by the families who built them. That continuity is rare; most preserved samurai districts in Japan are municipal property with nobody living in them.',
    'The weeping cherries along the black wooden fences were brought as seedlings from Kyoto in the 1650s, when a daughter of a court noble married into the local family. Four hundred of them are now designated natural monuments.',
    'Bloom is the third week of April. The contrast of pink against the black fences and the dark cedar is the reason this place is on every Tohoku itinerary.'
  ],
  see: [
    { n: 'The samurai street', t: 'late April for blossom',
      d: 'Uchimachi, with the Aoyagi and Ishiguro houses open. The Ishiguro is still lived in by the family and you walk through part of their home.' },
    { n: 'The Hinokinai riverbank',
      d: 'Two kilometres of Somei Yoshino cherries along the levee, which flower at the same time as the weeping ones in town. A different and equally good display.' },
    { n: 'Kabazaiku',
      d: 'Cherry bark work, a craft unique to this town, where the bark is polished onto wooden objects. The Denshokan museum shows it being made.' },
    { n: 'The Kakunodate festival', t: 'early September',
      d: 'Floats that deliberately collide with each other at intersections, settled by negotiation that often fails. Genuinely violent and very old.' },
    { n: 'Autumn and winter',
      d: 'The same streets under snow, with nobody there, are arguably better than the blossom.' }
  ],
  when: 'Third week of April for blossom, when accommodation is impossible. February for snow and silence.',
  stay: 'Half a day, or a night in season.',
  move: 'Akita Shinkansen stops here, about three hours from Tokyo. The samurai district is a fifteen-minute walk.',
  eat: 'Inaniwa udon, very thin and flat, which is one of Japan’s three great udon. Also kiritanpo, pounded rice on a cedar skewer, cooked in chicken broth.'
},

'AKT-nyuto': {
  intro: [
    'Nyuto is not a village. It is seven inns scattered through beech forest along a mountain road, each with its own spring, and they have no real connection to each other beyond a shared name and a shared pass that lets you bathe at all of them.',
    'Tsurunoyu is the oldest, dating to 1638, and it looks it. Thatched roofs, a dark wooden corridor with rooms off it, irori hearths, and a large milky outdoor bath where the water bubbles up through the gravel floor. It is mixed, which puts some people off, and it is the best bath in Japan.',
    'In winter you arrive through snow walls and the inn has no television, no mobile signal worth having, and nothing to do. That is the entire proposition.'
  ],
  see: [
    { n: 'Tsurunoyu',
      d: 'Book months ahead for a night, or take the day-use hours. The konyoku outdoor bath is milky enough that modesty is not really an issue, and there are women-only hours.' },
    { n: 'The yumeguri pass',
      d: 'A ticket that lets you bathe at all seven inns, with a shuttle bus between them. A full day of nothing but hot water.' },
    { n: 'Ganiba and Kuroyu',
      d: 'Two of the quieter inns. Kuroyu closes for the winter entirely and reopens in April.' },
    { n: 'The beech forest',
      d: 'Walking trails between the inns, and in autumn the colour here is excellent.' },
    { n: 'Lake Tazawa',
      d: 'Twenty minutes down the hill.' }
  ],
  when: 'Winter for snow walls and the classic image. Autumn for beech colour. Book far ahead for Tsurunoyu in either.',
  stay: 'One night, which is enough and also not enough.',
  move: 'Bus from Tazawako station, about fifty minutes. Tsurunoyu runs a pickup from the bus stop.',
  eat: 'Inn dinners cooked over the hearth. Yamanoimo nabe, a mountain yam hotpot, is the Tsurunoyu dish.'
},

'AKT-tazawa': {
  intro: [
    'Lake Tazawa is four hundred and twenty-three metres deep, the deepest in Japan, which is why it has never frozen. It is also almost perfectly circular, a caldera about six kilometres across.',
    'The water used to be clear enough to see thirty metres down and held an endemic fish, the kunimasu. In 1940 acidic water was diverted into the lake for a hydroelectric scheme, the pH crashed and almost everything died. The kunimasu was declared extinct.',
    'In 2010 it was found alive in a lake near Mount Fuji, where eggs had been sent in 1935. Work to neutralise Tazawa is ongoing and some fish have returned.'
  ],
  see: [
    { n: 'The Tatsuko statue',
      d: 'A gilded bronze of a girl who, in the legend, drank from a spring seeking eternal beauty and was turned into a dragon. It stands at the water’s edge and the gold against the blue is the image of the lake.' },
    { n: 'Cycling the shore',
      d: 'Twenty kilometres round, flat, with hire at the station and the lakeside.' },
    { n: 'Gozanoishi Shrine',
      d: 'A red torii at the water on the north shore.' },
    { n: 'Tazawako ski area',
      d: 'On the slope above, with the lake in view from the runs, which is unusual.' },
    { n: 'Nyuto Onsen',
      d: 'Up the hill, and the obvious pairing.' }
  ],
  when: 'Summer for the colour of the water, autumn for the surrounding hills.',
  stay: 'Half a day.',
  move: 'Tazawako on the Akita Shinkansen, then a bus to the lakeside.',
  eat: 'Local soba and lake fish. The area is also known for Hinai chicken, one of Japan’s three great breeds.'
},

'AKT-akita-city': {
  intro: [
    'The Kanto festival in early August is the reason to be in Akita. Men balance poles up to twelve metres long, hung with forty-six paper lanterns and weighing fifty kilograms, on their palm, forehead, shoulder and hip, while walking.',
    'There are about two hundred and seventy poles in the street at once. When one starts to go the crowd scatters, and they do go. It was originally a ritual to drive off summer sickness and pray for a good harvest.',
    'Akita is also serious rice country, which means serious sake. The prefecture has around thirty-five breweries and the style is clean and slightly sweet.'
  ],
  see: [
    { n: 'Kanto Matsuri', t: '3 to 6 August',
      d: 'Evening processions along Kanto Odori. In the daytime there are competitions where the technique is easier to see.' },
    { n: 'Nebunagashi-kan',
      d: 'A museum where you can try lifting a kanto pole, which is a quick lesson in how difficult it is.' },
    { n: 'Senshu Park',
      d: 'The castle site, with a reconstructed corner turret and good blossom in late April.' },
    { n: 'Akita Museum of Art',
      d: 'A Tadao Ando building holding a single enormous Fujita Tsuguharu painting of the Akita festivals, three and a half metres by twenty.' },
    { n: 'Namahage at Oga',
      d: 'An hour away, and worth the trip for the museum alone.' }
  ],
  when: 'Early August for Kanto. February for the Namahage Sedo festival at Oga.',
  stay: 'A night.',
  move: 'Akita Shinkansen, about four hours from Tokyo.',
  eat: 'Kiritanpo nabe, Hinai chicken, inaniwa udon and shottsuru, a fermented fish sauce hotpot that is an acquired taste.'
},

'AKT-oga': {
  intro: [
    'On New Year’s Eve, men in straw capes and ogre masks go house to house on the Oga peninsula shouting threats, looking for lazy children and new brides. The householder gives them sake and food and assures them everyone has been working hard. This is Namahage and it is not a performance for visitors.',
    'UNESCO listed it in 2018. The threats are theatrical, the terror of small children is real, and the whole thing is about enforcing diligence through the winter.',
    'The peninsula itself is a volcanic block of cliffs and a crater lake, sticking out into the Sea of Japan, with some of the best sunsets in Tohoku.'
  ],
  see: [
    { n: 'Namahage Museum and Denshokan',
      d: 'The museum has about a hundred and fifty masks from different villages, each distinct. Next door a demonstration recreates a house visit, and it is loud.' },
    { n: 'Namahage Sedo Matsuri', t: 'second weekend of February',
      d: 'A shrine festival with the Namahage coming down a snowy hillside with torches. Staged for visitors but genuinely impressive.' },
    { n: 'Nyudozaki',
      d: 'The cape at the tip, with a striped lighthouse, grassland and a monument marking the fortieth parallel.' },
    { n: 'Lake Ichinomegata',
      d: 'A maar crater lake, one of the few in Japan, with a short walking loop.' },
    { n: 'Godzilla Rock',
      d: 'A rock formation at Shiogosechi that looks like Godzilla, particularly at sunset when the sun lines up in its mouth for a few days a year.' }
  ],
  when: 'February for the festival. Summer for the coast. Winter is severe and windy.',
  stay: 'A day, or a night at the peninsula tip.',
  move: 'Oga line from Akita to Oga station, then a bus. A car is much better here.',
  eat: 'Ishiyaki, a fish soup cooked in a wooden tub by dropping in stones heated in a fire, which boils it in seconds.'
},

'AKT-dakigaeri': {
  intro: [
    'Dakigaeri gorge has water of a particular blue-green that comes from the mineral content and the depth, and it runs through a narrow cleft with a red suspension bridge across it.',
    'The name means embrace and return. The path along the gorge was once so narrow that two people meeting had to hold each other and turn around to pass. The current path is a good deal safer and still has tunnels cut through rock.',
    'It is about ten minutes from Kakunodate and most people visiting the samurai town never hear about it.'
  ],
  see: [
    { n: 'Kami no Iwahashi bridge',
      d: 'The red suspension bridge at the entrance, which is the photograph. It moves when you walk on it.' },
    { n: 'The gorge path',
      d: 'About a kilometre and a half through tunnels and along ledges to Mikaeri waterfall. Closed in winter.' },
    { n: 'The water',
      d: 'The colour is the thing. Best on a bright day with the sun into the gorge.' },
    { n: 'Autumn', t: 'late October',
      d: 'Maple over the blue water. This is when the place is busy and it is worth it.' }
  ],
  when: 'Late April to November. The path closes for winter.',
  stay: 'Two hours.',
  move: 'Bus or taxi from Kakunodate, about fifteen minutes.',
  eat: 'Nothing much. Eat in Kakunodate.'
},

/* ===================== YAMAGATA ===================== */
'YGT-ginzan': {
  intro: [
    'Ginzan was a silver mining valley that was worked out by the early eighteenth century. What was left was a hot spring, and the inns built along the river in the 1910s and 1920s are three and four storeys of wood with painted plaster reliefs on the facades.',
    'Gas lamps light the street at dusk, cars are kept out, and when it snows the whole thing looks like a set. It became nationally famous when a 1983 television drama was filmed here and it has been difficult to book ever since.',
    'Day visitors now outnumber guests by a wide margin, and the town has started restricting afternoon access in winter to manage it. Check the current rules before you go.'
  ],
  see: [
    { n: 'The street at dusk in snow',
      d: 'Gas lamps on, snow on the roofs, the river running down the middle. January and February. This is the entire reason to come.' },
    { n: 'Staying the night',
      d: 'The only way to see the street empty, after the day visitors leave. Inns book six months to a year ahead for winter weekends.' },
    { n: 'Shirogane waterfall',
      d: 'At the top of the street, twenty metres, lit at night.' },
    { n: 'The mine tunnel',
      d: 'A short section of the old silver workings is open behind the town.' },
    { n: 'The footbath',
      d: 'Free, at the top of the street, and welcome in the cold.' }
  ],
  when: 'January and February for snow. Access restrictions apply in winter and parking is limited; there is a shuttle system.',
  stay: 'One night, booked long in advance.',
  move: 'Oishida on the Yamagata Shinkansen, then a bus of about forty minutes.',
  eat: 'Inn dinners. Imoni, a taro and beef soup, is the Yamagata autumn dish.'
},

'YGT-yamadera': {
  intro: [
    'Risshakuji, universally called Yamadera, is a temple complex built into a cliff with a thousand and fifteen stone steps up to it. It was founded in 860 and the steps are worn smooth.',
    'Basho stopped here in 1689 and wrote: stillness, sinking into the rocks, the cry of the cicada. The verse is one of the best known in the language and the stillness is still available on a weekday outside summer.',
    'The climb takes about forty-five minutes. The Godaido hall at the top is a wooden platform over a drop with a view down the whole valley, and it is free.'
  ],
  see: [
    { n: 'The thousand steps',
      d: 'Through cedar, past small halls and carved rocks. Not steep, just long. There is a reason to stop every fifty metres.' },
    { n: 'Godaido',
      d: 'The viewing platform at the top. Go out onto it and look down the valley rather than at the buildings.' },
    { n: 'Nokyodo',
      d: 'A small red hall on an isolated pinnacle, which cannot be entered and is the most photographed structure here.' },
    { n: 'Konponchudo',
      d: 'At the base, holding a flame brought from Enryakuji on Mount Hiei that has burned since 860.' },
    { n: 'The Basho museum',
      d: 'Across the river, on his journey north and the Narrow Road to the Deep North.' }
  ],
  when: 'Autumn for colour, winter for snow on the steps, which is beautiful and requires care. Summer is hot and loud with cicadas, which is the authentic experience.',
  stay: 'Half a day.',
  move: 'Yamadera station on the Senzan line, twenty minutes from Yamagata, an hour from Sendai. The temple is right by the station.',
  eat: 'Chikaraa konnyaku, skewered and boiled in soy, sold at stalls on the climb. Also cherries, which Yamagata grows most of Japan’s supply of.'
},

'YGT-dewa-sanzan': {
  intro: [
    'Three mountains, walked as a single pilgrimage representing birth, death and rebirth. Haguro stands for the present and the living world, Gassan for the past and death, Yudono for the future and rebirth. Pilgrims have walked the sequence for over fourteen hundred years.',
    'The approach to Haguro is two thousand four hundred and forty-six stone steps through a cedar avenue, with a five-storey pagoda from 937 standing among the trees near the bottom. The pagoda has no paint and no nails and it is the oldest in Tohoku.',
    'The Yudono shrine object is a large rock that hot water flows over. You take off your shoes, are purified, and walk on it. Photography is forbidden and pilgrims were traditionally sworn to silence about what they saw, which is why Basho wrote nothing about it.'
  ],
  see: [
    { n: 'The Haguro steps',
      d: 'Two and a half thousand of them, about an hour, through cedars that are three to six hundred years old. A tea house two thirds of the way up gives a certificate.' },
    { n: 'The five-storey pagoda',
      d: 'From 937, rebuilt around 1372, bare wood in a cedar grove. It was closed for restoration recently; check before going specially.' },
    { n: 'Gassan', t: 'July to September only',
      d: 'Nineteen hundred metres with snow into summer. The walk from the eighth station takes about three hours.' },
    { n: 'Yudonosan',
      d: 'Open roughly May to early November. No shoes, no photographs, and the object of worship is not described to outsiders.' },
    { n: 'Shukubo lodging',
      d: 'Pilgrim lodgings at the base of Haguro serving shojin ryori built around mountain vegetables. The best vegetarian food in Tohoku.' }
  ],
  when: 'Haguro year round. Gassan and Yudono are summer only. Early autumn is the best window for all three.',
  stay: 'Two days for the full circuit.',
  move: 'Bus from Tsuruoka station to Haguro, about fifty minutes.',
  eat: 'Shojin ryori at the lodgings, with mountain vegetables the cooks forage themselves.'
},

'YGT-zao': {
  intro: [
    'In February the fir trees on the upper slopes of Zao are encased in rime and snow until they become juhyo, snow monsters: lumpen white figures standing in rows across the mountain. They are lit at night, which is either magical or unsettling.',
    'The phenomenon needs a particular combination of Siberian wind, supercooled water droplets and a specific species of fir. It happens at only a handful of places in the world.',
    'The ski area underneath is large and the onsen at the base has strongly acidic sulphur water, pH around 1.6, which is said to be good for skin and will sting any cut you have forgotten about.'
  ],
  see: [
    { n: 'Snow monsters', t: 'late January to late February',
      d: 'Ropeway to Jizo Sancho. Night illumination runs on set dates. The window is narrower than people expect and warm winters have shortened it.' },
    { n: 'Okama crater lake', t: 'late April to October',
      d: 'A volcanic lake that changes colour with light and chemistry, reached by the Zao Echo Line which is closed in winter.' },
    { n: 'The ski area',
      d: 'Fifteen linked areas, good for intermediates, with long runs through the monsters.' },
    { n: 'Zao Onsen',
      d: 'Acidic sulphur water, with a large open-air bath in the woods open May to November, and small public baths in the village.' },
    { n: 'The Jizo statue',
      d: 'A stone figure at the top station that is buried to the neck in deep winter.' }
  ],
  when: 'February for monsters, summer for the crater. The Echo Line closes from November to April.',
  stay: 'Two nights.',
  move: 'Bus from Yamagata station, about forty minutes.',
  eat: 'Genghis Khan lamb, and Yamagata beef. Tamakonnyaku on a stick everywhere.'
},

'YGT-tsuruoka': {
  intro: [
    'Tsuruoka was named a UNESCO City of Gastronomy in 2014, the first in Japan, and the reason is specific: around fifty heirloom vegetable varieties are still grown here that have disappeared elsewhere. Some are grown by a handful of farmers each.',
    'Among them is the Atsumi turnip, grown by slash and burn on steep slopes, and dadacha-mame, an edamame with an unusually strong flavour that only keeps for a day, which is why you rarely find it outside the prefecture.',
    'It is also the base for Dewa Sanzan and has an unusual Buddhist practice attached to it: the sokushinbutsu, monks who mummified themselves through years of diet and ritual and who are still displayed in temples nearby.'
  ],
  see: [
    { n: 'Churenji and Dainichibo',
      d: 'Two temples with mummified monks on display, sitting in robes. They fasted on nuts and bark for years, drank a lacquer-tree tea to make the body inhospitable to decay, and were buried alive breathing through a tube. Confronting, and they are treated as living Buddhas rather than corpses.' },
    { n: 'The Italian restaurant Al-ché-cciano',
      d: 'Chef Masayuki Okuda works almost entirely with the local heirloom varieties and is the reason the UNESCO designation happened. Book well ahead.' },
    { n: 'Chido Museum',
      d: 'Relocated Meiji buildings including a police station and a Western-style municipal hall, with a good folk collection.' },
    { n: 'Kamo Aquarium',
      d: 'Devoted almost entirely to jellyfish, with over eighty species, the most in the world. It saved itself from closure by specialising.' },
    { n: 'Dewa Sanzan',
      d: 'The pilgrimage starts from here.' }
  ],
  when: 'Summer for dadacha-mame in August, autumn for mountain vegetables.',
  stay: 'A night.',
  move: 'Limited express from Niigata, or fly to Shonai airport.',
  eat: 'The whole point. Book at least one serious meal before you arrive.'
},

'YGT-mogami': {
  intro: [
    'Basho travelled down the Mogami river in 1689 and wrote that it gathers the summer rains and runs fast. The boats still go, flat-bottomed, with a boatman who poles, steers and sings the traditional Mogami river song unaccompanied.',
    'The trip is about twelve kilometres and takes an hour, through a gorge with waterfalls coming down both sides. In winter the boats have a kotatsu under the seats and plastic sheeting over the sides.',
    'The singing is the thing people remember. It is not a performance for tourists; it is a working song from when these boats carried rice and safflower down to the port at Sakata.'
  ],
  see: [
    { n: 'The boat',
      d: 'An hour from Furukuchi, year round. Lunch versions serve a bento with local river fish.' },
    { n: 'Shiraito Falls',
      d: 'A hundred and twenty metres down the gorge wall, visible from the boat and the best of several.' },
    { n: 'The boatman’s song',
      d: 'Mogamigawa Funauta. Unamplified, in a gorge, which does the work.' },
    { n: 'Autumn',
      d: 'Late October and early November, when the gorge turns and the boats are fullest.' },
    { n: 'Sakata',
      d: 'At the river mouth, with the Sankyo rice warehouses and a row of keyaki trees planted to shade them.' }
  ],
  when: 'Year round. Autumn for colour, winter for the kotatsu boats.',
  stay: 'Half a day.',
  move: 'Furukuchi station on the Rikuu West line. Boats meet the trains.',
  eat: 'The boat bento, and ayu river fish grilled on skewers.'
},

/* ===================== FUKUSHIMA ===================== */
'FKS-ouchi-juku': {
  intro: [
    'Ouchi-juku was a post town on the road between Aizu and Nikko, and it has about thirty thatched houses in a single street with no overhead wires, no tarmac and no parked cars. The village agreed in the early 1980s not to sell, rent or destroy any of the buildings.',
    'The road was bypassed in the nineteenth century, which is why it survived. The houses are now shops, inns and soba restaurants run by the families who have always lived in them.',
    'The local soba is negi soba: you are given a whole spring onion instead of chopsticks and expected to eat with it, biting the onion as you go. It is awkward, and the point is that it is a ritual rather than a convenience.'
  ],
  see: [
    { n: 'The street from the viewpoint',
      d: 'Steps at the far end climb to a small shrine with the view straight down the thatched roofs. Essential in snow.' },
    { n: 'Negi soba',
      d: 'Misawaya is the usual recommendation. You will be given a fork if you ask, and you should not ask.' },
    { n: 'The snow festival', t: 'second weekend of February',
      d: 'Snow lanterns the length of the street, fireworks, and men in loincloths carrying torches. Extremely cold and very good.' },
    { n: 'The folk museum',
      d: 'A house opened up with the hearth lit, showing the smoke-blackened roof structure from inside.' },
    { n: 'The Tadami line',
      d: 'Not far, and one of the most scenic railways in Japan, particularly the bridge over the Tadami river.' }
  ],
  when: 'February for snow. Autumn for colour. Summer is green and busy with coaches.',
  stay: 'Half a day, or a night in a thatched inn.',
  move: 'Yunokami Onsen station on the Aizu line, then a bus or taxi. The station building is itself thatched.',
  eat: 'Negi soba, grilled char on a skewer, and tochi mochi made with horse chestnut.'
},

'FKS-aizu': {
  intro: [
    'Aizu was the domain most loyal to the shogun, and in 1868 it was the last to hold out. Tsuruga Castle was shelled for a month and surrendered only after the surrounding domains had fallen.',
    'During the siege a unit of teenage boys, the Byakkotai, saw smoke rising from the direction of the castle, concluded it had fallen, and twenty of them committed suicide on Iimoriyama. The castle had not fallen. One boy survived, and the story is still taught in Japanese schools.',
    'The castle keep has red roof tiles, which no other Japanese castle has. The restoration in 2011 put them back after decades of grey ones, which was locally contentious and historically correct.'
  ],
  see: [
    { n: 'Tsuruga Castle',
      d: 'Reconstructed in 1965 with a museum inside and the red tiles restored. The tea house Rinkaku in the grounds is original and survived the war.' },
    { n: 'Iimoriyama',
      d: 'The graves of the Byakkotai, with the view they saw. Also the Sazaedo, a 1796 hexagonal temple with a double-helix ramp inside so ascending and descending pilgrims never meet. It is an extraordinary structure.' },
    { n: 'Bukeyashiki',
      d: 'A reconstructed senior retainer’s residence of thirty-eight rooms, showing how the household worked.' },
    { n: 'Nanukamachi street',
      d: 'Meiji and Taisho buildings, lacquer shops and a good sake brewery.' },
    { n: 'Higashiyama Onsen',
      d: 'Fifteen minutes out, a thousand-year-old hot spring valley.' }
  ],
  when: 'Late April for blossom at the castle. Autumn for colour. Winter is heavy snow.',
  stay: 'A night.',
  move: 'Aizu-Wakamatsu station, about three and a half hours from Tokyo via Koriyama.',
  eat: 'Kozuyu, a clear soup with scallop stock and taro, served at celebrations. Sauce katsu don, and very good sake; Aizu is one of the best sake regions in Japan.'
},

'FKS-goshikinuma': {
  intro: [
    'In July 1888 Mount Bandai erupted, the north face collapsed, and the debris avalanche dammed the valleys below. Five hundred people died. The ponds that formed in the blocked valleys are the Goshikinuma, the five-coloured lakes, and there are about thirty of them.',
    'The colours are genuine and they differ pond to pond: cobalt, emerald, turquoise, a pale milky blue. The cause is the mineral content of the groundwater feeding each one, and some ponds change colour through the day as light shifts.',
    'A flat path of about four kilometres links the main ones and takes an hour and a half.'
  ],
  see: [
    { n: 'The pond walk',
      d: 'Bishamon-numa to Ruri-numa, about four kilometres, well made and gentle. Bus back from the far end.' },
    { n: 'Bishamon-numa',
      d: 'The largest, with rowing boats and Bandai’s collapsed face above it, which makes the geology legible.' },
    { n: 'Aoike',
      d: 'The most intensely coloured, a blue that looks artificial and is not.' },
    { n: 'Autumn', t: 'late October',
      d: 'Colour around the ponds, which doubles the effect in the reflections.' },
    { n: 'Snowshoeing',
      d: 'The path in winter, with the ponds frozen and the trees bare, run as guided tours.' }
  ],
  when: 'Late October for colour. Summer is green and cool. Winter needs snowshoes.',
  stay: 'Half a day.',
  move: 'Bus from Inawashiro station, about thirty minutes.',
  eat: 'Very little on the path. Inawashiro has options.'
},

'FKS-oze': {
  intro: [
    'Oze is the largest highland marsh in Honshu, at about fourteen hundred metres, and the whole of it is crossed on wooden boardwalk. Stepping off is prohibited and the rule is taken seriously because the peat takes centuries to recover.',
    'It was nearly flooded for a dam in the 1950s and saved by one of Japan’s first conservation campaigns. The power company that owned the land now manages it as a reserve.',
    'Skunk cabbage flowers in late May, which draws the biggest crowds, and day-lilies take over in July. The walk across the main marsh from Hatomachi to Ozenuma is about fifteen kilometres.'
  ],
  see: [
    { n: 'The boardwalk across Ozegahara',
      d: 'Six kilometres of flat marsh with mountains at both ends. Stay on the planks and keep left.' },
    { n: 'Mizubasho', t: 'late May to early June',
      d: 'Skunk cabbage, white and strange, across the whole marsh. The busiest fortnight of the year.' },
    { n: 'Nikko-kisuge', t: 'July',
      d: 'Day-lilies turning the marsh yellow, particularly at Ozenuma.' },
    { n: 'Staying in a hut',
      d: 'Several mountain lodges inside, which is the only way to see the marsh at dawn with mist on it.' },
    { n: 'Autumn',
      d: 'Late September and early October, when the grass turns gold and there is almost nobody there.' }
  ],
  when: 'Late May to October. Snow closes it the rest of the year.',
  stay: 'A long day, or a night in a hut.',
  move: 'Bus to Hatomachi Toge from Numata, or from the Fukushima side via Aizu-Kogen-Ozeguchi. Private cars stop well short of the marsh.',
  eat: 'Hut meals. Carry water; there is nothing on the boardwalk.'
},

'FKS-tsuruga-castle-town': {
  intro: [
    'Kitakata has around four thousand kura, traditional clay-walled storehouses, in a town of about forty-five thousand people. That is the highest concentration in Japan. They were built because the groundwater here is good for brewing and the merchants needed somewhere to keep the sake, miso and soy sauce.',
    'There are kura used as houses, as shops, as a brewery, and one built entirely of brick. Several are open.',
    'The other thing Kitakata is known for is ramen, which people here eat for breakfast. Thick, flat, wavy noodles in a light soy and pork broth, and there are over a hundred shops in the town.'
  ],
  see: [
    { n: 'Asa-ra, breakfast ramen',
      d: 'Several shops open from seven. Eating ramen at half past seven in the morning is a local habit and it makes complete sense once you have done it.' },
    { n: 'The kura streets',
      d: 'Walk north from the station. Different districts have different styles: black plaster, white, and one brick street.' },
    { n: 'Yamatogawa Sake Brewing Museum',
      d: 'A working brewery since 1790 with the old building preserved and tastings.' },
    { n: 'Kumano Shrine Nagatoko',
      d: 'Fifteen minutes out, a 1055 open-sided hall on forty-four pillars with a thatched roof, which is a very unusual structure.' },
    { n: 'The Aizu rail',
      d: 'The Ban-etsu West line, with a steam service in season.' }
  ],
  when: 'Year round. Spring for the cherry avenue along the old railway line.',
  stay: 'Half a day.',
  move: 'Twenty minutes from Aizu-Wakamatsu on the Ban-etsu West line.',
  eat: 'Ramen, and then more ramen. The town publishes a map of the shops.'
},

'FKS-nanko': {
  intro: [
    'The Shirakawa barrier was the gate between the civilised provinces and the wild north, and crossing it was a literary event. Poets had written about it for eight hundred years before Basho arrived in 1689, and he noted that he finally felt his journey had properly begun.',
    'The barrier itself is a wooded site with earthworks. What is in the town is Komine Castle, a faithful wooden reconstruction built in the 1990s using the original techniques and drawings, which almost no Japanese castle reconstruction does.',
    'Nanko Park, laid out in 1801, is one of the oldest public parks in Japan, built by the local lord explicitly for the use of commoners as well as samurai.'
  ],
  see: [
    { n: 'Komine Castle',
      d: 'A wooden reconstruction with no concrete and no lift, which makes it feel entirely different from most rebuilt keeps. Free to enter the grounds.' },
    { n: 'Nanko Park',
      d: 'Fifteen hundred cherry trees around a lake, planted when it opened in 1801. The design was deliberately egalitarian.' },
    { n: 'Shirakawa no Seki',
      d: 'The barrier site, with a shrine and the earthworks. More atmosphere than object.' },
    { n: 'Daruma',
      d: 'Shirakawa makes a distinctive daruma with painted eyebrows representing cranes and turtles. A market in February sells several hundred thousand.' }
  ],
  when: 'Late April for blossom. February for the daruma market.',
  stay: 'Half a day.',
  move: 'Shin-Shirakawa on the shinkansen, about ninety minutes from Tokyo.',
  eat: 'Shirakawa ramen, with hand-pulled noodles, which is a distinct style from Kitakata.'
},

/* ===================== NIIGATA ===================== */
'NGT-sado': {
  intro: [
    'Sado was an exile island. The emperor Juntoku was sent here in 1221, the monk Nichiren in 1271, and the Noh dramatist Zeami in 1434. That is an unusual concentration of cultural figures to deposit on one island, and the result is that Sado has thirty Noh stages, about a third of all those in Japan.',
    'Then gold was found in 1601, and the Sado mine funded the Tokugawa shogunate for two hundred and fifty years. It was worked until 1989 and was listed by UNESCO in 2024. The mountain above the mine is split in two by the opencast working, which is visible from a distance.',
    'The Kodo taiko drummers are based here and have been since 1981, running an apprenticeship programme on the island.'
  ],
  see: [
    { n: 'Sado Kinzan',
      d: 'Two tunnel routes, one Edo with animatronic miners and one Meiji with industrial machinery. The split mountain above is the signature image.' },
    { n: 'Tarai-bune',
      d: 'Tub boats, round wooden vessels originally used for shallow-water shellfish gathering, now rowed by women in traditional dress at Ogi. Sillier and more fun than expected.' },
    { n: 'Toki Forest Park',
      d: 'The crested ibis breeding centre. The species went extinct in Japan in 2003 and has been reintroduced from Chinese stock; there are now several hundred wild on the island.' },
    { n: 'The Noh stages',
      d: 'Several still used. Takigi Noh, performed by firelight at outdoor stages in summer, is the one to catch.' },
    { n: 'Earth Celebration', t: 'August',
      d: 'Kodo’s three-day festival at Ogi, with workshops and performances.' }
  ],
  when: 'May to October. Winter ferries are frequently cancelled.',
  stay: 'Two or three nights.',
  move: 'Ferry from Niigata, two and a half hours by car ferry or one by jetfoil. A car on the island is close to essential.',
  eat: 'Oysters, buri yellowtail in winter, and Sado rice, which is grown without pesticide to protect the ibis.'
},

'NGT-echigo-yuzawa': {
  intro: [
    'The train comes out of a long tunnel and the snow country begins. That is the opening of Kawabata’s Snow Country, written in an inn here in the 1930s, and the tunnel is the Shimizu tunnel on the line from Tokyo.',
    'Yuzawa gets several metres of snow because it sits on the Sea of Japan side of the watershed. It is seventy-seven minutes from Tokyo by shinkansen, which makes it the most accessible deep snow in Japan.',
    'The station has a hall with about a hundred sake dispensers covering every brewery in Niigata, worked with tokens. It is a very good idea and also a trap.'
  ],
  see: [
    { n: 'Ponshukan',
      d: 'In the station. Five hundred yen for five tokens, each buying a small cup. Also a bath downstairs with sake in the water.' },
    { n: 'The ski areas',
      d: 'Gala Yuzawa is connected directly to the shinkansen platform, which means you can ski from Tokyo in the morning. Naeba and Kagura are larger.' },
    { n: 'The Takahan inn',
      d: 'Where Kawabata wrote, with the room preserved.' },
    { n: 'Kiyotsu Gorge',
      d: 'Thirty minutes away, with a tunnel walk ending at a shallow pool that mirrors the gorge mouth. One of the most photographed installations in Japan.' },
    { n: 'Echigo-Tsumari art fields',
      d: 'The surrounding countryside, with permanent installations.' }
  ],
  when: 'December to March for snow. Summer for the gorge and walking.',
  stay: 'A night or two.',
  move: 'Joetsu Shinkansen, seventy-seven minutes from Tokyo.',
  eat: 'Hegi soba, bound with seaweed and served in folded ribbons on a wooden tray. Niigata rice, which is the best in Japan and locals will not be argued with on this.'
},

'NGT-niigata-city': {
  intro: [
    'Niigata is the largest city on the Sea of Japan coast and it sits in the middle of Japan’s most productive rice country. That means sake: ninety breweries in the prefecture, more than anywhere else, producing a style that is dry, clean and often described as tanrei karakuchi.',
    'The city was one of the five ports opened to foreign trade in 1858 and has a river running through it with a 1929 bridge that is a designated important cultural property.',
    'It is not a tourist city, which is part of the appeal. People come for the food and the sake and the ferry to Sado.'
  ],
  see: [
    { n: 'Ponshukan Niigata',
      d: 'The station version of the sake dispenser hall, with about ninety brands. Work through systematically or you will not remember which you liked.' },
    { n: 'Northern Culture Museum',
      d: 'Outside the city, the mansion of a landowning family with sixty-five rooms and a garden, showing what rice wealth looked like before the postwar land reform.' },
    { n: 'Furumachi',
      d: 'The old geigi district, one of three historic ones in Japan alongside Kyoto and Tokyo, with a few still working.' },
    { n: 'Bandai Bridge',
      d: '1929, six arches, and the symbol of the city. Walk it at dusk.' },
    { n: 'Pia Bandai',
      d: 'A market by the river with fish, rice, sake and a good sushi counter.' }
  ],
  when: 'Year round. Winter is grey and snowy on this coast.',
  stay: 'A night, usually en route to Sado.',
  move: 'Joetsu Shinkansen, two hours from Tokyo.',
  eat: 'Tarekatsu don, pork cutlet dipped in soy and laid on rice without egg, which is the local variant. Wappa-meshi, rice steamed in a cedar box.'
},

'NGT-echigo-tsumari': {
  intro: [
    'Echigo-Tsumari is an art triennial that happens across seven hundred and sixty square kilometres of depopulating farmland, and about two hundred works are permanent. The idea, started in 2000, was to use art to bring people into villages that were emptying.',
    'The works are in abandoned schools, disused houses, rice terraces and forests. Several are inside buildings that were falling down and have been rebuilt around the art.',
    'Whether it has reversed the depopulation is debatable. What is not debatable is that it has produced some of the best site-specific art in Japan and that the drive between the pieces is half the experience.'
  ],
  see: [
    { n: 'House of Light',
      d: 'A James Turrell building you can stay in overnight, with a sliding roof over a tatami room for watching the sky change at dusk and dawn. Book far ahead.' },
    { n: 'Museum on Echigo-Tsumari',
      d: 'Also called MonET, a Hiroshi Hara building around a reflecting courtyard, which is the main hub.' },
    { n: 'The Rice Field',
      d: 'Ilya and Emilia Kabakov’s figures in a terraced paddy, aligned so they read as a single scene through a frame on the museum balcony.' },
    { n: 'Kiyotsu Gorge Tunnel',
      d: 'A disused viewing tunnel remade by MAD Architects, ending in a shallow mirror pool. Extremely popular and still good.' },
    { n: 'Dr Kingarobe',
      d: 'An abandoned school turned into a working experiment in reuse, with a restaurant and accommodation.' }
  ],
  when: 'Permanent works are open roughly April to November. The triennial runs in summer of its years.',
  stay: 'Two days, with a car.',
  move: 'Tokamachi is the hub, reached from Echigo-Yuzawa. A car is essential; the works are spread across a region the size of a small country.',
  eat: 'Hegi soba, and several of the art sites have restaurants using local produce.'
},

'NGT-myoko': {
  intro: [
    'Myoko gets snow in the same quantity as Niseko and a fraction of the attention. It sits under a 2,454 metre volcano and the resorts on its flanks have been operating since the 1930s, which makes some of them the oldest in Japan.',
    'Akakura Onsen has sulphur water piped from the mountain and a ski area directly above the village, which is an arrangement that has largely disappeared elsewhere.',
    'It is less developed than Hakuba or Niseko, which means fewer English menus and more atmosphere.'
  ],
  see: [
    { n: 'Skiing',
      d: 'Several areas including Akakura Kanko, Suginohara with a single run of eight and a half kilometres, and Seki Onsen, which is tiny, ancient and gets absurd amounts of snow.' },
    { n: 'Akakura Onsen',
      d: 'Milky sulphur water, several public baths, and inns at the bottom of the lifts.' },
    { n: 'Lake Nojiri',
      d: 'Across the valley, with a summer scene and a fossil site where mammoth remains were found.' },
    { n: 'Climbing Myoko',
      d: 'About six hours return in summer, with a crater at the top.' },
    { n: 'Tsubame Onsen',
      d: 'High on the mountain, with free open-air baths you walk to and a view down the valley.' }
  ],
  when: 'January and February for snow. July to October for walking.',
  stay: 'Three nights.',
  move: 'Myoko-Kogen station, reached via Nagano on the shinkansen then a local line.',
  eat: 'Inn food, and very good soba in the valley.'
},

/* ===================== TOYAMA ===================== */
'TYM-tateyama': {
  intro: [
    'The Tateyama Kurobe Alpine Route crosses the Northern Alps using six different vehicles in sequence: cable car, bus, trolleybus, ropeway, another cable car, another bus. It climbs from five hundred metres to two thousand four hundred and fifty and down the other side.',
    'From mid-April the road at Murodo is cleared through snow that has accumulated to as much as twenty metres, leaving a corridor you can walk between walls of ice. The ploughs use GPS to find where the road actually is.',
    'The route is open from mid-April to the end of November. The rest of the year it is simply shut.'
  ],
  see: [
    { n: 'The snow corridor', t: 'mid-April to mid-June',
      d: 'Walls up to twenty metres at Murodo, tallest in April and shrinking through May. A walking section is open.' },
    { n: 'Murodo',
      d: 'At two thousand four hundred and fifty metres, with Mikurigaike pond, steam vents and alpine walking. The highest hot spring in Japan is a short walk away.' },
    { n: 'Kurobe Dam',
      d: 'A hundred and eighty-six metres, the tallest in Japan, built in the 1950s at the cost of a hundred and seventy-one lives. Water release from late June to mid-October is spectacular.' },
    { n: 'Autumn', t: 'late September to October',
      d: 'Colour starts at Murodo in late September and works down. One of the earliest in Honshu.' },
    { n: 'Doing it one way',
      d: 'Crossing from Toyama to Nagano, or the reverse, with luggage forwarding. Better than a return trip.' }
  ],
  when: 'Mid-April to late November. The snow corridor is April to June and is the busiest period.',
  stay: 'A full day to cross, or a night at Murodo.',
  move: 'Dentetsu-Toyama to Tateyama, or Shinano-Omachi on the Nagano side. Tickets are sold as a through route; book in advance in snow corridor season.',
  eat: 'Murodo has a cafeteria. Carry water; the altitude dehydrates you faster than you expect.'
},

'TYM-gokayama': {
  intro: [
    'Gokayama shares its World Heritage listing with Shirakawa-go and gets a fraction of the visitors. Two hamlets, Ainokura with about twenty gassho houses and Suganuma with nine, in a valley that was so isolated it was used to make gunpowder for the Kaga domain in secret.',
    'The gunpowder came from saltpetre produced under the floors of these houses, using soil, silkworm droppings and urine, fermented for years. The under-floor pits are still there.',
    'Ainokura is lived in and quiet. There is no car access into the hamlet itself and the number of visitors is managed, which is why it still feels like a village rather than a site.'
  ],
  see: [
    { n: 'Ainokura',
      d: 'Twenty houses on a slope, with a viewpoint above. Stay the night in one and the difference from a day visit is complete.' },
    { n: 'Suganuma',
      d: 'Smaller, nine houses, beside the river, with a saltpetre museum explaining the gunpowder trade.' },
    { n: 'Kokiriko',
      d: 'A folk song claimed as the oldest in Japan, performed with a clapper of a hundred and eight wooden slats worn over the shoulders. Demonstrated at Ainokura.' },
    { n: 'Staying in a gassho house',
      d: 'Several take guests. Dinner round the irori hearth with the smoke going up into the roof space.' },
    { n: 'Winter',
      d: 'Deep snow, light-up events on set evenings in January and February.' }
  ],
  when: 'Year round. Winter for snow, autumn for colour. Light-ups are on specific dates only.',
  stay: 'A night.',
  move: 'Bus from Takaoka or Shin-Takaoka, about ninety minutes. Also reachable from Shirakawa-go in forty minutes.',
  eat: 'Inn food: river fish, mountain vegetables, and tofu that is firm enough to tie with string, which is a local speciality.'
},

'TYM-toyama-city': {
  intro: [
    'Toyama Bay is unusually deep right up against the shore, which produces two things. One is a run of firefly squid in spring that come to the surface at night and glow blue, in numbers that light the water. The other is very good fish, because deep cold water sits close to a warm current.',
    'The city has rebuilt its tram network into a loop that actually works and is cited internationally as a model for a shrinking city.',
    'The Toyama Glass Art Museum, in a Kengo Kuma building shared with the library, is the best modern building in the city and holds a permanent Dale Chihuly installation.'
  ],
  see: [
    { n: 'Firefly squid', t: 'March to June',
      d: 'Boat tours from Namerikawa leave around three in the morning to watch the nets come up glowing. There is also a museum with a live tank.' },
    { n: 'Toyama Glass Art Museum',
      d: 'Kengo Kuma, with a slatted timber atrium rising through six floors. The Chihuly room at the top is worth the trip.' },
    { n: 'Amaharashi Coast',
      d: 'Thirty minutes away, where the Northern Alps rise out of the sea across the bay.' },
    { n: 'Kansui Park',
      d: 'A canal park with the Starbucks that regularly gets called the best-looking in the world, and a good view of the Alps on a clear day.' },
    { n: 'Toyama Castle and the tram loop',
      d: 'Small castle, good tram. Riding the loop is a pleasant half hour.' }
  ],
  when: 'March to June for squid. Winter for buri yellowtail and clear mountain views.',
  stay: 'A night.',
  move: 'Hokuriku Shinkansen, just over two hours from Tokyo.',
  eat: 'Masu no sushi, trout pressed in a round cedar box with bamboo leaves, sold at the station and genuinely excellent. White shrimp, and buri in winter.'
},

'TYM-kurobe': {
  intro: [
    'The Kurobe Gorge Railway was built to service the construction of hydroelectric dams, and it still carries equipment as well as passengers. It runs twenty kilometres up a gorge on seven hundred and sixty-two millimetre gauge track, through forty-one tunnels and over twenty-one bridges.',
    'The basic carriages are open-sided with no glass, which in October is bracing and is also the correct way to do it. There are enclosed carriages for a supplement.',
    'The journey takes eighty minutes each way. At the far end, Keyakidaira, there are walking paths, a hot spring and a bridge over the gorge.'
  ],
  see: [
    { n: 'The open carriage',
      d: 'Cold, loud, and much better than the enclosed one. A blanket is sold at the station.' },
    { n: 'Keyakidaira',
      d: 'The terminus, with a walk to Sarutobikyo gorge and an outdoor bath at Meiken Onsen reached on foot.' },
    { n: 'Kanetsuri',
      d: 'A stop partway with a riverbed where hot water comes up through the gravel and you can dig your own bath.' },
    { n: 'Autumn', t: 'late October to early November',
      d: 'The gorge turns and the trains are full. Book seats in advance.' },
    { n: 'Unazuki Onsen',
      d: 'At the lower terminus, with clear alkaline water and the usual row of inns.' }
  ],
  when: 'Mid-April to end of November. Closed entirely in winter.',
  stay: 'A day, with a night at Unazuki.',
  move: 'Unazuki Onsen station, reached from Kurobe-Unazuki on the shinkansen.',
  eat: 'Station bento, and the inns at Unazuki.'
},

'TYM-amaharashi': {
  intro: [
    'From the Amaharashi coast you look across Toyama Bay at the Tateyama range rising three thousand metres directly out of the water. There are very few places in the world where mountains of that height stand that close to the sea with nothing in between.',
    'It needs clear cold air, which means winter, and it needs the snow on the peaks, which also means winter. On a grey summer day there is nothing to see at all.',
    'A pine-covered rock called Onnaiwa sits offshore and gives the photograph its foreground. Otomo no Yakamochi wrote about this view in the eighth century and his poems are on markers along the shore.'
  ],
  see: [
    { n: 'The view',
      d: 'November to April, in the morning, after a cold clear night. Check the forecast; most days do not deliver.' },
    { n: 'Onnaiwa',
      d: 'The pine-topped rock offshore. Low tide exposes more of the beach for the composition.' },
    { n: 'The Himi line',
      d: 'The railway runs along the shore and there is a train with large windows. Riding it is the easy way to see the coast.' },
    { n: 'Himi',
      d: 'A fishing port up the coast, famous for winter yellowtail.' }
  ],
  when: 'November to April, on clear mornings only.',
  stay: 'An hour or two.',
  move: 'Amaharashi station on the Himi line from Takaoka, then a short walk.',
  eat: 'Himi buri in winter, which is the best yellowtail in Japan.'
},

/* ===================== ISHIKAWA ===================== */
'ISK-kanazawa': {
  intro: [
    'Kanazawa was the second wealthiest domain in Japan after the shogunate itself, and the Maeda family spent that money on culture rather than armies, partly to look unthreatening. The result was craft: gold leaf, lacquer, silk dyeing, ceramics, and a Noh tradition that still has a wide amateur following.',
    'It was never bombed. That is the single most important fact about the city. The geisha districts, the samurai quarter and the clay-walled lanes are original rather than reconstructed, which is rare.',
    'Ninety-nine per cent of Japan’s gold leaf is made here, beaten to about one ten-thousandth of a millimetre. You can eat it on ice cream, which is a tourist thing, and you can also see it applied to lacquer, which is the real craft.'
  ],
  see: [
    { n: 'Kenrokuen',
      d: 'One of the three great gardens. See its own entry.' },
    { n: '21st Century Museum of Contemporary Art',
      d: 'A circular glass building by SANAA with a Leandro Erlich swimming pool you can walk underneath. One of the best museum buildings anywhere.' },
    { n: 'Higashi Chaya',
      d: 'The eastern geisha district, with wooden lattice fronts. Shima and Kaikaro are open; Shima is unaltered and the better of the two.' },
    { n: 'Nagamachi',
      d: 'The samurai quarter, with earthen walls wrapped in straw mats in winter to stop frost damage. The Nomura house has a small, intense garden.' },
    { n: 'Omicho Market',
      d: 'Three hundred years old, with crab in winter and a kaisendon that is the standard lunch.' },
    { n: 'Myoryuji',
      d: 'The ninja temple, with hidden stairs, trapdoors and a concealed lookout. No ninja were involved; it was a disguised fortification. Reservation required.' }
  ],
  when: 'Year round. Winter for crab and for the yukitsuri rope cones in the garden.',
  stay: 'Two nights.',
  move: 'Hokuriku Shinkansen, two and a half hours from Tokyo. The loop bus covers the sights.',
  eat: 'Jibuni, duck thickened with flour in a dashi broth, which is the local dish. Crab in winter, and some of the best sushi on the Sea of Japan.'
},

'ISK-kenrokuen': {
  intro: [
    'Kenrokuen means the garden of six qualities, after a Chinese theory that a perfect garden combines six attributes that normally conflict: spaciousness and seclusion, artifice and antiquity, water and views. Claiming all six is a considerable boast and the garden largely gets away with it.',
    'It took about a hundred and eighty years and five generations of the Maeda family. The fountain is powered entirely by the difference in water level from a pond uphill, with no pump, and is the oldest in Japan.',
    'In November, ropes are strung from poles over the pines in cones, the yukitsuri, to stop snow breaking the branches. They are a functional necessity that has become the emblem of the garden.'
  ],
  see: [
    { n: 'Kotojitoro lantern',
      d: 'The two-legged stone lantern by the pond, which is the single most reproduced image in Kanazawa.' },
    { n: 'Yukitsuri', t: 'November to March',
      d: 'The rope cones over the pines. Put up in a set order each November, which is reported in the local news.' },
    { n: 'Seisonkaku',
      d: 'A villa at the edge of the garden built in 1863 for a retired lord’s mother, with painted ceilings and Dutch glass. Often missed.' },
    { n: 'Early morning entry',
      d: 'The garden opens free before the official hours, around 4 or 5am in summer and 6 in winter. Almost nobody knows this.' },
    { n: 'Kanazawa Castle',
      d: 'Across the road, with reconstructed turrets and a long storehouse built with traditional joinery and no nails.' }
  ],
  when: 'Winter for yukitsuri and snow, late April for cherry, November for colour.',
  stay: 'Ninety minutes.',
  move: 'Loop bus from Kanazawa station, about fifteen minutes.',
  eat: 'Tea houses in the garden. Omicho Market is ten minutes away.'
},

'ISK-wajima': {
  intro: [
    'Wajima lacquer is made in up to a hundred and twenty separate steps, using a local diatomaceous earth mixed into the undercoat that makes it unusually durable. A good piece takes months and lasts generations.',
    'The morning market has run for about a thousand years and is one of the three oldest in Japan, with stalls mostly run by older women selling fish, vegetables and lacquer.',
    'On 1 January 2024 a magnitude 7.6 earthquake struck the Noto peninsula. Wajima was badly damaged and a fire destroyed a large part of the market district. Recovery is ongoing and uneven. Check what is open before travelling, and go if you can, because the town needs visitors.'
  ],
  see: [
    { n: 'The morning market',
      d: 'Operating in a reduced form since the earthquake. Check current status locally.' },
    { n: 'Wajima Lacquerware Museum',
      d: 'On the hundred and twenty steps and the history of the craft.' },
    { n: 'Shiroyone Senmaida',
      d: 'A thousand small rice terraces running down to the sea, lit with twenty-one thousand LEDs from October to March.' },
    { n: 'Sojiji Soin',
      d: 'A Soto Zen temple that was one of the two head temples of the sect until a fire in 1898.' },
    { n: 'Agehama salt',
      d: 'Seawater carried by hand onto sand beds and evaporated, the last place in Japan doing it this way.' }
  ],
  when: 'Check current conditions. The peninsula is recovering and some roads and facilities remain affected.',
  stay: 'A night.',
  move: 'Bus from Kanazawa, about two hours. Road conditions have changed since 2024; verify before setting out.',
  eat: 'Noto fish, and the local salt.'
},

'ISK-noto': {
  intro: [
    'The Noto peninsula sticks about a hundred kilometres into the Sea of Japan, with a rough west coast taking the weather and a sheltered east coast on Toyama Bay. It is agricultural, ageing and quiet, and it was designated a Globally Important Agricultural Heritage System in 2011 for its satoyama landscape.',
    'The 2024 earthquake caused severe damage across the peninsula, particularly at the northern end. Some areas have recovered, others have not. This entry describes what is there; conditions change and should be checked.',
    'Chirihama is the one beach in Japan you can legally drive a car along, eight kilometres of hard sand at the base of the peninsula.'
  ],
  see: [
    { n: 'Chirihama Nagisa Driveway',
      d: 'Eight kilometres of beach open to cars, buses and bicycles. Check tide and closure status.' },
    { n: 'Shiroyone Senmaida',
      d: 'The sea-facing rice terraces near Wajima, over a thousand tiny plots worked by hand.' },
    { n: 'Sosogi coast',
      d: 'Rock formations and a house where a fugitive noble lived in the twelfth century.' },
    { n: 'Notojima',
      d: 'An island bridged to the east coast with a good aquarium and quiet beaches.' },
    { n: 'The satoyama landscape',
      d: 'Terraces, charcoal kilns and coppiced woodland worked the same way for centuries.' }
  ],
  when: 'May to October. Verify access before travelling given ongoing recovery work.',
  stay: 'Two days with a car.',
  move: 'A car is necessary. Trains reach Wakura Onsen; beyond that it is buses and roads.',
  eat: 'Noto beef, oysters at Anamizu in winter, and ishiru, a fermented fish sauce used in local cooking.'
},

'ISK-yamanaka': {
  intro: [
    'Kaga Onsen is three separate hot spring villages in one valley: Yamanaka, Yamashiro and Katayamazu. They have been operating for over thirteen hundred years and each has a different character.',
    'Yamanaka sits above the Kakusenkei gorge and has a lacquer tradition using wood turned so thin it is almost translucent. Basho stayed here and rated the water second only to Arima.',
    'Yamashiro has a reconstruction of the Edo-period bathhouse, Kosoyu, built from the original drawings, with a tiled floor and a gallery above. It is the best public bath building in the region.'
  ],
  see: [
    { n: 'Kakusenkei gorge',
      d: 'A one-kilometre riverside walk at Yamanaka with a lacquered red bridge and a modern S-shaped one. Superb in autumn.' },
    { n: 'Kosoyu, Yamashiro',
      d: 'A faithful rebuild of the 1886 bathhouse with stained glass and a second-floor rest room where you sit in a yukata.' },
    { n: 'Kutani ware',
      d: 'Made in this area, with heavy overglaze colours in green, yellow and purple. Kilns and shops throughout.' },
    { n: 'Yamanaka lacquer',
      d: 'Wood turned on a lathe to extreme thinness before lacquering. Workshops demonstrate the turning.' },
    { n: 'Natadera',
      d: 'A temple built into caves in a cliff nearby, founded 717, with a moss garden and almost no visitors.' }
  ],
  when: 'Autumn for the gorge, winter for crab.',
  stay: 'A night.',
  move: 'Kaga Onsen station on the Hokuriku Shinkansen since 2024, then a bus to whichever village.',
  eat: 'Crab in winter, Kaga vegetables, and jibuni as in Kanazawa.'
},

'ISK-shirayama': {
  intro: [
    'Mount Haku is one of the three holy mountains of Japan with Fuji and Tateyama, and it has been climbed as a pilgrimage since 717. At 2,702 metres it holds snow into July and the alpine flowers that follow are the reason most people now go.',
    'The standard route from Bessho-Dedo is about six hours up. There is a hut near the summit, Murodo, which sleeps several hundred and must be booked, and the reason to use it is sunrise from the top.',
    'The mountain is the source of the Tedori river and the shrine at its base, Shirayama Hime, is the head of about two thousand branch shrines across Japan.'
  ],
  see: [
    { n: 'The climb to Murodo',
      d: 'Six hours from Bessho-Dedo, with the Kanko-Shindo route the standard. Book the hut; turning up without a reservation does not work.' },
    { n: 'Sunrise from the summit',
      d: 'Forty minutes above the hut. On a clear morning you see Fuji, a hundred and seventy kilometres away.' },
    { n: 'Alpine flowers', t: 'July and August',
      d: 'Around two hundred and fifty species, several named for the mountain.' },
    { n: 'Shirayama Hime Shrine',
      d: 'At the base, in cedar, the head of the Hakusan shrine network.' },
    { n: 'The hot springs',
      d: 'Several in the valley below, open when the mountain is not.' }
  ],
  when: 'July to early October. The road and huts close otherwise and the mountain is serious in snow.',
  stay: 'Two days.',
  move: 'Bus from Kanazawa to Bessho-Dedo in season. Private cars are restricted on peak days.',
  eat: 'Hut meals. Carry your own water above the treeline.'
},

/* ===================== FUKUI ===================== */
'FKI-eiheiji': {
  intro: [
    'Eiheiji was founded in 1244 by Dogen, who brought Soto Zen from China, and it is still a training monastery rather than a museum. Around a hundred and fifty monks live under a rule that Dogen wrote, including instructions on how to wash, how to eat and how to use the lavatory, all treated as practice.',
    'Seventy buildings are connected by covered wooden corridors climbing a hillside under cedars that are six hundred years old. The corridors are polished daily by trainees and you walk them in socks.',
    'You can stay overnight. That means a four-thirty start, zazen, the morning service and a silent breakfast of rice gruel. It is not a retreat with options; you do what the monks do.'
  ],
  see: [
    { n: 'The corridors',
      d: 'Walking between the halls under the cedars. Silence is expected and monks will pass you at speed without acknowledgement, which is correct.' },
    { n: 'The Sanshokaku ceiling',
      d: 'Two hundred and thirty paintings of flowers and birds by a group of artists in 1930, in the entrance hall.' },
    { n: 'Staying overnight',
      d: 'Book well ahead. Lights out early, up at four thirty, zazen before dawn. Phones off throughout.' },
    { n: 'The kitchen',
      d: 'Dogen wrote a treatise on the role of the cook as a spiritual practice, which is still the governing text here.' },
    { n: 'Winter',
      d: 'Snow on the roofs and the corridors, which is when the place is at its best and at its coldest.' }
  ],
  when: 'Year round. Winter is severe and beautiful.',
  stay: 'Two hours, or one night.',
  move: 'Bus from Fukui station, about thirty minutes.',
  eat: 'Shojin ryori at the monastery, and sesame tofu at the shops on the approach.'
},

'FKI-tojinbo': {
  intro: [
    'Tojinbo is a kilometre of columnar basalt cliffs dropping about twenty-five metres into the Sea of Japan. The hexagonal columns formed when andesite cooled slowly about twelve million years ago, and formations of this scale exist in only two or three other places in the world.',
    'There is no railing. You can walk to the edge and look straight down, which is exhilarating and is also why the place has a long association with suicide.',
    'A retired policeman named Yukio Shige has patrolled these cliffs since 2004 and has talked several hundred people out of jumping. He runs a cafe above them. That is worth knowing before you go.'
  ],
  see: [
    { n: 'The cliffs',
      d: 'Walk out onto the rock platform. There are no barriers and the wind is strong; stay well back of the edge.' },
    { n: 'The boat',
      d: 'Thirty minutes along the base of the cliffs, which is the only way to see the full height and the columnar structure properly.' },
    { n: 'Oshima',
      d: 'A small wooded island joined by a red bridge a short drive north, with a shrine and a rock-cut path.' },
    { n: 'Sunset',
      d: 'Straight into the Sea of Japan, which is the standard reason people come in the evening.' },
    { n: 'Maruoka Castle',
      d: 'Twenty minutes inland, one of the twelve original keeps and among the oldest, with stone roof tiles.' }
  ],
  when: 'Year round. Winter waves are enormous and the boats stop.',
  stay: 'Two hours.',
  move: 'Bus from Awara-Onsen or Fukui station, about forty minutes.',
  eat: 'Echizen crab in winter, which is the same species as Matsuba crab under a different regional name and is tagged at landing.'
},

'FKI-dinosaur-museum': {
  intro: [
    'About eighty per cent of the dinosaur fossils found in Japan have come from a quarry in the Katsuyama valley, and the museum built on the back of that is one of the better natural history museums in the world.',
    'The building is a dome by Kisho Kurokawa, and you descend into the main hall by a long escalator so the forty-four mounted skeletons appear gradually from above. Several are of species found nowhere else and named for the prefecture.',
    'You can also join the dig. The excavation site runs supervised sessions where visitors split shale and keep what they find, within reason.'
  ],
  see: [
    { n: 'The main hall',
      d: 'Forty-four skeletons, about ten of them real rather than casts. The Fukuiraptor and Fukuisaurus are local species.' },
    { n: 'The descent',
      d: 'The escalator into the dome is a deliberate piece of theatre and it works.' },
    { n: 'The dig experience',
      d: 'At the Katsuyama Dinosaur Forest site, April to October, booked ahead. Real shale from the formation.' },
    { n: 'The 2023 extension',
      d: 'A new wing with a glass-walled lab where you can watch preparation work in progress.' },
    { n: 'Heisenji Hakusan Shrine',
      d: 'Nearby, a moss-covered temple ruin in a cedar forest that was once a complex of several thousand buildings. Almost unvisited and remarkable.' }
  ],
  when: 'Year round. Book tickets online; it sells out on holidays.',
  stay: 'Three hours.',
  move: 'Echizen Railway to Katsuyama then a bus, about ninety minutes from Fukui.',
  eat: 'Katsuyama has soba. The museum cafe does a dinosaur-themed curry.'
},

'FKI-kumagawa': {
  intro: [
    'Obama was the port that supplied Kyoto and Nara with sea fish, and the road inland is still called the Saba Kaido, the mackerel highway. Fish was salted here and carried on foot, arriving in Kyoto in about a day and a half, by which point the salt had cured it to exactly the right point.',
    'That is the origin of saba-zushi, pressed mackerel sushi, which is a Kyoto dish that depends entirely on this town.',
    'Kumagawa-juku, inland on the same road, is a preserved post town with a water channel running along the street and about a hundred and forty buildings from the Edo and Meiji periods.'
  ],
  see: [
    { n: 'Kumagawa-juku',
      d: 'A single street with a stone-lined channel, lattice fronts and almost no visitors. Several houses open.' },
    { n: 'Obama’s temples',
      d: 'The area has an unusual concentration of old Buddhist sculpture, including Myotsuji with a thirteenth-century pagoda in a wooded valley.' },
    { n: 'The Saba Kaido',
      d: 'Marked sections of the old road are walkable. The full route to Kyoto is about seventy kilometres.' },
    { n: 'Mikata Five Lakes',
      d: 'Up the coast, five lakes of different salinity and therefore different colours, with a rainbow road climbing between them.' },
    { n: 'Chopsticks',
      d: 'Obama makes about eighty per cent of Japan’s lacquered chopsticks. There are workshops where you can grind your own pattern.' }
  ],
  when: 'Year round. Winter for mackerel and crab.',
  stay: 'Half a day.',
  move: 'Obama line from Tsuruga. A car helps for Kumagawa and the lakes.',
  eat: 'Saba-zushi, grilled mackerel, and heshiko, mackerel pickled in rice bran for a year.'
},

'FKI-echizen-washi': {
  intro: [
    'Echizen has made paper for about fifteen hundred years, and the legend is that a goddess appeared in the river and taught the technique to the villagers. There is a shrine to her, which is the only shrine to a paper deity in Japan.',
    'The paper is used for currency, for conservation work on Western manuscripts, and by artists who want a sheet two metres across with no join. A handful of workshops still make it entirely by hand.',
    'Echizen ware, one of the six ancient kilns, is produced in the same district. It is unglazed stoneware fired long enough for the ash to glaze it naturally.'
  ],
  see: [
    { n: 'Udatsu Paper and Craft Museum',
      d: 'A working workshop where you watch sheets formed and can make your own.' },
    { n: 'Okamoto Otaki Shrine',
      d: 'The paper goddess shrine, with an extraordinarily elaborate carved roof for a small building in a small village.' },
    { n: 'Echizen pottery village',
      d: 'Kilns and a museum. The ware is rough, warm and unglazed.' },
    { n: 'Echizen knives',
      d: 'Seven hundred years of blade making in the same district, with workshops open.' },
    { n: 'The Echizen coast',
      d: 'Cliffs and crab ports twenty minutes west.' }
  ],
  when: 'Year round.',
  stay: 'Half a day.',
  move: 'Takefu or Sabae stations, then a bus or taxi. A car is easier.',
  eat: 'Echizen soba, eaten cold with grated daikon, which is the local style.'
},

/* ===================== YAMANASHI ===================== */
'YMN-fuji-five-lakes': {
  intro: [
    'Five lakes sit along the northern base of Fuji, formed when lava flows dammed the valleys. Kawaguchiko is the accessible one with the hotels; Motosuko is the one on the back of the thousand yen note; Saiko, Shojiko and Yamanakako are quieter in descending order of usefulness.',
    'This is where the reflection photographs are taken. You need a still morning, which generally means early and generally means autumn or winter, and you need Fuji to be out, which it is on fewer days than people expect.',
    'There is also a forest here, Aokigahara, which grew on an 864 lava flow and which has a reputation that is worth being honest about. It is a genuinely strange ecosystem, the compass does behave oddly because of the magnetic rock, and it has a long association with suicide. There are signs at the entrances.'
  ],
  see: [
    { n: 'Kawaguchiko north shore at dawn',
      d: 'The reflection spot. Autumn and winter mornings, before the wind picks up. The maple corridor on the north shore is lit in November.' },
    { n: 'The Mount Tenjo ropeway',
      d: 'Up from Kawaguchiko for the lake and the mountain in one frame.' },
    { n: 'Oshino Hakkai',
      d: 'Eight spring-fed ponds between Kawaguchiko and Yamanakako, fed by Fuji snowmelt filtered through lava for decades. Extremely clear and extremely crowded.' },
    { n: 'Motosuko',
      d: 'The thousand yen note view, from the northwest shore. Also the deepest of the five and the least developed.' },
    { n: 'Narusawa Ice Cave and Fugaku Wind Cave',
      d: 'Lava tubes from the 864 eruption that hold ice year round, used to store silkworm eggs before refrigeration.' }
  ],
  when: 'November to February for clear air and reflections. Shibazakura at the Fuji festival in late April and May.',
  stay: 'A night, which doubles your chance of catching the mountain out.',
  move: 'Fujikyu line from Otsuki, or direct buses from Shinjuku in about two hours. A car makes the lakes much easier.',
  eat: 'Hoto, a thick flat noodle stewed with pumpkin and vegetables in miso, which is the Yamanashi dish and is a meal in a cauldron.'
},

'YMN-chureito': {
  intro: [
    'The Chureito Pagoda is a 1963 war memorial, which surprises people who assume it is ancient. It was built to commemorate the dead of several wars, and the view it gives, pagoda in front, Fuji behind, cherry trees in between, is probably the single most reproduced image of Japan.',
    'There are about four hundred steps up from the car park. In April the queue for the viewing platform can run an hour and the platform itself is a managed shuffle.',
    'It is worth saying that the photograph compresses the distance considerably. Fuji is seventeen kilometres away and a long lens does most of the work.'
  ],
  see: [
    { n: 'The classic view', t: 'early to mid-April',
      d: 'Blossom, pagoda and mountain. The platform is timed and policed in season. Go at sunrise and you will have it.' },
    { n: 'Autumn',
      d: 'Mid-November, with red maple instead of blossom. Fewer people and clearer air.' },
    { n: 'The steps',
      d: 'Four hundred, with a switchback path as an alternative. Not difficult, just relentless.' },
    { n: 'Arakura Sengen Shrine',
      d: 'At the base, older than the pagoda and quieter.' },
    { n: 'Shimoyoshida',
      d: 'The town below, with a retro shopping street that looks straight at Fuji down its length.' }
  ],
  when: 'Early April for blossom, mid-November for maple, winter for the clearest mountain.',
  stay: 'Two hours.',
  move: 'Shimoyoshida station on the Fujikyu line, then a ten-minute walk to the steps.',
  eat: 'Nothing on site. Shimoyoshida has a few places.'
},

'YMN-koshu-wine': {
  intro: [
    'Japan has been making wine commercially since 1877, and it started in this valley. Two young men were sent to France to learn and came back to Katsunuma, where the first winery opened.',
    'The grape is Koshu, pink-skinned, grown in Japan for at least eight hundred years and almost nowhere else. It makes a light, low-alcohol white with a distinct citrus edge that works with Japanese food in a way imported wine often does not.',
    'There are about thirty wineries within walking or cycling distance of Katsunuma-Budokyo station, several of which are family operations in converted houses.'
  ],
  see: [
    { n: 'Winery tasting',
      d: 'Most charge a small fee for several pours. Chateau Mercian and Grace are the larger ones; the small producers are more interesting.' },
    { n: 'Budo no Oka',
      d: 'A municipal hilltop complex with a cellar holding about two hundred local wines, tasted by buying a tasting cup. Also a bath with a view over the vineyards.' },
    { n: 'Cycling the valley',
      d: 'Flat, with vineyards trellised overhead in the Japanese pergola style, which is different from European rows and is done for humidity.' },
    { n: 'Harvest', t: 'September and October',
      d: 'Grapes for eating as well as wine. Yamanashi grows most of Japan’s table grapes and the Shine Muscat here is extraordinary.' },
    { n: 'Daizenji',
      d: 'A temple with a Buddha holding a bunch of grapes, from the eighth century, which is where the local grape legend starts.' }
  ],
  when: 'September and October for harvest. Spring for blossom in the orchards.',
  stay: 'A day.',
  move: 'Katsunuma-Budokyo station on the Chuo line, about ninety minutes from Shinjuku.',
  eat: 'Hoto, and the grapes and peaches in season, which are the best in Japan and priced accordingly.'
},

'YMN-shosenkyo': {
  intro: [
    'Shosenkyo is a granite gorge north of Kofu with a path along the bottom, usually ranked the most beautiful gorge in Japan by whichever body ranks these things. It is about four kilometres from the lower car park to the waterfall at the top.',
    'The rock formations have names, which is normal, and the one called Kakuenbo is a hundred and eighty metre column that is genuinely striking.',
    'Senga Falls at the top is thirty metres. Above that there is a ropeway to a summit with Fuji in view on a clear day.'
  ],
  see: [
    { n: 'The gorge walk',
      d: 'Four kilometres gently uphill beside the river. The upper half is the better part; a bus runs to the midpoint if you want to skip the bottom.' },
    { n: 'Senga Falls',
      d: 'Thirty metres at the head of the gorge, with the path ending at a viewing area.' },
    { n: 'Autumn', t: 'early to mid-November',
      d: 'This is reckoned one of the best autumn gorges near Tokyo and the road jams accordingly.' },
    { n: 'The ropeway',
      d: 'From the top of the gorge to Panorama-dai, with Fuji and the Southern Alps in clear weather.' },
    { n: 'Crystal',
      d: 'The area was a major crystal mining district and the shops at the top sell polished stone, with a museum explaining the geology.' }
  ],
  when: 'Early to mid-November for colour. Spring and summer are green and quiet.',
  stay: 'Half a day.',
  move: 'Bus from Kofu station, about thirty minutes.',
  eat: 'Houtou at the top of the gorge, and the usual grilled fish stalls.'
},

'YMN-minobu': {
  intro: [
    'Kuon-ji has been the head temple of the Nichiren sect since 1281, when Nichiren himself settled on this mountain after years of exile and persecution for insisting that every other school of Buddhism was wrong.',
    'The approach is two hundred and eighty-seven steps in a single straight flight called the Bodai-tei, which rises almost vertically up the hillside. It is harder than the number suggests and there is a lift beside it for anyone who needs one.',
    'Two weeping cherries in the grounds are about four hundred years old and are among the most celebrated in the country. They flower in very late March.'
  ],
  see: [
    { n: 'The Bodai-tei steps',
      d: 'Two hundred and eighty-seven in one flight, divided into sections representing stages of enlightenment. The lift is not cheating.' },
    { n: 'The weeping cherries', t: 'late March',
      d: 'Four hundred years old, lit at night in season, and the reason the temple is busiest in spring.' },
    { n: 'The ropeway to Mount Minobu',
      d: 'Up to thirteen hundred metres with Fuji to the east and the Southern Alps west.' },
    { n: 'Shukubo lodging',
      d: 'Several temples take guests, with a morning service at half past five.' },
    { n: 'Minobu town',
      d: 'A single street of pilgrim shops below the temple, selling yuba and Nichiren-related goods.' }
  ],
  when: 'Late March for the cherries. Autumn for colour.',
  stay: 'Half a day, or a night at a temple.',
  move: 'Minobu station on the Minobu line, then a bus of about fifteen minutes.',
  eat: 'Yuba, which Minobu produces in quantity, and Minobu manju.'
},

/* ===================== NAGANO ===================== */
'NGN-matsumoto': {
  intro: [
    'Matsumoto Castle is one of twelve original keeps left in Japan and the oldest of them, finished around 1594. It is a hirajiro, a castle on flat ground rather than a hill, which means the defence was the water: a triple moat system, most of which is gone.',
    'It is black, which is unusual. The boards are lacquered and have to be recoated every few years. The contrast with Himeji’s white plaster is a standing comparison in Japan and people have firm views.',
    'There is a moon-viewing balcony on the side, added in the 1630s when the country was at peace and the castle had become a residence rather than a fortress. A defensive building with a veranda for poetry says a great deal about the period.'
  ],
  see: [
    { n: 'The keep',
      d: 'Six floors, with a hidden third floor that has no windows, used to hide soldiers. The stairs are at up to sixty-one degrees and there are no handrails on some flights.' },
    { n: 'The moon-viewing balcony',
      d: 'Vermilion railings on the east side, which looks completely wrong on a castle and is the most interesting thing about the building.' },
    { n: 'The Alps behind',
      d: 'On a clear day the Northern Alps stand behind the black keep. Winter mornings are best.' },
    { n: 'Nakamachi and Nawate streets',
      d: 'Storehouse-fronted shopping streets in the old town, with a frog-themed lane along the river.' },
    { n: 'Matsumoto City Museum of Art',
      d: 'Yayoi Kusama was born here, and the museum holds a serious collection plus her polka-dotted vending machines outside.' }
  ],
  when: 'Winter for the Alps behind the keep. Late April for blossom around the moat.',
  stay: 'A night, or as a base for Kamikochi.',
  move: 'Azusa limited express from Shinjuku, about two and a half hours. The castle is fifteen minutes on foot from the station.',
  eat: 'Soba, which Nagano does better than anywhere. Also basashi, raw horse, which is a regional speciality and is better than most people expect.'
},

'NGN-kamikochi': {
  intro: [
    'Kamikochi is a flat-bottomed valley at fifteen hundred metres in the Northern Alps, with the Azusa river running through it and three-thousand-metre peaks on both sides. Private cars have been banned since 1975 and you arrive by bus or taxi through a tunnel.',
    'It was effectively opened to the world by Walter Weston, a British missionary and mountaineer who climbed here in the 1890s and wrote a book that gave the range its name. There is a relief of him on a rock by the river.',
    'The valley closes from mid-November to mid-April. In that time nobody is there at all except a few winter climbers who walk in through the tunnel.'
  ],
  see: [
    { n: 'Kappabashi to Myojin',
      d: 'An hour each way along the river, flat, with the Hotaka range ahead. The single best short walk in the Japanese Alps.' },
    { n: 'Taisho Pond',
      d: 'Formed when Mount Yake erupted in 1915 and dammed the river, with dead trees still standing in the water and Yake smoking behind. Best at dawn with mist.' },
    { n: 'Myojin Pond',
      d: 'A small clear pond in a shrine precinct, with a small fee, almost always still.' },
    { n: 'Climbing from here',
      d: 'Yarigatake and Hotakadake both start here. These are serious multi-day routes with huts, not day walks.' },
    { n: 'Autumn', t: 'mid to late October',
      d: 'Larch turning gold against the rock. The valley is full and the buses queue.' }
  ],
  when: 'Mid-April to mid-November only. October for colour, July and August for the high routes.',
  stay: 'A day, or a night at one of the lodges to get the valley at dawn.',
  move: 'Bus from Matsumoto via Shinshimashima, or from Takayama via Hirayu. Private cars stop at Sawando or Hirayu.',
  eat: 'Lodge restaurants. Carry water; there are no shops beyond Kappabashi.'
},

'NGN-jigokudani': {
  intro: [
    'In 1963 a Japanese macaque watched people bathing in a hot spring at a nearby inn and got in. Others followed. The park was built in 1964 partly to keep them out of the inn, and they have bathed here every winter since.',
    'They are wild. They come down from the forest when it is cold and go back up when it is not, which means the bathing is a winter phenomenon and in summer you will see monkeys standing around rather than in the water.',
    'The walk in is about thirty minutes through forest on a path that is icy in season. The monkeys ignore people entirely, which is the point: this is not a zoo and the lack of interest is reassuring.'
  ],
  see: [
    { n: 'The bathing pool', t: 'December to March',
      d: 'Peak is January and February. On a mild day they may not bother getting in at all.' },
    { n: 'The walk in',
      d: 'Thirty minutes through cedar along a valley. Crampons or grips are sold at the entrance and are not optional in deep winter.' },
    { n: 'Shibu Onsen',
      d: 'The village below, with nine public baths that guests at the inns can use with a key, walking between them in geta.' },
    { n: 'The rules',
      d: 'Do not touch, do not feed, do not make eye contact, do not carry food in your hands. They are wild animals and they do bite.' },
    { n: 'Yudanaka',
      d: 'The larger onsen town at the bottom of the valley, with the train station.' }
  ],
  when: 'January and February. Open year round but the bathing is seasonal.',
  stay: 'Half a day, with a night at Shibu.',
  move: 'Nagano Dentetsu line to Yudanaka, then a bus to Kanbayashi and a thirty-minute walk.',
  eat: 'Inn food at Shibu. There is nothing at the park.'
},

'NGN-zenkoji': {
  intro: [
    'Zenkoji was founded in the seventh century, which is before Buddhism in Japan split into sects. It therefore belongs to none of them and admits everybody, which is unusual and is the reason it has been a mass pilgrimage destination for over a thousand years.',
    'The main image is a hibutsu, a hidden Buddha, which has not been shown to anyone since 654. A copy is displayed every six years. Whether anything is in the box at all is a question people ask and nobody can answer.',
    'Underneath the main hall is a pitch-dark corridor, the Okaidan. You feel along the wall in total darkness looking for a metal key, and touching it is said to guarantee enlightenment. It is genuinely disorienting.'
  ],
  see: [
    { n: 'The Okaidan',
      d: 'A dark passage under the altar, included in the ticket. Complete darkness, one hand on the right-hand wall, and the key is about two thirds of the way along.' },
    { n: 'The morning service', t: 'from sunrise',
      d: 'The head priest walks the approach and touches the heads of kneeling worshippers with a rosary. Anyone can kneel. Starts at dawn and the time shifts through the year.' },
    { n: 'The approach',
      d: 'A stone-paved street of pilgrim inns and shops leading to the gate, with the Niomon and the Sanmon gate you can climb.' },
    { n: 'Gokaicho', t: 'every six years',
      d: 'The copy is shown and a pillar connected to it by cord is touched by millions. Next occurrence is worth checking.' },
    { n: 'Togakushi',
      d: 'An hour away, a shrine complex at the base of a cliff reached through a cedar avenue, and very good soba.' }
  ],
  when: 'Year round. The morning service is the best reason to stay overnight.',
  stay: 'Half a day, or a night at a shukubo.',
  move: 'Hokuriku Shinkansen to Nagano, then a bus or a twenty-five minute walk up the approach.',
  eat: 'Oyaki, buckwheat dumplings stuffed with vegetables, sold all along the approach. Shinshu soba.'
},

'NGN-nakasendo': {
  intro: [
    'The Nakasendo was the inland highway between Edo and Kyoto, with sixty-nine post towns along it. Two of them, Tsumago and Magome, are eight kilometres apart over a pass in the Kiso valley, and the walk between them is the best-preserved stretch of the whole route.',
    'Tsumago was restored from 1968 under an agreement that residents would not sell, rent or demolish any building. Overhead wires were buried, television aerials hidden and cars excluded during the day. It is a village where people live rather than a museum, which is the difference.',
    'There is a luggage forwarding service between the two towns, so you can walk with a daypack. Bear bells hang along the path and you are expected to ring them.'
  ],
  see: [
    { n: 'The walk',
      d: 'Eight kilometres, about three hours, Magome to Tsumago being the easier direction because more of it is downhill. Partly on original stone paving.' },
    { n: 'Tsumago',
      d: 'Walk the street early or late when the day visitors are gone. The Waki-honjin is open and shows how the inn system worked.' },
    { n: 'Odaki and Medaki falls',
      d: 'A short detour from the trail, two waterfalls in a side valley.' },
    { n: 'Staying in a minshuku',
      d: 'Both towns have family-run inns in old buildings. Dinner is river fish grilled on skewers round a hearth.' },
    { n: 'Narai',
      d: 'Further north on the same highway, a kilometre-long post town that is longer and less visited than either of these.' }
  ],
  when: 'Spring and autumn. Summer is hot and humid; winter has snow on the pass.',
  stay: 'A night in Tsumago.',
  move: 'Nakatsugawa for Magome, Nagiso for Tsumago, both on the Chuo line, with buses to the towns.',
  eat: 'Gohei mochi, pounded rice on a skewer with walnut miso, grilled. Soba, and river char.'
},

'NGN-hakuba': {
  intro: [
    'Hakuba hosted the downhill events of the 1998 Winter Olympics, and the ski jumps from those games are still there and still used. Ten ski areas run along the valley under peaks of nearly three thousand metres.',
    'The snow is heavy and frequent, coming off the Sea of Japan, and the terrain is steeper than Niseko. Happo-one has the Olympic downhill; Cortina gets the deepest powder; Tsugaike has the gentlest learning terrain.',
    'In summer it becomes the main trailhead for the Northern Alps, with a gondola and lift system that puts you at eighteen hundred metres before you start walking.'
  ],
  see: [
    { n: 'Happo-one',
      d: 'The main area, with the Olympic course and a ridge walk in summer to Happo Pond, which reflects the Hakuba three peaks.' },
    { n: 'The ski jumps',
      d: 'You can go up the tower of the large hill. Standing at the top of an Olympic ski jump is a vertiginous and clarifying experience.' },
    { n: 'Tsugaike Nature Park',
      d: 'A high marsh above the gondola, boardwalked, with alpine flowers from July.' },
    { n: 'Backcountry',
      d: 'Guided tours into the Alps. Avalanche terrain, and the operators here are properly qualified.' },
    { n: 'Obinata and the valley onsen',
      d: 'Several, with alkaline water and views of the range.' }
  ],
  when: 'January and February for snow, July to September for walking.',
  stay: 'A week in winter, two or three days in summer.',
  move: 'Bus from Nagano station, about an hour, or the Oito line.',
  eat: 'A lot of international food in winter. Soba and local sake in the villages.'
},

'NGN-karuizawa': {
  intro: [
    'A Canadian missionary named Alexander Croft Shaw started spending summers here in 1886 because the altitude kept it cool, and Tokyo society followed. It has been the most fashionable summer address in Japan ever since, and the current emperor met the empress on a tennis court here.',
    'The shinkansen put it an hour from Tokyo in 1997, which changed the character considerably. There are now outlet malls by the station, which is not what Shaw had in mind.',
    'The old part, up the hill at Kyu-Karuizawa, still has the larch woods, the summer houses and a stone church that Shaw built. Cycling between them is the right way to spend a day.'
  ],
  see: [
    { n: 'Kyu-Karuizawa Ginza and the villa district',
      d: 'The old main street, then cycle into the larch woods where the summer houses are. Many are a hundred years old.' },
    { n: 'Shiraito Falls',
      d: 'A seventy-metre curtain of groundwater seeping out of a cliff face rather than a river falling, so it runs constantly. Lit in autumn.' },
    { n: 'Hoshino Area and Harunire Terrace',
      d: 'A wooded development with the Stone Church, an organic building by Kendrick Kellogg, and a good onsen.' },
    { n: 'Mount Asama',
      d: 'An active volcano above the town, which erupted catastrophically in 1783 and killed about fifteen hundred people. The lava field at Onioshidashi is a strange landscape.' },
    { n: 'Cycling',
      d: 'Flat, shaded, with hire everywhere. The best way to cover the town.' }
  ],
  when: 'Summer is the traditional season and the busiest. Autumn is better. Winter is very cold and very quiet.',
  stay: 'A night.',
  move: 'Hokuriku Shinkansen, just over an hour from Tokyo.',
  eat: 'Western food, which is a legacy of the foreign residents. Also jam, which Karuizawa has made since the Meiji period.'
},

'NGN-norikura': {
  intro: [
    'A bus climbs to two thousand seven hundred and two metres at Norikura Tatamidaira, which is the highest road in Japan. From there the summit of Norikura is an hour and a half of walking on a well-made path, which makes a three-thousand-metre peak available to almost anyone.',
    'Private cars are banned on the road, which keeps the number of people up there manageable. Cyclists are permitted and the climb is a famous one.',
    'Shirahone Onsen, below on the Matsumoto side, has milky white water high in hydrogen sulphide and calcium, said to cure three ailments if you bathe three days running.'
  ],
  see: [
    { n: 'Tatamidaira and the summit',
      d: 'The bus to the top, then an hour and a half to Kengamine at 3,026 metres. Alpine plants in July and August, snow patches into summer.' },
    { n: 'The road by bicycle',
      d: 'Twenty kilometres and about fifteen hundred metres of climb. There is an annual hill climb race.' },
    { n: 'Shirahone Onsen',
      d: 'Milky, sulphurous, with a public bath and several inns. The water turns white on contact with air.' },
    { n: 'Norikura Kogen',
      d: 'The plateau below, with waterfalls, a marsh and good cross-country skiing in winter.' },
    { n: 'Autumn',
      d: 'Late September at the top, which is among the earliest colour in Honshu.' }
  ],
  when: 'The road opens roughly July to October. Shirahone is year round.',
  stay: 'A day, with a night at Shirahone.',
  move: 'Bus from Matsumoto via Norikura Kogen, or from Takayama on the Gifu side.',
  eat: 'Shirahone inns cook rice in the spring water, which turns it grey and is a local speciality.'
},

'NGN-suwa': {
  intro: [
    'When Lake Suwa freezes hard and then expands, the ice cracks and buckles upward in a ridge running across the lake. It is called the omiwatari, the god’s crossing, and it has been recorded by the priests of Suwa Shrine almost every year since 1443.',
    'That record is now one of the longest continuous phenological datasets in the world and it is used as climate evidence. The lake froze most years until the 1950s. It now freezes rarely, and the ridge has formed only a handful of times this century.',
    'Suwa Taisha itself is four separate shrine complexes around the lake, and every six years it hauls sixteen enormous fir trunks down a mountainside with men riding them. People die at this festival with some regularity.'
  ],
  see: [
    { n: 'Suwa Taisha',
      d: 'Four sites: Kamisha Honmiya and Maemiya on the south, Shimosha Harumiya and Akimiya on the north. The Honmiya has no main hall because the mountain behind is the deity.' },
    { n: 'Onbashira', t: 'every six years, next in 2028',
      d: 'Fir trunks ridden down a steep slope by men holding on. Injuries and deaths occur. One of the oldest and most dangerous festivals in Japan.' },
    { n: 'The omiwatari',
      d: 'If the lake freezes. Increasingly rare; the shrine still inspects and records every winter.' },
    { n: 'Kami-Suwa Onsen',
      d: 'Hot springs on the lake shore, including a footbath at the station platform.' },
    { n: 'The Suwa fireworks', t: 'mid-August',
      d: 'Forty thousand shells over the lake, which the surrounding mountains amplify. One of the largest displays in Japan.' }
  ],
  when: 'August for fireworks, winter for the lake. Onbashira years are worth planning around.',
  stay: 'A night.',
  move: 'Azusa limited express from Shinjuku to Kami-Suwa, about two and a half hours.',
  eat: 'Lake smelt, and Shinshu miso, which Nagano produces more of than any other prefecture.'
},

'NGN-obuse': {
  intro: [
    'Hokusai came to Obuse in his eighties at the invitation of a wealthy merchant, and spent his last years here painting. He produced ceiling panels for two festival floats and a phoenix for a temple ceiling that is twenty-one square metres and took him a year.',
    'He was eighty-nine when he died and said he regretted not having another decade, because then he might have become a real painter.',
    'The town is small, walkable in an afternoon, and has made chestnuts its other identity. Chestnut rice, chestnut sweets, chestnut everything, from trees planted here in the fourteenth century.'
  ],
  see: [
    { n: 'Hokusai Museum',
      d: 'The two float ceilings are here, and they are extraordinary: a dragon and a phoenix on one, waves on the other, painted at eighty-five.' },
    { n: 'Ganshoin',
      d: 'The temple with the phoenix ceiling, painted at eighty-nine. You lie on your back on the tatami to look at it. Issa wrote his frog haiku in the garden.' },
    { n: 'Chestnuts',
      d: 'Obusedo and Chikufudo for sweets. Kuri okowa, chestnut sticky rice, in autumn.' },
    { n: 'Masuichi-Ichimura sake brewery',
      d: 'A brewery with a restaurant and a shop designed by John Morford, who also did the Park Hyatt Tokyo. Unexpected and good.' },
    { n: 'The open gardens',
      d: 'Private gardens in the town that residents leave open to visitors, which is a town-wide agreement and very pleasant.' }
  ],
  when: 'September and October for chestnuts. Spring for the gardens.',
  stay: 'Half a day.',
  move: 'Nagano Dentetsu line from Nagano, about thirty minutes. On the way to Jigokudani.',
  eat: 'Chestnuts in every form, and soba.'
},

/* ===================== GIFU ===================== */
'GIF-shirakawa-go': {
  intro: [
    'Gassho-zukuri means praying hands, after the steep roof pitch, which is about sixty degrees. The angle sheds snow that can reach four metres and the thatch is a metre thick. Inside, the roof space gave three or four floors used for silkworm rearing, which was the cash crop.',
    'Rethatching one roof takes a village. The system is called yui, mutual aid, and two hundred people work for a few days on a roof that then lasts thirty to forty years. It still operates.',
    'Ogimachi, the main village, has about sixty gassho houses. It receives well over a million visitors a year, which for a village of that size is an enormous pressure, and the winter light-up evenings are now ticketed and balloted.'
  ],
  see: [
    { n: 'Shiroyama viewpoint',
      d: 'Above the village, with the whole valley laid out. A shuttle bus runs up, or it is a fifteen-minute climb.' },
    { n: 'Wada House',
      d: 'The largest in the village, open, with the roof space showing the silkworm floors and the rope-and-beam construction with no nails.' },
    { n: 'The winter light-up', t: 'January and February, set dates only',
      d: 'Houses lit in snow. Now requires an advance ballot for parking and tours. Do not turn up hoping.' },
    { n: 'Staying overnight',
      d: 'Several houses take guests. The village after the last bus leaves is a different place entirely.' },
    { n: 'Gokayama',
      d: 'Forty minutes north, the same listing with a tenth of the visitors.' }
  ],
  when: 'Winter for snow. Autumn for colour. Summer is green and extremely busy.',
  stay: 'A night, which is the only way to see it properly.',
  move: 'Bus from Takayama or Kanazawa, about an hour and a quarter each way. Book in advance in peak season.',
  eat: 'Hoba miso, miso grilled on a magnolia leaf over charcoal. River fish and mountain vegetables.'
},

'GIF-takayama': {
  intro: [
    'Takayama was administered directly by the shogunate rather than by a daimyo, because the mountains around it produced timber the government wanted. The administrative office, the Jinya, is the only one of its kind left standing in Japan.',
    'That direct rule also meant the merchants here grew wealthy without a lord taking a cut, which is why the old town is three streets of dark wooden merchant houses with deep eaves and latticed fronts.',
    'The carpenters of Hida were conscripted to Nara and Kyoto for centuries to build temples, and their descendants built the festival floats here, which have mechanical puppets operated by rods and strings from inside.'
  ],
  see: [
    { n: 'Sanmachi Suji',
      d: 'Three preserved streets with sake breweries marked by cedar balls over the door. Early morning before the coaches.' },
    { n: 'Takayama Jinya',
      d: 'The government office, with an interrogation room, a rice storehouse and the original documents. The only surviving example.' },
    { n: 'The festival', t: '14 to 15 April and 9 to 10 October',
      d: 'Twelve floats with karakuri puppets, hauled through the streets, lit with lanterns at night. One of the three most beautiful festivals in Japan.' },
    { n: 'The float museums',
      d: 'Several floats are displayed year round at the Yatai Kaikan, which is the answer outside festival dates.' },
    { n: 'The morning markets',
      d: 'Two, by the river and in front of the Jinya, from seven. Pickles, vegetables and sarubobo dolls.' },
    { n: 'Hida Folk Village',
      d: 'Thirty relocated buildings including gassho houses, on a hillside with a pond. Better than it sounds and much quieter than Shirakawa-go.' }
  ],
  when: 'April and October for the festivals, which fill every room for fifty kilometres. Winter for snow and quiet.',
  stay: 'Two nights.',
  move: 'Limited express from Nagoya, about two and a half hours, through the Hida gorge, which is a good journey in itself.',
  eat: 'Hida beef, which is as good as Kobe and cheaper here. Hoba miso, mitarashi dango grilled on the street, and very good sake.'
},

'GIF-gero': {
  intro: [
    'A Confucian scholar named Hayashi Razan wrote in the seventeenth century that the three best hot springs in Japan were Arima, Kusatsu and Gero. Four hundred years later that ranking is still quoted on every sign in this town.',
    'The water is alkaline, around pH 9, which makes it feel slippery and leaves skin noticeably smooth. It comes out at around eighty-four degrees.',
    'The town itself is a river valley with inns on both banks. There is a free open-air bath on the riverbed, Funsenchi, which is mixed and completely exposed, and swimwear is now required where it once was not.'
  ],
  see: [
    { n: 'Funsenchi',
      d: 'The riverbed bath, free, in full view of the bridge. Swimwear required. A strange and cheerful thing to do.' },
    { n: 'The yumeguri pass',
      d: 'A wooden tag that gets you into three of about twenty participating inns. Buy it at the tourist office.' },
    { n: 'Gero Onsen Gassho Village',
      d: 'Ten relocated gassho houses from Shirakawa-go, saved when a dam flooded their valley.' },
    { n: 'The footbaths',
      d: 'Several free ones around town, which is how most people spend the afternoon.' },
    { n: 'Onsenji',
      d: 'A temple up a hundred and seventy-three steps, with a legend about a white heron that revealed the spring.' }
  ],
  when: 'Year round. Winter is best, with fireworks on winter Saturdays.',
  stay: 'A night.',
  move: 'On the Takayama line between Nagoya and Takayama, which makes it an easy stop.',
  eat: 'Inn food. Keichan, chicken grilled with miso on an iron plate, is the local dish.'
},

'GIF-gujo-hachiman': {
  intro: [
    'Gujo Hachiman has water running through open channels along almost every street, and the town is obsessive about it. There are rules about what you may wash where: the top of a channel is for drinking, the next section for vegetables, then for dishes, then for other washing. Carp in the channels eat the scraps.',
    'The dance festival, Gujo Odori, runs for thirty-one nights between July and September, which makes it the longest in Japan. On four nights over Obon it runs from eight in the evening until dawn.',
    'Anybody can join. There are ten dances, the steps are simple, and the locals will show you. That is the whole structure of it: a circle in the street, a float with musicians in the middle, and no spectators.'
  ],
  see: [
    { n: 'Gujo Odori', t: '31 nights, July to September',
      d: 'The all-night sessions around mid-August are the ones. Wear a yukata and geta; the sound of the clogs is part of the music.' },
    { n: 'Sogi-sui',
      d: 'A spring in the town designated one of Japan’s hundred best waters, with the tiered washing system clearly laid out.' },
    { n: 'Gujo Hachiman Castle',
      d: 'A 1933 wooden reconstruction on a hill, which is one of the oldest wooden rebuilds in Japan and is now itself historic. Good in autumn mist.' },
    { n: 'Food samples',
      d: 'The town makes most of Japan’s plastic food models, which sit in restaurant windows nationwide. Workshops let you make one.' },
    { n: 'The Yoshida river',
      d: 'Children jump off the bridge into it in summer, from a height that would be illegal almost anywhere else.' }
  ],
  when: 'July to September for the dance. Autumn for the castle.',
  stay: 'A night, two during Obon.',
  move: 'Nagaragawa Railway from Mino-Ota, or a bus from Gifu, about ninety minutes.',
  eat: 'Keichan, river fish, and Gujo ham.'
},

'GIF-gifu-city': {
  intro: [
    'Cormorant fishing on the Nagara river has been practised here for about thirteen hundred years, and the six fishing masters hold the title of Imperial Household Agency Fisherman, which makes them civil servants.',
    'A master works twelve birds at once on separate leashes from a boat with a basket of burning pine hanging off the bow. The light attracts the fish, the birds dive, and a ring at the base of the throat stops them swallowing the larger ones.',
    'It is a working method rather than a display, though the catch no longer pays for it. You watch from a boat that drifts alongside. The whole thing takes place in the dark with the only light coming from the fires.'
  ],
  see: [
    { n: 'Ukai', t: '11 May to 15 October',
      d: 'Boats leave at dusk. Book ahead. The fishing itself lasts about twenty minutes after a long wait on the water, and the wait is part of it.' },
    { n: 'Gifu Castle',
      d: 'On Mount Kinka, reached by ropeway, where Oda Nobunaga based himself. The view over the Nagara is the point.' },
    { n: 'Gifu Daibutsu',
      d: 'A thirteen-metre Buddha made of lacquered papier-mache over a bamboo and wood frame, finished in 1832. Unique construction and almost unvisited.' },
    { n: 'Gifu lanterns and umbrellas',
      d: 'Both made here from local paper and bamboo. Workshops in the old town.' },
    { n: 'Kawaramachi',
      d: 'The old riverside merchant street near the boat landings.' }
  ],
  when: 'May to October for the fishing.',
  stay: 'A night.',
  move: 'Twenty minutes from Nagoya on the Tokaido line.',
  eat: 'Ayu, the sweetfish the cormorants catch, grilled whole with salt.'
},

'GIF-magome-gifu': {
  intro: [
    'Enakyo is a gorge along a reservoir formed by a dam on the Kiso river in 1924, with oddly shaped granite outcrops along the banks that have all been given names.',
    'It is seen from a boat, which takes about half an hour. The rocks have names like lion, frog and battleship, and the commentary points each one out with a patience that becomes funny.',
    'It is a straightforward stop between Nagoya and the Kiso valley rather than a destination in itself, and in autumn it is genuinely good.'
  ],
  see: [
    { n: 'The boat',
      d: 'Thirty minutes up the reservoir and back. Covered in winter.' },
    { n: 'Autumn', t: 'late October to mid-November',
      d: 'Maple and granite, reflected. The busiest period and the only one worth planning for.' },
    { n: 'Ena Kyoto Gorge park',
      d: 'Walking paths along the bank, with suspension bridges.' },
    { n: 'Nakatsugawa and Magome',
      d: 'Twenty minutes on, for the Nakasendo walk.' }
  ],
  when: 'Late October to mid-November. Otherwise it is pleasant and unexceptional.',
  stay: 'Two hours.',
  move: 'Ena station on the Chuo line, then a short bus.',
  eat: 'Local soba and chestnut sweets, which this part of Gifu is known for.'
},

'GIF-hida-furukawa': {
  intro: [
    'Furukawa is twenty minutes up the line from Takayama and gets a fraction of the visitors for a very similar old town. White-walled storehouses along a canal with large carp in it, a sake brewery, and two temples with carpentry worth looking at closely.',
    'The Hida carpenters marked their work with a cloud-shaped bracket under the eaves, each family using a different pattern, which functions as a signature. There is a trail around the town pointing them out.',
    'The film Your Name used the town and the library as its rural setting, which brought a wave of visitors who mostly photograph the station and leave.'
  ],
  see: [
    { n: 'Seto River and the white storehouses',
      d: 'A few hundred metres of canal with koi in it. The fish are moved to a pond for winter.' },
    { n: 'The carpenters’ marks',
      d: 'Cloud brackets under the eaves, each family’s different. The Hida Takumi-kan museum explains the joinery and lets you try fitting a joint.' },
    { n: 'Furukawa Matsuri', t: '19 to 20 April',
      d: 'Okoshi Daiko, in which men in loincloths carry a drum through the streets at night while rival groups try to ram small drums against it. Chaotic and very loud.' },
    { n: 'The float museum',
      d: 'With a 3D film of the festival, which is the best option outside April.' },
    { n: 'Cycling',
      d: 'The valley is flat, with rice fields and the Alps behind. Hire at the station.' }
  ],
  when: 'April for the festival. Year round otherwise, and winter is quiet and snowy.',
  stay: 'Half a day, or a night to avoid Takayama prices.',
  move: 'Twenty minutes from Takayama on the Takayama line.',
  eat: 'Hida beef, and the same mountain food as Takayama at lower prices.'
},

/* ===================== SHIZUOKA ===================== */
'SZK-izu': {
  intro: [
    'Izu is a peninsula of volcanic hills running south from Fuji, with a serrated coast and hot springs almost everywhere you drill. Tokyo has been recovering here since the Meiji period and the train line was built for exactly that.',
    'Shimoda at the southern tip is where Perry returned in 1854 to sign the treaty that opened Japan, and where the first American consul lived. There is a good deal of history in a small town.',
    'Kawazu, on the east coast, has an early-flowering cherry that blooms from early February, a month before anywhere else. The Kawazu-zakura festival is the first bloom season in Japan.'
  ],
  see: [
    { n: 'Kawazu-zakura', t: 'February',
      d: 'Eight thousand trees along the river, deep pink, flowering from early February for about a month. The first hanami of the year.' },
    { n: 'Shimoda',
      d: 'Perry Road, the Ryosenji temple where the treaty was signed, and Gyokusenji where the first consulate was. A ropeway for the bay view.' },
    { n: 'Jogasaki coast',
      d: 'A lava coastline with a nine-kilometre cliff path and a suspension bridge over a chasm.' },
    { n: 'Izu Kogen and the Jogasaki onsen',
      d: 'Several good baths facing the sea.' },
    { n: 'The Resort 21 and Royal Express trains',
      d: 'Sightseeing trains down the east coast with sea-facing seats.' }
  ],
  when: 'February for the early cherries. Summer for beaches, which get very busy.',
  stay: 'Two nights.',
  move: 'Odoriko limited express from Tokyo to Izukyu-Shimoda, about two and a half hours.',
  eat: 'Kinmedai, golden eye snapper, simmered in soy, which is the Shimoda dish. Wasabi grown in the mountain streams inland.'
},

'SZK-fuji-south': {
  intro: [
    'Shiraito Falls is a hundred and fifty metres wide and about twenty high, and almost none of it is a river. The water is Fuji snowmelt that has percolated through the lava for decades and comes out of the porous rock face in hundreds of separate threads.',
    'That means the flow barely changes with rainfall, which is unusual for a waterfall, and the threads are consistent enough that the name, white threads, is literal.',
    'Fujisan Hongu Sengen Taisha in the town below is the head shrine of about thirteen hundred Sengen shrines, and it owns the land above the eighth station of Fuji, which a court confirmed as recently as 1974.'
  ],
  see: [
    { n: 'Shiraito Falls',
      d: 'A path down to the base. The threads are best in spring when the snowmelt is highest.' },
    { n: 'Otodome Falls',
      d: 'Beside it, a single twenty-five metre drop with a quite different character.' },
    { n: 'Fujisan Hongu Sengen Taisha',
      d: 'A two-storey main hall unique to this shrine, and a spring-fed pond that climbers used to purify in. Fuji directly behind on a clear day.' },
    { n: 'Mount Fuji World Heritage Centre',
      d: 'An inverted cone in wooden lattice by Shigeru Ban, with a spiral ramp inside representing the climb. One of the best modern buildings in the region.' },
    { n: 'Asagiri Kogen',
      d: 'A plateau west of Fuji with paragliding and the mountain in full view.' }
  ],
  when: 'Spring for the highest flow. Winter for clear views of Fuji.',
  stay: 'Half a day.',
  move: 'Bus from Shin-Fuji or Fujinomiya, about thirty minutes.',
  eat: 'Fujinomiya yakisoba, with firm noodles and lard cracklings, which has won national competitions and is taken very seriously locally.'
},

'SZK-atami': {
  intro: [
    'Atami boomed as a hot spring resort through the postwar decades, collapsed in the 1990s when corporate trips stopped, and has been convincingly revived since about 2015 by a deliberate campaign to attract younger visitors.',
    'It is forty minutes from Tokyo on the shinkansen, which is less time than many people spend commuting. The town climbs a steep hillside above a bay, with hot water running under all of it.',
    'There are fireworks over the bay about fifteen times a year, including in winter, which is unusual in Japan and works because the surrounding hills reflect the sound.'
  ],
  see: [
    { n: 'Fireworks over the bay',
      d: 'Roughly fifteen dates a year including December and January. Check the schedule; it is the best reason to time a visit.' },
    { n: 'MOA Museum of Art',
      d: 'On the hillside, reached by a long escalator through tunnels. Holds a Korin screen that is a National Treasure and has a reconstruction of a golden tea room.' },
    { n: 'Kiunkaku',
      d: 'A 1919 villa later used as a ryokan by Tanizaki and Mishima, with a mix of Japanese, Western and Chinese rooms. Open as a museum.' },
    { n: 'Atami Castle',
      d: 'A 1959 concrete fake with no historical basis whatsoever, on a hill, with a good view and a shameless gift shop.' },
    { n: 'Hatsushima',
      d: 'An island thirty minutes by ferry, walkable in an hour, with a quiet coastal path.' }
  ],
  when: 'Year round. January for the early plum blossom at Atami Baien, which is the first in the Kanto region.',
  stay: 'A night.',
  move: 'Shinkansen from Tokyo, about forty minutes.',
  eat: 'Himono, dried fish, which Atami produces and grills at breakfast in every inn.'
},

'SZK-shuzenji': {
  intro: [
    'Shuzenji is the oldest hot spring on the Izu peninsula, traditionally dated to 807 and attributed to Kobo Daishi, who is credited with discovering an improbable number of Japanese hot springs.',
    'It is a small river valley with a temple, a bamboo grove, red bridges and inns along both banks. Natsume Soseki nearly died here of a stomach haemorrhage in 1910 and wrote about it, which made the place literary.',
    'The temple is also where the second Kamakura shogun was assassinated in 1204, aged twenty-two, which gives the valley a darker history than its appearance suggests.'
  ],
  see: [
    { n: 'The bamboo path',
      d: 'Short, with a round bamboo bench in the middle designed for lying back and looking up. Lit in the evening.' },
    { n: 'Tokko no Yu',
      d: 'The original spring in the middle of the river, where Kobo Daishi is said to have struck the rock. A footbath now; bathing in it is no longer allowed.' },
    { n: 'Shuzenji temple',
      d: 'With a treasure hall holding a mask associated with the murdered shogun.' },
    { n: 'The five bridges',
      d: 'Red bridges across the Katsura river, each with a wish attached. Walking all five is the local circuit.' },
    { n: 'Jokanji and the maples',
      d: 'Autumn colour in the temple grounds, lit in November.' }
  ],
  when: 'November for maples. Year round for the baths.',
  stay: 'A night.',
  move: 'Izu-Hakone line from Mishima to Shuzenji, then a bus of about eight minutes.',
  eat: 'Wasabi, grown in the streams here, served fresh grated on everything including ice cream, which is better than it sounds.'
},

'SZK-kakegawa-tea': {
  intro: [
    'Shizuoka grows about forty per cent of Japan’s tea, and the Makinohara plateau is the largest continuous plantation in the country. Rows of clipped bushes run over the hills with Fuji behind them on a clear day.',
    'The land was cleared from the 1870s by former samurai who had lost their stipends after the Meiji Restoration and were given scrubland to farm. It was brutal work and most of them failed; those who stayed made the region.',
    'The tea here is mostly fukamushi, deep-steamed, which produces a cloudier, sweeter cup than standard sencha. It is a local style developed because the leaves grow thick in the sun on this plateau.'
  ],
  see: [
    { n: 'The plantation roads',
      d: 'Drive or cycle between the fields. Early morning in May, during the first harvest, with the pickers out.' },
    { n: 'Fuji no Kuni Tea Museum',
      d: 'In Shimada, with a Korean-influenced garden and a tasting room where the differences between grades are made obvious.' },
    { n: 'Tea picking', t: 'May',
      d: 'Several farms take visitors during the first flush and will process what you pick.' },
    { n: 'Kakegawa Castle',
      d: 'A 1994 wooden reconstruction, one of the first in Japan to be rebuilt properly in timber.' },
    { n: 'Horinouchi and the Oigawa Railway',
      d: 'A steam line running up the Oi valley with original rolling stock.' }
  ],
  when: 'May for the first harvest. Clear winter days for Fuji behind the fields.',
  stay: 'Half a day.',
  move: 'Kakegawa or Kanaya on the Tokaido line. A car is useful on the plateau.',
  eat: 'Tea in every form, including tea soba and tea tempura.'
},

'SZK-nihondaira': {
  intro: [
    'Nihondaira is a plateau of tea fields above Shizuoka city, with Fuji to the north, the Southern Alps west and Suruga Bay below. A 2018 observation deck by Kengo Kuma, a spiral of laminated timber, sits at the top.',
    'A ropeway runs from there down to Kunozan Toshogu, the shrine where Tokugawa Ieyasu was originally buried in 1616 before being moved to Nikko a year later. Some people argue he is still here.',
    'The shrine is reached either by that ropeway or by one thousand one hundred and fifty-nine steps up from the coast road, which is a serious climb with the sea directly below.'
  ],
  see: [
    { n: 'Kunozan Toshogu',
      d: 'Built in 1617, a year before Nikko, in the same lavish style but at a fraction of the scale and with almost nobody there. A National Treasure.' },
    { n: 'The ropeway',
      d: 'Five minutes over a ravine between the plateau and the shrine, with the bay below.' },
    { n: 'Nihondaira Yume Terrace',
      d: 'Kengo Kuma’s timber lattice observation building. Free, with a 360-degree walkway.' },
    { n: 'The 1,159 steps',
      d: 'From the coast road up to the shrine. Steep, exposed and the historically correct approach.' },
    { n: 'The strawberry coast',
      d: 'The road below is lined with greenhouses doing pick-your-own from January to May.' }
  ],
  when: 'Winter for Fuji. January to May for strawberries.',
  stay: 'Half a day.',
  move: 'Bus from Shizuoka station, about forty minutes.',
  eat: 'Shizuoka oden, simmered in a dark broth with fish powder and sardine stock, eaten on skewers.'
},

'SZK-dogashima': {
  intro: [
    'The west coast of Izu is tuff cliffs eroded into caves, arches and stacks, and Dogashima is the best concentration of it. A boat runs into a cave with a collapsed roof so the light comes down from above onto the water.',
    'Just offshore, three small islands are connected to the shore by a sandbar that appears at low tide. You can walk out to them and back, and the tide tables are posted at the car park for the obvious reason.',
    'This coast faces west, which means sunset over the sea with Fuji visible to the north on clear winter days. It is the best sunset on the peninsula.'
  ],
  see: [
    { n: 'Tensodo cave',
      d: 'The cave with the collapsed ceiling, entered by boat. Twenty minutes, and the light inside is the thing.' },
    { n: 'Sanshiro Island',
      d: 'The tidal sandbar. Check the times, walk out, and do not linger.' },
    { n: 'Sunset',
      d: 'From the cliff path or the Dogashima Onsen baths. Winter gives Fuji as well.' },
    { n: 'Matsuzaki',
      d: 'Fifteen minutes south, a town of namako-kabe, walls of square tiles with raised plaster joints in a lattice pattern.' },
    { n: 'Koganezaki',
      d: 'A headland of yellow rock that goes gold at sunset, hence the name.' }
  ],
  when: 'Winter for clear Fuji views and sunsets. Summer for the water.',
  stay: 'A night.',
  move: 'Bus from Shuzenji or Shimoda, about ninety minutes. A car is much better on this coast.',
  eat: 'Local seafood, and Matsuzaki is known for sakura leaf pickling, used in sakura mochi nationwide.'
},

/* ===================== AICHI ===================== */
'AIC-nagoya': {
  intro: [
    'Nagoya is Japan’s fourth city, the centre of Toyota and a great deal of other manufacturing, and it is consistently voted the least appealing major city in Japan by Japanese people. Residents find this funny and sell merchandise about it.',
    'It is worth a day anyway. The food culture is genuinely distinct and locals are evangelical about it: miso katsu, hitsumabushi eel served three ways in one meal, tebasaki chicken wings, and a coffee shop custom where ordering a drink before eleven gets you free toast and an egg.',
    'The three warlords who unified Japan, Oda Nobunaga, Toyotomi Hideyoshi and Tokugawa Ieyasu, were all born within about forty kilometres of here.'
  ],
  see: [
    { n: 'Nagoya Castle',
      d: 'The keep is closed for a timber reconstruction that will take years. The Honmaru Palace beside it has already been rebuilt entirely in wood with recreated painted screens and is superb.' },
    { n: 'Toyota Commemorative Museum',
      d: 'In the original textile machinery works. The weaving hall with working looms from the 1900s is better than the car hall, which is saying something.' },
    { n: 'Atsuta Shrine',
      d: 'Holding one of the three imperial regalia. See its own entry.' },
    { n: 'Osu Kannon and the shopping arcades',
      d: 'A temple with a flea market and a dense grid of covered arcades around it, which is where Nagoya is most alive.' },
    { n: 'SCMaglev and Railway Park',
      d: 'Including a maglev that held the world speed record and a full-scale shinkansen collection.' }
  ],
  when: 'Year round. Summer is among the hottest in Japan.',
  stay: 'A night.',
  move: 'Tokaido Shinkansen, ninety minutes from Tokyo, fifty from Kyoto. Good subway network.',
  eat: 'The reason to stop. Hitsumabushi at Atsuta Horaiken, miso katsu at Yabaton, tebasaki at Sekai no Yamachan, and morning service coffee anywhere.'
},

'AIC-inuyama': {
  intro: [
    'Inuyama Castle sits on a bluff over the Kiso river and is one of the twelve original keeps. It is often called the oldest, dating parts of it to 1537, though the dating is argued about. It was privately owned by one family until 2004, which is unique among Japanese castles.',
    'The keep is small and the top floor has an external balcony you can walk around, which almost no other original castle allows. The river below is where cormorant fishing also takes place in summer.',
    'Meiji Mura nearby is an open-air museum of sixty-seven relocated Meiji-era buildings, including the entrance hall of Frank Lloyd Wright’s Imperial Hotel, saved when the Tokyo building was demolished in 1967.'
  ],
  see: [
    { n: 'The keep and the balcony',
      d: 'Steep stairs to a top floor with a walkway outside. The handrail is low and the drop is real.' },
    { n: 'Meiji Mura',
      d: 'A hundred hectares with a working steam train, a Kyoto tram and Wright’s hotel lobby. Allow most of a day; it is much larger than expected.' },
    { n: 'Inuyama Matsuri', t: 'first weekend of April',
      d: 'Thirteen three-tiered floats with karakuri puppets, lit with three hundred and sixty-five lanterns each at night, under cherry blossom.' },
    { n: 'Urakuen',
      d: 'A garden holding Jo-an, a tea house built in 1618 by Oda Nobunaga’s brother, which is a National Treasure.' },
    { n: 'Cormorant fishing',
      d: 'On the Kiso in summer, same practice as Gifu.' }
  ],
  when: 'Early April for the festival and blossom.',
  stay: 'A day.',
  move: 'Meitetsu line from Nagoya, about thirty minutes.',
  eat: 'Dengaku, tofu grilled with miso on skewers, on the castle approach street.'
},

'AIC-tokoname': {
  intro: [
    'Tokoname is one of the six ancient kilns of Japan and the largest of them, producing from the twelfth century. The clay here is high in iron, which fires to a red-brown, and the classic product is an unglazed teapot that is said to improve the tea by absorbing tannins.',
    'The Pottery Footpath runs through the old kiln district, and the walls along it are built from stacked pipes, bottles and shochu jars that were seconds or surplus. It is an industrial landscape made decorative by accident.',
    'The town also made the sewer pipes and sanitary ware that modernised Japanese cities, which is less romantic and was the actual business.'
  ],
  see: [
    { n: 'The Pottery Footpath',
      d: 'About a kilometre and a half, with the pipe walls, a climbing kiln with ten chimneys from 1887, and workshops open along it.' },
    { n: 'The climbing kiln',
      d: 'Noborigama, the largest surviving in Japan, fired until 1974.' },
    { n: 'Teapot workshops',
      d: 'Several makers will explain why an unglazed pot is used only for one kind of tea and never washed with soap.' },
    { n: 'INAX Live Museum',
      d: 'On tile and sanitary ware, with a hall of historic toilets that is far more interesting than it sounds, and a mosaic tile workshop.' },
    { n: 'Centrair',
      d: 'Nagoya’s airport is on an island next door, which makes this an excellent first or last stop in Japan.' }
  ],
  when: 'Year round.',
  stay: 'Half a day.',
  move: 'Meitetsu line from Nagoya, about thirty-five minutes, on the way to the airport.',
  eat: 'Local anago and shirasu from Ise Bay.'
},

'AIC-korankei': {
  intro: [
    'In 1634 a priest at Kojakuji began planting maples along the path to the temple, and successive generations continued. There are now about four thousand trees of eleven varieties in the valley, which means the colour comes in stages over several weeks rather than all at once.',
    'It is reckoned the best autumn colour site in central Japan and in late November the traffic on the approach roads is genuinely severe. Park and ride schemes operate.',
    'The trees are lit from sunset until nine during the festival, and the reflection in the Tomoe river doubles the effect.'
  ],
  see: [
    { n: 'The valley in late November',
      d: 'Peak is usually the third week. Weekdays, early morning or after seven in the evening are the only sane times.' },
    { n: 'The illumination',
      d: 'Sunset to nine through the festival. Different in character from the daytime and arguably better.' },
    { n: 'Taigetsukyo bridge',
      d: 'The red bridge over the Tomoe, which is the standard composition.' },
    { n: 'Kojakuji',
      d: 'The temple at the top, where the planting started, with a stone path up through the maples.' },
    { n: 'Sanshu Asuke Yashiki',
      d: 'A folk village nearby with craftspeople demonstrating charcoal making, weaving and paper.' }
  ],
  when: 'Mid to late November, and effectively only then.',
  stay: 'Half a day.',
  move: 'Bus from Toyotashi station, about an hour, with extra services in autumn.',
  eat: 'Gohei mochi and shiitake from the stalls along the river.'
},

'AIC-atsuta': {
  intro: [
    'Atsuta Shrine holds the Kusanagi sword, one of the three imperial regalia. Nobody has seen it. It is not displayed, the emperor does not see it at enthronement, and the only documented viewing was by priests in the Edo period who reportedly suffered for it.',
    'The shrine is about nineteen hundred years old by its own account and sits in nineteen hectares of forest inside Nagoya, with camphor trees over a thousand years old.',
    'It is second only to Ise in the Shinto hierarchy and receives around nine million visitors a year, most of them in the first week of January.'
  ],
  see: [
    { n: 'The main approach',
      d: 'Through old forest from the south gate. The thousand-year-old camphor said to have been planted by Kobo Daishi is just inside.' },
    { n: 'The treasure hall',
      d: 'Four and a half thousand items including swords, some National Treasures. The sword is not among them.' },
    { n: 'Nobunaga’s wall',
      d: 'A mud wall donated by Oda Nobunaga in 1560 after he prayed here before the battle of Okehazama and won against odds of about ten to one.' },
    { n: 'The kishimen stand',
      d: 'Flat Nagoya noodles served in the shrine grounds, which is a local institution.' },
    { n: 'New Year',
      d: 'Over two million people in three days. Avoid unless that is what you came for.' }
  ],
  when: 'Year round. June has a festival with lantern towers and fireworks.',
  stay: 'An hour.',
  move: 'Jingu-mae on the Meitetsu line, or Jingu-nishi on the subway.',
  eat: 'Kishimen in the grounds, and Atsuta Horaiken nearby for hitsumabushi.'
},

'AIC-okazaki': {
  intro: [
    'Tokugawa Ieyasu was born in Okazaki Castle in 1543, and the city has built its identity around that. The castle is a reconstruction with a museum, and the park around it holds eight hundred cherry trees along the Oto river.',
    'The other local industry is hatcho miso, a very dark soybean miso aged for at least two years in cedar barrels under cairns of river stones stacked by hand in a cone. Two breweries have made it here since the fourteenth and sixteenth centuries respectively.',
    'The stones are stacked without mortar and have to be restacked by hand. Nobody has successfully automated it.'
  ],
  see: [
    { n: 'The miso breweries',
      d: 'Kakukyu and Maruya both run free tours showing the barrels and the stone cairns. The barrels are over a century old and the microbes in the wood are part of the product.' },
    { n: 'Okazaki Castle',
      d: 'Reconstructed, with a museum on Ieyasu and a garden. Eight hundred cherry trees in the park.' },
    { n: 'The Oto river', t: 'early April',
      d: 'Blossom along the river with illumination, which is one of the better bloom spots in Aichi.' },
    { n: 'Okazaki fireworks', t: 'first Saturday of August',
      d: 'The city has made fireworks since the Edo period, when Ieyasu permitted it here and almost nowhere else.' }
  ],
  when: 'Early April for blossom, August for fireworks.',
  stay: 'Half a day.',
  move: 'Meitetsu line from Nagoya, about thirty minutes.',
  eat: 'Hatcho miso in everything, including miso nikomi udon and dengaku.'
},

/* ===================== HIROSHIMA ===================== */
'HRS-hiroshima': {
  intro: [
    'At 8.15 on 6 August 1945 a bomb detonated about six hundred metres above this city. Around eighty thousand people died immediately and roughly the same number again by the end of the year. The Peace Memorial Museum does not soften any of that.',
    'The museum was reorganised in 2019 to lead with the personal effects and the testimony rather than the physics. It is a difficult ninety minutes and it is the reason to come.',
    'The city around it is green, flat, relaxed and entirely ordinary in the best sense. Trams run through it, some of them cars that survived the bomb and were back in service within three days. Eating okonomiyaki in a backstreet after a morning in the museum is a necessary part of the day.'
  ],
  see: [
    { n: 'Peace Memorial Museum',
      d: 'Allow ninety minutes minimum. The East Building gives context; the Main Building is the testimony. Audio guide recommended.' },
    { n: 'The A-Bomb Dome',
      d: 'The former Industrial Promotion Hall, almost directly under the detonation, left exactly as it was. World Heritage, and the preservation was argued over for decades.' },
    { n: 'The Children’s Peace Monument',
      d: 'For Sadako Sasaki, who folded paper cranes while dying of leukaemia at twelve. Cases of cranes sent from schools worldwide are replaced constantly.' },
    { n: 'Hearing a hibakusha',
      d: 'Survivor testimony sessions are arranged through the museum. The survivors are now in their eighties and nineties and these will not be available much longer.' },
    { n: 'Shukkeien',
      d: 'A garden from 1620 that was a relief station after the bomb. A ginkgo that survived is still growing.' },
    { n: 'Miyajima',
      d: 'An hour away, and the standard pairing.' }
  ],
  when: 'Year round. 6 August is the memorial ceremony, with lanterns floated on the river in the evening.',
  stay: 'A night, with a day for Miyajima.',
  move: 'Sanyo Shinkansen, four hours from Tokyo, ninety minutes from Osaka. Trams from the station.',
  eat: 'Okonomiyaki, layered rather than mixed, with noodles in it. Okonomimura is a building of twenty-odd stalls; the backstreet places are better. Oysters in winter.'
},

'HRS-miyajima': {
  intro: [
    'The torii stands in the sea at Itsukushima, and the shrine behind it is built on piers over the water, because the island itself was considered so sacred that commoners were not permitted to set foot on it. Worshippers approached by boat through the gate.',
    'Until relatively recently nobody was allowed to be born or to die here. Pregnant women and the terminally ill were taken to the mainland, and there are still no cemeteries on the island.',
    'The gate was under restoration until late 2022 and is now fully visible again. At high tide it appears to float; at low tide you walk out to it across the sand and look up at the sixteen-metre camphor pillars, which stand on the seabed by weight alone with no foundations.'
  ],
  see: [
    { n: 'The torii at both tides',
      d: 'Check the tide table and plan to see it twice. High tide for the floating image, low for walking out and seeing the scale.' },
    { n: 'Itsukushima Shrine',
      d: 'Boardwalks over the water, vermilion, with a Noh stage that is the only one in Japan built over the sea.' },
    { n: 'Mount Misen',
      d: 'Ropeway most of the way, then half an hour on foot to the summit at five hundred and thirty-five metres. A flame at Reikado has reportedly burned since Kobo Daishi lit it in 806 and was used to light the Hiroshima peace flame.' },
    { n: 'Staying overnight',
      d: 'The day visitors leave by six and the island becomes a different place. The gate lit at night with nobody there is the best version of it.' },
    { n: 'The deer',
      d: 'Tame, numerous and they eat paper. Hold on to your tickets and your map.' },
    { n: 'Daisho-in',
      d: 'A Shingon temple on the slope with five hundred rakan statues, a stair with prayer wheels, and far fewer people than the shrine.' }
  ],
  when: 'Year round. November for maple at Momijidani. Avoid summer weekends.',
  stay: 'A night. A day trip works and is much worse.',
  move: 'Train or tram to Miyajimaguchi, then a ten-minute ferry. The JR ferry is covered by the rail pass.',
  eat: 'Oysters grilled on the shell along the main street. Anago-meshi, conger eel over rice, and momiji manju, maple-leaf cakes baked in front of you.'
},

'HRS-onomichi': {
  intro: [
    'Onomichi is a town stacked up a hillside above a narrow strait, with twenty-five temples on the slope and a maze of lanes and stairs connecting them. Cars cannot reach most of it. Cats can and do.',
    'It has been a literary town since the writer Fumiko Hayashi grew up here, and Ozu filmed the opening of Tokyo Story on these slopes. There is a marked literary path with stones carrying quotations.',
    'It is also the mainland end of the Shimanami Kaido, which has brought a cycling economy: hostels with bike racks, cafes in converted warehouses and a hotel you can wheel your bicycle into the room of.'
  ],
  see: [
    { n: 'The temple walk',
      d: 'A marked route linking twenty-five temples up and across the slope. Three hours at a wander, with views down to the strait throughout.' },
    { n: 'Senkoji and the ropeway',
      d: 'Ropeway up, walk down through the lanes. The temple has a vermilion hall on a rock outcrop.' },
    { n: 'The Cat Alley',
      d: 'A lane with painted stones and a great many actual cats. Twee and genuinely charming.' },
    { n: 'The strait',
      d: 'Ferries cross to Mukaishima constantly for about a hundred yen, taking three minutes. Riding one for no reason is a good use of time.' },
    { n: 'U2 and the cycling scene',
      d: 'A converted warehouse with a hotel, bike shop, bakery and bar. The start of the Shimanami for most riders.' }
  ],
  when: 'Year round. Spring for blossom at Senkoji park.',
  stay: 'A night.',
  move: 'Shin-Onomichi on the shinkansen, or Onomichi on the Sanyo line, which is closer to the town.',
  eat: 'Onomichi ramen, soy based with flat noodles and lumps of back fat floating in it. It sounds heavy and is not.'
},

'HRS-shimanami': {
  intro: [
    'The Shimanami Kaido crosses six islands between Onomichi and Imabari on a chain of bridges, and every bridge has a separate cycle and pedestrian lane with its own approach ramp. Seventy kilometres end to end.',
    'It is almost certainly the best cycling route in Japan and one of the better ones anywhere. The route is marked with a blue line on the road the whole way, so navigation requires no thought at all.',
    'Bicycles can be hired at one end and dropped at the other. The ramps up to the bridges are graded at three per cent, which means almost anyone can ride it, and the whole thing takes six to nine hours or two comfortable days.'
  ],
  see: [
    { n: 'The full route',
      d: 'Seventy kilometres, blue line the whole way. Two days with a night on Omishima is the civilised version.' },
    { n: 'Kurushima Kaikyo Bridge',
      d: 'Four kilometres, the world’s first triple suspension bridge, at the Imabari end. The approach spiral and the crossing are the high point.' },
    { n: 'Omishima',
      d: 'Oyamazumi Shrine holds about eighty per cent of Japan’s designated National Treasure arms and armour, donated by warriors before battle. An extraordinary collection in an unlikely place.' },
    { n: 'Ikuchijima',
      d: 'With Kosanji, a temple complex one man built for his mother over thirty years, copying buildings from across Japan, and a marble hilltop sculpture garden above it.' },
    { n: 'Lemons',
      d: 'The islands grow most of Japan’s domestic lemons, and everything here is lemon flavoured.' }
  ],
  when: 'Spring and autumn. Summer is hot and the bridges are exposed.',
  stay: 'Two days.',
  move: 'Rental at Onomichi or Imabari with one-way drop-off. E-bikes available and worth it if you are unsure.',
  eat: 'Island citrus, sea bream at Imabari, and Onomichi ramen at the start or finish.'
},

'HRS-tomonoura': {
  intro: [
    'Tomonoura sits where the tidal currents of the Inland Sea meet and reverse, which meant sailing ships had to wait here for the tide to turn. That made it a prosperous port for centuries and left it with a stone lighthouse, a stepped quay and warehouses that are all still standing.',
    'The whole harbour infrastructure from the Edo period survives, which is extremely rare. Most Japanese ports were modernised out of existence.',
    'Miyazaki Hayao stayed here in 2005 and the town became the basis for Ponyo. A 2009 court case blocked a planned bridge across the harbour on heritage grounds, which was a significant ruling in Japanese conservation law.'
  ],
  see: [
    { n: 'The joyato lighthouse',
      d: 'A stone lantern tower of 1859 on the quay, eleven metres, still the tallest of its kind in Japan.' },
    { n: 'The harbour',
      d: 'Walk the stepped landing stages and the warehouse lanes. The scale is small and the completeness is the point.' },
    { n: 'Fukuzenji Taichoro',
      d: 'A temple hall above the water with a view a Korean envoy in 1711 called the most beautiful scenery in Japan. Sit on the tatami and look out.' },
    { n: 'Homeishu',
      d: 'A medicinal herb liqueur made here since 1659, with tasting at the old brewery buildings.' },
    { n: 'Sensuijima',
      d: 'A five-minute ferry to an island with coloured sand beaches and a walk round.' }
  ],
  when: 'Year round. Spring and autumn are best for walking.',
  stay: 'Half a day, or a night in a converted machiya.',
  move: 'Bus from Fukuyama station, about thirty minutes.',
  eat: 'Tai, sea bream, which these currents are famous for. Also small whitebait.'
},

'HRS-sandankyo': {
  intro: [
    'Sandankyo is a sixteen-kilometre gorge in the mountains of northern Hiroshima, with a path running along the bottom of it. Two sections are crossed by hand-pulled ferry, where a boatman hauls the boat across on a rope because the path cannot continue on that bank.',
    'It was surveyed and publicised in 1910 by a photographer who spent years making the case for its protection, and it became a national monument in 1925.',
    'Almost nobody goes. In late autumn the colour is as good as anywhere in western Japan and you will share the path with a handful of people.'
  ],
  see: [
    { n: 'The gorge path',
      d: 'Thirteen kilometres to the far end, or four to Sandan-daki waterfall and back. Well made and mostly level.' },
    { n: 'The rope ferries',
      d: 'Two crossings at Kurobuchi and Sarutobi, pulled by hand. Small fee, and genuinely the highlight.' },
    { n: 'Sandan-daki',
      d: 'A three-tiered waterfall at the far end. Reachable from the opposite entrance in about forty minutes.' },
    { n: 'Autumn', t: 'early to mid-November',
      d: 'Maple and beech over the water. The busiest fortnight and still quiet by Japanese standards.' }
  ],
  when: 'April to November. The path closes in winter.',
  stay: 'Most of a day.',
  move: 'Bus from Hiroshima, about ninety minutes. A car is easier.',
  eat: 'A couple of places at the entrance doing river fish and soba.'
},

'HRS-takehara': {
  intro: [
    'Takehara made salt and sake, and the merchants who did it built a quarter of plastered houses with lattice windows and tiled roofs that survives almost complete. It is called the little Kyoto of Aki and the label is more justified than most.',
    'Two of Japan’s whisky figures have connections here: the founder of Nikka, Masataka Taketsuru, was born into a sake brewing family in this street, and the house is open.',
    'Offshore is Okunoshima, which has about nine hundred wild rabbits and which was, from 1929 to 1945, the site of a poison gas factory that was erased from maps. Both facts are true and the island presents them together.'
  ],
  see: [
    { n: 'The preserved quarter',
      d: 'A few streets, walkable in an hour, with several houses open including the Taketsuru residence.' },
    { n: 'Okunoshima',
      d: 'Fifteen minutes by ferry from Tadanoumi. Rabbits everywhere, descended from animals released after the war. Feeding is managed; buy pellets on the mainland.' },
    { n: 'The Poison Gas Museum',
      d: 'On the same island. Small, unflinching, and the reason the rabbits exist is debated: the test animals were destroyed in 1945, so these are probably a later release.' },
    { n: 'The ruins',
      d: 'Power station and storage buildings on the island, overgrown and open to walk around.' },
    { n: 'Sake brewing',
      d: 'Several breweries in Takehara with tastings.' }
  ],
  when: 'Year round. The rabbits are more active in cooler weather.',
  stay: 'A day.',
  move: 'Kure line from Hiroshima to Takehara, about ninety minutes. Tadanoumi for the ferry.',
  eat: 'Oysters, and sake from the local breweries.'
},

/* ===================== OKAYAMA ===================== */
'OKY-korakuen': {
  intro: [
    'Korakuen was completed in 1700 and it is the most open of the three great gardens. Where Kenrokuen and Kairakuen are dense, this has wide lawns, which was unusual in Japanese garden design and came from the lord wanting somewhere to walk rather than contemplate.',
    'It also has a working tea plantation and a rice field inside it, which were there to demonstrate that the lord understood agriculture.',
    'Okayama Castle across the river is black, which earned it the name crow castle, and the garden was laid out to use it as borrowed scenery. From the right spot on the lawn the castle sits exactly where it was meant to.'
  ],
  see: [
    { n: 'The lawns and the borrowed castle',
      d: 'Walk to the far side and look back with the black keep framed. That alignment is the whole design.' },
    { n: 'The tea plantation and rice field',
      d: 'Still worked. Tea picking in May, rice planting in June.' },
    { n: 'Yuishinzan',
      d: 'A small artificial hill with a path to the top, giving the overview of the whole layout.' },
    { n: 'Okayama Castle',
      d: 'A 1966 reconstruction, renovated in 2022, with a gold-roofed turret. The one original surviving turret is beside it.' },
    { n: 'Evening openings',
      d: 'Summer and autumn illumination on set dates, when the garden is lit and almost empty.' }
  ],
  when: 'Year round. Spring and autumn are best. Early morning entry in summer is cheap and quiet.',
  stay: 'Two hours.',
  move: 'Tram or a twenty-five minute walk from Okayama station.',
  eat: 'Okayama is known for barazushi, a scattered sushi with a long list of toppings that originated as a way round a lord’s order to eat simply.'
},

'OKY-kurashiki': {
  intro: [
    'Kurashiki was a rice storage town under direct shogunal control, and the canal through the Bikan quarter was dug to move it. The white-walled, black-tiled warehouses along it are nineteenth century and largely unaltered.',
    'In 1930 a local textile magnate named Ohara Magosaburo opened a museum of Western art here, the first in Japan, built on paintings his friend had bought in Europe. It holds a Greco Annunciation, a Monet he bought from the artist’s garden, Gauguin, Matisse and Picasso.',
    'That a provincial cotton town has that collection is the surprise of the place, and the reason it is worth more than a canal walk.'
  ],
  see: [
    { n: 'Ohara Museum of Art',
      d: 'Start with the Greco. The Craft Gallery behind, in converted rice warehouses, holds Hamada, Kawai and Leach pottery and is at least as good.' },
    { n: 'The Bikan quarter',
      d: 'Willows, canal, warehouses. Punt rides in season. Early morning before the day trippers.' },
    { n: 'Ivy Square',
      d: 'The original cotton mill, brick and covered in ivy, now a hotel and museum complex.' },
    { n: 'Japan Rural Toy Museum',
      d: 'Five thousand folk toys from across the country. Small, idiosyncratic and good.' },
    { n: 'Kojima',
      d: 'Thirty minutes away and the birthplace of Japanese denim, with a street of about forty jeans makers.' }
  ],
  when: 'Year round. Weekdays for the canal.',
  stay: 'A night.',
  move: 'Fifteen minutes from Okayama on the Sanyo line.',
  eat: 'Mamakari, a small fish pickled in vinegar, and Okayama fruit, which includes white peaches and Muscat grapes.'
},

'OKY-naoshima': {
  intro: [
    'Naoshima was an industrial island with a copper smelter and a declining population. From the late 1980s the Benesse corporation and the architect Tadao Ando began putting museums on it, and it is now one of the significant contemporary art destinations in the world.',
    'The Chichu Museum is mostly underground, lit by natural light, and holds five Monet water lilies in a room of white marble mosaic you enter barefoot. There is also a Walter De Maria chamber and two James Turrell works.',
    'The Art House Project in Honmura village converted empty houses into installations, including a bathhouse you can actually bathe in and a dark room where you sit for ten minutes until two hundred and fifty LEDs in water slowly become visible.'
  ],
  see: [
    { n: 'Chichu Art Museum',
      d: 'Timed tickets, booked online in advance, and they sell out. The Monet room changes completely with the weather outside.' },
    { n: 'The Art House Project',
      d: 'Seven houses in Honmura. Minamidera, the Turrell dark room, is the one; give it the full ten minutes and do not use your phone.' },
    { n: 'The Kusama pumpkins',
      d: 'Yellow on the pier at Benesse House, red near the ferry terminal. The yellow one was washed away in a 2021 typhoon and has been restored.' },
    { n: 'Benesse House Museum',
      d: 'A hotel and museum in the same Ando building. Guests can walk the galleries at night, which is the best version.' },
    { n: 'I Love Yu',
      d: 'A working public bathhouse that is itself an artwork, by Shinro Ohtake. You bathe in it.' }
  ],
  when: 'Year round. Mondays are a problem; most venues close. The Setouchi Triennale years are busiest.',
  stay: 'A night minimum, two if you are adding Teshima.',
  move: 'Ferry from Uno, about twenty minutes, or from Takamatsu in fifty. Bicycles or the island bus once there.',
  eat: 'Limited and it closes early. Book dinner or carry food.'
},

'OKY-teshima': {
  intro: [
    'Teshima Art Museum is a concrete shell shaped like a water droplet, forty by sixty metres, with no pillars and two oval openings to the sky. There is one work inside, by Rei Naito, and it consists of water.',
    'Drops seep from tiny holes in the floor, gather, run, merge and pool, following gradients built into the concrete. You take your shoes off and sit on the floor and watch water move for as long as you like. Birdsong and wind come through the openings.',
    'It is the single best thing in the Inland Sea and arguably one of the best buildings in Japan. The island also has a difficult history: it was the site of Japan’s largest illegal industrial waste dump, and the clean-up took decades of resident campaigning.'
  ],
  see: [
    { n: 'Teshima Art Museum',
      d: 'Book ahead. Allow an hour, not twenty minutes. Silence is requested and observed.' },
    { n: 'Les Archives du Coeur',
      d: 'Christian Boltanski’s archive of recorded human heartbeats, in a building by the sea. You can add your own.' },
    { n: 'Teshima Yokoo House',
      d: 'A converted house with a tower and coloured glass, which is deliberately overwhelming after the restraint of the museum.' },
    { n: 'Inujima Seirensho',
      d: 'A separate island, with a museum built inside a 1909 copper refinery left derelict, using the existing karami brick and no air conditioning.' },
    { n: 'Cycling',
      d: 'The island is hilly. An e-bike is the sensible choice.' }
  ],
  when: 'Year round. Closed Tuesdays in most seasons. Ferry schedules are thin and need planning.',
  stay: 'A day from Naoshima or Takamatsu.',
  move: 'Ferries from Uno, Takamatsu and Naoshima. Check the timetable before anything else; it determines the whole day.',
  eat: 'A few cafes, including one at the art museum. Limited hours.'
},

'OKY-bitchu-takahashi': {
  intro: [
    'Bitchu Matsuyama is the highest original castle keep in Japan, at four hundred and thirty metres, and the only one of the surviving twelve that is a mountain castle. Everything else original is on flat ground or a low hill.',
    'That height means a climb. A taxi or shuttle goes to a car park partway and then it is about twenty minutes on foot up a stone path through walls and gates.',
    'In autumn, on cold clear mornings, fog fills the Takahashi valley and the castle stands above it. Unlike Takeda, this one has an actual building on top, which arguably makes the sight better.'
  ],
  see: [
    { n: 'The keep',
      d: 'Small, two storeys, with original stonework and an unusual arrangement where the natural rock of the mountain is incorporated into the walls.' },
    { n: 'The sea of cloud', t: 'late September to early April, early morning',
      d: 'Viewed from the Unkai observation deck on the mountain opposite rather than from the castle. You need a clear cold night and no wind.' },
    { n: 'Raikyuji',
      d: 'In the town below, with a garden by Kobori Enshu using Mount Atago as borrowed scenery and a clipped azalea hedge representing waves.' },
    { n: 'Fukiya',
      d: 'Forty minutes away, a village that mined copper and red ochre, with buildings painted in the local red pigment.' }
  ],
  when: 'Late autumn mornings for the cloud. Year round for the castle, though it closes in bad weather.',
  stay: 'Half a day.',
  move: 'Bitchu-Takahashi station on the Hakubi line, then a shuttle bus partway up and a walk.',
  eat: 'Simple places in the town. Fukiya has a few.'
},

/* ===================== SHIMANE ===================== */
'SMN-izumo': {
  intro: [
    'In the tenth lunar month, every deity in Japan is said to leave their own shrine and gather at Izumo. Everywhere else calls that month Kannazuki, the month without gods. Here it is Kamiarizuki, the month with gods.',
    'Izumo Taisha claims to be the oldest shrine in Japan, and medieval records describe a main hall standing forty-eight metres high on enormous pillars. For centuries that was dismissed as exaggeration until, in 2000, three bundled pillars each three metres across were excavated on the site.',
    'You clap four times here rather than the usual two: twice for yourself and twice for your partner, present or future. The shrine is the national centre for prayers about marriage.'
  ],
  see: [
    { n: 'The shimenawa at Kagura-den',
      d: 'Thirteen and a half metres long and about five and a half tonnes, which is the largest in Japan. Replaced every several years by a team from a town in Iinan.' },
    { n: 'The main hall',
      d: 'Twenty-four metres, National Treasure, rebuilt in 1744. You cannot go in. The excavated pillar positions are marked in the forecourt.' },
    { n: 'Kamiarisai', t: 'tenth lunar month, usually November',
      d: 'A week of rituals when the deities arrive, including a welcoming ceremony on Inasa beach at night.' },
    { n: 'The museum',
      d: 'Holding the excavated pillars and three hundred and fifty-eight bronze swords found in a single pit nearby, which is more than had previously been found in the whole of Japan.' },
    { n: 'Inasa no Hama',
      d: 'The beach where the gods are said to arrive, with a small shrine on a rock. Sunset here is the thing.' }
  ],
  when: 'November for Kamiarisai. Year round otherwise.',
  stay: 'Half a day, with a night in Matsue.',
  move: 'Ichibata line from Matsue, or a bus. Izumoshi station is on the JR line.',
  eat: 'Izumo soba, served cold in three stacked lacquer bowls with the sauce poured on rather than dipped into.'
},

'SMN-matsue': {
  intro: [
    'Matsue sits between a lake and a lagoon with canals through the middle, which is why it is called the city of water. The castle is one of the twelve original keeps and one of only five designated National Treasures, built in 1611 and never attacked.',
    'Lafcadio Hearn arrived in 1890 as a schoolteacher, married a samurai’s daughter, took Japanese citizenship and a Japanese name, and wrote the books that shaped how the English-speaking world understood Japan for half a century. His house is preserved beside the castle moat.',
    'Hearn was half Greek, half Irish, raised in Dublin, blind in one eye, and had already lived in Cincinnati and Martinique before he got here. He stayed in Matsue only fifteen months and wrote about it for the rest of his life.'
  ],
  see: [
    { n: 'Matsue Castle',
      d: 'Dark wood, five visible storeys and six actual ones, with an observation floor at the top. Original, which you can feel in the stairs.' },
    { n: 'The moat boat',
      d: 'Fifty minutes round the castle moat and the canals, with the roof lowered to pass under bridges, which means everybody ducks together.' },
    { n: 'Lafcadio Hearn Memorial Museum and residence',
      d: 'The house kept as he had it, with the garden he wrote about, and a museum next door with his desk, raised because of his eyesight.' },
    { n: 'Shiomi Nawate',
      d: 'The samurai street along the moat, with the Buke Yashiki residence open.' },
    { n: 'Lake Shinji sunset',
      d: 'West-facing, with the Yomegashima islet in silhouette. Rated one of the best sunsets in Japan and the tourist office publishes the times.' }
  ],
  when: 'Year round. Winter for crab.',
  stay: 'A night.',
  move: 'Limited express from Okayama, about two and a half hours. Izumo Airport is nearby.',
  eat: 'The seven delicacies of Lake Shinji, including whitebait and freshwater clams. Shijimi miso soup at breakfast.'
},

'SMN-iwami-ginzan': {
  intro: [
    'At its peak in the early seventeenth century, this mine produced about a third of the world’s silver. Japanese silver financed trade across Asia and Iwami silver was traded in Lisbon and Amsterdam. The mine appears on sixteenth-century European maps when almost nothing else in Japan does.',
    'The reason UNESCO listed it in 2007 is not just the output but the method: the mountains around were never clear-felled. Timber was coppiced on rotation to fuel the smelting, and the forest is still there.',
    'There are about six hundred shafts. One, Ryugenji Mabu, is open and walkable, hand-cut, and only about a metre and a half high in places.'
  ],
  see: [
    { n: 'Ryugenji Mabu',
      d: 'A hand-cut tunnel, open and lit, with pick marks on the walls. Low ceilings; mind your head.' },
    { n: 'Omori town',
      d: 'The administrative village, a single street of wooden buildings. Cars are discouraged; hire a bicycle at the visitor centre.' },
    { n: 'Rakanji',
      d: 'Five hundred stone rakan in two caves across a stone bridge, carved over twenty-five years to memorialise the miners.' },
    { n: 'Okubo Mabu', t: 'guided tours only',
      d: 'A much larger shaft, accessible only on a booked tour with helmet and boots. Worth the planning.' },
    { n: 'Yunotsu',
      d: 'The port the silver was shipped from, with hot springs and two historic bathhouses.' }
  ],
  when: 'Year round. Spring and autumn are best for cycling the valley.',
  stay: 'A day.',
  move: 'Bus from Odashi station, about thirty minutes.',
  eat: 'A few cafes in Omori. The Gungendo shop and cafe is an interesting local business built around the town’s revival.'
},

'SMN-adachi': {
  intro: [
    'An American journal of Japanese gardening has ranked the Adachi garden first in Japan every year since 2003, ahead of Katsura and the three great gardens. That is a specific ranking by a specific publication and it has made the place internationally famous.',
    'You cannot walk in it. The garden is viewed through windows from inside the museum, deliberately framed so that each opening presents a composition like a hanging scroll. One window has a real pine and hillside arranged behind it to complete a painting hung beside it.',
    'Seven full-time gardeners maintain it, and the mountains behind are owned by the museum so that nothing can be built on them. It is as much an argument about what a garden is for as it is a garden.'
  ],
  see: [
    { n: 'The living framed scroll',
      d: 'A window cut to the proportions of a hanging scroll with the garden behind it. The clearest statement of the whole idea.' },
    { n: 'The dry landscape garden',
      d: 'The main view, with a waterfall on the far hillside that the founder had installed because the composition needed one.' },
    { n: 'The Yokoyama Taikan collection',
      d: 'A hundred and twenty works by the painter, which is the largest collection of him anywhere and is the museum’s actual purpose.' },
    { n: 'Winter',
      d: 'Snow on the pines, seen from a heated room. Arguably the best season.' },
    { n: 'The frustration',
      d: 'Worth naming. If you want to walk in a garden, go to Yushien on Daikonshima instead, twenty minutes away.' }
  ],
  when: 'Year round, open every day of the year.',
  stay: 'Two hours.',
  move: 'Free shuttle from Yasugi station, about twenty minutes. An hour from Matsue.',
  eat: 'A tea house and restaurant on site with garden views.'
},

'SMN-oki': {
  intro: [
    'The Oki Islands are four inhabited islands fifty kilometres off the Shimane coast, a UNESCO Global Geopark, and they were where the Japanese state sent emperors it wanted rid of. Go-Toba was exiled here in 1221 and died on the islands; Go-Daigo was sent in 1332 and escaped.',
    'Dogo is the largest. The Dozen group, three islands around a flooded caldera, has the Matengai cliff, two hundred and fifty-seven metres of sheer rock with cattle and horses grazing right up to the edge.',
    'Bullfighting here is bull against bull rather than bull against person, a tradition supposedly started to entertain the exiled Go-Toba.'
  ],
  see: [
    { n: 'Matengai cliff',
      d: 'On Nishinoshima. A walk along the clifftop with horses and cows loose. There are no fences and the drop is two hundred and fifty metres.' },
    { n: 'Rosoku-jima',
      d: 'A candle-shaped rock stack, seen by boat at sunset when the sun sits exactly on the tip and appears to light it. Weather dependent and worth the gamble.' },
    { n: 'The cedar of Dogo',
      d: 'Chichisugi, an eight-hundred-year-old cedar with roots like dripping candles, in a forest shrine precinct.' },
    { n: 'Ushi-tsuki',
      d: 'Bull sumo, held several times a year on Dogo. No animals are killed; the losing bull turns away.' },
    { n: 'Kuniga coast',
      d: 'A walking route along the cliffs of Nishinoshima, about two hours, with some of the best coastal scenery in Japan.' }
  ],
  when: 'May to October. Ferries are weather-dependent and winter crossings are often cancelled.',
  stay: 'Two or three nights.',
  move: 'Ferry from Shichirui or Sakaiminato, two to three hours, or a short flight to Dogo. Inter-island ferries.',
  eat: 'Oki beef, squid, and rock oysters in summer.'
},

'SMN-tsuwano': {
  intro: [
    'Tsuwano is a castle town in a narrow valley, with a main street of white-walled houses and open channels along it holding several hundred carp. There are supposedly more carp than residents, which is a joke that has stopped being funny as the population has fallen.',
    'The carp were stocked in the Edo period as an emergency food reserve in case of famine. They were never eaten and have been bred as ornamental fish ever since.',
    'Taikodani Inari is one of the five great Inari shrines of Japan, reached by a tunnel of about a thousand red gates climbing the hillside. It is a smaller version of Fushimi and you will often have it to yourself.'
  ],
  see: [
    { n: 'Tonomachi street',
      d: 'The carp channels and the white walls. Walkable in twenty minutes and worth doing slowly.' },
    { n: 'Taikodani Inari',
      d: 'A thousand gates up the hill, or a chairlift to the castle ruins above.' },
    { n: 'The castle ruins',
      d: 'Stone walls on the ridge with a view down the whole valley. Chairlift and a fifteen-minute walk.' },
    { n: 'The Catholic church',
      d: 'Built in 1931 on the site where thirty-six hidden Christians from Nagasaki died under torture in 1868, after the Meiji government briefly continued the ban. A sobering and little-known piece of history.' },
    { n: 'The SL Yamaguchi',
      d: 'A steam train running down from Shin-Yamaguchi on weekends in season.' }
  ],
  when: 'Spring and autumn. The Sagimai heron dance is in late July.',
  stay: 'Half a day, or a night.',
  move: 'Yamaguchi line from Shin-Yamaguchi, about two hours, or the steam service.',
  eat: 'Genji-maki, a sweet roll, and uzume-meshi, a rice dish that hides its ingredients under the rice, supposedly to disguise luxury from the authorities.'
},

/* ===================== TOTTORI ===================== */
'TTR-sand-dunes': {
  intro: [
    'The Tottori dunes are sixteen kilometres along the coast and up to two wide, with ridges rising fifty metres. They are the only large dune field in Japan and they exist because the Sendai river carries sand down from granite mountains and the winter wind off the Sea of Japan pushes it back ashore.',
    'They have been shrinking. Pine was planted inland for windbreaks after the war, which cut the sand supply, and vegetation has been encroaching since. Volunteers pull weeds to keep them bare.',
    'There are camels, which have nothing to do with anything and have been there since the 1960s. The sand museum next door carves enormous temporary sculptures from dune sand and water with no binder.'
  ],
  see: [
    { n: 'The main ridge',
      d: 'Walk up the largest dune, the uma no se, for the Sea of Japan from the top. Harder than it looks in loose sand.' },
    { n: 'Sand Museum',
      d: 'A themed exhibition each year, carved by international sculptors and destroyed at the end of the season. Genuinely impressive scale.' },
    { n: 'Sandboarding and paragliding',
      d: 'Operators on site. The paragliding is a short tandem flight off the ridge.' },
    { n: 'Sunrise and sunset',
      d: 'Early morning gives you ripple patterns in the sand before anyone walks on them.' },
    { n: 'The camels',
      d: 'Rides and photographs. Entirely inauthentic and nobody pretends otherwise.' }
  ],
  when: 'Year round. Summer sand is painfully hot; go early. Winter with snow on the dunes is strange and good.',
  stay: 'Two hours.',
  move: 'Bus from Tottori station, about twenty minutes.',
  eat: 'Matsuba crab in winter, which Tottori lands more of than any other prefecture.'
},

'TTR-daisen': {
  intro: [
    'Mount Daisen is 1,729 metres and from the west it looks so much like Fuji that it is called Hoki Fuji. From the north it is a shattered ridge, because the summit collapsed and the true peak, Kengamine, has been closed to climbers since the 1980s on safety grounds.',
    'It holds the largest beech forest in western Japan and has been a sacred mountain since the eighth century. Daisenji, the temple on its flank, once had over a hundred buildings and three thousand warrior monks.',
    'The standard climb goes to Misen at 1,709 metres, which is six metres short of the true summit and is as high as anyone is permitted. About three hours up.'
  ],
  see: [
    { n: 'The climb to Misen',
      d: 'Three hours up through beech, then a boardwalk across alpine scrub near the top. Well marked and busy on summer weekends.' },
    { n: 'Daisenji and Ogamiyama Shrine',
      d: 'A stone-paved approach through cedar, which is the longest natural stone path in Japan.' },
    { n: 'The beech forest',
      d: 'Especially good in late October. Several short trails from the temple area.' },
    { n: 'Skiing',
      d: 'Daisen has the oldest ski area in western Japan and a short reliable season.' },
    { n: 'The view from the west',
      d: 'From around Yonago, where the Fuji resemblance is obvious.' }
  ],
  when: 'June to October for climbing, late October for beech colour, winter for snow.',
  stay: 'A day, or a night at the base.',
  move: 'Bus from Yonago station, about fifty minutes.',
  eat: 'Daisen mushroom and local beef. Soba at the temple approach.'
},

'TTR-mizuki-shigeru': {
  intro: [
    'Mizuki Shigeru grew up in Sakaiminato and drew yokai, the spirits and monsters of Japanese folklore, for sixty years. He lost his left arm in New Guinea in the war, taught himself to draw with his right, and effectively created the modern popular understanding of yokai.',
    'The road from the station to the port has a hundred and seventy-seven bronze statues of his characters set into the pavement, and the shops along it have been remodelled to suit. Even the trains are painted.',
    'Sakaiminato is also the largest fishing port on the Sea of Japan coast and lands more crab than anywhere else in Japan, which is the other reason to be here.'
  ],
  see: [
    { n: 'Mizuki Shigeru Road',
      d: 'Eight hundred metres, a hundred and seventy-seven bronzes, lit at night when some of them are deliberately eerie.' },
    { n: 'Mizuki Shigeru Memorial Museum',
      d: 'On his life, the war, and the yokai. The war section is more affecting than the rest and is the reason to go.' },
    { n: 'The fish market',
      d: 'Crab from November to March, and the port auction.' },
    { n: 'The Yokai trains',
      d: 'The Sakai line runs painted trains between Yonago and Sakaiminato, each in a different character.' },
    { n: 'Mount Daisen',
      d: 'Visible across the water on a clear day.' }
  ],
  when: 'November to March for crab.',
  stay: 'Half a day.',
  move: 'Sakai line from Yonago, about forty-five minutes.',
  eat: 'Matsuba crab, and very good sushi at the port.'
},

'TTR-misasa': {
  intro: [
    'Misasa has one of the highest radon concentrations of any hot spring in the world, which it advertises. The theory is hormesis: very low doses of radiation stimulating repair mechanisms. It is contested, and the town has an unusually long-running epidemiological interest in its own residents.',
    'Above the town, Nageiredo is a small wooden hall wedged into a cliff face on Mount Mitoku, a National Treasure, with no agreed explanation of how it was built. The tradition is that En no Gyoja threw it there with his powers.',
    'The climb to it is a registered religious practice rather than a hike. They inspect your footwear at the gate and will sell you straw sandals if they refuse you, and the route uses tree roots, chains and bare rock.'
  ],
  see: [
    { n: 'The climb to Nageiredo',
      d: 'About ninety minutes return, with chains and roots. Soled shoes with grip required; no solo climbing permitted. Closed in rain and in winter.' },
    { n: 'Sanbutsuji',
      d: 'The temple at the base, where you register. There is a view of Nageiredo from the road below if the climb is beyond you.' },
    { n: 'Kawara Buro',
      d: 'A free open-air bath on the riverbed in the middle of the town, with no screen at all.' },
    { n: 'The radon water',
      d: 'Drunk as well as bathed in at several inns. Make of it what you will.' },
    { n: 'Misasa Bungaku',
      d: 'The town has a literary association and a street of old inns including one where a famous novel was written.' }
  ],
  when: 'April to November for the climb. The baths are year round.',
  stay: 'A night.',
  move: 'Bus from Kurayoshi station, about twenty minutes.',
  eat: 'Inn food, and Tottori crab in winter.'
},

/* ===================== YAMAGUCHI ===================== */
'YMG-motonosumi': {
  intro: [
    'A hundred and twenty-three red gates run down a grassy headland to a cliff above the Sea of Japan. The shrine was founded in 1955 after a local fisherman said a white fox appeared to him in a dream, and the gates were added over a decade from 1987.',
    'The donation box is mounted on the crossbar of the top gate, about six metres up. You throw a coin at it and if it goes in your wish is granted. Almost nobody manages it and the ground is covered in coins.',
    'CNN put it on a list of the most beautiful places in Japan in 2015 and the visitor numbers went from a handful to hundreds of thousands. It is on a remote coast with limited parking and the infrastructure is still catching up.'
  ],
  see: [
    { n: 'The gates',
      d: 'Walk down through them to the cliff and back up. Morning light is better and the coaches arrive from mid-morning.' },
    { n: 'The donation box',
      d: 'Six metres up on the top gate. Take several coins.' },
    { n: 'Ryuguno Shiofuki',
      d: 'A blowhole below the cliff that sends spray up thirty metres in a strong northwesterly.' },
    { n: 'Tsunoshima bridge',
      d: 'Forty minutes away, a 1,780 metre bridge to an island over water that is genuinely turquoise. One of the best drives in Japan.' },
    { n: 'The coast road',
      d: 'This whole stretch of Yamaguchi coast is worth driving rather than just targeting.' }
  ],
  when: 'Year round. Clear days for the water colour at Tsunoshima.',
  stay: 'Two hours.',
  move: 'A car is effectively necessary. Nagato-Furuichi is the nearest station and a long way off.',
  eat: 'Nagato is known for yellowtail and whale. Senzaki port has a good fish market.'
},

'YMG-kintaikyo': {
  intro: [
    'Kintaikyo is a wooden arch bridge of five spans, first built in 1673 after two previous bridges were washed away. The design distributes load through a stack of interlocking timber arches with no nails in the spans, and it held for two hundred and seventy-six years.',
    'It was destroyed by a typhoon in 1950 and rebuilt in 1953 using the original method and drawings. It is rebuilt again on a rotating schedule, span by span, by carpenters trained specifically for it.',
    'Walking over it is a strange experience because the arches are steep enough that you cannot see the next span until you are at the apex of the one you are on.'
  ],
  see: [
    { n: 'Crossing the bridge',
      d: 'Pay at either end. The steps on the arches are shallow and irregular on purpose.' },
    { n: 'Iwakuni Castle',
      d: 'Up a ropeway from the park, reconstructed in 1962 on a ridge, with the bridge directly below and the Inland Sea beyond.' },
    { n: 'Cherry blossom', t: 'early April',
      d: 'Three thousand trees along the riverbank under the bridge. One of the best bloom settings in western Japan.' },
    { n: 'Cormorant fishing', t: 'June to August',
      d: 'On the Nishiki river below the bridge, viewed from boats.' },
    { n: 'The white snakes',
      d: 'Iwakuni has an albino population of Japanese rat snake found nowhere else, protected since 1924, with a viewing facility.' }
  ],
  when: 'Early April for blossom, summer for the cormorants.',
  stay: 'Half a day.',
  move: 'Bus from Iwakuni or Shin-Iwakuni station, about twenty minutes. Fifty minutes from Hiroshima.',
  eat: 'Iwakuni-zushi, a pressed layered sushi cut into squares, and renkon, lotus root, which the area grows.'
},

'YMG-akiyoshido': {
  intro: [
    'Akiyoshido is the largest limestone cave in Japan, with about ten kilometres mapped and one kilometre open to the public. A river runs through it and the passages are large: the main chamber is up to eighty metres wide.',
    'Above it, Akiyoshidai is a karst plateau of white limestone pinnacles poking through grassland over about a hundred and thirty square kilometres. It looks like nothing else in Japan.',
    'The grassland is maintained by burning it off every February, a practice that has run for centuries and that stops the plateau reverting to forest. The burn is a local event and the blackened landscape afterwards is worth seeing in itself.'
  ],
  see: [
    { n: 'The cave',
      d: 'A kilometre of walkway, lit, with terraced pools called Hyakumaizara. Constant seventeen degrees, so it is a good summer option.' },
    { n: 'The adventure course',
      d: 'A side route with ladders and narrow passages, for a small extra fee and a helmet.' },
    { n: 'Akiyoshidai plateau',
      d: 'Walking trails among the limestone pinnacles. An observation deck gives the overview.' },
    { n: 'Yamayaki', t: 'mid-February',
      d: 'The annual burn-off. Hundreds of hectares set alight in a controlled sweep.' },
    { n: 'The Karst road',
      d: 'A drive across the plateau, which is the best way to understand the scale.' }
  ],
  when: 'Year round for the cave. February for the burn, spring and autumn for the plateau.',
  stay: 'Half a day.',
  move: 'Bus from Shin-Yamaguchi, about forty minutes.',
  eat: 'A few places at the cave entrance. Not a food destination.'
},

'YMG-hagi': {
  intro: [
    'Hagi was the capital of the Choshu domain, and Choshu plotted and then executed the overthrow of the shogunate. The men who did it were taught in a tiny wooden building here, the Shokasonjuku, by Yoshida Shoin, who was executed at twenty-nine.',
    'Among his students were two future prime ministers and the architects of the Meiji state. The schoolhouse is about fifty square metres and it is a National Treasure, which seems disproportionate until you consider what came out of it.',
    'The samurai quarter survived because Hagi was abandoned as a capital when the domain moved to Yamaguchi, so nothing was built over it. Earthen walls, orange trees and almost no traffic.'
  ],
  see: [
    { n: 'Shokasonjuku',
      d: 'The schoolhouse at Shoin Shrine. Small, plain, and the single most consequential room in modern Japanese history.' },
    { n: 'The castle town',
      d: 'Horiuchi and Jokamachi districts. Walls, white plaster, summer orange trees. Hire a bicycle; it is flat.' },
    { n: 'Hagi-yaki',
      d: 'Pottery with a soft crackled glaze that absorbs tea over years and changes colour. Several kilns open, and the phrase is that it is a pot that grows.' },
    { n: 'Hagi Castle ruins and Shizuki Park',
      d: 'Stone walls, a moat and a mountain behind. Good blossom in spring.' },
    { n: 'Tokoji',
      d: 'A temple with five hundred stone lanterns in rows behind it, donated by retainers for the Mori lords. Eerie at dusk.' }
  ],
  when: 'Year round. Spring and autumn are best for cycling.',
  stay: 'A night.',
  move: 'Bus from Shin-Yamaguchi, about ninety minutes. Not well served by rail.',
  eat: 'Summer orange in everything, and very good sea urchin and squid from the Sea of Japan.'
},

'YMG-shimonoseki': {
  intro: [
    'The Kanmon Strait between Honshu and Kyushu is seven hundred metres wide at its narrowest. In 1185 the Taira clan was destroyed here in a sea battle, and the six-year-old emperor was taken into the water by his grandmother rather than be captured. The clan effectively ended in an afternoon.',
    'The crabs in the strait have a pattern on their shells that resembles a face, and the local belief is that they are the drowned Taira warriors.',
    'Shimonoseki handles about eighty per cent of Japan’s fugu trade. Pufferfish is lethal if prepared badly and licensed chefs train for years; the market auction here is conducted by hand signals inside a bag so the bids stay private.'
  ],
  see: [
    { n: 'Karato Market',
      d: 'Friday to Sunday, stalls sell sushi and fugu by the piece and you eat it on the quay. The best market eating in western Japan.' },
    { n: 'The Kanmon tunnel walk',
      d: 'A pedestrian tunnel under the strait, seven hundred and eighty metres, connecting Honshu and Kyushu. Free, takes fifteen minutes, and there is a line on the floor marking the prefectural border.' },
    { n: 'Akama Shrine',
      d: 'Vermilion, dedicated to the drowned child emperor, with a hall of lute-playing monk statues connected to the Hoichi the Earless ghost story.' },
    { n: 'Kaikyokan aquarium',
      d: 'With about a hundred species of pufferfish, which is the largest such collection anywhere.' },
    { n: 'Mojiko',
      d: 'Across the water on the Kyushu side, a district of Meiji brick port buildings.' }
  ],
  when: 'October to March for fugu season.',
  stay: 'A night.',
  move: 'Shin-Shimonoseki on the shinkansen, then a local train. Buses and the tunnel to Kyushu.',
  eat: 'Fugu, in sashimi cut thin enough to read through, in a hotpot, and the fins grilled and steeped in hot sake.'
},

/* ===================== KAGAWA ===================== */
'KGW-ritsurin': {
  intro: [
    'Ritsurin took about a hundred years to build, finished in 1745, and it is not on the official list of the three great gardens of Japan. A great many people, including a Michelin guide that gave it three stars, think it should be and that one of the three should make way.',
    'It has six ponds and thirteen landscaped hills across seventy-five hectares, with Mount Shiun behind it as borrowed scenery. The pines are clipped individually and there are about a thousand of them.',
    'The best way to see it is from a boat on the south pond, which gets you the angle the garden was designed around.'
  ],
  see: [
    { n: 'The south garden',
      d: 'The older, more formal half, with the main ponds and the Engetsukyo arched bridge.' },
    { n: 'Hiraiho',
      d: 'A clipped hill shaped to resemble Fuji, with a path up for the overview of the whole south garden.' },
    { n: 'Kikugetsu-tei',
      d: 'A teahouse over the water from the 1640s. Pay the extra, sit on the tatami with a bowl of matcha and look out.' },
    { n: 'The boat',
      d: 'Thirty minutes on the south pond, poled, with the composition changing as you move.' },
    { n: 'Early morning',
      d: 'Opens at sunrise. The first hour is the best and costs the same.' }
  ],
  when: 'Year round. Lotus in July, autumn colour in late November with evening illumination.',
  stay: 'Two hours.',
  move: 'Ritsurin-koen-kitaguchi station, or a bus from Takamatsu station.',
  eat: 'Udon, obviously, and there is a stand in the garden.'
},

'KGW-kotohira': {
  intro: [
    'Konpira-san has seven hundred and eighty-five steps to the main shrine and another five hundred and eighty-three to the inner one. It is dedicated to a deity of seafaring and sailors have come here for safe passage for centuries, leaving model ships and photographs.',
    'There are palanquin bearers partway up who will carry you, which costs a substantial amount and is a service with a long history. Most people walk and regret it around step five hundred.',
    'At the top there is a view over the Sanuki plain with its distinctive conical hills, and a shrine complex that includes a hall painted with Maruyama Okyo tiger screens.'
  ],
  see: [
    { n: 'The climb',
      d: 'Seven hundred and eighty-five steps to the main shrine. Shaded, with shops and resting points. Allow an hour.' },
    { n: 'The inner shrine',
      d: 'Another five hundred and eighty-three steps, much quieter, and the view is better.' },
    { n: 'The Shoin',
      d: 'Okyo’s painted screens including the tigers, which he painted without ever seeing a tiger.' },
    { n: 'Kanamaruza',
      d: 'The oldest surviving kabuki theatre in Japan, from 1835, with the revolving stage mechanism operated by hand from underneath. You can go below and see it.' },
    { n: 'The ship offerings',
      d: 'Model vessels and photographs left by sailors, including modern tankers and a space mission.' }
  ],
  when: 'Year round. The kabuki festival is in April.',
  stay: 'Half a day.',
  move: 'Kotoden or JR to Kotohira, about an hour from Takamatsu.',
  eat: 'Sanuki udon at the base, and the approach has a famous shop selling it with a raw egg.'
},

'KGW-shodoshima': {
  intro: [
    'Shodoshima grows olives, which is not something associated with Japan. Trees were planted here in 1908 as a government experiment and this is the only place in the country where it worked. There are now olive groves on terraced slopes above the sea.',
    'It also makes soy sauce in cedar barrels, with about twenty breweries still using the traditional method, and somen noodles dried in the wind.',
    'Kankakei gorge is reached by a ropeway and is ranked among the most beautiful gorges in Japan, particularly in November. And there is Angel Road, a sandbar to a small island that appears twice a day at low tide.'
  ],
  see: [
    { n: 'Kankakei gorge',
      d: 'Ropeway up through a gorge of eroded volcanic rock. Late November for colour, which is among the best in the Inland Sea.' },
    { n: 'Angel Road',
      d: 'A tidal sandbar to a small island. Check the tide table posted at the car park. Couples who cross it together are supposed to stay together.' },
    { n: 'The soy sauce district',
      d: 'Around Hishio no Sato, with cedar barrel breweries and a strong smell throughout. Several open for tours.' },
    { n: 'The olive park',
      d: 'With a Greek windmill and a great many visitors photographing broomsticks because of a film connection.' },
    { n: 'Nakayama rice terraces',
      d: 'Eight hundred terraced paddies on a hillside, with a kabuki stage where villagers perform twice a year.' }
  ],
  when: 'Late November for the gorge. Summer for the olive harvest preparation.',
  stay: 'Two days with a car.',
  move: 'Ferry from Takamatsu, about an hour, or from Himeji and Kobe. A car or scooter is needed on the island.',
  eat: 'Somen, olive products, and soy sauce ice cream, which is better than it sounds.'
},

'KGW-takamatsu': {
  intro: [
    'Kagawa is the smallest prefecture in Japan and it eats more udon per head than anywhere else by a wide margin. There are around six hundred udon shops in a prefecture of under a million people.',
    'Sanuki udon is thick, square-edged and chewy, and the chew is the point. Many shops are self-service: you take a bowl, choose the noodles, add your own broth from a tap, pick toppings from a counter and pay at the end. Some are attached to the owner’s house and open at six in the morning.',
    'Takamatsu is also the ferry hub for the Inland Sea art islands, which is the other reason most visitors are here.'
  ],
  see: [
    { n: 'An udon crawl',
      d: 'Three or four shops in a morning is normal. Taxi companies run udon tours. Yamagoe and Nakamura are the classic self-service shops out of town.' },
    { n: 'Ritsurin Garden',
      d: 'In the city and the best thing in it.' },
    { n: 'Tamamo Park',
      d: 'The castle ruins on the waterfront, one of only three castles in Japan with seawater moats, which held sea bream. You can feed them.' },
    { n: 'The ferry port',
      d: 'Boats to Naoshima, Teshima, Shodoshima and the smaller islands.' },
    { n: 'Yashima',
      d: 'A tableland above the city, site of a 1185 battle, with a temple and a view over the Inland Sea.' }
  ],
  when: 'Year round. Triennale years bring crowds to the ferries.',
  stay: 'A night, as a base for the islands.',
  move: 'Marine Liner from Okayama, about an hour over the Seto Ohashi bridge.',
  eat: 'Udon for breakfast, lunch and if necessary dinner. Also bone-in chicken thigh grilled whole, which is a local speciality.'
},

'KGW-naoshima-kagawa': {
  intro: [
    'Megijima and Ogijima are two small islands twenty to forty minutes out of Takamatsu, and they get a fraction of the attention Naoshima does despite holding Setouchi Triennale works year round.',
    'Ogijima is a village of houses stacked up a steep slope with lanes too narrow for cars, and a population under two hundred. The school reopened in 2014 after closing, which was treated locally as a significant victory.',
    'Megijima has a cave that is claimed as the home of the ogres from the Momotaro folk tale, which was actually excavated and promoted in 1914 and has been treated as tradition since.'
  ],
  see: [
    { n: 'Ogijima',
      d: 'Walk the lanes. The Ogijima Soul installation at the port, a roof with letters from world alphabets casting shadows, is the signature piece.' },
    { n: 'Megijima',
      d: 'The ogre cave, reached by a bus up the hill, and a beach with pine. Also good Triennale works in the village.' },
    { n: 'The ferries',
      d: 'Several a day, and the schedule determines everything. Both islands can be done in one day with care.' },
    { n: 'Ogijima lighthouse',
      d: 'An 1895 granite lighthouse on the far side of the island, about forty minutes on foot.' }
  ],
  when: 'Year round. Triennale years in spring, summer and autumn.',
  stay: 'A day.',
  move: 'Ferry from Takamatsu. Check return times carefully; the last boat is early.',
  eat: 'A handful of small cafes with limited hours. Carry something.'
},

/* ===================== TOKUSHIMA ===================== */
'TKS-iya': {
  intro: [
    'The Iya valley is a gorge in the mountains of central Shikoku, and it was remote enough that defeated Heike warriors are said to have hidden here after 1185 and never left. Whether or not that is true, the valley was effectively cut off until roads were cut in the twentieth century.',
    'The vine bridges were the crossings. Woven from mountain vine, rebuilt every three years, with gaps between the planks wide enough to see the river fifteen metres below. The story is that they could be cut quickly if pursuers came.',
    'Three survive. One, Kazurabashi, is on the tourist route and gets long queues; the two Oku-Iya bridges further up the valley get almost nobody.'
  ],
  see: [
    { n: 'Oku-Iya double vine bridges',
      d: 'A husband and wife pair, deeper in the valley, with a hand-pulled cable cart alongside. Far better than the main bridge and almost empty.' },
    { n: 'Kazurabashi',
      d: 'The famous one. Forty-five metres, and it moves. Queues in season.' },
    { n: 'Hotel Iya Onsen',
      d: 'A cable car runs from the hotel down a hundred and seventy metres of cliff to a riverside bath. Day use available.' },
    { n: 'The Peeing Boy statue',
      d: 'A small bronze on a two-hundred-metre cliff edge above the gorge, placed where local children used to dare each other.' },
    { n: 'Chiiori',
      d: 'A three-hundred-year-old thatched house restored by Alex Kerr from the 1970s, now a guesthouse. His book Lost Japan is largely about this valley.' }
  ],
  when: 'Late October to November for colour. Summer for the river.',
  stay: 'A night.',
  move: 'Oboke station on the Dosan line, then infrequent buses. A car is genuinely the only practical option for the upper valley.',
  eat: 'Iya soba, cut short and coarse because the buckwheat is grown on steep ground. Deko mawashi, skewers of tofu and potato with miso, turned over a hearth.'
},

'TKS-naruto': {
  intro: [
    'The Naruto strait between Shikoku and Awaji is one and a third kilometres wide, and the tide moves through it at up to twenty kilometres an hour. The difference in water level between the two sides can reach a metre and a half, which produces whirlpools up to twenty metres across.',
    'They are not constant. They form around the peak of the tide, which means the timing matters more than the day. The tourist office publishes the schedule and planning around it is essential.',
    'The biggest occur at the spring tides around the March and September equinoxes.'
  ],
  see: [
    { n: 'The whirlpool boats',
      d: 'From Naruto on the Shikoku side or Fukura on Awaji. The smaller boats with underwater observation rooms get closer.' },
    { n: 'Uzu no Michi',
      d: 'A walkway inside the bridge girders, four hundred and fifty metres out, with glass floor panels directly above the whirlpools.' },
    { n: 'The timing',
      d: 'Check the tidal schedule first and build the day around it. Outside the window there is nothing much to see.' },
    { n: 'Otsuka Museum of Art',
      d: 'A thousand full-size ceramic reproductions of Western masterpieces, including the Sistine Chapel ceiling. Strange, enormous and oddly compelling.' },
    { n: 'Temple one',
      d: 'Ryozenji, the start of the eighty-eight temple Shikoku pilgrimage, is nearby.' }
  ],
  when: 'March and September equinox spring tides for the largest whirlpools.',
  stay: 'Half a day.',
  move: 'Bus from Naruto station to the observation point and boat piers.',
  eat: 'Naruto wakame and sea bream, which fight the current and are correspondingly firm.'
},

'TKS-awa-odori': {
  intro: [
    'Awa Odori has run for over four hundred years and it is the largest dance festival in Japan, drawing about 1.2 million people to a city of a quarter of a million over four days in August.',
    'The dancers move in groups called ren, with distinct male and female styles: women in straw hats and geta with small precise steps, men low and loose. The song says that fools dance and fools watch, so you may as well dance.',
    'Visitors can join. There are niwaka-ren, improvised groups, that anyone can walk into, and this is actively encouraged rather than tolerated.'
  ],
  see: [
    { n: 'Awa Odori', t: '12 to 15 August',
      d: 'Paid stands for the big troupes, free street performances everywhere else. The free ones are better.' },
    { n: 'Joining a niwaka-ren',
      d: 'Groups form at set points in the evening and take anybody. The steps take about four minutes to learn.' },
    { n: 'Awa Odori Kaikan',
      d: 'Year-round demonstrations with audience participation, and a ropeway up Mount Bizan behind it.' },
    { n: 'Awa indigo',
      d: 'Tokushima was the centre of Japanese indigo dyeing. The Ai no Yakata museum shows the fermentation process and runs dyeing workshops.' },
    { n: 'Mount Bizan',
      d: 'Above the city, with a view over the delta and the Inland Sea.' }
  ],
  when: '12 to 15 August, and accommodation across the whole region books out months ahead.',
  stay: 'Two nights during the festival.',
  move: 'Limited express from Okayama via the Seto bridge, about two hours.',
  eat: 'Tokushima ramen, with a dark pork broth and often a raw egg on top. Sudachi citrus on everything.'
},

'TKS-kamikatsu': {
  intro: [
    'Kamikatsu declared a zero waste policy in 2003 and sorts household waste into forty-five categories. There is no rubbish collection; residents bring everything to a central station and sort it themselves. The village diverts about eighty per cent from landfill and incineration.',
    'It has not reached zero, and the people running it are candid about that. The remaining twenty per cent is mostly things that cannot be recycled at all, which has shifted the argument towards producers.',
    'The other local industry is irodori: elderly residents, mostly women in their seventies and eighties, growing and gathering leaves and flowers used as garnish in high-end restaurants, coordinated by tablet. It turned a declining village economy around and has been widely studied.'
  ],
  see: [
    { n: 'The Zero Waste Center',
      d: 'Shaped like a question mark from above, built from reclaimed windows and materials. There is a shop where residents leave unwanted items for anyone to take.' },
    { n: 'Why Hotel',
      d: 'Four rooms attached to the centre, built on the same principles, where you sort your own waste during the stay.' },
    { n: 'The irodori business',
      d: 'Explained at the centre. The economics of it are genuinely interesting.' },
    { n: 'RISE &amp; WIN brewing',
      d: 'A brewpub built from salvaged materials with a facade of reclaimed windows.' },
    { n: 'The terraced rice fields',
      d: 'Kashihara terraces, worked on steep ground, with a viewpoint.' }
  ],
  when: 'Year round. Autumn for the leaves the irodori business harvests.',
  stay: 'Half a day, or a night at the hotel.',
  move: 'A car from Tokushima, about an hour. Buses are very limited.',
  eat: 'The brewpub, and a small cafe at the centre.'
},

/* ===================== EHIME ===================== */
'EHM-dogo': {
  intro: [
    'Dogo claims to be the oldest hot spring in Japan, with mentions in the Nihon Shoki and a legend about a white heron healing its leg in the water. Whether or not it is the oldest, it has been in continuous use for a very long time.',
    'The Honkan bathhouse was built in 1894, three storeys of wood with a heron on the roof, and it has a chamber reserved for the imperial family that is the only one of its kind still in existence. You can tour it even if you do not bathe.',
    'Soseki taught in Matsuyama and set Botchan here, and the building was one of the references Studio Ghibli used for the bathhouse in Spirited Away. It has been under phased restoration for years and parts have been open throughout.'
  ],
  see: [
    { n: 'Dogo Onsen Honkan',
      d: 'The 1894 building. Several ticket tiers, the higher ones including tea and a yukata in a tatami room upstairs afterwards, which is the proper way to do it.' },
    { n: 'The Yushinden',
      d: 'The imperial bath chamber, toured separately. Built in 1899 and used only a handful of times.' },
    { n: 'Asuka no Yu',
      d: 'A newer bathhouse next door in Asuka-period style, less crowded and with better facilities.' },
    { n: 'The arcade and the clock',
      d: 'A covered shopping street to the bathhouse, with a mechanical clock that performs on the hour with Botchan characters.' },
    { n: 'Botchan dango',
      d: 'Three-coloured dumplings on a skewer, named for the novel, sold everywhere.' }
  ],
  when: 'Year round. Check which parts of the Honkan are open; the restoration has been phased.',
  stay: 'A night.',
  move: 'Tram from Matsuyama station, about twenty minutes.',
  eat: 'Taimeshi, sea bream with rice, in two local versions: one cooked together, one raw over rice with egg.'
},

'EHM-matsuyama': {
  intro: [
    'Matsuyama Castle sits on a hill in the middle of the city with a chairlift and a ropeway up to it. It is one of the twelve original keeps and one of the most complete, with twenty-one structures designated important cultural properties.',
    'It is also one of the few built after the Tokugawa settled the country, finished in 1627, which means it was designed with both defence and administration in mind and has an unusual layered gate system.',
    'The city is a haiku centre. Masaoka Shiki, who effectively created modern haiku, was born here, and there are post boxes around the city where you can drop a poem.'
  ],
  see: [
    { n: 'The castle',
      d: 'Chairlift or ropeway up, then a walk through the gate system. The keep is original and the view takes in the Inland Sea.' },
    { n: 'Ninomaru garden',
      d: 'On the site of the second bailey, with the foundations of the buildings marked out as water features and planting.' },
    { n: 'Shiki Memorial Museum',
      d: 'On the poet and the reform of haiku. Better than a single-poet museum usually is.' },
    { n: 'The Botchan train',
      d: 'A replica of the 1888 steam tram that Soseki wrote about, running through the city with a working turntable at the terminus.' },
    { n: 'Dogo Onsen',
      d: 'Twenty minutes by tram.' }
  ],
  when: 'Year round. Blossom at the castle in early April.',
  stay: 'A night.',
  move: 'Limited express from Okayama, about two and a half hours. Matsuyama airport.',
  eat: 'Taimeshi, jakoten fish cake, and mikan citrus, which Ehime grows more of than anywhere.'
},

'EHM-uchiko': {
  intro: [
    'Uchiko got rich on wax. Sumac berries were pressed to make a hard vegetable wax used for candles, hair dressing and cosmetics, and in the nineteenth century this town supplied a large part of the country and exported to Europe.',
    'The money built Yokaichi, a street of cream-plastered merchant houses with ornate plaster relief and lattice fronts, which survives almost entirely intact for about six hundred metres.',
    'The Uchikoza theatre, built in 1916 for kabuki, was slated for demolition in the 1980s and saved by residents. It has a revolving stage, trapdoors and a hanamichi walkway, all hand-operated, and you can go under the stage and see the machinery.'
  ],
  see: [
    { n: 'Yokaichi street',
      d: 'Six hundred metres of merchant houses. The Kami-Haga residence is open and includes the wax workshop behind it.' },
    { n: 'Uchikoza',
      d: 'The 1916 theatre. When no performance is on you can walk the stage and go underneath to see the revolve mechanism.' },
    { n: 'The wax museum',
      d: 'At Kami-Haga, showing the pressing process and the candles, which are still made by one family.' },
    { n: 'Omori Warosoku',
      d: 'The last traditional candle maker in the town, working by hand in a shop on the street. You can watch.' },
    { n: 'Cycling to Ozu',
      d: 'Downstream along the river, about twenty kilometres.' }
  ],
  when: 'Year round.',
  stay: 'Half a day.',
  move: 'Uchiko station on the Yosan line, about twenty-five minutes from Matsuyama by limited express.',
  eat: 'Simple local places. Ehime citrus in everything.'
},

'EHM-shimanami-ehime': {
  intro: [
    'Imabari is the Shikoku end of the Shimanami Kaido and sits under the Kurushima Kaikyo Bridge, which was the world’s first triple suspension bridge when it opened in 1999 and is four kilometres long.',
    'The strait below is one of the three fastest tidal currents in Japan, which is why the bridge needed that design and why the Murakami, a clan of sea lords who controlled these waters in the medieval period, could operate as they did. They are usually called pirates and were closer to a licensed navy.',
    'Imabari also makes most of Japan’s towels, a trade built on soft local water, and the quality is taken seriously enough that there is a certification mark.'
  ],
  see: [
    { n: 'The Kurushima bridge',
      d: 'Cycle or walk the cycle lane. The spiral approach ramp is a loop you climb to bridge level.' },
    { n: 'Imabari Castle',
      d: 'One of only three Japanese castles with a seawater moat, so there are sea fish in it. Reconstructed.' },
    { n: 'Murakami Kaizoku Museum',
      d: 'On Oshima, about the sea lords, with armour, documents and the flags they issued to ships as safe conduct.' },
    { n: 'Towel Museum',
      d: 'Larger and stranger than expected, with a working production line and a gallery.' },
    { n: 'Kirosan observatory',
      d: 'On Oshima, by Kengo Kuma, sunk into the hillside so it is invisible from a distance, looking down at the bridge.' }
  ],
  when: 'Spring and autumn for cycling.',
  stay: 'A night at either end of a Shimanami ride.',
  move: 'Imabari station on the Yosan line. Bicycle hire at the terminal.',
  eat: 'Yakitori served Imabari style, grilled on a hot plate rather than over charcoal, which locals will defend.'
},

'EHM-ozu': {
  intro: [
    'Ozu Castle keep was demolished in 1888 and rebuilt in 2004 entirely in wood, using the original construction drawings, a scale model made in the 1890s and surviving photographs. No concrete, no steel, traditional joinery.',
    'That makes it one of a very small number of accurate wooden reconstructions in Japan, and the difference when you walk in is immediate. You can also stay in it: the castle operates as accommodation for two guests a night, which is unique.',
    'The town below has a preserved merchant quarter and a villa, Garyu Sanso, built by a wax trader over ten years with obsessive attention to detail, including a window shaped like a crescent moon that casts a specific shadow.'
  ],
  see: [
    { n: 'The keep',
      d: 'Wooden, with the joinery exposed and the smell of new timber still faintly there. The contrast with a concrete reconstruction is the point.' },
    { n: 'Garyu Sanso',
      d: 'A villa above the river with a teahouse cantilevered over the water. Every detail is deliberate and a guide will point out things you would never notice.' },
    { n: 'Cormorant fishing', t: 'June to September',
      d: 'On the Hiji river, with boats alongside.' },
    { n: 'The merchant quarter',
      d: 'Ohanahan street, with plastered walls and a few open houses.' },
    { n: 'Staying in the castle',
      d: 'Two guests a night, with a costumed arrival and a private dinner. Extremely expensive and genuinely singular.' }
  ],
  when: 'Summer for cormorant fishing. Year round otherwise.',
  stay: 'Half a day.',
  move: 'Iyo-Ozu station, forty minutes from Matsuyama.',
  eat: 'River fish, and local citrus.'
},

/* ===================== KOCHI ===================== */
'KCH-kochi-castle': {
  intro: [
    'Kochi Castle is the only one in Japan where both the keep and the lord’s residence survive together. Everywhere else, if the keep is original the palace is gone, and vice versa. Here you can walk from the living quarters into the defensive tower.',
    'It burned in 1727 and was rebuilt by 1753, which is the structure standing now. The rebuilding deliberately copied the original rather than modernising it, which is why it looks older than its date.',
    'The Sunday market on the street leading to the castle has run for over three hundred years, stretching about a kilometre with around four hundred stalls.'
  ],
  see: [
    { n: 'The keep and the palace',
      d: 'Walk from the Kaitokukan residence straight into the tower. The combination exists nowhere else.' },
    { n: 'The Sunday market',
      d: 'From early morning on Otesuji. Vegetables, knives, plants, and a great deal of eating.' },
    { n: 'Hirome Market',
      d: 'A covered hall of about sixty stalls with communal tables, open daily, where the katsuo is seared in front of you.' },
    { n: 'Katsurahama',
      d: 'The beach with the Sakamoto Ryoma statue, twenty minutes out.' },
    { n: 'Yosakoi', t: 'early August',
      d: 'A dance festival invented in 1954 in response to Tokushima’s Awa Odori, now with two hundred teams and spread nationwide.' }
  ],
  when: 'Year round. August for Yosakoi.',
  stay: 'A night.',
  move: 'Limited express from Okayama, about two and a half hours. Kochi airport.',
  eat: 'Katsuo no tataki, bonito seared over burning rice straw so the outside chars and the inside stays raw, eaten with salt rather than sauce. The straw matters and locals will insist on it.'
},

'KCH-shimanto': {
  intro: [
    'The Shimanto is called the last clear stream in Japan, which is a title rather than a measurement, and it comes from there being no dam on the main channel. There are dams on tributaries, so the claim is not absolute and locals will explain the distinction at length.',
    'The river has forty-seven chinkabashi, low bridges with no railings, built deliberately to be submerged when the river floods rather than swept away. Driving across one is unnerving because there is nothing at the edge.',
    'It is a hundred and ninety-six kilometres long and the valley is almost entirely rural. Canoeing, cycling and swimming are what people do here.'
  ],
  see: [
    { n: 'The chinkabashi',
      d: 'Sada and Iwama are the best known. Walk one; driving across is for the confident.' },
    { n: 'Canoeing',
      d: 'Several operators run half-day trips on flat water. The best way to see the river.' },
    { n: 'Cycling the valley',
      d: 'A route along the lower river, flat and quiet, with hire at Nakamura.' },
    { n: 'The Shimanto Torokko train',
      d: 'An open carriage on the Yodo line along the river in season.' },
    { n: 'Aonae and the river food',
      d: 'Ayu, eel and river shrimp, caught by methods that are still licensed and seasonal.' }
  ],
  when: 'Summer for the water, autumn for the valley.',
  stay: 'A night.',
  move: 'Nakamura station, about ninety minutes from Kochi by limited express. A car helps.',
  eat: 'Ayu grilled with salt, and aonori seaweed from the river mouth.'
},

'KCH-katsurahama': {
  intro: [
    'Katsurahama is a crescent of sand backed by pine with a small shrine on a rock at one end, and a statue of Sakamoto Ryoma looking out to sea from the headland above it.',
    'Ryoma was a low-ranking samurai from Kochi who brokered the alliance between Satsuma and Choshu that brought down the shogunate, then was assassinated in Kyoto at thirty-one, a month before the restoration he had engineered. He is the most popular historical figure in Japan.',
    'Swimming is prohibited. The current here is severe and the prohibition is not decorative.'
  ],
  see: [
    { n: 'The Ryoma statue',
      d: 'Thirteen metres including the base, facing the Pacific. A temporary scaffold is put up twice a year so you can stand at his eye level.' },
    { n: 'Sakamoto Ryoma Memorial Museum',
      d: 'On the headland, holding his letters, which are unusually readable and funny.' },
    { n: 'Umi no Terrace',
      d: 'A shop and food complex with a tosa dog fighting arena attached, which is a cultural practice some visitors will want to avoid.' },
    { n: 'The beach',
      d: 'Walk it, do not swim it. The pine and the rock shrine at the end are the picture.' },
    { n: 'Moonrise',
      d: 'The name means moon beach and it was traditionally a moon-viewing spot.' }
  ],
  when: 'Year round.',
  stay: 'Two hours.',
  move: 'Bus from Kochi station, about thirty minutes.',
  eat: 'Katsuo at the terrace complex.'
},

'KCH-muroto': {
  intro: [
    'Cape Muroto is a UNESCO Global Geopark because the land here is rising. The seabed is being pushed up by the collision of plates at a rate of about two millimetres a year, and earthquakes lift it in jumps: the 1946 Nankai quake raised the cape over a metre in a few minutes.',
    'You can see it. There are wave-cut terraces well above the current sea level, and a shoreline of uplifted seabed with fossils in it.',
    'Kobo Daishi is said to have attained enlightenment in a cave here at nineteen, looking out at the sky and the sea, and to have taken his name from those two words. The cave is open and the view from inside is exactly the two things.'
  ],
  see: [
    { n: 'Mikurodo cave',
      d: 'Where Kobo Daishi meditated. From inside, the opening frames only sky and sea, which is the point of the name.' },
    { n: 'The uplifted shoreline',
      d: 'A walking path along the rock platform with geological signage. Turban shell fossils well above the waterline.' },
    { n: 'Hotsumisakiji',
      d: 'Temple twenty-four of the Shikoku pilgrimage, on the headland above.' },
    { n: 'The lighthouse',
      d: 'With one of the largest lenses in Japan, visible for about forty-nine kilometres.' },
    { n: 'Deep sea water',
      d: 'Drawn from off the cape and used in local products including salt and a spa.' }
  ],
  when: 'Year round. The coast is exposed and windy.',
  stay: 'Half a day.',
  move: 'Bus from Nahari, the end of the Gomen-Nahari line, about an hour.',
  eat: 'Kinmedai and local deep-water fish.'
},

/* ===================== FUKUOKA ===================== */
'FKO-fukuoka-city': {
  intro: [
    'Fukuoka is closer to Seoul than to Tokyo and it feels it. The city is compact, the airport is a five-minute subway ride from the centre, and the food culture is built around eating standing up in the street.',
    'The yatai are the thing. About a hundred and fifty mobile stalls set up along the Naka river and in Tenjin from early evening, each seating maybe eight people on stools, serving ramen, grilled chicken and whatever the owner feels like making. The licences are hereditary and the city has worked hard to keep the system alive.',
    'Hakata ramen is the local style: thin straight noodles in a pork bone broth boiled until it turns opaque. You specify noodle firmness and order kaedama, a second helping of noodles, into the remaining broth.'
  ],
  see: [
    { n: 'The yatai', t: 'from about 6pm',
      d: 'Nakasu island has the highest concentration. Sit down, order, talk to whoever is next to you. Cash only at most, and they fold up around two in the morning.' },
    { n: 'Canal City and Tenjin',
      d: 'Shopping and underground arcades. Functional rather than remarkable, but the basement food floors are excellent.' },
    { n: 'Kushida Shrine and the Yamakasa floats',
      d: 'The float from the July festival is kept on display. They are about ten metres tall and are raced through the streets at dawn on the fifteenth.' },
    { n: 'Ohori Park',
      d: 'A large pond that was the castle moat, with a path round it and a Japanese garden on one side.' },
    { n: 'Kyushu National Museum',
      d: 'At Dazaifu, about forty minutes out, and organised around Japan’s exchange with the rest of Asia rather than its isolation.' },
    { n: 'Itoshima',
      d: 'An hour west for the coast.' }
  ],
  when: 'Year round. Hakata Gion Yamakasa runs 1 to 15 July with the dawn race on the final morning.',
  stay: 'Two nights, and a good base for the whole of northern Kyushu.',
  move: 'Shinkansen five hours from Tokyo, two and a half from Osaka. The subway runs from the airport to Hakata in five minutes.',
  eat: 'Hakata ramen, motsunabe offal hotpot, mentaiko spiced cod roe, and goma saba, raw mackerel with sesame, which is safe to eat raw here because of how fast the fish gets to market.'
},

'FKO-dazaifu': {
  intro: [
    'Sugawara no Michizane was a scholar and minister who was exiled to Dazaifu by political rivals and died here in 903. A series of disasters then struck Kyoto, including lightning that hit the palace, and the court concluded he was taking revenge.',
    'They deified him, built this shrine over his grave, and he became Tenjin, the god of learning. Every February and March the approach fills with students praying to pass exams, and the plaque racks hold thousands of wooden prayers naming specific universities.',
    'Six thousand plum trees grow in the grounds, including one by the main hall that legend says flew here from Kyoto to follow him. Plum, not cherry, is the flower of this place and it blooms in February.'
  ],
  see: [
    { n: 'Dazaifu Tenmangu',
      d: 'Vermilion halls and the plum groves. The main hall has been under restoration with a temporary structure designed by Sou Fujimoto that has a forest growing on the roof.' },
    { n: 'The plum', t: 'February to early March',
      d: 'Six thousand trees, and far fewer visitors than cherry season anywhere else.' },
    { n: 'Komyozenji',
      d: 'A small Zen temple behind the shrine with two gardens, one of raked gravel and one of moss and maple. Almost nobody walks the extra three minutes to reach it.' },
    { n: 'Kyushu National Museum',
      d: 'A wave-roofed building up an escalator through the hillside. One of only four national museums in Japan and the newest.' },
    { n: 'The Starbucks',
      d: 'On the approach, built by Kengo Kuma from two thousand interwoven wooden battens. Worth looking at even if you do not drink coffee.' },
    { n: 'The old government ruins',
      d: 'Dazaifu was the seat of Kyushu administration for centuries. The foundation stones of the headquarters sit in a field a bus ride away.' }
  ],
  when: 'February for plum. Exam season from January to March for the atmosphere.',
  stay: 'Half a day from Fukuoka.',
  move: 'Nishitetsu line from Tenjin, about thirty minutes with a change at Futsukaichi.',
  eat: 'Umegae mochi, a grilled rice cake with red bean, sold hot along the approach by about a dozen shops.'
},

'FKO-itoshima': {
  intro: [
    'Itoshima is a peninsula west of Fukuoka that has quietly become where the city goes at the weekend. Surf beaches, a coast road, cafes in converted farm buildings and a lot of young people who moved out of Tokyo.',
    'Sakurai Futamigaura has a white torii standing in the sea with two rocks joined by a sacred rope behind it, and at sunset around the equinoxes the sun sets directly between them.',
    'It is also a pottery area, with kilns scattered through the hills, and there is a surprising amount of good bread and coffee for a rural coast.'
  ],
  see: [
    { n: 'Sakurai Futamigaura',
      d: 'The white torii and the married rocks. Sunset, and specifically around the spring and autumn equinoxes when the sun lines up.' },
    { n: 'The coast road',
      d: 'Drive or cycle from Nijinomatsubara round to Keya. Beach cafes most of the way.' },
    { n: 'Keya no Oto',
      d: 'A basalt sea cave in columnar rock, about sixty metres deep, reached by boat from Keya port in calm weather.' },
    { n: 'Sasaguri and the kilns',
      d: 'Several working potteries in the hills, mostly open with little ceremony.' },
    { n: 'Palm Beach and the oyster huts', t: 'November to March',
      d: 'Fishermen set up temporary shacks and grill oysters you buy by the kilo. Bring your own seasoning; locals do.' }
  ],
  when: 'Year round. Oyster huts in winter, swimming in summer, equinox for the torii.',
  stay: 'A day, or a night in a guesthouse.',
  move: 'A car is best. Trains to Chikuzen-Maebaru then a bus, but services are thin.',
  eat: 'Oysters in winter, and the cafe scene, which is genuinely good rather than just convenient.'
},

'FKO-kokura': {
  intro: [
    'Kokura Castle was the reason Kitakyushu existed and it is also, uncomfortably, the reason Nagasaki was bombed. Kokura was the primary target on 9 August 1945 and cloud and smoke over the city meant the aircraft diverted to the secondary target.',
    'The keep is a 1959 reconstruction with an unusual feature: the top floor overhangs the one below rather than stepping in, which is called the karazukuri style and is rare.',
    'Kitakyushu is a steel city and it has one of the best industrial night views in Japan from Mount Sarakura, along with a retro port district at Mojiko.'
  ],
  see: [
    { n: 'Kokura Castle and garden',
      d: 'The reconstruction, with a decent museum inside and a separate Japanese garden alongside that is better than the keep.' },
    { n: 'Tanga Market',
      d: 'A long covered market, informal and still used by residents, with a place that will cook whatever fish you buy.' },
    { n: 'Mount Sarakura',
      d: 'A cable car up six hundred and twenty metres to one of the three best night views in Japan, over the steel works and the strait.' },
    { n: 'Mojiko Retro',
      d: 'Meiji and Taisho port buildings at the tip of Honshu’s facing shore, with the strait and the Kanmon bridge.' },
    { n: 'The Kanmon tunnel',
      d: 'Walk under the strait to Shimonoseki in fifteen minutes.' }
  ],
  when: 'Year round.',
  stay: 'Half a day. Kokura is a shinkansen stop so it is easy to break a journey here.',
  move: 'Kokura station is on the Sanyo shinkansen, fifteen minutes from Hakata.',
  eat: 'Yaki udon, which was invented here after the war when soba flour was unavailable, and grilled chicken at Tanga.'
},

'FKO-munakata': {
  intro: [
    'Okinoshima is an island sixty kilometres offshore where ritual offerings were made to the sea gods from the fourth to the ninth century, and where eighty thousand artefacts were found almost exactly where they were left: Persian glass, Korean gilt, Chinese mirrors.',
    'Nobody is allowed to go. The island is a shrine in its entirety, women have never been permitted, and since the UNESCO listing in 2017 even the previous lottery for twenty men a year has been stopped. Visitors who did go had to strip and bathe in the sea before landing.',
    'What you can visit is Munakata Taisha on the mainland, which is the third of the three shrines to the three sister goddesses, and the museum that holds the Okinoshima finds.'
  ],
  see: [
    { n: 'Munakata Taisha Hetsu-gu',
      d: 'The mainland shrine, with a hall from 1578 and a treasure house holding the Okinoshima objects, many of them designated National Treasures.' },
    { n: 'The Shimpokan treasure hall',
      d: 'The reason to come. Persian cut glass and gilt bronze horse fittings that crossed the continent to be left on a rock in the sea.' },
    { n: 'Oshima',
      d: 'A ferry island with the second of the three shrines, and an observation platform from which Okinoshima is visible on a clear day. That is as close as anyone gets.' },
    { n: 'The Okinoshima rule',
      d: 'Worth understanding before you come. The island itself is the object of worship, which is why access was closed rather than managed.' }
  ],
  when: 'Year round. The autumn festival in early October carries portable shrines by sea.',
  stay: 'Half a day.',
  move: 'Togo station then a bus, about an hour from Hakata in total. Ferries to Oshima from Konominato.',
  eat: 'Anago and local sea bream at Konominato port.'
},

'FKO-yanagawa': {
  intro: [
    'Yanagawa was a castle town built on marshland, and the solution was canals: about four hundred and seventy kilometres of them, dug for drainage, defence and irrigation, threading between the houses.',
    'Flat-bottomed boats called donkobune are poled along them by a boatman who sings and ducks under the bridges. It takes about an hour and it is one of the better slow hours available in Japan.',
    'The poet Hakushu Kitahara was born here and wrote about the water. His house is open, and in winter the boats have charcoal braziers under the seats and a quilt over your knees.'
  ],
  see: [
    { n: 'The donkobune',
      d: 'An hour from Nishitetsu Yanagawa station down to Okinohata. The boatmen sing, point out the willow and duck the low bridges.' },
    { n: 'Ohana',
      d: 'The former lord’s residence, with a Japanese garden, a Western wing from 1910 and a hall of two hundred and fifty thousand clam shells underfoot by the pond.' },
    { n: 'Hakushu Kitahara memorial house',
      d: 'The poet’s family home, a merchant house with the business rooms intact.' },
    { n: 'Winter boats',
      d: 'Kotatsu-bune, with a heater and a blanket. Better than summer, and almost empty.' },
    { n: 'The sagemon dolls', t: 'February to early April',
      d: 'Hanging ornaments made for girls, displayed in houses and shops throughout the town.' }
  ],
  when: 'Year round. Winter for the heated boats, spring for blossom along the canals.',
  stay: 'Half a day.',
  move: 'Nishitetsu limited express from Tenjin, about fifty minutes.',
  eat: 'Unagi no seiromushi, eel steamed over rice in a wooden box with a sweet sauce, which is the local version and different from the Kanto grilled style.'
},

/* ===================== SAGA ===================== */
'SAG-arita': {
  intro: [
    'Porcelain was made in Japan for the first time at Arita, around 1616, after kaolin clay was found at Izumiyama by a Korean potter named Yi Sam-pyeong who had been brought over during the invasions of Korea.',
    'Within decades it was being shipped to Europe through Imari port, and Arita porcelain reached the Dutch court, the Ottoman palaces and Augustus the Strong’s collection in Dresden, where Meissen was then developed partly to imitate it.',
    'The Izumiyama quarry is a hollowed-out mountain, dug out by hand over three hundred years until the clay was exhausted. Standing in it gives you the scale of the industry better than any museum.'
  ],
  see: [
    { n: 'Izumiyama quarry',
      d: 'A mountain removed. Open to walk into, with the cut faces showing the layers.' },
    { n: 'Tozan Shrine',
      d: 'With a torii, komainu dogs and lanterns all made of porcelain, which is as Arita as it gets.' },
    { n: 'Kyushu Ceramic Museum',
      d: 'Free, and holds the Shibata collection of ten thousand Edo-period pieces. The best single explanation of what happened here.' },
    { n: 'The kiln walk',
      d: 'Uchiyama district, a street of kilns and shops, with shards built into the retaining walls. Several studios let you watch the painting.' },
    { n: 'The pottery market', t: 'late April to early May',
      d: 'A huge annual sale along the main street. Hundreds of thousands of people and genuine bargains.' },
    { n: 'Okawachiyama',
      d: 'Twenty minutes away, the secret kiln village where the Nabeshima lords kept their best potters under guard so the techniques could not leave.' }
  ],
  when: 'Year round. Late April for the market, which is also the busiest week by a wide margin.',
  stay: 'A day.',
  move: 'Sasebo line to Arita, about ninety minutes from Hakata.',
  eat: 'Arita yaki gozen, a set meal served on the local porcelain, offered at several restaurants.'
},

'SAG-karatsu': {
  intro: [
    'Karatsu means China port, which is what it was: the closest harbour to the continent and the staging point for Hideyoshi’s invasions of Korea in the 1590s. The ruins of his vast staging castle at Nagoya are nearby.',
    'Karatsu-yaki pottery is understated where Arita is bright: unglazed or lightly glazed stoneware for tea, valued in the tea ceremony hierarchy alongside Hagi and Raku.',
    'The Karatsu Kunchi festival in November pulls fourteen enormous floats through the streets, including a red lion, a flying dragon and a gilded helmet. They are made of layered washi paper and lacquer and some are over two hundred years old.'
  ],
  see: [
    { n: 'Hikiyama Exhibition Hall',
      d: 'The fourteen festival floats on display year round. Up close they are startlingly large and the lacquer work is extraordinary.' },
    { n: 'Karatsu Kunchi', t: '2 to 4 November',
      d: 'The floats hauled through the streets and onto the beach, where they are dragged across wet sand by hundreds of people.' },
    { n: 'Niji no Matsubara',
      d: 'A pine grove of about a million trees along five kilometres of beach, planted in the seventeenth century as a windbreak.' },
    { n: 'Karatsu Castle',
      d: 'A reconstruction on a promontory with the sea on three sides and the pine grove stretching away.' },
    { n: 'Nagoya Castle ruins',
      d: 'Hideyoshi’s staging base for the Korean campaigns, built in five months and abandoned after his death. Stone walls on a headland and a good museum.' },
    { n: 'Yobuko morning market',
      d: 'A street market and a port famous for live squid, served still moving.' }
  ],
  when: 'Early November for the Kunchi.',
  stay: 'A night.',
  move: 'Chikuhi line from Fukuoka, about ninety minutes.',
  eat: 'Yobuko ika, squid served transparent and then the legs deep-fried afterwards as a second course.'
},

'SAG-ureshino': {
  intro: [
    'Ureshino is a tea town with a hot spring, and the tea is the more interesting half. This is one of the few places in Japan making guricha, a curled rather than needle-shaped green tea, rolled without the final straightening step.',
    'The water is strongly alkaline and leaves your skin feeling slippery, which is why it is marketed as a bihada spring. It is also drinkable and is used to brew the tea.',
    'There is a six-hundred-year-old tea tree at Shirakawa that is still producing, and terraced plantations on the surrounding hills that are worth driving through in May.'
  ],
  see: [
    { n: 'The baths',
      d: 'Several public options including Shiibaru-yu, a 1933 bathhouse. Day use at most inns.' },
    { n: 'The tea plantations',
      d: 'Terraced hills around the town. Picking from late April, and several farms will let you join.' },
    { n: 'The great tea tree',
      d: 'At Shirakawa, about six hundred years old and still harvested.' },
    { n: 'Toyotama Hime Shrine',
      d: 'Dedicated to a goddess with a namazu catfish as her messenger, which is unusual and makes for odd statuary.' },
    { n: 'Hizen Yoshida ware',
      d: 'A local pottery tradition distinct from Arita, with kilns open nearby.' }
  ],
  when: 'May for the tea harvest. Year round for the baths.',
  stay: 'A night.',
  move: 'Nishi-Kyushu shinkansen to Ureshino-Onsen station, which opened in 2022 and made this much easier to reach.',
  eat: 'Ureshino tea in everything, and yudofu, tofu simmered in the alkaline spring water until it goes soft and slightly sweet.'
},

'SAG-yoshinogari': {
  intro: [
    'Yoshinogari is the largest Yayoi-period settlement found in Japan, occupied from roughly 400 BC to AD 300, with a double moat, watchtowers and about three thousand burial jars.',
    'It matters because of a Chinese chronicle, the Wei Zhi, which describes a country called Yamatai ruled by a shaman queen named Himiko. Where Yamatai was is one of the long-running arguments in Japanese archaeology, and Yoshinogari is the main northern Kyushu candidate against a Nara-area rival.',
    'The site was discovered in 1986 during preparation for an industrial park, which was cancelled. About a hundred buildings have been reconstructed across a large park, and the scale is the point: this was a town, not a village.'
  ],
  see: [
    { n: 'The reconstructed settlement',
      d: 'Watchtowers, pit dwellings, raised storehouses and the moat system. You can go inside most of them.' },
    { n: 'The northern burial mound',
      d: 'Covered by a building, with the excavated jar burials of what were probably the ruling family left in position.' },
    { n: 'The exhibition hall',
      d: 'Bronze mirrors, Korean-style daggers and the glass beads that show trade with the continent.' },
    { n: 'The Himiko question',
      d: 'Explained on site with reasonable balance. The site does not claim to be Yamatai and makes the case for why it might be.' },
    { n: 'The scale',
      d: 'Forty hectares. Allow two hours and wear something you can walk in.' }
  ],
  when: 'Year round. Spring and autumn are best for the open ground.',
  stay: 'Two hours.',
  move: 'Yoshinogari-koen station on the Nagasaki line, about forty minutes from Hakata.',
  eat: 'A cafe on site. Not a food destination.'
},

/* ===================== NAGASAKI ===================== */
'NGS-nagasaki-city': {
  intro: [
    'For two hundred and twenty years, while Japan was closed, Nagasaki was the one place foreigners could trade. Dutch merchants lived confined to Dejima, a fan-shaped artificial island of about fifteen thousand square metres, and Chinese traders to their own quarter. Everything Japan learned about the West came through here.',
    'At 11.02 on 9 August 1945 a plutonium bomb detonated above Urakami, the Catholic district, about three kilometres from the intended aiming point. Around seventy thousand people died by the end of the year. Urakami Cathedral had been the largest church in East Asia and a wall of it still stands where it fell.',
    'The city is built up steep hills around a harbour, with trams running through the bottom of it, and it has a mixed Chinese, Dutch and Catholic inheritance that exists nowhere else in Japan.'
  ],
  see: [
    { n: 'Atomic Bomb Museum and the Hypocenter',
      d: 'Smaller and quieter than Hiroshima’s, with the clock stopped at 11.02 and a section on the Catholic community. The hypocentre is a plain black pillar in a park.' },
    { n: 'Dejima',
      d: 'Reconstructed building by building over decades, with the sea wall and the fan outline restored. The Dutch factory chief’s residence is furnished as it was.' },
    { n: 'Oura Church and Glover Garden',
      d: 'The oldest church in Japan, from 1864, where hidden Christians revealed themselves after two hundred and fifty years. Glover Garden above it holds Meiji merchant houses with harbour views.' },
    { n: 'Mount Inasa',
      d: 'A ropeway to one of the three best night views in Japan. The harbour and the hills covered in lights.' },
    { n: 'The Twenty-Six Martyrs',
      d: 'A memorial at Nishizaka where twenty-six Christians were crucified in 1597, including three boys.' },
    { n: 'Shianbashi and Chinatown',
      d: 'The eating and drinking quarter, and the oldest Chinatown in Japan.' }
  ],
  when: 'Year round. 9 August for the memorial. The Lantern Festival at Chinese New Year fills the city with fifteen thousand lanterns.',
  stay: 'Two nights.',
  move: 'Nishi-Kyushu shinkansen from Takeo-Onsen, with a connection from Hakata, about two hours total. Trams in the city.',
  eat: 'Champon, noodles in a pork and seafood broth invented here for Chinese students, and sara udon, the crisp-noodle version. Castella sponge cake, brought by the Portuguese in the sixteenth century.'
},

'NGS-gunkanjima': {
  intro: [
    'Hashima is a coal island about a kilometre round, and in 1959 it had five thousand two hundred and fifty-nine people living on it, which was the highest population density ever recorded anywhere. Japan’s first reinforced concrete apartment block was built here in 1916 because there was nowhere else to put anyone.',
    'The mine closed in April 1974 and everyone left within three months. It was sealed for thirty-five years. The concrete has been failing since, and typhoons take more of it every year.',
    'It is also a contested site. Korean and Chinese labourers were brought here under coercion during the war and the conditions were lethal. The UNESCO listing in 2015 came with a commitment to tell that history, and whether Japan has done so adequately remains an active diplomatic dispute.'
  ],
  see: [
    { n: 'The landing tour',
      d: 'Boats from Nagasaki, about fifty minutes. Landing requires calm seas and is cancelled roughly a third of the time; the tour still circles the island.' },
    { n: 'The viewing walkway',
      d: 'Visitors are confined to a short concrete path at the southern end. You cannot enter the buildings and the interior is genuinely unsafe.' },
    { n: 'Building 30',
      d: 'The 1916 apartment block, the oldest reinforced concrete residential building in Japan, visible from the walkway.' },
    { n: 'The Gunkanjima Digital Museum',
      d: 'In Nagasaki, with projections and footage of the interiors you cannot reach, plus interviews with former residents.' },
    { n: 'The forced labour history',
      d: 'Covered poorly on the island tours. The Oka Masaharu Memorial Museum in Nagasaki, run privately, deals with it directly.' }
  ],
  when: 'Year round, but spring and autumn have the best chance of landing. Typhoon season is unreliable.',
  stay: 'Half a day.',
  move: 'Tour boats from Nagasaki port. Book in advance; several operators and they do sell out.',
  eat: 'Nothing on the island. Nagasaki before or after.'
},

'NGS-unzen': {
  intro: [
    'Unzen was Japan’s first national park, designated in 1934, and it is a hot spring town sitting in a volcanic bowl with sulphurous steam venting out of the ground in the middle of it.',
    'The vents are called jigoku, hells, and about thirty Christians were boiled alive in them in the 1620s during the persecution. There are crosses marking the spot among the steam, which makes an otherwise pleasant walk unsettling.',
    'Mount Unzen erupted in 1990 after nearly two hundred years of quiet, and the 1991 pyroclastic flow killed forty-three people including the volcanologists Katia and Maurice Krafft. A new lava dome, Heisei Shinzan, is now the highest point in the range.'
  ],
  see: [
    { n: 'Unzen Jigoku',
      d: 'Boardwalks through the steam vents, with the Christian martyrdom memorial. Smells strongly and the ground is genuinely hot.' },
    { n: 'Mount Myoken and Fugendake',
      d: 'Ropeway up, then a walk along the ridge with Heisei Shinzan steaming alongside. Late October for the colour, which is the earliest in Kyushu.' },
    { n: 'Mount Unzen Disaster Memorial Hall',
      d: 'At Shimabara, on the 1991 eruption, with a simulator and footage.' },
    { n: 'The buried houses',
      d: 'At Mizunashi, homes left where the 1992 mudflows buried them to the second floor, preserved under a roof.' },
    { n: 'The baths',
      d: 'Strongly sulphurous, milky, and good. Several public bathhouses in the town.' }
  ],
  when: 'Late October for colour. Winter brings frost flowers on the trees at altitude.',
  stay: 'A night.',
  move: 'Bus from Isahaya or Shimabara, about an hour and a half from Nagasaki.',
  eat: 'Inn food, and the local speciality is steamed dishes cooked over the vents.'
},

'NGS-shimabara': {
  intro: [
    'In 1637 about thirty-seven thousand peasants and masterless samurai, most of them Christian, rebelled here against taxation and persecution. They held out in a ruined castle at Hara for months and were eventually destroyed almost to the last person. A Dutch ship was asked to shell them, which it did.',
    'The rebellion was the reason Japan closed itself. The shogunate concluded Christianity was a vector for foreign interference, expelled the Portuguese, and sealed the country for two centuries.',
    'Shimabara now is an unhurried town with carp swimming in the roadside channels of its samurai quarter, which get water from the volcano’s springs, and a castle that explains the whole affair.'
  ],
  see: [
    { n: 'Shimabara Castle',
      d: 'A 1964 reconstruction with a good exhibit on the rebellion and the hidden Christian artefacts, including fumie, the bronze images suspects were ordered to step on.' },
    { n: 'The samurai street',
      d: 'Buke Yashiki, with a stone channel of spring water running down the middle and three houses open.' },
    { n: 'The swimming carp',
      d: 'In the town’s water channels, and at Shimeiso, a house where you drink tea on tatami looking down into a pond fed by the springs.' },
    { n: 'The buried houses at Mizunashi',
      d: 'From the 1991 to 1993 eruptions, preserved as they were engulfed.' },
    { n: 'The ferry to Kumamoto',
      d: 'Thirty minutes across the bay, with gulls following the boat, and far better than going round by land.' }
  ],
  when: 'Year round.',
  stay: 'Half a day.',
  move: 'Shimabara Railway from Isahaya, about ninety minutes. Ferries to Kumamoto.',
  eat: 'Guzoni, a hotpot said to date from the rebellion siege, and kanzarashi, small rice dumplings in sugar syrup made with the spring water.'
},

'NGS-hirado': {
  intro: [
    'Hirado was the first place the English and Dutch set up trading posts in Japan, in 1613 and 1609, before both were consolidated into Dejima. William Adams, the English pilot who became a samurai and the model for Shogun, died here in 1620.',
    'It is also where hidden Christianity survived hardest. On the surrounding islands, communities kept the faith for two hundred and fifty years without priests, disguising Mary as Kannon and passing down prayers that drifted into something unrecognisable as Latin.',
    'The sight that captures it is Hirado Castle and St Francis Xavier Memorial Church with two Buddhist temple roofs in the frame together, which is a view the tourist office is understandably fond of.'
  ],
  see: [
    { n: 'The church and temples view',
      d: 'From the lane by Komyoji. A church spire and two temple roofs in one composition.' },
    { n: 'Hirado Dutch Trading Post',
      d: 'A reconstructed 1639 warehouse, rebuilt in 2011 from the excavated foundations and Dutch drawings.' },
    { n: 'Hirado Castle',
      d: 'Reconstructed, with an exhibit on the trade era and the Matsura clan.' },
    { n: 'Kasuga village and the hidden Christian sites',
      d: 'Terraced fields on a hillside, part of the UNESCO listing, where the faith was practised in secret around a sacred mountain rather than a church.' },
    { n: 'The island churches',
      d: 'On Ikitsuki and the Goto approaches, small brick and wooden churches built after the ban lifted in 1873, often by the congregations themselves.' },
    { n: 'Hirado beef',
      d: 'A local wagyu line that wins national awards and is much cheaper here than elsewhere.' }
  ],
  when: 'Year round. Spring and autumn for the coast roads.',
  stay: 'A night.',
  move: 'Matsuura Railway to Tabira-Hiradoguchi then a bridge, or drive. About three hours from Fukuoka.',
  eat: 'Hirado beef, flying fish, and Casdoce, a Portuguese-derived sweet made here since the sixteenth century that exists nowhere else.'
},

'NGS-sasebo': {
  intro: [
    'Kujukushima means ninety-nine islands, which is a way of saying many: there are actually two hundred and eight. They fill the sea off Sasebo in a scatter of pine-covered rocks, and the density of islands per square kilometre here is the highest in Japan.',
    'The best view is from Tenkaiho at sunset, when the water goes orange between the silhouettes. There are boat trips through the channels, including one on a replica pirate ship, which is less silly than it sounds because the scale works.',
    'Sasebo itself is a naval town, home to a US base since 1945 and a Japanese one before that, and it invented the Japanese hamburger, which arrived with the Americans and stayed.'
  ],
  see: [
    { n: 'Tenkaiho observatory',
      d: 'Sunset. The classic view and justifiably so. A bus or taxi from Sasebo.' },
    { n: 'The cruise',
      d: 'Fifty minutes through the channels from Kashimae pier. The small islands are close enough to see the pine roots gripping the rock.' },
    { n: 'Ishidake observatory',
      d: 'An alternative viewpoint, with the morning light instead.' },
    { n: 'Sea kayaking',
      d: 'Operators run half-day trips among the islands, which is the best way to be in the landscape rather than looking at it.' },
    { n: 'Sasebo burger',
      d: 'Not a gimmick. Several long-established places, made to order, large, and taken seriously.' },
    { n: 'Huis Ten Bosch',
      d: 'A full-scale Dutch town built as a theme park, with canals and real brick. Divisive and undeniably odd.' }
  ],
  when: 'Year round. Clear evenings for the sunset.',
  stay: 'A night.',
  move: 'Limited express from Hakata, about two hours.',
  eat: 'Sasebo burger, and lemon steak, a thin beef steak in lemon and soy that is a local invention.'
},

'NGS-goto': {
  intro: [
    'The Goto islands are a hundred kilometres off Kyushu and they are where hidden Christians fled, in waves, from the eighteenth century onwards. There are around fifty churches across the chain, several of them UNESCO listed, built by congregations who had waited two hundred and fifty years for permission.',
    'Kashiragashima church is made of stone the villagers quarried and carried themselves. Egami church is a small white wooden building in a hollow by a stream, with hand-painted wood grain inside because they could not afford the real thing.',
    'The islands are also ordinary and beautiful: white beaches, volcanic cones, a pilgrimage trail and almost no visitors. Flying fish and the local udon are what people come back for.'
  ],
  see: [
    { n: 'Egami Church',
      d: 'On Naru. Small, wooden, with painted faux grain and coloured glass the congregation made from fragments. The most affecting of them.' },
    { n: 'Kashiragashima Church',
      d: 'Built from hand-quarried stone on a tiny island, reached by a causeway. Visits now require advance registration.' },
    { n: 'Dozaki Church',
      d: 'The oldest in Goto, from 1908, brick, now a museum of hidden Christian objects.' },
    { n: 'Onidake',
      d: 'A grass-covered volcanic cone on Fukue you can walk up in twenty minutes for the whole island.' },
    { n: 'Takahama beach',
      d: 'White sand and genuinely clear water. Among the best beaches in Japan and nobody on it.' },
    { n: 'The church visit system',
      d: 'Many require booking ahead through the Nagasaki churches information centre because they are working parishes, not monuments.' }
  ],
  when: 'May to October. Ferries are weather dependent.',
  stay: 'Two or three nights.',
  move: 'Jetfoil from Nagasaki to Fukue in ninety minutes, or a short flight. Inter-island ferries and a hire car once there.',
  eat: 'Goto udon, thin noodles made with camellia oil, eaten in a broth of flying fish. Kankoro, sweet potato, which grows in the poor soil.'
},

/* ===================== KUMAMOTO ===================== */
'KMM-kumamoto-castle': {
  intro: [
    'Kato Kiyomasa built this in 1607 and designed it to be impossible. The stone bases curve outward as they rise, a profile called musha-gaeshi, warrior repelling, so that a climber reaches a point where the wall overhangs. There are a hundred and twenty wells inside and the floors were laid with nut trees so the garrison could eat during a siege.',
    'It was tested in 1877, when Saigo Takamori besieged it for fifty-two days during the Satsuma Rebellion and never took it. He reportedly said he had not been defeated by the garrison but by Kiyomasa.',
    'The 2016 earthquakes brought down turrets and large sections of wall, and dislodged about a hundred thousand stones. Reconstruction is scheduled to run into the 2050s, and the keep reopened in 2021. Watching the stonework being rebuilt, each block numbered and returned to its own position, has become part of the visit.'
  ],
  see: [
    { n: 'The keep',
      d: 'Reopened in 2021 with a good exhibit, including on the earthquake damage and the repair method.' },
    { n: 'The curved stone walls',
      d: 'Best seen from below at the Hitsuji-saru turret. The overhang is obvious once you look for it.' },
    { n: 'Uto turret',
      d: 'One of the few original structures, from the early 1600s, and still standing after the quake.' },
    { n: 'The special walkway',
      d: 'An elevated route built so visitors can see the active restoration zones. Candid about how long it will all take.' },
    { n: 'Sakuranobaba Josaien',
      d: 'A reconstructed Edo street below the castle with food and a free film about Kumamoto.' },
    { n: 'Suizenji Jojuen',
      d: 'A garden across town that models the fifty-three stations of the Tokaido in miniature, including a grassy mound for Fuji.' }
  ],
  when: 'Year round. Blossom in early April.',
  stay: 'Half a day, with a night in the city.',
  move: 'Tram from Kumamoto station, or a walk from the centre. Shinkansen from Hakata in forty minutes.',
  eat: 'Basashi, raw horse, which Kumamoto eats more of than anywhere and which is said to date from Kiyomasa’s Korean campaign. Karashi renkon, lotus root stuffed with mustard miso and fried.'
},

'KMM-aso': {
  intro: [
    'The Aso caldera is twenty-five kilometres north to south and eighteen across, one of the largest in the world, and about fifty thousand people live inside it. There are towns, rice fields, two railway lines and a highway on the floor of a volcano.',
    'In the middle sit five peaks, and one of them, Nakadake, is still active. You can usually drive or take a bus to the rim and look down into a crater lake of turquoise acid, though access is closed whenever gas levels rise, which is often.',
    'The grasslands around it are maintained by burning, as at Akiyoshi, and have been grazed for a thousand years. Kusasenri is a grassy bowl with ponds and horses that looks nothing like the rest of Japan.'
  ],
  see: [
    { n: 'Nakadake crater',
      d: 'Check the alert level before travelling; closures are common and can happen the same day. When open, the acid lake and the sulphur are startling.' },
    { n: 'Kusasenri',
      d: 'A grass plain in an old crater with horses and two ponds. Walkable and free, and open even when the crater is not.' },
    { n: 'Daikanbo',
      d: 'On the outer caldera rim, looking down across the whole floor. Morning fog pools here in autumn.' },
    { n: 'Aso Shrine',
      d: 'With a rare romon gate that collapsed in 2016 and was reassembled from the original timbers, completed in 2023.' },
    { n: 'The Aso Boy train',
      d: 'A family-oriented sightseeing train across the caldera.' },
    { n: 'Nabegataki',
      d: 'An hour north, a waterfall you can walk behind.' }
  ],
  when: 'Spring for the grass burning and the wildflowers, autumn for the fog. Winter is cold and the roads can close.',
  stay: 'A night.',
  move: 'Hohi line from Kumamoto, about ninety minutes, then buses. A car is much better.',
  eat: 'Akaushi, the local red beef, grazed on the caldera grassland. Dagojiru, a flour dumpling soup.'
},

'KMM-kurokawa': {
  intro: [
    'Kurokawa has no neon, no concrete hotel blocks and no pachinko. In the 1980s the innkeepers agreed collectively to restore the whole village to wood, earth and plaster, to bury the cables, and to plant trees, and they enforced it among themselves.',
    'The result is about thirty inns along a small gorge, each with its own outdoor bath, and a pass called the tegata, a small wooden disc that admits you to any three of them.',
    'Bathing your way around the village with a towel and a wooden token is the entire activity, and it is the best onsen village in Japan at it.'
  ],
  see: [
    { n: 'The tegata',
      d: 'A wooden pass valid for three baths at any participating inn, usable over six months. Buy it at the information centre.' },
    { n: 'Choosing baths',
      d: 'Ask at the centre which are riverside, which are cave baths, which are mixed. Shinmeikan has a cave bath; Yamamizuki is out of the village and worth the walk.' },
    { n: 'Yudokoro Kurokawa walk',
      d: 'The village is small enough to cover in twenty minutes. Go in a yukata and geta like everyone else.' },
    { n: 'Yu Akari', t: 'December to March',
      d: 'Three hundred bamboo lanterns along the river at night. Quiet and the best time to be here.' },
    { n: 'Autumn', t: 'late October to mid-November',
      d: 'Maple over the gorge. The busiest period; book months ahead.' }
  ],
  when: 'Winter for the lanterns and snow in the baths, autumn for colour.',
  stay: 'A night, which is the point. Day bathing works but misses it.',
  move: 'Bus from Kumamoto or Fukuoka, about two to three hours. A car otherwise.',
  eat: 'Inn kaiseki with local beef and river fish. Several places in the village do a good lunch.'
},

'KMM-takachiho-no-yu': {
  intro: [
    'Nabegataki is a wide low waterfall with a cavity behind it, so the path goes round and in, and you stand looking out through the water. The overhang was created when a huge eruption at Aso ninety thousand years ago laid down soft rock that the river then undercut.',
    'The cavern is about twenty metres deep and the fall is only ten metres high and twenty wide, which is the right proportion for walking behind.',
    'It was closed for years after the 2016 earthquake and has been reopened with a proper path. Early morning in summer gets light through the water, and in winter the whole thing sometimes freezes.'
  ],
  see: [
    { n: 'Behind the fall',
      d: 'The path goes right in. You will get wet. Non-slip shoes are a good idea.' },
    { n: 'Morning light', t: 'summer mornings',
      d: 'Sun through the curtain of water from inside the cavern.' },
    { n: 'The winter freeze',
      d: 'In cold years the fall ices over and is lit at night on set dates.' },
    { n: 'The approach',
      d: 'About three hundred steps down from the car park and back up. Not difficult but not level either.' },
    { n: 'Oguni and Kurokawa',
      d: 'Both within half an hour, so this pairs naturally with a bath.' }
  ],
  when: 'Year round. Summer mornings for the light, deep winter for ice.',
  stay: 'An hour.',
  move: 'A car. There is no useful public transport.',
  eat: 'Nothing on site beyond a small stand. Oguni has places.'
},

'KMM-amakusa': {
  intro: [
    'Amakusa is a chain of about a hundred and twenty islands off western Kumamoto, linked by five bridges that were built in 1966 and which transformed the place from isolated to drivable.',
    'This was hidden Christian country, and several of the UNESCO listed sites are here, including Sakitsu, a fishing village where the church was built on the spot where villagers had been made to step on holy images. The congregation put the altar where the examination table had stood.',
    'There are also about two hundred wild bottlenose dolphins resident off the northwest coast, and sighting rates on the boat trips run above ninety per cent year round, which is unusually reliable.'
  ],
  see: [
    { n: 'Sakitsu village and church',
      d: 'A grey church among fishermen’s houses on a narrow inlet. Small, quiet, and the history is specific and awful.' },
    { n: 'Dolphin watching',
      d: 'Boats from Itsuwa and Tsuji. Resident pod, so sightings are near certain.' },
    { n: 'Oe Church',
      d: 'White, on a hill, built in 1933 by a French priest who spent fifty years here.' },
    { n: 'Amakusa Shiro Christian Museum',
      d: 'Holding the Amakusa Shiro banner carried at the Shimabara Rebellion, with the chalice and Portuguese inscription.' },
    { n: 'The Five Bridges',
      d: 'The drive out from Misumi, hopping islands. Pleasant in itself.' },
    { n: 'The sunsets',
      d: 'West facing over the East China Sea, and the Shimoda Onsen coast is set up for watching them.' }
  ],
  when: 'Year round. Spring and autumn for driving, summer for swimming.',
  stay: 'A night or two.',
  move: 'A car from Kumamoto, about two hours. Ferries from Shimabara and Kagoshima.',
  eat: 'Among the best seafood in Kyushu: sea urchin, octopus, and Amakusa Daio chicken.'
},

/* ===================== OITA ===================== */
'OIT-beppu': {
  intro: [
    'Beppu produces more hot spring water than anywhere in Japan and the second most anywhere in the world after Yellowstone. About a hundred and thirty thousand kilolitres a day come out of the ground, and steam rises from drains, gardens and manhole covers all over the city.',
    'There are eight separate spring districts with different water chemistry, and well over two thousand sources. You can be buried in hot sand at Takegawara, steamed in a box with your head sticking out, or boil your own eggs and vegetables in a vent.',
    'The jigoku, hells, are the show: seven or eight pools of coloured water you look at rather than get into, including a cobalt blue one and a blood red one, with a geyser that goes off every thirty to forty minutes.'
  ],
  see: [
    { n: 'The hells',
      d: 'A combined ticket covers seven. Umi Jigoku, the blue one, and Chinoike, the red, are the two worth your time; several of the others are thin.' },
    { n: 'Takegawara Onsen',
      d: 'An 1879 bathhouse with the sand bath. You lie down, attendants shovel hot sand over you, and you stay for about ten minutes.' },
    { n: 'Jigoku-mushi cooking',
      d: 'At Kannawa, baskets of eggs, corn and seafood steamed in a vent you operate yourself.' },
    { n: 'Hyotan Onsen',
      d: 'The only Michelin three-star rated bath in Japan, with a waterfall bath you sit under for a shoulder massage.' },
    { n: 'Myoban',
      d: 'Thatched huts on the hillside where alum crystals have been harvested from the steam since the eighteenth century. The milky bath here is the best in Beppu.' },
    { n: 'Mount Tsurumi',
      d: 'A ropeway up 1,375 metres for the whole bay, with cherry blossom in spring.' }
  ],
  when: 'Year round. Winter is best; the steam is visible everywhere.',
  stay: 'Two nights.',
  move: 'Limited express from Hakata, about two hours. Oita airport.',
  eat: 'Toriten, chicken tempura, which is an Oita invention, and Seki saba mackerel, line caught in the strait and expensive for good reason.'
},

'OIT-yufuin': {
  intro: [
    'Yufuin sits in a basin below the twin peaks of Mount Yufu and the mornings here produce fog that fills the valley. It is the refined counterpart to Beppu: fewer hells, more galleries, and a deliberate decision in the 1970s to resist large hotel development.',
    'The main street from the station to Lake Kinrin is now extremely commercialised, with croquette queues and soft serve, and plenty of people find it too much. The inns up the side valleys are a different place entirely.',
    'Lake Kinrin is fed by both hot and cold springs, so it steams on cold mornings. There is a bathhouse on its bank, Shitanyu, a thatched hut with a mixed bath and almost no privacy, which has been there a long time.'
  ],
  see: [
    { n: 'Lake Kinrin at dawn',
      d: 'Steam off the water with the mountain behind. Be there before the street wakes up; this is the best half hour of the day.' },
    { n: 'Mount Yufu',
      d: 'A climb of about ninety minutes to the twin summits at 1,583 metres, with the caldera and Beppu bay beyond.' },
    { n: 'Shitanyu',
      d: 'A thatched mixed bath on the lake shore, honour box payment. Not for everyone and entirely authentic.' },
    { n: 'The galleries',
      d: 'Several small museums including a Marc Chagall collection, which is unexpected in a hot spring town of ten thousand people.' },
    { n: 'The Yufuin no Mori train',
      d: 'A green and gold sightseeing train from Hakata, with wooden interiors. Reserve well ahead.' },
    { n: 'The side valleys',
      d: 'Where the good inns are. Several have private open-air baths looking at the mountain.' }
  ],
  when: 'Autumn for colour, winter mornings for the fog on the lake.',
  stay: 'A night.',
  move: 'Yufuin no Mori or limited express from Hakata, about two hours. An hour from Beppu by bus over the Yamanami highway.',
  eat: 'Bungo beef, and the local trout. The croquette queues on the main street are not worth the time.'
},

'OIT-kunisaki': {
  intro: [
    'The Kunisaki peninsula produced something that exists nowhere else: Rokugo Manzan, a fusion of Buddhism with mountain worship and Usa Shrine’s Hachiman cult, which developed in isolation from the eighth century and left about sixty-five temples across the hills.',
    'Fuki-ji holds the oldest wooden building in Kyushu, from the twelfth century, a small hall containing a seated Amida and wall paintings that have faded to almost nothing but are still there.',
    'Kumano Magaibutsu are two enormous Buddha figures carved into a rock face, reached by a stair of rough boulders that legend says a demon built in one night. The larger figure is over eight metres and is the biggest rock-carved Buddha in Japan.'
  ],
  see: [
    { n: 'Fuki-ji',
      d: 'The oldest wooden building in Kyushu. One small hall, one Amida, very little else, and worth the trip.' },
    { n: 'Kumano Magaibutsu',
      d: 'Up about a hundred uneven boulder steps. Two reliefs, one fierce and one serene, carved into the cliff.' },
    { n: 'Usa Jingu',
      d: 'The head shrine of about forty thousand Hachiman shrines nationwide, with an unusual two-hall architecture and a vermilion bridge.' },
    { n: 'Monjusenji',
      d: 'A temple built into a cliff with a spring said to confer wisdom, which is where the local exam-season traffic goes.' },
    { n: 'The pilgrimage route',
      d: 'A long-distance circuit linking the temples, walkable in sections. Marked and very little used.' },
    { n: 'Showa no Machi',
      d: 'At Bungotakada, a shopping street restored to its 1950s and 60s appearance, which is more charming than it sounds.' }
  ],
  when: 'Late November for maple at Fuki-ji, which is the peak season here.',
  stay: 'A day.',
  move: 'A car. Buses exist and are impractical for more than one temple.',
  eat: 'Simple local places. Bungotakada does soba.'
},

'OIT-usuki': {
  intro: [
    'Somewhere in the twelfth century, somebody carved around sixty Buddhas into the cliffs of a narrow valley at Usuki, in four groups, and nobody wrote down who or why. They are the only stone Buddhas in Japan designated as National Treasures.',
    'The quality is unusually high for rock carving: the Dainichi Nyorai head retains its features clearly, and traces of the original pigment survive on several figures. That head sat detached on the ground below its body for centuries and was reattached in 1993, which some people objected to.',
    'They are in open air under protective roofs, in a quiet valley with rice fields, and you walk between the groups on a path. Little commentary and almost no crowd.'
  ],
  see: [
    { n: 'The Hoki groups',
      d: 'Four clusters along the path. The Dainichi Nyorai in Hoki second group is the finest carving.' },
    { n: 'The Furuzono group',
      d: 'Nine figures in a row with the best-preserved colour.' },
    { n: 'The reattached head',
      d: 'Photographs on site show it as it was, resting below the body. Worth understanding the debate about the restoration.' },
    { n: 'Usuki town',
      d: 'A castle town with a preserved samurai quarter, a street of plastered walls and several old merchant houses.' },
    { n: 'The lotus field',
      d: 'Below the carvings, flowering in July.' },
    { n: 'Usuki Takeyoi', t: 'early November',
      d: 'Twenty thousand bamboo lanterns through the old town at night.' }
  ],
  when: 'Year round. Early November for the lantern festival.',
  stay: 'Half a day.',
  move: 'Usuki station on the Nippo line then a bus, about forty minutes from Oita.',
  eat: 'Usuki is a soy sauce and miso brewing town. Fugu is a local speciality and cheaper here than in Shimonoseki.'
},

'OIT-taketa': {
  intro: [
    'Nagayu has the highest carbon dioxide concentration of any hot spring in Japan, which means the water fizzes. Bubbles collect on your skin within a minute and the gas dilates blood vessels, so you feel the heat at a lower water temperature.',
    'The German classification for this kind of spring is a sprudelbad, and Nagayu was studied and promoted on that basis in the 1920s. The main public bath, Lamune Onsen, was designed by Terunobu Fujimori in 2005 and looks like a cartoon of a building, with a striped wooden roof and pine trees growing out of it.',
    'Taketa town nearby is in a bowl of cliffs with tunnels cut through the rock to reach it, and Rentaro Taki, who wrote the song Kojo no Tsuki, grew up here.'
  ],
  see: [
    { n: 'Lamune Onsen',
      d: 'The Fujimori building. Indoor and outdoor baths, the cooler one at about thirty-two degrees where the fizz is strongest.' },
    { n: 'Gani-yu',
      d: 'A free riverside bath under a bridge in Nagayu. Mixed, open, and entirely unsupervised.' },
    { n: 'Drinking the water',
      d: 'Taps around the village. Sharply mineral and an acquired taste.' },
    { n: 'Taketa old town',
      d: 'Reached through tunnels cut in the cliff. Samurai houses, a temple built into the rock face and the Taki memorial house.' },
    { n: 'Oka Castle ruins',
      d: 'Stone walls on a ridge above the town, the castle Taki’s song is about. Good in autumn.' },
    { n: 'Kuju',
      d: 'The mountain range nearby, with hiking and a flower park.' }
  ],
  when: 'Year round. Autumn for the castle ruins.',
  stay: 'A night.',
  move: 'Hohi line to Bungo-Taketa, about an hour from Oita, then a bus to Nagayu.',
  eat: 'Shiitake, which Oita produces more of than any prefecture, and local beef.'
},

/* ===================== MIYAZAKI ===================== */
'MYZ-takachiho': {
  intro: [
    'The Gokase river has cut a gorge through welded ash laid down by the Aso eruptions, and the rock has cooled into columnar basalt that curves in sheets along the walls. In places the cliffs are a hundred metres high and the gorge is only a few metres wide.',
    'You hire a rowing boat and take it up to Manai Falls, which drops seventeen metres straight into the channel. Thirty minutes on the water, and the waiting time in high season can be two or three hours.',
    'Takachiho is also where the sun goddess hid in a cave and was lured out by dancing, which is the founding story of Japanese myth. Kagura dances retelling it are performed in farmhouses through the winter nights and in a shortened version at the shrine every evening.'
  ],
  see: [
    { n: 'The rowing boat',
      d: 'Thirty minutes, booked online in advance now, which has cut the queue considerably. Going under the waterfall is the point.' },
    { n: 'The gorge walkway',
      d: 'A free path along the top, about a kilometre, which gives the view from above and costs nothing.' },
    { n: 'Takachiho Shrine kagura', t: 'nightly, 8pm',
      d: 'Four dances from the cycle, about an hour, at the shrine. Accessible and worth it.' },
    { n: 'Yokagura', t: 'November to February',
      d: 'The full thirty-three dance cycle performed overnight in village farmhouses. You can attend; ask at the tourist office, bring a gift, expect to be fed and to stay until dawn.' },
    { n: 'The cedars at the shrine',
      d: 'Eight hundred years old, with a pair whose roots have joined.' },
    { n: 'Kunimigaoka',
      d: 'A hilltop above the town where autumn mornings produce a sea of cloud over the valley.' }
  ],
  when: 'Autumn for colour and cloud, winter for yokagura. Summer is busy and the boat queue is long.',
  stay: 'A night.',
  move: 'Bus from Kumamoto or Miyazaki, about three hours each. A car is far better; there is no train.',
  eat: 'Takachiho beef, nagashi somen, noodles floated down a bamboo flume, and chicken grilled over charcoal.'
},

'MYZ-takachiho-shrine': {
  intro: [
    'Amanoiwato Shrine faces a cave across a ravine, and the cave is where Amaterasu, the sun goddess, is said to have shut herself away after a quarrel with her brother, taking the light out of the world.',
    'The other gods gathered in a riverbed nearby to work out what to do. Amanoyasugawara is that riverbed: a cave with a small shrine and thousands of stone cairns built by visitors across the shingle. It is a ten-minute walk upstream and it is one of the strangest and most atmospheric places in Japan.',
    'The solution they arrived at was to have Uzume dance on an upturned tub until the other gods laughed, so Amaterasu looked out to see what was funny and the light came back. That dance is the origin of kagura.'
  ],
  see: [
    { n: 'Amanoyasugawara',
      d: 'Ten minutes up the river path from the shrine. A cave, a torii, and stones stacked by everyone who has been. Go in the morning when it is empty.' },
    { n: 'Amanoiwato Shrine',
      d: 'The cave itself cannot be entered or photographed and is viewed from the shrine precinct, by arrangement with a priest.' },
    { n: 'The river walk',
      d: 'Short, shaded and along clear water. The approach matters as much as the destination here.' },
    { n: 'Kushifuru Shrine',
      d: 'Where the grandson of Amaterasu is said to have descended to earth, which makes it the start of the imperial line in the myth.' },
    { n: 'Amanoiwato kagura',
      d: 'Performed here as well as in Takachiho during the winter season.' }
  ],
  when: 'Year round. Mornings for the riverbed.',
  stay: 'Two hours, alongside the gorge.',
  move: 'A car or a local bus from Takachiho, about fifteen minutes.',
  eat: 'A few places near the shrine. Takachiho town for anything more.'
},

'MYZ-nichinan': {
  intro: [
    'The Nichinan coast runs south from Miyazaki past rock formations called the devil’s washboard, which are tilted sandstone and mudstone layers eroded into regular ridges that look exactly like a washboard at low tide.',
    'Udo Shrine is built inside a sea cave on this coast, vermilion against black rock, with waves coming in below. The ritual there is to buy five clay balls and throw them at a ring on a rock in the sea; left hand if you are male, right if female.',
    'Aoshima, further north, and Cape Toi, further south, with its wild horses, bracket the drive. The coast road is one of the better ones in Japan and the subtropical planting makes it feel further south than it is.'
  ],
  see: [
    { n: 'Udo Shrine',
      d: 'In the cave, down steps along the cliff. The clay ball throwing is genuinely enjoyable and almost nobody manages it.' },
    { n: 'The devil’s washboard',
      d: 'Best at low tide around Aoshima and along the coast road. Check the tide table.' },
    { n: 'Cape Toi',
      d: 'Wild Misaki horses, about ninety of them, grazing a headland. A protected native breed, small and unbothered by people.' },
    { n: 'Obi',
      d: 'Inland, a castle town with a restored gate and a samurai quarter, called the little Kyoto of Kyushu.' },
    { n: 'Sunmesse Nichinan',
      d: 'Seven full-size moai replicas on a hillside, built with permission from Easter Island after Japanese engineers helped restore the originals. Absurd and oddly moving.' },
    { n: 'The coast drive',
      d: 'Route 220 south. Palms, phoenix trees and the Pacific the whole way.' }
  ],
  when: 'Year round. Spring and autumn for driving; summer is humid.',
  stay: 'A day with a car.',
  move: 'A car from Miyazaki. The Nichinan line runs parallel and is slow but scenic.',
  eat: 'Obi-ten, a fried fish cake with tofu and brown sugar, and Miyazaki mango in season.'
},

'MYZ-kirishima-myz': {
  intro: [
    'Aoshima is a small island off the Miyazaki coast, about a kilometre and a half round, entirely covered in subtropical palms and surrounded by the devil’s washboard rock formation.',
    'Four thousand betel palms grow on it, and there is a shrine in the middle dedicated to a god of marriage, which until 1737 only priests were allowed to enter.',
    'You walk across on a causeway. The beach beside it is Miyazaki’s main surf spot and the town has a loose, slightly Californian feel that is unusual in Japan.'
  ],
  see: [
    { n: 'The island walk',
      d: 'A loop of about fifteen minutes through palm forest to the shrine and round the rock shelf.' },
    { n: 'Aoshima Shrine',
      d: 'Vermilion among the palms, with a tunnel of prayer plaques and a spot where you throw clay discs.' },
    { n: 'The washboard',
      d: 'Visible all round the island at low tide, with rock pools.' },
    { n: 'Surfing',
      d: 'Board hire and lessons at the beach. Consistent and uncrowded by Japanese standards.' },
    { n: 'The Aoshima strip',
      d: 'A short run of cafes and bars by the beach, which is where Miyazaki goes at the weekend.' }
  ],
  when: 'Year round. Summer for swimming, autumn for surf.',
  stay: 'Half a day.',
  move: 'Nichinan line from Miyazaki to Aoshima, about thirty minutes.',
  eat: 'Chicken nanban, fried chicken in a sweet vinegar sauce with tartare, which was invented in Miyazaki and is now everywhere in Japan.'
},

/* ===================== KAGOSHIMA ===================== */
'KGS-kagoshima-city': {
  intro: [
    'Kagoshima sits across a bay from an active volcano that drops ash on it. Residents keep yellow bags for volcanic ash collection, the forecast includes an ash drift direction, and schools have covered walkways. It is treated as weather.',
    'This was Satsuma, the domain that was richest, most independent and furthest from Edo, and which did more than anywhere to end the shogunate. Saigo Takamori, Okubo Toshimichi and the men who built the Meiji state came from a few streets here.',
    'It is also the most southerly big city on the main islands, with palms in the streets, a strong Chinese and Ryukyuan influence in the food, and a sense of being at the end of Japan rather than in it.'
  ],
  see: [
    { n: 'Sengan-en',
      d: 'A Shimadzu clan garden from 1658 using Sakurajima as borrowed scenery, with the volcano as the centrepiece of the composition. Also the site of Japan’s first industrial Western-style factory.' },
    { n: 'The Shoko Shuseikan',
      d: 'In the garden, a stone machine works from 1865, part of the UNESCO industrial heritage listing. The Satsuma lords were manufacturing glass, cannon and ships before the rest of Japan.' },
    { n: 'Museum of the Meiji Restoration',
      d: 'On the Satsuma figures and how a southern domain overthrew the government. Robotic dioramas that are better than they sound.' },
    { n: 'Shiroyama',
      d: 'The hill where Saigo made his last stand in 1877 and died. A cave, a viewpoint over the bay and the volcano.' },
    { n: 'Tenmonkan',
      d: 'The eating and drinking district, and the best shochu selection in Japan.' },
    { n: 'Chiran',
      d: 'An hour south, a samurai street with seven gardens, and a memorial museum for the kamikaze pilots who flew from the airfield here, holding their final letters.' }
  ],
  when: 'Year round. Check the ash forecast and carry an umbrella for it.',
  stay: 'Two nights.',
  move: 'Kyushu shinkansen from Hakata, about ninety minutes. Trams in the city.',
  eat: 'Kurobuta black pork, kibinago silver-striped herring eaten raw in a chrysanthemum arrangement, satsuma-age fish cake, and shochu, which is drunk here instead of sake and is made from sweet potato.'
},

'KGS-sakurajima': {
  intro: [
    'Sakurajima erupts hundreds of times a year. Minor explosions from the Showa crater throw ash a few kilometres up and the city opposite gets it. The last large eruption was 1914, which joined the island to the mainland with a lava flow and buried a shrine gate to within a metre of its top.',
    'Seven thousand people live on it. There are evacuation shelters along the roads, concrete bunkers with no doors, and the schools practise. The authorities monitor it continuously and the alert level is published hourly.',
    'The ferry from Kagoshima runs every fifteen minutes, takes fifteen minutes, and runs all night. Going across is the easiest thing in the world and you cannot get close to the crater, which is sensibly off limits.'
  ],
  see: [
    { n: 'Yunohira observatory',
      d: 'The highest point visitors can reach, at three hundred and seventy-three metres, looking up at the cones and back across the bay.' },
    { n: 'Kurokami buried torii',
      d: 'A shrine gate with only the top metre above the 1914 ash fall. The clearest single image of what this volcano does.' },
    { n: 'The foot bath',
      d: 'A hundred metres long, free, by the visitor centre, looking out at the bay. One of the longest in Japan.' },
    { n: 'The lava trail',
      d: 'A three-kilometre path across the 1914 flow at Nagisa, with pine growing out of the rock.' },
    { n: 'The night ferry',
      d: 'Runs twenty-four hours. Crossing at night with the city lights behind is worth doing for its own sake.' },
    { n: 'Watching an eruption',
      d: 'From Kagoshima’s waterfront, usually at some point in a two-day stay. The plume is visible from the city centre.' }
  ],
  when: 'Year round. Wind direction decides whether you or the city gets the ash.',
  stay: 'Half a day.',
  move: 'Ferry from Kagoshima every fifteen minutes. A hire car or the island bus on the far side.',
  eat: 'Sakurajima komikan, the world’s smallest mandarin, and daikon the size of a football, both grown in the volcanic soil.'
},

'KGS-yakushima': {
  intro: [
    'Yakushima rains. It gets between four and ten metres a year depending on altitude, which is among the highest in Japan, and the local saying is that it rains thirty-five days a month. Everything is covered in moss.',
    'The cedars are the reason to come. Jomon Sugi is somewhere between two and seven thousand years old, which makes it possibly the oldest tree in Japan, and reaching it is a ten to eleven hour round trip on foot, much of it along a disused logging railway.',
    'Shiratani Unsuikyo is the shorter version: a mossy ravine of granite boulders and cedar that Studio Ghibli used as reference for Princess Mononoke. The island was logged heavily into the 1960s, and the stumps left behind, some with new trees growing out of them, are part of the landscape.'
  ],
  see: [
    { n: 'Jomon Sugi',
      d: 'Ten to eleven hours return from Arakawa, with a bus that leaves before dawn and a railway track walk of about eight kilometres. Serious and worth it if you are fit.' },
    { n: 'Shiratani Unsuikyo',
      d: 'Loops from one to four hours. The Mononoke forest section is the one, and it is reachable by anyone.' },
    { n: 'Yakusugi Land',
      d: 'Boardwalk trails among ancient cedars at a thousand metres, with routes from thirty minutes to two and a half hours.' },
    { n: 'Mount Miyanoura',
      d: '1,936 metres, the highest point in Kyushu, with alpine vegetation at the top. A long day.' },
    { n: 'Loggerhead turtles', t: 'May to July',
      d: 'Nagata Inakahama has the largest loggerhead nesting beach in the North Pacific. Guided night viewing only, with strict rules.' },
    { n: 'Hirauchi Kaichu',
      d: 'A hot spring on the rocks at the shoreline, only accessible for two hours either side of low tide. Mixed and open to the sea.' }
  ],
  when: 'Year round, and bring proper rain gear whenever you come. May to October for the trails; the high peaks get snow.',
  stay: 'Three nights minimum. Two days of walking is the least that justifies the journey.',
  move: 'Jetfoil from Kagoshima in two hours, ferry in four, or a short flight. A hire car on the island; buses are limited.',
  eat: 'Flying fish, served whole and fried, and tobiuo ramen. Yakushima tea and tankan citrus.'
},

'KGS-kirishima': {
  intro: [
    'Kirishima is a cluster of more than twenty volcanic cones and lakes straddling the Kagoshima and Miyazaki border, and it was designated as part of Japan’s first national park in 1934 alongside Unzen.',
    'Shinmoedake erupted in 2011 and again in 2018, which closed the main ridge traverse. Karakunidake, at 1,700 metres, is the usual climb now, about three hours return, and from the top you see a line of craters including the perfectly round lake at Onami.',
    'Kirishima Jingu sits in cedar forest below, vermilion and heavily carved, and is dedicated to the god said to have descended to earth on these mountains. Sakamoto Ryoma came here on what is sometimes called Japan’s first honeymoon.'
  ],
  see: [
    { n: 'Karakunidake',
      d: 'About three hours return from Ebino Kogen. Volcanic gravel, low scrub and a crater rim walk at the top.' },
    { n: 'Ebino Kogen and the crater lakes',
      d: 'A plateau with three lakes, a loop walk of about an hour, and steam vents. The cobalt of Rokkannon Mi-ike is striking.' },
    { n: 'Kirishima Jingu',
      d: 'In old cedar, with a lacquered and carved main hall from 1715 and an eight-hundred-year-old cedar in the precinct.' },
    { n: 'Miyama Kirishima', t: 'late May to early June',
      d: 'Dwarf azalea covering the slopes in pink. The best fortnight on these mountains.' },
    { n: 'The onsen',
      d: 'Several in the area, including Shinyu with milky sulphur water and Myoken with a river bath.' },
    { n: 'Checking the alerts',
      d: 'Shinmoedake remains active and closures shift. Check before deciding which route to walk.' }
  ],
  when: 'Late May for azalea, October and November for colour. Winter brings frost formations.',
  stay: 'A night.',
  move: 'Bus from Kirishima-Jingu station or Kobayashi. A car is much easier for Ebino Kogen.',
  eat: 'Kurobuta pork, and the local shochu, which Kirishima is a major producer of.'
},

'KGS-ibusuki': {
  intro: [
    'At Ibusuki you are buried in sand. Attendants on the beach at Saraku dig a trough, you lie in it in a yukata with a towel round your head, and they shovel hot black sand over you until only your face shows. The sand is heated by geothermal water underneath.',
    'You stay for ten or fifteen minutes. The weight is the surprising part; the pressure on your chest is considerable and the heat builds slowly. Then you rinse off and get in a normal bath.',
    'The practice is at least three hundred years old here and this is the only beach in Japan doing it at scale. Nearby is Lake Ikeda, a caldera lake with a resident legend of a monster, and Mount Kaimon, a near-perfect cone called Satsuma Fuji.'
  ],
  see: [
    { n: 'Saraku sand bath',
      d: 'On the beach, with a tide-dependent location. Ten to fifteen minutes is the recommended maximum and they will come and check on you.' },
    { n: 'Mount Kaimon',
      d: '924 metres, a spiral path to the top in about two hours, with Yakushima visible from the summit on a clear day.' },
    { n: 'Lake Ikeda',
      d: 'A caldera lake, the largest in Kyushu, with giant eels in it that are real and a monster that is not.' },
    { n: 'Nagasakibana',
      d: 'The southern tip of the peninsula, looking at Kaimon and out to the islands.' },
    { n: 'Chiran',
      d: 'Forty minutes away, the samurai gardens and the kamikaze museum.' },
    { n: 'The Tamatebako train',
      d: 'From Kagoshima, with a half-black half-white livery and sea-facing seats.' }
  ],
  when: 'Year round. The sand bath is pleasant in winter and hard going in August.',
  stay: 'A night.',
  move: 'Ibusuki Makurazaki line from Kagoshima-Chuo, about an hour.',
  eat: 'Okra and mango, which grow here, and somen nagashi at Tosenkyo, where noodles circle in a stone basin fed by spring water.'
},

'KGS-amami': {
  intro: [
    'Amami Oshima is halfway to Okinawa and it was Ryukyuan before Satsuma annexed it in 1609 and ran it as a sugar colony. The language, the music and the food are closer to Okinawa than to Kagoshima, and the sanshin and the island songs are still a living tradition rather than a performance.',
    'It was listed by UNESCO in 2021 for its endemic species, including the Amami rabbit, a dark primitive rabbit with short ears found only here and on Tokunoshima, and the Amami jay. Night tours along the forest roads are how you see them.',
    'The island is also where Oshima tsumugi silk comes from, dyed with mud and tannin from local trees over dozens of immersions, and a kimono can take a year to weave.'
  ],
  see: [
    { n: 'Night wildlife tours',
      d: 'Licensed guides on the Kinsakubaru and Yuwandake forest roads. Amami rabbit sightings are common, plus the Ryukyu scops owl and the Amami tip-nosed frog.' },
    { n: 'The mangroves',
      d: 'The second largest mangrove forest in Japan at Sumiyo, with kayak trips through the channels at high tide.' },
    { n: 'Kinsakubaru',
      d: 'Old-growth subtropical forest with tree ferns, walkable by day as well.' },
    { n: 'Oshima tsumugi',
      d: 'Mud dyeing workshops where you can dye a cloth yourself and see the process, which is genuinely unusual.' },
    { n: 'Hatsuno and Kurasaki beaches',
      d: 'White sand, clear water, and almost nobody. Good snorkelling off several of them.' },
    { n: 'Shimauta',
      d: 'Island song, performed with sanshin in bars in Naze. Ask and someone will point you to a live night.' }
  ],
  when: 'Year round, though the rainy season in May and June is heavy and typhoons come through in late summer.',
  stay: 'Three nights.',
  move: 'Flights from Kagoshima, Osaka and Tokyo, or a long ferry. A hire car is necessary.',
  eat: 'Keihan, chicken and shredded egg over rice with a clear chicken broth poured over, which is the island dish. Also brown sugar shochu, made only here.'
},

/* ===================== OKINAWA ===================== */
'OKN-naha': {
  intro: [
    'Okinawa was the Ryukyu Kingdom, an independent state trading with China, Korea, Japan and Southeast Asia, until Satsuma invaded in 1609 and Japan formally annexed it in 1879. The language, religion, architecture and food are distinct, and the suppression of Ryukyuan language in schools is within living memory.',
    'Shuri Castle was the royal palace. It was destroyed in 1945, rebuilt from 1992, and burned down again in October 2019. Reconstruction is underway with completion planned for 2026, and the site is open with the work visible, which is arguably more interesting than a finished building.',
    'Naha is hot, low-rise and sprawling, with a monorail down the middle and a covered market where you buy fish and take it upstairs to be cooked.'
  ],
  see: [
    { n: 'Shuri Castle',
      d: 'The reconstruction in progress, with viewing platforms into the workshop. The stone walls and the Seiden foundations are original and survived both fires.' },
    { n: 'Tamaudun',
      d: 'The royal mausoleum, from 1501, three stone chambers where the kings were laid out until the bones were cleaned and reinterred. Unlike anything on the main islands.' },
    { n: 'Makishi Public Market',
      d: 'Rebuilt in 2023. Buy fish downstairs, pay a cooking fee upstairs. Noisy and good.' },
    { n: 'Tsuboya pottery district',
      d: 'Kilns since 1682, making the shisa lion figures and heavy glazed ware. A short lane with studios and a small museum.' },
    { n: 'Kokusai-dori',
      d: 'The main tourist street, loud and largely skippable. The lanes off it, particularly the arcades south, are better.' },
    { n: 'Sefa Utaki',
      d: 'An hour out, a sacred grove and the most important site of Ryukyuan religion, where priestesses conducted state rituals. Quiet and worth the trip.' }
  ],
  when: 'Year round. February to April is the best weather. Summer is very hot and typhoons run from July to October.',
  stay: 'Two nights, or as a base.',
  move: 'Flights from everywhere. The Yui monorail from the airport runs through the city.',
  eat: 'Okinawa soba, thick wheat noodles with pork belly in a bonito broth. Goya champuru with bitter melon, rafute braised pork, umibudo sea grapes, and awamori, the local spirit.'
},

'OKN-okinawa-war': {
  intro: [
    'The Battle of Okinawa ran from April to June 1945 and killed somewhere between a hundred and forty and a hundred and fifty thousand civilians, which was roughly a quarter of the island’s population. The number of Okinawan civilian deaths exceeded the military deaths on either side.',
    'The Himeyuri monument is for two hundred and twenty-two schoolgirls and teachers mobilised as nurses, many of whom died in a cave after being ordered out of it as the lines collapsed. Some killed themselves having been told that capture meant worse.',
    'The Cornerstone of Peace at Mabuni lists every name known, about a quarter of a million, regardless of nationality: Japanese, Okinawan, American, British, Korean, Taiwanese. That it refuses to separate them is the point of it.'
  ],
  see: [
    { n: 'Okinawa Prefectural Peace Memorial Museum',
      d: 'At Itoman. Unflinching about the Japanese army’s treatment of Okinawan civilians as well as the American bombardment. Allow ninety minutes.' },
    { n: 'The Cornerstone of Peace',
      d: 'Granite walls radiating towards the sea with every name. Walking it takes a while and that is deliberate.' },
    { n: 'Himeyuri no To',
      d: 'The cave and monument, with a small museum holding the girls’ belongings and testimony from survivors.' },
    { n: 'The Former Japanese Navy Underground Headquarters',
      d: 'At Tomigusuku, four hundred and fifty metres of tunnels where the naval commander and his staff died. Walls still show grenade damage.' },
    { n: 'Chibichiri Gama',
      d: 'A cave at Yomitan where civilians died in a mass suicide. Not a formal site and visited quietly; ask locally before going.' },
    { n: 'The context',
      d: 'Thirty-one thousand US military personnel are still stationed on Okinawa, about seventy per cent of the US base acreage in Japan on 0.6 per cent of its land. The base issue runs directly out of this history.' }
  ],
  when: 'Year round. 23 June is Okinawa Memorial Day.',
  stay: 'Most of a day.',
  move: 'A car from Naha, about forty minutes. Buses are possible but slow.',
  eat: 'Itoman has a fish market. Nothing at the sites themselves.'
},

'OKN-churaumi': {
  intro: [
    'The Kuroshio tank at Churaumi holds seven and a half thousand cubic metres of water behind an acrylic panel sixty centimetres thick, and in it are three whale sharks and several manta rays. When it opened in 2002 it was the largest aquarium tank in the world.',
    'They have bred manta rays here, which almost nobody has managed, and the whale shark programme has run since 1980. The male whale shark, Jinta, has been there since 1995 and is around eight and a half metres.',
    'The rest of the aquarium is built around what is actually in the water off Okinawa, from the shallow coral tanks lit by real sunlight to a deep-sea section with pressure-adapted species collected from six hundred metres down.'
  ],
  see: [
    { n: 'The Kuroshio tank',
      d: 'Sit on the floor and stay a while. Feeding is at 3pm and 5pm when the whale sharks feed vertically, nose up.' },
    { n: 'The coral tank',
      d: 'Open to the sky with no roof, with around eighty species of live coral grown on site rather than collected.' },
    { n: 'The deep sea room',
      d: 'Darkened, with species from the Okinawa trench. Less visited and more interesting than it looks.' },
    { n: 'Emerald Beach',
      d: 'Free, in the same park, with calm water and a view out to Ie island.' },
    { n: 'Ocean Expo Park',
      d: 'The surrounding grounds, including a reconstructed Ryukyuan village and a botanical garden.' },
    { n: 'Kouri Island',
      d: 'Half an hour away, across a bridge over very blue water, with a heart-shaped rock that draws crowds.' }
  ],
  when: 'Year round. Arrive at opening or after 4pm; the middle of the day is extremely busy.',
  stay: 'Half a day.',
  move: 'Bus from Naha, about two and a half hours, or ninety minutes by car.',
  eat: 'A cafe overlooking the big tank, and food in the park. Motobu nearby does good soba.'
},

'OKN-miyako': {
  intro: [
    'Miyakojima has no rivers and no mountains. It is a flat slab of uplifted coral, so rain soaks straight through rather than running off, which means nothing muddies the sea. The water is the clearest in Japan and the colour is the reason people come.',
    'Yonaha Maehama is seven kilometres of white sand with a gradient so gentle you can walk out a long way. It is regularly called the best beach in Japan and the competition is not close.',
    'Three bridges link it to Irabu, Ikema and Kurima. The Irabu bridge is three and a half kilometres, the longest toll-free bridge in Japan, and driving it over that water is one of the better twenty minutes available.'
  ],
  see: [
    { n: 'Yonaha Maehama',
      d: 'Seven kilometres of sand facing west, so it gets the sunset too. Shallow, calm and vast.' },
    { n: 'Irabu Bridge',
      d: 'Three and a half kilometres. Drive it slowly, and there are pull-offs at both ends.' },
    { n: 'Sunayama Beach',
      d: 'Reached over a sand dune, with a natural rock arch on the shore. Small and the best photograph on the island.' },
    { n: 'Yabiji',
      d: 'A large coral reef that surfaces at the lowest spring tides in March and April, when boats take people to walk on it.' },
    { n: 'Diving',
      d: 'Underwater caves and arches around Shimoji, including sites called the Antechamber and the Devil’s Palace, which are among the best cave dives in Japan.' },
    { n: 'Higashi Hennazaki',
      d: 'A two-kilometre cape with a lighthouse, grass and cliffs on both sides.' }
  ],
  when: 'April to October for the water. Typhoons from July. March and April for the reef walk.',
  stay: 'Three nights.',
  move: 'Flights from Naha, Tokyo and Osaka. A hire car is essential and books out in season.',
  eat: 'Miyako soba, with the meat hidden under the noodles, and Miyako beef. Snow salt, harvested here, in everything including ice cream.'
},

'OKN-ishigaki': {
  intro: [
    'Ishigaki is the hub of the Yaeyama islands, four hundred kilometres southwest of Okinawa and closer to Taipei than to Naha. It has an airport with direct flights from Tokyo, which makes it the easiest genuinely tropical place in Japan to reach.',
    'Kabira Bay is the postcard: pale green shallows with small islands in them. You cannot swim there because of the current and the pearl farming, so you take a glass-bottom boat, which is more rewarding than it sounds.',
    'Manta rays gather at Kabira Ishizaki from spring to autumn, and the sighting rate on dives is high enough that this is one of the most reliable manta sites in the world. The island is also the ferry hub for Taketomi, Iriomote and the rest.'
  ],
  see: [
    { n: 'Manta diving', t: 'April to November',
      d: 'Kabira Ishizaki, a cleaning station where mantas queue. Peak season is late summer into autumn. Snorkel trips exist but diving is better.' },
    { n: 'Kabira Bay',
      d: 'Glass-bottom boats over the coral. No swimming permitted.' },
    { n: 'Yonehara Beach',
      d: 'Good snorkelling straight off the sand, with a reef close in. Watch the current beyond the reef edge; it is dangerous.' },
    { n: 'Mount Nosoko',
      d: 'A short steep climb for the north coast and the reef colours from above.' },
    { n: 'Taketomi and Iriomote',
      d: 'Ferries from the port, ten and forty minutes respectively.' },
    { n: 'The night sky',
      d: 'The Yaeyamas are a certified dark sky area and you can see the Southern Cross from here, which is not possible anywhere else in Japan.' }
  ],
  when: 'April to June and October for weather. July to September is hot with typhoon risk but best for manta.',
  stay: 'Three nights, more as a base for the Yaeyamas.',
  move: 'Direct flights from Tokyo, Osaka and Naha. A hire car, and book it early.',
  eat: 'Ishigaki beef, which is exceptional and sold cheaper here than on the mainland. Yaeyama soba, and local chili oil.'
},

'OKN-taketomi': {
  intro: [
    'Taketomi is three and a half kilometres round and the whole village is built to the traditional Ryukyuan pattern: single-storey houses with red tile roofs, coral stone walls, hibiscus hedges and white sand roads that residents rake every morning.',
    'That is enforced by a village charter adopted in 1986, which commits residents not to sell, rent or destroy land or houses. It was a response to outside buyers arriving in the 1970s, and it is the reason the island looks as it does.',
    'The sand on Kondoi beach includes star sand, the skeletons of single-celled foraminifera shaped like stars. You crouch, press your palm into the sand, and pick them out.'
  ],
  see: [
    { n: 'The village',
      d: 'Walk or cycle the sand roads. Shisa figures on every roof, each one made individually by the tiler, so no two are alike.' },
    { n: 'The water buffalo cart',
      d: 'Thirty minutes through the lanes with a driver playing sanshin and singing. Touristy and genuinely pleasant.' },
    { n: 'Kaiji Beach',
      d: 'Where the star sand is. Collecting a few is tolerated; taking quantities is not.' },
    { n: 'Nagomi tower',
      d: 'A small lookout over the red roofs. The classic view of the island.' },
    { n: 'Kondoi Beach',
      d: 'Shallow, calm, with sandbars appearing at low tide.' },
    { n: 'Staying the night',
      d: 'The day trippers leave by late afternoon and the island empties. A minshuku stay with a sanshin evening is the best version of Taketomi.' }
  ],
  when: 'Year round. February to April for comfortable weather.',
  stay: 'A night. Day trips work and miss the better half.',
  move: 'Ferry from Ishigaki, about ten minutes, running frequently.',
  eat: 'Minshuku dinners, and a couple of soba places in the village. Everything closes early.'
},

'OKN-iriomote': {
  intro: [
    'Ninety per cent of Iriomote is subtropical forest and mangrove, and about two thousand four hundred people live on it. There is one road, which goes most of the way round but not all, so the far side is reached on foot or by boat.',
    'The Iriomote cat is a wildcat found nowhere else, about the size of a domestic cat, with maybe a hundred individuals left. Road deaths are the main threat, and there are speed limits, underpasses and signs counting the year’s casualties.',
    'The Urauchi river is the longest in Okinawa prefecture, and the trip up it by boat and then on foot to Maryudu and Kanbire falls is the standard day out. Kayaking the mangroves is better.'
  ],
  see: [
    { n: 'Urauchi river',
      d: 'Boat upstream then about forty minutes on foot to Maryudu falls. Half a day, and it is the busiest thing here.' },
    { n: 'Mangrove kayaking',
      d: 'On the Nakama or Urauchi. Tide dependent and far quieter than the boat trip.' },
    { n: 'Pinaisara Falls',
      d: 'The highest in Okinawa at fifty-five metres. Guided trips kayak in and climb to the top, where you stand at the lip.' },
    { n: 'Hoshizuna beach',
      d: 'Star sand and good snorkelling off the shore.' },
    { n: 'Yubu Island',
      d: 'Reached by water buffalo cart across a shallow strait at low tide, which is the only access.' },
    { n: 'The cat',
      d: 'You will almost certainly not see one. There is a small wildlife centre explaining the conservation work, which is worth the visit instead.' }
  ],
  when: 'April to June and October. Summer is hot with typhoon risk.',
  stay: 'Two nights.',
  move: 'Ferry from Ishigaki, about forty minutes to Ohara or Uehara. A hire car or scooter; buses are infrequent.',
  eat: 'Yaeyama soba, local pork, and the island fruit. Options are limited and book dinner at your lodging.'
},

'OKN-yonaguni': {
  intro: [
    'Yonaguni is the westernmost point of Japan, a hundred and eleven kilometres from Taiwan, which is visible from the island a few days a year in winter. About sixteen hundred people live there, along with the Yonaguni horse, a small native breed that grazes loose on the headlands.',
    'The diving is the draw and it is serious. From December to April, schools of hammerhead sharks gather off the western point in strong current, and this is one of the few reliable places in the world to see them in numbers.',
    'There is also a submerged rock formation off the south coast with flat terraces, right angles and what look like steps. A Ryukyu University geologist argues it is a man-made structure; most geologists say it is natural sandstone fracturing. Either way, diving it is remarkable.'
  ],
  see: [
    { n: 'Hammerhead diving', t: 'December to April',
      d: 'Strong current, deep, and for experienced divers only. Operators are clear about the requirements.' },
    { n: 'The underwater formation',
      d: 'About twenty-five metres down at the deepest. Dived year round in calm weather, and the argument about what it is remains unresolved.' },
    { n: 'Irizaki',
      d: 'The westernmost point of Japan, with a marker and a note about when Taiwan is visible.' },
    { n: 'The Yonaguni horses',
      d: 'Loose on the east end at Agarizaki. Small, unbothered and photographed by everyone.' },
    { n: 'Tategami Iwa',
      d: 'A standing rock on the south coast, with cliffs and a viewpoint.' },
    { n: 'Kubura Bari',
      d: 'A cleft in the rock, with a grim local story about pregnant women being made to jump it during the Satsuma head-tax era.' }
  ],
  when: 'December to April for hammerheads. Summer for calm seas and general diving.',
  stay: 'Three nights. Flights get cancelled and you need slack in the schedule.',
  move: 'Flights from Ishigaki, about thirty minutes, or a ferry that is notoriously rough. A hire car on the island.',
  eat: 'Kajiki marlin, long-term aged awamori called hanazake at sixty per cent alcohol, and Yonaguni’s own soba.'
}
};

/* Look-up used by the place page. Returns null rather than an empty
   object when a place has no entry, so the caller can simply test it. */
function jpGuide(id){
  return (typeof JP_GUIDE !== 'undefined' && JP_GUIDE[id]) ? JP_GUIDE[id] : null;
}

/* How much of the atlas has been written up. */
function jpGuideCount(){
  try { return Object.keys(JP_GUIDE).length; } catch(e){ return 0; }
}
