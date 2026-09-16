"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { clamp } from "@/lib/utils";

interface Options {
  frames: string[];
  fallbackColor: string;
  frameWidth: number;
  frameHeight: number;
  /** Skip all loading and drawing when motion is reduced. */
  enabled: boolean;
}

/**
 * Preloads the sequence and paints one frame per animation frame, driven by a
 * scroll motion value. React state is never written per frame.
 */
export function useImageSequence(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  progress: MotionValue<number>,
  { frames, fallbackColor, frameWidth, frameHeight, enabled }: Options,
) {
  const images = useRef<HTMLImageElement[]>([]);
  const target = useRef(0);
  const painted = useRef(-1);
  const raf = useRef(0);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let live = true;
    let count = 0;
    images.current = frames.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      const done = () => {
        if (!live) return;
        count += 1;
        setLoaded(count);
      };
      img.onload = done;
      img.onerror = done;
      return img;
    });
    return () => {
      live = false;
      images.current = [];
    };
  }, [frames, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const paint = () => {
      raf.current = 0;
      const index = target.current;
      if (index === painted.current) return;
      const img = images.current[index];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, frameWidth, frameHeight);
      } else {
        ctx.fillStyle = fallbackColor;
        ctx.fillRect(0, 0, frameWidth, frameHeight);
      }
      painted.current = index;
    };

    const schedule = () => {
      if (raf.current === 0) raf.current = requestAnimationFrame(paint);
    };

    const unsubscribe = progress.on("change", (value) => {
      target.current = Math.round(clamp(value, 0, 1) * (frames.length - 1));
      schedule();
    });

    schedule();
    return () => {
      unsubscribe();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
      painted.current = -1;
    };
  }, [canvasRef, progress, frames.length, fallbackColor, frameWidth, frameHeight, enabled, loaded]);

  useMotionValueEvent(progress, "animationStart", () => {
    painted.current = -1;
  });

  return { loaded, total: frames.length, ready: loaded >= Math.min(8, frames.length) };
}
