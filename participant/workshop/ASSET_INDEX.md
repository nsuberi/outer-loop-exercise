# Outer-loop input assets

| Asset | Owner lens | What it contributes |
| --- | --- | --- |
| `jira/FOOD-142.md` | Product / support | Formal bug ticket: customer language, repro steps, harm |
| `social/reddit-back-button-thread.md` | Product / community | Informal public complaint with no ticket; tests whether the team notices a requirement nobody wrote |
| `../docs/PRD.md` | Product | User goal, product scope, acceptance criteria |
| `../docs/specs/01-cuisine-discovery.md` | Product + Design | Cuisine and technique behavior |
| `../docs/specs/02-equipment-shopping.md` | Product + Design | Identity contract between CTA and product page |
| `../docs/specs/03-video-lessons.md` | Product + Design | Video preview behavior |
| `../tests/fixtures/equipment-journeys.ts` | Data / Quality | Named, concrete customer journeys and expected destinations |
| `../tests/*.spec.ts` | Engineering + Quality | Executable browser assertions and their current coverage |

These are not mere attachments. They are a set of constraints and representative facts that help the engineering inner loop decide *what correct means*. The gap between a high-quality data fixture and a test that never checks the fixture is itself a useful learning moment.
