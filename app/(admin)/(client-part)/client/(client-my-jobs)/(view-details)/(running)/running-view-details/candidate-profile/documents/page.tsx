"use client";

import { NannyForm } from "@/components/client/AdditionalInformation/NannyForm";
import { useGetSingleClientMyCandidateQuery } from "@/feature/dashboard/client/myCandidate";
import { useParams } from "next/navigation";

export default function AdditionalInformation() {
  const { id } = useParams();
  const { data } = useGetSingleClientMyCandidateQuery(id);

  const additionalInformation = data?.data?.candidate?.additional_information;
  return (
    <div className="p-6 border border-gray-300 rounded-xl">
      {/* <NannyForm additionalInformation={additionalInformation} /> */}
    </div>
  );
}
