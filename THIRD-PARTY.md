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
| Cloudflare Turnstile (`challenges.cloudflare.com`) | Bot protection on lead, quote and referral forms | 2, 4 | Required by the fraud section; the only third-party script permitted on content pages, loaded lazily on form interaction, never on pages without a form | Counted; must fit inside the 60 KB content-page budget |
| RUM beacon to `RUM_ENDPOINT` | Real-user Core Web Vitals | 5 | First-party endpoint we own; `navigator.sendBeacon`, no library | ≈ 1 KB inline |
| Error reporting to `ERROR_REPORTING_DSN` | Server-side only | 7 | Optional; PII scrubber wired before the first event | 0 KB client |
| Supabase JS client | Referrer portal auth (Project A) | 4 | App routes only (180 KB budget), never on content pages | App-route budget |

Anything not in this table is a build failure. Fonts are self-hosted from
`desert-peak-brand/brand/fonts/`; images are served from Supabase Storage through
the media bucket, which is first-party for budget purposes.
