interface IdentityCardProps {
  label?: string;
  title: string;
  description: string;
  showOrb?: boolean;
}

export default function IdentityCard({
  label = "CREATOR IDENTITY",
  title,
  description,
  showOrb = true,
}: IdentityCardProps) {
  return (
    <div className="relative flex flex-1 items-center gap-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#ede9fe] to-[#f5f3ff] p-8 md:p-12">
      <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
        <p className="text-xs font-extrabold tracking-wide text-text-primary md:text-sm">
          {label}
        </p>
        <h3 className="text-2xl font-black text-text-primary md:text-[32px]">
          {title}
        </h3>
        <p className="text-sm leading-6 text-text-secondary md:text-base">
          {description}
        </p>
      </div>

      {showOrb ? (
        <div
          className="relative hidden size-[120px] shrink-0 lg:block"
          aria-hidden="true"
        >
          {/* Outer soft circle — matches Figma identity orb */}
          <div className="absolute inset-0 rounded-full bg-white/15" />
          {/* Inner soft circle */}
          <div className="absolute inset-[20px] rounded-full bg-white/25" />
        </div>
      ) : null}
    </div>
  );
}
