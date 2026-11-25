/* ===========================================================
   EGYPT: the written guides

   One entry per place:

     id -> { intro: [paragraphs], see: [{n, t?, d}], when, stay, move, eat }

   This file is NOT loaded by index.html. core/lazy.js fetches it
   the first time somebody opens a Egyptian place page, because at
   this size it has no business sitting on the critical path of a
   visitor who only ever looks at Utah.

   On the writing. These read like something a person wrote after
   going there: a concrete fact early, an opinion where one is
   warranted, and the practical thing you would actually want to
   know. Deliberately avoided: em dashes, "nestled", "boasts",
   "hidden gem", "must-visit", and the construction where every
   sentence is balanced against its own opposite.

   Egyptian transliteration has no single standard. This file uses
   the form most likely to be on the ticket and the road sign,
   which is usually the one Wikipedia files under, and keeps
   el- rather than al- where common English usage has settled on
   it (Khan el-Khalili, Deir el-Medina).
   =========================================================== */

/* Wikipedia article titles where they differ from the name this
   atlas uses. Without these the photo lookup misses. */
const EG_WIKI = {
  'ALX-alexandria': 'Alexandria',
  'ALX-bibliotheca': 'Bibliotheca Alexandrina',
  'ALX-catacombs': 'Catacombs of Kom El Shoqafa',
  'ALX-montazah': 'Montaza Palace',
  'ALX-qaitbay': 'Citadel of Qaitbay',
  'ASW-abu-simbel': 'Abu Simbel',
  'ASW-aswan': 'Aswan',
  'ASW-edfu': 'Temple of Edfu',
  'ASW-elephantine': 'Elephantine',
  'ASW-high-dam': 'Aswan Dam',
  'ASW-kitcheners-island': 'Kitchener\'s Island',
  'ASW-kom-ombo': 'Kom Ombo',
  'ASW-lake-nasser': 'Lake Nasser',
  'ASW-nubian-village': 'Nubians',
  'ASW-philae': 'Philae',
  'ASW-st-simeon': 'Monastery of Saint Simeon (Aswan)',
  'ASW-unfinished-obelisk': 'Unfinished obelisk',
  'CAI-al-azhar-park': 'Al-Azhar Park',
  'CAI-al-muizz': 'Al-Muizz Street',
  'CAI-cairo': 'Cairo',
  'CAI-citadel': 'Citadel of Cairo',
  'CAI-city-of-the-dead': 'City of the Dead (Cairo)',
  'CAI-coptic-cairo': 'Coptic Cairo',
  'CAI-egyptian-museum': 'Egyptian Museum',
  'CAI-gem': 'Grand Egyptian Museum',
  'CAI-heliopolis': 'Heliopolis, Cairo',
  'CAI-ibn-tulun': 'Mosque of Ibn Tulun',
  'CAI-khan-el-khalili': 'Khan el-Khalili',
  'CAI-nilometer': 'Nilometer',
  'CAI-zamalek': 'Zamalek',
  'DLT-rosetta': 'Rosetta',
  'DLT-tanis': 'Tanis',
  'DLT-tanta': 'Tanta',
  'DLT-wadi-natrun': 'Wadi El Natrun',
  'FAY-fayoum-city': 'Faiyum',
  'FAY-lake-qarun': 'Lake Moeris',
  'FAY-meidum': 'Meidum',
  'FAY-tunis-village': 'Tunis, Egypt',
  'FAY-wadi-el-hitan': 'Wadi El Hitan',
  'GIZ-abusir': 'Abusir',
  'GIZ-dahshur': 'Dahshur',
  'GIZ-memphis': 'Memphis, Egypt',
  'GIZ-pyramids': 'Giza pyramid complex',
  'GIZ-saqqara': 'Saqqara',
  'GIZ-sphinx': 'Great Sphinx of Giza',
  'LXR-colossi': 'Colossi of Memnon',
  'LXR-deir-el-medina': 'Deir el-Medina',
  'LXR-esna': 'Esna',
  'LXR-felucca-nile': 'Felucca',
  'LXR-hatshepsut': 'Mortuary Temple of Hatshepsut',
  'LXR-karnak': 'Karnak',
  'LXR-luxor-museum': 'Luxor Museum',
  'LXR-luxor-temple': 'Luxor Temple',
  'LXR-medinet-habu': 'Medinet Habu',
  'LXR-nobles-tombs': 'Theban Necropolis',
  'LXR-ramesseum': 'Ramesseum',
  'LXR-valley-of-kings': 'Valley of the Kings',
  'LXR-valley-of-queens': 'Valley of the Queens',
  'LXR-west-bank-balloon': 'Luxor',
  'MDE-abydos': 'Abydos, Egypt',
  'MDE-amarna': 'Amarna',
  'MDE-beni-hasan': 'Beni Hasan',
  'MDE-dendera': 'Dendera',
  'MDE-minya': 'Minya, Egypt',
  'MDE-red-monastery': 'Red Monastery',
  'MDE-tuna-el-gebel': 'Tuna el-Gebel',
  'MTR-el-alamein': 'El Alamein',
  'MTR-marsa-matruh': 'Mersa Matruh',
  'RSE-el-gouna': 'El Gouna',
  'RSE-el-quseir': 'Al-Qusayr, Egypt',
  'RSE-giftun': 'Giftun',
  'RSE-hurghada': 'Hurghada',
  'RSE-marsa-alam': 'Marsa Alam',
  'RSE-safaga': 'Safaga',
  'RSE-wadi-el-gemal': 'Wadi El Gemal National Park',
  'SSI-blue-hole': 'Blue Hole (Red Sea)',
  'SSI-coloured-canyon': 'Coloured Canyon',
  'SSI-dahab': 'Dahab',
  'SSI-mount-sinai': 'Mount Sinai',
  'SSI-nuweiba': 'Nuweiba',
  'SSI-ras-mohammed': 'Ras Muhammad National Park',
  'SSI-sharm': 'Sharm El Sheikh',
  'SSI-st-catherine': 'Saint Catherine\'s Monastery',
  'SSI-taba': 'Taba, Egypt',
  'SSI-tiran': 'Straits of Tiran',
  'SUZ-ismailia': 'Ismailia',
  'SUZ-port-said': 'Port Said',
  'WDS-bahariya': 'Bahariya Oasis',
  'WDS-black-desert': 'Black Desert (Egypt)',
  'WDS-crystal-mountain': 'Western Desert (Egypt)',
  'WDS-dakhla': 'Dakhla Oasis',
  'WDS-farafra': 'Farafra, Egypt',
  'WDS-gilf-kebir': 'Gilf Kebir',
  'WDS-kharga': 'Kharga Oasis',
  'WDS-siwa': 'Siwa Oasis',
  'WDS-white-desert': 'White Desert (Egypt)'
};

