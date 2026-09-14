import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "How to file a claim",
  lede: "The order of operations after a loss, from making the scene safe to signing off on the settlement, and who to call at each step.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Claims go better when they are reported promptly, documented before anything is cleaned up, and handled under one claim number. The steps below apply to auto, home, renters and most commercial losses; where a line differs, the difference is noted.",
          ],
        },
        {
          heading: "Make it safe first",
          paragraphs: [
            "Move people out of harm's way before anything else. After a crash, get the car off the roadway if it drives and it is safe to do so, turn on the hazard lights, and call emergency services if anyone is hurt or a vehicle cannot move. After a fire, a burst pipe or storm damage, shut off the utility that is doing the harm, water at the main, gas at the meter, power at the panel, and stay out of a structure you are not sure is sound. A police or fire department report becomes evidence later; ask for the report number before they leave.",
          ],
        },
        {
          heading: "Document before you clean up",
          paragraphs: [
            "Photograph everything from several distances before moving it: the damage, the whole room or the whole vehicle, the cause if you can see it, the other car's plate and damage, and the scene. Note the date, the time and the weather. For a crash, get the other driver's name, phone, insurer and policy number, plus the names and numbers of any witnesses. For a theft, list what is missing and gather receipts, photos or bank records that show you owned it. Keep damaged items until the adjuster has seen them or released them; a policy can require it.",
          ],
        },
        {
          heading: "Prevent further damage",
          paragraphs: [
            "Policies expect reasonable steps to keep the loss from getting worse, and they pay for those steps: a tarp over a roof, a plumber to stop a leak, boarding a broken window, drying out a wet floor. Keep every receipt. Do not start permanent repairs before the adjuster has inspected unless the carrier tells you to in writing.",
          ],
        },
        {
          heading: "Notify the carrier",
          paragraphs: [
            "Call the claims number on the policy, or use the carrier's app or website. Reporting directly gives you a claim number at once and starts the carrier's own response clock. Give the facts as you know them without guessing about fault or cause; if you do not know, say so. If you want help deciding whether to file at all, call the office first and an advisor will walk through the deductible and the likely effect on the premium, then report the claim with you if filing is the right call.",
          ],
        },
        {
          heading: "Write down the claim number",
          paragraphs: [
            "One claim number follows the loss to the end. Put it on every email, every receipt and every voicemail. Ask for the adjuster's direct phone and email, and keep a log of the date and substance of every conversation; a short log settles a surprising number of disagreements.",
          ],
        },
        {
          heading: "Work with the adjuster",
          paragraphs: [
            "The adjuster is the carrier's employee or contractor who decides what the policy owes. They will inspect, in person or from your photos, ask for documents, and produce an estimate. Answer promptly and accurately; recorded statements are routine, and you can ask for a copy. If the claim involves an injury to someone else, do not discuss fault with them or their insurer; refer them to your carrier.",
          ],
        },
        {
          heading: "Read the estimate",
          paragraphs: [
            "An estimate lists each damaged item, the cost to repair or replace it, the depreciation withheld if the coverage pays actual cash value, and the deductible subtracted. Compare it line by line with your own contractor's or body shop's estimate. The usual gaps are matching (undamaged tile or siding that cannot be matched to the new), code upgrades, contents, and additional living expense or rental. Send the office both estimates and an advisor will read them against the policy language with you.",
          ],
        },
        {
          heading: "Understand the deductible",
          paragraphs: [
            "The deductible comes out of what the carrier pays, not on top of what you pay the shop. For example, say a repair estimate comes to $4,000 and the deductible is $1,000: the carrier pays $3,000 and the shop collects the remaining $1,000 from you. If another driver was at fault and their carrier pays, there is normally no deductible; if your own carrier pays first and then recovers from the other insurer, it returns your deductible when the recovery comes in.",
          ],
        },
        {
          heading: "Settlement",
          paragraphs: [
            "The carrier pays by check or transfer, often in stages: actual cash value first, then the recoverable depreciation once the repairs are complete and invoiced. If there is a mortgage or a lien, the check names the lender as a payee, and the lender has its own endorsement process. Do not sign a release on an injury claim until treatment is finished and you understand what you are giving up; the office or an attorney can explain the release before you sign it.",
          ],
        },
        {
          heading: "Who to call",
          paragraphs: [],
          bullets: [
            "Injury or danger: emergency services.",
            "To report the claim or check its status: the carrier's claims line on your policy, with your claim number.",
            "To understand a coverage, an estimate or a settlement offer: the office.",
            "For a claim that has stalled: the office, which can escalate through the carrier's agency contacts.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Talk to the office about a claim", body: "Send the claim number and the last thing the carrier sent you.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "How to file an insurance claim step by step: make it safe, document the loss, notify the carrier, work with the adjuster, read the estimate, and settle." },
};
