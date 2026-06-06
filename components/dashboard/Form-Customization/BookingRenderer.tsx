"use client";

import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { Calendar, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import DatePickerRenderer from "./DatePickerRenderer";
import DropdownRenderer from "./DropdownRenderer";
import TimePickerRenderer from "./TimePickerRenderer";

type Props = {
  field: any;
  activeBlockId?: string;
  activeSectionId?: string | null;
};

type AdditionalDateRow = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
};

type BookingData = {
  tab: "short" | "long";
  shortTerm: {
    bookingDate: string;
    startTime: string;
    endTime: string;
    additionalDates: AdditionalDateRow[];
  };
  longTerm: {
    children: string[];
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    days: string[];
  };
};

const dayOptions = [
  "Everyday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const childOptions = [
  "Augustina Midgett",
  "Johnsie Jock",
  "Bella Rose",
  "Kelsey Green",
];

const createDefaultBookingData = (): BookingData => ({
  tab: "short",
  shortTerm: {
    bookingDate: "",
    startTime: "",
    endTime: "",
    additionalDates: [
      {
        id: `row-${Date.now()}`,
        date: "",
        startTime: "",
        endTime: "",
      },
    ],
  },
  longTerm: {
    children: ["Augustina Midgett", "Johnsie Jock"],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    days: [],
  },
});

