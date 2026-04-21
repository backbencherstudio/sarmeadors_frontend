"use client";

import UploadIcon from "@/components/icon/UploadIcon";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  revenue: string;
  dateRevenue: string;
  status: string;
  manager: string;
  notifyManager: boolean;
  title: string;
  client: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  location: string;
  compensation: string;
  startDate: string;
  children: string;
  schedule: string;
};

export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      status: "Posted",
      notifyManager: false,
    },
  });

  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Post Job:", data);
  };

  const inputClass =
    "w-full border border-gray-300 rounded p-4 text-base rounded-md text-gray-800 placeholder-gray-400 focus:outline-none bg-[#F9FAFB]";
  const labelClass = "block text-base text-[#111927] mb-1.5 font-medium";
  const errorClass = "text-xs text-red-500 mt-1";
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {/* Row 1: Revenue + Date Revenue */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              How much revenue was generated from this job? (Admin Only)
            </label>
            <input
              type="text"
              {...register("revenue")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Date Revenue Generated? (Admin Only)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                {...register("dateRevenue")}
                className={inputClass + " pr-8"}
              />
              <span className="absolute right-2 top-2 text-gray-400 text-sm">
                📅
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Status + Manager */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Status</label>
            <select {...register("status")} className={inputClass}>
              <option value="Posted">Posted</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
              <option value="Filled">Filled</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Manager</label>
            <select {...register("manager")} className={inputClass}>
              <option value="">Start typing to filter</option>
            </select>
          </div>
        </div>

        {/* Notify Manager */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="notifyManager"
            {...register("notifyManager")}
            className="w-3.5 h-3.5 cursor-pointer accent-gray-900"
          />
          <label
            htmlFor="notifyManager"
            className="text-xs text-gray-700 cursor-pointer"
          >
            Notify Manager
          </label>
        </div>

        {/* Title */}
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={inputClass}
          />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Select Client */}
        <div>
          <label className={labelClass}>Select Client</label>
          <select
            {...register("client", { required: "Client is required" })}
            className={inputClass}
          >
            <option value="">Start typing to filter</option>
          </select>
          {errors.client && (
            <p className={errorClass}>{errors.client.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>Address</label>
          <input type="text" {...register("address")} className={inputClass} />
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>City</label>
            <input type="text" {...register("city")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input type="text" {...register("state")} className={inputClass} />
          </div>
        </div>

        {/* Country + Zip Code */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Country</label>
            <input
              type="text"
              {...register("country")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Zip Code</label>
            <input
              type="text"
              {...register("zipCode")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Location</label>
          <select {...register("location")} className={inputClass}>
            <option value="">Start typing to filter</option>
          </select>
        </div>

        {/* Compensation + Start Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Compensation</label>
            <input
              type="text"
              {...register("compensation")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Start Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                {...register("startDate")}
                className={inputClass + " pr-8"}
              />
              <span className="absolute right-2 top-2 text-gray-400 text-sm">
                📅
              </span>
            </div>
          </div>
        </div>

        {/* Children */}
        <div>
          <label className={labelClass}>Children</label>
          <textarea
            {...register("children")}
            placeholder="Enter a description..."
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Schedule */}
        <div>
          <label className={labelClass}>Schedule</label>
          <textarea
            {...register("schedule")}
            placeholder="Enter a description..."
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Description — Rich Text Editor (contentEditable, outside RHF) */}
        <div>
          <label className={labelClass}>Description</label>
          <div className="border border-gray-300 rounded overflow-hidden">
            <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-200 bg-gray-50 flex-wrap">
              <select className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white text-gray-700 h-6">
                <option>Inter</option>
              </select>
              <select className="text-xs border border-gray-300 rounded px-1 py-0.5 bg-white text-gray-700 h-6">
                <option>16px</option>
                <option>14px</option>
                <option>18px</option>
              </select>
              <div className="w-px h-4 bg-gray-300 mx-0.5" />
              {["B", "I", "U"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="w-6 h-6 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded flex items-center justify-center"
                  style={{
                    fontWeight: t === "B" ? 700 : 400,
                    fontStyle: t === "I" ? "italic" : "normal",
                    textDecoration: t === "U" ? "underline" : "none",
                  }}
                >
                  {t}
                </button>
              ))}
              <div className="w-px h-4 bg-gray-300 mx-0.5" />
              <div className="w-5 h-5 rounded-full bg-gray-900 border border-gray-400 cursor-pointer" />
              <div className="w-px h-4 bg-gray-300 mx-0.5" />
              {["≡", "⫼", "≡", "≡"].map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-6 h-6 text-xs text-gray-600 hover:bg-gray-200 rounded flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
              <div className="w-px h-4 bg-gray-300 mx-0.5" />
              {["•≡", "1≡"].map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-6 h-6 text-xs text-gray-600 hover:bg-gray-200 rounded flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
              <div className="w-px h-4 bg-gray-300 mx-0.5" />
              {["🔗", "📎"].map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-6 h-6 text-xs text-gray-600 hover:bg-gray-200 rounded flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="px-3 py-3 text-sm text-gray-800 min-h-[80px] focus:outline-none"
            >
              <p>Hello Sabrina</p>
              <p>Please find your invoice details below</p>
            </div>
          </div>
        </div>

        {/* Upload Picture */}
        <div>
          <label className={labelClass}>Upload Picture</label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg py-10 flex flex-col items-center justify-center gap-3 transition-colors ${
              dragOver
                ? "border-gray-400 bg-gray-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            {uploadedFile ? (
              <p className="text-sm text-gray-700">{uploadedFile.name}</p>
            ) : (
              <>
                <p className="text-sm text-gray-500">Drag and drop Here</p>
                <p className="text-xs text-gray-400">Maximum 5MB file size</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-6 py-3 border border-gray-300 rounded text-xs text-gray-700 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <UploadIcon />
                  <span>Select File</span>
                </button>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2 pb-6">
          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}
