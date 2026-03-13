"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { clearBiodataData } from "@/helper/biodataStorage.helper";
import { CookieHelper } from "@/helper/cookie.helper";
import JobsIcon from "@/public/icon/JobsIcon";
import mainLogo from "@/public/icon/mainlogo.png";
import MoreIcon from "@/public/icon/MoreIcon";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import CalenderIcon from "../icon/CalenderIcon";
import CandidateIcon from "../icon/CandidateIcon";
import ClientIcon from "../icon/ClientIcon";
import DashboardIcon from "../icon/DashboardIcon";
import DocumentIcon from "../icon/DocumentIcon";
import InterviewIcon from "../icon/InterviewIcon";
import LogoutIcon from "../icon/LogoutIcon";
import PaymentIcon from "../icon/PaymentIcon";
import PlatFormIcon from "../icon/PlatFormIcon";
import SettingIcon from "../icon/SettingIcon";
import SupportIcon from "../icon/SupportIcon";

interface NavItem {
  icon: any;
  label: string;
  href: string;
  type?: "client" | "admin" | "candidate";
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems: NavItem[] = [
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
    icon: CalenderIcon,
    label: "Shift Job calendar",
    href: "/dashboard/shift-job-calendar",
    type: "admin",
  },
  {
    icon: JobsIcon,
    label: "Placement Jobs",
    href: "/dashboard/placement-jobs",
    type: "admin",
  },
  {
    icon: PlatFormIcon,
    label: "Platform settings",
    href: "/dashboard/platform-settings",
    type: "admin",
  },
  {
    icon: MoreIcon,
    label: "More",
    href: "/dashboard/more",
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
    href: "/client/client-my-jobs/short-term-job/running",
    type: "client",
  },
  {
    label: "My Candidates",
    icon: CandidateIcon,
    href: "/client/client-my-candidates/new-candidates",
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
    label: "My Candidates",
    icon: CandidateIcon,
    href: "/candidate/candidate-my-candidates/new-candidates",
    type: "candidate",
  },
  {
    label: "Interviews",
    icon: InterviewIcon,
    href: "/candidate/candidate-interviews/calendar",
    type: "candidate",
  },
  {
    label: "Documents",
    icon: DocumentIcon,
    href: "/candidate/candidate-documents",
    type: "candidate",
  },
  {
    label: "Payments",
    icon: PaymentIcon,
    href: "/candidate/candidate-payments/payment",
    type: "candidate",
  },
];

const moreItems = [
  {
    // icon: PaymentIcon,
    label: "Templates",
    href: "/dashboard/billing",
  },
  {
    // icon: SupportIcon,
    label: "Settings",
    href: "/dashboard/help-support",
  },
  {
    // icon: SettingIcon,
    label: "Application Builder",
    href: "/dashboard/application-builder?step=configuration",
  },
  {
    // icon: SettingIcon,
    label: "Records",
    href: "/dashboard/settings",
  },
  {
    // icon: SettingIcon,
    label: "Sub menu",
    href: "/dashboard/settings",
  },
];

