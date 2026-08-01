"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import BookingFee from "@/components/agency/globalSetting/jobs/BookingFee";
import General from "@/components/agency/globalSetting/jobs/General";
import LongTermJobs from "@/components/agency/globalSetting/jobs/LongTermJobs";
import ShortTermJobs from "@/components/agency/globalSetting/jobs/ShortTermJobs";
import {
  useGetJobsSettingsQuery,
  usePostJobsSettingsUpdateMutation,
} from "@/feature/slice/settings/jobs/JobsSettingsSlice";

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

interface LongTermSettings {
  hide_from_job_board: boolean;
  hide_closed_jobs_admin: boolean;
  manage_payment_records: boolean;
  set_table_view_default: boolean;
  show_analytics_default: boolean;
}

interface JobsSettingsData {
  job_types: string[];
  long_term: LongTermSettings;
  short_term: ShortTermSettings;
  long_term_booking_fee: number | null;
  short_term_booking_fee: number | null;
}

export default function JobsPage() {
  const { data, isLoading, error } = useGetJobsSettingsQuery("jobsSettings");
  const [postJobsSettingsUpdate, { isLoading: isSaving }] =
    usePostJobsSettingsUpdateMutation();

  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [shortTermBookingFee, setShortTermBookingFee] = useState<number | null>(
    null,
  );
  const [longTermBookingFee, setLongTermBookingFee] = useState<number | null>(
    null,
  );
  const [shortTerm, setShortTerm] = useState<ShortTermSettings>({
    check_time_off: false,
    check_not_available: false,
    need_admin_approval: false,
    check_already_booked: false,
    send_email_to_client: false,
    show_assigned_at_top: false,
    check_tags_dont_match: false,
    make_reason_mandatory: false,
    send_email_on_unassign: false,
    check_do_not_match_list: false,
    disable_distance_search: false,
    send_email_to_candidate: false,
    unassign_on_client_cancel: false,
    no_reason_if_client_cancels: false,
    display_canceled_on_calendar: false,
    include_cancel_reason_in_email: false,
  });
  const [longTerm, setLongTerm] = useState<LongTermSettings>({
    hide_from_job_board: false,
    hide_closed_jobs_admin: false,
    manage_payment_records: false,
    set_table_view_default: false,
    show_analytics_default: false,
  });

  useEffect(() => {
    if (data?.data) {
      const settings: JobsSettingsData = data.data;
      setJobTypes(settings.job_types || []);
      setShortTermBookingFee(settings.short_term_booking_fee);
      setLongTermBookingFee(settings.long_term_booking_fee);
      setShortTerm({
        check_time_off: settings.short_term.check_time_off,
        check_not_available: settings.short_term.check_not_available,
        need_admin_approval: settings.short_term.need_admin_approval,
        check_already_booked: settings.short_term.check_already_booked,
        send_email_to_client: settings.short_term.send_email_to_client,
        show_assigned_at_top: settings.short_term.show_assigned_at_top,
        check_tags_dont_match: settings.short_term.check_tags_dont_match,
        make_reason_mandatory: settings.short_term.make_reason_mandatory,
        send_email_on_unassign: settings.short_term.send_email_on_unassign,
        check_do_not_match_list: settings.short_term.check_do_not_match_list,
        disable_distance_search: settings.short_term.disable_distance_search,
        send_email_to_candidate: settings.short_term.send_email_to_candidate,
        unassign_on_client_cancel:
          settings.short_term.unassign_on_client_cancel,
        no_reason_if_client_cancels:
          settings.short_term.no_reason_if_client_cancels,
        display_canceled_on_calendar:
          settings.short_term.display_canceled_on_calendar,
        include_cancel_reason_in_email:
          settings.short_term.include_cancel_reason_in_email,
      });
      setLongTerm({
        hide_from_job_board: settings.long_term.hide_from_job_board,
        hide_closed_jobs_admin: settings.long_term.hide_closed_jobs_admin,
        manage_payment_records: settings.long_term.manage_payment_records,
        set_table_view_default: settings.long_term.set_table_view_default,
        show_analytics_default: settings.long_term.show_analytics_default,
      });
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await postJobsSettingsUpdate({
        job_types: jobTypes,
        short_term_booking_fee: shortTermBookingFee,
        long_term_booking_fee: longTermBookingFee,
        short_term: shortTerm,
        long_term: longTerm,
      }).unwrap();
      toast.success("Jobs settings updated successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error updating jobs settings. Please try again.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Loading job settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-red-500">
          Failed to load job settings. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <General jobTypes={jobTypes} onJobTypesChange={setJobTypes} />
      <BookingFee
        shortTermFee={shortTermBookingFee}
        longTermFee={longTermBookingFee}
        onShortTermFeeChange={setShortTermBookingFee}
        onLongTermFeeChange={setLongTermBookingFee}
      />
      <ShortTermJobs settings={shortTerm} onSettingsChange={setShortTerm} />
      <LongTermJobs settings={longTerm} onSettingsChange={setLongTerm} />
      <div className="flex justify-end">
        <ButtonReuseable
          title="Save Changes"
          sendingMsg="Saving"
          onClick={handleSave}
          loading={isSaving}
          className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
        />
      </div>
    </div>
  );
}
