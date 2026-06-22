"use client";

import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";

const inputClass =
  "h-11 rounded-md border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#8A94A6] focus-visible:ring-1 focus-visible:ring-[#111827]";
const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const selectClass =
  "h-11 w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";

type AdditionalDate = {
  date: string;
  startTime: string;
  endTime: string;
};

type BookingDraft = {
  bookingDate: string;
  startTime: string;
  endTime: string;
  additionalDates: AdditionalDate[];
};

const STORAGE_KEY = "short-term-job-details";

const createEmptyAdditionalDate = (): AdditionalDate => ({
  date: "",
  startTime: "",
  endTime: "",
});

function RequiredMark() {
  return <span className={requiredClass}>*</span>;
}

function TimeSelect({
  id,
  label,
  defaultValue,
  value,
  onChange,
  required,
}: {
  id: string;
  label?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label} {required && <RequiredMark />}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          defaultValue={value === undefined ? defaultValue || "" : undefined}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            hh:mm:A
          </option>
          <option value="5:45 AM">5:45 AM</option>
          <option value="8:00 AM">8:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="5:40 PM">5:40 PM</option>
          <option value="6:00 PM">6:00 PM</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
      </div>
    </div>
  );
}

export default function Page() {
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [additionalDates, setAdditionalDates] = useState<AdditionalDate[]>([
    createEmptyAdditionalDate(),
  ]);

  const saveDraft = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentDraft = stored ? JSON.parse(stored) : {};

    const draft = {
      ...currentDraft,
      bookingDate,
      startTime,
      endTime,
      additionalDates,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as Partial<BookingDraft> & {
        children?: unknown;
      };

      setBookingDate(parsed.bookingDate || "");
      setStartTime(parsed.startTime || "");
      setEndTime(parsed.endTime || "");
      setAdditionalDates(
        Array.isArray(parsed.additionalDates) && parsed.additionalDates.length
          ? parsed.additionalDates
          : [createEmptyAdditionalDate()],
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    saveDraft();
  }, [bookingDate, startTime, endTime, additionalDates]);

  const handleAdditionalDateChange = (
    dateIndex: number,
    field: keyof AdditionalDate,
    value: string,
  ) => {
    setAdditionalDates((currentDates) =>
      currentDates.map((dateItem, index) =>
        index === dateIndex ? { ...dateItem, [field]: value } : dateItem,
      ),
    );
  };

  const handleAddAdditionalDate = () => {
    setAdditionalDates((currentDates) => [
      ...currentDates,
      createEmptyAdditionalDate(),
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft();
  };

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-[#111827]">
          Booking Date & Time
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Schedule when this job will take place
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="booking-date" className={labelClass}>
            Booking Date <RequiredMark />
          </label>
          <div className="relative">
            <Input
              id="booking-date"
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
              placeholder="MM/DD/YYYY"
              className={`${inputClass} pr-10`}
            />
            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TimeSelect
            id="start-time"
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
            required
          />
          <TimeSelect
            id="end-time"
            label="End Time"
            value={endTime}
            onChange={setEndTime}
            required
          />
        </div>

        <section className="pt-1">
          <h2 className="mb-5 text-lg font-semibold text-[#111827]">
            Add Additional Date
          </h2>

          <div className="space-y-4">
            {additionalDates.map((dateItem, index) => {
              const dateNumber = index + 1;

              return (
                <div
                  key={dateNumber}
                  className="grid gap-4 md:grid-cols-[1fr_152px_152px]"
                >
                  <div className="relative">
                    <Input
                      id={`additional-date-${dateNumber}`}
                      value={dateItem.date}
                      onChange={(event) =>
                        handleAdditionalDateChange(
                          index,
                          "date",
                          event.target.value,
                        )
                      }
                      placeholder="MM/DD/YYYY"
                      className={`${inputClass} pr-10`}
                    />
                    <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111827]" />
                  </div>
                  <TimeSelect
                    id={`additional-start-time-${dateNumber}`}
                    value={dateItem.startTime}
                    onChange={(value) =>
                      handleAdditionalDateChange(index, "startTime", value)
                    }
                  />
                  <TimeSelect
                    id={`additional-end-time-${dateNumber}`}
                    value={dateItem.endTime}
                    onChange={(value) =>
                      handleAdditionalDateChange(index, "endTime", value)
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleAddAdditionalDate}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#DDE3EA] bg-white px-4 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#F8FAFC]"
            >
              <Plus className="h-4 w-4" />
              Add Another Date
            </button>
            {/* <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#DDE3EA] bg-white px-4 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#F8FAFC]"
            >
              <Plus className="h-4 w-4" />
              Add Multiple Dates
            </button> */}
          </div>
        </section>
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
