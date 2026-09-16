# Launch checklist

Run in order. Each row has one owner: **client** (Desert Peak, including
whoever holds the domain and the Google and Bing accounts) or **engineer**.
Tick a row only when the confirmation column has actually been seen, not when
the work was requested.

Production site: `https://www.desertpeakinsurance.com`.
Anything that cannot be confirmed is written as a TODO with the owner named.

## A. Before the cut

| # | ✓ | Step | Owner | Confirm it |
|---|---|---|---|---|
| A1 | [ ] | Production environment variables set in the host, not in the repo | engineer | `pnpm verify:env` passes; the site boots |
| A2 | [ ] | `NEXT_PUBLIC_SITE_URL` is exactly `https://www.desertpeakinsurance.com` — no trailing slash, no apex, no http | engineer | The env check refuses any other value in production; canonical, OG url, JSON-LD and the sitemap all derive from it |
| A3 | [ ] | Real Cloudflare Turnstile keys in place of the test keys | client supplies, engineer sets | Production refuses to boot on the test keys; a form submits successfully |
| A4 | [ ] | `INDEXNOW_KEY` set — 8 to 128 characters of letters, digits or hyphens | engineer | Step C6 |
| A5 | [ ] | `STAGING_NOINDEX` unset or `false` | engineer | Production refuses to boot when it is `true`; that guard is the check |
| A6 | [ ] | `APP_ENV` (or the host's `VERCEL_ENV`) resolves to `production` | engineer | Only `production` arms the go-live guards, the live robots.txt and IndexNow |
| A7 | [ ] | `NEXT_PUBLIC_RUM_ENABLED` set to `true` so browsers send Core Web Vitals | engineer | Step D4 |
| A8 | [ ] | Verified email sender on the Desert Peak domain, and the rotated Resend key | client supplies, engineer sets | A test lead notification arrives |
| A9 | [ ] | Migrations applied to the production database before the app deploys | engineer | `pnpm migrate:status` reports nothing pending; the CI `deploy-migrations` job is green |
| A10 | [ ] | Point-in-time recovery on for the database tier, and the nightly logical dump has a bucket to write to | client (plan tier, bucket), engineer (wiring) | One successful nightly run |
| A11 | [ ] | The definition-of-done command list runs green from a clean clone (list below) | engineer | The CI run on `main` is green and its evidence artifact is attached |
| A12 | [ ] | Preview deployments answer `X-Robots-Tag: noindex, nofollow` | engineer | `curl -I <preview-url>` shows the header; the same request against production does **not** |
| A13 | [ ] | HSTS with preload set at the host or CDN: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` | engineer | `curl -I https://www.desertpeakinsurance.com` shows it. Not set in `next.config.ts` today — it belongs at the edge |
| A14 | [ ] | Decide whether to submit the domain to the HSTS preload list at hstspreload.org | client decides, engineer submits | Submission only after A13 has served for a few days. Removal from the list takes months; do not submit if any subdomain still needs plain http |

### The definition-of-done command list (A11)

```
pnpm typecheck
pnpm lint
pnpm test
pnpm verify:env
pnpm verify:data
pnpm verify:tokens
pnpm verify:parity
pnpm migrate && pnpm migrate:check
pnpm generate:types   # no diff
pnpm test:access
pnpm test:tenancy
pnpm test:referrals
pnpm seed --dry-run && pnpm seed
pnpm build
# then, against the running build (pnpm start):
pnpm verify:routes
pnpm verify:urls
pnpm verify:seo
pnpm verify:schema
pnpm verify:sitemaps
pnpm verify:og
pnpm verify:links
pnpm verify:redirects
pnpm verify:compliance
pnpm verify:uniqueness
pnpm test:revalidate
pnpm test:a11y
pnpm test:nojs
pnpm test:quote-flow
pnpm test:visual
pnpm lhci
```

Two notes so the run is read honestly:

- Every command above exists and runs. Two reporting scripts named in
  `SEO-PLAYBOOK.md` do not yet: `pnpm rum:report` (Core Web Vitals p75 per path)
  and `pnpm review:stale` (documents past twelve months since review). Both are
  engineer-owned TODOs, neither blocks launch, and the playbook gives the admin
  route to the same numbers meanwhile.
- `lhci` will not be green on performance. Accessibility and best practices are
  100 on every template; performance measures 92–96 and the 100 floor is
  recorded as **not met** in `BUILD-REPORT.md`. Launch on that number knowingly
  or do not launch; do not record it as a pass.

## B. The cut

| # | ✓ | Step | Owner | Confirm it |
|---|---|---|---|---|
| B1 | [ ] | `www` is the canonical host: `www.desertpeakinsurance.com` points at the deployment | client (registrar), engineer (host) | `https://www.desertpeakinsurance.com/` returns 200 |
| B2 | [ ] | The apex `desertpeakinsurance.com` answers a **301** to the same path on `www` | client (registrar), engineer (host) | `curl -I https://desertpeakinsurance.com/insurance/` shows `301` to `https://www.desertpeakinsurance.com/insurance/` |
| B3 | [ ] | `http` redirects to `https` on both hosts | engineer | `curl -I http://desertpeakinsurance.com/` ends on the https www URL |
| B4 | [ ] | The trailing-slash canonical holds: `/insurance` redirects to `/insurance/` | engineer | `pnpm verify:urls --base=https://www.desertpeakinsurance.com` |
| B5 | [ ] | TLS certificate valid for both hosts | engineer | No browser warning on either |
| B6 | [ ] | `https://www.desertpeakinsurance.com/robots.txt` allows `/` and names `/sitemap.xml` | engineer | Fetch it. If it reads `Disallow: /`, the deployment is not resolving as production — fix before anything else |

## C. Immediately after the cut

| # | ✓ | Step | Owner | Confirm it |
|---|---|---|---|---|
| C1 | [ ] | Search Console property created for the domain and verified **by DNS record** | client | The property shows "Ownership verified" |
| C2 | [ ] | The Search Console DNS TXT record is added at the registrar | client | **TODO the client owns.** The record value is shown once, on the Search Console verification screen, and is not known to the build. Record it somewhere durable — removing it later un-verifies the property |
| C3 | [ ] | Bing Webmaster Tools site added and verified by DNS record (or imported from Search Console once C1 is done) | client | The site shows as verified |
| C4 | [ ] | The Bing DNS TXT record is added at the registrar | client | **TODO the client owns**, same as C2. Skip only if the Search Console import is used instead |
| C5 | [ ] | `/sitemap.xml` submitted in Search Console and in Bing Webmaster Tools | client | Both report "Success" and a URL count. It is a sitemap index with five children — core, insurance, locations, resources, glossary — so submit the index, not the children |
| C6 | [ ] | The IndexNow key file is live | engineer | `https://www.desertpeakinsurance.com/{key}.txt` returns the key as plain text. Bing and Yandex act on IndexNow; **Google does not** |
| C7 | [ ] | A live page's source shows a self-referencing canonical, a title of 60 characters or fewer, and no `noindex` | engineer | `pnpm verify:seo --base=https://www.desertpeakinsurance.com` |
| C8 | [ ] | The 21 legacy redirects are serving from the live domain | engineer | `pnpm verify:redirects --base=https://www.desertpeakinsurance.com` — 21 of 21 in one hop, 18 × 301 and 3 × 410 |
| C9 | [ ] | The promoted wave is `3` in the admin | client (marketing) | Settings → Site settings → Promoted wave reads `3 — resources`. The client asked on 2026-09-16 for the whole library to be submitted, so all 1,043 eligible URLs are offered at once. `SEO-PLAYBOOK.md` records what that trades away and how to pull a batch back |
| C10 | [ ] | Google Business Profile claimed, and its URL added to Site settings → Social → Google | client | The profile is published and the URL renders on the site |

## D. First week

| # | ✓ | Step | Owner | Confirm it |
|---|---|---|---|---|
| D1 | [ ] | The 404 log is checked **daily for two weeks** | client (marketing) | Search Console → Indexing → Pages → "Not found (404)", plus the host's request logs filtered to status 404. There is no 404 collection in the CMS |
| D2 | [ ] | Access to the host's request logs for whoever does D1 | client | **TODO the client owns** — ask the engineer to add the account |
| D3 | [ ] | Search Console coverage read once, as a baseline | client (marketing) | Indexed, not indexed, and the top reason. The denominator is the sitemap count from `pnpm verify:sitemaps` |
| D4 | [ ] | Real-user vitals are arriving | engineer or marketing | Payload admin → Operations → RUM samples holds rows from the last 24 hours, across `LCP`, `INP` and `CLS`. Empty means A7 is not set or the beacon is not shipping |
| D5 | [ ] | A JSON-LD spot check on one page per template family | engineer | `pnpm verify:schema --base=https://www.desertpeakinsurance.com` |
| D6 | [ ] | Share previews look right | client (marketing) | `pnpm verify:og --base=https://www.desertpeakinsurance.com` writes one preview per family to `OG-PREVIEWS/`; look at them |

## E. After the redirects have served for a week

| # | ✓ | Step | Owner | Confirm it |
|---|---|---|---|---|
| E1 | [ ] | The legacy domain's redirects have been serving, uninterrupted, for a full week | engineer | `pnpm verify:redirects` green on each of the seven days, or on the first and last with the log showing no gap |
| E2 | [ ] | The legacy domain is verified as its own property in Search Console | client | Required before E3 |
| E3 | [ ] | **Change of Address** submitted in Search Console, from the legacy property to `https://www.desertpeakinsurance.com` | client | Search Console → Settings → Change of address. Do not run this before E1: the tool checks the redirects and fails if they are not in place |
| E4 | [ ] | The legacy domain and its redirects stay live for at least a year after E3 | client | Do not let the old domain lapse at its next renewal |
| E5 | [ ] | The weekly rhythm in `SEO-PLAYBOOK.md` has started, and the numbers are being kept in one sheet | client (marketing) | Eight weekly readings, then monthly |

## F. What is still missing, and what it does

None of these stop the site going live. Each one changes what the site can
offer to search engines, so launch with the list in front of you rather than
discovering it in week three. Full detail, with the date each was asked for, is
in `TODO-CLIENT-DATA.md`.

| Missing item | Owner | Effect on indexation |
|---|---|---|
| Nearest office or agent, for each of the 38 cities | client | No longer blocks indexation: the field is contact detail, not local content, so it is excluded from the indexing rule (`CITY_INDEXING_FACT_KEYS`). Until it arrives the city pages simply do not name an office, and the "nearest office" row is hidden rather than shown empty |
| Local life-insurance content, for each of the 38 cities | client | The 38 life-insurance city pages are live but noindex: hazards do not change a life policy, so there is not enough honest local substance to submit them. An employer mix, a local estate or probate rule, or anything genuinely local would clear the floor and add them to the sitemap automatically |
| Office address | client | Feeds the field above, the footer, and the agency structured data |
| Legal entity name | client | The organisation's structured data and the legal pages carry a placeholder until it arrives |
| Four state license numbers (AZ, NV, UT, ID) | client | The per-state licensing pages and the licensing disclosure are incomplete; nothing is guessed |
| Agent roster — 30 profiles | client | 30 agent routes do not exist and the agents hub shows an honest empty state. No `Person` structured data ships before real people do |
| Carrier appointments — 15 | client | The carrier routes do not exist and the hub shows an empty state; carrier names render as text |
| Search Console verification DNS record | client | Without it there is no coverage number, so no wave can be promoted on evidence |
| Bing Webmaster verification DNS record | client | Without it, IndexNow submissions cannot be checked and Bing coverage is invisible |
| Google Business Profile | client | No local profile, and the profile URL is missing from the site's structured data |
| Lighthouse performance at 100 | engineer, unscheduled | Recorded as not met: 92–96 across templates, accessibility and best practices at 100. It is a known gap, not a blocker, and it is not to be reported as passing |
