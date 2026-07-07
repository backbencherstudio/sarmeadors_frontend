import RootDialog from "@/components/common/RootDialog";
import ClockICon from "@/components/icon/ClockICon";
import LinkIcon from "@/components/icon/LinkIcon";
import MeetingZoomIcon from "@/components/icon/MeetingZoomIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

interface InterviewData {
  id?: string;
  title: string;
  client?: {
    name: string;
    email: string;
    mobile: string;
    image_url?: string;
  };
  date?: string;
  time?: { from: string; to: string; range: string };
  status?: string;
  status_label?: string;
  meeting?: { type: string; link: string; can_join: boolean };
  description?: string;
  description_preview?: string;
  modal?: {
    title: string;
    subtitle: string;
    date: string;
    time_range: string;
    can_join: boolean;
  };
  job_type?: string;
  job_type_label?: string;
  location?: {
    street_address?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    country?: string;
  };
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

function CandidateInterviewDialog({
  isOpen,
  setOpen,
  data,
}: {
  isOpen: boolean;
  setOpen: () => void;
  data: InterviewData | null;
}) {
  const [isActionOpen, setIsActionOpen] = useState(false);

  if (!data) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase();
      const year = date.getFullYear();
      const dayName = date
        .toLocaleString("en-US", { weekday: "short" })
        .toUpperCase();
      return `${month} ${day}, ${dayName}`;
    } catch {
      return dateStr;
    }
  };

  const today = dayjs();
  const jobDate = data.date ? dayjs(data.date) : dayjs();

  const isEqualDay = jobDate.isSame(today, "day");
  const isScheduled = jobDate.isBefore(today, "day");

  const clientName = data.client?.name || data.modal?.subtitle || "";
  const timeRange = data.modal?.time_range || data.time?.range || "";
  const dateLabel = data.modal?.date || formatDate(data.date || "");
  const meetingType = data.meeting?.type || "in_person";
  const description = data.description_preview || data.description || "";
  const status = data.status_label || data.status || "";

  const statusBadgeClass =
    status === "Completed"
      ? "bg-greenColor/20 text-greenColor"
      : status === "Scheduled"
        ? "bg-blueColor/20 text-blueColor"
        : "bg-redColor/20 text-redColor";

  const meetingLink = data.meeting?.link || "";
  const isGoogleMeet = meetingType === "google_meet" || meetingType === "zoom";
  const showInPerson = meetingType === "in_person";

  let isCurrentTime = false;
  if (data.time?.from && data.time?.to) {
    try {
      const now = dayjs();
      const interviewDate = dayjs(data.date);
      if (now.isSame(interviewDate, "day")) {
        const fromTime = dayjs(`1970-01-01 ${data.time.from}`);
        const toTime = dayjs(`1970-01-01 ${data.time.to}`);
        const currentTime = dayjs(`1970-01-01 ${now.format("h:mm A")}`);
        isCurrentTime =
          currentTime.isAfter(fromTime.subtract(5, "minute")) &&
          currentTime.isBefore(toTime.add(5, "minute"));
      }
    } catch {
      isCurrentTime = false;
    }
  }

  const handleJoinClick = () => {
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    }
  };

  return (
    <RootDialog open={isOpen} setOpen={setOpen}>
      <div className="w-full rounded-2xl p-6">
        {/* Header Section */}
        <div className="mb-2 ">
          <div className="flex relative flex-col md:flex-row md:items-start gap-2 md:gap-3 mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-blackColor">
                {data.title || "Interview"}
              </h2>
              {status && (
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-sm ${statusBadgeClass}`}
                >
                  {status}
                </span>
              )}
            </div>

            <div className="absolute right-0 -top-1.75">
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto">
                  {/* <ButtonReuseable
                    icon={<BsThreeDots />}
                    className="bg-transparent! hover:bg-bgColor! p-1.5! text-blackColor!"
                  /> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-35">
                  <DropdownMenuItem
                    onSelect={() => console.log("Copy Link")}
                    className="cursor-pointer"
                  >
                    <LinkIcon /> Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => console.log("Reschedule")}
                    className="cursor-pointer"
                  >
                    <ClockICon className="fill-blackColor! text-blackColor!" />{" "}
                    Reschedule
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => console.log("Cancel")}
                    className="text-redColor cursor-pointer"
                  >
                    <X className="text-redColor!" /> Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Candidate Info */}
        {clientName && (
          <div className="flex items-center gap-3 pb-2 ">
            <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-blackColor font-bold text-sm">
              {getInitials(clientName)}
            </div>
            <div>
              <h3 className="text-base font-semibold text-blackColor">
                {clientName}
              </h3>
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-secondaryColor mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Date and Time */}
        <div className="flex items-center justify-between border-t border-borderColor mt-4 pt-4">
          <div>
            <p className="text-base font-semibold text-blackColor">
              {dateLabel}
            </p>
            <p className="text-sm text-headerColor">{timeRange}</p>
          </div>
          {isGoogleMeet && meetingLink && (
            <div>
              <ButtonReuseable
                title="Join"
                icon={<MeetingZoomIcon />}
                loading={false}
                sendingMsg="Join"
                className="py-2!"
                disabled={!isCurrentTime}
                onClick={handleJoinClick}
              />
            </div>
          )}
          {showInPerson && (
            <div>
              <span className="px-3 py-2 rounded-md border border-borderColor text-sm text-headerColor bg-bgColor">
                In Person
              </span>
            </div>
          )}
        </div>
      </div>
    </RootDialog>
  );
}

export default CandidateInterviewDialog;
