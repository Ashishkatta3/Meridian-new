/* ===========================================================
   EVENTS

   Live events from Ticketmaster's Discovery API. It is free, the
   key is a browser key (it sits in config.js next to the Supabase
   anon key), and it sends CORS headers so the page can call it
   directly — no server, no proxy.

   Get one in about two minutes:
     https://developer.ticketmaster.com/  ->  sign up  ->  the key is
     on your app's page as "Consumer Key". Paste it into config.js.

   With no key nothing breaks: the home page falls back to links
   that open a search for the same thing, which is honest about
   what it can and cannot do.

   Two modes, as asked:
     signed in  -> what is on where you WANT to go
     signed out -> what is on around the country
   =========================================================== */

const TM_API = 'https://app.ticketmaster.com/discovery/v2/events.json';
const EV_CACHE = {};            /* per session; events do not change by the minute */

function eventsReady(){
  return typeof TICKETMASTER_KEY !== 'undefined' && !!TICKETMASTER_KEY;
}

function evNormalise(e){
  const v = (e._embedded && e._embedded.venues && e._embedded.venues[0]) || {};
  const d = (e.dates && e.dates.start) || {};
  const imgs = (e.images || []).filter(i => i.width >= 300).sort((a, b) => a.width - b.width);
  return {
    name: e.name,
    url: e.url,
    date: d.localDate || '',
    time: d.localTime || '',
    venue: v.name || '',
    city: (v.city && v.city.name) || '',
    state: (v.state && v.state.stateCode) || '',
    image: imgs.length ? imgs[0].url : ''
  };
}

async function tmGet(params){
  if (!eventsReady()) return [];
  const url = TM_API + '?apikey=' + encodeURIComponent(TICKETMASTER_KEY) + '&' + params;
  if (EV_CACHE[url]) return EV_CACHE[url];
  try {
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 9000);
    const r = await fetch(url, { signal: ctl.signal });
    clearTimeout(to);
    if (!r.ok) return [];
    const j = await r.json();
    const list = ((j._embedded && j._embedded.events) || []).map(evNormalise);
    EV_CACHE[url] = list;
    return list;
  } catch(e){ return []; }
}

const evToday = () => new Date().toISOString().slice(0, 19) + 'Z';

/* What is on near the places someone wants to go. One call per
   place, a few places at most, because this runs on page load. */
async function eventsForPlaces(ids, max){
  const want = (ids || []).slice(0, 4);
  const out = [];
  for (const id of want){
    const p = placeGet(id); if (!p) continue;
    const list = await tmGet('latlong=' + p.lat + ',' + p.lon + '&radius=30&unit=miles'
      + '&size=3&sort=date,asc&startDateTime=' + evToday());
    list.forEach(e => { e.forPlace = p.name; out.push(e); });
    if (out.length >= (max || 8)) break;
  }
  return out.slice(0, max || 8);
}

/* What is on around the country, biggest first. */
async function eventsNationwide(max){
  const list = await tmGet('countryCode=US&size=' + (max || 8)
    + '&sort=relevance,desc&startDateTime=' + evToday());
  return list.slice(0, max || 8);
}

/* a search link, for when there is no key or nothing came back */
function eventSearchURL(placeName){
  return 'https://www.ticketmaster.com/search?q=' + encodeURIComponent(placeName || '');
}

function evDateLabel(e){
  if (!e.date) return '';
  const d = new Date(e.date + 'T12:00:00');
  if (isNaN(d)) return e.date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
