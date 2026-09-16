import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  currency: string;
  /** Shown as a line the customer will agree before the cake is made. */
  deliveryNote: string;
}

export function CartSummary({ subtotal, currency, deliveryNote }: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-caption uppercase tracking-[0.12em] text-ink-soft">Subtotal</span>
        <span className="tabular font-display text-panel">{formatPrice(subtotal, currency)}</span>
      </div>
      <p className="text-caption tracking-normal text-ink-soft">{deliveryNote}</p>
    </div>
  );
}
