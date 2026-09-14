/**
 * pnpm certificates — re-encodes the two Circle of Champions images from the
 * legacy crawl (public/certificates/*.jpg, kept as the source of record) to
 * AVIF and WebP at the widths the homepage renders (800 and 1600 CSS px for
 * 1× and 2×), and writes public/certificates/manifest.json with the exact
 * pixel dimensions so every <img> carries width and height.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public", "certificates");
const out: Record<string, { width: number; height: number; sources: { type: string; srcset: string }[]; fallback: string }> = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith(".jpg"))) {
  const base = file.replace(/\.jpg$/, "");
  const meta = await sharp(join(dir, file)).metadata();
  const w = meta.width!, h = meta.height!;
  const widths = [Math.min(800, w), Math.min(1600, w)].filter((v, i, a) => a.indexOf(v) === i);
  const sources: { type: string; srcset: string }[] = [];
  for (const [fmt, type] of [["avif", "image/avif"], ["webp", "image/webp"]] as const) {
    const parts: string[] = [];
    for (const width of widths) {
      const name = `${base}-${width}.${fmt}`;
      const img = sharp(join(dir, file)).resize({ width });
      await (fmt === "avif" ? img.avif({ quality: 55 }) : img.webp({ quality: 80 })).toFile(join(dir, name));
      parts.push(`/certificates/${name} ${width}w`);
    }
    sources.push({ type, srcset: parts.join(", ") });
  }
  out[base] = { width: w, height: h, sources, fallback: `/certificates/${file}` };
  console.log(base, `${w}×${h}`, widths.join("/"));
}
writeFileSync(join(dir, "manifest.json"), JSON.stringify(out, null, 2) + "\n");
