import CandidateCard from "@/components/client/MyCandidates/CandidateCard";
import SearchIcon from "@/components/icon/SearchIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { PROFILES } from "@/demoData/DashboardData";

export default function NewCandidatesPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blackColor mb-4">
          Recommended Candidates
        </h3>
        <ButtonReuseable
          title="Discover Candidates"
          icon={<SearchIcon className="w-4 h-4" />}
          className=""
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {PROFILES?.map((profile) => (
          <CandidateCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
