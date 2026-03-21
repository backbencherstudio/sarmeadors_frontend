import CandidateMyJobMenu from "@/components/candidate/CandidateMyJobMenu";
import React from "react";

function CandidateInterviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:p-6 p-4 ">
      <div className="mb-3">
        <CandidateMyJobMenu myInterviews={true} />
      </div>
      {children}
    </div>
  );
}

export default CandidateInterviewsLayout;
