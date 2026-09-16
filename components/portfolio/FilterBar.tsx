"use client";

import type { Category } from "@/types";
import { cx } from "@/lib/utils";

interface FilterBarProps {
  categories: Category[];
  activeId: string;
  onChange: (id: string) => void;
  label: string;
}

export function FilterBar({ categories, activeId, onChange, label }: FilterBarProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1 md:mx-0 md:flex-wrap md:px-0"
    >
      {categories.map((category) => {
        const active = category.id === activeId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            aria-pressed={active}
            className={cx(
              "shrink-0 rounded-pill px-4 py-2 text-control transition-colors",
              "duration-[var(--duration-fast)] ease-[var(--ease-out-quiet)]",
              active ? "bg-ink text-cream" : "bg-sand text-ink-soft hover:bg-shell hover:text-ink",
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
