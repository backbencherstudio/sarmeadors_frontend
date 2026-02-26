"use client";

import ReusableTabs from "@/components/reusable/ReusableTabs";

export function CandidatesDetailsTab() {
  const tabs = [
    {
      label: "Personal Information",
      link: "/client/client-my-candidates/new-candidates/1/personal-information",
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
    // {
    //     label: "Payments",
    //     link: "/clients/admin/payments",
    //     icon: <HiOutlineCreditCard className="w-5 h-5" />,
    // },
  ];

  return (
    <div>
      <ReusableTabs tabs={tabs} />
    </div>
  );
}
