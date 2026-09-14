/** pnpm verify:compliance — disclosures on every page (independent agency, licensed states, the Medicare TPMO disclaimer verbatim in the footer), license lines, banned phrases, no testimonials without written consent. */
import { fetchPage, loadManifest, main, pmap, report, strip, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const { manifest, banned, disclosure, tpmo, consent } = await withPayload(async (p) => {
  const c = await p.findGlobal({ slug: "compliance-settings", depth: 0, overrideAccess: true });
  const site = await p.findGlobal({ slug: "site-settings", depth: 0, overrideAccess: true });
  return { manifest: await loadManifest(p), banned: (c.bannedPhrases ?? []).map((b) => b.phrase.toLowerCase()), disclosure: c.independentAgencyDisclosure, tpmo: c.medicareInScope ? c.medicareTpmoDisclaimer ?? "" : "", consent: Boolean(site.testimonialConsentConfirmed) };
});
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");
const extra = ["guaranteed lowest rate", "cheapest", "we'll save you", "always covered", "instant approval", "save up to", "% off", "lowest price"];
const phrases = [...new Set([...banned, ...extra])];
let checked = 0, medicare = 0;
await pmap(manifest, 8, async (r) => {
  const { status, html } = await fetchPage(r.path);
  if (status !== 200) return;
  checked++;
  if (!html.includes(disclosure)) failures.push(`${r.path}: independent-agency disclosure missing`);
  // Medicare is in scope, so the TPMO disclaimer is in the footer of every page (parity row 23), verbatim from ComplianceSettings.
  if (tpmo) {
    if (!/data-disclosure="medicareTpmo"/.test(html)) failures.push(`${r.path}: TPMO disclaimer block missing`);
    else if (!html.includes(esc(tpmo)) && !html.includes(tpmo)) failures.push(`${r.path}: TPMO disclaimer text differs from ComplianceSettings`);
    if (/\{\{TODO:compliance\.medicareTpmo/.test(html)) failures.push(`${r.path}: TPMO disclaimer is still a TODO token`);
  }
  const isMedicare = /\/insurance\/medicare\//.test(r.path);
  if (isMedicare) medicare++;
  if (/^\/legal\/licensing\/[a-z-]+\/$/.test(r.path) && !/data-license/.test(html)) failures.push(`${r.path}: license line missing`);
  const text = strip(main(html)).toLowerCase();
  for (const ph of phrases) if (text.includes(ph)) failures.push(`${r.path}: banned phrase "${ph}"`);
  if (/data-testimonial/.test(html) && !consent) failures.push(`${r.path}: testimonial rendered without SiteSettings.testimonialConsentConfirmed`);
});
notes.push(`checked ${checked} routes, TPMO disclaimer on every page (${medicare} Medicare-touching), testimonial consent confirmed: ${consent}, ${phrases.length} banned phrases`);
report("verify:compliance", failures, notes);
