"use client";

import type { ReactNode } from "react";
import { motion, type MotionValue } from "motion/react";

interface Props {
  closing: string;
  opacity: MotionValue<number>;
  hidden: boolean;
  children: ReactNode;
}

/** What the column says once the cake is whole. */
export function ClosingNote({ closing, opacity, hidden, children }: Props) {
  return (
    <motion.div
      className="col-start-1 row-start-1"
      style={{ opacity }}
      inert={hidden}
      aria-hidden={hidden}
    >
      <p className="max-w-[20ch] font-display text-title">{closing}</p>
      {children}
    </motion.div>
  );
}
