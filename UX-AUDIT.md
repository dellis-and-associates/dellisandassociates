# UX audit — the before state

Audited 2026-09-13 against the production site (`https://www.dellisandassociates.com`), which is the
Ellis & Associates scaffold this repo replaced. Screenshots at 320, 768, 1280
and 1920 with 4× CPU throttling and Slow 4G emulation (400 kb/s, 400 ms) are
in `docs/ux-audit/www.dellisandassociates.com/`. Findings are per template,
ordered by severity, then by expected traffic. Nothing was fixed during the
audit; the new build in `app/(frontend)` starts from these findings.

## Findings by template

| Template | Load on Slow 4G (320) | Targets under 24 px (320 / 1280) | axe violations (320) | Horizontal scroll |
|---|---:|---:|---|---|
| `/` | 10.3 s | 20 / 27 | color-contrast (serious, 5), heading-order (moderate, 1) | no |
| `/life-insurance` | 6.4 s | 17 / 23 | color-contrast (serious, 5), heading-order (moderate, 1) | no |
| `/medicare` | 6.5 s | 17 / 23 | color-contrast (serious, 5), heading-order (moderate, 1) | no |
| `/contact-us` | 6.9 s | 17 / 24 | heading-order (moderate, 1) | no |
| `/resources` | 6.5 s | 17 / 23 | heading-order (moderate, 1) | no |
| `/new-client-intake-form` | 6.8 s | 25 / 32 | heading-order (moderate, 1) | no |
| `/work-with-us` | 6.7 s | 17 / 23 | color-contrast (serious, 5), heading-order (moderate, 1) | no |
| `/agent-training` | 6.7 s | 20 / 26 | heading-order (moderate, 1) | no |

## What the numbers mean, by severity

1. **Colour contrast fails (serious) on every marketing page.** Five nodes per
   page at 320 and 1280: the muted "stone" text and the copper links on the
   bone background sit under 4.5:1. The new build's palette is contrast-gated
   at build time (`desert-peak-brand/brand/CONTRAST-REPORT.md`), and
   `ink-muted` is 7.3:1 on `surface`.
2. **Heading order skipped (moderate) on every page.** The scaffold's section
   labels are `h3`/`h4` under an `h1` with no `h2`. The new templates carry a
   strict outline: one `h1`, `h2` per section, `h3` inside.
3. **17–32 interactive targets under 24 × 24 CSS px on every page.** Footer
   links, the social icons and inline nav links. The new components set 44 px
   minimum on controls and 24 px on inline UI links (`min-h-6`), with the
   header and footer links padded to the same.
4. **6.5–10 s to `load` on the device baseline.** The scaffold ships a Google
   Font over the network and ~95 KB of framework JavaScript. The new build
   self-hosts two font files with size-adjusted fallbacks, preloads both, and
   renders content pages as server components with no client JavaScript
   beyond the framework runtime and a 1 KB idle-loaded vitals beacon.
5. **Forms submit by opening a `mailto:` draft.** No server, no confirmation,
   no record. Data is lost if the mail client does not open. The new build
   saves every submission as a Lead before any email is sent.
6. **The agent login is a form with no handler.** The gated pages render for
   everyone. The partner portal in the new build authenticates.
7. **No `robots.txt`, no `sitemap.xml`, no structured data, no canonical.**
8. **What was already right and is kept:** no third-party scripts, no cookie
   banner, no chat widget, no carousel, click-to-call on every page, a
   Medicare disclaimer in the footer, semantic landmarks, a single `h1`.

## Templates on the legacy site

Home, eight coverage pages (one template), services hub, about, resources,
contact form, two intake forms, work-with-us, two gated agent pages, 404.
Twelve templates; the new IA has roughly twelve as well, mapped in
`UX-MODEL.md`.

## Screenshots

`docs/ux-audit/www.dellisandassociates.com/<page>-<width>.png`, full page,
one file per template per breakpoint (32 files). The after-state screenshots
are produced by `pnpm test:visual` into `tests/visual/__screenshots__/`.
