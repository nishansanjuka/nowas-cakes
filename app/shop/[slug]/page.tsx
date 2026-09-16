import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { ProductGallery, ProductPurchase, ProductCard } from "@/components/shop";
import { Badge } from "@/components/ui/Badge";

const products = productsData as Product[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Cake not found" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <>
      <div className="mx-auto w-full max-w-[86rem] px-gutter pt-[calc(var(--spacing-nav)+2.5rem)] md:px-10 md:pt-[calc(var(--spacing-nav)+4rem)]">
        <Link
          href="/shop"
          className="text-caption uppercase tracking-[0.12em] text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink"
        >
          Back to the shop
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex flex-col gap-10 lg:pt-6">
            <div>
              <h1 className="max-w-[16ch] font-display text-title">{product.name}</h1>
              <p className="mt-4 max-w-[46ch] text-lead text-ink-soft">{product.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <p className="tabular text-body text-ink-soft">
                  {`Serves ${product.servesFrom} to ${product.servesTo}`}
                </p>
                <Badge tone="accent">{`${product.leadTimeDays} days notice`}</Badge>
              </div>
            </div>

            <ProductPurchase product={product} />

            <p className="max-w-[58ch] text-body text-ink-soft">{product.description}</p>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[86rem] px-gutter py-section-sm md:px-10 md:py-section">
        <h2 className="font-display text-heading">While the oven is on</h2>
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            />
          ))}
        </div>
      </section>
    </>
  );
}
