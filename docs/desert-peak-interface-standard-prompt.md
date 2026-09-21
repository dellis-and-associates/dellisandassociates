# Project: Desert Peak Insurance — Interface Standard & UX Build

> **How to use this file.** This is the design phase the other prompts deferred.
> Run it after the content platform and page layer exist. It governs every surface:
> the public site, the quote flow, the partner portal, and the themed Payload admin.
>
> A note on the brief. The client asked for a world-class, top-tier experience.
> "World-class" is not an instruction an engineer can execute; it is an outcome that
> a specific set of measurable standards produces. This document translates the
> ambition into those standards. Every requirement below is checkable. Anything that
> cannot be checked is not a requirement, and "make it beautiful" is not on the list.

---

## Build Variables

```yaml
brand_dir:              ./desert-peak-brand
reference_viewport_min: 320px
device_baseline:        mid-range Android (Moto G class), 4× CPU throttle, Slow 4G
a11y_standard:          WCAG 2.2 AA (AAA where cheap)
cwv_targets:            LCP ≤ 1.8s · INP ≤ 100ms · CLS ≤ 0.05   # p75, mobile, stricter than Google's threshold
js_budget_content:      ≤ 60 KB gzipped on article, glossary, and location pages
js_budget_app:          ≤ 180 KB gzipped on quote flow and portal routes
lighthouse_floor:       100 / 100 / 100 / 100 on every template, mobile
spanish_support:        decision-required   # AZ and NV — raise it, do not assume
```

---

## Role

You are the design lead and frontend lead on the same team. The team's reputation
rests on interfaces that are quiet, exact, and fast — where nothing is decorative,
every element earns its place, and the person using it never has to think about
the interface at all. The site sells a product people buy under mild stress and
rarely understand. The best thing the interface can do is get out of the way,
make the next step obvious, and never make anyone feel stupid.

Hold two standards at once: the **quality floor** (accessibility, performance,
robustness — non-negotiable, gated by CI) and the **quality ceiling** (taste,
restraint, coherence — gated by critique). Most work fails the ceiling by trying too
hard, not too little.

---

## Part I — The quality floor (gated by CI)

### Accessibility — WCAG 2.2 AA, verified

- Zero axe-core violations on every template, every breakpoint. Automated tools
  catch roughly a third of real issues, so this is the entry ticket, not the exam.
- The 2.2 criteria that most builds miss, each verified explicitly: focus never
  obscured by sticky headers or banners; pointer targets ≥ 24×24 CSS px with spacing;
  any drag interaction has a non-drag alternative; help and contact links appear in
  a consistent position on every page; no field asks for information the person
  already entered in the same flow.
- Keyboard-only walkthrough of the full quote flow and the partner portal, recorded
  as a screen capture and committed to `A11Y-REPORT.md`. Focus order matches visual
  order. Focus is visible on every interactive element against every background it
  can sit on — use the brand `focus-ring` token, never `outline: none` without a
  replacement.
- Screen reader pass on the ten highest-traffic templates with VoiceOver (iOS) and
  NVDA (Windows). Landmarks, heading outline, form labels, live regions for async
  state, and error announcement all verified by listening, not by reading the DOM.
- Colour is never the only carrier of meaning. Status, validation, and chart
  distinctions have a second channel — icon, text, pattern, or position.
- Reduced motion respected globally. Motion is opt-in for the OS setting, not
  opt-out.
- Zoom to 400% with no loss of content or function; text spacing overrides do not
  break layout.

### Performance — budgets enforced, measured in the field

- Core Web Vitals at the targets above, at p75 on mobile, measured by real-user
  monitoring via `web-vitals` reporting to an endpoint you own. Lab numbers are for
  development; field numbers are the truth.
- `PERFORMANCE-BUDGET.json` enforced by Lighthouse CI on every PR: JS, CSS, image,
  and font budgets per route group, plus timing budgets. A PR that busts a budget
  fails, and the failure message says by how much.
- Content pages (articles, glossary, locations — the vast majority of 1,068 routes)
  ship as close to zero client JavaScript as the framework allows. Interactivity
  there is progressive enhancement over working HTML.
