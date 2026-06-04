"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { useState } from "react";

type Props = {
  field: any;
};

const defaultTimes = {
  start: "12:00",
  end: "12:30",
};

export default function TimeAvailabilityRenderer({ field }: Props) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: false,
    Saturday: false,
  });
  const [times, setTimes] = useState<
    Record<string, { start: string; end: string }>
  >(Object.fromEntries(days.map((day) => [day, { ...defaultTimes }])));

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Set Time Availability"}
        {field.required && " *"}
      </label>
      <div className="space-y-2.5">
        {days.map((day) => {
          const isOn = enabled[day];
          const time = times[day];
          return (
            <div key={day} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setEnabled((prev) => ({ ...prev, [day]: !prev[day] }))
                }
                className={`relative w-8 h-4 rounded-full transition-colors shrink-0 ${
                  isOn ? "bg-blackColor" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                    isOn ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-xs flex-1 ${isOn ? "text-headerColor" : "text-gray-300"}`}
              >
                {day}
              </span>
              {isOn ? (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <ReusableInput
                    type="time"
                    value={time.start}
                    onChange={(e) =>
                      setTimes((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], start: e.target.value },
                      }))
                    }
                    className="w-24! h-10! md:h-10!  text-xs! px-1!"
                    containerClassName="!m-0"
                  />
                  <span>—</span>
                  <ReusableInput
                    type="time"
                    value={time.end}
                    onChange={(e) =>
                      setTimes((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], end: e.target.value },
                      }))
                    }
                    className="w-24! h-10! md:h-10! text-xs! px-1!"
                    containerClassName="!m-0"
                  />
                </div>
              ) : (
                <span className="text-xs text-gray-300">Unavailable</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
