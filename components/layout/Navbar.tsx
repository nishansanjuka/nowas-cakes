"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cx } from "@/lib/utils";
import { transition } from "@/lib/motion";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "./navLinks";

/**
 * One line, 72px tall. Transparent while it sits over the landing hero,
 * cream once the page has moved.
 */
export function Navbar({ brandName, tagline }: { brandName: string; tagline: string }) {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [lifted, setLifted] = useState(!overHero);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = !overHero || value > 40;
    setLifted((current) => (current === next ? current : next));
  });

  return (
    <>
      <motion.header
        className={cx(
          "fixed inset-x-0 top-0 z-30 h-nav",
          "transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-quiet)]",
          lifted ? "bg-cream/92 backdrop-blur-[10px]" : "bg-transparent",
        )}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transition.slow}
      >
        <div className="mx-auto flex h-full w-full max-w-[86rem] items-center gap-6 px-gutter md:px-10">
          <Link href="/" className="font-display text-card leading-none tracking-[-0.02em]">
            {brandName}
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className={cx(
                  "inline-flex min-h-11 items-center text-control transition-opacity duration-[var(--duration-fast)]",
                  pathname.startsWith(link.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={openCart}
            className="ml-auto inline-flex min-h-11 items-center text-control text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink md:ml-0"
          >
            Cart <span className="tabular">({count})</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex min-h-11 items-center text-control text-ink-soft md:hidden"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        tagline={tagline}
      />
    </>
  );
}
