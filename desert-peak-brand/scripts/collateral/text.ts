/** Text-layer extraction shared by check-banned-phrases.ts and check-medicare.ts. */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const JSZip = require("jszip");

export const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
export function svgText(svg: string): string { return decode([...svg.matchAll(/<(?:text|tspan)[^>]*>([^<]*)<\/(?:text|tspan)>/g)].map((m) => m[1]).join(" ")); }
export function htmlText(html: string): string { return decode(html.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ")); }
export async function pptxText(file: string): Promise<{ slide: string; text: string }[]> {
  const zip = await JSZip.loadAsync(readFileSync(file));
  const out: { slide: string; text: string }[] = [];
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/(slides|slideLayouts|notesSlides)\/[^/]+\.xml$/.test(n)).sort()) {
    const xml = await zip.files[name].async("string");
    out.push({ slide: name, text: decode([...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1]).join(" ")) });
  }
  return out;
}
