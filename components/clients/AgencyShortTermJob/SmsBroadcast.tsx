"use client";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export default function SmsBroadcast() {
  const [smsContent, setSmsContent] = useState(`
    Hi [[name]],
    There is a new opportunity available that may be of interest to you,
    to see all of the details please visit https://nanniescoasttocoast.com/job/10776089
  `);

  const handleSmsContentChange = (e) => {
    setSmsContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("SMS Broadcasted!");
  };
  return (
    <div className="bg-white rounded-lg border p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Send SMS</h2>

        <textarea
          className="px-3.5 py-3 bg-[#FFFFFF] border rounded-[8px] w-full"
          value={smsContent}
          onChange={handleSmsContentChange}
        />

        <p className="mt-1.5 mb-2 text-[#0065FF] flex justify-end">
          {smsContent.length}/160 characters 1 segment
        </p>
      </div>

      <div className="flex items-start gap-3 py-1.5 px-2 bg-[#FFFAE5]">
        <AlertCircle size={20} className="text-[#B67D35] rotate-180" />
        <div className="text-sm text-[#B67D35]">
          <p className="font-medium mb-1">
            This message will be sent as 1 segment. Each segment is charged
            separately
          </p>
          <a href="#" className="text-[#0065FF]">
            Learn how SMS pricing works
          </a>
        </div>
      </div>

      <div className="mt-3">
        <div>
          <button className="px-6 py-4 bg-[#F3F4F6] border rounded-[12px] text-[#111927] font-semibold text-base cursor-pointer">
            Edit the SMS Broadcast Template
          </button>
          <div className="mt-3">
            <p className="text-[#111927] font-semibold">
              Use [[fname]] for this name
            </p>
            <p className="mt-3 text-[#111927] font-semibold">
              Please note that there is a cost of 145 (I,45$) per 160 characters
              of sent/received SMS
            </p>
          </div>
        </div>

        <button
          className="px-6 py-4 text-white font-medium bg-[#111927] rounded-lg transition mt-2 cursor-pointer"
          onClick={handleSubmit}
        >
          Broadcast SMS
        </button>
      </div>
    </div>
  );
}
