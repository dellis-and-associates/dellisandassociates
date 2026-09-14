# Print decisions (merged into DECISIONS.md and COLLATERAL-COMPLIANCE.md)

**Back: the mark alone, reversed, centred on a full-bleed brand field.** Not the horizontal lockup. At card scale the mark is the strongest element in the system and the name is already on the front; a lockup on the back repeats the front in a smaller size and the INSURANCE line would sit at 4 pt. The mark is 0.75 in tall (54 pt), which puts its band period P at 12.8 pt; the clear space of 1 P is exceeded on every side by more than 40 pt.

**No QR code.** Computed, not assumed: the back has 144 pt of trim height; the mark occupies 54 pt centred, leaving 45 pt above and below; a scannable QR needs ≥ 0.6 in (43 pt) plus its own quiet zone of 4 modules (≈ 7 pt), i.e. ≥ 50 pt, and would have to sit inside the 27 pt between the mark's clear-space boundary and the safe margin. It cannot, so there is none. The front already carries the domain, which is the same destination. If a QR is ever wanted it goes on the front, replacing the domain line, and is a separate decision.

**Front has no background fill.** The paper is the surface colour. Printing a caliche flood on a white stock would show every trim edge as a white hairline and cost a fourth colour for a tint the eye reads as paper anyway. Choose a warm-white uncoated stock (PRINT-COLORS.md) so the paper approximates `surface`; if the printer only has a cold blue-white, flood the front with `semantic · surface` and proof it.

**CMYK by Ghostscript, values read back, proof mandatory.** pdfkit draws the sRGB token colours; Ghostscript separates to DeviceCMYK with its default profile; the PRINT-COLORS.md table is parsed out of a separated swatch file so it reports what the press file contains, not a formula. Ghostscript's profile is generic; a printer-supplied ICC profile should be used to re-separate from the RGB source rather than editing the numbers. The client approves a printed proof on the chosen stock before any run.

**Crop marks are K only** (0 0 0 100), 0.5 pt, 0.25 in long, 3 pt off the trim. Registration black is wrong for a mark that only needs to exist on one plate.

**Type floor 7 pt**, asserted in the generator (the build throws below it). Name 10.5 pt, title and contact 7.5 pt, compliance line 7 pt.

**Reproducible PDFs.** pdfkit chooses font-subset tags with `Math.random`; the build seeds it, fixes CreationDate/ModDate, and writes a fixed trailer ID, so the committed files are byte-identical across builds (verified with md5).

**Stock.** Mohawk Superfine Eggshell 120 lb cover Softwhite first; Neenah Classic Crest 130 lb cover Natural White second. Uncoated for the mineral palette, heavy for a solid back. No foil, no spot UV, no rounded corners.

**Licence numbers on the card.** The compliance line reserves per-state licence numbers from `people.json` (TODO tokens today). Research on 2026-09-13 found no statute or rule in AZ, ID, NV or UT that requires a producer's licence number on business cards (details and citations in COLLATERAL-COMPLIANCE.md); counsel confirms before print. Nothing is invented: if a state does not require the number and the client prefers a cleaner card, the line can drop to "Licensed in AZ, ID, NV, UT" per state.
