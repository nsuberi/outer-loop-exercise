# FOOD-142 — "Shop tortilla press" shows liners, not the press

**Type:** Customer-reported bug · **Status:** Open · **Priority:** P2 · **Source:** Customer success inbox, escalated from chat

**Reported by:** Taylor R. (fictional customer) · **Environment:** Desktop Chrome, Technique Table training build

## Customer's words

> I'm learning to make corn tortillas and I don't own a press, so I clicked "Shop tortilla press" under the recommended equipment. The page said "Tortilla Press Liners" for $7.50. I honestly thought that was a great price for a press and got as far as the checkout button before I read the description and realized it's a pack of parchment circles. The link even said tortilla-press in the address bar. If checkout had worked I would have bought paper instead of a press and not found out until it arrived. Please send people to the actual press.

## Reproduction supplied by support

1. Start on the Technique Table homepage.
2. Choose **Explore Mexican cooking**.
3. Find **Handmade corn tortillas** and **Recommended equipment**.
4. Click **Shop tortilla press**.
5. Look at the address bar and the product heading on the mock storefront.

**Actual:** The address bar shows `/shop/tortilla-press`, but the page is for **Tortilla Press Liners** ($7.50, parchment rounds).

**Expected:** The page is for the **Tortilla Press** ($24.00) that the technique recommends for pressing masa.

**Support notes:** Reproduced on the first try. The technique also recommends the liners as a separate item, so we double-checked: the customer clicked **Shop tortilla press**, not **Shop tortilla press liners**. The liners link opens the liners page as expected. The **Shop cast-iron comal** link on the same technique opened the right page. We haven't checked other recommendations. Support was confused that the URL looked correct.

## Customer and business context

The customer is a beginner who relies on Technique Table to translate a technique into the right tool. The two products have nearly the same name and a similar photo style, so the mistake is easy to miss. The cheaper wrong item makes the page look like a good deal rather than an error. If this were connected to real commerce, it would mean wrong orders, returns, and lost trust in the recommendations. We have no conversion analytics in this simulation, so do not invent lost sales figures.

## Product acceptance request

- The tortilla press recommendation leads to the Tortilla Press product page.
- Existing equipment journeys, including the comal, keep working.
- Browser regression coverage catches lookalike-product mix-ups like this one in the future.
- Summarize root cause, impact, scope, and verification evidence in language Product, Design, and Data can review.

## Evidence available

- PRD and three approved specifications under `docs/`.
- Original local browser tests under `tests/`.
- Curated customer journeys under `tests/fixtures/`.

**Not provided by support:** Source code location, root cause, or engineering solution. Please investigate rather than assuming.
