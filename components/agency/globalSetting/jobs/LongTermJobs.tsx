"use client";

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const documentOptions = [
  "Manage Payment Records for Placement Jobs",
  "When posting a job, 'hide from job board' should be checked by default.",
  "Set table view as default",
  "Hide closed jobs by default on admin view",
  "Show analytics by default",
];

export default function LongTermJobs() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggle = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <CommonAccordion title="Long Term Jobs">
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
