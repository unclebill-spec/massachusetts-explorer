# Changelog: Massachusetts Explorer

Dated entries of what changed (newest first). Each publish with a message adds a line here.

## 2026-10-04
- 10:53 ET: 50+ acre lots under $250k (land or home): small black star pins + groups, '50+ ac' button, Map key row, card with acres, $/acre, dwelling and Nearby; border listings too
- 08:05 ET: State switcher: shrinks and scrolls sideways on narrow phones (10 maps)
- 07:35 ET: State switcher: add New Hampshire (10 maps); border items now come from the New Hampshire map (NH homes and RN jobs at this map's caps)
- 06:18 ET: State switcher: add Utah (9 maps)

## 2026-10-03
- 20:58 ET: State switcher: add Idaho (8 maps)
- 18:24 ET: State switcher: Montana and Wyoming added
- 17:11 ET: Pin the bottom Top 10 pill row snug against the bottom-left edge of the map (5 px + safe area, same place on every window size, after cards open/close, resizes and full screen); zoom, scale and OpenStreetMap credit move up with it and stay uncovered; on short windows (e.g. 1366x600 above the Windows taskbar) the right-hand filter column now fits above Areas instead of being cut off
- 16:34 ET: Fix the bottom Top 10 pill row on desktop: after a window resize or full-screen change while a card was open the pills were measured while hidden and collapsed into two tiny overlapping pills at the left; the row now re-measures when it is shown again, pills size to their full titles and the row widens to hold exactly 3 whole pills (one pill per mouse-wheel notch, swipe and snap on phones unchanged)
- 15:55 ET: Bargains are purple with a star everywhere: the right-side Bargain filter button (column and landscape wheel), the Map key heading, the deal note on cards and the Top 10 'Bargain' mark now use the same purple star (#8e24aa) as the bargain pins and Deals pill instead of the yellow emoji
- 15:37 ET: Border items: pins up to ~15 mi outside the state line that meet this map's own criteria, from Vermont (homes, jobs, hospitals, graded schools...) plus New Hampshire, Rhode Island, Connecticut and New York. Same icons, filters, Top 10s and share links; each card is tagged with its state; county/town stats and appeal scores unchanged (explorer/border.json, shared border_build.py + build.py hook + app.js/style.css)
- 14:38 ET: Purple bargain icon (pins, groups, Map key, Deals pill); bottom Top 10 pills show exactly 3 whole buttons and snap one button or one page at a time; right-side filter buttons scroll with the mouse wheel and wheel events over them no longer zoom the map
- 14:06 ET: Add ski areas and notable mountain peaks layers: ski/peak icons, cards with trails, lifts, vertical, snowfall, season, ticket and pass prices (season + source labeled), discounts, special days; peaks with elevation, prominence, activities, estimated summit weather; Ski and Peaks solo buttons, Map key, zoom tiers, share links #ski= / #peak=
- 12:51 ET: State switcher: add Vermont (KY / MA / ME / TN / VT); shared app code with the per-state caps/cabin config (no change for this state)
- 10:50 ET: State switcher: add Maine (new Maine Explorer); Compare areas shows n/a for a missing school result
- 07:50 ET: Tapping the Boston town block now opens the Boston neighborhood map (city.html#boston) directly; phone Back and the page's '‹ MA map' link return to the map at the same view, and the Boston page links to the Boston town card. Other towns keep their card; #county=Boston links and search still open the card. Shared app.js: generic per-state ST.cityPage config (Kentucky has none; Tennessee: Davidson -> Nashville, Shelby -> Memphis).

## 2026-10-02
- 19:50 ET: Phase 5: Boston neighborhood sub-map (city.html): 984 homes, condos and townhomes for sale (Zillow, <= $900k, 1+ bd) in 23 Boston neighborhoods (City of Boston boundaries), colored by matches, median price, $/sq ft, ER drive or condo share; per-profile criteria (default <= $650k, 2+ bd, 2+ ba, 1,000+ sq ft); OSRM drive minutes to the nearest 10+ bed ER and Level I/II trauma center. Linked from the Layers panel and the Boston town card.
- 19:38 ET: Phase 3 + 4 and $650k home caps: permanent RN jobs (2,176 from 23 MA employers; blue hats) and travel RN jobs (535 at 49 hospitals; red hats with weekly pay); attractions (206), airports (11), businesses for sale under $1M (50), odd buildings under $600k (10), waterfalls (18) and trails (28). Bill's MA-only change: all three home searches capped at $650k (5+ acres $300k-$650k, bargains still flagged; 1+ acre 3/2 under $650k; near-hospital 1,600+ sq ft 3/2 under $650k), every other criterion unchanged: 328 listings (58 / 160 / 110), 15 bargains. Shared app.js: price labels and Max price menus read ST.caps (KY/TN unchanged); Top-10 pill carousel no longer clones pills when they all fit (fixes 'Deals' shown twice).
- 18:36 ET: Phase 2 homes: 90 listings from Bill's 3 searches (22 homes on 5+ acres, 57 on 1+ acre, 11 near-hospital homes), photos, hospital drive times, 8 bargains, Deals Top 10; ER 10+ bed estimate for MA hospitals
- 18:19 ET: Phase 1: Massachusetts base map - 351 town blocks with Appeal score, MA hospitals and trauma centers plus border NH/CT/RI/NY centers, schools graded on MCAS 2026 vs MA and SEDA vs U.S., colleges, parks, caves, climate, Compare areas (MA vs KY/TN), KY/TN/MA switcher
