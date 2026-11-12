/* ===========================================================
   LONGFORM — CITIES

   A proper introduction to a place, before any list of things to do.
   A one-line summary tells you nothing you could not guess from the
   name; these try to say what the city actually is, how it got that
   way, and what it feels like to be in.

   placeId -> [ paragraph, paragraph, ... ]

   Written here rather than fetched. The free sources give either a
   dictionary definition or a wall of tourist-board adjectives, and
   neither is worth reading. Facts kept to the durable kind —
   founding, geography, industry, layout, what a place is known for —
   and away from anything that changes with a season or a mayor.
   =========================================================== */

const LONGFORM_CITIES = {

"NY-new-york-city": [
"New York is less a single city than five of them stapled together in 1898, and the seams still show. Manhattan is the one on the postcards — a granite island thirteen miles long where the street grid above 14th Street was laid out in 1811 by men who imagined a city that did not yet exist, and below it the tangle of colonial lanes that came first. Brooklyn would be the fourth-largest city in America on its own. Queens is the most linguistically diverse place on earth, with something near 200 languages spoken inside its borders.",
"The density is the point. Roughly 8.5 million people live in about 300 square miles, and almost nobody drives — the subway runs 24 hours a day, every day, which is true of almost no other system in the world. That single fact shapes everything: you can eat at 3am, the neighbourhoods stay mixed rather than sorting themselves by car ownership, and a visitor without a plan will still stumble into things.",
"Come with fewer ambitions than you think you need. The museums alone — the Met, MoMA, the Natural History Museum, the Frick — would take a fortnight done properly. The more rewarding version of a first visit is to pick one or two neighbourhoods and walk them until your feet hurt: the West Village, Harlem, Astoria, Sunset Park. The landmarks are worth seeing once; the city is in the blocks between them."
],

"NV-las-vegas": [
"Las Vegas is a city that exists because of a legal accident. Nevada legalised gambling in 1931, during the construction of the Hoover Dam thirty miles away, and a dusty railroad stop found itself with a monopoly on something the rest of the country wanted. Everything since — the mob years, the corporate takeover in the 1970s, the megaresort boom of the 1990s — is a variation on that one advantage.",
"The Strip is not actually in Las Vegas. It sits in unincorporated Clark County, a four-mile stretch of Las Vegas Boulevard that was built outside the city limits to dodge city taxes, and it contains most of the largest hotels on earth. The scale is genuinely difficult to judge from photographs: the walk between two adjacent casinos can take twenty minutes, and the air-conditioned interiors are designed so that you never quite find the exit.",
"What has changed is what the city sells. Gambling is now a minority of resort revenue — the money is in restaurants, residencies, clubs and conventions. That makes it a far better city for people who do not gamble than its reputation suggests. And downtown on Fremont Street, the older, lower-ceilinged, more raffish version of Vegas is still going, ten minutes and about forty years away from the Strip."
],

"CA-los-angeles": [
"Los Angeles is the hardest major American city to see, because it refuses to have a centre. It is a basin roughly the size of Connecticut, ringed by mountains that trap both the light and the smog, filled with dozens of districts that function as separate towns: Santa Monica and Silver Lake and Koreatown and Watts have about as much in common as cities in different states. Visitors who try to 'do' LA in the way they would do Paris come away baffled. Pick a side of town and stay there.",
"It became what it is through water and film. The Owens Valley aqueduct, finished in 1913, let a semi-arid plain support millions of people; the movie industry arrived at roughly the same moment, drawn by reliable sunshine and by distance from Edison's patent enforcers on the East Coast. The studios made the city's image, and the city has been negotiating with that image ever since.",
"The real pleasures are ordinary ones: the food, which is the best and most varied in the country if you are willing to drive to strip malls; the hiking, which starts inside the city limits in Griffith Park and the Santa Monicas; and the light in the hour before sunset, which is a genuine physical phenomenon and not an invention of cinematographers."
],

"IL-chicago": [
"Chicago burned down in 1871 and rebuilt itself into the most architecturally serious city in America. The fire cleared the ground; the need to build tall on soft soil near a lake produced the steel frame, and with it the skyscraper. You can read the whole history of the form within a few blocks of the Loop, from the Rookery to the Monadnock to the Willis Tower, and the boat tour along the river is the rare tourist activity that is also the best way to understand a city.",
"It sits at the point where the Great Lakes almost touch the Mississippi watershed, which is why it exists at all. That portage made it the hinge between the eastern seaboard and the western interior: the railroads, the stockyards, the grain trade and the commodity exchanges all followed, and so did waves of Polish, Irish, German, Mexican and — in the Great Migration — Black Southern arrivals who reshaped the city and its music.",
"Winter is genuinely difficult and the city does not pretend otherwise. But the lakefront is the great democratic space of American urbanism — eighteen miles of public shoreline, protected from development by a century of stubborn litigation — and in summer the whole city moves outdoors onto it."
],

"FL-miami": [
"Miami is the northernmost city of Latin America as much as the southernmost of the United States. More than two-thirds of residents are Hispanic and a majority of the population was born abroad; Spanish is not a second language here so much as a parallel first one. The character of the place was set in waves — Cubans after 1959, Haitians, Nicaraguans, Colombians, Venezuelans — each arrival layering onto the last.",
"It is also young and artificial in a way that surprises people. Incorporated in 1896 with barely 300 residents, much of what you walk on is dredged fill, and Miami Beach is a barrier island connected by causeways. The Art Deco district in South Beach, built in a burst through the 1930s, was close to demolition in the 1970s before preservationists won — which is why a few hundred pastel buildings survive as the largest concentration of the style anywhere.",
"The heat and humidity from June to September are serious, and so is hurricane season. Winter is the real season here: dry, warm, and the reason the city filled up in the first place. Neighbourhoods reward wandering — Little Havana, Wynwood, Coconut Grove, Little Haiti — far more than the beach does."
],

"DC-washington": [
"Washington was drawn on paper before it was built, which is unusual for an American city and explains almost everything about how it looks. Pierre L'Enfant's 1791 plan laid grand diagonal avenues over a grid, with sightlines deliberately aimed at the Capitol and the President's house. A height limit, in force since 1910 and tied to street width rather than to the Washington Monument as legend has it, keeps the skyline low and the monuments dominant.",
"The federal city is only part of it. Washington is a real place with neighbourhoods that predate the government's expansion — Georgetown was a tobacco port before the capital existed — and a Black cultural history, centred on U Street and Howard University, that earned it the name 'Black Broadway' in the first half of the twentieth century. The city got a vote for president only in 1961 and still has no voting representation in Congress, a grievance printed on the licence plates.",
"For a visitor the remarkable fact is that nearly all of it is free. The Smithsonian museums, the National Gallery, the monuments, the Library of Congress — no admission. The memorials are open and lit around the clock, and the Lincoln Memorial at midnight with nobody else on the steps is a different experience entirely from the same place at noon."
],

"GA-atlanta": [
"Atlanta exists because of a railroad survey. It began in 1837 as the terminus of a line pushing south from Chattanooga, was called Terminus and then Marthasville before settling on a feminisation of 'Atlantic', and has been a transport hub ever since — first rail, now the world's busiest airport. The city has no river port, no natural harbour and no obvious geographic reason to be there; it is a junction that grew.",
"Sherman burned it in 1864 and the phoenix on the city seal is not subtle about it. But the more consequential history is the twentieth century: Atlanta was the organising centre of the civil rights movement, home to Martin Luther King Jr., Ebenezer Baptist Church, and the cluster of historically Black colleges that trained much of its leadership. The King National Historical Park on Auburn Avenue is the essential visit here.",
"Modern Atlanta is sprawling, green — the tree canopy is among the densest of any large American city — and culturally enormous out of proportion to its size, having become the centre of gravity for hip-hop and for film and television production. The BeltLine, a ring of former rail corridor being converted to trail and park, is slowly stitching the in-town neighbourhoods back together."
],

"CA-san-diego": [
"San Diego has the most agreeable climate of any large city in the United States and has built a fairly relaxed civilisation on top of it. The daily temperature swings about ten degrees and the annual swing is not much larger; it rains in winter, a little, and then mostly does not. The result is a city that lives outdoors with none of the urgency of places where good weather is a brief seasonal gift.",
"It was the first European settlement on the west coast — the Spanish mission dates to 1769 — and sat relatively quiet until the navy arrived. The military is still the city's largest economic force, and the harbour full of grey ships is as much a part of the view as the beaches. Balboa Park, built for the 1915 exposition and now holding seventeen museums and the zoo, is the other great legacy project.",
"The coastline does most of the work: La Jolla's coves and sea caves, the long flat sand at Coronado, the surf breaks running north through Pacific Beach and Encinitas. And the Mexican border is twenty minutes away, which means the food — particularly the fish tacos and the carne asada — is not an imitation of anything."
],

"TX-houston": [
"Houston is the least zoned major city in America, and it looks like it: a glass tower, a taqueria, a refinery and a mansion can occupy the same half-mile. Many find this ugly on arrival and interesting by the end of the week. It is the result of a deliberate civic choice — voters have rejected zoning three times — and it keeps the city cheap to build in and startlingly easy to move to.",
"The oil and the ship channel made it. A 1901 strike at Spindletop and a dredged bayou turned a swampy trading post into the energy capital of the world, and then the Manned Spacecraft Center arrived in 1961 and added the other half of the identity — which is why the first word spoken from the surface of the moon was 'Houston'. The Texas Medical Center, the largest medical complex on earth, is the third pillar.",
"It is now the most ethnically diverse large city in the United States, and the food is the best argument for the place: Vietnamese, Nigerian, Salvadoran, Indian and Gulf Coast cooking, usually in a strip mall, usually excellent. Summer is brutally hot and humid; from November to April it is genuinely pleasant."
],

"TX-dallas-fort-worth": [
"Dallas and Fort Worth are thirty miles apart and have spent most of their histories insisting they are nothing alike. Dallas is the banking, insurance and fashion city — glass, commerce, and an eye on itself. Fort Worth was the last stop on the Chisholm Trail and still runs cattle drives through the Stockyards twice a day, with some irony and some sincerity. The old line is that Fort Worth is where the West begins and Dallas is where the East peters out.",
"Neither had a natural reason to exist — no port, no mountain pass, barely a river worth the name — so both were built on railroads, cattle and, later, oil money that was made elsewhere in Texas and spent here. That money bought culture: Fort Worth's museum district is extraordinary for a city its size, with the Kimbell in a Louis Kahn building that architects travel to see.",
"Dallas carries a heavier memory. Dealey Plaza, where Kennedy was shot in 1963, is smaller in person than the footage suggests, and the Sixth Floor Museum in the old book depository handles it soberly. Summers are long and hot; spring brings wildflowers and the occasional serious storm."
],

"CA-san-francisco": [
"San Francisco occupies the tip of a peninsula seven miles square, which is why it feels so dense and why it runs out of room so dramatically at the water. The hills were an engineering problem that produced the cable cars; the fog is a summer phenomenon caused by inland heat pulling marine air through the Golden Gate, which is why August can be colder than October and why visitors in shorts look so miserable.",
"It was a village of about 800 people in 1848 and roughly 25,000 within two years, which is the whole character of the city in one fact: it arrives in booms. Gold, silver, the 1906 earthquake and rebuilding, the war shipyards, the counterculture, and then successive waves of technology money that have made it one of the most expensive places in the world and sharpened its inequalities into something impossible to ignore.",
"The pleasures are compact and specific: walking the Golden Gate Bridge, which is almost always windy and often fogbound; the Mission for burritos and murals; Golden Gate Park, which is larger than Central Park; and the fact that you can be in redwoods or vineyards within an hour in either direction."
],

"PA-philadelphia": [
"Philadelphia was the largest city in the American colonies and the capital of the new country until 1800, and it has the buildings to prove it: Independence Hall, where both the Declaration and the Constitution were argued into existence, sits in a compact historic district you can cross on foot in ten minutes. William Penn laid the city out in 1682 on a grid with five public squares, the first planned city of its kind in America, and that grid still governs how you move around.",
"After the capital left, it became an industrial city — textiles, locomotives, shipbuilding — and then spent the second half of the twentieth century losing those industries and a third of its population. What survived is a city of rowhouses and distinct, stubborn neighbourhoods, a very large amount of public art, and a reputation for bluntness that locals cultivate rather than apologise for.",
"The museums punch far above the city's current size — the Philadelphia Museum of Art, the Barnes Foundation's extraordinary and eccentrically hung collection, the Mütter's medical oddities. And the food argument is not really about cheesesteaks: the roast pork sandwich with sharp provolone and broccoli rabe is what people here will tell you to order."
],

"AZ-phoenix": [
"Phoenix is named for a city built on the ruins of another. The Hohokam people irrigated this valley with hundreds of miles of hand-dug canals from roughly 450 to 1450 CE, then abandoned it; nineteenth-century settlers found the canal beds, cleared them and farmed the same ground. Much of the modern canal system follows those original lines.",
"It is the hottest major city in the United States and the fifth largest, a combination that makes sense only because of air conditioning and the Colorado River. Summer highs sit above 100°F for months and nights barely cool, so the city inverts: life happens early, late and indoors from June to September, and the good season runs from October to April, when it is reliably perfect.",
"The desert is the reason to come, and it is closer than it looks. South Mountain and Camelback are inside the city, the Desert Botanical Garden explains what you are looking at, and an hour or two will put you in Sedona's red rock or at the edge of the Sonoran saguaro forest — a cactus that lives two hundred years and grows its first arm at around seventy."
],

"CA-anaheim": [
"Anaheim was founded in 1857 by German winemakers — the name joins the Santa Ana River to *Heim*, home — and spent its first century as farmland. Then in 1955 Walt Disney bought 160 acres of orange grove beside a new freeway, and the town became something else entirely: the template for the modern resort city, where almost everything within walking distance exists to serve visitors.",
"Disneyland is the original park and is noticeably different from its Florida successor: smaller, denser, walkable, and still carrying details Walt Disney personally signed off on. That compactness is the argument for coming here rather than to Orlando — you can do it without a car, and two parks sit side by side.",
"Beyond the resort, Anaheim is an ordinary and largely Latino Orange County city of about 350,000, with a baseball stadium, a hockey arena, and a packing-house food hall in the old citrus district. The beaches at Huntington and Newport are twenty minutes away, and Los Angeles is forty minutes north when traffic allows, which is not always."
],

"MA-boston": [
"Boston is the oldest major city in the country and behaves like it. The street plan is famously illogical — not, despite the joke, cow paths, but the accumulated layout of a seventeenth-century port on a peninsula that has been repeatedly enlarged by landfill. The Back Bay really was a bay; Boston today is roughly three times the land area of Boston in 1630.",
"The revolutionary history is concentrated and walkable. The Freedom Trail is a red line in the pavement connecting sixteen sites over two and a half miles, which sounds like a gimmick and works extremely well: the Old State House, where the Declaration was first read to Bostonians, stands surrounded by office towers, and Paul Revere's house is the oldest building downtown.",
"It is also a student city — there are over fifty colleges in the metropolitan area, with Harvard and MIT just across the river in Cambridge — which keeps it younger and more transient than its brick-and-cobblestone image suggests. Autumn is the season to come, both for the light and because the sports, which are not optional here as a conversational topic, are all running at once."
],

"TX-san-antonio": [
"San Antonio is the oldest municipality in Texas and the least Anglicised major city in the state. It was founded as a Spanish mission and presidio in 1718, and four of the five colonial missions along the river are still standing as a national park and a UNESCO World Heritage Site — the fifth is the Alamo, which stopped being a mission long before it became a battle.",
"The Alamo itself surprises people by being small and by sitting right in the middle of downtown, surrounded by the city rather than isolated on a plain. The 1836 siege lasted thirteen days and everyone inside was killed; the building you see is the chapel, which was roofless at the time and got its famous curved gable from the US Army afterwards.",
"The River Walk is the other defining feature, and it is a Depression-era public works project rather than a natural amenity: a flood-control channel turned into a sunken promenade one level below the streets, lined with cypress trees and restaurants. The city is majority Hispanic, the Tex-Mex is the real thing, and Fiesta in April takes over the whole place for eleven days."
],

"WA-seattle": [
"Seattle is wedged between Puget Sound and Lake Washington on a strip of hills so steep that the city regraded several of them, sluicing entire slopes into the bay in the early 1900s. On a clear day Mount Rainier appears to the south at a size that first-time visitors assume must be an optical illusion — it is 14,411 feet of active volcano, sixty miles away, and locals simply say 'the mountain is out'.",
"The rain's reputation is only half-earned: the annual total is less than New York's, but it arrives as nine months of grey drizzle, which is worse for morale and better for moss. The payoff is the summer, roughly July to September, which is as good as weather gets anywhere — dry, long-lit and mild.",
"The city's economy has been boom-and-bust since the Klondike gold rush outfitted itself here in 1897: timber, Boeing, then software and online retail, each wave remaking the skyline and the rents. Pike Place Market has been running since 1907 and is a genuine working market under the theatre, and the ferries out to Bainbridge are the cheapest good view in the city."
],

"TX-austin": [
"Austin was chosen as the capital of the Republic of Texas in 1839 largely because a promoter talked the commission into it, and it stayed a modest government and university town for over a century. The University of Texas and the state legislature are still the two institutions that set the rhythm, but since the 1990s the technology industry has arrived in force and the city has roughly doubled.",
"The music claim is real and specific: a dense ecosystem of small venues, a long honky-tonk and blues tradition, the *Austin City Limits* television programme running since 1974, and South by Southwest, which began as a regional music conference in 1987 and swallowed the city every March. What locals actually complain about is that the clubs are being priced out faster than new ones open.",
"It sits on the edge of the Hill Country, which means swimming holes — Barton Springs is spring-fed, three acres, and a constant 68–70°F all year — and limestone bluffs, and good drives west in spring when the bluebonnets come up. The other local ritual is the bat colony under the Congress Avenue bridge, about 1.5 million of them, emerging at dusk from March to October."
],

"CO-denver": [
"Denver is exactly a mile above sea level — there is a step on the Capitol's west side marked for it — and the altitude is the first thing you will notice. The air is thin and dry, sunburn arrives faster, alcohol hits harder, and visitors who sprint up a flight of stairs on day one regret it. Give it a day before doing anything strenuous.",
"It began as a gold camp in 1858 on a site with no particular merit, and survived the bust by becoming the supply town and railhead for the whole Rocky Mountain interior. That role never really changed: Denver is the place you organise a mountain trip from, and the Front Range cities have grown enormously on the strength of it.",
"The mountains are not actually in the city — they are a wall on the western horizon, about an hour's drive to the first serious peaks. What the city does have is 300-odd days of sunshine a year, an enormous park system, and Red Rocks, a natural amphitheatre between two 300-foot sandstone slabs that is the best outdoor concert venue in the country and worth the trip even with nothing booked."
],

"TN-nashville": [
"Nashville is a music industry town before it is a music town, and the distinction matters. Publishing houses, studios and songwriters' rooms along Music Row are the actual engine; the honky-tonks on Lower Broadway are the shop window. The best listening is usually at a writers' round — three or four songwriters trading songs they wrote for other people — rather than at the loudest bar on the strip.",
"The Grand Ole Opry has been broadcasting since 1925, which makes it the longest-running radio programme in American history. It moved out of the Ryman Auditorium in 1974, and a circle of oak was cut from the Ryman stage and set into the new one so performers could stand on the same boards. Both venues still run shows.",
"It is also a state capital, a university town and, improbably, home to a full-scale concrete replica of the Parthenon built for Tennessee's 1897 centennial. The hot chicken is genuinely hot — the origin story involves a scorned girlfriend and an act of revenge — and ordering 'medium' is sensible advice rather than cowardice."
],

"MO-st-louis": [
"St. Louis sits just below the confluence of the Missouri and the Mississippi, which made it the gateway to everything west for the better part of a century. Lewis and Clark set out from here in 1804; the fur trade, the steamboats and then the railroads all funnelled through. The 1904 World's Fair was the city's high-water mark, and much of Forest Park — larger than Central Park, with a free zoo, art museum and history museum — is what it left behind.",
"The Gateway Arch, finished in 1965, is 630 feet tall and exactly as wide as it is high, a weighted catenary curve in stainless steel that is far stranger and more beautiful in person than in photographs. A tram of small pods carries you up the inside of the leg to a cramped viewing room at the top.",
"The city proper has lost nearly two-thirds of its peak population and the scars are visible; it is also cheap, architecturally rich in brick, and quietly serious about food, frozen custard and free museums. The neighbourhoods — the Hill for Italian cooking, Soulard for the market — repay time more than the riverfront does."
],

"FL-tampa": [
"Tampa grew on cigars. Vicente Martinez-Ybor moved his cigar operation here from Key West in 1885 and built Ybor City, a company town that filled with Cuban, Spanish and Italian workers and for decades produced hundreds of millions of hand-rolled cigars a year. The *lector* who read novels and newspapers aloud to the rollers is one of the better traditions in American labour history, and the brick streets and wrought iron of Ybor survive.",
"It sits on a deep bay rather than the open Gulf, so the city itself has limited beach — the famous sand is across the bay at St. Pete and Clearwater, twenty-five minutes away, and genuinely among the best in the country. The Riverwalk has turned the downtown waterfront into something walkable, which it was not twenty years ago.",
"Summer is hot, humid and reliably stormy in the afternoon; the Tampa Bay area gets more lightning than almost anywhere in the United States. The season to visit runs from November to April, which is also when the city is busiest and most expensive."
],

"MN-minneapolis": [
"Minneapolis and St. Paul sit on opposite banks of the Mississippi and are not interchangeable: St. Paul is older, Catholic, Irish and German, with the state capitol and a street plan that wanders; Minneapolis is younger, grid-planned, Scandinavian in origin and more inclined to knock buildings down. Locals find the distinction obvious and visitors usually do not.",
"The river built both. St. Anthony Falls is the only true waterfall on the Mississippi, and it powered the flour mills that made Minneapolis the milling capital of the world — Pillsbury and General Mills both began here. The Mill City Museum is built inside the ruins of one that burned, which is a better way to tell that story than a plaque.",
"Winter is long and genuinely cold, and the civic response has been to build a seven-mile skyway system and then to refuse to stay indoors anyway: the chain of lakes inside the city fills with skaters, and the park system is consistently rated the best in the country. The Walker Art Center and its sculpture garden are the cultural anchor."
],

"LA-new-orleans": [
"New Orleans was French, then Spanish, then French again for twenty days, then American from 1803, and the layering never resolved into anything else. The result is a city with its own legal system inherited from the Napoleonic code, its own vocabulary, its own calendar organised around Carnival, and an architecture — the French Quarter is mostly Spanish, built after fires in 1788 and 1794 — that belongs to nowhere else in the country.",
"It sits in a bowl between the Mississippi and Lake Pontchartrain, much of it below sea level, which is the central fact of its existence. Hurricane Katrina in 2005 flooded roughly 80 per cent of the city when the levees failed; the population has still not fully returned, and the recovery is uneven block by block in a way that is visible as you walk.",
"The food and the music are not tourist attractions bolted on — they are the local culture, and both are best away from Bourbon Street. Gumbo, red beans on a Monday, beignets at any hour; brass bands, second lines, and Preservation Hall, which has no bar, no amplification and forty-five minutes of the real thing on a wooden bench."
],

"NC-charlotte": [
"Charlotte is the second-largest banking centre in the United States after New York, which is not an obvious destiny for a town named after a queen consort in 1768. The explanation is regulatory: North Carolina permitted statewide branch banking long before most states did, letting local banks grow large enough that when interstate banking opened up in the 1980s and 90s they were the ones doing the acquiring.",
"That has given it a glass-and-steel downtown — called Uptown here, for reasons involving an old street grid — that empties somewhat at weekends, surrounded by leafy, pleasant and increasingly expensive neighbourhoods. The city has grown very fast and is still working out what it wants to be beyond a place to work.",
"The draws are specific rather than sweeping: the NASCAR Hall of Fame, in a sport whose roots are genuinely local; the US National Whitewater Center, an artificial river built for Olympic training and open to anyone; and the Blue Ridge Mountains about two hours west, which is the real reason many people move here."
],

"IN-indianapolis": [
"Indianapolis was chosen as Indiana's capital in 1821 for the straightforward reason that it was in the middle of the state, and it was laid out in a wheel of diagonal avenues around a central circle in conscious imitation of Washington. The White River turned out to be unnavigable, so the city's fortunes waited for the railroads — and then for the automobile.",
"The Indianapolis Motor Speedway opened in 1909 and was paved with 3.2 million bricks, which is why it is called the Brickyard and why a yard of the original surface is still exposed at the start-finish line. The Indianapolis 500 has run since 1911 and remains the largest single-day sporting event in the world, with a capacity north of 250,000.",
"Away from the track it is an unusually manageable city: a compact downtown you can walk, the Cultural Trail connecting the districts, an excellent children's museum that is the largest of its kind anywhere, and a war memorial plaza modelled on the Mausoleum at Halicarnassus. It is also cheap, which is why conventions like it."
],

"MI-detroit": [
"Detroit was the fourth-largest city in America in 1950 with 1.85 million people; it now has around 630,000. No other major American city has lost population on that scale, and the consequences — vacant land, demolished blocks, a 2013 bankruptcy that was the largest municipal filing in US history — are the first thing most visitors have heard about and the least interesting thing about being there now.",
"It was the city that put the world on wheels. Ford's moving assembly line at Highland Park in 1913 cut the time to build a Model T from twelve hours to about ninety minutes, and the five-dollar day that followed drew hundreds of thousands of workers north, including the Great Migration that reshaped Black America. Motown followed the same logic: Berry Gordy applied assembly-line thinking to records in a house on West Grand Boulevard.",
"What is there now is a dense, walkable core that has been substantially rebuilt, an art museum whose collection survived the bankruptcy intact and includes Diego Rivera's enormous *Detroit Industry* murals, and some of the best architecture of the 1920s anywhere, built with money that left and preserved by the fact that nobody could afford to replace it."
],

"FL-fort-lauderdale": [
"Fort Lauderdale has about 165 miles of navigable waterways inside the city, which is why it gets called the Venice of America without too much embarrassment. The canals were dredged from mangrove swamp in the 1920s land boom, and the result is a city where a great many houses have a boat behind them and the yachting industry is a serious part of the economy.",
"It spent the 1960s and 70s as the American spring break capital — the 1960 film *Where the Boys Are* was set here and did the damage — and then spent the 1980s deliberately dismantling that reputation with ordinances and redevelopment. What replaced it is calmer and considerably more expensive: a cleaned-up beachfront promenade, Las Olas Boulevard for restaurants, and a large cruise port at Port Everglades.",
"The beach is wide, the water is warm from spring through autumn, and the Everglades begin half an hour inland. Winter is the season; summer is hot, wet and the heart of hurricane risk, which runs officially from June to November."
],

"HI-honolulu": [
"Honolulu sits on Oʻahu, which is the third-largest Hawaiian island but holds about seventy per cent of the state's population. The city runs along the south shore beneath the Koʻolau range, a wall of fluted green cliffs that is the eroded remnant of a shield volcano, and the trade winds blow almost constantly from the northeast, which is what makes the heat bearable.",
"It became the capital of the Hawaiian Kingdom in 1845, and ʻIolani Palace downtown is the only royal palace on American soil — it had electric lighting before the White House. The kingdom was overthrown in 1893 by American business interests with the help of US marines, a history the state now teaches plainly and which is worth understanding before you arrive.",
"Pearl Harbor is on the western edge of the city, and the USS *Arizona* Memorial sits above the sunken hull, which still seeps a small amount of oil. Waikīkī is a dense resort strip with genuinely good beginner surf; the rest of the island — the North Shore in winter, the windward coast, the ridge hikes — is where most of the island's character actually lives."
],

"MO-kansas-city": [
"Kansas City is two cities with one name on either side of a state line, and the one people mean is in Missouri. It grew as a cattle and rail town — the stockyards were second only to Chicago's — and it has the same inheritance of meat, money and music that implies.",
"The jazz history is specific and consequential. Under the Pendergast political machine in the 1920s and 30s, Prohibition was effectively unenforced, clubs along 18th and Vine ran all night, and the jam-session culture that developed there produced Count Basie's band and a teenage Charlie Parker. The American Jazz Museum and the Negro Leagues Baseball Museum share a building in the same district, which is the right pairing.",
"The barbecue is a distinct regional style — a wide range of meats, slow-smoked, with a thick tomato-and-molasses sauce — and burnt ends, the caramelised points of the brisket, were a local throwaway before they became the thing people queue for. The city also claims more boulevards than Paris and more fountains than anywhere but Rome, and makes rather a lot of both claims."
],

"UT-salt-lake-city": [
"Salt Lake City was founded in 1847 by Mormon pioneers who had walked and ridden over a thousand miles to get somewhere nobody else wanted, and the city they laid out is still legible: enormous blocks, streets ten rods wide so a wagon team could turn around, and an address system counted outward from Temple Square in a grid so logical it is almost impossible to get lost.",
"The Great Salt Lake to the northwest is a terminal lake with no outlet — water arrives and only leaves by evaporation, which is why it is saltier than the ocean and why it has been shrinking alarmingly. The Wasatch Range rises straight out of the eastern edge of the city to 11,000 feet, and the canyons cut into it are fifteen to forty minutes from downtown.",
"That proximity is the point. The snow here is unusually dry because storms cross the desert and then dump on the mountains, and several major resorts sit within an hour of the airport, which is a combination almost nowhere else manages. Summer swaps skiing for hiking and the red rock of southern Utah is a half-day's drive south."
],

"OR-portland": [
"Portland got its name from a coin toss in 1845 — the other man wanted Boston — and that is roughly the tone of the place. It sits where the Willamette meets the Columbia, hemmed in by hills, with Mount Hood on the eastern horizon and an urban growth boundary that has deliberately kept the city compact since 1979 rather than letting it sprawl.",
"It is a city of small, defined quadrants and short blocks — 200 feet, half the usual length, which makes it unusually good to walk. Powell's occupies a full city block and claims to be the largest independent bookshop in the world; Forest Park, inside the city, is over 5,000 acres of second-growth woodland with eighty miles of trail.",
"The rain is persistent from October to May and rarely heavy — people genuinely do not use umbrellas. The compensation is that everything is green, the coast is ninety minutes west, the Columbia River Gorge with its waterfalls is thirty minutes east, and the Willamette Valley south of the city makes some of the best Pinot Noir outside Burgundy."
],

"SC-myrtle-beach": [
"Myrtle Beach is the centre of the Grand Strand, sixty miles of almost continuous sand running up the South Carolina coast. It was farmland and forest until a rail line reached it in 1900, and it has been a working-class family beach resort ever since — which is still the honest description, despite waves of condominium building.",
"The water is warm enough to swim from roughly May to October, the sand is wide and gently sloped, and the town's other great industry is golf: something like ninety courses sit within easy reach, and the shoulder seasons exist largely to serve them. Mini-golf is a genuine local art form, with dozens of elaborately themed courses along the strip.",
"It is loud, commercial and unpretentious, and anyone expecting Charleston will be unhappy. Those looking for something quieter can find it at either end — Murrells Inlet to the south has the marsh walk and the seafood, and Huntington Beach State Park nearby has the alligators and the best birding on the coast."
],

"GA-savannah": [
"Savannah was laid out in 1733 by James Oglethorpe on a plan of repeating wards, each built around a public square, and twenty-two of the original squares survive. It is the most intact example of colonial town planning in the United States and the reason the historic district works so well on foot: you cannot walk more than a block or two without arriving in a small park under live oaks and Spanish moss.",
"The city was spared burning in 1864 — Sherman presented it to Lincoln as a Christmas gift instead — which is why so much antebellum architecture remains. That same history is inseparable from slavery: Savannah was a major port in the trade, and the First African Baptist Church and the Pin Point community are part of the fuller story the city has become better at telling.",
"It is hot and humid from June to September and glorious in spring and late autumn. The food is lowcountry — shrimp and grits, oysters, red rice — and the city's slightly gothic reputation, helped along by *Midnight in the Garden of Good and Evil*, is mostly good fun. Tybee Island and the Atlantic are twenty minutes east."
],

"FL-orlando": [
"Orlando was a cattle and citrus town of about 90,000 people when Walt Disney quietly bought 27,000 acres of swamp and scrub south of the city through shell companies in the mid-1960s, to avoid the land speculation that had hemmed in Disneyland. Walt Disney World opened in 1971, and the region has been defined by it ever since — the resort alone is roughly the size of San Francisco.",
"Four Disney parks, Universal's parks and a long list of others make this the most visited destination in the United States. The practical consequence is that nearly everything is engineered for throughput: the roads, the hotels, the ticket structures. Going in the off-season, and accepting that you cannot do it all, are the two pieces of advice that actually help.",
"There is a city underneath. Downtown Orlando and the older neighbourhoods around Lake Eola, Winter Park's brick streets and Morse Museum — which holds the world's most complete collection of Tiffany glass, including the chapel from the 1893 Chicago World's Fair — are ten minutes and an entirely different mood from the resorts. The springs north of the city, cold and clear year-round, are the other local secret."
]

};
