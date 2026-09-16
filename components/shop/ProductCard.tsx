"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { transition } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  /** Controls the plate's shape inside asymmetric grids. */
  aspect?: "tall" | "square" | "wide";
  sizes?: string;
  priority?: boolean;
}

const aspects = {
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/11]",
} as const;

export function ProductCard({
  product,
  aspect = "tall",
  sizes = "(max-width: 768px) 92vw, 30vw",
  priority = false,
}: ProductCardProps) {
  const image = product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={transition.slow}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className={`relative overflow-hidden rounded-plate bg-sand ${aspects[aspect]}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.018]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-card leading-snug">{product.name}</h3>
          <p className="tabular shrink-0 text-body text-ink-soft">
            {`from ${formatPrice(product.basePrice, product.currency)}`}
          </p>
        </div>
        <p className="mt-1 max-w-[38ch] text-body text-ink-soft">{product.tagline}</p>
      </Link>
    </motion.article>
  );
}
