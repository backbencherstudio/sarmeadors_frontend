"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import ReusableJobTypeHeader from "@/components/reusable/ReusableJobTypeHeader";
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function CompletedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const TabsData = [
    {
      label: "Job Description",
      link: "/short-term-job/view-list/completed/view-details/invoice-active/job-description",
    },
    {
      label: "Applicants (0)",
      link: "/short-term-job/view-list/pending/applicants",
    },
  ];
  const router = useRouter();
  return (
    <div className="p-6">
      {/* Job Details */}
      <div className="flex justify-between items-center">
        <div className="">
          <button
            onClick={() => router.back()}
            className="font-semibold capitalize leading-[160%] flex items-center cursor-pointer"
          >
            <IoIosArrowBack />
            <span>Job Details</span>
          </button>
        </div>
        <div>
          <ButtonReuseable
            title="View Review"
            className="bg-[#111927]! px-4 font-semibold rounded-md tex-sm py-[10.5px]! border border-borderColor text-white!"
          />
        </div>
      </div>
      <ReusableJobTypeHeader />
      {/* Reusable Line Tabs */}
      <ReusableLineTabs tabs={TabsData} />
      {/* Children */}
      <div className="pt-5">{children}</div>
    </div>
  );
}
