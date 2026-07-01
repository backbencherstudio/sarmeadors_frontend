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
import { useGetClientInterviewsQuery } from "@/feature/dashboard/client/interviews";
import { useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";

interface Interview {
  id: string;
  date: number;
  month: string;
  day: string;
  year: number;
  title: string;
  badge: "Next" | "Upcoming";
  avatarInitials: string;
  avatarColor: string;
  participants: string;
  description: string;
  timeRange: string;
  meetType: "google" | "zoom" | "in-person";
  meetLink?: string;
  isHighlighted?: boolean;
}

// ---- API shapes (only the fields we use) ----
interface ApiCandidate {
  id: number;
  name: string | null;
  email?: string | null;
  mobile?: string | null;
  image_url?: string | null;
}

interface ApiJob {
  id: number | null;
  title: string | null;
}

interface ApiInterview {
  id: number;
  title: string | null;
  description: string | null;
  description_preview: string | null;
  date: string; // "2026-07-04"
  day: string; // "04"
  month: string; // "Jul"
  time: { from: string; to: string; range: string };
  status: string;
  period: string;
  meeting: {
    type: "google" | "zoom" | "in-person";
    link: string;
    can_join: boolean;
  };
  candidate: ApiCandidate;
  job?: ApiJob;
}

// ---- helpers ----
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getWeekdayAbbr(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  return WEEKDAYS[d.getDay()];
}

function getYear(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).getFullYear();
}

function getInitials(name?: string | null) {
  if (!name) return "NA";
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_COLORS = [
  "bg-[#6BA6FF]",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-400",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
];

function getAvatarColor(seed: number) {
  return AVATAR_COLORS[seed % AVATAR_COLORS.length];
}

function mapApiInterview(item: ApiInterview): Interview {
  return {
    id: String(item.id),
    date: Number(item.day),
    month: item.month.toUpperCase(),
    day: getWeekdayAbbr(item.date),
    year: getYear(item.date),
    title:
      item.title || item.job?.title || item.description_preview || "Interview",
    badge: "Upcoming",
    avatarInitials: getInitials(item.candidate?.name),
    avatarColor: getAvatarColor(item.candidate?.id ?? item.id),
    participants: item.candidate?.name
      ? `You and ${item.candidate.name}`
      : "You and Candidate",
    description: item.description_preview || item.description || "",
    timeRange: item.time?.range || "",
    meetType: item.meeting?.type || "in-person",
    meetLink: item.meeting?.link || undefined,
  };
}

function mapNextInterview(item: ApiInterview): Interview {
  return {
    ...mapApiInterview(item),
    badge: "Next",
    isHighlighted: true,
  };
}

function groupInterviews(list: Interview[]) {
  const groups: { label: string; items: Interview[] }[] = [];
  const seen = new Map<string, number>();

  for (const item of list) {
    const key = `${item.month} ${item.date}, ${item.year}`;
    if (!seen.has(key)) {
      seen.set(key, groups.length);
      groups.push({ label: key, items: [] });
    }
    groups[seen.get(key)!].items.push(item);
  }
  return groups;
}

export default function CalendarList() {
  const { data } = useGetClientInterviewsQuery("list");

  const apiNextInterview = data?.data?.next_interview as
    | ApiInterview
    | undefined;
  const apiInterviews = (data?.data?.interviews?.data ?? []) as ApiInterview[];

  // First card: next_interview data
  const nextInterview = apiNextInterview
    ? mapNextInterview(apiNextInterview)
    : undefined;

  // All interview data below — no filtering, no exclusions
  const allInterviews = apiInterviews.map(mapApiInterview);

  const groups = groupInterviews(allInterviews);
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
              <SelectTrigger className="flex items-center gap-1.5 text-sm text-[#111927] border border-[#E5E7EB] rounded-xl p-4.5 cursor-pointer">
                <SelectValue placeholder="All Interviews" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">
                  All Interviews
                </SelectItem>
                <SelectItem className="cursor-pointer" value="scheduled">
                  Scheduled
                </SelectItem>
                <SelectItem className="cursor-pointer" value="completed">
                  Completed
                </SelectItem>
                <SelectItem className="cursor-pointer" value="cancelled">
                  Cancelled
                </SelectItem>
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

        {/* Today / first group */}
        {todayGroup && (
          <section>
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Today - {todayGroup.label.toUpperCase()}
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
