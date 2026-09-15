# Desert Peak Insurance — Brand Guide

> **Palette v2 (2026-09-15).** The colours are now taken from Daniel's badge: navy neutrals, navy `brand`, sage `positive`, cream surfaces (`DECISIONS.md`, "Palette v2"). Where this guide says hematite, agave or warm black, read navy, sage and navy; the token file wins.

For the developer building the site. You will not need to talk to the person who made this; if something here is ambiguous, the token file wins over this document, and `DECISIONS.md` explains why things are the way they are.

The brand is **Strata**: an insurance program is layers stacked in the right order, and the ground in Arizona, Nevada, Utah and Idaho is made the same way. The mark is a cross-section of fault-block strata with the right-hand block lifted. The voice is measured, precise and adult. The visual system should feel like a well-set report, not a landing page.

Contents: 1 Tokens · 2 Colour · 3 Typography · 4 Layout, radius, elevation, motion · 5 Components · 6 Logo · 7 Voice and tone · 8 Photography and illustration · 9 Do not

---

## 1. Tokens, and the one rule

`design-tokens.json` is the source of truth. `dist/tokens.css` exposes everything as `--dp-*` custom properties; `dist/theme.css` maps them to Tailwind v4 utilities; `dist/tokens.ts` is the typed export.

**The rule: components reference semantic roles, never primitives.** `text-brand`, `bg-surface-raised`, `border-border-strong`. Never `--dp-color-brand-600`, never a hex. If you find yourself needing a primitive, the semantic layer is missing a role: add the role to the token file, rebuild, and use that. This is what makes dark mode a token swap later instead of a rewrite: `[data-theme="dark"]` in `tokens.css` is wired and empty, and shipping it means filling that block with different aliases and touching nothing else.

`theme.css` removes Tailwind's default palette, radii and shadows. `bg-red-500` does not exist on this site. That is intentional; the site repo should add a lint rule that fails on hex literals in CSS and TSX.

Build: `pnpm build`. The contrast audit runs as part of it and fails the build if any pairing regresses. Do not skip it.

---

## 2. Colour

Warm and mineral. The neutrals are tinted toward caliche and basalt, not gray; a pure gray or pure white will look dirty next to them, so do not introduce one.

### Semantic roles

| Role | Hex | Use |
|---|---|---|
| `surface` | #FAF4EC | Page background. |
| `surface-raised` | #FEFBF8 | Cards, popovers, anything lifted. Not pure white. |
| `surface-sunken` | #F1EAE1 | Wells, table headers, inset areas. |
| `surface-inverse` | #110F0C | Dark panels, footer. Pair with `ink-inverse`. |
| `ink` | #221F1A | All body and heading text. |
| `ink-muted` | #605A52 | Captions, metadata, secondary text. Still 7.3:1 on surface. |
| `ink-inverse` | #FAF4EC | Text on `surface-inverse` and on brand fills. |
| `border` | #DDD6CE | Hairlines and dividers. Decorative; never carries meaning. |
| `border-strong` | #7C766E | Inputs and any boundary a user must perceive. |
| `brand` | #923D28 | Hematite. Primary buttons, links, the mark. 6.3:1 on surface, so it is a text colour too. |
| `brand-hover` / `brand-active` | #742A18 / #551A0C | Interaction states of brand. |
| `brand-ink` | #FAF4EC | Text on brand fills. |
| `brand-subtle` / `brand-subtle-ink` | #FCE6E0 / #551A0C | Tinted panels, recommended-column highlight, tags. |
| `accent` | #C18E3D | Ochre. Rules, strata ornament, chart fills. **Never text on a light surface** (2.5:1). |
| `accent-strong` | #7A5200 | Ochre when it must carry an icon or text. |
| `focus-ring` / `focus-ring-offset` | #221F1A / #FAF4EC | See 5, Focus. |
| `positive` / `-surface` / `-border` / `-ink` | #005243 / #EFF7F5 / #368874 / #00261E | Agave. Success, "you are covered", "keep what you have". |
| `notice` / `-surface` / `-border` / `-ink` | #715700 / #FAF5E9 / #947202 / #291D00 | Amber. Renewals, deadlines, things worth a look. |
| `critical` / `-surface` / `-border` / `-ink` | #610010 / #FFF2F1 / #CC3C44 / #430007 | Crimson. Gaps, errors, invalid input. |

### Rules

