import Link from "next/link";
import { pageMetadata } from "@/src/lib/seo";
import { Button, LinkButton } from "@/src/components/ui/button";
import { ChoiceGroup, ErrorSummary, SelectField, TextArea, TextField } from "@/src/components/ui/field";
import { Callout } from "@/src/components/ui/callout";
import { ComparisonTable, TableWrap, td, th, trTotal } from "@/src/components/ui/table";
import { Card, CardGrid } from "@/src/components/ui/card";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { Accordion, CtaBand, Dialog, EmptyState, LinkTabs, Pagination, Progress, RelatedLinks, Skeleton, Stepper, StrataRule, Tag, Toast, Tooltip } from "@/src/components/ui/misc";
import { Lockup, Mark } from "@/src/components/ui/logo";
import { IconCheckCircle, IconCrossCircle, IconInfo, IconPhone, IconPrint, IconSearch, IconTriangle } from "@/src/components/ui/icons";

export const metadata = pageMetadata({ title: "Design system", description: "Every component, every state, from real content. The review artifact and the visual baseline.", path: "/design-system/", indexable: false });

const Section = ({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) => (
  <section id={id} aria-labelledby={`${id}-h`} className="grid gap-6 border-t border-border pt-10">
    <div className="grid gap-1"><h2 id={`${id}-h`}>{title}</h2>{note ? <p className="max-w-measure-body font-sans text-small text-ink-muted">{note}</p> : null}</div>
    {children}
  </section>
);
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid gap-3 md:grid-cols-[10rem_1fr]"><p className="kicker pt-3">{label}</p><div className="flex flex-wrap items-start gap-3">{children}</div></div>
);

