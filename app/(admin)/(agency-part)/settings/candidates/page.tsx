import CandidateDashboardSettings from "@/components/agency/globalSetting/candidates/CandidateDashboardSettings";
import CandidateTypesTagsChecklistSettings from "@/components/agency/globalSetting/candidates/CandidateTypesTagsChecklistSettings";

export default function CandidatesPage() {
  return (
    <div className="space-y-4">
      <CandidateDashboardSettings />
      <CandidateTypesTagsChecklistSettings />
    </div>
  );
}
