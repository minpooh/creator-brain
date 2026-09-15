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
    <div data-progress className="flex w-full items-center gap-3">
      <p className="w-20 shrink-0 text-[13px] font-semibold text-text-primary">
        {label}
      </p>
      <div className="h-2 flex-1 overflow-hidden rounded bg-[#f1f5f9]">
        <div
          data-progress-bar
          data-percent={percent}
          className={`h-full w-full origin-left rounded ${colorClassName}`}
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>
      <p className="shrink-0 text-[13px] font-bold text-text-primary">
        <span data-progress-value className="motion-reduce:hidden">
          0%
        </span>
        <span className="hidden motion-reduce:inline">{percent}%</span>
      </p>
    </div>
  );
}
