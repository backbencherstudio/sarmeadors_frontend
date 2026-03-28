"use client";
import FullCalenderCustomize from "@/components/common/FullCalenderCustomize";
import { interviewEvents } from "@/demoData/DashboardData";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import InterviewRenderSection from "./InterviewRenderSection";
import InterviewRequestDialog from "./InterviewRequestDialog";
import InterviewScheduledFilterType from "./InterviewScheduledFilterType";

export default function InterviewsCalender() {
  const [requestInterviewData, setRequestInterviewData] = useState<any>(null);
  const [isRequestInterviewOpen, setIsRequestInterviewOpen] = useState(false);

  const handleOpen = (event: any) => {
    console.log(event, "CHECK");
    setRequestInterviewData(event);
    setIsRequestInterviewOpen(true);
  };

  const renderInterviewEvent = (eventInfo: EventContentArg) => (
    <InterviewRenderSection eventInfo={eventInfo} onOpen={handleOpen} />
  );
  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<InterviewScheduledFilterType />}
          renderEvent={renderInterviewEvent}
          data={interviewEvents}
        />
      </div>

      {isRequestInterviewOpen && requestInterviewData && (
        <InterviewRequestDialog
          isOpen={isRequestInterviewOpen}
          setOpen={() => setIsRequestInterviewOpen(false)}
          data={requestInterviewData}
        />
      )}
    </div>
  );
}
