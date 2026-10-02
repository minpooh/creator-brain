"use client";

import { useState } from "react";
import DashboardCollecting from "@/components/dashboard/DashboardCollecting";
import DashboardEmpty from "@/components/dashboard/DashboardEmpty";
import DashboardReady from "@/components/dashboard/DashboardReady";
import type { ContentRegistrationValues } from "@/components/dashboard/ContentRegistrationModal";

const ANALYSIS_READY_COUNT = 5;

export default function DashboardRoot() {
  const [contents, setContents] = useState<ContentRegistrationValues[]>([]);

  function handleRegister(values: ContentRegistrationValues) {
    setContents((current) => [...current, values]);
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
