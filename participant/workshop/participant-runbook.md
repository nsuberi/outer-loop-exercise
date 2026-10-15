# Group runbook — Translate outer-loop evidence into an inner-loop fix

**Team size:** 2–4 people. **Duration:** 55–70 minutes. **Objective:** Produce a reproducible, spec-aligned correction and stronger browser tests.

## Assign the perspectives

- **Product voice:** Own the customer problem, consequence, and acceptance outcome. Challenge explanations framed only as a routing technicality.
- **Design voice:** Inspect action copy and destination headings. Explain why the same-word identity contract matters to novice cooks and how UI behavior misleads them.
- **Data / Quality voice:** Inspect curated fixtures; select a positive customer journey and unaffected control case; ensure tests compare expected versus observed identity.
- **Engineering voice (Claude Code):** Locate the actual implementation, produce a bounded change plan, implement after group approval, and show verification evidence.

One person can cover more than one perspective. Everyone may inspect code; the special emphasis is that a non-engineer can lead effective work by supplying a high-quality contract and data.

## Stop point A — Baseline

Explore the app and run `npm test`. Write down what was tested, not only whether it passed. Read both customer complaints without reading code first: the support ticket (`workshop/jira/FOOD-142.md`) and the Reddit thread (`workshop/social/reddit-back-button-thread.md`).

**Discuss:** If a page loaded successfully, what could still be wrong for the customer? Which complaint would your team have heard about without social listening?

## Stop point B — Triage

Give Claude the Jira ticket, PRD, specs, and test fixtures using the supplied triage prompt. Ask it to return **no edits yet**. The readout should contain:

1. Exact reproduction steps and observed mismatch.
2. Referenced requirement/spec and expected behavior, including any spec wording that is ambiguous enough to allow the bug.
3. Smallest likely root cause with actual files and line references, verified from source.
4. Customer/business significance and uncertainty clearly differentiated.
5. Minimal implementation plan and an explicit regression-test plan.

**Discuss:** What would be missing if Claude only looked at the code?

## Stop point C — Red test

Have Claude create a Playwright test using the customer's expected product identity. Prefer the existing curated fixture set over invented test data. Run only the new test against the original app and capture its failure message.

**Discuss:** Why was the original test not sufficient? Does the new test fail for the *right reason*?

## Stop point D — Small fix

Approve the plan, implement, rerun focused and whole-suite checks, and confirm unrelated experiences still work. Ask for a concise nontechnical change summary and unresolved verification limitations.

**Discuss:** How do PRD, specs, Jira feedback, UI naming, fixtures, and CI-style checks form a traceable evidence chain? Which spec sentence needs rewording so this can't happen again? Agree on the new wording as a group.

## Stop point E — The complaint with no ticket

Triage the Reddit thread with Claude, again with **no edits** first. Ask it which spec or acceptance criterion covers the behavior.

- **Product voice:** Decide whether this is a bug or a missing requirement, and how it should be prioritized without a ticket.
- **Design voice:** Define where "← Browse techniques" should land for a shopper who came from a specific technique, and what should happen for someone who opened a product or video link directly.
- **Data / Quality voice:** Pick representative journeys (a shared item like the comal, a video, a direct link) and their expected return destinations.
- **Engineering voice (Claude Code):** Once the group has written the requirement into the spec, write a failing test from it, implement, and verify.

**Discuss:** The code met the spec, and the tests passed. Whose job was it to notice?

## Deliverable

Complete `workshop/evidence-template.md` for both complaints, with expected vs actual, affected contract (or missing contract), spec wording changes, code cause, failing/passing regression evidence, tests changed, and any known gaps. Be explicit if Playwright could not run on the host.
