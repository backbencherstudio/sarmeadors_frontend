"use client";

import { ChevronDown } from "lucide-react";

type Props = {
  field: any;
};

export default function JobPlacementRenderer({ field }: Props) {
  return (
    <div className="space-y-1">
      {field.label && (
        <label className="text-xs font-semibold text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="rounded-lg border bg-bgColor px-3 py-2 flex items-center justify-between text-xs text-secondaryColor">
        <span>Select a placement job…</span>
        <ChevronDown size={14} />
      </div>
    </div>
  );
}
