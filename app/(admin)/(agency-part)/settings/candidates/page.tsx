"use client";

import { useGetCandidateSettingsQuery } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";
import AccessControlAndVisibilitySettings from "@/components/agency/globalSetting/candidates/AccessControlAndVisibilitySettings";
import CandidateDashboardSettings from "@/components/agency/globalSetting/candidates/CandidateDashboardSettings";
import CandidateTypesTagsChecklistSettings from "@/components/agency/globalSetting/candidates/CandidateTypesTagsChecklistSettings";
import Documents from "@/components/agency/globalSetting/candidates/Documents";
import ProfileSettings from "@/components/agency/globalSetting/candidates/ProfileSettings";
import ProfileSettings2 from "@/components/agency/globalSetting/candidates/ProfileSettings2";
import RegistrationFeeSettings from "@/components/agency/globalSetting/candidates/RegistrationFeeSettings";
import ScheduleAvailabilitySettings from "@/components/agency/globalSetting/candidates/ScheduleAvailabilitySettings";

export default function CandidatesPage() {
  const { data: settingsData, isLoading } =
    useGetCandidateSettingsQuery("candidateSettings");

  const dashboardData = settingsData?.data?.dashboard;
  const registrationFeeData = settingsData?.data?.registration_fee;
  const accessControlData = settingsData?.data?.access_control;

  return (
    <div className="space-y-4">
      <CandidateDashboardSettings
        dashboardData={dashboardData}
        isLoading={isLoading}
      />
      <CandidateTypesTagsChecklistSettings />
      <ProfileSettings />
      <AccessControlAndVisibilitySettings
        accessControlData={accessControlData}
        isLoading={isLoading}
      />
      <RegistrationFeeSettings
        registrationFeeData={registrationFeeData}
        isLoading={isLoading}
      />
      <Documents settingsData={settingsData} isLoading={isLoading} />
      <ProfileSettings2 />
      <ScheduleAvailabilitySettings />
    </div>
  );
}
