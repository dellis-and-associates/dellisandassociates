# SEO playbook

Who this is for: the person at Desert Peak who owns marketing. It covers the
checks that keep the site indexed, the rules for opening the next wave of
pages, and what to do when a page has to come down. Nothing here needs an
engineer to decide; a few of the numbers need an engineer to run a command, and
each of those rows says so.

The site is 1,083 routes: 36 products, 4 states (Arizona, Nevada, Utah, Idaho),
38 cities, 186 articles and 221 glossary terms. Every content document was
marked reviewed on 2026-09-15. Being reviewed is not the same as being indexed;
the wave rules below decide that.

## Where the numbers come from

| Source | How to reach it | What it answers |
|---|---|---|
| Google Search Console | Domain property for `desertpeakinsurance.com` | Coverage, queries, manual actions, 404s Google found |
| Bing Webmaster Tools | Site `https://www.desertpeakinsurance.com` | The same for Bing, and IndexNow submissions |
| Payload admin | `https://www.desertpeakinsurance.com/admin` | Review status, waves, city facts, RUM samples |
| The repo commands | A terminal in the project folder | Everything a browser cannot see: canonicals, sitemaps, schema, redirects, links |

### Running a command

The commands below live in the site's repository. To run one you need the repo
checked out, `pnpm install` done once, and an `.env.local` file the engineer
gives you (it holds the database connection the checks read). Then, from the
project folder:

```
pnpm verify:sitemaps --base=https://www.desertpeakinsurance.com
```

Every site-level check takes the same `--base=` flag. Without it the check runs
against `http://localhost:3000`, which is not what you want for a weekly
production number. A check exits with a pass or a list of failures; the failures
name the URL and the rule.

If you would rather not run commands, ask the engineer for the output of the
rows marked "engineer runs it" and read the rest yourself in the admin and in
Search Console. Do not skip a row because nobody ran the command.

### The checks and what each one proves

| Command | What it produces | Status as of 2026-09-16 |
|---|---|---|
| `pnpm verify:urls` | Trailing-slash canonical holds, no-slash and uppercase variants redirect, unknown paths are a real 404 and not a soft 404, retired paths are 410 | Available |
| `pnpm verify:sitemaps` | The index and its five children are valid, list only indexable URLs, and carry a real document `lastmod` | Available |
| `pnpm verify:seo` | Unique titles at 60 characters or fewer, descriptions at 155 or fewer, self-referencing canonical, `og:image` on every route, noindex where it belongs | Available |
| `pnpm verify:schema` | Every JSON-LD block is valid, has the fields its type requires, and only marks up things the page actually shows | Available |
| `pnpm verify:og` | Share previews: the full OpenGraph and Twitter set, a real 1200×630 PNG, and one preview image per template family written to `OG-PREVIEWS/` | Available |
| `pnpm verify:links` | Zero broken internal links, zero orphans among indexable routes, every indexable route within three clicks of the home page, no links from indexable pages to noindex content, and an anchor-text repetition report | Available |
| `pnpm verify:redirects` | All 21 redirect rows resolve in one hop: 18 × 301 to a live page, 3 × 410 | Available |
| `pnpm verify:routes` | Every route in the manifest is reachable from the home page; zero broken internal links; zero orphans | Available |
| `pnpm verify:uniqueness` | No two indexable pages are near-duplicates | Available |
| `pnpm verify:compliance` | Disclosures present, banned phrases absent | Available |
| `pnpm verify:tokens` | No hardcoded design values | Available |
| `pnpm lhci` | Lighthouse scores per template | Available |
| `pnpm test:a11y` · `test:visual` · `test:nojs` · `test:quote-flow` | Accessibility, visual, no-JavaScript and quote-flow suites | Available |
| `pnpm rum:report` | Core Web Vitals p75 per path, from the site's own samples | Available (`scripts/rum-report.mts`) |
| `pnpm review:stale` | Documents whose `reviewedAt` has passed twelve months | Available (`scripts/review-stale.mts`) |

## Weekly, for the first eight weeks

Do these on the same weekday each week and keep the numbers in one sheet. The
point is the trend, not any single reading.

### 1. Search Console coverage

Where: Search Console → Indexing → Pages.

Write down three numbers: **indexed**, **not indexed**, and the top reason
under "Why pages aren't indexed". Then compare the indexed count against what
the site is actually offering:

```
pnpm verify:sitemaps --base=https://www.desertpeakinsurance.com
```

That prints the URL count in the sitemap index and its five children (core,
insurance, locations, resources, glossary). Indexed should climb toward that
count, not toward 1,083 — routes that are not in a promoted wave are noindex on
purpose and are absent from the sitemap by design.

What to do:

