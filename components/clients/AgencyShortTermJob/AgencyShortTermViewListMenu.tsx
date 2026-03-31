"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AgencyShortTermViewListMenu() {
  const path = usePathname();
  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };
  const activeRunningPath = isActive(
    "/agency-short-term-job/view-list/running",
  );
  const activePendingPath = isActive(
    "/agency-short-term-job/view-list/pending",
  );
  const activeMarketplacePath = isActive(
    "/agency-short-term-job/view-list/marketplace",
  );
  const activeCompletedPath = isActive(
    "/agency-short-term-job/view-list/completed",
  );
  return (
    <div>
      <div className="w-full">
        <div className="w-full border-b border-gray-200">
          <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
            <Link
              href={"/agency-short-term-job/view-list/running"}
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeRunningPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              Running (1)
            </Link>
            <Link
              href={"/agency-short-term-job/view-list/pending"}
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activePendingPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              Pending (0)
            </Link>
            <Link
              href={"/agency-short-term-job/view-list/marketplace"}
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeMarketplacePath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              Marketplace (1)
            </Link>
            <Link
              href={"/agency-short-term-job/view-list/completed"}
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeCompletedPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              Completed (9)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
