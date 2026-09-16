import type Lenis from "lenis";

/**
 * The single Lenis instance, held outside React so overlays can pause scrolling
 * without threading a context through every component.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null): void {
  instance = next;
}

export function pauseScroll(): void {
  instance?.stop();
}

export function resumeScroll(): void {
  instance?.start();
}
