import { Skeleton } from "@/components/ui/skeleton";

export function CandidateJobsCardSkeleton() {
  return (
    <div className="bg-bgColor border-l-4 border-bgColor shadow rounded-lg p-4 md:p-5 space-y-4 w-full animate-pulse">
      {/* Header Segment */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-2 w-2/3">
          <div className="flex items-center gap-2 w-full">
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-48 bg-gray-300" />
            {/* Job Type Tag Skeleton */}
            <Skeleton className="h-5 w-16 bg-gray-300 rounded-sm" />
          </div>
          {/* Schedule Status Skeleton */}
          <Skeleton className="h-5 w-36 bg-gray-300 rounded-sm mt-1 md:mt-0" />
        </div>
        {/* Hourly Rate Skeleton */}
        <Skeleton className="h-6 w-16 bg-gray-300" />
      </div>

      {/* Body Segment */}
      <div className="md:flex flex-col md:flex-row md:justify-between items-center w-full">
        <div className="w-full md:w-3/4 space-y-3">
          {/* Client Initials & Name */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
            <Skeleton className="h-4 w-32 bg-gray-300" />
          </div>
          {/* Description Paragraphs */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-300" />
            <Skeleton className="h-4 w-5/6 bg-gray-300" />
          </div>
          {/* Meta data: Location, Date & Clock */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 bg-gray-300 rounded-full" />
              <Skeleton className="h-4 w-2/3 bg-gray-300" />
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 bg-gray-300 rounded-full" />
                <Skeleton className="h-4 w-24 bg-gray-300" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 bg-gray-300 rounded-full" />
                <Skeleton className="h-4 w-24 bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions Segment */}
      <div className="pt-3 mt-3 border-t flex justify-between items-center border-borderColor">
        <div className="flex items-center h-full gap-2">
          {/* SMS Icon button */}
          <Skeleton className="w-10 h-10 bg-gray-300 rounded-md" />
          {/* View details button */}
          <Skeleton className="h-10 w-28 bg-gray-300 rounded-md" />
        </div>
        {/* Main Check-In Action button */}
        <Skeleton className="h-10 w-24 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}

export default CandidateJobsCardSkeleton;
