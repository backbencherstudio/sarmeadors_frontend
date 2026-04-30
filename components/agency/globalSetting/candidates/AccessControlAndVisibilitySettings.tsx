"use client";

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";
import { ChevronDown } from "lucide-react";

const FONTS = [
  "Public",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Nunito",
  "Source Sans Pro",
];

export default function AccessControlAndVisibilitySettings() {
  const [countries, setCountries] = useState<string[]>([
    "United States",
    "Bangladesh",
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
    <CommonAccordion title="Access Control ond Visibility Settings">
      <div className="space-y-6">
        {/* Candidate No Dashboard Access Statuses */}
        <div>
          <p className="font-medium">Candidate No Dashboard Access Statuses</p>
          <p className="text-sm text-[#778593] my-1">
            Candidates in these statuses WII no longer be able to access their
            dashboard. preventing them from viewing or changing information (for
            example. rejected or terminated candidates).
          </p>
          <div
            className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text"
            onClick={() => document.getElementById("countryInput")?.focus()}
          >
            {countries?.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs"
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
              className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
            />
          </div>
        </div>

        {/* Candidate No Dashboard Access Message */}
        <div>
          <label className="block text-base font-medium mb-1">
            Candidate No Dashboard Access Message
          </label>
          <div className="relative">
            <select
              // value={font}
              // onChange={(e) => setFont(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593] mt-1">Default value is 2</p>
        </div>

        {/* Statuses in which candidates can resubmit the application form */}
        <div>
          <p className="font-medium">
            Statuses in which candidates can resubmit the application form
          </p>
          <p className="text-sm text-[#778593] my-1">
            This means that even if the client is already in the system, they
            can submit the application form without getting a "duplicate email"
            notice
          </p>
          <div
            className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text"
            onClick={() => document.getElementById("countryInput")?.focus()}
          >
            {countries?.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs"
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
              className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
            />
          </div>
        </div>
      </div>
    </CommonAccordion>
  );
}
