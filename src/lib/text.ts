/** Plain text out of a Lexical rich-text value (or a string), and a word count for it. */
export function richTextToPlain(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  const out: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const n = node as { text?: unknown; children?: unknown[]; root?: unknown; type?: string };
    if (typeof n.text === "string") out.push(n.text);
    if (n.root) walk(n.root);
    if (Array.isArray(n.children)) {
      for (const c of n.children) walk(c);
      if (n.type && n.type !== "text" && n.type !== "link" && n.type !== "autolink") out.push("\n");
    }
  };
  walk(value);
  return out.join(" ").replace(/\s+/g, " ").trim();
}

export function countWords(value: unknown): number {
  const t = richTextToPlain(value);
  return t ? t.split(/\s+/).filter(Boolean).length : 0;
}
