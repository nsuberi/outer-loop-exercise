# PRIVATE — Facilitator answer key (do not put into participant handouts)

The participant app has **two planted customer issues**, each arriving through a different channel:

| | Issue 1: lookalike product | Issue 2: back button goes home |
| --- | --- | --- |
| Complaint | `workshop/jira/FOOD-142.md` (official support ticket) | `workshop/social/reddit-back-button-thread.md` (Reddit thread, no ticket) |
| Kind of failure | Code bug made possible by vague spec wording | Missing requirement: code matches the spec, but no spec covers it |
| Lesson | Clarify what "match" means, then fix and test | Someone has to notice, and Product and Design write the requirement before Engineering builds it |

`AGENTS.md` in the participant folder tells Claude not to reveal either issue until the participant references that issue's complaint. Referencing one doesn't unlock the other.

---

## Issue 1: FOOD-142, "Shop tortilla press" shows liners

### Expected user-facing finding

A cook clicks **Shop tortilla press** under Handmade corn tortillas. The address bar correctly shows `/shop/tortilla-press`, but the page is **Tortilla Press Liners** ($7.50 parchment rounds) instead of the **Tortilla Press** ($24.00). The liners are also a legitimate recommendation on the same technique, and their own link works, which makes the mix-up look plausible and easy to dismiss as user error. Support confirmed in the ticket that the customer clicked the press link.

### Source cause

`participant/src/features/equipment/productLinks.ts`, `findProductBySlug()`:

```ts
return products.find((item) => item.id === normalized || item.id.startsWith(normalized));
```

It reads like "exact match first, then prefix", but `find` checks both conditions on each product in catalog order. `tortilla-press-liners` is listed first in `src/data/catalog.ts` (as a featured new accessory), and `'tortilla-press-liners'.startsWith('tortilla-press')` is true, so the liners win before the press is reached.

Everything else is correct: the recommendation card uses an exact lookup (`getProduct`), the button label is right, and `productHref` builds the right URL. Only the product page's slug lookup is wrong, which is why the URL looks right while the page is wrong.

### Spec wording that allowed it

`docs/specs/02-equipment-shopping.md`, identity contract:

- **Item 4:** the heading "should match" the recommended product. It doesn't say whether "match" means equal or contains.
- **Item 5:** links "should be forgiving" so shortened or legacy links like `/shop/rice` still land on a product. This is a reasonable requirement and the reason the prefix match exists. It doesn't say that an exact ID must win.

PRD AC-02 and AC-03 use the same soft language ("heading matches", "line up"). A developer and a test author can both read the docs as written and ship this bug.

### Why the baseline tests pass

`tests/equipment.spec.ts` checks the href, the URL, the "Simulated storefront" label, and `toContainText('Tortilla Press')` on the heading. "Tortilla Press Liners" contains "Tortilla Press". The Data fixtures (`tests/fixtures/equipment-journeys.ts`) list the liners as a lookalike for the press journey, but no test reads the fixtures.

**Watch for this trap:** Playwright's `getByRole('heading', { name: 'Tortilla Press' })` is also a case-insensitive substring match by default. A participant test written that way will **pass on the bug**. Only `toHaveText(...)` or `{ name: ..., exact: true }` catches it. (The earlier version of this answer key's reference test had exactly this weakness.)

### Expected root-cause explanation from Claude Code

1. The technique recommends `tortilla-press` (`src/data/catalog.ts`).
2. `EquipmentLinks` looks it up exactly, renders **Shop tortilla press**, and links to `/shop/tortilla-press` via `productHref`.
3. The `/shop/:productId` route renders `ProductPage`, which calls `findProductBySlug('tortilla-press')`.
4. `find` returns the first product whose ID equals *or starts with* the slug, and the liners come first.
5. The baseline test's substring heading check can't tell the two products apart.

A strong response also points out that the spec's "match" and "forgiving" wording is ambiguous, and proposes a clarification for Product to approve instead of editing the spec unilaterally.

### Reference regression test

Copy `facilitator/reference-equipment-identity.spec.ts` to `participant/tests/equipment-identity.spec.ts`, then from `participant/`:

```bash
npx playwright test tests/equipment-identity.spec.ts
```

It runs every fixture journey with an exact heading check, scopes each link to its technique section, and adds a legacy short-link case (`/shop/rice`).

**Before the fix (verified 2026-10-15):** the tortilla press case fails with `Expected: "Tortilla Press"`, `Received: "Tortilla Press Liners"`. The liners, comal, rice cooker, and `/shop/rice` cases pass.

**Expect this snag:** the comal is recommended by two techniques (tortillas and salsa), and "Shop tortilla press" is a substring of "Shop tortilla press liners". Unscoped, non-exact link locators hit Playwright strict-mode errors ("resolved to 2 elements"). Let participants hit this; it's a fair hint about lookalike names and shared items. The fix is to scope with `getByRole('region', { name: 'Handmade corn tortillas' })` or use exact link names.

### Minimal fix

`facilitator/reference-fix.patch` changes the lookup so an exact ID always wins:

```ts
return products.find((item) => item.id === normalized) ?? products.find((item) => item.id.startsWith(normalized));
```

