/**
 * Every asset whose visible text mentions Medicare must carry the TPMO disclaimer text
 * (collateral.config.json → medicare.tpmo.text), verbatim. Checks social masters, OG masters,
 * signatures, decks (whole-deck: if any slide mentions Medicare the disclosure slide must carry it)
 * and the showcase. Exit 1 on any miss. Usage: node scripts/check-medicare.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, TPMO_TEXT, listFiles, mentionsMedicare, rel } from "./collateral/lib.ts";
import { htmlText, pptxText, svgText } from "./collateral/text.ts";

const squash = (s: string) => s.replace(/\s+/g, " ").trim();
const tpmo = squash(TPMO_TEXT);
const misses: string[] = [];
let flagged = 0, checked = 0;
const check = (name: string, text: string) => {
  checked++;
  const t = squash(text);
  const has = t.includes(tpmo);
  if (mentionsMedicare(t.replace(tpmo, ""))) { flagged++; if (!has) misses.push(`${name}: mentions Medicare without the TPMO disclaimer`); }
};
for (const f of [...listFiles(join(ROOT, "social"), /\.svg$/), ...listFiles(join(ROOT, "web", "og"), /\.svg$/)]) check(rel(f), svgText(readFileSync(f, "utf8")));
for (const f of [...listFiles(join(ROOT, "email"), /\.(html|txt)$/), ...listFiles(join(ROOT, "showcase"), /\.html$/)]) check(rel(f), htmlText(readFileSync(f, "utf8")));
for (const f of listFiles(join(ROOT, "decks"), /\.pptx$/)) { const slides = await pptxText(f); check(rel(f), slides.filter((s) => /slides\//.test(s.slide)).map((s) => s.text).join(" ")); }

if (misses.length) { console.error(`check-medicare: ${misses.length} miss(es)`); for (const m of misses) console.error("  - " + m); process.exit(1); }
console.log(`check-medicare: ${checked} assets checked, ${flagged} Medicare-flagged, all carry the TPMO disclaimer`);
