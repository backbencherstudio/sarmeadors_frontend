"use client";

import { useToken } from "@/hooks/useToken";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import CircleMessageicon from "../icon/CircleMessageicon";
import GiftIcon from "../icon/GiftIcon";
import NotificationSection from "./NotificationSection";
import Search from "./Search";

interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  sidebarOpen,
}: HeaderProps) => {
  const router = useRouter();
  const { token } = useToken();

  return (
    <nav className=" text-blackColor border-b bg-grayColor1 border-borderColor  py-3">
      <div className=" px-3  md:px-6   relative flex justify-between w-full mb-1 z-50">
        {/* Mobile menu button */}
        <div>
          <div className=" xl:hidden h-full flex items-center">
            <button
              onClick={onMenuClick}
              className=" pr-2 py-2  text-[#4A4C56]"
            >
              {sidebarOpen ? (
                <X className=" z-50 bg-black " />
              ) : (
                <Menu className="text-blackColor" />
              )}
            </button>
          </div>
        </div>

        {/* Notification and Profile Group */}
        <div className="flex items-center gap-2 lg:gap-6 justify-end w-full">
          <div className=" hidden md:block w-full ">
            <Search />
          </div>
          <div className="flex items-center gap-2 lg:gap-5 justify-between">
            <NotificationSection />
            <Link
              href={"/messages"}
              className="cursor-pointer relative flex justify-center items-center "
            >
              <span className="absolute -top-1 -right-1 flex justify-center border-2 border-whiteColor leading-2.5 items-center text-[10px] w-3 h-3 text-whiteColor rounded-full bg-destructive">
                {/* {notifications.length} */}
              </span>
              <CircleMessageicon className="w-5 h-5" />
            </Link>
            <Link
              href={"/candidate/marketplace-job"}
              className="cursor-pointer relative flex justify-center items-center "
            >
              <span className="absolute -top-1 -right-1 flex justify-center border-2 border-whiteColor leading-2.5 items-center text-[10px] w-3 h-3 text-whiteColor rounded-full bg-destructive">
                {/* {notifications.length} */}
              </span>
              <GiftIcon className="w-5 h-5" />
            </Link>
            <div className="  relative sm:ml-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-3 h-full items-center">
                    <div
                      className="flex items-center  p-1  rounded-full cursor-pointer hover:opacity-90"
                      style={{
                        boxShadow: "2px 2px 7px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className=" w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
                        <Image
                          src={"/profile.png"}
                          alt="Admin Avatar"
                          width={40}
                          height={40}
                          className="rounded-md w-full h-full"
                        />
                      </div>
                    </div>

                    <button className=" cursor-pointer">
                      <IoIosArrowDown size={16} className="text-blackColor" />
                    </button>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-headerColor">
                      {"User"}
                    </p>
                    <p className="text-xs text-textColor">{"example.com"}</p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/client/client-profile"
                      className="cursor-pointer"
                    >
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="text-redColor font-semibold cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:hidden px-4">
        <Search />
      </div>
    </nav>
  );
};

export default Header;
