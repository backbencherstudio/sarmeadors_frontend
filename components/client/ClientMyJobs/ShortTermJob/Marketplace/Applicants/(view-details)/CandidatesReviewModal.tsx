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
import { toast } from "sonner";
import {
  useGetSingleClientMyCandidateQuery,
  useShortTermHireReviewMutation,
} from "@/feature/dashboard/client/myCandidate";

export default function CandidatesReviewModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data } = useGetSingleClientMyCandidateQuery(id, {
    skip: !id || !open,
  });
  const [hireReview, { isLoading: isSubmitting }] =
    useShortTermHireReviewMutation();
  const candidateHeader = data?.data?.candidate?.header;
  const roles = candidateHeader?.roles?.length
    ? candidateHeader.roles.join(" | ")
    : "Candidate";

  const handleSubmit = async () => {
    setError(null);

    if (!rating) {
      setError("Please select a rating before submitting.");
      return;
    }

    try {
      const result = await hireReview({
        data: {
          rating,
          review: review.trim() || null,
        },
        id,
      }).unwrap();

      if (result?.success) {
        toast.success(result?.message || "Review submitted successfully.");
        setRating(0);
        setReview("");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review.");
      setError(
        "Something went wrong while submitting your review. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-grayColor1! px-4 rounded-md font-medium tex-sm py-[10.5px]! border border-borderColor text-blackColor! cursor-pointer">
          ⭐ Leave Review
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Leave Review
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-2 text-center">
          {candidateHeader?.image_url ? (
            <Image
              src={candidateHeader.image_url}
              alt={candidateHeader?.name || "Candidate"}
              width={60}
              height={60}
              className="mx-auto rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-700">
              {(candidateHeader?.name || "C")
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </div>
          )}

          <h3 className="font-semibold text-gray-900">
            {candidateHeader?.name || "Candidate"}
          </h3>

          <p className="text-sm text-gray-500">{roles}</p>

          <p className="text-sm font-medium text-yellow-500">
            ★ {candidateHeader?.rating?.average || 0} Rating (
            {candidateHeader?.rating?.count || 0})
          </p>
        </div>

        <div className="my-4 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition ${
                star <= rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="mb-4 text-center text-sm text-gray-500">
          Click on a star to rate your experience with this candidate.
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Write a review for the Candidate
          </label>

          <textarea
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Describe your experience with the candidate..."
            className="w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
            rows={4}
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <p className="mt-3 text-xs text-gray-400">
          Feedback is public and can't be changed. Make sure to be fair and
          factual. If there is a dispute, try to resolve it before leaving
          feedback.
        </p>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-4 w-fit rounded-lg bg-slate-900 px-6 py-4 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
