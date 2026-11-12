# DEF-001 — Duplicate payout on settlement retry

**Severity:** Critical (fictional scenario): one completed task can be rewarded twice, compromising ledger accuracy and potentially causing financial loss if credits are redeemable. **Priority:** P0 before release.

## Preconditions
Node.js 20+, clean local fixture. No real customer data or financial integration.

## Reproduction
1. From project root run `npm run test:bug`.
2. Inspect TC007 and TC008 failures in console or `evidence/faulty-run.txt`.
3. TC007 settles task `a` at `2026-11-10T09:00:00Z`, then reruns the same batch.
4. TC008 repeats after notification fails following a successful payout.

**Expected:** first attempt credits 10, retry credits 0, exactly one ledger entry per task ID.

**Actual (faulty mode):** retry credits another 10 and creates a second ledger entry. TC007 and TC008 fail.

## Root cause
Faulty branch omits the paid-task ledger membership check when selecting tasks. It filters duplicate IDs within a single batch but not across settlement attempts. This is a deliberate seeded defect, not a discovered production bug.

## Proposed fix
Before payout, exclude task IDs already committed in the payout ledger. Persist a database unique constraint on task ID (or scoped reward event key), with transactionally coordinated payout state and gateway idempotency keys. Notification delivery must be decoupled from payout commit via an outbox and independent retry.

## Verification and release gate
`npm test` must pass TC001–TC013. Specifically TC007/TC008 must demonstrate no second payout; TC009/TC010 must demonstrate correct partial-failure behavior. Block release on any duplicate payout, incorrect cutoff, or notification-before-payout result. Additional integration and concurrency testing required for production readiness.
