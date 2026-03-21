"use client";

import FullCalenderCustomize from "@/components/common/FullCalenderCustomize";
import { jobEvents } from "@/demoData/DashboardData";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import CandidateJobTypeFilter from "../myJobs/CandidateJobTypeFilter";
import CandidateInterviewDialog from "./CandidateInterviewDialog";
import CandidateInterviewRender from "./CandidateInterviewRender";

function CandidateJobInterviewsDate() {
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event: any) => {
    setScheduledData(event);
    setIsOpen(true);
  };

  const renderInterviewEvent = (eventInfo: EventContentArg) => (
    <CandidateInterviewRender eventInfo={eventInfo} onOpen={handleOpen} />
  );

  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<CandidateJobTypeFilter />}
          renderEvent={renderInterviewEvent}
          data={jobEvents}
        />

        {isOpen && scheduledData && (
          <CandidateInterviewDialog
            isOpen={isOpen}
            setOpen={() => setIsOpen(false)}
            data={scheduledData}
          />
        )}
      </div>
    </div>
  );
}

export default CandidateJobInterviewsDate;
