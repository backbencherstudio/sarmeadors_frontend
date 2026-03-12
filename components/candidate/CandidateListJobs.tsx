"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currentJobs } from "@/demoData/DashboardData";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import SelecteInputField from "../common/InputFiled/SelecteInputField";
import DateIcon from "../icon/DateIcon";
import CandidatejobsCard from "./CandidatejobsCard";

type JobFilter = "all" | "short" | "long";
type JobStatusFilter = "all" | "running" | "cancel" | "complete";

function CandidateListJobs() {
  const [filter, setFilter] = useState<JobFilter>("all");
  const [statusFilter, setStatusFilter] = useState<JobStatusFilter>("all");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const filterOptions: {
    key: JobFilter;
    label: string;
    dotClass: string;
  }[] = [
    { key: "all", label: "All Jobs", dotClass: "bg-blackColor" },
    { key: "short", label: "Short-Term Jobs", dotClass: "bg-greenColor" },
    { key: "long", label: "Long-Term Jobs", dotClass: "bg-blueColor" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "running", label: "Running Job" },
    { value: "cancel", label: "Cancel Job" },
    { value: "complete", label: "Complete Job" },
  ];

  const filteredJobs = useMemo(() => {
    let filtered = currentJobs;

    if (selectedDate) {
      filtered = filtered.filter((job) => {
        const jobDay = dayjs(job.startDate);
        return jobDay.isValid() && jobDay.isSame(selectedDate, "day");
      });
    }

    if (filter !== "all") {
      filtered = filtered.filter(
        (job) =>
          (filter === "short" && job.jobType === "Short-term") ||
          (filter === "long" && job.jobType === "Long-term"),
      );
    }

    if (statusFilter !== "all") {
      if (statusFilter === "complete") {
        filtered = filtered.filter((job) => job.status === "completed");
      } else if (statusFilter === "cancel") {
        filtered = filtered.filter(
          (job) => job.status === "cancel" || job.status === "cancelled",
        );
      } else {
        filtered = filtered.filter((job) => job.status === statusFilter);
      }
    }

    return filtered;
  }, [filter, selectedDate, statusFilter]);

  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-blackColor">All Jobs</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button className="rounded-md cursor-pointer border border-borderColor px-4 py-3.5">
                <DateIcon className="h-5 w-5 text-blackColor" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate ? selectedDate.toDate() : undefined}
                onSelect={(date) => {
                  setSelectedDate(date ? dayjs(date) : null);
                  setCalendarOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="min-w-0 max-w-full overflow-x-auto rounded-md border border-borderColor px-2 py-1.5 md:w-[425px]">
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
          <SelecteInputField
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as JobStatusFilter)}
            options={statusOptions}
            className="h-10! bg-white! w-[150px]! px-3 py-2 text-sm text-blackColor"
          />
        </div>
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

export default CandidateListJobs;
