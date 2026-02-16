"use client"

import { useState } from "react"
import Image from "next/image"
import {
    Search,
    Download,
    Settings,
    Filter,
    Trash2,
    Pencil,
    Link as LinkIcon,
    User,
    FileText,
    Building,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CreateJobModal from "./CreateJobModal"
import ButtonReuseable from "@/components/reusable/CustomButton"

interface JobListing {
    id: string
    title: string
    clientName: string
    clientImage?: string
    clientInitials: string
    status: "Broadcasted" | "Filled" | "Closed"
    startDate: string
    locations: string
    address: string
    compensation: string
    schedule: string
    children: string
    jobId: string
    createdDate: string
    notes: string[]
}

const mockJobs: JobListing[] = [
    {
        id: "1",
        title: "Nanny House Manager needed in McLean, VA",
        clientName: "Robert Fox",
        clientInitials: "RF",
        status: "Broadcasted",
        startDate: "ASAP",
        locations: "DC Metro Area",
        address: "Mclean, VA",
        compensation: "$35 hour",
        schedule: "12PM-8PM Could do anywhere between 30-40 hours a week.",
        children: "7, 5, and 2 years old",
        jobId: "3896225",
        createdDate: "Wed Nov 12 2025 (4 days ago)",
        notes: [],
    },
    {
        id: "2",
        title: "Nanny House Manager needed in McLean, VA",
        clientName: "Robert Fox",
        clientInitials: "RF",
        status: "Broadcasted",
        startDate: "ASAP",
        locations: "DC Metro Area",
        address: "Mclean, VA",
        compensation: "$35 hour",
        schedule: "12PM-8PM Could do anywhere between 30-40 hours a week.",
        children: "7, 5, and 2 years old",
        jobId: "3896225",
        createdDate: "Wed Nov 12 2025 (4 days ago)",
        notes: [],
    },
    {
        id: "3",
        title: "Nanny House Manager needed in McLean, VA",
        clientName: "Robert Fox",
        clientInitials: "RF",
        status: "Broadcasted",
        startDate: "ASAP",
        locations: "DC Metro Area",
        address: "Mclean, VA",
        compensation: "$35 hour",
        schedule: "12PM-8PM Could do anywhere between 30-40 hours a week.",
        children: "7, 5, and 2 years old",
        jobId: "3896225",
        createdDate: "Wed Nov 12 2025 (4 days ago)",
        notes: [],
    },
    {
        id: "4",
        title: "Nanny House Manager needed in McLean, VA",
        clientName: "Robert Fox",
        clientInitials: "RF",
        status: "Broadcasted",
        startDate: "ASAP",
        locations: "DC Metro Area",
        address: "Mclean, VA",
        compensation: "$35 hour",
        schedule: "12PM-8PM Could do anywhere between 30-40 hours a week.",
        children: "7, 5, and 2 years old",
        jobId: "3896225",
        createdDate: "Wed Nov 12 2025 (4 days ago)",
        notes: [],
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Broadcasted":
            return "bg-blue-100 text-blue-700"
        case "Filled":
            return "bg-purple-100 text-purple-700"
        case "Closed":
            return "bg-red-100 text-red-700"
        default:
            return "bg-gray-100 text-gray-700"
    }
}

export default function JobList() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Job List</h1>
                    <p className="text-sm text-gray-600">List of all current clients and their details.</p>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-2 flex-1 max-w-3xl">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by Name, Email or Phone Number"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-12 w-12 border">
                            <Download className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 border">
                            <Settings className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 border">
                            <Filter className="w-5 h-5" />
                        </Button>
                        {/* Create Job Modal */}
                        <CreateJobModal />
                    </div>
                </div>
            </div>

            {/* Accordion List */}
            <Accordion type="single" collapsible className="space-y-4">
                {mockJobs.map((job) => (
                    <AccordionItem key={job.id} value={job.id} className="border rounded-lg">
                        <AccordionTrigger className="hover:no-underline px-2 ">
                            <Card className="w-full border-0 shadow-none p-0">
                                <CardContent className="flex gap-3 flex-col md:flex-row md:items-center justify-between lg:px-2 p-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            {job.clientImage ? (
                                                <Image src={job.clientImage} alt={job.clientName} width={40} height={40} />
                                            ) : (
                                                <span className="text-sm font-medium">{job.clientInitials}</span>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-gray-900 text-nowrap">{job.clientName}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                                            {job.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Select value={job.status} onValueChange={() => { }}>
                                            <SelectTrigger
                                                className="w-[120px] h-8 text-xs"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Broadcasted">Broadcasted</SelectItem>
                                                <SelectItem value="Filled">Filled</SelectItem>
                                                <SelectItem value="Closed">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </AccordionTrigger>

                        <AccordionContent className="p-0">
                            <div className=" border-t grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="p-6 space-y-6">
                                    {/* <h2 className="text-lg font-semibold">{job.title}</h2> */}
                                    <div className="space-y-5 text-sm">
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Start</span>
                                            <span className="flex-1"> {job.startDate}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Location</span>
                                            <span className="flex-1"> {job.locations}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Address</span>
                                            <span className="flex-1"> {job.address}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Compensation</span>
                                            <span className="flex-1"> {job.compensation}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Schedule</span>
                                            <span className="flex-1"> {job.schedule}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Children</span>
                                            <span className="flex-1"> {job.children}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">ID</span>
                                            <span className="flex-1"> {job.jobId}</span>
                                        </div>
                                        <div className="flex items-center font-medium">
                                            <span className="flex-1 text-[#384250]">Created</span>
                                            <span className="flex-1"> {job.createdDate}</span>
                                        </div>
                                    </div>



                                    <div className="flex items-center gap-2">
                                        <ButtonReuseable title="Broadcast" className="bg-[#111927] text-white py-3 px-6" />
                                        <ButtonReuseable title="View Applicants" className="bg-white text-black! border py-3 px-6" />
                                        <Button variant="ghost" size="icon"><LinkIcon className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon"><User className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon"><FileText className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon"><Building className="w-4 h-4" /></Button>
                                    </div>

                                </div>

                                <div className="flex-1 border-t lg:border-t-0 lg:border-l p-4">
                                    <h3 className="font-semibold mb-2">Notes</h3>
                                    <p className="text-xs text-gray-600 mb-4">Internal notes only.</p>
                                    <Button variant="outline" className="">Add Note</Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
