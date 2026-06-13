"use client";

import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { Plus } from "lucide-react";
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
  tabVisibility: {
    short: boolean;
    long: boolean;
  };
  shortTerm: {
    bookingDate: string;
    startTime: string;
    endTime: string;
    agencyFee: string;
    additionalDateEnabled: boolean;
    additionalDates: AdditionalDateRow[];
    additionalDateLabel?: string;
  };
  longTerm: {
    children: string[];
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    agencyFee: string;
    days: string[];
    additionalDateEnabled?: boolean;
    additionalDates?: AdditionalDateRow[];
    additionalDateLabel?: string;
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
  tabVisibility: {
    short: true,
    long: true,
  },
  shortTerm: {
    bookingDate: "",
    startTime: "",
    endTime: "",
    agencyFee: "100",
    additionalDateEnabled: true,
    additionalDates: [
      {
        id: `row-${Date.now()}`,
        date: "",
        startTime: "",
        endTime: "",
      },
    ],
    additionalDateLabel: "Add Additional Date",
  },
  longTerm: {
    children: ["Augustina Midgett", "Johnsie Jock"],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    agencyFee: "100",
    days: [],
    additionalDateEnabled: false,
    additionalDates: [],
    additionalDateLabel: "Add Additional Date",
  },
});

export default function BookingFormRenderer({
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
  const visibleTabs = bookingData.tabVisibility || { short: true, long: true };
  const visibleTabList = [
    visibleTabs.short ? "short" : null,
    visibleTabs.long ? "long" : null,
  ].filter(Boolean) as Array<"short" | "long">;
  const activeTab = visibleTabList.includes(tab)
    ? tab
    : visibleTabList[0] || "short";

  useEffect(() => {
    setTab(bookingData.tab);
    setShortTerm(bookingData.shortTerm);
    setLongTerm(bookingData.longTerm);
  }, [bookingData]);

  useEffect(() => {
    if (!visibleTabList.includes(tab) && visibleTabList.length > 0) {
      const nextTab = visibleTabList[0];
      setTab(nextTab);
      syncBookingData({
        ...bookingData,
        tab: nextTab,
        tabVisibility: visibleTabs,
      });
    }
  }, [bookingData, tab, visibleTabList, visibleTabs]);

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
    if (!visibleTabs[nextTab]) {
      return;
    }
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
      tabVisibility: visibleTabs,
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
      tabVisibility: visibleTabs,
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

  const updateLongAdditionalDate = (
    rowId: string,
    patch: Partial<AdditionalDateRow>,
  ) => {
    const nextAdditionalDates = (longTerm.additionalDates || []).map((row) =>
      row.id === rowId ? { ...row, ...patch } : row,
    );
    updateLongTerm({ additionalDates: nextAdditionalDates });
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

  const addLongAdditionalDate = () => {
    const next = [
      ...(longTerm.additionalDates || []),
      {
        id: `row-${Date.now()}`,
        date: "",
        startTime: "",
        endTime: "",
      },
    ];
    updateLongTerm({ additionalDates: next });
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

  const addLongMultipleDates = () => {
    const nextRows = Array.from({ length: 3 }, () => ({
      id: `row-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: "",
      startTime: "",
      endTime: "",
    }));

    updateLongTerm({
      additionalDates: [...(longTerm.additionalDates || []), ...nextRows],
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
    <div className="space-y-4 w-full rounded-2xl ">
      <div className="space-y-1">
        <h3 className="text-lg md:text-xl font-semibold text-headerColor flex items-center gap-2">
          {field.label || "Set Booking Date & Time"}
          {field.required && <span className="text-red-500">*</span>}
        </h3>
        <p className="text-sm md:text-base text-secondaryColor">
          Schedule when this job will take place
        </p>
      </div>
      <div
        className={`grid gap-2 rounded-sm border p-0.5 ${visibleTabList.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {visibleTabs.short && (
          <button
            type="button"
            onClick={() => updateTab("short")}
            className={`rounded-sm cursor-pointer px-4 py-2 text-sm font-semibold transition ${
              activeTab === "short"
                ? "border border-borderColor bg-bgColor text-headerColor "
                : "text-gray-500"
            }`}
          >
            Short-Term Booking
          </button>
        )}
        {visibleTabs.long && (
          <button
            type="button"
            onClick={() => updateTab("long")}
            className={`rounded-sm px-4 cursor-pointer py-2 text-sm font-semibold transition ${
              activeTab === "long"
                ? "border border-borderColor bg-bgColor text-headerColor "
                : "text-gray-500"
            }`}
          >
            Long-Term Booking
          </button>
        )}
      </div>

      {activeTab === "short" ? (
        <div className="space-y-5">
          <DatePickerRenderer
            field={{
              label: bookingData.shortTerm?.bookingDate || "Booking Date",
              placeholder: "MM/DD/YYYY",
              value: shortTerm.bookingDate,
            }}
            value={shortTerm.bookingDate}
            onValueChange={(value) => updateShortTerm({ bookingDate: value })}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TimePickerRenderer
              field={{
                label: bookingData.shortTerm?.startTime || "Start Time",
                value: shortTerm.startTime,
              }}
              value={shortTerm.startTime}
              onValueChange={(value) => updateShortTerm({ startTime: value })}
            />
            <TimePickerRenderer
              field={{
                label: bookingData.shortTerm?.endTime || "End Time",
                value: shortTerm.endTime,
              }}
              value={shortTerm.endTime}
              onValueChange={(value) => updateShortTerm({ endTime: value })}
            />
          </div>

          {shortTerm.additionalDateEnabled !== false && (
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
                        label:
                          bookingData.shortTerm?.additionalDateLabel ||
                          "Additional Date",
                        placeholder: "MM/DD/YYYY",
                        value: row.date,
                      }}
                      value={row.date}
                      onValueChange={(value) =>
                        updateAdditionalDate(row.id, { date: value })
                      }
                    />
                    <TimePickerRenderer
                      field={{
                        label: bookingData.shortTerm?.startTime || "Start",
                        value: row.startTime,
                      }}
                      value={row.startTime}
                      onValueChange={(value) =>
                        updateAdditionalDate(row.id, { startTime: value })
                      }
                    />
                    <TimePickerRenderer
                      field={{
                        label: bookingData.shortTerm?.endTime || "End",
                        value: row.endTime,
                      }}
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
          )}
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
              field={{
                label: bookingData.longTerm?.startDate || "Start Date",
                value: longTerm.startDate,
              }}
              value={longTerm.startDate}
              onValueChange={(value) => updateLongTerm({ startDate: value })}
            />
            <DatePickerRenderer
              field={{
                label: bookingData.longTerm?.endDate || "End Date",
                value: longTerm.endDate,
              }}
              value={longTerm.endDate}
              onValueChange={(value) => updateLongTerm({ endDate: value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TimePickerRenderer
              field={{
                label: bookingData.longTerm?.startTime || "Start Time",
                value: longTerm.startTime,
              }}
              value={longTerm.startTime}
              onValueChange={(value) => updateLongTerm({ startTime: value })}
            />
            <TimePickerRenderer
              field={{
                label: bookingData.longTerm?.endTime || "End Time",
                value: longTerm.endTime,
              }}
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
          {longTerm.additionalDateEnabled && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-headerColor">
                {bookingData.longTerm?.additionalDateLabel ||
                  "Add Additional Date"}
              </label>
              <div className="space-y-3">
                {(longTerm.additionalDates || []).map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]"
                  >
                    <DatePickerRenderer
                      field={{
                        label:
                          bookingData.longTerm?.additionalDateLabel ||
                          "Additional Date",
                        placeholder: "MM/DD/YYYY",
                        value: row.date,
                      }}
                      value={row.date}
                      onValueChange={(value) =>
                        updateLongAdditionalDate(row.id, { date: value })
                      }
                    />
                    <TimePickerRenderer
                      field={{
                        label: bookingData.longTerm?.startTime || "Start",
                        value: row.startTime,
                      }}
                      value={row.startTime}
                      onValueChange={(value) =>
                        updateLongAdditionalDate(row.id, { startTime: value })
                      }
                    />
                    <TimePickerRenderer
                      field={{
                        label: bookingData.longTerm?.endTime || "End",
                        value: row.endTime,
                      }}
                      value={row.endTime}
                      onValueChange={(value) =>
                        updateLongAdditionalDate(row.id, { endTime: value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addLongAdditionalDate}
                  className="inline-flex items-center gap-2 rounded-md border border-borderColor bg-white px-3 py-2 text-xs font-semibold text-headerColor"
                >
                  <Plus size={14} /> Add Another Date
                </button>
                <button
                  type="button"
                  onClick={addLongMultipleDates}
                  className="inline-flex items-center gap-2 rounded-md border border-borderColor bg-white px-3 py-2 text-xs font-semibold text-headerColor"
                >
                  <Plus size={14} /> Add Multiple Dates
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
