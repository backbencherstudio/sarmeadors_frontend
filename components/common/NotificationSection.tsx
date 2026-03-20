import NotificationIcon from "@/components/icon/NotificationIcon";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Loader from "../reusable/Loader";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
function NotificationSection() {
  const [notifications, setNotifications] = useState<null | []>([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
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

  return (
    <div>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger
          className="cursor-pointer relative flex justify-center items-center "
          onClick={() => setPopoverOpen(!popoverOpen)}
        >
          <span className="absolute -top-1 -right-1 flex justify-center border-2 border-whiteColor leading-2.5 items-center text-[10px] w-3 h-3 text-whiteColor rounded-full bg-destructive">
            {/* {notifications.length} */}
          </span>

          <NotificationIcon className="w-5 h-5" />
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
                        src={notification.avatar_url || "/image/profile.jpg"}
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
    </div>
  );
}

export default NotificationSection;
