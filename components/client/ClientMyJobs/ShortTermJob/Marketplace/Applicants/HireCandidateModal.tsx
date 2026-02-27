import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function HireCandidateModal() {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <button className="bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                        Hire Candidate
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-3xl text-center">Are you interested in hiring candidates directly?</DialogTitle>
                        <DialogDescription className="text-center">
                            The job has been forwarded to the admin for broadcasting. Once the admin starts the broadcast, we will keep you updated.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <button className="w-fit bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                            Hire Candidate
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
