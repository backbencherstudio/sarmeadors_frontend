"use client";
import { EventContentArg } from "@fullcalendar/core/index.js";

const CandidateJobRenderSection = ({
  eventInfo,
  onOpen,
}: {
  eventInfo: EventContentArg;
  onOpen: (event: any) => void;
}) => {
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
    <div>
      <button
        onClick={() => onOpen(fullEventObject)}
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
    </div>
  );
};

export default CandidateJobRenderSection;
