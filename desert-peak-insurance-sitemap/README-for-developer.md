# Desert Peak Insurance — Site Map Package

Generated 2026-09-09. Total planned pages: **1,028** (see `page-count-report.txt` for the full breakdown by section).

Placeholder domain used throughout: `https://www.desertpeakinsurance.com` — find/replace this everywhere once the real domain is confirmed.

## What's in this package

- **`site-architecture.xml`** — The information architecture. Read this first. It describes the site as a tree of *page types* (sections), most of which are **templates with a URL pattern** (e.g. `/insurance/{product-slug}/{state-slug}/{city-slug}/`) rather than 1,028 hand-built pages. This is what you build routes and templates from.
- **`data-products.xml`** — The 29 insurance product lines, each with a slug, tier (1 = gets city-level pages, 2 = state-level only), and category (Personal/Commercial). Drives the `{product-slug}` variable.
- **`data-locations.xml`** — The 4 states (AZ home base, plus NV/UT/ID) and their 38 cities, each with a slug. Drives `{state-slug}` and `{city-slug}`.
- **`full-sitemap.xml`** — A complete, standards-compliant `sitemap.xml` (per the [sitemaps.org protocol](https://www.sitemaps.org/protocol.html)) with all 1,028 URLs spelled out literally, each with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`. This is a reference for exactly what the final URL set looks like, and can be dropped in at the site root once the pages exist (well under the 50,000-URL-per-file limit, so no sitemap index needed yet).
- **`page-count-report.txt`** — Page counts per section, for a sanity check against this README.

## How the 1,028 pages break down

| Section | Count | How it's built |
|---|---|---|
| Core pages (home, about, contact, quote, claims, billing, etc.) | 20 | Hand-built, one-off |
| Legal & policy (privacy, terms, accessibility, per-state licensing) | 9 | Hand-built, one-off |
| Product pages (29 products × hub + coverage + discounts/FAQ) | 87 | Templated, loop over products |
| State hub pages | 4 | Templated, loop over states |
| **Local product pages (Tier 1)** — 10 highest-intent lines × 38 cities | 380 | Templated, loop over (tier-1 product × city) |
| Statewide product pages (Tier 2) — 19 specialty lines × 4 states | 76 | Templated, loop over (tier-2 product × state) |
| Resource library (guides, comparisons, how-tos, life events, seasonal) | 186 | Content pages, written individually |
| Glossary | 221 | Content pages, short-form, could be semi-templated |
| Agent profiles | 30 | Templated, loop over roster (placeholder names — swap for real agents) |
| Carrier partner pages | 15 | Templated, loop over carrier list (placeholder names — swap for real appointments) |

## The tiering logic (important for SEO)

Only **10 product lines** (auto, home, renters, life, general liability, workers' comp, commercial auto, motorcycle, umbrella, BOP) get full **product × city** pages — the ones with real local search volume. The other 19 (boat, pet, cyber liability, contractors, etc.) get **state-level** pages only, not city-level.

This is deliberate. Generating `/insurance/pet-insurance/{every-city}/` for a low-volume line produces near-duplicate, thin pages that read as doorway pages to Google and can hurt the whole domain's rankings rather than help them. If a specific Tier 2 line turns out to have real local demand in one city, promote it manually rather than templating all of them.

**Whatever you build the city-level (Tier 1) templates on, make sure each page has genuinely unique content** — not just a find/replace of the city name into boilerplate. At minimum, vary: the local agent or office assigned to that city, any state-specific coverage minimums/requirements, local testimonials/reviews if available, and a short locally-relevant intro paragraph. Pages that are 95% identical except for a city name are a real risk factor for Google's Helpful Content system.

## Other build notes

- **Canonicalization**: for any page generated from a template with near-duplicate content (especially early on, before local content is filled in), set a self-referencing canonical tag and consider `noindex` until the page has enough unique content to be worth indexing.
- **Internal linking**: state hub pages should link to every city page in that state for the Tier 1 products; product hub pages should link to every state page. Don't rely on the sitemap alone for discovery.
- **Schema.org markup**: mark up the core pages and location pages with `InsuranceAgency` / `LocalBusiness` structured data, and agent pages with `Person`. This is standard practice for local insurance SEO.
- **URL slugs**: all slugs in the data files are already lowercase, hyphenated, and collision-checked (zero duplicate slugs, zero duplicate final URLs — see `page-count-report.txt`).
- **Scaling further**: if you later add more states or promote more Tier 2 products to Tier 1, rerun the same generation logic — the pattern in `site-architecture.xml` scales linearly (products × cities), so it's easy to project the new page count before building.

## Placeholder data to replace before launch

- Agent names (`data` embedded only in `full-sitemap.xml`/architecture counts, not a separate roster file — pull real agent names/bios from the agency)
- Carrier partner names (currently "Carrier Partner 1–15")
- Domain name (currently `desertpeakinsurance.com`)

## Correction, 2026-09-16

The generator doubled the business-owners-policy slug in `full-sitemap.xml`
(`/insurance/business-owners-policy-business-owners-policy/...`), 41 URLs in all,
and its own duplicate check did not catch it. They are corrected here to the
single slug the app uses. No other URL in the fixture changed; `pnpm verify:sitemaps`
now asserts every fixture URL exists in the app, so the file stays a regression input.
