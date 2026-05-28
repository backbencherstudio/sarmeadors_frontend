"use client";

import { Calendar, Clock } from "lucide-react";

type Props = {
  field: any;
};

export default function DateTimePickerRenderer({ field }: Props) {
  return (
    <div className="space-y-3 w-full">
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-headerColor">
          {field.label || "Booking Date"}
          {field.required && " *"}
        </label>
        <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
          <span className="text-sm text-gray-400 flex-1">MM/DD/YYYY</span>
          <Calendar size={14} className="text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-headerColor">
            Start Time
          </label>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
            <span className="text-xs text-gray-400 flex-1">hh:mm A</span>
            <Clock size={12} className="text-gray-400" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-headerColor">
            End Time
          </label>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
            <span className="text-xs text-gray-400 flex-1">hh:mm A</span>
            <Clock size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
