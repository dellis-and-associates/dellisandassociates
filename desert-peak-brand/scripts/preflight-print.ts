/**
 * PDF preflight for print/*.pdf: page boxes present and correct, no RGB objects, fonts embedded (no Type3),
 * no transparency (SMask, constant alpha, blend modes), Ghostscript re-distills cleanly.
 * Writes print/preflight/{name}.md and print/preflight/REPORT.md. Exit 1 on any failure.
 * Usage: node scripts/preflight-print.ts
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { inflateSync } from "node:zlib";
import { ROOT, TODAY, listFiles, rel } from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef, PDFRawStream, PDFNumber } = require("pdf-lib");

const PRINT = join(ROOT, "print");
const OUT = join(PRINT, "preflight");
mkdirSync(OUT, { recursive: true });
const EXPECT = { media: [0, 0, 270, 162], bleed: [0, 0, 270, 162], trim: [9, 9, 261, 153] };
const close = (a: number[], b: number[]) => a.length === 4 && a.every((v, i) => Math.abs(v - b[i]) < 0.5);

type Check = { name: string; ok: boolean; detail: string };
async function preflight(file: string): Promise<Check[]> {
  const checks: Check[] = [];
  const bytes = readFileSync(file);
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
  const ctx = pdf.context;
  const deref = (o: any) => (o instanceof PDFRef ? ctx.lookup(o) : o);
  const nums = (arr: any): number[] => (arr instanceof PDFArray ? arr.asArray().map((n: any) => (deref(n) as any).asNumber()) : []);

  // 1. boxes
  pdf.getPages().forEach((p: any, i: number) => {
    const node = p.node;
    const media = nums(deref(node.get(PDFName.of("MediaBox")))), bleed = nums(deref(node.get(PDFName.of("BleedBox")))), trim = nums(deref(node.get(PDFName.of("TrimBox"))));
    checks.push({ name: `page ${i + 1} MediaBox`, ok: close(media, EXPECT.media), detail: media.join(" ") });
    checks.push({ name: `page ${i + 1} BleedBox`, ok: close(bleed, EXPECT.bleed), detail: bleed.length ? bleed.join(" ") : "missing" });
    checks.push({ name: `page ${i + 1} TrimBox`, ok: close(trim, EXPECT.trim), detail: trim.length ? trim.join(" ") : "missing" });
  });

  // 2. colour: content streams + colour spaces + images
  let rgbOps = 0, cmykOps = 0, rgbSpaces: string[] = [], transparency: string[] = [];
  const streamText = (s: any): string => {
    if (!(s instanceof PDFRawStream)) return "";
    const filter = s.dict.get(PDFName.of("Filter"));
    const raw = Buffer.from(s.contents);
    try { return (filter && String(filter).includes("FlateDecode") ? inflateSync(raw) : raw).toString("latin1"); } catch { return raw.toString("latin1"); }
  };
  const walkResources = (res: any, where: string, seen = new Set<string>()) => {
    res = deref(res); if (!(res instanceof PDFDict)) return;
    const cs = deref(res.get(PDFName.of("ColorSpace")));
    if (cs instanceof PDFDict) for (const [k, v] of cs.entries()) {
      const space = deref(v);
      const desc = space instanceof PDFArray ? space.asArray().map((x: any) => String(deref(x) instanceof PDFRawStream ? "stream" : x)).join(" ") : String(space);
      if (/DeviceRGB|CalRGB/.test(desc)) rgbSpaces.push(`${where} ${String(k)}: ${desc}`);
      if (space instanceof PDFArray && String(space.asArray()[0]) === "/ICCBased") { const icc = deref(space.asArray()[1]); const n = deref(icc?.dict?.get(PDFName.of("N"))); if (n instanceof PDFNumber && n.asNumber() === 3) rgbSpaces.push(`${where} ${String(k)}: ICCBased N=3 (RGB)`); }
    }
    const gs = deref(res.get(PDFName.of("ExtGState")));
    if (gs instanceof PDFDict) for (const [k, v] of gs.entries()) {
      const g = deref(v); if (!(g instanceof PDFDict)) continue;
      for (const key of ["ca", "CA"]) { const a = deref(g.get(PDFName.of(key))); if (a instanceof PDFNumber && a.asNumber() < 1) transparency.push(`${where} ExtGState ${String(k)} /${key} ${a.asNumber()}`); }
      const sm = g.get(PDFName.of("SMask")); if (sm && String(sm) !== "/None") transparency.push(`${where} ExtGState ${String(k)} /SMask`);
      const bm = g.get(PDFName.of("BM")); if (bm && !/Normal|Compatible/.test(String(bm))) transparency.push(`${where} ExtGState ${String(k)} /BM ${String(bm)}`);
    }
    const xo = deref(res.get(PDFName.of("XObject")));
    if (xo instanceof PDFDict) for (const [k, v] of xo.entries()) {
      const x = deref(v); if (!(x instanceof PDFRawStream)) continue;
      const key = String(v); if (seen.has(key)) continue; seen.add(key);
      const sub = String(x.dict.get(PDFName.of("Subtype")));
      if (x.dict.get(PDFName.of("SMask"))) transparency.push(`${where} XObject ${String(k)} has /SMask`);
      const xcs = deref(x.dict.get(PDFName.of("ColorSpace"))); if (xcs && /DeviceRGB|CalRGB/.test(String(xcs))) rgbSpaces.push(`${where} image ${String(k)} ${String(xcs)}`);
      if (sub === "/Form") { const t = streamText(x); rgbOps += (t.match(/\b(rg|RG)\b/g) ?? []).length; cmykOps += (t.match(/\b(k|K)\b/g) ?? []).length; walkResources(x.dict.get(PDFName.of("Resources")), `${where}/${String(k)}`, seen); }
    }
  };
  pdf.getPages().forEach((p: any, i: number) => {
    const contents = deref(p.node.get(PDFName.of("Contents")));
    const streams = contents instanceof PDFArray ? contents.asArray().map(deref) : [contents];
    for (const s of streams) { const t = streamText(s); rgbOps += (t.match(/\b(rg|RG)\b/g) ?? []).length; cmykOps += (t.match(/\b(k|K)\b/g) ?? []).length; if (/\/DeviceRGB/.test(t)) rgbSpaces.push(`page ${i + 1} content names /DeviceRGB`); }
    walkResources(p.node.get(PDFName.of("Resources")), `page ${i + 1}`);
  });
  checks.push({ name: "no RGB colour operators", ok: rgbOps === 0, detail: `${rgbOps} rg/RG, ${cmykOps} k/K` });
  checks.push({ name: "no RGB colour spaces or images", ok: rgbSpaces.length === 0, detail: rgbSpaces.length ? rgbSpaces.join("; ") : "none" });
  checks.push({ name: "no transparency", ok: transparency.length === 0, detail: transparency.length ? transparency.join("; ") : "none" });

  // 3. fonts (pdffonts)
  const pf = execFileSync("pdffonts", [file], { encoding: "utf8" }).trim().split("\n").slice(2);
  const fontRows = pf.map((l) => l.trim().split(/\s+/)).filter((c) => c.length > 5);
  const bad = fontRows.filter((c) => c[c.length - 5] !== "yes" || /Type\s?3/.test(c.join(" ")));   // columns end with: emb sub uni objId gen
  checks.push({ name: "fonts embedded, no Type3", ok: fontRows.length > 0 && bad.length === 0, detail: fontRows.map((c) => `${c[0]} (${c.slice(1, c.length - 5).join(" ")}, emb ${c[c.length - 5]})`).join("; ") || "no fonts found" });

  // 4. Ghostscript re-distill
  let gsOk = true, gsDetail = "clean";
  try { execFileSync("gs", ["-q", "-dNOPAUSE", "-dBATCH", "-dSAFER", "-sDEVICE=nullpage", file], { stdio: "pipe" }); } catch (e: any) { gsOk = false; gsDetail = String(e.stderr ?? e.message).slice(0, 300); }
  checks.push({ name: "Ghostscript re-distills", ok: gsOk, detail: gsDetail });
  return checks;
}

const files = listFiles(PRINT, /\.pdf$/);
if (!files.length) { console.error("preflight-print: no PDFs in print/ (run build:print first)"); process.exit(1); }
const summary: string[] = [`# Print preflight`, ``, `Generated ${TODAY} by \`scripts/preflight-print.ts\`. Expected boxes: MediaBox 0 0 270 162, BleedBox = MediaBox, TrimBox 9 9 261 153. Minimum type size is asserted by the generator (≥ 7 pt), not measured here.`, ``, `| File | Result | Failed checks |`, `|---|---|---|`];
let failed = 0;
for (const f of files) {
  const checks = await preflight(f);
  const fails = checks.filter((c) => !c.ok);
  failed += fails.length;
  const name = f.split("/").pop()!.replace(/\.pdf$/, "");
  const md = [`# Preflight: ${rel(f)}`, ``, `| Check | Result | Detail |`, `|---|---|---|`, ...checks.map((c) => `| ${c.name} | ${c.ok ? "pass" : "**FAIL**"} | ${c.detail.replace(/\|/g, "\\|")} |`), ``];
  writeFileSync(join(OUT, `${name}.md`), md.join("\n"));
  summary.push(`| ${rel(f)} | ${fails.length ? "**FAIL**" : "pass"} | ${fails.map((c) => c.name).join(", ") || "—"} |`);
  console.log(`${fails.length ? "FAIL" : "pass"}  ${rel(f)}${fails.length ? ": " + fails.map((c) => `${c.name} (${c.detail})`).join("; ") : ""}`);
}
summary.push(``, failed ? `**${failed} failing check(s).**` : `All checks pass.`, ``);
writeFileSync(join(OUT, "REPORT.md"), summary.join("\n"));
process.exit(failed ? 1 : 0);
