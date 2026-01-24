"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { FaUser } from "react-icons/fa"
import moreIcon from "@/public/icon/more.svg"
import { AdminTabs } from "@/components/clients/AdminTabs"

function page() {
  return (
    <div className="p-4 bg-white">
      <Tabs defaultValue="admin" className="w-full">
        <div className="w-full border-b border-gray-200">
          <TabsList className="bg-transparent  h-auto p-0 gap-5 rounded-none justify-start">
            <TabsTrigger
              value="admin"
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900"
            >
              <div className="relative flex items-center justify-center">
                <FaUser className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 text-[10px] leading-none">*</span>
              </div>
              <span>Admin</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900"
            >
              <FaUser className="w-5 h-5" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900"
            >
              <Image src={moreIcon} alt="More" width={20} height={20} className="w-5 h-5" />
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
  )
}

export default page