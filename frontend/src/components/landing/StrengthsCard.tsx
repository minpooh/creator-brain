import NumberedListItem from "./NumberedListItem";

interface StrengthsCardProps {
  title: string;
  strengths: readonly string[];
  size?: "sm" | "md";
}

export default function StrengthsCard({
  title,
  strengths,
  size = "md",
}: StrengthsCardProps) {
  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl bg-surface p-6 md:p-8 lg:w-[420px] lg:shrink-0">
      <p className="text-base font-extrabold text-text-primary">{title}</p>
      <div className="flex flex-col gap-5">
        {strengths.map((strength, index) => (
          <NumberedListItem key={strength} number={index + 1} size={size}>
            {strength}
          </NumberedListItem>
        ))}
      </div>
    </div>
  );
}
