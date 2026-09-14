# Critique — what was removed, per template

The rule from the interface standard: before shipping a template, remove one
thing. This is what went, and why.

| Template | Removed | Why |
|---|---|---|
| Home (first build) | A "why choose us" three-column row under the hero, and a testimonials section | Superseded 2026-09-13: the table is gone and the testimonial section exists behind the consent flag; see the shell redesign table below |
| Home | The legacy site's headline sentence | It belongs to the old brand; the new one states the mechanism in our own words |
| Product hub | Per-bullet icons in the covered / not-covered lists | A coloured left rule does the same job with less noise; icons are only for status |
| Product hub | A second CTA card above the fold | One primary action per view; the sticky band on phones is the same action, not a second one |
| Coverage subpage | The intro paragraph repeated from the hub | The tabs already say where you are; repeating the lede was doorway-page behaviour |
| State hub | A state map illustration | No photograph or map of a state exists that is not a postcard; the minimums table is the memorable element |
| Product × city | The "nearby cities" grid of 13 links | Related links are limited to six with a reason each; the state page holds the full list |
| Product × city | Visible heading text inside the sticky mobile bar | Two full-width buttons are the whole bar; the heading was pushing content under it |
| Quote flow, step 1 | Thirty-six checkboxes in one list | Eleven lines with real demand first; the rest behind a disclosure |
| Quote flow | Any progress animation | "Step 2 of 4 · About you" in text is the indicator; the bar repeats it silently |
| Article | A hero image slot | There is no real photograph of the subject; the lede in serif and the strata rule carry the top |
| Glossary term | A "related terms" tag cloud | At most five links, each with a reason; the person came to read one definition and leave |
| Contact / forms | A map embed and office hours block | Both would be third-party or invented; the phone number and the form are the page |
| Partner portal | Dashboard widgets (charts) | A realtor between showings wants the statement table and the status list; nothing else |
| 404 | A "popular pages" grid | A search box and the ten lines; the redirect map makes this page rare |
| Design system | A colour-picker "playground" | The gallery is a review artifact; interactivity there is not the product |

## Shell and homepage redesign (2026-09-13)

Looked at the after-state screenshots in `docs/ux-audit/shell/after/` at
320, 768, 1280 and 1920 as a stranger would, then removed one thing from
each surface.

| Surface | Removed | Why |
|---|---|---|
| Header | The "Search" entry from the drawer's link list | The search icon already sits in the bar next to the menu button on every phone; the same destination twice in one header was noise. |
| Hero | The "Talk to Daniel" link inside the advisor panel | The panel is the advisor's statement, not a third call to action; the two CTAs above it already say what to do. The panel now ends on his sentence. |
| Footer | The legal-name line under the lockup | It is a TODO token today and, when filled, it belongs on the licensing pages and the copyright line, not twice in the footer. |
| Homepage | The product counts on the coverage cards ("All personal lines (15)") | A number that exists to look thorough. "All personal lines" says where the link goes; the hub says how many. |

Also not built, from the brief's own list: the arrow glyph on the "All …
lines" links (a `→` on every link is on the tells list; the link text
carries the direction), the middle-dot trust line and the uppercase eyebrow
(rendered as a list and a sentence instead), and a lightbox on the
recognition images (the legacy site had one; the images are legible at
their rendered size and the full-size JPEG is one click away).

## Checked against the tells list

No gradients or glass; one card kind with a border; no eyebrow labels above
`h1` (the kicker appears only on article and glossary pages, as the brand
guide allows); no arrows glued to links; no emoji icons; no fade-up
sections; no hover lift; no stock photography of any kind; no countdowns,
confirmshaming or pre-checked consent; no chat widget; no testimonials
without consent on file.
