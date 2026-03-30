"use client";
import CalenderIcon from "@/components/icon/CalenderIcon";
import ListViewIcon from "@/components/icon/ListViewIcon";
import LinkReuseable from "@/components/reusable/CustomLink";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ShortTermJobMenu({
  ShortTermJobs,
}: {
  ShortTermJobs?: boolean;
}) {
  const pathName = usePathname();

  const isActive = (href: string): boolean => {
    return pathName === href;
  };

  const menuItems = [
    {
      title: "Calendar",
      href: ShortTermJobs ? "/agency-short-term-job" : "/agency-short-term-job",
      icon: <CalenderIcon />,
    },
    {
      title: "List View",
      href: ShortTermJobs
        ? "/agency-short-term-job/view-list/running"
        : "/agency-short-term-job/view-list/running",
      icon: <ListViewIcon />,
    },
  ];
  return (
    <div className=" flex justify-between gap-3 items-center">
      <h2 className="md:text-xl text-lg font-semibold ">
        {ShortTermJobs ? "Short-term Job" : "Short-term Job"}
      </h2>
      <div className="flex items-center gap-2">
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
        <div>
          <button className="px-4 py-3 bg-[#111927] hover:bg-[#111927]/90 text-white flex items-center rounded-[8px] text-nowrap font-semibold cursor-pointer">
            <Plus />
            <span>Post a job</span>
          </button>
        </div>
      </div>
    </div>
  );
}
