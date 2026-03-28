"use client";
import { clientCurrentJobs } from "@/demoData/DashboardData";
import { AlertCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import ShortTermJobCard from "./ShortTermJobCard";

export default function RunningJob({ title }: { title: string }) {
  const pathname = usePathname();
  const lastPathText = pathname.split("/").filter(Boolean).pop() ?? "";
  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-medium text-blackColor capitalize">
          {title}
        </h2>
      </div>
      <div className="space-y-5">
        {clientCurrentJobs.map((job) => (
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
