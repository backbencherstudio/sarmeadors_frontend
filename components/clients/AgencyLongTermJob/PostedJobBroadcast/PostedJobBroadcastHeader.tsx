"use client";
import ButtonReuseable from "@/components/reusable/CustomButton";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { useRouter } from "next/navigation";

export default function PostedJobBroadcastHeader() {
  const router = useRouter();
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <button
          onClick={() => router.back()}
          className="cursor-pointer text-[#111927] font-bold"
        >
          <ArrowLeftIcon className="inline-block mr-2" />
          <span>Nanny House Manager needed in McLean, VA</span>
        </button>
        <p className="text-[#808D9A] text-base">
          Please select which candidates you would like to broadcast job to
        </p>
      </div>
      <ButtonReuseable title="View Broadcast Record" />
    </div>
  );
}
