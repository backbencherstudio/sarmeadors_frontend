import JobsChart from "@/components/clients/AgencyLongTermJob/JobsChart";
import StatCards from "@/components/dashboard/StatCards";
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import React from "react";

const statCards = [
  {
    title: "Pre Application",
    value: 195,
    percentage: "0.1%",
  },
  {
    title: "Application Started",
    value: 7,
    percentage: "0.8%",
  },
  {
    title: "Applied",
    value: 18,
    percentage: "1.5%",
  },
  {
    title: "Inactive",
    value: 635,
    percentage: "72.6%",
  },
  {
    title: "Initial Payment Made",
    value: 0,
    percentage: "3.2%",
  },
  {
    title: "Consultation Booked",
    value: 0,
    percentage: "3.2%",
  },
  {
    title: "Consultation Complete",
    value: 0,
    percentage: "3.2%",
  },
  {
    title: "Job Posted",
    value: 97,
    percentage: "3.2%",
  },
];

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
    link: "/completed-view-details/invoice-active/applicants",
  },
  {
    label: "Completed Job (1224)",
    link: "/completed-view-details/invoice-active/applicants",
  },
  {
    label: "Canceled Job (223)",
    link: "/completed-view-details/invoice-active/applicants",
  },
];

export default function LongTermJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:p-6 p-4 ">
      <StatCards statCards={statCards} />
      <div className="mt-6">
        <JobsChart />
      </div>
      <ReusableLineTabs tabs={TabsData} />
      {children}
    </div>
  );
}
