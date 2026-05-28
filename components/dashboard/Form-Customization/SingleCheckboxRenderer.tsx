"use client";

import { Check } from "lucide-react";
import { useState } from "react";

type Props = {
  field: any;
};

export default function SingleCheckboxRenderer({ field }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
          checked
            ? "bg-blackColor border-blackColor"
            : "border-borderColor bg-white"
        }`}
      >
        {checked && <Check size={10} className="text-white" />}
      </div>
      <label className="text-sm text-headerColor cursor-pointer">
        {field.label || "I agree to the terms and conditions"}
      </label>
    </div>
  );
}
