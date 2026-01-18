"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../reusable/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const router = useRouter();
  const { token } = useToken();
  const [notifications, setNotifications] = useState<null | []>([]);
  console.log(token, " token in header");

  const [profile, setProfile] = useState<any>();
  const displayedNotifications = showAllNotifications
    ? notifications
    : notifications.slice(0, 5);

  function timeAgo(createdAtString) {
    const createdAt: any = new Date(createdAtString);
    const now: any = new Date();

    const diffInMs = now - createdAt;
    const diffInMinutes = Math.floor(diffInMs / 60000);

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const {
    data: userDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => UserService.getUserDetails(token),
    enabled: !!token, // Only run the query when token exists
  });

  // Handle authentication errors
  if (error) {
    const { handleAuthError } = require("@/helper/auth.helper");
    handleAuthError(error, router);
  }

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
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger
                className="cursor-pointer relative flex justify-center items-center "
                onClick={() => setPopoverOpen(!popoverOpen)}
              >
                {notifications.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex justify-center items-center text-sm w-6 h-6 text-whiteColor rounded-full bg-redColor">
                    {notifications.length}
                  </span>
                )}
                <Image
                  src="/icon/notification.svg"
                  alt="notification"
                  width={20}
                  height={20}
                />
              </PopoverTrigger>

              <PopoverContent className="w-80 md:w-[467px] mt-4 p-0 max-h-[500px] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                  <h4 className="text-base font-bold md:text-lg text-headerColor">
                    Notifications
                  </h4>

                  <button
                    onClick={() => setPopoverOpen(false)}
                    className="text-[#455468] bg-bgColor w-[35px] h-[35px] shadow-sm rounded-full cursor-pointer text-lg font-bold flex items-center justify-center"
                  >
                    <X className="" />
                  </button>
                </div>

                <div className="overflow-y-auto px-4 py-3 flex-1">
                  {loading ? (
                    <Loader />
                  ) : notifications?.length > 0 ? (
                    <div className="flex flex-col space-y-6">
                      {displayedNotifications.map((notification: any) => (
                        <div
                          key={notification.id}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full">
                            <Image
                              src={
                                notification.avatar_url || "/image/profile.jpg"
                              }
                              alt="notification"
                              width={50}
                              height={50}
                              className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-base text-headerColor">
                              {notification?.sender?.name}
                            </p>
                            <p className="text-sm font-normal text-descriptionColor mt-1">
                              {notification?.notification_event?.text}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <p className="text-xs text-gray-500">
                              {timeAgo(notification.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500 py-6">
                      No notifications available
                    </p>
                  )}
                </div>

                {/* Sticky Footer */}
                {notifications.length > 5 && !showAllNotifications && (
                  <div className="border-t p-4 sticky bottom-0 bg-white z-10">
                    <button
                      onClick={() => setShowAllNotifications(true)}
                      className="text-headerColor font-bold flex gap-2 cursor-pointer items-center justify-center w-full"
                    >
                      View All <FaArrowRightLong />
                    </button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <div
              className="cursor-pointer relative flex justify-center items-center "
              onClick={() => setPopoverOpen(!popoverOpen)}
            >
              {notifications.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex justify-center items-center text-sm w-6 h-6 text-whiteColor rounded-full bg-redColor">
                  {notifications.length}
                </span>
              )}
              <Image
                src="/icon/head-gift.svg"
                alt="notification"
                width={20}
                height={20}
              />
            </div>
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
                          src={
                            userDetails?.data?.data?.avatar_url ||
                            "/profile.png"
                          }
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
                      {userDetails?.data?.data?.name || "User"}
                    </p>
                    <p className="text-xs text-textColor">
                      {userDetails?.data?.data?.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">
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
