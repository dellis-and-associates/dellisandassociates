# RECONCILIATION.md — Scope conflict between the sitemap package and the live business

**Status:** DECIDED — Option B. Recorded 2026-09-12. Phase 1 may proceed.

---

## 1. The conflict

| | Live site — dellisandassociates.com | Sitemap package — 1,028 pages |
|---|---|---|
| Lines sold | Life (term, whole, IUL), Medicare, health, annuities, dental & vision | Auto, home, renters, life, general liability, workers' comp, commercial auto, motorcycle, umbrella, BOP + 19 specialty P&C lines |
| Footprint | "Licensed in UT + 12 states", 801 phone | AZ home base; AZ, NV, UT, ID |
| Positioning | Independent advisory, no-fee analysis | Local multi-line agency |
| Overlap | **One line: Life Insurance** | |

Of the eight coverage lines the business sells today, seven do not exist in the
package. Medicare, annuities, and health are absent entirely.

## 2. Why it matters

- **301 inheritance.** On a rebrand, page-level redirects from URLs that already
  earn traffic are worth more than any volume of new pages. As specified, there is
  no target for `/medicare`, `/annuities`, `/iul`, `/health-insurance`,
  `/dental-and-vision-insurance`, or the agent recruiting section.
- **Medicare is separately regulated.** If it stays in scope, CMS TPMO disclaimer
  and marketing rules become a page-template requirement, and referral rewards on
  the Medicare track fall under CMS nominal-gift rules.
- **The referral engine's rule set** depends on which lines are sold and where.

## 3. Options

### A — Build the package as-is; keep dellisandassociates.com live as a separate property
- Pages: 1,068 as planned. No IA change.
- Effort: lowest for the P&C build; **no redirect map**, two brands to maintain,
  domain authority split across two sites.
- Right if: Desert Peak is a genuinely new P&C venture and the advisory business
  stays as Ellis & Associates.

### B — Extend the IA with the current book (recommended)
- Add 7 lines: Medicare, health, annuities, dental & vision, term life, whole life,
  IUL as products (life becomes a hub with sub-lines). Tier 2 (state-level) at
  launch: 3 product pages + 4 state pages each → **49 pages**, total 1,117.
  Medicare and life can be promoted to Tier 1 city pages later if search volume
  justifies it.
- Effort: +1 week for pages; +compliance components (TPMO disclaimer, plan-year
  language); +Medicare rule set in the referral engine.
- Every legacy URL gets a real redirect target. The agent recruiting section maps
  onto the partner track.
- Right if: Desert Peak carries the existing clients and adds P&C as the growth
  line — which is the reading most consistent with "rebranding my insurance
  business."

### C — Rebuild the IA around the actual book; P&C as a later phase
- Discards most of the package's structure. Life/Medicare/annuity-centered IA at
  ~300–400 pages first; P&C added when the agency confirms appointments.
- Effort: package rework of 1–2 weeks before any build.
- Right if: the agency has no P&C carrier appointments and does not expect them
  within a quarter.

**Recommendation: B.** It keeps everything the client asked for (scale, AZ base,
four states, P&C growth), preserves the current book and its redirects, and costs
about 5% more pages.

## 4. Decision

```yaml
decision:                  B
decided_by:                Client (Daniel), relayed by Seid
decided_on:                2026-09-12

lines_sold_today:          life (term, whole, IUL), Medicare, health, annuities, dental & vision
p_and_c_appointments:      unknown — carrier pages remain blocked until confirmed
medicare_in_scope:         yes
licensed_states:           AZ, NV, UT, ID (legacy "UT + 12 states" claim unresolved — no state count displayed until confirmed)
legacy_domain_plan:        redirect to Desert Peak, page-level 301s
agent_recruiting_section:  keep → partner track / `partner` role
awards_certificates:       pending written client confirmation — TODO token until then
testimonial_consent:       pending written client confirmation — do not carry over until then
```

Notes from the client, verbatim:

> Just rebranding and adding all of the sitemaps there.

## 5. Consequences to apply once decided

- Update `medicare_in_scope` in both build prompts.
- Add 7 products to `data-products.xml` (tier 2, Personal): `medicare`,
  `health-insurance`, `annuities`, `dental-and-vision-insurance`,
  `term-life-insurance`, `whole-life-insurance`,
  `indexed-universal-life-insurance` (301 from `/iul`). +49 routes → 1,117
  planned, 1,072 buildable. Rerun `verify:data`.
- Medicare and annuities use a "plans & enrollment FAQ" subpage instead of
  `discounts-faq`.
- Add the Medicare TPMO/CMS disclaimer component to the template contract; the
  referral engine's Medicare track rule set is in force.
- Resolve the five `missing` rows in `LEGACY-FEATURE-PARITY.md`.
- Populate the redirect map targets for the legacy coverage URLs.