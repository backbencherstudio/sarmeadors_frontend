import TemplatesTable from "@/components/clients/Templates/TemplatesTable";
import DashboardTable from "@/components/super-admin/DashboardTable";
import StatsRow from "@/components/super-admin/StatsRow";
import WelcomeBanner from "@/components/super-admin/WelcomeBanner";

export default function page() {
  return (
    <div className="p-6">
      <WelcomeBanner />
      <div className="mt-6">
        <StatsRow />
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
        <DashboardTable />
      </div>
    </div>
  );
}
