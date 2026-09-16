interface BrandStoryProps {
  paragraphs: string[];
  philosophy: string;
  philosophyHeading: string;
}

/** Editorial column: the story runs long, the philosophy sits apart from it. */
export function BrandStory({ paragraphs, philosophy, philosophyHeading }: BrandStoryProps) {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex max-w-[68ch] flex-col gap-6">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-lead text-ink">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="max-w-[62ch] rounded-plate bg-sand p-8 md:p-10">
        <h2 className="font-display text-heading">{philosophyHeading}</h2>
        <p className="mt-5 text-lead text-ink-soft">{philosophy}</p>
      </div>
    </div>
  );
}
