"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  field: any;
  value?: string;
  onValueChange?: (value: string) => void;
};

export default function DatePickerRenderer({
  field,
  value,
  onValueChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (value) {
      const parsedValue = new Date(value);
      if (!Number.isNaN(parsedValue.getTime())) {
        setSelectedDate(parsedValue);
      }
      return;
    }

    if (!field?.value) return;
    const parsed = new Date(field.value);
    if (!Number.isNaN(parsed.getTime())) {
      setSelectedDate(parsed);
    }
  }, [field?.value, value]);

  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Date Picker"}
        {field.required && " *"}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg border border-borderColor bg-bgColor px-3 py-2.5 text-left"
          >
            <span
              className={`text-sm ${selectedDate ? "text-headerColor" : "text-gray-400"}`}
            >
              {selectedDate
                ? selectedDate.toLocaleDateString("en-CA")
                : field.placeholder || "YYYY/MM/DD"}
            </span>
            <CalendarIcon size={14} className="text-gray-400" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 border-0 shadow-xl" align="start">
          <div className="rounded-xl border border-borderColor bg-white p-3 shadow-lg">
            <Calendar
              mode="single"
              className="p-0!"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                if (date && onValueChange) {
                  onValueChange(date.toISOString());
                }
                setOpen(false);
              }}
              initialFocus
            />
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
