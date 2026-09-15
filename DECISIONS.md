# Decisions

Every consequential platform choice, its reason, and what was rejected. Dates are
2026-09-12 unless stated. Brand-level decisions live in
`desert-peak-brand/brand/DECISIONS.md`; this file covers the platform build.

## Phase 0

**The build stopped at the Phase 1 gate.** `RECONCILIATION.md` does not exist,
so the Phase 0.B scope conflict (P&C sitemap vs. the life/Medicare/health book
the production site actually sells) has no recorded answer. The companion
documents `desert-peak-page-generation-prompt.md` and
`desert-peak-interface-standard-prompt.md` are not in the repo or on this machine.
Phases 1–4 could be built without visual design, but Phase 2's collection shapes
depend on which product lines exist, and that is the unanswered question.
Rejected: guessing the answer from the sitemap alone, because the sitemap
contradicts the live business.

**Production is already Next.js, not WordPress.** The crawl shows the Ellis &
Associates scaffold in this repo deployed on Vercel. Parity is therefore a diff
against `app/`, `components/` and `lib/` rather than a WordPress export. The only
WordPress traces are two `-2` slug redirects and 403s on `wp-admin`; they are
imported as redirects and 410s.

**Project A and Project B are currently the same Supabase project.** All three
credential groups in `.env` carry ref `xmcsjinhhdvyyfqwambp`. The template's
comments describe the two-project split the master document adopts; the values
do not. Decision: keep the two-project design and treat provisioning Project B
as a Phase 1 prerequisite. Rejected: silently collapsing to one project with
schema isolation, because RLS-on for app tables and RLS-off for Payload tables in
one project is exactly the ambiguity the split exists to remove. If the client
prefers one project, that is a one-line decision here and the schema-isolation
variant in Phase 1 applies.

**`.env.example` is un-ignored.** The template's `.env*` pattern covered it.
`!.env.example` added. `.env` itself stays ignored and untracked.

**Credentials from another client's accounts are in `.env`.** The Resend key and
`EMAIL_FROM` domain belong to a different project. They are not copied into the
example and must be rotated before Phase 2 sends mail. Not a code decision, but
recorded so nobody wires them.

**`src/env.ts` has no dependency.** A hand-rolled schema (required / optional /
default / validator) instead of zod, because the Payload app and its lockfile do
not exist yet and the repo is mid-migration from npm to pnpm. Swap for zod in
Phase 1 if the team prefers; the exported shape stays the same. Rejected:
deferring the file to Phase 1, because the `verify:env` checks (test-key refusal,
no stray `process.env`, client-import guard) are useful against the current
scaffold today.

**Turnstile test-key refusal matches Cloudflare's six documented dummy keys
exactly** (three site keys, three secret keys) rather than a prefix pattern, so
a real key can never be rejected by accident.

**Brand consumed as delivered.** `desert-peak-brand/` reached its final stage
(Direction 1 Strata, tokens through `dist/`, logo system, contrast gate). Phase
5 imports `@desert-peak/brand` as a workspace package. The brand's own deliberate
gaps (no dark values, no `size-adjust` fallbacks) are Phase 5 work items, not
brand changes.

**Six sitemap corrections verified, not assumed.** Three were needed (doubled
BOP slug on 41 URLs, 40 missing Tier-1 state hubs, 45 placeholder agent/carrier
pages); one was already satisfied (apostrophe slugs are clean); the fixture
treatment and the 1,068 figure follow arithmetically. Recorded in
`INPUTS-INVENTORY.md` §1.

## Phase 1

**Supabase topology — one project, schema-isolated (decided 2026-09-12).**
Project A and Project B resolve to the same project (ref `xmcsjinhhdvyyfqwambp`)
by decision, not by accident. Payload owns the `payload_cms` schema, RLS off,
schema excluded from PostgREST. All app data and Supabase Auth live in `public`
with RLS on every table. `PAYLOAD_DATABASE_URI_DIRECT` and `PAYLOAD_DATABASE_URI`
point at the same database via direct and transaction-pooler endpoints. Split
into two projects when the second referral tenant onboards — a connection-string
change plus a `pg_dump` of one schema.

