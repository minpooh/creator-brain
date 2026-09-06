import Image from "next/image";

interface CheckListItemProps {
  children: React.ReactNode;
  checkSize?: "sm" | "md";
}

export default function CheckListItem({
  children,
  checkSize = "md",
}: CheckListItemProps) {
  const size = checkSize === "sm" ? "size-4" : "size-5";
  const icon = checkSize === "sm" ? 10 : 12;

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <p className="text-sm font-semibold text-text-secondary">{children}</p>
      <div
        className={`flex shrink-0 items-center justify-center rounded bg-success-bg ${size}`}
      >
        <Image
          src="/icons/check.svg"
          alt=""
          width={icon}
          height={icon}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
