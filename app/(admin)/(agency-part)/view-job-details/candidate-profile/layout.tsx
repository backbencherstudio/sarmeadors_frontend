import CandidateProfileHeader from "@/components/clients/AgencyLongTermJob/Running/ViewDetails/CandidateProfileHeader";

export default function CandidateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CandidateProfileHeader />
      <div className="pt-5">{children}</div>
    </div>
  );
}
