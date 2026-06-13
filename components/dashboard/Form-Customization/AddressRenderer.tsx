"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";

type Props = {
  field: any;
};

export default function AddressRenderer({ field }: Props) {
  return (
    <div className="space-y-3 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Address"}
        {field.required && " *"}
      </label>
      <ReusableInput
        label="Street Address"
        required
        className="w-full bg-bgColor text-sm"
      />
      <div className="grid grid-cols-2 gap-2">
        <ReusableInput
          label="City"
          required
          className="w-full bg-bgColor text-sm"
        />
        <ReusableInput
          label="Postal Code"
          required
          className="w-full bg-bgColor text-sm"
        />
        <ReusableInput
          label="Province/State"
          required
          className="w-full bg-bgColor text-sm"
        />
        <ReusableInput
          label="Country"
          required
          className="w-full bg-bgColor text-sm"
        />
      </div>
    </div>
  );
}
