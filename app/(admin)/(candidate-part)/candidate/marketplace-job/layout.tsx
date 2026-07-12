import ResuableMenu from "@/components/common/ResuableMenu";
import React from "react";

function MarketPlaceJobLayout({ children }: { children: React.ReactNode }) {
  const candidateJobMenus = [
    {
      id: 1,
      title: "Short-Term Job",
      href: "/candidate/marketplace-job",
    },
    {
      id: 2,
      title: "long-Term Job",
      href: "/candidate/marketplace-job/long-term-job",
    },
  ];
  return (
    <div className="p-4 md:p-6">
      <h3 className="text-lg font-semibold text-headerColor mb-5">
        Job Opportunities
      </h3>
      <ResuableMenu
        initialPath="/candidate/marketplace-job"
        menuData={candidateJobMenus}
      />
      <div className="py-5">{children}</div>
    </div>
  );
}

export default MarketPlaceJobLayout;
