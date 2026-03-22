"use client";
import LocationIcon from "@/components/icon/LocationIcon";
import MeetingZoomIcon from "@/components/icon/MeetingZoomIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useState } from "react";

type CandidateInterviewListCardProps = {
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
};

function CandidateInterviewListCard({
  dateNumber,
  dateMeta,
  title,
  status = "Upcoming",
  participants,
  participantInitials,
  participantBadgeClass = "bg-blueColor/15 text-blueColor",
  description,
  timeRange,
  actionLabel,
  actionType = "secondary",
  highlighted = false,
}: CandidateInterviewListCardProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg border  bg-bgColor hover:bg-whiteColor shadow-[#96C0FF]/15 transition-all duration-200 hover:shadow-xl hover:border-[#96C0FF] ${
        highlighted ? "border-[#96C0FF] " : " border-l"
      }  `}
    >
      <div
        className={`flex flex-col  md:flex-row border-l-4 rounded-lg hover:border-l-[#96C0FF] border-[#96C0FF] px-2 py-3 md:px-3 lg:px-6 md:py-6 items-start justify-between gap-3 ${
          highlighted ? "border-[#96C0FF] " : "border-l-bgColor border-l"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center w-fit md:items-start gap-4 ">
          <div className="flex-1  text-center">
            <p className="md:text-[24px] text-xl leading-6 font-semibold text-headerColor">
              {dateNumber}
            </p>
            <p className="mt-0.5 text-[12px] font-medium uppercase text-lightblackColor">
              {dateMeta}
            </p>
          </div>

          <div className="">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-medium text-headerColor">
                {title}
              </h4>
              <span className="rounded-sm bg-blackColor px-2 py-1 text-[12px] font-medium text-whiteColor">
                {status}
              </span>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-secondaryColor">
              <p
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold ${participantBadgeClass}`}
              >
                {participantInitials}
              </p>
              <p className="text-sm font-medium text-headerColor">
                {participants}
              </p>
            </div>
            <div className="flex items-end gap-1.5 mt-1.5">
              <p
                className={`max-w-[620px] text-sm text-secondaryColor ${
                  isDescriptionExpanded ? "" : "line-clamp-2 md:line-clamp-1"
                }`}
              >
                {description}
              </p>
              <button
                type="button"
                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                className="md:text-sm text-xs text-blueColor cursor-pointer shrink-0"
              >
                {isDescriptionExpanded ? "Show less" : "View details"}
              </button>
            </div>
          </div>
        </div>

        <div className="text-right flex-1 flex justify-between md:justify-center w-full  md:flex-col items-end md:items-end gap-2">
          <p className="text-xs font-medium text-headerColor">{timeRange}</p>
          <ButtonReuseable
            type="button"
            icon={
              actionLabel == "In Person" ? (
                <LocationIcon />
              ) : (
                <MeetingZoomIcon />
              )
            }
            title={actionLabel}
            className={` py-2! items-center gap-1 rounded-md px-3 text-sm! font-medium! ${
              actionType === "primary"
                ? "bg-blackColor text-whiteColor"
                : " text-secondaryColor! border! bg-grayColor1! cursor-not-allowed! border-borderColor"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default CandidateInterviewListCard;
