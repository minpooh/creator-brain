export interface AnalysisStep {
  number: string;
  title: string;
  description?: string;
  active?: boolean;
}

interface AnalysisProcessProps {
  variant?: "guide" | "models";
  title?: string;
  steps: AnalysisStep[];
}

function ChevronRight() {
  return (
    <svg
      className="hidden shrink-0 text-text-muted lg:block"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AnalysisProcess({
  variant = "guide",
  title,
  steps,
}: AnalysisProcessProps) {
  if (variant === "models") {
    return (
      <section className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-white p-5 md:gap-5 md:rounded-[20px] md:p-7 lg:gap-6 lg:rounded-3xl lg:p-8">
        <p className="text-[13px] font-bold text-text-primary md:text-sm lg:text-base">
          {title ?? (
            <>
              <span className="md:hidden">준비 완료된 분석 모델</span>
              <span className="hidden md:inline lg:hidden">
                분석 프로세스 및 카테고리
              </span>
              <span className="hidden lg:inline">
                실시간 진단될 5개의 핵심 리포트 모델
              </span>
            </>
          )}
        </p>

        <div className="flex flex-wrap gap-2 md:hidden">
          {steps.map((step) => (
            <span
              key={step.title}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary"
            >
              {step.title}
            </span>
          ))}
        </div>

        <div className="hidden flex-col gap-3 md:flex lg:hidden">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3"
            >
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {step.number}
              </div>
              <p className="text-sm font-bold text-text-primary">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="hidden gap-4 lg:flex">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-1 items-center gap-3 rounded-2xl bg-surface p-4"
            >
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {step.number}
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="truncate text-sm font-bold text-text-primary">
                  {step.title}
                </p>
                {step.description ? (
                  <p className="text-[11px] text-text-secondary">
                    {step.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-white p-5 md:gap-5 md:rounded-[20px] md:p-7 lg:gap-6 lg:rounded-3xl lg:p-8">
      <p className="text-[13px] font-bold text-text-primary md:text-sm lg:text-[15px]">
        {title ?? (
          <>
            <span className="md:hidden">분석 프로세스</span>
            <span className="hidden md:inline lg:hidden">
              분석 프로세스 가이드
            </span>
            <span className="hidden lg:inline">
              Creator Brain 분석 프로세스
            </span>
          </>
        )}
      </p>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-center lg:gap-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-1 items-start gap-3 lg:items-center lg:gap-4"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 lg:gap-1.5">
              <div className="flex items-center gap-1.5">
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold md:size-6 md:text-xs ${
                    step.active
                      ? "bg-primary text-white"
                      : "bg-border text-text-secondary"
                  }`}
                >
                  {step.number}
                </div>
                <p
                  className={`text-[13px] md:text-sm ${
                    step.active
                      ? "font-bold text-primary"
                      : "font-medium text-text-primary md:font-semibold"
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {step.description ? (
                <p className="text-[11px] text-text-secondary md:pl-0 lg:text-[11px]">
                  <span className="md:hidden lg:inline">{step.description}</span>
                  <span className="hidden md:inline lg:hidden">
                    {step.description}
                  </span>
                </p>
              ) : null}
            </div>
            {index < steps.length - 1 ? <ChevronRight /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
