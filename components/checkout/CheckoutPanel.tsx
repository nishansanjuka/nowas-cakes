"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { CheckoutForm } from "./CheckoutForm";

export function CheckoutPanel() {
  const { lines, subtotal, currency } = useCart();
  const empty = lines.length === 0;

  return (
    <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
      <CheckoutForm disabled={empty} />

      <aside className="flex h-fit flex-col gap-5 rounded-plate bg-sand p-8">
        <h2 className="font-display text-heading">Your order</h2>

        {empty ? (
          <p className="text-body text-ink-soft">
            The cart is empty, so there is nothing to order yet.{" "}
            <Link href="/shop" className="text-blush-deep underline underline-offset-4">
              Pick a cake first
            </Link>
            .
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.lineId} className="flex justify-between gap-4 text-body">
                  <span className="min-w-0">
                    <span className="block">{line.name}</span>
                    <span className="block text-caption tracking-normal text-ink-soft">
                      {line.sizeLabel}, {line.flavorLabel}, {line.quantity} of them
                    </span>
                  </span>
                  <span className="tabular shrink-0">
                    {formatPrice(line.unitPrice * line.quantity, line.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-caption uppercase tracking-[0.12em] text-ink-soft">Subtotal</span>
              <span className="tabular font-display text-panel">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
