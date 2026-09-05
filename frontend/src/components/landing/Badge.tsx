interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary-border bg-primary-bg px-3 py-1.5 text-xs font-bold text-primary">
      {children}
    </span>
  );
}
