"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminTabs } from "@/components/clients/AdminTabs/AdminTabs"
import { Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import ProfileInfo from "@/components/clients/ProfileInfo/ProfileInfo"
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon"
import UserSettingsIcon from "@/public/icon/UserSettingsIcon"
import UserIcon from "@/public/icon/UserIcon"
import MoreIcon from "@/public/icon/MoreIcon"

function page() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      <div className="lg:col-span-3 2xl:col-span-2">
        <ProfileInfo />
      </div>
      <div className="p-4 bg-white lg:col-span-9 2xl:col-span-10">
        <div className="flex justify-between items-center">
          <div onClick={handleBack} className="flex items-center gap-4 cursor-pointer">
            <ArrowLeftIcon />
            <h1 className="font-semibold leading-[160%]" >Client details</h1>
          </div>
          <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
            <Settings />  Setting
          </button>
        </div>
        <Tabs defaultValue="admin" className="w-full">
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
              <TabsTrigger
                value="more"
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
              >
                <MoreIcon />
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
    </div>
  )
}

export default page