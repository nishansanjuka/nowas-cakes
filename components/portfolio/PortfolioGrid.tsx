"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Category, PortfolioItem as Item } from "@/types";
import { duration, easing } from "@/lib/motion";
import { FilterBar } from "./FilterBar";
import { PortfolioItem } from "./PortfolioItem";
import { Lightbox } from "./Lightbox";

interface PortfolioGridProps {
  items: Item[];
  categories: Category[];
}

/** Masonry columns, filtered in place, with a lightbox on click. */
export function PortfolioGrid({ items, categories }: PortfolioGridProps) {
  const [activeId, setActiveId] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => (activeId === "all" ? items : items.filter((item) => item.categoryId === activeId)),
    [items, activeId],
  );

  const active = categories.find((category) => category.id === activeId);

  return (
    <>
      <FilterBar
        categories={categories}
        activeId={activeId}
        onChange={setActiveId}
        label="Filter by occasion"
      />
      <p className="mt-4 text-body text-ink-soft">
        {active ? active.blurb : ""}{" "}
        <span className="tabular">{`${visible.length} of ${items.length}`}</span>
      </p>

      {visible.length === 0 ? (
        <p className="max-w-[46ch] py-20 text-lead text-ink-soft">
          Nothing in this category yet. Nowa adds pieces here as they leave the studio.
        </p>
      ) : (
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.base, ease: easing.quiet }}
          className="mt-12 gap-8 [column-gap:2rem] sm:columns-2 lg:columns-3"
        >
          {visible.map((item) => (
            <div key={item.id} className="mb-12 break-inside-avoid">
              <PortfolioItem
                item={item}
                onOpen={setOpenId}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              />
            </div>
          ))}
        </motion.div>
      )}

      <Lightbox
        items={visible}
        openId={openId}
        onClose={() => setOpenId(null)}
        onNavigate={setOpenId}
      />
    </>
  );
}
