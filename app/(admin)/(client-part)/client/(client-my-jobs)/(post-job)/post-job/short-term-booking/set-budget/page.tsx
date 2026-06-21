"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const selectClass =
  "h-11 w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";
const inputClass =
  "h-11 w-full rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] outline-none transition-[color,box-shadow] placeholder:text-[#8A94A6] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";

const STORAGE_KEY = "short-term-job-details";

function RequiredMark() {
  return <span className={requiredClass}>*</span>;
}

function SelectField({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
    </div>
  );
}

export default function Page() {
  const [currency, setCurrency] = useState("usd");
  const [compensationAmount, setCompensationAmount] = useState("");
  const [rateType, setRateType] = useState("hour");

  const saveDraft = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentDraft = stored ? JSON.parse(stored) : {};

    const draft = {
      ...currentDraft,
      currency,
      compensationAmount,
      rateType,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setCurrency(parsed.currency || "usd");
      setCompensationAmount(parsed.compensationAmount || "");
      setRateType(parsed.rateType || "hour");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    saveDraft();
  }, [currency, compensationAmount, rateType]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft();
  };

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit}>
      <div className="mb-7">
        <h1 className="text-xl font-semibold text-[#111827]">Set the Budget</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Define the financial details for this job
        </p>
      </div>

      <div>
        <label htmlFor="compensation-amount" className={labelClass}>
          Compensation <RequiredMark />
        </label>
        <div className="grid gap-2 md:grid-cols-[84px_1fr_1fr]">
          <SelectField id="currency" value={currency} onChange={setCurrency}>
            <option value="usd">$</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </SelectField>

          <input
            id="compensation-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={compensationAmount}
            onChange={(event) => setCompensationAmount(event.target.value)}
            className={inputClass}
          />

          <SelectField id="rate-type" value={rateType} onChange={setRateType}>
            <option value="hour">Per Hour</option>
            <option value="day">Per Day</option>
            <option value="job">Per Job</option>
          </SelectField>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-[#2684FF] bg-[#EAF3FF] px-5 py-5 text-[#0065FF]">
        <h2 className="text-base font-semibold">Budget Planning Tips</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
          <li>Consider market rates for similar positions.</li>
          <li>Factor in experience level requirements.</li>
          <li>Include any additional benefits or bonuses.</li>
        </ul>
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
          Submit Short-term Job Post
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
