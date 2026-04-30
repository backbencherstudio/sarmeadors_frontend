"use client";

import { useState } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";
import CommonAccordion from "../CommonAccordion";

const LANGUAGES = ["15", "30", "45", "60", "90", "120"];

const DEFAULT_LOCATIONS = [
  "Chicago",
  "DC Metro Area",
  "New York",
  "Miami",
  "Iowa",
  "Other Locations",
];

export default function ProfileSettings2() {
  const [language, setLanguage] = useState("English");
  const [locations, setLocations] = useState<string[]>(DEFAULT_LOCATIONS);
  const [subRows, setSubRows] = useState([
    { location: "Chicago", subLocation: "" },
  ]);

  const addLocation = () => setLocations((prev) => [...prev, ""]);

  const updateLocation = (index: number, value: string) =>
    setLocations((prev) => prev.map((l, i) => (i === index ? value : l)));

  const removeLocation = (index: number) =>
    setLocations((prev) => prev.filter((_, i) => i !== index));

  const addSubRow = () =>
    setSubRows((prev) => [...prev, { location: "", subLocation: "" }]);

  const updateSubRow = (
    index: number,
    field: "location" | "subLocation",
    value: string,
  ) =>
    setSubRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );

  const removeSubRow = (index: number) =>
    setSubRows((prev) => prev.filter((_, i) => i !== index));

  return (
    <CommonAccordion title="Profile Settings">
      {/* Time Interval */}
      <div>
        <label className="block text-base font-medium">
          Time Interval for Availability Scheduling (minutes)
        </label>
        <p className="text-sm text-[#778593] my-1">
          Set the time interval in minutes for availability scheduling. Common
          values: 5, 10, 15, 30.
        </p>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Multiple Locations */}
      <div>
        <label className="block text-base font-medium mb-3">
          Time Off Request Categories
        </label>
        <div className="flex flex-col gap-2">
          {locations.map((loc, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={loc}
                onChange={(e) => updateLocation(i, e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              />
              <button
                onClick={() => removeLocation(i)}
                className="text-red-400 hover:text-red-600 transition p-1 cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLocation}
          className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          <Plus size={16} />
          Add Another Item
        </button>
      </div>

      {/*  Minimum time block duration for recurring availability */}
      <div className="space-y-1">
        <label className="block text-base font-medium">
          Minimum time block duration for recurring availability
        </label>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
        <p className="text-sm text-[#778593]">
          This means when a candidate is entering recurring availability, they
          wont be able to enter a time block less than hours, for example if it
          is 2 then 5pmto 6:30pm will be too small a block.
        </p>
      </div>
      {/* Maximum number of hours a candidate can work in a week */}
      <div>
        <label className="block text-base font-medium mb-1">
          Maximum number of hours a candidate can work in a week
        </label>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>
      {/* Do not allow candidates to request time off for X days */}
      <div>
        <label className="block text-base font-medium mb-1">
          Do not allow candidates to request time off for X days
        </label>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
        <p className="text-sm text-[#778593] mt-1">Default value none/0</p>
      </div>
      {/* Number of hours in which candidate cannot be select for other jobs after finishing one job (buffer time) */}
      <div>
        <label className="block text-base font-medium mb-1">
          Number of hours in which candidate cannot be select for other jobs
          after finishing one job (buffer time)
        </label>

        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>
    </CommonAccordion>
  );
}
