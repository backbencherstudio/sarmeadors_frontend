"use client";

import Image from "next/image";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";

export default function CandidatesReviewModal() {
    const [rating, setRating] = useState(0);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 cursor-pointer">
                    ⭐ Leave Review
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Leave Review
                    </DialogTitle>
                </DialogHeader>

                {/* Candidate Info */}
                <div className="text-center space-y-2 mt-2">
                    <Image
                        src="/avatar.jpg"
                        alt="Kristin Ben"
                        width={60}
                        height={60}
                        className="rounded-full mx-auto object-cover"
                    />

                    <h3 className="font-semibold text-gray-900">
                        Kristin Ben
                    </h3>

                    <p className="text-sm text-gray-500">
                        Nanny | House Manager | Chef
                    </p>

                    <p className="text-yellow-500 text-sm font-medium">
                        ★ 4.5 Rating (8)
                    </p>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-2 my-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={28}
                            onClick={() => setRating(star)}
                            className={`cursor-pointer ${star <= rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>

                <p className="text-center text-sm text-gray-500 mb-4">
                    Click on a star to rate your experience with this candidate.
                </p>

                {/* Textarea */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Write a review for the Candidate
                    </label>

                    <textarea
                        placeholder="Describe your experience with the candidate..."
                        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                        rows={4}
                    />
                </div>

                <p className="text-xs text-gray-400 mt-3">
                    Feedback is public and can't be changed. Make sure to be fair and factual. If there is a dispute, try to resolve it before leaving feedback.
                </p>

                {/* Submit */}
                <div className="flex justify-end">
                    <button className="w-fit mt-4 bg-slate-900 text-white py-4 px-6 rounded-lg hover:bg-slate-800 cursor-pointer">
                        Submit
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}