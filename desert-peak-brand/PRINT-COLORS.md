# Print colours

Generated 2026-09-13 by `scripts/build-print.ts`. The CMYK values are not a formula: a swatch file was drawn in the sRGB token colours and separated with the same Ghostscript command that produces the business-card PDFs (`-sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK -dOverrideICC`, Ghostscript's default CMYK profile), and the values below were read back out of that file. They are what the press files contain.

**Screen colour is not press colour.** The client must approve a printed proof on the chosen stock before any run. Ghostscript's default separation is a generic SWOP-like profile, not the printer's; if the printer supplies an ICC profile (or asks for GRACoL / FOGRA), re-separate from the RGB source with that profile rather than adjusting these numbers by hand. Uncoated stock will print darker and duller than the on-screen hematite; that is expected and is why the proof exists.

| Colour | sRGB | OKLCH | C | M | Y | K |
|---|---|---|---:|---:|---:|---:|
| semantic · surface | #FAF4EC | oklch(97% 0.013 75) | 0.4 | 3.1 | 5.9 | 0.0 |
| semantic · surface-raised | #FEFBF8 | oklch(99% 0.005 80) | 0.0 | 1.2 | 1.6 | 0.0 |
| semantic · surface-sunken | #F1EAE1 | oklch(94% 0.014 75) | 3.9 | 6.3 | 9.8 | 0.0 |
| semantic · surface-inverse | #110F0C | oklch(17% 0.008 75) | 69.4 | 66.7 | 68.2 | 82.7 |
| semantic · ink | #221F1A | oklch(24% 0.010 75) | 65.9 | 64.7 | 70.6 | 76.1 |
| semantic · ink-muted | #605A52 | oklch(47% 0.014 75) | 56.9 | 53.7 | 60.8 | 29.4 |
| semantic · ink-inverse | #FAF4EC | oklch(97% 0.013 75) | 0.4 | 3.1 | 5.9 | 0.0 |
| semantic · border | #DDD6CE | oklch(88% 0.014 75) | 11.4 | 12.5 | 16.1 | 0.0 |
| semantic · border-strong | #7C766E | oklch(57% 0.014 75) | 50.2 | 46.3 | 52.2 | 12.9 |
| semantic · brand | #923D28 | oklch(47% 0.120 35) | 27.8 | 83.1 | 92.5 | 25.5 |
| semantic · brand-hover | #742A18 | oklch(39% 0.108 35) | 32.2 | 87.5 | 97.3 | 41.6 |
| semantic · brand-active | #551A0C | oklch(31% 0.090 35) | 37.6 | 87.5 | 91.4 | 59.6 |
| semantic · brand-ink | #FAF4EC | oklch(97% 0.013 75) | 0.4 | 3.1 | 5.9 | 0.0 |
| semantic · brand-subtle | #FCE6E0 | oklch(94% 0.026 35) | 0.0 | 10.6 | 8.2 | 0.0 |
| semantic · brand-subtle-ink | #551A0C | oklch(31% 0.090 35) | 37.6 | 87.5 | 91.4 | 59.6 |
| semantic · accent | #9F6C00 | oklch(57% 0.120 76) | 31.4 | 54.9 | 100.0 | 15.3 |
| semantic · accent-strong | #5E3E00 | oklch(39% 0.082 76) | 44.7 | 64.3 | 100.0 | 47.5 |
| semantic · focus-ring | #221F1A | oklch(24% 0.010 75) | 65.9 | 64.7 | 70.6 | 76.1 |
| semantic · focus-ring-offset | #FAF4EC | oklch(97% 0.013 75) | 0.4 | 3.1 | 5.9 | 0.0 |
| semantic · positive | #005243 | oklch(39% 0.074 175) | 89.0 | 42.7 | 72.9 | 39.6 |
| semantic · positive-surface | #EFF7F5 | oklch(97% 0.010 175) | 4.3 | 0.8 | 2.7 | 0.0 |
| semantic · positive-border | #368874 | oklch(57% 0.085 175) | 77.6 | 27.1 | 61.2 | 7.8 |
| semantic · positive-ink | #00261E | oklch(24% 0.046 175) | 83.5 | 56.1 | 72.9 | 73.3 |
| semantic · notice | #715700 | oklch(47% 0.096 88) | 44.7 | 55.3 | 100.0 | 32.2 |
| semantic · notice-surface | #FAF5E9 | oklch(97% 0.016 88) | 0.8 | 2.4 | 7.5 | 0.0 |
| semantic · notice-border | #947202 | oklch(57% 0.116 88) | 37.3 | 48.6 | 100.0 | 16.1 |
| semantic · notice-ink | #291D00 | oklch(24% 0.051 88) | 60.0 | 64.3 | 80.0 | 75.3 |
| semantic · critical | #610010 | oklch(31% 0.126 22) | 34.1 | 100.0 | 87.5 | 54.1 |
| semantic · critical-surface | #FFF2F1 | oklch(97% 0.014 22) | 0.0 | 5.1 | 2.0 | 0.0 |
| semantic · critical-border | #CC3C44 | oklch(57% 0.180 22) | 13.3 | 91.4 | 74.9 | 2.7 |
| semantic · critical-ink | #430007 | oklch(24% 0.099 22) | 47.5 | 84.7 | 73.3 | 71.0 |
| primitive · brand.50 | #FEF2EF | oklch(97% 0.014 35) | 0.0 | 5.1 | 3.1 | 0.0 |
| primitive · brand.100 | #FCE6E0 | oklch(94% 0.026 35) | 0.0 | 10.6 | 8.2 | 0.0 |
| primitive · brand.200 | #F5CDC3 | oklch(88% 0.048 35) | 1.6 | 22.0 | 17.6 | 0.0 |
| primitive · brand.300 | #E6AA9B | oklch(79% 0.074 35) | 6.7 | 37.6 | 34.1 | 0.0 |
| primitive · brand.400 | #CF816D | oklch(68% 0.102 35) | 16.1 | 57.3 | 56.5 | 0.8 |
| primitive · brand.500 | #B25A44 | oklch(57% 0.120 35) | 22.4 | 73.7 | 77.3 | 10.2 |
| primitive · brand.600 | #923D28 | oklch(47% 0.120 35) | 27.8 | 83.1 | 92.5 | 25.5 |
| primitive · brand.700 | #742A18 | oklch(39% 0.108 35) | 32.2 | 87.5 | 97.3 | 41.6 |
| primitive · brand.800 | #551A0C | oklch(31% 0.090 35) | 37.6 | 87.5 | 91.4 | 59.6 |
| primitive · brand.900 | #3A0F05 | oklch(24% 0.072 35) | 48.2 | 80.0 | 77.6 | 74.1 |
| primitive · brand.950 | #220501 | oklch(17% 0.054 35) | 57.3 | 73.7 | 71.0 | 81.6 |
| primitive · neutral.0 | #FEFBF8 | oklch(99% 0.005 80) | 0.0 | 1.2 | 1.6 | 0.0 |
| primitive · neutral.50 | #FAF4EC | oklch(97% 0.013 75) | 0.4 | 3.1 | 5.9 | 0.0 |
| primitive · neutral.100 | #F1EAE1 | oklch(94% 0.014 75) | 3.9 | 6.3 | 9.8 | 0.0 |
| primitive · neutral.200 | #DDD6CE | oklch(88% 0.014 75) | 11.4 | 12.5 | 16.1 | 0.0 |
| primitive · neutral.300 | #C0B9B1 | oklch(79% 0.014 75) | 24.7 | 23.1 | 27.5 | 0.0 |
| primitive · neutral.400 | #9D978F | oklch(68% 0.014 75) | 40.0 | 35.7 | 41.2 | 1.6 |
| primitive · neutral.500 | #7C766E | oklch(57% 0.014 75) | 50.2 | 46.3 | 52.2 | 12.9 |
| primitive · neutral.600 | #605A52 | oklch(47% 0.014 75) | 56.9 | 53.7 | 60.8 | 29.4 |
| primitive · neutral.700 | #49443D | oklch(39% 0.013 75) | 60.8 | 58.4 | 65.5 | 45.9 |
| primitive · neutral.800 | #34302A | oklch(31% 0.011 75) | 63.5 | 62.0 | 69.0 | 62.7 |
| primitive · neutral.900 | #221F1A | oklch(24% 0.010 75) | 65.9 | 64.7 | 70.6 | 76.1 |
| primitive · neutral.950 | #110F0C | oklch(17% 0.008 75) | 69.4 | 66.7 | 68.2 | 82.7 |
| primitive · accent.50 | #FCF4EA | oklch(97% 0.016 76) | 0.4 | 3.1 | 6.7 | 0.0 |
| primitive · accent.100 | #F7E9D6 | oklch(94% 0.030 76) | 2.0 | 7.5 | 15.3 | 0.0 |
| primitive · accent.200 | #ECD3B0 | oklch(88% 0.054 76) | 5.9 | 16.1 | 31.8 | 0.0 |
| primitive · accent.300 | #DAB47D | oklch(79% 0.084 76) | 14.1 | 29.0 | 57.6 | 0.0 |
| primitive · accent.400 | #C18E3D | oklch(68% 0.115 76) | 22.7 | 43.9 | 91.4 | 3.1 |
| primitive · accent.500 | #9F6C00 | oklch(57% 0.120 76) | 31.4 | 54.9 | 100.0 | 15.3 |
| primitive · accent.600 | #7A5200 | oklch(47% 0.099 76) | 39.2 | 61.2 | 100.0 | 31.8 |
| primitive · accent.700 | #5E3E00 | oklch(39% 0.082 76) | 44.7 | 64.3 | 100.0 | 47.5 |
| primitive · accent.800 | #432B00 | oklch(31% 0.066 76) | 51.4 | 65.9 | 90.2 | 63.5 |
| primitive · accent.900 | #2D1B00 | oklch(24% 0.053 76) | 57.3 | 67.5 | 80.0 | 75.3 |
| primitive · accent.950 | #190C00 | oklch(17% 0.041 76) | 62.4 | 67.8 | 73.3 | 82.4 |
| primitive · positive.50 | #EFF7F5 | oklch(97% 0.010 175) | 4.3 | 0.8 | 2.7 | 0.0 |
| primitive · positive.100 | #DFF0EA | oklch(94% 0.019 175) | 11.0 | 0.4 | 8.6 | 0.0 |
| primitive · positive.200 | #C1DFD6 | oklch(88% 0.034 175) | 23.1 | 2.0 | 16.9 | 0.0 |
| primitive · positive.300 | #97C6B9 | oklch(79% 0.053 175) | 40.8 | 7.1 | 30.2 | 0.0 |
| primitive · positive.400 | #66A796 | oklch(68% 0.072 175) | 61.6 | 17.3 | 46.7 | 0.4 |
| primitive · positive.500 | #368874 | oklch(57% 0.085 175) | 77.6 | 27.1 | 61.2 | 7.8 |
| primitive · positive.600 | #0D6A58 | oklch(47% 0.085 175) | 87.1 | 36.1 | 69.4 | 23.1 |
| primitive · positive.700 | #005243 | oklch(39% 0.074 175) | 89.0 | 42.7 | 72.9 | 39.6 |
| primitive · positive.800 | #003A2F | oklch(31% 0.059 175) | 88.2 | 49.8 | 73.7 | 58.0 |
| primitive · positive.900 | #00261E | oklch(24% 0.046 175) | 83.5 | 56.1 | 72.9 | 73.3 |
| primitive · positive.950 | #00140E | oklch(17% 0.035 175) | 77.3 | 61.2 | 70.2 | 82.0 |
| primitive · notice.50 | #FAF5E9 | oklch(97% 0.016 88) | 0.8 | 2.4 | 7.5 | 0.0 |
| primitive · notice.100 | #F3EBD6 | oklch(94% 0.029 88) | 3.5 | 5.5 | 16.1 | 0.0 |
| primitive · notice.200 | #E6D6B1 | oklch(88% 0.052 88) | 9.0 | 12.5 | 33.3 | 0.0 |
| primitive · notice.300 | #D0B87E | oklch(79% 0.081 88) | 18.8 | 24.3 | 58.4 | 0.0 |
| primitive · notice.400 | #B5943E | oklch(68% 0.111 88) | 28.6 | 38.0 | 92.2 | 3.9 |
| primitive · notice.500 | #947202 | oklch(57% 0.116 88) | 37.3 | 48.6 | 100.0 | 16.1 |
| primitive · notice.600 | #715700 | oklch(47% 0.096 88) | 44.7 | 55.3 | 100.0 | 32.2 |
| primitive · notice.700 | #574200 | oklch(39% 0.080 88) | 50.2 | 59.2 | 100.0 | 47.5 |
| primitive · notice.800 | #3E2E00 | oklch(31% 0.064 88) | 55.3 | 62.4 | 90.6 | 63.5 |
| primitive · notice.900 | #291D00 | oklch(24% 0.051 88) | 60.0 | 64.3 | 80.0 | 75.3 |
| primitive · notice.950 | #170E00 | oklch(17% 0.040 88) | 63.9 | 65.9 | 73.7 | 82.4 |
| primitive · critical.50 | #FFF2F1 | oklch(97% 0.014 22) | 0.0 | 5.1 | 2.0 | 0.0 |
| primitive · critical.100 | #FFE4E2 | oklch(94% 0.030 22) | 0.0 | 12.5 | 5.9 | 0.0 |
| primitive · critical.200 | #FFC8C5 | oklch(88% 0.063 22) | 0.0 | 26.3 | 13.7 | 0.0 |
| primitive · critical.300 | #FA9D9A | oklch(79% 0.112 22) | 0.0 | 47.8 | 29.0 | 0.0 |
| primitive · critical.400 | #E76D6C | oklch(68% 0.153 22) | 3.9 | 71.8 | 50.6 | 0.0 |
| primitive · critical.500 | #CC3C44 | oklch(57% 0.180 22) | 13.3 | 91.4 | 74.9 | 2.7 |
| primitive · critical.600 | #A91228 | oklch(47% 0.180 22) | 22.4 | 100.0 | 93.3 | 15.7 |
| primitive · critical.700 | #86001A | oklch(39% 0.158 22) | 27.5 | 100.0 | 95.3 | 33.3 |
| primitive · critical.800 | #610010 | oklch(31% 0.126 22) | 34.1 | 100.0 | 87.5 | 54.1 |
| primitive · critical.900 | #430007 | oklch(24% 0.099 22) | 47.5 | 84.7 | 73.3 | 71.0 |
| primitive · critical.950 | #280002 | oklch(17% 0.074 22) | 54.9 | 76.1 | 68.2 | 80.4 |

## Stock

Two uncoated, heavy stocks suit the identity. Uncoated because the palette is mineral and matte; heavy because the back is a solid field and a light card shows through. No foil, no spot UV, no rounded corners: the mark is hard-edged and the system is quiet.

1. **Mohawk Superfine Eggshell, 120 lb cover (324 gsm), Softwhite.** The warm white sits close to the token surface colour (#FAF4EC), so the front's unprinted paper reads as the brand surface. First choice.
2. **Neenah Classic Crest, 130 lb cover (352 gsm), Solar White or Natural White.** Slightly cooler and stiffer; Natural White is the closer match. Choose it when the printer does not stock Mohawk.

The front carries no background fill; the paper is the surface. If the printer's stock is a cold blue-white, print the front on a flood of `semantic · surface` instead and proof it. The back is a full-bleed flood of `semantic · brand` with the mark reversed to paper (`semantic · brand-ink` is the paper colour, not an ink).

## Specs handed to the printer

- Trim 3.5 × 2 in landscape; 0.125 in bleed on all sides (page 3.75 × 2.25 in); 0.125 in safe margin; crop marks outside the trim; TrimBox and BleedBox set in the PDF.
- Colour: DeviceCMYK throughout, no RGB objects, no spot colours, no transparency. Crop marks are K only.
- Fonts embedded as subsets (Archivo, Source Serif 4; SIL OFL 1.1, see brand/LICENSES.md).
- Minimum type 7 pt. Back is a solid; ask for 2-side, 4/4 (or 4/1 if the printer prices the back as one colour: the back separates to a four-colour brown, see `semantic · brand` above).
