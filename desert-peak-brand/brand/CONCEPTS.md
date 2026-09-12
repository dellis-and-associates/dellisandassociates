# Desert Peak Insurance — Stage 1: Three concept directions

**Status: STOPPED AT THE STAGE 1 GATE.** Nothing below Stage 1 has been built.
Daniel and Breanna pick one direction; only that one proceeds to tokens, logos, and the guide.

Sketches: `concepts/1-mark.svg`, `concepts/2-mark.svg`, `concepts/3-mark.svg`.
They are geometry sketches, not finished logos. Concept 3's sketch uses live text and will be outlined in Stage 3.

All hex → OKLCH conversions and contrast figures in this file were computed by script
(`scripts/` will carry the real audit in Stage 2), not estimated. Contrast is WCAG 2.x relative
luminance against that direction's light surface.

---

## What the three directions argue

| | 1 · Strata | 2 · Contour | 3 · Ledger |
|---|---|---|---|
| Claim | Coverage is built in layers, and the ground here is made the same way. | We map the terrain before you cross it. | We do the math, and show our work. |
| Mark | Pictorial, geological | Notational, cartographic | Typographic, one detail |
| Temperature | Warm mineral | Map-paper brown and hydrographic blue | Ink and paper, one slate |
| Beside carrier logos | Holds its own | Holds its own at size, weak at small sizes | Quiet by design |
| Favicon | Survives with a 3-band variant | Weakest of the three | Monogram in a filled square |

---

## Direction 1 — Strata (fault-block)

**The idea in one sentence.** An insurance program is layers stacked in the right order, and Arizona, Nevada, Utah and Idaho sit in the Basin and Range province, where every peak is a block of layered rock lifted along a fault. The mark is that cross-section.

**Mark concept.** A 64×64 field of four horizontal bands (10 units tall, 4-unit gaps, 14-unit period) cut by one diagonal normal fault running from (37,0) to (27,64). The right-hand block is up-thrown by exactly half a period (7 units), so its bands interleave with the left block's gaps and its top band rises above the left block. That step is the "peak." No triangle, no sun, no outline: the profile is made entirely by the offset. The fault gap is 4 units wide (1/16 of the field) and must stay narrow; wider and the mark reads as broken rather than lifted.

Favicon variant: three bands, same fault, same half-period offset. Rendered at 16 px the two blocks and the step still read; the individual bands do not, and that is acceptable.

Extends naturally into a graphic system: strata bands as section dividers, table row striping treated as beds, the fault offset as a "before / after" or "current plan / recommended plan" device in comparison layouts.

**Palette.** Colours of the rock itself, not the postcard sky.

| Role | Name | Hex | OKLCH | Contrast on Caliche |
|---|---|---|---|---|
| ink | Basalt | `#24201D` | oklch(24.7% 0.008 59.3) | 13.87 |
| brand | Hematite | `#8A3A26` | oklch(45.3% 0.114 35.2) | 6.64 |
| surface | Caliche | `#F3EDE2` | oklch(94.8% 0.016 82.8) | — |
| accent (non-text) | Ochre | `#C9902E` | oklch(69.3% 0.129 76.5) | 2.40 |
| ink-muted | Shale | `#6E655D` | oklch(51.3% 0.017 64.1) | 4.89 |
| positive | Creosote | `#4F6B3D` | oklch(49.3% 0.077 134.0) | 5.15 |

Hematite passes AA for body text on Caliche, so brand colour can be used for links and headings without a darker "text variant." Ochre is a rule and highlight colour only; it fails as text on the light surface and must never be used that way. Notice and critical state hues are derived in Stage 2 from Ochre and Hematite with the deuteranopia check applied.

