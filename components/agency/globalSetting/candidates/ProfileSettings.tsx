"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";
import CommonAccordion from "../CommonAccordion";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { usePostCandidateSettingsUpdateMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

const PROFILE_SCOPES = ["Public", "Private", "None"];
const INTERVIEW_BOX_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const INTERVAL_OPTIONS = [5, 10, 15, 30, 45, 60];
const MIN_BLOCK_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MAX_HOURS_OPTIONS = [
  1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
];
const TIME_OFF_DAYS_OPTIONS = [0, 1, 2, 3, 5, 7, 10, 14, 21, 30];
const BUFFER_HOURS_OPTIONS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

export default function ProfileSettings({
  profileData,
  isLoading,
}: {
  profileData?: {
    profile_picture_scope: string;
    interview_boxes_count: number;
    availability_scheduling_interval: number;
    time_off_request_categories: string[];
    min_time_block_duration: number;
    max_hours_per_week: number;
    time_off_request_days: number;
    buffer_time_hours: number;
  };
  isLoading?: boolean;
}) {
  const [postCandidateSettingsUpdate, { isLoading: isSaving }] =
    usePostCandidateSettingsUpdateMutation();

  const [profilePictureScope, setProfilePictureScope] = useState("public");
  const [interviewBoxesCount, setInterviewBoxesCount] = useState(2);
  const [availabilitySchedulingInterval, setAvailabilitySchedulingInterval] =
    useState(15);
  const [timeOffRequestCategories, setTimeOffRequestCategories] = useState<
    string[]
  >([]);
  const [minTimeBlockDuration, setMinTimeBlockDuration] = useState(2);
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(40);
  const [timeOffRequestDays, setTimeOffRequestDays] = useState(0);
  const [bufferTimeHours, setBufferTimeHours] = useState(1);

  useEffect(() => {
    if (profileData) {
      setProfilePictureScope(profileData.profile_picture_scope || "public");
      setInterviewBoxesCount(profileData.interview_boxes_count || 2);
      setAvailabilitySchedulingInterval(
        profileData.availability_scheduling_interval || 15,
      );
      setTimeOffRequestCategories(
        profileData.time_off_request_categories || [],
      );
      setMinTimeBlockDuration(profileData.min_time_block_duration || 2);
      setMaxHoursPerWeek(profileData.max_hours_per_week || 40);
      setTimeOffRequestDays(profileData.time_off_request_days || 0);
      setBufferTimeHours(profileData.buffer_time_hours || 1);
    }
  }, [profileData]);

  const handleSubmit = async () => {
    const payload = {
      profile: {
        profile_picture_scope: profilePictureScope,
        interview_boxes_count: interviewBoxesCount,
        availability_scheduling_interval: availabilitySchedulingInterval,
        time_off_request_categories: timeOffRequestCategories,
        min_time_block_duration: minTimeBlockDuration,
        max_hours_per_week: maxHoursPerWeek,
        time_off_request_days: timeOffRequestDays,
        buffer_time_hours: bufferTimeHours,
      },
    };

    try {
      const response = await postCandidateSettingsUpdate(payload).unwrap();
      toast.success("Profile settings saved successfully!");

      if (response?.data?.profile) {
        setProfilePictureScope(
          response.data.profile.profile_picture_scope || "public",
        );
        setInterviewBoxesCount(
          response.data.profile.interview_boxes_count || 2,
        );
        setAvailabilitySchedulingInterval(
          response.data.profile.availability_scheduling_interval || 15,
        );
        setTimeOffRequestCategories(
          response.data.profile.time_off_request_categories || [],
        );
        setMinTimeBlockDuration(
          response.data.profile.min_time_block_duration || 2,
        );
        setMaxHoursPerWeek(response.data.profile.max_hours_per_week || 40);
        setTimeOffRequestDays(response.data.profile.time_off_request_days || 0);
        setBufferTimeHours(response.data.profile.buffer_time_hours || 1);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error saving settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Profile settings">
      <div className="space-y-4">
        {/* Candidate Profile Picture Scope */}
        <div>
          <label className="block text-base font-medium mb-1">
            Candidate Profile Picture Scope
          </label>
          <div className="relative">
            <select
              value={profilePictureScope}
              onChange={(e) => setProfilePictureScope(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {PROFILE_SCOPES.map((s) => (
                <option key={s} value={s.toLowerCase()}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593] mt-1">
            Specify scope of candidate profile picture. Default is Public
          </p>
        </div>
        {/* Number of candidate interview boxes */}
        <div>
          <label className="block text-base font-medium mb-1">
            Number of candidate interview boxes
          </label>
          <div className="relative">
            <select
              value={interviewBoxesCount}
              onChange={(e) => setInterviewBoxesCount(Number(e.target.value))}
              className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {INTERVIEW_BOX_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593] mt-1">Default value is 2</p>
        </div>

        {/* Time Interval */}
        <div>
          <label className="block text-base font-medium">
            Time Interval for Availability Scheduling (minutes)
          </label>
          <p className="text-sm text-[#778593] my-1">
            Set the time interval in minutes for availability scheduling. Common
            values: 5, 10, 15, 30.
          </p>
          <div className="relative">
            <select
              value={availabilitySchedulingInterval}
              onChange={(e) =>
                setAvailabilitySchedulingInterval(Number(e.target.value))
              }
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {INTERVAL_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Time Off Request Categories */}
        <div>
          <label className="block text-base font-medium mb-3">
            Time Off Request Categories
          </label>
          <div className="flex flex-col gap-2">
            {timeOffRequestCategories.map((loc, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={loc}
                  onChange={(e) => {
                    const updated = [...timeOffRequestCategories];
                    updated[i] = e.target.value;
                    setTimeOffRequestCategories(updated);
                  }}
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
                <button
                  onClick={() =>
                    setTimeOffRequestCategories(
                      timeOffRequestCategories.filter((_, idx) => idx !== i),
                    )
                  }
                  className="text-red-400 hover:text-red-600 transition p-1 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setTimeOffRequestCategories([...timeOffRequestCategories, ""])
            }
            className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            <Plus size={16} />
            Add Another Item
          </button>
        </div>

        {/* Minimum time block duration for recurring availability */}
        <div className="space-y-1">
          <label className="block text-base font-medium">
            Minimum time block duration for recurring availability
          </label>
          <div className="relative">
            <select
              value={minTimeBlockDuration}
              onChange={(e) => setMinTimeBlockDuration(Number(e.target.value))}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {MIN_BLOCK_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593]">
            This means when a candidate is entering recurring availability, they
            wont be able to enter a time block less than the selected hours.
          </p>
        </div>
        {/* Maximum number of hours a candidate can work in a week */}
        <div>
          <label className="block text-base font-medium mb-1">
            Maximum number of hours a candidate can work in a week
          </label>
          <div className="relative">
            <select
              value={maxHoursPerWeek}
              onChange={(e) => setMaxHoursPerWeek(Number(e.target.value))}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {MAX_HOURS_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
        {/* Do not allow candidates to request time off for X days */}
        <div>
          <label className="block text-base font-medium mb-1">
            Do not allow candidates to request time off for X days
          </label>
          <div className="relative">
            <select
              value={timeOffRequestDays}
              onChange={(e) => setTimeOffRequestDays(Number(e.target.value))}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {TIME_OFF_DAYS_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593] mt-1">Default value none/0</p>
        </div>
        {/* Buffer time hours */}
        <div>
          <label className="block text-base font-medium mb-1">
            Number of hours in which candidate cannot be select for other jobs
            after finishing one job (buffer time)
          </label>
          <div className="relative">
            <select
              value={bufferTimeHours}
              onChange={(e) => setBufferTimeHours(Number(e.target.value))}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {BUFFER_HOURS_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-2 px-4 pb-4">
        <ButtonReuseable
          onClick={handleSubmit}
          loading={isSaving}
          title="Save"
          sendingMsg={"Saving..."}
          className="bg-gray-900 text-white hover:bg-gray-800"
        />
      </div>
    </CommonAccordion>
  );
}
