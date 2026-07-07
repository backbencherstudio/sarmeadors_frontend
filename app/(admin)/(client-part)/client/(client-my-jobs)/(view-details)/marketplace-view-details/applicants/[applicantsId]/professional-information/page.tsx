"use client";

import ProfileProfessionalInformation from "@/components/profile/ProfileProfessionalInformation";
import { useGetSingleApplicantQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

export default function ProfessionalInformationCardPage() {
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const candidateId = params.get("candidateId");

  const { data } = useGetSingleApplicantQuery({
    jobId: jobId,
    applicantId: candidateId,
  });

  const professionalInfo = data?.data?.candidate?.professional_information;
  const reference = data?.data?.candidate?.reference;
  return (
    <div>
      <ProfileProfessionalInformation
        professionalInfo={professionalInfo}
        reference={reference}
      />
    </div>
  );
}
