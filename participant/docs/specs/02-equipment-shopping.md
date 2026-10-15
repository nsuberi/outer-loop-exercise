# Spec 02 — Equipment recommendation and simulated shopping

**Requirement:** FR-02 · **Status:** Approved

## Purpose

A home cook must be able to move from a named recommended tool to that tool's mock product page, so they can see what it is and what it costs.

## Identity contract

For each `EquipmentRecommendation.productId`:

1. Look up the `Product` with the same ID in the local catalog.
2. Render the product's canonical `name` plus the technique-specific reason to use it.
3. The **Shop [name]** action navigates to `/shop/{productId}`.
4. The destination's main heading should match the recommended product.
5. Storefront links should be forgiving. Shortened or legacy links (for example `/shop/rice` from an old newsletter) should still land on a relevant product rather than a dead end.
6. A link that matches nothing produces a friendly not-found state.

This applies to **every** recommendation, not just the first or most popular one.

## Explicit acceptance cases

| Cuisine / technique | Named recommendation | Route | Product heading |
| --- | --- | --- | --- |
| Mexican / Handmade corn tortillas | Tortilla Press | `/shop/tortilla-press` | Tortilla Press |
| Mexican / Handmade corn tortillas | Tortilla Press Liners | `/shop/tortilla-press-liners` | Tortilla Press Liners |
| Mexican / Handmade corn tortillas | Cast-Iron Comal | `/shop/cast-iron-comal` | Cast-Iron Comal |
| Japanese / Seasoned sushi rice | Compact Rice Cooker | `/shop/rice-cooker` | Compact Rice Cooker |

**Given** I read Handmade corn tortillas, **when** I choose **Shop tortilla press**, **then** I see the local product page for the tortilla press, with its description and mock price.

**Given** I read Handmade corn tortillas, **when** I choose **Shop cast-iron comal**, **then** I see the Cast-Iron Comal page.

## Mock-store experience

The target is a local HTML/React route styled as a fictional store: product name, illustration, price, features, and a **disabled checkout** button. It must display a **Simulated storefront** label. No network requests, affiliate tracking, real Amazon links, or real orders.

## Implementation boundaries

- Catalog: `src/data/catalog.ts` and `src/types.ts`.
- Visible link/button and product page: `src/features/equipment/EquipmentLinks.tsx`.
- Internal route construction: `src/features/equipment/productLinks.ts`.
- Browser acceptance: `tests/equipment.spec.ts` and curated `tests/fixtures/equipment-journeys.ts`.

## Quality expectations

Tests should confirm that the shopper reaches the recommended product's page, not just any `/shop/` page. Check the route and the product heading.
