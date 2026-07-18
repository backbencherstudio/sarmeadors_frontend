"use client";

import ClockICon from "@/components/icon/ClockICon";
import dayjs from "dayjs";
import CandidateInterviewListCard from "./CandidateInterviewListCard";
import { useGetCandidateInterviewsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateInterviewsSlice";

type InterviewItem = {
  id: number;
  dateNumber: string;
  dateMeta: string;
  title: string;
  status?: "Upcoming" | "Completed";
  participants: string;
  participantInitials: string;
  participantBadgeClass?: string;
  description: string;
  timeRange: string;
  actionLabel: string;
  actionType?: "primary" | "secondary";
  highlighted?: boolean;
  section: string;
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const AVATAR_COLORS = [
  "bg-blueColor/20 text-blueColor",
  "bg-greenColor/20 text-greenColor",
  "bg-grayColor1 text-headerColor",
  "bg-purpleColor/20 text-purpleColor",
  "bg-[#FDE68A] text-[#92400E]",
  "bg-[#E5E7EB] text-headerColor",
];

function getInitials(name?: string | null) {
  if (!name) return "NA";
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function getAvatarColor(seed: number) {
  return AVATAR_COLORS[seed % AVATAR_COLORS.length];
}

function mapApiInterview(item: any, isFeatured = false): InterviewItem {
  const dateObj = item.date ? new Date(`${item.date}T00:00:00`) : new Date();
  const day = item.day || String(dateObj.getDate()).padStart(2, "0");
  const month = (
    item.month || dateObj.toLocaleString("en-US", { month: "short" })
  ).toUpperCase();
  const weekday = WEEKDAYS[dateObj.getDay()];
  const timeRange =
    item.time?.range || `${item.time?.from || ""} - ${item.time?.to || ""}`;
  const meetingType = item.meeting?.type || "in-person";
  const candidateName = item.candidate?.name || "Candidate";

  return {
    id: item.id,
    dateNumber: day,
    dateMeta: `${month},${weekday}`,
    title:
      item.title || item.job?.title || item.description_preview || "Interview",
    status: item.status === "completed" ? "Completed" : "Upcoming",
    participants: candidateName,
    participantInitials: getInitials(candidateName),
    participantBadgeClass: getAvatarColor(item.candidate?.id ?? item.id),
    description: item.description_preview || item.description || "",
    timeRange,
    actionLabel:
      meetingType === "google"
        ? "Join Google Meet"
        : meetingType === "zoom"
          ? "Join Zoom Meeting"
          : "In Person",
    actionType: meetingType === "google" ? "primary" : "secondary",
    highlighted: isFeatured,
    section: isFeatured
      ? "top"
      : dayjs(dateObj).format("MMM D, YYYY").toUpperCase(),
  };
}

function groupInterviews(list: InterviewItem[]) {
  const groups: { label: string; items: InterviewItem[] }[] = [];
  const seen = new Map<string, number>();

  for (const item of list) {
    const key = item.section;
    if (!seen.has(key)) {
      seen.set(key, groups.length);
      groups.push({ label: key, items: [] });
    }
    groups[seen.get(key)!].items.push(item);
  }
  return groups;
}

function CandidateInterviewList() {
  const { data, isLoading } = useGetCandidateInterviewsQuery({ view: "list" });

  const apiNextInterview = data?.data?.next_interview as any | undefined;
  const apiInterviews = (data?.data?.interviews?.data ??
    data?.data?.data ??
    []) as any[];

  const featuredItem = apiNextInterview
    ? mapApiInterview(apiNextInterview, true)
    : undefined;
  const mappedInterviews = apiInterviews.map((item) =>
    mapApiInterview(item, false),
  );

  const allInterviews = featuredItem
    ? [featuredItem, ...mappedInterviews]
    : mappedInterviews;

  const groups = groupInterviews(allInterviews);
  const today = dayjs().format("MMM D, YYYY").toUpperCase();
  const todayGroup = groups.find((g) => g.label === today);
  const restGroups = groups.filter(
    (g) => g.label !== today && g.label !== "top",
  );

  if (isLoading) {
    return (
      <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
        <div className="text-center py-8 text-secondaryColor">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="space-y-5">
        {featuredItem && (
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-base md:text-lg font-medium text-headerColor">
              <ClockICon /> Next Interview
            </h3>
            <CandidateInterviewListCard {...featuredItem} />
          </div>
        )}

        {todayGroup && (
          <div>
            <h3 className="mb-2 text-base md:text-lg font-medium text-headerColor">
              Today - {todayGroup.label}
            </h3>
            <div className="space-y-3">
              {todayGroup.items.map((item) => (
                <CandidateInterviewListCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

        {restGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 text-base md:text-lg font-medium text-headerColor">
              {group.label}
            </h3>
            <div className="space-y-3">
              {group.items.map((item) => (
                <CandidateInterviewListCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}

        {allInterviews.length === 0 && (
          <div className="text-center py-8 text-secondaryColor">
            No interviews found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateInterviewList;
