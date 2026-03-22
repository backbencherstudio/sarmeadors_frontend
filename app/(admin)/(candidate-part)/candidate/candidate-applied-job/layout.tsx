import ResuableMenu from "@/components/common/ResuableMenu";
import React from "react";

function CandidateDocumentLayout({ children }: { children: React.ReactNode }) {
  const candidateJobMenus = [
    {
      id: 1,
      title: "Short-Term Job",
      href: "/candidate/candidate-applied-job",
    },
    {
      id: 2,
      title: "long-Term Job",
      href: "/candidate/candidate-applied-job/long-term-job",
    },
  ];
  return (
    <div className="p-4 md:p-6">
      <h3 className="text-lg font-semibold text-headerColor mb-5">
        Applied Job
      </h3>
      <ResuableMenu
        initialPath="/candidate/candidate-applied-job"
        menuData={candidateJobMenus}
      />
      <div className="py-5">
        <div className="py-5 rounded-3xl bg-gradient-to-t text-center px-4 from-[#049EC0]/5 to-[#049EC0]/30  mb-5">
          <p className="text-lightblackColor">
            Applied job records that have been closed for{" "}
            <span className="font-semibold headerColor">more than 30 days</span>{" "}
            will be automatically deleted.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default CandidateDocumentLayout;
