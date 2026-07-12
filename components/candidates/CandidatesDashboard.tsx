"use client";
import { useGetAgencyStatusStatisticsQuery } from "@/feature/slice/agency/agencyDashboardSlice";
import { TbNotes } from "react-icons/tb";
import { TiFlowMerge } from "react-icons/ti";
import StatCards from "../dashboard/StatCards";
import CandidatesListTable from "./CandidatesListTable";
import { useGetAgencyCandidatesStatisticsQuery } from "@/feature/slice/agency/agencyCandidateSlice";

function CandidatesDashboard() {
  const { data, isLoading } = useGetAgencyCandidatesStatisticsQuery(
    "AgencyStatusStatistics",
  );
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-blackColor">
            Status Statistics
          </h3>
          <div className="flex gap-2 md:gap-4 items-center">
            <button className="flex items-center md:px-4 px-2 py-2 md:py-3 text-sm md:text-base cursor-pointer rounded-md gap-2 border border-gray2Color ">
              <TiFlowMerge /> Process Flow
            </button>
            <button className="flex items-center md:px-4 px-2 py-2 md:py-3 text-sm md:text-base cursor-pointer rounded-md gap-2 border border-gray2Color ">
              <TbNotes /> View Application Form
            </button>
          </div>
        </div>
        <StatCards isLoading={isLoading} statCards={data?.data} />
      </div>

      <div className="mt-10">
        <CandidatesListTable />
      </div>
    </div>
  );
}

export default CandidatesDashboard;
