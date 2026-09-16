import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-sans " +
  "transition-[background-color,color,opacity,transform] duration-[var(--duration-fast)] " +
  "ease-[var(--ease-out-quiet)] disabled:opacity-45 disabled:pointer-events-none " +
  "active:scale-[0.99] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-ink/88",
  secondary: "bg-shell text-ink hover:bg-blush-soft",
  quiet: "bg-transparent text-ink-soft hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-control",
  md: "h-12 px-7 text-control",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}
