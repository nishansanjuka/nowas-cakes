"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { transition } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  /** Rendered beside the close control, for lightbox paging. */
  controls?: ReactNode;
}

/** Centred overlay used for the portfolio lightbox. */
export function Modal({ open, onClose, label, children, controls }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useFocusTrap(panel, open);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <motion.button
            type="button"
            aria-label={`Close ${label.toLowerCase()}`}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className="relative flex max-h-full w-full max-w-5xl flex-col gap-4 outline-none"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.99 }}
            transition={transition.base}
          >
            <div className="flex items-center justify-end gap-4 text-cream">
              {controls}
              <button
                type="button"
                onClick={onClose}
                className="-mr-3 inline-flex min-h-11 items-center rounded-control px-3 text-caption uppercase tracking-[0.12em] transition-opacity duration-[var(--duration-fast)] hover:opacity-70"
              >
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
