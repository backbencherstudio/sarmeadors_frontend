import Link from "next/link";

export default function Page() {
    return (
        <div className="flex items-start justify-center">
            {/* Outer Container */}
            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h2 className="text-gray-700 font-medium">Running Job</h2>
                </div>
                {/* Job Card */}
                <div className="border border-blue-400 rounded-xl p-5">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Date */}
                        <div className="min-w-[100px]">
                            <h3 className="text-2xl font-bold text-gray-800">18</h3>
                            <p className="text-xs text-gray-500 uppercase">
                                Jan, Sun
                            </p>
                        </div>

                        <div className="w-full">
                            {/* LEFT SECTION */}
                            <div className="flex justify-between gap-5">

                                {/* Job Details */}
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            After School Nanny
                                        </h3>
                                        <span className="px-2 py-1 text-sm bg-red-200 text-red-600 rounded-md">
                                            Canceled
                                        </span>
                                    </div>

                                    {/* Profile */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-semibold text-blue-700">
                                            OP
                                        </div>
                                        <span className="text-sm text-gray-700">
                                            Arlene McCoy
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-500 mt-2 max-w-lg truncate">
                                        Full responsibility for three energetic children, ages 2, 5,
                                        and 7, including crafting delicious and engaging meals...
                                    </p>

                                    {/* Address */}
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                        <span>📍</span>
                                        <span>
                                            71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605
                                        </span>
                                    </div>
                                </div>
                                {/* RIGHT SECTION */}
                                <div className="flex flex-col items-end justify-between gap-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        10:00AM - 11:00AM
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Buttons */}
                            <div className="flex justify-between gap-3">
                                {/* Details Link */}
                                <Link href={'/client/canceled-view-details'} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    View Details
                                </Link>

                                <button className="px-4 py-2 text-sm border text-white rounded-lg bg-black transition cursor-pointer">
                                    Request for Refund
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}