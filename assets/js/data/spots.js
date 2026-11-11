/* ===========================================================
   SPOTS — what to do in a place.

   placeId -> [ [ name, what it is, TAG ] ... ]

   Favours things that are still there in ten years: museums, parks,
   neighbourhoods, landmarks and natural features, over venues that
   close. Where a city is known for a dish rather than a room, the
   dish is the entry.
   =========================================================== */

const SPOTS = {
 "AL-birmingham":[
  ["Civil Rights Institute","Opposite 16th Street Baptist Church and Kelly Ingram Park, where the 1963 campaign happened.","MUSEUM"],
  ["Vulcan Park","The largest cast-iron statue in the world, on a ridge over the city it was made for.","LANDMARK"],
  ["Sloss Furnaces","A blast furnace works from 1882, left standing, and open to walk through.","HISTORIC"]],

 "AZ-page":[
  ["Antelope Canyon","Upper for the light beams at midday, Lower for the shapes and ladders. Navajo guide required for both.","OUTDOORS"],
  ["Horseshoe Bend","A 1.5-mile round-trip walk to a thousand-foot drop with no railing for most of its length.","OUTDOORS"],
  ["Lake Powell by boat","Ninety-six canyons of flooded sandstone, best from a rented boat to Rainbow Bridge.","OUTDOORS"]],

 "AZ-phoenix":[
  ["Desert Botanical Garden","Fifty thousand desert plants in the Papago buttes, best in the hour before closing.","OUTDOORS"],
  ["Taliesin West","Frank Lloyd Wright's winter home and school, built into the desert out of its own rock.","LANDMARK"],
  ["Musical Instrument Museum","Fifteen thousand instruments with headphones that play each one as you reach it.","MUSEUM"],
  ["Camelback Mountain","Twelve hundred feet up in 1.2 miles. Not a walk — a scramble, and it gets people in summer.","OUTDOORS"]],

 "AZ-sedona":[
  ["Cathedral Rock","The most photographed formation in Arizona, reached by a short, steep, slickrock scramble.","OUTDOORS"],
  ["Chapel of the Holy Cross","A 1956 chapel built straight out of a red rock spur, by a student of Frank Lloyd Wright.","LANDMARK"],
  ["Pink Jeep to Broken Arrow","The only legal way onto some of the slickrock, and worth the tourist-trap feeling.","OUTDOORS"],
  ["Oak Creek Canyon","A sixteen-mile drive down from the Mogollon Rim, with a natural waterslide at Slide Rock.","OUTDOORS"]],

 "CA-los-angeles":[
  ["The Getty Center","Richard Meier's travertine campus above the 405, with free admission and a tram up to it. The gardens are the point as much as the paintings.","MUSEUM"],
  ["Griffith Observatory","Free telescopes, a 1935 building, and the view of the Hollywood sign and the basin that every film uses.","OUTDOORS"],
  ["Grand Central Market","A 1917 food hall downtown that survived the city's decline and is now thirty stalls deep.","FOOD"],
  ["Walk Venice and Abbot Kinney","The boardwalk is a circus and Abbot Kinney a few blocks inland is the opposite. Do both in one afternoon.","NEIGHBOURHOOD"],
  ["Watts Towers","Seventeen interlocked sculptures built single-handed over thirty-three years out of steel, mortar and broken tile.","LANDMARK"],
  ["Santa Monica Pier and Beach","The end of Route 66, a Ferris wheel over the water and the path down to Venice.","BEACH"],
  ["Venice Beach and the canals","The boardwalk, Muscle Beach, and three blocks inland the canals almost nobody visits.","NEIGHBORHOOD"],
  ["The Broad","Contemporary art, free, with Kusama's Infinity Mirrored Room if you reserve the moment you arrive.","ART"],
  ["Hollywood Walk of Fame and the Chinese Theatre","Crowded and worth twenty minutes. The handprints out front are the good part.","LANDMARK"],
  ["Los Angeles County Museum of Art","Urban Light out front, and the largest encyclopedic collection west of Chicago.","ART"],
  ["Runyon Canyon","The hike everyone in the city does, straight up out of Hollywood.","OUTDOORS"],
  ["Universal Studios Hollywood","A working lot with a tram tour through backlot sets.","THEME PARK"],
  ["The Huntington","A library with a Gutenberg Bible, and 130 acres of gardens including a Japanese and a desert garden.","PARK"],
  ["Olvera Street","The oldest street in the city, and the pueblo Los Angeles grew out of.","HISTORY"],
  ["The Walt Disney Concert Hall","Gehry's stainless steel sail downtown. The garden up top is open and free.","ARCHITECTURE"],
  ["Malibu and the Pacific Coast Highway","El Matador's sea stacks, Zuma's sand, and the drive between them.","DRIVE"],
  ["Echo Park Lake","Pedal boats, lotus beds in summer and the skyline framed behind the fountain.","PARK"],
  ["The Last Bookstore","A bank turned bookshop downtown, with the book tunnel upstairs.","LANDMARK"],
  ["Koreatown","The densest restaurant neighbourhood in the city, and the spas that stay open all night.","NEIGHBORHOOD"],
  ["Dodger Stadium","The third-oldest ballpark in baseball, in a canyon with the San Gabriels behind it.","SPORT"],
  ["The Hollywood Bowl","Eighteen thousand seats under the sky, and you may bring your own wine.","MUSIC"],
  ["Griffith Park","Five times the size of Central Park, with the zoo, the Greek Theatre and the old carousel.","PARK"],
  ["Santa Monica to Redondo bike path","Twenty-two paved miles along the sand, the Marvin Braude trail.","OUTDOORS"],
  ["The Academy Museum","Six floors of film, including the only surviving full-size Jaws shark.","MUSEUM"],
  ["La Brea Tar Pits","Still bubbling, still producing Ice Age fossils, in the middle of Wilshire.","MUSEUM"],
  ["Arts District","Warehouses turned galleries, breweries and murals east of Alameda.","NEIGHBORHOOD"],
  ["Point Dume","A headland with a short climb to a whale-watching deck above the cove.","OUTDOORS"],
  ["Little Tokyo","A hundred and thirty years old, with the Japanese American National Museum on the corner.","NEIGHBORHOOD"],
  ["Mulholland Drive","The ridge road along the Santa Monica Mountains, with overlooks on both sides.","DRIVE"],
  ["Exposition Park","The Natural History Museum, the Coliseum and the rose garden between them.","MUSEUM"]],

 "CA-monterey":[
  ["Monterey Bay Aquarium","Built in a former sardine cannery, with a kelp forest tank three storeys tall and an open-sea exhibit.","MUSEUM"],
  ["17-Mile Drive","A private toll road through Pebble Beach past the Lone Cypress.","OUTDOORS"],
  ["Point Lobos","Headlands, sea otters and cypress on what Robert Louis Stevenson may have used for Treasure Island.","OUTDOORS"],
  ["Cannery Row","Steinbeck's street, now mostly shops, with the history worth reading before you walk it.","NEIGHBOURHOOD"]],

 "CA-napa":[
  ["Napa Valley Wine Train","Three hours in restored 1915 Pullman cars up the valley and back, with lunch.","FOOD"],
  ["Oxbow Public Market","Local producers in one shed, and a cheaper way into the valley's food than the restaurants.","FOOD"],
  ["Castello di Amorosa","A castle built to 13th-century Tuscan specification, with a torture chamber, because the owner wanted one.","LANDMARK"]],

 "CA-san-diego":[
  ["Balboa Park","Twelve hundred acres holding seventeen museums and the zoo.","OUTDOORS"],
  ["La Jolla Cove","Sea lions, sea caves and a protected area for snorkelling.","BEACH"],
  ["USS Midway Museum","An aircraft carrier you walk the flight deck and hangar of.","MUSEUM"],
  ["San Diego Zoo","The one that invented open-air habitat, inside Balboa Park.","ZOO"],
  ["Coronado and Hotel del Coronado","A ferry or the bridge to a white Victorian hotel and a very wide beach.","BEACH"],
  ["Cabrillo National Monument","The point where Europeans first landed on the west coast, with tide pools below.","HISTORY"],
  ["Old Town San Diego","The first Spanish settlement in California, preserved as a state park.","HISTORY"],
  ["Torrey Pines State Natural Reserve","Cliff trails through the rarest pine in America, down to the beach.","OUTDOORS"],
  ["Gaslamp Quarter","Sixteen blocks of Victorian commercial buildings, busy after dark.","NEIGHBORHOOD"],
  ["Sunset Cliffs","Ocean Beach sandstone bluffs, named for the obvious reason.","VIEW"],
  ["Point Loma","The peninsula drive with the harbour on one side and the ocean on the other.","DRIVE"],
  ["Mission Beach and Belmont Park","A boardwalk, a 1925 wooden coaster and the bay behind it.","BEACH"],
  ["Birch Aquarium","Scripps's own aquarium on a bluff, with a kelp tank and tide pool.","AQUARIUM"],
  ["Little Italy","A Saturday market, India Street and the piazza at the end.","NEIGHBORHOOD"],
  ["Mission San Diego de Alcalá","The first of the California missions, founded 1769.","HISTORY"],
  ["Sunset Temple and Hillcrest","The city's most walkable bar and restaurant stretch.","NEIGHBORHOOD"],
  ["Seaport Village and the Embarcadero","Waterfront paths from the Midway down past the Unconditional Surrender statue.","OUTDOORS"],
  ["Mount Soledad","A cross on a hill with a 360-degree view from Mexico to Orange County.","VIEW"],
  ["Julian","An hour inland, an old gold town that now runs on apple pie.","FOOD"],
  ["Anza-Borrego","California's largest state park, two hours east, with spring wildflowers and metal sculptures.","OUTDOORS"],
  ["Fish tacos","The city's own contribution, best at the Oscar's and Blue Water counters.","FOOD"],
  ["Mission Bay","Four thousand acres of man-made bay for paddling, sailing and cycling.","OUTDOORS"],
  ["Liberty Station","A decommissioned naval training centre turned arts and food district.","MARKET"],
  ["Children's Pool","A seawall cove taken over by harbour seals, viewed from above.","WILDLIFE"],
  ["Petco Park","Downtown, with a brick warehouse built into left field.","SPORT"]],

 "CA-san-francisco":[
  ["Golden Gate Bridge","Walk the east sidewalk; Battery Spencer has the view back.","LANDMARK"],
  ["Golden Gate Park","Larger than Central Park, with the de Young and the conservatory inside.","OUTDOORS"],
  ["Alcatraz Island","Book weeks ahead. The night tour is the better one.","TOUR"],
  ["Alcatraz","Book weeks ahead. The cellhouse audio tour is narrated by the men who were there.","HISTORY"],
  ["Fisherman's Wharf and Pier 39","Sea lions, sourdough and the ferry terminals. Touristy and fine.","LANDMARK"],
  ["Cable cars","The Powell-Hyde line drops toward the bay and is the one worth queueing for.","LANDMARK"],
  ["The Mission","Murals on Balmy Alley and Clarion, the oldest building in the city, and the burritos.","NEIGHBORHOOD"],
  ["Lands End","A cliff trail to the Sutro Baths ruins, with the bridge appearing through cypress.","OUTDOORS"],
  ["The Palace of Fine Arts","The last structure standing from the 1915 exposition, with a lagoon and swans.","ARCHITECTURE"],
  ["Chinatown","The oldest in North America, and the alley where fortune cookies are still folded by hand.","NEIGHBORHOOD"],
  ["The de Young Museum","American art and a free observation tower over the park.","ART"],
  ["Coit Tower","Murals inside from 1934, and the Filbert Steps down the back through gardens.","VIEW"],
  ["Twin Peaks","The whole grid laid out below, best an hour before sunset.","VIEW"],
  ["The Ferry Building","A marketplace inside a 1898 terminal, with the farmers market on Saturdays.","MARKET"],
  ["California Academy of Sciences","A rainforest dome, a planetarium and an aquarium under a living roof.","MUSEUM"],
  ["SFMOMA","Seven floors, a living wall and the largest Richter collection outside Germany.","ART"],
  ["Lombard Street","Eight turns on a brick block. Walk it; driving it means twenty minutes of queue.","LANDMARK"],
  ["The Presidio","A decommissioned army post turned park, with Andy Goldsworthy works in the woods.","PARK"],
  ["Haight-Ashbury","The corner itself, Amoeba Music and the Victorians along the panhandle.","NEIGHBORHOOD"],
  ["Ocean Beach","Three miles of Pacific, usually cold, with fire pits at the south end.","BEACH"],
  ["Angel Island","A ferry to a car-free island with the immigration station and a loop road with bay views.","PARK"],
  ["Dolores Park","The lawn the whole city sits on, with the skyline over the palm trees.","PARK"],
  ["North Beach","Italian cafes, City Lights bookshop and the Beat history around it.","NEIGHBORHOOD"],
  ["The Exploratorium","A hands-on science museum on a pier, invented the genre.","MUSEUM"],
  ["Baker Beach","The classic bridge view from the sand, and the current is far too strong to swim.","BEACH"],
  ["Oracle Park","The bay beyond right field, and kayakers waiting for home runs.","SPORT"],
  ["Japantown","One of three left in the country, with the Peace Pagoda and the Kinokuniya mall.","NEIGHBORHOOD"],
  ["Muir Woods","Old-growth coast redwoods half an hour north. Parking must be reserved.","OUTDOORS"]],

 "CA-santa-barbara":[
  ["Old Mission Santa Barbara","The Queen of the Missions, 1786, with a Moorish fountain and a working Franciscan community.","HISTORIC"],
  ["County Courthouse tower","A Spanish Colonial Revival courthouse with a free clock tower you can climb for the whole red-tile view.","LANDMARK"],
  ["Funk Zone","Warehouse blocks turned into a wine trail you can walk between tasting rooms.","NEIGHBOURHOOD"],
  ["Channel Islands day boat","An hour across to Santa Cruz Island for sea caves and island foxes.","OUTDOORS"]],

 "CA-south-lake-tahoe":[
  ["Emerald Bay","A glacial bay with an island and a Scandinavian mansion, from an overlook on Highway 89.","OUTDOORS"],
  ["Heavenly gondola","Up 2,800 feet from the middle of town for the whole lake and the Carson Valley behind.","OUTDOORS"],
  ["Sand Harbor","The clearest water on the lake, on the Nevada side, with granite boulders to swim between.","OUTDOORS"]],

 "CO-aspen":[
  ["Maroon Bells","Shuttle up the valley to the most photographed mountains on the continent, reflected in a glacial lake.","OUTDOORS"],
  ["Independence Pass","Twelve thousand and ninety-five feet on a road that closes with the first real snow.","OUTDOORS"],
  ["Aspen Mountain gondola","Straight up from the end of the main street, with hiking at the top in summer.","OUTDOORS"]],

 "CO-denver":[
  ["Red Rocks Amphitheatre","Two three-hundred-foot sandstone monoliths with a stage between them. Free to walk when nothing is on.","OUTDOORS"],
  ["Denver Art Museum","A Libeskind building with the best collection of American Indian art in any US museum.","MUSEUM"],
  ["Union Station","A 1914 station restored as the city's living room, with bars on the concourse.","LANDMARK"],
  ["RiNo murals","A warehouse district repainted every year at the Crush Walls festival.","NEIGHBOURHOOD"]],

 "CO-telluride":[
  ["Free gondola to Mountain Village","The only free public gondola in the country, over the ridge, running until midnight.","OUTDOORS"],
  ["Bridal Veil Falls","Colorado's tallest free-falling waterfall, 365 feet, with a power station on the lip.","FALLS"],
  ["Box canyon main street","A town with mountains closing the end of the street, which is why it looks like that.","NEIGHBOURHOOD"]],

 "DC-washington":[
  ["The National Mall","Two miles of monuments with free national museums along both sides.","WALK"],
  ["National Air and Space Museum","Free, and holds the Wright Flyer and the Apollo 11 command module.","MUSEUM"],
  ["Tidal Basin cherry blossom","Peak bloom lasts roughly a week, usually late March.","SEASONAL"]],

 "FL-destin":[
  ["Henderson Beach State Park","Thirty-foot dunes above the clearest water on the panhandle.","BEACH"],
  ["Destin Harbor Boardwalk","The fishing fleet unloads the day's catch mid-afternoon.","WALK"]],

 "FL-key-west":[
  ["Mallory Square at sunset","Street performers gather nightly for the last twenty minutes of light.","FREE"],
  ["Ernest Hemingway Home","Still home to several dozen six-toed cats descended from the originals.","HISTORIC"],
  ["Southernmost Point buoy","Ninety miles to Cuba, and a queue for the photo most of the day.","LANDMARK"]],

 "FL-miami":[
  ["Wynwood Walls","A warehouse district turned open-air mural gallery, repainted constantly.","ART"],
  ["Vizcaya Museum and Gardens","A 1916 bayfront villa with ten acres of formal Italian gardens.","HISTORIC"],
  ["South Beach Art Deco District","Around 800 preserved buildings between 5th and 23rd.","WALK"],
  ["South Beach and Ocean Drive","The sand, and the art deco strip behind it best seen early before the crowds.","BEACH"],
  ["Art Deco Historic District","Eight hundred preserved buildings. The walking tour from the Welcome Center explains why they matter.","ARCHITECTURE"],
  ["Little Havana and Calle Ocho","Domino Park, cigar rollers, ventanita coffee windows and the Tower Theater.","NEIGHBORHOOD"],
  ["Everglades airboat trip","Sawgrass, alligators and the river of grass, an hour west of downtown.","OUTDOORS"],
  ["Pérez Art Museum Miami","Hanging gardens over the bay and a strong Latin American collection.","ART"],
  ["Key Biscayne and Bill Baggs","A lighthouse at the end of a barrier island, with calm water and bike paths.","BEACH"],
  ["Frost Science Museum","A conical aquarium you view from above and below, plus a planetarium.","MUSEUM"],
  ["Coconut Grove","Sailboats, banyan shade and the oldest settlement in the city.","NEIGHBORHOOD"],
  ["Miami Design District","Luxury storefronts, public sculpture and the Fly's Eye Dome.","NEIGHBORHOOD"],
  ["Venetian Pool","A 1920s coral-rock quarry turned spring-fed public pool in Coral Gables.","OUTDOORS"],
  ["Fairchild Tropical Botanic Garden","Eighty-three acres of palms, cycads and a tropical rainforest house.","PARK"],
  ["Lincoln Road","A pedestrian mall by Morris Lapidus, with the Colony Theatre at the end.","NEIGHBORHOOD"],
  ["Bayside and Bayfront Park","Boat tours of Biscayne Bay and the downtown waterfront around them.","OUTDOORS"],
  ["Little Haiti Cultural Complex","Caribbean markets, a dance studio and a mural-heavy stretch of NE 2nd.","NEIGHBORHOOD"],
  ["Haulover and Sunny Isles","Quieter sand north of the strip, with a cut that boats run through.","BEACH"],
  ["Miami Seaquarium","On Virginia Key, with a reef aquarium and manatee rescue pools.","AQUARIUM"],
  ["Zoo Miami","The only subtropical zoo in the continental US, laid out as open habitat.","ZOO"],
  ["The Deering Estate","A preserved pine rockland and a Tequesta burial mound on the bay.","HISTORY"],
  ["Matheson Hammock Park","A man-made atoll pool flushed by the tides, with the skyline across the bay.","BEACH"],
  ["Española Way","A narrow Mediterranean-revival lane of restaurants off Washington Avenue.","NEIGHBORHOOD"],
  ["Biscayne National Park","Ninety-five per cent water: snorkelling, reefs and the shipwreck trail.","OUTDOORS"],
  ["Miami Beach Boardwalk","A continuous path from South Pointe to 79th, dune on one side, hotels on the other.","OUTDOORS"],
  ["Calle Ocho Cuban food","Versailles and La Carreta for the window coffee and the croquetas.","FOOD"],
  ["Rubell Museum","A contemporary collection in a converted Allapattah warehouse.","ART"]],

 "FL-orlando":[
  ["Wekiwa Springs","A constant 72 degrees, twenty minutes from the parks, with canoes and no queue.","OUTDOORS"],
  ["Winter Park and the Morse Museum","The largest collection of Tiffany glass in the world, and a boat tour through the canals.","MUSEUM"],
  ["Kennedy Space Center","An hour east: Atlantis, a Saturn V lying on its side, and launches you can time a visit around.","MUSEUM"],
  ["Leu Gardens","Fifty acres of camellias and a 19th-century farmhouse, which is the city before the parks.","OUTDOORS"]],

 "FL-panama-city":[
  ["St. Andrews State Park","Dunes, a jetty and flat water on the lagoon side.","OUTDOORS"],
  ["Shell Island","An undeveloped barrier island, reachable only by boat.","BEACH"]],

 "FL-sarasota":[
  ["Siesta Key Beach","Quartz sand so pale it stays cool underfoot in August.","BEACH"],
  ["The Ringling","The circus magnate's art museum, Venetian Gothic mansion and a scale model of the whole circus.","MUSEUM"]],

 "FL-st-augustine":[
  ["Castillo de San Marcos","The oldest masonry fort in the continental US, built of coquina, which absorbed cannonballs rather than shattering.","HISTORIC"],
  ["St George Street","Pedestrian blocks through the 18th-century colonial quarter.","NEIGHBOURHOOD"],
  ["Lightner Museum","A Gilded Age hotel turned museum, with the pool as the dining room.","MUSEUM"],
  ["St Augustine Lighthouse","Two hundred and nineteen steps, and the keepers' house as a shipwreck museum.","LANDMARK"]],

 "FL-tallahassee":[
  ["Cascades Park","An amphitheatre and waterfall at the edge of downtown.","OUTDOORS"],
  ["Florida State Capitol","The restored 1845 capitol stands in front of the modern tower.","LANDMARK"]],

 "FL-tampa":[
  ["Ybor City","The old cigar quarter, with free-roaming roosters and the 1905 Columbia Restaurant.","WALK"],
  ["Tampa Riverwalk","Two and a half miles along the Hillsborough, linking most of downtown.","OUTDOORS"],
  ["Busch Gardens","A zoo and a serious roller-coaster park sharing a fence.","THEME PARK"],
  ["The Florida Aquarium","A Florida-focused collection with a wetlands walk and a coral reef tank.","AQUARIUM"],
  ["Tampa Museum of Art","Antiquities and contemporary work, lit along the river at night.","ART"],
  ["Henry B. Plant Museum","A railroad hotel with silver minarets, now part of the university.","ARCHITECTURE"],
  ["Clearwater Beach","Broad white sand half an hour west, with the Pier 60 sunset market.","BEACH"],
  ["ZooTampa at Lowry Park","Manatee rehabilitation pools and a strong Florida wildlife section.","ZOO"],
  ["Sunshine Skyway Bridge","Four miles of cable-stayed span across the mouth of Tampa Bay.","DRIVE"],
  ["Bayshore Boulevard","The longest continuous sidewalk in the world, four and a half miles along the bay.","OUTDOORS"],
  ["Armature Works","A 1910 streetcar barn turned food hall on the river.","MARKET"],
  ["Fort De Soto Park","Five barrier islands, a Spanish-American War fort and a long north beach.","BEACH"],
  ["The Dali Museum","In St. Petersburg, with the largest Dali collection outside Spain.","ART"],
  ["Hillsborough River State Park","Class II rapids, rare for Florida, with a cypress trail alongside.","OUTDOORS"],
  ["Caladesi Island","Reachable only by ferry, consistently rated among the best beaches in America.","BEACH"],
  ["Tarpon Springs","Greek sponge docks and the bakeries that came with them.","HISTORY"],
  ["Weeki Wachee Springs","A spring-fed state park with the mermaid show running since 1947.","OUTDOORS"],
  ["Lettuce Lake Park","A boardwalk over cypress swamp with an observation tower and alligators below.","PARK"],
  ["The Straz Center","The largest performing arts complex in the southeast.","SHOW"],
  ["Cuban sandwiches in Ybor","The Columbia Restaurant has served them since 1905 and claims the original.","FOOD"],
  ["Honeymoon Island","Pine flatwoods, osprey nests and a beach of shell rather than sand.","BEACH"],
  ["Glazer Children's Museum","Fifty-plus hands-on exhibits downtown, next to the park.","MUSEUM"],
  ["Egmont Key","An island with a ruined fort and a lighthouse, ferry only.","HISTORY"],
  ["Big Cat Rescue","A sanctuary for rescued exotic cats, tours by reservation.","WILDLIFE"],
  ["Water Works Park","Springs, a dog park and the Ulele spring feeding into the river.","PARK"]],

 "GA-atlanta":[
  ["Martin Luther King Jr. National Historical Park","His birth home, Ebenezer Baptist Church and the tomb, on one free site.","HISTORIC"],
  ["Georgia Aquarium","Whale sharks and manta rays in a tank of 6.3 million gallons.","MUSEUM"],
  ["BeltLine Eastside Trail","A railway corridor turned into a walkable, muralled spine through the east side.","OUTDOORS"],
  ["Ponce City Market","A Sears distribution building, now food and shops, with a rooftop fairground.","FOOD"],
  ["The BeltLine","A twenty-two-mile loop of old rail corridor; the Eastside Trail is the finished showpiece.","OUTDOORS"],
  ["World of Coca-Cola","The vault, the bottling line and the tasting room of global flavours.","MUSEUM"],
  ["Piedmont Park","The city's front lawn, with the skyline over the lake and the botanical garden adjoining.","PARK"],
  ["Atlanta Botanical Garden","A canopy walk through the treetops and an orchid house.","PARK"],
  ["Centennial Olympic Park","Built for 1996, with the fountain of rings in the middle.","PARK"],
  ["The Fox Theatre","A 1929 Moorish movie palace with a ceiling of stars.","ARCHITECTURE"],
  ["High Museum of Art","Richard Meier white, with a strong folk and photography collection.","ART"],
  ["Stone Mountain","The largest exposed granite dome in the world, with a walk-up trail.","OUTDOORS"],
  ["Jimmy Carter Presidential Library","Papers, a replica Oval Office and a Japanese garden.","HISTORY"],
  ["Oakland Cemetery","Victorian funerary sculpture and the best skyline view in the city.","HISTORY"],
  ["Little Five Points","Record shops, vintage stores and the Vortex skull doorway.","NEIGHBORHOOD"],
  ["Center for Civil and Human Rights","The lunch-counter simulation is the exhibit people remember.","MUSEUM"],
  ["Krog Street Market","A smaller, denser food hall at the BeltLine's Inman Park end.","MARKET"],
  ["Fernbank Museum","Dinosaurs indoors and seventy-five acres of old-growth forest outdoors.","MUSEUM"],
  ["Sweet Auburn Curb Market","Open since 1918, with the city's best counter lunches.","MARKET"],
  ["Chattahoochee River trails","Rafting and riverside paths on the northwest edge of the city.","OUTDOORS"],
  ["Atlanta History Center","Thirty-three acres, including the restored Cyclorama painting.","HISTORY"],
  ["Inman Park","The first planned suburb in the city, all Victorian porches.","NEIGHBORHOOD"],
  ["Southern food","Mary Mac's Tea Room and Busy Bee Cafe are the institutions.","FOOD"],
  ["College Football Hall of Fame","A three-storey helmet wall and a playing field indoors.","SPORT"],
  ["Decatur","A separate small downtown four miles east, with a square and bookshops.","NEIGHBORHOOD"],
  ["Westside Provisions","Converted meatpacking buildings, galleries and restaurants.","NEIGHBORHOOD"]],

 "GA-savannah":[
  ["The squares","Twenty-two of Oglethorpe's original twenty-four, each with its own trees and monument.","NEIGHBOURHOOD"],
  ["Bonaventure Cemetery","Live oaks, Spanish moss and Victorian statuary on a bluff over the Wilmington River.","HISTORIC"],
  ["Wormsloe tartan oak avenue","A 1.5-mile allée of four hundred live oaks to a tabby ruin.","HISTORIC"],
  ["Tybee Island","Eighteen miles out, with a climbable 1736 lighthouse and a flat beach.","OUTDOORS"]],

 "ID-boise":[
  ["Boise River Greenbelt","Twenty-five miles of path along the river through the middle of the city.","OUTDOORS"],
  ["Old Idaho Penitentiary","A prison from 1872 to 1973, left as it was, with solitary cells open.","HISTORIC"],
  ["Basque Block","The largest Basque community in the United States, with a museum and a frontón.","NEIGHBOURHOOD"]],

 "IL-chicago":[
  ["Art Institute of Chicago","The second largest art museum in the country.","MUSEUM"],
  ["Architecture river cruise","Still the clearest way to read the skyline.","TOUR"],
  ["Millennium Park","Cloud Gate, and free concerts under the Pritzker shell all summer.","FREE"],
  ["Millennium Park and Cloud Gate","The Bean, the Pritzker band shell and the Crown Fountain faces.","PARK"],
  ["The Art Institute of Chicago","American Gothic, Nighthawks and one of the great Impressionist rooms outside Paris.","ART"],
  ["Willis Tower Skydeck","A hundred and three floors up, with glass boxes you step out into over Wacker Drive.","VIEW"],
  ["Chicago Architecture River Cruise","The best possible introduction to the city, ninety minutes, from the Riverwalk.","TOUR"],
  ["Navy Pier","The Ferris wheel, the stained-glass museum and the fireworks on summer weekends.","LANDMARK"],
  ["The Field Museum","Sue the T. rex, and the Egyptian tomb you walk down into.","MUSEUM"],
  ["Shedd Aquarium","Beluga whales with the skyline behind them through the Abbott Oceanarium glass.","AQUARIUM"],
  ["Museum of Science and Industry","A captured U-505 submarine, a coal mine and the Apollo 8 capsule.","MUSEUM"],
  ["Wrigley Field","Ivy on the outfield wall, a hand-turned scoreboard, and Wrigleyville around it.","SPORT"],
  ["The Riverwalk","A continuous promenade along the main branch, with the bridges overhead.","OUTDOORS"],
  ["Lincoln Park Zoo","Free, open year round, and in the middle of the city.","ZOO"],
  ["The Lakefront Trail","Eighteen miles of path along Lake Michigan, with the skyline on one side.","OUTDOORS"],
  ["360 Chicago at the Hancock","The view that includes the Willis Tower, plus TILT, which leans you over Michigan Avenue.","VIEW"],
  ["Deep-dish pizza","Lou Malnati's, Pequod's and Giordano's each have their case. An hour's bake, so order first.","FOOD"],
  ["The Chicago Cultural Center","The world's largest Tiffany dome, and free.","ARCHITECTURE"],
  ["Garfield Park Conservatory","Two acres under glass, including a fern room designed to look like prehistoric Illinois.","PARK"],
  ["Wicker Park and Bucktown","Record shops, the Flat Iron arts building and Milwaukee Avenue.","NEIGHBORHOOD"],
  ["The Green Mill","Al Capone's booth is still there, and the jazz has not stopped since 1907.","MUSIC"],
  ["Pilsen","Murals along 16th Street and the National Museum of Mexican Art, which is free.","NEIGHBORHOOD"],
  ["Oak Park","Twenty-five Frank Lloyd Wright buildings, including his own home and studio.","ARCHITECTURE"],
  ["Grant Park and Buckingham Fountain","The front lawn of the city, and the fountain's hourly water display.","PARK"],
  ["The Second City","Where Belushi, Murray, Fey and Colbert all started.","SHOW"],
  ["Chinatown","One of the few in America still growing, with the Nine Dragon Wall and Wentworth Avenue.","NEIGHBORHOOD"],
  ["The Magnificent Mile","Michigan Avenue from the river to Oak Street, and the Water Tower that survived the fire.","LANDMARK"],
  ["Montrose Beach","A city beach with a bird sanctuary on the point and the skyline to the south.","BEACH"],
  ["Logan Square","The boulevard, the eagle column and a dense run of bars and bakeries.","NEIGHBORHOOD"],
  ["The Chicago Theatre","The sign is the city's unofficial logo. Tours run on non-show days.","ARCHITECTURE"],
  ["Humboldt Park","The Puerto Rican flags over Division Street and a lagoon behind them.","PARK"]],

 "IN-indianapolis":[
  ["Indianapolis Motor Speedway","Two and a half miles of oval, a museum inside it, and a bus lap when nothing is running.","LANDMARK"],
  ["Cultural Trail","Eight miles of protected path linking six cultural districts, built for pedestrians first.","OUTDOORS"],
  ["Newfields","An art museum with a hundred-acre art-and-nature park behind it.","MUSEUM"]],

 "KY-louisville":[
  ["Churchill Downs and the Derby Museum","The twin spires, and a museum that puts you on the track when there is no racing.","LANDMARK"],
  ["Louisville Slugger Museum","Bats made on site since 1884, and you leave with a miniature one.","MUSEUM"],
  ["Urban Bourbon Trail","Distilleries inside the city, so you can do it without driving.","FOOD"],
  ["Muhammad Ali Center","His life told as six core principles rather than as a fight record.","MUSEUM"]],

 "LA-new-orleans":[
  ["Jackson Square","Laid out in 1721 as the Place d'Armes, with St. Louis Cathedral behind it.","LANDMARK"],
  ["Frenchmen Street","Three blocks of live brass and jazz past the edge of the Quarter.","AFTER DARK"],
  ["St. Charles streetcar","The oldest streetcar line still running anywhere, under the Garden District oaks.","RIDE"],
  ["City Park","Thirteen hundred acres holding one of the largest stands of mature live oaks left.","OUTDOORS"]],

 "MA-boston":[
  ["Freedom Trail","Two and a half miles of red brick line through sixteen sites, ending at the Bunker Hill Monument.","HISTORIC"],
  ["Isabella Stewart Gardner Museum","A Venetian palazzo built around a courtyard, with the empty frames from the 1990 theft still hanging.","MUSEUM"],
  ["Fenway Park","The oldest ballpark in the majors, 1912, with a tour when the team is away.","LANDMARK"],
  ["Harvard and Cambridge","The Yard, the Glass Flowers at the natural history museum, and a bookshop on every corner.","NEIGHBOURHOOD"],
  ["Boston Harbor Islands","Thirty-four islands by ferry, with a Civil War fort on Georges Island.","OUTDOORS"]],

 "MA-salem":[
  ["Peabody Essex Museum","The oldest continuously operating museum in the country, with a Qing house moved from China.","MUSEUM"],
  ["Witch Trials Memorial","Twenty stone benches beside the old burying point, deliberately plain.","MONUMENT"],
  ["The House of the Seven Gables","A 1668 house that Hawthorne wrote around, with a secret staircase.","HISTORIC"]],

 "MD-annapolis":[
  ["US Naval Academy","Noon formation in term time, and the crypt of John Paul Jones under the chapel.","HISTORIC"],
  ["City Dock","Eighteenth-century streets running straight into the water, with a Kunta Kinte memorial at the head.","NEIGHBOURHOOD"],
  ["Sail the Chesapeake","Two-hour trips on a wooden schooner from the dock.","OUTDOORS"]],

 "MD-baltimore":[
  ["American Visionary Art Museum","Self-taught artists only, including a fifty-five-foot whirligig outside.","MUSEUM"],
  ["Fort McHenry","Where the flag was still there in 1814, with the ramparts open.","HISTORIC"],
  ["Lexington Market","Trading since 1782, and the crab cake is the reason to go.","FOOD"],
  ["Fell's Point","Cobbles, a working tug pier and the oldest continuously operating tavern in the state.","NEIGHBOURHOOD"]],

 "MD-frederick":[
  ["Carroll Creek Park","A canal walk with painted bridges through the middle of town.","WALK"],
  ["Downtown Frederick","Fifty blocks of preserved 18th and 19th century buildings.","HISTORIC"]],

 "ME-bar-harbor":[
  ["Cadillac Mountain sunrise","The first sunrise in the country between October and March. Vehicle reservation required.","OUTDOORS"],
  ["Carriage roads by bicycle","Forty-five miles of crushed stone, no cars, and seventeen stone bridges, paid for by Rockefeller.","OUTDOORS"],
  ["Jordan Pond House","Popovers on the lawn with the Bubbles behind the pond, served since the 1890s.","FOOD"],
  ["Bass Harbor Head Light","The quiet side of the island, and the best light in the evening.","LANDMARK"]],

 "ME-portland":[
  ["Portland Head Light","Commissioned by George Washington, lit in 1791, in a park with the Atlantic on three sides.","LANDMARK"],
  ["Old Port","Cobbled blocks of chandlers and warehouses, now the best eating in northern New England.","NEIGHBOURHOOD"],
  ["Casco Bay mail boat","Three hours round the Calendar Islands on the working mail run.","OUTDOORS"]],

 "ME-rockland":[
  ["Farnsworth Art Museum","Three generations of Wyeths, and the Olson House where Christina's World was painted.","MUSEUM"],
  ["Rockland Breakwater Light","A mile of granite out into the bay, walkable when the sea is calm.","LANDMARK"],
  ["Windjammer day sail","Working schooners out of the harbour, some over a hundred years old.","OUTDOORS"]],

 "MI-detroit":[
  ["Detroit Institute of Arts","Diego Rivera's Detroit Industry murals fill an entire courtyard, and the city fought bankruptcy to keep them.","MUSEUM"],
  ["The Henry Ford and Greenfield Village","Rosa Parks's bus, the Wright brothers' shop, and a working 1920s village over 240 acres.","MUSEUM"],
  ["Eastern Market","Six blocks of sheds, trading since 1891, with murals on everything.","FOOD"],
  ["Belle Isle","An island park between the US and Canada, designed by Olmsted, with an aquarium from 1904.","OUTDOORS"]],

 "MI-mackinac-island":[
  ["Circle the island by bicycle","Eight miles on M-185, the only state highway in America with no cars on it.","OUTDOORS"],
  ["Grand Hotel porch","Six hundred and sixty feet of it, the longest in the world, with a dress code after six.","HISTORIC"],
  ["Fort Mackinac","A British fort from 1780 on the bluff, with cannon firing on the hour.","HISTORIC"]],

 "MN-minneapolis":[
  ["Chain of Lakes","Thirteen miles of connected lakes with a path round all of them inside the city.","OUTDOORS"],
  ["Walker Art Center and Sculpture Garden","Contemporary art and the Spoonbridge and Cherry, which the city has adopted as its emblem.","MUSEUM"],
  ["Minnehaha Falls","Fifty-three feet in a city park, and frozen solid for much of the winter.","FALLS"],
  ["Mill City Museum","Built inside the ruins of the largest flour mill in the world after it burned.","MUSEUM"]],

 "MO-st-louis":[
  ["Gateway Arch tram","A five-minute ride in a tiny capsule to a window 630 feet up.","MONUMENT"],
  ["City Museum","A shoe factory rebuilt as a climbable sculpture out of salvage, with a school bus on the roof.","MUSEUM"],
  ["Forest Park","Larger than Central Park, with five free museums and the zoo in it.","OUTDOORS"],
  ["Anheuser-Busch brewery","A national historic landmark with Clydesdales and a free tasting at the end.","FOOD"]],

 "MS-biloxi":[
  ["Biloxi Lighthouse","Cast iron, 1848, and kept lit by two women for more than fifty years between them.","LANDMARK"],
  ["Ohr-O'Keefe Museum","Gehry pods built for the pottery of George Ohr, the self-styled mad potter of Biloxi.","MUSEUM"],
  ["Shrimp boat trip","An hour on a working trawl, and the net comes up where you can see it.","OUTDOORS"]],

 "MT-whitefish":[
  ["Going-to-the-Sun Road","Fifty miles over Logan Pass through Glacier. Vehicle reservations in summer, and it opens late.","OUTDOORS"],
  ["Whitefish Mountain Resort","Night skiing in winter, an alpine slide and a zipline the rest of the year.","OUTDOORS"],
  ["Flathead Lake drive","The east shore road through cherry orchards, with swimming at Yellow Bay.","OUTDOORS"]],

 "NC-asheville":[
  ["Biltmore Estate","Two hundred and fifty rooms, the largest private house in America, with Olmsted's grounds around it.","HISTORIC"],
  ["Blue Ridge Parkway overlooks","Craggy Gardens and Mount Mitchell, the highest point east of the Mississippi, within an hour.","OUTDOORS"],
  ["River Arts District","Two hundred working studios in old industrial buildings along the French Broad.","NEIGHBOURHOOD"],
  ["Sliding Rock","A sixty-foot natural waterslide into a cold pool, with a lifeguard in summer.","OUTDOORS"]],

 "NE-omaha":[
  ["Henry Doorly Zoo","The largest indoor desert and one of the largest indoor rainforests in the world.","OUTDOORS"],
  ["Old Market","Brick warehouses and cobbled streets, now the centre of the city's eating.","NEIGHBOURHOOD"],
  ["Durham Museum","Inside Union Station, an art deco terminal left largely as it was.","MUSEUM"]],

 "NH-portsmouth":[
  ["Strawbery Banke","Ten acres of houses from 1695 to 1954 on their original sites, furnished to different decades.","HISTORIC"],
  ["Isles of Shoals cruise","Nine islands six miles out, with a hotel, a marine lab and a murder story.","OUTDOORS"],
  ["Market Square","A compact brick centre with more good food per block than its size suggests.","NEIGHBOURHOOD"]],

 "NJ-jersey-city":[
  ["Liberty State Park","The closest land view of the Statue of Liberty, with the whole Manhattan skyline behind it.","OUTDOORS"],
  ["Exchange Place waterfront","The ferry crosses to lower Manhattan in under ten minutes.","VIEW"]],

 "NM-albuquerque":[
  ["Sandia Peak Tramway","Two and a half miles of cable to 10,378 feet, the longest aerial tram in the Americas.","OUTDOORS"],
  ["Old Town","Ten blocks of adobe around a 1793 plaza, with San Felipe de Neri still in use.","NEIGHBOURHOOD"],
  ["Petroglyph National Monument","Twenty-four thousand images carved into basalt on the city's western edge.","HISTORIC"],
  ["Balloon Museum","Why this valley and no other, explained properly — the box wind pattern that lets balloons come back.","MUSEUM"]],

 "NM-santa-fe":[
  ["Georgia O'Keeffe Museum","The largest collection of her work anywhere, ten minutes from the plaza.","MUSEUM"],
  ["Canyon Road","Half a mile of adobe galleries, a hundred of them, walked end to end in an afternoon.","NEIGHBOURHOOD"],
  ["Loretto Chapel staircase","A spiral stair with no centre support and no nails, built by a carpenter who left without being paid.","LANDMARK"],
  ["Meow Wolf","A Victorian house you walk into and come out of somewhere else entirely. Built by local artists, funded by George R. R. Martin.","MUSEUM"],
  ["High Road to Taos","Fifty-six miles through Chimayó and Truchas instead of the fast road up the gorge.","OUTDOORS"]],

 "NV-las-vegas":[
  ["The Neon Museum","The signs the casinos threw away, lit again in a boneyard. Book the night tour.","MUSEUM"],
  ["Hoover Dam","Seven hundred and twenty-six feet of 1930s concrete, with a tour down into the generator hall.","LANDMARK"],
  ["Red Rock Canyon loop","Thirteen miles of scenic drive twenty minutes from the Strip, with sandstone the Strip has no interest in.","OUTDOORS"],
  ["Fremont Street","The original Vegas, before the Strip, with the old casinos and a canopy screen over five blocks.","NEIGHBOURHOOD"],
  ["Atomic Museum","The Nevada Test Site, told properly, including the tourism the city built around the mushroom clouds.","MUSEUM"],
  ["The Strip after dark","Four miles of casinos. Walking it once end to end is the experience.","LANDMARK"],
  ["Bellagio fountains","Every fifteen to thirty minutes, free, and still the best show on the Strip.","SHOW"],
  ["Fremont Street Experience","Old Vegas downtown under a canopy screen, with the original neon.","LANDMARK"],
  ["Red Rock Canyon","A thirteen-mile scenic loop twenty minutes west, with sandstone walls and trailheads.","OUTDOORS"],
  ["Valley of Fire State Park","Nevada's oldest state park, red Aztec sandstone and petroglyphs, an hour northeast.","OUTDOORS"],
  ["Cirque du Soleil","Several resident shows, with O at the Bellagio performed in a pool.","SHOW"],
  ["The Mob Museum","In the former federal courthouse where the Kefauver hearings were held.","MUSEUM"],
  ["Lake Mead","Swimming, boats and the bathtub ring that shows where the water used to be.","OUTDOORS"],
  ["Seven Magic Mountains","Ugo Rondinone's stacked fluorescent boulders in the desert south of town.","ART"],
  ["The Venetian","Canals, gondolas and a painted sky indoors.","LANDMARK"],
  ["Area15","An immersive art complex with Omega Mart inside it.","ART"],
  ["Springs Preserve","A hundred and eighty acres on the original water source, with a botanical garden.","PARK"],
  ["The High Roller","A five-hundred-and-fifty-foot observation wheel at the LINQ.","VIEW"],
  ["Mount Charleston","Eleven thousand feet and twenty degrees cooler, forty-five minutes away.","OUTDOORS"],
  ["Buffet culture","The Wynn and Caesars rooms are the survivors worth the price.","FOOD"],
  ["Downtown Container Park","Shops built from shipping containers, with a flame-throwing mantis out front.","MARKET"],
  ["The Atomic Museum","The testing history of the Nevada Proving Grounds, told properly.","MUSEUM"],
  ["Sphere","A video sphere you sit inside, the newest thing on the skyline.","SHOW"],
  ["Ethel M Cactus Garden","Three acres of desert plants, free, and lit for the holidays.","PARK"],
  ["Arts District","Eighteenth-century it is not: galleries, antiques and breweries on Main Street.","NEIGHBORHOOD"],
  ["Death Valley day trip","Two hours west to the lowest point in North America.","DRIVE"],
  ["Grand Canyon West and the Skywalk","A glass horseshoe over the rim, two and a half hours out.","VIEW"],
  ["Pinball Hall of Fame","Hundreds of machines, all playable, all on original coin drop.","MUSEUM"]],

 "NY-buffalo":[
  ["Niagara Falls","Twenty minutes north. The Cave of the Winds deck puts you under Bridal Veil, and the US side is the cheaper one.","FALLS"],
  ["Frank Lloyd Wright's Martin House","Six interconnected buildings from 1905, restored over twenty-five years and $50 million.","LANDMARK"],
  ["Albright-Knox at Buffalo AKG","Modern and contemporary, with a serious abstract expressionist holding.","MUSEUM"],
  ["Silo City","Grain elevators Le Corbusier admired, now open for tours and concerts.","HISTORIC"]],

 "NY-new-york-city":[
  ["Central Park","843 acres. The Ramble and Bethesda Terrace are the parts worth slowing down for.","OUTDOORS"],
  ["The Metropolitan Museum of Art","Two million works across two million square feet. The roof garden opens in warm months.","MUSEUM"],
  ["Brooklyn Bridge","Walk it from the Brooklyn side early, before the crowd fills the centre lane.","WALK"],
  ["Statue of Liberty and Ellis Island","The ferry from Battery Park takes both. Crown tickets sell out months out; the pedestal does not.","LANDMARK"],
  ["Empire State Building","The 86th-floor deck is the open-air one and the better one. Go at opening or near midnight.","VIEW"],
  ["The High Line","A freight viaduct turned elevated garden, running from the Whitney up through Chelsea to Hudson Yards.","PARK"],
  ["9/11 Memorial and Museum","Two voids in the tower footprints, and a museum underneath built around the slurry wall that held.","HISTORY"],
  ["Times Square","Loud, crowded and worth seeing once after dark. Then leave.","LANDMARK"],
  ["The American Museum of Natural History","The blue whale, the dinosaur halls and the Rose Center planetarium.","MUSEUM"],
  ["Grand Central Terminal","Look up at the backwards constellation ceiling, then whisper into the corner of the Oyster Bar arches.","ARCHITECTURE"],
  ["The Museum of Modern Art","Starry Night, Les Demoiselles d'Avignon and the sculpture garden.","ART"],
  ["Greenwich Village and Washington Square","Brownstones, the arch, chess tables and the folk-music streets around Bleecker.","NEIGHBORHOOD"],
  ["Top of the Rock","The deck that has the Empire State Building in the view, which the Empire State Building does not.","VIEW"],
  ["The Cloisters","A medieval monastery rebuilt in Fort Tryon Park, with the unicorn tapestries and a view up the Hudson.","MUSEUM"],
  ["Coney Island","The boardwalk, the Cyclone, the Wonder Wheel and the original Nathan's.","BEACH"],
  ["Chinatown and Little Italy","Dumpling shops, fish markets and Mulberry Street, all walkable from each other.","NEIGHBORHOOD"],
  ["Prospect Park","Olmsted and Vaux's own favourite, with the Long Meadow and the only forest left in Brooklyn.","PARK"],
  ["Broadway","Forty-one theatres. Same-day rush and TKTS booths make it far cheaper than the posted price.","SHOW"],
  ["The Vessel and Hudson Yards","A climbable honeycomb and the Edge sky deck jutting out over Tenth Avenue.","LANDMARK"],
  ["The Frick Collection","A steel baron's mansion with Vermeers and Rembrandts hung where he put them.","ART"],
  ["Williamsburg","Brooklyn's record shops, rooftop bars and the best skyline view in the city from Domino Park.","NEIGHBORHOOD"],
  ["St. Patrick's Cathedral","White marble Gothic revival sitting across from Rockefeller Center.","ARCHITECTURE"],
  ["The New York Public Library","The lions, the Rose Reading Room, and the Gutenberg Bible upstairs.","ARCHITECTURE"],
  ["Yankee Stadium","The Bronx, and Monument Park beyond centre field.","SPORT"],
  ["Roosevelt Island Tramway","A commuter cable car over the East River for the price of a subway ride.","VIEW"],
  ["The Guggenheim","Wright's spiral, best walked down from the top.","ART"],
  ["Governors Island","Car-free, ferry-only, with hammock groves and the Hills looking back at Lower Manhattan.","PARK"],
  ["The Tenement Museum","Restored apartments on Orchard Street, told through the families who actually lived in them.","HISTORY"],
  ["Harlem","The Apollo, Striver's Row and Sunday gospel at Abyssinian Baptist.","NEIGHBORHOOD"],
  ["Staten Island Ferry","Free, twenty-five minutes, and it passes the Statue of Liberty both ways.","VIEW"]],

 "OH-cincinnati":[
  ["Over-the-Rhine","The largest intact Italianate historic district in the United States, and Findlay Market in the middle.","NEIGHBOURHOOD"],
  ["National Underground Railroad Freedom Center","On the north bank of the river people crossed to be free.","MUSEUM"],
  ["Cincinnati Zoo","The second oldest in the country, and the best in it at breeding.","OUTDOORS"],
  ["Roebling Suspension Bridge","Built 1866 as the longest in the world, and the prototype for Brooklyn.","LANDMARK"]],

 "OH-cleveland":[
  ["Rock and Roll Hall of Fame","A Pei building on the lakefront, and the archive is better than the plaques.","MUSEUM"],
  ["West Side Market","A 1912 market hall with a vaulted tile ceiling and a hundred stands.","FOOD"],
  ["Cleveland Museum of Art","Free admission, an Armor Court, and one of the best collections in the country.","MUSEUM"],
  ["Cuyahoga Valley Scenic Railroad","Through the national park between here and Akron, with a bike-aboard service.","OUTDOORS"]],

 "OK-oklahoma-city":[
  ["Oklahoma City National Memorial","A field of 168 empty chairs, the survivor tree, and a reflecting pool on the footprint of the street.","MONUMENT"],
  ["National Cowboy and Western Heritage Museum","Serious about the West, including the parts the films leave out.","MUSEUM"],
  ["Bricktown","Warehouses and a mile of canal with water taxis, walkable from downtown.","NEIGHBOURHOOD"]],

 "OR-portland":[
  ["Powell's City of Books","A whole city block of new and used books over nine colour-coded rooms.","LANDMARK"],
  ["Japanese Garden","Twelve acres in the West Hills, considered among the most authentic outside Japan.","OUTDOORS"],
  ["Columbia River Gorge day trip","Multnomah Falls, Vista House and the old highway, within an hour.","OUTDOORS"],
  ["Mount Hood loop","A glaciated volcano with summer skiing and Timberline Lodge on its shoulder.","OUTDOORS"]],

 "PA-harrisburg":[
  ["Pennsylvania State Capitol","A Beaux-Arts dome modelled on St. Peter's, free to tour.","LANDMARK"],
  ["Riverfront Park","A long promenade on the Susquehanna, the widest river on the east coast.","WALK"]],

 "PA-hershey":[
  ["Hersheypark","Fourteen roller coasters on the hill above the chocolate factory.","THEME PARK"],
  ["Hershey Gardens","Twenty-three acres, including an indoor butterfly atrium.","OUTDOORS"]],

 "PA-philadelphia":[
  ["Independence Hall and the Liberty Bell","Where both the Declaration and the Constitution were signed. Free, but timed tickets in summer.","HISTORIC"],
  ["Philadelphia Museum of Art","The steps, and then inside, where there is a genuinely great collection behind them.","MUSEUM"],
  ["Reading Terminal Market","An 1893 train shed with eighty vendors, including Pennsylvania Dutch stalls that shut on Sundays.","FOOD"],
  ["Eastern State Penitentiary","The first true penitentiary in the world, left as a ruin, with Al Capone's cell furnished.","HISTORIC"],
  ["Barnes Foundation","Hung exactly as Albert Barnes arranged it, which is unlike any other museum you will visit.","MUSEUM"]],

 "PA-pittsburgh":[
  ["Duquesne Incline","An 1877 funicular up Mount Washington to the view of the three rivers.","VIEW"],
  ["The Andy Warhol Museum","The largest museum anywhere devoted to a single artist.","MUSEUM"],
  ["The Strip District","Markets, delis and the original Primanti Brothers counter.","FOOD"]],

 "RI-newport":[
  ["Cliff Walk","Three and a half miles with the Atlantic on one side and the Gilded Age mansions on the other.","OUTDOORS"],
  ["The Breakers","Seventy rooms built for the Vanderbilts in 1895, as a summer cottage.","HISTORIC"],
  ["International Tennis Hall of Fame","The oldest grass courts still in competitive use, and you can book one.","MUSEUM"],
  ["Ocean Drive","Ten miles round the point past Castle Hill and Brenton Point.","OUTDOORS"]],

 "SC-charleston":[
  ["Rainbow Row and the Battery","Thirteen Georgian houses in pastel, and a seawall promenade round the point.","NEIGHBOURHOOD"],
  ["Fort Sumter","Boat out to where the Civil War started, which the rangers explain without flinching.","HISTORIC"],
  ["Aiken-Rhett House","Left unrestored on purpose, including the slave quarters, which makes it the most honest house museum in the city.","HISTORIC"],
  ["Angel Oak","A live oak between four and five hundred years old, with limbs resting on the ground.","OUTDOORS"]],

 "SD-rapid-city":[
  ["Mount Rushmore","Best at the evening lighting ceremony, and better still from the Presidential Trail underneath.","MONUMENT"],
  ["Needles Highway","Fourteen miles of granite spires and tunnels cut barely wider than a car.","OUTDOORS"],
  ["Crazy Horse Memorial","Carved since 1948, funded privately, and deliberately unfinished on any schedule.","MONUMENT"],
  ["Badlands Loop Road","Thirty-one miles with overlooks every few minutes, and bighorn on the road at dawn.","OUTDOORS"]],

 "TN-gatlinburg":[
  ["Cades Cove loop","Eleven miles round a valley of 19th-century homesteads, with bears. Vehicle-free on Wednesdays in summer.","OUTDOORS"],
  ["Clingmans Dome","The highest point in the park at 6,643 feet, with a ramp to an observation tower.","OUTDOORS"],
  ["Roaring Fork Motor Nature Trail","A one-way five-mile lane past cabins and a waterfall you can walk behind.","OUTDOORS"],
  ["Ober Mountain tramway","Straight out of the main street to a small ski area above the town.","OUTDOORS"]],

 "TN-memphis":[
  ["National Civil Rights Museum","Built around the Lorraine Motel, with Room 306 kept as it was.","MUSEUM"],
  ["Graceland","Smaller than people expect, and more interesting for it. The jungle room is upstairs in the plans and not in the tour.","HISTORIC"],
  ["Stax Museum of American Soul Music","On the site of the studio, with Isaac Hayes's gold-trimmed Cadillac in the middle.","MUSEUM"],
  ["Beale Street","Three blocks of live blues every night, and the Peabody ducks ten minutes away.","NEIGHBOURHOOD"]],

 "TN-nashville":[
  ["Country Music Hall of Fame","Traces the music back to its string-band and gospel roots.","MUSEUM"],
  ["Lower Broadway","Live music from late morning to closing, and no cover anywhere.","MUSIC"],
  ["Centennial Park","Holds a full-scale replica of the Parthenon, complete with the statue.","OUTDOORS"]],

 "TX-austin":[
  ["Barton Springs Pool","Three acres of spring-fed water in Zilker Park, holding 68-70°F all year.","OUTDOORS"],
  ["Texas State Capitol","Pink granite, and taller than the national Capitol. Free tours run all day.","LANDMARK"],
  ["Congress Avenue Bridge bats","North America's largest urban bat colony pours out at dusk, March to October.","SEASONAL"],
  ["South Congress Avenue","Boot shops, murals and the long view back up the hill to the dome.","WALK"],
  ["Lady Bird Lake Trail","A ten-mile crushed-granite loop straight through downtown.","OUTDOORS"]],

 "TX-dallas-fort-worth":[
  ["Fort Worth Stockyards","A longhorn drive down Exchange Avenue twice a day.","HISTORIC"],
  ["Dallas Arts District","The largest contiguous arts district in the country, nineteen blocks of it.","ART"],
  ["Kimbell Art Museum","Louis Kahn's vaulted galleries; the permanent collection is free.","MUSEUM"],
  ["The Sixth Floor Museum","The Texas School Book Depository, told from the window itself.","HISTORY"],
  ["Dallas Museum of Art","Free general admission, and strong on ancient American work.","ART"],
  ["Reunion Tower","A geodesic ball on a stalk, with a 360-degree deck.","VIEW"],
  ["Dallas Arboretum","Sixty-six acres on White Rock Lake, at its best during the autumn pumpkin village.","PARK"],
  ["Fort Worth Water Gardens","Concrete terraces of falling water in the middle of downtown.","ARCHITECTURE"],
  ["Perot Museum of Nature and Science","A cube on a plinth with a glass escalator outside it.","MUSEUM"],
  ["Deep Ellum","Murals, live music and the blues history of Elm Street.","NEIGHBORHOOD"],
  ["Klyde Warren Park","A deck park built over a freeway, with food trucks along the edge.","PARK"],
  ["Fort Worth Botanic Garden","A Japanese garden with koi ponds and a conservatory.","PARK"],
  ["Bishop Arts District","Twenty-five blocks of independent shops and restaurants in Oak Cliff.","NEIGHBORHOOD"],
  ["Amon Carter Museum","American art, free, with Remington and Russell at its core.","ART"],
  ["White Rock Lake","A nine-mile loop trail close to downtown.","OUTDOORS"],
  ["Dallas World Aquarium","A walk down through a rainforest from the canopy to the water.","AQUARIUM"],
  ["Fort Worth Modern","Tadao Ando concrete pavilions sitting in a reflecting pond.","ART"],
  ["Texas barbecue","Brisket is the measure. Lockhart is the pilgrimage, but Fort Worth holds its own.","FOOD"],
  ["AT&T Stadium","Tours of the Cowboys' stadium, and the art collection inside it.","SPORT"],
  ["Dealey Plaza","The grassy knoll and the triple underpass, unchanged.","HISTORY"],
  ["Sundance Square","Thirty-five blocks of restored Fort Worth downtown.","NEIGHBORHOOD"],
  ["Dallas Zoo","The largest in Texas, with the Giants of the Savanna habitat.","ZOO"],
  ["Trinity River Audubon Center","A former illegal dump turned wetland preserve.","WILDLIFE"],
  ["Cattle Raisers Museum","The ranching history that built both cities.","MUSEUM"],
  ["Fair Park","The largest collection of art deco exhibition buildings in the world.","ARCHITECTURE"],
  ["Margaret Hunt Hill Bridge","Calatrava's arched span over the Trinity, lit at night.","ARCHITECTURE"]],

 "TX-fredericksburg":[
  ["Enchanted Rock","A 425-foot pink granite dome a short drive north; go at first light in summer.","OUTDOORS"],
  ["Main Street","German bakeries, and the National Museum of the Pacific War at the east end.","WALK"]],

 "TX-houston":[
  ["Space Center Houston","Historic Mission Control and a complete Saturn V lying on its side.","MUSEUM"],
  ["The Museum District","Nineteen museums inside a mile and a half, several of them free.","MUSEUM"],
  ["Buffalo Bayou Park","160 acres of trail and cistern directly below downtown.","OUTDOORS"]],

 "TX-san-antonio":[
  ["The Alamo","Free entry to the mission church, in the middle of downtown.","HISTORIC"],
  ["River Walk","Fifteen miles of walkway one storey below the street.","WALK"],
  ["San Antonio Missions","Four Spanish colonial missions on a World Heritage trail you can bike.","HISTORIC"]],

 "UT-moab":[
  ["Delicate Arch at sunset","A three-mile round trip over slickrock to the arch on the state's number plate. Take water, take a torch.","OUTDOORS"],
  ["Island in the Sky","The Canyonlands district with a paved rim road, Mesa Arch at dawn, and Grand View Point.","OUTDOORS"],
  ["Raft Westwater Canyon","Grade III–IV on the Colorado in the oldest exposed rock in the region.","OUTDOORS"],
  ["Dead Horse Point at dusk","The gooseneck view, and a far quieter overlook than anything inside the parks.","OUTDOORS"]],

 "UT-salt-lake-city":[
  ["Temple Square","The headquarters of the Latter-day Saints, free to walk, with the Tabernacle's famous acoustics.","HISTORIC"],
  ["Antelope Island causeway","Seven miles across the Great Salt Lake to a bison herd and water you float in.","OUTDOORS"],
  ["Big and Little Cottonwood","Four ski areas inside forty minutes of downtown, with the lightest snow in the country.","OUTDOORS"]],

 "UT-springdale":[
  ["Zion Narrows bottom-up","Wade up the Virgin River into a slot with 300-metre walls. No permit needed from this end.","OUTDOORS"],
  ["Angels Landing","A chained ridge walk with 400-metre drops either side, now by permit lottery only.","OUTDOORS"],
  ["Canyon Overlook","Half a mile for the view most people queue three hours for, on the east side of the tunnel.","OUTDOORS"]],

 "VA-richmond":[
  ["Virginia Museum of Fine Arts","Free, and open 365 days a year.","MUSEUM"],
  ["James River Park System","Class III and IV rapids running through the middle of the city.","OUTDOORS"]],

 "VA-williamsburg":[
  ["Colonial Williamsburg","Three hundred acres of restored and reconstructed 18th-century town, with tradespeople working in period.","HISTORIC"],
  ["Jamestown Settlement","Where the English landed in 1607, with three reconstructed ships and an ongoing dig.","HISTORIC"],
  ["Yorktown Battlefield","Where Cornwallis surrendered, with the siege lines walkable.","HISTORIC"]],

 "VT-burlington":[
  ["Church Street Marketplace","Four blocks closed to cars since 1981, with the Adirondacks at the end of the side streets.","NEIGHBOURHOOD"],
  ["Shelburne Museum","Thirty-nine buildings including a steamboat hauled overland, on forty-five acres.","MUSEUM"],
  ["Lake Champlain ferry","Across to New York in twelve minutes, with the Green Mountains behind you.","OUTDOORS"],
  ["Ben & Jerry's factory","Half an hour south in Waterbury, with a flavour graveyard outside.","FOOD"]],

 "WA-seattle":[
  ["Pike Place Market","A working market since 1907, and the lower levels are where it stops being a photograph.","FOOD"],
  ["Chihuly Garden and Glass","Blown glass installed as a garden under the Space Needle, which is the better of the two tickets.","MUSEUM"],
  ["Ferry to Bainbridge","Thirty-five minutes each way for the skyline, the Olympics and the cheapest cruise in the city.","OUTDOORS"],
  ["Museum of Pop Culture","A Gehry building holding Hendrix, Nirvana and science fiction, which is a very Seattle combination.","MUSEUM"],
  ["Discovery Park","Five hundred and thirty-four acres on a bluff with a lighthouse and no city noise.","OUTDOORS"],
  ["Space Needle","The 1962 World's Fair tower, with a revolving glass floor added at the top.","VIEW"],
  ["Kerry Park","A small terrace on Queen Anne with the skyline, the Needle and Rainier lined up.","VIEW"],
  ["The Seattle Great Wheel","On a pier over Elliott Bay, best at dusk.","LANDMARK"],
  ["Washington Park Arboretum","Two hundred and thirty acres, with a Japanese garden and a paddle route through the marsh.","PARK"],
  ["Seattle Art Museum","The Hammering Man out front, and a strong Northwest Coast Native collection.","ART"],
  ["Olympic Sculpture Park","Free, outdoors, on the waterfront, with Calder's Eagle against the Sound.","ART"],
  ["Ballard Locks","Boats stepping between lake and sea, and a fish ladder with a window.","LANDMARK"],
  ["Fremont","The troll under the bridge, a Lenin statue and the Sunday market.","NEIGHBORHOOD"],
  ["Pioneer Square","The oldest part of the city, with the Underground Tour beneath it.","HISTORY"],
  ["Alki Beach","West Seattle sand with the skyline across the water and the ferry passing.","BEACH"],
  ["Capitol Hill","Bars, bookshops, Volunteer Park and the conservatory on the hill.","NEIGHBORHOOD"],
  ["Bainbridge Island ferry","Thirty-five minutes each way, and the ride back toward the skyline is the point.","VIEW"],
  ["The Museum of Flight","A Concorde, the first Air Force One and a full Space Shuttle trainer.","MUSEUM"],
  ["Gas Works Park","Rusted gasification towers kept as sculpture, on a hill over Lake Union.","PARK"],
  ["Green Lake","A paved three-mile loop the whole city walks.","OUTDOORS"],
  ["The Central Library","Koolhaas's glass origami, with the book spiral running continuously up four floors.","ARCHITECTURE"],
  ["Woodland Park Zoo","One of the first to replace cages with landscaped habitat.","ZOO"],
  ["Seattle Aquarium","On the waterfront, with an octopus and a glass dome you sit inside.","AQUARIUM"],
  ["Snoqualmie Falls","Two hundred and sixty-eight feet, half an hour east, with a lodge above it.","OUTDOORS"],
  ["Burke Museum","Natural history and Native art, with the preparation labs visible through glass.","MUSEUM"],
  ["Lake Union kayaking","Paddle among the houseboats and float planes from the south shore.","OUTDOORS"],
  ["The Burke-Gilman Trail","Twenty-seven miles on an old rail bed, from Ballard around the lake.","OUTDOORS"]],

 "WI-milwaukee":[
  ["Milwaukee Art Museum","Calatrava's Quadracci Pavilion opens and closes its 217-foot brise soleil twice a day.","MUSEUM"],
  ["Harley-Davidson Museum","The company archive, including Serial Number One, in its home city.","MUSEUM"],
  ["Historic Third Ward","Warehouse blocks and the Public Market, walkable from downtown on the Riverwalk.","NEIGHBOURHOOD"],
  ["Lakefront Brewery tour","The least reverent brewery tour in the country, and the one locals actually take.","FOOD"]],

 "WV-fayetteville":[
  ["New River Gorge Bridge","Eight hundred and seventy-six feet above the river, with a catwalk tour underneath it.","LANDMARK"],
  ["Raft the Lower Gorge","Grade IV–V in summer, and the best commercial whitewater east of the Rockies.","OUTDOORS"],
  ["Endless Wall Trail","Three miles along the clifftop with the gorge opening underneath at Diamond Point.","OUTDOORS"]],

 "WY-jackson":[
  ["Elk antler arches","Four arches on the town square built from antlers shed on the National Elk Refuge.","LANDMARK"],
  ["Snake River float","A scenic float under the Tetons, which is how most people first see the range properly.","OUTDOORS"],
  ["Jackson Hole aerial tram","Four thousand one hundred and thirty-nine vertical feet in nine minutes, with waffles at the top.","OUTDOORS"],
  ["National Museum of Wildlife Art","Five thousand works, and a building set into a hillside opposite the elk refuge.","MUSEUM"]]
};
