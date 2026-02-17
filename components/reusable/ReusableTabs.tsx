"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReusableTabs({
  tabs,
}: {
  tabs: { label: string; link: string; icon?: React.ReactNode }[];
}) {
  const path = usePathname();
  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-5xl justify-between bg-transparent border border-gray-200 p-1 h-auto gap-0 rounded-lg w-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <Link
              key={tab.link}
              href={tab.link}
              className={`flex items-center justify-center w-full gap-2 px-3 py-2 lg:px-4 lg:py-3 rounded-lg text-sm lg:text-base border-0 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal cursor-pointer  ${isActive(tab.link) ? "bg-[#111927] text-white" : ""} `}
            >
              {tab?.icon}
              <span>{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
