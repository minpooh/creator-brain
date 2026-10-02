import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardRoot from "@/components/dashboard/DashboardRoot";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />
      <DashboardRoot />
    </div>
  );
}
