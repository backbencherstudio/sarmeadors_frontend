"use client";

import { jobEvents } from "@/demoData/DashboardData";
import { useGetCandidateMyJobsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateDashboardSlice";
import { EventContentArg } from "@fullcalendar/core";
import { useState } from "react";
import FullCalenderCustomize from "../common/FullCalenderCustomize";
import CandidateScheduleInfoDialog from "./CandidateScheduleInfoDialog";
import CandidateJobTypeFilter from "./myJobs/CandidateJobTypeFilter";
import CandidateJobRenderSection from "./myJobs/CandidateJobsRenderSection";

function CandidateJobCalender() {
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetCandidateMyJobsQuery("candidate-my-jobs", {
    refetchOnMountOrArgChange: true,
  });
  const handleOpen = (event: any) => {
    setScheduledData(event);
    setIsOpen(true);
  };

  // console.log("data==============", data);

  const renderJobEvent = (eventInfo: EventContentArg) => (
    <CandidateJobRenderSection eventInfo={eventInfo} onOpen={handleOpen} />
  );

  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<CandidateJobTypeFilter />}
          renderEvent={renderJobEvent}
          data={data?.data?.events}
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

export default CandidateJobCalender;
