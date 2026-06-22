"use client";
import ClientJobCard from "./ClientJobCard";
import ClientJobsCardSkeleton from "./ClientJobsCardSkeleton";

function ClientJobList({
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

  // console.log("jobs", jobs);

  // if (jobs.length === 0) return <ClientJobNotFound />;

  return (
    <div>
      <div className="space-y-5">
        {jobs?.map((job) => (
          <ClientJobCard key={job.id} job={job} userType={userType} />
        ))}
      </div>
    </div>
  );
}

export default ClientJobList;