- Fonts: the brand's variable fonts, self-hosted, subset to used glyph ranges,
  `font-display: swap` with size-adjust metrics tuned so the fallback does not shift
  layout. Two files maximum.
- Images: AVIF with WebP fallback, explicit `width`/`height` on every image, `sizes`
  attributes that reflect actual rendered widths, priority hint on the LCP element
  and lazy loading on everything below the fold. No hero image larger than the
  viewport it serves.
- No layout shift from anything that loads late: skeletons match final dimensions,
  ads and embeds do not exist, third-party scripts are audited individually and
  justified in `THIRD-PARTY.md` or removed.
- Lighthouse 100 across all four categories on every template on mobile is the
  floor. Report the run, not the intention.

### Robustness

- Every page renders correctly with JavaScript disabled, then gets better with it.
- Every async state is designed: loading, empty, error, partial, offline. None fall
  through to a spinner or a blank region.
- Forms never lose data — on validation error, on back navigation, on a dropped
  connection. The quote flow persists progress and offers resume.
- No horizontal scroll at any viewport from 320px up. Long words, long URLs, long
  product names, long Spanish strings if enabled — all wrap.
- Print stylesheet for articles, glossary terms, coverage pages, and the quote
  summary. Insurance customers print things.
- Works on the device baseline without jank. Test on that throttle profile, not on
  the development machine.

---

## Part II — The quality ceiling (gated by critique)

### Start from the person, not the page

Before styling anything, write `UX-MODEL.md`: for each of the ~12 page templates,
who arrives, from where, in what state of mind, what they are trying to do, what
the single primary action is, and how you will know it worked. A location page
visitor typed "auto insurance Chandler AZ" into a phone at a dealership. A glossary
visitor is confused and mildly embarrassed. A partner-portal user is a realtor
checking whether last month's referrals paid out. Design for those three people,
not for "users."

### The interface vocabulary

A small, finished design system beats a large, loose one. Target roughly 25
components — buttons, inputs, selects, combobox, checkbox and radio groups, table,
comparison table, card (one kind), callout, breadcrumb, pagination, tabs, accordion,
dialog, toast, skeleton, empty state, stepper, progress, badge, tooltip, nav,
footer, CTA band. Every component renders every state — default, hover, focus,
active, disabled, loading, error, empty — in a `/design-system` gallery route
(`noindex`) built from real content, not lorem. That gallery is the review artifact
and the regression baseline.

Everything is composed from brand tokens. The `verify:tokens` rule from the platform
prompt applies: no hex, no arbitrary values, no one-off spacing.

### Typography does the heavy lifting

The brand scale is the scale; do not add steps. Body measure 65–75ch. Headings
carry hierarchy by size and weight, not by colour, caps, or eyebrow labels.
Tabular figures on every number that sits in a column. Coverage limits, deductibles,
and dollar amounts are set so they align and can be compared at a glance — that is
most of what an insurance comparison table is for.

### Restraint as the signature

Spend boldness in one place per template and keep everything else quiet. The
memorable element on a location page might be a precise, data-rich local risk
panel; on the quote flow it is probably nothing — the flow's whole virtue is
disappearing. Before shipping any template, remove one thing.

**Tells that mark an interface as generated rather than designed — all prohibited:**

- Glassmorphism, gradient washes as decoration, gradient text, mesh backgrounds.
- The SaaS card kit: identical rounded cards with the same soft grey shadow on
  everything regardless of hierarchy.
- Tracked-out ALL-CAPS eyebrow labels above headings; meta strings joined with
  middle dots; a `→` glued onto every link.
- A single word in a headline coloured or italicised for emphasis.
- Emoji as icons. Icon-only buttons without labels. Three-icon feature rows.
- Fade-and-slide-up on every section; hover lift on every card; bouncing scroll
  cues; auto-playing carousels; parallax.
- Stock handshakes, stock families on lawns, stock agents pointing at laptops.
- Fake urgency, countdown timers, "only 3 spots left," confirmshaming, pre-checked
  consent boxes, hidden unsubscribe, chat widgets that cover the primary CTA,
  cookie banners that block content. These are dark patterns and some are illegal
  in this category. None ship.
- Testimonials that are not real, named, and consented.

### Motion

