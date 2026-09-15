import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { tokens } from "@desert-peak/brand/tokens";
import { PRODUCTION_SITE_URL } from "../env.schema.ts";

/**
 * Open Graph images, 1200 × 630, built from Daniel's badge: the stacked logo
 * split across the card. Left column: the outlined wordmark
 * (public/brand/wordmark.svg) top-left, an uppercase kicker in brand, the
 * title in the Archivo display cut, a short brand rule and the domain at the
 * bottom. Right: the badge (public/brand/mark.svg) at 280 px, vertically
 * centred. Medicare pages get the TPMO band on surface-sunken below.
 * Colours come from the typed token export, fonts from the brand's static
 * instances (src/og/fonts). The site default is /og/image.png.
 */
export type OgFamily = "site" | "product" | "product-city" | "article" | "glossary" | "state" | "page";
export type OgInput = { family: OgFamily; title: string; kicker?: string; tpmo?: string | null };

const W = 1200, H = 630, PAD = 72;
const sem = (role: keyof typeof tokens.semantic) => tokens.semantic[role].hex; // tokens-ok: read from the brand's typed token export
const DOMAIN = new URL(PRODUCTION_SITE_URL).host;
const KICKER: Record<OgFamily, string> = { site: "Independent insurance agency", product: "Coverage", "product-city": "Local coverage", article: "Insurance 101", glossary: "Glossary", state: "State requirements", page: "Desert Peak Insurance" };

let fontCache: Promise<{ display: ArrayBuffer; semibold: ArrayBuffer; medium: ArrayBuffer; regular: ArrayBuffer; mark: string; wordmark: string }> | null = null;
const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
const load = () =>
  (fontCache ??= (async () => {
    const dir = join(process.cwd(), "src", "og", "fonts");
    const buf = async (f: string) => { const b = await readFile(join(dir, f)); return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer; };
    const brand = (f: string) => readFile(join(process.cwd(), "public", "brand", f), "utf8");
    const [display, semibold, medium, regular, markSvg, wordmarkSvg] = await Promise.all([buf("ArchivoDisplay-SemiBold.ttf"), buf("Archivo-SemiBold.ttf"), buf("Archivo-Medium.ttf"), buf("Archivo-Regular.ttf"), brand("mark.svg"), brand("wordmark.svg")]);
    return { display, semibold, medium, regular, mark: svgUri(markSvg), wordmark: svgUri(wordmarkSvg) };
  })());

/** Largest size whose wrapped block clears the rule in the 760 px text column; steps from 84 down to 44. */
const titleSize = (title: string, lines: number) => (title.length <= 28 ? 84 : title.length <= 46 ? 72 : title.length <= 70 ? 60 : lines > 4 ? 44 : 52);
const BADGE = 280, TEXT_W = W - PAD * 2 - BADGE - 56;

export async function ogImage(input: OgInput): Promise<ImageResponse> {
  const f = await load();
  const kicker = (input.kicker ?? KICKER[input.family]).toUpperCase();
  const size = titleSize(input.title, Math.ceil(input.title.length / 24));
  const tpmo = input.tpmo && !/\{\{TODO/.test(input.tpmo) ? input.tpmo : null;
  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", flexDirection: "column", background: sem("surface"), color: sem("ink"), fontFamily: "Archivo" }}>
        <div style={{ display: "flex", flex: 1, padding: `${PAD}px ${PAD}px 0` }}>
          <div style={{ display: "flex", flexDirection: "column", width: TEXT_W }}>
            <img src={f.wordmark} width={250} height={46} alt="" />
            <div style={{ display: "flex", marginTop: 44, fontSize: 22, fontWeight: 600, letterSpacing: "0.08em", color: sem("brand") }}>{kicker}</div>
            <div style={{ display: "flex", marginTop: 24, fontFamily: "Archivo Display", fontSize: size, fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: TEXT_W }}>{input.title}</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", paddingBottom: tpmo ? 28 : PAD }}>
              <div style={{ width: 48, height: 4, background: sem("brand") }} />
              <div style={{ display: "flex", marginTop: 22, fontSize: 26, fontWeight: 500, color: sem("ink-muted") }}>{DOMAIN}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", paddingBottom: tpmo ? 28 : PAD }}>
            <img src={f.mark} width={BADGE} height={BADGE} alt="" />
          </div>
        </div>
        {tpmo ? (
          <div style={{ display: "flex", padding: `24px ${PAD}px 26px`, background: sem("surface-sunken"), borderTop: `2px solid ${sem("border-strong")}`, fontSize: 20, lineHeight: 1.4, fontWeight: 400, color: sem("ink") }}>{tpmo}</div>
        ) : null}
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Archivo Display", data: f.display, weight: 600, style: "normal" },
        { name: "Archivo", data: f.semibold, weight: 600, style: "normal" },
        { name: "Archivo", data: f.medium, weight: 500, style: "normal" },
        { name: "Archivo", data: f.regular, weight: 400, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400" },
    },
  );
}
