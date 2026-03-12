"use client";
import CalenderIcon from "@/components/icon/CalenderIcon";
import ListIcon from "@/public/icon/ListIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InterviewTab() {
  const pathname = usePathname();

  const isCalendar = pathname === "/client/client-interviews/calendar";
  const isList = pathname === "/client/client-interviews/calendar-list";
  return (
    <div className="flex p-1 bg-white border border-[#E5E7EB] rounded-[10px]">
      <Link
        href="/client/client-interviews/calendar"
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
          isCalendar
            ? "bg-[#F3F4F6]"
            : "text-gray-500"
        }`}
      >
        <CalenderIcon />
        Calendar
      </Link>

      <Link
        href="/client/client-interviews/calendar-list"
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium ${
          isList
            ? "bg-[#F3F4F6]"
            : "text-gray-500"
        }`}
      >
        <ListIcon />
        List View
      </Link>
    </div>
  );
}
