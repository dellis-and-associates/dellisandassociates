# Collateral compliance

What the collateral asserts, what it deliberately does not, and what counsel must confirm. Dated 2026-09-13. Every item below is enforced by a generator or a check where that is possible; the rest is flagged here, not decided here.

## Enforced by the build

| Rule | Where | How |
|---|---|---|
| Medicare content carries the TPMO disclaimer, verbatim | social posts, OG images, signatures, decks | `medicareGuard()` refuses the export; `pnpm check:medicare` re-scans every committed asset |
| No rates, savings claims or superlatives | every text layer in social, decks, OG, email, showcase | `bannedGuard()` at generation; `pnpm check:banned-phrases` over what is on disk; list in `content/banned-phrases.json` (site list + superlatives) |
| No invented facts | everywhere | phone, licence numbers, last name, client names, TPMO plan counts are `{{TODO:…}}` tokens that render visibly; no tagline, no years in business, no awards, no testimonials, no carrier names (decks use Carrier A/B/C) |
| No carrier logos | everywhere | none exist in the repo; the partner-row and avatar tests with real marks were run privately and not committed |
| Identity unchanged | everywhere | `pnpm verify:token-lock`: every colour is a token, every font a token family or declared fallback, every mark a byte-identical copy of `brand/logos/` (hash manifest) |
| Independent-agency disclosure | signatures, decks, company card | text from `collateral.config.json`; per-surface wording ("by email", "by this presentation", "by this card") |
| Source line on every statutory fact | state-fact posts, state-requirements slide | read from `content/state-facts.json`, which records statute, URL and date verified; the post refuses a fact without a source |

## The TPMO disclaimer

Text: 42 CFR § 422.2267(e)(41), as amended 90 FR 15911 (April 15, 2025), verified at law.cornell.edu on 2026-09-13. The regulation's own wording is used verbatim; the two plan-year counts ("[number of organizations]", "[number of plans]") are client data (site TODO-CLIENT-DATA #11) and render as visible TODO tokens until supplied. Placement follows the rule: prominently on every Medicare asset (a fixed footer band on posts and OG images, a paragraph in the signature and on the disclosure slide), not fine print.

Counsel to confirm: (1) the plan-year counts; (2) whether the client operates as a TPMO or has a different status that changes the wording; (3) whether every social post touching Medicare must additionally carry the CMS "not connected with or endorsed by the U.S. Government or the federal Medicare program" line, which is required on marketing materials for plan sponsors and their TPMOs; the generator can add it to the band in one line once counsel says so.

## Licensed states and licence numbers

The collateral says "Licensed in AZ, ID, NV, UT" (the client's stated list; the legacy site claimed more states, unresolved as site TODO-CLIENT-DATA #1) and reserves a per-state licence number in the signature, the deck disclosure and the business card, populated from `people.json` and shown as TODO tokens today.

Whether a producer's licence number must appear on business cards or advertising was researched on 2026-09-13 through the state statutes and administrative codes. No provision requiring it was found in any of the four states:

- **Arizona**: A.R.S. Title 20, ch. 2, art. 3 (producer licensing; § 20-283 is the exemptions section) and DIFI producer guidance contain no business-card requirement located (difi.az.gov/producer; azleg.gov/ars/20/00283.htm).
- **Nevada**: NRS 683A and NAC 683A/686A (trade practices) contain no located requirement to print a producer licence number on cards or advertisements (leg.state.nv.us/NAC/NAC-686A.html; nevada.public.law/statutes/nrs_chapter_683a). Nevada does require licence numbers in advertising for other licensed trades (contractors, NRS 624), which is a frequent source of confusion.
- **Utah**: Utah Code 31A-23a and Utah Admin. Code R590 contain no located requirement (law.justia.com/codes/utah/title-31a/chapter-23a; law.cornell.edu/regulations/utah/Utah-Admin-Code-R590-148-26).
- **Idaho**: Idaho Code Title 41, ch. 10 (producer licensing; § 41-1025 is rulemaking authority) contains no located requirement (law.justia.com/codes/idaho/title-41/chapter-10).

By contrast California (Cal. Ins. Code § 1725.5) does require the licence number on business cards and written advertising, which is why the line is reserved. **Confirm with counsel** before print whether to populate the numbers, keep only the licensed-states line, or drop the line on the card. The searches were automated and the statute sites of NV, UT and ID refused direct fetches that day; counsel should read the current text.

## Referral programme

Withheld. `collateral.config.json → referralProgramEnabled` is `false`, mirroring the site (every programme seeded `program_enabled: false` until counsel supplies the reward-rule table and disclaimer, see the site's REFERRAL-COMPLIANCE.md). The referral post family carries a disclaimer slot (`referralDisclaimerSlot`, a TODO token) and renders only when the flag is true.

## Testimonials, awards, carriers

None appear anywhere. Testimonials need written consent per person under the new brand (site TODO-CLIENT-DATA #6); the legacy Circle of Champions recognition belongs to the old entity and plan year (#5); carrier appointments under the Desert Peak entity are unconfirmed (#4). Each is a JSON edit away once confirmed, and none should be added by hand to a template.

## Contact data

Phone, social handles, office address and the media base URL for the signature logo are unconfirmed (site TODO-CLIENT-DATA #7; `collateral.config.json → domainConfirmed: false`). Signatures render the phone token and no tel: link until a real number is entered in `people.json`; the generator switches the link on automatically.

## Statutory facts

`content/state-facts.json`: AZ 25/50/15 (A.R.S. § 28-4009, fetched from azleg.gov), NV 25/50/20 (NRS 485.185), UT 30/65/25 or $90,000 single limit for policies issued or renewed on or after 2025-01-01 (Utah Code § 31A-22-304; the pre-2025 25/65/15 is superseded and must not be copied from older material), ID 25/50/15 (Idaho Code § 49-117). NV, UT and ID were verified on the Justia statute mirrors because the legislature sites refused automated connections on 2026-09-13; counsel should re-read the official text before print.

## Banner slogan — flagged for compliance review (2026-09-21)

The client (Breanna Ellis) asked for the banner line to read **"Peak Protection, Every Policy"**. It is in the banners now, and it lives in `collateral.config.json` as `bannerSlogan` so one edit changes all four.

It is flagged, not blocked, because it sits against two rules the brand system calls hard:

- **§2 Voice** bans superlatives and marketing enthusiasm. "Peak" doubles as the brand name, but it also reads as *maximum*, and that is the reading a regulator or a competitor's compliance officer will take.
- **§9 Compliance** says never promise an outcome. "Peak Protection, Every Policy" can be read as a claim about the level of cover and about every policy the agency writes. The agency does not control the level of cover; the carrier and the underwriting do.

The automated banned-phrase list does not catch it, and it never would: the list holds literal strings ("cheapest", "guaranteed savings"), and this is a claim made by implication. That is exactly the case §9 says to flag rather than publish.

**For the agency's compliance review.** If the line is wanted as-is, the safe form is usually to make it descriptive rather than promissory. Three alternatives that keep the alliteration and the brand pun without the implied guarantee:

- "Peak coverage, compared." — states the service, not the outcome.
- "Every policy, compared line by line." — the actual offer, no superlative.
- "Peak Protection, Every Policy — reviewed, not promised." — keeps the client's line, qualifies the claim.

The site's own proposition is unchanged: `positioningLine` and the homepage H1 still read "Compared across carriers. Explained with the math."
