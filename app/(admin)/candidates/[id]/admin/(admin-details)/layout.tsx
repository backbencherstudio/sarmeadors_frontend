import CandidatesAdminTabs from "@/components/candidates/CandidatesAdminTabs/CandidatesAdminTabs";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}
async function CandidatesAdminlayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;

  const { id } = resolvedParams;

  return (
    <div>
      <div className="md:mb-7 mb-5">
        <CandidatesAdminTabs id={id} />
      </div>
      {children}
    </div>
  );
}

export default CandidatesAdminlayout;
