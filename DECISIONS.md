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
