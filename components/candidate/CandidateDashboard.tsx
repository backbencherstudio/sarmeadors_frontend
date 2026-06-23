"use client";

import { useGetCandidateDashboardQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateDashboardSlice";
import UserInfo from "../clients/UserInfo";
import StatCards from "../dashboard/StatCards";
import CandidateCurrentJob from "./CandidateCurrentJob";
import CandidateHeroSection from "./CandidateHeroSection";
import CandidateJobsAvailable from "./CandidateJobsAvailable";

function CandidateDashboard() {
  const { data, isLoading, isError } = useGetCandidateDashboardQuery(
    "candidate-dashboard",
  );

  


  return (
    <div>
      <div className="md:p-6 p-3">
        <UserInfo clientInfo={data?.data?.candidate} />
        <div>
          <CandidateHeroSection />
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-blackColor mb-4">
            Status Statistics
          </h3>
          <StatCards  />
        </div>
        <div>
          <CandidateCurrentJob />
        </div>
        <div className="my-8">
          <CandidateJobsAvailable />
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;
