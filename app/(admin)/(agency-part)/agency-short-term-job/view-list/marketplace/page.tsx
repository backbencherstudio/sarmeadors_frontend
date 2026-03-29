"use client";
import ShortTermJobCard from "@/components/clients/ShortTermJob/AgencyShortTermJobCard";
import { adminCurrentJobs } from "@/demoData/DashboardData";
import { Clock } from "lucide-react";
import { usePathname } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  const lastPathText = pathname.split("/").filter(Boolean).pop() ?? "";
  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-medium text-blackColor capitalize">
          Approved Job
        </h2>
      </div>
      <div className="space-y-5">
        {adminCurrentJobs.map((job) => (
          <>
            {job.status === lastPathText && (
              <ShortTermJobCard key={job.id} job={job} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
