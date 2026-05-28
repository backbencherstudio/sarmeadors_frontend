"use client";

import { ChevronDown } from "lucide-react";

type Props = {
  field: any;
};

export default function PhoneCountryRenderer({ field }: Props) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Phone no."}
        {field.required && " *"}
      </label>
      <div className="flex items-center border border-borderColor rounded-lg bg-bgColor overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-2.5 border-r border-borderColor">
          <span className="text-base">🇺🇸</span>
          <ChevronDown size={12} className="text-gray-400" />
          <span className="text-xs text-headerColor">+1</span>
        </div>
        <input
          type="tel"
          placeholder={field.placeholder || ""}
          disabled
          className="flex-1 px-2 py-2.5 bg-transparent text-sm text-headerColor"
        />
      </div>
    </div>
  );
}
