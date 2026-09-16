"use client";

import { AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

const DELIVERY_NOTE = "Delivery and collection are agreed by email once the order is placed.";

export function CartDrawer() {
  const { lines, isOpen, closeCart, subtotal, currency, removeLine, setQuantity } = useCart();

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title="Your cart"
      footer={
        lines.length > 0 ? (
          <div className="flex flex-col gap-5">
            <CartSummary subtotal={subtotal} currency={currency} deliveryNote={DELIVERY_NOTE} />
            <div className="flex flex-col gap-2">
              <ButtonLink href="/checkout" onClick={closeCart} className="w-full">
                Go to checkout
              </ButtonLink>
              <ButtonLink href="/cart" variant="quiet" size="sm" onClick={closeCart} className="w-full">
                View the full cart
              </ButtonLink>
            </div>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col justify-center gap-4 pb-16">
          <p className="font-display text-heading leading-tight">Nothing in here yet.</p>
          <p className="text-body text-ink-soft">
            Cakes are baked to order, so nothing is waiting on a shelf. Pick one and Nowa will start it.
          </p>
          <ButtonLink href="/shop" onClick={closeCart} variant="secondary" className="mt-2 self-start">
            Browse the cakes
          </ButtonLink>
        </div>
      ) : (
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
      )}
    </Drawer>
  );
}
