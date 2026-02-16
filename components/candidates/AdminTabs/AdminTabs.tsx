import Documents from "@/components/clients/AdminTabs/Documents/Documents";
import EmailAndSms from "@/components/clients/AdminTabs/EmailAndSms/EmailAndSms";
import Events from "@/components/clients/AdminTabs/Events/Events";
import List from "@/components/clients/AdminTabs/List/List";
import Notes from "@/components/clients/AdminTabs/Notes/Notes";
import Password from "@/components/clients/AdminTabs/Password/Password";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import { FaTrophy } from "react-icons/fa6";
import {
  HiOutlineDocument,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineMenu,
} from "react-icons/hi";
import { MdSms } from "react-icons/md";

export default function AdminTabs() {
  const tabs = [
    {
      label: "Lists",
      value: "lists",
      icon: <HiOutlineMenu className="w-5 h-5" />,
      component: <List />,
    },
    {
      label: "Notes",
      value: "notes",
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
      component: <Notes />,
    },
    {
      label: "Email and SMS",
      value: "email-sms",
      icon: <MdSms className="w-5 h-5" />,
      component: <EmailAndSms />,
    },
    {
      label: "Events",
      value: "events",
      icon: <FaTrophy className="w-5 h-5" />,
      component: <Events />,
    },
    {
      label: "Password",
      value: "password",
      icon: <HiOutlineLockClosed className="w-5 h-5" />,
      component: <Password />,
    },
    {
      label: "Documents",
      value: "documents",
      icon: <HiOutlineDocument className="w-5 h-5" />,
      component: <Documents />,
    },
  ];
  return (
    <div>
      <ReusableTabs tabs={tabs} />
    </div>
  );
}