/** noindex gallery. Every state is rendered from real Desert Peak content; nothing here is lorem. */
export default function DesignSystem() {
  const ids = ["type", "colour", "buttons", "fields", "choice", "callout", "table", "card", "nav", "disclosure", "states", "brand", "icons"];
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <Breadcrumb items={[{ label: "Design system", href: "/design-system/" }]} />
      <header className="grid gap-4"><h1>Design system</h1><p className="lead max-w-measure-body">Twenty-five components, every state, composed only from brand tokens. This page is the review artifact and the visual regression baseline.</p><nav aria-label="Sections" className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-small">{ids.map((i) => <a key={i} href={`#${i}`} className="ui-link px-1">{i}</a>)}</nav></header>

      <Section id="type" title="Typography" note="Minor third on a 17 px base. Archivo for UI and headings, Source Serif 4 for prose. Nothing below 12 px.">
        <p className="display">Coverage is a finding, not a pitch.</p>
        <p className="headline">Auto insurance in Chandler, AZ (h1 style)</p>
        <h2>What Arizona requires</h2>
        <h3>Bodily injury liability</h3>
        <h4>Per person</h4>
        <p className="lead max-w-measure-body">An umbrella policy pays after your auto or home liability limit is used up. Most carriers require an underlying auto limit before they will write one.</p>
        <p className="max-w-measure-body">Body copy is Source Serif 4 at 17 px on a 68ch measure. <a href="#type">Links in prose are underlined</a> with a 3 px offset. <em>Emphasis is the serif italic.</em> Figures in prose are proportional; in tables they are tabular: 250,000 · 50,000 · 25,000.</p>
        <p className="font-sans text-small">UI text: Archivo 14 px.</p>
        <p className="font-sans text-caption">Caption: Archivo 12 px, the legal line. Never smaller.</p>
        <p className="kicker">Kicker above an article title</p>
      </Section>

      <Section id="colour" title="Colour roles" note="Surfaces are caliche, ink is basalt, brand is hematite. Ochre is ornament and never text.">
        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5 font-sans text-caption">
          {[["bg-surface", "surface"], ["bg-surface-raised", "surface-raised"], ["bg-surface-sunken", "surface-sunken"], ["bg-surface-inverse", "surface-inverse"], ["bg-brand", "brand"], ["bg-brand-subtle", "brand-subtle"], ["bg-accent", "accent (ornament, never text)"], ["bg-positive-surface border-positive-border", "positive-surface / border"], ["bg-notice-surface border-notice-border", "notice-surface / border"], ["bg-critical-surface border-critical-border", "critical-surface / border"]].map(([c, l]) => (
            <li key={l} className="grid gap-1"><span className={`block min-h-12 rounded-surface border border-border ${c}`} aria-hidden /><span>{l}</span></li>
          ))}
        </ul>
      </Section>

      <Section id="buttons" title="Buttons" note="44 px minimum. One primary per view. Destructive is outlined, never solid. Disabled stays in the tab order with aria-disabled when temporary.">
        <Row label="Primary"><Button>Request the analysis</Button><Button loading>Request the analysis</Button><Button disabled>Request the analysis</Button></Row>
        <Row label="Secondary"><Button variant="secondary">Compare limits</Button><Button variant="secondary" disabled>Compare limits</Button></Row>
        <Row label="Quiet"><Button variant="quiet">Edit vehicles</Button><LinkButton href="/quote/" variant="quiet">Save and come back later</LinkButton></Row>
        <Row label="Destructive"><Button variant="destructive">Remove driver</Button></Row>
        <Row label="On brand"><div className="rounded-surface bg-brand p-4"><LinkButton href="/quote/" className="border border-brand-ink bg-brand-ink text-brand hover:bg-surface">Request the analysis</LinkButton></div></Row>
      </Section>

      <Section id="fields" title="Inputs" note="Labels above, help below, error in critical with the field described by it. Phones open the right keyboard.">
        <div className="grid max-w-measure-body gap-6">
          <TextField id="ds-name" label="Your name" autoComplete="name" required />
          <TextField id="ds-email" label="Email" type="email" autoComplete="email" inputMode="email" required help="Where we send the comparison." />
          <TextField id="ds-phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" required error="Enter a phone number with at least 10 digits." defaultValue="801-555" />
          <TextField id="ds-zip" label="ZIP code" inputMode="numeric" autoComplete="postal-code" required defaultValue="85224" disabled />
          <SelectField id="ds-roof" label="Roof" options={[{ label: "Asphalt shingle", value: "shingle" }, { label: "Tile", value: "tile" }]} placeholder="Choose one" />
          <TextArea id="ds-notes" label="Anything else we should know?" help="Current carrier, renewal date, a claim you are worried about." />
          <ErrorSummary errors={[{ field: "ds-phone", message: "Enter a phone number with at least 10 digits." }]} id="ds-summary" />
        </div>
      </Section>

      <Section id="choice" title="Checkbox and radio groups" note="20 px controls; radio is the only pill.">
        <div className="grid max-w-measure-body gap-6 md:grid-cols-2">
          <ChoiceGroup id="ds-lines" name="ds-lines" legend="What should we compare?" type="checkbox" required options={[{ label: "Auto insurance", value: "auto" }, { label: "Home insurance", value: "home", help: "Includes condo and renters." }, { label: "Umbrella insurance", value: "umbrella" }]} defaultValues={["auto"]} />
          <ChoiceGroup id="ds-own" name="ds-own" legend="You are the" type="radio" options={[{ label: "Owner, living there", value: "owner" }, { label: "Renter", value: "renter" }, { label: "Landlord", value: "landlord" }]} error="Choose one." />
        </div>
      </Section>

      <Section id="callout" title="Callouts" note="Status is never colour alone: icon plus a leading word.">
        <div className="grid max-w-measure-body gap-3">
          <Callout kind="positive" lead="You are covered.">Your current umbrella limit meets the carrier&rsquo;s underlying requirement.</Callout>
          <Callout kind="notice" lead="Renewal in 21 days.">Rates on this line changed this year; a comparison before renewal is worth the twenty minutes.</Callout>
          <Callout kind="critical" lead="Coverage gap.">The auto policy&rsquo;s bodily injury limit is below what the umbrella carrier requires as underlying.</Callout>
          <Callout kind="info">Statutory minimums are cited to the state Department of Insurance. Where we have not verified one, we say so.</Callout>
        </div>
      </Section>

      <Section id="table" title="Tables and the comparison table" note="Header on surface-sunken, numeric columns right-aligned and tabular, the recommended column highlighted and labelled.">
        <ComparisonTable caption="Auto liability options" columns={["Current", "Option A", "Option B"]} recommended={2} rows={[{ label: "Bodily injury, per person", cells: ["25,000", "50,000", "100,000"] }, { label: "Bodily injury, per accident", cells: ["50,000", "100,000", "300,000"] }, { label: "Property damage", cells: ["15,000", "50,000", "100,000"], note: "Minimums are not enough for a new truck." }, { label: "Deductible, collision", cells: ["500", "500", "1,000"] }]} footnote="Illustrative structure only; limits are set with you. No premium is shown because none has been quoted." />
        <TableWrap caption="Plain table with a totals row">
          <table><thead><tr><th scope="col" className={th}>Item</th><th scope="col" className={`${th} text-right`}>Amount</th></tr></thead><tbody><tr><td className={td}>Earned</td><td className={`${td} text-right tabular`}>50</td></tr><tr><td className={td}>Issued</td><td className={`${td} text-right tabular`}>25</td></tr><tr className={trTotal}><td className={td}>Outstanding</td><td className={`${td} text-right tabular`}>25</td></tr></tbody></table>
        </TableWrap>
      </Section>

      <Section id="card" title="Card" note="One kind. Bordered, 4 px radius, shadow-0. Hover is a border change; nothing lifts.">
        <CardGrid>
          <Card title="Auto insurance" href="/insurance/auto-insurance/" meta="Every city">Liability, collision and comprehensive for cars and trucks.</Card>
          <Card title="Umbrella insurance" href="/insurance/umbrella-insurance/" meta="Every city">Pays after your auto or home liability limit is used up.</Card>
          <Card title="Chandler, AZ" href="/insurance/auto-insurance/arizona/chandler/" meta="Maricopa County" />
        </CardGrid>
      </Section>

      <Section id="nav" title="Navigation pieces" note="Breadcrumb, link tabs, pagination, related links. Tabs are pages, so the URL is the state.">
        <Breadcrumb label="Example breadcrumb" items={[{ label: "Insurance", href: "/insurance/" }, { label: "Auto insurance", href: "/insurance/auto-insurance/" }, { label: "Arizona", href: "/insurance/auto-insurance/arizona/" }]} />
        <LinkTabs label="Product pages" items={[{ label: "Overview", href: "#nav" }, { label: "What it covers", href: "#type" }, { label: "Discounts and FAQ", href: "#colour" }]} current="#nav" />
        <Pagination page={3} pages={12} href={(p) => `#page-${p}`} />
        <RelatedLinks items={[{ label: "Home insurance in Chandler", href: "/insurance/home-insurance/arizona/chandler/", note: "Monsoon roof damage is the common claim." }, { label: "Auto insurance in Arizona", href: "/insurance/auto-insurance/arizona/" }]} />
      </Section>

      <Section id="disclosure" title="Accordion, dialog, tooltip, toast" note="Accordion is native details; the dialog is the native element; the tooltip's text is also available on focus.">
        <Accordion items={[{ id: "ds-q1", question: "Does home insurance cover monsoon damage?", answer: <p>Wind and hail from a monsoon storm are usually covered perils; flood from the same storm is not, unless you hold a separate flood policy.</p> }, { id: "ds-q2", question: "What is an underlying limit?", answer: <p>The liability limit your auto or home policy must carry before an umbrella carrier will write the umbrella on top of it.</p> }]} />
        <Dialog id="ds-dialog" title="Remove this vehicle?" open className="static">It will be removed from the comparison. Nothing else changes.</Dialog>
        <p className="font-sans text-small">A <Tooltip text="The amount you pay before the policy pays.">deductible</Tooltip> applies per claim.</p>
        <div className="relative min-h-24"><Toast message="Saved. Come back any time this week." kind="positive" /></div>
      </Section>

      <Section id="states" title="Progress, stepper, skeleton, empty state, tag" note="Progress is text first. Skeletons match the final dimensions. Empty states point at the next step.">
        <Stepper step={2} total={4} label="About you" steps={["What to compare", "About you", "Details", "Check and send"]} />
        <Progress value={48} label="Cities with complete local facts" />
        <Skeleton lines={4} className="max-w-measure-narrow" />
        <EmptyState as="h3" title="Profiles are being confirmed" action={{ label: "Talk to a person", href: "/contact/" }}>We list agents only with their real names, license numbers and a photo release on file.</EmptyState>
        <Row label="Tags"><Tag>Every city</Tag><Tag>Statewide</Tag><Tag>Draft</Tag></Row>
        <CtaBand heading="Request the analysis for auto insurance in Chandler" body="Or call the office. A licensed agent, not a call centre." action={{ label: "Request the analysis", href: "/quote/" }} secondary={{ label: "Talk to a person", href: "/contact/" }} />
      </Section>

      <Section id="brand" title="Brand marks and the strata rule" note="Mark alone under 200 px; lockup in the header; the strata rule is the only ornament.">
        <Row label="Lockup"><Lockup /></Row>
        <Row label="Mark"><Mark className="h-6 w-auto text-brand" /><Mark className="h-10 w-auto text-brand" /><div className="rounded-surface bg-surface-inverse p-3"><Mark className="h-10 w-auto text-ink-inverse" /></div></Row>
        <Row label="Rule"><StrataRule /></Row>
      </Section>

      <Section id="icons" title="Icons" note="One set: 24-unit grid, 2 px stroke, round caps, currentColor. Never emoji.">
        <Row label="Status"><IconCheckCircle label="Good" className="text-positive" /><IconTriangle label="Notice" className="text-notice" /><IconCrossCircle label="Gap" className="text-critical" /><IconInfo label="Note" className="text-ink-muted" /></Row>
        <Row label="Action"><IconPhone label="Call" /><IconSearch label="Search" /><IconPrint label="Print" /></Row>
      </Section>
      <p className="font-sans text-small"><Link href="/">Home</Link></p>
    </div>
  );
}
