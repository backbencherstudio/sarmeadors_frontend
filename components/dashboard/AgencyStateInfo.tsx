"use client";
import { useGetAgencyStatusStatisticsQuery } from "@/feature/slice/agency/agencyDashboardSlice";
import StatCards from "./StatCards";

function AgencyStateInfo() {
  const { data, isLoading, isError } = useGetAgencyStatusStatisticsQuery(
    "agency-status-statistics",
  );

  return (
    <div>
      {" "}
      <StatCards statCards={data?.data || []} isLoading={isLoading} />
    </div>
  );
}

export default AgencyStateInfo;
