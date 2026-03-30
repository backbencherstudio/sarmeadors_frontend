import CandidateDetailsTab from "@/components/clients/AgencyShortTermJob/CandidateDetailsTab";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <CandidateDetailsTab />
      {children}
    </div>
  );
}
