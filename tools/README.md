
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


---

## photos-hq.js — better photographs, hosted by you

The atlas started on Wikimedia Commons, which is free and correct and
frequently 800 pixels wide, a map of the county, or the town seal.
This replaces the weak ones with real photography from Pexels and
Unsplash, **downloads them**, and points the site at your own copies.

```bash
node tools/photos-hq.js --audit                      # what is wrong, nothing downloaded
node tools/photos-hq.js --run --pexels=KEY           # fix it, in priority order
node tools/photos-hq.js --run --pexels=KEY --tier=1  # just the state faces
```

Two free keys: [Pexels](https://www.pexels.com/api/) (200 requests an
hour) and optionally [Unsplash](https://unsplash.com/developers) (50 an
hour on a demo key, 5000 once approved). **Pexels alone is enough** —
Unsplash's demo limit is the slowest part of the whole job. Keys are
passed as arguments or read from `PEXELS_KEY` / `UNSPLASH_KEY` in the
environment; they are build-time only and never reach `config.js`,
because anything in there is downloaded by every visitor.

### The order it works in

1. **State faces.** A state has no photograph of its own — the state
   card borrows the picture of its best-known place. So about fifty
   carefully chosen places fix all fifty state cards. Highest leverage
   in the job, which is why it is first.
2. **Major cities** — the ones everybody has heard of.
3. **National parks, monuments and recreation areas.**
4. The remaining cities.
5. Everything else.

### Two things it refuses to do

**It will not use a photo that does not name the place.** Stock sites
are searched by name, not by coordinates, so a result is a picture
somebody *tagged* — perfect for a city skyline, and for an obscure
state park quite possibly a generic forest. If the place's distinctive
words never appear in the description, the candidate is thrown away
rather than marked down. A missing photograph is honest; a confidently
wrong one is not.

**It will not swap one low-resolution photo for another.** The point of
the run is resolution, so anything under `--min-width` (default 1400)
is rejected outright and the place keeps what it had.

Both mean some places are reported as "left alone". That is the tool
working, not failing.

### What it writes

- `assets/photos/<id>-1600.jpg` and `<id>-640.jpg`, fetched at exactly
  those widths straight from the provider's CDN — so there is no image
  processing here, nothing to install, no `sharp`.
- `assets/js/data/photos.js`, repointed at your own files.
- `PHOTO-CREDITS.md`, naming every photographer.

The runtime picks the size by the box it is drawing: a card asks for
640, a hero asks for 1600. Previously every card downloaded a
hero-sized image, which is most of why they were slow.

### Resolution, speed and the law

It is **resumable** — anything already in `assets/photos/` is skipped,
so stopping it and running again tomorrow loses nothing. That matters
on an Unsplash demo key.

Both licences allow download, self-hosting, modification and commercial
use with no permission needed. Pexels requires no attribution; Unsplash
does not strictly either, though its API terms ask for the photographer
and a link back — which is what `PHOTO-CREDITS.md` and the stored
`by`/`u` fields are for. Neither licence clears a trademark or a
recognisable face inside the frame; irrelevant for skylines and
landscapes, worth knowing before putting one on a T-shirt.

Afterwards bump `?v=` in `index.html` **and** `VERSION` in `sw.js`.

---

## photos-import.js — photographs you downloaded by hand

Pexels has paused new API keys, so if you are downloading pictures
yourself this files them for you.

```bash
node tools/photos-import.js --from=~/Downloads/meridian-photos           # shows the plan
node tools/photos-import.js --from=~/Downloads/meridian-photos --apply   # does it
```

Name each file after the place. The matcher is forgiving — `denver.jpg`,
`grand canyon.jpg`, `Zion-National-Park.jpeg` and
`new york city skyline.png` all land correctly, and junk words like
`pexels-photo-1234567` are ignored rather than guessed at.

**It refuses to guess.** `portland.jpg` is reported as ambiguous
between Oregon and Maine rather than silently picking one. The fix is
to rename the file to the place id — `node tools/photos-import.js --ids`
prints all 402 — or add the state: `portland or.jpg` resolves cleanly.

It reads the real pixel size out of the file header, with no image
library required, and flags anything under `--min-width` (default 1400)
since resolution is the point of the exercise.

Resizing uses `sharp` if you have it, ImageMagick if you do not, and if
you have neither it copies the file into both slots and says so. A
source smaller than 1600px is never upscaled — a 900px picture stays
900px rather than pretending to be a hero.

### Credit

Optional `credits.csv` in the same folder:

```csv
file,photographer,source,url
denver.jpg,Jane Doe,Unsplash,https://unsplash.com/photos/xyz
"grand canyon.jpg","Smith, John",Pexels,https://pexels.com/p/1
```

Anything without a line is filed as "Photographer unknown" — legal for
all three stock sites, none of which require attribution — and
`PHOTO-CREDITS.md` lists the gaps so you can fill them in later.

---

## Where to get photographs now that Pexels is closed

| Source | Key | Resolution | Right place? |
|---|---|---|---|
| **NPS** | you already have one | 2000px+ | **guaranteed** |
| Unsplash | instant, 50/hr demo | very high | tagged, so checked |
| Pixabay | instant | **1280px cap** on a standard key | tagged |
| Wikimedia | none needed | varies wildly | geosearch is exact |

**The National Park Service is the best source you have and it needs
nothing new.** Its photographs are works of the federal government, so
public domain — no licence, no attribution, nothing to get wrong — and
`photos-hq.js` fetches them *by park code* rather than by searching a
name, so the wrong-place problem cannot occur at all. It now runs first
for every national park, monument, recreation area and historic site,
and only falls through to the stock sites if the NPS has nothing:

```bash
node tools/photos-hq.js --run --tier=3      # the whole park service, no new key
```

Pixabay is worth knowing about but note the cap: a standard key only
returns images up to 1280px wide, which is below the 1400px threshold,
so it will reject almost everything unless you pass `--min-width=1200`.
