# Project: Desert Peak Insurance — Page Generation (Build Phase 1)

> **How to use this file.** Put the sitemap package in `./inputs/sitemap-package/`
> (the six files from `desert-peak-insurance-sitemap.zip`), open Claude Code in an
> empty repo directory, and paste this whole document as the first message.
> Edit the **Build Variables** block below before you run it.

---

## Build Variables — set these before running

```yaml
repo_name:            desert-peak-web
production_domain:    https://www.desertpeakinsurance.com
legacy_domain:        https://www.dellisandassociates.com
framework:            Next.js 15 (App Router) + TypeScript (strict) + Tailwind
content_format:       MDX with Zod-validated frontmatter (no runtime CMS in this phase)
package_manager:      pnpm
node:                 20 LTS
deploy_target:        Vercel (static-first; SSG via generateStaticParams)
reconciliation_mode:  halt          # halt | proceed-with-package
medicare_in_scope:    unknown       # yes | no | unknown  — see Phase 0.B
design_phase:         deferred      # this run ships structure + content, not visual design
```

If `reconciliation_mode: halt`, Phase 0 ends with a written report and **no further
work** until a human answers it. That is intentional. Do not "unblock yourself."

---

## Role

You are the lead engineer building the page layer of a 1,000+ page insurance
marketing site. Your output this phase is **routes, templates, typed content, and
the SEO plumbing that makes them indexable** — not visual design, not integrations,
not forms.

Two things make this job different from a normal site build, and both are hard
constraints, not preferences:

1. **Scale demands determinism.** Every page must be reproducible by re-running a
   script against a data file. Hand-authoring 1,000 files is a failure mode, not a
   deliverable. If you cannot regenerate a page from committed inputs, it does not
   count as done.
2. **Insurance is YMYL.** Google applies elevated quality standards to money and
   health content, and state DOIs apply actual law. Thin templated city pages and
   invented statutory claims do not just underperform — they take the whole domain
   down with them. Uniqueness and factual restraint are engineering requirements
   here, enforced by tests, not aspirations in a README.

---

## Sources of truth — read in this order, before writing any code

1. `inputs/sitemap-package/site-architecture.xml` — the IA. Sections, URL patterns,
   templates, priority/changefreq. **This defines the route tree.**
2. `inputs/sitemap-package/data-products.xml` — 29 product lines, each with slug,
   tier (1 = city-level pages, 2 = state-level only), category (Personal/Commercial).
3. `inputs/sitemap-package/data-locations.xml` — 4 states, 38 cities, with slugs.
4. `inputs/sitemap-package/README-for-developer.md` — the intent behind the tiering
   and the SEO notes. Read it; you do not have to agree with all of it (see Phase 0).
5. `inputs/sitemap-package/full-sitemap.xml` — **a test fixture, not an input.**
   See Phase 0.A defect 6.
6. The legacy live site at `{{legacy_domain}}` — crawl it for **facts only**:
   phone, principal, carrier appointments, award language, compliance disclaimers,
   existing URL set, existing content topics.

**Precedence rules.** The architecture XML wins on information architecture. The
legacy site wins on facts about the business. Where the two conflict on *scope*,
neither wins — that is a Phase 0 escalation. Where a fact appears in neither, it
becomes a TODO token; it never becomes an invention.

---

## Phase 0 — Reconciliation gate

Do this first. Produce `RECONCILIATION.md` at the repo root. Write no application
code until this phase is reported.

### 0.A — Six package defects (verify each, then fix)

These were found by analysis of the shipped package. Confirm each independently
against the files before acting — if your numbers disagree with mine, report the
discrepancy rather than silently adopting either.

| # | Defect | Evidence | Required fix |
|---|---|---|---|
| 1 | BOP product slug is doubled | `business-owners-policy-business-owners-policy` appears in 41 URLs | Normalize to `business-owners-policy`. Add a slug-generation unit test that catches token repetition. |
| 2 | 40 missing Tier-1 `/insurance/{product}/{state}/` hubs | All 380 city pages sit at depth 4 with no depth-3 parent (e.g. `/insurance/auto-insurance/arizona/` does not exist) | Generate the 40 missing hubs. Corrected total: **1,068**. Each state hub links to every city page beneath it. |
| 3 | Route collision at `/insurance/{slug}/` | State hubs (`/insurance/arizona/`) and product hubs (`/insurance/auto-insurance/`) share one path segment | Single dynamic segment with a slug-type resolver. Add a reserved-slug guard test asserting the product and state slug sets never intersect. |
| 4 | Apostrophe slug artifact | `coeur-d-alene` (10 URLs) | Pick one form, apply it everywhere, 301 the other. Add a slug normalizer with fixtures for apostrophes, ampersands, parentheses, and periods (`St. George`). |
| 5 | 45 placeholder identity pages | 30 fictional agent names, 15 "Carrier Partner N" | **Do not generate these.** Build `/agents/` and `/carriers/` hubs that render from an empty-but-typed roster. Fabricated agent bios on an insurance site are a licensing problem, not a placeholder. |
| 6 | Sitemap treated as an input | `full-sitemap.xml` hardcodes 1,028 URLs | The sitemap is a **build artifact** generated from the route manifest. Wire the shipped file in as a regression fixture: assert every URL in it resolves to a real route (minus the defects above), then never read it again. |

