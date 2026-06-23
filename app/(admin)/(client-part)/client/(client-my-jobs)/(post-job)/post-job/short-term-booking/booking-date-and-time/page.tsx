"use client";

import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const TIME_OPTIONS = [
  "00:15", "00:30", "00:45",
  "01:00", "01:15", "01:30", "01:45",
  "02:00", "02:15", "02:30", "02:45",
  "03:00", "03:15", "03:30", "03:45",
  "04:00", "04:15", "04:30", "04:45",
  "05:00", "05:15", "05:30", "05:45",
  "06:00", "06:15", "06:30", "06:45",
  "07:00", "07:15", "07:30", "07:45",
  "08:00", "08:15", "08:30", "08:45",
  "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45",
  "11:00", "11:15", "11:30", "11:45",
  "12:00", "12:15", "12:30", "12:45",
  "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "16:00", "16:15", "16:30", "16:45",
  "17:00", "17:15", "17:30", "17:45",
  "18:00", "18:15", "18:30", "18:45",
  "19:00", "19:15", "19:30", "19:45",
  "20:00", "20:15", "20:30", "20:45",
  "21:00", "21:15", "21:30", "21:45",
  "22:00", "22:15", "22:30", "22:45",
  "23:00", "23:15", "23:30", "23:45",
];

const inputClass =
  "h-11 rounded-md border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#8A94A6] focus-visible:ring-1 focus-visible:ring-[#111827]";
const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const selectClass =
  "h-11 w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";
const errorInputClass = "border-[#EF4444] focus-visible:ring-[#EF4444]";
const errorSelectClass = "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]";
const errorTextClass = "mt-1 text-xs text-[#EF4444]";

type BookingDate = {
  booking_date: string; // "YYYY-MM-DD"
  start_time: string; // "HH:mm"
  end_time: string; // "HH:mm"
};

type DateErrors = Partial<
  Record<"booking_date" | "start_time" | "end_time", string>
>;

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
  hasError,
}: {
  id: string;
  label?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  hasError?: boolean;
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
          className={`${selectClass} ${hasError ? errorSelectClass : ""}`}
          data-error={Boolean(hasError)}
          aria-invalid={Boolean(hasError)}
        >
          <option value="" disabled>
            hh:mm
          </option>
          {TIME_OPTIONS.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
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
  const [errors, setErrors] = useState<DateErrors[]>([{}]);
  const router = useRouter()

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

      const restoredDates =
        Array.isArray(parsed.dates) && parsed.dates.length
          ? parsed.dates
          : [createEmptyBookingDate()];

      setBookingDates(restoredDates);
      setErrors(restoredDates.map(() => ({})));
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
    setErrors((currentErrors) => [...currentErrors, {}]);
  };

  const validate = (): DateErrors[] => {
    return bookingDates.map((dateItem, index) => {
      // Only the primary date (index 0) is required.
      // Additional dates are optional, but if a user starts filling
      // one in, we still check start/end time ordering for sanity.
      const isPrimary = index === 0;
      const dateErrors: DateErrors = {};

      if (isPrimary && !dateItem.booking_date.trim()) {
        dateErrors.booking_date = "Booking date is required.";
      }
      if (isPrimary && !dateItem.start_time.trim()) {
        dateErrors.start_time = "Start time is required.";
      }
      if (isPrimary && !dateItem.end_time.trim()) {
        dateErrors.end_time = "End time is required.";
      }

      if (
        dateItem.start_time &&
        dateItem.end_time &&
        dateItem.end_time <= dateItem.start_time
      ) {
        dateErrors.end_time = "End time must be after start time.";
      }

      return dateErrors;
    });
  };

  const hasErrors = (allErrors: DateErrors[]) =>
    allErrors.some((dateErrors) => Object.keys(dateErrors).length > 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      const firstErrorEl = document.querySelector("[data-error='true']");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    saveDraft(bookingDates);
    router.push('/client/post-job/short-term-booking/job-address');
  };

  const [primaryDate, ...additionalDates] = bookingDates;
  const [primaryErrors, ...additionalErrors] = errors;

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit} noValidate>
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
              className={`${inputClass} pr-10 ${primaryErrors?.booking_date ? errorInputClass : ""}`}
              data-error={Boolean(primaryErrors?.booking_date)}
              aria-invalid={Boolean(primaryErrors?.booking_date)}
            />
            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
          </div>
          {primaryErrors?.booking_date && (
            <p className={errorTextClass}>{primaryErrors.booking_date}</p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <TimeSelect
              id="start-time"
              label="Start Time"
              value={primaryDate.start_time}
              onChange={(value) => handleDateChange(0, "start_time", value)}
              required
              hasError={Boolean(primaryErrors?.start_time)}
            />
            {primaryErrors?.start_time && (
              <p className={errorTextClass}>{primaryErrors.start_time}</p>
            )}
          </div>
          <div>
            <TimeSelect
              id="end-time"
              label="End Time"
              value={primaryDate.end_time}
              onChange={(value) => handleDateChange(0, "end_time", value)}
              required
              hasError={Boolean(primaryErrors?.end_time)}
            />
            {primaryErrors?.end_time && (
              <p className={errorTextClass}>{primaryErrors.end_time}</p>
            )}
          </div>
        </div>

        <section className="pt-1">
          <h2 className="mb-5 text-lg font-semibold text-[#111827]">
            Add Additional Date
          </h2>

          <div className="space-y-4">
            {additionalDates.map((dateItem, additionalIndex) => {
              const dateNumber = additionalIndex + 1;
              const actualIndex = additionalIndex + 1; // offset by primary date
              const itemErrors = additionalErrors[additionalIndex] ?? {};

              return (
                <div key={dateNumber} className="grid gap-1 md:grid-cols-[1fr_152px_152px] md:gap-4">
                  <div>
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
                        className={`${inputClass} pr-10 ${itemErrors.booking_date ? errorInputClass : ""}`}
                        data-error={Boolean(itemErrors.booking_date)}
                        aria-invalid={Boolean(itemErrors.booking_date)}
                      />
                      <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111827]" />
                    </div>
                    {itemErrors.booking_date && (
                      <p className={errorTextClass}>{itemErrors.booking_date}</p>
                    )}
                  </div>
                  <div>
                    <TimeSelect
                      id={`additional-start-time-${dateNumber}`}
                      value={dateItem.start_time}
                      onChange={(value) =>
                        handleDateChange(actualIndex, "start_time", value)
                      }
                      hasError={Boolean(itemErrors.start_time)}
                    />
                    {itemErrors.start_time && (
                      <p className={errorTextClass}>{itemErrors.start_time}</p>
                    )}
                  </div>
                  <div>
                    <TimeSelect
                      id={`additional-end-time-${dateNumber}`}
                      value={dateItem.end_time}
                      onChange={(value) =>
                        handleDateChange(actualIndex, "end_time", value)
                      }
                      hasError={Boolean(itemErrors.end_time)}
                    />
                    {itemErrors.end_time && (
                      <p className={errorTextClass}>{itemErrors.end_time}</p>
                    )}
                  </div>
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
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F8FAFC] cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937] cursor-pointer"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}