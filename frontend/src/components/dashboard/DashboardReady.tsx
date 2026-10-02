import Image from "next/image";
import AnalysisProcess from "@/components/dashboard/AnalysisProcess";

const reportModels = [
  { number: "1", title: "Creator Identity", description: "AI 정밀 분석 준비" },
  { number: "2", title: "Content Strength", description: "AI 정밀 분석 준비" },
  { number: "3", title: "Content Pattern", description: "AI 정밀 분석 준비" },
  { number: "4", title: "Content Pillar", description: "AI 정밀 분석 준비" },
  { number: "5", title: "Content Direction", description: "AI 정밀 분석 준비" },
];

function StarsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3.2 14.4 9l6.1.5-4.7 4 1.5 6-5.3-3.2-5.3 3.2 1.5-6-4.7-4L9.6 9 12 3.2Z" />
    </svg>
  );
}

function ReadyIllustration() {
  return (
    <Image
      src="/images/dashboard/ready-illustration.png"
      alt=""
      width={310}
      height={220}
      aria-hidden="true"
    />
  );
}

export default function DashboardReady() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 md:gap-8 md:px-10 md:py-12 lg:gap-10 lg:px-20 lg:py-[60px]">
        <section className="flex flex-col gap-1.5 md:gap-2">
          <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-[28px]">
            분석할 콘텐츠가 준비됐어요.
          </h1>
          <p className="text-[13px] text-text-secondary md:text-[15px] lg:text-base">
            <span className="md:hidden">분석할 콘텐츠가 준비됐어요.</span>
            <span className="hidden md:inline lg:hidden">
              당신의 채널 및 오디오 파일 수집을 완료했습니다. 분석을
              진행해보세요.
            </span>
            <span className="hidden lg:inline">
              등록하신 미디어를 완벽히 수집했습니다. 이제 AI 다차원 정밀 진단을
              시작해보세요.
            </span>
          </p>
        </section>

        <section className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_32px_rgba(15,23,42,0.02)] md:rounded-[20px] lg:flex-row lg:rounded-3xl">
          <div className="h-1.5 bg-primary md:hidden" />
          <div className="hidden h-[180px] items-center justify-center gap-4 border-b border-border bg-[#fafaf9] md:flex lg:hidden">
            <div className="relative size-16 shrink-0">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.457]">
                <Image
                  src="/icons/dashboard/analysis-ring.svg"
                  alt=""
                  width={140}
                  height={140}
                  className="h-auto w-auto max-w-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-text-primary">
                AI 다차원 진단 대기 중
              </p>
              <p className="text-[13px] text-text-secondary">
                준비된 모델 진단을 시작하세요
              </p>
            </div>
            <div className="flex rounded-full border border-[#ddd6fe] bg-[#f5f3ff] p-1.5">
              <Image
                src="/icons/dashboard/sparkles.svg"
                alt=""
                width={14}
                height={14}
                className="h-auto w-auto"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5 p-5 md:gap-7 md:p-9 lg:gap-10 lg:p-14">
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-5">
              <div className="w-fit rounded-full bg-[#eef2ff] px-2 py-[3px] md:px-2.5 md:py-1 lg:px-3 lg:py-1.5">
                <p className="text-[10px] font-bold text-[#4f46e5] md:text-[11px] lg:text-xs">
                  <span className="md:hidden">AI DIAGNOSTICS</span>
                  <span className="hidden md:inline">AI IDENTITY ANALYSIS</span>
                </p>
              </div>
              <h2 className="text-lg font-bold text-text-primary md:text-[22px] lg:text-[32px]">
                당신의 콘텐츠를 분석해볼까요?
              </h2>
              <p className="text-[13px] leading-[1.4] text-text-secondary md:text-sm lg:text-[15px] lg:leading-[1.6]">
                <span className="md:hidden">
                  등록한 콘텐츠를 바탕으로 Creator Identity, 콘텐츠 강점과 패턴을
                  분석합니다.
                </span>
                <span className="hidden md:inline lg:hidden">
                  등록한 콘텐츠를 바탕으로 Creator Identity, 콘텐츠 강점과 패턴을
                  분석합니다. 패턴과 가치를 일목요연하게 정리해 드립니다.
                </span>
                <span className="hidden lg:inline">
                  등록한 콘텐츠를 바탕으로 Creator Identity, 콘텐츠 강점과 패턴을
                  분석합니다. 나를 가장 나답게 만드는 핵심 요소를 한눈에
                  시각화해 드립니다.
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden size-7 items-center justify-center rounded-full bg-[#f5f3ff] p-1.5 lg:flex">
                <Image
                  src="/icons/dashboard/sparkles-16.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="h-auto w-auto"
                />
              </div>
              <span className="size-1.5 rounded-full bg-primary lg:hidden" />
              <p className="text-[13px] font-bold text-primary md:text-sm lg:text-[15px]">
                5개의 콘텐츠 분석 준비 완료
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center lg:gap-4">
              <button
                type="button"
                className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white lg:h-24 lg:px-10 lg:text-lg"
              >
                <StarsIcon />
                AI 분석 시작하기
              </button>
              <button
                type="button"
                className="hidden h-14 cursor-pointer items-center justify-center rounded-full border border-border px-8 text-base font-bold text-text-primary md:inline-flex lg:h-24 lg:px-10 lg:text-lg"
              >
                콘텐츠 확인하기
              </button>
            </div>
          </div>
          <div className="hidden w-[480px] shrink-0 items-center justify-center border-l border-border bg-[#fafaf9] lg:flex">
            <ReadyIllustration />
          </div>
        </section>

        <AnalysisProcess variant="models" steps={reportModels} />

        <button
          type="button"
          className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-base font-bold text-text-primary md:hidden"
        >
          콘텐츠 확인하기
        </button>
      </div>
    );
  }
