import CandidateCard from "@/components/client/MyCandidates/CandidateCard";
import { PROFILES } from "@/demoData/DashboardData";



export default function NewCandidatesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {PROFILES?.map((profile) => (
        <CandidateCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
