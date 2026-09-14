"""
Static fonts for the decks. PowerPoint and Keynote cannot switch OpenType number spacing, and
Archivo's default digits are proportional, so the tabular digit forms are copied over zero..nine
(the GSUB 'tnum' targets), then the fonts are named as a classic four-style family so the Bold
toggle picks the SemiBold (600) face. Family names stay "Archivo" and "Source Serif 4": Archivo's
OFL declares no Reserved Font Name; the Source Serif 4 files are unmodified apart from style naming.
Called by build-decks.ts only when the outputs are missing.

Usage: python deck-fonts.py <Archivo[wdth,wght].ttf> <SourceSerif4[opsz,wght].ttf> <SourceSerif4-Italic[opsz,wght].ttf> <tabular-out-dir> <decks-fonts-dir>
"""
import os, shutil, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

archivo, serif, serif_it, tab_out, deck_out = sys.argv[1:6]
os.makedirs(tab_out, exist_ok=True); os.makedirs(deck_out, exist_ok=True)
DIGITS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

def tnum_map(font):
    gsub = font["GSUB"].table
    lookups = set()
    for fr in gsub.FeatureList.FeatureRecord:
        if fr.FeatureTag == "tnum": lookups.update(fr.Feature.LookupListIndex)
    m = {}
    for li in sorted(lookups):
        for st in gsub.LookupList.Lookup[li].SubTable:
            if st.LookupType == 7: st = st.ExtSubTable
            if hasattr(st, "mapping"): m.update(st.mapping)
    return m

def tabular_default(f):
    m = tnum_map(f); glyf, hmtx = f["glyf"], f["hmtx"]
    for d in DIGITS:
        t = m.get(d)
        if not t: raise SystemExit(f"no tnum target for {d}")
        glyf[d] = glyf[t]; hmtx[d] = hmtx[t]
    return sorted({hmtx[d][0] for d in DIGITS})

def name(f, legacy_family, legacy_style, typo_family, typo_style, psname, note):
    for rec in f["name"].names:
        if rec.nameID == 1: rec.string = legacy_family
        if rec.nameID == 2: rec.string = legacy_style
        if rec.nameID == 16: rec.string = typo_family
        if rec.nameID == 17: rec.string = typo_style
        if rec.nameID == 4: rec.string = f"{typo_family} {typo_style}"
        if rec.nameID == 6: rec.string = psname
        if rec.nameID == 3: rec.string = f"{psname};{note}"
    os2, head = f["OS/2"], f["head"]
    bold = legacy_style in ("Bold", "Bold Italic"); italic = "Italic" in legacy_style
    sel = os2.fsSelection & ~(1 << 0) & ~(1 << 5) & ~(1 << 6)
    if bold: sel |= 1 << 5
    if italic: sel |= 1 << 0
    if not bold and not italic: sel |= 1 << 6
    os2.fsSelection = sel
    head.macStyle = (1 if bold else 0) | (2 if italic else 0)

def inst(src, axes):
    return instantiateVariableFont(TTFont(src), axes, inplace=False)

# brand/fonts/static/tabular: typographic naming, for anything that can select a weight by name
for axes, style, ps, fn in [({"wdth": 100, "wght": 400}, "Regular", "Archivo-Regular", "Archivo-Regular.ttf"),
                            ({"wdth": 100, "wght": 500}, "Medium", "Archivo-Medium", "Archivo-Medium.ttf"),
                            ({"wdth": 100, "wght": 600}, "SemiBold", "Archivo-SemiBold", "Archivo-SemiBold.ttf")]:
    f = inst(archivo, axes); w = tabular_default(f)
    name(f, "Archivo" if style == "Regular" else f"Archivo {style}", "Regular", "Archivo", style, ps, "tabular-default")
    f.save(os.path.join(tab_out, fn)); print(fn, "digits", w)
f = inst(archivo, {"wdth": 112, "wght": 640}); w = tabular_default(f)
name(f, "Archivo Display", "Regular", "Archivo Display", "SemiBold", "ArchivoDisplay-SemiBold", "tabular-default")
f.save(os.path.join(tab_out, "ArchivoDisplay-SemiBold.ttf")); print("ArchivoDisplay-SemiBold.ttf digits", w)

# decks/fonts: classic four-style family so PowerPoint/Keynote Bold picks the 600 face
f = inst(archivo, {"wdth": 100, "wght": 400}); tabular_default(f)
name(f, "Archivo", "Regular", "Archivo", "Regular", "Archivo-Regular", "tabular-default"); f.save(os.path.join(deck_out, "Archivo-Regular.ttf"))
f = inst(archivo, {"wdth": 100, "wght": 600}); tabular_default(f)
name(f, "Archivo", "Bold", "Archivo", "SemiBold", "Archivo-SemiBold", "tabular-default;deck-bold-face"); f.save(os.path.join(deck_out, "Archivo-Bold.ttf"))
f = inst(serif, {"opsz": 17, "wght": 400}); name(f, "Source Serif 4", "Regular", "Source Serif 4", "Regular", "SourceSerif4-Regular", "deck"); f.save(os.path.join(deck_out, "SourceSerif4-Regular.ttf"))
f = inst(serif, {"opsz": 17, "wght": 600}); name(f, "Source Serif 4", "Bold", "Source Serif 4", "SemiBold", "SourceSerif4-SemiBold", "deck-bold-face"); f.save(os.path.join(deck_out, "SourceSerif4-Bold.ttf"))
f = inst(serif_it, {"opsz": 17, "wght": 400}); name(f, "Source Serif 4", "Italic", "Source Serif 4", "Italic", "SourceSerif4-Italic", "deck"); f.save(os.path.join(deck_out, "SourceSerif4-Italic.ttf"))
print("deck fonts written to", deck_out)