**Reconciliation decision B applied to the data files.** Seven products added to
`data-products.xml` as Tier 2 / Personal with slugs matching the legacy URLs;
three carry `parent="life-insurance"`, two carry `subpage3="plans-enrollment-faq"`
so the template renames the third subpage for Medicare and annuities. Corrected
plan: **1,117 routes, 1,072 buildable, 45 blocked**. `verify:data` computes this
from the XML rather than trusting a number in a document. The file is still named
`RECONCILIATION.md` (renamed from `Reconciliation.md`, which the Phase 0 gate
check would not have found).

**Docs check (2026-09-12) and where the master document was stale.** Read
before any config was written: Payload `postgresAdapter` options, Payload
migrations, Payload storage adapters, Supabase "Connecting to your database",
Supabase Storage S3 authentication. Deltas:

- *No "prepared statements off" option exists in the adapter.* The adapter
  wraps `node-postgres`, which only creates named server-side prepared
  statements when a query is given a `name`; Payload and Drizzle never do. So
  there is nothing to switch off, and `pnpm test:db` is the proof: 50
  concurrent parameterized queries through Supavisor transaction mode across
  several backend pids, zero errors.
- *"Client-side pool size 1" deadlocks.* `@payloadcms/db-postgres` 3.89 keeps
  one client checked out after `getPayload()`; with `max: 1` the pool shows
  total 1 / idle 0 / waiting 1 and the first `find()` never returns. `max: 2`
  is the effective single-connection setting on serverless and is what ships.
- *Migrations do not create the schema.* Payload creates `payload_cms` only in
  push mode. The initial migration opens with `CREATE SCHEMA IF NOT EXISTS`
  so a fresh database (Supabase, CI, Docker) migrates from zero. Verified on
  both Supabase and the Docker database.
- *The direct host is IPv6-only.* `db.<ref>.supabase.co:5432` is unreachable
  from IPv4-only networks, including this machine. `PAYLOAD_DATABASE_URI_DIRECT`
  is the session-mode pooler (`aws-0-us-east-2.pooler.supabase.com:5432`),
  which supports prepared statements and works everywhere. Same database,
  same semantics for migrations.
- *Next 16, not 15.* `@payloadcms/next` 3.89 supports `>=15.2.9 <15.3.0 ||
  >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.6 <17`. The scaffold's
  installed 15.5.20 is in none of those ranges. Pinned to 16.3.3, the version
  in Payload's own blank template. `next lint` is gone in 16; `pnpm lint` runs
  ESLint 9 with the flat configs `eslint-config-next` now exports directly.
- *No Supabase storage adapter exists.* Confirmed; `@payloadcms/storage-s3`
  with `forcePathStyle: true` against `https://<ref>.storage.supabase.co/storage/v1/s3`.
  The region must be the project's own: `us-east-2` signs, `us-west-2` fails
  with `SignatureDoesNotMatch`. `.env` corrected.
- *PostgREST exposure* is a dashboard setting, not SQL. The default exposes
  only `public, graphql_public`; `pnpm test:rls` asserts `payload_cms` returns
  `PGRST106` so a future dashboard change is caught.