### 0.B — The scope conflict (this is the one that matters)

The legacy site and the sitemap package describe **two different businesses**:

| | Legacy site (`{{legacy_domain}}`) | Sitemap package |
|---|---|---|
| Lines of business | Life, Medicare, health, annuities, dental & vision, IUL, term, whole life | P&C: auto, home, renters, workers' comp, BOP, commercial auto, motorcycle, umbrella, general liability |
| Footprint | "Licensed in UT + 12 states" | AZ (home base), NV, UT, ID |
| Positioning | Independent advisory, "the analysis costs you nothing" | Local multi-line agency |

Of the 29 product lines in the package, exactly one (generic `life-insurance`)
overlaps the current book of business. Medicare, annuities, health, and dental &
vision — the lines the business actually runs on — **do not exist anywhere in the
1,028 pages.**

Two consequences, both material:

- **The 301 inheritance is near-zero.** On a rebrand, a page-level redirect map from
  earning URLs is worth more than any number of new pages. As specified, almost
  nothing maps: there is no target for `/medicare`, `/annuities`, `/iul`,
  `/dental-and-vision-insurance`, or the agent-recruiting section.
- **Medicare marketing is separately regulated.** If Medicare stays in scope, TPMO
  disclaimer and CMS marketing rules apply to every page that touches it, and that
  is a page-template requirement, not a footer afterthought. The legacy site already
  carries the required "We do not offer every plan in your area" language.

**Action:** write this up in `RECONCILIATION.md` with three options costed in pages
and effort — (a) build the package as-is and treat the current book as a separate
retained property, (b) extend the IA with a Medicare/life/annuity branch and
regenerate counts, (c) rebuild the IA around the actual book and use P&C as a
future expansion. State a recommendation. Then **stop and wait**, per
`reconciliation_mode`.

### 0.C — Legacy crawl

Crawl `{{legacy_domain}}` and commit `inputs/legacy-crawl.json`: every URL, title,
H1, meta description, word count, and outbound internal links. This is the input to
the redirect map in Phase 4 and to the "what content already exists" question. Do
not copy legacy copy into new pages — it belongs to the old brand and much of it is
Medicare-compliance-reviewed for a specific plan year.

**Phase 0 exit criteria:** `RECONCILIATION.md` written, `inputs/legacy-crawl.json`
committed, corrected data files written to `src/data/`, defect list confirmed with
your own counts. Print a summary. Stop.

---

## Phase 1 — Scaffold and typed content layer

No pages yet. Build the substrate.

- Scaffold `{{repo_name}}` with the stack in Build Variables. TypeScript `strict`,
  `noUncheckedIndexedAccess`, ESLint, Prettier.
- `src/data/products.ts`, `src/data/locations.ts`, `src/data/site.ts` — typed,
  derived from the corrected XML by a committed conversion script
  (`scripts/import-package.ts`), not by hand.
- Zod schemas for every content type: `Product`, `State`, `City`, `Article`,
  `GlossaryTerm`, `Agent`, `Carrier`, `CityFacts`.
- A slug registry (`src/lib/slugs.ts`) that owns every slug in the system, with a
  test asserting global uniqueness and zero cross-namespace collisions.
- `scripts/verify-data.ts` — reproduces the page-count table from the data files
  and fails on any drift from the expected counts.

**Exit criteria:** `pnpm typecheck && pnpm test` green, `pnpm verify:data` prints
the corrected count table (1,068 planned / 1,023 buildable / 45 blocked on client
data). Zero pages exist. Commit: `chore: data layer and slug registry`.

---

## Phase 2 — Data-driven routes (616 pages)

| Route group | Pages |
|---|---|
| Core pages | 20 |
| Legal & licensing | 9 |
| Product hub + coverage + discounts-faq (29 × 3) | 87 |
| State hubs `/insurance/{state}/` | 4 |
| Tier-1 product × state hubs (new, defect 2) | 40 |
| Tier-1 product × city `/insurance/{product}/{state}/{city}/` | 380 |
| Tier-2 product × state `/insurance/{product}/{state}/` | 76 |

All statically generated via `generateStaticParams`. No client-side data fetching on
any indexable route.

