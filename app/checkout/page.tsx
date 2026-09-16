import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CheckoutPanel } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Tell Nowa what the day is for. Nothing is charged on this site.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        title="Tell Nowa what the day is for."
        lead="Orders are confirmed by email rather than taken automatically, so the date and the details are agreed with a person."
      />
      <section className="mx-auto w-full max-w-[86rem] px-gutter pb-section-sm md:px-10 md:pb-section">
        <CheckoutPanel />
      </section>
    </>
  );
}
