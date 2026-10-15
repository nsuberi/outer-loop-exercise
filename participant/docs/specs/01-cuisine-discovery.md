# Spec 01 — Cuisine discovery and technique guidance

**Requirement:** FR-01 · **Status:** Approved

## Contract

The homepage offers three cuisines — Mexican, Japanese, Italian — each with a brief description and a working in-app navigation action. A cuisine detail page renders the chosen cuisine title and at least two techniques. Each technique includes a name, summary, difficulty, estimated minutes, numbered steps, and recommended equipment + video entry points owned by Specs 02 and 03.

## User-visible acceptance examples

**Given** I start on the homepage, **when** I select **Explore Mexican cooking**, **then** I see a heading of **Mexican cooking** with **Handmade corn tortillas** and **Charred salsa roja**.

**Given** I am on the Mexican cuisine page, **when** I read Handmade corn tortillas, **then** I can identify the steps to shape, press, and cook masa, the time estimate, and a section labeled **Recommended equipment**.

**Given** I navigate to an unknown cuisine ID, **then** I see a friendly not-found state rather than a blank screen.

## Data and interfaces

Data is in `src/data/catalog.ts`, shaped by `Cuisine` and `Technique` in `src/types.ts`. Browser paths are `/` and `/cuisines/:cuisineId`. Current content is a small local array; do not add a database.

## Design notes

Use Material UI cards and chips to make distinct techniques scannable. Cuisine selection links must have discernible text. Techniques need semantic headings and ordered lists.

## Validation

See `tests/cuisine.spec.ts` for a homepage-to-technique browser journey. This spec is considered complete when visible content and route identity are correct.
