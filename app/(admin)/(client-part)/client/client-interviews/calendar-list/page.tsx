"use client";
import InterviewCard from "@/components/client/ClientInterview/InterviewCard";
import IconDatePicker from "@/components/common/DatePicker";
import ClockICon from "@/components/icon/ClockICon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Interview {
  id: string;
  date: number;
  month: string;
  day: string;
  title: string;
  badge: "Next" | "Upcoming";
  avatarInitials: string;
  avatarColor: string;
  participants: string;
  description: string;
  timeRange: string;
  meetType: "google" | "zoom" | "in-person";
  isHighlighted?: boolean;
}

const interviews: Interview[] = [
  {
    id: "1",
    date: 18,
    month: "JAN",
    day: "SUN",
    title: "1st Interview",
    badge: "Next",
    avatarInitials: "OP",
    avatarColor: "bg-[#6BA6FF]",
    participants: "You and Charlotte Hamlin",
    description:
      "Full responsibility for three energetic children, ages 2, 5, and 7, including crafting delicious and...",
    timeRange: "10:00AM - 11:00AM",
    meetType: "google",
    isHighlighted: true,
  },
  {
    id: "2",
    date: 18,
    month: "JAN",
    day: "SUN",
    title: "Morning Babysitter",
    badge: "Upcoming",
    avatarInitials: "PE",
    avatarColor: "bg-green-500",
    participants: "You and Admin",
    description:
      "Provide homework assistance and create a supportive learning environment for two bright, school-aged...",
    timeRange: "1:00PM - 2:00PM",
    meetType: "zoom",
  },
  {
    id: "3",
    date: 19,
    month: "JAN",
    day: "MON",
    title: "Weekend Nanny",
    badge: "Upcoming",
    avatarInitials: "MW",
    avatarColor: "bg-yellow-500",
    participants: "You and Marelle Wijeleton",
    description:
      "Plan and execute stimulating and age-appropriate activities for active toddlers, fostering their dev...",
    timeRange: "1:00PM - 2:00PM",
    meetType: "in-person",
  },
  {
    id: "4",
    date: 20,
    month: "JAN",
    day: "TUE",
    title: "Temporary Nanny",
    badge: "Upcoming",
    avatarInitials: "TO",
    avatarColor: "bg-orange-400",
    participants: "You and Tyrnisha Obey",
    description:
      "Design and lead engaging art projects, creative crafts, and fun outdoor games to keep children enter...",
    timeRange: "3:00PM - 4:00PM",
    meetType: "google",
  },
  {
    id: "5",
    date: 20,
    month: "JAN",
    day: "TUE",
    title: "Full-time Nanny",
    badge: "Upcoming",
    avatarInitials: "DB",
    avatarColor: "bg-purple-500",
    participants: "You and Darnell Ballentine",
    description:
      "Create and serve nutritious and appealing snacks and meals for children, accommodating dietary restr...",
    timeRange: "3:00PM - 4:00PM",
    meetType: "in-person",
  },
];

export default function CalendarList() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  function groupInterviews(list: Interview[]) {
    const groups: { label: string; items: Interview[] }[] = [];
    const seen = new Map<string, number>();

    for (const item of list) {
      const key = `${item.month} ${item.date}, 2026`;
      if (!seen.has(key)) {
        seen.set(key, groups.length);
        groups.push({ label: key, items: [] });
      }
      groups[seen.get(key)!].items.push(item);
    }
    return groups;
  }
  const nextInterview = interviews.find((i) => i.badge === "Next");
  const upcoming = interviews.filter((i) => i.badge === "Upcoming");
  const groups = groupInterviews(upcoming);

  // Today's group label
  const todayGroup = groups[0];
  const restGroups = groups.slice(1);

  return (
    <div className="p-6 border border-[#E5E7EB] rounded-2xl mt-3">
      <div className="flex items-center justify-between px-6 py-3 bg-white">
        <div>
          <h1 className="text-lg text-[#111927] leading-[111.111%] font-medium">
            All Interviews
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <IconDatePicker />
          <div>
            <Select defaultValue="all">
              <SelectTrigger className="flex items-center gap-1.5 text-sm text-[#111927] border border-[#E5E7EB] rounded-[8px] p-4.5 cursor-pointer">
                <SelectValue placeholder="All Interviews" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">All Interviews</SelectItem>
                <SelectItem className="cursor-pointer" value="scheduled">Scheduled</SelectItem>
                <SelectItem className="cursor-pointer" value="completed">Completed</SelectItem>
                <SelectItem className="cursor-pointer" value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto px-4 py-6 space-y-6">
        {nextInterview && (
          <section>
            <div className="flex items-center gap-2 text-sm font-semibold mb-3">
              <ClockICon />
              <span className="text-lg text-[#111927] leading-[111.111%] font-medium">
                Next Interview
              </span>
            </div>
            <InterviewCard interview={nextInterview} />
          </section>
        )}

        {/* Today */}
        {todayGroup && (
          <section>
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Today - JAN 18, 2026
            </div>
            <div className="space-y-3">
              {todayGroup.items.map((item) => (
                <InterviewCard key={item.id} interview={item} />
              ))}
            </div>
          </section>
        )}

        {/* Rest of days */}
        {restGroups.map((group) => (
          <section key={group.label}>
            <div className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              {group.label.replace(",", "").toUpperCase()}
            </div>
            <div className="space-y-3">
              {group.items.map((item) => (
                <InterviewCard key={item.id} interview={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
