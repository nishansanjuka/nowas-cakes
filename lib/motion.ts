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

/**
 * Evaluates a cubic bezier as a plain function of t.
 *
 * Scroll driven values are read through function form useTransform rather than
 * keyframe ranges, because a keyframe range lets Motion promote the value to a
 * native scroll linked animation that runs on its own timeline and drifts away
 * from the smoothed scroll position driving everything else. A function needs
 * its own curve, so the easing tokens above are evaluated here too.
 */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const ax = 3 * x1 - 3 * x2 + 1;
  const bx = 3 * x2 - 6 * x1;
  const cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1;
  const by = 3 * y2 - 6 * y1;
  const cy = 3 * y1;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;

  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    // Newton converges in a handful of steps for the curves in the token set.
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const error = sampleX(t) - x;
      if (Math.abs(error) < 1e-6) break;
      const slope = slopeX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= error / slope;
    }
    return sampleY(Math.min(Math.max(t, 0), 1));
  };
}

/**
 * The cake assembly entrance. A layer swells from its own bottom edge and fades
 * up where it will finally sit, so the cake grows out of itself rather than
 * having pieces arrive from outside the stage.
 */
export const layerEntry = { y: 14, scale: 0.96, origin: "50% 100%" } as const;

/** The shadow the cake casts on its plate, empty and then whole. */
export const contactShadow = {
  from: { opacity: 0.2, spread: 0.92 },
  to: { opacity: 0.38, spread: 1.02 },
} as const;

/** The easing tokens as functions, for scroll driven work. */
export const curve = {
  out: cubicBezier(...easing.out),
  quiet: cubicBezier(...easing.quiet),
} as const;
