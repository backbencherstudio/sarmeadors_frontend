"use client";
import ClientJobList from "@/components/client/ClientMyJobs/ClientJobList";
import { useGetCandidateMarketPlaceShortTermJobQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMarketPlaceJobSlice";
import React from "react";

export default function ShortTermJobs() {
  const { data, isLoading, isError } =
    useGetCandidateMarketPlaceShortTermJobQuery("market-place");

  console.log("data=======", data?.data);

  return (
    <div>
      <div className="space-y-4">
        <ClientJobList
          userType="candidate"
          jobs={data?.data?.data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
