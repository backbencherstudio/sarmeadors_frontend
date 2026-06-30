"use client";
import { JobClient, JobLocation, JobModal } from "@/types";
import { EventContentArg } from "@fullcalendar/core/index.js";

const CandidateJobRenderSection = ({
  eventInfo,
  onOpen,
}: {
  eventInfo: EventContentArg;
  onOpen: (event: any) => void;
}) => {
  const event = eventInfo.event;
  const { job_id, job_type, dotColor, time, description, location, client, modal } =
    event.extendedProps as {
      job_id: number;
      job_type: string;
      dotColor: string;
      description?: string;
      location?: JobLocation;
      client?: JobClient;
      modal: JobModal;
      time: {
        from: string;
        to: string;
      };
    };

  // Full object access
  const fullEventObject = {
    id: event.id,
    title: event.title,
    start: event.start ? new Date(event.start).toISOString() : null,
    allDay: event.allDay,
    job_id,
    job_type,
    dotColor,
    jobTime: time.from && time.to ? `${time.from} - ${time.to}` : "N/A",
    description,
    location,
    client,
    modal,
  };

  return (
    <div>
      <button
        onClick={() => onOpen(fullEventObject)}
        className="flex items-center cursor-pointer gap-1.5 py-1! text-[12px] bg-whiteColor! px-2! border border-borderColor! leading-4 text-headerColor w-full truncate"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{
            backgroundColor: job_type === "short_term" ? "#2B7FFF" : "#04A755",
          }}
        />
        <p className="flex   ">
          <span className="truncate w-[13ch]  ">{event.title}</span>
          <span className="">({time?.from ? `${time.from}` : "N/A"})</span>
        </p>
      </button>
    </div>
  );
};

export default CandidateJobRenderSection;
