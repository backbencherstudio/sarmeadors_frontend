"use client";

import ReusableTabs from "@/components/reusable/ReusableTabs";

export function ShortTermJobTabs() {
<<<<<<< HEAD
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
    // {
    //     label: "Payments",
    //     link: "/clients/admin/payments",
    //     icon: <HiOutlineCreditCard className="w-5 h-5" />,
    // },
  ];
=======
    const tabs = [
        {
            label: "Running (1)",
            link: "/client/client-my-jobs/long-term-job/running",
        },
        {
            label: "Pending (0) ",
            link: "/client/client-my-jobs/long-term-job/pending",
        },
        {
            label: "Marketplace (1)",
            link: "/client/client-my-jobs/long-term-job/marketplace",
        },
        {
            label: "Completed (9)",
            link: "/client/client-my-jobs/long-term-job/completed",
        },
        {
            label: "Canceled (1)",
            link: "/client/client-my-jobs/long-term-job/canceled",
        },
        {
            label: "Rejected (1)",
            link: "/client/client-my-jobs/long-term-job/rejected",
        },
    ]
>>>>>>> d4287e6794e39bd38cc028458c8cbd74e1fbe306

  return (
    <div>
      <ReusableTabs tabs={tabs} />
    </div>
  );
}
