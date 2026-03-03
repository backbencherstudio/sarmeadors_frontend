"use client";

import Image from "next/image";
import { Star, ArrowLeft } from "lucide-react";
import CandidatesReviewModal from "@/components/client/ClientMyJobs/ShortTermJob/Marketplace/Applicants/(view-details)/CandidatesReviewModal";

type Review = {
    id: number;
    name: string;
    role: string;
    rating: number;
    date: string;
    image: string;
    review: string;
};

const reviews: Review[] = [
    {
        id: 1,
        name: "Muhammad",
        role: "Chef cooking",
        rating: 5.0,
        date: "04 March 2021",
        image: "/avatar1.jpg",
        review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
    },
    {
        id: 2,
        name: "Muhammad",
        role: "Chef",
        rating: 5.0,
        date: "04 March 2021",
        image: "/avatar2.jpg",
        review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
    },
    {
        id: 3,
        name: "Muhammad",
        role: "Chef cooking",
        rating: 5.0,
        date: "04 March 2021",
        image: "/avatar3.jpg",
        review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
    },
];

export default function CandidateReviewsPage() {
    return (
        <div className="p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <ArrowLeft size={20} />
                    Candidate’s Review
                </div>

                <CandidatesReviewModal />
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((r) => (
                    <div
                        key={r.id}
                        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                        {/* Top */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src={r.image}
                                    alt={r.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {r.name}
                                </h4>
                                <p className="text-sm text-gray-500">{r.role}</p>
                            </div>
                        </div>

                        {/* Review */}
                        <p className="text-sm text-gray-600 mb-4">
                            {r.review}
                        </p>

                        {/* Bottom */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star size={16} fill="currentColor" />
                                <span className="text-gray-700 font-medium">
                                    ({r.rating})
                                </span>
                            </div>

                            <span className="text-gray-500">{r.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}