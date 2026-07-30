"use client";
import AccessControlAndVisibilitySettings from "@/components/agency/globalSetting/candidates/AccessControlAndVisibilitySettings";
import CandidateDashboardSettings from "@/components/agency/globalSetting/candidates/CandidateDashboardSettings";
import CandidateTypesTagsChecklistSettings from "@/components/agency/globalSetting/candidates/CandidateTypesTagsChecklistSettings";
import Documents from "@/components/agency/globalSetting/candidates/Documents";
import ProfileSettings from "@/components/agency/globalSetting/candidates/ProfileSettings";
import ProfileSettings2 from "@/components/agency/globalSetting/candidates/ProfileSettings2";
import RegistrationFeeSettings from "@/components/agency/globalSetting/candidates/RegistrationFeeSettings";
import ScheduleAvailabilitySettings from "@/components/agency/globalSetting/candidates/ScheduleAvailabilitySettings";
import { useGetClientsSettingsQuery } from "@/feature/slice/settings/clients/ClientsSettingsSlice";

export default function ClientsPage() {
  const { data: settingsData, isLoading } =
    useGetClientsSettingsQuery("clientsSettings");

  const dashboardData = settingsData?.data?.dashboard;
  const registrationFeeData = settingsData?.data?.registration_fee;
  const accessControlData = settingsData?.data?.access_control;
  return (
    <div className="space-y-4">
      <CandidateDashboardSettings
        dashboardData={dashboardData}
        isLoading={isLoading}
      />
      <CandidateTypesTagsChecklistSettings type="client" />
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