- "Discovered – currently not indexed" on a large share of URLs is the normal
  early pattern for a new domain. It is the reason the waves exist. Do not
  promote the next wave to fix it.
- "Duplicate without user-selected canonical" or "Alternate page with proper
  canonical tag" on more than a handful of URLs: run `pnpm verify:urls` and
  `pnpm verify:seo` with `--base=` and send the failures to the engineer.
- "Excluded by 'noindex' tag" on pages you expected to be live: check the
  document in the admin. Either its `reviewStatus` is not `reviewed`, its
  `indexWave` is above the promoted wave, or a required fact is still missing
  (city pages, below).
- Any manual action or security issue: tell the engineer the same day.

### 2. Core Web Vitals, from the site's own measurements

The site collects its own field data. Every visitor's browser posts one sample
per metric to `/api/rum`, and the samples land in the admin under
**Operations → RUM samples** (metric, value, rating, path, device). No IP, no
cookie, no visitor identity.

Where to read it: Payload admin → Operations → RUM samples. Filter `metric` to
`LCP`, then `INP`, then `CLS`, and read the share of samples rated `good`.
Google's thresholds are LCP 2.5 s, INP 200 ms, CLS 0.1, judged at the 75th
percentile.

The p75-per-path report is `pnpm rum:report` (`scripts/rum-report.mts`). It is
referenced by the RUM samples collection but has not been written yet — an
engineer-owned TODO. Until it lands, the admin list with its filters is the
source, and Search Console → Experience → Core Web Vitals gives Google's own
field view once it has enough traffic (usually several weeks after launch).

What to do: a single poor sample is noise. A path whose `good` share falls below
about three quarters over a full week is a real regression — note the path and
the metric and hand both to the engineer.

Set expectations honestly: in lab testing (`pnpm lhci`) accessibility and best
practices score 100 on every template, and performance scores 92–96. The 100
floor for performance is recorded as **not met** in `BUILD-REPORT.md`. Field
numbers can be better or worse than lab numbers; do not report either as the
other.

### 3. The 404 log

Two places to look, because they answer different questions.

- Search Console → Indexing → Pages → "Not found (404)". This is what Google
  tried and failed to fetch, usually an old inbound link.
- The hosting platform's request logs, filtered to status 404. This is what real
  visitors hit. If you do not have access to the host's logs, that access is a
  **TODO the client owns** — ask the engineer to add your account.

There is no 404 collection in the CMS; 404s are served by the site's proxy and
are not written to the database.

Weekly, confirm the plumbing is still right:

```
pnpm verify:urls --base=https://www.desertpeakinsurance.com
```

It proves unknown paths return a real 404 status (not a page that looks like a
404 while answering 200 — those get indexed) and that retired paths return 410.

What to do with a 404 that keeps appearing:

- It is an old URL from the legacy site with a clear equivalent → add a redirect
  (see "Removing a page", below).
- It is a typo in a link on the site → fix the link; `pnpm verify:routes` will
  have already caught it if it is internal.
- It is a URL that never existed and has no equivalent → leave it. A 404 is a
  correct answer.

### 4. Redirect health

```
pnpm verify:redirects --base=https://www.desertpeakinsurance.com
```

Expected: 21 of 21 resolve in one hop — 18 permanent redirects landing on a
live page, 3 gone (410). A chain, a loop, or a redirect landing on a 404 is a
failure to fix the same week. Search Console's "Page with redirect" bucket
should hold roughly those 18 legacy URLs and nothing else.

## Monthly, from week nine

Same four checks, once a month, plus:

- Search Console → Performance: impressions and clicks by page group. Compare
  against the previous month and against the wave you have opened.
- Bing Webmaster Tools → Site Explorer: confirm Bing's indexed count is moving
  too. Bing acts on IndexNow, so it usually leads Google.
- The quarterly link-graph review, when the quarter comes round.

Go back to the weekly rhythm for eight weeks after any large change: a wave
promotion, a redesign, or a domain change.

## Indexation waves

The site does not offer all 1,083 routes to search engines at once. A new domain
publishing a thousand pages in a day is how sites end up half-indexed. Pages are
released in three waves.

| Wave | What is in it |
|---|---|
| 1 | Core pages, legal pages, product hubs and their subpages, state hubs, tier-1 product × state pages, the top-30 city pages |
| 2 | The remaining city pages and the tier-2 product × state pages |
| 3 | Resources: the 186 articles and the 221 glossary terms |

A page is offered to search engines only when **all four** of these are true:

1. Its document is marked `reviewed`.
2. Its wave is at or below the site's promoted wave.
3. It is not a utility route (the two form pages are never indexable).
4. No required fact is still missing.

