"use client";

import Image from "next/image";
import { useRef } from "react";
import type { MotionValue } from "motion/react";
import type { BakingSequence } from "@/types";
import { useImageSequence } from "@/hooks/useImageSequence";

interface SequenceCanvasProps {
  sequence: BakingSequence;
  progress: MotionValue<number>;
  /** When true the sequence is replaced by one still image. */
  reduced: boolean;
}

/**
 * The frames, stacked like a continuous take and painted one per animation
 * frame. Nothing here writes React state while scrolling.
 */
export function SequenceCanvas({ sequence, progress, reduced }: SequenceCanvasProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { ready } = useImageSequence(canvas, progress, {
    frames: sequence.frames,
    fallbackColor: sequence.fallbackColor,
    frameWidth: sequence.frameWidth,
    frameHeight: sequence.frameHeight,
    enabled: !reduced,
  });

  if (reduced) {
    return (
      <Image
        src={sequence.fallbackImage.src}
        alt={sequence.fallbackImage.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: sequence.fallbackColor }}
      />
      <canvas
        ref={canvas}
        width={sequence.frameWidth}
        height={sequence.frameHeight}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-out-soft)]"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </>
  );
}
