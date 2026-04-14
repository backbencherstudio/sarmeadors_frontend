"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function CandidateReviewTopBar() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="font-semibold capitalize leading-[160%] flex items-center cursor-pointer"
      >
        <IoIosArrowBack />
        <span className="inline-block">Candidate's Review</span>
      </button>
    </div>
  );
}
