import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Cookie policy",
  lede: "This site sets only the cookies it needs to work: one for the quote session, one for a referral link, and the cookies a third-party bot check uses on forms. There are no analytics cookies and no advertising cookies. Effective {{TODO:legal.effectiveDate}}.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "A cookie is a small text file a website stores on your device so it can recognise the same browser on the next request. Cookies are described as strictly necessary when the site cannot do what you asked without them. Every cookie this site sets is in that category, which is why there is no cookie banner asking for consent: there is nothing optional to consent to.",
          ],
        },
        {
          heading: "The cookies this site sets",
          paragraphs: [],
          bullets: [
            "dp_quote: set when you start the quote flow. It holds a random token that links your browser to the answers you have entered so far, so you can leave and come back. It is readable only by the server, is limited to the quote pages, and expires seven days after your last step or when you finish the request.",
            "dp_ref: set when you arrive through a referral link. It records the referral code so that, if you become a client, the referring partner can be credited. It contains no personal information and expires after {{TODO:legal.referralCookieDays}}.",
            "Partner portal session: set only when a referral partner signs in. It keeps that partner signed in and is deleted on sign-out.",
            "Bot check cookies: forms use a challenge provided by a third party to tell people from automated submissions. That provider may set cookies on its own domain to run the check. The agency does not read them and they are governed by the provider's own policy.",
          ],
        },
        {
          heading: "What this site does not do",
          paragraphs: [
            "No analytics service runs on this site, so there is no cookie that tracks which pages you visit or how long you stay. No advertising network is loaded, so no cookie follows you to other sites and no pixel reports your visit to a platform. The agency does not sell or share browsing data, and there is no cross-site tracking to opt out of.",
          ],
        },
        {
          heading: "Controlling cookies",
          paragraphs: [
            "Your browser lets you view, block and delete cookies for any site. Blocking cookies here has two effects: the quote flow cannot hold your place between steps, so a closed tab means starting again, and forms cannot complete the bot check, so they will not submit. Everything else on the site works without cookies.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "If the site ever adds a cookie that is not strictly necessary, this policy will be updated first and consent will be asked for before the cookie is set.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Cookie policy for Desert Peak Insurance: the quote-session cookie, the referral cookie and the bot-check cookies, with no analytics or advertising cookies." },
};
