import AgencyStatsCards from "@/components/super-admin/AgencyStatsCards";
import AgencyTable from "@/components/super-admin/AgencyTable";
import DashboardTable from "@/components/super-admin/DashboardTable";

export default function page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl text-[#2E3542] font-semibold">
        Agency Management
      </h1>
      <div className="my-8">
        <AgencyStatsCards />
      </div>
      <AgencyTable />
    </div>
  );
}
