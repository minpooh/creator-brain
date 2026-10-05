"use client";

import { useState } from "react";
import DashboardCollecting from "@/components/dashboard/DashboardCollecting";
import DashboardEmpty from "@/components/dashboard/DashboardEmpty";
import DashboardReady from "@/components/dashboard/DashboardReady";
import type { ContentRegistrationValues } from "@/components/dashboard/ContentRegistrationModal";
import { createClient } from "@/lib/supabase/client";

const ANALYSIS_READY_COUNT = 5;

interface DashboardRootProps {
  initialContents: ContentRegistrationValues[];
}

async function insertContent(values: ContentRegistrationValues) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("contents").insert({
    user_id: user.id,
    platform: values.platform,
    url: values.url,
    title: values.title,
    content_type: values.contentType,
    description: values.memo || null,
  });

  if (error) {
    throw error;
  }
}

export default function DashboardRoot({ initialContents }: DashboardRootProps) {
  const [contents, setContents] = useState<ContentRegistrationValues[]>(
    initialContents,
  );

  async function handleRegister(values: ContentRegistrationValues) {
    await insertContent(values);
    setContents((current) => [values, ...current]);
  }

  if (contents.length >= ANALYSIS_READY_COUNT) {
    return <DashboardReady />;
  }

  if (contents.length > 0) {
    return (
      <DashboardCollecting
        contents={contents}
        readyCount={ANALYSIS_READY_COUNT}
        onRegister={handleRegister}
      />
    );
  }

  return <DashboardEmpty onRegister={handleRegister} />;
}
