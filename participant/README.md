# Technique Table: Claude Code outer-loop workshop

A complete, intentionally imperfect, local-only web app for practicing how Product, Design, and Data help an engineering agent deliver **the right fix**, not merely a code change.

## Start here

Requirements: Node.js **20.19+**, npm, and a browser available to Playwright. From this `participant/` folder:

```bash
npm install
npx playwright install chromium
npm run dev
```

Open **http://127.0.0.1:4173**. In a second terminal:

```bash
npm test
npm run typecheck
npm run build
```

To use Claude Code, launch it in this folder (`claude`) and copy the prompt in [`workshop/claude-triage-prompt.md`](workshop/claude-triage-prompt.md). If your organization uses an internal npm/Artifactory mirror, configure npm to use that approved registry first. The demo itself requires no backend, API keys, checkout service, internet-hosted video, or external images; installing dependencies and Playwright's browser may require network or pre-provisioned corporate mirrors.

**Verification status of this handoff:** Source and documents have been packaged and statically inspected. The npm install, real browser run, and Playwright test execution were **not** performed by the authoring environment; run these commands locally before teaching.

## What you're practicing

The **inner loop** is engineering work: inspect code, reproduce a defect, edit an implementation, run checks, and create a safe change. The **outer loop** supplies the direction and evidence for that work: a customer complaint, intended outcomes in a PRD, implementation contracts in specs, design expectations, representative journeys/test data, and checks tied to business behavior.

In this lab, Claude Code is the engineering collaborator. People in **Product, Design, and Data** help Claude work on the right issue with the right evidence:

| Role | Outer-loop contribution | Sample artifact |
| --- | --- | --- |
| Product | Customer impact and acceptance conditions | `workshop/jira/FOOD-142.md`, `docs/PRD.md` |
| Design | What users should see and how labels and destinations should match | `docs/specs/02-equipment-shopping.md` |
| Data / Quality | Representative cases and meaningful assertions | `tests/fixtures/equipment-journeys.ts` |
| Engineering / Claude Code | Diagnose, implement, and verify the fix | `src/`, `tests/` |

A green test suite proves only what the assertions checked, and a spec only constrains what it actually says. This lab has two customer complaints, one filed formally and one posted publicly, and the project's browser coverage looks healthy for both.

## Project map

```text
participant/
├── README.md
├── docs/
│   ├── PRD.md                         Product outcome and acceptance criteria
│   └── specs/
│       ├── 01-cuisine-discovery.md    Discover cuisines and techniques
│       ├── 02-equipment-shopping.md   Recommend equipment and link to its product
│       └── 03-video-lessons.md        Link to simulated technique lessons
├── workshop/
│   ├── participant-runbook.md         Group exercise and roles
│   ├── claude-triage-prompt.md        First Claude Code prompt
│   ├── jira/FOOD-142.md              Customer bug ticket (official support channel)
│   ├── social/reddit-back-button-thread.md  Customer complaint found on Reddit (no ticket)
│   └── evidence-template.md          Investigation and release evidence
├── src/
│   ├── data/catalog.ts               Fixtures for cuisines, products, and videos
│   ├── features/cuisine/             Discovery user journey (Spec 01)
│   ├── features/equipment/           Equipment journey (Spec 02)
│   └── features/videos/              Lesson user journey (Spec 03)
├── tests/
│   ├── cuisine.spec.ts
│   ├── equipment.spec.ts
│   ├── video.spec.ts
│   └── fixtures/equipment-journeys.ts
├── playwright.config.ts
└── package.json
```

## Workshop sequence (approximately 55–70 minutes)

1. **Explore (5 min).** Start the app and click through a few cuisines, equipment links, and video previews. Run the current Playwright suite and note its result.
2. **Supply the outer loop (10 min).** Read both complaints: `workshop/jira/FOOD-142.md` and `workshop/social/reddit-back-button-thread.md`. Then read `docs/PRD.md` and the three specs, and examine `tests/fixtures/equipment-journeys.ts`. Identify the customer outcome, not just the symptom, and note where the spec's wording leaves room for interpretation.
3. **Claude triage, no edits (10 min).** Paste the triage prompt into Claude Code. Ask for a reproducible path, code-level root cause with file/line references, violated spec, customer and business impact, and an engineering plan. Keep code unchanged at this stage.
4. **Build a failing contract test (5–10 min).** Ask Claude to add a Playwright assertion that actually reflects the customer intent. Run it against the original implementation. A useful regression test should fail for the reported issue.
5. **Inner loop (10 min).** Let Claude implement the smallest supported fix. Run the focused regression test, then the existing suite, then `npm run typecheck` and `npm run build`.
6. **Social complaint and spec gap (10 min).** Triage the Reddit thread. Does any spec say where "← Browse techniques" should go? Have Product and Design write the missing requirement before Claude implements anything.
7. **Explain and reflect (5 min).** Complete `workshop/evidence-template.md`. What evidence did Product, Design, and Data contribute that a bare ticket or a green test suite did not?

**Important:** Never weaken a spec or an assertion to make an implementation appear correct. Clarifying ambiguous wording or adding a missing requirement is different: do it deliberately, with Product and Design agreeing, and record the change. Capture the failing behavior before implementing the fix.

## Design system

UI uses **Material UI (MUI)** React components (`@mui/material`) with Emotion styling and a small local theme. The React component library is an open-source design system, not a custom component framework. The app uses only local mock records and generated CSS/emoji illustrations. The package is suitable for installing through an approved npm proxy/Artifactory that mirrors MUI, React, Vite, and Playwright packages.

## Scope and safety

This is a teaching fixture, not an ecommerce product or production-quality architecture. All prices, products, customer details, videos, and merchant surfaces are fictional. "Shop" links lead to **local** simulated product pages, not real Amazon URLs; checkout buttons are intentionally disabled. Videos are gradient posters with a play-state toggle, not streaming media. There are no secrets, logins, data collection, analytics, remote APIs, or required backend. Do not enter real customer information or credentials.

## Troubleshooting

- **Port conflict:** Stop the other process on port 4173; the local Vite server uses a fixed port so Playwright can find it.
- **Corporate npm restrictions:** Point npm at the organization's approved registry, then install normally. Playwright also needs a Chromium browser binary provisioned by `npx playwright install chromium` or an approved equivalent.
- **First test run fails to launch browser:** Run `npx playwright install chromium` and, if required by your OS, follow Playwright's dependency guidance.
- **Test passes before you fix anything:** Check whether its assertion truly verifies the product the customer expected. A navigation-only test can pass for an incorrect destination.

## Links to upstream library documentation

- Material UI installation: https://mui.com/material-ui/getting-started/installation/
- Playwright local web server testing: https://playwright.dev/docs/test-webserver
- Vite: https://vite.dev/guide/
