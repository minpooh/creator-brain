interface SectionIndexProps {
  number: string;
  label: string;
}

export default function SectionIndex({ number, label }: SectionIndexProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-extrabold text-primary">{number}</span>
      <span className="h-px w-3 bg-primary" aria-hidden="true" />
      <span className="text-[13px] font-bold uppercase tracking-wide text-text-secondary">
        {label}
      </span>
    </div>
  );
}