Rule 4 is why **city pages are not indexable today**. A city page needs all
seven `CityFacts` fields; six were researched and filled on 2026-09-15, and the
seventh — nearest office or agent — is empty for all 38 cities because it
depends on an office address the client has not supplied. Until that field is
filled, the top-30 city pages in wave 1 stay noindex and stay out of the
sitemap, whatever the promoted wave says.

### When to promote to wave 2

Both conditions, not either:

- **At least 90% of wave 1 is indexed in Search Console.** Get the number from
  Search Console → Indexing → Pages → indexed count, and the denominator from
  `pnpm verify:sitemaps --base=https://www.desertpeakinsurance.com`, which
  prints how many URLs the sitemap currently offers. Ninety per cent of a wave
  that is still climbing week over week is worth waiting for; a wave stuck at
  70% for three weeks is a problem to diagnose, not to bury under more pages.
- **Every wave-2 city has all seven `CityFacts` fields filled.** Payload admin →
  Cities. The list shows a `factsComplete` column (0–7) and a `factsMissing`
  column naming what is absent. Sort by `factsComplete`; every row must read 7.

### When to promote to wave 3

Wave 3 is the resource library, and it is released per document rather than in
one go. Every article and glossary term is already marked `reviewed`, so moving
the promoted wave straight to 3 would offer all 407 resource pages on the same
day — exactly what the wave plan exists to prevent.

Release them in batches instead:

- Leave the promoted wave at 2.
- In the admin, open the articles or glossary terms you want live, change the
  sidebar field **Index wave** from `3 — as review completes` to
  `2 — second wave`, and save. They join the promoted wave immediately.
- A sensible batch is 20–40 documents a week while the indexed share of the
  previous batch holds above 90%.
- Move the promoted wave to 3 only when you want everything remaining to go out
  at once, and only after waves 1 and 2 are settled.

The **Index wave** field is admin-only. If you cannot see or change it, your
account is an editor and an admin has to make the change.

### The exact steps to promote

1. Sign in at `https://www.desertpeakinsurance.com/admin`.
2. In the left sidebar, open **Settings → Site settings**.
3. In the right-hand sidebar of that screen find **Promoted wave**. The options
   read `1 — launch set only`, `2 — plus remaining city and state-product
   pages`, `3 — plus resources`.
4. Choose the new wave and press **Save**.
5. That is the whole change. No deploy, no rebuild, no engineer. Saving the
   global refreshes the cached pages, so the pages' robots meta and the sitemap
   both follow within minutes.
6. Confirm it worked, ten minutes later:
   - Open a page from the newly opened wave, view its source, and search for
     `robots`. It should no longer say `noindex`.
   - Run `pnpm verify:sitemaps --base=https://www.desertpeakinsurance.com` and
     check the URL count has grown by roughly the size of the wave.
   - In Search Console → Sitemaps, press the refresh on `/sitemap.xml`.
7. Note the date and the wave in your sheet. Watch the coverage numbers weekly
   for the next eight weeks.

If step 6 still shows `noindex` after half an hour, stop and tell the engineer;
do not promote further waves on top of it.

## Content refresh at twelve months

Every reviewed document carries a `reviewedAt` date, stamped when it was first
marked reviewed, shown on the page as "Last reviewed", and cited in the article
structured data. All of this site's content carries **2026-09-15**, so the first
refresh window opens in **September 2027** and will arrive for everything at
once. Plan it as a rolling programme through that autumn, not a single week.

The list of documents past twelve months comes from `pnpm review:stale`
(`scripts/review-stale.mts`). That script has not been written yet — an
**engineer-owned TODO**, and worth asking for well before September 2027. Until
it exists, the admin gives you the same list: open **Articles** (or Glossary
terms, Products, Pages), add a filter on **Reviewed at** → *is before* → a date
twelve months back, and sort ascending.

What a refresh is:

1. Read the document against what has actually changed — state minimums,
   regulator names, carrier practice, the product itself.
2. Fix what is wrong. Leave what is right alone; a cosmetic edit to refresh a
   date is not a refresh and search engines are good at telling the difference.
3. Anything that states a statutory or licensing fact goes back through a
   licensed reviewer before it is marked reviewed again.
4. Set `reviewStatus` back to `reviewed` (admin only). That restamps
   `reviewedAt` only if it was cleared; if the date has to move, ask the
   engineer rather than editing history by hand.
5. Saving a document that backs an indexable route submits its URL to IndexNow
   automatically, so Bing sees the change quickly.

If a document is no longer worth maintaining, do not leave it stale — see
"Removing a page".

## Quarterly link-graph review

Once a quarter, in one sitting:

