# Facilitator bundle — Technique Table outer-loop workshop

This bundle pairs with the participant materials:

- **`participant/`** (a sibling folder in this repo): Give only this folder to participants, for example as a zip. It includes the intentionally defective app, PRD, three specs, two customer complaints (a Jira-style ticket and a Reddit thread), workshop prompts, and the baseline Playwright tests.
- **`facilitator/`**: Keep private. Contains the answer key for both issues, run of show, two reference regression tests, and two reference patches.

Follow `facilitator/RUN_OF_SHOW.md` to preflight the exercise, then hand out only the participant archive. Start from `participant/README.md` for installation and workshop instructions.

**Status (2026-10-15):** The broken participant app installs, typechecks, builds, and passes its 3 baseline tests. The reference tests fail on it as expected, and both patches apply cleanly. With both patches applied, typecheck and build pass and all 11 tests pass. Still run the preflight in `facilitator/RUN_OF_SHOW.md` on your own host before distribution.
