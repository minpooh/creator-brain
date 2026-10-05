import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardRoot from "@/components/dashboard/DashboardRoot";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) {
    return null;
  }

  const { data: contents, error } = await supabase
  .from("contents")
  .select("*")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });

  if(error) {
    console.error("콘텐츠 조회 실패:", error);
  }

  const initialContents = 
  contents?.map((content) => ({
    platform: content.platform,
    url: content. url ?? "",
    title: content.title,
    contentType: content.content_type,
    memo: content.description ?? "",
  })) ?? [];

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />
      <DashboardRoot initialContents={initialContents}/>
    </div>
  );
}
