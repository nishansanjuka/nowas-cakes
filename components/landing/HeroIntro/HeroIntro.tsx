"use client";

import { motion, type MotionValue } from "motion/react";
import { ButtonLink } from "@/components/ui";

interface Props {
  headline: string;
  subtext: string;
  ctaHref: string;
  ctaLabel: string;
  opacity: MotionValue<number>;
  /** Off screen readers and off the tab order once it has faded out. */
  hidden: boolean;
}

/** The state the section loads in. Headline, one line of subtext, one CTA. */
export function HeroIntro({ headline, subtext, ctaHref, ctaLabel, opacity, hidden }: Props) {
  return (
    <motion.div
      className="col-start-1 row-start-1"
      style={{ opacity }}
      inert={hidden}
      aria-hidden={hidden}
    >
      <h1 className="font-display text-display xl:max-w-[20ch]">{headline}</h1>
      <p className="mt-5 max-w-[38ch] text-lead text-ink-soft md:mt-6">{subtext}</p>
      <ButtonLink href={ctaHref} className="mt-7 md:mt-9">
        {ctaLabel}
      </ButtonLink>
    </motion.div>
  );
}
