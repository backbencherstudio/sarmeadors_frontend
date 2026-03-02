import PaymentSuccessfulModal from "@/components/client/ClientMyJobs/LongTermJob/Running/PaymentSuccessfulModal";
import Image from "next/image";

export default function InvoicePage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-10">
            <div className="w-full max-w-lg  rounded-2xl p-6 border border-gray-200">
                {/* Header */}
                <div className="flex items-center gap-3 pb-4 border-b">
                    <Image
                        src=""
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="font-semibold text-gray-800 text-sm leading-tight">
                        Full Time Nanny / Family Assistant in Miami Beach + travel (ideally live in)
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mt-5 text-sm text-gray-700">
                    <div className="flex justify-between py-2">
                        <span>Compensation</span>
                        <span>$65/hr</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span>Total Working Hours</span>
                        <span>8hr</span>
                    </div>
                    <div className="flex justify-between py-3 font-semibold border-t mt-2">
                        <span>Total</span>
                        <span>$520</span>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="mt-5">
                    <label className="text-xs text-gray-500">Payment Method</label>
                    <select className="w-full mt-1 border bg-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none">
                        <option>Bank Payment</option>
                        <option>Credit Card</option>
                    </select>
                </div>

                {/* Modal */}
                <PaymentSuccessfulModal />
            </div>
        </div>
    );
}
