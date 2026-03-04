import { Skeleton } from "@/components/ui/skeleton";

function JobsCardSkeleton() {
  return (
    <div>
      <div className="border flex flex-col lg:flex-row justify-between border-borderColor p-5 rounded-lg">
        <div className="flex gap-4 flex-col lg:flex-row items-center w-full">
          <Skeleton className="w-full md:w-[280px] h-[204px] rounded-lg" />
          <div className="flex-1 w-full space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-10 w-32 mt-8" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 mt-4 lg:mt-0">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export default JobsCardSkeleton;
