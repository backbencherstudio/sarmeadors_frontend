"use client";

import CommonAccordion from "../CommonAccordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LongTermSettings {
  hide_from_job_board: boolean;
  hide_closed_jobs_admin: boolean;
  manage_payment_records: boolean;
  set_table_view_default: boolean;
  show_analytics_default: boolean;
}

interface LongTermJobsProps {
  settings: LongTermSettings;
  onSettingsChange: (settings: LongTermSettings) => void;
}

const documentOptions = [
  {
    label: "Manage Payment Records for Placement Jobs",
    key: "manage_payment_records",
  },
  {
    label:
      "When posting a job, 'hide from job board' should be checked by default.",
    key: "hide_from_job_board",
  },
  { label: "Set table view as default", key: "set_table_view_default" },
  {
    label: "Hide closed jobs by default on admin view",
    key: "hide_closed_jobs_admin",
  },
  { label: "Show analytics by default", key: "show_analytics_default" },
];

export default function LongTermJobs({
  settings,
  onSettingsChange,
}: LongTermJobsProps) {
  const toggle = (key: keyof LongTermSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <CommonAccordion title="Long Term Jobs">
      <div className="space-y-4 pt-2">
        {documentOptions.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Checkbox
              checked={!!settings[item.key as keyof LongTermSettings]}
              onCheckedChange={() => toggle(item.key as keyof LongTermSettings)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    </CommonAccordion>
  );
}
