"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { OptionSelector } from "./OptionSelector";
import { QuantitySelector } from "./QuantitySelector";

/** Size, flavor, quantity and the add to cart action for one cake. */
export function ProductPurchase({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [flavorId, setFlavorId] = useState(product.flavors[0].id);
  const [quantity, setQuantity] = useState(1);

  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const flavor = product.flavors.find((f) => f.id === flavorId) ?? product.flavors[0];
  const unitPrice = product.basePrice + size.priceDelta + flavor.priceDelta;

  return (
    <div className="flex flex-col gap-8">
      <OptionSelector
        label="Size"
        name="size"
        options={product.sizes}
        value={sizeId}
        onChange={setSizeId}
        currency={product.currency}
      />
      <OptionSelector
        label="Flavour"
        name="flavor"
        options={product.flavors}
        value={flavorId}
        onChange={setFlavorId}
        currency={product.currency}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-caption uppercase tracking-[0.12em] text-ink-soft">Quantity</span>
          <QuantitySelector value={quantity} onChange={setQuantity} label={product.name} />
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <span className="text-caption uppercase tracking-[0.12em] text-ink-soft">Total</span>
          <span className="tabular font-display text-panel">
            {formatPrice(unitPrice * quantity, product.currency)}
          </span>
        </div>

        <Button
          className="w-full"
          onClick={() =>
            addLine({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0],
              sizeId: size.id,
              sizeLabel: size.label,
              flavorId: flavor.id,
              flavorLabel: flavor.label,
              unitPrice,
              currency: product.currency,
              quantity,
            })
          }
        >
          Add to cart
        </Button>

        <p className="text-caption tracking-normal text-ink-soft">
          {`Baked to order. This one needs ${product.leadTimeDays} days, and the date is agreed by email.`}
        </p>
      </div>
    </div>
  );
}
