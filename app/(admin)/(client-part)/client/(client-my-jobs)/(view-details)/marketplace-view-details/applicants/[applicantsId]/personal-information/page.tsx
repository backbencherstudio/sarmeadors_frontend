"use client";

import ProfilePersonalInformation from "@/components/profile/ProfilePersonalInformation";
import { useGetSingleApplicantQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

export default function page() {
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const candidateId = params.get("candidateId");

  const { data } = useGetSingleApplicantQuery({
    jobId: jobId,
    applicantId: candidateId,
  });

  const personalInfo = data?.data?.candidate?.personal_information;

  return (
    <div>
      <ProfilePersonalInformation personalInfo={personalInfo} />
    </div>
  );
}
