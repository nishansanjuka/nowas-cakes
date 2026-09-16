import Image from "next/image";
import type { Review } from "@/types";
import { Rating } from "@/components/ui/Rating";
import { cx } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <figure className={cx("flex w-full flex-col gap-5", className)}>
      <Rating value={review.rating} className="text-blush-deep" />
      <blockquote className="font-display text-quote leading-[1.45] text-ink">
        {review.text}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <Image
          src={review.avatar.src}
          alt={review.avatar.alt}
          width={40}
          height={40}
          className="h-10 w-10 rounded-pill object-cover"
        />
        <div>
          <p className="text-body leading-tight">{review.name}</p>
          <p className="text-caption tracking-normal text-ink-soft">
            {review.cakeOrdered}, {review.occasion}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
