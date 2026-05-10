"use client";

import { EyeIcon } from "lucide-react";

export interface AddressCardProps {
  title?: string;
  address: {
    street: string;
    city: string;
    provinceState: string;
    postalCode: string;
    country: string;
  };
}

const fields = [
  { label: "Street Address", key: "street" },
  { label: "City", key: "city" },
  { label: "Province/State", key: "provinceState" },
  { label: "Postal Code", key: "postalCode" },
  { label: "Country", key: "country" },
] as const;

export default function AddressCard({
  title = "Address",
  address,
}: AddressCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
      <p className="text-lg font-semibold text-gray-900 mb-3">{title}</p>
      <div className="grid grid-cols-5 gap-x-4 gap-y-2">
        {fields.map(({ label, key }) => (
          <div key={key}>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-gray-900">
                <EyeIcon className="h-4 w-4"/>
              </span>
            </div>
            <p className="text-base text-gray-800">{address[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
