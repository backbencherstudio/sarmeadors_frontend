"use client";
import CandidatejobsCard from "@/components/candidate/CandidatejobsCard";
import { currentJobs } from "@/demoData/DashboardData";
import { useMemo } from "react";

export default function RunningJob({ title }: { title: string }) {
  const filteredJobs = useMemo(() => {
    let filtered = currentJobs;

    return filtered;
  }, []);
  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-blackColor">{title}</h2>
      </div>

      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <CandidatejobsCard key={index} job={job} />
          ))
        ) : (
          <div className="text-center py-8 text-secondaryColor">
            No jobs found for selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
