import AnalysisReportPreview from "@/components/dashboard/AnalysisReportPreview";
import ContentCard from "@/components/dashboard/ContentCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const directions = [
  {
    number: "01",
    title: "일상 속 자기발견",
    description:
      "평범한 하루에서 깊이 있는 가치를 이끌어내어 독자들과 진정성 있게 소통합니다.",
  },
  {
    number: "02",
    title: "감각적인 라이프스타일",
    description:
      "시각적 디테일과 취향이 담긴 큐레이션으로 직관적인 영감을 전달합니다.",
  },
  {
    number: "03",
    title: "개발자 라이프",
    description:
      "기술적 고민과 창작자로서의 일상을 입체적으로 연결하여 공감대를 확장합니다.",
  },
];

const pillars = [
  { title: "Lifestyle", description: "일상 속 소소한 영감과 미학" },
  { title: "Self-care", description: "나를 가꾸는 건강한 루틴과 기록" },
  { title: "Work", description: "개발자이자 창작자로서의 일 이야기" },
  { title: "Personal Growth", description: "성장과 깊이를 더하는 생각들" },
];

const ideas = [
  {
    tag: "Work",
    title: "생산성을 높이는 감각적인 데스크 테리어와 장비 셋업",
    description:
      "개발자 민정님의 업무 몰입도를 높이는 엄선된 데스크 아이템 소개와 큐레이션 콘텐츠",
  },
  {
    tag: "Self-care",
    title: "바쁜 일상 속에서 나를 찾는 3가지 모닝 리추얼",
    description:
      "하루를 편안하고 주도적으로 시작하기 위해 실천하는 미니멀 마음 챙김 및 루틴",
  },
  {
    tag: "Lifestyle",
    title: "코드와 일상: 일하는 크리에이터가 중심을 잡는 법",
    description:
      "개발과 콘텐츠 기획을 병행하며 느낀 지속 가능한 삶의 밸런스에 대한 솔직한 단상",
  },
];

const recentContents = [
  {
    thumbnail: "/images/dashboard/recent-1.jpg",
    type: "Video",
    title: "2026 미니멀 개발자 업무 장비 & 셋업 가이드",
    views: "12,450",
    likes: "1,202",
  },
  {
    thumbnail: "/images/dashboard/recent-2.jpg",
    type: "Photos",
    title: "지속 가능한 성장과 건강한 루틴에 관한 기록",
    views: "8,920",
    likes: "940",
  },
  {
    thumbnail: "/images/dashboard/recent-3.jpg",
    type: "Audio",
    title: "복잡한 생각들을 정리하는 나만의 저녁 걷기 리추얼",
    views: "6,510",
    likes: "720",
  },
];

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 3.5 4.75 8.75 2 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export default function DashboardAnalyzed() {
  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-10 lg:gap-10 lg:px-[120px] lg:py-[60px]">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-[28px]">
            민정님의 콘텐츠를 분석했어요 ✨
          </h1>
          <p className="text-[13px] leading-normal text-text-secondary md:text-sm lg:text-[15px]">
            당신의 강점 패턴을 분석해 나만의 독창적인 핵심 아이덴티티와 성장을
            위한 다음 가이드를 도출했습니다.
          </p>
        </section>

        <AnalysisReportPreview />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <section className="flex flex-1 flex-col gap-5 rounded-2xl border border-border bg-white p-5 md:rounded-[20px] md:p-7 lg:rounded-3xl lg:p-8">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-text-primary">
                이런 방향으로 나아가면 좋아요
              </h2>
              <p className="text-sm text-text-secondary">
                <span className="md:hidden">민정님에게 추천하는 로드맵</span>
                <span className="hidden md:inline lg:hidden">
                  민정님의 고유 패턴을 분석하여 제안하는 가이드
                </span>
                <span className="hidden lg:inline">
                  민정님의 고유 패턴을 분석하여 제안하는 추천 콘텐츠 방향성입니다.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {directions.map((step) => (
                <div key={step.number} className="flex items-start gap-3 md:gap-4">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary-border bg-primary-soft text-[11px] font-bold text-primary md:size-8 md:text-[13px]">
                    {step.number}
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-sm font-bold text-text-primary md:text-[15px]">
                      {step.title}
                    </p>
                    <p className="text-xs text-text-secondary md:text-[13px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5 md:rounded-[20px] md:p-7 lg:w-[480px] lg:shrink-0 lg:rounded-3xl lg:p-8">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-text-primary">
                4대 분석 핵심 필러
              </h2>
              <p className="text-sm text-text-secondary">
                <span className="md:hidden">콘텐츠를 이루는 핵심 가치</span>
                <span className="hidden md:inline lg:hidden">
                  콘텐츠를 이루는 핵심 축
                </span>
                <span className="hidden lg:inline">
                  민정님만의 콘텐츠를 이루는 핵심 축
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-1">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 md:flex-col md:items-start md:gap-2 lg:flex-row lg:items-center lg:gap-3"
                >
                  <div className="hidden size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary lg:flex">
                    <CheckIcon />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="text-sm font-bold text-text-primary">
                      {pillar.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-bold text-text-primary">
              다음 콘텐츠 아이디어를 제안해요
            </h2>
            <p className="text-sm text-text-secondary">
              <span className="md:hidden">Creator Brain AI 추천 가이드</span>
              <span className="hidden md:inline lg:hidden">
                Creator Brain AI가 엄선한 영감
              </span>
              <span className="hidden lg:inline">
                Creator Brain AI가 영감을 불어넣는 세 가지 맞춤형 아이디어
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:gap-5">
            {ideas.map((idea) => (
              <article
                key={idea.title}
                className="flex flex-1 flex-col gap-5 rounded-[20px] border border-border bg-white p-6"
              >
                <span className="w-fit rounded bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                  {idea.tag}
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-base font-bold text-text-primary">
                    {idea.title}
                  </h3>
                  <p className="text-[13px] leading-normal text-text-secondary">
                    {idea.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-text-primary text-sm font-bold text-white"
                >
                  <StarIcon />
                  기획하기
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-1.5">
              <h2 className="text-lg font-bold text-text-primary">
                최근 분석에 활용된 콘텐츠
              </h2>
              <p className="text-sm text-text-secondary">
                <span className="md:hidden">수집된 데이터와 AI 분석</span>
                <span className="hidden md:inline lg:hidden">
                  수집된 데이터와 AI 분석 맵핑
                </span>
                <span className="hidden lg:inline">
                  가장 최근 수집된 데이터와 AI 분석 맵핑
                </span>
              </p>
            </div>
            <a
              href="#"
              className="hidden shrink-0 text-sm font-semibold text-primary underline md:inline"
            >
              전체 콘텐츠 보기
            </a>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
            {recentContents.map((content) => (
              <ContentCard
                key={content.title}
                variant="recent"
                {...content}
              />
            ))}
          </div>
          <a
            href="#"
            className="py-3 text-center text-sm font-semibold text-primary md:hidden"
          >
            전체 콘텐츠 보기
          </a>
        </section>
      </div>
    </div>
  );
}
