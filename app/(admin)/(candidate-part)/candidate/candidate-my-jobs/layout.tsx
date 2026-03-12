import CandidateMyJobMenu from "@/components/candidate/CandidateMyJobMenu";
import React from "react";

function CandidateJobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:p-6 p-4 ">
      <div className="mb-3">
        <CandidateMyJobMenu />
      </div>
      {children}
    </div>
  );
}

export default CandidateJobLayout;
