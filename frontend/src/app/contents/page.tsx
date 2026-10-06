import ContentCard from "@/components/dashboard/ContentCard";
import Header from "@/components/common/Header";
import { getContentThumbnailUrl } from "@/lib/dashboard/thumbnail";
import { createClient } from "@/lib/supabase/server";

const platformLabels: Record<string, string> = {
  YouTube: "유튜브 비디오",
  Instagram: "인스타그램 피드",
  Blog: "블로그",
};

function formatCount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toLocaleString("ko-KR");
  }

  if (typeof value === "string" && value.trim()) return value;

  return "0";
}

function formatDate(value: unknown) {
  if (typeof value !== "string") return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

function contentTypeLabel(platform: unknown, contentType: unknown) {
  if (typeof platform === "string" && platformLabels[platform]) {
    return platformLabels[platform];
  }

  if (typeof contentType === "string" && contentType.trim()) return contentType;
  if (typeof platform === "string" && platform.trim()) return platform;

  return "콘텐츠";
}

export default async function ContentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: contents, error } = await supabase
    .from("contents")
    .select("id, platform, content_type, title, url, views, likes, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("콘텐츠 조회 실패:", error);
  }

  const contentList = (contents ?? []).map((content) => ({
    id: String(content.id),
    thumbnail: getContentThumbnailUrl(
      typeof content.url === "string" ? content.url : "",
    ),
    type: contentTypeLabel(content.platform, content.content_type),
    date: formatDate(content.created_at),
    title: typeof content.title === "string" ? content.title : "제목 없음",
    views: formatCount(content.views),
    likes: formatCount(content.likes),
  }));

  return (
    <div className="min-h-screen bg-surface">
      <Header activeHref="/contents" />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-10 lg:gap-10 lg:px-[120px] lg:py-[60px]">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-text-primary md:text-2xl lg:text-[28px]">
            내 콘텐츠
          </h1>
          <p className="text-[13px] leading-normal text-text-secondary md:text-sm lg:text-[15px]">
            등록한 콘텐츠를 최신순으로 모아두었습니다.
          </p>
        </section>

        {error ? (
          <p className="text-sm text-text-secondary">
            콘텐츠를 불러오지 못했습니다.
          </p>
        ) : contentList.length > 0 ? (
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-text-primary md:text-lg">
              등록된 콘텐츠 목록
            </h2>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {contentList.map((content) => (
                <ContentCard
                  key={content.id}
                  thumbnail={content.thumbnail}
                  type={content.type}
                  date={content.date}
                  title={content.title}
                  views={content.views}
                  likes={content.likes}
                />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-sm text-text-secondary">
            아직 등록된 콘텐츠가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
