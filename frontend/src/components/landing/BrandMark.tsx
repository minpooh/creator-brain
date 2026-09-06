import Image from "next/image";

interface BrandMarkProps {
  name?: string;
  size?: "sm" | "md";
}

export default function BrandMark({
  name = "크리에이터 브레인",
  size = "md",
}: BrandMarkProps) {
  const iconSize = size === "sm" ? "size-5" : "size-6";
  const imageSize = size === "sm" ? 10 : 14;
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex shrink-0 items-center justify-center rounded-md bg-primary ${iconSize}`}
      >
        <Image
          src="/logo-brain.svg"
          alt=""
          width={imageSize}
          height={imageSize}
          aria-hidden="true"
        />
      </div>
      <span className={`font-extrabold text-text-primary ${textSize}`}>
        {name}
      </span>
    </div>
  );
}