Motion answers an action: open, expand, confirm, move. It shows what changed and
where it went. Durations 120–200ms for micro-interactions, transform and opacity
only, never properties that trigger layout. Page-to-page transitions use the View
Transitions API where supported and degrade to nothing. One orchestrated moment per
site is enough — if there is one at all.

### Copy is interface

Sentence case. Active voice. Buttons say what happens: "Get my quote," not
"Submit." The same action keeps the same name through the flow. Errors say what
went wrong and how to fix it, in plain words, without apologising and without blame.
Empty states point at the next step. Plain-language insurance: if a sentence needs a
glossary term, link the term rather than simplify it into inaccuracy. Every string
in the quote flow is reviewed against a reading-level target of roughly grade 8.

### Navigation for a thousand pages

The IA is the product's map and the person should always know where they stand:
breadcrumbs everywhere below the top level, a restrained primary nav with product
categories and a state→city path to any location, a site search with typeahead
across products, locations, and glossary, and related-links blocks on every content
page. No mega-menu that lists 380 cities. Depth is fine; disorientation is not.

### The quote flow is the whole business

Treat it as its own product. Multi-step with a visible, honest progress indicator.
Inline validation on blur, not on keystroke; an error summary at the top on submit
that links to each field. Correct `autocomplete`, `inputmode`, and `type` on every
field so phones open the right keyboard. Address autocomplete. Ask only what the
next step needs; never ask twice. Save and resume. A summary step that shows
everything entered, editable in place. Consent language is exact, unmissable, and
never pre-checked. The whole thing is usable one-handed on a 320px phone with a
thumb. Record a session on the device baseline and watch it.

### Portals meet the same bar

The partner portal and the themed Payload admin are not internal tools where
quality relaxes. A realtor checking referral status on a phone between showings
gets the same standard as a prospect. Same tokens, same components, same
accessibility gate.

---

## Part III — Process

1. **Audit first.** Screenshot every template at 320, 768, 1280, and 1920 on the
   device baseline. Run axe and Lighthouse. Write `UX-AUDIT.md` with findings per
   template, ordered by severity and by traffic. Do not fix anything yet.
2. **Model the person** — `UX-MODEL.md`, as above.
3. **Plan the system** — one page in `UI-PRINCIPLES.md`: the layout concept in
   prose and ASCII wireframes, alignment rules, what the memorable element per
   template is, and what is deliberately quiet. Then review it against the tells
   list: if any part reads like the default you would produce for any insurance
   site, revise it and say what changed.
4. **Build the design system** and its gallery route. Review it in the gallery
   before touching a single page template.
5. **Rebuild templates** highest-traffic first: quote flow, product hubs, location
   pages, articles, home. Screenshot after each; compare against the audit.
6. **Critique pass.** Look at every template as a stranger would. Remove one thing
   per template. Check the tells list again. Record what you removed.
7. **Verify** — Part I gates, all green, evidence committed.

Take screenshots throughout and look at them. Reading DOM is not reviewing an
interface.

---

## Definition of done

```
pnpm lint && pnpm typecheck && pnpm test
pnpm verify:tokens              # zero hardcoded design values
pnpm test:a11y                  # axe: zero violations, every template, every breakpoint
pnpm test:visual                # Playwright screenshots at 4 breakpoints, matched to baseline
pnpm lhci                       # 100/100/100/100 mobile, budgets in PERFORMANCE-BUDGET.json honoured
pnpm test:nojs                  # every template renders and links without JavaScript
pnpm test:quote-flow            # keyboard-only end-to-end, data persists across errors and back
```

Committed evidence:

```
UX-AUDIT.md            # before state, per template, screenshots linked
UX-MODEL.md            # who arrives, why, primary action, success signal — per template
UI-PRINCIPLES.md       # the plan, and what was revised away from the default
A11Y-REPORT.md         # screen reader and keyboard findings, with recordings
PERFORMANCE-BUDGET.json
THIRD-PARTY.md         # every external script, why it exists, what it costs
DEVICE-MATRIX.md       # what was tested on what, with results
/design-system         # gallery route, every component, every state, real content
```

And a short `CRITIQUE.md`: for each template, the one thing you removed and why.
That file is the difference between an interface that was designed and one that was
merely built.
