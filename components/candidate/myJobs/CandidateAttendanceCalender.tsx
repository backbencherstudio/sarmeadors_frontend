"use client";

import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";
import CandidateJobDailyActivityFilter from "./CandidateJobDailyActivityFilter";
import CandidateJobDailyActivityHeader from "./CandidateJobDailyActivityHeader";
import CandidateJobDailyActivityRenderCalender from "./CandidateJobDailyActivityRenderCalender";

const attendanceData: EventInput[] = [
  // January 2026
  {
    id: "2026-01-01-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "5:02 PM",
    total: "2 hr 11 min",
    start: "2026-01-01",
    attandance: "present",
    allDay: true,
  },

  {
    id: "2026-01-02-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "5:02 PM",
    total: "2 hr 11 min",
    start: "2026-01-03",
    attandance: "present",
  },
  {
    id: "2026-01-03-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    total: "2 hr 11 min",
    title: "5:02 PM",
    start: "2026-01-04",
    allDay: true,
    attandance: "present",
  },
  {
    id: "2026-01-04-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    total: "2 hr 11 min",
    title: "5:02 PM",
    start: "2026-01-05",
    allDay: true,
    attandance: "present",
  },
  {
    id: "2026-01-04-out",
    check_in: "",
    check_out: "",
    title: "8:05 PM",
    total: "2 hr 11 min",
    start: "2026-01-06",
    allDay: true,
    attandance: "present",
  },
  {
    id: "2026-01-04-total",
    title: "2 hr 11 min",
    check_in: "8:00 AM",
    total: "2 hr 11 min",
    check_out: "5:02 PM",
    start: "2026-01-07",
    allDay: true,
    attandance: "present",
  },

  {
    id: "2026-01-05-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "5:02 PM",
    total: "2 hr 11 min",
    start: "2026-01-08",
    allDay: true,
    attandance: "present",
  },
  {
    id: "2026-01-05-out",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "8:05 PM",
    total: "2 hr 11 min",
    start: "2026-01-09",
    allDay: true,
    attandance: "absent",
  },
  {
    id: "2026-01-05-total",
    title: "2 hr 00 min",
    check_in: "8:00 AM",
    total: "2 hr 11 min",
    check_out: "5:02 PM",
    start: "2026-01-10",
    allDay: true,
    attandance: "present",
  },
];

function CandidateAttendanceCalender() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("2026-01");

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(`${value}-01`);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-borderColor bg-white">
      <CandidateJobDailyActivityHeader />
      <CandidateJobDailyActivityFilter
        selectedMonth={selectedMonth}
        handleMonthChange={handleMonthChange}
      />
      <div className="overflow-x-auto">
        <div className="calendar-wrapper min-w-[1200px] [&_.fc]:text-sm [&_.fc-toolbar]:hidden [&_.fc-scrollgrid]:border-borderColor [&_.fc-scrollgrid-section-header_td]:border-borderColor [&_.fc-col-header-cell]:bg-grayColor1 [&_.fc-col-header-cell]:py-2 [&_.fc-col-header-cell-cushion]:text-sm [&_.fc-col-header-cell-cushion]:font-medium [&_.fc-col-header-cell-cushion]:text-blackColor [&_.fc-daygrid-day]:border-borderColor [&_.fc-daygrid-day-frame]:min-h-[116px] [&_.fc-daygrid-day-number]:p-3 [&_.fc-daygrid-day-number]:text-sm [&_.fc-daygrid-day-number]:font-medium [&_.fc-daygrid-day-number]:text-blackColor [&_.fc-daygrid-day-events]:space-y-1 [&_.fc-daygrid-day-events]:px-2 [&_.fc-daygrid-day-events]:pb-2 [&_.fc-daygrid-event]:m-0 [&_.fc-daygrid-event]:border-0 [&_.fc-daygrid-event]:bg-transparent [&_.fc-daygrid-event]:p-0 [&_.fc-daygrid-day.fc-day-today]:bg-transparent [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:rounded-md [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:bg-blackColor [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:text-white">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            initialDate={`${selectedMonth}-01`}
            headerToolbar={false}
            events={attendanceData}
            eventContent={CandidateJobDailyActivityRenderCalender}
            dayMaxEvents={4}
            fixedWeekCount={true}
            showNonCurrentDates={true}
            displayEventTime={false}
          />
        </div>
      </div>
    </section>
  );
}

export default CandidateAttendanceCalender;
