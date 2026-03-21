"use client";
import { useCalendarLogic } from "@/hooks/useCalendarLogic";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import FullCalenderHeader from "./FullCalenderHeader";
function FullCalenderCustomize({
  filterSection,
  renderEvent,
  data,
}: {
  filterSection?: React.ReactNode;
  renderEvent?: any;
  data: any;
}) {
  const {
    calendarRef,
    currentTitle,
    handleNext,
    handlePrev,
    handleToday,
    syncTitle,
  } = useCalendarLogic();
  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <FullCalenderHeader
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleToday={handleToday}
            currentTitle={currentTitle}
          />{" "}
        </div>
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
          {/* <div className="">
            <Search placeholder="Type..." />
          </div> */}
          <div>{filterSection}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="calendar-wrapper min-w-[1200px] [&_.fc]:text-sm [&_.fc-toolbar]:hidden [&_.fc-scrollgrid]:border-borderColor [&_.fc-scrollgrid-section-header_td]:border-borderColor [&_.fc-col-header-cell]:bg-grayColor1 [&_.fc-col-header-cell]:py-2 [&_.fc-col-header-cell-cushion]:text-sm [&_.fc-col-header-cell-cushion]:font-medium [&_.fc-col-header-cell-cushion]:text-blackColor [&_.fc-daygrid-day]:border-borderColor [&_.fc-daygrid-day-frame]:min-h-[116px] [&_.fc-daygrid-day-number]:p-3 [&_.fc-daygrid-day-number]:text-sm [&_.fc-daygrid-day-number]:font-medium [&_.fc-daygrid-day-number]:text-blackColor [&_.fc-daygrid-day-events]:space-y-1 [&_.fc-daygrid-day-events]:px-2 [&_.fc-daygrid-day-events]:pb-2 [&_.fc-daygrid-event]:m-0 [&_.fc-daygrid-event]:border-0 [&_.fc-daygrid-event]:bg-transparent [&_.fc-daygrid-event]:p-0 [&_.fc-daygrid-day.fc-day-today]:bg-transparent [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:rounded-md [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:bg-blackColor [&_.fc-daygrid-day.fc-day-today_.fc-daygrid-day-number]:text-white">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={new Date()}
            headerToolbar={false}
            events={data}
            eventContent={renderEvent}
            dayMaxEvents={3}
            fixedWeekCount={true}
            showNonCurrentDates={true}
            datesSet={syncTitle}
          />
        </div>
      </div>
    </div>
  );
}

export default FullCalenderCustomize;
