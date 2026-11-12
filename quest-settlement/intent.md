# Quest intent — settlement idempotency

## Objective
Prevent duplicate test-credit payouts when the Tuesday settlement job is retried.

## Candidate failures and prioritization
Scores are hypotheses for a fictional system, **not historical incident statistics**. Impact / likelihood / effort use 1 (low) to 3 (high).

| Rank | Candidate | Impact | Likelihood | Effort | Rationale |
|---|---|---:|---:|---:|---|
| 1 | Duplicate payout on retry | 3 | 3 | 2 | Direct monetary-equivalent ledger integrity risk; retries are routine in distributed systems |
| 2 | Incorrect cutoff/timezone | 3 | 2 | 2 | Underpayment/overpayment near weekly boundary |
| 3 | Notification before payout | 2 | 2 | 1 | Misleading success communications and support burden |

Chosen: duplicate payout on retry. It offers a small reproducible fixture, an observable failing test, and a release-blocking invariant. No claim is made about an actual MUST production incident.

## Explicit assumptions
- All timestamps are ISO 8601 with offsets, interpreted in UTC.
- `completedAt` is immutable for a completed task; task IDs are globally unique.
- Account ownership changes are out of scope; an actual implementation must snapshot payee identity at eligibility time and specify migration rules.
- Admin changes to reward amount or settlement schedule are frozen for each settlement run; versioned configuration is needed in production.
- This sample uses an in-memory ledger and sequential execution. It does not prove crash safety, concurrent-worker safety, transactional database guarantees, or external payment-provider idempotency.
