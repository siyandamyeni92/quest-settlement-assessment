# Settlement Quest — reproducible QA regression

Sanitized fictional reward credits only. No dependencies beyond Node.js 20+.

```bash
npm run test:bug  # seeded bug: TC007 and TC008 fail intentionally
npm test          # corrected behavior: all 13 pass
```

## Flow
Scheduler (Tuesday 09:00 UTC) → UTC eligibility filter [previous Mon 00:00, current Mon 00:00) → dedupe task IDs → exclude previously paid IDs → payout gateway → commit ledger → send notification. Notification error does not roll back payout.

## Evidence
See `evidence/faulty-run.txt`, `evidence/fixed-run.txt`, `evidence/test-results.md`, `defect-report.md`, and `release-checklist.md`.

## Loom recording outline (under 5 min)
0:00–0:35 objective and fictional rules; 0:35–1:05 priority matrix and flow; 1:05–2:05 run seeded bug and show TC007/TC008; 2:05–3:05 show paid-task guard and rerun corrected tests; 3:05–4:00 explain defect, severity, release gates; 4:00–4:30 gaps and handoff. Record with Loom and paste public/viewable URL into `directive.md`.
