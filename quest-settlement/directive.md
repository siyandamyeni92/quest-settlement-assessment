# Final directive — Settlement retry regression Quest

## Objective
Demonstrate reproducible investigation and prevention of duplicate rewards payouts during Tuesday settlement retries, using only fictional test credits.

## Scope
Local Node.js in-memory settlement fixture, 13 automated tests, seeded faulty implementation, corrected reference implementation, defect report, release decision. No live financial product or external payment system.

## Requirements
1. Evaluate at least three potential failures and explain assumptions.
2. Enforce settlement Tuesday 09:00 UTC; previous Monday 00:00 inclusive through current Monday 00:00 exclusive; 10 credits per completed unique task ID.
3. Prevent second payout on retry; notify only after successful payout; notification failure cannot undo payout.
4. Demonstrate failing regression against seeded bug and passing checks against corrected implementation.
5. Include severity, root cause, proposed fix, residual risks, and release gates.

## Completion criteria
- [x] Prioritization in `intent.md`
- [x] 13 test cases with expected results and executed outcomes
- [x] Runnable test project and reproducible failing/passing runs
- [x] Defect report and release-readiness checklist
- [x] Evidence logs in `evidence/`
- [ ] Loom video under five minutes (must be recorded by submitter)
- [ ] Upload project to an accessible repository or share ZIP; paste URL below

## Results and handoff appendix
- **Runnable project:** `package.json`, `src/settlement.js`, `tests/settlement.test.js` (included in ZIP)
- **Cases and results:** `evidence/test-results.md`
- **Failing regression:** `evidence/faulty-run.txt`
- **Passing regression:** `evidence/fixed-run.txt`
- **Defect/root cause:** `defect-report.md`
- **Release checklist:** `release-checklist.md`
- **Intent:** `intent.md`
- **Loom URL:** TODO — paste viewable Loom link
- **Repository / accessible ZIP URL:** TODO — paste shared link

### Handoff
Install Node.js 20+, unzip, run `npm run test:bug` (expected 2 failures), then `npm test` (expected 13 passes). Review critical gaps in `release-checklist.md` before any production-style extension. The reviewer, not this project, determines the final Quest score.
