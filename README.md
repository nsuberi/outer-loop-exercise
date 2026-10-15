# Technique Table: outer-loop workshop

A hands-on workshop where Product, Design, and Data work with Claude Code to deliver **the right fix**, not just a code change. Participants start from customer complaints, a PRD, specs, and curated test data, then use Claude Code to triage, write a failing regression test, fix, and verify a small React app.

## What's in this repo

| Folder | Audience | Contents |
| --- | --- | --- |
| [`participant/`](participant/) | Participants | The app (React, Vite, Material UI, Playwright), PRD and specs, customer complaints, runbook, Claude Code prompts, evidence template |
| [`technique-table-facilitator-bundle/`](technique-table-facilitator-bundle/) | Facilitators only | Answer key, run of show, reference tests, reference patches |

> **Facilitators:** The facilitator bundle contains the solutions. Hand participants only the `participant/` folder (for example as a zip), not a clone of this repo, or the exercise is spoiled.

## Quick start

Requires Node.js 20.19+ and npm.

```bash
cd participant
npm install
npx playwright install chromium
npm run dev        # http://127.0.0.1:4173
npm test           # in a second terminal
```

Participants continue from [`participant/README.md`](participant/README.md). Facilitators start with [`technique-table-facilitator-bundle/README-FACILITATOR.md`](technique-table-facilitator-bundle/README-FACILITATOR.md) and run the preflight in its run of show before the session.

## Running Claude Code

Launch Claude Code from inside `participant/`, not the repo root, so it works only from the participant materials. `participant/AGENTS.md` keeps Claude from revealing the planted issues before participants reach them.

## Scope

Everything is local and fictional: no backend, real store, real checkout, video streaming, or secrets. All products, customers, and posts are invented for the exercise.
