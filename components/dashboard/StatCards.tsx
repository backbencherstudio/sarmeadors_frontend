"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function StatCards() {
  const isLoading = false;

  const statCards = [
    {
      title: "Pre Application",
      value: 195,
      percentage: "0.1%",
    },
    {
      title: "Application Started",
      value: 7,
      percentage: "0.8%",
    },
    {
      title: "Applied",
      value: 18,
      percentage: "1.5%",
    },
    {
      title: "Inactive",
      value: 635,
      percentage: "72.6%",
    },
    {
      title: "Initial Payment Made",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Consultation Booked",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Consultation Complete",
      value: 0,
      percentage: "3.2%",
    },
    {
      title: "Job Posted",
      value: 97,
      percentage: "3.2%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {isLoading
        ? Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-white border border-gray-100 flex flex-col gap-4"
            >
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-8" />
              <Skeleton className="w-12 h-4" />
            </div>
          ))
        : statCards.map((card, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-grayColor1/60  border border-gray2Color hover:shadow-md transition-shadow cursor-pointer relative"
            >
              {/* Title */}
              <p className="text-sm text-gray-600 font-medium mb-3">
                {card.title}
              </p>

              {/* Large Number with Percentage */}
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-900">
                  {card.value}
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  ({card.percentage})
                </span>
              </div>

              {/* Hover Effect - Show Arrow */}
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 rounded-full p-2">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
