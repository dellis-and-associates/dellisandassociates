# Project: Desert Peak Insurance — Content Platform, Referral Engine & Interface Build
### Payload CMS · Supabase · Next.js — v2

> **How to use this file.** Open Claude Code at the repo root and paste this whole
> document. The repo already contains the two input folders described in Phase 0.
> This is the master build prompt; two companion documents live alongside it:
>
> - `desert-peak-page-generation-prompt.md` — routes, templates, content
>   generation, the uniqueness gate, indexation waves. Its Phase 1 (MDX data layer)
>   is **superseded** by this document; everything else in it still binds.
> - `desert-peak-interface-standard-prompt.md` — the full interface standard.
>   Phase 5 below is the executive version and points to it for detail.
>
> The brief from the client is that this should be world-class. That is an outcome,
> not an instruction. Every requirement in this document is phrased so it can be
> checked by a script, a test, or a screenshot. Anything that cannot be checked is
> not in here, because "make it excellent" is not something an engineer can execute
> — but "Lighthouse 100 on every template on a throttled Moto G, with zero axe
> violations and a 60 KB JS budget on content pages" is.

---

## Build Variables

```yaml
repo_root:              .
brand_dir:              ./desert-peak-brand
sitemap_dir:            ./desert-peak-insurance-sitemap
production_domain:      https://www.desertpeakinsurance.com
legacy_domain:          https://www.dellisandassociates.com

framework:              Next.js (App Router) + Payload 3.x installed in the same app
database:               Supabase Postgres via @payloadcms/db-postgres
payload_schema:         payload_cms         # dedicated Postgres schema, never public
media:                  Supabase Storage via S3-compatible storage adapter
package_manager:        pnpm
deploy_target:          Vercel
environments:           local (Docker Postgres) / preview (Supabase branch) / production

referral_engine:        enabled
referral_tenancy:       multi-tenant        # engine is a reusable module, Desert Peak is tenant #1
referral_reward_rules:  counsel-supplied    # engine ships with the most restrictive defaults
medicare_in_scope:      unknown             # inherited from page-generation Phase 0.B

device_baseline:        mid-range Android, 4× CPU throttle, Slow 4G
cwv_targets:            LCP ≤ 1.8s · INP ≤ 100ms · CLS ≤ 0.05   (p75, mobile)
lighthouse_floor:       100 / 100 / 100 / 100, mobile, every template
```

**Version check before any config is written.** Read the current Payload Postgres
adapter docs, the storage adapter docs, and Supabase's "Connect to your database"
page. Where this document and current docs disagree, follow the docs and record the
delta in `DECISIONS.md`. A stale adapter option carried into 500 collections costs
a day; the check costs five minutes.

---

## Role

You are the platform engineer, the frontend lead, and the person who has to defend
every decision in this repo to the next engineer. You own the data model, the
database topology, access control, the referral engine, cache invalidation, and the
interface standard. You do not own the client's legal exposure — but you own not
increasing it, which shapes the referral engine more than any other section.

Working method, in order of priority: correctness, then compliance, then speed,
then polish. Phase gates are real. Finish a phase, report with numbers, stop.

---

## Phase 0 — Inventory the inputs

Read everything in the two input folders before writing code. Produce
`INPUTS-INVENTORY.md`.

### `./desert-peak-insurance-sitemap/`

Six files: `site-architecture.xml`, `data-products.xml`, `data-locations.xml`,
`full-sitemap.xml`, `page-count-report.txt`, `README-for-developer.md`. Apply the
six corrections from the page-generation prompt's Phase 0.A before importing —
deduplicated BOP slug, 40 added Tier-1 product×state hubs, normalized apostrophe
slugs, placeholder agents/carriers excluded, sitemap treated as a test fixture.
Corrected plan: **1,068 routes, 1,023 buildable now, 45 blocked on client data.**

