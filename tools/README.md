
---

## fix-photos.js — the pictures that are missing or wrong

Wikipedia's lead image for a town is often a montage, a locator map or a
logo, and sometimes it is simply the wrong article's picture. The audit
finds all of that without a judgement call:

```
node tools/fix-photos.js
```

It reports every place whose photo is missing, is a `.svg`, `.tif` or
`.gif` (none of which a browser will draw as a hero), is a montage, map,
flag or logo, or is a panorama that crops to a stripe in a card.

To gather replacements:

```
node tools/fix-photos.js --fetch
node tools/fix-photos.js --fetch --flickr=KEY --mapillary=TOKEN
```

Candidates come from the place's own Wikipedia article, from Wikimedia
Commons photographs taken within four miles of its coordinates, and —
with keys — from Flickr restricted to reusable licences and from
Mapillary street-level imagery. Each is scored on shape, size, licence
and whether the file name mentions the place.

Nothing is overwritten automatically. Open `tools/photo-review.html`,
load `tools/out/photo-candidates.json`, click the picture you want for
each place (the dashed red one is what the site shows now), download
`picks.json`, then:

```
node tools/fix-photos.js --apply=tools/out/picks.json
```

Bump `?v=` in `index.html` afterwards.

Free keys: Flickr at <https://www.flickr.com/services/apps/create/apply>,
Mapillary at <https://www.mapillary.com/dashboard/developers>. Neither is
required — the two Wikimedia sources need nothing.

## fetch-wikidata.js — growing the atlas

Wikidata holds every UNESCO site, National Historic Landmark,
lighthouse, observatory, botanical garden, national monument, scenic
byway, canyon, waterfall and hot spring in the country, with
coordinates and a state.

```
node tools/fetch-wikidata.js
node tools/fetch-wikidata.js --type=lighthouse --state=ME
node tools/fetch-wikidata.js --min=15 --emit
```

It proposes, it never writes to `places.js`. Anything already in the
atlas by name is dropped; anything within a type-specific distance of a
place you already have is flagged as a likely duplicate rather than
hidden, because sometimes it is a genuinely different thing nearby.
Results are ordered by how many language Wikipedias write about it,
which is a fair proxy for whether it deserves a page.

`--emit` also writes `tools/out/places.new.js` with pasteable rows.
Prominence is left at a placeholder 5 and every blurb is empty on
purpose: those are the judgements, and they are the part that makes
this an atlas rather than a database dump.

## tile-test.html — which map provider works from here

Two tile providers have now drawn their own refusal across the map:
OpenStreetMap answers "Access blocked" and CARTO answers "API key
required". Both arrive as a valid HTTP 200 image, so nothing throws and
no error event fires — the only way to tell is to look at the picture.

Open `tools/tile-test.html` in the browser you actually use. It asks
nine providers for two tiles from opposite sides of the country; a
provider that is refusing returns the *same* picture for both, because
it is a notice rather than a map. It then prints the two config lines
for whichever provider passed.

The site runs the same check on its own and remembers the answer, so
this page is only needed when you want to choose a specific look — the
satellite basemap, say — or when none of them work and you need to see
why.

## photo-picker.html — the easy way, no node, no Flickr

Flickr's API now needs a paid account, so the picker uses **Openverse**
instead — a free, keyless aggregator that indexes the same Creative
Commons Flickr photos plus Wikimedia and museum collections — alongside
Commons geosearch and Mapillary street-level imagery.

There is no fetch step and no node. Open `tools/photo-picker.html` in a
browser (keep `photo-needs.js` next to it). The left rail lists the 33
places with a broken photo first, then all 402. For each place it
live-searches all three sources; click the one you want, refine the
search terms, or paste any image URL. When done, **Download picks.json**,
then apply it the same way:

```
node tools/fix-photos.js --apply=tools/out/picks.json
```

Then bump `?v=` in index.html.

`photo-needs.js` is regenerated from the current photos.js whenever you
want a fresh audit — the command is in fix-photos.js, or just re-run the
one-liner that built it.

The Mapillary token is baked into the picker and into config.js
(`MAPILLARY_TOKEN`); it is a client token, safe to ship. The node tool
also reads Openverse now, so `--flickr` is no longer needed — but still
works if you ever get a key.


---

## cloud-test.html — what is the database actually doing?

Your trips, and your been/want marks, are written to Supabase from the
browser, which means I cannot test them from here: every check I can run
locally confirms the browser side is correct, and the failures you have
been seeing live on the other side of the network.

This page settles it. Open `tools/cloud-test.html`, paste the same URL
and key that are in `assets/js/core/config.js`, plus an email and
password you can sign in with, and press **Run the checks**. It tries
every operation the site depends on and prints the exact Postgres error
for each one:

| Check | What a failure means |
|---|---|
| supabase-js loads | the CDN is blocked |
| Sign in | the key is wrong, or the wrong kind |
| Read the trips table | the select policy is refusing you |
| Write a trip | the insert/update policy is refusing you |
| Same id twice | **if this fails, it is the cause of places appearing under the wrong trip** |
| marks table | the table does not exist — `schema.sql` did not finish (see below) |
| trip_invites insert | invites cannot be written |
| Realtime | other devices' edits will need a reload |

It cleans up everything it writes.

### Re-run schema.sql first

There was a real bug in `schema.sql`: the line that turns on Realtime,

```sql
alter publication supabase_realtime add table public.trips;
```

throws `relation "trips" is already member of publication` the *second*
time it runs. The SQL editor runs a pasted file as one transaction, so on
a re-run that error **aborted every statement below it** — and the
`marks` table is at the bottom of the file. That is why the places you
marked on your laptop were not on your phone: the table they sync
through was never created.

It is now wrapped in an exception handler, so the file is safe to re-run
whole. Do that before running the checks above.


---

## gather.js — filling in the atlas

`node tools/gather.js` with no arguments prints the run order. The
short version, in the order to run them:

```bash
node tools/gather.js --fetch --sets=wikidata,wiki   #  ~8 min, keyless
node tools/gather.js --fetch --sets=nps             #  ~4 min, needs NPS_KEY
node tools/gather.js --fetch --sets=climate         #  ~5 min, keyless
node tools/gather.js --fetch --sets=photos,osm      #  ~40 min, keyless, slow on purpose
node tools/gather.js --apply
node tools/fix-photos.js --fetch
node tools/fix-photos.js --apply
```

Then bump `?v=` in `index.html` **and** `VERSION` in `sw.js` — they
have to match or the service worker will serve a mixed set of files.

Nothing touches `assets/js/data/` until `--apply`, and `--apply` will
not overwrite a value that is already there unless you add `--force`.
So the hand-written sentences you care about survive by default, and
the gaps get filled.

### The freshness problem, specifically

Every record it writes carries `reviewed` (the date you ran it) and,
where it came from Wikipedia, `source_checked` — the date that article
was itself last edited. That is the thing that makes "is this five
years old?" answerable instead of assumed. After the first run you can
sort by it and see exactly which entries are stale.

### What needs your eye

Two files land in `tools/out/` rather than going straight in:

- `attractions-proposed.json` — named viewpoints, trailheads, museums
  and monuments near each place. Overpass will cheerfully offer you
  seven car parks called "Parking", so these are proposals.
- `coord-check.txt` — places whose atlas coordinates are more than
  three miles from Wikidata's. Usually the atlas is right and Wikidata
  is pointing at a visitor centre, but it is worth a look.
