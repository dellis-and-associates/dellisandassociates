# Inputs inventory — Phase 0

Generated 2026-09-12 against commit `998175b` plus the untracked `desert-peak-brand/`, `desert-peak-insurance-sitemap/` and `inputs/` folders. Facts only; every claim below was checked by reading the file or fetching the URL named.

## Verdict

| Input | Exists | Stage reached | Unblocks |
|---|---|---|---|
| `desert-peak-insurance-sitemap/` (6 files) | yes | complete, 1,028 URLs, self-consistent | Phases 1–4 and 6 (data model, seed, routes) |
| `desert-peak-brand/` | yes | **complete through dist**: tokens, `dist/*`, logos, fonts, guide, contrast gate | Phase 5 |
| `inputs/legacy-crawl.json` | yes | 28 URLs crawled 2026-09-12 11:58 UTC | `LEGACY-FEATURE-PARITY.md`, Phase 3 redirects |
| `.env` / `.env.example` | yes | template from another project; see Environment contract | Phase 1 after fixes below |
| `RECONCILIATION.md` (Phase 0.B scope decision) | yes (2026-09-12, decision B) | decided | Phase 1 (done), Phase 2 |
| `desert-peak-page-generation-prompt.md` | **still no** (re-checked after Phase 1; not in repo, not on this machine) | — | Phases 2, 3 and the uniqueness gate reference it |
| `desert-peak-interface-standard-prompt.md` | **still no** (re-checked after Phase 1) | — | Phase 5 says "read that file in full"; it cannot be read |

**Phase 0 exit met; Phase 1 complete (2026-09-12).** The scope conflict is
decided (B). The two companion documents that Phases 2, 3 and 5 defer to are
still not present; Phase 2 is gated on `desert-peak-page-generation-prompt.md`.

---

## 1. Sitemap package (`./desert-peak-insurance-sitemap/`)

Generated 2026-09-09. Placeholder domain `https://www.desertpeakinsurance.com`.

| File | Bytes | Content |
|---|---|---|
| `site-architecture.xml` | 6,022 | IA as a tree of templates with URL patterns; 15 sections; `totalPages="1028"` |
| `data-products.xml` | 3,161 | 29 products: 10 Tier 1, 19 Tier 2; 13 Personal, 16 Commercial |
| `data-locations.xml` | 1,984 | 4 states (AZ 14 cities, NV 8, UT 8, ID 8) = 38 cities |
| `full-sitemap.xml` | 220,736 | 1,028 `<loc>` entries, all with lastmod/changefreq/priority; zero duplicates |
| `page-count-report.txt` | 1,125 | Section counts summing to 1,028 |
| `README-for-developer.md` | 5,395 | Tiering rationale, canonical/noindex advice, placeholder list |

Route distribution as shipped (from `full-sitemap.xml`): `/insurance/*` 548,
`/resources/*` 408 (guides 30, state-requirements 12, compare 52, how-to 52,
life-events 20, seasonal 20, glossary 221, hub 1), `/agents/*` 31, `/carriers/*`
16, `/legal/*` 9, `/claims/*` 4, `/billing/*` 2, `/about/*` 2, and 8 single core
pages.

### The six corrections (from the page-generation prompt, Phase 0.A) — status

The page-generation prompt is missing, so the corrections are applied from the
description in the master build document. Each was verified against the files:

| # | Correction | Verified in the package | Action at seed time |
|---|---|---|---|
| 1 | Deduplicated BOP slug | Confirmed: `business-owners-policy-business-owners-policy` appears on 41 URLs (hub, coverage, discounts-faq, 38 cities) | Seed as `business-owners-policy`; add 41 redirects from the doubled slug |
| 2 | 40 added Tier-1 product × state hubs | Confirmed absent: no `/insurance/{tier1}/{state}/` URLs exist; only Tier 2 has state-level pages | Add 10 × 4 = 40 routes |
| 3 | Normalized apostrophe slugs | Already clean: `workers-compensation-insurance`, `coeur-d-alene`, `st-george`; zero `%`, `'`, uppercase or `--` in any URL | None; keep as a test assertion |
| 4 | Placeholder agents excluded | Confirmed: 30 invented names (`james-alvarez`, `maria-chen`, …) | Exclude; `Agents` seeded empty |
| 5 | Placeholder carriers excluded | Confirmed: `carrier-partner-1` … `carrier-partner-15` | Exclude; `Carriers` seeded empty |
| 6 | Sitemap treated as a test fixture | — | `full-sitemap.xml` becomes a fixture: generated sitemap must equal fixture ∪ 40 hubs − 45 placeholders − 41 doubled-BOP, modulo slug fix |

