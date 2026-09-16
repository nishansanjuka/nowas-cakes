export interface Review {
  id: string;
  name: string;
  avatar: {
    src: string;
    alt: string;
  };
  /** Whole stars, one through five. */
  rating: number;
  cakeOrdered: string;
  occasion: string;
  text: string;
  date: string;
}
