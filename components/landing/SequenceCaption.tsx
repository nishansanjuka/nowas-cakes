"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, type MotionValue } from "motion/react";
import type { SequenceStep } from "@/types";
import { transition } from "@/lib/motion";
import { clamp } from "@/lib/utils";

interface SequenceCaptionProps {
  steps: SequenceStep[];
  frameCount: number;
  progress: MotionValue<number>;
}

/** One caption per step, fading with the frames that belong to it. */
export function SequenceCaption({ steps, frameCount, progress }: SequenceCaptionProps) {
  const [index, setIndex] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    const frame = Math.round(clamp(value, 0, 1) * (frameCount - 1));
    const next = steps.findIndex((step) => frame >= step.startFrame && frame <= step.endFrame);
    if (next !== -1) setIndex((current) => (current === next ? current : next));
  });

  const step = steps[index];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-gutter pb-12 md:px-10 md:pb-16">
      <div className="mx-auto w-full max-w-[86rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={transition.base}
            className="max-w-[42ch] rounded-plate bg-cream/88 px-6 py-5 backdrop-blur-[6px]"
          >
            <p className="text-caption uppercase tracking-[0.14em] text-blush-deep">{step.label}</p>
            <p className="mt-2 text-lead text-ink">{step.caption}</p>
          </motion.div>
        </AnimatePresence>
        <p className="sr-only" aria-live="polite">
          {`Step ${index + 1} of ${steps.length}, ${step.label}. ${step.caption}`}
        </p>
      </div>
    </div>
  );
}
