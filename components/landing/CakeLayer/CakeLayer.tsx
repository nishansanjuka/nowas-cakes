"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { CakeLayer as CakeLayerData } from "@/types";
import { layerEntry } from "@/lib/motion";
import { clamp, cx } from "@/lib/utils";

interface Props {
  layer: CakeLayerData;
  /** Whether the cutout file exists. Answered on the server, before any request. */
  hasCutout: boolean;
  /** Widest layer in the set, so every width is a share of the same stack. */
  maxWidth: number;
  /** Shared placement position. This layer reads its own slice out of it. */
  flow: MotionValue<number>;
}

/**
 * One element of the cake. Its arrival is a slice of the shared flow, already
 * eased, so nothing here schedules an animation of its own. Only transform and
 * opacity move.
 */
export function CakeLayer({ layer, hasCutout, maxWidth, flow }: Props) {
  // The server already said whether the file is there; onError covers the rest.
  const [failed, setFailed] = useState(false);
  const missing = !hasCutout || failed;

  // Layer zero is on the plate before the section moves, so it is always whole.
  const entered = useTransform(flow, (value) =>
    layer.order === 0 ? 1 : clamp(value - (layer.order - 1), 0, 1),
  );
  const y = useTransform(entered, (value) => (1 - value) * layerEntry.y);
  const scale = useTransform(
    entered,
    (value) => layerEntry.scale + (1 - layerEntry.scale) * value,
  );

  return (
    <motion.li
      className="relative"
      style={{
        width: `${(layer.image.width / maxWidth) * 100}%`,
        aspectRatio: `${layer.image.width} / ${layer.image.height}`,
        opacity: entered,
        y,
        scale,
        transformOrigin: layerEntry.origin,
      }}
    >
      {missing ? (
        // Without a cutout the layer is drawn rather than photographed, and it
        // says what it is made of. The stack then reads as a cross section of
        // the cake instead of a pile of blank blocks.
        <div
          className={cx(
            "flex h-full w-full items-center justify-center overflow-hidden rounded-plate px-[3%] ring-1 ring-ink-line/70 ring-inset",
            // Two neutral tones, both of them off the stage's own tone, so a
            // placed layer never reads as a gap in the stack.
            layer.order % 2 === 0 ? "bg-shell" : "bg-cream",
          )}
        >
          <span className="truncate text-layer uppercase text-ink-soft">{layer.material}</span>
        </div>
      ) : (
        <Image
          src={layer.image.src}
          alt={layer.image.alt}
          width={layer.image.width}
          height={layer.image.height}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
          priority={layer.order === 0}
        />
      )}
    </motion.li>
  );
}
