# Logo tests

Direction 1, Strata. Every test below was actually performed on the committed files in `logos/`; renders that can be committed are in `logos/tests/`. The mark is four horizontal strata cut by one normal fault, the right-hand block up-thrown by half a band period. Nothing in the system is a stroke, a gradient, a filter or an effect, which is why most of these tests are uneventful.

## The files

| File | viewBox | Colours | Notes |
|---|---|---|---|
| `mark.svg` | 0 0 64 59 | brand.600 | Four bands. Symbol alone. |
| `favicon.svg` | 0 0 64 64 | brand.600 | Three bands, full bleed, wider fault gap in proportion. Use at 24px and below. |
| `logo-horizontal.svg` | 0 0 334.12 59 | brand.600 mark, neutral.900 type | Primary lockup. Text block centred on the mark, gap = 20 units. |
| `logo-stacked.svg` | 0 0 250.12 121 | brand.600 mark, neutral.900 type | Mark centred above the text block, gap = 16 units. |
| `logo-reversed.svg` | as horizontal | neutral.50 throughout | For `surface-inverse`, brand fills and dark photography behind a solid panel. |
| `logo-mono.svg` | as horizontal | `currentColor` | Inherits text colour. Print, stamps, embossing, one-colour anything. |
| `wordmark.svg` | 0 0 250.12 46 | neutral.900 | Type only. Outlined paths, not live text. |
| `icon-32.png` | 32 px | mark on transparent | Three-band mark, no tile. |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | square | reversed mark on brand.600 tile | Apple touch icon and PWA icons. Square, no rounded corners; the OS masks them. |

Technical requirements, checked: `viewBox` on every file, no `width`/`height` attributes, no `<style>` blocks, no inline `style=""`, no `<text>` (the wordmark is outlined paths shaped with HarfBuzz from Archivo at wdth 112 / wght 640 with the font's own kerning), coordinates rounded to two decimals, a `<title>` referenced by `aria-labelledby` on every file, `role="img"`. The only hex literals are token values, and `scripts/audit-contrast.ts` fails the build if that ever stops being true. Fill is an attribute, not a style, so the SVGs inline into React without change.

## 1. Legible at 16×16 px

Render: `tests/1-favicon-16px.png` (simulated light and dark browser tabs, a bookmarks bar beside other favicons, and 32 px).

Result: **pass with the three-band variant.** At 16 px, `favicon.svg` reads as two stepped blocks with a visible seam; the three bands are individually visible on a light tab and merge slightly on a dark tab. The four-band `mark.svg` at 16 px is rendered alongside for comparison and is noticeably muddier, which is why the favicon has its own geometry. The rule that follows: at 24 px and below use `favicon.svg`, above that use `mark.svg`.

The lockup at 24 px height is legible for "Desert Peak" but not for the INSURANCE line, and at 20 px the sub-line is a grey bar. See minimum sizes below.

## 2. Flattened to one colour

Render: `tests/2-3-mono-and-reversed.png` (top panel: `logo-mono.svg` with `color: #000`).

Result: **pass.** The mark is solid shapes; there is nothing to lose. The fault gap (4 units, 1/16 of the mark width) stays open in black on white. The brand sheet also shows `logo-mono.svg` inheriting the positive colour to prove `currentColor` is wired.

## 3. Reversed out of the darkest brand colour

Render: `tests/2-3-mono-and-reversed.png` (middle: on `neutral.950`; bottom: on `brand.600`).

Result: **pass.** `logo-reversed.svg` is a single light colour (`neutral.50`), contrast 15.5:1 on `neutral.950` and 6.6:1 on `brand.600`. The four bands remain individually distinct on both. The reversed file must not be used on light surfaces; the mono file exists for that.

## 4. One-bit fax reproduction

Render: `tests/4-fax-1bit.png`. Method: `logo-mono.svg` at 280 px wide, converted to grayscale, vertical resolution halved (fax is roughly 200×100 dpi), hard-thresholded to 1-bit with no dithering, then scaled back.

Result: **pass for the mark and the name; the INSURANCE line degrades.** The strata and the fault survive with clean edges. "Desert Peak" survives. The letterspaced 10-unit-cap sub-line breaks into fragments at this resolution, which is expected for any 5 px cap-height text. The rule that follows: for fax, stamps and anything at fax resolution, use the lockup at no less than 15 mm tall, or the mark alone.

## 5. In a row with national carrier logos

Method: a private render of `logo-horizontal.svg` and `mark.svg` in a partner row next to the real UnitedHealthcare, Aetna, Humana and Cigna marks (fetched for the test only) and a solid blue circular badge standing in for Mutual of Omaha, whose file was not available under a licence that allows it to be fetched. Rendered in colour and in grayscale. The render is **not committed**: hard rule 2 keeps carrier marks out of this repository. `tests/partner-row.html` re-creates the test; drop the licensed carrier files into `tests/carriers/` (git-ignored) and open it.

Result: **pass.** Findings from looking at it:
- Desert Peak is the only warm colour in the row. The carriers are blue, purple, green and blue; the rust mark neither disappears into them nor reads as a variant of any of them.
- In grayscale the mark has more mass than every carrier wordmark and still reads as a stepped block, not a barcode, because the gap-to-bar ratio is 4:10.
- The typology is different from every neighbour: no badge, no letterform, no figure, no pure wordmark. That is the reason it does not look derivative.
- At the same cap height, "Desert Peak" in Archivo wdth 112 has slightly more width than "aetna" or "Humana"; in a partner row the lockup should be sized by mark height (mark ≈ 1.2 × the tallest carrier wordmark cap height), not by overall width, or it will dominate the row.
- The Cigna file available was a small bilingual variant; it reads only as a typology stand-in at this size. Re-run with the licensed English mark when the site repo has it.

## 6. Clear space and minimum size

All rules are in multiples of **P**, the band period of the mark (one band plus one gap = 14 units in `mark.svg`, which is 0.237 × the mark's height). Measure P off the artwork at whatever size it is placed; the rules then scale.

**Clear space.** Keep a margin of at least 1 P on all four sides of any logo file. Nothing else, including page edges, rules, photographs and carrier logos, enters that zone. In a partner row the divider rule sits at 2 P from the lockup.

**Minimum sizes.**

| File | Digital | Print |
|---|---|---|
| `mark.svg` | 24 px tall (P ≈ 5.7 px) | 6 mm tall |
| `favicon.svg` | 16 px | not for print |
| `logo-horizontal.svg` | 36 px tall (sub-line cap ≈ 6 px) | 10 mm tall |
| `logo-stacked.svg` | 72 px tall | 20 mm tall |
| `wordmark.svg` | 28 px tall | 8 mm tall |
| Any file at fax resolution or on a stamp | — | 15 mm tall, or use the mark alone |

Below the lockup minimum, use the mark alone. There is no variant that drops the INSURANCE line; the name without the descriptor is not the brand.

**Placement.** Left-aligned on the band edge of the mark (the mark's left edge, not the fault) when the lockup sits in a header; the up-thrown block leads into the wordmark, which is why the mark is on the left and the higher block is on the right. Do not mirror it.
