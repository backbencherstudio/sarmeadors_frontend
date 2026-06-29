"use client";

import { useShortTermHireReviewMutation } from "@/feature/dashboard/client/myCandidate";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  hireId?: any;
}

export default function ReviewModal({
  isOpen,
  onClose,
  hireId,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hireReview, { isLoading: isSubmitting }] =
    useShortTermHireReviewMutation();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setError(null);

    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }

    const payload = {
      rating,
      review: review || null,
    };

    try {
      const result = await hireReview({ data: payload, id: hireId }).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        setRating(0);
        setReview("");
        onClose();
      }
    } catch (err) {
      toast.error("Failed to submit review:", err);
      // console.error("Failed to submit review:", err);
      setError(
        "Something went wrong while submitting your review. Please try again.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#111927]">
          Why did you leave this rating?
        </h2>

        <p className="text-center text-[#111927] mt-2">
          {rating >= 4 ? "Good / Amazing" : ""}
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              xmlns="http://www.w3.org/2000/svg"
              fill={(hover || rating) >= star ? "#FACC15" : "none"}
              viewBox="0 0 24 24"
              stroke="#FACC15"
              className="w-8 h-8 cursor-pointer transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.272a1 1 0 00.95.69h6.59c.969 0 1.371 1.24.588 1.81l-5.33 3.872a1 1 0 00-.364 1.118l2.036 6.272c.3.921-.755 1.688-1.538 1.118l-5.33-3.872a1 1 0 00-1.176 0l-5.33 3.872c-.783.57-1.838-.197-1.538-1.118l2.036-6.272a1 1 0 00-.364-1.118L.885 11.7c-.783-.57-.38-1.81.588-1.81h6.59a1 1 0 00.95-.69l2.036-6.272z"
              />
            </svg>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full mt-6 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
          rows={4}
        />

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            disabled={isSubmitting}
            className="bg-[#111927] border border-[#384250] text-white px-6 py-2 rounded-lg hover:bg-black cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
