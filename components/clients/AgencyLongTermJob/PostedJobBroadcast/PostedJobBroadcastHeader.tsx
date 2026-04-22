import ButtonReuseable from "@/components/reusable/CustomButton";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";

export default function PostedJobBroadcastHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <button className="cursor-pointer text-[#111927] font-bold">
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
