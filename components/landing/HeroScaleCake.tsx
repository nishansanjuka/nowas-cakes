"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScaleOnScroll } from "@/hooks/useScaleOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { transition } from "@/lib/motion";

interface HeroScaleCakeProps {
  headline: string;
  subtext: string;
  image: { src: string; alt: string };
  /** The sequence's opening frame, used to hand over without a cut. */
  handoffFrame: string;
  ctaHref: string;
  ctaLabel: string;
}

/**
 * The first movement. The cake is held at arm's length, then grows with scroll
 * until it is the whole frame, while the words step back.
 */
export function HeroScaleCake({
  headline,
  subtext,
  image,
  handoffFrame,
  ctaHref,
  ctaLabel,
}: HeroScaleCakeProps) {
  const section = useRef<HTMLElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useScrollProgress(section, ["start start", "end end"]);
  const { scale, x, y, copyOpacity, plateOpacity, handoffOpacity, radius } = useScaleOnScroll(
    progress,
    plate,
    !reduced,
  );

  return (
    <section
      ref={section}
      aria-label="Nowa's Cakes"
      className={reduced ? "relative" : "relative h-[240vh]"}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-cream">
        {reduced ? null : (
          <motion.div aria-hidden="true" style={{ opacity: handoffOpacity }} className="absolute inset-0">
            <Image src={handoffFrame} alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
        )}

        <motion.div
          ref={plate}
          style={reduced ? undefined : { scale, x, y, opacity: plateOpacity, borderRadius: radius }}
          className="absolute inset-x-gutter top-[13svh] h-[43svh] overflow-hidden rounded-plate will-change-transform md:inset-x-auto md:right-0 md:top-[16svh] md:h-auto md:bottom-[9svh] md:w-[42vw]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 768px) 92vw, 42vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: copyOpacity }}
          className="relative z-10 mx-auto flex h-full w-full max-w-[86rem] flex-col justify-end px-gutter pb-[7svh] md:justify-center md:px-10 md:pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition.drape, delay: 0.1 }}
            className="font-display text-display leading-[1.06] tracking-[-0.025em] md:max-w-[15ch]"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition.drape, delay: 0.22 }}
            className="mt-5 max-w-[34ch] text-lead text-ink-soft"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition.drape, delay: 0.34 }}
            className="mt-8"
          >
            <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
