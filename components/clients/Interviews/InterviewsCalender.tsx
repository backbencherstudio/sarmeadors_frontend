"use client";
import CandidateScheduleInfoDialog from "@/components/candidate/CandidateScheduleInfoDialog";
import CandidateJobRenderSection from "@/components/candidate/myJobs/CandidateJobsRenderSection";
import FullCalenderCustomize from "@/components/common/FullCalenderCustomize";
import { jobEvents } from "@/demoData/DashboardData";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import InterviewScheduledFilterType from "./InterviewScheduledFilterType";

export default function InterviewsCalender() {
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event: any) => {
    console.log(event, "CHECK");
    setScheduledData(event);
    setIsOpen(true);
  };

  const renderJobEvent = (eventInfo: EventContentArg) => (
    <CandidateJobRenderSection eventInfo={eventInfo} onOpen={handleOpen} />
  );
  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<InterviewScheduledFilterType />}
          renderEvent={renderJobEvent}
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
