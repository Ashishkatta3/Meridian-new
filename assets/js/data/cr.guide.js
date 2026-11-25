/* ===========================================================
   COSTA RICA — the written guide

   The blurb in cr.places.js is one sentence, which is enough for a
   card and not enough for a page. This is the rest: what a place
   actually is, the specific things worth doing when you get there,
   and the four practical questions everybody asks.

     intro  two or three paragraphs on the place itself
     see    the things to do, each named and described. Ordered the
            way you would actually do them, not by fame.
     when   which months, and why — which in this country is the
            single most consequential decision a visitor makes
     stay   how long is honest rather than flattering
     move   how you get there and get around, which here often means
            whether you need four-wheel drive
     eat    what this specific place cooks that the next one does not

   Two standing facts shape nearly every entry and are not repeated
   in each one. First, the dry season runs mid-December to April on
   the Pacific side and the Central Valley, and the Caribbean ignores
   it entirely. Second, distances on a map mean nothing here: eighty
   kilometres of mountain road is three hours, and the paving stops
   without warning.

   No prices are quoted. Park fees, shuttle fares and hotel rates all
   move faster than a file like this can be maintained, and a wrong
   number is worse than no number. Where cost is genuinely part of the
   decision it is described in relative terms instead.

   A place with no entry here still renders: the page shows its blurb,
   its photograph, its live panel and its neighbours, and simply has
   no prose section. So this file can grow without anything waiting
   on it.
   =========================================================== */

