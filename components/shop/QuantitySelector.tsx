"use client";

import { cx } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  onChange,
  label,
  min = 1,
  max = 20,
  size = "md",
}: QuantitySelectorProps) {
  const step = (delta: number) => onChange(Math.min(Math.max(value + delta, min), max));
  const button =
    "grid place-items-center rounded-control text-ink-soft transition-[color,transform] " +
    "duration-[var(--duration-fast)] ease-[var(--ease-out-quiet)] hover:text-ink " +
    "active:scale-[0.94] disabled:opacity-40 disabled:pointer-events-none";
  // Both sizes keep a 44px touch target; only the type around them changes.
  const box = "h-11 w-11";

  return (
    <div
      className={cx(
        "inline-flex items-center rounded-control bg-sand",
        size === "sm" ? "gap-0" : "gap-1",
      )}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label={`Remove one ${label}`}
        className={cx(button, box)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.4">
          <path d="M3 8h10" strokeLinecap="round" />
        </svg>
      </button>
      <span
        aria-live="polite"
        className={cx("tabular min-w-6 text-center", size === "sm" ? "text-caption tracking-normal" : "text-body")}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        aria-label={`Add one ${label}`}
        className={cx(button, box)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.4">
          <path d="M8 3v10M3 8h10" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
