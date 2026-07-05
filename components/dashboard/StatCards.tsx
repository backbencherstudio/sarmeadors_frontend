"use client";

import { Skeleton } from "../ui/skeleton";

export default function StatCards({
  statCards,
  isLoading,
}: {
  statCards: any;
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {isLoading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white border border-gray-100 flex flex-col gap-4"
            >
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-8" />
              <Skeleton className="w-12 h-4" />
            </div>
          ))
        : statCards?.map((card, idx: number) => (
            <div
              key={idx}
              className="p-4 group rounded-lg bg-bgColor hover:bg-blackColor hover:text-whiteColor  border border-gray2Color hover:shadow-lg transition-all duration-200 cursor-pointer relative"
            >
              {/* Title */}
              <p className="text-sm text-secondaryColor group-hover:text-whiteColor transition-all duration-200 font-medium mb-5">
                {card.name}
              </p>

              {/* Large Number with Percentage */}
              <div className="flex items-end justify-between">
                <div className="text-[20px] font-semibold group-hover:text-whiteColor transition-all duration-200 text-blackColor">
                  {card.count}
                </div>
                {card.percentage && (
                  <span className="text-xs font-medium group-hover:text-[#E5B400] transition-all duration-200  px-2 py-1 rounded">
                    <span>{card.percentage}%</span>
                  </span>
                )}
              </div>

              {/* Hover Effect - Show Arrow */}
              {/* <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 rounded-full p-2">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div> */}
            </div>
          ))}
    </div>
  );
}
