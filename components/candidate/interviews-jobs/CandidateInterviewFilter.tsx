"use client";

import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import { useEffect, useState } from "react";

const periodOptions = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function CandidateInterviewFilter({
  period,
  status,
  onChange,
}: {
  period: string;
  status: string;
  onChange: (values: {
    period?: string;
    status?: string;
  }) => void;
}) {
  const [localPeriod, setLocalPeriod] = useState(period);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    setLocalPeriod(period);
  }, [period]);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({
        period: localPeriod !== "month" ? localPeriod : undefined,
        status: localStatus !== "all" ? localStatus : "",
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [localPeriod, localStatus, onChange]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-[150px]">
        <SelecteInputField
          value={localPeriod}
          onValueChange={(value) => setLocalPeriod(value)}
          options={periodOptions}
          placeholder="Month"
          className="border bg-whiteColor! border-borderColor px-3! font-medium text-headerColor"
        />
      </div>

      <div className="w-[150px]">
        <SelecteInputField
          value={localStatus}
          onValueChange={(value) => setLocalStatus(value)}
          options={statusOptions}
          placeholder="All Status"
          className="border bg-whiteColor! border-borderColor px-3! font-medium text-headerColor"
        />
      </div>
    </div>
  );
}

export default CandidateInterviewFilter;
