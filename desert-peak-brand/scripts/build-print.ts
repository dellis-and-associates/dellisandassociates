/**
 * Stage 5.5 — business cards. Print-ready PDF per person from people.json plus a generic company card.
 * US 3.5×2 in landscape trim, 0.125 in bleed, 0.125 in safe margin, crop marks, fonts embedded (subset),
 * CMYK output: pdfkit draws the RGB token colours, Ghostscript separates to DeviceCMYK, pdf-lib restores
 * the page boxes and fixes the metadata dates so the files are reproducible.
 * Also writes PRINT-COLORS.md from a swatch file put through the same separation, so the CMYK table is
 * what the press file actually contains. Usage: node scripts/build-print.ts
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { inflateSync } from "node:zlib";
import { CACHE, PRIMITIVES, ROOT, SEMANTIC, TODAY, bannedGuard, config, fullName, licenseLine, logoInner, logoViewBox, people, sem, staticFontPath, write, writeInventory, type InventoryRow, type Person } from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");
const { PDFDocument: PdfLib, PDFName, PDFArray, PDFNumber } = require("pdf-lib");

const PRINT = join(ROOT, "print");
const rows: InventoryRow[] = [];
const FIXED_DATE = new Date(`${TODAY}T00:00:00Z`);

// ---------------------------------------------------------------------------
// Geometry (PostScript points; 72 pt = 1 in)
// ---------------------------------------------------------------------------
const BLEED = 9, SAFE = 9;                       // 0.125 in each
const TRIM_W = 252, TRIM_H = 144;                // 3.5 × 2 in
const PAGE_W = TRIM_W + 2 * BLEED, PAGE_H = TRIM_H + 2 * BLEED;   // 270 × 162
const INNER = { x: BLEED + SAFE, y: BLEED + SAFE, w: TRIM_W - 2 * SAFE, h: TRIM_H - 2 * SAFE };
const MIN_PT = 7;
let minUsed = Infinity;
const pt = (n: number) => { minUsed = Math.min(minUsed, n); if (n < MIN_PT) throw new Error(`type below ${MIN_PT} pt: ${n}`); return n; };

const FONT = { sans500: staticFontPath("sans-500"), sans600: staticFontPath("sans-600"), serif400: staticFontPath("serif-400") };

function cropMarks(doc: any): void {
  const len = 18, gap = 3;                       // 0.25 in marks, 3 pt off the trim
  doc.save().lineWidth(0.5).strokeColor([0, 0, 0, 100]);   // K only: registration black is wrong for a 1-colour mark
  const xs = [BLEED, BLEED + TRIM_W], ys = [BLEED, BLEED + TRIM_H];
  for (const x of xs) for (const y of ys) {
    const dx = x === BLEED ? -1 : 1, dy = y === BLEED ? -1 : 1;
    doc.moveTo(x + dx * gap, y).lineTo(x + dx * (gap + len), y).stroke();
    doc.moveTo(x, y + dy * gap).lineTo(x, y + dy * (gap + len)).stroke();
  }
  doc.restore();
}
/** The mark from brand/logos/mark.svg, drawn as polygons: never retyped. */
function drawMark(doc: any, x: number, y: number, height: number, fill: string): void {
  const vb = logoViewBox("mark.svg");
  const s = height / vb.h;
  const polys = [...logoInner("mark.svg").matchAll(/<polygon[^>]*points="([^"]+)"/g)].map((m) => m[1].trim().split(/\s+/).map((p) => p.split(",").map(Number)));
  doc.save().translate(x, y).scale(s).fillColor(fill);
  for (const p of polys) doc.polygon(...p).fill();
  doc.restore();
  void PAGE_W;
}
function text(doc: any, str: string, x: number, y: number, o: { font: string; size: number; color: string; w?: number; align?: string; tnum?: boolean; lineGap?: number }): number {
  doc.font(o.font).fontSize(pt(o.size)).fillColor(o.color);
  const opts: Record<string, unknown> = { width: o.w ?? INNER.w, align: o.align ?? "left", lineGap: o.lineGap ?? 1.5 };
  if (o.tnum) opts.features = ["tnum"];
  const h = doc.heightOfString(str, opts);
  doc.text(str, x, y, opts);
  return h;
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
type Card = { slug: string; name: string; title: string; phone: string; email: string; domain: string; compliance: string };
function cardFor(p: Person): Card { return { slug: p.slug, name: fullName(p), title: `${p.title}, ${config.company}`, phone: p.phone, email: p.email, domain: config.domain, compliance: `${config.licensedLine} · ${licenseLine(p)}` }; }
const companyCard: Card = { slug: "company", name: config.company, title: "Independent insurance agency", phone: "{{TODO:client.phone}}", email: `{{TODO:client.email}}`, domain: config.domain, compliance: `${config.licensedLine}. ${config.independentAgencyLine.replace("by email", "by this card")}` };

function drawCard(card: Card, out: string): void {
  const doc = new PDFDocument({ size: [PAGE_W, PAGE_H], margin: 0, autoFirstPage: true, info: { Title: `${config.company} business card — ${card.name}`, Author: config.company, Creator: "scripts/build-print.ts", Producer: "pdfkit + Ghostscript", CreationDate: FIXED_DATE, ModDate: FIXED_DATE } });
  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((res) => doc.on("end", () => res(Buffer.concat(chunks))));

  // Front: no background fill (the paper is the surface colour); one brand rule; type ≥ 7 pt
  bannedGuard(`card ${card.slug}`, `${card.name} ${card.title} ${card.compliance}`);
  let y = INNER.y + 2;
  y += text(doc, card.name, INNER.x, y, { font: FONT.sans600, size: 10.5, color: sem("ink") }) + 1;
  y += text(doc, card.title, INNER.x, y, { font: FONT.sans500, size: 7.5, color: sem("ink-muted") }) + 6;
  doc.rect(INNER.x, y, 36, 0.75).fill(sem("brand"));
  y += 8;
  for (const line of [card.phone, card.email, card.domain]) y += text(doc, line, INNER.x, y, { font: FONT.sans500, size: 7.5, color: sem("ink"), tnum: true }) + 1.5;
  // compliance line, bottom of the safe area, small but ≥ 7 pt
  doc.font(FONT.sans500).fontSize(7);
  const ch = doc.heightOfString(card.compliance, { width: INNER.w, lineGap: 1 });
  text(doc, card.compliance, INNER.x, INNER.y + INNER.h - ch, { font: FONT.sans500, size: 7, color: sem("ink-muted"), lineGap: 1 });
  cropMarks(doc);

  // Back: the mark alone, reversed, centred on a full-bleed brand field. Nothing else. (print/DECISIONS-NOTES.md)
  doc.addPage({ size: [PAGE_W, PAGE_H], margin: 0 });
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(sem("brand"));
  const vb = logoViewBox("mark.svg");
  const markH = 54, markW = (vb.w / vb.h) * markH;                 // 0.75 in tall; band period P = 12.8 pt, clear space 1P ≫ available
  drawMark(doc, BLEED + (TRIM_W - markW) / 2, BLEED + (TRIM_H - markH) / 2, markH, sem("brand-ink"));
  cropMarks(doc);
  doc.end();
  done.then((buf) => { write(out, buf); });
  pendingWrites.push(done);
}
const pendingWrites: Promise<Buffer>[] = [];

// ---------------------------------------------------------------------------
// Separation + box restoration
// ---------------------------------------------------------------------------
function toCmyk(rgbPdf: string, out: string): void {
  execFileSync("gs", ["-q", "-dNOPAUSE", "-dBATCH", "-dSAFER", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.6", "-sColorConversionStrategy=CMYK", "-dProcessColorModel=/DeviceCMYK", "-dOverrideICC", "-dEmbedAllFonts=true", "-dSubsetFonts=true", "-dPreserveMarkedContent=false", "-dOmitInfoDate=true", `-sOutputFile=${out}`, rgbPdf], { stdio: "pipe" });
}
async function restoreBoxesAndDates(file: string): Promise<void> {
  const pdf = await PdfLib.load(readFileSync(file), { updateMetadata: false });
  for (const page of pdf.getPages()) {
    page.setMediaBox(0, 0, PAGE_W, PAGE_H);
    page.setBleedBox(0, 0, PAGE_W, PAGE_H);
    page.setTrimBox(BLEED, BLEED, TRIM_W, TRIM_H);
    page.setArtBox(INNER.x, INNER.y, INNER.w, INNER.h);
  }
  // Ghostscript writes an XMP packet with a random DocumentID; drop the reference AND the object so the file is reproducible
  const metaRef = pdf.catalog.get(PDFName.of("Metadata"));
  pdf.catalog.delete(PDFName.of("Metadata"));
  if (metaRef) pdf.context.delete(metaRef);
  pdf.setCreationDate(FIXED_DATE); pdf.setModificationDate(FIXED_DATE); pdf.setProducer("pdfkit + Ghostscript + pdf-lib (scripts/build-print.ts)"); pdf.setCreator("scripts/build-print.ts");
  // a stable trailer /ID so repeated builds are byte-identical
  const idBytes = Buffer.from(`desert-peak-${file.split("/").pop()}`.padEnd(16, "0").slice(0, 16));
  const hexId = idBytes.toString("hex").toUpperCase();
  const ctx = pdf.context;
  ctx.trailerInfo.ID = PDFArray.withContext(ctx);
  (ctx.trailerInfo.ID as any).push(ctx.obj(`<${hexId}>`)); (ctx.trailerInfo.ID as any).push(ctx.obj(`<${hexId}>`));
  writeFileSync(file, await pdf.save({ useObjectStreams: false, addDefaultPage: false, updateFieldAppearances: false }));
  void PDFName; void PDFNumber;
}

// ---------------------------------------------------------------------------
// PRINT-COLORS.md from a separated swatch file
// ---------------------------------------------------------------------------
async function buildPrintColors(): Promise<void> {
  const entries: { name: string; hex: string; oklch: string }[] = [];
  const tokensCss = readFileSync(join(ROOT, "brand", "dist", "tokens.css"), "utf8");
  const oklchOf = (hex: string) => tokensCss.match(new RegExp(`${hex}; /\\* (oklch\\([^)]*\\))`))?.[1] ?? "";
  for (const [role, hex] of SEMANTIC) entries.push({ name: `semantic · ${role}`, hex, oklch: oklchOf(hex) });
  for (const [path, hex] of PRIMITIVES) entries.push({ name: `primitive · ${path}`, hex, oklch: oklchOf(hex) });
  const doc = new PDFDocument({ size: [400, 20 * entries.length + 20], margin: 0, info: { CreationDate: FIXED_DATE, ModDate: FIXED_DATE } });
  const chunks: Buffer[] = []; doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((res) => doc.on("end", () => res(Buffer.concat(chunks))));
  entries.forEach((e, i) => doc.rect(10, 10 + i * 20, 100, 14).fill(e.hex));
  doc.end();
  const rgb = join(CACHE, "print", "swatches-rgb.pdf"), cmyk = join(CACHE, "print", "swatches-cmyk.pdf");
  write(rgb, await done); toCmyk(rgb, cmyk);
  // read the k operators back in drawing order
  const buf = readFileSync(cmyk);
  const values: number[][] = [];
  for (const m of buf.toString("latin1").matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)) {
    let s: string; try { s = inflateSync(Buffer.from(m[1], "latin1")).toString("latin1"); } catch { continue; }
    for (const k of s.matchAll(/([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) k\b/g)) values.push([+k[1], +k[2], +k[3], +k[4]]);
  }
  if (values.length !== entries.length) throw new Error(`PRINT-COLORS: expected ${entries.length} separated fills, found ${values.length}`);
  const pct = (v: number) => (v * 100).toFixed(1);
  const md: string[] = [];
  md.push(`# Print colours`, ``, `Generated ${TODAY} by \`scripts/build-print.ts\`. The CMYK values are not a formula: a swatch file was drawn in the sRGB token colours and separated with the same Ghostscript command that produces the business-card PDFs (\`-sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK -dOverrideICC\`, Ghostscript's default CMYK profile), and the values below were read back out of that file. They are what the press files contain.`, ``);
  md.push(`**Screen colour is not press colour.** The client must approve a printed proof on the chosen stock before any run. Ghostscript's default separation is a generic SWOP-like profile, not the printer's; if the printer supplies an ICC profile (or asks for GRACoL / FOGRA), re-separate from the RGB source with that profile rather than adjusting these numbers by hand. Uncoated stock will print darker and duller than the on-screen hematite; that is expected and is why the proof exists.`, ``);
  md.push(`| Colour | sRGB | OKLCH | C | M | Y | K |`, `|---|---|---|---:|---:|---:|---:|`);
  entries.forEach((e, i) => md.push(`| ${e.name} | ${e.hex} | ${e.oklch} | ${pct(values[i][0])} | ${pct(values[i][1])} | ${pct(values[i][2])} | ${pct(values[i][3])} |`));
  md.push(``, `## Stock`, ``, `Two uncoated, heavy stocks suit the identity. Uncoated because the palette is mineral and matte; heavy because the back is a solid field and a light card shows through. No foil, no spot UV, no rounded corners: the mark is hard-edged and the system is quiet.`, ``,
    `1. **Mohawk Superfine Eggshell, 120 lb cover (324 gsm), Softwhite.** The warm white sits close to the token surface colour (#FAF4EC), so the front's unprinted paper reads as the brand surface. First choice.`,
    `2. **Neenah Classic Crest, 130 lb cover (352 gsm), Solar White or Natural White.** Slightly cooler and stiffer; Natural White is the closer match. Choose it when the printer does not stock Mohawk.`, ``,
    `The front carries no background fill; the paper is the surface. If the printer's stock is a cold blue-white, print the front on a flood of \`semantic · surface\` instead and proof it. The back is a full-bleed flood of \`semantic · brand\` with the mark reversed to paper (\`semantic · brand-ink\` is the paper colour, not an ink).`, ``,
    `## Specs handed to the printer`, ``, `- Trim 3.5 × 2 in landscape; 0.125 in bleed on all sides (page 3.75 × 2.25 in); 0.125 in safe margin; crop marks outside the trim; TrimBox and BleedBox set in the PDF.`, `- Colour: DeviceCMYK throughout, no RGB objects, no spot colours, no transparency. Crop marks are K only.`, `- Fonts embedded as subsets (Archivo, Source Serif 4; SIL OFL 1.1, see brand/LICENSES.md).`, `- Minimum type 7 pt. Back is a solid; ask for 2-side, 4/4 (or 4/1 if the printer prices the back as one colour: the back separates to a four-colour brown, see \`semantic · brand\` above).`, ``);
  writeFileSync(join(ROOT, "PRINT-COLORS.md"), md.join("\n"));
}

// ---------------------------------------------------------------------------
// Run. pdfkit picks its font-subset tags with Math.random, which would make every build differ by a few
// bytes; a seeded generator during the build keeps the PDFs byte-identical run to run.
// ---------------------------------------------------------------------------
const realRandom = Math.random;
{ let s = 0x5eed5eed; Math.random = () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let x = Math.imul(s ^ (s >>> 15), 1 | s); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }; }
process.on("exit", () => { Math.random = realRandom; });
mkdirSync(join(CACHE, "print"), { recursive: true });
const cards: Card[] = [...people.map(cardFor), companyCard];
for (const c of cards) drawCard(c, join(CACHE, "print", `business-card-${c.slug}-rgb.pdf`));
await Promise.all(pendingWrites);
for (const c of cards) {
  const rgb = join(CACHE, "print", `business-card-${c.slug}-rgb.pdf`), out = join(PRINT, `business-card-${c.slug}.pdf`);
  mkdirSync(PRINT, { recursive: true });
  toCmyk(rgb, out);
  await restoreBoxesAndDates(out);
  const renders = join(PRINT, "renders");
  mkdirSync(renders, { recursive: true });
  execFileSync("pdftoppm", ["-png", "-r", "150", out, join(CACHE, "print", `render-${c.slug}`)], { stdio: "pipe" });
  for (const [page, side] of [["1", "front"], ["2", "back"]] as const) {
    const src = join(CACHE, "print", `render-${c.slug}-${page}.png`);
    writeFileSync(join(renders, `business-card-${c.slug}-${side}.png`), readFileSync(src)); unlinkSync(src);
    rows.push({ asset: `print/renders/business-card-${c.slug}-${side}.png`, dimensions: "563×338 (150 dpi incl. bleed)", source: "scripts/build-print.ts (pdftoppm)", notes: side });
  }
  rows.push({ asset: `print/business-card-${c.slug}.pdf`, dimensions: "3.5×2 in trim + 0.125 in bleed (270×162 pt), 2 pages", source: "scripts/build-print.ts", spec: "US standard business card 3.5×2 in; 0.125 in bleed/safe", notes: `CMYK via Ghostscript; fonts subset-embedded; min type ${minUsed} pt` });
  console.log(`build-print: ${out}`);
}
await buildPrintColors();
rows.push({ asset: "PRINT-COLORS.md", dimensions: "—", source: "scripts/build-print.ts", notes: "CMYK table read back from a separated swatch file" });
writeInventory(PRINT, rows);
console.log(`build-print: ${cards.length} cards, min type ${minUsed} pt, ${rows.length} inventory rows`);
