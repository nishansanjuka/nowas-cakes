"use client";

import { useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent } from "motion/react";
import type { CakeLayer } from "@/types";
import { ButtonLink } from "@/components/ui";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  useAssemblyProgress,
  assemblyPhaseFor,
  type AssemblyPhase,
} from "@/hooks/useAssemblyProgress";
import { AssemblyStage } from "../AssemblyStage";
import { HeroIntro } from "../HeroIntro";
import { StepList } from "../StepList";
import { ClosingNote } from "./ClosingNote";

export interface HeroAssemblyCopy {
  headline: string;
  subtext: string;
  closing: string;
  ctaHref: string;
  heroCtaLabel: string;
  closingCtaLabel: string;
}

interface Props {
  layers: CakeLayer[];
  /** Which layer ids have a cutout file behind them. */
  cutouts: Record<string, boolean>;
  /** The finished cake the stage opens on. Null when the file is not there. */
  still: { src: string; alt: string } | null;
  copy: HeroAssemblyCopy;
}

/**
 * The split is asymmetric and arrives late on purpose. Two even columns never
 * leave the headline the width it needs to hold two lines, and below this width
 * the stage and the words are better stacked than squeezed side by side.
 */
const COLUMNS =
  "mx-auto grid w-full max-w-[86rem] grid-cols-1 gap-6 px-gutter xl:grid-cols-[1.15fr_1fr] xl:gap-16 xl:px-10";

/** Under this height a pinned panel cannot hold the stage and the words at once. */
const TOO_SHORT_TO_PIN = "(max-height: 34rem)";

/**
 * Hero and assembly in one pinned section. The cake is composed layer by layer
 * inside a contained stage while the text column moves from headline, to the
 * steps, to a closing line. Nothing goes full screen at any scroll position,
 * and the cake is never swapped for another picture: it is only added to.
 */
export function HeroAssembly({ layers, cutouts, still, copy }: Props) {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const tooShort = useMediaQuery(TOO_SHORT_TO_PIN);
  const settled = reduced || tooShort;
  const progress = useScrollProgress(section);
  const assembly = useAssemblyProgress(progress, layers.length);
  // The finished cake, for the branch that does not scrub.
  const wholeCake = useMotionValue(Math.max(layers.length - 1, 1));
  const fullyPlaced = useMotionValue(1);
  const noStep = useMotionValue(-1);
  const noLift = useMotionValue(0);
  // Settled shows the finished photograph when there is one, and the drawn
  // diagram when there is not. Neither of them moves.
  const settledStill = useMotionValue(still ? 1 : 0);
  const settledStack = useMotionValue(still ? 0 : 1);

  // Three coarse values across the whole section, not a per frame write. They
  // carry only the attributes that cannot read a motion value.
  const [phase, setPhase] = useState<AssemblyPhase>("hero");
  useMotionValueEvent(progress, "change", (value) => {
    const next = assemblyPhaseFor(value);
    setPhase((current) => (current === next ? current : next));
  });

  if (settled) {
    return (
      <section ref={section} className="py-section-sm md:py-section">
        <div className={`${COLUMNS} items-start`}>
          <div className="order-1 flex justify-center xl:order-2 xl:justify-end">
            <AssemblyStage
              layers={layers}
              cutouts={cutouts}
              still={still}
              flow={wholeCake}
              placed={fullyPlaced}
              stillOpacity={settledStill}
              stillLift={noLift}
              stackOpacity={settledStack}
            />
          </div>
          <div className="order-2 xl:order-1">
            <h1 className="font-display text-display xl:max-w-[20ch]">{copy.headline}</h1>
            <p className="mt-6 max-w-[38ch] text-lead text-ink-soft">{copy.subtext}</p>
            <div className="mt-10">
              <StepList
                layers={layers}
                activeStep={noStep}
                opacity={assembly.stepsOpacity}
                fill={assembly.lineFill}
                hidden={false}
                settled
              />
            </div>
            <ButtonLink href={copy.ctaHref} className="mt-9">
              {copy.closingCtaLabel}
            </ButtonLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="h-[320svh] xl:h-[400svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className={`${COLUMNS} items-center pt-nav`}>
          <div className="order-1 flex justify-center xl:order-2 xl:justify-end">
            <AssemblyStage
              layers={layers}
              cutouts={cutouts}
              still={still}
              flow={assembly.flow}
              placed={assembly.placed}
              stillOpacity={assembly.stillOpacity}
              stillLift={assembly.stillLift}
              stackOpacity={assembly.stackOpacity}
            />
          </div>

          <div className="order-2 grid xl:order-1">
            <HeroIntro
              headline={copy.headline}
              subtext={copy.subtext}
              ctaHref={copy.ctaHref}
              ctaLabel={copy.heroCtaLabel}
              opacity={assembly.heroOpacity}
              hidden={phase !== "hero"}
            />
            <StepList
              layers={layers}
              activeStep={assembly.activeStep}
              opacity={assembly.stepsOpacity}
              fill={assembly.lineFill}
              hidden={phase !== "steps"}
            />
            <ClosingNote
              closing={copy.closing}
              opacity={assembly.closingOpacity}
              hidden={phase !== "closing"}
            >
              <ButtonLink href={copy.ctaHref} className="mt-9">
                {copy.closingCtaLabel}
              </ButtonLink>
            </ClosingNote>
          </div>
        </div>
      </div>
    </section>
  );
}
