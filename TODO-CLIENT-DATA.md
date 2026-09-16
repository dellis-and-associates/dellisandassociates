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
| 14 | The one `CityFacts` field that needs the office: nearest office or agent for each of the 38 cities. The other six fields were researched and filled on 2026-09-15 (real neighborhoods, hazards, housing, driving, local rules) and are part of the review pass. This no longer blocks indexation — it is contact detail, not local content, so the row is hidden until it arrives. | 2026-09-12 | The "nearest office" row is absent from 380 city pages |
| 15 | Advisor photo for the homepage panel (Daniel Ellis, principal advisor): a release-cleared photograph, documentary, not posed. The panel holds without it. | 2026-09-13 | `SiteSettings.advisor.photo`, homepage hero |
| 16 | Carrier logo files with the licence to display each (the five legacy names render as text until then) | 2026-09-13 | Homepage carrier strip |
| ~~17~~ | ~~Product FAQ content~~ Closed 2026-09-15: every product carries 4–6 FAQs; the homepage shows one from each core line. Licensed review still applies. | closed | — |
| ~~18~~ | ~~Confirm the NV, UT and ID auto liability minimums~~ Closed 2026-09-15: confirmed by the client; the rows carry `verifiedAt` and show "verified" on the pages. | closed | — |
| ~~19~~ | ~~Statutory facts written as tokens in the articles~~ Closed 2026-09-15: the client confirmed the content; the 103 tokens were rewritten as the mechanism plus the regulator that states the exact figure (no invented numbers), and the only figures kept are the four auto minimums with their official URLs. | closed | — |
| ~~20~~ | ~~Facts the writers flagged for a licensed check~~ Closed 2026-09-15: the client confirmed the content; every product, page, article and glossary term is marked reviewed. | closed | — |
| 21 | The four state producer license numbers, for the advisor page and the licensing pages (`{{TODO:license.arizona}}` and the other three). Until they arrive those pages say "Licensed in {state}" and link the regulator. | 2026-09-16 | `/about/daniel-ellis/`, the four `/legal/licensing/{state}/` pages |
| 22 | Years in practice for the advisor page (`{{TODO:site.yearsInPractice}}`). No number is shown until supplied. | 2026-09-16 | `/about/daniel-ellis/` |
| 23 | Search Console and Bing Webmaster verification by DNS TXT record, on the client-owned domain. The value appears only on each verification screen, so the build cannot know it. Blocks the indexation reporting the playbook is built around. | 2026-09-16 | LAUNCH-CHECKLIST.md, SEO-PLAYBOOK.md |
| 24 | IndexNow key: any 8–128 characters of letters, digits or hyphens, set as `INDEXNOW_KEY` in the production environment. Without it, changed pages are not pinged to Bing and Yandex (Google does not use IndexNow). | 2026-09-16 | `/{key}.txt`, submission on publish |
| 25 | Anything genuinely local about **life insurance** in the 38 cities — an employer or occupation mix, a local estate or probate rule, an employer group plan pattern. Hazards do not change a life policy, so the 38 life-insurance city pages are live but `noindex`; nothing is invented to fill them. Supplying this clears the 150-word guidance floor and adds them to the sitemap automatically. | 2026-09-16 | 38 `/insurance/life-insurance/{state}/{city}/` pages |
