"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetCandidateMyJobsListQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateDashboardSlice";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import dayjs, { Dayjs } from "dayjs";
import { X } from "lucide-react";
import { useState } from "react";
import SelecteInputField from "../common/InputFiled/SelecteInputField";
import DateIcon from "../icon/DateIcon";
import CandidatejobsCard from "./CandidatejobsCard";

type JobFilter = "all" | "short_term" | "long_term";
type JobStatusFilter = "all" | "running" | "cancelled" | "completed";

function CandidateListJobs() {
  const { updateParams, searchParams } = useUpdateQueryParams();

  const [filter, setFilter] = useState<JobFilter>(
    (searchParams.get("filter") as JobFilter) || "all",
  );
  const [statusFilter, setStatusFilter] = useState<JobStatusFilter>(
    (searchParams.get("status") as JobStatusFilter) || "all",
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    searchParams.get("date") ? dayjs(searchParams.get("date")) : null,
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append("view", "list");
    if (selectedDate) params.append("year", selectedDate.format("YYYY"));
    if (selectedDate) params.append("month", selectedDate.format("MM"));
    if (statusFilter && statusFilter !== "all")
      params.append("status", statusFilter);
    if (filter && filter !== "all") params.append("job_type", filter);
    return params.toString();
  };
  const { data } = useGetCandidateMyJobsListQuery({
    params: buildQueryParams().toString(),
  });

  const handleFilterChange = (value: JobFilter) => {
    setFilter(value);
    updateParams("job_type", value);
  };

  const handleStatusFilterChange = (value: JobStatusFilter) => {
    setStatusFilter(value);
    updateParams("status", value);
  };

  const filterOptions: {
    key: JobFilter;
    label: string;
    dotClass: string;
  }[] = [
    { key: "all", label: "All Jobs", dotClass: "bg-blackColor" },
    { key: "short_term", label: "Short-Term Jobs", dotClass: "bg-greenColor" },
    { key: "long_term", label: "Long-Term Jobs", dotClass: "bg-blueColor" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "running", label: "Running Job" },
    { value: "cancelled", label: "Cancel Job" },
    { value: "completed", label: "Completed Job" },
  ];

  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-blackColor">All Jobs</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <button className="rounded-md cursor-pointer border border-borderColor px-4 py-3.5">
                  <DateIcon className="h-5 w-5 text-blackColor" />
                </button>
                {selectedDate && (
                  <button
                    title="Reset filter"
                    onClick={() => {
                      setSelectedDate(null);
                      updateParams("date", "");
                    }}
                    className="rounded-md absolute bg-red-100 -top-1.5 -right-1.5 text-redColor  cursor-pointer border border-redColor "
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate ? selectedDate.toDate() : undefined}
                onSelect={(date) => {
                  setSelectedDate(date ? dayjs(date) : null);
                  updateParams(
                    "date",
                    date ? dayjs(date).format("YYYY-MM-DD") : "",
                  );
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
                  onClick={() => handleFilterChange(item.key)}
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
            onValueChange={(value) =>
              handleStatusFilterChange(value as JobStatusFilter)
            }
            options={statusOptions}
            className="h-10! bg-white! w-[150px]! shadow-none! px-3 py-2 text-sm text-blackColor"
          />
        </div>
      </div>

      <div className="space-y-6">
        {data?.data?.jobs?.length > 0 ? (
          data?.data?.jobs?.map((job, index) => (
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
