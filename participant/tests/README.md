# Browser test inventory

- `cuisine.spec.ts`: landing page and cuisine discovery.
- `equipment.spec.ts`: navigation to the simulated shopping page.
- `video.spec.ts`: navigation and play-state on the simulated video page.
- `fixtures/equipment-journeys.ts`: curated customer scenarios. Decide whether the existing tests use these examples to assert the business outcome.

Run `npm test`, or `npm run test:ui` to inspect individual cases. A passing suite is evidence only for its actual assertions, not every requirement in the PRD.
