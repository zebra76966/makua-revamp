# Makua — build fix for Coolify

Coolify sets `CI=true`, and Create React App turns every warning into an error
when it sees that. The build stopped on 30 warnings: two from the new files,
the rest already in the project.

Copy `src/` over the Makua site's `src/` and deploy. `npm run build` with
`CI=true` now finishes with "Compiled successfully", and every page was
re-checked afterwards with no errors.

## What changed (nothing functional)

| File | Change |
|---|---|
| hooks/useAsync.js | The dependency-list warning is now suppressed where it's raised, with a note saying why |
| products/productDetail/productDetail.js | Alt text no longer contains the word "photo", which screen readers already announce |
| 404, hero, aboutHero, ayahuascaHero, resortHero, workshopHero | Dropped an unused `audio` import from framer-motion/client |
| faqs.js | Dropped unused icon imports; added alt text to two images |
| navbar.js | Dropped unused icon imports; added alt text to four images |
| main.js | Dropped an unused import |
| about + resort introSpirit | Dropped unused imports; added alt text |
| about + resort sightseeing | Dropped an unused animation variant |
| resort.js | Dropped three unused imports |
| ceroTusa.js | `==` is now `===` |
| eventCalendar.js | Dropped two variables that were set but never read |

## If you'd rather not wait for this

Adding `CI=false` to the Coolify build environment also gets you past it. It
works, but it hides real warnings from every future build, so I'd use these
files instead.
