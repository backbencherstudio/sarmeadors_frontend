"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { Clock } from "lucide-react";
import { useMemo } from "react";

type Props = {
  field: any;
  value?: string;
  onValueChange?: (value: string) => void;
};

function to24h(time12: string): string {
  const match = time12.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (!match) return time12;
  let h = Number(match[1]);
  const m = match[2];
  const p = match[3].toUpperCase();
  if (p === "PM" && h !== 12) h += 12;
  if (p === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m}`;
}


function to12h(time24: string): string {
  const [hStr, m] = time24.split(":");
  if (!hStr || !m) return time24;
  let h = Number(hStr);
  const p = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, "0")}:${m} ${p}`;
}

export default function TimePickerRenderer({
  field,
  value,
  onValueChange,
}: Props) {
  const inputValue = useMemo(() => {
    const raw = String(
      value ?? field?.value ?? field?.placeholder ?? "",
    ).trim();
    if (!raw) return "";
    return to24h(raw);
  }, [field?.placeholder, field?.value, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (!v) return;
    onValueChange?.(to12h(v));
  };

  return (
    <div className="space-y-1 w-full time-picker-wrapper">
      <style>{`
        .time-picker-wrapper input[type="time"]::-webkit-calendar-picker-indicator {
          display: none;
        }
      `}</style>
      <ReusableInput
        type="time"
        label={field.label || "Select Time"}
        required={field.required}
        value={inputValue}
        onChange={handleChange}
        className="w-full"
        endAdornment={<Clock size={16} className="text-gray-400" />}
      />
    </div>
  );
}
