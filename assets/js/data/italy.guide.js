/* ===========================================================
   ITALY — the written guide

   The blurb in italy.places.js is one sentence, which is enough for a
   card and not enough for a page. This is the rest: what a place
   actually is, the specific things worth doing when you get there,
   and the four practical questions everybody asks.

     intro  two or three paragraphs on the place itself
     see    the things to do, each named and described. Ordered the
            way you would actually do them, not by fame.
     when   which months, and why
     stay   how long is honest rather than flattering
     move   how you get around once you are there
     eat    what this specific place cooks that the next one does not

   A place with no entry here still renders: the page shows its blurb,
   its photograph, its live panel and its neighbours, and simply has
   no prose section. So this file can grow without anything waiting
   on it.
   =========================================================== */

const IT_GUIDE = {

/* ===================== ROME ===================== */
'LAZ-rome': {
  intro: [
    'Rome is not a city with ruins in it. It is a city built out of its own ruins, continuously, for twenty-eight centuries, and the result is that chronology here is vertical rather than horizontal. San Clemente is the clearest demonstration: a 12th-century basilica standing on a 4th-century church, standing on a 1st-century Mithraic temple, standing on a Republican-era house, and you can walk down through all four in about ten minutes while an underground spring runs past you in the dark.',
    'The practical consequence is that Rome resists being done. There is no sequence that gets you through it, and the attempt to find one is what makes people miserable here. The city rewards a different approach entirely: pick two things a day, walk between them, and accept that you will pass four more you did not plan for. Everything in the centre is within forty minutes on foot of everything else.',
    'It is also, and this surprises people, a living capital of nearly three million where most of the centre is ordinary residential neighbourhood. The Pantheon has been standing in a working piazza since 126 AD, with a bar on one side and people buying cigarettes on the other. That ordinariness is the thing to protect in your itinerary.'
  ],
  see: [
    { n: 'The Colosseum and the Forum', t: 'one combined ticket',
      d: 'Buy the timed entry online, and go in the first slot of the morning or the last two hours of the day. The Forum is the harder of the two to read and the more rewarding once you can: it is not a building but a whole civic centre, and the Palatine above it gives you the plan from height. Allow three hours for all three and understand that it is a lot of standing in full sun.' },
    { n: 'The Pantheon', t: 'free, always open',
      d: 'The best-preserved building from the ancient world, still roofed by the largest unreinforced concrete dome ever built. Go when it rains, if you get the chance, and watch the water fall through the nine-metre oculus onto the slightly convex floor, which drains it. It takes fifteen minutes and is the single most astonishing thing in the city.' },
    { n: 'The Vatican Museums and the Sistine Chapel', t: 'half a day',
      d: 'Enormous, exhausting and unmissable. The route is one-way and funnels everyone through four kilometres of gallery to reach the Chapel, so the trick is to pace yourself and not burn out in the tapestries. Book the earliest entry, and do not photograph the Chapel; the guards will stop you and you will see it better with your eyes.' },
    { n: 'Caravaggio, for free, in three churches',
      d: 'San Luigi dei Francesi has the Matthew cycle, Santa Maria del Popolo has the Conversion of Saul and the Crucifixion of Peter, Sant’Agostino has the Madonna of Loreto. All free, all in situ, all lit by a one-euro coin in the box. This is better than most museums and almost nobody queues.' },
    { n: 'Trastevere after dark', t: 'evening',
      d: 'Across the river, medieval street plan, and where Rome goes to eat. Santa Maria in Trastevere has gold mosaics older than anything in the neighbourhood. Come at seven, walk until you are hungry, and avoid anything with a laminated menu or a man outside trying to seat you.' },
    { n: 'The Borghese Gallery', t: 'booking essential',
      d: 'Strictly two hours, strictly by reservation, and worth arranging your week around. Bernini’s Apollo and Daphne and the Rape of Proserpina are here, and seeing marble convincingly turn into bark and fingertips pressing into a thigh is the closest sculpture comes to a magic trick.' },
    { n: 'The Appian Way on a Sunday', t: 'half day',
      d: 'Closed to traffic on Sundays, which turns the original Roman road into a long walk between tombs, catacombs and umbrella pines. Rent a bicycle at the park entrance. This is the one place near the centre where you get Rome and silence at once.' },
    { n: 'Testaccio market', t: 'mornings, closed Sunday',
      d: 'A modern market hall in the old slaughterhouse district, which is where Roman cooking was invented out of the parts nobody else wanted. This is where to eat lunch rather than in the centre, and where the city’s best sandwich counters are.' }
  ],
  when: 'April to early June and late September to early November. July and August are genuinely punishing — over 35°C with no shade in the archaeological sites — and much of the city closes in mid-August. Winter is underrated: cold but bright, and the queues disappear.',
  stay: 'Four full days to see the headline sites without rushing, five or six to also have time where you are not queueing for anything. Three is possible but you will spend all of it in lines. Rome is also a city people return to rather than complete.',
  move: 'Walk. The historic centre is about three kilometres across and the Metro has only three lines, because they hit archaeology every time they dig. Buses are useful for the Vatican and Trastevere; taxis must be taken from a rank or booked, not hailed.',
  eat: 'Four pasta dishes define the city and all of them are cheap: cacio e pepe, carbonara, amatriciana and gricia. Add carciofi alla giudia (flattened deep-fried artichokes, Jewish Ghetto, roughly October to April) and supplì from any fry shop. Pizza in Rome is thin and crisp, not Neapolitan.'
},

'LAZ-vatican-city': {
  intro: [
    'Forty-four hectares, about 800 residents, its own post office, railway station, radio service and army of Swiss mercenaries in uniforms that have not changed much since the 16th century. It is the smallest sovereign state on earth by both area and population, and it contains one of the largest art collections.',
    'For a visitor it functions as two separate experiences that happen to share a wall. St Peter’s Basilica is free, enormous and entered from the square. The Vatican Museums are ticketed, entered from a completely different street several hundred metres north, and end at the Sistine Chapel. Doing both in one day is standard but long; doing them on separate days is better.'
  ],
  see: [
    { n: 'St Peter’s Basilica', t: 'free, security queue',
      d: 'The largest church ever built, and the scale only registers once you notice the lettering around the base of the dome is two metres high. Michelangelo’s Pietà is immediately on the right, behind glass since an attack in 1972. Dress code is enforced: shoulders and knees covered, for everyone.' },
    { n: 'The dome climb', t: '551 steps, or 320 with the lift',
      d: 'Up between the inner and outer shells of the dome, where the walls start leaning with the curve and the stairs narrow to a spiral with a rope down the middle. The reward is the whole of Rome and a look straight down into the basilica on the way.' },
    { n: 'The Sistine Chapel',
      d: 'The ceiling took Michelangelo four years standing on scaffolding, and the Last Judgement on the altar wall took another five, twenty-five years later. Sit on the benches at the side rather than standing in the middle; you will look longer and your neck will last.' },
    { n: 'The Raphael Rooms',
      d: 'On the route just before the Chapel and consistently walked through too fast. The School of Athens is here, and it is a better painting than the crowds in front of it suggest.' },
    { n: 'The Pinacoteca',
      d: 'The picture gallery is a side branch most visitors skip because it is not on the one-way route to the Chapel. It has Raphael’s Transfiguration, Caravaggio’s Deposition and Leonardo’s unfinished St Jerome, in rooms that are almost quiet.' },
    { n: 'The Scavi, under the basilica', t: 'separate booking, months ahead',
      d: 'A guided excavation through a Roman necropolis directly beneath the altar, ending at what is held to be the tomb of Peter. Small groups, no children under fifteen, and booked by email through the Excavations Office a long way in advance.' }
  ],
  when: 'The Museums are closed most Sundays except the last of the month, when entry is free and the queue is enormous. Wednesday mornings bring the Papal Audience, which fills the square and empties the Museums — useful if you want one, bad if you want the other.',
  stay: 'Half a day for the basilica and square. A full morning, minimum, for the Museums. Four hours of walking on hard floors is a realistic estimate for the Museums alone.',
  move: 'Metro line A to Ottaviano for the Museums, or Cipro. The basilica entrance and the Museums entrance are a fifteen-minute walk apart around the outside of the walls, which surprises people who assumed they were next to each other.',
  eat: 'Not in the immediate streets around the Vatican, which are the worst-value restaurants in Rome by a wide margin. Walk ten minutes north into Prati, a proper residential neighbourhood with proper prices.'
},

/* ===================== FLORENCE ===================== */
'TOS-florence': {
  intro: [
    'Florence is small. That is the first thing to understand, and it reorganises everything else: the historic centre is roughly a kilometre square, and you can cross it in twenty minutes. Inside that square are the Uffizi, the Accademia, the Duomo, the Bargello, Santa Croce, the Pitti Palace and the Ponte Vecchio, which is an absurd density of consequential art and explains both why people come and why it can feel overrun.',
    'What happened here between about 1400 and 1500 was that a merchant city with unusual banking wealth and unusually competitive families decided to spend that money on art and architecture, and in doing so invented linear perspective, rediscovered classical proportion and produced Brunelleschi, Donatello, Botticelli, Leonardo and Michelangelo. The Renaissance has a postcode.',
    'The city has a reputation for being a museum, and in the centre in July that is fair. But the Oltrarno across the river is still full of workshops where people gild frames and repair furniture, and the hills start five minutes beyond the walls. Both are the antidote.'
  ],
  see: [
    { n: 'Brunelleschi’s dome', t: 'timed ticket, 463 steps',
      d: 'The largest masonry dome in the world, built without centring by a goldsmith who refused to explain how he intended to do it. The climb goes between the two shells and comes out on the lantern. Book days ahead; the slots sell out and the ticket is combined with the baptistery, campanile and crypt.' },
    { n: 'The Uffizi', t: 'book ahead, half a day',
      d: 'Botticelli’s Birth of Venus and Primavera, Leonardo’s Annunciation, Titian’s Venus of Urbino, in the old administrative offices of the Medici. The collection is arranged chronologically, which means you watch painting learn perspective room by room. Go late in the day if you can; it thins out considerably after four.' },
    { n: 'The Accademia, for the David', t: '45 minutes is enough',
      d: 'He is five metres tall, carved from a block two previous sculptors had abandoned, and the hands and head are deliberately oversized because he was meant to stand on the cathedral roofline. The unfinished Prisoners in the corridor leading up to him are arguably more interesting, figures half-emerged from the marble.' },
    { n: 'The Bargello', t: 'quiet, excellent',
      d: 'Sculpture rather than painting, in a former prison, and almost empty compared to the Accademia. Donatello’s bronze David is here — the first free-standing nude since antiquity — along with the two competition panels by Brunelleschi and Ghiberti that arguably started the whole Renaissance.' },
    { n: 'The Brancacci Chapel', t: 'booking, Oltrarno',
      d: 'Masaccio’s frescoes from the 1420s, where the Expulsion from Eden gives Adam and Eve real weight and real grief for the first time in European painting. Every Florentine painter of the next century came here to copy them.' },
    { n: 'San Miniato al Monte at vespers', t: 'late afternoon',
      d: 'A Romanesque church on the hill above the city, older and far better than the much-photographed Piazzale Michelangelo just below it. The monks sing Gregorian chant in the crypt most evenings, and the view from the terrace is the one everyone climbs for, without the coach park.' },
    { n: 'The Oltrarno workshops', t: 'morning, weekdays',
      d: 'Over the river around Santo Spirito and Via Maggio: gilders, leather workers, marblers and restorers with their doors open. This is the surviving working half of the craft tradition the Renaissance was built on.' },
    { n: 'The Mercato Centrale', t: 'mornings',
      d: 'Ground floor is a proper food market; upstairs is a food hall. Come for lampredotto from a cart outside — tripe in broth on a bread roll, the Florentine street food, and better than it sounds.' }
  ],
  when: 'April, May, late September and October. Florence sits in a river basin ringed by hills, which makes July and August hot and still in a way the coast is not. Winter is cold and damp but the galleries are empty.',
  stay: 'Three full days for the major museums and the Duomo complex without exhaustion. Two if you are selective. Florence also works well as a base for Siena, Lucca and the Chianti by train or car.',
  move: 'Entirely on foot; the centre is largely pedestrianised and driving into it will earn you a camera fine weeks later. Trains to Pisa, Lucca, Siena and Arezzo all leave from Santa Maria Novella, in the centre.',
  eat: 'Bistecca alla fiorentina is a T-bone three fingers thick, served rare, sold by weight and intended for two or more. Also ribollita (bread and bean soup), pappa al pomodoro, and crostini di fegato. Tuscan bread is unsalted, which is not a mistake.'
},

/* ===================== VENICE ===================== */
'VEN-venice': {
  intro: [
    'Venice was built on millions of wooden piles driven into the mud of a lagoon by people hiding from invaders, and it became, improbably, the richest city in Europe for several centuries by controlling the trade between Europe and the East. Everything odd about it follows from those two facts: the defensive location, and the money that arrived through it.',
    'There are no roads. This is stated constantly and still does not quite land until you arrive, discover your hotel is up a bridge and down an alley, and realise that nothing with wheels will ever help you. Deliveries come by boat and then by trolley and then by hand. It is the only major city in the world where you cannot be run over.',
    'The city receives something close to twenty million visitors a year against a resident population under fifty thousand, which is the central tension of visiting it. The solution is not to avoid the famous things but to be out of step with the day: the crowds arrive from cruise ships and coaches around ten and are largely gone by six. Venice between seven at night and nine in the morning is a different, quieter, genuinely extraordinary city.'
  ],
  see: [
    { n: 'The Basilica di San Marco', t: 'free, queue, dress code',
      d: 'Eight thousand square metres of gold mosaic over a Byzantine plan, built to house the body of St Mark, stolen from Alexandria under a cargo of pork to deter inspection. Pay the small extra for the Pala d’Oro behind the altar and the balcony with the four bronze horses, themselves looted from Constantinople.' },
    { n: 'The Doge’s Palace and the Bridge of Sighs',
      d: 'Government, court and prison in one building, which tells you a good deal about the Venetian Republic. The Secret Itineraries tour gets you into the interrogation rooms and the lead-roofed cells under the eaves, and is much better than the standard route.' },
    { n: 'A vaporetto down the Grand Canal', t: 'line 1, about 40 minutes',
      d: 'The number 1 stops everywhere and takes the full length of the canal from Piazzale Roma to San Marco. Sit outside at the back. This is the cheapest and best sightseeing in the city and shows you the front doors of four hundred years of palaces, which were designed to be seen from the water.' },
    { n: 'The Scuola Grande di San Rocco',
      d: 'Tintoretto spent twenty-three years covering this building with more than sixty paintings, and it remains exactly as he left it. There are mirrors provided so you can look at the ceilings without ruining your neck. Usually almost empty.' },
    { n: 'Getting deliberately lost in Cannaregio or Castello', t: 'any time',
      d: 'The two residential sestieri with the fewest visitors. Washing lines, children playing football against church walls, bars full of people who live here. The Jewish Ghetto in Cannaregio is the original one, the word itself Venetian, with tall buildings because it could not expand sideways.' },
    { n: 'Burano and Torcello', t: 'half a day by boat',
      d: 'Burano for the painted houses and lace; Torcello, two minutes further, for an almost-empty island with a 7th-century cathedral holding a terrifying Byzantine Last Judgement mosaic. Torcello was the lagoon’s first settlement and now has about ten residents.' },
    { n: 'Cicchetti and an ombra', t: 'late morning or early evening',
      d: 'Venetian bar snacks — baccalà mantecato on bread, fried sardines, half a boiled egg with an anchovy — taken standing with a small glass of wine. Do it around the Rialto market or in Cannaregio, moving between two or three bars. This is how Venetians actually eat.' },
    { n: 'The Peggy Guggenheim Collection',
      d: 'An unfinished palazzo on the Grand Canal holding Pollock, Ernst, Picasso and Magritte, which is a useful corrective after four days of the 16th century. The sculpture garden is a good place to sit down.' }
  ],
  when: 'Late September to November and March to May. Summer is hot, crowded and the canals smell at low tide. Winter brings acqua alta — the raised walkways go out and it is genuinely atmospheric — and Carnival in February, which is the single busiest week of the year.',
  stay: 'Three nights. Crucially, stay on the islands rather than in Mestre on the mainland; the whole point is the city after the day visitors leave, and you cannot get that from a hotel by the motorway.',
  move: 'Walk and take the vaporetto. Buy a multi-day travel card if you are staying more than two nights. Gondolas are a fixed-rate tourist ride, not transport — fine if you want it, but the traghetto ferry across the Grand Canal costs two euros and uses the same boats.',
  eat: 'Seafood, and more risotto than pasta. Sarde in saor (sardines with onions, pine nuts and raisins), risotto al nero di seppia, moeche (soft-shell crabs, spring and autumn only). Avoid restaurants with photographs on the menu within sight of San Marco.'
},

/* ===================== NAPLES & CAMPANIA ===================== */
'CAM-naples': {
  intro: [
    'Naples is the most intense city in Italy and the one visitors are most often warned about, usually by people who have not been. What it actually is: a dense, loud, deeply social city of a million people with 2,800 years of continuous history, the best food in the country, and an unusual willingness to conduct private life in public.',
    'It was a Greek colony, then a Roman resort, then for six hundred years the capital of its own kingdom — bigger than Rome, bigger than Madrid, one of the largest cities in Europe. That history is why the archaeological museum holds the best Roman collection anywhere, why there is a royal palace and an opera house older than La Scala, and why the historic centre is a UNESCO site.',
    'The centro storico follows the original Greek street grid, three long straight decumani crossed by narrow alleys, and it is noisy, vertical, draped in laundry and shrines, and completely alive. Normal city sense applies — watch your bag, do not wave a phone about on a scooter-heavy street — and beyond that the warnings are overstated.'
  ],
  see: [
    { n: 'The National Archaeological Museum', t: 'half a day',
      d: 'Everything portable from Pompeii and Herculaneum came here: the Alexander mosaic, the Farnese Hercules, the bronzes from the Villa of the Papyri, and the Secret Cabinet of erotic material that was locked away for two centuries. See this before the sites themselves and the sites make far more sense.' },
    { n: 'Pizza, properly', t: 'lunch',
      d: 'Naples invented it and protects it: a true Neapolitan pizza is cooked in under ninety seconds at 485°C and arrives soft, blistered and foldable, not crisp. Marinara or margherita, four or five euros. Da Michele, Sorbillo and Di Matteo all have queues; a dozen neighbourhood places have none and are nearly as good.' },
    { n: 'Napoli Sotterranea', t: 'guided, 90 minutes',
      d: 'Forty metres down into Greek quarries that became Roman aqueducts, then cisterns, then air-raid shelters in 1943. Parts of the route are very narrow and lit by candle. The city underneath the city, which in Naples is literal.' },
    { n: 'The Cappella Sansevero', t: 'book ahead, 30 minutes',
      d: 'For the Veiled Christ: a marble figure under a marble shroud carved so finely that for two centuries people insisted it must be a real cloth chemically turned to stone. It is not. One room, small ticket, genuinely astonishing.' },
    { n: 'Spaccanapoli and Via San Gregorio Armeno', t: 'afternoon',
      d: 'The dead-straight alley that splits the old city, lined with churches, street food and the nativity-figure workshops of San Gregorio Armeno, which make cribs all year and will sell you a terracotta footballer or politician alongside the shepherds.' },
    { n: 'Certosa di San Martino', t: 'half day, funicular up',
      d: 'A Carthusian monastery on the Vomero hill with extravagant baroque interiors, a collection of historic cribs, and the best view over the bay to Vesuvius. Take the funicular up and walk down through the Pedamentina steps.' },
    { n: 'The Catacombs of San Gennaro', t: 'north of the centre',
      d: 'Second-century Christian burial galleries on two levels with early frescoes, run as a social enterprise by young people from the Sanità district. The neighbourhood above is one of the most interesting in the city.' }
  ],
  when: 'April to June and September to October. August is hot and much of the city shuts for Ferragosto. Winter is mild and the city is at its most itself.',
  stay: 'Two or three days for the city, more if you are using it as a base for Pompeii, Herculaneum, Vesuvius and the islands, which are all within an hour and all better reached from here than from the Amalfi Coast.',
  move: 'Walk the centro storico; funiculars for the hills; the Circumvesuviana train for Pompeii, Herculaneum and Sorrento, which is slow, crowded and the only practical option. Ferries and hydrofoils to the islands leave from Molo Beverello.',
  eat: 'Pizza, obviously. Also sfogliatella (ricciola for the crisp layered one, frolla for the soft), babà, pasta e patate, and anything fried from a street counter. Coffee is taken standing, short, and already sweetened unless you say otherwise.'
},

'CAM-pompeii': {
  intro: [
    'On 24 August 79 AD — or possibly in October, the sources disagree — Vesuvius put a column of ash and pumice twenty kilometres into the sky and then collapsed it. Pompeii, six kilometres downwind, was buried under four to six metres of pumice and ash over about eighteen hours. Roughly 1,100 bodies have been found, but much of the population got out.',
    'What makes it extraordinary is not the destruction but the ordinariness it preserved. This was a prosperous provincial town of perhaps 11,000 people, and you are walking its actual streets: the ruts worn by cart wheels, the stepping stones across the road, the bars with the holes where the jars of hot food sat, the election slogans painted on the walls, the graffiti scratched by bored people.',
    'It is also very large — about 44 hectares, two thirds excavated — and almost entirely without shade. People routinely underestimate both the scale and the heat, and leave after ninety minutes having seen a tenth of it.'
  ],
  see: [
    { n: 'The Forum', t: 'start here',
      d: 'The civic centre, with Vesuvius framed at the end of it, which is the photograph everyone takes and also the clearest possible statement of what happened. The surrounding temples and basilica show the standard Roman town plan.' },
    { n: 'The Villa of the Mysteries', t: 'outside the main walls',
      d: 'A fifteen-minute walk beyond the northwest gate and worth every step. The megalographic fresco cycle around one room shows a woman being initiated into a Dionysian cult, in a red that has not faded in two thousand years. Far fewer people make it out here.' },
    { n: 'The House of the Faun',
      d: 'The largest private house in the town, bigger than most royal palaces of its day, named for the dancing bronze in the atrium. The Alexander mosaic came from here — what you see is a copy, the original is in Naples.' },
    { n: 'The Lupanar',
      d: 'The purpose-built brothel, with stone beds and explicit frescoes above each door that may have functioned as a menu. Small, always crowded, and a reminder that this was a port town.' },
    { n: 'The Stabian Baths',
      d: 'The best-preserved bath complex, with the changing room’s stucco ceiling still in place and the hollow walls that carried the hot air visible where plaster has fallen away.' },
    { n: 'The Amphitheatre and the Great Palaestra', t: 'far end',
      d: 'The oldest surviving Roman amphitheatre, from 70 BC, and the exercise ground beside it. Most visitors never walk this far east, so you often get it nearly to yourself.' },
    { n: 'The casts', t: 'Garden of the Fugitives and the granary',
      d: 'Plaster poured into the voids left by decayed bodies, a technique invented here in 1863. The Garden of the Fugitives holds thirteen of them where they fell. It is a confronting thing to look at and should be.' }
  ],
  when: 'Spring and autumn, and start at opening. There is almost no shade and the stone radiates heat; July and August afternoons are genuinely dangerous for anyone who has not brought water and a hat. The site is closed some Mondays in winter.',
  stay: 'Four hours minimum, a full day to do it properly. Combine with Herculaneum on a separate day rather than the same one — they are very different and both deserve attention.',
  move: 'Circumvesuviana train from Naples or Sorrento to Pompei Scavi–Villa dei Misteri, which puts you at the gate. Wear real shoes: the streets are uneven basalt and the stepping stones are ankle-turners.',
  eat: 'Not on site, where the options are poor. The modern town of Pompei just outside has normal restaurants at normal prices, and Naples is half an hour away.'
},

'CAM-herculaneum': {
  intro: [
    'Herculaneum was a smaller, richer seaside town closer to the volcano, and it was destroyed differently. Pompeii was buried slowly under falling pumice; Herculaneum was hit by pyroclastic surges — avalanches of gas and debris at around 500°C — that filled the town to twenty metres and then set like rock.',
    'The result is counter-intuitive: the hotter catastrophe preserved more. Wood did not burn, it carbonised. Upper storeys survived instead of collapsing. There are wooden doors, roof beams, a bed, a baby’s cradle, linen, rope and carbonised loaves still stamped with the baker’s name.',
    'It is a quarter the size of Pompeii and perhaps twice as vivid, and because the modern town of Ercolano is built directly on top of it the excavation sits in a deep rectangular pit with apartment blocks looking down into it. Most visitors go to Pompeii and skip this, which is a mistake.'
  ],
  see: [
    { n: 'The boat sheds', t: 'at the old shoreline',
      d: 'Twelve vaulted chambers on what was the beach, where more than three hundred skeletons were found in the 1980s huddled together waiting for rescue that never came. For two centuries it was assumed the town had been evacuated. This is the most sobering place in either site.' },
    { n: 'The House of the Neptune and Amphitrite Mosaic',
      d: 'A nymphaeum at the back of a small house with a wall mosaic in glass tesserae, blues and greens still brilliant. Next door is a shop with its wooden partition and stock shelving still standing.' },
    { n: 'The College of the Augustales',
      d: 'Frescoes of Hercules in a vivid architectural setting, and the skeleton of the caretaker found in the small room behind.' },
    { n: 'The Central Baths',
      d: 'Separate men’s and women’s sections, with intact mosaic floors, a vaulted ceiling and the wooden shelving for clothes still in place in the changing room.' },
    { n: 'The carbonised objects', t: 'throughout',
      d: 'Look specifically for the wood: door frames, a bedstead, a screen, shop fittings, roof timbers. Nowhere else in the Roman world is this preserved, and it is easy to walk past if you are not looking for it.' },
    { n: 'The Villa of the Papyri', t: 'usually viewable only from above',
      d: 'A vast seafront villa, possibly the house of Caesar’s father-in-law, holding the only library to survive from antiquity: 1,800 carbonised scrolls, now slowly being read by X-ray and machine learning. Access is restricted but the setting is visible.' }
  ],
  when: 'Same as Pompeii, with one advantage: the site is deeper and narrower, so there is more shade through the middle of the day.',
  stay: 'Two to three hours is genuinely enough to see all of it, which is part of why it is the better choice if you only have one day.',
  move: 'Circumvesuviana to Ercolano Scavi, then a ten-minute walk downhill to the entrance. The same line continues to Pompeii, so both are easy from Naples or Sorrento.',
  eat: 'Ercolano has little. Plan to eat in Naples, twenty minutes up the line.'
},

'CAM-mount-vesuvius': {
  intro: [
    'Vesuvius is the only active volcano on the European mainland and the most dangerous in the world by exposure: around three million people live close enough to be in a red zone, and the last eruption was in March 1944, filmed by American airmen whose bombers it destroyed on the ground.',
    'The cone you walk up is Gran Cono, which grew inside the collapsed caldera of the much larger Monte Somma — the broken ridge you can see on the northern side is the rim of the older mountain. The crater is about 300 metres across and 230 deep, and there are fumaroles still steaming on the inner walls.',
    'The practicalities are simple and people still get them wrong. The road ends at a car park at about 1,000 metres; from there it is a walk of roughly 25 to 30 minutes up a loose gravel switchback to the rim. Entry is timed and booked online, and the mountain closes without warning in bad weather because the path is exposed.'
  ],
  see: [
    { n: 'The crater rim walk', t: '1 hour round trip plus the climb',
      d: 'The path runs part of the way around the rim with guides stationed along it. Look for the steam vents on the inner wall and the lava flows of 1944 and 1872 on the slopes below, which are still visible as dark tongues through the vegetation.' },
    { n: 'The view back over the bay',
      d: 'From the rim you can see Naples, the whole curve of the bay, Capri, the Sorrentine peninsula and, directly below, the dense grey sprawl of the towns built on the volcano’s own flank. It explains the risk better than any museum.' },
    { n: 'Vesuvius National Park trails', t: 'nine marked routes',
      d: 'Most visitors only do the crater path. The park has nine other trails through the Valle dell’Inferno and the old Somma ridge, with far fewer people and much better wildflowers in spring.' },
    { n: 'The wine on the lower slopes', t: 'half day',
      d: 'Lacryma Christi del Vesuvio grows in volcanic soil on ungrafted rootstock, because phylloxera could not survive the ash. Several estates on the slopes do tastings and most visitors never think to go.' }
  ],
  when: 'Spring and autumn. The summit is exposed and can be cold and windy even when Naples is warm; cloud frequently closes it. Check the forecast the morning of, and avoid days with rain, which turns the gravel to slurry.',
  stay: 'Half a day including transport from Naples.',
  move: 'Circumvesuviana to Ercolano or Pompeii, then a shuttle bus up the mountain road. By car you can drive to the upper car park. Proper shoes are essential — the path is deep loose scree and sandals are miserable on it.',
  eat: 'Nothing at the summit but a stall or two. Eat before you come up.'
},

'CAM-amalfi-coast': {
  intro: [
    'The Amalfi Coast is fifty kilometres of near-vertical limestone on the south side of the Sorrentine peninsula, with thirteen towns wedged into whatever clefts and ledges the geology allowed. There is one road, the SS163, cut into the cliff in the 1850s, and it is both the reason the coast is famous and the main problem with visiting it.',
    'Amalfi itself was a maritime republic in the 9th to 11th centuries, trading with Byzantium and North Africa on equal terms with Venice and Pisa. The decline was abrupt — a Pisan sacking, then a seaquake in 1343 that took much of the medieval harbour into the sea — and the coast spent five hundred years poor and isolated, farming lemons on hand-built terraces. The terraces are still there, and still worked.',
    'The honest warning: in July and August the road is close to gridlocked, the towns are full, and a twelve-kilometre journey can take two hours. The coast in May or October is a different and much better place.'
  ],
  see: [
    { n: 'Driving or riding the SS163', t: 'the whole point',
      d: 'Hairpins, tunnels cut through headlands, and sheer drops with low walls. If you are not a confident driver, take the SITA bus and sit on the right going east — it is a better view and someone else is doing the work. Scooter is the local answer.' },
    { n: 'The Path of the Gods', t: '3 hours, Bomerano to Nocelle',
      d: 'A high trail along the cliff tops from Bomerano down to Nocelle above Positano, 1,700 steps at the end. Walk it in that direction so the descent is at the finish, and go early. The best thing on the coast that does not involve the road.' },
    { n: 'Amalfi’s cathedral and cloister',
      d: 'Sixty-two steps up to an Arab-Norman striped facade, with the Cloister of Paradise beside it — interlaced pointed arches that look straight out of North Africa, because the trade connection was real.' },
    { n: 'Ravello’s two villas', t: 'half a day',
      d: 'Villa Rufolo and Villa Cimbrone, 350 metres above the sea. Cimbrone’s Terrace of Infinity is a stone balustrade lined with busts that ends in nothing but sky and water. Ravello is cooler, quieter and greener than the coast below.' },
    { n: 'The Valle delle Ferriere', t: 'above Amalfi, 3 hours',
      d: 'A damp wooded gorge behind Amalfi with waterfalls, ruined ironworks and ferns that have survived since the last ice age. Almost nobody goes, and it is twenty degrees cooler than the beach.' },
    { n: 'The Emerald Grotto and the coast by boat',
      d: 'Better: hire a small boat or take a water taxi between towns. You avoid the road entirely, the coast was designed to be seen from the sea, and you can swim off the back in coves with no land access.' },
    { n: 'Atrani', t: 'ten minutes’ walk from Amalfi',
      d: 'The smallest municipality in southern Italy, immediately around the headland from Amalfi and almost entirely ignored. A proper small piazza, a church, a beach, and people who live there.' }
  ],
  when: 'May, June, late September and October. Many hotels and restaurants close from November to March. August is the peak of both crowds and heat and the one month to avoid if you have any choice.',
  stay: 'Three to four nights. Base in one town rather than moving: Amalfi for transport links, Ravello for quiet and views, Praiano for a compromise, Positano if the budget allows and you do not mind steps.',
  move: 'SITA buses run the coast road and are cheap and frequent; ferries run Easter to October between Positano, Amalfi, Salerno and Sorrento and are far more pleasant. Parking is scarce and expensive everywhere. Driving in August is a genuine mistake.',
  eat: 'Scialatielli ai frutti di mare, anchovies from Cetara (and colatura, the fermented anchovy sauce descended from Roman garum), lemons the size of fists, and delizia al limone for pudding. Limoncello is made here and is best drunk cold and in small quantities.'
},

'CAM-positano': {
  intro: [
    'Positano is built down a ravine in tiers, which means the town is essentially a staircase with buildings attached. There is one road in, one road out, and everything else is steps — around 1,700 of them from the top of the town to the beach.',
    'It was a poor fishing village that emptied in the 19th century, with much of the population emigrating to America. What brought it back was first the artists and writers who arrived in the 1920s and 30s, and then John Steinbeck, whose 1953 essay in Harper’s Bazaar described it as a dream place that is not quite real until you have gone away from it. The tourism has never stopped since.',
    'It is undeniably beautiful and undeniably expensive, and the two facts are related. It is also physically demanding in a way that catches people out: there is no flat ground, and a trip to dinner can mean two hundred steps each way.'
  ],
  see: [
    { n: 'Spiaggia Grande and Fornillo', t: 'the two main beaches',
      d: 'Spiaggia Grande is the big grey-pebble beach under the town, mostly private clubs with a free public strip. Fornillo, a ten-minute cliff walk west, is smaller, quieter and cheaper. Neither is sand.' },
    { n: 'Santa Maria Assunta',
      d: 'The majolica dome is the thing in every photograph of the town. Inside is a Byzantine Black Madonna that, according to the story that named the place, was being carried past by pirates when a voice said "posa, posa" — put it down.' },
    { n: 'The Roman villa under the church', t: 'small ticket',
      d: 'Excavated and opened only recently: a 1st-century villa buried by the same eruption as Pompeii, directly beneath the crypt, with a fresco of a pink sea creature. Twenty minutes, and most visitors do not know it is there.' },
    { n: 'The Sentiero degli Dei from Nocelle', t: 'half day',
      d: 'Take the bus up to Nocelle and walk the Path of the Gods from the far end, or simply walk down the 1,700 steps from Nocelle to Positano, which is punishing on the knees and spectacular the whole way.' },
    { n: 'A boat to Li Galli', t: 'afternoon',
      d: 'The three islets offshore, once owned by Rudolf Nureyev and before that Léonide Massine, and traditionally identified as the home of Homer’s sirens. You cannot land but you can swim off the boat.' },
    { n: 'Moda positano', t: 'the shops',
      d: 'The loose linen-and-bright-print style was invented here in the 1950s, and dozens of small tailors still make to measure in a day or two. Quality varies enormously; the ones up the hill are usually better value than those on the beach.' }
  ],
  when: 'May, June, September. The town largely shuts from November to Easter. August is extremely full.',
  stay: 'Two nights is enough for the town itself, longer if you are using it as a base. Pack light and wear shoes you can climb in — taxis cannot reach most hotels and porters charge by the bag.',
  move: 'On foot, downhill mostly. The internal orange bus loops the one-way road and saves the worst climbs. Ferries to Amalfi, Capri and Sorrento leave from the main beach and are the best way out.',
  eat: 'Seafood and lemon. Book dinner — the good places are small and fill up. Prices on the beach are roughly double those three hundred steps up.'
},

'CAM-capri': {
  intro: [
    'Capri is a four-square-mile block of limestone that broke away from the Sorrentine peninsula, with cliffs on every side and two towns on top of it. Tiberius ran the Roman Empire from here for the last ten years of his life, which tells you it has been a retreat for the very rich for about two thousand years.',
    'The day-trip pattern dominates it: ferries arrive through the morning, several thousand people funnel up to Capri town and the Blue Grotto, and by six they have gone. Staying a night changes the island completely — the piazzetta at nine in the evening belongs to the people who live there.',
    'Two towns, and they are different. Capri town is the designer shops, the funicular and the crowds. Anacapri, higher up the hill, is quieter, cheaper and where most of the walking is.'
  ],
  see: [
    { n: 'Villa Jovis', t: '45-minute walk from Capri town',
      d: 'Tiberius’s largest villa, on the cliff at the island’s northeast corner, with a 300-metre drop beneath it that Suetonius claimed the emperor used for executions. The walk out is through quiet lanes and almost nobody does it.' },
    { n: 'Monte Solaro by chairlift', t: 'from Anacapri, 12 minutes',
      d: 'A single-seat open chairlift to the island’s highest point at 589 metres. The view takes in the whole Bay of Naples, Vesuvius and the Amalfi Coast. Go early for clear air.' },
    { n: 'Villa San Michele', t: 'Anacapri',
      d: 'Built by the Swedish physician Axel Munthe on the site of another Tiberian villa, stuffed with the classical fragments he collected, with a pergola walk ending in a sphinx looking out over the sea.' },
    { n: 'The Blue Grotto', t: 'mornings, sea permitting',
      d: 'Light enters underwater and turns the cave interior electric blue. The reality is a long queue of boats, a transfer into a rowboat, lying flat to get through the one-metre entrance, and about four minutes inside. Worth it once; closes whenever the swell is up.' },
    { n: 'A boat around the island', t: '2 hours',
      d: 'Better value than the grotto alone, and the only way to understand the shape of the place. Goes through the arch of the Faraglioni, which is traditionally worth a kiss, and stops to swim.' },
    { n: 'The Via Krupp and the Gardens of Augustus',
      d: 'A hairpin footpath cut into the cliff face down to Marina Piccola, seen from the gardens above. Frequently closed for rockfall, in which case the gardens still give you the classic view of the Faraglioni.' },
    { n: 'The Pizzolungo walk', t: '2 hours, easy',
      d: 'A coastal path from the Gardens of Augustus around the southern cliffs past the Natural Arch and the Grotta di Matermania. Free, well surfaced, and empty while everyone is queueing for the grotto.' }
  ],
  when: 'May, June, September, early October. The island is busiest from late June to August and closes substantially in winter.',
  stay: 'One night minimum to see it properly; two is better. Day trips are possible but you will share the island with everyone else doing the same.',
  move: 'No cars for visitors. Funicular from Marina Grande up to Capri town, buses between the towns on alarming narrow roads, open taxis, and a great deal of walking. Luggage is handled by porters with trolleys.',
  eat: 'Insalata caprese was invented here and should be three ingredients and nothing else. Also ravioli capresi with caciotta and marjoram, and torta caprese, a flourless chocolate and almond cake.'
},

/* ===================== SICILY ===================== */
'SIC-mount-etna': {
  intro: [
    'Etna is 3,300 metres and changes height every year, because it is more or less permanently erupting. It is the largest active volcano in Europe, covers 1,200 square kilometres, and has four summit craters plus more than three hundred flank cones. Lava reaches a road most years and a village occasionally.',
    'What makes it unusual among big volcanoes is that it is not especially dangerous day to day. The eruptions are mostly effusive rather than explosive — lava flows you can watch and often outwalk, rather than the pyroclastic violence of Vesuvius. That is why there are towns, vineyards and pistachio groves high on its flanks, and why people farm ground that has been buried twice in living memory.',
    'The mountain has distinct zones. Below about 1,000 metres it is intensively farmed and green. Between 1,000 and 2,000 it is oak, birch and pine with lava flows cutting black channels through them. Above 2,000 it is black desert, and above 2,900 you need a guide.'
  ],
  see: [
    { n: 'The summit craters', t: 'guided only, full day',
      d: 'Cable car from Rifugio Sapienza to 2,500m, then 4x4 buses to around 2,900m, then a guided walk. Above 2,900 metres volcanological guides are legally required and the restriction changes with activity. Cold and windy at the top even in August; they hire out jackets and boots at the base.' },
    { n: 'The Silvestri craters', t: 'free, at Rifugio Sapienza',
      d: 'Two 1892 craters you can walk around at the cable-car base station at 1,900m, with no ticket and no guide. If you are not going to the summit, this still gives you black ash cones and long views.' },
    { n: 'The Circumetnea railway', t: 'half day, Catania to Randazzo',
      d: 'A narrow-gauge line that loops three-quarters of the way round the mountain through lava fields, pistachio groves and small towns. Slow, cheap, and the best way to grasp Etna’s scale without climbing it.' },
    { n: 'Valle del Bove', t: 'viewpoints and trails on the east flank',
      d: 'A vast horseshoe collapse scar five kilometres wide and a kilometre deep that swallows most of the lava from summit eruptions. From the rim at Serra La Nave or Monte Zoccolaro it looks like another planet.' },
    { n: 'Etna wine', t: 'north flank, Randazzo to Linguaglossa',
      d: 'Nerello Mascalese and Carricante grown on terraced volcanic soil at up to 1,000 metres, some of it on vines over a century old that phylloxera never reached. The wines are pale, mineral and nothing like the rest of Sicily. Many estates take visitors.' },
    { n: 'The Grotta del Gelo', t: 'serious hike, north side',
      d: 'A lava tube containing perennial ice, the southernmost glacier in Europe, formed in a 17th-century flow. A long and demanding walk from Piano Provenzana, for experienced hikers with a guide.' },
    { n: 'Alcantara Gorge', t: 'north of the mountain',
      d: 'Basalt columns in a narrow river gorge where a lava flow met water and cooled into vertical prisms. You can wade up it in summer; the water is extremely cold.' }
  ],
  when: 'May, June, September, October for hiking. Skiing from December to March, which is a genuinely strange thing to do with Sicily and the sea in the view. Summit access can shut at any time for activity or weather.',
  stay: 'A full day for the summit excursion. Two or three if you want the wine side and the Circumetnea as well. Catania and Taormina are both within an hour.',
  move: 'Car or organised tour. There is one AST bus a day from Catania to Rifugio Sapienza, leaving early and returning mid-afternoon, which works but leaves no slack.',
  eat: 'Pistachios from Bronte, which are grown on lava and are a different thing from ordinary pistachios. Also mushrooms in autumn, and the wine.'
},

'SIC-palermo': {
  intro: [
    'Palermo has been Phoenician, Greek, Roman, Byzantine, Arab, Norman, Swabian, Angevin, Aragonese, Spanish and Bourbon, and it has not thrown much away. The result is a city where a Norman king’s chapel has Arab muqarnas ceilings and Byzantine mosaics in the same room, and nobody at the time thought that was odd.',
    'The two centuries from 831, when the Arabs took the city, to the Norman conquest in 1072 made it one of the largest and richest cities in the Mediterranean, with hundreds of mosques and a reputation for gardens and water. The Normans who conquered it were sensible enough to keep the administrators, the architects and the irrigation.',
    'It is a shabby, loud, theatrical city that was heavily bombed in 1943 and badly rebuilt, and it has more unrestored baroque per square metre than anywhere. The street markets are the best thing in it and are audibly descended from souks.'
  ],
  see: [
    { n: 'The Cappella Palatina', t: 'inside the Palazzo dei Normanni',
      d: 'Roger II’s private chapel from the 1130s: Byzantine gold mosaics, an Islamic carved wooden honeycomb ceiling, and a Latin plan, all at once. The single best demonstration of what Norman Sicily was. Go early; it gets crowded and the state rooms close on some days.' },
    { n: 'Monreale Cathedral', t: 'half day, bus from the centre',
      d: 'Eight kilometres up the hill, and arguably better than the Palatina: 6,000 square metres of gold mosaic telling the whole Bible, finished in about ten years. The cloister next door has 228 paired columns, every capital different.' },
    { n: 'The markets: Ballarò, Capo and Vucciria', t: 'mornings',
      d: 'Ballarò is the biggest and most working; Capo is the most photogenic; Vucciria is now more nightlife than market. Go to Ballarò around nine and eat standing up — panelle, crocchè, sfincione, and if you are brave, pani ca meusa.' },
    { n: 'The Capuchin Catacombs',
      d: 'Eight thousand mummified bodies in habits and Sunday clothes, standing in corridors, arranged by profession and sex, from the 16th century to 1920. It is macabre and completely matter-of-fact. Not for everyone and not for small children.' },
    { n: 'Teatro Massimo', t: 'tours daily',
      d: 'The largest opera house in Italy and the third largest in Europe, closed for twenty-three years and reopened in 1997. The Godfather Part III ends on its steps. Worth a tour even if you are not seeing a performance.' },
    { n: 'The Martorana and San Cataldo', t: 'same small square',
      d: 'Two 12th-century churches side by side: one with Greek mosaics and an Arabic inscription, the other with three red Islamic domes and almost no decoration inside. Five minutes each and they sit beside the Quattro Canti.' },
    { n: 'Mondello', t: 'afternoon, 11km north',
      d: 'The city beach, a curve of white sand between two headlands with a liberty-style bathing pavilion on stilts. Busy at weekends, and the best escape from the heat of the centre.' }
  ],
  when: 'April, May, October. Summer is very hot and the city empties in August. Winter is mild and wet and the markets are at their best.',
  stay: 'Three days for the city, plus day trips to Monreale, Cefalù and Segesta. A good base for the western half of the island.',
  move: 'The centre is walkable but sprawling and the traffic is chaotic. Buses to Monreale and Mondello. Driving in the old city is a bad idea; park outside it.',
  eat: 'Street food first: arancine (round here, and feminine), panelle, sfincione, cannoli filled to order and never in advance. Pasta con le sarde, with wild fennel, pine nuts and raisins, is the city dish and shows the Arab influence plainly.'
},

'SIC-syracuse': {
  intro: [
    'Syracuse was, for a long stretch of the 5th and 4th centuries BC, the most powerful Greek city anywhere — bigger than Athens, which it defeated catastrophically in 413 BC when an Athenian expedition of two hundred ships ended with the survivors worked to death in the quarries. Cicero called it the greatest and most beautiful of Greek cities.',
    'The visitor city is really two places. Ortigia is the small island where the original settlement was, now a dense baroque-over-medieval-over-Greek warren joined to the mainland by two short bridges. The Neapolis archaeological park is a couple of kilometres inland and holds the Greek theatre and the quarries.',
    'Ortigia is one of the most pleasant places to stay in Sicily: compact, walkable, surrounded by water on all sides, and full of bars that put tables out on limestone squares in the evening.'
  ],
  see: [
    { n: 'The Duomo on Piazza del Duomo',
      d: 'A 5th-century BC Doric temple to Athena that was converted into a church in the 7th century by filling the gaps between the columns. The columns are still there, inside and out — you can put your hand on them. The square it stands on is the finest baroque space in Sicily.' },
    { n: 'The Greek Theatre', t: 'Neapolis park',
      d: 'Carved directly into the hillside, seating around 15,000, and still used for classical drama each May and June. Aeschylus staged plays here himself.' },
    { n: 'The Ear of Dionysius', t: 'same park',
      d: 'A 23-metre limestone quarry cave with extraordinary acoustics, named by Caravaggio, with a legend that the tyrant used it to eavesdrop on prisoners. Clap once inside.' },
    { n: 'The Fountain of Arethusa', t: 'Ortigia waterfront',
      d: 'A freshwater spring full of papyrus a few metres from the sea, which the Greeks explained with a myth about a nymph who fled across the Ionian. Papyrus grows wild here and nowhere else in Europe.' },
    { n: 'The Paolo Orsi archaeological museum',
      d: 'One of the best in Italy and persistently empty. The Landolina Venus and a serious prehistoric and Greek collection, properly laid out.' },
    { n: 'The Ortigia market', t: 'mornings except Sunday',
      d: 'Two streets of fish, tomatoes, cheese and capers with vendors shouting, plus a famous sandwich counter where people queue for half an hour.' },
    { n: 'Swimming off the Ortigia rocks', t: 'late afternoon',
      d: 'Ladders down into deep clear water from the Forte Vigliena area and along the Lungomare. Locals do this right through the season and there is no sand or ticket involved.' }
  ],
  when: 'April to June, September and October. Summer is hot. The Greek drama season runs mid-May to early July and is worth planning around.',
  stay: 'Two or three days. An excellent base for the Val di Noto towns — Noto, Modica and Ragusa are all within an hour.',
  move: 'Ortigia is entirely walkable. The archaeological park is a half-hour walk or a short bus ride from the bridges.',
  eat: 'Seafood, and specifically raw: gamberi rossi from Mazara, sea urchins in spring. Also pasta alla siracusana, and almond milk and granita for breakfast with a brioche.'
},

'SIC-taormina': {
  intro: [
    'Taormina sits on a terrace two hundred metres above the sea with Etna filling the view south, which is an improbable amount of scenery for one town. It has been a resort since the 19th century, when Goethe’s account and then a German photographer’s nudes made it a fixture of the northern European imagination, and it has been fashionable, in waves, ever since.',
    'The Greek theatre is the reason to come, and specifically the fact that the back wall of the stage has partly collapsed, so the gap frames Etna and the coastline where the scenery should be. It is the most spectacularly sited ancient theatre in the Mediterranean and it is still used for concerts.',
    'The town itself is handsome, extremely busy in season, and expensive. It is also small — one main street, Corso Umberto, about half a mile long — and the best parts are the gardens and the paths off it.'
  ],
  see: [
    { n: 'The Teatro Antico', t: 'go at opening or for a concert',
      d: 'Greek in origin, extensively rebuilt by the Romans. Come at nine when it opens or book an evening performance; the midday light is harsh and the crowds solid.' },
    { n: 'Villa Comunale', t: 'free',
      d: 'Gardens laid out by a Scottish aristocrat exiled from London society, full of eccentric brick follies she called beehives, on a terrace with a clear drop to the sea. The best place in town to sit down.' },
    { n: 'Isola Bella', t: 'below the town',
      d: 'A tiny nature-reserve island joined to the pebble beach by a spit you can usually walk. Cable car down from the town, which saves a long descent. The water is clear and the beach is busy.' },
    { n: 'Castelmola', t: '1 hour walk up, or bus',
      d: 'A village another 300 metres above Taormina with a ruined castle and a wider view. The walk up is steep, stepped and quiet; the almond wine at the top is the local ritual.' },
    { n: 'Day trip to Etna', t: 'full day',
      d: 'Taormina is the most common base for the volcano, an hour away. Tours leave daily and most include a winery on the north flank.' },
    { n: 'The Saturday market', t: 'mornings',
      d: 'In the car park below the old town, and the one moment in the week when Taormina is a Sicilian town doing its shopping rather than a resort.' }
  ],
  when: 'May, June, September, October. July and August are very crowded and hot. The theatre’s summer festival runs June to September.',
  stay: 'Two nights, or use it as a base for Etna, Syracuse and the Alcantara gorge for four or five.',
  move: 'The town is pedestrianised and on a hill; the station is down at sea level with a bus up. Cable car to the beach. Park in one of the multi-storeys below and walk up.',
  eat: 'Good but priced for the view. Walk off Corso Umberto for better value, or down to Giardini Naxos.'
},

'SIC-agrigento': {
  intro: [
    'The Valley of the Temples is not a valley but a ridge, which matters because the temples were built along it to be seen from the sea by anyone approaching the city. Akragas was founded around 580 BC and within a century was one of the richest Greek cities in the world; Pindar called it the most beautiful city of mortals.',
    'Seven Doric temples survive in varying states, strung along about two kilometres. The Temple of Concordia is the best preserved Greek temple anywhere outside Athens, and it survives because it was converted into a Christian basilica in the 6th century, which meant somebody kept the roof on.',
    'The modern town above is unremarkable and largely 20th-century. The site is what you come for, and it is large, exposed, and best seen either early or in the last two hours of daylight, when the limestone goes gold.'
  ],
  see: [
    { n: 'The Temple of Concordia',
      d: 'Thirty-four columns, complete entablature, standing almost as built in 440 BC. There is a modern bronze Icarus lying fallen beside it, which people either love or find intrusive.' },
    { n: 'The Temple of Juno', t: 'east end of the ridge',
      d: 'On the highest point, partly ruined, with fire damage from the Carthaginian sack of 406 BC still visible on the stone.' },
    { n: 'The Temple of Olympian Zeus',
      d: 'Never finished and now a vast field of tumbled blocks. It would have been among the largest Greek temples ever built, held up by 38 telamons — eight-metre stone giants. One lies on his back among the rubble and a reconstructed one stands in the museum.' },
    { n: 'The Garden of the Kolymbethra', t: 'separate small ticket',
      d: 'A sunken citrus garden in an ancient irrigation basin inside the park, restored by the national trust. Shaded, scented, almost empty, and the only cool place on the site.' },
    { n: 'The Regional Archaeological Museum',
      d: 'The telamon, the Ephebe of Agrigento and a very good vase collection. Essential context and twenty minutes from the temples.' },
    { n: 'The site after dark', t: 'summer evenings',
      d: 'The park opens late in summer with the temples lit. Concordia floodlit against a black sky is worth rearranging a day for.' },
    { n: 'Scala dei Turchi', t: '20 minutes west',
      d: 'A blinding white marl cliff stepping down to the sea. Access has been restricted on and off for erosion, so check before going, but even from the adjacent beach it is remarkable.' }
  ],
  when: 'Spring above all — the almond blossom in February and the wildflowers in March and April are part of the experience. Summer is brutally hot with no shade; go at opening or in the evening.',
  stay: 'A full day for the park and museum. Most people stay one night, often in a farmhouse outside town rather than in Agrigento itself.',
  move: 'Car is easiest. The park has two entrances a long way apart with a shuttle between; walking the ridge one way and taking the shuttle back saves retracing two kilometres uphill.',
  eat: 'Nothing good in the park. The coastal towns nearby do excellent fish, and the area is known for almonds and pistachios.'
},

/* ===================== NORTH ===================== */
'TAA-dolomites': {
  intro: [
    'The Dolomites are not granite but a pale carbonate rock — dolomite, named after the Frenchman who identified it — laid down as a tropical reef in the Triassic and then shoved vertically upward. That origin is why they look so unlike the rest of the Alps: not pyramids of dark rock but towers, walls and organ pipes of pale grey that turn pink and then red at sunrise and sunset. The locals call it enrosadira.',
    'The region is culturally three-way. South Tyrol, in the north, voted to stay Austrian in 1919 and was given to Italy anyway; it speaks German first, cooks dumplings and smoked speck, and is bilingual on every sign. Trentino to the south is Italian. And in five valleys in between, about 30,000 people speak Ladin, a Rhaeto-Romance language older than either.',
    'The infrastructure is the other thing to understand. This is the most lift-served mountain range in the world, with hundreds of cable cars and a network of rifugi — mountain huts that serve full lunches and let rooms — which means you can do serious high-altitude walking without carrying a tent or a great deal of skill.'
  ],
  see: [
    { n: 'Tre Cime di Lavaredo circuit', t: '10 km, 4 hours, easy',
      d: 'The classic. Drive or bus to Rifugio Auronzo, then walk anticlockwise around the three towers, stopping at Rifugio Locatelli for the head-on view. The toll road is expensive and fills by nine in summer.' },
    { n: 'Alpe di Siusi at first light', t: 'Seiser Alm',
      d: 'Europe’s largest high alpine meadow. Cars are banned during the day, so either take the cable car from Ortisei or stay up on the plateau, which lets you be out on it at dawn when the Sciliar goes red.' },
    { n: 'Seceda ridge', t: 'cable car from Ortisei',
      d: 'A tilted meadow that ends abruptly in a blade of rock. Twenty minutes’ walk from the lift station gets you the view; a longer loop down to Col Raiser makes a half day of it.' },
    { n: 'Lago di Braies', t: 'timed entry in summer',
      d: 'Green water, a wooden boathouse and a rock wall behind. So heavily photographed that access is now restricted between 9.30 and 4 in high season — go at seven, or walk the easy hour-long loop around the shore.' },
    { n: 'The Great War tunnels on Lagazuoi', t: 'cable car from Falzarego',
      d: 'The front ran through these mountains from 1915 to 1917 and both sides tunnelled through the rock and mined each other. You can descend through the Italian tunnel system with a helmet and a torch. Sobering and extraordinary.' },
    { n: 'A via ferrata', t: 'guided if you have not done one',
      d: 'Protected climbing routes with fixed cables and ladders, invented here for the war and now the signature activity of the range. There are routes from genuinely easy to severe; hire a guide and a kit for the first one.' },
    { n: 'The Sella Ronda', t: 'full day, ski or bike',
      d: 'A circuit of the Sella massif through four valleys and four Ladin-speaking communities, done on lifts and pistes in winter or on a road bike in summer when the passes close to cars one day a week.' },
    { n: 'Staying in a rifugio', t: 'book ahead',
      d: 'Dinner, a bunk, and being above the cloud at sunrise. This is the thing people remember. Many are reachable by a short walk from a lift, so it does not require a multi-day trek.' }
  ],
  when: 'Mid-June to early October for walking — lifts and huts mostly run from late June, and many close in early October. December to March for skiing. Late May and November are the closed seasons when very little runs.',
  stay: 'Four to seven days. Base in one valley rather than touring: Val Gardena for lifts and access, Alta Badia for food, Cortina for the town, Val di Funes for quiet.',
  move: 'A car gives the most freedom, and the passes are spectacular drives. The regional bus network in South Tyrol is unusually good, and a Mobilcard covers buses and trains. Many hotels give guest cards that include transport.',
  eat: 'This is dumpling and speck country, not pasta. Canederli, schlutzkrapfen, barley soup, apple strudel and Kaiserschmarrn. The valley floors grow apples and make good white wine; the Alto Adige is Italy’s best white wine region.'
},

'LOM-lake-como': {
  intro: [
    'Como is a glacial lake in the shape of an inverted Y, 46 kilometres long, 410 metres deep — the fifth deepest in Europe — and hemmed in by mountains that rise steeply from the water. There is very little flat land, which is why the villages are strung along the shore in ribbons and why the roads are narrow and slow.',
    'The villas are the particular thing here. From the 16th century this was where Milanese nobility built summer houses, and the combination of mild lake climate and steep ground produced terraced gardens full of plants that should not grow this far north. Several are open, and they are the main attraction after the water itself.',
    'The three branches have different characters: Como town at the southwest tip is a real city with a cathedral; Lecco at the southeast is industrial and unvisited; the northern arm is wilder and windier, which is why the windsurfers go there. The middle, where the branches meet around Bellagio, is the postcard.'
  ],
  see: [
    { n: 'Villa del Balbianello', t: 'Lenno, boat access best',
      d: 'On a wooded promontory with a loggia looking both ways up the lake, and the most beautiful garden on it. Reached by a short boat ride or a twenty-minute walk through the woods. Used in Star Wars and Casino Royale, which has not improved the queues.' },
    { n: 'Villa Carlotta', t: 'Tremezzo',
      d: 'Fourteen acres of terraced garden with a spectacular display of azaleas and rhododendrons in late April and May, plus Canova sculpture indoors.' },
    { n: 'Varenna', t: 'east shore',
      d: 'Quieter and prettier than Bellagio, with a lakeside walkway built on stilts, the gardens of Villa Monastero, and a ruined castle above with a falconry display. The ferry pier makes it a good base.' },
    { n: 'Bellagio', t: 'the point of the Y',
      d: 'The famous one, with stepped alleys of shops between two waterfronts. Extremely busy from midday; charming at eight in the morning and after seven at night.' },
    { n: 'The Greenway del Lago di Como', t: '10 km, 3-4 hours',
      d: 'A marked low-level walking route between Colonno and Cadenabbia through old lakeside villages, mule tracks and villa gates. Easy, free and almost empty.' },
    { n: 'The Como–Brunate funicular', t: 'from Como town',
      d: 'Seven minutes up 500 metres to a village with a view down the whole southwest branch. Walk on up to the lighthouse for more.' },
    { n: 'Crossing by car ferry', t: 'Varenna–Bellagio–Cadenabbia',
      d: 'The lake is a V-shaped trench and driving round it takes hours. The car ferry in the middle saves most of that and is a lovely twenty minutes.' }
  ],
  when: 'Late April to June — the gardens peak in May — and September. July and August are busy and the roads are slow. Many villas and hotels close from November to March.',
  stay: 'Three nights. Base on the ferry network around the centre of the lake rather than at either southern tip.',
  move: 'Boats, which are frequent, cheap and much more pleasant than the roads. There are fast hydrofoils and slow ferries; the slow ones are better. Driving the shore roads is narrow, busy and parking is scarce.',
  eat: 'Lake fish, especially perch with risotto and missoltini, the dried and pressed shad that is an acquired taste. Pizzoccheri, buckwheat pasta with cabbage and cheese, comes down from the Valtellina.'
},

'LIG-cinque-terre': {
  intro: [
    'Five villages — Monterosso, Vernazza, Corniglia, Manarola and Riomaggiore — wedged into a seventeen-kilometre stretch of cliff coast that had no road to it at all until the 20th century. They were connected by footpaths and by sea, and that isolation is why they look the way they do: tall, narrow, stacked houses painted in different colours, on whatever ledge was available.',
    'Behind and above them are the terraces. Something like 7,000 kilometres of dry-stone wall were built by hand over centuries to make vine-growing possible on a 45-degree slope, and the whole landscape is a UNESCO site for that reason as much as for the villages. Many terraces are now abandoned, which is a live problem for landslides.',
    'The villages are very small and the visitor numbers are very large — over two million a year into places with a few hundred residents each. Everything about visiting well follows from that: come outside July and August, start early, and walk rather than queue for the train.'
  ],
  see: [
    { n: 'The Sentiero Azzurro', t: 'the coastal path, ticketed',
      d: 'The classic village-to-village walk. Sections close regularly after landslides, so check what is open before you plan; the Monterosso–Vernazza and Vernazza–Corniglia legs are the most spectacular and the most strenuous. A Cinque Terre Card covers the path and the trains.' },
    { n: 'The high path from Riomaggiore to Portovenere', t: 'full day, hard',
      d: 'Up on the ridge rather than the coast, with the whole gulf below and almost nobody on it. Six to seven hours and a serious walk, finishing in Portovenere, with a boat back.' },
    { n: 'Vernazza’s harbour', t: 'late afternoon',
      d: 'The only natural harbour of the five and the most photogenic village, with a small piazza opening straight onto the water. Climb to the Doria castle tower for the view down onto it.' },
    { n: 'Manarola at sunset', t: 'from the Nessun Dorma terrace',
      d: 'The view back at the village from the cemetery path is the image of the Cinque Terre. Go an hour before sunset and expect company.' },
    { n: 'Corniglia', t: '382 steps up from the station',
      d: 'The only one of the five not on the water, on a headland a hundred metres up. The staircase filters out a good proportion of visitors, which is exactly why it is the calmest.' },
    { n: 'Swimming', t: 'Monterosso and Vernazza',
      d: 'Monterosso has the only real sand beach. Elsewhere it is rocks and ladders into deep water, which is better if you can manage it.' },
    { n: 'The wine', t: 'Sciacchetrà and local white',
      d: 'The terraces make a sharp dry white and, rarely, Sciacchetrà, a sweet passito from dried grapes that is produced in tiny quantities and is expensive for good reason.' }
  ],
  when: 'April to early June and mid-September to October. July and August are extremely crowded and hot on the paths. Winter is quiet but many places close and paths can be shut by weather.',
  stay: 'Two nights to walk the coast properly. Rooms in the villages are small, expensive and booked far ahead; Levanto and La Spezia are cheaper bases ten minutes away by train.',
  move: 'The regional train runs through tunnels between all five villages in a couple of minutes each and is the backbone. Boats run between all but Corniglia in season and give the best views. Cars are effectively useless — the villages are closed to them.',
  eat: 'Pesto, which was invented in Liguria, with trofie or trenette and green beans and potato in the same bowl. Anchovies from Monterosso, salted or marinated. Focaccia, and farinata, a chickpea pancake.'
},

'BAS-matera': {
  intro: [
    'Matera is two ravine sides of caves that people have lived in continuously for around 9,000 years, which makes it one of the oldest permanently inhabited settlements on earth. The Sassi — the two cave districts — are dug into soft limestone, and the characteristic structure is a carved chamber at the back with a built facade at the front, so what looks like a town of houses is mostly a town of holes.',
    'In 1952 the Italian government forcibly emptied the Sassi. Carlo Levi’s book had described families of ten sharing single caves with their livestock, with malaria and infant mortality to match, and it caused a national scandal — la vergogna nazionale, the shame of Italy. Fifteen thousand people were moved to new housing and the caves were left empty and illegal to enter for thirty years.',
    'The reversal is remarkable. Squatters and then architects moved back in the 1980s, UNESCO listed it in 1993, and in 2019 it was European Capital of Culture. The same caves are now hotels and restaurants. It is worth holding both halves of that story in mind while you walk around, because the prettiness is very recent.'
  ],
  see: [
    { n: 'Sasso Caveoso and Sasso Barisano', t: 'walk both',
      d: 'The two districts, separated by the spur with the cathedral on it. Caveoso is rawer and more obviously cave-like; Barisano has more carved facades. Get lost in both; the stepped lanes double as roofs.' },
    { n: 'Casa Grotta di Vico Solitario', t: '30 minutes',
      d: 'A cave house furnished exactly as it was when families were evicted in the 1950s, with the bed, the loom, the cistern and the stall for the mule a metre from where people slept. The single most useful thing to see here and it costs almost nothing.' },
    { n: 'The rock churches', t: 'Santa Lucia alle Malve, Madonna delle Virtù',
      d: 'More than 150 churches were cut into the rock from the 8th century onwards, many with Byzantine frescoes still on the walls. Santa Lucia alle Malve has the best surviving painting.' },
    { n: 'The Murgia Timone belvedere', t: 'across the ravine',
      d: 'The view of the whole of Matera from the opposite side of the gorge, reached by a path down through the canyon and up the other side, or a short drive. Go at sunset, and again after dark when the Sassi are lit.' },
    { n: 'The Palombaro Lungo', t: 'under the main square',
      d: 'An enormous cistern cut fifteen metres into the rock beneath Piazza Vittorio Veneto, only rediscovered in 1991. Water management is the reason a town could exist here at all.' },
    { n: 'MUSMA', t: 'contemporary sculpture in caves',
      d: 'A sculpture museum in a palazzo whose lower floors are caves, which turns out to be an unusually good setting for it.' }
  ],
  when: 'April to June and September to October. Summer is extremely hot — the stone holds heat — and winter can be cold and wet, though the Christmas living nativity in the Sassi is a real event.',
  stay: 'Two nights, and stay in a cave hotel. It is the whole point and the good ones are not expensive by Italian standards.',
  move: 'On foot, and expect a great deal of up and down on uneven steps. Luggage is a genuine problem — ask your hotel how close a car can get before you book.',
  eat: 'Pane di Matera, a huge sourdough with IGP protection that keeps for a week. Also orecchiette, cruschi peppers (dried, then flash-fried until they shatter), and lamb.'
},

'VEN-verona': {
  intro: [
    'Verona sits inside a tight loop of the Adige with a Roman street grid still legible underneath the medieval one, and it has been strategically important for two thousand years because it controls the route from Italy to the Brenner Pass. That gave it Roman monuments, a ruling dynasty of some brutality in the Scaligeri, and a long Venetian period.',
    'The arena is the thing. Built around 30 AD, it is the third largest Roman amphitheatre to survive and the only one still in regular use for its original purpose of putting on spectacles for very large crowds — around 15,000 people a night for the opera season, which has run since 1913.',
    'The Juliet business is entirely invented. The balcony was added to a 14th-century house in 1936 to give the tourists something to look at, and the bronze statue below it is a 1960s copy. It is harmless and extremely crowded, and the rest of the city is much better.'
  ],
  see: [
    { n: 'Opera at the Arena', t: 'June to early September',
      d: 'Sit on the stone steps with a cushion rather than in the padded seats if you want the real thing, and bring something warm. Aida is the traditional production and the scale of the staging is the point. The acoustics are unamplified and astonishing.' },
    { n: 'Castelvecchio and its museum',
      d: 'A Scaligeri fortress on the river, famously restored by Carlo Scarpa in the 1960s in a way that is studied by architects as carefully as the collection is by art historians. The fortified bridge beside it was blown up in 1945 and rebuilt from the river bed.' },
    { n: 'San Zeno Maggiore',
      d: 'The finest Romanesque church in northern Italy, with 48 bronze door panels from the 11th and 12th centuries and a Mantegna altarpiece inside. A fifteen-minute walk from the centre and usually quiet.' },
    { n: 'The Scaliger tombs', t: 'Santa Maria Antica',
      d: 'Gothic funeral monuments on an extravagant scale, suspended in the air behind wrought iron in a small square. The family had names like Mastino, Cangrande and Cansignorio — Mastiff, Big Dog and Lord Dog — which gives the flavour.' },
    { n: 'Torre dei Lamberti', t: 'lift available',
      d: 'Eighty-four metres over Piazza delle Erbe, with the whole Roman grid and the river loop laid out beneath you.' },
    { n: 'Giardino Giusti', t: 'across the river',
      d: 'A 16th-century Renaissance garden with a cypress avenue and a grotesque mask in the cliff at the back, which Goethe admired. Climb to the top terrace for the city.' },
    { n: 'Valpolicella', t: 'half day, just north',
      d: 'The hills immediately north make Amarone, from grapes dried on racks for months before pressing. Several estates visit by appointment and it is twenty minutes from the city.' }
  ],
  when: 'April to June and September to October. The opera season fills the city from late June; book accommodation well ahead for it. Summer is hot in the Po plain.',
  stay: 'Two days, or one long one. A good stop between Venice and Milan, and a base for Lake Garda, thirty minutes away.',
  move: 'Walk; the centre is compact and inside the river loop. The station is a fifteen-minute walk or a short bus ride from Piazza Brà.',
  eat: 'Horse and donkey are traditional here and appear as pastissada de caval. Less alarmingly: risotto all’Amarone, bigoli pasta, and Monte Veronese cheese. Soave and Valpolicella are the local wines.'
},

'TOS-siena': {
  intro: [
    'Siena lost. That is the key to the city: it was Florence’s equal and rival through the 13th century, then the Black Death killed perhaps two thirds of the population in 1348, and the recovery never came. Florence finally took it in 1555. The consequence is that Siena stopped building, and what stands is a Gothic city that was never Renaissance-ed over.',
    'It is built on three ridges, which is why nothing is flat and why the Campo — the shell-shaped square where the ridges meet — works as it does. The square slopes towards the Palazzo Pubblico at the bottom, is paved in brick divided into nine segments for the Council of Nine who governed the city, and functions as a public living room where people simply sit on the ground.',
    'The Palio, run twice each summer, is not a tourist event that locals tolerate. It is a contest between the seventeen contrade — neighbourhoods with their own flags, churches, museums and baptismal fonts — that structures social life year-round. The race lasts about ninety seconds.'
  ],
  see: [
    { n: 'The Campo and the Palazzo Pubblico',
      d: 'Inside the palace is Lorenzetti’s Allegory of Good and Bad Government from the 1330s, a vast secular fresco cycle showing what happens to a city governed well and badly. It is one of the most remarkable political images ever painted and very few people are looking at it.' },
    { n: 'The Torre del Mangia', t: '400 steps, timed entry',
      d: 'Built deliberately to the same height as the cathedral so that church and state stood level. The climb is narrow and the view over the terracotta roofs to the hills is the best in Tuscany.' },
    { n: 'The Duomo', t: 'allow 2 hours with the complex',
      d: 'Striped black and white marble inside and out, a Nicola Pisano pulpit, a Donatello bronze, and a floor of 56 inlaid marble panels that is uncovered for only a few weeks a year, usually from late June to July and again in autumn.' },
    { n: 'The Piccolomini Library', t: 'inside the cathedral',
      d: 'Pinturicchio’s fresco cycle from 1502, colours still startling, around a room of illuminated choir books. One of the best-preserved interiors of its date anywhere.' },
    { n: 'The Facciatone', t: 'part of the museum ticket',
      d: 'Siena began an enormous cathedral extension in 1339 and the plague stopped it. The unfinished wall still stands, and you can climb to the top of it and look out through windows that were meant to be inside a nave.' },
    { n: 'Santa Maria della Scala', t: 'opposite the cathedral',
      d: 'A medieval hospital in use for 800 years, now a museum, with a 15th-century frescoed ward showing the care of foundlings. Enormous and underrated.' },
    { n: 'The contrada museums', t: 'by arrangement',
      d: 'Each neighbourhood keeps its Palio banners and history. They are not formally open but several will arrange visits, and it is the way to understand what the race means.' }
  ],
  when: 'April to June and September to October. The Palio runs on 2 July and 16 August — the city is packed for days around each and accommodation triples in price. Trial races in the preceding days are easier to see.',
  stay: 'Two days for the city. Also the best base for the Val d’Orcia, San Gimignano and Montalcino.',
  move: 'On foot, uphill. The historic centre is closed to traffic; park in the garages below and take the escalators up.',
  eat: 'Pici, a thick hand-rolled pasta, with garlic or wild boar. Also panforte and ricciarelli, both medieval. Chianti Classico starts just north; Brunello is an hour south.'
},

'TOS-pisa': {
  intro: [
    'Pisa was a maritime republic with a fleet that fought Saracens across the Mediterranean, and the Field of Miracles was paid for by the proceeds. The four buildings on it — cathedral, baptistery, campanile and cemetery — were built between 1063 and the 14th century on a single expanse of grass, deliberately separated rather than crowded together as they would be in a normal medieval town.',
    'The tower began leaning before the third storey was finished, in 1178, because the subsoil is soft marine clay. Construction stopped for nearly a century, which as it happens let the ground consolidate and is the reason the tower is standing at all. The upper storeys were built at an angle to correct the lean, which is why it is slightly banana-shaped.',
    'Most people come for two hours and see only the Field of Miracles, which is a shame: Pisa is a real university city of 90,000 with a good riverfront and almost no visitors three streets away.'
  ],
  see: [
    { n: 'The Leaning Tower', t: 'timed ticket, 251 steps',
      d: 'Climbing it is genuinely strange — the staircase spirals so the lean shifts from one side of you to the other, and the steps are worn into troughs. Numbers are limited and bags are not allowed. Book ahead.' },
    { n: 'The Baptistery',
      d: 'The largest in Italy, with the Nicola Pisano pulpit of 1260 that is usually treated as the start of Italian Gothic sculpture. The attendants demonstrate the acoustics every half hour by singing a note and letting it resolve into a chord.' },
    { n: 'The Cathedral',
      d: 'Free with any other ticket but you still need to take a timed slot. A Giovanni Pisano pulpit, a gilded ceiling, and the lamp that supposedly gave Galileo the idea for the pendulum, which it did not — the lamp postdates him.' },
    { n: 'The Camposanto',
      d: 'A cloistered cemetery built around soil said to have been shipped from Golgotha. Allied incendiary fire in 1944 melted the lead roof onto the frescoes; the restored Triumph of Death is extraordinary, and the fire also revealed the sinopia underdrawings, now in their own museum.' },
    { n: 'Piazza dei Cavalieri', t: '5 minutes away',
      d: 'Vasari rebuilt a medieval square into a Renaissance one for the Knights of St Stephen. It is now the heart of the Scuola Normale, Italy’s most selective university, and is usually empty of visitors.' },
    { n: 'The riverfront and Santa Maria della Spina',
      d: 'A tiny Gothic church of white marble on the Arno embankment, built to hold a thorn from the crown. The lungarni are where students drink in the evening.' }
  ],
  when: 'Any time; spring and autumn are most comfortable. The Field of Miracles is busiest from ten to four.',
  stay: 'Half a day covers the monuments. A full day if you want the rest of the city, which is worth it. Easy as a day trip from Florence — an hour by train — or combined with Lucca.',
  move: 'The airport is two kilometres from the centre with an automated shuttle to the station. Walk from the station to the Field of Miracles in about twenty-five minutes, or take the bus.',
  eat: 'Away from the Field of Miracles, where the food is poor. The Borgo Stretto area and the far side of the river have student prices and better cooking.'
},

'UMB-assisi': {
  intro: [
    'Assisi climbs the side of Monte Subasio in pink and white limestone, and it has been a destination for pilgrims since the 13th century. Francesco Bernardone, the son of a cloth merchant, gave away his inheritance in the square here in about 1206, founded an order on literal poverty, and was canonised two years after his death in 1226.',
    'The basilica built over him is the paradox of the place: an enormous, richly decorated double church raised in honour of a man who rejected property. It was also one of the most consequential building sites in European art, because Giotto and the painters around him worked out how to put real bodies in real space on its walls.',
    'A major earthquake in 1997 brought down part of the upper church vault, killing four people and destroying frescoes by Cimabue. The restoration took two years and tens of thousands of fragments were reassembled by hand.'
  ],
  see: [
    { n: 'The Basilica of San Francesco', t: 'free, dress code',
      d: 'Two churches stacked. The lower is dim, low and Romanesque, with Lorenzetti and Simone Martini; the upper is tall and Gothic, with the 28-scene Life of St Francis cycle usually attributed to Giotto. The tomb is in the crypt below both. No photography and silence is enforced.' },
    { n: 'The Basilica of Santa Chiara',
      d: 'Clare founded the female order and is buried here, along with the crucifix from San Damiano that is said to have spoken to Francis. The striped facade and flying buttresses are hard to miss.' },
    { n: 'The Eremo delle Carceri', t: '4 km uphill, or drive',
      d: 'The woodland hermitage where Francis went to pray, on the slope above the town among holm oaks. Tiny cells cut into the rock, an ancient tree, and genuine quiet. This gets closest to the man rather than the institution.' },
    { n: 'San Damiano', t: '20 minutes below the walls',
      d: 'The small church Francis rebuilt with his own hands and where Clare lived for forty years. Much less visited than the basilicas and much more affecting.' },
    { n: 'The Roman temple on Piazza del Comune',
      d: 'A 1st-century BC temple to Minerva with its six Corinthian columns still standing, converted into a church. Goethe came to Assisi specifically for this and ignored the basilica.' },
    { n: 'Rocca Maggiore', t: 'steep climb',
      d: 'The fortress above the town, with the whole Umbrian valley laid out and the best view back down over the basilica.' }
  ],
  when: 'Spring and autumn. The Feast of St Francis on 3–4 October and Calendimaggio in May both fill the town. Summer is hot and heavily coached; the town is much better in the evening once the day groups leave.',
  stay: 'One night, which lets you have the basilica early and the town at dusk. Two if you want the hermitages and walks on Subasio.',
  move: 'The town is steep and entirely walkable; the station is down the hill at Santa Maria degli Angeli with a frequent bus. Park below the walls.',
  eat: 'Umbrian: strangozzi pasta, black truffle from Norcia, lentils from Castelluccio, wild boar, and Sagrantino from Montefalco nearby, which is one of the most tannic red wines in Italy.'
},

'PUG-alberobello': {
  intro: [
    'A trullo is a dry-stone hut with a conical corbelled roof, built without mortar. There are thousands across the Valle d’Itria and about 1,500 concentrated in two districts of Alberobello, which is why those two districts are a UNESCO site and the town is on every Puglia itinerary.',
    'The standard explanation for why they were built without mortar is a tax dodge: the Kingdom of Naples taxed permanent dwellings, and a building that could be pulled down quickly when the inspector was coming was not, technically, permanent. Historians argue about how literally true this is, but the technique is genuinely ancient and genuinely mortarless.',
    'Rione Monti, the larger district, is almost entirely souvenir shops now. Aia Piccola, across the main road, is still mostly residential and gives a much better sense of what a trullo neighbourhood is. Go to both, and give the second one more time than you planned.'
  ],
  see: [
    { n: 'Rione Monti', t: 'over 1,000 trulli',
      d: 'The photogenic hillside. Go early or late; by eleven the lanes are solid. Look up at the pinnacles on the roofs, which are all different, and at the whitewashed symbols painted on some cones.' },
    { n: 'Aia Piccola', t: 'the quiet district',
      d: 'Four hundred trulli, mostly lived in, across the main street from Monti. Washing lines, cats, people. This is the one to walk slowly.' },
    { n: 'Trullo Sovrano', t: 'small museum',
      d: 'The only two-storey trullo, built in the 18th century, furnished as a house. Ten minutes and it explains the construction better than looking at the outside of a hundred of them.' },
    { n: 'The Belvedere Santa Lucia',
      d: 'The viewpoint over the whole of Rione Monti. Sunset is the moment, and the terrace is small.' },
    { n: 'Locorotondo and Cisternino', t: 'both within 15 km',
      d: 'Two hill towns in the same valley, whitewashed and almost unvisited by comparison. Locorotondo is laid out in concentric circles; Cisternino has butchers who grill your meat for you at the table in the evening.' },
    { n: 'The Valle d’Itria by car', t: 'half day',
      d: 'The countryside between the towns is full of isolated trulli among olive groves and dry-stone walls, which is the real landscape the town is an exaggeration of.' }
  ],
  when: 'April to June and September to October. July and August bring heat and coach parties in equal measure.',
  stay: 'Half a day for the town, and most people see it as a stop rather than a base. Staying overnight in a converted trullo is a better experience than the daytime visit.',
  move: 'Car. The regional FSE train line from Bari is slow and infrequent. Everything in the Valle d’Itria is twenty minutes from everything else by road.',
  eat: 'Orecchiette with cime di rapa, burrata from Andria, fava bean purée with chicory, and bombette — rolled pork parcels grilled at the butcher. Primitivo and Negroamaro are the wines.'
},

'LOM-milan': {
  intro: [
    'Milan is the city where Italy goes to work, and visitors who arrive expecting Florence are often disappointed for about a day before they adjust. It is the financial and industrial capital, the fashion and design capital, and it has been bombed, rebuilt and rebuilt again, which means its beauty is concentrated rather than ambient.',
    'When it is good it is very good. The cathedral is the largest Gothic building in Italy and took nearly six centuries to finish. The Last Supper is here. La Scala is here. And the design industry is not a museum but a working concern — the Salone del Mobile each April is the largest furniture fair in the world and turns the entire city into an exhibition.',
    'It is also the best-connected city in the country, with high-speed trains everywhere and the lakes less than an hour away, which makes it a far better base than its reputation suggests.'
  ],
  see: [
    { n: 'The Duomo and its roof', t: 'take the terraces ticket',
      d: '3,400 statues, 135 spires, and a roof you can walk on among the pinnacles and flying buttresses with the Alps visible on a clear day. The terraces are the main event; the interior is dark and vast and worth twenty minutes.' },
    { n: 'The Last Supper', t: 'book months ahead',
      d: 'Leonardo painted it in an experimental technique that began failing within his lifetime, and what survives is fragile. Entry is fifteen minutes, twenty-five people at a time, and tickets are released in batches and go immediately. Set a reminder.' },
    { n: 'The Galleria Vittorio Emanuele II',
      d: 'An 1877 iron-and-glass arcade joining the cathedral to La Scala, and the model for every shopping arcade since. Spinning on the bull mosaic’s testicles is the local superstition; the floor has a hole worn in it.' },
    { n: 'The Pinacoteca di Brera',
      d: 'Mantegna’s foreshortened Dead Christ, Piero della Francesca’s Montefeltro Altarpiece, Caravaggio, Raphael. One of the great collections in Italy, in a neighbourhood of art students and good bars.' },
    { n: 'Navigli at aperitivo', t: 'from six',
      d: 'The surviving canals, part of a system Leonardo worked on, now lined with bars. Milanese aperitivo means a drink with a substantial buffet included, and the Navigli is where the custom is most entrenched.' },
    { n: 'Fondazione Prada',
      d: 'A converted distillery by Rem Koolhaas with a gold-leafed tower and a bar designed by Wes Anderson. The best contemporary art space in the country and a clear statement of what Milan is now.' },
    { n: 'Cimitero Monumentale',
      d: 'An open-air sculpture gallery where industrialist families competed in funerary architecture. Free, strange and nearly empty.' },
    { n: 'Santa Maria presso San Satiro', t: 'five minutes from the Duomo',
      d: 'Bramante had no room for a choir so he painted one in false perspective less than a metre deep. Walk to the side and watch it collapse. Free, tiny, and a perfect demonstration of Renaissance perspective.' }
  ],
  when: 'April to June and September to October. August empties the city almost entirely — many restaurants close for weeks. Winter is grey and the Po valley air quality is at its worst; check it before planning a long walk.',
  stay: 'Two days for the city. Excellent as a base: Como, Bergamo, Verona and Turin are all under two hours by train.',
  move: 'The metro is fast, clean and covers everything. Trams include 1920s wooden cars still in daily service. The centre is walkable between the Duomo, Brera and Castello.',
  eat: 'Risotto alla milanese with saffron and bone marrow, cotoletta (breaded veal, bone in), ossobuco, and panettone at Christmas, which is from here. Aperitivo is at six and is practically compulsory.'
},

'EMR-bologna': {
  intro: [
    'Bologna has three traditional nicknames and they are all accurate: la dotta, the learned, for a university founded in 1088 and generally reckoned the oldest in the world; la grassa, the fat, for the food; and la rossa, the red, for both the brick and a long post-war history of communist municipal government.',
    'The porticoes are the defining feature — around 62 kilometres of covered arcade in the city, 38 of them in the historic centre, built originally so that upper storeys could be extended over the street to house a growing student population. They are a UNESCO site, and they mean you can cross the city in the rain without getting wet.',
    'It is a student city of 90,000 undergraduates, which keeps it young, cheap in parts, and busy at night in a way that Florence is not. It is also, by common consent among Italians, where you eat best.'
  ],
  see: [
    { n: 'Piazza Maggiore and San Petronio',
      d: 'The basilica was intended to be larger than St Peter’s and the Vatican objected, so the facade is still half-finished in bare brick above the marble. Inside is a meridian line 67 metres long laid by Cassini in 1655 that still works.' },
    { n: 'The two towers', t: 'Asinelli, 498 steps',
      d: 'Bologna had perhaps a hundred medieval tower-houses and about twenty remain. The Asinelli is 97 metres and climbable by wooden staircase; the Garisenda next to it leans so badly Dante used it as a simile and it is currently closed and braced.' },
    { n: 'The Quadrilatero', t: 'mornings',
      d: 'The medieval market streets beside Piazza Maggiore, still organised by trade, with fishmongers, fresh pasta windows where you can watch tortellini being folded, and salumerie hung with mortadella.' },
    { n: 'The Portico di San Luca', t: '3.8 km, 666 arches',
      d: 'The longest portico in the world, running from the city gate up the hill to the sanctuary of San Luca. It takes about an hour uphill, entirely covered, and is used by locals as an exercise route.' },
    { n: 'The Archiginnasio and the Anatomical Theatre',
      d: 'The old university building, with its walls covered in the coats of arms of students, and a 17th-century dissection theatre panelled in spruce with two skinned wooden figures holding up the canopy.' },
    { n: 'Santo Stefano', t: 'the seven churches',
      d: 'A complex of interlinked buildings from the 5th to the 13th century around two courtyards, meant to reproduce the holy sites of Jerusalem. Atmospheric and free.' },
    { n: 'The canals', t: 'Finestrella on Via Piella',
      d: 'Bologna had a canal network that powered silk mills and was mostly covered over in the 20th century. A small window in a wall on Via Piella opens onto one of the surviving stretches and is a minor cult attraction.' }
  ],
  when: 'Spring and autumn. The Po valley is humid and hot in summer and foggy in winter. The university year means the city is liveliest from October to May.',
  stay: 'Two days, and it is an excellent base — Parma, Modena, Ravenna and Ferrara are all under an hour and a half, and Florence is 37 minutes by fast train.',
  move: 'Walk, under the porticoes. The centre is compact and largely limited to residents’ traffic.',
  eat: 'Tagliatelle al ragù — never spaghetti, never called bolognese here. Tortellini in brodo, lasagne verdi, mortadella, and Parmigiano from down the road. The surrounding region also gives you balsamico from Modena and prosciutto and Parmigiano from Parma.'
},

'TAA-tre-cime-di-lavaredo': {
  intro: [
    'Three parallel towers of pale dolomite rising to 2,999 metres, with near-vertical north faces that were among the great prizes of European climbing. They are the most recognisable silhouette in the Alps and the single most photographed thing in the Dolomites.',
    'The front line of the First World War ran directly through here. Both Italian and Austro-Hungarian positions were dug into the rock around the towers, and you walk past tunnels, trenches and gun emplacements on the standard circuit without needing to detour.',
    'The access is a toll road from Misurina up to Rifugio Auronzo at 2,320 metres, which does most of the climbing for you. It is expensive, and the car park fills by about nine in high summer, after which they turn people away at the bottom.'
  ],
  see: [
    { n: 'The circuit', t: '10 km, 4 hours, 350m ascent',
      d: 'Go anticlockwise from Rifugio Auronzo: the famous north-face view appears gradually as you come round, which is better than having it immediately. Well-marked, no technical difficulty, but it is high and the weather turns fast.' },
    { n: 'Rifugio Locatelli', t: 'the view point',
      d: 'The hut directly opposite the three north faces. This is the photograph. It serves food and lets rooms, and staying overnight means seeing the faces at both sunrise and sunset without the day crowds.' },
    { n: 'The war tunnels on Monte Paterno', t: 'torch and helmet',
      d: 'A via ferrata route through Italian wartime galleries bored into the mountain opposite. Requires kit and a head for heights; the entrances are visible from the main path.' },
    { n: 'Lago di Misurina', t: 'below the toll road',
      d: 'A lake reflecting the Sorapis group, with a sanatorium on the shore built because the air here was held to be good for asthma. Five minutes and worth it on the way up or down.' },
    { n: 'Sunrise from the Auronzo side', t: 'before 6am',
      d: 'The enrosadira hits the southern faces first. Drive up before dawn — the toll booth is unmanned early — and you will have the place to yourself.' }
  ],
  when: 'Late June to early October. The toll road closes with snow, usually from November to late May. Even in August the summit area can drop below freezing, and afternoon thunderstorms are common; start early.',
  stay: 'A day for the circuit. A night at Locatelli or Auronzo if you want the light.',
  move: 'Car and toll road, or the seasonal bus from Cortina and Dobbiaco, which avoids the car park problem entirely and is the better option in August.',
  eat: 'The rifugi serve proper mountain food — barley soup, canederli, goulash and strudel — at reasonable prices considering the altitude.'
},

'PUG-lecce': {
  intro: [
    'Lecce is built of a local limestone so soft it can be carved with a knife and which hardens on exposure to air. That single geological fact produced the most extravagant baroque in Italy: facades crawling with fruit, beasts, cherubs, saints and foliage, carved deep and in enormous quantity through the 17th century, because the material allowed it and the Counter-Reformation wanted it.',
    'It is often called the Florence of the South, which undersells how different it is. The stone is warm honey-gold rather than grey, the climate is North African in summer, and the city sits in the flat olive country of the Salento, closer to Albania than to Rome.',
    'Underneath the baroque is a Roman town — there is an amphitheatre in the middle of the main square, excavated in the 1930s and still half buried under the buildings around it.'
  ],
  see: [
    { n: 'Basilica di Santa Croce',
      d: 'The high point of Lecce baroque, worked on for over a century. The lower facade is relatively restrained and the upper is pandemonium: a rose window held up by beasts and caryatids. Stand across the street and give it ten minutes.' },
    { n: 'Piazza del Duomo',
      d: 'A closed square with only one entrance, which was defensive, and which makes walking in feel like entering a room. Cathedral, campanile, bishop’s palace and seminary, all floodlit at night and one of the finest baroque spaces anywhere.' },
    { n: 'The Roman amphitheatre', t: 'Piazza Sant’Oronzo',
      d: 'Seating for 25,000, two thirds of it still under the modern city. You look down into it from the square, which is an odd and very Italian arrangement.' },
    { n: 'Papier-mâché workshops', t: 'cartapesta',
      d: 'A Lecce speciality since the 17th century, when the city was too poor for marble statues and made saints out of paper and glue instead. Several workshops still work and will show you.' },
    { n: 'The Faggiano Museum',
      d: 'A man digging for a broken sewer pipe in 2001 found a Templar chapel, a Roman granary and a Messapian tomb under his house. He spent seven years excavating instead of fixing the plumbing. Now a private museum and completely charming.' },
    { n: 'Salento beaches', t: '30-45 minutes either side',
      d: 'Lecce is between two seas. The Ionian side at Porto Cesareo and Punta Prosciutto has white sand and shallow water; the Adriatic side at Otranto and Torre dell’Orso is rockier and clearer.' }
  ],
  when: 'May, June, September, October. July and August are extremely hot — over 35°C regularly — and the Salento fills with Italian holidaymakers.',
  stay: 'Two days for the city, more as a base for the Salento. The south of Puglia needs a car.',
  move: 'Walk the centre. A car is necessary for the coast and the surrounding towns. Trains to Bari take an hour and a half.',
  eat: 'Rustico leccese (puff pastry with béchamel and mozzarella), ciceri e tria with fried pasta, pasticciotto for breakfast, and puccia bread. The Salento makes heavy Negroamaro and Primitivo reds.'
},

'TOS-val-d-orcia': {
  intro: [
    'The Val d’Orcia is a UNESCO World Heritage Site for what amounts to its appearance, which is unusual and tells you something. The citation describes it as an agricultural landscape remade in the 14th and 15th centuries as an ideal — a working countryside deliberately shaped to look the way a well-governed land should look — and as the image that influenced Renaissance painting and, through it, the European idea of landscape itself.',
    'In practice it is rolling clay hills south of Siena, planted with wheat and vines, punctuated by cypress and isolated farmhouses, with four small towns on the ridges: Pienza, Montalcino, San Quirico d’Orcia and Castiglione d’Orcia. The clay erodes into bare grey gullies called crete and biancane, which is why some hillsides look stripped.',
    'It changes completely with the season. Green in April and May, gold and then shaved brown by late June, ploughed dark in autumn, often fogged in winter. The famous photographs are nearly all May or late June.'
  ],
  see: [
    { n: 'The Gladiator road', t: 'near San Quirico',
      d: 'The cypress-lined drive to Podere Baccoleno and the group of cypresses at Poggio Covili are the two most photographed spots in Tuscany. They are private property; photograph from the road and do not walk in.' },
    { n: 'Pienza', t: 'an hour is enough',
      d: 'Pius II demolished his birth village in 1459 and had Rossellino rebuild it as the first planned Renaissance town. The cathedral, palace and town hall face each other across a trapezoidal square designed to exaggerate perspective.' },
    { n: 'Bagno Vignoni', t: 'any time, free to look',
      d: 'A village whose main square is a 16th-century thermal pool, steaming, with no houses on the fourth side. You cannot swim in the square itself but there are free hot pools in the rocks below and a spa hotel beside it.' },
    { n: 'Sant’Antimo', t: 'near Montalcino',
      d: 'A 12th-century Romanesque abbey standing alone in a valley of olive trees with nothing around it. Alabaster windows, carved capitals, and sometimes Gregorian chant.' },
    { n: 'Montalcino and Brunello', t: 'half day',
      d: 'A fortress town above the vineyards making Italy’s most expensive sangiovese. Dozens of estates take visitors by appointment; the fortress itself has a wine bar in the ramparts.' },
    { n: 'The Via Francigena', t: 'walk a stage',
      d: 'The medieval pilgrim road from Canterbury to Rome runs through the valley. The stage from San Quirico to Bagno Vignoni is about two hours on white gravel roads and is the best way to be in the landscape rather than driving past it.' },
    { n: 'Monte Amiata', t: 'south of the valley',
      d: 'An extinct volcano, 1,738 metres, forested in beech and chestnut and twenty degrees cooler than the valley in August. Almost no foreign visitors.' }
  ],
  when: 'Late April to mid-June is the green-and-flowering peak; late September and October for the harvest and the light. Late summer is shorn and brown, which some people prefer and most do not expect.',
  stay: 'Three nights in an agriturismo. This is a place to stay in rather than drive through, and the roads and light are at their best early and late when day trippers are not here.',
  move: 'A car is essential. The strade bianche — unsealed white gravel roads — are normal and fine in a hire car if you go slowly.',
  eat: 'Pici, pecorino di Pienza at various ages, cinta senese pork, and the wines: Brunello from Montalcino, Vino Nobile from Montepulciano, Orcia from in between.'
}

};

/* Look-up used by the place page. Returns null rather than an empty
   object when a place has no entry, so the caller can simply test it. */
function itGuide(id){
  return (typeof IT_GUIDE !== 'undefined' && IT_GUIDE[id]) ? IT_GUIDE[id] : null;
}

/* How much of the atlas has been written up. Used by the index page so
   the count shown is true rather than claimed. */
function itGuideCount(){
  try { return Object.keys(IT_GUIDE).length; } catch(e){ return 0; }
}
