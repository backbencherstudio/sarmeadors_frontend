"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import HireCandidateModal from "../HireCandidateModal";
import ScheduleInterviewModal from "../ScheduleInterviewModla";
import Link from "next/link";

export default function ProfileAndReview() {
    return (
        <div className="w-full bg-white flex items-center justify-between">

            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative w-12 h-12">
                    <Image
                        src="/avatar.jpg"
                        alt="Kristin Ben"
                        fill
                        className="rounded-full object-cover"
                    />
                </div>

                {/* Info */}
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                            Kristin Ben
                        </h3>

                        <Link href={'/client/marketplace-view-details/candidates-review'}>
                            <div className="flex items-center gap-1 text-yellow-500 text-sm hover:underline cursor-pointer">
                                <Star size={16} fill="currentColor" />
                                <span className="text-gray-700 font-medium">
                                    4.5 Rating (8)
                                </span>
                            </div>
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500">
                        Nanny | House Manager | Chef
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex gap-3">

                <ScheduleInterviewModal text={" Request for Interview"} />

                {/* <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                    Request for Interview
                </button> */}

                <HireCandidateModal />
            </div>
        </div>
    );
}