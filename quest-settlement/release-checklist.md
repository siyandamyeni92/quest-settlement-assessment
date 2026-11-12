# Release readiness checklist

- [x] Fictional business rules written down
- [x] Happy path and multi-task payout tests
- [x] Lower/upper cutoff and timezone tests
- [x] Duplicate batch input test
- [x] Retry and notification-failure regression tests
- [x] Faulty implementation demonstrates failing checks
- [x] Corrected implementation passes local tests
- [x] Payout failure does not send success notification
- [ ] Database unique constraint and atomic commit verified (not part of in-memory demo)
- [ ] Concurrent settlement worker test
- [ ] External gateway idempotency and ambiguous timeout test
- [ ] Durable outbox notification retry test
- [ ] Payee/account-change and admin-config change policy approved
- [ ] Loom walkthrough recorded and linked

**Decision:** GO for demonstration/assessment handoff. NO-GO for real financial production deployment until unchecked integration and durability controls are implemented and verified.
