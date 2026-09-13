export type Hit = { line: number; snippet: string; rule: string };

const NON_TOKEN_COLOR = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|accent|caret|divide|shadow)-(?:red|blue|green|gray|grey|slate|zinc|neutral|stone|white|black|amber|yellow|orange|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|lime)(?:-\d+)?\b/;
const ARBITRARY = /(?:^|[\s"'`{(:])((?:[a-z-]+:)*)([a-z]+(?:-[a-z0-9]+)*)-\[(?!&|\.|:|>|\*|~|\+)[^\]]+\]/g;
/** Attribute and feature variants (`data-[x]:`, `aria-[y]:`, `supports-[z]:`) are selectors, not values. */
const VARIANT_NAMES = /(?:^|-)(?:data|aria|supports|has|nth|nth-last)$/;
function arbitraryValue(line: string): boolean {
  for (const m of line.matchAll(ARBITRARY)) if (!VARIANT_NAMES.test(m[2]!)) return true;
  return false;
}
const HEX = /(?<![\w&#-])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b(?![\w-])/;
const FUNCTIONAL = /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(/;
const DECL = /(?:^|[{;])\s*(?!--)([a-z-]+)\s*:\s*([^;{}]+)/g;
const LENGTH = /\b\d*\.?\d+(?:px|rem|em|pt)\b/g;
/** Lengths that are structural, not design values: hairlines, the strata ornament's 3/5 px bands, the 2 px focus ring. */
const OK_LENGTHS = new Set(["0px", "1px", "2px", "3px", "4px", "5px", "10px"]);
const OK_PROPS = new Set(["border", "border-top", "border-left", "border-right", "border-bottom", "outline", "outline-offset", "box-shadow", "text-underline-offset", "text-decoration-thickness", "background", "height", "width"]);
function badLength(prop: string, value: string): boolean {
  if (/var\(|calc\(var\(/.test(value)) return false;
  const lengths = value.match(LENGTH) ?? [];
  if (!lengths.length) return false;
  if (OK_PROPS.has(prop) && lengths.every((l) => OK_LENGTHS.has(l))) return false;
  return true;
}

/** Pure scanner; unit-tested. */
export function scanSource(path: string, src: string): { hits: Hit[]; optOuts: number } {
  const hits: Hit[] = [];
  let optOuts = 0;
  const lines = src.split("\n");
  const isStyle = /\.s?css$/.test(path);
  let inFontFace = false, inMedia = 0, inComment = false;
  lines.forEach((raw, i) => {
    const prev = lines[i - 1] ?? "";
    if (/tokens-ok:/.test(raw) || /tokens-ok:/.test(prev)) { if (/tokens-ok:/.test(raw)) optOuts++; return; }
    const line = raw.replace(/\/\/.*$/, "");
    if (isStyle) {
      if (line.includes("/*")) inComment = true;
      if (inComment) { if (line.includes("*/")) inComment = false; return; }
      if (/@font-face/.test(line)) inFontFace = true;
      if (/@media|@container|@supports/.test(line)) inMedia++;
      if (inFontFace && line.includes("}")) { inFontFace = false; return; }
      if (inMedia && /^\s*}\s*$/.test(line) && !/{/.test(line)) { /* closing */ }
      if (inFontFace) return;
      if (/@media[^{]*\d+px/.test(line)) return;
      if (/content\s*:/.test(line)) return;
      if (HEX.test(line)) hits.push({ line: i + 1, snippet: line.trim(), rule: "hex colour literal" });
      if (FUNCTIONAL.test(line) && !/var\(/.test(line)) hits.push({ line: i + 1, snippet: line.trim(), rule: "functional colour literal" });
      for (const m of line.matchAll(DECL)) if (badLength(m[1]!, m[2]!)) { hits.push({ line: i + 1, snippet: line.trim(), rule: "raw length in stylesheet" }); break; }
      return;
    }
    // TS/TSX
    if (/^\s*import\b|from\s+["']/.test(line) && !/className/.test(line)) return;
    if (HEX.test(line) && !/#[a-z][\w-]*['"`)\s]/.test(line.replace(/href=["'`]#[^"'`]*["'`]/g, ""))) {
      if (!/href=|id=|aria-|['"`]#(?:main|type|nav|colour|top)['"`]|\$\{|\.svg/.test(line)) hits.push({ line: i + 1, snippet: line.trim().slice(0, 120), rule: "hex colour literal" });
    }
    if (FUNCTIONAL.test(line)) hits.push({ line: i + 1, snippet: line.trim().slice(0, 120), rule: "functional colour literal" });
    if (arbitraryValue(line.replace(/grid-(?:cols|rows)-\[[^\]]*\]/g, "")) ) hits.push({ line: i + 1, snippet: line.trim().slice(0, 120), rule: "Tailwind arbitrary value" });
    if (/style=\{\{[^}]*\b\d+(?:px|rem|em)\b/.test(line)) hits.push({ line: i + 1, snippet: line.trim().slice(0, 120), rule: "inline style with a raw length" });
    const nt = line.match(NON_TOKEN_COLOR);
    if (nt) hits.push({ line: i + 1, snippet: nt[0], rule: "non-token colour utility" });
  });
  return { hits, optOuts };
}
