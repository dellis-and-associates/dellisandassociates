import type { ReactNode } from "react";

/** Tables wider than the measure scroll inside their own container; the page never scrolls sideways. */
export function TableWrap({ children, caption, className = "" }: { children: ReactNode; caption?: string; className?: string }) {
  // scroll-mt: a focused scroll container taller than the viewport must land below the sticky header (WCAG 2.2 focus not obscured).
  return (
    <div className={`scroll-mt-24 overflow-x-auto rounded-surface border border-border ${className}`} tabIndex={0} aria-label={caption}>
      {children}
    </div>
  );
}

export const th = "bg-surface-sunken px-3 py-2 text-left font-sans text-caption font-medium tracking-wide uppercase text-ink-muted";
export const thNum = `${th} text-right`;
export const td = "border-t border-border px-3 py-2 align-top font-sans text-small text-ink";
export const tdNum = `${td} text-right tabular`;
export const trTotal = "border-t-2 border-ink font-semibold";

/**
 * Comparison table: rows are coverages, columns are options; numbers tabular
 * and right-aligned; the recommended column is highlighted AND says so in
 * its header.
 */
export function ComparisonTable({ caption, columns, rows, recommended, footnote }: { caption: string; columns: string[]; rows: { label: string; cells: (string | number)[]; note?: string }[]; recommended?: number; footnote?: string }) {
  return (
    <TableWrap caption={caption}>
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={th}>Coverage</th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`${thNum} ${i === recommended ? "bg-brand-subtle text-brand-subtle-ink" : ""}`}>
                {c}
                {i === recommended ? <span className="block normal-case tracking-normal">Recommended</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className={`${td} text-left font-medium`}>
                {r.label}
                {r.note ? <span className="block font-normal text-ink-muted">{r.note}</span> : null}
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className={`${tdNum} ${i === recommended ? "bg-brand-subtle" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {footnote ? (
          <tfoot>
            <tr>
              <td colSpan={columns.length + 1} className="border-t border-border px-3 py-2 font-sans text-caption text-ink-muted">{footnote}</td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </TableWrap>
  );
}
