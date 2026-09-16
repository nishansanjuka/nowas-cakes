import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] w-full max-w-[86rem] flex-col justify-center px-gutter py-section-sm md:px-10">
      <h1 className="max-w-[18ch] font-display text-title">
        That page is not in the kitchen.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lead text-ink-soft">
        The link may be old, or the cake may have come off the shelf for the season.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <ButtonLink href="/shop">Browse the cakes</ButtonLink>
        <ButtonLink href="/" variant="quiet">
          Back to the start
        </ButtonLink>
      </div>
    </section>
  );
}
