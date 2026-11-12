# Settlement Regression — Test Execution Results

## Execution Summary

**Project:** Quest Settlement Regression Assessment  
**Framework:** Node.js built-in test runner  
**Environment:** Windows PowerShell, Node.js v26.13.1  
**System:** Fictional rewards settlement service

| Execution | Total | Passed | Failed | Result |
|---|---:|---:|---:|---|
| Faulty implementation | 13 | 11 | 2 | Expected defect reproduced |
| Corrected implementation | 13 | 13 | 0 | Passed |

## Defect Reproduction

**TC007 — Retry does not double pay**

- Expected: 0 additional credits on retry
- Actual (faulty): 10 additional credits
- Result: Failed as expected

**TC008 — Retry after successful payout and notification failure**

- Expected: 0 additional credits on retry
- Actual (faulty): 10 additional credits
- Result: Failed as expected

Both regression checks passed against the corrected implementation.

## Regression Coverage

| Test ID | Scenario | Corrected result |
|---|---|---|
| TC001 | Happy path | PASS |
| TC002 | Multiple qualifying tasks | PASS |
| TC003 | Lower boundary inclusive | PASS |
| TC004 | Upper boundary exclusive | PASS |
| TC005 | Timezone conversion | PASS |
| TC006 | Duplicate task ID | PASS |
| TC007 | Retry idempotency | PASS |
| TC008 | Retry after notification failure | PASS |
| TC009 | Payout failure | PASS |
| TC010 | Notification failure | PASS |
| TC011 | Incomplete task | PASS |
| TC012 | Incorrect schedule | PASS |
| TC013 | Settlement window calculation | PASS |

## Evidence

- [Faulty execution log](faulty-run.txt)
- [Corrected execution log](fixed-run.txt)

## Release Decision

**Conditionally ready for the fictional demo.**

The selected defect is reproduced by the faulty implementation and prevented by the corrected implementation.

Production readiness would require additional concurrency, persistence, integration, and recovery testing.