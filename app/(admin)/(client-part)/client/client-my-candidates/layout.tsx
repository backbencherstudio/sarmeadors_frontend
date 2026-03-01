import MyCandidatesTopMenu from "@/components/client/MyCandidates/MyCandidatesTopMenu";

export default function MyCandidatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <MyCandidatesTopMenu />
      {children}
    </div>
  );
}
