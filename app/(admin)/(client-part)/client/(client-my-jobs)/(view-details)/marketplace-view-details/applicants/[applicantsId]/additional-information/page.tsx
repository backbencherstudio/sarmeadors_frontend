"use client";

import { NannyForm } from "@/components/client/AdditionalInformation/NannyForm";
import { useGetSingleApplicantQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const candidateId = params.get("candidateId");

  const { data } = useGetSingleApplicantQuery({
    jobId: jobId,
    applicantId: candidateId,
  });
  const additionalInformation = data?.data?.candidate?.additional_information;

  return (
    <div className="p-6 border border-gray-300 rounded-xl">
      <NannyForm additionalInformation={additionalInformation} />
    </div>
  );
}
