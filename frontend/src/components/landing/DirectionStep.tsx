import Image from "next/image";

interface DirectionStepProps {
  iconSrc: string;
  iconAlt: string;
  label: string;
}

export default function DirectionStep({
  iconSrc,
  iconAlt,
  label,
}: DirectionStepProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex size-14 items-center justify-center rounded-[28px] bg-primary-soft">
        <div className="relative size-6">
          <Image src={iconSrc} alt={iconAlt} fill className="object-contain" />
        </div>
      </div>
      <p className="text-center text-sm font-bold text-text-primary">{label}</p>
    </div>
  );
}
