import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * A small text label. Never placed over an image by design rule: labels sit
 * below the picture they describe.
 */
export function Badge({
  children,
  tone = "quiet",
  className,
}: {
  children: ReactNode;
  tone?: "quiet" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-pill px-3 py-1 text-caption uppercase tracking-[0.12em]",
        tone === "accent" ? "bg-blush-soft text-blush-deep" : "bg-sand text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
