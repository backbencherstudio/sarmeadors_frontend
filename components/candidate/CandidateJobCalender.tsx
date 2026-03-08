"use client";

import { EventContentArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ArrowRightIcon from "../icon/ArrowRightIcon";

type JobFilter = "all" | "short" | "long";

const jobEvents: EventInput[] = [
  {
    id: "1",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-01",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "2",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-02",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "3",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-03",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "4",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-03",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "5",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-03",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "6",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-07",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "7",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-08",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "8",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-09",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "9",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-10",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "10",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-10",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "11",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-10",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "12",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-14",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "13",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-14",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "14",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-14",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "15",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-17",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "16",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-17",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "17",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-17",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "18",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-21",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "19",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-21",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "20",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-21",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "21",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-23",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "22",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-23",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "23",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-24",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "24",
    title: "Darlene Rob... - 3:35 pm",
    start: "2026-01-30",
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6" },
  },
  {
    id: "25",
    title: "Jacob Jones - 4:23 pm",
    start: "2026-01-31",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
  {
    id: "26",
    title: "Courtney He... - 3:25 pm",
    start: "2026-01-31",
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A" },
  },
];

function CandidateJobCalender() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentTitle, setCurrentTitle] = useState("January 2026");
  const [filter, setFilter] = useState<JobFilter>("all");
  const filterOptions: {
    key: JobFilter;
    label: string;
    dotClass: string;
  }[] = [
    { key: "all", label: "All Jobs", dotClass: "bg-blackColor" },
    { key: "short", label: "Short-Term Jobs", dotClass: "bg-greenColor" },
    { key: "long", label: "Long-Term Jobs", dotClass: "bg-blueColor" },
  ];

  const filteredEvents = useMemo(() => {
    if (filter === "all") return jobEvents;
    return jobEvents.filter((event) => event.extendedProps?.type === filter);
  }, [filter]);

  const syncTitle = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    setCurrentTitle(api.view.title);
  };

  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    api.prev();
    syncTitle();
  };

  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    api.next();
    syncTitle();
  };

  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    api.today();
    syncTitle();
  };

  const renderEvent = (eventInfo: EventContentArg) => {
    const dotColor = eventInfo.event.extendedProps.dotColor || "#fff";
    return (
      <div className="flex items-center gap-1.5 py-1! text-[12px] bg-whiteColor! px-2! border border-borderColor! leading-4 text-headerColor w-full truncate">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
        <span className="truncate">{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToday}
            className="rounded-md border border-borderColor px-3 py-2 text-base font-semibold text-blackColor bg-grayColor1"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-md p-1.5 text-blackColor hover:bg-grayColor1"
            aria-label="Previous month"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <p className="min-w-[120px] text-center text-base font-semibold text-blackColor">
            {currentTitle}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md p-1.5 text-blackColor hover:bg-grayColor1"
            aria-label="Next month"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-borderColor px-4 py-3">
            <Search className="h-5 w-5 text-blackColor" />
          </div>
          <div className="flex items-center gap-3 rounded-md border border-borderColor px-2 py-1.5">
            {filterOptions.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`flex items-center gap-1 cursor-pointer rounded-sm text-blackColor py-2 px-3 text-sm font-medium ${
                  filter === item.key
                    ? "bg-bgColor border border-borderColor"
                    : "text-secondaryColor"
                }`}
              >
                <span className={`h-3 w-3 rounded-full ${item.dotClass}`} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="calendar-wrapper [&_.fc]:text-sm [&_.fc-toolbar]:hidden [&_.fc-scrollgrid]:border-borderColor [&_.fc-scrollgrid-section-header_td]:border-borderColor [&_.fc-col-header-cell]:bg-grayColor1 [&_.fc-col-header-cell]:py-2 [&_.fc-col-header-cell-cushion]:text-xs [&_.fc-col-header-cell-cushion]:font-medium [&_.fc-col-header-cell-cushion]:text-secondaryColor [&_.fc-daygrid-day]:border-borderColor [&_.fc-daygrid-day-number]:text-xs [&_.fc-daygrid-day-number]:text-secondaryColor [&_.fc-daygrid-day-number]:font-medium [&_.fc-daygrid-day-number]:p-2 [&_.fc-daygrid-day-frame]:min-h-[88px] [&_.fc-daygrid-day-events]:mt-0 [&_.fc-daygrid-event]:bg-transparent [&_.fc-daygrid-event]:border-0 [&_.fc-daygrid-event]:p-0 [&_.fc-daygrid-event]:mx-1 [&_.fc-daygrid-event]:my-0.5 [&_.fc-daygrid-day.fc-day-today]:bg-transparent [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:bg-blackColor [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:text-white [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:rounded-md [&_.fc-daygrid-more-link]:text-[10px] [&_.fc-daygrid-more-link]:text-blueColor [&_.fc-daygrid-more-link]:font-medium">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate="2026-01-01"
          headerToolbar={false}
          events={filteredEvents}
          eventContent={renderEvent}
          dayMaxEvents={3}
          fixedWeekCount={true}
          showNonCurrentDates={true}
          datesSet={syncTitle}
        />
      </div>
    </div>
  );
}

export default CandidateJobCalender;
