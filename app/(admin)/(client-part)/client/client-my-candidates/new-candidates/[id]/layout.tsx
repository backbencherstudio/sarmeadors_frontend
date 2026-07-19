import { CandidatesDetailsTab } from "@/components/client/MyCandidates/CandidatesDetailsTab";

export default function MyCandidatesDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 space-y-4">
      <CandidatesDetailsTab path={"new-candidates"} />
      {children}
    </div>
  );
}
