"use client";
import { useState } from "react";

type ShortTermJobFilter =
  | "running-job"
  | "marketplace"
  | "completed"
  | "pending"
  | "rejected"
  | "cancled";

export default function ShortTermJobFilterType() {
  const [filter, setFilter] = useState<ShortTermJobFilter>("running-job");
  const filterOptions: {
    key: ShortTermJobFilter;
    label: string;
    dotClass: string;
  }[] = [
    { key: "running-job", label: "Running Job", dotClass: "bg-[#AD0AFD]" },
    { key: "marketplace", label: "Marketplace", dotClass: "bg-[#0065FF]" },
    { key: "completed", label: "Completed", dotClass: "bg-[#04A755]" },
    { key: "pending", label: "Pending", dotClass: "bg-[#E5B400]" },
    {
      key: "rejected",
      label: "Rejected",
      dotClass: "bg-[#CB121D]",
    },
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
