interface NumberedListItemProps {
  number: number;
  children: React.ReactNode;
  size?: "sm" | "md";
}

export default function NumberedListItem({
  number,
  children,
  size = "md",
}: NumberedListItemProps) {
  const badgeSize = size === "sm" ? "size-5 text-[11px]" : "size-6 text-xs";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex shrink-0 items-center justify-center rounded-md bg-primary-bg font-extrabold text-primary ${badgeSize}`}
      >
        {number}
      </span>
      <p className="text-sm font-semibold text-text-secondary">{children}</p>
    </div>
  );
}
