import AccessControlAndVisibilitySettings from "@/components/agency/globalSetting/candidates/AccessControlAndVisibilitySettings";
import CandidateDashboardSettings from "@/components/agency/globalSetting/candidates/CandidateDashboardSettings";
import CandidateTypesTagsChecklistSettings from "@/components/agency/globalSetting/candidates/CandidateTypesTagsChecklistSettings";
import Documents from "@/components/agency/globalSetting/candidates/Documents";
import ProfileSettings from "@/components/agency/globalSetting/candidates/ProfileSettings";
import ProfileSettings2 from "@/components/agency/globalSetting/candidates/ProfileSettings2";
import RegistrationFeeSettings from "@/components/agency/globalSetting/candidates/RegistrationFeeSettings";
import ScheduleAvailabilitySettings from "@/components/agency/globalSetting/candidates/ScheduleAvailabilitySettings";
import React from "react";

export default function ClientsPage() {
  return (
    <div className="space-y-4">
      <CandidateDashboardSettings />
      <CandidateTypesTagsChecklistSettings />
      <ProfileSettings />
      <AccessControlAndVisibilitySettings />
      <RegistrationFeeSettings />
      <Documents />
      <ProfileSettings2 />
      <ScheduleAvailabilitySettings />
    </div>
  );
}
