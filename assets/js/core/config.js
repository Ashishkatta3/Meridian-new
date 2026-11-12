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

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

/* Ticketmaster Discovery API — powers the events on the home page.
   Free, and a browser key like the one above: sign up at
   https://developer.ticketmaster.com/ and copy the "Consumer Key".
   Leave it empty and the events section shows search links instead
   of live listings. */
const TICKETMASTER_KEY = '';

/* true once both are filled in */
function cloudReady(){
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}
