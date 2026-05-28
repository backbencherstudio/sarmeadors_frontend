"use client";

import { Check } from "lucide-react";
import { useState } from "react";

type Props = {
  field: any;
};

export default function MultiCheckboxRenderer({ field }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const items = field.items?.length
    ? field.items
    : ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const isHorizontal = field.layout === "horizontal";

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Select options as you like"}
        {field.required && " *"}
      </label>
      <div className={isHorizontal ? "flex flex-wrap gap-4" : "space-y-2"}>
        {items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggle(item)}
          >
            <div
              className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                selected.includes(item)
                  ? "bg-blackColor border-blackColor"
                  : "border-borderColor bg-white"
              }`}
            >
              {selected.includes(item) && (
                <Check size={10} className="text-white" />
              )}
            </div>
            <span className="text-sm text-headerColor">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
