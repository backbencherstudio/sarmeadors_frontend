"use client";

import Image from "next/image";
import jobImage from "@/public/jobs/Rectangle 856.png";
import { useGetSingleShortTermJobQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

const formatDateFromISO = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const formatTimeFromISO = (timeString: string) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const meridiem = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${meridiem}`;
};

export default function ClientJobDescription() {
  const params = useSearchParams();
  const jobId = params.get("jobId") || "";

  const { data } = useGetSingleShortTermJobQuery(jobId);
  const job = data?.data;

  return (
    <div className="max-w-full mx-auto bg-white font-sans">
      <Image
        src={job?.cover_image || jobImage}
        alt={"img"}
        width={166}
        height={128}
        className="mb-8 object-cover w-full max-w-41.5 h-auto"
      />
      {/* Customer Information */}
      <div className="mb-6">
        <h1 className="text-lg text-[#111927] font-semibold mb-1">
          {job?.title || "Job Title"}
        </h1>

        <div className="space-y-2">
          <div className="space-y-1.5">
            <span className="font-medium text-sm">Job Description</span>
            <p className="text-[#384250] text-sm">
              {job?.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-medium mb-3 text-[#111927]">
        Children Information
      </h1>

      <div className="mb-4 font-sans p-6 border border-gray-200 rounded-[12px]">
        {(job?.children ?? []).map((child: any, index: number) => (
          <div key={child.id}>
            {index > 0 && <hr className="my-5" />}
            <div className="space-y-3">
              <div>
                <span className="text-sm text-[#778593]">Name</span>
                <div className="text-sm font-medium mt-1 text-[#111927]">
                  {child.first_name} {child.last_name}
                </div>
              </div>

              <div>
                <span className="text-sm text-[#778593]">Date of Birth</span>
                <div className="text-sm font-medium mt-1 text-[#384250]">
                  {formatDateFromISO(child.date_of_birth)}
                </div>
              </div>

              <div>
                <span className="text-sm text-[#778593]">Gender</span>
                <div className="text-sm font-medium mt-1 text-[#384250]">
                  {child.gender
                    ? child.gender.charAt(0).toUpperCase() +
                      child.gender.slice(1)
                    : "Not specified"}
                </div>
              </div>

              <div>
                <span className="text-sm text-[#778593]">
                  Likes, dislikes, and interests.
                </span>
                <div className="text-sm font-medium mt-1 text-[#384250]">
                  {child.interests || "Not specified"}
                </div>
              </div>

              <div>
                <span className="text-sm text-[#778593]">
                  Allergies or special needs we need to be made aware of.
                </span>

                <div className="text-sm font-medium mt-1 text-[#384250]">
                  {child.allergies || "None"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-xl font-medium mb-3 text-[#111927]">
        Booking Date & Time
      </h1>
      <div className=" font-sans ">
        {/* Booking Date & Time */}
        <section className="mb-4 p-6 border border-gray-200 rounded-[12px]">
          {(job?.dates ?? []).length > 0 ? (
            <div className="space-y-4">
              {(job?.dates ?? []).map((date: any, index: number) => (
                <div key={date.id}>
                  {index > 0 && <hr className="my-4" />}
                  <div>
                    <span className="text-sm text-[#778593]">
                      {index === 0
                        ? "Booking Date & Time"
                        : `Additional Date & Time ${index}`}
                    </span>
                    <div className="text-sm font-medium mt-1 text-[#384250]">
                      {formatDateFromISO(date.booking_date)} (
                      {formatTimeFromISO(date.start_time)} -{" "}
                      {formatTimeFromISO(date.end_time)})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <span className="text-sm text-[#778593]">
                Booking Date & Time
              </span>
              <div className="text-sm font-medium mt-1 text-[#384250]">
                No dates scheduled
              </div>
            </div>
          )}
        </section>

        <h1 className="text-xl font-medium mb-3 text-[#111927]">Job Address</h1>
        {/* Job Address */}
        <section className="mb-4 p-6 border border-gray-200 rounded-[12px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="">
              <span className="text-sm  text-[#778593]">Street Address</span>
              <div className="text-sm font-medium mt-1 text-[#384250]">
                {job?.job_address || "Not specified"}
              </div>
            </div>

            <div className="">
              <span className="text-sm  text-[#778593]">City</span>
              <div className="text-sm font-medium mt-1 text-[#384250]">
                {job?.home_city || "Not specified"}
              </div>
            </div>

            <div className="">
              <span className="text-sm  text-[#778593]">Province/State</span>
              <div className="text-sm font-medium mt-1 text-[#384250]">
                {job?.home_province || "Not specified"}
              </div>
            </div>

            <div className="">
              <span className="text-sm  text-[#778593]">Postal Code</span>
              <div className="text-sm font-medium mt-1 text-[#384250]">
                {job?.home_postal_code || "Not specified"}
              </div>
            </div>

            <div className="">
              <span className="text-sm  text-[#778593]">Country</span>
              <div className="text-sm font-medium mt-1 text-[#384250]">
                {job?.country || "Not specified"}
              </div>
            </div>
          </div>
        </section>

        <h1 className="text-xl font-semibold mb-3 text-[#111927]">
          Set Budget
        </h1>
        {/* Set Budget */}
        <section className="mb-4 p-6 border border-gray-200 rounded-[16px]">
          <div>
            <span className="text-sm  text-[#778593]">Budget</span>
            <div className="text-sm font-medium mt-1 text-[#384250]">
              ${job?.compensation_amount}/
              {job?.compensation_type === "per_hour" ? "Hr" : "hr"}
            </div>
          </div>
        </section>

        <hr />

        <div className="flex flex-col md:flex-row md:justify-between gap-3 pt-5">
          <div className="md:max-w-[70%]">
            <h3 className="text-lg font-medium">Delete Post Permanently</h3>
            <p className="text-sm  text-[#778593]">
              This action is irreversible; we cannot recover your data after
              account deletion.
            </p>
          </div>
          <button className="text-red-600 font-medium cursor-pointer self-start md:self-auto">
            Delete Job Post{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
