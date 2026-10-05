import { ChartIllustration } from "@/components/dashboard/AnalysisReportPreview";
import ContentCard from "@/components/dashboard/ContentCard";
import {
  ContentRegistrationTrigger,
  type ContentRegistrationValues,
} from "@/components/dashboard/ContentRegistrationModal";
import { getContentThumbnailUrl } from "@/lib/dashboard/thumbnail";

const platformLabels: Record<ContentRegistrationValues["platform"], string> = {
  YouTube: "유튜브 비디오",
  Instagram: "인스타그램 피드",
  Blog: "블로그",
};

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

function todayLabel() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

interface DashboardCollectingProps {
  contents: ContentRegistrationValues[];
  readyCount: number;
  onRegister: (values: ContentRegistrationValues) => Promise<void>;
}

export default function DashboardCollecting({
  contents,
  readyCount,
  onRegister,
}: DashboardCollectingProps) {
  const remaining = Math.max(readyCount - contents.length, 0);
  const progress = Math.round((contents.length / readyCount) * 100);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 md:gap-8 md:px-10 md:py-9 lg:gap-8 lg:px-[120px] lg:py-12">
      <section className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-[28px]">
          좋아요! 콘텐츠가 쌓이고 있어요. 👍
        </h1>
        <p className="text-[13px] text-text-secondary md:text-[15px] lg:text-base">
          당신의 콘텐츠를 분석하고 나만의 방향성을 발견해보세요.
        </p>
      </section>

      <section className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white md:rounded-[20px] lg:flex-row lg:rounded-3xl">
        <div className="h-1.5 bg-primary md:hidden" />
        <div className="flex flex-1 flex-col justify-center gap-5 p-5 md:gap-7 md:p-9 lg:gap-7 lg:p-12">
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            <div className="w-fit rounded-full bg-[#eef2ff] px-2 py-[3px] md:px-2.5 md:py-1 lg:px-3 lg:py-1.5">
              <p className="text-[10px] font-bold text-[#4f46e5] md:text-[11px] lg:text-xs">
                <span className="md:hidden">AI DIAGNOSTICS</span>
                <span className="hidden md:inline">AI IDENTITY ANALYSIS</span>
              </p>
            </div>
            <h2 className="text-lg font-bold text-text-primary md:text-xl lg:text-2xl">
              AI 분석까지 {remaining}개의 콘텐츠가 더 필요해요.
            </h2>
            <p className="text-[13px] leading-[1.4] text-text-secondary md:text-sm lg:text-[15px] lg:leading-[1.5]">
              <span className="lg:hidden">
                더 많은 콘텐츠를 분석할수록 콘텐츠 패턴과 강점을 더 정확하게
                발견할 수 있어요.
              </span>
              <span className="hidden lg:inline">
                더 많은 콘텐츠를 분석할수록 콘텐츠 패턴과 강점을 더 정확하게
                발견할 수 있어요. 유튜브, 인스타그램 피드 혹은 텍스트 스크립트
                파일을 추가해보세요.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-full max-w-[240px] overflow-hidden rounded bg-border">
              <div
                className="h-full rounded bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="shrink-0 text-sm font-bold text-primary">
              {contents.length} / {readyCount}
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-3">
            <ContentRegistrationTrigger
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-text-primary px-4 text-sm font-bold text-white"
              onSubmit={onRegister}
            >
              <StarIcon />
              콘텐츠 추가하기
            </ContentRegistrationTrigger>
            <button
              type="button"
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-semibold text-text-primary"
            >
              샘플 콘텐츠 체험
            </button>
          </div>
        </div>
        <div className="hidden w-[440px] shrink-0 items-center justify-center border-l border-border bg-[#fafaf9] lg:flex">
          <ChartIllustration />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-text-primary md:text-lg">
          등록된 콘텐츠 목록
        </h2>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {contents.map((content, index) => (
            <ContentCard
              key={`${content.url}-${index}`}
              thumbnail={getContentThumbnailUrl(content.url)}
              type={platformLabels[content.platform]}
              date={todayLabel()}
              title={content.title}
              views="0"
              likes="0"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
