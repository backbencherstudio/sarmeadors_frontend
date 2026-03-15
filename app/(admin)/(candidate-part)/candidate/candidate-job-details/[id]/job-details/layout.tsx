import CandidateSingleJobsDetailsSidebar from "@/components/candidate/myJobs/CandidateSingleJobsDetailsSidebar";
import React from "react";

function CandidateJobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex border border-borderColor rounded-xl overflow-hidden ">
      <div className="max-w-[300px]">
        <CandidateSingleJobsDetailsSidebar />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default CandidateJobDetailsLayout;
