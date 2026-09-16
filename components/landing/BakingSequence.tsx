"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import type { BakingSequence as Sequence } from "@/types";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SequenceCanvas } from "./SequenceCanvas";
import { SequenceCaption } from "./SequenceCaption";

/**
 * The second movement. The filled frame from the hero cross fades into the
 * bake, which is scrubbed frame by frame, then scrolling is handed back.
 */
export function BakingSequence({ sequence }: { sequence: Sequence }) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const progress = useScrollProgress(section, ["start start", "end end"]);
  // The section is pulled up over the hero's last screen so the two sticky
  // panels swap without a gap. It stays hidden until the moment it pins, which
  // is the moment the hero is showing this sequence's own first frame.
  const entry = useScrollProgress(section, ["start end", "start start"]);
  // A hard step rather than a fade: at the moment this pins, the hero above is
  // already showing this sequence's own first frame, so the swap is invisible.
  // Function form also keeps the value off Motion's scroll linked WAAPI path.
  const panelOpacity = useTransform(entry, (v) => (v >= 0.999 ? 1 : 0));

  if (reduced) {
    return (
      <section ref={section} aria-label="How a cake is made" className="relative bg-sand">
        <div className="relative h-[70svh] w-full overflow-hidden">
          <SequenceCanvas sequence={sequence} progress={progress} reduced />
        </div>
        <ol className="mx-auto grid w-full max-w-[86rem] gap-8 px-gutter py-16 md:grid-cols-2 md:px-10">
          {sequence.steps.map((step, i) => (
            <li key={step.id} className="max-w-[46ch]">
              <p className="text-caption uppercase tracking-[0.14em] text-blush-deep">
                {`Step ${i + 1}, ${step.label}`}
              </p>
              <p className="mt-2 text-lead text-ink">{step.caption}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={section}
      aria-label="How a cake is made"
      className="relative z-10 -mt-[100svh] h-[760svh]"
    >
      <motion.div
        style={{ opacity: panelOpacity }}
        className="sticky top-0 h-svh overflow-hidden bg-sand"
      >
        <div className="absolute inset-0">
          <SequenceCanvas sequence={sequence} progress={progress} reduced={false} />
          <SequenceCaption
            steps={sequence.steps}
            frameCount={sequence.frames.length}
            progress={progress}
          />
        </div>
      </motion.div>
    </section>
  );
}
