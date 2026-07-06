import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import { Edit } from "lucide-react";

export default function PendingViewDetailsLayout({ children }) {
  const TabsData = [
    {
      label: "Job Description",
      link: "/client/pending-view-details/job-description",
    },
    // {
    //   label: "Applicants (0)",
    //   link: "/client/pending-view-details/applicants",
    // },
  ];
  return (
    <div className="p-6">
      {/* Job Details */}
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-semibold capitalize leading-[160%]">
            Job Details
          </h1>
        </div>
        <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
          <Edit /> Edit Job
        </button>
      </div>
      {/* Reusable Line Tabs */}
      <ReusableLineTabs tabs={TabsData} />
      {/* Children */}
      <div className="pt-5">{children}</div>
    </div>
  );
}
