"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { spring, transition } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** A panel that arrives from the right. The only drawer in the system. */
export function Drawer({ open, onClose, title, children, footer }: DrawerProps) {
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
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label={`Close ${title.toLowerCase()}`}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/22"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-cream shadow-drawer outline-none"
            initial={{ x: reduced ? 0 : "100%", opacity: reduced ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduced ? 0 : "100%", opacity: reduced ? 0 : 1 }}
            transition={reduced ? transition.fast : spring.settle}
          >
            <header className="flex items-center justify-between px-6 pb-4 pt-7">
              <h2 className="font-display text-panel leading-none">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="-mr-3 inline-flex min-h-11 items-center rounded-control px-3 text-caption uppercase tracking-[0.12em] text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink"
              >
                Close
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6">{children}</div>
            {footer ? <div className="px-6 pb-7 pt-5">{footer}</div> : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
