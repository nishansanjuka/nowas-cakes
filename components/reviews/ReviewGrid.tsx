import type { Review } from "@/types";
import { ReviewCard } from "./ReviewCard";

export function ReviewGrid({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} className="max-w-[40ch]" />
      ))}
    </div>
  );
}
