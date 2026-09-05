interface StatCardProps {
  label: string;
  value: string;
  description: string;
}

export default function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-xl bg-surface p-5">
      <p className="text-[13px] text-text-secondary">{label}</p>
      <p className="text-[22px] font-extrabold text-text-primary">{value}</p>
      <p className="text-[11px] text-text-muted">{description}</p>
    </div>
  );
}
