"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { CakeLayer as CakeLayerData } from "@/types";
import { contactShadow } from "@/lib/motion";
import { mapRange } from "@/lib/utils";
import { CakeLayerStack } from "../CakeLayerStack";

interface Props {
  layers: CakeLayerData[];
  cutouts: Record<string, boolean>;
  /** The finished cake the stage opens on. Null when the file is not there. */
  still: { src: string; alt: string } | null;
  flow: MotionValue<number>;
  /** How much of the cake is on the plate, zero to one. */
  placed: MotionValue<number>;
  stillOpacity: MotionValue<number>;
  stillLift: MotionValue<number>;
  stackOpacity: MotionValue<number>;
}

/**
 * The contained stage. It opens on the finished cake, and as the section starts
 * to move that photograph rises away and hands the square over to the diagram
 * being built underneath it: a plate, the stack that grows on it, and the
 * contact shadow between the two. Nothing ever leaves the square.
 */
export function AssemblyStage({
  layers,
  cutouts,
  still,
  flow,
  placed,
  stillOpacity,
  stillLift,
  stackOpacity,
}: Props) {
  const { from, to } = contactShadow;
  // The drawn shadow belongs to the drawn cake, so it arrives with it rather
  // than sitting under the photograph, which carries a shadow of its own.
  const shadowOpacity = useTransform(
    [placed, stackOpacity] as MotionValue<number>[],
    ([value, shown]: number[]) => mapRange(value, 0, 1, from.opacity, to.opacity) * shown,
  );
  const shadowSpread = useTransform(placed, (value) =>
    mapRange(value, 0, 1, from.spread, to.spread),
  );

  // The stage is square and lives inside a panel one viewport tall, so its size
  // is bounded by the height as well as the width. Without the svh term a short
  // window, a phone held sideways above all, pushes the words off the bottom.
  //
  // Inside it, the side padding sets the stack's width and the stack's height
  // follows from it through the layer aspect ratios. Those two keep the finished
  // cake clear of the stage's own edges at every size.
  return (
    <div className="aspect-square w-[min(52vw,34svh,20rem)] xl:w-[min(42vw,62svh,32.5rem)]">
      <div className="@container relative flex h-full w-full flex-col justify-end overflow-hidden rounded-plate bg-sand px-[16%] pb-[13%] ring-1 ring-ink-line/60 ring-inset">
        <motion.div className="relative z-10" style={{ opacity: stackOpacity }}>
          <CakeLayerStack layers={layers} cutouts={cutouts} flow={flow} />
        </motion.div>

        <span
          aria-hidden="true"
          className="absolute inset-x-[10%] bottom-[9%] z-0 h-[1.5%] rounded-pill bg-cream ring-1 ring-ink-line/70 ring-inset"
        />

        <motion.span
          aria-hidden="true"
          className="absolute inset-x-[14%] bottom-[10.5%] z-[1] h-[3.5%] rounded-pill bg-ink blur-contact"
          style={{ opacity: shadowOpacity, scaleX: shadowSpread }}
        />

        {still ? (
          <motion.div
            className="absolute inset-0 z-20"
            style={{ opacity: stillOpacity, y: stillLift }}
          >
            <Image src={still.src} alt={still.alt} fill priority className="object-contain" />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
