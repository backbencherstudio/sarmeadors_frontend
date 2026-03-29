import ReusableJobTypeHeader from "@/components/reusable/ReusableJobTypeHeader";
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";

export default function PendingViewDetailsLayout({ children }) {
  const TabsData = [
    {
      label: "Attendance Calendar",
      link: "/client/running-view-details/attendance-calendar",
    },
    {
      label: "Job Description",
      link: "/client/running-view-details/job-description",
    },
    {
      label: "Candidate Profile",
      link: "/client/running-view-details/candidate-profile/personal-information",
    },
    { label: "Message(13)", link: "/client/running-view-details/message" },
  ];

  return (
    <div className="p-6">
      {/* Job Details */}
      <ReusableJobTypeHeader />
      {/* Reusable Line Tabs */}
      <ReusableLineTabs tabs={TabsData} />
      {/* Children */}
      <div className="pt-5">{children}</div>
    </div>
  );
}