export default function BookingRenderer({
  field,
  activeBlockId,
  activeSectionId,
}: Props) {
  const dispatch = useDispatch();
  const bookingData: BookingData = useMemo(
    () => field?.bookingData || createDefaultBookingData(),
    [field?.bookingData],
  );
  const [tab, setTab] = useState<"short" | "long">(bookingData.tab);
  const [shortTerm, setShortTerm] = useState(bookingData.shortTerm);
  const [longTerm, setLongTerm] = useState(bookingData.longTerm);

  useEffect(() => {
    setTab(bookingData.tab);
    setShortTerm(bookingData.shortTerm);
    setLongTerm(bookingData.longTerm);
  }, [bookingData]);

  const syncBookingData = (nextData: BookingData) => {
    if (!activeBlockId || !field?.id) return;

    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: field.id,
        key: "bookingData",
        value: nextData,
      }),
    );
  };

  const updateTab = (nextTab: "short" | "long") => {
    setTab(nextTab);
    syncBookingData({
      ...bookingData,
      tab: nextTab,
    });
  };

  const updateShortTerm = (patch: Partial<BookingData["shortTerm"]>) => {
    const nextShortTerm = { ...shortTerm, ...patch };
    setShortTerm(nextShortTerm);
    syncBookingData({
      ...bookingData,
      tab,
      shortTerm: nextShortTerm,
      longTerm,
    });
  };

  const updateLongTerm = (patch: Partial<BookingData["longTerm"]>) => {
    const nextLongTerm = { ...longTerm, ...patch };
    setLongTerm(nextLongTerm);
    syncBookingData({
      ...bookingData,
      tab,
      shortTerm,
      longTerm: nextLongTerm,
    });
  };

  const updateAdditionalDate = (
    rowId: string,
    patch: Partial<AdditionalDateRow>,
  ) => {
    const nextAdditionalDates = shortTerm.additionalDates.map((row) =>
      row.id === rowId ? { ...row, ...patch } : row,
    );
    updateShortTerm({ additionalDates: nextAdditionalDates });
  };

  const addAdditionalDate = () => {
    updateShortTerm({
      additionalDates: [
        ...shortTerm.additionalDates,
        {
          id: `row-${Date.now()}`,
          date: "",
          startTime: "",
          endTime: "",
        },
      ],
    });
  };

  const addMultipleDates = () => {
    const nextRows = Array.from({ length: 3 }, () => ({
      id: `row-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: "",
      startTime: "",
      endTime: "",
    }));

    updateShortTerm({
      additionalDates: [...shortTerm.additionalDates, ...nextRows],
    });
  };

  const toggleDay = (day: string) => {
    const nextDays = longTerm.days.includes(day)
      ? longTerm.days.filter((item) => item !== day)
      : [...longTerm.days, day];
    updateLongTerm({ days: nextDays });
  };

  const setChildren = (children: string[]) => {
    updateLongTerm({ children });
  };

  return (
    <div className="space-y-4 w-full rounded-2xl border border-borderColor bg-white p-5">
      <div className="grid grid-cols-2 gap-2 rounded-full bg-bgColor p-1">
        <button
          type="button"
          onClick={() => updateTab("short")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "short"
              ? "border border-borderColor bg-white text-headerColor shadow-sm"
              : "text-gray-500"
          }`}
        >
          Short-Term Booking
        </button>
        <button
          type="button"
          onClick={() => updateTab("long")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "long"
              ? "border border-borderColor bg-white text-headerColor shadow-sm"
              : "text-gray-500"
          }`}
        >
          Long-Term Booking
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-headerColor flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          {field.label || "Set Booking Date & Time"}
          {field.required && <span className="text-red-500">*</span>}
        </h3>
        <p className="text-xs text-gray-500">
          Schedule when this job will take place
        </p>
      </div>

      {tab === "short" ? (
        <div className="space-y-5">
          <div className="space-y-3">
            <label className="text-xs font-semibold text-headerColor">
              Booking Date *
            </label>
            <DatePickerRenderer
              field={{
                label: "Booking Date",
                placeholder: "MM/DD/YYYY",
                value: shortTerm.bookingDate,
              }}
              value={shortTerm.bookingDate}
              onValueChange={(value) => updateShortTerm({ bookingDate: value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TimePickerRenderer
              field={{ label: "Start Time", value: shortTerm.startTime }}
              value={shortTerm.startTime}
              onValueChange={(value) => updateShortTerm({ startTime: value })}
            />
            <TimePickerRenderer
              field={{ label: "End Time", value: shortTerm.endTime }}
              value={shortTerm.endTime}
              onValueChange={(value) => updateShortTerm({ endTime: value })}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-headerColor">
              Add Additional Date
            </label>
            <div className="space-y-3">
              {shortTerm.additionalDates.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]"
                >
                  <DatePickerRenderer
                    field={{
                      label: "Additional Date",
                      placeholder: "MM/DD/YYYY",
                      value: row.date,
                    }}
                    value={row.date}
                    onValueChange={(value) =>
                      updateAdditionalDate(row.id, { date: value })
                    }
                  />
                  <TimePickerRenderer
                    field={{ label: "Start", value: row.startTime }}
                    value={row.startTime}
                    onValueChange={(value) =>
                      updateAdditionalDate(row.id, { startTime: value })
                    }
                  />
                  <TimePickerRenderer
                    field={{ label: "End", value: row.endTime }}
                    value={row.endTime}
                    onValueChange={(value) =>
                      updateAdditionalDate(row.id, { endTime: value })
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={addAdditionalDate}
                className="inline-flex items-center gap-2 rounded-md border border-borderColor bg-white px-3 py-2 text-xs font-semibold text-headerColor"
              >
                <Plus size={14} /> Add Another Date
              </button>
              <button
                type="button"
                onClick={addMultipleDates}
                className="inline-flex items-center gap-2 rounded-md border border-borderColor bg-white px-3 py-2 text-xs font-semibold text-headerColor"
              >
                <Plus size={14} /> Add Multiple Dates
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-headerColor">
              Select child for whom you need this job *
            </label>
            <DropdownRenderer
              field={{
                label: "Children",
                type: "multi_select",
                items: childOptions,
                value: longTerm.children,
              }}
              value={longTerm.children}
              onValueChange={setChildren}
            />
            <button
              type="button"
              className="text-xs font-medium text-gray-600 underline underline-offset-2"
              onClick={() => setChildren([])}
            >
              Clear
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-semibold text-headerColor">
              Booking Date & Time
            </h4>
            <p className="text-xs text-gray-500">
              Schedule when this job will take place
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DatePickerRenderer
              field={{ label: "Start Date", value: longTerm.startDate }}
              value={longTerm.startDate}
              onValueChange={(value) => updateLongTerm({ startDate: value })}
            />
            <DatePickerRenderer
              field={{ label: "End Date", value: longTerm.endDate }}
              value={longTerm.endDate}
              onValueChange={(value) => updateLongTerm({ endDate: value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TimePickerRenderer
              field={{ label: "Start Time", value: longTerm.startTime }}
              value={longTerm.startTime}
              onValueChange={(value) => updateLongTerm({ startTime: value })}
            />
            <TimePickerRenderer
              field={{ label: "End Time", value: longTerm.endTime }}
              value={longTerm.endTime}
              onValueChange={(value) => updateLongTerm({ endTime: value })}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-headerColor">
              Booking for *
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {dayOptions.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className="flex items-center gap-2 text-xs text-headerColor text-left"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border text-[10px] ${
                      longTerm.days.includes(day)
                        ? "border-headerColor bg-headerColor text-white"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {longTerm.days.includes(day) ? "✓" : ""}
                  </span>
                  <span>{day}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
