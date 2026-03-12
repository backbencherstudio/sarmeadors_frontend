"use client";

import { EventContentArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import CandidateScheduleInfoDialog from "./CandidateScheduleInfoDialog";
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
const toCurrentMonthDate = (day: number) =>
  `${currentYear}-${currentMonth}-${String(day).padStart(2, "0")}`;

const jobEvents: EventInput[] = [
  {
    id: "1",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(1),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "2",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(2),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "3",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(3),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "4",
    title: "Jacob Jones",
    start: toCurrentMonthDate(4),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "5",
    title: "Courtney He...",
    start: toCurrentMonthDate(3),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
  {
    id: "6",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(7),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "7",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(8),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "8",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(9),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "9",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(10),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "10",
    title: "Jacob Jones",
    start: toCurrentMonthDate(10),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "11",
    title: "Courtney He...",
    start: toCurrentMonthDate(11),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
  {
    id: "12",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(14),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "13",
    title: "Jacob Jones",
    start: toCurrentMonthDate(14),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "14",
    title: "Courtney He...",
    start: toCurrentMonthDate(14),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
  {
    id: "15",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(17),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "16",
    title: "Jacob Jones",
    start: toCurrentMonthDate(17),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "17",
    title: "Courtney He...",
    start: toCurrentMonthDate(17),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
  {
    id: "18",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(21),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "19",
    title: "Jacob Jones",
    start: toCurrentMonthDate(21),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "20",
    title: "Courtney He...",
    start: toCurrentMonthDate(21),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
  {
    id: "21",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(23),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "22",
    title: "Jacob Jones",
    start: toCurrentMonthDate(23),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "23",
    title: "Courtney He...",
    start: toCurrentMonthDate(24),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
  {
    id: "24",
    title: "Darlene Rob...",
    start: toCurrentMonthDate(30),
    allDay: true,
    extendedProps: { type: "long", dotColor: "#3B82F6", jobTime: "3:35 pm" },
  },
  {
    id: "25",
    title: "Jacob Jones",
    start: toCurrentMonthDate(31),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "4:23 pm" },
  },
  {
    id: "26",
    title: "Courtney He...",
    start: toCurrentMonthDate(31),
    allDay: true,
    extendedProps: { type: "short", dotColor: "#16A34A", jobTime: "3:25 pm" },
  },
];

type JobFilter = "all" | "short" | "long";

function CandidateJobCalender() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentTitle, setCurrentTitle] = useState(
    new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
  );
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
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
    return jobEvents.filter(
      (event) => (event.extendedProps as any)?.type === filter,
    );
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
  const handleOpen = (event: any) => {
    console.log(event, "CHECK");
    // Handle event click to open details
    setScheduledData(event);
    setIsOpen(true);
  };

  const renderEvent = (eventInfo: EventContentArg) => {
    const event = eventInfo.event;
    const { type, dotColor, jobTime } = event.extendedProps as {
      type: string;
      dotColor: string;
      jobTime: string;
    };

    // Full object access
    const fullEventObject = {
      id: event.id,
      title: event.title,
      start: event.start ? new Date(event.start).toISOString() : null,
      allDay: event.allDay,
      type,
      dotColor,
      jobTime,
    };

    return (
      <button
        onClick={() => handleOpen(fullEventObject)}
        className="flex items-center cursor-pointer gap-1.5 py-1! text-[12px] bg-whiteColor! px-2! border border-borderColor! leading-4 text-headerColor w-full truncate"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor || "#fff" }}
        />
        <span className="truncate">
          {event.title} ({jobTime})
        </span>
      </button>
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
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
          <div className="rounded-md border border-borderColor px-4 py-3">
            <Search className="h-5 w-5 text-blackColor" />
          </div>
          <div className="min-w-0 max-w-full overflow-x-auto rounded-md border border-borderColor px-2 py-1.5 md:w-[411px]">
            <div className="flex w-max min-w-max flex-nowrap items-center gap-3">
              {filterOptions.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={`flex shrink-0 items-center gap-1 cursor-pointer rounded-sm py-2 px-3 text-sm font-medium ${
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
      </div>

      <div className="calendar-wrapper [&_.fc]:text-sm [&_.fc-toolbar]:hidden [&_.fc-scrollgrid]:border-borderColor [&_.fc-scrollgrid-section-header_td]:border-borderColor [&_.fc-col-header-cell]:bg-grayColor1 [&_.fc-col-header-cell]:py-2 [&_.fc-col-header-cell-cushion]:text-xs [&_.fc-col-header-cell-cushion]:font-medium [&_.fc-col-header-cell-cushion]:text-secondaryColor [&_.fc-daygrid-day]:border-borderColor [&_.fc-daygrid-day-number]:text-xs [&_.fc-daygrid-day-number]:text-secondaryColor [&_.fc-daygrid-day-number]:font-medium [&_.fc-daygrid-day-number]:p-2 [&_.fc-daygrid-day-frame]:min-h-[88px] [&_.fc-daygrid-day-events]:mt-0 [&_.fc-daygrid-event]:bg-transparent [&_.fc-daygrid-event]:border-0 [&_.fc-daygrid-event]:p-0 [&_.fc-daygrid-event]:mx-1 [&_.fc-daygrid-event]:my-0.5 [&_.fc-daygrid-day.fc-day-today]:bg-transparent [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:bg-blackColor [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:text-white [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:rounded-md [&_.fc-daygrid-more-link]:text-[10px] [&_.fc-daygrid-more-link]:text-blueColor [&_.fc-daygrid-more-link]:font-medium">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={new Date()}
          headerToolbar={false}
          events={filteredEvents}
          eventContent={renderEvent}
          dayMaxEvents={3}
          fixedWeekCount={true}
          showNonCurrentDates={true}
          datesSet={syncTitle}
        />
      </div>

      {isOpen && scheduledData && (
        <CandidateScheduleInfoDialog
          isOpen={isOpen}
          setOpen={() => setIsOpen(false)}
          data={scheduledData}
        />
      )}
    </div>
  );
}

export default CandidateJobCalender;
