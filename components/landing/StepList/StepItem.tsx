"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { CakeLayer } from "@/types";

/**
 * Opacity the steps that are not being placed sit at. Not the 0.4 it looks
 * like it wants to be: warm charcoal at 0.4 over the cream ground computes to
 * roughly 2.4:1, which fails AA for text. This is the lowest value that still
 * clears 4.5:1, and it still reads as clearly stepped back.
 */
const RESTING = 0.66;

interface Props {
  layer: CakeLayer;
  activeStep: MotionValue<number>;
  /** True shows every step at rest, for the reduced motion list. */
  settled: boolean;
}

export function StepItem({ layer, activeStep, settled }: Props) {
  const active = useTransform(activeStep, (value) => (value === layer.order ? 1 : 0));
  const labelOpacity = useTransform(active, (value) => RESTING + (1 - RESTING) * value);

  return (
    <li>
      <motion.p
        className="font-display text-card"
        style={settled ? undefined : { opacity: labelOpacity }}
      >
        {layer.label}
      </motion.p>
      {/* One line is always reserved, so the list keeps its rhythm whichever
          step is active and nothing below it shifts as captions come and go.
          The captions are written short enough to hold that line at 320px. */}
      <motion.p
        className="mt-1 min-h-[1lh] max-w-[34ch] text-caption tracking-normal text-ink-soft"
        style={settled ? undefined : { opacity: active }}
      >
        {layer.caption}
      </motion.p>
    </li>
  );
}
