import CandidateMyJobMenu from "@/components/candidate/CandidateMyJobMenu";
import React from "react";

function CandidateJobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:p-6 p-4 ">
      <div>
        <CandidateMyJobMenu />
      </div>
      {children}
    </div>
  );
}

export default CandidateJobLayout;
