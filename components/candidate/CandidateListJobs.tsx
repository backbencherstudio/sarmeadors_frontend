"use client";

import { currentJobs } from "@/demoData/DashboardData";
import dayjs, { Dayjs } from "dayjs";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import CandidatejobsCard from "./CandidatejobsCard";

type JobFilter = "all" | "short" | "long";

function CandidateListJobs() {
  const jobs = currentJobs;
  const [filter, setFilter] = useState<JobFilter>("all");
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const filterOptions: {
    key: JobFilter;
    label: string;
    dotClass: string;
  }[] = [
    { key: "all", label: "All Jobs", dotClass: "bg-blackColor" },
    { key: "short", label: "Short-Term Jobs", dotClass: "bg-greenColor" },
    { key: "long", label: "Long-Term Jobs", dotClass: "bg-blueColor" },
  ];

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    const formattedDate = selectedDate.format("YYYY-MM-DD");

    // Filter by selected date
    filtered = filtered.filter((job) => job.startDate === formattedDate);

    // Filter by job type
    if (filter !== "all") {
      filtered = filtered.filter(
        (job) =>
          (filter === "short" && job.jobType === "Short-term") ||
          (filter === "long" && job.jobType === "Long-term"),
      );
    }
    return filtered;
  }, [filter, selectedDate]);

  const handleToday = () => {
    setSelectedDate(dayjs());
  };

  const handlePrev = () => {
    setSelectedDate(selectedDate.subtract(1, "day"));
  };

  const handleNext = () => {
    setSelectedDate(selectedDate.add(1, "day"));
  };

  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="rounded-md border border-borderColor px-4 py-3">
            <Search className="h-5 w-5 text-blackColor" />
          </div>
          <div className="min-w-0 max-w-full overflow-x-auto rounded-md border border-borderColor px-2 py-1.5 md:w-[411px]">
            <div className="flex w-max min-w-max flex-nowrap items-center gap-3">
              {filterOptions.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={`flex shrink-0 items-center gap-1 cursor-pointer rounded-sm py-2 px-3 text-sm font-medium ${
                    filter === item.key
                      ? "bg-bgColor border border-borderColor"
                      : "text-secondaryColor"
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${item.dotClass}`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <CandidatejobsCard key={index} job={job} />
          ))
        ) : (
          <div className="text-center py-8 text-secondaryColor">
            No jobs found for {selectedDate.format("MMM DD, YYYY")}.
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateListJobs;
