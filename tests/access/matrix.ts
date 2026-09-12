/**
 * The role × collection × operation contract. `true` = allowed outright,
 * `false` = denied, `"own"` = allowed only for rows the user owns,
 * `"reviewed"` = read limited to reviewStatus = reviewed.
 * tests/access/access.test.ts asserts real behaviour against every cell.
 */
export const ROLES = ["public", "partner", "agent", "editor", "admin"] as const;
export type MatrixRole = (typeof ROLES)[number];
export type Op = "create" | "read" | "update" | "delete";
export type Cell = boolean | "own" | "reviewed";
export type Row = Record<MatrixRole, Record<Op, Cell>>;

const content = (): Row => ({
  public: { create: false, read: "reviewed", update: false, delete: false },
  partner: { create: false, read: "reviewed", update: false, delete: false },
  agent: { create: false, read: true, update: false, delete: false },
  editor: { create: true, read: true, update: true, delete: true },
  admin: { create: true, read: true, update: true, delete: true },
});
const data = (): Row => ({
  public: { create: false, read: true, update: false, delete: false },
  partner: { create: false, read: true, update: false, delete: false },
  agent: { create: false, read: true, update: false, delete: false },
  editor: { create: true, read: true, update: true, delete: true },
  admin: { create: true, read: true, update: true, delete: true },
});
const clientData = (): Row => ({
  public: { create: false, read: true, update: false, delete: false },
  partner: { create: false, read: true, update: false, delete: false },
  agent: { create: false, read: true, update: false, delete: false },
  editor: { create: false, read: true, update: false, delete: false },
  admin: { create: true, read: true, update: true, delete: true },
});

export const MATRIX: Record<string, Row> = {
  products: content(),
  articles: content(),
  "glossary-terms": content(),
  pages: content(),
  states: data(),
  cities: data(),
  "location-overrides": data(),
  redirects: data(),
  forms: data(),
  carriers: clientData(),
  agents: { ...clientData(), agent: { create: false, read: true, update: "own", delete: false } },
  leads: {
    public: { create: false, read: false, update: false, delete: false },
    partner: { create: false, read: false, update: false, delete: false },
    agent: { create: false, read: "own", update: "own", delete: false },
    editor: { create: false, read: false, update: false, delete: false },
    admin: { create: true, read: true, update: true, delete: true },
  },
  media: {
    public: { create: false, read: true, update: false, delete: false },
    partner: { create: false, read: true, update: false, delete: false },
    agent: { create: false, read: true, update: false, delete: false },
    editor: { create: true, read: true, update: true, delete: true },
    admin: { create: true, read: true, update: true, delete: true },
  },
  users: {
    public: { create: false, read: false, update: false, delete: false },
    partner: { create: false, read: "own", update: "own", delete: false },
    agent: { create: false, read: "own", update: "own", delete: false },
    editor: { create: false, read: "own", update: "own", delete: false },
    admin: { create: true, read: true, update: true, delete: true },
  },
};

export const GLOBALS: Record<string, Record<MatrixRole, { read: boolean; update: boolean }>> = {
  "site-settings": {
    public: { read: true, update: false },
    partner: { read: true, update: false },
    agent: { read: true, update: false },
    editor: { read: true, update: true },
    admin: { read: true, update: true },
  },
  "compliance-settings": {
    public: { read: true, update: false },
    partner: { read: true, update: false },
    agent: { read: true, update: false },
    editor: { read: true, update: false },
    admin: { read: true, update: true },
  },
};