Confirm the scope conflict in Phase 0.B of that document has been answered by a
human. If `RECONCILIATION.md` does not exist or has no recorded decision, **stop
here** and say so. Building a P&C site for a Medicare advisory is not a thing to
discover in Phase 4.

### `./desert-peak-brand/`

Check what stage the brand work reached:

- If `design-tokens.json`, `dist/tokens.css`, `dist/tailwind-preset.ts`, and
  `logos/` exist → consume them. They are the only source of design values in this
  repo (see `verify:tokens` in Phase 5).
- If only `CONCEPTS.md` exists → the Stage 1 gate has not been passed. Report which
  direction is recommended, and build Phases 1–4 (which need no visual design)
  while the client decides. Phase 5 waits.
- If the folder holds only the brand prompt → say so. Do not invent a token set to
  unblock yourself.

### `${legacy_domain}`

Crawl it to `inputs/legacy-crawl.json` per the page-generation prompt's Phase 0.C.
Facts only, never design, never copy.

### Legacy feature parity — nothing that works today may disappear

A rebrand that loses a working feature is a regression, however good the new site
looks. Crawl the production site as a **user**, not a scraper: click every CTA,
open every form, follow every link in the header and footer, and record every
*functional* capability — not pages, capabilities. Produce
`LEGACY-FEATURE-PARITY.md` with one row per feature:

| Feature | Where on legacy | Status in new build | Owning phase | Notes |
|---|---|---|---|---|

Status is one of `exists` / `planned` / `missing` / `deliberately dropped`. A
`missing` row becomes a work item in the owning phase. A `deliberately dropped` row
needs a one-line reason and a human's initials — it is not a status you assign
yourself.

Starting checklist from a first crawl, to be verified and extended:

- Contact / "book a policy review" flow — its exact fields, and where submissions
  go today (form handler, email, third-party scheduler). Reproduce the *function*
  with the Phase 2 `Leads` collection, Resend notification, and Turnstile; never
  reproduce the styling.
- Click-to-call on the phone number, on every page, on mobile.
- Coverage detail pages per line (life, whole, term, IUL, annuities, Medicare,
  health, dental & vision) — whether these survive is a Phase 0.B decision, but
  their **function** (a page per line with a CTA) is already in the IA.
- FAQ accordion; client testimonials (reuse gated on consent — see hard rules);
  the award/certificate gallery (belongs to the old entity and plan year — client
  must confirm before it transfers).
- The agent-facing section: *Work with us*, *Agents resource*, *Agent training*.
  This is recruiting and enablement for producers and is **not** in the sitemap
  package at all. If the client keeps it, it maps naturally onto the Phase 4
  partner track and the `partner` role; raise it, do not drop it silently.
- Client resources page; social links; the Medicare compliance disclaimer in the
  footer (mandatory if Medicare stays in scope).
- Anything invisible in the HTML: analytics, tag manager, cookie consent, chat or
  scheduling widgets, pixel scripts. Each one is either justified in
  `THIRD-PARTY.md` or dropped with a reason. Third-party scripts count against the
  performance budget in Phase 5.

Re-run the audit after Phase 5 against the new build and update every row. The
file is a Definition-of-done artifact.

### Environment contract

The repo ships a `.env` template. Read it before Phase 1; it encodes architecture
decisions that this document must respect, and it has gaps this document must close.

**What it already decides — respect it:**

