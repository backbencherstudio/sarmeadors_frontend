"use client";
import { useState } from "react";
import ClientJobCard from "./ClientJobCard";
import JobNotFound from "./JobNotFound";

function ClientJobList({ jobs }: { jobs?: any[] }) {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((index) => (
          <ClientJobCard key={index} loading={true} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) return <JobNotFound />;

  return (
    <div>
      <div className="space-y-3">
        {jobs.map((job) => (
          <ClientJobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default ClientJobList;
