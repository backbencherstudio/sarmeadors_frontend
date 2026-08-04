"use client";

import { useState, useEffect } from "react";
import CommonAccordion from "../CommonAccordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { usePostCandidateSettingsUpdateMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

const DAYS_OPTIONS = Array.from({ length: 30 }, (_, i) => i + 1);
const MINUTES_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export default function ScheduleAvailabilitySettings({
  scheduleData,
  isLoading,
}: {
  scheduleData?: {
    dont_allow_reviews: boolean;
    set_status_if_no_shift: boolean;
    show_cancelled_jobs: boolean;
    show_past_jobs: boolean;
    candidates_can_decline: boolean;
    days_past_load_job: number;
    days_future_load_job: number;
    minutes_before_clock_button: number;
    clock_interval_minutes: number;
    client_confirm_clock: boolean;
    client_confirm_clock_phone: boolean;
    notify_hours_before_shift: number[];
    notify_method: string[];
    reminder_minutes_after_clock: number[];
    reminder_notify_method: string[];
  };
  isLoading?: boolean;
}) {
  const [postCandidateSettingsUpdate, { isLoading: isSaving }] =
    usePostCandidateSettingsUpdateMutation();

  const [dontAllowReviews, setDontAllowReviews] = useState(false);
  const [setStatusIfNoShift, setSetStatusIfNoShift] = useState(false);
  const [showCancelledJobs, setShowCancelledJobs] = useState(false);
  const [showPastJobs, setShowPastJobs] = useState(false);
  const [candidatesCanDecline, setCandidatesCanDecline] = useState(false);
  const [daysPastLoadJob, setDaysPastLoadJob] = useState(14);
  const [daysFutureLoadJob, setDaysFutureLoadJob] = useState(28);
  const [minutesBeforeClockButton, setMinutesBeforeClockButton] = useState(30);
  const [clockIntervalMinutes, setClockIntervalMinutes] = useState(15);
  const [clientConfirmClock, setClientConfirmClock] = useState(false);
  const [clientConfirmClockPhone, setClientConfirmClockPhone] = useState(false);
  const [notifyHoursBeforeShift, setNotifyHoursBeforeShift] = useState<
    string[]
  >([]);
  const [notifyMethod, setNotifyMethod] = useState<string[]>([]);
  const [reminderMinutesAfterClock, setReminderMinutesAfterClock] = useState<
    string[]
  >([]);
  const [reminderNotifyMethod, setReminderNotifyMethod] = useState<string[]>(
    [],
  );

  const [notifyHoursTagInput, setNotifyHoursTagInput] = useState("");
  const [notifyMethodTagInput, setNotifyMethodTagInput] = useState("");
  const [reminderMinutesTagInput, setReminderMinutesTagInput] = useState("");
  const [reminderNotifyMethodTagInput, setReminderNotifyMethodTagInput] =
    useState("");

  useEffect(() => {
    if (!scheduleData) return;
    setDontAllowReviews(scheduleData.dont_allow_reviews);
    setSetStatusIfNoShift(scheduleData.set_status_if_no_shift);
    setShowCancelledJobs(scheduleData.show_cancelled_jobs);
    setShowPastJobs(scheduleData.show_past_jobs);
    setCandidatesCanDecline(scheduleData.candidates_can_decline);
    setDaysPastLoadJob(scheduleData.days_past_load_job);
    setDaysFutureLoadJob(scheduleData.days_future_load_job);
    setMinutesBeforeClockButton(scheduleData.minutes_before_clock_button);
    setClockIntervalMinutes(scheduleData.clock_interval_minutes);
    setClientConfirmClock(scheduleData.client_confirm_clock);
    setClientConfirmClockPhone(scheduleData.client_confirm_clock_phone);
    setNotifyHoursBeforeShift(
      scheduleData.notify_hours_before_shift.map(String),
    );
    setNotifyMethod(scheduleData.notify_method);
    setReminderMinutesAfterClock(
      scheduleData.reminder_minutes_after_clock.map(String),
    );
    setReminderNotifyMethod(scheduleData.reminder_notify_method);
  }, [scheduleData]);

  const handleNotifyHoursTagKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && notifyHoursTagInput.trim()) {
      setNotifyHoursBeforeShift((prev) => [
        ...prev,
        notifyHoursTagInput.trim(),
      ]);
      setNotifyHoursTagInput("");
    }
  };

  const handleNotifyMethodTagKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && notifyMethodTagInput.trim()) {
      setNotifyMethod((prev) => [...prev, notifyMethodTagInput.trim()]);
      setNotifyMethodTagInput("");
    }
  };

  const handleReminderMinutesTagKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && reminderMinutesTagInput.trim()) {
      setReminderMinutesAfterClock((prev) => [
        ...prev,
        reminderMinutesTagInput.trim(),
      ]);
      setReminderMinutesTagInput("");
    }
  };

  const handleReminderNotifyMethodTagKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && reminderNotifyMethodTagInput.trim()) {
      setReminderNotifyMethod((prev) => [
        ...prev,
        reminderNotifyMethodTagInput.trim(),
      ]);
      setReminderNotifyMethodTagInput("");
    }
  };

  const removeNotifyHour = (c: string) =>
    setNotifyHoursBeforeShift((prev) => prev.filter((x) => x !== c));

  const removeNotifyMethod = (c: string) =>
    setNotifyMethod((prev) => prev.filter((x) => x !== c));

  const removeReminderMinute = (c: string) =>
    setReminderMinutesAfterClock((prev) => prev.filter((x) => x !== c));

  const removeReminderNotifyMethod = (c: string) =>
    setReminderNotifyMethod((prev) => prev.filter((x) => x !== c));

  const handleSubmit = async () => {
    const payload = {
      schedule_availability: {
        dont_allow_reviews: dontAllowReviews,
        set_status_if_no_shift: setStatusIfNoShift,
        show_cancelled_jobs: showCancelledJobs,
        show_past_jobs: showPastJobs,
        candidates_can_decline: candidatesCanDecline,
        days_past_load_job: daysPastLoadJob,
        days_future_load_job: daysFutureLoadJob,
        minutes_before_clock_button: minutesBeforeClockButton,
        clock_interval_minutes: clockIntervalMinutes,
        client_confirm_clock: clientConfirmClock,
        client_confirm_clock_phone: clientConfirmClockPhone,
        notify_hours_before_shift: notifyHoursBeforeShift.map(Number),
        notify_method: notifyMethod,
        reminder_minutes_after_clock: reminderMinutesAfterClock.map(Number),
        reminder_notify_method: reminderNotifyMethod,
      },
    };

    try {
      const response = await postCandidateSettingsUpdate(payload).unwrap();
      toast.success("Schedule availability settings saved successfully!");

      if (response?.data?.schedule_availability) {
        const updated = response.data.schedule_availability;
        setDontAllowReviews(updated.dont_allow_reviews);
        setSetStatusIfNoShift(updated.set_status_if_no_shift);
        setShowCancelledJobs(updated.show_cancelled_jobs);
        setShowPastJobs(updated.show_past_jobs);
        setCandidatesCanDecline(updated.candidates_can_decline);
        setDaysPastLoadJob(updated.days_past_load_job);
        setDaysFutureLoadJob(updated.days_future_load_job);
        setMinutesBeforeClockButton(updated.minutes_before_clock_button);
        setClockIntervalMinutes(updated.clock_interval_minutes);
        setClientConfirmClock(updated.client_confirm_clock);
        setClientConfirmClockPhone(updated.client_confirm_clock_phone);
        setNotifyHoursBeforeShift(
          updated.notify_hours_before_shift.map(String),
        );
        setNotifyMethod(updated.notify_method);
        setReminderMinutesAfterClock(
          updated.reminder_minutes_after_clock.map(String),
        );
        setReminderNotifyMethod(updated.reminder_notify_method);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error saving settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Schedule, Availability Settings">
      <div className="space-y-6">
        {/* Checkbox options */}
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={dontAllowReviews}
              onCheckedChange={() => setDontAllowReviews(!dontAllowReviews)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              Don't allow candidates to leave reviews
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={setStatusIfNoShift}
              onCheckedChange={() => setSetStatusIfNoShift(!setStatusIfNoShift)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              If candidate has not worked a shift job for X days, set to a
              status
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={showCancelledJobs}
              onCheckedChange={() => setShowCancelledJobs(!showCancelledJobs)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              Show cancelled job
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={showPastJobs}
              onCheckedChange={() => setShowPastJobs(!showPastJobs)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              Show Past Jobs
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={candidatesCanDecline}
              onCheckedChange={() =>
                setCandidatesCanDecline(!candidatesCanDecline)
              }
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              Candidates can decline assigned shift jobs
            </Label>
          </div>
        </div>

        <div className="space-y-6">
          {/* Number of days in the past to load job in My Job */}
          <div className="space-y-1">
            <label className="block text-base font-medium">
              Number of days in the past to load job in My Job
            </label>
            <div className="relative">
              <select
                value={daysPastLoadJob}
                onChange={(e) => setDaysPastLoadJob(Number(e.target.value))}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
              >
                {DAYS_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-[#778593]">
              If not specified, the default value is 14
            </p>
          </div>
          {/* Number of days in the future to load job in My Job */}
          <div className="space-y-1">
            <label className="block text-base font-medium">
              Number of days in the future to load job in My Job
            </label>
            <div className="relative">
              <select
                value={daysFutureLoadJob}
                onChange={(e) => setDaysFutureLoadJob(Number(e.target.value))}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
              >
                {DAYS_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-[#778593]">
              If not specified, the default value is 28
            </p>
          </div>
          {/* Number of minutes before the shift start time to show the clock in button */}
          <div className="space-y-1">
            <label className="block text-base font-medium">
              Number of minutes before the shift start time to show the clock in
              button
            </label>
            <div className="relative">
              <select
                value={minutesBeforeClockButton}
                onChange={(e) =>
                  setMinutesBeforeClockButton(Number(e.target.value))
                }
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
              >
                {MINUTES_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-[#778593]">By default it's 30 min</p>
          </div>
          {/* Minutes Interval when candidate clock in and out */}
          <div className="space-y-1">
            <label className="block text-base font-medium">
              Minutes Interval when candidate clock in and out
            </label>
            <div className="relative">
              <select
                value={clockIntervalMinutes}
                onChange={(e) =>
                  setClockIntervalMinutes(Number(e.target.value))
                }
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
              >
                {MINUTES_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-[#778593]">Clear</p>
          </div>
        </div>

        {/* Checkbox options 2 */}
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={clientConfirmClock}
              onCheckedChange={() => setClientConfirmClock(!clientConfirmClock)}
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              Client can confirm clock in & out (on clients booking section)
            </Label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={clientConfirmClockPhone}
              onCheckedChange={() =>
                setClientConfirmClockPhone(!clientConfirmClockPhone)
              }
            />
            <Label className="text-sm font-medium text-[#384250] cursor-pointer">
              Client can confirm clock in/out on the candidate's phone
            </Label>
          </div>
        </div>

        {/* Select */}
        <div className="space-y-4">
          {/* Notify a candidate of a shift job starting in X hours */}
          <div>
            <p className="font-medium">
              Notify a candidate of a shift job starting in X hours
            </p>
            <p className="text-sm text-[#778593] my-1.5">
              You can select multiple options to send multiple notifications! If
              empty, don't notify candidate before shift job starting.
            </p>
            <div className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4">
              {notifyHoursBeforeShift.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs"
                >
                  {c}
                  <span
                    onClick={() => removeNotifyHour(c)}
                    className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
                  >
                    ×
                  </span>
                </span>
              ))}
              <input
                value={notifyHoursTagInput}
                onChange={(e) => setNotifyHoursTagInput(e.target.value)}
                onKeyDown={handleNotifyHoursTagKey}
                className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
              />
            </div>
          </div>
          {/* Method to Notify */}
          <div>
            <p className="font-medium">Method to Notify</p>
            <p className="text-sm text-[#778593] my-1.5">
              Select Method to Notify candidate via
            </p>
            <div className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4">
              {notifyMethod.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs"
                >
                  {c}
                  <span
                    onClick={() => removeNotifyMethod(c)}
                    className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
                  >
                    ×
                  </span>
                </span>
              ))}
              <input
                value={notifyMethodTagInput}
                onChange={(e) => setNotifyMethodTagInput(e.target.value)}
                onKeyDown={handleNotifyMethodTagKey}
                className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
              />
            </div>
          </div>
          {/* Send a reminder to candidate X minutes after scheduled Clock In/Out time if they have not done so */}
          <div>
            <p className="font-medium">
              Send a reminder to candidate X minutes after scheduled Clock
              In/Out time if they have not done so
            </p>
            <p className="text-sm text-[#778593] my-1.5">
              You can select multiple options to send multiple notifications! If
              empty, don't notify candidate for clock in.
            </p>
            <div className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4">
              {reminderMinutesAfterClock.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs"
                >
                  {c}
                  <span
                    onClick={() => removeReminderMinute(c)}
                    className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
                  >
                    ×
                  </span>
                </span>
              ))}
              <input
                value={reminderMinutesTagInput}
                onChange={(e) => setReminderMinutesTagInput(e.target.value)}
                onKeyDown={handleReminderMinutesTagKey}
                className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
              />
            </div>
          </div>
          {/* Method to Notify Candidate for Clock In/Out */}
          <div>
            <p className="font-medium">
              Method to Notify Candidate for Clock In/Out
            </p>
            <p className="text-sm text-[#778593] my-1.5">
              Select Method to Notify candidate via
            </p>
            <div className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4">
              {reminderNotifyMethod.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs"
                >
                  {c}
                  <span
                    onClick={() => removeReminderNotifyMethod(c)}
                    className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none"
                  >
                    ×
                  </span>
                </span>
              ))}
              <input
                value={reminderNotifyMethodTagInput}
                onChange={(e) =>
                  setReminderNotifyMethodTagInput(e.target.value)
                }
                onKeyDown={handleReminderNotifyMethodTagKey}
                className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
              />
            </div>
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
