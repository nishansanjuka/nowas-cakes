"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useTransform, type MotionValue } from "motion/react";
import { mapRange } from "@/lib/utils";

interface ScaleOnScroll {
  /** Grows the plate until it covers the viewport. */
  scale: MotionValue<number>;
  /** Walks the plate's centre onto the viewport centre as it grows. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Fades the headline, subtext and action as the plate takes over. */
  copyOpacity: MotionValue<number>;
  /** Hands the filled frame over to whatever follows. */
  plateOpacity: MotionValue<number>;
  /** The sequence's first frame, revealed as the cake fades off it. */
  handoffOpacity: MotionValue<number>;
  /** Corners relax as the plate becomes the whole frame. */
  radius: MotionValue<string>;
}

const GROW_END = 0.55;
const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/**
 * Turns one scroll progress value into the hero's whole movement. The target
 * scale and offset are measured from the plate's own untransformed box, so the
 * cake fills the viewport exactly at every breakpoint.
 */
export function useScaleOnScroll(
  progress: MotionValue<number>,
  plateRef: RefObject<HTMLElement | null>,
  enabled = true,
): ScaleOnScroll {
  const targetScale = useMotionValue(1);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  useEffect(() => {
    const node = plateRef.current;
    if (!node || !enabled) return;

    const measure = () => {
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      if (width === 0 || height === 0) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      targetScale.set(Math.max(vw / width, vh / height) * 1.06);
      targetX.set(vw / 2 - (node.offsetLeft + width / 2));
      targetY.set(vh / 2 - (node.offsetTop + height / 2));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [plateRef, enabled, targetScale, targetX, targetY]);

  const t = useTransform(progress, (value) => ease(value / GROW_END));

  return {
    scale: useTransform([t, targetScale], ([p, s]: number[]) => 1 + (s - 1) * p),
    x: useTransform([t, targetX], ([p, dx]: number[]) => dx * p),
    y: useTransform([t, targetY], ([p, dy]: number[]) => dy * p),
    // Opacity is mapped with a function rather than a keyframe range on
    // purpose: a plain range lets Motion promote the value to a scroll linked
    // WAAPI animation, which runs on its own timeline and drifts away from the
    // smoothed scroll position driving everything else on this section.
    copyOpacity: useTransform(progress, (p) => 1 - mapRange(p, 0, 0.22, 0, 1)),
    plateOpacity: useTransform(progress, (p) => 1 - mapRange(p, 0.62, 0.95, 0, 1)),
    handoffOpacity: useTransform(progress, (p) => mapRange(p, 0.62, 0.95, 0, 1)),
    radius: useTransform(progress, (p) => `${14 - mapRange(p, 0, 0.34, 0, 14)}px`),
  };
}
