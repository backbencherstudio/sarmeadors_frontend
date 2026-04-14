"use client";
import { useState } from "react";
import ClientJobCard from "./ClientJobCard";
import ClientJobNotFound from "./ClientJobNotFound";
import ClientJobsCardSkeleton from "./ClientJobsCardSkeleton";

function ClientJobList({
  jobs,
  userType,
}: {
  jobs?: any[];
  userType?: string;
}) {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((index) => (
          <ClientJobsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) return <ClientJobNotFound />;

  return (
    <div>
      <div className="space-y-5">
        {jobs.map((job) => (
          <ClientJobCard key={job.id} job={job} userType={userType} />
        ))}
      </div>
    </div>
  );
}

export default ClientJobList;
