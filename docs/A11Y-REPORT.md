# Accessibility report

Standard: WCAG 2.2 AA. Automated gate: axe-core on every template at 320,
768, 1280 and 1920 (`pnpm test:a11y`), plus explicit checks for the 2.2
criteria that tools miss. Results are filled in from the run recorded in
`tests/e2e/report/`; this file also records what a person must still do.

## Automated (run on 2026-09-13, Chromium, Linux)

| Check | How | Result |
|---|---|---|
| axe-core, tags wcag2a/2aa/21a/21aa/22aa/best-practice | every template × 4 widths | **zero violations**, 108/108 (27 templates × 4 widths), 2026-09-13 |
| Exactly one `h1`; `header`, `nav`, `main`, `footer` landmarks; `html[lang]` | DOM assertions per template | pass, same run |
| Skip link is the first focusable and moves focus to `main` | keyboard | pass, same run |
| Focus visible on every focusable element | tab through the first 40 focusables, read computed outline/box-shadow | pass, same run (date inputs needed a `:focus-within` ring; Turnstile's own widget is excluded) |
| Focus never obscured by the sticky header (2.4.11) | bounding box of the focused element vs header bottom | pass, same run (`scroll-padding-top` on `html`) |
| Target size ≥ 24 × 24 CSS px (2.5.8) except inline text links | measured per interactive element | pass, same run |
| Consistent help (3.2.6): a contact link in the same landmark on every page | header phone link + footer Contact link | pass, same run |
| Redundant entry (3.3.7): the quote flow never asks twice | by design: each step reads the session; the summary shows, never re-asks | `pnpm test:quote-flow` |
| Dragging (2.5.7) | no drag interactions exist on the site | n/a |
| Reduced motion | every duration token collapses to 0 under `prefers-reduced-motion` (brand tokens.css) | by construction |
| Colour never the only carrier | every status carries an icon and a leading word (Callout); tables label the recommended column | by construction, checked in the gallery |
| Zoom to 400% / text spacing | no fixed heights on text containers; `overflow-wrap: anywhere` on body | verified by hand at 400% on Chromium, home and city page: no loss of content |

## Shell and homepage redesign (2026-09-13)

Re-run after the header, footer and homepage were rebuilt: `test:a11y`
108/108 (27 templates × 4 widths), zero axe violations, focus visible and
never obscured by the 64/56 px sticky bar, targets ≥ 24 px, skip link first;
`test:nojs` 54/54. Specific to the new shell, checked by hand in Chromium:

- Search dialog: the trigger is a real link to `/search/`; with JavaScript
  it opens the native `<dialog>` with `showModal()`, so focus is trapped by
  the platform, Escape closes it, and focus returns to the trigger. ⌘K and
  Ctrl-K open it; the input is focused on open.
- Phone drawer: a `<details>`; JavaScript moves focus into it, wraps Tab and
  Shift-Tab inside it, locks page scroll, closes on Escape (focus back on
  the button) and on route change. Without JavaScript it still opens and
  closes and every link works.
- Menus: `aria-haspopup` on the summaries; Escape and an outside click
  close them; only one is open at a time.
- The trust line is a list, not a dotted string, so a screen reader hears
  three items. The advisor panel is an `aside` labelled "Your advisor".
- Recognition images carry alt text that says what the document is, who
  issued it and for which plan year; the credit line is visible text, not
  alt text only.
- The testimonial section is absent from the DOM, not hidden, while
  consent is unconfirmed.

Screen-reader passes remain owed (below); the new dialog and drawer are on
that list.

## Keyboard-only walkthroughs

- **Quote flow**, 320 px and 1280 px: `tests/e2e/quote-flow.spec.ts` drives the whole flow with Tab, Shift+Tab, Enter, Space and typing only. Focus order follows visual order; the error summary receives focus and its links focus the field; every input carries `autocomplete`, and tel/ZIP fields carry `inputmode`. The Playwright trace of the run (`tests/e2e/report/`) is the recording.
- **Partner portal**: sign-in form, portal, refer form. Same suite pattern; the portal needs a partner account, so the keyboard run against the real portal is recorded here as **owed** until an account exists (Payload first-user screen creates it).

## Screen reader passes — owed

The interface standard asks for VoiceOver (iOS) and NVDA (Windows) passes on
the ten highest-traffic templates, verified by listening. This build ran on
Linux with no access to either. What is in place for the pass: landmark
structure, a strict heading outline, labels on every form control, live
regions on the stepper and toast, error announcement through `role="alert"`
on the error summary and `aria-describedby` on invalid fields. The pass is
listed in `DEVICE-MATRIX.md` as owed and should be done on the templates in
`tests/templates.ts` in order.

## Findings and fixes during the build

- Footer and nav links measured 21 px tall: `ui-link` now sets a 24 px
  minimum height (`min-h-6`) with `inline-flex` centring.
- Links inside running text were styled as UI links (no underline): axe
  `link-in-text-block`. Fixed by leaving prose links underlined.
- `h3` inside empty states and cards directly under an `h1`: heading order.
  Both components take a heading level; the hubs use `h2`.
- Two `nav` landmarks labelled "Breadcrumb" on the gallery page: the example
  is now labelled "Example breadcrumb".
- The ochre swatch in the gallery carried ink text at 2.4:1: labelled in
  `ink-inverse`, and the swatch itself says "never text".
