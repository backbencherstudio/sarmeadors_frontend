"use client";

import Image from "next/image";
import { useState } from "react";

interface HireRequestModalProps {
  isHireModalOpen: boolean;
  onClose: () => void;
}

export default function HireRequestModal({
  isHireModalOpen,
  onClose,
}: HireRequestModalProps) {
  const [jobType, setJobType] = useState("long-term");

  if (!isHireModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 md:p-8 relative">
        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="border-r md:pr-8 col-span-1">
            <Image
              src={"/candidates/candidates-profile.png"}
              alt="candidates-profile"
              height={100}
              width={100}
              className="h-[56px] w-[56px]"
            />

            <div className="mt-3">
              <h2 className="text-[16px] font-medium text-[#111927]">
                Darlene Robertson
              </h2>
              <p className="text-[12px] text-[#384250] leading-[133.333%]">
                Nanny | Baby/Night Nurse
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between col-span-2">
            <div>
              <h3 className="font-medium text-[14px] text-[#111927] mb-4">
                Job Type
              </h3>

              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="short-term"
                    checked={jobType === "short-term"}
                    onChange={() => setJobType("short-term")}
                    className="accent-[#111927] cursor-pointer"
                  />
                  <span>Short-term</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="long-term"
                    checked={jobType === "long-term"}
                    onChange={() => setJobType("long-term")}
                    className="accent-[#111927] cursor-pointer"
                  />
                  <span>Long-term</span>
                </label>
              </div>

              {jobType === "long-term" && (
                <div className="bg-[#E6F0FF] text-[#2B7FFF] leading-[142.857%] text-sm px-2 py-1.5 rounded-sm">
                  For long-term booking you need to schedule an interview.
                </div>
              )}

              {jobType === "short-term" && (
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-medium text-[#111927]">
                      Booking Date & Time
                    </h4>
                    <p className="text-sm text-gray-500">
                      Schedule when this job will take place
                    </p>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="date"
                      className="border rounded-lg px-4 py-3 w-full"
                    />
                    <input
                      type="time"
                      className="border rounded-lg px-4 py-3 w-full"
                    />
                    <input
                      type="time"
                      className="border rounded-lg px-4 py-3 w-full"
                    />
                  </div>

                  {/* Additional Date */}
                  <div>
                    <h4 className="font-medium text-[#111927]">
                      Add Additional Date
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <input
                        type="date"
                        className="border rounded-lg px-4 py-3 w-full"
                      />
                      <input
                        type="time"
                        className="border rounded-lg px-4 py-3 w-full"
                      />
                      <input
                        type="time"
                        className="border rounded-lg px-4 py-3 w-full"
                      />
                    </div>

                    <button className="mt-3 text-sm underline text-gray-700">
                      Add Another Date
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={onClose}
                className="bg-[#111927] text-white px-6 py-3 rounded-lg hover:bg-[#111927]/90 transition cursor-pointer"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
