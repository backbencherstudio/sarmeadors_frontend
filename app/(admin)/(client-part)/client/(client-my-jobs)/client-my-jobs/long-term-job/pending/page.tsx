import CancelModal from "@/components/client/ClientMyJobs/ShortTermJob/Common/CancelModal";
import ClockICon from "@/components/icon/ClockICon";
import LocationIcon from "@/components/icon/LocationIcon";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import { HiExternalLink } from "react-icons/hi";

export default function Page() {
  return (
    <div className="flex items-start justify-center">
      {/* Outer Container */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <ClockICon />
          <h2 className="text-gray-900 font-semibold">Pending Approval</h2>
        </div>

        {/* Job Card */}
        <div className="space-y-5">
          <div className="flex flex-col lg:flex-row gap-6 bg-[#F9FAFB] p-6 rounded-[12px]">
            {/* Date */}
            <div className=" min-w-[100px]">
              <h3 className="text-2xl font-bold text-gray-800">18</h3>
              <p className="text-xs text-gray-500 uppercase">Jan, Sun</p>
            </div>

            <div className="w-full">
              {/* LEFT SECTION */}
              <div className="flex justify-between gap-5">
                {/* Job Details */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      After School Nanny
                    </h3>
                    <span className="px-2 py-1 text-sm bg-[#E5B400] text-white rounded-md">
                      Pending for Approval
                    </span>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold text-blue-700">
                      OP
                    </div>
                    <span className="text-sm text-gray-700">Arlene McCoy</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-2 max-w-lg truncate">
                    Full responsibility for three energetic children, ages 2, 5,
                    and 7, including crafting delicious and engaging meals...
                  </p>

                  {/* Address */}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <LocationIcon />
                    <span>
                      71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605
                    </span>
                  </div>
                </div>
                {/* RIGHT SECTION */}
                <div className="flex flex-col items-end justify-between gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    10:00AM - 11:00AM
                  </p>

                  <div className="bg-gray-100 text-sm px-3 py-2 rounded-lg text-gray-600">
                    Check In{" "}
                    <span className="font-semibold text-gray-800">5:02 PM</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                {/* Details Link */}
                <Link
                  href={"/client/pending-view-details/job-description"}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-x-1.5 font-semibold"
                >
                  <span>View Details</span>
                  <HiExternalLink />
                </Link>
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <BiEditAlt />
                </button>

                {/* Cancel Modal */}
                <CancelModal />
              </div>
            </div>
          </div>
          {/* 22222222 */}
          <div className="flex flex-col lg:flex-row gap-6 bg-gray-100 p-6 rounded-[12px]">
            {/* Date */}
            <div className=" min-w-[100px]">
              <h3 className="text-2xl font-bold text-gray-800">18</h3>
              <p className="text-xs text-gray-500 uppercase">Jan, Sun</p>
            </div>

            <div className="w-full">
              {/* LEFT SECTION */}
              <div className="flex justify-between gap-5">
                {/* Job Details */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      After School Nanny
                    </h3>
                    <span className="px-2 py-1 text-sm bg-amber-400 text-white rounded-md">
                      Pending for Approval
                    </span>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold text-blue-700">
                      OP
                    </div>
                    <span className="text-sm text-gray-700">Arlene McCoy</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-2 max-w-lg truncate">
                    Full responsibility for three energetic children, ages 2, 5,
                    and 7, including crafting delicious and engaging meals...
                  </p>

                  {/* Address */}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <span>📍</span>
                    <span>
                      71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605
                    </span>
                  </div>
                </div>
                {/* RIGHT SECTION */}
                <div className="flex flex-col items-end justify-between gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    10:00AM - 11:00AM
                  </p>

                  <div className="bg-gray-100 text-sm px-3 py-2 rounded-lg text-gray-600">
                    Check In{" "}
                    <span className="font-semibold text-gray-800">5:02 PM</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Details Link */}
                <Link
                  href={"/client/pending-view-details/job-description"}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  View Details
                </Link>

                {/* Cancel Modal */}
                <CancelModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
