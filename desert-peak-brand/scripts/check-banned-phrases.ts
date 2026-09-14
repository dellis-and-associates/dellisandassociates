/**
 * Runs the banned-phrase list (content/banned-phrases.json) over every text layer in
 * social/, decks/, web/og and email/. Text layers: SVG <text>, HTML body text, PPTX <a:t>.
 * Exit 1 on any hit. Usage: node scripts/check-banned-phrases.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, findBanned, listFiles, rel } from "./collateral/lib.ts";

import { htmlText, pptxText, svgText } from "./collateral/text.ts";

const hits: string[] = [];
let layers = 0;
for (const f of [...listFiles(join(ROOT, "social"), /\.svg$/), ...listFiles(join(ROOT, "web", "og"), /\.svg$/)]) { layers++; for (const h of findBanned(svgText(readFileSync(f, "utf8")))) hits.push(`${rel(f)}: "${h}"`); }
for (const f of [...listFiles(join(ROOT, "email"), /\.(html|txt)$/), ...listFiles(join(ROOT, "social"), /\.md$/), ...listFiles(join(ROOT, "showcase"), /\.html$/)]) { layers++; for (const h of findBanned(htmlText(readFileSync(f, "utf8")))) hits.push(`${rel(f)}: "${h}"`); }
for (const f of listFiles(join(ROOT, "decks"), /\.pptx$/)) for (const s of await pptxText(f)) { layers++; for (const h of findBanned(s.text)) hits.push(`${rel(f)} [${s.slide}]: "${h}"`); }

if (hits.length) { console.error(`check-banned-phrases: ${hits.length} hit(s)`); for (const h of hits) console.error("  - " + h); process.exit(1); }
console.log(`check-banned-phrases: ${layers} text layers clean`);
