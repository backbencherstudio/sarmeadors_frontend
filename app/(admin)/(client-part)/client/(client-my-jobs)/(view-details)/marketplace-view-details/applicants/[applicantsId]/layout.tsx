"use client";

import ProfileAndReview from "@/components/client/ClientMyJobs/ShortTermJob/Marketplace/Applicants/(view-details)/ProfileAndReview";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import { useParams, useSearchParams } from "next/navigation";

export default function SingleAplicantsLayout({ children }) {
  const { applicantsId } = useParams();

  const params = useSearchParams();
  const jobId = params.get("jobId");
  const candidateId = params.get("candidateId");

  const tabs = [
    {
      label: "Personal Information",
      link: `/client/marketplace-view-details/applicants/${applicantsId}/personal-information?jobId=${jobId}&candidateId=${candidateId}`,
    },
    {
      label: "Professional Information",
      link: `/client/marketplace-view-details/applicants/${applicantsId}/professional-information?jobId=${jobId}&candidateId=${candidateId}`,
    },
    {
      label: "Documents",
      link: `/client/marketplace-view-details/applicants/${applicantsId}/documents?jobId=${jobId}&candidateId=${candidateId}`,
    },
    {
      label: "Additional Information",
      link: `/client/marketplace-view-details/applicants/${applicantsId}/additional-information?jobId=${jobId}&candidateId=${candidateId}`,
    },
  ];
  return (
    <div className="space-y-4">
      <ProfileAndReview />
      <ReusableTabs tabs={tabs} initialPath={tabs[0]?.link} />
      {children}
    </div>
  );
}