```
pnpm verify:routes --base=https://www.desertpeakinsurance.com
pnpm verify:links --base=https://www.desertpeakinsurance.com
```

`verify:routes` proves every route in the manifest is reachable from the home
page and reports broken internal links and orphans; the launch run was zero and
zero. `verify:links` crawls the rendered HTML instead of the manifest and adds
the parts a route list cannot see: click depth, links from indexable pages into
noindex content, and how often the same anchor text is reused. It counts header
and footer anchors separately from in-content anchors, because site furniture
links everything to everything and would otherwise hide a real orphan.

Read four things:

| What | Where | What good looks like |
|---|---|---|
| Orphans | `verify:routes` output | Zero. An orphan is a page nothing links to; it will not be crawled reliably no matter what the sitemap says |
| Depth | Search Console → Links → Internally linked pages | Nothing important more than three clicks from the home page. A city or product page with one or two internal links is under-linked |
| Broken links | `verify:routes` and `verify:links`, plus the 404 log | Zero internal. External breakage shows up as visitor complaints, not in these reports |
| Anchor text | `verify:links` repetition report | The same phrase pointing at many different pages, or one page always reached by the same words, both read as templated. In-content anchors are the ones that matter |

Fix an orphan by linking to it from the relevant hub — the state hub for a city
page, the product hub for a coverage page, the resources index for an article.
Fix depth the same way. Never fix either by adding a page whose only purpose is
links. A link from an indexable page into noindex content is not a fault in
itself while waves are still closed; it becomes one if it is still there after
the wave has been open for a month.

Also glance at the glossary: `pnpm verify:glossary` proves no reviewed term is
an orphan and no term links to itself.

## Removing a page

Two correct answers, and the choice matters.

| Situation | Answer | Why |
|---|---|---|
| The page has a clear equivalent elsewhere on the site | **301 redirect** to that page | The old URL's value transfers and anyone following an old link lands somewhere useful |
| The page is gone and nothing replaces it | **410 Gone** | It tells search engines to drop the URL and stop retrying. A 404 says the same thing more slowly and less certainly |
| The page has no equivalent but a general one exists (a product hub, a state hub) | **410**, not a redirect to the hub | A redirect to a page that does not answer the visitor's question is a soft 404; search engines treat it as one and it annoys people |

Never blanket-redirect retired pages to the home page.

How to do it, in the admin:

1. Open **Redirects**.
2. **Create new**. Set **From** to the old path exactly as it was, with its
   trailing slash and in lower case (`/old-page/`).
3. Set **Status code** to `301` and fill **To** with the new path, or set it to
   `410` and leave **To** empty.
4. Save. The live site picks the row up within ten minutes; no deploy.
5. If the page still exists in the CMS, unpublish or delete the document too —
   otherwise the site keeps serving it and the redirect never fires.
6. Confirm:
   `pnpm verify:redirects --base=https://www.desertpeakinsurance.com` — the new
   row must resolve in one hop, and the total goes from 21 to 22.
7. In Search Console, use **Removals** only for something urgent, such as a page
   published by mistake. It is a six-month hide, not a deletion; the 301 or 410
   is what actually removes the page.

## What IndexNow does, and does not do

The site can ping search engines the moment a page changes, rather than waiting
to be crawled. It is on when `INDEXNOW_KEY` is set in the production
environment; the key is served as a text file at `/{key}.txt`, and submissions
run only in production — never from a preview deployment.

**Bing and Yandex honour IndexNow. Google does not.** Google finds changes by
crawling and by the sitemap, on its own schedule. Do not read a fast Bing
update as a sign that Google has seen anything.

Submissions fire automatically when an indexable document is saved. There is
nothing to press, and nothing to press when a wave is promoted — a promotion
changes a setting, not the documents, so it does not trigger submissions. That
is what the sitemap refresh in step 6 of the promotion steps is for.

## Things that are still owed, and what they hold up

These are client-owned. Each one blocks something specific; none of them can be
guessed or filled in by the build. The full list, with dates asked, is
`TODO-CLIENT-DATA.md`.

| Owed | Holds up |
|---|---|
| Legal entity name | The organisation's structured data and the legal pages |
| Four state license numbers | The licensing pages and the per-state disclosure |
| Office address | The footer, the agency structured data, and the city facts below |
| Nearest office or agent, per city (38) | **All city pages. They are noindex until this is filled** |
| Agent roster (30 profiles) | The agents hub and 30 agent pages; the hub shows an honest empty state |
| Carrier appointments (15) | The carriers hub and its pages, and the carrier strip |
| Search Console and Bing Webmaster verification (a DNS record) | Every coverage number in this playbook |
| Google Business Profile | Local presence; the profile URL also feeds the site's structured data |
