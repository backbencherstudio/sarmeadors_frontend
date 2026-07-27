import List from "@/components/clients/AdminTabs/List/List";
import CommonAccordion from "../CommonAccordion";

export default function CandidateTypesTagsChecklistSettings({
  type,
}: {
  type?: string;
}) {
  return (
    <CommonAccordion title="Candidate Types, Tags, Checklist Settings">
      <List type={type} />
    </CommonAccordion>
  );
}
