"use client";

import { DollarSign } from "lucide-react";
import CommonAccordion from "../CommonAccordion";

interface BookingFeeProps {
  shortTermFee: number | null;
  longTermFee: number | null;
  onShortTermFeeChange: (value: number | null) => void;
  onLongTermFeeChange: (value: number | null) => void;
}

export default function BookingFee({
  shortTermFee,
  longTermFee,
  onShortTermFeeChange,
  onLongTermFeeChange,
}: BookingFeeProps) {
  return (
    <CommonAccordion title="Booking Fee">
      <div className="space-y-4">
        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium">
              Short-term Booking Fee
            </label>
            <p className="text-sm text-[#778593] my-1">
              How much is the Short-term Booking Fee? If this is not set, we
              assume there is no Short-term Booking Fee
            </p>
            <div className="relative">
              <input
                type="number"
                value={shortTermFee ?? ""}
                onChange={(e) =>
                  onShortTermFeeChange(
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
                placeholder="Enter your amount"
                className="w-full bg-white border border-gray-300 rounded-lg p-4 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              />
              <div className="absolute inset-y-0 top-1/3 right-0 flex items-center pr-4 pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium">
              Long-term Booking Fee
            </label>
            <p className="text-sm text-[#778593] my-1">
              How much is the Long-term Booking Fee? If this is not set, we
              assume there is no Long-term Booking Fee
            </p>
            <div className="relative">
              <input
                type="number"
                value={longTermFee ?? ""}
                onChange={(e) =>
                  onLongTermFeeChange(
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
                placeholder="Enter your amount"
                className="w-full bg-white border border-gray-300 rounded-lg p-4 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              />
              <div className="absolute inset-y-0 top-1/3 right-0 flex items-center pr-4 pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonAccordion>
  );
}
