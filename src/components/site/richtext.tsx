import Link from "next/link";
import type { ReactNode } from "react";

type Node = { type: string; text?: string; format?: number | string; tag?: string; listType?: string; children?: Node[]; fields?: { url?: string; newTab?: boolean; linkType?: string }; url?: string; value?: unknown };
const BOLD = 1, ITALIC = 2, UNDERLINE = 8, CODE = 16;

function inline(n: Node, key: number): ReactNode {
  if (n.type === "text") {
    let el: ReactNode = n.text ?? "";
    const f = typeof n.format === "number" ? n.format : 0;
    if (f & CODE) el = <code key={key}>{el}</code>;
    if (f & BOLD) el = <strong key={key}>{el}</strong>;
    if (f & ITALIC) el = <em key={key}>{el}</em>;
    if (f & UNDERLINE) el = <u key={key}>{el}</u>;
    return el;
  }
  if (n.type === "linebreak") return <br key={key} />;
  if (n.type === "link" || n.type === "autolink") {
    const href = n.fields?.url ?? n.url ?? "#";
    const internal = href.startsWith("/");
    const kids = (n.children ?? []).map(inline);
    return internal ? <Link key={key} href={href}>{kids}</Link> : <a key={key} href={href} rel="noopener">{kids}</a>;
  }
  return <span key={key}>{(n.children ?? []).map(inline)}</span>;
}

function block(n: Node, key: number): ReactNode {
  const kids = (n.children ?? []).map(inline);
  switch (n.type) {
    case "paragraph": return <p key={key}>{kids}</p>;
    case "heading": {
      const Tag = (n.tag && /^h[2-4]$/.test(n.tag) ? n.tag : "h2") as "h2" | "h3" | "h4";
      return <Tag key={key}>{kids}</Tag>;
    }
    case "list": {
      const L = n.tag === "ol" || n.listType === "number" ? "ol" : "ul";
      return <L key={key}>{(n.children ?? []).map((li, i) => <li key={i}>{(li.children ?? []).map((c) => (c.type === "list" ? block(c, i) : inline(c, i)))}</li>)}</L>;
    }
    case "quote": return <blockquote key={key}>{kids}</blockquote>;
    case "horizontalrule": return <hr key={key} />;
    default: return kids.length ? <p key={key}>{kids}</p> : null;
  }
}

/** Lexical editor state → semantic HTML. Unknown nodes degrade to their text. */
export function RichText({ value, className = "prose" }: { value: unknown; className?: string }) {
  const root = (value as { root?: Node } | null | undefined)?.root;
  if (!root?.children?.length) return null;
  return <div className={className}>{root.children.map(block)}</div>;
}
