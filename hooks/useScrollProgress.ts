"use client";

import { useScroll, type MotionValue } from "motion/react";
import type { RefObject } from "react";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Scroll progress for one element, zero to one. The only source of scroll
 * position in the app: nothing listens to the scroll event directly.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  offset: Offset = ["start start", "end end"] as Offset,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return scrollYProgress;
}
