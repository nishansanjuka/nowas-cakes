export interface SequenceStep {
  id: string;
  label: string;
  caption: string;
  /** Inclusive frame index where this step begins. */
  startFrame: number;
  /** Inclusive frame index where this step ends. */
  endFrame: number;
}

export interface BakingSequence {
  /** Every frame path in playback order. */
  frames: string[];
  steps: SequenceStep[];
  /** Shown instead of the canvas when motion is reduced. */
  fallbackImage: {
    src: string;
    alt: string;
  };
  /** Painted behind a frame that fails to load. */
  fallbackColor: string;
  frameWidth: number;
  frameHeight: number;
}
