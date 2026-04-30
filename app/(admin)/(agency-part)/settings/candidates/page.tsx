import AccessControlAndVisibilitySettings from "@/components/agency/globalSetting/candidates/AccessControlAndVisibilitySettings";
import CandidateDashboardSettings from "@/components/agency/globalSetting/candidates/CandidateDashboardSettings";
import CandidateTypesTagsChecklistSettings from "@/components/agency/globalSetting/candidates/CandidateTypesTagsChecklistSettings";
import ProfileSettings from "@/components/agency/globalSetting/candidates/ProfileSettings";
import RegistrationFeeSettings from "@/components/agency/globalSetting/candidates/RegistrationFeeSettings";

export default function CandidatesPage() {
  return (
    <div className="space-y-4">
      <CandidateDashboardSettings />
      <CandidateTypesTagsChecklistSettings />
      <ProfileSettings />
      <AccessControlAndVisibilitySettings />
      <RegistrationFeeSettings />
    </div>
  );
}
