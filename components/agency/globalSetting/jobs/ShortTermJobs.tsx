"use client";

import React, { useState } from "react";
import CommonAccordion from "../CommonAccordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const documentOptions = [
  "Need approval of admin for short-term job.",
  "Send email to candidate when assigned to short-term job.",
  "Send email to client when candidate is assigned to a short-term job.",
  "Make providing a reason for canceling a short-term job mandatory.",
  "Do not request a reason when the client cancels a short-term job.",
  "Unassign the short-term job when the client cancels.",
  "Send an email notification to the candidate when unassigning a job.",
  "Include the cancellation reason in the candidate’s email when the client cancels a short-term job.",
  "Display canceled jobs in the calendar view.",
  "Show assigned jobs at the top of the table view.",
  "When broadcasting a short-term job, check the 'Already booked at this time' option by default.",
  "When broadcasting a short-term job, check the 'Who have time off at this time' option by default.",
  "When broadcasting a short-term job, check the 'Who are not available at this time' option by default.",
  "When broadcasting a short-term job, check the 'Whose tags don’t match' option by default.",
  "When broadcasting a short-term job, check the 'Who are on Do Not Match list' option by default.",
  "Disable distance-based search for short-term jobs by default.",
];

export default function ShortTermJobs() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggle = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  return (
    <CommonAccordion title="Short Term Jobs">
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
