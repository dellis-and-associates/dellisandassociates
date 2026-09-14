/**
 * Stage 5.3 — presentation decks. Two 16:9 PowerPoint files from one token-driven system:
 *   decks/client-pitch.pptx and decks/partner-meeting.pptx (inputs in decks/inputs/*.json).
 * Ten slide masters with real placeholder content, a ≈40-word speaker note each, the comparison
 * table set in tabular figures, the state-requirements slide fed from content/state-facts.json,
 * and a disclosure slide that carries the TPMO text whenever the deck mentions Medicare
 * (the build refuses the file otherwise). Theme colours and fonts are rewritten to token values
 * after pptxgenjs writes the file; every image is a hashed copy of web/logos/*.png.
 * Renders every slide to PNG with LibreOffice using the fonts in decks/fonts/.
 *
 * Usage: node scripts/build-decks.ts [--no-render]
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { ALLOWED_HEX, CACHE, FONTS, ROOT, TODAY, TPMO_TEXT, bannedGuard, config, fullName, isTodo, licenseLine, mentionsMedicare, people, sem, write, writeInventory, type InventoryRow, type Person } from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const PptxGenJS = require("pptxgenjs");
const JSZip = require("jszip");

const DECKS = join(ROOT, "decks");
const WEB_LOGOS = join(ROOT, "web", "logos");
const noRender = process.argv.includes("--no-render");
const rows: InventoryRow[] = [];
const hex = (role: string) => sem(role).replace("#", "");   // pptxgenjs wants hex without '#'

// ---------------------------------------------------------------------------
// Fonts shipped with the decks (tabular-default Archivo, see decks/fonts/README.md)
// ---------------------------------------------------------------------------
const DECK_FONTS = join(DECKS, "fonts");
const FONT_SET = ["Archivo-Regular.ttf", "Archivo-Bold.ttf", "SourceSerif4-Regular.ttf", "SourceSerif4-Bold.ttf", "SourceSerif4-Italic.ttf"];
if (!FONT_SET.every((f) => existsSync(join(DECK_FONTS, f)))) {
  const venv = "/tmp/claude-1000/-home-abuhaithem-Documents-dellisandassociates-desert-peak-brand/ba44102e-9078-4df6-8331-adb85cc58f07/scratchpad/venv/bin/python";
  const py = existsSync(venv) ? venv : "python3";
  const src = "/tmp/claude-1000/-home-abuhaithem-Documents-dellisandassociates-desert-peak-brand/ba44102e-9078-4df6-8331-adb85cc58f07/scratchpad/fonts";
  console.log("build-decks: deck fonts missing; regenerating with scripts/collateral/deck-fonts.py");
  execFileSync(py, [join(ROOT, "scripts", "collateral", "deck-fonts.py"), join(src, "Archivo[wdth,wght].ttf"), join(src, "SourceSerif4[opsz,wght].ttf"), join(src, "SourceSerif4-Italic[opsz,wght].ttf"), join(FONTS, "static", "tabular"), DECK_FONTS], { stdio: "inherit" });
}
const SANS = "Archivo", SERIF = "Source Serif 4";

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------
type DeckInput = { file: string; deckTitle: string; subtitle: string; clientName: string; date: string; presenter: string; agenda: string[]; sectionLine: string; includeMedicareNote: boolean };
const inputs: DeckInput[] = readdirSync(join(DECKS, "inputs")).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(readFileSync(join(DECKS, "inputs", f), "utf8")));
const facts: { facts: { state: string; headline: string; fact: string; sourceLine: string; figures: Record<string, number> }[] } = JSON.parse(readFileSync(join(ROOT, "content", "state-facts.json"), "utf8"));
const disclosureLine = config.independentAgencyLineWeb.replace("by this website", "by this presentation");

// ---------------------------------------------------------------------------
// Layout constants (inches; 13.333 × 7.5)
// ---------------------------------------------------------------------------
const W = 13.333, H = 7.5, M = 0.6;
const CW = W - 2 * M;
const TITLE_Y = 0.55;
const notes = {
  TITLE: "Use once, first. The client name and date come from the deck input file, the presenter from people.json. If the client name still reads as a TODO token, the deck is not ready to present; fix the input and rebuild rather than typing over the slide.",
  AGENDA: "Keep to five lines. The agenda is the promise of the meeting; if a line is not going to be covered, remove it in the input file. Numbers are set in tabular figures so the list aligns even if you add a sixth item.",
  SECTION: "A breath between parts. One line, nothing else. Use it before the comparison and before the recommendation; do not use it more than three times in a deck or it stops reading as a pause.",
  COMPARISON: "The slide the deck exists for. Figures are illustrative until real quotes are entered; replace the whole table from the quote sheet, never a single cell. Keep carriers anonymous as A, B, C until appointments are confirmed in writing. Current policy stays the highlighted column.",
  STATE: "Statutory minimums with their source lines. Every figure here is read from content/state-facts.json, which records the statute, the URL and the date verified; do not type a number on this slide. Utah's limits changed on 1 January 2025.",
  FINDING: "One recommendation, the math shown. The third option, keeping what you have, is always visible; say it out loud when it is the right answer. If the math needs more than three lines the recommendation is not clear enough yet.",
  COVERAGE: "Two columns, what is covered and what is not. Read the second column with as much care as the first; it is where claims are lost. Do not soften exclusions with adjectives; the words on this slide are the policy's words.",
  NEXT: "Three steps at most, each with an owner and a date. If a step has no date it is not a step. This is the last content slide; the disclosure follows and is never deleted.",
  DISCLOSURE: "Required last-but-one slide. The independent-agency line, the licensed states and numbers, and the TPMO disclaimer when Medicare appears anywhere in the deck are generated, not typed. If this slide is missing the build has failed; do not present the file.",
  CONTACT: "Contact details from people.json. Phone and licence numbers appear as TODO tokens until the client supplies them; a token on screen means the deck was built before the data arrived, which is a signal to the room, not an embarrassment to hide.",
};

// ---------------------------------------------------------------------------
// Build one deck
// ---------------------------------------------------------------------------
async function buildDeck(input: DeckInput): Promise<{ file: string; slides: number; medicare: boolean; text: string[] }> {
  const presenter: Person = people.find((p) => p.slug === input.presenter) ?? people[0];
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = config.company; pptx.company = config.company; pptx.subject = input.deckTitle; pptx.title = `${config.company} — ${input.deckTitle}`; pptx.revision = "1";
  pptx.theme = { headFontFace: SANS, bodyFontFace: SERIF, lang: "en-US" };

  const slideNumber = { x: W - M - 0.6, y: H - 0.45, w: 0.6, h: 0.3, fontFace: SANS, fontSize: 10, color: hex("ink-muted"), align: "right" as const };
  const markSmall = { image: { path: join(WEB_LOGOS, "mark@2x.png"), x: M, y: H - 0.55, w: 0.43, h: 0.4 } };
  const titleRule = (y: number) => ({ rect: { x: M, y, w: 1.0, h: 0.04, fill: { color: hex("brand") } } });
  const content = (title: string) => ({ title, background: { color: hex("surface") }, objects: [
    { text: { text: "", options: { x: M, y: TITLE_Y, w: CW, h: 0.7 } } },
    markSmall,
  ], slideNumber });
  // masters (named layouts): each carries the background, the small mark and the slide number
  pptx.defineSlideMaster({ title: "TITLE", background: { color: hex("surface") }, objects: [] });
  for (const name of ["AGENDA", "COMPARISON", "STATE", "FINDING", "COVERAGE", "NEXT", "DISCLOSURE", "CONTACT"]) pptx.defineSlideMaster(content(name));
  pptx.defineSlideMaster({ title: "SECTION", background: { color: hex("surface-inverse") }, objects: [] });

  const textAll: string[] = [];
  const T = (s: string) => { textAll.push(s); return s; };
  const h1 = (slide: any, text: string) => {
    slide.addText(T(text), { x: M, y: TITLE_Y, w: CW, h: 0.7, fontFace: SANS, fontSize: 30, bold: true, color: hex("ink"), margin: 0, valign: "top" });
    slide.addShape(pptx.ShapeType.rect, { x: M, y: TITLE_Y + 0.78, w: 1.0, h: 0.04, fill: { color: hex("brand") }, line: { color: hex("brand"), width: 0 } });
  };
  const body = (slide: any, text: string, o: Record<string, unknown>) => slide.addText(T(text), { fontFace: SERIF, fontSize: 17, color: hex("ink"), margin: 0, valign: "top", ...o });
  const small = (slide: any, text: string, o: Record<string, unknown>) => slide.addText(T(text), { fontFace: SANS, fontSize: 11, color: hex("ink-muted"), margin: 0, valign: "top", ...o });
  const medicare = input.includeMedicareNote;
  let n = 0;

  // 1 Title
  { const s = pptx.addSlide({ masterName: "TITLE" }); n++;
    s.addImage({ path: join(WEB_LOGOS, "logo-horizontal@2x.png"), x: M, y: 0.7, w: 3.4, h: 0.6 });
    s.addText(T(input.deckTitle), { x: M, y: 2.6, w: CW, h: 1.2, fontFace: SANS, fontSize: 44, bold: true, color: hex("ink"), margin: 0 });
    s.addText(T(input.subtitle), { x: M, y: 3.8, w: CW * 0.7, h: 0.9, fontFace: SERIF, fontSize: 20, color: hex("ink-muted"), margin: 0 });
    s.addShape(pptx.ShapeType.rect, { x: M, y: 5.2, w: 1.0, h: 0.04, fill: { color: hex("brand") }, line: { color: hex("brand"), width: 0 } });
    small(s, `Prepared for ${input.clientName}`, { x: M, y: 5.45, w: CW, h: 0.3, fontSize: 13, color: hex("ink") });
    small(s, `${input.date}  ·  ${fullName(presenter)}, ${presenter.title}`, { x: M, y: 5.8, w: CW, h: 0.3, fontSize: 13 });
    s.addNotes(notes.TITLE);
  }
  // 2 Agenda
  { const s = pptx.addSlide({ masterName: "AGENDA" }); n++; h1(s, "Agenda");
    const items = input.agenda.slice(0, 6);
    items.forEach((a, i) => {
      s.addText(T(String(i + 1).padStart(2, "0")), { x: M, y: 1.75 + i * 0.62, w: 0.6, h: 0.5, fontFace: SANS, fontSize: 16, color: hex("brand"), bold: true, margin: 0 });
      body(s, a, { x: M + 0.7, y: 1.75 + i * 0.62, w: CW - 0.7, h: 0.5, fontSize: 19 });
    });
    s.addNotes(notes.AGENDA);
  }
  // 3 Section divider
  { const s = pptx.addSlide({ masterName: "SECTION" }); n++;
    s.addImage({ path: join(WEB_LOGOS, "logo-reversed@2x.png"), x: M, y: 0.7, w: 2.83, h: 0.5 });
    s.addText(T(input.sectionLine), { x: M, y: 3.0, w: CW, h: 1.2, fontFace: SANS, fontSize: 40, bold: true, color: hex("ink-inverse"), margin: 0 });
    s.addNotes(notes.SECTION);
  }
  // 4 The comparison
  { const s = pptx.addSlide({ masterName: "COMPARISON" }); n++; h1(s, "The comparison");
    const head = ["Coverage", "Current policy", "Carrier A", "Carrier B", "Carrier C"];
    const data: [string, string, string, string, string][] = [
      ["Bodily injury, per person", "$100,000", "$250,000", "$250,000", "$250,000"],
      ["Bodily injury, per accident", "$300,000", "$500,000", "$500,000", "$500,000"],
      ["Property damage", "$50,000", "$100,000", "$100,000", "$100,000"],
      ["Uninsured motorist, per person", "$100,000", "$250,000", "$250,000", "$100,000"],
      ["Collision deductible", "$500", "$500", "$1,000", "$1,000"],
      ["Comprehensive deductible", "$500", "$500", "$500", "$1,000"],
      ["Umbrella", "—", "—", "$1,000,000", "$1,000,000"],
    ];
    const total = ["Annual premium", "$1,842", "$2,106", "$2,214", "$2,048"];
    const border = (b: boolean) => (b ? { type: "solid", pt: 0.5, color: hex("border") } : { type: "none" });
    const cell = (text: string, o: Record<string, unknown> = {}) => ({ text: T(text), options: { fontFace: SANS, fontSize: 13, color: hex("ink"), margin: [0.06, 0.12, 0.06, 0.12], valign: "middle", border: [border(false), border(false), border(true), border(false)], ...o } });
    const rowsT: any[] = [];
    rowsT.push(head.map((t, i) => cell(t, { fontSize: 10, bold: true, color: hex("ink-muted"), fill: { color: i === 1 ? hex("brand-subtle") : hex("surface-sunken") }, align: i ? "right" : "left", border: [border(false), border(false), border(true), border(false)] })));
    data.forEach((r, ri) => rowsT.push(r.map((t, i) => cell(t, { align: i ? "right" : "left", fill: { color: i === 1 ? hex("brand-subtle") : ri % 2 ? hex("surface-sunken") : hex("surface") } }))));
    rowsT.push(total.map((t, i) => cell(t, { bold: true, align: i ? "right" : "left", fill: { color: i === 1 ? hex("brand-subtle") : hex("surface") }, border: [{ type: "solid", pt: 2, color: hex("ink") }, border(false), border(false), border(false)] })));
    s.addTable(rowsT, { x: M, y: 1.65, w: CW, colW: [3.4, 2.2, 2.18, 2.18, 2.17], rowH: 0.42, fontFace: SANS, fontSize: 13, autoPage: false });
    small(s, "Illustrative figures for layout review. Not a quote. Carriers are anonymised until appointments are confirmed.", { x: M, y: 5.75, w: CW, h: 0.3 });
    s.addNotes(notes.COMPARISON);
  }
  // 5 State requirements
  { const s = pptx.addSlide({ masterName: "STATE" }); n++; h1(s, "What each state requires");
    const colW = (CW - 0.3) / 2;
    facts.facts.slice(0, 4).forEach((f, i) => {
      const x = M + (i % 2) * (colW + 0.3), y = 1.7 + Math.floor(i / 2) * 2.15;
      s.addText(T((config.stateNames as Record<string, string>)[f.state]), { x, y, w: colW, h: 0.35, fontFace: SANS, fontSize: 15, bold: true, color: hex("ink"), margin: 0 });
      const fig = f.figures;
      s.addText(T(`$${fig.bodilyInjuryPerPerson.toLocaleString("en-US")} / $${fig.bodilyInjuryPerAccident.toLocaleString("en-US")} / $${fig.propertyDamage.toLocaleString("en-US")}`), { x, y: y + 0.38, w: colW, h: 0.5, fontFace: SANS, fontSize: 24, bold: true, color: hex("brand"), margin: 0 });
      body(s, f.fact, { x, y: y + 0.95, w: colW, h: 0.8, fontSize: 13 });
      small(s, f.sourceLine, { x, y: y + 1.72, w: colW, h: 0.3, fontSize: 9 });
    });
    s.addNotes(notes.STATE);
  }
  // 6 The finding
  { const s = pptx.addSlide({ masterName: "FINDING" }); n++; h1(s, "The finding");
    body(s, "Raise the underlying auto liability limit before adding an umbrella. The umbrella quote is conditional on it.", { x: M, y: 1.7, w: CW * 0.6, h: 1.0, fontSize: 20 });
    const lines: [string, string][] = [["Current bodily-injury limit, per person", "$100,000"], ["Underlying limit the umbrella carrier requires", "$250,000"], ["Gap to close before the umbrella can be written", "$150,000"]];
    lines.forEach(([k, v], i) => {
      body(s, k, { x: M, y: 3.0 + i * 0.55, w: CW * 0.6 - 1.8, h: 0.45, fontSize: 15 });
      s.addText(T(v), { x: M + CW * 0.6 - 1.8, y: 3.0 + i * 0.55, w: 1.8, h: 0.45, fontFace: SANS, fontSize: 17, bold: true, color: hex("ink"), align: "right", margin: 0 });
      if (i === 2) s.addShape(pptx.ShapeType.rect, { x: M, y: 3.0 + i * 0.55 - 0.05, w: CW * 0.6, h: 0.02, fill: { color: hex("ink") }, line: { color: hex("ink"), width: 0 } });
    });
    s.addShape(pptx.ShapeType.rect, { x: M + CW * 0.66, y: 1.7, w: CW * 0.34, h: 3.2, fill: { color: hex("brand-subtle") }, line: { color: hex("brand-subtle"), width: 0 } });
    s.addText(T("Or: keep what you have"), { x: M + CW * 0.66 + 0.3, y: 1.95, w: CW * 0.34 - 0.6, h: 0.4, fontFace: SANS, fontSize: 15, bold: true, color: hex("brand-subtle-ink"), margin: 0 });
    body(s, "If the current limits already meet the umbrella carrier's requirement, or the umbrella is protecting assets you do not have, the right answer is to change nothing. We say so.", { x: M + CW * 0.66 + 0.3, y: 2.4, w: CW * 0.34 - 0.6, h: 2.3, fontSize: 14, color: hex("brand-subtle-ink") });
    small(s, "Illustrative figures for layout review. Not a quote.", { x: M, y: 5.75, w: CW, h: 0.3 });
    s.addNotes(notes.FINDING);
  }
  // 7 Coverage summary
  { const s = pptx.addSlide({ masterName: "COVERAGE" }); n++; h1(s, "Coverage summary");
    const colW = (CW - 0.5) / 2;
    const covered = ["Liability for injury and property damage you cause", "Collision, subject to the deductible", "Comprehensive: theft, hail, fire, animal strike", "Uninsured and underinsured motorist", "Rental reimbursement while a covered repair is made"];
    const not = ["Wear, mechanical failure and maintenance", "Flood damage to a home (separate policy)", "Business use of a personal vehicle unless endorsed", "Intentional damage", medicare ? "Medicare supplement and Advantage plans are reviewed under a separate appointment, not under this policy" : "Earth movement unless endorsed"];
    s.addText(T("What is covered"), { x: M, y: 1.7, w: colW, h: 0.4, fontFace: SANS, fontSize: 15, bold: true, color: hex("positive"), margin: 0 });
    s.addText(T("What is not"), { x: M + colW + 0.5, y: 1.7, w: colW, h: 0.4, fontFace: SANS, fontSize: 15, bold: true, color: hex("critical"), margin: 0 });
    covered.forEach((t, i) => body(s, t, { x: M, y: 2.2 + i * 0.6, w: colW, h: 0.55, fontSize: 15 }));
    not.forEach((t, i) => body(s, t, { x: M + colW + 0.5, y: 2.2 + i * 0.6, w: colW, h: 0.55, fontSize: 15 }));
    s.addNotes(notes.COVERAGE);
  }
  // 8 Next steps
  { const s = pptx.addSlide({ masterName: "NEXT" }); n++; h1(s, "Next steps");
    const steps = [["Send the current declarations pages", "{{TODO:client.name}}", "{{TODO:date}}"], ["Return the comparison with real quotes", fullName(presenter), "{{TODO:date}}"], ["Decide, or decide to change nothing", "Together", "{{TODO:date}}"]];
    steps.forEach(([t, who, when], i) => {
      s.addText(T(String(i + 1).padStart(2, "0")), { x: M, y: 1.8 + i * 1.0, w: 0.6, h: 0.5, fontFace: SANS, fontSize: 16, bold: true, color: hex("brand"), margin: 0 });
      body(s, t, { x: M + 0.7, y: 1.8 + i * 1.0, w: CW - 0.7, h: 0.5, fontSize: 19 });
      small(s, `${who}  ·  ${when}`, { x: M + 0.7, y: 2.25 + i * 1.0, w: CW - 0.7, h: 0.3, fontSize: 12 });
    });
    s.addNotes(notes.NEXT);
  }
  // 9 Disclosure
  { const s = pptx.addSlide({ masterName: "DISCLOSURE" }); n++; h1(s, "Disclosure");
    body(s, disclosureLine, { x: M, y: 1.7, w: CW, h: 0.6, fontSize: 15 });
    body(s, `${config.licensedLine}. ${licenseLine(presenter)}.`, { x: M, y: 2.4, w: CW, h: 0.8, fontSize: 13, color: hex("ink-muted") });
    if (medicare) body(s, TPMO_TEXT, { x: M, y: 3.4, w: CW, h: 1.2, fontSize: 13 });
    small(s, `Illustrative figures in this deck are for layout review and are not quotes. Generated ${TODAY} from people.json and collateral.config.json.`, { x: M, y: 5.6, w: CW, h: 0.4 });
    s.addNotes(notes.DISCLOSURE);
  }
  // 10 Contact
  { const s = pptx.addSlide({ masterName: "CONTACT" }); n++; h1(s, "Contact");
    s.addText(T(fullName(presenter)), { x: M, y: 1.8, w: CW, h: 0.5, fontFace: SANS, fontSize: 22, bold: true, color: hex("ink"), margin: 0 });
    body(s, `${presenter.title}, ${config.company}`, { x: M, y: 2.35, w: CW, h: 0.4, fontSize: 16, color: hex("ink-muted") });
    body(s, presenter.phone, { x: M, y: 3.0, w: CW, h: 0.4, fontSize: 16 });
    body(s, presenter.email, { x: M, y: 3.45, w: CW, h: 0.4, fontSize: 16 });
    body(s, config.domain, { x: M, y: 3.9, w: CW, h: 0.4, fontSize: 16 });
    s.addImage({ path: join(WEB_LOGOS, "logo-horizontal@2x.png"), x: W - M - 3.4, y: H - 1.3, w: 3.4, h: 0.6 });
    s.addNotes(notes.CONTACT);
  }

  // guards before writing
  for (const t of textAll) bannedGuard(`${input.file}`, t);
  const allText = textAll.join(" ");
  const mentions = mentionsMedicare(allText.replace(TPMO_TEXT, ""));
  if (mentions && !allText.includes(TPMO_TEXT)) throw new Error(`REFUSED: ${input.file} mentions Medicare but the disclosure slide does not carry the TPMO text`);
  if (!mentions && medicare) throw new Error(`${input.file}: includeMedicareNote is true but no slide mentions Medicare`);

  const out = join(DECKS, input.file);
  await pptx.writeFile({ fileName: out });
  await postProcess(out);
  return { file: out, slides: n, medicare: mentions, text: textAll };
}

// ---------------------------------------------------------------------------
// Post-process: token theme, no system colours, fixed dates, allowed typefaces only
// ---------------------------------------------------------------------------
const THEME = {
  dk1: hex("ink"), lt1: hex("surface"), dk2: hex("ink-muted"), lt2: hex("surface-sunken"),
  accent1: hex("brand"), accent2: hex("accent"), accent3: hex("positive"), accent4: hex("notice"), accent5: hex("critical"), accent6: hex("border-strong"),
  hlink: hex("brand"), folHlink: hex("brand-hover"),
};
const ALLOWED_FACES = new Set([SANS, SERIF, ...(config as any).fallbackFonts.deck]);
async function postProcess(file: string): Promise<void> {
  const zip = await JSZip.loadAsync(readFileSync(file));
  const problems: string[] = [];
  for (const name of Object.keys(zip.files)) {
    if (!/\.(xml|rels)$/.test(name)) continue;
    let xml: string = await zip.files[name].async("string");
    if (/theme\/theme\d+\.xml$/.test(name)) {
      const scheme = `<a:clrScheme name="Desert Peak">` + Object.entries(THEME).map(([k, v]) => `<a:${k}><a:srgbClr val="${v}"/></a:${k}>`).join("") + `</a:clrScheme>`;
      xml = xml.replace(/<a:clrScheme[\s\S]*?<\/a:clrScheme>/, scheme);
      xml = xml.replace(/<a:majorFont>[\s\S]*?<\/a:majorFont>/, `<a:majorFont><a:latin typeface="${SANS}"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>`);
      xml = xml.replace(/<a:minorFont>[\s\S]*?<\/a:minorFont>/, `<a:minorFont><a:latin typeface="${SERIF}"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>`);
      // effect styles carry Office's black shadow colour; the decks use no effects, so point it at ink
      xml = xml.replace(/srgbClr val="000000"/g, `srgbClr val="${hex("ink")}"`).replace(/srgbClr val="FFFFFF"/g, `srgbClr val="${hex("surface")}"`);
    }
    xml = xml.replace(/<a:sysClr val="windowText"[^>]*\/>/g, `<a:srgbClr val="${hex("ink")}"/>`).replace(/<a:sysClr val="window"[^>]*\/>/g, `<a:srgbClr val="${hex("surface")}"/>`);
    xml = xml.replace(/<a:sysClr val="windowText"[^>]*>[\s\S]*?<\/a:sysClr>/g, `<a:srgbClr val="${hex("ink")}"/>`).replace(/<a:sysClr val="window"[^>]*>[\s\S]*?<\/a:sysClr>/g, `<a:srgbClr val="${hex("surface")}"/>`);
    if (name === "docProps/core.xml") xml = xml.replace(/<dcterms:created[^>]*>[^<]*<\/dcterms:created>/, `<dcterms:created xsi:type="dcterms:W3CDTF">${TODAY}T00:00:00Z</dcterms:created>`).replace(/<dcterms:modified[^>]*>[^<]*<\/dcterms:modified>/, `<dcterms:modified xsi:type="dcterms:W3CDTF">${TODAY}T00:00:00Z</dcterms:modified>`);
    for (const m of xml.matchAll(/srgbClr val="([0-9A-Fa-f]{6})"/g)) if (!ALLOWED_HEX.has("#" + m[1].toUpperCase())) problems.push(`${name}: colour #${m[1]} is not a token`);
    for (const m of xml.matchAll(/sysClr val="([^"]+)"/g)) problems.push(`${name}: system colour ${m[1]} left in place`);
    for (const m of xml.matchAll(/typeface="([^"]*)"/g)) if (m[1] && !m[1].startsWith("+") && !ALLOWED_FACES.has(m[1])) problems.push(`${name}: typeface "${m[1]}" is not allowed`);
    zip.file(name, xml);
  }
  if (problems.length) throw new Error(`post-process: ${problems.length} problem(s)\n  ${problems.slice(0, 20).join("\n  ")}`);
  for (const name of Object.keys(zip.files)) zip.files[name].date = new Date(`${TODAY}T00:00:00Z`);   // reproducible zip entries
  const buf: Buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } });
  writeFileSync(file, buf);
}

// ---------------------------------------------------------------------------
// Validate (round-trip) and render
// ---------------------------------------------------------------------------
async function summarize(file: string): Promise<{ slides: number; media: string[] }> {
  const zip = await JSZip.loadAsync(readFileSync(file));
  const names = Object.keys(zip.files);
  return { slides: names.filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).length, media: names.filter((n) => /^ppt\/media\//.test(n)) };
}
function fontsConf(withBrandFonts: boolean): string {
  const p = join(CACHE, "decks", withBrandFonts ? "fonts.conf" : "fonts-fallback.conf");
  mkdirSync(join(CACHE, "decks", "fc"), { recursive: true });
  write(p, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>${withBrandFonts ? `<dir>${DECK_FONTS}</dir>` : ""}<include ignore_missing="yes">/etc/fonts/fonts.conf</include><cachedir>${join(CACHE, "decks", "fc")}</cachedir></fontconfig>`);
  return p;
}
function render(file: string, outDir: string, withBrandFonts: boolean): number {
  const base = file.split("/").pop()!.replace(/\.pptx$/, "");
  const pdfDir = join(CACHE, "decks", withBrandFonts ? "pdf" : "pdf-fallback");
  mkdirSync(pdfDir, { recursive: true });
  execFileSync("soffice", ["--headless", "--norestore", "--convert-to", "pdf", "--outdir", pdfDir, file], { env: { ...process.env, FONTCONFIG_FILE: fontsConf(withBrandFonts), HOME: join(CACHE, "decks", "home") }, stdio: "pipe", timeout: 180_000 });
  rmSync(outDir, { recursive: true, force: true }); mkdirSync(outDir, { recursive: true });
  execFileSync("pdftoppm", ["-png", "-r", "96", join(pdfDir, `${base}.pdf`), join(outDir, "slide")], { stdio: "pipe" });
  const files = readdirSync(outDir).filter((f) => f.endsWith(".png")).sort();
  files.forEach((f) => { const nn = f.match(/slide-(\d+)\.png/)?.[1]; if (nn) copyFileSync(join(outDir, f), join(outDir, `slide-${nn.padStart(2, "0")}.png`)); if (nn && nn.length !== 2) rmSync(join(outDir, f)); });
  return files.length;
}

const results: { file: string; slides: number; medicare: boolean; media: string[] }[] = [];
for (const input of inputs) {
  const r = await buildDeck(input);
  const s = await summarize(r.file);
  results.push({ file: r.file, slides: s.slides, medicare: r.medicare, media: s.media });
  rows.push({ asset: `decks/${input.file}`, dimensions: `16:9, 13.333×7.5 in, ${s.slides} slides`, source: "scripts/build-decks.ts", spec: "ECMA-376 PresentationML via pptxgenjs 4; theme rewritten to tokens", notes: `${r.medicare ? "mentions Medicare: TPMO on disclosure slide" : "no Medicare content"}; media: ${s.media.length} logo PNG(s) from web/logos` });
  console.log(`build-decks: ${input.file}: ${s.slides} slides, ${s.media.length} media, medicare=${r.medicare}`);
  if (!noRender) {
    const base = input.file.replace(/\.pptx$/, "");
    const count = render(r.file, join(DECKS, "renders", base), true);
    for (let i = 1; i <= count; i++) rows.push({ asset: `decks/renders/${base}/slide-${String(i).padStart(2, "0")}.png`, dimensions: "1280×720", source: "scripts/build-decks.ts (LibreOffice + pdftoppm, brand fonts)", notes: `slide ${i}` });
    render(r.file, join(CACHE, "decks", "fallback", base), false);
    console.log(`build-decks: rendered ${count} slides of ${base} (brand fonts) and a fallback-font set in .cache/decks/fallback`);
  }
}
for (const f of readdirSync(DECK_FONTS)) rows.push({ asset: `decks/fonts/${f}`, dimensions: "—", source: "scripts/collateral/deck-fonts.py (fontTools)", notes: f.endsWith(".ttf") ? "ship with the deck; install before presenting" : "license / notes" });
writeInventory(DECKS, rows);
console.log(`build-decks: ${results.length} decks, ${rows.length} inventory rows`);
