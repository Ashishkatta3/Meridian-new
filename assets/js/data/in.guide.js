/* ===========================================================
   INDIA — the written guide

   The blurb in in.places.js is one sentence, which is enough for a
   card and not enough for a page. This is the rest: what a place
   actually is, the specific things worth doing when you get there,
   and the four practical questions everybody asks.

     intro  two or three paragraphs on the place itself
     see    the things to do, each named and described, ordered the
            way you would actually do them rather than by fame
     when   which months, and why — which in this country means the
            monsoon more often than anything else
     stay   how long is honest rather than flattering
     move   how you get there and get around
     eat    what this specific place cooks that the next one does not

   Three standing facts shape nearly every entry and are not repeated
   in each one. The monsoon crosses the country between June and
   September and withdraws through October, so "the season" for most
   of India is roughly November to March. The northern plains have
   their worst air of the year in exactly those months. And distance
   on an Indian map is not a measure of time: a hundred kilometres
   can be ninety minutes on a new expressway or six hours on a hill
   road, and the train is usually better than either.

   No prices are quoted. Entry fees, permits and fares change faster
   than a file like this can be maintained, and a wrong number is
   worse than no number.

   A place with no entry here still renders: the page shows its
   blurb, its photograph, its live panel and its neighbours, and
   simply has no prose section. So this file can grow without
   anything waiting on it.
   =========================================================== */

const IN_GUIDE = {

/* ===================== UTTAR PRADESH ===================== */
'UTP-agra': {
  intro: [
    'The Taj Mahal is the most photographed building on earth and it survives the familiarity, which very few things do. What photographs do not carry is the scale — it is far larger than it looks in pictures — and the material. The marble is translucent to a depth of a few millimetres, so it takes the colour of whatever light is falling on it: pink before dawn, white at midday, gold at sunset, and a kind of blue-grey under a full moon.',
    'It was built by Shah Jahan for Mumtaz Mahal, who died in 1631 having her fourteenth child, and it took around twenty-two years. The symmetry is total except for one thing: Shah Jahan’s own cenotaph, added later by his son, sits off-centre beside hers. That asymmetry is the single most moving detail in the building, because it was not part of the plan.',
    'Agra itself is a hard city — crowded, hustling and not especially interested in you except as a customer. That is worth knowing in advance so it does not spoil the monuments, of which there are three of World Heritage rank within a few kilometres.'
  ],
  see: [
    { n: 'The Taj Mahal at sunrise', t: 'first entry',
      d: 'Be at the gate before it opens. The light in the first hour is the best of the day, the crowds are a fraction of what they will be by ten, and the marble goes through three distinct colours while you stand there. Closed on Fridays.' },
    { n: 'Agra Fort', t: 'half a day',
      d: 'A red sandstone fortress-palace that was the seat of Mughal power before Delhi. Shah Jahan spent his last eight years imprisoned here by his son Aurangzeb, in rooms with a view downriver to the tomb he had built. Go in the afternoon after the Taj.' },
    { n: 'Mehtab Bagh', t: 'sunset',
      d: 'The garden directly across the Yamuna, aligned with the Taj, from which you get the view with the river in it and no crowd at all. The most underrated hour in Agra.' },
    { n: 'Itmad-ud-Daulah', t: 'the baby Taj',
      d: 'A small tomb of 1628 covered in inlaid stone, finished before the Taj and the first Mughal building in white marble rather than sandstone. Quiet, intricate and frequently empty.' },
    { n: 'Fatehpur Sikri', t: 'a day trip',
      d: 'Forty kilometres west, and in a different league from most day trips. See its own entry.' }
  ],
  when: 'October to March. April to June is brutal on the plains, and the monsoon brings humidity rather than relief. December and January bring fog that can hide the building entirely until mid-morning and disrupt trains.',
  stay: 'One full day and two nights, arriving the evening before so you can be at the gate at opening. Two days if you are adding Fatehpur Sikri properly.',
  move: 'The Gatimaan and Shatabdi trains from Delhi take under two hours and are far better than the road. Within Agra, use the electric autos near the monuments — petrol vehicles are banned within a radius of the Taj.',
  eat: 'Agra is known for petha, a translucent ash-gourd sweet, which is an acquired taste. The Mughlai food is good but Lucknow does it better; eat well at your hotel and save your appetite.'
},

'UTP-varanasi': {
  intro: [
    'Varanasi is probably the oldest continuously inhabited city on earth, and it is where Hindus come to die. Dying here, or being cremated here, is believed to break the cycle of rebirth, so the city has an entire economy built around death — hospices for people waiting, wood merchants selling by the kilo, and two ghats where the fires have not gone out in living memory.',
    'That sounds grim and is not. The overwhelming impression is of life at an extraordinary density: eighty-eight ghats along a four-kilometre bend of the Ganges, with people bathing, washing clothes, doing yoga, playing cricket, giving massages, and burning their dead, all within a few hundred metres of each other and all entirely unselfconscious about it.',
    'It is also genuinely difficult. The lanes behind the ghats are too narrow for cars and barely wide enough for two people and a cow. You will get lost, repeatedly. Accept it early.'
  ],
  see: [
    { n: 'A boat at dawn', t: 'the thing to do first',
      d: 'Hire a rowing boat — not a motorboat — an hour before sunrise and go upstream along the ghats. The light comes up behind you over the sandbank on the far side, and the whole city is awake and in the water. Nothing else in India is quite like it.' },
    { n: 'Ganga Aarti at Dashashwamedh', t: 'every evening',
      d: 'A choreographed fire ceremony performed by young priests on platforms at the water’s edge, with bells, conches and a very large crowd. Watch from a boat on the river rather than the steps, where you will see nothing.' },
    { n: 'Manikarnika Ghat', t: 'with care',
      d: 'The main burning ghat, working around the clock. You may watch from a respectful distance; do not photograph, and refuse firmly anyone who offers to guide you upstairs for a donation, which is a long-running scam on grieving families and tourists alike.' },
    { n: 'The lanes of the old city',
      d: 'Between the ghats and Vishwanath Gali — silk shops, paan sellers, shrines every few metres, and the best lassi in India at a couple of famous holes in the wall. Go without a destination.' },
    { n: 'Sarnath', t: 'half a day',
      d: 'Ten kilometres out, where the Buddha preached his first sermon. A complete change of register — green, quiet, ordered — and a useful antidote after two days in the lanes.' }
  ],
  when: 'November to February is cool and clear, though January fog is common. Avoid May and June, when the plains hit forty-five degrees. The monsoon raises the river and can submerge the lower ghats entirely.',
  stay: 'Three nights. Two is enough to see it and not enough to stop feeling assaulted by it.',
  move: 'Fly or take an overnight train from Delhi. In the old city you walk, and everything else is a cycle rickshaw or an auto to the edge of the lanes. Do not attempt to drive.',
  eat: 'Strictly vegetarian in the old city, and very good: kachori sabzi for breakfast, chaat in the afternoon, and malaiyyo — a saffron milk foam — in winter only.'
},

/* ===================== RAJASTHAN ===================== */
'RAJ-jaipur': {
  intro: [
    'Jaipur was built from nothing in 1727 by Sawai Jai Singh II, an astronomer-king who laid it out on a nine-square grid taken from an ancient treatise on architecture, with streets of fixed widths and a wall around the whole thing. It was the first planned city in India and it still works — the old city remains legible in a way almost no other Indian city of its age is.',
    'The pink is more recent and more mundane: the city was painted terracotta in 1876 to welcome the Prince of Wales, and a municipal order has kept it that way ever since.',
    'What makes Jaipur a better first stop in Rajasthan than its rivals is that it does several things well rather than one thing superbly. There is a fort, a palace, an observatory, a serious craft economy and a food scene, all within half an hour of each other.'
  ],
  see: [
    { n: 'Amber Fort', t: 'go at opening',
      d: 'Eleven kilometres out, on a ridge above a lake, and the best single sight in the city. Walk up rather than taking an elephant — the animals work in heat that they should not. The mirrored Sheesh Mahal inside is the showpiece.' },
    { n: 'Jantar Mantar', t: 'an hour, with a guide',
      d: 'Jai Singh’s observatory: nineteen masonry instruments built to measure time, declination and the positions of the stars, including the largest stone sundial in the world, accurate to two seconds. Incomprehensible without a guide and remarkable with one.' },
    { n: 'The City Palace',
      d: 'Still partly the family’s home. The textile and armoury collections are excellent, and the four painted doorways in Pritam Niwas Chowk — one per season — are the most photographed corner in Jaipur for good reason.' },
    { n: 'Hawa Mahal', t: 'from the street',
      d: 'The honeycomb facade of nine hundred and fifty-three windows, built so royal women could watch processions unseen. It is one room deep and mostly a wall; see it from the café opposite at breakfast.' },
    { n: 'Block printing at Bagru or Sanganer',
      d: 'Working villages outside the city where hand block printing is still done with carved wooden blocks and natural dyes. A half-day workshop is the best souvenir Jaipur offers.' },
    { n: 'Chandpole and Johari bazaars',
      d: 'The old city markets, still organised by trade. Silver in one lane, marble idols in another, wedding brocade in a third.' }
  ],
  when: 'October to March. Diwali, usually October or November, is spectacular here — the whole walled city is lit and judged in a municipal competition. April to June is above forty degrees.',
  stay: 'Three nights. Two leaves you choosing between the fort and the old city.',
  move: 'Four to five hours from Delhi on the expressway, or a comfortable train. Autos and app cabs within the city; the old city is best walked.',
  eat: 'Rajasthani thali, which is sweeter and heavier than you expect, and dal baati churma. Laal maas is the local mutton curry and is genuinely fiery. The pyaaz kachori at the old sweet shops is the thing to eat standing up.'
},

'RAJ-udaipur': {
  intro: [
    'Udaipur was founded in 1559 after Chittorgarh fell, by a dynasty — the Sisodias of Mewar — that made a point of never submitting to the Mughals when every other Rajput house had. That refusal is the city’s founding posture and it still shapes how it talks about itself.',
    'The setting is the thing. Lake Pichola was dammed and enlarged to create it, and the City Palace runs for nearly a quarter of a mile along the eastern shore, growing by accretion over four hundred years as each maharana added to it. Two island palaces sit out on the water, one of which is now among the more famous hotels in the world.',
    'It is the most immediately beautiful city in Rajasthan and the most touristed per square metre. The old lanes around Jagdish Temple are essentially one continuous shop. Walk ten minutes further and that stops.'
  ],
  see: [
    { n: 'The City Palace', t: 'two to three hours',
      d: 'Enter from the main gate and work upward through courtyards that get smaller and more private as you climb, ending on terraces looking down on the lake. The mirror work, the peacock mosaics and the sheer accumulated layering are the point.' },
    { n: 'A boat on Lake Pichola', t: 'late afternoon',
      d: 'The standard trip goes past the Lake Palace and stops at Jag Mandir island. Go an hour before sunset — the light on the palace wall from the water is what people come to Udaipur for.' },
    { n: 'The Monsoon Palace', t: 'sunset',
      d: 'A hilltop shell above the city, built to watch the rains come in. The building is empty; the view over the lakes and the Aravallis is the reason to go.' },
    { n: 'Bagore ki Haveli',
      d: 'A restored merchant house on the water with a nightly folk dance and puppet show that is far better than the format suggests.' },
    { n: 'Saheliyon ki Bari',
      d: 'A garden of fountains built for the maids of honour of a royal bride, working entirely on gravity from the lake above.' },
    { n: 'Shilpgram and the craft villages',
      d: 'A rural arts complex outside town, and a useful introduction to Mewar’s miniature painting tradition, which you can then see done properly in the small studios in the old city.' }
  ],
  when: 'September to March. The weeks just after the monsoon are the best of the year — the lakes are full, which is not guaranteed in a dry year, and everything is green.',
  stay: 'Three nights. It is also the most pleasant base in Rajasthan for simply stopping for a while.',
  move: 'Fly in, or take the overnight train from Delhi. The old city is walkable; everything else is a short auto ride.',
  eat: 'Mewari food is milder than Marwari — gatte ki sabzi, dal baati, and a lot of cooking with asafoetida. The rooftop restaurants all have the same view and broadly the same menu; eat at the ones the locals use on the Hanuman Ghat side.'
},

'RAJ-jodhpur': {
  intro: [
    'Mehrangarh is the most intact fort in India and arguably the most dramatic. It stands on a hundred-and-twenty-metre cliff that has been scarped smooth, so the walls and the rock below them read as one continuous vertical surface. There are cannonball scars on the second gate, left there deliberately.',
    'Below it the old city is blue — painted with a lime and copper-sulphate wash that was originally a Brahmin marker and then spread because it repels insects and keeps houses cool. Seen from the ramparts at the right hour it is genuinely startling.',
    'Jodhpur was the capital of Marwar, the land of death, on the edge of the Thar, and the harshness shows in the food, which is the richest and heaviest in Rajasthan for exactly the reasons you would expect.'
  ],
  see: [
    { n: 'Mehrangarh', t: 'a long morning',
      d: 'Take the audio guide, which is unusually good. The palace rooms inside are intact with their furnishings, the armoury is serious, and the view down over the blue city from the ramparts is the photograph everybody comes for.' },
    { n: 'Jaswant Thada',
      d: 'A white marble cenotaph just below the fort, carved thin enough to glow when the sun is behind it. Quiet, five minutes away, and usually skipped.' },
    { n: 'The blue city on foot',
      d: 'Below the fort around Navchokiya. Narrow stepped lanes, no traffic, and real life rather than shops. Easy to get lost in and small enough that it does not matter.' },
    { n: 'The clock tower and Sardar Market',
      d: 'Spice merchants, textiles, and the famous makhaniya lassi stalls at the gate. Chaotic and very good.' },
    { n: 'Rao Jodha Desert Rock Park',
      d: 'A hundred hectares of rocky desert below the fort, cleared of invasive mesquite and replanted with native species. A properly done piece of ecological restoration with good walking trails.' }
  ],
  when: 'October to March. The desert cools sharply at night in December and January. Avoid May and June entirely.',
  stay: 'Two nights, three if you are using it as a base for Jawai or the Bishnoi villages.',
  move: 'Overnight train from Delhi or Jaipur, or fly. Autos within the city; the old city is walked.',
  eat: 'The heaviest and best Rajasthani food in the state. Mirchi bada, mawa kachori, makhaniya lassi, and laal maas done properly. Eat it and then do nothing for an hour.'
},

'RAJ-jaisalmer': {
  intro: [
    'Jaisalmer Fort is one of very few living forts left in the world — around three thousand people still live inside the walls, in houses their families have held for generations, with shops, temples and hotels among them. That is the whole character of the place and also its central problem: the fort was built in the twelfth century with no drainage for modern water use, and the seepage has been undermining the foundations for decades.',
    'Everything is built from the same yellow sandstone, which at sunset goes the colour of a lit lamp. The old merchant havelis below the fort — Patwon ki Haveli in particular — carry some of the most intricate stone carving in India, done by families who grew rich on the camel caravan trade between Delhi and Central Asia.',
    'Then the trade routes moved, and then Partition closed the border forty kilometres away, and Jaisalmer became a garrison town at the end of the line. Tourism is what has brought it back.'
  ],
  see: [
    { n: 'The fort, slowly',
      d: 'Go in the early morning or after dark when the day trippers have gone. The Jain temples inside, a connected group of seven, are the finest thing in it and are open only in the mornings.' },
    { n: 'Patwon ki Haveli',
      d: 'Five adjoining mansions built by one brocade-trading family in the early nineteenth century, with facades of carved stone screens that look like textile. The best of the havelis by a distance.' },
    { n: 'A night in the dunes', t: 'Sam or Khuri',
      d: 'Camel to a camp, dinner, and sleeping out. Sam is the busy one with generators and coachloads; Khuri is quieter and further. Ask specifically for a camp away from the main dune field.' },
    { n: 'Gadisar Lake', t: 'early',
      d: 'A reservoir built in the fourteenth century to water the town, with ghats, pavilions and a great many birds at dawn.' },
    { n: 'Kuldhara', t: 'the abandoned village',
      d: 'A Paliwal Brahmin settlement said to have been abandoned overnight in the nineteenth century, with a curse attached. Whatever the truth, the ruined grid of houses in open desert is a strange place to walk.' }
  ],
  when: 'November to February. The desert is genuinely cold at night in December. The Desert Festival in February is worth timing for. Summer here is among the hottest places in India.',
  stay: 'Two nights, plus one in the desert.',
  move: 'Overnight train from Jodhpur or Delhi, which is the pleasant way to arrive. The town is walkable.',
  eat: 'Simple desert food — ker sangri, made from a bean and a berry that grow wild out there, is the local speciality and is unlike anything else.'
},

/* ===================== MAHARASHTRA ===================== */
'MAH-mumbai': {
  intro: [
    'Mumbai was seven islands, given to Charles II as part of a Portuguese dowry in 1661 and leased to the East India Company for ten pounds a year. The channels between them were filled in over two centuries of reclamation, which is why the city has the shape it does — a narrow peninsula with nowhere to grow except up and outward along two railway lines that carry something like seven million people a day.',
    'It is the richest city in India and has the largest slum population of any city in the world, frequently on the same street. It is also the most open: the standard observation that Mumbai asks what you do while Delhi asks who you know is a cliché because it is true.',
    'For a visitor, the south of the city is the compact part that rewards walking — a remarkable ensemble of Victorian Gothic and Art Deco that was made World Heritage in 2018, on the grounds that there is more Art Deco here than anywhere outside Miami.'
  ],
  see: [
    { n: 'The Fort district on foot', t: 'a morning',
      d: 'Start at Chhatrapati Shivaji Terminus — a Gothic railway station of 1888 that is also one of the busiest in the world — and walk south past the High Court, the University and Flora Fountain to Horniman Circle. The whole ensemble was built in about forty years.' },
    { n: 'Elephanta Caves', t: 'half a day',
      d: 'An hour by boat from the Gateway of India to sixth-century rock-cut Shiva caves, with a six-metre three-headed Sadashiva at the back that is among the great pieces of Indian sculpture.' },
    { n: 'Dharavi, with the right operator',
      d: 'A working district of leather, pottery and recycling, not a spectacle. Go with one of the resident-run organisations that puts the fee back into the area, do not photograph people, and expect to come out with your assumptions rearranged.' },
    { n: 'Marine Drive and Chowpatty at dusk',
      d: 'The curve of the bay with the lights coming on, which is why it is called the Queen’s Necklace. Walk it and eat bhelpuri at the far end.' },
    { n: 'The Kala Ghoda galleries and the Prince of Wales Museum',
      d: 'The museum — now Chhatrapati Shivaji Maharaj Vastu Sangrahalaya — is one of the best in the country, and the arts district around it is where the city’s cultural life concentrates.' },
    { n: 'Dhobi Ghat and the dabbawalas',
      d: 'Two pieces of Mumbai logistics worth seeing: an open-air laundry serving the whole city, and a lunch delivery system that moves two hundred thousand tiffins a day with an error rate that has been studied at Harvard.' }
  ],
  when: 'November to February is dry and comparatively cool. The monsoon from June to September is spectacular and genuinely disruptive — the city floods most years. March to May is humid and heavy.',
  stay: 'Three nights for the south of the city. Longer if you are using it as a base for Ajanta and Ellora, which are better done from Chhatrapati Sambhajinagar.',
  move: 'The suburban trains are the fastest way north-south and are an experience in themselves outside rush hour; app cabs and autos otherwise. The south is walkable.',
  eat: 'The best range in India. Vada pav and pav bhaji on the street, Parsi food at the old Irani cafés — dhansak, berry pulao, mutton cutlets — Gujarati thalis, Mangalorean seafood, and Mohammed Ali Road during Ramadan.'
},

'MAH-ajanta': {
  intro: [
    'Thirty caves cut into the inside of a horseshoe gorge above the Waghora river, in two phases: a first group around the second century BC, and a second, much more elaborate group in the fifth century AD. Then they were abandoned, the forest took the gorge, and nobody went in for roughly a thousand years until a British hunting party stumbled on them in 1819.',
    'That thousand years of neglect is why Ajanta matters. The paintings inside — covering walls and ceilings in several caves — are the only substantial body of ancient Indian painting to survive anywhere, and they survived precisely because nobody was using the buildings. They are not frescoes; the pigment was applied to a dry surface over a mud-and-plaster ground, which makes their survival harder to explain and more fragile.',
    'What they show is not only religious. There are court scenes, foreign ambassadors, animals, women’s hairstyles, musical instruments and textiles, which together form the best picture we have of what the Gupta world actually looked like.'
  ],
  see: [
    { n: 'Caves 1 and 2', t: 'the paintings',
      d: 'The two richest painted interiors, including the Bodhisattva Padmapani — the single most reproduced image in Indian art. Lighting inside is deliberately low and flash is prohibited; let your eyes adjust for a minute before you decide you cannot see anything.' },
    { n: 'Cave 26', t: 'the sculpture',
      d: 'A later chaitya hall with a seven-metre reclining Buddha entering parinirvana carved along one wall, his followers grieving below and celestial figures above.' },
    { n: 'Cave 10', t: 'the oldest',
      d: 'Second century BC, and the one the hunting party saw first — a British officer’s name is scratched into the wall. The ribbed ceiling imitates wooden construction that no longer exists anywhere.' },
    { n: 'The viewpoint across the gorge',
      d: 'A short walk from the entrance to where the hunting party stood. The whole crescent of caves in the cliff face in one frame, which no photograph taken from inside can give you.' }
  ],
  when: 'November to March. The gorge is spectacular just after the monsoon when the river is running and the waterfall at the head of it is working, but humidity is hard on both the paintings and the visitor. Closed on Mondays.',
  stay: 'A full day from Chhatrapati Sambhajinagar, about two and a half hours each way. Do not try to combine Ajanta and Ellora in one day; they are in opposite directions and both deserve better.',
  move: 'Private car or a tour bus. You park at a visitor centre and take a shuttle the last four kilometres. There is a good deal of walking and a lot of steps once you are there.',
  eat: 'A canteen at the visitor centre and nothing else. Eat before you come.'
},

'MAH-ellora': {
  intro: [
    'Ellora is thirty-four caves cut over about four hundred years from the sixth century, and the extraordinary thing about it is not any single cave but the sequence: twelve Buddhist, seventeen Hindu and five Jain, carved side by side along the same escarpment, overlapping in time. Whatever the politics of the period were, the stonemasons clearly worked for whoever was paying.',
    'And then there is Cave 16. Kailasa is not a cave at all — it is a complete multi-storey temple, with courtyards, galleries, a gatehouse and free-standing elephants, carved downward out of the living basalt of the hillside as a single piece of rock. Something like two hundred thousand tonnes of stone were removed, starting from the top, with no possibility of correcting a mistake.',
    'It is the largest monolithic excavation in the world and it is genuinely difficult to stand in front of and believe.'
  ],
  see: [
    { n: 'Kailasa, Cave 16', t: 'give it two hours',
      d: 'Walk the ground level first, then take the path up the side of the gorge to look down into it, which is the only way to grasp that it was cut rather than built. The elephant frieze along the base appears to carry the entire temple.' },
    { n: 'The Buddhist group, Caves 1 to 12',
      d: 'Including Cave 10, a chaitya hall with a ribbed vault, and Cave 12, three storeys of monastic cells with a hall of Bodhisattvas on the top floor.' },
    { n: 'The Hindu group, Caves 13 to 29',
      d: 'Cave 29 in particular, with enormous panels of Shiva, including the destruction of Andhaka — among the most violent and best pieces of carving on the site.' },
    { n: 'The Jain group, Caves 30 to 34',
      d: 'A kilometre further on and usually empty. Smaller and far finer in detail than anything else at Ellora, with a painted ceiling that still holds its colour.' },
    { n: 'Grishneshwar temple',
      d: 'A working jyotirlinga temple five minutes from the gate, which puts the whole site back into a living context.' }
  ],
  when: 'November to March. Closed on Tuesdays. The site is more exposed than Ajanta and gets very hot by midday.',
  stay: 'A full day. Combine with Daulatabad fort on the way back if you have energy left.',
  move: 'Half an hour from Chhatrapati Sambhajinagar by road. The caves run along nearly two kilometres of escarpment, so there is a lot of walking.',
  eat: 'Basic food at the gate. The city has good Mughlai cooking; save dinner for it.'
},

/* ===================== KARNATAKA ===================== */
'KAR-hampi': {
  intro: [
    'Hampi was Vijayanagara, the capital of an empire that controlled most of southern India and was, in the early sixteenth century, one of the largest cities in the world — Portuguese visitors compared it to Rome. In 1565 a coalition of Deccan sultanates defeated its army at Talikota, and the city was systematically destroyed over several months and never reoccupied.',
    'What that leaves is twenty-six square kilometres of ruin with nothing built on top of it — temples, bazaars, aqueducts, elephant stables and royal enclosures scattered across a landscape of granite boulders that look as if they were dropped there. The geology is the oldest exposed rock in India and makes the place genuinely surreal; the boulders are older than the continent’s current arrangement.',
    'It is also, unusually for a site this size, still partly alive. The Virupaksha temple at the western end has been in continuous worship for over seven hundred years and did not stop when the city fell.'
  ],
  see: [
    { n: 'Virupaksha Temple', t: 'go early',
      d: 'The oldest functioning part of Hampi, with a fifty-metre gopuram and a temple elephant who is blessed and bathed in the river each morning. Worship here predates the empire and outlasted it.' },
    { n: 'Vittala Temple and the stone chariot', t: 'the set piece',
      d: 'A shrine in the form of a chariot with wheels that once turned, and a hall of musical pillars that ring at different pitches when struck — which is why they are now roped off. The image on the fifty-rupee note.' },
    { n: 'Matanga Hill at sunrise',
      d: 'A twenty-minute scramble to the highest point in the ruins, with the whole boulder field and the river laid out below. Go up for sunrise and come down before the heat.' },
    { n: 'The royal enclosure',
      d: 'The Lotus Mahal, the elephant stables and the stepped tank. A different architectural register entirely — Indo-Islamic rather than temple style, which tells you something about how the court actually lived.' },
    { n: 'The coracle across to Anegundi',
      d: 'A round basket boat across the Tungabhadra to the older settlement on the north bank, which has its own ruins and a far quieter, more agricultural feel.' },
    { n: 'Hemakuta Hill at sunset',
      d: 'A cluster of small early temples on the slope above Virupaksha, facing west. Easy to reach and the standard place to end the day.' }
  ],
  when: 'November to February. March onwards is punishing — this is one of the hottest parts of Karnataka and there is almost no shade among the boulders.',
  stay: 'Three days. There is far more here than one day allows, and the distances between groups of ruins are real.',
  move: 'Overnight train or bus to Hospet, then half an hour. Hire a bicycle or a scooter; walking the whole site is not realistic. A guide for the first morning pays for itself.',
  eat: 'The Hampi bazaar side is vegetarian and alcohol-free by local rule. Virupapur Gaddi across the river is where the traveller cafés are.'
},

/* ===================== PUNJAB ===================== */
'PUN-amritsar': {
  intro: [
    'The Golden Temple sits in the middle of a tank of water, reached by a single causeway, with its entrances open on all four sides — a deliberate statement that it is open to everyone from every direction. The lower half is marble, the upper half is gold leaf over copper, and the effect at night with the whole thing reflected is as good as anything in India.',
    'The thing that stays with most visitors, though, is the langar. The community kitchen feeds anybody who sits down, regardless of religion, caste or nationality, free, every day, around the clock — somewhere between fifty and a hundred thousand meals a day, more at festivals. It is run almost entirely by volunteers, including the washing-up, which is done by people who have queued for the privilege.',
    'Three hundred metres away is Jallianwala Bagh, where in 1919 British troops fired on an enclosed crowd for ten minutes. The bullet holes are marked in the walls. The two sites together are not an easy afternoon, and they should probably be done in that order.'
  ],
  see: [
    { n: 'The Golden Temple before dawn',
      d: 'Go at four in the morning for the palki sahib, when the holy book is carried in procession to the inner sanctum. Cover your head, leave your shoes at the counter, and walk the parikrama clockwise. It is quieter, cooler, and the best hour of the day here.' },
    { n: 'Eating and volunteering at the langar',
      d: 'Sit on the floor in rows, eat what you are given, and then, if you like, join the vegetable prep or the dish line. Nobody will ask who you are.' },
    { n: 'Jallianwala Bagh',
      d: 'The narrow entrance passage the crowd could not escape through, the well people jumped into, and the marked walls. Recently and controversially renovated.' },
    { n: 'The Partition Museum',
      d: 'In the old town hall, and the first museum anywhere dedicated to Partition. Built largely from oral history. Harrowing and essential for understanding this city.' },
    { n: 'The Wagah border ceremony', t: 'late afternoon',
      d: 'Thirty kilometres out. High-kicking, moustache-bristling flag-lowering performed to stadium crowds on both sides. Absurd, genuinely rousing, and over in forty-five minutes. Get there early for a seat.' }
  ],
  when: 'October to March. Summer on the Punjab plain is extreme. November is cool, and Guru Nanak’s birthday that month fills the city.',
  stay: 'Two nights. Most people wish they had allowed a third for the temple at different hours.',
  move: 'Fast trains from Delhi, or fly. The old city around the temple is walkable; autos for the rest.',
  eat: 'The best Punjabi food anywhere. Amritsari kulcha with chole, fried fish at the old stalls, lassi in clay cups, and the dhabas on Lawrence Road. Eat at the langar at least once regardless.'
},

/* ===================== ASSAM ===================== */
'ASM-kaziranga': {
  intro: [
    'Kaziranga holds roughly two-thirds of the entire world population of the greater one-horned rhinoceros. In 1905 there were perhaps a dozen animals left here; the reserve was created on the initiative of Mary Curzon, the Viceroy’s wife, who came to see a rhino and did not manage to. There are now well over two thousand.',
    'The park is Brahmaputra floodplain — tall elephant grass, shallow water bodies and patches of semi-evergreen forest — and it floods every monsoon, sometimes catastrophically. The flooding is not a failure of the park but the process that maintains it; the animals move to higher ground across the highway, which is why there are speed limits and corridors, and why some of them die on the road every year anyway.',
    'It also has one of the highest tiger densities of any protected area in the world, though the grass is tall enough that you are unlikely to see one.'
  ],
  see: [
    { n: 'A jeep safari in the Central range', t: 'first light',
      d: 'Kohora, the central zone, has the highest concentration of rhino and the best water bodies. Rhino sightings are close to guaranteed; wild buffalo, swamp deer and elephant are all common.' },
    { n: 'The Western range at Bagori',
      d: 'More open grassland and generally better for birds and for photographing rhino against water. Quieter than Central.' },
    { n: 'The Eastern range at Agoratoli',
      d: 'The birding zone — pelicans, storks and waders on the beels, with far fewer vehicles. Take this one if you have three mornings.' },
    { n: 'Elephant-back safari, with a caveat',
      d: 'Offered at dawn and gets you closer into the grass than a jeep can. Welfare standards vary considerably and some visitors choose to skip it on those grounds.' },
    { n: 'Tea estates around the park',
      d: 'Assam tea country starts at the boundary, and several colonial-era bungalows take guests. A good way to spend the middle of the day when the park is shut.' }
  ],
  when: 'The park is open roughly November to April and closed through the monsoon. February and March are the best balance of weather and grass height — after burning, when sightlines open up.',
  stay: 'Two nights, three if you want all three ranges.',
  move: 'Fly to Jorhat or Guwahati and drive — four to five hours from Guwahati. Safaris are booked through the forest department, usually by your lodge.',
  eat: 'Assamese food, which is lighter and more sour than the rest of India — fish with lemon, khar, bamboo shoot, and very good rice. Try it rather than defaulting to the lodge buffet.'
},

/* ===================== KERALA ===================== */
'KER-alleppey': {
  intro: [
    'The backwaters are nine hundred kilometres of interconnected lagoons, canals and rivers running parallel to the coast behind a barrier of sand, and Alappuzha sits in the middle of the network. Much of the land around it is below sea level and was reclaimed from the lake in the nineteenth century — the Kuttanad paddy fields are among the few places on earth where rice is farmed under sea level, behind bunds, with the water pumped out.',
    'The houseboats are converted kettuvallam, cargo barges that once carried rice and spice and were built without a single nail, the planks stitched together with coir rope. The first was converted for tourism in the early 1990s and there are now well over a thousand.',
    'That number is the thing to think about. A night on a houseboat is genuinely lovely and the fleet has had real effects on water quality. The quieter route is to go by public ferry or small punted canoe into the narrow canals the big boats cannot enter.'
  ],
  see: [
    { n: 'A houseboat overnight', t: 'the main event',
      d: 'You board around noon, cruise for a few hours, moor at dusk — the boats are not permitted to run after dark — and come back in the morning. Food is cooked on board and is usually excellent. Choose a smaller boat and insist on one with a solar or electric option if you can.' },
    { n: 'The canoe through the narrow canals', t: 'half a day',
      d: 'Punted, silent, and into channels two metres wide where the houseboats cannot follow. Village life happens on the bank at arm’s length. Most people who do both say this was the better half.' },
    { n: 'The public ferry to Kottayam', t: 'about three hours',
      d: 'A government boat across Vembanad lake for the price of a coffee. No commentary and no comfort, and the single best-value thing in Kerala.' },
    { n: 'Kuttanad’s below-sea-level farms',
      d: 'Cycle or take a canoe along the bunds between paddy fields that sit lower than the water beside them. Strange and quietly impressive engineering.' },
    { n: 'The snake boat races', t: 'August and September',
      d: 'Chundan vallam, a hundred and twenty feet long with over a hundred rowers. The Nehru Trophy race on Punnamada lake is the big one and worth planning a trip around.' }
  ],
  when: 'November to February is dry and comfortable. The monsoon from June is beautiful on the water but relentless. August and September bring the boat races and heavy rain together.',
  stay: 'One night on a boat is enough for most people; two if you want to get further into the network.',
  move: 'Alappuzha is on the main line between Kochi and Trivandrum. Houseboats leave from the Finishing Point jetty. Book through a known operator rather than at the jetty.',
  eat: 'Karimeen pollichathu — pearl spot fish grilled in banana leaf — is the local dish and is best eaten on the boat. Toddy shops along the canals serve fiery fish curry with fermented palm sap.'
},

'KER-munnar': {
  intro: [
    'Munnar is tea, laid over a landscape that was not made for it. The British planted the first bushes here in the 1880s on land leased from the Poonjar royal family, and the plantations now cover entire mountainsides in a clipped green that follows every contour — from above it looks like a topographic map rendered in hedge.',
    'It sits at about sixteen hundred metres where three mountain streams meet, which is what the name means, and the air is cold enough at night that it was a genuine relief for people coming up from the plains.',
    'Above the tea the land gets wilder. Eravikulam National Park protects shola-grassland, a mosaic of stunted evergreen forest in the folds and grass on the ridges that exists only in the southern Western Ghats, and about half the world’s remaining Nilgiri tahr live in it.'
  ],
  see: [
    { n: 'Eravikulam National Park', t: 'go at opening',
      d: 'A short bus and a walk up a tarred path, with Nilgiri tahr usually standing on the rocks beside it — they are entirely unbothered by people. Anamudi, the highest peak in India south of the Himalaya, is at the back. The park closes for about two months in the calving season.' },
    { n: 'A tea estate and the Tata museum',
      d: 'The small museum at Nallathanni explains the history and the processing, and most estates will show you the factory. The smell inside a withering loft is worth the trip on its own.' },
    { n: 'Top Station', t: 'early morning',
      d: 'On the Tamil Nadu border at about seventeen hundred metres, looking down into the Theni valley. Go at dawn before the cloud comes up, which it does most days by nine.' },
    { n: 'Walking in the estates',
      d: 'Not the viewpoints with the queues, but the paths between the sections. Several lodges run guided plantation walks and they are the best hours you will spend here.' },
    { n: 'The Neelakurinji', t: 'once every twelve years',
      d: 'A shrub that flowers en masse on a twelve-year cycle and turns the hillsides blue. The last mass bloom was 2018, so the next is due in 2030.' }
  ],
  when: 'September to March. The monsoon is heavy here and landslides close roads. April and May are warm and hazy but the tea is at its greenest after the first rains.',
  stay: 'Two or three nights. The town itself is scruffy and congested; stay out in the estates.',
  move: 'Four hours from Kochi on a winding road. A car and driver is the normal arrangement; buses exist and are slow.',
  eat: 'Kerala food plus the plantation inheritance — strong tea, and some genuinely good estate-bungalow cooking if you stay in one.'
},

'KER-kochi': {
  intro: [
    'Kochi has been a port for as long as there have been ports on this coast, and it has been colonised in sequence by the Portuguese, the Dutch and the British, each of whom left their buildings standing. The result in Fort Kochi is a few square kilometres holding a Portuguese church where Vasco da Gama was buried, a Dutch palace with Keralan murals, a synagogue of 1568 with hand-painted Chinese floor tiles, and fishing nets of a design that came from the court of Kublai Khan.',
    'The Jewish community that built the synagogue has almost entirely gone — a handful of people remain — but Jew Town around it is still there, now mostly antique shops and spice warehouses that smell of cardamom from the street.',
    'Modern Ernakulam across the water is an ordinary busy Indian city and is where most people actually live. The two halves together make Kochi much more interesting than the heritage quarter alone.'
  ],
  see: [
    { n: 'Fort Kochi on foot', t: 'a slow morning',
      d: 'St Francis Church, the Dutch Cemetery, the waterfront and the Chinese fishing nets, all within twenty minutes of each other. Go early; the light on the nets is best then and the touts are still asleep.' },
    { n: 'Paradesi Synagogue and Jew Town',
      d: 'The oldest active synagogue in the Commonwealth, with a clock tower and those blue Chinese tiles, no two identical. Closed Fridays and Saturdays.' },
    { n: 'Mattancherry Palace',
      d: 'Built by the Portuguese, given to the Raja, renovated by the Dutch, and covered inside with some of the finest Keralan mural painting anywhere.' },
    { n: 'Kathakali, properly',
      d: 'Go to a venue that shows the two hours of make-up beforehand and explains the hand gestures. Without that it is incomprehensible; with it, it is extraordinary.' },
    { n: 'The Kochi-Muziris Biennale', t: 'December to April, alternate years',
      d: 'South Asia’s largest contemporary art event, spread through warehouses and colonial buildings across the fort area. Worth planning a trip around.' },
    { n: 'The ferry to Vypin or Vallarpadam',
      d: 'Costs almost nothing, takes ten minutes, and gives you the harbour from the water with the container ships going past.' }
  ],
  when: 'November to March. The monsoon from June to September is dramatic and the old buildings leak. Biennale years are busiest.',
  stay: 'Two or three nights in Fort Kochi, which is also the logical first or last stop in Kerala.',
  move: 'Good airport with international flights. Ferries between Fort Kochi and Ernakulam are the quickest and nicest crossing. The fort area is walked.',
  eat: 'Syrian Christian food — duck roast, appam with stew, meen curry — alongside Muslim Mappila dishes and the Jewish inheritance. The fish you buy at the Chinese nets can be cooked at the stalls behind them.'
},

/* ===================== LADAKH ===================== */
'LAD-leh': {
  intro: [
    'Leh sits at about three thousand five hundred metres in a side valley of the Indus, under a nine-storey ruined palace that is a smaller cousin of the Potala in Lhasa. It was the capital of an independent Himalayan kingdom until the 1840s and a staging post on the caravan route between Punjab and Central Asia, which is why the old town is a warren of mud-brick houses and why the bazaar still sells pashmina from the Changthang.',
    'The single most important thing about Leh is the altitude. There is roughly a third less oxygen than at sea level, and most visitors now fly in from Delhi in ninety minutes, going from two hundred metres to three and a half thousand with no adjustment. Acute mountain sickness is common and occasionally serious. The rule is simple and widely ignored: do nothing at all for the first forty-eight hours.',
    'Do that, and the rest of Ladakh opens up. Ignore it, and you will spend the week in bed or on oxygen.'
  ],
  see: [
    { n: 'Doing nothing, for two days', t: 'genuinely the first item',
      d: 'Walk slowly around the bazaar, drink a great deal of water, skip alcohol, and sleep. This is not caution for its own sake — it is what makes everything below possible.' },
    { n: 'Leh Palace and Namgyal Tsemo',
      d: 'The palace is a shell and the climb above it to the gompa is short and steep, which at this altitude means something. Go up for sunset on day two and see how your lungs are doing.' },
    { n: 'Shanti Stupa',
      d: 'A Japanese-built peace pagoda on a hill above town with the whole valley and the Stok range in front of it. Five hundred steps or a road.' },
    { n: 'The monastery circuit', t: 'a long day',
      d: 'Thiksey, Hemis, Shey and Stakna are all within an hour. Start with Thiksey at dawn for the morning prayers, which non-Buddhists are welcome at and which are worth the early start.' },
    { n: 'The old town restoration',
      d: 'The mud-brick quarter below the palace has been undergoing a careful restoration for two decades. Walking it with one of the Ladakhi-run heritage walks is the best context you will get for the whole region.' },
    { n: 'The Hall of Fame and the Indus-Zanskar confluence',
      d: 'An army museum that explains the Siachen and Kargil conflicts from one side, and a dramatic meeting of two rivers of visibly different colours half an hour away.' }
  ],
  when: 'June to September, when the passes are open and the road from Manali or Srinagar is passable. Flights run year round, but much of the region is inaccessible from November to May and the cold is serious.',
  stay: 'Two nights acclimatising in Leh plus five to ten for everything else. Anything less than a week is not worth the altitude penalty.',
  move: 'Fly from Delhi, or drive up from Manali or Srinagar over two days, which acclimatises you properly and is a far better arrival. Inner Line Permits are required for Nubra, Pangong and Tso Moriri and are arranged online or through any agent in town.',
  eat: 'Ladakhi and Tibetan — thukpa, momos, skyu, and butter tea which is salty and takes some getting used to. Apricots from the Nubra valley in season.'
},

'LAD-pangong': {
  intro: [
    'Pangong Tso is a hundred and thirty kilometres of lake at four thousand three hundred metres, of which about a third is in India and the rest in Tibet. It is salt water, it freezes solid in winter despite the salinity, and the colour is the reason people come — a blue that shifts through turquoise, cobalt and grey over the course of a day depending on light and depth, and which does not photograph convincingly.',
    'It became famous in India after a Bollywood film shot its closing scene here in 2009, and the resulting traffic has been a mixed blessing — there are now a great many camps along the shore at Spangmik and some pressure on a fragile place.',
    'The Line of Actual Control runs through the lake, and the area has seen serious confrontations between Indian and Chinese troops in recent years. Access rules can change at short notice.'
  ],
  see: [
    { n: 'The first sight of the lake',
      d: 'The road comes over a rise and the whole thing appears at once. Stop there rather than driving straight down to the camps.' },
    { n: 'Sunrise at Spangmik',
      d: 'The colour is best in the first hour and the wind is usually down. Most people photograph at sunset, which is also good; dawn is quieter.' },
    { n: 'Driving further east to Merak and Man',
      d: 'Two villages beyond the main camp strip, with fewer people and a better sense of what the shore is actually like. Permits cover them; check current access.' },
    { n: 'Chang La on the way',
      d: 'The pass at about five thousand three hundred metres that the road crosses to get here. Do not spend long at the top — there is an army canteen and a lot of people feeling unwell.' },
    { n: 'The night sky',
      d: 'At this altitude with no light for a hundred kilometres, the Milky Way is bright enough to cast a sense of shadow. Bring everything warm you own.' }
  ],
  when: 'May to September. The lake freezes from around November and the road over Chang La closes with snow. Nights are below freezing even in summer.',
  stay: 'One night, which is enough. Two if you are going on to Tso Moriri via the Chushul route when it is open.',
  move: 'Five to six hours from Leh over Chang La. Inner Line Permit required and checked. Do not come here on your first or second day in Ladakh — the altitude gain from Leh is another eight hundred metres.',
  eat: 'Camp food, which is basic Indian and Tibetan. Carry snacks and far more water than feels necessary.'
},

/* ===================== UTTARAKHAND ===================== */
'UTK-rishikesh': {
  intro: [
    'Rishikesh is where the Ganges comes out of the mountains, and it has been a place of retreat and meditation for as long as there are records. It became internationally known in February 1968 when the Beatles arrived at Maharishi Mahesh Yogi’s ashram and wrote most of the White Album there over about seven weeks — the abandoned ashram is now open and covered in murals.',
    'The modern town is two things at once and they sit together oddly. One is the spiritual centre: hundreds of ashrams, a vegetarian and alcohol-free rule across the whole city, and the evening aarti on the ghats. The other is the adventure capital of north India — whitewater rafting, bungee jumping and cliff camping, mostly run for young Indians on weekend breaks.',
    'The river is the reason for both. It is clear and very cold here, still mountain water, and swimming in it is a different experience from anything further down.'
  ],
  see: [
    { n: 'Rafting the Ganges', t: 'September to June',
      d: 'Class III and IV depending on the section, starting upstream at Shivpuri or Kaudiyala and finishing at Ram Jhula. Operators are everywhere and standards vary; use one with its own equipment and a safety kayaker.' },
    { n: 'Ganga aarti at Parmarth Niketan', t: 'sunset',
      d: 'Less commercial than Haridwar’s and held on the steps with the ashram’s students leading the singing. Sit on the ghat rather than the platform.' },
    { n: 'The Beatles Ashram',
      d: 'Overgrown meditation pods, a lecture hall covered in later murals, and the jungle coming back in. Officially Chaurasi Kutia and inside the Rajaji reserve, so there is an entry fee.' },
    { n: 'Yoga, chosen carefully',
      d: 'Everything from serious month-long teacher trainings to drop-in classes. Ask what lineage and how long the teacher has been there; the quality range is enormous.' },
    { n: 'Walking to Neer Garh waterfall',
      d: 'A short uphill walk from Lakshman Jhula to a set of pools you can swim in. Busy at weekends, empty on a weekday morning.' },
    { n: 'The suspension bridges',
      d: 'Ram Jhula and Lakshman Jhula, crossed by pedestrians, motorbikes, cows and monkeys simultaneously. The latter has been closed for structural work; check which is open.' }
  ],
  when: 'September to November and February to April. The monsoon raises the river too high for rafting and brings landslides. May and June are hot but the river is at its most inviting.',
  stay: 'Three nights. Many people come for three and stay three weeks.',
  move: 'Dehradun airport is forty-five minutes away; trains run to Haridwar, then half an hour by road. The two banks are connected by the footbridges and by boat.',
  eat: 'Vegetarian and alcohol-free throughout. There is a strong traveller café scene around Tapovan doing everything from dosas to Israeli breakfasts, and German bakeries that have been there since the 1970s.'
},

/* ===================== WEST BENGAL ===================== */
'WBG-kolkata': {
  intro: [
    'Kolkata was the capital of British India until 1911 and the second city of the empire, and the built fabric of that period is still almost entirely present — not restored, mostly, but present: colonnaded mansions with trees growing out of them, a Victorian Gothic high court, and an enormous white marble memorial to a dead queen standing in a park.',
    'It is also the intellectual capital of the country and does not let you forget it. The city produced Tagore, Ray and a disproportionate share of India’s scientists and film-makers, and it retains a coffee-house culture, a Communist political tradition and an argumentative public life that the rest of India finds either admirable or exhausting.',
    'The decay is real and so is the warmth. Kolkata is the friendliest of the Indian metros by a wide margin, and the one where a stranger is most likely to stop and explain something to you at length whether you asked or not.'
  ],
  see: [
    { n: 'The Victoria Memorial and the Maidan',
      d: 'A vast white marble pile finished in 1921, in the middle of a park the size of a district. The museum inside is good on the city’s history; the gardens at dusk are where Kolkata walks.' },
    { n: 'Kumartuli', t: 'best in autumn',
      d: 'The potters’ quarter, where the clay idols for Durga Puja are built on straw and bamboo frames and painted. Working all year, frantic from August, and one of the most photogenic working districts in India.' },
    { n: 'Durga Puja', t: 'September or October',
      d: 'Five days when the entire city builds competitive temporary pavilions — some of them genuinely ambitious works of art — and nobody sleeps. Now on the UNESCO intangible heritage list. If you can time a trip around anything, time it around this.' },
    { n: 'The Indian Museum and the Marble Palace',
      d: 'The oldest museum in India, founded 1814, and a private nineteenth-century mansion stuffed with European art and live birds. The latter needs a free permit, obtained a day ahead.' },
    { n: 'A tram, and the Howrah Bridge at rush hour',
      d: 'The last tram network in India, slow and lovely. The bridge carries something over a hundred thousand vehicles and far more pedestrians daily and has no bolts — it is entirely riveted.' },
    { n: 'College Street and the Indian Coffee House',
      d: 'A kilometre of second-hand book stalls, and above them a cavernous coffee house where the Bengali left has been arguing since the 1940s.' }
  ],
  when: 'October to March. Durga Puja falls in autumn and is the city at full power. Avoid April to June, which is hot and extremely humid, and the monsoon floods streets routinely.',
  stay: 'Three or four nights. Kolkata rewards slow walking more than almost any Indian city.',
  move: 'The metro is the oldest in India and is quick. Yellow Ambassador taxis, app cabs, trams and the ferry across the Hooghly. Walk the centre.',
  eat: 'Bengali food is its own cuisine and deserves attention: shorshe ilish, kosha mangsho, and a vegetarian tradition built around banana flower and bitter gourd. Then the sweets — rosogolla, sandesh, mishti doi — and the Anglo-Indian and Chinese-Indian food that exists nowhere else in this form.'
},

'WBG-darjeeling': {
  intro: [
    'Darjeeling was leased from Sikkim in 1835 as a sanatorium, planted with tea from the 1840s, and became the summer capital of Bengal. It sits on a ridge at around two thousand metres with the plains on one side and, on a clear morning, Kanchenjunga filling the northern sky — the third-highest mountain on earth, close enough to feel like it is at the end of the street.',
    'The tea is the other half of the identity. Darjeeling is a protected designation and the first flush, picked in late March and April, sells for more per kilogram than almost any tea in the world. It is also an industry with a difficult labour history that the estates are still reckoning with.',
    'The town itself is crowded, steep and in places visibly struggling with water supply and landslides. It is also unmistakably itself — Nepali, Tibetan, Lepcha and Bengali at once, with a Victorian skeleton underneath.'
  ],
  see: [
    { n: 'Tiger Hill at dawn', t: 'if the sky is clear',
      d: 'Leave at four in the morning for sunrise on Kanchenjunga, with Everest visible far to the west on the best days. It is cold, crowded and often cloudy — check the forecast and be prepared to skip it.' },
    { n: 'The Darjeeling Himalayan Railway',
      d: 'Running since 1881 on two-foot gauge, World Heritage, and still partly steam-hauled. The full run from Siliguri takes seven hours; the Ghum joyride takes two and is what most people do.' },
    { n: 'A working tea estate',
      d: 'Happy Valley is walkable from town; the better estates further out take guests. Visit during a flush to see plucking and processing rather than an empty factory.' },
    { n: 'The Himalayan Mountaineering Institute',
      d: 'Founded after the 1953 Everest ascent and run for years by Tenzing Norgay, who lived here. The museum is excellent and the zoo next door runs a serious snow leopard and red panda breeding programme.' },
    { n: 'Observatory Hill and the Mall',
      d: 'A shared Hindu and Buddhist shrine on a hilltop wrapped in prayer flags, with monkeys, above the pedestrianised square where the town gathers.' },
    { n: 'Walking to Tibetan Refugee Self-Help Centre',
      d: 'Set up in 1959, still producing carpets and woollens, with a small museum about the exodus. A twenty-minute walk from the Mall and rarely busy.' }
  ],
  when: 'March to May and October to November. The monsoon brings landslides, leeches and no view at all. December and January are clear and very cold.',
  stay: 'Three nights, and consider splitting with Kalimpong or a homestay in a tea village.',
  move: 'Fly to Bagdogra, then three to four hours by shared jeep up the hill. The toy train is for the experience rather than transport. The town is steep and walked.',
  eat: 'Momos, thukpa and Nepali thali rather than Bengali food. The tea, obviously — buy from an estate shop rather than the bazaar if you want first flush.'
},

/* ===================== TAMIL NADU ===================== */
'TND-madurai': {
  intro: [
    'Madurai has been continuously inhabited for well over two thousand years and was described by Greek and Roman writers trading for pepper. The city is laid out in concentric squares around the Meenakshi temple, which is not a monument with a town attached but the organising fact of the whole place — the streets are named for their distance from it.',
    'The temple as it stands is largely seventeenth-century Nayak work on much older foundations. Fourteen gopurams, the tallest around fifty metres, are covered in thousands of brightly painted stucco figures, repainted every twelve years. Inside are a thousand-pillar hall, a tank for ritual bathing, and two sanctums — unusually, the goddess Meenakshi takes precedence over her consort Shiva, which is rare and locally significant.',
    'It is a working temple with something like fifteen thousand visitors a day, not a museum. Non-Hindus may enter most of the complex but not the inner sanctums.'
  ],
  see: [
    { n: 'Meenakshi Temple, twice',
      d: 'Once in the early morning when the light comes through the pillared halls, and once in the evening for the atmosphere. Leave shoes and cameras at the counter — phone cameras are also restricted inside.' },
    { n: 'The night ceremony', t: 'around nine',
      d: 'An image of Shiva is carried in procession to Meenakshi’s chamber for the night, with drums and a palanquin, and carried back at dawn. Short, nightly, and the best half hour in the temple.' },
    { n: 'The Pudhu Mandapam',
      d: 'A seventeenth-century pillared hall just outside the east gopuram, now full of tailors and booksellers working between carved columns. An entirely ordinary use of an extraordinary building.' },
    { n: 'Thirumalai Nayak Palace',
      d: 'What survives is about a quarter of the original — a courtyard of enormous columns and a dome built without girders. Worth an hour.' },
    { n: 'Gandhi Memorial Museum',
      d: 'In an old palace, and holding the blood-stained dhoti Gandhi was wearing when he was shot. He adopted the dhoti in Madurai in 1921, which is why it is here.' },
    { n: 'The flower market at dawn',
      d: 'Behind the temple, jasmine by the kilo being strung for the day’s offerings. Madurai jasmine has its own geographical indication.' }
  ],
  when: 'November to February. The Chithirai festival in April or May is enormous — a million people — and the city is unmanageable and extraordinary in equal measure. Summer is very hot.',
  stay: 'Two nights.',
  move: 'Good rail links and an airport. The old city around the temple is walked; autos elsewhere.',
  eat: 'Madurai is a serious food town and unusually non-vegetarian for Tamil Nadu — kari dosa, mutton chukka, jigarthanda to drink, and the late-night stalls that stay open past midnight.'
},

/* ===================== TELANGANA ===================== */
'TEL-hyderabad': {
  intro: [
    'Hyderabad was founded in 1591 by the Qutb Shahi sultans, passed to the Mughals, and then ran for two centuries as a princely state under the Nizams, who at one point were reckoned the richest men in the world. It did not join India until 1948, and the Deccani culture that developed in that long semi-independence — Persianate, Muslim-majority at the centre, speaking its own dialect of Urdu — is still distinct.',
    'The old city around the Charminar is dense, loud and almost entirely given over to pearls, bangles and food. North of the Musi river is the colonial and modern city, and west of that is Hitec City, which was farmland in 1995 and now houses a large share of India’s software industry.',
    'The biryani is not a cliché. Hyderabadi dum biryani is cooked with raw marinated meat and rice sealed together in one vessel, and the city argues about it with a seriousness other places reserve for politics.'
  ],
  see: [
    { n: 'Charminar and the old city', t: 'morning',
      d: 'A four-minaret gateway of 1591 at a crossroads, with Laad Bazaar’s bangle shops running west and the Mecca Masjid beside it. Climb it if it is open for the view down into the market.' },
    { n: 'Golconda Fort', t: 'late afternoon',
      d: 'A granite citadel on a hill, with acoustics designed so a clap at the entrance gate is audible at the top. The Koh-i-Noor came from mines in this kingdom. Walk up rather than taking the sound-and-light bus.' },
    { n: 'The Qutb Shahi tombs',
      d: 'Seven generations of sultans in a single necropolis below the fort, recently and very well restored. Go at the end of the day when the stone is warm and there is nobody there.' },
    { n: 'The Salar Jung Museum',
      d: 'One man’s collection, and one of the largest one-person collections in the world — Mughal daggers, Aurangzeb’s sword, European painting, and a famous veiled marble figure.' },
    { n: 'Chowmahalla Palace',
      d: 'The Nizams’ seat, with a durbar hall of Belgian chandeliers and a courtyard of vintage cars including a yellow Rolls-Royce used to collect rubbish, by a Nizam making a point.' },
    { n: 'Eating, as an itinerary',
      d: 'Biryani at one of the old establishments, Irani chai and Osmania biscuits at a café, haleem during Ramadan when the whole city switches to it, and qubani ka meetha to finish.' }
  ],
  when: 'October to February. The Deccan plateau is at about five hundred metres so it is milder than the plains, but April and May still hit forty. Ramadan is the best eating of the year.',
  stay: 'Three nights.',
  move: 'Major airport, good metro on three lines, app cabs everywhere. The old city is walked and the traffic around it is best avoided by car.',
  eat: 'Covered above, and it is genuinely the main reason to come.'
},

/* ===================== ODISHA ===================== */
'ODI-konark': {
  intro: [
    'The Sun Temple at Konark was built around 1250 as a colossal stone chariot for Surya, the sun god — twenty-four carved wheels, three metres across, along the base, and seven horses straining to pull it eastward out of the sand. The main tower, which may have stood seventy metres, collapsed at some point before the nineteenth century; what remains is the audience hall, which is itself enormous.',
    'The wheels are not decorative. They are functioning sundials: the spokes and the axis cast a shadow that tells the time to within a few minutes, and locals will show you how to read it.',
    'The carving covers every available surface, and a substantial amount of it is erotic, in the same tradition as Khajuraho. The site sits about three kilometres inland now; the sea has retreated since it was built, and the temple was once a landmark for sailors who called it the Black Pagoda.'
  ],
  see: [
    { n: 'The wheels', t: 'and how to read them',
      d: 'Start at the base of the south side. Each wheel has eight major and eight minor spokes dividing the day; a guide will show you the shadow reading. This is the detail most visitors walk straight past.' },
    { n: 'The jagamohana and its sculpture',
      d: 'The surviving hall, with musicians and dancers along the upper tiers and the famous pair of colossal war elephants and horses at the sides.' },
    { n: 'The archaeological museum',
      d: 'Holds much of the loose sculpture removed from the site, including pieces from the fallen tower. Small and necessary.' },
    { n: 'Chandrabhaga beach',
      d: 'Three kilometres away, where the temple’s builders would have had the shoreline. Empty, wide, and not for swimming — the undertow is serious.' },
    { n: 'The Konark Dance Festival', t: 'early December',
      d: 'Classical Indian dance performed on an open stage with the temple lit behind it. One of the better-sited festivals in the country.' }
  ],
  when: 'November to February. The coast is humid for much of the rest of the year and the monsoon is heavy.',
  stay: 'Half a day, usually from Puri, which is thirty-five kilometres away.',
  move: 'The marine drive from Puri takes about an hour and is a pleasant run. Bhubaneswar is ninety minutes the other way.',
  eat: 'Simple seafood at the beach shacks. Puri and Bhubaneswar have the proper Odia food.'
},

/* ===================== BIHAR ===================== */
'BIH-bodh-gaya': {
  intro: [
    'This is where Siddhartha Gautama sat down under a tree and resolved not to get up until he understood, and where, by tradition, he did. Whatever you make of that, it makes this the single most important place in Buddhism — the first of the four great pilgrimage sites the Buddha himself named.',
    'The Mahabodhi Temple as it stands is largely a fifth or sixth-century structure, heavily restored in the nineteenth century, with a fifty-metre pyramidal tower. Beside it is the Bodhi tree: not the original, but grown from a cutting of a cutting, the lineage traced back through a sapling taken to Sri Lanka by Ashoka’s daughter in the third century BC and brought back when the original died.',
    'Around the temple, every Buddhist country has built a monastery in its own national style — Thai, Bhutanese, Japanese, Tibetan, Burmese — which makes a walk through the town a tour of the whole Buddhist world in about an hour.'
  ],
  see: [
    { n: 'The Mahabodhi Temple and the Bodhi tree', t: 'early morning',
      d: 'Pilgrims from a dozen countries chanting in a dozen languages around the same tree, with monks doing prostrations on wooden boards. Go at dawn and sit for a while rather than walking round once.' },
    { n: 'The Vajrasana',
      d: 'A polished sandstone slab under the tree, marking the seat itself and placed by Ashoka in the third century BC — the oldest datable object on the site.' },
    { n: 'The national monasteries',
      d: 'Walk the loop: the Thai temple with its gold roof, the Japanese Daijokyo with its eighty-foot Buddha, the Bhutanese with its murals, the Tibetan with its prayer wheels.' },
    { n: 'Sujata Stupa and the river',
      d: 'Across the Falgu, marking where a village woman gave the starving Buddha rice milk and he abandoned extreme asceticism. A quiet walk and a useful piece of the story.' },
    { n: 'Meditation courses',
      d: 'Several monasteries run ten-day courses, and the Root Institute and the Burmese Vihara take drop-in sitters. Winter is the season.' }
  ],
  when: 'October to March. December and January bring the Tibetan community down from the hills, and teachings by senior lamas draw very large crowds. Summer is above forty.',
  stay: 'Two nights, more if you are sitting a course.',
  move: 'Gaya has an airport with regional flights and is on the Delhi–Kolkata main line. Bodh Gaya is thirteen kilometres from Gaya station.',
  eat: 'Tibetan and Thai food around the monasteries, which is a relief if you have been in Bihar a while. Bihari food proper — litti chokha — is better found in Patna.'
},

/* ===================== MADHYA PRADESH ===================== */
'MPR-khajuraho': {
  intro: [
    'The Chandela dynasty built around eighty-five temples here between roughly 950 and 1050 AD, in a burst of about a hundred years, and then the capital moved and the site was forgotten. The jungle covered it until a British engineer was taken there by local guides in 1838. Twenty-five temples survive.',
    'They are famous for one thing, and the fame is slightly misleading. Erotic sculpture makes up perhaps a tenth of the total carving; the rest is gods, dancers, musicians, animals, battles and an enormous amount of daily life. But that tenth is explicit, prominent and carved with the same care as everything else, and the arguments about why have been running for a century and a half without resolution.',
    'What is less argued about is the architecture. These are among the finest examples of the Nagara style anywhere — temples raised on high platforms with no enclosing walls, their towers built up from clustered subsidiary spires in a way that is meant to evoke a mountain range.'
  ],
  see: [
    { n: 'Kandariya Mahadeva', t: 'the Western group',
      d: 'The largest and most developed of them, with over eight hundred sculptures and a tower of eighty-four subsidiary spires. Walk around the outside twice before going in.' },
    { n: 'Lakshmana and Vishvanatha temples',
      d: 'Also in the Western group, and the best preserved in terms of their complete platform arrangement with subsidiary shrines at the corners.' },
    { n: 'The Eastern group',
      d: 'Jain temples, in continuous worship, and markedly different in feel — the Parshvanatha has some of the finest individual figures on the whole site.' },
    { n: 'The Southern group',
      d: 'Duladeo and Chaturbhuja, a couple of kilometres out, late in the sequence and usually deserted. Worth the cycle ride.' },
    { n: 'The light and sound show',
      d: 'In the Western group after dark, narrated in a rather grand register. Better than it sounds, mostly because of the lighting on the stone.' },
    { n: 'The archaeological museum',
      d: 'Recently rebuilt, holding loose sculpture and giving the iconography the explanation the temples themselves do not.' }
  ],
  when: 'October to March. The dance festival in February, performed in front of the Western group, is the best time to be here. April to June is extremely hot.',
  stay: 'Two nights. One full day covers the groups without rushing.',
  move: 'A small airport with flights from Delhi and Varanasi, and a station on a branch line. The town is tiny; hire a bicycle.',
  eat: 'A tourist town with unremarkable food. Eat at your hotel and enjoy the temples.'
},

/* ===================== DELHI ===================== */
'DEL-red-fort': {
  intro: [
    'Shah Jahan moved the Mughal capital here in 1648 and built the Red Fort as its citadel — two kilometres of red sandstone wall enclosing palaces, gardens and a water channel called the Stream of Paradise that ran through the royal apartments.',
    'Most of what stood inside is gone. The British demolished around eighty per cent of the internal buildings after 1857 and turned the rest into barracks, which is why the lawns are so empty. What survives — the Diwan-i-Khas, the hammam, the Pearl Mosque — is enough to suggest the rest.',
    'It remains the symbolic centre of the Indian state: the prime minister addresses the nation from the ramparts every Independence Day, a deliberate inheritance of Mughal authority.'
  ],
  see: [
    { n: 'Diwan-i-Khas',
      d: 'The hall of private audience, where the Peacock Throne stood until Nadir Shah carried it off to Persia in 1739. The Persian inscription still reads: if there is a paradise on earth, it is this, it is this, it is this.' },
    { n: 'Diwan-i-Am',
      d: 'The public audience hall, with an inlaid marble canopy where the emperor sat. The pietra dura panels behind it are Florentine work.' },
    { n: 'The hammam and Moti Masjid',
      d: 'The royal baths, usually viewable only through glass, and a small private mosque in white marble added by Aurangzeb.' },
    { n: 'Chhatta Chowk',
      d: 'The covered bazaar inside the gate, which has sold things to visitors since the seventeenth century and still does.' }
  ],
  when: 'October to March. Closed Mondays. Go at opening — it fills with school groups by mid-morning.',
  stay: 'Two hours, usually combined with Old Delhi and the Jama Masjid next door.',
  move: 'Lal Qila metro station is at the gate. Do not attempt to drive into Chandni Chowk.',
  eat: 'Walk out into Chandni Chowk and eat at Paranthe Wali Gali, or Karim’s behind the Jama Masjid.'
},

'DEL-humayuns-tomb': {
  intro: [
    'Humayun’s widow commissioned this in 1565, nine years after his death, and it is the first of the great Mughal garden tombs — the building from which the Taj Mahal is directly descended. The charbagh layout, the high central dome, the red sandstone with white marble inlay: all of it starts here.',
    'It had fallen into serious disrepair by the twentieth century, and the restoration carried out from 2007 by the Aga Khan Trust is among the most thorough conservation projects in India. They removed a million kilograms of concrete added by earlier repairs and relaid the garden’s water channels.',
    'The complex holds over a hundred other graves, which earned it the nickname of the dormitory of the Mughals. The last emperor, Bahadur Shah Zafar, was captured here in 1857.'
  ],
  see: [
    { n: 'The main tomb and its plinth',
      d: 'Walk the full circuit of the platform before going in. The symmetry is absolute and only reads properly from the corners.' },
    { n: 'Isa Khan’s tomb',
      d: 'Inside the same complex and twenty years older, octagonal and Lodi in style, with its own walled garden. Most visitors walk straight past it.' },
    { n: 'Nizamuddin Dargah', t: 'next door, Thursday evening',
      d: 'The shrine of a fourteenth-century Sufi saint, with qawwali sung after sunset on Thursdays. Crowded, loud and utterly unlike the tomb gardens ten minutes away.' },
    { n: 'Sunder Nursery',
      d: 'A sixteenth-century Mughal garden restored as a public park alongside, with its own monuments and far fewer people.' }
  ],
  when: 'October to March. Late afternoon light on the sandstone is the best of the day.',
  stay: 'Two hours, three with Sunder Nursery.',
  move: 'JLN Stadium metro, or an app cab. Combine with Nizamuddin on a Thursday.',
  eat: 'The lanes around Nizamuddin do excellent Mughlai food, particularly nihari in the mornings.'
},

'DEL-qutb-minar': {
  intro: [
    'The Qutb complex is where Islamic rule in north India begins, physically. Qutb-ud-din Aibak started the minaret in 1199 to mark his victory and built the mosque beside it from the pillars of twenty-seven demolished Hindu and Jain temples — you can still see the original carving, with the figures defaced.',
    'That uncomfortable fact is visible rather than hidden, which makes the site more interesting than a straightforward monument. The tower is seventy-three metres of fluted red sandstone in five tapering storeys, each by a different ruler over a hundred and fifty years, and the joins between their styles are obvious.',
    'In the courtyard stands a seven-metre iron pillar from the fourth century, moved here from elsewhere, which has not meaningfully rusted in sixteen hundred years — a metallurgical puzzle only properly explained in 2003.'
  ],
  see: [
    { n: 'The minaret',
      d: 'You cannot climb it — closed after a stampede in 1981 — but the calligraphic bands and the changing style up the storeys repay a slow walk around the base.' },
    { n: 'Quwwat-ul-Islam mosque',
      d: 'The reused temple pillars are the thing to look at, along with a screen of pointed arches built by masons who had never seen a true arch and corbelled them instead.' },
    { n: 'The iron pillar',
      d: 'Now fenced, because the tradition of standing with your back to it and linking hands around it was wearing it away.' },
    { n: 'Alai Minar',
      d: 'An unfinished second tower intended to be twice the height, abandoned at twenty-four metres when its builder died. A useful corrective to any sense of inevitability about the first.' }
  ],
  when: 'October to March. Open daily.',
  stay: 'Ninety minutes. Mehrauli Archaeological Park next door absorbs another hour.',
  move: 'Qutb Minar metro, then a short auto ride.',
  eat: 'Nothing on site worth a detour. Hauz Khas is fifteen minutes away.'
},

'DEL-old-delhi': {
  intro: [
    'Shahjahanabad was laid out in 1648 as a walled city with the fort at one end and the largest mosque in India at the other, joined by a boulevard — Chandni Chowk, the moonlit square — that had a canal running down the middle of it.',
    'The canal is gone and the boulevard carries a density of traffic, wiring and humanity that has to be seen. The lanes off it are organised by trade in a way that has not changed in centuries: one for wedding brocade, one for spices, one for paper, one for auto parts.',
    'It is the best street food in north India and one of the more overwhelming urban experiences anywhere. Go with somebody who knows it, or go early while the lanes are still walkable.'
  ],
  see: [
    { n: 'Jama Masjid and its minaret',
      d: 'Shah Jahan’s great mosque, finished in 1656, holding twenty-five thousand in the courtyard. Climb the southern minaret for the best rooftop view of the old city. Robes are lent at the gate.' },
    { n: 'Chandni Chowk on foot', t: 'early morning',
      d: 'Before about ten it is possible to walk it. The spice market at Khari Baoli — the largest in Asia — will make you sneeze from the street.' },
    { n: 'Paranthe Wali Gali',
      d: 'A lane of shops frying stuffed parathas in ghee since the 1870s. Order two, not four.' },
    { n: 'Karim’s',
      d: 'In a courtyard behind the Jama Masjid, run by descendants of Mughal court cooks since 1913. Mutton burra and seekh kebab.' },
    { n: 'A cycle rickshaw through the lanes',
      d: 'The only practical way to cover ground at midday, and a sport in itself.' }
  ],
  when: 'October to March. Ramadan evenings at the Jama Masjid are extraordinary. Avoid Sundays, when the markets shut and the lanes are still full.',
  stay: 'Half a day, ideally starting at eight in the morning.',
  move: 'Chandni Chowk or Jama Masjid metro. Walking and cycle rickshaws only.',
  eat: 'The point of coming. Parathas, kebabs, nihari, jalebi at Old Famous, and daulat ki chaat in winter — a milk foam that exists for about three months a year.'
},

'DEL-lutyens': {
  intro: [
    'When the capital moved from Calcutta in 1911, Edwin Lutyens and Herbert Baker were given an empty plain and an instruction to build something permanent. What they produced over twenty years is one of the most complete pieces of imperial urban design anywhere — a processional axis from India Gate to the Viceroy’s House, with the secretariat buildings on a rise between them.',
    'Lutyens tried to fuse classical and Indian forms, and the result is genuinely strange: a dome drawn from the Sanchi stupa on a palace plan, chhatris and chhajjas grafted onto a European composition, elephant capitals instead of Corinthian.',
    'The empire it was built for lasted sixteen years after the city was inaugurated. The Indian state took it over wholesale and has governed from it since.'
  ],
  see: [
    { n: 'Kartavya Path', t: 'early morning or dusk',
      d: 'Walk the axis from India Gate towards the secretariat. The slope was designed so the Viceroy’s House sinks from view as you approach — a row between Lutyens and Baker that Lutyens called his Bakerloo.' },
    { n: 'India Gate',
      d: 'A memorial to the Indian soldiers who died in the First World War and the Third Anglo-Afghan War, with thirteen thousand names on it.' },
    { n: 'Rashtrapati Bhavan', t: 'book ahead',
      d: 'The former Viceroy’s House, now the President’s. Tours of the interior and the gardens must be booked online well in advance.' },
    { n: 'The Lodi and Khan Market quarter',
      d: 'Bungalow Delhi, with the Lodi tombs in the middle of it, and the bookshops and restaurants the city’s establishment uses.' }
  ],
  when: 'October to March. Republic Day on 26 January closes the axis for the parade and is worth seeing if you can get a seat.',
  stay: 'Half a day.',
  move: 'Central Secretariat or Udyog Bhawan metro. The distances look walkable on a map and are larger than they appear.',
  eat: 'Khan Market and Lodi Colony hold the best concentration of good restaurants in the city.'
},

'DEL-lodhi-gardens': {
  intro: [
    'Ninety acres of park with fifteenth and sixteenth-century tombs standing in it — Sayyid and Lodi dynasty work, from the interval between the Delhi Sultanate and the Mughals. The gardens were landscaped around them in 1936 and are now where central Delhi walks, runs and does yoga.',
    'That mixture of use is the appeal. These are serious pieces of architecture, with squinches and glazed tiles and painted plaster, and people eat their lunch in them.'
  ],
  see: [
    { n: 'Bara Gumbad and its mosque',
      d: 'The finest of the group, with painted and incised plasterwork inside the dome that is easy to miss if you do not look up.' },
    { n: 'Sheesh Gumbad',
      d: 'Named for the blue glazed tiles that once covered it, a few of which survive on the facade.' },
    { n: 'Mohammed Shah’s tomb',
      d: 'The oldest here, octagonal, 1444, with a veranda running round it.' },
    { n: 'The park at dawn',
      d: 'Parakeets, joggers, and the tombs with nobody in them.' }
  ],
  when: 'Year round, best October to March. Free, open from sunrise.',
  stay: 'An hour, or a morning if you want to sit.',
  move: 'Jor Bagh metro; walkable from Khan Market.',
  eat: 'The India International Centre and Khan Market are both minutes away.'
},

'DEL-mehrauli': {
  intro: [
    'Mehrauli has been continuously occupied for a thousand years, which makes it the oldest inhabited part of Delhi, and the archaeological park beside the Qutb complex holds the evidence across a hundred acres of scrub.',
    'There are over four hundred monuments in it, almost none labelled, ranging from the tomb of Balban — where the first true arch in India was built — to a colonial-era folly. You will have most of it entirely to yourself.'
  ],
  see: [
    { n: 'Balban’s tomb',
      d: 'Ruined, roofless and important: the first true arch and dome in India, from around 1287.' },
    { n: 'Jamali Kamali',
      d: 'A mosque and a tomb beside it, the tomb’s painted and tiled interior completely at odds with its plain exterior. Usually locked; a caretaker can often be found.' },
    { n: 'Rajon ki Baoli',
      d: 'A stepwell of 1506, four storeys down, in good condition and generally deserted.' },
    { n: 'Just walking',
      d: 'Paths wander between tombs, mosques and nameless walls. Bring a map; there is no signage worth the name.' }
  ],
  when: 'October to March, in the morning. Avoid after dark.',
  stay: 'Two hours.',
  move: 'Qutb Minar metro and a short walk. Entry is free and unstaffed at several points.',
  eat: 'Mehrauli village has local food; Hauz Khas is ten minutes away.'
},

'DEL-akshardham': {
  intro: [
    'Completed in 2005 by the Swaminarayan sect, Akshardham is a vast carved stone temple complex built with no structural steel, using techniques drawn from traditional shilpa texts. Around seven thousand craftsmen worked on it.',
    'Opinions divide sharply. It is unquestionably an extraordinary feat of contemporary stone carving, and it is also a theme-park presentation of Hinduism complete with an animatronic show and a boat ride, which some visitors find jarring.',
    'Security is airport-grade and nothing electronic is permitted — no phones, no cameras, no bags. Factor in the queue.'
  ],
  see: [
    { n: 'The main monument',
      d: 'Pink sandstone and white marble, two hundred and thirty-four carved pillars, and a plinth of a hundred and forty-eight full-size elephants.' },
    { n: 'The step-well courtyard',
      d: 'A modern interpretation of a baoli, used for the evening water show.' },
    { n: 'The musical fountain', t: 'after dark',
      d: 'A narrated water and light performance in the step-well. Earnest and well executed.' }
  ],
  when: 'October to March. Closed Mondays. Allow an hour for security.',
  stay: 'Three hours including the exhibitions.',
  move: 'Akshardham metro, directly outside. Leave your phone behind or use the lockers.',
  eat: 'A large vegetarian food court on site.'
},

'DEL-hauz-khas': {
  intro: [
    'Alauddin Khalji built a reservoir here around 1300 to water his new city of Siri. Firoz Shah Tughlaq later added a madrasa along two sides of it and was buried in the corner, which is why a fourteenth-century Islamic college now overlooks a lake with a bar district behind it.',
    'The village filled with galleries and boutiques in the 1980s and with bars in the 2000s. The combination of a medieval tomb, a deer park and a cocktail is unique to Delhi and faintly absurd.'
  ],
  see: [
    { n: 'The madrasa and Firoz Shah’s tomb',
      d: 'Free, open till sunset, and best in the last hour of light with the lake below. The arcades run a considerable distance along the water.' },
    { n: 'The deer park',
      d: 'Adjoining, with actual spotted deer, rabbits and a great many birds. Good for a morning walk.' },
    { n: 'The village after dark',
      d: 'Galleries, designer shops and a dense strip of rooftop bars. Busy from about nine.' }
  ],
  when: 'Year round. The monument closes at sunset; the village starts after it.',
  stay: 'An afternoon into an evening.',
  move: 'Green Park metro and a ten-minute walk.',
  eat: 'A wide and uneven selection. The rooftops with a view of the lake charge for it.'
},

/* ===================== UTTAR PRADESH, continued ===================== */
'UTP-fatehpur-sikri': {
  intro: [
    'Akbar built a new capital here between 1571 and 1585 in red sandstone, on a ridge above a lake, and then left it. The usual explanation is water — the lake could not supply the city — though a campaign in the northwest also drew the court away. Either way it was occupied for about fourteen years and has stood more or less empty since.',
    'That makes it the most complete Mughal city anywhere. Nothing was built over it and nothing adapted, so the layout of courts, palaces and audience halls survives as designed.',
    'The architecture is the clearest statement of Akbar’s religious syncretism: Hindu brackets, Jain columns, Islamic arches and Gujarati carving in the same buildings, by intention rather than accident.'
  ],
  see: [
    { n: 'Diwan-i-Khas',
      d: 'A single enormous carved central pillar supporting a circular platform with four bridges to the corners, where Akbar is said to have sat above representatives of different faiths debating below.' },
    { n: 'The Panch Mahal',
      d: 'Five open storeys of diminishing size on columns, no two carved alike. Probably a pleasure pavilion for the women of the court.' },
    { n: 'Jama Masjid and the Buland Darwaza',
      d: 'The congregational mosque, still in use, entered through a fifty-four-metre triumphal gateway among the tallest in the world.' },
    { n: 'Salim Chishti’s tomb',
      d: 'White marble in the mosque courtyard, with carved screens of extraordinary fineness. Akbar built the city here because the saint correctly predicted him a son.' },
    { n: 'Jodha Bai’s palace',
      d: 'The largest residential building, around a courtyard, and the most obviously Hindu in its detailing.' }
  ],
  when: 'October to March. Go in the afternoon from Agra and stay for the light on the sandstone.',
  stay: 'Half a day. The guides at the gate are worth taking; agree the fee first.',
  move: 'Forty kilometres from Agra, about an hour. The mosque complex is free; the palace complex is ticketed.',
  eat: 'Nothing good at the site. Eat in Agra.'
},

'UTP-sarnath': {
  intro: [
    'After his enlightenment at Bodh Gaya the Buddha walked to Sarnath and preached his first sermon to five former companions, setting out the four noble truths. That event — the first turning of the wheel of dharma — makes this one of the four great Buddhist pilgrimage sites, inscribed by UNESCO in 2026.',
    'Ashoka built here in the third century BC, and it was his pillar at Sarnath whose lion capital became the emblem of the Republic of India. The capital itself is in the site museum a few hundred metres from where it stood.',
    'The site was destroyed around the twelfth century and excavated from 1835. What remains is the enormous Dhamek Stupa, the foundations of monasteries, and a calm that is startling after the lanes of Varanasi ten kilometres away.'
  ],
  see: [
    { n: 'The Dhamek Stupa',
      d: 'Forty-three metres of brick and stone from around 500 AD, with carved floral bands on the lower section, marking the spot of the first sermon.' },
    { n: 'The archaeological museum',
      d: 'Holds the Lion Capital — the original, in polished Chunar sandstone with a mirror finish nobody has fully explained — and an outstanding collection of Gupta Buddhas.' },
    { n: 'Mulagandha Kuti Vihara',
      d: 'A twentieth-century temple with murals by a Japanese artist and a sapling of the Bodhi tree in the garden.' },
    { n: 'The modern monasteries',
      d: 'Thai, Tibetan, Burmese and Japanese foundations around the site, each in its own national style.' }
  ],
  when: 'October to March. Buddha Purnima in May draws large numbers.',
  stay: 'Half a day from Varanasi. The museum is closed on Fridays.',
  move: 'Ten kilometres from Varanasi, half an hour by auto.',
  eat: 'Simple vegetarian places near the gate, and Tibetan food at the monasteries.'
},

'UTP-lucknow': {
  intro: [
    'Lucknow was the capital of Awadh, and under the Nawabs in the eighteenth and nineteenth centuries it developed a courtly culture — in language, manners, music, dance and food — that Indians still invoke as a standard. The phrase pehle aap, after you, is a joke about Lucknawi politeness that is also basically true.',
    'The British annexed Awadh in 1856, one of the direct causes of the uprising the following year, and the Residency where the British community was besieged for five months has been left exactly as it was: shell-scarred, roofless and overgrown.',
    'The food is the other reason to come and is not negotiable. Galouti kebabs were reputedly invented for a toothless Nawab and are made with meat minced to a paste with papaya and around a hundred spices.'
  ],
  see: [
    { n: 'Bara Imambara and the Bhul Bhulaiya',
      d: 'A vast vaulted hall built in 1784 as famine relief work — the roof spans fifty metres with no beams — above a labyrinth of passages in the walls. Take the official guide; people genuinely get lost.' },
    { n: 'The Residency',
      d: 'Left as a ruin since 1857, with cannon damage, a cemetery and a museum. One of the more sobering colonial sites in India and beautifully overgrown.' },
    { n: 'Chota Imambara',
      d: 'Smaller, later and far more decorated — chandeliers, gilt and calligraphy covering the facade. Lit during Muharram.' },
    { n: 'Chikankari workshops',
      d: 'The city’s shadow-work embroidery, done by hand on fine cotton. Chowk has the shops; some will show you the stitching.' },
    { n: 'Eating in Chowk and Aminabad',
      d: 'Tunday’s galouti, nihari-kulcha in the morning, kulfi afterwards, and the paan to finish.' }
  ],
  when: 'October to March. Muharram is significant here and observed seriously.',
  stay: 'Two nights.',
  move: 'Good rail and air links, and a metro. Autos and app cabs within the city.',
  eat: 'Awadhi cooking is slower, milder and more aromatic than Mughlai — dum pukht, a lighter biryani than Hyderabad’s, and the kebabs.'
},

'UTP-mathura-vrindavan': {
  intro: [
    'Mathura is where Krishna was born, in a prison cell by tradition, and Vrindavan ten kilometres away is where he grew up among the cowherds. Together they form the heart of the Braj region, which has a devotional culture of its own — unusually musical, unusually playful, organised around a god who is a mischievous child rather than a remote figure.',
    'Vrindavan has something over five thousand temples, from enormous modern constructions to lanes where every third doorway is a shrine. It also has a large population of widows who come here to live out their lives, and a famously assertive population of monkeys that will take your glasses.',
    'Holi here is not a normal Holi. It runs for over a week across Braj, including one at Barsana where women drive men off with sticks, and the colour at the Banke Bihari temple is less a festival than a condition.'
  ],
  see: [
    { n: 'Banke Bihari Temple',
      d: 'The most beloved and most crowded. The curtain over the deity is drawn and closed every few minutes so no one can hold his gaze too long. Go early and hold on to your belongings.' },
    { n: 'Prem Mandir',
      d: 'A modern marble temple lit theatrically after dark, with dioramas of Krishna’s life. Popular, polished and oddly moving at night.' },
    { n: 'Krishna Janmabhoomi, Mathura',
      d: 'Built beside the mosque on the disputed site. Heavy security, no phones, and a sensitive atmosphere.' },
    { n: 'Vishram Ghat at dusk',
      d: 'Evening aarti on the Yamuna, quieter and more local than Varanasi or Haridwar.' },
    { n: 'Govardhan Hill',
      d: 'A twenty-one kilometre barefoot circumambulation pilgrims do in a day. Even a short stretch gives you the devotional temperature of Braj.' }
  ],
  when: 'October to March. Holi in March and Janmashtami in August or September are the two great occasions and both are extremely crowded.',
  stay: 'One or two nights, or a long day trip from Agra or Delhi.',
  move: 'On the Delhi–Agra line, about three hours from Delhi. Autos between the two towns.',
  eat: 'Strictly vegetarian. Mathura’s pedas are the local sweet; the kachoris and lassi near the ghats are very good.'
},

'UTP-prayagraj': {
  intro: [
    'Prayagraj — Allahabad until 2018 — stands at the Triveni Sangam, where the Ganges and the Yamuna meet the mythical Saraswati. The two visible rivers meet at a point where the colours do not mix for some distance, which you can see clearly from a boat.',
    'Every twelve years the Kumbh Mela here becomes the largest gathering of human beings on the planet — tens of millions over several weeks, in a temporary city built on the floodplain with its own roads, power and sanitation. A smaller Magh Mela happens annually and an Ardh Kumbh every six years.',
    'Outside the melas it is a quiet university city with a strong colonial-era legal and intellectual tradition; three prime ministers came from here.'
  ],
  see: [
    { n: 'The Sangam by boat',
      d: 'Row out to the confluence line, where pilgrims bathe from platforms. The colour difference between the clear green Yamuna and the silty Ganges is unmistakable.' },
    { n: 'Akbar’s fort',
      d: 'Largely army-occupied, but the Ashokan pillar inside and the underground Patalpuri temple are accessible.' },
    { n: 'Anand Bhavan',
      d: 'The Nehru family home, now effectively a museum of the independence movement’s domestic side.' },
    { n: 'Khusro Bagh',
      d: 'A walled Mughal garden with three large tombs, including that of Jahangir’s rebellious son. Rarely visited.' }
  ],
  when: 'November to February. The Magh Mela runs in January and February. If a Kumbh falls during your trip, everything else here is irrelevant — go.',
  stay: 'One or two nights.',
  move: 'Major rail junction and an airport. Autos within the city.',
  eat: 'Simple north Indian; the chaat around Civil Lines is good.'
},

'UTP-ayodhya': {
  intro: [
    'Ayodhya is held by tradition to be the birthplace of Rama and the capital of his kingdom, and it has been the most politically consequential piece of ground in modern India. The Babri Masjid that stood on the disputed site was demolished in 1992, and a temple was consecrated in 2024 after a Supreme Court judgment in 2019.',
    'The town itself is small, old and full of temples and ghats along the Sarayu. It is being rapidly rebuilt — new roads, a new airport, a new station — in anticipation of very large pilgrim numbers.',
    'It is worth approaching with some awareness of what has happened here rather than as a straightforward sight.'
  ],
  see: [
    { n: 'The Ram Mandir',
      d: 'Consecrated in 2024 and still under construction in parts. Security is heavy, nothing electronic is permitted, and queues can be long.' },
    { n: 'Hanuman Garhi',
      d: 'A fortified temple on a mound reached by seventy-six steps, older and more atmospheric than the new construction, and traditionally visited first.' },
    { n: 'The Sarayu ghats',
      d: 'Evening aarti, quieter than Varanasi with the same form of ceremony.' },
    { n: 'Kanak Bhavan',
      d: 'A nineteenth-century temple with silver-faced shrines, said to stand where Sita’s palace was.' }
  ],
  when: 'October to March. Ram Navami and Diwali — when the ghats are lit with hundreds of thousands of lamps — are the biggest occasions.',
  stay: 'One night.',
  move: 'New airport and upgraded rail links. Autos and e-rickshaws in town.',
  eat: 'Strictly vegetarian, simple and cheap.'
},

'UTP-dudhwa': {
  intro: [
    'Dudhwa sits on the Nepal border in the terai — the belt of tall grassland and sal forest along the base of the Himalaya that was malarial swamp until the 1950s and is now one of the last places this habitat survives at scale.',
    'It has tiger, leopard, swamp deer in large numbers, and a reintroduced population of one-horned rhino brought from Assam in the 1980s. It gets a fraction of the visitors of the central Indian parks.',
    'Its creation owes a great deal to Billy Arjan Singh, a hunter turned conservationist who lived on the boundary and hand-raised a tigress and a leopard to release into the wild.'
  ],
  see: [
    { n: 'The grassland drives',
      d: 'Swamp deer in herds of hundreds, the park’s signature sight, and hog deer, which are hard to see anywhere else.' },
    { n: 'The rhino enclosure at Salukhapur',
      d: 'A fenced area where the reintroduced population lives, viewed from elephant back.' },
    { n: 'Birding',
      d: 'Over four hundred and fifty species, including Bengal florican and swamp francolin, both of which bring specialists here.' },
    { n: 'Tharu villages on the boundary',
      d: 'The indigenous community of the terai, with distinctive mud-and-grass architecture.' }
  ],
  when: 'Opens around mid-November, closed through the monsoon. February to April is best.',
  stay: 'Two nights.',
  move: 'Railhead at Dudhwa or Palia; around six hours from Lucknow. Accommodation is mostly forest rest houses, booked in advance.',
  eat: 'Rest house kitchens. Carry what you need.'
},

'UTP-chitrakoot': {
  intro: [
    'Chitrakoot straddles the Uttar Pradesh and Madhya Pradesh border in forested hill country, and tradition holds that Rama, Sita and Lakshmana spent eleven of their fourteen years of exile here. It is one of the most devotionally significant and least visited places in north India.',
    'The Mandakini river runs through it with ghats along the bank, and the surrounding hills hold caves, waterfalls and shrines that people walk between. It is quiet in a way almost nowhere on the Gangetic plain is.'
  ],
  see: [
    { n: 'Ramghat at dusk',
      d: 'The main ghat on the Mandakini, with boats and a ceremony that has perhaps a hundredth of Varanasi’s crowd.' },
    { n: 'Kamadgiri', t: 'a five-kilometre parikrama',
      d: 'A forested hill circled barefoot by pilgrims, with shrines along the route and monkeys throughout.' },
    { n: 'Gupt Godavari',
      d: 'Two caves, one of which you wade through ankle-deep water to enter. Strange and atmospheric.' },
    { n: 'Hanuman Dhara',
      d: 'A spring on a cliff face reached by a long stair, with a view over the whole valley.' }
  ],
  when: 'October to March. New moon days bring large pilgrim numbers.',
  stay: 'One or two nights.',
  move: 'Karwi is the railhead, eight kilometres away. Autos locally.',
  eat: 'Simple vegetarian. Nothing elaborate.'
},

'UTP-kushinagar': {
  intro: [
    'Kushinagar is where the Buddha died, aged about eighty, lying on his right side between two sal trees, and where he was cremated. It is the fourth of the great pilgrimage sites and the quietest of them.',
    'The main shrine holds a six-metre reclining Buddha carved from a single block of sandstone in the fifth century, found in pieces in 1876 and reassembled. The face is said to change expression depending on where you stand — sorrowful from one end, smiling from the other.'
  ],
  see: [
    { n: 'The Mahaparinirvana Temple',
      d: 'The reclining Buddha, draped in cloth donated by pilgrims and changed through the day. Go early for quiet.' },
    { n: 'Ramabhar Stupa',
      d: 'A large brick mound a kilometre away marking the cremation site. Monks circumambulate it at dawn; it is the more moving of the two.' },
    { n: 'The international monasteries',
      d: 'Burmese, Thai, Japanese, Tibetan and Chinese foundations, several with guest houses.' }
  ],
  when: 'October to March. Very hot in summer.',
  stay: 'One night.',
  move: 'Gorakhpur is the nearest major railhead, about fifty kilometres. A regional airport has opened nearby.',
  eat: 'Monastery guest houses and a few simple restaurants.'
},

'UTP-jhansi': {
  intro: [
    'Jhansi fort stands on a rocky outcrop in the middle of the town, and it is attached to one of the defining figures of 1857: Rani Lakshmibai, widowed, refused a succession under the doctrine of lapse, who took command of the state and died in battle at Gwalior in 1858 at about twenty-nine.',
    'The fort is seventeenth-century Bundela work with ten gates, and the town below is mostly a transit point — but it is the obvious base for Orchha, eighteen kilometres away.'
  ],
  see: [
    { n: 'Jhansi Fort',
      d: 'Ramparts, a cannon called Kadak Bijli, and the spot from which the Rani is said to have ridden her horse off the wall with her adopted son on her back.' },
    { n: 'The Rani Mahal',
      d: 'Her palace in the town, now a small museum with painted ceilings.' },
    { n: 'Orchha', t: 'the real reason to stop',
      d: 'Half an hour away, and far pleasanter to sleep in.' }
  ],
  when: 'October to March.',
  stay: 'A night en route, or stay at Orchha instead.',
  move: 'A major station on the Delhi–Mumbai line and the usual railhead for Khajuraho and Orchha.',
  eat: 'Basic north Indian; Orchha has pleasanter options.'
},

'UTP-orchha-approach': {
  intro: [
    'Bateshwar is a kilometre of over a hundred sandstone temples along the Yamuna, built by the Gurjara-Pratihara dynasty between the eighth and tenth centuries, and almost all of them were rubble by the twentieth.',
    'What makes the site remarkable is the restoration. From 2005 an Archaeological Survey team rebuilt around eighty of the temples by hand, sorting the collapsed blocks and fitting them back like jigsaw pieces — work carried out partly in negotiation with the dacoits who then controlled the ravines.'
  ],
  see: [
    { n: 'The temple cluster',
      d: 'Small shrines in rows up a hillside, most rebuilt from their own fallen stones. The scale is modest and the achievement is not.' },
    { n: 'The ravines',
      d: 'The Chambal badlands around the site, until recently the most notorious bandit country in India.' },
    { n: 'A Chambal river safari',
      d: 'Gharial, Gangetic dolphin and skimmers on a clean river, run from the Dholpur or Agra side.' }
  ],
  when: 'October to March.',
  stay: 'Half a day from Agra or Gwalior.',
  move: 'Roughly seventy kilometres from Agra by road. A car is necessary.',
  eat: 'Nothing on site. Carry food.'
},

/* ===================== RAJASTHAN, continued ===================== */
'RAJ-ranthambore': {
  intro: [
    'Ranthambore is where tiger photography became a global pursuit. The combination of relatively open dry forest, a population habituated to vehicles, and a tenth-century fort standing in the middle of the park produced images in the 1980s and 90s that changed how the world pictured wild tigers.',
    'The fort matters more than as a backdrop. It is a World Heritage site in its own right, with temples still in worship, and tigers move through its gates and along its walls.',
    'The park is divided into zones allocated by lottery when you book. Zones one to five are the historic core and are generally considered better; the outer zones are quieter and can be excellent.'
  ],
  see: [
    { n: 'A safari, booked well ahead',
      d: 'Morning and afternoon slots in a six-seat gypsy or a twenty-seat canter. Book the gypsy, months in advance in season. One drive is a lottery; three gives you a real chance.' },
    { n: 'Ranthambore Fort',
      d: 'Free and separate from the safari. A steep climb through gates to temples, tanks and ruins with vultures overhead and a view across the whole park.' },
    { n: 'The lakes',
      d: 'Padam Talao and Rajbagh, with ruined pavilions standing in the water, where the classic photographs are taken and where tigers drink in the heat.' },
    { n: 'Trinetra Ganesh Temple',
      d: 'Inside the fort and genuinely busy with pilgrims, who send wedding invitations to the deity by post.' }
  ],
  when: 'October to June; closed for the monsoon. April to June is uncomfortable and much the best for sightings as water concentrates.',
  stay: 'Two nights minimum for three drives.',
  move: 'Sawai Madhopur is on the Delhi–Mumbai line, about four hours from Jaipur. Book permits online in advance.',
  eat: 'Hotel food; the town has basic options.'
},

'RAJ-pushkar': {
  intro: [
    'Pushkar is built around a small lake said to have formed where Brahma dropped a lotus flower, and it holds one of very few temples to Brahma anywhere — he is almost never worshipped directly. Fifty-two ghats ring the water and a circuit takes about half an hour.',
    'It is a strict town: vegetarian, alcohol-free and egg-free by local rule, with shoes removed near the ghats. It has also been firmly on the traveller circuit since the 1960s, which gives the bazaar a particular mix of pilgrims, sadhus and backpackers.',
    'Once a year in the lunar month of Kartik the camel fair turns a town of twenty thousand into a temporary city with tens of thousands of animals, traders and visitors.'
  ],
  see: [
    { n: 'The ghats at dawn or dusk',
      d: 'Walk the circuit. Be firm with the self-appointed priests who press a flower on you and then demand a substantial donation — the so-called Pushkar passport.' },
    { n: 'Brahma Temple',
      d: 'Fourteenth-century in its current form, with a silver turtle set in the floor and a red spire.' },
    { n: 'Savitri Temple at sunrise',
      d: 'On a hill above the town, reached by a long stair or a cable car, with the lake on one side and the desert on the other.' },
    { n: 'The camel fair', t: 'October or November',
      d: 'Trading, racing, moustache competitions and an enormous encampment. Book months ahead.' }
  ],
  when: 'October to March. The fair dates shift with the lunar calendar — check them well in advance.',
  stay: 'Two nights, or longer if you fall into the pace, which many do.',
  move: 'Half an hour from Ajmer, on the main line. The town is walked.',
  eat: 'Vegetarian only. The rooftop cafés are pleasant; malpua at Halwai Gali is the local sweet.'
},

'RAJ-bikaner': {
  intro: [
    'Bikaner was founded in 1488 on the caravan route across the Thar and grew rich on it. Junagarh Fort, unusually, is not on a hill — it sits on the flat, was never taken by force, and the interiors are among the best preserved in Rajasthan because nobody ever sacked them.',
    'The city has a strong camel culture, including a government research farm, and a reputation for fried snacks taken seriously across north India — bhujia from here is a national product.',
    'Thirty kilometres away at Deshnoke is the Karni Mata temple, where some twenty-five thousand rats are venerated, fed and allowed to run everywhere. You go in barefoot.'
  ],
  see: [
    { n: 'Junagarh Fort',
      d: 'Thirty-seven palaces inside, with lacquer work, gold leaf, Dutch tiles and a First World War biplane in a hall. The audio guide is good.' },
    { n: 'Karni Mata Temple, Deshnoke',
      d: 'The rat temple. Barefoot, on a floor of running rats, with milk bowls. Seeing a white rat is considered very fortunate.' },
    { n: 'The old city havelis',
      d: 'Red sandstone merchant houses in narrow lanes behind the fort, carved and largely unrestored.' },
    { n: 'The camel research farm',
      d: 'Government-run, open in the afternoons, with camel milk ice cream that is better than it sounds.' }
  ],
  when: 'October to March. The camel festival is in January.',
  stay: 'Two nights.',
  move: 'Overnight train from Delhi or Jaipur. Autos locally.',
  eat: 'Bhujia, kachoris and the fried snack shops around Kote Gate. The thali here is excellent.'
},

'RAJ-chittorgarh': {
  intro: [
    'Chittorgarh is the largest fort in India by area — about three hundred hectares on a plateau rising a hundred and eighty metres from the plain — and the most freighted. It was the Sisodia capital, besieged and taken three times, and on each occasion the defending men rode out to die and the women inside committed jauhar rather than be captured.',
    'That history is why Mewar moved the capital to Udaipur in 1559, and why Chittorgarh remains a place of pilgrimage for Rajputs rather than simply a monument.',
    'The fort is enormous and you drive or cycle between its buildings. The Tower of Victory, nine storeys of carved sandstone built in 1448, is the set piece.'
  ],
  see: [
    { n: 'Vijay Stambh',
      d: 'Thirty-seven metres, built to commemorate a victory over Malwa, covered inside and out with sculpture. You can climb the internal stair.' },
    { n: 'Kirti Stambh',
      d: 'An older and smaller Jain tower from the twelfth century, with tirthankaras up its faces.' },
    { n: 'Rana Kumbha Palace',
      d: 'Ruined, and the site of the first jauhar, with underground cellars where it is said to have taken place.' },
    { n: 'Padmini’s Palace',
      d: 'A pavilion in a water tank attached to the legend of Alauddin Khalji glimpsing the queen in a mirror. The story is probably literary; the setting is lovely.' },
    { n: 'Meera Temple',
      d: 'Associated with the mystic poet Meerabai, and still in worship.' }
  ],
  when: 'October to March. The fort is exposed and has very little shade.',
  stay: 'Half a day; a night if breaking the Udaipur–Jaipur journey.',
  move: 'On the main line between Udaipur and Delhi. Hire an auto for the circuit inside.',
  eat: 'Basic. Eat before or after.'
},

'RAJ-kumbhalgarh': {
  intro: [
    'Kumbhalgarh has thirty-six kilometres of wall running along the ridgelines of the Aravallis, the second-longest continuous wall in the world after China’s. In places it is wide enough for eight horses abreast.',
    'Built in the fifteenth century by Rana Kumbha, it was taken only once — and then only because the water supply was poisoned — and served as the refuge of Mewar whenever Chittorgarh or Udaipur fell. Maharana Pratap was born here.',
    'The fort sits in a wildlife sanctuary of dry deciduous forest with leopard, wolf and sloth bear, which makes the approach more interesting than most.'
  ],
  see: [
    { n: 'Walking the wall',
      d: 'From the main gate you can get onto the ramparts and walk a considerable distance with the plains dropping away. This is the thing to come for.' },
    { n: 'Badal Mahal',
      d: 'The cloud palace at the top, pastel-painted inside, with a view that on a clear day reaches into the Thar.' },
    { n: 'The temples inside',
      d: 'Over three hundred, Jain and Hindu, scattered through the enclosure. Most are empty and unlabelled.' },
    { n: 'The sanctuary',
      d: 'Jeep safaris and guided walks. Wolf sightings are a genuine possibility, which is rare in India.' },
    { n: 'Ranakpur', t: 'half an hour away',
      d: 'The great Jain temple of fourteen hundred pillars. Combine the two in a day from Udaipur.' }
  ],
  when: 'October to March. The evening light and sound show is well done.',
  stay: 'A long day trip from Udaipur, or a night nearby for the sanctuary.',
  move: 'About two hours from Udaipur on a good road through the hills.',
  eat: 'A few places at the gate; better to carry a picnic.'
},

'RAJ-mount-abu': {
  intro: [
    'Mount Abu is Rajasthan’s only hill station, at twelve hundred metres on an isolated granite massif in the Aravallis, and functions mostly as a cool-weather escape for Gujarati and Rajasthani families.',
    'The reason to make the climb is the Dilwara temples — five Jain temples built between the eleventh and thirteenth centuries in white marble, carved so finely that in places the stone is translucent. Craftsmen were reputedly paid by the weight of marble dust removed, which encouraged a particular kind of obsessiveness.',
    'Photography is prohibited inside, which is mildly frustrating and probably why the carving is in the condition it is.'
  ],
  see: [
    { n: 'Dilwara Temples', t: 'afternoons for non-Jains',
      d: 'Vimal Vasahi and Luna Vasahi are the two great ones — ceilings cut into concentric rings of figures with a central pendant that appears to hang from nothing. Leave leather and cameras outside.' },
    { n: 'Nakki Lake',
      d: 'A small lake in the middle of town with boats and snack stalls. Pleasant rather than remarkable.' },
    { n: 'Guru Shikhar',
      d: 'The highest point in the Aravallis, quieter than the official Sunset Point, which is extremely busy.' },
    { n: 'Achalgarh Fort',
      d: 'A ruined fort and an old Shiva temple a few kilometres out, usually empty.' }
  ],
  when: 'October to March, and again in the hot season when the plains are unbearable. Avoid Diwali and summer holidays.',
  stay: 'Two nights.',
  move: 'Abu Road is the railhead, an hour below by a winding road.',
  eat: 'Gujarati and Rajasthani thalis, aimed at a domestic holiday crowd.'
},

'RAJ-bundi': {
  intro: [
    'Bundi sits in a narrow valley below a fort, and its palace holds the best surviving Rajput wall painting anywhere — the Bundi school of miniature, enlarged onto walls and ceilings, in blues and greens that have held their colour for three hundred years.',
    'The town is blue-washed like Jodhpur, has a stepwell on nearly every corner, and sees a fraction of the traffic the famous Rajasthani cities do. Kipling stayed here and wrote part of Kim.',
    'The palace is semi-ruined and partly overrun by a large and confident troop of langurs, which is either charming or a problem depending on your sandwiches.'
  ],
  see: [
    { n: 'The Chitrashala',
      d: 'A gallery of painted chambers inside Garh Palace, open to the sky on one side. The best Rajput murals in India, and usually you will be alone in them.' },
    { n: 'Taragarh Fort',
      d: 'Above the palace, overgrown and atmospheric, with vast cisterns cut into the rock and a view down the valley.' },
    { n: 'Raniji ki Baori',
      d: 'A forty-six metre stepwell of 1699 with carved elephants on the piers — the finest of the fifty or so in town.' },
    { n: 'The blue lanes and Nawal Sagar',
      d: 'A small lake with a half-submerged temple, and the painted houses above it.' }
  ],
  when: 'October to March.',
  stay: 'Two nights. Bundi is a place people intend to pass through and then stay in.',
  move: 'Kota is the nearest major railhead, about forty minutes. The town is walked.',
  eat: 'Small family-run places and guest house rooftops. Nothing fancy and all of it fine.'
},

'RAJ-keoladeo': {
  intro: [
    'Keoladeo was created in the 1890s as a duck-shooting reserve for the Maharaja of Bharatpur, who flooded a natural depression to attract birds for his guests. Record bags in the 1930s ran to several thousand birds in a day, and a stone plaque still lists them.',
    'Shooting stopped in 1972 and it became a national park in 1982. It is now one of the great wetland bird sites of Asia — around three hundred and seventy species, with huge numbers of wintering waterfowl, painted storks nesting in colonies, and historically the last Indian wintering ground of the Siberian crane, not recorded here since 2002.',
    'It is entirely flat, has no vehicles beyond cycle rickshaws, and is one of the few major Indian wildlife sites you can walk.'
  ],
  see: [
    { n: 'A cycle rickshaw with a trained guide',
      d: 'The rickshaw drivers inside the park are licensed naturalists and extremely good. This is the standard and the best way to see it.' },
    { n: 'Walking the main bund at dawn',
      d: 'Two kilometres of raised path with water on both sides. Painted storks, spoonbills, darters, and a great deal of noise from the heronries.' },
    { n: 'Birding by boat',
      d: 'When water levels allow, a flat-bottomed boat gets you into the reed channels.' },
    { n: 'The quieter back trails',
      d: 'Rock pythons near the culverts, and jackal, nilgai and fishing cat away from the main bund.' }
  ],
  when: 'November to February for wintering birds; August to October for breeding colonies. Avoid summer, when much of it dries out.',
  stay: 'A full day, two if you are serious about birds. Often combined with Agra, fifty kilometres away.',
  move: 'Bharatpur is on the Delhi–Mumbai line. Hire a rickshaw and guide at the gate; bring binoculars.',
  eat: 'A couple of places at the gate; the hotels nearby are better.'
},

'RAJ-ranakpur': {
  intro: [
    'The Chaumukha temple at Ranakpur was begun in 1437 and took around fifty years. It has one thousand four hundred and forty-four marble pillars, and the standing claim is that no two are carved alike — people have checked.',
    'The plan is four-faced, open on all sides to the tirthankara in the centre, with twenty-nine halls and over eighty domes at varying heights, producing an interior where light comes from everywhere and nothing blocks the view of the sanctum from any pillar.',
    'It sits in a forested valley in the Aravallis with almost nothing else around it, which makes the scale of what was built here harder to account for and more impressive.'
  ],
  see: [
    { n: 'The main hall',
      d: 'Walk the perimeter, then stand in the centre. The ceiling carvings — concentric, deeply undercut, each different — are the thing to look up at.' },
    { n: 'The Parshvanath temple',
      d: 'Beside the main one, with an extraordinary sculpture of a thousand-headed serpent whose coils cannot be untangled by eye.' },
    { n: 'The sun temple and the forest',
      d: 'A smaller shrine nearby, and the Kumbhalgarh sanctuary beginning at the edge of the complex.' }
  ],
  when: 'October to March. Non-Jains are admitted from around noon; mornings are reserved for worship. Leather must be left outside.',
  stay: 'Two hours, usually combined with Kumbhalgarh.',
  move: 'About two and a half hours from Udaipur, ninety minutes from Kumbhalgarh.',
  eat: 'A simple Jain canteen serves a thali at lunchtime.'
},

'RAJ-jawai': {
  intro: [
    'Jawai is a landscape of granite hills and scrub around a dam in Pali district, and leopards live in the caves and crevices of those hills in unusual density — perhaps fifty animals in a relatively small area — alongside Rabari herders and their livestock.',
    'What makes it remarkable is that there is no fence and essentially no conflict. The Rabari regard the leopards as belonging to the local deity and do not retaliate when stock is taken, and the leopards do not attack people. The arrangement has held for generations and is studied as an example of coexistence.',
    'It became a luxury safari destination in the 2010s and the camps are expensive. The wildlife is genuinely there regardless.'
  ],
  see: [
    { n: 'Leopard watching at dawn and dusk',
      d: 'Open jeeps with trackers who know individual animals by sight. Sightings are good by Indian leopard standards.' },
    { n: 'The Rabari',
      d: 'Visiting a herding family with a guide who actually knows them is the more interesting half of the trip.' },
    { n: 'The dam and its birds',
      d: 'Flamingos, cranes and a large crocodile population in the reservoir.' },
    { n: 'The hill temples',
      d: 'Small shrines in the rocks, several of which leopards also use.' }
  ],
  when: 'October to March. Summer is extreme.',
  stay: 'Two nights.',
  move: 'Three hours from Udaipur or two from Jodhpur. Camps arrange transfers.',
  eat: 'Camp kitchens, generally very good.'
},

'RAJ-shekhawati': {
  intro: [
    'Shekhawati is a cluster of desert towns north of Jaipur — Mandawa, Nawalgarh, Fatehpur, Ramgarh and others — whose Marwari merchant families grew enormously wealthy in the nineteenth century on the trade routes, and covered their havelis inside and out with painted frescoes.',
    'The subjects are a record of a world changing fast: Krishna and Rama alongside steam trains, hot air balloons, gramophones, bicycles and Englishmen in hats, often painted by artists who had never seen any of them.',
    'Then the trade moved to the ports, the families moved to Bombay and Calcutta, and the houses were left to caretakers. Many are now crumbling, some have been restored as hotels, and a good few are simply locked.'
  ],
  see: [
    { n: 'Nawalgarh',
      d: 'The densest concentration, including the restored Podar Haveli museum and the Morarka Haveli.' },
    { n: 'Mandawa',
      d: 'The most visited and most geared up for it, with a fort hotel and several accessible havelis.' },
    { n: 'Fatehpur',
      d: 'Home to a haveli restored by a French artist, and some of the best unrestored painting in the region.' },
    { n: 'Walking with a caretaker',
      d: 'Many havelis are locked and the caretaker will open them for a small tip. This is how you see the best interiors.' }
  ],
  when: 'October to March. The desert is cold at night in December and January.',
  stay: 'Two nights based in Nawalgarh or Mandawa, with a car for the circuit.',
  move: 'Three to four hours from Jaipur or Delhi. A car is close to essential; towns are tens of kilometres apart.',
  eat: 'Haveli hotel kitchens, mostly Rajasthani, and some very good ones.'
},

'RAJ-ajmer': {
  intro: [
    'The dargah of Khwaja Moinuddin Chishti is the most important Sufi shrine in South Asia. He arrived in the twelfth century, and the order he founded shaped Islam across the subcontinent — Akbar walked here from Agra on pilgrimage more than once.',
    'What is distinctive is who comes. Muslims and Hindus both, in very large numbers, along with Sikhs and Christians; the Chishti tradition of openness is taken seriously and the shrine has never been exclusive.',
    'The urs, marking the saint’s death anniversary, draws hundreds of thousands over six days. Qawwali is sung at the shrine every evening regardless.'
  ],
  see: [
    { n: 'The dargah at dusk',
      d: 'Cover your head, go through the bazaar of rose petals and offerings, and sit for the qawwali after sunset. Be prepared for pressure to donate; a firm no is fine.' },
    { n: 'Adhai Din ka Jhonpra',
      d: 'A twelfth-century mosque built on the site of a Sanskrit college, reusing its pillars, with a screen of seven arches and some of the earliest Islamic architecture in India.' },
    { n: 'Ana Sagar Lake',
      d: 'An artificial lake of 1135 with marble pavilions added by Shah Jahan on the bund.' },
    { n: 'Pushkar',
      d: 'Over the hill, half an hour away, and a complete change of register.' }
  ],
  when: 'October to March. The urs falls in the Islamic month of Rajab and the city is overwhelmed.',
  stay: 'A day, usually combined with Pushkar.',
  move: 'On the main line from Delhi and Jaipur. The dargah area is walked; leave bags at the hotel.',
  eat: 'The lanes around the dargah do excellent kebabs and biryani, a change from vegetarian Pushkar next door.'
},

'RAJ-sariska': {
  intro: [
    'Sariska is a cautionary tale and a recovery. By 2004 careful surveys established that poaching had removed every single tiger from the reserve, which the forest department had not noticed. It was the scandal that forced a national rethink of tiger monitoring.',
    'From 2008 tigers were flown in from Ranthambore — the first time tigers had been relocated to repopulate a reserve anywhere — and the population has slowly re-established, though not without setbacks including a poisoning.',
    'The park is dry deciduous forest in the Aravallis with ruined temples, a hilltop fort and a seventeenth-century palace inside it, and it is very close to Delhi.'
  ],
  see: [
    { n: 'A safari',
      d: 'Sightings are less reliable than Ranthambore. Treat it as a forest drive with a chance of a tiger rather than the other way round.' },
    { n: 'Kankwari Fort',
      d: 'Deep inside the park, where Aurangzeb is said to have imprisoned his brother Dara Shikoh. Jeep access, permit required.' },
    { n: 'Neelkanth temples',
      d: 'A cluster of ninth and tenth-century ruins in the forest on the edge of the reserve.' },
    { n: 'Bhangarh',
      d: 'A ruined seventeenth-century town nearby with a formidable reputation for being haunted, and an official sign prohibiting entry after dark.' }
  ],
  when: 'October to June. Closed some days midweek for part of the year.',
  stay: 'A night, or a long day from Delhi or Jaipur.',
  move: 'Around four hours from Delhi, two and a half from Jaipur.',
  eat: 'Hotel food on the approach road.'
},

'RAJ-osian': {
  intro: [
    'Osian was a prosperous trading town on the desert route between the eighth and twelfth centuries, and what survives is a group of sixteen Hindu and Jain temples in and around a village that is now small and quiet.',
    'The Jain temple to Mahavira is the oldest surviving Jain temple in western India and is still in worship. The Hindu temples, several of them ruined, carry Gurjara-Pratihara carving that is noticeably earlier and plainer than anything else most visitors to Rajasthan will see.',
    'It is also the usual starting point for camel safaris out of Jodhpur, which brings a quite different crowd.'
  ],
  see: [
    { n: 'The Mahavira temple',
      d: 'Eighth century, rebuilt and extended, with a carved torana and an image said to be made of sand and milk.' },
    { n: 'Sachiya Mata temple',
      d: 'On a hill above the village, reached by a stair under a series of arches, and busy with pilgrims.' },
    { n: 'The ruined Hindu group',
      d: 'Scattered around the edge of the village, mostly unattended, with excellent early carving.' },
    { n: 'A camel night in the dunes',
      d: 'Quieter and less packaged than the Jaisalmer equivalent.' }
  ],
  when: 'October to March.',
  stay: 'Half a day from Jodhpur, or a night in a desert camp.',
  move: 'Sixty-five kilometres north of Jodhpur, about ninety minutes.',
  eat: 'Village sodas and camp food.'
},

/* ===================== HIMACHAL PRADESH ===================== */
'HPR-spiti': {
  intro: [
    'Spiti is a high desert valley at around four thousand metres behind the main Himalayan range, geologically and culturally part of the Tibetan plateau rather than India. The rain never reaches it, so the mountains are bare rock in ochre and grey and the only green is irrigated barley around the villages.',
    'It was closed to outsiders until 1992. The monasteries — Tabo, Key, Dhankar, Lhalung — hold wall painting and sculpture that survived the Cultural Revolution precisely because they were on this side of the border.',
    'Getting in is half the experience. The Manali road crosses Kunzum La at four thousand five hundred metres and is open roughly June to October; the Shimla–Kinnaur road along the Sutlej is open most of the year and is one of the more alarming drives anywhere.'
  ],
  see: [
    { n: 'Key Monastery',
      d: 'Stacked like a fortress on a bluff above the river, the largest in Spiti, with a thousand years of accretion and a kitchen that will give you butter tea.' },
    { n: 'Dhankar',
      d: 'A monastery perched on an eroding spur between two valleys, slowly falling down. A steep hour above it is a lake at four thousand metres.' },
    { n: 'Komic, Hikkim and Langza',
      d: 'Three villages at around four thousand five hundred metres. Hikkim has the world’s highest post office; Langza has a large Buddha statue and fossil beds full of ammonites from the Tethys Sea.' },
    { n: 'Pin Valley National Park',
      d: 'Snow leopard and Siberian ibex country, and the only place the Buchen lamas still perform their ritual theatre.' },
    { n: 'Chandratal', t: 'July to September',
      d: 'A crescent lake at four thousand three hundred metres near Kunzum La, with camping nearby and an absurd intensity of blue.' }
  ],
  when: 'June to September for the full circuit; the Kinnaur road gets you in during winter if you can handle minus twenty. Snow leopard tracking trips run in February.',
  stay: 'A week minimum. Build in two nights low to acclimatise — altitude sickness here is common and occasionally serious.',
  move: 'No airport, no railway. Shared taxis and buses from Manali or Shimla, or hire a vehicle. Fuel at Kaza and Tabo only; carry cash, as ATMs fail regularly.',
  eat: 'Homestays, thukpa, momos and barley. Spiti homestay food is simple and genuinely good.'
},

'HPR-manali': {
  intro: [
    'Manali sits at two thousand metres at the head of the Kullu valley, with deodar forest, apple orchards and the Beas running through it. It is the busiest hill station in Himachal and in high season the traffic can be absurd.',
    'Old Manali and Vashisht, up the slopes, are the pleasanter halves — stone and timber houses, hot springs, and a long-established traveller scene. The town below is where the buses and the shopping are.',
    'It is also the trailhead for a great deal: Spiti over Rohtang, Lahaul through the Atal Tunnel, Leh up the Manali–Leh highway, and a dozen treks into the Pir Panjal.'
  ],
  see: [
    { n: 'Hadimba Temple',
      d: 'A 1553 cedar-and-stone temple with a four-tiered pagoda roof, in a grove of enormous deodars above the town. Early morning, before the crowds.' },
    { n: 'Vashisht hot springs',
      d: 'Sulphur baths in a village above the river, with a temple complex attached. Free public tanks or paid private ones.' },
    { n: 'Old Manali',
      d: 'Cafés, guest houses and orchards up the hill from the Manalsu nallah. Quiet in winter, busy in summer.' },
    { n: 'Solang and Gulaba',
      d: 'Meadows up the valley with paragliding in summer and snow in winter. Thoroughly commercialised.' },
    { n: 'Naggar Castle',
      d: 'A medieval timber-bonded castle twenty kilometres down the valley, with the Roerich art gallery nearby.' }
  ],
  when: 'March to June and September to November. December to February for snow. Avoid May and June weekends, when the Delhi traffic arrives en masse.',
  stay: 'Three nights, or use it as a base for a week.',
  move: 'Bhuntar airport is fifty kilometres away and unreliable; most people take the overnight bus from Delhi. Local taxis are a cartel and priced accordingly.',
  eat: 'Trout from the Beas, Himachali siddu, and a lot of traveller food in Old Manali.'
},

'HPR-dharamshala': {
  intro: [
    'The Dalai Lama arrived in 1959 and the Tibetan government-in-exile has been based in McLeod Ganj, above Dharamshala, ever since. That has given a nineteenth-century British hill station a Tibetan town on top of it, with monasteries, a medical institute, a performing arts institute and a refugee reception centre.',
    'The setting is extraordinary: the Dhauladhar range rises almost five thousand metres straight out of the Kangra valley, so the snow line sits directly above the rooftops.',
    'It is a working religious and political centre as much as a destination. Teachings by the Dalai Lama, when they happen, are open to the public and should be registered for in advance.'
  ],
  see: [
    { n: 'Tsuglagkhang', t: 'the main temple complex',
      d: 'The Dalai Lama’s temple and residence, with the Tibet Museum beside it. Monks debate in the courtyard in the afternoons.' },
    { n: 'Namgyal and the kora',
      d: 'A circumambulation path around the temple complex through forest, with prayer flags and a quietness the main road lacks.' },
    { n: 'Norbulingka Institute',
      d: 'Down in the valley, where Tibetan thangka painting, woodcarving and metalwork are taught and practised. The gardens are lovely.' },
    { n: 'Triund', t: 'a day walk or an overnight',
      d: 'Nine kilometres up to a ridge at two thousand eight hundred metres, with the Dhauladhar wall directly overhead. Popular and still worth it.' },
    { n: 'Bhagsu and the waterfall',
      d: 'A short walk from McLeod, with a temple, a fall, and the densest concentration of yoga schools in the Himalaya.' }
  ],
  when: 'March to June and September to November. The monsoon here is extremely heavy. Losar in February or March is the Tibetan new year.',
  stay: 'Three nights, longer if you are doing a course of anything.',
  move: 'Gaggal airport is twenty minutes away; the toy train to Kangra is slow and charming. Buses from Delhi overnight.',
  eat: 'Tibetan — thenthuk, momos, shabhaley — and some of the best bakeries in the Himalaya.'
},

'HPR-shimla': {
  intro: [
    'Shimla was the summer capital of British India. From 1864 the entire government moved here for six months a year, up a cart road from the plains, and the result is a ridge-top town of gabled houses, a mock-Tudor post office, a Gothic church and a Scottish-baronial viceregal lodge at two thousand two hundred metres.',
    'The Mall and the Ridge are pedestrian and remain the social centre. Below them the town falls away in layers of corrugated iron down ravines that were never meant to hold this many people.',
    'The narrow-gauge railway up from Kalka — a hundred and three tunnels, eight hundred bridges, five hours for ninety-six kilometres — is a World Heritage site and the right way to arrive.'
  ],
  see: [
    { n: 'The Kalka–Shimla railway',
      d: 'Book the Shivalik Deluxe or the toy train well ahead. The gradient and the loops are the achievement; the views come free.' },
    { n: 'Viceregal Lodge',
      d: 'Built in 1888, where the partition of India was negotiated. Now an advanced study institute; tours of the ground floor run through the day.' },
    { n: 'The Ridge and Christ Church',
      d: 'The open spine of the town, with an 1857 church and views north to the snows on a clear day.' },
    { n: 'Jakhoo Temple',
      d: 'The highest point, with a very large Hanuman statue and a monkey population that will take your glasses and your food.' },
    { n: 'Annandale and the Gaiety Theatre',
      d: 'A Victorian theatre still staging plays, and the flat ground below the town that held the Raj’s cricket and polo.' }
  ],
  when: 'March to June and September to November. Snow in January. Avoid summer weekends and Christmas week.',
  stay: 'Two or three nights.',
  move: 'Toy train from Kalka, or four hours by road from Chandigarh. Vehicles are restricted on the Mall; be ready to walk uphill a great deal.',
  eat: 'Old-fashioned hill-station dining rooms, a good bakery tradition, and Himachali dham if you can find it.'
},

'HPR-kasol-parvati': {
  intro: [
    'The Parvati valley runs east from Bhuntar into high granite country, and it has two reputations. The first is a trekking valley of great beauty — hot springs, deodar forest, meadows, and a pass over into Spiti. The second is cannabis: Malana cream is produced here and is the reason a significant fraction of visitors come.',
    'Kasol and the villages above it have become dense with cafés and hostels. Further up, Tosh, Kalga and Pulga are quieter, and the walk to Kheerganga through forest to a hot spring at three thousand metres is the valley’s standard pilgrimage.',
    'A sobering note: a number of foreign visitors have disappeared in this valley over the past three decades. Walk with a guide, tell someone your route, and be sensible about who you follow where.'
  ],
  see: [
    { n: 'Kheerganga',
      d: 'Twelve kilometres up from Barshaini to a hot spring and a meadow with tents. Busy, and the walk through the gorge is lovely.' },
    { n: 'Tosh and Pulga',
      d: 'Villages at the head of the valley, quieter than Kasol, with the Tosh glacier visible above.' },
    { n: 'Malana',
      d: 'A village with its own customs, its own language and strict rules about outsiders touching anything — including the inhabitants. Go with a guide and respect the rules absolutely.' },
    { n: 'Manikaran',
      d: 'Hot springs so hot that food is cooked in them, with a gurdwara and a Shiva temple sharing the site.' },
    { n: 'Sar Pass or Pin Parvati',
      d: 'A straightforward beginner trek and a serious high crossing into Spiti, from the same valley.' }
  ],
  when: 'April to June and September to November. Heavy monsoon with landslide risk; roads close.',
  stay: 'Three nights, or a week if you are trekking.',
  move: 'Bhuntar is the nearest airport. Buses and shared taxis up the valley; the last stretch to Tosh is walked.',
  eat: 'Israeli and Italian food in an unlikely quantity, plus local dhabas.'
},

'HPR-kinnaur': {
  intro: [
    'Kinnaur is the valley of the Sutlej between the Shimla hills and the Tibetan border, and it is a transition zone in every sense — the architecture shifts from Hindu temple to Buddhist gompa as you climb, and many villages hold both in the same compound.',
    'Kinnaur Kailash, a nineteen-metre rock shaft on a peak above Kalpa, is held to be a form of Shiva, and the view of it from Kalpa at sunrise is the standard image of the region.',
    'The old Hindustan–Tibet road along the Sutlej is cut into cliff faces and is genuinely frightening in places. It is also the all-season route into Spiti.'
  ],
  see: [
    { n: 'Kalpa',
      d: 'A village of slate roofs and apple orchards facing the Kinnaur Kailash massif. Watch the first light hit the rock shaft.' },
    { n: 'Sangla valley and Rakcham',
      d: 'A side valley off the Baspa, greener and gentler than the Sutlej gorge.' },
    { n: 'Nako',
      d: 'High, dry and Buddhist, with a lake, an eleventh-century monastery and the look of Tibet.' },
    { n: 'Kamru Fort',
      d: 'A timber-bonded tower fort above Sangla, still holding a temple, reached on foot.' },
    { n: 'The Sutlej road',
      d: 'The stretch between Wangtu and Pooh, where the road is a ledge. Not for the nervous.' }
  ],
  when: 'May to October. Inner-line permits are required beyond Jangi for the stretch towards Spiti; they are easy to get at Reckong Peo.',
  stay: 'Three nights, or more as part of a Spiti circuit.',
  move: 'Buses and taxis from Shimla, eight to ten hours to Reckong Peo. No airport.',
  eat: 'Homestay food, apples, buckwheat, and chhang if it is offered.'
},

'HPR-chitkul': {
  intro: [
    'Chitkul is the last inhabited village on the Baspa before the Tibetan border, at around three thousand four hundred metres, and the road stops there. It has slate-roofed timber houses, a temple to the local goddess, a river running clear and very cold, and not much else, which is the point.',
    'It has become popular enough to have a row of guest houses, and in season there can be more cars than there should be. Out of season it is one of the quieter places in the Indian Himalaya.'
  ],
  see: [
    { n: 'The village itself',
      d: 'Traditional Kinnauri architecture, wooden balconies, and stacks of firewood against the winter.' },
    { n: 'The Baspa riverbank',
      d: 'Walk upstream through the meadow to where the army post stops you. The silence is the attraction.' },
    { n: 'Mathi Temple',
      d: 'Carved timber, dedicated to the local deity, with three structures of different dates.' },
    { n: 'Sangla and Rakcham on the way',
      d: 'Both worth a stop coming up the valley.' }
  ],
  when: 'May to October. Snowed in and largely emptied from November to April.',
  stay: 'One or two nights. Carry warm clothing in any month.',
  move: 'Two and a half hours from Reckong Peo by taxi. One bus a day.',
  eat: 'Guest house kitchens, rajma chawal and thukpa. There is a famous roadside dhaba claiming to be the last one in India.'
},

'HPR-tabo': {
  intro: [
    'Tabo monastery was founded in 996 AD and has been in continuous use since, which makes it the oldest functioning Buddhist monastery in the Indian Himalaya. The Dalai Lama has said he would like to retire here.',
    'The buildings are mud brick, low and unremarkable from outside. Inside, the main assembly hall holds wall paintings and life-size clay sculptures from the late tenth and early eleventh centuries, in an Indo-Tibetan style that survives almost nowhere else.',
    'Photography is prohibited and lighting is deliberately minimal to protect the pigment. Bring a torch and let your eyes adjust; it rewards twenty minutes of standing still.'
  ],
  see: [
    { n: 'The Tsuglagkhang assembly hall',
      d: 'Thirty-three clay figures of the Vajradhatu mandala standing out from the walls, with painting behind them. The single most important interior in Spiti.' },
    { n: 'The newer temples in the complex',
      d: 'Eight more structures of varying date, several with later Tibetan-style murals.' },
    { n: 'The cave shrines',
      d: 'In the cliff above the village, used by monks for meditation retreats, some with faint paintings.' },
    { n: 'The village and the new monastery',
      d: 'Where the monks actually live and study now, a few hundred metres away.' }
  ],
  when: 'May to October by the Manali road; year round via Kinnaur. Winter is bitter and most guest houses close.',
  stay: 'One night, often as a stop between Kinnaur and Kaza.',
  move: 'On the main Spiti road, fifty kilometres from Kaza. Buses and shared taxis.',
  eat: 'Monastery guest house and two or three small places in the village.'
},

'HPR-kaza': {
  intro: [
    'Kaza is the administrative centre of Spiti at three thousand eight hundred metres, which makes it the place with the fuel pump, the hospital, the ATMs that sometimes work, and the permits office. It is a practical town rather than a beautiful one.',
    'Everything in Spiti is reached from here, and most itineraries use it as a base for three or four nights while acclimatising and running out to Key, Hikkim, Langza and Dhankar.'
  ],
  see: [
    { n: 'Sakya Tangyud monastery',
      d: 'In old Kaza, mud-walled and fortress-like, of the Sakya order, which is unusual in Spiti.' },
    { n: 'The market',
      d: 'Where the trekking supplies, the wool and the apricots are. The last reliable shopping before the high villages.' },
    { n: 'Day trips',
      d: 'Key, Kibber, Langza, Hikkim, Komic and Dhankar are all within two hours.' },
    { n: 'Acclimatising',
      d: 'Spending two nights here doing nothing much is sensible rather than wasted time.' }
  ],
  when: 'June to September for the Manali road. The Kinnaur road serves it most of the year.',
  stay: 'Three nights as a base.',
  move: 'Buses to Manali and Reckong Peo, taxis for everything else. Carry cash.',
  eat: 'Several decent cafés, German bakery bread, thukpa and seabuckthorn juice.'
},

'HPR-bir-billing': {
  intro: [
    'Billing, a ridge above the village of Bir, is one of the best paragliding sites in the world — the Dhauladhar generates reliable thermals and the valley gives a long, open landing area at Bir fourteen kilometres away. The 2015 world championship was held here.',
    'Bir itself is a Tibetan settlement with a monastery, a tea garden and an increasingly good café scene, and it has become a quiet place to work remotely for a few weeks.',
    'A tandem flight needs no experience and takes twenty to thirty minutes. Pick an operator with proper equipment and ask about their insurance; the safety record is mixed.'
  ],
  see: [
    { n: 'A tandem flight from Billing',
      d: 'Drive up to two thousand four hundred metres, run off the slope and land at Bir. Best in the morning or late afternoon.' },
    { n: 'Chokling and Sherab Ling monasteries',
      d: 'Tibetan foundations in and near Bir, the latter with an enormous golden Buddha and a meditation centre.' },
    { n: 'The tea gardens',
      d: 'Kangra tea, which is lighter than Darjeeling and almost unknown outside India.' },
    { n: 'Rajgundha and Billing treks',
      d: 'Day walks and multi-day routes over the ridge into the Barot valley.' }
  ],
  when: 'October and November are the flying season; March to June also flies. Nothing flies in the monsoon.',
  stay: 'Three nights.',
  move: 'Nearest station Ahju; Gaggal airport is ninety minutes. Buses from Delhi overnight.',
  eat: 'The best café density in Himachal, plus Tibetan food in the colony.'
},

'HPR-great-himalayan-np': {
  intro: [
    'The Great Himalayan National Park was inscribed by UNESCO in 2014 for the completeness of its altitudinal range — from two thousand to over six thousand metres with no roads, no villages and no grazing inside the core.',
    'There is no vehicle access at all. Everything is walked, from four-day routes up the Tirthan and Sainj valleys to two-week crossings, with porters and a permit.',
    'What it protects is the western Himalayan forest and alpine system essentially intact: Himalayan tahr, blue sheep, musk deer, black and brown bear, and western tragopan, which birders come a long way for.'
  ],
  see: [
    { n: 'The Tirthan valley trek',
      d: 'The standard way in, from Gushaini, three to five days up to high meadows. Guides and porters hired at the gate.' },
    { n: 'Sainj and Jiwa valleys',
      d: 'Less used, with better chances of large mammals.' },
    { n: 'Birding the lower forest',
      d: 'Western tragopan, koklass and cheer pheasant — four of the five Himalayan pheasants occur here.' },
    { n: 'Trout fishing in the Tirthan',
      d: 'In the buffer zone outside the park; catch and release is the norm.' }
  ],
  when: 'April to June and September to November. The high passes need June onwards.',
  stay: 'Four to seven days inside, plus a night either end in Gushaini or Banjar.',
  move: 'Aut is the road access from the Kullu highway; Gushaini is the trailhead. Permits at the park office.',
  eat: 'Homestays in the buffer villages and camp food inside.'
},

'HPR-dalhousie-khajjiar': {
  intro: [
    'Dalhousie was built in the 1850s on five hills as a cantonment and sanatorium, and the British churches, the mall roads and the deodar forest are all still there. It is smaller and quieter than Shimla and has aged less gracefully.',
    'Khajjiar, twenty kilometres away, is a saucer-shaped meadow with a lake in the middle, ringed by deodar, which a Swiss diplomat once called a mini Switzerland — a label the tourism department has never let go of. The horses, zorbing and photo stalls have done it no favours, but the meadow itself is genuinely lovely out of season.'
  ],
  see: [
    { n: 'Khajjiar meadow',
      d: 'Go early or late. The twelfth-century Khajji Nag temple on the edge has carved wooden panels worth the stop.' },
    { n: 'St John’s and St Francis’ churches',
      d: 'Both mid-nineteenth century, stone, with original stained glass.' },
    { n: 'Kalatop sanctuary',
      d: 'Deodar forest between Dalhousie and Khajjiar, walkable, with a forest rest house and almost nobody in it.' },
    { n: 'Chamba',
      d: 'An hour away, with a group of seventh to tenth-century stone temples far older and better than anything in Dalhousie.' }
  ],
  when: 'March to June and September to November. Snow in winter.',
  stay: 'Two nights, with a day for Chamba.',
  move: 'Pathankot is the railhead, three hours below. Taxis locally.',
  eat: 'Hotel dining rooms. Chamba has better local food, including chamba chukh.'
},

'HPR-narkanda': {
  intro: [
    'Narkanda sits at two thousand seven hundred metres on the ridge east of Shimla, on the old Hindustan–Tibet road, surrounded by apple orchards. It is a working apple town with a small ski slope rather than a resort, and it is the quiet alternative to Shimla an hour away.',
    'Hatu Peak above it, at three thousand four hundred metres, gives one of the better panoramas of the high Himalaya available from a road.'
  ],
  see: [
    { n: 'Hatu Peak',
      d: 'Eight kilometres up a rough road to a temple at the summit, with the Greater Himalaya laid out north on a clear day.' },
    { n: 'The orchards',
      d: 'Blossom in April, harvest in September and October, when the whole town smells of apples.' },
    { n: 'Skiing in January and February',
      d: 'A short beginner slope, state-run and very cheap.' },
    { n: 'Thanedar',
      d: 'Where commercial apple growing in India began, planted by an American missionary in 1916. The orchard is still there.' }
  ],
  when: 'April to June and September to November; January and February for snow.',
  stay: 'One or two nights.',
  move: 'Two hours from Shimla on the NH5. Buses and taxis.',
  eat: 'Dhabas on the highway; siddu and rajma are the local staples.'
},

'HPR-rohtang': {
  intro: [
    'Rohtang La at three thousand nine hundred and eighty metres was for a century the only way from Manali into Lahaul and Spiti, open roughly June to October and notorious for weather, mud and bodies — the name means pile of corpses.',
    'The Atal Tunnel, opened in 2020, runs nine kilometres under the pass and cut the journey from five hours to ten minutes while making Lahaul accessible all year. It is one of the longest highway tunnels above three thousand metres anywhere.',
    'The pass itself is now a day excursion from Manali with a permit cap, and Lahaul beyond it — Sissu, Keylong, the Chandra valley — has gone from remote to reachable in a single winter.'
  ],
  see: [
    { n: 'The Atal Tunnel',
      d: 'Worth driving through for its own sake, and the reason Sissu and Keylong are now a day trip.' },
    { n: 'Rohtang Pass', t: 'permit required, June to October',
      d: 'Snow, stalls and a great many vehicles. The view north into Lahaul is the reward.' },
    { n: 'Sissu',
      d: 'Just past the tunnel, with a waterfall, a lake and the Lahaul valley opening up. Transformed by the tunnel.' },
    { n: 'Keylong and Kardang',
      d: 'The Lahaul district headquarters and a monastery above it, both now within easy reach from Manali.' }
  ],
  when: 'The tunnel is open year round barring heavy snow; the pass June to October. Permits for Rohtang are capped daily and must be booked online.',
  stay: 'A day trip from Manali, or a night in Sissu or Keylong.',
  move: 'Taxis from Manali. Private vehicles need a Rohtang permit; the tunnel does not.',
  eat: 'Dhabas at Marhi and Sissu. Carry water.'
},

/* ===================== UTTARAKHAND ===================== */
'UTK-jim-corbett': {
  intro: [
    'Corbett was established in 1936 as Hailey National Park, the first national park in mainland Asia, and renamed for Jim Corbett — a hunter who shot a documented nineteen man-eating tigers and leopards in these hills and then spent his later life arguing for their protection and writing about it extremely well.',
    'It was also where Project Tiger was launched in 1973. The density of tigers in the Dhikala grasslands is among the highest anywhere, and the setting — sal forest, the Ramganga river, and the Himalayan foothills behind — is more varied than the central Indian parks.',
    'The park is divided into zones. Dhikala, the core, requires an overnight stay in forest accommodation booked months ahead and is much the best; Bijrani and Jhirna take day visitors.'
  ],
  see: [
    { n: 'Dhikala',
      d: 'Forest rest house accommodation inside the core, with a chaur — grassland — in front of it where elephant, hog deer and tiger come out. Book the moment the window opens.' },
    { n: 'Jeep safaris in Bijrani',
      d: 'The most reliable day zone, dense sal forest with good tiger movement.' },
    { n: 'The Ramganga reservoir',
      d: 'Gharial, mugger, otter and a great many birds, viewed from the Dhikala side.' },
    { n: 'Corbett’s house at Kaladhungi',
      d: 'A small museum in his former home, worth an hour if you have read the books.' },
    { n: 'Birding the Kosi riverbed',
      d: 'Outside the park and free; ibisbill in winter, and over six hundred species recorded in the wider area.' }
  ],
  when: 'November to June. Dhikala closes from mid-June to mid-November; Jhirna and Dhela stay open year round.',
  stay: 'Three nights, with at least one inside if you can get it.',
  move: 'Ramnagar is the railhead, six hours from Delhi. Permits online; agents will do it for a fee.',
  eat: 'Lodge food on the Kosi; the forest rest houses have basic canteens.'
},

'UTK-valley-of-flowers': {
  intro: [
    'The Valley of Flowers is a glacial valley at about three thousand five hundred metres in the Bhyundar, and for roughly ten weeks after the snow melts it produces around five hundred species of flowering plant in succession — blue poppies, cobra lilies, primulas, anemones, brahma kamal.',
    'It was stumbled on in 1931 by Frank Smythe, a mountaineer who had lost his way coming down from Kamet, and has been a national park since 1982. Nobody is allowed to stay inside; you walk up from Ghangaria and back the same day.',
    'It is paired with Hemkund Sahib, a Sikh shrine at a lake at four thousand three hundred metres a steep six kilometres the other way from the same village, so the trail carries flower pilgrims and religious pilgrims together.'
  ],
  see: [
    { n: 'The valley itself',
      d: 'Three kilometres long, walked up from Ghangaria, with a river down the middle and the flowers banded by altitude and date. Late July and August are peak bloom.' },
    { n: 'Hemkund Sahib',
      d: 'The world’s highest gurdwara, beside a glacial lake, with langar served to everyone who makes it up.' },
    { n: 'The walk from Govindghat',
      d: 'Thirteen kilometres to Ghangaria, with ponies and porters available. Steep and often wet.' },
    { n: 'Badrinath',
      d: 'An hour away by road from Govindghat, and usually combined.' }
  ],
  when: 'The park opens 1 June and closes 31 October. Late July to mid-August is the bloom; it is also the heaviest rain. September is drier with fewer flowers.',
  stay: 'Two nights in Ghangaria, three days from Govindghat.',
  move: 'Road to Govindghat, then walk or pony. Rishikesh is ten hours away; helicopters run to Ghangaria in season.',
  eat: 'Ghangaria has basic dhabas and the gurdwara langar. Carry rain gear and a water bottle.'
},

'UTK-haridwar': {
  intro: [
    'Haridwar is where the Ganges leaves the mountains and enters the plains, and it is one of the seven holiest cities in Hinduism and one of four Kumbh Mela sites. The name means gateway to God.',
    'Har ki Pauri is the principal ghat, where a footprint of Vishnu is said to be set in a wall, and the evening aarti there — rows of priests with tiered oil lamps, and thousands of leaf boats of flowers going downstream — is the most theatrical river ceremony in India after Varanasi.',
    'It is also strictly vegetarian and dry, and much more a pilgrimage town than a sightseeing one. Rishikesh twenty kilometres upstream is where visitors generally sleep.'
  ],
  see: [
    { n: 'Ganga Aarti at Har ki Pauri', t: 'at sunset',
      d: 'Arrive an hour early for a place on the steps. Expect crowds and pickpockets; leave valuables behind.' },
    { n: 'Mansa Devi by cable car',
      d: 'A hilltop temple above the town, with the Ganges and the whole ghat system laid out below.' },
    { n: 'The bathing ghats at dawn',
      d: 'Quieter, with the current running fast and cold straight off the mountains. Chains are set in the river for a reason — hold on.' },
    { n: 'Chandi Devi and Daksha Mahadev',
      d: 'Two more major temples, the latter at the site of a mythological sacrifice central to the Shiva story.' }
  ],
  when: 'October to March. Kumbh and Ardh Kumbh years bring tens of millions; Kanwar Yatra in July fills the roads with pilgrims on foot.',
  stay: 'A day and an evening; sleep in Rishikesh.',
  move: 'Good rail links from Delhi, four to five hours. Autos and e-rickshaws; the ghat area is walked.',
  eat: 'Pure vegetarian and no alcohol. Chotiwala and the Mohan Puri lanes do good thalis and kachoris.'
},

'UTK-nainital': {
  intro: [
    'Nainital is built around a pear-shaped lake at nineteen hundred metres, in a bowl of forested hills, and it has been the Kumaon hill station since a British sugar trader found the lake in 1841 — it had been deliberately kept quiet by local people.',
    'The lake is the town: boats on it, a mall road along one side, and the hills rising directly behind. It is one of India’s most popular domestic holiday destinations and in May and June it is extremely full.',
    'A landslide in 1880 killed over a hundred and fifty people and buried part of the town; the flat ground at one end of the lake is where it came down.'
  ],
  see: [
    { n: 'Rowing on the lake',
      d: 'Flat-bottomed yellow boats with rowers, or paddle it yourself. Best early.' },
    { n: 'Snow View by cable car',
      d: 'Two thousand two hundred metres, with Nanda Devi and Trishul visible on a clear morning.' },
    { n: 'Naina Devi Temple',
      d: 'At the head of the lake, one of the fifty-one shakti peethas, rebuilt after the 1880 slide.' },
    { n: 'Tiffin Top and Land’s End',
      d: 'A walk or pony ride up through oak forest to a view over the plains.' },
    { n: 'The other lakes',
      d: 'Sattal, Bhimtal and Naukuchiatal, twenty minutes away, with a fraction of the crowd.' }
  ],
  when: 'March to June and September to November. Snow in December and January. Avoid peak summer and Diwali week.',
  stay: 'Two nights, or base here for Kumaon.',
  move: 'Kathgodam is the railhead, an hour and a half below. Vehicles are restricted on the Mall in the evenings.',
  eat: 'Hill-station dining rooms, Kumaoni bhatt ki churkani if you ask, and good bakeries.'
},

'UTK-mussoorie': {
  intro: [
    'Mussoorie sits on a ridge at two thousand metres with the Doon valley on one side and the snows on the other, and it has been a hill station since 1823. It is close enough to Delhi to have been thoroughly colonised by weekend traffic.',
    'What survives is the Camel’s Back road, a four-kilometre walk around the ridge with no traffic, several good nineteenth-century buildings, and Landour above the town — a cantonment of deodar, old bungalows and almost no commerce, where Ruskin Bond has lived and written for decades.',
    'Stay in Landour, not Mussoorie, and the place is transformed.'
  ],
  see: [
    { n: 'Camel’s Back Road',
      d: 'A level circuit round the ridge, best at dawn, with a Victorian cemetery halfway and the Himalaya to the north.' },
    { n: 'Landour',
      d: 'Char Dukan for breakfast, Sister’s Bazaar for cheese and peanut butter from a shop that has sold them for a century, and the loop road through deodar.' },
    { n: 'Cambridge Book Depot',
      d: 'Where Ruskin Bond has signed books on Saturday afternoons for years.' },
    { n: 'Kempty Falls',
      d: 'Famous, crowded and frankly skippable. Bhatta falls nearby is better.' },
    { n: 'George Everest’s house',
      d: 'The surveyor-general’s ruined home on a ridge west of town, with an enormous view and a stiff walk.' }
  ],
  when: 'March to June and September to November. Avoid May, June and long weekends.',
  stay: 'Two or three nights, in Landour.',
  move: 'Dehradun is the railhead and airport, an hour below. Taxis up the hill.',
  eat: 'Char Dukan’s parathas and bun omelette, Kalsang for Tibetan, and Landour Bakehouse.'
},

'UTK-badrinath': {
  intro: [
    'Badrinath is one of the four Char Dham shrines that define Hindu pilgrimage across India, and the northernmost. It sits at three thousand one hundred metres in a bare valley between the Nar and Narayan peaks, with the Alaknanda running past the temple and a hot spring at its foot.',
    'The temple is small, brightly painted and, by tradition, served by a head priest from Kerala — an arrangement attributed to Adi Shankara in the eighth century and maintained ever since. It is open roughly late April to November and closed by snow the rest of the year.',
    'Three kilometres on is Mana, the last village before Tibet, which claims to be the start of the route the Pandavas took to heaven.'
  ],
  see: [
    { n: 'The temple and Tapt Kund',
      d: 'Bathe in the forty-five-degree sulphur spring below the temple before entering, as pilgrims do. Queues are long; early morning is best.' },
    { n: 'Mana village',
      d: 'Bhotia village at three thousand two hundred metres, with a natural rock bridge over the Saraswati and the last tea shop in India.' },
    { n: 'Vasudhara Falls',
      d: 'A five-kilometre walk from Mana to a hundred-and-twenty-metre fall. Hard going at this altitude.' },
    { n: 'Charan Paduka',
      d: 'A steep three kilometres above the temple to a boulder bearing what is said to be Vishnu’s footprint.' }
  ],
  when: 'The temple opens in late April or early May and closes in November. May to June and September to October are the practical windows; the monsoon brings landslides.',
  stay: 'One or two nights. Allow time to acclimatise — the road climbs fast.',
  move: 'Ten to twelve hours from Rishikesh by road, with registration now required for Char Dham travel. Helicopters serve nearby.',
  eat: 'Simple vegetarian. The tea shop at Mana is a destination of its own.'
},

'UTK-kedarnath': {
  intro: [
    'Kedarnath is the highest of the twelve jyotirlingas, at three thousand five hundred and eighty metres below the Kedarnath peak, and it is reached only on foot — sixteen kilometres up from Gaurikund, or by helicopter.',
    'In June 2013 a glacial lake burst above the valley and a wall of water and rock came down through the town. Several thousand people died. The temple survived because a single large boulder lodged behind it and split the flow; it is still there and is now venerated.',
    'The valley has been rebuilt since, with a wider path and much heavier regulation. It remains a serious mountain pilgrimage rather than a sight, and the arrival at the temple with the peak directly behind it is among the most affecting things in the Himalaya.'
  ],
  see: [
    { n: 'The walk from Gaurikund',
      d: 'Sixteen kilometres, around twelve hundred metres of ascent, six to eight hours. Ponies, palanquins and porters are available. Start before dawn.' },
    { n: 'The temple',
      d: 'Eighth century in its present form, of massive grey slabs. Darshan queues can run many hours in season.' },
    { n: 'Bhim Shila',
      d: 'The boulder that divided the 2013 flood behind the temple.' },
    { n: 'Vasuki Tal',
      d: 'A hard eight kilometres further up to a lake at four thousand one hundred and fifty metres. For the fit and acclimatised only.' }
  ],
  when: 'Opens late April or early May, closes early November. Avoid the monsoon entirely; the 2013 disaster was a monsoon event.',
  stay: 'Two nights minimum: one at Gaurikund or Sonprayag, one at Kedarnath.',
  move: 'Registration is mandatory. Vehicles stop at Sonprayag; shuttle to Gaurikund, then walk. Helicopters from Phata and Sersi, booked online and weather-dependent.',
  eat: 'Dhabas along the trail and at the top. Simple, hot and welcome.'
},

'UTK-auli': {
  intro: [
    'Auli is a meadow slope at between two thousand five hundred and three thousand metres above Joshimath, and it is the best ski resort in India — which is a modest claim, but the slope is real, the snow is reliable from January to March, and the backdrop is Nanda Devi.',
    'Out of season it is a ridge walk with an alpine meadow, a cable car that is among the longest in Asia, and an artificial lake used for snow-making.',
    'Joshimath below is also the roadhead for Badrinath and the Valley of Flowers, which makes Auli easy to bolt onto a bigger trip.'
  ],
  see: [
    { n: 'Skiing in January and February',
      d: 'Beginner and intermediate slopes with a chairlift and a tow. Equipment hire and instruction on site; GMVN runs courses.' },
    { n: 'The Joshimath–Auli cable car',
      d: 'Four kilometres of gondola with Nanda Devi, Dronagiri and Trishul in view.' },
    { n: 'Gorson Bugyal',
      d: 'A high meadow a few kilometres up, walkable in summer, a winter trek in snow.' },
    { n: 'Kuari Pass',
      d: 'A four-day trek from near here, famously described by Lord Curzon, with one of the great Himalayan panoramas.' }
  ],
  when: 'January to March for snow; April to June and September to November for walking.',
  stay: 'Two or three nights.',
  move: 'Rishikesh to Joshimath is nine to ten hours; then cable car or road. Joshimath has had subsidence problems — check conditions.',
  eat: 'Resort and GMVN kitchens; Joshimath has dhabas.'
},

'UTK-chopta-tungnath': {
  intro: [
    'Chopta is a meadow and a few tea shops at two thousand seven hundred metres, and from it a three-and-a-half kilometre path climbs to Tungnath — at three thousand six hundred and eighty metres the highest Shiva temple in the world, and one of the Panch Kedar.',
    'Another kilometre and a half up is Chandrashila at four thousand metres, which gives a two-hundred-degree view of the Garhwal Himalaya: Nanda Devi, Trishul, Kedarnath peak, Chaukhamba, Bandarpunch.',
    'It is one of the few places in the high Himalaya where a fit person with no experience can stand above four thousand metres and be back for dinner.'
  ],
  see: [
    { n: 'Tungnath temple',
      d: 'Stone, ancient, leaning slightly, and open roughly May to November. The deity is moved down to Mukku for winter.' },
    { n: 'Chandrashila summit', t: 'at sunrise',
      d: 'Start from Chopta at four in the morning in the dark to be on top for first light. Snow from December to March makes it a winter trek with crampons.' },
    { n: 'Deoriatal',
      d: 'A lake two and a half kilometres up from Sari village, with Chaukhamba reflected in it. Camping permitted; often combined.' },
    { n: 'The Kedarnath Wildlife Sanctuary',
      d: 'Monal, musk deer and Himalayan tahr in the oak and rhododendron on the way up.' }
  ],
  when: 'April to June and September to November. December to March for a snow trek. The monsoon is wet and leech-ridden.',
  stay: 'Two nights at Chopta or Sari.',
  move: 'Haridwar or Rishikesh to Chopta is about eight hours. Limited accommodation — camps and a few homestays; book ahead.',
  eat: 'Tea shops at Chopta and at the temple. Maggi and chai, essentially.'
},

'UTK-binsar': {
  intro: [
    'Binsar was the summer capital of the Chand kings and is now a small wildlife sanctuary of oak and rhododendron forest at around two thousand four hundred metres, with a ridge-top viewpoint that takes in some three hundred kilometres of the Himalayan crest.',
    'There is almost nothing to do, which is the attraction. A handful of lodges sit inside the sanctuary, the forest is full of birds, and on a clear winter morning you can see Kedarnath peak, Chaukhamba, Trishul, Nanda Devi and Panchachuli in one sweep.'
  ],
  see: [
    { n: 'Zero Point', t: 'at dawn',
      d: 'A short walk from the road to the main viewpoint. Clearest from November to February.' },
    { n: 'Walking the forest trails',
      d: 'Oak, rhododendron in bloom around March, and over two hundred bird species including a good chance of Himalayan griffon.' },
    { n: 'Binsar Mahadev temple',
      d: 'A small stone temple from around the tenth century in the forest.' },
    { n: 'Almora and Jageshwar',
      d: 'An hour and ninety minutes away respectively, for a day out.' }
  ],
  when: 'October to June. March for rhododendron, November to February for mountain views.',
  stay: 'Two or three nights. Carry what you need; there are no shops inside.',
  move: 'Kathgodam railhead, then three hours. Entry fee at the sanctuary gate.',
  eat: 'Lodge kitchens only, mostly Kumaoni home cooking.'
},

'UTK-gangotri': {
  intro: [
    'Gangotri is where the Ganges is worshipped at its source, at three thousand one hundred metres on the Bhagirathi. The actual glacier snout, Gaumukh, is eighteen kilometres further up and the temple stands where the river is said to have first touched earth.',
    'It is one of the Char Dham, open roughly May to November, and far quieter than Badrinath or Kedarnath. The temple is a plain white eighteenth-century structure beside a river running grey with glacial silt and moving very fast.',
    'The trek to Gaumukh and the meadow of Tapovan beyond it, with Shivling rising directly above, is among the classic Himalayan walks.'
  ],
  see: [
    { n: 'The temple and Bhagirath Shila',
      d: 'The rock where the sage Bhagirath is said to have meditated to bring the river down. Submerged when the river is high.' },
    { n: 'Gaumukh',
      d: 'Eighteen kilometres to the glacier snout, usually two days with a night at Bhojbasa. Permits required and capped daily.' },
    { n: 'Tapovan',
      d: 'A meadow at four thousand five hundred metres above the glacier, facing Shivling. A serious four-day round trip from Gangotri.' },
    { n: 'Harsil and Dharali',
      d: 'Villages on the way up, with apple orchards and deodar, far gentler than the top of the valley.' }
  ],
  when: 'May to June and September to October. Permits for Gaumukh from the forest office at Uttarkashi or Gangotri.',
  stay: 'Two nights at Gangotri, four if trekking to Gaumukh or Tapovan.',
  move: 'Rishikesh to Gangotri is ten to twelve hours. Char Dham registration required.',
  eat: 'Ashram and dhaba food, strictly vegetarian.'
},

'UTK-almora': {
  intro: [
    'Almora is a ridge town founded in 1568 as the Chand capital, and the old bazaar along the spine of the ridge — flagstone paved, with carved wooden shopfronts — is the best-preserved thing of its kind in Kumaon.',
    'It has attracted an unusual set of outsiders: Swami Vivekananda, Timothy Leary, Bob Dylan, D H Lawrence’s circle, and a long line of people looking for a quiet place to think. Kasar Devi above the town has a reputation among them.',
    'It is the natural base for Kumaon: Jageshwar, Binsar, Kausani and the Panchachuli view are all within two hours.'
  ],
  see: [
    { n: 'The Lala Bazaar',
      d: 'Walk the full length of the paved ridge market. Copper work, woollens and a good deal of ordinary life.' },
    { n: 'Jageshwar', t: 'ninety minutes away',
      d: 'A valley of around a hundred and twenty-four stone temples from the seventh to twelfth centuries in a deodar grove beside a stream. One of the most atmospheric temple sites in north India.' },
    { n: 'Kasar Devi',
      d: 'A temple on a ridge above the town with an enormous view, and a hamlet of cafés below it.' },
    { n: 'Kausani',
      d: 'An hour away, with a famous three-hundred-kilometre Himalayan panorama and the ashram where Gandhi wrote his commentary on the Gita.' },
    { n: 'Binsar',
      d: 'Forty minutes, for the sanctuary and the viewpoint.' }
  ],
  when: 'October to June. November to February for clear mountains.',
  stay: 'Three nights as a base for Kumaon.',
  move: 'Kathgodam railhead, three hours. Taxis and buses to everything nearby.',
  eat: 'Kumaoni food — bhatt ki churkani, aloo ke gutke, bal mithai, which is the local sweet and extremely sweet.'
},

'UTK-rajaji': {
  intro: [
    'Rajaji runs along the Shivalik foothills from Haridwar to Dehradun, and it is where the Ganges leaves the mountains — which makes it an elephant corridor as much as a park. Around five hundred elephants move through it.',
    'It was declared a tiger reserve in 2015 and tigers have slowly returned from Corbett, but elephants, leopard, sloth bear and king cobra are the realistic sightings, and the birding is excellent.',
    'It is very close to Rishikesh and Haridwar and almost never on anyone’s itinerary, which is its chief advantage.'
  ],
  see: [
    { n: 'Chilla zone',
      d: 'Across the Ganges from Rishikesh and the best for elephants. Jeep safaris morning and afternoon.' },
    { n: 'Motichur and Ranipur',
      d: 'Closest to Haridwar, good for sloth bear and deer.' },
    { n: 'Birding the riverbed',
      d: 'Over four hundred species; the Ganges edge in winter is particularly good.' },
    { n: 'The Gujjar settlements',
      d: 'Pastoralist buffalo-herding families who have lived seasonally in the forest for generations, now mostly resettled.' }
  ],
  when: 'November to mid-June; closed in the monsoon.',
  stay: 'A night, or day trips from Rishikesh.',
  move: 'Twenty minutes from Haridwar or Rishikesh. Permits at the gates or online.',
  eat: 'Stay and eat in Rishikesh.'
},

'UTK-nanda-devi': {
  intro: [
    'Nanda Devi is seven thousand eight hundred and sixteen metres, the highest mountain entirely within India, and it stands inside a ring of peaks — the Nanda Devi Sanctuary — that was not penetrated until 1934, when Shipton and Tilman found a way up the Rishi Ganga gorge.',
    'The sanctuary has been closed to all entry since 1983, after expedition traffic did serious damage, and remains closed. There is also an unresolved episode from 1965 in which a CIA–Indian team lost a plutonium-powered surveillance device on the mountain; it has never been found.',
    'What you can do is walk the outer approaches — Kuari Pass, Lata and the biosphere buffer — which give the views without the sanctuary.'
  ],
  see: [
    { n: 'Kuari Pass trek',
      d: 'Four days from Joshimath to a pass at around four thousand metres with a full view of Nanda Devi and the Dronagiri wall. The best accessible viewpoint.' },
    { n: 'Lata and the buffer villages',
      d: 'Bhotia villages at the sanctuary entrance, with homestays and a strong community-tourism tradition born of the Chipko movement, which started here.' },
    { n: 'Nanda Devi East from Munsiyari',
      d: 'The eastern approach, with the Panchachuli group and a view of the twin summits.' },
    { n: 'Auli and Gorson',
      d: 'An easier day option from Joshimath for the same massif.' }
  ],
  when: 'May to June and September to October. The inner sanctuary is closed; do not plan on entering it.',
  stay: 'Four to six days for the Kuari trek.',
  move: 'Joshimath is the base, ten hours from Rishikesh. Permits for the buffer from the forest department.',
  eat: 'Homestays in Lata and Tolma; camp food on the trek.'
}
,

/* ===================== LADAKH, continued ===================== */
'LAD-nubra': {
  intro: [
    'Nubra is the valley north of Leh, reached over Khardung La, where the Shyok and Nubra rivers meet in a wide flat basin at around three thousand metres — low, by Ladakhi standards, which means apricot orchards and warmth alongside sand dunes and double-humped Bactrian camels left over from the Silk Road caravans.',
    'It was a restricted area until 1994 and parts of it still require an inner-line permit. The road runs on towards the Siachen glacier and the Pakistani border, and army convoys are a constant presence.',
    'Hunder and Diskit are the usual bases. Turtuk, further on towards the Line of Control, is a Balti village that was in Pakistan until 1971 and is culturally quite distinct.'
  ],
  see: [
    { n: 'Diskit Monastery and the Maitreya',
      d: 'A fourteenth-century gompa on a crag with a thirty-two-metre Buddha facing down the valley towards the border, installed in 2010.' },
    { n: 'The Hunder dunes',
      d: 'Cold desert sand with Bactrian camel rides. Touristy and photogenic; go late in the day.' },
    { n: 'Panamik hot springs',
      d: 'Sulphur springs at the far end of the permitted zone, with a view up towards the Siachen.' },
    { n: 'Yarab Tso',
      d: 'A small sacred lake above Sumur, reached by a short steep walk, and usually empty.' },
    { n: 'Turtuk',
      d: 'Balti houses, apricot drying on the roofs, and a glimpse into a culture that sits on the other side of a line.' }
  ],
  when: 'June to September. The road over Khardung La closes with heavy snow; the Shyok valley route can wash out.',
  stay: 'Two or three nights. Do not come up here on your first day in Ladakh.',
  move: 'Permits arranged in Leh. Shared or private taxi, five to six hours over Khardung La.',
  eat: 'Guest house kitchens, apricots in every form, and Balti food in Turtuk.'
},

'LAD-tso-moriri': {
  intro: [
    'Tso Moriri sits at four thousand five hundred and twenty metres in the Changthang, a high plateau of saline lakes and open grazing that runs east into Tibet. It is nineteen kilometres long, intensely blue, and ringed by peaks over six thousand metres.',
    'Unlike Pangong it is a Ramsar wetland and a breeding site for black-necked crane, bar-headed goose and Brahminy duck, and it is substantially quieter — the road is worse and the drive longer, which filters the traffic.',
    'Korzok on the shore is one of the highest permanently inhabited settlements anywhere, with a monastery and a Changpa nomad population who still move livestock across the plateau.'
  ],
  see: [
    { n: 'The lake shore at Korzok',
      d: 'Walk south along the water in the morning before the wind gets up. The colour changes through the day.' },
    { n: 'Korzok Monastery',
      d: 'Small, around three hundred years old, with a resident community and a summer festival.' },
    { n: 'Tso Kar on the way',
      d: 'A smaller salt lake with a white crust along the edges, and better crane sightings than Moriri.' },
    { n: 'The Changpa encampments',
      d: 'Nomad camps with pashmina goats. Ask before photographing people.' },
    { n: 'Puga and the Tsokar basin',
      d: 'Geothermal vents and sulphur deposits on the high plain.' }
  ],
  when: 'June to September. Permits required. Nights are below freezing in any month.',
  stay: 'One or two nights, often on a loop with Pangong via Chushul.',
  move: 'Seven to eight hours from Leh. Rough road. Fuel only at Karu — fill up.',
  eat: 'Homestays and tented camps at Korzok. Carry water and snacks.'
},

'LAD-hemis': {
  intro: [
    'Hemis is the largest and wealthiest monastery in Ladakh, of the Drukpa lineage, founded in its present form in 1630 and tucked into a side valley forty-five kilometres from Leh where it was hidden from raiders coming up the Indus.',
    'The Hemis festival, on the tenth day of the fifth Tibetan month, is the best-known in Ladakh: masked cham dances in the courtyard over two days, and once every twelve years the unveiling of a giant thangka of Padmasambhava.',
    'The monastery also features in a durable piece of nonsense — a nineteenth-century claim that manuscripts here record Jesus studying in India. No such manuscripts have ever been produced.'
  ],
  see: [
    { n: 'The main assembly hall and museum',
      d: 'Thangkas, gilt statues, and a well-presented museum of monastic objects in the lower building.' },
    { n: 'The Hemis festival', t: 'late June or early July',
      d: 'Two days of masked dance. Arrive early for a place; it is the most visited festival in the region.' },
    { n: 'Gotsang hermitage',
      d: 'A steep hour above the monastery, where meditators still retreat. Few visitors make the climb.' },
    { n: 'Hemis High Altitude National Park',
      d: 'The valley behind, and one of the best places in the world to track snow leopard in February.' }
  ],
  when: 'May to September for the monastery; February for snow leopard trips. Check the festival date, which moves annually.',
  stay: 'Half a day from Leh; two nights if you want Gotsang and the park.',
  move: 'Forty-five kilometres from Leh, under two hours. Taxi or bus.',
  eat: 'A small monastery canteen and a cafe below.'
},

'LAD-thiksey': {
  intro: [
    'Thiksey is a twelve-storey monastery stacked up a hill nineteen kilometres from Leh, and it is the one that looks most like the Potala — which is not accidental, since both belong to the Gelugpa order.',
    'The fifteen-metre Maitreya Buddha inside was installed in 1970 to mark a visit by the Dalai Lama; it sits across two storeys, so you meet it at chest height on the upper floor.',
    'Morning puja, around six thirty, is open to visitors: horns, cymbals, chanting, and tea poured for the monks from a copper urn. It is the thing to come for and almost nobody does.'
  ],
  see: [
    { n: 'Morning prayers',
      d: 'Arrive by six fifteen, sit at the back, do not photograph during the ritual. Half an hour that justifies the early start.' },
    { n: 'The Maitreya temple',
      d: 'Two storeys of seated Buddha, built around the figure. Painted in strong colour.' },
    { n: 'The roof terrace',
      d: 'A view down the Indus valley to Shey and Stok, and the Stok Kangri range opposite.' },
    { n: 'Shey Palace and Stok',
      d: 'Both within ten minutes — Shey with a large copper Buddha, Stok with the royal family’s museum.' }
  ],
  when: 'May to September. Gustor festival falls in October or November.',
  stay: 'Two hours, or a morning with Shey and Stok.',
  move: 'Nineteen kilometres from Leh. Taxis go early for the puja by arrangement.',
  eat: 'A cafe at the base; eat in Leh.'
},

'LAD-lamayuru': {
  intro: [
    'Lamayuru is the oldest surviving monastery in Ladakh, of the Drikung Kagyu order, and it stands above a landscape of eroded clay badlands that everyone calls moonland — pale, folded, utterly bare sediment from an ancient lake bed.',
    'The eleventh-century assembly hall holds a cave where the translator Naropa is said to have meditated, and the monastery claims a lineage running back before Buddhism’s second diffusion into Tibet.',
    'It sits on the Leh–Srinagar highway, which makes it easy to reach and a natural overnight on that drive.'
  ],
  see: [
    { n: 'The old assembly hall and Naropa’s cave',
      d: 'Small, dark and genuinely old, with murals under layers of soot.' },
    { n: 'The moonland viewpoint',
      d: 'A few kilometres before the monastery on the highway. Best in low light.' },
    { n: 'Wanla',
      d: 'A tenth-century temple in a side valley with murals comparable to Alchi and almost no visitors.' },
    { n: 'The Yuru Kabgyat festival',
      d: 'Masked dances in June or July, smaller and less crowded than Hemis.' }
  ],
  when: 'May to October, when the Srinagar road is open.',
  stay: 'A night, breaking the Leh–Srinagar or Leh–Kargil drive.',
  move: 'A hundred and twenty-five kilometres from Leh, four hours. Buses on the highway.',
  eat: 'Monastery guest house and two or three dhabas.'
},

'LAD-alchi': {
  intro: [
    'Alchi holds the most important early Buddhist wall painting in the Indian Himalaya. The temples date from the eleventh and twelfth centuries and were painted by Kashmiri artists, in a style that vanished in Kashmir itself when the region turned to Islam — which makes these murals the last surviving record of it.',
    'The figures are unlike anything in later Tibetan art: slender, Indian in feature, wearing patterned textiles rendered in extraordinary detail, with Persian and Central Asian elements in the borders.',
    'It escaped destruction because the Indus shifted and the village fell off the trade route. Photography is forbidden and the interiors are lit only by what comes through the door.'
  ],
  see: [
    { n: 'The Sumtsek',
      d: 'Three storeys, with four-metre bodhisattvas whose dhotis carry painted scenes small enough to need a torch. The single most remarkable interior in Ladakh.' },
    { n: 'The Dukhang',
      d: 'The assembly hall, with a mandala cycle and a carved wooden doorway.' },
    { n: 'Manjushri and Lotsawa temples',
      d: 'Later additions in the same compound, worth the extra ten minutes.' },
    { n: 'Mangyu and Sumda Chun',
      d: 'Two related temple sites nearby with the same school of painting and essentially no visitors. Sumda Chun needs a walk.' }
  ],
  when: 'May to October. Bring a torch; flash is prohibited and would damage the pigment.',
  stay: 'Half a day from Leh, or a night in the village.',
  move: 'Seventy kilometres from Leh, two hours, off the Srinagar highway.',
  eat: 'A couple of guest houses in the village with apricot orchards.'
},

'LAD-khardung-la': {
  intro: [
    'Khardung La is the pass between Leh and the Nubra valley, and the sign at the top claims five thousand six hundred and two metres and the title of the world’s highest motorable road. Both figures are wrong — it is about five thousand three hundred and sixty metres and several Ladakhi passes are higher — but it remains a genuinely high crossing on a working road.',
    'The road was built in 1976 and opened to civilians in 1988. It is a strategic artery to the Siachen glacier and the Border Roads Organisation keeps it open through most of the year with a lot of effort.',
    'There is nothing at the top but a sign, a cafeteria, prayer flags and less than half the oxygen at sea level. Do not linger, and do not come up on your first day in Ladakh.'
  ],
  see: [
    { n: 'The pass itself',
      d: 'Fifteen or twenty minutes is plenty. Any longer at this altitude and you will feel it.' },
    { n: 'The climb from South Pullu',
      d: 'Switchbacks with Leh shrinking below and the Zanskar range opening up behind.' },
    { n: 'North Pullu and the descent',
      d: 'The drop into Nubra, from rock to green valley in forty kilometres.' },
    { n: 'The army cafeteria',
      d: 'Tea and Maggi at five thousand metres, run by the Border Roads Organisation.' }
  ],
  when: 'June to September is reliable; the pass is cleared most of the year but closes in storms.',
  stay: 'A stop, not a destination. Permits required.',
  move: 'Taxi or motorcycle from Leh. Acclimatise two full days in Leh first.',
  eat: 'The cafeteria, and nothing else.'
},

'LAD-zanskar': {
  intro: [
    'Zanskar is a valley cut off from everywhere by passes that close for seven months a year. Until the Nimmu–Padum road neared completion it was reachable in summer only by a single road over Pensi La from Kargil, and in winter only by walking down the frozen Zanskar river.',
    'That walk — the Chadar — runs for several days on river ice through a gorge, and was the lifeline the valley actually used. It is now a commercial trek, and a warming climate is making the ice less reliable each year.',
    'Padum is the only town. The monasteries at Karsha, Phuktal and Stongdey, and the Markha and Darcha–Padum trekking routes, are what people come for.'
  ],
  see: [
    { n: 'Phuktal Monastery',
      d: 'Built into a cliff cave above a river, reached only on foot, and one of the most startling buildings in the Himalaya.' },
    { n: 'Karsha',
      d: 'The largest gompa in Zanskar, stacked up a hillside across the valley from Padum.' },
    { n: 'The Chadar trek', t: 'January and February',
      d: 'Several days on the frozen river at minus twenty-five or worse. Serious, permitted, and increasingly weather-dependent.' },
    { n: 'Pensi La',
      d: 'The pass in from Kargil, with the Drang Drung glacier below it.' },
    { n: 'Rafting the Zanskar',
      d: 'Multi-day descents through the gorge from Remala to Nimmu in summer.' }
  ],
  when: 'June to September by road; January and February for the Chadar. Everything else is closed.',
  stay: 'A week minimum. This is not a side trip.',
  move: 'Kargil to Padum, eight to twelve hours over Pensi La. The new direct road from Nimmu is transforming access.',
  eat: 'Homestays and camp kitchens. Supplies in Padum are limited.'
},

'LAD-turtuk': {
  intro: [
    'Turtuk is one of four Balti villages that were part of Pakistan until the 1971 war moved the line, and it only opened to visitors in 2010. The people are Balti Muslims, the language is Balti, and the culture belongs to Baltistan rather than to Buddhist Ladakh.',
    'It sits at around two thousand nine hundred metres on the Shyok, with terraced barley and buckwheat, apricot orchards, and stone-roofed houses. Several families still have relatives on the other side of the Line of Control whom they have not seen since 1971.',
    'It is the last village visitors may reach on this road. The Line of Control is a few kilometres on.'
  ],
  see: [
    { n: 'The village lanes and irrigation channels',
      d: 'Walk up through the terraces. The water channels and the communal cold-storage cellars cut into rock are the practical architecture of the place.' },
    { n: 'The royal house',
      d: 'The Yagbo family, descendants of the Balti rulers, keep a small museum of household objects.' },
    { n: 'The viewpoint towards the LoC',
      d: 'A short climb to a view up the Shyok, with K2 somewhere beyond the ridge.' },
    { n: 'Apricot season',
      d: 'July and August, when the roofs are covered in fruit drying in the sun.' }
  ],
  when: 'June to September. Permits required, arranged in Leh.',
  stay: 'One or two nights. Homestays are the whole accommodation stock and are the point.',
  move: 'Three hours beyond Diskit in Nubra; seven to eight from Leh.',
  eat: 'Balti home cooking — buckwheat pancakes, apricot soup, and bread baked in a floor oven.'
},

'LAD-kargil': {
  intro: [
    'Kargil is the second town of Ladakh, mostly Shia Muslim, on the Suru river roughly halfway between Srinagar and Leh. For most travellers it is a place to sleep on that drive.',
    'It is also the name attached to the 1999 conflict, when Pakistani forces occupied heights above the highway and were removed over several months of fighting at extreme altitude. The war memorial at Dras, north of town, is well made and worth the stop.',
    'Dras itself has recorded temperatures near minus sixty and is often described as the second-coldest inhabited place on earth.'
  ],
  see: [
    { n: 'Kargil War Memorial, Dras',
      d: 'Tololing and Tiger Hill visible from the site, with a museum and army guides who fought there.' },
    { n: 'The Suru valley',
      d: 'South towards Rangdum and Zanskar, with Nun and Kun — both over seven thousand metres — standing over the valley at Panikhar.' },
    { n: 'Mulbekh Chamba',
      d: 'A nine-metre Maitreya carved into a roadside rock face, probably eighth century, on the way to Leh.' },
    { n: 'The bazaar',
      d: 'Apricots, dried fruit and a very different atmosphere from Buddhist Ladakh.' }
  ],
  when: 'May to October. The Srinagar road closes in winter; the Leh road sometimes stays open.',
  stay: 'A night on the Srinagar–Leh drive.',
  move: 'Midway on the NH1. Buses and shared taxis both directions.',
  eat: 'Simple Kashmiri and Balti food; the apricots are exceptional.'
},

'LAD-markha': {
  intro: [
    'The Markha valley is the standard Ladakhi trek and deserves to be — six to eight days from Chilling or Zingchen over two passes, through a side valley of the Zanskar range with villages every few hours and homestays in most of them.',
    'The homestay network means you can walk it without tents or a support crew, eating and sleeping with families, which is both easier and far more interesting than camping.',
    'The high point is Kongmaru La at just over five thousand metres, with Kang Yatse standing over the upper valley at six thousand four hundred.'
  ],
  see: [
    { n: 'Skiu to Markha',
      d: 'The gentlest section, along the river with repeated crossings, poplars and small gompas.' },
    { n: 'Hankar and Nimaling',
      d: 'The upper valley, high grazing meadow at four thousand seven hundred metres below Kang Yatse.' },
    { n: 'Kongmaru La',
      d: 'Five thousand two hundred and sixty metres, with the Stok range and the Indus valley beyond on the descent.' },
    { n: 'The homestays',
      d: 'A rotating system that spreads income across the villages. Pay the fixed rate and do not bargain.' },
    { n: 'Tacha Monastery',
      d: 'Perched on a crag above Markha village, a short steep detour.' }
  ],
  when: 'June to September. River crossings are highest in July with snowmelt.',
  stay: 'Six to eight days walking, plus three days acclimatising in Leh first.',
  move: 'Road to Zingchen or Chilling from Leh. Guides and pack animals hired in Leh; permits for parts of the route.',
  eat: 'Homestay kitchens — thukpa, skyu, tsampa and endless butter tea.'
},

/* ===================== JAMMU & KASHMIR ===================== */
'JKA-srinagar': {
  intro: [
    'Srinagar sits at sixteen hundred metres around Dal Lake, with the Jhelum running through it and the Zabarwan hills behind. The Mughals treated it as the most beautiful place in their empire and built terraced gardens up the slopes; Jahangir, dying, is said to have asked only for Kashmir.',
    'The city is a layered thing: Mughal gardens, a fourteenth-century wooden mosque, a British-era houseboat culture invented because foreigners were forbidden to own land, and shikara boats that still deliver vegetables from floating gardens.',
    'It has also been at the centre of the Kashmir conflict for decades, with the security presence and the periodic shutdowns that implies. Conditions change; check before you book, travel with local advice, and be aware that internet and transport can be interrupted.'
  ],
  see: [
    { n: 'A night on a houseboat',
      d: 'Carved cedar interiors on Dal or Nigeen lake. Nigeen is quieter and cleaner. Negotiate firmly and confirm what is included.' },
    { n: 'Shikara at dawn',
      d: 'Out to the floating vegetable market, where boats trade produce on the water before sunrise. Arrange it the night before.' },
    { n: 'The Mughal gardens',
      d: 'Shalimar, Nishat and Chashme Shahi, terraced up the hillside with chinar trees and water channels. Best in spring blossom or autumn colour.' },
    { n: 'Jamia Masjid and the old city',
      d: 'A 1394 mosque with three hundred and seventy deodar pillars, in a quarter of brick and timber houses and papier-mache workshops.' },
    { n: 'Shankaracharya and Hazratbal',
      d: 'A temple on the hill above the city and the principal Muslim shrine on the lake shore.' }
  ],
  when: 'April and May for blossom, September and October for chinar colour. December to February for snow and frozen lake edges. The tulip garden opens for a few weeks in April.',
  stay: 'Three nights.',
  move: 'Flights from Delhi; the road from Jammu is long and subject to closure. Autos and shikaras in the city.',
  eat: 'Wazwan is the thing — a multi-course Kashmiri feast, with rista, gushtaba and tabak maaz. Also kahwa tea, and harissa in winter mornings.'
},

'JKA-gulmarg': {
  intro: [
    'Gulmarg is a meadow bowl at twenty-six hundred metres surrounded by fir forest, with the Afarwat ridge rising above it to over four thousand. The gondola up that ridge is among the highest cable cars in the world, and it gives access to a vast amount of off-piste terrain.',
    'That terrain is why serious skiers come. The lift-served vertical, the snow quality and the backcountry around Afarwat are as good as anywhere in Asia, and there is essentially no piste grooming or avalanche control, which cuts both ways — people have died here. Hire a certified guide and carry transceiver, shovel and probe.',
    'In summer it is a golf course at an absurd altitude, a meadow of wildflowers, and a base for walks.'
  ],
  see: [
    { n: 'The Gulmarg Gondola',
      d: 'Two stages to just under four thousand metres. The second stage is weather-dependent and queues are long; book online.' },
    { n: 'Skiing and backcountry',
      d: 'January to March. Guides through the Indian Institute of Skiing or private operators; do not go beyond the lift without one.' },
    { n: 'Summer walks',
      d: 'To Khilanmarg, the Alpather lake under Afarwat, and through the fir to Baba Reshi’s shrine.' },
    { n: 'The golf course',
      d: 'One of the highest in the world, open June to September.' }
  ],
  when: 'January to March for skiing, June to September for walking. The road up can close in heavy snow.',
  stay: 'Three nights for skiing, one or two in summer.',
  move: 'Two hours from Srinagar. Taxis; the last stretch may need chains in winter.',
  eat: 'Hotel dining rooms. Limited choice; the Kashmiri food is better in Srinagar.'
},

'JKA-pahalgam': {
  intro: [
    'Pahalgam sits at twenty-one hundred metres where two streams meet to form the Lidder, in a valley of pine and meadow that is the gentlest of the Kashmir hill resorts. Bollywood has filmed here for sixty years and the meadows have the names to prove it.',
    'It is also the starting point of the Amarnath Yatra, a pilgrimage to an ice stalagmite in a cave at just under four thousand metres, which brings several hundred thousand people through in July and August under heavy security.',
    'Out of yatra season it is quiet, green and good for walking, with the Kolahoi glacier a two-day trek up the valley.'
  ],
  see: [
    { n: 'Aru and Betaab valleys',
      d: 'Both a short drive up, both meadow and pine with the river running through. Aru is the trailhead for Kolahoi and Tarsar Marsar.' },
    { n: 'Baisaran',
      d: 'A meadow above the town reached on foot or by pony, with a view down the Lidder.' },
    { n: 'Chandanwari',
      d: 'Sixteen kilometres up, the yatra roadhead, with a snow bridge that survives into summer.' },
    { n: 'Tarsar Marsar trek',
      d: 'Four to six days to two alpine lakes, among the best treks in Kashmir and far less known than the Great Lakes route.' },
    { n: 'Trout fishing on the Lidder',
      d: 'Permits from the fisheries department; brown trout introduced under the British.' }
  ],
  when: 'April to October. Avoid July and August if you are not on the yatra, when the valley is at capacity.',
  stay: 'Two nights, more if trekking.',
  move: 'Two and a half hours from Srinagar. Pony and taxi cartels operate fixed rates for the side valleys.',
  eat: 'Hotel kitchens and Kashmiri wazwan on request.'
},

'JKA-sonamarg': {
  intro: [
    'Sonamarg is a meadow at twenty-seven hundred metres on the road to Ladakh, just below Zoji La, and the name means meadow of gold — for the flowers, or for the light on the peaks, depending on who is telling you.',
    'The Thajiwas glacier hangs above it, close enough to walk to, and the Sindh river runs through fast and very cold. It is the last Kashmiri stop before the pass and the Ladakh side.',
    'It is also the trailhead for the Kashmir Great Lakes trek, which is the best-known multi-day walk in the region.'
  ],
  see: [
    { n: 'Thajiwas glacier',
      d: 'Three kilometres up from the meadow by pony or on foot. Snow persists through summer at the snout.' },
    { n: 'Kashmir Great Lakes trek',
      d: 'Six to eight days over four passes past seven alpine lakes, starting here or at Naranag. July to September.' },
    { n: 'Zoji La',
      d: 'The pass east towards Dras and Kargil, at thirty-five hundred metres, and one of the more exposed roads in India.' },
    { n: 'Baltal',
      d: 'The northern base for the Amarnath Yatra, fifteen kilometres on.' }
  ],
  when: 'May to October; the road and the meadow are snowed in through winter.',
  stay: 'A night, or the start of a trek.',
  move: 'Three hours from Srinagar on the NH1. Beyond here you need a vehicle rated for Zoji La.',
  eat: 'Dhabas and a few hotels; carry snacks.'
},

'JKA-vaishno-devi': {
  intro: [
    'The Vaishno Devi shrine is a cave at seventeen hundred metres in the Trikuta hills above Katra, and it is one of the most visited religious sites in the world — somewhere around eight to ten million pilgrims a year, which puts it in the same bracket as Mecca and the Vatican.',
    'The approach is a thirteen-kilometre paved track from Katra, climbing about eleven hundred metres, walked day and night by a continuous stream of people. Ponies, palanquins, battery cars and helicopters all serve it.',
    'Inside the cave are three natural rock formations representing the goddess in three aspects. The queue for darshan is managed by numbered slips and can run many hours.'
  ],
  see: [
    { n: 'The walk from Katra',
      d: 'Thirteen kilometres, four to six hours up. Walking it at night is cooler and the atmosphere is remarkable.' },
    { n: 'Ardhkuwari',
      d: 'Halfway, with a narrow cave pilgrims squeeze through. Expect a long wait here too.' },
    { n: 'Bhairon Temple',
      d: 'Two and a half kilometres above the main shrine; the pilgrimage is traditionally incomplete without it.' },
    { n: 'The helicopter from Katra',
      d: 'Eight minutes to Sanjichhat, cutting out most of the climb. Book online well ahead.' }
  ],
  when: 'March to October. Navratri in spring and autumn brings the heaviest crowds; the shrine is open year round, with snow possible in winter.',
  stay: 'A night in Katra, with the climb overnight or at dawn.',
  move: 'Katra has a railway station. Registration slips are mandatory and free; get them at the Katra counter or online.',
  eat: 'Vegetarian langar and canteens along the whole route, run by the shrine board and genuinely good.'
},

'JKA-yusmarg': {
  intro: [
    'Yusmarg is a meadow at twenty-four hundred metres about an hour from Srinagar, with pine forest around it and the Pir Panjal behind. It has almost no infrastructure, which is exactly why it is worth the drive.',
    'The name is linked to a local tradition about Jesus having passed through, which is almost certainly not true and which nobody here presses very hard.',
    'It is a place to walk, sit and have lunch cooked on a fire. There is a lake, Nilnag, an hour up on foot or by pony, and a river called the Doodhganga that runs white with meltwater.'
  ],
  see: [
    { n: 'The meadow',
      d: 'Walk out across it away from the car park and the ponies. Wildflowers in May and June.' },
    { n: 'Nilnag Lake',
      d: 'Four kilometres up through the pines, quiet, with reflections of the ridge.' },
    { n: 'Doodhganga river',
      d: 'Milk-white with glacial flour, running fast at the edge of the meadow.' },
    { n: 'Charar-e-Sharief',
      d: 'A major Sufi shrine on the way back to Srinagar, rebuilt after a fire in 1995.' }
  ],
  when: 'April to October; snow in winter makes it a short sledging destination.',
  stay: 'A day trip from Srinagar. Minimal accommodation.',
  move: 'An hour and a half by taxi from Srinagar.',
  eat: 'A few stalls; better to bring lunch.'
},

'JKA-jammu': {
  intro: [
    'Jammu is the winter capital of the union territory and the gateway to it from the plains — a Dogra city on bluffs above the Tawi, Hindu-majority and culturally closer to Punjab than to the Kashmir valley.',
    'Most people pass through on the way to Vaishno Devi or Srinagar. The Raghunath temple complex, with its gilded interiors and a library of Sanskrit manuscripts, and the Amar Mahal palace above the river, are the reasons to stop for half a day.'
  ],
  see: [
    { n: 'Raghunath Temple',
      d: 'A complex of seven shrines from the 1850s, with gold-leafed interiors. Security is tight after past attacks.' },
    { n: 'Amar Mahal',
      d: 'A red sandstone palace built in French chateau style, now a museum, with a view over the Tawi and the Shivaliks.' },
    { n: 'Bahu Fort',
      d: 'Across the river, with a Kali temple inside and terraced gardens below.' },
    { n: 'Mubarak Mandi',
      d: 'The old Dogra palace complex, partly ruined and under slow restoration.' }
  ],
  when: 'October to March. Summer on this side of the mountains is extremely hot.',
  stay: 'Half a day in transit.',
  move: 'Major railhead and airport. The highway to Srinagar runs from here and closes in bad weather.',
  eat: 'Dogra food — rajma chawal, kaladi cheese, and good patisa.'
},

'JKA-doodhpathri': {
  intro: [
    'Doodhpathri is a meadow at about twenty-seven hundred metres in Budgam district, roughly two hours from Srinagar, and it is what Gulmarg and Pahalgam were before the hotels. The name means valley of milk, after a stream that runs white over pale stone.',
    'There is nothing here: grass, conifers, streams, shepherds in summer and snow in winter. No hotels to speak of, which keeps it the way it is.'
  ],
  see: [
    { n: 'The meadows',
      d: 'Several, stepping up the valley, with grazing flocks and the Pir Panjal behind.' },
    { n: 'The stream',
      d: 'Shallow, very cold and white over the rock, which is the whole of the name.' },
    { n: 'Tangnar',
      d: 'Higher up, reached on foot or by pony, with better views and nobody there.' },
    { n: 'Charar-e-Sharief',
      d: 'On the route back, the shrine of a fifteenth-century Kashmiri Sufi.' }
  ],
  when: 'May to September for green, December to February for snow.',
  stay: 'A day trip from Srinagar.',
  move: 'Two hours by taxi. No public transport worth relying on.',
  eat: 'Tea stalls in season. Bring food.'
},

/* ===================== PUNJAB ===================== */
'PUN-wagah': {
  intro: [
    'Wagah is the only road crossing between India and Pakistan, and every evening before sunset the border guards of both countries perform a joint ceremony to lower their flags: high kicking, aggressive moustache-twirling, shouting, and a precisely choreographed handshake between the commanders.',
    'It began in 1959 and has become a nationalist spectacle on both sides, with stadium seating, piped patriotic music and crowds of several thousand facing each other across the gate.',
    'It is simultaneously absurd, moving and slightly unnerving, and it is one of the more revealing hours available anywhere on the subcontinent.'
  ],
  see: [
    { n: 'The Beating Retreat ceremony',
      d: 'Arrive at least ninety minutes early. Foreign passport holders get a separate and better section — ask at the gate.' },
    { n: 'The crowd',
      d: 'Half the interest. Dancing in the road before it starts, and the response when the Pakistani side gets louder.' },
    { n: 'Attari village',
      d: 'The last Indian settlement, with the freight terminal and a very long queue of trucks.' },
    { n: 'Amritsar',
      d: 'Thirty kilometres back; most people do Wagah as an evening excursion from the Golden Temple.' }
  ],
  when: 'Year round, daily, timed to sunset. Avoid periods of diplomatic tension, when it may be curtailed. Bags are not allowed and large camera lenses may be refused.',
  stay: 'Three hours including travel.',
  move: 'Taxis and shared vehicles from Amritsar, an hour each way. Leave bags at the hotel.',
  eat: 'Stalls at the car park; eat properly back in Amritsar.'
},

'PUN-anandpur-sahib': {
  intro: [
    'Anandpur Sahib is where Guru Gobind Singh founded the Khalsa in 1699, calling for five men willing to give their heads and then initiating them — the event that gave Sikhism its distinct identity, its five articles of faith and its martial character.',
    'It is one of the five takhts, the seats of Sikh temporal authority, and the gurdwara stands on a rise above the Sutlej with the Shivaliks behind.',
    'Hola Mohalla, held the day after Holi, is the great occasion: three days of mock battles, horsemanship and gatka martial arts displays by the Nihang orders, who are not performing for tourists.'
  ],
  see: [
    { n: 'Takht Sri Keshgarh Sahib',
      d: 'The main gurdwara, holding weapons attributed to Guru Gobind Singh.' },
    { n: 'Virasat-e-Khalsa',
      d: 'A museum of Sikh history by Moshe Safdie, and one of the best-designed buildings in India. Allow two hours.' },
    { n: 'Hola Mohalla', t: 'March',
      d: 'Nihang cavalry, mock combat and an enormous langar. Crowded, loud and unlike anything else.' },
    { n: 'The forts',
      d: 'Five were built around the town by the tenth Guru; the remains of Anandgarh and Lohgarh can be visited.' }
  ],
  when: 'October to March. Hola Mohalla follows Holi.',
  stay: 'A day, or a night during the festival.',
  move: 'An hour and a half from Chandigarh; there is a railway station. Cover your head and remove shoes at the gurdwara.',
  eat: 'Langar at the gurdwara, free and excellent, as everywhere in Punjab.'
},

'PUN-chandigarh': {
  intro: [
    'Chandigarh was built from nothing after partition to replace Lahore as the Punjabi capital, master-planned by Le Corbusier from 1951 in a grid of numbered sectors, each intended to be self-sufficient.',
    'It is the most complete piece of modernist city planning anywhere, and the Capitol Complex — the High Court, Secretariat and Assembly, with the Open Hand monument — is a World Heritage site. The buildings are raw concrete, enormous, and in places genuinely overwhelming.',
    'It also contains the Rock Garden, forty acres built single-handed and without permission over eighteen years by a road inspector named Nek Chand out of industrial waste and broken crockery, which may be the better of the two things here.'
  ],
  see: [
    { n: 'The Capitol Complex', t: 'guided tours only, book ahead',
      d: 'The Assembly’s hyperbolic chamber and the High Court’s coloured piers. Free tours run at fixed times; bring your passport.' },
    { n: 'The Rock Garden',
      d: 'Nek Chand’s terraces of mosaic figures made from bangles, sockets and tiles, with narrow passages and waterfalls. Extraordinary.' },
    { n: 'Sukhna Lake',
      d: 'An artificial lake at the foot of the Shivaliks, with a promenade that the whole city walks at dusk.' },
    { n: 'Le Corbusier Centre',
      d: 'In his former office, with the original plans and models. Good context before the Capitol.' },
    { n: 'Sector 17',
      d: 'The pedestrian commercial core, which reads as a period piece in the best sense.' }
  ],
  when: 'October to March. Summer is brutal and the concrete does not help.',
  stay: 'Two nights.',
  move: 'Airport and major railhead. The grid makes it very drivable and surprisingly cyclable.',
  eat: 'Punjabi food at its most confident; the dhabas on the outskirts are better than the restaurants in the sectors.'
},

'PUN-patiala': {
  intro: [
    'Patiala was a princely state whose rulers were enthusiastic to the point of legend — the Patiala peg, a double measure of whisky, is named for them, and so is a necklace Cartier made containing nearly three thousand diamonds.',
    'Qila Mubarak in the centre is an eighteenth-century fort complex with painted halls, and the Sheesh Mahal outside town holds a museum and a startlingly large collection of medals.',
    'It is also a centre of Punjabi music and of the Patiala gharana of classical singing, and it is where the salwar is cut in the style that carries the city’s name.'
  ],
  see: [
    { n: 'Qila Mubarak',
      d: 'A fort within the old city, with the Qila Androon’s painted chambers under slow restoration.' },
    { n: 'Sheesh Mahal and the medal gallery',
      d: 'A palace with a suspension bridge, an art gallery and one of the largest medal collections in the world.' },
    { n: 'Baradari Gardens',
      d: 'Nineteenth-century gardens with a colonial-era palace in them, pleasant at dusk.' },
    { n: 'Gurdwara Dukh Niwaran Sahib',
      d: 'A major local gurdwara with a tank said to relieve suffering.' }
  ],
  when: 'October to March.',
  stay: 'A day, or a night between Delhi and Amritsar.',
  move: 'An hour from Chandigarh, with a railway station.',
  eat: 'Patiala is a serious eating town — kulcha, lassi in a steel tumbler the size of a bucket, and the best chole bhature in the state.'
},

/* ===================== HARYANA ===================== */
'HAR-kurukshetra': {
  intro: [
    'Kurukshetra is where the Mahabharata war was fought, and where Krishna is said to have delivered the Bhagavad Gita to Arjuna on the first morning of it. For a battlefield of such mythological weight, it is a remarkably ordinary stretch of Haryana farmland.',
    'The site is marked by a set of tanks, temples and a tree — the Jyotisar banyan, held to stand where the Gita was spoken. There is a well-made museum and a light-and-sound presentation.',
    'It is a long-standing pilgrimage centre, particularly at solar eclipses, when enormous numbers bathe in the Brahma Sarovar.'
  ],
  see: [
    { n: 'Jyotisar',
      d: 'The banyan and a marble chariot marking the Gita’s setting, with an evening light-and-sound show.' },
    { n: 'Brahma Sarovar',
      d: 'An enormous rectangular tank, among the largest in Asia, filled with bathers at Gita Jayanti and during eclipses.' },
    { n: 'Sri Krishna Museum and the Panorama',
      d: 'Sculpture, manuscripts and a circular painted panorama of the war. Genuinely good.' },
    { n: 'Bhishma Kund at Narkatari',
      d: 'Where Bhishma is said to have lain dying on a bed of arrows.' }
  ],
  when: 'October to March. Gita Jayanti in November or December is the main festival.',
  stay: 'Half a day.',
  move: 'Two and a half hours from Delhi on the Grand Trunk Road, with a railway station.',
  eat: 'Haryanvi dhaba food on the highway — among the best roadside eating in India.'
},

'HAR-sultanpur': {
  intro: [
    'Sultanpur is a shallow freshwater lake fifty kilometres from Delhi that was a duck-shooting spot for the Mughals and the British and is now a national park of about a square and a half kilometre.',
    'It is small enough to walk round in two hours and holds over two hundred and fifty species, with the winter concentration of migratory waterfowl from Siberia, Europe and Central Asia being the draw.',
    'For anyone in Delhi with a free morning and a pair of binoculars, it is the single best thing available.'
  ],
  see: [
    { n: 'The walking circuit',
      d: 'A path round the lake with four hides. Early morning in winter is the time.' },
    { n: 'Winter waterfowl',
      d: 'November to February: shovelers, pintails, pochards, and large flocks of bar-headed geese.' },
    { n: 'The resident breeders',
      d: 'Painted stork and black-necked stork nest here; sarus crane are often around.' },
    { n: 'The interpretation centre',
      d: 'Small but useful for identifying what you are about to see.' }
  ],
  when: 'November to February. Closed Tuesdays. The lake can dry out badly in a poor monsoon year.',
  stay: 'A morning from Delhi or Gurgaon.',
  move: 'An hour from central Delhi by road, close to Gurgaon.',
  eat: 'Nothing on site. Eat in Gurgaon.'
},

'HAR-morni': {
  intro: [
    'Morni is the only hill station in Haryana, a low Shivalik ridge at about twelve hundred metres an hour from Chandigarh, with pine and a pair of small lakes that local legend says are connected underground.',
    'It is a modest place and makes no claims. People come up from Chandigarh for a day, walk a bit, look at the view over the plains, and go back.'
  ],
  see: [
    { n: 'Tikkar Taal',
      d: 'The two lakes, with boating and a tourism complex. Pleasant in the morning.' },
    { n: 'Morni Fort',
      d: 'A small ruined fort on the ridge with a view over the Shivaliks.' },
    { n: 'The ridge road',
      d: 'Pine forest, a few viewpoints and almost no traffic on a weekday.' },
    { n: 'The adventure park at Tikkar',
      d: 'State-run zip lines and climbing, aimed at families.' }
  ],
  when: 'September to April. Pleasant in the monsoon too, with rain.',
  stay: 'A day trip from Chandigarh.',
  move: 'Forty-five kilometres from Chandigarh, around ninety minutes on a winding road.',
  eat: 'Haryana tourism cafeterias and a few dhabas.'
},

/* ===================== GUJARAT ===================== */
'GUJ-rann-of-kutch': {
  intro: [
    'The Great Rann is a salt marsh the size of a small country that floods with seawater every monsoon and dries to a white crust every winter. For about four months of the year you can walk out onto it and see nothing in any direction but flat white salt meeting sky.',
    'It is the only place on earth where the greater flamingo breeds in large numbers in a desert, at a mudflat island called Flamingo City, and the only home of the Indian wild ass.',
    'The Rann Utsav, a tented festival the state runs from November to February near Dhordo, has made it accessible to anyone, for better and worse. Away from the tent city it is still as empty as it sounds.'
  ],
  see: [
    { n: 'The white desert at full moon',
      d: 'Walk out from Dhordo onto the salt. On a full-moon night the crust reflects the light and the horizon vanishes entirely. Permits at Bhirandiyara.' },
    { n: 'Kalo Dungar',
      d: 'Black Hill, the highest point in Kutch, with a view over the whole Rann towards Pakistan and a temple where jackals are fed each evening.' },
    { n: 'The craft villages',
      d: 'Nirona for rogan painting and copper bells, Ajrakhpur for block printing, Hodka and Bhirandiyara for embroidery. The best textile region in India.' },
    { n: 'Banni grasslands',
      d: 'Between the Rann and Bhuj, with Maldhari pastoralists, chinkara, desert fox and outstanding birding.' },
    { n: 'The Little Rann for wild ass',
      d: 'A separate drive south, and the only place to see the species.' }
  ],
  when: 'November to February. The Rann is under water from June to October and the salt is not walkable.',
  stay: 'Three nights, based at Dhordo, Hodka or Bhuj.',
  move: 'Bhuj is the railhead and airport, eighty kilometres from the Rann. Permits for the border zone from Bhirandiyara; carry ID.',
  eat: 'Kutchi Gujarati — bajra rotla, kadhi, and a lot of ghee. The tented camps feed you well.'
},

'GUJ-gir': {
  intro: [
    'Gir holds the only wild Asiatic lions left on earth. The population fell to perhaps twenty animals at the start of the twentieth century, saved by a Nawab of Junagadh who banned hunting on his own land, and has recovered to something over six hundred across the wider landscape.',
    'The forest is dry teak and acacia, more open than the tiger parks, and the lions are relatively relaxed about vehicles. Sightings are among the most reliable of any large predator in India.',
    'Maldhari pastoralists still live inside the sanctuary with their buffalo, in settlements called nesses, and have done for generations — an arrangement that complicates conservation and has largely worked.'
  ],
  see: [
    { n: 'Jeep safaris from Sasan Gir',
      d: 'Three slots a day, permits booked online well in advance. Zone allocation is by lottery; sightings are good across all of them.' },
    { n: 'Devalia Interpretation Zone',
      d: 'A fenced enclosure with a bus tour, for visitors who cannot get a permit. Guaranteed lions, in a large enclosure rather than true wild.' },
    { n: 'Kamleshwar Dam',
      d: 'Marsh crocodile in numbers, and the birding around the reservoir.' },
    { n: 'The Maldhari nesses',
      d: 'Visited with a guide. Their buffalo and the lions have coexisted for a century.' },
    { n: 'Junagadh and Girnar',
      d: 'An hour away, with Ashokan edicts, a fort, and a hill of Jain temples reached by ten thousand steps.' }
  ],
  when: 'December to March is comfortable; April and May give the best sightings. Closed mid-June to mid-October.',
  stay: 'Two nights for three safaris.',
  move: 'Diu or Rajkot are the nearest airports; Junagadh is the railhead. Book permits before anything else.',
  eat: 'Lodge food, Kathiawadi thalis, and sev tameta if you can get it.'
},

'GUJ-ahmedabad': {
  intro: [
    'Ahmedabad was founded in 1411 and became the first Indian city inscribed by UNESCO as a World Heritage City, in 2017 — for its pols, the dense residential clusters of the walled city, with shared courtyards, carved timber facades and bird feeders on poles.',
    'It is also where Gandhi based himself for fifteen years. The Sabarmati Ashram, from which he set out on the Salt March in 1930, is still there and is unusually restrained for an Indian national memorial.',
    'And it holds two outstanding pieces of modern architecture: Le Corbusier’s Mill Owners’ Association and Sanskar Kendra, and Louis Kahn’s IIM campus, which is among the finest brick buildings of the twentieth century.'
  ],
  see: [
    { n: 'The pol heritage walk', t: 'starts 7am, daily',
      d: 'Two and a half hours from Swaminarayan Temple through the pols to the Jama Masjid, run by the municipal corporation. The best organised walk in any Indian city.' },
    { n: 'Sabarmati Ashram',
      d: 'Gandhi’s rooms, his spinning wheel and a good archive, on the riverbank. Free.' },
    { n: 'Adalaj Stepwell',
      d: 'Eighteen kilometres out, five storeys down, 1498, and one of the most beautiful spaces in Gujarat.' },
    { n: 'IIM Ahmedabad',
      d: 'Louis Kahn’s campus. The louvred brick and the circular openings are extraordinary; access to parts of it requires asking politely.' },
    { n: 'Sidi Saiyyed Mosque',
      d: 'Famous for a single jali screen of a tree carved in stone, which is the emblem of the city.' },
    { n: 'Calico Museum of Textiles',
      d: 'One of the best textile collections in the world, in a haveli. Visits by advance booking only, and worth the trouble.' }
  ],
  when: 'November to February. Uttarayan, the kite festival on 14 January, fills the sky and is the best time to be here.',
  stay: 'Three nights.',
  move: 'Airport, major rail hub, and a metro. The old city is walked; autos elsewhere.',
  eat: 'Gujarati thali at Agashiye or Vishalla, street food at Manek Chowk after dark, and the city is dry — alcohol is prohibited across the state.'
},

'GUJ-rani-ki-vav': {
  intro: [
    'Rani ki Vav is a stepwell at Patan built around 1063 by a queen in memory of her husband, and it is the most elaborate example of the form anywhere — seven storeys descending inverted into the ground, with over five hundred major sculptures and a thousand minor ones lining the walls.',
    'It was buried by the Saraswati river in silt for centuries, which is why the carving survived intact where almost every comparable monument was defaced. The Archaeological Survey excavated it from the 1960s.',
    'It is both a water structure and a temple turned upside down, and the reversal is the point: you descend through tiers of Vishnu avatars towards water instead of climbing towards a spire.'
  ],
  see: [
    { n: 'The descent',
      d: 'Walk down level by level and look at each tier of panels. The Dashavatara sequence and the apsaras on the lower levels are the finest work.' },
    { n: 'The well shaft',
      d: 'Still holding water at the bottom, with a staircase that once continued further into a tunnel.' },
    { n: 'Patan patola weaving',
      d: 'Double-ikat silk saris that take months to make, woven by a handful of families in the town. Workshops will show you.' },
    { n: 'Sahastralinga Talav',
      d: 'The ruins of an eleventh-century artificial tank nearby, far less visited.' },
    { n: 'Modhera',
      d: 'The sun temple, thirty kilometres away, and usually combined.' }
  ],
  when: 'November to February. Early morning for light into the well.',
  stay: 'Two hours, or half a day with Modhera.',
  move: 'A hundred and twenty-five kilometres from Ahmedabad, two and a half hours. Patan has a station.',
  eat: 'Simple Gujarati in Patan town.'
},

'GUJ-dwarka': {
  intro: [
    'Dwarka is one of the four Char Dham and one of the seven holy cities, held to be Krishna’s capital after he left Mathura. The Dwarkadhish temple, five storeys on seventy-two pillars, stands above the point where the Gomti meets the Arabian Sea.',
    'Marine archaeology offshore has found submerged structures that may be an earlier settlement, which has given the legend an unusual amount of physical argument around it.',
    'Bet Dwarka, an island reached by boat and now by a new cable-stayed bridge, is where Krishna is said to have actually lived, and is the more atmospheric half of the pilgrimage.'
  ],
  see: [
    { n: 'Dwarkadhish Temple',
      d: 'Aarti five times a day; the flag on the spire is changed several times daily and the ceremony draws crowds. Non-Hindus may be asked to sign a declaration.' },
    { n: 'Bet Dwarka',
      d: 'Over the Sudarshan Setu bridge, with the Krishna temple and a quieter, odder set of shrines.' },
    { n: 'Nageshwar Jyotirlinga',
      d: 'One of the twelve jyotirlingas, with a very large Shiva statue outside.' },
    { n: 'Gomti Ghat at sunset',
      d: 'Where the river meets the sea, with pilgrims bathing and a good deal of ritual.' },
    { n: 'Okha and the lighthouse',
      d: 'For the coast, and the ferry crossing if you prefer the boat to the bridge.' }
  ],
  when: 'November to February. Janmashtami in August or September is the great festival and the town is overwhelmed.',
  stay: 'One or two nights.',
  move: 'Dwarka has a railway station on the Ahmedabad–Okha line; Jamnagar airport is two and a half hours.',
  eat: 'Strictly vegetarian, simple, and a great deal of it is prasad.'
},

'GUJ-somnath': {
  intro: [
    'Somnath is the first of the twelve jyotirlingas and the most destroyed temple in India — sacked and rebuilt at least six times, most famously by Mahmud of Ghazni in 1026, and finally rebuilt in its current form in 1951 at Sardar Patel’s insistence.',
    'That history makes it as much a political site as a religious one, and the reconstruction is deliberately monumental: Chalukyan style, in stone, right on the shore with the sea breaking below the plinth.',
    'An inscription on the site notes that there is no land between here and Antarctica in a straight line south, which is true and oddly affecting.'
  ],
  see: [
    { n: 'The temple at aarti',
      d: 'Three times daily. The evening one, with the sea behind, is the best. No phones or cameras inside.' },
    { n: 'The light and sound show',
      d: 'On the temple exterior after dark, narrating the destruction and rebuilding. Earnest and well attended.' },
    { n: 'Bhalka Tirth',
      d: 'Where Krishna is said to have been struck by an arrow and died, five kilometres away.' },
    { n: 'Triveni Sangam',
      d: 'The confluence of three rivers with the sea, with cremation ghats alongside.' },
    { n: 'Diu',
      d: 'Ninety minutes away, Portuguese until 1961, with a fort, churches and alcohol, which Gujarat does not have.' }
  ],
  when: 'November to February. Mahashivratri in February or March is the main occasion.',
  stay: 'One night.',
  move: 'Veraval is the railhead, six kilometres away. Often combined with Gir, two hours north.',
  eat: 'Vegetarian Gujarati; Veraval has fish, being a major fishing port.'
},

'GUJ-champaner': {
  intro: [
    'Champaner-Pavagadh is a World Heritage site of two halves: a hill with a pre-Hindu goddess shrine on top of a volcanic plug, and an abandoned early-sixteenth-century city at its foot, built by Mahmud Begada as his capital and abandoned after Humayun took it in 1535.',
    'What survives in the city is an unusual architectural moment — Islamic forms built by Gujarati Hindu and Jain masons, producing mosques with carved brackets, minarets like temple spires, and jali screens of a fineness not seen elsewhere.',
    'It is almost entirely empty of visitors, while the hill above it carries two million pilgrims a year. The contrast is startling.'
  ],
  see: [
    { n: 'Jama Masjid',
      d: 'The great mosque of 1513, with a hundred and seventy-two pillars and two slender minarets. One of the finest buildings in Gujarat and usually deserted.' },
    { n: 'Kevada and Nagina Masjid',
      d: 'Smaller mosques in the fields, with carved cenotaphs beside them.' },
    { n: 'Pavagadh and the Kalika Mata temple',
      d: 'By ropeway or a long stair to the summit at eight hundred metres, with an enormous pilgrim flow.' },
    { n: 'The helical stepwell',
      d: 'Helical Vav, a spiral descent, among several water structures scattered across the site.' },
    { n: 'The citadel walls',
      d: 'Fortifications running up the hillside through forest, walkable and unvisited.' }
  ],
  when: 'November to February. Navratri at the hilltop temple is vast.',
  stay: 'A full day. The city site is spread over several kilometres — hire an auto.',
  move: 'A hundred and fifty kilometres from Ahmedabad, two and a half hours. Vadodara is closer, at fifty.',
  eat: 'Basic dhabas at the base of the hill.'
},

'GUJ-modhera': {
  intro: [
    'The Modhera sun temple was built around 1026 by the Solanki dynasty, and it is oriented so that at the equinoxes the first light of day falls directly on the sanctum, where an image of Surya in gold once stood.',
    'In front of the temple is a stepped tank, the Surya Kund, lined with a hundred and eight small shrines on descending terraces — one of the most satisfying geometric spaces in Indian architecture.',
    'It was damaged by Mahmud of Ghazni and is no longer in worship, which means it is open, quiet and photographable in a way that functioning temples are not.'
  ],
  see: [
    { n: 'The Surya Kund',
      d: 'Walk down into it. The arrangement of terraces and miniature shrines is the reason to come.' },
    { n: 'The Sabha Mandapa',
      d: 'The pillared hall, open on all sides, with carving on every surface including the undersides of the beams.' },
    { n: 'The sanctum at the equinox',
      d: 'Around 21 March and 21 September, if you can arrange to be there at dawn.' },
    { n: 'The dance festival',
      d: 'Uttarardh Mahotsav, classical dance against the temple in January.' },
    { n: 'Patan and Rani ki Vav',
      d: 'Thirty kilometres on, and the natural pairing.' }
  ],
  when: 'November to February. The equinoxes for the alignment.',
  stay: 'Ninety minutes.',
  move: 'A hundred kilometres from Ahmedabad, two hours. Mehsana is the nearest railhead.',
  eat: 'A small canteen at the site; eat in Mehsana or Patan.'
},

'GUJ-dholavira': {
  intro: [
    'Dholavira is one of the largest Harappan cities ever found, on an island in the Rann of Kutch, occupied from roughly 3000 to 1500 BC. It was inscribed by UNESCO in 2021.',
    'What makes it exceptional is water engineering. The city had a system of reservoirs, dams and channels capturing two seasonal streams, with a stone-cut tank over seventy metres long — the most sophisticated water management known from the Bronze Age anywhere.',
    'It also produced a signboard of ten large Indus script characters, found at a gateway, which remains undeciphered along with the rest of the script.'
  ],
  see: [
    { n: 'The citadel and the middle town',
      d: 'Clear stone foundations on three levels, with gateways and a stadium-like open space between them.' },
    { n: 'The reservoir system',
      d: 'Sixteen reservoirs covering a large part of the site. The rock-cut eastern tank with its steps is the set piece.' },
    { n: 'The site museum',
      d: 'Seals, beads, weights and pottery, well labelled.' },
    { n: 'Road Bridge to Khadir',
      d: 'The causeway across the Rann to the island, which in winter runs across white salt flats on both sides.' },
    { n: 'Fossil park',
      d: 'Petrified wood a short drive away.' }
  ],
  when: 'November to February. The site is exposed with no shade.',
  stay: 'Half a day; a night at the Dholavira tented camp if you want the Rann at dawn.',
  move: 'Two hundred and fifty kilometres from Bhuj, five hours. A car is essential.',
  eat: 'The tourism camp and a couple of village places. Carry water.'
},

'GUJ-bhuj': {
  intro: [
    'Bhuj is the capital of Kutch and the base for everything in the district. It was devastated by the 2001 earthquake — around thirteen thousand people died in the region and much of the old town came down — and the rebuilding is still visible.',
    'The Aina Mahal and Prag Mahal, the old royal palaces, were badly damaged and partly restored; the Aina Mahal’s hall of mirrors, with Venetian glass and a clockwork fountain, is worth the entry on its own.',
    'It is also the hub of Kutchi craft. The museums here are the right place to learn what you are looking at before going out to the villages.'
  ],
  see: [
    { n: 'Aina Mahal',
      d: 'An eighteenth-century palace with mirrored walls, Dutch tiles and a bedroom with a mechanical water display. Idiosyncratic and charming.' },
    { n: 'Prag Mahal',
      d: 'Italianate Gothic, 1879, with a clock tower you can climb for a view over the city and the earthquake damage.' },
    { n: 'Kutch Museum',
      d: 'The oldest museum in Gujarat, with Kshatrapa inscriptions and a good ethnographic collection.' },
    { n: 'Living and Learning Design Centre',
      d: 'At Ajrakhpur, a serious textile museum of Kutchi embroidery traditions, well worth two hours.' },
    { n: 'Bhujodi',
      d: 'A weaving village ten minutes out, with shawls and a cooperative.' }
  ],
  when: 'November to February.',
  stay: 'Two nights as a base for Kutch.',
  move: 'Airport with flights from Mumbai, and a railway station. Taxis for the district.',
  eat: 'Kutchi Gujarati thalis, dabeli — a local street sandwich invented nearby — and strong tea.'
},

'GUJ-little-rann': {
  intro: [
    'The Little Rann is a separate salt flat south of the Great Rann, and it is the last refuge of the Indian wild ass — the khur, a subspecies found nowhere else, numbering several thousand after a long recovery.',
    'The landscape is a flat saline waste broken by low grassy islands called bets, which hold the animals in the wet season. In winter the flats fill with migratory birds, including large numbers of flamingo, crane and pelican.',
    'Salt is still produced here by agariya families who move onto the flats for eight months a year and work in brutal conditions, which is part of what you see.'
  ],
  see: [
    { n: 'Wild ass safari',
      d: 'Open jeeps across the flats from Dasada or Bajana. Herds are reliably found and will run alongside the vehicle.' },
    { n: 'Winter birding',
      d: 'Lesser and greater flamingo, common and demoiselle crane, Dalmatian pelican, and raptors over the bets.' },
    { n: 'The salt pans',
      d: 'Agariya workings with pumps and crystallising beds. Ask before photographing people at work.' },
    { n: 'Nal Sarovar',
      d: 'A large shallow lake an hour away, excellent for waterfowl in winter.' },
    { n: 'The Rabari and Bharwad villages',
      d: 'Herding communities on the margins, with distinctive embroidery.' }
  ],
  when: 'November to March. The flats are under water from June to October.',
  stay: 'Two nights at Dasada or Bajana.',
  move: 'Ninety minutes to two hours from Ahmedabad. Lodges arrange safaris and permits.',
  eat: 'Lodge kitchens, Gujarati and good.'
},

'GUJ-palitana': {
  intro: [
    'Shatrunjaya hill above Palitana carries around nine hundred Jain temples in nine fortified enclosures, built between the eleventh and nineteenth centuries, and it is the holiest site of the Svetambara sect.',
    'You climb three thousand seven hundred and fifty steps to reach them — about an hour and a half — and nobody is permitted to stay on the hill overnight, including the priests, because it belongs to the gods after dark.',
    'Palitana town below is the only place in the world where killing animals for food is banned by law, declared a vegetarian city in 2014 after a hunger strike by Jain monks.'
  ],
  see: [
    { n: 'The climb at dawn',
      d: 'Start by five thirty to be up before the heat. Palanquins are available if you cannot manage the steps.' },
    { n: 'Adishwar Temple',
      d: 'The principal temple at the summit, to the first tirthankara, in marble.' },
    { n: 'The enclosures',
      d: 'Nine walled groups, each a cluster of shrines, with views over the plain in every direction.' },
    { n: 'The descent before noon',
      d: 'Everyone must be off the hill by evening. Leather is prohibited anywhere on it.' }
  ],
  when: 'November to February. Closed during the monsoon months for Jain observance. Avoid midday heat.',
  stay: 'Half a day, with a night in Palitana or Bhavnagar.',
  move: 'Fifty kilometres from Bhavnagar, which has an airport and a station.',
  eat: 'Strictly vegetarian, no root vegetables in Jain kitchens. Simple and clean.'
},

'GUJ-statue-of-unity': {
  intro: [
    'The Statue of Unity is a hundred and eighty-two metres of Sardar Vallabhbhai Patel standing beside the Narmada dam, completed in 2018 and the tallest statue in the world — nearly twice the height of the Statue of Liberty including its base.',
    'Patel was the deputy prime minister who integrated five hundred and sixty-two princely states into India, and the height was chosen to match the number of seats in the Gujarat assembly.',
    'Whether it is worth a detour depends entirely on your appetite for engineering at scale. There is a viewing gallery in the chest at a hundred and fifty-three metres, and the surrounding area has been built up with gardens, a jungle safari and a cable car.'
  ],
  see: [
    { n: 'The viewing gallery',
      d: 'Lifts to the chest, with a view over the Narmada and the Sardar Sarovar dam. Book the slot online; queues are long.' },
    { n: 'The museum at the base',
      d: 'On Patel’s life and the integration of the states. Better than expected.' },
    { n: 'Sardar Sarovar Dam',
      d: 'One of the largest concrete dams in the world, and the subject of a thirty-year protest movement over displacement.' },
    { n: 'Jungle Safari and the valley of flowers',
      d: 'A zoo and landscaped gardens built as part of the complex.' },
    { n: 'Zarwani Falls',
      d: 'In the Shoolpaneshwar sanctuary nearby, pleasant after the monsoon.' }
  ],
  when: 'November to February. Closed Mondays.',
  stay: 'Half a day.',
  move: 'Ninety kilometres from Vadodara, under two hours. Ekta Nagar has its own station now.',
  eat: 'Food courts on site; Gujarati and uninspired.'
},

'GUJ-saputara': {
  intro: [
    'Saputara is Gujarat’s only hill station, at about a thousand metres in the Sahyadris on the Maharashtra border, in Dang district — which is the state’s tribal belt and quite unlike the rest of it.',
    'It is a modest place with a lake, a ropeway and a set of viewpoints over the Western Ghats. The interest is less the resort than the Dangi culture around it, and the monsoon, when the whole range turns green and the state runs a festival.'
  ],
  see: [
    { n: 'Sunset Point and the ropeway',
      d: 'A short cable car to a ridge with a view west into Maharashtra.' },
    { n: 'Gira Falls',
      d: 'Thirty kilometres away, and spectacular from July to October.' },
    { n: 'The tribal museum',
      d: 'Dangi artefacts, instruments and housing models. Small and genuine.' },
    { n: 'Artist Village',
      d: 'Warli-style painting workshops where you can try it yourself.' },
    { n: 'Monsoon Festival',
      d: 'State-run, July to September, with the hills at their greenest.' }
  ],
  when: 'July to October for the monsoon green; November to February for cool, dry weather.',
  stay: 'Two nights.',
  move: 'Four hours from Surat, five from Nashik. Taxis and state buses.',
  eat: 'Gujarati hotel food; Dangi nagli rotla if you ask at a homestay.'
},

/* ===================== MAHARASHTRA, continued ===================== */
'MAH-elephanta': {
  intro: [
    'Elephanta is an island an hour by boat from the Gateway of India, with a group of rock-cut caves carved between the fifth and eighth centuries and inscribed by UNESCO in 1987.',
    'Cave One holds the Trimurti — a six-metre, three-headed bust of Shiva as creator, preserver and destroyer, carved from the living rock — which is among the greatest pieces of sculpture in India and is lit only by what comes through the cave mouth.',
    'The Portuguese used the sculptures for target practice, which accounts for a good deal of the damage. What is left is still enough to stop people in the doorway.'
  ],
  see: [
    { n: 'The Trimurti',
      d: 'At the back of Cave One, facing the entrance. Stand still for five minutes; the faces change as your eyes adjust.' },
    { n: 'Ardhanarishvara and the marriage of Shiva',
      d: 'Panels along the side walls, the half-male half-female form being the most remarkable.' },
    { n: 'The Shiva shrine',
      d: 'A free-standing cube within the cave with four doorways and guardian figures at each.' },
    { n: 'The Buddhist stupa on the eastern hill',
      d: 'A short climb, usually empty, with a view over the harbour.' },
    { n: 'The boat crossing',
      d: 'An hour across Mumbai harbour, past container ships and the naval dockyard.' }
  ],
  when: 'November to February. Closed Mondays. Boats stop in rough monsoon weather. Go on the first boat to beat the crowd and the heat.',
  stay: 'Half a day including the crossing.',
  move: 'Boats from the Gateway of India every half hour from around nine. A toy train from the jetty, or a ten-minute walk, then a hundred and twenty steps lined with stalls.',
  eat: 'Snack stalls on the island; eat in Colaba.'
},

'MAH-aurangabad': {
  intro: [
    'The city renamed Chhatrapati Sambhajinagar in 2023 is the base for Ajanta and Ellora, and it has enough of its own to justify a day. Aurangzeb made it his Deccan capital and is buried simply, by his own instruction, at Khuldabad nearby.',
    'The Bibi ka Maqbara is a tomb built by his son for his mother in deliberate imitation of the Taj Mahal, at a fraction of the budget — marble only on the dome, plaster elsewhere. It is often called the poor man’s Taj, which is unkind but not inaccurate.',
    'The Daulatabad fort nearby is the more impressive thing: a hill fortress with a defensive system so elaborate it was never taken by force.'
  ],
  see: [
    { n: 'Daulatabad Fort',
      d: 'A conical hill with moats, a dark spiral tunnel defenders could flood or smoke, and an iron-spiked drawbridge. Climb to the top.' },
    { n: 'Bibi ka Maqbara',
      d: 'Worth seeing precisely for the comparison with the Taj.' },
    { n: 'Aurangabad Caves',
      d: 'Twelve Buddhist caves on a hill behind the Maqbara, sixth and seventh century, with good sculpture and no crowds.' },
    { n: 'Panchakki',
      d: 'A seventeenth-century water mill driven by a buried channel from a spring eight kilometres away.' },
    { n: 'Khuldabad',
      d: 'Aurangzeb’s grave, an open marble enclosure with earth rather than a dome, paid for by the caps he sewed himself.' }
  ],
  when: 'November to February.',
  stay: 'Two nights, with days for Ajanta and Ellora.',
  move: 'Airport and railway station, with flights from Mumbai and Delhi. Hire a car for the caves.',
  eat: 'Naan qalia is the local dish, mutton with wheat bread. Good Mughlai throughout the city.'
},

'MAH-pune': {
  intro: [
    'Pune was the seat of the Peshwas, the prime ministers who ran the Maratha empire from the eighteenth century, and the Shaniwar Wada palace in the middle of town is what is left of that — the fortified gate and the foundations, the rest burned in 1828.',
    'It is now a university and IT city with a young population, a strong classical music tradition, and the Osho ashram in Koregaon Park, which has been drawing a certain kind of visitor since the 1970s.',
    'It is also the gateway to the Sahyadri forts and the western hill country, two hours from Mumbai by expressway.'
  ],
  see: [
    { n: 'Shaniwar Wada',
      d: 'The surviving gateway with its elephant spikes, and a light-and-sound show in the evening.' },
    { n: 'Aga Khan Palace',
      d: 'Where Gandhi, Kasturba and Mahadev Desai were interned from 1942. Kasturba died here; her memorial is in the garden.' },
    { n: 'Raja Dinkar Kelkar Museum',
      d: 'One man’s collection of twenty thousand everyday objects — lamps, nutcrackers, writing instruments — and far better than that sounds.' },
    { n: 'Sinhagad Fort',
      d: 'An hour out, a Maratha hill fort with a stiff walk up and pithla bhakri at the top.' },
    { n: 'Parvati Hill and the Peshwa temples',
      d: 'A hundred and three steps to a view over the whole city.' }
  ],
  when: 'October to February. The monsoon here is pleasant and the hills turn green.',
  stay: 'Two nights.',
  move: 'Airport, major railhead, and the Mumbai expressway. Autos and app cabs.',
  eat: 'Misal pav at a dozen famous places, bhakarwadi, Vaishali and Rupali for South Indian, and a very serious craft beer scene.'
},

'MAH-tadoba': {
  intro: [
    'Tadoba-Andhari is the largest and oldest national park in Maharashtra and has become one of the most reliable tiger reserves in India — a dense population in dry teak and bamboo forest with good visibility and a lake in the middle of it.',
    'It is less polished than Bandhavgarh or Ranthambore and gets correspondingly less international traffic, which has kept the safari experience less pressured.',
    'Sightings here are good enough that photographers who used to go to Madhya Pradesh now come to Vidarbha instead.'
  ],
  see: [
    { n: 'Core zone safaris',
      d: 'Moharli, Khutwanda and Kolara gates. Permits online, released in batches; the core is better than the buffer.' },
    { n: 'Tadoba Lake',
      d: 'Marsh crocodile and a reliable tiger approach in the hot months.' },
    { n: 'Buffer zone night safaris',
      d: 'Available at some gates and worth doing — civet, honey badger, flying squirrel.' },
    { n: 'Sloth bear and wild dog',
      d: 'Both are regular here, and dhole packs are easier to see than in most parks.' },
    { n: 'Birding the teak',
      d: 'Over two hundred and eighty species, with good raptors around the lake.' }
  ],
  when: 'February to May gives the best sightings; October to February is more comfortable. Core closed in the monsoon.',
  stay: 'Three nights for four or five drives.',
  move: 'Nagpur airport is three hours away. Book permits before accommodation.',
  eat: 'Lodge kitchens. Vidarbha food is the spiciest in Maharashtra — saoji mutton in Nagpur is worth a stop.'
},

'MAH-mahabaleshwar': {
  intro: [
    'Mahabaleshwar sits at thirteen hundred metres on a plateau in the Sahyadris and was the summer capital of the Bombay Presidency. It has the full hill-station apparatus: points named after Victorian officials, a lake, strawberry farms and a great many horses.',
    'The plateau edge drops abruptly into the Konkan, and the viewpoints along it — Arthur’s Seat, Elephant’s Head, Kate’s Point — are genuinely dramatic, especially when cloud is rolling up the valley.',
    'Pratapgad fort nearby is where Shivaji killed Afzal Khan in 1659, an episode central to Maratha history, and the fort is still held by his descendants.'
  ],
  see: [
    { n: 'The viewpoints at sunrise',
      d: 'Arthur’s Seat for the sheer drop and the Konkan below. Go early, before the fog and the crowds.' },
    { n: 'Pratapgad Fort',
      d: 'Twenty kilometres out, with a stiff climb and a formidable position on a ridge.' },
    { n: 'Old Mahabaleshwar',
      d: 'The Panchganga temple, where five rivers including the Krishna are said to rise, and far quieter than the market town.' },
    { n: 'Strawberries and chikki',
      d: 'In season from December to March. The farms will let you pick.' },
    { n: 'Panchgani',
      d: 'Nineteen kilometres away, with a tabletop plateau and a better climate.' }
  ],
  when: 'October to June. The monsoon brings six thousand millimetres of rain and most things close.',
  stay: 'Two nights.',
  move: 'Four hours from Mumbai, three from Pune. Taxis for the points, or hire a bicycle.',
  eat: 'Hill-station hotels, corn on the cob at the viewpoints, and a lot of strawberry cream.'
},

'MAH-matheran': {
  intro: [
    'Matheran is the only automobile-free hill station in Asia. No vehicles of any kind are permitted beyond the car park at Dasturi — you walk, take a horse, or ride a hand-pulled rickshaw — and the silence after Mumbai is the whole attraction.',
    'A narrow-gauge toy train has climbed from Neral since 1907, twenty-one kilometres of two-foot gauge round the hillside, and it is one of the better railway journeys in India when it is running.',
    'The red laterite paths through the forest connect about thirty-eight viewpoints along the plateau edge, and because there is no traffic you can walk between them in peace.'
  ],
  see: [
    { n: 'The toy train from Neral',
      d: 'Two and a half hours up, suspended in the monsoon and sometimes beyond. Check before relying on it.' },
    { n: 'Louisa, Porcupine and Panorama Points',
      d: 'The best of the viewpoints, with Prabalgad fort visible from Louisa and a sunrise-to-sunset sweep from Panorama.' },
    { n: 'Charlotte Lake',
      d: 'The town’s water source, with a temple beside it and a walk around.' },
    { n: 'The forest paths',
      d: 'Walk rather than ride. The red earth, the silence and the monkeys are the experience.' },
    { n: 'Chikki and the market',
      d: 'A single street of shops selling nut brittle, leather and honey.' }
  ],
  when: 'October to May. The monsoon is heavy but atmospheric if you do not mind being wet.',
  stay: 'Two nights.',
  move: 'Train or road to Neral, then toy train or taxi to Dasturi and walk the last three kilometres. Porters carry bags.',
  eat: 'Hotel dining rooms; the chikki is the local product.'
},

'MAH-lonavala': {
  intro: [
    'Lonavala and Khandala are weekend hill towns on the Mumbai–Pune expressway, which makes them extremely busy and not especially interesting in themselves. What justifies the stop is nearby: the Karla, Bhaja and Bedse cave groups.',
    'Karla holds the largest and best-preserved Buddhist chaitya hall in India, cut around the first century BC, with a vaulted ceiling carrying original wooden ribs two thousand years old and a facade of a great horseshoe window.',
    'Bhaja is older, smaller and quieter, with a group of stupas and a waterfall beside it in the monsoon.'
  ],
  see: [
    { n: 'Karla Caves',
      d: 'The chaitya hall, thirty-eight metres deep, with thirty-seven octagonal pillars and the surviving teak ribs. A Hindu temple now sits at the entrance.' },
    { n: 'Bhaja Caves',
      d: 'Second century BC, with a chaitya, a group of fourteen stupas and good carved reliefs. Far fewer visitors.' },
    { n: 'Lohagad and Visapur forts',
      d: 'Two Maratha hill forts above Bhaja, both walkable in half a day, superb in the monsoon.' },
    { n: 'Bedse Caves',
      d: 'Thirty minutes further, with extraordinary pillar capitals and almost nobody there.' },
    { n: 'Bhushi Dam',
      d: 'Where Mumbai sits in the monsoon overflow. Crowded and cheerful.' }
  ],
  when: 'June to September for the monsoon and the forts; October to February for comfort. Avoid weekends.',
  stay: 'A night, or a long day trip from either city.',
  move: 'On the Mumbai–Pune line and expressway. Autos to the caves, then a climb of a few hundred steps.',
  eat: 'Lonavala chikki and fudge, vada pav at every corner, and better food in Pune.'
},

'MAH-tarkarli': {
  intro: [
    'Tarkarli is on the Konkan coast in Sindhudurg district, and it has the clearest water in Maharashtra — clear enough for scuba diving, which is not something the state is otherwise known for.',
    'Sindhudurg fort offshore was built by Shivaji in 1664 on a rock island, with walls three kilometres round and a design intended to be invisible from the sea. It holds handprints and footprints of Shivaji set in dried lime, and a temple to him — the only one anywhere.',
    'The area is quiet, the beaches are long and empty, and the food is Malvani: coconut, kokum and a great deal of fish.'
  ],
  see: [
    { n: 'Sindhudurg Fort',
      d: 'Boats from Malvan jetty. The hidden main gate, the walls and the Shivaji temple inside. Allow two hours.' },
    { n: 'Snorkelling and diving',
      d: 'Operators at Tarkarli beach. Visibility is best from November to February; the coral is modest but the water is genuinely clear.' },
    { n: 'Tsunami Island',
      d: 'A sandbar at the Karli river mouth with watersports, less awful than the name suggests.' },
    { n: 'Devbagh and Nivti beaches',
      d: 'Longer and emptier than Tarkarli itself, with cliffs at Nivti.' },
    { n: 'Houseboats on the Karli',
      d: 'Backwater stays on the river behind the beach.' }
  ],
  when: 'November to February. The monsoon shuts the boats and the diving.',
  stay: 'Three nights.',
  move: 'Kudal is the railhead on the Konkan line, forty minutes away. Ten hours from Mumbai by road.',
  eat: 'Malvani thali — surmai fry, bombil, solkadhi, and kombdi vade. Among the best regional food in India.'
},

'MAH-alibaug': {
  intro: [
    'Alibaug is Mumbai’s nearest beach escape, an hour by catamaran across the harbour, and it is where a good deal of the city’s money keeps a second house. The beaches are serviceable rather than beautiful, and the appeal is proximity.',
    'Kolaba fort, offshore at Alibaug beach, can be walked to at low tide, which is the one genuinely good thing to do here. Murud-Janjira, an hour south, is considerably better.'
  ],
  see: [
    { n: 'Kolaba Fort',
      d: 'Walk out across the sand at low tide; check the timing or you will be swimming. Built by Shivaji, with a freshwater well inside despite the sea around it.' },
    { n: 'Murud-Janjira',
      d: 'An island fortress never taken in five hundred years, reached by sailboat from Rajpuri. The best fort on this coast.' },
    { n: 'Kashid beach',
      d: 'Thirty kilometres south, with white sand and casuarina, and much nicer than Alibaug town beach.' },
    { n: 'Korlai Fort',
      d: 'A Portuguese fort on a headland, with a village below where a creole Portuguese is still spoken.' }
  ],
  when: 'November to February. Monsoon weekends are popular with Mumbai but the sea is dangerous.',
  stay: 'Two nights.',
  move: 'Catamaran from the Gateway of India to Mandwa, an hour, then a bus or taxi. Or three hours by road around the bay.',
  eat: 'Koli fish thalis, and a growing number of expensive farm-to-table places for the weekend crowd.'
},

'MAH-nashik': {
  intro: [
    'Nashik is on the Godavari and is one of the four Kumbh Mela cities, with the Ramkund ghat where Rama is said to have bathed during his exile and where a great many ashes are now immersed.',
    'It is also, improbably, the centre of Indian wine. The volcanic soil and the altitude of the Sahyadri foothills turned out to suit vines, and since the late 1990s a cluster of wineries — Sula foremost — has made it a weekend destination from Mumbai.',
    'Trimbakeshwar, thirty kilometres out, is one of the twelve jyotirlingas and sits below the source of the Godavari.'
  ],
  see: [
    { n: 'The wineries',
      d: 'Sula, York, Grover and a dozen others, with tastings and tours. Sula’s SulaFest in February is a sizeable event.' },
    { n: 'Ramkund and Panchavati',
      d: 'The ghats and the temples around them, busy with ritual at all hours.' },
    { n: 'Trimbakeshwar',
      d: 'A major jyotirlinga, with the Brahmagiri hill above it and the Godavari’s source at the top.' },
    { n: 'Pandavleni Caves',
      d: 'Twenty-four Buddhist caves from the first century BC on a hill at the edge of town, with inscriptions and good carving.' },
    { n: 'Anjneri and Harihar forts',
      d: 'Trekking in the Sahyadris nearby; Harihar has a near-vertical rock-cut staircase that has become famous.' }
  ],
  when: 'October to February. The Kumbh here falls every twelve years.',
  stay: 'Two nights.',
  move: 'Four hours from Mumbai, five from Pune, with a railway station. A car is useful for the wineries.',
  eat: 'Misal, the local chivda, and winery restaurants that are better than they need to be.'
},

'MAH-kolhapur': {
  intro: [
    'Kolhapur was a princely state under a branch of Shivaji’s line, and the Mahalaxmi temple at its centre is one of the shakti peethas and among the busiest temples in Maharashtra.',
    'The city is known for three things besides the temple: the Kolhapuri chappal, a leather sandal made here for centuries; the Kolhapuri mutton, which is among the hottest food in India; and kushti, traditional wrestling, still trained in red-earth pits called talims.',
    'The New Palace, built in 1884 in an Indo-Saracenic style by the architect of Mumbai’s VT station, holds a museum with a somewhat alarming quantity of hunting trophies.'
  ],
  see: [
    { n: 'Mahalaxmi Temple',
      d: 'Seventh century in origin, with a sun alignment that lights the deity for a few days each year in January and November.' },
    { n: 'New Palace Museum',
      d: 'Durbar hall, royal possessions, and the taxidermy collection of a maharaja who shot a great deal.' },
    { n: 'A talim',
      d: 'Wrestling pits where boys train in mud at dawn. Several will let visitors watch if asked respectfully.' },
    { n: 'Panhala Fort',
      d: 'Twenty kilometres out, one of the largest forts in the Deccan, with a dramatic Maratha siege history.' },
    { n: 'Chappal shopping',
      d: 'The lanes around the temple. A good pair is hand-stitched and will last years.' }
  ],
  when: 'October to February.',
  stay: 'Two nights.',
  move: 'Railway station and a small airport. Autos within the city.',
  eat: 'Tambda rassa and pandhra rassa — red and white mutton gravies — at Padma or Opal. Order mild unless you are confident.'
},

'MAH-shirdi': {
  intro: [
    'Shirdi is where Sai Baba lived from the 1850s until his death in 1918 — a figure revered by Hindus and Muslims alike, who never claimed a religion and whose teaching amounted to a handful of aphorisms about faith and patience.',
    'It is now one of the most visited pilgrimage sites in India, with something in the region of fifty thousand visitors a day and considerably more on Thursdays, his day.',
    'The town is almost entirely infrastructure for that flow: queue halls, dormitories, prasad counters. The samadhi mandir itself, built over his tomb, is the point.'
  ],
  see: [
    { n: 'Samadhi Mandir',
      d: 'The main shrine, over his tomb, with a marble statue. Darshan queues run several hours; paid passes and early-morning aarti cut it down.' },
    { n: 'Dwarkamai',
      d: 'The mosque where he lived for sixty years, with the fire he lit still burning.' },
    { n: 'Chavadi',
      d: 'Where he slept on alternate nights; a procession still re-enacts the walk on Thursdays.' },
    { n: 'Shani Shingnapur',
      d: 'Seventy kilometres away, a village famous for having no doors on its houses and a Shani temple.' }
  ],
  when: 'October to February. Thursdays, Ram Navami and Guru Purnima are the heaviest.',
  stay: 'One night.',
  move: 'Shirdi has an airport and a railway station. Book darshan passes online in advance.',
  eat: 'Free and paid prasadalayas run by the trust, feeding tens of thousands a day. Clean and vegetarian.'
},

'MAH-bhimashankar': {
  intro: [
    'Bhimashankar is one of the twelve jyotirlingas, in the Sahyadris about a hundred kilometres from Pune, and the temple sits in a wildlife sanctuary of dense evergreen forest at around nine hundred metres.',
    'The sanctuary is the stronghold of the Indian giant squirrel, the shekru, which is the state animal of Maharashtra and considerably larger than the name suggests — nearly a metre nose to tail.',
    'It is both a pilgrimage and a trek: several routes climb up from the villages below through forest, and the monsoon turns the whole range green and streaming with water.'
  ],
  see: [
    { n: 'The temple',
      d: 'Nagara-style, eighteenth century over an older shrine, in a hollow reached by a descent of steps.' },
    { n: 'Giant squirrel spotting',
      d: 'Early morning in the sanctuary forest. Guides at the forest office.' },
    { n: 'Gupt Bhimashankar',
      d: 'The hidden source of the Bhima river, a short walk through the forest from the temple.' },
    { n: 'The Shidi and Ganesh ghat trails',
      d: 'Two trekking routes up from Khandas. The Shidi route uses iron ladders and should not be attempted in rain.' },
    { n: 'Nagphani',
      d: 'A rock outcrop above the sanctuary with a long view, two hours from the temple.' }
  ],
  when: 'June to February. The monsoon is spectacular and the ladder routes become dangerous.',
  stay: 'A long day from Pune, or a night in a village homestay.',
  move: 'A hundred and ten kilometres from Pune, three hours. State buses and taxis.',
  eat: 'Pithla bhakri and poha at the stalls near the temple.'
},

'MAH-raigad': {
  intro: [
    'Raigad was Shivaji’s capital and the place he was crowned in 1674, on a plateau eight hundred and twenty metres up with cliffs on three sides. He died here in 1680 and his samadhi is on the site.',
    'The fort is enormous and largely ruined, with the foundations of the royal quarters, a market street of rows of shops, a tower, and the Takmak Tok cliff from which the condemned were reputedly thrown.',
    'There are fourteen hundred and fifty steps up, or a ropeway that takes four minutes. The steps are better if you can manage them.'
  ],
  see: [
    { n: 'The coronation site and Nagarkhana',
      d: 'The throne platform, with acoustics good enough that a voice from the gate carries to it.' },
    { n: 'Shivaji’s samadhi',
      d: 'A simple plinth near the Jagdishwar temple, with his dog’s memorial beside it.' },
    { n: 'The Bazaar Peth',
      d: 'Two parallel rows of forty shop foundations, built wide enough for shopping from horseback.' },
    { n: 'Takmak Tok',
      d: 'A sheer drop from the plateau edge. No railing worth the name; stand well back.' },
    { n: 'Hirakani Buruj',
      d: 'A bastion named for a woman who climbed down the cliff at night to get back to her infant.' }
  ],
  when: 'October to February; the monsoon is beautiful but the steps are slippery and visibility poor.',
  stay: 'A full day from Mumbai or Pune, or a night in Pachad below.',
  move: 'A hundred and seventy kilometres from Mumbai. Ropeway from Pachad, or the stair from Chit Darwaja.',
  eat: 'Stalls at the top and bottom selling pithla bhakri, kokum sherbet and lemon water.'
},

/* ===================== GOA ===================== */
'GOA-old-goa': {
  intro: [
    'Old Goa was the capital of Portuguese Asia and in the sixteenth century was larger than Lisbon or London, rich enough to be called the Rome of the East. Then cholera and malaria emptied it, the capital moved to Panaji in 1843, and the city was abandoned to the jungle.',
    'What is left is a group of churches and convents on open lawns, inscribed by UNESCO in 1986, with nothing around them — the streets and houses are gone entirely, which gives the surviving buildings an odd, stranded grandeur.',
    'The Basilica of Bom Jesus holds the body of St Francis Xavier, which is displayed publicly once a decade; the last exposition was in 2024.'
  ],
  see: [
    { n: 'Basilica of Bom Jesus',
      d: 'Laterite and lime plaster stripped back to bare stone, with a baroque gilt altar and Xavier’s silver casket in a side chapel.' },
    { n: 'Se Cathedral',
      d: 'The largest church in Asia, with one surviving tower — the other fell in 1776 — and a bell said to be audible across the whole former city.' },
    { n: 'Church of St Francis of Assisi',
      d: 'With an archaeological museum attached, holding Portuguese portraits and Hindu sculpture from before the conquest.' },
    { n: 'St Augustine’s Tower',
      d: 'Forty-six metres of a ruined church, standing alone in the grass. The most evocative thing on the site.' },
    { n: 'Chapel of St Catherine and the Viceroy’s Arch',
      d: 'Both near the old riverfront, where arriving viceroys came ashore.' }
  ],
  when: 'November to February. Early morning before the tour buses. Modest dress for the churches.',
  stay: 'Half a day.',
  move: 'Ten kilometres from Panaji. Buses, taxis and scooters; the site is walked.',
  eat: 'A few places by the road; eat in Panaji or Divar.'
},

'GOA-panaji': {
  intro: [
    'Panaji is the smallest state capital in India and the best-preserved Portuguese-era town in Asia. Fontainhas, the old Latin quarter, is a grid of narrow lanes with houses in ochre, indigo and green — the colours were mandated, and repainting after the monsoon is still a local ritual.',
    'The Mandovi runs along the north edge with casino boats moored in it, and the Church of Our Lady of the Immaculate Conception sits above the centre at the top of a zigzag stair.',
    'It is a working town rather than a resort, which makes it the most interesting place in Goa to spend time.'
  ],
  see: [
    { n: 'Fontainhas and Sao Tome',
      d: 'Walk the lanes with no particular destination. Balcoes, azulejo nameplates, and bakeries opening at six.' },
    { n: 'Our Lady of the Immaculate Conception',
      d: 'Whitewashed, 1619, at the top of a double stair. Lit at night.' },
    { n: 'The Mandovi waterfront',
      d: 'Promenade at dusk, with the casino boats and the ferries to Betim.' },
    { n: 'Houses of Goa Museum',
      d: 'In Torda, in a triangular building by Gerard da Cunha, on Indo-Portuguese domestic architecture. Excellent.' },
    { n: 'Carnival', t: 'February',
      d: 'Four days of parades before Lent, the only Carnival of its kind in India.' }
  ],
  when: 'November to February. Carnival in February; the Feast of St Francis Xavier on 3 December.',
  stay: 'Two nights, and more than most people give it.',
  move: 'Dabolim and Mopa airports; Karmali is the nearest station. The town is walked; scooters for the rest.',
  eat: 'Goan Catholic cooking — vindaloo, sorpotel, xacuti, bebinca — at Viva Panjim and Ritz Classic, and poi bread from a cycle vendor at dawn.'
},

'GOA-palolem': {
  intro: [
    'Palolem is a kilometre of sand in a near-perfect crescent in south Goa, with headlands at both ends and a fringe of coconut palms. It was a fishing cove until the 1990s and is now the busiest beach in the south, with a line of beach huts rebuilt every season.',
    'The huts are temporary by law — they come down for the monsoon and go back up in October — which keeps the beach from being built over in concrete.',
    'It is also the home of silent discos, invented here because amplified music on the beach is banned after ten. Everyone wears headphones.'
  ],
  see: [
    { n: 'The beach at either end',
      d: 'Walk to the rocks at the north end for a quieter stretch, or wade to Canacona island at low tide.' },
    { n: 'Butterfly and Honeymoon beaches',
      d: 'Small coves reachable by boat or a scramble over the headland.' },
    { n: 'Dolphin trips and Galgibaga',
      d: 'Early-morning boats for humpback dolphin, and a turtle nesting beach further south.' },
    { n: 'Cotigao Sanctuary',
      d: 'Fifteen kilometres inland, with treetop watchtowers and almost no visitors.' },
    { n: 'Agonda and Patnem',
      d: 'Both within ten minutes and both quieter.' }
  ],
  when: 'November to March. Everything shuts from June to September.',
  stay: 'Four nights or a fortnight.',
  move: 'Canacona station is two kilometres away; Dabolim is two hours. Scooters for everything local.',
  eat: 'Beach shacks grilling the morning catch, and Dropadi and Café Inn in the village.'
},

'GOA-anjuna': {
  intro: [
    'Anjuna is where Goa’s reputation was made. The hippie trail arrived in the late 1960s, the full-moon parties followed, and Goa trance was invented here in the late 1980s — a genre that then went global.',
    'The Wednesday flea market started as travellers selling their possessions to fund the next month and is now a large commercial affair. The beach is rocky rather than beautiful, and the appeal is the scene and the clifftop bars rather than the sand.',
    'The parties are much more regulated than they were, with a sound curfew and periodic crackdowns, but the character persists.'
  ],
  see: [
    { n: 'The Wednesday flea market',
      d: 'In season, from mid-morning. Crowded, and the bargaining is expected.' },
    { n: 'The cliffs and Curlies',
      d: 'Bars on the rocks at the south end, with sunset and a long history.' },
    { n: 'Saturday Night Market, Arpora',
      d: 'Ten minutes away, with live music and food stalls. Better than Anjuna’s for atmosphere.' },
    { n: 'Chapora Fort',
      d: 'Up the coast, ruined, with a view over the Chapora river mouth and Vagator below.' },
    { n: 'Vagator and Ozran',
      d: 'Better beaches a short scooter ride north, with the carved Shiva face in the rock at Ozran.' }
  ],
  when: 'November to March; the peak is Christmas and New Year, when prices triple.',
  stay: 'Three nights.',
  move: 'Mopa airport is closer than Dabolim. Scooter rental is universal; wear a helmet and expect checkpoints.',
  eat: 'Everything from Goan to Israeli. Thalassa for Greek on the cliff, and the shacks for fish curry rice.'
},

'GOA-agonda': {
  intro: [
    'Agonda is three kilometres of sand ten minutes north of Palolem, and it is what Palolem was fifteen years ago: beach huts, no loud music, a single village road, and a turtle nesting site at the north end that keeps development in check.',
    'Olive ridley turtles come ashore between November and March, and the nesting area is fenced and watched by forest guards, which has had the useful side effect of limiting what can be built.'
  ],
  see: [
    { n: 'The beach',
      d: 'Long enough to walk for an hour. The south end is quieter; the north end has the turtle enclosure.' },
    { n: 'Turtle nesting', t: 'November to March',
      d: 'Olive ridleys nest and hatch. Guards will explain; do not use lights on the beach at night.' },
    { n: 'Cabo de Rama',
      d: 'A ruined Portuguese fort on a headland twenty minutes north, with a cliff view and a chapel.' },
    { n: 'Honeymoon and Butterfly beaches',
      d: 'By boat from Agonda or Palolem.' },
    { n: 'Yoga',
      d: 'A dense concentration of schools and teacher trainings, in season.' }
  ],
  when: 'November to March. Shut from June to September.',
  stay: 'A week.',
  move: 'Canacona station is fifteen minutes. Scooters locally.',
  eat: 'Hut restaurants on the sand, and Fatima’s and Zest in the village.'
},

'GOA-arambol': {
  intro: [
    'Arambol is the far north of Goa and the last of the long-stay traveller beaches — a cliff path, a freshwater lake behind the sand, a banyan tree inland where people have gathered since the seventies, and a drum circle at sunset every evening.',
    'It attracts a particular crowd: musicians, acrobats, paragliders, and people who come for the season rather than the fortnight. The beach itself is wide and good, and it is noticeably cheaper than the central stretch.'
  ],
  see: [
    { n: 'Sweet Water Lake',
      d: 'Behind the north end of the beach, fed by a spring, with a sulphurous mud bank people coat themselves in.' },
    { n: 'The sunset drum circle',
      d: 'On the main beach, nightly in season. Anyone can join.' },
    { n: 'The banyan tree',
      d: 'A walk inland from the lake to a very large tree with a long countercultural history.' },
    { n: 'Paragliding from the cliff',
      d: 'Tandem flights off the headland between Arambol and Keri.' },
    { n: 'Keri and Tiracol',
      d: 'North across the river by ferry, to an almost empty beach and a fort turned hotel.' }
  ],
  when: 'November to March.',
  stay: 'A week or a season.',
  move: 'Mopa airport is forty minutes. Pernem is the station. Scooters.',
  eat: 'Shacks on the sand, and a good concentration of Russian and Italian places on the cliff path.'
},

'GOA-calangute-baga': {
  intro: [
    'Calangute and Baga are the busiest beaches in Goa and the ones most domestic package tourism goes to. The sand is wide, the water is safe, and the strip behind it is a dense run of shops, bars and water-sports touts.',
    'It is not what anyone means by unspoiled, and if you want quiet you should go elsewhere. What it does have is energy, Tito’s Lane for nightlife, and the best concentration of old Goan restaurants on the coast.',
    'Saturday Night Market at Arpora and Calangute’s own market are both nearby, and Candolim just south is marginally calmer.'
  ],
  see: [
    { n: 'Tito’s Lane',
      d: 'The nightlife strip, loud from ten onwards. Mandatory once and probably not twice.' },
    { n: 'Souza Lobo',
      d: 'On Calangute beach since 1932, and still the benchmark for Goan seafood on this stretch.' },
    { n: 'Water sports at Baga',
      d: 'Parasailing, jet skis and banana boats. Agree the price before you get in.' },
    { n: 'Baga river and the Fort Aguada road',
      d: 'A walk at the north end, and the ruined chapel at the river mouth.' },
    { n: 'Saturday Night Market, Arpora',
      d: 'Ten minutes inland and the best market in Goa.' }
  ],
  when: 'November to February. Christmas and New Year are at capacity.',
  stay: 'Two nights, or base here if you want things open late.',
  move: 'Twenty minutes from Panaji, forty from Dabolim. Scooters and taxis; the taxi cartel here is notoriously expensive.',
  eat: 'Souza Lobo, Infantaria for bakery, and the shacks. Fish curry rice at a local lunch place is cheaper and better than anything on the strip.'
},

'GOA-dudhsagar': {
  intro: [
    'Dudhsagar is a three hundred and ten metre waterfall on the Mandovi in the Bhagwan Mahaveer sanctuary, falling in four tiers through forest on the Goa–Karnataka border. The name means sea of milk, and in full monsoon spate the water is white the whole way down.',
    'The Londa–Madgaon railway line crosses directly in front of the fall on a bridge, which means a train journey gives the single best view of it — and which is also why people have been killed trespassing on the track.',
    'Access by road is by forest department jeep from Kulem, and the last stretch involves crossing streams and a short walk.'
  ],
  see: [
    { n: 'The fall from the base',
      d: 'Jeep from Kulem, then a walk. Swimming at the plunge pool is allowed when the water is low enough.' },
    { n: 'The train crossing',
      d: 'Any train on the Londa–Madgaon line passes in front of it. The Vasco–Londa passenger services are slow enough to see properly.' },
    { n: 'Devil’s Canyon',
      d: 'A gorge on the same river, usually included in the jeep trip.' },
    { n: 'Spice plantations at Molem',
      d: 'Tours with lunch, which most jeep trips bolt on.' },
    { n: 'Tambdi Surla',
      d: 'A twelfth-century Kadamba basalt temple in the forest nearby, the oldest building in Goa.' }
  ],
  when: 'Best from late July to early October when it is in flood, but jeep access is sometimes suspended in heavy rain. November and December give good flow with reliable access. Dry by March.',
  stay: 'A full day from anywhere in Goa.',
  move: 'Train or road to Kulem, then forest jeeps only — private vehicles are not permitted. Book the jeep early; they fill by mid-morning.',
  eat: 'Plantation lunches and stalls at Kulem.'
},

'GOA-fort-aguada': {
  intro: [
    'Fort Aguada was built by the Portuguese in 1612 at the mouth of the Mandovi to keep the Dutch out, and it did — it was never taken. The name comes from the freshwater spring inside, which supplied ships coming from Lisbon.',
    'It has a four-storey lighthouse of 1864, the oldest of its kind in Asia, and a cistern beneath the fort that held two and a half million gallons.',
    'Part of the lower fort served as Goa’s central jail until 2015 and has since been turned into a museum of the Goan freedom struggle.'
  ],
  see: [
    { n: 'The ramparts and the lighthouse',
      d: 'A view over Sinquerim, Candolim and the river mouth. Go late in the day.' },
    { n: 'The freshwater cistern',
      d: 'Visible through openings in the fort floor; the engineering is the real achievement here.' },
    { n: 'Goa Freedom Fighters Museum',
      d: 'In the former jail below the fort, on the 1961 liberation and the resistance before it.' },
    { n: 'Sinquerim beach',
      d: 'Directly below, with the fort wall running down to the sea.' },
    { n: 'Reis Magos Fort',
      d: 'Across the river mouth, smaller, beautifully restored, and far quieter.' }
  ],
  when: 'November to February. Mornings and late afternoons; there is no shade on the ramparts.',
  stay: 'Two hours.',
  move: 'Fifteen minutes from Candolim by scooter or taxi.',
  eat: 'Candolim and Sinquerim have plenty; nothing at the fort.'
},

'GOA-divar-chorao': {
  intro: [
    'Divar and Chorao are islands in the Mandovi, a five-minute free ferry from the mainland, and they are what Goa looks like with the tourism removed: paddy fields, Portuguese village houses, churches on hills, and almost no traffic.',
    'Chorao holds the Dr Salim Ali Bird Sanctuary, a mangrove reserve on the western tip, navigated by canoe at high tide and among the best birding sites in Goa.',
    'Divar has three villages, a seminary, and a view from the Our Lady of Compassion church hill back across the river to Old Goa. It is an afternoon of cycling and nothing else.'
  ],
  see: [
    { n: 'Salim Ali Bird Sanctuary',
      d: 'Canoe through the mangroves at high tide for kingfishers, herons, mudskippers and sometimes crocodile. Guides at the jetty.' },
    { n: 'The Divar ferry and the church hill',
      d: 'Free ferries run constantly from Ribandar and Old Goa. The church above Piedade has the best view of Old Goa.' },
    { n: 'Cycling the islands',
      d: 'Flat, quiet lanes between fields and palms. Rentals in Panaji.' },
    { n: 'Chorao village',
      d: 'Old Goan houses with balcoes, and a seventeenth-century church.' },
    { n: 'Bonderam', t: 'August',
      d: 'Divar’s flag festival, a village celebration with mock battles over boundary disputes.' }
  ],
  when: 'November to February for comfort; the mangroves are good year round.',
  stay: 'Half a day.',
  move: 'Free ferries from Ribandar for Chorao and from Old Goa or Ribandar for Divar. Take a scooter or bicycle across.',
  eat: 'A couple of village taverns doing excellent cheap Goan food.'
},

/* ===================== MADHYA PRADESH ===================== */
'MPR-bandhavgarh': {
  intro: [
    'Bandhavgarh has the highest density of tigers of any reserve in India, and arguably in the world. The core is relatively small, the terrain is sal forest between sandstone cliffs and open meadow, and the animals are habituated — which together make it the most reliable place on earth to see a wild tiger.',
    'It takes its name from a hill fort at the centre, said to have been given by Rama to his brother Lakshmana, with reclining Vishnu statues and ancient caves on the plateau. The fort is now closed to visitors.',
    'This was also the home range of Charger, Sita and B2 — individual tigers who became famous through National Geographic coverage in the 1990s and effectively created tiger tourism in India.'
  ],
  see: [
    { n: 'Tala zone safaris',
      d: 'The original core and still the best. Morning and afternoon jeeps; permits online months ahead, released in a scramble.' },
    { n: 'Magadhi and Khitauli',
      d: 'The other two core zones, quieter, with good sightings and fewer vehicles.' },
    { n: 'The Shesh Shaiya',
      d: 'A reclining Vishnu carved from a single rock beside a spring, at the foot of the fort hill. Visible on some routes.' },
    { n: 'Birding',
      d: 'Over two hundred and fifty species; the meadows hold Indian roller, serpent eagle and a great deal else.' },
    { n: 'Bamera and the buffer',
      d: 'Buffer safaris are cheaper, easier to book, and now produce regular tiger sightings.' }
  ],
  when: 'October to June. February to April is the sweet spot; April to June is hot and best for sightings. Closed July to September.',
  stay: 'Three nights minimum for four or five drives.',
  move: 'Umaria is the railhead, thirty kilometres; Jabalpur airport is four hours. Book permits before flights.',
  eat: 'Lodge kitchens, which range from basic to very good.'
},

'MPR-sanchi': {
  intro: [
    'Sanchi is the oldest surviving Buddhist complex in India and the best-preserved group of stupas anywhere. Ashoka founded it in the third century BC, and it was added to for a thousand years before being abandoned and forgotten until a British officer found it in 1818.',
    'The Great Stupa’s four gateways, carved in the first century BC, are the reason to come. They tell the Buddha’s life and the Jataka tales in dense relief without ever depicting him — he appears as a footprint, an empty throne, a wheel, a tree.',
    'Early excavation was destructive: treasure hunters opened the stupas and a good deal was lost. The careful restoration from 1912 under John Marshall is why it looks as it does now.'
  ],
  see: [
    { n: 'The Great Stupa and its toranas',
      d: 'Walk the circumambulation path, then study each gateway in turn. The northern one is the best preserved.' },
    { n: 'Stupa 3',
      d: 'Held relics of Sariputta and Mahamoggallana, the Buddha’s chief disciples, now in a modern vihara on the hill.' },
    { n: 'Temple 17 and 18',
      d: 'A fifth-century Gupta temple of extreme simplicity, and an apsidal hall on earlier foundations.' },
    { n: 'The Ashokan pillar',
      d: 'Broken, with a lion capital nearby in the museum and a polish nobody has reproduced.' },
    { n: 'The archaeological museum',
      d: 'At the bottom of the hill, with the capital, the relic caskets and the best of the loose sculpture.' },
    { n: 'Udayagiri caves',
      d: 'Fourteen kilometres away, with a monumental Gupta Varaha relief carved into the rock. Far less visited and extraordinary.' }
  ],
  when: 'October to March. Go early for the light raking across the carving.',
  stay: 'Half a day, a full day with Udayagiri and Vidisha.',
  move: 'Forty-six kilometres from Bhopal, an hour. Sanchi has its own small station.',
  eat: 'A tourism cafeteria and a few stalls; eat in Bhopal.'
},

'MPR-kanha': {
  intro: [
    'Kanha is the largest tiger reserve in central India and the one Kipling drew on for The Jungle Book — the maidans, the sal forest and the Banjar river are the setting of Mowgli’s country, and the Pench reserve nearby makes the same claim.',
    'It saved the barasingha, the hard-ground swamp deer, from extinction: the population fell to sixty-six animals in 1970 and is now around a thousand, found nowhere else on earth.',
    'It is bigger, greener and less crowded than Bandhavgarh, with longer drives and lower tiger density. Sightings are good but you work for them, and the forest itself is the better of the two.'
  ],
  see: [
    { n: 'Kanha and Kisli zones',
      d: 'The classic core. Long drives through sal and bamboo with open maidans where the deer concentrate.' },
    { n: 'Barasingha at Sonf meadow',
      d: 'Herds of the hard-ground swamp deer, the reserve’s conservation achievement.' },
    { n: 'Mukki zone',
      d: 'The western side, with good tiger movement and fewer vehicles.' },
    { n: 'Bamni Dadar at sunset',
      d: 'A plateau viewpoint over the whole forest, included on some afternoon drives.' },
    { n: 'Dhole and gaur',
      d: 'Both regular here; wild dog packs hunting are a real possibility.' }
  ],
  when: 'October to June; February to April is best. Closed in the monsoon.',
  stay: 'Three nights.',
  move: 'Jabalpur is the nearest airport, four hours. Permits online well in advance.',
  eat: 'Lodge kitchens; several of the lodges here are excellent.'
},

'MPR-gwalior': {
  intro: [
    'Gwalior fort stands on a three-kilometre sandstone mesa a hundred metres above the city, and Babur called it the pearl among the fortresses of Hind. The Man Singh palace inside, from the 1490s, has exterior walls faced in glazed blue and yellow tiles with ducks and elephants on them.',
    'Cut into the cliff on the approach are enormous Jain tirthankara figures, the tallest nearly seventeen metres, carved in the fifteenth century and defaced by Babur’s troops.',
    'The fort also holds the Sas Bahu temples and, in the Teli ka Mandir, a ninth-century shrine whose roof is a barrel vault in a south Indian style found nowhere else this far north. Gwalior is where the number zero first appears in an inscription with a known date, in a temple of 876 AD.'
  ],
  see: [
    { n: 'Man Mandir Palace',
      d: 'The tiled facade from outside, and the underground chambers where Aurangzeb is said to have had his brother killed.' },
    { n: 'The Gopachal Jain rock-cut figures',
      d: 'On the eastern approach road, cut into the cliff in rows. Startling in scale.' },
    { n: 'Teli ka Mandir and Sas Bahu',
      d: 'The tallest building in the fort and a pair of eleventh-century temples with superb carving.' },
    { n: 'Jai Vilas Palace',
      d: 'The Scindia palace in town, with a durbar hall holding two chandeliers of three and a half tonnes each, and a silver toy train that carried brandy round the dining table.' },
    { n: 'Tansen’s tomb',
      d: 'The great Mughal court musician, buried here. A music festival in his name runs each December.' }
  ],
  when: 'October to March.',
  stay: 'Two nights.',
  move: 'On the Delhi–Mumbai main line, four hours from Delhi. Airport with limited flights. Autos within the city.',
  eat: 'Bedai and poha for breakfast, and gajak — a sesame brittle the city is known for.'
},

'MPR-orchha': {
  intro: [
    'Orchha was the Bundela capital from 1501, abandoned in the eighteenth century, and left essentially alone since — a group of palaces, temples and cenotaphs on the Betwa river with a village among them and cattle in the courtyards.',
    'The Jahangir Mahal was built to house the emperor for a single visit. The Chaturbhuj temple has a vaulted interior over thirty metres high and nothing in it, because the idol it was built for refused to leave the smaller Ram Raja palace, which is consequently the only place in India where Rama is worshipped as a king.',
    'The chhatris along the river, fourteen cenotaphs reflected in the water at dusk with vultures on top of them, are the image people remember.'
  ],
  see: [
    { n: 'Jahangir Mahal',
      d: 'Three storeys round a courtyard, with hanging balconies and domed pavilions. Climb to the roof.' },
    { n: 'Chaturbhuj Temple',
      d: 'An enormous empty interior and a spire you can climb for a view over the whole site.' },
    { n: 'The chhatris at sunset',
      d: 'On the Betwa below the Kanchana Ghat. Go at golden hour.' },
    { n: 'Laxminarayan Temple',
      d: 'On a rise outside the village, with the best surviving Bundela murals — battles, processions and the 1857 uprising.' },
    { n: 'Rafting and the river',
      d: 'Gentle rafting on the Betwa, and swimming in the pools above the barrage.' }
  ],
  when: 'October to March. Early morning and late afternoon for the stone.',
  stay: 'Two nights. Orchha is a place to slow down in.',
  move: 'Jhansi is the railhead, eighteen kilometres and half an hour. Walked or cycled once there.',
  eat: 'Guest house rooftops and a few village places; Bundeli thalis are good and simple.'
},

'MPR-bhimbetka': {
  intro: [
    'Bhimbetka is a group of about seven hundred and fifty rock shelters in the Vindhyas, around five hundred of them painted, with the oldest pigment somewhere around ten thousand years old and some claims pushing far earlier. It is the longest continuous record of human art in the subcontinent.',
    'The paintings run from Mesolithic hunting scenes in red and white through to medieval figures on horseback, layered over each other in the same shelters — so you can see ten thousand years of style change on one rock face.',
    'It was identified in 1957 by V S Wakankar, who spotted the formations from a train window and came back to look.'
  ],
  see: [
    { n: 'The main circuit',
      d: 'Fifteen numbered shelters on a marked path. Allow ninety minutes and take a guide, who will find the figures you would walk past.' },
    { n: 'The Zoo Rock',
      d: 'A single panel with hundreds of animals — bison, elephant, deer, boar — in superimposed layers.' },
    { n: 'The Boar Rock',
      d: 'An enormous mythical boar pursuing a human figure, the best-known image on the site.' },
    { n: 'The rock formations themselves',
      d: 'Weathered quartzite in shapes that would be worth the trip without the paint.' },
    { n: 'Bhojpur',
      d: 'Twenty kilometres away, an unfinished eleventh-century Shiva temple with a colossal lingam and the construction ramp still in place.' }
  ],
  when: 'October to March. Midday light is actually best for the paintings, which is unusual.',
  stay: 'Half a day from Bhopal.',
  move: 'Forty-five kilometres from Bhopal, an hour. Obaidullaganj is the nearest station.',
  eat: 'Nothing on site; a dhaba at the turn-off.'
},

'MPR-pench': {
  intro: [
    'Pench straddles the Madhya Pradesh–Maharashtra border on the Pench river, and it is the other claimant to being Kipling’s jungle — Seoni, which he names, is the district.',
    'The forest is more open teak than Kanha’s sal, with a reservoir in the middle, which makes for good visibility and excellent birding. Tiger density is lower than Bandhavgarh but rising, and the reserve is much less busy.',
    'It is the best of the central Indian parks for a first safari if you care more about the forest than about guaranteed tigers.'
  ],
  see: [
    { n: 'Turia and Karmajhiri zones',
      d: 'The Madhya Pradesh core. Open teak with long sightlines; good for leopard and wild dog as well as tiger.' },
    { n: 'The Pench reservoir',
      d: 'Waterbirds, crocodile and animals coming down to drink in the hot months.' },
    { n: 'Night safaris in the buffer',
      d: 'Available here and productive — civet, hyena, nightjars.' },
    { n: 'Birding',
      d: 'Over two hundred and eighty-five species. Malabar pied hornbill and a great many raptors.' },
    { n: 'Alikatta meadow',
      d: 'The central grassland where herbivores concentrate and safaris converge for a break.' }
  ],
  when: 'October to June; the Maharashtra side stays partly open in the monsoon.',
  stay: 'Two or three nights, often combined with Kanha.',
  move: 'Nagpur airport is two hours — the easiest access of any central Indian park.',
  eat: 'Lodge kitchens.'
},

'MPR-panna': {
  intro: [
    'Panna is on the Ken river in the Vindhyas, half an hour from Khajuraho, and it is a conservation story worth knowing: by 2009 every tiger in the reserve had been poached, and the park was restocked from Kanha, Bandhavgarh and Pench. The population now exceeds eighty.',
    'The landscape is the draw as much as the wildlife — table-top plateaux cut by gorges, waterfalls, and the Ken running through with crocodile and gharial in it.',
    'A proposed river-linking project to divert the Ken has been approved and would submerge a significant part of the core, which has been fought over in the courts for years.'
  ],
  see: [
    { n: 'Jeep safaris from Madla or Hinauta',
      d: 'Good tiger sightings now, plus sloth bear and leopard in the ravines.' },
    { n: 'Boating on the Ken',
      d: 'Through the gorge at Raneh, with crocodile, gharial and vultures on the cliffs.' },
    { n: 'Raneh Falls',
      d: 'A canyon of coloured crystalline rock just outside the park. Dramatic after the monsoon.' },
    { n: 'Pandav Falls',
      d: 'A fall into a pool with caves behind it, a short walk from the road.' },
    { n: 'Khajuraho',
      d: 'Half an hour away, and the reason most people are in the area.' }
  ],
  when: 'October to June. February to April for sightings.',
  stay: 'Two nights, easily added to Khajuraho.',
  move: 'Khajuraho airport is twenty-five kilometres. Permits at the gates or online.',
  eat: 'Lodge kitchens on the Madla road.'
},

'MPR-mandu': {
  intro: [
    'Mandu is a ruined fortress city on a plateau above the Narmada valley, with a wall thirty-seven kilometres round and a scatter of fifteenth-century Afghan-style buildings inside it — stark, geometric, in pale stone, quite unlike anything Mughal.',
    'It is attached to the story of Baz Bahadur and Rupmati, the last sultan and a Hindu singer, whose pavilion on the plateau edge was positioned so she could see the Narmada from her window. Akbar’s general took the city in 1561 and she poisoned herself.',
    'The Jami Masjid here is one of the finest mosques in India, and the Hoshang Shah tomb beside it is the country’s earliest marble building — Shah Jahan sent his architects to study it before building the Taj.'
  ],
  see: [
    { n: 'Jami Masjid',
      d: 'A vast courtyard mosque of 1454 in red sandstone, modelled on the great mosque of Damascus and almost empty of visitors.' },
    { n: 'Hoshang Shah’s tomb',
      d: 'White marble, domed, with an inscription recording the visit of Shah Jahan’s architects.' },
    { n: 'Jahaz Mahal',
      d: 'The ship palace, a long narrow building between two tanks so that it appears to float. Built for a sultan’s very large harem.' },
    { n: 'Rupmati’s Pavilion at sunset',
      d: 'On the southern escarpment, with the Narmada valley dropping away below.' },
    { n: 'Baz Bahadur’s Palace and Rewa Kund',
      d: 'Below Rupmati’s pavilion, with a water system that lifted water up to it.' }
  ],
  when: 'July to March. The monsoon is the local favourite, when the plateau is green and the baobabs leaf out — there are African baobabs here, nobody is quite sure how.',
  stay: 'Two nights.',
  move: 'Ninety kilometres from Indore, two and a half hours. Hire a bicycle or auto on the plateau; the sites are spread out.',
  eat: 'Simple places near the Jami Masjid; try the baobab fruit drink in season.'
},

'MPR-ujjain': {
  intro: [
    'Ujjain is one of the seven holy cities and one of the four Kumbh Mela sites, on the Shipra, and the Mahakaleshwar temple here is one of the twelve jyotirlingas — the only one where the lingam is considered swayambhu, self-manifested, and faces south.',
    'The Bhasma Aarti at four in the morning, in which the lingam is anointed with ash from a cremation ground, is unique to this temple and is the reason to come. It must be booked in advance.',
    'It was also a centre of astronomy: the Jantar Mantar observatory here predates the Jaipur one, and the prime meridian of Hindu astronomy ran through the city.'
  ],
  see: [
    { n: 'Bhasma Aarti at Mahakaleshwar', t: '4am, book ahead',
      d: 'Online booking required with ID. Men must wear a dhoti. Unlike any other temple ritual in India.' },
    { n: 'Ram Ghat on the Shipra',
      d: 'Evening aarti, and the main bathing ghat during the Simhastha Kumbh.' },
    { n: 'Jantar Mantar',
      d: 'Eighteenth-century masonry instruments, still used to compute the local ephemeris.' },
    { n: 'Kal Bhairav',
      d: 'A temple where liquor is the offering to the deity, and is poured into the mouth of the image.' },
    { n: 'Sandipani Ashram',
      d: 'Where Krishna is said to have studied, with a tank and a quiet garden.' }
  ],
  when: 'October to March. Mahashivratri and the Simhastha Kumbh, every twelve years, are the great occasions.',
  stay: 'One or two nights.',
  move: 'Fifty-five kilometres from Indore, with a railway station on the main line.',
  eat: 'Simple vegetarian; the poha and jalebi breakfast at the ghats is a Malwa institution.'
},

'MPR-maheshwar': {
  intro: [
    'Maheshwar is a small town of ghats and temples on the north bank of the Narmada, and it was the capital of Ahilyabai Holkar — the eighteenth-century Maratha queen who ruled Malwa for twenty-eight years, rebuilt temples across India from Kashi to Rameswaram, and is one of the more impressive rulers in Indian history.',
    'Her fort still stands above the river with her palace inside it, and part of it is now a hotel. The ghats below, with their chhatris and stone steps running into the water, are among the most photogenic in India and almost unvisited.',
    'She also founded the Maheshwari weaving tradition, which survives in a cooperative she endowed and which is still producing saris in the same drafts.'
  ],
  see: [
    { n: 'The ghats at dawn',
      d: 'Boats, bathers and the fort wall above. Hire a rowing boat for half an hour.' },
    { n: 'Ahilya Fort and palace',
      d: 'Her private rooms kept as a shrine, with her swing and her slippers. The courtyard is open.' },
    { n: 'Rehwa Society',
      d: 'The weaving cooperative in the fort, where you can watch the looms and buy directly.' },
    { n: 'The riverside temples',
      d: 'Kaleshwar, Rajarajeshwar and Vithaleshwar, in a row above the ghats.' },
    { n: 'Mandu',
      d: 'Ninety minutes away, and the natural pairing.' }
  ],
  when: 'October to March.',
  stay: 'Two nights. It is the single most restful place in Madhya Pradesh.',
  move: 'Ninety kilometres from Indore, two and a half hours. Walked once there.',
  eat: 'Guest house kitchens and a few places near the bus stand.'
},

'MPR-omkareshwar': {
  intro: [
    'Omkareshwar is an island in the Narmada shaped, by tradition, like the Om symbol, and it holds one of the twelve jyotirlingas. Pilgrims walk a circumambulation of the whole island, about seven kilometres, which is unusual — most jyotirlingas are a single temple.',
    'There are two shrines claiming the jyotirlinga, on the island and the mainland, and most pilgrims visit both. The island temple is reached by a footbridge or by boat across a fast green river.',
    'A hundred-metre statue of Adi Shankara was installed on the island in 2023, on the basis that he received initiation here.'
  ],
  see: [
    { n: 'Omkareshwar Mandir',
      d: 'On the island, reached across the bridge. Queues are long on Mondays and in Shravan.' },
    { n: 'The parikrama',
      d: 'The island circuit, past ghats, caves and smaller shrines, with very few people on the far side.' },
    { n: 'Siddhanath Temple',
      d: 'An eleventh-century temple on the island’s high ground with good carving and no crowd.' },
    { n: 'The boat crossing',
      d: 'Rowing boats between the banks, better than the bridge.' },
    { n: 'Maheshwar',
      d: 'Seventy kilometres downstream and a complete change of pace.' }
  ],
  when: 'October to March. Shravan, in July and August, brings enormous crowds.',
  stay: 'One night.',
  move: 'Seventy-seven kilometres from Indore. Omkareshwar Road is the nearest station.',
  eat: 'Simple vegetarian near the ghats.'
},

'MPR-satpura': {
  intro: [
    'Satpura is the one Indian tiger reserve where you can legally walk. Guided walking safaris, canoeing on the Denwa reservoir and night drives are all permitted, which makes it completely different in character from the jeep-bound parks.',
    'Tiger density is low and sightings are uncommon. What you get instead is sloth bear, leopard, gaur, flying squirrel, the Indian giant squirrel, and the experience of being in a central Indian forest on foot.',
    'It is arguably the best wildlife experience in India for anyone who has done the tiger circuit and wants something else.'
  ],
  see: [
    { n: 'A walking safari',
      d: 'Two to four hours with an armed guard and a naturalist. Sloth bear tracks, bird calls, and the forest at eye level.' },
    { n: 'Canoeing on the Denwa',
      d: 'Early morning on the backwater, with crocodile, otter and skimmers.' },
    { n: 'Night drives in the buffer',
      d: 'Flying squirrel, civet, leopard and nightjars.' },
    { n: 'Churna',
      d: 'Deep inside the core, with a forest rest house and the best gaur sightings.' },
    { n: 'Pachmarhi',
      d: 'The hill station on the plateau above, with waterfalls, caves and painted rock shelters.' }
  ],
  when: 'October to June. Walking is best from November to March.',
  stay: 'Three nights.',
  move: 'Pipariya is the railhead, an hour. Bhopal airport is four hours.',
  eat: 'Lodge kitchens; the lodges on the Denwa are among the best in central India.'
},

'MPR-bhopal': {
  intro: [
    'Bhopal is a city of two lakes, ruled for over a century by a line of female rulers — the Begums of Bhopal — who built the Taj-ul-Masajid, one of the largest mosques in India, and a good deal else.',
    'It is also the site of the 1984 Union Carbide gas leak, the worst industrial disaster in history, which killed thousands in a single night and whose survivors are still litigating. The abandoned factory stands in the middle of the city and a memorial has been built at the gate.',
    'The Museum of Mankind on a hill above the lake is the best ethnographic museum in India, with full-size tribal dwellings built on site by the communities themselves.'
  ],
  see: [
    { n: 'Indira Gandhi Rashtriya Manav Sangrahalaya',
      d: 'The Museum of Mankind. Two hundred acres of tribal habitat exhibits built by the communities. Allow half a day.' },
    { n: 'Taj-ul-Masajid',
      d: 'Begun by Shah Jahan Begum in the 1870s and only finished in 1985. Enormous and little visited.' },
    { n: 'The Upper Lake',
      d: 'An eleventh-century artificial lake, with a boat club and a promenade the city walks at dusk.' },
    { n: 'The old city',
      d: 'Chowk bazaar, the Jama Masjid, and Shaukat Mahal — an Indo-European oddity by a French architect.' },
    { n: 'Bharat Bhavan',
      d: 'A Charles Correa arts centre cut into the lakeside, with tribal and contemporary art.' }
  ],
  when: 'October to March.',
  stay: 'Two nights, as a base for Sanchi and Bhimbetka.',
  move: 'Airport and a major rail junction. Autos and app cabs.',
  eat: 'Bhopali cuisine — rezala, biryani and the famous sulemani tea. Chatori Gali after dark.'
},

'MPR-chanderi': {
  intro: [
    'Chanderi is a small town below a hill fort in the Betwa country, and it has two things: a history as a Bundela and Malwa stronghold with a scatter of medieval architecture, and a weaving tradition producing the sheer cotton-silk Chanderi sari.',
    'Around three thousand five hundred handlooms still work in the town, mostly in home workshops, and you can walk into them. The fabric is woven with a particular transparency that comes from not degumming the silk warp.',
    'Almost nobody visits. The fort, the tombs, the Jain temples at Khandargiri and the sixty-pillared Koshak Mahal are all effectively private.'
  ],
  see: [
    { n: 'The weavers',
      d: 'Walk through the weaving lanes and ask. Most families will show you the loom and sell directly.' },
    { n: 'Chanderi Fort',
      d: 'On the hill above, with the Khooni Darwaza and a long view over the Betwa country.' },
    { n: 'Koshak Mahal',
      d: 'An unfinished fifteenth-century palace a few kilometres out, four identical wings around a cross plan.' },
    { n: 'Badal Mahal Gate',
      d: 'A freestanding ceremonial gateway leading nowhere, which is the point.' },
    { n: 'Khandargiri Jain rock sculptures',
      d: 'Tirthankara figures cut into a hillside outside town.' }
  ],
  when: 'October to March.',
  stay: 'Two nights.',
  move: 'Lalitpur is the nearest railhead, thirty-five kilometres. Four hours from Gwalior.',
  eat: 'Basic local places. Nothing notable.'
},

/* ===================== CHHATTISGARH ===================== */
'CHH-chitrakote': {
  intro: [
    'Chitrakote is a horseshoe waterfall on the Indravati in Bastar, around three hundred metres wide in full flood and thirty metres high — the widest in India, and reasonably called the Niagara of India without too much exaggeration in August.',
    'In the dry season it narrows to a set of separate channels over red laterite, which is prettier but less impressive. In the monsoon it turns brown and thunderous and you cannot stand near the edge.',
    'It is in the heart of Bastar, a region with a strong Adivasi culture and a long-running Maoist insurgency. Security has improved considerably; travel in daylight and take local advice.'
  ],
  see: [
    { n: 'The fall from the lower viewpoint',
      d: 'Steps down to a platform at river level. Boats will take you under the spray when the flow allows.' },
    { n: 'The upper viewpoint at sunset',
      d: 'The full horseshoe, with a rainbow in the spray in the afternoon.' },
    { n: 'Tirathgarh Falls',
      d: 'An hour away, a tiered cascade in the Kanger Valley park, quite different and arguably prettier.' },
    { n: 'Kutumsar and Kailash caves',
      d: 'Limestone caves in Kanger Valley with blind cave fish, open in the dry season only.' },
    { n: 'A Bastar haat',
      d: 'Weekly markets where Adivasi communities trade. The most interesting thing in the region.' }
  ],
  when: 'July to October for volume; November to February for comfort and access to the caves.',
  stay: 'Two nights, based at Chitrakote or Jagdalpur.',
  move: 'Jagdalpur is forty kilometres, with a station and a small airport. Raipur is three hundred kilometres.',
  eat: 'State tourism resorts at the fall; Jagdalpur has local places. Try mahua and chapda chutney if offered.'
},

'CHH-bastar': {
  intro: [
    'Bastar is a forested plateau the size of a small country in southern Chhattisgarh, with a majority Adivasi population — Gond, Maria, Muria, Dhurwa, Halba — and the most intact tribal culture in central India.',
    'Its weekly haats are the thing to see: markets where whole villages come to trade, drink mahua, settle disputes and arrange marriages, with bell-metal casting, wrought iron, terracotta and wood carving all still produced for use rather than for sale.',
    'Bastar Dussehra runs for seventy-five days, the longest festival in the world, and has nothing to do with Rama — it honours the local goddess Danteshwari and involves enormous wooden chariots built fresh each year.'
  ],
  see: [
    { n: 'The weekly haats',
      d: 'A different village each day of the week. Your guide will know which. Go in the morning; by afternoon the mahua has been drunk.' },
    { n: 'Bastar Dussehra', t: 'August to October',
      d: 'Seventy-five days of ritual at Jagdalpur, culminating in chariot processions.' },
    { n: 'Dhokra bell-metal casting',
      d: 'Lost-wax metalwork at Kondagaon, a technique four thousand years old and unchanged.' },
    { n: 'Danteshwari Temple, Dantewada',
      d: 'A fourteenth-century shakti peetha and the religious centre of the region.' },
    { n: 'Kanger Valley National Park',
      d: 'Caves, waterfalls, and the hill myna which is the state bird.' }
  ],
  when: 'October to February. Take local advice on routes; the insurgency has receded but has not gone.',
  stay: 'Three or four nights, based in Jagdalpur with a local guide.',
  move: 'Jagdalpur has a small airport and a station. A car and a guide who knows the haat calendar are essential.',
  eat: 'Adivasi food — bamboo shoot, red ant chutney, mahua — and standard Indian in Jagdalpur.'
},

'CHH-sirpur': {
  intro: [
    'Sirpur was the capital of the Sharabhapuriya and Panduvamshi kings between the fifth and eighth centuries, a major Buddhist and Hindu centre that Xuanzang visited, and it was destroyed by an earthquake and buried.',
    'Excavation since 2003 has uncovered over a hundred and fifty structures: brick temples, Buddhist monasteries, a market street, a bathhouse. The Lakshmana temple, a seventh-century brick temple with a carved doorway, is the finest brick temple in India.',
    'It is almost entirely unvisited, which given what is here is remarkable.'
  ],
  see: [
    { n: 'Lakshmana Temple',
      d: 'Seventh century, brick, with a sculpted stone doorway and a shikhara largely intact. Exceptional.' },
    { n: 'The Buddhist viharas',
      d: 'Two monastery complexes with cells, courtyards and large bronze Buddhas found in situ.' },
    { n: 'The site museum',
      d: 'Bronzes, including a Buddha of real quality, and architectural fragments.' },
    { n: 'Surang Tila',
      d: 'A temple platform visibly twisted by the earthquake that destroyed the city, with the stairs still warped.' },
    { n: 'The Mahanadi',
      d: 'The river below the site, with ghats and a quiet walk.' }
  ],
  when: 'October to March.',
  stay: 'Half a day from Raipur.',
  move: 'Eighty kilometres from Raipur, two hours. Mahasamund is the nearest station.',
  eat: 'A tourism cafeteria; eat in Raipur.'
},

'CHH-barnawapara': {
  intro: [
    'Barnawapara is a small sanctuary of mixed deciduous forest and bamboo about a hundred kilometres from Raipur, and it exists on nobody’s itinerary at all.',
    'It has leopard, sloth bear, gaur, wild dog and a recorded but rarely seen tiger passage, and the real appeal is that you will likely be the only vehicle in the forest.',
    'It is also an easy pairing with Sirpur, which is on the same road.'
  ],
  see: [
    { n: 'Jeep safaris',
      d: 'Booked at the gate or through the state tourism lodge. Gaur and sloth bear are the realistic highlights.' },
    { n: 'Birding',
      d: 'Around a hundred and fifty species, with good woodpeckers and raptors in the bamboo.' },
    { n: 'The watchtowers',
      d: 'Several overlook waterholes and are worth an hour at dusk.' },
    { n: 'Sirpur',
      d: 'Forty-five minutes away, and a far better reason to be in this part of the state.' }
  ],
  when: 'November to June. Closed in the monsoon.',
  stay: 'One night at the state lodge.',
  move: 'A hundred kilometres from Raipur, under three hours. A car is necessary.',
  eat: 'The forest lodge kitchen. Carry what else you need.'
},

/* ===================== KARNATAKA ===================== */
'KAR-mysore': {
  intro: [
    'Mysore was the Wodeyar capital for six centuries and remains the most agreeable large town in Karnataka — wide roads, a great deal of shade, a sandalwood and silk industry, and a palace that is the second-most visited monument in India after the Taj.',
    'The palace was rebuilt in 1912 after a fire, in an Indo-Saracenic style with stained glass from Glasgow and cast iron from Birmingham, and it is lit with ninety-seven thousand bulbs on Sunday evenings and during Dussehra.',
    'Mysore Dussehra, which the Wodeyars have observed since the sixteenth century, ends with a caparisoned elephant carrying a golden howdah through the streets. It is the best state festival in south India.'
  ],
  see: [
    { n: 'Mysore Palace',
      d: 'The durbar hall, the marriage pavilion and the painted panels of the 1930s Dussehra procession. Audio guide worth taking.' },
    { n: 'Chamundi Hill',
      d: 'A thousand steps or a road to a temple at the top, with a monolithic Nandi two-thirds of the way up.' },
    { n: 'Devaraja Market',
      d: 'Flowers, bananas, kumkum powder in pyramids, and a working city market rather than a tourist one.' },
    { n: 'Srirangapatna',
      d: 'Sixteen kilometres away: Tipu Sultan’s fort, his summer palace with original murals, and the spot where he died in 1799.' },
    { n: 'Somnathpur',
      d: 'Thirty-five kilometres out, a complete and perfect Hoysala temple of 1268 with nobody in it.' },
    { n: 'Mysore Dussehra', t: 'September or October',
      d: 'Ten days of processions, culminating in the Jamboo Savari.' }
  ],
  when: 'October to February. Dussehra fills every hotel — book months ahead.',
  stay: 'Two nights.',
  move: 'Three hours from Bengaluru by road or the Vande Bharat train. Autos and bicycles within the city.',
  eat: 'Mysore masala dosa at Mylari, idli at Vinayaka Mylari, and Mysore pak from Guru Sweet Mart, where it was invented.'
},

'KAR-badami': {
  intro: [
    'Badami was the capital of the early Chalukyas from the sixth century, and the cave temples cut into the red sandstone cliff above its tank are where South Indian temple architecture was worked out.',
    'Four caves, three Hindu and one Jain, hold some of the finest early sculpture in India — an eighteen-armed dancing Shiva, a reclining Vishnu on the serpent Shesha, a Varaha and a Narasimha — carved with a confidence that the later, larger temples never quite match.',
    'Together with Aihole and Pattadakal nearby, it forms a sequence you can read as a laboratory: experiments at Aihole, refinement at Badami, synthesis at Pattadakal.'
  ],
  see: [
    { n: 'Cave 1',
      d: 'The dancing Shiva with eighteen arms arranged to suggest nine positions, at the entrance. The single best carving on the site.' },
    { n: 'Cave 3',
      d: 'The largest and most elaborate, dated 578 AD by inscription, with a Vishnu on Shesha and surviving traces of paint on the ceiling.' },
    { n: 'Agastya Lake and the Bhutanatha temples',
      d: 'A group of temples at the water’s edge on the far side, beautiful in the late afternoon.' },
    { n: 'The upper fort',
      d: 'A climb above the caves to Chalukyan shikharas and a granary, with a view over the whole gorge.' },
    { n: 'Mahakuta',
      d: 'A temple complex with a spring-fed tank fourteen kilometres away, still in worship and little visited.' }
  ],
  when: 'October to February. The sandstone is best in low light.',
  stay: 'Two nights, with a day for Aihole and Pattadakal.',
  move: 'Badami has a station; Hubli airport is three hours. Autos to the nearby sites.',
  eat: 'Simple north Karnataka food — jolada rotti, enne gai — at places near the bus stand.'
},

'KAR-pattadakal': {
  intro: [
    'Pattadakal was where the Chalukya kings were crowned, and the group of ten temples here, built in the seventh and eighth centuries, is a deliberate anthology: four in the northern Nagara style, four in the southern Dravida style, and one hybrid, standing side by side on the same riverbank.',
    'That makes it the single most instructive temple site in India for understanding how the two great architectural traditions differ and where they met. It was inscribed by UNESCO in 1987.',
    'The Virupaksha temple, built by Queen Lokamahadevi around 740 to mark a victory over the Pallavas, carries the signatures of its sculptors on the pillars — unusual, and a reminder that these were workshops rather than anonymous piety.'
  ],
  see: [
    { n: 'Virupaksha Temple',
      d: 'The largest, Dravida in style, with narrative friezes of the Ramayana and Mahabharata and a Nandi pavilion in front.' },
    { n: 'Papanatha Temple',
      d: 'At the southern end, the hybrid, where the two styles are visibly argued out in a single building.' },
    { n: 'Galaganatha and Kashivishvanatha',
      d: 'The northern-style temples, with curvilinear shikharas quite unlike their neighbours.' },
    { n: 'Jain Narayana Temple',
      d: 'A kilometre away, Rashtrakuta, with elephant sculptures at the entrance.' },
    { n: 'Aihole and Badami',
      d: 'Both within half an hour, and the three should be seen together.' }
  ],
  when: 'October to February. A dance festival is held here in January.',
  stay: 'Two hours.',
  move: 'Twenty-two kilometres from Badami. Autos or a hired car for the circuit.',
  eat: 'A stall or two; eat in Badami.'
},

'KAR-aihole': {
  intro: [
    'Aihole has something over a hundred and twenty temples in and around a village, built between the fourth and twelfth centuries, and it is best understood as the place where the early Chalukyas experimented. Nothing is standardised; forms appear, get tried, and are abandoned.',
    'The Durga temple — nothing to do with the goddess, the name comes from a fort wall — has an apsidal plan with a colonnade running round it, derived from Buddhist chaitya halls and used almost nowhere else in Hindu architecture.',
    'The Lad Khan temple, named for a man who once lived in it, looks like a village meeting hall with a shrine inserted, which is more or less what the form came from.'
  ],
  see: [
    { n: 'Durga Temple',
      d: 'The apsidal plan and the ambulatory with its carved niches. The strangest major temple in India.' },
    { n: 'Lad Khan Temple',
      d: 'Early, squat and timber-derived, with a stone roof imitating logs.' },
    { n: 'Ravana Phadi cave',
      d: 'A rock-cut shrine with a superb ten-armed dancing Shiva, older than the Badami caves.' },
    { n: 'Meguti Jain temple',
      d: 'On a hill above the village, with an inscription of 634 AD that dates much of the site.' },
    { n: 'The village clusters',
      d: 'Temples in courtyards, between houses, in fields. Walk without a plan.' }
  ],
  when: 'October to February.',
  stay: 'Two or three hours.',
  move: 'Thirty-five kilometres from Badami, often done with Pattadakal in one day.',
  eat: 'A tourism canteen. Carry water.'
},

'KAR-coorg': {
  intro: [
    'Kodagu, which the British called Coorg, is a hill district in the Western Ghats at around nine hundred metres, and it produces most of India’s coffee. The landscape is coffee under shade trees with pepper vines climbing them, cardamom in the hollows, and paddy in the valley bottoms.',
    'The Kodava people have a distinct culture — ancestor worship, a martial tradition, a licence to carry firearms without a permit granted in recognition of it, and a cuisine built around pork and kachampuli vinegar that resembles nothing else in India.',
    'It is a two-day escape from Bengaluru rather than a sightseeing destination. The point is the plantations, the rain and the quiet.'
  ],
  see: [
    { n: 'A plantation stay',
      d: 'Several working estates take guests. Walk the coffee at dawn when the cherries are ripening and the pepper is on the trees.' },
    { n: 'Abbey and Iruppu Falls',
      d: 'Both best from July to October. Iruppu is in the Brahmagiri forest with a temple at the base.' },
    { n: 'Talakaveri',
      d: 'The source of the Kaveri on Brahmagiri hill, with a tank and a stiff climb to the summit above.' },
    { n: 'Namdroling Monastery, Bylakuppe',
      d: 'The largest Nyingma teaching centre outside Tibet, with a golden temple and several thousand monks. Startling in these hills.' },
    { n: 'Nagarhole',
      d: 'On the district boundary, for elephant and tiger.' }
  ],
  when: 'October to March is driest. June to September is the heaviest monsoon in India and some people prefer it.',
  stay: 'Three nights.',
  move: 'Madikeri is the main town, five to six hours from Bengaluru and three from Mysore. A car is useful.',
  eat: 'Pandi curry — Coorg pork — kadambuttu, akki roti, and estate-roasted coffee. Among the most distinctive regional food in India.'
},

'KAR-gokarna': {
  intro: [
    'Gokarna is a temple town on the Karnataka coast with one of the most important Shiva lingams in south India, and a string of beaches south of it reached on foot over headlands.',
    'For thirty years it has been what travellers go to when Goa gets too much — Om, Kudle and Half Moon beaches, each in its own cove, with huts and no road access until recently. Roads and resorts are arriving now and it is changing fast.',
    'The town itself is a working pilgrimage centre, conservative and vegetarian, which sits oddly a kilometre from the sunbathing. Dress and behave accordingly in town.'
  ],
  see: [
    { n: 'The beach walk',
      d: 'Gokarna town beach to Kudle to Om to Half Moon to Paradise, over the headlands. Three to four hours one way; start early and carry water.' },
    { n: 'Om Beach',
      d: 'Two crescents forming the shape of the syllable, now with road access and the busiest of the coves.' },
    { n: 'Mahabaleshwar Temple',
      d: 'The atmalinga, one of the most significant in the south. Non-Hindus may not enter the sanctum.' },
    { n: 'Mirjan Fort',
      d: 'Twenty kilometres north, a laterite fort in the forest, beautifully overgrown and almost empty.' },
    { n: 'Yana',
      d: 'Two enormous black limestone monoliths in the forest an hour inland, with a cave temple between them.' }
  ],
  when: 'November to February. Shivaratri in February is the great temple festival. The monsoon closes the huts.',
  stay: 'Four nights.',
  move: 'Gokarna Road station on the Konkan line; Goa airport is three hours. Autos and scooters.',
  eat: 'Beach shacks on the coves, pure vegetarian in town, and excellent coastal fish at Kumta nearby.'
},

'KAR-belur-halebidu': {
  intro: [
    'Belur and Halebidu were the Hoysala capitals, and the temples there are carved in soapstone — a material soft enough when quarried to be worked like wood and which hardens afterwards. The result is carving at a density found nowhere else in India.',
    'The Chennakesava temple at Belur took a hundred and three years. The Hoysaleswara at Halebidu has a frieze running round the base in eight continuous bands — elephants, lions, horsemen, foliage, narrative — and above it figures with individually carved jewellery, bangles that move, and in one case a hairpin you can see through.',
    'Both were inscribed by UNESCO in 2023, along with Somnathpur. They were left unfinished when the Delhi Sultanate sacked Halebidu in 1311.'
  ],
  see: [
    { n: 'Chennakesava Temple, Belur',
      d: 'The madanikai bracket figures — forty-two celestial dancers — and the lathe-turned pillars, each different. Still in worship; shoes off.' },
    { n: 'Hoysaleswara Temple, Halebidu',
      d: 'The base friezes and the Shiva panels. Take a guide; you will miss nine tenths of it otherwise.' },
    { n: 'Kedareshwara Temple',
      d: 'A short walk from Hoysaleswara, smaller and quieter, with equally fine work.' },
    { n: 'The Jain basadis at Halebidu',
      d: 'Three temples with polished black pillars that reflect like mirrors, and almost no visitors.' },
    { n: 'Somnathpur',
      d: 'Two hours away near Mysore, and the most complete Hoysala temple of the three.' }
  ],
  when: 'October to February.',
  stay: 'A full day; a night at Hassan or Chikmagalur.',
  move: 'Belur and Halebidu are sixteen kilometres apart; Hassan is the base, thirty-five kilometres away with a station.',
  eat: 'Simple Karnataka vegetarian near the temples.'
},

'KAR-bandipur': {
  intro: [
    'Bandipur was a Mysore royal hunting reserve and became one of the first nine Project Tiger sites in 1973. It sits in the Nilgiri Biosphere Reserve alongside Nagarhole, Mudumalai and Wayanad, forming the largest protected area in South India.',
    'That landscape holds the largest wild elephant population in Asia, and elephants are the realistic headline sighting. Tigers and leopards are present in good numbers and seen less often than in central India.',
    'The highway through the reserve is closed to traffic at night, which was fought over and has measurably reduced roadkill.'
  ],
  see: [
    { n: 'Jeep and bus safaris',
      d: 'Forest department buses and private jeeps from the Melkamanahalli gate. Morning and afternoon.' },
    { n: 'Elephant herds',
      d: 'Large family groups in the open teak and on the Moyar riverbed. The best elephant viewing in India.' },
    { n: 'Gaur',
      d: 'Indian bison, in numbers, often in the open at dawn.' },
    { n: 'Birding and the dholes',
      d: 'Wild dog packs are regularly seen here, and the birding in the Himavad Gopalaswamy Betta area above is excellent.' },
    { n: 'Gopalaswamy Betta',
      d: 'A hill with a fourteenth-century temple, usually in cloud, on the reserve edge.' }
  ],
  when: 'October to May. March to May for concentrations at water.',
  stay: 'Two nights.',
  move: 'Eighty kilometres from Mysore, on the road to Ooty. Jungle lodges on the boundary.',
  eat: 'Lodge kitchens; the state-run Jungle Lodges properties are good value.'
},

'KAR-nagarhole': {
  intro: [
    'Nagarhole — officially Rajiv Gandhi National Park — adjoins Bandipur across the Kabini river, and the Kabini backwater is the single most productive wildlife viewing site in South India. Animals come to the water, and you watch from a boat.',
    'It has one of the highest densities of herbivores of any Asian forest, which supports a large tiger and leopard population, and it is the most reliable place in India to see a black panther — a melanistic leopard, several of which have been resident and photographed extensively.',
    'The forest is moister and taller than Bandipur, with rosewood and teak, and the two together constitute the core elephant habitat of southern India.'
  ],
  see: [
    { n: 'Boat safari on the Kabini',
      d: 'Elephants, gaur and sometimes tiger on the shoreline, with marsh crocodile and osprey. Better than the jeep for photography.' },
    { n: 'Jeep safaris',
      d: 'From the Kabini or Veeranahosahalli gates. Dhole, leopard and tiger.' },
    { n: 'Black panther',
      d: 'Resident melanistic leopards have made this famous. Sightings are luck, but better here than anywhere.' },
    { n: 'The Kabini backwater at dusk',
      d: 'Herds coming down to drink across the open ground. The classic Nagarhole image.' },
    { n: 'Birding',
      d: 'Over two hundred and seventy species; Malabar trogon and the endemics of the Ghats on the western side.' }
  ],
  when: 'October to May. Summer concentrates the animals at the water.',
  stay: 'Three nights.',
  move: 'Eighty kilometres from Mysore to the Kabini side. Lodges handle permits and safaris.',
  eat: 'Lodge kitchens; the Kabini lodges are among the best in India.'
},

'KAR-bengaluru': {
  intro: [
    'Bengaluru was a garden city of retirees and research institutes until the 1990s, and is now the software capital of India with twelve million people and the traffic to match. Both versions are still present and they coexist awkwardly.',
    'The old city around the Kempegowda tower, Tipu Sultan’s palace and the Bull Temple is a different place from Indiranagar and Koramangala, which are a different place again from the Whitefield tech corridor.',
    'What the city does genuinely well is food, bookshops, breweries and parks, and at nine hundred metres it has a climate that explains why the British moved their cantonment here in 1809.'
  ],
  see: [
    { n: 'Lalbagh and Cubbon Park',
      d: 'A 1760 botanical garden with a Crystal Palace glasshouse and a three-billion-year-old rock outcrop, and the colonial park at the centre of town. Both best at dawn.' },
    { n: 'Bull Temple and Gavi Gangadhareshwara',
      d: 'In Basavanagudi: a monolithic Nandi from the 1530s, and a cave temple where sunlight passes between stone discs onto the lingam each Makara Sankranti.' },
    { n: 'Tipu Sultan’s Summer Palace and the fort',
      d: 'Teak and painted plaster, with the remains of the fort nearby.' },
    { n: 'Blossom and Bookworm',
      d: 'Secondhand bookshops on and off Church Street, and the best in India.' },
    { n: 'Nandi Hills',
      d: 'Sixty kilometres out, a dawn trip above the cloud, with Tipu’s fort on top.' }
  ],
  when: 'October to February. Pleasant most of the year; April and May are warm.',
  stay: 'Two nights, or a base for the state.',
  move: 'Major international airport forty kilometres out, a metro that helps, and traffic that will defeat any schedule. Build in buffers.',
  eat: 'Masala dosa at CTR and Vidyarthi Bhavan, military hotels for Karnataka mutton, Mavalli Tiffin Room for a full breakfast, and the best craft beer in India.'
},

'KAR-jog-falls': {
  intro: [
    'Jog is the Sharavathi falling two hundred and fifty-three metres in a single uninterrupted drop — one of the highest plunge waterfalls in India — in four separate streams named Raja, Rani, Rocket and Roarer.',
    'The Linganamakki dam upstream controls the flow, which means the falls are often a trickle outside the monsoon. From July to October, when the dam spills, it is spectacular; in March it can be close to nothing.',
    'There are steps down to the base, about fifteen hundred of them, which is a serious climb back up.'
  ],
  see: [
    { n: 'The main viewpoint',
      d: 'Opposite the falls, with all four streams visible when the water is high.' },
    { n: 'The descent to the base',
      d: 'Around fifteen hundred steps, slippery in the monsoon, with a pool at the bottom. Two hours round trip.' },
    { n: 'Linganamakki Dam',
      d: 'Six kilometres away, and the reason the falls run or do not.' },
    { n: 'Sigandur and the ferry',
      d: 'A temple across the reservoir, reached by a barge carrying vehicles.' },
    { n: 'Honnemaradu',
      d: 'Kayaking and camping on the backwater nearby.' }
  ],
  when: 'July to October for full flow. Check dam release before travelling at any other time.',
  stay: 'A night at Jog or Sagara.',
  move: 'Talaguppa is the railhead, sixteen kilometres. Shimoga is the nearest city, a hundred kilometres.',
  eat: 'A tourism canteen and stalls at the viewpoint.'
},

'KAR-chikmagalur': {
  intro: [
    'Chikmagalur is coffee country in the Baba Budangiri hills, and coffee in India starts here — a Sufi saint named Baba Budan is said to have smuggled seven beans out of Mocha in his beard in the seventeenth century and planted them on this ridge.',
    'The shrine on Baba Budangiri is still visited by both Muslims and Hindus, which has at times been contested. Mullayanagiri above it is the highest point in Karnataka at nineteen hundred and thirty metres.',
    'It is quieter and cheaper than Coorg with much the same landscape, and the trekking is better.'
  ],
  see: [
    { n: 'Mullayanagiri',
      d: 'Drive most of the way and climb the last five hundred steps. Grassland ridges and a small temple at the summit.' },
    { n: 'Baba Budangiri',
      d: 'The shrine in a cave on the ridge, and the Manikyadhara falls below it.' },
    { n: 'Kudremukh',
      d: 'A horse-faced peak and a national park two hours west, with one of the best grassland treks in the Ghats. Permits required.' },
    { n: 'Coffee estate stays',
      d: 'Working plantations with bungalows, cheaper than Coorg’s.' },
    { n: 'Hebbe and Kalhatti falls',
      d: 'Both reached through estates, best after the monsoon.' }
  ],
  when: 'September to February. The monsoon is heavy but the hills are at their best in September.',
  stay: 'Three nights.',
  move: 'Four to five hours from Bengaluru, three from Mangalore. A car is necessary for the hills.',
  eat: 'Estate kitchens, Malnad cuisine — akki roti, kadubu, pork curry — and a great deal of coffee.'
},

'KAR-murudeshwar': {
  intro: [
    'Murudeshwar is a temple town on a headland on the Karnataka coast, and it has two features of sheer scale: a forty-nine metre Shiva statue, among the tallest in the world, and a twenty-storey gopuram with a lift in it.',
    'Both were built in the 2000s by a local businessman and are unapologetically modern. The setting — a rocky point with the Arabian Sea on three sides — is genuinely beautiful and the temple at the tip is older than the additions around it.',
    'Netrani island, twenty kilometres offshore, is the best scuba diving in Karnataka and among the better sites in India.'
  ],
  see: [
    { n: 'The Shiva statue',
      d: 'Visible from kilometres away, with the sea behind it. Oddly impressive despite everything.' },
    { n: 'The gopuram lift',
      d: 'Twenty storeys to a viewing level over the headland and the coast.' },
    { n: 'Netrani Island diving',
      d: 'A heart-shaped island with coral, butterflyfish and occasional whale shark. Operators run day trips from Murudeshwar.' },
    { n: 'The temple at the point',
      d: 'The original shrine, one of the atmalinga sites associated with Gokarna.' },
    { n: 'Apsarakonda and Honnavar',
      d: 'A fall and an estuary a short drive north.' }
  ],
  when: 'November to February for diving and dry weather.',
  stay: 'One or two nights.',
  move: 'Murudeshwar has a station on the Konkan line. Three hours from Goa.',
  eat: 'Coastal Karnataka fish — anjal fry, neer dosa, and good prawn curry.'
},

'KAR-udupi': {
  intro: [
    'Udupi is where the Udupi restaurant came from, and that matters more than it sounds — the vegetarian canteen cuisine that spread across India in the twentieth century, with its dosas and idlis and sambar, was institutionalised in the kitchens of the temple mathas here.',
    'The Krishna temple was founded by Madhvacharya in the thirteenth century, and the deity is viewed through a window with nine openings rather than directly, a practice unique to this temple.',
    'It is also the base for Malpe beach, St Mary’s Island with its hexagonal basalt columns, and the Yakshagana theatre tradition.'
  ],
  see: [
    { n: 'Krishna Temple and the Kanakana Kindi',
      d: 'Darshan through the nine-holed window. The temple kitchen feeds thousands daily and visitors can eat.' },
    { n: 'St Mary’s Island',
      d: 'Boats from Malpe to columnar basalt formations on a small island — a national geological monument.' },
    { n: 'Malpe beach',
      d: 'Long, clean and well managed, with a fishing harbour alongside.' },
    { n: 'Yakshagana',
      d: 'All-night folk opera with elaborate costume and makeup. Performances in the dry season; ask at the temple.' },
    { n: 'Barkur and Kollur',
      d: 'An old Jain and Hindu temple town, and the Mookambika temple in the Ghats.' }
  ],
  when: 'October to February. Paryaya, the biennial change of temple administration in January, is a major event.',
  stay: 'Two nights.',
  move: 'Udupi has a station; Mangalore airport is an hour.',
  eat: 'The reason to come. Mitra Samaj for goli baje, Diana for gadbad ice cream, Woodlands for a thali, and the temple’s own meal.'
},

'KAR-shravanabelagola': {
  intro: [
    'The statue of Gommateshwara on Vindhyagiri hill is seventeen and a half metres of a single block of granite, carved around 983 AD, and it is the largest monolithic statue in the world. It depicts Bahubali, a Jain figure who stood in meditation so long that vines grew up his legs — which are carved on it.',
    'You climb six hundred and fourteen steps barefoot to reach it. The granite gets extremely hot; go early.',
    'Every twelve years the Mahamastakabhisheka is performed, in which the statue is anointed from scaffolding with milk, saffron, sandalwood and gold dust while hundreds of thousands watch. The last was in 2018.'
  ],
  see: [
    { n: 'Gommateshwara',
      d: 'The statue itself, and the carved vines and anthills at the feet. Walk round it.' },
    { n: 'The climb',
      d: 'Six hundred and fourteen rock-cut steps. Palanquins available. Socks are worth bringing.' },
    { n: 'Chandragiri hill',
      d: 'The smaller hill opposite, with fourteen basadis and the cave where Chandragupta Maurya is said to have fasted to death as a Jain monk.' },
    { n: 'Bhandari Basti',
      d: 'In the town below, a temple with twenty-four tirthankaras in a row.' },
    { n: 'Belur and Halebidu',
      d: 'Ninety minutes away, and usually combined.' }
  ],
  when: 'October to February. Early morning, before the stone heats.',
  stay: 'Half a day.',
  move: 'Fifty kilometres from Hassan, a hundred and forty from Bengaluru. Leather must be left at the base.',
  eat: 'Simple Jain vegetarian in the town.'
},

'KAR-bijapur': {
  intro: [
    'Vijayapura, long called Bijapur, was the capital of the Adil Shahi sultans, and the Gol Gumbaz there has the second-largest masonry dome in the world — thirty-eight metres across, unsupported by pillars, over a single square chamber.',
    'The whispering gallery under the dome carries a voice clearly right round the circumference, and a clap returns seven echoes, which makes it one of the noisiest quiet buildings anywhere.',
    'The Ibrahim Rauza nearby is the better building: a tomb and mosque facing each other across a plinth, with carved stone jalis and a finesse the Gol Gumbaz does not attempt. It is said to have influenced the Taj.'
  ],
  see: [
    { n: 'Gol Gumbaz',
      d: 'Climb the stair to the whispering gallery and wait for a quiet moment, which will not come. Still extraordinary.' },
    { n: 'Ibrahim Rauza',
      d: 'Finer work than the Gol Gumbaz and almost always empty. The carved ceilings are the thing.' },
    { n: 'Jama Masjid',
      d: 'Begun 1565, with a courtyard marked out in two thousand two hundred and fifty prayer spaces, never finished.' },
    { n: 'Malik-e-Maidan',
      d: 'A fifty-five-tonne bronze cannon on a bastion, among the largest medieval guns in the world.' },
    { n: 'Bara Kaman',
      d: 'An unfinished tomb of twelve arches, abandoned at one storey, open to the sky and more affecting than the completed ones.' }
  ],
  when: 'October to February. The summers here are extremely hot.',
  stay: 'One or two nights.',
  move: 'Railway station on the Solapur line; four hours from Hubli. Autos in town.',
  eat: 'North Karnataka food — jolada rotti, jhunka, and good mutton.'
},

'KAR-dandeli': {
  intro: [
    'Dandeli is on the Kali river in the Uttara Kannada forests, and it is the adventure-sports and birding destination of coastal Karnataka — white-water rafting, kayaking and some of the best hornbill viewing in India.',
    'The forest is moist deciduous and evergreen, holding black panther, tiger, elephant and the great hornbill, and the Dandeli-Anshi complex is now a tiger reserve. Sightings of large mammals are rare; the birds are the point.',
    'Four species of hornbill occur here, which is unusual, and the Ghat endemics are reliable.'
  ],
  see: [
    { n: 'Rafting the Kali',
      d: 'Grade two and three rapids, run from June to January depending on dam release.' },
    { n: 'Hornbill watching',
      d: 'Great, Malabar pied, Malabar grey and Indian grey hornbill all occur. Early mornings at fruiting trees.' },
    { n: 'Coracle rides and crocodile',
      d: 'Round basket boats on the Kali, with marsh crocodile and otter.' },
    { n: 'Syntheri Rocks',
      d: 'A granite monolith in the forest with the Kaneri river running past it.' },
    { n: 'Kavala Caves',
      d: 'Limestone caves with a Shiva lingam, reached through forest and a long descent.' }
  ],
  when: 'October to March for birding; June to September for high-water rafting.',
  stay: 'Two or three nights.',
  move: 'Alnavar and Dharwad are the railheads; Hubli airport is two hours. Goa is four hours.',
  eat: 'Resort kitchens; the river camps feed well.'
},

/* ===================== KERALA ===================== */
'KER-thekkady': {
  intro: [
    'Periyar is built around a reservoir created in 1895 by damming the Periyar river, which flooded a valley of forest — and the dead trees still standing in the water are what makes the place look the way it does.',
    'It is a tiger reserve, but the reliable sightings are elephant, gaur, sambar and the Nilgiri langur, seen from a boat on the lake. The forest around is some of the best-protected in the Western Ghats.',
    'The reserve pioneered a scheme employing former poachers as guides, and the walking programmes it runs — border hikes, bamboo rafting, night patrols — are the best way to see it and were designed partly to give those men work.'
  ],
  see: [
    { n: 'The lake boat ride',
      d: 'Forest department boats, two hours, with elephant and gaur on the shoreline. The first boat of the day is the one to take; book at the gate early.' },
    { n: 'Bamboo rafting',
      d: 'A full-day programme: trek in, raft across the lake, trek out, with a guide who was once a poacher. The best thing on offer here.' },
    { n: 'Border hiking and nature walks',
      d: 'Several guided options of varying length, booked at the ecotourism centre.' },
    { n: 'The spice plantations',
      d: 'Cardamom, pepper, clove and vanilla around Kumily, with tours and shops.' },
    { n: 'Kalaripayattu and Kathakali',
      d: 'Evening performances in Kumily — the martial art and the dance-drama, both short tourist versions but well done.' }
  ],
  when: 'October to March; September to November after the rains is greenest. Avoid the monsoon for boats.',
  stay: 'Two or three nights.',
  move: 'Kumily is the town, four hours from Kochi and Madurai. Autos locally.',
  eat: 'Kerala and Tamil food in Kumily; the hotels do good Syrian Christian dishes.'
},

'KER-varkala': {
  intro: [
    'Varkala has the only cliffs on the Kerala coast — red laterite dropping some thirty metres straight to the beach — and a row of cafés and shacks along the top of them. Mineral springs run out of the cliff face onto the sand.',
    'Papanasam beach below is a place where Hindus immerse ashes, so you will be swimming beside funeral rites, which takes some getting used to and is part of what makes the place unusual.',
    'The Janardanaswamy temple above the beach is two thousand years old by tradition, and the Sivagiri Mutt nearby is the samadhi of Sree Narayana Guru, the social reformer who did more than anyone to break caste in Kerala.'
  ],
  see: [
    { n: 'The cliff walk at sunset',
      d: 'From Helipad to the north cliff, with the sea on one side and the cafés on the other.' },
    { n: 'Papanasam beach',
      d: 'Swimming, and the ash immersions at the southern end. Be respectful and keep your distance from ceremonies.' },
    { n: 'Janardanaswamy Temple',
      d: 'Above the beach, with a bell from a seventeenth-century Dutch ship. Non-Hindus may not enter the inner areas.' },
    { n: 'Kappil backwater',
      d: 'Ten kilometres north, where a lagoon runs parallel to the sea behind a sandbar. Hire a canoe.' },
    { n: 'Anjengo and Sivagiri',
      d: 'A Dutch-era fort and lighthouse, and the ashram and samadhi of Narayana Guru.' }
  ],
  when: 'October to March. The monsoon brings Ayurveda season, which some people prefer.',
  stay: 'Four nights.',
  move: 'Varkala Sivagiri station is three kilometres from the cliff; Trivandrum airport is an hour.',
  eat: 'Cliff cafés with a daily fish display, and better Kerala food in the town below.'
},

'KER-wayanad': {
  intro: [
    'Wayanad is a plateau in the Western Ghats at around nine hundred metres, with coffee, pepper, cardamom and tea, and the largest Adivasi population in Kerala — Paniya, Kurichiya, Kuruma and others.',
    'It is also where the oldest evidence of human settlement in the state is, in the petroglyphs at Edakkal — carvings in a cleft between two rocks dating back some six thousand years, with figures and symbols including what may be an undeciphered script.',
    'The forest here connects to Bandipur, Nagarhole and Mudumalai, making it part of the largest elephant habitat in Asia, and human-elephant conflict is a serious local issue.'
  ],
  see: [
    { n: 'Edakkal Caves',
      d: 'A climb of about a kilometre to a fissure with neolithic petroglyphs on the walls. Go early; the queue builds.' },
    { n: 'Chembra Peak',
      d: 'The highest point in Wayanad, with a heart-shaped lake partway up. Permit and guide required; often closed in dry season for fire risk.' },
    { n: 'Thirunelli and Pakshipathalam',
      d: 'An ancient temple in the Brahmagiri hills, and a boulder cave trek above it with permits.' },
    { n: 'Muthanga and Tholpetty',
      d: 'The two sanctuary gates, with jeep safaris for elephant, gaur and the occasional tiger.' },
    { n: 'Jain temples at Sultan Bathery',
      d: 'A thirteenth-century Jain temple used as an ammunition store by Tipu Sultan, which is where the name comes from.' },
    { n: 'Soochipara and Meenmutty falls',
      d: 'Both best after the monsoon; Meenmutty needs a two-kilometre walk.' }
  ],
  when: 'October to May. The monsoon is heavy; landslides have been serious here in recent years.',
  stay: 'Three nights.',
  move: 'Kalpetta is the main town, three hours from Kozhikode and six from Kochi. A car is useful.',
  eat: 'Malabar food — biryani, pathiri, fish curry — and plantation homestay cooking.'
},

'KER-kumarakom': {
  intro: [
    'Kumarakom is a cluster of islands on the eastern shore of Vembanad, the largest lake in Kerala, and it is the more upmarket of the two backwater bases — quieter than Alleppey, with resorts rather than a town.',
    'The bird sanctuary here, fourteen acres of mangrove and coconut on what was a rubber plantation, holds nesting darter, egret, heron and cormorant, and migratory Siberian stork and teal in winter.',
    'The land here is below sea level and farmed behind dykes — the kuttanad system, which is the only below-sea-level farming in India and has been recognised as a globally important agricultural heritage system.'
  ],
  see: [
    { n: 'A houseboat on Vembanad',
      d: 'Overnight on the lake, with a cook. Quieter waters than Alleppey’s canals. Insist on a solar or electric boat if you can.' },
    { n: 'The bird sanctuary',
      d: 'At dawn, by canoe through the mangrove channels. Guides at the gate.' },
    { n: 'A country canoe through the canals',
      d: 'Smaller and better than the houseboat for seeing village life — toddy tapping, coir making, fishing with Chinese nets.' },
    { n: 'The Kuttanad paddy fields',
      d: 'Below-sea-level farming behind bunds, best seen by cycling the dyke roads.' },
    { n: 'Pathiramanal',
      d: 'An island in the middle of the lake, reached by boat, with good birding and nobody on it.' }
  ],
  when: 'October to March. The Nehru Trophy boat race is in August on Punnamada lake nearby.',
  stay: 'Two nights.',
  move: 'Kottayam is the railhead, fifteen kilometres; Kochi airport is two hours.',
  eat: 'Karimeen pollichathu — pearl spot fish grilled in banana leaf — duck roast, and toddy-shop food, which is the best in Kerala.'
},

'KER-kovalam': {
  intro: [
    'Kovalam was the first beach resort in Kerala, discovered by travellers in the 1970s, and it is now thoroughly developed — three crescent beaches with a lighthouse on the headland and a dense wall of hotels behind.',
    'It has been somewhat overtaken by Varkala in traveller affection, and the water here is rougher with a real undertow in places. Lifeguards fly flags; pay attention to them.',
    'What it has is proximity to Trivandrum, good Ayurveda centres, and the Padmanabhapuram Palace an hour away, which is the best wooden palace in India.'
  ],
  see: [
    { n: 'Lighthouse Beach',
      d: 'The main crescent, with the red-and-white lighthouse you can climb at the southern end.' },
    { n: 'Padmanabhapuram Palace',
      d: 'Across the border in Tamil Nadu, an hour away. Teak, rosewood, polished black floors made of egg white and burnt coconut, and murals. Closed Mondays. Outstanding.' },
    { n: 'Vizhinjam',
      d: 'A fishing harbour and rock-cut cave temple a short walk south, with a working beach rather than a resort one.' },
    { n: 'Ayurveda',
      d: 'Several serious centres among many less serious ones. Look for a government classification and a doctor on site.' },
    { n: 'Trivandrum',
      d: 'Twenty minutes away for the Padmanabhaswamy temple and the Napier Museum.' }
  ],
  when: 'October to March. The monsoon from June is the traditional Ayurveda season.',
  stay: 'Three nights.',
  move: 'Twenty minutes from Trivandrum airport. Autos locally.',
  eat: 'Beach restaurants with a fish display; German Bakery for breakfast; and far better Kerala food in Trivandrum.'
},

'KER-thrissur': {
  intro: [
    'Thrissur is the cultural capital of Kerala, built around a hill with the Vadakkunnathan temple on it and a ring road called the Swaraj Round, and it holds the state’s great festival.',
    'Thrissur Pooram, in April or May, involves two groups of fifteen caparisoned elephants facing each other across the temple ground, with a competitive display of parasols changed in sequence above them, and a percussion ensemble of two hundred and fifty players performing the panchavadyam and the melam for hours. It ends with fireworks before dawn.',
    'It is also the home of Kerala Kalamandalam nearby, where Kathakali, Mohiniyattam and Koodiyattam are taught in the traditional gurukula form.'
  ],
  see: [
    { n: 'Thrissur Pooram', t: 'April or May',
      d: 'The single greatest temple festival in India. Arrive days ahead for accommodation and expect to stay up all night.' },
    { n: 'Vadakkunnathan Temple',
      d: 'One of the oldest in Kerala, in classical Kerala style with murals inside. Hindus only in the inner areas; the grounds are open.' },
    { n: 'Kerala Kalamandalam, Cheruthuruthy',
      d: 'Thirty kilometres away. Morning visits let you watch students training in Kathakali and Koodiyattam. Book ahead.' },
    { n: 'Guruvayur',
      d: 'Thirty kilometres, one of the most important Krishna temples in India, with an elephant sanctuary at Punnathurkotta nearby.' },
    { n: 'Kerala Sahitya Akademi and the museums',
      d: 'On the Round, with a good archaeology and art collection.' }
  ],
  when: 'October to March for weather; April or May for Pooram.',
  stay: 'Two nights.',
  move: 'Major railhead on the Kochi–Palakkad line; Kochi airport is ninety minutes.',
  eat: 'Thrissur is a serious food town — Pathan’s for biryani, Hotel Bharath for a sadya-style meal, and the best halwa in Kerala.'
},

'KER-athirappilly': {
  intro: [
    'Athirappilly is twenty-four metres of the Chalakudy river falling across a wide rock shelf at the edge of the Sholayar forest, and it is the most photographed waterfall in Kerala — it appears in a great many films, including the opening of Bahubali.',
    'Vazhachal, five kilometres upstream, is a series of rapids rather than a fall and is quieter. The forest between them is the only place in Kerala where all four South Indian hornbill species breed.',
    'A proposed hydroelectric project here has been fought for three decades by environmentalists and the Kadar Adivasi community, and remains unbuilt.'
  ],
  see: [
    { n: 'The upper viewpoint',
      d: 'Directly above the lip, with the river spreading out across the rock.' },
    { n: 'The path to the base',
      d: 'A steep walk of about fifteen minutes down to the plunge pool. Swimming is prohibited and people drown here anyway — stay behind the barriers.' },
    { n: 'Vazhachal',
      d: 'Rapids five kilometres up, with the forest closer and far fewer people.' },
    { n: 'Hornbill watching',
      d: 'The Vazhachal forest division holds great, Malabar pied, Malabar grey and Indian grey hornbill. Early mornings.' },
    { n: 'Charpa falls',
      d: 'A roadside fall between the two, spectacular in the monsoon.' }
  ],
  when: 'June to October for volume; October to February for comfortable access. The falls are reduced by March.',
  stay: 'Half a day from Kochi, or a night nearby.',
  move: 'Seventy kilometres from Kochi, two hours. Chalakudy is the railhead, thirty kilometres.',
  eat: 'Stalls at the car park and a few restaurants on the approach road.'
},

'KER-bekal': {
  intro: [
    'Bekal Fort is a forty-acre laterite fort on a headland in north Kerala, built in the 1650s by the Keladi Nayakas, and it is the largest and best-preserved fort in the state. The sea comes up to the walls on three sides.',
    'There are no palaces or barracks inside — it was purely a military structure — which gives it an unusual austerity: a bastion, an observation tower, and openings cut at three heights for cannon, muskets and arrows.',
    'The beach alongside is almost empty, and the Valiyaparamba backwater nearby is the quietest in Kerala, with houseboats and nobody on them.'
  ],
  see: [
    { n: 'The fort at sunset',
      d: 'Walk the ramparts and the observation tower. The sea on three sides and very few people.' },
    { n: 'Bekal and Kappil beaches',
      d: 'Long, clean and undeveloped by Kerala standards.' },
    { n: 'Valiyaparamba backwaters',
      d: 'A network fed by four rivers, with houseboats and canoes and almost no traffic.' },
    { n: 'Theyyam', t: 'December to April',
      d: 'North Malabar ritual possession performances in village shrines — the most extraordinary performance tradition in India. Ask locally for dates.' },
    { n: 'Ananthapura Lake Temple',
      d: 'A temple in the middle of a lake with a resident crocodile said to be vegetarian.' }
  ],
  when: 'October to March. Theyyam season runs roughly December to April.',
  stay: 'Three nights.',
  move: 'Kanhangad and Kasaragod are the railheads; Mangalore airport is two hours.',
  eat: 'North Malabar food — thalassery biryani, fish in coconut, and kalummakkaya mussels.'
},

'KER-kozhikode': {
  intro: [
    'Vasco da Gama landed at Kappad near Kozhikode in 1498, which is the beginning of European involvement in India, and the city had been the capital of the Zamorins and the greatest pepper port on the Malabar coast for centuries before that.',
    'It is now a relaxed city with a long beach, an old spice market at Valiyangadi where pepper and ginger are still traded in sacks, and the best Muslim cooking in Kerala.',
    'Kozhikode is where Malabar biryani, the banana-flour halwa called Kozhikode halwa, and a great deal else came from, and the city was named a UNESCO City of Literature in 2023.'
  ],
  see: [
    { n: 'Valiyangadi spice market',
      d: 'Behind the beach, with warehouses and brokers. Go in the morning.' },
    { n: 'Kozhikode beach at dusk',
      d: 'Two piers, a lighthouse, and the whole city out walking and eating.' },
    { n: 'Kappad',
      d: 'Sixteen kilometres north, with a stone marking da Gama’s landing and a quiet beach.' },
    { n: 'Mishkal Mosque and Thali Temple',
      d: 'A fourteenth-century four-storey timber mosque in Kuttichira, and the Zamorins’ temple, both in the old town.' },
    { n: 'Sweet Meat Street',
      d: 'Mithai Theruvu, where the halwa shops are, and the origin of the city’s nickname.' }
  ],
  when: 'October to March.',
  stay: 'Two nights.',
  move: 'Airport at Karipur, major railhead. Autos within the city.',
  eat: 'Paragon and Rahmath for biryani, Topform for Malabar snacks, and the banana halwa. The best eating city in Kerala.'
},

'KER-silent-valley': {
  intro: [
    'Silent Valley is a tract of undisturbed tropical evergreen forest in the Nilgiris, and the reason it still exists is one of the founding campaigns of Indian environmentalism — a hydroelectric dam approved in the 1970s would have flooded it, and the project was abandoned in 1983 after a sustained public fight.',
    'It is called silent because cicadas are relatively scarce, which is unusual, and the forest is correspondingly quiet. It holds the largest population of lion-tailed macaque anywhere, along with Nilgiri tahr, Malabar giant squirrel and over a thousand flowering plant species.',
    'Access is tightly limited: a bus from Mukkali to a watchtower at Sairandhri, with permits, and guided treks on a few routes. There is no accommodation inside.'
  ],
  see: [
    { n: 'The Sairandhri watchtower',
      d: 'Twenty-three kilometres in by forest bus from Mukkali, then a short walk to a tower over the Kunthipuzha valley. Permits from the forest office.' },
    { n: 'Lion-tailed macaque',
      d: 'Endemic to the Western Ghats and endangered; this is the best place in the world to see them.' },
    { n: 'Guided treks',
      d: 'Several routes of varying length, booked through the forest department at Mukkali. Numbers are capped.' },
    { n: 'The Kunthipuzha river',
      d: 'Runs the length of the valley and is exceptionally clean.' },
    { n: 'Attappadi',
      d: 'The Adivasi region on the approach, with Irula and Muduga settlements.' }
  ],
  when: 'December to April. Closed during the monsoon and for parts of the breeding season.',
  stay: 'A full day from Palakkad or Mannarkkad, with a night at Mukkali.',
  move: 'Mukkali is the entry point, eighty kilometres from Palakkad. Permits must be arranged at the forest office — go in person the day before.',
  eat: 'Basic places at Mukkali. Carry food and water.'
},

'KER-vagamon': {
  intro: [
    'Vagamon is a set of grassy hills at about eleven hundred metres in Idukki district — bald green domes rather than forest, with pine plantations in the folds and sheer drops at the edges.',
    'It is a quiet place with little infrastructure, and the appeal is walking on open grassland with cloud blowing through, which is not a common landscape in Kerala.',
    'It has become a paragliding site, and there is a Kurisumala monastery of Cistercian monks who keep a dairy herd and observe silence.'
  ],
  see: [
    { n: 'The meadows',
      d: 'Walk out across the grass domes. Best in the early morning before the mist lifts or after it rolls in.' },
    { n: 'Pine Forest',
      d: 'A planted pine stand that looks nothing like Kerala, and is used by every film crew in the state.' },
    { n: 'Kurisumala Ashram',
      d: 'A Cistercian monastery on the hill, with a dairy and a silence that visitors are asked to keep.' },
    { n: 'Paragliding',
      d: 'Tandem flights from the hills in season; operators in the village.' },
    { n: 'Thangal Para and Mundakayam ghat',
      d: 'A Muslim shrine on an enormous rock, and a winding road with views.' }
  ],
  when: 'September to March. The monsoon is spectacular and extremely wet.',
  stay: 'Two nights.',
  move: 'Four hours from Kochi, two from Kottayam. A car or bike is necessary.',
  eat: 'Homestay cooking and a few small places. Nothing elaborate.'
},

'KER-trivandrum': {
  intro: [
    'Thiruvananthapuram is the state capital and the seat of the Travancore royal family, and the Padmanabhaswamy temple at its centre became internationally known in 2011 when its vaults were inventoried under court order and found to contain gold and gems valued in the tens of billions of dollars. One vault remains unopened.',
    'The temple is in Kerala-Dravidian style with a seven-storey gopuram, and the reclining Vishnu inside is viewed through three doors on three levels — you cannot see the whole figure at once. Dress code is strict: dhoti for men, sari or set-mundu for women, available for rent at the gate.',
    'Beyond the temple the city has a good museum complex in a park, the Napier Museum building being one of the best pieces of nineteenth-century architecture in India.'
  ],
  see: [
    { n: 'Padmanabhaswamy Temple',
      d: 'Hindus only inside. Strict dress code; no electronics. The gopuram and the tank are open to all.' },
    { n: 'Napier Museum and the park',
      d: 'An 1880 Indo-Saracenic building with a naturally ventilated interior, holding bronzes and ivories. Closed Mondays and Wednesday mornings.' },
    { n: 'Kuthiramalika Palace',
      d: 'The horse palace, built by a maharaja who was also a composer, with carved wooden horses under the eaves.' },
    { n: 'Sree Chitra Art Gallery',
      d: 'Ravi Varma paintings, Tanjore work and a good Rajput and Mughal collection.' },
    { n: 'Poovar and Vellayani',
      d: 'An estuary where a lagoon meets the sea, and a freshwater lake, both within an hour.' }
  ],
  when: 'October to March. The Attukal Pongala in February or March brings millions of women to cook in the streets.',
  stay: 'Two nights.',
  move: 'International airport, major railhead. Autos and buses.',
  eat: 'Kerala sadya on a banana leaf, Ariya Nivaas for vegetarian, and Villa Maya for something more elaborate.'
},

'KER-ponmudi': {
  intro: [
    'Ponmudi is a small hill station at about nine hundred metres an hour and a half from Trivandrum, reached by a road with twenty-two hairpin bends through tea and rubber.',
    'It is a modest place — a government guest house, a few meadows, and a view over the Agasthyakoodam range — and it is mostly visited by people from Trivandrum on a Sunday.',
    'Agasthyakoodam itself, at just under nineteen hundred metres, is a serious trek with a permit lottery and a limited season, and is one of the richest medicinal plant sites in India.'
  ],
  see: [
    { n: 'The meadows and viewpoint',
      d: 'Walk up through the grass to the top. Cloud comes and goes; early morning is clearest.' },
    { n: 'The hairpin road',
      d: 'Twenty-two bends through tea estate and forest, which is half the trip.' },
    { n: 'Golden Valley',
      d: 'A river with rock pools at the foot of the hill, good for a swim.' },
    { n: 'Agasthyakoodam trek', t: 'January to March, permit lottery',
      d: 'Two days up and back, limited numbers, applications open in December. Women were permitted only after a 2018 court ruling.' },
    { n: 'Kallar',
      d: 'A stream with smooth boulders on the way up, popular with local families.' }
  ],
  when: 'September to March. The road can close in heavy rain.',
  stay: 'A night, or a day trip from Trivandrum.',
  move: 'Fifty-five kilometres from Trivandrum, under two hours. Buses and taxis.',
  eat: 'The government guest house canteen and a couple of stalls. Carry food.'
},

'KER-kollam': {
  intro: [
    'Kollam was one of the great ports of the Malabar coast — Ibn Battuta and Marco Polo both wrote about it, and Chinese fleets traded here — and it sits on the Ashtamudi lake, the southern end of the backwater system.',
    'It is the start of the long public boat to Alleppey, eight hours through canals and lagoons for a fraction of the price of a houseboat, which is one of the best-value journeys in India.',
    'The town itself is a working port with a cashew-processing industry and very little tourism, which is part of its appeal.'
  ],
  see: [
    { n: 'The public ferry to Alleppey',
      d: 'Eight hours through the backwaters, departing mid-morning. Slow, cheap and far more interesting than a houseboat.' },
    { n: 'Ashtamudi lake',
      d: 'Eight-armed, with canoe trips through the smaller channels and Chinese fishing nets at the mouth.' },
    { n: 'Thangassery',
      d: 'A Portuguese and Dutch quarter with a ruined fort, a lighthouse you can climb, and old churches.' },
    { n: 'Munroe Island',
      d: 'A cluster of islets in the lake, best explored by canoe through narrow channels. Coir making and prawn farming.' },
    { n: 'Jatayu Earth’s Center',
      d: 'An enormous sculpture of a fallen bird on a hill at Chadayamangalam, with a cable car. Strange and popular.' }
  ],
  when: 'October to March.',
  stay: 'One or two nights.',
  move: 'Major railhead on the Trivandrum line, ninety minutes from the airport.',
  eat: 'Lake fish, karimeen, and the toddy shops around Ashtamudi.'
},

/* ===================== TAMIL NADU ===================== */
'TND-mahabalipuram': {
  intro: [
    'Mamallapuram was the port of the Pallavas, and in the seventh and eighth centuries their sculptors cut temples out of the granite outcrops along the shore — not built, cut, from the top down, out of single boulders.',
    'The five rathas are each a different temple form carved from one rock, apparently as architectural models. Arjuna’s Penance is a thirty-metre bas-relief on an open rock face, including a family of elephants that is among the finest animal sculpture anywhere. The Shore Temple, by contrast, is built, and was a prototype for everything that followed in South India.',
    'The 2004 tsunami scoured sand off the beach and briefly exposed further structures, which supported the long-standing local account of six more temples under the sea.'
  ],
  see: [
    { n: 'Arjuna’s Penance',
      d: 'The great bas-relief, with the descent of the Ganges and the elephant family. Take twenty minutes over it.' },
    { n: 'The Five Rathas',
      d: 'Monolithic temples in five different styles, with a carved elephant, lion and bull among them.' },
    { n: 'The Shore Temple',
      d: 'Built rather than carved, at the water’s edge, best at sunrise.' },
    { n: 'Krishna’s Butterball',
      d: 'A two-hundred-and-fifty-tonne boulder balanced on a slope, which the British tried and failed to move.' },
    { n: 'The Mahishasuramardini cave',
      d: 'A rock-cut shrine with a panel of Durga killing the buffalo demon and a reclining Vishnu opposite.' },
    { n: 'The stone carvers’ workshops',
      d: 'Still working, in the lanes behind the bus stand, with the same chisels.' }
  ],
  when: 'November to February. The dance festival runs in December and January. Early morning for the Shore Temple.',
  stay: 'Two nights.',
  move: 'Two hours from Chennai down the coast road. Walked or cycled once there.',
  eat: 'Seafood shacks on the beach road, and good Tamil vegetarian in the town.'
},

'TND-thanjavur': {
  intro: [
    'The Brihadeeswarar temple at Thanjavur was completed in 1010 by Rajaraja Chola I, and it is the high point of Chola architecture — a sixty-six metre vimana built entirely of granite in a region with no granite quarry nearby, topped by a capstone weighing some eighty tonnes.',
    'Nobody is certain how the capstone was raised. The temple also carries inscriptions recording in detail the endowments, the dancers, the musicians and the accounting of a working eleventh-century institution, which makes it one of the richest documentary sources for medieval South India.',
    'It is one of three Great Living Chola Temples inscribed by UNESCO, with Gangaikondacholapuram and Darasuram nearby. All three are still in worship.'
  ],
  see: [
    { n: 'The vimana',
      d: 'Walk the full circuit of the courtyard. The tower tapers in thirteen storeys and the proportion is the whole point.' },
    { n: 'The Nandi',
      d: 'A monolithic bull, twenty tonnes, facing the sanctum from its own pavilion.' },
    { n: 'The inscriptions and frescoes',
      d: 'Chola-era paintings in the circumambulatory passage, found under later Nayaka layers.' },
    { n: 'Thanjavur Palace and the Saraswathi Mahal Library',
      d: 'A Maratha-era palace with a bell tower, and one of the oldest libraries in Asia with palm-leaf manuscripts.' },
    { n: 'Darasuram and Gangaikondacholapuram',
      d: 'The other two Chola World Heritage temples, both within an hour and both nearly empty.' }
  ],
  when: 'November to February. Mornings; the granite courtyard is punishing by eleven.',
  stay: 'Two nights.',
  move: 'Railhead on the Trichy line; Trichy airport is ninety minutes.',
  eat: 'Tamil vegetarian meals on banana leaf, and the local Thanjavur-style sambar.'
},

'TND-ooty': {
  intro: [
    'Ooty — Udhagamandalam — was the summer capital of the Madras Presidency, at twenty-two hundred metres in the Nilgiris, and it is the most developed and most visited hill station in South India. In season the traffic is severe.',
    'The reason to come anyway is the Nilgiri Mountain Railway, a metre-gauge rack-and-pinion line from Mettupalayam that climbs sixteen hundred metres in forty-six kilometres using a system found almost nowhere else, and which is a World Heritage site.',
    'The surrounding hills hold the Toda, an indigenous pastoralist community with barrel-vaulted houses and a buffalo-centred religion, and the shola-grassland ecosystem that is unique to these mountains.'
  ],
  see: [
    { n: 'The Nilgiri Mountain Railway',
      d: 'Mettupalayam to Coonoor is the steep rack section and the best part. Book weeks ahead; first class sells out.' },
    { n: 'The Botanical Gardens',
      d: 'An 1848 garden with a twenty-million-year-old fossil tree and a good collection of Nilgiri flora.' },
    { n: 'Doddabetta',
      d: 'The highest peak in the Nilgiris at two thousand six hundred and thirty-seven metres, with a telescope house and a great many visitors.' },
    { n: 'A Toda village',
      d: 'Several near Ooty, with the distinctive half-barrel houses. Go with someone who knows the community.' },
    { n: 'The tea estates and Coonoor',
      d: 'Dolphin’s Nose, Lamb’s Rock and the tea factories, all quieter than Ooty itself.' }
  ],
  when: 'October to June; April and May are peak season and extremely busy. December and January are cold and clear.',
  stay: 'Two or three nights, preferably based in Coonoor.',
  move: 'Toy train from Mettupalayam, or road from Coimbatore, three hours. A permit system now caps vehicles entering the hills in peak season — check before driving.',
  eat: 'Hill-station dining rooms, Nilgiri varkey biscuits, and good Badaga food if you can find it.'
},

'TND-kanyakumari': {
  intro: [
    'Kanyakumari is the southern tip of the Indian mainland, where the Bay of Bengal, the Arabian Sea and the Indian Ocean meet, and it is the only place in India where you can watch the sun rise and set over the sea from the same spot.',
    'Two rocks offshore carry the Vivekananda Rock Memorial — he meditated here in 1892 before going to Chicago — and a forty-metre statue of the Tamil poet Thiruvalluvar, completed in 2000.',
    'The Kumari Amman temple on the shore is dedicated to a virgin goddess waiting for Shiva, and the three seas are said to be visible as three distinct colours at the confluence, which on a good day they more or less are.'
  ],
  see: [
    { n: 'Sunrise and sunset from the viewpoint',
      d: 'Both from the same promenade. On full-moon days in April you can in principle see sunset and moonrise together.' },
    { n: 'Vivekananda Rock Memorial',
      d: 'Ferry from the jetty. Queues are long; go early. The meditation hall is kept dark and silent.' },
    { n: 'Thiruvalluvar Statue',
      d: 'On the adjacent rock, a hundred and thirty-three feet for the hundred and thirty-three chapters of the Tirukkural.' },
    { n: 'Kumari Amman Temple',
      d: 'On the shore. Men must remove their shirts to enter; no cameras.' },
    { n: 'Padmanabhapuram Palace',
      d: 'An hour away in Kerala, and the best wooden palace in India.' }
  ],
  when: 'October to February. Avoid the windy season from June, when the ferry is often suspended.',
  stay: 'One night, for both sunset and sunrise.',
  move: 'Railhead with trains from across India, including the long haul from Jammu. Trivandrum airport is two and a half hours.',
  eat: 'Simple Tamil and Kerala food; good fish near the harbour.'
},

'TND-rameswaram': {
  intro: [
    'Rameswaram is an island joined to the mainland by the Pamban bridge, and it is one of the four Char Dham and one of the twelve jyotirlingas — the only place that is both, which makes it unusually important.',
    'Rama is said to have built the bridge to Lanka from here, and the chain of shoals running towards Sri Lanka is still called Rama’s Bridge. Pilgrims bathe in twenty-two wells inside the Ramanathaswamy temple, each said to have a different water.',
    'The temple has the longest corridor of any in India — over twelve hundred metres of pillared passage, with every pillar carved.'
  ],
  see: [
    { n: 'Ramanathaswamy Temple',
      d: 'The third corridor, which is the thing to walk. The twenty-two theerthams involve being doused with a bucket at each; priests organise it.' },
    { n: 'The Pamban bridge',
      d: 'The old cantilever rail bridge of 1914 and the new vertical-lift bridge beside it. The train crossing is the memorable one.' },
    { n: 'Dhanushkodi',
      d: 'Twenty kilometres on, a town destroyed by a cyclone in 1964 and left as ruins at the end of the sandspit.' },
    { n: 'Agnitheertham',
      d: 'The sea in front of the temple, where pilgrims bathe before entering. Calm and shallow.' },
    { n: 'Abdul Kalam Memorial',
      d: 'The former president was from here, and the memorial is well done.' }
  ],
  when: 'October to March. Very hot and humid from April.',
  stay: 'One or two nights.',
  move: 'Railhead on the island; Madurai is three hours by road.',
  eat: 'Simple vegetarian near the temple; good fish at the harbour end of town.'
},

'TND-chennai': {
  intro: [
    'Madras was the first English settlement in India, founded in 1639 around Fort St George, and the fort is still there with the government working inside it and St Mary’s — the oldest Anglican church east of Suez — in the middle.',
    'The city is the home of Carnatic music and Bharatanatyam, and during the December music season several thousand concerts are held across the city in halls and sabhas, many of them free. It is the largest cultural festival of its kind anywhere.',
    'Marina Beach is the second-longest urban beach in the world, Mylapore holds the Kapaleeshwarar temple and the old city around it, and the food is the best argument for the place.'
  ],
  see: [
    { n: 'The December music season',
      d: 'Mid-December to mid-January. Concerts from morning to night; the canteens at the sabhas are a draw in themselves.' },
    { n: 'Mylapore',
      d: 'The Kapaleeshwarar temple tank, the flower market, and the lanes around it. The oldest part of the city.' },
    { n: 'Fort St George and St Mary’s',
      d: 'The 1680 church where Clive and Elihu Yale married, and a museum of the Madras Presidency.' },
    { n: 'Government Museum, Egmore',
      d: 'The bronze gallery holds the finest collection of Chola bronzes in the world. Unmissable.' },
    { n: 'San Thome and Santhome Basilica',
      d: 'Built over what is claimed as the tomb of the apostle Thomas — one of only three churches anywhere built over an apostle’s grave.' },
    { n: 'Dakshinachitra',
      d: 'On the way to Mamallapuram, a heritage village of relocated South Indian houses. Excellent.' }
  ],
  when: 'November to February. December for the music season. April to June is extremely hot and humid.',
  stay: 'Three nights.',
  move: 'International airport, two major stations, a metro that works well. Autos require negotiation; app cabs are easier.',
  eat: 'Murugan Idli Shop, Ratna Cafe for sambar, Karaikudi for Chettinad, and filter coffee everywhere. Sunday brunch at a Chettinad mess is the thing.'
},

'TND-kodaikanal': {
  intro: [
    'Kodaikanal was founded by American missionaries in 1845 as a refuge from the plains, and it sits at about two thousand one hundred metres in the Palani hills around a star-shaped artificial lake.',
    'It is greener and quieter than Ooty, with shola forest, cliffs on the southern edge dropping two thousand metres to the plain, and a good deal of walking.',
    'The Kurinji shrub flowers here once every twelve years, turning the hillsides blue — the last mass flowering was in 2018.'
  ],
  see: [
    { n: 'Coaker’s Walk',
      d: 'A kilometre of paved path along the cliff edge with the plains below, and a chance of the Brocken spectre in the right conditions.' },
    { n: 'The lake',
      d: 'Boating or a five-kilometre cycle round it. Hire a bicycle rather than taking a car.' },
    { n: 'Dolphin’s Nose and Vattakanal',
      d: 'A rock platform projecting over the valley, reached through Vattakanal, with a long drop and good views.' },
    { n: 'Pillar Rocks and Guna Cave',
      d: 'Three granite pillars a hundred and twenty metres high, and a cave made famous by a film.' },
    { n: 'Berijam Lake',
      d: 'A reserve forest lake twenty kilometres out, with permits capped daily and far fewer people.' },
    { n: 'Kodaikanal Solar Observatory',
      d: 'Working since 1899, with a small museum open on some afternoons.' }
  ],
  when: 'October to March; April and May are busy but pleasant. The monsoon is misty and wet.',
  stay: 'Three nights.',
  move: 'Kodai Road is the railhead, eighty kilometres below; Madurai airport is three hours.',
  eat: 'Hill-station restaurants, Pastry Corner for bakery, and Kodai cheese and homemade chocolate, which are local industries.'
},

'TND-chettinad': {
  intro: [
    'Chettinad is a region of some seventy-odd villages in Sivaganga and Pudukkottai districts, and it was home to the Nattukottai Chettiars — a banking and trading community who financed much of Burma, Ceylon and Malaya in the nineteenth century and brought the money home.',
    'They built mansions of a particular kind: enormous, inward-facing, around a series of courtyards, with Burmese teak, Italian marble, Belgian glass, Athangudi tiles made locally, and English cast iron. Many have thirty or forty rooms and are now occupied by a caretaker.',
    'The cuisine is the other inheritance — the spiciest and most complex in Tamil Nadu, with a range of ground masalas that reflects the trading routes.'
  ],
  see: [
    { n: 'Kanadukathan',
      d: 'The densest concentration of mansions. Several are open or are now hotels; caretakers will show you others for a tip.' },
    { n: 'Athangudi tile workshops',
      d: 'Handmade cement tiles poured in glass moulds, still produced in the village. Watch a batch being made.' },
    { n: 'Chettinad Palace',
      d: 'The grandest of the houses at Kanadukathan, with a Burma teak hall.' },
    { n: 'Pillaiyarpatti and Thirumayam',
      d: 'A rock-cut Ganesha temple from the seventh century, and a fort with a rock-cut Vishnu.' },
    { n: 'A cooking demonstration',
      d: 'Several heritage hotels run them, and the masala grinding is the interesting part.' }
  ],
  when: 'November to February. The region is flat, dry and hot the rest of the year.',
  stay: 'Two nights in a converted mansion.',
  move: 'Karaikudi is the base, with a station; Trichy and Madurai airports are both two hours. A car is needed between villages.',
  eat: 'The reason half the visitors come. Kozhi chettinad, meen kuzhambu, and the vegetarian kootu that nobody expects to be this good.'
},

'TND-kumbakonam': {
  intro: [
    'Kumbakonam is a temple town in the Kaveri delta with something approaching two hundred temples in and around it, and it is the best base for the Chola heartland — Darasuram, Gangaikondacholapuram, Swamimalai and Thanjavur are all within an hour.',
    'The Mahamaham tank in the centre fills from a dozen wells and draws a mass bathing every twelve years, when several million people come.',
    'Swamimalai nearby is where Chola bronzes are still cast by the lost-wax method in workshops that have done it for generations, and they will let you watch.'
  ],
  see: [
    { n: 'Airavatesvara Temple, Darasuram',
      d: 'Four kilometres out, a World Heritage Chola temple of 1150 with a stone chariot and steps that are said to have produced musical notes. The finest small Chola temple.' },
    { n: 'Gangaikondacholapuram',
      d: 'Thirty-five kilometres, the second great Chola temple, built by Rajendra I, with a superb Nandi and almost no visitors.' },
    { n: 'Sarangapani and Kumbeswarar temples',
      d: 'In town, both large and in active worship, with a tall gopuram and a chariot-shaped sanctum.' },
    { n: 'Swamimalai bronze casting',
      d: 'Workshops using the lost-wax process. Ask and they will show you the clay moulds and the pouring.' },
    { n: 'The Navagraha temples',
      d: 'Nine temples around the town, each to one of the planets, visited in sequence by pilgrims.' }
  ],
  when: 'November to February.',
  stay: 'Two nights as a base for the delta.',
  move: 'Railhead on the Thanjavur–Chidambaram line. Autos and hired cars for the temples.',
  eat: 'Delta Tamil vegetarian, exceptional filter coffee, and the local degree coffee tradition.'
},

'TND-chidambaram': {
  intro: [
    'The Nataraja temple at Chidambaram is the home of Shiva as the cosmic dancer, and it is one of the five elemental temples, representing space. The sanctum contains a Chidambara Rahasyam — the secret of Chidambaram — which is an empty space behind a curtain, representing the formless.',
    'It is also unique in being administered not by the state but by the Dikshitars, a hereditary community of around three hundred families who have run it for centuries and who conduct the rituals themselves.',
    'The eastern gopuram carries all hundred and eight poses of Bharatanatyam carved in stone, which makes the temple the reference text for the form.'
  ],
  see: [
    { n: 'The Chit Sabha',
      d: 'The golden-roofed inner sanctum with the Nataraja bronze. The curtain is drawn aside at specific times in the ritual cycle.' },
    { n: 'The hundred and eight karanas',
      d: 'Carved on the east gopuram passage. A dancer or a knowledgeable guide makes this far more interesting.' },
    { n: 'The thousand-pillared hall',
      d: 'Used during festivals, otherwise quiet.' },
    { n: 'The six daily pujas',
      d: 'Conducted by the Dikshitars with fire and music. The evening one around six is the best attended.' },
    { n: 'Pichavaram',
      d: 'Fifteen kilometres away, the second-largest mangrove forest in India, navigated by rowing boat through tunnels of root.' }
  ],
  when: 'November to February. The Natyanjali dance festival at Mahashivratri is worth timing for.',
  stay: 'One night, with Pichavaram.',
  move: 'Railhead on the Chennai–Trichy line. Autos in town.',
  eat: 'Simple Tamil vegetarian around the temple.'
},

'TND-trichy': {
  intro: [
    'Tiruchirappalli is built around a granite outcrop with a rock fort on it, and the Ucchi Pillayar temple at the top is reached by four hundred and thirty-seven steps cut into the rock.',
    'The real monument is across the Kaveri at Srirangam: the Ranganathaswamy temple, the largest functioning Hindu temple complex in the world, with twenty-one gopurams and seven concentric walled enclosures, the outer three of which contain a living town — shops, houses, streets — inside the temple.',
    'It is also one of the oldest continuously inhabited cities in Tamil Nadu and was a Chola and later Nayak stronghold.'
  ],
  see: [
    { n: 'Ranganathaswamy Temple, Srirangam',
      d: 'Walk in through the enclosures from the outside and watch the town turn into a temple. The main gopuram is seventy-two metres, the tallest in Asia.' },
    { n: 'Rock Fort and Ucchi Pillayar',
      d: 'Four hundred and thirty-seven rock-cut steps to a Ganesha temple and a view over the city and the river.' },
    { n: 'Jambukeswarar Temple, Thiruvanaikaval',
      d: 'One of the five elemental temples, representing water, with a spring that keeps the sanctum permanently wet.' },
    { n: 'The Teppakulam and the bazaar',
      d: 'A large tank and the market streets below the fort.' },
    { n: 'Thanjavur',
      d: 'Ninety minutes away for the Brihadeeswarar temple.' }
  ],
  when: 'November to February. Vaikunta Ekadasi at Srirangam in December or January is enormous.',
  stay: 'Two nights.',
  move: 'International airport with Gulf and Southeast Asia flights, and a major railhead.',
  eat: 'Good Tamil vegetarian, and the city is known for its biryani and for Kadai-style mutton.'
},

'TND-coonoor': {
  intro: [
    'Coonoor is the second of the Nilgiri hill stations, at about eighteen hundred metres, and it is the one to stay in — smaller, quieter and less built over than Ooty twenty kilometres up the hill.',
    'It is surrounded by tea, and the Highfield and other estates run tours and tastings. Nilgiri tea is fragrant and lighter than Assam and is worth understanding on its own terms.',
    'It also sits at the top of the steep rack section of the mountain railway, so the best part of that journey ends here.'
  ],
  see: [
    { n: 'Sim’s Park',
      d: 'An 1874 botanical garden on a slope, with over a thousand species and far fewer people than Ooty’s.' },
    { n: 'Dolphin’s Nose and Lamb’s Rock',
      d: 'Two viewpoints over the Catherine Falls and the plains, ten kilometres out.' },
    { n: 'A tea factory tour',
      d: 'Withering, rolling, oxidation and sorting, with a tasting at the end. Several estates near Coonoor.' },
    { n: 'The rack railway section',
      d: 'Mettupalayam to Coonoor, the steepest part of the Nilgiri line.' },
    { n: 'Kotagiri and Dodabetta',
      d: 'A third, quieter hill town, and the highest peak, both within half an hour.' }
  ],
  when: 'October to June; December and January are cold and clear.',
  stay: 'Three nights, as a base for the Nilgiris.',
  move: 'Toy train or road from Mettupalayam, ninety minutes. Coimbatore airport is two hours.',
  eat: 'Estate bungalow cooking, Nilgiri varkey, and good Badaga food in the villages.'
},

'TND-dhanushkodi': {
  intro: [
    'Dhanushkodi was a town of some thousands at the eastern tip of Rameswaram island, with a railway station, a church, a post office and a pier where ferries left for Ceylon. In December 1964 a cyclone with winds over two hundred kilometres an hour swept the whole spit and killed over eighteen hundred people, including a passenger train.',
    'The government declared it unfit for habitation. The ruins have been left: the church walls, the station platform, the water tank, all standing in sand with the sea on both sides.',
    'A road was finally built to it in 2017. Beyond the ruins the land narrows to a point where the Bay of Bengal meets the Indian Ocean and Sri Lanka is thirty kilometres away.'
  ],
  see: [
    { n: 'The ruins',
      d: 'The church, the station and the post office, in sand. Quiet and genuinely affecting.' },
    { n: 'Arichal Munai',
      d: 'The land’s end point, where the two seas meet with visibly different water on each side.' },
    { n: 'The drive out',
      d: 'A road on a sandspit with water on both sides for the last fifteen kilometres.' },
    { n: 'Rama’s Bridge',
      d: 'The chain of shoals towards Sri Lanka, visible from the point in clear conditions.' }
  ],
  when: 'November to March. Nobody is permitted on the spit after sunset. The wind from June is severe.',
  stay: 'Half a day from Rameswaram.',
  move: 'Twenty kilometres from Rameswaram by road, or by minibus from the town.',
  eat: 'A few fish stalls near the point. Carry water.'
},

'TND-mudumalai': {
  intro: [
    'Mudumalai is the Tamil Nadu side of the Nilgiri Biosphere Reserve, adjoining Bandipur, Nagarhole and Wayanad, and it has the richest wildlife of any Tamil park — elephant, gaur, tiger, leopard, dhole and over two hundred and sixty bird species.',
    'The forest ranges from dry thorn to moist deciduous across a relatively short distance, which is why the species list is so long.',
    'Theppakadu has an elephant camp where working elephants, many of them rescued or rehabilitated, are fed and bathed in public — the subject of the documentary The Elephant Whisperers.'
  ],
  see: [
    { n: 'Forest department bus and jeep safaris',
      d: 'From Theppakadu, morning and afternoon. Private vehicles are not permitted into the core.' },
    { n: 'Theppakadu elephant camp',
      d: 'Feeding and bathing at set times. The mahout families have worked here for generations.' },
    { n: 'Elephant herds',
      d: 'The largest population in the biosphere reserve moves through here; sightings are close to reliable.' },
    { n: 'Birding at Masinagudi',
      d: 'The drier eastern side, with good raptors and the Nilgiri endemics higher up.' },
    { n: 'The Sigur plateau',
      d: 'Between Mudumalai and Ooty, an elephant corridor with lodges that are themselves wildlife viewing.' }
  ],
  when: 'February to May for sightings; September to October is green. Parts close in the dry season for fire risk.',
  stay: 'Two nights.',
  move: 'Theppakadu is on the Mysore–Ooty road. Coimbatore and Mysore are both around three hours.',
  eat: 'Lodge kitchens at Masinagudi and Bokkapuram.'
},

'TND-hogenakkal': {
  intro: [
    'Hogenakkal is where the Kaveri drops through a gorge of carbonatite rock into a series of falls and channels, and the name means smoking rocks in Kannada, for the spray.',
    'The thing to do here is take a coracle — a circular basket boat of bamboo and plastic sheeting, paddled by one man who will spin it for you — through the channels and under the smaller falls.',
    'There are also oil massages administered on the rocks by men with coconut oil, which is a local institution, and a great deal of fried fish.'
  ],
  see: [
    { n: 'A coracle ride',
      d: 'Through the gorge and up to the falls. Negotiate the price and the duration before getting in; agree whether you are going under the fall.' },
    { n: 'The main falls',
      d: 'Best from July to October after the monsoon; by April the flow can be thin.' },
    { n: 'Bathing on the rocks',
      d: 'Pools and channels where locals swim and get oil massages.' },
    { n: 'Mettur Dam',
      d: 'Forty kilometres downstream, which controls the flow here.' }
  ],
  when: 'July to October for water. Avoid immediately after heavy upstream release, when boats are suspended.',
  stay: 'Half a day.',
  move: 'A hundred and eighty kilometres from Bengaluru, three and a half hours; Dharmapuri is forty kilometres.',
  eat: 'Fried Kaveri fish at the stalls, which is the point.'
},

'TND-yercaud': {
  intro: [
    'Yercaud is a small hill station at about fifteen hundred metres in the Shevaroy hills above Salem, with a lake, coffee and orange plantations, and a fraction of the traffic that the Nilgiris get.',
    'It is reached by a road of twenty hairpin bends and has the feel of a hill station that nobody has got round to developing, which is the recommendation.'
  ],
  see: [
    { n: 'The lake and Anna Park',
      d: 'A small lake with boating, and a park with an orchidarium.' },
    { n: 'Pagoda Point and Lady’s Seat',
      d: 'Viewpoints over the plains, with stone cairns at Pagoda Point.' },
    { n: 'Servarayan Temple',
      d: 'The highest point in the hills, a cave temple reached through a low passage.' },
    { n: 'Killiyur Falls',
      d: 'A three-hundred-foot fall reached by a steep walk down, good after the monsoon.' },
    { n: 'The coffee and orange estates',
      d: 'Several take visitors; the Shevaroy oranges are a local variety.' }
  ],
  when: 'October to March; also pleasant in the hot season when the plains are not.',
  stay: 'Two nights.',
  move: 'Thirty kilometres from Salem, which has a station and good road links.',
  eat: 'Hotel dining rooms and a few local places. Nothing notable.'
},

'TND-gingee': {
  intro: [
    'Gingee is three fortified granite hills joined by walls across the valleys between them, enclosing some seven square kilometres — Rajagiri, Krishnagiri and Chandrayandurg, with the main citadel on top of Rajagiri at a hundred and fifty metres above the plain.',
    'It was Vijayanagara, then Maratha, then Mughal, then French and finally British, and Shivaji called it the most impregnable fortress in India. Nobody has repaired it much since, which is why it feels the way it does.',
    'The climb to the Rajagiri citadel takes an hour and involves crossing a drawbridge over a rock-cut chasm.'
  ],
  see: [
    { n: 'The climb to Rajagiri',
      d: 'An hour up, past gates, a granary and a temple, to the citadel and a gun platform. Start early; there is no shade.' },
    { n: 'The Kalyana Mahal',
      d: 'A seven-storey square tower in the lower fort with a pyramidal roof and a water system that fed every floor.' },
    { n: 'Krishnagiri',
      d: 'The second hill, lower and quicker, with its own fortifications.' },
    { n: 'The chasm and drawbridge',
      d: 'A natural cleft defended by a bridge — the point at which the fort becomes genuinely hard to take.' },
    { n: 'Thiruvannamalai',
      d: 'Forty kilometres away, with the Arunachaleswarar temple and the hill.' }
  ],
  when: 'November to February. Mornings only; the granite is punishing.',
  stay: 'Half a day.',
  move: 'A hundred and sixty kilometres from Chennai, three hours. Tindivanam is the nearest station.',
  eat: 'Dhabas in Gingee town. Carry water for the climb.'
},

'TND-velankanni': {
  intro: [
    'Velankanni is a coastal town with a basilica dedicated to Our Lady of Good Health, and it is one of the most visited Christian pilgrimage sites in Asia — around twenty million people a year, of whom a large proportion are Hindu and Muslim.',
    'The devotion dates from sixteenth and seventeenth-century apparitions and a shipwreck survival, and the church has grown accordingly: a white Gothic basilica with a separate museum of offerings and a long approach lined with stalls.',
    'The 2004 tsunami struck during a service and killed several hundred people here. A memorial stands on the shore.'
  ],
  see: [
    { n: 'The Basilica',
      d: 'Services in several languages through the day. The lower church and the museum of thanksgiving offerings — models of healed limbs, boats, houses — are the most striking part.' },
    { n: 'The annual feast', t: 'late August to 8 September',
      d: 'An eleven-day festival drawing several million, with a chariot procession.' },
    { n: 'The beach and tsunami memorial',
      d: 'Where the wave came in. Quiet and sobering.' },
    { n: 'Nagapattinam and Nagore',
      d: 'A Sufi dargah at Nagore nearby, which draws a similarly mixed crowd.' }
  ],
  when: 'November to February. The feast in September is the main occasion and the town is at capacity.',
  stay: 'One night.',
  move: 'Nagapattinam is twelve kilometres and has a station; Trichy airport is three hours.',
  eat: 'Simple Tamil food and good coastal fish.'
},

/* ===================== PUDUCHERRY ===================== */
'PUD-puducherry': {
  intro: [
    'Pondicherry was French from 1674 until 1954, and the French Quarter — called White Town — is a grid of streets behind a seafront promenade, with ochre and grey houses, bougainvillea over the walls, and street signs in French.',
    'Across a canal is Tamil Town, which has its own architecture: houses with thinnai verandas and carved teak doors, and temples with gopurams. The two halves are quite different and the canal between them was the point.',
    'The Sri Aurobindo Ashram, founded in 1926, runs much of White Town and owns a good deal of the property, which is why it has not been redeveloped.'
  ],
  see: [
    { n: 'The French Quarter on foot',
      d: 'Walk the grid in the early morning. Rue Dumas, Rue Suffren and the seafront. INTACH publishes a heritage walk map.' },
    { n: 'Promenade Beach at dawn',
      d: 'Closed to traffic in the evening and at dawn, with the Gandhi statue and the old pier.' },
    { n: 'Sri Aurobindo Ashram',
      d: 'The samadhi in the main building, where visitors sit in silence. Free; modest dress.' },
    { n: 'Basilica of the Sacred Heart and the Botanical Garden',
      d: 'A Gothic basilica with stained glass, and an 1826 French garden in Tamil Town.' },
    { n: 'Auroville',
      d: 'Twelve kilometres out, and a different proposition entirely.' },
    { n: 'Paradise and Serenity beaches',
      d: 'The town beach has lost its sand to erosion; the swimmable beaches are a short ride out.' }
  ],
  when: 'November to February. Bastille Day on 14 July is still marked.',
  stay: 'Three nights.',
  move: 'Three hours from Chennai by road or train. The town is walked or cycled; rent a bicycle or a scooter.',
  eat: 'A real Franco-Tamil hybrid. Villa Shanti and Bakers Street for French, Surguru for Tamil, and the best croissants in India.'
},

'PUD-auroville': {
  intro: [
    'Auroville was founded in 1968 by the Mother, Sri Aurobindo’s collaborator, as an international township intended to belong to nobody and to realise human unity. Around three thousand two hundred people from some sixty countries live there.',
    'At the centre is the Matrimandir, a golden sphere thirty-six metres across housing a meditation chamber with a solid crystal globe at the middle, lit by a single beam of sunlight through an opening in the roof.',
    'It is a serious experiment rather than an attraction, and it has had serious internal conflicts about governance and development. Visitors see a limited amount, which is reasonable.'
  ],
  see: [
    { n: 'The Matrimandir viewpoint',
      d: 'Free, from a platform across the gardens, after a short orientation film. Booking in advance via the visitor centre is now required.' },
    { n: 'The inner chamber', t: 'book several days ahead',
      d: 'Limited passes for silent meditation inside. Apply at the visitor centre on arrival for a later day.' },
    { n: 'The visitor centre',
      d: 'Exhibition on the township’s history and planning, plus a bookshop and bakery.' },
    { n: 'The community enterprises',
      d: 'Handmade paper, pottery, incense, leather and food units scattered through the township, most open to visitors.' },
    { n: 'The forest',
      d: 'What was eroded laterite in 1968 is now two million trees, planted by residents. The reforestation is the township’s clearest achievement.' }
  ],
  when: 'November to February. Closed to visitors on some days; check before coming.',
  stay: 'Half a day, or several nights in a guest house if you want to understand it at all.',
  move: 'Twelve kilometres from Puducherry. Scooter, taxi or bicycle; distances within the township are large.',
  eat: 'Solar Kitchen for a community meal, and several cafés at the visitor centre and in the settlements.'
},

/* ===================== ANDHRA PRADESH ===================== */
'APR-tirupati': {
  intro: [
    'The Venkateswara temple at Tirumala, on a hill above Tirupati, receives somewhere between fifty and a hundred thousand pilgrims a day and is the richest religious institution in the world, with an annual income in the hundreds of millions of dollars.',
    'The deity is a form of Vishnu, and the offerings — gold, hair, cash — are enormous. Tonsuring is a common vow, so a significant part of the hill is given over to it, and the hair is auctioned internationally.',
    'The queue system is industrial: free darshan can mean twelve hours in holding halls, while paid and booked slots run faster. The laddu made in the temple kitchen has a geographical indication and is the single most produced sweet on earth.'
  ],
  see: [
    { n: 'Darshan at Tirumala',
      d: 'Book a timed slot online weeks ahead through the TTD portal. Without one, expect a very long wait. No leather, no phones.' },
    { n: 'The walk up the hill',
      d: 'Around three thousand five hundred steps from Alipiri, four hours, which many pilgrims do as a vow. Shaded and well provided with water.' },
    { n: 'Sri Padmavathi Temple, Tiruchanur',
      d: 'The consort’s temple, which pilgrims are expected to visit to complete the pilgrimage. Far shorter queues.' },
    { n: 'Sri Venkateswara Museum and the temple kitchen',
      d: 'The museum of temple history, and a view of laddu production at an industrial scale.' },
    { n: 'Chandragiri Fort',
      d: 'Eleven kilometres away, an eleventh-century Vijayanagara fort with two surviving palaces and a light show.' }
  ],
  when: 'October to February. Brahmotsavam in September or October is the biggest festival and the hill is at capacity.',
  stay: 'One or two nights. TTD runs enormous amounts of accommodation on the hill.',
  move: 'Tirupati has an airport and a major railhead; buses run up the hill continuously. Vehicles need a permit at the toll gate.',
  eat: 'Free annadanam at Tirumala for everybody, which feeds tens of thousands. Vegetarian only on the hill.'
},

'APR-araku': {
  intro: [
    'Araku is a valley in the Eastern Ghats at about nine hundred metres, three hours inland from Visakhapatnam, and the way to arrive is the train — a line with fifty-eight tunnels and eighty-four bridges that climbs through the hills and is one of the best rail journeys in India.',
    'The valley is Adivasi country, with coffee that has won international awards grown by tribal cooperatives, and weekly markets where communities come down to trade.',
    'Borra, on the way up, is a limestone cave system with chambers eighty metres below ground and formations lit in a somewhat lurid fashion.'
  ],
  see: [
    { n: 'The Kirandul passenger train',
      d: 'Visakhapatnam to Araku, around five hours through the tunnels. Sit on the right going up.' },
    { n: 'Borra Caves',
      d: 'A million-year-old limestone system with a stream running through and a lingam formation that is worshipped.' },
    { n: 'The tribal museum and Padmapuram gardens',
      d: 'A good museum of the valley’s Adivasi communities, and a garden with a toy train.' },
    { n: 'Araku coffee',
      d: 'Tribal-cooperative arabica, with a coffee museum and tastings in the valley.' },
    { n: 'Dhimsa dancing and the weekly haat',
      d: 'The local dance, and the Thursday market at Araku where several communities trade.' }
  ],
  when: 'October to March. Pleasant in the monsoon too; the valley turns green.',
  stay: 'Two nights.',
  move: 'Train from Visakhapatnam is the point; road is three hours. Limited accommodation — book ahead.',
  eat: 'Bamboo chicken, which is the local speciality, cooked in a hollow bamboo over a fire.'
},

'APR-gandikota': {
  intro: [
    'Gandikota is a fort on the edge of a gorge where the Penna river has cut three hundred metres down through quartzite, and the resulting view has earned it the label of the Grand Canyon of India — an exaggeration that is nonetheless understandable when you are standing on the edge.',
    'The fort is thirteenth-century, extended by the Vijayanagara kings, and holds a granary, a mosque, the Madhavaraya temple with good carving, and a palace, all of it unrestored and essentially unvisited.',
    'There is no railing anywhere. People have fallen. Stand back from the edge.'
  ],
  see: [
    { n: 'The gorge',
      d: 'Walk out to the lip at sunrise. The river below is narrow and green and the rock is red.' },
    { n: 'Madhavaraya Temple',
      d: 'Vijayanagara carving, with a mandapa and sculpted pillars, roofless and empty.' },
    { n: 'Jamia Masjid and the granary',
      d: 'Both inside the fort walls, in laterite and granite.' },
    { n: 'Camping on the rim',
      d: 'A tourism campsite and several operators from Bengaluru and Hyderabad run weekend trips.' },
    { n: 'Belum Caves',
      d: 'Sixty kilometres away, the longest cave system in the Indian plains, over three kilometres of passages.' }
  ],
  when: 'November to February. Summer here is extreme and there is no shade.',
  stay: 'A night, camping or at the tourism cottages.',
  move: 'Three hundred kilometres from Bengaluru and Hyderabad, five to six hours. Jammalamadugu is the nearest town.',
  eat: 'The tourism canteen and village stalls. Carry water.'
},

'APR-visakhapatnam': {
  intro: [
    'Visakhapatnam sits between the Eastern Ghats and the Bay of Bengal, which gives it hills coming down to beaches, and it is the largest city on the Andhra coast — a port, a naval base and a steel town.',
    'The eastern naval command keeps a decommissioned submarine, INS Kurusura, on the beach as a museum, which you walk through, and it is the only submarine museum in India.',
    'Above the city at Simhachalam is an eleventh-century temple, and the Borra and Araku hills start an hour inland.'
  ],
  see: [
    { n: 'INS Kurusura Submarine Museum',
      d: 'On Ramakrishna Beach, a Soviet-built submarine that served for thirty years, preserved with its systems intact.' },
    { n: 'Kailasagiri',
      d: 'A hill park with a ropeway, a toy train and large Shiva and Parvati statues, with views over the coast.' },
    { n: 'Simhachalam Temple',
      d: 'Varaha Narasimha, in a Kalinga-Chalukya style, with the deity covered in sandalwood paste all year except one day.' },
    { n: 'Rushikonda and Yarada beaches',
      d: 'The best swimming beaches, with Yarada the quieter of the two, between two hills.' },
    { n: 'Araku and Borra',
      d: 'The train up into the Ghats, which is the main reason many people come here.' }
  ],
  when: 'October to February. Cyclone season runs October to December on this coast.',
  stay: 'Two nights.',
  move: 'Airport and major railhead. Autos and app cabs.',
  eat: 'Andhra food, which is the spiciest in India — Dharani and Venkateswara for thalis, and good coastal fish.'
},

'APR-lepakshi': {
  intro: [
    'The Veerabhadra temple at Lepakshi was built in the 1530s under Vijayanagara patronage, and it holds the best surviving Vijayanagara mural painting anywhere — ceilings covered in narrative panels in ochre, black and green, including a seven-metre depiction of Shiva and Parvati’s wedding.',
    'The temple also has a hanging pillar that does not quite reach the floor — a cloth can be passed under it — and an unfinished kalyana mandapa whose carvers apparently stopped mid-chisel, with blocked-out figures beside finished ones.',
    'Outside is a monolithic Nandi, four and a half metres high and eight long, one of the largest in India, carved from a single boulder.'
  ],
  see: [
    { n: 'The ceiling murals',
      d: 'In the natya mandapa. Bring a torch; the lighting is poor and the detail is extraordinary.' },
    { n: 'The hanging pillar',
      d: 'One of seventy in the hall, slightly off the floor. The explanation is probably settlement rather than design, which does not make it less odd.' },
    { n: 'The unfinished kalyana mandapa',
      d: 'Carving abandoned part-done, which shows exactly how these figures were produced.' },
    { n: 'The monolithic Nandi',
      d: 'Two hundred metres away, facing the temple. Among the largest in the country.' },
    { n: 'The footprint',
      d: 'A large impression in the rock, attributed variously to Sita and to a goddess, with water in it year round.' }
  ],
  when: 'November to February.',
  stay: 'Two hours.',
  move: 'A hundred and twenty kilometres from Bengaluru, two and a half hours. Hindupur is the nearest railhead.',
  eat: 'Basic stalls; eat in Hindupur or back in Bengaluru.'
},

'APR-srisailam': {
  intro: [
    'Srisailam is a temple town on the Krishna in the Nallamala hills, and the Mallikarjuna temple there is both one of the twelve jyotirlingas and one of the eighteen shakti peethas — a combination that only two sites in India can claim.',
    'The surrounding Nagarjunasagar-Srisailam reserve is the largest tiger reserve in India by area, and the hills are home to the Chenchu, a hunter-gatherer community.',
    'The dam below the temple has flooded part of the gorge and created a reservoir with boat trips through steep forested banks.'
  ],
  see: [
    { n: 'Mallikarjuna Temple',
      d: 'Fourteenth-century walls with carved reliefs running right round the enclosure, which most pilgrims walk straight past.' },
    { n: 'The Patalaganga',
      d: 'Steps down to the Krishna below the temple, where pilgrims bathe. A ropeway runs down.' },
    { n: 'Srisailam Dam and boat ride',
      d: 'Through the gorge, with the forest coming down to the water.' },
    { n: 'Akkamahadevi Caves',
      d: 'Reached by boat, with a natural lingam and a long low passage.' },
    { n: 'The tiger reserve',
      d: 'Jeep safaris from a few gates; sightings are rare but the forest is vast and genuinely wild.' }
  ],
  when: 'October to February. Mahashivratri is the main festival.',
  stay: 'One night.',
  move: 'Two hundred kilometres from Hyderabad, five hours. Markapur is the nearest railhead.',
  eat: 'Temple annadanam and simple vegetarian places.'
},

'APR-amaravati': {
  intro: [
    'Amaravati was the capital of the Satavahanas and the site of one of the greatest Buddhist stupas in the ancient world, built from the third century BC and faced with carved limestone panels of a delicacy that rivals anything from the period.',
    'Most of those panels are now in the British Museum and the Chennai Government Museum, having been removed in the nineteenth century. What is left on site is the mound, the plan, and a good local museum.',
    'The name has since been reused for Andhra Pradesh’s new planned capital nearby, which is a separate and ongoing project.'
  ],
  see: [
    { n: 'The stupa mound and site museum',
      d: 'The excavated base with a model of the original, and a museum holding the panels that stayed.' },
    { n: 'Amareswara Temple',
      d: 'One of the five Pancharama Kshetras, on the riverbank, with a tall white lingam.' },
    { n: 'Dhyana Buddha statue',
      d: 'A hundred and twenty-five feet of seated Buddha on the Krishna bank, modern and popular.' },
    { n: 'Undavalli Caves',
      d: 'Thirty kilometres away, four storeys cut into a hillside with a large reclining Vishnu. Fifth century and far more impressive than it sounds.' }
  ],
  when: 'November to February.',
  stay: 'Half a day from Vijayawada.',
  move: 'Thirty-five kilometres from Vijayawada, which has an airport and a major railhead.',
  eat: 'Eat in Vijayawada; Andhra meals there are excellent.'
},

/* ===================== TELANGANA ===================== */
'TEL-golconda': {
  intro: [
    'Golconda was the Qutb Shahi capital and the diamond market of the world — the Koh-i-Noor, the Hope, the Regent and the Darya-i-Noor all passed through here, cut and traded in the bazaar below the fort. The mines were in the Krishna valley; Golconda was where the stones were sold.',
    'The fort is a granite hill with four kilometres of outer wall and an acoustic system built into it: a clap at the entrance gate is audible at the top pavilion a kilometre away, which was the alarm.',
    'The Qutb Shahi tombs a short distance away hold seven of the sultans in domed granite and stucco mausolea in a landscaped park, recently and very well restored.'
  ],
  see: [
    { n: 'The climb to Bala Hisar',
      d: 'Three hundred and eighty steps to the top pavilion, past the Ramdas prison and the mosque. The view over Hyderabad is the best available.' },
    { n: 'The acoustics at Fateh Darwaza',
      d: 'Clap under the dome of the main gate. Guides will demonstrate the chain of positions.' },
    { n: 'Qutb Shahi Tombs',
      d: 'Seventy acres with thirty structures, including a hammam where the bodies were washed. The Aga Khan restoration has transformed them.' },
    { n: 'The light and sound show',
      d: 'In the evening, narrated by Amitabh Bachchan in the English version. Better than most.' },
    { n: 'Taramati Baradari',
      d: 'A pavilion outside the walls from which a courtesan is said to have sung to the sultan in the fort.' }
  ],
  when: 'October to February. Early morning or late afternoon for the climb.',
  stay: 'Half a day with the tombs.',
  move: 'Eleven kilometres from Hyderabad centre. Autos and app cabs.',
  eat: 'Nothing at the fort; eat in the old city.'
},

'TEL-ramappa': {
  intro: [
    'The Rudreshwara temple at Palampet, universally called the Ramappa temple after its sculptor, was completed in 1213 under the Kakatiyas and was inscribed by UNESCO in 2021. It is one of very few Indian temples named for its builder rather than its patron.',
    'It is built of sandstone on a star-shaped platform with black basalt pillars and brackets so highly polished they reflect, and the bricks of the tower are light enough to float — a lime-and-sand composite whose recipe is not fully understood.',
    'The carving on the bracket figures is as fine as the Hoysala work at Belur, and there is almost never anybody there.'
  ],
  see: [
    { n: 'The madanika brackets',
      d: 'Figures on the outer pillars of the mandapa, polished black basalt, some with bangles carved free of the arm.' },
    { n: 'The ceilings',
      d: 'Deeply carved panels inside the mandapa, with a Nandi in black basalt facing the sanctum.' },
    { n: 'The floating bricks',
      d: 'The shikhara, built of a lightweight composite. The site museum explains it.' },
    { n: 'Ramappa Lake',
      d: 'A Kakatiya-era tank beside the temple, still irrigating.' },
    { n: 'Warangal',
      d: 'Seventy kilometres away, for the Thousand Pillar Temple and the Kakatiya fort.' }
  ],
  when: 'November to February.',
  stay: 'Two hours.',
  move: 'Two hundred and twenty kilometres from Hyderabad; seventy from Warangal, which has a station.',
  eat: 'A small canteen; eat in Warangal.'
},

'TEL-warangal': {
  intro: [
    'Warangal was the Kakatiya capital until 1323, and what survives of it is a fort with four enormous freestanding stone gateways — the Kakatiya Kala Thoranam — standing in an empty field where the Swayambhu temple once was. The gateways are now the state emblem of Telangana.',
    'The Thousand Pillar Temple nearby, from 1163, is a star-shaped triple shrine with a detached mandapa that was dismantled and rebuilt stone by stone between 2004 and 2022.',
    'It is an easy pairing with Ramappa and makes a good day out of Hyderabad.'
  ],
  see: [
    { n: 'The Kakatiya gateways',
      d: 'Four carved stone arches in a ruined enclosure, with sculpture scattered in the grass around them.' },
    { n: 'Thousand Pillar Temple',
      d: 'Trikutalaya form, with a polished basalt Nandi and the reassembled mandapa.' },
    { n: 'Bhadrakali Temple',
      d: 'On a rock above a lake, with a stone image of the goddess seated with eight arms.' },
    { n: 'Warangal Fort walls',
      d: 'Concentric earthen and stone ramparts with a moat, still traceable on foot.' },
    { n: 'Ramappa',
      d: 'Seventy kilometres, and the better temple of the two.' }
  ],
  when: 'November to February.',
  stay: 'Half a day.',
  move: 'A hundred and fifty kilometres from Hyderabad, with trains taking around two and a half hours.',
  eat: 'Telangana food, which is spicier and more millet-based than Andhra. Good mutton.'
},

'TEL-bhadrachalam': {
  intro: [
    'Bhadrachalam is a temple town on the Godavari with a Rama temple of the seventeenth century, and the story attached to it is a good one: a local tax collector named Gopanna diverted state revenue to build it, was imprisoned by the Golconda sultan, and composed a body of Telugu devotional songs in prison that are still central to Carnatic music.',
    'The Sri Rama Navami celebration here involves a symbolic marriage of Rama and Sita, attended by the state government, which sends pearls and silks on behalf of the people of Telangana — a practice inherited from the Nizams.',
    'The Godavari here is wide and the forest behind the town is Adivasi country.'
  ],
  see: [
    { n: 'Sri Sita Ramachandraswamy Temple',
      d: 'On a hill above the river, with Rama depicted with four arms, which is unusual.' },
    { n: 'Sri Rama Navami', t: 'March or April',
      d: 'The kalyanam, with state honours and enormous crowds.' },
    { n: 'The Godavari ghats',
      d: 'Boats and bathing, with the forest on the far bank.' },
    { n: 'Parnasala',
      d: 'Thirty-five kilometres upstream, said to be where Rama and Sita lived in exile.' },
    { n: 'Papikondalu',
      d: 'A gorge on the Godavari reached by boat, with forested hills on both sides. A full day.' }
  ],
  when: 'November to February. Rama Navami in spring.',
  stay: 'One night.',
  move: 'Three hundred kilometres from Hyderabad, six hours. Bhadrachalam Road is the railhead, forty kilometres.',
  eat: 'Temple prasadam and simple Telugu meals.'
},

'TEL-medak': {
  intro: [
    'Medak Cathedral was completed in 1924 by a Wesleyan Methodist mission, and it is one of the largest churches in Asia — it seats five thousand — built as famine relief work to give employment during a severe drought.',
    'The stained glass was made in Britain to designs by Frank Salisbury and covers the nativity, crucifixion and ascension in three enormous windows. The mosaic floor tiles came from Italy.',
    'It stands in a small Telangana town with nothing else of the kind anywhere near it, which is the surprise.'
  ],
  see: [
    { n: 'The nave and the stained glass',
      d: 'Go in the morning when light comes through the east window. The scale of the interior is the shock.' },
    { n: 'The bell tower',
      d: 'Thirty-three metres, visible across the town.' },
    { n: 'Medak Fort',
      d: 'A hill fort above the town, Kakatiya in origin, with a cannon and a view.' },
    { n: 'Pocharam sanctuary',
      d: 'Forty kilometres away, with a lake and a small deer population.' }
  ],
  when: 'November to February. Christmas services are packed.',
  stay: 'Two hours.',
  move: 'A hundred kilometres from Hyderabad, two hours by road.',
  eat: 'Basic places in the town.'
},

/* ===================== ODISHA ===================== */
'ODI-puri': {
  intro: [
    'The Jagannath temple at Puri is one of the four Char Dham, and it is unlike any other major temple in India. The deities are made of wood, not stone, and are replaced in a secret ceremony every twelve to nineteen years; the old ones are buried in the temple compound.',
    'The Rath Yatra in June or July brings the three deities out on chariots fourteen metres high, pulled by thousands of people through the main street to another temple three kilometres away. The English word juggernaut comes from this.',
    'The temple kitchen is said to be the largest in the world, cooking for anywhere from a few thousand to over a hundred thousand in earthen pots stacked nine high over wood fires. Non-Hindus may not enter the temple; the library roof opposite gives a view.'
  ],
  see: [
    { n: 'Rath Yatra', t: 'June or July',
      d: 'Three chariots built fresh each year and pulled by hand. Among the largest religious gatherings in the world.' },
    { n: 'The Ananda Bazaar',
      d: 'The temple’s food market, where mahaprasad cooked in the kitchen is sold in earthen pots. Non-Hindus cannot reach it; ask someone to bring you some.' },
    { n: 'Puri beach',
      d: 'Long and busy, with fishermen, and an annual sand art festival. The undertow is real; swim where the lifeguards are.' },
    { n: 'Raghurajpur',
      d: 'Fourteen kilometres away, a village of pattachitra painters.' },
    { n: 'Konark',
      d: 'Thirty-five kilometres up the coast along the marine drive.' }
  ],
  when: 'October to February. Rath Yatra in June or July, when the town is at several times capacity.',
  stay: 'Two nights.',
  move: 'Puri has a railhead; Bhubaneswar airport is ninety minutes. Autos and cycle rickshaws.',
  eat: 'Odia food — dalma, besara, chhena poda — and the mahaprasad if you can get it.'
},

'ODI-bhubaneswar': {
  intro: [
    'Bhubaneswar had around seven hundred temples at its height and still has over a hundred, spanning the seventh to thirteenth centuries, which makes it the best place in India to watch a single architectural tradition develop over six hundred years.',
    'The Kalinga style has a particular shape: a curvilinear tower called a rekha deul over the sanctum, and a pyramidal roofed hall in front. The Lingaraja temple of about 1100 is the mature form; Parashurameshvara, four centuries earlier, is the early one.',
    'Just outside the city is Dhauli, where Ashoka’s rock edict expressing remorse for the Kalinga war still stands — the closest thing to a conversion narrative in the ancient world.'
  ],
  see: [
    { n: 'Lingaraja Temple',
      d: 'Fifty-five metres, the great Kalinga temple. Non-Hindus may not enter; a viewing platform on the north wall was built for the purpose.' },
    { n: 'Mukteshvara and Parashurameshvara',
      d: 'Tenth and seventh century, small, open and freely accessible. Mukteshvara’s carved torana is the finest detail in the city.' },
    { n: 'Rajarani Temple',
      d: 'Eleventh century, no longer in worship, with a clustered tower and superb figure sculpture. The easiest to study properly.' },
    { n: 'Dhauli',
      d: 'Ashoka’s edict in Brahmi on a rock, with a carved elephant above it, and a Japanese peace pagoda on the hill.' },
    { n: 'Udayagiri and Khandagiri',
      d: 'Jain caves on the city edge; see their own entry.' },
    { n: 'Odisha State Museum',
      d: 'Good on Kalinga sculpture and on palm-leaf manuscripts.' }
  ],
  when: 'October to February.',
  stay: 'Two nights.',
  move: 'Airport and major railhead. Autos; the temple cluster around Lingaraja is walkable.',
  eat: 'Odia thalis at Dalma, and the city’s chhena sweets.'
},

'ODI-chilika': {
  intro: [
    'Chilika is the largest brackish lagoon in Asia — over a thousand square kilometres in the monsoon, shrinking by half in summer — separated from the Bay of Bengal by a long sand bar with a single channel through it.',
    'It holds the only known population of Irrawaddy dolphin in India, around a hundred and fifty animals, and in winter over a million migratory birds arrive from Siberia, the Caspian and Mongolia. Nalabana island in the middle is the core bird sanctuary.',
    'A hundred and fifty thousand fishermen work the lagoon, and the ecology has been fought over — a new mouth cut in 2000 restored salinity and brought the fish back.'
  ],
  see: [
    { n: 'Irrawaddy dolphin at Satapada',
      d: 'Boats from Satapada towards the sea mouth. Insist your boatman keeps distance — harassment by boats is a real problem.' },
    { n: 'Nalabana Island',
      d: 'From Barkul or Rambha, December to February. Flamingo, pelican, godwit and a great many duck.' },
    { n: 'Kalijai Temple',
      d: 'On an island in the lagoon, with a local goddess legend and a January festival.' },
    { n: 'Mangalajodi',
      d: 'A village on the northern shore where former bird poachers now run boats as guides. The best birding on the lagoon and a genuine conservation success.' },
    { n: 'Rajhans and the sea mouth',
      d: 'A sandbar beach between lagoon and sea, reached by boat.' }
  ],
  when: 'November to February for birds; the dolphins are year round but boats are limited in rough weather.',
  stay: 'Two nights, at Barkul, Rambha or Mangalajodi.',
  move: 'Balugaon and Chilika are the railheads on the Bhubaneswar–Chennai line. Satapada is two hours from Puri.',
  eat: 'Chilika crab and prawn, which is the regional speciality.'
},

'ODI-simlipal': {
  intro: [
    'Simlipal is a biosphere reserve of sal forest and grassland on a plateau in Mayurbhanj district, and it is the only place in the world where melanistic tigers — pseudo-melanistic, with broad merged stripes — occur as a significant proportion of the population, the result of genetic isolation.',
    'It also has around four hundred elephants, the largest population in eastern India, and two major waterfalls inside the park.',
    'Access is by permit with a limited number of vehicles a day, and there are forest rest houses deep inside that can be booked and that give you the forest to yourself.'
  ],
  see: [
    { n: 'Barehipani and Joranda falls',
      d: 'Four hundred metres in two tiers, and a hundred and fifty metres in a single drop. Both inside the core.' },
    { n: 'The forest drives',
      d: 'Entry from Pithabata or Jashipur with a permit. Elephant, gaur, and a small chance of tiger.' },
    { n: 'Chahala and Newana rest houses',
      d: 'Forest department accommodation inside the park, booked in advance. The reason to come.' },
    { n: 'Birding',
      d: 'Over two hundred and thirty species, with good hornbills and the Malabar trogon at its eastern limit.' },
    { n: 'Khiching',
      d: 'A tenth-century temple complex in chlorite schist on the way, little visited.' }
  ],
  when: 'November to mid-June; closed in the monsoon. Permits online or at the gates.',
  stay: 'Two or three nights, ideally inside.',
  move: 'Baripada is the base, with the nearest railhead; Bhubaneswar is six hours.',
  eat: 'Rest house kitchens — carry your own provisions for the inside ones.'
},

'ODI-bhitarkanika': {
  intro: [
    'Bhitarkanika is a mangrove forest in the Brahmani-Baitarani delta, and it holds the largest population of saltwater crocodile in India — over seventeen hundred animals, including individuals over six metres, among the largest recorded anywhere.',
    'Gahirmatha beach on its seaward edge is the largest mass nesting site for olive ridley turtles in the world. Several hundred thousand females come ashore over a few nights in a phenomenon called arribada, which does not happen every year and cannot be predicted.',
    'The whole thing is navigated by boat through creeks under mangrove, which is a very different kind of wildlife viewing from a jeep.'
  ],
  see: [
    { n: 'Boat trips through the creeks',
      d: 'From Khola or Gupti, through mangrove channels. Crocodiles on the banks, kingfishers, and eight species of mangrove-dwelling kingfisher in the wider area.' },
    { n: 'Bagagahana heronry',
      d: 'A breeding colony of thousands of open-bill stork, egret and darter, best in the monsoon and just after.' },
    { n: 'Gahirmatha turtle nesting', t: 'February and March',
      d: 'The beach is closed during nesting and viewing is restricted; the arribada is visible only with special permission.' },
    { n: 'Dangmal',
      d: 'The crocodile research and breeding centre, with the park headquarters and accommodation.' },
    { n: 'The white crocodile',
      d: 'An albino saltwater crocodile named Gori has been in the enclosure at Dangmal for decades.' }
  ],
  when: 'November to February. Closed for part of the monsoon; permits from the forest office at Rajnagar.',
  stay: 'Two nights.',
  move: 'Bhadrak is the railhead; Chandbali or Rajnagar are the boat departure points. Five hours from Bhubaneswar.',
  eat: 'Forest rest houses and homestays. Crab is the local dish.'
},

'ODI-raghurajpur': {
  intro: [
    'Raghurajpur is a village of about a hundred and twenty houses where every household is a working artist, and it has been designated a heritage crafts village. The tradition is pattachitra — painting on cloth stiffened with tamarind and chalk, in natural pigments, with a line of extraordinary fineness.',
    'The subjects are Jagannath, Krishna and the Ramayana, and the painters also produce the decorated images used when the Jagannath deities are being renewed at Puri, which gives the village a formal role in the temple cycle.',
    'It is also the birthplace of Kelucharan Mohapatra, who largely reconstructed Odissi dance in the twentieth century, and there is a gotipua dance school.'
  ],
  see: [
    { n: 'The painters’ houses',
      d: 'Two streets of houses with murals on the outside walls. Knock and they will show you work in progress.' },
    { n: 'Palm-leaf etching',
      d: 'Talapatrachitra, incised with a stylus and rubbed with ink. Several families specialise in it.' },
    { n: 'Gotipua dance',
      d: 'Boys dressed as women performing the precursor to Odissi. Performances can be arranged.' },
    { n: 'Kelucharan Mohapatra’s house',
      d: 'Marked in the village, with a small memorial.' },
    { n: 'Buying directly',
      d: 'Prices are a fraction of the Puri shops and the money goes to the painter. Ask about the pigments.' }
  ],
  when: 'October to February.',
  stay: 'Two or three hours.',
  move: 'Fourteen kilometres from Puri, half an hour by auto.',
  eat: 'Nothing much; eat in Puri.'
},

'ODI-udayagiri-khandagiri': {
  intro: [
    'Udayagiri and Khandagiri are two low hills on the edge of Bhubaneswar, honeycombed with caves cut in the first and second centuries BC as residences for Jain ascetics — not temples, but cells, often with sloping floors to serve as pillows.',
    'The Hathigumpha inscription in Udayagiri is the key historical document for the Kalinga king Kharavela, recording his reign year by year, and it is one of the most important epigraphic sources for the period.',
    'The Rani Gumpha is a two-storey cave with carved friezes of processions, hunts and dancers — some of the earliest narrative relief in India.'
  ],
  see: [
    { n: 'Rani Gumpha',
      d: 'The largest cave, two storeys round a courtyard, with friezes on the upper veranda.' },
    { n: 'Hathigumpha',
      d: 'The Kharavela inscription, seventeen lines in Prakrit, under a natural overhang.' },
    { n: 'Khandagiri hill',
      d: 'Fewer caves but better views, and a Jain temple at the summit still in use.' },
    { n: 'Ganesha Gumpha',
      d: 'With two carved elephants at the entrance and a well-known relief of an elopement.' },
    { n: 'The monkeys',
      d: 'Numerous, confident and interested in your bag.' }
  ],
  when: 'October to February. Early morning.',
  stay: 'Two hours.',
  move: 'Six kilometres from Bhubaneswar centre. Autos.',
  eat: 'Stalls at the base; eat in the city.'
},

'ODI-gopalpur': {
  intro: [
    'Gopalpur-on-Sea was a port that handled trade with Burma and Southeast Asia until the early twentieth century, and when the trade went the town simply stopped. What is left is a long beach, a lighthouse, some decaying jetty structures and a handful of old hotels.',
    'It is quiet in a way few Indian beach towns are, and the appeal is precisely that there is nothing to do. The sea here is rough and the undertow serious.',
    'Fishing boats launch straight off the sand in the morning, which is worth getting up for.'
  ],
  see: [
    { n: 'The beach and the fishing fleet',
      d: 'Boats launched through the surf at dawn and brought back in the afternoon.' },
    { n: 'The lighthouse',
      d: 'Open some afternoons, with a view along the coast.' },
    { n: 'The old port structures',
      d: 'Jetty remains and warehouses, slowly going.' },
    { n: 'Taptapani',
      d: 'Fifty kilometres inland, hot sulphur springs in forest with a government bath house.' },
    { n: 'Rushikulya',
      d: 'A turtle nesting beach thirty kilometres north, second only to Gahirmatha.' }
  ],
  when: 'October to February. The sea is dangerous in the monsoon.',
  stay: 'Two nights.',
  move: 'Berhampur is the railhead, sixteen kilometres. Autos from there.',
  eat: 'Hotel dining rooms and fresh fish from the morning boats.'
},

'ODI-daringbadi': {
  intro: [
    'Daringbadi is a small town at about a thousand metres in the Kandhamal hills, and it is the only place in Odisha where frost forms in winter — which has earned it the title of the Kashmir of Odisha, a considerable stretch.',
    'It sits among pine plantations, coffee and pepper, in a district that is predominantly Kandha Adivasi, and it sees almost no visitors outside the Odia weekend crowd.',
    'The surrounding hills have waterfalls, a few viewpoints and not much else, which is most of the appeal.'
  ],
  see: [
    { n: 'Hill View and Doluri river',
      d: 'Viewpoints over the valley, best early when mist sits in the folds.' },
    { n: 'Putudi Falls',
      d: 'Forty kilometres away, a broad fall with pools at the base.' },
    { n: 'The pine and coffee plantations',
      d: 'Walkable forest roads with almost no traffic.' },
    { n: 'Belghar',
      d: 'A Kutia Kandha area deeper in the hills, with a sanctuary and considerable cultural interest. Go with a guide.' }
  ],
  when: 'October to February. December and January for the frost.',
  stay: 'Two nights.',
  move: 'Berhampur is the nearest major railhead, a hundred and seventy kilometres; Phulbani is the district town. A car is necessary.',
  eat: 'Basic Odia food at a few small places and the state guest house.'
},

/* ===================== WEST BENGAL ===================== */
'WBG-sundarbans': {
  intro: [
    'The Sundarbans is the largest mangrove forest on earth, straddling the India–Bangladesh border at the mouth of the Ganges, and the Indian portion is a tiger reserve. The tigers here swim between islands, are the only population living in mangrove, and kill a significant number of people each year — honey collectors and crab fishers, mostly.',
    'You see it entirely by boat, moving through creeks on the tide. Tiger sightings are rare and most visitors see pugmarks on mud banks instead, along with estuarine crocodile, water monitor, spotted deer and a great many kingfishers.',
    'The forest is also the frontline of sea-level rise: islands have gone under within living memory and the embankments are repaired constantly.'
  ],
  see: [
    { n: 'A two or three-night boat trip',
      d: 'Live aboard, moving between creeks, with watchtowers at Sudhanyakhali and Sajnekhali. The boat is the experience.' },
    { n: 'The watchtowers',
      d: 'Sudhanyakhali has a sweetwater pond that draws deer and occasionally tiger.' },
    { n: 'Netidhopani',
      d: 'A ruined four-hundred-year-old temple deep in the forest, reached on a long creek run.' },
    { n: 'Bonbibi shrines',
      d: 'The forest goddess venerated by Hindus and Muslims alike, whose shrines are at the edge of every village. Central to how people here understand the forest.' },
    { n: 'Village walks',
      d: 'On the inhabited islands, with embankments, prawn-seed collection and honey gathering.' }
  ],
  when: 'November to February is most comfortable; March to May gives better tiger chances. Avoid the monsoon.',
  stay: 'Two or three nights on a boat or in a lodge at Pakhiralay.',
  move: 'Godkhali is the jetty, around three hours from Kolkata, then boat. Permits are handled by operators.',
  eat: 'Boat kitchens — Bengali fish, crab and prawn, cooked onboard and generally excellent.'
},

'WBG-santiniketan': {
  intro: [
    'Rabindranath Tagore founded a school here in 1901 and Visva-Bharati University in 1921, on the principle that teaching should happen outdoors under trees, which it still does in parts of the campus.',
    'It became the centre of a distinct artistic movement — Nandalal Bose, Ramkinkar Baij, Benode Behari Mukherjee — and the Kala Bhavana art school and the murals and sculptures scattered across the campus are the reason to come. It was inscribed by UNESCO in 2023.',
    'The Poush Mela in December and the Basanta Utsav at Holi are the two great occasions, the latter being the Santiniketan version of Holi with music and dance rather than a free-for-all.'
  ],
  see: [
    { n: 'Uttarayan complex',
      d: 'Tagore’s five houses, each in a different style, with the museum at Bichitra. Closed Wednesdays.' },
    { n: 'Kala Bhavana',
      d: 'The art school, with Ramkinkar Baij’s outdoor sculptures and Benode Behari’s mural in the Hindi Bhavana.' },
    { n: 'Chhatimtala and the open-air classes',
      d: 'The grove where Tagore’s father meditated, and classes still held under the trees.' },
    { n: 'Sonajhuri haat',
      d: 'A Saturday market in a forest of acacia, with Santhal crafts, kantha and dokra.' },
    { n: 'Poush Mela and Basanta Utsav',
      d: 'December and Holi respectively. Both crowd the town; book far ahead.' }
  ],
  when: 'October to March. Poush Mela in late December.',
  stay: 'Two nights.',
  move: 'Bolpur Santiniketan station, three hours from Kolkata by express. Cycle rickshaws and toto autos.',
  eat: 'Bengali home cooking at guest houses, and the Sonajhuri haat food stalls.'
},

'WBG-kalimpong': {
  intro: [
    'Kalimpong sits at about twelve hundred metres on a ridge above the Teesta, and it was the trading town for the wool route from Tibet — mule caravans came over the Jelep La into Kalimpong until the border closed in 1962.',
    'It is lower, warmer and much quieter than Darjeeling, with a strong Nepali, Lepcha and Bhutia mix, and a long nursery industry — orchids and cacti grown commercially since the nineteenth century.',
    'The Zang Dhok Palri Phodang monastery holds Tibetan manuscripts brought from Lhasa in 1959, and the Dr Graham’s Homes campus above the town is a piece of Scottish mission history.'
  ],
  see: [
    { n: 'Durpin Monastery',
      d: 'Zang Dhok Palri Phodang on Durpin hill, with manuscripts and a view of both the Teesta and Relli valleys.' },
    { n: 'Dr Graham’s Homes',
      d: 'A 1900 Scottish mission school on a hillside, with a stone chapel and a hundred and thirty hectares of campus.' },
    { n: 'The nurseries',
      d: 'Several commercial orchid and cactus growers open to visitors. Pineview Nursery has one of the largest cactus collections in Asia.' },
    { n: 'Deolo Hill',
      d: 'The highest point above the town, with a park and views to Kanchenjunga on a clear morning.' },
    { n: 'Teesta Bazaar and rafting',
      d: 'On the river below, with rafting from Melli in season.' }
  ],
  when: 'March to May and October to December. The monsoon brings landslides and road closures.',
  stay: 'Two nights.',
  move: 'Bagdogra airport and New Jalpaiguri station are both around three hours. Shared jeeps from Siliguri and Darjeeling.',
  eat: 'Nepali and Tibetan — momos, thukpa, gundruk — and good local cheese, a mission-era legacy.'
},

'WBG-bishnupur': {
  intro: [
    'Bishnupur was the capital of the Malla kings, and between the sixteenth and eighteenth centuries they built temples there out of laterite and brick — because there is no stone in this part of Bengal — covered in terracotta relief panels.',
    'The style is specific to Bengal: curved cornices derived from thatched huts, and walls tiled with terracotta plaques of the Ramayana, the Mahabharata and Krishna’s life, often with Mughal soldiers and Portuguese ships worked in.',
    'The town is also the home of the Bishnupur gharana of Hindustani music, and of Baluchari silk saris with narrative panels woven into the pallu.'
  ],
  see: [
    { n: 'Rasmancha',
      d: 'A 1600 brick structure on a laterite plinth with a pyramidal tower, where all the town’s deities were once brought for a festival.' },
    { n: 'Shyam Rai and Jor Bangla',
      d: 'The finest terracotta work — Jor Bangla is two hut forms joined under one tower, with panels covering every surface.' },
    { n: 'Madan Mohan Temple',
      d: 'Ekratna style, with particularly good Ramayana panels.' },
    { n: 'Dalmadal cannon',
      d: 'A four-metre wrought-iron cannon of the Malla period, said to have been fired by Krishna himself to defend the town.' },
    { n: 'Baluchari weaving',
      d: 'Workshops in the town; the narrative pallu takes a week to weave.' }
  ],
  when: 'October to March.',
  stay: 'One night.',
  move: 'Bishnupur has a station, four hours from Kolkata. Cycle rickshaws between the temples, which are spread over a few kilometres.',
  eat: 'Simple Bengali food; the local sweet is mihidana and sitabhog from nearby Bardhaman.'
},

'WBG-sandakphu': {
  intro: [
    'Sandakphu at three thousand six hundred and thirty-six metres is the highest point in West Bengal, on the Singalila ridge along the Nepal border, and from the top you can see four of the five highest mountains on earth: Everest, Kanchenjunga, Lhotse and Makalu.',
    'Kanchenjunga from here appears as the Sleeping Buddha — a long profile of peaks that reads unmistakably as a reclining figure once you see it.',
    'The classic approach is a four to five day trek from Manebhanjan through Singalila National Park, staying in trekkers’ huts and teahouses, with the trail crossing in and out of Nepal. There is also a jeep road, driven by vintage Land Rovers from the 1950s, which is an experience of its own.'
  ],
  see: [
    { n: 'Sunrise over the Sleeping Buddha',
      d: 'From the Sandakphu ridge. Everest is a small triangle to the left; Kanchenjunga fills the view.' },
    { n: 'The trek from Manebhanjan',
      d: 'Four or five days via Tumling, Kalipokhri and Sandakphu, often continuing to Phalut. Permits and a guide are required.' },
    { n: 'The Land Rovers',
      d: 'A fleet of 1950s Land Rovers still working the jeep track. Rough, slow and genuinely remarkable.' },
    { n: 'Singalila National Park',
      d: 'Red panda territory, with rhododendron and magnolia in bloom in April and May.' },
    { n: 'Phalut',
      d: 'Twenty-one kilometres further along the ridge, closer to Kanchenjunga and almost empty.' }
  ],
  when: 'April and May for rhododendron, October to December for the clearest mountain views. Snow from late December.',
  stay: 'Five to six days including travel.',
  move: 'Manebhanjan is two hours from Darjeeling. Permits at Manebhanjan; guides are compulsory in the park.',
  eat: 'Teahouse and trekkers’ hut food — dal bhat, thukpa, eggs. Carry some of your own.'
},

'WBG-dooars': {
  intro: [
    'The Dooars are the floodplain between the Himalayan foothills and the Bengal plain, cut by rivers coming off the hills, and the name means doors — these are the gateways into Bhutan.',
    'The landscape is tea gardens alternating with riverine forest, and it holds the one-horned rhinoceros at Jaldapara and Gorumara, elephant herds, gaur and the best lowland birding in eastern India.',
    'It is unfashionable and quiet, with forest bungalows and tea bungalows to stay in, and it gets a fraction of Assam’s wildlife traffic for a comparable experience.'
  ],
  see: [
    { n: 'Jaldapara',
      d: 'Elephant-back and jeep safaris for one-horned rhino, the second-largest population in India after Kaziranga.' },
    { n: 'Gorumara',
      d: 'Smaller, with watchtowers over salt licks and good rhino, gaur and elephant sightings.' },
    { n: 'Buxa Tiger Reserve',
      d: 'Forest on the Bhutan border, with a ruined colonial detention fort at Buxa and excellent birding.' },
    { n: 'The tea bungalows',
      d: 'Several working gardens take guests in old planters’ bungalows. The best way to stay here.' },
    { n: 'Chilapata and Jayanti',
      d: 'Forest with a ruined Gupta-era fort, and a riverbed walk towards the Bhutan hills.' }
  ],
  when: 'October to April; the parks close mid-June to mid-September.',
  stay: 'Three nights.',
  move: 'New Jalpaiguri or Hasimara stations, Bagdogra airport. A car is needed.',
  eat: 'Bungalow kitchens; Bengali and Nepali food in the towns.'
},

'WBG-murshidabad': {
  intro: [
    'Murshidabad was the capital of Bengal under the Nawabs, and in 1757 it was, by Clive’s own estimate, as extensive and as rich as London. The battle of Plassey that year, fought twenty miles away, ended that and began British rule in India.',
    'The Hazarduari Palace, built in 1837 in Italianate style with a thousand doors — several hundred of them false, to confuse assassins — is now a museum with the Nawabs’ arms, paintings and a mirror said to show you to others without showing them to you.',
    'The town is quiet, spread along the Bhagirathi, and almost nobody comes.'
  ],
  see: [
    { n: 'Hazarduari Palace Museum',
      d: 'Weapons, portraits, and the chandelier given by Queen Victoria. Closed Fridays.' },
    { n: 'Katra Masjid',
      d: 'Murshid Quli Khan’s mosque and tomb, 1724, where he is buried under the entrance steps at his own request so that worshippers would walk over him.' },
    { n: 'Khushbagh',
      d: 'Across the river by boat, the garden cemetery of Siraj-ud-Daulah, the Nawab defeated at Plassey.' },
    { n: 'Jahankosha cannon and Nashipur Palace',
      d: 'A seventeenth-century siege gun, and a later palace with a Rajbari.' },
    { n: 'Plassey',
      d: 'Fifty kilometres south, with a memorial on the battlefield.' }
  ],
  when: 'October to February.',
  stay: 'Two nights.',
  move: 'Berhampore Court or Murshidabad stations, four to five hours from Kolkata. Toto autos and boats locally.',
  eat: 'Bengali and Murshidabadi — the local biryani and chhanabora.'
},

'WBG-mirik': {
  intro: [
    'Mirik is a small hill town at about seventeen hundred metres between Darjeeling and the plains, built around Sumendu lake with a footbridge across it and a path right round the shore.',
    'It is a low-key place with tea gardens, orange orchards and cardamom, and it is where people from Siliguri go for a day. From the Bokar monastery above the town and from Sunrise Point there are good views of Kanchenjunga.',
    'The Nepal border is a few kilometres away at Pashupati, where people cross to shop.'
  ],
  see: [
    { n: 'Sumendu Lake',
      d: 'A three-kilometre walk round the shore with pines on one side, and boating and pony rides.' },
    { n: 'Bokar Ngedon Chokhor Ling Monastery',
      d: 'Above the town, with a view down to the lake and across to the mountains.' },
    { n: 'Sunrise Point',
      d: 'For Kanchenjunga on a clear morning, a short walk from the town.' },
    { n: 'The tea gardens',
      d: 'Thurbo and Gopaldhara nearby, both with estate tours.' },
    { n: 'Pashupati market',
      d: 'Across the Nepal border, for cheap goods and a passport-free day crossing.' }
  ],
  when: 'March to May and October to December.',
  stay: 'One or two nights.',
  move: 'Fifty kilometres from Siliguri, two hours; Darjeeling is also around two hours. Shared jeeps.',
  eat: 'Momos and thukpa at the lakeside stalls; simple Nepali food in the town.'
},

'WBG-digha': {
  intro: [
    'Digha is the beach Kolkata goes to — a shallow, gently shelving coast on the Bay of Bengal about four hours from the city, developed since the 1950s and now thoroughly built up.',
    'It is not beautiful. The sea is brown with silt from the Hooghly, the beach has been eroding for decades, and the promenade is a line of hotels and food stalls. What it is, is accessible, cheap and cheerful, and on a Bengali holiday weekend it is the most Bengali place imaginable.',
    'New Digha and Shankarpur a few kilometres along are quieter, and Mandarmani further on has the long empty stretch.'
  ],
  see: [
    { n: 'Old and New Digha beaches',
      d: 'Old Digha for the promenade and the crowd, New Digha for slightly more space.' },
    { n: 'Marine Aquarium and Research Centre',
      d: 'A ZSI facility with local Bay of Bengal species. Modest but genuine.' },
    { n: 'Shankarpur',
      d: 'A fishing harbour fifteen kilometres on, with boats landing in the morning and a quieter beach.' },
    { n: 'Mandarmani',
      d: 'Forty minutes away, with thirteen kilometres of beach you can drive on and red crabs in the millions.' },
    { n: 'Chandaneswar',
      d: 'A Shiva temple just across the Odisha border, busy in April.' }
  ],
  when: 'October to February. The monsoon sea is dangerous and the beach is reduced.',
  stay: 'Two nights.',
  move: 'Digha has a railway station with direct trains from Howrah, around four hours.',
  eat: 'Fish fry, crab and prawn at the beach stalls, and Bengali thalis at the hotels.'
},

/* ===================== SIKKIM ===================== */
'SIK-gangtok': {
  intro: [
    'Gangtok sits on a ridge at seventeen hundred metres with Kanchenjunga visible to the northwest on a clear morning, and it is the capital of what was an independent Buddhist kingdom until it voted to join India in 1975.',
    'The town is built in terraces up a steep slope, with MG Marg — a pedestrian, smoke-free, litter-free boulevard — at the centre, which is unusually civilised for an Indian city of this size.',
    'It is the base for everything in Sikkim, and the place where the permits for North Sikkim, Tsomgo and Nathu La are arranged.'
  ],
  see: [
    { n: 'Rumtek Monastery',
      d: 'Twenty-four kilometres out, the seat of the Karmapa of the Kagyu order, with a golden reliquary stupa. Carry ID; there is a security check.' },
    { n: 'Enchey and Do Drul Chorten',
      d: 'A two-hundred-year-old monastery above the town, and a stupa with a hundred and eight prayer wheels around it.' },
    { n: 'Namgyal Institute of Tibetology',
      d: 'One of the best collections of Tibetan manuscripts, thangkas and ritual objects outside Tibet.' },
    { n: 'MG Marg and the ropeway',
      d: 'The pedestrian centre, and a cable car giving a view down the valley.' },
    { n: 'Tashi Viewpoint at dawn',
      d: 'For Kanchenjunga, eight kilometres out of town.' }
  ],
  when: 'March to May and October to December. The monsoon is heavy with landslides.',
  stay: 'Two or three nights.',
  move: 'Bagdogra airport is four hours; Pakyong airport is nearby but flights are weather-dependent. Shared jeeps from Siliguri. Permits arranged here.',
  eat: 'Sikkimese and Nepali — phagshapa, gundruk, momos, and chhurpi. Try the millet beer, tongba, drunk hot through a bamboo straw.'
},

'SIK-yumthang': {
  intro: [
    'Lachung is a village at twenty-seven hundred metres in North Sikkim, and the Yumthang valley above it at three thousand five hundred and sixty-four metres is called the valley of flowers — a flat grazing meadow on a river between snow peaks, which fills with primula and rhododendron in April and May.',
    'Beyond Yumthang the road climbs to Zero Point at just over four thousand five hundred metres, where it simply stops. There is a hot spring on the valley floor and yaks grazing.',
    'It is in a restricted area and needs a permit arranged in Gangtok, which means a registered operator and a shared vehicle. The road is poor and prone to closure.'
  ],
  see: [
    { n: 'Yumthang valley',
      d: 'The meadow and the river, with the Shingba rhododendron sanctuary around it. Twenty-four species of rhododendron.' },
    { n: 'Zero Point',
      d: 'Four thousand five hundred metres, where the road ends. Snow most of the year; altitude is a real factor.' },
    { n: 'The hot springs',
      d: 'A small bathhouse across a footbridge on the valley floor.' },
    { n: 'Lachung Monastery',
      d: 'Nineteenth century, above the village, with masked dances in December.' },
    { n: 'The drive up',
      d: 'Through Chungthang along the Teesta, with waterfalls the whole way.' }
  ],
  when: 'April and May for flowers; October and November for clear weather. The road closes in heavy snow and in the monsoon.',
  stay: 'Two nights in Lachung, usually combined with Lachen and Gurudongmar.',
  move: 'Permit and registered operator required. Six to seven hours from Gangtok on a rough road.',
  eat: 'Homestay and guest house kitchens in Lachung. Carry snacks for the valley.'
},

'SIK-gurudongmar': {
  intro: [
    'Gurudongmar is a lake at five thousand four hundred and thirty metres in North Sikkim, a few kilometres from the Tibetan border, and it is one of the highest lakes in the world that can be reached by road.',
    'It is sacred to both Buddhists and Sikhs — Guru Padmasambhava and Guru Nanak are both said to have stopped here — and one portion of the lake is said never to freeze, because the Guru touched it so that herders would have water in winter.',
    'At this altitude the air has roughly half the oxygen of sea level. Visitors are allowed about twenty minutes and should take that limit seriously; people do get altitude sickness here, sometimes badly.'
  ],
  see: [
    { n: 'The lake',
      d: 'Walk the short path to the shore and the gurdwara. Do not exert yourself; do not stay long.' },
    { n: 'The drive from Lachen',
      d: 'Up through Thangu and the Chopta valley, past army posts, on a road that is often more of a riverbed.' },
    { n: 'Chopta Valley',
      d: 'At four thousand metres on the way, with rhododendron and a river. A good acclimatisation stop.' },
    { n: 'Tso Lhamo plain',
      d: 'The high plateau beyond, visible from the road, with the Tibetan border beyond it.' }
  ],
  when: 'April to June and September to November. Permits required and sometimes refused at short notice for security reasons.',
  stay: 'A dawn start from Lachen, back by afternoon. Two nights in Lachen minimum to acclimatise.',
  move: 'Registered operator and protected area permit, arranged in Gangtok. Three hours from Lachen on a very rough road.',
  eat: 'Army canteens at Thangu serve tea and Maggi. Nothing at the lake.'
},

'SIK-pelling': {
  intro: [
    'Pelling is a ridge town in West Sikkim at about two thousand metres, and its reason for existing is the view: Kanchenjunga and the Kabru and Pandim peaks stand directly in front of it, close enough to feel improper.',
    'Above it is Pemayangtse, founded in 1705, one of the oldest and most important monasteries in Sikkim, which holds a seven-tiered wooden model of Padmasambhava’s heavenly palace built by one monk over five years.',
    'Below are the ruins of Rabdentse, Sikkim’s second capital, abandoned after Nepalese attacks and now a quiet archaeological site in forest.'
  ],
  see: [
    { n: 'Kanchenjunga at dawn',
      d: 'From the Pelling helipad or any north-facing room. Clearest from October to December.' },
    { n: 'Pemayangtse Monastery',
      d: 'Nyingma, early eighteenth century, with the Zangdok Palri model on the top floor. Entry is restricted on some days.' },
    { n: 'Rabdentse ruins',
      d: 'A twenty-minute walk through forest from near Pemayangtse to the old palace site on a ridge. Usually empty.' },
    { n: 'Khecheopalri Lake',
      d: 'A sacred lake where leaves are said never to settle on the water, because birds remove them. Prayer flags and a short forest walk.' },
    { n: 'Sangachoeling and the skywalk',
      d: 'A 1697 monastery reached on foot, and a glass skywalk under a large Padmasambhava statue.' }
  ],
  when: 'March to May and October to December.',
  stay: 'Two nights.',
  move: 'Five hours from Gangtok, four from Siliguri. Shared jeeps and taxis.',
  eat: 'Hotel dining rooms, momos, and Sikkimese home cooking at the homestays.'
},

'SIK-yuksom': {
  intro: [
    'Yuksom was the first capital of Sikkim, where in 1642 three lamas consecrated the first Chogyal — the name means the meeting place of three lamas, and the stone throne they used is still there under a pine.',
    'It is a quiet village at eighteen hundred metres and the trailhead for the Goecha La trek, the classic Sikkim route to the foot of Kanchenjunga, which takes eight to ten days.',
    'Dubdi Monastery above the village, founded in 1701, is the oldest in Sikkim and is reached by a steep forty-minute walk through forest.'
  ],
  see: [
    { n: 'Norbugang Chorten and the throne',
      d: 'The coronation site, with a stone throne, a chorten and a footprint in rock, under old pines.' },
    { n: 'Dubdi Monastery',
      d: 'The oldest in the state, up a forest path. Often locked; the caretaker lives nearby.' },
    { n: 'Goecha La trek',
      d: 'Eight to ten days via Tshoka, Dzongri and Thansing to a pass facing Kanchenjunga. Permits, guide and porters required.' },
    { n: 'Khecheopalri',
      d: 'The sacred lake, an hour away, and walkable on a forest trail.' },
    { n: 'Kathok Lake',
      d: 'A small lake in the village with a monastery beside it.' }
  ],
  when: 'March to May and October to November for trekking. The monsoon is wet and leechy.',
  stay: 'Two nights, or ten days if trekking.',
  move: 'Six hours from Gangtok; two from Pelling. Trek permits arranged in Yuksom itself.',
  eat: 'Homestays and small lodges. Simple and good.'
},

'SIK-tsomgo': {
  intro: [
    'Tsomgo, also written Changu, is a glacial lake at three thousand seven hundred and fifty metres about forty kilometres from Gangtok on the old trade road to Tibet. It freezes in winter and changes colour through the year.',
    'Twenty kilometres further is Nathu La at four thousand three hundred metres, one of three open trading posts between India and China, where Indian and Chinese soldiers stand a few metres apart at the gate. It is open to Indian nationals only, on certain days, with a separate permit.',
    'Baba Harbhajan Singh’s shrine on the way is a genuinely odd and rather moving institution: a soldier who died in 1968 and whom the army still regards as on duty, with a maintained bunker and a sanctioned leave roster.'
  ],
  see: [
    { n: 'Tsomgo Lake',
      d: 'Yaks in decorated harness, a short walk round part of the shore, and a cable car up the ridge above.' },
    { n: 'Nathu La', t: 'Indian nationals only',
      d: 'The border gate, with the Chinese post facing it. Open on specified days; permit required.' },
    { n: 'Baba Mandir',
      d: 'The shrine to Harbhajan Singh, maintained by the army, with his uniform laid out.' },
    { n: 'The drive',
      d: 'The old Silk Road alignment, climbing two thousand metres in forty kilometres.' }
  ],
  when: 'April to June and September to December. The road closes in heavy snow. Permits from Gangtok, through a registered operator, with a day’s notice.',
  stay: 'A day trip from Gangtok. No accommodation permitted at the lake.',
  move: 'Shared or private taxi with permit. Three hours each way.',
  eat: 'Army canteens and stalls at the lake. Tea, Maggi and very little else.'
},

'SIK-ravangla': {
  intro: [
    'Ravangla is a small town in South Sikkim at about two thousand one hundred metres, on a ridge with a view of Kanchenjunga, and it is noticeably quieter than Gangtok or Pelling.',
    'Above it is Buddha Park at Rabong, with a forty-metre seated Buddha installed in 2013 for the 2550th birth anniversary, in landscaped grounds with a monastery and a decent museum.',
    'It is also the base for Maenam Wildlife Sanctuary, a forest climb of about three hours to a ridge at three thousand metres with red panda in it.'
  ],
  see: [
    { n: 'Buddha Park, Rabong',
      d: 'The statue, a relic chamber beneath it, and gardens with the mountains behind.' },
    { n: 'Ralang Monastery',
      d: 'Both the old and the new Palchen Choeling monastery, the latter among the largest in Sikkim, with Pang Lhabsol dances in the autumn.' },
    { n: 'Maenam Sanctuary',
      d: 'A three-hour climb through oak and magnolia to a viewpoint, with red panda, if you are extremely lucky.' },
    { n: 'Temi Tea Garden',
      d: 'The only tea estate in Sikkim, organic, with a factory tour and a bungalow.' },
    { n: 'Borong and the hot springs',
      d: 'A village below with sulphur springs on the Rangit, reached by a walk down.' }
  ],
  when: 'March to May and October to December.',
  stay: 'Two nights.',
  move: 'Three to four hours from Gangtok and from Siliguri. Shared jeeps.',
  eat: 'Homestays and a few small restaurants; Temi tea everywhere.'
},

'SIK-khangchendzonga-np': {
  intro: [
    'Khangchendzonga National Park covers a quarter of Sikkim and was inscribed by UNESCO in 2016 as a mixed site — for its ecology and for the sacred geography the Lepcha and Bhutia attach to the mountain, which is why nobody is permitted to climb to the true summit from the Indian side.',
    'It ranges from under two thousand metres to the eight thousand five hundred and eighty-six of Kanchenjunga itself, the third-highest mountain on earth, and holds snow leopard, red panda, Himalayan black bear and blue sheep.',
    'Access is by trek with permits and a registered guide. The Goecha La route from Yuksom is the standard way in.'
  ],
  see: [
    { n: 'Goecha La',
      d: 'Eight to ten days from Yuksom, with the Kanchenjunga south face from the pass at four thousand nine hundred metres. The classic Sikkim trek.' },
    { n: 'Dzongri and Thansing',
      d: 'High camps on the route, with Pandim rising directly above Thansing.' },
    { n: 'Samiti Lake',
      d: 'A glacial lake below Goecha La, usually seen at dawn on the summit day.' },
    { n: 'The rhododendron forest',
      d: 'Between Tshoka and Dzongri, spectacular in April and May.' },
    { n: 'Red panda',
      d: 'Present in the lower bamboo; a guide who knows the ground gives you a real chance.' }
  ],
  when: 'March to May and October to November. Permits through a registered operator in Yuksom or Gangtok.',
  stay: 'Eight to twelve days.',
  move: 'Yuksom is the trailhead, six hours from Gangtok. Guides and porters compulsory.',
  eat: 'Trek kitchens and trekkers’ huts. Dal bhat for a week and you will be glad of it.'
},

/* ===================== ASSAM ===================== */
'ASM-majuli': {
  intro: [
    'Majuli is a river island in the Brahmaputra and is usually described as the largest in the world, though that is now arguable — it has lost over half its area to erosion since the early twentieth century and loses more every flood season.',
    'It is the centre of the Vaishnavite satra tradition founded by Srimanta Sankardeva in the sixteenth century: monastic institutions where monks practise music, dance, mask-making and manuscript painting, and which function as the cultural spine of Assam.',
    'The Mising, Deori and Sonowal Kachari communities live on the island in stilt houses, and the whole place moves at the speed of the ferry, which is the only way in.'
  ],
  see: [
    { n: 'The satras',
      d: 'Auniati, Dakhinpat, Garamur and Kamalabari. Monks will show you the prayer hall and often perform; Samaguri is where the masks are made.' },
    { n: 'Samaguri Satra mask-making',
      d: 'Bamboo, cloth and cow dung masks for the bhaona plays, some large enough to wear as a full body. The family here has done it for generations.' },
    { n: 'Raas Mahotsav', t: 'November',
      d: 'Several days of bhaona — devotional theatre — performed across the satras. The island’s great event.' },
    { n: 'Mising villages',
      d: 'Stilt houses, handloom weaving and rice beer. Homestays in several.' },
    { n: 'The ferry crossing',
      d: 'An hour and a half from Nimati Ghat near Jorhat, with vehicles, livestock and everyone on the deck.' },
    { n: 'Birding on the sandbars',
      d: 'Winter brings pelican, stork and a great many waders to the chapories.' }
  ],
  when: 'October to March. The island floods in the monsoon and parts become unreachable.',
  stay: 'Two or three nights in a bamboo cottage or homestay.',
  move: 'Ferry from Nimati Ghat, Jorhat. Jorhat has an airport and a station. Bicycles and scooters on the island.',
  eat: 'Assamese and Mising food — fish tenga, bamboo shoot, pork with bamboo, and apong rice beer.'
},

'ASM-guwahati': {
  intro: [
    'Guwahati is the gateway to the northeast and the only large city in the region, on the south bank of the Brahmaputra where the river narrows between hills.',
    'The Kamakhya temple on Nilachal hill is one of the most important shakti peethas and a major centre of tantric practice — the deity is a yoni-shaped stone kept wet by a spring, and the Ambubachi mela in June, marking the goddess’s menstruation, closes the temple for three days and draws hundreds of thousands of pilgrims and sadhus.',
    'Umananda, on a small island in the middle of the river, is reached by ferry and holds a population of the endangered golden langur.'
  ],
  see: [
    { n: 'Kamakhya Temple',
      d: 'Queues are long; paid darshan is faster. Animal sacrifice is still practised here, which some visitors find difficult.' },
    { n: 'Umananda Island',
      d: 'Ferry from Kachari Ghat to the smallest inhabited river island, with a Shiva temple and golden langurs.' },
    { n: 'A Brahmaputra sunset cruise',
      d: 'From the ghats, with Gangetic dolphin sometimes surfacing.' },
    { n: 'Assam State Museum',
      d: 'Good on Ahom and pre-Ahom sculpture and on the region’s tribal material culture.' },
    { n: 'Pobitora',
      d: 'Fifty kilometres out, with the highest density of one-horned rhino anywhere — a good half-day if Kaziranga is not on the plan.' }
  ],
  when: 'October to March. Ambubachi in June if you want the tantric festival.',
  stay: 'Two nights.',
  move: 'Airport with flights across India, major railhead. The city is spread out; use app cabs.',
  eat: 'Assamese thalis at Khorikaa and Paradise — fish tenga, khar, pitika, and duck with ash gourd.'
},

'ASM-manas': {
  intro: [
    'Manas sits on the Bhutan border and is a World Heritage site, a tiger reserve, an elephant reserve and a biosphere reserve. It was also on the UNESCO danger list from 1992 to 2011, after the Bodo insurgency destroyed the infrastructure and wiped out the rhino population entirely.',
    'Rhinos have been reintroduced since 2006 and the park has been rebuilt largely through the involvement of former militants now employed as guards and guides, which is one of the better conservation stories in India.',
    'It holds species found almost nowhere else in the country: pygmy hog, hispid hare, golden langur and Bengal florican.'
  ],
  see: [
    { n: 'Jeep safaris from Bansbari',
      d: 'Grassland and forest with the Bhutan hills rising behind. Rhino, elephant, gaur and wild buffalo.' },
    { n: 'Rafting the Manas river',
      d: 'A gentle float from Mathanguri down, with the forest on both banks and good birding.' },
    { n: 'Mathanguri',
      d: 'A forest bungalow on the river at the Bhutan border, one of the most beautifully sited in India.' },
    { n: 'Golden langur',
      d: 'Found only here and in Bhutan, in the riverine forest.' },
    { n: 'Birding',
      d: 'Over four hundred and fifty species; Bengal florican, great hornbill and swamp francolin.' }
  ],
  when: 'November to April. Closed in the monsoon.',
  stay: 'Two or three nights.',
  move: 'Barpeta Road is the railhead, forty kilometres; Guwahati is four hours.',
  eat: 'Lodge and bungalow kitchens; the community-run lodges near Bansbari are good.'
},

'ASM-sivasagar': {
  intro: [
    'Sivasagar was the capital of the Ahom kingdom, which ruled upper Assam for six hundred years from 1228 and repelled seventeen Mughal invasions — the only major Indian power the Mughals never subdued.',
    'What survives is a group of brick monuments around a large tank: the Talatal Ghar, a seven-storey palace of which four are underground with tunnels running out of it; the Rang Ghar, a two-storey amphitheatre from the 1740s that is among the oldest surviving pavilions of its kind in Asia; and the Ahom royal tombs, pyramidal brick mounds called maidams at Charaideo.',
    'The whole thing is almost entirely unvisited despite being one of the more distinctive architectural traditions in India.'
  ],
  see: [
    { n: 'Rang Ghar',
      d: 'An oval sports pavilion with a roof shaped like an inverted boat, built with a mortar of rice paste and duck eggs.' },
    { n: 'Talatal Ghar and Kareng Ghar',
      d: 'A palace with three underground storeys and tunnels; the accessible parts are open.' },
    { n: 'Charaideo maidams',
      d: 'Thirty kilometres away, the Ahom royal burial mounds, inscribed by UNESCO in 2024.' },
    { n: 'Sivasagar tank',
      d: 'A hundred and twenty-nine acres dug in 1734, with three temples on the bank and the water standing above the level of the town.' },
    { n: 'The tea gardens',
      d: 'Upper Assam is the heart of Assam tea; several estates nearby take visitors.' }
  ],
  when: 'October to March.',
  stay: 'One or two nights.',
  move: 'Simaluguri is the railhead; Jorhat airport is ninety minutes. Autos locally.',
  eat: 'Assamese food; the tea estate bungalows do a good colonial-era lunch.'
},

'ASM-tezpur': {
  intro: [
    'Tezpur is on the north bank of the Brahmaputra and claims to be the oldest town in Assam, with sculpture fragments from the sixth to tenth centuries scattered through it — door frames, panels and a stone ring at Da-Parbatia that is the finest Gupta-period carving in the northeast.',
    'The name means town of blood, from a mythological battle, and the town has a pleasant park, a hill with a view over the river, and a general air of nothing very much happening.',
    'It is the usual overnight between Guwahati and Arunachal or Nameri, and the gateway to Tawang.'
  ],
  see: [
    { n: 'Da-Parbatia',
      d: 'A sixth-century carved stone doorframe, the earliest surviving sculpture in Assam, in situ in a field.' },
    { n: 'Agnigarh',
      d: 'A hill above the river with sculpture and a view, attached to a story about a fortress of fire.' },
    { n: 'Cole Park',
      d: 'Colonial-era park with two enormous stone pillars and carved panels collected from around the district.' },
    { n: 'Bhairabi and Mahabhairab temples',
      d: 'Both old foundations with later buildings over them.' },
    { n: 'Nameri National Park',
      d: 'Thirty-five kilometres north, with rafting on the Jia Bhoroli and the white-winged wood duck.' }
  ],
  when: 'October to March.',
  stay: 'One night.',
  move: 'Tezpur has an airport and is four hours from Guwahati. The road to Tawang starts here.',
  eat: 'Assamese thalis and good river fish.'
},

'ASM-dibru-saikhowa': {
  intro: [
    'Dibru-Saikhowa is a biosphere reserve at the confluence of the Brahmaputra and the Lohit in far eastern Assam — mostly swamp forest, wet grassland and sandbars, and almost entirely surrounded by water.',
    'Its distinction is a population of feral horses, descended from animals abandoned by the army after the Second World War, which now live wild on the grasslands and are found nowhere else in India.',
    'It is also one of the best birding sites in the country, with the white-winged wood duck, Bengal florican and a long list of grassland specialists, and the Brahmaputra here holds Gangetic dolphin.'
  ],
  see: [
    { n: 'Boat trips on the Brahmaputra',
      d: 'From Guijan, through channels and past sandbars, with dolphin and a great many birds.' },
    { n: 'The feral horses',
      d: 'On the grasslands in the eastern part of the reserve, best reached by boat and then on foot.' },
    { n: 'Maguri-Motapung Beel',
      d: 'A wetland on the edge of the reserve and one of the finest birding spots in India. It was badly damaged by a 2020 gas blowout and has partly recovered.' },
    { n: 'Birding the grasslands',
      d: 'Over three hundred and fifty species. Marsh babbler, Jerdon’s babbler and black-breasted parrotbill.' },
    { n: 'Tinsukia tea gardens',
      d: 'On the approach, with estate bungalows.' }
  ],
  when: 'November to March. The reserve floods in the monsoon.',
  stay: 'Two nights at Guijan or in Tinsukia.',
  move: 'Tinsukia is the railhead, twelve kilometres from Guijan. Dibrugarh airport is ninety minutes.',
  eat: 'Eco-camp kitchens at Guijan; Assamese food in Tinsukia.'
},

/* ===================== MEGHALAYA ===================== */
'MEG-cherrapunji': {
  intro: [
    'Sohra, which the British called Cherrapunji, sits on a plateau edge at about fourteen hundred metres above the Bangladesh plain, and it holds the world records for the most rainfall in a month and in a year — around twenty-six thousand millimetres in 1861.',
    'That water falls off the escarpment in a series of very tall waterfalls and then disappears into limestone, which has produced some of the longest cave systems in the subcontinent.',
    'The paradox is that Sohra has a water shortage in the dry season: the rain arrives all at once, runs off bare rock stripped by centuries of grazing and burning, and is gone.'
  ],
  see: [
    { n: 'Nohkalikai Falls',
      d: 'Three hundred and forty metres in a single drop, the tallest plunge waterfall in India, with a turquoise pool below. Often in cloud; wait.' },
    { n: 'Seven Sisters Falls',
      d: 'Seven streams off the escarpment edge, spectacular in the monsoon and dry by March.' },
    { n: 'Mawsmai and Arwah caves',
      d: 'Limestone caves with formations and fossils, lit and walkable.' },
    { n: 'Living root bridges at Nongriat',
      d: 'The famous double-decker is a steep descent from Tyrna; see its own entry.' },
    { n: 'The view into Bangladesh',
      d: 'From the plateau edge at Thangkharang, the plain spreading flat to the horizon.' }
  ],
  when: 'September to May. The monsoon from June is extraordinary and makes everything difficult; October gives full falls with workable weather.',
  stay: 'Two nights.',
  move: 'Fifty-four kilometres from Shillong, two hours. Taxis and shared vehicles.',
  eat: 'Khasi food — jadoh, dohneiiong, and tungrymbai — at small local places. Orange Roots in Shillong for vegetarian.'
},

'MEG-nongriat': {
  intro: [
    'Nongriat is a Khasi village at the bottom of a gorge below Sohra, reached by around three thousand steps down, and it holds the double-decker living root bridge — two tiers of ficus elastica roots trained across a stream over several generations.',
    'The bridges are grown, not built. Khasi families guide aerial roots of the rubber fig across a stream using bamboo scaffolding and hollowed betel trunks, and the structure takes fifteen to thirty years to become usable and then strengthens for a century or more.',
    'There are dozens across the state. The double-decker is the famous one; Mawlynnong and Riwai have easier ones, and Rangthylliang and Nongbareh have longer and less visited examples.'
  ],
  see: [
    { n: 'The double-decker bridge',
      d: 'Two tiers over the Umshiang. The descent from Tyrna is about three thousand steps; allow two hours down and three up.' },
    { n: 'Rainbow Falls',
      d: 'An hour and a half further on from Nongriat, with a blue pool and a rainbow in the spray in the morning. Fewer people get this far.' },
    { n: 'Staying overnight in Nongriat',
      d: 'Several basic homestays. Staying means you see the bridge without the day crowd and you do not climb back up exhausted.' },
    { n: 'The steel wire bridges',
      d: 'Several suspension crossings on the way down, which bounce considerably.' },
    { n: 'Umkar and other root bridges',
      d: 'Smaller single-tier bridges on the same network of paths.' }
  ],
  when: 'October to April. The monsoon makes the steps genuinely dangerous and the river unfordable.',
  stay: 'One night in the village. Carry cash; there is nothing down there.',
  move: 'Tyrna is the trailhead, twenty minutes from Sohra by taxi. Then on foot only. Porters available for bags.',
  eat: 'Homestay kitchens — rice, dal, eggs and whatever is available.'
},

'MEG-shillong': {
  intro: [
    'Shillong sits at fifteen hundred metres and was the capital of undivided Assam, which gave it a substantial British presence and the nickname Scotland of the East, mostly for the pine and the drizzle.',
    'It is a Khasi city — matrilineal, Christian, and with the best live music scene in India. The rock and blues tradition here is serious, there are more guitar shops per head than anywhere else in the country, and gospel choirs are genuinely good.',
    'Ward’s Lake and the Don Bosco Museum are the sights; the markets and the music are the reason to stay.'
  ],
  see: [
    { n: 'Iewduh market',
      d: 'One of the oldest and largest markets in the northeast, run largely by women, selling everything including fermented fish and live chickens.' },
    { n: 'Don Bosco Museum of Indigenous Cultures',
      d: 'Seven floors on the cultures of the northeast, with a rooftop skywalk. Excellent and unexpectedly thorough.' },
    { n: 'Ward’s Lake and the Botanical Garden',
      d: 'A colonial-era lake with a wooden bridge in the middle of town.' },
    { n: 'Laitlum Canyons',
      d: 'Twenty-five kilometres out, a grassland ridge with a drop into a gorge and a village at the bottom reached by three thousand steps.' },
    { n: 'Live music',
      d: 'Ask at Cafe Shillong or Dylan’s Cafe. Something is usually on.' },
    { n: 'Mawphlang sacred grove',
      d: 'Twenty-five kilometres away, a Khasi sacred forest where nothing may be removed, with Khasi guides who explain the monoliths and the taboos.' }
  ],
  when: 'September to May. The Shillong Cherry Blossom Festival is in November; Wangala and Nongkrem in the autumn.',
  stay: 'Two or three nights.',
  move: 'Three hours from Guwahati by shared taxi, or a helicopter service. Umroi airport has limited flights.',
  eat: 'Khasi food at Trattoria in Police Bazaar — jadoh and dohkhlieh — and very good bakeries.'
},

'MEG-dawki': {
  intro: [
    'Dawki is on the Bangladesh border, and the Umngot river there runs so clear in the dry season that boats appear to float in mid-air above the riverbed — the stones on the bottom are visible at several metres.',
    'The clarity is seasonal. From roughly November to April it is extraordinary; in the monsoon the river runs brown and fast.',
    'The suspension bridge at Dawki, built in 1932, marks the crossing, and you can see Bangladeshi trucks queued on the far side. The whole stretch has become extremely popular with Indian visitors and the boat queues in season are long.'
  ],
  see: [
    { n: 'A boat on the Umngot',
      d: 'From Dawki or, better, from Shnongpdeng upstream where the water is clearer and there are fewer boats. Go early.' },
    { n: 'Shnongpdeng',
      d: 'Camping, kayaking, cliff jumping and snorkelling in the river. Quieter than Dawki and a better base.' },
    { n: 'The Dawki suspension bridge',
      d: 'The 1932 crossing, with the border post beside it.' },
    { n: 'Krang Suri Falls',
      d: 'An hour away, a fall into a blue pool you can swim in. One of the best in Meghalaya.' },
    { n: 'Mawlynnong',
      d: 'An hour away, and usually combined.' }
  ],
  when: 'November to April for clear water. Avoid the monsoon entirely for this.',
  stay: 'A night at Shnongpdeng, or a day trip from Shillong.',
  move: 'Eighty-two kilometres from Shillong, three hours. Shared taxis.',
  eat: 'Riverside stalls doing grilled fish; camp kitchens at Shnongpdeng.'
},

'MEG-mawlynnong': {
  intro: [
    'Mawlynnong was named the cleanest village in Asia by a travel magazine in 2003, and whatever the methodology, the claim has held up: bamboo bins on every path, no litter anywhere, a community rule against plastic, and children who sweep as a matter of course.',
    'It is a Khasi village of about five hundred people in the East Khasi Hills near the Bangladesh border, with a living root bridge at Riwai nearby and a bamboo skywalk giving a view over the plains.',
    'It has become a significant tourist destination, which the village manages itself through a community tourism committee, and the money goes back into the village.'
  ],
  see: [
    { n: 'The village',
      d: 'Walk the paths. The cleanliness is the attraction and it is genuinely striking.' },
    { n: 'Riwai root bridge',
      d: 'Two kilometres away, a single-tier living root bridge, far easier to reach than Nongriat’s.' },
    { n: 'The sky view',
      d: 'A bamboo tower eighty feet up with a view over Bangladesh.' },
    { n: 'Nohwet balancing rock',
      d: 'A boulder balanced on a small base nearby, which nobody can explain.' },
    { n: 'Homestays',
      d: 'Several in the village, run by families. Staying is better than visiting.' }
  ],
  when: 'September to May.',
  stay: 'One night.',
  move: 'Ninety kilometres from Shillong, three hours. Often combined with Dawki.',
  eat: 'Homestay cooking and a few small eateries. Khasi food, simple and good.'
},

'MEG-mawsynram': {
  intro: [
    'Mawsynram has overtaken Sohra for the title of wettest inhabited place on earth, with an annual average of around eleven thousand eight hundred millimetres — about thirty times London.',
    'The village sits where moist air off the Bay of Bengal hits the Khasi hills and is forced up, and in the monsoon the rain is continuous for weeks. Villagers traditionally wore full-body knup — a bamboo and banana-leaf shell worn like a shield.',
    'Mawjymbuin cave nearby holds a stalagmite shaped like a lingam, and the village itself is otherwise quiet and ordinary, which is the surprise.'
  ],
  see: [
    { n: 'Mawjymbuin Cave',
      d: 'A limestone cave with a large lingam-shaped stalagmite under a dome of rock, formed by dripping water.' },
    { n: 'The monsoon', t: 'June to September',
      d: 'If you want to understand what this amount of rain means, come then. Bring more waterproofing than you think.' },
    { n: 'Jakrem hot springs',
      d: 'Sulphur springs twenty kilometres away, used locally for skin conditions.' },
    { n: 'The Khasi villages on the road',
      d: 'Betel plantations, orange groves and monoliths along the way from Shillong.' }
  ],
  when: 'September to May for access; June to August for the rain itself.',
  stay: 'A day trip from Shillong or Sohra; minimal accommodation.',
  move: 'Sixty kilometres from Shillong, two hours. Taxis.',
  eat: 'A couple of small places. Carry food.'
},

'MEG-balpakram': {
  intro: [
    'Balpakram is a plateau in the Garo Hills of western Meghalaya, and in Garo belief it is the land of perpetual winds where spirits of the dead pass before moving on. The Garo regard it as a sacred landscape rather than a park, and the names of features on it belong to that cosmology.',
    'It is a national park of deep gorges, caves and forest, with Asiatic elephant, clouded leopard, red panda at its western limit, and the lesser panda and marbled cat recorded.',
    'Almost nobody visits. The Garo Hills get a tiny fraction of the traffic that the Khasi and Jaintia Hills do.'
  ],
  see: [
    { n: 'The plateau edge',
      d: 'Gorges dropping away with the Simsang river below. The views are the main thing and there is no infrastructure.' },
    { n: 'Siju Cave',
      d: 'On the way, one of the longest caves in India with a river running through and a bat colony.' },
    { n: 'Nokrek Biosphere Reserve',
      d: 'North of Balpakram, with wild citrus — the ancestor of cultivated orange — growing in the forest.' },
    { n: 'Wangala festival', t: 'November',
      d: 'The Garo harvest festival at Asanang near Tura, with a hundred drums.' },
    { n: 'Tura peak',
      d: 'A climb above the Garo Hills district town, with a view across to Bangladesh.' }
  ],
  when: 'November to March. The monsoon makes the roads impassable.',
  stay: 'Two nights, based at Baghmara or Tura.',
  move: 'Tura is the regional centre, a long day from Guwahati or Shillong. Baghmara is the nearest town to the park. Permits at the forest office.',
  eat: 'Garo food — pork with bamboo shoot and chillies — in Tura. Carry supplies for the park.'
},

/* ===================== ARUNACHAL PRADESH ===================== */
'ARP-tawang': {
  intro: [
    'Tawang sits at about three thousand metres in the far northwest of Arunachal, and the monastery there is the largest in India and the second largest in the world after the Potala. It was founded in 1680 and has around four hundred and fifty monks.',
    'The sixth Dalai Lama was born here, and the fourteenth came through on his escape from Tibet in 1959. China claims the whole district, which is why there is a large army presence and why the road matters.',
    'Getting there means crossing Sela Pass at four thousand one hundred and seventy metres, which is snowbound for parts of the year, and the drive from Tezpur takes two long days. A permit is required for all visitors.'
  ],
  see: [
    { n: 'Tawang Monastery',
      d: 'The assembly hall with an eight-metre gilded Buddha, and a library of manuscripts. Morning prayers are open.' },
    { n: 'Sela Pass and Paradise Lake',
      d: 'Four thousand one hundred and seventy metres, with a lake just below that freezes in winter.' },
    { n: 'Jaswant Garh',
      d: 'A memorial to a soldier who held a position alone for several days in the 1962 war. Maintained by the army, who serve tea.' },
    { n: 'Nuranang Falls',
      d: 'A hundred metres, below Sela on the Tawang side, and spectacular.' },
    { n: 'Bum La',
      d: 'The border pass at four thousand six hundred metres, open to Indian nationals with an additional army permit.' },
    { n: 'Pangateng Tso and Sangetsar',
      d: 'High lakes near the border, the latter created by an earthquake with dead trees standing in it.' }
  ],
  when: 'April to October. Sela Pass closes in snow; check before travelling. Permits — ILP for Indians, PAP for foreigners — are mandatory.',
  stay: 'Three nights, with two days of driving each way.',
  move: 'Two days from Tezpur via Dirang and Bomdila. Helicopter services from Guwahati are weather-dependent and often cancelled.',
  eat: 'Monpa food — thukpa, momos, zan, and butter tea. Yak cheese in the market.'
},

'ARP-ziro': {
  intro: [
    'Ziro is a valley at about fifteen hundred metres in central Arunachal, home to the Apatani, who farm wet rice and fish in the same terraced fields without using any animal power or machinery — a system studied as a model of sustainable intensive agriculture.',
    'Older Apatani women wear nose plugs and facial tattoos, which were historically meant to make them less attractive to raiders. The practice stopped in the 1970s, so the last generation to carry it is now elderly.',
    'The Ziro Festival of Music, held in September, has become one of the better outdoor music festivals in India, in paddy fields with bamboo stages.'
  ],
  see: [
    { n: 'The Apatani villages',
      d: 'Hong, Hija and Bamin-Michi, with bamboo houses, sacred groves and the characteristic village layout.' },
    { n: 'The rice-fish fields',
      d: 'Terraces with rice and fish raised together and irrigated by bamboo channels. Best at transplanting in May or harvest in September.' },
    { n: 'Talley Valley',
      d: 'A sanctuary of silver fir and rhododendron above the valley, with a trek in and camping.' },
    { n: 'Ziro Festival of Music', t: 'September',
      d: 'Four days of independent music in the paddy fields. Book accommodation months ahead.' },
    { n: 'Meghna cave temple',
      d: 'A rock shrine on a hill, with a view over the valley.' }
  ],
  when: 'March to October. September and October for harvest and the festival. ILP or PAP required.',
  stay: 'Three nights in a homestay.',
  move: 'Naharlagun is the railhead, a hundred kilometres and four hours. Lilabari airport in Assam is the nearest.',
  eat: 'Apatani food — pika pila, boiled greens, river fish, and apong rice beer served from a bamboo mug.'
},

'ARP-namdapha': {
  intro: [
    'Namdapha is the third-largest national park in India and the most biodiverse protected area in the country, running from two hundred metres to over four thousand five hundred in a single unbroken gradient — tropical rainforest to alpine snow.',
    'It is the only protected area in the world with four large cat species: tiger, leopard, clouded leopard and snow leopard. It also holds the hoolock gibbon, the red panda, and the Namdapha flying squirrel, known from a single specimen collected in 1981 and never seen again.',
    'There are no roads inside, no safaris and no lodges. You walk, with permits, guides and porters, and stay in forest huts. It is the hardest wildlife destination in India to visit and the most rewarding for anyone serious about forest.'
  ],
  see: [
    { n: 'The trek to Hornbill and Firmbase',
      d: 'Several days in from Deban along the Noa-Dihing, staying in forest camps. Leeches, river crossings and extraordinary forest.' },
    { n: 'Deban',
      d: 'The forest rest house at the entrance, on the river, and a destination in itself for birders.' },
    { n: 'Birding',
      d: 'Over four hundred and twenty-five species, including seven hornbills and the white-bellied heron, one of the rarest birds on earth.' },
    { n: 'Hoolock gibbon',
      d: 'India’s only ape, heard before seen, calling at dawn in the canopy.' },
    { n: 'Miao',
      d: 'The entry town, with a Tibetan refugee settlement and the park office.' }
  ],
  when: 'November to March. Permits from the park office at Miao; a guide is compulsory. Foreigners need a PAP.',
  stay: 'Five to eight days.',
  move: 'Dibrugarh or Mohanbari airport, then a long drive to Miao. Everything beyond Deban is on foot.',
  eat: 'Rest house and camp kitchens. Carry supplies; nothing is available inside.'
},

'ARP-mechuka': {
  intro: [
    'Mechuka is a valley at about eighteen hundred metres in the Shi-Yomi district, twenty-nine kilometres from the Chinese border, and it opened to visitors only recently. The Siyom river runs through a broad flat valley with bare hills on both sides, and it looks far more like Ladakh than like the rest of Arunachal.',
    'The people are Memba, of Tibetan descent, with a four-hundred-year-old Nyingma monastery on a hill above the village, and the valley also has Adi, Ramo and Bokar communities.',
    'The road in is bad and the flight is unreliable. That is why almost nobody is there.'
  ],
  see: [
    { n: 'Samten Yongcha Monastery',
      d: 'Four hundred years old, Nyingma, on a ridge above the valley with a view down the Siyom.' },
    { n: 'The valley floor',
      d: 'Walk or cycle out along the river. Wooden hanging bridges, grazing land and almost no traffic.' },
    { n: 'Dorjeeling village',
      d: 'A Memba village further up the valley towards the border.' },
    { n: 'The hanging bridge',
      d: 'A cane-and-bamboo crossing of the Siyom, which bounces a great deal.' },
    { n: 'Hanuman Camp',
      d: 'An army post on the way with a view and a tea stall.' }
  ],
  when: 'March to October. ILP or PAP required.',
  stay: 'Two or three nights.',
  move: 'Aalo is the staging town; the road from there takes six to eight hours and is rough. Pawan Hans helicopters from Aalo when weather allows.',
  eat: 'Homestays and a few small places. Memba and Adi food.'
},

'ARP-dirang-bomdila': {
  intro: [
    'Dirang and Bomdila are the two overnight stops on the two-day drive from Assam to Tawang, and both are worth more than that.',
    'Dirang sits at fifteen hundred metres in a valley with hot springs, an old Monpa stone village of tightly packed houses, and a national yak research centre — the only one in India.',
    'Bomdila is higher at two thousand four hundred metres, with a Gelugpa monastery, apple orchards and a view of the Kangto massif on the Tibetan border.'
  ],
  see: [
    { n: 'Dirang Dzong',
      d: 'The old Monpa village, with stone houses, a small fort and a kitchen tradition still in use.' },
    { n: 'The hot springs',
      d: 'Sulphur pools by the river at Dirang, used locally.' },
    { n: 'National Research Centre on Yak',
      d: 'Open to visitors, with yak and yak-cattle crosses, and research on high-altitude livestock.' },
    { n: 'Bomdila Monastery',
      d: 'Gelugpa, built in 1965 by the twelfth reincarnate of Tsona Gontse Rinpoche, with a view over the valley.' },
    { n: 'Sangti Valley',
      d: 'Fifteen kilometres from Dirang, where black-necked cranes used to winter and a few still appear. Apple orchards and a trout farm.' }
  ],
  when: 'March to October. ILP or PAP required.',
  stay: 'A night at each, en route to Tawang.',
  move: 'On the Tezpur–Tawang road. Shared Sumos run the route.',
  eat: 'Monpa and Assamese food at the lodges; Dirang has a few good small places.'
},

/* ===================== NAGALAND ===================== */
'NAG-kohima': {
  intro: [
    'Kohima was where the Japanese advance into India was stopped in 1944, in a battle fought partly across the tennis court of the deputy commissioner’s bungalow — the court is still marked out in the war cemetery, with the white lines in concrete between the graves.',
    'The British National Army Museum voted Kohima and Imphal together Britain’s greatest battle, ahead of Waterloo and D-Day. The cemetery is immaculately kept and carries the Kohima epitaph: when you go home, tell them of us and say, for your tomorrow, these gave their today.',
    'The town is the Nagaland capital, Angami Naga, and the base for the Hornbill Festival at Kisama ten kilometres away.'
  ],
  see: [
    { n: 'Kohima War Cemetery',
      d: 'Fourteen hundred graves on a terraced hillside, with the tennis court marked. One of the most affecting war sites anywhere.' },
    { n: 'Hornbill Festival', t: '1 to 10 December',
      d: 'All the major Naga tribes at the Kisama heritage village, with morungs, dance, wrestling, chilli-eating and a great deal of rice beer. Book accommodation months ahead.' },
    { n: 'Khonoma',
      d: 'Twenty kilometres away, the village that held out longest against the British, now India’s first green village with a community-declared hunting ban and an alder-based terrace farming system.' },
    { n: 'Nagaland State Museum',
      d: 'Good on the material culture of the sixteen major tribes.' },
    { n: 'Dzukou Valley',
      d: 'The trek from Viswema or Jakhama; see its own entry.' }
  ],
  when: 'October to April. December for the Hornbill Festival. ILP required for Indian visitors; foreigners need to register.',
  stay: 'Two or three nights.',
  move: 'Dimapur is the railhead and airport, three hours below. Shared taxis.',
  eat: 'Naga food — smoked pork with akhuni or anishi, bamboo shoot, and the raja mircha chilli, which is among the hottest in the world. Treat it with respect.'
},

'NAG-dzukou': {
  intro: [
    'The Dzukou valley sits at around two thousand four hundred metres on the Nagaland–Manipur border, and it is a shallow U-shaped valley floored with dense dwarf bamboo that has been cropped into a continuous green carpet, cut by a stream in a gully.',
    'In June and July the Dzukou lily, which grows nowhere else, flowers across it. In winter the stream freezes and there is frost on the bamboo.',
    'The trek in is three to five hours from Viswema or Jakhama, and there is a single rest house and a cave shelter at the top. It is the best walk in the northeast.'
  ],
  see: [
    { n: 'The valley floor',
      d: 'Walk across the bamboo to the stream and up the far side. The scale only registers when you are in the middle of it.' },
    { n: 'The Dzukou lily', t: 'June and July',
      d: 'Endemic to this valley. Also rhododendron and aconitum in season.' },
    { n: 'The two approaches',
      d: 'Viswema is steeper and shorter; Jakhama is longer and gentler. Either is three to five hours.' },
    { n: 'The rest house and caves',
      d: 'Dormitory accommodation and a kitchen, plus caves used as shelter. Carry a sleeping bag; it is cold.' },
    { n: 'Japfu Peak',
      d: 'Nagaland’s second-highest, with the world’s tallest rhododendron tree recorded on it, reachable from the same side.' }
  ],
  when: 'June and July for the lily; October to December for clear weather. January and February are frozen and beautiful.',
  stay: 'Two days and a night minimum.',
  move: 'Viswema or Jakhama, around an hour from Kohima. Guides available at the base; ILP required.',
  eat: 'The rest house kitchen, or carry your own. Nothing else up there.'
},

'NAG-longwa': {
  intro: [
    'Longwa is a Konyak village in Mon district sitting exactly on the India–Myanmar border — the line runs through the chief’s house, so he eats in India and sleeps in Myanmar, and the villagers hold dual citizenship of a sort.',
    'The Konyak were headhunters until the practice was suppressed in the 1960s, and the last men to have taken heads are now very old. They wear brass head pendants — one per head taken — and facial tattoos earned for the same, and they are generally willing to talk about it.',
    'The village is also known for gunsmithing: handmade muzzle-loaders are produced here, and opium use is common and openly discussed.'
  ],
  see: [
    { n: 'The Angh’s house',
      d: 'The chief’s longhouse, straddling the border, with carved posts and animal skulls. Visits are arranged respectfully through a guide.' },
    { n: 'The tattooed elders',
      d: 'A dwindling number of men with facial tattoos and brass pendants. Ask permission before photographing and offer something.' },
    { n: 'The border pillar',
      d: 'A short walk, with Myanmar on the other side and effectively no control.' },
    { n: 'Aoleang festival', t: 'early April',
      d: 'The Konyak spring festival, six days of dance, feasting and ritual. The best time to be in Mon.' },
    { n: 'Shangnyu and Hongphoi',
      d: 'Other Konyak villages nearby with carved wooden monoliths and morungs.' }
  ],
  when: 'October to April; April for Aoleang. ILP required, and Mon district roads are poor.',
  stay: 'Two nights in a village homestay.',
  move: 'Mon town is a long rough drive from Dimapur or from Sonari in Assam. Longwa is forty kilometres on from Mon, two hours.',
  eat: 'Konyak home cooking — pork, yam, bamboo shoot and rice. Not for the squeamish.'
},

/* ===================== MANIPUR ===================== */
'MNP-loktak': {
  intro: [
    'Loktak is the largest freshwater lake in the northeast, and it is covered in phumdis — floating islands of matted vegetation, soil and organic matter, some large enough to live on and most of them roughly circular, which from the air make the lake look like a honeycomb.',
    'Fishermen build huts on the phumdis and cut circular fish pens into them. The rings are visible from the hills above and are among the more extraordinary human-made landscapes anywhere.',
    'The lake has been damaged by a barrage built in 1983, which keeps water levels permanently high and has thinned the phumdis, and by nutrient loading. It remains remarkable.'
  ],
  see: [
    { n: 'The view from Sendra or Thanga',
      d: 'The hill viewpoints that show the phumdi rings laid out across the water.' },
    { n: 'A boat among the phumdis',
      d: 'From Thanga or Moirang, through the channels between floating islands, past fishing huts.' },
    { n: 'Keibul Lamjao',
      d: 'The floating national park at the southern end; see its own entry.' },
    { n: 'Moirang',
      d: 'Where the INA flag was first raised on Indian soil in 1944, with a museum, and the centre of the Khamba-Thoibi legend.' },
    { n: 'Staying on a phumdi',
      d: 'A few homestays on the floating islands at Thanga. Basic and unforgettable.' }
  ],
  when: 'October to March. ILP required for Indian visitors. Check the current security situation in Manipur before travelling.',
  stay: 'Two nights.',
  move: 'Forty-eight kilometres from Imphal, under two hours.',
  eat: 'Meitei food — eromba, singju, ngari fermented fish — and lake fish at the homestays.'
},

'MNP-keibul-lamjao': {
  intro: [
    'Keibul Lamjao is the only floating national park in the world: forty square kilometres of phumdi at the southern end of Loktak, thick enough to walk on in places and to support a large deer.',
    'That deer is the sangai, the Manipur brow-antlered deer, which was declared extinct in 1951 and then found here — fourteen animals. The population is now somewhere over two hundred and sixty and exists nowhere else on earth.',
    'The sangai walks on the floating mat with a distinctive gait, which is why it is also called the dancing deer. Seeing one takes patience and a watchtower.'
  ],
  see: [
    { n: 'The watchtowers',
      d: 'Several on the park edge and on hillocks inside. Dawn and dusk give the best chance of sangai.' },
    { n: 'Walking on the phumdi',
      d: 'With a guide, on the thicker mats. The ground moves under you, which is the point.' },
    { n: 'Boat into the park',
      d: 'Channels cut through the floating vegetation, with birds and occasional deer.' },
    { n: 'Pabot and Toya hillocks',
      d: 'Rises within the park giving a view across the mat.' },
    { n: 'The Loktak phumdi rings',
      d: 'Immediately north, and best combined.' }
  ],
  when: 'October to March; the thinning of the phumdi in the dry season concentrates the deer.',
  stay: 'A day from Imphal or Loktak. Permits at the park office.',
  move: 'Fifty-three kilometres from Imphal. Taxis; a guide is needed to walk on the phumdi.',
  eat: 'Nothing in the park. Eat at Thanga or Moirang.'
},

'MNP-imphal': {
  intro: [
    'Imphal is the Manipuri capital, in a valley ringed by hills, and it holds two things worth going for. The first is Ima Keithel, the mothers’ market, run entirely by around five thousand women and operating in some form for five hundred years — the largest all-women market in the world.',
    'The second is the war history: Imphal and Kohima together stopped the Japanese advance in 1944, and there are Commonwealth and Indian war cemeteries and a good Imphal Peace Museum at Red Hill, funded partly by Japanese donors.',
    'The Kangla Fort in the centre was the seat of the Manipuri kings and is now partly open. Manipur is also the birthplace of modern polo.'
  ],
  see: [
    { n: 'Ima Keithel',
      d: 'Three buildings of women traders selling vegetables, fish, textiles and household goods. Go in the morning.' },
    { n: 'Kangla Fort',
      d: 'The royal seat, with temples, a moat and the reconstructed Kangla Sha dragons.' },
    { n: 'Imphal War Cemetery and the Peace Museum',
      d: 'The Commonwealth cemetery in the city, and the museum at Red Hill where some of the heaviest fighting happened.' },
    { n: 'Manipur State Museum',
      d: 'Including the royal polo gear — the game was codified here before the British took it up.' },
    { n: 'Shree Govindajee Temple',
      d: 'The royal Vaishnavite temple, with Manipuri raas leela dance performed on festival days.' }
  ],
  when: 'October to March. ILP required. Manipur has seen serious ethnic conflict since 2023; check the current situation and local advice carefully before travelling.',
  stay: 'Two nights.',
  move: 'Imphal has an airport with flights from Kolkata, Guwahati and Delhi.',
  eat: 'Meitei food — chamthong, eromba, singju and black rice kheer. Luxmi Kitchen for a proper thali.'
},

/* ===================== MIZORAM ===================== */
'MIZ-aizawl': {
  intro: [
    'Aizawl is built along ridge tops at about a thousand metres, with houses stacked down both sides of the slopes on stilts, and it is one of the more vertical cities anywhere — streets are at different levels of the same buildings.',
    'Mizoram is around ninety per cent Christian, has among the highest literacy rates in India, and Aizawl on a Sunday is almost entirely shut, with the churches full and choral singing audible across the valleys.',
    'There is very little in the way of monuments. The reason to come is the city’s position, the markets, and the fact that Mizo society is unusually orderly — the no-horn rule in traffic and the unmanned vegetable stalls where you leave money in a box are both real.'
  ],
  see: [
    { n: 'Bara Bazar',
      d: 'The main market, with Mizo produce, river fish and mountain vegetables, much of it sold by women from surrounding villages.' },
    { n: 'Durtlang Hills',
      d: 'North of the city, with a view over Aizawl stacked along its ridge.' },
    { n: 'Mizoram State Museum',
      d: 'Small, on Mizo material culture, traditional dress and the bamboo dance.' },
    { n: 'Reiek',
      d: 'Thirty kilometres away, a cliff above a model Mizo village, with a short climb and a long view into Bangladesh.' },
    { n: 'Sunday in Aizawl',
      d: 'Everything closed and churches singing. Plan around it, or go and listen.' }
  ],
  when: 'October to March. Chapchar Kut, the spring festival with the bamboo dance, is in March. ILP required.',
  stay: 'Two nights.',
  move: 'Lengpui airport is thirty-five kilometres, with flights from Kolkata and Guwahati. The road from Silchar is long.',
  eat: 'Mizo food — bai, sawhchiar, smoked pork with mustard leaves. Lightly spiced and mostly boiled, which is unusual for India.'
},

'MIZ-phawngpui': {
  intro: [
    'Phawngpui, the Blue Mountain, is the highest point in Mizoram at two thousand one hundred and fifty-seven metres, in the far south near the Myanmar border, and it is sacred in Mizo belief as the home of spirits.',
    'The summit is a grassy plateau with a sheer cliff on one side called Thlazuang Khàm, and the slopes carry oak, rhododendron and a great many orchids. It is a national park with goral, serow, clouded leopard and the Blyth’s tragopan.',
    'Getting there takes a full day of rough road from Aizawl and almost nobody does it, which is the whole recommendation.'
  ],
  see: [
    { n: 'The summit plateau',
      d: 'A short walk from the road head through rhododendron to open grassland and the cliff edge.' },
    { n: 'Thlazuang Khàm',
      d: 'The cliff on the eastern face, with a long drop and a Mizo legend attached.' },
    { n: 'Orchids and rhododendron',
      d: 'March to May. The park holds a substantial orchid list.' },
    { n: 'Birding',
      d: 'Blyth’s tragopan, Mrs Hume’s pheasant and the dark-rumped swift, which nests on the cliffs.' },
    { n: 'Sangau village',
      d: 'The base village, with homestays and guides.' }
  ],
  when: 'October to May; March to May for flowers. Permits from the forest office; ILP for Mizoram.',
  stay: 'Two nights at Sangau.',
  move: 'Three hundred kilometres from Aizawl, a full day on rough road. Sangau is the road head.',
  eat: 'Homestay cooking in Sangau. Carry what you need for the mountain.'
},

/* ===================== TRIPURA ===================== */
'TRI-unakoti': {
  intro: [
    'Unakoti is a hillside in north Tripura covered in rock-cut and freestanding sculpture — enormous Shiva heads, Ganesha figures, Durga and Nandi — carved into the living rock and strewn down a stream bed in forest.',
    'The name means one less than a crore, and the legend says Shiva was travelling with ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine gods, told them to wake before dawn, and turned to stone all those who did not.',
    'Nobody is certain who carved them or when — estimates range across the seventh to twelfth centuries — and no inscription has been found. The central Unakotishwara Kal Bhairava head is about nine metres high.'
  ],
  see: [
    { n: 'Unakotishwara Kal Bhairava',
      d: 'The great Shiva head with an elaborate headdress and Durga and Ganga figures on either side.' },
    { n: 'The Ganesha panels',
      d: 'Several, including a four-armed and an eight-armed figure, cut into separate rock faces.' },
    { n: 'The Nandi bulls',
      d: 'Half-buried in the ground, which suggests the site level has risen considerably.' },
    { n: 'The stream and the forest',
      d: 'Sculptures appear along and in the watercourse. Go slowly and look up.' },
    { n: 'Ashokastami mela', t: 'April',
      d: 'A substantial local pilgrimage fair at the site.' }
  ],
  when: 'October to March.',
  stay: 'Two or three hours.',
  move: 'A hundred and seventy-eight kilometres from Agartala, four to five hours; Kumarghat is the nearest railhead, twenty kilometres.',
  eat: 'Stalls near the entrance; eat in Kailashahar.'
},

'TRI-neermahal': {
  intro: [
    'Neermahal is a palace in the middle of Rudrasagar lake, built between 1930 and 1938 by Maharaja Bir Bikram Kishore Manikya as a summer residence, and it is one of only two water palaces in India.',
    'The design is a hybrid: Hindu and Islamic elements with white and red detailing, a western wing for the royal family and an eastern open-air theatre for dance and drama. It is reached only by boat.',
    'The lake around it is a Ramsar-listed wetland with winter migratory birds, and the whole thing sees very few visitors.'
  ],
  see: [
    { n: 'The palace',
      d: 'Boats from Melaghar jetty, a fifteen-minute crossing. The open-air theatre wing is the more interesting half.' },
    { n: 'Rudrasagar lake',
      d: 'Winter waterfowl, and the palace reflected at dusk.' },
    { n: 'The light and sound show',
      d: 'Run in the evening in season, on the palace exterior.' },
    { n: 'Sepahijala',
      d: 'A sanctuary half an hour away with spectacled langur, clouded leopard in enclosures and good birding.' }
  ],
  when: 'October to March. Neermahal Water Festival in August.',
  stay: 'Half a day from Agartala.',
  move: 'Fifty-three kilometres from Agartala, ninety minutes. Boats from Melaghar.',
  eat: 'Tourism lodge at Melaghar; eat in Agartala.'
},

'TRI-agartala': {
  intro: [
    'Agartala is the Tripura capital, two kilometres from the Bangladesh border, and the Ujjayanta Palace at its centre is a very large Indo-Saracenic building of 1901 set in Mughal-style gardens, now a state museum.',
    'The Manikya dynasty ruled Tripura for centuries and is one of the longest-reigning royal lines in the world; Rabindranath Tagore had a long association with the court and visited repeatedly.',
    'Outside the city is Tripura Sundari at Udaipur, one of the fifty-one shakti peethas, in a small square temple with a curved roof.'
  ],
  see: [
    { n: 'Ujjayanta Palace Museum',
      d: 'Tripura’s state museum, with good northeastern ethnography and the palace’s Chinese room.' },
    { n: 'Tripura Sundari Temple, Udaipur',
      d: 'Fifty-five kilometres away, a 1501 temple shaped like a tortoise shell, one of the shakti peethas.' },
    { n: 'Jagannath Temple',
      d: 'An octagonal temple on a square plinth in orange, in the palace compound.' },
    { n: 'Akhaura border',
      d: 'The crossing to Bangladesh, with a smaller version of the Wagah ceremony.' },
    { n: 'Pilak',
      d: 'A hundred kilometres south, Buddhist and Hindu sculpture from the eighth to twelfth centuries scattered across fields.' }
  ],
  when: 'October to March.',
  stay: 'Two nights.',
  move: 'Airport with flights from Kolkata and Guwahati; railway links via Lumding.',
  eat: 'Tripuri food — mui borok, berma fermented fish, chakhwi — alongside Bengali.'
},

/* ===================== BIHAR ===================== */
'BIH-nalanda': {
  intro: [
    'Nalanda was a Buddhist monastic university founded in the fifth century and functioning for seven hundred years, with something in the region of ten thousand students and two thousand teachers from across Asia. Xuanzang studied here and left a detailed account.',
    'It taught logic, grammar, medicine, mathematics and astronomy alongside Buddhist philosophy, and it had a library of several hundred thousand volumes in three buildings, one of which was nine storeys. When Bakhtiyar Khalji sacked it around 1200, the library is said to have burned for months.',
    'What survives is the excavated brick foundations of eleven monasteries and six temples over fourteen hectares — long rows of monks’ cells, courtyards and stupas, inscribed by UNESCO in 2016.'
  ],
  see: [
    { n: 'The monastery rows',
      d: 'Walk down the line of viharas. The cells, drains, wells and ovens are all visible and the organisation is obvious.' },
    { n: 'Temple Site 3',
      d: 'The great stupa, built up in seven successive layers over centuries, with the earlier shells exposed.' },
    { n: 'Nalanda Archaeological Museum',
      d: 'Bronzes, stucco and stone sculpture from the site. Closed Fridays.' },
    { n: 'Xuanzang Memorial Hall',
      d: 'A Chinese-funded memorial holding a relic of the monk.' },
    { n: 'Rajgir',
      d: 'Twelve kilometres away, and usually combined.' }
  ],
  when: 'October to March. Early morning for the brick in low light.',
  stay: 'Half a day, with Rajgir.',
  move: 'Ninety kilometres from Patna, two and a half hours. Rajgir is the nearest useful railhead.',
  eat: 'Simple places near the site; litti chokha at the stalls.'
},

'BIH-rajgir': {
  intro: [
    'Rajgir was the capital of Magadha before Pataliputra, and it is ringed by five hills, which is where the name comes from. Both the Buddha and Mahavira spent years here, and the first Buddhist council was held in a cave on one of these hills after the Buddha’s death.',
    'Vulture’s Peak, Gridhakuta, is where the Buddha delivered several of the major Mahayana sutras, and a Japanese-built Vishwa Shanti Stupa now stands on the ridge above it, reached by a chairlift.',
    'The hot springs at the base of Vaibhara hill have been in use for well over two thousand years and are still crowded with bathers.'
  ],
  see: [
    { n: 'Vishwa Shanti Stupa and the ropeway',
      d: 'A single-seat chairlift up to a white peace pagoda with four Buddhas. The ride is part of it.' },
    { n: 'Gridhakuta',
      d: 'Vulture’s Peak, a short walk from the ropeway station, with a small shrine and the view the Buddha preached from.' },
    { n: 'Saptaparni Cave',
      d: 'Where the first Buddhist council was convened. A climb up Vaibhara hill past Jain temples.' },
    { n: 'Brahmakund hot springs',
      d: 'Separate tanks for men and women, very hot, and very busy.' },
    { n: 'Bimbisara’s jail and the cyclopean wall',
      d: 'The ruins where the king was imprisoned by his son, and stretches of a pre-Mauryan stone wall around the valley.' },
    { n: 'Nalanda',
      d: 'Twelve kilometres away.' }
  ],
  when: 'October to March. The Rajgir Dance Festival is in late October.',
  stay: 'One night.',
  move: 'Rajgir has a station; Patna is two and a half hours, Gaya ninety minutes. Tongas and autos locally.',
  eat: 'Bihari food — litti chokha, sattu, and khaja sweets.'
},

'BIH-patna': {
  intro: [
    'Patna is Pataliputra, the capital of the Mauryan and Gupta empires and for long stretches the largest city in the world. Chandragupta, Ashoka and Chanakya all worked here, and Megasthenes described it in the fourth century BC.',
    'Very little of that is visible. The Kumhrar excavation shows the postholes and polished sandstone pillars of a Mauryan assembly hall, and that is close to the whole of it; the Ganges has shifted and the city has been built over continuously.',
    'What the city does have is the Bihar Museum, one of the best new museums in India, holding the Didarganj Yakshi — a Mauryan sandstone figure with a mirror polish that is among the finest sculptures ever made in the subcontinent.'
  ],
  see: [
    { n: 'Bihar Museum',
      d: 'The Didarganj Yakshi, plus outstanding Mauryan and Pala material in a very good Maki-designed building. Allow three hours.' },
    { n: 'Kumhrar',
      d: 'The Mauryan hall site, with eighty pillar positions and a few polished shafts recovered from the water table.' },
    { n: 'Takht Sri Patna Sahib',
      d: 'The birthplace of Guru Gobind Singh and one of the five takhts of Sikhism.' },
    { n: 'Golghar',
      d: 'A 1786 beehive-shaped granary built after a famine, with a spiral stair up the outside and a view over the Ganges.' },
    { n: 'Patna Museum',
      d: 'The older museum, holding a relic casket and a very long fossil tree.' }
  ],
  when: 'October to March. Chhath Puja in October or November fills the Ganges ghats and is extraordinary.',
  stay: 'Two nights.',
  move: 'Airport and a major rail junction. Autos and app cabs.',
  eat: 'Litti chokha, sattu paratha, and Maner ke laddu. The Ganges fish is good.'
},

'BIH-vaishali': {
  intro: [
    'Vaishali was the capital of the Licchavi republic, one of the world’s earliest known states with an elected assembly, and it is where the Buddha preached his last sermon and announced his approaching death. It is also the birthplace of Mahavira.',
    'The second Buddhist council was held here a century after the Buddha’s death. An Ashokan pillar with a lion capital still stands in situ beside a brick stupa and an ancient tank — one of very few Ashokan pillars still standing where it was raised.',
    'It is a flat, quiet, agricultural place with very few visitors, which makes the pillar more affecting than it would otherwise be.'
  ],
  see: [
    { n: 'The Ashokan pillar at Kolhua',
      d: 'Standing in place, with a single lion on top facing north, beside a stupa and the Ramkund tank.' },
    { n: 'The relic stupa',
      d: 'The excavated remains of a stupa which held a portion of the Buddha’s ashes, now in Patna Museum.' },
    { n: 'Abhishek Pushkarni',
      d: 'The coronation tank where the Licchavi rulers were anointed.' },
    { n: 'The museum',
      d: 'Small, with finds from the site and material on the republic.' },
    { n: 'Kesariya',
      d: 'Fifty kilometres away, an enormous brick stupa, possibly the tallest in the world, largely unexcavated and almost unvisited.' }
  ],
  when: 'October to March.',
  stay: 'Half a day from Patna.',
  move: 'Fifty-five kilometres from Patna, under two hours. Hajipur is the nearest railhead.',
  eat: 'Basic local places. Eat in Patna.'
},

/* ===================== JHARKHAND ===================== */
'JHA-netarhat': {
  intro: [
    'Netarhat is a plateau at about eleven hundred metres in the Latehar district, and it is the Jharkhand hill station — pine and sal forest, a residential school on the British model, and sunrise and sunset points that the state advertises heavily.',
    'It is quiet, cool and sees almost no visitors from outside the state. The Magnolia sunset point has a story about a British officer’s daughter and a local shepherd, which is probably invented and is told to everyone.',
    'Lower Ghaghri and Upper Ghaghri falls are nearby, and the Betla national park is two hours away.'
  ],
  see: [
    { n: 'Magnolia Point at sunset',
      d: 'The plateau edge with the valley below. The main local attraction.' },
    { n: 'Sunrise Point',
      d: 'A short drive the other way, best from October to February when the air is clear.' },
    { n: 'Lodh Falls',
      d: 'Jharkhand’s highest, at a hundred and forty-three metres, around sixty kilometres away through forest.' },
    { n: 'Upper and Lower Ghaghri falls',
      d: 'Both walkable from the town, good after the monsoon.' },
    { n: 'The pine forests',
      d: 'Planted, and unusual for this part of India. Good walking on forest roads.' }
  ],
  when: 'October to March. Pleasant in the hot season when Ranchi is not.',
  stay: 'Two nights.',
  move: 'A hundred and fifty kilometres from Ranchi, four hours. A car is necessary.',
  eat: 'The state tourism lodge and a couple of small places. Carry snacks.'
},

'JHA-betla': {
  intro: [
    'Betla was one of the first nine tiger reserves declared under Project Tiger in 1973, and it was where the first tiger census in the world was carried out using pugmark counts, in 1932.',
    'The tiger population is now very low, and what the park reliably offers is elephant, gaur, sambar and sloth bear in sal forest, plus two Chero-dynasty forts inside the reserve, overgrown and unrestored.',
    'It is in the Palamau region and gets effectively no outside visitors.'
  ],
  see: [
    { n: 'Jeep safaris',
      d: 'From the Betla gate. Elephant herds and gaur are the realistic highlights.' },
    { n: 'Palamau forts',
      d: 'Two sixteenth and seventeenth-century Chero forts in the forest, reached on foot, with gateways and walls under creeper.' },
    { n: 'Kamaldah lake',
      d: 'A lotus-covered lake inside the reserve with good birding.' },
    { n: 'The watchtowers',
      d: 'Several over waterholes, worth an hour at dusk.' },
    { n: 'Netarhat',
      d: 'Two hours away, for a cooler night.' }
  ],
  when: 'November to April. Closed in the monsoon.',
  stay: 'Two nights at the forest lodge.',
  move: 'Daltonganj is the railhead, twenty-five kilometres; Ranchi is four hours.',
  eat: 'Forest lodge kitchen. Limited; carry extras.'
},

'JHA-deoghar': {
  intro: [
    'Baidyanath Dham at Deoghar is one of the twelve jyotirlingas, and during the month of Shravan it receives one of the largest pilgrimages in the world — several million people walk a hundred and five kilometres barefoot from Sultanganj on the Ganges carrying pots of water on bamboo poles, in saffron, along a road closed to traffic for the duration.',
    'The Kanwar Yatra route is lined with free kitchens and rest stops, and the whole thing is organised with remarkable efficiency. Outside Shravan the town is an ordinary pilgrimage centre with long but manageable queues.',
    'Trikut hill nearby has a ropeway, and Tapovan has caves used by ascetics.'
  ],
  see: [
    { n: 'Baidyanath Temple',
      d: 'A cluster of twenty-two temples around the main shrine. Queues are long; a paid shighra darshan pass is worth it.' },
    { n: 'Shravani Mela', t: 'July and August',
      d: 'The month-long Kanwar pilgrimage. Extraordinary to witness and extremely crowded.' },
    { n: 'Trikut Pahar',
      d: 'A ropeway to a hill with three peaks, an ashram and a view.' },
    { n: 'Tapovan',
      d: 'Caves and a Shiva temple on a hill ten kilometres out, used by sadhus.' },
    { n: 'Naulakha Mandir',
      d: 'A tall temple modelled on Belur Math, built by a Bengali queen.' }
  ],
  when: 'October to March. Shravan in July and August if you want the yatra.',
  stay: 'One night.',
  move: 'Jasidih is the railhead, seven kilometres, on the Delhi–Howrah main line. Deoghar now has an airport.',
  eat: 'Pure vegetarian near the temple; peda is the local offering and sweet.'
},

'JHA-ranchi': {
  intro: [
    'Ranchi is the Jharkhand capital, on a plateau at about six hundred and fifty metres, which gives it a better climate than the plains below. It was the summer capital of Bihar under the British for the same reason.',
    'It is a city of waterfalls — the plateau edge is cut by rivers dropping off it on three sides, and Hundru, Dassam and Jonha are all within an hour. After the monsoon they are genuinely impressive.',
    'It is also where Birsa Munda, the Adivasi leader who led a rebellion against colonial land policy in the 1890s and died in Ranchi jail at twenty-five, is commemorated, and he is the figure the state identifies with.'
  ],
  see: [
    { n: 'Hundru Falls',
      d: 'Ninety-eight metres, forty-five kilometres out, with a long stair to the base. Best September to December.' },
    { n: 'Dassam and Jonha falls',
      d: 'Two more on the plateau edge, both within an hour and both good after the rains.' },
    { n: 'Birsa Munda Museum',
      d: 'In the old central jail where he died, now a well-made memorial and museum of the Adivasi movements.' },
    { n: 'Jagannath Temple',
      d: 'A 1691 temple on a hill, modelled on Puri, with its own smaller rath yatra.' },
    { n: 'Tribal Research Institute Museum',
      d: 'On the thirty-two Adivasi communities of the state. Modest but genuine.' }
  ],
  when: 'October to March; the falls are best from September.',
  stay: 'Two nights.',
  move: 'Airport and a major railhead. A car for the waterfalls.',
  eat: 'Jharkhandi and Bihari food — dhuska, litti, and rugra mushrooms in season.'
},

/* ===================== ANDAMAN & NICOBAR ===================== */
'AND-havelock': {
  intro: [
    'Havelock, officially Swaraj Dweep, is the main tourist island of the Andamans and has the best beach in India. Radhanagar, on the western side, is a long arc of white sand backed by rainforest with no development on it, and the sunsets are the reason half the visitors come.',
    'The diving and snorkelling here are the best in the country — visibility of twenty to thirty metres, intact hard coral, and a reef wall at Johnny’s Gorge and Dixon’s Pinnacle that brings divers from abroad.',
    'Elephant Beach is reached by boat or a forty-minute walk through forest and has the easiest accessible snorkelling. The island is small enough to scooter around in a day.'
  ],
  see: [
    { n: 'Radhanagar Beach at sunset',
      d: 'Beach number seven. Swim on the left where the lifeguards are; there is a rip at the far end.' },
    { n: 'Diving',
      d: 'Several well-run PADI and SSI schools. Johnny’s Gorge, Dixon’s Pinnacle and The Wall are the sites. November to April is best.' },
    { n: 'Elephant Beach',
      d: 'Boat from the jetty or a forest walk through mangrove. Shallow coral straight off the beach.' },
    { n: 'Kalapathar',
      d: 'On the eastern side for sunrise, with black rock against white sand.' },
    { n: 'Sea walking and kayaking',
      d: 'Mangrove kayaking at night with bioluminescence on a new moon is the best thing on the island.' }
  ],
  when: 'November to April. May to September is monsoon with rough seas and cancelled ferries.',
  stay: 'Four nights.',
  move: 'Ferry from Port Blair, ninety minutes to two and a half hours. Book private ferries online well ahead; government ferries are cheaper and harder. Scooters on the island.',
  eat: 'Fresh fish everywhere, Full Moon Cafe and Something Different on Govind Nagar beach, and good Bengali food in the market.'
},

'AND-port-blair': {
  intro: [
    'Port Blair is the Andamans capital and where the Cellular Jail stands — a penal colony built in 1906 on a seven-spoke radial plan with six hundred and ninety-six solitary cells, designed so no prisoner could see or communicate with another.',
    'Indian political prisoners were transported here from the 1850s and the conditions were deliberately brutal. Three wings survive of the original seven, along with the gallows and the central tower, and the sound-and-light show in the evening is well done.',
    'The islands were occupied by Japan from 1942 to 1945, and Ross Island across the harbour holds the ruins of the former British administrative headquarters.'
  ],
  see: [
    { n: 'Cellular Jail',
      d: 'The surviving wings, the solitary cells, the gallows and the museum. Allow two hours, plus the evening light-and-sound show.' },
    { n: 'Ross Island',
      d: 'Twenty minutes by boat, with the ruined church, bakery and ballroom of the colonial capital overgrown by banyan, and deer and peacocks in the ruins.' },
    { n: 'Anthropological Museum',
      d: 'On the indigenous peoples of the islands — Great Andamanese, Onge, Jarawa, Sentinelese, Nicobarese. Thoughtfully done and the best context available.' },
    { n: 'Chatham Saw Mill',
      d: 'One of the oldest in Asia, with a bomb crater from 1942 and a forest museum.' },
    { n: 'North Bay and Corbyn’s Cove',
      d: 'Snorkelling and a glass-bottom boat at North Bay; the nearest swimmable beach at Corbyn’s Cove.' }
  ],
  when: 'November to April.',
  stay: 'Two nights, usually at the start and end of a trip.',
  move: 'Flights from Chennai, Kolkata and Delhi. Autos and taxis. Note that visiting the Jarawa reserve or North Sentinel is illegal and the road through the Jarawa area has strict rules.',
  eat: 'Annapurna for South Indian, Lighthouse Residency for fish, and the Aberdeen Bazaar stalls.'
},

'AND-neil': {
  intro: [
    'Neil Island, officially Shaheed Dweep, is a small flat island half an hour from Havelock, with a village, paddy fields, banana plantations and three beaches, and it is where people go when Havelock feels too busy.',
    'Bharatpur has shallow coral straight off the sand and a glass-bottom boat trade; Laxmanpur has a long sunset beach with a natural rock bridge at low tide; Sitapur catches the sunrise.',
    'It is cycleable end to end in an afternoon and has almost no nightlife, which is the recommendation.'
  ],
  see: [
    { n: 'Natural Bridge',
      d: 'A coral rock arch at the end of Laxmanpur beach, reachable only at low tide. Check the tide table.' },
    { n: 'Bharatpur Beach',
      d: 'Coral in waist-deep water, with glass-bottom boats and snorkel hire. Busy with day trippers.' },
    { n: 'Sitapur Beach',
      d: 'Sunrise, with a cliff and a cave at one end and very few people.' },
    { n: 'Laxmanpur sunset',
      d: 'A long shallow beach that goes orange, with the bridge at the end.' },
    { n: 'Cycling the island',
      d: 'Flat, quiet lanes through paddy and banana. Hire a bicycle rather than a scooter.' }
  ],
  when: 'November to April.',
  stay: 'Two or three nights.',
  move: 'Ferry from Port Blair or Havelock. Bicycles and autos on the island.',
  eat: 'Beach shacks and a handful of good small restaurants near the jetty.'
},

'AND-baratang': {
  intro: [
    'Baratang is reached by the Andaman Trunk Road, which runs north from Port Blair through the Jarawa tribal reserve. Vehicles travel in escorted convoys at fixed times, and photographing or interacting with the Jarawa is a criminal offence. Take that seriously — tourists treating the road as a safari has been a real and damaging problem.',
    'The island has limestone caves reached by a speedboat through mangrove creeks and a short forest walk, and a mud volcano — a low cone of cold grey slurry bubbling up, one of very few in India.',
    'The mangrove creek run is the better half of the trip.'
  ],
  see: [
    { n: 'The mangrove creek',
      d: 'A speedboat through narrow channels under arching mangrove from Nilambur jetty. Twenty minutes and the highlight.' },
    { n: 'Limestone caves',
      d: 'A fifteen-minute walk from the jetty through forest and village to a cave with stalactites. Carry a torch.' },
    { n: 'The mud volcano',
      d: 'At Jalakyabad, a bubbling cold mud cone. Odd rather than spectacular.' },
    { n: 'Parrot Island',
      d: 'At dusk, when thousands of parakeets come in to roost in the mangrove. Worth staying for.' }
  ],
  when: 'November to April. The convoy leaves Port Blair very early — three or four in the morning.',
  stay: 'A very long day trip from Port Blair, or a night to see Parrot Island.',
  move: 'Convoy on the Andaman Trunk Road, around three hours, then a vehicle ferry. Organised tours handle the permits.',
  eat: 'Basic places at Nilambur jetty. Carry food and water.'
},

'AND-ross-island': {
  intro: [
    'Ross Island, now Netaji Subhas Chandra Bose Dweep, was the administrative capital of the Andamans from 1858 and was known as the Paris of the East — it had a church, a bakery, a ballroom, a swimming pool, tennis courts and a printing press for a few hundred Europeans, built and maintained by convict labour.',
    'An earthquake in 1941 and the Japanese occupation from 1942 finished it. The jungle has taken it since, and the ruins stand with banyan roots growing through the brickwork.',
    'Spotted deer, peacocks and rabbits wander the paths, descended from animals introduced for the officers.'
  ],
  see: [
    { n: 'The Presbyterian church',
      d: 'Roofless, with trees growing out of it. The most photographed ruin in the Andamans.' },
    { n: 'The chief commissioner’s house and the ballroom',
      d: 'Both shells, with the swimming pool nearby.' },
    { n: 'The Japanese bunkers',
      d: 'Concrete gun positions from the occupation, on the seaward side.' },
    { n: 'The light and sound show',
      d: 'In the evening among the ruins, narrating the island’s history.' },
    { n: 'The deer',
      d: 'Entirely unbothered by people, which is pleasant and slightly unnerving.' }
  ],
  when: 'November to April. Closed on Wednesdays.',
  stay: 'Two or three hours.',
  move: 'Boats from Aberdeen jetty, Port Blair, twenty minutes. Usually combined with North Bay.',
  eat: 'A small canteen; eat in Port Blair.'
},

'AND-diglipur': {
  intro: [
    'Diglipur is in North Andaman, three hundred kilometres from Port Blair, and it is where visitors go who want the islands without any of the tourism. Getting there means a twelve-hour bus up the trunk road or a ferry.',
    'Ross and Smith islands are twin islands joined by a natural sandbar you can walk across at low tide, and they are as good as Radhanagar with a fraction of the people. Saddle Peak, at seven hundred and thirty-two metres, is the highest point in the Andamans and a four-hour climb through rainforest.',
    'Kalipur beach is a turtle nesting site where four species — green, hawksbill, olive ridley and leatherback — come ashore, which is unusual anywhere in the world.'
  ],
  see: [
    { n: 'Ross and Smith Islands',
      d: 'Boat from Aerial Bay with a permit, then walk the sandbar between them. Snorkelling off both sides.' },
    { n: 'Saddle Peak',
      d: 'A four-hour climb from Lamiya Bay through rainforest. Permit from the forest office.' },
    { n: 'Turtle nesting at Kalipur', t: 'December to March',
      d: 'Four species nest here. The forest department runs a hatchery; night walks with guides.' },
    { n: 'Alfred Caves and the mud volcanoes',
      d: 'Limestone caves with swifts, and more mud cones in the interior.' },
    { n: 'Craggy Island and Excelsior',
      d: 'Day trips by boat for empty beaches and reef.' }
  ],
  when: 'November to April.',
  stay: 'Three nights, given how long it takes to get there.',
  move: 'Twelve hours by bus from Port Blair on the trunk road, or an overnight government ferry. Aerial Bay is the jetty.',
  eat: 'Simple Bengali and Tamil food in Diglipur town; the resorts at Kalipur feed you.'
},

/* ===================== LAKSHADWEEP ===================== */
'LAK-agatti': {
  intro: [
    'Agatti is a seven-kilometre strip of coral island with a lagoon around it, and it has the only airport in Lakshadweep — which makes it the arrival point for the whole archipelago.',
    'The lagoon is the shallowest and most protected in the group, with coral in a metre of water, and the island is inhabited, with a fishing economy and a population of a few thousand.',
    'Lakshadweep requires a permit for every visitor, numbers are capped, alcohol is prohibited on all inhabited islands, and independent travel is restricted — most visits go through a government or approved operator.'
  ],
  see: [
    { n: 'The lagoon',
      d: 'Snorkelling straight off the beach in very shallow, very clear water. Coral gardens and reef fish.' },
    { n: 'Scuba diving',
      d: 'Several sites off the reef edge, with a dive school on the island. Visibility is exceptional.' },
    { n: 'Glass-bottom boats and kayaks',
      d: 'Over the lagoon coral without getting wet.' },
    { n: 'The village',
      d: 'Coconut, coir, tuna processing and boat building. Dress conservatively; this is a Muslim community.' },
    { n: 'Day trips to Bangaram',
      d: 'By boat, for the uninhabited island and its reef.' }
  ],
  when: 'October to May. The southwest monsoon from June closes the sea.',
  stay: 'Three nights.',
  move: 'Flights from Kochi to Agatti, then boat transfers. Entry permit mandatory and arranged in advance through an operator or the administration.',
  eat: 'Tuna in every form, coconut, and Lakshadweep-Malayali cooking. No alcohol.'
},

'LAK-bangaram': {
  intro: [
    'Bangaram is an uninhabited teardrop of an island in a lagoon with three other islets, and because nobody lives there the usual Lakshadweep restrictions are relaxed — it is the only place in the territory where alcohol is served.',
    'The diving is the best in Indian waters: wall dives, a wreck of a 1976 freighter, manta ray and reef shark, and visibility that regularly exceeds thirty metres.',
    'There is a single resort and nothing else. No shops, no village, no roads.'
  ],
  see: [
    { n: 'Diving the reef wall',
      d: 'Drop-offs a short boat ride out, with manta, eagle ray and grey reef shark. A dive school operates from the resort.' },
    { n: 'The Princess Royale wreck',
      d: 'A freighter that struck the reef in 1976, lying in shallow water and snorkellable.' },
    { n: 'Snorkelling the lagoon',
      d: 'Straight off the beach, with turtle sightings common.' },
    { n: 'Thinnakara and Parali islets',
      d: 'Uninhabited sandbanks in the same lagoon, reached by boat.' },
    { n: 'Walking the island',
      d: 'Forty-five minutes round the whole thing, mostly on sand under coconut.' }
  ],
  when: 'October to May. Closed during the monsoon.',
  stay: 'Four nights; there is nothing to do and that is the point.',
  move: 'Fly to Agatti, then an hour and a half by boat. Permit and resort booking arranged together.',
  eat: 'Resort kitchen — tuna, reef fish and Keralan cooking. The only licensed bar in Lakshadweep.'
},

'LAK-kavaratti': {
  intro: [
    'Kavaratti is the administrative capital of Lakshadweep and the most developed of the islands, with government offices, schools, a marine aquarium and fifty-odd mosques for a population of about eleven thousand.',
    'The Ujra mosque has a ceiling carved from a single piece of driftwood and a well whose water is said to have curative properties. The lagoon is wide and calm and used for every kind of watersport.',
    'It is a working island rather than a resort, and visiting it gives a much better sense of what life in Lakshadweep actually is.'
  ],
  see: [
    { n: 'The lagoon',
      d: 'Kayaking, sailing, windsurfing and snorkelling, mostly run by the administration’s watersports centre.' },
    { n: 'Ujra Mosque',
      d: 'The oldest on the island, with the carved driftwood ceiling. Non-Muslims may view the exterior and sometimes more.' },
    { n: 'Marine Aquarium',
      d: 'Small, with local reef species and a good display on the atoll ecology.' },
    { n: 'Scuba diving',
      d: 'A dive centre on the island; the reef edge is a short boat ride.' },
    { n: 'The village and the coir works',
      d: 'Coconut processing, coir spinning and tuna canning, all open to look at.' }
  ],
  when: 'October to May. Permit required; dress modestly and note that alcohol is prohibited.',
  stay: 'Two or three nights.',
  move: 'Ship from Kochi, fourteen to twenty hours, or a helicopter transfer from Agatti. Permits through the administration or an operator.',
  eat: 'Tuna, octopus and coconut-based Lakshadweep cooking at the government guest houses.'
}
};

/* Look-up used by the place page. Returns null rather than an empty
   object when a place has no entry, so the caller can simply test it. */
function inGuide(id){
  return (typeof IN_GUIDE !== 'undefined' && IN_GUIDE[id]) ? IN_GUIDE[id] : null;
}

/* How much of the atlas has been written up. */
function inGuideCount(){
  try { return Object.keys(IN_GUIDE).length; } catch(e){ return 0; }
}
