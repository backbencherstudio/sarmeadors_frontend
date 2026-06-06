"use client";

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const documentOptions = [
  "Show document in profile section",
  "Hide documents in profile section",
  "Notify agency when user edits a document that has an expiration date",
  "Update candidate status when all documents are signed",
  "Agency gets notified when candidate upload any document",
  "Hide document name",
  "Admin can Sign document in User profile",
  "Include audit trail for Signed document",
  "Do not allow Candidates to delete Uploaded Documents",
  "Remove option for candidates to upload additional documents",
  "Remove option for clients to upload additional documents",
  "Agency gets notified when candidate upload any document",
];

export default function Documents() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggle = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <CommonAccordion title="Documents">
      <div className="space-y-4 pt-2">
        {documentOptions.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Checkbox
              checked={!!checkedItems[item]}
              onCheckedChange={() => toggle(item)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              {item}
            </Label>
          </div>
        ))}
      </div>
    </CommonAccordion>
  );
}
