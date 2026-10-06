import AnalysisReportPreview from "@/components/dashboard/AnalysisReportPreview";
import ContentCard from "@/components/dashboard/ContentCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getContentThumbnailUrl } from "@/lib/dashboard/thumbnail";
import { createClient } from "@/lib/supabase/server";

interface DirectionPriority {
  title: string;
  description: string;
  reason: string;
}

interface ContentDirection {
  summary: string;
  mainPillar: string;
  subPillars: string[];
  tone: string;
  priorities: DirectionPriority[];
}

interface Recommendation {
  title: string;
  pillar: string;
  description: string;
  reason: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJsonValue(value: unknown): unknown {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0,
  );
}

function parseStrengths(value: unknown) {
  const parsed = parseJsonValue(value);

  if (!isRecord(parsed)) {
    return { strengths: [] as string[], patterns: [] as string[] };
  }

  return {
    strengths: stringList(parsed.strengths),
    patterns: stringList(parsed.patterns),
  };
}

function parseDirection(value: unknown): ContentDirection {
  const parsed = parseJsonValue(value);
  const empty: ContentDirection = {
    summary: "",
    mainPillar: "",
    subPillars: [],
    tone: "",
    priorities: [],
  };

  if (!isRecord(parsed)) return empty;

  const priorities = Array.isArray(parsed.priorities)
    ? parsed.priorities.flatMap((item) => {
        if (!isRecord(item) || typeof item.title !== "string") return [];
        const title = item.title.trim();
        if (!title) return [];

        return [
          {
            title,
            description:
              typeof item.description === "string" ? item.description : "",
            reason: typeof item.reason === "string" ? item.reason : "",
          },
        ];
      })
    : [];

  return {
    summary: typeof parsed.summary === "string" ? parsed.summary : "",
    mainPillar: typeof parsed.mainPillar === "string" ? parsed.mainPillar : "",
    subPillars: stringList(parsed.subPillars),
    tone: typeof parsed.tone === "string" ? parsed.tone : "",
    priorities,
  };
}

function parseRecommendations(value: unknown): Recommendation[] {
  const parsed = parseJsonValue(value);
  if (!Array.isArray(parsed)) return [];

  return parsed.flatMap((item) => {
    if (!isRecord(item) || typeof item.title !== "string") return [];
    const title = item.title.trim();
    if (!title) return [];

    return [
      {
        title,
        pillar: typeof item.pillar === "string" ? item.pillar : "",
        description:
          typeof item.description === "string" ? item.description : "",
        reason: typeof item.reason === "string" ? item.reason : "",
      },
    ];
  });
}

function displayName(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}) {
  const metadataName =
    (typeof user.user_metadata?.full_name === "string" &&
      user.user_metadata.full_name) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name) ||
    "";
  const fallback = user.email?.split("@")[0] ?? "사용자";
  const base = metadataName.trim() || fallback;

  return base.endsWith("님") ? base : `${base}님`;
}

function formatCount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toLocaleString("ko-KR");
  }

  if (typeof value === "string" && value.trim()) return value;

  return "0";
}

function contentTypeLabel(contentType: unknown, platform: unknown) {
  if (typeof contentType === "string" && contentType.trim()) return contentType;
  if (typeof platform === "string" && platform.trim()) return platform;
  return "콘텐츠";
}

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

