/** pnpm verify:compliance — disclosures present where required, TPMO on Medicare routes, license lines, banned phrases, no testimonials without consent. */
import { fetchPage, loadManifest, main, pmap, report, strip, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const { manifest, banned, disclosure } = await withPayload(async (p) => {
  const c = await p.findGlobal({ slug: "compliance-settings", depth: 0, overrideAccess: true });
  return { manifest: await loadManifest(p), banned: (c.bannedPhrases ?? []).map((b) => b.phrase.toLowerCase()), disclosure: c.independentAgencyDisclosure };
});
const extra = ["guaranteed lowest rate", "cheapest", "we'll save you", "always covered", "instant approval", "save up to", "% off", "lowest price"];
const phrases = [...new Set([...banned, ...extra])];
let checked = 0, medicare = 0;
await pmap(manifest, 8, async (r) => {
  const { status, html } = await fetchPage(r.path);
  if (status !== 200) return;
  checked++;
  if (!html.includes(disclosure)) failures.push(`${r.path}: independent-agency disclosure missing`);
  const isMedicare = /\/insurance\/medicare\//.test(r.path);
  if (isMedicare) { medicare++; if (!/data-disclosure="medicareTpmo"/.test(html)) failures.push(`${r.path}: TPMO disclaimer block missing`); }
  if (/^\/legal\/licensing\/[a-z-]+\/$/.test(r.path) && !/data-license/.test(html)) failures.push(`${r.path}: license line missing`);
  const text = strip(main(html)).toLowerCase();
  for (const ph of phrases) if (text.includes(ph)) failures.push(`${r.path}: banned phrase "${ph}"`);
  if (/data-testimonial/.test(html)) failures.push(`${r.path}: testimonial rendered (consent must be on file)`);
});
notes.push(`checked ${checked} routes, ${medicare} Medicare-touching, ${phrases.length} banned phrases`);
report("verify:compliance", failures, notes);
