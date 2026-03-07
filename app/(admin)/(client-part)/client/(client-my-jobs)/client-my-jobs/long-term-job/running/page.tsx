import CancelModal from "@/components/client/ClientMyJobs/ShortTermJob/Common/CancelModal";
import ClockICon from "@/components/icon/ClockICon";
import LocationIcon from "@/components/icon/LocationIcon";
import MessageIcon from "@/components/icon/MessageIcon";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";

export default function Page() {
  return (
    <div className="flex items-start justify-center">
      {/* Outer Container */}
      <div className="w-full bg-white rounded-[20px] border border-[#E5E7EB] p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <ClockICon />
          <h2 className="text-[#111927] text-lg leading-[111.111%] font-medium">
            Running Job
          </h2>
        </div>

        {/* Job Card */}
        <div className="border-l-4 border border-[#6BA6FF] rounded-xl p-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Date */}
            <div className=" min-w-[100px]">
              <h3 className="text-2xl font-semibold text-[#111927] leading-[116.667%]">
                18
              </h3>
              <p className="text-xs text-[#384250] leading-[133.333%] uppercase">
                Jan, Sun
              </p>
            </div>

            <div className="w-full">
              {/* LEFT SECTION */}
              <div className="flex justify-between gap-5">
                {/* Job Details */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[16px] font-semibold text-[#111927] leading-[135.5%]">
                      After School Nanny
                    </h3>
                    <button className="px-2 py-1 text-sm bg-[#111927] text-white rounded-md cursor-pointer">
                      Running
                    </button>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-10 h-10 rounded-full bg-[#96C0FF] flex items-center justify-center text-[16px] font-semibold text-[#111927]">
                      OP
                    </div>
                    <span className="text-sm text-[#384250] leading-[142.857%]">
                      Arlene McCoy
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#778593] mt-2 max-w-lg leading-[142.857%]">
                    Full responsibility for three energetic children, ages 2, 5,
                    and 7, including crafting delicious and engaging meals...
                  </p>

                  {/* Address */}
                  <div className="text-sm text-[#778593] mt-2 max-w-lg leading-[142.857%] flex items-center gap-x-2">
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
              <div className="border-t border-gray-200 my-4" />

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <MessageIcon />
                </button>
                {/* Details Link */}
                <Link
                  href={"/client/running-view-details/job-description"}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-x-1.5 font-semibold"
                >
                  <span>View Details</span>
                  <HiExternalLink />
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
