"use client";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import CandidateScheduleInfoDialog from "../CandidateScheduleInfoDialog";

const CandidateJobRenderSection = (eventInfo: EventContentArg) => {
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

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
  const handleOpen = (event: any) => {
    console.log(event, "CHECK");
    setScheduledData(event);
    setIsOpen(true);
  };

  return (
    <div>
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

      {isOpen && scheduledData && (
        <CandidateScheduleInfoDialog
          isOpen={isOpen}
          setOpen={() => setIsOpen(false)}
          data={scheduledData}
        />
      )}
    </div>
  );
};

export default CandidateJobRenderSection;