const EG_GUIDE = {
'CAI-cairo': {
  intro: [
    'Cairo is called al-Qahira, the victorious, a name the Fatimids gave it when they founded the walled city in 969. But people had been living on this stretch of the Nile for four thousand years before that: Memphis is twenty kilometres south, the Romans built a fortress at Babylon which is now Coptic Cairo, and the Arab conquerors founded Fustat beside it in 641.',
    'What that produces is a city where the layers are all still standing rather than buried. You can see a pharaonic obelisk, a fourth-century church, a ninth-century mosque, a twelfth-century citadel and a fourteenth-century merchant house in one afternoon, and all of them are still in use.',
    'The traffic is the other fact. Around twenty-two million people in the metropolitan area, a road system that was not designed for it, and a driving culture based on horn signals and negotiation. Crossing a road on foot is done by walking out steadily and letting the cars go round you, which is terrifying the first time and works.'
  ],
  see: [
    { n: 'Islamic Cairo',
      d: 'The stretch from Bab al-Futuh down al-Muizz to Bab Zuwayla is the densest concentration of medieval Islamic architecture in the world. Walk it in the late afternoon and go up Bab Zuwayla’s minarets at the end.' },
    { n: 'The Grand Egyptian Museum',
      d: 'Out by the pyramids, holding the full Tutankhamun collection for the first time. Book ahead and allow most of a day.' },
    { n: 'Khan el-Khalili',
      d: 'A working commercial quarter since 1382. The tourist lanes are at the front; the coppersmiths, goldsmiths and spice sellers are deeper in and are where Egyptians shop.' },
    { n: 'Coptic Cairo',
      d: 'Churches inside a Roman fortress, the Hanging Church suspended over a gatehouse, and Ben Ezra synagogue where the Cairo Geniza was found: three hundred thousand medieval Jewish documents in a storeroom.' },
    { n: 'Al-Azhar Park at sunset',
      d: 'Thirty hectares built on a rubbish tip, with the Ayyubid wall uncovered beneath it and the best view over the minarets of the old city.' },
    { n: 'A felucca at dusk',
      d: 'An hour on the river from the Garden City corniche, which is the only way to be in Cairo and have it be quiet.' }
  ],
  when: 'October to April. Summer runs to forty degrees and the dust is worse. Ramadan changes everything: nothing serves in daylight and the city comes alive after sunset.',
  stay: 'Four nights minimum.',
  move: 'Taxis and Uber, which is cheap and avoids the fare argument. The metro is fast, cheap and has women-only carriages. Walking is viable in the old city and nowhere else.',
  eat: 'Koshari, a bowl of rice, lentils, pasta, chickpeas, fried onion and tomato sauce, which is the national dish and costs almost nothing. Ful medames for breakfast, taameya, which is falafel made with broad beans, and mahshi.'
},

'CAI-gem': {
  intro: [
    'The Grand Egyptian Museum was announced in 1992, had its foundation stone laid in 2002, and opened in stages from 2024. It covers about half a million square metres on a plateau two kilometres from the pyramids, and the alignment is deliberate: from the main staircase the three pyramids are framed at the end of a glass wall.',
    'The reason it exists is that the Tahrir museum had around a hundred and fifty thousand objects in a building designed for a fraction of that, with most of the collection in storage and the Tutankhamun material split between display and basement. This holds over a hundred thousand objects with room to show them.',
    'The Tutankhamun galleries show all five thousand-odd objects from the tomb together for the first time since Howard Carter cleared it between 1922 and 1932. That includes the chariots, the beds, the shrines, the gloves and the walking sticks, not just the gold.'
  ],
  see: [
    { n: 'The Tutankhamun galleries',
      d: 'Allow two hours for these alone. The scale of what was in a small, hurriedly prepared tomb for a minor king is the thing that lands.' },
    { n: 'The Grand Staircase',
      d: 'Six flights with large statuary arranged up it chronologically, ending at the glass wall with the pyramids behind.' },
    { n: 'The Ramesses II colossus',
      d: 'Eleven metres and eighty-three tonnes, moved here from a square in central Cairo in 2006 on an overnight operation watched by crowds.' },
    { n: 'The Khufu solar boat',
      d: 'A forty-three metre cedar vessel found dismantled in a pit beside the Great Pyramid in 1954, moved here in 2021 over two days on a remote-controlled transporter.' },
    { n: 'The conservation centre',
      d: 'Visible in part, with nineteen laboratories. The textile work on Tutankhamun’s linens has recovered garments nobody had been able to unfold since 1922.' },
    { n: 'Going early',
      d: 'Book the first slot. The building is enormous and the galleries fill from mid-morning with coach groups from the pyramids.' }
  ],
  when: 'October to April. Allow a full day and do not try to combine it with the pyramids in the same morning.',
  stay: 'A full day.',
  move: 'Taxi from central Cairo, about forty-five minutes depending on traffic. It is beside the Giza plateau, not in the city.',
  eat: 'Several restaurants on site with pyramid views. Giza village below has better and cheaper.'
},

'CAI-egyptian-museum': {
  intro: [
    'The museum on Tahrir Square opened in 1902 and was the first purpose-built museum in the Middle East. It was designed by a French architect in a neoclassical style and it has been overcrowded for a century: objects on the floor, labels handwritten in the 1920s, and a basement full of things nobody had catalogued.',
    'Most people assume that with the Grand Egyptian Museum open this is now empty. It is not. Around a hundred and seventy thousand objects remain, including the Narmer Palette, the Amarna material, and the royal mummies which went to the National Museum of Egyptian Civilization in a televised parade in 2021.',
    'The building itself is now the attraction as much as the collection. It is being reorganised into a museum of the history of Egyptology, which is the right answer: this is where the discipline was assembled and the clutter is part of the record.'
  ],
  see: [
    { n: 'The Narmer Palette',
      d: 'A shield-shaped slate carving of around 3100 BC showing a king wearing the crowns of Upper and Lower Egypt, which is conventionally read as the unification of the country. The single most important object in Egyptian archaeology.' },
    { n: 'The Amarna room',
      d: 'Akhenaten’s colossi with their elongated faces and heavy hips, which broke two thousand years of artistic convention in about a decade and then were broken up themselves.' },
    { n: 'The Yuya and Thuya material',
      d: 'The near-intact tomb of Tutankhamun’s great-grandparents, found in 1905, which was the richest discovery in Egypt before 1922.' },
    { n: 'The Fayum portraits',
      d: 'Roman-era panel paintings on mummy cases, painted in encaustic from life, which look startlingly like photographs of individual people.' },
    { n: 'The old labels',
      d: 'Handwritten cards in French from the early twentieth century, still in place on some cases. Part of the point now.' },
    { n: 'The pink building',
      d: 'On Tahrir Square, which is itself where the 2011 uprising happened, with a memorial to the dead on the edge of it.' }
  ],
  when: 'Year round, and it is indoors. Mornings are quieter.',
  stay: 'Two to three hours.',
  move: 'Metro to Sadat, which comes up in the square. Central and walkable from downtown hotels.',
  eat: 'Downtown Cairo has old cafes: Groppi, Café Riche, and the koshari places on Sharia Tahrir.'
},

'CAI-khan-el-khalili': {
  intro: [
    'The Khan was founded in 1382 by a Mamluk emir named Jaharkas al-Khalili, who demolished a Fatimid mausoleum to build a caravanserai on the site, which caused considerable offence at the time. It has been a commercial quarter continuously since.',
    'The organisation is by trade, which is the medieval system and still largely holds: coppersmiths on one lane, goldsmiths on another, spice merchants on a third, and the perfume and oud sellers in a particular alley. The further in you go the less tourist-facing it becomes.',
    'El Fishawy has been serving tea and shisha more or less continuously since 1797, in a narrow alley with mirrors on the walls. Naguib Mahfouz wrote here and set much of the Cairo Trilogy in these streets, which is why there is a restaurant named after him nearby that he never used.'
  ],
  see: [
    { n: 'The coppersmiths',
      d: 'Off the main lanes, where trays and pots are still beaten by hand. You hear it before you find it.' },
    { n: 'El Fishawy',
      d: 'Mint tea or karkadeh. Crowded, touristy and two hundred and twenty years old, which earns it a pass.' },
    { n: 'The Gold Quarter',
      d: 'Sagha, where Egyptians buy wedding gold by weight at the daily rate plus a making charge. Worth seeing even without buying.' },
    { n: 'The spice and perfume alleys',
      d: 'Deeper in, towards al-Muizz. Hibiscus, cumin, dried limes and oud oils sold from barrels.' },
    { n: 'Bab al-Ghuri and the Wikala',
      d: 'A restored caravanserai nearby with craft workshops and a whirling dervish performance several evenings a week, which is free and genuinely good.' },
    { n: 'Bargaining',
      d: 'Expected and not aggressive if you are cheerful about it. Start at about a third and expect to settle near half. Walking away works.' }
  ],
  when: 'Late afternoon into the evening, when the lanes are lit and cooler. Fridays are quieter in the morning.',
  stay: 'Three hours.',
  move: 'Taxi to al-Azhar mosque and walk across the underpass. Entirely pedestrian inside.',
  eat: 'Tea at El Fishawy. Grilled meat at the stalls on the edge, and fiteer, a layered pastry done sweet or savoury.'
},

'CAI-al-muizz': {
  intro: [
    'Al-Muizz li-Din Allah Street runs about a kilometre from Bab al-Futuh in the north to Bab Zuwayla in the south, which were the Fatimid gates, and it was the main artery of the walled city founded in 969. Along it are something over thirty standing monuments from the tenth to the nineteenth century.',
    'UNESCO describes it as the greatest concentration of medieval Islamic architecture in the world, and the claim stands up: Fatimid, Ayyubid, Mamluk and Ottoman buildings in an unbroken sequence, several of them with their original minarets, domes and carved stone facades.',
    'It was pedestrianised and restored between 1997 and 2008, and the street is now lit at night and free to walk. The individual monuments charge small entrance fees and several of them are rarely open, which is worth knowing before planning around a specific building.'
  ],
  see: [
    { n: 'Bab Zuwayla',
      d: 'The southern Fatimid gate of 1092, with two minarets added in 1420 that you can climb. The view down the street and over the roofs of the old city is the best in Cairo.' },
    { n: 'Qalawun complex',
      d: 'A hospital, a madrasa and a mausoleum built in 1285, with a dome over an arrangement of columns and a facade of carved stone and glass mosaic. The hospital operated until the nineteenth century.' },
    { n: 'Sultan al-Ghuri complex',
      d: 'A mosque and a mausoleum facing each other across the street, with a striped marble floor and a wikala behind holding evening performances.' },
    { n: 'Bayt al-Suhaymi',
      d: 'A merchant house of 1648 around a courtyard, with mashrabiya screens, a reception hall with a fountain and a separate women’s floor. The best domestic building in Cairo.' },
    { n: 'Al-Aqmar mosque',
      d: 'From 1125, small, with the earliest decorated stone facade in Cairo and the first built on the street line rather than the qibla.' },
    { n: 'Walking it at night',
      d: 'Lit, open, and Egyptians use it as a promenade. Considerably better than the middle of the day.' }
  ],
  when: 'October to April. Late afternoon and evening. Many monuments close by five.',
  stay: 'A long afternoon.',
  move: 'Taxi to either gate and walk the length. Entirely pedestrian.',
  eat: 'Street food along the way, and the restaurants around Hussein Square at the southern end.'
},

'CAI-citadel': {
  intro: [
    'Saladin began fortifying this spur of the Mokattam hills in 1176, using stone taken from the smaller pyramids at Giza, and it remained the seat of Egyptian government for about seven hundred years until Khedive Ismail moved to Abdeen Palace in the 1870s.',
    'The massacre of the Mamluks happened here in 1811. Muhammad Ali invited around six hundred Mamluk leaders to a ceremony, and as they rode down a narrow defile between the gates his troops opened fire from the walls. Accounts differ on whether one escaped by jumping his horse off the wall.',
    'The mosque Muhammad Ali built on the terrace is Ottoman rather than Egyptian in style, modelled on the Yeni Mosque in Istanbul, and it is covered in alabaster. Architectural historians are divided about it; it dominates the Cairo skyline regardless and it is what most people picture when they picture the citadel.'
  ],
  see: [
    { n: 'The Muhammad Ali Mosque',
      d: 'Alabaster-clad with two pencil minarets, finished in 1848. The clock in the courtyard was a gift from Louis Philippe in exchange for the Luxor obelisk now in the Place de la Concorde, and it has never worked.' },
    { n: 'The terrace view',
      d: 'Over the whole of Islamic Cairo, with the Sultan Hassan mosque immediately below and the pyramids visible on a clear day, which is not most days.' },
    { n: 'Al-Nasir Muhammad Mosque',
      d: 'From 1318, with minarets covered in green and white faience, which is the only Mamluk building left in the citadel and considerably older than the famous one.' },
    { n: 'The Police Museum',
      d: 'In the former prison, with an exhibit on political assassinations and a terrace on the northern enclosure wall.' },
    { n: 'Sultan Hassan and al-Rifai',
      d: 'Two enormous mosques facing each other at the foot of the citadel. Sultan Hassan, from 1363, is one of the great buildings of the Islamic world and the scale inside is startling.' },
    { n: 'The gates',
      d: 'Bab al-Azab, where the 1811 massacre happened, with the defile still visible.' }
  ],
  when: 'October to April, in the morning before the haze builds.',
  stay: 'Three hours with Sultan Hassan.',
  move: 'Taxi. It is on a hill and there is no useful public transport to the gate.',
  eat: 'Nothing good inside. Al-Azhar Park is fifteen minutes away and has two restaurants with the best view in the city.'
},

'CAI-ibn-tulun': {
  intro: [
    'Ahmad ibn Tulun was sent from Baghdad as governor in 868, made himself effectively independent, and built a new capital with this mosque at its centre, finished in 879. It is the oldest mosque in Egypt surviving in its original form and one of the largest in the world by area.',
    'The plan is Iraqi rather than Egyptian: a vast open courtyard surrounded by arcades of pointed arches on brick piers, with a spiral minaret modelled on the one at Samarra. The whole thing is built of fired brick covered in stucco, which was unusual in Cairo, where stone was normal.',
    'It is almost always empty. There is no entrance charge, the courtyard is six and a half thousand square metres, and you can sit in the arcade for an hour and see three or four other people. After Khan el-Khalili the silence is the thing.'
  ],
  see: [
    { n: 'The courtyard',
      d: 'Walk out into the middle. The arcades run round all four sides and the carved stucco in the soffits of the arches is the original ninth-century work.' },
    { n: 'The minaret',
      d: 'An external spiral staircase, climbable, with the fountain pavilion below and the citadel beyond. Not for anyone uncomfortable with heights or open edges.' },
    { n: 'The ablution fountain',
      d: 'A thirteenth-century domed pavilion in the middle, added by Sultan Lajin, who had hidden in the mosque as a fugitive and restored it in thanks.' },
    { n: 'Gayer-Anderson Museum',
      d: 'Two sixteenth and seventeenth-century houses joined together, furnished by a British army officer in the 1930s and left to Egypt. The roof terrace looks into the mosque.' },
    { n: 'The wooden frieze',
      d: 'Running round the interior, originally carrying the whole Quran carved in Kufic script, of which a substantial amount survives.' },
    { n: 'The silence',
      d: 'Go in the middle of the day, which is when the rest of Cairo is at its worst and this is at its best.' }
  ],
  when: 'Year round. It is open, free and shaded.',
  stay: 'Ninety minutes with the Gayer-Anderson house.',
  move: 'Taxi, or the metro to Sayyida Zeinab and a fifteen-minute walk.',
  eat: 'The Sayyida Zeinab district nearby has very good cheap food and almost no visitors.'
},

'CAI-coptic-cairo': {
  intro: [
    'The Romans built a fortress called Babylon here in about AD 300 on the site of an earlier Persian one, at the point where a canal joined the Nile. Its round bastions are still standing and the churches of Coptic Cairo are built inside and on top of them.',
    'The Coptic Orthodox Church traces itself to Saint Mark, who is said to have brought Christianity to Alexandria around AD 42, which makes it one of the oldest Christian communities anywhere. Copts are perhaps ten per cent of the Egyptian population and the liturgy preserves the Egyptian language in its final form.',
    'The Hanging Church is built over the gatehouse of the fortress, so its nave is suspended across the gap between two bastions, with a section of glass floor showing the drop. It has been there in some form since the third century and the current structure is largely ninth.'
  ],
  see: [
    { n: 'The Hanging Church',
      d: 'Up twenty-nine steps, with a thirteenth-century pulpit on thirteen columns and the glass panel in the floor. The screens are ebony and ivory.' },
    { n: 'Coptic Museum',
      d: 'The best collection of Coptic art anywhere, including textiles, the Nag Hammadi codices and carved wood and stone that shows the transition from pharaonic to Christian iconography.' },
    { n: 'Ben Ezra Synagogue',
      d: 'Where the Cairo Geniza was found in 1896: around three hundred thousand manuscript fragments in a sealed storeroom, which transformed what is known about medieval Mediterranean Jewish life.' },
    { n: 'Saints Sergius and Bacchus',
      d: 'With a crypt where the Holy Family is said to have sheltered during the flight into Egypt. Usually flooded and viewed through a grille.' },
    { n: 'The Roman towers',
      d: 'Two bastions of the fortress, one supporting the Greek Orthodox church of St George, which is round because it sits on a round tower.' },
    { n: 'Amr ibn al-As',
      d: 'Ten minutes away, the first mosque built in Africa, founded in 641, though nothing of the original fabric survives.' }
  ],
  when: 'Year round. Coptic Christmas on 7 January and Easter are busy with pilgrims.',
  stay: 'Three hours.',
  move: 'Metro to Mar Girgis, which comes up at the entrance. The easiest major site in Cairo to reach.',
  eat: 'Little in the compound. The Fustat area nearby has local places.'
},

'CAI-al-azhar-park': {
  intro: [
    'For five hundred years this was where Cairo put its rubbish. By the 1980s the mound stood about forty-five metres above the surrounding streets and held an estimated half a million cubic metres of debris. The Aga Khan Trust for Culture bought it in 1984 and spent twenty years turning it into a park.',
    'Clearing it uncovered something nobody expected: about a kilometre and a half of the twelfth-century Ayyubid city wall, buried under the fill, with towers and a wall-walk largely intact. It was excavated and consolidated and now forms the western edge of the park.',
    'The project also funded restoration and housing work in Darb al-Ahmar, the neighbourhood immediately below, which was one of the poorest in Cairo. That half of it is less visible to a visitor and was arguably the more important part.'
  ],
  see: [
    { n: 'The hilltop terrace at sunset',
      d: 'Looking west over the minarets of Islamic Cairo with the citadel to the left. The best view in the city and it costs a few pounds to get in.' },
    { n: 'The Ayyubid wall',
      d: 'Along the western edge, with towers and an interior gallery. Access is intermittent; ask at the gate.' },
    { n: 'The formal gardens',
      d: 'A central axis of water channels in a Fatimid and Timurid idiom, with citrus and palm. Egyptians picnic here in large numbers on Fridays.' },
    { n: 'The lakeside restaurant',
      d: 'Reasonable food and the view is the reason. The hilltop one is better and more expensive.' },
    { n: 'Darb al-Ahmar',
      d: 'The restored quarter below, with workshops and the Umm al-Sultan Shaban mosque, which can be visited on a walk down from the park.' },
    { n: 'Friday evening',
      d: 'When families come out. The park is a social space rather than a monument and that is when it is most itself.' }
  ],
  when: 'Late afternoon into the evening, year round. Ramadan evenings are particularly busy and worth seeing.',
  stay: 'Two hours.',
  move: 'Taxi to the Salah Salem gate. Walkable from the citadel in about twenty minutes.',
  eat: 'Two restaurants in the park. The streets below have excellent cheap food.'
},

'CAI-city-of-the-dead': {
  intro: [
    'The Qarafa is a necropolis about six kilometres long on the eastern edge of the city, where Mamluk sultans and emirs built mausoleum complexes from the thirteenth century: domed tomb chambers with attached mosques, madrasas and courtyards, built as places where families would come and stay.',
    'That was the original intention, and it is why people live there now. The tombs were designed with rooms, so when housing pressure grew families moved in, and there is a long-standing resident population of somewhere between fifty thousand and half a million depending on how you count and who is asking.',
    'Since 2020 substantial parts have been demolished for a motorway and a bridge, including documented Mamluk tombs and the graves of several notable twentieth-century Egyptians. This has been a serious and public controversy and the position changes; some of what guidebooks describe is gone.'
  ],
  see: [
    { n: 'Qaytbay’s complex',
      d: 'From 1474, with a dome carved in a star and arabesque pattern that is the high point of Mamluk stone cutting and was on the Egyptian one-pound note.' },
    { n: 'The Southern Cemetery',
      d: 'Around Imam al-Shafi’i, with the mausoleum of the founder of one of the four Sunni schools of law, under a dome with a boat on top.' },
    { n: 'Barquq’s complex',
      d: 'From 1411, with twin domes and twin minarets, which is unusual, and a large open courtyard.' },
    { n: 'The living city',
      d: 'Washing lines between tombs, shops, a school. Visiting respectfully means not photographing people and going with a guide who is known there.' },
    { n: 'The demolitions',
      d: 'Visible, raw and worth understanding. Campaigners have documented what has gone and the argument about development against heritage is live.' },
    { n: 'Going with a guide',
      d: 'Strongly advised. It is a residential area rather than a tourist site and a local guide makes the difference between intrusion and welcome.' }
  ],
  when: 'Morning, October to April. Fridays are quiet.',
  stay: 'Two hours.',
  move: 'Taxi, with a guide arranged beforehand.',
  eat: 'Local tea stalls. Nothing aimed at visitors, which is the point.'
},

'CAI-zamalek': {
  intro: [
    'Gezira, the island in the Nile that holds Zamalek, was laid out for the opening of the Suez Canal in 1869, when Khedive Ismail wanted to show visiting European royalty that Cairo was a modern capital. He built a palace, planted gardens with specimens from Belgium, and had an opera house constructed in six months.',
    'What followed was a district of apartment blocks built between the 1920s and 1950s in art deco and modernist styles, for the foreign and Egyptian professional classes, with balconies, high ceilings and lifts with folding iron gates. A good many of them are still standing and lived in.',
    'It is now where the embassies, the galleries and a disproportionate number of the city’s good restaurants are, and it is the calmest part of Cairo. The Gezira Club occupies a large part of the island and has done since the British army took the land in 1882.'
  ],
  see: [
    { n: 'Cairo Tower',
      d: 'A hundred and eighty-seven metres of concrete latticework finished in 1961, built with money the CIA had reportedly offered Nasser as a bribe, which he spent on this instead. Revolving restaurant and the best overview of the city.' },
    { n: 'The deco architecture',
      d: 'Walk Sharia Ismail Mohamed and the streets around Brazil Street. The blocks are deteriorating and several are listed.' },
    { n: 'The Aquarium Grotto Garden',
      d: 'An artificial cave system of 1867 with tanks in the walls, mostly empty of fish now, and a public garden people use for weddings.' },
    { n: 'Gezirah Art Centre and the galleries',
      d: 'Several contemporary spaces, with Townhouse and others downtown across the bridge.' },
    { n: 'The Marriott',
      d: 'Built around Ismail’s 1869 palace, which was put up for the Empress Eugénie’s visit. The public rooms are open and the garden is a good place to sit.' },
    { n: 'Eating',
      d: 'Zamalek has the densest concentration of good restaurants in Cairo, from Lebanese to Egyptian to the long-established Sequoia on the northern tip.' }
  ],
  when: 'Year round. Evenings, when the heat has gone and the island is busy.',
  stay: 'An afternoon and an evening.',
  move: 'Taxi, or walk across the Qasr al-Nil bridge from downtown, which has bronze lions on it and is the city’s promenade on a Friday.',
  eat: 'Abou El Sid for Egyptian food in a heavily decorated room, Zooba for modern koshari, and the Nile-side places on the northern end.'
},

'CAI-heliopolis': {
  intro: [
    'Baron Édouard Empain was a Belgian industrialist who came to Egypt in 1904 to build a railway, bought ten square kilometres of desert outside Cairo, and built a city on it. Heliopolis opened in 1910 with its own tram line, hotel, racecourse and water supply, aimed at the European and wealthy Egyptian population.',
    'The architectural style was invented for the project: a mixture of Islamic, Persian and European elements that the architects called Heliopolis style, with arcades at street level, horseshoe arches and tiled domes. A good deal of it survives, though badly maintained and overshadowed by later building.',
    'Empain also built himself a palace shaped like a Hindu temple, with a tower that reportedly revolved, carved with elephants, serpents and Shiva. It stood empty and decaying for decades, with the usual accumulation of ghost stories, and was restored and opened to the public in 2020.'
  ],
  see: [
    { n: 'Baron Empain Palace',
      d: 'Opened in 2020 after restoration, with the interiors and a museum on the founding of Heliopolis. The exterior carving is the thing and it is unlike anything else in Africa.' },
    { n: 'The Basilica',
      d: 'Modelled on Hagia Sophia, where Empain is buried in the crypt. Still a working Catholic church.' },
    { n: 'The arcaded streets',
      d: 'Around Sharia al-Ahram and Baghdad Street, with the original apartment blocks and ground-floor arcades.' },
    { n: 'The tram',
      d: 'The original Heliopolis line closed in 2019 after a hundred and ten years and part of it is being rebuilt. Check the current position.' },
    { n: 'The Heliopolis Palace Hotel',
      d: 'Built in 1910 as one of the largest hotels in the world and now the presidential palace, so it is viewed from outside only.' },
    { n: 'Ancient Heliopolis',
      d: 'A completely different place: the pharaonic sun-cult city of Iunu at Matariya, of which an obelisk of Senusret I still stands, the oldest standing obelisk in Egypt.' }
  ],
  when: 'Year round. Mornings, before the traffic.',
  stay: 'Half a day.',
  move: 'Taxi or metro line 3. About forty minutes from downtown depending on traffic.',
  eat: 'Long-established Egyptian and Armenian places in the district, which are not on any tourist route.'
},

'CAI-nilometer': {
  intro: [
    'Egypt’s entire economy depended on the height of the Nile flood, and the tax rate was set by it. Too low meant famine; too high meant destroyed villages; the narrow band in between meant a good year. So the flood was measured, and the measurement was a state function.',
    'The nilometer on Rhoda island was built in 861 under the Abbasid caliph al-Mutawakkil and it is one of the oldest Islamic structures in Egypt. It is a stone-lined shaft with a marble column in the middle, marked in cubits, connected to the river by three tunnels at different heights.',
    'It worked until the Aswan dams ended the flood in the twentieth century. The conical roof is a modern reconstruction; the shaft, the column and the Kufic inscriptions round the walls are original, and the inscriptions are among the earliest surviving examples of that script in Egypt.'
  ],
  see: [
    { n: 'The shaft',
      d: 'You go down a stair into it. The column is marked in nineteen cubits and the pointed arches round the walls are among the earliest in Islamic architecture anywhere.' },
    { n: 'The inscriptions',
      d: 'Quranic verses in Kufic script round the walls, ninth century, concerning water and vegetation.' },
    { n: 'Manasterly Palace',
      d: 'Beside it, an 1851 reception hall on the river with painted ceilings, used as a concert venue.' },
    { n: 'Umm Kulthum Museum',
      d: 'In the same compound, for the singer who was the most famous voice in the Arab world, with her dresses, her glasses and recordings.' },
    { n: 'The southern tip of Rhoda',
      d: 'Quiet, with the river on both sides, which is unusual in central Cairo.' },
    { n: 'The emptiness',
      d: 'Almost nobody comes here, which given what it is remains surprising.' }
  ],
  when: 'Year round. Mornings.',
  stay: 'An hour.',
  move: 'Taxi to the southern end of Rhoda island, or metro to El-Malek El-Saleh and a short walk.',
  eat: 'Nothing on site. Old Cairo and Fustat are a short drive.'
},

'GIZ-pyramids': {
  intro: [
    'The Great Pyramid was built for Khufu in about 2560 BC, took probably twenty years, and used an estimated 2.3 million blocks averaging around two and a half tonnes. It stood a hundred and forty-six and a half metres when complete and was the tallest structure made by humans for roughly three thousand eight hundred years, which is a record that will not be broken.',
    'It is also the only one of the seven wonders of the ancient world still standing. The others are gone; this was already ancient when Herodotus visited, and it was ancient to Cleopatra by a greater margin than Cleopatra is to us.',
    'The builders were not slaves. Workers’ villages excavated nearby since 1990 show bakeries, breweries, medical care for broken bones, and tombs where the workers were buried in the shadow of the thing they built, which nobody would have permitted for slaves.'
  ],
  see: [
    { n: 'Going inside Khufu', t: 'extra ticket, capped daily',
      d: 'Up the Grand Gallery, which is forty-seven metres long and eight and a half high with corbelled walls, to a granite burial chamber. Hot, airless and steep, and there is nothing in it. Worth it for the gallery alone.' },
    { n: 'The panorama point',
      d: 'On the desert side, where all three pyramids line up. Most tours stop here and it is the standard photograph.' },
    { n: 'Khafre’s casing',
      d: 'The second pyramid still has its limestone casing at the top, which shows what all three looked like when they were smooth and white.' },
    { n: 'The sound and light show',
      d: 'Dated in style and the only way to be on the plateau after dark. The Sphinx narrates, which is as silly as it sounds.' },
    { n: 'Going at opening',
      d: 'The gate opens at seven or eight depending on the season. The first hour is cool, empty and the only time the hawkers are not working.' },
    { n: 'The hassle',
      d: 'Camel and horse touts are persistent. A firm no and continuing to walk works; engaging does not. Agree any price before mounting anything.' }
  ],
  when: 'October to April. Early morning. Summer on the plateau is above forty degrees with no shade whatsoever.',
  stay: 'Half a day, longer with the Grand Egyptian Museum next door.',
  move: 'Taxi or Uber from Cairo, forty minutes to ninety depending on traffic. The main gate is at the Mena House end.',
  eat: 'Nothing good on the plateau. Giza village and the hotels along Pyramids Road.'
},

'GIZ-sphinx': {
  intro: [
    'The Sphinx is seventy-three metres long and twenty high, carved from a single outcrop of limestone left in the quarry that supplied the Great Pyramid. The conventional dating puts it in the reign of Khafre, around 2500 BC, which would make the face his.',
    'It was buried in sand for most of its history, which is why the body is deeply weathered and the head is not: the head was exposed to wind-driven sand and the body was protected under it. Thutmose IV cleared it around 1400 BC and set up a stela between its paws recording a dream in which the Sphinx promised him the throne if he dug it out.',
    'The nose was gone by the fifteenth century. The story about Napoleon’s artillery is false; drawings from before his arrival show it already missing, and a fourteenth-century Arab historian records a Sufi destroying it because peasants were making offerings to it.'
  ],
  see: [
    { n: 'The Dream Stela',
      d: 'Still standing between the paws, visible from the viewing enclosure, recording Thutmose IV’s excavation of the monument around 1400 BC.' },
    { n: 'The valley temple',
      d: 'Beside it, built of enormous granite and limestone blocks, where the mummification rituals for Khafre are thought to have happened. The masonry is the most impressive on the plateau.' },
    { n: 'The weathering argument',
      d: 'A minority of geologists argue the erosion pattern on the enclosure walls indicates rainfall and therefore a much earlier date. Egyptologists reject it. The debate is worth knowing about before someone sells you a tour based on it.' },
    { n: 'The alignment',
      d: 'It faces due east, towards the sunrise at the equinox, which falls between the two largest pyramids seen from the temple.' },
    { n: 'The viewing terrace',
      d: 'Access to the enclosure is included in the plateau ticket. You cannot approach the paws.' },
    { n: 'Early light',
      d: 'East-facing, so first thing in the morning is when the face is lit rather than in shadow.' }
  ],
  when: 'October to April, first thing.',
  stay: 'An hour, within a plateau visit.',
  move: 'The Sphinx entrance is at the Nazlet el-Samman end of the plateau, separate from the main gate.',
  eat: 'Several restaurants face the Sphinx from across the road and charge for the view.'
},

'GIZ-saqqara': {
  intro: [
    'Djoser’s step pyramid was built around 2670 BC by Imhotep, who is the first architect in history whose name is known, and it is the oldest large stone building in the world. Before it, royal tombs were mud-brick mastabas; Imhotep stacked six of them in diminishing sizes and built the whole thing in stone, imitating bundled reeds and timber in the carving.',
    'The complex around it includes a colonnade of forty fluted columns, dummy buildings with no interiors built as stage sets for the king’s afterlife, and a courtyard for the heb-sed jubilee race. The whole thing was buried and was excavated and partly reconstructed from the 1920s by Jean-Philippe Lauer, who worked on it for seventy-five years.',
    'The reason to come, though, is the mastabas. Private tombs of officials from the Fifth and Sixth Dynasties, with painted relief showing cattle being counted, fish being gutted, a hippopotamus hunt, scribes, bakers and musicians. It is the best record of ordinary ancient Egyptian life that exists.'
  ],
  see: [
    { n: 'The Step Pyramid',
      d: 'Restored over fourteen years and reopened in 2020, with the interior now accessible on a separate ticket down to the burial shaft.' },
    { n: 'Mastaba of Ti',
      d: 'The best of the private tombs: agricultural and marsh scenes in low relief with much of the colour surviving, including a hippo hunt and a boat being built.' },
    { n: 'Mereruka',
      d: 'Thirty-three rooms, the largest private tomb at Saqqara, with a statue of the owner striding out of a false door.' },
    { n: 'The Serapeum',
      d: 'Underground galleries holding twenty-four granite sarcophagi, each around seventy tonnes, for the mummified Apis bulls. Reopened after restoration and genuinely strange.' },
    { n: 'The Pyramid of Unas',
      d: 'Small and collapsed outside, with the earliest Pyramid Texts carved on the burial chamber walls in blue-filled hieroglyphs. The oldest religious writing in the world.' },
    { n: 'The recent finds',
      d: 'Since 2018 Saqqara has produced hundreds of sealed coffins, a lion cub mummy and several intact tombs. Excavation is ongoing and the site changes.' }
  ],
  when: 'October to April, in the morning. There is no shade and the site is large.',
  stay: 'Half a day, or a full one with Dahshur.',
  move: 'A car or taxi from Cairo, about an hour. Usually combined with Memphis and Dahshur in one trip.',
  eat: 'Nothing on site worth eating. Bring water; the distances between tombs are longer than they look.'
},

'GIZ-dahshur': {
  intro: [
    'Sneferu, Khufu’s father, built three pyramids and possibly four, which is more than anyone else, and two of them are here. Between them they contain the record of how the Egyptians worked out how to build a true pyramid, and they did it in one reign by trial and error.',
    'The Bent Pyramid starts at an angle of about fifty-four degrees and changes partway up to around forty-three. The usual explanation is that cracking appeared and the builders reduced the load, though it is argued. It also uniquely retains most of its outer casing, so it is the only pyramid that still looks finished.',
    'The Red Pyramid, built immediately afterwards at the gentler angle throughout, is the first successful true pyramid in history. It is the third largest in Egypt and you can walk into it, down a passage of a hundred and twenty-five metres, to three corbelled chambers. There is usually nobody else in there.'
  ],
  see: [
    { n: 'Inside the Red Pyramid',
      d: 'A long descending passage at about twenty-seven degrees, bent double for most of it, then three chambers with corbelled roofs rising twelve metres. Hot, smells strongly of ammonia, and extraordinary.' },
    { n: 'The Bent Pyramid',
      d: 'Opened to visitors in 2019. The interior has two chambers at different levels joined by a shaft. The casing outside is the thing to look at.' },
    { n: 'The satellite pyramid',
      d: 'Beside the Bent, small, with its own entrance, and almost never visited.' },
    { n: 'The Black Pyramid',
      d: 'Amenemhat III’s mud-brick pyramid, now a dark eroded lump, with its granite pyramidion in the Cairo museum. Viewed from a distance.' },
    { n: 'The emptiness',
      d: 'This is the point. Dahshur has a fraction of Giza’s visitors and you can stand alone at the foot of a pyramid, which is not possible twenty kilometres north.' },
    { n: 'Combining with Saqqara',
      d: 'Ten minutes apart. Do Saqqara first, then Dahshur, then Memphis on the way back.' }
  ],
  when: 'October to April, morning. No shade at all.',
  stay: 'Two hours.',
  move: 'A car or taxi, about an hour from Cairo. No public transport.',
  eat: 'Nothing. Bring water, and more than you think.'
},

'GIZ-memphis': {
  intro: [
    'Memphis was the capital of Egypt for most of the Old Kingdom and an important city for three thousand years afterwards. Herodotus described it, Strabo described it, and by the medieval period it was being quarried for stone to build Cairo. There is essentially nothing left.',
    'What survives is a palm grove with a scatter of statuary: a colossal Ramesses II lying on his back in a purpose-built shed, an alabaster sphinx of about eighty tonnes, and a handful of other pieces gathered into an open-air museum.',
    'The fallen Ramesses is ten metres and would be thirteen if his legs were intact. He was found in 1820 face down in a water-filled pit. Lying horizontally, viewed from a gallery above, you see the face at a distance no standing colossus permits, and the carving is very fine.'
  ],
  see: [
    { n: 'The fallen colossus',
      d: 'From the upper gallery, which puts you level with the face. Note the Egyptians’ convention of showing the king eternally young regardless of actual age.' },
    { n: 'The alabaster sphinx',
      d: 'Eight metres long and around eighty tonnes, carved from a single block, probably Eighteenth Dynasty. The largest alabaster statue known.' },
    { n: 'The open-air collection',
      d: 'Fragments of other colossi, sarcophagi and a small museum building. Twenty minutes is enough.' },
    { n: 'The palm grove',
      d: 'Which is what has replaced one of the great cities of the ancient world, and is the point of coming.' },
    { n: 'Mit Rahina village',
      d: 'The modern settlement on the site, where blocks from the city are visible built into the walls of houses.' },
    { n: 'The context',
      d: 'Memphis, Saqqara, Dahshur and Giza are all one complex: the city and its cemeteries. Doing them in a day makes the geography make sense.' }
  ],
  when: 'October to April. Half an hour is sufficient.',
  stay: 'Forty-five minutes, within a Saqqara and Dahshur day.',
  move: 'A car. Twenty minutes from Saqqara.',
  eat: 'Nothing. There are carpet-school stops on this route that pay commission to drivers; they are optional.'
},

'GIZ-abusir': {
  intro: [
    'The Fifth Dynasty built its pyramids here, between Giza and Saqqara, and they are mostly collapsed. The core masonry was poorly constructed with rubble fill between dressed faces, and once the casing was robbed the interiors slumped. What was a fifty-metre pyramid is now a mound.',
    'That failure is informative. At Abusir you can see the internal construction method in section, which is impossible at Giza where the casing and the core both held. Archaeologists have learned more about Old Kingdom building from these ruins than from the intact ones.',
    'The site also produced the Abusir Papyri, temple administrative records from the pyramid complex of Neferirkare, which are among the oldest papyrus archives found anywhere and which detail duty rosters, inventories and supply accounts for the priesthood.'
  ],
  see: [
    { n: 'Sahure’s pyramid complex',
      d: 'The best preserved of the group, with a causeway, a valley temple and relief fragments. The mortuary temple plan here became the model for the rest of the Old Kingdom.' },
    { n: 'The collapsed cores',
      d: 'Walk round them and look at the construction. The stepped internal structure with rubble packing is clearly visible.' },
    { n: 'Neferefre’s unfinished pyramid',
      d: 'Abandoned when the king died young and finished as a mastaba, which froze the construction sequence partway through.' },
    { n: 'The sun temples at Abu Ghurab',
      d: 'Two kilometres north, Fifth Dynasty temples to Ra with an obelisk on a platform and a large alabaster altar still in place.' },
    { n: 'Access',
      d: 'Abusir is intermittently open and sometimes requires permission. Check before travelling; a driver who knows the inspectorate helps.' },
    { n: 'The quiet',
      d: 'If it is open you will be alone, which for an Old Kingdom royal cemetery is remarkable.' }
  ],
  when: 'October to April. Check opening before going.',
  stay: 'Ninety minutes.',
  move: 'A car from Saqqara, fifteen minutes on a desert track.',
  eat: 'Nothing. Bring water.'
},

'ALX-alexandria': {
  intro: [
    'Alexander founded it in 331 BC, laid out the street grid himself according to tradition, and never saw it finished. Under the Ptolemies it became the intellectual capital of the ancient world: the Library, the Museum, Euclid, Eratosthenes measuring the circumference of the earth, and the Pharos lighthouse, one of the seven wonders.',
    'Almost none of it survives. Earthquakes dropped the lighthouse into the harbour between the eleventh and fourteenth centuries, the Library disappeared in stages that are still argued over, and the Ptolemaic royal quarter is under the sea or under the modern city. Alexandria is a city defined by what is not there.',
    'What is there is a Mediterranean port that faces north and has always been slightly apart from Egypt: Greek, Jewish, Italian and Levantine communities until the 1950s, a cosmopolitan literary reputation from Cavafy and Durrell, and a long curving corniche that is still the best promenade in the country.'
  ],
  see: [
    { n: 'Bibliotheca Alexandrina',
      d: 'The 2002 building, which is a gesture rather than a restoration, and good on its own terms.' },
    { n: 'Fort Qaitbay',
      d: 'Built in 1477 on the exact footprint of the Pharos, using its fallen stone. Blocks from the lighthouse are on the seabed just outside and divers go to them.' },
    { n: 'Catacombs of Kom el Shoqafa',
      d: 'Three levels of second-century tombs where Egyptian, Greek and Roman funerary art are fused in the same carvings.' },
    { n: 'Kom el-Dikka',
      d: 'A Roman theatre, lecture halls and baths in the middle of the city, excavated from 1960, with mosaic floors.' },
    { n: 'Cavafy Museum',
      d: 'The flat where the poet lived for twenty-five years, preserved with his furniture. Small, and if you have read him it matters.' },
    { n: 'The corniche at sunset',
      d: 'Twenty-six kilometres of it, with the fort at one end. Egyptians walk it in the evening and eat on it.' }
  ],
  when: 'April to June and September to November. Alexandria gets real winter rain and storms, which is unusual in Egypt. Summer fills with Cairenes escaping the heat.',
  stay: 'Two nights.',
  move: 'Train from Cairo, two and a half hours on the fast service, which is a good journey. The city is long and thin; taxis and the tram.',
  eat: 'Fish, chosen from ice and grilled. Sayadeya, fish with spiced rice. The Greek and Italian legacy survives in a few old restaurants and in the pastry shops.'
},

'ALX-bibliotheca': {
  intro: [
    'The original Library was founded under Ptolemy I or II and aimed to hold a copy of every book in existence. Ships entering the harbour were searched and any scrolls aboard were copied, with the library keeping the original and returning the copy. It is the founding institution of the idea of a universal collection.',
    'How it ended is genuinely uncertain. Caesar’s fire in 48 BC, the Christian destruction of the Serapeum in 391, and the Arab conquest in 641 have all been blamed, and the scholarly consensus now is that it declined over centuries through funding cuts and neglect rather than any single catastrophe, which is a less satisfying and more plausible story.',
    'The new building opened in 2002, designed by a Norwegian practice, as an eleven-storey disc tilted towards the sea. The granite outer wall is carved with characters from a hundred and twenty writing systems, and the reading room is a single cascading space of two thousand seats, which is the largest in the world.'
  ],
  see: [
    { n: 'The reading room',
      d: 'Eleven terraced levels under a tilted glass roof with aluminium louvres that give north light and no direct sun. The scale is the point.' },
    { n: 'The outer wall',
      d: 'Four thousand granite blocks carved with letters, glyphs and symbols from across human writing, chosen with no hierarchy.' },
    { n: 'The Antiquities Museum',
      d: 'In the basement, with objects found during the excavation for the foundations, including a Ptolemaic mosaic of a dog.' },
    { n: 'The Manuscript Museum',
      d: 'Including a facsimile of the oldest known complete Quran and the surviving work of Egyptian printing.' },
    { n: 'The Internet Archive mirror',
      d: 'For several years this held a complete copy of the Internet Archive, which was a deliberate echo of the original project.' },
    { n: 'The planetarium',
      d: 'A sphere in the plaza outside, which with the disc of the library makes the composition.' }
  ],
  when: 'Year round. Closed Fridays in the morning. Book a tour or you will miss most of the museums.',
  stay: 'Two to three hours.',
  move: 'On the corniche at Shatby, in the eastern half of the city. Taxi or tram.',
  eat: 'A cafe on site. The corniche nearby has fish restaurants.'
},

'ALX-qaitbay': {
  intro: [
    'The Pharos lighthouse stood on this spot from about 280 BC, somewhere between a hundred and a hundred and forty metres high, and was the tallest building in the world after the Great Pyramid. It worked for over a thousand years and was brought down by a sequence of earthquakes, the last in 1303 and 1323.',
    'In 1477 Sultan Qaitbay built a fort on the platform using the fallen stone, which is why there are granite and marble columns laid horizontally in the walls: they are Ptolemaic, reused as bonding courses.',
    'In 1994 a French archaeological team surveying the harbour floor found several thousand blocks and statues from the lighthouse and the Ptolemaic royal quarter, including a colossal statue thought to be a Ptolemy. Some pieces have been raised; most are still down there and there is a long-discussed plan for an underwater museum.'
  ],
  see: [
    { n: 'The fort',
      d: 'Three storeys round a courtyard with a mosque in the middle, which may be the oldest in Alexandria. The roof gives the harbour and the whole corniche.' },
    { n: 'The reused columns',
      d: 'Visible in the lower walls on the seaward side: red granite from Aswan, laid flat, which came out of the lighthouse.' },
    { n: 'Diving the Pharos blocks',
      d: 'Operators run dives on the eastern harbour site. Visibility is poor and the experience is more archaeological than scenic.' },
    { n: 'The Naval Museum',
      d: 'Inside the fort, small, with material on the 1798 Battle of the Nile which was fought just along this coast at Abu Qir.' },
    { n: 'The causeway',
      d: 'The fort sits at the end of the breakwater with sea on three sides, and fishermen along it.' },
    { n: 'Sunset',
      d: 'West-facing across the harbour mouth, with the corniche lights coming on behind.' }
  ],
  when: 'Year round. Winter storms break over the breakwater, which is worth seeing.',
  stay: 'Ninety minutes.',
  move: 'Taxi to the western end of the corniche, or a long walk along it.',
  eat: 'Fish restaurants on the harbour immediately behind, including several where you pick the fish from ice.'
},

'ALX-catacombs': {
  intro: [
    'In 1900 a donkey fell through the ground on the Kom el-Shoqafa hill and what it fell into was a tomb complex cut thirty-five metres down through three levels, reached by a spiral staircase with a central shaft that was used to lower the bodies.',
    'It dates from the second century AD and what makes it remarkable is the fusion. The architecture is Egyptian, the figures wear Egyptian dress and carry Egyptian attributes, and the carving style is Roman. Anubis appears twice: once as a jackal-headed god and once in a Roman legionary’s armour with a sword.',
    'There is also a triclinium, a dining room with stone couches, where the families of the dead held memorial meals. The name of the site means mound of shards, from the broken crockery left behind by those meals and discarded on the way out.'
  ],
  see: [
    { n: 'The main tomb',
      d: 'Down the third level, with the carved figures of a man and woman in Egyptian pose and Roman hairstyles, and the Medusa head above the entrance.' },
    { n: 'The Anubis in armour',
      d: 'In a side chamber, wearing a Roman cuirass and holding a spear, which is the single oddest object in Alexandria.' },
    { n: 'The triclinium',
      d: 'Stone couches round a table in a chamber off the entrance, where the funeral feasts were held.' },
    { n: 'The Hall of Caracalla',
      d: 'A separate complex connected later, where human and horse bones were found, associated with the massacre Caracalla carried out in the city in 215.' },
    { n: 'The spiral stair',
      d: 'Ninety-nine steps round a central shaft, which is how both the living and the dead came down.' },
    { n: 'The lowest level',
      d: 'Usually flooded, which it has been since the water table rose, and visible from above.' }
  ],
  when: 'Year round. It is underground and cool, which makes it a good summer option.',
  stay: 'An hour.',
  move: 'Taxi. In Karmouz, inland from the corniche. Pompey’s Pillar is five minutes away and is usually combined.',
  eat: 'Nothing nearby. Return to the corniche.'
},

'ALX-montazah': {
  intro: [
    'Khedive Abbas II built a palace here in 1892 and his successor Fuad added the Haramlik in 1932, in a mixture of Florentine and Ottoman styles with a tower copied from the Palazzo Vecchio. The royal family used it as a summer residence until 1952.',
    'The grounds are about a hundred and fifty hectares of gardens on a headland with a curved bay, pines and date palms, and a small bridge out to a pavilion on an island. It was opened to the public as a park and is where Alexandria goes on a Friday.',
    'The corniche that runs twenty-six kilometres west from here to Qaitbay is the city’s main public space. It was widened in the 1990s, which was controversial because it took the beach, and it is still the place where the whole city walks in the evening.'
  ],
  see: [
    { n: 'The gardens',
      d: 'Paid entry, with the palace viewed from outside since it is a presidential property. The headland walk and the bay are the point.' },
    { n: 'The bridge and the pavilion',
      d: 'A small bridge to a rock island with a tea pavilion, which is on every Alexandrian wedding photograph.' },
    { n: 'The corniche walk',
      d: 'West towards the centre. The full length is too far; the stretch around Stanley Bridge and Glym is the best.' },
    { n: 'Stanley Bridge',
      d: 'A 2001 bridge over a cove with four towers, which is not old and has become the city’s signature view anyway.' },
    { n: 'Abu Qir',
      d: 'Ten minutes east, where Nelson destroyed the French fleet in 1798, now a fishing town with very good and very cheap seafood.' },
    { n: 'Friday evening',
      d: 'When families come out along the whole corniche. The social life of the city is conducted on it.' }
  ],
  when: 'April to November. Winter storms close the corniche to pedestrians occasionally.',
  stay: 'Half a day.',
  move: 'Taxi or the tram, which runs the length of the eastern city slowly.',
  eat: 'Abu Qir for fish. Along the corniche, the older places at Glym and San Stefano.'
},

'LXR-karnak': {
  intro: [
    'Karnak is not one temple but a precinct of about a hundred hectares, built, altered and added to by something like thirty pharaohs over two thousand years, which makes it the largest religious complex ever constructed. The main enclosure is dedicated to Amun-Ra; there are separate precincts for Mut and Montu beside it.',
    'Each king added rather than replaced, so the building reads backwards in time as you walk inwards: the first pylon is Thirtieth Dynasty and unfinished, and the small chapels at the far end are Middle Kingdom. A complete architectural record of a civilisation in one building.',
    'The Great Hypostyle Hall is the room people come for. A hundred and thirty-four sandstone columns in sixteen rows covering five thousand square metres, the central twelve standing twenty-one metres with capitals wide enough for fifty people to stand on. It was roofed, and the clerestory windows meant the interior was dim with shafts of light, which is how it should be imagined.'
  ],
  see: [
    { n: 'The Great Hypostyle Hall',
      d: 'Built under Seti I and Ramesses II. Go early, stand in the middle of the central aisle and look up. Colour survives high on the architraves where the sun has not reached it.' },
    { n: 'Hatshepsut’s obelisk',
      d: 'Twenty-nine and a half metres and about three hundred and twenty-three tonnes of Aswan granite, the tallest standing in Egypt. Her successor walled the lower part up rather than destroy it, which preserved the inscriptions.' },
    { n: 'The sacred lake',
      d: 'A hundred and twenty metres by seventy-seven, used for priestly purification, with a fallen obelisk tip and a giant scarab beside it that people walk round seven times for luck.' },
    { n: 'The Avenue of Sphinxes',
      d: 'Two point seven kilometres of ram-headed sphinxes linking Karnak to Luxor Temple, fully excavated and reopened in a large ceremony in 2021. You can walk the whole length.' },
    { n: 'The Open Air Museum',
      d: 'A separate small ticket, holding the reconstructed White Chapel of Senusret I, which is Middle Kingdom and has the finest raised relief at the site.' },
    { n: 'The sound and light show',
      d: 'Walks you through the complex after dark, which is the only way to be in the hypostyle hall at night.' }
  ],
  when: 'October to April. Open from six; the first ninety minutes are cool and comparatively empty. Summer midday here is dangerous.',
  stay: 'Three hours minimum.',
  move: 'Taxi or caleche from Luxor, three kilometres, or walk the Avenue of Sphinxes from Luxor Temple.',
  eat: 'Nothing on site. Luxor town is ten minutes.'
},

'LXR-luxor-temple': {
  intro: [
    'Luxor Temple was built mainly by Amenhotep III and Ramesses II and it was the destination of the Opet festival, when the statues of the Theban triad were carried in procession from Karnak along the sphinx avenue once a year. It sits in the middle of the modern town rather than outside it.',
    'The layering here is extraordinary even by Egyptian standards. A Roman legionary camp was built over it and a chapel inside it has Roman frescoes painted over the pharaonic reliefs. Then a mosque was built on top of the fill that had buried the court, so the Abu al-Haggag mosque now has its door eight metres above the temple floor, with the old entrance hanging in mid-air.',
    'That mosque is still in use and the saint’s festival involves boats being pulled through the streets, which is almost certainly a continuation of the Opet procession across three religions and three thousand years.'
  ],
  see: [
    { n: 'The temple at night',
      d: 'Lit from below, open until nine or ten, and far better than by day. The colonnade of Amenhotep III in floodlight is the best thing in Luxor after dark.' },
    { n: 'The Abu al-Haggag mosque',
      d: 'Hanging above the court on the fill that buried the temple, with its original door now a doorway to nothing.' },
    { n: 'The Roman chapel',
      d: 'In the sanctuary area, with fourth-century frescoes of the imperial cult painted over Amenhotep’s reliefs, conserved in 2008.' },
    { n: 'The obelisk and its twin',
      d: 'One stands at the entrance; the other was given to France in 1830 and is in the Place de la Concorde. France formally renounced its claim to the remaining one in 1981.' },
    { n: 'The Avenue of Sphinxes',
      d: 'Running north from the entrance all the way to Karnak. Walk at least part of it.' },
    { n: 'The Ramesses colossi',
      d: 'At the first pylon, with the pylon walls carved with the Battle of Kadesh, which Ramesses presented as a victory and which was at best a draw.' }
  ],
  when: 'October to April. Go after dark. Open late and the temperature and the crowds are both better.',
  stay: 'Ninety minutes.',
  move: 'In the centre of Luxor on the corniche. Walkable from most hotels.',
  eat: 'The corniche restaurants are tourist-priced. The streets behind the souk are better and cheaper.'
},

'LXR-valley-of-kings': {
  intro: [
    'From about 1550 BC the pharaohs stopped building pyramids, which advertised their location to robbers, and started cutting tombs into a remote wadi on the west bank instead. Sixty-five tombs and chambers have been found, most of them robbed in antiquity, often by the workmen who built them.',
    'The valley sits under al-Qurn, a natural peak shaped like a pyramid, which was probably part of why it was chosen. The tombs are long descending corridors cut into limestone and decorated with funerary texts: the Book of the Dead, the Book of Gates, the Amduat, which describe the sun’s passage through the twelve hours of night.',
    'Tutankhamun was found here in 1922, the only substantially intact royal burial ever discovered, and the contents filled a room in Cairo. His is one of the smallest and plainest tombs in the valley, which gives a sense of what was lost from the others.'
  ],
  see: [
    { n: 'Seti I', t: 'separate expensive ticket',
      d: 'A hundred and thirty-seven metres, the longest and most completely decorated tomb in the valley, with an astronomical ceiling. Reopened in 2017 after decades closed. Worth the money.' },
    { n: 'Ramesses VI',
      d: 'Included on some tickets, with a double astronomical ceiling showing the sky goddess Nut swallowing and giving birth to the sun. The best value in the valley.' },
    { n: 'Tutankhamun', t: 'separate ticket',
      d: 'Small, with the mummy in a case and the painted burial chamber. Historically enormous and visually modest; go knowing that.' },
    { n: 'The standard ticket',
      d: 'Covers any three tombs from a rotating open list. Ask at the gate which are open; the rotation protects them from humidity damage.' },
    { n: 'The workmen',
      d: 'Deir el-Medina, the village where the tomb cutters lived, is a short drive away and makes the valley make sense.' },
    { n: 'Going at opening',
      d: 'The gate opens at six in summer and seven in winter. Tombs are unventilated and get extremely hot and humid by mid-morning.' }
  ],
  when: 'October to April, at opening. There is no shade in the valley and the rock radiates heat.',
  stay: 'Three hours.',
  move: 'Taxi from the west bank ferry, or a day-hired car. The shuttle from the car park to the tombs costs extra.',
  eat: 'Nothing worth eating at the site. The west bank villages have good simple places.'
},

'LXR-hatshepsut': {
  intro: [
    'Hatshepsut ruled for about twenty years from around 1479 BC, first as regent for her stepson and then as pharaoh in her own right, wearing the false beard and the regalia. She was one of the most successful rulers of the New Kingdom and after her death her successor had her images and name systematically erased from monuments.',
    'Her mortuary temple at Deir el-Bahari is built in three colonnaded terraces against a cliff three hundred metres high, approached by a long ramp. It was designed by her steward Senenmut and it is the most architecturally modern-looking building in ancient Egypt: horizontal, rhythmic and almost without ornament on the exterior.',
    'The reliefs inside record the expedition she sent to Punt, probably in the Horn of Africa, with ships, Puntite houses on stilts, and a procession of incense trees being carried back in baskets. It is the earliest detailed record of a long-distance trading voyage anywhere.'
  ],
  see: [
    { n: 'The Punt reliefs',
      d: 'On the middle terrace, south colonnade. The ships, the trees and the famously depicted queen of Punt, whose body shape has generated a century of speculative diagnosis.' },
    { n: 'The birth colonnade',
      d: 'On the same terrace, north side, in which Hatshepsut claims divine conception by Amun, which was the justification for her rule.' },
    { n: 'The Hathor chapel',
      d: 'With columns carrying the cow-eared face of Hathor, several of which retain colour.' },
    { n: 'The erasures',
      d: 'Visible throughout: her figure chiselled out and her cartouche replaced. The thoroughness and the places it was missed are both informative.' },
    { n: 'The cliff',
      d: 'A natural amphitheatre of limestone three hundred metres high directly behind, and the Valley of the Kings is on the other side of it.' },
    { n: 'The 1997 attack',
      d: 'Sixty-two people, mostly tourists, were killed here by gunmen. There is no memorial and security on the west bank dates from it.' }
  ],
  when: 'October to April, first thing. The terraces face east and there is no shade by ten.',
  stay: 'Ninety minutes.',
  move: 'Taxi from the west bank. Usually combined with the Valley of the Kings in one morning.',
  eat: 'Nothing on site.'
},

'LXR-medinet-habu': {
  intro: [
    'Ramesses III built this between about 1186 and 1155 BC and it is the best preserved mortuary temple on the west bank. It is also substantially emptier of visitors than Hatshepsut or the Ramesseum, which makes it the best temple in Luxor to actually spend time in.',
    'The carving is cut unusually deep, which is why so much of it survives and why the colour on the ceilings and in the protected corners is still strong. Standing in the second court with the painted ceiling above you is as close as you will get to seeing an Egyptian temple as it was meant to look.',
    'The outer walls carry the reliefs of the war against the Sea Peoples: a naval battle, prisoners being counted by their severed hands and phalluses, and the king in a chariot. It is the main historical source for the collapse of the Late Bronze Age Mediterranean world, carved by one of the few states that survived it.'
  ],
  see: [
    { n: 'The Sea Peoples reliefs',
      d: 'On the northern exterior wall. The naval battle is the earliest known depiction of a sea fight and the counting of body parts is unflinching.' },
    { n: 'The second court',
      d: 'With Osiride pillars and ceilings that retain blue, red and yellow. Look up.' },
    { n: 'The migdol gate',
      d: 'A fortified entrance modelled on a Syrian tower-fort, with reliefs of the king and royal women in the upper rooms.' },
    { n: 'The painted colour',
      d: 'Throughout the inner rooms and under the architraves. Nowhere else in Luxor has this much.' },
    { n: 'The Coptic town',
      d: 'A Christian settlement called Djeme occupied the temple from the fourth century and its traces are visible in the courts.' },
    { n: 'The quiet',
      d: 'Fifteen minutes from the Valley of the Kings and a fraction of the people. This is the one visitors regret not allowing time for.' }
  ],
  when: 'October to April. Late afternoon is good here because the western light hits the facade.',
  stay: 'Two hours.',
  move: 'Taxi on the west bank. Close to the Colossi of Memnon and Deir el-Medina.',
  eat: 'Several good local places in the west bank villages nearby.'
},

'LXR-valley-of-queens': {
  intro: [
    'The Valley of the Queens holds around ninety tombs for queens, princes and princesses of the Nineteenth and Twentieth Dynasties. Most are small and plain; the exception is the tomb of Nefertari, principal wife of Ramesses II, which is generally held to contain the finest painting in Egypt.',
    'It was found in 1904 by Ernesto Schiaparelli, already robbed, but with the decoration almost intact: Nefertari playing senet, being led by Isis, and a ceiling of gold stars on deep blue across five hundred and twenty square metres of painted plaster.',
    'Salt crystallisation from the limestone nearly destroyed it and the tomb was closed for most of the twentieth century. A Getty Conservation Institute project between 1986 and 1992 stabilised it, and it now opens on a very expensive ticket with a ten-minute limit and a daily cap of about a hundred and fifty people.'
  ],
  see: [
    { n: 'Nefertari', t: 'separate ticket, ten minutes, capped',
      d: 'The most expensive single ticket in Egypt and the thing people most often say was worth it. Ten minutes is short; do not spend it taking photographs.' },
    { n: 'Amunherkhepshef',
      d: 'A son of Ramesses III who died young, with reliefs of his father introducing him to the gods, in excellent condition and included in the standard ticket.' },
    { n: 'Khaemwaset',
      d: 'Another son of Ramesses III, similar in subject and also on the standard ticket.' },
    { n: 'The standard ticket',
      d: 'Covers three or four open tombs. Worth doing even without Nefertari, and the valley is quiet.' },
    { n: 'The Grotto of the Cascade',
      d: 'A natural cleft at the head of the valley associated with Hathor, which may be why the site was chosen.' },
    { n: 'Deir el-Medina',
      d: 'Ten minutes away, where the artists who painted Nefertari’s tomb lived and were themselves buried.' }
  ],
  when: 'October to April, in the morning. Nefertari tickets are bought at the valley or in advance depending on the current system.',
  stay: 'Ninety minutes.',
  move: 'Taxi on the west bank, close to Medinet Habu.',
  eat: 'Nothing on site.'
},

'LXR-deir-el-medina': {
  intro: [
    'This walled village housed the workmen who cut and decorated the royal tombs, their families, and nobody else. It was occupied for about four hundred and fifty years from the reign of Thutmose I, and the state supplied it with grain, water, fish and laundry because there is nothing growing within several kilometres.',
    'Because the inhabitants were literate and the climate is dry, they left something that exists nowhere else in the ancient world: tens of thousands of ostraca, notes on limestone flakes and pottery sherds, covering absence records, loans, legal disputes, love poems, shopping lists, and complaints about the foreman.',
    'In the twenty-ninth year of Ramesses III the rations were late and the workmen downed tools and sat outside the mortuary temple refusing to work. It is the first recorded strike in history and the account of it is in a papyrus now in Turin.'
  ],
  see: [
    { n: 'The village',
      d: 'About seventy houses in a walled rectangle with a single street, the walls standing to around a metre. You can walk the street and see the room plans.' },
    { n: 'The tomb of Sennedjem',
      d: 'A workman’s own tomb, painted on a vaulted ceiling with scenes of the fields of Iaru, in colours as fresh as anything in the royal valley and at a fraction of the scale.' },
    { n: 'The tomb of Inherkhau',
      d: 'With a famous scene of a cat killing the serpent Apophis under a sycamore, and a painted ceiling of extraordinary quality.' },
    { n: 'The Ptolemaic temple',
      d: 'Built over the village site after it was abandoned, dedicated to Hathor and Maat, small and well preserved.' },
    { n: 'The great pit',
      d: 'A shaft the villagers dug over fifty metres looking for water and never found any, which was then used as a rubbish dump. Most of the ostraca came out of it.' },
    { n: 'The ostraca',
      d: 'Not on site; they are distributed across museums in Turin, Cairo, Berlin and elsewhere. The site makes more sense if you read about them first.' }
  ],
  when: 'October to April, morning or late afternoon. The site is exposed.',
  stay: 'Ninety minutes.',
  move: 'Taxi on the west bank, between Medinet Habu and the Valley of the Queens.',
  eat: 'Nothing on site.'
},

'LXR-nobles-tombs': {
  intro: [
    'The Tombs of the Nobles are several hundred tombs cut into the hillsides of the Theban necropolis for officials rather than royalty: viziers, mayors, scribes, overseers of granaries and the priesthood. They are smaller, shallower and far less visited than the royal tombs.',
    'They are also more interesting to look at. Royal tombs are decorated with funerary texts about the sun’s journey through the underworld; private tombs are decorated with the owner’s life: agriculture, hunting in the marshes, banquets with musicians and dancers, craftsmen at work, and the funeral itself.',
    'The painting is on plaster rather than carved into stone, so the colour is brighter and the line is freer. Several of these tombs contain the single most reproduced images of ancient Egypt, including the banquet scenes from Nakht and the goose painting from Nebamun, which is in the British Museum.'
  ],
  see: [
    { n: 'Sennefer',
      d: 'Mayor of Thebes under Amenhotep II, with a ceiling painted as a grape arbour across the whole chamber, which is why it is called the Tomb of the Vines.' },
    { n: 'Nakht',
      d: 'A small tomb with a famous banquet scene, three female musicians, and agricultural work in exceptional condition.' },
    { n: 'Ramose',
      d: 'A vizier who served both Amenhotep III and Akhenaten, so his tomb changes artistic style partway through as the Amarna revolution arrives. Unfinished and the most historically interesting.' },
    { n: 'Rekhmire',
      d: 'A vizier, with detailed scenes of foreign tribute including Minoans carrying vessels, and craftsmen making everything from bricks to jewellery.' },
    { n: 'The tickets',
      d: 'Sold in groups of two or three tombs by area. The Sheikh Abd el-Qurna group is the one to buy.' },
    { n: 'The modern village',
      d: 'Qurna, built over the tombs, was largely cleared between 2006 and 2009 and its residents relocated, which remains contentious.' }
  ],
  when: 'October to April. Morning.',
  stay: 'Two hours.',
  move: 'Taxi on the west bank. A guide helps because the tombs are scattered across the hillside and the numbering is confusing.',
  eat: 'West bank village restaurants.'
},

'LXR-ramesseum': {
  intro: [
    'The Ramesseum was Ramesses II’s mortuary temple, built over about twenty years from around 1279 BC, and it is half ruined. The hypostyle hall has lost most of its roof, the pylons have collapsed, and the colossal seated statue of the king that stood in the second court lies shattered across it.',
    'That statue was about eighteen metres and perhaps a thousand tonnes. Diodorus Siculus described it in the first century BC and recorded an inscription reading, in his version, king of kings am I; if anyone would know how great I am, let him surpass one of my works.',
    'Shelley read Diodorus, never came to Egypt, and wrote Ozymandias in 1818 in a competition with a friend. The poem describes a shattered visage in the sand and two vast and trunkless legs of stone. The legs are not trunkless and the head is a different piece, but the fallen colossus is here and so is the irony.'
  ],
  see: [
    { n: 'The fallen colossus',
      d: 'In the second court, broken into enormous pieces, with the face partly intact. Stand beside the ear.' },
    { n: 'The hypostyle hall',
      d: 'Forty-eight columns of which twenty-nine stand, with the central aisle still carrying architraves and painted decoration in the recesses.' },
    { n: 'The mud-brick storerooms',
      d: 'Behind the temple, vaulted granaries built in mud brick around 1270 BC, still standing, which is the oldest surviving example of the vault built without centring.' },
    { n: 'The Kadesh reliefs',
      d: 'On the pylon, recording the battle against the Hittites in 1274 BC, which Ramesses commissioned in several temples and which was a draw at best.' },
    { n: 'The astronomical ceiling',
      d: 'In a side chamber, one of the earliest known depictions of a twelve-month calendar.' },
    { n: 'The quiet',
      d: 'Far fewer people than the big three west bank sites, with a palm grove around it.' }
  ],
  when: 'October to April, late afternoon when the light is low across the broken stone.',
  stay: 'An hour.',
  move: 'Taxi on the west bank, close to the Colossi of Memnon.',
  eat: 'Nothing on site. The west bank villages are nearby.'
},

'LXR-colossi': {
  intro: [
    'Two seated figures of Amenhotep III, eighteen metres high and seven hundred tonnes each, carved from quartzite quarried near Cairo and transported six hundred kilometres. They stood at the entrance to his mortuary temple, which was the largest ever built in Egypt, covering about thirty-five hectares.',
    'The temple is gone. It was built too close to the floodplain, was damaged by inundation and earthquake, and was quarried by later pharaohs for building material. Excavation since 1998 has recovered a great deal and several more colossi have been re-erected behind the famous two.',
    'After an earthquake in 27 BC the northern statue began producing a sound at dawn, described by Greek and Roman visitors as a lyre string breaking or a whistle. They identified it with Memnon, son of the dawn, and came in numbers to hear it; over a hundred inscriptions by visitors are carved on the legs. A Roman repair around AD 199 stopped it permanently.'
  ],
  see: [
    { n: 'The two colossi',
      d: 'Free, beside the road, with no enclosure. Five minutes is enough and almost everyone stops.' },
    { n: 'The Roman graffiti',
      d: 'On the legs of the northern statue, in Greek and Latin, including from the emperor Hadrian’s visit in AD 130 and poems by his companion Julia Balbilla.' },
    { n: 'The excavation behind',
      d: 'The Colossi of Memnon and Amenhotep III Temple Conservation Project has re-erected further statues and the site is increasingly visitable.' },
    { n: 'The singing',
      d: 'Worth knowing the explanation: the fractured stone probably expanded as the morning sun heated dew in the cracks.' },
    { n: 'The scale of the lost temple',
      d: 'Markers show the extent, which ran back to where the modern road is. Larger than Karnak.' },
    { n: 'Sunrise',
      d: 'They face east and the statues are on every balloon flight route, so dawn here is busy and worth it.' }
  ],
  when: 'October to April. Early morning, which is both the light and the tradition.',
  stay: 'Twenty minutes.',
  move: 'On the main west bank road; every tour stops.',
  eat: 'Nothing. The west bank villages are five minutes away.'
},

'LXR-luxor-museum': {
  intro: [
    'The Luxor Museum opened in 1975 and it is the opposite of the old Cairo museum: a small, ruthlessly edited collection in a purpose-designed building with excellent lighting and generous space around each object. It holds perhaps a few hundred pieces where Cairo holds a hundred and seventy thousand.',
    'The centrepiece is a cache of twenty-six statues found in 1989 buried in a pit under the courtyard of Luxor Temple, where priests had hidden them, probably in the Roman period. They came out in near-perfect condition because they had been carefully packed in sand.',
    'The Amenhotep III in that group, carved in quartzite, is among the finest royal sculptures from ancient Egypt. Seeing it alone, lit from above against a black wall, is a completely different experience from seeing comparable things crowded three deep in a case.'
  ],
  see: [
    { n: 'The Luxor cachette statues',
      d: 'Particularly the Amenhotep III in quartzite and the Horemheb kneeling before Atum. Displayed with space, which is the whole point of this museum.' },
    { n: 'The Akhenaten talatat wall',
      d: 'A reconstructed wall of two hundred and eighty-three small blocks from a demolished Karnak temple of Akhenaten, showing daily life under the Aten.' },
    { n: 'The two royal mummies',
      d: 'Ahmose I and probably Ramesses I, the latter repatriated from a museum in Niagara Falls in 2003 after a century in North America.' },
    { n: 'The military technology room',
      d: 'Chariots, weapons and armour from the New Kingdom, with an explanation of the composite bow.' },
    { n: 'Evening opening',
      d: 'Open until nine or ten, which makes it the best thing to do in Luxor after the temples close and the heat drops.' },
    { n: 'The building',
      d: 'By Mahmoud al-Hakim, 1975, with a ramp spiralling through the galleries and almost no natural light.' }
  ],
  when: 'Year round, and it is air-conditioned. Evening.',
  stay: 'Two hours.',
  move: 'On the corniche between Luxor Temple and Karnak. Walkable.',
  eat: 'The corniche. Luxor town behind it is better.'
},

'LXR-west-bank-balloon': {
  intro: [
    'Balloons lift from the west bank before dawn, usually around five in winter, and go up to about three hundred metres over the Theban necropolis. From there the geography of the place resolves in a way it never does from the ground: the green strip, the sharp line where irrigation stops, the mortuary temples in a row against the cliff, and the Valley of the Kings behind it.',
    'On a good morning around forty balloons go up at once, which means you are as likely to be photographing other balloons against the sunrise as the temples. That is part of the spectacle and it is how the famous images were taken.',
    'Safety has been a serious issue. A crash in 2013 killed nineteen people and flights were suspended; the regulations were rewritten and the industry is now more tightly controlled. Choose an operator with a current certificate, ask about the pilot’s hours, and accept that weather cancellations happen frequently and are a good sign rather than a bad one.'
  ],
  see: [
    { n: 'The flight',
      d: 'About forty-five minutes to an hour in the air, with a very early pickup. Landings are in fields and the chase crews are efficient.' },
    { n: 'The line of the desert',
      d: 'The thing you cannot see from the ground: cultivation stopping dead at the edge of the irrigation, with the necropolis beginning in the sand.' },
    { n: 'The mortuary temples from above',
      d: 'Hatshepsut against the cliff, the Ramesseum, Medinet Habu and the foundations of Amenhotep III’s vanished temple all in one view.' },
    { n: 'The other balloons',
      d: 'Forty of them lit from below by the burners before sunrise, which is the photograph everyone takes.' },
    { n: 'Weather cancellations',
      d: 'Common, particularly with wind or haze. Build a spare morning into the trip if this matters to you.' },
    { n: 'The alternative',
      d: 'If you would rather not fly, the view from the hill above Deir el-Medina at dawn gives you most of the geography for nothing.' }
  ],
  when: 'October to April. Flights are weather dependent and are cancelled regularly.',
  stay: 'Three hours including transfers.',
  move: 'Hotel pickup around four in the morning, a ferry crossing and a minibus to the launch field.',
  eat: 'Most operators include a basic breakfast afterwards.'
},

'LXR-esna': {
  intro: [
    'The temple of Khnum at Esna sits nine metres below the modern street level, in a pit in the middle of the town, because the silt of the annual flood built the ground up around it over two thousand years. Only the hypostyle hall survives; the rest is under the houses.',
    'It is Ptolemaic and Roman, built and decorated between about 180 BC and the second century AD, which makes it one of the last temples constructed in the pharaonic tradition. The inscriptions include hymns written entirely in hieroglyphs of rams and crocodiles, which are a deliberate priestly puzzle.',
    'Between 2018 and 2023 an Egyptian and German team cleaned centuries of soot, bird droppings and salt off the ceiling and columns. What emerged was the original paint: blue skies with yellow stars, zodiac figures, and painted vultures in full colour that nobody alive had seen. It is the best news in Egyptology this century.'
  ],
  see: [
    { n: 'The cleaned ceiling',
      d: 'Astronomical scenes, a zodiac, and the twelve hours of night, in strong colour. Allow time to just look up.' },
    { n: 'The columns',
      d: 'Twenty-four, each with a different composite plant capital, now cleaned and painted. No two are alike.' },
    { n: 'The cryptographic hymns',
      d: 'Two texts on the columns written in ram glyphs and crocodile glyphs respectively, which are a priestly code and were essentially a professional joke.' },
    { n: 'The depth',
      d: 'Standing in the pit with the modern town at roof level, which makes the silt accumulation of two millennia a physical fact.' },
    { n: 'The Roman emperors',
      d: 'The cartouches name Claudius, Vespasian, Trajan and others as pharaoh, in hieroglyphs, which is the clearest evidence of how long the tradition lasted.' },
    { n: 'The caravanserai',
      d: 'An Ottoman wikala near the temple, restored, with a small market around it.' }
  ],
  when: 'October to April. Esna is between Luxor and Edfu and most Nile cruises stop here or pass through the lock.',
  stay: 'An hour.',
  move: 'An hour south of Luxor by road, or a cruise stop. The lock at Esna is a bottleneck and boats queue.',
  eat: 'Simple places in the town. Nothing aimed at visitors.'
},

'LXR-felucca-nile': {
  intro: [
    'The felucca is a wooden boat with a lateen sail and a shallow draught, and it is essentially unchanged from the boats in the tomb paintings. There is no engine, no cabin and no facilities: you sit on cushions on the deck, the crew cooks on a small stove, and you sleep on the boat under blankets.',
    'A dahabiya is the comfortable version: a larger sailing boat with cabins, usually eight to twelve of them, towed through the still sections and sailed where there is wind. They were how nineteenth-century travellers went up the Nile and several have been rebuilt.',
    'Either way the point is the same: the river at walking pace, with the bank close enough to see people working. The cruise ships are floating hotels that run to a schedule and dock at the same places; a sailing boat stops where the wind leaves it and moors at a sandbank.'
  ],
  see: [
    { n: 'Sailing downstream',
      d: 'Aswan to Luxor with the current is the usual direction and takes three to four nights by felucca. Upstream needs wind and takes longer.' },
    { n: 'The bank at eye level',
      d: 'Water buffalo, shadufs still in use, children swimming, and the exact line where the green stops.' },
    { n: 'Sleeping on deck',
      d: 'Under the stars on a sandbank, which is cold in winter and extraordinary. Bring a sleeping bag; the boat blankets are thin.' },
    { n: 'The dahabiya alternative',
      d: 'Cabins, a cook and a bathroom, moored at villages the big boats cannot reach. Considerably more money and a real middle option.' },
    { n: 'What to check',
      d: 'Toilet arrangements, whether there is a support boat, how many people on board, and whether the crew has licences. Standards vary enormously.' },
    { n: 'The cruise ships',
      d: 'Three or four nights Luxor to Aswan with Edfu and Kom Ombo included. Efficient, comfortable, and entirely insulated from the river.' }
  ],
  when: 'October to April. The wind on the Nile blows from the north, which is why Egyptian boats could sail up and float down.',
  stay: 'Three to four nights.',
  move: 'Arranged in Aswan or Luxor. Prices are negotiated and vary with season and group size.',
  eat: 'Cooked on board: tagines, vegetables, bread, and a great deal of tea.'
},

'ASW-aswan': {
  intro: [
    'At Aswan the Nile breaks over the first cataract, granite islands split the stream, and the Sahara comes down to the water on both sides. This was the southern frontier of Egypt for most of its history and the boundary with Nubia, and the border between the two is still visible in the faces, the language and the architecture.',
    'Granite from the quarries here was used across Egypt for obelisks, sarcophagi and colossi, which is why the city existed. It also sat on the trade route from Africa: gold, ivory, ebony and incense came north through here.',
    'It is the most relaxed place in Egypt and it is where everybody ends up staying longer than planned. The river is wide and clear, the feluccas work the stretch between the islands, and the thing to do is sit on a terrace and watch it, which Agatha Christie did at the Old Cataract Hotel while writing Death on the Nile.'
  ],
  see: [
    { n: 'A felucca at sunset',
      d: 'Round Elephantine and Kitchener’s Island, about two hours. Negotiate the price before boarding and agree how long.' },
    { n: 'The Old Cataract terrace',
      d: 'Tea or a drink on the terrace above the river where Christie wrote. Non-residents pay a minimum charge and it is worth it.' },
    { n: 'The Nubian Museum',
      d: 'Opened in 1997 to house material rescued before the dam flooded Nubia, and one of the best museums in Egypt.' },
    { n: 'The souk',
      d: 'Sharia al-Souq, running parallel to the corniche. Hibiscus, spices, Sudanese goods, and considerably less pressure than Khan el-Khalili.' },
    { n: 'Philae and the High Dam',
      d: 'Both a short drive south and usually done together in a morning.' },
    { n: 'The Nubian villages',
      d: 'On the west bank, painted in strong colours, reached by boat.' }
  ],
  when: 'October to April. Aswan is the hottest city in Egypt and summer is above forty routinely.',
  stay: 'Three nights.',
  move: 'Overnight sleeper train from Cairo, domestic flights, or arrive by boat. The corniche is walkable and everything else is by felucca or taxi.',
  eat: 'Nubian food: fish from the river, tagines, and a lot of hibiscus tea. The Nubian villages serve it in houses.'
},

'ASW-abu-simbel': {
  intro: [
    'Ramesses II cut two temples into a sandstone cliff here around 1264 BC, on the southern border of Egyptian-controlled Nubia, with four seated colossi of himself twenty metres high at the entrance of the larger one. The point was propaganda directed at anyone coming north.',
    'The interior runs sixty metres into the rock, and it was aligned so that twice a year the rising sun travels the full length of the hall and lights three of the four seated gods in the sanctuary. Ptah, who is associated with the underworld, stays in darkness. The dates are now 22 February and 22 October.',
    'In the 1960s the Aswan High Dam was going to drown it. Between 1964 and 1968 a UNESCO-led operation cut both temples into a thousand and thirty-six blocks weighing up to thirty tonnes, moved them sixty-five metres higher and two hundred metres back, and reassembled them inside an artificial mountain. It cost around forty million dollars and it is the reason the World Heritage Convention exists.'
  ],
  see: [
    { n: 'The facade',
      d: 'Four colossi, one of which fell in an earthquake in antiquity and was reassembled in its broken state during the move, deliberately.' },
    { n: 'The Great Temple interior',
      d: 'A hall with eight Osiride pillars, and on the north wall the Battle of Kadesh in enormous detail.' },
    { n: 'The Small Temple',
      d: 'For Nefertari and Hathor, with the queen shown the same size as the king on the facade, which happened almost nowhere else in Egyptian art.' },
    { n: 'The solar alignment', t: '22 February and 22 October',
      d: 'The sun reaches the sanctuary at dawn. Several thousand people attend and the town is booked out.' },
    { n: 'The dome behind',
      d: 'You can go into the artificial mountain and see the concrete shell supporting the relocated rock, which is as impressive as the temple.' },
    { n: 'Staying the night',
      d: 'Most people come on a convoy day trip from Aswan and see it between eight and ten with everybody else. Staying lets you be there at opening or at the evening show.' }
  ],
  when: 'October to April. The solar dates in February and October. Summer days reach the mid-forties.',
  stay: 'A full day from Aswan, or a night.',
  move: 'Three hours by road from Aswan, usually in a convoy leaving before dawn. There is also a short flight and a Lake Nasser cruise.',
  eat: 'Little in the village. Most day trips include nothing and the drive is long.'
},

'ASW-philae': {
  intro: [
    'Philae was the cult centre of Isis and it was the last functioning temple of the old Egyptian religion. Christianity became the state religion in the fourth century but Philae kept operating, partly because the Nubians south of the border still worshipped Isis and had a treaty right to do so. Justinian finally closed it around AD 537.',
    'The last datable hieroglyphic inscription anywhere in the world was carved here in AD 394, and the last demotic one in AD 452. Writing that had been in continuous use for three and a half thousand years stopped on this island.',
    'The first Aswan dam of 1902 left the temples underwater for most of each year, and visitors came by rowing boat and looked down through the water at the capitals. After the High Dam they would have been permanently submerged, so between 1972 and 1980 the whole complex was dismantled into forty thousand blocks and rebuilt on Agilkia island nearby, which was reshaped to match the original.'
  ],
  see: [
    { n: 'Arriving by boat',
      d: 'The only access, about ten minutes from Marina. Negotiate the boat separately from the ticket and agree the waiting time.' },
    { n: 'The Temple of Isis',
      d: 'With two pylons, a birth house and a hypostyle hall. Look for the Coptic crosses carved over the reliefs by the monks who later used it as a church.' },
    { n: 'Trajan’s Kiosk',
      d: 'An unfinished Roman pavilion of fourteen columns on the eastern shore, roofless, which is the most photographed building on the island.' },
    { n: 'The last inscriptions',
      d: 'The AD 394 graffito of Esmet-Akhom on the gate of Hadrian, which is the final hieroglyphic text ever carved.' },
    { n: 'The sound and light show',
      d: 'In the evening, which gets you onto the island after dark with the buildings lit.' },
    { n: 'The relocation',
      d: 'The waterline staining on the lower blocks is still visible from the seventy years the temples spent submerged.' }
  ],
  when: 'October to April. Early morning before the Aswan day groups arrive, or the evening show.',
  stay: 'Two hours including the boat.',
  move: 'Taxi to Marina, then a motorboat. Usually combined with the High Dam and the unfinished obelisk.',
  eat: 'Nothing on the island beyond a kiosk.'
},

'ASW-nubian-village': {
  intro: [
    'Nubia is the stretch of the Nile from Aswan south into Sudan, and the Nubians are a distinct people with their own languages, Nobiin and Kenzi, which are not related to Arabic. They were Christian from the sixth century until the fourteenth, later than Egypt, and the culture is visibly different.',
    'The High Dam displaced around a hundred thousand of them between 1963 and 1964. Their villages, their fields and most of their archaeology went under Lake Nasser and they were resettled in planned settlements near Kom Ombo, far from the river. It is the defining event of modern Nubian history and it is discussed constantly.',
    'The villages on the west bank at Gharb Soheil and on Elephantine were above the waterline and survived. The houses are painted in flat strong colours with domed roofs and decorated doorways, and several families take visitors for lunch, which is a managed arrangement and is also genuinely how people live.'
  ],
  see: [
    { n: 'Gharb Soheil',
      d: 'The most visited village, reached by boat or camel from the west bank. Painted houses, henna, hibiscus tea and crocodiles kept in tanks in some houses, which is a tradition and is not to everyone’s taste.' },
    { n: 'Lunch in a house',
      d: 'Arranged through boatmen or guesthouses. Nubian tagines, fried fish and salads, usually on a roof terrace.' },
    { n: 'The Nubian Museum',
      d: 'In Aswan, holding the material rescued before the flooding. Go here first; the village makes more sense afterwards.' },
    { n: 'Elephantine villages',
      d: 'Koti and Siou on the island, which are quieter and less organised than Gharb Soheil and where people actually live without visitors.' },
    { n: 'Staying in a Nubian guesthouse',
      d: 'Several on Elephantine and the west bank, which is the best accommodation in Aswan at any price.' },
    { n: 'The music',
      d: 'Nubian music has its own scale and instruments, and there are performances in the villages that are genuinely local rather than staged.' }
  ],
  when: 'October to April.',
  stay: 'Half a day, or a night in a guesthouse.',
  move: 'By boat from Aswan. The villages have no road connection from the city.',
  eat: 'Nubian tagines, aseeda, and fish from the river. Hibiscus tea, which is drunk cold here.'
},

'ASW-elephantine': {
  intro: [
    'Elephantine has been inhabited continuously for about five thousand years, which makes it one of the oldest settled places in Egypt. It was the frontier town, the administrative centre for the border with Nubia, and the base from which expeditions went south.',
    'The excavated town at the southern end has mud-brick buildings from the Old Kingdom through to the Roman period, stacked on top of each other, with a temple of Khnum, the ram-headed god who was believed to control the flood from caves beneath the island.',
    'There was also a Jewish garrison here in the fifth century BC with its own temple to Yahweh, which is an extraordinary thing. The Elephantine papyri, found in 1893, are letters and legal documents from that community in Aramaic, including a request to the Persian governor for permission to rebuild their temple after it was destroyed by Egyptian priests.'
  ],
  see: [
    { n: 'The excavated town',
      d: 'At the southern tip, layered mud brick from several millennia, with a German Archaeological Institute dig that has run since 1969.' },
    { n: 'The nilometer',
      d: 'Cut into the rock at the water’s edge, with a stair descending to the river and measurement marks in several scripts including Greek and Arabic.' },
    { n: 'The Aswan Museum',
      d: 'On the island, small and old-fashioned, with material from the excavations.' },
    { n: 'The Nubian villages',
      d: 'Koti and Siou at the northern end, painted, lived in, and reachable on foot from the museum.' },
    { n: 'The granite boulders',
      d: 'The island is granite and the first cataract rocks around it are the geological reason Aswan is where it is.' },
    { n: 'The ferry',
      d: 'A local ferry runs from the corniche for a few pounds, which is how islanders travel and is the cheapest boat ride in Egypt.' }
  ],
  when: 'October to April. Morning for the excavation, evening for the villages.',
  stay: 'Half a day.',
  move: 'Public ferry from the Aswan corniche, or a felucca.',
  eat: 'Guesthouses in the villages serve food to non-residents by arrangement.'
},

'ASW-kom-ombo': {
  intro: [
    'Kom Ombo is a double temple, which is almost unique. It is split down the centre line with two entrances, two hypostyle halls and two sanctuaries: the southern half for Sobek, the crocodile god, and the northern for Haroeris, Horus the Elder. The symmetry is exact.',
    'The reason for the crocodile cult is the location. This stretch of the river had a sandbank where crocodiles basked in large numbers, and the Egyptians dealt with the danger by worshipping it. Mummified crocodiles were buried nearby in quantity and some are now displayed in a museum beside the temple.',
    'On the outer wall of the rear corridor is a relief showing a set of objects usually interpreted as surgical instruments: scalpels, bone saws, forceps, suction cups and a set of scales. Whether it is a medical kit or temple equipment is argued, and it is the most photographed relief in the temple either way.'
  ],
  see: [
    { n: 'The double sanctuary',
      d: 'Walk up one side and back the other. The duplication is the whole architectural idea and only resolves when you do both.' },
    { n: 'The surgical instruments relief',
      d: 'On the rear outer corridor wall, which also carries a scene of a woman giving birth on a birthing stool.' },
    { n: 'The Crocodile Museum',
      d: 'Beside the temple, with about twenty mummified crocodiles of various sizes displayed in a dark room, which is genuinely striking.' },
    { n: 'The nilometer',
      d: 'A deep circular well in the enclosure, with a stair descending, connected to the river.' },
    { n: 'The calendar',
      d: 'A relief listing the temple festivals through the year with the offerings due at each, which is the main source for the Ptolemaic religious calendar.' },
    { n: 'Evening light',
      d: 'The temple is on a bluff directly above the river and is lit after dark. Cruise boats moor at the foot of it.' }
  ],
  when: 'October to April. Most visitors arrive by cruise boat in the late afternoon, which is also the best light.',
  stay: 'An hour.',
  move: 'Forty-five minutes north of Aswan by road, or a cruise stop.',
  eat: 'Nothing on site.'
},

'ASW-edfu': {
  intro: [
    'The Temple of Horus at Edfu was begun in 237 BC and finished in 57 BC, which means it took a hundred and eighty years and spanned most of the Ptolemaic dynasty. It is the most completely preserved temple in Egypt: the pylon stands, the roof is on, the enclosure wall is intact and the sanctuary still contains its granite shrine.',
    'That preservation is because it was buried. Desert sand and village debris covered it to the top of the pylon, with houses built on the roof, and Auguste Mariette cleared it in the 1860s. The soot on some ceilings is from the cooking fires of those houses.',
    'Because it is Ptolemaic and complete, it is the single best source for how an Egyptian temple actually worked. The walls carry the full founding ritual, the daily liturgy, the festival calendar and a text describing the mythical first temple, which the priests used as the theological justification for the building.'
  ],
  see: [
    { n: 'The pylon',
      d: 'Thirty-six metres high, with the king smiting enemies on both towers, and two black granite falcons in front.' },
    { n: 'The sanctuary',
      d: 'With the original granite naos of Nectanebo II, three hundred years older than the building round it, and a replica of the sacred barque beside it.' },
    { n: 'The Festival of the Beautiful Meeting',
      d: 'Carved on the walls: Hathor’s statue was brought upriver from Dendera every year for a conjugal visit, which took fourteen days and was the main event of the temple year.' },
    { n: 'The Nilometer and the laboratory',
      d: 'Small side rooms, one being the perfume workshop with the recipes carved on the walls.' },
    { n: 'The roof and the crypt',
      d: 'Access varies. The crypts held the temple treasure and the stairs to the roof carry the New Year procession reliefs.' },
    { n: 'The caleche',
      d: 'Cruise passengers are taken from the dock by horse carriage, which is a contested practice on welfare grounds. Taxis are available.' }
  ],
  when: 'October to April. Early morning before the cruise groups.',
  stay: 'Ninety minutes.',
  move: 'An hour and a half north of Aswan by road, or a cruise stop.',
  eat: 'Nothing worth it at the site.'
},

'ASW-high-dam': {
  intro: [
    'The High Dam was built between 1960 and 1970 with Soviet money and engineering after the United States and Britain withdrew funding, which precipitated Nasser’s nationalisation of the Suez Canal and the 1956 crisis. It is three and a half kilometres long, a hundred and eleven metres high, and contains about seventeen times the material of the Great Pyramid.',
    'It ended the annual flood, which had deposited fertile silt on the fields for five thousand years. Egypt gained year-round irrigation, two or three harvests instead of one, protection from drought and flood, and about ten per cent of its electricity. It lost the silt, so the land now depends on chemical fertiliser, the Delta is eroding, and the Mediterranean sardine fishery collapsed.',
    'It also created Lake Nasser, five hundred and fifty kilometres long, which drowned Nubia and displaced around a hundred thousand people and triggered the largest archaeological rescue operation ever attempted.'
  ],
  see: [
    { n: 'The dam itself',
      d: 'A viewing area on the crest with the lake on one side and the river below on the other. Photography is restricted in places and there are soldiers.' },
    { n: 'The lotus monument',
      d: 'A seventy-metre concrete flower commemorating the Soviet-Egyptian cooperation, with a lift to a viewing platform.' },
    { n: 'The old dam',
      d: 'The 1902 British dam downstream, which was raised twice and is still in use, and which flooded Philae for seven decades.' },
    { n: 'Kalabsha',
      d: 'A rescued Nubian temple reassembled on a promontory near the dam, with Beit al-Wali and the Kiosk of Qertassi beside it. Reached by boat and almost always empty.' },
    { n: 'The trade-off',
      d: 'Worth thinking about on site. It is the defining infrastructure decision of modern Egypt and the arguments on both sides are substantial.' },
    { n: 'The Nubian Museum',
      d: 'In Aswan, which covers the displacement and the rescue in detail.' }
  ],
  when: 'October to April. Usually a thirty-minute stop on a Philae trip.',
  stay: 'Forty minutes.',
  move: 'Taxi from Aswan, combined with Philae and the unfinished obelisk.',
  eat: 'Nothing.'
},

'ASW-unfinished-obelisk': {
  intro: [
    'In the northern quarries at Aswan there is an obelisk still attached to the bedrock on three sides. It is forty-two metres long and would have weighed around eleven hundred and sixty-eight tonnes, which would have made it by far the largest ever raised. It was abandoned when cracks appeared in the granite.',
    'That abandonment is why it matters. Every finished obelisk tells you nothing about how it was made; this one is a construction site frozen at the moment the project failed. The trenches cut round it, the tool marks, the test holes and the dolerite pounders left lying about are all there.',
    'The method visible here is pounding rather than cutting: workers with balls of dolerite, which is harder than granite, bashing trenches down either side. Experimental archaeology has shown it works and is extremely slow, which is consistent with the scale of labour the state could command.'
  ],
  see: [
    { n: 'The obelisk',
      d: 'Walk down beside it. The scale only works when you are in the trench with it.' },
    { n: 'The pounding marks',
      d: 'The surface is covered in the rounded depressions left by dolerite balls, which is the clearest evidence of the method anywhere.' },
    { n: 'The crack',
      d: 'Running across it, which is why the work stopped. It would have been a total loss of possibly years of labour.' },
    { n: 'The dolerite pounders',
      d: 'Some are displayed. They are heavy and the technique is worth trying to imagine for an eleven-hundred-tonne block.' },
    { n: 'Who it was for',
      d: 'Probably Hatshepsut, which would have made it a companion to the one standing at Karnak.' },
    { n: 'The shade',
      d: 'There is almost none and the granite radiates heat. This is a morning visit.' }
  ],
  when: 'October to April, morning. Granite in the Aswan sun is punishing.',
  stay: 'Forty-five minutes.',
  move: 'Ten minutes from Aswan by taxi, usually combined with Philae and the dam.',
  eat: 'Nothing.'
},

'ASW-st-simeon': {
  intro: [
    'The Monastery of St Simeon was built in the seventh century and rebuilt in the tenth, on a terrace in the desert on the west bank, a kilometre back from the river. It housed perhaps three hundred monks and could accommodate several hundred more travellers, and it was fortified with a ten-metre wall because it was on a route into Nubia.',
    'It was abandoned around 1173, apparently after Saladin’s forces attacked it, and has been empty since. Because nobody lived there afterwards and because the climate is dry, a great deal survives: the basilica with the remains of frescoes in the apse, the refectory, the dormitory with mud-brick vaults, the stables and the bakery.',
    'Getting there involves a boat to the west bank and then a twenty-minute walk up a sandy track, or a camel. The site is in the desert with no vegetation and nothing around it, which is roughly how the monks would have wanted it.'
  ],
  see: [
    { n: 'The basilica',
      d: 'With the remains of a Christ Pantocrator in the apse and painted apostles, badly damaged and still legible.' },
    { n: 'The dormitory',
      d: 'Two storeys of mud-brick barrel vaults with stone beds, which is the best preserved monastic living quarters in Egypt.' },
    { n: 'The defaced faces',
      d: 'Several frescoes have had the eyes scratched out, which was done by later visitors and is a recurring feature of Coptic sites.' },
    { n: 'The walls',
      d: 'Ten metres, with a wall walk, which makes it look more like a fort than a monastery and was the intention.' },
    { n: 'Getting there',
      d: 'Boat to the west bank, then walk or camel. Negotiate the whole trip including waiting time before setting off.' },
    { n: 'The Tombs of the Nobles',
      d: 'On the same bank, rock-cut tombs of Old Kingdom governors of Elephantine, including Harkhuf, whose autobiography describes four expeditions into Africa.' }
  ],
  when: 'October to April, morning. No shade.',
  stay: 'Two hours including the crossing.',
  move: 'A boat from Aswan to the west bank and then on foot or by camel.',
  eat: 'Nothing. Take water.'
},

'ASW-kitcheners-island': {
  intro: [
    'Kitchener was given this island in the 1890s as a reward for his Sudan campaign, and he spent the rest of his time in Egypt filling it with plants brought from India, East Asia and across Africa. It is about seven hundred and fifty metres long and the whole thing is a botanical garden.',
    'It passed to the Egyptian government after his death and is now run as a research station as well as a public garden, with several hundred species including royal palms, sausage trees, flame trees and a collection of African figs.',
    'The practical point is that it is only reachable by boat, which means that unlike every other garden in Egypt there is no traffic noise. You walk a path down the middle under a canopy with the river on both sides, and it is the quietest half hour available in Aswan.'
  ],
  see: [
    { n: 'The central avenue',
      d: 'Royal palms down the spine of the island with cross paths off it. Twenty minutes end to end at a stroll.' },
    { n: 'The birds',
      d: 'Hoopoes, bee-eaters, Nile Valley sunbirds and in winter a good number of migrants. The island is a magnet because it is the only dense vegetation for miles.' },
    { n: 'The riverside benches',
      d: 'Facing west towards the Tombs of the Nobles and the desert, which is where the sunset is.' },
    { n: 'The cafe',
      d: 'At the northern end, with tea and karkadeh, where the boatmen wait.' },
    { n: 'Combining with a felucca',
      d: 'The standard Aswan afternoon: felucca round Elephantine, an hour on Kitchener’s, and back at sunset.' },
    { n: 'The sausage trees',
      d: 'Kigelia africana, with fruit up to sixty centimetres hanging on long stalks, which are reliably the thing visitors photograph.' }
  ],
  when: 'October to April. Late afternoon.',
  stay: 'An hour.',
  move: 'Only by felucca or motorboat from Aswan. Agree the waiting time with the boatman.',
  eat: 'The cafe on the island. Hibiscus tea, cold.'
},

'ASW-lake-nasser': {
  intro: [
    'Lake Nasser is five hundred and fifty kilometres long and up to thirty-five wide, holding around a hundred and thirty-two cubic kilometres of water, which makes it one of the largest reservoirs on earth. About eighty per cent is in Egypt and the rest, called Lake Nubia, is in Sudan.',
    'Under it is Nubia: villages, cemeteries, fortresses and temples. The UNESCO rescue campaign between 1960 and 1980 moved twenty-two monuments, including Abu Simbel and Philae, and documented a great deal more that was left to drown.',
    'The lake has no settlements along most of its length and almost no traffic. A few cruise boats run between Aswan and Abu Simbel over three or four nights, stopping at the relocated temples, which is the only practical way to see them. The fishing is also remarkable: Nile perch here grow past a hundred kilos.'
  ],
  see: [
    { n: 'The Lake Nasser cruise',
      d: 'Three or four nights between the High Dam and Abu Simbel, stopping at Wadi es-Sebua, Amada and Qasr Ibrim. Only a handful of boats operate.' },
    { n: 'Wadi es-Sebua',
      d: 'A Ramesses II temple with an avenue of sphinxes half buried in sand, relocated four kilometres from its original site.' },
    { n: 'Qasr Ibrim',
      d: 'The only major Nubian site still in its original position, on what was a clifftop and is now an island. Not landed on; viewed from the boat.' },
    { n: 'Abu Simbel at night',
      d: 'Boats moor there overnight, which means seeing the temples lit and at dawn without the convoy crowd.' },
    { n: 'Fishing',
      d: 'Nile perch and tigerfish, on specialist safaris camping on the shore. Catch and release is usual for the big perch.' },
    { n: 'The birds',
      d: 'Very large numbers of waders, pelicans and African skimmers, and the shoreline is one of the better birding areas in Egypt.' }
  ],
  when: 'October to April. Summer on the lake is extremely hot.',
  stay: 'Three to four nights on a cruise.',
  move: 'Boats leave from the High Dam marina. Book well ahead; capacity is small.',
  eat: 'On board. Perch from the lake appears on the menu.'
},

'MDE-abydos': {
  intro: [
    'Abydos was the burial place of the first pharaohs of the First Dynasty, around 3000 BC, and it later became the cult centre of Osiris, god of the dead. Egyptians wanted to be buried here or at least to have a memorial stela erected, and pilgrims came for two and a half thousand years.',
    'The Temple of Seti I, built around 1280 BC, contains the finest raised relief carving in Egypt. Raised relief is much harder than sunk relief because the whole background has to be cut away, and the figures here are modelled with a subtlety that nothing else matches. A great deal of the original paint survives.',
    'In a corridor is the Abydos King List: seventy-six cartouches of Seti’s predecessors in order. It is one of the foundation documents of Egyptian chronology. It is also political: Hatshepsut, Akhenaten, Tutankhamun and Ay are all left out, which tells you who the Nineteenth Dynasty considered legitimate.'
  ],
  see: [
    { n: 'The Seti I reliefs',
      d: 'The seven chapels at the rear, each for a different deity, with raised relief and surviving colour. The Osiris chapel is the best.' },
    { n: 'The King List',
      d: 'In the Gallery of the Lists, with Seti and the young Ramesses shown offering to the names of seventy-six predecessors.' },
    { n: 'The Osireion',
      d: 'Behind the temple, a subterranean structure of enormous granite pillars built to look like a primeval mound surrounded by water, usually partly flooded. The dating is argued and it is extraordinary.' },
    { n: 'The Ramesses II temple',
      d: 'Two hundred metres away, roofless but with the best-preserved colour of any temple in Egypt because the sun has bleached nothing under a roof.' },
    { n: 'The helicopter glyphs',
      d: 'A palimpsest where Ramesses’ carving overlaps Seti’s and the combination resembles modern machines. It is a well-understood artefact of recarving and it attracts a certain kind of tour.' },
    { n: 'Umm el-Qa’ab',
      d: 'The First Dynasty royal cemetery in the desert behind, a long walk, with the tomb of Djer that was later identified as the grave of Osiris itself.' }
  ],
  when: 'October to April. Usually visited as a long day trip from Luxor with Dendera.',
  stay: 'Two hours.',
  move: 'A car from Luxor, about two and a half hours each way. Some cruises stop at Baliana.',
  eat: 'Simple places in Al-Balyana. Take water for the day.'
},

'MDE-dendera': {
  intro: [
    'The Temple of Hathor at Dendera is Ptolemaic and Roman, mostly built between about 54 BC and AD 20, which makes it one of the last great temples of the Egyptian tradition. Cleopatra VII and Caesarion appear on the rear exterior wall, which is one of the few contemporary images of her.',
    'Between 2005 and the 2010s the hypostyle hall ceiling was cleaned of soot laid down by centuries of fires lit by people living in the temple. What came off revealed deep blue night skies, the sky goddess Nut arched across the ceiling swallowing the sun, and the zodiac in strong colour.',
    'There are also crypts: narrow passages under the floor, reached through a small opening, where the temple treasure was kept. One contains the relief usually called the Dendera light, which Egyptologists read as a lotus and a serpent representing creation and which a persistent fringe interprets as an electric lamp.'
  ],
  see: [
    { n: 'The cleaned ceiling',
      d: 'Blue, gold and ochre across twenty-four columns with Hathor-headed capitals. The best painted ceiling in Egypt after Esna.' },
    { n: 'The crypts',
      d: 'A short descent into a narrow passage with carved walls. Claustrophobic and the only accessible temple crypt in Egypt.' },
    { n: 'The roof',
      d: 'With two kiosks and the chapel of the resurrection of Osiris, where the original zodiac ceiling was removed by a French expedition in 1821 and is now in the Louvre. A copy is in place.' },
    { n: 'Cleopatra on the rear wall',
      d: 'With Caesarion, on the exterior south wall, in conventional Egyptian style rather than the Hellenistic portraits.' },
    { n: 'The sacred lake',
      d: 'Behind the temple, now full of palms growing out of the bottom, which is more atmospheric than water would be.' },
    { n: 'The mammisi',
      d: 'Two birth houses in the enclosure, one Roman, where the birth of Hathor’s son was celebrated.' }
  ],
  when: 'October to April. Usually combined with Abydos on a long day from Luxor, or a cruise stop at Qena.',
  stay: 'Two hours.',
  move: 'A car from Luxor, about ninety minutes.',
  eat: 'Nothing on site.'
},

'MDE-amarna': {
  intro: [
    'In about 1346 BC Akhenaten abandoned Thebes, declared that only the Aten, the sun disc, would be worshipped, closed the other temples, and built an entirely new capital on virgin ground at a site nobody had used. He called it Akhetaten, marked the boundaries with inscribed stelae in the cliffs, and swore never to leave.',
    'The city was occupied for about fifteen years. After his death the court went back to Thebes, the old gods were restored, his name was erased from king lists, and the buildings were dismantled for their stone, which was reused in pylons at Karnak and Hermopolis and so was preserved as thousands of small blocks called talatat.',
    'What is left is foundations and outlines over a large plain inside a bay of cliffs, plus rock tombs cut for officials in the cliffs north and south. The Amarna Letters, a diplomatic archive in Akkadian found in the records office in 1887, are the best source on Late Bronze Age international relations that exists.'
  ],
  see: [
    { n: 'The northern tombs',
      d: 'Including Ahmose and Meryra, with reliefs in the new artistic style: elongated figures, informal royal family scenes, and the Aten’s rays ending in hands.' },
    { n: 'The southern tombs',
      d: 'Including Ay, who later became pharaoh, with the fullest text of the Great Hymn to the Aten carved on the wall.' },
    { n: 'The Great Aten Temple',
      d: 'Foundations only, but the scale is visible, and it was open to the sky rather than enclosing a dark sanctuary, which was the theological point.' },
    { n: 'The Royal Tomb',
      d: 'In a wadi six kilometres into the desert, where Akhenaten and his daughter Meketaten were buried. Reached by a rough track and rarely open.' },
    { n: 'The boundary stelae',
      d: 'Carved into the cliffs, several still legible, marking the limits he set and the oath he swore.' },
    { n: 'The workmen’s village',
      d: 'A walled settlement in the desert, like Deir el-Medina, which showed that the inhabitants kept household shrines to the old gods despite the official religion.' }
  ],
  when: 'October to April. The site is enormous and exposed and needs a car and a guide.',
  stay: 'Most of a day.',
  move: 'A car from Minya, about an hour. A police escort is sometimes required in Middle Egypt; check locally.',
  eat: 'Nothing on site. Minya has places.'
},

'MDE-beni-hasan': {
  intro: [
    'Thirty-nine rock-cut tombs of Middle Kingdom provincial governors are cut into a cliff above the Nile here, dating from around 2000 to 1800 BC. Twelve are decorated and four are usually open.',
    'The painting is different from New Kingdom work: looser, more observational, and concerned with activity rather than ritual. The tomb of Baqet III has a wall showing about two hundred wrestling holds in sequence, each pair of figures painted in contrasting colours so the limbs can be followed, which is effectively a technical manual.',
    'In the tomb of Khnumhotep II is a procession of thirty-seven Asiatic traders arriving with donkeys, eye paint and a lyre, labelled as coming from Shut. It is the most reproduced image of Semitic people in Egyptian art and has been argued about in connection with the biblical patriarchs for two centuries.'
  ],
  see: [
    { n: 'Baqet III and Kheti',
      d: 'The wrestling sequences, plus hunting in the desert with an unusual number of animal species including what appear to be mythical ones.' },
    { n: 'Khnumhotep II',
      d: 'The Asiatic caravan, and a famous panel of birds in an acacia tree painted with enough accuracy to identify the species.' },
    { n: 'Amenemhat',
      d: 'With a painted ceiling imitating matting and a biographical text describing a campaign into Nubia.' },
    { n: 'The proto-Doric columns',
      d: 'Several tombs have fluted columns cut from the rock, about fifteen hundred years before the Greeks, which were noted by nineteenth-century travellers.' },
    { n: 'The climb',
      d: 'A stair up the cliff from the car park. The view over the Nile from the tomb entrances is the other reason to come.' },
    { n: 'Speos Artemidos',
      d: 'A rock-cut chapel of Hatshepsut two kilometres south, with an inscription denouncing the Hyksos, which is one of the few Egyptian references to them.' }
  ],
  when: 'October to April.',
  stay: 'Two hours.',
  move: 'A car from Minya, about forty-five minutes. Police escort may apply.',
  eat: 'Nothing on site.'
},

'MDE-tuna-el-gebel': {
  intro: [
    'Tuna el-Gebel was the necropolis of Hermopolis, the cult centre of Thoth, and Thoth’s sacred animals were the ibis and the baboon. The catacombs here held mummified animals in enormous numbers: estimates run to four million ibises and several thousand baboons, bred, killed, wrapped and sold to pilgrims as votive offerings.',
    'The galleries run for kilometres under the desert and only a portion is accessible. What you walk through is a corridor lined with niches, with pottery jars still stacked in places, and the scale is the thing: this was an industrial operation sustained over centuries.',
    'Above ground is the tomb-chapel of Petosiris, a high priest of Thoth around 300 BC, built like a small temple. Its reliefs show Egyptian subjects, agricultural work and offering scenes, carried out by figures in Greek dress and poses. It is the clearest single monument of the moment when the two cultures met.'
  ],
  see: [
    { n: 'The catacombs',
      d: 'A descent into lit galleries with niches and jars. Low ceilings in places and a strong smell.' },
    { n: 'Tomb of Petosiris',
      d: 'Egyptian content in Greek style, which is a hybrid that exists almost nowhere else and is the main reason scholars come.' },
    { n: 'The mummy of Isadora',
      d: 'A Roman-period woman, displayed in a separate building, who by tradition drowned in the Nile and whose father built her tomb. Confronting and openly displayed.' },
    { n: 'The boundary stela',
      d: 'One of Akhenaten’s Amarna boundary markers is cut into the cliff here, which is the western limit of his city.' },
    { n: 'Hermopolis',
      d: 'Seven kilometres away at Ashmunein, with two colossal baboon statues and the foundations of a Coptic basilica built from temple stone.' },
    { n: 'The quiet',
      d: 'Middle Egypt gets almost no visitors. You are likely to be the only people at any of these sites.' }
  ],
  when: 'October to April.',
  stay: 'Two hours.',
  move: 'A car from Minya, about an hour. Usually combined with Hermopolis and sometimes Amarna.',
  eat: 'Nothing. Minya.'
},

'MDE-red-monastery': {
  intro: [
    'The Red and White Monasteries near Sohag were founded in the fourth and fifth centuries, in the first generation of organised Christian monasticism, which began in the Egyptian desert. The White Monastery was run by Shenoute, who led a community of several thousand and whose writings are the largest surviving body of Coptic literature.',
    'They are built of reused pharaonic stone: the White Monastery’s exterior is limestone blocks taken from temples, with an Egyptian cavetto cornice at the top, which gives the odd impression of a pharaonic building with a basilica inside.',
    'The Red Monastery church contains a painted sanctuary that was covered in soot and whitewash. A conservation project led by the American Research Center in Egypt, running from 2002, cleaned it to reveal late antique wall painting in strong reds, yellows and greens: columns, saints, niches and painted architecture, essentially complete. It is the best surviving late antique interior in the eastern Mediterranean.'
  ],
  see: [
    { n: 'The Red Monastery sanctuary',
      d: 'Three apses of painted architecture and figures, cleaned over a decade. The intensity of the colour is startling and almost nobody has heard of it.' },
    { n: 'The White Monastery',
      d: 'Four kilometres away, with the pharaonic-looking exterior and a vast basilica inside, largely ruined above the lower walls.' },
    { n: 'The reused temple stone',
      d: 'Visible in both, with hieroglyphs upside down in the walls where blocks were taken from nearby temples.' },
    { n: 'The conservation',
      d: 'Explained on site. It is a model project and the before-and-after photographs are part of the display.' },
    { n: 'Akhmim',
      d: 'Across the river, where a nine-metre statue of Meritamun, daughter of Ramesses II, was found in 1981 under a modern town.' },
    { n: 'Getting permission',
      d: 'Middle Egypt sites sometimes require a police escort. Arrange through a Sohag or Luxor operator.' }
  ],
  when: 'October to April. Coptic feasts fill the monasteries with pilgrims.',
  stay: 'Two hours.',
  move: 'A car from Sohag, twenty minutes. Sohag is on the main Cairo to Luxor railway.',
  eat: 'Nothing on site. Sohag has local places.'
},

'MDE-minya': {
  intro: [
    'Minya is a provincial city of about a quarter of a million people on the west bank, with a corniche of decaying belle époque villas built by cotton money in the late nineteenth century. It is called the bride of Upper Egypt, which is a local phrase rather than a tourist slogan.',
    'Almost nobody visits, which is the result of a security situation in Middle Egypt that was serious in the 1990s and has eased substantially since. Police escorts are still sometimes required for foreigners travelling to the surrounding sites, which is more bureaucratic inconvenience than danger.',
    'It is the only sensible base for Beni Hasan, Tuna el-Gebel, Hermopolis and Tell el-Amarna, which between them constitute one of the richest archaeological concentrations in Egypt and which receive a tiny fraction of the attention of Luxor.'
  ],
  see: [
    { n: 'The corniche',
      d: 'Nineteenth-century villas in varying states of collapse along the river, with the fields immediately behind.' },
    { n: 'Zawyet el-Maiyitin',
      d: 'Claimed as one of the largest cemeteries in the world, running for several kilometres along the east bank, used by both Muslims and Copts.' },
    { n: 'The sites',
      d: 'Beni Hasan, Amarna, Tuna el-Gebel and Hermopolis are all within an hour, and this is why you would stay here.' },
    { n: 'The Coptic presence',
      d: 'Minya governorate has one of the highest Coptic populations in Egypt and a number of significant monasteries, including Deir al-Adhra at Gebel el-Teir on a cliff above the river.' },
    { n: 'The escort',
      d: 'Depending on the current rules, foreigners may be assigned a police car between sites. It is routine and not alarming.' },
    { n: 'Akoris and Tihna el-Gebel',
      d: 'Rock-cut tombs and a quarry site on the east bank with Greek and Roman inscriptions, almost never visited.' }
  ],
  when: 'October to April. Middle Egypt is hot and the sites are exposed.',
  stay: 'Two nights as a base.',
  move: 'Train from Cairo, about four hours, or a car. Check the current escort requirement with a local operator.',
  eat: 'Local Egyptian food, with almost nothing aimed at visitors, which is a recommendation.'
},

'FAY-wadi-el-hitan': {
  intro: [
    'Forty million years ago this was the bottom of the Tethys Sea, and in the sediment are the skeletons of early whales. Not fragments: hundreds of articulated skeletons, lying where they died, and several of them have legs.',
    'Basilosaurus was about eighteen metres long and fully aquatic, and it still had small hind limbs with a knee, an ankle and toes, which were useless for walking and are the clearest surviving evidence of the transition from land mammal to whale. Dorudon, smaller, is found here with juveniles, suggesting a calving ground.',
    'It was made a World Heritage Site in 2005 and the display is unusually good: a boardwalk route through the desert with the skeletons left in situ under shelters, no roads inside, and a museum building half buried in the sand. Nothing anywhere else shows this part of evolutionary history so directly.'
  ],
  see: [
    { n: 'The skeleton trail',
      d: 'About three kilometres of marked walking route with the fossils in place. Allow two hours and go slowly.' },
    { n: 'The Basilosaurus hind limbs',
      d: 'A reconstructed specimen in the museum and the in-situ ones on the trail. The legs are the point and they are small enough to miss if you are not looking.' },
    { n: 'The Fossils and Climate Change Museum',
      d: 'Opened in 2016 and partly underground, built with Italian funding, with a complete Basilosaurus and a straightforward explanation of what the site means.' },
    { n: 'Camping',
      d: 'Permitted at a designated area with no facilities. The sky here is as dark as the Western Desert and the silence is total.' },
    { n: 'The rock formations',
      d: 'Yardangs and mushroom rocks cut by the wind out of the sandstone, which make the walk interesting between the fossils.' },
    { n: 'Wadi al-Rayan',
      d: 'On the way in, with Egypt’s only waterfalls, created accidentally in the 1970s by agricultural drainage into a desert depression.' }
  ],
  when: 'October to April. The last stretch of track needs a 4x4 and the site closes in sandstorms.',
  stay: 'Most of a day, or a night camping.',
  move: 'A 4x4 from Fayoum or Cairo. About three hours from Cairo and the final section is off-road.',
  eat: 'Nothing on site. Carry everything.'
},

'FAY-lake-qarun': {
  intro: [
    'Lake Qarun is the remnant of Lake Moeris, which in the Middle Kingdom was far larger and was deliberately managed: Amenemhat III built works to divert the Nile flood into the depression through the Bahr Yussef channel, storing water and controlling the inundation downstream.',
    'It is now about two hundred square kilometres and forty-five metres below sea level, with no outflow, which means it has been getting saltier for two thousand years as irrigation water evaporates out of it. It is now saltier than the sea and the fish are marine species introduced in the twentieth century.',
    'Despite that it is one of the more important wetlands in Egypt for migrating birds, with flamingos, spoonbills, herons and large numbers of wintering duck, and it sits on the route between Europe and East Africa.'
  ],
  see: [
    { n: 'The northern shore',
      d: 'Undeveloped desert cliffs where the birds concentrate. A telescope helps and a local guide knows where the flamingos are.' },
    { n: 'Qasr Qarun',
      d: 'A Ptolemaic temple at the western end, complete with a roof you can climb onto, dedicated to the crocodile god Sobek, standing alone in the desert.' },
    { n: 'Dimeh es-Seba',
      d: 'A Ptolemaic town on the north shore with mud-brick walls standing ten metres, reached across the desert and entirely abandoned.' },
    { n: 'The southern shore',
      d: 'Developed with hotels and fish restaurants, which is where most Cairenes come at the weekend.' },
    { n: 'Karanis',
      d: 'A Graeco-Roman town at Kom Aushim with two temples and a long excavation history, where many of the Fayum papyri were found.' },
    { n: 'The Fayum portraits',
      d: 'Painted mummy panels from these towns, now scattered across world museums, which are the only surviving panel paintings from the ancient world.' }
  ],
  when: 'November to March for the birds. Summer is hot and the lake smells.',
  stay: 'A day.',
  move: 'A car from Cairo, about two hours. The north shore needs a 4x4 or a boat.',
  eat: 'Fish restaurants on the southern shore, where the catch is tilapia and mullet from the lake.'
},

'FAY-tunis-village': {
  intro: [
    'In the 1960s a Swiss potter named Evelyne Porret settled above Lake Qarun and set up a pottery school for local children, teaching them to throw and glaze. Several of those children became potters and their children now run studios of their own, which makes Tunis a craft village by deliberate creation rather than tradition.',
    'There are now around thirty workshops in a village of a few hundred people, producing a recognisable Fayoum style: simple forms in blue, green and earth glazes. An annual pottery festival in November brings in makers from across Egypt.',
    'It has also become where Cairo’s artists and writers have weekend houses, which has given it a small cluster of good guesthouses and the only genuinely pleasant accommodation in the Fayoum.'
  ],
  see: [
    { n: 'The potteries',
      d: 'Most are open and the potters will let you watch. Prices are low and the work is good. Ask before photographing people working.' },
    { n: 'The pottery school',
      d: 'Still running, which is the origin of the whole thing.' },
    { n: 'The Fayoum Pottery Festival', t: 'November',
      d: 'Several days of stalls, demonstrations and music, which fills the village.' },
    { n: 'The view over the lake',
      d: 'The village sits on a ridge above Qarun and the guesthouses have terraces facing it.' },
    { n: 'The Sand City',
      d: 'A nearby area of eroded yardangs, reached on foot or by horse from the village.' },
    { n: 'Wadi al-Rayan',
      d: 'Half an hour, with the waterfalls and the dunes, which the guesthouses arrange trips to.' }
  ],
  when: 'October to April. November for the festival.',
  stay: 'Two nights.',
  move: 'A car from Cairo, two and a half hours. Taxis from Fayoum city.',
  eat: 'The guesthouses cook well, mostly Egyptian country food with vegetables from the Fayoum, which is a market garden.'
},

'FAY-fayoum-city': {
  intro: [
    'Fayoum sits in a depression fed not by the Nile directly but by the Bahr Yussef, a channel branching off it near Asyut and running two hundred kilometres north. That channel has carried water here since the Middle Kingdom, which makes the Fayoum one of the oldest continuously irrigated landscapes on earth.',
    'Four large wooden waterwheels turn in the middle of the city, driven by the current of the channel with no other power source, lifting water into higher canals. They are the emblem of the province and there are around two hundred of them across the Fayoum, the only ones of their kind in Egypt.',
    'The city itself is unremarkable and is used as a base. The surrounding countryside is intensively farmed, with mango and olive, and the depression is ringed by desert.'
  ],
  see: [
    { n: 'The waterwheels',
      d: 'Four in the city centre beside the canal, turning continuously. They are around eight metres across and make a constant noise.' },
    { n: 'Qaitbay Mosque',
      d: 'A fifteenth-century mosque built by the sultan for a concubine, with reused pharaonic columns.' },
    { n: 'The obelisk of Senusret I',
      d: 'On a roundabout at the entrance to the city, thirteen metres, moved here from Abgig. The only obelisk in the Fayoum.' },
    { n: 'The Hawara pyramid',
      d: 'Amenemhat III’s mud-brick pyramid, now a mound, which had beside it the labyrinth that Herodotus said surpassed the pyramids. Nothing of it remains above ground.' },
    { n: 'The market',
      d: 'A working provincial souk along the canal, with produce from the depression.' },
    { n: 'The Fayum portraits context',
      d: 'The mummy portraits came from the cemeteries around Hawara and the Graeco-Roman towns. None are displayed locally.' }
  ],
  when: 'October to April.',
  stay: 'A night, though Tunis village is better.',
  move: 'A car from Cairo, about two hours. Buses run from Giza.',
  eat: 'Local food, and the Fayoum produces most of Cairo’s vegetables so it is fresh.'
},

'FAY-meidum': {
  intro: [
    'The Meidum pyramid is a three-stepped tower standing out of a mound of its own rubble, which is not what it was meant to look like. It began as a step pyramid, probably for Huni, and was converted into a true pyramid by Sneferu with an outer casing filled in between the steps.',
    'At some point that casing collapsed, sliding off and piling round the base. The long-standing explanation was that it fell during construction, which is why Sneferu went to Dahshur and changed the angle of the Bent Pyramid. More recent work suggests the collapse happened much later, possibly in the Roman period, from stone robbing.',
    'Either way what is left is the most informative pyramid in Egypt. The internal step structure is exposed, the casing technique is visible in section, and the failure is the reason the engineering is legible.'
  ],
  see: [
    { n: 'The tower',
      d: 'Three steps of the original structure standing out of a rubble skirt about twenty metres deep. Unlike any other pyramid and more interesting than several complete ones.' },
    { n: 'Inside',
      d: 'A descending passage to a corbelled burial chamber with cedar beams still in place in the roof. Open, steep and usually empty.' },
    { n: 'The mastaba of Nefermaat',
      d: 'Beside it, where the Meidum Geese were found: a painted frieze of six geese that is among the finest naturalistic painting from the Old Kingdom, now in Cairo.' },
    { n: 'The inlaid relief technique',
      d: 'Nefermaat’s tomb used a method of cutting the figures out and filling them with coloured paste, which was tried here and abandoned because it did not hold.' },
    { n: 'The mortuary temple',
      d: 'A small plain building on the east side with two uninscribed stelae, which is the earliest of its kind.' },
    { n: 'The isolation',
      d: 'Meidum is off every tour route and you will have it to yourself.' }
  ],
  when: 'October to April.',
  stay: 'An hour.',
  move: 'A car. About ninety minutes from Cairo, on the way to the Fayoum.',
  eat: 'Nothing.'
},

'RSE-marsa-alam': {
  intro: [
    'The southern Red Sea coast was protected by distance until an international airport opened at Marsa Alam in 2003. Before that it was a six-hour drive from Hurghada and almost nothing was developed, which is why the reefs here are in substantially better condition than those further north.',
    'The main draw is the big animals. Dugongs graze the seagrass beds at Marsa Mubarak and Abu Dabbab, and there are perhaps a few dozen in the area, which makes this one of the easier places in the world to see one. Spinner dolphins rest during the day in the lagoon at Samadai, which is managed with a daily cap and a no-swim zone.',
    'Further offshore, Elphinstone is a reef wall running north to south with drop-offs on both sides and a plateau at either end, where oceanic whitetip sharks are seen in autumn. It is a serious dive with current and it is one of the best in the Red Sea.'
  ],
  see: [
    { n: 'Dugongs at Marsa Mubarak or Abu Dabbab',
      d: 'Shore entry over seagrass. Sightings are good but not guaranteed. Keep distance; they are protected and easily disturbed.' },
    { n: 'Samadai, the Dolphin House',
      d: 'A horseshoe reef where spinner dolphins rest. Access is capped daily and swimming is restricted to an outer zone, which is why the dolphins still come.' },
    { n: 'Elphinstone',
      d: 'A wall dive with current, oceanic whitetips from October to December, and a hundred-metre drop. For experienced divers only.' },
    { n: 'The house reefs',
      d: 'Most of the hotels along this coast have reef accessible from the beach, which is unusual and means unlimited snorkelling.' },
    { n: 'Wadi El Gemal',
      d: 'The protected desert and coast to the south, with mangroves, Ababda Bedouin and Roman emerald mines.' },
    { n: 'Hamata and the Fury Shoals',
      d: 'Further south again, with a group of reefs and islands that see very few boats.' }
  ],
  when: 'Year round. Water is warmest from July to October, clearest in winter. Oceanic whitetips in autumn.',
  stay: 'A week if you are diving.',
  move: 'Marsa Alam airport with charter flights from Europe. The coast road runs for a hundred kilometres and resorts are spread along it.',
  eat: 'Hotel food, mostly. The town has a few local places and the resorts are largely self-contained.'
},

'RSE-hurghada': {
  intro: [
    'Hurghada was a fishing village of a few thousand people in the 1980s and has somewhere over two hundred thousand now, strung along about forty kilometres of coast in a near-continuous line of resorts. As a town it has little to recommend it and that is not the point.',
    'The point is the water. The reefs offshore, the island groups at Giftun and Abu Ramada, and above all the wrecks: this is the closest base to the Thistlegorm, a British cargo ship sunk by German bombers in 1941 with a hold full of motorcycles, trucks, rifles and railway wagons, lying at thirty metres.',
    'Diving here is cheap and the infrastructure is enormous, which means both excellent operators and some very poor ones. The difference is substantial and worth researching. Reef damage from anchor and fin contact around the busiest sites is visible and has been for years.'
  ],
  see: [
    { n: 'The Thistlegorm',
      d: 'A day trip or a liveaboard. Two holds full of Second World War matériel, including Norton motorcycles stacked in Bedford trucks. Among the best wreck dives in the world.' },
    { n: 'Giftun Islands',
      d: 'Protected, with a daily visitor cap, and the reef at Orange Bay. The snorkelling is the reason rather than the beach.' },
    { n: 'The reefs',
      d: 'Abu Ramada, Shaab El Erg for dolphins, and Careless Reef, which has moray eels in unusual numbers.' },
    { n: 'El Dahar',
      d: 'The old town, with a souk and a working harbour, which is the only part of Hurghada that is not a resort.' },
    { n: 'Liveaboards',
      d: 'Week-long boats from Hurghada north to the Straits of Tiran and the Brothers. The way to dive the Red Sea properly.' },
    { n: 'Kitesurfing',
      d: 'Reliable thermal wind most afternoons, with several schools and flat shallow water at the lagoons.' }
  ],
  when: 'Year round. Summer is very hot on land and the water is at its warmest. Winter needs a thicker suit and the visibility is better.',
  stay: 'A week.',
  move: 'Hurghada airport is a major charter destination. Buses to Cairo and Luxor, the latter about four hours.',
  eat: 'Resort buffets, mostly. El Dahar has Egyptian food and the seafood at the marina is good and expensive.'
},

'RSE-giftun': {
  intro: [
    'The Giftun islands are a protected group about forty-five minutes by boat off Hurghada, with fringing reef, a bird population and no permanent inhabitants. They became a national park in 1995 and the controls since then are the reason the reef is in reasonable condition given the number of boats.',
    'Orange Bay on the smaller island is the beach everybody is sold: white sand, a sheltered lagoon and a reef just offshore. Daily numbers are capped, there is a park fee on top of the boat trip, and the cap is the only reason it still works.',
    'The reef is more interesting than the sand. The drop-off at the southern end has good coral and the usual Red Sea fish list: anthias in clouds, parrotfish, napoleon wrasse and the occasional turtle. Snorkelling straight off the boat before it anchors at the beach is the better half of the day.'
  ],
  see: [
    { n: 'The reef',
      d: 'Snorkel the drop-off rather than the lagoon. Most boats do one reef stop and then the beach; ask for two reef stops when booking.' },
    { n: 'Orange Bay',
      d: 'Sand, shallow water, loungers and a beach bar. Pleasant and crowded, and it is what most of the trip is sold on.' },
    { n: 'The park fee',
      d: 'Charged separately and in cash, which catches people out. It funds the ranger service.' },
    { n: 'Mahmya',
      d: 'A managed beach on the larger island with a daily cap and a slightly older crowd.' },
    { n: 'Choosing a boat',
      d: 'The difference between a large party boat and a small operator is enormous. Smaller boats go to better reefs and spend less time at the beach.' },
    { n: 'The birds',
      d: 'White-eyed gulls and sooty falcons breed on the islands, and parts are closed in the nesting season.' }
  ],
  when: 'Year round. Wind can cancel trips; the sea is calmest early in the day.',
  stay: 'A day trip.',
  move: 'Boats from Hurghada marina, forty-five minutes.',
  eat: 'Lunch on the boat, usually grilled fish and rice, included in the price.'
},

'RSE-el-gouna': {
  intro: [
    'El Gouna was built from nothing from 1989 by the Egyptian businessman Samih Sawiris on twenty-two kilometres of coast north of Hurghada, as a private town of lagoons and interconnected islands. It has around ten thousand residents, its own hospital, school, airport and water treatment, and it is run by the development company rather than the municipality.',
    'The architecture is a deliberately invented Egyptian-Nubian-Mediterranean style by a group of architects including Michael Graves, which sounds like it should be terrible and is actually pleasant: low buildings, earth colours, domes, narrow lanes, and water everywhere.',
    'It is entirely artificial, it is extremely well run, and it is almost the only place in Egypt where you can walk around at night without being hassled. Whether that is a recommendation depends on what you came for.'
  ],
  see: [
    { n: 'The lagoons',
      d: 'Water taxis between the islands and the hotels, which is how people get around. Worth using instead of a car.' },
    { n: 'Abu Tig Marina',
      d: 'The main waterfront, with restaurants and bars, which is where the Cairo weekend crowd is.' },
    { n: 'Kitesurfing',
      d: 'Flat shallow lagoons with consistent wind, which makes this one of the better learning spots in the Red Sea.' },
    { n: 'Diving',
      d: 'Access to the same northern reefs as Hurghada, with the wrecks at Abu Nuhas, a reef that has claimed at least four ships, all divable.' },
    { n: 'El Gouna Film Festival', t: 'October',
      d: 'Established in 2017 and now the main film event in Egypt, which transforms the town for a week.' },
    { n: 'The desert behind',
      d: 'The Eastern Desert mountains start a few kilometres inland, with Bedouin trips and some good mountain biking.' }
  ],
  when: 'Year round. October for the film festival. Summer is hot but the wind helps.',
  stay: 'Four nights.',
  move: 'Twenty-five minutes from Hurghada airport. Within the town, water taxis, tuk-tuks and bicycles.',
  eat: 'A wide range for Egypt, from Egyptian to Italian to Lebanese. Expensive by local standards and reasonable by European ones.'
},

'RSE-safaga': {
  intro: [
    'Safaga is a port town rather than a resort, with a phosphate terminal and the ferry to Saudi Arabia, and the diving infrastructure grew up around it rather than the other way round. That makes it quieter and less polished than Hurghada an hour north.',
    'The Salem Express is the reason many people come and it is not a straightforward dive. A ferry carrying pilgrims returning from Mecca, it struck a reef and sank in December 1991 with the loss of at least four hundred and sixty-four lives, possibly many more. It lies on its starboard side at thirty metres.',
    'It is treated as a war grave. Penetration is not permitted by most operators, the belongings on the seabed are left in place, and some dive centres will not go there at all. Divers who do go are expected to behave accordingly.'
  ],
  see: [
    { n: 'The Salem Express',
      d: 'A hundred metres long at twelve to thirty metres. Luggage, a lifeboat and the ship’s letters are visible. Go with an operator who treats it properly.' },
    { n: 'Panorama Reef and Abu Kafan',
      d: 'Two offshore reefs with walls, strong current and reliably good fish, which are the best diving in the area.' },
    { n: 'Kitesurfing and windsurfing',
      d: 'Safaga has a reputation for flat water and steady wind and has hosted world championship events.' },
    { n: 'The black sand',
      d: 'The beach north of town has mineral-rich sand used therapeutically for skin and joint conditions, which brings a small medical tourism trade.' },
    { n: 'Mons Claudianus',
      d: 'Inland, a Roman granite quarry and garrison town in the desert, which supplied columns for the Pantheon. Rough access and almost never visited.' },
    { n: 'Luxor',
      d: 'Three hours west, which makes Safaga the usual Red Sea base for a Nile day trip.' }
  ],
  when: 'Year round. The wind is strongest from May to September, which suits the kiting and complicates the diving.',
  stay: 'Four nights.',
  move: 'An hour south of Hurghada airport by road.',
  eat: 'Local fish restaurants in the town, which are plain and cheap.'
},

'RSE-el-quseir': {
  intro: [
    'Quseir is the oldest port on the Egyptian Red Sea. Hatshepsut’s expedition to Punt in the fifteenth century BC is thought to have sailed from near here, the Romans ran a road to it from Coptos on the Nile with watering stations along the way, and from the Islamic period until the Suez Canal opened it was the main embarkation port for the hajj from Upper Egypt and North Africa.',
    'The Ottoman fort in the middle of the town was built in 1571 and was fought over by Napoleon’s troops and the British in 1799 and 1801. It was restored in the 2000s and is now a museum of the town’s trading history.',
    'The town itself has about thirty thousand people and a main street of coral-block buildings with wooden balconies, which is unusual because almost nothing of the kind survives on the Red Sea coast. There are two or three hotels and essentially no resort development, which is the whole appeal.'
  ],
  see: [
    { n: 'The Ottoman fort',
      d: 'Restored, with exhibits on the phosphate trade, the hajj traffic and the Napoleonic skirmishes. Small and good.' },
    { n: 'The old town',
      d: 'Coral-block houses with mashrabiya balconies, a few hundred metres of them, in varying repair.' },
    { n: 'Diving',
      d: 'House reefs along the coast north and south, less crowded than Hurghada and in better condition.' },
    { n: 'Mons Porphyrites',
      d: 'Inland, the Roman imperial porphyry quarry, the only known source of the purple stone used for imperial sarcophagi. Needs a 4x4 and a guide.' },
    { n: 'The Roman road',
      d: 'From Quseir to Qift, with surviving stations and wells, which is the route the Red Sea trade with India took.' },
    { n: 'Mövenpick Quseir',
      d: 'A low-rise hotel in domed Nubian style north of the town with a long house reef, which has been there since before this coast was developed.' }
  ],
  when: 'Year round. Quieter than anywhere else on this coast at any time.',
  stay: 'Three nights.',
  move: 'Two and a half hours from Hurghada, ninety minutes from Marsa Alam airport.',
  eat: 'Simple fish places in the town. Not a resort and there is no resort food.'
},

'RSE-wadi-el-gemal': {
  intro: [
    'Wadi El Gemal is about seven thousand square kilometres of protected desert, mountain and coast south of Marsa Alam, declared in 2003. It includes mangrove stands, seagrass beds, offshore islands, dry wadis running up into the Red Sea mountains, and the emerald mines the Romans worked at Mons Smaragdus.',
    'It is also the territory of the Ababda, a Beja people who have lived here for a very long time and speak their own language alongside Arabic. Tourism in the park is partly managed with them, and a trip usually means an Ababda guide, which is the difference between a drive and an education.',
    'The mangroves matter disproportionately. They are the northernmost in the Indian Ocean system, they stabilise the shore, and they are a nursery for the reef fish of the whole coast. Several stands were cleared for development before the park was declared.'
  ],
  see: [
    { n: 'The mangroves at Qulaan',
      d: 'A stand on a shallow lagoon with a boardwalk, flamingos in winter and an Ababda camp beside it.' },
    { n: 'Hamata and the islands',
      d: 'A group of offshore islands with reef and seabird colonies, reached by boat from Hamata.' },
    { n: 'Wadi Gemal itself',
      d: 'The main valley running inland, with acacia, gazelle and Ababda settlements. Needs a 4x4.' },
    { n: 'Mons Smaragdus',
      d: 'Roman emerald mines at Sikait, with rock-cut temples and shaft entrances in a side wadi. The only ancient emerald source in the Roman world.' },
    { n: 'Wadi Gemal Island',
      d: 'Offshore, with a large osprey and seabird population. Landing is restricted.' },
    { n: 'Ababda hospitality',
      d: 'Coffee made with ginger in a long-spouted pot, which is a specific and serious ritual.' }
  ],
  when: 'October to April. Summer in the wadis is extremely hot.',
  stay: 'Two days.',
  move: 'A 4x4 with a licensed guide from Marsa Alam or Hamata. Independent driving in the park is not permitted.',
  eat: 'Bedouin cooking on the trips. Bread baked in sand under a fire.'
},

'SSI-st-catherine': {
  intro: [
    'Justinian ordered this built around AD 548 to 565, around a chapel that Helena, Constantine’s mother, had put up two centuries earlier at the site identified as the burning bush. It has never been destroyed, never been abandoned, and has been continuously inhabited by monks ever since, which makes it the oldest working monastery on earth.',
    'It survived partly through an extraordinary document: a letter of protection attributed to Muhammad, held by the monastery, which guaranteed the monks’ safety. There is also a mosque inside the walls, built in the eleventh century, which is usually read as a practical arrangement that worked.',
    'The library holds somewhere over three thousand manuscripts in twelve languages, second only to the Vatican in significance, and the icon collection includes about a hundred and twenty encaustic panels from the sixth and seventh centuries. They survived the iconoclast destruction of the eighth and ninth centuries because the monastery was under Muslim rule and out of reach.'
  ],
  see: [
    { n: 'The icons',
      d: 'The Christ Pantocrator of Sinai and the Virgin with saints, both sixth century, painted in encaustic. They are the oldest panel icons in existence and they are extraordinary.' },
    { n: 'The basilica',
      d: 'Justinian’s church with its original carved cedar doors and roof beams, and a sixth-century apse mosaic of the Transfiguration.' },
    { n: 'The burning bush',
      d: 'A bramble growing against the wall of the chapel, which the monks identify as the bush and which is the reason the monastery is where it is.' },
    { n: 'The charnel house',
      d: 'Where the bones of past monks are stacked by type, with the skeleton of Stephanos, a sixth-century doorkeeper, seated in his robes.' },
    { n: 'The Codex Sinaiticus',
      d: 'A fourth-century Greek Bible found here in the nineteenth century, most of which is now in the British Library under disputed circumstances the monastery has never accepted.' },
    { n: 'The opening hours',
      d: 'Open to visitors only in the morning, usually nine to twelve, and closed on Fridays, Sundays and feast days. Everybody arrives at once.' }
  ],
  when: 'October to April. The monastery is at fifteen hundred metres and winter nights are below freezing with occasional snow.',
  stay: 'A night at the monastery guesthouse or in St Catherine village.',
  move: 'A car from Dahab or Sharm, about two hours. Check the current security and travel arrangements for Sinai before planning.',
  eat: 'The village has a few places. The guesthouse serves simple meals.'
},

'SSI-mount-sinai': {
  intro: [
    'Gebel Musa is 2,285 metres and it is identified by Christian, Jewish and Islamic tradition as the mountain where Moses received the law. Whether this is the right mountain is unresolvable and has been argued since at least the fourth century, when the identification was made.',
    'Most people climb overnight to be at the summit for sunrise. There are two routes: the camel path, which is long and graded and can be ridden for most of its length, and the Steps of Repentance, around three thousand seven hundred and fifty stone steps cut by a single monk as a penance, which is brutally steep.',
    'The convention is up the camel path in the dark and down the steps in the light. The summit is small, there is a chapel and a mosque on it, and on a busy night there can be several hundred people on the top in the cold waiting for the sun.'
  ],
  see: [
    { n: 'The sunrise',
      d: 'Over the granite peaks of southern Sinai, which are red at dawn. Cold at the top even in summer; take a layer more than you think.' },
    { n: 'The Steps of Repentance',
      d: 'Down in daylight, through a gate where pilgrims confessed, past Elijah’s Basin with a cypress said to be a thousand years old.' },
    { n: 'The camel path',
      d: 'Gentler, about two and a half hours, and ridable to within three hundred steps of the top. The camels are worked hard and the welfare varies.' },
    { n: 'Elijah’s Basin',
      d: 'A plateau about two thirds of the way up, with a chapel and the cypress, where the two routes meet.' },
    { n: 'Going by day',
      d: 'Far fewer people, better views of the range, and no cold wait on the summit. Worth considering instead of the sunrise.' },
    { n: 'Gebel Katherina',
      d: 'At 2,629 metres, the highest mountain in Egypt, a longer and harder climb from the same village with almost nobody on it.' }
  ],
  when: 'October to April. Summer nights are climbable and the days are too hot. Snow on the summit is possible in January and February.',
  stay: 'A night, with the climb starting around two in the morning.',
  move: 'Guides are compulsory and arranged in St Catherine village. Check current Sinai travel advice.',
  eat: 'Tea huts at intervals on the camel path. Take water and a torch.'
},

'SSI-ras-mohammed': {
  intro: [
    'Ras Mohammed is the southern tip of the Sinai peninsula, where the Gulf of Suez and the Gulf of Aqaba meet, and it was declared Egypt’s first national park in 1983. The geography is the reason it is so good: deep water close in, strong currents bringing nutrients, and reef walls that drop hundreds of metres.',
    'Shark and Yolanda Reef is the famous dive. A wall, a plateau, a current that carries you, and then the cargo of the Yolanda, a Cypriot freighter that sank in 1980, scattered across the seabed: hundreds of toilets, baths and a BMW, which has become one of the more surreal underwater sights in the world.',
    'Above water there is a mangrove channel, salt flats, and a fossil coral cliff with a crack in it produced by the 1968 earthquake. The park also includes the Nabq protectorate up the coast, which has the northernmost mangrove forest on the Red Sea.'
  ],
  see: [
    { n: 'Shark and Yolanda Reef',
      d: 'Usually dived as a drift from Shark Reef round to Yolanda. Napoleon wrasse, barracuda, snapper in walls, and the sanitary ware. One of the best dives in the world.' },
    { n: 'The Jackfish Alley and Eel Garden',
      d: 'Other sites in the park, with a cave system and a sand slope full of garden eels.' },
    { n: 'Snorkelling at the Mangrove Channel',
      d: 'Shore access, shallow, with the only mangroves at this end of the Sinai.' },
    { n: 'The Shark Observatory',
      d: 'A clifftop viewpoint over the drop-off where you can see the reef edge and the colour change from above.' },
    { n: 'The earthquake crack',
      d: 'A fissure in the fossil coral terrace from 1968, several metres deep, which you can walk along.' },
    { n: 'The park fees',
      d: 'Entry is charged and passports are checked at the gate. Visitors on Egyptian visas only; Sinai-only entry stamps are not valid for the park.' }
  ],
  when: 'Year round. Water is warmest in September and clearest in winter. Current can be strong.',
  stay: 'A day from Sharm, or several if diving.',
  move: 'Twenty minutes from Sharm el-Sheikh by road, or by boat from the marina.',
  eat: 'Nothing in the park beyond a kiosk. Take water.'
},

'SSI-dahab': {
  intro: [
    'Dahab was a Bedouin fishing village of a few hundred people when Israeli travellers started coming in the 1970s during the occupation of Sinai. After the handover in 1982 it became a backpacker town and it has never entirely stopped being one, despite forty years of attempts to turn it into a resort.',
    'The reason people stay is the shore diving. The reef runs along the front of the town and you walk in: the Lighthouse, the Islands, the Canyon and the Blue Hole are all entered from the beach with no boat involved. That makes diving here cheaper than almost anywhere, which is why the town is full of people doing instructor courses.',
    'It is also a significant wind sport destination. The lagoon at the northern end is flat, shallow and reliably windy, and it is where most of Egypt’s kitesurfing instruction happens.'
  ],
  see: [
    { n: 'Shore diving the Lighthouse',
      d: 'Straight off the promenade in the middle of town, which is where most training happens and which is a genuinely good reef.' },
    { n: 'The Canyon',
      d: 'A narrow fissure in the reef running from about twenty metres down to fifty-two, entered from shore at Blue Hole village. Dark, narrow, and for people with the relevant training.' },
    { n: 'The Blue Hole',
      d: 'Five kilometres north, with the arch at fifty-six metres that has killed many divers. Snorkelling the rim is superb and completely safe.' },
    { n: 'Kitesurfing at the lagoon',
      d: 'Flat water, consistent wind and several schools, at the northern end past the Hilton.' },
    { n: 'Mount Sinai and the Coloured Canyon',
      d: 'Both day trips from here, and most agencies in town run them.' },
    { n: 'The Assalah promenade',
      d: 'A kilometre of restaurants on cushions at the water’s edge, which is where the entire town eats and which is mostly unchanged in thirty years.' }
  ],
  when: 'Year round. Summer is hot and the water is at its warmest. Winter needs a five-millimetre suit and is quieter.',
  stay: 'A week, which is how long most people who come for three days end up staying.',
  move: 'An hour and a half from Sharm el-Sheikh airport by road. Buses from Cairo take about nine hours.',
  eat: 'Fish on the promenade, Bedouin tea, and a lot of travellers’ food. The best is in the small places back from the water.'
},

'SSI-blue-hole': {
  intro: [
    'The Blue Hole is a submarine sinkhole in the fringing reef, about fifty metres across and over a hundred deep, separated from open water by a shallow reef shelf called the saddle. At fifty-six metres there is an arch twenty-six metres long leading out to the open sea.',
    'That arch has killed a great many people. The usual estimate is over a hundred since the 1990s, though nobody keeps an exact count, which would make it among the deadliest dive sites in the world. The mechanism is almost always the same: a diver without the right training or gas descends looking for the arch, gets narcosis at depth, loses track of the exit and does not come up.',
    'There is a line of memorial plaques on the rock above the entry point, which is sobering and widely photographed. Snorkelling the rim, which is what most visitors do, involves none of this: the reef around the edge is shallow, full of fish and entirely safe.'
  ],
  see: [
    { n: 'Snorkelling the rim',
      d: 'Walk in from the beach. The wall of the hole drops away beneath you with anthias and butterflyfish on the edge. Excellent and risk-free.' },
    { n: 'The Bells',
      d: 'A shore entry a few hundred metres north through a chimney in the reef, which opens onto a wall at about twenty-eight metres and drifts back to the Blue Hole. The standard recreational dive here.' },
    { n: 'The memorial plaques',
      d: 'On the rock above the entry. Worth reading before deciding what to do.' },
    { n: 'The arch',
      d: 'At fifty-six metres, requiring technical training, trimix and a plan. Not a recreational dive and no reputable operator will take an unqualified diver there.' },
    { n: 'The cafes',
      d: 'A row of Bedouin places along the shore with cushions, which is where people sit between dives.' },
    { n: 'The drive',
      d: 'Twenty minutes north of Dahab on a coast road with the mountains on one side and the Gulf of Aqaba and Saudi Arabia on the other.' }
  ],
  when: 'Year round. Mornings are calmest.',
  stay: 'Half a day.',
  move: 'Taxi or pickup from Dahab, twenty minutes.',
  eat: 'The Bedouin cafes on the shore do fish, bread and tea.'
},

'SSI-sharm': {
  intro: [
    'Sharm el-Sheikh was an Egyptian naval base, then an Israeli town during the occupation from 1967 to 1982, and has been a purpose-built resort city since. It now has something over seventy thousand residents and a very large hotel capacity spread along the coast from Nabq down to Ras Mohammed.',
    'None of that is the reason to come. The reason is that the Straits of Tiran, Ras Mohammed and the Thistlegorm are all within an hour by boat, which makes this the best-connected diving base in the Red Sea, and the reefs in the marine park are strictly protected.',
    'Naama Bay is the old centre, built in the 1980s, and is now somewhat faded. The newer development is at Nabq and Sharks Bay. The town is entirely oriented towards visitors and there is very little Egypt in it.'
  ],
  see: [
    { n: 'Diving Ras Mohammed',
      d: 'Twenty minutes by boat. Shark and Yolanda Reef is the dive and it is among the best anywhere.' },
    { n: 'The Thistlegorm',
      d: 'A long day trip or an overnight. A 1941 wreck with its cargo intact at thirty metres.' },
    { n: 'The Straits of Tiran',
      d: 'Four reefs with current, named for nineteenth-century cartographers, with a wrecked freighter aground on Gordon Reef.' },
    { n: 'Snorkelling at Shark’s Bay or the Marsa',
      d: 'Shore access to reef within a few metres of the beach, which is unusual for a resort coast.' },
    { n: 'The Old Market',
      d: 'In Sharm el-Maya, which is the only part of town with any Egyptian character, with a fish market and local restaurants.' },
    { n: 'Liveaboards',
      d: 'Week-long boats north to Tiran and the Thistlegorm or south to the Brothers and Daedalus, which is the serious way to dive here.' }
  ],
  when: 'Year round. Summer on land is above forty degrees. Winter water is around twenty-two and needs a suit.',
  stay: 'A week if diving.',
  move: 'Sharm airport with charter flights from Europe. Check current travel advice for Sinai; the coast and the airport are treated differently from the interior.',
  eat: 'Resort food, largely. The Old Market has Egyptian places and the fish is good.'
},

'SSI-tiran': {
  intro: [
    'The Straits of Tiran are the entrance to the Gulf of Aqaba, about six kilometres wide between the Sinai and the island of Tiran, with a shallow sill across them that forces all the water through two narrow channels. That constriction makes the current, and the current makes the diving.',
    'Four reefs lie in a line across the strait, named after the British hydrographers who charted them in the nineteenth century: Jackson, Woodhouse, Thomas and Gordon. Each is a steep-sided pinnacle rising from deep water with coral on the walls and pelagic fish on the exposed sides.',
    'Gordon Reef has the Loullia aground on it, a Cypriot freighter that hit it in 1981 and is still sitting there rusting above water, which is a permanent reminder of why the strait has a reputation. Several other ships are on the seabed nearby.'
  ],
  see: [
    { n: 'Jackson Reef',
      d: 'The northernmost and usually the best: a wall with hard coral, often sharks on the northern plateau, and strong current. Advanced divers.' },
    { n: 'Thomas Reef',
      d: 'The smallest, with a canyon on the south side at about thirty metres and dense soft coral. Current can be severe.' },
    { n: 'Gordon Reef and the Loullia',
      d: 'The wreck above water, a sandy plateau with garden eels, and often white-tip reef sharks resting on the bottom.' },
    { n: 'Woodhouse Reef',
      d: 'A long drift along a wall, which is usually dived in one direction with the current and cannot be turned around in.' },
    { n: 'Snorkelling',
      d: 'Boats stop at the sheltered sides and the top of the reefs is shallow enough for snorkellers, who see a great deal.' },
    { n: 'The politics',
      d: 'Tiran and Sanafir islands were transferred from Egyptian to Saudi administration in 2017, which was legally and politically contested in Egypt.' }
  ],
  when: 'Year round. Current is less severe on neap tides and the boats plan around it.',
  stay: 'A day trip, usually two or three dives.',
  move: 'Boat from Sharm el-Sheikh, about an hour.',
  eat: 'Lunch on the boat between dives.'
},

'SSI-coloured-canyon': {
  intro: [
    'The Coloured Canyon is a narrow sandstone slot near Nuweiba, about eight hundred metres long and up to forty metres deep, with walls in places only a couple of metres apart. The colours in the rock come from iron and manganese oxides laid down in bands and then exposed by water cutting through.',
    'There is no permanent water. It is a dry wadi that flows only during the rare flash floods, which is what cut it and which is also the one serious hazard: these canyons fill fast and there have been fatalities, so trips do not run when there is rain anywhere in the catchment.',
    'It is almost always done as a half-day from Dahab or Nuweiba with a Bedouin guide, with a 4x4 to the rim and a walk down into the canyon. The walking is easy with a couple of short scrambles.'
  ],
  see: [
    { n: 'The canyon walk',
      d: 'About an hour and a half through the slot. Easy going with two or three places where you climb down a metre or so.' },
    { n: 'The colours',
      d: 'Red, yellow, purple and white in bands, strongest in the middle section where the walls are closest and the light bounces.' },
    { n: 'The White Canyon',
      d: 'Nearby and often combined, narrower and paler, with a steeper descent.' },
    { n: 'Bedouin lunch',
      d: 'Usually included: bread baked in the sand, salad and tea, under a shelter at the end of the walk.' },
    { n: 'Ain Khudra',
      d: 'An oasis in the desert nearby with palms and a well, often part of the same trip.' },
    { n: 'The flash flood rule',
      d: 'Trips are cancelled when rain is forecast anywhere upstream. If an operator does not mention this, use a different one.' }
  ],
  when: 'October to April. Mornings. Summer in the canyon is extremely hot even in shade.',
  stay: 'Half a day.',
  move: '4x4 from Dahab or Nuweiba with a guide. Not accessible independently.',
  eat: 'Bedouin lunch included in most trips.'
},

'SSI-nuweiba': {
  intro: [
    'Nuweiba is on the Gulf of Aqaba with Saudi Arabia visible across the water and the mountains of Sinai directly behind. It was a significant backpacker destination in the 1980s and 1990s and then almost everything stopped, after a bombing in 2004 and the general decline in Sinai tourism.',
    'What is left is a strip of beach camps: palm-frond huts on the sand with a mattress and a mosquito net, run mostly by Bedouin families, with cushions and low tables at the water’s edge. They cost very little and they are the main reason to come.',
    'There is a ferry from here to Aqaba in Jordan, which is the practical route for anyone continuing to Petra and Wadi Rum. The crossing takes between one and three hours depending on the boat and the schedule is unreliable.'
  ],
  see: [
    { n: 'The beach camps',
      d: 'Between Nuweiba and Taba, particularly around Ras Shaitan and Basata. Simple, quiet and the economics are such that a week costs very little.' },
    { n: 'Snorkelling',
      d: 'Fringing reef straight off several of the camps, in good condition because so few people have been in it.' },
    { n: 'The Jordan ferry',
      d: 'From the port to Aqaba. Buy the ticket at the port on the day; the schedule changes and the fast boat does not always run.' },
    { n: 'Bedouin desert trips',
      d: 'Into the interior from the camps: Ain Khudra, the Coloured Canyon and overnight camps under the stars.' },
    { n: 'The view',
      d: 'Saudi Arabia across the gulf, lit at night, and the mountains behind turning red at sunset.' },
    { n: 'The quiet',
      d: 'This is the emptiest developed coast in Egypt and the reason people stay for weeks.' }
  ],
  when: 'October to April. Check current travel advice for Sinai, which varies between the coast and the interior.',
  stay: 'A week.',
  move: 'An hour from Dahab, two and a half from Sharm. Buses run up the coast.',
  eat: 'Fish and simple Bedouin food at the camps, usually one option a night.'
},

'SSI-taba': {
  intro: [
    'Taba is the Israeli border crossing and it was the last piece of Sinai returned to Egypt. The 1979 peace treaty was implemented in 1982 but a dispute remained over a few hundred metres at Taba, which went to international arbitration and was finally settled in Egypt’s favour in 1989.',
    'Three hundred metres offshore is Pharaoh’s Island, a small rock with a fortress on it. The Crusaders fortified it in 1116 to control the pilgrim and trade route and to levy tolls; Saladin took it in 1170 and rebuilt it, and it was abandoned not long after.',
    'The setting is the point. From the fortress walls you can see four countries at once: Egypt, Israel, Jordan and Saudi Arabia, across a gulf twenty kilometres wide with mountains on both sides.'
  ],
  see: [
    { n: 'Pharaoh’s Island',
      d: 'A short boat ride from the shore. Crusader and Ayyubid walls, towers, a cistern and a small harbour. Tickets include the boat.' },
    { n: 'The four-country view',
      d: 'From the fortress or from the hotel terraces on the mainland. Clearest in the early morning.' },
    { n: 'Snorkelling',
      d: 'Reef around the island, which is in good condition and gets very little traffic.' },
    { n: 'The border crossing',
      d: 'Open to Eilat, which is a short walk on the Israeli side. Note that an Israeli stamp or a Taba-only Sinai entry affects onward travel options.' },
    { n: 'Taba Heights',
      d: 'A resort development twenty kilometres south with a marina and a golf course, which is where most of the accommodation is.' },
    { n: 'Salah El Din',
      d: 'The Arabic name for the island, and the version used locally.' }
  ],
  when: 'October to April. Check Sinai travel advice.',
  stay: 'A night, or a stop on the way to or from Israel.',
  move: 'Taba airport, or the border crossing from Eilat. Three hours from Sharm by road.',
  eat: 'Hotel food. There is very little else.'
},

'WDS-siwa': {
  intro: [
    'Siwa is a depression in the Western Desert about fifty kilometres from the Libyan border and five hundred and sixty from the nearest city, with a population of around thirty thousand. It was effectively unreachable until a tarmac road was built in the 1980s and it remains the most culturally distinct place in Egypt.',
    'The people are Berber and speak Siwi, an eastern Berber language, as a first language. The social organisation, the architecture, the dress and the music are all different from the Nile valley, and the oasis was substantially self-governing into the twentieth century.',
    'Alexander came here in 332 BC to consult the oracle of Amun, and whatever the priest told him, he left behaving like a god. The temple is still standing at Aghurmi. Shali, the mud-and-salt fortress town in the middle of the oasis, was abandoned after three days of rain in 1926 dissolved it, and the ruins are the centrepiece of the town.'
  ],
  see: [
    { n: 'Shali',
      d: 'The ruined fortress town of karshif, mud mixed with salt rock, which is immensely strong until it rains. Partly restored, climbable and lit at night.' },
    { n: 'The Temple of the Oracle',
      d: 'At Aghurmi, where Alexander came. Partly ruined, on a rock, with the oracle chamber still identifiable.' },
    { n: 'Cleopatra’s Bath',
      d: 'A stone-lined spring pool bubbling with gas, open and free, which is where people swim. Women should expect to swim covered.' },
    { n: 'The salt lakes',
      d: 'Several, with water so saline that you float like the Dead Sea. The ones near Bir Wahed are the clearest, an unnatural blue against white salt.' },
    { n: 'The Great Sand Sea',
      d: 'Starting at the edge of the oasis, with dune safaris, sandboarding and a hot spring in the middle of the dunes at Bir Wahed.' },
    { n: 'Gebel al-Mawta',
      d: 'The mountain of the dead, a hill honeycombed with Ptolemaic rock tombs, several with painted interiors.' }
  ],
  when: 'October to April. Summer is above forty. Winter nights in the desert drop close to freezing.',
  stay: 'Three nights minimum given the journey.',
  move: 'An eight to ten hour drive or overnight bus from Cairo, or four hours from Marsa Matruh. There is no airport.',
  eat: 'Dates and olives, which are the oasis economy. Siwi bread baked in sand, and tagines in the eco-lodges, several of which are built of karshif and have no electricity.'
},

'WDS-white-desert': {
  intro: [
    'The White Desert is a plateau of chalk that was the floor of a shallow sea in the Cretaceous. Wind carrying sand has eroded the softer chalk away and left the harder lumps standing, which over a long time has produced a field of white formations rising out of a white plain: mushrooms, towers, cones, and shapes that get given names.',
    'It was made a national park in 2002 and the whole area runs from south of Farafra towards Bahariya, with the strangest concentration around the entrance to the park.',
    'The reason to come is to camp. Guides drive you in, set up a windbreak, cook over a fire, and you sleep on a mat in the open. At sunset the chalk goes orange and then pink; after dark, with no moon, the Milky Way is bright enough to cast a shadow and the white formations glow. Desert foxes come into camp looking for scraps.'
  ],
  see: [
    { n: 'Camping overnight',
      d: 'The entire point. Day trips exist and miss the two hours that matter. Take a warm layer; desert nights in winter are close to freezing.' },
    { n: 'The Mushroom and the Chicken',
      d: 'The two most-photographed formations, standing together near the main camping area.' },
    { n: 'Sunset and sunrise',
      d: 'The chalk takes colour from the low sun and changes through orange, pink and grey. Both ends of the day are worth getting up for.' },
    { n: 'The night sky',
      d: 'Among the darkest skies on earth. No light pollution within hundreds of kilometres in any direction.' },
    { n: 'The desert foxes',
      d: 'Fennec and Rüppell’s foxes come into camps at night. Guides discourage feeding and it happens anyway.' },
    { n: 'The old White Desert',
      d: 'A quieter area further north with equally good formations and fewer camps, which a good guide will take you to.' }
  ],
  when: 'October to April. Summer is dangerous. Avoid a full moon if you came for the stars.',
  stay: 'One or two nights.',
  move: 'A 4x4 with a licensed guide from Bahariya or Farafra. Independent driving is not permitted in the park.',
  eat: 'Cooked over a fire by the guides: chicken, vegetables, rice and bread baked in the sand. Better than it sounds.'
},

'WDS-black-desert': {
  intro: [
    'Between Bahariya and the White Desert the landscape changes completely. Volcanic activity in the Jurassic pushed dolerite up through the sandstone, and the hills that resulted have weathered so that their caps have broken down into a layer of black gravel spread over orange sand.',
    'The result looks like slag heaps in a desert, or like someone has sprinkled coal dust over a hundred kilometres of hills. It is a different kind of strange from the White Desert and the two are forty kilometres apart, which is the main reason they are usually visited in the same trip.',
    'The English Mountain, Gebel al-Ingliz, is the one you climb. A British officer built a lookout on top during the First World War to watch for Senussi raiders coming from Libya, and the stone hut is still there.'
  ],
  see: [
    { n: 'Gebel al-Ingliz',
      d: 'A fifteen-minute climb to the lookout hut, with the whole black field laid out and the Bahariya oasis green in the distance.' },
    { n: 'The black cones',
      d: 'Drive among them and stop. The contrast between the orange sand and the black gravel is the thing, and it is strongest in low sun.' },
    { n: 'Crystal Mountain',
      d: 'Twenty minutes further towards Farafra, a ridge of calcite with a natural arch.' },
    { n: 'The Valley of Agabat',
      d: 'Between the black and white deserts, a basin with eroded white outcrops rising out of orange sand dunes, which many people think is the best landscape of the lot.' },
    { n: 'The sequence',
      d: 'Black Desert, Crystal Mountain, Agabat, White Desert in one drive, which is the standard route and works.' },
    { n: 'The hot springs',
      d: 'Several around Bahariya, including Bir al-Ghaba, which is where trips stop on the way back.' }
  ],
  when: 'October to April. Usually part of a White Desert trip.',
  stay: 'Two hours as part of a longer day.',
  move: '4x4 with a guide from Bahariya.',
  eat: 'Nothing. It is part of a longer trip with food arranged.'
},

'WDS-bahariya': {
  intro: [
    'Bahariya is the closest oasis to Cairo, about three hundred and sixty kilometres southwest, in a depression of around two thousand square kilometres with perhaps thirty thousand people in a scatter of villages. Bawiti is the main one.',
    'In 1996 a donkey put its leg through the ground near the Temple of Alexander and what it fell into was a Graeco-Roman cemetery. The excavations since have produced several hundred mummies, many with gilded masks and painted cartonnage, in what was named the Valley of the Golden Mummies. Estimates of the total run to ten thousand.',
    'It is also the staging point for the White Desert. Almost everyone who goes there comes through Bawiti, hires a guide and a 4x4, and comes back the next day, which gives the oasis a small and functional tourist economy.'
  ],
  see: [
    { n: 'The Golden Mummies',
      d: 'A selection displayed in a small museum in Bawiti. Modest in presentation and remarkable in content.' },
    { n: 'The tombs of Bannentiu and Zed-Amun-ef-ankh',
      d: 'Twenty-sixth Dynasty rock tombs with painted chambers, reached by ladder down a shaft, with strong colour.' },
    { n: 'The Temple of Alexander',
      d: 'The only temple in Egypt bearing Alexander’s cartouche, which is taken as evidence he passed through on the way to or from Siwa. Ruined and significant.' },
    { n: 'Gebel al-Dist',
      d: 'A pyramid-shaped hill where the dinosaur Paralititan was found in 2000, one of the largest sauropods known.' },
    { n: 'The hot springs',
      d: 'Bir al-Ghaba and Bir Sigam, the latter at about forty-five degrees, used at night.' },
    { n: 'The salt lake',
      d: 'North of Bawiti, with a strong smell and a strange beauty, and almost no visitors.' }
  ],
  when: 'October to April.',
  stay: 'A night, usually as a staging post.',
  move: 'Four to five hours from Cairo by road, with buses daily. Most people arrange the desert trip from a Bawiti hotel.',
  eat: 'Oasis food: dates, olives, chicken and rice. The lodges cook for guests.'
},

'WDS-farafra': {
  intro: [
    'Farafra is the smallest and most isolated of the oases, with around five thousand people, almost all of them from one or two extended families. It is two hundred kilometres from Bahariya in one direction and three hundred from Dakhla in the other, with nothing in between.',
    'The village is mud brick and palm, with a few painted buildings and a hot spring at Bir Sitta. There is very little to do, which is the appeal for the small number of people who come for the quiet rather than as a stop on the White Desert run.',
    'Badr’s Museum is the one specific thing. Badr Abdel Moghny is a local artist who built a mud-brick house and filled it with sculpture, paintings and assemblages made from desert materials, over decades. It is entirely idiosyncratic and it is the best reason to stop.'
  ],
  see: [
    { n: 'Badr’s Museum',
      d: 'A mud-brick building of his own construction full of his own work: figures, reliefs and paintings of oasis life. He is often there.' },
    { n: 'Bir Sitta',
      d: 'A hot spring in the desert outside the village, used at night, with no facilities.' },
    { n: 'The White Desert',
      d: 'The park entrance is forty-five kilometres north and Farafra is the southern base for it.' },
    { n: 'The old village',
      d: 'Mud-brick lanes behind the main road, with painted doors and a few buildings in the traditional style.' },
    { n: 'The olive and date groves',
      d: 'Irrigated from deep wells, which is the economy.' },
    { n: 'The emptiness',
      d: 'The drive in either direction is three hours of absolutely nothing, which is itself part of the experience.' }
  ],
  when: 'October to April.',
  stay: 'A night.',
  move: 'Bus from Cairo via Bahariya, or a car. Six to eight hours from Cairo.',
  eat: 'Two or three simple places. The lodges cook.'
},

'WDS-dakhla': {
  intro: [
    'Dakhla is a chain of fourteen villages strung along the foot of a pink and orange escarpment, with about eighty thousand people, date palms and rice fields fed by artesian wells. It is the most agricultural and the most settled-feeling of the oases.',
    'Al-Qasr is the reason to come. It is an Ottoman-period mud-brick town built on a Roman foundation, with lanes roofed over to keep the sun out, carved acacia lintels over the doors inscribed with the builder’s name and the date, a twelfth-century minaret, a working pottery and an olive press. Most of it is uninhabited and some is being restored.',
    'Walking through it in the middle of the day you go from blinding sun into near-dark roofed passages that are ten degrees cooler, which is the whole logic of desert architecture made physical.'
  ],
  see: [
    { n: 'Al-Qasr',
      d: 'The roofed lanes, the carved lintels, the madrasa and the pottery. A guide is useful because the layout is confusing and several houses are open.' },
    { n: 'Deir al-Hagar',
      d: 'A Roman temple of sandstone with the cartouches of Nero, Vespasian, Titus and Domitian, restored in the 1990s, standing alone in the sand.' },
    { n: 'Al-Muzawaka',
      d: 'Rock tombs with painted ceilings, including two with strong colour, and mummies visible in some chambers.' },
    { n: 'Balat',
      d: 'Another Ottoman village with roofed lanes, less restored and still fully inhabited.' },
    { n: 'The hot springs',
      d: 'Several, including Mut Talata and Bir al-Gebel, used at night under the stars.' },
    { n: 'The escarpment',
      d: 'The pink cliff running along the northern edge of the depression, which is best in late afternoon.' }
  ],
  when: 'October to April.',
  stay: 'Two nights.',
  move: 'Ten hours from Cairo by bus or car, or five from Luxor via Kharga. There is an airstrip with occasional flights.',
  eat: 'Oasis food and very good dates. The lodges around Al-Qasr do mud-oven bread and tagines.'
},

'WDS-kharga': {
  intro: [
    'Kharga is the largest and most modernised of the oases, with a planned town built in the 1960s as part of the New Valley project, which aimed to resettle Nile valley farmers into the desert using deep well irrigation. It worked less well than hoped and the town has a slightly unfinished institutional feel.',
    'What Kharga has that the others do not is a concentration of Persian and Christian remains. The Temple of Hibis is the only substantially complete Persian-period temple in Egypt, built under Darius I around 500 BC, with reliefs showing the Persian king as pharaoh.',
    'Al-Bagawat is a Christian necropolis of around two hundred and sixty mud-brick chapels from the third to the seventh century, several with painted interiors showing Old Testament scenes. It is one of the oldest Christian cemeteries anywhere and it is almost entirely unvisited.'
  ],
  see: [
    { n: 'Al-Bagawat',
      d: 'The Chapel of Peace and the Chapel of the Exodus, the latter with a painted dome showing the Israelites leaving Egypt, pursued by Pharaoh. Fourth or fifth century and extraordinary.' },
    { n: 'Temple of Hibis',
      d: 'Persian, restored over many years after groundwater damage, with Darius shown making offerings in full pharaonic style.' },
    { n: 'Qasr al-Ghueita',
      d: 'A mud-brick fortress on a hill with a temple inside it, overlooking a depression that was a wine-producing area in antiquity.' },
    { n: 'Qasr al-Labeka',
      d: 'A Roman fort with underground aqueducts, reached across the desert.' },
    { n: 'The Darb al-Arbain',
      d: 'The forty days road, the caravan route from Darfur to Egypt along which slaves and goods came north for centuries, which passed through Kharga.' },
    { n: 'The New Valley Museum',
      d: 'In Kharga town, holding material from across the oases.' }
  ],
  when: 'October to April.',
  stay: 'A night.',
  move: 'Three hours from Dakhla, five from Luxor, or a long drive from Asyut. There are occasional flights.',
  eat: 'Simple local food in the town. Little aimed at visitors.'
},

'WDS-crystal-mountain': {
  intro: [
    'Crystal Mountain is a ridge of calcite crystal on the road between Bahariya and Farafra, with a natural arch through it formed where a vein of the mineral was exposed and then weathered. The crystals are barite and calcite, formed in a hydrothermal vein, and the ground around is scattered with fragments.',
    'It is small. The whole thing is perhaps fifty metres across and most people are there for fifteen minutes, which is why it is almost never a destination in itself and is always a stop on the way somewhere else.',
    'The crystals catch the low sun and the whole ridge glitters, which is the reason guides time the stop for late afternoon on the way south. Taking pieces away is discouraged and it visibly happens, which is why the ground has been picked over near the arch.'
  ],
  see: [
    { n: 'The arch',
      d: 'Walk through it. The crystal is visible in the rock faces on either side.' },
    { n: 'Late afternoon light',
      d: 'When the crystals catch the sun. Guides on the Bahariya to Farafra run usually time it for this.' },
    { n: 'The scatter',
      d: 'Fragments across the ground around the ridge, which look better in situ than in a pocket.' },
    { n: 'The Valley of Agabat',
      d: 'A few minutes further south, a basin of white chalk outcrops in orange dune sand, which is the better stop.' },
    { n: 'The Black Desert',
      d: 'Twenty minutes north.' },
    { n: 'The road',
      d: 'This stretch between Bahariya and Farafra passes through four distinct landscapes in a hundred and eighty kilometres, which is the real attraction.' }
  ],
  when: 'October to April, late afternoon.',
  stay: 'Fifteen minutes.',
  move: 'On the Bahariya to Farafra road, as part of a desert trip.',
  eat: 'Nothing.'
},

'WDS-gilf-kebir': {
  intro: [
    'The Gilf Kebir is a sandstone plateau roughly the size of Switzerland in the far southwest corner of Egypt, on the Libyan and Sudanese borders, rising about three hundred metres above the surrounding desert. It is the most remote place in the country by a wide margin.',
    'In 1933 a Hungarian aristocrat named László Almásy found a cave in Wadi Sura with paintings of human figures that appear to be swimming, made around eight thousand years ago when the Sahara was green. The Cave of Swimmers became famous through The English Patient, which fictionalised Almásy considerably. A second and better cave, Wadi Sura II, was found in 2002 with over five thousand figures.',
    'Getting there is an expedition: a convoy of 4x4s carrying all fuel, water and food for a week or more, with permits from the military and a licensed operator. There is no settlement, no fuel and no phone signal for six hundred kilometres.'
  ],
  see: [
    { n: 'The Cave of Swimmers',
      d: 'Small, with figures in a posture read as swimming, which is evidence of standing water in the Sahara in the Holocene. Badly damaged by visitors before access was controlled.' },
    { n: 'Wadi Sura II',
      d: 'Found in 2002 and far richer: thousands of figures, handprints and a headless beast swallowing people. The most important rock art site in Egypt.' },
    { n: 'Silica glass',
      d: 'In the Great Sand Sea to the north, a natural yellow-green glass formed by an impact or airburst around twenty-nine million years ago. A piece of it is set in a Tutankhamun pectoral.' },
    { n: 'The plateau wadis',
      d: 'Wadi Hamra, Wadi Abd el-Malik and others, cut into the sandstone, with acacia and evidence of Neolithic occupation.' },
    { n: 'The Great Sand Sea',
      d: 'Crossed on the way, with dunes running for hundreds of kilometres in parallel lines.' },
    { n: 'The permits',
      d: 'Military permission, a licensed operator and a convoy are all mandatory. Arrange months ahead; this is not a trip that can be booked on arrival.' }
  ],
  when: 'November to February only. Any other time is dangerous.',
  stay: 'Ten days to two weeks.',
  move: 'An organised expedition from Cairo or Dakhla. Several specialist operators run two or three trips a season.',
  eat: 'Everything carried. Water is the limiting factor on trip length.'
},

'DLT-wadi-natrun': {
  intro: [
    'Christian monasticism began in the Egyptian desert. In the late third century Antony went into the Eastern Desert to live alone, and within a few decades thousands of men had followed the idea into the wastes west of the Delta, which is how the monastic rule, the habit and the whole institution came into being.',
    'Wadi El Natrun was one of the main centres, with as many as fifty monasteries at its height and several thousand monks. Four survive and all four are working communities: Deir Anba Bishoy, Deir al-Suryani, Deir al-Baramus and Deir Abu Maqar.',
    'They were repeatedly raided by Berbers and later Bedouin, which is why each is a walled compound with a keep in the middle: a tower reached by a drawbridge where the community retreated with the relics and the manuscripts. The keeps are still standing and several can be climbed.'
  ],
  see: [
    { n: 'Deir al-Suryani',
      d: 'With wall paintings uncovered under plaster since the 1990s, a door of ebony and ivory panels from 914, and a tamarind tree said to have grown from the staff of Saint Ephrem.' },
    { n: 'Deir Anba Bishoy',
      d: 'The most visited, with the body of Saint Bishoy, who is said to be incorrupt, and a large modern pilgrimage traffic.' },
    { n: 'The keeps',
      d: 'Square towers with a drawbridge at first-floor level, a well and a chapel inside, built so a community could survive a siege.' },
    { n: 'Deir al-Baramus',
      d: 'The oldest foundation, from the 330s, the quietest of the four and the most welcoming to visitors who want to sit.' },
    { n: 'The natron lakes',
      d: 'Which gave the valley its name. Natron was used in mummification and was quarried here for millennia.' },
    { n: 'The etiquette',
      d: 'These are working monasteries. Dress covered, ask before photographing, and expect to be offered tea. Some areas are closed to women.' }
  ],
  when: 'Year round. Avoid the fasting periods if you want the churches open without crowds; Coptic feasts fill them.',
  stay: 'Half a day.',
  move: 'A car from Cairo, about ninety minutes on the desert road to Alexandria. Monasteries are several kilometres apart.',
  eat: 'Some monasteries sell bread, dates and honey they produce. There is little else.'
},

'DLT-rosetta': {
  intro: [
    'In July 1799 a French officer repairing a fort here found a granodiorite slab built into a wall, carrying the same decree in hieroglyphic, demotic and Greek. The Greek could be read, which meant the Egyptian could be worked out, and Champollion announced the decipherment in 1822. It is the single most consequential object in the history of archaeology.',
    'The stone itself went to the British after the French capitulation in 1801 and has been in the British Museum since. There is a replica in Rashid and the question of its return comes up regularly.',
    'The town, which Egyptians call Rashid, has about twenty-two Ottoman merchant houses from the seventeenth and eighteenth centuries, built in alternating courses of black and red brick with projecting wooden mashrabiya. It was a major port before Alexandria revived in the nineteenth century, and then it stopped.'
  ],
  see: [
    { n: 'The Ottoman houses',
      d: 'Several are open, including Beit Kili and the Arab Kili house, with wooden ceilings, tiled rooms and mashrabiya. The best domestic Ottoman architecture in Egypt outside Cairo.' },
    { n: 'Fort Julien',
      d: 'Where the stone was found, at the river mouth a few kilometres out, with a replica in place and a view over the Nile meeting the Mediterranean.' },
    { n: 'The Rashid Museum',
      d: 'In a restored Ottoman house, covering the town’s trading history and the stone.' },
    { n: 'The mills and the hammam',
      d: 'Several restored, including a rice mill and an Ottoman bathhouse.' },
    { n: 'The Nile mouth',
      d: 'The Rosetta branch meeting the sea, with a visible line where the water changes colour.' },
    { n: 'The quiet',
      d: 'Almost nobody visits, which for the town that gave its name to the key to hieroglyphs is remarkable.' }
  ],
  when: 'Spring and autumn. The Delta is humid in summer.',
  stay: 'Half a day.',
  move: 'A car from Alexandria, about ninety minutes.',
  eat: 'Local fish at the river mouth, and the Delta’s rice.'
},

'DLT-tanis': {
  intro: [
    'Tanis was the capital of Egypt during the Twenty-first and Twenty-second Dynasties, from about 1070 BC, when the Delta mattered more than Thebes. The site is a field of fallen granite: obelisks, colossi and architraves lying where they dropped, much of it reused from older cities and brought here.',
    'In 1939 a French archaeologist named Pierre Montet found intact royal tombs under the temple enclosure: Psusennes I in a silver coffin inside a granite sarcophagus, with a gold mask, plus Amenemope and Shoshenq II. It was the only discovery of undisturbed royal burials since Tutankhamun.',
    'Almost nobody noticed. The find was announced in the spring of 1939 and Europe went to war that September. The material is in the Cairo museum, the silver coffin is extraordinary, and Tanis remains one of the least visited major sites in Egypt.'
  ],
  see: [
    { n: 'The fallen obelisks',
      d: 'A field of granite, much of it carrying Ramesses II’s name, lying broken across the enclosure. The scale and the chaos are the impression.' },
    { n: 'The royal tombs',
      d: 'Chambers under the temple precinct, several open, built of reused blocks. Empty now but you can go down into them.' },
    { n: 'The sacred lake',
      d: 'A stone-lined basin in the enclosure, still holding water.' },
    { n: 'The Montet find',
      d: 'Worth reading about first. The silver coffin of Psusennes and the gold mask are in Cairo and the story of the timing is the reason you have not heard of it.' },
    { n: 'The Indiana Jones connection',
      d: 'Raiders of the Lost Ark places the Well of Souls at Tanis and has it buried by a sandstorm. It was not, and it is in the Delta rather than the desert.' },
    { n: 'The emptiness',
      d: 'A major capital with no visitors and no facilities. Take water and a guide who knows where the tombs are.' }
  ],
  when: 'October to April. The Delta is humid and the site is exposed.',
  stay: 'Two hours.',
  move: 'A car from Cairo, about two hours northeast to San al-Hagar.',
  eat: 'Nothing. Zagazig has places.'
},

'DLT-tanta': {
  intro: [
    'Ahmad al-Badawi was a Sufi from Fez who settled in Tanta in the thirteenth century and became the most popular saint in Egypt. His mosque is in the middle of the city and the moulid held for him each October is the largest religious festival in the country, drawing somewhere between one and three million people over a week.',
    'A moulid is a saint’s birthday celebration and it combines a pilgrimage with a fairground. There are processions of Sufi orders with banners, all-night zikr where participants chant and sway for hours, sweets sold by the sack, rides, circumcisions performed in tents, and an enormous amount of noise.',
    'It is not a tourist event and there is no provision for visitors. Egyptians attend in vast numbers. Conservative religious opinion in Egypt disapproves of moulids as un-Islamic innovation and there is a long-running argument about them, which has not reduced the crowds.'
  ],
  see: [
    { n: 'The moulid of Sayyid al-Badawi', t: 'October, the week after the cotton harvest',
      d: 'Eight days, peaking on the final night. The crowds are extreme and the atmosphere is unlike anything else in Egypt.' },
    { n: 'The zikr',
      d: 'Circles of men chanting the names of God for hours, moving rhythmically, in tents and in the street. Watching is accepted; photographing is not always welcome.' },
    { n: 'The Sufi orders',
      d: 'Each arrives in procession with its own banners, drums and colours, and sets up its own tent for the week.' },
    { n: 'The mosque',
      d: 'Open year round, with the tomb, and busy on Fridays. A far calmer visit outside the moulid.' },
    { n: 'Hummus al-Sham',
      d: 'Tanta is known across Egypt for its chickpea sweets and its halawa, sold in blocks from stalls around the mosque.' },
    { n: 'Going with someone',
      d: 'A local contact makes the difference. This is a crowd event with no infrastructure for outsiders.' }
  ],
  when: 'October for the moulid, which falls after the cotton harvest and shifts year to year. Any other time it is an ordinary Delta city.',
  stay: 'A day, or the final two nights of the moulid.',
  move: 'Train from Cairo or Alexandria, about an hour from either. Tanta is the main Delta junction.',
  eat: 'Sweets, and Delta food generally. Nothing aimed at visitors.'
},

'MTR-marsa-matruh': {
  intro: [
    'Marsa Matruh sits on a lagoon enclosed by a rock bar, which breaks the swell and leaves water of a colour that is genuinely startling the first time: pale turquoise over white sand, more Aegean than African.',
    'It was a Greek and then Roman port called Paraetonium, and Antony and Cleopatra are supposed to have spent time here before Actium, which is why a rock pool outside the town is called Cleopatra’s Bath. The attribution is traditional rather than evidenced.',
    'Rommel used a cave in the cliff west of the town as a headquarters during the desert campaign and it now holds a small museum of his maps and coat. The town itself is a domestic Egyptian resort which fills with families from the Delta in July and August and is almost empty the rest of the year.'
  ],
  see: [
    { n: 'Agiba Beach',
      d: 'Twenty-four kilometres west, down steps from a clifftop, with the best water on the Egyptian Mediterranean. The name means wonder.' },
    { n: 'Cleopatra’s Bath',
      d: 'A rock pool connected to the sea by a channel, with waves breaking into it. Swimming is dangerous in swell.' },
    { n: 'Rommel’s cave',
      d: 'A small museum in the cliff with his coat, maps and photographs, which is modest and strange.' },
    { n: 'The lagoon',
      d: 'Calm, shallow and warm, with the rock bar across the mouth, which is why the town is where it is.' },
    { n: 'The season',
      d: 'July and August are packed with Egyptian families; June and September are warm and nearly empty. Women should expect to swim covered on public beaches.' },
    { n: 'El Alamein',
      d: 'Ninety minutes east, which is the other reason to be on this coast.' }
  ],
  when: 'June and September. July and August are full. Winter is cold, windy and almost everything closes.',
  stay: 'Two nights.',
  move: 'Train or bus from Alexandria, about four hours. An airport with summer flights. Four hours to Siwa.',
  eat: 'Fish, and the Bedouin lamb from the desert behind the coast.'
},

'MTR-el-alamein': {
  intro: [
    'Between July and November 1942 two battles were fought on this stretch of desert that stopped the Axis advance into Egypt. The second, from 23 October, was the first large British victory of the war and Churchill said afterwards that before Alamein the Allies never had a victory and after it they never had a defeat.',
    'The ground was chosen because it is the one place where the front could not be outflanked: sixty-five kilometres between the Mediterranean and the Qattara Depression, a salt marsh too soft for armour. Both sides mined it heavily and the minefields are still being cleared; estimates run to seventeen million mines, which is among the densest concentrations on earth.',
    'There are three cemeteries. The Commonwealth cemetery holds over seven thousand graves and commemorates eleven thousand more with no known grave. The German ossuary is a sandstone fortress on a hill holding four thousand two hundred, and the Italian memorial is a tower with around five thousand.'
  ],
  see: [
    { n: 'The Commonwealth War Cemetery',
      d: 'Seven thousand three hundred and sixty-seven graves in rows with the Alamein Memorial behind. Immaculately kept and the scale is the effect.' },
    { n: 'The German memorial',
      d: 'At Tel el-Eisa, an octagonal sandstone building round a courtyard with the names in the walls, which was designed to look like a crusader fort.' },
    { n: 'The Italian memorial',
      d: 'A white tower further west, with a chapel and an inscription about a lack of fortune rather than courage.' },
    { n: 'The War Museum',
      d: 'In the town, with vehicles, uniforms and dioramas from all the participating armies, recently rebuilt.' },
    { n: 'The minefields',
      d: 'Still being cleared. Signs are not decorative; do not walk off the roads and tracks anywhere on this coast.' },
    { n: 'The 23 October commemoration',
      d: 'Annual, attended by veterans’ families and diplomats from several countries.' }
  ],
  when: 'October to April. 23 October for the commemoration.',
  stay: 'Half a day.',
  move: 'A car from Alexandria, about ninety minutes west on the coast road.',
  eat: 'Very little. Bring something or stop at Alexandria or Marsa Matruh.'
},

'SUZ-port-said': {
  intro: [
    'Port Said was founded in 1859 on a sandbar at the Mediterranean end of the canal, named for the ruling khedive, and for a century it was one of the great coaling and transit ports of the world, where ships bunkered and passengers went ashore for a few hours.',
    'That produced an architecture found nowhere else in Egypt: timber buildings with wooden verandas on three or four storeys, painted, with balconies running the full width, built by the canal company and the trading houses. A good many survive, in poor repair, along Sharia Palestine and the streets behind.',
    'The city was heavily damaged in 1956 during the Suez Crisis and again in 1967 and 1973, and it was evacuated entirely for several years. The statue of de Lesseps on the canal entrance was pulled down in 1956 and the empty plinth is still there.'
  ],
  see: [
    { n: 'The wooden buildings',
      d: 'Along Sharia Palestine facing the canal and inland from it. Verandas, shutters and peeling paint, which is a colonial port architecture that has almost vanished elsewhere.' },
    { n: 'The Suez Canal Authority building',
      d: 'Three green domes on the waterfront, built in 1895, which is the city’s landmark and is best seen from the ferry.' },
    { n: 'The free ferry to Port Fouad',
      d: 'Four minutes across the canal to Asia, running constantly and costing nothing. The best way to watch the ships.' },
    { n: 'The ships',
      d: 'Convoys pass several times a day. Sitting on the corniche watching a container ship go past at eye level above the street is the thing to do here.' },
    { n: 'The Military Museum',
      d: 'On the 1956 and 1973 wars, from the Egyptian perspective, which is worth the contrast with the British accounts.' },
    { n: 'The de Lesseps plinth',
      d: 'Empty since 1956, at the canal mouth. The statue survives in a yard in the city and its restoration is periodically proposed.' }
  ],
  when: 'Spring and autumn. Summer is humid.',
  stay: 'A night.',
  move: 'Train or bus from Cairo, about three hours.',
  eat: 'Fish, and Port Said is known across Egypt for a particular style of fried fish and for its mango.'
},

'SUZ-ismailia': {
  intro: [
    'Ismailia was built by the Suez Canal Company in 1862 as its own administrative town, halfway along the canal on the shore of Lake Timsah, and it was laid out on European garden-city lines: wide streets, gardens, villas with verandas and a European quarter separate from the Arab one.',
    'Ferdinand de Lesseps lived here in a bungalow that is still standing and which the family kept until the 1950s. The Swiss chalet style of several buildings and the eucalyptus planted along the streets give it a character unlike any other Egyptian city.',
    'It is also where the 1973 crossing was launched. On 6 October Egyptian forces crossed the canal and breached the Bar Lev sand wall using high-pressure water cannon, which is commemorated in a museum here and is the founding event of modern Egyptian military self-image.'
  ],
  see: [
    { n: 'The European quarter',
      d: 'Villas and gardens around Mohamed Ali Quay, with the canal company buildings and the eucalyptus avenues.' },
    { n: 'De Lesseps’ house',
      d: 'A bungalow with his furniture and his carriage, kept as it was, which is opened by arrangement.' },
    { n: 'The Ismailia Museum',
      d: 'Small, with a fourth-century Roman mosaic and material from the Pharaonic canal that connected the Nile to the Red Sea via the Wadi Tumilat.' },
    { n: 'Lake Timsah',
      d: 'Where ships wait for the convoy, with beaches on the shore that Cairo uses at weekends.' },
    { n: 'The October War Panorama',
      d: 'On the crossing of 1973, which is presented as a national epic and is worth seeing on those terms.' },
    { n: 'The canal itself',
      d: 'Ships passing a few hundred metres from the corniche. The new parallel channel opened in 2015 doubled the capacity on part of the route.' }
  ],
  when: 'Spring and autumn.',
  stay: 'A night.',
  move: 'Train or bus from Cairo, about two and a half hours.',
  eat: 'Fish from the lake, and the mango which this governorate grows and which Egyptians consider the best in the country.'
}
};

/* Look-up used by the place page. Returns null rather than
   throwing when a guide has not been written yet, so a new place
   renders with its blurb and its live panel and nothing else. */
function egGuide(id){
  return (typeof EG_GUIDE !== 'undefined' && EG_GUIDE[id]) ? EG_GUIDE[id] : null;
}

function egGuideCount(){
  return (typeof EG_GUIDE !== 'undefined') ? Object.keys(EG_GUIDE).length : 0;
}
