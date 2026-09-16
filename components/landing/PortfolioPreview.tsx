import Link from "next/link";
import type { PortfolioItem as Item } from "@/types";
import { PortfolioItem } from "@/components/portfolio/PortfolioItem";

interface PortfolioPreviewProps {
  items: Item[];
  heading: string;
  body: string;
}

/** A scroll snapping row, so the work reads as a shelf rather than a grid. */
export function PortfolioPreview({ items, heading, body }: PortfolioPreviewProps) {
  return (
    <section className="bg-sand py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-[86rem] px-gutter md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[16ch] font-display text-title">{heading}</h2>
            <p className="mt-5 max-w-[52ch] text-lead text-ink-soft">{body}</p>
          </div>
          <Link
            href="/portfolio"
            className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
          >
            See the full portfolio
          </Link>
        </div>
      </div>

      <ul className="mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto px-gutter pb-4 md:px-10">
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[min(78vw,22rem)] shrink-0 snap-start"
          >
            <PortfolioItem
              item={item}
              aspect="tall"
              sizes="(max-width: 768px) 78vw, 22rem"
              showStory={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
