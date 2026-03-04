"use client";
import NewCandidatesPage from "@/app/(admin)/(client-part)/client/client-my-candidates/new-candidates/page";
import jobImage from "@/public/jobs/Rectangle 856.png";
import { useState } from "react";
import ClientJobCard from "./ClientJobCard";
import JobNotFound from "./JobNotFound";

const jobs = [
  {
    id: 1,
    candidateName: "Darlene Robertson",
    position: "Nanny",
    roles: ["House Manager", "Baby/Night Nurse"],
    location: "Miami, New York, Other Locations",
    price: "$34/hr",
    status: "Pending",
    image: jobImage,
  },
  {
    id: 2,
    candidateName: "Darlene Robertson",
    position: "Nanny",
    roles: ["House Manager", "Baby/Night Nurse"],
    location: "Miami, New York, Other Locations",
    price: "$34/hr",
    status: "Pending",
    image: jobImage,
  },
];

function ClientJobList() {
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
      <div className="my-8">
        <NewCandidatesPage />
      </div>
    </div>
  );
}

export default ClientJobList;
