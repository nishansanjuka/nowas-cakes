import Link from "next/link";
import type { Brand } from "@/types";
import { navLinks } from "./navLinks";

export function Footer({ brand }: { brand: Brand }) {
  return (
    <footer className="bg-sand">
      <div className="mx-auto w-full max-w-[86rem] px-gutter py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div className="max-w-[34ch]">
            <p className="font-display text-heading leading-tight">{brand.tagline}</p>
            <p className="mt-5 text-body text-ink-soft">{brand.contact.studio}</p>
            <p className="text-body text-ink-soft">{brand.contact.hours}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
            >
              Cart
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${brand.contact.email}`}
              className="text-body text-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-70"
            >
              {brand.contact.email}
            </a>
            <a
              href={`tel:${brand.contact.phone.replace(/\s/g, "")}`}
              className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
            >
              {brand.contact.phone}
            </a>
            {brand.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
              >
                {social.label}, {social.handle}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-16 text-caption tracking-[0.1em] text-ink-soft">
          {brand.name}, baked by {brand.baker}. Sample site, placeholder content.
        </p>
      </div>
    </footer>
  );
}
