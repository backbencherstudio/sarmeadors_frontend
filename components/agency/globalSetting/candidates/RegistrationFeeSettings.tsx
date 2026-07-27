"use client";

import { useState, useEffect } from "react";
import CommonAccordion from "../CommonAccordion";
import { DollarSign } from "lucide-react";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { usePostCandidateSettingsUpdateMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

export default function RegistrationFeeSettings({
  registrationFeeData,
  isLoading,
}: {
  registrationFeeData?: { registration_fee: number | null };
  isLoading?: boolean;
}) {
  const [postCandidateSettingsUpdate, { isLoading: isSaving }] =
    usePostCandidateSettingsUpdateMutation();

  const [registrationFee, setRegistrationFee] = useState<string>(
    registrationFeeData?.registration_fee?.toString() || "",
  );

  useEffect(() => {
    if (registrationFeeData) {
      setRegistrationFee(
        registrationFeeData.registration_fee?.toString() || "",
      );
    }
  }, [registrationFeeData]);

  const handleSubmit = async () => {
    const payload = {
      registration_fee: registrationFee ? parseFloat(registrationFee) : null,
    };

    try {
      const response = await postCandidateSettingsUpdate({
        registration_fee: payload,
      }).unwrap();
      toast.success("Registration fee settings saved successfully!");

      if (response?.data?.registration_fee) {
        setRegistrationFee(
          response.data.registration_fee.registration_fee?.toString() || "",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error saving settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Registration Fee Settings">
      <div className="space-y-6">
        <div>
          <label className="block text-base font-medium">
            Registration Fee
          </label>
          <p className="text-sm text-[#778593] my-1">
            How much is the candidate registration fee? If this is not set, we
            assume there is no registration fee.
          </p>
          <div className="relative">
            <input
              type="number"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
              placeholder="Enter your amount"
              className="w-full bg-white border border-gray-300 rounded-lg p-4 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            />
            <div className="absolute inset-y-0 top-1/3 right-0 flex items-center pr-4 pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-[#778593] mt-1">Clear</p>
        </div>

        <div className="flex justify-end mt-6 gap-2 px-4 pb-4">
          <ButtonReuseable
            onClick={handleSubmit}
            loading={isSaving}
            title="Save"
            sendingMsg={"Saving..."}
            className="bg-gray-900 text-white hover:bg-gray-800"
          />
        </div>
      </div>
    </CommonAccordion>
  );
}
