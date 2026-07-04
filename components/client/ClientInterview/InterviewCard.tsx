"use client";
import LinkIcon from "@/components/icon/LinkIcon";
import LocationIcon from "@/components/icon/LocationIcon";
import MeetIcon from "@/components/icon/MeetIcon";
import TimeRescheduleIcon from "@/components/icon/TimeRescheduleIcon";
import ZoomIcon from "@/components/icon/ZoomIcon";
import InformationIcon from "@/public/icon/InformationIcon";
import { X } from "lucide-react";
import { useState } from "react";
import { CancelModal } from "./CancelModal";
import RescheduleModal from "./RescheduleModal";

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
  meetLink?: string;
  isHighlighted?: boolean;
}

export default function InterviewCard({ interview }: { interview: Interview }) {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (!interview.meetLink) return;
    try {
      await navigator.clipboard.writeText(interview.meetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy meeting link:", err);
    }
  };

  return (
    <div
      className={`rounded-xl p-6 border-l-4 hover:border-l-[#96C0FF] border  hover:border-[#96C0FF] bg-[#F9FAFB] hover:shadow-lg`}
    >
      <div>
        <div className="flex items-start gap-x-6">
          {/* Left: Date */}
          <div className="flex-shrink-0 text-center w-12">
            <div className="text-2xl font-semibold leading-[116.667%] text-[#111927]">
              {interview.date}
            </div>
            <div className="text-[#384250] text-[12px] leading-[133.333%]">
              {interview.month},{interview.day}
            </div>
          </div>

          <div className="flex items-start justify-between w-full">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[16px] leading-[137.5%] font-semibold text-[#111927]">
                  {interview.title}
                </h1>
                {interview?.badge === "Next" ? (
                  <button className="text-[#0065FF] bg-[#E6F0FF] px-2 py-1 rounded-[8px] font-medium leading-[133.333%]">
                    {interview?.badge}
                  </button>
                ) : (
                  <button className="text-white bg-[#111927] px-2 py-1 rounded-[8px] font-medium leading-[133.333%]">
                    {interview?.badge}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <p
                  className={`w-10 h-10 rounded-full text-[12px] font-bold text-[#111927] flex items-center justify-center flex-shrink-0 ${interview.avatarColor}`}
                >
                  {interview.avatarInitials}
                </p>
                <p className="text-sm text-[#384250] leading-[142.857%] font-medium">
                  {interview.participants}
                </p>
              </div>
              <p className="text-sm text-[#778593] leading-[142.857%] mb-3">
                {interview.description}{" "}
                <button className="text-[#0065FF] hover:underline cursor-pointer">
                  View details
                </button>
              </p>

              <div className="flex items-center gap-x-2">
                <div className="relative">
                  <button
                    onClick={handleCopyLink}
                    disabled={!interview.meetLink}
                    className="px-4 py-2 border border-[#E5E7EB] rounded-[8px] hover:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title={
                      interview.meetLink
                        ? "Copy meeting link"
                        : "No link available"
                    }
                  >
                    <LinkIcon />
                  </button>
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111927] text-white text-xs px-2 py-1 rounded-md">
                      Copied!
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-x-1.5 px-4 py-2 border border-[#E5E7EB] hover:bg-green-100 rounded-[8px] cursor-pointer"
                >
                  <TimeRescheduleIcon />
                  <span className="text-[#111927] font-medium text-sm leading-[142.857%]">
                    Reschedule
                  </span>
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="flex items-center px-4 py-2 border border-[#E5E7EB] hover:bg-red-50 rounded-[8px] cursor-pointer"
                >
                  <X className="h-5 text-[#CB121D]" />
                  <span className="text-[#CB121D] font-medium text-sm leading-[142.857%]">
                    Cancel
                  </span>
                </button>
                <button className="cursor-pointer">
                  <InformationIcon className="text-[#2B7FFF]" />
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <p className="text-[16px] font-medium text-[#111927] leading-[137.5%]">
                {interview.timeRange}
              </p>
              {
                {
                  google: (
                    <button className="flex items-center gap-x-1.5 p-3 bg-[#111927] border border-[#384250] rounded-[8px] cursor-pointer">
                      <MeetIcon />
                      <span className="text-white font-medium text-sm leading-[142.857%]">
                        Join Google Meet
                      </span>
                    </button>
                  ),
                  zoom: (
                    <button className="flex items-center gap-x-1.5 p-3 bg-[#F3F4F6] border border-[#E5E7EB] rounded-[8px] cursor-pointer">
                      <ZoomIcon />
                      <span className="text-[#9DA4AE] font-medium text-sm leading-[142.857%]">
                        Zoom Meeting
                      </span>
                    </button>
                  ),
                  "in-person": (
                    <button className="flex items-center gap-x-1.5 p-3 bg-white border border-[#E5E7EB] rounded-[8px] cursor-pointer">
                      <LocationIcon />
                      <span className="text-[#111927] font-medium text-sm leading-[142.857%]">
                        In-Person
                      </span>
                    </button>
                  ),
                }[interview?.meetType as string]
              }
            </div>
          </div>
        </div>
        {openModal && (
          <CancelModal
            onClose={() => setOpenModal(false)}
            onDelete={() => {
              console.log("Interview Deleted");
              setOpenModal(false);
            }}
          />
        )}
        <RescheduleModal
          id={interview.id}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
