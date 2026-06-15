"use client";

import { clearBiodataData } from "@/helper/biodataStorage.helper";
import { CookieHelper } from "@/helper/cookie.helper";
import CopyIcon from "@/public/icon/CopyIcon";
import EmailIcon from "@/public/icon/EmailIcon";
import JobsIcon from "@/public/icon/JobsIcon";
import mainLogo from "@/public/icon/mainlogo.png";
import NoteIcon from "@/public/icon/NoteIcon";
import { BriefcaseIcon, ChevronDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import AppliedJobIcon from "../icon/ApplideJobIcon";
import BuilderIcon from "../icon/BuilderIcon";
import CandidateIcon from "../icon/CandidateIcon";
import ClientIcon from "../icon/ClientIcon";
import DashboardIcon from "../icon/DashboardIcon";
import DocumentIcon from "../icon/DocumentIcon";
import InterviewIcon from "../icon/InterviewIcon";
import LogoutIcon from "../icon/LogoutIcon";
import MultiPleUserIcon from "../icon/MultiPleUserIcon";
import MyAvailabilityIcon from "../icon/MyAvailabilityIcon";
import PaymentIcon from "../icon/PaymentIcon";
import SettingIcon from "../icon/SettingIcon";

interface NavItem {
  icon: any;
  label: string;
  href: string;
  type?: "client" | "admin" | "candidate" | "super-admin";
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Template sub-items
const templateSubItems = [
  {
    label: "Email Template",
    icons: <EmailIcon />,
    href: "/templates/email-template",
  },
  {
    label: "Document Template",
    icons: <DocumentIcon />,
    href: "/templates/document-template",
  },
  {
    label: "Application  Builder",
    icons: <BuilderIcon />,
    href: "/templates/application-builder",
  },
  {
    label: "Note Template",
    icons: <NoteIcon />,
    href: "/templates/note",
  },
];

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/super-admin/dashboard",
    type: "super-admin",
  },
  {
    label: "Agencies",
    icon: BriefcaseIcon,
    href: "/super-admin/agencies",
    type: "super-admin",
  },
  {
    icon: ClientIcon,
    label: "Clients",
    href: "/clients/admin/list",
    type: "admin",
  },
  {
    icon: CandidateIcon,
    label: "Candidates",
    href: "/candidates",
    type: "admin",
  },
  {
    icon: InterviewIcon,
    label: "Interviews",
    href: "/interviews",
    type: "admin",
  },
  {
    icon: JobsIcon,
    label: "Short-term Job",
    href: "/agency-short-term-job",
    type: "admin",
  },
  {
    icon: JobsIcon,
    label: "Long-term Job",
    href: "/agency-long-term-job/agency-requested-job",
    type: "admin",
  },
  {
    icon: CopyIcon,
    label: "Templates",
    href: "/templates",
    type: "admin",
  },
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/client/dashboard",
    type: "client",
  },
  {
    label: "My Jobs",
    icon: JobsIcon,
    href: "/client/client-my-jobs/short-term-job",
    type: "client",
  },
  {
    label: "My Candidates",
    icon: CandidateIcon,
    href: "/client/client-my-candidates",
    type: "client",
  },
  {
    label: "Interviews",
    icon: InterviewIcon,
    href: "/client/client-interviews/calendar",
    type: "client",
  },
  {
    label: "Documents",
    icon: DocumentIcon,
    href: "/client/client-documents",
    type: "client",
  },
  {
    label: "Payments",
    icon: PaymentIcon,
    href: "/client/client-payments/payment",
    type: "client",
  },
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/candidate/dashboard",
    type: "candidate",
  },
  {
    label: "My Jobs",
    icon: JobsIcon,
    href: "/candidate/candidate-my-jobs",
    type: "candidate",
  },
  {
    label: "Interviews",
    icon: InterviewIcon,
    href: "/candidate/candidate-interviews",
    type: "candidate",
  },
  {
    label: "Applied Job",
    icon: AppliedJobIcon,
    href: "/candidate/candidate-applied-job",
    type: "candidate",
  },
  {
    label: "My Clients",
    icon: MultiPleUserIcon,
    href: "/candidate/my-clients",
    type: "candidate",
  },
  {
    label: "My Availability",
    icon: MyAvailabilityIcon,
    href: "/candidate/my-availability",
    type: "candidate",
  },
  {
    label: "Documents",
    icon: DocumentIcon,
    href: "/candidate/candidate-documents",
    type: "candidate",
  },
];

