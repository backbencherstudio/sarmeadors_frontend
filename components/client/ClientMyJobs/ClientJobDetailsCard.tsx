"use client";

import { clientCurrentJobs } from "@/demoData/DashboardData";
import { AlertCircle } from "lucide-react";
import ClientjobsCard from "./ClientjobsCard";
import { usePathname } from "next/navigation";

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

function ClientJobDetailsCard() {
    const pathname = usePathname();
    const lastPathText = pathname.split("/").filter(Boolean).pop() ?? "";

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-blackColor capitalize">{lastPathText}</h2>
            </div>
            <div className="space-y-5">
                {clientCurrentJobs.map((job) => (
                    <>
                        {
                            job.status === lastPathText && (
                                <ClientjobsCard key={job.id} job={job} />
                            )
                        }
                    </>
                ))}
            </div>
        </div>
    );
}

export default ClientJobDetailsCard;
