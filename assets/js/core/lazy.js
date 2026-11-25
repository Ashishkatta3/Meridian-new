/* ===========================================================
   LAZY SCRIPTS
   ===========================================================

   The guide files are the largest things in the atlas — Italy,
   Costa Rica and India together run to well over a megabyte of
   prose — and they are read by exactly one view each: the place
   page for that country. Loading them in index.html meant every
   visitor paid for all three before the home page could paint,
   including someone who only ever looks at Utah.

   So they are fetched on demand instead. Each file is requested
   at most once per session; the promise is cached, so ten rapid
   navigations produce one request. Callers await the guide and
   then render, and because every call site already guards with
   `typeof inGuide === 'function'`, a failed load degrades to a
   place page without its written guide rather than to an error.

   There is no bundler here, so this is a plain <script> tag
   appended to the head. It runs in global scope exactly as it
   would have done from index.html, which is what the data files
   expect.
   =========================================================== */

/* Matches the ?v= stamp the rest of the page is loaded with, so a
   deploy busts this cache alongside everything else. Read off our
   own script tag rather than hardcoded, which keeps it in step
   with index.html automatically. */
const LAZY_VER = (function(){
  try {
    const own = document.querySelector('script[src*="core/lazy.js"]');
    const m = own && own.getAttribute('src').match(/\?v=(\d+)/);
    return m ? m[1] : '';
  } catch (e){ return ''; }
})();

const LAZY_PENDING = {};

/* Loads a script once and resolves when it has run. Resolves with
   true on success and false on failure — it never rejects, so a
   caller can simply `await` and carry on either way. */
function loadScriptOnce(src){
  if (LAZY_PENDING[src]) return LAZY_PENDING[src];

  LAZY_PENDING[src] = new Promise(resolve => {
    let el;
    try {
      el = document.createElement('script');
    } catch (e){ return resolve(false); }

    el.async = false;                  /* preserve execution order */
    el.src = src + (LAZY_VER ? '?v=' + LAZY_VER : '');
    el.onload  = () => resolve(true);
    el.onerror = () => {
      /* Drop the cached promise so a later navigation can retry —
         a one-off network blip should not disable guides for the
         rest of the session. */
      delete LAZY_PENDING[src];
      resolve(false);
    };

    try { document.head.appendChild(el); }
    catch (e){ delete LAZY_PENDING[src]; resolve(false); }
  });

  return LAZY_PENDING[src];
}

/* The guide file for each country that has one. */
const GUIDE_SRC = {
  IT: 'assets/js/data/italy.guide.js',
  CR: 'assets/js/data/cr.guide.js',
  IN: 'assets/js/data/in.guide.js'
};

/* Awaited by a country's place page before it renders. Returns
   true if the guides are available, false if they could not be
   fetched — in which case the page still renders, just without
   the written sections. */
function guideReady(country){
  const src = GUIDE_SRC[country];
  if (!src) return Promise.resolve(false);
  return loadScriptOnce(src);
}

/* Warm a country's guides without waiting for them. Called when
   someone lands on a country index or region list, on the fair
   assumption that a place page is next, so the fetch overlaps
   with their reading instead of delaying a render. */
function guideWarm(country){
  try { guideReady(country); } catch (e){}
}
