# Spec 03 — Simulated technique video lessons

**Requirement:** FR-03 · **Status:** Approved

## Contract

Every listed technique includes a relevant video reference (`videoId`) and a visible **View video preview** control. Selecting it routes to `/videos/{videoId}` and displays the specific lesson's title, duration, a static poster, a working "play preview" button, and a short list of learning beats.

This is a mock video page, not a real player. Clicking the play button must visibly switch to a message explaining that playback is simulated.

## Acceptance examples

**Given** I view Handmade corn tortillas in Mexican cooking, **when** I open its lesson, **then** I see a page titled **Pressing tortillas evenly** at `/videos/press-tortillas`.

**Given** I am on the preview page, **when** I activate **Play video preview**, **then** the page explicitly displays **Preview only — video playback is simulated**.

**Given** I use a nonexistent `videoId`, **then** a friendly not-found state displays.

## Interface and design

`src/features/videos/VideoLibrary.tsx` renders a preview card and lesson page. The local video catalog resides in `src/data/catalog.ts`. Use a CSS poster, semantic headings and an accessible button. No embeds, YouTube calls, streaming, API keys, or downloaded assets.

## Validation

`tests/video.spec.ts` checks the entry point, matching lesson title, and play-state change.
