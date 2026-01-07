"use client";
import { clearBiodataData } from "@/helper/biodataStorage.helper";
import { CookieHelper } from "@/helper/cookie.helper";
import mainLogo from "@/public/icon/mainlogo.png";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill, RiHome6Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

import menuOne from "@/public/icon/client.svg"
import menu2 from "@/public/icon/candidates.svg"
import menu3 from "@/public/icon/calendar 01.svg"
import menu4 from "@/public/icon/jobs.svg"
import menu5 from "@/public/icon/setting.svg"
import menu6 from "@/public/icon/more.svg"
import menu7 from "@/public/icon/billing.svg"
import menu8 from "@/public/icon/support.svg"
import menu9 from "@/public/icon/main_setting.svg"
import menu10 from "@/public/icon/logout.svg"

interface NavItem {
  icon: any;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const navItems: NavItem[] = [
  {
    icon: menuOne,
    label: "Clients",
    href: "/dashboard",
  },
  {
    icon: menu2,
    label: "Candidates",
    href: "/dashboard/Candidates",
  },
  {
    icon: menu3,
    label: "Shift Job calendar",
    href: "/dashboard/shift-job-calendar",
  },
  {
    icon: menu4,
    label: "Placement Jobs",
    href: "/dashboard/placement-jobs",
  },  
  {
    icon: menu5,
    label: "Platform settings",
    href: "/dashboard/platform-settings",
  },  
  {
    icon: menu6,
    label: "More",
    href: "/dashboard/more",
  },  
];

const otherItems = [
  {
    icon: menu7,
    label: "Billing",
    href: "/dashboard/billing",
  },
  {
    icon: menu8,
    label: "Help & Support",
    href: "/dashboard/help-support",
  },
  {
    icon: menu9,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed = false, onToggleCollapse }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };
  const handleLogout = () => {
    CookieHelper.destroy({ key: "jobtoken" });
    clearBiodataData()
    router.push("/login")

  }
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
          ${isCollapsed ? 'xl:w-20' : 'w-full'}
        `}
      >
        {/* Header with Logo and Toggle */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={"/dashboard"}
            className={`text-white flex items-center transition-all duration-300 ${
              isCollapsed ? 'xl:justify-center xl:w-full' : ''
            }`}
          >
            <Image
              src={mainLogo}
              alt="main logo"
              width={118}
              height={29}
              className={`transition-all duration-300 ${
                isCollapsed ? 'xl:w-8 xl:h-8' : 'w-20 md:w-[100px]'
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
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className="xl:hidden">
              <X className="text-whiteColor" size={20} />
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
            {navItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center group gap-3 px-3 py-2.5 lg:py-3 rounded-lg 
                    hover:text-whiteColor hover:bg-whiteColor text-blackColor transition-all duration-200
                    ${active ? "bg-white opacity-100 text-blackColor" : ""}
                    ${isCollapsed ? 'xl:justify-center' : 'justify-start'}
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group  flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                     <Image src={item.icon} alt={item.label} width={20} height={20} className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${active ? 'opacity-100' : ''}`} />
                    </div>
                    <span className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${
                      isCollapsed ? 'xl:hidden' : ''
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Other Section */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2 mb-2">Other</p>
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
                    ${isCollapsed ? 'xl:justify-center' : 'justify-start'}
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] group flex justify-center items-center flex-shrink-0 text-xl font-medium text-blackColor">
                       <Image src={item.icon} alt={item.label} width={20} height={20} className={`opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${active ? 'opacity-100' : ''}`} />
                    </div>
                    <span className={`text-base font-medium text-descriptionColor group-hover:text-blackColor transition-colors duration-200 whitespace-nowrap ${
                      isCollapsed ? 'xl:hidden' : ''
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Log out section */}
        <div className="pt-4">
        
          <button
            onClick={handleLogout}
            className={`
              flex items-center hover:bg-white text cursor-pointer gap-3 px-3 py-3 
               w-full rounded-lg transition-all duration-200
              ${isCollapsed ? 'xl:justify-center' : ''}
            `}
            title={isCollapsed ? "Log Out Account" : ""}
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0">
             <Image src={menu10} alt="Log Out" width={20} height={20} />
            </div>
            <span className={`text-base font-normal  whitespace-nowrap ${
              isCollapsed ? 'xl:hidden' : ''
            }`}>
              Log Out Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
