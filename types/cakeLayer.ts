/** One element of the cake, in the order it is put on the plate. */
export interface CakeLayer {
  id: string;
  /** Zero is the layer already on the plate when the section loads. */
  order: number;
  label: string;
  caption: string;
  /** What the layer is made of, set inside the block the stage draws. */
  material: string;
  image: {
    /** Transparent cutout. A missing file falls back to a neutral block. */
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}
