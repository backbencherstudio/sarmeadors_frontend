"use client";
import { useGetCandidateMarketPlaceShortTermJobQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMarketPlaceJobSlice";
import React from "react";
import MarketPlaceJobList from "./MarketPlaceJobList";

export default function ShortTermJobs() {
  const { data, isLoading, isError } =
    useGetCandidateMarketPlaceShortTermJobQuery("market-place", {
      refetchOnMountOrArgChange: true,
    });

  // console.log("data=======", data?.data);

  return (
    <div>
      <div className="space-y-4">
        <MarketPlaceJobList
          userType="candidate"
          jobs={data?.data?.data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
