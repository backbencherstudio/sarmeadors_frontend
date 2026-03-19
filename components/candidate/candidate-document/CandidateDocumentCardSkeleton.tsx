import { Skeleton } from "@/components/ui/skeleton";

function CandidateDocumentCardSkeleton() {
  return (
    <div>
      <div className="rounded-xl border border-borderColor bg-white px-6 py-8">
        <div className="mx-auto flex w-full max-w-[260px] flex-col items-center">
          <Skeleton className="h-[82px] w-[82px] rounded-md" />
          <Skeleton className="mt-5 h-5 w-[220px]" />
          <Skeleton className="mt-2 h-4 w-[180px]" />
          <div className="mt-5 flex items-center gap-2">
            <Skeleton className="h-10 w-[78px] rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDocumentCardSkeleton;
