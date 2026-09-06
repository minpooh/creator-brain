import Image from "next/image";
import ProgressBar from "./ProgressBar";

export interface TopicStat {
  label: string;
  percent: number;
  colorClassName: string;
}

interface AnalysisResultCardProps {
  title?: string;
  topics: readonly TopicStat[];
  suggestions?: readonly string[];
  showSuggestions?: boolean;
}

export default function AnalysisResultCard({
  title = "AI 분석 결과",
  topics,
  suggestions = [],
  showSuggestions = true,
}: AnalysisResultCardProps) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl bg-white p-6 shadow-[0_8px_12px_rgba(15,23,42,0.04)] md:p-8 lg:max-w-[500px]">
      <p className="text-lg font-extrabold text-text-primary">{title}</p>

      <div className="flex flex-col gap-4">
        {showSuggestions ? (
          <p className="text-sm font-bold text-text-secondary">주요 주제 Top 3</p>
        ) : null}
        <div className="flex flex-col gap-4">
          {topics.map((topic) => (
            <ProgressBar
              key={topic.label}
              label={topic.label}
              percent={topic.percent}
              colorClassName={topic.colorClassName}
            />
          ))}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 ? (
        <>
          <div className="border-t border-border" />
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-text-secondary">
              콘텐츠 패턴 제안
            </p>
            {suggestions.map((suggestion) => (
              <div key={suggestion} className="flex items-center gap-2">
                <div className="flex size-4 shrink-0 items-center justify-center rounded bg-success-bg">
                  <Image
                    src="/icons/check.svg"
                    alt=""
                    width={10}
                    height={10}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[13px] text-text-secondary">{suggestion}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