const CR_GUIDE = {

/* ===================== ARENAL & THE NORTHERN PLAINS ===================== */
'ARE-arenal-volcano': {
  intro: [
    'For forty-two years Arenal did the most reliable thing an active volcano can do: it erupted, visibly, more or less constantly. From 1968 — when it woke without warning and destroyed two villages — until 2010, you could sit on a terrace in La Fortuna after dark and watch incandescent rock bounce down the western flank. Then, in late 2010, it stopped. It is not extinct and nobody will tell you it is finished, but it has been in a resting phase ever since.',
    'What that means for a visitor is that the thing to come for is no longer the eruption. It is the cone itself, which is as close to the platonic volcano shape as anything on earth, and the forest that has grown back over the lava. The 1968 flows are now covered in vegetation at every stage of succession, so a single trail takes you from bare clinker through scrub to closed canopy in under an hour, which is a geology and ecology lesson you can walk through.',
    'And the heat is still down there. Everything that makes La Fortuna a hot-springs town comes from the same magma body, and that has not gone anywhere.'
  ],
  see: [
    { n: 'The 1968 lava flow trail', t: 'inside the national park',
      d: 'The park’s best walk goes out across the youngest flow, where the rock is still raw and the plants are still colonising it. Loose, uneven footing and no shade at all, so go early. The payoff is the viewpoint at the end, where the whole western face stands up in front of you with nothing in the way.' },
    { n: 'Cerro Chato, from a distance', t: 'the crater lake',
      d: 'The extinct cone on Arenal’s shoulder holds a green crater lake, and the climb to it was for years the hardest half-day in the area. The route through the national park has been closed for some time on erosion and safety grounds; access now depends on private land and changes often. Ask locally before you plan a day around it rather than turning up.' },
    { n: 'The hanging bridges', t: 'half a day',
      d: 'Several operations on the volcano’s flank string suspension bridges across ravines at canopy height. It is a genuinely different view of rainforest — you are level with the epiphytes and the bird traffic rather than under it — and it is one of the few forest activities here that is easy on the legs.' },
    { n: 'The volcano after dark',
      d: 'Even dormant, the cone is worth staying up for. It generates its own cloud and spends much of the wet season hidden, so when it clears at night, with the lake below and no light pollution east of it, go outside and look.' }
  ],
  when: 'The cone is most often clear between February and April. In the green season it frequently wears cloud all day and then uncovers at dusk — if it is hidden when you arrive, do not assume the whole trip is a write-off.',
  stay: 'The park itself is a half-day. People stay in the area three or four nights and use it as a base, which is the right call.',
  move: 'The park entrance is about fifteen kilometres west of La Fortuna on a paved road. Any car will do. There is no public bus to the gate, so it is a taxi, a tour or your own vehicle.',
  eat: 'Nothing at the park beyond a drinks kiosk. Eat in La Fortuna before or after.'
},

'ARE-la-fortuna': {
  intro: [
    'La Fortuna was a farming village called El Borio until the volcano above it started erupting in 1968, which is one of the more dramatic pieces of luck in Costa Rican tourism. It is now the adventure capital of the country and makes no apology for it: the main street is a run of tour desks, and every hotel lobby will sell you canyoning, rafting, hanging bridges, horses, caves and three different hot springs before you have put your bag down.',
    'That reputation puts some people off, and it should not. The commercialism is real but the underlying goods are genuine — the waterfall is spectacular, the springs are actually volcanically heated rather than a boiler in a shed, and the surrounding forest is full of animals. It is also one of the easiest places in the country to travel in: everything is organised, everyone speaks English, and the roads are paved.',
    'Treat it as the place you do the things that need infrastructure, and go somewhere quieter afterwards for the things that do not.'
  ],
  see: [
    { n: 'The hot springs', t: 'pick your scale',
      d: 'Three tiers exist. The large resorts are landscaped, expensive and genuinely lovely. The mid-range places are simpler and cost a fraction. And the free option is the Río Chollín, a hot river under a bridge on the road to the resorts, where locals have been sitting for decades — bring footwear and watch your valuables.' },
    { n: 'Canyoning in the Lost Canyon', t: 'half a day',
      d: 'Abseiling down four or five waterfalls in a wetsuit, with the last one around forty metres. No experience needed and no real exposure to make it frightening. Easily the best adrenaline activity in the area.' },
    { n: 'The Arenal Observatory Lodge grounds', t: 'day pass',
      d: 'A former volcanological research station on the south flank, now a lodge that sells day access to its trails and feeders. The closest legal approach to the cone, a waterfall, and the easiest hummingbird and toucan photography for miles.' },
    { n: 'Night walk in the forest', t: 'two hours',
      d: 'Several small reserves run guided walks after dark, which is when most of the forest is actually awake. Red-eyed tree frogs, eyelash vipers, kinkajous and sleeping birds. Go with a guide who carries a red filter rather than a floodlight.' },
    { n: 'The Venado Caves', t: 'a half-day trip',
      d: 'Forty minutes north, a wet limestone cave system you go through in a helmet and old clothes, squeezing in places. Grim if you are claustrophobic and tremendous if you are not.' }
  ],
  when: 'Year round, and it rains here in every month. February to April is driest. September and October are the wettest on this side but also the greenest and the cheapest.',
  stay: 'Three nights does the area properly. Two is tight. More than four and you will start repeating yourself unless you are using it as a base for Río Celeste and Caño Negro.',
  move: 'Paved road from San José, about three hours, or a shuttle. Within town you can walk; for the springs and the park you need a taxi, a tour or a car. The jeep-boat-jeep transfer across the lake to Monteverde is the standard onward route and is far better than the road around.',
  eat: 'Casados and the best soda food is off the main drag — walk two streets back from the church. The town also has unusually good pizza and a strong coffee scene for its size.'
},

'ARE-la-fortuna-waterfall': {
  intro: [
    'The Río Fortuna drops about seventy metres into a plunge pool at the bottom of a steep forested ravine, and the whole thing is enclosed enough that you hear it well before you see it. It is the single most photographed waterfall in Costa Rica and it earns the attention.',
    'The access is the part people underestimate. A staircase of roughly five hundred steps takes you down, and the same five hundred take you back up in tropical humidity. It is not technical and it is not dangerous, but it is a genuine effort and there is no other way out.'
  ],
  see: [
    { n: 'The pool at the base',
      d: 'You can swim, and you should, but not directly under the fall — the volume of water coming down creates a current that will hold you. The marked area to the side is calm, deep and cold in a way that is extremely welcome after the stairs.' },
    { n: 'The upper viewpoint',
      d: 'Before you commit to the descent, the platform at the top gives you the full drop in one frame. If anyone in the group is not going down, this is where they wait, and it is not a consolation prize.' },
    { n: 'The swimming hole downstream',
      d: 'Below the main pool the river widens into shallower, warmer water over smooth rock. Quieter than the base of the fall and easier for children.' }
  ],
  when: 'The fall is fullest and most dramatic in the green season, and the water clearest in the dry. Arrive at opening — by mid-morning the stairs are a queue.',
  stay: 'Two to three hours including the climb back and a swim.',
  move: 'Six kilometres from La Fortuna on a paved road, then a short dirt section. Taxi, car or a sweaty bicycle ride. Admission is charged and is not trivial.',
  eat: 'There is a restaurant at the top with a view. Decent, aimed at visitors, priced accordingly.'
},

'ARE-lake-arenal': {
  intro: [
    'Lake Arenal is artificial, and the circumstances of its creation are worth knowing: in 1979 the government dammed the Arenal river, flooded the valley, and drowned the villages of Arenal and Tronadora, relocating their residents to new settlements. What was lost is under eighty metres of water. What was gained supplies a substantial share of the country’s electricity, both from the dam and from the wind farms along the ridges.',
    'The wind is the lake’s other characteristic. From roughly December to April, trade winds funnel down the axis of the valley with a consistency that put this lake on the international windsurfing map in the 1980s, long before anyone came here for the volcano.',
    'The road along the north shore is also, quietly, one of the great drives in Costa Rica — forty kilometres of curves above the water with the cone at the far end.'
  ],
  see: [
    { n: 'The north shore road', t: 'about two hours with stops',
      d: 'From La Fortuna to Tilarán. Paved but twisting, with viewpoints, a German bakery at Nuevo Arenal, and howler monkeys in the trees above the road. Drive it in the morning when the volcano is most likely to be out.' },
    { n: 'Windsurfing and kiting at the west end', t: 'December to April',
      d: 'The wind concentrates at the Tilarán end, and the established schools are there. It is a demanding spot — strong, gusty, cold water for the tropics — and not where you learn from scratch.' },
    { n: 'Fishing for guapote',
      d: 'The rainbow bass is endemic to this part of Central America, aggressive and good-looking. Local guides run half-days out of several points on the shore.' },
    { n: 'The dam and the viewpoint at the east end',
      d: 'Worth the stop for the scale of it, and for the plaque that explains, briefly, what is underneath.' }
  ],
  when: 'December to April for wind and for clear views of the volcano. The green season is calmer on the water and much greener on the hills.',
  stay: 'Half a day if you are driving through. Two or three nights if you came for the wind.',
  move: 'Your own car is by far the best way to see the lake. Buses run the shore road but stop where they stop.',
  eat: 'Nuevo Arenal is the eating stop — a bakery, a couple of lakeside restaurants, and more German and Swiss influence than you would expect in Guanacaste province.'
},

'ARE-el-castillo': {
  intro: [
    'El Castillo sits on a dirt road that climbs away from the lake on the quiet side of the volcano, and it is what La Fortuna was before the tour desks. There is no town centre to speak of, a scattering of lodges and small farms, and a view of the cone that is better than anything you will get from the main road because nothing is in front of it.',
    'People who have been to the area before and did not enjoy the main town tend to end up here on a second visit.'
  ],
  see: [
    { n: 'The view, which is the point',
      d: 'From almost anywhere along the road the volcano stands clear across the valley. Lodges here are oriented around it and most have a terrace built for exactly this.' },
    { n: 'The Butterfly Conservatory', t: 'a couple of hours',
      d: 'Far better than the name suggests — several habitat domes, a frog and insect collection, and a river trail. Run as a conservation and research operation rather than an attraction, and the staff will talk at length if you ask.' },
    { n: 'Walking the road at dusk',
      d: 'Howler monkeys, oropendolas and, if you are patient, an armadillo. There is almost no traffic.' }
  ],
  when: 'Same as the rest of the Arenal area. The road is rough but passable year round.',
  stay: 'Two or three nights, as a quieter alternative to La Fortuna rather than in addition to it.',
  move: 'Twenty minutes of dirt road from the main highway. A normal car manages it in the dry season; in heavy rain you will want clearance. No buses worth relying on.',
  eat: 'A handful of small restaurants and whatever your lodge does. Nothing to plan around — this is a place you eat where you sleep.'
},

'ARE-nuevo-arenal': {
  intro: [
    'Nuevo Arenal is the village built in the late 1970s to house the people displaced when the lake was flooded. It is laid out on a grid, which no organically grown Costa Rican village is, and that tells you its history before anyone explains it.',
    'It has since become a small centre of European settlement, and the practical result for a traveller is a bakery and a couple of restaurants considerably better than a village this size would otherwise support.'
  ],
  see: [
    { n: 'The German bakery',
      d: 'On the main road, impossible to miss, and the standard stop on the lake drive. Bread, strudel and coffee, and a terrace.' },
    { n: 'The lakeshore',
      d: 'Public access at a few points, with the volcano in the distance. Calm water compared with the windy west end.' },
    { n: 'The cemetery of the old village',
      d: 'Relocated when the valley flooded. A quiet and slightly unsettling place that makes the dam’s history concrete.' }
  ],
  when: 'Any time. The lake drive is best in the morning.',
  stay: 'A lunch stop, or a night if you want the lake without the volcano crowds.',
  move: 'On the north shore road, halfway between La Fortuna and Tilarán.',
  eat: 'The bakery, and one or two lakeside restaurants that punch above the village’s weight.'
},

'ARE-rio-celeste': {
  intro: [
    'Two clear streams meet on the flank of Tenorio, and from the point where they join the river is an opaque, luminous pale blue — not a reflection, not an effect of the light, and visible on an overcast day. The phenomenon is called El Teñidero, the dyer, and the explanation is genuinely strange: aluminosilicate particles suspended in the water, which at that exact point aggregate into clusters of the right size to scatter blue light. Upstream of the junction, both streams are ordinary and clear.',
    'The park protects the whole river and the volcano above it. The walk in is about six kilometres return, and in anything but the driest weeks it is a serious mud experience — many visitors hire rubber boots at the entrance and all of them are glad they did.',
    'It is also a victim of its own photographs. Heavy rain upstream turns the river grey-brown and the colour disappears for a day or more, and nothing at the gate will warn you.'
  ],
  see: [
    { n: 'The waterfall', t: 'two hundred and fifty steps down',
      d: 'The blue river falling into a blue pool, which is the image everyone comes for. You cannot swim here. The steps are steep and slick, and they are the first thing on the trail, so do them while you are fresh.' },
    { n: 'El Teñidero', t: 'the far end of the trail',
      d: 'Where the two streams meet and the colour starts. Less photogenic than the waterfall and far more interesting — you can stand at the confluence and see clear water on both sides and blue below.' },
    { n: 'Los Borbollones',
      d: 'A stretch where volcanic gas bubbles up through the riverbed and the water smells of sulphur. Proof, if you wanted it, that this is a volcano you are standing on.' },
    { n: 'The mirador',
      d: 'On a clear morning, Tenorio and Miravalles both. Often entirely in cloud, which is the normal state of affairs.' }
  ],
  when: 'The colour is most reliable in the drier months, February to April. Go at opening: entry is capped daily and the car park fills. After heavy rain, consider postponing.',
  stay: 'Three to four hours on the trail. Most people come as a day trip from La Fortuna; staying in Bijagua is better.',
  move: 'The entrance is on a dirt road out of Bijagua. A normal car reaches it in the dry; in the wet, clearance helps. Tours run daily from La Fortuna, about two hours each way.',
  eat: 'Small sodas near the entrance and in Bijagua. Nothing inside the park.'
},

'ARE-bijagua': {
  intro: [
    'Bijagua is a small agricultural town in the saddle between Tenorio and Miravalles, and until recently its only role in tourism was as the place you drove through on the way to Río Celeste. That has changed, and for a good reason: the forest around it is unusually productive for wildlife, and a group of local families have built a set of small reserves and lodges that are genuinely community-owned rather than branded as such.',
    'It is now one of the better places in the country to see a sloth — not in a rescue centre, but in a tree, found by somebody who knows which tree.'
  ],
  see: [
    { n: 'A guided sloth walk', t: 'two to three hours',
      d: 'Several family-run reserves on the edge of town offer these. Both two-toed and three-toed sloths are resident and sightings are close to reliable. The guides grew up here and find things a visitor would walk past ten times.' },
    { n: 'Río Celeste, from the right side of the mountain',
      d: 'Staying here puts you twenty minutes from the park gate instead of two hours, which means you can be first through it.' },
    { n: 'The Tapir Valley reserve',
      d: 'A regenerated cattle farm now holding Baird’s tapir and, famously, a frog species new to science found in 2022. Access is limited and booked ahead, which is the point.' }
  ],
  when: 'Year round. The wildlife does not have a season; the mud does.',
  stay: 'Two nights, which lets you do Río Celeste at dawn and a wildlife walk on the other day.',
  move: 'On the paved road between Cañas and Upala. A car is easiest; buses run but infrequently.',
  eat: 'Sodas in town, simple and cheap. Lodges do dinner, and in a place this size that is usually the plan.'
},

'ARE-cano-negro': {
  intro: [
    'Caño Negro is a wetland that is not always a wetland. In the wet season the Río Frío backs up and floods a shallow basin near the Nicaraguan border into something close to a lake; by late dry season much of it is grass and mud with channels running through it. Both states are good for wildlife and they are good for different wildlife.',
    'It is one of the most important waterbird sites in Central America and considerably less visited than its quality deserves, mostly because it is a long way from anywhere people already are.'
  ],
  see: [
    { n: 'The boat trip', t: 'three hours, at dawn',
      d: 'The only sensible way to see the refuge. Caiman and spectacled caiman on every bank, howler and spider monkeys in the gallery forest, anhingas, jacanas, roseate spoonbills and — the one everybody wants — the Nicaraguan grackle, which is found essentially nowhere else.' },
    { n: 'Birding from the village',
      d: 'You do not strictly need a boat. The edges of the village hold a lot, and a guide on foot for a morning is cheap and productive.' },
    { n: 'Fishing for tarpon and snook',
      d: 'A long-established sport fishery, catch and release for tarpon. Seasonal and worth asking about locally.' }
  ],
  when: 'The water is highest and the birding most spectacular from about September to January. January to March concentrates animals onto shrinking water, which makes them easier to find.',
  stay: 'A long day trip from La Fortuna, or one or two nights in the village for a dawn and a dusk on the water.',
  move: 'Roughly three hours from La Fortuna. Day tours are common. The road is paved most of the way with a dirt final stretch.',
  eat: 'A handful of sodas in the village. Simple river fish, rice and beans.'
},

'ARE-sarapiqui': {
  intro: [
    'Before the roads, the Sarapiquí river was how you got from the Central Valley to the Caribbean, and Puerto Viejo de Sarapiquí was the port at the end of it. The traffic moved elsewhere a century ago and the town settled into bananas, pineapple and, latterly, science.',
    'The science is the reason to come. Three serious biological stations operate within half an hour — La Selva among them, which is one of the most intensively studied patches of tropical lowland rainforest anywhere on earth — and all of them take visitors. The result is that the guiding here is of a standard you rarely get elsewhere, because the guides are working alongside researchers.',
    'Do not confuse this town with Puerto Viejo de Talamanca on the Caribbean coast. They are five hours apart and people book the wrong one with some regularity.'
  ],
  see: [
    { n: 'La Selva Biological Station', t: 'book ahead',
      d: 'A research station run by the Organization for Tropical Studies, with sixty years of continuous data and a bird list over four hundred. Guided walks are open to the public but must be booked; the guides are exceptional and the trails are flat and well made.' },
    { n: 'A float down the Sarapiquí', t: 'two to three hours',
      d: 'Gentle water, so this is a wildlife trip rather than a whitewater one. Sloths, caimans, bats on the trunks and a great deal of birdlife along the banks.' },
    { n: 'Tirimbina Biological Reserve',
      d: 'A long suspension bridge over the river into primary forest, plus an excellent chocolate tour that takes the crop from pod to cup and does not condescend.' },
    { n: 'Rafting the upper Sarapiquí', t: 'class II–III',
      d: 'Milder than the Pacuare and a good introduction, through forest the whole way.' }
  ],
  when: 'Rain is likely in any month here — this is the wet side of the divide. February and March are the least wet.',
  stay: 'Two nights. It pairs naturally with Arenal or with Braulio Carrillo on the way to or from San José.',
  move: 'Ninety minutes from San José through Braulio Carrillo on a good road, though that road has weather and landslide problems. Buses are frequent.',
  eat: 'Simple soda food, and river fish. The pineapple here is the best you will eat anywhere, and it is sold at the roadside for very little.'
},

'ARE-boca-tapada': {
  intro: [
    'Boca Tapada is a long way up a dirt road in the northern lowlands, close enough to the Nicaraguan border that the river at the bottom of the valley is the frontier. There is very little here: farms, a few lodges, and a stretch of surviving wet lowland forest.',
    'It exists on itineraries for one reason, and it is a very good one. This is the most reliable place on the planet to photograph the great green macaw — a bird down to perhaps a thousand individuals in the wild, dependent on the almendro tree, and more or less impossible to see well anywhere else.'
  ],
  see: [
    { n: 'Great green macaws at the lodge feeders', t: 'dawn and late afternoon',
      d: 'The established lodges have fruiting trees and feeding stations the birds use daily. In nesting season the chances approach certainty, and the birds come close enough that a modest lens is enough.' },
    { n: 'A boat trip on the Río San Carlos',
      d: 'Down towards the San Juan and the border. Caiman, turtles, kingfishers and very few other boats.' },
    { n: 'Night walks',
      d: 'This is properly dark, properly wet forest. Frogs in quantity, and good odds on a snake if that appeals.' }
  ],
  when: 'December to May is the macaw nesting season and the best time for sightings. The road is worse in the wet.',
  stay: 'Two nights. Getting here is most of a day each way, so a single night is not worth the drive.',
  move: 'Four hours from San José, the last stretch unpaved and rough. Four-wheel drive is strongly advised and essential in the wet. Most lodges will arrange a transfer, which is the easier option.',
  eat: 'At your lodge. There is nothing else.'
},

'ARE-venado-caves': {
  intro: [
    'The Venado caves run about two kilometres into a limestone ridge that was a coral seabed fifteen million years ago, and the fossils in the walls make that unusually easy to believe. They were found in 1945 by a farmer looking for a lost animal.',
    'This is a hands-and-knees caving trip rather than a walkway with lighting. You will get wet, you will get filthy, and at one point you will squeeze through a gap called the birth canal, which is named accurately.'
  ],
  see: [
    { n: 'The main passage', t: 'about two hours underground',
      d: 'Stalactites, flowstone, fossil shells in the ceiling, and a river you wade in places. Helmets, headlamps and a guide are compulsory and included.' },
    { n: 'The bat chambers',
      d: 'Several species roost here in numbers. They are overhead for much of the route and entirely uninterested in you.' },
    { n: 'The showers afterwards',
      d: 'Not a joke — the site provides them, you will need them, and bringing a change of clothes is the difference between a good afternoon and a bad drive home.' }
  ],
  when: 'Year round, but the caves can close after heavy rain because the river inside rises. Check before setting out in the wet season.',
  stay: 'Half a day including the drive from La Fortuna.',
  move: 'About forty-five minutes north of La Fortuna, the last part on dirt. Tours include transport, which is simplest.',
  eat: 'A soda at the site does a plain, welcome casado.'
},

'ARE-juan-castro-blanco': {
  intro: [
    'Juan Castro Blanco is a national park that exists to protect water rather than scenery. Five rivers rise inside it and supply a large part of the northern region, which is why it carries the informal name El Parque del Agua.',
    'It has almost no visitor infrastructure, few marked trails and very few visitors. If you want a Costa Rican national park with nobody in it, this is one of the easiest to arrange, as long as you accept that you are largely on your own.'
  ],
  see: [
    { n: 'The forest itself',
      d: 'Dense montane and cloud forest on volcanic slopes, with quetzals, bellbirds and a healthy population of large mammals that you will almost certainly not see.' },
    { n: 'Platanar and Porvenir',
      d: 'The two volcanoes inside the park. Routes exist but are unmaintained and require local guidance.' },
    { n: 'Waterfalls on the park edge',
      d: 'Several, mostly reached through private land from the Zarcero and Ciudad Quesada sides. Ask locally.' }
  ],
  when: 'Drier and clearer from January to April. It is a wet park at the best of times.',
  stay: 'A day, from a base in Ciudad Quesada or Zarcero.',
  move: 'Access is from several points, all of them minor roads. A high-clearance vehicle and some Spanish are both useful. A local guide is close to necessary.',
  eat: 'Nothing in the park. Ciudad Quesada has a good market and solid sodas.'
},

/* ===================== MONTEVERDE ===================== */
'MON-monteverde-reserve': {
  intro: [
    'The Monteverde Cloud Forest Biological Reserve sits astride the continental divide at around 1,400 metres, and the thing that makes it what it is happens to be invisible: the trade winds come off the Caribbean, hit this ridge, rise, cool, and condense. The forest spends much of its life inside that cloud. Every surface is loaded with moss, bromeliads, orchids and filmy ferns, which draw their water straight out of the air.',
    'It was protected in 1972 largely through the efforts of the Quaker community that had settled below it and the biologists who had started working there, and it did more than any other single place to make cloud forest a thing people would cross an ocean for.',
    'Manage your expectations about wildlife. This is dense, dim, dripping forest and animals are hard to see in it. People who arrive expecting a safari leave disappointed; people who arrive expecting an extraordinary plant community and a chance at a quetzal leave very happy.'
  ],
  see: [
    { n: 'The Sendero Bosque Nuboso to the divide', t: 'about two hours',
      d: 'The main trail runs to a lookout on the continental divide, where the wind comes over the edge hard enough to lean on and the trees are stunted and bent by it. On a clear day you see down to the Gulf of Nicoya; most days you see cloud moving past at speed, which is better.' },
    { n: 'The resplendent quetzal', t: 'February to May',
      d: 'Nesting season, when the males are in full tail and are calling. Hire a reserve guide — they know the active nests and the fruiting aguacatillo trees, and your odds go from poor to good.' },
    { n: 'The hanging bridge inside the reserve',
      d: 'A single long span at canopy level, which gets you up among the epiphytes and the mixed feeding flocks. Far quieter than the commercial bridge parks outside.' },
    { n: 'The hummingbird gallery at the entrance',
      d: 'A dozen species at feeders, close enough to hear the wingbeats. Free to look at, and the violet sabrewing is the size of a small bird of prey.' }
  ],
  when: 'The reserve caps daily entry, so book ahead in high season and arrive at opening. Quetzal season is February to May. The windiest and wettest months are the end of the year.',
  stay: 'Half a day inside. Two or three nights in the area to do the reserve, a night walk and one other forest.',
  move: 'A guide is a genuine upgrade here and not an upsell — the forest is hard to read alone. Trails are well maintained but wet and often slippery.',
  eat: 'A café at the entrance. Everything else is down in Santa Elena.'
},

'MON-monteverde': {
  intro: [
    'Monteverde is not really a town. It is a scattering of farms, lodges and reserves along a ridge, with the actual town — Santa Elena — sitting a few kilometres below and doing the ordinary business of shops, restaurants and buses.',
    'Its origin is unusual and still visible. In 1951, a group of Quakers from Alabama, several of whom had been jailed for refusing to register for the draft, left the United States and bought land here. They set up a dairy, and crucially they set aside the forest above their farms to protect the watershed. That decision, made for practical reasons, is why the cloud forest reserve exists.',
    'The modern town is a mix of that inheritance and what tourism did afterwards — the world’s first commercial zip line opened here — and the two sit side by side more comfortably than you would expect.'
  ],
  see: [
    { n: 'The cheese factory', t: 'tour or just the shop',
      d: 'Founded by the Quaker settlers and still producing. The tour explains the community’s history as much as the cheese, and the shop sells both the cheese and, importantly, the ice cream.' },
    { n: 'Zip lining', t: 'half a day',
      d: 'This is where canopy tours were invented and the local operations are long-established and well run. Several include a Tarzan swing and a kilometre-plus line across a valley.' },
    { n: 'A night walk', t: 'two hours after dark',
      d: 'Arguably the best wildlife activity in Monteverde. Sleeping birds, tarantulas, sloths, kinkajous, and the orange-kneed tarantula if your guide knows the burrows.' },
    { n: 'The Bat Jungle',
      d: 'A small, serious exhibit with a live colony behind glass and a researcher’s explanation of echolocation. Much better than it sounds and ideal for an afternoon when the cloud is down.' },
    { n: 'Café and coffee tours',
      d: 'Several working farms on the slopes run tours covering coffee, cacao and sugar cane. The good ones let you roast and grind, and the view down the mountain is part of the deal.' }
  ],
  when: 'Drier and clearer February to April. December and January are windy — spectacularly so on the ridge. The green season brings cloud and quiet.',
  stay: 'Three nights. Two leaves you rushing, and the weather here is variable enough that a spare day is worth having.',
  move: 'The roads up are notoriously rough and that is partly deliberate — the community has resisted paving for decades. From La Fortuna, take the jeep-boat-jeep across Lake Arenal, which is faster and far more pleasant than driving around. Within the area, taxis and lodge shuttles.',
  eat: 'Better than you would expect for a mountain village: a couple of genuinely good restaurants in Santa Elena, strong coffee everywhere, and the cheese factory’s own produce on most menus.'
},

'MON-santa-elena-reserve': {
  intro: [
    'The Santa Elena reserve is higher, wetter and windier than Monteverde, sits on the Caribbean slope rather than the divide, and is run by the local high school — the entrance fees fund the school directly.',
    'It receives a fraction of the visitors, which for many people makes it the better experience. The forest is comparable and on a good day the views north to Arenal are better, because you are looking the right way.'
  ],
  see: [
    { n: 'The Youth Trail to the observation tower',
      d: 'The main loop climbs to a tower that, when the cloud lifts, shows you Arenal across the lowlands. When it does not lift, you are standing in a cloud at canopy height, which is its own thing.' },
    { n: 'The trails themselves',
      d: 'Four loops of varying length, muddier than Monteverde’s and less engineered. Boots, which can be hired at the entrance.' },
    { n: 'Birding without a crowd',
      d: 'Quetzals, bellbirds and bare-necked umbrellabirds all occur. With fewer people on the trails you hear far more.' }
  ],
  when: 'Same seasons as Monteverde. Wetter throughout — this is the windward side.',
  stay: 'Three to four hours.',
  move: 'Six kilometres north of Santa Elena town on a rough road. Taxi or shuttle; walking it is possible but long and uphill.',
  eat: 'A small café at the entrance. Otherwise bring something.'
},

'MON-childrens-eternal-rainforest': {
  intro: [
    'In 1987 a class of nine-year-olds in rural Sweden learned about rainforest loss and decided to raise money to buy some. They did. Other schools in over forty countries joined in, and the Bosque Eterno de los Niños is now the largest private reserve in Costa Rica at around twenty-three thousand hectares.',
    'Most of it is strictly protected and not open to visitors, which is the correct arrangement. Two stations — Bajo del Tigre near Monteverde and San Gerardo further down the Caribbean slope — let people in.'
  ],
  see: [
    { n: 'Bajo del Tigre', t: 'easy, close to town',
      d: 'Lower and drier than the cloud forest reserves, which means more light, more open structure and better odds of actually seeing animals. Excellent for a half-day and for families.' },
    { n: 'The night walk at Bajo del Tigre',
      d: 'One of the best in the area, with the advantage that the terrain is gentle.' },
    { n: 'San Gerardo station', t: 'an overnight',
      d: 'A long walk in, basic accommodation, and a view straight at Arenal. Bellbirds in season are deafening. Book well ahead.' }
  ],
  when: 'Year round. Bellbird season at San Gerardo is roughly March to June.',
  stay: 'Half a day at Bajo del Tigre; one or two nights at San Gerardo.',
  move: 'Bajo del Tigre is walkable from Monteverde. San Gerardo requires arrangement with the reserve.',
  eat: 'Nothing at Bajo del Tigre beyond water. San Gerardo provides meals.'
},

'MON-curi-cancha': {
  intro: [
    'Curi-Cancha was a farm. Part of it was cleared for cattle and coffee, part was left standing, and when it was turned into a reserve the open ground was allowed to regenerate rather than being replanted.',
    'That history is exactly why birders rate it above the famous reserve next door. A mosaic of pasture edge, secondary growth and primary forest holds far more species than unbroken canopy does, and the open sections mean you can actually see them. Visitor numbers are capped and the place is noticeably calm.'
  ],
  see: [
    { n: 'Quetzals in the open', t: 'February to May',
      d: 'The reserve has fruiting aguacatillos in reachable, visible positions. Many people who missed quetzals at Monteverde get them here.' },
    { n: 'The early entry',
      d: 'Curi-Cancha opens before the other reserves and birders use it. The first ninety minutes are the productive ones.' },
    { n: 'The old farm trails',
      d: 'Gentler gradients than the cloud forest reserves, with benches and long views — easier walking for anyone who found Monteverde’s trails hard going.' }
  ],
  when: 'Dry season for quetzals and comfort. Entry is capped; book ahead.',
  stay: 'Three to four hours, ideally from opening.',
  move: 'A short drive or a long walk from Santa Elena, near the Monteverde reserve road.',
  eat: 'Nothing on site. Eat in town.'
},

/* ===================== GUANACASTE ===================== */
'GUA-rincon-de-la-vieja': {
  intro: [
    'Rincón de la Vieja is a volcano with its plumbing exposed. The summit crater is active and usually closed, but the real attraction is lower down, where the geothermal field vents through the dry forest: mud pots that plop and burp, fumaroles hissing out of cracks, a stream that runs grey-blue with sulphur, and the whole area smelling faintly of struck matches.',
    'The forest around it is tropical dry forest, which is a far rarer habitat than rainforest and much more legible. In the dry season most of the trees drop their leaves, the canopy opens, and seeing animals goes from difficult to easy — this is the time of year when you actually spot the coatis, agoutis and howler monkeys rather than just hearing them.',
    'The park has two sectors. Las Pailas is the one with the geothermal loop and most of the trails. Santa María is quieter, has hot springs, and takes a rougher road.'
  ],
  see: [
    { n: 'Las Pailas loop', t: 'about two hours',
      d: 'A three-kilometre circuit past the boiling mud, the fumaroles and a miniature volcano that puffs steam. Stay on the boardwalks and the marked path — the crust over some of this is thin, and people have been badly burned stepping off it.' },
    { n: 'La Cangreja waterfall', t: 'five hours return',
      d: 'A long, hot, mostly level walk out through dry forest to a slender fall dropping into an improbably blue pool. Start early, carry more water than you think, and swim when you get there.' },
    { n: 'Hot springs and mud baths on the flanks',
      d: 'Several private operations outside the park use the same geothermal water. Volcanic mud, then a hot soak, then a cold river. Touristy and genuinely good.' },
    { n: 'The Oropéndola waterfall',
      d: 'Shorter than La Cangreja and easier, on private land near the Las Pailas road. A deep blue pool with a rope swing.' },
    { n: 'The summit', t: 'when open',
      d: 'A hard full-day climb to the active crater, frequently closed on volcanic activity and often shut in the wet season. Check with the rangers rather than assuming.' }
  ],
  when: 'December to April. The dry forest is leafless and the wildlife is visible, the trails are dry, and the summit is most likely to be open. Expect real heat by midday regardless.',
  stay: 'A full day for Las Pailas and a waterfall. Two if you want the springs as well.',
  move: 'About an hour from Liberia, the last stretch on dirt that is rough but usually passable in a normal car in the dry season. Four-wheel drive for the Santa María sector.',
  eat: 'Nothing inside. Eat in Liberia or at one of the lodges on the approach road.'
},

'GUA-santa-rosa': {
  intro: [
    'Santa Rosa was the first national park in Costa Rica, declared in 1971, and it protects two different things at once. The first is history: the Casona, a colonial hacienda where in 1856 a Costa Rican militia routed the filibuster army of the American adventurer William Walker in a battle lasting about fourteen minutes. It is the founding story of Costa Rican nationhood and every schoolchild knows it.',
    'The second is ecology, and it matters more. This is the largest remaining stand of tropical dry forest in Central America, a habitat that once ran from Mexico to Panama and has been reduced to a few per cent of its range. The restoration project here, run over decades with the Guanacaste Conservation Area, is one of the most ambitious ecological experiments anywhere.',
    'And at the bottom of a very rough track is Playa Naranjo, with Witch’s Rock standing offshore — one of the most famous surf breaks in the world.'
  ],
  see: [
    { n: 'La Casona and the battlefield', t: 'an hour',
      d: 'The hacienda was burned by arsonists in 2001 and rebuilt from the original plans. The museum is small, well done and explains the 1856 campaign clearly. The stone corrals outside are original.' },
    { n: 'Playa Naranjo and Witch’s Rock', t: 'a serious expedition',
      d: 'Twelve kilometres of deeply rutted track, four-wheel drive only, impassable in the wet season, and with a river crossing. Most surfers come by boat from Playas del Coco or Tamarindo instead, which is the sensible choice.' },
    { n: 'Turtle nesting at Playa Nancite', t: 'restricted',
      d: 'One of the world’s major olive ridley arribada beaches. Access is limited to researchers and permit holders, which is why it still works.' },
    { n: 'The dry forest trails near the Casona',
      d: 'Short, well-marked loops. In the dry months the bare canopy makes this some of the easiest wildlife watching in the country — white-faced capuchins, howlers, coatis, deer.' }
  ],
  when: 'December to April for access and visibility. The arribadas at Nancite peak in the wet season, which is also when the tracks close.',
  stay: 'A day. Camping is permitted at the administrative area and is basic but pleasant.',
  move: 'The entrance is right on the Pan-American Highway north of Liberia, so the main sector is easy. Everything beyond it is not.',
  eat: 'A simple comedor near the campsite in season. Otherwise bring food.'
},

'GUA-tamarindo': {
  intro: [
    'Tamarindo is the most developed beach town on the Pacific coast and attracts a certain amount of sneering for it — Tamagringo is the standing joke. The criticism is not baseless: this is condominiums, surf schools, real-estate offices and a lot of English. But it is also very good at the thing it does, and the thing it does is get people into the water.',
    'The wave is the reason. The beach break at the river mouth is forgiving, consistent and works at most tides, which makes it close to ideal for learning. There are more surf schools per metre of sand here than anywhere else in the country and the competition keeps them decent.',
    'The wider bay is also a national marine park, because the beach immediately north is one of the most important leatherback nesting sites in the eastern Pacific — a fact that sits oddly alongside the nightlife and is worth knowing.'
  ],
  see: [
    { n: 'Learning to surf', t: 'any morning',
      d: 'The whitewater inside is gentle and sandy-bottomed. A two-hour group lesson gets most people standing. Mornings are glassier and less crowded than afternoons.' },
    { n: 'The estuary at Las Baulas', t: 'by boat, at dusk',
      d: 'The mangrove estuary behind the beach holds crocodiles, howler monkeys and a great deal of birdlife. Go late afternoon when everything comes down to the water.' },
    { n: 'Playa Langosta', t: 'twenty minutes’ walk south',
      d: 'Rockier, far quieter, and the sunset spot locals actually use. Not a swimming beach — there is a strong rip — but a very good walking one.' },
    { n: 'A boat out to Witch’s Rock and Ollie’s Point', t: 'full day',
      d: 'The surf trip that made this coast famous. Boats run north into Santa Rosa, which is the only practical way to reach either break.' },
    { n: 'Sunset on the main beach',
      d: 'Unapologetically the town’s communal event. The whole beach turns out. It is better than cynicism allows for.' }
  ],
  when: 'December to April for sun and reliable conditions. The green season has fewer people, better prices and surf that is often bigger.',
  stay: 'Three or four nights, more if you are learning to surf and want to make progress.',
  move: 'An hour and a quarter from Liberia airport on good road. The town itself is walkable. For Avellanas or Playa Negra you want a car — the roads south are dirt and the river crossings are real.',
  eat: 'The best range on the coast: proper ceviche, a strong taco scene, several good breakfast places, and genuine fine dining if you want it. Prices are the highest in Guanacaste.'
},

'GUA-playa-conchal': {
  intro: [
    'Conchal is not sand. It is billions of crushed shell fragments, built up over millennia, and the practical consequences are immediate: it is hard to walk on barefoot, it does not stick to you, and it does not get hot. The water off it is clearer than anywhere else on this stretch of coast, because shell does not cloud up the way sand does.',
    'It is backed by a large all-inclusive resort, which controls the road access. The beach itself is public, as every beach in Costa Rica is below the high-tide line, and the way in is to walk from Brasilito at the north end — about twenty minutes along the sand.'
  ],
  see: [
    { n: 'The walk in from Brasilito',
      d: 'Park in Brasilito and walk south around the headland. You arrive at the quiet end, and the gradation from ordinary grey sand to pure shell happens under your feet as you go.' },
    { n: 'Snorkelling at the north end',
      d: 'Rocks at either end hold fish, and the visibility is the best on this coast. Calmest in the morning before the afternoon wind.' },
    { n: 'Just looking at the shells',
      d: 'Worth a few minutes on your knees. The variety in a handful is remarkable, and taking them is prohibited.' }
  ],
  when: 'Dry season for water clarity. Mornings are calmer than afternoons year round.',
  stay: 'Half a day. It is a beach, not a town.',
  move: 'Via Brasilito, about forty minutes from Tamarindo. The direct road is resort-controlled; the beach walk is the reliable way in.',
  eat: 'Brasilito has good, cheap, unpretentious seafood sodas right on its own beach.'
},

'GUA-playa-grande': {
  intro: [
    'Playa Grande is the beach directly north of Tamarindo across the estuary, and it is a completely different proposition. There is almost no development, because the whole beach is Las Baulas National Marine Park and building has been restricted for decades — a restriction that has been fought over in court repeatedly.',
    'The reason is the leatherback. This is one of the most significant nesting beaches for the species in the eastern Pacific, and the leatherback is the largest turtle on earth — up to two metres and several hundred kilograms. Numbers here have fallen alarmingly, which is precisely why the lights stay off.',
    'By day it is a long, open, powerful beach break with few people on it. By night in season it is closed except to guided tours.'
  ],
  see: [
    { n: 'A leatherback tour', t: 'October to February, by permit',
      d: 'Strictly controlled: small groups, a guide, no torches, no cameras, and a wait at the ranger station until a nesting female is located. There is no guarantee on any given night. When it happens it is extraordinary.' },
    { n: 'Surfing', t: 'all year',
      d: 'A consistent, punchy beach break with several peaks along its length. More powerful than Tamarindo and far less crowded — a step up rather than a place to start.' },
    { n: 'The sunset, with nothing in the way',
      d: 'No buildings, no lights, almost nobody. The contrast with Tamarindo twenty minutes away is the whole point of coming here.' },
    { n: 'The estuary by kayak',
      d: 'The same mangrove system as Tamarindo’s, approached from the quiet side.' }
  ],
  when: 'Turtles October to February. Surf year round, bigger in the green season. The beach is closed after dark in nesting season.',
  stay: 'Two or three nights if you want quiet with Tamarindo accessible; a day trip otherwise.',
  move: 'By road it is about forty minutes around the estuary from Tamarindo, or five minutes by boat taxi across it. The boat is much the better option.',
  eat: 'A handful of restaurants attached to small hotels. Limited by design.'
},

'GUA-papagayo': {
  intro: [
    'The Papagayo Peninsula is a planned tourism development — a government concession dating to the 1970s, built out over the last twenty-five years into a strip of large resorts along a series of protected coves.',
    'What it has, which most of this coast does not, is genuinely calm water. The peninsula shelters a succession of small bays from the swell, so this is one of the few places in Guanacaste where the sea is reliably swimmable rather than something to be surfed or respected.',
    'It is also where the serious money is, and it feels it. Access to much of the peninsula goes through a security gate, though the beaches themselves remain public.'
  ],
  see: [
    { n: 'Playa Blanca and the smaller coves',
      d: 'Calm, clear and backed by dry forest. The further you go along the peninsula the quieter it gets.' },
    { n: 'Diving the Catalina and Bat Islands', t: 'boats from nearby',
      d: 'The Bat Islands offer one of the few reliable bull shark dives in the world, for experienced divers only. The Catalinas have manta rays in season and are suitable for everyone.' },
    { n: 'Sailing and sunset cruises',
      d: 'Catamarans leave from the marina daily. A standard activity, done well here, with snorkel stops in the coves.' },
    { n: 'The dry forest between the bays',
      d: 'Howler monkeys and a great deal of birdlife right behind the resorts. Early morning on any access road is productive.' }
  ],
  when: 'December to April is the classic season. The green season is quieter, greener and considerably cheaper.',
  stay: 'As long as your resort booking. It is a base rather than a destination.',
  move: 'Twenty-five minutes from Liberia airport, which is the peninsula’s whole commercial logic. Car or resort transfer.',
  eat: 'Resort restaurants, mostly. For anything else, drive to Playas del Coco.'
},

'GUA-liberia': {
  intro: [
    'Liberia is called the White City, for the pale limestone its older houses were built from and the white dust that used to cover everything in the dry season. It is the capital of Guanacaste and the hinge of the entire region: the international airport is here, and every road to every beach starts from it.',
    'Most visitors pass straight through, and that is a reasonable decision — this is a working provincial city, not a resort. But the old quarter south of the main square has a run of genuine colonial adobe houses with corner doors, and the whole place has a distinct identity. Guanacaste was part of Nicaragua until 1824 and voted to join Costa Rica; the regional culture, the marimba music and the sabanero cattle tradition all come from that history.'
  ],
  see: [
    { n: 'Calle Real', t: 'an hour on foot',
      d: 'The old street running south from the central park, lined with nineteenth-century adobe houses, several with the distinctive corner doors that let the owners face two streets at once.' },
    { n: 'La Agonía church',
      d: 'An eighteenth-century whitewashed church at the end of Calle Real. Often shut, and the exterior is the point.' },
    { n: 'The Saturday market',
      d: 'Produce from the whole province. The best place to see Guanacaste as itself rather than as a collection of beaches.' },
    { n: 'Using it as a base',
      d: 'Rincón de la Vieja is an hour away, Santa Rosa forty minutes, Palo Verde ninety. Liberia is a far cheaper place to sleep than any beach town.' }
  ],
  when: 'Any time. It is reliably hot and reliably dry from December to April, and genuinely fierce in March and April.',
  stay: 'A night, usually on the way in or out. Two if you are using it to reach the parks.',
  move: 'The airport is ten minutes out. Buses go everywhere in the province from the two terminals. The city is walkable in the cool of the morning and unpleasant to walk at midday.',
  eat: 'Guanacaste’s own food, which differs from the rest of the country: more maize, more beef. Look for arroz de maíz and anything involving the local cheese.'
},

'GUA-palo-verde': {
  intro: [
    'Palo Verde sits on the floodplain of the Tempisque, where seasonal marsh spreads out below a limestone ridge. It floods in the wet season and shrinks through the dry, and that cycle is the whole ecological point: as the water contracts, every wading bird for a hundred kilometres is concentrated onto what is left.',
    'The result, in March and April, is one of the great bird concentrations in Central America — jabiru storks, roseate spoonbills, wood storks, herons and thousands of ducks on a few hectares of shrinking water.',
    'The park also holds a research station run by the Organization for Tropical Studies, which takes visitors and has the best guides in the area.'
  ],
  see: [
    { n: 'A boat trip on the Tempisque', t: 'two hours',
      d: 'Crocodiles in quantity, iguanas in the overhanging trees, monkeys, and birds all along the banks. Most trips run from the Puerto Humo side or from a dock near Bebedero.' },
    { n: 'The limestone lookout',
      d: 'A short steep climb behind the research station gives the whole wetland laid out below you, which is the only way to grasp its scale.' },
    { n: 'Isla Pájaros',
      d: 'A small island in the river that is a major nesting colony. Viewed from the boat; landing is not permitted.' },
    { n: 'Dry forest trails',
      d: 'The higher ground is limestone dry forest, quite different from the marsh, with its own species.' }
  ],
  when: 'January to April, and March is the peak. In the wet season the water spreads out and the birds disperse with it.',
  stay: 'A day trip. The OTS station takes overnight guests, which gets you dawn on the marsh.',
  move: 'Roughly an hour and a half from Liberia, the final section on dirt that gets rough. Boat trips can also be joined from the far bank near Nicoya.',
  eat: 'Meals at the research station if you have booked. Otherwise bring everything.'
},

'GUA-playas-del-coco': {
  intro: [
    'Playas del Coco is an actual Costa Rican town that happens to be on a beach, rather than a resort that happens to have Costa Ricans working in it. The sand is grey and volcanic, the bay is full of moored fishing and dive boats, and the waterfront is a mix of sodas, bars and tackle shops.',
    'That makes it the least polished and most sociable of the northern beach towns, and it is the diving capital of the region — the boats for the Catalina Islands and the Bat Islands leave from here.'
  ],
  see: [
    { n: 'Diving the Bat Islands', t: 'advanced only',
      d: 'The Big Scare — a site where bull sharks congregate — is one of the few reliable bull shark dives anywhere. Strong currents, deep, and genuinely not for new divers.' },
    { n: 'Diving or snorkelling the Catalinas',
      d: 'Much gentler. Giant manta rays pass through between December and April, along with rays, turtles and large schools of fish.' },
    { n: 'The beach at sunset',
      d: 'Grey sand, a line of boats, and the whole town out walking. Not a postcard beach, and a very good one to be on in the evening.' },
    { n: 'Sportfishing',
      d: 'Sailfish, marlin and dorado offshore. Half and full days leave early from the bay.' }
  ],
  when: 'Manta season December to April. Visibility is better in the dry season; the green season brings plankton, which means poorer visibility and more big animals.',
  stay: 'Two or three nights, more if you are diving.',
  move: 'Thirty-five minutes from Liberia airport on paved road. The town is walkable end to end.',
  eat: 'The best-value seafood on this coast. Ceviche everywhere, whole fried fish at the beachfront sodas, and a lively bar scene after dark.'
},

'GUA-playa-hermosa-gte': {
  intro: [
    'This Playa Hermosa — there is another one near Jacó, and people book the wrong one with some regularity — is a grey-sand crescent just around the headland from Playas del Coco. It is calm, shallow, and almost entirely free of surf.',
    'That makes it the beach in northern Guanacaste that families with small children actually use. It is quiet, slightly residential, and has none of Coco’s nightlife, which depending on your trip is either the attraction or the problem.'
  ],
  see: [
    { n: 'Swimming, which here is genuinely easy',
      d: 'The bay is sheltered at both ends, the shelf is gentle and the water is usually flat. Rare on this coast.' },
    { n: 'Kayaking and paddleboarding',
      d: 'Rentals on the sand. The calm water and the headlands make for an easy morning paddle.' },
    { n: 'Diving from here',
      d: 'Several operators are based on the beach and run the same Catalina and Bat Island sites as Coco.' }
  ],
  when: 'Dry season for sun; the water is calm year round.',
  stay: 'Two or three nights.',
  move: 'Forty minutes from Liberia. Next door to Coco, which is where you go for a wider choice of food.',
  eat: 'A few beachfront restaurants, several of them good. For range, drive ten minutes to Coco.'
},

'GUA-playa-flamingo': {
  intro: [
    'Flamingo sits on a headland between two bays, with pale sand that is genuinely white rather than the grey of most of this coast. It is the upmarket end of the region — villas on the hillside, a marina, and the sportfishing fleet that works out of it.',
    'The marina reopened after many years of closure and has brought the area back as a boating centre. For a visitor the practical appeal is a good swimming beach, a good sunset, and easy access to the string of beaches either side.'
  ],
  see: [
    { n: 'The main beach',
      d: 'A long white crescent, usually calm enough to swim, with a view out to the Catalina Islands.' },
    { n: 'Sportfishing',
      d: 'The best-organised fleet in Guanacaste. Sailfish and marlin offshore, roosterfish inshore.' },
    { n: 'The hill viewpoint',
      d: 'The road up to the villas gives the classic view down over both bays. Best in the hour before sunset.' },
    { n: 'Beach-hopping south',
      d: 'Brasilito, Conchal and Potrero are all within fifteen minutes, and all quite different.' }
  ],
  when: 'December to April. The green season is much quieter here than in Tamarindo.',
  stay: 'Two or three nights, usually as part of a wider Guanacaste trip.',
  move: 'An hour from Liberia on paved road. A car is close to essential — this is a spread-out, hilly place.',
  eat: 'A small number of good restaurants aimed at the villa crowd, priced for it. Brasilito, five minutes away, is where you eat cheaply.'
},

'GUA-miravalles': {
  intro: [
    'Miravalles is the highest volcano in the Guanacaste range at just over two thousand metres, and it is being quietly put to work. The geothermal field on its southern flank generates a meaningful share of national electricity, and the steam plumes from the plant are visible from the highway.',
    'For visitors it is the less famous alternative to Rincón de la Vieja — the same volcanic plumbing, fewer people, and a cluster of hot springs and mud pots along the approach.'
  ],
  see: [
    { n: 'Las Hornillas', t: 'half a day',
      d: 'A crater field of boiling mud pots and fumaroles on a working farm, with hot pools and a mud bath. Far less visited than the equivalent at Rincón.' },
    { n: 'The hot springs at Yökö and nearby',
      d: 'Simple thermal pools on the road up, popular with Costa Rican families at weekends and very cheap.' },
    { n: 'The Llanos de Cortés waterfall nearby',
      d: 'Twenty minutes away and the best waterfall in the province.' },
    { n: 'The geothermal plant',
      d: 'Visible from the road, with information boards. Worth a stop if the engineering interests you.' }
  ],
  when: 'December to April for the roads. The area is green and quiet in the wet season.',
  stay: 'A day from a base in Liberia or Bijagua.',
  move: 'About an hour from Liberia via Bagaces. Mostly paved with dirt sections to the individual sites.',
  eat: 'Sodas in Bagaces and Guayabo. Nothing elaborate.'
},

'GUA-playa-avellanas': {
  intro: [
    'Avellanas is twenty minutes of bad road south of Tamarindo and it is where the people who are serious about surfing go. Two kilometres of beach holds half a dozen distinct breaks — a beach break, a reef, a river mouth, and a left that works on a big swell — so the crowd spreads out and nobody is fighting for the same peak.',
    'There is no town. There is a famous beach bar, a few surf lodges, and a great deal of sand.'
  ],
  see: [
    { n: 'Surfing the range of breaks',
      d: 'Little Hawaii over reef for the experienced, the beach break in the middle for everyone else, and a sheltered river-mouth wave at the north end. Best at mid to high tide.' },
    { n: 'Lola’s', t: 'the beach bar',
      d: 'An institution, named after a pig. Good food, hammocks, and the social centre of the beach.' },
    { n: 'Walking south to Playa Negra',
      d: 'A long beach and headland walk at low tide, with almost nobody on it.' },
    { n: 'The mangrove at the north end',
      d: 'Behind the beach, with monkeys and birds, and a good spot in the early morning.' }
  ],
  when: 'Surf year round, bigger and more consistent in the green season from April to October. The access roads are worse then.',
  stay: 'Two or three nights if you surf. A long afternoon if you do not.',
  move: 'Dirt road from Tamarindo, with a river crossing that can be impassable after rain. Four-wheel drive is strongly advised in the wet season.',
  eat: 'Lola’s, and a couple of small places attached to the lodges. Nothing else.'
},

'GUA-playa-negra': {
  intro: [
    'Playa Negra is a fast, hollow right-hand break over a rock reef, and it became internationally known when it appeared in the surf film Endless Summer II in 1994. That fame has not translated into development: there is still no town, just a scattering of lodges behind the beach.',
    'It is not a swimming beach and not a beginner wave. The reef is shallow and unforgiving. What it is, on the right swell, is one of the best right-handers in the country.'
  ],
  see: [
    { n: 'The right-hand reef break',
      d: 'Works best at mid tide on a south or southwest swell. Shallow, fast and punchy. Not a place to learn.' },
    { n: 'Tide pools at low water',
      d: 'The reef that makes the wave also makes excellent rock pools when the tide drops.' },
    { n: 'The beach north towards Avellanas',
      d: 'Long, empty and good for walking. At low tide you can go a considerable distance.' }
  ],
  when: 'April to October for the biggest swell. Year round for something.',
  stay: 'Two or three nights, almost always surf-driven.',
  move: 'Dirt roads from either Tamarindo or Paraíso. Four-wheel drive in the wet season. Isolated — stock up before you come.',
  eat: 'Lodge restaurants, one or two of them surprisingly good.'
},

'GUA-bahia-salinas': {
  intro: [
    'Bahía Salinas is the far northwestern corner of Costa Rica, a wide shallow bay on the Nicaraguan border. From roughly December to April the trade winds pour across the isthmus here with almost no interruption, and they blow hard and continuously.',
    'That makes it useless for a beach holiday and excellent for kiteboarding and windsurfing, which is essentially the only reason anyone comes.'
  ],
  see: [
    { n: 'Kiteboarding', t: 'December to April',
      d: 'Flat water inside the bay, steady strong wind, and two or three established schools. One of the most reliable wind destinations in the Americas during the season.' },
    { n: 'Isla Bolaños',
      d: 'A small uninhabited island in the bay, a wildlife refuge protecting nesting frigatebirds, brown pelicans and American oystercatchers. Landing is not permitted; boats circle it.' },
    { n: 'The beaches, out of season',
      d: 'From May to November the wind drops, the bay goes calm, and the beaches become ordinary quiet beaches with almost nobody on them.' }
  ],
  when: 'December to April for wind. May to November for calm and quiet. The two are mutually exclusive.',
  stay: 'A week if you came to kite; a night otherwise.',
  move: 'About an hour from Liberia, up the Pan-American and then west at La Cruz. Paved most of the way.',
  eat: 'A few hotel restaurants and simple sodas in La Cruz. Limited.'
},

'GUA-llanos-de-cortes': {
  intro: [
    'Llanos de Cortés is a broad curtain of water dropping about fifteen metres into a wide sandy pool, and it is wider than it is tall — closer to a miniature Iguazú than to the narrow chutes most Costa Rican waterfalls make.',
    'It sits just off the Pan-American near Bagaces, which makes it the easiest significant waterfall in the country to reach. The site is managed by the local community and the entrance fee funds a nearby school.'
  ],
  see: [
    { n: 'Swimming at the base',
      d: 'A genuine sand beach at the bottom, shallow at the edges and deeper in the middle. The water is warm by waterfall standards and you can swim right up to the curtain.' },
    { n: 'Standing behind the falls',
      d: 'At lower flows you can work around the edge and get behind part of the curtain.' },
    { n: 'The short walk in',
      d: 'Five minutes down a steep path from the car park. Easier than most waterfall approaches here.' }
  ],
  when: 'Fuller in the wet season, clearer in the dry. Go early — it fills with Costa Rican families at weekends.',
  stay: 'Two hours.',
  move: 'Signposted off the Pan-American about twenty-five minutes south of Liberia, then a short dirt road. Any car.',
  eat: 'Simple food at the entrance. Bagaces has sodas.'
},

'GUA-guanacaste-np': {
  intro: [
    'Guanacaste National Park was created to solve an ecological problem rather than to show anybody anything. As the climate shifts, dry forest species need to be able to move uphill, and the park provides the corridor — linking the lowland dry forest of Santa Rosa to the wet forests on the Orosí and Cacao volcanoes.',
    'It is a research park. There are biological stations rather than visitor centres, access is limited, and almost nobody goes. For anyone interested in how large-scale restoration actually works, it is one of the more important pieces of land in the Americas.'
  ],
  see: [
    { n: 'The biological stations',
      d: 'Maritza, Pitilla and Cacao take researchers and, with advance arrangement, visitors. Basic accommodation, serious science.' },
    { n: 'Climbing Cacao or Orosí',
      d: 'Rough, unmaintained routes through the altitudinal gradient the park exists to protect. A guide and prior arrangement are necessary.' },
    { n: 'The petroglyphs near Maritza',
      d: 'Pre-Columbian carvings on boulders on the slope of Orosí, reached on a long walk from the station.' }
  ],
  when: 'Dry season for access. The tracks in are genuinely bad in the wet.',
  stay: 'Overnight at a station if you have arranged it.',
  move: 'Four-wheel drive and prior contact with the conservation area are both effectively required. This is not a drop-in park.',
  eat: 'Station meals by arrangement, or bring everything.'
},

'GUA-diria': {
  intro: [
    'Diriá protects upland forest on the spine of the Nicoya peninsula, and its function is hydrological: the rivers that supply a good part of the peninsula rise inside it. It was upgraded from a reserve to a national park in 2004.',
    'There is minimal infrastructure, a handful of trails, and very few visitors. Its appeal is precisely that.'
  ],
  see: [
    { n: 'The forest trails',
      d: 'A few marked routes through transitional forest between dry lowland and moister upland. Howler monkeys, deer and a long bird list.' },
    { n: 'The waterfalls',
      d: 'Several on the rivers inside the park, reached on foot. Ask the rangers which are running.' },
    { n: 'The lookout over the peninsula',
      d: 'On a clear day, down to the Gulf of Nicoya on one side.' }
  ],
  when: 'Dry season for the roads; the forest is greener and the falls fuller in the wet.',
  stay: 'A half-day from Santa Cruz or Nicoya.',
  move: 'Dirt roads from the Santa Cruz side. High clearance advised. Opening hours are limited and worth confirming.',
  eat: 'Nothing. Bring food and water.'
},

/* ===================== NICOYA PENINSULA & THE GULF ===================== */
'NIC-santa-teresa': {
  intro: [
    'Santa Teresa was a fishing settlement with no electricity until the 1990s and no paved road to this day. What it has now is a single dusty street running parallel to four kilometres of beach, lined with surf shops, hotels, yoga studios and an improbable number of very good restaurants.',
    'The wave is the foundation. It is a beach break that works nearly every day of the year at a range of tides, powerful enough to be interesting and forgiving enough to be learnable, and it is long enough that even in high season you can find a peak to yourself.',
    'The road is the filter. It is unpaved, potholed, dusty in the dry season and a river of mud in the wet, and getting here from San José takes most of a day. That has kept the place from becoming Tamarindo, and most people who come here hope it stays that way.'
  ],
  see: [
    { n: 'Surfing', t: 'all day, every day',
      d: 'Consistent beach break along the whole stretch. Playa Carmen at the south end is the most forgiving and where the schools operate; the further north you walk towards Playa Hermosa, the emptier and often better it gets.' },
    { n: 'Sunset on the beach', t: 'the daily event',
      d: 'West-facing, with a long flat horizon. The whole town comes out, fire dancers and all, and it is as good as the reputation.' },
    { n: 'Yoga', t: 'morning and evening',
      d: 'A serious scene rather than a token one — several established shalas with proper teachers, many of them drop-in.' },
    { n: 'Eating', t: 'genuinely a thing to do here',
      d: 'For a town on a dirt road, the food is extraordinary: Italian, Israeli, Japanese, Argentine, and excellent Costa Rican. A consequence of a long-settled international community.' },
    { n: 'A day trip to Montezuma or Cabo Blanco',
      d: 'Both within an hour. Cabo Blanco is the country’s oldest reserve and makes a good contrast to the beach.' }
  ],
  when: 'December to April is dry, dusty and busiest. The green season brings bigger surf, afternoon rain and a much quieter town. The roads get genuinely difficult from September.',
  stay: 'Four nights minimum — the journey is too long for less. Many people intend three and stay a fortnight.',
  move: 'From San José, the bus-and-ferry via Puntarenas, or fly to Tambor and drive an hour. Four-wheel drive is strongly advised and essential in the wet. Quad bikes and scooters are the local transport, and the dust and loose gravel cause a steady stream of injuries.',
  eat: 'The best eating of any small town in Costa Rica. Fresh fish daily, a real bakery scene, and prices above the national average but below Tamarindo’s.'
},

'NIC-nosara': {
  intro: [
    'Nosara is not one place but several — the inland Tico village, the beach at Playa Guiones where most visitors stay, Playa Pelada to the north, and the Ostional refuge beyond that. They are distinct and a few kilometres apart, which confuses people on arrival.',
    'What makes Guiones unusual is a zoning rule: construction must stay behind the tree line, so from the sand you see forest rather than hotels. The Nosara Civic Association has defended that for decades and it is why the beach looks the way it does.',
    'The wave is a consistent, gentle beach break that is close to ideal for learning and improving, which together with a long-established yoga community has made this the wellness capital of the country. It is also, by any measure, expensive.'
  ],
  see: [
    { n: 'Surfing at Playa Guiones',
      d: 'Seven kilometres of sandy beach break, working at most tides, rarely dangerous and almost never flat. The best place in Costa Rica to go from standing up to actually surfing.' },
    { n: 'Yoga at the Nosara Yoga Institute and others',
      d: 'This is where the Costa Rican yoga scene started. Drop-in classes everywhere; the institute runs teacher trainings.' },
    { n: 'The Ostional arribada', t: 'when it happens',
      d: 'Twenty minutes north. Olive ridleys arrive in their tens of thousands over a few nights, usually on a waning moon in the wet season. Guides are compulsory and the dates cannot be predicted far ahead.' },
    { n: 'Playa Pelada at low tide',
      d: 'A smaller, rockier cove with tide pools and a blowhole. Where locals go, and the better sunset of the two beaches.' },
    { n: 'The Nosara Biological Reserve',
      d: 'Mangrove and river forest behind the beach, with howler monkeys and a lot of birds. Easy walking and almost empty.' }
  ],
  when: 'December to April is dry and busy. The green season has better surf and a greener landscape; the roads deteriorate badly.',
  stay: 'Four or five nights. People come for a week and extend.',
  move: 'Fly to Nosara and skip the drive, or four to five hours from San José with a lot of dirt at the end. Four-wheel drive is close to essential. Within Nosara, a bicycle or quad — things are too spread out to walk.',
  eat: 'Health-forward and expensive, with excellent fish. The village of Nosara inland has proper sodas at a third of the price.'
},

'NIC-montezuma': {
  intro: [
    'Montezuma is a small town wedged into a cove at the southern tip of the peninsula, and it has been a bohemian outpost since the 1980s — long enough that the nickname Montefuma has had time to become slightly dated. It is tiny: three streets, a beach, and a waterfall ten minutes’ walk inland.',
    'It has resisted becoming Santa Teresa, partly by geography — the cove is small and there is nowhere to expand — and partly by inclination. The result is a town that feels lived-in rather than built, with a strong artistic streak and a pace that is genuinely slow.'
  ],
  see: [
    { n: 'The Montezuma waterfall', t: 'a twenty-minute scramble',
      d: 'Three tiers on a river just south of town. The lower fall has a deep pool you can swim in. People jump from the rocks above; people have also been seriously hurt doing it, and the route up is slippery rock, not a path.' },
    { n: 'Cabo Blanco Reserve', t: 'a half-day',
      d: 'Eleven kilometres south, the oldest protected area in the country. A two-hour walk down to a beach that only reserve visitors reach.' },
    { n: 'Playa Grande, north along the coast',
      d: 'Forty-five minutes on foot through forest and along the shore, to a long empty beach with a waterfall at one end. One of the best coastal walks in the country.' },
    { n: 'The Nicolás Wessberg reserve',
      d: 'Named for the Swede who fought to create Cabo Blanco and was murdered on the Osa in 1975 while campaigning for Corcovado. A short trail and a piece of conservation history.' },
    { n: 'Snorkelling off the rocks',
      d: 'The cove and the islets just offshore hold reasonable fish life when the water is calm.' }
  ],
  when: 'Dry season for the roads, green season for the waterfall at full volume.',
  stay: 'Three nights. Easily combined with Santa Teresa, forty minutes away.',
  move: 'Ferry from Puntarenas to Paquera, then about ninety minutes. The last descent into town is steep and in poor condition. The town itself is walkable end to end in five minutes.',
  eat: 'Good for its size — fish, Italian, a long-standing bakery, and cheap casados if you look away from the beachfront.'
},

'NIC-samara': {
  intro: [
    'Sámara has a feature almost no other Pacific beach in Costa Rica has: a reef running across the mouth of the bay. It takes the power out of the incoming swell, and the result is a beach you can genuinely swim at, with a small gentle wave inside that is close to perfect for a first surf lesson.',
    'That has made it a favourite with Costa Rican families as well as foreigners, which gives the town a different texture from the surf-expat places along the coast. It is relaxed, walkable and unpretentious.'
  ],
  see: [
    { n: 'Swimming and learning to surf',
      d: 'The protected bay is calm enough for children and holds a small rolling wave inside the reef. Several long-established schools on the sand.' },
    { n: 'Kayaking to Isla Chora',
      d: 'A small island at the end of the bay, about forty minutes’ paddle, with a beach on the lee side and snorkelling around the rocks.' },
    { n: 'Playa Carrillo, five kilometres south',
      d: 'A perfect palm-lined curve with no development at all. Arguably the more beautiful beach; Sámara has the town.' },
    { n: 'The walk to Playa Barrigona',
      d: 'North over the headland, a harder track to a near-empty beach.' },
    { n: 'Night snorkelling and bioluminescence',
      d: 'On a dark night the bay sometimes lights up. Tours run when conditions are right.' }
  ],
  when: 'Dry season for sun; the bay stays swimmable all year, which is more than most of this coast manages.',
  stay: 'Three or four nights.',
  move: 'About five hours from San José, with the last stretch paved — easier than most of the peninsula. Buses run daily. Walkable once there.',
  eat: 'Simple and good: whole fried fish at the beachfront sodas, a couple of Italian places, decent bakeries.'
},

'NIC-ostional': {
  intro: [
    'Ostional is a black-sand beach north of Nosara where, several times a year, something genuinely extraordinary happens. Tens of thousands of olive ridley turtles come ashore over three or four consecutive nights to nest, in a synchronised mass event called an arribada. At peak it is possible to walk the beach and never be out of sight of a nesting female.',
    'The refuge operates an unusual arrangement: the local community is legally permitted to harvest eggs from the first night of each arribada. The reasoning is that those eggs would mostly be destroyed by later-arriving turtles digging the same sand, and the legal harvest removes the incentive for poaching. It is controversial and, by most measures, it has worked.',
    'Arribadas cannot be scheduled. They usually fall in the last quarter of the moon, usually in the wet season, and usually last a few days — but none of that is a guarantee.'
  ],
  see: [
    { n: 'An arribada', t: 'if your timing is lucky',
      d: 'A guide is compulsory and arranged at the village. No white light, no flash, no touching. Nights are the main event but turtles continue arriving through the morning, and daylight viewing is easier and just as remarkable.' },
    { n: 'Hatchlings',
      d: 'Roughly forty-five to fifty days after an arribada, the beach fills with hatchlings heading for the sea, usually at dawn or dusk.' },
    { n: 'The beach itself, on an ordinary day',
      d: 'Wild, black-sand, strong surf, almost nobody. Not a swimming beach — the rips are serious and there are crocodiles at the river mouth.' }
  ],
  when: 'Arribadas are most frequent from July to December. Ask in Nosara; the village knows days in advance when one is starting.',
  stay: 'A night or two, or visit from Nosara twenty minutes away.',
  move: 'Dirt road from Nosara with a river crossing that becomes impassable in heavy rain. Four-wheel drive.',
  eat: 'A couple of sodas in the village. Simple.'
},

'NIC-cabo-blanco': {
  intro: [
    'Cabo Blanco is where conservation in Costa Rica began. In 1963, a Swedish-born farmer named Olof Wessberg and his Danish wife Karen Mogensen, watching the forest around their smallholding being felled, campaigned successfully to have the tip of the peninsula protected. It became the country’s first reserve, and the national park system grew outward from it.',
    'It was originally an absolute reserve, closed to everyone but researchers, and the strictness shows: the forest has had sixty years to recover and is noticeably taller and denser than anything around it. Part is now open on marked trails.',
    'The white in the name comes from the offshore island, which is pale with guano from the seabird colony on it.'
  ],
  see: [
    { n: 'The Sendero Sueco to the beach', t: 'four to five hours return',
      d: 'Named for Wessberg. Two hours down through regenerating forest to Playa Cabo Blanco, which only reserve visitors can reach, and a harder two hours back up. Carry water; there is none on the trail.' },
    { n: 'The beach at the end',
      d: 'Empty, rocky at the edges, with tide pools and often pelicans working offshore. Time it for low tide to get the most out of it.' },
    { n: 'The shorter Danés loop',
      d: 'A ninety-minute alternative for anyone not up for the full descent, with most of the same forest and the same monkeys.' },
    { n: 'The island, from the shore',
      d: 'Isla Cabo Blanco holds one of the largest brown booby colonies on the Pacific coast. Landing is forbidden; you watch from the beach.' }
  ],
  when: 'The reserve closes on Mondays and Tuesdays. Dry season for the trail, which is slippery and harder in the wet.',
  stay: 'Most of a day from Montezuma or Santa Teresa.',
  move: 'Eleven kilometres from Montezuma on a rough road. Taxi, shuttle or four-wheel drive.',
  eat: 'Nothing inside. Eat in Cabuya, just outside, which has a couple of good small restaurants.'
},

'NIC-malpais': {
  intro: [
    'Mal País is the southern continuation of the same dirt road that runs through Santa Teresa, and the two are usually spoken of together. It is rockier, quieter and slightly older in character, and it ends at a working fishing cove where the boats still come in.',
    'If Santa Teresa has become busy for your taste, this is the answer, and it is a ten-minute drive away.'
  ],
  see: [
    { n: 'The fishing cove at the end of the road',
      d: 'Boats pulled up on the sand, pelicans waiting, and fish sold straight off them in the morning. The least touristy scene on this stretch.' },
    { n: 'Surfing the rockier breaks',
      d: 'Less forgiving than Santa Teresa — reef and rock rather than open sand — and correspondingly less crowded.' },
    { n: 'Tide pools at low water',
      d: 'Extensive along this shore, and good for an hour of poking about.' },
    { n: 'Cabo Blanco, just south',
      d: 'The reserve entrance is close, and Mal País is the nearest place to sleep to it.' }
  ],
  when: 'Same as Santa Teresa. Dry season for roads, green for surf.',
  stay: 'Combined with Santa Teresa, which is where most of the food and nightlife is.',
  move: 'Same dirt road. Four-wheel drive advised.',
  eat: 'A few excellent small restaurants, and the fish cove for the freshest thing you will eat on the peninsula.'
},

'NIC-barra-honda': {
  intro: [
    'Barra Honda is a limestone ridge riddled with caves — over forty known, most of them never fully explored, formed in a reef that was uplifted out of the sea around sixty million years ago. From the outside it looks like an ordinary dry-forest hill, which is exactly what it was assumed to be until the 1960s.',
    'The one open to visitors is Terciopelo, and you enter it the way cavers do: down a vertical aluminium ladder, roped, with a guide above you. It is about seventeen metres straight down into the dark.'
  ],
  see: [
    { n: 'Descending into Terciopelo', t: 'half a day, booked ahead',
      d: 'The ladder is the memorable part. Below it are chambers with formations including one that rings when struck, which is where the cave’s name comes from. Groups are small and guides are compulsory.' },
    { n: 'The dry forest trails',
      d: 'Above ground, several loops through tropical dry forest with howler monkeys, coatis and in the dry season very open sightlines.' },
    { n: 'The Mirador',
      d: 'A viewpoint over the Tempisque valley and the Gulf of Nicoya, best in the early morning.' },
    { n: 'La Cascada',
      d: 'A terraced limestone formation, dry for much of the year and running in the wet season, like a small travertine staircase.' }
  ],
  when: 'The caves are open in the dry season only, roughly December to April — they flood otherwise. Book in advance; daily numbers are limited.',
  stay: 'A half-day, usually from Nicoya or Sámara.',
  move: 'About an hour from Nicoya town, the last part on dirt. Caving gear is provided.',
  eat: 'A small soda near the entrance run by the local association. Simple and good.'
},

'NIC-playa-carrillo': {
  intro: [
    'Carrillo is the beach people photograph when they want to show Costa Rica: a long symmetrical crescent of pale sand, backed by a solid line of coconut palms, with a headland at each end and not a single building on it.',
    'It stays that way because the development went to Sámara five kilometres north, and because the land behind the palms is protected. There is a village up on the hill, but the beach itself is empty.'
  ],
  see: [
    { n: 'The beach, which is the entire point',
      d: 'Calm enough to swim at most states of tide, shaded along the back by the palms, and usually close to deserted on a weekday.' },
    { n: 'The viewpoint on the road from Sámara',
      d: 'The road climbs over the headland and gives the classic view down the whole crescent. Stop; everyone does.' },
    { n: 'Sportfishing from the pier',
      d: 'A small fleet works out of here. Roosterfish inshore, sailfish out.' },
    { n: 'Sunset',
      d: 'Facing west down the curve, with the palms behind. As good as any on the coast.' }
  ],
  when: 'Dry season for reliable sun. Quiet year round except at Easter, when Costa Rican families fill it.',
  stay: 'A day from Sámara, or a few nights in the hill village for genuine quiet.',
  move: 'Five kilometres of paved road from Sámara.',
  eat: 'A handful of places up on the hill. For choice, go back to Sámara.'
},

'NIC-puntarenas': {
  intro: [
    'Puntarenas is a city built on a sandspit eight kilometres long and in places only a couple of hundred metres wide, with the Gulf of Nicoya on one side and an estuary on the other. It was Costa Rica’s principal Pacific port for over a century, the terminus of the coffee railway and the point from which the country’s exports left.',
    'Containerisation moved that business to Caldera in the early 1980s and Puntarenas has been declining ever since. It is hot, faded and visibly poorer than the beach towns.',
    'It is also completely unlike them, which is its interest. The Paseo de los Turistas along the gulf-facing shore is a genuine Costa Rican seaside promenade, busy at weekends with families from San José, and it is where you eat a churchill — a local shaved-ice confection with syrup, powdered milk and ice cream that exists nowhere else.'
  ],
  see: [
    { n: 'The Paseo de los Turistas',
      d: 'The waterfront promenade, best in the late afternoon when the heat drops and the town comes out. Food stalls, pelicans, and the gulf.' },
    { n: 'A churchill',
      d: 'The town’s own invention and an institution. Several stands on the Paseo claim to be the original.' },
    { n: 'The ferry across the gulf',
      d: 'To Paquera or Naranjo for the Nicoya peninsula. An hour on the water, often with dolphins, and far more pleasant than the drive around.' },
    { n: 'The Marine Park',
      d: 'A small aquarium of Costa Rican marine life in the old railway station, aimed at school groups and decent for an hour.' }
  ],
  when: 'Any time, though it is brutally hot from February to April. Weekends are livelier.',
  stay: 'A night at most, usually around a ferry. Many people use it only as a transit point.',
  move: 'Ninety minutes from San José by frequent bus. The ferry terminal is at the western tip of the spit.',
  eat: 'Seafood, cheaply and well, along the Paseo and in the market. And a churchill.'
},

'NIC-isla-tortuga': {
  intro: [
    'Isla Tortuga is a pair of small islands an hour out into the Gulf of Nicoya, with white sand and water far clearer than the mainland beaches opposite. It is privately held and run as a day-trip destination, and on a busy day several boats land at once.',
    'Judged as a wilderness experience it does not rate. Judged as what it actually is — an easy, pretty day on clear water with lunch included — it is good, and for anyone based in Puntarenas or Montezuma it is the obvious outing.'
  ],
  see: [
    { n: 'The beach and the snorkelling',
      d: 'Clear water by Gulf of Nicoya standards, with reef fish around the rocks at either end.' },
    { n: 'The crossing',
      d: 'An hour each way across the gulf, with a reasonable chance of dolphins and, between December and April, humpback whales.' },
    { n: 'The short island trail',
      d: 'A steep path up through dry forest to a viewpoint. Most people skip it; it takes twenty minutes and is worth doing.' }
  ],
  when: 'Dry season for calm water and visibility. The crossing can be rough in the green season.',
  stay: 'A day trip. There is no accommodation.',
  move: 'Boats from Puntarenas, Montezuma or Jacó. Tours include transport, lunch and snorkel gear.',
  eat: 'Lunch is part of the tour, usually grilled fish or chicken on the beach.'
},

'NIC-tambor': {
  intro: [
    'Tambor sits on Bahía Ballena, a wide sheltered bay on the gulf side of the peninsula with grey sand and almost no surf. It has an airstrip, which is its main practical significance — flying here and driving on is much the fastest way to reach Santa Teresa or Montezuma.',
    'The village itself is quiet to the point of sleepy, with a large all-inclusive at one end and very little at the other.'
  ],
  see: [
    { n: 'The bay',
      d: 'Calm, shallow and safe for swimming, which makes it genuinely useful for families. Not dramatic.' },
    { n: 'Whale watching', t: 'in season',
      d: 'Humpbacks use the bay — the name Bahía Ballena is not decorative. Boats go out from the village.' },
    { n: 'Curú refuge, fifteen minutes north',
      d: 'A small and excellent wildlife refuge, and the best reason to linger in this part of the peninsula.' },
    { n: 'Horse riding on the beach',
      d: 'Several operators. The long flat sand suits it.' }
  ],
  when: 'Dry season. The bay is calm year round.',
  stay: 'A night, usually either side of a flight.',
  move: 'Daily flights from San José to the airstrip. Also reachable by ferry to Paquera and a short drive.',
  eat: 'A few simple restaurants in the village and whatever the resorts serve.'
},

'NIC-curu': {
  intro: [
    'Curú is a small private wildlife refuge on a working farm, protected since 1933 by the Schutt family long before anyone was obliged to, and formally declared a refuge in 1983. It is only about eighty hectares of protected land within a larger estate, but it packs in five distinct habitats — mangrove, dry forest, semi-deciduous forest, beach and estuary — within walking distance of each other.',
    'The consequence is a remarkable density of animals for the size, and because they have been undisturbed for ninety years, they have almost no fear of people. The white-faced capuchins in particular will come close enough to be a nuisance with food.'
  ],
  see: [
    { n: 'The easy forest trails',
      d: 'Several short, flat, well-marked loops. Howler monkeys, capuchins, deer, agoutis, coatis and a long bird list, all within a couple of hours.' },
    { n: 'The mangrove estuary',
      d: 'Crabs, waders and crocodiles. Best early in the morning.' },
    { n: 'The beach',
      d: 'A calm, protected cove where the refuge trails come out. Swimmable and usually empty.' },
    { n: 'Scarlet macaws',
      d: 'A reintroduction project has established a small free-flying population here, and they are loud and conspicuous.' }
  ],
  when: 'Year round. Dry season for the easiest walking and the most open forest.',
  stay: 'Half a day. Basic cabins exist for anyone wanting dawn on the trails.',
  move: 'On the road between Paquera and Tambor. Any car. Entry is paid at the gate.',
  eat: 'A simple comedor at the refuge if arranged in advance; otherwise bring food.'
},

'NIC-isla-san-lucas': {
  intro: [
    'Isla San Lucas was a prison from 1873 until 1991, and it had a reputation as the most brutal in Central America. The writer José León Sánchez, imprisoned here for twenty years, made it nationally famous with a memoir that is still read in schools.',
    'It became a national park in 2020. The cell blocks are still standing, with prisoner drawings and graffiti on the walls, and the forest that has grown back over the rest of the island is full of deer, peacocks and white-tailed deer that wander the paths between the ruins.',
    'The combination — a decaying prison being digested by returning forest, twenty minutes from a beach resort — is unlike anywhere else in the country.'
  ],
  see: [
    { n: 'The prison buildings',
      d: 'Cell blocks, the chapel, the administration building and the punishment cells. The wall drawings are the thing that stays with people.' },
    { n: 'The island trails',
      d: 'Several kilometres of path through regenerating dry forest, with deer and birds throughout.' },
    { n: 'The beaches',
      d: 'Small coves around the island, calm and clear.' },
    { n: 'A guided visit',
      d: 'Worth taking. The history is not self-evident from the buildings and the guides include people with family connections to the place.' }
  ],
  when: 'Dry season for the crossing and the trails.',
  stay: 'A day trip.',
  move: 'Boats from Puntarenas, about forty-five minutes, usually as an organised tour.',
  eat: 'Nothing on the island beyond what the tour brings.'
},

'NIC-nicoya': {
  intro: [
    'Nicoya was the seat of the Chorotega people before the Spanish arrived, and the chief Nicoya who gave the town and the peninsula their name received the first Spanish expedition here in 1523. It is one of the oldest colonial settlements in the country and the administrative centre of the peninsula.',
    'It is also at the heart of one of the world’s five Blue Zones — the regions identified as having an unusual concentration of people living past ninety. The explanations offered range from the calcium-rich water to the diet of maize, beans and squash to the strength of family networks; the demographers are still arguing.',
    'For a visitor it is mostly a transit town, but it is a real one, with a working market and almost no tourism.'
  ],
  see: [
    { n: 'The church of San Blas',
      d: 'One of the oldest in Costa Rica, built in the seventeenth century, with a small museum of religious artefacts. Earthquakes have rebuilt it more than once.' },
    { n: 'The central market',
      d: 'Produce, prepared food and the ordinary commerce of the peninsula. Good and cheap.' },
    { n: 'Blue Zone food',
      d: 'The three sisters — maize, beans, squash — done the way they have been here for centuries. Ask for a casado in any soda and you are eating it.' },
    { n: 'Barra Honda, an hour away',
      d: 'The caves are the nearest major attraction and Nicoya is the usual base.' }
  ],
  when: 'Any time. Hot and dry from January to April.',
  stay: 'A night if you are using it as a base for Barra Honda.',
  move: 'Paved roads from Liberia and from the ferry at Paquera. A regional bus hub.',
  eat: 'Proper Guanacastecan food at a fraction of beach prices. Maize-based dishes here that are hard to find elsewhere.'
},

/* ===================== CENTRAL PACIFIC ===================== */
'CPA-manuel-antonio': {
  intro: [
    'Manuel Antonio is the smallest national park in Costa Rica and by a wide margin the most visited, and both of those facts matter. Fewer than two thousand hectares of rainforest run down to a series of white beaches and a tombolo — a sand bridge connecting a former island to the mainland — and the whole thing can be walked in a morning.',
    'The density of animals is the attraction. Three-toed and two-toed sloths, white-faced capuchins, howlers and the Central American squirrel monkey — which exists only on this stretch of coast and in western Panama — are all commonly seen within metres of the path. It is the easiest serious wildlife watching in the country.',
    'The cost of that is crowds. Daily numbers are capped and tickets must be bought online in advance, which helps, but on a high-season morning the main trail is a queue. Go at opening or do not go at all.'
  ],
  see: [
    { n: 'The main trail to Playa Manuel Antonio', t: 'go at opening',
      d: 'A broad, flat, partly paved path through forest to the tombolo beach. This is where most of the animals are seen, largely because this is where most of the eyes are. The first hour after opening is worth getting up for.' },
    { n: 'Punta Catedral loop', t: 'an hour',
      d: 'The circuit around the former island, climbing through forest to viewpoints over both bays. Steeper, quieter and the best views in the park.' },
    { n: 'Hiring a park guide',
      d: 'Guides work the entrance with telescopes and know where the sloths have been sleeping. For anything small or motionless — and most of it is — a guide is the difference between seeing nothing and seeing everything.' },
    { n: 'Playa Espadilla Sur',
      d: 'Inside the park, calmer than the public beach outside, and where the squirrel monkeys often come down in the late afternoon.' },
    { n: 'Watching your bag',
      d: 'Not a joke. The capuchins and raccoons here are expert thieves, they know what a backpack is, and food should be in something that latches.' }
  ],
  when: 'The park is closed one day a week — currently Tuesdays, but confirm. Dry season for weather, green season for far fewer people. Animals are most active in the first two hours after opening.',
  stay: 'Half a day inside the park. Two or three nights in the area.',
  move: 'Tickets online in advance; they sell out in high season. The park entrance is a few kilometres from Quepos along a single hilly road, served by a frequent cheap bus.',
  eat: 'Nothing inside beyond water. The road between Quepos and the park has the restaurants, several with the view that the hillside is famous for.'
},

'CPA-jaco': {
  intro: [
    'Jacó is ninety minutes from San José on a good road, and that single fact explains the town. It is where the capital goes for the weekend, which makes it the busiest, loudest and least subtle beach town in Costa Rica — a long grey beach, a main strip of bars, surf shops and sodas, and a frank nightlife that gives the place a reputation.',
    'It is not where you come for unspoiled anything. It is a very efficient place to learn to surf, eat late, and reach a dozen other things within an hour.'
  ],
  see: [
    { n: 'Learning to surf',
      d: 'The beach break is forgiving and the schools are numerous and cheap. Mornings before the wind.' },
    { n: 'Playa Hermosa, ten minutes south',
      d: 'A serious beach break with national competitions on it. Go to watch rather than to paddle out unless you know what you are doing.' },
    { n: 'The Tárcoles crocodile bridge', t: 'twenty minutes north',
      d: 'American crocodiles, some of them very large, on the sandbanks under the road bridge. Free, bizarre and genuinely impressive.' },
    { n: 'Carara National Park',
      d: 'Half an hour north, and the easiest place in the country to see wild scarlet macaws.' },
    { n: 'The Miro Mountain viewpoint',
      d: 'A steep walk or drive up behind town to the ruins of an unfinished hotel, with the whole bay below.' }
  ],
  when: 'Dry season is busiest; weekends are busy year round. The green season is quieter and the surf is bigger.',
  stay: 'Two nights, or use it as a first or last stop near the airport.',
  move: 'Ninety minutes from San José on the paved Caldera highway. Frequent buses. The town is walkable.',
  eat: 'Everything from street tacos to decent sushi. Cheaper and more varied than the Guanacaste beach towns.'
},

'CPA-carara': {
  intro: [
    'Carara sits exactly on the boundary between the dry forest of the north and the wet forest of the south, and that transitional position is the whole reason it is remarkable. Species from both zones overlap here, so a single morning on one trail turns up birds you would otherwise need two trips to see.',
    'It is also the most reliable place in Costa Rica to see wild scarlet macaws. The population here recovered from near-collapse and now numbers in the hundreds; they roost in the mangroves near the river mouth and fly inland at dawn and back at dusk, loudly and in pairs.'
  ],
  see: [
    { n: 'The Universal Access trail', t: 'about an hour',
      d: 'A flat, paved loop suitable for wheelchairs — rare in a Costa Rican park — through tall primary forest. Excellent for birds and the easiest walking in any rainforest in the country.' },
    { n: 'The Laguna Meándrica trail',
      d: 'Longer and rougher, out to an oxbow lake. Crocodiles, waterbirds and a good chance of monkeys. Can flood in the wet season.' },
    { n: 'Scarlet macaws at dusk',
      d: 'Stand near the river mouth at the end of the day and watch them come back in. You hear them long before you see them.' },
    { n: 'A guide at the gate',
      d: 'Worth it here more than almost anywhere. The bird list is long, much of it is high in the canopy, and the guides carry scopes.' }
  ],
  when: 'December to April for comfort; the macaws are resident year round. Early morning is best for everything.',
  stay: 'Half a day.',
  move: 'On the coastal highway between Jacó and Tárcoles, so easy to reach from either. The entrance is right on the road.',
  eat: 'Nothing inside. Tárcoles and Jacó both have options.'
},

'CPA-quepos': {
  intro: [
    'Quepos was a banana port, built by United Fruit in the 1930s, and when disease and labour disputes ended that business it reinvented itself around sportfishing and the national park up the hill. The old company housing is still recognisable in parts of town.',
    'It is where most people actually sleep and eat when visiting Manuel Antonio, because it is cheaper and more of a real place than the hotel strip on the ridge. The marina has brought money back in and the waterfront has smartened up considerably.'
  ],
  see: [
    { n: 'Sportfishing', t: 'the town’s business',
      d: 'Sailfish and marlin offshore, roosterfish and snapper inshore. One of the best-regarded fleets in the Pacific.' },
    { n: 'The marina and the waterfront',
      d: 'Pleasant in the evening, with restaurants looking out over the boats.' },
    { n: 'The mangroves at Damas Island',
      d: 'Boat and kayak trips into the estuary north of town — monkeys, crocodiles, herons and silver-cheeked bats on the trunks.' },
    { n: 'Rafting the Savegre or Naranjo',
      d: 'Both rivers are close and run class II–IV depending on section and season. Half-day trips.' },
    { n: 'The Friday market',
      d: 'Produce and prepared food, and the cheapest good eating in town.' }
  ],
  when: 'Year round. September and October are the wettest months on this coast and many places close for part of them.',
  stay: 'Two or three nights as a base for the park and the rivers.',
  move: 'Three hours from San José on paved road, or a short flight. Frequent buses run the seven kilometres up to the park.',
  eat: 'Far better value than the ridge: good sodas, fresh fish, a decent bakery, and the market on Fridays.'
},

'CPA-playa-hermosa-jaco': {
  intro: [
    'This Playa Hermosa is the one near Jacó, not the calm family beach in Guanacaste of the same name, and the difference matters: this one is a heavy, fast, close-out-prone beach break that hosts national competitions and is explicitly not a swimming beach. Signs say so and people still drown here.',
    'It is also a protected turtle nesting site, with a hatchery at the southern end run by a local association.'
  ],
  see: [
    { n: 'Watching the surf',
      d: 'From the beachfront restaurants. On a big swell this is as good a show as the coast offers, and much safer than being in it.' },
    { n: 'Surfing, if you are experienced',
      d: 'Powerful and fast, best at mid tide. Serious rip currents. Not a place to learn.' },
    { n: 'The turtle hatchery', t: 'July to December',
      d: 'Olive ridleys nest along this beach. The local association runs releases and night patrols in season.' },
    { n: 'The sunset',
      d: 'Long open west-facing sand with almost no development. Better than Jacó’s ten minutes north.' }
  ],
  when: 'Surf is biggest in the green season. Turtles from July to December.',
  stay: 'A night or two for surfers; an evening trip from Jacó otherwise.',
  move: 'Ten minutes south of Jacó on the coastal highway.',
  eat: 'A handful of beachfront restaurants, relaxed and reasonably good.'
},

'CPA-tarcoles': {
  intro: [
    'Tárcoles is a fishing village at the mouth of the river of the same name, and it is known for two things that sit uneasily together: it has one of the largest concentrations of American crocodiles in the country, and the river is one of the most polluted in Central America, carrying runoff from the whole Central Valley.',
    'The crocodiles are genuinely spectacular. Standing on the bridge and looking down at twenty or more animals, several of them over four metres, is free and takes five minutes.'
  ],
  see: [
    { n: 'The crocodile bridge',
      d: 'Park at either end — carefully, and leave nothing visible in the car; this spot has a theft problem. Walk out and look over. Best at low tide when the banks are exposed.' },
    { n: 'A river boat trip',
      d: 'Two-hour trips go up the estuary for crocodiles at close range and a great deal of birdlife in the mangroves. Some operators feed the animals, which is worth avoiding.' },
    { n: 'Scarlet macaws',
      d: 'The mangroves here are the roost for the Carara population. Dawn and dusk.' },
    { n: 'Playa Guacalillo',
      d: 'A long dark-sand beach north of the river mouth with almost nobody on it. Driftwood, pelicans and macaws overhead. Not for swimming.' }
  ],
  when: 'Year round. Low tide for the bridge.',
  stay: 'An hour at the bridge, or half a day with a boat trip.',
  move: 'On the coastal highway twenty minutes north of Jacó.',
  eat: 'Simple fish sodas in the village, several of them good and very cheap.'
},

'CPA-herradura': {
  intro: [
    'Herradura is a horseshoe bay just north of Jacó — the name means horseshoe — with much calmer water than its neighbour and a large marina and resort development at one end.',
    'The beach is dark sand and the swimming is genuinely easy, which on this stretch of coast is unusual. It is quieter than Jacó without being remote.'
  ],
  see: [
    { n: 'The bay',
      d: 'Sheltered by headlands at both ends, so the water stays calm when Jacó is churning. Fishing boats at one end, swimmers at the other.' },
    { n: 'Los Sueños marina',
      d: 'The sportfishing base for this part of the coast, with restaurants around it.' },
    { n: 'Sunset from the north end',
      d: 'The headland frames it, and there is a beach bar positioned for exactly this.' }
  ],
  when: 'Year round, calm throughout.',
  stay: 'Two nights, or a day trip from Jacó.',
  move: 'Five minutes north of Jacó off the coastal highway.',
  eat: 'Beachfront sodas doing fish, and more expensive places around the marina.'
},

'CPA-rainmaker': {
  intro: [
    'Rainmaker is a private reserve in a steep river valley in the Fila Chonta mountains, and it holds the oldest canopy bridge walk in Costa Rica — built in the early 1990s, before the idea had spread.',
    'It gets a fraction of the visitors Manuel Antonio does, twenty minutes away, and the forest is denser and wilder. The trade-off is that wildlife is harder to see here precisely because the forest is better.'
  ],
  see: [
    { n: 'The canopy bridges', t: 'about two hours',
      d: 'Six suspension bridges strung across the valley at up to twenty metres, linked by steep stairways. The structure is older and simpler than the commercial parks and feels more like being in the forest than above it.' },
    { n: 'The river trail and swimming holes',
      d: 'A series of pools and small falls along the valley floor, cold and clear, with a natural waterslide at one of them.' },
    { n: 'The night tour',
      d: 'Frogs in particular — this is a very wet valley and the amphibian list is long.' },
    { n: 'Birding at dawn',
      d: 'Early entry can be arranged. Tanagers, trogons and, with luck, a black-faced solitaire.' }
  ],
  when: 'Year round; wettest and greenest from September to November, which is when the river is at its best.',
  stay: 'Half a day.',
  move: 'About twenty-five minutes inland from Quepos, the last stretch on dirt. Tours include transport.',
  eat: 'A simple restaurant on site. Otherwise eat in Quepos.'
},

'CPA-esterillos': {
  intro: [
    'Esterillos is a long stretch of grey sand between Jacó and Parrita, split into three villages — Este, Centro and Oeste — with very little connecting them but the beach itself. It is the quiet alternative to Jacó, twenty minutes up the road.',
    'There is a bronze mermaid on a rock at the eastern end, placed by a local hotel, which is reachable at low tide and is the only landmark anyone mentions.'
  ],
  see: [
    { n: 'The empty beach',
      d: 'Kilometres of it, often with nobody in sight. Strong currents — this is for walking and surfing rather than casual swimming.' },
    { n: 'Surfing',
      d: 'Several uncrowded peaks along the length. Less powerful than Playa Hermosa and far quieter than Jacó.' },
    { n: 'The mermaid at Esterillos Este',
      d: 'On a rock offshore, reachable on foot at low tide. A small oddity and the local photo.' },
    { n: 'Horse riding',
      d: 'The long flat sand suits it and a couple of operators run from the villages.' }
  ],
  when: 'Year round. Green season for surf and solitude.',
  stay: 'Two or three nights for genuine quiet near the capital.',
  move: 'Off the coastal highway, with separate turnings for each village. A car is near-essential.',
  eat: 'A few small hotel restaurants and sodas. Limited; stock up in Jacó or Parrita.'
},

/* ===================== SOUTH PACIFIC & OSA ===================== */
'SPA-corcovado': {
  intro: [
    'Corcovado covers about a third of the Osa Peninsula and protects the last substantial tract of lowland tropical rainforest on the Pacific coast of Central America. National Geographic described it as the most biologically intense place on earth, and while that phrase has been worked hard by tour operators, nobody has seriously argued with it.',
    'The numbers behind it: roughly half of all species in Costa Rica occur here, including all four Costa Rican monkeys, Baird’s tapir, scarlet macaws in numbers, and the country’s most viable population of jaguar and puma. The forest is tall, structurally complex and in large part has never been logged.',
    'It is also properly difficult. Independent entry is not permitted — a certified guide is compulsory — numbers are capped, permits must be arranged in advance, and the walking is long, hot and humid. Nothing about this is a casual day out, and that is exactly why it still looks the way it does.'
  ],
  see: [
    { n: 'Sirena station', t: 'the heart of the park',
      d: 'The most remote and most rewarding of the stations, reached by boat from Drake Bay or on a long coastal walk from Carate. Tapirs are regularly seen around the station itself, and the trails from it are the best wildlife walking in the country. Accommodation is dormitory bunks and must be booked well ahead.' },
    { n: 'The San Pedrillo day trip', t: 'from Drake Bay',
      d: 'The most accessible way into the park: a boat north, a guided walk to a waterfall, and back. A genuine taste rather than the full experience, and a reasonable compromise on a short trip.' },
    { n: 'La Leona to Sirena on foot', t: 'a serious hike',
      d: 'Sixteen kilometres along the beach and through forest, timed around the tide because sections are impassable at high water. Hot, heavy going, and one of the great walks in Central America.' },
    { n: 'Scarlet macaws and the almendro trees',
      d: 'The coastal almond trees along the shore are what the macaws feed on, and in places there are dozens in the canopy at once.' },
    { n: 'What you will probably not see',
      d: 'Cats. Jaguar and puma are here in the best numbers in the country, and sightings are still rare. Treat any sighting as a windfall rather than the plan.' }
  ],
  when: 'December to April is drier and the trails are easier. The park sometimes closes sections in the wettest months. Book permits and Sirena bunks months ahead for high season.',
  stay: 'A day trip from Drake Bay works. Two or three nights at Sirena is the real thing.',
  move: 'A certified guide is compulsory for entry. Access is from Drake Bay by boat, from Puerto Jiménez via Carate by collective truck, or by small plane to Sirena’s airstrip.',
  eat: 'Meals at Sirena must be booked with your permit. Elsewhere, carry everything.'
},

'SPA-uvita': {
  intro: [
    'At low tide a sandbar runs out from the beach at Uvita and splits into two curving arms, making a shape that is unmistakably a whale’s tail. That it sits in the middle of a marine park visited by humpback whales is one of the better coincidences in Costa Rican geography.',
    'The whales are the real draw, and the unusual thing about this bay is that it gets two separate populations. Humpbacks from the northern hemisphere arrive around December to April; humpbacks from the southern hemisphere, which have come up from Antarctic waters, arrive around July to November. Very few places on earth have two whale seasons.',
    'The town itself is strung along the highway and is more a base than a destination, which keeps it affordable.'
  ],
  see: [
    { n: 'Walking out onto the whale’s tail', t: 'low tide only',
      d: 'Check the tide table and go out an hour or so before low water. You walk along the sandbar with sea on both sides. Do not linger as the tide turns.' },
    { n: 'Whale watching', t: 'two seasons',
      d: 'Boats run from the beach. July to November is the longer and generally better season. Mothers with calves are common and the operators are regulated on approach distance.' },
    { n: 'Snorkelling at Ballena rock',
      d: 'The rocks at the end of the tail hold fish and the water is clear on a calm morning. Access is by boat or at very low tide.' },
    { n: 'Nauyaca Waterfalls, inland',
      d: 'Thirty minutes up the road towards Dominical, and the best waterfall on this coast.' },
    { n: 'Uvita waterfall',
      d: 'A small fall in town with a natural rock slide into a pool. Popular with locals, cheap, and genuinely fun.' }
  ],
  when: 'July to November for the southern humpbacks and the greenest landscape. December to April for dry weather and the northern whales. Check tide tables for the sandbar.',
  stay: 'Three nights. It makes a good base for the whole southern coast.',
  move: 'On the coastal highway, about an hour south of Quepos. Buses run; a car is better for the waterfalls.',
  eat: 'Good and improving. Ojochal twenty minutes south has the best cooking on this coast.'
},

'SPA-drake-bay': {
  intro: [
    'Drake Bay is named for Francis Drake, who is supposed to have anchored here in 1579, and until recently the only way in was by boat up the Sierpe river and out through the river mouth into the sea — a crossing that is genuinely exciting when the bar is breaking.',
    'A road now exists, and it is bad enough that most people still take the boat. The village is small, strung along a shore of coves, with no bank and intermittent power in places.',
    'It is the northern gateway to Corcovado and the launching point for Caño Island, and those two things are why people come. The forest right around the village is also excellent in its own right.'
  ],
  see: [
    { n: 'Corcovado at San Pedrillo or Sirena', t: 'full day by boat',
      d: 'The standard trip. San Pedrillo is closer and shorter; Sirena is further, more expensive and much better for wildlife.' },
    { n: 'Caño Island', t: 'a day',
      d: 'An hour offshore, with the best visibility on the Pacific coast. Reef sharks, turtles, rays and large schools. Snorkelling and diving both.' },
    { n: 'The coastal trail to Agujitas and beyond',
      d: 'A footpath runs along the shore for several kilometres past coves and headlands. Free, lovely, and full of monkeys and macaws.' },
    { n: 'Night walk in the forest',
      d: 'One of the best in the country. The Osa’s amphibian and insect life is extraordinary and a good guide will find things you would not believe.' },
    { n: 'Dolphins and whales on the crossing',
      d: 'The boat trips frequently encounter both, and in season humpbacks are common.' }
  ],
  when: 'December to April for the calmest sea and the easiest access. The river mouth crossing can be rough and trips are sometimes cancelled.',
  stay: 'Three nights minimum — getting here is a commitment.',
  move: 'Boat from Sierpe, about ninety minutes including the river mouth. Or fly into the airstrip. The road is four-wheel drive only and frequently impassable in the wet.',
  eat: 'Lodge meals mostly, often included. A few small restaurants in the village.'
},

'SPA-puerto-jimenez': {
  intro: [
    'Puerto Jiménez is the only town of any size on the Osa Peninsula, and it grew during a gold rush in the 1960s and 70s when panners worked the rivers running out of what is now Corcovado. Some still do, legally and otherwise.',
    'Today it is the practical centre of the peninsula: the place you arrange a Corcovado permit, hire a guide, draw cash, buy batteries and catch the collective truck down to Carate. It is small, hot and friendly, and it sits on the Golfo Dulce rather than the open ocean, which makes the water in front of it flat.'
  ],
  see: [
    { n: 'Organising Corcovado',
      d: 'Guides, permits and transport are all arranged here. Even with everything booked online, this is where it becomes real.' },
    { n: 'Kayaking the Golfo Dulce mangroves', t: 'at dawn',
      d: 'The estuary behind town is full of birds and, if you go at first light, often dolphins in the gulf beyond.' },
    { n: 'Scarlet macaws in the town itself',
      d: 'They feed in the almond trees along the waterfront and around the airstrip. You will hear them from anywhere in town.' },
    { n: 'The collective to Carate', t: 'a journey in itself',
      d: 'An open truck down forty-three kilometres of dirt and river crossings to the southern end of the peninsula. Two and a half hours of genuine discomfort and a very good time.' },
    { n: 'Dolphin and whale trips on the gulf',
      d: 'The Golfo Dulce is a tropical fjord, unusually deep, and holds resident dolphins and seasonal humpbacks.' }
  ],
  when: 'December to April for roads and trails. The town works year round but the peninsula’s tracks do not.',
  stay: 'Two nights, more if using it as a Corcovado base.',
  move: 'Small plane from San José, or a long drive and a ferry across the gulf from Golfito. Within town, walk.',
  eat: 'Simple, cheap and good. Fresh fish, solid casados, and a couple of places that cater to the lodge crowd.'
},

'SPA-dominical': {
  intro: [
    'Dominical is a surf town on a dirt grid behind a long beach, and for years it had a reputation as the scruffy, slightly lawless alternative to everywhere else on this coast. The paving of the coastal highway changed that somewhat, but it has kept more of its character than most.',
    'The wave is a powerful beach break with a river mouth at one end, and the rip currents here are among the strongest on the coast — the lifeguard service was set up after a run of drownings and it is worth paying attention to their flags.'
  ],
  see: [
    { n: 'Surfing',
      d: 'Consistent and heavy, best at mid tide. A step beyond beginner level. Schools operate on the gentler inside sections.' },
    { n: 'Nauyaca Waterfalls', t: 'half a day',
      d: 'Up the hill behind town — two falls, the lower one forty-five metres into a huge pool. Reached on foot, on horseback or by truck.' },
    { n: 'Hacienda Barú',
      d: 'A private reserve just north with forest trails, a canopy platform and a long beach, and far fewer people than any national park.' },
    { n: 'The Sunday farmers market',
      d: 'A fixture, with a strong expat-organic streak and good food stalls.' },
    { n: 'Poza Azul',
      d: 'A small waterfall and swimming hole a short drive inland, free and usually quiet.' }
  ],
  when: 'Surf is biggest from April to October. The dry season is sunnier and busier.',
  stay: 'Three nights.',
  move: 'On the coastal highway, forty minutes south of Quepos. The town streets are dirt; everything is walkable.',
  eat: 'Good casual food — fish tacos, barbecue, a strong smoothie culture. Ojochal, half an hour south, is where you go for a proper dinner.'
},

'SPA-cabo-matapalo': {
  intro: [
    'Matapalo is the tip of the Osa Peninsula, where the Golfo Dulce meets the open Pacific, and three right-hand point breaks sit along a couple of kilometres of shore below primary rainforest. On a solid southern swell, Pan Dulce and Backwash are among the best waves in Costa Rica.',
    'There is no town and no real infrastructure by deliberate choice. A handful of lodges sit in the forest above the beaches, the road is dirt, and the electricity in places is solar.',
    'The forest here is as good as the surf. Scarlet macaws, all four monkeys and a resident population of harpy-eagle-sized raptors are all along the same track.'
  ],
  see: [
    { n: 'The three point breaks',
      d: 'Pan Dulce, Backwash and King Louie, working on a southern swell from roughly April to October. Reef and rock bottom, long rides, experienced surfers only.' },
    { n: 'The King Louis waterfall',
      d: 'A short walk inland to a fall you can climb beside and swim beneath.' },
    { n: 'Tree climbing', t: 'genuinely',
      d: 'A long-established operation takes people up a strangler fig on ropes to a platform forty metres up in the canopy. Unusual and excellent.' },
    { n: 'Wildlife on the road',
      d: 'Walking the track at dawn produces macaws, toucans, monkeys and coatis with very little effort.' }
  ],
  when: 'April to October for the swell. December to April for the easiest road access.',
  stay: 'Three nights or more. The journey does not reward a short visit.',
  move: 'Forty minutes of dirt road from Puerto Jiménez, with river crossings. Four-wheel drive essential, or the collective truck.',
  eat: 'Lodge meals. There is effectively nothing else, so half board is the norm.'
},

'SPA-cano-island': {
  intro: [
    'Caño Island sits about twenty kilometres off the Osa Peninsula and is a biological reserve with the best underwater visibility on the Costa Rican Pacific — regularly fifteen to twenty metres, against a handful of metres at most mainland sites.',
    'It also holds an archaeological puzzle. The pre-Columbian Diquís people used the island as a cemetery, and some of their stone spheres were placed here, on an island with no suitable stone, which means they were transported across open sea.',
    'Landing on the island is now restricted to protect both the archaeology and the forest, so most visits are in the water around it.'
  ],
  see: [
    { n: 'Snorkelling the reefs',
      d: 'Five main sites around the island. White-tip reef sharks, turtles, rays, moray eels and very large schools of jacks and snapper.' },
    { n: 'Diving', t: 'for the certified',
      d: 'Bull sharks are occasional, manta rays seasonal, and the visibility makes everything better. Two-tank trips from Drake Bay or Uvita.' },
    { n: 'Whales and dolphins on the crossing',
      d: 'The run out crosses deep water and encounters are frequent, especially in the two humpback seasons.' },
    { n: 'The stone spheres',
      d: 'Visible only on the restricted guided landings when those are permitted. Ask whether your operator has access rather than assuming.' }
  ],
  when: 'Visibility is best in the dry season, December to April. Green-season plankton reduces clarity but brings more large animals.',
  stay: 'A day trip from Drake Bay, Sierpe or Uvita.',
  move: 'By boat only, an hour or so each way. Numbers are capped daily, so book ahead in season.',
  eat: 'Lunch is provided by the operator, usually eaten on the boat or on the beach where landing is allowed.'
},

'SPA-nauyaca': {
  intro: [
    'Nauyaca is two waterfalls on the Barú river — a short upper drop of about twenty metres into a shallow basin, and immediately below it a forty-five metre fall into a pool big enough to swim across properly.',
    'The land is privately owned by a family who have run access for decades, and there are three ways in: walking, on horseback, or in the back of a truck. The walk is about four kilometres each way on a dirt road with a serious climb on the return.'
  ],
  see: [
    { n: 'The lower fall and its pool',
      d: 'Deep, cold and large. You can swim to the base. The rocks around it are slippery and people are injured scrambling on them every season.' },
    { n: 'The upper fall',
      d: 'A terraced drop into a shallower basin, better for sitting in than swimming.' },
    { n: 'The horseback option',
      d: 'The traditional way in, run by the family who own the land, usually with breakfast included. Pleasant and much easier than walking back up.' },
    { n: 'The river below',
      d: 'Quieter pools downstream where almost nobody goes.' }
  ],
  when: 'Fullest in the green season; clearest and most swimmable in the dry. Go early — the pool gets busy by late morning.',
  stay: 'Half a day.',
  move: 'The access road is twelve kilometres inland from Dominical. Driving yourself is possible to the car park; beyond that it is walk, horse or the official truck.',
  eat: 'Food at the entrance and usually included on the horse tours.'
},

'SPA-pavones': {
  intro: [
    'Pavones is a left-hand point break on the eastern side of the Golfo Dulce, and on a big southern swell the ride is measured in minutes rather than seconds — commonly cited as one of the two or three longest left-handers on earth. Two minutes is not a myth here; it is a good day.',
    'Getting there is eight hours from San José on progressively worse roads, and that has kept the village tiny. It also has a complicated recent history involving land disputes between squatters and foreign owners that turned violent in the 1990s, which is worth knowing even though the place is entirely peaceful now.'
  ],
  see: [
    { n: 'The wave', t: 'April to October',
      d: 'Needs a solid southern swell to really work, which means the green season. When it is on, it is a point break that starts at a river mouth and runs for several hundred metres. Crowded by local standards when it is good, which still means a few dozen people.' },
    { n: 'Punta Banco, further south',
      d: 'A reef break at the end of the road, and a turtle conservation project on the beach.' },
    { n: 'The Golfo Dulce',
      d: 'A tropical fjord, one of only a handful in the world, with resident dolphins and seasonal humpbacks.' },
    { n: 'Doing very little',
      d: 'There is no nightlife, limited power and patchy signal. That is the appeal.' }
  ],
  when: 'April to October for swell. The roads are at their worst then, which is the trade.',
  stay: 'A week if you surf; the journey makes anything shorter hard to justify.',
  move: 'Eight hours from San José, or fly to Golfito and drive two hours. Four-wheel drive, with river crossings.',
  eat: 'A few small restaurants and sodas. Simple and limited; bring anything specific you need.'
},

'SPA-isla-del-coco': {
  intro: [
    'Cocos Island lies five hundred and fifty kilometres off the Pacific coast, is uninhabited apart from park rangers, and is reachable only by liveaboard dive boat on a crossing of thirty to thirty-six hours each way. It is a UNESCO World Heritage site and the largest uninhabited island in the world.',
    'Divers go for one thing above all: schooling scalloped hammerheads, which congregate here at cleaning stations in numbers found almost nowhere else. Whale sharks, silky sharks, mantas and enormous schools of jacks are routine alongside them.',
    'It is also the island most often identified with Treasure Island, and several nineteenth-century treasure hoards are genuinely supposed to have been buried here. Hundreds of expeditions have looked. None has found anything.'
  ],
  see: [
    { n: 'Hammerhead schools at Bajo Alcyone',
      d: 'The signature dive: a seamount where hammerheads gather in their hundreds. Deep, with strong currents, and advanced certification plus a substantial logged-dive count is required.' },
    { n: 'Manuelita and Dirty Rock',
      d: 'White-tip reef sharks in numbers at night, and large pelagics by day.' },
    { n: 'The waterfalls from the sea',
      d: 'The island is extremely wet and streams fall straight off the cliffs into the ocean. The approach is spectacular.' },
    { n: 'Chatham Bay carvings',
      d: 'Rock inscriptions left by visiting crews going back to the eighteenth century. Landing is tightly controlled.' }
  ],
  when: 'June to November brings the biggest hammerhead aggregations along with rougher seas. December to May is calmer with better visibility.',
  stay: 'Trips are typically eight to ten days including the crossings. There is no other way to do it.',
  move: 'Liveaboard from Puntarenas only. Expensive, booked many months ahead, and not suitable for anyone prone to seasickness.',
  eat: 'All meals aboard the boat.'
},

'SPA-sierpe': {
  intro: [
    'Sierpe is a small river town that exists for a single practical reason: it is where you get the boat to Drake Bay. Everything else about it is incidental.',
    'What makes it worth more than a car park, though, is the Térraba-Sierpe wetland that begins right below it — the largest mangrove system in Central America, over twenty-two thousand hectares, and a Ramsar site. The boat ride down to the sea goes through the middle of it, which turns a transfer into one of the better wildlife trips in the country.',
    'The river mouth at the end is the part people remember. The bar there breaks hard and crossing it in a small boat is genuinely exciting.'
  ],
  see: [
    { n: 'The mangrove transfer to Drake Bay',
      d: 'Ninety minutes through the mangroves and out over the bar. Watch for caiman, crocodiles, herons, ibis and the mangrove hummingbird, which is endemic to this coast.' },
    { n: 'A dedicated mangrove tour',
      d: 'Boats run specifically for wildlife rather than transfer, going further into the quieter channels. Worth doing if you are staying overnight.' },
    { n: 'The Diquís spheres nearby',
      d: 'The Finca 6 archaeological site is twenty minutes away, and is where the stone spheres can actually be seen in their original positions.' },
    { n: 'Night on the river',
      d: 'Caiman eyeshine, bats and a great deal of noise. Several lodges run short trips.' }
  ],
  when: 'Year round. The bar crossing is calmest in the morning, which is when transfers are scheduled.',
  stay: 'A night, usually before an early boat.',
  move: 'An hour from Palmar Norte, which has the nearest airstrip and bus connections. Secure parking is available in the village for people leaving cars.',
  eat: 'A few riverside restaurants. Fish, and decent.'
},

'SPA-piedras-blancas': {
  intro: [
    'Piedras Blancas protects lowland rainforest on the mainland side of the Golfo Dulce, directly across the water from Corcovado and ecologically continuous with it. It was separated administratively but the forest is the same forest.',
    'A large part of it was bought back from logging interests in the 1990s with money raised in Austria — the Regenwald der Österreicher, the rainforest of the Austrians — which is still the local name for it. A biological station there remains active.',
    'For a visitor it offers most of what Corcovado does, with a fraction of the permits, the cost and the people.'
  ],
  see: [
    { n: 'Trails from the Esquinas station',
      d: 'Primary forest with all four monkeys, peccaries, and an exceptional bird list. The station is a lodge as well as a research base.' },
    { n: 'Birding',
      d: 'Over three hundred species recorded. Mangrove hummingbirds, trogons, and the yellow-billed cotinga, which is globally threatened.' },
    { n: 'The Golfo Dulce shoreline',
      d: 'Quiet beaches on the gulf side, reachable by boat from Golfito, with calm swimming water.' },
    { n: 'Night walks',
      d: 'Frogs, snakes and kinkajous. The wet forest here is as productive after dark as anywhere on the Osa.' }
  ],
  when: 'December to April is drier. This is one of the wettest parts of the country and rain should be expected in any month.',
  stay: 'Two nights at the station.',
  move: 'Access from the Golfito side, or by boat across the gulf. Roads in are dirt and need clearance.',
  eat: 'Meals at the lodge. Nothing else nearby.'
},

'SPA-golfito': {
  intro: [
    'Golfito was built by United Fruit in 1938 as a banana port, and for nearly fifty years it was one of the most important places in the country. The company left in 1985 after a long labour dispute, and the town collapsed almost overnight.',
    'What remains is unusual: streets of wooden American company housing on stilts, a deep still inlet in front, and steep rainforest rising immediately behind. The government later set up a duty-free zone to give the town an economy, and Costa Ricans still travel here to shop.',
    'It is not conventionally pretty and it is extremely humid, but the combination of industrial archaeology and rainforest pressing in on the edges of town is genuinely striking.'
  ],
  see: [
    { n: 'The old American zone',
      d: 'Wooden houses on stilts with deep verandas, laid out on a grid along the water. Decaying and still occupied.' },
    { n: 'The Golfito Wildlife Refuge',
      d: 'Forest directly behind the town, reached on a road that climbs steeply. Birds, monkeys and a view over the gulf.' },
    { n: 'Boat trips on the Golfo Dulce',
      d: 'A tropical fjord — unusually deep and still — with resident bottlenose dolphins and seasonal humpbacks.' },
    { n: 'Casa Orquídeas', t: 'by boat',
      d: 'A private botanical garden on the far shore, reachable only by water, with an exceptional collection built up over decades.' }
  ],
  when: 'Drier from December to April. It is humid at all times.',
  stay: 'A night, usually in transit to Pavones, Puerto Jiménez or Piedras Blancas.',
  move: 'Flights from San José, or a long drive. A ferry crosses to Puerto Jiménez.',
  eat: 'Simple sodas and fish. The waterfront has a couple of decent places.'
},

'SPA-diquis-spheres': {
  intro: [
    'Somewhere between about 300 and 1500 AD, the Diquís people carved hundreds of stone spheres — granodiorite, up to two and a half metres across and sixteen tonnes, and accurate to within a couple of centimetres of true sphericity. Then they moved them, sometimes many kilometres, and arranged them in deliberate alignments outside their chiefs’ houses.',
    'Nobody knows what they meant. The settlements were abandoned before the Spanish arrived and no oral tradition survived to explain them. Most of the spheres were moved in the twentieth century — banana companies bulldozed sites, and people took them for garden ornaments — so the ones still in their original positions are precious, and four of those sites were made a UNESCO World Heritage listing in 2014.',
    'Finca 6, near Palmar Sur, is the one set up for visitors.'
  ],
  see: [
    { n: 'Finca 6', t: 'the main site',
      d: 'Spheres in their original alignments, a small museum explaining the archaeology and the destruction, and the excavated remains of settlement mounds. Modest, well done and quiet.' },
    { n: 'The museum displays',
      d: 'The best account anywhere of how the spheres were probably made — pecking and grinding with harder stone, then polishing — and of how much was lost before anyone thought to protect them.' },
    { n: 'Spheres elsewhere in the region',
      d: 'Once you know to look, they turn up in town squares, outside schools and in front gardens all over the south, almost all of them moved from where they meant something.' }
  ],
  when: 'Year round. Mornings are cooler; there is little shade.',
  stay: 'Two hours.',
  move: 'Near Palmar Sur, just off the coastal highway and close to the airstrip. Any car.',
  eat: 'Nothing on site. Palmar Norte has sodas.'
},

'SPA-la-amistad': {
  intro: [
    'La Amistad is shared with Panama, covers over four hundred thousand hectares across the two countries, and is larger than every other Costa Rican national park put together. It protects the Talamanca range, which was never glaciated and never connected to the volcanic chain, and as a result holds an extraordinary concentration of species found nowhere else.',
    'It is also, by any practical measure, trackless. There are no roads through it, few marked trails, and the interior is genuinely wild — one of the few places in Central America where that word is justified.',
    'Visitors enter at the edges, through a handful of ranger stations, and almost nobody goes far.'
  ],
  see: [
    { n: 'The Altamira sector',
      d: 'The most developed entrance, on the Pacific side above Buenos Aires. A ranger station, camping, a lookout tower and the Valle del Silencio trail.' },
    { n: 'Valle del Silencio', t: 'two days, guided',
      d: 'A long walk in to a high valley of oak cloud forest and peat bog, with a basic shelter at the end. Permits and a guide are required and the weather is serious.' },
    { n: 'Birding on the edges',
      d: 'Resplendent quetzals, bare-necked umbrellabirds and a list of Talamanca endemics that draws specialists from a long way away.' },
    { n: 'The indigenous territories around it',
      d: 'The park abuts Bribri, Cabécar and Naso lands, and several community tourism projects offer guided access from that side.' }
  ],
  when: 'January to April is the only sensible window. It is one of the wettest regions in the country and trails become impassable.',
  stay: 'Two or three days minimum to see anything beyond the entrance.',
  move: 'Four-wheel drive to the stations, and a guide plus permits for anything beyond them. Arrange through SINAC well in advance.',
  eat: 'Nothing. Carry everything, including more than you expect to need.'
},

'SPA-ojochal': {
  intro: [
    'Ojochal is a village in the hills just inland of the coastal highway that filled up with French, Belgian and Québécois settlers from the early 1990s. The consequence is entirely out of proportion to its size: for a place of a few hundred people on a dirt road, it has the densest concentration of serious cooking in rural Costa Rica.',
    'There is nothing else to do here, and that is accepted by everyone involved. People stay on the coast and drive up for dinner.'
  ],
  see: [
    { n: 'Dinner',
      d: 'French, Indonesian, Mediterranean and modern Costa Rican, several of them genuinely very good. Most are small, open limited nights and close in the low season — book, and check they are open.' },
    { n: 'Playa Tortuga',
      d: 'The beach below the village, with a turtle conservation project and a river mouth. Quiet and not for swimming.' },
    { n: 'The waterfalls behind the village',
      d: 'Several small falls on the rivers inland, reached on short walks. Ask locally.' }
  ],
  when: 'High season, December to April, is when most restaurants are reliably open. Many close in September and October.',
  stay: 'An evening from Uvita or Dominical, or a few nights if you want quiet hills.',
  move: 'Off the coastal highway twenty minutes south of Uvita, then dirt roads up the hill. A car is essential.',
  eat: 'The entire point. Reserve ahead.'
},

'SPA-zancudo': {
  intro: [
    'Zancudo is a sandbar between the Golfo Dulce and a mangrove estuary, about fifteen kilometres long and in places a couple of hundred metres wide. There is one road, a scattering of cabinas, and very little else.',
    'The name means mosquito, which is honest. The compensation is a long flat beach on calm gulf water, hammocks everywhere, and a pace that is slow even by the standards of this coast.'
  ],
  see: [
    { n: 'The beach',
      d: 'Long, grey, usually empty, and calm because it faces into the gulf rather than the open ocean. Genuinely swimmable.' },
    { n: 'Sportfishing',
      d: 'A long-standing reputation for snook and roosterfish, with several small lodges built around it.' },
    { n: 'The mangrove behind',
      d: 'Boat and kayak trips into the estuary. Birds, caiman and monkeys.' },
    { n: 'Bioluminescence',
      d: 'On dark nights the water in the estuary sometimes lights up. Tours run when conditions suit.' }
  ],
  when: 'Dry season for the road. Fishing peaks vary by species; ask the lodges.',
  stay: 'Two or three nights of deliberate idleness.',
  move: 'By boat from Golfito, which is much the easier option, or a rough dirt road with river crossings.',
  eat: 'A handful of small restaurants and cabina kitchens. Limited and fine.'
},

'SPA-san-vito': {
  intro: [
    'San Vito was founded in the 1950s by Italian settlers under a government colonisation scheme, and the inheritance is still obvious — Italian surnames, a few restaurants doing genuine pasta, and an Italian cultural centre in a town otherwise entirely Costa Rican.',
    'The reason most visitors come, though, is three kilometres down the road. The Wilson Botanical Garden, now run by the Organization for Tropical Studies, holds one of the most important tropical plant collections in the world — around a thousand genera, including a palm collection and a heliconia collection of international significance.'
  ],
  see: [
    { n: 'Wilson Botanical Garden', t: 'half a day',
      d: 'Beautifully laid out across a hillside, with a forest reserve behind it. The bird list is long and the gardens themselves are a pleasure to walk even if plants are not your thing. Accommodation and meals available on site.' },
    { n: 'Birding in the garden',
      d: 'Over four hundred species recorded. Tanagers and hummingbirds in abundance, and the garden is one of the better places in the country for a casual birder to get close looks.' },
    { n: 'The town’s Italian inheritance',
      d: 'A couple of restaurants, the cultural centre, and a slightly surreal mix with highland Costa Rican life.' },
    { n: 'La Amistad access',
      d: 'San Vito is one of the gateways to the southern end of the park.' }
  ],
  when: 'Drier from December to April. It is cool here — around twelve hundred metres — which is a relief after the coast.',
  stay: 'Two nights, one of them ideally at the garden itself.',
  move: 'A long drive from the coast up a winding road, or a flight to Coto 47 and a transfer.',
  eat: 'Italian, unexpectedly and genuinely, plus ordinary good sodas.'
},

/* ===================== TALAMANCA HIGHLANDS ===================== */
'TAL-chirripo': {
  intro: [
    'Cerro Chirripó is the highest point in Costa Rica at 3,820 metres, and the climb to it is the most serious thing an ordinary visitor can undertake in this country. It is about twenty kilometres from the trailhead to the summit with roughly two and a half thousand metres of ascent, and it is done over two days with a night at a mountain refuge near the top.',
    'The route passes through an unusual sequence of worlds. You start in farmland, climb through montane oak cloud forest draped in moss, and emerge above the treeline into páramo — open, boggy, wind-scoured tussock grassland that exists nowhere else in Central America at this scale. The upper slopes carry glacial lakes and moraines from the last ice age, the only glacial landscape in the country.',
    'From the summit on a clear dawn you can see both the Pacific and the Caribbean. It is clear on perhaps a third of mornings, which is part of why people come back.'
  ],
  see: [
    { n: 'The climb to Base Crestones', t: 'day one, six to ten hours',
      d: 'Fourteen and a half kilometres and most of the ascent, unrelenting but never technical. Carry water and start before dawn — most people leave the village between two and four in the morning.' },
    { n: 'The summit at sunrise', t: 'day two',
      d: 'Another five kilometres and five hundred metres from the refuge, usually started around three in the morning in the dark and the cold. Below freezing is normal up there.' },
    { n: 'Los Crestones',
      d: 'The rock towers below the refuge, the most photographed feature on the mountain and a short walk from the hut.' },
    { n: 'The glacial lakes',
      d: 'Several on the plateau, in cirques scoured out during the last ice age. Side trips from the refuge for anyone with energy left.' },
    { n: 'The páramo itself',
      d: 'Worth stopping to look at properly. A strange high-altitude tropical ecosystem of dwarf bamboo and tussock, with its own endemic species.' }
  ],
  when: 'The dry season, January to April, is the only sensible window — the park closes for part of the wet season and the trail becomes dangerous. Permits are allocated by lottery and online booking well in advance; this is the single most important planning step.',
  stay: 'Three nights in San Gerardo de Rivas: one before, one at the refuge, one to recover.',
  move: 'Reserve the refuge bunk and park permit through SINAC months ahead. Porters can be hired in the village to carry gear up, which many people do. Bring proper cold-weather clothing — people underestimate this badly and it gets near freezing.',
  eat: 'The refuge has cooking facilities but you carry your own food. The village has sodas.'
},

'TAL-san-gerardo-de-dota': {
  intro: [
    'San Gerardo de Dota is a narrow valley running down from the Pan-American Highway at around two thousand two hundred metres, filled with oak cloud forest and a trout river. It is cold by Costa Rican standards, quiet, and almost entirely given over to a handful of family-run lodges.',
    'It is also the most reliable place in Central America to see a resplendent quetzal. The valley is full of wild avocado — aguacatillo — which is what quetzals eat, and during the nesting season from February to May the birds are both numerous and predictable. Many lodges can point you at an active nest from the breakfast table.',
    'The Savegre family, who settled the valley in the 1950s to farm, now run much of the conservation here, and the shift from clearing forest to protecting it within one family’s lifetime is the valley’s real story.'
  ],
  see: [
    { n: 'Quetzals', t: 'February to May especially',
      d: 'Go out at dawn with a local guide who knows the fruiting trees and the current nests. Males in full breeding plumage trail tail streamers two-thirds of a metre long. Sightings are close to reliable in season and still good outside it.' },
    { n: 'The Savegre river trail',
      d: 'Down the valley through oak forest to a waterfall. Cool, mossy, quiet walking with a long list of highland birds along the way.' },
    { n: 'Hummingbird feeders',
      d: 'Every lodge has them, and the highland species — fiery-throated, magnificent, volcano hummingbird — are both spectacular and extremely close.' },
    { n: 'Trout',
      d: 'The river was stocked decades ago and trout is on every menu in the valley. Fishing can be arranged.' },
    { n: 'Páramo at the top of the valley',
      d: 'Drive back up to the highway and on towards Cerro de la Muerte for high open country and its own endemic birds.' }
  ],
  when: 'February to May for nesting quetzals. It is cold and often wet year round — bring warm clothes, which almost nobody does.',
  stay: 'Two nights. One is enough to see a quetzal and not enough to enjoy the valley.',
  move: 'Nine kilometres down an extremely steep paved road from the Pan-American at kilometre 80. Low gear on the way down and a car with some power for the way up.',
  eat: 'Lodge dining, trout, and good highland coffee. There are no restaurants independent of the lodges.'
},

'TAL-san-gerardo-de-rivas': {
  intro: [
    'San Gerardo de Rivas is the village at the Chirripó trailhead, at about 1,350 metres in the valley of the Chirripó Pacífico river. Essentially everybody staying here is either about to climb the mountain or has just come down it, and the village is organised around that.',
    'It is a pleasant place in its own right — cool, green, with a river running through it and the ridge rising straight up behind.'
  ],
  see: [
    { n: 'The ranger station',
      d: 'Where permits are confirmed, usually the afternoon before a climb. Confirm in person even if you booked online.' },
    { n: 'Cloudbridge Nature Reserve',
      d: 'A private reforestation project just above the village with good trails, waterfalls and birds. Free to enter, donations requested, and an excellent acclimatisation walk.' },
    { n: 'The hot springs',
      d: 'Small natural thermal pools a walk up the valley. Modest, cheap and very welcome on the day after the descent.' },
    { n: 'Birding around the village',
      d: 'Quetzals occur here too, along with a long list of middle-elevation species, and nobody has to climb anything to see them.' }
  ],
  when: 'January to April for the mountain. The village itself is fine year round.',
  stay: 'Two nights around a Chirripó climb; one if you are only acclimatising.',
  move: 'About an hour and a half from San Isidro de El General on a road that is paved then steep and rough. Buses run twice daily.',
  eat: 'Several sodas doing exactly what hungry walkers want. Large portions, early breakfasts.'
},

'TAL-cerro-de-la-muerte': {
  intro: [
    'The Pan-American Highway crosses the Talamanca range at about 3,450 metres, and the pass is called Cerro de la Muerte — the mountain of death. The name is literal: before the road existed, people walked the route between San José and the southern valleys, and some of them died of exposure doing it.',
    'It is still the coldest place in Costa Rica that a car can reach, with freezing fog, driving rain and temperatures that can drop near zero. The vegetation at the top is páramo, and the stunted twisted trees just below the treeline are unlike anything else in the country.',
    'It is also, for the same reasons, one of the darkest and clearest places in Costa Rica on a good night.'
  ],
  see: [
    { n: 'The high páramo',
      d: 'Pull off at one of the viewpoints near the summit and walk a short distance. Dwarf bamboo, tussock grass, and on a clear day a view off both sides of the continental divide.' },
    { n: 'Highland endemics',
      d: 'Volcano junco, timberline wren and sooty thrush occur essentially only up here. Birders come specifically.' },
    { n: 'The night sky',
      d: 'High, dry on the right night, and far from any city. One of the best accessible dark-sky spots in the country.' },
    { n: 'The towers',
      d: 'A side track climbs to the communications towers at the very top, which is the highest point reachable by vehicle in Costa Rica.' }
  ],
  when: 'Clearest early in the morning, in the dry season. Cloud and rain are the default by midday in any month.',
  stay: 'An hour or two in passing, or a night at one of the lodges just below for the dawn.',
  move: 'On the Pan-American between Cartago and San Isidro. The road is paved and frequently fog-bound — drive it in daylight if you have the choice.',
  eat: 'Roadside restaurants at the pass do hot soup and coffee, and they are exactly what the altitude calls for.'
},

'TAL-los-quetzales': {
  intro: [
    'Los Quetzales was created in 2005, relatively recently, around the headwaters of the Savegre river. Its purpose is specific: to protect the oak cloud forest that resplendent quetzals depend on, and in particular the aguacatillo trees whose fruiting the birds time their nesting to.',
    'The park spans a considerable altitude range, from around two thousand metres up into páramo, which means three distinct forest types within its boundary.'
  ],
  see: [
    { n: 'Quetzals in the oak forest',
      d: 'Most reliable from February to May. The guides in the Savegre valley below work here as well as on private land.' },
    { n: 'The trails from the highway',
      d: 'Several marked routes start near the Pan-American, including a long one down towards the Savegre valley. Steep, cold, mossy and often wet.' },
    { n: 'The altitudinal gradient',
      d: 'Walking from the top of the park downward takes you through páramo, stunted forest and tall oak cloud forest in a few hours.' },
    { n: 'Highland hummingbirds',
      d: 'Fiery-throated and volcano hummingbirds are common and confiding.' }
  ],
  when: 'February to May for quetzals and for the least rain. Cold and wet at all times — dress for it.',
  stay: 'A day, usually from San Gerardo de Dota.',
  move: 'The entrance is near kilometre 76 of the Pan-American. Facilities are minimal and a guide is strongly advised.',
  eat: 'Nothing inside. Eat at the roadside restaurants on the highway.'
},

'TAL-san-isidro': {
  intro: [
    'San Isidro de El General is the market town of the General valley and the commercial centre of the whole southern region. Almost nobody comes here as a destination; almost everybody passes through, because it is the junction for Chirripó, Dominical and the Osa.',
    'It is a real working Costa Rican town, hot and busy, with a large central market and very little in the way of tourism.'
  ],
  see: [
    { n: 'The central market',
      d: 'Produce from the valley, prepared food, and the ordinary commerce of the south. Cheap and good.' },
    { n: 'Changing buses',
      d: 'The practical reason most people stop. Connections to San Gerardo de Rivas, Dominical, Uvita and the Osa all leave from here.' },
    { n: 'Las Quebradas Biological Centre',
      d: 'A community-run reserve just outside town protecting the municipal watershed, with trails and a visitor centre. Quiet and worth an hour or two.' }
  ],
  when: 'Any time. It is noticeably hotter than the mountains above it.',
  stay: 'A night at most, usually in transit.',
  move: 'On the Pan-American, three hours south of San José over Cerro de la Muerte. A major regional bus hub.',
  eat: 'Market sodas, cheap and plentiful. Nothing aimed at visitors, which is part of the appeal.'
},

/* ===================== CARIBBEAN COAST ===================== */
'CAR-tortuguero': {
  intro: [
    'No road reaches Tortuguero. The village sits on a strip of land between the Caribbean and a system of freshwater canals, and you arrive by boat or by small plane — which is the first thing that makes it feel different from anywhere else in the country.',
    'The canals are the second. They were cut and linked in the 1960s and 70s to move timber and bananas, and they now function as a highway and as the best wildlife viewing in Costa Rica from a sitting position. The forest comes right to the water on both sides.',
    'The third thing is the turtles. Green turtles have nested on this beach for as long as anyone has recorded, and the research station here — founded by Archie Carr in 1959 — ran the study that effectively created modern sea turtle conservation. In peak season thousands of females come ashore, and the tagging programme is the longest-running of its kind anywhere.'
  ],
  see: [
    { n: 'A canal trip at dawn', t: 'the main event',
      d: 'Go early and insist on a paddle or electric boat rather than an outboard — the quiet doubles what you see. Caiman, three monkey species, sloths, river otters, basilisks running across the water and an enormous bird list.' },
    { n: 'Green turtle nesting', t: 'July to October',
      d: 'Guided night tours only, in small groups, no torches and no cameras. Numbers on the beach at a time are limited. It is one of the great wildlife spectacles and it is tightly and correctly controlled.' },
    { n: 'The Sea Turtle Conservancy visitor centre',
      d: 'Small, excellent, and the clearest explanation anywhere of how the science and the protection actually work. The money goes back into the research.' },
    { n: 'Cerro Tortuguero',
      d: 'A hill of about a hundred and twenty metres north of the village — the only high ground for a long way — with a view over the whole canal system and the coast.' },
    { n: 'The village itself',
      d: 'Car-free, strung along a sand path, Afro-Caribbean in character. Walkable end to end in fifteen minutes.' }
  ],
  when: 'Green turtles July to October, leatherbacks March to May. It rains here all year; there is no dry season to wait for. September and October are relatively drier.',
  stay: 'Two nights. One gets you a canal trip and a turtle tour and nothing else.',
  move: 'Bus or shuttle to La Pavona or Moín, then a boat. Or fly from San José. Most people buy a package including transfers, which here is genuinely simpler than doing it piecemeal.',
  eat: 'Caribbean food in the village — rice and beans in coconut milk, whole fried fish, patties. Cheaper and better than the lodge buffets across the canal.'
},

'CAR-puerto-viejo': {
  intro: [
    'Puerto Viejo de Talamanca is the most culturally distinct town in Costa Rica. The Caribbean coast was settled largely by Afro-Caribbean people from Jamaica and the islands who came to build the railway and work the banana plantations in the nineteenth century, and the result here is a town that speaks Spanish, English and Mekatelyu creole, cooks in coconut milk, and plays calypso.',
    'Do not confuse it with Puerto Viejo de Sarapiquí in the northern lowlands. People book the wrong one regularly and discover the error five hours away.',
    'The surf is the other reason people come. Salsa Brava, just off the town, is the heaviest wave in Costa Rica — a short, hollow, extremely shallow reef break that takes boards apart and is strictly for experts. Everyone else surfs the beach breaks down the coast.'
  ],
  see: [
    { n: 'Salsa Brava', t: 'December to March',
      d: 'Watch it from the shore unless you are genuinely expert. It breaks over shallow coral, there is no channel to speak of, and it is a serious wave.' },
    { n: 'Cycling the coast road to Manzanillo',
      d: 'Thirteen kilometres of flat road past Cocles, Chiquita, Punta Uva and on to Manzanillo, with beaches the whole way. Bicycles rent for very little and this is the best way to spend a day here.' },
    { n: 'Cahuita National Park', t: 'twenty minutes north',
      d: 'Reef, white sand and a shoreline trail. The best easy wildlife walk on this coast.' },
    { n: 'The Jaguar Rescue Centre',
      d: 'A rehabilitation centre for injured and orphaned wildlife — sloths, monkeys, snakes and birds. Genuinely a rescue operation rather than a zoo, and the tour funds it.' },
    { n: 'Nightlife, which is unlike anywhere else here',
      d: 'Reggae and calypso rather than reggaeton, and a scene that runs late. Puerto Viejo has a reputation for this and it is deserved.' }
  ],
  when: 'The Caribbean runs its own calendar: September and October are the driest and sunniest months here, which is the opposite of the Pacific. February and March are a second dry window. Surf is best December to March.',
  stay: 'Four nights. It is a long way from everything else and the coast rewards slowing down.',
  move: 'Four to five hours from San José by direct bus. Within the area, a bicycle is the right answer.',
  eat: 'The best regional food in the country. Rice and beans cooked in coconut milk, rondón stew, jerk chicken, patties and Caribbean-spiced fish. Completely different from the Central Valley.'
},

'CAR-cahuita': {
  intro: [
    'Cahuita is a small Afro-Caribbean village next to a national park that protects the best surviving coral reef in Costa Rica. The reef has had a hard century — sediment from banana plantations, the 1991 earthquake that lifted the whole coast by more than a metre, and warming water — but around six hundred hectares of it survive.',
    'The park has an arrangement found nowhere else in the system. The Kelly Creek entrance at the village end is still run on a voluntary donation rather than a fixed fee, a holdover from a community protest in the 1990s when local people blockaded the park over the imposition of charges and won.',
    'The village is slower and quieter than Puerto Viejo down the road, and for many people that makes it the better base.'
  ],
  see: [
    { n: 'The shoreline trail', t: 'about seven kilometres one way',
      d: 'Flat, easy and right beside the sea the whole way, from Kelly Creek to Puerto Vargas. Howler monkeys, capuchins, sloths, raccoons and a river crossing that is thigh-deep at high tide. The best casual wildlife walk on the Caribbean.' },
    { n: 'Snorkelling the reef', t: 'by boat with a guide',
      d: 'Required to go with a licensed guide, which protects what is left. Best visibility from September to October and in February and March. Elkhorn coral, parrotfish, rays and occasional nurse sharks.' },
    { n: 'Playa Blanca',
      d: 'White sand right by the village entrance, calm and good for swimming.' },
    { n: 'Playa Negra',
      d: 'The black volcanic sand beach on the other side of the village. A different look entirely and usually deserted.' }
  ],
  when: 'September–October and February–March for sun and underwater visibility. It rains here in all months.',
  stay: 'Two or three nights, often combined with Puerto Viejo.',
  move: 'On the coastal road, four hours from San José by bus, twenty minutes north of Puerto Viejo. The village is tiny and walkable.',
  eat: 'Caribbean cooking at its best — coconut rice and beans, rondón, fresh fish. Several small family restaurants that have been going for decades.'
},

'CAR-punta-uva': {
  intro: [
    'Punta Uva is a forested headland between two coves about seven kilometres south of Puerto Viejo, and it is the prettiest beach on the Caribbean coast — calm turquoise water, pale sand, and rainforest growing right down to the back of it.',
    'There is no town. A couple of restaurants, some cabinas in the trees, and sloths in the almond trees at the top of the beach.'
  ],
  see: [
    { n: 'Swimming',
      d: 'The headland shelters both coves, making this one of the few genuinely calm swimming beaches on this coast.' },
    { n: 'The headland walk',
      d: 'A short path over the point between the two beaches, through forest, with good odds of sloths and monkeys.' },
    { n: 'Kayaking the Punta Uva river',
      d: 'A small river comes out at the north cove and you can paddle up it into the forest. Quiet and full of birds.' },
    { n: 'Snorkelling off the point',
      d: 'Reef around the headland, best when the water is calm in the drier windows.' }
  ],
  when: 'September–October and February–March are calmest and clearest.',
  stay: 'A day from Puerto Viejo, or several nights if you want quiet.',
  move: 'Seven kilometres south of Puerto Viejo on the paved coast road. Cycle it.',
  eat: 'Two or three beach restaurants, relaxed and good.'
},

'CAR-manzanillo': {
  intro: [
    'Manzanillo is the end of the road — the coastal road from Puerto Viejo simply stops here — and it sits inside the Gandoca-Manzanillo Wildlife Refuge, which protects an unusual combination of reef, beach, swamp forest and the only significant stand of holillo palm swamp on this coast.',
    'The village is a handful of houses and a very good beach restaurant. The refuge beyond it is the real draw.'
  ],
  see: [
    { n: 'The coastal trail towards Panama', t: 'about five kilometres',
      d: 'Through swamp forest and along the shore past a series of small coves. Monkeys, poison dart frogs and, with luck, sloths. The best easy hike on the Caribbean side.' },
    { n: 'Snorkelling at Manzanillo point',
      d: 'Reef close to shore, accessible from the beach when the sea is calm. Guides available in the village.' },
    { n: 'Dolphins offshore',
      d: 'Three species including the tucuxi, a small river-and-coast dolphin rare in Costa Rica. Local boatmen run trips.' },
    { n: 'Leatherback nesting at Gandoca', t: 'March to July',
      d: 'The southern end of the refuge has a nesting beach with a community conservation project that takes volunteers and visitors.' }
  ],
  when: 'September–October and February–March for sun. Turtles March to July.',
  stay: 'A day trip from Puerto Viejo, or a night for the quiet.',
  move: 'Thirteen kilometres south of Puerto Viejo, paved, with a bus a few times a day. Bicycle is the pleasant way.',
  eat: 'A famous beachfront restaurant doing Caribbean seafood, and little else. That is enough.'
},

'CAR-playa-cocles': {
  intro: [
    'Cocles is the main surf beach south of Puerto Viejo — a two-kilometre stretch of golden sand with a consistent beach break, and the only beach on this coast with a lifeguard service.',
    'That last detail matters. The rip currents here are strong and there have been drownings, and the lifeguard towers were put up in response. Swim between the flags.'
  ],
  see: [
    { n: 'Surfing',
      d: 'A proper beach break, best from December to March, and the place most people on this coast actually surf since Salsa Brava is out of reach for all but experts.' },
    { n: 'Swimming between the flags',
      d: 'Lifeguarded in season. The rips are real and the signage is not decorative.' },
    { n: 'The almond trees at the back of the beach',
      d: 'Sloths are often in them, and the beach has a reliable troop of howler monkeys passing through.' }
  ],
  when: 'Surf December to March. Sun in September–October and February–March.',
  stay: 'Base here instead of Puerto Viejo for a quieter version of the same coast, two kilometres away.',
  move: 'Two kilometres south of Puerto Viejo, cycleable in ten minutes.',
  eat: 'A string of small restaurants along the road behind the beach, several of them very good.'
},

'CAR-puerto-limon': {
  intro: [
    'Limón is the country’s main Caribbean port and the centre of Afro-Caribbean Costa Rica. It grew from the railway that Minor Keith built to San José in the 1870s — a project that killed thousands of workers and was paid for partly by giving Keith the land that became United Fruit — and from the banana trade that followed.',
    'It has a reputation among Costa Ricans for being rough, which is overstated but not baseless, and most tourists skip it. That is a shame in one specific respect: the October carnival, Día de la Raza, is the largest and most genuinely Caribbean celebration in the country, with parades, comparsas and calypso for a week.',
    'The rest of the year it is a working port with a decaying but handsome old centre.'
  ],
  see: [
    { n: 'Parque Vargas',
      d: 'The seafront park, with large trees full of sloths and a sea wall to walk along. The centre of the city’s public life.' },
    { n: 'Carnival', t: 'October',
      d: 'A week of parades and music. If you are in the country then it is worth rearranging plans for.' },
    { n: 'The central market',
      d: 'Caribbean produce and prepared food, and the best place to eat patties and coconut bread.' },
    { n: 'Playa Bonita and Portete',
      d: 'Beaches just north of the city, popular with locals at weekends.' },
    { n: 'Veragua Rainforest, inland',
      d: 'An hour into the hills, a research station open to visitors and the best wildlife option near the city.' }
  ],
  when: 'October for carnival. September and October are the driest months here.',
  stay: 'A day, or longer during carnival. Most visitors pass through to the southern beaches.',
  move: 'Three hours from San José by bus. Cruise ships dock here, which transforms the centre on arrival days.',
  eat: 'The best patties in the country, rice and beans in coconut milk, and rondón if you can find someone making it.'
},

'CAR-bribri': {
  intro: [
    'Bribri is a small town in the hills behind the coast, and it is the gateway to the Talamanca indigenous territories — the homeland of the Bribri and Cabécar peoples, who together form the largest indigenous population in Costa Rica and who were never fully conquered either by the Spanish or by the banana companies.',
    'The territories are not a tourist attraction and should not be approached as one. What exists instead is a set of community-run projects, controlled by the communities themselves, where visitors are taken in by Bribri guides on Bribri terms.',
    'The Bribri are matrilineal — clan membership and land pass through the mother — and only women may prepare the ceremonial cacao drink. Cacao is central to their cosmology rather than being a crop that happens to grow there.'
  ],
  see: [
    { n: 'A community cacao tour', t: 'booked through the community',
      d: 'From pod to drink, explained in the context of Bribri belief rather than as agritourism. Usually run by women’s associations, and the money stays in the territory.' },
    { n: 'The Yorkín community', t: 'by dugout canoe',
      d: 'Reached by motorised dugout up the Yorkín river on the Panamanian border. Overnight stays with families, guided forest walks, and one of the better-regarded community tourism projects in the country.' },
    { n: 'Medicinal plant walks',
      d: 'Led by an awá, a traditional healer, where one is willing. Not always available and not to be pressed for.' },
    { n: 'Waterfalls in the territory',
      d: 'Several, reached on walks with local guides. Access is through the community, not independently.' }
  ],
  when: 'The drier windows, September–October and February–March, make the river trips and walks easier.',
  stay: 'A day trip from Puerto Viejo, or one to two nights at Yorkín, which is the more worthwhile version.',
  move: 'Book through a community association rather than a general tour operator, and do not enter the territories unaccompanied. Bribri town is an hour from Puerto Viejo.',
  eat: 'Meals with the host families — river fish, plantain, rice and beans, and cacao.'
},

'CAR-barra-del-colorado': {
  intro: [
    'Barra del Colorado is the wildlife refuge north of Tortuguero, running up to the Nicaraguan border at the mouth of the San Juan river. It is larger than Tortuguero, wilder, and has a fraction of the visitors — in part because there is almost no infrastructure and in part because getting there is harder.',
    'It built its reputation on fishing. The tarpon and snook runs here were internationally famous from the 1960s, and the lodges that remain are mostly fishing lodges.'
  ],
  see: [
    { n: 'Tarpon and snook fishing',
      d: 'The reason most people come. Tarpon are catch and release; the runs are seasonal and the guides know them.' },
    { n: 'The canals and lagoons',
      d: 'The same system as Tortuguero but emptier. Manatees occur here, though sightings are rare.' },
    { n: 'Birding',
      d: 'Extensive wetland with a long list. Agami heron and green ibis among the sought-after species.' },
    { n: 'The San Juan river mouth',
      d: 'The border with Nicaragua, and a long-disputed one. Boats run along it; carry your passport.' }
  ],
  when: 'Tarpon peak roughly January to May and again in September. It rains year round.',
  stay: 'Two or three nights at a lodge, which is how nearly everyone does it.',
  move: 'Boat from Tortuguero or from Puerto Lindo, or a small plane to the airstrip. There is no road.',
  eat: 'Lodge meals, usually full board, since there is nothing else.'
},

'CAR-veragua': {
  intro: [
    'Veragua Rainforest is a private research station and visitor centre in the hills behind Limón, built around a serious scientific operation — researchers here have described species new to science from the surrounding forest.',
    'For a visitor it functions as a way to make rainforest legible before walking into it. The frog, snake, butterfly and insect exhibits are live, well presented and explained by people who actually work on them, and the forest trails beyond are real.'
  ],
  see: [
    { n: 'The frog and reptile habitats',
      d: 'Live exhibits of species you would spend a week failing to find outside. The poison dart frog collection in particular.' },
    { n: 'The aerial tram',
      d: 'A short gondola down into the valley, saving a steep descent and giving a canopy view on the way.' },
    { n: 'The waterfall trail',
      d: 'From the bottom of the tram to a fall in the forest. Properly wet and properly green.' },
    { n: 'The night tour',
      d: 'Available with an overnight stay. The amphibian activity here after dark is exceptional.' }
  ],
  when: 'Year round. This is one of the wettest parts of the country.',
  stay: 'A day, or overnight for the night walk.',
  move: 'About an hour from Limón on a road that turns to dirt. Transfers can be arranged, and cruise passengers are brought here in numbers on docking days — avoid those if you can.',
  eat: 'A restaurant on site.'
},

'CAR-barbilla': {
  intro: [
    'Barbilla protects very wet lowland and foothill rainforest on the eastern slope of the Talamanca range, bordering Cabécar indigenous territory. It has almost no visitor infrastructure, few marked trails, and very few visitors indeed.',
    'It is known among biologists for a healthy jaguar population, which the park does not advertise and which you will not see. What it offers instead is genuinely unmanaged forest within a few hours of San José.'
  ],
  see: [
    { n: 'The forest trails',
      d: 'A small number of rough routes from the ranger station. Dense, wet, and full of sound.' },
    { n: 'The Dantas river',
      d: 'Clear water running through the park, with pools and a lot of amphibian life along it.' },
    { n: 'Birding',
      d: 'Lowland Caribbean species including several that are hard to find elsewhere. A guide is close to essential.' },
    { n: 'Cabécar territory, alongside',
      d: 'The park borders Cabécar land. Community-guided visits can sometimes be arranged and should be approached through the communities.' }
  ],
  when: 'There is no dry season here. February and March are marginally less wet.',
  stay: 'A day, or overnight camping at the station with prior arrangement.',
  move: 'Off the Siquirres–Turrialba road, the last section on dirt needing four-wheel drive. Contact SINAC before going; the station is not always staffed.',
  eat: 'Nothing. Bring everything.'
},

/* ===================== CENTRAL VALLEY ===================== */
'CVL-san-jose': {
  intro: [
    'San José is not a beautiful city and almost nobody pretends otherwise. It was a minor settlement until the late eighteenth century, grew rich on coffee in the nineteenth, and did most of its building in the twentieth with concrete and in a hurry. Earthquakes removed much of what came before.',
    'What it has is substance rather than charm. The Pre-Columbian Gold Museum and the Jade Museum together hold the best collection of indigenous material in Central America, the National Theatre is a genuine piece of nineteenth-century coffee-money extravagance, and the eating is the most varied in the country.',
    'Most itineraries treat it as a night either side of a flight, and that is reasonable. But a single focused day here will teach you more about Costa Rica than a week on a beach.'
  ],
  see: [
    { n: 'The Pre-Columbian Gold Museum', t: 'under the Plaza de la Cultura',
      d: 'Around sixteen hundred gold objects, displayed with a clear account of the societies that made them. It is underground, cool, and the single best museum in the country.' },
    { n: 'The Jade Museum',
      d: 'The largest collection of pre-Columbian jade in the Americas, in a modern building on the Plaza de la Democracia. Better laid out than the gold museum and less visited.' },
    { n: 'The National Theatre', t: 'tour or a performance',
      d: 'Built in the 1890s with a tax the coffee barons levied on themselves after a soprano declined to visit for want of a venue. Marble, gilt and a ceiling painting that once appeared on the five-colón note.' },
    { n: 'Barrio Escalante', t: 'for dinner',
      d: 'The restaurant district, concentrated along Calle 33. The best modern Costa Rican cooking is here, along with craft beer and a lot of it.' },
    { n: 'Mercado Central',
      d: 'Open since 1880. Produce, tin shops, and a dozen sodas doing casados and olla de carne at counters. Go at lunchtime.' },
    { n: 'Barrio Amón',
      d: 'The coffee-barons’ quarter north of the centre, with surviving wooden and art-deco mansions, some now hotels. The one genuinely handsome neighbourhood.' }
  ],
  when: 'The valley sits at about eleven hundred metres and the climate is mild year round — this is the eternal spring people mean. Afternoon rain from May to November.',
  stay: 'A night either side of a flight, or two days if the museums interest you.',
  move: 'Walk the centre; it is compact. Taxis and Uber for anything further. Avoid driving in the city itself — the grid is one-way and badly signposted.',
  eat: 'The widest range in the country. Barrio Escalante for dinner, Mercado Central for lunch, and some genuinely excellent coffee bars.'
},

'CVL-poas-volcano': {
  intro: [
    'Poás has one of the most accessible active craters in the world. The car park is a fifteen-minute walk from a viewing platform on the rim, and below you is a crater a kilometre and a half across with a hot acid lake at the bottom — among the most acidic bodies of water anywhere, and the source of the steam plume.',
    'It is also genuinely dangerous and the park management treats it that way. A major eruption in 2017 closed the park for well over a year, destroyed the visitor infrastructure and sent ash across the valley. It reopened with strict controls: timed tickets, hard hats, a capped number of people and a strictly limited time on the rim.',
    'The other constraint is cloud. The crater is usually clear early and socked in by mid-morning, and it is entirely possible to drive up and see nothing but white.'
  ],
  see: [
    { n: 'The main crater', t: 'go in the first slot',
      d: 'The viewing platform is a short paved walk from the car park. You get a limited window on the rim by design. Arrive for the earliest entry — cloud usually closes in between nine and ten.' },
    { n: 'Laguna Botos',
      d: 'A cold, still, green crater lake in an extinct cone, reached on a short trail through stunted cloud forest. Usually much quieter than the main crater.' },
    { n: 'The dwarf cloud forest',
      d: 'The vegetation near the rim is stunted and twisted by acid rain and wind, quite unlike forest lower down.' },
    { n: 'The strawberry stalls on the road up',
      d: 'The slopes are farmed for strawberries and dairy. The roadside stands and the local cheese are part of the trip.' }
  ],
  when: 'January to April for the best odds of a clear crater. Any month, go at opening. The park closes at short notice on volcanic activity — check before driving up.',
  stay: 'Half a day from San José or Alajuela.',
  move: 'Tickets must be bought online in advance and sell out. About an hour and a half from San José on a good paved road. It is cold at the top — around ten degrees — and people arrive in beach clothes.',
  eat: 'A café at the visitor centre. Better options on the road up, including the dairy and strawberry stands.'
},

'CVL-irazu-volcano': {
  intro: [
    'Irazú is the highest volcano in Costa Rica at 3,432 metres, and you can drive to the top. The summit area is bare grey-and-ochre ash and rock, almost without vegetation, and NASA used it in the 1960s as a terrain analogue for lunar landing practice.',
    'Its eruption from 1963 to 1965 is still remembered. It began on the day President Kennedy arrived in Costa Rica and dumped ash on the Central Valley for two years, ruining farmland and roofs across the region.',
    'On a genuinely clear morning — rare, and usually early — you can see both the Pacific and the Caribbean from the summit.'
  ],
  see: [
    { n: 'The Diego de la Haya crater',
      d: 'The main viewpoint looks down on a crater holding a lake whose colour shifts between green, yellow and rust depending on mineral content and rainfall. Sometimes it dries out entirely.' },
    { n: 'The lunar landscape',
      d: 'The ash plain around the craters is genuinely strange — no vegetation, grey underfoot, and on a cloudy day disorienting.' },
    { n: 'Both oceans, if you are lucky',
      d: 'Requires an exceptionally clear morning. Get there for opening and accept that the odds are against you.' },
    { n: 'Combining with Cartago and Orosi',
      d: 'The standard day: Irazú in the morning while it is clear, the basilica in Cartago, then the Orosi valley in the afternoon.' }
  ],
  when: 'Dry season, and as early as possible. By ten the cloud is usually up. It is cold at the summit — often near five degrees with wind.',
  stay: 'Half a day.',
  move: 'An hour and a half from San José via Cartago, paved all the way to the summit car park. Tickets online in advance.',
  eat: 'A café near the car park. Cartago has better.'
},

'CVL-turrialba-volcano': {
  intro: [
    'Turrialba is the restless one. After decades of quiet it reactivated in 2010 and has been erupting intermittently ever since, closing airports in San José on several occasions and dusting the Central Valley with ash.',
    'That makes it the least reliable park in the country to plan around. It opens and closes according to volcanic activity, access is sometimes limited to the lower flanks, and summit access has been off for long stretches.',
    'When it is open it is spectacular, and because of the uncertainty there is almost nobody there.'
  ],
  see: [
    { n: 'The craters, when accessible',
      d: 'Three craters, with the central one the active vent. Access depends entirely on current activity — check with SINAC rather than turning up.' },
    { n: 'The view across to Irazú',
      d: 'The two volcanoes face each other across a saddle, and the perspective from Turrialba is the better of the two.' },
    { n: 'The forest on the lower flanks',
      d: 'Montane forest with a good bird list, often open even when the summit is not.' },
    { n: 'Watching it from a distance',
      d: 'From Turrialba town or the surrounding ridges you can often see the steam plume, which is the safest view and sometimes the only one available.' }
  ],
  when: 'Entirely dependent on volcanic activity. Confirm the park is open before setting out; this changes month to month.',
  stay: 'Half a day if it is open.',
  move: 'Rough road from Cartago or from Turrialba town, four-wheel drive recommended. Guided trips handle the access question for you.',
  eat: 'Nothing up there. Turrialba town has good sodas.'
},

'CVL-braulio-carrillo': {
  intro: [
    'Braulio Carrillo is fifty thousand hectares of extremely steep rainforest half an hour from the capital, and most Costa Ricans experience it as the stretch of highway between San José and the Caribbean where the mountains close in and the cloud comes down.',
    'The park was created in 1978 precisely because that highway was being built: the road would have opened the whole area to settlement, so the land either side was protected first. It is one of the better-timed conservation decisions in the country’s history.',
    'The terrain is near-vertical and the altitude range enormous — from around three thousand metres on Barva down to five hundred on the Caribbean side — which gives it an exceptional species list.'
  ],
  see: [
    { n: 'The Quebrada González sector',
      d: 'On the highway at the Caribbean end, and the most accessible part. Short, steep, very wet trails through tall lowland rainforest. Excellent birding and almost nobody there.' },
    { n: 'The Barva sector',
      d: 'The high end, reached from Heredia, with a walk up through cloud forest to the crater lake. A completely different park from Quebrada González.' },
    { n: 'The aerial tram', t: 'adjacent to the park',
      d: 'A private operation on the park boundary, taking visitors through the canopy in gondolas. Expensive and genuinely good for seeing epiphytes and canopy birds.' },
    { n: 'The highway itself',
      d: 'Worth noting rather than recommending — it is beautiful, frequently fog-bound and has a bad accident record. Drive it in daylight.' }
  ],
  when: 'It rains here a great deal in all months. Mornings are clearer. The park is at its least wet from February to April.',
  stay: 'Half a day at either sector.',
  move: 'Quebrada González is directly on Highway 32. The Barva sector needs a separate approach from Heredia on rough road. Do not leave anything in a parked car at the trailheads.',
  eat: 'Nothing in the park. The highway has roadside sodas.'
},

'CVL-tapanti': {
  intro: [
    'Tapantí is one of the wettest places in Costa Rica — parts of it receive something close to seven metres of rain a year — and the whole park is essentially a water factory, feeding the Orosi river and the reservoir that supplies a large part of the Central Valley’s power and drinking water.',
    'The practical consequences are loud rivers, waterfalls visible from the road, and extremely good birding. The park now extends south to include the Macizo de la Muerte, which takes it up into high páramo.'
  ],
  see: [
    { n: 'The river trails',
      d: 'Several short routes along and above the Orosi river, with swimming holes and small falls. The sound of water is constant.' },
    { n: 'Birding', t: 'the main draw',
      d: 'Over four hundred species. Quetzals occur at the higher elevations, and the lower trails are good for tanagers, trogons and the emerald toucanet.' },
    { n: 'La Catarata viewpoint',
      d: 'A roadside lookout at a tall waterfall across the valley. Visible without any walking.' },
    { n: 'The Oropéndola swimming hole',
      d: 'A short trail to a pool on the river. Cold, clear and usually empty.' }
  ],
  when: 'Drier from January to April, which here is a relative term. Mornings are the only reliable window; bring rain gear in any month.',
  stay: 'Half a day from Orosi or Cartago.',
  move: 'Twelve kilometres beyond Orosi on a road that is paved then gravel. Any car in the dry; clearance helps after rain.',
  eat: 'Nothing inside. Orosi has sodas.'
},

'CVL-orosi': {
  intro: [
    'The Orosi valley is a green bowl south of Cartago, terraced with coffee, ringed by cloud forest and with a reservoir at the bottom of it. It is one of the prettiest landscapes in the Central Valley and almost entirely overlooked by visitors heading for the coasts.',
    'The village of Orosi holds the oldest church still in use in Costa Rica — built by Franciscans in 1743, low and thick-walled, and it has survived every earthquake that flattened Cartago down the road. The adjoining museum of religious art is small and good.'
  ],
  see: [
    { n: 'The church of San José de Orosi',
      d: 'Adobe and tile, with a wooden interior and a small museum of colonial religious art attached. The oldest functioning church in the country.' },
    { n: 'The Mirador de Orosi',
      d: 'A viewpoint on the road down into the valley, with the whole bowl of coffee terraces below. The classic view.' },
    { n: 'The hot springs',
      d: 'Two modest thermal pool complexes in the village, popular with Costa Rican families and very cheap.' },
    { n: 'The Ujarrás ruins',
      d: 'The remains of a colonial church abandoned after flooding, on the far side of the valley. Quiet gardens and a good deal of history.' },
    { n: 'The loop road around the reservoir',
      d: 'A full circuit of the valley, past the dam and back. Doable in two hours with stops.' }
  ],
  when: 'Year round. Mornings are clearest and the light on the terraces is best early.',
  stay: 'A day from San José, or a night in the valley for the quiet.',
  move: 'About forty minutes from Cartago on paved roads. A car makes the loop much easier.',
  eat: 'Simple valley sodas, and trout from the local farms.'
},

'CVL-cartago': {
  intro: [
    'Cartago was the capital of Costa Rica from 1563 until 1823, and it has been flattened by earthquakes repeatedly — most comprehensively in 1910, which is why so little colonial fabric survives. The ruins of the parish church in the centre, left unfinished after that earthquake, are now a garden.',
    'What the city has instead is the Basílica de Nuestra Señora de los Ángeles, and the story attached to it. In 1635 a girl is said to have found a small black stone statue of the Virgin on a rock here; it kept returning to the spot after being moved, and a church was built over it. La Negrita is the patron saint of Costa Rica, and on 2 August every year somewhere between one and two million people — a substantial fraction of the entire country — walk to Cartago from San José and beyond.'
  ],
  see: [
    { n: 'The Basílica',
      d: 'Byzantine-influenced, rebuilt after the 1910 earthquake, and genuinely impressive inside. The crypt holds the rock where the statue was found and a spring people queue to collect water from.' },
    { n: 'Las Ruinas',
      d: 'The roofless walls of the Santiago Apóstol parish church in the central park, abandoned after 1910 and now a garden. The city’s main public space.' },
    { n: 'The Romería', t: '2 August',
      d: 'The national pilgrimage. If you are in the country, the walk from San José — about twenty-two kilometres, done overnight by enormous crowds — is an extraordinary thing to witness or join.' },
    { n: 'The Lankester Botanical Garden',
      d: 'Just outside the city, with one of the best orchid collections in the Americas. Peak flowering is February to April.' }
  ],
  when: 'Any time. The Romería is 2 August. Cartago is cooler and wetter than San José, at about fourteen hundred metres.',
  stay: 'Half a day, usually combined with Irazú and Orosi.',
  move: 'Forty-five minutes from San José by frequent bus or on the commuter train.',
  eat: 'Market sodas. The city is not a dining destination.'
},

'CVL-guayabo': {
  intro: [
    'Guayabo is the only significant archaeological site in Costa Rica open to the public, and it is a reminder that the country’s pre-Columbian past is much less visible than its neighbours’ because the people here built largely in wood and earth rather than stone.',
    'What survives is the infrastructure: paved stone causeways, circular house mounds, retaining walls, and an aqueduct system that still carries water today, more than a thousand years after it was built. The settlement was occupied from around 1000 BC and abandoned about 1400 AD, before the Spanish arrived, for reasons nobody has established.',
    'It is a quiet, green, modest site. Anyone arriving with Tikal or Copán in mind will be disappointed; anyone interested in how a society organised water and movement will not be.'
  ],
  see: [
    { n: 'The aqueducts',
      d: 'Still functioning. Covered and open channels that collected water from springs and distributed it through the settlement, and which have run continuously for over a millennium.' },
    { n: 'The calzada',
      d: 'A broad paved causeway running into the heart of the site, the main approach route of the original settlement.' },
    { n: 'The mounds and the viewpoint',
      d: 'Circular stone foundations of houses, with a lookout that gives the layout from above — essential for making sense of it.' },
    { n: 'The petroglyphs',
      d: 'Carved boulders along the trail, including the jaguar-and-lizard monolith.' }
  ],
  when: 'Year round, though it rains a lot here. Mornings are best.',
  stay: 'Two hours, usually combined with Turrialba.',
  move: 'About nineteen kilometres from Turrialba town, the last part on steep and rough road. A guide at the entrance adds a great deal.',
  eat: 'Nothing on site. Turrialba is the nearest.'
},

'CVL-sarchi': {
  intro: [
    'Sarchí is where the painted oxcart comes from. The carretas were working vehicles for moving coffee down to the Pacific, and in the nineteenth century the practice of decorating them with elaborate geometric patterns began — initially as a mark of regional and family identity, then as a straightforward competition in craftsmanship.',
    'The tradition is on the UNESCO list of intangible cultural heritage, and the workshops in Sarchí still make them, along with furniture and the rocking chairs the town is also known for.',
    'The town itself holds the largest oxcart in the world, in the central square, which is exactly the sort of claim small towns make and in this case is verified.'
  ],
  see: [
    { n: 'The Fábrica de Carretas Eloy Alfaro',
      d: 'A workshop operating since 1923, still using a water-powered wheel to drive some of the machinery. You can watch carts being built and painted.' },
    { n: 'The giant oxcart',
      d: 'In the central plaza, Guinness-recognised and gaudy. Everybody photographs it.' },
    { n: 'The painted church',
      d: 'Pink and turquoise, and arguably the most cheerful church in the country.' },
    { n: 'Furniture workshops',
      d: 'Leather-and-wood rocking chairs are the town’s other product, and they can be shipped.' }
  ],
  when: 'Any time. Workshops are generally closed on Sundays.',
  stay: 'Two or three hours.',
  move: 'About an hour from San José, off the highway near Grecia. Easy by car or bus.',
  eat: 'Sodas around the square. Nothing special.'
},

'CVL-grecia': {
  intro: [
    'Grecia is a coffee town on the slopes above the valley, and the thing everyone comes to see is the church: a Gothic Revival structure built entirely from bolted red-painted steel plates, prefabricated in Belgium and shipped over in the 1890s.',
    'The usual explanation is that the valley kept shaking down stone churches. Whatever the reason, the result is a dark red metal cathedral in a tropical square, which is as incongruous as it sounds.'
  ],
  see: [
    { n: 'The metal church',
      d: 'Painted deep red, with a wooden interior that is warmer than the exterior suggests. Free to enter.' },
    { n: 'The central park',
      d: 'One of the better-kept town squares in the valley, and the social centre on a Sunday.' },
    { n: 'The World of Snakes',
      d: 'A serpentarium on the edge of town with a large collection of Costa Rican species and a breeding programme.' },
    { n: 'Coffee farms on the slopes',
      d: 'Several working fincas nearby offer tours, generally cheaper and less polished than the big-name operations.' }
  ],
  when: 'Any time.',
  stay: 'An hour, usually combined with Sarchí.',
  move: 'Forty-five minutes from San José, just off the highway.',
  eat: 'Sodas around the square and a decent market.'
},

'CVL-alajuela': {
  intro: [
    'Alajuela is the country’s second city and the one most visitors actually land in, since the international airport is on its edge. It is warmer and lower than San José, and more relaxed.',
    'It is also the home town of Juan Santamaría, a drummer boy who in 1856 volunteered to set fire to the building in Rivas where William Walker’s filibusters were holed up, and was killed doing it. He became the national hero, and the airport, the museum and the main square are all named for him.'
  ],
  see: [
    { n: 'The Juan Santamaría Museum',
      d: 'In the old jail on the central park, covering the 1856 campaign against Walker. Free and well presented.' },
    { n: 'The central park',
      d: 'Shaded by enormous mango trees, which gives the city its nickname. The best place in the valley to sit and watch a town work.' },
    { n: 'The Doka coffee estate',
      d: 'A large working finca on the Poás slopes with a well-run tour covering the whole process. Combines easily with the volcano.' },
    { n: 'Zoo Ave',
      d: 'A wildlife rescue centre nearby with a large collection of Costa Rican birds, many unreleasable. Better than the name suggests.' },
    { n: 'Staying here instead of San José',
      d: 'Quieter, cheaper, ten minutes from the airport and closer to Poás and La Fortuna. For most itineraries it is the better first and last night.' }
  ],
  when: 'Any time. Warmer than San José and pleasant year round.',
  stay: 'A night either side of a flight.',
  move: 'Ten minutes from the airport, forty from San José by frequent bus. The centre is walkable.',
  eat: 'Good sodas around the market, and the usual run of airport-adjacent hotel restaurants.'
},

'CVL-heredia': {
  intro: [
    'Heredia is called the city of flowers, is the home of the National University, and sits on the slopes of Barva with coffee farms running up behind it. It is the most studenty of the valley cities and has a correspondingly lively cheap eating and drinking scene.',
    'The colonial fort in the main square — El Fortín — is the city’s symbol, a squat round tower that is architecturally peculiar: its gun slits are wider on the outside than the inside, which would have made it useless for defence.'
  ],
  see: [
    { n: 'El Fortín and the central park',
      d: 'The tower, the colonial church of the Immaculate Conception alongside it, and a square that fills up in the evening.' },
    { n: 'Barva village',
      d: 'A few kilometres up the slope, with a preserved colonial centre that is considerably prettier than Heredia itself.' },
    { n: 'Café Britt',
      d: 'A long-established coffee operation on the edge of town running a theatrical, genuinely informative tour. The most polished coffee experience in the country.' },
    { n: 'The Barva sector of Braulio Carrillo',
      d: 'The road climbs from here to the park entrance and the walk up to the crater lake.' }
  ],
  when: 'Any time. Cool and pleasant year round.',
  stay: 'Half a day, or a night as a quieter alternative to San José.',
  move: 'Twenty-five minutes from San José by frequent bus. Walkable centre.',
  eat: 'Student prices and good variety. The market has excellent cheap lunches.'
},

'CVL-barva-volcano': {
  intro: [
    'Barva is the quiet corner of Braulio Carrillo and completely unlike the rest of it. Where the Quebrada González sector is hot lowland rainforest on the highway, Barva is cold, high oak cloud forest at nearly three thousand metres, reached up a rough road from Heredia.',
    'The walk goes about two kilometres through dripping moss-hung forest to a cold green crater lake in an extinct cone. On most days you will have it entirely to yourself.'
  ],
  see: [
    { n: 'Laguna Barva',
      d: 'The crater lake at the end of the trail — small, dark green and ringed by forest. Still and usually silent.' },
    { n: 'The cloud forest walk',
      d: 'Oak forest heavy with moss, bromeliads and ferns. Cold, wet underfoot, and one of the best short cloud-forest walks near the capital.' },
    { n: 'Birding',
      d: 'Quetzals occur here, along with highland species that are hard to find lower down. Very few people means very little disturbance.' },
    { n: 'Laguna Copey',
      d: 'A second, smaller crater lake further on, for anyone wanting a longer walk.' }
  ],
  when: 'Dry season for the road and the views. It is cold — bring layers and waterproofs in any month.',
  stay: 'Half a day.',
  move: 'A rough road climbs from Heredia via San José de la Montaña and Sacramento. High clearance is strongly advised and four-wheel drive in the wet. The ranger station is not always staffed; check opening days.',
  eat: 'Nothing. Bring food; there are places to sit by the lake.'
},

'CVL-turrialba': {
  intro: [
    'Turrialba is a hot, low town east of Cartago that lost its reason for existing twice — first when the railway to the Caribbean closed, then when the main highway bypassed it. It has reinvented itself around two things that have nothing to do with each other.',
    'The first is whitewater. The Pacuare and the Reventazón both run through the valley below, and Turrialba is where the rafting industry is based. The second is CATIE, the tropical agricultural research centre, whose collections of coffee, cacao and tropical crops are among the most important in the world and quietly underpin a great deal of agriculture across the tropics.'
  ],
  see: [
    { n: 'Rafting the Pacuare', t: 'a full day',
      d: 'Class III–IV through a gorge with no road access. Widely rated among the best commercial whitewater runs anywhere. Operators run day trips and overnights at river lodges.' },
    { n: 'CATIE',
      d: 'The botanical collections and grounds are open to visitors. A seed bank, a vast cacao and coffee germplasm collection, and excellent birding on the lakes.' },
    { n: 'Guayabo National Monument',
      d: 'The country’s main archaeological site, half an hour up the hill.' },
    { n: 'Turrialba cheese',
      d: 'The town gives its name to a soft white cheese made on the slopes above. Sold everywhere locally.' }
  ],
  when: 'Rafting runs year round; water is highest and the rapids biggest from June to October. The valley is hot and humid at all times.',
  stay: 'Two nights to raft and see Guayabo.',
  move: 'About an hour and a half from San José via Cartago. Rafting operators collect from San José hotels, which many people prefer to driving.',
  eat: 'Good local sodas, and the cheese in everything.'
},

'CVL-pacuare-river': {
  intro: [
    'The Pacuare drops off the Talamanca range and runs down through a gorge to the Caribbean lowlands, and for about thirty kilometres there is no road, no settlement and no way out except downstream. That is what makes it one of the most highly rated whitewater runs in the world.',
    'It is class III–IV on the standard section — demanding enough to be exciting, accessible enough for a fit first-timer with a good guide. The rapids have names that everyone on the river uses: Upper and Lower Huacas, Cimarrones, Dos Montañas.',
    'The river was twice proposed for a hydroelectric dam that would have flooded the gorge, and twice the proposal was defeated, partly through a local referendum. The rafting industry was central to both campaigns.'
  ],
  see: [
    { n: 'The day run', t: 'about four hours on the water',
      d: 'Roughly thirty kilometres from Tres Equis to Siquirres. Rapids interspersed with calm stretches where the gorge walls close in and waterfalls come straight off the rock into the river.' },
    { n: 'An overnight at a river lodge',
      d: 'Several lodges sit on the bank, reachable only by raft or a cable crossing. Staying turns a good day into a genuinely memorable two, with forest walks and the gorge to yourself in the morning.' },
    { n: 'The gorge itself',
      d: 'Between rapids, look up. Primary forest on near-vertical walls, waterfalls, and toucans crossing overhead.' },
    { n: 'The Huacas rapids',
      d: 'The main event on the upper section, and the ones your guide will brief you about properly beforehand.' }
  ],
  when: 'Runnable year round. June to October has the most water and the biggest rapids; the dry season is gentler and clearer. Trips are occasionally cancelled when the river is too high.',
  stay: 'A long day from San José, or two with a night at a river lodge.',
  move: 'Operators run from San José, Turrialba and the Caribbean side, including transport. Independent access is not practical.',
  eat: 'Lunch on the riverbank is part of every trip and is usually much better than it needs to be.'
},

'CVL-la-paz-waterfall': {
  intro: [
    'La Paz Waterfall Gardens is a private operation on the Poás slopes combining five waterfalls on the La Paz river with a large animal rescue centre. It is thoroughly manicured, expensive by Costa Rican standards, and on any purist reading it is not wild at all.',
    'It is also, for a great many visitors, the best close look at Costa Rican wildlife they will get. The animals are rescues that cannot be released — jaguars, pumas, ocelots, toucans, sloths and a very large hummingbird garden — and the waterfall walkway down the ravine is genuinely spectacular.',
    'The site was badly damaged by the 2009 Cinchona earthquake, which killed staff and visitors, and was rebuilt.'
  ],
  see: [
    { n: 'The waterfall walkway',
      d: 'A steep staircase and platform system down the ravine past five falls, with the Templo and La Paz falls the largest. A bus brings you back up, which is a mercy.' },
    { n: 'The hummingbird garden',
      d: 'Two dozen species at feeders in an open garden, at very close range. The best in the country.' },
    { n: 'The big cats',
      d: 'Jaguars, pumas and ocelots in large enclosures. Rescues, all of them unreleasable, and for most people the only ones they will see.' },
    { n: 'The butterfly observatory and serpentarium',
      d: 'Among the largest in the country, and the snake collection is a useful education before walking in forest elsewhere.' }
  ],
  when: 'Year round. Go early — tour buses arrive mid-morning. It is cool and often raining at this altitude.',
  stay: 'Half a day. Easily combined with Poás in the same morning.',
  move: 'About ninety minutes from San José on the road over the Poás shoulder towards Sarapiquí.',
  eat: 'A large buffet restaurant on site, included in some tickets.'
},

'CVL-zarcero': {
  intro: [
    'Zarcero is a cold hill town at about seventeen hundred metres whose central park is filled with cypress topiary — arches over the path, elephants, a bullfight, a helicopter, abstract shapes — clipped by one man, Evangelisto Blanco, since 1964.',
    'Behind the topiary is a pink-and-blue church with a painted wooden interior. The combination is odd, charming and completely unlike anywhere else in the country.'
  ],
  see: [
    { n: 'The topiary garden',
      d: 'Free, in the central square, and best in the morning light. Walk under the arches — that is what they are for.' },
    { n: 'The church of San Rafael',
      d: 'Pastel outside, elaborately painted wood inside.' },
    { n: 'Local cheese and dairy',
      d: 'This is dairy country and the roadside stalls sell cheese, natilla and palmito. Worth stopping for.' },
    { n: 'Juan Castro Blanco, nearby',
      d: 'The water park, barely visited, accessible from this side.' }
  ],
  when: 'Any time. It is genuinely cold here by Costa Rican standards, especially early.',
  stay: 'An hour, usually on the way between San José and La Fortuna.',
  move: 'On the route from Naranjo to Ciudad Quesada, about ninety minutes from San José.',
  eat: 'Sodas on the square, and the dairy stalls on the road.'
}

};

/* Look-up used by the place page. Returns null rather than an empty
   object when a place has no entry, so the caller can simply test it. */
function crGuide(id){
  return (typeof CR_GUIDE !== 'undefined' && CR_GUIDE[id]) ? CR_GUIDE[id] : null;
}

/* How much of the atlas has been written up. Used by the index page
   so the count shown is true rather than claimed. */
function crGuideCount(){
  try { return Object.keys(CR_GUIDE).length; } catch(e){ return 0; }
}
