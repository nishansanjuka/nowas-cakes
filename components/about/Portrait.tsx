import Image from "next/image";

interface PortraitProps {
  src: string;
  alt: string;
  caption: string;
}

export function Portrait({ src, alt, caption }: PortraitProps) {
  return (
    <figure className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-plate bg-sand">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 92vw, 34vw" className="object-cover" />
      </div>
      <figcaption className="max-w-[34ch] text-body text-ink-soft">{caption}</figcaption>
    </figure>
  );
}
