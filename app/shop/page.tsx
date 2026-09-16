import type { Metadata } from "next";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { CategoryData, Product } from "@/types";
import { PageHeader } from "@/components/PageHeader";
import { ShopBrowser } from "@/components/shop";

const products = productsData as Product[];
const categories = (categoriesData as CategoryData).shop;

export const metadata: Metadata = {
  title: "Shop",
  description: "Eight cakes baked to order, one at a time, in a small studio kitchen.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Eight cakes, baked one at a time."
        lead="Everything here is made to order in the studio kitchen. Pick a size and a flavour, and Nowa will confirm the date by email."
      />
      <section className="mx-auto w-full max-w-[86rem] px-gutter pb-section-sm md:px-10 md:pb-section">
        <ShopBrowser products={products} categories={categories} />
      </section>
    </>
  );
}
