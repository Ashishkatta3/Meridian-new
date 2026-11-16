/* ===========================================================
   CONFIG

   Paste your Supabase project's URL and anon key below and the
   site gains accounts and shared trips. Leave them empty and
   everything still works, stored in this browser only.

   The anon key is MEANT to be public — it is the browser key, and
   it grants nothing on its own. What protects your data is Row
   Level Security in the database (see supabase/schema.sql), which
   is why that file must be run before you sign anyone up.

   NEVER put the service_role key here. That one bypasses every
   policy, and anyone could read it out of the page source.

   Find both values in Supabase:
     Project Settings -> API -> Project URL, and "anon public".
   =========================================================== */

const SUPABASE_URL = 'https://dvssvxavmubnxzaobeiv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Ojsf1S_G0KYqIsPv0zhxxg_3d0kMFUi';

/* Ticketmaster Discovery API — powers the events on the home page.
   Free, and a browser key like the one above: sign up at
   https://developer.ticketmaster.com/ and copy the "Consumer Key".
   Leave it empty and the events section shows search links instead
   of live listings. */
const TICKETMASTER_KEY = '';

/* ---------------------------------------------------------------
   LIVE DATA

   Everything below is optional. The live panels check for a key
   before they ask for anything, and quietly leave out whatever has
   no key — so an empty file here costs you a few rows, not a
   working site.

   Most of what the site shows live needs no key at all: the
   forecast and weather warnings (api.weather.gov), tides (NOAA),
   aurora (NOAA SWPC), sunrise and darkness, cloud cover
   (Open-Meteo), public holidays (Nager.Date), what is nearby
   (OpenStreetMap) and road distances (OSRM) are all open.
   --------------------------------------------------------------- */

/* National Park Service — live closures, road conditions and fire
   restrictions on every park page. Free: https://www.nps.gov/subjects/developer/ */
const NPS_KEY = 'CqcGc9nNMFdhHgpKQt7B8MqpP8WpNPCHTzcqMgtW';

/* US Energy Information Administration — real regional fuel prices,
   so a trip's cost is this week's, not a guess.
   Free: https://www.eia.gov/opendata/register.php */
const EIA_KEY = 'CCkd9t7MwGDhpthpFHJMTpwnLFDQphHcCChP6MQM';

/* Used for fuel cost when EIA_KEY is empty. Dollars per gallon. */
const GAS_FALLBACK = N/A;   /* a number, not text — it is multiplied */

/* Recreation.gov — campgrounds and timed-entry permits.
   Free: https://ridb.recreation.gov/.  Note that this one may refuse
   browser requests outright; the panel falls back to a search link. */
const RIDB_KEY = '68ec6626-5953-4dde-8105-8ee60bf1076c';

/* Mapillary — street-level photographs, used by the photo picker to
   fill places that have nothing else. A client token, safe to ship
   (like the Supabase anon key). Free: https://www.mapillary.com/dashboard/developers */
const MAPILLARY_TOKEN = '29609881015369208';

/* Map tiles for the street-level maps. Leave both empty and the site
   tries several providers and keeps the first that actually works —
   OpenStreetMap and CARTO both now refuse this kind of use and draw
   their refusal onto the map, so the site tests each provider before
   trusting it. To pin one yourself, open tools/tile-test.html, see
   which passes from your network, and paste its two lines here. */
const TILE_URL = '';
const TILE_ATTR = '';

/* true once both are filled in */
function cloudReady(){
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}
