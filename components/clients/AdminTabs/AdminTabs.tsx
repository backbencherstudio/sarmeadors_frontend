"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    HiOutlineMenu,
    HiOutlineDocumentText,
    HiOutlineLockClosed,
    HiOutlineCreditCard,
    HiOutlineDocument,
    HiOutlineUserGroup
} from "react-icons/hi"
import { MdSms } from "react-icons/md"
import { FaTrophy } from "react-icons/fa"
import List from "./List/List"
import Notes from "./Notes/Notes"
import EmailAndSms from "./EmailAndSms/EmailAndSms"
import PaymentPage from "./payment/PaymentPage";
import Events from "./Events/Events";
import Password from "./Password/Password";
import Documents from "./Documents/Documents";
import ReusableTabs from "@/components/reusable/ReusableTabs";



export function AdminTabs() {


    const tabs = [
        {
            label: "Lists",
            value: "lists",
            icon: <HiOutlineMenu className="w-5 h-5" />,
            component: <List />
        },
        {
            label: "Notes",
            value: "notes",
            icon: <HiOutlineDocumentText className="w-5 h-5" />,
            component: <Notes />
        },
        {
            label: "Email and SMS",
            value: "email-sms",
            icon: <MdSms className="w-5 h-5" />,
            component: <EmailAndSms />
        },
        {
            label: "Events",
            value: "events",
            icon: <FaTrophy className="w-5 h-5" />,
            component: <Events />
        },
        {
            label: "Password",
            value: "password",
            icon: <HiOutlineLockClosed className="w-5 h-5" />,
            component: <Password />
        },
        {
            label: "Documents",
            value: "documents",
            icon: <HiOutlineDocument className="w-5 h-5" />,
            component: <Documents />
        },
        {
            label: "Payments",
            value: "payments",
            icon: <HiOutlineCreditCard className="w-5 h-5" />,
            component: <PaymentPage />
        },
    ]


    return (
        <div>
            <ReusableTabs tabs={tabs} />
        </div>
    )
}
