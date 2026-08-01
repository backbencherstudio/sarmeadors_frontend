"use client";

import { useState, useEffect } from "react";
import CommonAccordion from "../CommonAccordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { usePostCandidateSettingsUpdateMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

const documentOptions = [
  {
    label: "Show document in profile section",
    key: "show_document_in_profile",
  },
  {
    label: "Hide documents in profile section",
    key: "hide_documents_in_profile",
  },
  {
    label:
      "Notify agency when user edits a document that has an expiration date",
    key: "notify_agency_on_expiration_edit",
  },
  {
    label: "Update candidate status when all documents are signed",
    key: "update_status_when_all_signed",
  },
  {
    label: "Agency gets notified when candidate upload any document",
    key: "notify_agency_on_upload",
  },
  { label: "Hide document name", key: "hide_document_name" },
  {
    label: "Admin can Sign document in User profile",
    key: "admin_can_sign_document",
  },
  {
    label: "Include audit trail for Signed document",
    key: "include_audit_trail",
  },
  {
    label: "Do not allow Candidates to delete Uploaded Documents",
    key: "prevent_candidate_delete",
  },
  {
    label: "Remove option for candidates to upload additional documents",
    key: "remove_upload_option_candidate",
  },
  {
    label: "Remove option for clients to upload additional documents",
    key: "remove_upload_option_client",
  },
];

export default function Documents({
  settingsData,
  isLoading,
}: {
  settingsData?: any;
  isLoading?: boolean;
}) {
  const [postCandidateSettingsUpdate, { isLoading: isSaving }] =
    usePostCandidateSettingsUpdateMutation();

  const documentsData = settingsData?.data?.documents;

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!documentsData) return;
    const initial: Record<string, boolean> = {};
    documentOptions.forEach((opt) => {
      initial[opt.label] = documentsData[opt.key] ?? false;
    });
    setCheckedItems(initial);
  }, [documentsData]);

  const toggle = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleSubmit = async () => {
    const documentsPayload: Record<string, boolean> = {};
    documentOptions.forEach((opt) => {
      documentsPayload[opt.key] = !!checkedItems[opt.label];
    });

    try {
      const response = await postCandidateSettingsUpdate({
        documents: documentsPayload,
      }).unwrap();
      toast.success("Documents settings saved successfully!");

      if (response?.data?.documents) {
        const updated = response.data.documents;
        const next: Record<string, boolean> = {};
        documentOptions.forEach((opt) => {
          next[opt.label] = updated[opt.key] ?? false;
        });
        setCheckedItems(next);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error saving settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Documents">
      <div className="space-y-4 pt-2">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          documentOptions.map((opt) => (
            <div key={opt.key} className="flex items-start gap-2">
              <Checkbox
                checked={!!checkedItems[opt.label]}
                onCheckedChange={() => toggle(opt.label)}
              />
              <Label className="text-sm font-medium text-[#384250] cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))
        )}
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
