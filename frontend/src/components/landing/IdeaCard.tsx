import Image from "next/image";
import Badge from "./Badge";

export interface IdeaCardProps {
  category: string;
  title: string;
  views: string;
  productionTime?: string;
  variant?: "card" | "row" | "compact";
  index?: number;
}

export default function IdeaCard({
  category,
  title,
  views,
  productionTime,
  variant = "card",
  index,
}: IdeaCardProps) {
  if (variant === "compact") {
    return (
      <div className="idea-card rounded-2xl bg-surface p-4">
        <p className="mb-2 text-sm font-semibold text-text-secondary">
          추천 아이디어 {index}
        </p>
        <p className="text-sm font-extrabold text-text-primary">{title}</p>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="idea-card flex items-center gap-4 rounded-2xl bg-surface px-5 py-5">
        <Badge>{category}</Badge>
        <p className="min-w-0 flex-1 truncate text-[15px] font-extrabold text-text-primary">
          {title}
        </p>
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <div className="relative size-3.5">
            <Image
              src="/icons/chart-line.svg"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <p className="text-[13px] font-semibold text-text-secondary">
            예상 조회수 {views}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="idea-card flex flex-1 flex-col gap-5 rounded-3xl bg-surface p-8 shadow-[0_4px_6px_rgba(15,23,42,0.02)]">
      <Badge>{category}</Badge>
      <p className="text-xl font-extrabold leading-7 text-text-primary">
        {title}
      </p>
      <div className="border-t border-border" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative size-4 shrink-0">
            <Image
              src="/icons/chart-line.svg"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <p className="text-[13px] font-semibold text-text-secondary">
            예상 조회수 {views}
          </p>
        </div>
        {productionTime ? (
          <div className="flex items-center gap-2">
            <div className="relative size-4 shrink-0">
              <Image
                src="/icons/clock.svg"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <p className="text-[13px] text-text-secondary">
              필요 제작 시간: {productionTime}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
