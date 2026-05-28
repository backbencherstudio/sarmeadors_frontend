"use client";

import { Calendar } from "lucide-react";

type Props = {
  field: any;
};

export default function DatePickerRenderer({ field }: Props) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Date Picker"}
        {field.required && " *"}
      </label>
      <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
        <span className="text-sm text-gray-400 flex-1">YYYY/MM/DD</span>
        <Calendar size={14} className="text-gray-400" />
      </div>
    </div>
  );
}
