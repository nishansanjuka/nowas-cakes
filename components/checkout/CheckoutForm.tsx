"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { OptionSelector } from "@/components/shop/OptionSelector";

type Status = "idle" | "working" | "placeholder";

const handoverOptions = [
  { id: "collect", label: "Collect from the studio", priceDelta: 0 },
  { id: "deliver", label: "Delivery within the city", priceDelta: 0 },
];

/** Form UI only. Nothing is sent anywhere and nothing is charged. */
export function CheckoutForm({ disabled }: { disabled: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [handover, setHandover] = useState("collect");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError =
    emailTouched && email.length > 0 && !email.includes("@")
      ? "That address is missing an at sign."
      : undefined;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) return;
    setStatus("working");
    window.setTimeout(() => setStatus("placeholder"), 1100);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="name" label="Name" name="name" autoComplete="name" required />
        <Input
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          error={emailError}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setEmailTouched(true)}
          hint="Nowa confirms the date here."
        />
        <Input id="phone" label="Phone" name="phone" type="tel" autoComplete="tel" />
        <Input
          id="date"
          label="Date you need it"
          name="date"
          type="date"
          hint="Ready cakes need four days, tiered cakes need ten."
        />
      </div>

      <OptionSelector
        label="Collection or delivery"
        name="handover"
        options={handoverOptions}
        value={handover}
        onChange={setHandover}
        currency="USD"
      />

      {handover === "deliver" ? (
        <Input
          id="address"
          label="Delivery address"
          name="address"
          autoComplete="street-address"
          hint="Delivery cost is agreed by email once the address is known."
        />
      ) : null}

      <Textarea
        id="notes"
        label="Anything Nowa should know"
        name="notes"
        hint="Allergies, what the occasion is, or a message to pipe on top."
      />

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={disabled || status === "working"} className="w-full sm:w-auto">
          {status === "working" ? "Placing the order" : "Place the order"}
        </Button>
        <p aria-live="polite" className="max-w-[52ch] text-body text-ink-soft">
          {status === "placeholder"
            ? "This is a sample site, so nothing was sent and nothing was charged. On the real site Nowa would reply within a day."
            : "Nothing is charged here. Payment is arranged directly with Nowa once the date is confirmed."}
        </p>
      </div>
    </form>
  );
}
