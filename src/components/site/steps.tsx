import type { Page } from "../../payload-types.ts";
import { Reveal } from "./reveal.tsx";

type StepsBlock = Extract<NonNullable<Page["layout"]>[number], { blockType: "steps" }>;

/**
 * A numbered sequence, rendered as rows separated by hairlines rather than as
 * cards: the index in mono at stat size, the step in Figtree. The number comes
 * from the array position, never from the document, so reordering in the admin
 * cannot leave the numbering saying something else. It is `aria-hidden` because
 * the list element already numbers the steps for a screen reader.
 */
export function Steps({ block, id = "steps-h" }: { block: StepsBlock; id?: string }) {
  const items = block.items ?? [];
  if (!items.length) return null;
  return (
    <section className="band shell" aria-labelledby={id} data-steps>
      <div className="grid gap-band-gap">
        <div className="grid max-w-measure-editorial gap-4">
          {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
          <h2 id={id} className="display-type text-display-l text-ink">{block.heading}</h2>
          {block.intro ? <p className="font-text text-lede text-ink-secondary">{block.intro}</p> : null}
        </div>
        <ol className="grid">
          {items.map((it, i) => (
            <Reveal key={it.id ?? i} as="li" index={i} className="grid gap-x-10 gap-y-2 border-t border-border py-8 md:grid-cols-[6rem_1fr]">
              <span aria-hidden className="figure-mono text-stat leading-none text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="grid max-w-measure-editorial gap-2">
                <h3 className="font-text text-subhead text-ink">{it.title}</h3>
                <p className="font-text text-copy text-ink-secondary">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