**The production guards key off the deployment tier, not `NODE_ENV`.** A local
`next build` runs with `NODE_ENV=production` and must succeed with Turnstile
test keys, or nobody can build. `APP_ENV` (or Vercel's `VERCEL_ENV`) decides;
only `production` arms the refusals (test keys, http site URL, local database).
`pnpm verify:env` checks both directions.

**Push mode is a property of the database host, not a flag.** `push` is on only
when `NODE_ENV=development` and the connection string points at localhost
(the Docker database). There is no environment variable that could leave push
on against Supabase by mistake.

**Pool size is a property of the host.** `max: 2` is right for a Vercel
instance (one request at a time, one client held by the adapter). A
long-running `next start` behind a crawler serves many first-request ISR
renders at once and starved on 2 during `verify:routes` (60 s page waits),
so non-Vercel runtimes get 10. Measured, not guessed.

**Runtime and migrations use different connection strings from one config.**
`PAYLOAD_MIGRATING=true` (set by the `migrate:*` scripts, never by hand)
switches the adapter to `PAYLOAD_DATABASE_URI_DIRECT` with a wider pool.
Everything else uses the transaction pooler.

**Existing frontend moved to `app/(frontend)/`, untouched otherwise.** Payload's
admin needs its own root layout; the route group is the documented way to keep
two. Phase 5 replaces the group's contents; Phase 1 only relocated them.

**`roles` on `Users` from the first migration.** Adding the column in Phase 2
would mean a second migration on a table with an admin user in it. The four
roles are fixed by the master document; access rules for them are Phase 2.

## Phase 2

**507-not-1,117 documents, as the master document argues.** 36 `Products`, 4
`States`, 38 `Cities` and a sparse `LocationOverrides` collection produce all
636 composed insurance routes; `Articles` (186), `GlossaryTerms` (221) and
`Pages` (29) are one document per route. Composition is Phase 5/6 code. An
editor changes an auto-coverage sentence once, in one place.

**The companion prompt's Phase 1 (MDX + Zod) is superseded; its rules moved
into the collections.** Slug normalizer with fixtures (defects 1 and 4) →
`src/lib/slug.ts` + `slugField()`, which refuses any slug the normalizer would
change. Reserved-slug guard (defect 3) → `tests/unit/reserved-slugs.test.ts`
over the data files. `CityFacts` → the `cityFacts` group on `Cities`, with
`factsComplete`/`factsMissing` computed on save and shown in the list view; a
`{{TODO:…}}` token counts as missing. `reviewStatus`/`indexWave` →
`reviewFields()` on every content document; `generation` group replaces
`content/.generation-state.json` for the Phase 3 batches.

**The package convention for apostrophes is a separator.** `coeur-d-alene`,
`workers-compensation-insurance`. The first draft of the normalizer deleted the
apostrophe (`coeur-dalene`); the unit fixtures caught it. Every punctuation
mark is a separator, diacritics are stripped.

**`reviewed` is admin-only through a field hook, not `validate`.** The hook
sees `previousValue`, so an editor can move draft → in-review and back, and
only the transition *into* `reviewed` by a non-admin throws (403). **A request
with no user is non-admin, not trusted** (corrected after Phase 2 review): the
seed never sets `reviewed`, so it needs no exception. The one server-side
escape hatch is an explicit `context.allowReviewed = true`, which is logged
with the collection and user on every use. `indexWave` is admin-only at the
field level outright: promotion is a deliberate act.

**No Payload versions/drafts.** `reviewStatus` is the workflow the prompts
specify, and drafts would add a second, parallel "published" notion plus a
versions table per collection. Revisit only if editors ask for autosave.

**License numbers live on `States` behind a field-level admin lock, not in
`ComplianceSettings`.** The master document lists them in both places; one
source is safer. `ComplianceSettings` keeps the disclosure *template*
(`{{state}}`, `{{licenseNumber}}`), the TPMO text, the banned-phrase list,
retention periods and the referral reward rule table.

**Public read of content is `reviewStatus = reviewed` only.** The REST and
GraphQL APIs are public surfaces; unreviewed drafts do not leave the building
through them. The site renders drafts through the local API (which overrides
access) and applies `noindex` itself.

**Leads.** Regulated PII. Create is admin or server-side local API only; read
and update are admin or the assigned agent; the raw submission (`data`) is
admin-read-only at the field level; `retainUntil` is set on create from
`ComplianceSettings` (24 months, 12 months when health information is
present — defaults for counsel to confirm); `pnpm leads:purge` deletes
expired rows and prints counts only. IPs are stored hashed.

**Agents and Carriers seeded empty; admins only create them.** Editors cannot
add an agent or a carrier because those are client facts, not content.
`Carriers.appointmentConfirmedAt` is required, so a carrier without a
confirmed appointment cannot exist.

**Redirects refuse chains on save** (a `to` that is itself a `from`) and
support 410 for dead WordPress paths. The full legacy map is Phase 3 seed.

**Access is a contract file plus a test, not comments.** `tests/access/matrix.ts`
states every role × collection × operation; `tests/access/access.test.ts`
executes every cell through the local API with `overrideAccess: false` on a
throwaway Docker database (`pnpm test:access`: 300 cases). Adding a
collection without a matrix row is a type error.

## Phase 3

**The seed fills, it never overwrites.** `scripts/seed.ts` upserts by slug
(path for pages, `from` for redirects). On an existing document only empty
fields are written, where empty means null, "", [] or a `{{TODO:…}}` token.
A field holding a different non-empty value is a conflict: counted, listed by
slug and field, left alone. `tests/db/seed.test.ts` proves it: an editor's
county survives a re-seed and is reported; a TODO token is filled when the
seed knows the value; a real license number is kept over a TODO.

**Seed data is derived, not typed.** `pnpm import:package` converts the XML
package into `src/seed-data/*.json` (page-generation Phase 1's rule). The
186 article and 221 glossary slugs are the one thing only `full-sitemap.xml`
holds, so the import reads them from it once; after that the fixture is a
regression input only. Placeholder titles derive from the slug and are
replaced by generation.

**The seed never sets `reviewed`.** Every article, glossary term, page and
product shell is created `draft` with `generation.status = pending`, and the
seed does not carry `reviewStatus` on updates at all.

**Facts in the seed and where they came from.** Product, state and city
names and slugs: the package. Counties and size bands: the hand-committed
`src/seed-data/city-facts.json` (public geography; size band is an editorial
bucket that is never displayed). Phone, email and social links: the legacy
crawl, which wins on facts about the business, still flagged in
`TODO-CLIENT-DATA.md` #7 for confirmation under the new entity. DOI links:
only Nevada and Utah, the two that answered HTTP 200 from the build machine;
Arizona (403 behind a bot wall) and Idaho (unreachable) are TODO tokens rather
than URLs typed from memory. License numbers, statutory minimums, every other
`CityFacts` field: TODO tokens.

**Six legacy URLs are unresolved on purpose** (`REDIRECTS-UNRESOLVED.md`):
the two intake forms and their WordPress `-2` alias have no route in the IA,
and adding `/forms/*` changes the route count (page-generation rule 4: ask,
do not absorb); the two agent-facing pages wait for the Phase 4 partner
portal route. Nothing is redirected to `/`.

**Forms are seeded with the legacy fields exactly** (parity rows 5, 7, 8),
with `autocomplete`, `inputmode` and `pii` per field, as `createOnly` data so
an editor's later edits are never overwritten by a re-seed.

**No admin user is seeded.** Payload's first-user screen creates it; a
password in a seed file is a secret in git.

## Phase 4

**The engine is a workspace package, `@desert-peak/referrals`, registered
as a Payload plugin.** It adds eight tenant-scoped collections and a `tenant`
relationship on the host's users. Its only host contract is: a `users`
collection with `roles`, a `products` collection with `medicareTouching`,
and a `leads` collection. Email is injected (`sendEmail`), so the plugin
never imports app code and the app keeps the Resend fallback. A second
agency is a `Tenants` row plus its programs and rules.

**The reward rule table moved out of `ComplianceSettings`.** The master
document puts it in the global; a global cannot be tenant-scoped, and
tenancy is a hard requirement of the same section. `referral-reward-rules`
is a collection with `tenant`, admin-write-only, one row per state × track
(+ the Medicare rule set). The global lost two fields in migration
`phase4a`; the plugin's tables arrived in `phase4b`. Two migrations because
drizzle-kit asks an interactive "created or renamed enum?" question when an
old enum disappears in the same diff as a similar new one, and CI cannot
answer prompts.

**Invariants are types and hooks first, tests second.**
- *No reward path from bound.* `rewards.ts` accepts `QualifiedReferral`
  (`status: "qualified"` as a literal type) and nothing else; the transition
  table makes `bound` reachable only after `qualified`; the engine calls the
  reward evaluator from exactly one place, the `qualified` transition. A unit
  test greps the module for the word.
- *Null rule row → refusal.* Any of the five rule fields null, or no row for
  (state, track, medicare), refuses with `rule-incomplete` / `rule-missing`
  and writes a `reward-refused` event. The seed ships all 12 rows null.
- *Tenant kill switch and program switch* refuse before the rule is even read.
- *Consent gate.* A referral cannot exist without the referrer's affirmation;
  the referee gets one message (counter incremented before the send, so a
  failed send never causes a second); `contacted` is refused until the
  referee accepts; the lead is created only on accept.
- *Fraud.* Self-referral (email, phone, normalized address), duplicate
  referee across referrers within 180 days, disposable domains, per-referrer
  and per-IP velocity, bot check: every rejection carries a reason code and
  an event. Nothing is dropped silently.
- *Ledger append-only, events immutable* through hooks, so even
  `overrideAccess` cannot update or delete them. Balances are computed.
- *Status changes only through the engine*, enforced by a hook that checks
  `req.context.referralEngine`.
- *Manual review gate.* A `pending-review` referrer's first reward is earned
  into the queue; issuing requires an admin to activate the referrer.
- *Medicare.* Interest containing a Medicare-touching product routes to the
  Medicare rule set; cash equivalents are refused there regardless of what
  the row says.
- *Tax is a flag.* `annualTotals()` reports issued per referrer per year; no
  threshold is asserted anywhere.

**First-touch attribution, 90-day HttpOnly cookie, set only when absent.**
Last-touch is documented as the alternative and not shipped. Code lookups
are rate-limited per hashed IP in memory (one instance); a shared limiter
is a Phase 7 concern.

**Portals and the admin dashboard are Phase 5 work.** They are interface,
they meet the full interface standard, and building them before the design
system exists would put design values outside `desert-peak-brand/dist`.
Phase 4 ships the routes the portals need (`/r/{code}`, opt-in response)
and reserves `/partners/` and `/partners/portal/`.

**Ledger reversals say what they reverse.** `reversesType` distinguishes
voiding an earned reward from clawing back an issued one, so liability and
annual totals stay correct in both directions.

## Phase 5

**The frontend is server components; client JavaScript exists on four
surfaces only.** Forms (a `useActionState` wrapper so a validation error
re-renders in place with the typed values; without JavaScript the same form
posts natively and the server action re-renders the page), the quote flow
(same pattern), the referral form, and a 1 KB vitals beacon loaded after
idle. Content routes ship the framework runtime and nothing else. The
runtime itself is the floor the budget can reach; the measured number is in
`BUILD-REPORT.md`.

**Navigation is `<details>`.** The product and location menus and the phone
menu are native disclosures, so they open without JavaScript and the URL is
the state everywhere else (tabs are links).

**Indexability is structural, not editorial.** A route is indexable only
when its document is `reviewed`, its wave is 1, it is not a utility route,
and (for city pages) every `CityFacts` field is filled. `noindex` is written
by `pageMetadata` from those facts; the sitemap reads the same manifest.
Consequence: until a licensed person reviews documents, the sitemap holds
only the four state hubs. That is the point.

**Titles are absolute.** The layout template's "— Desert Peak Insurance"
suffix pushed most titles past 60 characters; `pageMetadata` sets
`title.absolute`, and only the home title names the brand.

**Glossary `h1`s read "Term, defined".** Seven glossary terms share a name
with a product (term life, whole life, …); the suffix keeps every `h1` and
`<title>` unique across the route set without inventing a different word.

**The redirect map is served by `proxy.ts`.** A page component cannot emit
a 301 or a 410 with the right status, so the one piece of edge logic on the
site reads the Redirects collection through the public REST endpoint, caches
it per instance for ten minutes, and answers with real codes. `next.config`
carries no redirects.

**Metric-compatible font fallbacks are generated, not typed.**
`scripts/font-fallbacks.mts` computes `size-adjust` and the ascent, descent
and line-gap overrides from `@capsizecss/metrics` for Arial and Georgia
against Archivo and Source Serif 4, so the swap does not shift layout. Two
files load on a page without italics; the italic faces are declared and
fetched only when italic text renders.

**Fonts are subset to the axis ranges the site renders; the body face is
`font-display: optional`.** The brand files are Latin subsets already, but
each carries its full variable axes (Archivo width 62–125 %, weight 100–900;
Source Serif 4 optical size 8–60, weight 200–900). The tokens use width
100–112 % and weights 400–700, so `scripts/font-subset.mts` cuts
`public/fonts/` to those ranges (Archivo 91 → 50 KB, Source Serif 4 193 →
133 KB; deterministic, same glyph outlines, OFL 1.1 permits it). The serif's
optical-size axis is kept whole: clamping it to body sizes changed glyph
widths in the display specimen and at print sizes, which the visual baseline
caught. Archivo, the face of every `h1`, is preloaded and swaps
in. The serif is `optional`: on a first uncached visit Chrome uses it only if
it arrives within the block period, otherwise the page keeps the
metric-matched Georgia fallback and caches the font for the next navigation.
Measured on the coverage template, the largest paint was waiting on the serif
(render delay 3.8 s of a 4.2 s LCP on simulated Slow 4G, because the serif
shared bandwidth with the framework runtime). Trade-off recorded: first-visit
body copy may render in the fallback. Reversal is one word in `fonts.css`.

**Lighthouse: accessibility and best practices at 100, SEO audit by
audit, performance with a regression floor of 70 and the unmet timing
budgets as warnings.** The 100/100/100/100 floor is not met for performance
(measured 92–96, median 95, on 22 templates; LCP 2.6–3.0 s
against the 1.8 s target) and the numbers are in
`BUILD-REPORT.md`. The gap is
structural: the framework runtime on a content page is ~145 KB gzipped
against the 60 KB target, and on simulated Slow 4G with 4× CPU throttling
first paint lands near 2 s before any font or script choice. The
per-route-group budgets in `PERFORMANCE-BUDGET.json` are enforced through
Lighthouse CI's assertion matrix because Lighthouse 12 removed its budget
audits; the LCP budget row (1.8 s) fails today and is kept as the target,
not relaxed. The SEO category is asserted by its individual audits because
`is-crawlable` (4/13 of the score) fails on every non-production host by
design; `verify:seo` covers indexability. Reaching 100 on performance means
removing the runtime from content routes (a static export of the content
tree, or partial hydration), which is a framework decision to raise with the
client, not a tuning task.

**Save-and-resume for the quote flow is server-side.** A `quote-sessions`
row keyed by an httpOnly cookie, seven-day expiry, purged by `leads:purge`.
A cookie of the answers themselves would hit the 4 KB limit on a two-vehicle
household and would carry regulated data in the browser.

**A missing Turnstile token does not lose a lead.** Without JavaScript there
is no token; the lead is saved with the bot-check result recorded and a
review note, because a lost lead costs more than a reviewed one. Referral
submissions are fraud-sensitive and are rejected instead, with a reason.

**Customer referrers sign in with a Supabase magic link (Project A); partners
sign in with a Payload account.** Two tracks, two auth systems, on purpose:
a client should never need a password, and a partner is a `Users` row the
office manages with a role.

**Spanish is a raised decision, not an assumption.** Strings are plain React;
a locale layer touches components, not routes.

### Shell and homepage redesign (client brief, 2026-09-13)

**The hero is brand-brown with a cream advisor panel on the right.** The
guide reserves large brand fills for the home hero and the footer band, and
the brief keeps the hero and the closing band as the page's only two
full-bleed brand blocks. The right column carries the advisor panel over a
faint strata device, so no breakpoint leaves dead area: on phones the panel
stacks under the CTAs at full width.

**The watermark is drawn from the mark's geometry, not from the logo file.**
BRAND-GUIDE §6 forbids using the mark as a background; the brief asks for the
legacy monogram device rebuilt from the Strata geometry. `StrataWatermark`
draws bands cut by one fault with the right block up-thrown, at 15 %
opacity, `aria-hidden`; it is a diagram in the illustration style (§8), and
the logo files stay untouched.

**Logos are the shipped files.** Header and footer render
`/brand/logo-horizontal.svg` and `/brand/logo-reversed.svg` as `<img>`
(byte-identical copies of `desert-peak-brand/brand/logos`), 40 px tall on
desktop, 32 on phones, the mark alone under 360 px, one band period of clear
space. The React lockup that re-typeset the wordmark is gone. The favicon is
the brand's reversed profile mark (`social/profile/profile-reversed-1200.svg`,
the mark in cream on the brand fill; client choice 2026-09-14), copied as
shipped; the ICO and PNG icons are resizes of the brand's PNG render of it,
and the manifest is the brand package's.

**No middle dots, no uppercase eyebrow.** The brief's trust line and eyebrow
are written with middle dots; the interface standard lists dotted meta
strings and tracked eyebrows as tells. The three facts render as a list with
spacing between items, and the eyebrow is a sentence in small sans
("Independent insurance agency in Arizona, Nevada, Utah and Idaho"). Same
facts, no tell.

**The carrier strip states the legacy claim, on the client's instruction.**
"Appointed with 40+ carriers" and the five names come from the legacy site
and render from `SiteSettings.carriers`, as the brief directs. The brand
guide's rule against unconfirmed carrier appointments still governs the
`Carriers` collection and `/carriers/`, which list only confirmed
appointments; the strip is the office's statement and the office can edit
it. Logos wait for licensed files (TODO-CLIENT-DATA.md #16).

**The Medicare disclaimer is on every page, verbatim from the legacy
footer.** Medicare is in scope, so the TPMO text belongs to the shell, not
to Medicare pages alone. The seed fills `medicareTpmoDisclaimer` with the
legacy wording until the client supplies the plan-year text
(TODO-CLIENT-DATA.md #11); `verify:compliance` checks the block and the
exact text on every route. Product pages keep their inline copy as well.

**Recognition transfers, credited precisely and dated.** The client
confirmed the Circle of Champions PY2025 transfer, which closes the brand
guide's caution (§7) for this one item. The section names the producer, the
awarding carrier and the plan year, and the images are re-encoded
(`pnpm certificates`) to AVIF and WebP with explicit dimensions and alt text.

**Testimonials are gated by one checkbox.** `SiteSettings.testimonialConsentConfirmed`
is false; the section and its component exist and render nothing until it
is true and every row carries a consent date. No legacy quote is seeded,
because `site-settings` is publicly readable and unconsented words must not
be in the database either.

**The homepage FAQ reads the product FAQ fields.** Two questions exist (the
legacy homepage's, moved to life and health insurance); the brief asks for
four to six. The section renders what exists and grows as product FAQs are
drafted and reviewed (TODO-CLIENT-DATA.md #17). Nothing was written to make
the count.

**The phone number shows from 1280 px, not 1024.** The brief asks for the
number at ≥ 1024 px. At 1024 the bar holds the 40 px lockup, five nav
entries, the phone, search and the CTA in 960 px only by wrapping labels,
which the first after-screenshots showed. The number appears at 1280 and
the icon (with a screen-reader label) below that; the nav collapses into the
drawer under 1024 px so tablets get the drawer rather than a cramped bar.

**Payload's client-hint header is scoped to the admin.** `withPayload` sets
`Accept-CH` and `Critical-CH: Sec-CH-Prefers-Color-Scheme` on every route so
the admin can follow the OS colour scheme. Chrome answers a Critical-CH it
did not send by restarting the navigation, which Lighthouse recorded as a
307 to the same URL on all 22 templates, about 600 ms on Slow 4G, on every
cold visit. `next.config.ts` rewrites that header entry's source to
`/admin/:path*`; the public site never sends it.

**Search is a link that becomes a dialog.** Without JavaScript the icon goes
to `/search/`; with it, the native `<dialog>` opens (⌘K / Ctrl-K), which
gives focus trapping, Escape and the backdrop for free. The drawer is a
`<details>` for the same reason; JavaScript adds scroll lock, a focus trap
and close-on-route-change.

**One OG image per route, resolved from the path.** `/og/{path}image.png`
looks the route up (product, state, city, article, term, page) and renders
the brand's OG template with `next/og` from the document's own title, so
the request carries no text and nobody can put words on the brand template.
Medicare routes get the TPMO band, as the brand's template does.
`verify:seo` requires the tag on every route and fetches one image per
route group.

**The production origin is exact.** `NEXT_PUBLIC_SITE_URL` must be
`https://www.desertpeakinsurance.com` when `APP_ENV` is production;
canonical, OG `url`, JSON-LD and the sitemap all derive from it. The email
`daniel@desertpeakinsurance.com` replaces the legacy address; that is the
one non-empty value the seed overwrites, and only that exact string.

## Phase 6

**Tags, never paths.** `src/hooks/revalidate.ts` maps every collection to
its tags; `src/lib/content.ts` caches every read under the same tags with
`unstable_cache`. A product edit invalidates `product:{slug}` plus the
`products` list; a state edit also invalidates `cities`; a compliance edit
invalidates every content tag. `pnpm test:revalidate` proves the fan-out
against the running site.

**Prerender wave 1, ISR the rest.** `generateStaticParams` returns the wave-1
insurance routes (hubs, state hubs, top-30 city pages) and the reviewed
wave-1 articles and terms; everything else renders on first request with
`dynamicParams` and stays cached until a tag changes. The measured build:
see `BUILD-REPORT.md`. Portals, the quote flow and search are
`force-dynamic`.

## Phase 7

**Local on Docker, preview on a Supabase branch, production migrations in
CI before deploy.** `.github/workflows/ci.yml` runs the Definition of done
against a Postgres 17 service with `.env.test`, then `deploy-migrations`
applies committed migrations over the direct connection on `main` before
Vercel builds. `nightly.yml` purges expired leads and quote sessions and
takes a logical dump of `payload_cms`; the upload target needs a backup
bucket secret the client has not created yet.

**Secrets live in the deployment environment only.** `.env` is ignored;
`.env.example` and `.env.test` hold nothing secret; CI references
`secrets.*` by the same names.

**Error reporting is optional and scrubbed.** `ERROR_REPORTING_DSN` is
unset; when a provider is chosen, the scrubber in `src/lib/email.ts`'s
sibling (to be added with the SDK) must strip lead data before the first
event ships. Nothing in the codebase logs a lead's fields today.

**PITR is a plan-tier setting on Supabase, not a repo artifact.** Recorded
here as a go-live check alongside the Turnstile keys.

## Brand: Daniel's badge (2026-09-15)

**The logo is Daniel's badge with the brand wordmark.** `public/brand` now
holds byte-identical copies of `desert-peak-brand/brand/logo/daniel-refined/web`:
`logo-horizontal.svg` (342.51 × 69), `logo-reversed.svg`, `logo-mono.svg`,
`logo-stacked.svg` and `logo-stacked-reversed.svg` (250.12 × 270). The badge
alone (`mark.svg`, `mark-reversed.svg`, 400 × 400) is the lockup's own badge
group lifted out unchanged, ring stroke 8, so the header under 360 px and the
OG template show the same drawing as the lockup. `wordmark.svg` is unchanged:
the new lockup sets the same outlined Archivo paths. The Strata lockups are
gone from `public/brand`.

**The site's colours are the badge's.** Wiring in `logo-tokens.css` alone changed nothing, because the brand had recoloured Daniel's badge onto its old Strata palette and the logo tokens were aliases of those old colours. `desert-peak-brand/brand/design-tokens.json` is now v2: neutrals run from warm paper into the badge's navy (`ink` #1E293B, `ink-muted` #44576C, `surface` #FBF6F2, `surface-inverse` #0C1421), `brand` is the badge's navy (#243858, links and buttons, a step lighter than ink; the concept's rust INSURANCE line is not in the web lockup, so rust is not on the site), `positive` is sage (mid sage #698E6E for the saguaro and icons, fir-leaning #2C5041 for state text so the colour-vision gate passes). The semantic aliases did not move, so no component changed; `tokens.css`, `theme.css`, `tokens.ts`, the OG images and the badge lockups all pick the palette up from the one file. `@desert-peak/brand/logo-tokens.css` is imported after `theme.css`; the Tailwind names `logo-ring`, `logo-peak`, `logo-peak-far`, `logo-snow`, `logo-cactus`, `logo-wordmark`, `logo-wordmark-accent`, `logo-ground` and `logo-ground-inverse` exist for the places a page echoes the logo: the header sits on `bg-logo-ground`, the footer on `bg-logo-ground-inverse`. The header lockup is one `<img>` whose height comes from `--dp-logo-header-mobile` and `--dp-logo-header-desktop` (40 px, 48 px from 768 px; the bar grew to 80 px on desktop, 64 once scrolled, so the lockup keeps 16 px of air), the badge alone at 40 px under 360 px, and the footer's reversed lockup is 56 px (client asked for larger logos top and bottom, 2026-09-15). `logo-cactus` is the mid sage, a 3:1 graphic: icons and one accent per view, never text, never a button fill.

**The favicon is the badge itself, redrawn for the size.** Daniel's badge does not survive 16 px as drawn (the ring is under a pixel, the saguaro a smudge), so `public/favicon.svg` and the 16 and 32 px ICO entries are the same five elements on a coarser grid: ring 28 wide, peak inside the ring, three snow teeth, saguaro 36 wide, all in the badge's own tokens. From 48 px (ICO 48, apple icon, 192, 512, maskable at 68 %) it is the lockup's badge with the ring at 12 on a paper tile. The manifest's theme and background colours are `ink` and `surface`.

**Open Graph images are the stacked logo split across the card.** `src/lib/og.tsx` sets the outlined wordmark top-left of a 760 px text column (kicker, title, rule, domain) and the badge at 280 px on the right, vertically centred, on `surface`; the Medicare TPMO band stays below. Every route that calls `pageMetadata()` renders its own image at `/og/{path}image.png`; the root layout now declares `/og/image.png` as the default so no page ships without one.

