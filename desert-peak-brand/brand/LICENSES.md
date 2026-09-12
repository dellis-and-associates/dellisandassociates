# Font licenses

Both families ship in `brand/fonts/` as Latin-subset variable WOFF2 files, self-hosted by the site. Neither is loaded from Google Fonts or any CDN at runtime; `dist/fonts.css` points at the local files and `brand-sheet.html` embeds them. Licensing was verified from the license file in each foundry's repository (not assumed from the font's presence on Google Fonts), retrieved 2026-09-12. Both files carry the identical SIL Open Font License 1.1 text below their copyright line; the two bodies were diffed and match.

| Family | Use | Copyright line (verbatim) | License | Source |
|---|---|---|---|---|
| Archivo | Display, headings, UI, tables | `Copyright 2020 The Archivo Project Authors (https://github.com/Omnibus-Type/Archivo)` | SIL Open Font License 1.1 | https://github.com/Omnibus-Type/Archivo/blob/master/OFL.txt (mirror used for the files: https://github.com/google/fonts/tree/main/ofl/archivo) |
| Source Serif 4 | Long-form body | `Copyright 2014 The Source Serif 4 Project Authors (https://github.com/adobe-fonts/source-serif)` | SIL Open Font License 1.1 | https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md (mirror used for the files: https://github.com/google/fonts/tree/main/ofl/sourceserif4) |

## What the license permits, in the license's own words

The clauses that matter for a commercial website that self-hosts and subsets the fonts:

> PERMISSION & CONDITIONS
> Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:

> 1) Neither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself.

> 3) No Modified Version of the Font Software may use the Reserved Font Name(s) unless explicit written permission is granted by the corresponding Copyright Holder. This restriction only applies to the primary font name as presented to the users.

> 5) The Font Software, modified or unmodified, in part or in whole, must be distributed entirely under this license, and must not be distributed under any other license. The requirement for fonts to remain under this license does not apply to any document created using the Font Software.

## What that means for this repository

- Self-hosting for a commercial site is permitted ("use … embed … redistribute").
- Subsetting is a Modified Version. That is permitted. The subset files in `brand/fonts/` are renamed (`archivo-variable.woff2`, `source-serif-4-variable.woff2`) and do not present a Reserved Font Name as their primary name; the `font-family` names used in CSS ("Archivo", "Source Serif 4") are how the fonts are referenced, which the OFL FAQ treats as acceptable, but if counsel prefers, the `@font-face` family names can be changed to any other name with no other effect. Source Serif 4 reserves the name "Source"; Archivo's OFL file declares no Reserved Font Name.
- The font files may not be sold on their own. They are distributed here only as part of the brand package.
- A copy of this license must accompany the font files wherever they are redistributed. This file, and the verbatim license below, satisfy that for the repository; the site build should ship `LICENSES.md` alongside `brand/fonts/`.
- Documents and pages set in these fonts are not affected by the license.

## Full license text (verbatim, from the Archivo OFL.txt; the Source Serif 4 text is identical below its copyright line)

> Copyright 2020 The Archivo Project Authors (https://github.com/Omnibus-Type/Archivo)
>
> This Font Software is licensed under the SIL Open Font License, Version 1.1.
> This license is copied below, and is also available with a FAQ at:
> http://scripts.sil.org/OFL
>
>
> -----------------------------------------------------------
> SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
> -----------------------------------------------------------
>
> PREAMBLE
> The goals of the Open Font License (OFL) are to stimulate worldwide
> development of collaborative font projects, to support the font creation
> efforts of academic and linguistic communities, and to provide a free and
> open framework in which fonts may be shared and improved in partnership
> with others.
>
> The OFL allows the licensed fonts to be used, studied, modified and
> redistributed freely as long as they are not sold by themselves. The
> fonts, including any derivative works, can be bundled, embedded, 
> redistributed and/or sold with any software provided that any reserved
> names are not used by derivative works. The fonts and derivatives,
> however, cannot be released under any other type of license. The
> requirement for fonts to remain under this license does not apply
> to any document created using the fonts or their derivatives.
>
> DEFINITIONS
> "Font Software" refers to the set of files released by the Copyright
> Holder(s) under this license and clearly marked as such. This may
> include source files, build scripts and documentation.
>
> "Reserved Font Name" refers to any names specified as such after the
> copyright statement(s).
>
> "Original Version" refers to the collection of Font Software components as
> distributed by the Copyright Holder(s).
>
> "Modified Version" refers to any derivative made by adding to, deleting,
> or substituting -- in part or in whole -- any of the components of the
> Original Version, by changing formats or by porting the Font Software to a
> new environment.
>
> "Author" refers to any designer, engineer, programmer, technical
> writer or other person who contributed to the Font Software.
>
> PERMISSION & CONDITIONS
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of the Font Software, to use, study, copy, merge, embed, modify,
> redistribute, and sell modified and unmodified copies of the Font
> Software, subject to the following conditions:
>
> 1) Neither the Font Software nor any of its individual components,
> in Original or Modified Versions, may be sold by itself.
>
> 2) Original or Modified Versions of the Font Software may be bundled,
> redistributed and/or sold with any software, provided that each copy
> contains the above copyright notice and this license. These can be
> included either as stand-alone text files, human-readable headers or
> in the appropriate machine-readable metadata fields within text or
> binary files as long as those fields can be easily viewed by the user.
>
> 3) No Modified Version of the Font Software may use the Reserved Font
> Name(s) unless explicit written permission is granted by the corresponding
> Copyright Holder. This restriction only applies to the primary font name as
> presented to the users.
>
> 4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
> Software shall not be used to promote, endorse or advertise any
> Modified Version, except to acknowledge the contribution(s) of the
> Copyright Holder(s) and the Author(s) or with their explicit written
> permission.
>
> 5) The Font Software, modified or unmodified, in part or in whole,
> must be distributed entirely under this license, and must not be
> distributed under any other license. The requirement for fonts to
> remain under this license does not apply to any document created
> using the Font Software.
>
> TERMINATION
> This license becomes null and void if any of the above conditions are
> not met.
>
> DISCLAIMER
> THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
> OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
> COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
> DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
> OTHER DEALINGS IN THE FONT SOFTWARE.
