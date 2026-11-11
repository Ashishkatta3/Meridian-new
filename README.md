# Meridian

A personal travel atlas of the United States. Static files — no build step, no
server needed. Open `index.html` and it runs.

This is the rebuild. The old single-folder version still exists separately as a
reference until you are happy with this one.

---

## Where everything is

Every file does one job and is named after it. Nothing is longer than it needs
to be, so you can find things.

```
index.html              the page shell, and nothing else
tools/
  gen-geo.js            regenerates the map geometry (run by hand, rarely)
  port-data.js          one-time import from the old site. Do not re-run.
assets/
  css/
    tokens.css          every colour and font, in one place
    base.css            reset, typography, page shell
    map.css             the map, and only the map
  js/
    core/
      state.js          what you have marked as been / want to go
      photos.js         serves the baked-in photo, or fetches one live
    data/
      taxonomy.js       the tag vocabulary: kind, land, who, flags
      places.js         every place, with coordinates and tags
      spots.js          what to do, per place
      food.js           where to eat, per place
      info.js           GENERATED — summary, travel intro, park facts
      photos.js         GENERATED — one licence-checked photo per place
      geo.us.js         GENERATED — state outlines and projected x/y
    map/
      icons.js          one glyph per kind of place
      usmap.js          the interactive map
    app.js              boot: wires the pieces together, holds no logic
```

The rule: if you are looking for how something *looks*, it is in `css/`. How
something *behaves*, in the matching `js/` file. `app.js` only connects things
and should stay short.

---

## The map

`assets/js/map/usmap.js`. Two ideas drive it.

**Density follows zoom.** Four hundred markers at once is a wall of pins, so
every place carries a prominence from 1 to 10 and the map draws only what fits.
Zoom in and the country fills in. On top of that, any two markers that would
overlap get thinned out — the more prominent one keeps its spot and the other
waits until you zoom in far enough to separate them. This is why the phone shows
about 39 markers where the laptop shows 66: same rule, smaller screen.

Anything *you* have marked is always drawn, at every zoom.

**Panning is free.** The markers live inside the transformed group, so dragging
moves one element rather than four hundred. Only zooming touches the markers, to
keep them the same size on screen as the country grows underneath them.

Marker size is set in real screen pixels, not map units — 26px on a laptop, 21px
on a phone. Sizing in map units looks right on a desktop and comes out about
eight pixels across on a phone.

### Changing it

- **Colours** — `tokens.css`. Gold means been, teal means want to go. They are
  used for nothing else, so they always mean the same thing.
- **Icons** — `map/icons.js`. Each is a path in a 24×24 box.
- **How crowded it is** — `umFloor()` in `usmap.js` sets the prominence needed at
  each zoom. Lower numbers mean more pins.
- **Marker size** — `umPinPx()` in `usmap.js`.

---

## The geometry is generated

`assets/js/data/geo.us.js` is **not hand-edited**. It holds the state outlines
and the x/y of every place, already projected, so the site ships plain numbers
and carries no mapping library at all.

The projection is Albers USA, which insets Alaska and Hawaii rather than
flinging them across the canvas. Because every coordinate is projected ahead of
time, there is no projection code at runtime.

To rebuild it after the place data changes:

```bash
cd tools
npm install us-atlas topojson-client d3-geo
node gen-geo.js ../assets/js/data/geo.us.js
```

It reads the place data, projects it, and prints what it wrote.

---

## Bump `?v=` on every deploy

Every script and stylesheet in `index.html` ends with `?v=1`. **Change that
number — all of them — each time you upload a new version.**

Browsers, phones especially, cache each file separately and for a long time.
Without a new number a phone can end up holding a *new* `index.html` next to an
*old* `usmap.js`, which produces a site where the pages exist but the data
behind them does not. It looks like a bug in the code and it is not.

---

## The data

Four hand-editable files, one job each.

**`places.js`** — everything with a page and a map marker. 392 of them: 218
cities, 61 national parks, 45 state parks, and the shores, canyons and falls in
between.

```
id -> [ name, state, kind, lat, lon, prominence, land[], who[], flags[], blurb ]
```

**`spots.js`** — what to do, keyed by place id. 547 entries. It favours things
that will still be there in ten years: museums, parks, neighbourhoods,
landmarks, natural features. Restaurants that opened last year are not in here,
because that list is wrong within a season.

**`food.js`** — where to eat, same keying, same bias toward institutions.

**`taxonomy.js`** — the controlled vocabulary. Three axes kept deliberately
apart: `land` is what a place looks like (objective), `who` is who it suits
(editorial), `flags` is what it is known for. Mixing them would make all three
useless for filtering.

### The honest part

`land` and `flags` are inferred from what a place is, so they are reliable.
`who` — solo, couples, honeymoon, families — is **editorial judgement, not
data**. Nothing free will tell you what share of visitors to a place are
couples. It is applied only where the case is obvious and left off everywhere
else, so filtering returns a short honest list rather than a long invented one.

Prominence is also a judgement call. It drives how early a marker appears as
you zoom, and for cities it rises with how much the atlas actually knows about
them.

### Adding a place

Add a row to `places.js`, then re-run `node tools/gen-geo.js` so the map picks
up its coordinates. Spots and food are optional and can be filled in later.

---

## Photos

Still no image *files* in the project — but now there is a baked-in list of
which picture to use. `data/photos.js` holds one record per place: a 480px
thumbnail URL, an 1100px URL, and the author, licence and source link. The
images themselves stay on Wikimedia's servers and are loaded straight from
there when a place is opened, so the repository carries URLs, not megabytes.

