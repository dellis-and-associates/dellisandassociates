/**
 * Minimal builders for the Lexical editor state Payload stores in richText
 * fields (`@payloadcms/richtext-lexical`, default features). Only node types
 * the default editor registers are produced: root, paragraph, heading, list,
 * listitem, link and text. Pure; no Payload import.
 */

export type TextNode = { type: "text"; text: string; format: number; detail: number; mode: "normal"; style: string; version: 1 };
export type LinkNode = {
  type: "link";
  version: 3;
  fields: { linkType: "custom"; url: string; newTab: boolean };
  children: TextNode[];
  direction: "ltr";
  format: "";
  indent: 0;
};
export type Inline = TextNode | LinkNode;
export type ParagraphNode = { type: "paragraph"; format: ""; indent: 0; version: 1; direction: "ltr"; textFormat: 0; textStyle: ""; children: Inline[] };
export type HeadingNode = { type: "heading"; tag: "h2" | "h3" | "h4"; format: ""; indent: 0; version: 1; direction: "ltr"; children: Inline[] };
export type ListItemNode = { type: "listitem"; value: number; format: ""; indent: 0; version: 1; direction: "ltr"; children: Inline[] };
export type ListNode = { type: "list"; listType: "bullet" | "number"; tag: "ul" | "ol"; start: 1; format: ""; indent: 0; version: 1; direction: "ltr"; children: ListItemNode[] };
export type BlockNode = ParagraphNode | HeadingNode | ListNode;
export type LexicalDoc = { root: { type: "root"; format: ""; indent: 0; version: 1; direction: "ltr"; children: BlockNode[] } };

/** A run of inline content: a string, a link node, or a mix of both. */
export type InlineInput = string | Inline | (string | Inline)[];

export const text = (t: string): TextNode => ({ type: "text", text: t, format: 0, detail: 0, mode: "normal", style: "", version: 1 });

export const link = (label: string, url: string): LinkNode => ({
  type: "link",
  version: 3,
  fields: { linkType: "custom", url, newTab: false },
  children: [text(label)],
  direction: "ltr",
  format: "",
  indent: 0,
});

const inlines = (input: InlineInput): Inline[] => {
  const items = Array.isArray(input) ? input : [input];
  return items.map((i) => (typeof i === "string" ? text(i) : i));
};

export const paragraph = (content: InlineInput): ParagraphNode => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  textFormat: 0,
  textStyle: "",
  children: inlines(content),
});

export const heading = (tag: HeadingNode["tag"], content: InlineInput): HeadingNode => ({
  type: "heading",
  tag,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: inlines(content),
});

export const list = (items: InlineInput[], ordered = false): ListNode => ({
  type: "list",
  listType: ordered ? "number" : "bullet",
  tag: ordered ? "ol" : "ul",
  start: 1,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: items.map((item, i) => ({ type: "listitem", value: i + 1, format: "", indent: 0, version: 1, direction: "ltr", children: inlines(item) })),
});

export const doc = (nodes: BlockNode[]): LexicalDoc => ({
  root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children: nodes },
});
