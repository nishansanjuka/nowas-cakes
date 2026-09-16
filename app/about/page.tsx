import type { Metadata } from "next";
import brandData from "@/data/brand.json";
import reviewsData from "@/data/reviews.json";
import type { Brand, Review } from "@/types";
import { PageHeader } from "@/components/PageHeader";
import { BrandStory, Portrait } from "@/components/about";
import { ReviewGrid } from "@/components/reviews";
import { ButtonLink } from "@/components/ui/Button";

const brand = brandData as Brand;
const reviews = reviewsData as Review[];

export const metadata: Metadata = {
  title: "About",
  description: "Nowa bakes around six cakes a week, alone, in a studio kitchen with north light.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={brand.intro} />

      <section className="mx-auto w-full max-w-[86rem] px-gutter pb-section-sm md:px-10 md:pb-section">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <BrandStory
            paragraphs={brand.bio}
            philosophy={brand.philosophy}
            philosophyHeading="How I decide a cake is finished"
          />
          <div className="lg:pt-4">
            <Portrait
              src={brand.portrait.src}
              alt={brand.portrait.alt}
              caption={`${brand.baker}, in the studio kitchen. ${brand.contact.hours}.`}
            />
            <div className="mt-10 flex flex-col gap-2">
              <a
                href={`mailto:${brand.contact.email}`}
                className="text-body text-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-70"
              >
                {brand.contact.email}
              </a>
              <p className="text-body text-ink-soft">{brand.contact.studio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-section-sm md:py-section">
        <div className="mx-auto w-full max-w-[86rem] px-gutter md:px-10">
          <h2 className="max-w-[18ch] font-display text-title">
            Six people who ordered a cake, in their own words.
          </h2>
          <div className="mt-14">
            <ReviewGrid reviews={reviews} />
          </div>
          <ButtonLink href="/shop" variant="secondary" className="mt-16">
            Browse the cakes
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
