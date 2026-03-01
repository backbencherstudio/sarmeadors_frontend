"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"

export default function ScheduleInterviewModal({ text = '' }) {
    const [date, setDate] = useState<Date>()

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className="flex items-center gap-2 p-2 rounded-[10px] border cursor-pointer">
                        <Video /> {text}
                    </div>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl text-center">
                            Schedule Interview
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Update the interview details with Charlotte Hamlin for the After School Nanny position?
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form */}
                    <div className="mt-4 space-y-4">

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Interview Date</label>
                            <Input className="w-full" type="date" />
                        </div>

                        <div className="flex items-center gap-2 w-full">

                            <div className="space-y-1 flex-1">
                                <label className="text-sm font-medium">Available from</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            data-empty={!date}
                                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-1 flex-1">
                                <label className="text-sm font-medium">Available to</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            data-empty={!date}
                                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} />
                                    </PopoverContent>
                                </Popover>
                            </div>

                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium">Special Note</label>
                            <Textarea placeholder="Write your note here..." className="h-20" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-2">
                        <DialogClose>
                            <button className="w-fit bg-[#F3F4F6] text-black text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                                Cancel
                            </button>
                        </DialogClose>
                        <button className="w-fit bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                            Schedule Interview
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}