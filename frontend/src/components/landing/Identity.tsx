import SectionIndex from "./SectionIndex";
import IdentityCard from "./IdentityCard";
import StrengthsCard from "./StrengthsCard";

const identity = {
  title: "Sensory Lifestyle Creator",
  description:
    "일상의 평범함을 감각적인 연출로 기록하고, 독자에게 시각적인 편안함과 새로운 영감을 주는 크리에이터.",
  mobileDescription:
    "일상의 평범함을 감각적인 연출로 기록하고 시각적인 영감을 주는 크리에이터.",
} as const;

const desktopStrengths = [
  "차분하고 감성적인 스토리텔링",
  "시각적 레이아웃 구성의 전문성",
  "자연스러운 브랜드 협업 가능성",
  "높은 오디언스 신뢰 기반 커뮤니티",
] as const;

const tabletStrengths = desktopStrengths.slice(0, 3);

export default function Identity() {
  return (
    <section className="flex w-full flex-col gap-10 bg-white px-5 py-14 md:gap-12 md:px-10 md:py-20 lg:gap-14 lg:px-20 lg:py-[100px]">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <SectionIndex number="04" label="IDENTITY" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[600px] text-[28px] font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl md:leading-[48px]">
            당신은 이런{" "}
            <span className="text-primary">크리에이터예요</span>
          </h2>

          <p className="hidden max-w-[480px] text-sm leading-6 text-text-secondary md:block md:text-[15px]">
            당신의 강점과 특성을 바탕으로 크리에이터의 미래 정체성을 명확하게
            정의합니다. 어떤 분야에서 독보적인 영향력을 가질 수 있는지 핵심
            키워드를 함께 도출합니다.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden items-center gap-8 lg:flex">
        <IdentityCard
          title={identity.title}
          description={identity.description}
        />
        <StrengthsCard
          title="가장 부합하는 강점 특성"
          strengths={desktopStrengths}
        />
      </div>

      {/* Tablet layout */}
      <div className="hidden flex-col gap-5 md:flex lg:hidden">
        <IdentityCard
          title={identity.title}
          description={identity.description}
          showOrb={false}
        />
        <StrengthsCard
          title="핵심 강점 특성"
          strengths={tabletStrengths}
          size="sm"
        />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <IdentityCard
          title={identity.title}
          description={identity.mobileDescription}
          showOrb={false}
        />
      </div>
    </section>
  );
}
