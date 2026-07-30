"use client";
import AgencyStatsCards from "@/components/super-admin/AgencyStatsCards";
import AgencyTable from "@/components/super-admin/AgencyTable";
import DashboardTable from "@/components/super-admin/DashboardTable";
import { useGetAllAgenciesQuery } from "@/feature/dashboard/super-admin/agency";

export default function AgenciesPage() {
  const { data: agenciesData } = useGetAllAgenciesQuery({ per_page: 1 });

  return (
    <div className="p-6">
      <h1 className="text-2xl text-[#2E3542] font-semibold">
        Agency Management
      </h1>
      <div className="my-8">
        <AgencyStatsCards
          total_agencies={agenciesData?.total_agencies ?? 0}
          active_agencies={agenciesData?.active_agencies ?? 0}
          suspended_agencies={agenciesData?.suspended_agencies ?? 0}
        />
      </div>
      <AgencyTable />
    </div>
  );
}
