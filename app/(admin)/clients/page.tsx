"use client";

import { AdminTabs } from "@/components/clients/AdminTabs/AdminTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moreIcon from "@/public/icon/more.svg";
import { ArrowLeftIcon, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

function page() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="md:p-4 bg-white">
      <div className="flex justify-between items-center">
        <div
          onClick={handleBack}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeftIcon />
          <h1 className="font-semibold leading-[160%]">Client details</h1>
        </div>
        <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
          <Settings /> Setting
        </button>
      </div>
      <Tabs defaultValue="admin" className="w-full">
        <div className="w-full border-b border-gray-200">
          <TabsList className="bg-transparent  h-auto p-0 gap-5 rounded-none justify-start">
            <TabsTrigger
              value="admin"
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <FaUser className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 text-[10px] leading-none">
                  *
                </span>
              </div>
              <span>Admin</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
            >
              <FaUser className="w-5 h-5" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
            >
              <Image
                src={moreIcon}
                alt="More"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>More</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="admin" className="mt-4">
          <AdminTabs />
        </TabsContent>
        <TabsContent value="profile" className="mt-4">
          Profile content here
        </TabsContent>
        <TabsContent value="more" className="mt-4">
          More content here
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
