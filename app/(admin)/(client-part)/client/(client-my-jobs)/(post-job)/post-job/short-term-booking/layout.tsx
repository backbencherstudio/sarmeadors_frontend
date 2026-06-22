import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const TabsData = [
    {
      label: "Job-Details",
      link: "/client/post-job/short-term-booking/job-details",
    },
    {
      label: "Booking Date And Time",
      link: "/client/post-job/short-term-booking/booking-date-and-time",
    },
    {
      label: "Job Address",
      link: "/client/post-job/short-term-booking/job-address",
    },
    {
      label: "Set Budget",
      link: "/client/post-job/short-term-booking/set-budget",
    },
  ];
  return (
    <div className="mt-5">
      <ReusableLineTabs
        tabs={TabsData}
        currentPath="/client/client-my-jobs/short-term-job"
      />
      <div>{children}</div>
    </div>
  );
}