- **Text is `ink` or `ink-muted`.** Brand is for links and the occasional heading kicker. Headlines are not brand-coloured.
- **Brand is the only saturated fill.** One primary button per view. Large brand-coloured areas are for the footer band, the hero on the home page, and nothing else.
- **Ochre is ornament.** Strata rules, the recommended-column marker, chart series. It fails contrast as text and must not be used as text, ever.
- **Status is never colour alone.** Every positive, notice or critical element carries an icon and a leading word ("Coverage gap.", "Renewal in 21 days."). The three state colours also sit on a lightness ladder (notice lightest, critical darkest) so they stay apart under colour-vision deficiency; the audit enforces the ladder and the guide enforces the icon.
- **Critical is never a solid fill.** Destructive buttons are outlined in `critical`. A solid crimson button next to a solid hematite button is a mistake waiting to happen.
- **Brand is not a status.** Do not use brand colour to mean "selected" or "correct"; use `brand-subtle` for selection and `positive` for correctness.
- **Tinted state surfaces are backgrounds, not signals.** `positive-surface` and `notice-surface` are nearly the same colour by design; the border, icon and word carry the state.

---

## 3. Typography

Two families, both variable, both self-hosted from `fonts/` via `dist/fonts.css`, both SIL Open Font License (see `LICENSES.md`).

- **Archivo** — display, headings, UI, navigation, tables, forms. Axes: weight 100–900, width 62–125.
- **Source Serif 4** — long-form body copy. Axes: weight 200–900, optical size 8–60 (`font-optical-sizing: auto` is set on `:root`; leave it).

### Scale

Minor third, ratio 1.2, base 17 px, rounded to whole pixels. Each step carries its own line-height and letter-spacing. Use the step, not a size.

| Step | Size | Line | Tracking | Family, weight | Use |
|---|---:|---:|---:|---|---|
| `caption` | 12 px | 1.4 | 0.01em | Archivo 500 | Captions, table footnotes, legal lines. Never smaller. |
| `small` | 14 px | 1.5 | 0 | Archivo 400 | UI text, table cells, form help. |
| `body` | 17 px | 1.6 | 0 | Source Serif 4 400 | Paragraphs. |
| `lead` | 20 px | 1.55 | 0 | Source Serif 4 400 | Article intros. |
| `title-sm` | 24 px | 1.3 | −0.005em | Archivo 600 | h4, card titles. |
| `title` | 29 px | 1.25 | −0.01em | Archivo 600 | h3. |
| `title-lg` | 35 px | 1.2 | −0.012em | Archivo 600 | h2. |
| `headline` | 42 px | 1.12 | −0.015em | Archivo 640, width 112 | h1 on content pages. |
| `display` | 51 px | 1.06 | −0.02em | Archivo 660, width 112 | Home and hub heroes. |
| `display-lg` | 61 px | 1.02 | −0.022em | Archivo 680, width 112 | Rare. |

Tailwind: `text-body`, `text-headline` etc. set size, line-height, tracking and weight together. Family is set separately (`font-serif` for body and lead, `font-sans` for everything else). `headline` and above add `font-stretch: var(--dp-width-display)` (112 %), which is the slightly extended cut that echoes the bands. Nothing below `headline` is extended.

```css
h1 { font: var(--dp-text-headline-weight) var(--dp-text-headline-size) / var(--dp-text-headline-line-height) var(--dp-font-sans);
     letter-spacing: var(--dp-text-headline-letter-spacing); font-stretch: var(--dp-width-display); }
```

### Measure

Body text is capped at `--dp-measure-body` (68ch). Articles on this site run to 1,800 words; a wider column is unreadable and a narrower one is a leaflet. `measure-narrow` (45ch) is for sidebars and form help. `measure-wide` (84ch) is for tables and code only, never running prose.

### Figures

Any numeric content, meaning limits, deductibles, premiums, dates in tables, percentages, comparison columns, uses tabular figures: `font-variant-numeric: tabular-nums` (utility `tabular`). Both families ship `tnum`. Right-align numeric columns. Do not put currency in a proportional-figure font in a table; the columns will not line up and the site will look like it cannot count.

### Other rules

- Headings are sentence case. Not Title Case, not ALL CAPS, except the `caption`-sized kicker above an article title, which is uppercase with 0.08em tracking.
- Italic is Source Serif 4 italic in body copy for emphasis and titles of works. No italic in Archivo UI text.
- No text below 12 px. No text in `accent`. No text lighter than `ink-muted` on a light surface.
- Links in body copy are `brand`, underlined, `text-underline-offset: 3px`, 1 px thickness. Links in UI (nav, cards) are not underlined until hover.

---

## 4. Layout, radius, elevation, motion

**Space.** 4 px base: `--dp-space-{0,1,2,3,4,5,6,8,10,12,16,20,24,32}` = 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 px. Tailwind's spacing scale is set to the same base so `p-4` is 16 px. Section rhythm on content pages is 64 px between sections and 24 px between blocks.

**Radius, by role, not size.** `radius-control` 2 px for buttons, inputs, tags. `radius-surface` 4 px for cards, panels, images, table containers. `radius-pill` for status dots and counters only. This is a hard-edged system; pill buttons and 12 px card corners are off-brand.

