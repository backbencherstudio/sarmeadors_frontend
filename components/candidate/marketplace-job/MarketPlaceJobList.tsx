"use client";

import ClientJobsCardSkeleton from "@/components/client/ClientMyJobs/ClientJobsCardSkeleton";
import MarketPlaceJobCard from "./MarketPlaceJobCard";

function MarketPlaceJobList({
  jobs,
  userType,
  isLoading,
}: {
  jobs?: any[];
  userType?: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((index) => (
          <ClientJobsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // if (jobs.length === 0) return <ClientJobNotFound />;

  return (
    <div>
      <div className="space-y-5">
        {jobs?.map((job) => (
          <MarketPlaceJobCard key={job.id} job={job} userType={userType} />
        ))}
      </div>
    </div>
  );
}

export default MarketPlaceJobList;
