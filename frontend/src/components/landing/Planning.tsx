import SectionIndex from "./SectionIndex";
import PlanningStepCard from "./PlanningStepCard";
import StoryPreviewCard from "./StoryPreviewCard";

const desktopSteps = [
  {
    number: "01",
    title: "인트로 훅 빌딩",
    description:
      "시청자의 이탈을 막을 수 있는 매력적이고 자연스러운 첫 5초의 비주얼과 질문을 설계합니다.",
  },
  {
    number: "02",
    title: "핵심 스토리라인 구조화",
    description:
      "전하고자 하는 가치가 논리적이면서도 극적인 리듬을 가지도록 주요 구간별 흐름을 정리합니다.",
  },
  {
    number: "03",
    title: "콜 투 액션 (CTA) 매핑",
    description:
      "공유, 저장, 채널 팔로우로 연결될 최적의 전환 지점과 매력적인 리워드를 결정합니다.",
  },
] as const;

const tabletSteps = desktopSteps.slice(0, 2);

const mobileSteps = [
  {
    number: "01",
    title: "인트로 훅 빌딩",
    description:
      "시청자 이탈을 막을 수 있는 매력적인 첫 5초의 비주얼과 질문 설계",
  },
  {
    number: "02",
    title: "스토리라인 구조화",
    description: "주요 내용이 균형감과 리듬감을 가지도록 흐름 정리",
  },
] as const;

const storySegments = [
  {
    label: "Intro (0~5s)",
    content: "감각적 주방 클로즈업 + 자막 레이아웃",
  },
  {
    label: "Body 1 (5~15s)",
    content: "문제 제기: 바쁜 아침의 일상적인 고민",
  },
  {
    label: "Body 2 (15~40s)",
    content: "해결책: 세 가지 루틴 아이템의 작동",
  },
  {
    label: "Outro (40~60s)",
    content: "오디언스 참여 유도 및 다음 영상 예고",
  },
] as const;

export default function Planning() {
  return (
    <section className="flex w-full flex-col gap-10 bg-surface px-5 py-14 md:gap-12 md:px-10 md:py-20 lg:gap-14 lg:px-20 lg:py-[100px]">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <SectionIndex number="07" label="PLANNING" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[600px] text-[28px] font-extrabold leading-tight tracking-tight text-text-primary md:text-4xl md:leading-[48px]">
            아이디어를 콘텐츠로
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            <span className="text-primary">구체화해요</span>
          </h2>

          <p className="hidden max-w-[480px] text-sm leading-6 text-text-secondary lg:block lg:text-[15px]">
            단순 아이디어에 머무르지 않도록 대본 아웃라인, 시각 장치 묘사, 연출
            흐름 및 성공 보장 체크리스트를 구조적으로 자동 정렬해 줍니다.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden items-center gap-10 lg:flex">
        <div className="flex flex-1 flex-col gap-4">
          {desktopSteps.map((step) => (
            <PlanningStepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        <StoryPreviewCard segments={storySegments} />
      </div>

      {/* Tablet layout */}
      <div className="hidden flex-col gap-4 md:flex lg:hidden">
        {tabletSteps.map((step) => (
          <PlanningStepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            size="sm"
          />
        ))}
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {mobileSteps.map((step) => (
          <PlanningStepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            size="sm"
          />
        ))}
      </div>
    </section>
  );
}