const otherItems = [
  // {
  //   icon: PaymentIcon,
  //   label: "Billing",
  //   href: "/dashboard/billing",
  // },
  // {
  //   icon: SupportIcon,
  //   label: "Help & Support",
  //   href: "/dashboard/help-support",
  // },
  {
    icon: SettingIcon,
    label: "Settings",
    href: "/settings/agency-details",
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState("admin");

  const [templatesOpen, setTemplatesOpen] = useState<boolean>(() =>
    pathname.startsWith("/templates"),
  );

  const mainItems = navItems.filter((item) => item.type === isLoggedIn);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(stored || "admin");
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/templates")) {
      setTemplatesOpen(true);
    }
  }, [pathname]);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    CookieHelper.destroy({ key: "jobtoken" });
    clearBiodataData();
    router.push("/login");
  };

  return (
    <div className="h-screen">
      <div
        className={`
          h-full flex flex-col 
          min-h-[calc(100vh-100px)]
          bg-grayColor1
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          p-5 overflow-y-auto transition-all duration-300
          ${isCollapsed ? "xl:w-20" : "w-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={"/"}
            className={`text-white flex items-center transition-all duration-300 ${
              isCollapsed ? "xl:justify-center hidden xl:w-full" : ""
            }`}
          >
            <Image
              src={mainLogo}
              alt="main logo"
              width={118}
              height={29}
              className={`transition-all duration-300 ${
                isCollapsed ? "xl:w-8 xl:h-8" : "w-20 md:w-[100px]"
              }`}
            />
          </Link>

          <button
            onClick={() => {
              if (window.innerWidth >= 1280) {
                onToggleCollapse?.();
              } else {
                onClose();
              }
            }}
            className="flex items-center cursor-pointer justify-center w-8 h-8 rounded-lg transition-all duration-200"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            
          >
            <span className="xl:hidden">
              <X className="text-blackColor" size={20} />
            </span>
            <span className="hidden xl:block">
              {isCollapsed ? (
                <RiArrowRightDoubleFill className="text-blackColor" size={20} />
              ) : (
                <RiArrowLeftDoubleFill className="text-blackColor" size={20} />
              )}
            </span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <div className="space-y-2">
            {mainItems.map((item, idx) => {
              const active = isActive(item.href);
              const isTemplates = item.label === "Templates";
              if (isTemplates) {
                return (
                  <div key={idx}>
                    {/* Templates trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isCollapsed) {
                          setTemplatesOpen((p) => !p);
                        }
                      }}
                      className={`
                        w-full flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg
                        hover:bg-white text-blackColor cursor-pointer transition-all duration-200
                        ${active || templatesOpen ? "bg-white" : ""}
                        ${isCollapsed ? "xl:justify-center" : "justify-between"}
                      `}
                      title={isCollapsed ? item.label : ""}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                          <item.icon
                            className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${
                              active || templatesOpen ? "opacity-100" : ""
                            }`}
                          />
                        </div>
                        <span
                          className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap  ${
                            isCollapsed ? "xl:hidden" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Chevron — hidden when collapsed */}
                      {!isCollapsed && (
                        <span className="text-gray-400">
                          {templatesOpen ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </span>
                      )}
                    </button>

                    {/* Sub-items */}
                    {templatesOpen && !isCollapsed && (
                      <div className="mt-1 space-y-0.5 bg-white p-3 rounded-[8px]">
                        {templateSubItems.map((sub) => {
                          const subActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className={`
                                flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm
                                transition-all duration-200
                                ${
                                  subActive
                                    ? "bg-blackColor text-white font-medium"
                                    : "text-descriptionColor hover:bg-white hover:text-blackColor"
                                }
                              `}
                            >
                              <span className="w-4 h-4 flex-shrink-0 opacity-70 text-xs">
                                {sub.icons}
                              </span>
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg
                    hover:text-whiteColor hover:bg-white text-blackColor transition-all duration-200
                    ${active ? "bg-white opacity-100 text-blackColor" : ""}
                    ${isCollapsed ? "xl:justify-center" : "justify-start"}
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                      <item.icon
                        className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${
                          active ? "opacity-100" : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${
                        isCollapsed ? "xl:hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Other Section */}
        {isLoggedIn === "admin" && (
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2 mb-2">
              Other
            </p>
            <div className="space-y-2">
              {otherItems.map((item, idx) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg
                      hover:text-whiteColor hover:bg-white text-blackColor transition-all duration-200
                      ${active ? "bg-white opacity-100 text-blackColor" : ""}
                      ${isCollapsed ? "xl:justify-center" : "justify-start"}
                    `}
                    title={isCollapsed ? item.label : ""}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-[30px] h-[30px] group flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                        <item.icon
                          className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${
                            active ? "opacity-100" : ""
                          }`}
                        />
                      </div>
                      <span
                        className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${
                          isCollapsed ? "xl:hidden" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className={`
              flex items-center hover:bg-white cursor-pointer gap-3 px-3 py-3
              w-full rounded-lg transition-all duration-200
              ${isCollapsed ? "xl:justify-center" : ""}
            `}
            title={isCollapsed ? "Log Out Account" : ""}
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0">
              <LogoutIcon />
            </div>
            <span
              className={`text-base font-normal whitespace-nowrap ${
                isCollapsed ? "xl:hidden" : ""
              }`}
            >
              Log Out Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
