/**
 * Renders a Markdown document to PNG in the Desert Peak type and colour system: Instrument Serif for
 * display headings, Figtree for text, DM Mono for eyebrows, labels and figures, on the warm surface,
 * with hairline rules between sections and no shadows. Fonts are embedded, so the HTML is standalone.
 *
 *   node scripts/render-doc-png.ts <file.md> --out <dir> [--width 1400] [--page-height 2000]
 *
 * Writes <name>.html, <name>.png (the whole document) and <name>-p01.png… (readable pages).
 * The Markdown subset is the one this repo's documents use: headings, paragraphs, bullet and task
 * lists, tables, fenced code, blockquotes, rules, bold, inline code and links.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { BRAND, CACHE, ROOT, dataUri, renderAll, sem, type RenderJob } from "./collateral/lib.ts";

const args = process.argv.slice(2);
const arg = (k: string, d?: string) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : d; };
const SRC = args.find((a) => !a.startsWith("--") && a.endsWith(".md"));
if (!SRC) { console.error("usage: node scripts/render-doc-png.ts <file.md> --out <dir>"); process.exit(2); }
const OUT = arg("out", join(ROOT, "docs-png"))!;
const WIDTH = Number(arg("width", "1400"));
const PAGE_H = Number(arg("page-height", "2000"));
mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// Markdown -> HTML (the subset this repo writes)
// ---------------------------------------------------------------------------
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
function mdToHtml(md: string): { title: string; description: string; body: string } {
  let title = "", description = "";
  const fm = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (fm) {
    title = (fm[1].match(/^name:\s*(.+)$/m)?.[1] ?? "").trim();
    description = (fm[1].match(/^description:\s*([\s\S]*?)(?=\n[a-z-]+:|$)/m)?.[1] ?? "").trim();
    md = md.slice(fm[0].length);
  }
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  const flushPara = (buf: string[]) => { if (buf.length) { out.push(`<p>${inline(buf.join(" "))}</p>`); buf.length = 0; } };
  const para: string[] = [];
  while (i < lines.length) {
    const line = lines[i];
    // fenced code
    if (/^```/.test(line)) {
      flushPara(para);
      const lang = line.slice(3).trim(); const code: string[] = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
      i++;
      out.push(`<pre data-lang="${esc(lang)}"><code>${esc(code.join("\n"))}</code></pre>`);
      continue;
    }
    // table
    if (/^\|/.test(line) && /^\|[\s:|-]+\|$/.test(lines[i + 1] ?? "")) {
      flushPara(para);
      const cells = (r: string) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line); const align = cells(lines[i + 1]).map((a) => (a.endsWith(":") ? (a.startsWith(":") ? "center" : "right") : "left"));
      i += 2; const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(`<div class="tw"><table><thead><tr>${head.map((h, n) => `<th style="text-align:${align[n]}">${inline(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, n) => `<td style="text-align:${align[n] ?? "left"}">${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flushPara(para); const n = h[1].length; out.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
    // rule
    if (/^---+\s*$/.test(line)) { flushPara(para); out.push("<hr>"); i++; continue; }
    // blockquote
    if (/^>\s?/.test(line)) {
      flushPara(para); const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${inline(q.join(" "))}</blockquote>`);
      continue;
    }
    // list (bullet or task), with nesting by two spaces
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara(para); const items: string[] = []; let task = false;
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (/^\s*[-*]\s+/.test(lines[i])) {
          let t = lines[i].replace(/^\s*[-*]\s+/, "");
          const box = t.match(/^\[( |x|X)\]\s*/);
          if (box) { task = true; t = t.slice(box[0].length); items.push(`<li class="task"><span class="box">${box[1].trim() ? "✓" : ""}</span>${inline(t)}</li>`); }
          else items.push(`<li>${inline(t)}</li>`);
          i++;
        } else { items[items.length - 1] = items[items.length - 1].replace(/<\/li>$/, ` ${inline(lines[i].trim())}</li>`); i++; }
      }
      out.push(`<ul${task ? ' class="tasks"' : ""}>${items.join("")}</ul>`);
      continue;
    }
    if (!line.trim()) { flushPara(para); i++; continue; }
    para.push(line.trim()); i++;
  }
  flushPara(para);
  return { title, description, body: out.join("\n") };
}

// ---------------------------------------------------------------------------
// Page shell: the brand's own type roles
// ---------------------------------------------------------------------------
const FONTS = [
  { family: "Instrument Serif", file: "instrument-serif-400.woff2", weight: "400", style: "normal" },
  { family: "Figtree", file: "figtree-variable.woff2", weight: "300 900", style: "normal" },
  { family: "Figtree", file: "figtree-italic-variable.woff2", weight: "300 900", style: "italic" },
  { family: "DM Mono", file: "dm-mono-400.woff2", weight: "400", style: "normal" },
];
const faces = FONTS.map((f) => `@font-face{font-family:"${f.family}";src:url("${dataUri(join(BRAND, "fonts", f.file), "font/woff2")}") format("woff2");font-weight:${f.weight};font-style:${f.style};font-display:block}`).join("\n");

