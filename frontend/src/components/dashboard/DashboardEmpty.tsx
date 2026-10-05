import { ChartIllustration } from "@/components/dashboard/AnalysisReportPreview";
import AnalysisProcess from "@/components/dashboard/AnalysisProcess";
import {
  ContentRegistrationTrigger,
  type ContentRegistrationValues,
} from "@/components/dashboard/ContentRegistrationModal";

const emptySteps = [
  {
    number: "1",
    title: "콘텐츠 등록",
    description: "나의 채널 또는 파일 연동",
    active: true,
  },
  {
    number: "2",
    title: "AI 분석",
    description: "패턴 및 강점 다차원 진단",
  },
  {
    number: "3",
    title: "Creator Identity 발견",
    description: "나만의 독창적인 핵심 아이덴티티",
  },
  {
    number: "4",
    title: "다음 콘텐츠 방향 제안",
    description: "성과 극대화를 위한 맞춤형 가이드",
  },
];


function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3.2 14.4 9l6.1.5-4.7 4 1.5 6-5.3-3.2-5.3 3.2 1.5-6-4.7-4L9.6 9 12 3.2Z" />
    </svg>
  );
}

export default function DashboardEmpty({
  onRegister,
}: {
  onRegister: (values: ContentRegistrationValues) => Promise<void>;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 md:gap-8 md:px-10 md:py-12 lg:gap-10 lg:px-20 lg:py-[60px]">
        <section className="flex flex-col gap-1.5 md:gap-2">
          <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-[28px]">
            안녕하세요, 민정님 👋
          </h1>
          <p className="text-[13px] text-text-secondary md:text-[15px] lg:text-base">
            당신의 콘텐츠를 분석하고 나만의 방향성을 발견해보세요.
          </p>
        </section>

        <section className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_32px_rgba(15,23,42,0.02)] md:rounded-[20px] lg:flex-row lg:rounded-3xl">
          <div className="h-1.5 bg-primary md:hidden" />
          <div className="hidden h-[220px] items-center justify-center border-b border-border bg-[#fafaf9] md:flex lg:order-2 lg:h-auto lg:w-[480px] lg:shrink-0 lg:border-b-0 lg:border-l">
            <ChartIllustration />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5 p-5 md:gap-7 md:p-9 lg:gap-10 lg:p-14">
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
              <div className="w-fit rounded-full bg-[#eef2ff] px-2 py-[3px] md:px-2.5 md:py-1 lg:px-3 lg:py-1.5">
                <p className="text-[10px] font-bold text-[#4f46e5] md:text-[11px] lg:text-xs">
                  <span className="md:hidden">AI DIAGNOSTICS</span>
                  <span className="hidden md:inline">AI IDENTITY ANALYSIS</span>
                </p>
              </div>
              <h2 className="text-lg font-bold text-text-primary md:text-xl lg:text-2xl">
                아직 등록된 콘텐츠가 없어요
              </h2>
              <p className="text-[13px] leading-[1.4] text-text-secondary md:text-sm md:leading-normal lg:text-[15px] lg:leading-[1.5]">
                <span className="md:hidden">
                  기존 콘텐츠를 등록하면 Creator Brain이 콘텐츠의 패턴과 강점을
                  분석해드려요.
                </span>
                <span className="hidden md:inline lg:hidden">
                  기존 콘텐츠를 등록하면 Creator Brain이 콘텐츠의 패턴과 강점을
                  분석해드려요. 패턴과 가치를 일목요연하게 정리해 드립니다.
                </span>
                <span className="hidden lg:inline">
                  기존 콘텐츠를 등록하면 Creator Brain이 콘텐츠의 패턴과 강점을
                  분석해드려요. 유튜브, 인스타그램 피드 혹은 텍스트 스크립트
                  파일을 손쉽게 추가해보세요.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-3">
              <ContentRegistrationTrigger
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-text-primary px-4 text-sm font-bold text-white"
                onSubmit={onRegister}
              >
                <StarIcon />
                콘텐츠 등록하기
              </ContentRegistrationTrigger>
              <button
                type="button"
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-semibold text-text-primary"
              >
                <span className="lg:hidden">샘플 콘텐츠 체험</span>
                <span className="hidden lg:inline">
                  샘플 콘텐츠로 체험하기
                </span>
              </button>
            </div>
          </div>
        </section>

        <AnalysisProcess steps={emptySteps} />
      </div>
    );
  }
