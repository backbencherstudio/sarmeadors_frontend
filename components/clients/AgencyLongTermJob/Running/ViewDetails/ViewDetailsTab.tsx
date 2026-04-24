"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import ReusableLineTabs from "@/components/reusable/ReusableLineTabs";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { useRouter } from "next/navigation";

export default function ViewDetailsTab() {
  const router = useRouter();

  const TabsData = [
   {
      label: "Attendance Calendar",
      link: "/view-job-details/attendance-calendar",
    },
    {
      label: "Job Description",
      link: "/view-job-details/job-description",
    },
    {
      label: "Candidate Profile",
      link: "/view-job-details/candidate-profile/personal-information",
    },
    {
      label: "Message(13)",
      link: "/view-job-details/message",
    },
  ];
  return (
    <div>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="cursor-pointer text-[#111927] font-bold"
          >
            <ArrowLeftIcon className="inline-block mr-2" />
            <span>Job Details</span>
          </button>
          <ButtonReuseable title="Publish This job" />
        </div>
      </div>
      <div>
        <ReusableLineTabs tabs={TabsData} />
      </div>
    </div>
  );
}
