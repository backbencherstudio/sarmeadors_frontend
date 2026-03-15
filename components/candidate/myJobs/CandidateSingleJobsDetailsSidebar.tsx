"use client";
import LinkReuseable from "@/components/reusable/CustomLink";
import { usePathname } from "next/navigation";

function CandidateSingleJobsDetailsSidebar() {
  const jobDetailsSidebar = [
    {
      id: 1,
      title: "Booking Details",
      href: "/candidate/candidate-job-details/1/job-details",
    },
    {
      id: 2,
      title: "Requirements",
      href: "/candidate/candidate-job-details/1/job-details/requirements",
    },
    {
      id: 3,
      title: "Additional Information",
      href: "/candidate/candidate-job-details/1/job-details/additional-information",
    },
  ];
  const pathName = usePathname();
  const isActive = (href: string): boolean => {
    return pathName === href;
  };
  return (
    <div className="flex flex-col w-[200px]!   items-start  bg-grayColor1 border-r border-borderColor  p-4  lg:max-w-[200px]">
      {jobDetailsSidebar.map((item) => (
        <div key={item.id} className="mb-4 ">
          <LinkReuseable
            href={item.href}
            title={item.title}
            className={`text-sm font-medium hover:pl-2 transition-all duration-200 bg-grayColor1 mb-2 ${isActive(item.href) ? "text-headerColor font-medium  pl-2" : "text-secondaryColor"}`}
          />
        </div>
      ))}
    </div>
  );
}

export default CandidateSingleJobsDetailsSidebar;
