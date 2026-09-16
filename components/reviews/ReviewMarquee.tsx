"use client";

import type { Review } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ReviewCard } from "./ReviewCard";
import { ReviewGrid } from "./ReviewGrid";

/**
 * A slow, continuous pass of what people said. Transform only, and replaced by
 * a static grid when motion is reduced.
 */
export function ReviewMarquee({ reviews }: { reviews: Review[] }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="mx-auto w-full max-w-[86rem] px-gutter md:px-10">
        <ReviewGrid reviews={reviews} />
      </div>
    );
  }

  const track = [...reviews, ...reviews];

  return (
    <div className="marquee relative overflow-hidden" aria-label="What people said">
      <ul className="marquee-track flex w-max gap-10 px-gutter md:px-10">
        {track.map((review, i) => (
          <li
            key={`${review.id}-${i}`}
            aria-hidden={i >= reviews.length}
            className="w-[min(78vw,26rem)] shrink-0"
          >
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
