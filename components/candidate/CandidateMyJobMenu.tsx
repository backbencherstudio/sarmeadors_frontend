"use client";

import { usePathname } from "next/navigation";
import CalenderIcon from "../icon/CalenderIcon";
import ListViewIcon from "../icon/ListViewIcon";
import LinkReuseable from "../reusable/CustomLink";

function CandidateMyJobMenu({ myInterviews }: { myInterviews?: boolean }) {
  const pathName = usePathname();

  const isActive = (href: string): boolean => {
    return pathName === href;
  };

  const menuItems = [
    {
      title: "Calendar",
      href: myInterviews
        ? "/candidate/candidate-interviews"
        : "/candidate/candidate-my-jobs",
      icon: <CalenderIcon />,
    },
    {
      title: "List View",
      href: myInterviews
        ? "/candidate/candidate-interviews/view-list"
        : "/candidate/candidate-my-jobs/view-list",
      icon: <ListViewIcon />,
    },
  ];

  return (
    <div className=" flex justify-between gap-3 items-center">
      <h2 className="md:text-xl text-lg font-semibold ">
        {myInterviews ? "Interviews" : "My Jobs"}
      </h2>
      <div className="grid grid-cols-2 max-w-[220px] border border-borderColor  w-full p-1 gap-1 items-center rounded-sm bg-transparent ">
        {menuItems.map((item) => (
          <LinkReuseable
            key={item.href}
            icon={item.icon}
            title={item.title}
            href={item.href}
            className={`lg:px-2.5 !h-9.5 hover:bg-grayColor1 border border-transparent hover:border duration-200 cursor-pointer rounded-sm text-[13px] md:text-sm font-semibold transition ${
              isActive(item.href)
                ? "bg-grayColor1 border border-transparent"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CandidateMyJobMenu;