Every one of those photos was licence-checked at build time and kept only if
it is free for any use, commercial included — CC0, public domain, CC BY, or
CC BY-SA. Non-commercial and no-derivatives images were dropped on purpose, so
nothing here becomes a problem if the site is ever monetised. Each caption shows
the photographer and links to the file page, which is how the licences are
honoured. A handful of parks use an official NPS photo instead; those are public
domain and credited to NPS.

`core/photos.js` serves that baked-in photo first — instant, no network round
trip, guaranteed clean. Only a place that is *not* in `photos.js` (something you
add later) falls through to a live Wikipedia lookup. A place with no free photo
at all — five of them today, Washington D.C. among them — falls back to a drawn
placeholder of its own icon rather than a broken image. That is the correct,
legal result, not a bug to paper over.

### Where the content came from

`photos.js` and `info.js` are generated by the three fetch scripts in `tools/`
(`fetch-seed.js`, `fetch-photos.js`, `fetch-nps.js`), which pull from Wikipedia,
Wikivoyage, Wikimedia Commons and the NPS API into one `meridian-seed.json`,
then a merge step writes the two data files. `info.js` carries, per place, a
short summary, a travel intro, the article link, and — for parks — the official
description, fees, weather, hours and activities. It is the text the place pages
will be built from. Re-run the scripts and the merge to refresh everything; the
raw text is well-sourced but worth a spot-check before you lean on it.

---

## What is built, and what is not

Built: the map, place marking, the file structure, the generated geometry, the
place data, the tag vocabulary, the photo pipeline, **the place pages**, and
**the home page**.

A hash router (`core/router.js`) runs two views. `#/` is the home page — the map,
a planner call-to-action, the place of the week, a seasonal "where to go this
month" set, and the atlas counters, all under `pages/home.js`. `#/place/<id>` is
a place page (`pages/place.js`): a photographic hero, the summary and travel
intro, the local clock, live weather (Open-Meteo, free, no key), a best-time
guess, prominence and tags, things to do, where to eat, full park information for
NPS sites, a nearby mini-map that reuses the projection (`map/mini.js`), a
within-a-drive list computed from coordinates (`core/geo.js`), outbound
hotel/restaurant/event search links, and been / want / add-to-itinerary controls
(`core/itin.js`). Share a place URL and it opens straight to that place.

**Trips** (`#/trips`) and **the planner** (`#/planner`) are built too, reachable
from the nav bar. Trips slices the atlas three ways — geography, who it suits,
what it is known for — from `core/tags.js`. The planner (`pages/planner.js`,
`core/trips.js`) holds any number of trips, each with days, a pool of ideas,
drag-and-drop between days, per-stop notes, drive times between consecutive
stops, and a text export.

**Accounts and shared trips** are built (`core/config.js`, `core/auth.js`,
`core/cloud.js`, `pages/account.js`, `supabase/schema.sql`). They are dormant
until a Supabase project URL and anon key go into `config.js`; with no keys the
whole site runs exactly as before, in one browser, and the Account page explains
how to connect rather than showing a form that cannot work. Signed in, trips
live in Postgres, sync across devices, and can be shared by email invite with
live updates. The display NAME is always shown, never the email.

Browsing: `#/map` is the map plus every state as a card; `#/state/XX` lists
everything in that state. A state is clickable on the map itself.

Not yet: in-app events and bookings (the place page links out to a live search
meanwhile), and the AI planner.

Things-to-do and food start rich for eleven large cities and thin elsewhere.
`tools/fetch-listings.js` closes that: Wikivoyage writes city guides as
structured `{{see}}` `{{do}}` `{{eat}}` templates, which is the same shape
`spots.js` and `food.js` already use, so the script reads the wikitext and
merges them in. It merges rather than overwrites — hand-written entries survive
and duplicates by name are dropped — so it is safe to re-run.

A trip stop can be a whole place OR one attraction inside a city
(`CA-san-francisco#3`); `core/stops.js` resolves either to the same shape, which
is why the planner can hold "Golden Gate Bridge" and not just "San Francisco".

---

## About the tags

`places.js` has a tag vocabulary but barely any tags filled in — `who` was on no
place at all, and `land` was 218 × "urban" with no "mountain" anywhere. A Trips
page reading those columns straight would show empty lists, so `core/tags.js`
works the tags out at runtime from the kind of place, the state and the name.
Explicit tags in `places.js` always win; the derivation only fills gaps.

How much to trust each axis:

- **land** — geography, from kind and name. Reliable. Worth knowing that name
  matching needs care: "bay" once pulled Glacier Bay into the beaches and
  "sands" pulled in White Sands, so both are excluded and handled by the water
  and desert patterns instead.
- **flags** — partly objective (a national park has trails) and partly the
  curated name lists at the top of the file. Edit those lists to tune it.
- **who** — a rule of thumb, not data. Nothing free records who actually travels
  where, so it is inferred from the other two axes, and the Trips page says so
  on screen rather than passing it off as fact.

## Photos, hotlinked or local

By default the photo URLs point at Wikimedia. If images do not appear, an ad or
privacy blocker is the usual culprit — `ERR_BLOCKED_BY_CLIENT` in the network
tab. `tools/download-photos.js` pulls every image into `assets/img/places/` and
rewrites `photos.js` to local paths, which ends the problem for good and keeps
the credits intact in `CREDITS.txt`. The hotlinked version is kept as
`photos.remote.js` so the change is reversible.
