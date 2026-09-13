# Device matrix

Baseline per the interface standard: mid-range Android (Moto G class),
4× CPU throttle, Slow 4G. Lab runs use that profile; field numbers come from
the RUM endpoint (`/api/rum`) once traffic exists.

| Surface | Profile | Viewports | Tool | Result |
|---|---|---|---|---|
| Every template | Chromium | 320 · 768 · 1280 · 1920 (+ print) | Playwright screenshots (`test:visual`) | 111 baselines committed in `tests/visual/__screenshots__`; a second run matched 111/111 (2026-09-13) |
| Every template | Chromium | 320 · 768 · 1280 · 1920 | axe-core + 2.2 checks (`test:a11y`) | 108/108 passed: zero axe violations on 27 templates × 4 widths, focus visible and unobscured, targets ≥ 24 px, skip link, landmarks (2026-09-13) |
| Every template | Chromium, Lighthouse mobile emulation, simulated Slow 4G + 4× CPU | 360 | Lighthouse CI (`lhci`) | 22 templates, 2026-09-13: accessibility 100 and best practices 100 on all; performance 92–96 (median 95), LCP 2.6–3.0 s, CLS ≤ 0.03 — the 100 floor is not met and is recorded as such in `BUILD-REPORT.md`; reports in `tests/lhci/` (ignored by git, uploaded by CI) |
| Every template | Chromium, JavaScript disabled | 320 · 1280 | `test:nojs` | 54/54 passed: every template renders, links and submits without JavaScript; the 404 is a full server-rendered page (2026-09-13) |
| Quote flow | Chromium, keyboard only | 320 · 1280 | `test:quote-flow` | 2/2 passed: Tab/Enter/Space only, error summary focuses the field, values survive errors, Back and reload, consent unchecked by default, confirmation with a reference (2026-09-13) |
| Ten highest-traffic templates | VoiceOver (iOS 18, Safari), NVDA (Windows 11, Firefox) | phone · desktop | manual, listened | **not run on this machine** — recorded in `A11Y-REPORT.md` as owed |
| Print | Chromium print emulation | 816 × 1056 | `test:visual` print project | 3 print baselines (article, glossary term, coverage page) |

Automated coverage runs on Linux Chromium only. WebKit and Firefox runs, and
the screen-reader passes, need a person with the devices; they are listed as
owed in `A11Y-REPORT.md` rather than claimed.