- **Two Supabase projects, not one.** *Project A* (`NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) is customer auth
  and app data; *Project B* (`PAYLOAD_DATABASE_URI`) is Payload's database. This
  is a cleaner cut than the single-project schema isolation described in Phase 1
  — adopt it, and update Phase 1 accordingly: Payload owns Project B entirely, RLS
  stays off there; Project A gets RLS on every table and is where the referrer
  portal's magic-link auth (Phase 4) and any customer-facing session should live.
  `SUPABASE_SERVICE_ROLE_KEY` is server-only; a lint rule fails the build if it is
  ever imported into a client component.
- **Media on Supabase Storage via the S3 adapter** (`S3_*`) — matches Phase 1.
- **Resend** (`RESEND_API_KEY`, `OWNER_EMAIL`, `EMAIL_FROM`) — the transactional
  channel for lead notifications *and* for the referee opt-in message in Phase 4.
  The documented fallback (save the submission, skip the email, log it) is correct
  and must be preserved: a missing email key never loses a lead.
- **Cloudflare Turnstile** (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
  `TURNSTILE_SECRET_KEY`) — the bot protection the Phase 4 fraud section calls
  for. The committed values are Cloudflare's always-pass **test keys**. Swapping
  them for real keys is a go-live gate; add a startup check that refuses to run
  with test keys when `NODE_ENV=production`.
- `NEXT_PUBLIC_SITE_URL` drives canonical, OG, and the generated sitemap.
  `VERCEL_OIDC_TOKEN` is CLI-managed; never set it by hand.

**What it is missing — add it:**

- `PAYLOAD_DATABASE_URI_DIRECT` — the direct/session connection for migrations,
  seeding, and CI. The template's `PAYLOAD_DATABASE_URI` is the transaction pooler
  (6543) and is correct for runtime **only**; running migrations through it is
  the failure mode Phase 1 warns about.
- `REFERRAL_COOKIE_DAYS` (default 90), `DEFAULT_TENANT_ID`, and
  `REFERRAL_HASH_SALT` for the IP hashing in `ReferralEvents`.
- `RUM_ENDPOINT` / `RUM_WRITE_KEY` for the real-user monitoring in Phase 5.
- `ERROR_REPORTING_DSN` if a provider is used — with the PII scrubber wired before
  the first event ships.

**Housekeeping:** the template's header names a different project (*Silver Star
Vending*) and a sender domain that is not this client's. Rename it, retitle the
comments, and commit it as `.env.example`. Add `src/env.ts` that validates
`process.env` with a schema at boot — required keys fail fast with a message naming
the key, optional keys (Resend, RUM, error reporting) degrade with a logged warning.
Nothing reads `process.env` directly outside that file.

**Exit:** `INPUTS-INVENTORY.md` states exactly what exists, what stage each input
is at, and which later phases are unblocked. `LEGACY-FEATURE-PARITY.md` has a row
for every working feature on the production site. `.env.example` is renamed,
complete, and validated by `src/env.ts`.

---

## Phase 1 — Supabase topology

The place Payload-on-Supabase builds usually go wrong. Do it once, correctly.

### Three connection modes, three jobs

- **Direct** (5432, bypasses the pooler) — IPv6-only unless the project has the
  IPv4 add-on. **Unreachable from most CI and home networks.** Do not plan on it.
- **Session mode** (Supavisor, 5432) — migrations, seeding, CI, `pg_dump`.
  Supports prepared statements; IPv4-compatible on every plan.
- **Transaction mode** (6543) — serverless runtime. No `SET`, no
  `LISTEN/NOTIFY`, no advisory locks.

```
PAYLOAD_DATABASE_URI_DIRECT   migrations · seed · CI        session pooler, 5432
PAYLOAD_DATABASE_URI          deployed app on Vercel        transaction pooler, 6543
NEXT_PUBLIC_SUPABASE_URL      customer auth · app data      Supabase client SDK
```

These are the names the repo's `.env` template uses; do not introduce parallel
names.

**Verified against Payload 3.89 / current Supabase (2026-09-12) — do not
re-derive these from older guidance:**

- The Payload Postgres adapter exposes **no "prepared statements off" option**
  and does not need one: its driver never names statements, so transaction mode
  is safe as-is. `test:db` (50 concurrent queries through the pooler, raw driver
  and Payload local API) is still required — it proves it, and it catches
  regressions when the adapter is upgraded.
- **Pool size 1 deadlocks Payload.** The adapter holds one client checked out
  after init, so the first read waits forever. **Minimum pool size is 2**;
  confirm with `pg_stat_activity` if you change it.
- **Payload migrations do not create the schema.** The initial migration must
  open with `CREATE SCHEMA IF NOT EXISTS payload_cms;`. Verify on Supabase and
  on a fresh Docker database.
- **Push mode is gated on the connection string pointing at localhost.** It can
  never be on against Supabase, whatever the env says.
- **Pin Next to the version in Payload's own template** (Next 16.x for Payload
  3.89). Whatever a scaffold ships with is not in Payload's supported range
  unless you have checked.
- The production guard keys off `VERCEL_ENV` / `APP_ENV`, not `NODE_ENV` — a
  local `next build` also sets `NODE_ENV=production`.

### Two projects, two authorization models

The `.env` template splits Supabase into **Project B for Payload** and **Project A
for customer auth and app data**. Keep that split; it is cleaner than schema
isolation inside one project.

- **Project B (Payload):** Payload's tables still live in `payload_cms`, not
  `public`, and that schema is not in the PostgREST exposed-schema list. **Row
  Level Security stays off** on Payload tables — Payload does its own access
  control and RLS would be a second, competing authorization layer whose failure
  mode is silently empty results. Nothing else is ever created in Project B.
- **Project A (app):** everything here is reached through the Supabase client SDK
  and **every table has RLS enabled** with policies tested per role. This is where
  referrer-portal sessions (magic link via Supabase Auth), customer sessions, and
  any data a browser reads directly belong. `SUPABASE_SERVICE_ROLE_KEY` is used
  only in server code that has already done its own authorization.

Record both halves in `DECISIONS.md`; "Supabase with RLS off" on Project B looks
like a mistake unless the reason and the boundary are written down.

### Migrations

Push mode only against Docker Postgres on localhost (enforced, above). Production
migrations are generated (`payload migrate:create`), committed, reviewed, and
applied in CI over the **session pooler** before the app deploys. `migrate:check`
fails CI if committed migrations do not fully describe the current config.

### Media

No first-party Supabase storage adapter exists for Payload; Supabase Storage is
S3-compatible, so use the S3 adapter against the Supabase S3 endpoint with storage
access keys. If a first-party adapter now exists, prefer it and note it. Public read
scoped to the media bucket only. Responsive image sizes configured to match the
`sizes` attributes the frontend actually uses.

---

## Phase 2 — Data model

### Correct the premise before modelling

"Payload for each page" taken literally is 1,068 documents, and it is the wrong
build:

| Route group | Routes | Documents producing them |
|---|---|---|
| Tier-1 product × city | 380 | 10 products × 38 cities |
| Tier-1 product × state hubs | 40 | 10 × 4 |
| Tier-2 product × state | 76 | 19 × 4 |
| Product hub + coverage + discounts-faq | 87 | 29 products |
| State hubs | 4 | 4 states |
| **Subtotal** | **587** | **71 documents** |
| Articles / glossary / core+legal | 436 | 436 documents |
| Agents / carriers | 45 | blocked — real roster required |
| **Total** | **1,068** | **~507 documents** |

587 routes from 71 documents. If an editor must open 380 records to change one
sentence about auto coverage, the CMS has become the problem, and those 380 records
drift until the pages contradict each other. **Products and locations are data;
composition is code; `LocationOverrides` is sparse.** An override exists only when
someone writes one. This also makes the uniqueness requirement a data-completeness
problem an editor can see, rather than a prose problem a similarity test finds
afterwards.

Disagree? Argue it in `DECISIONS.md` first. Never silently build the 1,068-document
version.

### Collections

**Content-driving data**
- `Products` (29) — name, slug, tier, category, coverage blocks, covered /
  not-covered, discounts, FAQs, related products, SEO defaults.
- `States` (4) — name, abbr, slug, statutory minimums each with a **source URL**,
  DOI link, license number (compliance-locked), risk notes.
- `Cities` (38) — name, slug, state, the `CityFacts` group (county, local hazards,
  housing stock, driving context, neighborhoods, nearest office), with an admin
  **completeness indicator** so thin cities are visible at a glance.
- `LocationOverrides` (sparse) — product × city; optional intro, consented local
  testimonial, assigned agent, custom FAQs.

**Written content**
- `Articles` (186), `GlossaryTerms` (221), `Pages` (29) — as specified in the
  page-generation prompt, with `reviewStatus` and `indexWave` on every content
  document. Glossary validation: no self-relation, ≥1 inbound link per term.

**Blocked until the client supplies real data**
- `Agents`, `Carriers` — seeded empty. Carriers get an appointment-confirmed date.

**Operational**
- `Media`, `Users` (roles below), `Redirects`, `Forms`, `Leads`.

**Globals**
- `SiteSettings`; `ComplianceSettings` — disclosure text blocks, per-state license
  numbers, TPMO/Medicare disclaimer, banned-phrase list, **and the referral reward
  rule table** (Phase 4). Admin-write-only.

### Roles

`admin` (everything, including compliance globals and `reviewed` status) ·
`editor` (content, never compliance) · `agent` (own profile, own leads, own
referrals) · `partner` (referral portal only — see Phase 4). Access control is
tested, not assumed: a test per role per collection per operation.

### `Leads` and PII

Quote forms collect DOB, address, vehicle and property details, and sometimes
health indications — regulated under state insurance privacy rules, not ordinary
marketing data. Minimum: no PII in logs or third-party error reporting, a stated
retention period with a deletion job, restricted admin read access, TLS end to end.
CRM push is a separately scoped task with its own review.

**Exit:** `payload generate:types` committed; access-control test matrix green.

---

## Phase 3 — Seeding

`scripts/seed.ts`: idempotent, `--dry-run`, safe against any environment.
Upserts by slug; fills empty fields and **reports** conflicts rather than
overwriting editor work; creates article and glossary shells with
`reviewStatus: draft` for the page-generation prompt's batched content phase;
imports the legacy crawl into `Redirects`; prints a reconciliation table.

---

## Phase 4 — Referral engine

The client's ask is a referral program to scale the business — plural, "these
companies." Read that as a requirement: **the engine is a reusable, tenant-aware
module** (an internal Payload plugin under `packages/referrals/`), and Desert Peak is
its first tenant. Nothing in it hardcodes the brand. That is what "scale out" costs
up front and saves on the second agency.

### The constraint that shapes everything

Insurance referral rewards are regulated, and the rules are stricter than in any
ordinary industry. Every one of the four licensed states has anti-rebating and
unlicensed-referral-fee statutes; in general terms, paying an unlicensed person a
fee **contingent on a policy being sold** is prohibited, while a nominal,
non-contingent thank-you for the referral itself is typically permitted within
state-specific limits. If Medicare is in scope, CMS layers its own rules on top:
beneficiary gifts must be nominal, non-cash, and never tied to enrollment.

You are not counsel and you will not encode dollar figures from memory. What you
build is an engine whose **invariants make the compliant program the only one it
can run**:

1. **Rewards are never contingent on a bound policy.** The trigger for a reward is
   a *qualified referral* (a real, consenting, non-duplicate person who was
   contacted), configurable per tenant, and the code path that could tie a reward
   to `policy_bound` does not exist. If a client asks for it, that is a counsel
   conversation, not a feature flag.
2. **Per-state reward rules live in `ComplianceSettings`**, admin-write-only,
   with fields for: reward type allowed (gift card / merchandise / account credit /
   none), per-referral cap, per-referrer annual cap, cash-equivalent allowed
   (boolean), Medicare-track rule set, and a **source citation** per row. The seed
   ships every row as `null` with `program_enabled: false`. Counsel fills it in.
   The engine refuses to issue a reward where the rule row is null.
3. **Two tracks with different rules:** *customer referrals* (unlicensed
   individuals — the nominal-gift regime) and *licensed producer / business
   partner referrals* (agents, realtors, mortgage brokers, dealers — different
   statutory footing, and mortgage-adjacent referrals also raise RESPA questions).
   Tracks are separate rule sets, separate portals, separate ledgers. Never
   collapse them.
4. **Medicare-touching referrals** route to the Medicare rule set automatically if
   the referee's interest includes any Medicare product. Non-cash only, nominal
   only, and never messaged as an enrollment incentive.
5. **Tax handling is a flag, not a guess.** Annual reward totals per referrer are
   tracked so the agency's accountant can handle reporting thresholds; the engine
   does not assert what the threshold is.

### Data model

- `ReferralPrograms` — per tenant: track (customer / partner), active window,
  qualification rule, reward configuration referencing the compliance rule table,
  T&Cs document (versioned; acceptance is recorded against the version).
- `Referrers` — a person with a code; relationship to `Users` for the partner
  track; magic-link auth for the customer track; program T&C acceptance record;
  payout method (abstracted — never a card or account number).
- `Referrals` — referrer, referee contact (minimal), interest, source (link / code /
  form), attribution details, consent records, **status pipeline**:
  `submitted → contacted → qualified → quoted → bound → closed`, plus
  `rejected` with a reason. `bound` is tracked for analytics only and is
  structurally disconnected from rewards.
- `RewardLedger` — append-only. Entries: `earned`, `issued`, `reversed`, each with
  actor, timestamp, rule-row snapshot, and program T&C version. Balances are
  computed, never stored.
- `ReferralEvents` — immutable audit trail for every state change, with actor and
  IP hash.

### Attribution

`/r/{code}` sets a first-party cookie (configurable window, default 90 days),
passes through to the quote flow with the code prefilled, and records first-touch
server-side on lead creation. Manual code entry on every form. Document first-touch
vs last-touch; ship first-touch. Codes are short, unambiguous (no `0/O`, `1/l`),
and rate-limited on lookup.

### Consent and messaging

A referrer is submitting **someone else's** contact details. The engine requires
the referrer to affirm they have permission; sends the referee exactly **one**
opt-in message that names the referrer and lets them decline; and creates no lead
record beyond the minimum until the referee responds. No outbound calls or texts
to a referee before opt-in — that is TCPA territory. Every message template lives
in the CMS, is versioned, and is admin-write-only.

### Fraud and abuse

Self-referral detection (email, phone, address normalization and match), duplicate
referee detection across referrers, velocity limits per referrer and per IP,
disposable-email rejection, bot protection on the submission form, and a manual
review queue that gates the first reward for any new referrer. Every rejection has
a reason code and is visible to an admin, never silently dropped.

### Portals

- **Customer referrer portal** (magic link via Supabase Auth on Project A): my code, share tools, my referrals with
  status — showing the referee's **first name only** — and my rewards. Nothing
  more; a referrer never sees a referee's quote details.
- **Partner portal** (`partner` role): the same plus program materials, a monthly
  statement, and payout history. A realtor checks this on a phone between showings;
  it meets the full Phase 5 standard.
- **Admin dashboard**: funnel by program and track, qualified-rate, time-to-contact,
  reward liability outstanding, fraud queue, and per-referrer annual totals.

### Tenancy

Every collection above carries a `tenant` relation. Programs, rule tables, T&Cs,
templates, and portals are tenant-scoped. Access control enforces tenant isolation
and it is tested with a two-tenant fixture. Adding a second agency is configuration,
not code.

**Exit:** engine builds with `program_enabled: false` everywhere; the invariant
tests pass (no reward path from `bound`; null rule row → refusal; tenant isolation;
consent gate; self-referral rejection); `REFERRAL-COMPLIANCE.md` lists exactly what
counsel must supply before any program can be switched on.

---

## Phase 5 — Interface standard

This is the executive version of `desert-peak-interface-standard-prompt.md`. Read
that file in full before starting this phase; it governs.

### The floor — gated by CI

- **WCAG 2.2 AA**, zero axe violations on every template at every breakpoint; the
  2.2-specific criteria (focus not obscured, 24 px targets, drag alternatives,
  consistent help, no redundant entry) each verified explicitly; keyboard-only
  walkthrough of the quote flow and both portals recorded in `A11Y-REPORT.md`;
  screen-reader pass on the ten highest-traffic templates.
- **Core Web Vitals** at the targets above, p75 mobile, measured by real-user
  monitoring to an endpoint you own. `PERFORMANCE-BUDGET.json` enforced by
  Lighthouse CI per route group: content pages (the vast majority of 1,068 routes)
  ship ≤ 60 KB gzipped JS; app routes ≤ 180 KB. Fonts self-hosted, subset,
  size-adjusted so fallback causes no shift. AVIF with WebP fallback, explicit
  dimensions on every image, priority hint on the LCP element.
- **Robustness**: every template renders and links without JavaScript; every async
  state designed (loading, empty, error, partial, offline); forms never lose data;
  no horizontal scroll from 320 px; print stylesheets for articles, glossary,
  coverage pages, and quote summaries.
- **`verify:tokens`**: a lint rule that fails on any hardcoded hex, arbitrary
  Tailwind value, or one-off spacing anywhere in the app. Every design value comes
  from `${brand_dir}/dist`. Define this rule here; the interface document
  references it.

### The ceiling — gated by critique

- Write `UX-MODEL.md` first: for each of the ~12 templates, who arrives, from
  where, in what state, what the one primary action is, how you know it worked.
- Build a finished design system of roughly 25 components, every state rendered
  from real content in a `noindex` `/design-system` gallery route. Review it there
  before touching a template.
- Typography carries hierarchy; tabular figures on every columnar number — an
  insurance comparison table exists so limits and deductibles can be compared at a
  glance.
- Restraint is the signature: one bold element per template, everything else
  quiet; remove one thing before shipping each template and record it in
  `CRITIQUE.md`.
- The prohibited-tells list in the interface document is binding: no glassmorphism
  or decorative gradients, no identical-card SaaS kit, no eyebrow labels and glued
  arrows, no emoji icons, no fade-up-on-every-section, no stock handshakes, and no
  dark patterns of any kind — fake urgency, confirmshaming, pre-checked consent,
  chat widgets over the CTA. Some of those are illegal in this category. None ship.
- The quote flow is treated as its own product: honest progress, validation on
  blur, error summary linked to fields, correct `autocomplete`/`inputmode`/`type`
  everywhere, save and resume, editable summary, one-handed on a 320 px phone.
- Portals and the themed Payload admin meet the same bar as the public site.

### Process

Audit (screenshots at 320/768/1280/1920 on the device baseline, axe, Lighthouse —
`UX-AUDIT.md`, fix nothing yet) → model → plan (`UI-PRINCIPLES.md`, revised
against the tells list) → design system → templates highest-traffic first →
critique pass → verify. Take screenshots and look at them. Reading DOM is not
reviewing an interface.

---

## Phase 6 — Cache invalidation

Path-based revalidation does not scale here: one edit to the auto product fans out
to 38 city pages, 4 state hubs, three product pages, and every linking article.
**Tag-based revalidation** with a documented scheme:

```
product:{slug}  state:{slug}  city:{state}-{city}  article:{slug}  glossary:{slug}
global:nav      global:compliance      tenant:{id}:referrals
```

Payload `afterChange`/`afterDelete` hooks revalidate tags, never paths. A change
to `ComplianceSettings` invalidates everything — correct, and rare.

**Rendering:** statically prerender indexation wave 1 (core, legal, 29 product
hubs, 4 state hubs, top 30 city pages); ISR-on-first-request for the rest, kept
fresh by tags. Measure the full build; prerender more if it fits the deploy budget.
Report the number. Referral portals and the quote flow are dynamic, never cached.

`test:revalidate`: edit a product through the local API; assert dependent routes
serve the change.

---

## Phase 7 — Environments and operations

Local on Docker Postgres — nobody breaks production with a seed script. Preview on
a Supabase branch per PR, never pointed at production data. Production migrations in
CI over the direct connection before deploy. PITR confirmed for the plan tier plus a
scheduled logical dump to separate storage. `PAYLOAD_SECRET`, both database URLs,
storage keys, and the RUM endpoint key in the deployment environment only; seed and
runtime credentials rotated separately. Error reporting scrubs PII before it leaves
the process.

---

## Hard rules

1. **Verify against current docs before writing config.**
2. **Never fabricate** agents, carriers, license numbers, statutory minimums,
   testimonials, reward limits, or brand facts. Empty beats invented.
3. **Compliance globals and referral rule tables are admin-write-only** and ship
   null with programs disabled.
4. **No reward path from a bound policy exists in the codebase.**
5. **No RLS on Payload tables** — documented.
6. **Seeding is idempotent and non-destructive.**
7. **Every design value comes from `${brand_dir}/dist`.** `verify:tokens` enforces it.
8. **Nothing on the prohibited-tells or dark-pattern lists ships.**
9. **No feature that works on the production site is lost.** Every row in
   `LEGACY-FEATURE-PARITY.md` ends as `exists` or `deliberately dropped` with a
   human's reason — never `missing` at handover.
10. **`src/env.ts` is the only reader of `process.env`**, and production refuses
    to boot on Turnstile test keys or a missing required variable.
11. **Phase gates hold.** Finish, report with numbers, stop.

---

## Definition of done

```
pnpm typecheck && pnpm lint && pnpm test
pnpm payload generate:types        # committed, matches config
pnpm migrate:check                 # migrations fully describe config
pnpm test:db                       # 50 concurrent queries through transaction pooler, raw + local API
pnpm test:rls                      # payload_cms RLS off, not exposed via PostgREST; 0 stray public tables
pnpm test:media                    # upload, public read, delete through the S3 adapter
pnpm test:access                   # role × collection × operation matrix
pnpm test:tenancy                  # two-tenant isolation fixture
pnpm test:referrals                # invariants: no bound→reward path, null rule refusal,
                                   #   consent gate, self-referral rejection, ledger append-only
pnpm seed --dry-run                # clean reconciliation table
pnpm build
pnpm test:revalidate               # edit fans out to dependent routes
pnpm verify:tokens                 # zero hardcoded design values
pnpm test:a11y                     # axe zero violations, every template, every breakpoint
pnpm test:visual                   # Playwright screenshots, 4 breakpoints, matched to baseline
pnpm lhci                          # 100/100/100/100 mobile; PERFORMANCE-BUDGET.json honoured
pnpm test:nojs                     # every template renders and links without JS
pnpm test:quote-flow               # keyboard-only end to end; data survives errors and back
pnpm verify:env                    # .env.example complete; src/env.ts schema passes; no direct process.env reads;
                                   #   service-role key never imported client-side; test keys rejected in production
pnpm verify:parity                 # LEGACY-FEATURE-PARITY.md has zero `missing` rows
```

Committed evidence: `INPUTS-INVENTORY.md`, `LEGACY-FEATURE-PARITY.md`,
`.env.example` with `src/env.ts`, `DECISIONS.md` (the 507-not-1,068
model, connection topology, schema isolation, RLS, storage adapter, plugin
selections, prerender/ISR split with measured build time, referral engine
invariants and why each exists), `REFERRAL-COMPLIANCE.md` (what counsel must
supply per state and per track), `UX-AUDIT.md`, `UX-MODEL.md`,
`UI-PRINCIPLES.md`, `A11Y-REPORT.md`, `PERFORMANCE-BUDGET.json`,
`THIRD-PARTY.md`, `DEVICE-MATRIX.md`, `CRITIQUE.md`, and the `/design-system`
gallery route.
