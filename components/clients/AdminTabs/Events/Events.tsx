"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface EventFormData {
    eventTitle: string
    eventType: string
    eventDate: Date | undefined
    eventTime: string
    timeZone: string
    candidates: string
    location: string
    interviewLink: string
    notes: string
    sendEmailNotification: boolean
    assignTo: string[]
}

export default function Events() {
    const [eventDate, setEventDate] = useState<Date | undefined>(undefined)
    const [assignTo, setAssignTo] = useState<string[]>([])

    const { register, handleSubmit, setValue, watch } = useForm<EventFormData>({
        defaultValues: {
            eventTitle: "",
            eventType: "",
            eventTime: "",
            timeZone: "",
            candidates: "",
            location: "",
            interviewLink: "",
            notes: "",
            sendEmailNotification: false,
            assignTo: [],
        },
    })

    const handleAssignToChange = (email: string) => {
        setAssignTo((prev) => {
            const updated = prev.includes(email)
                ? prev.filter((e) => e !== email)
                : [...prev, email]
            setValue("assignTo", updated)
            return updated
        })
    }

    const onSubmit = async (data: EventFormData) => {
        console.log("Form submitted:", { ...data, eventDate, assignTo })
        // Add your save logic here
    }

    const assignToOptions = [
        { email: "sarah@nanniescoasttocoast.com", name: "Sarah Meadors", isYourself: true },
        { email: "afsbf.sabrina@gmail.com", name: "sabrina sultana", isYourself: false },
        { email: "gcnadmin@enginehire.io", name: "GCN Admin", isYourself: false },
    ]

    return (
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-6">
            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Schedule Event (Interview, Meeting, etc.)
            </h2>
            <h3 className="text-sm text-gray-600 mb-6">
                Schedule Event (Interview, Meeting, etc.)
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Event Title */}
                    <div>
                        <Label htmlFor="eventTitle" className="text-sm text-gray-700 mb-2 block">
                            Event Title<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="eventTitle"
                            type="text"
                            placeholder="eg. Interview"
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                            {...register("eventTitle", { required: true })}
                        />
                    </div>

                    {/* Event Type */}
                    <div>
                        <Label htmlFor="eventType" className="text-sm text-gray-700 mb-2 block">
                            Event Type<span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={(value) => setValue("eventType", value)}>
                            <SelectTrigger className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12!">
                                <SelectValue placeholder="Start typing to filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="interview">Interview</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="call">Call</SelectItem>
                                <SelectItem value="follow-up">Follow-up</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        {/* Event Date */}
                        <div>
                            <Label htmlFor="eventDate" className="text-sm text-gray-700 mb-2 block">
                                Event Date<span className="text-red-500">*</span>
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild className="h-12!">
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full h-9 justify-start text-left font-normal rounded-lg border border-gray-200 px-4 py-3 text-sm",
                                            !eventDate && "text-gray-400"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {eventDate ? format(eventDate, "MM/dd/yyyy") : "MM/DD/YYYY"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={eventDate}
                                        onSelect={(date) => {
                                            setEventDate(date)
                                            setValue("eventDate", date)
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Event Time */}
                        <div>
                            <Label htmlFor="eventTime" className="text-sm text-gray-700 mb-2 block">
                                Event Time<span className="text-red-500">*</span>
                            </Label>
                            <Select onValueChange={(value) => setValue("eventTime", value)}>
                                <SelectTrigger className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12!">
                                    <SelectValue placeholder="hh:mm:A" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {Array.from({ length: 24 }, (_, i) => {
                                        const hour12 = i === 0 ? 12 : i > 12 ? i - 12 : i
                                        const period = i < 12 ? "AM" : "PM"
                                        const hourStr = hour12.toString().padStart(2, "0")
                                        return (
                                            <SelectItem key={`${i}:00`} value={`${hourStr}:00:${period}`}>
                                                {hourStr}:00 {period}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Time Zone */}
                        <div>
                            <Label htmlFor="timeZone" className="text-sm text-gray-700 mb-2 block">
                                Time zone<span className="text-red-500">*</span>
                            </Label>
                            <Select onValueChange={(value) => setValue("timeZone", value)}>
                                <SelectTrigger className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12!">
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                                    <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                                    <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                                    <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                                    <SelectItem value="UTC">UTC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>





                {/* Select Candidates */}
                <div>
                    <Label htmlFor="candidates" className="text-sm text-gray-700 mb-2 block">
                        Select Candidates<span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => setValue("candidates", value)}>
                        <SelectTrigger className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12!">
                            <SelectValue placeholder="Select Candidates" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="candidate1">Candidate 1</SelectItem>
                            <SelectItem value="candidate2">Candidate 2</SelectItem>
                            <SelectItem value="candidate3">Candidate 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Location */}
                <div>
                    <Label htmlFor="location" className="text-sm text-gray-700 mb-2 block">
                        Location
                    </Label>
                    <div className="relative">
                        <Input
                            id="location"
                            type="text"
                            placeholder="Address, Apartment, etc."
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm pr-10 h-12"
                            {...register("location")}
                        />
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Interview Link */}
                <div>
                    <Label htmlFor="interviewLink" className="text-sm text-gray-700 mb-2 block">
                        Interview Link
                    </Label>
                    <Input
                        id="interviewLink"
                        type="text"
                        placeholder="Zoom link or other call link"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm h-12"
                        {...register("interviewLink")}
                    />
                </div>

                {/* Notes */}
                <div>
                    <Label htmlFor="notes" className="text-sm text-gray-700 mb-2 block">
                        Notes
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Enter a description..."
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm min-h-[100px] h-32!"
                        {...register("notes")}
                    />
                </div>

                {/* Send Email Notification */}
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="sendEmailNotification"
                        checked={watch("sendEmailNotification")}
                        onCheckedChange={(checked) => setValue("sendEmailNotification", checked === true)}
                    />
                    <Label
                        htmlFor="sendEmailNotification"
                        className="text-sm text-gray-700 cursor-pointer"
                    >
                        Send email notification of event being scheduled
                    </Label>
                </div>

                {/* Assign To */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900 block">
                        Assign To
                    </Label>
                    <div className="space-y-3">
                        {assignToOptions.map((option) => (
                            <div key={option.email} className="flex items-center space-x-2">
                                <Checkbox
                                    id={option.email}
                                    checked={assignTo.includes(option.email)}
                                    onCheckedChange={() => handleAssignToChange(option.email)}
                                />
                                <Label
                                    htmlFor={option.email}
                                    className="text-sm text-gray-700 cursor-pointer"
                                >
                                    {option.name} - {option.email}
                                    {option.isYourself && (
                                        <span className="text-gray-500 ml-1">(Yourself)</span>
                                    )}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        className="bg-[#111927] text-white hover:bg-[#111927]/90 px-6 py-2 rounded-lg"
                    >
                        Schedule Event
                    </Button>
                </div>
            </form>
        </div>
    )
}
