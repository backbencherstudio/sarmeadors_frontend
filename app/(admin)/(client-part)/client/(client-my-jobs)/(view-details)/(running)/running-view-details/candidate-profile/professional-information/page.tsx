"use client";

import ProfileProfessionalInformation from "@/components/profile/ProfileProfessionalInformation";
import { useGetSingleClientMyCandidateQuery } from "@/feature/dashboard/client/myCandidate";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();

  const { data } = useGetSingleClientMyCandidateQuery(id);

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
