# AGENTS.md: handoff for agents working on Massachusetts Explorer

Owner: Bill Weathersbee. Live: https://unclebill-spec.github.io/massachusetts-explorer/ (repo `unclebill-spec/massachusetts-explorer`, GitHub Pages from `main`).
Sister sites: Kentucky (`/workspace/kentucky/`) and Tennessee (`/workspace/tennessee/`). All three run the **same app code**. Times are US Eastern.
Progress log: `/workspace/massachusetts/STATUS.md` (updated often; earlier workers were interrupted).

## Layout: towns instead of counties
- The map's blocks are Massachusetts' **351 towns and cities** (Census 2023 county subdivisions, `data/statewide/raw/cb_2023_25_cousub_500k.zip`). They sit in the shared app's "counties" slot (`K.counties`, `#county=<Town>`), so every county feature (cards, lists, focus, colors, zoom reveal) works for towns.
  - Display names drop Census' " Town" suffix on city-form towns ("Agawam Town" -> "Agawam"); `scripts/ma_common.py town_name()`.
  - 4 towns got new codes in 2024 (Amesbury, Easthampton, Methuen, Watertown); `ma_layers.py` maps them (`geo24`) for ACS + Gazetteer.
  - Boston is one block (the "mega-block"); Phase 5 adds a Boston neighborhood sub-map (`city.html`).
- Town words in the shared app come from `STATE`: `cu` "Town", `cus` "" (suffix after a name), `cup` "towns", `cuP` "Towns". KY/TN use the defaults ("County", " County", ...).
- Town card details are lazy: `data/d/<town>.js` (352 shards); `data/core.js` ~610 KB raw (smaller than TN's).

## Shared code
- `app.js`, `profiles.js`, `extras.js`, `perm.js`, `areas.js`, `style.css` are copied from `/workspace/kentucky/explorer/` (the source of truth). **Never edit them here**: edit in Kentucky (or a copy in `/workspace/kentucky/work/`), copy to TN and MA, test and publish all three.
- State switcher: `STATE["others"]` lists the other live state maps (KY, TN). Kentucky's defaults in app.js list TN + MA; TN's `build.py` lists KY + MA. Maine is not in any switcher (its port is on hold).
- localStorage prefix `max_`; service-worker caches `max-*` (shared origin with KY/TN).

## Data (real sources only; nothing estimated)
- `scripts/ma_layers.py` (venv python `/workspace/kentucky/.venv/bin/python`) writes `data/statewide/ma_town_*.csv`, `ma_hospitals_points.csv`, and `data/schools/*`:
  - cost: ACS 2020-24 median home value (B25077) + income (B19013), population (B01003) by town.
  - land: no town farm census exists; land score = low density (60%) + land area (35%) + water share (5%).
  - hospitals: MA DPH licensed hospitals (`data/hospitals.json`, MassGIS, Mar 2026; trauma = DPH OEMS ACS-verified list) + border Level I-III centers: NH (from `/workspace/new-hampshire/data/hospitals.json`), CT (Hartford, Saint Francis, Yale New Haven, HOCC, Backus; CT DPH list), RI (Rhode Island Hospital), NY (Albany Med). VT has no ACS-level center near MA.
  - RN market: BLS OEWS May 2025 via the BLS public API (no key; `data/statewide/raw/bls_ma*.json`), county -> OEWS area map `CO` in the script.
  - schools: MassGIS school points (DESE org codes) + MCAS spring 2026 (E2C Hub dataset i9w6-niyt, ELA + math, grades 3-8 and 10). Massachusetts gives no letter grades, so the map shows an **Explorer grade** from % meeting/exceeding vs the MA average (41.1%): A >= +15 pts, B +5..+15, C +-5, D -5..-15, F < -15. Town = public non-charter schools located in it (32 small towns with none use their 3 nearest). vs U.S.: SEDA 2025.1 district means (NCES LEAIDs of the schools in the town).
- `scripts/ma_appeal_build.py`: Appeal score per town (TN method; OSRM drive times from each town's Census internal point, cached `data/statewide/raw/osrm_town_hospital_drives.json`).
- `climate/build_clim.py` -> `data/clim.json` (NOAA 1991-2020 normals; stations parsed by `climate/parse.py` from the KY tarballs).
- Parks/caves (and Phase 4 waterfalls/trails): `data/osm/wd_act.py` (Wikidata; Overpass was unreachable on Oct 2, 2026). Phase 4 files wait in `data/_p4hold/`.
- Colleges: NCES EDGE postsecondary 2023-24 (`data/osm/nces_post.json`).
- Compare areas: `compare/ma_areas.py` -> `data/areas.json` = Kentucky's areas.json (KY + TN rows) + Boston, Worcester, Springfield, Cambridge, Lowell, each paired with the closest-population KY/TN city. `blk` = the town block for the card's "vs" box. Crime numbers are still pending (same as KY/TN).

## Build, test, publish
- Build: `cd explorer && /usr/bin/python3 build.py` (~1 s). Serve: `python3 -m http.server 8851 --bind 127.0.0.1` (pick a free port; don't pkill http.server).
- Test: `/usr/bin/python3 perf/smoke.py BASE TAG` (412x915 + 915x412; prints ALL PASS; shots in `perf/shots/`).
- Publish: `cd publish && PATH=/usr/bin:$PATH ./publish.sh -m "What changed"` (lock, pull/fast-forward, secscan on files + history before every push, minify, push, wait for Pages). Verify: `/usr/bin/python3 publish/verify.py https://unclebill-spec.github.io/massachusetts-explorer/`.

## Phases (Bill's plan)
1. Base map: towns + Appeal score, hospitals and trauma (with border centers), schools vs MA and U.S., colleges, parks, caves, climate, Compare areas, switcher.
2. Homes: Bill's 3 searches (5+ ac land $300k-$500k with bargains; 1+ ac 3/2 under $425k; near-hospital 1,600+ sq ft 3/2 under $325k, condos/townhomes OK, good condition, <= 10 min to a 10+ bed ER). MA prices are high: report counts honestly; never loosen.
3. Jobs: permanent RN (blue hats) + travel RN (red hats, weekly pay in $k). Exclusions: mom-baby, L&D/OB, NICU, women's, peds, OR (CVOR, scrub, circulator, first assist), cath lab. PACU/recovery/CVICU OK. Never get around site blocks; plain web search instead; HCA last.
4. Attractions, waterfalls, trails, airports, businesses for sale < $1M, odd buildings < $600k.
5. Boston neighborhood sub-map (~23 neighborhoods, `raw/boston_nbhd.geojson`, city-living criteria: houses, condos, townhomes).

## Rules
- Never commit secrets; secscan runs before every push. Pull before pushing. Descriptive commits. Keep CHANGELOG.md, AGENTS.md, STATUS.md current.
- Load time ~1 s on a throttled phone; lazy-load anything not needed for the first view.
- Same icon and zoom rules as KY/TN (see `/workspace/kentucky/explorer/AGENTS.md`).
