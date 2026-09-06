import SectionIndex from "./SectionIndex";
import ContentImageGrid from "./ContentImageGrid";
import AnalysisResultCard from "./AnalysisResultCard";

const contentImages = [
  { src: "/images/analysis/content-1.png", alt: "식물 콘텐츠" },
  { src: "/images/analysis/content-2.png", alt: "여행 콘텐츠" },
  { src: "/images/analysis/content-3.png", alt: "커피 콘텐츠" },
  { src: "/images/analysis/content-4.png", alt: "공간 콘텐츠" },
  { src: "/images/analysis/content-5.png", alt: "인테리어 콘텐츠" },
  { src: "/images/analysis/content-6.png", alt: "독서 콘텐츠" },
] as const;

const topics = [
  {
    label: "라이프스타일",
    percent: 42,
    colorClassName: "bg-primary",
  },
  {
    label: "감성 가구",
    percent: 28,
    colorClassName: "bg-[#818cf8]",
  },
  {
    label: "인테리어",
    percent: 18,
    colorClassName: "bg-[#c7d2fe]",
  },
] as const;

const suggestions = [
  "감각적 라이프스타일 톤앤매너 유지",
  "오후 7-8시 사이 업로드 시 반응률 극대화",
  "비주얼 중심의 정보 전달 숏폼 포맷 추천",
] as const;

const mobileKeywords = [
  "감각적 스토리텔링 스타일",
  "정보 전달 중심의 비주얼",
  "라이프스타일 카테고리 고효율",
] as const;

function FlowArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`size-6 shrink-0 text-primary ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Analysis() {
  return (
    <section className="flex w-full flex-col gap-10 bg-surface px-5 py-14 md:gap-12 md:px-10 md:py-20 lg:gap-14 lg:px-20 lg:py-[100px]">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <SectionIndex number="03" label="ANALYSIS" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[600px] text-[28px] font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl md:leading-[48px]">
            먼저, 당신의 콘텐츠를
            <br />
            <span className="text-primary">이해합니다</span>
          </h2>

          <p className="max-w-[480px] text-sm leading-6 text-text-secondary md:text-[15px]">
            AI 모델이 이전의 모든 콘텐츠를 분석하여 주제, 감성, 비주얼 패턴,
            반응률을 한눈에 파악하고 가장 효과적이었던 성공 규칙을 공식화합니다.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden items-center gap-10 lg:flex">
        <div className="flex-1 rounded-3xl bg-white p-3">
          <ContentImageGrid images={contentImages} columns={3} />
        </div>

        <FlowArrow />

        <AnalysisResultCard topics={topics} suggestions={suggestions} />
      </div>

      {/* Tablet layout */}
      <div className="hidden flex-col gap-4 md:flex lg:hidden">
        <ContentImageGrid images={contentImages.slice(0, 3)} columns={3} />
        <AnalysisResultCard
          title="AI 분석 결과 요약"
          topics={topics}
          showSuggestions={false}
        />
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-4 md:hidden">
        <ContentImageGrid images={contentImages.slice(0, 2)} columns={2} />
        <div className="rounded-3xl bg-white p-4 shadow-[0_8px_12px_rgba(15,23,42,0.04)]">
          <p className="mb-4 text-sm font-extrabold text-text-primary">
            핵심 분석 키워드
          </p>
          <ul className="flex flex-col gap-3">
            {mobileKeywords.map((keyword) => (
              <li
                key={keyword}
                className="flex items-center gap-3 text-[13px] text-text-secondary"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
