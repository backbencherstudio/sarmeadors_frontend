import ReusableTabs from "@/components/reusable/ReusableTabs";
import React from "react";

function MyProfileLayout({ children }: { children: React.ReactNode }) {
  const tabs = [
    {
      label: "Personal Information",
      link: "/my-profile/personal-information",
      // icon: <HiOutlineMenu className="w-5 h-5" />,
    },
    {
      label: "Professional Information",
      link: "/my-profile/professional-information",
      // icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      label: "Documents",
      link: "/my-profile/documents",
      // icon: <MdSms className="w-5 h-5" />,
    },
    {
      label: "Additional Information",
      link: "/my-profile/additional-information",
      // icon: <FaTrophy className="w-5 h-5" />,
    },
    {
      label: "Change Password",
      link: "/my-profile/change-password",
      // icon: <FaTrophy className="w-5 h-5" />,
    },
  ];
  return (
    <div className="mt-4 space-y-4 p-4 md:p-6">
      <ReusableTabs tabs={tabs} />
      {children}
    </div>
  );
}

export default MyProfileLayout;
