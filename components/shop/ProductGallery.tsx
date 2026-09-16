"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ProductImage } from "@/types";
import { cx } from "@/lib/utils";
import { transition } from "@/lib/motion";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const active = images[index];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-plate bg-sand">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={active.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3" role="group" aria-label={`More pictures of ${name}`}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            aria-label={image.alt}
            className={cx(
              "relative h-20 w-16 overflow-hidden rounded-control bg-sand transition-opacity",
              "duration-[var(--duration-fast)] ease-[var(--ease-out-quiet)]",
              i === index ? "opacity-100" : "opacity-55 hover:opacity-85",
            )}
          >
            <Image src={image.src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
