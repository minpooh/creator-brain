import SectionIndex from "./SectionIndex";
import IdeaCard from "./IdeaCard";

const ideas = [
  {
    category: "라이프스타일",
    title: "아침 루틴의 하루를 바꾸는 3가지 습관",
    views: "2.5만",
    productionTime: "3시간",
    mobileTitle: "아침 루틴의 하루를 바꾸는 3가지 습관",
  },
  {
    category: "가구/데코",
    title: "모던 미니멀 인테리어를 위한 아이템 추천",
    views: "1.8만",
    productionTime: "4.5시간",
    mobileTitle: "모던 미니멀 인테리어를 위한 가구 추천",
  },
  {
    category: "공간 리뷰",
    title: "나를 성장시키는 5가지 공간",
    views: "3.2만",
    productionTime: "5시간",
    mobileTitle: "나를 성장시키는 5가지 감성 공간",
  },
] as const;

export default function Ideas() {
  return (
    <section className="flex w-full flex-col gap-10 bg-white px-5 py-14 md:gap-12 md:px-10 md:py-20 lg:gap-14 lg:px-20 lg:py-[100px]">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <SectionIndex number="06" label="IDEAS" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[600px] text-[28px] font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl md:leading-[48px]">
            <span className="md:inline">다음 콘텐츠 </span>
            <span className="text-primary">아이디어를 제안해요</span>
          </h2>

          <p className="hidden max-w-[480px] text-sm leading-6 text-text-secondary lg:block lg:text-[15px]">
            데이터가 검증하는 고효율 핵심 주제를 선별하여 제공합니다. 예상되는
            시장의 성과 지표와 자원 효율을 바탕으로 가장 현명한 기획 결정을
            내리세요.
          </p>
        </div>
      </div>

      {/* Desktop: 3 cards */}
      <div className="hidden gap-6 lg:flex">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.title}
            category={idea.category}
            title={idea.title}
            views={idea.views}
            productionTime={idea.productionTime}
            variant="card"
          />
        ))}
      </div>

      {/* Tablet: horizontal rows */}
      <div className="hidden flex-col gap-4 md:flex lg:hidden">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.title}
            category={idea.category}
            title={idea.title}
            views={idea.views}
            variant="row"
          />
        ))}
      </div>

      {/* Mobile: compact cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {ideas.map((idea, index) => (
          <IdeaCard
            key={idea.mobileTitle}
            category={idea.category}
            title={idea.mobileTitle}
            views={idea.views}
            variant="compact"
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
