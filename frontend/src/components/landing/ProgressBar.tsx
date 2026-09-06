interface ProgressBarProps {
  label: string;
  percent: number;
  colorClassName: string;
}

export default function ProgressBar({
  label,
  percent,
  colorClassName,
}: ProgressBarProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <p className="w-20 shrink-0 text-[13px] font-semibold text-text-primary">
        {label}
      </p>
      <div className="h-2 flex-1 overflow-hidden rounded bg-[#f1f5f9]">
        <div
          className={`h-full rounded ${colorClassName}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="shrink-0 text-[13px] font-bold text-text-primary">
        {percent}%
      </p>
    </div>
  );
}
