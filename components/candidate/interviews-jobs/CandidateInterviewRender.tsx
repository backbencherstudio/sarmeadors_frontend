"use client";
import { EventContentArg } from "@fullcalendar/core/index.js";
import Image from "next/image";

const CandidateInterviewRender = ({
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
        <Image
          src={"/profile.png"}
          alt="Profile"
          width={20}
          height={20}
          className="w-5 h-5 rounded-full "
        />
        <span className="truncate">
          {event.title} ({jobTime})
        </span>
      </button>
    </div>
  );
};

export default CandidateInterviewRender;
