"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { CartLine } from "@/types";
import { formatPrice } from "@/lib/utils";
import { transition } from "@/lib/motion";
import { QuantitySelector } from "@/components/shop/QuantitySelector";

interface CartItemProps {
  line: CartLine;
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
}

export function CartItem({ line, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transition.base}
      className="flex gap-4 py-5"
    >
      <Link href={`/shop/${line.slug}`} className="shrink-0">
        <Image
          src={line.image.src}
          alt={line.image.alt}
          width={88}
          height={110}
          className="h-[110px] w-[88px] rounded-plate object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/shop/${line.slug}`} className="font-display text-card leading-snug">
              {line.name}
            </Link>
            <p className="text-caption tracking-normal text-ink-soft">
              {line.sizeLabel}, {line.flavorLabel}
            </p>
          </div>
          <p className="tabular shrink-0 text-body">
            {formatPrice(line.unitPrice * line.quantity, line.currency)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <QuantitySelector
            size="sm"
            label={line.name}
            value={line.quantity}
            onChange={(next) => onQuantityChange(line.lineId, next)}
          />
          <button
            type="button"
            onClick={() => onRemove(line.lineId)}
            className="-mr-3 inline-flex min-h-11 items-center px-3 text-caption tracking-normal text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-blush-deep"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
}
