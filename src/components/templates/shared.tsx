import Link from "next/link";
import type { Product, State } from "../../payload-types.ts";
import { minimumsFor } from "../../lib/compose.ts";
import { getCompliance } from "../../lib/content.ts";
import { Accordion } from "../ui/misc.tsx";
import { TableWrap, td, th } from "../ui/table.tsx";
import { RichText } from "../site/richtext.tsx";
import { hasTodo } from "../../fields/index.ts";

/** State minimums: every row cited. A line with no statutory minimum on file shows no section (most lines have none). */
export function StateMinimumsTable({ state, product }: { state: State; product: Product }) {
  const rows = minimumsFor(state, product.id).filter((m) => !hasTodo(m.requirement));
  if (!rows.length) return null;
  return (
    <section aria-labelledby="minimums" className="grid gap-4" data-minimums>
      <h2 id="minimums">What {state.name} requires for {product.name.toLowerCase()}</h2>
      {(
        <TableWrap caption={`${state.name} minimums for ${product.name}`}>
          <table>
            <thead><tr><th scope="col" className={th}>Coverage</th><th scope="col" className={`${th} text-right`}>Minimum</th><th scope="col" className={th}>Source</th></tr></thead>
            <tbody>
              {rows.map((m, i) => (
                <tr key={i}>
                  <th scope="row" className={`${td} text-left font-medium`}>{m.coverage}{m.note ? <span className="block font-normal text-ink-muted">{m.note}</span> : null}</th>
                  <td className={`${td} text-right tabular`}>{m.requirement}</td>
                  <td className={td}><a href={m.sourceUrl} rel="noopener">{state.doi?.name && !hasTodo(state.doi.name) ? state.doi.name : "Source"}</a>{m.verifiedAt ? <span className="block text-ink-muted tabular">verified {new Date(m.verifiedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      )}
    </section>
  );
}

export function CoveredLists({ product }: { product: Product }) {
  const covered = (product.covered ?? []).map((c) => c.item);
  const not = (product.notCovered ?? []).map((c) => c.item);
  if (!covered.length && !not.length) return null;
  return (
    <section aria-labelledby="covered" className="grid gap-4">
      <h2 id="covered">Covered and not covered</h2>
      <div className="grid gap-6 rounded-surface border border-border bg-surface-raised p-6 md:grid-cols-2">
        <div>
          <h3 className="font-text text-title-sm">Covered</h3>
          <ul className="mt-3 grid gap-2 font-text text-copy">{covered.map((c) => <li key={c} className="border-l-2 border-positive-border pl-3">{c}</li>)}</ul>
        </div>
        <div>
          <h3 className="font-text text-title-sm">Not covered</h3>
          <ul className="mt-3 grid gap-2 font-text text-copy">{not.map((c) => <li key={c} className="border-l-2 border-critical-border pl-3">{c}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function CoverageBlocks({ product }: { product: Product }) {
  const blocks = product.coverageBlocks ?? [];
  if (!blocks.length) return null;
  return (
    <section aria-labelledby="coverage" className="grid gap-6">
      <h2 id="coverage">What {product.name.toLowerCase()} does</h2>
      {blocks.map((b, i) => (
        <article key={i} className="grid gap-2">
          <h3>{b.heading}</h3>
          <RichText value={b.body} />
        </article>
      ))}
    </section>
  );
}

export function Discounts({ product }: { product: Product }) {
  const items = product.discounts ?? [];
  if (!items.length || product.thirdSubpage === "plans-enrollment-faq") return null;
  return (
    <section aria-labelledby="discounts" className="grid gap-4">
      <h2 id="discounts">Discounts carriers commonly offer</h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {items.map((d) => (
          <div key={d.name} className="rounded-surface border border-border bg-surface-raised p-4">
            <dt className="font-text text-copy font-semibold">{d.name}</dt>
            <dd className="mt-1 font-text text-copy text-ink-muted">{d.description}</dd>
          </div>
        ))}
      </dl>
      <p className="max-w-measure-body font-text text-meta text-ink-muted">Which discounts apply, and how much they change a premium, depends on the carrier and the policy. We do not quote a savings figure.</p>
    </section>
  );
}

export function Faq({ product, extra = [], heading = "Questions people ask" }: { product: Product; extra?: { question: string; answer: unknown }[]; heading?: string }) {
  const items = [...(product.faqs ?? []), ...extra];
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq" className="grid gap-4">
      <h2 id="faq">{heading}</h2>
      <Accordion items={items.map((f, i) => ({ id: `q-${i}`, question: f.question, answer: <RichText value={f.answer} className="" /> }))} />
    </section>
  );
}

export async function MedicareDisclaimer({ product }: { product: Product }) {
  if (!product.medicareTouching) return null;
  const c = await getCompliance();
  if (!c.medicareInScope) return null;
  return <p data-disclosure="medicareTpmo" className="rounded-surface border border-border bg-surface-sunken p-4 font-text text-meta text-ink">{c.medicareTpmoDisclaimer}</p>;
}

export function StateLinks({ product, states }: { product: Product; states: State[] }) {
  return (
    <p className="font-text text-copy text-ink-muted">
      {product.name} by state: {states.map((s) => <Link key={s.id} href={`/insurance/${product.slug}/${s.slug}/`} className="mr-3">{s.name}</Link>)}
    </p>
  );
}
