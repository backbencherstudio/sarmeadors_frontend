import CandidateProfileTabs from "@/components/candidates/ProfileTabs/CandidateProfileTabs";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}
async function CandidatesProfilelayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div>
      <div className="md:mb-7 mb-5">
        <CandidateProfileTabs id={id} />
      </div>
      {children}
    </div>
  );
}

export default CandidatesProfilelayout;
