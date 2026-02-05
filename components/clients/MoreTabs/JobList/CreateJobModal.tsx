"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import JobDetails from "./JobDetails"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserSettingsIcon from "@/public/icon/UserSettingsIcon"
import UserIcon from "@/public/icon/UserIcon"
import ProfileTabs from "@/components/clients/ProfileTabs/ProfileTabs"
import EmailOrSmsLog from "@/components/clients/MoreTabs/EmailOrSMSLog/EmailOrSmsLog"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateJobModal() {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState("JobDetails")
    const handleTabChange = (value: string) => {
        setSelectedTab(value)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#111927] text-white hover:bg-[#111927]/90 h-12 px-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Job
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[1000px]! h-[90vh] overflow-y-auto p-[32px]">
                {/* Header */}
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-xl font-semibold">Create job</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        List of all current clients and their details.
                    </p>
                </DialogHeader>

                {/* Steps */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <div className="w-full border-b border-gray-200">
                        <TabsList className="bg-transparent  h-auto p-0 gap-5 rounded-none flex justify-between w-full">
                            <TabsTrigger
                                value="JobDetails"
                                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
                            >
                                <UserSettingsIcon />
                                <span>Job Details</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="JobAddress"
                                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
                            >
                                <UserIcon />
                                <span>Job Address</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="DateTime"
                                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
                            >
                                <UserIcon />
                                <span>Date & Time</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="SetBudget"
                                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-700 font-normal hover:text-gray-900 cursor-pointer"
                            >
                                <UserIcon />
                                <span>Set Budget</span>
                            </TabsTrigger>

                        </TabsList>
                    </div>
                    <TabsContent value="JobDetails" className="mt-4">
                        {/* Job Details */}
                        <JobDetails />
                    </TabsContent>
                    <TabsContent value="JobAddress" className="mt-4">
                        <ProfileTabs />
                    </TabsContent>
                    <TabsContent value="DateTime" className="mt-4">
                        {/* <JobList /> */}
                    </TabsContent>
                    <TabsContent value="SetBudget" className="mt-4">
                        <EmailOrSmsLog />
                    </TabsContent>
                </Tabs>





            </DialogContent>
        </Dialog>
    )
}
