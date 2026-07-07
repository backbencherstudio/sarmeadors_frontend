"use client";
import { EventContentArg } from "@fullcalendar/core/index.js";

const CandidateInterviewRender = ({
  eventInfo,
  onOpen,
}: {
  eventInfo: EventContentArg;
  onOpen: (event: any) => void;
}) => {
  const event = eventInfo.event;
  const interview = event.extendedProps?.interview as any;

  const fullEventObject = {
    id: event.id,
    title: event.title,
    start: event.start ? new Date(event.start).toISOString() : null,
    allDay: event.allDay,
    date: interview?.date,
    time: interview?.time,
    status: interview?.status,
    status_label: interview?.status_label,
    period: interview?.period,
    meeting: interview?.meeting,
    client: interview?.client,
    job_type: interview?.job_type,
    job_type_label: interview?.job_type_label,
    description: interview?.description,
    description_preview: interview?.description_preview,
    location: interview?.location,
    modal: interview?.modal,
    dotClass: interview?.dotClass,
  };

  return (
    <div>
      <button
        onClick={() => onOpen(fullEventObject)}
        className="flex items-center cursor-pointer gap-1.5 py-1! text-[12px] bg-whiteColor! px-2! border border-borderColor! leading-4 text-headerColor w-full truncate"
      >
        {event.extendedProps?.dotClass && (
          <span
            className={`inline-block w-2 h-2 rounded-full shrink-0 ${event.extendedProps?.dotClass}`}
          />
        )}
        <span className="truncate">
          {event.title} - {interview?.time?.range || ""}
        </span>
      </button>
    </div>
  );
};

export default CandidateInterviewRender;
