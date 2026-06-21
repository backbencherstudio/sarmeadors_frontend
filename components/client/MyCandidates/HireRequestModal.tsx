"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { useShortTermHireRequestMutation } from "@/feature/dashboard/client/myCandidate";

interface HireRequestModalProps {
  isHireModalOpen: boolean;
  onClose: () => void;
}

export default function HireRequestModal({
  isHireModalOpen,
  onClose,
}: HireRequestModalProps) {
  const [jobType, setJobType] = useState("short-term");
  const [step, setStep] = useState(1);
  const [shortTermHireRequest] = useShortTermHireRequestMutation();

  if (!isHireModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* ===== STEP 1 ===== */}
        {step === 1 && (
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

                {/* LONG TERM */}
                {jobType === "long-term" && (
                  <div>
                    <button className="bg-[#E6F0FF] text-[#2B7FFF] leading-[142.857%] text-sm px-2 py-1.5 rounded-sm">
                      For long-term booking you need to schedule an interview.
                    </button>
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={onClose}
                        className="bg-[#111927] text-white px-6 py-3 rounded-lg hover:bg-[#111927]/90 transition cursor-pointer"
                      >
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                )}

                {/* SHORT TERM */}
                {jobType === "short-term" && (
                  <div className="mt-6 space-y-6">
                    <div className="flex gap-2 mb-6">
                      <div className="h-1 flex-1 rounded-full bg-[#111927]" />
                      <div className="h-1 flex-1 rounded-full bg-gray-200" />
                      <div className="h-1 flex-1 rounded-full bg-gray-200" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#111927]">
                        Booking Date & Time
                      </h4>
                      <p className="text-sm text-gray-500">
                        Schedule when this job will take place
                      </p>
                    </div>

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

                    <div className="flex justify-end mt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="bg-[#111927] text-white px-6 py-3 rounded-lg hover:bg-[#111927]/90 transition cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== STEP 2: Job Details ===== */}
        {step === 2 && (
          <div>
            {/* Progress Bar */}
            <div className="flex gap-2 mb-6">
              <div className="h-1 flex-1 rounded-full bg-[#111927]" />
              <div className="h-1 flex-1 rounded-full bg-[#111927]" />
              <div className="h-1 flex-1 rounded-full bg-gray-200" />
            </div>

            <h3 className="font-medium text-[#111927] text-sm leading-[142.857%]">
              Job Details
            </h3>
            <p className="text-[12px] text-[#778593] leading-[133.333%] mb-3">
              Provide the basic information about the job posting
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Enter a description..."
                  rows={4}
                  className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-[#111927]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                  Compensation <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <select className="border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none">
                    <option>$</option>
                    <option>€</option>
                    <option>£</option>
                  </select>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 underline cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-[#111927] text-white px-6 py-3 rounded-lg hover:bg-[#111927]/90 transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: Requirements ===== */}
        {step === 3 && (
          <div>
            {/* Progress Bar */}
            <div className="flex gap-2 mb-6">
              <div className="h-1 flex-1 rounded-full bg-[#111927]" />
              <div className="h-1 flex-1 rounded-full bg-[#111927]" />
              <div className="h-1 flex-1 rounded-full bg-[#111927]" />
            </div>

            <h3 className="font-medium text-[#111927] text-sm leading-[142.857%]">
              Define Job Address
            </h3>
            <p className="text-[12px] text-[#778593] leading-[133.333%] mb-3">
              Provide detailed address about the job posting
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                  Job Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <div>
                  <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                    Home City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                    Home Province/State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                <div>
                  <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                    Home Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#111927] leading-[142.857%]">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111927]"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-gray-500 underline cursor-pointer"
              >
                Back
              </button>
              <Link
                href={
                  "/client/client-my-candidates/new-candidates/1/personal-information/payment-information"
                }
                onClick={onClose}
                className="bg-[#111927] text-white px-6 py-3 rounded-lg hover:bg-[#111927]/90 transition cursor-pointer"
              >
                Submit
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
