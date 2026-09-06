import Image from "next/image";

interface WorkflowStepProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  subtitle?: string;
  showSubtitle?: boolean;
}

export default function WorkflowStep({
  iconSrc,
  iconAlt,
  title,
  subtitle,
  showSubtitle = true,
}: WorkflowStepProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-surface p-3 md:p-5 lg:w-40">
      <div className="flex size-9 items-center justify-center rounded-full bg-primary-soft shadow-[0_4px_4px_rgba(15,23,42,0.02)] md:size-12">
        <div className="relative size-5 overflow-hidden md:size-6">
          <Image src={iconSrc} alt={iconAlt} fill className="object-contain" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs font-extrabold text-text-primary md:text-sm">
          {title}
        </p>
        {showSubtitle && subtitle ? (
          <p className="hidden text-xs text-text-secondary lg:block">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
