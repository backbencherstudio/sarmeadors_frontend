"use client";
import { useGetAgencyStatusStatisticsQuery } from "@/feature/slice/agency/agencyDashboardSlice";
import StatCards from "./StatCards";

function AgencyStateInfo() {
  const { data, isLoading, isError } = useGetAgencyStatusStatisticsQuery(
    "agency-status-statistics",
  );
  const statCards = [
    {
      title: "Pre Application",
      value: 195,
      percentage: "0.1%",
    },
    {
      title: "Application Started",
      value: 7,
      percentage: "0.8%",
    },
    {
      title: "Applied",
      value: 18,
      percentage: "1.5%",
    },
    {
      title: "Inactive",
      value: 635,
      percentage: "72.6%",
    },
    {
      title: "Initial Payment Made",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Consultation Booked",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Consultation Complete",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Job Posted",
      value: 97,
      percentage: "3.2%",
    },
  ];
  console.log(data, "data======");

  return (
    <div>
      {" "}
      <StatCards statCards={data?.data} isLoading={isLoading} />
    </div>
  );
}

export default AgencyStateInfo;
