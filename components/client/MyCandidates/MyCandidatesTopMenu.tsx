"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function MyCandidatesTopMenu({ title, id }: { title?: string; id?: string }) {
  const path = usePathname();

  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };

  const menuItems = [
    {
      label: "New Candidates",
      clientHref: "/clients/admin/list",
      nonClientHref: "/client/client-my-candidates/new-candidates",
    },
    {
      label: "Previous Candidates",
      clientHref: "/clients/profile/contact-and-address",
      nonClientHref: "/client/client-my-candidates/previous-candidates",
    },
  ];

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
            {menuItems.map((item, index) => {
              const href =
                title === "clients" ? item.clientHref : item.nonClientHref;
              const active = isActive(href);

              return (
                <Link
                  key={index}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${
                    active
                      ? "border-gray-800 text-gray-900 font-semibold"
                      : "border-transparent text-gray-700"
                  } hover:text-gray-900 cursor-pointer`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCandidatesTopMenu;
