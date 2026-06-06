"use client";

import { useState } from "react";

type Props = {
  field: any;
};

export default function RadioRenderer({ field }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const items = field.items?.length
    ? field.items
    : ["Option 1", "Option 2", "Option 3"];
  const isHorizontal = field.layout === "horizontal";

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Radio"}
        {field.required && " *"}
      </label>
      <div className={isHorizontal ? "flex flex-wrap gap-4" : "space-y-2"}>
        {items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selected === item ? "border-blackColor" : "border-borderColor"
              }`}
            >
              {selected === item && (
                <div className="w-2 h-2 rounded-full bg-blackColor" />
              )}
            </div>
            <span className="text-sm text-headerColor">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
