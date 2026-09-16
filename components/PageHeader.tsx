import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  lead?: string;
  children?: ReactNode;
}

/** The opening of every page that is not the landing page. */
export function PageHeader({ title, lead, children }: PageHeaderProps) {
  return (
    <header className="mx-auto w-full max-w-[86rem] px-gutter pb-12 pt-[calc(var(--spacing-nav)+3.5rem)] md:px-10 md:pb-16 md:pt-[calc(var(--spacing-nav)+6rem)]">
      <h1 className="max-w-[18ch] font-display text-title">{title}</h1>
      {lead ? <p className="mt-6 max-w-[56ch] text-lead text-ink-soft">{lead}</p> : null}
      {children}
    </header>
  );
}
