

import { jobEvents } from "@/demoData/DashboardData";
import FullCalenderCustomize from "../common/FullCalenderCustomize";
import CandidateJobTypeFilter from "./myJobs/CandidateJobTypeFilter";
import CandidateJobRenderSection from "./myJobs/CandidateJobsRenderSection";

function CandidateJobCalender() {
  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={<CandidateJobTypeFilter />}
          renderEvent={CandidateJobRenderSection}
          data={jobEvents}
        />
      </div>
    </div>
  );
}

export default CandidateJobCalender;
