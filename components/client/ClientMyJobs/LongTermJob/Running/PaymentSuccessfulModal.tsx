import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function PaymentSuccessfulModal() {

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <button className="w-full mt-6 bg-black text-white font-medium py-3 rounded-lg text-sm hover:bg-gray-800 cursor-pointer">
                        Confirm Payment
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-3xl text-center">Payment Successful</DialogTitle>
                        <DialogDescription className="text-center">
                            Payment has been successful. If you want to create new services, please click the Discover button
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <button className="w-fit bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-[8px] transition-colors cursor-pointer">
                            Leave Review
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
