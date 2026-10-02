import Image from "next/image";

export function ChartIllustration() {
  return (
    <Image
      src="/images/dashboard/chart-illustration.png"
      alt=""
      width={180}
      height={180}
      aria-hidden="true"
    />
  );
}

interface AnalysisReportPreviewProps {
  name?: string;
}

export default function AnalysisReportPreview({
  name = "민정님",
}: AnalysisReportPreviewProps) {
  return (
    <section className="flex overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_24px_rgba(15,23,42,0.02)] md:rounded-[20px] lg:h-[285px]">
      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 md:gap-6 md:p-8 lg:p-10">
        <div className="w-fit rounded-full bg-[#eef2ff] px-3 py-1.5">
          <p className="text-[11px] font-bold text-[#4f46e5]">
            AI IDENTITY DIAGNOSTICS
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold text-text-primary md:text-2xl">
            감각적인 라이프스타일 크리에이터
          </h2>
          <p className="text-sm leading-[1.6] text-text-secondary md:text-[15px]">
            {name}의 일상 속 감각적인 큐레이션, 솔직하고 담백한 일상 기록, 그리고
            기술을 다루는 개발자로서의 독창적인 시선이 유기적으로 결합되어 나만의
            차별화된 퍼스널 브랜드 가치를 전달합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-text-muted">IDENTITY FIT</p>
            <p className="text-xl font-bold text-primary">98.4%</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-text-muted">
              INFLUENCE POWER
            </p>
            <p className="text-xl font-bold text-text-primary">최상위 5%</p>
          </div>
        </div>
      </div>
      <div className="hidden w-[400px] shrink-0 items-center justify-center bg-[#fafaf9] lg:flex">
        <ChartIllustration />
      </div>
    </section>
  );
}
