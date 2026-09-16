"use client";

import type { MotionValue } from "motion/react";
import type { CakeLayer as CakeLayerData } from "@/types";
import { CakeLayer } from "../CakeLayer";

interface Props {
  layers: CakeLayerData[];
  /** Which layer ids have a cutout file behind them. */
  cutouts: Record<string, boolean>;
  flow: MotionValue<number>;
}

/**
 * The stack itself, drawn from the plate upwards. Widths are shares of the
 * widest layer, so the silhouette comes from the data rather than from numbers
 * written into the markup.
 */
export function CakeLayerStack({ layers, cutouts, flow }: Props) {
  const maxWidth = Math.max(...layers.map((layer) => layer.image.width));
  const topDown = [...layers].sort((a, b) => b.order - a.order);

  return (
    <ul className="relative z-10 flex flex-col items-center">
      {topDown.map((layer) => (
        <CakeLayer
          key={layer.id}
          layer={layer}
          hasCutout={cutouts[layer.id] === true}
          maxWidth={maxWidth}
          flow={flow}
        />
      ))}
    </ul>
  );
}
