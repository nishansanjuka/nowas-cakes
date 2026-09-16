"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { rise } from "@/lib/motion";

interface BrandIntroProps {
  baker: string;
  intro: string;
  philosophy: string;
  portrait: { src: string; alt: string };
}

export function BrandIntro({ baker, intro, philosophy, portrait }: BrandIntroProps) {
  return (
    <section className="relative z-20 mx-auto w-full max-w-[86rem] bg-cream px-gutter py-section-sm md:px-10 md:py-section">
      <motion.div
        variants={rise}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-15%" }}
        className="grid items-start gap-12 md:grid-cols-[1.25fr_0.75fr] md:gap-20"
      >
        <div>
          <h2 className="max-w-[18ch] font-display text-title">{intro}</h2>
          <p className="mt-8 max-w-[58ch] text-lead text-ink-soft">{philosophy}</p>
          <ButtonLink href="/about" variant="secondary" className="mt-9">
            {`More about ${baker.split(" ")[0]}`}
          </ButtonLink>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-plate bg-sand md:mt-3">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="(max-width: 768px) 92vw, 28vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
