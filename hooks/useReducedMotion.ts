"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the visitor asked for reduced motion. The scroll driven sections
 * are replaced by a settled version of themselves rather than simply running
 * faster.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
