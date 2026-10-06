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
  identity: string;
  summary: string;
  contentCount: number;
  tone: string;
  strengths: string[];
  patterns: string[];
}

export default function AnalysisReportPreview({
  identity,
  summary,
  contentCount,
  tone,
  strengths,
  patterns,
}: AnalysisReportPreviewProps) {
  return (
    <section className="flex overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_24px_rgba(15,23,42,0.02)] md:rounded-[20px] lg:min-h-[285px]">
      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 md:gap-6 md:p-8 lg:p-10">
        <div className="w-fit rounded-full bg-[#eef2ff] px-3 py-1.5">
          <p className="text-[11px] font-bold text-[#4f46e5]">
            AI IDENTITY DIAGNOSTICS
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold text-text-primary md:text-2xl">
            {identity}
          </h2>
          {summary ? (
            <p className="text-sm leading-[1.6] text-text-secondary md:text-[15px]">
              {summary}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-text-muted">
              ANALYZED CONTENTS
            </p>
            <p className="text-xl font-bold text-primary">{contentCount}개</p>
          </div>
          {tone ? (
            <div className="flex max-w-md flex-col gap-1">
              <p className="text-xs font-semibold text-text-muted">TONE</p>
              <p className="text-sm font-bold leading-snug text-text-primary">
                {tone}
              </p>
            </div>
          ) : null}
        </div>
        {strengths.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-text-muted">
              CONTENT STRENGTH
            </p>
            <div className="flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold leading-5 text-primary"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {patterns.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-text-muted">
              CONTENT PATTERN
            </p>
            <div className="flex flex-wrap gap-2">
              {patterns.map((pattern) => (
                <span
                  key={pattern}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold leading-5 text-text-secondary"
                >
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="hidden w-[400px] shrink-0 items-center justify-center bg-[#fafaf9] lg:flex">
        <ChartIllustration />
      </div>
    </section>
  );
}
