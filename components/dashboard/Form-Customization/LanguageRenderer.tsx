"use client";

import { ChevronDown, Globe } from "lucide-react";

type Props = {
  field: any;
};

export default function LanguageRenderer({ field }: Props) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Language Input"}
        {field.required && " *"}
      </label>
      <div className="w-full px-3 py-2.5 border border-borderColor rounded-lg bg-bgColor flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-gray-400" />
          <span className="text-sm text-gray-400">
            Select Preferred Language
          </span>
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </div>
    </div>
  );
}
