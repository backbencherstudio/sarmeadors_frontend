"use client";

import ReusableTabs from "@/components/reusable/ReusableTabs";

export function ShortTermJobTabs() {
  const tabs = [
    {
      label: "Running (1)",
      link: "/client/client-my-jobs/short-term-job/running",
    },
    {
      label: "Pending (0) ",
      link: "/client/client-my-jobs/short-term-job/pending",
    },
    {
      label: "Marketplace (1)",
      link: "/client/client-my-jobs/short-term-job/marketplace",
    },
    {
      label: "Completed (9)",
      link: "/client/client-my-jobs/short-term-job/completed",
    },
    {
      label: "Canceled (1)",
      link: "/client/client-my-jobs/short-term-job/canceled",
    },
    {
      label: "Rejected (1)",
      link: "/client/client-my-jobs/short-term-job/rejected",
    },
  ];

  return (
    <div>
      <ReusableTabs
        tabs={tabs}
        initialPath={"/client/client-my-jobs/short-term-job"}
      />
    </div>
  );
}
