import { cx } from "@/lib/utils";

/** Five drawn marks, filled to the rating. One stroke weight throughout. */
export function Rating({ value, className }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className={cx("inline-flex items-center gap-1", className)}>
      <span className="sr-only">{`${rounded} out of 5`}</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-[13px] w-[13px]"
          fill={i <= rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        >
          <path d="M8 1.8 9.9 5.9l4.4.5-3.3 3 .9 4.4L8 11.6 4.1 13.8l.9-4.4-3.3-3 4.4-.5Z" />
        </svg>
      ))}
    </span>
  );
}
