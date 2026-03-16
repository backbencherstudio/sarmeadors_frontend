"use client";

import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { useState } from "react";
import SelecteInputField from "../common/InputFiled/SelecteInputField";
import CandidateTemporaryUnavailable from "./CandidateTemporaryUnavailable";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type DayState = {
  enabled: boolean;
  start: string;
  end: string;
};

const defaultTime = "12:00PM";

function AvailabilityPage() {
  const [timezone, setTimezone] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [days, setDays] = useState<DayState[]>(
    DAYS.map((_, i) => ({
      enabled: i <= 4, // Sun–Thu on by default, Fri–Sat off
      start: defaultTime,
      end: defaultTime,
    })),
  );

  const toggleDay = (index: number) => {
    setDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, enabled: !d.enabled } : d)),
    );
  };

  const updateTime = (index: number, field: "start" | "end", value: string) => {
    setDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)),
    );
  };

  const copyTime = (index: number) => {
    const src = days[index];
    setDays((prev) =>
      prev.map((d, i) =>
        i !== index && d.enabled ? { ...d, start: src.start, end: src.end } : d,
      ),
    );
  };

  const timeOptions = [
    "12:00AM",
    "1:00AM",
    "2:00AM",
    "3:00AM",
    "4:00AM",
    "5:00AM",
    "6:00AM",
    "7:00AM",
    "8:00AM",
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
    "9:00PM",
    "10:00PM",
    "11:00PM",
  ];

  const timezoneOptions = [
    { value: "utc", label: "UTC +00:00" },
    { value: "est", label: "Eastern Time (ET)" },
    { value: "cst", label: "Central Time (CT)" },
    { value: "mst", label: "Mountain Time (MT)" },
    { value: "pst", label: "Pacific Time (PT)" },
  ];

  const timeSelectOptions = timeOptions.map((time) => ({
    value: time,
    label: time,
  }));

  return (
    <section className="space-y-5 max-w-3xl w-full ">
      <h2 className="text-xl font-semibold text-blackColor">My Availability</h2>

      {/* Time Zone */}
      <div className="space-y-2">
        <label className="text-base font-semibold block text-blackColor">
          Time Zone
        </label>
        <SelecteInputField
          value={timezone}
          onValueChange={setTimezone}
          options={timezoneOptions}
          placeholder="Select time zone"
          className="w-full bg-white! border border-borderColor text-secondaryColor"
        />
      </div>

      {/* Set Time Availability */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-blackColor">
          Set Time Availability
        </h3>
        <div className="rounded-xl border border-borderColor bg-white ">
          {DAYS.map((day, index) => {
            const d = days[index];
            return (
              <div
                key={day}
                className="flex items-center gap-2 md:gap-3 px-3 sm:px-4 py-3.5"
              >
                <Switch
                  checked={d.enabled}
                  onCheckedChange={() => toggleDay(index)}
                />
                <span
                  className={`w-24 text-sm font-medium ${
                    d.enabled ? "text-blackColor" : "text-secondaryColor"
                  }`}
                >
                  {day}
                </span>

                {d.enabled ? (
                  <div className="ml-auto flex change-arrow items-center gap-1 justify-between md:justify-end w-full md:gap-2">
                    <SelecteInputField
                      value={d.start}
                      onValueChange={(value) =>
                        updateTime(index, "start", value)
                      }
                      options={timeSelectOptions}
                      className="h-10! md:h-9! w-[58px] md:w-[98px]! flex justify-center! bg-white! border border-borderColor px-2 py-1 text-sm text-blackColor"
                    />

                    <span className="text-secondaryColor">—</span>

                    <SelecteInputField
                      value={d.end}
                      onValueChange={(value) => updateTime(index, "end", value)}
                      options={timeSelectOptions}
                      className="h-10! md:h-9! w-[58px] md:w-[98px]! flex justify-center! bg-white! border border-borderColor px-2 py-1 text-sm text-blackColor"
                    />

                    <button
                      type="button"
                      onClick={() => copyTime(index)}
                      className="rounded border border-borderColor p-1.5 text-secondaryColor hover:bg-bgColor"
                      title="Copy time to all enabled days"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <span className="ml-auto py-3 text-sm text-secondaryColor ">
                    Unavailable
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Temporary Unavailable component */}
      <CandidateTemporaryUnavailable />
    </section>
  );
}

export default AvailabilityPage;
