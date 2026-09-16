import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CartPageBody } from "@/components/cart/CartPageBody";

export const metadata: Metadata = {
  title: "Cart",
  description: "What you have chosen so far. Nothing is charged on this site.",
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your cart" />
      <section className="mx-auto w-full max-w-[86rem] px-gutter pb-section-sm md:px-10 md:pb-section">
        <CartPageBody />
      </section>
    </>
  );
}
