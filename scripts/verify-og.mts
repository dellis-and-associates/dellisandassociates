/**
 * pnpm verify:og — share previews (SEO brief, section 6). Every template family
 * carries the full OpenGraph and Twitter set with absolute URLs; the image
 * resolves as a 1200×630 PNG under 200 KB with real alt text; and one preview
 * per family is written to OG-PREVIEWS/ so a person can look at the cards.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { BASE, attr, fetchPage, loadManifest, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const manifest = await withPayload(loadManifest);
const REQUIRED_OG = ["og:site_name", "og:type", "og:url", "og:title", "og:description", "og:image", "og:image:width", "og:image:height", "og:image:alt", "og:locale"];
const REQUIRED_TW = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"];
const MAX_BYTES = 200 * 1024;
const out = "OG-PREVIEWS";
mkdirSync(out, { recursive: true });

const byGroup = new Map<string, string>();
for (const r of manifest) if (!byGroup.has(r.group)) byGroup.set(r.group, r.path);
// Shareable utility pages carry cards too, even though they are noindex.
const sample = [...new Set(["/", ...byGroup.values(), "/contact/", "/forms/new-client-intake/", "/partners/"])];

const meta = (html: string, key: string) => attr(html, new RegExp(`<meta (?:property|name)="${key.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}" content="([^"]*)"`));
let written = 0;
for (const path of sample) {
  const { status, html } = await fetchPage(path);
  if (status !== 200) { failures.push(`${path}: ${status}`); continue; }
  for (const key of [...REQUIRED_OG, ...REQUIRED_TW]) if (!meta(html, key)) failures.push(`${path}: missing ${key}`);
  for (const key of ["og:url", "og:image", "twitter:image"]) {
    const v = meta(html, key);
    if (v && !/^https?:\/\//.test(v)) failures.push(`${path}: ${key} is not absolute (${v})`);
  }
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const ogUrl = meta(html, "og:url");
  if (canonical && ogUrl && canonical !== ogUrl) failures.push(`${path}: og:url ${ogUrl} differs from the canonical ${canonical}`);
  const alt = meta(html, "og:image:alt");
  if (alt && /^(image|og image|preview)$/i.test(alt.trim())) failures.push(`${path}: og:image:alt is a placeholder ("${alt}")`);
  const card = meta(html, "twitter:card");
  if (card && card !== "summary_large_image") failures.push(`${path}: twitter:card is "${card}", expected summary_large_image`);
  const img = meta(html, "og:image");
  if (!img) continue;
  const res = await fetch(img.replace(/^https?:\/\/[^/]+/, BASE));
  if (!res.ok) { failures.push(`${path}: og:image ${img} returned ${res.status}`); continue; }
  const buf = new Uint8Array(await res.arrayBuffer());
  const isPng = buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50;
  const width = isPng ? (buf[16]! << 24) | (buf[17]! << 16) | (buf[18]! << 8) | buf[19]! : 0;
  const height = isPng ? (buf[20]! << 24) | (buf[21]! << 16) | (buf[22]! << 8) | buf[23]! : 0;
  if (!isPng) failures.push(`${path}: og:image is not a PNG`);
  else if (width !== 1200 || height !== 630) failures.push(`${path}: og:image is ${width}×${height}, expected 1200×630`);
  if (buf.length > MAX_BYTES) failures.push(`${path}: og:image is ${Math.round(buf.length / 1024)} KB, over the 200 KB budget`);
  const name = path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "_");
  writeFileSync(`${out}/${name}.png`, buf);
  written++;
}
notes.push(`checked ${sample.length} template families; wrote ${written} previews to ${out}/`);
report("verify:og", failures, notes);
