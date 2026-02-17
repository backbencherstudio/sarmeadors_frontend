import ReusableTabs from "@/components/reusable/ReusableTabs";
import { FaTrophy } from "react-icons/fa6";
import {
  HiOutlineDocument,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineMenu,
} from "react-icons/hi";
import { MdSms } from "react-icons/md";

export default async function CandidatesAdminTabs({ id }) {
  const tabs = [
    {
      label: "Lists",
      value: "lists",
      link: `/candidates/${id}/admin/list`,
      icon: <HiOutlineMenu className="w-5 h-5" />,
    },
    {
      label: "Notes",
      value: "notes",
      link: `/candidates/${id}/admin/notes`,
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      label: "Email and SMS",
      value: "email-sms",
      link: `/candidates/${id}/admin/email-sms`,
      icon: <MdSms className="w-5 h-5" />,
    },
    {
      label: "Events",
      value: "events",
      link: `/candidates/${id}/admin/events`,
      icon: <FaTrophy className="w-5 h-5" />,
    },
    {
      label: "Password",
      value: "password",
      link: `/candidates/${id}/admin/password`,
      icon: <HiOutlineLockClosed className="w-5 h-5" />,
    },
    {
      label: "Documents",
      value: "documents",
      link: `/candidates/${id}/admin/documents`,
      icon: <HiOutlineDocument className="w-5 h-5" />,
    },
  ];
  return (
    <div>
      <ReusableTabs tabs={tabs} />
    </div>
  );
}
