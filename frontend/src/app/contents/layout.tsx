import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ContentsLayout({
  children,
}: LayoutProps<"/contents">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return children;
}
