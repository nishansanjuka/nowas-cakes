import type { Transition, Variants } from "motion/react";

/**
 * Every duration and easing in the app comes from here. Curves are exponential
 * ease outs from an already visible default; springs are critically damped so
 * nothing overshoots.
 */

export const easing = {
  /** The house curve. Fast departure, long settle. */
  out: [0.16, 1, 0.3, 1],
  /** Quieter sibling for small controls. */
  quiet: [0.33, 1, 0.68, 1],
} as const;

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
  drape: 0.9,
} as const;

export const spring = {
  /** Critically damped. Used for drawer travel. */
  settle: { type: "spring", stiffness: 210, damping: 30, mass: 0.9 },
} satisfies Record<string, Transition>;

export const transition = {
  fast: { duration: duration.fast, ease: easing.quiet },
  base: { duration: duration.base, ease: easing.out },
  slow: { duration: duration.slow, ease: easing.out },
  drape: { duration: duration.drape, ease: easing.out },
} satisfies Record<string, Transition>;

/** The one entrance the page uses, applied sparingly. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: transition.slow },
};
