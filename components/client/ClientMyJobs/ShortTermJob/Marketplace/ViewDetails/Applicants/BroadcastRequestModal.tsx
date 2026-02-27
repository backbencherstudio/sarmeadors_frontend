import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function BroadcastRequestModal() {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <button className=" flex items-center gap-1.5 bg-[#111927] text-white cursor-pointer  md:px-4 md:py-[17px] px-4 py-2 rounded-[12px]">
                        Broadcast Request
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-3xl text-center">Request Sent For Broadcasting!</DialogTitle>
                        <DialogDescription className="text-center">
                            The job has been forwarded to the admin for broadcasting. Once the admin starts the broadcast, we will keep you updated.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <button className="w-fit bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                            Broadcast Request
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
