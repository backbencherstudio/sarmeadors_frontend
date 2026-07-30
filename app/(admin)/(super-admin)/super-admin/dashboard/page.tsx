"use client";
import DashboardTable from "@/components/super-admin/DashboardTable";
import StatsRow from "@/components/super-admin/StatsRow";
import WelcomeBanner from "@/components/super-admin/WelcomeBanner";
import { useGetDashboardQuery } from "@/feature/dashboard/super-admin/dashboard";

export default function DashboardPage() {
  const { data: dashboardData, isLoading } = useGetDashboardQuery({});

  const dashboard = dashboardData?.data;

  return (
    <div className="p-6">
      <WelcomeBanner />
      <div className="mt-6">
        <StatsRow
          total_agencies={dashboard?.total_agencies}
          active_agencies={dashboard?.active_agencies}
          suspended_agencies={dashboard?.suspended_agencies}
          total_clients={dashboard?.total_clients}
          total_candidates={dashboard?.total_candidates}
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl text-[#111927] font-semibold">
              Recently Registered Agencies
            </h1>
            <p className="text-[#778593] text-base mt-1">
              Latest 10 agencies on the platform
            </p>
          </div>
          <div>
            <h1 className="text-[#111927] text-xl font-semibold">View all</h1>
          </div>
        </div>
        <DashboardTable
          recent_agencies={dashboard?.recent_agencies}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
