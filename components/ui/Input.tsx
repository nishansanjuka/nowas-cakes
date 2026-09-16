import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/utils";

const fieldClass =
  "w-full rounded-control bg-sand px-4 py-3 text-ink placeholder:text-ink-soft/75 " +
  "transition-[background-color] duration-[var(--duration-fast)] ease-[var(--ease-out-quiet)] " +
  "hover:bg-shell focus:bg-shell focus:outline-none";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}

export function FieldShell({ id, label, hint, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-caption uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-caption tracking-normal text-blush-deep">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-caption tracking-normal text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "className" | "id"> & {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
};

export function Input({ id, label, hint, error, ...rest }: InputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cx(fieldClass, error && "ring-1 ring-blush-deep")}
        {...rest}
      />
    </FieldShell>
  );
}

type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "className" | "id"> & {
  id: string;
  label: string;
  hint?: ReactNode;
};

export function Textarea({ id, label, hint, rows = 4, ...rest }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cx(fieldClass, "resize-y")}
        {...rest}
      />
    </FieldShell>
  );
}
