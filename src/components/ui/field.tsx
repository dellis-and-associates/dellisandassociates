import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const CONTROL = "block w-full min-h-11 rounded-control border bg-surface-raised px-3 font-text text-body text-ink placeholder:text-ink-muted";
const BORDER = { ok: "border-border-strong", invalid: "border-2 border-critical" };

type Common = { id: string; label: string; help?: string; error?: string; required?: boolean; optionalLabel?: boolean };

function Wrap({ id, label, help, error, required, optionalLabel = true, children }: Common & { children: ReactNode }) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="font-text text-copy font-semibold text-ink">
        {label}
        {!required && optionalLabel ? <span className="ml-1 font-normal text-ink-muted">(optional)</span> : null}
      </label>
      {children}
      {help && !error ? <p id={`${id}-help`} className="font-text text-copy text-ink-muted">{help}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="font-text text-meta font-semibold text-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, help?: string, error?: string) => [error ? `${id}-error` : null, help && !error ? `${id}-help` : null].filter(Boolean).join(" ") || undefined;

export function TextField({ id, label, help, error, required, optionalLabel, className = "", ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap id={id} label={label} help={help} error={error} required={required} optionalLabel={optionalLabel}>
      <input id={id} name={props.name ?? id} required={required} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, help, error)} className={`${CONTROL} ${error ? BORDER.invalid : BORDER.ok} ${className}`} {...props} />
    </Wrap>
  );
}

export function TextArea({ id, label, help, error, required, optionalLabel, className = "", ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap id={id} label={label} help={help} error={error} required={required} optionalLabel={optionalLabel}>
      <textarea id={id} name={props.name ?? id} required={required} rows={props.rows ?? 4} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, help, error)} className={`${CONTROL} py-2 ${error ? BORDER.invalid : BORDER.ok} ${className}`} {...props} />
    </Wrap>
  );
}

export function SelectField({ id, label, help, error, required, optionalLabel, options, placeholder, className = "", ...props }: Common & SelectHTMLAttributes<HTMLSelectElement> & { options: { label: string; value: string }[]; placeholder?: string }) {
  return (
    <Wrap id={id} label={label} help={help} error={error} required={required} optionalLabel={optionalLabel}>
      <select id={id} name={props.name ?? id} required={required} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, help, error)} className={`${CONTROL} ${error ? BORDER.invalid : BORDER.ok} ${className}`} defaultValue={props.defaultValue ?? ""} {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Wrap>
  );
}

/** Checkbox or radio group. 20 px controls; the fieldset carries the label and the error. */
export function ChoiceGroup({ id, legend, name, type, options, help, error, required, defaultValues = [] }: { id: string; legend: string; name: string; type: "checkbox" | "radio"; options: { label: string; value: string; help?: string }[]; help?: string; error?: string; required?: boolean; defaultValues?: string[] }) {
  return (
    <fieldset id={id} className="grid gap-2" aria-describedby={describedBy(id, help, error)} aria-invalid={error ? true : undefined}>
      <legend className="mb-1 font-text text-copy font-semibold text-ink">{legend}{required ? null : <span className="ml-1 font-normal text-ink-muted">(optional)</span>}</legend>
      {options.map((o) => (
        <label key={o.value} className="flex min-h-6 items-start gap-3 font-text text-copy text-ink">
          <input type={type} name={name} value={o.value} defaultChecked={defaultValues.includes(o.value)} className={`mt-0.5 size-5 shrink-0 appearance-none border border-border-strong bg-surface-raised checked:border-brand checked:bg-brand ${type === "radio" ? "rounded-pill" : "rounded-control"}`} />
          <span>
            {o.label}
            {o.help ? <span className="block text-ink-muted">{o.help}</span> : null}
          </span>
        </label>
      ))}
      {help && !error ? <p id={`${id}-help`} className="font-text text-copy text-ink-muted">{help}</p> : null}
      {error ? <p id={`${id}-error`} className="font-text text-meta font-semibold text-critical">{error}</p> : null}
    </fieldset>
  );
}

/** Error summary at the top of a form: links focus the field. */
export function ErrorSummary({ errors, id = "error-summary" }: { errors: { field: string; message: string }[]; id?: string }) {
  if (!errors.length) return null;
  return (
    <div id={id} role="alert" tabIndex={-1} className="rounded-surface border border-critical-border border-l-4 bg-critical-surface p-4 text-critical-ink">
      <p className="font-text text-copy font-semibold">There {errors.length === 1 ? "is 1 thing" : `are ${errors.length} things`} to fix before this can be sent.</p>
      <ul className="mt-2 grid gap-1 font-text text-copy">
        {errors.map((e) => (
          <li key={e.field}><a href={`#${e.field}`} className="text-critical">{e.message}</a></li>
        ))}
      </ul>
    </div>
  );
}
