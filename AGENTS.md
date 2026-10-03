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
- Home price caps: `ST.caps` (`{p5, p1, nh}`; defaults 500000/425000/325000 for KY/TN) drives every price label, the home / near-hospital Max price menus and the card kickers. MA sets 650000 for all three in `build.py`.
- Top-10 pill carousel (`carousel()` in app.js): loop clones are only made when the pills overflow the bar; when they all fit (e.g. MA landscape with one "Deals" pill) nothing is cloned (Oct 2 fix: MA showed "Deals" twice).
- Mega-block -> city page (Oct 3, 2026): `ST.cityPage` = `{ "<block name>": "city.html#<city>" }` (MA: `{"Boston": "city.html#boston"}` in build.py; TN: Davidson/Shelby; KY: none). Tapping that block on the map (with no pin under the finger) opens the city sub-map instead of the block card; pins on top still open first, a block in county-focus view keeps its card, and `#county=<name>` deep links / search still open the card. Leaving saves the map view in sessionStorage (`<ls>cityret`); a Back (back_forward) load with no hash restores it (and the bfcache keeps it anyway). The city page's "‹ map" link calls history.back() when it came from the main map, and has a link to the block's card. Test: `perf/test_blocktap.py BASE TAG Block=city[,Block=city] OtherBlock` (412 touch + 1280; `NOBF=1` blocks the bfcache to test the sessionStorage path).
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
- Parks/caves, waterfalls (18) and trails (28): `data/osm/wd_act.py` (Wikidata; Overpass was unreachable on Oct 2, 2026).
- Homes (Phase 2): `scripts/ma_zsearch.py` (Zillow public search pages per county, plain GET) -> `data/zsearch/`; `scripts/ma_er_beds.py` -> `data/hospital_er_beds.json` (10+ bed ER rule); `scripts/ma_listings_build.py` (OSRM drives, Zillow detail pages, photos) -> `listings.json`; `scripts/bargains.py`, `scripts/top_lists.py` (TN copies).
- Permanent RN jobs (Phase 3): `scripts/ma_perm_jobs.py` (port of TN on the KY collector; `--only key1,key2` reruns systems into `data/perm_jobs.partial.json`, then merge by system_key and recompute the summary) -> `data/perm_jobs.json`. Sources: Workday (MGB, BILH, UMass Memorial, Baystate, Tufts, BMC, Brown/Saint Anne's+Morton, Trinity/Mercy, South Shore, Sturdy, Dana-Farber), Radancy (Tenet: Saint Vincent, MetroWest), HealthcareSource (Lawrence General, Berkshire, Emerson, Holyoke, Brockton), iCIMS (Heywood, Southcoast), Infor (CHA), Taleo (Cape Cod; partial, 100 of 122 rows). Boston Children's and Shriners skipped (all pediatric). MGB Workday returns at most ~2,000 results, so MGH shows few posts. MA has no HCA hospitals.
- Travel RN jobs: `scripts/ma_travel_jobs.py` (Vivian public search pages + Advantis) -> `data/travel_jobs.json`; weekly pay < $800 dropped as placeholders; home care / VNA / behavioral / dialysis dropped (NON_HOSPITAL).
- Phase 4: `data/attractions/make_attractions.py` (hand list + Wikidata museums with an article and photo + MA DCR campgrounds; MANUAL_LL coordinates; Wikidata duplicates of hand entries dropped) -> `data/attractions.json`; `data/airports/airports.py` -> `data/airports.json` (11: 7 MA + PVD, MHT, BDL, ALB); `data/forsale/crexi_list.py` -> `ma_forsale.py` (keyword picks + hand-reviewed exclusions) -> `make_forsale.py` -> `data/businesses_for_sale.json` (< $1M) and `data/buildings_for_sale.json` (odd buildings < $600k).
- Boston (Phase 5): `scripts/ma_city_blocks.py` -> `data/city/blocks.json` (23 neighborhoods from `raw/boston_nbhd.geojson`; Harbor Islands dropped, Leather District -> Chinatown, Bay Village -> South End), `scripts/ma_city_search.py` (Zillow search pages, houses/condos/townhomes <= $900k, 1+ bd, like TN) -> `data/city/zs/boston/`, `scripts/ma_city_build.py` -> `explorer/city/boston.json`. Page: `explorer/city.html|js|css` (MA-only port of TN; localStorage `max_city_*`), `explorer/malinks.js` (Layers-panel link + Boston town card link). Tapping the Boston block opens the Boston map directly (`STATE["cityPage"]`); the page links back to the Boston town card.
- Colleges: NCES EDGE postsecondary 2023-24 (`data/osm/nces_post.json`).
- Compare areas: `compare/ma_areas.py` -> `data/areas.json` = Kentucky's areas.json (KY + TN rows) + Boston, Worcester, Springfield, Cambridge, Lowell, each paired with the closest-population KY/TN city. `blk` = the town block for the card's "vs" box. Crime numbers are still pending (same as KY/TN).

## Build, test, publish
- Build: `cd explorer && /usr/bin/python3 build.py` (~1 s). Serve: `python3 -m http.server 8851 --bind 127.0.0.1` (pick a free port; don't pkill http.server).
- Test: `/usr/bin/python3 perf/smoke.py BASE TAG` (412x915 + 915x412; prints ALL PASS; shots in `perf/shots/`); also `perf/test_homes.py`, `perf/test_perm.py`, `perf/test_p4.py`, `perf/test_city.py` (same BASE TAG args).
- Publish: `cd publish && PATH=/usr/bin:$PATH ./publish.sh -m "What changed"` (lock, pull/fast-forward, secscan on files + history before every push, minify, push, wait for Pages). Verify: `/usr/bin/python3 publish/verify.py https://unclebill-spec.github.io/massachusetts-explorer/`.

## Phases (Bill's plan)
1. Base map: towns + Appeal score, hospitals and trauma (with border centers), schools vs MA and U.S., colleges, parks, caves, climate, Compare areas, switcher.
2. Homes: Bill's 3 searches. **Caps raised Oct 2, 2026 (Bill, MA only): $650k on all three** — 5+ ac land $300k-$650k with bargains flagged; 1+ ac 3/2 under $650k; near-hospital 1,600+ sq ft 3/2 under $650k, condos/townhomes OK, good condition, <= 10 min to a 10+ bed ER. Every other criterion unchanged; KY/TN keep $500k / $425k / $325k. Where the caps live: `scripts/ma_zsearch.py` (search URLs; nh max 649999 because it is "under"), `scripts/ma_listings_build.py` (`LIM`, `LAND_MIN` 300000), `scripts/bargains.py` (`hard()` caps), `explorer/build.py` `STATE["caps"]` (labels/filters in the shared app.js read `ST.caps` via `CAPK`/`CAPOPTS`; KY/TN default to the old caps). Old $500k/$425k/$325k results: `data/zsearch_prev_caps/`. MA prices are high: report counts honestly; never loosen anything else.
3. Jobs: permanent RN (blue hats) + travel RN (red hats, weekly pay in $k). Exclusions: mom-baby, L&D/OB, NICU, women's, peds, OR (CVOR, scrub, circulator, first assist), cath lab. PACU/recovery/CVICU OK. Never get around site blocks; plain web search instead; HCA last.
4. Attractions, waterfalls, trails, airports, businesses for sale < $1M, odd buildings < $600k.
5. Boston neighborhood sub-map (~23 neighborhoods, `raw/boston_nbhd.geojson`, city-living criteria: houses, condos, townhomes).

## Rules
- Never commit secrets; secscan runs before every push. Pull before pushing. Descriptive commits. Keep CHANGELOG.md, AGENTS.md, STATUS.md current.
- Load time ~1 s on a throttled phone; lazy-load anything not needed for the first view.
- Same icon and zoom rules as KY/TN (see `/workspace/kentucky/explorer/AGENTS.md`).

## Ski areas + notable peaks (Oct 3, 2026)
23 ski areas and 28 peaks, from explorer/mtn.json and explorer/img/mtn/. These are shared app files from KY; full notes are in /workspace/kentucky/explorer/AGENTS.md.
- build.py has the mtn_build hook (`mtn_build.add(data)` before `write_split`, then `mtn_build.write_detail(OUT)`). Keep it if build.py is regenerated, or rerun `/workspace/mtn/scripts/hook_build.py /workspace/massachusetts`.
- Rebuild the data with `/workspace/mtn/scripts/make_state.py MA`. Test with `/workspace/mtn/test_mtn.py BASE TAG SKI_ID PEAK_ID`.

## Border items (Oct 3, 2026)
`explorer/border.json` (from /workspace/border/scripts/make_border.py) adds pins within ~15 mi outside the state line, tagged with their state (`bst`), excluded from town/county stats. Shared code: border_build.py + build.py hook + app.js. Details and regeneration: KY explorer/AGENTS.md 'Border items'.
- Oct 3, 2026: purple bargain star on the Bargain filter button etc. (shared app.js/style.css; KY explorer/AGENTS.md 'Purple bargain star everywhere').
- Oct 3, 2026: pill row fix kyxUI4 (shared app.js/style.css; KY explorer/AGENTS.md 'Pill row fix').
- Oct 3, 2026: kyxUI5 pill row pinned bottom-left + short-window column fit (shared; KY explorer/AGENTS.md).
