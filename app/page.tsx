import brandData from "@/data/brand.json";
import productsData from "@/data/products.json";
import portfolioData from "@/data/portfolio.json";
import reviewsData from "@/data/reviews.json";
import sequenceData from "@/data/baking-sequence.json";
import type { BakingSequence, Brand, PortfolioItem, Product, Review } from "@/types";
import {
  BakingSequence as BakingSequenceSection,
  BrandIntro,
  ClosingInvitation,
  FeaturedProducts,
  HeroScaleCake,
  PortfolioPreview,
} from "@/components/landing";
import { ReviewMarquee } from "@/components/reviews";

const brand = brandData as Brand;
const products = productsData as Product[];
const portfolio = portfolioData as PortfolioItem[];
const reviews = reviewsData as Review[];
const sequence = sequenceData as BakingSequence;

const featured = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
const preview = portfolio.slice(0, 6);

export default function LandingPage() {
  return (
    <>
      <HeroScaleCake
        headline={brand.heroHeadline}
        subtext={brand.heroSubtext}
        image={brand.heroImage}
        handoffFrame={sequence.frames[0]}
        ctaHref="/shop"
        ctaLabel="Browse the cakes"
      />

      <BakingSequenceSection sequence={sequence} />

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
