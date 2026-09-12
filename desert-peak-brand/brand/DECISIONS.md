# Decisions

Every consequential choice, its reason, and what was rejected. Dates are 2026-09-12 unless stated. Read this before changing a token; most "obvious improvements" were already considered.

## Direction

**Strata (Direction 1) over Contour and Ledger.** Chosen by the client from `CONCEPTS.md` on the recommendation there. Short version: Strata is the only direction that is about this geography without a postcard element (Basin and Range fault-block uplift is how the peaks in all four licensed states formed), carries an insurance idea (layers stacked in order, the important part above the line) without a shield or umbrella, survives one colour and fax because it has no strokes, and has enough mass to sit beside a lion badge and a purple wordmark. Contour had the better ornament system and the worst favicon (its thumbprint problem was visible in the sketch). Ledger was the most faithful to the analytical voice and gave the site nothing to build a visual system from.

**The fault gap is 4 units on a 64-unit mark (1/16).** Tested at 3 and 6 during Stage 3. At 3 it closes at 16 px; at 6 the mark reads as broken rather than lifted, which is the failure mode named in the concept. Do not widen it.

**The up-thrown block is on the right.** The mark leads into the wordmark; the higher block should be nearest the type. Mirroring is a misuse.

**The favicon has its own three-band geometry.** The four-band mark at 16 px renders bands of 2.5 px with 1 px gaps and turns to mud on a dark tab. Three bands at period 20 give 3.5 px bands and 1.5 px gaps and read as stepped blocks with a seam. A separate favicon geometry is a smaller compromise than a favicon that does not read.

**`favicon.svg` has no tile; the PNG app icons do.** In a browser tab a coloured tile is louder than every neighbour and the mark alone reads fine at 16 px on light and dark. iOS and Android render icons on their own backgrounds and mask them, so the 180/192/512 icons are the reversed mark on a solid brand square with no rounded corners.

## Colour

**Authored in OKLCH, emitted as sRGB hex.** OKLCH gives perceptually even lightness steps across hues, so `brand-600`, `positive-700` and `notice-600` at the same L look equally dark and the lightness ladder below is meaningful. Hex is what ships because it works everywhere, including email and print. `build-tokens.ts` gamut-maps by reducing chroma at constant lightness and hue, never by clipping RGB, so a ramp never gets a lightness bump at the gamut edge.

**Ramp anchor points.** Lightness stops 50→950 are 0.97, 0.94, 0.88, 0.79, 0.68, 0.57, 0.47, 0.39, 0.31, 0.24, 0.17. Step 600 (L 0.47) is where a saturated hue first passes 4.5:1 on the surface with room to spare, so it is the default "usable as text" step; 500 (L 0.57) passes 3:1 and is the default border step; 50 (L 0.97) is the tinted-surface step. Chroma follows a profile that peaks at 500–600 and tapers to 12 % at 50 and 45 % at 950, which is how real pigments behave and why the light tints do not look like pastel candy. The recipe lives in `scripts/author-tokens.mjs`; re-running it overwrites the token file, so treat it as documentation.

