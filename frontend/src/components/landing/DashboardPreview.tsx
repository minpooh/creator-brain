import StatCard from "./StatCard";

const stats = [
  {
    label: "총 분석 콘텐츠",
    value: "148개",
    description: "최근 30일 데이터 기준",
  },
  {
    label: "핵심 카테고리",
    value: "감각적 일상 · 여행",
    description: "정체성 일치도 94%",
  },
  {
    label: "다음 최적 발행 요일",
    value: "목요일 오후 7시",
    description: "평균 반응률 +24.5%",
  },
];

export default function DashboardPreview() {
  return (
    <div
      data-hero="dashboard"
      className="w-full max-w-[1000px] rounded-3xl border border-border bg-white p-6 shadow-[0_16px_16px_rgba(15,23,42,0.05)] md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary-bg">
            <span className="text-base font-extrabold text-primary">CB</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[15px] font-bold text-text-primary">
              크리에이터 스튜디오
            </p>
            <p className="text-xs text-text-secondary">
              @lifestyle_explorer
            </p>
          </div>
        </div>
        <div className="rounded-md bg-success-bg px-3 py-1.5">
          <p className="text-xs font-bold text-success">
            AI 상시 분석 활성화됨
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-border" />

      {/* Stats */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
