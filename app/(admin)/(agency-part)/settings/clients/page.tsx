"use client";
import AccessControlAndVisibilitySettings from "@/components/agency/globalSetting/candidates/AccessControlAndVisibilitySettings";
import CandidateDashboardSettings from "@/components/agency/globalSetting/candidates/CandidateDashboardSettings";
import CandidateTypesTagsChecklistSettings from "@/components/agency/globalSetting/candidates/CandidateTypesTagsChecklistSettings";
import Documents from "@/components/agency/globalSetting/candidates/Documents";
import ProfileSettings from "@/components/agency/globalSetting/candidates/ProfileSettings";
import RegistrationFeeSettings from "@/components/agency/globalSetting/candidates/RegistrationFeeSettings";
import ScheduleAvailabilitySettings from "@/components/agency/globalSetting/candidates/ScheduleAvailabilitySettings";
import { useGetClientsSettingsQuery } from "@/feature/slice/settings/clients/ClientsSettingsSlice";

export default function ClientsPage() {
  const { data: settingsData, isLoading } =
    useGetClientsSettingsQuery("clientsSettings");

  const dashboardData = settingsData?.data?.dashboard;
  const registrationFeeData = settingsData?.data?.registration_fee;
  const accessControlData = settingsData?.data?.access_control;
  const profileData = settingsData?.data?.profile;
  const scheduleData = settingsData?.data?.schedule_availability;
  return (
    <div className="space-y-4">
      <CandidateDashboardSettings
        dashboardData={dashboardData}
        isLoading={isLoading}
      />
      <CandidateTypesTagsChecklistSettings type="client" />
      <ProfileSettings profileData={profileData} isLoading={isLoading} />
      <AccessControlAndVisibilitySettings
        accessControlData={accessControlData}
        isLoading={isLoading}
      />
      <RegistrationFeeSettings
        registrationFeeData={registrationFeeData}
        isLoading={isLoading}
      />
      <Documents settingsData={settingsData} isLoading={isLoading} />
       <ScheduleAvailabilitySettings scheduleData={scheduleData} isLoading={isLoading} />
    </div>
  );
}
