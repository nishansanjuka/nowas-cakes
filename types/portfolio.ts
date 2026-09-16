export type PortfolioAspect = "tall" | "square" | "wide";

export interface PortfolioItem {
  id: string;
  title: string;
  categoryId: string;
  year: number;
  place: string;
  /** One sentence on what the piece was and how it was made. */
  story: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  aspect: PortfolioAspect;
}
