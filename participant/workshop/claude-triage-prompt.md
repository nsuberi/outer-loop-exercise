# Paste into Claude Code — Phase 1 (investigation only)

You are collaborating with Product, Design, and Data in an **outer-loop** software delivery exercise. Work from the local repository.

Read, in order:
1. `workshop/jira/FOOD-142.md` (customer symptom from the support ticket)
2. `docs/PRD.md` and `docs/specs/*.md` (product intent and implementation contracts)
3. `tests/fixtures/equipment-journeys.ts` and the existing `tests/*.spec.ts` (test data and coverage)
4. Only then, inspect the relevant application source.

**Do not edit code or tests yet.** Return a readout with:
- The expected journey vs the reported behavior; how you would reproduce it on localhost.
- The violated PRD acceptance criterion and exact spec clause, and whether the spec's wording is precise enough to rule this behavior out.
- The likely root cause, with precise file paths and line numbers *verified from inspected code*, not guesses.
- The customer impact and realistic business risk, distinguishing evidence from inference.
- Why current Playwright assertions could pass even though this behavior is wrong.
- An engineering implementation plan in small steps: first write a **failing regression test** using a real fixture, then make the smallest targeted fix, then prove the test turns green and run the full suite, typecheck, and build.
- Questions, if any, that truly block the fix. Do not alter the product spec to fit the existing code. If spec wording is ambiguous, propose a clarification for Product to approve rather than editing it yourself.

Keep the explanation understandable to a product manager and a designer. Wait for a separate request before making any changes.

---

# Phase 2 follow-up (send only after reviewing the triage)

Implement the approved plan. Add a Playwright test that fails on the unfixed behavior, run it and capture the failure, then fix the implementation. Rerun that test, the full Playwright suite, `npm run typecheck`, and `npm run build` where available. Keep the patch narrow. Return changed paths, red/green evidence, user impact, and any commands you could not execute. Do not fake test results.

---

# Phase 3: the complaint with no ticket (investigation only)

Read `workshop/social/reddit-back-button-thread.md`, a public complaint the community team found. No ticket exists. Using the PRD and specs, tell us:
- How to reproduce what the poster describes, and whether it affects every product and video page.
- Which spec or acceptance criterion covers this behavior. If none does, say so plainly instead of stretching an existing clause.
- The questions Product and Design need to answer before anyone can define "correct" (for example, where should a shopper land if they arrived from a direct link?).
- The files that would be involved, verified from source.

**Do not edit code, tests, or specs.** Once the group has written the new requirement into the spec, we'll ask you for a failing test and a fix in a separate request.
