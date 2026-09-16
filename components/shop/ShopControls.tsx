"use client";

import type { Category, SortKey } from "@/types";
import { FilterBar } from "@/components/portfolio/FilterBar";

const sortOptions: Array<{ id: SortKey; label: string }> = [
  { id: "featured", label: "Most ordered" },
  { id: "priceLow", label: "Price, low to high" },
  { id: "priceHigh", label: "Price, high to low" },
  { id: "newest", label: "Newest first" },
];

interface ShopControlsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  resultCount: number;
}

export function ShopControls({
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  resultCount,
}: ShopControlsProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <FilterBar
        categories={categories}
        activeId={activeCategory}
        onChange={onCategoryChange}
        label="Filter cakes by kind"
      />

      <div className="flex shrink-0 items-center gap-3">
        <label htmlFor="shop-sort" className="text-caption uppercase tracking-[0.12em] text-ink-soft">
          Sort
        </label>
        <select
          id="shop-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortKey)}
          className="rounded-control bg-sand px-3 py-2 text-control transition-colors duration-[var(--duration-fast)] hover:bg-shell focus:bg-shell focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="tabular text-caption tracking-normal text-ink-soft">{`${resultCount} cakes`}</span>
      </div>
    </div>
  );
}
