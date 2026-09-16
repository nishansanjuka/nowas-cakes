"use client";

import { motion, type MotionValue } from "motion/react";
import type { CakeLayer } from "@/types";
import { StepProgress } from "../StepProgress";
import { StepItem } from "./StepItem";

interface Props {
  layers: CakeLayer[];
  activeStep: MotionValue<number>;
  opacity: MotionValue<number>;
  fill: MotionValue<number>;
  hidden: boolean;
  /** True renders the plain list: every step at rest, no progress line. */
  settled?: boolean;
}

/** What the headline becomes once the cake starts going together. */
export function StepList({ layers, activeStep, opacity, fill, hidden, settled = false }: Props) {
  return (
    <motion.div
      className="col-start-1 row-start-1 flex gap-6"
      style={settled ? undefined : { opacity }}
      inert={hidden}
      aria-hidden={hidden}
    >
      {settled ? <div aria-hidden="true" className="w-px bg-ink-line" /> : <StepProgress fill={fill} />}
      <ol className="flex flex-col gap-3 md:gap-5">
        {layers.map((layer) => (
          <StepItem key={layer.id} layer={layer} activeStep={activeStep} settled={settled} />
        ))}
      </ol>
    </motion.div>
  );
}
