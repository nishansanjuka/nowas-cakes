"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

/**
 * True when the visitor asked for reduced motion. The scroll sequences swap to
 * static images rather than simply running faster.
 *
 * Read through useSyncExternalStore so the hook count is identical on the
 * server and on the client: a media query hook that skips work during server
 * rendering desynchronises the hook order of every component above it.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
