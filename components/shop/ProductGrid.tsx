"use client";

import { motion } from "motion/react";
import type { Product } from "@/types";
import { easing, duration } from "@/lib/motion";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage: string;
  /** Changing this cross fades the grid, so a filter change is not a jump cut. */
  swapKey?: string;
}

export function ProductGrid({ products, emptyMessage, swapKey }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="max-w-[46ch] py-20 text-lead text-ink-soft">{emptyMessage}</p>
    );
  }

  return (
    <motion.div
      key={swapKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.base, ease: easing.quiet }}
      className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          aspect={i % 5 === 0 ? "square" : "tall"}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          priority={i < 3}
        />
      ))}
    </motion.div>
  );
}
