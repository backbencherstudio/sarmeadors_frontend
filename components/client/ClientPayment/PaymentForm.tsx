"use client";

import StripeIcon from "@/components/icon/StripeIcon";

export default function PaymentForm() {
  return (
    <div className="w-full mx-auto px-4 py-8 font-sans">
      {/* Title */}
      <p className="text-gray-900 font-medium text-base mb-5">
        Please enter your payment information to pay for the invoice{" "}
        <span className="text-red-500">*</span>
      </p>

      <form className="space-y-3">
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
        <div className="flex gap-3">
          <div className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] pr-20 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]">
            <input
              type="text"
              name="expiry"
              placeholder="MM / YY"
              maxLength={5}
              className="w-full bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"
            />
          </div>

          <div className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] pr-20 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]">
            <input
              type="text"
              name="cvv"
              placeholder="123"
              maxLength={4}
              className="w-full bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* Stripe branding row */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[16px] text-[#111927] leading-[137.5%] font-bold">
            Stripe
          </span>
          <StripeIcon />
        </div>

        {/* Pay Button */}
        <div className="pt-1">
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-700 active:scale-95 transition-all text-white font-semibold text-sm px-10 py-3 rounded-xl cursor-pointer"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}
