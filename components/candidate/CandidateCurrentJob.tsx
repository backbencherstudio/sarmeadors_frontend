"use client";

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

const currentJobs: CurrentJob[] = [
  {
    id: 1,
    title: "After School Nanny",
    jobType: "Short-term",
    name: "Ariana McCoy",
    avatar: "/candidate/avatar-1.jpg",
    description:
      "Full responsibility for three energetic children, ages 5, 6, and 7, including crafting delicious and...",
    location: "71 Raglan Street, CROWNTHORP, Queensville(QLO), 4805",
    startDate: "JAN 28, 2025",
    endDate: "FEB 26, 2025",
    startTime: "10:00AM",
    endTime: "11:00PM",
    hourlyRate: "$35/hr",
    status: "running",
  },
  {
    id: 2,
    title: "After School Nanny",
    jobType: "Long-term",
    name: "Ariana McCoy",
    avatar: "/candidate/avatar-1.jpg",
    description:
      "Full responsibility for three energetic children, ages 5, 6, and 7, including crafting delicious and...",
    location: "71 Raglan Street, CROWNTHORP, Queensville(QLO), 4805",
    startDate: "Mar 08, 2026",
    endDate: "Mar 07, 2026",
    startTime: "10:00AM",
    endTime: "11:00PM",
    hourlyRate: "$35/hr",
    status: "scheduled",
    checkOut: "8:02 PM",
    checkIn: "8:00 AM",
    total: "12h 02m",
  },
  {
    id: 3,
    title: "After School Nanny",
    jobType: "Long-term",
    name: "Ariana McCoy",
    avatar: "/candidate/avatar-1.jpg",
    description:
      "Full responsibility for three energetic children, ages 5, 6, and 7, including crafting delicious and...",
    location: "71 Raglan Street, CROWNTHORP, Queensville(QLO), 4805",
    startDate: "Mar 28, 2026",
    endDate: "FEB 26, 2025",
    startTime: "10:00AM",
    endTime: "11:00PM",
    hourlyRate: "$35/hr",
    status: "completed",
    checkIn: "Mar 28, 2026",
    checkOut: "8:02 PM",
    total: "2h 05m",
  },
];

function CandidateCurrentJob() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-blackColor">Running Job</h2>
      </div>

      {currentJobs.map((job) => (
        <CandidatejobsCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default CandidateCurrentJob;
