"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  field: any;
};

export default function DropdownRenderer({ field }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const items = field.items?.length
    ? field.items
    : ["Menu Item 1", "Menu Item 2", "Menu Item 3"];
  const isMulti = field.type === "multi_select";

  const toggle = (item: string) => {
    if (!isMulti) {
      setSelected([item]);
      setOpen(false);
      return;
    }
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Dropdown"}
        {field.required && " *"}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full px-3 py-2.5 border border-borderColor rounded-lg bg-bgColor text-sm text-left flex justify-between items-center"
        >
          {isMulti && selected.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selected.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-blackColor text-white text-xs rounded"
                >
                  {s} ×
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">
              {isMulti ? "Select Multiple Options" : "Select Option"}
            </span>
          )}
          <ChevronDown size={14} className="text-gray-400 shrink-0" />
        </button>
        {open && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-borderColor rounded-lg shadow-md">
            {items.map((item: string, i: number) => (
              <div
                key={i}
                onClick={() => toggle(item)}
                className={`px-3 py-2 text-sm cursor-pointer ${
                  selected.includes(item)
                    ? "bg-blackColor text-white"
                    : "text-headerColor hover:bg-bgColor"
                } ${i === 0 ? "rounded-t-lg" : ""} ${i === items.length - 1 ? "rounded-b-lg" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {isMulti && selected.length > 0 && (
        <button
          type="button"
          onClick={() => setSelected([])}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}
