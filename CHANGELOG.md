# Changelog: Massachusetts Explorer

Dated entries of what changed (newest first). Each publish with a message adds a line here.

## 2026-10-03
- 07:50 ET: Tapping the Boston town block now opens the Boston neighborhood map (city.html#boston) directly; phone Back and the page's '‹ MA map' link return to the map at the same view, and the Boston page links to the Boston town card. Other towns keep their card; #county=Boston links and search still open the card. Shared app.js: generic per-state ST.cityPage config (Kentucky has none; Tennessee: Davidson -> Nashville, Shelby -> Memphis).

## 2026-10-02
- 19:50 ET: Phase 5: Boston neighborhood sub-map (city.html): 984 homes, condos and townhomes for sale (Zillow, <= $900k, 1+ bd) in 23 Boston neighborhoods (City of Boston boundaries), colored by matches, median price, $/sq ft, ER drive or condo share; per-profile criteria (default <= $650k, 2+ bd, 2+ ba, 1,000+ sq ft); OSRM drive minutes to the nearest 10+ bed ER and Level I/II trauma center. Linked from the Layers panel and the Boston town card.
- 19:38 ET: Phase 3 + 4 and $650k home caps: permanent RN jobs (2,176 from 23 MA employers; blue hats) and travel RN jobs (535 at 49 hospitals; red hats with weekly pay); attractions (206), airports (11), businesses for sale under $1M (50), odd buildings under $600k (10), waterfalls (18) and trails (28). Bill's MA-only change: all three home searches capped at $650k (5+ acres $300k-$650k, bargains still flagged; 1+ acre 3/2 under $650k; near-hospital 1,600+ sq ft 3/2 under $650k), every other criterion unchanged: 328 listings (58 / 160 / 110), 15 bargains. Shared app.js: price labels and Max price menus read ST.caps (KY/TN unchanged); Top-10 pill carousel no longer clones pills when they all fit (fixes 'Deals' shown twice).
- 18:36 ET: Phase 2 homes: 90 listings from Bill's 3 searches (22 homes on 5+ acres, 57 on 1+ acre, 11 near-hospital homes), photos, hospital drive times, 8 bargains, Deals Top 10; ER 10+ bed estimate for MA hospitals
- 18:19 ET: Phase 1: Massachusetts base map - 351 town blocks with Appeal score, MA hospitals and trauma centers plus border NH/CT/RI/NY centers, schools graded on MCAS 2026 vs MA and SEDA vs U.S., colleges, parks, caves, climate, Compare areas (MA vs KY/TN), KY/TN/MA switcher
