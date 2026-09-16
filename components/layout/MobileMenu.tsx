"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { transition } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { NavLink } from "./navLinks";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  tagline: string;
}

export function MobileMenu({ open, onClose, links, tagline }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useFocusTrap(panel, open);
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          className="fixed inset-0 z-40 flex flex-col bg-cream px-6 outline-none md:hidden"
          initial={{ opacity: 0, y: reduced ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
          transition={transition.base}
        >
          <div className="flex h-nav items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-control px-2 py-1 text-caption uppercase tracking-[0.12em] text-ink-soft"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col gap-1 pt-6">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition.slow, delay: reduced ? 0 : 0.04 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 font-display text-title leading-none"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <p className="mt-auto pb-10 pt-12 text-body text-ink-soft">{tagline}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
