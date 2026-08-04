"use client";

import { useState, useEffect } from "react";
import CommonAccordion from "../CommonAccordion";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  useGetCommunicationSettingsQuery,
  usePostCommunicationSettingsUpdateMutation,
} from "@/feature/slice/settings/agencyDetails/AgencyDetailsSettingsSlice";

export default function CommunicationSettings() {
  const [adminEmail, setAdminEmail] = useState("");
  const [defaultFromEmail, setDefaultFromEmail] = useState("");
  const [defaultReplyEmail, setDefaultReplyEmail] = useState("");

  const { data, isLoading, error } = useGetCommunicationSettingsQuery();

  const [updateCommunicationSettings, { isLoading: isUpdating }] =
    usePostCommunicationSettingsUpdateMutation();

  useEffect(() => {
    if (data?.data) {
      setAdminEmail(data.data.admin_email || "");
      setDefaultFromEmail(data.data.default_from_email || "");
      setDefaultReplyEmail(data.data.default_reply_email || "");
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      await updateCommunicationSettings({
        admin_email: adminEmail,
        default_from_email: defaultFromEmail,
        default_reply_email: defaultReplyEmail,
      }).unwrap();
      toast.success("Communication settings updated successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error updating communication settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Communication Settings">
      <div>
        <label className="block text-base font-medium mb-1">Admin Email</label>
        <p>
          Primary email for your agency - this should be an email with your
          domain extension - @yourcompany.com, not gmail.com
        </p>
        <input
          type="text"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          placeholder="sarah@nanniescoasttocoastcom"
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1">
          Default From Email
        </label>
        <p>
          This is the fallback sending email for your agency if a specific email
          is not defined for a particular email.
        </p>
        <input
          type="url"
          value={defaultFromEmail}
          onChange={(e) => setDefaultFromEmail(e.target.value)}
          placeholder="sarah@nanniescoasttocoastcom"
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1">
          Default Reply Email
        </label>
        <p>
          This is the fallback email where email replies will go for your agency
          if a specific reply email is not defined for a particular outgoing
          email.
        </p>
        <input
          type="text"
          value={defaultReplyEmail}
          onChange={(e) => setDefaultReplyEmail(e.target.value)}
          placeholder="sarah@nanniescoasttocoastcom"
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>

      <div className="flex justify-end">
        <ButtonReuseable
          title="Save Changes"
          sendingMsg="Saving"
          onClick={handleSubmit}
          loading={isUpdating}
          className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
        />
      </div>
    </CommonAccordion>
  );
}
