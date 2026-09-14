# Client data still owed

Facts the build cannot invent (hard rule 2). Each row blocks the thing in the
last column until the client supplies it in writing.

| # | Item | Asked | Blocks |
|---|---|---|---|
| 1 | Licensed-state list. Client states AZ, NV, UT, ID; legacy site claims "UT + 12 states". **Unresolved.** No state count is displayed anywhere until confirmed. | 2026-09-12 | `/legal/licensing/*`, state hubs footer line, any "licensed in N states" copy |
| 2 | Per-state license numbers and DOI links | 2026-09-12 | `States` compliance fields, `/legal/licensing/{state}` |
| 3 | Real agent roster (names, licenses, photos with release, cities served) | 2026-09-12 | `Agents` collection, 31 `/agents/*` routes |
| 4 | Carrier appointments under the Desert Peak entity, with appointment-confirmed dates. Legacy names (Mutual of Omaha, UnitedHealthcare, Aetna, Humana, Cigna) are unconfirmed for the new entity. P&C appointments: unknown. | 2026-09-12 | `Carriers` collection, 16 `/carriers/*` routes, carrier bar on coverage pages |
| ~~5~~ | ~~Circle of Champions PY2025 transfer~~ Closed 2026-09-13: the client confirmed the transfer; the recognition section is on `/`, credited to Daniel Ellis for plan year 2025. | closed | — |
| 6 | Written consent per testimonial for reuse under the new brand | 2026-09-12 | `/reviews/`, home testimonials, `LocationOverrides.testimonial` |
| 7 | New entity phone, social handles, office address(es). Email closed 2026-09-13: `daniel@desertpeakinsurance.com`. The address renders in the footer as soon as `SiteSettings.address` is filled. | 2026-09-12 | `SiteSettings`, click-to-call, footer, `InsuranceAgency` schema |
| 8 | Real Cloudflare Turnstile keys | 2026-09-12 | Go-live (production refuses test keys) |
| 9 | Verified Resend sender on the Desert Peak domain; current key is being rotated and is treated as invalid | 2026-09-12 | Lead notifications, referee opt-in message |
| 10 | Referral reward rule rows per state and per track, with counsel citations | Phase 4 | `ComplianceSettings.rewardRules`; every program stays `program_enabled: false` |
| 11 | Medicare TPMO disclaimer text as approved for the current plan year, and the "we do not offer every plan" organization and plan counts. Since 2026-09-13 the legacy footer's wording renders verbatim on every page (`ComplianceSettings.medicareTpmoDisclaimer`) until this arrives. | Phase 2 | The footer of every page, the Medicare OG images |
| ~~12~~ | ~~Arizona and Idaho DOI links~~ Closed 2026-09-12: client verified `https://difi.az.gov/` and `https://doi.idaho.gov/` from outside the build network; seeded. | closed | — |
| ~~13~~ | ~~Routes not in the IA~~ Decided 2026-09-12: `/forms/new-client-intake/` and `/forms/medication-intake/` as utility routes (noindex, outside the sitemap and the 1,117 plan); `/partners/` replaces `/work-with-us`, `/partners/portal/` (gated) replaces the two agent pages. Redirects seeded; pages land in Phases 4–5. | closed | — |
| 14 | Every `CityFacts` field except county for all 38 cities: nearest office or agent, local hazards, housing stock, driving context, 3–5 real neighborhoods, notable regulatory notes. Seeded as TODO tokens; a city page is not indexable until filled | 2026-09-12 | 380 Tier-1 city pages (uniqueness gate) |
| 15 | Advisor photo for the homepage panel (Daniel Ellis, principal advisor): a release-cleared photograph, documentary, not posed. The panel holds without it. | 2026-09-13 | `SiteSettings.advisor.photo`, homepage hero |
| 16 | Carrier logo files with the licence to display each (the five legacy names render as text until then) | 2026-09-13 | Homepage carrier strip |
| 17 | Product FAQ content: the homepage shows up to six questions from the product FAQ fields; two exist (life, health, carried from the legacy homepage). Four more need drafting and licensed review. | 2026-09-13 | "Asked and answered" on `/`, product FAQ subpages |
| 18 | Confirm the Nevada, Utah and Idaho auto liability minimums from outside the build network (the state pages refused connections on 2026-09-14; Arizona was read from A.R.S. § 28-4009). Once confirmed, set `verifiedAt` on those rows in the admin (States → statutory minimums) so the pages show "verified". | 2026-09-14 | Auto × state pages, state hubs |
