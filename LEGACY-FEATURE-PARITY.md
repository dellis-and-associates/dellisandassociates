# Legacy feature parity

Source: `inputs/legacy-crawl.json` (28 URLs, 2026-09-12) plus a manual walk of
`https://www.dellisandassociates.com` as a user on 2026-09-12: every header and
footer link followed, every CTA clicked, every form opened. The production site is
the Next.js scaffold in this repo (`app/`, `components/`, `lib/`), deployed on
Vercel, so field lists were confirmed against source as well as rendered HTML.

Status vocabulary: `exists` · `planned` · `missing` · `deliberately dropped`
(needs a reason and a human's initials). Re-run after Phase 5; this file is a
Definition-of-done artifact and `pnpm verify:parity` fails on any `missing` row.

| # | Feature | Where on legacy | Status in new build | Owning phase | Notes |
|---|---|---|---|---|---|
| 1 | Global header: logo, Services menu (8 lines), About, Work with us, Resources, phone, primary CTA | Every page, `components/Header.tsx` | exists | 5 | `src/components/site/header.tsx`: products and locations menus as native `<details>`, Resources, Claims, search, phone, primary action. Works without JavaScript. |
| 2 | Mobile navigation sheet with the same links and CTAs | Every page, < 1024 px | exists | 5 | Same header: a `<details>` menu below 768 px with every top-level link. |
| 3 | Click-to-call `tel:8013009980` in header and footer on every page | Every page | exists | 5 | `tel:` link in the header (icon + number) and footer on every page, 44 px target; number from `SiteSettings` (legacy value, confirmation still owed). |
| 4 | `mailto:` office email in footer | Every page | exists | 5 | Footer `mailto:` from `SiteSettings`. |
| 5 | "Book a policy review" contact form: Name*, Phone*, Email, Interest (select: full policy review / each service / working as an agent), Message | `/contact-us` | exists | 5 | `/contact/` renders the seeded `book-a-policy-review` form (exact legacy fields) through a server action; Lead saved, Resend notification with form name and timestamp only, Turnstile with a no-JS fallback. |
| 6 | Confirmation state after submit ("Your email draft has been opened…") | `/contact-us`, both intake forms | exists | 5 | `/contact/thanks/` shows the reference; the quote flow has `/quote/done/`. |
| 7 | New client intake form: Name*, DOB, Phone*, Email, Address, 8 "Interested:" checkboxes, Household size, Current coverage, Notes | `/new-client-intake-form` | exists | 5 | `/forms/new-client-intake/` (utility, noindex) with the exact legacy fields; PII rules on the Lead. |
| 8 | Client medication intake form: Name*, DOB, Phone*, Pharmacy, 5 × (medication, dosage, frequency), Allergies, Notes | `/medication-intake-form` | exists | 5 | `/forms/medication-intake/` (utility, noindex); every lead from it is health-flagged from the form definition, 12-month retention, admin-only raw data. |
| 9 | Legacy redirect `/medicare-insurance-prescription-drug-form-2` → `/medication-intake-form` | 308 | exists | 5 | Seeded in Redirects; served with a 301 by `proxy.ts`. |
| 10 | Legacy redirect `/dental-and-vision-insurance-2` → `/dental-and-vision-insurance` | 308 | exists | 5 | Seeded in Redirects → `/insurance/dental-and-vision-insurance/` (final target, no chain). |
| 11 | Services hub page with one entry per line | `/insurance-services` | exists | 5 | `/insurance/` lists every line by category; `/insurance-services/` 301s to it. |
| 12 | Coverage detail page per line, each with "Get a quote" CTA: life, whole life, term life, IUL, annuities, Medicare, health, dental & vision | `/life-insurance` … `/dental-and-vision-insurance` | exists | 5 | All eight lines are products with hub, coverage and third subpages and four state pages each; each legacy URL 301s to its hub (e.g. `/iul/` → `/insurance/indexed-universal-life-insurance/`). |
| 13 | Carrier bar (Mutual of Omaha, UnitedHealthcare, Aetna, Humana, Cigna) on coverage pages | Coverage pages, `components/Sections.tsx` | exists | 5 | `/carriers/` renders from the `Carriers` collection; empty-but-honest until appointments under the new entity are confirmed. No name is shown without a confirmed appointment date. |
| 14 | FAQ accordion (2 instances) | `/` | exists | 5 | `Accordion` (native `<details>`) on product FAQ subpages and Pages `faq` blocks; `/faq/` page shell seeded. |
| 15 | Client testimonials ("What people tell us") | `/` | planned — pending client consent | 5 | `LocationOverrides.testimonial` renders only with `consentOnFile`; `/reviews/` page shell seeded; nothing renders until consent exists (verify:compliance asserts it). |
| 16 | Circle of Champions PY2025 certificate and appreciation letter gallery (2 JPGs with alt text) | `/`, `public/certificates/` | planned — pending client consent | 5 | No gallery renders; the two JPGs remain in `public/certificates/` for the client's decision. |
| 17 | "Work with us" recruiting page with CTAs to contact and to agent training | `/work-with-us` | exists | 5 | `/partners/` (public recruiting page); `/work-with-us/` 301s to it. |
| 18 | "Agents resource" gated area | `/agents-resource` | exists | 5 | `/partners/portal/` gated by the `partner` role: code, share, referrals, rewards, refer form. `/agents-resource/` 301s to it. |
| 19 | "Agent training" gated area | `/agent-training` | exists | 5 | Same portal; program materials arrive with the first program terms. `/agent-training/` 301s to it. |
| 20 | Agent login form: username/email, password, "keep me signed in" | Rows 18–19 | exists | 5 | `/partners/login/` posts to Payload auth and sets the session cookie; works without JavaScript. Customer referrers use a Supabase magic link at `/referrals/login/`. |
| 21 | Client resources page linking to the two intake forms | `/resources` | exists | 5 | `/resources/` is the guides hub; the intake forms live at `/forms/*` and are linked from `/contact/` and the footer. |
| 22 | Social links: Facebook, Instagram | Footer, every page | exists | 5 | Footer social links from `SiteSettings` (legacy handles, confirmation owed). |
| 23 | Medicare compliance disclaimer in footer on every page | Footer, every page | exists | 5 | TPMO disclaimer from `ComplianceSettings` renders on every Medicare-touching page (`data-disclosure="medicareTpmo"`), asserted by verify:compliance; the text itself is a TODO token until the client supplies plan-year wording. |
| 24 | Custom 404 page | `app/not-found.tsx` | exists | 5 | `app/(frontend)/not-found.tsx`: search, the ten lines, a link home; 404 status. |
| 25 | Per-page `<title>` and meta description | Every page | exists | 5 | `pageMetadata` on every route: unique title ≤ 60, description ≤ 155, canonical, OG, structural noindex; verify:seo. |
| 26 | Favicon / app icon | `app/icon.svg` | exists | 5 | `/brand/favicon.svg` and the PNG icon set from the brand package. |

## Invisible on legacy

Zero third-party scripts, iframes, pixels, tag managers, cookie banners, chat or
scheduling widgets on any of the 21 rendered pages. See `THIRD-PARTY.md`. Nothing
to justify or drop; the new build starts from a clean baseline and every addition
must be justified there.

## Not features (no row)

- `/robots.txt` and `/sitemap.xml` return 404 on legacy. The new build generates
  both; that is an addition, not parity.
- WordPress remnants (`/wp-admin` 403, `/wp-login.php` 403, `/feed` 404) are not
  features. Phase 3 adds 410s for the `wp-*` paths so crawlers stop probing.

## Counts (updated 2026-09-13 after Phase 5)

| Status | Rows |
|---|---|
| exists | 24 |
| planned — pending client consent | 2 (rows 15, 16) |
| missing | 0 |
| deliberately dropped | 0 |

`pnpm verify:parity` (Phase 5) fails on any `missing` row and on any "pending
client consent" row still open at handover.
