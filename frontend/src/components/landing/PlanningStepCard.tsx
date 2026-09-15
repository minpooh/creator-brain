interface PlanningStepCardProps {
  number: string;
  title: string;
  description: string;
  size?: "sm" | "md";
}

export default function PlanningStepCard({
  number,
  title,
  description,
  size = "md",
}: PlanningStepCardProps) {
  const badgeSize =
    size === "sm" ? "size-8 text-[13px] rounded-lg" : "size-10 text-base rounded-lg";

  return (
    <div className="planning-step flex w-full gap-4 rounded-2xl bg-white p-5 md:gap-5 md:p-6">
      <div
        className={`flex shrink-0 items-center justify-center bg-primary-bg font-extrabold text-primary ${badgeSize}`}
      >
        {number}
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="text-base font-extrabold text-text-primary">{title}</p>
        <p className="text-[13px] leading-5 text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
