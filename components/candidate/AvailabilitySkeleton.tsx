import { Skeleton } from "@/components/ui/skeleton";

function AvailabilitySkeleton() {

  const skeletonRows = Array.from({ length: 7 });

  return (
    <div className="rounded-xl border border-borderColor bg-white divide-y divide-borderColor/50">
      {skeletonRows.map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between md:justify-start gap-2 md:gap-3 px-3 sm:px-4 py-3.5"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-11 rounded-full bg-slate-200" />
            <Skeleton className="h-5 w-24 bg-slate-200" />
          </div>
          {index < 6 ? (
            <div className="ml-auto flex items-center gap-1 md:gap-2 justify-end w-auto">
              <Skeleton className="h-10 md:h-9 w-[75px] md:w-[98px] bg-slate-200 rounded-md" />
            
              <Skeleton className="h-0.5 w-3 bg-slate-200" />
              <Skeleton className="h-10 md:h-9 w-[75px] md:w-[98px] bg-slate-200 rounded-md" />
              <Skeleton className="h-9 w-9 bg-slate-200 rounded-md" />
            </div>
          ) : (
      
            <div className="ml-auto py-3">
              <Skeleton className="h-5 w-20 bg-slate-200" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AvailabilitySkeleton;