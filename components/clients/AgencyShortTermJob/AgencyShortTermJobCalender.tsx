"use client";
import FullCalenderCustomize from "@/components/common/FullCalenderCustomize";
import { shortTermJobEvents } from "@/demoData/DashboardData";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import InterviewRequestDialog from "../Interviews/InterviewRequestDialog";
import ShortTermJobFilterType from "./AgencyShortTermJobFilterType";
import ShortTermJobRenderSection from "./AgencyShortTermJobRenderSection";
import CandidateScheduleInfoDialog from "@/components/candidate/CandidateScheduleInfoDialog";
import ShortTermJobInfoDialog from "./AgencyShortTermJobInfoDialog";

export default function ShortTermJobCalender() {
  const [shortTermJobData, setShortTermJobData] = useState<any>(null);
  const [isShortTermJobOpen, setIsShortTermJobOpen] = useState(false);

  const handleOpen = (event: any) => {
    console.log(event, "CHECK");
    setShortTermJobData(event);
    setIsShortTermJobOpen(true);
  };

  const renderShortTermJobEvent = (eventInfo: EventContentArg) => (
    <ShortTermJobRenderSection eventInfo={eventInfo} onOpen={handleOpen} />
  );
  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<ShortTermJobFilterType />}
          renderEvent={renderShortTermJobEvent}
          data={shortTermJobEvents}
        />
      </div>

      {isShortTermJobOpen && shortTermJobData && (
        <ShortTermJobInfoDialog
          isOpen={isShortTermJobOpen}
          setOpen={() => setIsShortTermJobOpen(false)}
          data={shortTermJobData}
        />
      )}
    </div>
  );
}
