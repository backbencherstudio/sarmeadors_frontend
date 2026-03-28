"use client";
import CandidatejobsCard from "@/components/candidate/CandidatejobsCard";
import { currentJobs } from "@/demoData/DashboardData";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

export default function ShortTermJobViewList() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const filteredJobs = useMemo(() => {
    let filtered = currentJobs;

    if (selectedDate) {
      filtered = filtered.filter((job) => {
        const jobDay = dayjs(job.startDate);
        return jobDay.isValid() && jobDay.isSame(selectedDate, "day");
      });
    }

    return filtered;
  }, [selectedDate]);
  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-blackColor">All Jobs</h2>
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
