/* ===========================================================
   FOOD — where to eat, and what the place is known for.

   placeId -> [ [ name, what it is, why this one ] ... ]

   Long-standing institutions rather than whatever opened last year,
   because a list of new openings is wrong within a season.
   =========================================================== */

const FOOD = {
 "AK-anchorage":[
  ["Moose's Tooth","Pizza and house beer","The busiest pizzeria in the state, and the brewery across town is the same people."],
  ["Snow City Cafe","Reindeer sausage hash","Breakfast, queues, and a crab cake benedict."]],

 "AK-juneau":[
  ["Tracy's King Crab Shack","King crab legs","On the dock by the cruise berths, and worth it despite that."]],

 "AL-birmingham":[
  ["Saw's BBQ","Pulled pork with white sauce","Alabama white sauce is mayonnaise and vinegar, and it works."]],

 "AR-hot-springs":[
  ["McClard's Bar-B-Q","Ribs and tamale spread","Open since 1928, and Bill Clinton grew up eating here."]],

 "AZ-phoenix":[
  ["Pizzeria Bianco","Margherita","Chris Bianco won a James Beard award for making pizza in a former machine shop."],
  ["Barrio Café","Mexican","Cochinita pibil and guacamole made at the table, in a muraled neighbourhood."]],

 "AZ-tucson":[
  ["El Charro Café","Carne seca","The oldest Mexican restaurant in continuous family operation in the country. Beef dried in a cage on the roof."],
  ["Cafe Poca Cosa","Daily menu","Written on a chalkboard twice a day and nothing repeats."]],

 "CA-los-angeles":[
  ["Philippe the Original","French dip","Claims to have invented it in 1908. Sawdust on the floor, coffee still cheap."],
  ["Langer's Delicatessen","Hot pastrami, #19","Nora Ephron thought it was the best pastrami in America, and she had opinions."],
  ["Guelaguetza","Oaxacan mole","Koreatown, family-run, and the reason to understand mole negro."],
  ["Grand Central Market","Everything","Thirty stalls under one roof downtown, including tacos worth the queue."]],

 "CA-monterey":[
  ["Monterey's Fish House","Grilled sardines","Away from Cannery Row, which is why locals eat here. Book ahead."]],

 "CA-san-diego":[
  ["Las Cuatro Milpas","Rolled tacos","Barrio Logan, cash only, closes when the tortillas run out."],
  ["Hodad's","Burger","Ocean Beach, surfboards on the ceiling, and a burger that needs both hands."]],

 "CA-san-francisco":[
  ["Swan Oyster Depot","Oysters and crab","Eighteen stools, no tables, cash preferred, counter service since 1912."],
  ["Tartine Bakery","Morning bun","The bread that changed American baking. Go early or go to the Manufactory."],
  ["La Taqueria","Mission burrito","No rice, which starts arguments, and is the right call."],
  ["Zuni Café","Roast chicken for two","Ordered for two, takes an hour, arrives on bread salad. A San Francisco institution."]],

 "CA-santa-barbara":[
  ["La Super-Rica Taqueria","Tacos","A shack Julia Child ate at weekly, and the menu has not been modernised."]],

 "CO-denver":[
  ["Biker Jim's","Elk and reindeer sausage","Cream cheese from a caulking gun and coca-cola onions. Entirely serious."],
  ["Rioja","Spanish-Mediterranean","On Larimer Square, and the reason the city's dining got taken seriously."]],

 "CO-telluride":[
  ["Brown Dog Pizza","Detroit-style pizza","Won the World Pizza Championship in Italy with a Detroit square, which Telluride finds very funny."]],

 "CT-mystic":[
  ["Abbott's Lobster in the Rough","Hot lobster roll","Outdoor picnic tables on Noank harbour, BYO wine, closed in winter."]],

 "CT-new-haven":[
  ["Frank Pepe Pizzeria Napoletana","White clam pie","Coal-fired since 1925, and the clam pie is not optional."],
  ["Louis' Lunch","Hamburger sandwich","Claims the first hamburger, 1900, broiled vertically. No ketchup, and they mean it."]],

 "DC-washington":[
  ["Ben's Chili Bowl","Chili half-smoke","On U Street since 1958, stayed open through the 1968 riots, and still cash-friendly."],
  ["Old Ebbitt Grill","Oysters","The oldest bar in the city, and the oyster happy hour is the reason to arrive early."]],

 "FL-key-west":[
  ["Blue Heaven","Key lime pie","In a yard where Hemingway refereed boxing. Roosters wander between the tables."]],

 "FL-miami":[
  ["Versailles","Cuban","The unofficial parliament of Little Havana. Order a cortadito at the window."],
  ["Joe's Stone Crab","Stone crab claws","October to May only, because that is the season. No reservations, ever."]],

 "FL-st-augustine":[
  ["Columbia Restaurant","Paella and 1905 salad","Founded in Tampa in 1905, and the salad is tossed at the table."]],

 "GA-atlanta":[
  ["Mary Mac's Tea Room","Southern","The last of Atlanta's tea rooms. Write your own order on the pad."],
  ["Busy Bee Café","Fried chicken","On the west side since 1947, and a civil rights movement meeting place."],
  ["The Varsity","Chili dog","What'll ya have. Shouted at you since 1928."]],

 "GA-savannah":[
  ["Mrs. Wilkes' Dining Room","Family-style Southern","Ten to a table, bowls passed round, cash only, lunch only, and you clear your own plate."],
  ["The Grey","Low-country","In a restored 1938 Greyhound bus terminal, and the reason the city is a food destination now."]],

 "HI-hilo":[
  ["Cafe 100","Loco moco","They claim to have popularised it. Rice, burger, egg, gravy, and a window to order at."]],

 "HI-honolulu":[
  ["Helena's Hawaiian Food","Pipikaula short ribs","A James Beard America's Classic, family-run, and closes early."],
  ["Leonard's Bakery","Malasadas","Portuguese doughnuts, no hole, rolled in sugar, since 1952."],
  ["Ono Seafood","Poke","Ordered by the pound at a counter and eaten on a kerb. That is the correct way."]],

 "HI-kailua-kona":[
  ["Da Poke Shack","Poke bowl","Behind a condo block, and consistently rated the best on the island."]],

 "IA-des-moines":[
  ["Zombie Burger","Burger","Over-the-top by design, in the East Village, and the milkshakes are the same."]],

 "ID-boise":[
  ["Fork","Idaho trout","Locally sourced to a fault, in a 1910 bank building downtown."]],

 "IL-chicago":[
  ["Lou Malnati's","Deep dish","The butter crust and the sausage patty. Order it when you sit down — it takes 45 minutes."],
  ["Al's Beef","Italian beef","Ordered dipped, eaten standing, leaning forward. The original on Taylor Street."],
  ["Portillo's","Chicago dog","Dragged through the garden: mustard, relish, onion, tomato, sport pepper, celery salt. Never ketchup."]],

 "IN-indianapolis":[
  ["St. Elmo Steak House","Shrimp cocktail","The horseradish is so strong it is served as a dare. Since 1902."]],

 "KS-kansas-city":[
  ["Joe's Kansas City Bar-B-Que","Burnt ends","The Kansas side, in the petrol station, and the original of the two."]],

 "KY-louisville":[
  ["The Brown Hotel","Hot Brown","Invented here in 1926: turkey, bacon, Mornay, under the grill. Order it where it started."],
  ["Jack Fry's","Pork chop","Open since 1933, originally a bookmaker's front, now the city's best dining room."]],

 "LA-new-orleans":[
  ["Café du Monde","Beignets and café au lait","Open since 1862 and almost always open now. Do not wear black."],
  ["Willie Mae's Scotch House","Fried chicken","A Treme institution rebuilt by volunteers after Katrina."],
  ["Commander's Palace","Creole","Turtle soup and bread pudding soufflé in the Garden District, since 1893. Jacket preferred."],
  ["Cochon","Cajun","Whole-hog cooking done seriously, in the Warehouse District."]],

 "MA-boston":[
  ["Neptune Oyster","Lobster roll","Warm with butter, not cold with mayonnaise. Forty-two seats and no reservations."],
  ["Union Oyster House","Oysters","The oldest restaurant in continuous service in the United States, 1826."],
  ["Mike's Pastry","Cannoli","In the North End, cash, and the boxes are tied with string you will see all over the city."]],

 "MA-salem":[
  ["Turner's Seafood","Lobster bake","In Lyceum Hall, where Alexander Graham Bell made the first long-distance call."]],

 "MD-annapolis":[
  ["Cantler's Riverside Inn","Steamed blue crabs","Brown paper, wooden mallet, Old Bay, and a dock to arrive at by boat."]],

 "MD-baltimore":[
  ["Faidley's Seafood","Jumbo lump crab cake","In Lexington Market, broiled not fried, eaten standing at a counter."]],

 "ME-bar-harbor":[
  ["Thurston's Lobster Pound","Steamed lobster","Picked from a tank, eaten on a dock in Bernard with a bib and a view."]],

 "ME-portland":[
  ["Eventide Oyster Co.","Brown butter lobster roll","On a steamed bun, which started an argument and won it."],
  ["Duckfat","Belgian fries","Fried in duck fat, with a poutine that justifies itself."]],

 "MI-detroit":[
  ["Buddy's Pizza","Detroit-style square pizza","Invented in this building in 1946, in blue steel pans from the car plants."],
  ["Lafayette Coney Island","Coney dog","Next door to its rival American Coney Island. Pick one and commit."]],

 "MI-mackinac-island":[
  ["Grand Hotel dining room","Pecan ball","Five courses, a dress code, and a dessert the hotel is known for."]],

 "MN-minneapolis":[
  ["Matt's Bar","Jucy Lucy","Cheese sealed inside the patty. Spelled their way, and it will burn your mouth."]],

 "MO-kansas-city":[
  ["Joe's Kansas City Bar-B-Que","Z-Man sandwich","Inside a working petrol station, and still worth the detour."],
  ["Arthur Bryant's","Burnt ends","The sauce is gritty and that is deliberate. Trueman Capote and presidents have eaten here."]],

 "MO-st-louis":[
  ["Pappy's Smokehouse","Dry-rub ribs","Smoked over apple and cherry, and they stop when they sell out."],
  ["Ted Drewes","Frozen custard","A concrete, served upside down to prove it is thick enough. On old Route 66."]],

 "MS-biloxi":[
  ["Mary Mahoney's","Gumbo","In a 1737 French house, one of the oldest buildings on the Gulf Coast."]],

 "MT-whitefish":[
  ["Loula's Café","Pie","Nine kinds daily, and the huckleberry is the one if it is on."]],

 "NC-asheville":[
  ["Buxton Hall Barbecue","Eastern-style pork","Whole hog over wood, in a former skating rink, with banana pudding after."],
  ["12 Bones Smokehouse","Blueberry chipotle ribs","Lunch only, weekdays only, and the Obamas went twice."]],

 "NC-charlotte":[
  ["Price's Chicken Coop","Fried chicken","Takeaway only, cash only, and a queue of office workers at noon."]],

 "NE-omaha":[
  ["Block 16","Croque Garcon burger","A fried egg and a hash brown on top. A former food truck that stayed."]],

 "NH-portsmouth":[
  ["Row 34","Oysters","Their own oyster farm up the coast, and a raw bar to work through."]],

 "NM-albuquerque":[
  ["Frontier Restaurant","Sweet roll and green chile","Opposite the university, open since 1971, enormous, and the sweet roll is the move."],
  ["Mary & Tito's Café","Carne adovada","A James Beard America's Classic, and the stuffed sopaipilla is why."]],

 "NM-santa-fe":[
  ["The Shed","Red chile enchiladas","In a 1692 adobe off the plaza. Book, or wait."],
  ["Cafe Pasqual's","Huevos motuleños","Open since 1979, murals by Leovigildo Martinez, communal table if you are alone."]],

 "NM-taos":[
  ["Love Apple","New Mexican","In a former chapel, by candlelight, cash only, and tiny. Book."]],

 "NV-las-vegas":[
  ["Lotus of Siam","Northern Thai","In a strip mall, and has been the best Thai restaurant in the country for twenty years."],
  ["Raku","Robata","Open until three in the morning for the city's own chefs after their shifts."]],

 "NY-buffalo":[
  ["Anchor Bar","Buffalo wings","Invented here in 1964. Medium is the baseline, and blue cheese, not ranch."],
  ["Ted's Hot Dogs","Charcoal-broiled hot dog","A local chain since 1927, with loganberry to drink."]],

 "NY-new-york-city":[
  ["Katz's Delicatessen","Pastrami on rye","Hand-carved since 1888. Keep the ticket they give you at the door or you pay a penalty."],
  ["Russ & Daughters","Appetizing","Smoked fish and bagels from a 1914 Lower East Side counter, still in the family."],
  ["Di Fara","Pizza","Dom DeMarco made every pie himself for sixty years in Midwood. Worth the subway ride."],
  ["Peter Luger","Porterhouse","Brooklyn, 1887, cash or their own card only, and the steak comes already sliced."]],

 "OH-cincinnati":[
  ["Skyline Chili","Three-way","Cinnamon-spiced chili on spaghetti under a mound of shredded cheddar. It makes sense locally."],
  ["Graeter's","French pot ice cream","Two-gallon batches, hand-paddled, with chocolate chips the size of a thumb."]],

 "OH-cleveland":[
  ["Slyman's","Corned beef sandwich","A pound of it, hand-cut, and you will not finish it."],
  ["West Side Market","Everything","Bratwurst, pierogi and crepes under a 1912 vaulted tile ceiling."]],

 "OK-oklahoma-city":[
  ["Cattlemen's Steakhouse","Ribeye","In Stockyards City since 1910, and it was once won in a dice game."]],

 "OR-portland":[
  ["Voodoo Doughnut","Doughnuts","More of a landmark than a bakery now, but still open at three in the morning."],
  ["Apizza Scholls","Pizza","Limited dough each day, no slices, and no modifications to the toppings."],
  ["Screen Door","Fried chicken and waffles","Weekend queues round the block, and worth one of them."]],

 "PA-philadelphia":[
  ["John's Roast Pork","Roast pork sandwich","With sharp provolone and broccoli rabe, which is the sandwich locals actually rate above cheesesteak."],
  ["Pat's King of Steaks","Cheesesteak","Order wiz wit. Geno's is across the street and the rivalry is the attraction."],
  ["Zahav","Israeli","A James Beard outstanding restaurant, and the lamb shoulder needs booking well ahead."]],

 "PA-pittsburgh":[
  ["Primanti Bros.","Almost-famous sandwich","Fries and slaw inside the sandwich, because that is how shift workers ate it one-handed."]],

 "RI-newport":[
  ["The Black Pearl","Clam chowder","On Bannister's Wharf, in a cup, outside, in any weather."]],

 "RI-providence":[
  ["Al Forno","Grilled pizza","They invented grilled pizza here in 1980, and the baked pasta is the other order."]],

 "SC-charleston":[
  ["Rodney Scott's BBQ","Whole-hog","Cooked over wood for twelve hours. A James Beard best chef for doing exactly one thing."],
  ["Husk","Southern","Nothing on the menu that is not grown or raised in the South. The menu changes daily."],
  ["Bowens Island","Roasted oysters","Shovelled onto a table under a wet sack. A shack on the marsh, and a Beard classic."]],

 "SC-myrtle-beach":[
  ["Sea Captain's House","She-crab soup","In a 1930 beach cottage, with the Atlantic through the dining room windows."]],

 "SD-rapid-city":[
  ["Tally's Silver Spoon","Bison","Downtown, local meat, and a proper breakfast before the Black Hills."]],

 "TN-memphis":[
  ["Central BBQ","Pulled pork","The ribs are dry-rubbed and the nachos are a legitimate order."],
  ["Charlie Vergos' Rendezvous","Dry ribs","In a basement alley downtown since 1948, and dry rub is the Memphis way."],
  ["Gus's World Famous Fried Chicken","Fried chicken","Spicy, battered, and the original is in Mason, half an hour out."]],

 "TN-nashville":[
  ["Hattie B's","Hot chicken","Start at medium. Hot is hotter than you think and Shut the Cluck Up is not a joke."],
  ["Arnold's Country Kitchen","Meat and three","Cafeteria line, roast beef, and a James Beard award."]],

 "TX-austin":[
  ["Franklin Barbecue","Brisket","Aaron Franklin's queue starts before the doors do. They sell out most days."],
  ["Veracruz All Natural","Migas taco","Started as a trailer and is still the best breakfast taco in a city of them."],
  ["Matt's El Rancho","Bob Armstrong dip","Tex-Mex since 1952, and the dip is on the menu because a customer asked for it off-menu."]],

 "TX-dallas-fort-worth":[
  ["Pecan Lodge","Brisket","Deep Ellum, and the beef rib is the order if they still have one."]],

 "TX-houston":[
  ["The Original Ninfa's on Navigation","Fajitas","Where fajitas were introduced to a restaurant menu in 1973."]],

 "TX-san-antonio":[
  ["Mi Tierra Café","Tex-Mex","Open since 1941, open round the clock, and the Christmas decorations never come down."]],

 "UT-moab":[
  ["Milt's Stop & Eat","Burger and shake","Open since 1954, the oldest restaurant in town, and eight stools."]],

 "UT-salt-lake-city":[
  ["Red Iguana","Mole","Seven moles, a queue every night, and a second location that has the same queue."]],

 "VA-richmond":[
  ["Sally Bell's Kitchen","Boxed lunch","A paper box with a sandwich, a deviled egg half and a cupcake upside down. Unchanged since 1926."]],

 "VT-burlington":[
  ["Hen of the Wood","Mushroom toast","In a 19th-century grist mill in Waterbury, or the Burlington room by the hotel."]],

 "WA-seattle":[
  ["Pike Place Chowder","Clam chowder","In the market, in an alley, and there is always a line. It moves."],
  ["Dick's Drive-In","Deluxe burger","A local chain since 1954 that pays its staff properly and takes cash."],
  ["Canlis","Pacific Northwest","Midcentury modern, floor-to-ceiling glass over Lake Union, and a jacket."]],

 "WI-milwaukee":[
  ["Kopp's Frozen Custard","Butter burger and custard","Two flavours of the day on top of vanilla and chocolate, posted monthly."],
  ["Mader's","German","Open since 1902, with a collection of armour on the walls."]],

 "WV-fayetteville":[
  ["Pies & Pints","Pizza","Started here before it spread, and the grape-and-gorgonzola is the house oddity worth ordering."]],

 "WY-jackson":[
  ["Snake River Grill","Game","Elk, bison and a serious wine list, on the town square. Book in season."]]
};
