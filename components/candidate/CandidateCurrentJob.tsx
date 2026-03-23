"use client";

import { currentJobs } from "@/demoData/DashboardData";
import { AlertCircle } from "lucide-react";
import CandidatejobsCard from "./CandidatejobsCard";

interface CurrentJob {
  id: number;
  title: string;
  jobType: "Short-term" | "Long-term";
  name: string;
  avatar: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hourlyRate: string;
  status: "running" | "scheduled" | "completed";
  checkIn?: string;
  checkOut?: string;
  total?: string;
}

function CandidateCurrentJob() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-blackColor">Running Job</h2>
      </div>
      <div className="flex flex-col gap-6">
        {currentJobs.map((job) => (
          <CandidatejobsCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default CandidateCurrentJob;
