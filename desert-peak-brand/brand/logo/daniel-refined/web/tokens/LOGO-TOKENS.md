# Tokens from the logo

Extracted 2026-09-15 from `brand/logo/daniel-refined/web/logo-horizontal.svg`. The logo uses five colours and one typeface, all in `brand/design-tokens.json` v2 (the palette taken from the badge: navy, sage, rust on cream), so the website needs no values of its own: these roles are aliases. Import `logo-tokens.css` after `brand/dist/tokens.css` and use `var(--dp-logo-*)` where a page element echoes the logo.

| Logo element | Role | Hex | Contrast on surface | Site use |
|---|---|---|---:|---|
| ring | `ink` | #1E293B | 13.63 | The ring and the main peak. Also the site's heading and nav colour. |
| peak | `ink` | #1E293B | 13.63 |  |
| peak-far | `ink-muted` | #44576C | 6.92 | The secondary peak. Also secondary text. |
| snow | `surface-raised` | #FEFBF9 | 1.04 | The snow cap. Also cards and raised surfaces. |
| cactus | `color-positive-500` | #698E6E | 3.44 | The saguaro (mid sage, 3:1 on the page). The one colour the logo adds to a page: use it for icons and a single accent (the active nav marker), never for text and never as a button fill; positive state text is the semantic positive role. |
| wordmark | `ink` | #1E293B | 13.63 | Desert Peak / INSURANCE in the web lockup. |
| wordmark-accent | `brand` | #243858 | 10.98 | INSURANCE in the stacked print version (v1). On the site the action colour is the badge's navy: buttons, links. |
| ground | `surface` | #FBF6F2 | 1.00 | The paper the logo sits on. The page background. |
| ground-inverse | `surface-inverse` | #1E293B | 13.63 | Where the reversed lockup goes: footer, dark panels. |

## What the logo adds to the site

- **Sage** (`positive.500`, #698E6E) is the badge's saguaro and the one accent colour the logo gives the site: one accent per view (the active nav marker, a checklist icon), icons only (3:1), never text and never a button fill; navy (`brand`) is the action colour so the two never compete. Positive state text uses the darker semantic `positive`.
- **Ink and paper**: the logo is ink on paper, and so is the site. Headings, nav and the wordmark share `ink`; the page is `surface`; cards are `surface-raised` like the snow cap.
- **Archivo at width 112** for display headings, because that is how the wordmark is set; body stays Source Serif 4.

These aliases resolve through `brand/design-tokens.json` v2, whose palette was taken from the badge on 2026-09-15 (navy neutrals and navy brand, sage positive, cream surfaces; see brand/DECISIONS.md).
