"use client";

import type { ProductOption } from "@/types";
import { cx, formatPrice } from "@/lib/utils";

interface OptionSelectorProps {
  label: string;
  name: string;
  options: ProductOption[];
  value: string;
  onChange: (id: string) => void;
  currency: string;
}

export function OptionSelector({
  label,
  name,
  options,
  value,
  onChange,
  currency,
}: OptionSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-caption uppercase tracking-[0.12em] text-ink-soft">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <label
              key={option.id}
              className={cx(
                "cursor-pointer rounded-control px-4 py-3 text-control transition-colors",
                "duration-[var(--duration-fast)] ease-[var(--ease-out-quiet)]",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blush-deep",
                selected ? "bg-ink text-cream" : "bg-sand text-ink hover:bg-shell",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <span>{option.label}</span>
              {option.note ? (
                <span className={cx("ml-2", selected ? "text-cream/70" : "text-ink-soft")}>
                  {option.note}
                </span>
              ) : null}
              {option.priceDelta !== 0 ? (
                <span className={cx("tabular ml-2", selected ? "text-cream/70" : "text-ink-soft")}>
                  {option.priceDelta > 0 ? "+" : "less "}
                  {formatPrice(Math.abs(option.priceDelta), currency)}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