**Elevation.** Four steps, warm-tinted (`neutral.900` at low alpha): `shadow-0` resting cards, `shadow-1` hover and menus, `shadow-2` popovers and sticky headers, `shadow-3` modals and drawers. Cards get `shadow-0` plus a 1 px `border`; the border does the work and the shadow is a hint. Nothing else casts a shadow.

**Motion.** Durations `fast` 120 ms (hover, focus, colour), `base` 200 ms (reveals, menus, accordions), `slow` 320 ms (drawers, modals), `deliberate` 480 ms (page-level, rare). Easing `standard` cubic-bezier(0.2, 0, 0, 1) for anything that moves, `enter` and `exit` for things appearing and leaving. Under `prefers-reduced-motion: reduce` every duration token becomes 0 ms, which is emitted in `tokens.css`; use the tokens and reduced motion is handled. Nothing on this site moves for decoration: no parallax, no auto-playing carousels, no number counters.

---

## 5. Components

The brand sheet renders every state below; match it.

**Buttons.** 44 px minimum height, `radius-control`, Archivo 600 at `small` size, 20 px horizontal padding. Primary: `brand` fill, `brand-ink` text, `brand-hover` and `brand-active` on interaction. Secondary: transparent, `ink` text, 1 px `border-strong`, `surface-sunken` on hover. Quiet: brand text, no border, underline on hover. Destructive: transparent, `critical` text and 1 px `critical` border, `critical-surface` on hover; never a solid fill. Disabled: 45 % opacity, `cursor: not-allowed`, and the button stays in the tab order with `aria-disabled` if it is temporarily disabled.

**Focus.** Every interactive element: `outline: 2px solid var(--dp-focus-ring); outline-offset: 2px; box-shadow: 0 0 0 2px var(--dp-focus-ring-offset)` (utility `focus-ring`), on `:focus-visible`. The ring is ink-dark; the halo is surface-light; together they pass 3:1 against every surface and against a brand button, which a single-colour ring cannot. Do not remove outlines. Do not replace with a colour change alone.

**Inputs.** 44 px minimum height, `surface-raised` fill, 1 px `border-strong`, `radius-control`, `ink` text at `body` size in Archivo. Invalid: 2 px `critical` border plus an error line in `critical`, Archivo 600, `caption` size, with the field described by `aria-describedby`. Labels above, Archivo 600, `small`. Help text below in `ink-muted`.

**Checkbox and radio.** 20 px, `border-strong`, checked state fills `brand` with a `brand-ink` check. Radio is the one place `radius-pill` touches a control.

**Callouts.** 1 px border in the state's `-border`, 4 px left border, `-surface` fill, `-ink` text, `radius-surface`, a 22 px stroked icon in the state colour, and a bold leading sentence. Positive uses a circled check, notice a triangle, critical a circled cross. These three icons are the only status glyphs; do not add colour-only badges.

**Tags.** `brand-subtle` fill, `brand-subtle-ink` text, `caption` size uppercase with 0.02em tracking, `radius-control`. Tags are labels, not buttons.

**Tables.** Header row on `surface-sunken`, `caption`-size uppercase labels in `ink-muted`. Rows separated by 1 px `border`. Numeric columns right-aligned and tabular. A recommended column is highlighted with `brand-subtle` and says "recommended" in its header; it is not just a colour. Totals row has a 2 px `ink` top rule. Tables wider than the measure scroll horizontally inside their own container; the page never scrolls sideways.

**Strata ornament.** A 64 × 10 px block of 3 px `brand` bands with 2 px gaps, as a section divider in long articles. That is the only ornament. Do not build patterns, backgrounds or borders out of the mark.

**Comparison layouts and data.** Chart series use `brand`, `accent`, `ink-muted`, then `positive` and `notice` in that order. Never critical as a series colour. Every chart has a text alternative.

---

## 6. Logo

Files and tests are in `logos/` and `LOGO-TESTS.md`; the rules there are normative. In short:

