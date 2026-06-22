"use client";

import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const inputClass =
  "h-11 rounded-md border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#8A94A6] focus-visible:ring-1 focus-visible:ring-[#111827]";
const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const selectClass =
  "h-11 w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";

const STORAGE_KEY = "short-term-job-details";

function RequiredMark() {
  return <span className={requiredClass}>*</span>;
}

export default function Page() {
  const [jobAddress, setJobAddress] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeProvince, setHomeProvince] = useState("");
  const [homePostalCode, setHomePostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  const saveDraft = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentDraft = stored ? JSON.parse(stored) : {};

    const draft = {
      ...currentDraft,
      jobAddress,
      homeCity,
      homeProvince,
      homePostalCode,
      country,
      location,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setJobAddress(parsed.jobAddress || "");
      setHomeCity(parsed.homeCity || "");
      setHomeProvince(parsed.homeProvince || "");
      setHomePostalCode(parsed.homePostalCode || "");
      setCountry(parsed.country || "");
      setLocation(parsed.location || "");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    saveDraft();
  }, [jobAddress, homeCity, homeProvince, homePostalCode, country, location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft();
  };

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit}>
      <div className="mb-7">
        <h1 className="text-xl font-semibold text-[#111827]">
          Define Job Address
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Provide detailed address about the job posting
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="job-address" className={labelClass}>
            Job Address <RequiredMark />
          </label>
          <Input
            id="job-address"
            value={jobAddress}
            onChange={(event) => setJobAddress(event.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="home-city" className={labelClass}>
              Home City <RequiredMark />
            </label>
            <Input
              id="home-city"
              value={homeCity}
              onChange={(event) => setHomeCity(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="home-province" className={labelClass}>
              Home Province/State <RequiredMark />
            </label>
            <Input
              id="home-province"
              value={homeProvince}
              onChange={(event) => setHomeProvince(event.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="home-postal-code" className={labelClass}>
              Home Postal Code <RequiredMark />
            </label>
            <Input
              id="home-postal-code"
              value={homePostalCode}
              onChange={(event) => setHomePostalCode(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              Country <RequiredMark />
            </label>
            <Input
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Location <RequiredMark />
          </label>
          <div className="relative">
            <select
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className={selectClass}
            >
              <option value="" disabled>
                Start typing to filter
              </option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F8FAFC]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937]"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
