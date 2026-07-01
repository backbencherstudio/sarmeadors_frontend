"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";

export default function RescheduleModal({ open, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-center">
          Reschedule Interview
        </h2>

        <p className="text-center text-gray-900 mt-2 text-sm md:text-base">
          Update the interview details with{" "}
          <span className="font-semibold">Charlotte Hamlin</span> for the <br />
          <span className="font-semibold">After School Nanny</span> position?
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Rescheduled Date
            </label>

            <input
              type="datetime-local"
              {...register("date", { required: "Date is required" })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Time Inputs */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Available from
              </label>

              <input
                type="time"
                {...register("from", { required: "Start time required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Available to
              </label>

              <input
                type="time"
                {...register("to", { required: "End time required" })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div> */}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Why do you want to reschedule the interview?
              <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={4}
              placeholder="Enter a reason..."
              {...register("reason", { required: "Reason is required" })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>

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
  );
}
