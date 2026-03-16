import CandidateSingleJobsCancel from "@/components/candidate/myJobs/CandidateSingleJobsCancel";
import CandidateSingleJobsDetailsSidebar from "@/components/candidate/myJobs/CandidateSingleJobsDetailsSidebar";
import React from "react";

function CandidateJobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex border border-borderColor rounded-xl overflow-hidden ">
        <div className="max-w-[200px]">
          <CandidateSingleJobsDetailsSidebar />
        </div>
        <div className="p-4">{children}</div>
      </div>
      <CandidateSingleJobsCancel />
    </div>
  );
}

export default CandidateJobDetailsLayout;