const otherItems = [
  {
    icon: PaymentIcon,
    label: "Billing",
    href: "/dashboard/billing",
  },
  {
    icon: SupportIcon,
    label: "Help & Support",
    href: "/dashboard/help-support",
  },
  {
    icon: SettingIcon,
    label: "Settings",
    href: "/dashboard/settings",
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
  const [moreOpen, setMoreOpen] = useState<boolean>(() =>
    moreItems.some((m) => pathname.startsWith(m.href)),
  );
  const [isLoggedIn, setIsLoggedIn] = useState("admin");
  const mainItems = navItems.filter((item) => item.type === isLoggedIn);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedIn || "admin");
  }, [pathname]);

  console.log("login type", isLoggedIn);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
  const handleLogout = () => {
    CookieHelper.destroy({ key: "jobtoken" });
    clearBiodataData();
    router.push("/login");
  };
  return (
    <div className="h-screen  ">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          ${isOpen
            ? "z-50 h-full overflow-hidden absolute top-0 left-0"
            : "h-full"
          }
          flex flex-col
          min-h-[calc(100vh-100px)] 
          bg-grayColor1 
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          p-5 overflow-y-auto transition-all duration-300
          ${isCollapsed ? "xl:w-20" : "w-full"}
        `}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={"/"}
            className={`text-white flex items-center transition-all duration-300 ${isCollapsed ? "xl:justify-center hidden xl:w-full" : ""
              }`}
          >
            <Image
              src={mainLogo}
              alt="main logo"
              width={118}
              height={29}
              className={`transition-all duration-300 ${isCollapsed ? "xl:w-8 xl:h-8 " : "w-20 md:w-[100px]"
                }`}
            />
          </Link>

          {/* Toggle button - visible on desktop, close button on mobile */}
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

        {/* Navigation Section */}
        <div className="flex-1">
          <div className="space-y-2">
            {mainItems.map((item, idx) => {
              const active = isActive(item.href);
              const isMore = item.label === "More";
              if (isMore) {
                // Collapsed: simple link, no accordion
                if (isCollapsed) {
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        w-full flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                        hover:text-whiteColor hover:bg-whiteColor text-blackColor transition-all duration-200
                        ${active ? "bg-white opacity-100 text-blackColor" : ""}
                        ${isCollapsed ? "xl:justify-center" : "justify-start"}
                      `}
                      title={item.label}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                          <item.icon
                            className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${active ? "opacity-100" : ""
                              }`}
                          />
                        </div>
                        <span
                          className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${isCollapsed ? "xl:hidden" : ""
                            }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  );
                }
                // Expanded: accordion submenu
                return (
                  <Collapsible
                    key={idx}
                    open={moreOpen}
                    onOpenChange={(o) => setMoreOpen(o)}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        type="button"
                        className={`
                          w-full flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                          hover:text-whiteColor hover:bg-whiteColor text-blackColor transition-all duration-200
                          ${isCollapsed
                            ? "xl:justify-center"
                            : "justify-between"
                          }
                        `}
                        title={item.label}
                        aria-expanded={moreOpen}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                            <item.icon
                              className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${active ? "opacity-100" : ""
                                }`}
                            />
                          </div>
                          <span
                            className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${isCollapsed ? "xl:hidden" : ""
                              }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight
                          className={`transition-transform duration-200 ${moreOpen ? "rotate-90" : ""
                            }`}
                          size={18}
                        />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent pb-0">
                      <div className="space-y-1 mt-1">
                        {moreItems.map((sub, sidx) => {
                          const subActive = isActive(sub.href);
                          return (
                            <Link
                              key={`${sub.label}-${sidx}`}
                              href={sub.href}
                              onClick={onClose}
                              className={`
                                ml-10 flex items-center group gap-3 px-3 py-1.5 lg:py-2 rounded-lg 
                                hover:text-whiteColor hover:bg-white text-blackColor transition-all duration-200
                                ${subActive
                                  ? "bg-white opacity-100 text-blackColor"
                                  : ""
                                }
                                ${isCollapsed
                                  ? "xl:justify-center"
                                  : "justify-start"
                                }
                              `}
                              title={isCollapsed ? sub.label : ""}
                            >
                              <div className="flex gap-2 items-center">
                                <div className="w-[30px] h-[30px] group flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                                  {/* <sub.icon
                                    className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${
                                      subActive ? "opacity-100" : ""
                                    }`}
                                  /> */}
                                </div>
                                <span
                                  className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${isCollapsed ? "xl:hidden" : ""
                                    }`}
                                >
                                  {sub.label}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              }
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                    hover:text-whiteColor hover:bg-whiteColor text-blackColor transition-all duration-200
                    ${active ? "bg-white opacity-100 text-blackColor" : ""}
                    ${isCollapsed ? "xl:justify-center" : "justify-start"}
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                      <item.icon
                        className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${active ? "opacity-100" : ""
                          }`}
                      />
                    </div>
                    <span
                      className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${isCollapsed ? "xl:hidden" : ""
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
        {isLoggedIn == "admin" && (
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
                          className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${active ? "opacity-100" : ""
                            }`}
                        />
                      </div>
                      <span
                        className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${isCollapsed ? "xl:hidden" : ""
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

        {/* Log out section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className={`
              flex items-center hover:bg-white text cursor-pointer gap-3 px-3 py-3 
               w-full rounded-lg transition-all duration-200
              ${isCollapsed ? "xl:justify-center" : ""}
            `}
            title={isCollapsed ? "Log Out Account" : ""}
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0">
              <LogoutIcon />
            </div>
            <span
              className={`text-base font-normal  whitespace-nowrap ${isCollapsed ? "xl:hidden" : ""
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
