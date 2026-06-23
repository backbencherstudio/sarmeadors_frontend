"use client";

import { useGetCandidateDashboardQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateDashboardSlice";
import { Job } from "@/types";
import { AlertCircle } from "lucide-react";
import CandidatejobsCard from "./CandidatejobsCard";
import CandidateJobsCardSkeleton from "./candidate-skleton/CandidateJobsCardSkeleton";

function CandidateCurrentJob() {
  const { data, isLoading, isError } = useGetCandidateDashboardQuery(
    "candidate-dashboard",
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-blackColor">Running Job</h2>
      </div>
      <div className="space-y-5">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <CandidateJobsCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          data?.data?.running_jobs?.map((job: Job) => (
            <CandidatejobsCard key={job.id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}

export default CandidateCurrentJob;
