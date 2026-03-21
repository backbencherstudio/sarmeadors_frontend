"use client";

import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const periodOptions = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

const interviewOptions = [
  { value: "all", label: "All Interviews" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function CandidateInterviewFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPeriod = searchParams.get("period") || "month";
  const selectedInterview = searchParams.get("interview") || "all";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-[150px]">
        <SelecteInputField
          value={selectedPeriod}
          onValueChange={(value) => updateParam("period", value)}
          options={periodOptions}
          placeholder="Month"
          className=" border bg-whiteColor! border-borderColor px-3!  font-medium text-headerColor"
        />
      </div>

      <div className="w-[200px]">
        <SelecteInputField
          value={selectedInterview}
          onValueChange={(value) => updateParam("interview", value)}
          options={interviewOptions}
          placeholder="All Interviews"
          className=" border bg-whiteColor! border-borderColor px-3!  font-medium text-headerColor"
        />
      </div>
    </div>
  );
}

export default CandidateInterviewFilter;
