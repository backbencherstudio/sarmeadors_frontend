"use client";

import {
    HiOutlineMenu,
    HiOutlineDocumentText,
    HiOutlineLockClosed,
    HiOutlineCreditCard,
    HiOutlineDocument
} from "react-icons/hi"
import { MdSms } from "react-icons/md"
import { FaTrophy } from "react-icons/fa"
import ReusableTabs from "@/components/reusable/ReusableTabs";

export function AdminTabs() {
    const tabs = [
        {
            label: "Lists",
            link: "/clients/admin/list",
            icon: <HiOutlineMenu className="w-5 h-5" />,
        },
        {
            label: "Notes",
            link: "/clients/admin/notes",
            icon: <HiOutlineDocumentText className="w-5 h-5" />,
        },
        {
            label: "Email and SMS",
            link: "/clients/admin/email-sms",
            icon: <MdSms className="w-5 h-5" />,
        },
        {
            label: "Events",
            link: "/clients/admin/events",
            icon: <FaTrophy className="w-5 h-5" />,
        },
        {
            label: "Password",
            link: "/clients/admin/password",
            icon: <HiOutlineLockClosed className="w-5 h-5" />,
        },
        {
            label: "Documents",
            link: "/clients/admin/documents",
            icon: <HiOutlineDocument className="w-5 h-5" />,
        },
        {
            label: "Payments",
            link: "/clients/admin/payments",
            icon: <HiOutlineCreditCard className="w-5 h-5" />,
        },
    ]


    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}
