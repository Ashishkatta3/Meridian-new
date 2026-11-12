/* ===========================================================
   LONGFORM — NATIONAL PARKS

   Why each park exists and what makes it worth the journey. The
   official descriptions are accurate and bloodless; the travel sites
   are the reverse. These aim for what you would want a well-read
   friend to tell you in the car on the way.

   placeId -> [ paragraph, paragraph, ... ]

   The eight parks with no listed activities get the longest entries,
   because for those this text is all there is.
   =========================================================== */

const LONGFORM_PARKS = {

"WY-yellowstone-national-park": [
"Yellowstone was the first national park anywhere in the world, signed into existence in 1872 before Wyoming was even a state, largely because nobody could work out who else should own it. What they were protecting, though they did not understand it at the time, is the surface expression of a volcanic hotspot: a magma chamber a few miles down that powers more than 10,000 thermal features and roughly half of all the geysers on earth.",
"The caldera is about 30 by 45 miles — so large that early surveyors stood inside it without realising. Old Faithful is the famous one and erupts roughly every 90 minutes, but Grand Geyser is taller, Steamboat is the tallest in the world when it chooses to go, and the Grand Prismatic Spring's colours come from heat-loving bacteria arranged in bands by temperature.",
"It is also the best large-mammal viewing in the lower 48. Bison never went extinct here — this is the only place in the country where they have lived continuously since prehistoric times — and the wolf reintroduction of 1995 restored a predator missing for seventy years, with visible effects on elk behaviour and riverbank vegetation. The Lamar Valley at dawn is where people go to watch all of it."
],

"WY-grand-teton-national-park": [
"The Tetons have no foothills. The fault at their base dropped the valley floor while the range rose, so the peaks jump nearly 7,000 feet straight out of the sagebrush flats of Jackson Hole with nothing to soften the transition — which is why they photograph the way they do and why the range looks far bigger than its modest 40-mile length.",
"They are also among the youngest mountains in North America, under ten million years old, which is why they are so sharp: there has not been time to wear them down. The glaciers did the sculpting, carving the string of lakes along the base — Jenny, Leigh, String — that now reflect the peaks on a still morning.",
"The park sits immediately south of Yellowstone and is usually visited alongside it, which is a shame, because it rewards slowing down. Moose in the willow flats along the Snake, the Mormon Row barns framed against the range, and a boat shuttle across Jenny Lake to Hidden Falls and Inspiration Point are the classics."
],

"AZ-grand-canyon-national-park": [
"The Grand Canyon is 277 river miles long, up to 18 miles across and about a mile deep, and the numbers are useless — it does not resolve as a space the brain can hold until you have watched the light move across it for an hour. The Colorado River cut it in perhaps five to six million years, which is fast; the rocks it cut through run back nearly two billion, roughly half the age of the earth.",
"The two rims are 10 miles apart as a raven flies and about 210 by road. The South Rim is open all year and holds ninety per cent of visitors; the North Rim is 1,000 feet higher, forested, far quieter and closed by snow from roughly mid-October to mid-May. Going down is optional but transformative — even a mile or two below the rim changes the scale completely.",
"Take the heat seriously. Summer temperatures at the river routinely exceed 100°F while the rim stays pleasant, and the park's most common rescues involve day hikers who descended further than their legs and water could carry them back. Hiking to the river and out in one day is explicitly discouraged."
],

"CA-yosemite-national-park": [
"Yosemite Valley is seven miles long and about a mile wide, and the granite walls on either side rise 3,000 to 4,000 feet nearly vertically. A glacier did the carving, turning a V-shaped river canyon into a U-shaped trough and leaving the hanging valleys from which Yosemite Falls — 2,425 feet in three tiers, the tallest in North America — drops into the valley.",
"The park's significance is larger than its scenery. Abraham Lincoln signed the Yosemite Grant in 1864, setting the valley aside for preservation during the Civil War: the first time any government had protected land simply because it was beautiful, and the direct ancestor of the national park idea. John Muir's campaigning made it a national park in 1890.",
"The valley is less than one per cent of the park and holds most of the crowds. Beyond it are the giant sequoias of Mariposa Grove, and Tuolumne Meadows in the high country, which is a different park entirely — open roughly June to October, 8,600 feet up, and far emptier. Waterfalls peak with the snowmelt in May and June and some run dry by August."
],

"UT-zion-national-park": [
"Zion is a canyon you experience from the bottom looking up, which inverts the usual national park arrangement. The Virgin River cut a narrow gorge through Navajo sandstone — up to 2,000 feet of it, among the thickest such deposits anywhere — leaving walls of cross-bedded rock that were sand dunes in a Jurassic desert.",
"Two hikes define it. The Narrows is a walk up the riverbed itself, where the canyon closes to twenty feet wide with walls a thousand feet high; you are in the water much of the day and flash flooding is a genuine danger. Angels Landing climbs a fin to a viewpoint with sheer drops on both sides and chains bolted into the rock for the last half mile — now permit-only by lottery, after a number of deaths.",
"The main canyon road is closed to private cars most of the year and served by a free shuttle, which has done more for the experience than any other change. Spring and autumn are ideal; summer is hot and busy, and winter is quiet, often clear, and the canyon walls hold snow in a way worth seeing."
],

"UT-arches-national-park": [
"Arches holds over 2,000 documented natural stone arches, the densest concentration on earth, and the reason is a bed of salt. Laid down by an evaporating sea 300 million years ago and buried under rock, the salt flowed under pressure, buckling the layers above into fins; water and frost then hollowed the fins, and the ones that did not collapse are the arches.",
"They are temporary. Wall Arch fell in 2008; roughly forty have collapsed since records began. Delicate Arch — freestanding, 46 feet tall, on the lip of a bowl of slickrock — is on the state licence plate and is reached by a mile-and-a-half climb with no shade, which is a serious undertaking in July and a pleasant walk in October.",
"The park is small and the road is short, so it concentrates visitors; timed entry is often required in the busy months. Landscape Arch in the Devils Garden is the longest in the park at 306 feet and looks impossibly thin, having shed a slab in 1991 while hikers were underneath."
],

"UT-bryce-canyon-national-park": [
"Bryce is not a canyon. It is a series of natural amphitheatres eroded into the edge of a plateau, filled with hoodoos — spires left standing when softer rock washes away from around harder caps. There are more of them here than anywhere else in the world, and they are orange, pink and white because of iron and manganese in the limestone.",
"The engine is frost. The rim sits between 8,000 and 9,000 feet and goes through roughly 170 freeze-thaw cycles a year; water gets into cracks, freezes, expands and prises the rock apart. The amphitheatre is retreating into the plateau at about a foot every 50 years, which means the hoodoos you see are a passing arrangement.",
"Because of the altitude it is cool when the rest of Utah is baking, and snowy in winter, when red rock against white snow is the best it ever looks. The air is unusually clear and the park has some of the darkest skies in the country — on a moonless night you can see 7,500 stars where most cities offer a few dozen."
],

"UT-canyonlands-national-park": [
"Canyonlands is cut into three districts by the Green and Colorado rivers, and they do not connect by road — getting from one to another takes two to six hours of driving. Island in the Sky is the mesa-top overlook district and the one most people see; the Needles is a landscape of banded sandstone spires requiring real hiking; the Maze is among the most remote and difficult terrain in the lower 48.",
"The view from Island in the Sky is of canyons within canyons: a flat desert that drops to a bench, which drops again to the rivers 2,000 feet below. Mesa Arch at sunrise catches light reflected off the cliff beneath it and glows from underneath, which is why there is always a row of tripods.",
"It is far less visited than nearby Arches and considerably wilder. Water is essentially absent, cell signal is nonexistent across most of it, and the backcountry roads require genuine four-wheel drive and recovery gear. Plan accordingly and it is one of the great American landscapes."
],

"UT-capitol-reef-national-park": [
"Capitol Reef protects the Waterpocket Fold, a wrinkle in the earth's crust nearly 100 miles long where the rock layers were bent and tipped by uplift some 50 to 70 million years ago. Pioneers called such barriers 'reefs' because they blocked travel; the 'capitol' is from white sandstone domes that reminded someone of the dome in Washington.",
"Tucked into it is Fruita, a Mormon settlement from the 1880s whose orchards the park still maintains — around 3,000 trees of cherry, apricot, peach, pear and apple. In season you can pick fruit and pay on an honour-system scale, which is a startlingly domestic thing to find in the middle of the Utah desert.",
"It is the least crowded of Utah's five parks and the easiest to enjoy slowly. The scenic drive is ten miles, the Hickman Bridge trail is a straightforward mile each way to a 133-foot natural bridge, and the petroglyph panels left by the Fremont people are visible from a boardwalk along the highway."
],

"MT-glacier-national-park": [
"Glacier sits astride the Continental Divide where the Rockies are at their most abrupt, and the rock is unusual: Precambrian sedimentary layers over a billion years old, pushed sixty miles eastward along the Lewis Overthrust and preserved so cleanly that you can see ripple marks and fossil algae mats in stone older than almost anything exposed in North America.",
"The Going-to-the-Sun Road crosses the park in fifty miles, climbing to Logan Pass at 6,646 feet along a ledge blasted into the cliff face. It takes crews most of the spring to clear the snow — drifts near the pass can be eighty feet deep — and it is usually open only from late June or July into October.",
"The glaciers are going. There were an estimated 150 in the mid-nineteenth century and around two dozen remain large enough to qualify, with most projections giving them a few decades. The park is also one of the few places with grizzly bears, black bears, wolverines, mountain goats and bighorn sheep all in the same drainage; bear spray is genuinely standard equipment."
],

"WA-olympic-national-park": [
"Olympic is three parks in one, and the reason is rain. Pacific storms hit the Olympic range and dump up to 170 inches a year on its western valleys, creating temperate rainforest — Hoh, Quinault, Queets — where Sitka spruce and western hemlock grow to enormous size under moss hanging in curtains. Forty miles northeast, in the rain shadow, Sequim gets about 16 inches and grows lavender.",
"The second park is the coast: 73 miles of wilderness shoreline with sea stacks, tidepools and driftwood piled like wreckage, reached by short trails through the trees. The third is the alpine centre, where Hurricane Ridge gives a road-accessible view across a skyline of glaciated peaks to Mount Olympus.",
"The isolation has produced species found nowhere else — the Olympic marmot among them — because the peninsula functioned as an island during the ice ages. It is a park that rewards accepting the weather rather than waiting it out; the rainforest in drizzle is better than the rainforest in sun."
],

"WA-mount-rainier-national-park": [
"Rainier is an active volcano and the most heavily glaciated peak in the contiguous United States, carrying some 25 major glaciers and more permanent snow and ice than all the other Cascade volcanoes combined. At 14,411 feet it stands so far above everything around it that it generates its own weather and is visible from a hundred miles away — Seattleites simply say 'the mountain is out'.",
"The hazard is not primarily lava. It is lahars: volcanic mudflows that can travel tens of miles down river valleys at speed. The Osceola Mudflow about 5,600 years ago reached Puget Sound, and towns in the valleys today have lahar warning sirens and evacuation routes posted.",
"For visitors it is a wildflower park. Paradise, on the south side, is one of the snowiest places on earth with records over 1,100 inches in a season, and when it finally melts out in late July the subalpine meadows go off all at once — lupine, paintbrush, avalanche lily — for about six weeks. The Skyline Trail loops through the best of it."
],

"WA-north-cascades-national-park": [
"North Cascades has over 300 glaciers, more than any other park outside Alaska and roughly a third of all the glaciers in the lower 48. The terrain is startlingly vertical: peaks rise 7,000 feet above valley floors within a couple of horizontal miles, which is why the range has been called the American Alps and why so little of it is reachable by road.",
"That inaccessibility keeps visitor numbers among the lowest of any national park, though the highway that skirts its edge is one of the great drives in the country, past the unreal turquoise of Diablo and Ross lakes — the colour comes from glacial rock flour suspended in the water.",
"It is a serious backcountry park. Trails climb hard, weather turns fast, and the wilderness runs north into Canada unbroken. For a day visit, the Maple Pass Loop and the view from Washington Pass give an honest sense of the place without committing to a week of it."
],

"CA-sequoia-national-park": [
"Sequoia was the second national park, established in 1890 to stop the logging of giant sequoias — trees that take a lifetime to fell and shatter into near-uselessness when they land. The General Sherman Tree is the largest living thing on earth by volume: 275 feet tall, over 36 feet across at the base, and an estimated 2,200 to 2,700 years old.",
"Giant sequoias grow naturally only in about 75 groves on the western slope of the Sierra Nevada, and they need fire. The cones rely on heat to open, the seedlings need bare mineral soil and sunlight, and a century of fire suppression nearly stopped regeneration — which is why the park service now deliberately sets fires beneath them.",
"The park also holds Mount Whitney at 14,505 feet, the highest point in the contiguous United States, though the usual approach is from the eastern side outside the park. The road up from the foothills climbs steeply through several climate zones in an hour, and in winter it often requires chains."
],

"CA-kings-canyon-national-park": [
"Kings Canyon is administered jointly with Sequoia and contains one of the deepest canyons in North America — over 8,000 feet from the river to the peaks above, measured where the granite walls of the South Fork of the Kings River rise on either side. John Muir thought it a rival to Yosemite Valley and said so repeatedly.",
"Grant Grove holds the General Grant Tree, the second largest in the world and designated the Nation's Christmas Tree in 1926; it is also a living war memorial, the only one of its kind. The grove was protected in 1890 as the tiny General Grant National Park and absorbed into Kings Canyon in 1940.",
"Most of the park is wilderness with no road access at all. The scenic byway down into Cedar Grove closes with snow from roughly November to April, and beyond its end the trails run east into the High Sierra toward the John Muir Trail and some of the emptiest country left in California."
],

"CA-death-valley-national-park": [
"Death Valley holds the highest air temperature ever reliably recorded on earth: 134°F at Furnace Creek in July 1913. Badwater Basin, at 282 feet below sea level, is the lowest point in North America, and it sits in the shadow of Telescope Peak, 11,043 feet above it — a vertical mile and a half of relief within fifteen horizontal miles.",
"It is the largest national park outside Alaska, at over 3.4 million acres, and far stranger than 'desert' suggests. The Racetrack is a dry lakebed where rocks leave trails behind them, finally explained in 2014 by thin ice sheets pushed by light wind. Ubehebe is a volcanic crater perhaps 2,000 years old. In rare wet years the valley floor produces a wildflower bloom.",
"Winter is the season — warm, clear days and cold nights. Summer visits are possible but the heat is a genuine hazard, vehicles overheat on the climbs, and the park advises staying within short reach of air conditioning. The dark skies are Gold Tier and among the best in the country."
],

"CA-joshua-tree-national-park": [
"Joshua Tree sits where two deserts meet. The higher, cooler Mojave in the west supports the Joshua trees themselves — not trees but a species of yucca, slow-growing and strangely limbed, which Mormon settlers are said to have named for a prophet raising his arms. Below about 3,000 feet the Colorado Desert takes over, hotter and sparser, with ocotillo and cholla instead.",
"The rock is the other attraction: piles of monzogranite weathered into rounded boulders, formed underground and exposed by erosion. It has made the park one of the world's great climbing areas, with thousands of established routes, and it is just as good for non-climbers willing to scramble.",
"It is two hours from Los Angeles, which makes it crowded at weekends and genuinely transporting midweek. Nights are the point — the skies are very dark for somewhere so close to a major city, and the temperature drop after sunset is severe enough that people are regularly caught out in shorts."
],

"CA-redwood-national-and-state-parks": [
"The coast redwood is the tallest tree species on earth, and the tallest known individual — Hyperion, at over 380 feet — is in these parks, its location deliberately unpublicised after visitor traffic began damaging the roots. The trees depend on summer fog, which condenses on the canopy and supplies a significant share of their water in the dry season.",
"Roughly 95 per cent of the original old-growth redwood forest was logged, mostly between the Gold Rush and the 1960s. What survives here is a patchwork protected through a long and bitter campaign, and the fact that the national park is interleaved with three state parks under joint management is the practical residue of that fight.",
"The parks run along forty miles of northern California coast and include prairie, river and shoreline as well as forest — Roosevelt elk graze openly in the meadows. Fern Canyon, with fifty-foot walls covered entirely in ferns, is the single most photographed spot and requires a permit in summer."
],

"CA-lassen-volcanic-national-park": [
"Lassen Peak is one of the largest lava domes on earth and erupted spectacularly between 1914 and 1917, the most significant eruption in the contiguous United States until Mount St. Helens. The 1915 blast sent an ash column seven miles up and devastated the area now called the Devastated Area, where the regrowth has been studied continuously ever since.",
"The park is unusual in containing all four types of volcano recognised by geologists — shield, composite, cinder cone and lava dome — within a compact area. Bumpass Hell is the largest thermal area, with boiling pools and fumaroles reached by a boardwalk whose name commemorates a guide who lost a leg through the crust.",
"It gets a fraction of Yosemite's visitors despite being a few hours north, partly because the main road is buried in snow for much of the year and typically opens fully only in June or July. That makes late summer the window, and the emptiness is a large part of the appeal."
],

"CA-pinnacles-national-park": [
"Pinnacles is the eroded remnant of a volcano that is no longer where it erupted. The San Andreas Fault split the original volcanic field about 23 million years ago and carried this half some 195 miles northwest, which is why its matching piece sits near Lancaster in southern California.",
"The spires and talus caves that result are the main attraction — the caves are not solid rock but boulders wedged into narrow gorges, and you walk under them with a torch. They close periodically for the bats, including a maternity colony of Townsend's big-eared bats.",
"It is also the best place in the country to see California condors, reintroduced here from near-extinction; the wild population passed through a bottleneck of 22 birds in the 1980s. The park has no road connecting its east and west entrances, and summer is punishingly hot, so spring is the time to come."
],

"CA-channel-islands-national-park": [
"The Channel Islands are five of the eight islands off the southern California coast, reachable only by boat or small plane, and they preserve something close to what the region looked like before European arrival. They have been called the Galápagos of North America — about 150 species occur nowhere else on earth, the island fox most famously, a house-cat-sized relative of the mainland gray fox.",
"The human history is as old as any in the Americas. Arlington Springs Man, found on Santa Rosa Island, dates to roughly 13,000 years ago, among the oldest human remains in North America. The Chumash lived on these islands for millennia, running plank canoes across the channel and operating a shell-bead economy that reached far inland before the mission system removed them in the early 1800s.",
"The waters are the other half of the park and arguably the better half. Cold, nutrient-rich upwelling supports giant kelp forests that grow up to two feet a day, and the channel is one of the finest whale-watching corridors anywhere: gray whales in winter and spring, blue and humpback whales in summer. Sea caves along the Santa Cruz coastline include Painted Cave, among the largest sea caves in the world.",
"There are no services on the islands — no shops, no food, no reliable water on most of them. You carry what you need, the boat leaves when it leaves, and weather can strand you. That friction is exactly why fewer than a hundred thousand people a year land here while twenty million live within sight of it on a clear day."
],

"CO-rocky-mountain-national-park": [
"Rocky Mountain National Park has over sixty peaks above 12,000 feet and a third of its area sits above the treeline, which is where the park gets its character. Trail Ridge Road crosses it at up to 12,183 feet — the highest continuous paved road in the country — and runs for eleven miles through alpine tundra where the plants are measured in centimetres and the growing season is six weeks.",
"The Continental Divide runs through the park, and the two sides are genuinely different: the east is drier, busier and reached from Estes Park; the west is wetter, greener and reached from Grand Lake. Elk are everywhere, and the autumn rut in September and October fills the meadows with bugling.",
"Altitude is the thing visitors underestimate. The trailheads start where many mountains end, and people arriving from sea level routinely feel it within hours. Trail Ridge Road is closed by snow from roughly late October to Memorial Day, which concentrates the summer crowds; timed-entry reservations are now usual."
],

"CO-mesa-verde-national-park": [
"Mesa Verde protects nearly 5,000 archaeological sites including about 600 cliff dwellings, built by Ancestral Puebloan people who lived on and under this mesa for more than 700 years. It was made a national park in 1906 — the first anywhere created to preserve the works of people rather than a landscape.",
"The dwellings are tucked into alcoves beneath the canyon rims, and they were built late in the occupation, from roughly 1190 to 1280. Cliff Palace, the largest in North America, has about 150 rooms and 23 kivas. Reaching several of them involves ladders and narrow passages on ranger-led tours, which is part of the experience.",
"Then, within about two decades at the end of the 1200s, they left. Prolonged drought, resource depletion and social upheaval are all implicated; their descendants are today's Pueblo peoples of New Mexico and Arizona, who do not regard this as a mystery so much as a migration."
],

"CO-great-sand-dunes-national-park": [
"The tallest sand dunes in North America sit against the Sangre de Cristo mountains in southern Colorado, with Star Dune and Hidden Dune both rising about 750 feet from the valley floor. The combination is the strange part — a sand sea at 8,000 feet backed by 13,000-foot peaks, and in spring a creek running along its base.",
"The dunes exist because of a wind trap. Sand blown northeast across the broad San Luis Valley meets the mountain wall and the wind funnels toward three passes, dropping its load at the foot. Storm winds from the opposite direction push the sand back, and the dunes have stayed in roughly the same place for thousands of years, piling upward rather than marching along.",
"Medano Creek is the seasonal surprise. Snowmelt sends a shallow, wide stream across the sand from roughly April to early June, and it flows in pulses — surge flow, caused by sand ridges building and collapsing underwater — producing waves every twenty seconds or so on a beach a thousand miles from any ocean. Families treat it as exactly that.",
"Sandboarding and sand sledding on specially waxed boards are the other draw, rented in the nearby town. The sand surface can reach 150°F on a summer afternoon, so dawn and evening are the sensible times, and the park's dark skies make the walk back under stars part of the point."
],

"CO-black-canyon-of-the-gunnison": [
"The Black Canyon is not the deepest or the narrowest or the sheerest canyon in North America, but no other combines all three to this degree. At the Narrows it is 1,100 feet across the rim and 1,725 feet deep; the Painted Wall is Colorado's tallest cliff at 2,250 feet, taller than two Empire State Buildings stacked.",
"Its darkness is the name's origin — parts of the gorge receive barely half an hour of direct sunlight a day. The rock is ancient Precambrian gneiss and schist, extremely hard, which is why the Gunnison River cut down rather than widening: it has been removing the width of a human hair each century while carrying one of the steepest gradients of any river in North America.",
"There are no maintained trails to the river. The routes down are unmarked, steep and loose, require a free permit, and are properly described as scrambles; the rim drives and overlooks are how almost everyone sees it. The dark skies here are excellent and the park runs astronomy programmes in summer."
],

"NM-carlsbad-caverns-national-park": [
"Carlsbad Caverns is a cave system dissolved not by rainwater but by sulphuric acid, formed where hydrogen sulphide rising from oil and gas deposits met oxygenated groundwater. That unusual chemistry produced enormous rooms: the Big Room is about 8.2 acres of floor, the largest single cave chamber in North America.",
"You can walk in through the natural entrance, descending 750 feet along a switchbacked path, or take the lift down. The formations — stalactites, draperies, the 62-foot Giant Dome — accumulated over hundreds of thousands of years at rates measured in fractions of an inch per century.",
"From roughly May to October, hundreds of thousands of Brazilian free-tailed bats pour out of the natural entrance at dusk in a spiralling column that takes a long while to pass. Rangers give a talk beforehand, phones must be off, and it is one of the great wildlife spectacles in the country."
],

"NM-white-sands-national-park": [
"White Sands is the largest gypsum dune field on earth — about 275 square miles of it. Gypsum is water-soluble and almost never survives as sand, but this basin has no outlet to the sea, so rain dissolves it out of the surrounding mountains, carries it to a playa, and leaves it behind to crystallise and be ground down by wind.",
"Because gypsum does not absorb heat the way quartz sand does, the dunes stay cool enough to walk barefoot even in summer. Species here have gone pale to match: the bleached earless lizard and the Apache pocket mouse evolved white colouring in a few thousand years, which is close to observable evolution.",
"It sits inside White Sands Missile Range and both the park road and the highway close for a couple of hours during tests, which is worth checking before driving out. Sledding down the dunes on waxed plastic discs is the thing to do, and sunset turns the whole field pink and blue."
],

"TX-big-bend-national-park": [
"Big Bend takes its name from the turn the Rio Grande makes here, and the river forms 118 miles of the park's southern boundary and the international border. Santa Elena Canyon is the showpiece: 1,500-foot limestone walls with the river running between them, Mexico on one side and Texas on the other, close enough to talk across.",
"It contains an entire mountain range — the Chisos, the only range entirely inside a national park — rising out of Chihuahuan Desert. That vertical range gives it extraordinary biodiversity: more bird species than any other national park, over 450, plus black bears that recolonised naturally from Mexico.",
"It is genuinely remote. The nearest commercial airport is around 230 miles away and there is no town of any size nearby, which is why it has the least light pollution of any national park in the lower 48 and some of the darkest measured skies in North America. Summer is severe; late autumn through spring is the season."
],

"TX-guadalupe-mountains-national-park": [
"The Guadalupe Mountains are the exposed remains of the Capitan Reef, one of the best-preserved fossil reefs in the world, laid down in a tropical sea about 265 million years ago and later buried, uplifted and partially eroded free. The limestone is full of marine fossils at 8,000 feet in the West Texas desert.",
"Guadalupe Peak is the highest point in Texas at 8,751 feet, and the hike up is 8.4 miles round trip with 3,000 feet of gain and an exposed ridge where the wind can be genuinely dangerous — gusts over 70 mph are recorded regularly. El Capitan, the sheer prow below it, was a landmark for the Butterfield stage route.",
"McKittrick Canyon is the other reason to come: a spring-fed canyon whose bigtooth maples turn red and gold for a couple of weeks in late October and early November, which in Texas draws a crowd. The park has few services, no lodging and limited water, so plan to be self-sufficient."
],

"AZ-saguaro-national-park": [
"The saguaro grows naturally only in the Sonoran Desert and nowhere else on earth. It takes perhaps ten years to reach an inch tall, 50 to 70 years to grow its first arm, and can live 150 to 200 years, reaching 40 feet and weighing several tons when full of water — which is why a fallen one leaves a woody ribcage behind.",
"The park is in two districts on either side of Tucson, about thirty miles apart. The eastern Rincon district is larger and rises into forested mountains; the western Tucson Mountain district has the denser stands and the better sunsets, and sits next to the excellent Arizona-Sonora Desert Museum.",
"Everything here is timed to water. The saguaro flowers in May and June, opening at night and closing by the following afternoon, and bats and doves do the pollinating. The summer monsoon from July to September brings violent, brief storms, and the desert greens up within days."
],

"AZ-petrified-forest-national-park": [
"The petrified wood here is from the Late Triassic, about 218 million years ago, when this was a tropical floodplain near the equator. Fallen trees were buried in silt before they could rot, and silica-rich groundwater replaced the wood cell by cell with quartz, picking up iron, manganese and carbon that give the logs their reds, yellows and purples.",
"It is also one of the richest Triassic fossil sites anywhere, with early dinosaurs, giant amphibians and crocodile relatives, from the period just before dinosaurs became dominant. The Painted Desert in the northern half of the park is banded badlands of the Chinle Formation, best in low light.",
"Taking petrified wood is illegal and the park estimates about twelve tons a year leaves in pockets anyway. The visitor centre keeps a display of 'conscience letters' from people returning pieces, often claiming terrible luck since. Historic Route 66 crossed the park, and a rusted 1932 Studebaker marks the alignment."
],

"NV-great-basin-national-park": [
"Great Basin protects a slice of the enormous interior region where no water reaches the sea — rivers here end in lakes or sinks and evaporate. Wheeler Peak rises to 13,065 feet, and the drive up it climbs through sagebrush, piñon, aspen and into subalpine forest in about twelve miles.",
"Near the top are groves of Great Basin bristlecone pines, the longest-lived non-clonal organisms known: some exceed 4,800 years. They survive by growing extremely slowly in terrible conditions, and dead wood can stand for millennia. One here, Prometheus, was cut down for research in 1964 and turned out to be the oldest tree ever recorded, which changed how such research is done.",
"Lehman Caves, at the base of the mountain, is dense with rare shield formations and toured year-round. The park is among the least visited in the system, several hours from any city, with outstanding dark skies and a small annual astronomy festival."
],

"MO-gateway-arch-national-park": [
"The smallest national park in the system and the most urban, this is 91 acres on the St. Louis riverfront around Eero Saarinen's arch. It became a national park only in 2018, having been a national memorial since 1935; the renaming was controversial among people who think the category should mean wilderness.",
"The Arch is a weighted catenary — the shape a hanging chain makes, inverted — 630 feet tall and 630 feet wide at the base, clad in stainless steel. It was built from both legs simultaneously between 1963 and 1965, and the final piece fitted only because crews sprayed the south leg with water to cool and contract it. Tolerances were measured in fractions of an inch.",
"A tram of five-seat pods climbs the inside of a leg to a narrow observation room at the top, where small windows look over the Mississippi and the city. The underground museum beneath covers westward expansion, including the displacement of Native nations that it entailed, more honestly than it once did."
],

"AR-hot-springs-national-park": [
"Hot Springs was protected in 1832 — forty years before Yellowstone — making it the oldest federally protected area of its kind in the country, though it was a reservation rather than a park then. The water falls as rain, percolates down for perhaps 4,000 years, is heated by the earth, and returns to the surface at about 143°F.",
"Bathhouse Row is the park's core: eight grand early-twentieth-century bathhouses along the main street of the town, the largest collection of their kind in North America. Two still operate as baths, one is the visitor centre, and one became a brewery that uses the spring water. The park and the town are physically interwoven in a way no other park is.",
"It is small and oddly gentle compared with the western parks — mountain trails behind the row, a tower with a view over the Ouachitas, and public fountains where people fill jugs with the thermal water for free, which they have been doing for well over a century."
],

"KY-mammoth-cave-national-park": [
"Mammoth Cave is the longest known cave system in the world by a very wide margin: over 400 miles of surveyed passage, more than double the next longest, and surveyors keep finding more. It formed in limestone capped by a hard sandstone layer that acted as an umbrella, letting passages develop without collapsing.",
"The human history runs deep — Native Americans explored miles into it starting around 5,000 years ago, leaving cane torches and gourd fragments. In the War of 1812 it was mined for saltpetre by enslaved labourers, and in the nineteenth century enslaved and later freed Black guides, notably Stephen Bishop, mapped much of what is known and made the cave famous.",
"Tours range from an easy walk to the Historic Entrance to crawling trips that are not for the claustrophobic, and the cave stays around 54°F all year so a jacket is sensible in August. Above ground are rivers, hardwood forest and genuinely dark skies."
],

"OH-cuyahoga-valley-national-park": [
"Cuyahoga Valley protects a river corridor between Cleveland and Akron and is the least wild-seeming national park in the system — there are roads, villages, a working scenic railroad and a golf course inside it. That is the point: it was created in 1974 to save green space between two industrial cities rather than to protect a wilderness.",
"The Cuyahoga is famous for the wrong reason. It was so polluted that it caught fire repeatedly, most consequentially in 1969, and the photographs helped drive the Clean Water Act and the creation of the EPA. The river today supports a recovering fishery, which is the more interesting story and one the park tells well.",
"Brandywine Falls, 65 feet over sandstone ledges, is the signature view. The Towpath Trail runs twenty miles through the park along the old Ohio and Erie Canal, and the railroad will carry you and your bike one way so you can ride back."
],

"IN-indiana-dunes-national-park": [
"Indiana Dunes runs for fifteen miles along the southern shore of Lake Michigan, wedged between steel mills and a power plant — an arrangement that looks like a compromise and is one. The campaign to protect it ran for sixty years and ended in a 1966 deal that traded a national lakeshore for an industrial port.",
"Its scientific importance is out of proportion to its size. Henry Cowles did fieldwork here around 1899 that established the concept of ecological succession — the orderly change of plant communities over time — using the dunes as a natural laboratory where distance from the water stands in for time. The park records over 1,100 plant species in 15,000 acres.",
"Mount Baldy is a live dune moving inland about four feet a year, burying trees as it goes, and is frequently closed after a child fell into a hole in it in 2013. Chicago is visible across the water on a clear day, which is the oddest thing about standing on the beach here."
],

"MI-isle-royale-national-park": [
"Isle Royale is an island archipelago in Lake Superior reachable only by ferry or seaplane, closed entirely from November to mid-April, and the least visited national park in the lower 48 — fewer people come in a year than visit the Grand Canyon on a busy day. Those who do come stay an average of several days, the longest of any park.",
"It hosts the longest-running predator-prey study in the world. Wolves crossed an ice bridge around 1949 and moose had arrived earlier; researchers have counted both every winter since 1958. The wolf population crashed to two closely related animals by 2016, and the park has since translocated new wolves to restart it — a deliberate intervention in what was once treated as a sealed natural experiment.",
"There are no roads and no cars. You walk or you paddle, carrying everything, and the shoreline is studded with shipwrecks that make it a notable cold-water dive site."
],

"MN-voyageurs-national-park": [
"Voyageurs is a park you see from a boat. About 40 per cent of it is water — four large interconnected lakes and dozens of smaller ones — and most of the interior is accessible only by vessel, with some campsites and even houseboat sites reachable no other way. Roads stop at the edge.",
"The name comes from the French-Canadian canoemen who carried furs along this exact route in the eighteenth and nineteenth centuries, paddling birchbark canoes up to 26 feet long on a highway of water between Montreal and the interior. The border with Canada follows their old route, and the park preserves the corridor.",
"The bedrock underneath is some of the oldest exposed rock on the planet — Canadian Shield granite and gneiss up to about three billion years old, scraped bare by glaciers and now holding a thin forest of pine, spruce and birch. The glacial scouring is why there are so many lakes and so little soil.",
"In winter the lakes freeze hard enough for ice roads and the park becomes a snowmobile and ski destination. Year-round it is among the better places in the lower 48 to see the northern lights, being far north, far from cities and oriented with open water to the north — and the park has the dark-sky certification to match."
],

"SD-badlands-national-park": [
"The Badlands are eroding at about an inch a year, which is extremely fast, and in geological terms they will be gone within half a million years. The banded spires and gullies are soft sedimentary rock laid down between 75 and 28 million years ago, then cut apart over the last half million by water running off the White River.",
"Those layers hold one of the world's richest fossil beds from the Eocene and Oligocene — the period when modern mammal groups were establishing themselves. Three-toed horses, sabre-toothed cats, rhinoceros relatives and giant pigs have come out of this rock, and visitors still occasionally find fossils eroding free, which rangers ask you to report rather than collect.",
"The South Unit lies within the Pine Ridge Reservation and is co-managed with the Oglala Lakota. Wounded Knee is nearby, and the Stronghold Table in the South Unit was the site of some of the last Ghost Dances in 1890. Bison, bighorn sheep and reintroduced black-footed ferrets — once thought extinct — live on the mixed-grass prairie above the formations."
],

"SD-wind-cave-national-park": [
"Wind Cave was the first cave anywhere in the world to be made a national park, in 1903, and it is named for the air that moves through its one natural entrance — a hole about ten inches across. Air rushes in or out depending on barometric pressure, strongly enough to be heard, as the cave equalises with the surface.",
"It holds the world's greatest concentration of boxwork: thin fins of calcite protruding from the ceiling in a honeycomb, formed when the surrounding limestone dissolved away and left the harder veins behind. Roughly 95 per cent of all known boxwork is in this cave.",
"Above ground the park protects one of the last intact mixed-grass prairies, with bison, elk, pronghorn and a large prairie dog town. The bison herd here is one of only a handful that is genetically pure, without cattle ancestry, which makes it important far beyond the park."
],

"ND-theodore-roosevelt-national-park": [
"This is the only national park named for a single person, and the reason is biographical. Roosevelt came to the Dakota badlands in 1883 to hunt bison, returned after his wife and mother died on the same day in 1884, and spent the better part of two years ranching here. He later said he would never have become president without his North Dakota experience, and his conservation record began in this landscape.",
"The park is in three units along the Little Missouri River, with the South Unit on the interstate and the North Unit about seventy miles away and considerably quieter. The badlands here are greener and more rolling than South Dakota's, striped with layers of lignite coal that sometimes catch fire underground and bake the surrounding clay into red scoria.",
"Bison, wild horses — descended from ranch stock and managed as a historical population — elk, prairie dogs and bighorn sheep are all visible from the scenic drives. Roosevelt's Maltese Cross cabin stands behind the South Unit visitor centre."
],

"OR-crater-lake-national-park": [
"Crater Lake is the deepest lake in the United States at 1,943 feet and among the clearest in the world. It has no inlet and no outlet: every drop in it is snow and rain that fell directly on the lake or its caldera walls, which is why it is so free of sediment and so intensely blue — the water absorbs every other wavelength and scatters blue back.",
"It sits in the collapsed remains of Mount Mazama, a 12,000-foot volcano that erupted about 7,700 years ago in a blast perhaps 40 times larger than Mount St. Helens in 1980 and then fell into its own emptied magma chamber. Klamath people witnessed it; their oral tradition describes a battle between the spirits of the sky and the underworld, and ash from the eruption is found across the Pacific Northwest.",
"Wizard Island is a later cinder cone rising from the lake, reachable by boat tour in summer. The rim averages 43 feet of snow a year, and the full Rim Drive is usually open only from July into October."
],

"HI-hawai-i-volcanoes-national-park": [
"This park contains two active volcanoes: Mauna Loa, the largest active volcano on earth by volume, and Kīlauea, among the most active anywhere. Kīlauea erupted continuously from 1983 to 2018, adding over 500 acres of new land to the island, and has erupted repeatedly since — making this one of the few places where you can reliably watch the planet building itself.",
"The 2018 eruption was the most destructive in two centuries: the summit caldera collapsed in stages, lava destroyed over 700 homes in Puna, and the park closed for months. The landscape visitors see now is substantially different from the one in older guidebooks, which is the normal condition here.",
"It is also a sacred place. Kīlauea is the home of Pelehonuamea, and offerings at the crater rim are a living practice rather than a historical note. The Chain of Craters Road descends 3,700 feet to the coast past lava flows of many ages, ending where an eruption buried it."
],

"HI-haleakal-national-park": [
"Haleakalā means 'house of the sun', from the tradition in which the demigod Māui lassoed the sun from the summit to slow its passage and lengthen the day. The mountain is a shield volcano making up roughly 75 per cent of the island of Maui, rising from the sea floor to 10,023 feet, and the summit depression is not a true crater but an erosional basin later filled with cinder cones.",
"Standing at the summit before dawn is the signature experience, above a cloud layer that usually sits below you, in temperatures near freezing — which catches out visitors who drove up from a beach an hour earlier in shorts. Sunrise viewing now requires an advance reservation because the car park filled beyond capacity.",
"The park holds some of the rarest life on earth. The silversword grows only on Hawaiian volcanoes, lives up to 90 years as a silver globe of leaves, flowers once in a spectacular stalk and then dies. The nēnē, the Hawaiian goose and state bird, came back from about 30 individuals in 1952 through captive breeding and is now seen regularly in the park.",
"The Kīpahulu district on the coast, reached by the long Hāna highway rather than from the summit, is a separate world of waterfalls, bamboo forest and the pools of ʻOheʻo. The two halves of the park do not connect by road, and the drive between them takes several hours."
],

"ME-acadia-national-park": [
"Acadia was the first national park east of the Mississippi and the first created entirely from donated private land — much of it assembled by wealthy summer residents of Mount Desert Island who were alarmed at the arrival of the portable sawmill. George Dorr spent his fortune and four decades on it.",
"Cadillac Mountain, at 1,530 feet, is the highest point on the Atlantic coast of the United States, and from early October to early March it is the first place in the country to see the sunrise. Vehicle reservations are required in season, largely because of that fact.",
"John D. Rockefeller Jr. built 45 miles of carriage roads here between 1913 and 1940, broken-stone lanes with hand-cut granite bridges, specifically to keep cars out; they are now used by cyclists, walkers and, in winter, skiers. The park also includes the Schoodic Peninsula on the mainland and part of Isle au Haut, both far quieter than the island loop."
],

"VA-shenandoah-national-park": [
"Shenandoah is a long, narrow park following the crest of the Blue Ridge for about 105 miles, and Skyline Drive runs the entire length of it with 75 overlooks. On a clear day you see the Shenandoah Valley on one side and the Piedmont on the other; in autumn the colour runs down the slopes over several weeks.",
"It was assembled in the 1930s by the state of Virginia buying — and in many cases condemning — land occupied by around 500 families, who were displaced. That history was glossed over for decades and the park now addresses it directly. The Civilian Conservation Corps then built much of the infrastructure, and some of the stonework is theirs.",
"The forest has largely regrown over abandoned farms, which is why it is young and why old stone walls run through the woods. Old Rag is the famous hike, a rock scramble with a genuine line of people at weekends and a day-use ticket system; Dark Hollow Falls is the short one everyone does."
],

"TN-great-smoky-mountains-national-park": [
"The Smokies are the most visited national park in the country by a wide margin — more than twice the Grand Canyon — partly because there is no entrance fee, a condition of the state road that crosses it, and partly because two-thirds of the US population lives within a day's drive.",
"The biodiversity is the real distinction. Over 19,000 species have been documented and scientists estimate many times that remain unrecorded; it holds more tree species than all of northern Europe and is called the salamander capital of the world, with some 30 species. The elevation range and the fact that the ridges escaped glaciation made it a refuge.",
"The haze that gives the mountains their name is natural — volatile organic compounds released by the forest — though air pollution worsened it badly in the twentieth century before regulation helped. Cades Cove is the most popular drive, an open valley of preserved homesteads with reliable deer and bear sightings and a traffic jam to match."
],

"WV-new-river-gorge-national-park": [
"The New River is, despite the name, among the oldest rivers in the world — estimates range widely but it is generally put in the same bracket as the Nile, and it is one of the few rivers in North America that flows north. It is old enough that it predates the Appalachians around it, cutting down as the mountains rose.",
"The gorge it has carved is up to 1,400 feet deep, and the New River Gorge Bridge that crosses it is 3,030 feet long and 876 feet above the water — for decades the longest single-span steel arch bridge in the world. On Bridge Day each October the road closes and hundreds of people BASE jump from it, which is the only legal day to do so.",
"This was coal country, and the gorge is full of the evidence: abandoned mining towns such as Thurmond and Nuttallburg, coke ovens in the trees, and rail lines still running coal along the river. The park service preserves these alongside the natural landscape, and the social history of the company towns — multiracial, immigrant and brutally hard — is told at several of the sites.",
"It became the country's 63rd national park in 2020, converted from a national river. The whitewater is the main draw: the Lower New is big, forgiving water popular with first-timers, while the nearby Gauley in its autumn dam-release season is among the most serious commercially run whitewater in the world. The sandstone cliffs along the rim also make it one of the best climbing areas in the eastern United States, with over 1,400 established routes."
],

"SC-congaree-national-park": [
"Congaree protects the largest remaining tract of old-growth bottomland hardwood forest in the United States. This is not swamp, a distinction the park makes repeatedly: it is a floodplain forest that the Congaree and Wateree rivers flood about ten times a year, dropping nutrients that drive extraordinary growth.",
"The result is one of the tallest deciduous forests on earth, a temperate equivalent of a rainforest canopy. It holds numerous state and national champion trees — loblolly pines over 160 feet, sweetgums, cherrybark oaks, bald cypress — and an average canopy height that exceeds almost anywhere else in North America. It survived because the ground was too wet to log economically until late, and a campaign in the 1970s stopped it then.",
"The 2.4-mile boardwalk loop keeps you above the water and is the easy introduction; Cedar Creek, paddled by canoe or kayak, is the better one, winding between cypress knees under a closed canopy. The mosquitoes are a genuine consideration, and the visitor centre keeps a mosquito meter with a needle that reaches 'War Zone' in summer, only partly as a joke.",
"The synchronous fireflies are the park's most remarkable event: for about two weeks in late May and early June, one of only a few species in the western hemisphere that flashes in unison lights the forest floor in waves. Access is by lottery, and the park limits numbers tightly to protect the display."
],

"FL-everglades-national-park": [
"The Everglades is a river, which is the single fact that makes sense of it. Water moves south from Lake Okeechobee across a limestone shelf in a sheet up to sixty miles wide and only inches deep, dropping about two inches per mile — Marjory Stoneman Douglas named it the River of Grass in 1947, and the phrase changed how the country understood it.",
"It was the first national park established to protect an ecosystem rather than scenery, in 1947, and it is a UNESCO World Heritage Site and an International Biosphere Reserve. It is also the only place on earth where alligators and crocodiles coexist, and the last refuge of the Florida panther, down to perhaps 120 to 230 adults.",
"Half the original Everglades has been drained for agriculture and development, and the remaining flow is managed through canals and pumps; the restoration effort is the largest and most expensive environmental project ever attempted. Visit in the dry season, December to April, when wildlife concentrates at the remaining water and the mosquitoes are tolerable."
],

"FL-biscayne-national-park": [
"Biscayne is 95 per cent water. It protects the northernmost Florida Keys, the clear shallow bay around them, mangrove shoreline and the start of the only living coral barrier reef in the continental United States — and almost none of it can be seen without a boat.",
"That makes it the national park most people drive past without noticing, despite sitting on the edge of Miami. The visitor centre has a view and a short shoreline walk; everything else requires a boat trip, a snorkel or a dive. The Maritime Heritage Trail links six shipwrecks spanning a century, several shallow enough to snorkel.",
"The reef is in trouble — bleaching from heat, disease and storm damage have hit it hard — which the park is open about. There are also the remains of Stiltsville, wooden houses built on pilings in the shallows from the 1930s, of which a handful survive as a peculiar monument to Miami's looser decades."
],

"FL-dry-tortugas-national-park": [
"Dry Tortugas is seventy miles west of Key West, reachable only by ferry, seaplane or private boat, and it is 99 per cent open water. Ponce de León named the islands for the turtles in 1513, and 'dry' was added to warn sailors there was no fresh water — which is still true.",
"Fort Jefferson dominates Garden Key: a hexagonal masonry fort of over 16 million bricks, the largest brick structure in the Americas, begun in 1846 and never finished or fully armed. It served as a prison during and after the Civil War, most famously holding Dr Samuel Mudd, who set John Wilkes Booth's leg.",
"The snorkelling directly off the beach, over the fort's moat wall and the surrounding coral, is as good as anywhere in the country and requires no boat. Ten campsites are available and selling out months ahead; staying overnight means having the fort and the stars to yourself once the day ferry leaves."
],

"AK-denali-national-park": [
"Denali is the highest peak in North America at 20,310 feet, and its vertical relief from base to summit is greater than Everest's — around 18,000 feet, because it rises from lowlands rather than from a high plateau. The Koyukon Athabascan name, meaning 'the tall one', was restored federally in 2015 after decades as Mount McKinley.",
"The mountain makes its own weather and is only fully visible about a third of the time; people spend a week in the park and never see it. The park has a single 92-mile road, and private vehicles may drive only the first fifteen miles — everyone else takes a bus, which is why wildlife here behaves as if vehicles are irrelevant and why sightings of grizzly, caribou, moose, wolf and Dall sheep are routine.",
"There are almost no maintained trails beyond the entrance area. The park is managed as open wilderness where you pick a drainage and walk, which is liberating and demanding in equal measure. Summer is brief — roughly June to early September — and the road is often damaged by landslides, with a major one at Pretty Rocks closing the western half in recent years."
],

"AK-kenai-fjords-national-park": [
"Kenai Fjords is built around the Harding Icefield, a 700-square-mile sheet of ice up to a mile thick, a remnant of the ice sheets that covered this coast. Nearly forty glaciers flow out of it, and the ones that reach the sea — tidewater glaciers — calve icebergs directly into the fjords with a noise locals call white thunder.",
"Exit Glacier is the only part reachable by road, and the walk to it passes signs marking where the ice stood in 1917, 1951, 1998 and so on — a retreat you measure in minutes of walking. The Harding Icefield Trail climbs 3,000 feet in about four miles to a view of the icefield itself, which looks like an ocean that has stopped.",
"The rest of the park is seen from a boat out of Seward. Those trips reliably produce humpback and orca whales, sea otters, Steller sea lions and puffins, and end at a glacier face where you wait for a calving. It is wet, cold and worth it."
],

"AK-glacier-bay-national-park": [
"When George Vancouver sailed past in 1794 there was no bay here — just a wall of ice five miles wide and 4,000 feet thick. By 1879, when John Muir arrived, the ice had retreated some 48 miles. It is the fastest documented glacial retreat anywhere, and it opened a 65-mile fjord that is now the park's centrepiece.",
"That retreat created a natural laboratory for succession: the land nearest the ice is bare rock, and as you travel down the bay you pass through lichen, then alder and willow, then spruce forest, each stage corresponding to how long ago the ice let go. Ecologists have worked here for over a century because of it.",
"It is a Huna Tlingit homeland, and the ice advance that created the bay drove them out of their villages — a history the park now tells in partnership with the tribe, which opened a tribal house at Bartlett Cove in 2016. Most visitors see it from a cruise ship; the smaller day boat from Bartlett Cove gets closer and has a ranger aboard."
],

"AK-katmai-national-park": [
"Katmai was established because of a volcano and is famous because of bears. The 1912 eruption of Novarupta was the largest of the twentieth century anywhere — ten times the volume of Mount St. Helens — burying a valley in ash hundreds of feet deep. Robert Griggs, exploring in 1916, found thousands of steam vents and named it the Valley of Ten Thousand Smokes.",
"The vents have long since cooled, and the draw now is Brooks Falls, where sockeye salmon leap a six-foot waterfall in July and brown bears stand at the lip catching them mid-air. Viewing platforms put you remarkably close, and the park's live webcams have made individual bears internationally recognisable.",
"The bear population is around 2,200, among the densest concentrations anywhere, sustained by one of the world's great salmon runs. There is no road in — you fly, usually by float plane from King Salmon — and July and September are the two peak months for bear activity."
],

"AK-wrangell-st-elias-national-park": [
"Wrangell–St. Elias is the largest national park in the United States by an enormous margin: 13.2 million acres, bigger than Yellowstone, Yosemite and Switzerland put together. Nine of the sixteen highest peaks in the country are inside it, and Mount St. Elias at 18,008 feet rises from tidewater to summit in about ten miles, one of the steepest relief gradients on earth.",
"Four mountain ranges converge here, and the park holds the largest non-polar icefield in the world along with glaciers of absurd scale — the Malaspina Glacier alone is larger than Rhode Island, spreading out at the base of the mountains in a piedmont lobe visible from orbit. Mount Wrangell is still an active volcano, steaming quietly.",
"The human story centres on copper. The Kennecott mine, worked from 1911 to 1938, extracted some of the richest copper ore ever found, and the fourteen-storey red mill building still stands in the valley at McCarthy, now stabilised by the park service as a national historic landmark. Getting there means sixty miles of gravel road and a footbridge.",
"Two rough roads penetrate the park and the rest is bush-plane country. It receives a small fraction of the visitors that Denali does despite being six times the size, and the solitude is the point: you can walk for days and see nobody, on glaciers, river bars and tundra that have never been surveyed on foot."
],

"AK-gates-of-the-arctic-national-park": [
"Gates of the Arctic is entirely north of the Arctic Circle and has no roads, no trails, no campsites and no facilities of any kind. It is the second-largest national park in the country and consistently the least visited — often fewer than 10,000 people in a year, and many of those are counted passing through rather than staying.",
"The name comes from wilderness advocate Bob Marshall, who in the 1930s called two mountains flanking the North Fork of the Koyukuk River — Frigid Crags and Boreal Mountain — the gates to the Arctic. He spent years exploring and mapping the Brooks Range here and argued for leaving it permanently roadless, which is what happened.",
"The park protects a huge stretch of the central Brooks Range and the migration corridor of the Western Arctic caribou herd, which numbers in the hundreds of thousands and moves through on a seasonal circuit. Grizzlies, wolves, Dall sheep and moose live here at low density, and six designated Wild and Scenic Rivers run out of the mountains.",
"Visiting means a bush plane from Bettles or Coldfoot, full self-sufficiency, and the ability to navigate and handle emergencies with no prospect of quick rescue. Eleven Nunamiut and Athabascan communities retain subsistence rights within the park, and people have lived in these valleys for some 13,000 years — so it is not empty, merely unbuilt."
],

"AK-kobuk-valley-national-park": [
"Kobuk Valley is the least visited national park in the system, with visitor numbers sometimes in the hundreds. It has no roads and no trails, lies entirely above the Arctic Circle, and is reached by air charter from Kotzebue or Bettles.",
"Its improbable feature is sand. The Great Kobuk Sand Dunes cover about 20,000 acres — a genuine dune field 35 miles above the Arctic Circle, produced by glaciers grinding rock to powder and wind piling it up. Summer surface temperatures on the sand can reach 100°F.",
"The park exists principally for the caribou. Around 200,000 animals of the Western Arctic herd cross the Kobuk River here twice a year, at Onion Portage, and have done for some 9,000 years — one of the longest continuously used hunting sites in the Americas, and still used by Iñupiat families today."
],

"AK-lake-clark-national-park": [
"Lake Clark compresses an improbable amount into one park: two active volcanoes, the Chigmit Mountains where the Alaska and Aleutian ranges collide, a 42-mile turquoise lake, salt marsh on Cook Inlet and a major salmon fishery. There is no road access at all — everything arrives by float plane from Anchorage, about an hour away.",
"The coastal meadows at Chinitna Bay and Silver Salmon Creek are among the most reliable brown bear viewing anywhere, with bears digging clams and grazing sedge in the open, often with cubs. Guides work on foot here rather than from platforms.",
"Dick Proenneke's hand-built cabin at Upper Twin Lake is the park's quiet landmark. He arrived in 1968, built it with hand tools he largely made himself, and lived there mostly alone for about thirty years while filming and journaling; the cabin is preserved and his footage became the documentary *Alone in the Wilderness*."
]

};
