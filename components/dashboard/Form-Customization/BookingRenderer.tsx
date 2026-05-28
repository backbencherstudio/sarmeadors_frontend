"use client";

import { Calendar } from "lucide-react";

type Props = {
  field: any;
};

export default function BookingRenderer({ field }: Props) {
  return (
    <div className="space-y-1">
      {field.label && (
        <label className="text-xs font-semibold text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="rounded-lg border border-dashed border-borderColor bg-bgColor p-4 text-center text-xs text-secondaryColor">
        <Calendar size={20} className="mx-auto mb-1 opacity-50" />
        Booking / Appointment Slot
      </div>
    </div>
  );
}