- **Primary lockup** is `logo-horizontal.svg`. Use `logo-stacked.svg` where the width is under about 200 px. Use `mark.svg` alone at 24 px and above where the name appears elsewhere. Use `favicon.svg` (the three-band variant) at 24 px and below.
- **Reversed** (`logo-reversed.svg`) on `surface-inverse`, on brand fills, and on photography only over a solid panel. **Mono** (`logo-mono.svg`) inherits `currentColor` for print, stamps and one-colour contexts.
- **Clear space** is one band period (P, the height of one band plus one gap, 0.237 × the mark's height) on all sides. **Minimum sizes**: mark 24 px / 6 mm, horizontal lockup 36 px / 10 mm, stacked 72 px / 20 mm, wordmark 28 px / 8 mm. Below the lockup minimum use the mark alone.
- The mark sits on the left of the wordmark and the up-thrown block is on the right. Do not mirror it.
- In the site header, the lockup is 40 px tall on desktop and 32 px on mobile (mark alone below 360 px viewports).
- Inline the SVG in React; do not reference it as an `<img>` where it must inherit colour. The files have `<title>` elements; keep them.

**Misuse.** Do not:
- stretch, skew, rotate or mirror any file;
- recolour the mark or type (the only colours are brand, ink, neutral-50, and `currentColor`);
- add shadows, gradients, outlines, glows, bevels or any effect;
- place any file on a photograph or pattern without a solid panel behind it;
- rebuild the lockup by hand, retype the wordmark in Archivo, or change the spacing between mark and type;
- crop the mark, use fewer or more bands than the files have, or widen the fault gap;
- use the mark as a pattern, a bullet, a background or an icon for something other than the company;
- put it inside a shield, a circle or a badge;
- place it closer than one P to a carrier logo, a rule or the edge of anything.

---

## 7. Voice and tone

Inherited from the legacy practice and worth keeping: coverage is a finding, not a pitch; the analysis costs nothing; if keeping what you have is right, that is the answer you get. The site is written by people who do the math and tell you the result.

- **Say what the product does.** Mechanism over reassurance. A reader should finish a paragraph knowing something they did not know.
- **Numbers are specific or absent.** "Most carriers require $250,000 per person underlying" is a sentence. "Significant savings" is not.
- **Recommend, and say when the recommendation is to do nothing.** That is the brand's whole distinction. Use it.
- **Plain words.** Policy, limit, deductible, premium, claim. Not "solution", "peace of mind", "protect what matters most", "coverage tailored to your unique needs".
- **No urgency theatre.** No exclamation marks, no countdowns, no "don't wait".
- **Never invent facts.** No founding year, tagline, award, license number or carrier appointment unless the client supplied it in writing. The legacy site's award belongs to the old entity and the old plan year and does not transfer.

Three sentences of the kind every insurance site has, rewritten:

| Before | After |
|---|---|
| Don't wait! Get a FREE quote today and save up to 40% on your auto insurance! | We compare your current auto policy against the carriers we represent. It costs nothing, and if what you have is the best option, we say so. |
| We offer comprehensive, customized insurance solutions tailored to your unique needs and peace of mind. | We write auto, home, renters, umbrella, life and small-commercial coverage in Arizona, Nevada, Utah and Idaho. |
| Protect what matters most with the right coverage for you and your loved ones. | An umbrella policy pays after your auto or home liability limit is used up. Most carriers require $250,000 per person on the auto policy before they will write one. |

Page-level: headlines are statements, not questions. Buttons name the action ("Request the analysis", "Compare limits"), not "Get started" or "Learn more". Error messages say what to do ("Enter a five-digit ZIP code."). Legal and licensing text is set in `caption` and is not hidden.

---

## 8. Photography and illustration

**Photography.** Documentary, not aspirational. Real places in the four states under hard horizontal light: basins, exposed strata, roads, town streets, the buildings people actually insure. Cities on the site's location pages get their own photograph of that city, not a stock desert. People appear as they are, at work or at home, not posed. Colour grading stays warm and low-contrast so photographs sit inside the palette; no teal-and-orange, no HDR skies.

Avoid: stock handshakes, stock families on lawns, laptops with coffee, sunsets and sunset gradients, saguaro silhouettes, anyone pointing at a whiteboard, a house with a giant umbrella over it, anything that would look at home in a lead-generation ad.

**Illustration.** Diagrammatic. Strata bands, rules, tables, contour and section drawings, in `brand`, `accent`, `ink` and `ink-muted` on `surface`. Line weight 2 px at 1×. No mascots, no isometric people, no rounded-blob illustration systems, no icons with gradients. Icons are 24 px, 2 px stroke, round caps and joins, `currentColor`, drawn on a 24-unit grid; use one consistent set.

**Carrier logos** appear only in a partner row, only as the carriers' own licensed files, at cap-height parity with one another, in their own colours or all in grayscale, never recoloured to brand, with one P of clear space from the Desert Peak mark.

---

## 9. Do not

- Do not use a hex code. Use a role.
- Do not reference a primitive ramp step from a component.
- Do not introduce pure white, pure black or a neutral gray.
- Do not use accent (ochre) for text.
- Do not signal state with colour alone, and do not use brand colour as a state.
- Do not make a destructive button solid.
- Do not set body copy wider than 68ch or smaller than 12 px.
- Do not use proportional figures in a table.
- Do not use pill buttons or rounded-card corners larger than 4 px.
- Do not remove focus outlines.
- Do not animate for decoration or ignore `prefers-reduced-motion`.
- Do not modify, recolour, mirror or rebuild any logo file.
- Do not invent a brand fact.
- Do not skip the contrast audit.