### The uniqueness requirement

This is the part that decides whether the 380 city pages are an asset or a
liability. A template with the city name find-replaced into it is a doorway page.

**Each city page must carry at least 250 words of genuinely city-specific text**,
assembled from a `CityFacts` record with these required fields:

```ts
type CityFacts = {
  county: string;
  nearestOfficeOrAgent: string;          // TODO token if unknown
  localHazards: string[];                // monsoon/dust, wildfire WUI, hail, freeze, flood plain
  housingStock: string;                  // stucco tract, mid-century ranch, mountain cabin, HOA-heavy
  drivingContext: string;                // I-17 commute, mountain passes, tourist traffic
  neighborhoods: string[];               // 3-5, real
  stateMinimums: StateMinimums;          // from the state record, cited to the DOI
  notableRegulatory?: string;            // e.g. UT no-fault PIP, NV SR-22 rules
};
```

Unknown field → TODO token → the page does not build as indexable. It never gets
filled with a plausible guess. Fabricated neighborhood names in a local SEO page are
worse than an empty section.

**Enforce it with a test, not a guideline.** `scripts/verify-uniqueness.ts`:
render every page in a template family to text, strip chrome, compute pairwise
Jaccard similarity on 5-word shingles, and **fail the build above 0.70** for
`local-product` pages. Output the 20 most-similar pairs on failure. Run it in CI.

### Template contract

Every page template exports a typed props contract and composes from content blocks
(`<CoverageExplainer>`, `<LocalRiskPanel>`, `<StateMinimumsTable>`, `<FaqBlock>`,
`<QuoteCta>`, `<RelatedLinks>`). Block *order and selection* vary by product tier
and by city size band — identical block sequences across 380 pages is itself a
duplicate-content signal.

### Presentation

`design_phase: deferred` means: semantic HTML, a thin Tailwind token layer, real
heading hierarchy, no visual design investment. Structure it so a later restyle
touches components and tokens only — never content or routes.

**Exit criteria:** `pnpm build` produces exactly 616 routes, `verify:uniqueness`
passes, zero broken internal links, zero orphan pages (every page reachable from
`/` in ≤3 clicks). Commit per route group.

---

## Phase 3 — Written content (407 pages), in resumable batches

186 resource articles + 221 glossary terms. This will not fit in one session, so
build it to survive being interrupted.

- `content/.generation-state.json` tracks every slug: `pending | drafted | failed`,
  word count, generated-at, and `reviewStatus: draft` (only a human sets `reviewed`).
- Work in batches of 10–15. After each batch: validate frontmatter against Zod, run
  the uniqueness check within the batch, update state, commit, print progress.
- On resume, read the state file and continue. Never regenerate a `drafted` slug
  without an explicit instruction.

**Glossary terms** (221): 150–300 words each — plain-language definition, how it
affects a policy in practice, a short worked example, and 3–5 internal links to
related terms and the products it applies to. A term may never be defined using
itself, and every term must be linked from at least one product or article page.

**Articles** (186): outline → draft → self-check. 900–1,800 words. Every article
links to ≥2 product pages and ≥3 other articles. Seasonal and state-requirement
pieces are the highest-value cluster here — monsoon, wildfire, mountain winter
driving, state minimums — because they are the ones a national aggregator will not
write.

**Factual restraint (hard rules).** No invented statistics, premium figures,
"average savings," or claim-payout numbers. Statutory facts (minimum limits, SR-22
rules, filing deadlines) must be attributed to the state DOI or NAIC; if you cannot
verify a statute from an authoritative source, write a TODO and move on. No
competitor comparisons by name. No superlatives about the agency.

**Everything generated in this phase ships `noindex` until a human flips
`reviewStatus`.** Wire that into the metadata function so it is structural.

**Exit criteria:** all 407 slugs `drafted`, zero Zod failures, glossary link graph
has no orphans, `verify:uniqueness` passes across the article corpus.

---

## Phase 4 — SEO, redirects, and compliance plumbing

**Metadata:** per-route `generateMetadata` — unique title ≤60 chars, description
≤155, self-referencing canonical, OG/Twitter. A test asserts zero duplicate titles
and zero duplicate descriptions across the whole route set.

**Structured data:** `InsuranceAgency` + `LocalBusiness` on location pages,
`Service` on product pages, `BreadcrumbList` everywhere, `FAQPage` only where the
FAQs are real and visible, `DefinedTerm`/`DefinedTermSet` on the glossary, `Person`
on agent pages **once real agents exist**. Validate every JSON-LD block in a test.

**Sitemap + robots:** generated from the route manifest, excluding anything
`noindex`. Regression-test against the shipped fixture per Phase 0 defect 6.

