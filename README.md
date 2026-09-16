# Desert Peak Insurance — site and content platform

Next.js 16 (App Router) + Payload 3 in one app, Postgres on Supabase, media on
Supabase Storage. The build follows the phased master prompt; decisions and
evidence live in the root `*.md` files (`DECISIONS.md` first).

## Run it

```
pnpm install
cp .env.example .env.local          # fill in values; see comments
pnpm db:up                          # local Postgres 17 in Docker (port 54329)
pnpm migrate                        # applies committed migrations (direct/session connection)
pnpm dev                            # http://localhost:3000, admin at /admin
```

Against the Docker database, Payload's push mode is on and schema changes apply
live. Against Supabase it is off: change the config, then
`pnpm migrate:create <name>`, review the file, commit it, and `pnpm migrate`.

## Checks

| Command | What it proves |
|---|---|
| `pnpm verify:env` | `.env.example` ⇔ `src/env.ts`; no stray `process.env`; production refuses Turnstile test keys |
| `pnpm verify:data` | sitemap data files are well-formed; prints the route plan (1,117 / 1,072 / 45) |
| `pnpm migrate:check` | committed migrations fully describe the Payload config |
| `pnpm test:db` | 50 concurrent queries through the transaction pooler, raw and via Payload |
| `pnpm test:rls` | RLS off in `payload_cms`, on in `public`; `payload_cms` not exposed to PostgREST |
| `pnpm test:media` | upload → public read → delete through the S3 adapter |
| `pnpm test` | unit suites: slug normalizer fixtures, reserved-slug guard over the data files |
| `pnpm test:access` | role × collection × operation matrix (300 cases) plus field-level locks, on a throwaway Docker database |
| `pnpm verify:glossary` | no reviewed glossary term is an orphan; no self-links |
| `pnpm test:referrals` | engine invariants: no bound→reward path, null rule refusal, consent gate, one opt-in message, fraud reasons, append-only ledger |
| `pnpm test:tenancy` | two-tenant isolation fixture |
| `pnpm leads:purge --dry-run` | leads past their retention date (counts only) |
| `pnpm import:package` | regenerates `src/seed-data/*.json` from the sitemap package |
| `pnpm seed --dry-run` | reconciliation table (created / updated / skipped / conflicts per collection); `pnpm seed` applies, filling empties only |
| `pnpm verify:urls` · `verify:sitemaps` · `verify:schema` · `verify:og` · `verify:links` | the SEO contract: canonical and redirect rules, the sitemap index, JSON-LD, share cards (previews into `OG-PREVIEWS/`), and the internal link graph |
| `pnpm review:stale` · `pnpm rum:report` | content past its twelve-month review, and Core Web Vitals p75 per path from the site's own beacons |
| `pnpm verify:tokens` | zero hardcoded design values in app/, src/, packages/ |
| `pnpm verify:routes` · `verify:seo` · `verify:redirects` · `verify:compliance` · `verify:uniqueness` · `verify:parity` | the site-level gates, against the running build |
| `pnpm fonts:subset` · `fonts:fallbacks` | regenerate `public/fonts/` from the brand package (axis-range subsets) and the metric-matched fallback faces |
| `pnpm test:a11y` · `test:visual` · `test:nojs` · `test:quote-flow` · `lhci` | Playwright and Lighthouse CI against the running build (`pnpm build && pnpm start`) |
| `pnpm test:revalidate` | a product edit fans out to dependent routes by tag |
| `pnpm generate:content --collection=glossary-terms --batch=12` | writes authored drafts (`scripts/lib/drafts/`) into the shells, resumable |
| `pnpm ux:audit --base=<url>` | throttled screenshots + axe per template into `docs/ux-audit/` |
| `pnpm shell:shots --label=before\|after` | header, hero and footer screenshots at four widths into `docs/ux-audit/shell/` |
| `pnpm certificates` | re-encode the recognition images to AVIF/WebP with a dimensions manifest |
| `pnpm typecheck && pnpm lint && pnpm build` | the usual |

## Layout

```
app/(frontend)/   public site: templates in src/components/templates, design system in src/components/ui, gallery at /design-system
proxy.ts          the redirect map (301/410) from the Redirects collection
app/(payload)/    Payload admin + REST/GraphQL routes (generated, do not edit)
src/payload.config.ts, src/collections/, src/globals/, src/migrations/
src/access/         access rules (one per intent); src/fields/ shared field factories; src/lib/ slug + roles
tests/unit/         pure tests; tests/access/ the matrix contract and its suite
src/env.ts        the only reader of process.env (src/env.public.ts for the browser)
scripts/          the checks above
packages/referrals/ the referral engine (Payload plugin, tenant-aware); REFERRAL-COMPLIANCE.md says what counsel must supply
desert-peak-brand/            design tokens, the only source of design values
desert-peak-insurance-sitemap/ IA and data files; full-sitemap.xml is a test fixture
```

