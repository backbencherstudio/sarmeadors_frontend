import { useState } from "react";

type InterviewFilter =
  | "all"
  | "requested"
  | "scheduled"
  | "rescheduled"
  | "completed"
  | "cancled";
export default function InterviewScheduledFilterType() {
  const [filter, setFilter] = useState<InterviewFilter>("all");
  const filterOptions: {
    key: InterviewFilter;
    label: string;
    dotClass: string;
  }[] = [
    { key: "all", label: "All Jobs", dotClass: "bg-blackColor" },
    { key: "requested", label: "Requested", dotClass: "bg-requestedColor" },
    { key: "scheduled", label: "Scheduled", dotClass: "bg-scheduledColor" },
    {
      key: "rescheduled",
      label: "Rescheduled",
      dotClass: "bg-rescheduledColor",
    },
    { key: "completed", label: "Completed", dotClass: "bg-completeddColor" },
    { key: "cancled", label: "Cancled", dotClass: "bg-cancledColor" },
  ];
  return (
    <div>
      <div className="min-w-0 max-w-full overflow-x-auto rounded-md border border-borderColor px-2 py-1.5">
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
              {item.dotClass && (
                <span className={`h-3 w-3 rounded-full ${item.dotClass}`} />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
