import Link from "next/link";
import type { Product } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";

interface FeaturedProductsProps {
  products: Product[];
  heading: string;
}

/**
 * Four cakes in an asymmetric grid. Deliberately not a row of equal cards: the
 * first plate is larger and the column beneath it is offset.
 */
export function FeaturedProducts({ products, heading }: FeaturedProductsProps) {
  const [lead, ...rest] = products;
  if (!lead) return null;

  return (
    <section className="mx-auto w-full max-w-[86rem] px-gutter py-section-sm md:px-10 md:py-section">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="max-w-[16ch] font-display text-title">{heading}</h2>
        <Link
          href="/shop"
          className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
        >
          All eight cakes
        </Link>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <ProductCard product={lead} aspect="wide" sizes="(max-width: 768px) 92vw, 54vw" priority />
        </div>
        {rest[0] ? (
          <div className="md:col-span-4 md:col-start-9 md:pt-24">
            <ProductCard product={rest[0]} aspect="tall" sizes="(max-width: 768px) 92vw, 30vw" />
          </div>
        ) : null}
        {rest[1] ? (
          <div className="md:col-span-4 md:col-start-2 md:-mt-16">
            <ProductCard product={rest[1]} aspect="tall" sizes="(max-width: 768px) 92vw, 30vw" />
          </div>
        ) : null}
        {rest[2] ? (
          <div className="md:col-span-5 md:col-start-7 md:pt-20">
            <ProductCard product={rest[2]} aspect="square" sizes="(max-width: 768px) 92vw, 38vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
