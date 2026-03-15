"use client";
import ClockICon from "@/components/icon/ClockICon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import LinkReuseable from "@/components/reusable/CustomLink";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();
  const isActive = (href: string): boolean => {
    return pathName === href;
  };
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
      <div className=" mt-2 flex items-center  border-b border-borderColor">
        {candidateJobMenus.map((menu) => (
          <LinkReuseable
            key={menu.id}
            href={menu.href}
            title={menu.title}
            className={`text-base font-medium hover:text-headerColor  pb-2 px-3 ${isActive(menu.href) ? "text-headerColor transition-all duration-200   border-b border-headerColor" : "text-lightblackColor"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CandidateSingleJobsMenus;
