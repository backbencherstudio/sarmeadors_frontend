"use client";

import AdminTabs from "@/components/candidates/AdminTabs/AdminTabs";
import ProfileTabs from "@/components/candidates/ProfileTabs/ProfileTabs";
import ProfileInfo from "@/components/clients/ProfileInfo/ProfileInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import EmailAndSMSIcon from "@/public/icon/EmailAndSMSIcon";
import JobsIcon from "@/public/icon/JobsIcon";
import ListIcon from "@/public/icon/ListIcon";
import MoreIcon from "@/public/icon/MoreIcon";
import UserIcon from "@/public/icon/UserIcon";
import UserSettingsIcon from "@/public/icon/UserSettingsIcon";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("admin");

  const handleBack = () => {
    router.back();
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      <div className="lg:col-span-3 2xl:col-span-2">
        <ProfileInfo />
      </div>
      <div className="p-4 bg-white lg:col-span-9 2xl:col-span-10">
        <div className="flex justify-between items-center">
          <div
            onClick={handleBack}
            className="flex items-center gap-3 cursor-pointer"
          >
            <ArrowLeftIcon />
            <h1 className="font-semibold leading-[160%]">Candidates details</h1>
          </div>
          <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
            <Settings /> Setting
          </button>
        </div>
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <div className="w-full border-b border-gray-200">
            <TabsList className="bg-transparent  h-auto p-0 gap-5 rounded-none justify-start">
              <TabsTrigger
                value="admin"
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
              >
                <UserSettingsIcon />
                <span>Admin</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
              >
                <UserIcon />
                <span>Profile</span>
              </TabsTrigger>
              <div>
                <Select value={selectedTab} onValueChange={handleTabChange}>
                  <SelectTrigger className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0 border-none shadow-none">
                    {/* <SelectValue placeholder="Select a tab" /> */}
                    <MoreIcon />
                    <span>More</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="cursor-pointer data-[highlighted]:bg-[#111927] data-[highlighted]:text-white data-[highlighted]:[&_svg]:text-white"
                      value="jobs"
                    >
                      <JobsIcon /> Jobs
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer data-[highlighted]:bg-[#111927] data-[highlighted]:text-white data-[highlighted]:[&_svg]:text-white"
                      value="email/sms log"
                    >
                      <EmailAndSMSIcon /> Email/SMS Log
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer data-[highlighted]:bg-[#111927] data-[highlighted]:text-white data-[highlighted]:[&_svg]:text-white"
                      value="records"
                    >
                      <ListIcon /> Records
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsList>
          </div>
          <TabsContent value="admin" className="mt-4">
            <AdminTabs />
          </TabsContent>
          <TabsContent value="profile" className="mt-4">
            <ProfileTabs />
          </TabsContent>
          <TabsContent value="jobs" className="mt-4">
            MoreTabs
          </TabsContent>
          <TabsContent value="email/sms log" className="mt-4">
            Email/SMS Log
          </TabsContent>
          <TabsContent value="records" className="mt-4">
            Records
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
