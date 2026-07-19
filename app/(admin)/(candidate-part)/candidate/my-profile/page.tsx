"use client";

import React, { useState } from "react";
import UserInfo from "@/components/clients/UserInfo";
import ProfilePersonalInformation from "@/components/profile/ProfilePersonalInformation";
import ProfileProfessionalInformation from "@/components/profile/ProfileProfessionalInformation";
import CandidateDocumentPage from "@/components/candidate/candidate-document/CandidateDocumentPage";
import ProfileAdditionalInformation from "@/components/profile/ProfileAdditionalInformation";
import ProfilePasswordChange from "@/components/profile/ProfilePasswordChange";
import { useGetCandidateMyProfileQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyProfileSlice";

function getActiveSectionContent(activeSection: string) {
  switch (activeSection) {
    case "profile-account":
      return <ProfilePersonalInformation />;
    case "professional-information":
      return <ProfileProfessionalInformation />;
    case "documents":
      return <CandidateDocumentPage />;
    case "additional-information":
      return <ProfileAdditionalInformation />;
    case "change-password":
      return <ProfilePasswordChange />;
    default:
      return <ProfilePersonalInformation />;
  }
}

export default function CandidateMyProfilePage() {
  const [activeSection, setActiveSection] = useState("profile-account");
  const { data, isLoading, isError } = useGetCandidateMyProfileQuery(
    "candidateMyProfile",
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const tabs = [
    { label: "Personal Information", value: "profile-account" },
    { label: "Professional Information", value: "professional-information" },
    { label: "Documents", value: "documents" },
    { label: "Additional Information", value: "additional-information" },
    { label: "Change Password", value: "change-password" },
  ];

  return (
    <div className="mt-4 space-y-4 p-4 md:p-6">
      <div className="w-full">
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-5xl justify-between bg-transparent border border-gray-200 p-1 h-auto gap-0 rounded-lg w-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveSection(tab.value)}
                className={`flex items-center justify-center w-full gap-2 px-3 py-2 xl:px-4 lg:py-3 rounded-lg text-sm lg:text-base border-0 text-gray-400 font-normal cursor-pointer ${
                  activeSection === tab.value ? "bg-[#111927] text-white" : ""
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <UserInfo />
      </div>
      {getActiveSectionContent(activeSection)}
    </div>
  );
}
