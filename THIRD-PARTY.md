# Third-party resources

Every external script, iframe, pixel, font request or widget in the build is
listed here with a justification, or it does not ship. Third-party bytes count
against `PERFORMANCE-BUDGET.json`.

## Legacy baseline (2026-09-12, 21 rendered pages)

| Resource | Found | Notes |
|---|---|---|
| External scripts | none | |
| Iframes | none | |
| Analytics / tag manager | none | No `gtag`, `dataLayer`, `fbq`, or similar hints in inline scripts |
| Cookie consent banner | none | Nothing to consent to |
| Chat / scheduling widget | none | |
| Web fonts from a third party | none | |
| Outbound links | facebook.com, instagram.com | Footer social links only; no embeds |

## Planned for the new build

| Resource | Purpose | Phase | Justification | Budget impact |
|---|---|---|---|---|
| Cloudflare Turnstile (`challenges.cloudflare.com`) | Bot protection on lead, quote and referral forms | 2, 4, 5 | Present only on pages that render a form (`/contact/`, `/forms/*`, `/quote/summary/`, the refer forms); `async defer`; no content page loads it. Without JavaScript a lead is still saved and flagged | Third-party count budget is 1 on app routes and 0 on content routes (`PERFORMANCE-BUDGET.json`) |
| `web-vitals` → `/api/rum` | Real-user Core Web Vitals | 5 | Our own endpoint (`app/(frontend)/api/rum/route.ts` → `rum-samples`); the library is imported after idle only when `NEXT_PUBLIC_RUM_ENABLED=true`; no IP, no cookie stored | ≈ 2 KB gzipped, deferred |
| Error reporting to `ERROR_REPORTING_DSN` | Server-side only | 7 | Optional; PII scrubber wired before the first event | 0 KB client |
| Supabase Auth (`@supabase/ssr`) | Customer referrer magic-link sessions (Project A) | 5 | Server-side only: the client library runs in route handlers and server actions, not in the browser | 0 KB client |

The Turnstile widget renders its own focusable iframe; its focus indicator
is Cloudflare's, and `tests/e2e/a11y.spec.ts` excludes elements inside
`.cf-turnstile` from the site's focus-ring check for that reason.

Anything not in this table is a build failure. Fonts are self-hosted from
`desert-peak-brand/brand/fonts/`, subset at build-author time by
`scripts/font-subset.mts` (subset-font, a HarfBuzz WebAssembly build, dev
dependency only, never shipped); images are served from Supabase Storage through
the media bucket, which is first-party for budget purposes.

## What the Content-Security-Policy allows

The policy in `next.config.ts` names every third party the browser is allowed
to reach. Adding a script, a font host, an analytics beacon or an embedded
video means adding its origin there, or the browser will refuse it silently
apart from a console entry.

| Origin | Directive | Why |
|---|---|---|
| `https://challenges.cloudflare.com` | `script-src`, `frame-src` | Turnstile: the bot check on the three public forms. It loads a script and runs the challenge in an iframe |
| The Supabase project URL | `connect-src` | The customer portal's magic-link auth, read from `src/env.public.ts` |

Everything else is `'self'`. Media is served through Payload's own route, so
images, fonts and styles are same-origin; `object-src` is `'none'` and there is
no `'unsafe-eval'`.
