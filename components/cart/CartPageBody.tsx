"use client";

import { AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";
import { ButtonLink } from "@/components/ui/Button";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

const DELIVERY_NOTE =
  "Delivery and collection are agreed by email once the order is placed. Nothing is charged here.";

export function CartPageBody() {
  const { lines, subtotal, currency, removeLine, setQuantity, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="max-w-[46ch]">
        <p className="font-display text-heading leading-tight">Nothing in the cart yet.</p>
        <p className="mt-4 text-lead text-ink-soft">
          Cakes are baked to order, so nothing sits waiting on a shelf. Pick one and Nowa will start it.
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Browse the cakes
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
      <ul className="divide-y divide-ink-line">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <CartItem
              key={line.lineId}
              line={line}
              onQuantityChange={setQuantity}
              onRemove={removeLine}
            />
          ))}
        </AnimatePresence>
      </ul>

      <aside className="flex h-fit flex-col gap-6 rounded-plate bg-sand p-8">
        <CartSummary subtotal={subtotal} currency={currency} deliveryNote={DELIVERY_NOTE} />
        <ButtonLink href="/checkout" className="w-full">
          Go to checkout
        </ButtonLink>
        <button
          type="button"
          onClick={clear}
          className="-ml-3 inline-flex min-h-11 items-center self-start px-3 text-caption tracking-normal text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-blush-deep"
        >
          Empty the cart
        </button>
      </aside>
    </div>
  );
}
