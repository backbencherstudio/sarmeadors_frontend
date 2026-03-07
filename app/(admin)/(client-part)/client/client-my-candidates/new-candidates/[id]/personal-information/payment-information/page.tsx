"use client";

import DateIcon from "@/components/icon/DateIcon";
import LocationIcon from "@/components/icon/LocationIcon";
import StripeIcon from "@/components/icon/StripeIcon";
import { useState } from "react";

export default function PaymentPage() {
  const [saveCard, setSaveCard] = useState(false);

  return (
    <div className="flex items-center justify-center p-6 container">
      <div className="w-full grid grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 flex-1 col-span-2">
          {/* Payment Information Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[20px] font-medium leading-[120%] text-[#111927]">
              Payment Information
            </h2>
            <p className="text-[14px] leading-[142.857%] text-[#111927] mt-1.5 mb-5">
              Your card will be charged for the booking fee only.
            </p>

            <input
              type="text"
              placeholder="Enter name as on card"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] mb-3 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            />

            {/* Card Number */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="1245  264  2541  5234"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] pr-20 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {/* Mastercard */}
                <div className="relative w-8 h-5">
                  <div className="absolute left-0 w-5 h-5 bg-red-500 rounded-full opacity-90" />
                  <div className="absolute left-3 w-5 h-5 bg-yellow-400 rounded-full opacity-90" />
                </div>
                {/* Visa */}
                <div className="bg-[#1a1f71] text-white text-[9px] font-black px-1.5 py-0.5 rounded italic tracking-tight">
                  VISA
                </div>
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="MM / YY"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
              />
              <input
                type="text"
                placeholder="123"
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer mb-5">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={() => setSaveCard(!saveCard)}
                className="mt-0.5 accent-[#111827] cursor-pointer"
              />
              <span className="text-[12px] text-[#384250] leading-[133.333%] font-medium">
                Your payment information is securely stored in our system to be
                used for future bookings.
              </span>
            </label>

            {/* Stripe Badge */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-[16px] font-bold text-[#111827] leading-[137.5%]">
                Stripe
              </span>
              <StripeIcon />
            </div>
          </div>

          {/* Billing Address Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[20px] leading-[120%] font-medium text-[#111827] mb-4">
              Billing Address
            </h2>

            <div className="relative mb-3">
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 appearance-none bg-white cursor-pointer focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]">
                <option value="" disabled>
                  Select your country
                </option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter your ZIP code"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            />
          </div>

          {/* Additional Note Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[20px] leading-[120%] font-medium text-[#111827] mb-4">
              Add additional note
            </h2>
            <textarea
              placeholder="Write message..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] resize-none focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="flex-shrink-0 col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
              {/* Job Info */}
              <h3 className="text-[16px] font-semibold text-[#111827] leading-[137.5%] mb-6">
                Full Time Nanny / Family Assistant in Miami Beach + travel
                (ideally live in)
              </h3>

              {/* Compensation & Hours */}
              <div className="flex justify-between items-centermb-1">
                <span className="text-[#384250] text-[14px] leading-[142.857%]">
                  Compensation
                </span>
                <span className="font-bold text-[14px] text-[#111827] leading-[142.857%]">
                  $25/hr
                </span>
              </div>
              <div className="flex justify-between items-centermb-4">
                <span className="text-[#384250] text-[14px] leading-[142.857%]">
                  Total Hour
                </span>
                <span className="font-bold text-[14px] text-[#111827] leading-[142.857%]">
                  8hr
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Location & Date */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-5">
                <div className="flex items-center gap-1">
                  <LocationIcon />
                  <span className="text-[#384250] leading-[142.857%] text-[14px]">
                    Daactur, Georgia 30030
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <DateIcon />
                  <span className="text-[#384250] leading-[142.857%] text-[14px]">
                    11/03/2025
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl my-5">
              {/* Order Summary */}
              <h4 className="text-[16px] font-semibold leading-[137.5%] text-[#111827] mb-3">
                Order Summary
              </h4>

              <div className="flex justify-between mb-2">
                <span className="text-[14px] tetx-[#384250] leading-[142.857%]">
                  Agency Fee
                </span>
                <span className="text-[#384250] text-[14px] leading-[142.857%] font-semibold">
                  $40
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#778593] leading-[142.857%] text-[14px]">
                  Tax
                </span>
                <span className="text-[#778593] leading-[142.857%] text-[14px]">
                  -
                </span>
              </div>
              {/* Divider */}
              <div className="border-t border-gray-100 my-2" />
              <div className="flex justify-between mb-4">
                <span className="text-[#161A1E] text-[14px] font-medium">
                  Total
                </span>
                <span className="text-[#161A1E] text-[14px] font-medium">
                  $40
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="px-6 py-4 bg-[#111927] border border-[#384250] rounded-[12px] text-lg text-[#FCFCFD] font-semibold leading-[100%] w-full cursor-pointer hover:bg-[#111927]/90">
              Confirm & Pay $40
            </button>

            {/* Secured by Stripe */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#9DA4AE] text-[16px] leading-[137.5%] font-semibold mt-3">
                Secured by SecureTrust !
              </p>
              <p className="text-[#111927] font-bold text-[18px] leading-[137.5%]">
                stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
