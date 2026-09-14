# Deck fonts

Install every `.ttf` in this folder before opening the decks in PowerPoint or Keynote. The decks reference "Archivo" and "Source Serif 4" by name; without these files the applications substitute Arial and Georgia (the declared fallbacks), which keeps the text legible but is not the typesetting.

## What these files are

- `Archivo-Regular.ttf` and `Archivo-Bold.ttf` are static instances of the Archivo variable font (wdth 100 / wght 400 and 600) in which the **default digits are the tabular forms**. PowerPoint and Keynote cannot switch OpenType number spacing, and the comparison slide depends on figures that align in columns, so the tabular glyphs were copied over the default `zero`–`nine` with fontTools (`scripts/collateral/deck-fonts.py`). Nothing else in the font was changed. They are named as a classic Regular/Bold pair so the Bold toggle picks the 600 face. Archivo's OFL declares no Reserved Font Name, so the family name is kept as "Archivo"; the version string records `tabular-default`.
- `SourceSerif4-Regular.ttf`, `SourceSerif4-Bold.ttf` (the 600 weight, named Bold for the same reason) and `SourceSerif4-Italic.ttf` are static instances (opsz 17) of Source Serif 4, whose default digits are already tabular. Outlines are unmodified.
- Typographic-named tabular instances (Regular, Medium, SemiBold, Display SemiBold) for tools that select weights by name live in `brand/fonts/static/tabular/`.

## License

SIL Open Font License 1.1 for both families; the full text is in `OFL.txt` here and, with the copyright lines and the clauses that matter, in `brand/LICENSES.md`. The licence permits modification and redistribution; the modified Archivo files may not be sold on their own and must travel with this licence.
