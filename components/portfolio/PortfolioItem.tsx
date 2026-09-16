"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { PortfolioAspect, PortfolioItem as Item } from "@/types";
import { transition } from "@/lib/motion";

interface PortfolioItemProps {
  item: Item;
  onOpen?: (id: string) => void;
  sizes?: string;
  /** Labels sit below the picture, never over it. */
  showStory?: boolean;
  /** Overrides the piece's own crop, so a single row can keep one shape. */
  aspect?: PortfolioAspect;
}

const aspects = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/11]",
} as const;

export function PortfolioItem({
  item,
  onOpen,
  sizes = "(max-width: 768px) 92vw, 30vw",
  showStory = true,
  aspect,
}: PortfolioItemProps) {
  const plate = (
    <div className={`relative overflow-hidden rounded-plate bg-sand ${aspects[aspect ?? item.aspect]}`}>
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.018]"
      />
    </div>
  );

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={transition.slow}
      className="flex flex-col"
    >
      {onOpen ? (
        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="group block w-full text-left"
          aria-label={`Open ${item.title}`}
        >
          {plate}
        </button>
      ) : (
        <div className="group">{plate}</div>
      )}
      <figcaption className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-card leading-snug">{item.title}</h3>
          <p className="tabular shrink-0 text-caption tracking-normal text-ink-soft">{item.year}</p>
        </div>
        {showStory ? (
          <p className="mt-1 max-w-[42ch] text-body text-ink-soft">{item.story}</p>
        ) : null}
      </figcaption>
    </motion.figure>
  );
}
