"use client";

import CommonAccordion from "../CommonAccordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ShortTermSettings {
  check_time_off: boolean;
  check_not_available: boolean;
  need_admin_approval: boolean;
  check_already_booked: boolean;
  send_email_to_client: boolean;
  show_assigned_at_top: boolean;
  check_tags_dont_match: boolean;
  make_reason_mandatory: boolean;
  send_email_on_unassign: boolean;
  check_do_not_match_list: boolean;
  disable_distance_search: boolean;
  send_email_to_candidate: boolean;
  unassign_on_client_cancel: boolean;
  no_reason_if_client_cancels: boolean;
  display_canceled_on_calendar: boolean;
  include_cancel_reason_in_email: boolean;
}

interface ShortTermJobsProps {
  settings: ShortTermSettings;
  onSettingsChange: (settings: ShortTermSettings) => void;
}

const documentOptions = [
  { label: "Need approval of admin for short-term job.", key: "need_admin_approval" },
  { label: "Send email to candidate when assigned to short-term job.", key: "send_email_to_candidate" },
  { label: "Send email to client when candidate is assigned to a short-term job.", key: "send_email_to_client" },
  { label: "Make providing a reason for canceling a short-term job mandatory.", key: "make_reason_mandatory" },
  { label: "Do not request a reason when the client cancels a short-term job.", key: "no_reason_if_client_cancels" },
  { label: "Unassign the short-term job when the client cancels.", key: "unassign_on_client_cancel" },
  { label: "Send an email notification to the candidate when unassigning a job.", key: "send_email_on_unassign" },
  { label: "Include the cancellation reason in the candidate’s email when the client cancels a short-term job.", key: "include_cancel_reason_in_email" },
  { label: "Display canceled jobs in the calendar view.", key: "display_canceled_on_calendar" },
  { label: "Show assigned jobs at the top of the table view.", key: "show_assigned_at_top" },
  { label: "When broadcasting a short-term job, check the 'Already booked at this time' option by default.", key: "check_already_booked" },
  { label: "When broadcasting a short-term job, check the 'Who have time off at this time' option by default.", key: "check_time_off" },
  { label: "When broadcasting a short-term job, check the 'Who are not available at this time' option by default.", key: "check_not_available" },
  { label: "When broadcasting a short-term job, check the 'Whose tags don’t match' option by default.", key: "check_tags_dont_match" },
  { label: "When broadcasting a short-term job, check the 'Who are on Do Not Match list' option by default.", key: "check_do_not_match_list" },
  { label: "Disable distance-based search for short-term jobs by default.", key: "disable_distance_search" },
];

export default function ShortTermJobs({ settings, onSettingsChange }: ShortTermJobsProps) {
  const toggle = (key: keyof ShortTermSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };
  return (
    <CommonAccordion title="Short Term Jobs">
      <div className="space-y-4 pt-2">
        {documentOptions.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Checkbox
              checked={!!settings[item.key as keyof ShortTermSettings]}
              onCheckedChange={() => toggle(item.key as keyof ShortTermSettings)}
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
