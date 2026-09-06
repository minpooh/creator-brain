import Image from "next/image";

interface ContentImageGridProps {
  images: readonly { src: string; alt: string }[];
  columns?: 2 | 3;
  className?: string;
}

export default function ContentImageGrid({
  images,
  columns = 3,
  className = "",
}: ContentImageGridProps) {
  return (
    <div
      className={`grid gap-3 ${columns === 2 ? "grid-cols-2" : "grid-cols-3"} ${className}`}
    >
      {images.map((image) => (
        <div
          key={image.src}
          className="relative aspect-[4/3] overflow-hidden rounded-xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes={columns === 2 ? "50vw" : "(max-width: 1024px) 33vw, 220px"}
          />
        </div>
      ))}
    </div>
  );
}
