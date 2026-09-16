"use client";

import { useTransform, type MotionValue } from "motion/react";
import { curve } from "@/lib/motion";
import { clamp, mapRange } from "@/lib/utils";

/** Lead in before the first layer is placed, and tail after the last one. */
const INTRO = 0.1;
const OUTRO = 0.18;
/** Share of a layer's band spent arriving. The rest is a beat of stillness. */
const FILL = 0.62;

export interface AssemblyProgress {
  /** Continuous placement position, zero to the number of arriving layers. */
  flow: MotionValue<number>;
  /** Index of the layer being placed, for the list and its caption. */
  activeStep: MotionValue<number>;
  /** How much of the cake is on the plate, zero to one. */
  placed: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  stepsOpacity: MotionValue<number>;
  closingOpacity: MotionValue<number>;
  /** Scale for the vertical progress line, anchored at its top. */
  lineFill: MotionValue<number>;
  /** The finished cake photograph the stage opens on, and its lift as it goes. */
  stillOpacity: MotionValue<number>;
  stillLift: MotionValue<number>;
  /** The drawn stack underneath it, which takes the stage over. */
  stackOpacity: MotionValue<number>;
}

/** How far the opening photograph rises as it leaves, in pixels. */
const STILL_LIFT = 28;

/**
 * Turns one scroll progress value into everything the assembly needs. Every
 * output is a motion value, so React state is never written while scrolling.
 * Each layer takes its own slice out of `flow`, already eased, rather than
 * running an animation of its own.
 */
export function useAssemblyProgress(
  progress: MotionValue<number>,
  layerCount: number,
): AssemblyProgress {
  const arriving = Math.max(layerCount - 1, 1);
  const band = (1 - INTRO - OUTRO) / arriving;

  const flow = useTransform(progress, (p) => {
    const u = clamp((p - INTRO) / band, 0, arriving);
    const index = Math.min(Math.floor(u), arriving - 1);
    return index + curve.out(clamp((u - index) / FILL, 0, 1));
  });

  return {
    flow,
    activeStep: useTransform(progress, (p) =>
      p < INTRO ? 0 : Math.min(Math.floor((p - INTRO) / band) + 1, layerCount - 1),
    ),
    placed: useTransform(flow, (value) => value / arriving),
    heroOpacity: useTransform(progress, (p) => 1 - mapRange(p, 0.02, 0.11, 0, 1)),
    stepsOpacity: useTransform(
      progress,
      (p) => mapRange(p, 0.07, 0.16, 0, 1) * (1 - mapRange(p, 0.85, 0.93, 0, 1)),
    ),
    closingOpacity: useTransform(progress, (p) => mapRange(p, 0.88, 0.97, 0, 1)),
    lineFill: useTransform(progress, (p) => mapRange(p, INTRO, 1 - OUTRO, 0, 1)),
    // The photograph leaves and the diagram arrives in the same breath as the
    // headline becoming the step list. Once the last layer is on, the diagram
    // goes and the photograph rises back into the stage, so the section closes
    // on the same cake it opened with, now explained.
    stillOpacity: useTransform(progress, (p) =>
      Math.max(1 - mapRange(p, 0.015, 0.085, 0, 1), mapRange(p, 0.86, 0.94, 0, 1)),
    ),
    stillLift: useTransform(progress, (p) =>
      p < 0.5
        ? -mapRange(p, 0.015, 0.085, 0, STILL_LIFT)
        : STILL_LIFT - mapRange(p, 0.86, 0.94, 0, STILL_LIFT),
    ),
    stackOpacity: useTransform(
      progress,
      (p) => mapRange(p, 0.04, 0.115, 0, 1) * (1 - mapRange(p, 0.87, 0.945, 0, 1)),
    ),
  };
}

/** Where the text column is, for the attributes that cannot read a motion value. */
export type AssemblyPhase = "hero" | "steps" | "closing";

export function assemblyPhaseFor(p: number): AssemblyPhase {
  if (p < 0.12) return "hero";
  if (p < 0.9) return "steps";
  return "closing";
}
