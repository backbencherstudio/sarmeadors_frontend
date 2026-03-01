"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MyJobTopMenu({ title, id }: { title?: string; id?: string }) {
  const path = usePathname();
  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };
  const activeAdminPath =
    isActive("/clients/admin") ||
    isActive(`/client/client-my-jobs/short-term-job`);
  const activeProfilePath =
    isActive("/clients/profile") ||
    isActive(`/client/client-my-jobs/long-term-job`);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-semibold capitalize leading-[160%]">My Jobs</h1>
          <p className="text-gray-500">
            List of all current clients and their details.
          </p>
        </div>
        <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
          <Plus /> Post a Job
        </button>
      </div>
      <div className="w-full">
        <div className="w-full border-b border-gray-200">
          <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
            <Link
              href={
                title == "clients"
                  ? "/clients/admin/list"
                  : `/client/client-my-jobs/short-term-job/running`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeAdminPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <span>Short-Term Job</span>
            </Link>
            <Link
              href={
                title == "clients"
                  ? "/clients/profile/contact-and-address"
                  : `/client/client-my-jobs/long-term-job`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeProfilePath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <span>Long-Term Job </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyJobTopMenu;
