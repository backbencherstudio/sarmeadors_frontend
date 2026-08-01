"use client";

import ReusableTabs from "@/components/reusable/ReusableTabs";
import { useParams } from "next/navigation";
import { use } from "react";
import { FaTrophy } from "react-icons/fa";
import {
  HiOutlineCreditCard,
  HiOutlineDocument,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineMenu,
} from "react-icons/hi";
import { MdSms } from "react-icons/md";

export function AdminTabs() {
  const params = useParams()
  console.log(params);
  
  const tabs = [
    {
      label: "Lists",
      link: `/clients/${params.id}/admin/list`,
      icon: <HiOutlineMenu className="w-5 h-5" />,
    },
    {
      label: "Notes",
      link: `/clients/${params.id}/admin/notes`,
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      label: "Email and SMS",
      link: `/clients/${params.id}/admin/email-sms`,
      icon: <MdSms className="w-5 h-5" />,
    },
    {
      label: "Events",
      link: `/clients/${params.id}/admin/events`,
      icon: <FaTrophy className="w-5 h-5" />,
    },
    {
      label: "Password",
      link: `/clients/${params.id}/admin/password`,
      icon: <HiOutlineLockClosed className="w-5 h-5" />,
    },
    {
      label: "Documents",
      link: `/clients/${params.id}/admin/documents`,
      icon: <HiOutlineDocument className="w-5 h-5" />,
    },
    {
      label: "Payments",
      link: `/clients/${params.id}/admin/payments`,
      icon: <HiOutlineCreditCard className="w-5 h-5" />,
    },
  ];

  return (
    <div>
      <ReusableTabs tabs={tabs} initialPath={""} />
    </div>
  );
}
