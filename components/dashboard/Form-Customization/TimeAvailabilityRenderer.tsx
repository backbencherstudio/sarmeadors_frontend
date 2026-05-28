"use client";

import { useState } from "react";

type Props = {
  field: any;
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

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Set Time Availability"}
        {field.required && " *"}
      </label>
      <div className="space-y-2.5">
        {days.map((day) => {
          const isOn = enabled[day];
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
                  <span>12:00 PM</span>
                  <span>—</span>
                  <span>12:30 PM</span>
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
