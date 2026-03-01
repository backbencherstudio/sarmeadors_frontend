"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function MyCandidatesTopMenu({ title, id }: { title?: string; id?: string }) {
  const path = usePathname();
  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };
  const activeAdminPath =
    isActive("/clients/admin") ||
    isActive(`/client/client-my-candidates/new-candidates`);
  const activeProfilePath =
    isActive("/clients/profile") ||
    isActive(`/client/client-my-candidates/previous-candidates`);
  return (
    <div>
      <div className="">
        <h1 className="font-semibold capitalize leading-[160%]">
          My Candidates
        </h1>
      </div>
      <div className="w-full">
        <div className="w-full border-b border-gray-200">
          <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
            <Link
              href={
                title == "clients"
                  ? "/clients/admin/list"
                  : `/client/client-my-candidates/new-candidates`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeAdminPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <span>New Candidates</span>
            </Link>
            <Link
              href={
                title == "clients"
                  ? "/clients/profile/contact-and-address"
                  : `/client/client-my-candidates/previous-candidates`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeProfilePath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <span>Previous Candidates</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCandidatesTopMenu;
