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

type BookingDate = {
  booking_date: string; // "YYYY-MM-DD"
  start_time: string; // "HH:mm"
  end_time: string; // "HH:mm"
};

const STORAGE_KEY = "short-term-job-details";

const createEmptyBookingDate = (): BookingDate => ({
  booking_date: "",
  start_time: "",
  end_time: "",
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
          {/* values are 24-hour "HH:mm" to match the stored data format */}
          <option value="05:45">5:45 AM</option>
          <option value="08:00">8:00 AM</option>
          <option value="09:00">9:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="17:00">5:00 PM</option>
          <option value="17:40">5:40 PM</option>
          <option value="18:00">6:00 PM</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
      </div>
    </div>
  );
}

export default function Page() {
  // Single source of truth: index 0 is the primary booking date,
  // every subsequent item is an "additional date".
  const [bookingDates, setBookingDates] = useState<BookingDate[]>([
    createEmptyBookingDate(),
  ]);

  const saveDraft = (dates: BookingDate[]) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentDraft = stored ? JSON.parse(stored) : {};

    const draft = {
      ...currentDraft,
      dates,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as {
        dates?: BookingDate[];
      };

      setBookingDates(
        Array.isArray(parsed.dates) && parsed.dates.length
          ? parsed.dates
          : [createEmptyBookingDate()],
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    saveDraft(bookingDates);
  }, [bookingDates]);

  const handleDateChange = (
    dateIndex: number,
    field: keyof BookingDate,
    value: string,
  ) => {
    setBookingDates((currentDates) =>
      currentDates.map((dateItem, index) =>
        index === dateIndex ? { ...dateItem, [field]: value } : dateItem,
      ),
    );
  };

  const handleAddAdditionalDate = () => {
    setBookingDates((currentDates) => [
      ...currentDates,
      createEmptyBookingDate(),
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft(bookingDates);
  };

  const [primaryDate, ...additionalDates] = bookingDates;

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
              type="date"
              value={primaryDate.booking_date}
              onChange={(event) =>
                handleDateChange(0, "booking_date", event.target.value)
              }
              className={`${inputClass} pr-10`}
            />
            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TimeSelect
            id="start-time"
            label="Start Time"
            value={primaryDate.start_time}
            onChange={(value) => handleDateChange(0, "start_time", value)}
            required
          />
          <TimeSelect
            id="end-time"
            label="End Time"
            value={primaryDate.end_time}
            onChange={(value) => handleDateChange(0, "end_time", value)}
            required
          />
        </div>

        <section className="pt-1">
          <h2 className="mb-5 text-lg font-semibold text-[#111827]">
            Add Additional Date
          </h2>

          <div className="space-y-4">
            {additionalDates.map((dateItem, additionalIndex) => {
              const dateNumber = additionalIndex + 1;
              const actualIndex = additionalIndex + 1; // offset by primary date

              return (
                <div
                  key={dateNumber}
                  className="grid gap-4 md:grid-cols-[1fr_152px_152px]"
                >
                  <div className="relative">
                    <Input
                      id={`additional-date-${dateNumber}`}
                      value={dateItem.booking_date}
                      onChange={(event) =>
                        handleDateChange(
                          actualIndex,
                          "booking_date",
                          event.target.value,
                        )
                      }
                      type="date"
                      className={`${inputClass} pr-10`}
                    />
                    <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111827]" />
                  </div>
                  <TimeSelect
                    id={`additional-start-time-${dateNumber}`}
                    value={dateItem.start_time}
                    onChange={(value) =>
                      handleDateChange(actualIndex, "start_time", value)
                    }
                  />
                  <TimeSelect
                    id={`additional-end-time-${dateNumber}`}
                    value={dateItem.end_time}
                    onChange={(value) =>
                      handleDateChange(actualIndex, "end_time", value)
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