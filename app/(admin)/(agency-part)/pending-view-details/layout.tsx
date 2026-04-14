"use client";
import RejectModal from "@/components/clients/AgencyShortTermJob/RejectModal";
import ButtonReuseable from "@/components/reusable/CustomButton";
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function PandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const TabsData = [
    {
      label: "Job Description",
      link: "/pending-view-details/job-description",
    },
    {
      label: "Applicants (0)",
      link: "/pending-view-details/applicants",
    },
  ];
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
        <div className="flex items-center gap-[8px]">
          <ButtonReuseable
            onClick={() => setOpen(true)}
            title="Reject"
            icon={<X className="h-4 w-4 text-[#CB121D]" />}
            className="bg-grayColor1! px-4 font-semibold rounded-md tex-sm py-[10.5px]! border border-borderColor text-[#CB121D]!"
          />
          <ButtonReuseable
            title="Approve"
            icon={<Check className="h-4 w-4" />}
            className="bg-[#111927]! px-4 font-semibold rounded-md tex-sm py-[10.5px]! border border-borderColor text-white!"
          />
        </div>
      </div>
      {/* Reusable Line Tabs */}
      <ReusableLineTabs tabs={TabsData} />
      {/* Children */}
      <div className="pt-5">{children}</div>
      <RejectModal open={open} setOpen={setOpen} />
    </div>
  );
}
