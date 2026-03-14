"use client";

import { EventContentArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { AlarmClockCheck, FileText } from "lucide-react";
import { useRef, useState } from "react";
import SelecteInputField from "../../common/InputFiled/SelecteInputField";

const attendanceData: EventInput[] = [
  // January 2026
  {
    id: "2026-01-01-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "5:02 PM",
    total: "2 hr 11 min",
    start: "2026-01-01",
    allDay: true,
  },

  {
    id: "2026-01-02-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "5:02 PM",
    total: "2 hr 11 min",
    start: "2026-01-03",
    allDay: true,
  },
  {
    id: "2026-01-03-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    total: "2 hr 11 min",
    title: "5:02 PM",
    start: "2026-01-04",
    allDay: true,
  },
  {
    id: "2026-01-04-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    total: "2 hr 11 min",
    title: "5:02 PM",
    start: "2026-01-05",
    allDay: true,
  },
  {
    id: "2026-01-04-out",
    check_in: "",
    check_out: "",
    title: "8:05 PM",
    total: "2 hr 11 min",
    start: "2026-01-06",
    allDay: false,
  },
  {
    id: "2026-01-04-total",
    title: "2 hr 11 min",
    check_in: "8:00 AM",
    total: "2 hr 11 min",
    check_out: "5:02 PM",
    start: "2026-01-07",
    allDay: true,
  },

  {
    id: "2026-01-05-in",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "5:02 PM",
    total: "2 hr 11 min",
    start: "2026-01-08",
    allDay: true,
  },
  {
    id: "2026-01-05-out",
    check_in: "8:00 AM",
    check_out: "5:02 PM",
    title: "8:05 PM",
    total: "2 hr 11 min",
    start: "2026-01-09",
    allDay: true,
  },
  {
    id: "2026-01-05-total",
    title: "2 hr 00 min",
    check_in: "8:00 AM",
    total: "2 hr 11 min",
    check_out: "5:02 PM",
    start: "2026-01-10",
    allDay: true,
  },
];

const monthOptions = [
  { value: "2025-11", label: "November 2025" },
  { value: "2025-12", label: "December 2025" },
  { value: "2026-01", label: "January 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-03", label: "March 2026" },
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

  const renderEvent = (eventInfo: EventContentArg) => {
    const {check_in, check_out, total} = eventInfo.event.extendedProps;
    console.log(eventInfo.event.allDay, "check");

    return (
      <div className="text-[11px]  text-left leading-4 text-headerColor space-y-1">
        <div>
          <p className="text-xs font-medium px-1.5 py-1 inline-block rounded bg-bgColor">
            <span className="text-greenColor">Check In</span> {check_in}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium px-1.5 py-1 inline-block rounded bg-bgColor">
            <span className="text-blueColor">Check Out</span> {check_out}
          </p>
        </div>

        <p className="text-xs font-medium text-lightblackColor px-1.5 py-1 inline-block rounded bg-[#FFFAE5]">
          {total}
        </p>
      </div>
    );
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-borderColor bg-white">
      <div className="grid grid-cols-1 gap-3 border-b border-borderColor bg-blackColor px-4 py-3 text-white md:grid-cols-6 md:items-center">
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="text-xl font-semibold">$35/hr</p>
          <p className="text-sm text-white/75">Compensation</p>
        </div>
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="text-xl font-semibold">100 hr</p>
          <p className="text-sm text-white/75">Total Worked Hour</p>
        </div>
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="text-xl font-semibold">$35000</p>
          <p className="text-sm text-white/75">
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blueColor" />
            Total Earning
          </p>
        </div>
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="text-xl font-semibold">$25000</p>
          <p className="text-sm text-white/75">
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-greenColor" />
            Total Payment
          </p>
        </div>
        <div>
          <p className="text-xl font-semibold">$10000</p>
          <p className="text-sm text-white/75">
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-redColor" />
            Due Payment
          </p>
        </div>
        <div className="flex justify-start md:justify-end">
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white">
            <FileText className="h-4 w-4" />
            View Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 border-b border-borderColor bg-white px-4 py-3 md:grid-cols-3 md:items-center">
        <div className="md:w-[190px]">
          <SelecteInputField
            value={selectedMonth}
            onValueChange={handleMonthChange}
            options={monthOptions}
            className="h-10! w-full! border border-borderColor bg-grayColor1! text-sm text-blackColor"
          />
        </div>

        <div className="flex items-center justify-center gap-2 border-borderColor md:border-x md:px-4">
          <AlarmClockCheck className="h-6 w-6 text-greenColor" />
          <div>
            <p className="text-base font-semibold text-blackColor">
              4 hr 11 min
            </p>
            <p className="text-sm text-secondaryColor">Today Working Period</p>
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-base font-semibold text-blackColor">
            08:00 AM - 05:00 PM
          </p>
          <p className="text-sm text-secondaryColor">
            Morning 8:00AM to 5:00PM
          </p>
        </div>
      </div>

      <div className="calendar-wrapper [&_.fc]:text-sm [&_.fc-toolbar]:hidden [&_.fc-scrollgrid]:border-borderColor [&_.fc-scrollgrid-section-header_td]:border-borderColor [&_.fc-col-header-cell]:bg-grayColor1 [&_.fc-col-header-cell]:py-2 [&_.fc-col-header-cell-cushion]:text-sm [&_.fc-col-header-cell-cushion]:font-medium [&_.fc-col-header-cell-cushion]:text-blackColor [&_.fc-daygrid-day]:border-borderColor [&_.fc-daygrid-day-frame]:min-h-[116px] [&_.fc-daygrid-day-number]:p-3 [&_.fc-daygrid-day-number]:text-sm [&_.fc-daygrid-day-number]:font-medium [&_.fc-daygrid-day-number]:text-blackColor [&_.fc-daygrid-day-events]:space-y-1 [&_.fc-daygrid-day-events]:px-2 [&_.fc-daygrid-day-events]:pb-2 [&_.fc-daygrid-event]:m-0 [&_.fc-daygrid-event]:border-0 [&_.fc-daygrid-event]:bg-transparent [&_.fc-daygrid-event]:p-0 [&_.fc-daygrid-day.fc-day-today]:bg-transparent [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:rounded-md [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:bg-blackColor [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:text-white">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate={`${selectedMonth}-01`}
          headerToolbar={false}
          events={attendanceData}
          eventContent={renderEvent}
          dayMaxEvents={4}
          fixedWeekCount={true}
          showNonCurrentDates={true}
          displayEventTime={false}
        />
      </div>
    </section>
  );
}

export default CandidateAttendanceCalender;
