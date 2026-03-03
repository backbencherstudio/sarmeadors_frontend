"use client";
import jobImage from "@/public/jobs/Rectangle 856.png";
import { useState } from "react";
import ClientJobCard from "./ClientJobCard";

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

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <ClientJobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default ClientJobList;
