"use client";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import EmailAndSMSIcon from "@/public/icon/EmailAndSMSIcon";
import JobsIcon from "@/public/icon/JobsIcon";
import ListIcon from "@/public/icon/ListIcon";
import MoreIcon from "@/public/icon/MoreIcon";
import UserIcon from "@/public/icon/UserIcon";
import UserSettingsIcon from "@/public/icon/UserSettingsIcon";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminTopMenu({ title, id }: { title?: string; id?: string }) {
  const moreMenuItems = [
    {
      href:
        title == "clients"
          ? "/clients/more/jobs"
          : `/candidates/${id}/more/jobs`,
      label: "Jobs",
      icon: JobsIcon,
    },
    {
      href:
        title == "clients"
          ? "/clients/more/email_sms_log"
          : `/candidates/${id}/more/email_sms_log`,
      label: "Email/SMS Log",
      icon: EmailAndSMSIcon,
    },
    {
      href:
        title == "clients"
          ? "/clients/more/records/reviews"
          : `/candidates/${id}/more/reviews`,
      label: "Records",
      icon: ListIcon,
    },
  ];

  const path = usePathname();
  const isActive = (href: string) => {
    if (!path) return false;
    return path === href || path.startsWith(`${href}/`);
  };
  const activeAdminPath =
    isActive("/clients/admin") || isActive(`/candidates/${id}/admin`);
  const activeProfilePath =
    isActive("/clients/profile") || isActive(`/candidates/${id}/profile`);
  const activeMorePath = moreMenuItems.some((item) => isActive(item.href));
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <ArrowLeftIcon />
          <h1 className="font-semibold capitalize leading-[160%]">
            {title} details
          </h1>
        </div>
        <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
          <Settings /> Setting
        </button>
      </div>
      <div className="w-full">
        <div className="w-full border-b border-gray-200">
          <div className="bg-transparent h-auto p-0 gap-5 rounded-none flex justify-start items-center whitespace-nowrap">
            <Link
              href={
                title == "clients"
                  ? "/clients/admin/list"
                  : `/candidates/${id}/admin/list`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeAdminPath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <UserSettingsIcon />
              <span>Admin</span>
            </Link>
            <Link
              href={
                title == "clients"
                  ? "/clients/profile/contact-and-address"
                  : `/candidates/${id}/profile/my-profile`
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-none border-b-2 ${activeProfilePath ? "border-gray-800 text-gray-900 font-semibold" : "border-transparent text-gray-700"} hover:text-gray-900 cursor-pointer`}
            >
              <UserIcon />
              <span>Profile</span>
            </Link>
            <div>
              <Select>
                <SelectTrigger
                  className={`flex items-center gap-2 px-4 py-6 rounded-none ${
                    activeMorePath
                      ? "border-x-0 border-t-0 border-b-2 border-gray-800 font-semibold"
                      : "border-transparent"
                  } cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0  shadow-none`}
                >
                  <MoreIcon />
                  <span className="text-[#111927]">More</span>
                </SelectTrigger>

                <SelectContent className="space-y-1 p-1.5">
                  {moreMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm cursor-pointer ${
                          isActive(item.href)
                            ? "bg-[#111927] text-white"
                            : "text-[#111927] hover:bg-gray-100"
                        }`}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTopMenu;
