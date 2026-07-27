import JobsChart from "@/components/clients/AgencyLongTermJob/JobsChart";
import StatCards from "@/components/dashboard/StatCards";
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import React from "react";

const TabsData = [
  {
    label: "Requested Job (12)",
    link: "/agency-long-term-job/agency-requested-job",
  },
  {
    label: "Posted Job (570)",
    link: "/agency-long-term-job/agency-posted-job",
  },
  {
    label: "Running Job (224)",
    link: "/agency-long-term-job/agency-running-job",
  },
  {
    label: "Completed Job (1224)",
    link: "/agency-long-term-job/agency-completed-job",
  },
  {
    label: "Canceled Job (223)",
    link: "/agency-long-term-job/agency-canceled-job",
  },
];

export default function LongTermJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:p-6 p-4 ">
      <StatCards statCards={[]} isLoading={false} />
      <div className="mt-6">
        <JobsChart />
      </div>
      <ReusableLineTabs tabs={TabsData} />
      {children}
    </div>
  );
}
