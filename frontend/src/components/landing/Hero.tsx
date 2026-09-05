import Badge from "./Badge";
import Button from "./Button";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-12 bg-surface px-5 py-16 md:px-20 md:py-20">
      {/* Text Block */}
      <div className="flex flex-col items-center gap-6">
        <Badge>AI 기반 1인 크리에이터 콘텐츠 분석 솔루션</Badge>

        <h1 className="max-w-[800px] text-center text-3xl font-extrabold leading-tight text-text-primary md:text-5xl md:leading-[64px]">
          당신의 콘텐츠를 이해하고
          <br />
          다음 콘텐츠의 방향을 찾아보세요
        </h1>

        <p className="max-w-[640px] text-center text-base leading-7 text-text-secondary md:text-lg md:leading-[28px]">
          매번 처음부터 고민하지 마세요. Creator Brain이 당신의 활동 이력과
          정체성을 종합 분석하여 가장 성공 확률이 높은 맞춤형 기획안을
          제시합니다.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="primary">내 채널 분석하기 (무료)</Button>
        <Button variant="secondary">데모 둘러보기</Button>
      </div>

      {/* Dashboard Preview */}
      <DashboardPreview />
    </section>
  );
}
