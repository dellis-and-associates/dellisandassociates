# UX model — who arrives, why, and what "it worked" means

One row of thinking per template. The primary action is singular on purpose;
everything else on the page is quiet. "Success signal" is the thing we can
measure, not a feeling.

| Template | Who arrives, from where, in what state | What they are trying to do | The one primary action | Success signal |
|---|---|---|---|---|
| **Home** `/` | Typed the brand name after a referral or a mailer; or a returning client. Mildly skeptical, not in a hurry. | Confirm this is a real, local, licensed agency and find the line they need. | Start a quote (choose a product). | Click-through to a product or quote route on the first visit; bounce under 40%. |
| **Product hub** `/insurance/{product}/` | Search: "umbrella insurance" or "what does renters insurance cover". Comparing, unsure what the product is for. | Understand what the policy does and does not do, then decide whether to ask for a quote. | Request the analysis for this product. | Scroll past the coverage explainer; CTA click or move to coverage/FAQ subpage. |
| **Coverage / third subpage** | Deeper reader from the hub, or a search for a specific term ("collision vs comprehensive"). | Get an exact answer, often to a single question. | Same CTA as the hub (same name). | Time on page above 60 s; glossary link follows. |
| **State hub** `/insurance/{state}/` | Search: "insurance Arizona" or the state-requirements article. Wants to know what the state requires and whether we are there. | See what the state requires and which lines we write there. | Pick a product or a city. | Navigation into a product × state or city page. |
| **Product × state** | Search: "boat insurance Nevada". Specific line, specific place. | Confirm the line is written in that state and what the state rules are. | Request the analysis. | CTA click; state-minimums table viewed. |
| **Product × city** (380 pages, the volume template) | Search on a phone: "auto insurance Chandler AZ", possibly at a dealership or after a renewal letter. Stressed, fast, comparing tabs. | Find someone local who will do the comparison, and know the local risks the policy should cover. | Call or request the analysis. | Click-to-call tap or CTA click within 30 s; no horizontal scroll; LCP under 1.8 s on Slow 4G. |
| **Locations hub** `/locations/` | Internal navigation. Wants their town. | Find their city. | Choose a state, then a city. | Two taps to a city page. |
| **Resources hub / article** | Search on a question: "does home insurance cover monsoon damage". Curious, possibly worried. | Get the answer and know what to do next. | Read; then the related product. | Read depth past 50%; product link click. |
| **Glossary term** | Search or an in-article link on a term they did not understand. Confused and mildly embarrassed. | Understand the word in one screen and get back to what they were reading. | Return to the product or article that sent them. | Under 20 s to leave via a related link; no bounce to search. |
| **Quote flow** `/quote/` | Came from any CTA. Ready to give details but wary of forms. | Give enough for a real comparison without feeling interrogated. | Continue to the next step; at the end, "Request my comparison". | Completion rate per step; zero data loss on error or back; keyboard-only completion. |
| **Contact / forms** `/contact/`, `/forms/*` | Existing client or a person the office told to fill this in. | Send the thing the office asked for. | Send. | Submission saved even when email is down; confirmation with a reference. |
| **Claims / billing hubs** | Existing client with a problem, tonight. | Reach the carrier or the office, now. | Call the right number. | Click-to-call; nothing else measured. |
| **Legal / licensing** | A regulator, a lawyer, or a careful buyer. | Verify the license. | Read. | Nothing to click; text present and set at readable size. |
| **Agents / carriers hubs** | Trust check: "who are these people, who do they represent". | See real names and real appointments. | Read; call. | Empty-but-honest state until the roster exists; never a placeholder person. |
| **Customer referrer portal** | A client who was given a code; on a phone. | See whether the person they referred was contacted and whether they got their thank-you. | Copy or share the code. | Code copied; status list understood without help. |
| **Partner portal** `/partners/portal/` | A realtor between showings, on a phone, checking last month. | See referral status and payout history; download the statement. | Open this month's statement. | Statement viewed; referral submitted from the phone in under a minute. |
| **Payload admin** | The office, daily; an editor, weekly; counsel, once. | Change one fact in one place; see what is thin. | Save. | Cities list shows completeness; a reviewed flag needs an admin. |
| **404** | A broken link or an old URL. | Get to the thing they wanted. | Search or pick a product. | Not a dead end; redirects seeded so this is rare. |

## Three people to design for

1. **The dealership phone.** Chandler, 6 pm, a finance manager waiting. 320 px,
   one thumb, Slow 4G. The city page must load the phone number and the CTA
   before anything else, and the local risk panel must say something true about
   Chandler that a national site would not.
2. **The embarrassed reader.** Came to the glossary from a renewal notice they
   did not understand. One definition, one plain example, a way back. Nothing
   that implies they should have known.
3. **The realtor between showings.** Partner portal on a phone in a parked car.
   Status of last month's referrals and whether the thank-you went out. Same
   components, same speed, same accessibility as the public site.

## What is deliberately absent

No chat widget over the CTA. No "get a quote in 30 seconds" theatre. No
countdowns, no savings percentages, no testimonials until consent exists. No
state count until the client confirms the list.

## Open decision, raised not assumed

Spanish support for Arizona and Nevada. Not built; the string layer is plain
React, so adding a locale later touches components, not routes.
