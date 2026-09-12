# Client data still owed

Facts the build cannot invent (hard rule 2). Each row blocks the thing in the
last column until the client supplies it in writing.

| # | Item | Asked | Blocks |
|---|---|---|---|
| 1 | Licensed-state list. Client states AZ, NV, UT, ID; legacy site claims "UT + 12 states". **Unresolved.** No state count is displayed anywhere until confirmed. | 2026-09-12 | `/legal/licensing/*`, state hubs footer line, any "licensed in N states" copy |
| 2 | Per-state license numbers and DOI links | 2026-09-12 | `States` compliance fields, `/legal/licensing/{state}` |
| 3 | Real agent roster (names, licenses, photos with release, cities served) | 2026-09-12 | `Agents` collection, 31 `/agents/*` routes |
| 4 | Carrier appointments under the Desert Peak entity, with appointment-confirmed dates. Legacy names (Mutual of Omaha, UnitedHealthcare, Aetna, Humana, Cigna) are unconfirmed for the new entity. P&C appointments: unknown. | 2026-09-12 | `Carriers` collection, 16 `/carriers/*` routes, carrier bar on coverage pages |
| 5 | Written confirmation that the Circle of Champions PY2025 certificate and appreciation letter transfer to the new brand | 2026-09-12 | Recognition gallery on `/` |
| 6 | Written consent per testimonial for reuse under the new brand | 2026-09-12 | `/reviews/`, home testimonials, `LocationOverrides.testimonial` |
| 7 | New entity phone, email, social handles, office address(es) | 2026-09-12 | `SiteSettings`, click-to-call, footer, `InsuranceAgency` schema |
| 8 | Real Cloudflare Turnstile keys | 2026-09-12 | Go-live (production refuses test keys) |
| 9 | Verified Resend sender on the Desert Peak domain; current key is being rotated and is treated as invalid | 2026-09-12 | Lead notifications, referee opt-in message |
| 10 | Referral reward rule rows per state and per track, with counsel citations | Phase 4 | `ComplianceSettings.rewardRules`; every program stays `program_enabled: false` |
| 11 | Medicare TPMO disclaimer text as approved for plan year, and the "we do not offer every plan" plan counts | Phase 2 | Every Medicare-touching template |
