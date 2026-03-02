import ReusableLineTabs from "@/components/reusable/ReusableLineTabs"

export default function PendingViewDetailsLayout({ children }) {
    const TabsData = [
        { label: "Job Description", link: "/client/running-view-details/job-description" },
        { label: "Candidate Profile", link: "/client/running-view-details/candidate-profile" },
        { label: "Message(13)", link: "/client/running-view-details/message" }
    ]

    return (
        <div className="p-6">
            {/* Job Details */}
            <div className="w-full bg-[#e9f3f5] p-4 rounded-xl mb-6">
                <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Left Side Info */}
                    <div className="flex flex-wrap items-center gap-6 w-full">

                        {/* Working Time */}
                        <div className="flex items-center gap-3 border-r pr-6">
                            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">
                                ⏱️
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">8 hr 11 min</p>
                                <p className="text-sm text-gray-500">Total Working Time</p>
                            </div>
                        </div>

                        {/* Payable Amount */}
                        <div className="border-r pr-6">
                            <p className="font-semibold text-gray-900">$123</p>
                            <p className="text-sm text-gray-500">Payable Amount</p>
                        </div>

                        {/* Schedule */}
                        <div className="border-r pr-6">
                            <p className="font-semibold text-gray-900">
                                08:00 AM - 05:00 PM
                            </p>
                            <p className="text-sm text-gray-500">
                                Morning 8:00AM to 5:00PM
                            </p>
                        </div>

                        {/* Check In/Out */}
                        <div>
                            <p className="text-sm text-gray-600">
                                Check In:{" "}
                                <span className="text-blue-600 font-medium">8:02 AM</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Check Out:{" "}
                                <span className="text-blue-600 font-medium">8:05 PM</span>
                            </p>
                        </div>
                    </div>

                    {/* Invoice Button */}
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                        Invoice
                    </button>

                </div>
            </div>
            {/* Reusable Line Tabs */}
            <ReusableLineTabs tabs={TabsData} />
            {/* Children */}
            <div className='pt-5'>
                {children}
            </div>
        </div>
    )
}
