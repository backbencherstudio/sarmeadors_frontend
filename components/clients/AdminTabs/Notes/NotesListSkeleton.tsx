import { Skeleton } from "@/components/ui/skeleton";

export default function NotesListSkeleton() {
  return (
    <div className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  );
}
