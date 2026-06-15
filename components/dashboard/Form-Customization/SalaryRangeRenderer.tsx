"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { useState } from "react";

type Props = {
  field: any;
};

const PERIODS = ["Hour", "Week", "Month", "Year"] as const;

export default function SalaryRangeRenderer({ field }: Props) {
  const [from, setFrom] = useState(field.value?.from ?? "");
  const [to, setTo] = useState(field.value?.to ?? "");
  const [period, setPeriod] = useState(field.value?.period ?? "Hour");

  const emitChange = (updates: Record<string, any>) => {
    const next = { from, to, period, ...updates };
    if (typeof field?.onChange === "function") {
      field.onChange(next);
    }
  };

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setFrom(v);
    emitChange({ from: v });
  };

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setTo(v);
    emitChange({ to: v });
  };

  const handlePeriod = (p: string) => {
    setPeriod(p);
    emitChange({ period: p });
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-semibold text-headerColor">
        {field.label || "Select Salary Range"}
        {field.required && " *"}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 items-end gap-2">
        <div className="flex-1 space-y-1">
          <span className="text-sm text-headerColor">From</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 z-10 pointer-events-none">
              $
            </span>
            <ReusableInput
              type="number"
              value={from}
              onChange={handleFrom}
              placeholder="0"
              className="pl-6! bg-bgColor!"
              containerClassName=""
            />
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className="text-sm text-headerColor">To</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 z-10 pointer-events-none">
              $
            </span>
            <ReusableInput
              type="number"
              value={to}
              onChange={handleTo}
              placeholder="0"
              className="pl-6! bg-bgColor!"
              containerClassName=""
            />
          </div>
        </div>
        <div className="flex-1 col-span-2 md:col-span-1 space-y-1">
          <span className="text-sm text-headerColor">Per</span>
          <div className="flex items-center justify-between border border-borderColor rounded-lg bg-bgColor px-2 py-1.5">
            {PERIODS.map((u) => (
              <button
                key={u}
                className={`text-sm cursor-pointer rounded-sm select-none ${
                  period === u
                    ? "text-headerColor shadow p-[9px] bg-whiteColor font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => handlePeriod(u)}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
