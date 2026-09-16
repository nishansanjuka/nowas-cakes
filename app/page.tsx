import { existsSync } from "node:fs";
import { join } from "node:path";
import brandData from "@/data/brand.json";
import productsData from "@/data/products.json";
import portfolioData from "@/data/portfolio.json";
import reviewsData from "@/data/reviews.json";
import layersData from "@/data/cake-layers.json";
import type { Brand, CakeLayer, PortfolioItem, Product, Review } from "@/types";
import {
  BrandIntro,
  ClosingInvitation,
  FeaturedProducts,
  HeroAssembly,
  PortfolioPreview,
} from "@/components/landing";
import { ReviewMarquee } from "@/components/reviews";

const brand = brandData as Brand;
const products = productsData as Product[];
const portfolio = portfolioData as PortfolioItem[];
const reviews = reviewsData as Review[];
const layers = (layersData as CakeLayer[]).slice().sort((a, b) => a.order - b.order);

const featured = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
const preview = portfolio.slice(0, 6);

// The files currently under public/layers are opaque crops of different cakes
// rather than transparent cutouts, so they stack as separate discs instead of
// composing into one. Until real cutouts land the stage draws its own neutral
// blocks, which do read as a cake. Flip this back to true once they do.
const USE_CUTOUTS = false;

const onDisk = (src: string) => existsSync(join(process.cwd(), "public", src));

// Which cutouts are actually on disk. Asking here keeps a missing file a design
// decision the stage can draw around, rather than a broken request at runtime.
const cutouts: Record<string, boolean> = Object.fromEntries(
  layers.map((layer) => [layer.id, USE_CUTOUTS && onDisk(layer.image.src)]),
);

// The stage opens on the finished cake and hands over to the diagram. Without
// the photograph it simply opens on the diagram instead.
const still = onDisk(brand.heroImage.src) ? brand.heroImage : null;

export default function LandingPage() {
  return (
    <>
      <HeroAssembly
        layers={layers}
        cutouts={cutouts}
        still={still}
        copy={{
          headline: brand.heroHeadline,
          subtext: brand.heroSubtext,
          closing: "One cake, built the same way every time.",
          ctaHref: "/shop",
          heroCtaLabel: "Browse the cakes",
          closingCtaLabel: "Order your cake",
        }}
      />

      <BrandIntro
        baker={brand.baker}
        intro={brand.intro}
        philosophy={brand.philosophy}
        portrait={brand.portrait}
      />

      <FeaturedProducts products={featured} heading="On the shelf this month" />

      <PortfolioPreview
        items={preview}
        heading="Cakes that have already left the kitchen"
        body="Twelve pieces from the last two years, each one made for a specific table on a specific day."
      />

      <section className="py-section-sm md:py-section">
        <div className="mx-auto w-full max-w-[86rem] px-gutter md:px-10">
          <h2 className="max-w-[16ch] font-display text-title">What people said afterwards</h2>
        </div>
        <div className="mt-14">
          <ReviewMarquee reviews={reviews} />
        </div>
      </section>

      <ClosingInvitation
        heading="Tell Nowa what the day is for."
        body="Custom orders begin with a conversation about the occasion, the number of people, and what everyone actually likes to eat. Ready cakes need four days, tiered cakes need ten."
        email={brand.contact.email}
      />
    </>
  );
}
