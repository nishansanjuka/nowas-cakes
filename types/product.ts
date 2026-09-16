export interface Category {
  id: string;
  name: string;
  blurb: string;
}

export interface CategoryData {
  shop: Category[];
  portfolio: Category[];
}

export interface ProductOption {
  id: string;
  label: string;
  /** Added to the base price. Zero for the default choice. */
  priceDelta: number;
  note?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  tagline: string;
  description: string;
  basePrice: number;
  currency: string;
  servesFrom: number;
  servesTo: number;
  leadTimeDays: number;
  images: ProductImage[];
  sizes: ProductOption[];
  flavors: ProductOption[];
  /** Used by the shop sort control. Higher means it sells more often. */
  popularity: number;
  addedOn: string;
}

export type SortKey = "featured" | "priceLow" | "priceHigh" | "newest";

export interface CartLine {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: ProductImage;
  sizeId: string;
  sizeLabel: string;
  flavorId: string;
  flavorLabel: string;
  unitPrice: number;
  currency: string;
  quantity: number;
}