It also includes reference wording for Spec 02 items 4 and 5 (heading must be exactly the product name; forgiving matching only when no exact ID exists). Apply from inside `participant/` with `patch -p1 < <path-to>/facilitator/reference-fix.patch`. Avoid `git apply` when `participant/` sits inside a git repo: run from a subfolder it skips every file and still reports success.

### Accept / don't accept

- **Accept:** exact-first lookup, removing prefix matching while keeping legacy support another way (an explicit alias table), or moving the liners later in the catalog **only if** the participant also explains why that's fragile and adds a test that would catch it. Order-based fixes alone shouldn't pass.
- **Accept:** clarifying the spec wording, as long as Product agreed and the change tightens the contract.
- **Don't accept:** dropping the forgiving-links requirement without Product agreeing, since it breaks `/shop/rice`.
- **Don't accept:** renaming the liners to dodge the prefix collision, or changing the button label.
- **Don't accept:** a test using substring heading matches, or one that only checks the URL. The URL was already correct.
- **Don't accept:** claims of measured lost sales. The store is simulated.

---

## Issue 2: Reddit thread, "Browse techniques" goes to the homepage

### Expected finding

On every product page (`EquipmentLinks.tsx`, `ProductPage`) and video page (`VideoLibrary.tsx`, `VideoPage`), **← Browse techniques** links to `/`. A cook who opened the comal from the salsa section has to pick Mexican again and scroll past the tortilla section to get back. The label promises techniques; the homepage has none. Commenters in the thread rule out "just use the browser back button" (tablet in a stand, phone back-swipe leaving the app).

### Why nothing caught it

The code matches the spec. **No spec or acceptance criterion says where the back action goes.** The PRD journey (section 3) ends at the product or video page. The tests pass because there's nothing to assert. There's also no ticket; the complaint only reached the team through social listening.

A strong triage says plainly that no requirement covers this, instead of stretching an existing clause (for example claiming it violates "Clear labels" in PRD section 5 and stopping there). That principle supports the case but doesn't define correct behavior.

### Questions Product and Design need to answer first

- Where should the back action land: the cuisine page, or the specific technique section?
- What should it say? Naming the technique helps more than a generic label.
- What happens when the product or video page was opened directly (shared link, legacy `/shop/rice`), with no technique to return to?
- Shared items: the comal is recommended by two techniques. Should it return to the one the cook came from? (It should.)

### Reference requirement and fix

`facilitator/reference-fix-return-navigation.patch` adds a "Returning to the technique" section to Spec 02 and Spec 03, and implements it:

- `CuisinePage` passes `{ path: '/cuisines/{cuisine}#{technique}', label: technique.name }` to `EquipmentLinks` and `VideoLink`, which send it as React Router link `state`.
- `ProductPage` and `VideoPage` read that state. With it, the button reads **← Back to Charred salsa roja** and returns to that section. Without it (direct link), it reads **← Explore cuisines** and goes home.
- `CuisinePage` scrolls to the `#technique` anchor on arrival (techniques already render with `id={technique.id}`).
- New shared type `ReturnTo` in `src/types.ts`.

Any approach that meets the group's written requirement is fine (for example a `?from=` query parameter instead of router state). Router state disappears on refresh; that's an acceptable trade-off for this simulation, and a good discussion point.

### Reference test

Copy `facilitator/reference-return-navigation.spec.ts` to `participant/tests/return-navigation.spec.ts`. It covers the comal opened from salsa (shared item returns to the right technique), a Japanese video lesson, and a directly opened product page.

**Before the fix (verified 2026-10-15):** all three tests fail.

### Accept / don't accept

- **Accept:** any return behavior the group wrote into the spec first, with a test derived from that wording.
- **Don't accept:** implementing before a requirement exists. The point is that Engineering can't define "correct" alone here.
- **Don't accept:** relabeling the button "← Home" and calling it done, unless Product and Design explicitly chose that and the thread's use case is addressed some other way.
- **Don't accept:** using `navigate(-1)` (browser history) without handling direct links, where it can leave the app.

---

## Verification status

- **Broken baseline (2026-10-15):** `npm install`, `npm run typecheck`, `npm run build`, and `npm test` all pass in the participant folder (3 tests). The reference tests fail exactly as described above.
- **After both fixes (2026-10-15):** with both patches applied in sequence and both reference tests copied in, typecheck and build pass and all 11 tests pass (3 baseline, 5 identity, 3 return-navigation). Reverting both patches restores the broken baseline exactly.

## Stretch questions

- If aliases or redirects are legitimate in a commerce app, what invariant should be enforced (canonical product identity, explicit substitution notice, or a mapping owned by the merchandising team)?
- Issue 2 had no ticket. What would have surfaced it without someone reading Reddit (session analytics, usability testing, support tags)?
- How can customer complaints become prioritized regression scenarios without adding brittle tests for every pixel?
- When do curated fixture data and schema validation beat full end-to-end browser tests?
- What evidence should a product manager demand before declaring each issue fixed?

## Expected quality bar

**Strong:** For issue 1, a clear impact readout, verified code path, the ambiguous spec wording identified and clarified with Product, a failing exact-identity test, a minimal fix, and passing controls. For issue 2, an honest statement that no requirement existed, a requirement written by Product and Design, then a test and fix derived from it.

**Incomplete:** Fixes without durable tests; uses substring heading checks; changes the spec unilaterally or loosens it; builds a back-button fix with no written requirement; or reports success without running checks.
