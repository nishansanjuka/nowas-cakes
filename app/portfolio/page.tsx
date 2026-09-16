import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json";
import categoriesData from "@/data/categories.json";
import type { CategoryData, PortfolioItem } from "@/types";
import { PageHeader } from "@/components/PageHeader";
import { PortfolioGrid } from "@/components/portfolio";

const items = portfolioData as PortfolioItem[];
const categories = (categoriesData as CategoryData).portfolio;

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Twelve cakes from the last two years, each made for one table on one day.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Work that has already left the kitchen."
        lead="Twelve pieces from the last two years. Every one was made for a particular table, and most of them began as a conversation rather than an order."
      />
      <section className="mx-auto w-full max-w-[86rem] px-gutter pb-section-sm md:px-10 md:pb-section">
        <PortfolioGrid items={items} categories={categories} />
      </section>
    </>
  );
}