**Hues.** Brand 35 (hematite; the sketch colour #8A3A26 became `brand-600` #923D28 at L 0.47, C 0.12). Neutral 75 with chroma 0.014 at mid-ramp: warm enough that `surface` reads as caliche and `ink` as basalt, low enough that it never reads as beige. Accent 76 (ochre). Notice 88 (amber, clearly yellower than ochre so a warning is never mistaken for ornament). Critical 22 with chroma 0.18: cooler and more saturated than brand so a crimson error and a rust link are different things even at a glance.

**Positive is agave (hue 175), not creosote (hue 134).** The Stage 1 palette used a yellow-green. The colour-vision audit failed it: under protanopia a dark yellow-green and a dark red both become olive-brown, and the pair sat 0.023 apart in OKLab. Under red-green deficiency the surviving axis is blue-yellow, so a green that leans blue keeps a distinct b-component while a yellow-green collapses into amber. Hues from 134 to 180 were measured; 175 clears the 0.08 threshold against both notice and critical with margin, and a cool green in a warm palette is also a better signal for "good". The number in `CONCEPTS.md` is superseded.

**The state lightness ladder: notice 0.47, positive 0.39, critical 0.31.** Three states must stay apart without hue. Notice cannot go lighter than L 0.47 and still pass 4.5:1. Critical is darkest because red loses the most lightness under protanopia, so putting it at the bottom of the ladder keeps its simulated lightness from colliding with positive. Critical at 900 (L 0.24) was rejected because that is the lightness of `ink`, and an error message the same darkness as body text is not an error message.

**Brand is reported against the states but does not gate.** Brand and notice share L 0.47 and converge under deuteranopia (ΔE 0.02). Brand is not a status colour; the guide forbids using it as one and forbids notice appearing without an icon and a word. Gating on it would have forced brand off its anchor for a collision that the design rules already prevent. This is on the record in `CONTRAST-REPORT.md`.

**Focus ring is ink with a surface halo, not a single colour.** A ring that must pass 3:1 against both a light surface (needs L ≲ 0.64) and a brand button (needs L ≳ 0.73) cannot exist as one colour. The two-tone ring (2 px `neutral.900` outside a 2 px `neutral.50` halo) passes against every surface and against brand, and it is the pattern GOV.UK and others use for the same reason. An ochre ring was rejected: ochre fails against the light surface.

**Critical is never a solid fill.** Brand and critical are both reds. The rule that destructive actions are outlined is what keeps "Request the analysis" and "Remove driver" from ever looking like the same button.

**Accent (ochre) is not a text colour.** `accent-500` is 2.4:1 on surface. Rather than darken the accent until it lost its character, it is declared decorative and `accent-strong` (700) exists for the rare icon or label.

**Surfaces are not white.** `surface-raised` is `neutral.0` (#FEFBF8), not #FFFFFF; pure white on a caliche page looks like a hole.

**Shadows are warm-tinted.** `neutral.900` at low alpha rather than black; a black shadow on a warm page reads as dirt.

## Typography

**Archivo + Source Serif 4.** Archivo's width axis gives the display cut a horizontal mass that echoes the bands without a second family; its 100–900 weight range covers UI, and it ships tabular figures. Source Serif 4 has an optical-size axis, so a 17 px paragraph and a 20 px lead get different drawings from one file, and it is designed to sit beside a grotesque. Both are OFL and verified from the foundry license files, not assumed from Google Fonts.
Rejected: Newsreader + Public Sans (Ledger's pairing; Public Sans's variable build is labelled experimental by its own README); IBM Plex Sans + Mono (Contour's pairing; right for notation, too cool for a mineral palette); Inter (the default of everything); Fraunces (too soft for an adult insurance voice); Bricolage Grotesque (too much personality for 1,800-word articles).

**Display width 112, not 125.** Full-width Archivo at 51 px reads as a sports brand. 112 is extended enough to notice and not enough to name.

**Minor third (1.2) on a 17 px base, rounded to whole pixels.** A 1.25 ratio produced a 10.9 px caption and a 65 px display from the same base; 1.2 keeps ten usable steps between 12 and 61 px. Base 17 rather than 16 because Source Serif 4 at 16 px sets small for 1,800 words; 18 pushed the measure over 68ch on tablets. Rounding to whole pixels was preferred over pure ratio values so that line-heights land on the 4 px grid more often.

**Measure 68ch.** The middle of the 65–75 working range; on the wide side of the middle because Source Serif 4 is narrow-ish and 65ch felt like a leaflet.

**Tabular figures are a token, not a suggestion.** Comparison tables are the site's core content. `--dp-numeric-tabular` and the `tabular` utility exist so nobody has to remember the CSS.

**Fonts are committed to `brand/fonts/`.** Latin-subset, variable WOFF2, 91–193 KB each. The site self-hosts (no Google Fonts requests, no CLS from a third party, no GDPR question). The brand sheet embeds them as data URIs so it opens with no network.

## Layout and motion

**Radius by role.** `control` 2 px, `surface` 4 px, `pill` for dots and counters. A hard-edged geometric mark next to 12 px card corners looks like two brands. Rejected: any size-named radius scale.

**Four-step elevation.** Cards use `shadow-0` plus a border; the border does the work. More steps invite more floating.

**Motion durations collapse to 0 ms under reduced motion.** Emitted in `tokens.css` so it cannot be forgotten per component.

## Tokens and build

**W3C Design Tokens format** with `$value`/`$type`/`$description`, aliases as `{path}`, hex stored under `$extensions` for readers who cannot parse OKLCH. Two colour layers: primitives (ramps) and semantic roles (what components use). The rule that components never reference primitives is what makes `[data-theme="dark"]` a token swap; the block is emitted with every semantic name commented out, so filling it in is a matter of choosing steps.

**Generated outputs are committed.** `dist/`, `brand-sheet.html` and `CONTRAST-REPORT.md` are generated but committed so the site repo can consume them without running the build, and so a diff shows exactly what a token change did. `pnpm check` fails if the committed files drift from the source.

**`theme.css` was added beyond the brief.** The site runs Tailwind v4, whose idiom is `@theme`, not a JS preset. Both are emitted; the preset works via `@config` if needed. `theme.css` also removes Tailwind's default palette so that hard rule 3 (tokens are the only source of colour) is enforced by the absence of `bg-red-500` rather than by a lint rule alone.

**Scripts are dependency-free TypeScript run directly by Node.** No style-dictionary, no build toolchain; a fresh clone needs Node 22.6+ and nothing else. The trade-off is that the generator is bespoke and lives in `scripts/lib.ts`; it is ~200 lines and documented.

**Logos carry hex literals.** SVG cannot read CSS custom properties in email, print or a favicon. The audit checks that every hex in `logos/` is a token value, which is as close to rule 3 as an SVG can get.

**The partner-row test is not committed with carrier marks.** Hard rule 2. The render was done privately with four real carrier files and a stand-in badge; `logos/tests/partner-row.html` re-creates it from a git-ignored folder.

## Things not done, on purpose

- No dark theme values (v1 ships light only; the block is wired).
- No metric-compatible fallback fonts with `size-adjust`. Worth adding in the site repo once the header layout is fixed, to reduce layout shift.
- No wordmark variant without the INSURANCE line. The name without the descriptor is not the brand; use the mark alone below the lockup minimum.
- No email-safe HTML palette or Office theme. Derive from `tokens.ts` when needed.
- No tagline. None exists; one must not be invented.
