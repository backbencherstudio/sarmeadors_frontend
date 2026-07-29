"use client";

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";

export default function General() {
  const [countries, setCountries] = useState<string[]>([
    "Long Trem",
    "short Term",
  ]);
  const [tagInput, setTagInput] = useState("");

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setCountries((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeCountry = (c: string) =>
    setCountries((prev) => prev.filter((x) => x !== c));
  return (
    <CommonAccordion title="General">
      <div>
        {/* Fields */}
        <h3 className="font-bold mb-1.5">Job types</h3>
        <p className="font-medium mb-1.5">
          Do you fill long term job, short term job, or both?
        </p>
        <div
          className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-10.5 items-center cursor-text mb-4"
          onClick={() => document.getElementById("countryInput")?.focus()}
        >
          {countries?.map((c) => (
            <span
              key={c}
              className="flex items-center gap-1 bg-[#111927] text-white rounded-xl px-2 py-0.5 text-xs"
            >
              {c}
              <span
                onClick={() => removeCountry(c)}
                className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
              >
                ×
              </span>
            </span>
          ))}
          <input
            id="countryInput"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            className="border-none outline-none text-xs flex-1 min-w-15 bg-transparent"
          />
        </div>
      </div>
    </CommonAccordion>
  );
}