**Redirect map:** from `inputs/legacy-crawl.json`, produce `redirects.ts` with a
page-level 301 for every legacy URL. Rules: map to the closest equivalent page;
never blanket-redirect to `/`; if a legacy URL has no equivalent (Medicare,
annuities, agent recruiting — pending Phase 0.B), list it in
`REDIRECTS-UNRESOLVED.md` rather than guessing. Test: every legacy URL appears
exactly once, and no redirect chains.

**Indexation waves.** A new domain publishing 1,000+ pages on day one is the classic
partial-indexation stall. Add a per-page `indexWave: 1 | 2 | 3` field:
wave 1 = core, legal, 29 product hubs, 4 state hubs, top 30 city pages;
wave 2 = remaining city + state-product pages;
wave 3 = resource library and glossary as review completes.
Only wave 1 is indexable at launch; the rest ship `noindex` and are promoted by
changing a flag, not by rebuilding.

**Compliance components** (required by template, verified by test):
- Per-state licensing disclosure with the agency's license number per state — TODO
  tokens until the client supplies them. Do not guess a license number, ever.
- "Desert Peak Insurance is an independent agency, not an insurer. No coverage is
  bound by this website" boilerplate on every quote-adjacent page.
- Medicare TPMO/CMS disclaimer on any Medicare-touching page if `medicare_in_scope`
  resolves to yes.
- A banned-phrase linter over all rendered text: "guaranteed lowest rate",
  "cheapest", "we'll save you", "always covered", "instant approval", and any
  unqualified savings claim. Build fails on a hit.
- No testimonials carried over from the legacy site. They name the old brand and
  the client has not confirmed consent for reuse.

---

## Phase 5 — Definition of done

The build is done when all of these pass in CI, from a clean clone:

```
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm verify:data          # counts match the corrected plan
pnpm verify:routes        # manifest == expected; 0 broken internal links; 0 orphans
pnpm verify:seo           # unique titles/descriptions/H1s; canonical present; JSON-LD valid
pnpm verify:uniqueness    # pairwise similarity under threshold per template family
pnpm verify:compliance    # disclosures present; banned-phrase linter clean
pnpm verify:redirects     # full legacy coverage; no chains; no loops
```

Plus a committed `BUILD-REPORT.md`: pages by section, pages blocked on client data,
every TODO token with its owner, the unresolved redirect list, and the indexation
wave plan.

---

## Operating rules

1. **Phase gates are real.** Finish a phase, print a report, stop. Do not chain past
   a failing gate or a `halt` condition.
2. **Never invent:** agent names, bios, license numbers, carrier appointments, years
   in business, awards, certifications, testimonials, review counts, office
   addresses, phone numbers, statistics, premium figures, or statutory requirements.
   Unknown → `{{TODO:scope.key}}` token, registered in `TODO-CLIENT-DATA.md` with
   what it is and who can answer it.
3. **Scripts over artifacts.** Any page you cannot regenerate from committed inputs
   is technical debt. Commit the generator.
4. **Ask before scope drift.** If a fix requires changing the URL structure, adding
   a product line, or touching the count, raise it — don't absorb it.
5. **Report numbers, not adjectives.** "616 routes built, 3 uniqueness failures at
   0.74, 12 TODO tokens open" — not "made great progress."
6. **Commit per phase**, conventional commits, one logical change per commit.

---

## Appendix — reference data

**Tier 1 (10 lines — city-level pages):** auto, home, renters, life, general
liability, workers' compensation, commercial auto, motorcycle, umbrella, business
owners policy (BOP).

**Tier 2 (19 lines — state-level only):** boat & watercraft, RV, ATV & off-road,
pet, flood, earthquake, mobile & manufactured home, landlord/rental property,
identity theft, professional liability (E&O), cyber liability, commercial umbrella,
contractors, restaurant, retail business, agribusiness & farm, non-profit, surety
bonds, travel.

**States and cities (38):**
- **AZ (14):** Phoenix, Tucson, Mesa, Scottsdale, Chandler, Gilbert, Glendale,
  Tempe, Peoria, Surprise, Avondale, Goodyear, Flagstaff, Yuma
- **NV (8):** Las Vegas, Henderson, Reno, North Las Vegas, Sparks, Carson City,
  Elko, Boulder City
- **UT (8):** Salt Lake City, West Valley City, Provo, West Jordan, Orem, Sandy,
  Ogden, St. George
- **ID (8):** Boise, Meridian, Nampa, Idaho Falls, Pocatello, Caldwell,
  Coeur d'Alene, Twin Falls

**Corrected page accounting:**

```
Data-driven routes (Phase 2)                616
Written content: articles 186 + glossary 221 (Phase 3)   407
Blocked on client data: agents 30 + carriers 15           45
                                            ----
Planned total                              1,068
Buildable this phase                       1,023
```
