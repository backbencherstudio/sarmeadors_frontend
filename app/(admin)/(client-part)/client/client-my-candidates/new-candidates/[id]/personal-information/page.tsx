"use client";

import ProfilePersonalInformation from "@/components/profile/ProfilePersonalInformation";
import { useGetSingleClientMyCandidateQuery } from "@/feature/dashboard/client/myCandidate";
import { useParams } from "next/navigation";

export default function PersonalInfoemation() {
  const { id } = useParams();
  const { data } = useGetSingleClientMyCandidateQuery(id);

  const personalInfo = data?.data?.candidate?.personal_information;
  return (
    <div className="mt-6">
      <ProfilePersonalInformation personalInfo={personalInfo} />
    </div>
  );
}
