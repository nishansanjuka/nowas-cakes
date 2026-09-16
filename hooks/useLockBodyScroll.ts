"use client";

import { useEffect } from "react";
import { pauseScroll, resumeScroll } from "@/lib/lenis";

/** Holds the page still while an overlay is open, then hands scrolling back. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    pauseScroll();
    return () => {
      body.style.overflow = previous;
      resumeScroll();
    };
  }, [locked]);
}
