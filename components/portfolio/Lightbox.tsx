"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { PortfolioItem } from "@/types";
import { Modal } from "@/components/ui/Modal";

interface LightboxProps {
  items: PortfolioItem[];
  openId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function Lightbox({ items, openId, onClose, onNavigate }: LightboxProps) {
  const index = items.findIndex((item) => item.id === openId);
  const item = index === -1 ? null : items[index];

  const step = useCallback(
    (delta: number) => {
      if (index === -1 || items.length === 0) return;
      const next = (index + delta + items.length) % items.length;
      onNavigate(items[next].id);
    },
    [index, items, onNavigate],
  );

  useEffect(() => {
    if (!item) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [item, step]);

  const control =
    "inline-flex min-h-11 items-center rounded-control px-3 text-caption uppercase tracking-[0.12em] " +
    "transition-opacity duration-[var(--duration-fast)] hover:opacity-70";

  return (
    <Modal
      open={item !== null}
      onClose={onClose}
      label={item ? item.title : "Portfolio piece"}
      controls={
        <>
          <button type="button" onClick={() => step(-1)} className={control}>
            Previous
          </button>
          <button type="button" onClick={() => step(1)} className={control}>
            Next
          </button>
        </>
      }
    >
      {item ? (
        <div className="flex min-h-0 flex-col gap-4">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-plate bg-sand">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(max-width: 1024px) 92vw, 64rem"
              className="max-h-[68svh] w-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-cream">
            <h2 className="font-display text-panel">{item.title}</h2>
            <p className="text-caption tracking-normal opacity-80">
              {item.place}, {item.year}
            </p>
            <p className="w-full max-w-[60ch] text-body opacity-85">{item.story}</p>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
