import Link from "next/link";
import type { Payload } from "payload";
import { ReferralEngine } from "@desert-peak/referrals";
import { TableWrap, td, th } from "../ui/table.tsx";
import { EmptyState } from "../ui/misc.tsx";
import { Callout } from "../ui/callout.tsx";

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/** The portal body shared by both tracks: my code, share, my referrals (first names only), my rewards. */
export async function PortalBody({ payload, referrer, siteUrl, track }: { payload: Payload; referrer: Doc; siteUrl: string; track: "customer" | "partner" }) {
  const engine = new ReferralEngine(payload);
  const [referrals, balances, tenant, ledger] = await Promise.all([
    payload.find({ collection: "referrals" as never, where: { referrer: { equals: referrer.id } }, sort: "-createdAt", limit: 100, depth: 0, overrideAccess: true }),
    engine.balances(referrer.id),
    payload.findByID({ collection: "tenants" as never, id: referrer.tenant as never, depth: 0, overrideAccess: true }) as Promise<Doc>,
    payload.find({ collection: "reward-ledger" as never, where: { referrer: { equals: referrer.id } }, sort: "-createdAt", limit: 100, depth: 0, overrideAccess: true }),
  ]);
  const link = `${siteUrl}/r/${referrer.code}`;
  const STATUS: Record<string, string> = { submitted: "Waiting for them to say yes", contacted: "We have been in touch", qualified: "Qualified", quoted: "Comparison sent", bound: "Chose a policy", closed: "Closed", rejected: "Not eligible" };
  return (
    <div className="grid gap-10">
      {!tenant.referralsEnabled ? <Callout kind="info" lead="Thank-yous are not switched on yet.">Referrals are tracked and contacted. Any thank-you depends on state rules and is enabled only once counsel has confirmed them.</Callout> : null}
      <section aria-labelledby="code" className="grid gap-4 rounded-surface border border-border bg-surface-raised p-6">
        <h2 id="code" className="font-text text-title-sm">Your code</h2>
        <p className="font-text text-title tabular tracking-wider">{referrer.code}</p>
        <p className="font-text text-copy text-ink-muted">Share the link or read the code out loud. It has no 0/O or 1/I/L, so it survives a phone call.</p>
        <p className="font-text text-copy"><a href={link} className="break-all">{link}</a></p>
        <div className="flex flex-wrap gap-3 font-text text-copy">
          <a href={`mailto:?subject=${encodeURIComponent("Desert Peak Insurance")}&body=${encodeURIComponent(`I thought this might be useful: ${link}`)}`} className="ui-link inline-flex min-h-11 items-center rounded-control border border-border-strong px-4 font-semibold text-ink">Share by email</a>
          <a href={`sms:?body=${encodeURIComponent(link)}`} className="ui-link inline-flex min-h-11 items-center rounded-control border border-border-strong px-4 font-semibold text-ink">Share by text</a>
          <Link href={track === "partner" ? "/partners/portal/refer/" : "/referrals/refer/"} className="inline-flex min-h-11 items-center rounded-control bg-brand px-4 font-semibold text-brand-ink no-underline hover:bg-brand-hover">Refer someone</Link>
        </div>
      </section>
      <section aria-labelledby="mine" className="grid gap-4">
        <h2 id="mine">Your referrals</h2>
        {referrals.docs.length === 0 ? <EmptyState title="No referrals yet" action={{ label: "Refer someone", href: track === "partner" ? "/partners/portal/refer/" : "/referrals/refer/" }}>When you refer someone, they get one message from us and can say no. Their status shows here, first name only.</EmptyState> : (
          <TableWrap caption="Your referrals">
            <table><thead><tr><th scope="col" className={th}>Person</th><th scope="col" className={th}>Status</th><th scope="col" className={`${th} text-right`}>Sent</th></tr></thead>
              <tbody>{referrals.docs.map((r: Doc) => <tr key={r.id}><td className={td}>{r.referee?.firstName}</td><td className={td}>{STATUS[r.status] ?? r.status}</td><td className={`${td} text-right tabular`}>{new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td></tr>)}</tbody>
            </table>
          </TableWrap>
        )}
      </section>
      <section aria-labelledby="rewards" className="grid gap-4">
        <h2 id="rewards">Your thank-yous</h2>
        <dl className="grid gap-3 sm:grid-cols-3">
          {[["Earned this year", balances.earnedThisYear], ["Issued this year", balances.issuedThisYear], ["Outstanding", balances.outstanding]].map(([l, v]) => <div key={String(l)} className="rounded-surface border border-border bg-surface-raised p-4"><dt className="kicker">{l}</dt><dd className="font-text text-title-sm tabular">{typeof v === "number" ? v.toLocaleString("en-US", { style: "currency", currency: "USD" }) : v}</dd></div>)}
        </dl>
        {ledger.docs.length ? <TableWrap caption="Reward history"><table><thead><tr><th scope="col" className={th}>Date</th><th scope="col" className={th}>Entry</th><th scope="col" className={`${th} text-right`}>Amount</th></tr></thead><tbody>{ledger.docs.map((e: Doc) => <tr key={e.id}><td className={`${td} tabular`}>{new Date(e.createdAt).toLocaleDateString("en-US")}</td><td className={td}>{e.type} · {e.rewardType}</td><td className={`${td} text-right tabular`}>{Number(e.amount).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td></tr>)}</tbody></table></TableWrap> : <p className="font-text text-copy text-ink-muted">Nothing yet. Amounts are computed from the ledger, never stored.</p>}
      </section>
    </div>
  );
}
