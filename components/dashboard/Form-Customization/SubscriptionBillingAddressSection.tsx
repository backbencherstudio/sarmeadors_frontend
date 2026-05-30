"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";

type Props = {
  label?: string;
};

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

export default function SubscriptionBillingAddressSection({ label }: Props) {
  return (
    <div className="space-y-3 rounded-xl border border-borderColor bg-white p-3">
      <div>
        <h4 className="text-base font-semibold text-headerColor">
          {label || "Billing Address"}
        </h4>
      </div>

      <div className="space-y-2">
        <SelecteInputField
          options={countryOptions}
          placeholder="Select your country"
          className="bg-bgColor text-sm"
        />
        <ReusableInput
          placeholder="Enter your ZIP code"
          className="w-full bg-bgColor text-sm"
        />
      </div>
    </div>
  );
}
