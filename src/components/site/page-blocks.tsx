import type { Page } from "../../payload-types.ts";
import { getCompliance, getForm } from "../../lib/content.ts";
import { Accordion } from "../ui/misc.tsx";
import { CtaBand } from "../ui/misc.tsx";
import { RichText } from "./richtext.tsx";
import { richTextToPlain } from "../../lib/text.ts";
import { FormRenderer } from "./form-renderer.tsx";

type Layout = NonNullable<Page["layout"]>;

/** Pages.layout blocks → sections. Disclosure text always comes from ComplianceSettings. */
export async function PageBlocks({ layout, stateLicense }: { layout: Layout | null | undefined; stateLicense?: { state: string; licenseNumber?: string | null } }) {
  if (!layout?.length) return null;
  const compliance = await getCompliance();
  const out = [];
  for (const [i, b] of layout.entries()) {
    if (b.blockType === "richText") out.push(<RichText key={i} value={b.body} />);
    else if (b.blockType === "faq") out.push(
      <section key={i} className="grid gap-4">
        {b.heading ? <h2>{b.heading}</h2> : null}
        <Accordion items={(b.items ?? []).map((it, j) => ({ id: `faq-${i}-${j}`, question: it.question, answer: <RichText value={it.answer} className="" /> }))} />
      </section>,
    );
    else if (b.blockType === "cta") out.push(<CtaBand key={i} heading={b.heading} body={b.body ?? undefined} action={{ label: b.label, href: b.href }} />);
    else if (b.blockType === "disclosure") {
      const text = b.key === "medicareTpmo" ? compliance.medicareTpmoDisclaimer : b.key === "stateLicensing" ? (compliance.stateLicensingDisclosure ?? "").replace("{{state}}", stateLicense?.state ?? "").replace("{{licenseNumber}}", stateLicense?.licenseNumber ?? "{{TODO:licenseNumber}}") : compliance.independentAgencyDisclosure;
      out.push(<p key={i} data-disclosure={b.key} className="rounded-surface border border-border bg-surface-sunken p-4 font-sans text-small text-ink">{text}</p>);
    } else if (b.blockType === "form") {
      const formId = typeof b.form === "object" ? b.form.id : b.form;
      const form = typeof b.form === "object" ? b.form : null;
      const doc = form ?? (await getForm(String(formId)));
      if (doc) out.push(<FormRenderer key={i} form={doc} />);
    }
  }
  return <>{out}</>;
}

export const plain = richTextToPlain;
