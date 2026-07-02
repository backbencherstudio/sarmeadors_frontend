"use client";

import ReviewIcon from "@/components/icon/ReviewIcon";
import SendIcon from "@/components/icon/SendIcon";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import Image from "next/image";
import { useState } from "react";
import HireRequestModal from "./HireRequestModal";
import ReviewModal from "./ReviewModal";
import { useParams } from "next/navigation";

export function CandidatesDetailsTab() {
  const { id } = useParams();

  const tabs = [
    {
      label: "Personal Information",
      link: `/client/client-my-candidates/new-candidates/${id}/personal-information`,
      // icon: <HiOutlineMenu className="w-5 h-5" />,
    },
    {
      label: "Professional Information",
      link: `/client/client-my-candidates/new-candidates/${id}/professional-information`,
      // icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      label: "Documents",
      link: `/client/client-my-candidates/new-candidates/${id}/documents`,
      // icon: <MdSms className="w-5 h-5" />,
    },
    {
      label: "Additional Information",
      link: `/client/client-my-candidates/new-candidates/${id}/additional-information`,
      // icon: <FaTrophy className="w-5 h-5" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image
            src={"/candidates/candidates-profile.png"}
            alt="candidates-profile"
            height={100}
            width={100}
            className="h-[56px] w-[56px]"
          />
          <div>
            <h1 className="text-[#111927] text-[20px] leading-[120%] font-semibold">
              Darlene Robertson
            </h1>
            <p className="text-[16px] text-[#384250] leading-[137.5%]">
              Nanny | Baby/Night Nurse
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center text-[#111927] gap-1.5 p-4 bg-white border border-[#384250] rounded-[12px] cursor-pointer"
          >
            <ReviewIcon />
            <span>Review</span>
          </button>
          <button
            onClick={() => setHireModalOpen(true)}
            className="flex items-center text-white gap-1.5 p-4 bg-[#111927] hover:bg-[#111927]/90 border border-[#384250] rounded-[12px] cursor-pointer"
          >
            <SendIcon />
            <span>Hire Request</span>
          </button>
        </div>
      </div>
      <ReusableTabs tabs={tabs} initialPath={tabs[0]?.link} />

      <ReviewModal isOpen={open} onClose={() => setOpen(false)} hireId={id} />
      <HireRequestModal
        isHireModalOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />
    </div>
  );
}
