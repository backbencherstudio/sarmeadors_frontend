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

export function ShortTermJobTabs() {
    const tabs = [
        {
            label: "Running (1)",
            link: "/client/client-my-jobs/short-term-job/running",
            // icon: <HiOutlineMenu className="w-5 h-5" />,
        },
        {
            label: "Pending (0) ",
            link: "/client/client-my-jobs/short-term-job/pending",
            // icon: <HiOutlineDocumentText className="w-5 h-5" />,
        },
        {
            label: "Marketplace (1)",
            link: "/client/client-my-jobs/short-term-job/marketplace",
            // icon: <MdSms className="w-5 h-5" />,
        },
        {
            label: "Completed (9)",
            link: "/client/client-my-jobs/short-term-job/completed",
            // icon: <FaTrophy className="w-5 h-5" />,
        },
        {
            label: "Canceled (1)",
            link: "/client/client-my-jobs/short-term-job/canceled",
            // icon: <HiOutlineLockClosed className="w-5 h-5" />,
        },
        {
            label: "Rejected (1)",
            link: "/client/client-my-jobs/short-term-job/rejected",
            // icon: <HiOutlineDocument className="w-5 h-5" />,
        },
    ]


    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}
