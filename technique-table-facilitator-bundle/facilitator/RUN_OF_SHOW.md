# PRIVATE — Instructor run of show

The workshop has two planted issues: **FOOD-142** (lookalike product, official ticket) and a **Reddit thread** (back button goes home, no ticket). See `ANSWER_KEY.md`.

## Preflight (before workshop day)

1. Unzip the **participant ZIP** into a new disposable directory. Do not put facilitator files inside it.
2. Use your approved corporate npm mirror if required. Run `npm install`, `npx playwright install chromium`, `npm run typecheck`, `npm run build`, and `npm test`. All 3 baseline tests should pass.
3. Start `npm run dev` and confirm both issues in the intentionally broken starting state:
   - Home → Mexican → Handmade corn tortillas → **Shop tortilla press**. The URL is `/shop/tortilla-press`, but the heading is **Tortilla Press Liners**.
   - Mexican → Charred salsa roja → **Shop cast-iron comal** → **← Browse techniques**. You land on the homepage, not the salsa section.
4. Copy `reference-equipment-identity.spec.ts` and `reference-return-navigation.spec.ts` into the participant `tests/` folder (renamed as described in `ANSWER_KEY.md`) and run them. Before any fix, the tortilla press case and all three return-navigation tests should fail; the other identity cases should pass.
5. From inside the participant folder, apply both reference patches with `patch -p1 < <path-to>/facilitator/reference-fix.patch`, then the same for `reference-fix-return-navigation.patch`. (Don't use `git apply` if the folder is inside a git repo; it skips every file and still reports success.) Confirm the reference tests, the baseline tests, typecheck, and build all pass: 11 tests in total.
6. Throw away that directory and unzip a fresh, broken participant copy for distribution.
7. Confirm participants have Claude Code available and permission to install packages and use the local browser. No MCP, Jira, or Reddit connector is needed: both complaints are checked-in markdown files.

## Suggested timeline

| Time | Facilitator instruction | Expected evidence |
| --- | --- | --- |
| 0–5 min | Explain outer loop vs inner loop and inspect the app | Live UI, baseline suite |
| 5–15 min | Hand out both complaints + PRD + three specs | Customer outcomes; spots where wording is vague |
| 15–25 min | Run Claude triage on FOOD-142 with no edits | File-level diagnosis, ambiguous spec clause, impact and plan |
| 25–35 min | Agree on spec clarification; write and run an exact-identity regression | Clarified wording; correct failure before code fix |
| 35–45 min | Implement bounded fix and verify | Focused red→green, full suite |
| 45–55 min | Triage the Reddit thread (Phase 3 prompt); Product and Design write the missing requirement; Claude writes a red test and fix | Honest "no spec covers this"; new requirement; red→green |
| 55–65 min | Debrief Product/Design/Data roles | Evidence template, both parts |

If time is short, run issue 2 as triage and requirement-writing only, and skip its implementation.

## Suggested prompts

**Issue 1**

"What exactly is the customer trying to accomplish?"

"The URL was right. What would you have to check to notice the problem?"

"Which sentence in the spec decides whether *Tortilla Press Liners* counts as a match for *Tortilla Press*?"

"Is 'forgiving links' a bad requirement, or just an incomplete one?"

"What do your tests prove, and what do they fail to prove?" (Look for substring heading checks, including `getByRole(..., { name })` without `exact: true`.)

**Issue 2**

"Nobody filed a ticket. How did this reach us, and how many people never bothered to post?"

"Point to the requirement this violates." (There isn't one. Let them look.)

"The code matches the spec and the tests pass. Whose job was it to notice?"

"Where should a cook land if they opened the comal from a shared link instead of from a technique?"

**Both**

"What distinct evidence came from customer feedback, design expectations, and curated data?"

"If Claude had fixed the code without those assets, what could still have gone wrong?"

## Debrief scoring rubric

- **User consequence (20%)**: explains the near-wrong purchase and the lost place in the cooking flow, without inventing metrics.
- **Specification traceability (25%)**: for issue 1, cites the ambiguous Spec 02 items 4–5 and PRD AC-02/AC-03 and proposes clearer wording; for issue 2, states that no requirement existed and shows the one the group wrote.
- **Test adequacy (25%)**: exact-identity test fails before the fix and passes after, with unaffected controls (liners, comal, rice cooker, `/shop/rice`); return-navigation test derived from the new requirement.
- **Engineering discipline (20%)**: minimal fixes, typecheck/build, and truthful evidence.
- **Channel awareness (10%)**: discusses how the untracked Reddit complaint should enter the team's process.

## Safety notes

This is not real Amazon, Reddit, commerce, or a video service. All pages are fake local routes; there is no checkout. The Reddit thread and its usernames are fictional and labeled as such. Encourage participants to keep all inputs synthetic. Keep the answer key separate from the participant ZIP.
