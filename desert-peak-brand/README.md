# Desert Peak Insurance — brand foundation

Design tokens, logo system and brand guide for Desert Peak Insurance (Direction 1, "Strata"). The site repo consumes `brand/` as a dependency; nothing here depends on the CMS or the page build.

```
pnpm build:tokens     # design-tokens.json -> brand/dist/* + brand/brand-sheet.html
pnpm audit:contrast   # WCAG 2.2 + colour-vision gate -> brand/CONTRAST-REPORT.md (exit 1 on failure)
pnpm build            # both
pnpm check            # both, then fail if generated files differ from what is committed
```

Requires Node ≥ 22.6 (the scripts are TypeScript run directly with Node's type stripping). No npm dependencies.

## Where things are

| Path | What | Edit? |
|---|---|---|
| `brand/design-tokens.json` | Single source of truth (W3C Design Tokens format) | yes |
| `brand/dist/tokens.css` | CSS custom properties; `[data-theme="dark"]` wired, empty in v1 | generated |
| `brand/dist/theme.css` | Tailwind v4 `@theme` block mapping semantic roles to utilities | generated |
| `brand/dist/tailwind-preset.ts` | Tailwind v3-style preset (works via `@config` in v4) | generated |
| `brand/dist/tokens.ts` | Typed export for components and CMS admin theming | generated |
| `brand/dist/fonts.css` | `@font-face` for the self-hosted fonts in `brand/fonts/` | generated |
| `brand/brand-sheet.html` | Client approval sheet, self-contained, printable | generated |
| `brand/CONTRAST-REPORT.md` | Output of the gate | generated |
| `brand/logos/` | Hand-authored SVG logo system and PNG icon set | yes (see LOGO-TESTS.md) |
| `brand/BRAND-GUIDE.md` | The guide for developers | yes |
| `brand/DECISIONS.md` | Why things are the way they are | yes |
| `brand/LICENSES.md` | Font licenses, quoted verbatim | yes |
| `brand/CONCEPTS.md` | The three Stage 1 directions and the recommendation | archive |
| `scripts/` | `build-tokens.ts`, `audit-contrast.ts`, shared `lib.ts`, the sheet template, and `author-tokens.mjs` (the one-time ramp recipe; re-running it overwrites the token file) | yes |

## Using it in the site (Next.js + Tailwind v4)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@desert-peak/brand/fonts.css";
@import "@desert-peak/brand/tokens.css";
@import "@desert-peak/brand/theme.css";
```

Then `bg-surface`, `text-ink`, `text-brand`, `border-border-strong`, `text-body`, `font-serif`, `rounded-control`, `shadow-1`, `max-w-measure-body`, and the `tabular`, `measure` and `focus-ring` utilities. The default Tailwind palette is removed by `theme.css` on purpose: if a colour is not a token, it does not exist.