Corrected plan before reconciliation: 1,028 + 40 = 1,068 routes. After
`RECONCILIATION.md` decision B (+7 products × 7 routes): **1,117 routes, 1,072
buildable now, 45 blocked** on a real agent roster and carrier appointment list.
`pnpm verify:data` computes these from the XML and fails if they drift.

### Scope conflict (Phase 0.B) — **unanswered**

The sitemap is a property-and-casualty site: auto, home, renters, life, general
liability, workers' compensation, commercial auto, motorcycle, umbrella, BOP, plus
19 specialty lines. **The production site is a life, Medicare, health and annuity
advisory** (see §3). Of the eight coverage lines the production site sells, only
"Life Insurance" exists in the 29-product list. Medicare, health, dental & vision,
annuities, whole life, term life and IUL have no route in the IA. The medication
intake form on the production site exists only because Medicare Part D is in scope
today.

**Decided 2026-09-12: option B** (`RECONCILIATION.md`). Every line sold today is
added as a Tier-2 product; `medicare_in_scope: yes`; licensed states AZ, NV, UT,
ID with the legacy "UT + 12 states" claim parked in `TODO-CLIENT-DATA.md`.

---

## 2. Brand package (`./desert-peak-brand/`)

Stage reached: **complete**. Direction 1 "Strata" was chosen by the client
(`brand/DECISIONS.md`, "Chosen by the client from CONCEPTS.md"). Everything
Phase 5 consumes exists:

| Artifact | Present | Notes |
|---|---|---|
| `brand/design-tokens.json` | yes, 28,301 B | W3C Design Tokens format, OKLCH source, hex in `$extensions`; v1.0.0 |
| `brand/dist/tokens.css` | yes, 11,722 B | `--dp-*` custom properties; `[data-theme="dark"]` wired, empty |
| `brand/dist/theme.css` | yes, 5,482 B | Tailwind v4 `@theme`; **removes the default palette** |
| `brand/dist/tailwind-preset.ts` | yes, 6,575 B | v3-style preset, usable via `@config` |
| `brand/dist/tokens.ts` | yes, 17,733 B | typed export for components and admin theming |
| `brand/dist/fonts.css` | yes, 1,001 B | `@font-face` for 4 self-hosted variable WOFF2 files (Archivo, Source Serif 4) |
| `brand/logos/` | yes | `mark.svg`, `wordmark.svg`, `logo-horizontal.svg`, `logo-stacked.svg`, `logo-mono.svg`, `logo-reversed.svg`, `favicon.svg`, PNG icons 32/180/192/512 |
| `brand/BRAND-GUIDE.md`, `DECISIONS.md`, `CONTRAST-REPORT.md`, `LICENSES.md`, `LOGO-TESTS.md` | yes | guide + rationale + WCAG 2.2 / colour-vision gate output |
| `brand/brand-sheet.html` | yes | client approval sheet |
| Package | `@desert-peak/brand` v1.0.0 | exports `./tokens`, `./tailwind-preset`, `./tokens.css`, `./theme.css`, `./fonts.css`, `./design-tokens.json`; Node ≥ 22.6, zero deps |

Consumption plan for Phase 5: install the folder as a workspace package;
`globals.css` imports `fonts.css`, `tokens.css`, `theme.css`; `verify:tokens`
fails on any hex, arbitrary Tailwind value or one-off spacing outside
`desert-peak-brand/`. Deliberate gaps recorded by the brand author: no dark
values, no `size-adjust` fallback fonts (Phase 5 must add them for the CLS
target), no tagline, no wordmark without "INSURANCE".

The brand's `CONCEPTS.md` header still says "STOPPED AT THE STAGE 1 GATE"; the
README marks that file as archive. The dist outputs are authoritative.

---

## 3. Legacy site (`https://www.dellisandassociates.com`)

Crawl: `inputs/legacy-crawl.json`, 28 URLs, 2026-09-12T11:58:48Z. Live
spot-check of `/` and `/contact-us` on 2026-09-12 matched the crawl.

**The production site is not WordPress.** It is the Ellis & Associates Next.js
build from this repo, deployed on Vercel (`server: Vercel`, `/_next/static/`
chunks, `x-vercel-cache: HIT`). `/wp-admin` and `/wp-login.php` return 403;
`/dental-and-vision-insurance-2` and `/medicare-insurance-prescription-drug-form-2`
308-redirect to their clean slugs, which are the only WordPress-era remnants.
`/robots.txt` and `/sitemap.xml` are 404.

