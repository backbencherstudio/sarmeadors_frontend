"use client";

import ArrowTopBoxIcon from "@/components/icon/ArrowTopBoxIcon";
import ClockICon from "@/components/icon/ClockICon";
import LocationIcon from "@/components/icon/LocationIcon";
import SmsIcon from "@/components/icon/SmsIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";

interface RunningJobCardProps {
  title: string;
  commitment: string;
  date: string;
  rate: string;
  nanny: string;
  nannyInitials: string;
  nannyColor?: string;
  description: string;
  address: string;
  time: string;
  checkInTime: string;
  totalDuration: string;
}

export function RunningJobCard({
  title,
  commitment,
  date,
  rate,
  nanny,
  nannyInitials,
  nannyColor = "bg-teal-500",
  description,
  address,
  time,
  checkInTime,
  totalDuration,
}: RunningJobCardProps) {
  return (
    <div
      className="bg-[#F9FAFB] rounded-xl p-6"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Row 1: Title + badge + date | Rate */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[#111927]">{title}</h3>
          <span className="text-sm px-2 py-1 rounded-[4px] bg-[#E6F0FF] text-[#0065FF] font-bold">
            {commitment}
          </span>
          <p className="flex items-center gap-1 text-sm text-[#2D3440] px-2 py-1 bg-[#F3F4F6] rounded-[4px] font-bold">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            <span>{date}</span>
          </p>
        </div>
        <span className="text-lg font-semibold text-[#111927]">{rate}</span>
      </div>

      {/* Row 2: Nanny avatar + name | Check In time */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 bg-[#96C0FF] rounded-full flex items-center justify-center text-[#111927] text-base font-semibold flex-shrink-0`}
          >
            {nannyInitials}
          </div>
          <span className="text-lg font-semibold text-[#384250]">{nanny}</span>
        </div>
        <div className="px-2 py-1 flex items-center gap-1.5 text-base bg-[#F3F4F6]">
          <span className="text-green-600 font-semibold">Check In</span>
          <span className="font-semibold text-[#384250]">{checkInTime}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-[#778593] mb-1.5 leading-relaxed">
        {description}
      </p>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-base text-[#778593] mb-1">
        <LocationIcon className="text-gray-400 flex-shrink-0 h-4 w-4" />
        <span>{address}</span>
      </div>

      {/* Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-base text-[#778593]">
          <ClockICon className="text-gray-400 flex-shrink-0 h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="text-base font-semibold">
          <span className="text-[#778593]">Total </span>
          <span className=" text-[#111927]">{totalDuration}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-5 mb-3" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ButtonReuseable
          icon={<SmsIcon className="w-5 h-5" />}
          className="bg-grayColor1! text-[#111927]! border"
        />
        <LinkReuseable
          title="View Details"
          href={"#"}
          rightIcon={<ArrowTopBoxIcon />}
          className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-blackColor!"
        />
      </div>
    </div>
  );
}
