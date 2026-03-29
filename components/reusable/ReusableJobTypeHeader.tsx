import TimerIcon from "@/public/icon/TimerIcon";
import Link from "next/link";
import InvoiceIcon from "../icon/InvoiceIcon";

export default function ReusableJobTypeHeader() {
  return (
    <div className="w-full bg-gradient-to-b from-[#BBE5EE] to-[#E0F2F6] p-5 rounded-xl my-6">
      <div className="bg-white rounded-xl shadow-sm px-3 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side Info */}
        <div className="flex flex-wrap items-center gap-6 w-full">
          {/* Working Time */}
          <div className="flex items-center gap-3 border-r pr-6">
            <TimerIcon />
            <div>
              <p className="font-semibold text-gray-900">8 hr 11 min</p>
              <p className="text-sm text-gray-500">Total Working Time</p>
            </div>
          </div>

          {/* Payable Amount */}
          <div className="border-r pr-6">
            <p className="font-semibold text-gray-900">$123</p>
            <p className="text-sm text-gray-500">Payable Amount</p>
          </div>

          {/* Schedule */}
          <div className="border-r pr-6">
            <p className="font-semibold text-gray-900">08:00 AM - 05:00 PM</p>
            <p className="text-sm text-gray-500">Morning 8:00AM to 5:00PM</p>
          </div>

          {/* Check In/Out */}
          <div>
            <p className="text-sm text-[#50C089]">
              Check In: <span>8:02 AM</span>
            </p>
            <p className="text-sm text-[#106FFE] inline-block mt-1.5">
              Check Out: <span>8:05 PM</span>
            </p>
          </div>
        </div>

        {/* Invoice Button */}
        <Link
          href={"#"}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-1 text-nowrap"
        >
          <InvoiceIcon />
          <span>View Invoice</span>
        </Link>
      </div>
    </div>
  );
}
