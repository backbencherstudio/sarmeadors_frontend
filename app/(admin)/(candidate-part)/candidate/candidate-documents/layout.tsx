import CandidateDocumentMenu from "@/components/candidate/CandidateDocumentMenu";
import React from "react";

function CandidateDocumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 md:p-6">
      <h3 className="text-lg font-semibold text-headerColor mb-6">
        My Documents
      </h3>
      <CandidateDocumentMenu />
      <div className="py-5">{children}</div>
    </div>
  );
}

export default CandidateDocumentLayout;
