import CandidateSingleJobsMenus from "@/components/candidate/myJobs/CandidateSingleJobsMenus";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:p-6 p-4 ">
      <CandidateSingleJobsMenus />
      <div className="mt-4 md:mt-6">{children}</div>
    </div>
  );
}

export default layout;
