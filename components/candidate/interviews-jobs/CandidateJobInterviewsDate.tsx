"use client";

import FullCalenderCustomize from "@/components/common/FullCalenderCustomize";
import { jobEvents } from "@/demoData/DashboardData";
import { EventContentArg } from "@fullcalendar/core";
import { useState } from "react";
import CandidateJobTypeFilter from "../myJobs/CandidateJobTypeFilter";
import CandidateScheduleInfoDialog from "../CandidateScheduleInfoDialog";


function CandidateJobInterviewsDate() {
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event: any) => {
    console.log(event, "CHECK");
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
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<CandidateJobTypeFilter />}
          renderEvent={renderEvent}
          data={jobEvents}
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

export default CandidateJobInterviewsDate;
