# UI principles — the plan, and what was revised away from the default

## The layout concept

A well-set report, not a landing page. One page width (`measure-page`,
72 rem), a 12-column grid inside it, body copy capped at 68ch. Content pages
are one column of prose with a quiet rail on wide screens for the table of
contents, related links and the CTA. Hub pages are lists, set as tables where
the content is tabular (limits, cities, lines) and as plain link lists where
it is not.

```
┌──────────────────────────────────────────────────────────────────────┐
│ mark  Products ▾  Locations ▾  Resources        Search   801-…  [Request the analysis] │  header, 64px, sticky, shadow-2 when scrolled
├──────────────────────────────────────────────────────────────────────┤
│ Home › Insurance › Auto › Arizona › Chandler                          │  breadcrumb, small
│                                                                      │
│ Auto insurance in Chandler, Arizona                                  │  h1 headline (display on hubs only)
│ One paragraph of lede, serif, 68ch.                                  │
│                                                                      │
│ ┌──────────────────────────────┐  ┌────────────────────────────────┐ │
│ │ Local risk panel             │  │ What Arizona requires          │ │  the memorable element on a city page:
│ │ Maricopa County · monsoon…   │  │ ┌──────────┬────────┬────────┐ │ │  data set in a table, tabular figures,
│ │ …                            │  │ │ Coverage │ Min.   │ Source │ │ │  every number cited
│ └──────────────────────────────┘  │ └──────────┴────────┴────────┘ │ │
│                                   └────────────────────────────────┘ │
│ Coverage explainer (prose blocks) …                                  │
│ FAQ (details/summary, works without JS) …                            │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ Request the analysis for auto insurance in Chandler   [Request]  │ │  CTA band, brand fill, the only large brand area
│ └──────────────────────────────────────────────────────────────────┘ │
│ Related: Home insurance in Chandler · Auto insurance in Arizona …    │
├──────────────────────────────────────────────────────────────────────┤
│ footer on surface-inverse: lines · states · resources · legal        │
│ licensing line, TPMO disclaimer (Medicare pages), independent-agency │
└──────────────────────────────────────────────────────────────────────┘
```

Mobile (320–767): one column, header collapses to mark + phone + menu
(a `<details>` disclosure, no JS needed), the CTA band becomes a fixed bottom
bar only on product and location templates, 56 px, leaving the content
scrollable above it.

## Alignment rules

- Everything sits on the 4 px grid; section rhythm 64 px, block rhythm 24 px.
- Left-aligned, always. No centred hero text, no centred paragraphs.
- Numbers right-aligned in tables, tabular figures, unit in the header not
  the cell.
- One brand fill per template (the CTA band, or the home hero band).
  Everything else is `surface`, `surface-raised` with a 1 px border, or
  `surface-sunken` for table headers and wells.
- Cards exist for one thing: a product or a location entry in a list. They
  are bordered, `radius-surface`, `shadow-0`. Nothing floats.

## The memorable element per template

| Template | Bold once | Quiet everywhere else |
|---|---|---|
| Home | The split hero: the statement on the brand surface at left, the advisor panel over a faint strata device at right; the closing band is the only other brand block (revised 2026-09-13: the product table is gone, coverage is four group cards) | No feature rows, no photograph in the hero, testimonials only with written consent, carrier names as text until logos are licensed |
| Product hub | The covered / not-covered two-column list, set like a policy declarations page | No icons per bullet |
| Coverage | The comparison table with tabular limits | — |
| State hub | The statutory minimums table, every row cited to the DOI | No map graphic |
| Product × city | The local risk panel: county, hazards, housing stock, driving context, neighborhoods, from `CityFacts` | The CTA band is the only colour |
| Article | The lede in `lead` serif and the strata rule between sections | No hero image unless it is a real photograph of the place |
| Glossary term | The definition, first, in one screen, with the worked example in a bordered well | No related-term cloud |
| Quote flow | Nothing. The progress indicator is text ("Step 2 of 4 · Vehicles") and the flow disappears | No illustrations, no progress animation |
| Partner portal | The monthly statement table | No dashboard widgets |
| Admin | Payload's own chrome, recoloured from tokens; the city completeness column | — |

## Reviewed against the tells list — what changed from the first draft

- The first plan had a three-column "why us" row under the hero. Removed;
  the product table does that job with facts.
- The first plan had a background photograph on state hubs. Removed; there is
  no photograph of each state that is not a postcard, and the guide forbids
  postcards.
- Card hover lift was in the component sketch. Removed; hover is a border
  colour change (`border-strong`) only.
- The CTA band used an arrow glyph on the button. Removed; the button says
  what happens.
- Eyebrow labels above h1 on hubs were in the sketch. Removed; the breadcrumb
  is the context and the h1 carries the hierarchy.
- The glossary term page had a "related terms" tag cloud. Replaced with a
  plain list of at most five links, each with one line of why.
- Motion: the first draft animated accordion open with height. Replaced with
  native `<details>` and a 120 ms opacity on the content; no layout-property
  animation anywhere.

## What is deliberately quiet

Footer, breadcrumbs, related links, table borders, form help text, every
secondary button. If two things compete on a page, one of them is wrong.
