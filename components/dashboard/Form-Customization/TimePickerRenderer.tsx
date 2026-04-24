"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  field: any;
};

export default function TimePickerRenderer({ field }: Props) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const timeValue = useMemo(
    () => `${hour}:${minute} ${period}`,
    [hour, minute, period],
  );

  const hours = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    return String(value).padStart(2, "0");
  });
  const minutes = Array.from({ length: 12 }, (_, index) => {
    const value = index * 5;
    return String(value).padStart(2, "0");
  });

  useEffect(() => {
    const initialTime = String(field?.value || field?.placeholder || "").trim();
    const match = initialTime.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);

    if (!match) return;

    const nextHour = String(Number(match[1]) % 12 || 12).padStart(2, "0");
    const nextMinute = match[2];
    const nextPeriod = match[3].toUpperCase();

    setHour(nextHour);
    setMinute(nextMinute);
    setPeriod(nextPeriod);
  }, [field?.placeholder, field?.value]);

  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Select Time"}
        {field.required && " *"}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg border border-borderColor bg-bgColor px-3 py-2.5 text-left"
          >
            <span className="text-sm text-gray-400 flex-1">
              {timeValue || "hh:mm AM"}
            </span>
            <Clock size={14} className="text-gray-400" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 border-0 shadow-xl" align="start">
          <div className="rounded-md border border-borderColor bg-white p-2 shadow-lg">
            <div className="grid grid-cols-3 overflow-hidden rounded-sm bg-[#0f172a] text-white text-sm font-medium">
              <div className="px-4 py-2 text-center border-r border-white/10">
                {hour}
              </div>
              <div className="px-4 py-2 text-center border-r border-white/10">
                {minute}
              </div>
              <div className="px-4 py-2 text-center">{period}</div>
            </div>

            <div className="pt-2 grid grid-cols-3 border-b  ">
              <div className="max-h-48 overflow-y-auto scrollbar-hide border-r pr-1 bg-white">
                {hours.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setHour(value)}
                    className={`block w-full px-2 py-1 text-sm text-center ${
                      hour === value
                        ? "bg-blackColor text-white"
                        : "text-headerColor hover:bg-gray-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="max-h-48 overflow-y-auto px-1  border-r scrollbar-hide border-borderColor bg-white">
                {minutes.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMinute(value)}
                    className={`block w-full px-3 py-2 text-sm text-center ${
                      minute === value
                        ? "bg-blackColor text-white"
                        : "text-headerColor hover:bg-gray-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="max-h-48 overflow-y-auto  pl-1 scrollbar-hide bg-white">
                {["AM", "PM"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPeriod(value)}
                    className={`block w-full px-2 py-1 text-sm text-center ${
                      period === value
                        ? "bg-blackColor text-white"
                        : "text-headerColor hover:bg-gray-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 rounded-lg bg-blackColor text-white hover:bg-blackColor/90"
                onClick={() => setOpen(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
