"use client";

import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function ViewInvoiceModal() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-black! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-white cursor-pointer">
                    View Invoice
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md p-6 rounded-2xl">
                {/* Illustration */}
                <div className="flex justify-center mt-2 mb-4">
                    <Image
                        src="/illustration.png"
                        alt="Success"
                        width={110}
                        height={110}
                        className="mx-auto"
                    />
                </div>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center">
                        Payment Successful
                    </DialogTitle>
                </DialogHeader>

                {/* Job Info */}
                <div className="text-center space-y-1">
                    <p className="font-semibold text-gray-900">
                        Full Time Nanny / Family Assistant in Miami Beach + travel
                    </p>
                    <p className="text-sm text-gray-500">(ideally live in)</p>
                </div>

                {/* Order Summary Box */}
                <div className="border rounded-lg p-4 mt-4">
                    <h3 className="font-semibold mb-3">Order Summary</h3>

                    <div className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium">Hand cash</span>
                    </div>

                    <div className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">Compensation</span>
                        <span className="font-medium">$25/hr</span>
                    </div>

                    <div className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">Total Working Hour</span>
                        <span className="font-medium">8hr</span>
                    </div>

                    <div className="flex justify-between text-base font-semibold mt-3 pt-3 border-t">
                        <span>Total</span>
                        <span>$200</span>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}