| Page | Status | Function |
|---|---|---|
| `/` | 200 | Home: hero, services overview, 2 FAQ accordions, testimonials, Circle of Champions PY2025 gallery (2 JPGs), CTA band |
| `/about-us`, `/insurance-services`, `/resources`, `/work-with-us` | 200 | Static |
| `/life-insurance`, `/whole-life-insurance`, `/term-life-insurance`, `/iul`, `/annuities`, `/medicare`, `/health-insurance`, `/dental-and-vision-insurance` | 200 | 8 coverage pages, each with "Get a quote" CTA and carrier bar |
| `/contact-us` | 200 | "Book a policy review" form, 5 fields, **mailto submit** (no server handler) |
| `/new-client-intake-form` | 200 | 17-field intake incl. DOB and address, mailto submit |
| `/medication-intake-form` | 200 | 22-field medication list incl. DOB, pharmacy, allergies, mailto submit |
| `/agents-resource`, `/agent-training` | 200 | Login gate; **form has no handler** (UI only) |
| 5 legacy paths | 308/403/404 | See redirects in `LEGACY-FEATURE-PARITY.md` |

Global: `tel:8013009980` in header and footer on every page; `mailto:` to the
office address in the footer; Facebook and Instagram links; Medicare disclaimer
in the footer on every page. Zero external scripts, zero iframes, zero inline
analytics hints, no cookie banner, no chat widget (`THIRD-PARTY.md`).

Feature rows: `LEGACY-FEATURE-PARITY.md` (26 rows).

---

## 4. Environment contract (`.env`, `.env.example`)

Read both files. Findings, in order of severity:

1. **Project A and Project B are the same Supabase project — by decision
   (2026-09-12).** Every reference in `.env` uses project ref
   `xmcsjinhhdvyyfqwambp`. Schema isolation applies: Payload in `payload_cms`
   (RLS off, not exposed to PostgREST), app data in `public` (RLS on). Recorded
   in `DECISIONS.md`, enforced by `pnpm test:rls`.
2. **Live credentials are present in `.env`** (database password, service-role
   JWT, Resend key, S3 keys). `.env` is git-ignored and untracked, which is
   correct. The Resend key and `EMAIL_FROM=info@silverstarmachines.com` belong to
   a different client's account and must not send Desert Peak mail. Rotate before
   Phase 2 wires Resend.
3. **`.env.example` was git-ignored** by the `.env*` pattern, so it could never be
   committed. Fixed: `.gitignore` now has `!.env.example`.
4. `S3_REGION` was `us-west-2`; the project is in `us-east-2`. Verified by
   signing a ListObjects request against both (west fails with
   SignatureDoesNotMatch). Corrected in `.env` during Phase 1.
5. A stray `DB_PASSWORD` line sits above the header in `.env`; nothing reads it.
   Not carried into the template.
6. Missing keys, now added to `.env.example` and `src/env.ts`:
   `PAYLOAD_DATABASE_URI_DIRECT`, `REFERRAL_COOKIE_DAYS`, `DEFAULT_TENANT_ID`,
   `REFERRAL_HASH_SALT`, `RUM_ENDPOINT`, `RUM_WRITE_KEY`, `ERROR_REPORTING_DSN`.
7. Header renamed from "Silver Star Vending" to Desert Peak Insurance; the
   sender-domain comment no longer names another client.

`src/env.ts` is the only reader of `process.env`; `src/env.public.ts` is the
browser-safe subset. `pnpm verify:env` (also `npm run verify:env`) checks: every
schema key is in `.env.example` and vice versa; no `process.env` outside the two
env files; no `"use client"` file imports the server env; Turnstile test keys are
refused under `NODE_ENV=production`; required keys present in the local `.env`.

---

## 5. Repo state that the build must reconcile

- Package manager is **npm** (`package-lock.json`, 258 KB); the build variables
  say pnpm 10.22 is installed. Phase 1 switches to pnpm and deletes the lockfile.
- The existing app is the Ellis & Associates scaffold (`app/`, `components/`,
  `lib/`) with Tailwind v4 and shadcn/radix. It is the current production site.
  It carries the legacy features listed in `LEGACY-FEATURE-PARITY.md`; the Desert
  Peak build replaces it in place, so parity is a diff against this code.
- `rebrand-files/` holds the Ellis brand assets. Not an input to this build; do
  not consume.
- Node 24.18.1, pnpm 10.22.0, Docker 29.8.0, psql present.

## 6. What a human must supply before Phase 2

1. `desert-peak-page-generation-prompt.md` and
   `desert-peak-interface-standard-prompt.md`, committed to the repo root. They
   were announced as present on 2026-09-12 but are not in the repo or on this
   machine. Phase 2 collection shapes (`reviewStatus`, `indexWave`, article and
   glossary fields, the uniqueness gate) are specified there.
2. Everything in `TODO-CLIENT-DATA.md` stays open; none of it blocks Phase 2.
