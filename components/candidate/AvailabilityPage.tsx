"use client";

import { Switch } from "@/components/ui/switch";
import {
  useGetCandidateAvailabilabilityQuery,
  useUpdateCandidateAvailabilityMutation,
} from "@/feature/slice/candidate/candidate-dashboard/CandidateMyAvailablity";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import SelecteInputField from "../common/InputFiled/SelecteInputField";
import AvailabilitySkeleton from "./AvailabilitySkeleton";
import CandidateTemporaryUnavailable from "./CandidateTemporaryUnavailable";

type DayState = {
  id?: string | number;
  day_name: string;
  is_available: boolean;
  start_time: string;
  end_time: string;
};

const defaultTime = "12:00PM";

function convertTo24Hour(timeStr: string): string {
  if (!timeStr) return "00:00";
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return timeStr;

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const ampm = match[3].toUpperCase();

  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function AvailabilityPage() {
  const [timezone, setTimezone] = useState("utc");
  const { data, isLoading } =
    useGetCandidateAvailabilabilityQuery("availability");
  const [updateAvailability] = useUpdateCandidateAvailabilityMutation();
  const [days, setDays] = useState<DayState[]>([]);

  // Sync server data into local state initially
  useEffect(() => {
    if (data?.data?.availability?.days) {
      const formattedDays = data?.data?.availability?.days?.map((day: any) => ({
        id: day?.id,
        day_name: day?.day_name,
        is_available: !!day?.is_available,
        start_time: formatTimeForSelect(day?.start_time) || defaultTime,
        end_time: formatTimeForSelect(day?.end_time) || defaultTime,
      }));
      setDays(formattedDays);
    }
    if (data?.data?.availability?.timezone) {
      setTimezone(data?.data?.availability?.timezone);
    }
  }, [data]);


  useEffect(() => {
    if (days.length === 0) return;

    const delayDebounceFn = setTimeout(() => {
      const payload = {
        days: days.map((d) => {
          const dayName = d?.day_name ? d.day_name.toLowerCase() : "";
          const baseData: any = {
            day: dayName,
            is_available: !!d?.is_available,
          };

          if (d?.is_available) {
            baseData.from = convertTo24Hour(d.start_time);
            baseData.to = convertTo24Hour(d.end_time);
          }
          return baseData;
        }),
        timezone: timezone || "utc",
      };

      updateAvailability(payload);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [days, timezone, updateAvailability]);

  const toggleDay = (index: number) => {
    setDays((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, is_available: !d.is_available } : d,
      ),
    );
  };

  const updateTime = (
    index: number,
    field: "start_time" | "end_time",
    value: string,
  ) => {
    setDays((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)),
    );
  };

  const copyTime = (index: number) => {
    const src = days[index];
    setDays((prev) =>
      prev.map((d, i) =>
        i !== index && d.is_available
          ? { ...d, start_time: src.start_time, end_time: src.end_time }
          : d,
      ),
    );
  };

  function formatTimeForSelect(time: string | undefined | null): string {
    if (!time) return "";
    const parts = time.split(":");
    if (parts.length < 2) return time;
    const h = parseInt(parts[0], 10);
    const m = parts[1];
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m}${period}`;
  }

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
    {
      value: "Dateline Standard Time",
      label: "(UTC-12:00) International Date Line West",
    },
    { value: "Hawaiian Standard Time", label: "(UTC-10:00) Hawaii" },
    { value: "Alaskan Standard Time", label: "(UTC-09:00) Alaska" },
    {
      value: "Pacific Standard Time",
      label: "(UTC-08:00) Pacific Time (US & Canada)",
    },
    {
      value: "Mountain Standard Time",
      label: "(UTC-07:00) Mountain Time (US & Canada)",
    },
    {
      value: "Central Standard Time",
      label: "(UTC-06:00) Central Time (US & Canada)",
    },
    {
      value: "Eastern Standard Time",
      label: "(UTC-05:00) Eastern Time (US & Canada)",
    },
    {
      value: "Atlantic Standard Time",
      label: "(UTC-04:00) Atlantic Time (Canada)",
    },
    { value: "E. South America Standard Time", label: "(UTC-03:00) Brasilia" },
    {
      value: "Greenwich Standard Time",
      label: "(UTC+00:00) Monrovia, Reykjavik",
    },
    {
      value: "GMT Standard Time",
      label: "(UTC+00:00) Dublin, Edinburgh, Lisbon, London",
    },
    {
      value: "Central Europe Standard Time",
      label: "(UTC+01:00) Belgrade, Bratislava, Budapest",
    },
    { value: "E. Europe Standard Time", label: "(UTC+02:00) E. Europe" },
    { value: "Arabic Standard Time", label: "(UTC+03:00) Baghdad" },
    {
      value: "Russian Standard Time",
      label: "(UTC+03:00) Moscow, St. Petersburg",
    },
    { value: "Arabian Standard Time", label: "(UTC+04:00) Abu Dhabi, Muscat" },
    {
      value: "Pakistan Standard Time",
      label: "(UTC+05:00) Islamabad, Karachi",
    },
    {
      value: "India Standard Time",
      label: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    },
    { value: "Bangladesh Standard Time", label: "(UTC+06:00) Dhaka" },
    {
      value: "SE Asia Standard Time",
      label: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
    },
    {
      value: "China Standard Time",
      label: "(UTC+08:00) Beijing, Chongqing, Hong Kong",
    },
    {
      value: "Tokyo Standard Time",
      label: "(UTC+09:00) Osaka, Sapporo, Tokyo",
    },
    {
      value: "AUS Eastern Standard Time",
      label: "(UTC+10:00) Canberra, Melbourne, Sydney",
    },
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
          {isLoading ? (
            <div>
              <AvailabilitySkeleton />
            </div>
          ) : (
            days.map((day, index) => {
              return (
                <div
                  key={day?.id || index}
                  className="flex items-center gap-2 md:gap-3 px-3 sm:px-4 py-3.5"
                >
                  <Switch
                    checked={day?.is_available}
                    onCheckedChange={() => toggleDay(index)}
                  />
                  <span
                    className={`w-24 text-sm font-medium ${
                      day?.is_available
                        ? "text-blackColor"
                        : "text-secondaryColor"
                    }`}
                  >
                    {day?.day_name}
                  </span>

                  {day?.is_available ? (
                    <div className="ml-auto flex change-arrow items-center gap-1 justify-between md:justify-end w-full md:gap-2">
                      <SelecteInputField
                        value={day?.start_time}
                        onValueChange={(value) =>
                          updateTime(index, "start_time", value)
                        }
                        options={timeSelectOptions}
                        className="h-10! md:h-9! w-[58px] md:w-[98px]! flex justify-center! bg-white! border border-borderColor px-2 py-1 text-sm text-blackColor"
                      />

                      <span className="text-secondaryColor">—</span>

                      <SelecteInputField
                        value={day?.end_time}
                        onValueChange={(value) =>
                          updateTime(index, "end_time", value)
                        }
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
            })
          )}
        </div>
      </div>
      {/* Temporary Unavailable component */}
      <CandidateTemporaryUnavailable />
    </section>
  );
}

export default AvailabilityPage;