**Typography.** Archivo (display and UI, variable `wght` 100–900 and `wdth` 62–125; set headings at width 110–125 so the type shares the bands' horizontal mass) with Source Serif 4 (body and long-form, variable `wght` 200–900 and `opsz` 8–60). Both SIL Open Font License 1.1, confirmed from the license files in each foundry's repository:
- Archivo: "Copyright 2020 The Archivo Project Authors … licensed under the SIL Open Font License, Version 1.1" — https://github.com/Omnibus-Type/Archivo/blob/master/OFL.txt
- Source Serif 4: "Copyright 2014 - 2023 Adobe … with Reserved Font Name 'Source'" — SIL OFL 1.1 — https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md

Both permit bundling, embedding and redistribution with software; neither may be sold on its own; the Reserved Font Names must not be used for modified versions. Tabular figures: Source Serif 4 ships `tnum`; Archivo's `tnum` support is verified in Stage 2, and if absent, numeric tables are set in Source Serif 4.

**Where it breaks.** The fault line can read as a crack, which is the one thing an insurance brand does not want to say. The sketch keeps the gap narrow and the offset clean for that reason, and Stage 3 will test wider and narrower gaps explicitly. At 16 px the bands merge into two blocks; the shape survives, the texture does not. Set in a single dark colour on a busy photograph it turns into a barcode-like blob, so the guide will forbid placement on photography without a solid panel. It is also the most "designed" of the three and asks the most of the wordmark to stay adult rather than outdoorsy.

**Trademark sanity check (flags for counsel, not opinions).**
- Kemper's mark is a K built from layered geometric planes in an ochre colour. Our bands are horizontal rectangles, not triangles, but the overlap of "layered planes in ochre in insurance" is why Ochre is an accent here and never the mark colour.
- "Strata" is a crowded name in business services (Strata LLC, Strata Markets, Strata.ie) and in Australia, New Zealand and British Columbia "strata insurance" is a product category (condominium cover). Strata is an internal concept label only; it must not become public-facing naming or a product line name.
- Generic stacked-bar and "layers" marks are common in fintech and in the hamburger-menu icon. The diagonal fault and the half-period interleave are what separate this from those; the offset must survive every reproduction.

---

## Direction 2 — Contour (survey)

**The idea in one sentence.** An agency that reads the terrain before you cross it: the mark is the topographic notation for a summit, the way a survey quad draws a peak rather than the way a postcard does.

**Mark concept.** Four closed contour loops around a single summit, drawn as strokes in a 64×64 field, with a filled benchmark dot at the summit. Loops are rotated ellipses whose centres migrate toward the north-west as they tighten, so the contours crowd on the steep face and spread on the gentle slope, exactly as they would on a map. Alternate loops are heavier (stroke 3 vs 1.75), following the index-contour convention. The summit is a dot, not a triangle, on purpose.

Favicon variant: two loops (one heavy, one light) and the dot.

Extends into a strong system: contour rules as section ornament, hairline grids in tables, mono-spaced figures and small-caps labels as survey notation, state and city pages that literally carry a coordinate line.

**Palette.** The colours of a USGS quadrangle: contours are brown, water is blue, vegetation is green.

| Role | Name | Hex | OKLCH | Contrast on Quad Paper |
|---|---|---|---|---|
| ink | Ink | `#1F1D1B` | oklch(23.2% 0.005 67.6) | 14.65 |
| brand | Index Brown | `#7A4E1E` | oklch(46.4% 0.086 64.8) | 6.24 |
| surface | Quad Paper | `#F4EFE4` | oklch(95.3% 0.016 86.4) | — |
| accent | Hydro Blue | `#2B6D8C` | oklch(50.7% 0.082 232.1) | 4.99 |
| ink-muted | Tan | `#776653` | oklch(52.1% 0.036 70.0) | 4.81 |
| positive | Veg Green | `#536D40` | oklch(50.2% 0.074 132.9) | 5.05 |

Hydro Blue is the only blue in any of the three directions. It is a map-water blue, greyed and slightly green, and it is an accent, not the brand colour, which is how this direction avoids "insurance blue." Brown carries the brand.

**Typography.** IBM Plex Sans (display, UI and body; variable `wght`) with IBM Plex Mono (figures, labels, coordinates, tables). One superfamily, so the pairing cannot drift. Both SIL Open Font License 1.1, confirmed from the license file in IBM's repository: "Copyright © 2017 IBM Corp. with Reserved Font Name 'Plex'" — https://github.com/IBM/plex/blob/master/LICENSE.txt. Variable builds confirmed from the same repository's releases (`@ibm/plex-sans-variable`, `@ibm/plex-mono-variable` 1.0.0, weight axis 100–700). Plex Sans ships tabular figures; Plex Mono is tabular by construction.

**Where it breaks.** The sketch already shows it: nested loops read as a thumbprint or a shell as easily as a hill, and at 16 px they become a spiral smudge. That is the same problem every fingerprint-style identity mark has, and it is the reason this direction has the weakest favicon. Contour-line ornament is also the house style of outdoor gear brands, so the type and colour have to work harder to keep it from reading as a hiking outfitter. Strokes are fragile: on a fax or a rubber stamp the light loops drop out and the mark becomes two rings and a dot.

**Trademark sanity check.**
- Topo Designs and a wide set of outdoor and trail brands use contour-line marks and patterns; none are in insurance, but the visual neighbourhood is crowded.
- MikeMoore Insurance uses a shield containing mountain contour lines with an upward arrow. Ours has no shield, no arrow and no mountain silhouette, but it is the closest in-category mark found and counsel should look at it.
- Concentric closed loops with a centre dot sit near bullseye and target marks (Target Corporation most obviously) and near fingerprint marks used by identity and security companies. The asymmetric, migrating-centre geometry is what keeps this out of that set, and it must be preserved in every variant.

---

## Direction 3 — Ledger (wordmark with a total rule)

**The idea in one sentence.** The brand is a figure you can trust: a precise serif wordmark whose one graphic gesture is the double rule an accountant draws under a closed total.

**Mark concept.** No pictorial mark. "Desert Peak" set in Newsreader at a medium weight, tight tracking, above a heavy rule (2.5 units) and a hairline (1 unit) with a 3.5-unit gap, with INSURANCE letterspaced at roughly 0.3 em beneath. The double rule is the closed-total line of bookkeeping: the name is the sum, the word beneath is what it adds up to. The square mark is a "DP" monogram over the same double rule, used only where a square is unavoidable (favicon, app icon, social avatar), always in a filled square of the brand colour with the letters reversed out.

This is the answer to "should the mark be pictorial at all?" put on the record as a real option rather than rejected in a sentence.

**Palette.** Ink and paper with one slate and a little brass.

| Role | Name | Hex | OKLCH | Contrast on Paper |
|---|---|---|---|---|
| ink | Ink | `#211E1B` | oklch(23.7% 0.007 67.5) | 14.85 |
| brand | Night Basin | `#2E3A4E` | oklch(34.7% 0.039 260.5) | 10.27 |
| surface | Paper | `#F6F2EA` | oklch(96.2% 0.011 84.6) | — |
| accent (non-text) | Brass | `#A8843C` | oklch(63.3% 0.100 82.4) | 3.12 |
| ink-muted | Graphite | `#5B554F` | oklch(45.3% 0.012 67.5) | 6.58 |
| positive | Sage | `#4E7051` | oklch(51.0% 0.062 146.8) | 5.00 |

Night Basin is a desaturated slate, not navy; it is dark enough to be a button and a link without a second variant. Brass is for rules and small marks only. This is deliberately the most sober palette of the three and it depends on the type doing the work.

**Typography.** Newsreader (display and long-form body; variable `wght` 200–800 and `opsz` 6–72, so the same family sets a 64 px headline and a 17 px paragraph with different drawings) with Public Sans (UI, forms, tables; variable). Both SIL Open Font License 1.1, confirmed from the foundry repositories:
- Newsreader: "Copyright 2020 The Newsreader Project Authors" — https://github.com/productiontype/Newsreader/blob/master/OFL.txt
- Public Sans: "Copyright 2015 The Public Sans Project Authors" — https://github.com/uswds/public-sans/blob/develop/LICENSE.md. The README confirms tabular figures ("Tabular figures (monospaced numerals)" under Additional features) and ships variable fonts in `fonts/variable`, with a note that the variable builds "should be considered experimental." If Stage 2 finds them unstable, the fallback is Source Sans 3 (Adobe, SIL OFL 1.1, same license as Source Serif 4 above).

**Where it breaks.** It is quiet. In a header it is elegant; in a row beside Mutual of Omaha's lion badge and UnitedHealthcare's U it can disappear, and in a social avatar it is a two-letter monogram like ten thousand others. It leans entirely on typographic quality, so any drift (a wrong weight, a stretched export, a rebuilt lockup) is immediately visible. It also reads as a law or accounting practice as readily as an insurance agency, which is close to the intended voice but can tip into "expensive."

**Trademark sanity check.**
- "DP" monograms: DP World (logistics) owns a well-known DP monogram; the square-monogram fallback should be checked against it and the monogram kept secondary.
- Serif wordmarks are common in life and mutual insurance (New York Life, Guardian). The double rule is the distinguishing element and would need to be present in every use to carry any distinctiveness.
- Aetna and Humana are themselves wordmark-only brands. A wordmark next to a wordmark is not a conflict, but it is one reason this direction can sit flat in a partner row.

---

## Flags that apply to every direction

- **The name itself.** No business called "Desert Peak Insurance" was found. Name-adjacent agencies in the same market: Pinnacle Peak Insurance Group (Scottsdale), Desert Mountain Insurance Services (Scottsdale), Summit Insurance Advisors (Scottsdale), Pikes Peak Insurance Agency, and Desert Financial Credit Union, which has a registered mark built on the word "Desert" and a stylised D. None of this is a design conflict, but counsel should clear the name and the domain before any of these directions is built. This package does not confirm that desertpeakinsurance.com is owned by the client.
- **Carrier marks** were reviewed only to make sure nothing here echoes them: a lion in a blue badge (Mutual of Omaha), a blue U with three curves (UnitedHealthcare), a purple wordmark (Aetna), a green wordmark (Humana), a tree-of-life figure (Cigna). None of the three directions uses a badge, a U shape, a figure, a tree, purple or a saturated primary blue.
- **Legacy brand distance.** The Ellis & Associates system is evergreen, bone and copper with a D/E monogram. None of the three directions uses a green brand colour, a copper accent or a letter monogram as the primary mark; Direction 3's monogram is explicitly secondary.

## Clichés rejected on the record

Saguaro, sunset gradient, shield, umbrella, cupped hands, roofline pictogram, swoosh, checkmark, pinwheel, and the triangle-with-sun were each considered and dropped, as the brief requires. Two were close enough to name:
- A mesa profile (flat top, sharp drop) is genuinely Arizona and not a triangle, but every version drawn read as a layer cake or a bar chart. Direction 1's fault offset is what remained after removing the mesa outline.
- A survey benchmark triangle at the summit of Direction 2 is correct notation, but a small triangle above concentric rings reads as a mountain with a sun behind it at thumbnail sizes. It became a dot.

---

## Recommendation: Direction 1, Strata

Strata is the only one of the three that does all four jobs at once. It is unmistakably about this ground without a single postcard element, because Basin and Range fault-block uplift is literally how the peaks in all four licensed states were made. It carries an insurance idea, layers stacked in order with the important part lifted above the line, without a shield or an umbrella, so the brand guide can talk about coverage in the mark's own terms. It survives one colour, reversal and a fax because it is solid shapes with no strokes and no fine detail, and it has enough mass to sit beside a lion badge and a purple wordmark without borrowing from either. Contour has the best story and the best ornament system but the worst favicon, and its thumbprint problem is visible in the sketch. Ledger is the most faithful to the "we do the math" voice and I would not argue with anyone who chose it, but it asks the wordmark to do everything and gives the site nothing to build a visual system from. If Strata is chosen, the one thing to settle in Stage 3 before anything else is the fault gap: it must read as lift, never as a crack, and that is a test, not a promise.

**Waiting for a decision.** Reply with 1, 2 or 3 (or a change to any of them) and Stage 2 starts from the chosen direction only.
