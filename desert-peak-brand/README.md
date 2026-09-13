# Desert Peak Insurance — brand foundation and collateral

Design tokens, logo system, brand guide (Stages 1–4) and the collateral system generated from them (Stage 5) for Desert Peak Insurance, Direction 1 "Strata". The site repo consumes `brand/` as a dependency; nothing here depends on the CMS or the page build.

```
pnpm build:tokens     # design-tokens.json -> brand/dist/* + brand/brand-sheet.html
pnpm audit:contrast   # WCAG 2.2 + colour-vision gate -> brand/CONTRAST-REPORT.md (exit 1 on failure)
pnpm build            # both (the identity)

pnpm verify:token-lock        # zero off-token colours, fonts, or altered marks in every collateral file
pnpm build:collateral         # regenerates every collateral asset from tokens + people.json + content/
pnpm check:banned-phrases     # every text layer in social, decks, OG, email, showcase
pnpm check:medicare           # every Medicare-flagged asset carries the TPMO disclaimer
pnpm preflight:print          # business-card PDFs: boxes, CMYK only, fonts embedded, no transparency
pnpm build:showcase           # showcase/index.html from the repository's own renders
pnpm collateral               # all of the above in the definition-of-done order
```

Requires Node ≥ 22.6 (TypeScript run directly by Node), pnpm, Google Chrome or Chromium on PATH (rendering, driven over the DevTools protocol; `CHROME=/path` overrides), LibreOffice (`soffice`), Ghostscript (`gs`) and poppler (`pdffonts`, `pdftoppm`, `pdfinfo`). Dev dependencies: pptxgenjs, pdfkit, pdf-lib, fontkit, jszip, pngjs, svgo. Python with fontTools is needed only to regenerate the static deck fonts, which are committed.

## Where things are

| Path | What | Edit? |
|---|---|---|
| `brand/design-tokens.json` | Single source of truth for colour, type, space (W3C Design Tokens) | yes |
| `brand/dist/` | tokens.css (dark block wired, empty), theme.css (Tailwind v4), tailwind-preset.ts, tokens.ts, fonts.css | generated |
| `brand/logos/` | Hand-authored SVG logo system, PNG icon set, `MANIFEST.sha256` (the identity lock) | locked |
| `brand/fonts/` | Latin-subset variable WOFF2 (site), `static/` TTF instances (print, decks), `static/tabular/` | generated once |
| `brand/brand-sheet.html`, `CONTRAST-REPORT.md` | Identity approval sheet and the contrast gate's report | generated |
| `brand/BRAND-GUIDE.md`, `DECISIONS.md`, `LICENSES.md`, `LOGO-TESTS.md`, `CONCEPTS.md` | The guide, why, licences, logo tests, the three Stage 1 directions | yes |
| `people.json`, `collateral.config.json`, `content/*.json` | Inputs for every personalised or content asset; `{{TODO:…}}` renders visibly | yes |
| `social/` | Profile pictures, banners (+ safe-zone overlays), post masters and PNGs, `USAGE.md` | generated |
| `email/` | Signatures (HTML + text), hosted logo PNG, `INSTALL.md`, renders | generated |
| `decks/` | client-pitch.pptx, partner-meeting.pptx, renders, fonts, `USAGE.md`, `CHART-STYLE.md` | generated (inputs in `decks/inputs/`) |
| `web/` | Favicons + manifest, optimised logos + React components, OG masters, email header, `ui-elements.html` | generated |
| `print/` | Business-card PDFs (CMYK), preflight reports, renders | generated |
| `showcase/` | `index.html`, self-contained, every image a repository render | generated |
| `COLLATERAL-INVENTORY.md`, `COLLATERAL-COMPLIANCE.md`, `PRINT-COLORS.md` | Every asset with its spec and date; what counsel must confirm; the CMYK table | generated / yes / generated |
| `scripts/` | One generator per surface, `verify-token-lock.ts`, the checks, `collateral/lib.ts` (shared: tokens, marks, fonts, rendering, guards) | yes |

## Using the identity in the site (Next.js + Tailwind v4)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@desert-peak/brand/fonts.css";
@import "@desert-peak/brand/tokens.css";
@import "@desert-peak/brand/theme.css";
```

Then `bg-surface`, `text-ink`, `text-brand`, `border-border-strong`, `text-body`, `font-serif`, `rounded-control`, `shadow-1`, `max-w-measure-body`, and the `tabular`, `measure` and `focus-ring` utilities. The default Tailwind palette is removed by `theme.css` on purpose: if a colour is not a token, it does not exist. Web assets the site should copy: `web/favicons/*` and `manifest.webmanifest` to `public/`, `web/logos/react/` into the component tree, `email/email-logo@*.png` to `public/brand/` (the signature's hosted image URL), and the OG generator is called from the site's image route or at build time.

## Changing collateral

A new employee is an entry in `people.json`; a new title, phone or licence number is an edit there; a new glossary term is authored in the site and re-imported with `pnpm import:glossary`; a new state fact is a row in `content/state-facts.json` with its statute and date. Then `pnpm collateral`. Nothing is edited in a rendered file.