export default async function DashboardAnalyzed() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const name = displayName(user);

  const { data: analysis, error: analysisError } = await supabase
    .from("analyses")
    .select(
      "identity, strengths, direction, recommendations, analyzed_content_count",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (analysisError || !analysis) {
    console.error("분석 결과 조회 실패:", analysisError);

    return (
      <div className="min-h-screen bg-surface">
        <DashboardHeader />
        <div className="mx-auto flex w-full max-w-[1440px] px-4 py-10 md:px-10 lg:px-[120px]">
          <p className="text-sm text-text-secondary">
            분석 결과를 불러오지 못했습니다.
          </p>
        </div>
      </div>
    );
  }

  const { data: contentRows, error: contentsError } = await supabase
    .from("contents")
    .select("id, platform, content_type, title, url, views, likes")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (contentsError) {
    console.error("콘텐츠 조회 실패:", contentsError);
  }

  const { strengths, patterns } = parseStrengths(analysis.strengths);
  const direction = parseDirection(analysis.direction);
  const recommendations = parseRecommendations(analysis.recommendations);
  const identity =
    typeof analysis.identity === "string" && analysis.identity.trim()
      ? analysis.identity
      : "콘텐츠 정체성 분석 결과";
  const contentCount =
    typeof analysis.analyzed_content_count === "number"
      ? analysis.analyzed_content_count
      : (contentRows?.length ?? 0);

  const pillars = [
    ...(direction.mainPillar
      ? [{ title: direction.mainPillar, description: "메인 콘텐츠 축" }]
      : []),
    ...direction.subPillars.map((title) => ({
      title,
      description: "세부 콘텐츠 축",
    })),
  ];

  const recentContents = (contentRows ?? []).map((content) => ({
    id: String(content.id),
    thumbnail: getContentThumbnailUrl(
      typeof content.url === "string" ? content.url : "",
    ),
    type: contentTypeLabel(content.content_type, content.platform),
    title: typeof content.title === "string" ? content.title : "제목 없음",
    views: formatCount(content.views),
    likes: formatCount(content.likes),
  }));

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-10 lg:gap-10 lg:px-[120px] lg:py-[60px]">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-[28px]">
            {name}의 콘텐츠를 분석했어요 ✨
          </h1>
          <p className="text-[13px] leading-normal text-text-secondary md:text-sm lg:text-[15px]">
            당신의 강점 패턴을 분석해 나만의 독창적인 핵심 아이덴티티와 성장을
            위한 다음 가이드를 도출했습니다.
          </p>
        </section>

        <AnalysisReportPreview
          identity={identity}
          summary={direction.summary}
          contentCount={contentCount}
          tone={direction.tone}
          strengths={strengths}
          patterns={patterns}
        />

        {direction.priorities.length > 0 || pillars.length > 0 ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            {direction.priorities.length > 0 ? (
              <section className="flex flex-1 flex-col gap-5 rounded-2xl border border-border bg-white p-5 md:rounded-[20px] md:p-7 lg:rounded-3xl lg:p-8">
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg font-bold text-text-primary">
                    이런 방향으로 나아가면 좋아요
                  </h2>
                  <p className="text-sm text-text-secondary">
                    <span className="md:hidden">
                      {name}에게 추천하는 로드맵
                    </span>
                    <span className="hidden md:inline lg:hidden">
                      {name}의 고유 패턴을 분석하여 제안하는 가이드
                    </span>
                    <span className="hidden lg:inline">
                      {name}의 고유 패턴을 분석하여 제안하는 추천 콘텐츠
                      방향성입니다.
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {direction.priorities.map((step, index) => (
                    <div
                      key={`${step.title}-${index}`}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary-border bg-primary-soft text-[11px] font-bold text-primary md:size-8 md:text-[13px]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <p className="text-sm font-bold text-text-primary md:text-[15px]">
                          {step.title}
                        </p>
                        <p className="text-xs text-text-secondary md:text-[13px]">
                          {step.description || step.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {pillars.length > 0 ? (
              <section className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-5 md:rounded-[20px] md:p-7 lg:w-[480px] lg:shrink-0 lg:rounded-3xl lg:p-8">
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg font-bold text-text-primary">
                    콘텐츠 핵심 필러
                  </h2>
                  <p className="text-sm text-text-secondary">
                    <span className="md:hidden">콘텐츠를 이루는 핵심 가치</span>
                    <span className="hidden md:inline lg:hidden">
                      콘텐츠를 이루는 핵심 축
                    </span>
                    <span className="hidden lg:inline">
                      {name}만의 콘텐츠를 이루는 핵심 축
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1">
                  {pillars.map((pillar, index) => (
                    <div
                      key={`${pillar.title}-${index}`}
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
            ) : null}
          </div>
        ) : null}

        {recommendations.length > 0 ? (
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
                  Creator Brain AI가 제안하는 맞춤형 아이디어
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-5">
              {recommendations.map((idea, index) => (
                <article
                  key={`${idea.title}-${index}`}
                  className="flex w-full flex-col gap-5 rounded-[20px] border border-border bg-white p-6 md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                >
                  {idea.pillar ? (
                    <span className="w-fit rounded bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                      {idea.pillar}
                    </span>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-base font-bold text-text-primary">
                      {idea.title}
                    </h3>
                    <p className="text-[13px] leading-normal text-text-secondary">
                      {idea.description || idea.reason}
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
        ) : null}

        {recentContents.length > 0 ? (
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
                  key={content.id}
                  variant="recent"
                  thumbnail={content.thumbnail}
                  type={content.type}
                  title={content.title}
                  views={content.views}
                  likes={content.likes}
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
        ) : null}
      </div>
    </div>
  );
}
