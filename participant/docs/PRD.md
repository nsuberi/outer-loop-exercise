# PRD — Technique Table

**Version:** 1.0 · **Status:** Approved for workshop simulation · **Owner:** Product

## 1. Problem and opportunity

Curious home cooks can find recipes, but a recipe alone doesn't explain which cooking technique matters, what equipment can support it, and what to watch to learn it. We want a small, coherent guide that connects **cuisine → technique → recommended equipment → matching simulated shopping page**, plus a short video lesson.

The initial release targets a person beginning to learn a cuisine, using a desktop or mobile browser. No account is required.

## 2. Outcome and hypotheses

**Primary outcome:** A learner can explore a cuisine, understand one technique, and confidently identify equipment and a lesson relevant to that technique.

We expect correctly labeled recommendations and destinations to improve confidence. A link that navigates to a valid shopping page but displays an unrelated product is a failure of this outcome even if the UI renders successfully.

**Workshop measurement proxies:**
- User can navigate from the landing page to a named technique.
- For a selected recommendation, the **destination product identity matches the equipment named in the recommendation**.
- User can open a relevant simulated video lesson and see the lesson's title and steps.
- The Playwright suite contains representative assertions for these behaviors.

## 3. Primary journey

1. Learner opens the homepage and selects a cuisine (Mexican, Japanese, or Italian).
2. Learner sees named techniques, time estimate, difficulty, and practical steps.
3. Learner sees equipment names, descriptions of why each item helps, and a **Shop [equipment]** control.
4. Choosing Shop opens an **in-app mock storefront** page for that same item; the page shows its matching name, description, fictional price, and disabled checkout.
5. Learner may instead open a technique video page with a poster, a simulated play state, and lesson highlights.

## 4. Functional requirements

| ID | Requirement | Detailed specification |
| --- | --- | --- |
| FR-01 | Browse cuisine and techniques | `specs/01-cuisine-discovery.md` |
| FR-02 | View equipment recommendations and matching mock-store product pages | `specs/02-equipment-shopping.md` |
| FR-03 | Open a relevant video preview page for each technique | `specs/03-video-lessons.md` |

## 5. Experience and design principles

- **Clear labels:** Every action should describe the destination. "Shop tortilla press" must not silently substitute a different item.
- **Low cognitive load:** A non-engineer should follow the data/route mapping in a few files.
- **Consistent UI:** Material UI components, text-based links/buttons, visible headings, keyboard-accessible controls, readable mobile layout.
- **Honest simulation:** Label fake store/video experiences explicitly, and do not imply real checkout or video streaming.
- **Traceability:** Every visible action can be traced to a spec and a representative test journey.

## 6. Acceptance criteria (end to end)

- **AC-01:** Selecting Mexican from the homepage shows Handmade corn tortillas and Charred salsa roja with steps, duration, and equipment.
- **AC-02:** The recommendation labeled **Tortilla Press** for Handmade corn tortillas opens the `tortilla-press` page, and its heading matches **Tortilla Press**; a **Cast-Iron Comal** recommendation opens the `cast-iron-comal` page with a matching heading.
- **AC-03:** The same applies to every other equipment recommendation: the item name, destination URL, and product heading line up.
- **AC-04:** The "Pressing tortillas evenly" video link opens a matching simulated lesson page and the play control makes the simulated state visible.
- **AC-05:** All journeys run on localhost without a backend, real purchases, remote videos, or secrets.

## 7. Out of scope

Real Amazon deep links, pricing feeds, authentication, ratings/reviews, checkout, real video playback, recording user progress, recommendations trained on user data, production observability, and accessibility certification.

## 8. Risks and quality approach

**Risk:** A link may reach a syntactically valid route but the wrong product (a *semantic* failure). Tests of existence/navigation alone cannot detect this. Product acceptance examples, Design's matching-label expectation, and Data's fixture mappings should jointly determine regression assertions.

**Risk:** Mock experiences can be mistaken for real commerce/media. All pages carry simulation labels and checkout is disabled.

**Quality evidence:** Playwright browser tests, representative test fixtures, source/spec traceability, TypeScript checks, and a reproducible red → green sequence for the customer report.

## 9. Mapping

| Spec | Source responsibility | Browser checks |
| --- | --- | --- |
| 01 | `src/features/cuisine/CuisineDiscovery.tsx`, `src/data/catalog.ts` | `tests/cuisine.spec.ts` |
| 02 | `src/features/equipment/EquipmentLinks.tsx`, `src/features/equipment/productLinks.ts`, `src/data/catalog.ts` | `tests/equipment.spec.ts`, `tests/fixtures/equipment-journeys.ts` |
| 03 | `src/features/videos/VideoLibrary.tsx`, `src/data/catalog.ts` | `tests/video.spec.ts` |
