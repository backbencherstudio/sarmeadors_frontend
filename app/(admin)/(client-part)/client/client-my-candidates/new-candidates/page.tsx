"use client";

import ReusableCandidateCard from "@/components/client/MyCandidates/ReusableCandidateCard";
import { PROFILES } from "@/demoData/DashboardData";
import { useGetClientMyCandidateQuery } from "@/feature/dashboard/client/myCandidate";

export default function page() {
  const { data } = useGetClientMyCandidateQuery("new");
  return (
    <div>
      {/* <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold text-blackColor mb-4">
          Recommended Candidates
        </h3>
        <ButtonReuseable
          title="Discover Candidates"
          icon={<SearchIcon className="w-4 h-4" />}
        />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {data?.data?.map((profile) => (
          <ReusableCandidateCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
