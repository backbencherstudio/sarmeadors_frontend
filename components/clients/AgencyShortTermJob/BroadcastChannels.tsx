"use client";

import { AlertCircle } from "lucide-react";
import { useState } from "react";

export function BroadcastChannels() {
  const [smsCharCount, setSmsCharCount] = useState(0);

  const handleSMSChange = (text: string) => {
    setSmsCharCount(text.length);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-6">
        {/* SMS Column */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Send SMS</h2>

          {/* SMS Preview */}
          <div className="px-3.5 py-3 bg-[#FFFFFF] border rounded-[8px]">
            <p className="text-sm text-black font-medium mb-2">Hi [[name]],</p>
            <p className="text-sm text-black leading-relaxed">
              There is a new opportunity available that may be of interest to
              you, to see all of the details please visit
              https://nanniescoasttocoast.com/job/10776089
            </p>
          </div>

          <p className="mt-1.5 mb-2 text-[#0065FF] flex justify-end">
            181/153 characters 2 segments
          </p>

          {/* Character Count */}
          <div className="flex items-start gap-3 py-1.5 px-2 bg-[#FFFAE5]">
            <AlertCircle size={20} className="text-[#B67D35] rotate-180" />
            <div className="text-sm text-[#B67D35]">
              <p className="font-medium mb-1">
                This message will be sent as 2 segments. Each segment is charged
                separately
              </p>
              <a href="#" className="text-[#0065FF]">
                Learn how SMS pricing works
              </a>
            </div>
          </div>

          <div className="mt-3">
            <div>
              <button className="px-6 py-4 bg-[#F3F4F6] border rounded-[12px] text-[#111927] font-semibold text-base">
                Edit the SMS Broadcast Template
              </button>
              <div className="mt-3">
                <p className="text-[#111927] font-semibold">
                  Use [[fname]] for this name
                </p>
                <p className="mt-3 text-[#111927] font-semibold">
                  Use [[fname]] for this name
                </p>
                <p className="mt-3 text-[#111927] font-semibold">
                  Please not that there is a cost of 145 (I,45$) per 160
                  characters of sent./resive SMS
                </p>
              </div>
            </div>
            <button className="px-6 py-4 text-white font-medium bg-[#111927] rounded-lg transition mt-2 cursor-pointer">
              Broadcast SMS
            </button>
          </div>
        </div>

        {/* Push Notification Column */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Push Notification
          </h2>

          {/* Push Notification Preview */}
          <p className="text-sm text-gray-700 font-medium bg-[#FFFFFF] px-3 py-3.5 border rounded-[8px] mb-2">
            Hi [[name]],
          </p>
          <div className="px-3 py-3.5 bg-[#FFFFFF] border rounded-[8px]">
            <p className="text-sm text-gray-600 leading-relaxed">
              There is a new opportunity available that may be of interest to
              you, to see all of the details please visit
              https://nanniescoasttocoast.com/job/10776089
            </p>
          </div>

          {/* Template Variables */}
          <div>
            <p className="mt-3 text-[#111927] font-semibold">
              Use [[name]] for first name.
            </p>
            <p className="mt-3 text-[#111927] font-semibold">
              Use [[name]] for last name
            </p>
          </div>
          <div>
            <button className="px-6 py-4 text-white font-medium bg-[#111927] rounded-lg transition mt-2 cursor-pointer">
              Broadcast Push Notification
            </button>
          </div>
          <p className="text-sm text-[#CB121D] font-medium mt-3">
            *You need to select at least one person before you can broadcast
          </p>
        </div>
      </div>
    </div>
  );
}