const md = readFileSync(SRC, "utf8");
const { title, description, body } = mdToHtml(md);
const name = basename(SRC).replace(/\.md$/, "");
const docH1 = body.match(/^<h1>[\s\S]*?<\/h1>/)?.[0] ?? "";   // the document's own title, if it has one
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title || name)}</title><style>
${faces}
:root{color-scheme:light}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:${sem("surface")};color:${sem("ink")};font-family:Figtree,Arial,sans-serif;font-size:17px;line-height:1.7;-webkit-font-smoothing:antialiased}
.shell{max-width:${WIDTH - 220}px;margin:0 auto;padding:88px 0 120px}
.eyebrow{font-family:"DM Mono",monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${sem("ink-muted")};margin:0 0 36px}
h1{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:64px;line-height:1.02;letter-spacing:-.022em;margin:0 0 20px;text-wrap:balance;font-optical-sizing:auto}
.desc{font-size:19px;line-height:1.6;color:${sem("ink-muted")};max-width:64ch;margin:0 0 8px}
h2{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:40px;line-height:1.06;letter-spacing:-.016em;margin:72px 0 20px;text-wrap:balance;padding-top:40px;border-top:1px solid ${sem("border")}}
h3{font-family:Figtree,Arial,sans-serif;font-weight:600;font-size:21px;line-height:1.28;letter-spacing:-.008em;margin:40px 0 12px}
h4{font-family:"DM Mono",monospace;font-weight:400;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${sem("ink-muted")};margin:32px 0 10px}
p{margin:0 0 18px;max-width:64ch}
ul{margin:0 0 18px;padding-left:22px;max-width:64ch}
li{margin:0 0 9px}
ul.tasks{list-style:none;padding-left:0}
li.task{display:flex;gap:12px;align-items:flex-start}
li.task .box{flex:0 0 auto;width:19px;height:19px;margin-top:4px;border:1px solid ${sem("border-strong")};border-radius:2px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;color:${sem("positive")};font-family:"DM Mono",monospace}
strong{font-weight:600}
code{font-family:"DM Mono",monospace;font-size:.88em;background:${sem("surface-sunken")};padding:1px 6px;border-radius:2px}
pre{font-family:"DM Mono",monospace;font-size:13.5px;line-height:1.75;background:${sem("surface-sunken")};border:1px solid ${sem("border")};border-radius:4px;padding:22px 26px;overflow:hidden;white-space:pre-wrap;margin:0 0 22px}
pre code{background:none;padding:0;font-size:inherit}
blockquote{margin:0 0 22px;padding:20px 26px;border-left:3px solid ${sem("brand")};background:${sem("surface-raised")};font-family:"Instrument Serif",Georgia,serif;font-size:28px;line-height:1.24;letter-spacing:-.012em;max-width:56ch}
hr{border:0;border-top:1px solid ${sem("border")};margin:56px 0}
h2 + hr{display:none}
hr + h2{border-top:0;padding-top:0;margin-top:44px}
.tw{margin:0 0 24px;border:1px solid ${sem("border")};border-radius:4px;overflow:hidden}
table{width:100%;border-collapse:collapse;font-size:15.5px}
th{font-family:"DM Mono",monospace;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:${sem("ink-muted")};font-weight:400;background:${sem("surface-sunken")};padding:12px 16px;border-bottom:1px solid ${sem("border")};vertical-align:bottom}
td{padding:12px 16px;border-bottom:1px solid ${sem("border")};vertical-align:top;font-variant-numeric:tabular-nums}
tr:last-child td{border-bottom:0}
a{color:${sem("brand")};text-underline-offset:3px}
</style></head><body><div class="shell">
<p class="eyebrow">Desert Peak Insurance · brand system</p>
${docH1 ? "" : `<h1>${esc(title ? title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : name)}</h1>`}
${docH1 ? body.replace(docH1, `${docH1}\n${description ? `<p class="desc">${inline(description)}</p>` : ""}`) : `${description ? `<p class="desc">${inline(description)}</p>` : ""}\n${body}`}
</div></body></html>`;

const htmlPath = join(OUT, `${name}.html`);
writeFileSync(htmlPath, html);

// measure, then render the whole document and readable pages
const probe = join(CACHE, "docpng"); mkdirSync(probe, { recursive: true });
await renderAll([{ src: htmlPath, out: join(probe, "probe.png"), w: WIDTH, h: 1200 }]);
const heightHtml = html.replace("</body>", `<script>document.title=document.documentElement.scrollHeight</script></body>`);
const measurePath = join(probe, "measure.html"); writeFileSync(measurePath, heightHtml);
// simplest reliable measure: render tall and trim on the background colour
const TALL = 30000;
await renderAll([{ src: htmlPath, out: join(probe, "tall.png"), w: WIDTH, h: TALL }]);
const { execFileSync } = await import("node:child_process");
const trimmed = execFileSync("python3", ["-c", `
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
w, h = im.size
px = im.load()
bg = px[2, h - 2]
last = 0
for y in range(h - 1, -1, -1):
    if any(px[x, y] != bg for x in range(0, w, 7)):
        last = y
        break
out = im.crop((0, 0, w, min(h, last + 96)))
out.save(sys.argv[2])
print(out.size[1])
`, join(probe, "tall.png"), join(OUT, `${name}.png`)], { encoding: "utf8" }).trim();
const total = Number(trimmed);

const pages = Math.ceil(total / PAGE_H);
const jobs: RenderJob[] = [];
execFileSync("python3", ["-c", `
import sys
from PIL import Image
src, outdir, name, page_h, total = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
im = Image.open(src)
n = (total + page_h - 1) // page_h
for i in range(n):
    top = i * page_h
    im.crop((0, top, im.size[0], min(total, top + page_h))).save(f"{outdir}/{name}-p{i+1:02d}.png")
print(n)
`, join(OUT, `${name}.png`), OUT, name, String(PAGE_H), String(total)], { encoding: "utf8" });
void jobs;
console.log(`render-doc-png: ${name}.png ${WIDTH}×${total}, ${pages} page images, html beside it -> ${OUT}`);
