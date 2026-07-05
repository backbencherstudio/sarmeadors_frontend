"use client";

import { useRescheduleInterviewMutation } from "@/feature/dashboard/client/interviews";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TimeRescheduleIcon from "@/components/icon/TimeRescheduleIcon";

type RescheduleFormData = {
  scheduled_date: string;
  available_from: string;
  available_to: string;
  reason: string;
};

export default function RescheduleModal({ id }: { id: string }) {
  const [RescheduleInterview, { isLoading, isError, isSuccess }] =
    useRescheduleInterviewMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RescheduleFormData>();

  const onSubmit = async (data: RescheduleFormData) => {
    clearErrors();

    try {
      const response = await RescheduleInterview({ id, data }).unwrap();

      if (response?.success === false) {
        throw response;
      }

      toast.success("Interview rescheduled successfully!");
    } catch (error) {
      const payload =
        error?.data?.data ?? error?.data?.errors ?? error?.data ?? error;

      if (payload && typeof payload === "object" && !Array.isArray(payload)) {
        const fieldEntries = Object.entries(payload).filter(
          ([fieldName]) => fieldName !== "message",
        );

        if (fieldEntries.length > 0) {
          fieldEntries.forEach(([fieldName, value]) => {
            const messages = Array.isArray(value) ? value : [value];
            const message = messages.find(
              (item) => typeof item === "string" && item.trim(),
            );

            if (message) {
              setError(fieldName as keyof RescheduleFormData, {
                type: "server",
                message,
              });
            }
          });
          return;
        }
      }

      const fallbackMessage =
        error?.data?.message ||
        "Failed to reschedule interview. Please try again.";

      toast.error(fallbackMessage);
    }
  };

  if (!open) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-x-1.5 px-4 py-2 border border-[#E5E7EB] hover:bg-green-100 rounded-[8px] cursor-pointer">
          <TimeRescheduleIcon />
          <span className="text-[#111927] font-medium text-sm leading-[142.857%]">
            Reschedule
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl! p-6 rounded-2xl">
        {/* Illustration */}
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-semibold text-center">
            Reschedule Interview
          </DialogTitle>
        </DialogHeader>

        <div>
          <div>
            <p className="text-center text-gray-900 mt-2 text-sm md:text-base">
              Update the interview details with{" "}
              <span className="font-semibold">Charlotte Hamlin</span> for the{" "}
              <br />
              <span className="font-semibold">After School Nanny</span>{" "}
              position?
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rescheduled Date
                  <span className="text-red-500"> *</span>
                </label>

                <input
                  type="date"
                  {...register("scheduled_date", {
                    required: "Date is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.scheduled_date && (
                  <p className="mt-1 text-sm text-red-500">
                    {typeof errors.scheduled_date.message === "string"
                      ? errors.scheduled_date.message
                      : "Date is required"}
                  </p>
                )}
              </div>

              {/* Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Available from
                    <span className="text-red-500"> *</span>
                  </label>

                  <input
                    type="time"
                    {...register("available_from", {
                      required: "Start time required",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {errors.available_from && (
                    <p className="mt-1 text-sm text-red-500">
                      {typeof errors.available_from.message === "string"
                        ? errors.available_from.message
                        : "Start time required"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Available to
                    <span className="text-red-500"> *</span>
                  </label>

                  <input
                    type="time"
                    {...register("available_to", {
                      required: "End time required",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {errors.available_to && (
                    <p className="mt-1 text-sm text-red-500">
                      {typeof errors.available_to.message === "string"
                        ? errors.available_to.message
                        : "End time required"}
                    </p>
                  )}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Why do you want to reschedule the interview?
                  <span className="text-red-500"> *</span>
                </label>

                <textarea
                  rows={4}
                  placeholder="Enter a reason..."
                  {...register("reason", { required: "Reason is required" })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-500">
                    {typeof errors.reason.message === "string"
                      ? errors.reason.message
                      : "Reason is required"}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <DialogClose>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </DialogClose>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                >
                  Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
