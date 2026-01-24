"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    HiOutlineMenu,
    HiOutlineDocumentText,
    HiOutlineLockClosed,
    HiOutlineCreditCard,
    HiOutlineDocument,
    HiOutlineUserGroup
} from "react-icons/hi"
import { MdEmail, MdSms } from "react-icons/md"
import { FaTrophy } from "react-icons/fa"
import List from "./List/List"

export function AdminTabs() {
    return (
        <div>
            <Tabs defaultValue="lists" className="w-full">
                <TabsList className="bg-transparent border border-gray-200 p-0.5 h-auto  gap-0 rounded-lg w-full justify-start overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <TabsTrigger
                        value="lists"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineMenu className="w-5 h-5" />
                        <span>Lists</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="notes"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineDocumentText className="w-5 h-5" />
                        <span>Notes</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="email-sms"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <div className="flex items-center gap-1">
                            {/* <MdEmail className="w-4 h-4" /> */}
                            <MdSms className="w-4 h-4" />
                        </div>
                        <span>Email/SMS</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="events"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <FaTrophy className="w-5 h-5" />
                        <span>Events</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="password"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineLockClosed className="w-5 h-5" />
                        <span>Password</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="payments"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineCreditCard className="w-5 h-5" />
                        <span>Payments</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="documents"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineDocument className="w-5 h-5" />
                        <span>Documents</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="matches"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#111927] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 font-normal hover:text-gray-600 transition-colors [&_svg]:text-current cursor-pointer"
                    >
                        <HiOutlineUserGroup className="w-5 h-5" />
                        <span>Matches</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="lists" className="mt-4">
                    <List />
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                    <div className="text-gray-600">Notes content here</div>
                </TabsContent>
                <TabsContent value="email-sms" className="mt-4">
                    <div className="text-gray-600">Email/SMS content here</div>
                </TabsContent>
                <TabsContent value="events" className="mt-4">
                    <div className="text-gray-600">Events content here</div>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                    <div className="text-gray-600">Password content here</div>
                </TabsContent>
                <TabsContent value="payments" className="mt-4">
                    <div className="text-gray-600">Payments content here</div>
                </TabsContent>
                <TabsContent value="documents" className="mt-4">
                    <div className="text-gray-600">Documents content here</div>
                </TabsContent>
                <TabsContent value="matches" className="mt-4">
                    <div className="text-gray-600">Matches content here</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
