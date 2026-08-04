"use client";

import { useState, useEffect } from "react";
import CommonAccordion from "../CommonAccordion";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { usePostCandidateSettingsUpdateMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

export default function AccessControlAndVisibilitySettings({
  accessControlData,
  isLoading,
}: {
  accessControlData?: {
    no_dashboard_access_statuses?: string[];
    no_dashboard_access_message?: string | null;
    resubmit_application_statuses?: string[];
  };
  isLoading?: boolean;
}) {
  const [postCandidateSettingsUpdate, { isLoading: isSaving }] =
    usePostCandidateSettingsUpdateMutation();

  const [noAccessStatuses, setNoAccessStatuses] = useState<string[]>([]);
  const [noAccessMessage, setNoAccessMessage] = useState("");
  const [resubmitStatuses, setResubmitStatuses] = useState<string[]>([]);
  const [noAccessTagInput, setNoAccessTagInput] = useState("");
  const [resubmitTagInput, setResubmitTagInput] = useState("");

  useEffect(() => {
    if (!accessControlData) return;
    setNoAccessStatuses(accessControlData.no_dashboard_access_statuses || []);
    setNoAccessMessage(accessControlData.no_dashboard_access_message || "");
    setResubmitStatuses(accessControlData.resubmit_application_statuses || []);
  }, [accessControlData]);

  const handleNoAccessTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && noAccessTagInput.trim()) {
      setNoAccessStatuses((prev) => [...prev, noAccessTagInput.trim()]);
      setNoAccessTagInput("");
    }
  };

  const handleResubmitTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && resubmitTagInput.trim()) {
      setResubmitStatuses((prev) => [...prev, resubmitTagInput.trim()]);
      setResubmitTagInput("");
    }
  };

  const removeNoAccessStatus = (c: string) =>
    setNoAccessStatuses((prev) => prev.filter((x) => x !== c));

  const removeResubmitStatus = (c: string) =>
    setResubmitStatuses((prev) => prev.filter((x) => x !== c));

  const handleSubmit = async () => {
    const payload = {
      no_dashboard_access_statuses: noAccessStatuses,
      no_dashboard_access_message: noAccessMessage || null,
      resubmit_application_statuses: resubmitStatuses,
    };

    try {
      const response = await postCandidateSettingsUpdate({
        access_control: payload,
      }).unwrap();
      toast.success("Access control settings saved successfully!");

      if (response?.data?.access_control) {
        const updated = response.data.access_control;
        setNoAccessStatuses(updated.no_dashboard_access_statuses || []);
        setNoAccessMessage(updated.no_dashboard_access_message || "");
        setResubmitStatuses(updated.resubmit_application_statuses || []);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error saving settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Access Control and Visibility Settings">
      <div className="space-y-6">
        {/* Candidate No Dashboard Access Statuses */}
        <div>
          <p className="font-medium">Candidate No Dashboard Access Statuses</p>
          <p className="text-sm text-[#778593] my-1">
            Candidates in these statuses will no longer be able to access their
            dashboard, preventing them from viewing or changing information (for
            example, rejected or terminated candidates).
          </p>
          <div className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-10.5 items-center cursor-text">
            {noAccessStatuses.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1 bg-[#111927] text-white rounded-xl px-2 py-0.5 text-xs"
              >
                {c}
                <span
                  onClick={() => removeNoAccessStatus(c)}
                  className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
                >
                  ×
                </span>
              </span>
            ))}
            <input
              value={noAccessTagInput}
              onChange={(e) => setNoAccessTagInput(e.target.value)}
              onKeyDown={handleNoAccessTagKey}
              className="border-none outline-none text-xs flex-1 min-w-15 bg-transparent"
            />
          </div>
        </div>

        {/* Candidate No Dashboard Access Message */}
        <div>
          <label className="block text-base font-medium mb-1">
            Candidate No Dashboard Access Message
          </label>
          <input
            type="text"
            value={noAccessMessage}
            onChange={(e) => setNoAccessMessage(e.target.value)}
            placeholder="Enter access denial message"
            className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />
        </div>

        {/* Statuses in which candidates can resubmit the application form */}
        <div>
          <p className="font-medium">
            Statuses in which candidates can resubmit the application form
          </p>
          <p className="text-sm text-[#778593] my-1">
            This means that even if the client is already in the system, they
            can submit the application form without getting a "duplicate email"
            notice
          </p>
          <div className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-10.5 items-center cursor-text">
            {resubmitStatuses.map((c) => (
              <span
                key={c}
                className="flex items-center gap-1 bg-[#111927] text-white rounded-xl px-2 py-0.5 text-xs"
              >
                {c}
                <span
                  onClick={() => removeResubmitStatus(c)}
                  className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
                >
                  ×
                </span>
              </span>
            ))}
            <input
              value={resubmitTagInput}
              onChange={(e) => setResubmitTagInput(e.target.value)}
              onKeyDown={handleResubmitTagKey}
              className="border-none outline-none text-xs flex-1 min-w-15 bg-transparent"
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
