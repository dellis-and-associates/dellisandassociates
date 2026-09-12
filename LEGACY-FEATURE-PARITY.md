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
| 1 | Global header: logo, Services menu (8 lines), About, Work with us, Resources, phone, primary CTA | Every page, `components/Header.tsx` | planned | 5 | Nav from `SiteSettings`, cache tag `global:nav`. Service list becomes the 29 products (or the reconciled set). |
| 2 | Mobile navigation sheet with the same links and CTAs | Every page, < 1024 px | planned | 5 | Must work without JS (details/summary or server-rendered fallback). |
| 3 | Click-to-call `tel:8013009980` in header and footer on every page | Every page | planned | 5 | Phone from `SiteSettings`; `tel:` link, 24 px target, present on mobile header. Number for the new entity to be confirmed. |
| 4 | `mailto:` office email in footer | Every page | planned | 5 | From `SiteSettings`. Address for the new entity to be confirmed. |
| 5 | "Book a policy review" contact form: Name*, Phone*, Email, Interest (select: full policy review / each service / working as an agent), Message | `/contact-us` | planned | 2 | Legacy submits by composing a `mailto:` draft; no server handler. New build: `Leads` collection + Resend notification + Turnstile; Resend-missing fallback keeps the lead. Function reproduced, not styling. |
| 6 | Confirmation state after submit ("Your email draft has been opened…") | `/contact-us`, both intake forms | planned | 5 | Becomes a real success state with the lead reference. |
| 7 | New client intake form: Name*, DOB, Phone*, Email, Address, 8 "Interested:" checkboxes, Household size, Current coverage, Notes | `/new-client-intake-form` | planned | 2 | DOB + address = regulated PII. `Leads` PII rules apply (no logs, retention job, restricted read). Interest list follows the reconciled product set. |
| 8 | Client medication intake form: Name*, DOB, Phone*, Pharmacy, 5 × (medication, dosage, frequency), Allergies, Notes | `/medication-intake-form` | planned | 2 | Exists only for Medicare Part D. **Conditional on `RECONCILIATION.md`.** Health information: stricter retention, admin-only read, never emailed in full. If Medicare is dropped this row becomes `deliberately dropped` with initials. |
| 9 | Legacy redirect `/medicare-insurance-prescription-drug-form-2` → `/medication-intake-form` | 308 | planned | 3 | Imported into `Redirects` from the crawl. |
| 10 | Legacy redirect `/dental-and-vision-insurance-2` → `/dental-and-vision-insurance` | 308 | planned | 3 | Imported into `Redirects`; target itself depends on row 12. |
| 11 | Services hub page with one entry per line | `/insurance-services` | planned | 2, 5 | Maps to `/insurance/` (`products-hub` template). Redirect the old path. |
| 12 | Coverage detail page per line, each with "Get a quote" CTA: life, whole life, term life, IUL, annuities, Medicare, health, dental & vision | `/life-insurance` … `/dental-and-vision-insurance` | planned | 2 | Resolved by `RECONCILIATION.md` decision B (2026-09-12): 7 products added to `data-products.xml` (Tier 2, Personal) with slugs matching the legacy URLs; `/iul` 301s to `/insurance/indexed-universal-life-insurance/`; term/whole/IUL carry `parent="life-insurance"`. Each legacy coverage URL 301s to its product hub. |
| 13 | Carrier bar (Mutual of Omaha, UnitedHealthcare, Aetna, Humana, Cigna) on coverage pages | Coverage pages, `components/Sections.tsx` | planned | 2 | `Carriers` is seeded empty; these five names are facts from the legacy site but appointments under the new entity need confirmed dates before they render. |
| 14 | FAQ accordion (2 instances) | `/` | planned | 5 | Accordion component in the design system; `/faq/` page in the IA; product FAQs from `Products.faqs`. Must expand without JS. |
| 15 | Client testimonials ("What people tell us") | `/` | planned — pending client consent | 2, 5 | Reuse gated on written consent per testimonial (hard rule 2; `TODO-CLIENT-DATA.md` #6). `/reviews/` in the IA. Ships empty until consent is on file. |
| 16 | Circle of Champions PY2025 certificate and appreciation letter gallery (2 JPGs with alt text) | `/`, `public/certificates/` | planned — pending client consent | 5 | Belongs to the old entity and plan year. TODO token until written confirmation (`TODO-CLIENT-DATA.md` #5); otherwise `deliberately dropped`. |
| 17 | "Work with us" recruiting page with CTAs to contact and to agent training | `/work-with-us` | planned | 2, 4 | Not in the sitemap package. Maps to `/careers/` (in the IA) for the page and to the Phase 4 partner track for the function. Raised, not dropped. |
| 18 | "Agents resource" gated area | `/agents-resource` | planned | 4 | Kept per `RECONCILIATION.md`: maps to the Phase 4 partner track. Legacy gate is UI only (form has no handler); parity target is a working `partner`-role area in the partner portal. |
| 19 | "Agent training" gated area | `/agent-training` | planned | 4 | Same as row 18; program materials section of the partner portal. |
| 20 | Agent login form: username/email, password, "keep me signed in" | Rows 18–19 | planned | 4 | No backend on legacy. New: `partner` role (Payload `Users.roles`, column exists since the Phase 1 migration) or Supabase Auth on the app side; decided in Phase 4. |
| 21 | Client resources page linking to the two intake forms | `/resources` | planned | 2, 5 | IA's `/resources/` is the blog hub. Intake forms need a home (`/forms/` or under `/contact/`); decide in Phase 2 route map. Redirect old path. |
| 22 | Social links: Facebook, Instagram | Footer, every page | planned | 5 | From `SiteSettings`; new entity's handles to be supplied. |
| 23 | Medicare compliance disclaimer in footer on every page | Footer, every page | planned | 2 | `ComplianceSettings`, admin-write-only, cache tag `global:compliance`. Mandatory text if Medicare stays in scope; removed only by the Phase 0.B decision. |
| 24 | Custom 404 page | `app/not-found.tsx` | planned | 5 | Template in the design system; renders without JS. |
| 25 | Per-page `<title>` and meta description | Every page | planned | 2 | SEO defaults on every collection; `NEXT_PUBLIC_SITE_URL` drives canonical/OG. |
| 26 | Favicon / app icon | `app/icon.svg` | planned | 5 | From `desert-peak-brand/brand/logos/` (`favicon.svg`, PNG 32/180/192/512). |

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

## Counts (updated 2026-09-12 after RECONCILIATION.md)

| Status | Rows |
|---|---|
| planned | 24 |
| planned — pending client consent | 2 (rows 15, 16) |
| missing | 0 |
| exists | 0 |
| deliberately dropped | 0 |

`pnpm verify:parity` (Phase 5) fails on any `missing` row and on any "pending
client consent" row still open at handover.
