# Referral program — what counsel must supply before any program can be switched on

The engine ships with `Tenants.referralsEnabled = false`, both programs
`active = false`, and every reward rule row null. In that state the engine
refuses to earn a reward and records why (`reward-refused` events with
`tenant-disabled`, `program-inactive`, `rule-missing` or `rule-incomplete`).
Nothing below is a gap; it is the exit condition. This file lists exactly
what a licensed person must supply, per state and per track, and where it
goes.

## 1. Reward rule rows — 12 rows, all null (`referral-reward-rules`)

For each of Arizona, Nevada, Utah and Idaho, three rows: **customer track**,
**partner track**, and **customer track · Medicare rule set**. Each row needs all
five values, or the engine refuses:

| Field | What counsel decides | Notes |
|---|---|---|
| `rewardTypeAllowed` | gift-card · merchandise · account-credit · none | "none" is a valid answer and closes the track in that state |
| `perReferralCap` | Maximum value of one thank-you | The program's requested amount is capped here; the engine takes the lower |
| `perReferrerAnnualCap` | Maximum per referrer per calendar year | Earned entries count toward it whether issued yet or not |
| `cashEquivalentAllowed` | yes · no | Gift cards and account credits are treated as cash equivalents |
| `sourceCitation` | The statute, regulation or bulletin, with URL | Snapshotted into every ledger entry the row produces |

Plus `verifiedBy` and `verifiedAt`. The rows for the Medicare rule set
additionally have the engine's own invariant on top of whatever counsel
writes: non-cash only, and never messaged as an enrollment incentive.

The questions counsel is answering, in plain terms, per state:

- May an unlicensed person receive anything for a referral, and if so what
  kind of thing and up to what value? (anti-rebating and unlicensed
  referral-fee statutes; the "not contingent on the sale" line)
- May a licensed producer or business partner receive anything, and does a
  mortgage- or real-estate-adjacent partner raise RESPA questions?
- For Medicare-touching referrals, what does CMS's nominal, non-cash, not
  tied to enrollment rule permit this year?

The engine does not encode any dollar figure from memory. It encodes the
shape of the answer and refuses to run without one.

## 2. Program terms and conditions (`referral-programs.terms`)

Two programs, customer and partner, each with a versioned T&C document.
Version 1 is a TODO token. Acceptance is recorded against the version a
referrer saw; a published version cannot be edited, only superseded.

## 3. Message templates (`message-templates`)

The referee opt-in message must name the referrer and let the referee
decline. The seeded default does both and states that it is the only
message they will receive. Counsel confirms wording, particularly for the
Medicare track, where it must not read as an enrollment incentive.

## 4. Things the engine already guarantees, for the record

- No reward is contingent on a bound policy. The reward module accepts a
  `qualified` referral and nothing later; `bound` is analytics only. Tested,
  including a source check that the module never mentions the word.
- A referrer submits someone else's details only after affirming permission;
  the referee gets exactly one opt-in message and can decline; no lead
  exists and no contact happens before acceptance.
- Self-referral, duplicate referee, disposable email, velocity and bot
  checks all reject with a reason code that an admin can see.
- The ledger is append-only and every state change is an immutable event
  with actor and IP hash. Balances are computed, never stored.
- Annual per-referrer totals are available for the accountant; the engine
  asserts no reporting threshold.
- Tenancy: every row carries a tenant; a second agency is configuration.

## 5. Switch-on order

1. Counsel fills the 12 rule rows (or sets `none`) and cites sources.
2. Counsel approves T&C v1 for each track and the message templates.
3. An admin sets `referral-programs.active = true` per track.
4. An admin sets `Tenants.referralsEnabled = true`.
5. `pnpm test:referrals` still passes.
