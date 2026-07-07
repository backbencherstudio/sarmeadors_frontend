"use client";

import { useGetSingleApplicantQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

export default function PersonalInfoCardPage() {
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const candidateId = params.get("candidateId");

  const { data } = useGetSingleApplicantQuery({
    jobId: jobId,
    applicantId: candidateId,
  });

  console.log("----->", data);

  return (
    <div className=" border border-gray-200 rounded-2xl p-8 text-sm text-gray-700">
      {/* Title */}
      <h2 className="text-lg font-semibold text-black mb-6">
        Personal Information
      </h2>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-16 mb-8">
        <Info label="First Name" value="Kristin" />
        <Info label="Last Name" value="Ben" />
        <Info label="Email Address" value="binhan628@gmail.com" />
        <Info label="Date of Birth" value="12/12/2025" />
        <Info label="Nationality" value="Americans" />
        <Info label="Phone Number" value="+14842918883" />
      </div>

      {/* Address Title */}
      <h2 className="text-lg font-semibold text-black mb-6">Address</h2>

      {/* Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Info label="Street Address" value="26 Berkshire Ave." />
        <Info label="City" value="Atlantic City" />
        <Info label="Province/State" value="NJ" />
        <Info label="Postal Code" value="08401" />
        <Info label="Country" value="USA" />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
