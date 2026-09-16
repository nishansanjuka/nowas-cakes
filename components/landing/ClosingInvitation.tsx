import { ButtonLink } from "@/components/ui/Button";

interface ClosingInvitationProps {
  heading: string;
  body: string;
  email: string;
}

export function ClosingInvitation({ heading, body, email }: ClosingInvitationProps) {
  return (
    <section className="mx-auto w-full max-w-[86rem] px-gutter py-section-sm md:px-10 md:py-section">
      <div className="max-w-[24ch]">
        <h2 className="font-display text-display">{heading}</h2>
      </div>
      <p className="mt-8 max-w-[56ch] text-lead text-ink-soft">{body}</p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <ButtonLink href="/shop">Browse the cakes</ButtonLink>
        <a
          href={`mailto:${email}`}
          className="text-body text-ink-soft transition-opacity duration-[var(--duration-fast)] hover:text-ink"
        >
          Or write to Nowa about a custom order
        </a>
      </div>
    </section>
  );
}
