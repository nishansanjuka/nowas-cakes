"use client";

import { motion, type MotionValue } from "motion/react";

interface Props {
  fill: MotionValue<number>;
}

/** The hairline beside the step list. Scales from its top, transform only. */
export function StepProgress({ fill }: Props) {
  return (
    <div aria-hidden="true" className="relative w-px bg-ink-line">
      <motion.span className="absolute inset-0 block origin-top bg-ink" style={{ scaleY: fill }} />
    </div>
  );
}
