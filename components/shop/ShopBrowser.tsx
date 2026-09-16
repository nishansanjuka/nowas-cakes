"use client";

import { useMemo, useState } from "react";
import type { Category, Product, SortKey } from "@/types";
import { ShopControls } from "./ShopControls";
import { ProductGrid } from "./ProductGrid";

interface ShopBrowserProps {
  products: Product[];
  categories: Category[];
}

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {
  featured: (a, b) => b.popularity - a.popularity,
  priceLow: (a, b) => a.basePrice - b.basePrice,
  priceHigh: (a, b) => b.basePrice - a.basePrice,
  newest: (a, b) => b.addedOn.localeCompare(a.addedOn),
};

/** Holds the filter and sort choices for the shop. Both are UI only. */
export function ShopBrowser({ products, categories }: ShopBrowserProps) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const filtered =
      category === "all" ? products : products.filter((p) => p.categoryId === category);
    return [...filtered].sort(comparators[sort]);
  }, [products, category, sort]);

  const active = categories.find((c) => c.id === category);

  return (
    <>
      <ShopControls
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        resultCount={visible.length}
      />
      {active ? <p className="mt-5 max-w-[52ch] text-body text-ink-soft">{active.blurb}</p> : null}
      <div className="mt-14">
        <ProductGrid
          products={visible}
          swapKey={`${category}-${sort}`}
          emptyMessage="Nothing in this category right now. The shelf changes with the season, so it is worth looking again."
        />
      </div>
    </>
  );
}
