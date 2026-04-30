"use client";

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

const documentOptions = [
  "Don’t allow candidates to leave reviews",
  "If candidate has not worked a shift job for X days, set to a status",
  "Show cancelled job",
  "Show Past Jobs",
  "Candidates can decline assigned shift jobs",
];

const documentOptions2 = [
  "Client can confirm clock in & out (on clients booking section)",
  "Client can confirm clock in/out on the candidate's phone",
];
const LANGUAGES = ["15", "30", "45", "60", "90", "120"];

export default function ScheduleAvailabilitySettings() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [language, setLanguage] = useState("English");

  const toggle = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

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
    <CommonAccordion title="Schedule, Availability Settings">
      {/* Checkbox */}
      <div className="space-y-4 pt-2">
        {documentOptions.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Checkbox
              checked={!!checkedItems[item]}
              onCheckedChange={() => toggle(item)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              {item}
            </Label>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        {/*  Number of days in the past to load job in My Job */}
        <div className="space-y-1">
          <label className="block text-base font-medium">
            Number of days in the past to load job in My Job
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
            If not specified. the default value is 14
          </p>
        </div>
        {/*  Number of days in the future to load job in My Job */}
        <div className="space-y-1">
          <label className="block text-base font-medium">
            Number of days in the future to load job in My Job
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
            If not specified. the default value is 28
          </p>
        </div>
        {/*  Number of minutes before the shift start time to show the clock in button */}
        <div className="space-y-1">
          <label className="block text-base font-medium">
            Number of minutes before the shift start time to show the clock in
            button
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
          <p className="text-sm text-[#778593]">By default it’s 30 min</p>
        </div>
        {/*  Number of minutes before the shift start time to show the clock in button */}
        <div className="space-y-1">
          <label className="block text-base font-medium">
            Minutes Interval when candidate clock in and out
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
          <p className="text-sm text-[#778593]">Clear</p>
        </div>
      </div>
      {/* Checkbox */}
      <div className="space-y-4 pt-2">
        {documentOptions2.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Checkbox
              checked={!!checkedItems[item]}
              onCheckedChange={() => toggle(item)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              {item}
            </Label>
          </div>
        ))}
      </div>
      {/* Select */}
      <div className="space-y-4">
        {/* Notify a candidate of a shift job starting in X hours */}
        <div>
          {/* Fields */}
          <p className="font-medium">
            Notify a candidate of a shift job starting in X hours
          </p>
          <p className="text-sm text-[#778593] my-1.5">
            You can select multiple options to send multiple notifications! If
            empty, don't notify candidate before shift job starting.
          </p>
          <div
            className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4"
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
        {/* Method to Notify  */}
        <div>
          {/* Fields */}
          <p className="font-medium">Method to Notify</p>
          <p className="text-sm text-[#778593] my-1.5">
            Select Method to Notify candidate via
          </p>
          <div
            className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4"
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
        {/* Send a reminder to candidate X minutes after scheduled Clock In/Out time if they have not done so  */}
        <div>
          {/* Fields */}
          <p className="font-medium">
            Send a reminder to candidate X minutes after scheduled Clock In/Out
            time if they have not done so
          </p>
          <p className="text-sm text-[#778593] my-1.5">
            You can select multiple options to send multiple notifications! If
            empty, don't notify candidate for clock in.
          </p>
          <div
            className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4"
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
        {/* Method to Notify Candidate for Clock In/Out  */}
        <div>
          {/* Fields */}
          <p className="font-medium">
            Method to Notify Candidate for Clock In/Out
          </p>
          <p className="text-sm text-[#778593] my-1.5">
            Select Method to Notify candidate via
          </p>
          <div
            className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4"
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
