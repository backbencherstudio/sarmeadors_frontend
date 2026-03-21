"use client";
import ResuableMenu from "@/components/common/ResuableMenu";
import ClockICon from "@/components/icon/ClockICon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";

function CandidateSingleJobsMenus() {
  const candidateJobMenus = [
    {
      id: 1,
      title: "Attendance Calendar",
      href: "/candidate/candidate-job-details/1/attendance-calendar",
    },
    {
      id: 2,
      title: "Job Details",
      href: "/candidate/candidate-job-details/1/job-details",
    },
    {
      id: 3,
      title: "Messages",
      href: "/candidate/candidate-job-details/1/messages",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <LinkReuseable
          href={`/candidate/candidate-my-jobs`}
          title=" Job details"
          icon={<ArrowLeftIcon className="w-3 h-3" />}
          className="text-xl font-semibold text-blackColor"
        />
        <ButtonReuseable title="Check In" icon={<ClockICon />} />
      </div>
      <div>
        <ResuableMenu
          initialPath="/candidate/candidate-job-details/1/attendance-calendar"
          menuData={candidateJobMenus}
        />
      </div>
    </div>
  );
}

export default CandidateSingleJobsMenus;
